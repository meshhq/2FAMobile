import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CodeListView from './CodeListView'

export default class App extends React.Component {
  render() {
    return (
      <CodeListView style={ styles.container }/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
