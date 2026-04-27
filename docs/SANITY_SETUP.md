# Sanity CMS Setup Instructions

## Deploy Sanity Studio

To deploy your Sanity Studio (content management interface):

```bash
cd /home/ubuntu/h2-yacht-design
pnpm sanity:deploy
```

This will create a hosted Studio at `https://your-project.sanity.studio` where you can manage all content.

## Adding Content

### 1. Projects (Yachts)

In Sanity Studio, create new "Project" documents with:
- **Title**: Project name (e.g., "Lady M")
- **Slug**: Auto-generated URL-friendly name
- **Shipyard**: Builder name (e.g., "Turquoise")
- **Category**: New Build, Refit, Hotel & Home, or Tenders
- **Year**: Completion year
- **Length**: Yacht length (e.g., "65m")
- **Excerpt**: Short description for cards
- **Description**: Full project description (rich text)
- **Main Image**: Hero image (required)
- **Gallery**: Additional project images
- **Featured**: Check this to show in homepage slideshow
- **Display Order**: Lower numbers appear first in slideshow

### 2. Team Members

Create "Team Member" documents with:
- **Name**: Full name
- **Slug**: Auto-generated
- **Role**: Job title (e.g., "Founder & Creative Director")
- **Biography**: Full bio (rich text)
- **Photo**: Professional headshot
- **Display Order**: Order on team page

### 3. News Articles

Create "News Article" documents with:
- **Title**: Article headline
- **Slug**: Auto-generated
- **Published Date**: Article date
- **Publication**: Source name (e.g., "Boat International")
- **Excerpt**: Short summary
- **Content**: Full article (rich text)
- **Main Image**: Article image
- **External URL**: Link to original article (optional)

## Content Tips

- **Featured Projects**: Mark 3-5 best projects as "featured" for the homepage slideshow
- **Images**: Upload high-resolution images (1920px+ width recommended)
- **Alt Text**: Always add alt text to images for accessibility
- **Slugs**: Click "Generate" to create URL-friendly slugs automatically

## Accessing Sanity Studio Locally

To run Sanity Studio locally during development:

```bash
pnpm sanity:dev
```

This starts the Studio at `http://localhost:3333`

## Sanity Dashboard

Visit [sanity.io/manage](https://sanity.io/manage) to:
- View your project settings
- Manage API tokens
- Configure CORS origins
- Monitor API usage
- Invite team members
