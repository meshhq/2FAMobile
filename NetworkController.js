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
     * A `POST` method to create a new key with the given body 
     * for the current device.
     * @param {object} device
     * @param {object} QRData
     */
    static async createKey(device, QRData) {
        return await fetch(baseURL + '/keys', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId: device.uuid,
                key: QRData.secret,
                issuer: QRData.issuer
            })
        })
        .catch((error) => {
            console.log('Create Key Error: ', error)
        })
    }

    /**
     * A `PUT` method to update a key with the given data in the 
     * Request body.
     * @param {string} keyData
     * @param {string} deviceId
     */
    static async updateKey(keyData, deviceId) {
        const url = `${baseURL}/keys/${keyData.id}`
        return await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId: uuid,
                key: keyData.key,
                issuer: keyData.issuer
            })
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
        return await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .catch((error) => {
            console.log('Delete Key Error: ', error)
        })
    }

}