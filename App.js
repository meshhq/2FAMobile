import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import { loadState } from './store/LocalStorage'
import { StyleSheet, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { QRScannerComponent } from './views/QRScanner'
import QRHeaderButton from './views/QRHeaderButton'
import { KeyListComponent } from './views/KeyListView'
import KeyDetailView from './views/KeyDetailView'

import Key from './models/Key'

export default class App extends React.Component {
  
  state = {
    appStore: undefined
  }

  async componentWillMount() {
    await Key.wipeLocalStore()

    const persistedState = await loadState()
    let appStore
    if (!persistedState) {
      appStore = configureStore({})
    } else {
      appStore = configureStore(persistedState)
    }
    this.setState({
      appStore: appStore
    })
  }

  render() {
    if (this.state.appStore === undefined) {
      return (
        <View />
      )
    } else {
      return (
        <Provider store={ this.state.appStore }>
          <MainNavigator />
        </Provider>
      )
    }
  }

}

const MainNavigator = StackNavigator({
  Main: {
    screen: KeyListComponent,
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
    screen: QRScannerComponent,
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
