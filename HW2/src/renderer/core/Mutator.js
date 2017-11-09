import JavaParser from './JavaParser'

/*
 * Mutator
 * code: java code split by line
 * config: mutation configuration
 */
function Mutator (code, config) {
  this.javaParser = JavaParser.createJavaParser(code, config)

  this.genMutation = function () {
    this.javaParser.parseOps()
  }

  this.getCode = function () {
    return this.javaParser.data
  }
}

exports.createMutator = function (code, config) {
  return new Mutator(code, config)
}
