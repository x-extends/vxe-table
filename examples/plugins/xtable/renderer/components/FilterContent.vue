<template>
  <div class="my-filter-content">
    <div class="my-fc-search">
      <div class="my-fc-search-top">
        <vxe-input v-model="option.data.sVal" placeholder="搜索" suffix-icon="fa fa-search" @keyup="searchEvent"></vxe-input>
      </div>
      <div class="my-fc-search-content">
        <template v-if="valList.length">
          <ul class="my-fc-search-list my-fc-search-list-head">
            <li class="my-fc-search-item">
              <vxe-checkbox v-model="isAll" @change="changeAllEvent">全选</vxe-checkbox>
            </li>
          </ul>
          <ul class="my-fc-search-list my-fc-search-list-body">
            <li class="my-fc-search-item" v-for="(item, sIndex) in valList" :key="sIndex">
              <vxe-checkbox v-model="item.checked" @change="changeItemEvent">{{ item.value }}</vxe-checkbox>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="my-fc-search-empty">无匹配项</div>
        </template>
      </div>
    </div>
    <div class="my-fc-footer">
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
      size: 'mini',
      isAll: false,
      option: null,
      colValList: [],
      valList: []
    }
  },
  watch: {
    params () {
      this.load()
    },
    colValList () {
      this.searchEvent()
    }
  },
  created () {
    this.load()
    this.searchEvent()
  },
  methods: {
    load () {
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
    },
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
    },
    updateCheckStatus () {
      const { valList } = this
      const isAll = valList.every(item => item.checked)
      this.isAll = isAll
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
.my-filter-content {
  padding: 10px;
  user-select: none;
}
.my-filter-content .my-fc-search .my-fc-search-top {
  position: relative;
  padding: 5px 0;
}
.my-filter-content .my-fc-search .my-fc-search-top > input {
  border: 1px solid #ABABAB;
  padding: 0 20px 0 2px;
  width: 200px;
  height: 22px;
  line-height: 22px;
}
.my-filter-content .my-fc-search .my-fc-search-content {
  border: 1px solid #E2E4E7;
  padding: 2px 10px;
}
.my-filter-content .my-fc-search-empty {
  text-align: center;
  padding: 20px 0;
}
.my-filter-content .my-fc-search-list {
  margin: 0;
}
.my-filter-content .my-fc-search-list-body {
  overflow: auto;
  height: 120px;
}
.my-filter-content .my-fc-search-list .my-fc-search-item {
  padding: 2px 0;
  display: block;
}
.my-filter-content .my-fc-footer {
  text-align: right;
  padding-top: 10px;
}
.my-filter-content .my-fc-footer button {
  padding: 0 15px;
  margin-left: 15px;
}
</style>
