import Key from '../../models/Key'

import MockStorage from '../MockStorage'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)

jest.setMock('AsyncStorage', AsyncStorage)

describe('Key', () => {

	it('getAllKeyIds()', async () => {
		// Should return null since there are no keys
		const keyIds = await Key.getAllKeyIds()
		expect(keyIds).toBe(null)
	})

	it('getKeyWithId()', async () => {
		// Should return null since there are no keys
		const result = await Key.getKeyWithId(keyId)
		expect(result).toBe(null)
	})

	// Create new key
	it('addOrUpdateKey()', async () => {
		const dummyKey = createDummyKey()
		await Key.addOrUpdateKey(dummyKey)
		const key = await Key.getKeyWithId(keyId)
		expect(key).not.toEqual(null)
		expect(key.id).toEqual(keyId)
	})
	
	it('getKeyWithId()', async () => {
		const key = await Key.getKeyWithId(keyId)
		expect(key).not.toEqual(null)
		expect(key.target).toEqual(testTargetOne)
	})

	it('getAllKeyIds()', async () => {
		const key = await Key.getAllKeyIds()
		expect(key).not.toEqual(null)
	})

	it('getAllKeyData()', async () => {
		const keys = await Key.getAllKeyData()
		expect(keys).not.toEqual(null)
	})

	// Update existing key
	it('addOrUpdateKey()', async () => {
		const dummyKey = createDummyKey()
		dummyKey.target = testTargetTwo
		await Key.addOrUpdateKey(dummyKey)
		const key = await Key.getKeyWithId(keyId)
		expect(key).not.toEqual(null)
		expect(key.target).toEqual(testTargetTwo)
	})

	it('deleteKey()', async () => {
		await Key.deleteKey(keyId)
		const allIds = await Key.getAllKeyIds()
		expect(allIds).toBe(null)
		const allData = await Key.getAllKeyData()
		expect(allData).toBe(null)
	})

	it('wipeLocalStore()', async () => {
		await Key.wipeLocalStore()
		const key = await Key.getKeyWithId(keyId)
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