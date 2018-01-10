import React from 'react'
import CodeListView from './CodeListView'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<CodeListView />).toJSON()
  expect(rendered).toBeTruthy()
})