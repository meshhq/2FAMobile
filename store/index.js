import CombinedReducers from '../reducers'
import { saveState } from './LocalStorage'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
  const middleware = applyMiddleware(thunk)
  const store = createStore(CombinedReducers, initialState, middleware)
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
