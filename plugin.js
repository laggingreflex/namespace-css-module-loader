var postcss = require('postcss');
var { createGenerator, createParser } = require('scalpel');
var pkg = require('./package.json');

module.exports = postcss.plugin(pkg.name, plugin);

const generator = createGenerator();
const parser = createParser();

function plugin(opts) {
  opts = opts || {}
  var id = opts.id || 'style'
  var local = ':local(.' + id + ')'
  return function(root) {
    return root.walkRules(function(rule) {
      // console.log({ 'rule.selector': rule.selector });
      // const tokens = parser.parse(rule.selector);
      // console.log({ tokens });


      if (rule.selector.substr(0, 7) === ':global') return;

      rule.selectors = rule.selectors.map(selector => {
        const descendant = ':global ' + local + ' ' + selector;
        const combined = ':global ' + selector.replace(/([\w-\.\#\*]+)(.*)/, '$1' + local + '$2')

        if (opts.combine && opts.descendant) {
          return [combined, descendant].join(', ');
        } else if (opts.combine) {
          return combined
        } else {
          return descendant
        }
      });
    })
  }
}
