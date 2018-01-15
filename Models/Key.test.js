import KeyModel from './Key'

import MockStorage from '../MockStorage'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)

jest.setMock('AsyncStorage', AsyncStorage)

describe('KeyModel', () => {

    it('getAllKeys()', async () => {
        await KeyModel.getAllKeys()
            .then((result) => {
                expect(result).toBe(null)
            })
    })

    it('addKey()', async () => {
        const dummyKey = createDummyKey()
        await KeyModel.addKey(dummyKey)
            .then(() => {
                return KeyModel.getAllKeys()
            })
            .then((result) => {
                expect(result).toEqual(expect.anything())
            })
    })
    
    it('getAllKeys()', async () => {
        await KeyModel.getAllKeys()
            .then((result) => {
                expect(result).toEqual(expect.anything())
            })
    })

    it('wipeLocalStore()', async () => {
        await KeyModel.wipeLocalStore()
            .then(() => {
                return KeyModel.getAllKeys()
            })
            .then((result) => {
                expect(result).toBe(null)
            })
    })

})

const createDummyKey = () => {
    return { 
        id: '1',
        date: '00/00/0000',
        data: 'localhost:3000',
        target: 'testTarget',
        type: 'testType'
    }
}