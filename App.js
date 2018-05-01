import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import QRScanner from './views/QRScanner'
import QRHeaderButton from './views/QRHeaderButton'
import KeyListView from './views/KeyListView'
import KeyDetailView from './views/KeyDetailView'

import Key from './models/Key'

export default class App extends React.Component {
  
  async componentWillMount() {
    await Key.wipeLocalStore()
  }

  render() {
    return (
      <MainNavigator />
    )
  }

}

const MainNavigator = StackNavigator({
  Main: {
    screen: KeyListView,
    title: 'Home',
    navigationOptions:({navigation}) => ({
      headerRight:(
        <QRHeaderButton navigation={ navigation }/>
      )
    })
  },
  Detail: {
    screen: KeyDetailView,
    title: 'Key Detail',
    navigationOptions:({navigation}) => ({
    })
  },
  QRScanner: {
    screen: QRScanner,
    title: 'Scan a QR Code',
    navigationOptions:({navigation}) => {
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
