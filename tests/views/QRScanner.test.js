import React from 'react'
import QRScanner from '../../views/QRScanner'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<QRScanner />).toJSON()
  expect(rendered).toBeTruthy()
})