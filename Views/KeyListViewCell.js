import React from 'react'

import {
    TouchableOpacity,
    StyleSheet, 
    Image,
    View,
    Text
} from 'react-native'
import NetworkController from '../NetworkController'
import KeyDetailView from './KeyDetailView'
import Swipeout from 'react-native-swipeout'
import KeyModel from '../Models/Key';

export default class KeyListViewCell extends React.PureComponent {

    render() {
        const swipeOutButtons = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 0.6)',
                onPress: () => { this.deleteRow() }
            }
        ]
        return (
            <Swipeout right={swipeOutButtons}>
                <TouchableOpacity onPress={ this.cellPressed } style={ styles.container }>
                    <View>
                        <Text style={ styles.subtitleLabel }>Provider: {this.props.keyData.target}</Text>
                        <Text style={ styles.titleLabel }>{this.props.keyData.data}</Text>
                        <Text style={ styles.subtitleLabel }>Date: {this.props.keyData.date}</Text>
                    </View>
                    <View>
                        <Image
                            style={ styles.imageStyle }
                            source={require('../Resources/disclosure-indicator.png')}
                        />
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }

    /**
     * Will push the KeyDetailView on screen with the Key data
     * from the cell pressed.
     */
    cellPressed = () => {
        this.props.navigator.push({
            component: KeyDetailView,
            passProps: { key: this.props.key }
        })
    }

    /**
     * Action taken when the swipe to delete button is pressed.
     */
    deleteRow = () => {
        return NetworkController.deleteKey(this.props.key.data)
            .then((response) => {
                return KeyModel.deleteKey(response.id)
            })
            .then(() => {
                // This is passed through from the KeyListView
                this.props.deleteHandler(this.props.key.id)
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