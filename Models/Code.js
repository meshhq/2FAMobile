import { AsyncStorage } from 'react-native'

const codeKey = 'CodesKey'

export default class CodeModel {

    /**
     * Will fetch the existing codes and append the new code.
     */
    static async addCode() {
        const data = CodeModel.createDummyData()
        await CodeModel.getAllCodes().then((result) => {
            let resultArray
            if (!result) {
                resultArray = []
            } else {
                resultArray = JSON.parse(result)
            }

            // Dummy data needs to be replaced by network call
            const dummyData = CodeModel.createDummyData()
            
            resultArray.push(dummyData)
            
            try {
                const dataString = JSON.stringify(resultArray)
                return AsyncStorage.setItem(codeKey, dataString)
            } catch (error) {
                console.log('Set Code Error', JSON.stringify(error.message))
            }
        })
    }

    /**
     * Get all the codes currently stored
     */
    static async getAllCodes() {
        return AsyncStorage.getItem(codeKey).then((result) => {
            return result
        })
    }

    /**
     * Will remove a value for a given key.
     * Note: This is pretty ugly but it'll be removed later on.
     * @param {string} key 
     */
    static async removeCodeForKey(key) {
        await CodeModel.getAllCodes().then((result) => {
            if (!result) {
                return
            }
            let resultArray = JSON.parse(result)
            let foundIndex
            for (let index = 0; index < resultArray.length; index++) {
                const element = resultArray[index];
                if (element.key === key) {
                    foundIndex = index
                    break
                }
            }
            resultArray.splice(foundIndex, 1)
            try {
                const dataString = JSON.stringify(resultArray)
                return AsyncStorage.setItem(codeKey, dataString)
            } catch (error) {
                console.log('Set Code Error', JSON.stringify(error.message))
            }
        })
    }

    static createDummyData() {
        const number = Math.floor(Math.random() * 90000) + 10000;
        return {
            key: number.toString()
        }
    }

}