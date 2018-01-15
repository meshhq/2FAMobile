import KeyModel from './Key'

import MockStorage from '../MockStorage'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)

jest.setMock('AsyncStorage', AsyncStorage)

describe('KeyModel', () => {

    it('getAllKeyIds()', async () => {
        // Should return null since there are no keys
        await KeyModel.getAllKeyIds()
            .then((keys) => {
                expect(keys).toBe(null)
            })
    })

    it('getKeyWithId()', async () => {
        // Should return null since there are no keys
        await KeyModel.getKeyWithId(keyId)
            .then((result) => {
                expect(result).toBe(null)
            })
    })

    // Create new key
    it('addOrUpdateKey()', async () => {
        const dummyKey = createDummyKey()
        await KeyModel.addOrUpdateKey(dummyKey)
            .then(() => {
                return KeyModel.getKeyWithId(keyId)
            })
            .then((result) => {
                expect(result).toEqual(expect.anything())
            })
    })
    
    it('getKeyWithId()', async () => {
        await KeyModel.getKeyWithId(keyId)
            .then((result) => {
                expect(result).toEqual(expect.anything())
                const keyData = JSON.parse(result)
                expect(keyData.target).toEqual(testTargetOne)
            })
    })

    it('getAllKeyIds()', async () => {
        await KeyModel.getAllKeyIds()
            .then((result) => {
                expect(result).toEqual(expect.anything())
            })
    })

    it('getAllKeyData()', async () => {
        await KeyModel.getAllKeyData()
            .then((keys) => {
                expect(keys).toEqual(expect.anything())
            })
    })

    // Update existing key
    it('addOrUpdateKey()', async () => {
        const dummyKey = createDummyKey()
        dummyKey.target = testTargetTwo
        await KeyModel.addOrUpdateKey(dummyKey)
            .then(() => {
                return KeyModel.getKeyWithId(keyId)
            })
            .then((result) => {
                expect(result).toEqual(expect.anything())
                const keyData = JSON.parse(result)
                expect(keyData.target).toEqual(testTargetTwo)
            })
    })

    it('wipeLocalStore()', async () => {
        await KeyModel.wipeLocalStore()
            .then(() => {
                return KeyModel.getKeyWithId(keyId)
            })
            .then((result) => {
                expect(result).toBe(null)
            })
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