var assert = require('assert');
var postcss = require('postcss');
const plugin = require('./plugin');

const process = (css, opts) =>
  postcss([plugin(opts)]).process(css).then(({ css }) => css);

describe('plugin', () => {

  it('should process grouped rules', () => process(
    '.a {}'
  ).then(css => assert.equal(css,
    ':global :local(.style) .a {}'
  )));

  it('should process grouped rules', () => process(
    '.a, .b {}'
  ).then(css => assert.equal(css,
    ':global :local(.style) .a, :global :local(.style) .b {}'
  )));

});
