<template>
  <vxe-form :data="formData" @submit="searchEvent">
    <vxe-form-item field="name" title="名称">
      <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
    </vxe-form-item>
    <vxe-form-item>
      <vxe-button type="submit" status="primary">搜索</vxe-button>
    </vxe-form-item>
  </vxe-form>
</template>

<script>
export default {
  name: 'ToolbarInput',
  props: {
    formData: Object,
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
