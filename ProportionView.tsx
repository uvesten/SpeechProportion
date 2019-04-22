import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

interface Props {}
export default class ProportionView extends Component<Props> {
  //async componentDidMount() {
  //  console.log(this.props.listener)
  //}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>RMS is </Text>
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
