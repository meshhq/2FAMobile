import Device from '../../models/Device'

import MockStorage from '../MockStorage'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)

jest.setMock('AsyncStorage', AsyncStorage)

describe('Device', () => {

	it('getDeviceInfo()', async () => {
		const deviceInfo = await Device.getDeviceInfo()
		expect(deviceInfo).not.toEqual(null)
		expect(deviceInfo.uuid).not.toEqual(null)
		await Device.removeDeviceInfo()
	})

	it('saveDeviceInfo()', async () => {
		await Device.saveDeviceInfo()
		const deviceInfo = await Device.getDeviceInfo()
		expect(deviceInfo).toEqual(expect.anything())
		expect(deviceInfo.uuid).toEqual(expect.anything())
	})
    
})