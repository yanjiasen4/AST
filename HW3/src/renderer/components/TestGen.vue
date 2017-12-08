<template>
  <div class="layout">
    <tab v-bind:activeTag="2"></tab>
    <Upload
          type="drag"
          action="#"
          :format='xlsxExt'
          :before-upload='parseXlsx'>
          <div style="padding: 20px 0">
              <Icon type="document-text" size="52"></Icon>
              <p>点击打开或拖动用例表文件至此</p>
          </div>
    </Upload>
    <transition name="fade">
      <div v-if="showStat">
        <div class="table-header">
          <h2>测试用例统计</h2>
        </div>
        <div class="case-table" v-for="(cls, index) in tablesData" :key="index">
          <span class="case-header">{{ cls.className }}</span>
          <Table ref="currentRowTable" :columns="columnsHead" :data="cls.classData"></Table>
        </div>
      </div>
    </transition>
    <div class="button">
      <Button type="primary" @click="genUsecase()">开始生成</Button>
    </div>
  </div>
</template>

<script>
import Tab from './Tab'

import XLSX from 'xlsx'
import fs from 'fs'

export default {
  name: 'TestGen',
  components: { Tab },
  data () {
    return {
      xlsxExt: ['xlsx'],
      xlsxFilename: '',
      testcase: {},
      columnsHead: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        }, {
          title: '函数名',
          key: 'name'
        }, {
          title: '用例个数',
          key: 'count'
        }
      ],
      showStat: false,
      tablesData: []
    }
  },
  methods: {
    parseXlsx: function (file) {
      this.clearData()
      const wb = XLSX.readFile(file.path)
      let sheetNames = wb.SheetNames

      for (let sheet of sheetNames) {
        let ws = wb.Sheets[sheet]
        let jsonResult = XLSX.utils.sheet_to_json(ws, {header: 1, raw: true})
        let n = 0
        let funcName = ''
        let classTestcase = {}
        while (n < jsonResult.length) {
          let line = jsonResult[n]
          // function begin
          if (line[0] === '函数名') {
            funcName = line[1]
            classTestcase[funcName] = []
          } else if (line[0] === '输入值') {
            for (let i = 2; i < line.length; i++) {
              classTestcase[funcName].push([line[i]])
            }
            n += 1
            line = jsonResult[n]
            while (line[0] !== '输出值') {
              for (let i = 2; i < line.length; i++) {
                classTestcase[funcName][i - 2].push(line[i])
              }
              n += 1
              line = jsonResult[n]
            }
            continue
          } else if (line[0] === '输出值') {
            for (let i = 2; i < line.length; i++) {
              classTestcase[funcName][i - 2].push(line[i])
            }
          }
          n++
        }
        // console.log(classTestcase)
        this.testcase[sheet] = classTestcase
      }
      this.genTablesData()
      this.showStat = true
    },
    genUsecase: function () {
      this.writeTest()
    },
    writeTest: function () {
      let importContent = 'import static org.junit.Assert.*;\nimport org.junit.Test;\n\n'
      for (let key in this.testcase) {
        let filename = key + 'Test.java'
        let mainContent = this.writeClassTest(key, this.testcase[key])
        fs.writeFileSync(filename, importContent + mainContent)
      }
      this.$Message.success('生成完成!')
    },
    writeClassTest: function (className, testcase) {
      let retContent = ''
      let classHeader = 'public class ' + className + 'Test {\n  ' + className + ' cls = new ' + className + '();\n\n'
      retContent += classHeader
      for (let key in testcase) {
        let testHeader = '  @Test\n  public void test' + this.titleUpper(key) + '() {\n'
        retContent += testHeader
        let cases = testcase[key]
        console.log(cases)
        for (let i = 0; i < cases.length; i++) {
          let parameters = ''
          for (let j = 0; j < cases[i].length - 1; j++) {
            parameters += this.typeConvert(cases[i][j])
            parameters += ','
          }
          parameters = parameters.substr(0, parameters.length - 1) + ')'
          let expectValue = cases[i][cases[i].length - 1]
          parameters += ',' + expectValue
          if (!isNaN(parseInt(expectValue))) parameters += ',0.0'
          retContent += '    assertEquals(cls.' + key + '(' + parameters + ');\n'
        }
        retContent += '  }\n'
      }
      retContent += '\n}'
      return retContent
    },
    genTablesData: function () {
      for (let key in this.testcase) {
        let data = {
          className: key,
          classData: []
        }
        for (let func in this.testcase[key]) {
          data.classData.push({
            name: func,
            count: this.testcase[key][func].length
          })
        }
        this.tablesData.push(data)
      }
    },
    typeConvert: function (c) {
      if (isNaN(parseFloat(c))) {
        if (c.length === 1) return '\'' + c + '\''
        else return '"' + c + '"'
      } else {
        return c
      }
    },
    titleUpper: function (str) {
      return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    },
    clearData: function () {
      this.testcase = {}
      this.tablesData = []
    }
  },
  computed: {
    hasLoaded: function () {
      return this.xlsxFilename === ''
    }
  }
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  padding: 10px 20% 10px 20%;
  min-height: 520px;
}

.table-header {
  border-bottom: 1px solid #eee;
  text-align: center;
  padding: 10px 0 4px 0;
  margin: 10px 0 10px 0;
}

.case-header {
  font-size: 12pt;
}

.button {
  text-align: center;
  padding: 10px 10px 20px 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

