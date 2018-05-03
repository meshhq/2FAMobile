import { AsyncStorage } from 'react-native'

const STATE_KEY = 'STATE_KEY'

export function loadState() {
	return AsyncStorage.getItem(STATE_KEY).then((result) => {
		return JSON.parse(result)
	})
}

export async function saveState(state) {
	await AsyncStorage.setItem(STATE_KEY, JSON.stringify(state))
}

export async function clearState() {
	return AsyncStorage.removeItem(STATE_KEY)
}
