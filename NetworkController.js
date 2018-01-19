const baseURL = 'http://localhost:1323'

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
        .catch((error) => {
            console.log('Get Keys Error: ', error)
        })
    }

    /**
     * A `POST` method to create a new User object.
     * @param {object}
     */
    static createUser = (userData) => {
        return await fetch(baseURL + '', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userData.id,
                deviceId: userData.deviceId
            })
        })
        .catch((error) => {
            console.log('Create User Error: ', error)
        })
    }

    /**
     * A `POST` method to create a new key with the given body 
     * for the current device.
     * @param {object} device
     */
    static async createKey(device) {
        return await fetch(baseURL + '/keys', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId: device.uuid,
                key: '',
                provider: ''
            })
        })
        .catch((error) => {
            console.log('Create Key Error: ', error)
        })
    }

    /**
     * A `PUT` method to update a key with the given data in the 
     * Request body.
     * @param {string} keyId 
     */
    static async updateKey(keyId) {
        const url = `${baseURL}/keys/${keyId}`
        return fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId: uuid,
                key: '',
                provider: ''
            })
        })
        .then((response) => {
            return response
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
            return response
        })
    }

}