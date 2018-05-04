import Key from '../models/Key'
import Utilities from '../Utilities'

const baseURL = 'http://localhost:1323'

export default class NetworkService {

	/**
	 * A `GET` method to fetch all the keys for a given userId.
	 * @param {string} userId 
	 */
	static async getKeys(userId) {
		return Key.getAllKeyData()
		// const url = `${baseURL}/keys?user_id=${userId}`
		// return await fetch(url, {
		// 	method: 'GET',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 	}  
		// })
		// .then((response) => {
		// 	return response.json()
		// })
		// .catch((error) => {
		// 	console.log('Get Keys Error: ', error)
		// })
	}

	/**
	 * A `POST` method to create a new key with the given body 
	 * for the current device.
	 * @param {object} device
	 * @param {object} QRData
	 */
	static async createKey(device, QRData) {
		const keyData = this.createKeyData(device, QRData)
		return Key.addKey(keyData)
		// return fetch(baseURL + '/keys', {
		// 	method: 'POST',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		user_id: device.uuid,
		// 		key: QRData.secret,
		// 		provider: QRData.issuer
		// 	})
		// })
		// .then((response) => {
		// 	return response.json()
		// })
		// .catch((error) => {
		// 	console.log('Create Key Error: ', error)
		// })
	}
	
	/**
	 * A `PUT` method to update a key with the given data in the 
	 * Request body.
	 * @param {object} updateData
	 * @param {object} keyData
	 */
	static async updateKey(updateData, keyData) {
		return Key.updateKey(updateData)
		// const url = `${baseURL}/keys/${keyData.ID}`
		// return await fetch(url, {
		// 	method: 'PUT',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		key: updateData.key
		// 	})
		// })
		// .then((response) => {
		// 	return response.json()
		// })
		// .catch((error) => {
		// 	console.log('Update Key Error: ', error)
		// })
	}

	/**
	 * A `DELETE` method that will remove a key for the given Id.
	 * @param {string} keyId 
	 */
	static async deleteKey(keyId) {
		return Key.deleteKey(keyId)
		// const url = `${baseURL}/keys/${keyId}`
		// return fetch(url, {
		// 	method: 'DELETE',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 	}
		// })
		// .then((response) => {
		// 	return response.json()
		// })
		// .catch((error) => {
		// 	console.log('Delete Key Error: ', error)
		// })
	}

	/**
	 * Parse the QR Code URI for the secret and issuer. Then
	 * we'll build the object that will be sent to the server.
	 * @param {string} dataURI
	 */
	static createKeyData = (userId, dataURI) => {
		const date = Utilities.getCurrentFormattedDate()
		const issuer = Utilities.getParameterByName('issuer', dataURI.data)
		const secret = Utilities.getParameterByName('secret', dataURI.data)
		const code = Utilities.generateTokenFromSecret(secret)
		const randomId = Math.random().toString()
		return {
			ID: randomId,
			userId: userId,
			date: date,
			issuer: issuer,
			secret: secret,
			code: code,
			key: '123456789987654321'
		}
	}

}
