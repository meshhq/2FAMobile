import key, { KeyState } from './key'
import { combineReducers } from 'redux'

const app = combineReducers({
  key
})

export default app

export {
  KeyState
}