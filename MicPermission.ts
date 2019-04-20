import {PermissionsAndroid} from 'react-native';


async function requestMicPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone permissions needed',
        message:
          'SpeechProportion needs to use the ' +
          'microphone to be able to distinguish speech from silence.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the microphone');
    } else {
      console.log('Microphone permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export { requestMicPermission }