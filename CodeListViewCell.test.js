import React from 'react'
import CodeListViewCell from './CodeListViewCell'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<CodeListViewCell />).toJSON()
  expect(rendered).toBeTruthy()
})