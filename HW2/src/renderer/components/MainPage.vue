<template>
  <div class="layout">
    <Upload
        type="drag"
        action="#"
        :format='javaExt'
        :before-upload='parseFile'>
        <div style="padding: 20px 0">
            <Icon type="document-text" size="52"></Icon>
            <p>点击打开或拖动java文件至此</p>
        </div>
    </Upload>
    <p>{{ mutationSetting.filename }}</p>
    <transition name="fade">
      <div>
        <div class="table-header">
          <h2>可变异操作符个数统计</h2>
        </div>
        <Table highlight-row ref="currentRowTable" :columns="columnsHead" :data="tableData" @on-current-change="tableChange"></Table>
        <Button @click="handleClearCurrentRow" class="table-button">清除选择</Button>
      </div>
        <!-- <div v-if="hasUpdated" class="count">
          <div class="count-header">
            <p>变异操作符个数</p>
          </div>
          <Row class="count-row">
            <Col :span="8">
              {{ mutationOps[0] }}: {{ opCount[0] }}
            </Col>
            <Col :span="8">
              {{ mutationOps[1] }}: {{ opCount[1] }}
            </Col>
            <Col :span="8">
              {{ mutationOps[2] }}: {{ opCount[2] }}
            </Col>
          </Row>
          <Row class="count-row">
            <Col :span="12">
              {{ mutationOps[3] }}: {{ opCount[3] }}
            </Col>
            <Col :span="12">
              {{ mutationOps[4] }}: {{ opCount[4] }}
            </Col>
          </Row>
        </div> -->
    </transition>
    <Form ref="form" :model="mutationSetting" :rules="rule" :label-width="80">
      <FormItem label="变异操作符" prop="OpsSetting">
        <CheckboxGroup v-model="mutationSetting.OpsSetting" @on-change="opsChange">
          <Checkbox v-for="op in mutationOps" v-bind:key="op" :label="op"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="变异体个数" prop="mutationNum">
        <Input v-model="mutationSetting.mutationNum" placeholder="生成变异体个数"></Input>
      </FormItem>
      <div class="button">
        <Button type="primary" @click="genMutation('form')">开始生成</Button>
      </div>
    </Form>
  </div>
</template>

<script>
import Ops from '../assets/Operator'
import fs from 'fs'

import Mutator from '../core/Mutator'

export default {
  name: 'mainPage',
  data () {
    const validateNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入变异体个数'))
      } else {
        if (value > this.maxMutationNum) {
          callback(new Error('变异体个数过多'))
        }
        callback()
      }
    }
    return {
      mutationOps: Ops.minimumOps,
      mutationSetting: {
        OpsSetting: [],
        filename: '',
        mutationNum: 0
      },
      rule: {
        mutationNum: [
          { validator: validateNum, trigger: 'blur' }
        ]
      },
      javaCode: '',
      javaExt: ['java'],
      opCount: [],
      mutationGenCount: 0,
      columnsHead: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        }, {
          title: '函数名',
          key: 'name'
        }, {
          title: 'AORB',
          key: 'AORB'
        }, {
          title: 'AORS',
          key: 'AORS'
        }, {
          title: 'AORU',
          key: 'AORU'
        }, {
          title: 'ROR',
          key: 'ROR'
        }, {
          title: 'LCR',
          key: 'LCR'
        }
      ],
      tableData: [],
      currentRow: {}
    }
  },
  methods: {
    parseFile: function (file) {
      let _this = this
      fs.readFile(file.path, 'utf-8', (err, data) => {
        if (err) {
          console.log('error occured when opening file ', file.path)
        } else {
          _this.mutationSetting.filename = file.name
          _this.javaCode = data.split('\n')
          _this.parseCode()
        }
      })
    },
    parseCode: function () {
      console.log(this.mutationSetting)
      let mutator = Mutator.createMutator(this.javaCode, this.mutationSetting)
      this.mutator = mutator
      this.mutator.parse()
      this.tableData = this.mutator.getFuncOpCount()
      this.opCount = this.mutator.getOpCount()
    },
    genMutation: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.currentRow !== {} && this.currentRow.name === '总计') {
            this.mutator.genMutation()
          } else {
            let funcName = this.currentRow.name
            for (let i = 0; i < parseInt(this.mutationSetting.mutationNum); i++) {
              let opUnit = this.mutator.selectOpFromFunc(funcName, this.mutationSetting)
              this.mutator.genMutationFunc(funcName, i, opUnit)
            }
          }
          this.$Message.success('生成完成!')
        } else {
          this.$Message.error('变异体个数过多!')
        }
      })
    },
    opsChange: function (id) {
      this.$refs['form'].validate((valid) => {
      })
    },
    handleClearCurrentRow: function () {
      this.$refs.currentRowTable.clearCurrentRow()
    },
    tableChange: function (currentRow, oldCurrentRow) {
      this.currentRow = currentRow
    }
  },
  computed: {
    maxMutationNum: function () {
      if (this.currentRow === {} || (this.currentRow !== {} && this.currentRow.name === '总计')) {
        return this.mutator.getMaxMutationNum(this.mutationSetting.OpsSetting)
      } else {
        let maxMutatNum = 0
        for (let op of this.mutationSetting.OpsSetting) {
          maxMutatNum += this.currentRow[op]
        }
        return maxMutatNum
      }
    },
    hasUpdated: function () {
      return this.javaCode !== ''
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

.button {
  text-align: center;
  padding: 10px 10px 20px 10px;
}

.count {
  text-align: center;
  padding: 20px 0px 20px 0px;
}

.count-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.count-row {
  padding-top: 20px;
}

.table-header {
  border-bottom: 1px solid #eee;
  text-align: center;
  padding: 10px 0 4px 0;
  margin: 10px 0 10px 0;
}

.table-button {
  margin: 10px 0 20px 0;
}
</style>
