# Bubblewrap PWA to Play Store Deployment Guide

## Prerequisites for Bubblewrap Deployment

### 1. HTTPS Domain Required
Your PWA must be served over HTTPS for Google Play Store deployment. You'll need:
- A domain name (e.g., paleohebrewlearning.com)
- SSL certificate (Let's Encrypt free option or paid certificate)
- Web hosting that supports HTTPS

### 2. Development Environment
- Node.js 14+ (already installed)
- Java Development Kit (JDK) 8 or 11
- Android SDK (comes with Android Studio)
- Bubblewrap CLI (now installed)

## Step 1: Optimize PWA for Bubblewrap

### Current PWA Status ✓
Your app already has:
- ✅ Service Worker registered
- ✅ Web App Manifest
- ✅ Offline functionality
- ✅ App icons (multiple sizes)
- ✅ PWA install prompts

### Required Optimizations

#### Update Manifest for Play Store
```json
{
  "name": "Paleo Hebrew Learning",
  "short_name": "Paleo Hebrew",
  "description": "Learn ancient Paleo Hebrew characters through interactive games",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#0891b2",
  "background_color": "#ffffff",
  "categories": ["education", "kids", "reference"],
  "shortcuts": [
    {
      "name": "Learn Alphabet",
      "short_name": "Alphabet",
      "description": "Start learning Paleo Hebrew characters",
      "url": "/alphabet",
      "icons": [{ "src": "/icons/icon-96x96.png", "sizes": "96x96" }]
    }
  ]
}
```

## Step 2: Deploy to HTTPS Domain

### Hosting Options

#### Option A: Replit (Quick Start)
1. Deploy directly from Replit
2. Your app will be available at: `https://your-repl-name.your-username.repl.co`
3. Use this URL for Bubblewrap testing

#### Option B: Custom Domain (Recommended)
Popular hosting services:
- **Netlify**: Free tier, automatic HTTPS
- **Vercel**: Free tier, automatic HTTPS  
- **Firebase Hosting**: Google's service, PWA optimized
- **Cloudflare Pages**: Free tier with edge computing

### Build Production Version
```bash
npm run build
```

## Step 3: Initialize Bubblewrap Project

### Create Bubblewrap Configuration
```bash
# Navigate to project root
cd /path/to/your/project

# Initialize Bubblewrap with your PWA manifest
npx bubblewrap init --manifest https://your-domain.com/manifest.json
```

### Configuration Prompts
Bubblewrap will ask for:
- **Package Name**: com.paleohebrewlearning.app
- **App Name**: Paleo Hebrew Learning  
- **App Version**: 1.0.0
- **Version Code**: 1
- **Host**: your-domain.com
- **Manifest URL**: https://your-domain.com/manifest.json
- **Start URL**: https://your-domain.com/

### Generated Files
```
twa-manifest.json     # Trusted Web Activity configuration
build.gradle         # Android build configuration
app/                 # Android app source
```

## Step 4: Configure Digital Asset Links

### Generate Asset Links File
Bubblewrap creates this automatically, but you need to serve it from your domain:

**File**: `/.well-known/assetlinks.json`
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.paleohebrewlearning.app",
    "sha256_cert_fingerprints": ["GENERATED_BY_BUBBLEWRAP"]
  }
}]
```

### Deploy Asset Links
1. Copy the generated assetlinks.json to your web server
2. Ensure it's accessible at: `https://your-domain.com/.well-known/assetlinks.json`
3. Verify CORS headers allow Google to access the file

## Step 5: Build Android App Bundle

### Install Android Dependencies
```bash
# Install Android SDK (if not using Android Studio)
# Or use Android Studio for GUI setup
```

### Build Commands
```bash
# Build the Android App Bundle (.aab file)
npx bubblewrap build

# For release build with signing
npx bubblewrap build --release
```

### Output Files
- `app-release-unsigned.aab` (needs signing)
- `app-release.aab` (signed and ready for Play Store)

## Step 6: Google Play Console Setup

### Upload to Play Console
1. Go to https://play.google.com/console/
2. Create new app: "Paleo Hebrew Learning"
3. Upload the .aab file to internal testing track
4. Complete store listing with your prepared descriptions

### Store Listing Information
Use the content from `app-store-assets/app-descriptions.md`:
- App title
- Short description
- Full description
- Screenshots
- Feature graphic

### Digital Asset Links Verification
1. Google Play Console → App Integrity
2. Copy the SHA-256 fingerprint
3. Update your assetlinks.json with the correct fingerprint
4. Redeploy to your web server

## Step 7: Testing and Deployment

### Internal Testing
1. Upload to internal testing track first
2. Test the TWA thoroughly
3. Verify no address bar appears (means asset links work)
4. Test all PWA functionality

### Production Release
1. Move from internal testing to production
2. Set pricing (Free with in-app purchases)
3. Configure content rating
4. Submit for review

## Common Issues and Solutions

### Address Bar Still Visible
- Check assetlinks.json is accessible via HTTPS
- Verify SHA-256 fingerprint matches Play Console exactly
- Clear app data and reinstall
- Check for URL redirects

### Build Failures
- Ensure Java JDK 8 or 11 is installed
- Update Android SDK build tools
- Check Gradle configuration

### Asset Links Verification Failed
- Verify HTTPS certificate is valid
- Check assetlinks.json syntax
- Ensure no redirect chains
- Test with Google's verification tool

## Timeline for Deployment

**Day 1: Setup**
- Deploy PWA to HTTPS domain
- Initialize Bubblewrap project
- Configure asset links

**Day 2: Build & Test**
- Build Android app bundle
- Test internally with asset links
- Upload to Play Console internal testing

**Day 3: Review**
- Submit for Play Store review
- Monitor for approval (typically 2-3 hours)

## Next Steps After This Guide

1. Secure an HTTPS domain for your PWA
2. Deploy your production build to that domain
3. Run the Bubblewrap initialization process
4. Build and test the Android app bundle
5. Upload to Google Play Console

Your Paleo Hebrew Learning PWA is well-suited for Play Store deployment as it already meets all PWA requirements and has educational value that Google favors.