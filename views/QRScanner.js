import React from 'react'
import Key from '../models/Key'
import Device from '../models/Device'
import Utilities from '../Utilities'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from '../actions/index'
import {
  Text, 
  View, 
  StyleSheet,
	Dimensions,
	Platform,
  Alert
} from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'

class QRScanner extends React.Component {

  /**
	 * Set default state with the camera permission status and whether
   * or not an alert is showing.
	 */
	state = {
		hasCameraPermission: null,
		alertShowing: false,
		addedCode: null
  }
  
  /**
	 * Check that camera permission status in componentWillMount()
	 */
	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ 
			hasCameraPermission: status === 'granted'
		})
	}

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return ( 
        <Text style = { styles.noAccessText }>
          No Access to Camera
        </Text>
      )
    } else {
			const bottomOverlay = getBottomOverlayStyle()
      return (
        <View style={ styles.container }>
          <BarCodeScanner style={ styles.scanner } onBarCodeRead={ this.handleQRCodeResult }>
            <View style={ styles.horizontalOverlay } />
            <View style={ styles.frameContainer }>
              <View style={ styles.verticalOverlay } />
              <View style={ styles.frame } />
              <View style={ styles.verticalOverlay } />
            </View>
            <View style={ bottomOverlay.horizontalOverlay } />
          </BarCodeScanner>
        </View>
      )
    }
	}
	
	/**
	 * Will handle the QR Key payload after a scan occurs 
	 */
	handleQRCodeResult = (result) => {
		if (this.state.alertShowing === false) {
			return Device.getDeviceInfo()
				.then((deviceInfo) => {
					return this.props.keyActions.postNewKey(deviceInfo.uuid, result)
				})
				.then(() => {
					this.showAlert('Scan Success!', 'View your key on the home screen')
				})    
		}
	}

	/**
	 * Will show an alert message over the camera view.
	 */
	showAlert = (title, message) => {
		Alert.alert(title, message, [{text: 'Dismiss', onPress: this.alertWasDismissed}])
		this.setState({ alertShowing: true })
	}

	/**
	 * Set the state to indicate that we're ready for another scan.
	 */
	alertWasDismissed = () => {
		this.setState({ alertShowing: false })
	}

}

function mapDispatchToProps(dispatch) {
	return {
		keyActions: bindActionCreators(Actions.KeyActions, dispatch)
	}
}

export const QRScannerComponent = connect(null, mapDispatchToProps)(QRScanner)

const getBottomOverlayStyle = () => {
	if (Platform.OS === 'android') {
		return StyleSheet.create({
			horizontalOverlay: {
				flex: 1,
				marginTop: 16,
				backgroundColor: 'rgba(52, 52, 52, 0.75)',
				width: Dimensions.get('window').width * 1.0,
				height: Dimensions.get('window').height * 0.25
			}
		})
	} else {
		return StyleSheet.create({
			horizontalOverlay: {
				flex: 1,
				backgroundColor: 'rgba(52, 52, 52, 0.75)',
				width: Dimensions.get('window').width * 1.0,
				height: Dimensions.get('window').height * 0.25
			}
		})
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scanner: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	frameContainer: {
		flex: 2,
		flexDirection: 'row',
		width: Dimensions.get('window').width * 1.0,
		height: Dimensions.get('window').height * 0.5 - 32
	},
	horizontalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(52, 52, 52, 0.75)',
		width: Dimensions.get('window').width * 1.0,
		height: Dimensions.get('window').height * 0.25
	},
	verticalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(52, 52, 52, 0.75)',
		width: Dimensions.get('window').width * 0.1,
		height: Dimensions.get('window').height * 0.5 - 32
	},
	frame: {
		backgroundColor: 'rgba(52, 52, 52, 0.0)',
		borderWidth: 0.5,
		borderColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 1,
		width: Dimensions.get('window').width * 0.8,
		height: Dimensions.get('window').height * 0.5 - 32,
		justifyContent: 'center',
		alignItems: 'center'
	},
	barCodeStyle: {
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},
	noAccessText: {
		fontSize: 20,
		textAlign: 'center'
	}
})
