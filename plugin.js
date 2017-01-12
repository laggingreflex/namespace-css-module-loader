var postcss = require('postcss');
var pkg = require('./package.json');

module.exports = postcss.plugin(pkg.name, plugin);

function plugin(opts) {
  opts = opts || {}
  var id = opts.id || 'style'
  return function(root) {
    return root.walkRules(function(rule) {
      if (rule.selector.substr(0, 7) === ':global') return;

      if (opts.combine) {
        rule.selectors = rule.selectors.map(selector => {
          let selectors = selector.split(/[\s\r\n]+/);
          selectors[0] += ':local(.' + id + ')'
          return ':global ' + selectors.join(' ');
        });
      } else {
        rule.selectors = rule.selectors.map(selector => {
          return ':global :local(.' + id + ') ' + selector;
        });
      }
    })
  }
}
