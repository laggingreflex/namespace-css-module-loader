var postcss = require('postcss');
var pkg = require('./package.json');

module.exports = postcss.plugin(pkg.name, plugin);

function plugin(opts) {
  opts = opts || {}
  var id = opts.id || 'style'
  return function(root) {
    return root.walkRules(function(rule) {
      if (rule.selector.substr(0, 7) === ':global') return;

      rule.selectors = rule.selectors.map(selector => {
        return ':global :local(.' + id + ') ' + selector;
      });
    })
  }
}
