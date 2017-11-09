<template>
  <div class="layout">
    <Upload
        type="drag"
        action="#"
        :before-upload='parseFile'>
        <div style="padding: 20px 0">
            <Icon type="document-text" size="52"></Icon>
            <p>Click or drag java files here to upload</p>
        </div>
    </Upload>
    <CheckboxGroup v-model="mutationOpsSetting">
      <Checkbox v-for="op in mutationOps" v-bind:key="op" :label="op"></Checkbox>
    </CheckboxGroup>
  </div>
</template>

<script>
import Ops from '../assets/Operator'
import fs from 'fs'

import Mutator from '../core/Mutator'

export default {
  name: 'mainPage',
  data () {
    return {
      mutationOps: Ops.minimumOps,
      mutationOpsSetting: [],
      javaCode: ''
    }
  },
  methods: {
    parseFile: function (file) {
      let _this = this
      fs.readFile(file.path, 'utf-8', (err, data) => {
        if (err) {
          console.log('error occured when opening file ', file.path)
        } else {
          _this.javaCode = data.split('\n')
          _this.genMutation()
        }
      })
    },
    genMutation: function () {
      let mutator = Mutator.createMutator(this.javaCode, this.mutationOpsSetting)
      mutator.genMutation()
    }
  }
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}
</style>
