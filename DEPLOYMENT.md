# Deployment Guide

## GitHub Push

Your changes have been committed locally. To push to GitHub, run:

```bash
cd "/Users/nolanfeng/Project/TOFF 2025 Holiday"
git push origin main
```

If you encounter authentication issues, you can either:

1. **Use GitHub CLI** (if installed):

   ```bash
   gh auth login
   git push origin main
   ```

2. **Use SSH instead** (recommended):

   ```bash
   git remote set-url origin git@github.com:nowhereland243/toff-holiday-party.git
   git push origin main
   ```

3. **Use a Personal Access Token**:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Create a token with `repo` permissions
   - Use it as your password when pushing

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `nowhereland243/toff-holiday-party`
4. Vercel will automatically detect the `vercel.json` configuration
5. The project will deploy automatically from the `v1` directory
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):

   ```bash
   npm i -g vercel
   ```

2. Navigate to your project directory:

   ```bash
   cd "/Users/nolanfeng/Project/TOFF 2025 Holiday"
   ```

3. Deploy:

   ```bash
   vercel
   ```

4. Follow the prompts to link your project

5. For production deployment:
   ```bash
   vercel --prod
   ```

### Configuration

The `vercel.json` file is already configured to:

- Serve files from the `v1` directory
- Enable clean URLs (no `.html` extension needed)
- Handle all routes properly

### Custom Domain (Optional)

After deployment:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Project Structure

```
TOFF 2025 Holiday/
├── v1/                    # Main website files
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── images/
├── vercel.json           # Vercel configuration
└── .gitignore           # Git ignore rules
```

## Notes

- The site is configured to serve from the `v1` directory
- All images should be in `v1/images/`
- The site uses static files, so no build process is needed
- Vercel will automatically deploy on every push to the `main` branch (if connected via GitHub)
