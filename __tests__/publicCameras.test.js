const React = require('react');
const renderer = require('react-test-renderer');
const PublicCameras = require('../index.js').default || require('../index.js');

test('PublicCameras renders list', () => {
  const component = renderer.create(React.createElement(PublicCameras));
  const tree = component.toJSON();
  expect(tree).toBeTruthy();
});
