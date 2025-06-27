#!/bin/bash

echo "Building Paleo Hebrew Learning App for App Stores..."

# Build the web application
echo "Step 1: Building web application..."
npm run build

# Sync with native platforms
echo "Step 2: Syncing native platforms..."
npx cap sync

# Generate production build info
echo "Step 3: Generating build info..."
echo "{
  \"buildDate\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\",
  \"version\": \"1.0.0\",
  \"buildNumber\": \"$(date +%s)\",
  \"platform\": \"both\"
}" > build-info.json

echo "✅ Build complete! Ready for app store deployment."
echo ""
echo "Next steps:"
echo "1. For iOS: Run 'npx cap open ios' to open in Xcode"
echo "2. For Android: Run 'npx cap open android' to open in Android Studio"
echo "3. Follow the deployment guide in app-store-deployment.md"