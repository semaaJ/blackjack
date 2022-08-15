import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';

it('should render button', () => {
  const button = renderer.create(<Button />).toJSON();
  expect(button).toMatchSnapshot();
});

it('should render button with text', () => {
    const button = renderer.create(<Button text="name" />).toJSON();
    expect(button).toMatchSnapshot();
});
  
it('should render disabled when disabled prop passed', () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
});


