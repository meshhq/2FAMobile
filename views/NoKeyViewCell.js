import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native'

export default class NoKeyViewCell extends React.Component {

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.noAccountsContainer }>
          <Text style={ styles.noAccountsLabel }>No keys found.</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
		alignItems: 'center'
  },
  noAccountsContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noAccountsLabel: {
		flex: 1,
		color: '#63acff',
		fontSize: 28,
		justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.25
	}
})
