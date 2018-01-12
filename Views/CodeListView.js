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
import CodeListViewCell from './CodeListViewCell'
import QRScanner from './QRScanner'
import CodeModel from '../Models/Code'
import DeviceModel from '../Models/Device'

export default class CodeListView extends React.Component {

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
        title: 'My Codes'
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
        await DeviceModel.getDeviceInfo()
            .then((device) => {
                if (device) {
                    // If the device has been registered we'll call for a refresh.
                    return this.refreshData()
                } else {
                    // Otherwise we'll create a new UUID for this device.
                    return DeviceModel.saveDeviceInfo()
                    .then(() => {
                        this.setState({ isLoading: false })
                    })
                }
            }).catch((error) => {
                console.log('Error:', error)
            })
    } 

    /**
     * Will retrieve all the Codes from the local store and refresh the table.
     */
    refreshData = async () => {
        await CodeModel.getAllCodes().then((result) => {
            const restoredArray = JSON.parse(result)
            return this.setState({ 
                isLoading: false,
                data: restoredArray 
            })
        })
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
                        extraData={ this.state.activeCell }
                        renderItem={({item}) => <CodeListViewCell code={item} navigator={this.props.navigator} />}
                        keyExtractor={(item, index) => index}
                        refreshing= { this.state.refreshing }
                        onRefresh={ this.refreshData }
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            )
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
