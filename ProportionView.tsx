import React, { Component } from 'react'
import MicStream from 'react-native-microphone-dsp'
import { calculateRMS } from './RMSCalculator'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { soundWriterListenerFactory } from './FileWriter'
import { bool, number, string } from 'prop-types'
import Denque from 'denque'
import { VictoryPie } from 'victory-native'

interface Props {}
export default class ProportionView extends Component<Props> {
  listener: any
  constructor(props: Readonly<Props>) {
    super(props)
    this.state = { data: [{ x: 'Speech', y: 0 }, { x: 'Silence', y: 0 }] }

    const proportionCounter = proportionCounterFactory()

    this.listener = MicStream.addListener(async data => {
      let rms = await calculateRMS(data)

      const speech = Platform.select({
        ios: 160 > rms ? true : false,
        android: 30500 > rms ? true : false,
      })

      //console.log(speech)
      const proportions = await proportionCounter(speech)
      this.setState({
        data: [
          { x: 'Speech', y: proportions.speech },
          { x: 'Silence', y: proportions.silence },
        ],
      })
    })
  }
  // cutoff ios ~ 170
  // cutoff android ~ 31000

  async componentDidMount() {
    await MicStream.start()
  }

  async componentWillUnmount() {
    MicStream.stop()
    this.listener.remove()
  }

  render() {
    return (
      <VictoryPie
        height={400}
        data={this.state.data}
        colorScale={['orange', 'cyan']}
        animate={{
          duration: 250,
        }}
      />
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

const proportionCounterFactory = () => {
  const speech = new Denque()
  const silence = new Denque()

  const proportionCounter = async (
    speaking: boolean
  ): Promise<{ speech: number; silence: number }> => {
    const now = Date.now()
    const twoSecsInPast = now - 2000

    if (speaking) {
      speech.unshift(now)
    } else {
      silence.unshift(now)
    }

    if (silence.length > 0) {
      while (silence.peekBack() < twoSecsInPast) {
        silence.pop()
      }
    }

    if (speech.length > 0) {
      while (speech.peekBack() < twoSecsInPast) {
        speech.pop()
      }
    }

    return { speech: speech.length, silence: silence.length }
  }

  return proportionCounter
}
