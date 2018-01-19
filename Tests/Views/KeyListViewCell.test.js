import React from 'react'
import KeyListViewCell from '../../Views/KeyListViewCell'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<KeyListViewCell keyData={dummyKey}/>).toJSON()
  expect(rendered).toBeTruthy()
})

const dummyKey = { 
  id: '1',
  date: '00/00/0000',
  data: 'localhost:3000',
  target: 'testTarget',
  type: 'testType'
}