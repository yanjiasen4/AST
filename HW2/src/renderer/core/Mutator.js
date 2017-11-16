/*
 * Mutator
 * code: java code split by line
 * config: mutation configuration
 */
import OpType from '../assets/Operator'
import JavaParser from './JavaParser'
import fs from 'fs'
import path from 'path'

function randint (min, max) {
  let r = Math.random(0, 1)
  r = Math.round(r * (max - min) + min)
  return r
}

function randomPick (a) {
  let length = a.length
  let index = randint(0, length - 1)
  let tmp = a[a.length - 1]
  a[a.length - 1] = a[index]
  a[index] = tmp
  console.log(a[a.length - 1])
  return a.pop()
}

function selectOps (op, opType) {
  let nop = op
  let opsIndex = OpType.OpIndex[opType]
  let ops = OpType[opsIndex]
  while (nop === op) {
    let index = randint(0, ops.length - 1)
    nop = ops[index]
  }
  return nop
}

function Mutator (code, config) {
  this.javaParser = JavaParser.createJavaParser(code, config)

  let opsSetting = []
  for (let op of config.OpsSetting) {
    opsSetting.push(OpType[op])
  }
  this.opsSetting = opsSetting

  this.filepath = path.resolve('mutation')
  this.count = 0

  this.parse = function () {
    this.javaParser.parseOps()
  }

  this.genMutation = function () {
    let opsPos = this.javaParser.opsPos
    let mutationNum = this.javaParser.config.mutationNum
    let opsSetting = []
    for (let op of config.OpsSetting) {
      opsSetting.push(OpType[op])
    }
    this.opsSetting = opsSetting
    for (let i = 0; i < mutationNum; i++) {
      let mutPos = randomPick(opsPos)
      while (this.opsSetting.indexOf(mutPos.opType) === -1) {
        mutPos = randomPick(opsPos)
      }
      let nop = selectOps(mutPos.op, mutPos.opType)
      let filename = this.filepath + '/MU_' + i.toString() + '_' + config.filename
      this.writeMutation(filename, mutPos.line, mutPos.pos, mutPos.op, nop)
      this.count++
    }
  }

  this.getCode = function () {
    return this.javaParser.data
  }

  this.getMaxMutationNum = function (ops) {
    let opsStat = this.javaParser.opsStat
    let opsSetting = []
    for (let op of ops) {
      opsSetting.push(OpType[op])
    }
    let maxMutationNum = 0
    console.log(opsSetting)
    for (let index of opsSetting) {
      console.log(opsStat[index])
      maxMutationNum += opsStat[index]
    }
    return maxMutationNum
  }

  this.getOpCount = function () {
    return this.javaParser.opsStat
  }

  this.writeMutation = function (filename, line, pos, op, nop) {
    let data = this.getCode()
    for (let i = 0; i < data.length; i++) {
      if (i === line) {
        let oldLine = '//'.concat(data[i]) + '\n'
        let newLine = data[i].substr(0, pos) + nop + data[i].substring(pos + op.length, data[i].length)
        let content = oldLine + newLine
        console.log(content)
        fs.appendFileSync(filename, content, 'utf-8')
      } else {
        fs.appendFileSync(filename, data[i], 'utf-8')
      }
    }
  }
}

exports.createMutator = function (code, config) {
  return new Mutator(code, config)
}
