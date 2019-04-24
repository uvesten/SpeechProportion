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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faCoffee,
  faAssistiveListeningSystems,
  faCaretSquareLeft,
} from '@fortawesome/free-solid-svg-icons'
import ProportionView from './ProportionView'
import MicStream from 'react-native-microphone-dsp'

interface Props {}
export default class App extends Component<Props> {
  state = {
    modalVisible: false,
    listening: false,
    canListen: false,
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible })
  }

  startListening = async () => {
    if (Platform.OS === 'android') {
      let result = await requestMicPermission()
      if (!result) {
        return
      }
    }

    await MicStream.init({
      bufferSize: 1024,
      sampleRate: 11025,
      bitsPerChannel: 8,
      channelsPerFrame: 1,
    })

    this.setState({ canListen: true })
    await this.setModalVisible(true)
  }

  render() {
    return (
      <View style={styles.container}>
        <FontAwesomeIcon
          style={styles.ear}
          size={128}
          icon={faAssistiveListeningSystems}
        />
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
              <FontAwesomeIcon
                style={styles.ear}
                size={128}
                icon={faAssistiveListeningSystems}
              />
              {this.state.canListen === true && <ProportionView />}
              <Button
                title="Stop listening"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
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
  ear: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
