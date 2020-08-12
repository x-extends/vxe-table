<template>
  <div class="edit-down-textarea">
    <vxe-pulldown class="edit-down-pulldown" ref="xDown" transfer>
      <template>
        <vxe-input class="edit-down-input" v-model="row[column.property]" @click="clickEvent" readonly></vxe-input>
      </template>
      <template v-slot:dropdown>
        <div class="edit-down-wrapper">
          <vxe-textarea class="edit-down-text" v-model="row[column.property]" resize="none"></vxe-textarea>
        </div>
      </template>
    </vxe-pulldown>
  </div>
</template>

<script>
export default {
  name: 'EditDownTextarea',
  props: {
    params: Object
  },
  data () {
    return {
      row: null,
      column: null
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
      const { row, column } = this.params
      this.row = row
      this.column = column
    },
    clickEvent () {
      this.$refs.xDown.showPanel()
    },
    suffixClick () {
      this.$refs.xDown.togglePanel()
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-down-pulldown {
  width: 100%;
}
.edit-down-wrapper {
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
}
.edit-down-text {
  width: 400px;
  height: 200px;
  display: block;
}
</style>
