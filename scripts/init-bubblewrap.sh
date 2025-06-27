#!/bin/bash

# Bubblewrap initialization script for Paleo Hebrew Learning PWA
# Run this after deploying your PWA to an HTTPS domain

echo "🎯 Initializing Bubblewrap for Paleo Hebrew Learning PWA..."

# Check if domain is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your HTTPS domain"
    echo "Usage: ./scripts/init-bubblewrap.sh https://your-domain.com"
    echo "Example: ./scripts/init-bubblewrap.sh https://paleohebrewlearning.com"
    exit 1
fi

DOMAIN=$1
MANIFEST_URL="$DOMAIN/manifest.json"
PACKAGE_NAME="com.paleohebrewlearning.app"
APP_NAME="Paleo Hebrew Learning"

# Remove protocol and trailing slash for clean domain
CLEAN_DOMAIN=$(echo $DOMAIN | sed 's|https\?://||' | sed 's|/$||')

echo "Domain: $DOMAIN"
echo "Manifest URL: $MANIFEST_URL"
echo "Package name: $PACKAGE_NAME"

# Verify HTTPS domain is accessible
echo "🔍 Verifying HTTPS domain accessibility..."
if curl -f -s "$MANIFEST_URL" > /dev/null; then
    echo "✅ Manifest accessible at $MANIFEST_URL"
else
    echo "❌ Error: Cannot access manifest at $MANIFEST_URL"
    echo "Please ensure your PWA is deployed and accessible via HTTPS"
    exit 1
fi

# Check if Bubblewrap is installed
if ! command -v bubblewrap &> /dev/null; then
    echo "Installing Bubblewrap CLI..."
    npm install -g @bubblewrap/cli
fi

# Initialize Bubblewrap project
echo "🚀 Initializing Bubblewrap project..."
bubblewrap init \
    --manifest "$MANIFEST_URL" \
    --directory "bubblewrap-build"

# Navigate to bubblewrap project
cd bubblewrap-build

echo "📝 Updating Bubblewrap configuration..."

# Update twa-manifest.json with optimized settings
cat > twa-manifest.json << EOF
{
  "packageId": "$PACKAGE_NAME",
  "host": "$CLEAN_DOMAIN",
  "name": "$APP_NAME",
  "launcherName": "Paleo Hebrew",
  "display": "standalone",
  "orientation": "portrait",
  "themeColor": "#0891b2",
  "navigationColor": "#0891b2",
  "backgroundColor": "#ffffff",
  "enableNotifications": false,
  "startUrl": "/",
  "iconUrl": "$DOMAIN/icons/icon-512x512.svg",
  "maskableIconUrl": "$DOMAIN/icons/icon-512x512.svg",
  "monochromeIconUrl": "$DOMAIN/icons/icon-512x512.svg",
  "shortcuts": [
    {
      "name": "Learn Alphabet",
      "short_name": "Alphabet",
      "url": "/alphabet",
      "icon": "$DOMAIN/icons/icon-96x96.png"
    },
    {
      "name": "Play Games",
      "short_name": "Games", 
      "url": "/sounds",
      "icon": "$DOMAIN/icons/icon-96x96.png"
    },
    {
      "name": "Trace Letters",
      "short_name": "Trace",
      "url": "/tracing",
      "icon": "$DOMAIN/icons/icon-96x96.png"
    }
  ],
  "generatorApp": "bubblewrap-cli",
  "webManifestUrl": "$MANIFEST_URL",
  "fallbackType": "customtabs",
  "features": {
    "locationDelegation": {
      "enabled": false
    },
    "playBilling": {
      "enabled": true
    }
  },
  "alphaDependencies": {
    "enabled": false
  },
  "enableSiteSettingsShortcut": false,
  "isChromeOSOnly": false,
  "isMetaQuest": false,
  "retainedBundles": [],
  "appVersion": "1.0.0",
  "appVersionCode": 1,
  "signingKey": {
    "path": "./paleo-hebrew-release-key.keystore",
    "alias": "paleo-hebrew-key"
  },
  "keyPassword": "PROMPT",
  "storePassword": "PROMPT"
}
EOF

echo "🔑 Generating Android signing keystore..."
keytool -genkey -v \
    -keystore paleo-hebrew-release-key.keystore \
    -alias paleo-hebrew-key \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -dname "CN=Paleo Hebrew Learning, OU=Education, O=PaleoHebrew, L=City, S=State, C=US" \
    -storepass android \
    -keypass android

echo "📋 Generating Digital Asset Links file..."
# This will be updated with actual fingerprint after first build
cat > assetlinks.json << EOF
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app", 
    "package_name": "$PACKAGE_NAME",
    "sha256_cert_fingerprints": ["TO_BE_UPDATED_AFTER_BUILD"]
  }
}]
EOF

echo "✅ Bubblewrap initialization completed!"
echo ""
echo "📁 Project created in: bubblewrap-build/"
echo ""
echo "🔄 Next steps:"
echo "1. Build the Android app bundle:"
echo "   cd bubblewrap-build && npx bubblewrap build"
echo ""
echo "2. Get SHA-256 fingerprint from Play Console after upload"
echo ""
echo "3. Update assetlinks.json with the fingerprint:"
echo "   - Copy the SHA-256 from Google Play Console"
echo "   - Update assetlinks.json"
echo "   - Deploy to $DOMAIN/.well-known/assetlinks.json"
echo ""
echo "4. Upload .aab file to Google Play Console internal testing"
echo ""
echo "📝 See bubblewrap-setup.md for detailed instructions"