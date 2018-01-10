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
                <View style={ styles.topContainer }>
                    <Text style={ styles.codeLabel }>{ this.props.code.data }</Text>
                </View>
                <View style={ styles.topContainer }>
                    <Text style={ styles.dateLabel }>Date: { this.props.code.date }</Text>
                </View>
                <View style={ styles.timerContainer }>
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
    codeLabel: {
        flex: 1,
        color: '#63acff',
        fontSize: 36,
        paddingTop: 72
    },
    dateLabel: {
        flex: 1,
        color: '#262626',
        fontSize: 24,
        paddingTop: 8,
        alignItems: 'center',
    },
    topContainer: {
        width: Dimensions.get('window').width * 1.0,
        height: Dimensions.get('window').height * 0.25,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingLeft: 8
    },
    timerContainer: {
        alignItems: 'center',
        width: Dimensions.get('window').width * 1.0
    }
})