# Deploy PWA to HTTPS for Bubblewrap

## Quick Deployment Options

### Option 1: Replit Hosting (Immediate)
Your app is already running on HTTPS at your Replit URL. To use this for Bubblewrap:

1. **Get your Replit HTTPS URL:**
   ```
   https://[your-repl-name].[your-username].repl.co
   ```

2. **Initialize Bubblewrap with Replit URL:**
   ```bash
   ./scripts/init-bubblewrap.sh https://[your-repl-name].[your-username].repl.co
   ```

### Option 2: Custom Domain (Recommended for Production)

#### Netlify (Free, Easy Setup)
1. Build your app: `./scripts/build-for-bubblewrap.sh`
2. Sign up at netlify.com
3. Drag and drop `dist/public` folder to Netlify dashboard
4. Get HTTPS URL (e.g., `https://amazing-site-123.netlify.app`)
5. Run: `./scripts/init-bubblewrap.sh https://amazing-site-123.netlify.app`

#### Vercel (Free, GitHub Integration)
1. Sign up at vercel.com
2. Connect GitHub repository
3. Deploy automatically gets HTTPS
4. Use the provided URL with Bubblewrap

#### Firebase Hosting (Google, PWA Optimized)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Build app: `./scripts/build-for-bubblewrap.sh`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`
5. Use Firebase URL with Bubblewrap

## Digital Asset Links Setup

After Bubblewrap generates your Android package:

1. **Upload to Google Play Console internal testing**
2. **Get SHA-256 fingerprint from Play Console:**
   - Go to App Integrity section
   - Copy SHA-256 certificate fingerprint

3. **Update assetlinks.json:**
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

4. **Deploy to your domain:**
   - Upload to `https://your-domain.com/.well-known/assetlinks.json`
   - Verify accessible via browser

## Complete Bubblewrap Process

1. **Deploy PWA to HTTPS** (choose option above)
2. **Initialize Bubblewrap:**
   ```bash
   ./scripts/init-bubblewrap.sh https://your-domain.com
   ```
3. **Build Android app:**
   ```bash
   cd bubblewrap-build
   npx bubblewrap build
   ```
4. **Upload to Play Console and get fingerprint**
5. **Update and deploy assetlinks.json**
6. **Test and publish**

Your Paleo Hebrew Learning PWA is ready for this process with all PWA requirements already met.