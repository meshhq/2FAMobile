import DeviceModel from './Device'

import MockStorage from '../MockStorage'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)

jest.setMock('AsyncStorage', AsyncStorage)

describe('DeviceModel', () => {

    it('getDeviceInfo()', async () => {
        const deviceInfo = await DeviceModel.getDeviceInfo()
        expect(deviceInfo).toEqual(expect.anything())
        expect(deviceInfo.uuid).toEqual(expect.anything())
        await DeviceModel.removeDeviceInfo()
    })

    it('saveDeviceInfo()', async () => {
        await DeviceModel.saveDeviceInfo()
        const deviceInfo = await DeviceModel.getDeviceInfo()
        expect(deviceInfo).toEqual(expect.anything())
        expect(deviceInfo.uuid).toEqual(expect.anything())
    })
    
})