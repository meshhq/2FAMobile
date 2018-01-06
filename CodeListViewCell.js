import React from 'react'

import {
    TouchableOpacity,
    StyleSheet, 
    Image,
    View,
    Text
} from 'react-native'

export default class CodeListViewCell extends React.PureComponent {

    render() {
        return <TouchableOpacity onPress={ this.cellPressed } style={ styles.container }>
            <View>
                <Text style={ styles.titleLabel }>{this.props.title}</Text>
                <Text style={ styles.subtitleLabel }>Date: 00/00/0000</Text>
            </View>
            <View>
                <Image
                    style={ styles.imageStyle }
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
            </View>
        </TouchableOpacity>
    }

    cellPressed = () => {
        alert('Push Cell Detail VC')
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
        marginTop: 20,
        marginRight: 8,
        width: 50,
        height: 50
    },
    titleLabel: {
        color: '#63acff',
        fontSize: 40,
        paddingTop: 12,
        paddingLeft: 8
    },
    subtitleLabel: {
        color: '#000000',
        fontSize: 12,
        paddingTop: 12,
        paddingLeft: 8
    }
})