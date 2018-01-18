import { AsyncStorage } from 'react-native'
import Utilities from '../Utilities'

const UUID = require('react-native-uuid')

const deviceKey = 'DeviceKey'

export default class DeviceModel {

    /**
     * Get the info for the current device. Or call saveDeviceInfo()
     * if there is no info saved to this device.
     */
    static async getDeviceInfo() {
        const deviceInfo = await AsyncStorage.getItem(deviceKey)
        if (deviceInfo) {
            return JSON.parse(deviceInfo)
        }
        // No info found, lets save the current info and return it
        await DeviceModel.saveDeviceInfo()
        const deviceString = await AsyncStorage.getItem(deviceKey)
        return JSON.parse(deviceString)
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
            return AsyncStorage.setItem(deviceKey, deviceString)
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