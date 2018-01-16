import DeviceModel from './Device'

import MockStorage from '../MockStorage'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)

jest.setMock('AsyncStorage', AsyncStorage)

describe('DeviceModel', () => {

    it('getDeviceInfo()', async () => {
        await DeviceModel.getDeviceInfo()
            .then((result) => {
                expect(result).toEqual(expect.anything())
            }).then(() => {
                return DeviceModel.removeDeviceInfo()
            })
    })

    it('saveDeviceInfo()', async () => {
        await DeviceModel.saveDeviceInfo()
            .then(() => {
                return DeviceModel.getDeviceInfo()
            })
            .then((result) => {
                expect(result).toEqual(expect.anything())
            })
    })

    it('getDeviceInfo()', async () => {
        await DeviceModel.getDeviceInfo()
            .then((result) => {
                expect(result).toEqual(expect.anything())
            })
    })

})