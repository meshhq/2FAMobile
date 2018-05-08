import Key from '../models/Key'
import Utilities from '../Utilities'
import axios from 'axios'

const baseURL = 'http://localhost:1323'

export default class NetworkService {

	/**
	 * A `GET` method to fetch all the keys for a given userId.
	 * @param {string} userId 
	 */
	static async getKeys(userId) {
		const url = `${baseURL}/keys?user_id=${userId}`
		return axios.get(url)
			.then((response) => {
				return response.data
			})
	}

	/**
	 * A `POST` method to create a new key with the given body 
	 * for the current device.
	 * @param {object} device
	 * @param {object} QRData
	 */
	static async createKey(device, QRData) {
		// const keyData = this.createKeyData(device, QRData)
		// return Key.addKey(keyData)
		return axios.post(baseURL + '/keys', {
			user_id: device.uuid,
			key: QRData.secret,
			provider: QRData.issuer
		})
		.then((response) => {
			return response.data
		})
	}
	
	/**
	 * A `PUT` method to update a key with the given data in the 
	 * Request body.
	 * @param {object} updateData
	 * @param {object} keyData
	 */
	static async updateKey(updateData, keyData) {
		// return Key.updateKey(updateData)
		const url = `${baseURL}/keys/${keyData.ID}`
		return axios.put(url, {
			key: keyData.id,
			data: updateData
		})
		.then((response) => {
			return response.data
		})
	}

	/**
	 * A `DELETE` method that will remove a key for the given Id.
	 * @param {string} keyId 
	 */
	static async deleteKey(keyId) {
		// return Key.deleteKey(keyId)
		const url = `${baseURL}/keys/${keyId}`
		return axios.delete(url)
		.then((response) => {
			return response.data
		})
	}

	// /**
	//  * Parse the QR Code URI for the secret and issuer. Then
	//  * we'll build the object that will be sent to the server.
	//  * @param {string} dataURI
	//  */
	// static createKeyData = (userId, dataURI) => {
	// 	const date = Utilities.getCurrentFormattedDate()
	// 	const issuer = Utilities.getParameterByName('issuer', dataURI.data)
	// 	const secret = Utilities.getParameterByName('secret', dataURI.data)
	// 	const code = Utilities.generateTokenFromSecret(secret)
	// 	const randomId = Math.random().toString()
	// 	return {
	// 		ID: randomId,
	// 		userId: userId,
	// 		date: date,
	// 		issuer: issuer,
	// 		secret: secret,
	// 		code: code,
	// 		key: '123456789987654321'
	// 	}
	// }

}
