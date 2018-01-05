import React from 'react'

import { Text } from 'react-native'

export default class CodeListViewCell extends React.PureComponent {

    render() {
        return <Text>{this.props.title}</Text>
    }

}
