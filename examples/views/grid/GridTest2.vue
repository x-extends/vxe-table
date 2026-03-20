<template>
  <div>

      <div style="margin-bottom:10px;display:flex;gap:10px;">
          <vxe-input v-model="searchText" placeholder="输入关键字并回车查询" @keyup.enter="toSearch" style="width:300px;"/>
          <vxe-button type="primary" @click="toSearch">查询</vxe-button>
      </div>
      <vxe-grid :data="tableData"
              v-bind="gridOptions"
              ref="tableRef">

      </vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchText: '',
      lastSearchText: '',
      searchResults: [],
      currentSearchIndex: -1,
      tableData: [],
      gridOptions: {
        border: true,
        round: true,
        showOverflow: 'tooltip',
        maxHeight: 500, // 初始值，后续动态计算
        minHeight: 250,
        align: 'center',
        columnConfig: {
          resizable: true
        },
        virtualXConfig: {
          enabled: true,
          oSize: 0
        },
        virtualYConfig: {
          enabled: true,
          oSize: 0
        },
        rowConfig: {
          drag: true,
          isCurrent: true,
          isHover: true
        },
        toolbarConfig: {
          refresh: false,
          zoom: true,
          custom: false
        },
        columns: [
          { field: 'fieldName', minWidth: '110px', title: '参数名称', showOverflow: 'tooltip' },
          {
            field: 'enums',
            minWidth: '110px',
            title: '参数值',
            showOverflow: false,
            align: 'center'
          }
        ]
      }
    }
  },
  methods: {
    // 搜索并跳转到最近的一条数据的位置
    async toSearch () {
      const text = this.searchText.trim()
      console.log('搜索参数为：', text)
      const scrollTop = 0
      if (!text) {
        this.searchResults = []
        this.currentSearchIndex = -1
        this.lastSearchText = ''
        return
      }

      if (text !== this.lastSearchText || this.searchResults.length === 0) {
        this.searchResults = this.tableData.filter(row => {
          const fieldName = row.fieldName || ''
          return fieldName.toLowerCase().includes(text.toLowerCase())
        })
        this.currentSearchIndex = 0
        this.lastSearchText = text

        if (this.searchResults.length === 0) {
          console.log('未找到匹配项')
          return
        }
      } else {
        this.currentSearchIndex = (this.currentSearchIndex + 1) % this.searchResults.length
      }

      const row = this.searchResults[this.currentSearchIndex]
      console.log('匹配到结果：', row)
      if (this.$refs.tableRef && row) {
        await this.scrollRowEvent(row)
      }
    },
    // 滚动到指定行
    async scrollRowEvent (row) {
      const $grid = this.$refs.tableRef
      if ($grid) {
        console.log($grid)
        await $grid.scrollToRow(row)
      }
    }
  },
  created () {
    const list2 = []
    for (let index = 0; index < 30000; index++) {
      let str = ''
      for (let i = 0; i < Math.floor(Math.random() * 10000); i++) {
        str += i
      }
      list2.push({
        id: index,
        fieldName: 'field' + index,
        enums: str
      })
    }
    this.tableData = list2
  }
}
</script>
