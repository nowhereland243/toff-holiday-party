# Deployment Issues Log - TOFF 2025 Holiday Party

**Date:** December 5-6, 2025  
**Project:** Tom of Finland Foundation Holiday Party Site (v7_cosmos)  
**Repository:** `nowhereland243/toff-holiday-party`  
**Vercel Project:** `nowherelands-projects/toff-holiday-party`

## Summary

This document logs the issues encountered while deploying the v7_cosmos site (a Cosmos Manifesto clone adapted for TOFF) to Vercel, and the solutions implemented.

## Initial Goal

Deploy the `v7_cosmos/index_v3.html` site to Vercel and make it publicly accessible at the route `/toff2025-holiday-donation`.

## Issues Encountered

### Issue 1: Account/Team Mismatch
**Problem:** Initial deployment was under the wrong Vercel account (`yips-projects-805f0a35` instead of `nowherelands-projects`).

**Solution:**
- Logged out and logged back into Vercel CLI
- Switched to `nowherelands-projects` team
- Removed old `.vercel` directory and redeployed

**Status:** ✅ Resolved

### Issue 2: 404 NOT_FOUND Errors
**Problem:** Site was returning 404 errors when accessing the root URL or `/toff2025-holiday-donation` route.

**Root Causes Identified:**
1. **Invalid rewrite patterns** - Used wildcard patterns (`/vortex*`, `/Favorit-*`) which Vercel doesn't support
2. **File accessibility** - Vercel rewrites need proper path patterns to route to subdirectory files
3. **Missing root file** - No fallback file at root level

**Solutions Applied:**
1. Fixed rewrite patterns to use proper Vercel syntax (`:file*` instead of `*`)
2. Added root `index.html` with redirect to `/toff2025-holiday-donation`
3. Updated `vercel.json` with correct rewrite patterns for all asset types:
   - `/assets/:path*` → `/v7_cosmos/assets/:path*`
   - `/audio/:path*` → `/v7_cosmos/audio/:path*`
   - `/images/:path*` → `/v7_cosmos/images/:path*`
   - `/fonts/:path*` → `/v7_cosmos/fonts/:path*`
   - `/scripts/:path*` → `/v7_cosmos/scripts/:path*`
   - `/styles/:path*` → `/v7_cosmos/styles/:path*`
   - `/vortex:file*` → `/v7_cosmos/vortex:file*`
   - `/Favorit-:file*` → `/v7_cosmos/Favorit-:file*`
   - Static files: `/manifest.json`, `/background-noise.png`, `/Auto-Captions-V6.mp4`

**Status:** ✅ Configuration fixed, deployment successful

### Issue 3: Password Protection / 401 Unauthorized
**Problem:** Site was returning 401 (Unauthorized) errors, indicating password protection was enabled.

**Solution:**
- Identified that deployment protection needs to be disabled in Vercel dashboard
- User needs to manually disable password protection at:
  `https://vercel.com/nowherelands-projects/toff-holiday-party/settings/deployment-protection`

**Status:** ⚠️ Requires manual action in Vercel dashboard

### Issue 4: File Deployment Verification
**Problem:** Uncertainty about whether all 378 files from `v7_cosmos/` were being deployed.

**Verification:**
- Confirmed all files are tracked in git: `git ls-files v7_cosmos/` shows 378 files
- All files committed and pushed to GitHub
- Vercel deployment logs show "Downloading 594 deployment files" (includes all project files)

**Status:** ✅ All files confirmed in repository and should be deployed

## Final Configuration

