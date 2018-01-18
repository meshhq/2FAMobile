import React from 'react'
import { 
    View, 
    StyleSheet, 
    Dimensions, 
    Text
} from 'react-native'
import PropTypes from 'prop-types'
import CountdownCircle from 'react-native-countdown-circle'
import NetworkController from '../NetworkController'
import KeyModel from '../Models/Key';

export default class KeyDetailView extends React.Component {

    state = {
        numberOfRefresh: 0
    }

    /**
     * This function will fire once the 30 second timer is up. It will
     * fetch a new key from the server and restart the timer.
     */
    timerElapsed = () => {
        // Need to fetch and store new Key information.
        return NetworkController.updateKey(this.props.keyData)
            .then((updatedKey) => {
                return KeyModel.addOrUpdateKey(updatedKey)
            })
            .then(() => {
                const refresh = this.state.numberOfRefresh + 1
                this.setState({ numberOfRefresh: refresh })
            })
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.bufferContainer }/>
                <View style={ styles.providerContainer }>
                    <Text style={ styles.providerLabel }>Provider: { this.props.keyData.target }</Text>
                </View>
                <View style={ styles.rowContainer }>
                    <Text style={ styles.keyTitleLabel }>Key:</Text>
                    <Text style={ styles.keyLabel }>{ this.props.keyData.data }</Text>
                </View>
                <View style={ styles.rowContainer }>
                    <Text style={ styles.dateLabel }>Date: { this.props.keyData.date }</Text>
                </View>
                <View style={ styles.timerContainer }>
                    <View style={ styles.expireRowContainer } >
                        <Text style={ styles.counterLabel }>EXPIRES IN</Text>
                    </View>
                    <View style={ styles.timerRowContainer } >
                        <CountdownCircle
                            seconds={30}
                            radius={30}
                            borderWidth={8}
                            color="#63acff"
                            bgColor="#fff"
                            textStyle={{ fontSize: 20 }}
                            onTimeElapsed={ this.timerElapsed }
                        />
                    </View>
                    <View style={ styles.secondsRowContainer } >
                        <Text style={ styles.counterLabel }>SECONDS</Text>
                    </View>
                </View>
                <View style={ styles.bottomBufferContainer } />
                <View style={ styles.bottomTextContainer } >
                    <Text style={ styles.bottomLabel }>KEY ID: 12345</Text>
                </View>
            </View>
        )
    }

}

KeyDetailView.propTypes = {
    keyData: PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    providerLabel: {
        flex: 1,
        color: '#000000',
        fontSize: 36
    },
    keyTitleLabel: {
        flex: 1,
        color: '#000000',
        fontSize: 24
    },
    keyLabel: {
        flex: 1,
        color: '#63acff',
        fontSize: 28
    },
    dateLabel: {
        flex: 1,
        color: '#000000',
        fontSize: 16
    },
    counterLabel: {
        flex: 1,
        color: '#bababa',
        fontSize: 16,
        paddingTop: 8,
        alignItems: 'center',
    },
    bufferContainer: {
        width: Dimensions.get('window').width * 1.0,
        height: 64,
        backgroundColor: '#ffffff',
    },
    providerContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
    },
    rowContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
    },
    bottomBufferContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTextContainer: {
        flex: 0.25,
        width: Dimensions.get('window').width * 1.0,
        alignContent: 'flex-start',
    },
    bottomLabel: {
        flex: 1,
        color: '#bababa',
        fontSize: 16,
        paddingLeft: 8
    },
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timerRowContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    expireRowContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondsRowContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    }
})