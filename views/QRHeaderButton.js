import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class QRHeaderButton extends React.Component {

  render() {
    return (
      <View style={ styles.container }>
        <TouchableOpacity onPress={ this.pressed }>
          <Text style={ styles.text }>QR Scanner</Text>
        </TouchableOpacity>
      </View>
    )
  }

  pressed = () => {
    this.props.navigation.navigate('QRScanner')
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
		alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: '#0076FF'
  }
})
