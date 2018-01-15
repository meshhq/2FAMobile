import React from 'react'
import KeyListViewCell from './KeyListViewCell'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<KeyListViewCell />).toJSON()
  expect(rendered).toBeTruthy()
})