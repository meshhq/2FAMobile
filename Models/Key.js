import { AsyncStorage } from 'react-native'

const keysKey = 'KeysKey'

export default class KeyModel {

    /**
     * 
     */
    static async addKey(keyData) {
        await KeyModel.getAllKeys().then((result) => {
            let resultArray
            if (!result) {
                resultArray = []
            } else {
                resultArray = JSON.parse(result)
            }
            resultArray.push(keyData)
            try {
                const dataString = JSON.stringify(resultArray)
                return AsyncStorage.setItem(keyData.id, dataString)
            } catch (error) {
                console.log('Set Key Error', JSON.stringify(error.message))
            }
        })
    }

    /**
     * Will update an existing key with new data.
     * @param {object} KeyData 
     */
    static async updateExistingKey(keyData) {
        return AsyncStorage.setItem(keyData.id, keyData)
    }

    /**
     * Get all the keys currently stored
     */
    static async getAllKeys() {
        return AsyncStorage.getItem(keysKey).then((result) => {
            return result
        })
    }

    /**
     * Will remove the key data for the given keyId from the
     * AsyncStorage.
     * @param {string} keyId 
     */
    static async deleteKey(keyId) {
        return AsyncStorage.removeItem(keyId)
    }

    /**
     * Used in DEV mode only to wipe the ENTIRE store clean.
     */
    static async wipeLocalStore() {
        try {
            await AsyncStorage.clear()            
        } catch (error) {
            console.log('Error Wiping Local Store: ', error)
        }
    }

}