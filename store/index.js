import CombinedReducers from '../reducers'
import { saveState } from './LocalStorage'
import { createStore } from 'redux'

export default function configureStore(initialState) {
  const store = createStore(CombinedReducers, initialState)
  addSubscribersToStore(store)
  return store
}

function addSubscribersToStore(store) {
  const addListener = async () => {
    return await saveState({
      key: store.getState().key
    })
  }
  store.subscribe(
		addListener
	)
}
