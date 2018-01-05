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
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        height: 44,
        backgroundColor: '#bababa',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black'
    },
    titleLabel: {
        color: '#efefef',
        fontSize: 16,
        paddingTop: 12,
        paddingLeft: 8
    }
})