import React from 'react'
import KeyDetailCell from './KeyDetailCell'
import PropTypes from 'prop-types'
import Utilities from '../Utilities'
import {
    View, 
    StyleSheet,
		Dimensions,
		FlatList
} from 'react-native'

export default class KeyDetailView extends React.Component {

	state = {
		keyData: null,
		updateCode: null
	}

	/**
	 * Will refresh token in componentWillMount
	 */
	async componentWillMount() {
		const params = this.props.navigation.state.params
		const keyData = params.keyData
		const updateCode = params.updateCode
		const token = Utilities.generateTokenFromSecret(keyData)
		this.setState({
			keyData: keyData,
			updateCode: updateCode
		})
	}

	render() {
		if (!this.state.keyData) {
			return (
				<View />
			)
		} else {
			return (
				<View style={ styles.container }>
					<FlatList data={ [this.state.keyData] }
										style={ styles.flatList }
										renderItem={ this.cellForItem }
										keyExtractor={ (item) => item.key }/>
				</View>
			)
		}
	}

	/**
	 * Will return the appropriate cell for the given item.
	 */
	cellForItem = (item) => {
		return (
			<KeyDetailCell keyData={ item.item } updateCode={ this.state.updateCode }/>
		)
	}

}

KeyDetailView.propTypes = {
  keyData: PropTypes.object
}

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	flatList: {
		flex: 1,
		width: Dimensions.get('window').width
	}
})
