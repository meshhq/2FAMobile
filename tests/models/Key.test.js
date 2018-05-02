import Key from '../../models/Key'

import MockStorage from '../MockStorage'
import Utilities from '../../Utilities';

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

	it('updateAllCodes()', async () => {
		const keys = await Key.getAllKeyData()
		const key = keys[0]
		const currentCode = key.code
		await Key.updateAllCodes()
		const newKeys = await Key.getAllKeyData()
		const newKey = newKeys[0]
		expect(currentCode).not.toEqual(newKey.code)
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
		code: '',
		provider: 'Github',
		user_id: 'MeshStudio'
	}
}