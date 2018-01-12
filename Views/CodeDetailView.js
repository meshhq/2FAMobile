import React from 'react'
import { 
    View, 
    StyleSheet, 
    Dimensions, 
    Text 
} from 'react-native'
import CountdownCircle from 'react-native-countdown-circle'

export default class CodeDetailView extends React.Component {

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.bufferContainer }/>
                <View style={ styles.providerContainer }>
                    <Text style={ styles.providerLabel }>Provider: { this.props.code.target }</Text>
                </View>
                <View style={ styles.rowContainer }>
                    <Text style={ styles.codeTitleLabel }>Code:</Text>
                    <Text style={ styles.codeLabel }>{ this.props.code.data }</Text>
                </View>
                <View style={ styles.rowContainer }>
                    <Text style={ styles.dateLabel }>Date: { this.props.code.date }</Text>
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
                            onTimeElapsed={() => console.log('Elapsed!')}
                        />
                    </View>
                    <View style={ styles.secondsRowContainer } >
                        <Text style={ styles.counterLabel }>SECONDS</Text>
                    </View>
                </View>
                <View style={ styles.bottomBufferContainer } />
            </View>
        )
    }

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
    codeTitleLabel: {
        flex: 1,
        color: '#000000',
        fontSize: 16
    },
    codeLabel: {
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