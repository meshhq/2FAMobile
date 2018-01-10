import React from 'react'
import { 
  StyleSheet, 
  NavigatorIOS, 
  Text, 
  View 
} from 'react-native'
import CodeListView from './Views/CodeListView'

export default class App extends React.Component {

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Code List View',
          component: CodeListView,
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
