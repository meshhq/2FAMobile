import React from 'react'
import CodeDetailView from './CodeDetailViewCell'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<CodeDetailViewCell />).toJSON()
  expect(rendered).toBeTruthy()
})