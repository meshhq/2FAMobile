import { REFRESH_KEYS } from '../actions/key'

export const defaultState = {
  keys: []
}

function keys (state = defaultState, action) {
  switch (action.type) {
    case REFRESH_KEYS:
      return Object.assign({}, state, {
        keys: action.keys
      })
    default:
      return state
  }
}

export default keys