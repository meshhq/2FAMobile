import { AsyncStorage } from 'react-native'

const keyIds = 'keyIds'

export default class KeyModel {

    /**
     * Will create or update an existing key with new data.
     * @param {object} KeyData 
     */
    static async addOrUpdateKey(keyData) {
        const IDs = await KeyModel.getAllKeyIds()
        let idArray = []
        if (IDs) {
            idArray = IDs
        } else {
            idArray = []
        }
        if (!idArray.includes(keyData.id)) {
            idArray.push(keyData.id)
        }
        const idString = JSON.stringify(idArray)
        await AsyncStorage.setItem(keyIds, idString)
        const dataString = JSON.stringify(keyData)
        return AsyncStorage.setItem(keyData.id, dataString)
    }

    /**
     * Get key data for a given keyId.
     * @param {string} keyId
     */
    static async getKeyWithId(keyId) {
        const keyString = await AsyncStorage.getItem(keyId)
        return JSON.parse(keyString)
    }

    /**
     * Get all the Ids for keys that have been created.
     */
    static async getAllKeyIds() {
        const allKeyIds = await AsyncStorage.getItem(keyIds)
        if (!allKeyIds) {
          // Back out if we don't have any Ids
          return null
        }
        return JSON.parse(allKeyIds)
    }

    /**
     * Get all the key data for the Ids stored.
     */
    static async getAllKeyData() {
        // Fetch the array of all the key Ids.
        const IDs = await KeyModel.getAllKeyIds()
        if (!IDs) {
            // Back out if we don't have any Ids.
            return null
        }

        // If only one key exists this will be false and we can't call '.forEach'
        const isArray = Array.isArray(IDs)
        if (!isArray) {
            return [IDs]
        }

        const allKeyPromises = []
        IDs.forEach(keyId => {
            // Fetch key data for each stored Id.
            const keyPromise = KeyModel.getKeyWithId(keyId)
            allKeyPromises.push(keyPromise)
        });

        // Return all the keyData promises.
        return Promise.all(allKeyPromises)
    }

    /**
     * Will remove the key data for the given keyId from the
     * AsyncStorage and will remove the Id from the Id array.
     * @param {string} keyId 
     */
    static async deleteKey(keyId) {
        return KeyModel.deleteKeyId(keyId)
            .then(() => {
                return AsyncStorage.removeItem(keyId)
            })
    }

    /**
     * Remove a single keyID from the ID array.
     * @param {string} keyId 
     */
    static async deleteKeyId(keyId) {
        const IDs = await KeyModel.getAllKeyIds()
        if (IDs == keyId) {
            return AsyncStorage.removeItem(keyIds)
        }
        let foundIndex
        for (let index = 0; index < IDs.length; index++) {
            const element = IDs[index]
            if (element.id === keyId) {
                foundIndex = index
                break
            }
        }
        if (foundIndex) {
            IDs.splice(foundIndex, 1)
        }

        const idString = JSON.stringify(IDs)
        return AsyncStorage.setItem(keyIds, idString)
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