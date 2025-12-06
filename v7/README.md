# Cosmos Manifesto Clone - Development Log

## Project Overview
This project is a complete clone of the [Cosmos Manifesto page](https://www.cosmos.so/manifesto), adapted for the Tom of Finland Foundation Holiday Party.

## Development Timeline

### Iteration 1: Exact Clone
**Goal**: Create a pixel-perfect replica of the Cosmos Manifesto page.

**Process**:
1. Downloaded HTML structure from the live site
2. Downloaded CSS (`style.css`) and JavaScript (`theme.js`)
3. Downloaded media assets:
   - Favicons and icons
   - OG images
   - Background video (`manifesto-ogvideo.mp4`)
   - Image sequence for scroll animation (300 frames: `manifesto000.jpg` - `manifesto299.jpg`)

**Challenges & Solutions**:
- **Loading stuck at 93%**: The site's preloader was waiting for missing assets
  - **Root Cause**: Missing vortex image sequence (20 images), audio files, and fonts
  - **Solution**: Identified missing assets via browser console logs and downloaded:
    - 20 vortex images (`vortex*.jpg`, `vortex*.png`) for WebGL background effect
    - Audio files (`crunch-full-length.mp3`, `ambient-audio.mp3`)
    - Font families (Favorit, GT Super) in `.woff` and `.woff2` formats
    - `background-noise.png`
    - `manifest.json`

- **File Protocol Issues**: Running from `file://` caused CORS errors
  - **Solution**: Set up local HTTP server (`python3 -m http.server 8080`)

**File Structure**:
```
v7_cosmos/
├── index.html              # Original clone
├── styles/
│   └── style.css
├── scripts/
│   └── theme.js
├── assets/
│   ├── manifesto000.jpg - manifesto299.jpg  # 300 frame sequence
│   ├── vortex*.jpg/png    # WebGL vortex images
│   ├── fonts/
│   │   ├── favorit/
│   │   └── gt-super/
│   └── [other media assets]
├── audio/
│   ├── crunch-full-length.mp3
│   └── ambient-audio.mp3
└── manifest.json
```

**Technologies Identified**:
- **GSAP**: Scroll-based animations
- **Three.js**: WebGL vortex effect
- **Howler.js**: Audio management
- **Next.js**: Framework (identified from script tags)

### Iteration 2: Tom of Finland Copy
**Goal**: Update text content while preserving the original design.

**File**: `index_v2.html`

**Copy Changes**:
| Section | Original | Updated |
|---------|----------|---------|
| **Hero Title** | "You are now entering the Cosmos." | "You are now entering the Tom of Finland Foundation." |
| **Hero Subtitle** | "Where ideas are sacred, exploration is infinite and connection is cosmic..." | "Where art is sacred, expression is unbridled, and the legacy is eternal..." |
| **Section 1** | "01. Our Internet Is Broken" | "01. The Holiday Party" |
| **Section 1 Body** | "The year is 2024..." | "Join us on December 11th, from 7 PM to 9 PM..." |
| **Section 2** | "02. One Home To Connect The Dots" | "02. A Sanctuary for the Bold" |
| **Section 2 Body** | "What if we could collect anything..." | "The Foundation stands as a beacon for erotic art..." |
| **Section 3** | "03. A Mindful Internet Awaits" | "03. Join the Legacy" |
| **Section 3 Body** | "Creativity exists at the core..." | "Your support ensures the preservation..." |
| **Footer** | "Cosmos is the home you've been searching for." | "The Foundation is the home you've been searching for." |

### Iteration 3: Tom of Finland Foundation Content
**File**: `index_v3.html`

**Goal**: Complete content transformation for the Tom of Finland Foundation Holiday Party with updated copy, branding, and interactive features.

**Content Source**: `Donation Page Copy.rtf`

#### Copy Changes
All sections updated to reflect the Foundation's mission and programs:

| Section | Content |
|---------|---------|
| **Hero Title** | "Tom of Finland Foundation's 41 years and counting: We Protect Queer Art. We Queer the Canon. We Nurture Artists." |
| **Hero Subtitle** | "Join us on December 11th, from 7 PM to 9 PM in the most iconic apparatus's red room." |
| **Section 1** | "01. The Mission" - Foundation's core purpose |
| **Section 2** | "02. Our Programs" - Four key programs with interactive research toggle |
| **Section 3** | "03. Financial Transparency" - Cost breakdown |
| **Section 4** | "04. Made Possible By" - Sponsors (APPARATUS, Misguided Spirits) |
| **CTA** | "Build the Future With Us" with mission statement |
| **Footer** | Foundation address and partner information |

#### Interactive Features Added

**Research Toggle (Tap and Toggle)**
- **Location**: Section 2 → "III. Strengthening Grounds"
- **Purpose**: Minimize text density while providing detailed research information
- **Implementation**: 
  - Custom CSS for accordion behavior (`.research-toggle`)
  - JavaScript toggle functionality
  - Smooth expand/collapse animations
- **Research Points**:
  1. Archival Documentation
  2. Scholarly Publications
  3. Educational Resources
  4. Digital Accessibility

#### Logo Replacement

**Original**: Inline SVG logos (`#wordmark`, `#logomark`)

**New**: PNG logo (`assets/toff-logo-white.png`)

**Locations Updated**:
- **Header** (Top Left): 16px height, white on dark header
- **Menu**: 20px height with `invert-on-light` class
- **Footer (Small)**: 40px height with `invert-on-light` class
- **Footer (Large)**: 80px height, white on dark footer
- **Navigation**: Removed (as requested)

**CSS Addition**:
```css
/* Logo Inversion for Light Mode */
html:not(.dark) .invert-on-light {
    filter: invert(1);
}
```

**Note**: Header and large footer logos do NOT use `invert-on-light` as they appear on dark backgrounds.

#### Asset Audit

A complete audit of all graphic assets has been documented for replacement purposes:

**Videos**:
- `Auto-Captions-V6.mp4` (12MB, 20 sec) - Main background video
- `manifesto-ogvideo.mp4` (51KB) - Short loop/placeholder

**Image Sequence** (Scroll Animation):
- **Location**: `images/sequence/`
- **Files**: 300 images (`manifesto000.jpg` to `manifesto299.jpg`)
- **Size**: ~35KB - 75KB per image
- **Total**: ~15-20MB

**Vortex Images** (WebGL Background):
- **Location**: Root and `assets/` (duplicates exist)
- **Count**: ~20 images
- **Format**: JPG/PNG
- **Dimensions**: Various (267x400 to 400x400)

**Other Assets**:
- `background-noise.png` (16KB) - Texture overlay
- `manifesto-ogimg-1.jpg` (146KB) - Social share image
- Favicons and app icons

**Full Details**: See `asset_audit.md` artifact for complete list with sizes and paths.

## How to Run Locally

1. **Start the local server**:
   ```bash
   cd v7_cosmos
   python3 -m http.server 8080
   ```

2. **View the pages**:
   - Original Clone: [http://localhost:8080/index.html](http://localhost:8080/index.html)
   - Tom of Finland v2: [http://localhost:8080/index_v2.html](http://localhost:8080/index_v2.html)
   - Tom of Finland v3: [http://localhost:8080/index_v3.html](http://localhost:8080/index_v3.html)

## Key Features
- **Scroll-based animations**: Flower image sequence that animates on scroll
- **WebGL vortex background**: Dynamic particle effect
- **Audio integration**: Ambient sound and interaction sounds
- **Dark/Light mode toggle**: Preserved from original
- **Responsive design**: Mobile and desktop layouts
- **Smooth animations**: GSAP-powered transitions

## Technical Notes
- **Server Required**: Must run via HTTP server (not `file://`) due to ES modules and CORS
- **Asset Dependencies**: All assets must be present for full functionality
- **Browser Compatibility**: Modern browsers with WebGL support

## Next Steps
- Further customization of `index_v3.html`
- Additional content updates
- Potential deployment to production

---

**Last Updated**: December 5, 2025
