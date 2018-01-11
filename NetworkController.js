const baseURL = ''

export default class NetworkController {

    static async getKeys(userId) {
        const url = `${baseURL}/keys?user_id=${userId}`
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            
        })
    }

    static async createKey() {
        fetch(baseURL + '', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId: uuid
            })
        })
    }

    static async updateKey() {

    }

    static async deleteKey() {

    }

}