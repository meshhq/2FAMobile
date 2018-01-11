import { AsyncStorage } from 'react-native'

const codeKey = 'CodesKey'

export default class CodeModel {

    /**
     * Will fetch the existing codes and append the new code.
     * codeData will include the QR url and the date the code was scanned.
     */
    static async addCode(codeData) {
        await CodeModel.getAllCodes().then((result) => {
            let resultArray
            if (!result) {
                resultArray = []
            } else {
                resultArray = JSON.parse(result)
            }
            resultArray.push(codeData)
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
     * Will remove a value for a given key object.
     * Note: This is pretty ugly but it'll be removed later on.
     * @param {string} data 
     */
    static async removeCodeForKey(data) {
        await CodeModel.getAllCodes().then((result) => {
            if (!result) {
                return
            }
            let resultArray = JSON.parse(result)
            let foundIndex
            for (let index = 0; index < resultArray.length; index++) {
                const element = resultArray[index];
                if (element.data === data) {
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

    /**
     * Used in DEV mode only to wipe the store clean.
     */
    static async removeAllCodes() {
        try {
            await AsyncStorage.removeItem(codeKey)            
        } catch (error) {
            console.log('Error Removing All Codes: ', error)
        }
    }

}