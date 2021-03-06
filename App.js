import React from 'react'
import { 
  StyleSheet, 
  NavigatorIOS, 
  Text, 
  View 
} from 'react-native'
import KeyListView from './Views/KeyListView'

export default class App extends React.Component {

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Key List View',
          component: KeyListView,
          navigationBarHidden: true
        }}/>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
