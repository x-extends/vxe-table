<template>
  <div>
    <p class="tip">
      合并列，通过自定义 <table-api-link prop="span-method"/> 合并方法<br>
      <span class="red">（注：<table-api-link prop="span-method"/> ，不能用于固定列，合并的逻辑都是自行实现的，该示例仅供参考）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="allAlign = 'left'">居左</vxe-button>
        <vxe-button @click="allAlign = 'center'">居中</vxe-button>
        <vxe-button @click="allAlign = 'right'">居右</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      height="300"
      :align="allAlign"
      :scroll-y="{gt: -1}"
      :span-method="colspanMethod"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">通用合并行</p>

    <vxe-table
      border
      resizable
      height="300"
      :scroll-y="{gt: -1}"
      :span-method="mergeRowMethod"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="key" title="Key"></vxe-table-column>
      <vxe-table-column field="content" title="Translate"></vxe-table-column>
      <vxe-table-column field="language" title="Language" :filters="[{label: '中文', value: 'zh_CN'}, {label: 'English', value: 'en_US'}]"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      allAlign: null,
      tableData: [],
      mergeCells: [
        { row: 1, col: 1, rowspan: 3, colspan: 3 },
        { row: 6, col: 0, rowspan: 2, colspan: 2 }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="allAlign = 'left'">居左</vxe-button>
            <vxe-button @click="allAlign = 'center'">居中</vxe-button>
            <vxe-button @click="allAlign = 'right'">居右</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          height="300"
          :align="allAlign"
          :scroll-y="{gt: -1}"
          :span-method="colspanMethod"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              allAlign: null,
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
          },
          methods: {
            colspanMethod ({ rowIndex, _columnIndex }) {
              if (rowIndex % 2 === 0) {
                if (_columnIndex === 2) {
                  return { rowspan: 1, colspan: 2 }
                } else if (_columnIndex === 3) {
                  return { rowspan: 0, colspan: 0 }
                }
              }
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          height="300"
          :scroll-y="{gt: -1}"
          :span-method="mergeRowMethod"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="key" title="Key"></vxe-table-column>
          <vxe-table-column field="content" title="Translate"></vxe-table-column>
          <vxe-table-column field="language" title="Language" :filters="[{label: '中文', value: 'zh_CN'}, {label: 'English', value: 'en_US'}]"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
          },
          methods: {
            // 通用行合并函数（将相同多列数据合并为一行）
            mergeRowMethod ({ row, _rowIndex, column, visibleData }) {
              const fields = ['key']
              const cellValue = XEUtils.get(row, column.property)
              if (cellValue && fields.includes(column.property)) {
                const prevRow = visibleData[_rowIndex - 1]
                let nextRow = visibleData[_rowIndex + 1]
                if (prevRow && XEUtils.get(prevRow, column.property) === cellValue) {
                  return { rowspan: 0, colspan: 0 }
                } else {
                  let countRowspan = 1
                  while (nextRow && XEUtils.get(nextRow, column.property) === cellValue) {
                    nextRow = visibleData[++countRowspan + _rowIndex]
                  }
                  if (countRowspan > 1) {
                    return { rowspan: countRowspan, colspan: 1 }
                  }
                }
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    colspanMethod ({ rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 2) {
          return { rowspan: 1, colspan: 2 }
        } else if (columnIndex === 3) {
          return { rowspan: 0, colspan: 0 }
        }
      }
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    mergeRowMethod ({ row, _rowIndex, column, visibleData }) {
      const fields = ['key']
      const cellValue = XEUtils.get(row, column.property)
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && XEUtils.get(prevRow, column.property) === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && XEUtils.get(nextRow, column.property) === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    }
  }
}
</script>
