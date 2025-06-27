#!/bin/bash

# Build script for Bubblewrap PWA to Play Store deployment
# This script prepares the PWA for deployment and Bubblewrap packaging

echo "🏗️  Building Paleo Hebrew Learning PWA for Bubblewrap deployment..."

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf dist
rm -rf .bubblewrap

# Build production version
echo "Building production version..."
npm run build

# Verify critical PWA files exist
echo "Verifying PWA requirements..."

if [ ! -f "dist/public/manifest.json" ]; then
    echo "❌ Error: manifest.json not found in build output"
    exit 1
fi

if [ ! -f "dist/public/sw.js" ]; then
    echo "❌ Error: service worker not found in build output"
    exit 1
fi

# Create .well-known directory for Digital Asset Links
echo "Creating .well-known directory for Digital Asset Links..."
mkdir -p dist/public/.well-known

# Create placeholder assetlinks.json (to be updated after Bubblewrap init)
cat > dist/public/.well-known/assetlinks.json << 'EOF'
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.paleohebrewlearning.app",
    "sha256_cert_fingerprints": ["PLACEHOLDER_FINGERPRINT_TO_BE_UPDATED"]
  }
}]
EOF

# Create deployment-ready package info
cat > dist/deployment-info.json << 'EOF'
{
  "deployment_type": "bubblewrap_pwa",
  "package_name": "com.paleohebrewlearning.app",
  "app_name": "Paleo Hebrew Learning",
  "version": "1.0.0",
  "version_code": 1,
  "domain": "HTTPS_DOMAIN_TO_BE_SET",
  "manifest_url": "HTTPS_DOMAIN_TO_BE_SET/manifest.json",
  "start_url": "HTTPS_DOMAIN_TO_BE_SET/",
  "requirements": {
    "https_required": true,
    "digital_asset_links_required": true,
    "java_jdk": "8 or 11",
    "android_sdk": "required"
  },
  "next_steps": [
    "Deploy dist/public to HTTPS domain",
    "Update deployment-info.json with actual domain",
    "Run: npx bubblewrap init --manifest https://your-domain.com/manifest.json",
    "Build Android app: npx bubblewrap build",
    "Upload to Google Play Console"
  ]
}
EOF

# Verify build size (PWAs should be lightweight)
echo "Checking build size..."
BUILD_SIZE=$(du -sh dist | cut -f1)
echo "Total build size: $BUILD_SIZE"

# Check for large files that might affect performance
echo "Checking for large files..."
find dist -type f -size +1M -exec ls -lh {} \; | awk '{ print $9 ": " $5 }'

# Validate manifest.json
echo "Validating manifest.json..."
if command -v node >/dev/null 2>&1; then
    node -e "
    const fs = require('fs');
    try {
        const manifest = JSON.parse(fs.readFileSync('dist/public/manifest.json', 'utf8'));
        console.log('✅ Manifest is valid JSON');
        console.log('App name:', manifest.name);
        console.log('Start URL:', manifest.start_url);
        console.log('Display mode:', manifest.display);
        console.log('Icons count:', manifest.icons?.length || 0);
        console.log('Shortcuts count:', manifest.shortcuts?.length || 0);
    } catch(e) {
        console.log('❌ Manifest validation failed:', e.message);
        process.exit(1);
    }
    "
fi

echo "✅ PWA build completed successfully!"
echo ""
echo "📦 Build output location: dist/public"
echo "🔗 Next step: Deploy to HTTPS domain for Bubblewrap"
echo ""
echo "🚀 Bubblewrap deployment steps:"
echo "1. Deploy dist/public to your HTTPS domain"
echo "2. Update deployment-info.json with your domain"
echo "3. Run: npx bubblewrap init --manifest https://your-domain.com/manifest.json"
echo "4. Build Android app: npx bubblewrap build"
echo "5. Upload .aab file to Google Play Console"
echo ""
echo "📝 See bubblewrap-setup.md for detailed instructions"