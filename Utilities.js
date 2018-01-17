import otplib from './Otplib/packages/otplib/index'

export default class Utilities {

    /**
     * Will format the scan date to 'XX/XX/XXXX' and return it as a string.
     */
    static getCurrentFormattedDate = () => {
        const today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1 // January is 0
        const yyyy = today.getFullYear()

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        } 

        return mm + '/' + dd + '/' + yyyy
    }

    /**
     * Will strip out the value for a given name from 
     * the given url.
     * @param {string} name
     * @param {string} url
     */
    static getParameterByName = (name, url) => {
        name = name.replace(/[\[\]]/g, "\\$&")
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url)
        if (!results) {
            return null
        }
        if (!results[2]) { 
            return ''
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "))
    }

    /**
     * Will generate a new token based on the secret we
     * got from the QR Code.
     * @param {string} secret
     */
    static generateTokenFromSecret = (secret) => {
        const token = otplib.authenticator.generate(secret)
        const isValid = otplib.authenticator.verify({
            secret,
            token: token
        })
        if (isValid) {
            return token
        } else {
            throw new Error('Error Validating Token generated from Secret')
        }
    }
    
}