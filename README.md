# Emergency Data Collection App

## Overview
This is an emergency data collection application built with React Native and Expo, designed for first responders and emergency personnel to collect, store, and export field data.

## Requirements
To use Expo, you need to have the following tools installed on your machine:
- [Node.js LTS release](https://nodejs.org/en) - Only Node.js LTS releases (even-numbered) are recommended.
- [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall) (for Linux or macOS users).

To run the app natively on your device, you will need to install:
- [Expo Go](https://expo.dev/client)

## Project Structure

This project uses Expo's development build workflow. The `android/` and `ios/` native directories are tracked in the repository for development purposes.

## How to Run the Application

```bash
# Navigate to the EmergencyDataCollectionApp directory
cd EmergencyDataCollectionApp

# Install dependencies
npm install

# Run one of the following npm commands
npm run android  # Run on Android
npm run ios      # Run on iOS
npm run web      # Run on web

# Alternatively, start the development server to open the app natively on your device
npx expo start
```

## Build Configuration

### iOS Build Notes

The iOS build requires specific workarounds for simulator compatibility. The repository includes:
- `fix-simulator-issue.js`: A postinstall script that fixes `TARGET_OS_SIMULATOR` issues in Swift/Objective-C dependencies
- Custom build settings in `app.json` for simulator compatibility

**Important:** Do not remove the iOS simulator workaround scripts or build settings, as they are required for successful iOS builds.

### Android Build Notes

Android builds are configured with ProGuard optimization for release builds. See `app.json` for detailed configuration.

### Bundle Identifiers

The app uses different bundle identifiers for iOS and Android:
- **iOS:** `com.shunt161.EmergencyDataCollectionApp`
- **Android:** `com.davidhanley26.EmergencyDataCollectionApp`

This is intentional due to separate developer accounts used during initial development.

## Database

The app uses SQLite for local data storage via `expo-sqlite`. All data is stored locally on the device.

## Patches

The repository includes patches for third-party dependencies managed by `patch-package`:
- `expo-modules-core`: Fixes a null pointer issue in Android permissions handling

These patches are automatically applied during `npm install` via the postinstall script.

## Development

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

## Building for Production

This project uses EAS Build for creating production builds. Configuration is in `eas.json`.

```bash
# For iOS
eas build --platform ios --profile production

# For Android
eas build --platform android --profile production
```

## Contributing

When contributing to this project:
1. Maintain the existing code structure
2. Do not remove the iOS simulator workaround scripts
3. Test on both iOS and Android platforms
4. Keep bundle identifiers as configured

## License

[Add your license information here]
