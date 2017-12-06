/*
 * JavaParser
 * data: java code split by line
 * config: mutation configuration
 */
import OpType from '../assets/Operator'
import JavaKeyword from '../assets/JavaType'

function OpUnit (line, pos, op, opType, funcCount) {
  this.line = line
  this.pos = pos
  this.op = op
  this.opType = opType
  this.funcCount = funcCount
}

function JavaParser (data, config) {
  this.data = data
  this.config = config
  this.opsPos = []
  this.opsStat = [0, 0, 0, 0, 0]
  this.funcArray = []
  this.funcOpMap = []

  this.parseOps = function () {
    let inStarComment = false

    let functionName = ''
    let functionCount = -1
    let keyWords = ['public', 'private'].concat(JavaKeyword.TYPE)
    for (let i = 0; i < this.data.length; i++) {
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
      // let lastToken = ''
      line = line.replace(/\/\/.*/g, '')
      line = line.replace(/".*"/g, '')
      line = line.replace(/'.*'/g, '')
      // identify function
      for (let word of keyWords) {
        if (line.match(word) && line.match(/\(/) && line.indexOf('=') < 0 && line.indexOf('return') < 0) {
          functionCount++
          let index = line.search(/\(/) - 1
          while (index > 0 && line[index] === ' ') {
            index--
          }
          let functionNameTail = index + 1
          while (index > 0 && line[index] !== ' ') {
            index--
          }
          let functionNameHead = index
          functionName = line.substring(functionNameHead, functionNameTail)
          this.funcArray.push(functionName)
          console.log(i, functionCount, functionName)
          break
        }
      }
      let inString = false
      for (let j = 0; j < line.length; j++) {
        let token = line[j]
        if (token === '\'' || token === '"') {
          inString = !inString
          continue
        }
        switch (token) {
          case '+':
            if (line[j + 1] === '+') {
              let muOp = new OpUnit(i, j, '++', OpType.AORU, functionCount)
              this.opsPos.push(muOp)
              j++
            } else if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '+=', OpType.AORS, functionCount)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '+', OpType.AORB, functionCount)
              this.opsPos.push(muOp)
            }
            break
          case '-':
            if (line[j + 1] === '-') {
              let muOp = new OpUnit(i, j, '--', OpType.AORU, functionCount)
              this.opsPos.push(muOp)
              j++
            } else if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '-=', OpType.AORS, functionCount)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '-', OpType.AORB, functionCount)
              this.opsPos.push(muOp)
            }
            break
          case '*':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '*=', OpType.AORS, functionCount)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '*', OpType.AORB, functionCount)
              this.opsPos.push(muOp)
            }
            break
          case '/':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '/=', OpType.AORS, functionCount)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '/', OpType.AORB, functionCount)
              this.opsPos.push(muOp)
            }
            break
          case '%':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '%=', OpType.AORS, functionCount)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '%', OpType.AORB, functionCount)
              this.opsPos.push(muOp)
            }
            break
          case '|':
            if (line[j + 1] === '|') {
              let muOp = new OpUnit(i, j, '||', OpType.LCR, functionCount)
              this.opsPos.push(muOp)
              j++
            }
            break
          case '&':
            if (line[j + 1] === '&') {
              let muOp = new OpUnit(i, j, '&&', OpType.LCR, functionCount)
              this.opsPos.push(muOp)
              j++
            }
            break
          case '<':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '<=', OpType.ROR, functionCount)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '<', OpType.ROR, functionCount)
              this.opsPos.push(muOp)
            }
            break
          case '>':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '>=', OpType.ROR, functionCount)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '>', OpType.ROR, functionCount)
              this.opsPos.push(muOp)
            }
            break
          case '=':
            if (line[j + 1] === '=') {
              if (line[j + 2] === '=') {
                let muOp = new OpUnit(i, j, '===', OpType.ROR, functionCount)
                this.opsPos.push(muOp)
                j += 2
              } else {
                let muOp = new OpUnit(i, j, '==', OpType.ROR, functionCount)
                this.opsPos.push(muOp)
                j++
              }
            }
            break
          case '!':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '!=', OpType.ROR, functionCount)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '!', OpType.AORU, functionCount)
              this.opsPos.push(muOp)
            }
            break
          default:
            break
        }
      }
    }

    let funcCount = 0
    let index = 0
    console.log(this.opsPos)
    for (let op of this.opsPos) {
      this.opsStat[op.opType]++
      if (op.funcCount === funcCount) {
        this.funcOpMap.push(index)
        funcCount++
      }
      index++
    }
    this.funcOpMap.push(this.opsPos.length - 1)
    console.log(this.funcOpMap)
  }
}

exports.createJavaParser = function (data, config) {
  return new JavaParser(data, config)
}
