# SpeechProportion

Build status: [![CircleCI](https://circleci.com/gh/uvesten/SpeechProportion.svg?style=svg&circle-token=524d57ef6e6eccb688ed9a2d704426da90559c14)](https://circleci.com/gh/uvesten/SpeechProportion)

This app determines the proportion of speech versus silence during the last two seconds, and shows it as a continuously updating pie chart.

# For contributors 

## Prerequisites:

__NOTE__: This project has been developed on macOS, and instructions are written for this platform. However, it should be possible to build and run on Linux too, except for the iOS parts. YMMV.  

Make sure you have the following installed

- Latest version of Xcode. Install it from the App Store. 
- Node and npm: https://nodejs.org/en/
- Yarn package manager: https://yarnpkg.com/en/docs/install#mac-stable
- react-native: go to https://facebook.github.io/react-native/docs/getting-started and follow the instructions for _React Native CLI Quickstart_
- Fastlane: go to https://docs.fastlane.tools/getting-started/ios/setup/ and follow the instructions for getting the Xcode command line tools installed (if you're on a mac). Fastlane is already set up in our repository, so you should only need to run `[sudo] bundle update`, and then you can use the `bundle exec fastlane` commands
- Android Studio: https://developer.android.com/studio Once installed, use `Tools -> AVD Manager` to set up an emulator for running and testing. 



## Initial project setup

Once you have cloned the repo and have the prerequisites installed, run `yarn` and `bundle install` in the root directory. That's it. 

## Running and building

From the root directory of the project:

* iOS:

    Run `react-native run-ios` 


* Android:

    Start an Android emulator from Android Studio, using `Tools -> AVD Manager`, then run `react-native run-android`

## Testing locally

- `yarn test` - by far the fastest, tests only the javascript parts.
- `bundle exec fastlane android test` - slower, but also tests platform-specific code
- `bundle exec fastlane ios test` - slower, but also tests platform-specific code


(__NOTE__: We also use continuous integration using CircleCI , so when you submit your first pull request you can be sure that there are tests running. Speaking of that, whenever you add new functionality, please add tests for that functionality.)

## Notes

I recommend Visual Studio Code for development, since it has excellent typescript support.
