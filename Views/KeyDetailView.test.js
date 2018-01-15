import React from 'react'
import KeyDetailView from './KeyDetailViewCell'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<KeyDetailViewCell />).toJSON()
  expect(rendered).toBeTruthy()
})