import React from 'react'

import {
    TouchableOpacity,
    StyleSheet, 
    Image,
    View,
    Text
} from 'react-native'
import CodeDetailView from './CodeDetailView'

export default class CodeListViewCell extends React.PureComponent {

    render() {
        return <TouchableOpacity onPress={ this.cellPressed } style={ styles.container }>
            <View>
                <Text style={ styles.subtitleLabel }>Provider: {this.props.code.target}</Text>
                <Text style={ styles.titleLabel }>{this.props.code.data}</Text>
                <Text style={ styles.subtitleLabel }>Date: {this.props.code.date}</Text>
            </View>
            <View>
                <Image
                    style={ styles.imageStyle }
                    source={require('../Resources/disclosure-indicator.png')}
                />
            </View>
        </TouchableOpacity>
    }

    cellPressed = () => {
        this.props.navigator.push({
            component: CodeDetailView,
            passProps: { code: this.props.code }
        })
    }

}

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#fcfcfc',
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    imageStyle: {
        borderRadius: 25,
        marginTop: 32,
        marginRight: 8,
        width: 30,
        height: 30
    },
    titleLabel: {
        color: '#63acff',
        fontSize: 24,
        paddingTop: 8,
        paddingLeft: 8
    },
    subtitleLabel: {
        color: '#000000',
        fontSize: 12,
        paddingTop: 12,
        paddingLeft: 8
    }
})