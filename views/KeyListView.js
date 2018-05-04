import React from 'react'
import Device from '../models/Device'
import Key from '../models/Key'
import NoKeyViewCell from './NoKeyViewCell'
import { KeyListCellComponent } from './KeyListViewCell'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from '../actions/index'
import { 
	FlatList, 
  StyleSheet,
  TouchableOpacity,
	View, 
	Text,
	Alert
} from 'react-native'

class KeyListView extends React.Component {

  /**
	 * 'refreshing' is required as a prop for the built in "Pull to Refresh" on the
	 * FlatList. 'data' will be used to populate the FlatList cells.
	 */
	state = {
		isLoading: false,
		refreshing: false,
		timeLeft: 0,
		timeoutId: ''
  }
  
  /**
	 * Will begin the counter if there are any keys
	 * in the redux store.
	 */
	async componentWillMount() {
		if (this.props.data && this.props.data.length > 0) {
			this.counter()
		}
	}

	componentWillUnmount() {
		clearTimeout(this.state.timeoutId)
	}
	
	counter = () => {
		const timeoutId = setTimeout(this.updateTime, 1000)
		this.setState({
			timeoutId: timeoutId
		})
  }

  updateTime = async () => {
		const theDate = new Date()
    if (theDate.getSeconds() === 0) {
			await Key.updateAllCodes()
		}
		return this.counter()
	}
	
	updateCodes = async () => {
		await Key.updateAllCodes()
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
	deleteHandler = (success) => {
		return this.refreshData()
	}

  render() {
    if (this.state.isLoading === true) {
      return (
        <View style={ styles.container }>
          <View style={ styles.spinnerContainer }>
            {/* ADD SPINNER */}
          </View>
        </View>
      )
    } else {
      if (!this.props.data || this.props.data.length === 0) {
        return (
          <View style={ styles.container }>
            <FlatList
							data={ [{ key : 'one' }] }
							renderItem={ ({ item }) => <NoKeyViewCell /> }
							keyExtractor={(item, index) => item.key}
						/>
          </View>
        )
      } else {
        return (
          <View style={ styles.container }>
            <FlatList
              data={ this.props.data }
              renderItem={({item}) => <KeyListCellComponent 
                            keyData={item} 
                            navigation={this.props.navigation}
                          />}
              keyExtractor={(item, index) => item.key}
              refreshing= { this.state.refreshing }
              onRefresh={ this.refreshData }
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        )
      }
    }
  }

}

function mapStateToProps(state) {
	return {
		data: state.key.keys
	}
}

function mapDispatchToProps(dispatch) {
	return {
		keyActions: bindActionCreators(Actions.KeyActions, dispatch)
	}
}

export const KeyListComponent = connect(mapStateToProps, mapDispatchToProps)(KeyListView)

const styles = StyleSheet.create({
	container: {
		flex: 1
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