import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../Card';


it('should render', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render with text & colour', () => {
    const tree = renderer.create(<Card symbol="test" colour="text-rose-500" rank="test" />).toJSON();
    expect(tree).toMatchSnapshot();
});
