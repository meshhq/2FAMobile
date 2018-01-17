import React from 'react'

import Utilities from './Utilities'

import otplib from './Otplib/packages/otplib/index'

describe('KeyModel', () => {

    it('getParameterByName()', () => {
        const testURI = 'otpauth://totp/test?secret=12345&issuer=testIssuer'
        const secret = Utilities.getParameterByName('secret', testURI)
        const issuer = Utilities.getParameterByName('issuer', testURI)
        expect(secret).toEqual('12345')
        expect(issuer).toEqual('testIssuer')
    })

    it('generateTokenFromSecret()', () => {
        const secret = otplib.authenticator.generateSecret()
        const token = Utilities.generateTokenFromSecret(secret)
        expect(token).toEqual(expect.anything())
    })

})