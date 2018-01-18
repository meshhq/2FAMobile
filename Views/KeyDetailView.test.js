import React from 'react'
import KeyDetailView from './KeyDetailView'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<KeyDetailView keyData={dummyKey} />).toJSON()
  expect(rendered).toBeTruthy()
})

const dummyKey = { 
  id: '1',
  date: '00/00/0000',
  data: 'localhost:3000',
  target: 'testTarget',
  type: 'testType'
}