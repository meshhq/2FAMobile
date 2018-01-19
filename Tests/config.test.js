import React from 'react'

it('configure .env for test suite', () => {
    const env = require('dotenv').config()
    expect(env).toEqual(expect.anything())
})