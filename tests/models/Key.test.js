import Key from '../../models/Key'

import MockStorage from '../MockStorage'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)

jest.setMock('AsyncStorage', AsyncStorage)

describe('Key', () => {

	it('getAllKeyData()', async () => {
		// Should return 2 Dummy Keys
		// TODO: Change for PROD
		const keys = await Key.getAllKeyData()
		expect(keys.length).toBeGreaterThanOrEqual(2)
	})

	it('addOrUpdateKey()', async () => {
		// Should return null since there are no keys
		const result = await Key.addOrUpdateKey(createDummyKey())
		const keys = await Key.getAllKeyData()
		expect(keys.length).toBeGreaterThanOrEqual(3)
	})
	
	it('getAllKeyData()', async () => {
		const key = await Key.getKeyWithId(keyId)
		expect(key).not.toEqual(null)
		expect(key.target).toEqual(testTargetOne)
	})

	it('deleteKey()', async () => {
		const key = await Key.deleteKey(keyId)
		const keys = await Key.getAllKeyData()
		expect(keys.length).toBeGreaterThanOrEqual(2)
	})

})

const keyId = '3'
const testTargetOne = 'testTarget_1'

const createDummyKey = () => {
	return { 
		ID: keyId,
		date: '00/00/0000',
		data: 'localhost:3000',
		target: testTargetOne,
		type: 'testType',
		key: 'a120c2b83a244baaaea4b069fa01caf4',
		provider: 'Github',
		user_id: 'MeshStudio'
	}
}