import React from 'react'
import KeyListView from '../../views/KeyListView'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<KeyListView data={dummyKey}/>).toJSON()
  expect(rendered).toBeTruthy()
})

const dummyKey = [{ 
  id: '1',
  date: '00/00/0000',
  data: 'localhost:3000',
  target: 'testTarget',
  type: 'testType'
}]