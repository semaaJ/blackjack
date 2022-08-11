import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';


it('should render', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render with text', () => {
    const tree = renderer.create(<Button text="name" />).toJSON();
    expect(tree).toMatchSnapshot();
});

  
it('should render disabled when disabled prop passed', () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
});


