<template>
  <div class="mycontent-filter">
    <div class="mc-search">
      <div class="header">
        <vxe-input v-model="option.data.sVal" placeholder="搜索" suffix-icon="fa fa-search" @keyup="searchEvent"></vxe-input>
      </div>
      <div class="body">
        <template v-if="valList.length">
          <ul class="mc-val-list mc-val-head">
            <li class="mc-val-item">
              <vxe-checkbox v-model="isAll" :indeterminate="isIndeterminate" @change="changeAllEvent">全选</vxe-checkbox>
            </li>
          </ul>
          <ul class="mc-val-list mc-val-body">
            <li class="mc-val-item" v-for="(item, sIndex) in valList" :key="sIndex">
              <vxe-checkbox v-model="item.checked" @change="changeItemEvent">{{ item.value }}</vxe-checkbox>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="mc-search-empty">无匹配项</div>
        </template>
      </div>
    </div>
    <div class="mc-footer">
      <vxe-button status="primary" @click="confirmFilterEvent">确认</vxe-button>
      <vxe-button @click="resetFilterEvent">重置</vxe-button>
    </div>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  name: 'FilterContent',
  props: {
    params: Object
  },
  data () {
    return {
      size: 'mini', // 被所有子组件继承 size
      isAll: false,
      isIndeterminate: false,
      option: null,
      colValList: [],
      valList: []
    }
  },
  created () {
    // filters 可以配置多个，实际只用一个就可以满足需求了
    const { $table, column } = this.params
    const { fullData } = $table.getTableData()
    const option = column.filters[0]
    const { vals } = option.data
    const colValList = Object.keys(XEUtils.groupBy(fullData, column.property)).map(val => {
      return {
        checked: vals.includes(val),
        value: val
      }
    })
    this.option = option
    this.colValList = colValList
    this.valList = colValList
    this.searchEvent()
  },
  methods: {
    searchEvent () {
      const { option, colValList } = this
      this.valList = option.data.sVal ? colValList.filter(item => item.value.indexOf(option.data.sVal) > -1) : colValList
      this.updateCheckStatus()
    },
    changeAllEvent () {
      const { isAll } = this
      this.valList.forEach(item => {
        item.checked = isAll
      })
      this.isIndeterminate = false
    },
    updateCheckStatus () {
      const { valList } = this
      const isAll = valList.every(item => item.checked)
      this.isAll = isAll
      this.isIndeterminate = !isAll && valList.some(item => item.checked)
    },
    changeItemEvent () {
      this.updateCheckStatus()
    },
    confirmFilterEvent () {
      const { params, option, valList } = this
      const { data } = option
      const { $panel } = params
      data.vals = valList.filter(item => item.checked).map(item => item.value)
      option.checked = true
      $panel.confirmFilter()
    },
    resetFilterEvent () {
      const { $panel } = this.params
      $panel.resetFilter()
    }
  }
}
</script>

<style>
.mycontent-filter {
  user-select: none;
}
.mycontent-filter .mc-search .header {
  position: relative;
  padding: 5px 0;
}
.mycontent-filter .mc-search .header > input {
  border: 1px solid #ABABAB;
  padding: 0 20px 0 2px;
  width: 200px;
  height: 22px;
  line-height: 22px;
}
.mycontent-filter .mc-search .body {
  border: 1px solid #E2E4E7;
  padding: 2px 10px;
}
.mycontent-filter .mc-search-empty {
  text-align: center;
  padding: 20px 0;
}
.mycontent-filter .mc-val-list {
  margin: 0;
}
.mycontent-filter .mc-val-body {
  overflow: auto;
  height: 120px;
}
.mycontent-filter .mc-val-list .mc-val-item {
  padding: 2px 0;
  display: block;
}
.mycontent-filter .mc-footer {
  text-align: right;
  padding-top: 10px;
}
.mycontent-filter .mc-footer button {
  padding: 0 15px;
  margin-left: 15px;
}
</style>
