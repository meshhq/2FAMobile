import { AsyncStorage } from 'react-native'

export default class CodeModel {

    static async addCode() {
        const data = CodeModel.createDummyData()
        try {
            const dataString = JSON.stringify(data)
            await AsyncStorage.setItem('Code', dataString)
        } catch (error) {
            console.log('Set Code Error', JSON.stringify(error.message))
        }
    }

    static async getAllCodes() {
        return AsyncStorage.getItem('Code').then((result) => {
            return result
        })
    }

    static createDummyData() {
        return [{
            key: '123-456',
            date: Date.now().toString()
        },
        {
            key: '123-456',
            date: Date.now().toString()
        },
        {
            key: '123-456',
            date: Date.now().toString()
        }]
    }

}