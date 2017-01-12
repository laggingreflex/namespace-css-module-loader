var loaderUtils = require('loader-utils');
var postcss = require('postcss');
var plugin = require('./plugin');

module.exports = function processCss(content) {
  var callback = this.async();
  var query = loaderUtils.parseQuery(this.query);
  var pipeline = postcss([plugin(query)]);
  pipeline.process(content).then(function(result) {
    callback(null, result.css);
  }).catch(callback);
}
