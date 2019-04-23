var postcss = require('postcss');
var pkg = require('./package.json');

module.exports = postcss.plugin(pkg.name, plugin);

function plugin(opts) {
  opts = opts || {};
  var id = opts.id || 'style';
  var local = opts.rootClass ? ('.' + opts.rootClass) : (':local(.' + id + ')');
  return function (root) {
    var keyframes = [];
    root.walkAtRules(/(keyframes)$/, function (rule) {
      keyframes.push(rule);
      rule.remove();
    });
    var result = root.walkRules(function (rule) {
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
    });

    keyframes.map(keyframe => {
      root.append(keyframe);
    });

    return result;
  }
}
