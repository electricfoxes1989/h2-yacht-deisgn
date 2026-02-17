#!/usr/bin/env python3
import argparse
import json
import os
import re
import ssl
import sys
import time
import urllib.parse
import urllib.request
from html import unescape

BASE_URL = "https://www.h2yachtdesign.com"
WP_API_BASE = f"{BASE_URL}/wp-json/wp/v2"
EXPORT_ROOT = "/Users/clairehagen/Documents/h2yachtdesign_export/pages"
PROJECTS_DIR = os.path.join(EXPORT_ROOT, "project")
PROJECTS_CATEGORIES_DIR = os.path.join(EXPORT_ROOT, "projects")

DEFAULT_SSL_CONTEXT = ssl._create_unverified_context()
USER_AGENT = "Mozilla/5.0 (compatible; H2SanityImport/1.0)"

CATEGORY_MAP = {
    "new-build": "New Build",
    "refit": "Refit",
    "tenders": "Tenders",
    "residential": "Hotel & Home",
    "concepts": "Concept",
    "construction": "Under Construction",
}

SPEC_MAP = {
    "yard": "shipyard",
    "shipyard": "shipyard",
    "builder": "shipyard",
    "loa": "length",
    "length": "length",
    "year": "year",
    "beam": "beam",
    "guests": "guests",
    "draft": "draft",
    "speed": "speed",
    "range": "range",
    "crew": "crew",
}


def log(msg):
    print(msg, flush=True)


def request_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, context=DEFAULT_SSL_CONTEXT) as resp:
        return json.loads(resp.read().decode("utf-8"))


def strip_html(text):
    if not text:
        return ""
    text = re.sub(r"<\s*(script|style)[^>]*>.*?<\s*/\s*\1\s*>", " ", text, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def slugify(value):
    value = re.sub(r"[^a-zA-Z0-9_-]+", "-", (value or "").strip().lower())
    return value.strip("-")


def to_blocks(text):
    if not text:
        return []
    paras = [p.strip() for p in text.split("\n\n") if p.strip()]
    blocks = []
    for p in paras:
        blocks.append({
            "_type": "block",
            "style": "normal",
            "markDefs": [],
            "children": [
                {
                    "_type": "span",
                    "text": p,
                    "marks": [],
                }
            ],
        })
    return blocks


def normalize_url(url):
    if not url:
        return None
    url = url.strip().strip("'\"")
    if url.startswith("//"):
        url = "https:" + url
    if url.startswith("/"):
        url = urllib.parse.urljoin(BASE_URL, url)

    parts = urllib.parse.urlsplit(url)
    path = urllib.parse.quote(parts.path)
    query = urllib.parse.quote(parts.query, safe="=&")
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc, path, query, parts.fragment))


def extract_project_category_map():
    mapping = {}
    if not os.path.isdir(PROJECTS_CATEGORIES_DIR):
        return mapping
    for slug in os.listdir(PROJECTS_CATEGORIES_DIR):
        cat_dir = os.path.join(PROJECTS_CATEGORIES_DIR, slug)
        if not os.path.isdir(cat_dir):
            continue
        cat_label = CATEGORY_MAP.get(slug)
        if not cat_label:
            continue
        index_path = os.path.join(cat_dir, "index.html")
        if not os.path.exists(index_path):
            continue
        with open(index_path, "r", encoding="utf-8", errors="ignore") as f:
            html = f.read()
        for match in re.findall(r"https?://www\.h2yachtdesign\.com/project/([^/]+)/?", html):
            mapping[match] = cat_label
    return mapping


def parse_project_html(html):
    title_match = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S | re.I)
    title = strip_html(title_match.group(1)) if title_match else None

    hero_match = re.search(r"hero-image[^>]*style=\"[^\"]*background-image:url\(([^)]+)\)", html, re.I)
    hero_image = normalize_url(hero_match.group(1)) if hero_match else None

    img_urls = [normalize_url(u) for u in re.findall(r"<img[^>]+src=\"([^\"]+)\"", html, re.I)]
    img_urls = [u for u in img_urls if u and "/wp-content/uploads/" in u]

    spec_items = re.findall(r"<div class=\"spec-item[^>]*>\s*<header>(.*?)</header>\s*<p>(.*?)</p>", html, re.S | re.I)
    specs = {}
    for header, value in spec_items:
        key = strip_html(header).lower()
        val = strip_html(value)
        if key and val:
            specs[key] = val

    return {
        "title": title,
        "hero_image": hero_image,
        "gallery_images": img_urls,
        "specs": specs,
    }


