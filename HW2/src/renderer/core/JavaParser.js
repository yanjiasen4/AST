/*
 * JavaParser
 * data: java code split by line
 * config: mutation configuration
 */
import OpType from '../assets/Operator'

function OpUnit (line, pos, op, opType) {
  this.line = line
  this.pos = pos
  this.op = op
  this.opType = opType
}

function JavaParser (data, config) {
  this.data = data
  this.config = config
  this.opsPos = []

  this.parseOps = function () {
    let inStarComment = false
    for (let i in this.data) {
      let line = this.data[i]
      // clear the front and back spaces
      let nline = line.trim()
      // ignore star comments
      if (inStarComment) {
        if (nline.length > 1 && nline.substring(nline.length - 2) === '*/') inStarComment = false
        continue
      }
      if (nline.length > 1 && nline.substring(0, 2) === '/*') {
        inStarComment = true
        continue
      }
      // ignore blank line or comment
      if (nline === '' || nline[0] === '/') continue
      // ignore String definitions and inline star comments

      // AORU
      let lastToken = ''
      let inString = false
      for (let j in line) {
        let token = line[j]
        if (token === '\'' || token === '"') {
          inString = !inString
          continue
        }
        switch (token) {
          case '+': {
            if (lastToken === '+') {
              let muOp = new OpUnit(i, j, '++', OpType.AORU)
              this.opsPos.push(muOp)
            }
            break
          }
          case '-': {
            if (lastToken === '-') {
              let muOp = new OpUnit(i, j, '--', OpType.AORU)
              this.opsPos.push(muOp)
            }
            break
          }
        }
      }
    }
  }
}

exports.createJavaParser = function (data, config) {
  return new JavaParser(data, config)
}
