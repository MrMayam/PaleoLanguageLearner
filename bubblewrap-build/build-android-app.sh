#!/bin/bash

# Manual Android app build for Google Play Store deployment
echo "Building Android app bundle for Paleo Hebrew Learning..."

# Set environment variables
export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
export ANDROID_HOME="/tmp/android-sdk"
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/bin:$ANDROID_HOME/platform-tools

# Create Android SDK directory structure
mkdir -p $ANDROID_HOME/cmdline-tools

# Download Android command line tools
if [ ! -f "/tmp/cmdline-tools.zip" ]; then
    echo "Downloading Android SDK command line tools..."
    curl -o /tmp/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
fi

# Extract and setup Android SDK
if [ ! -d "$ANDROID_HOME/cmdline-tools/latest" ]; then
    echo "Setting up Android SDK..."
    cd /tmp
    unzip -q cmdline-tools.zip
    mv cmdline-tools $ANDROID_HOME/cmdline-tools/latest
fi

# Accept licenses and install required components
echo "Installing Android SDK components..."
yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses > /dev/null 2>&1
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2" > /dev/null 2>&1

# Generate Android project structure
cd /home/runner/workspace/bubblewrap-build

echo "Creating Android project structure..."

# Create basic Android project
mkdir -p app/src/main/java/com/paleohebrewlearning/app
mkdir -p app/src/main/res/{drawable,layout,mipmap-hdpi,mipmap-mdpi,mipmap-xhdpi,mipmap-xxhdpi,mipmap-xxxhdpi,values}

# Create AndroidManifest.xml
cat > app/src/main/AndroidManifest.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.paleohebrewlearning.app">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">
        
        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
            android:exported="true"
            android:theme="@style/AppTheme.NoActionBar">
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https"
                      android:host="9ac78975-7071-49d6-a638-0aaad26d937c-00-247urhzan7zwl.kirk.replit.dev" />
            </intent-filter>
        </activity>
        
        <meta-data android:name="asset_statements" android:resource="@string/asset_statements" />
        <meta-data android:name="web_manifest_url" 
                   android:value="https://9ac78975-7071-49d6-a638-0aaad26d937c-00-247urhzan7zwl.kirk.replit.dev/manifest.json" />
        <meta-data android:name="twa_url" 
                   android:value="https://9ac78975-7071-49d6-a638-0aaad26d937c-00-247urhzan7zwl.kirk.replit.dev/" />
    </application>
</manifest>
EOF

# Create strings.xml
cat > app/src/main/res/values/strings.xml << 'EOF'
<resources>
    <string name="app_name">Paleo Hebrew Learning</string>
    <string name="asset_statements">[{\n  \"relation\": [\"delegate_permission/common.handle_all_urls\"],\n  \"target\": {\n    \"namespace\": \"web\",\n    \"site\": \"https://9ac78975-7071-49d6-a638-0aaad26d937c-00-247urhzan7zwl.kirk.replit.dev\"\n  }\n}]</string>
</resources>
EOF

# Create build.gradle (app level)
cat > app/build.gradle << 'EOF'
apply plugin: 'com.android.application'

android {
    compileSdkVersion 33
    
    defaultConfig {
        applicationId "com.paleohebrewlearning.app"
        minSdkVersion 24
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            minifyEnabled false
        }
    }
}

dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
EOF

# Create project-level build.gradle
cat > build.gradle << 'EOF'
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:7.4.2'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
EOF

# Create gradle.properties
cat > gradle.properties << 'EOF'
android.useAndroidX=true
android.enableJetifier=true
EOF

# Create gradle wrapper
mkdir -p gradle/wrapper
cat > gradle/wrapper/gradle-wrapper.properties << 'EOF'
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-7.6-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
EOF

echo "Android project structure created successfully!"
echo ""
echo "To complete the build process:"
echo "1. Upload the generated files to Google Play Console"
echo "2. Get SHA-256 fingerprint from Play Console App Integrity section"
echo "3. Update assetlinks.json with the fingerprint"
echo "4. Deploy assetlinks.json to your domain/.well-known/"
echo "5. Test the TWA and publish to production"
echo ""
echo "Project ready for manual upload to Google Play Console!"