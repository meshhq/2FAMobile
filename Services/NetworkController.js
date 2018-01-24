const baseURL = 'http://d2fced7e.ngrok.io'

export default class NetworkController {

    /**
     * A `GET` method to fetch all the keys for a given userId.
     * @param {string} userId 
     */
    static async getKeys(userId) {
        const url = `${baseURL}/keys?user_id=${userId}`
        return await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }  
        })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log('Get Keys Error: ', error)
        })
    }

    /**
     * A `POST` method to create a new key with the given body 
     * for the current device.
     * @param {object} device
     * @param {object} QRData
     */
    static async createKey(device, QRData) {
        return fetch(baseURL + '/keys', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: device.uuid,
                key: QRData.secret,
                provider: QRData.issuer
            })
        })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log('Create Key Error: ', error)
        })
    }

    static async crush(device, QRData) {
        return await fetch('https://jsonplaceholder.typicode.com' + '/posts/1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log('Create Key Error: ', error)
        })
    }
    /**
     * A `PUT` method to update a key with the given data in the 
     * Request body.
     * @param {object} updateData
     * @param {object} keyData
     */
    static async updateKey(updateData, keyData) {
        const url = `${baseURL}/keys/${keyData.ID}`
        return await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: updateData.key
            })
        })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log('Update Key Error: ', error)
        })
    }

    /**
     * A `DELETE` method that will remove a key for the given Id.
     * @param {string} keyId 
     */
    static async deleteKey(keyId) {
        const url = `${baseURL}/keys/${keyId}`
        return fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log('Delete Key Error: ', error)
        })
    }

}