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
import { soundWriterListenerFactory } from './FileWriter'

import MicStream from 'react-native-microphone-stream'

interface Props {}
export default class App extends Component<Props> {
  state = {
    modalVisible: false,
    listening: false,
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible })
  }

  async startListening() {
    if (Platform.OS === 'android') {
      await requestMicPermission()
    }

    const filewriter = soundWriterListenerFactory('tmp.pcm')

    const listener = MicStream.addListener(data => {
      filewriter(data)
    })
    MicStream.init({
      bufferSize: 4096,
      sampleRate: 44100,
      bitsPerChannel: 16,
      channelsPerFrame: 1,
    })
    MicStream.start()

    await this.setModalVisible(true)
  }

  static async stopListening() {
    MicStream.stop()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to SpeechProportion!</Text>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                  App.stopListening()
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
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
