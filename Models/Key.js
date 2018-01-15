import { AsyncStorage } from 'react-native'

const keyIds = 'keyIds'

export default class KeyModel {

    /**
     * Will create or update an existing key with new data.
     * @param {object} KeyData 
     */
    static async addOrUpdateKey(keyData) {
        return KeyModel.getAllKeyIds()
            .then((Ids) => {
                let idArray = []
                if (Ids) {
                    // Need to check if there's only one Id
                    if (Ids.includes(keyData.id) || (keyData.id === Ids)) {
                        return
                    }
                    idArray = Ids
                } else {
                    idArray = []
                }
                idArray.push(keyData.id)
                const idString = JSON.stringify(idArray)
                return AsyncStorage.setItem(keyIds, idString)
            })
            .then(() => {
                const dataString = JSON.stringify(keyData)
                return AsyncStorage.setItem(keyData.id, dataString)
            })
    }

    /**
     * Get key data for a given keyId.
     * @param {string} keyId
     */
    static async getKeyWithId(keyId) {
        return AsyncStorage.getItem(keyId)
            .then((result) => {
                return result
            })
    }

    /**
     * Get all the Ids for keys that have been created.
     */
    static async getAllKeyIds() {
        return AsyncStorage.getItem(keyIds)
            .then((result) => {
                if (!result) {
                    // Back out if we don't have any Ids.
                    return result
                }
                const resultArray = JSON.parse(result)
                return resultArray
            })
    }

    /**
     * Get all the key data for the Ids stored.
     */
    static async getAllKeyData() {
        // Fetch the array of all the key Ids.
        return KeyModel.getAllKeyIds()
            .then((result) => {
                if (!result) {
                    // Back out if we don't have any Ids.
                    return result
                }
 
                resultArray = JSON.parse(result)

                // If only one key exists this will be false and we can't call '.forEach'
                const isArray = Array.isArray(resultArray)
                if (!isArray) {
                    return [resultArray]
                }

                let allKeyPromises = []
                resultArray.forEach(keyId => {
                    // Fetch key data for each stored Id.
                    const keyPromise = KeyModel.getKeyWithId(keyId)
                    allKeyPromises.push(keyPromise)
                });

                // Return all the keyData promises.
                return Promise.all(allKeyPromises)
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