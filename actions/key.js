import NetworkService from '../services/NetworkService'
import Key from '../models/Key'

export const REFRESH_KEYS = 'REFRESH_KEYS'

/**
 * Will get all the keys for this device's uuid.
 * @param {string} userId 
 */
export const refreshKeys = (userId) => (dispatch) => {
  return NetworkService.getKeys(userId)
    .then((keys) => {
      return refreshKeysAction(keys)
    })
    .then((action) => {
      return dispatch(action)
    })
}

/**
 * Will add a new key attached to this device's uuid.
 * @param {Device} device 
 * @param {Object} QRData 
 */
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

/**
 * Will delete the key for the given Id.
 * @param {Device} device 
 * @param {Object} keyId 
 */
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

/**
 * Update an existing Key with the new data provided.
 * @param {Device} device 
 * @param {Object} updateData 
 * @param {Object} keyData 
 */
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