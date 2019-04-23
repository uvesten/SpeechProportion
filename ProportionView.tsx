import React, { Component } from 'react'
import MicStream from 'react-native-microphone-dsp'
import { calculateRMS } from './RMSCalculator'
import { View, Text, StyleSheet } from 'react-native'
import { soundWriterListenerFactory } from './FileWriter'
interface Props {}
export default class ProportionView extends Component<Props> {
  listener: any
  constructor(props: Readonly<Props>) {
    super(props)
    this.state = { rms: 0 }

    this.listener = MicStream.addListener(async data => {
      let rms = await calculateRMS(data)
      this.setState({ rms })
    })
  }

  async componentDidMount() {
    await MicStream.start()
  }

  async componentWillUnmount() {
    MicStream.stop()
    this.listener.remove()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>RMS is {this.state.rms} </Text>
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
