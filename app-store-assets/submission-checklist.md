# App Store Submission Checklist

## Pre-Submission Requirements

### Developer Accounts ✓
- [ ] Apple Developer Account ($99/year) - Sign up at https://developer.apple.com/
- [ ] Google Play Developer Account ($25 one-time) - Sign up at https://play.google.com/console/
- [ ] Verify identity and complete enrollment process
- [ ] Accept developer agreements

### Development Environment ✓
- [ ] Mac with Xcode 14+ (for iOS)
- [ ] Android Studio with latest SDK (for Android)
- [ ] Test devices or simulators/emulators

## App Preparation Checklist

### Build and Test ✓
- [ ] Run `./scripts/build-for-stores.sh` to prepare builds
- [ ] Test all app functionality thoroughly
- [ ] Verify offline capabilities work
- [ ] Test on multiple device sizes
- [ ] Check audio pronunciation works correctly
- [ ] Verify in-app purchases in sandbox mode

### App Metadata
- [ ] App name: "Paleo Hebrew Learning"
- [ ] Bundle ID (iOS): com.paleohebrewlearning.app
- [ ] Package name (Android): com.paleohebrewlearning.app
- [ ] Version: 1.0.0
- [ ] Build number: 1
- [ ] Category: Education
- [ ] Age rating: 4+ (iOS) / Everyone (Android)

### Required Assets
- [ ] App icons (all required sizes)
- [ ] Screenshots for all device types
- [ ] Privacy policy uploaded and URL ready
- [ ] App descriptions written and reviewed
- [ ] Keywords researched and selected

## iOS App Store Submission

### Xcode Configuration
- [ ] Open project: `npx cap open ios`
- [ ] Set development team in project settings
- [ ] Verify bundle identifier matches registered app
- [ ] Configure app icons and launch images
- [ ] Set deployment target (iOS 14.0+)
- [ ] Test build on device

### App Store Connect Setup
- [ ] Create app record in App Store Connect
- [ ] Fill in app information:
  - [ ] Name and subtitle
  - [ ] Primary and secondary categories
  - [ ] Age rating questionnaire
  - [ ] Privacy policy URL
  - [ ] Support URL
- [ ] Configure pricing (Free with IAP)
- [ ] Set up in-app purchases:
  - [ ] Premium Monthly ($4.99)
  - [ ] Premium Yearly ($39.99)
  - [ ] Character packs ($2.99-$3.99)
  - [ ] School license ($299)

### Privacy and Compliance
- [ ] Complete App Privacy section
- [ ] Data collection: Minimal (purchase history only)
- [ ] Data usage: App functionality, analytics
- [ ] Third-party data sharing: None
- [ ] Age-appropriate design compliance
- [ ] Export compliance declaration

### Screenshots and Media
- [ ] iPhone 6.7" screenshots (1290 x 2796)
- [ ] iPhone 6.5" screenshots (1242 x 2688)
- [ ] iPhone 5.5" screenshots (1242 x 2208)
- [ ] iPad 12.9" screenshots (2048 x 2732)
- [ ] App preview videos (optional but recommended)

### Final Submission
- [ ] Archive app in Xcode
- [ ] Upload to App Store Connect
- [ ] Complete version information
- [ ] Add release notes
- [ ] Submit for review

## Google Play Store Submission

### Android Studio Configuration
- [ ] Open project: `npx cap open android`
- [ ] Verify package name in build.gradle
- [ ] Set version code and name
- [ ] Configure app icons and splash screen
- [ ] Generate signed App Bundle (AAB)

### Play Console Setup
- [ ] Create app in Play Console
- [ ] Complete main store listing:
  - [ ] Short description (80 chars)
  - [ ] Full description
  - [ ] Screenshots (phone and tablet)
  - [ ] Feature graphic
  - [ ] App icon
- [ ] Set content rating through questionnaire
- [ ] Configure pricing and distribution

### Data Safety
- [ ] Complete data safety form
- [ ] Specify data collection practices
- [ ] Privacy policy requirements
- [ ] Target audience selection

### Release Configuration
- [ ] Upload signed AAB file
- [ ] Set release type (Managed publishing)
- [ ] Configure in-app products
- [ ] Set up subscription billing

### Final Submission
- [ ] Review all information
- [ ] Submit for review

## Post-Submission Monitoring

### Review Process
- [ ] Monitor App Store Connect for iOS review status
- [ ] Monitor Play Console for Android review status
- [ ] Respond to reviewer questions promptly
- [ ] Fix any issues and resubmit if needed

### Launch Preparation
- [ ] Prepare marketing materials
- [ ] Set up analytics and crash reporting
- [ ] Create support documentation
- [ ] Plan update schedule

## Common Issues and Solutions

### iOS Rejections
- **Binary rejection**: Rebuild and upload new version
- **Metadata rejection**: Update descriptions or screenshots
- **Guidelines violation**: Review and modify app functionality
- **Privacy issues**: Update privacy policy or data practices

### Android Rejections
- **Policy violation**: Review content and privacy practices
- **Technical issues**: Fix crashes or performance problems
- **Target API**: Update to latest API level requirements

## Timeline Expectations

### iOS App Store
- Account setup: 1-2 days
- App preparation: 3-5 days
- Review process: 24-48 hours
- **Total**: ~1 week

### Google Play Store
- Account setup: 1-2 days
- App preparation: 2-3 days
- Review process: 2-3 hours
- **Total**: 3-4 days

## Support Resources

### Documentation
- iOS: https://developer.apple.com/app-store/review/guidelines/
- Android: https://support.google.com/googleplay/android-developer/

### Contact Support
- iOS: Apple Developer Support
- Android: Google Play Developer Support
- App issues: Check generated build logs and crash reports

## Success Metrics to Track

### Downloads and Engagement
- [ ] Download numbers
- [ ] User retention rates
- [ ] Session duration
- [ ] Feature usage analytics

### Monetization
- [ ] In-app purchase conversion rates
- [ ] Subscription retention
- [ ] Revenue per user
- [ ] Refund rates

### Quality Metrics
- [ ] App store ratings and reviews
- [ ] Crash reports and bug fixes
- [ ] User feedback and support requests
- [ ] Performance metrics

## Next Steps After Approval

1. **Monitor initial reception**
   - Track downloads and reviews
   - Respond to user feedback
   - Fix any reported issues quickly

2. **Marketing and promotion**
   - Social media announcement
   - Educational blog content
   - Reach out to homeschool communities
   - Contact biblical studies educators

3. **Continuous improvement**
   - Plan feature updates
   - Add new character packs
   - Improve user experience based on feedback
   - Expand to additional platforms if successful

Your Paleo Hebrew Learning app is well-positioned for approval on both platforms due to its educational value, family-friendly content, and compliance with platform guidelines.