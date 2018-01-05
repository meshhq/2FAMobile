import React from 'react'
import {
    Text, 
    View, 
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'

export default class QRScanner extends React.Component {

    state = {
        hasCameraPermission: null,
        lastScannedString: '',
        alertShowing: false
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    handleQRCodeResult = (result) => {
        if (this.state.alertShowing === false) {
            Alert.alert('Scan Success!', JSON.stringify(result))
            this.setState({ alertShowing: true })
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
                    <BarCodeScanner style={{ flex: 1 }} onBarCodeRead={ this.handleQRCodeResult } />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
