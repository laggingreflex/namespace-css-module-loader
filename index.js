var loaderUtils = require('loader-utils');
var postcss = require('postcss');
var pkg = require('./package.json');

var plugin = postcss.plugin(pkg.name, function(opts) {
  opts = opts || {}
  var id = opts.id || 'root'
  return function(root) {
    return root.walkRules(function(rule) {
      rule.selector = ':local(.' + id + ') ' + rule.selector;
    })
  }
});

module.exports = function processCss(content) {
  var callback = this.async();
  var query = loaderUtils.parseQuery(this.query);
  var pipeline = postcss([plugin(query)]);
  pipeline.process(content).then(function(result) {
    callback(null, result.css);
  }).catch(callback);
}
