/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Modal, Alert, TouchableHighlight } from "react-native";
import { requestMicPermission } from "./MicPermission";

import MicStream from "react-native-microphone-stream";



interface Props {}
export default class App extends Component<Props> {
  state = {
    modalVisible: false,
    listening: false,
  };

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible })
  }


  startListening = async () => {
  if (Platform.OS === "android") {
    const result = await requestMicPermission()
    if (result !== true) {
      Alert.alert("Need microphone permissions ta start")
      }

    }

  const listener = MicStream.addListener(data => {
    console.log(typeof data);

    console.log(data);
  });
  MicStream.init({
    bufferSize: 4096,
    sampleRate: 44100,
    bitsPerChannel: 16,
    channelsPerFrame: 1
  })
  MicStream.start()

    this.setModalVisible(true)
};

static async stopListening() {
  MicStream.stop()
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to SpeechProportion!</Text>

        <Modal
            style={styles.container}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text style={styles.welcome}>Hello World!</Text>

              <Button title="Stop Listening"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  App.stopListening()
                }}
              />
            </View>
          </View>
        </Modal>
        <Button title="Start listening" onPress={this.startListening} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
