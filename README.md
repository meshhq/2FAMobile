# Two Factor Authenticator Mobile Client

This repository contains the source code for a 2 Factor authentication application written in react native. The application allows you to generate and store time-based one-time passwords ([TOTP](https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm)).

[![CircleCI](https://circleci.com/gh/meshhq/2FAMobile/tree/master.svg?style=svg)](https://circleci.com/gh/meshhq/2FAMobile/tree/master)

## Getting Started

Clone this repository to your local machine.

```git clone git@github.com:meshhq/2FAMobile.git```

Execute the following command to install dependencies.

```npm install```

For the best testing experience you'll want to download the [Expo app](https://expo.io/) app from the [App Store](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) or the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en). Using the Expo app, you can scan a QR code generated in the command line and run the app on an actual device.


execute the following from this project's root directory to see the QR code.

```npm start```

## Available Scripts

Execute the following to build and run the app for iOS.

```npm run start:ios```

This runs your app in development mode for iOS.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

This command will also open and run the app on the Xcode iOS simulator.

Execute the following to build and run the app for Android.

```npm run start:android```

Runs your app in development mode for Android.

Open it in the [Expo app](https://expo.io) on your Android device to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

This command will also open and run the app on an Android Studio virtual device.

Note: You need to have a simulator configured and running for this command to launch on an Android Studio virtual device.

[More info on creating and managing virtual devices](https://developer.android.com/studio/run/managing-avds.html)

## Reset build cache

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

Note: Sometimes the Expo app will not be able to load the bundle and the React Native packager will need to be reset. It may also be helpful to remove and re-install `node_modules` if this happens.

## Writing and Running Tests

Execute the following to run the [jest](https://github.com/facebook/jest) test runner on your tests.

```npm test```

Execute the following start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

This project is set up to use [jest](https://facebook.github.io/jest/) for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See the [the template project](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/App.test.js) for an example test. The [jest documentation](https://facebook.github.io/jest/docs/en/getting-started.html) is also a wonderful resource, as is the [React Native testing tutorial](https://facebook.github.io/jest/docs/en/tutorial-react-native.html).

## Eject native project files.

Execute the following to create Xcode and Android Studios project folders that reflect your React Native code.

```npm run eject```

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.
