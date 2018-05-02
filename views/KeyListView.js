import React from 'react'
import Device from '../models/Device'
import Key from '../models/Key'
import KeyListViewCell from './KeyListViewCell'
import { 
	FlatList, 
  StyleSheet,
  TouchableOpacity,
	View, 
	Text,
	Alert
} from 'react-native'

export default class KeyListView extends React.Component {

  /**
	 * 'refreshing' is required as a prop for the built in "Pull to Refresh" on the
	 * FlatList. 'data' will be used to populate the FlatList cells.
	 */
	state = {
		isLoading: true,
		refreshing: false, 
		data: [],
		timeLeft: 0
  }
  
  /**
	 * Will refresh the FlatList data when the Component mounts.
	 */
	async componentWillMount() {
		try {
			await Device.getDeviceInfo()
			await this.refreshData()
			this.counter()
		} catch (error) {
			console.log('Key List View Will Mount Error: ', error)
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
		// console.log('Main Tick ', theDate.getSeconds())
    if (theDate.getSeconds() === 0) {
			await Key.updateAllCodes()
			await this.refreshData()
		}
		return this.counter()
	}

  /**
	 * Will retrieve all the Keys from the local store and refresh the table.
	 */
	refreshData = async () => {
		try {
			const allKeyData = await Key.getAllKeyData()
			return this.setState({
				isLoading: false,
				data: allKeyData
			})
		} catch (error) {
			console.log('Error: ', error)
		}
  }
	
	updateCodes = async () => {
		await Key.updateAllCodes()
		await this.refreshData()
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

  navigate = () => {
    this.props.navigation.navigate('QRScanner')
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
      if (!this.state.data || this.state.data.length === 0) {
        return (
          <View style={ styles.container }>
            <View style={ styles.noAccountsContainer }>
              <Text style={ styles.noAccountsLabel }>No keys found.</Text>
            </View>
          </View>
        )
      } else {
        return (
          <View style={ styles.container }>
            <FlatList
              data={ this.state.data }
              renderItem={({item}) => <KeyListViewCell 
                            keyData={item} 
                            navigation={this.props.navigation} 
														deleteHandler={this.deleteHandler}
														updateHandler={this.updateCodes}
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
	noAccountsContainer: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	noAccountsLabel: {
		flex: 1,
		color: '#63acff',
		fontSize: 28
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