/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Alert,
  TouchableHighlight,
} from 'react-native'
import { requestMicPermission } from './MicPermission'

import { AudioRecorder, AudioUtils } from 'react-native-audio'

interface Props {}
export default class App extends Component<Props> {
  state = {
    modalVisible: false,
    listening: false,
    currentTime: 0.0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
    hasPermission: undefined,
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible })
  }

  prepareRecordingPath = async (audioPath: string) => {
    await AudioRecorder.prepareRecordingAtPath(audioPath),
      {
        SampleRate: 8000,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        AudioEncodingBitRate: 12200,
      }
  }

  startListening = async () => {
    if (Platform.OS === 'android') {
      await requestMicPermission()
    }

    let isAuthorised = await AudioRecorder.requestAuthorization()

    this.setState({ hasPermission: isAuthorised })

    if (!isAuthorised) {
      console.log('we did not get authorized for recording')
      return
    }

    await this.prepareRecordingPath(this.state.audioPath)

    AudioRecorder.onProgress = data => {
      this.setState({ currentTime: Math.floor(data.currentTime) })
    }

    AudioRecorder.onFinished = data => {
      // Android callback comes in the form of a promise instead.
      if (Platform.OS === 'ios') {
        this._finishRecording(
          data.status === 'OK',
          data.audioFileURL,
          data.audioFileSize
        )
      }
    }

    const filePath = await AudioRecorder.startRecording()
    await this.setModalVisible(true)
  }

  _finishRecording(didSucceed: boolean, filePath: any, fileSize: undefined) {
    this.setState({ finished: didSucceed })
    console.log(
      `Finished recording of duration ${
        this.state.currentTime
      } seconds at path: ${filePath} and size of ${fileSize || 0} bytes`
    )
  }

  async stopListening() {
    try {
      const filePath = await AudioRecorder.stopRecording()

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath)
      }
      return filePath
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to SpeechProportion!</Text>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.container}>
            <View>
              <Button
                title="Stop listening"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                  this.stopListening()
                }}
              />
            </View>
          </View>
        </Modal>
        <Button title="Start listening" onPress={this.startListening} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
