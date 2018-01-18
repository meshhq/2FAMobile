import React from 'react'
import {
    Text, 
    View, 
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import NetworkController from '../NetworkController'
import DeviceModel from '../Models/Device'
import KeyModel from '../Models/Key'
import Utilities from '../Utilities'

export default class QRScanner extends React.Component {

    /**
     * Set default state with the camera permission status and whether or not an alert is showing.
     */
    state = {
        hasCameraPermission: null,
        alertShowing: false
    }

    /**
     * Check that camera permission status in componentWillMount()
     */
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    /**
     * Will handle the QR Key payload after a scan occurs 
     */
    handleQRCodeResult = (result) => {
        if (this.state.alertShowing === false) {
            DeviceModel.getDeviceInfo()
                .then((deviceInfo) => {
                    const deviceObject = JSON.parse(deviceInfo)
                    const keyData = this.createKeyData(result.data)
                    return KeyModel.addOrUpdateKey(keyData)
                })
                .then(() => {
                    this.showAlert('Scan Success!', 'View your key on the home screen')
                })    
        }
    }

    /**
     * Will handle the Response sent back from the server
     * and save it to the local store.
     */
    handleKeysResponse = (response) => {
        // TODO: Need to confirm this response has everything we need
        return KeyModel.addOrUpdateKey(response)
    }

    /**
     * Will show an alert message over the camera view.
     */
    showAlert = (title, message) => {
        Alert.alert(title, message, [{text: 'Dismiss'}], { onDismiss: this.alertWasDismissed() })
        this.setState({ alertShowing: true })
    }

    /**
     * Set the state to indicate that we're ready for another scan.
     */
    alertWasDismissed = () => {
        // Note: I cannot get this to fire `after` the alert is dismissed... it always fires when the alert shows
        console.log('DISMISSED')
        this.setState({ alertShowing: false })
    }

    /**
     * Parse the QR Code URI for the secret and issuer. Then
     * we'll build the object that will be sent to the server.
     * @param {string} dataURI
     */
    createKeyData = (dataURI) => {
        const date = Utilities.getCurrentFormattedDate()
        const issuer = Utilities.getParameterByName('issuer', dataURI)
        const secret = Utilities.getParameterByName('secret', dataURI)
        return {
            id: '1',
            date: date,
            issuer: issuer,
            secret: secret
        }
    }

    render = () => {
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
            return (
                <View style={ styles.container }>
                    <BarCodeScanner style={ styles.scanner } onBarCodeRead={ this.handleQRCodeResult }>
                        <View style={ styles.horizontalOverlay } />
                        <View style={ styles.frameContainer }>
                            <View style={ styles.verticalOverlay } />
                            <View style={ styles.frame } />
                            <View style={ styles.verticalOverlay } />
                        </View>
                        <View style={ styles.horizontalOverlay } />
                    </BarCodeScanner>
                </View>
            )
        }
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
        height: Dimensions.get('window').height * 0.5,
    },
    horizontalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.75)',
        width: Dimensions.get('window').width * 1.0,
        height: Dimensions.get('window').height * 0.25,
    },
    verticalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.75)',
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').height * 0.5,
    },
    frame: {
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 1,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.5,
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
