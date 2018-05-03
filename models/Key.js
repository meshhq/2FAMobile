import { AsyncStorage } from 'react-native'
import Utilities from '../Utilities'

const allKeyData = 'allKeyData'

import { getKeysResponse } from '../tests/MockResponses'

export default class Key {

	/**
	 * Will create a new key.
	 * @param {object} keyData 
	 */
	static async addKey(keyData) {
		let allData = await Key.getAllKeyData()
		if (!allData) {
			allData = [keyData]
		} else {
			allData.push(keyData)	
		}
		await AsyncStorage.setItem(allKeyData, JSON.stringify(allData))
	}

	/**
	 * Will update an existing key in the
	 * local store
	 * @param {object} keyData 
	 */
	static async updateKey(keyData) {
		const allData = await AsyncStorage.getItem(allKeyData)
		const parsedData = JSON.parse(allData)
		for (let index = 0; index < parsedData.length; index++) {
			const element = parsedData[index]
			if (element.ID === keyData.ID) {
				parsedData[index] = keyData
				break
			}
		}
		return AsyncStorage.setItem(allKeyData, JSON.stringify(parsedData))
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
			return null
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
		return AsyncStorage.setItem(allKeyData, JSON.stringify(parsedData))
	}

	/**
	 * Update all the codes on launch
	 */
	static async updateAllCodes() {
		const allData = await AsyncStorage.getItem(allKeyData)
		const parsedData = JSON.parse(allData)
		for (const key of parsedData) {
			key.code = Utilities.generateTokenFromSecret(key.key)
		}
		return AsyncStorage.setItem(allKeyData, JSON.stringify(parsedData))
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
