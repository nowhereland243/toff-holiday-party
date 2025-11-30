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

## Promo Code Support

The site supports passing promo codes through URL parameters. When users visit the site with a promo code in the URL, it will automatically be applied to all Givebutter links (tickets and donations).

### How to Use

1. **In Email Campaigns:**
   Add the promo code as a URL parameter when linking to your site:
   ```
   https://your-vercel-url.vercel.app?code=YOURCODE
   ```
   or
   ```
   https://your-vercel-url.vercel.app?promo=YOURCODE
   ```

2. **Example:**
   If your promo code is `EARLYBIRD25`, your email link would be:
   ```
   https://your-vercel-url.vercel.app?code=EARLYBIRD25
   ```

3. **How It Works:**
   - When a user clicks the link, the site detects the promo code from the URL
   - The code is automatically appended to all Givebutter links on the page
   - When users click "GET TICKETS" or "DONATE NOW", they'll be taken to Givebutter with the promo code pre-filled

### Supported URL Parameters

The site accepts any of these parameter names:
- `?code=YOURCODE`
- `?promo=YOURCODE`
- `?promocode=YOURCODE`

All three will work the same way.

### Testing

To test your promo code links:
1. Visit your site with a promo code: `https://your-site.com?code=TEST123`
2. Click on "GET TICKETS" or "DONATE NOW"
3. Check the Givebutter URL - it should include `?code=TEST123` (or similar parameter)

**Note:** You may need to verify the exact parameter name Givebutter uses for promo codes. Common options are `code`, `promo`, `coupon`, or `discount`. If `code` doesn't work, you can modify the JavaScript in `v1/script.js` to use a different parameter name.

## Notes

- The site is configured to serve from the `v1` directory
- All images should be in `v1/images/`
- The site uses static files, so no build process is needed
- Vercel will automatically deploy on every push to the `main` branch (if connected via GitHub)
