import NetworkService from '../services/NetworkService'
import Key from '../models/Key'

export const REFRESH_KEYS = 'REFRESH_KEYS'

export const refreshKeys = (userId) => (dispatch) => {
  return NetworkService.getKeys(userId)
    .then((keys) => {
      return refreshKeysAction(keys)
    })
    .then((action) => {
      return dispatch(action)
    })
}

export const postNewKey = (device, QRData) => (dispatch) => {
  return NetworkService.createKey(device, QRData)
    .then(() => {
      return NetworkService.getKeys(device.uuid)
    })
    .then((keys) => {
      return refreshKeysAction(keys)
    })
    .then((action) => {
      return dispatch(action)
    })
}

export const deleteKey = (device, keyId) => (dispatch) => {
  return NetworkService.deleteKey(keyId)
    .then(() => {
      return NetworkService.getKeys(device.uuid)
    })
    .then((keys) => {
      return refreshKeysAction(keys)
    })
    .then((action) => {
      return dispatch(action)
    })
}

export const updateKey = (device, updateData, keyData) => (dispatch) => {
  return NetworkService.updateKey(updateData, keyData)
    .then(() => {
      return NetworkService.getKeys(device.uuid)
    })
    .then((keys) => {
      return refreshKeysAction(keys)
    })
    .then((action) => {
      return dispatch(action)
    })
}

const refreshKeysAction = (keys) => {
  return {
    receivedAt: Date.now(),
    type: REFRESH_KEYS,
    keys: keys
  }
}

export const KeyActions = {
  refreshKeys,
  postNewKey,
  deleteKey,
  updateKey
}