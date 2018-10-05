import React from 'react'
import ExampleBtn from '../ExampleBtn'
import renderer from 'react-test-renderer'

test('render test', () => {
  const component = renderer.create(
    <ExampleBtn type="text">Test</ExampleBtn>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('render without type props', () => {
  const component = renderer.create(
    <ExampleBtn>Test</ExampleBtn>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})