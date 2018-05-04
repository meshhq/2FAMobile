import OTP from 'otp-client'

import { CLEAR_BIT_API_KEY } from 'react-native-dotenv'

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
	 * This will hit the ClearBit API to get more info on the
	 * company domain provided.
	 * @param {string} companyDomain
	 */
	static getClearBitData = async (companyDomain) => {
		const Company = clearBit.Company
		return await Company.find({domain: companyDomain})
			.catch((err) => {
					console.error(err)
			})
	}

	/**
	 * Take the current secret and generate a new token.
	 * This will also reset the 30 second timer.
	 */
	static generateTokenFromSecret = (secret) => {
		const otp = new OTP(secret)
		const newToken = otp.getToken()
		return newToken
	}

	/**
	 * Will create a random UUID for this device that will serve
	 * as the Id passed to the server to get all this User's keys.
	 */
	static createDeviceId = () => {
		function section() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return section() + section() + '-' + section() + '-' + section() + '-' + section() + '-' + section() + section() + section()
	}

}
