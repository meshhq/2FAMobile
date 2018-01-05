import React from 'react'
import { FlatList, StyleSheet, ListItem, View, Text } from 'react-native'

import CodeListViewCell from './CodeListViewCell'

export default class CodeListView extends React.Component {

    state = {
        data: []
    }

    componentWillMount() {
        // This will be async to hit the server or fetch data from local store
        const data = [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}]
        this.setState({ data: data })
    } 

    render() {
        return (
            <View style={ styles.container }>
                <FlatList
                    data={ this.state.data }
                    renderItem={({item}) => <CodeListViewCell title={item.key} />}
                />
            </View>
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
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    flatList: {

    }
})
