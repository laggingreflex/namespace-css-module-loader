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

  it('should process combined rules', () => process(
    '.a {}', { combine: true }
  ).then(css => assert.equal(css,
    ':global .a:local(.style) {}'
  )));

  it('should process combined grouped rules', () => process(
    '.a, .b {}', { combine: true }
  ).then(css => assert.equal(css,
    ':global .a:local(.style), :global .b:local(.style) {}'
  )));

  it('should process combined child rules', () => process(
    '.a .b {}', { combine: true }
  ).then(css => assert.equal(css,
    ':global .a:local(.style) .b {}'
  )));

  it('should process combined child rules with newline', () => process(
    `.a
    .b {}`, { combine: true }
  ).then(css => assert.equal(css,
    `:global .a:local(.style)
    .b {}`
  )));

  it('should process combined & descendant', () => process(
    '.a .b {}', { combine: true, descendant: true }
  ).then(css => assert.equal(css,
    ':global .a:local(.style) .b, :global :local(.style) .a .b {}'
  )));

  it('should process rootClass', () => process(
    '.a .b {}', { rootClass: 'rootClass' }
  ).then(css => assert.equal(css,
    ':global .rootClass .a .b {}'
  )));

});
