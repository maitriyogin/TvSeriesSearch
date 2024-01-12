This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# TV Series Search

# Quick Start
## IOS
assuming you have an "iPhone 15" simulator installed ...
```bash
npm run ios:all
```

## Android
Assuming you have an android emulator installed

```bash
npm run android 
```

# Getting Started

Tv Series Search comes from the latest React Native project setup and hence requires the same setup as a normal React Native projcet.
It has no extra native dependencies so you should be able to follow the standard build/install/instructions.

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

The notes basically make sure you have

1. Android emulator ( android studio)
2. Java 17
3. Xcode
4. Xcode command line tools
5. Cocoa pods
6. Xcode Simulators
7. node > 18 must be installed or your current
8. yarn or npm can be used to install and run

## Whats in the app

1. Search - You'll be presented with a search bar.
   You can type a search term and click return or done on your respective device keyboards.

2. Paging - if you clear the search bar, you'll go against the shows api and you'll be able to infinite scroll the list
3. Likes - Press the like text and the show will be ammended to your like list and the like footer will turn pink!
4. Details - Press a show image and you'll navigate to the details screen
5. Error - If you get any network errors these will show up in the Error toast just below the search bar
6. Connectivity - didn't get enough time to cover this
7. Persisting - again didn't get enought time.

## Step 1: Install node deps

1. navigate to root of TvSeriesSearch
2. open a terminal and run `npm install`

## Step 2: Run Tests

1. open a terminal and run `npm run test`

## Step 3: Running the app

## Android 
Running on Android as long as you have java 17 and an emulator setup is sometimes easier so we'll start off with

```bash
# using npm
npm run android
```


The app should be copied to your Android emulator and startup, you'll also notice another terminal window for metro opening up.

## iOS
First time build and run using iphone 15:

```
npm run ios:all
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

If you have another simulator then you can edit/add/ammend this line in package.json to match the name and version of your simulator.
```
    "ios:15": "react-native run-ios --simulator=\\\"iPhone 15\\\" --mode Debug",
```


If the app fails to build then opening TvSeriesSearchTests in xcode and then building from there should fix it.

Also if you run from xcode be sure to have the metro server running:

```bash
# ussng npm
npm start 
```

Once the ios app is built you should just be able to have metro running in the background.

Alternatively you can try:

```bash
# ussng npm
npm run ios 
```

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Contact

Stephen White - stephen.white@mac.com
0701415277

Please don't hesitate to call if your running into difficulties!
````
