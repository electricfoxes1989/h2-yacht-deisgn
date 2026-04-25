# H2 Yacht Design — Project Data Fixes

The SANITY_API_TOKEN doesn't have write permissions. You need to either:
1. Create a new token with write access in Sanity (manage.sanity.io → Project → API → Tokens → Add Token → Editor role)
2. Set it as `SANITY_API_TOKEN` env var
3. Run: `node scripts/fix-project-data.mjs`

Or make these changes manually in Sanity Studio.

## Changes to make:

### MERGES (duplicates)

**Angelique + Vento → Keep Angelique**
- Add alternative names: "Vento", "Project Vento"
- Merge Vento's gallery images into Angelique
- Delete the Vento project document

**Mangusta Oceano 44 No4 + The Great Escape → Keep The Great Escape**
- Add alternative names: "Mangusta Oceano 44 No4", "Oceano 44 Hull 4"
- Merge Mangusta's gallery images into The Great Escape
- Fix length: 44.47m (was 47.47m typo)
- Delete the Mangusta Oceano 44 No4 document

### DATA FIXES

| Project | Field | Wrong | Correct |
|---------|-------|-------|---------|
| Maryah | Length | 120m | 125m |
| Maryah | Alt names | Project 120 | Project 120, Project Czar |
| Graceful | Length | 83m | 82m |
| Talisman C | Length | 71.5m | 70.6m |
| Bond | Year | 2026 | 2029 |
| Faith | Year | 2026 | 2028 |
| Faith | Length | 87.5m | 88m |
| Samar | Design scope | interior | exterior |
| Pegaso/Naia | Design scope | interior | exterior |
| Pegaso/Naia | Length | 74m | 73.6m |
| Pegaso/Naia | Year | 2010 | 2011 |
| Victorious | Category | refit | new-build |
| Ulysses | Year | 2015 | 2016 |
| Tatiana | Year | 2020 | 2021 |
