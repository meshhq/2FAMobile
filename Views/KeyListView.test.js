import React from 'react'
import KeyListView from './KeyListView'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<KeyListView />).toJSON()
  expect(rendered).toBeTruthy()
})