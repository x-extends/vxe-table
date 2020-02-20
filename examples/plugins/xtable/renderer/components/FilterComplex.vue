<template>
  <div>
    <div class="cmplex-filter">
      <div class="f-type">
        <vxe-radio v-model="option.data.type" name="fType" label="has">包含</vxe-radio>
        <vxe-radio v-model="option.data.type" name="fType" label="eq">等于</vxe-radio>
        <vxe-radio v-model="option.data.type" name="fType" label="gt">大于</vxe-radio>
        <vxe-radio v-model="option.data.type" name="fType" label="lt">小于</vxe-radio>
      </div>
      <div class="f-name">
        <vxe-input v-model="option.data.name" type="text" placeholder="请输入名称" @input="changeOptionEvent()"></vxe-input>
      </div>
      <div class="f-iscase">
        <vxe-checkbox v-model="option.data.isCase">不区分大小写</vxe-checkbox>
      </div>
      <div class="f-footer">
        <vxe-button status="primary" @click="confirmEvent">确认</vxe-button>
        <vxe-button @click="resetEvent">重置</vxe-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComplex',
  props: {
    params: Object
  },
  data () {
    return {
      column: null,
      option: null
    }
  },
  created () {
    // filters 可以配置多个，实际只用一个就可以满足需求了
    const { column } = this.params
    const option = column.filters[0]
    this.column = column
    this.option = option
  },
  methods: {
    changeOptionEvent () {
      const { params, option } = this
      const { $panel } = params
      const checked = !!option.data.name
      $panel.changeOption(null, checked, option)
    },
    confirmEvent () {
      const { $panel } = this.params
      $panel.confirmFilter()
    },
    resetEvent () {
      const { $panel } = this.params
      $panel.resetFilter()
    }
  }
}
</script>

<style scoped>
.cmplex-filter {
  width: 260px;
  padding: 0 8px;
}
.cmplex-filter .f-type {
  padding: 8px 0;
}
.cmplex-filter .f-iscase {
  padding: 12px 0;
}
.cmplex-filter .f-footer {
  text-align: center;
}
</style>
