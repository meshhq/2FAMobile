import { AsyncStorage } from 'react-native'
import Utilities from '../Utilities'

const UUID = require('react-native-uuid')

const deviceKey = 'DeviceKey'

export default class DeviceModel {

    /**
     * Get the info for the current device.
     */
    static async getDeviceInfo() {
        return AsyncStorage.getItem(deviceKey)
            .then((result) => {
                return result
            })
    }

    /**
     * Create and save the UUID and device meta data.
     */
    static async saveDeviceInfo() {
        const device = {
            uuid: UUID.v4(),
            date: Utilities.getCurrentFormattedDate()
        }
        try {
            const deviceString = JSON.stringify(device)
            await AsyncStorage.setItem(deviceKey, deviceString)
        } catch (error) {
            console.log('Error Saving Device Info: ', error)
        }
    }

    /**
     * Remove the info saved for the current device.
     */
    static async removeDeviceInfo() {
        try {
            await AsyncStorage.removeItem(deviceKey)            
        } catch (error) {
            console.log('Error Removing Device Info: ', error)
        }
    }

}