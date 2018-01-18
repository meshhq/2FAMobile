import React from 'react'
import { 
    FlatList, 
    StyleSheet, 
    ListItem, 
    View, 
    Text, 
    AsyncStorage,
    Button,
    Alert,
    ActivityIndicator
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import KeyListViewCell from './KeyListViewCell'
import QRScanner from './QRScanner'
import KeyModel from '../Models/Key'
import DeviceModel from '../Models/Device'
import NetworkController from '../NetworkController'

export default class KeyListView extends React.Component {

    /**
     * 'refreshing' is required as a prop for the built in "Pull to Refresh" on the
     * FlatList. 'data' will be used to populate the FlatList cells.
     */
    state = {
        isLoading: true,
        refreshing: false, 
        data: []
    }

    // Configuration for the Nav bar title
    titleConfig = {
        title: 'My Keys'
    }
    
    // Configuration for the rightBarButtonItem
    rightBarButtonConfig = {
        title: 'Camera',
        handler: () => {
            this.props.navigator.push({
                component: QRScanner
            })
        }
    }

    /**
     * Will refresh the FlatList data when the Component mounts.
     */
    async componentWillMount() {
        try {
            await DeviceModel.getDeviceInfo()
            await this.refreshData()
        } catch (err) {
            console.log('Key List View Will Mount Error: ', error)
        }
    } 

    /**
     * Will retrieve all the Keys from the local store and refresh the table.
     */
    refreshData = async () => {
        try {
            const allKeyData = await KeyModel.getAllKeyData()
            const restoredArray = JSON.parse(allKeyData)
            return this.setState({
                isLoading: false,
                data: restoredArray
            })
        } catch (err) {
            console.log('Error: ', err)
        }
    }

    /**
     * Create the view used as a separator.
     */
    renderSeparator() {
        return (
            <View style={ styles.separator }/>
        )
    }

    /**
     * Will handle the local and remote delete calls then execute 
     * a table reload when a 'swipe to delete' is executed.
     */
    deleteHandler = (keyId) => {
        return this.refreshData()
    }

    render() {
        if (this.state.isLoading === true) {
            return (
                <View style={ styles.container }>
                    <NavigationBar 
                        title={ this.titleConfig }
                        rightButton={ this.rightBarButtonConfig }
                    />
                    <View style={ styles.spinnerContainer }>
                        <ActivityIndicator size='large' color='#63acff' />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={ styles.container }>
                    <NavigationBar 
                        title={ this.titleConfig }
                        rightButton={ this.rightBarButtonConfig }
                    />
                    <FlatList
                        data={ this.state.data }
                        renderItem={({item}) => <KeyListViewCell 
                                                    key={item} 
                                                    navigator={this.props.navigator} 
                                                    deleteHandler={this.deleteHandler}
                                                />}
                        keyExtractor={(item, index) => index}
                        refreshing= { this.state.refreshing }
                        onRefresh={ this.refreshData }
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    flatList: {
        margin: 8
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE"
    }
})
