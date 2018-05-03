import { Dispatch, Action, ActionCreatorsMapObject } from 'redux'
import NetworkService from '../services/NetworkService'
import Key from '../models/Key'

export const REFRESH_KEYS = 'REFRESH_KEYS'

export const refreshKeys = (userId) => (dispatch) => {
  return NetworkService.getKeys(userId)
    .then((keys) => {
      return refreshKeysAction(keys)
    })
}

export const postNewKey = (device, QRData) => (dispatch) => {
  return NetworkService.createKey(device, QRData)
    .then((keyData) => {
      return Key.addOrUpdateKey(keyData)
    })
}

export const deleteKey = (keyId) => (dispatch) => {
  return NetworkService.deleteKey(keyId)
    .then(() => {
      return Key.deleteKey(keyId)
    })
}

export const updateKey = (updateData, keyData) => (dispatch) => {
  return NetworkService.updateKey(updateData, keyData)
    .then((newKeyData) => {
      return Key.addOrUpdateKey(newKeyData)
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