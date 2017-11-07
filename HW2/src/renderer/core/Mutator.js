import JavaParser from './JavaParser'

/*
 * Mutator
 * code: java code split by line
 * config: mutation configuration
 */
function Mutator (code, config) {
  this.JavaParser = JavaParser.createJavaParser(code, config)

  this.genMutation = function () {
    // <TODO>
  }
}

exports.createMutator = function (code, config) {
  return new Mutator(code, config)
}
