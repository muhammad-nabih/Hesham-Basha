# Sanity CMS Setup Guide

This portfolio uses Sanity as its content management system. Follow these steps to set up and configure your portfolio content.

## Getting Started

1. **Create a Sanity Project** (if you haven't already)
   - Go to https://sanity.io
   - Sign up or log in
   - Create a new project

2. **Get Your Project Credentials**
   - In your Sanity project dashboard, go to Settings → API
   - Copy your **Project ID**
   - Note your **Dataset name** (usually "production")

3. **Add Environment Variables**
   - Add `NEXT_PUBLIC_SANITY_PROJECT_ID` with your Project ID
   - Add `NEXT_PUBLIC_SANITY_DATASET` with your Dataset name (usually "production")

## Managing Content

Once your Sanity project is connected, you can manage your portfolio content through the Sanity Studio.

### Available Content Types

#### Projects
Each project has the following fields:
- **Title**: Project name
- **Slug**: URL-friendly identifier (auto-generated)
- **Thumbnail**: Poster/preview image for the grid
- **Hero Image**: Full-width image for the detail page
- **Short Description**: Subtitle or tagline
- **Full Description**: Detailed project description
- **Gallery Images**: Multiple images with optional captions
- **Project Type**: Category (e.g., "Campaign", "Branding", "Social Media")
- **Year**: Year completed
- **Tools**: Array of design tools used
- **Featured**: Toggle to show on homepage
- **Order Rank**: Position in grid display

#### Skills
Simple skill entries with:
- **Title**: Skill name (e.g., "Campaign Design")
- **Slug**: URL identifier

### Querying Content

The portfolio fetches content automatically using these queries:

- `getAllProjects()` - Fetches all projects
- `getFeaturedProjects()` - Fetches only featured projects for homepage
- `getProjectBySlug(slug)` - Fetches a specific project
- `getSkills()` - Fetches all skills

All queries have built-in error handling and will gracefully handle missing data.

## Schema Deployment

The Sanity schemas are defined in TypeScript at:
- `/sanity/schemaTypes/projectType.ts`
- `/sanity/schemaTypes/skillType.ts`

These schemas define the structure of your content. If you modify them, you'll need to sync them with your Sanity project.

## Troubleshooting

- **No projects showing**: Check that your environment variables are correctly set
- **Build errors**: Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are defined
- **Images not loading**: Verify image assets are properly uploaded to your Sanity project

## Documentation

For more information about Sanity:
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Reference](https://www.sanity.io/docs/groq)
