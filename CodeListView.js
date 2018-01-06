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
import CodeModel from './Models/Code'

const titleConfig = {
    title: 'My Codes'
}

const rightBarButtonConfig = {
    title: 'Camera',
    handler: () => alert('Push Camera VC')
}

export default class CodeListView extends React.Component {

    state = {
        refreshing: false, 
        data: []
    }

    async componentWillMount() {
        return this.refreshData()
    } 

    refreshData = async () => {
        await CodeModel.getAllCodes().then((result) => {
            const restoredArray = JSON.parse(result)
            this.setState({ data: restoredArray })
        })
    }

    async tryAddCode() {
        try {
            await CodeModel.addCode()
        } catch (error) {
            console.log('Set Item Error', JSON.stringify(error.message))
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <NavigationBar 
                    title={ titleConfig }
                    rightButton={ rightBarButtonConfig }
                />
                <Button 
                 onPress={ this.tryAddCode }
                 title='Add Dummy Code'
                />
                <FlatList
                    data={ this.state.data }
                    renderItem={({item}) => <CodeListViewCell title={item.key} />}
                    keyExtractor={(item, index) => index}
                    refreshing= { this.state.refreshing }
                    onRefresh={ this.refreshData }
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        )
    }

    renderSeparator() {
        return (
            <View style={ styles.separator }/>
        )
    }

    renderItemHandler = ({ item }) => (
        <ListItem
            roundAvatar
            title={item}
            subtitle={'test'}
        />
    )
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
