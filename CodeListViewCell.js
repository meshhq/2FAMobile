import React from 'react'

import { 
    StyleSheet, 
    View,
    Text
} from 'react-native'

export default class CodeListViewCell extends React.PureComponent {

    render() {
        return <View style={ styles.container }>
            <Text style={ styles.titleLabel }>{this.props.title}</Text>
            <Text style={ styles.subtitleLabel }>Date: 00/00/0000</Text>
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#fcfcfc'
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