<template>
  <div>
    <input type="text" v-model="option.data" @input="changeOptionEvent">
  </div>
</template>

<script>
export default {
  name: 'FilterInput',
  props: {
    params: Object,
    context: Object
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
      const { option } = this
      const checked = !!option.data
      this.context.changeOption(null, checked, option)
    }
  }
}
</script>
