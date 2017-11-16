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
  this.opsStat = [0, 0, 0, 0, 0, 0]

  this.parseOps = function () {
    let inStarComment = false
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
              let muOp = new OpUnit(i, j, '++', OpType.AORU)
              this.opsPos.push(muOp)
              j++
            } else if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '+=', OpType.AORS)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '+', OpType.AORB)
              this.opsPos.push(muOp)
            }
            break
          case '-':
            if (line[j + 1] === '-') {
              let muOp = new OpUnit(i, j, '--', OpType.AORU)
              this.opsPos.push(muOp)
              j++
            } else if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '-=', OpType.AORS)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '-', OpType.AORB)
              this.opsPos.push(muOp)
            }
            break
          case '*':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '*=', OpType.AORS)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '*', OpType.AORB)
              this.opsPos.push(muOp)
            }
            break
          case '/':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '/=', OpType.AORS)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '/', OpType.AORB)
              this.opsPos.push(muOp)
            }
            break
          case '%':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '%=', OpType.AORS)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '%', OpType.AORB)
              this.opsPos.push(muOp)
            }
            break
          case '|':
            if (line[j + 1] === '|') {
              let muOp = new OpUnit(i, j, '||', OpType.LCR)
              this.opsPos.push(muOp)
              j++
            }
            break
          case '&':
            if (line[j + 1] === '&') {
              let muOp = new OpUnit(i, j, '&&', OpType.LCR)
              this.opsPos.push(muOp)
              j++
            }
            break
          case '<':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '<=', OpType.ROR)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '<', OpType.ROR)
              this.opsPos.push(muOp)
            }
            break
          case '>':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '>=', OpType.ROR)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '>', OpType.ROR)
              this.opsPos.push(muOp)
            }
            break
          case '=':
            if (line[j + 1] === '=') {
              if (line[j + 2] === '=') {
                let muOp = new OpUnit(i, j, '===', OpType.ROR)
                this.opsPos.push(muOp)
                j += 2
              } else {
                let muOp = new OpUnit(i, j, '==', OpType.ROR)
                this.opsPos.push(muOp)
                j++
              }
            }
            break
          case '!':
            if (line[j + 1] === '=') {
              let muOp = new OpUnit(i, j, '!=', OpType.ROR)
              this.opsPos.push(muOp)
              j++
            } else {
              let muOp = new OpUnit(i, j, '!', OpType.AORU)
              this.opsPos.push(muOp)
            }
            break
          default:
            break
        }
      }
    }

    for (let op of this.opsPos) {
      this.opsStat[op.opType]++
    }
    // console.log(this.opsPos)
  }
}

exports.createJavaParser = function (data, config) {
  return new JavaParser(data, config)
}
