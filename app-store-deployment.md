# App Store Deployment Guide

## Prerequisites

### For iOS App Store:
1. **Apple Developer Account** ($99/year)
   - Sign up at https://developer.apple.com/
   - Required for app submission and distribution

2. **Mac Computer with Xcode**
   - Xcode 14+ required
   - Available free from Mac App Store

3. **iOS Development Setup**
   - iOS Simulator for testing
   - Physical iOS device for final testing

### For Google Play Store:
1. **Google Play Developer Account** ($25 one-time fee)
   - Sign up at https://play.google.com/console/
   - Required for app submission

2. **Android Studio**
   - Download from https://developer.android.com/studio
   - Includes Android SDK and emulators

## Build Process

### 1. Build the Web App
```bash
npm run build
```

### 2. Sync Native Projects
```bash
npx cap sync
```

### 3. Open Native Projects

#### For iOS:
```bash
npx cap open ios
```
This opens the project in Xcode where you can:
- Configure app icons and splash screens
- Set app metadata (name, version, bundle ID)
- Build and archive for App Store submission

#### For Android:
```bash
npx cap open android
```
This opens the project in Android Studio where you can:
- Configure app icons and splash screens
- Set app metadata in build.gradle
- Generate signed APK/AAB for Play Store

## App Store Submission Steps

### iOS App Store Submission:

1. **In Xcode:**
   - Select "Any iOS Device" as target
   - Product → Archive
   - Upload to App Store Connect

2. **In App Store Connect:**
   - Complete app information
   - Add screenshots (required sizes: 6.7", 6.5", 5.5", 12.9")
   - Set pricing and availability
   - Submit for review

3. **App Review Process:**
   - Usually takes 24-48 hours
   - Apple reviews for guidelines compliance
   - Educational apps get priority review

### Google Play Store Submission:

1. **In Android Studio:**
   - Build → Generate Signed Bundle/APK
   - Choose Android App Bundle (AAB)
   - Upload to Play Console

2. **In Play Console:**
   - Complete store listing
   - Add screenshots and descriptions
   - Set content rating (Educational)
   - Submit for review

3. **App Review Process:**
   - Usually takes 2-3 hours for new apps
   - Google Play reviews are typically faster

## App Metadata

### App Description:
"Learn ancient Paleo Hebrew characters through interactive games and activities. Features authentic character pronunciation, tracing practice, word building, and progress tracking. Perfect for children and adults interested in ancient languages and biblical studies."

### Keywords:
- Hebrew, Paleo Hebrew, Ancient Languages
- Educational, Learning, Kids
- Biblical Studies, Archaeology
- Language Learning, Character Recognition

### Age Rating:
- iOS: 4+ (Educational content suitable for all ages)
- Android: Everyone (Educational content)

### Categories:
- Primary: Education
- Secondary: Reference/Books (iOS), Educational/Education (Android)

## App Icons and Assets

The app uses SVG icons that need to be converted to platform-specific formats:

### iOS Icon Sizes Needed:
- 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

### Android Icon Sizes Needed:
- 48x48, 72x72, 96x96, 144x144, 192x192, 512x512

### Screenshots Required:
- iOS: 6.7", 6.5", 5.5" iPhone screenshots, 12.9" iPad screenshots
- Android: Phone and tablet screenshots

## Monetization Setup

### In-App Purchases:
- Premium subscription ($4.99/month, $39.99/year)
- Character packs ($2.99-$3.99 each)
- School licenses ($299/year)

### App Store Configuration:
1. Set up products in App Store Connect (iOS) or Play Console (Android)
2. Configure Stripe webhooks for subscription management
3. Test purchases in sandbox environment

## Privacy and Compliance

### Privacy Policy Required:
- Data collection practices
- User progress tracking
- Subscription management
- COPPA compliance for children under 13

### App Store Guidelines:
- Educational content guidelines
- Child safety requirements
- In-app purchase guidelines
- Accessibility standards

## Testing Checklist

Before submission:
- [ ] App launches without crashes
- [ ] All learning modules function correctly
- [ ] Audio pronunciation works
- [ ] Progress tracking saves properly
- [ ] In-app purchases work (sandbox)
- [ ] Offline functionality works
- [ ] PWA features work in native app
- [ ] App icons display correctly
- [ ] Splash screen shows properly

## Next Steps

1. **Complete app development** ✓
2. **Set up developer accounts** (user action required)
3. **Generate app icons** and screenshots
4. **Test thoroughly** on devices
5. **Submit to stores** with completed metadata
6. **Monitor reviews** and respond to feedback

## Support

For issues during deployment:
- iOS: Apple Developer Support
- Android: Google Play Developer Support
- Capacitor: https://capacitorjs.com/docs/