<template>
  <div class="my-filter-input">
    <vxe-input type="text" v-model="option.data" placeholder="支持回车筛选" @keyup="keyupEvent" @input="changeOptionEvent"></vxe-input>
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
  created () {
    this.load()
  },
  methods: {
    load () {
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
    keyupEvent ({ $event }) {
      const { params } = this
      const { $panel } = params
      if ($event.keyCode === 13) {
        $panel.confirmFilter()
      }
    }
  }
}
</script>

<style scoped>
.my-filter-input {
  padding: 10px;
}
</style>
