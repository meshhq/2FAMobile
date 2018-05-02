import { AsyncStorage } from 'react-native'

const allKeyData = 'allKeyData'

import { getKeysResponse } from '../tests/MockResponses'

export default class Key {

	static async getDummyKeyData() {
		let dummyString = await AsyncStorage.getItem(allKeyData)
		if (!dummyString) {
			const keyData = getKeysResponse()
			await AsyncStorage.setItem(allKeyData, JSON.stringify(keyData.data))
			dummyString = await AsyncStorage.getItem(allKeyData)
		}
		return JSON.parse(dummyString)
	}

	/**
	 * Will create a new key.
	 * @param {object} KeyData 
	 */
	static async addOrUpdateKey(keyData) {
		const allData = await Key.getAllKeyData()
		allData.push(keyData)
		await AsyncStorage.setItem(allKeyData, JSON.stringify(allData))
	}

	/**
	 * Get key data for a given keyId.
	 * @param {string} keyId
	 */
	static async getKeyWithId(keyId) {
		const allData = await AsyncStorage.getItem(allKeyData)
		for (const key of JSON.parse(allData)) {
			if (key.ID === keyId) {
				return key
			}
		}
		return null
	}

	/**
	 * Get all the key data.
	 */
	static async getAllKeyData() {
		const data = await AsyncStorage.getItem(allKeyData)
		if (!data) {
			// Back out if we don't have any Ids.
			// TODO: Need to Change to NULL
			return Key.getDummyKeyData()
		}
		return JSON.parse(data)
	}

	/**
	 * Will remove the key data for the given keyId from the
	 * AsyncStorage and will remove the Id from the Id array.
	 * @param {string} keyId 
	 */
	static async deleteKey(keyId) {
		const allData = await AsyncStorage.getItem(allKeyData)
		const parsedData = JSON.parse(allData)
		for (let index = 0; index < parsedData.length; index++) {
			const element = parsedData[index]
			if (element.ID === keyId) {
				parsedData.splice(index, 1)
				break
			}
		}
		return await AsyncStorage.setItem(allKeyData, JSON.stringify(parsedData))
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
