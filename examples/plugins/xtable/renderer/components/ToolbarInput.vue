<template>
  <form v-if="params" @submit.prevent="searchEvent">
    <vxe-input v-model="params.name" placeholder="请输入名称"></vxe-input>
    <vxe-button @click="searchEvent">搜索</vxe-button>
  </form>
</template>

<script>
export default {
  name: 'ToolbarInput',
  props: {
    params: Object,
    context: Object
  },
  methods: {
    searchEvent () {
      const { $grid } = this.context
      $grid.commitProxy('reload')
    }
  }
}
</script>
