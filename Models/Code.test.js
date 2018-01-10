import CodeModel from './Code'

import MockStorage from '../MockStorage'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)

jest.setMock('AsyncStorage', AsyncStorage)

describe('CodeModel', () => {

    it('getAllCodes()', async () => {
        await CodeModel.getAllCodes()
            .then((result) => {
                expect(result).toBe(null)
            })
    })

    it('addCode()', async () => {
        const dummyCode = createDummyCode()
        await CodeModel.addCode(dummyCode)
            .then(() => {
                return CodeModel.getAllCodes()
            })
            .then((result) => {
                expect(result).toEqual(expect.anything())
            })
    })
    
    it('getAllCodes()', async () => {
        await CodeModel.getAllCodes()
            .then((result) => {
                expect(result).toEqual(expect.anything())
            })
    })

    it('removeAllCodes()', async () => {
        await CodeModel.removeAllCodes()
            .then(() => {
                return CodeModel.getAllCodes()
            })
            .then((result) => {
                expect(result).toBe(null)
            })
    })

})

const createDummyCode = () => {
    return { 
        date: '00/00/0000',
        data: 'localhost:3000',
        target: 'testTarget',
        type: 'testType'
    }
}