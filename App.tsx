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
import ProportionView from './ProportionView'
//import { soundWriterListenerFactory } from './FileWriter'

import MicStream from 'react-native-microphone-dsp'
import { calculateRMS } from './RMSCalculator'

interface Props {}
export default class App extends Component<Props> {
  state = {
    modalVisible: false,
    listening: false,
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible })
  }

  startListening = async () => {
    if (Platform.OS === 'android') {
      await requestMicPermission()
    }

    const listener = MicStream.addListener(async data => {
      console.log(await calculateRMS(data))
    })

    MicStream.init({
      bufferSize: 1024,
      sampleRate: 11025,
      bitsPerChannel: 8,
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
          <View style={styles.container}>
            <View>
              <Text style={styles.welcome}>Listening!</Text>

              <ProportionView />
              <Button
                title="Stop listening"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                  App.stopListening()
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
