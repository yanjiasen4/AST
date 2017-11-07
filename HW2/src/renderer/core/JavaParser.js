/*
 * JavaParser
 * data: java code split by line
 * config: mutation configuration
 */

function JavaParser (data, config) {
  this.data = data
  this.config = config
}

exports.createJavaParser = function (data, config) {
  return new JavaParser(data, config)
}
