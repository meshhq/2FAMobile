import React from 'react'
import { 
    View,
    Image,
    StyleSheet, 
		Dimensions,
		TouchableOpacity,
		Text,
		Clipboard
} from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Utilities from '../Utilities'
import PropTypes from 'prop-types'
import NetworkService from '../services/NetworkService'
import Key from '../models/Key'

export default class KeyDetailCell extends React.Component {

	state = {
    currentToken: 'No Token Found',
		timeLeft: 30,
		update: false,
		timeoutId: ''
	}

	/**
	 * Will refresh token in componentWillMount
	 */
	async componentWillMount() {
    this.counter()
	}

	/**
	 * Need to remove the Timeout function so it
	 * won't fire after the component is unmounted.
	 */
	componentWillUnmount() {
		clearTimeout(this.state.timeoutId)
	}
	
	/**
	 * This will start the counter and save the setTimeout
	 * Id so we can clear it when the component unmounts
	 */
  counter = () => {
		const timeoutId = setTimeout(this.updateTime, 1000)
		this.setState({
			timeoutId: timeoutId
		})
  }

	/**
	 * Will update the time on the counter.
	 */
  updateTime = () => {
		const time = this.state.timeLeft - 1
		if (time < 0) {
			this.updateCode()
		}
    this.setState({
      timeLeft: (time < 0) ? 30 : time
    })
    this.counter()
  }

	/**
	 * This function will fire once the 30 second timer is up. It will
	 * fetch a new key from the server and restart the timer.
	 */
	updateCode = async () => {
		const currentKey = this.props.keyData
		const newCode = Utilities.generateTokenFromSecret(currentKey.key)
		this.props.keyData.code = newCode
		return Key.addOrUpdateKey(currentKey).then(() => {
			const refresh = this.state.numberOfRefresh + 1
			this.setState({ numberOfRefresh: refresh })
			this.props.updateCode(newCode)
		})
	}

	render() {
		if (!this.props.keyData) {
			return (
				<View />
			)
		} else {
			return (
				<View style={ styles.container }>
					<View style={ styles.providerContainer }>
						<View style={ styles.providerImage }>
              <Image style={ styles.image } source={ require('../resources/test-image.png') }/>
            </View>
					</View>
					<View style={ styles.tokenContainer }>
						<Text style={ styles.tokenTitle }>YOUR TOKEN IS:</Text>
						<View style={ styles.tokenValueContainer }>
							<Text style={ styles.tokenValue }>{ this.props.keyData.code }</Text>
						</View>
					</View>
					<View style={ styles.timerContainer }>
						<View style={ styles.expiresContainer }>
							<Text style={ styles.expireLabel }>EXPIRES IN</Text>
							<View style={ styles.counterContainer }>
								<Text style={ styles.counterText }> { this.state.timeLeft } </Text>
							</View>
							<Text style={ styles.expireLabel }>SECONDS</Text>
						</View>
					</View>
					<View style={ styles.bottomContainer }>
						<View style={ styles.tokenIdContainer }>
							<Text style={ styles.expireLabel }>TOKEN ID: { this.props.keyData.ID }</Text>
						</View>
						<View>
							<TouchableOpacity onPress={ this.copyToClipboard }>
								<View style={ styles.copyButton }>
									<Image style={ styles.copyImage } source={ require('../resources/copy_icon.png') }/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)
		}
	}

	copyToClipboard = () => {
		Clipboard.setString(this.props.keyData.code)
	}

}

KeyDetailCell.propTypes = {
  keyData: PropTypes.object
}

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
		paddingBottom: 40
	},
	providerContainer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('window').width
	},
	providerImage: {
		width: '75%',
		height: '75%'
  },
  image: {
    width: '100%',
		height: '100%',
    resizeMode: 'contain'
  },
	tokenContainer: {
		flex: 1,
		width: Dimensions.get('window').width
	},
	tokenTitle: {
		width: '100%',
		fontSize: 14,
		marginTop: 8,
		marginLeft: 32,
		color: '#727272'
	},
	tokenValueContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tokenValue: {
		flex: 1,
		fontSize: 64,
		alignItems: 'center',
		justifyContent: 'center',
		color: '#232323'
	},
	timerContainer: {
		flex: 1,
		width: Dimensions.get('window').width,
		alignItems: 'center',
		justifyContent: 'center'
	},
	expiresContainer: {
		flexDirection: 'row',
	},
	expireLabel: {
		color: '#727272',
		alignItems: 'center',
		justifyContent: 'center',
		height: 30,
		marginLeft: 8,
		marginRight: 8,
	},
	counterContainer: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		marginTop: -8,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#727272'
  },
  counterText: {
    fontSize: 16,
    color: '#d61919'
  },
	bottomContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('window').width
	},
	tokenIdContainer: {
		flex: 1,
		marginLeft: 16,
		marginTop: 32
	},
	copyButton: {
		height: 60,
		width: 60,
		borderRadius: 30,
		margin: 16,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#35a9fc'
	},
	copyImage: {
		width: 20,
		height: 20,
		resizeMode: 'contain'
	}
})
