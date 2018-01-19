import KeyModel from '../../Models/Key'

import MockStorage from '../MockStorage'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)

jest.setMock('AsyncStorage', AsyncStorage)

describe('KeyModel', () => {

    it('getAllKeyIds()', async () => {
        // Should return null since there are no keys
        const keyIds = await KeyModel.getAllKeyIds()
        expect(keyIds).toBe(null)
    })

    it('getKeyWithId()', async () => {
        // Should return null since there are no keys
        const result = await KeyModel.getKeyWithId(keyId)
        expect(result).toBe(null)
    })

    // Create new key
    it('addOrUpdateKey()', async () => {
        const dummyKey = createDummyKey()
        await KeyModel.addOrUpdateKey(dummyKey)
        const key = await KeyModel.getKeyWithId(keyId)
        expect(key).toEqual(expect.anything())
        expect(key.id).toEqual(keyId)
    })
    
    it('getKeyWithId()', async () => {
        const key = await KeyModel.getKeyWithId(keyId)
        expect(key).toEqual(expect.anything())
        expect(key.target).toEqual(testTargetOne)
    })

    it('getAllKeyIds()', async () => {
        const key = await KeyModel.getAllKeyIds()
        expect(key).toEqual(expect.anything())
    })

    it('getAllKeyData()', async () => {
        const keys = await KeyModel.getAllKeyData()
        expect(keys).toEqual(expect.anything())
    })

    // Update existing key
    it('addOrUpdateKey()', async () => {
        const dummyKey = createDummyKey()
        dummyKey.target = testTargetTwo
        await KeyModel.addOrUpdateKey(dummyKey)
        const key = await KeyModel.getKeyWithId(keyId)
        expect(key).toEqual(expect.anything())
        expect(key.target).toEqual(testTargetTwo)
    })

    it('deleteKey()', async () => {
        await KeyModel.deleteKey(keyId)
        const allIds = await KeyModel.getAllKeyIds()
        expect(allIds).toBe(null)
        const allData = await KeyModel.getAllKeyData()
        expect(allData).toBe(null)
    })

    it('wipeLocalStore()', async () => {
        await KeyModel.wipeLocalStore()
        const key = await KeyModel.getKeyWithId(keyId)
        expect(key).toBe(null)
    })

})

const keyId = '1'
const testTargetOne = 'testTarget_1'
const testTargetTwo = 'testTarget_2'

const createDummyKey = () => {
    return { 
        id: keyId,
        date: '00/00/0000',
        data: 'localhost:3000',
        target: testTargetOne,
        type: 'testType'
    }
}