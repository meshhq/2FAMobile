import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Camera, Permissions } from 'expo'

export default class QRScanner extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    switchCamera() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
        });
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
            return (
                <View style={ styles.container }>
                    <Camera style={{ flex: 1 }} type={this.state.type}>
                        <View style={ styles.bottomBar }>
                            <TouchableOpacity style={ styles.switchCameraButton } onPress={ this.switchCamera }>
                                <Text style={ styles.switchCameraText }>
                                    Filp
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noAccessText: {
        fontSize: 20,
        textAlign: 'center'
    },
    bottomBar: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    switchCameraButton: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    switchCameraText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    }
})