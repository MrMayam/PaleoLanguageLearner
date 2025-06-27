# Complete Bubblewrap Deployment Guide

Your Paleo Hebrew Learning PWA is now ready for Google Play Store deployment via Bubblewrap.

## Current Setup Status ✓

**HTTPS Domain:** `https://9ac78975-7071-49d6-a638-0aaad26d937c-00-247urhzan7zwl.kirk.replit.dev`
**Package Name:** `com.paleohebrewlearning.app`
**App Name:** `Paleo Hebrew Learning`
**Bubblewrap Config:** Created in `bubblewrap-build/`

## Step 1: Build Android App Bundle

Navigate to the bubblewrap directory and build:

```bash
cd bubblewrap-build
npx bubblewrap build
```

This creates:
- `app-release-unsigned.aab` (needs signing)
- Android signing keystore
- Build artifacts

## Step 2: Upload to Google Play Console

1. **Create app in Play Console:**
   - Go to https://play.google.com/console/
   - Create new app: "Paleo Hebrew Learning"
   - Choose "App" type
   - Select "Free" pricing

2. **Upload to Internal Testing:**
   - Go to Release → Internal Testing
   - Create new release
   - Upload the `.aab` file from bubblewrap-build
   - Complete the release form

## Step 3: Get Digital Asset Links Fingerprint

After uploading to Play Console:

1. **Navigate to App Integrity:**
   - Go to Setup → App Integrity
   - Find "App signing key certificate"
   - Copy the SHA-256 certificate fingerprint

2. **Update assetlinks.json:**
   Replace `TO_BE_UPDATED_AFTER_PLAY_CONSOLE_UPLOAD` with the actual fingerprint:
   ```json
   [{
     "relation": ["delegate_permission/common.handle_all_urls"],
     "target": {
       "namespace": "android_app",
       "package_name": "com.paleohebrewlearning.app",
       "sha256_cert_fingerprints": ["ACTUAL_SHA256_FROM_PLAY_CONSOLE"]
     }
   }]
   ```

## Step 4: Deploy Digital Asset Links

Add route to serve assetlinks.json from your Replit app:

```javascript
// Add to server/routes.ts
app.get("/.well-known/assetlinks.json", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.resolve(process.cwd(), "bubblewrap-build/assetlinks.json"));
});
```

Verify accessible at:
`https://9ac78975-7071-49d6-a638-0aaad26d937c-00-247urhzan7zwl.kirk.replit.dev/.well-known/assetlinks.json`

## Step 5: Complete Play Store Listing

Use the prepared content from `app-store-assets/`:

**App Details:**
- Title: "Paleo Hebrew Learning"
- Short description: "Learn ancient Paleo Hebrew characters through interactive games"
- Category: Education
- Content rating: Everyone

**Store Listing Assets:**
- Screenshots (required for phones and tablets)
- Feature graphic (1024 x 500 px)
- App icon (512 x 512 px)

## Step 6: Test and Verify

1. **Internal Testing:**
   - Install from Play Console internal testing link
   - Verify app opens in full-screen (no address bar)
   - Test all PWA functionality works

2. **Digital Asset Links Verification:**
   - Use Google's verification tool
   - Ensure full-screen operation
   - No browser chrome should be visible

## Step 7: Production Release

1. **Move to Production:**
   - Promote from internal testing
   - Complete required questionnaires
   - Set pricing and distribution

2. **Review Process:**
   - Google Play review: 2-3 hours typically
   - Educational apps often approved quickly
   - Monitor for any policy issues

## Troubleshooting Common Issues

**Address Bar Still Visible:**
- Check assetlinks.json is accessible via HTTPS
- Verify SHA-256 fingerprint matches exactly
- Clear app data and reinstall
- Check for URL redirects

**Build Failures:**
- Ensure Java JDK 8 or 11 installed
- Update Android SDK build tools
- Check Gradle wrapper permissions

**PWA Not Loading:**
- Verify service worker is registered
- Check manifest.json accessibility
- Test HTTPS certificate validity

## Expected Timeline

- Bubblewrap build: 10-15 minutes
- Play Console setup: 30 minutes  
- Digital Asset Links config: 15 minutes
- Google Play review: 2-3 hours
- **Total: Same day deployment**

Your Paleo Hebrew Learning app with Morgan Freeman-style narration and diverse character representation is well-positioned for quick approval due to its educational value and compliance with Google Play policies.

## Files Ready for Deployment

- `bubblewrap-build/twa-manifest.json` - Trusted Web Activity configuration
- `bubblewrap-build/assetlinks.json` - Digital Asset Links (update SHA-256)
- `app-store-assets/` - Complete store listing content
- PWA served at your HTTPS Replit domain

Proceed with the build command in bubblewrap-build directory to create your Android app bundle.