def download_binary(url):
    url = normalize_url(url)
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, context=DEFAULT_SSL_CONTEXT) as resp:
        data = resp.read()
        content_type = resp.headers.get("Content-Type", "application/octet-stream")
    return data, content_type


def upload_image(project_id, dataset, token, image_url, cache):
    image_url = normalize_url(image_url)
    if not image_url:
        return None
    if image_url in cache:
        return cache[image_url]
    data, content_type = download_binary(image_url)
    filename = os.path.basename(urllib.parse.urlparse(image_url).path) or "image"
    params = urllib.parse.urlencode({"filename": filename})
    url = f"https://{project_id}.api.sanity.io/v2021-06-07/assets/images/{dataset}?{params}"
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": content_type,
        },
        method="POST",
    )
    with urllib.request.urlopen(req, context=DEFAULT_SSL_CONTEXT) as resp:
        payload = json.loads(resp.read().decode("utf-8"))
    asset_id = payload.get("document", {}).get("_id")
    cache[image_url] = asset_id
    time.sleep(0.05)
    return asset_id


def mutate(project_id, dataset, token, mutations):
    url = f"https://{project_id}.api.sanity.io/v2021-06-07/data/mutate/{dataset}"
    payload = json.dumps({"mutations": mutations}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, context=DEFAULT_SSL_CONTEXT) as resp:
        data = resp.read().decode("utf-8")
        return json.loads(data) if data else {}


def import_news(project_id, dataset, token, image_cache):
    per_page = 100
    page = 1
    mutations = []
    imported = 0

    while True:
        url = f"{WP_API_BASE}/posts?per_page={per_page}&page={page}&_embed=1"
        posts = request_json(url)
        if not posts:
            break

        for post in posts:
            title = strip_html(post.get("title", {}).get("rendered", ""))
            excerpt = strip_html(post.get("excerpt", {}).get("rendered", ""))
            content_text = strip_html(post.get("content", {}).get("rendered", ""))
            slug = post.get("slug")

            published = post.get("date_gmt") or post.get("date")
            if published and not published.endswith("Z"):
                published = published + "Z"

            image_asset_id = None
            featured_id = post.get("featured_media")
            if featured_id and post.get("_embedded", {}).get("wp:featuredmedia"):
                media = post.get("_embedded", {}).get("wp:featuredmedia", [])
                if media:
                    image_url = media[0].get("source_url")
                    if image_url:
                        try:
                            image_asset_id = upload_image(project_id, dataset, token, image_url, image_cache)
                        except Exception as e:
                            log(f"News image upload failed for {image_url}: {e}")

            doc = {
                "_id": f"news-{slug or post.get('id')}",
                "_type": "news",
                "title": title,
                "slug": {"_type": "slug", "current": slug} if slug else None,
                "publishedAt": published,
                "excerpt": excerpt or None,
                "content": to_blocks(content_text),
                "externalUrl": post.get("link"),
            }
            if image_asset_id:
                doc["mainImage"] = {
                    "_type": "image",
                    "asset": {"_type": "reference", "_ref": image_asset_id},
                }

            doc = {k: v for k, v in doc.items() if v is not None}
            mutations.append({"createOrReplace": doc})
            imported += 1

            if len(mutations) >= 20:
                mutate(project_id, dataset, token, mutations)
                log(f"News: wrote {len(mutations)} docs (total {imported})")
                mutations = []

        if len(posts) < per_page:
            break
        page += 1

    if mutations:
        mutate(project_id, dataset, token, mutations)
        log(f"News: wrote {len(mutations)} docs (total {imported})")


