import NetworkController from '../NetworkController'
import Utilities from '../Utilities'

const UUID = require('react-native-uuid')

describe.skip('Network Controller', () => {
    let keyData
    let keyId
    it('createKey()', () => {
        return NetworkController.createKey(dummyDeviceData, dummyQRData)
            .then((response) => {
                return response.json()
            }).then((json) => {
                expect(json.data).not.toEqual(null)
                const key = json.data
                expect(key.ID).not.toEqual(null)
                expect(key.key).not.toEqual(null)
                expect(key.user_id).not.toEqual(null)
                expect(key.provider).not.toEqual(null)
                keyId = key.ID
                keyData = key
            })
    })
    it('updateKey()', () => {
        const newKeyData = {
            key: '789123'
        }
        return NetworkController.updateKey(newKeyData, keyData.user_id)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                expect(json).not.toEqual(null)
            })
    })
    it('getKeys()', () => {
        return NetworkController.getKeys(keyData.user_id)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                expect(json).not.toEqual(null)
                expect(json.data).not.toEqual(null)
                expect(json.data.length).toBeGreaterThan(0)
            })
    })
    it('deleteKey()', () => {
        return NetworkController.deleteKey(keyId)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                expect(json).not.toEqual(null)
            })
    })
})

const dummyQRData = {
    date: Utilities.getCurrentFormattedDate(),
    issuer: 'Mesh Studio',
    secret: '123456'
}

const dummyDeviceData = {
    uuid: UUID.v4(),
    date: Utilities.getCurrentFormattedDate()
}