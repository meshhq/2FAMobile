import React from 'react'
import {
    Text, 
    View, 
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import Utilities from '../Utilities'
import CodeModel from '../Models/Code'

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
     * Will handle the QR Code payload after a scan occurs 
     */
    handleQRCodeResult = (result) => {
        if (this.state.alertShowing === false) {
            const codeData = this.createCodeData(result)
            CodeModel.addCode(codeData).then(() => {
                Alert.alert('Scan Success!', 'View your code on the home screen', [{text: 'Dismiss'}], { onDismiss: this.alertWasDismissed() })
                this.setState({ alertShowing: true })
            })
        }
    }

    /**
     * Will format the QR scan data and add the current date.
     */
    createCodeData = (result) => {
        const date = Utilities.getCurrentFormattedDate()
        return { 
            date: date,
            data: result.data,
            target: result.target,
            type: result.type
        }
    }

    /**
     * Set the state to indicate that we're ready for another scan.
     */
    alertWasDismissed = () => {
        // Note: I cannot get this to fire `after` the alert is dismissed... it always fires when the alert shows
        console.log('DISMISSED')
        this.setState({ alertShowing: false })
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
                        <View style={ styles.frame } />
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
