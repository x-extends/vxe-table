<template>
  <div class="my-filter-input">
    <input type="text" v-model="option.data" placeholder="支持回车筛选" @keyup.enter="enterEvent" @input="changeOptionEvent">
  </div>
</template>

<script>
export default {
  name: 'FilterInput',
  props: {
    params: Object
  },
  data () {
    return {
      column: null,
      option: null
    }
  },
  watch: {
    params () {
      this.load()
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      // filters 可以配置多个，实际只用一个就可以满足需求了
      const { column } = this.params
      const option = column.filters[0]
      this.column = column
      this.option = option
    },
    changeOptionEvent () {
      const { params, option } = this
      const { $panel } = params
      const checked = !!option.data
      $panel.changeOption(null, checked, option)
    },
    enterEvent () {
      const { params } = this
      const { $panel } = params
      $panel.confirmFilter()
    }
  }
}
</script>

<style scoped>
.my-filter-input {
  padding: 10px;
}
</style>
