<template>
  <form v-if="params" @submit.prevent="searchEvent">
    <vxe-input v-model="params.name" placeholder="请输入名称" clearable></vxe-input>
    <vxe-input v-model="params.age" type="number" placeholder="请输入年龄" clearable></vxe-input>
    <select class="vxe-select" v-model="params.sex">
      <option v-for="(item, index) in sexList" :key="index" :value="item.value">{{ item.label }}</option>
    </select>
    <vxe-input v-model="params.role" placeholder="请输入角色" clearable></vxe-input>
    <vxe-button type="primary">搜索</vxe-button>
  </form>
</template>

<script>
export default {
  name: 'FormSimple',
  props: {
    params: Object,
    context: Object
  },
  data () {
    return {
      sexList: [
        { label: '', value: '' },
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ]
    }
  },
  methods: {
    searchEvent () {
      const { $grid } = this.context
      $grid.commitProxy('reload')
    }
  }
}
</script>
