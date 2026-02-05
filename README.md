# Run this web app on Android and iOS (Capacitor)

This repository contains a small web app (`index.html`, `script.js`, `styles.css`, `assets/`). The steps below show how to wrap it with Capacitor and run on Android (Windows) and iOS (macOS).

## Prerequisites

- Node.js and npm installed
- For Android: Android Studio, SDK, and Java (JDK) installed
- For iOS: Xcode (macOS only)

## Quick steps (Windows → Android)

### 1. Install dependencies:

```powershell
npm install
```

### 2. Generate app icons from SVG:

```powershell
npm run generate:icons
```

This creates PNG icons (96x192x512) for the app and PWA.

### 3. Prepare web assets (creates `www/` directory):

```powershell
npm run prepare:web
```

### 4. Initialize Capacitor (only needed once):

```powershell
npm run cap:init
```

### 5. Add Android platform and open in Android Studio:

```powershell
npm run cap:add:android
npm run cap:open:android
```

### 6. In Android Studio:
- Select a device or emulator
- Click "Run" to build and deploy the app

## Notes for iOS (requires macOS)

On a Mac, after steps 1–3 above, run:

```bash
npm run cap:init
npm run cap:add:ios
npm run cap:open:ios
```

Xcode will open the workspace; choose a device or simulator and run.

## Features

- **PWA Support**: Manifest, service worker, and offline caching included
- **Native App Icons**: Automatically generated from `assets/icon.svg`
- **Service Worker**: `sw.js` provides offline support and caching
- **Responsive Design**: Works on any screen size
- **Capacitor Integration**: Single codebase for web, Android, and iOS

## Updating web code

1. Edit your `index.html`, `script.js`, `styles.css`, or add files under `assets/`
2. Run `npm run prepare:web` to copy changes into `www/`
3. In the native IDE (Android Studio/Xcode), run the app or use:
   ```powershell
   npx cap sync
   ```

## Helpful commands

Prepare web and sync native projects:

```powershell
npm run prepare:web; npx cap sync
```

View available scripts:

```powershell
npm run
```

## Limitations

- **iOS builds** require a Mac with Xcode. You cannot build iOS natively on Windows.
- Alternatively, use cloud CI (GitHub Actions, Ionic Appflow, or similar) to build iOS binaries from non-macOS machines.

## Project Structure

```
.
├── index.html              # Main HTML
├── script.js               # JavaScript logic
├── styles.css              # Styles
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── package.json            # Dependencies & scripts
├── capacitor.config.json   # Capacitor config
├── scripts/
│   ├── copy-web.js         # Copies web files to www/
│   └── generate-icons.js   # Generates PNG icons
├── assets/
│   ├── icon.svg            # Source icon (edit this)
│   ├── icon-*.png          # Generated icons
│   └── ...                 # Other assets
└── www/                    # Built web directory (generated)
```

## Next Steps

1. Edit `assets/icon.svg` to customize the app icon
2. Update `manifest.json` to change app name, description, or colors
3. Add more images, music, or files under `assets/` as needed
4. Build and test on your target platforms
