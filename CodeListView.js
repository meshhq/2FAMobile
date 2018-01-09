import React from 'react'
import { 
    FlatList, 
    StyleSheet, 
    ListItem, 
    View, 
    Text, 
    AsyncStorage,
    Button
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import CodeListViewCell from './CodeListViewCell'
import QRScanner from './QRScanner'
import CodeModel from './Models/Code'

export default class CodeListView extends React.Component {

    /**
     * 'refreshing' is required as a prop for the built in "Pull to Refresh" on the
     * FlatList. 'data' will be used to populate the FlatList cells.
     */
    state = {
        refreshing: false, 
        data: []
    }

    titleConfig = {
        title: 'My Codes'
    }
    
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
        return this.refreshData()
    } 

    /**
     * Will retrieve all the Codes from the local store and refresh the table.
     */
    refreshData = async () => {
        await CodeModel.getAllCodes().then((result) => {
            const restoredArray = JSON.parse(result)
            this.setState({ data: restoredArray })
        })
    }

    render() {
        return (
            <View style={ styles.container }>
                <NavigationBar 
                    title={ this.titleConfig }
                    rightButton={ this.rightBarButtonConfig }
                />
                <FlatList
                    data={ this.state.data }
                    renderItem={({item}) => <CodeListViewCell code={item} />}
                    keyExtractor={(item, index) => index}
                    refreshing= { this.state.refreshing }
                    onRefresh={ this.refreshData }
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        )
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
    flatList: {
        margin: 8
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE"
    }
})
