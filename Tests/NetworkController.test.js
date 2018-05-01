import NetworkController from '../Services/NetworkController'
import Utilities from '../Utilities'
import constants from '../utils/constants'
const UUID = require('react-native-uuid')

import {
    createKeyResponse,
    updateKeyResponse,
    getKeysResponse,
    deleteKeysResponse
} from './MockResponses'


if (constants.LOCAL_SERVER_IS_RUNNING === 'FALSE') {
    var nock = require('nock');
    let scope = nock('http://localhost:1323')
    .post('/keys').reply(200, createKeyResponse())
    .put('/keys/1').reply(200, updateKeyResponse())
    .get('/keys?user_id=MeshStudio').reply(200, getKeysResponse())
    .delete('/keys/1').reply(200, deleteKeysResponse()).persist()
}

describe('Network Controller', () => {
    it('createKey()', () => {
        return NetworkController.createKey(dummyDeviceData, dummyQRData)
            .then((json) => {
                expect(json.data).not.toEqual(null)
                const key = json.data
                expect(key.ID).not.toEqual(null)
                expect(key.key).not.toEqual(null)
                expect(key.user_id).not.toEqual(null)
                expect(key.provider).not.toEqual(null)
            })
    })
    it('updateKey()', async () => {
        const newKeyData = {key: '789123'}
        const keyData = await createNewKey()
        return NetworkController.updateKey(newKeyData, keyData)
            .then((json) => {
                expect(json).not.toEqual(null)
                expect(json.message).toEqual('Success.')
            })
    })
    it('getKeys()', async () => {
        const keyData = await createNewKey()
        return NetworkController.getKeys(keyData.user_id)
            .then((json) => {
                expect(json).not.toEqual(null)
                expect(json.data).not.toEqual(null)
                expect(json.data.length).toBeGreaterThan(0)
            })
    })
    it('deleteKey()', async () => {
        const keyData = await createNewKey()
        return NetworkController.deleteKey(keyData.ID)
            .then((json) => {
                expect(json).not.toEqual(null)
                expect(json.message).toEqual('Success.')
            })
    })
})

const createNewKey = async () => {
    return NetworkController.createKey(dummyDeviceData, dummyQRData)
        .then((json) => {
            return json.data
        })
}

const dummyQRData = {
    date: Utilities.getCurrentFormattedDate(),
    issuer: 'Mesh Studio',
    secret: '123456'
}

const dummyDeviceData = {
    uuid: UUID.v4(),
    date: Utilities.getCurrentFormattedDate()
}