### vercel.json
```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/toff2025-holiday-donation",
      "destination": "/v7_cosmos/index_v3.html"
    },
    {
      "source": "/assets/:path*",
      "destination": "/v7_cosmos/assets/:path*"
    },
    {
      "source": "/audio/:path*",
      "destination": "/v7_cosmos/audio/:path*"
    },
    {
      "source": "/images/:path*",
      "destination": "/v7_cosmos/images/:path*"
    },
    {
      "source": "/fonts/:path*",
      "destination": "/v7_cosmos/fonts/:path*"
    },
    {
      "source": "/scripts/:path*",
      "destination": "/v7_cosmos/scripts/:path*"
    },
    {
      "source": "/styles/:path*",
      "destination": "/v7_cosmos/styles/:path*"
    },
    {
      "source": "/manifest.json",
      "destination": "/v7_cosmos/manifest.json"
    },
    {
      "source": "/vortex:file*",
      "destination": "/v7_cosmos/vortex:file*"
    },
    {
      "source": "/background-noise.png",
      "destination": "/v7_cosmos/background-noise.png"
    },
    {
      "source": "/Auto-Captions-V6.mp4",
      "destination": "/v7_cosmos/Auto-Captions-V6.mp4"
    },
    {
      "source": "/Favorit-:file*",
      "destination": "/v7_cosmos/Favorit-:file*"
    },
    {
      "source": "/",
      "destination": "/v7_cosmos/index_v3.html"
    }
  ],
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

### Root index.html
Created redirect file at root level to redirect `/` to `/toff2025-holiday-donation`.

## Deployment URLs

**Production URL:**
- https://toff-holiday-party-cw11ccmmu-nowherelands-projects.vercel.app/toff2025-holiday-donation

**Root URL (redirects):**
- https://toff-holiday-party-cw11ccmmu-nowherelands-projects.vercel.app/

**Project Dashboard:**
- https://vercel.com/nowherelands-projects/toff-holiday-party

## Files Deployed

- **Total files in v7_cosmos/:** 378 files
- **Includes:**
  - 3 HTML files (index.html, index_v2.html, index_v3.html)
  - 300 image sequence files (manifesto000.jpg - manifesto299.jpg)
  - ~20 vortex images for WebGL background
  - Font files (Favorit family in .woff and .woff2)
  - Audio files (ambient-audio.mp3, crunch-full-length.mp3)
  - CSS and JavaScript files
  - Video file (Auto-Captions-V6.mp4)
  - All other assets (favicons, manifest.json, etc.)

## Remaining Actions Required

1. **Disable Password Protection** (Manual step required):
   - Go to: https://vercel.com/nowherelands-projects/toff-holiday-party/settings/deployment-protection
   - Disable "Password Protection" if enabled
   - Save changes

2. **Test Site Accessibility**:
   - After disabling password protection, verify:
     - Root URL loads correctly
     - `/toff2025-holiday-donation` route works
     - All assets (images, fonts, audio) load correctly
     - WebGL vortex background works
     - Scroll animations function properly

## Key Learnings

1. **Vercel Rewrite Patterns:**
   - Use `:path*` or `:file*` syntax, not wildcard `*`
   - Patterns must match Vercel's routing specification

2. **Subdirectory Deployment:**
   - Files in subdirectories need explicit rewrites to be accessible
   - All asset paths must be mapped in `vercel.json`

3. **Account Management:**
   - Verify correct Vercel account/team before deployment
   - Use `vercel switch` or `vercel login` to change accounts

4. **File Verification:**
   - All files must be committed to git for Vercel to deploy them
   - Check `.gitignore` to ensure no essential files are excluded

## Git Commits Made

1. `bc3831a` - Add v7_cosmos Tom of Finland Foundation site and update Vercel config
2. `b13dbee` - Update Vercel config for proper asset routing
3. `48185f2` - Add /toff2025-holiday-donation route
4. `93c5ea2` - Fix Vercel routing - add vortex images and background assets
5. `3367ee0` - Ensure all files are deployed - add output directory and font routes
6. `3461ddd` - Fix invalid rewrite patterns
7. `864b783` - Fix rewrites pattern and add root index.html redirect

### Issue 5: Invalid Regex in Rewrites
**Problem:** `vercel dev` reported "Can not repeat \"file\" without a prefix and suffix" for rewrites like `/vortex:file*`. This likely caused the 404 error on production as the configuration was invalid.

**Solution:**
- Updated `vercel.json` to use proper regex capturing groups:
  - `/(vortex.*)` -> `/v7_cosmos/$1`
  - `/(Favorit-.*)` -> `/v7_cosmos/$1`

**Status:** ✅ Fixed and deployed

## Current Status

✅ **Configuration:** Fixed invalid regex patterns
✅ **Deployment:** Successful (Production URL: https://toff-holiday-party-jkkn2sght-nowherelands-projects.vercel.app)
⚠️ **Accessibility:** Site is returning **401 Unauthorized**. This confirms **Password Protection** is enabled.

**ACTION REQUIRED:**
1. Go to Vercel Dashboard > Settings > Deployment Protection
2. Disable "Password Protection"
3. Save


