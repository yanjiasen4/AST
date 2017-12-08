<template>
  <div class="left-top">
    <ul>
      <li v-for="(tag, index) in tags" :key="tag" :class="[activeTab == index ? activeClass : '', baseTag]" @click="tabRoute(index)">
        <span>{{ tag }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: [ 'activeTab' ],
  data () {
    return {
      baseTag: 'tag-item',
      activeClass: 'active',
      tags: ['变异体生成', '测试程序生成']
    }
  },
  methods: {
    tabRoute: function (index) {
      console.log(index)
      if (index === 0) {
        this.$router.push('/')
      } else {
        this.$router.push({ path: 'gen' })
      }
    }
  }
}
</script>

<style scoped>
.left-top {
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
}

.tag-item {
  height: 42px;
  line-height: 42px;
  padding: 0 16px;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  border-bottom: 1px solid #aaa;
  border-right: 1px solid #aaa;
  transition: border-color .3s, background-color .3s, color .3s;
}

active {
  color: #409eff;
}

.tag-item:hover {
  outline: 0;
  background-color: #ecf6ff;
}
</style>
