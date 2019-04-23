SpeechProportion
================

Build status: [![CircleCI](https://circleci.com/gh/uvesten/SpeechProportion.svg?style=svg&circle-token=524d57ef6e6eccb688ed9a2d704426da90559c14)](https://circleci.com/gh/uvesten/SpeechProportion)

This app determines the proportion of speech versus silence during the last two seconds, and shows it as nicely updating bar graphs. 

Contributor prerequesites:

* react-native: go to https://facebook.github.io/react-native/docs/getting-started and follow the instructions for _React Native CLI Quickstart_ 
* Fastlane: go to https://docs.fastlane.tools/getting-started/ios/setup/ and follow the instructions for getting the xcode command line tools installed (if you're on a mac). Fastlane is already set up in our repository, so you should only need to run `[sudo] bundle update`, and then you can use the `bundle exec fastlane` commands 

And we use contious integration using CircleCI , so when you submit your first pull request you can be sure that there are tests running. Speaking of that, whenever you add new functionality, please add tests for that functionality.

Tips for local testing: 

* `yarn test` - by far the fastest, tests only the javascript parts. 
* `bundle exec fastlane android test` - slower, but also tests platform-specific code
* `bundle exec fastlane ios test` - slower, but also tests platform-specific code

I recommend Visual Studio Code for development, since it has excellent typescript support.  