def import_projects(project_id, dataset, token, image_cache, max_images=5):
    if not os.path.isdir(PROJECTS_DIR):
        log(f"Projects dir missing: {PROJECTS_DIR}")
        return

    category_map = extract_project_category_map()

    project_slugs = [d for d in os.listdir(PROJECTS_DIR) if os.path.isdir(os.path.join(PROJECTS_DIR, d))]
    mutations = []
    imported = 0

    for slug in sorted(project_slugs):
        html_path = os.path.join(PROJECTS_DIR, slug, "index.html")
        if not os.path.exists(html_path):
            continue
        with open(html_path, "r", encoding="utf-8", errors="ignore") as f:
            html = f.read()
        parsed = parse_project_html(html)

        title = parsed["title"] or slug.replace("-", " ").title()
        category = category_map.get(slug)
        status = None
        if category == "Under Construction":
            status = "under-construction"
        elif category == "Concept":
            status = "concept"
        else:
            status = "completed"

        specs = parsed["specs"]
        shipyard = None
        year = None
        length = None
        beam = None
        guests = None
        speed = None
        draft = None
        range_val = None
        crew = None

        for key, val in specs.items():
            mapped = SPEC_MAP.get(key)
            if mapped == "shipyard":
                shipyard = val
            elif mapped == "year":
                year = val
            elif mapped == "length":
                length = val
            elif mapped == "beam":
                beam = val
            elif mapped == "guests":
                guests = val
            elif mapped == "speed":
                speed = val
            elif mapped == "draft":
                draft = val
            elif mapped == "range":
                range_val = val
            elif mapped == "crew":
                crew = val

        images = []
        if parsed["hero_image"]:
            images.append(parsed["hero_image"])
        images.extend(parsed["gallery_images"])  # order preserved
        # dedupe
        seen = set()
        unique = []
        for url in images:
            if not url:
                continue
            if url in seen:
                continue
            seen.add(url)
            unique.append(url)
        unique = unique[:max_images]

        main_image_id = None
        gallery_refs = []
        for idx, url in enumerate(unique):
            try:
                asset_id = upload_image(project_id, dataset, token, url, image_cache)
            except Exception as e:
                log(f"Project image upload failed for {url}: {e}")
                asset_id = None
            if not asset_id:
                continue
            image_ref = {"_type": "image", "asset": {"_type": "reference", "_ref": asset_id}}
            if idx == 0:
                main_image_id = asset_id
            if idx > 0:
                gallery_refs.append(image_ref)

        doc = {
            "_id": f"project-{slug}",
            "_type": "project",
            "title": title,
            "slug": {"_type": "slug", "current": slug},
            "category": category,
            "shipyard": shipyard,
            "year": year,
            "length": length,
            "excerpt": None,
            "description": [],
            "featured": False,
            "status": status,
        }

        if main_image_id:
            doc["mainImage"] = {"_type": "image", "asset": {"_type": "reference", "_ref": main_image_id}}
        if gallery_refs:
            doc["gallery"] = gallery_refs

        # optional specifications object
        specifications = {}
        if length:
            specifications["loa"] = length
        if beam:
            specifications["beam"] = beam
        if draft:
            specifications["draft"] = draft
        if guests:
            specifications["guests"] = guests
        if crew:
            specifications["crew"] = crew
        if speed:
            specifications["speed"] = speed
        if range_val:
            specifications["range"] = range_val
        if specifications:
            doc["specifications"] = specifications

        doc = {k: v for k, v in doc.items() if v not in (None, [], {})}
        mutations.append({"createOrReplace": doc})
        imported += 1

        if len(mutations) >= 20:
            mutate(project_id, dataset, token, mutations)
            log(f"Projects: wrote {len(mutations)} docs (total {imported})")
            mutations = []

    if mutations:
        mutate(project_id, dataset, token, mutations)
        log(f"Projects: wrote {len(mutations)} docs (total {imported})")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--project-id", default=os.getenv("VITE_SANITY_PROJECT_ID", "9g4et4td"))
    parser.add_argument("--dataset", default=os.getenv("VITE_SANITY_DATASET", "production"))
    parser.add_argument("--token", default=os.getenv("SANITY_API_TOKEN"))
    parser.add_argument("--max-images", type=int, default=5)
    parser.add_argument("--skip-news", action="store_true")
    parser.add_argument("--skip-projects", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not args.token and not args.dry_run:
        log("Missing SANITY_API_TOKEN. Set it as an environment variable or pass --token.")
        sys.exit(1)

    image_cache = {}

    if not args.skip_news:
        if args.dry_run:
            log("[dry-run] Would import news from WordPress API")
        else:
            import_news(args.project_id, args.dataset, args.token, image_cache)

    if not args.skip_projects:
        if args.dry_run:
            log("[dry-run] Would import projects from static export")
        else:
            import_projects(args.project_id, args.dataset, args.token, image_cache, max_images=args.max_images)

    log("Done.")


if __name__ == "__main__":
    main()
