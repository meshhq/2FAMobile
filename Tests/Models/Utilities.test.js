import React from 'react'

import Utilities from '../../Utilities'

describe('KeyModel', () => {

    it('getParameterByName()', () => {
        const testURI = 'otpauth://totp/test?secret=12345&issuer=testIssuer'
        const secret = Utilities.getParameterByName('secret', testURI)
        const issuer = Utilities.getParameterByName('issuer', testURI)
        expect(secret).toEqual('12345')
        expect(issuer).toEqual('testIssuer')
    })

    it('getClearBitData()', () => {
        const companyName = 'google.com'
        const companyData = Utilities.getClearBitData(companyData)
        expect(companyData).not.toEqual(null)
    })

})