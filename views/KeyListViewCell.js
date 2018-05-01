import React from 'react'
import Key from '../models/Key'
import Swipeout from 'react-native-swipeout'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default class KeyListViewCell extends React.Component {

  /**
	 * Will push the KeyListViewCell on screen with the Key data
	 * from the cell pressed.
	 */
	cellPressed = () => {
		this.props.navigation.navigate('Detail', { keyData: this.props.keyData })
	}

	/**
	 * Action taken when the swipe to delete button is pressed.
	 */
	deleteRow = () => {
		return NetworkService.deleteKey(this.props.keyData.id)
			.then((response) => {
				return KeyModel.deleteKey(this.props.keyData.id)
			})
			.then(() => {
				// This is passed through from the KeyListView
				this.props.deleteHandler()
			})
	}

	render() {
		const swipeOutButtons = [
			{
				text: 'Delete',
				backgroundColor: 'red',
				underlayColor: 'rgba(0, 0, 0, 0.6)',
				onPress: () => { this.deleteRow() }
			}
		]
		return (
			<Swipeout right={swipeOutButtons}>
				<TouchableOpacity onPress={ this.cellPressed } style={ styles.container }>
					<View>
						<Text style={ styles.titleLabel }>{ this.props.keyData.provider }</Text>
						<Text style={ styles.subtitleLabel }>{ this.props.keyData.code }</Text>
					</View>
					<View>
						<Image
							style={ styles.imageStyle }
							source={require('../resources/disclosure-indicator.png')}
						/>
					</View>
				</TouchableOpacity>
			</Swipeout>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		height: 100,
		backgroundColor: '#fcfcfc',
		justifyContent: 'space-between',
		flexDirection:'row'
	},
	imageStyle: {
		borderRadius: 25,
		marginTop: 32,
		marginRight: 8,
		width: 30,
		height: 30
	},
	titleLabel: {
		color: '#63acff',
		fontSize: 20,
		paddingTop: 8,
		paddingLeft: 8
	},
	subtitleLabel: {
		color: '#000000',
		fontSize: 36,
		paddingLeft: 8
	}
})