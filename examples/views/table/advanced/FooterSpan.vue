<template>
  <div>
    <p class="tip">
      表尾合并列，通过自定义 <table-api-link prop="footer-span-method"/> 合并方法<br>
      <span class="red">（注：<table-api-link prop="footer-method"/> ，不能用于固定列，表尾的数据都是自行生成的，该示例仅供参考）</span>
    </p>

    <vxe-table
      border
      show-footer
      height="400"
      :span-method="colspanMethod"
      :footer-span-method="footerColspanMethod"
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" footer-align="center"></vxe-table-column>
      <vxe-table-column field="age" title="Age" footer-align="center"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">合并行</p>

    <vxe-table
      border
      show-footer
      height="400"
      :span-method="rowspanMethod"
      :footer-span-method="footerRowspanMethod"
      :footer-method="footerMethod"
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
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          show-footer
          height="400"
          :span-method="colspanMethod"
          :footer-span-method="footerColspanMethod"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" footer-align="center"></vxe-table-column>
          <vxe-table-column field="age" title="Age" footer-align="center"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '平均'
                  }
                  // 合并为一列显示
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.mean(data, 'age')
                  }
                  return null
                }),
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '和值'
                  }
                  // 合并为一列显示
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.sum(data, 'age')
                  }
                  return null
                })
              ]
              return footerData
            },
            colspanMethod ({ _rowIndex, _columnIndex }) {
              if (_rowIndex % 2 === 0) {
                if (_columnIndex === 2) {
                  return {
                    rowspan: 1,
                    colspan: 2
                  }
                } else if (_columnIndex === 3) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            },
            footerColspanMethod ({ _columnIndex }) {
              if (_columnIndex === 3) {
                return {
                  rowspan: 1,
                  colspan: 2
                }
              } else if (_columnIndex === 4) {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-footer
          height="400"
          :span-method="rowspanMethod"
          :footer-span-method="footerRowspanMethod"
          :footer-method="footerMethod"
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '平均'
                  }
                  if (['content'].includes(column.property)) {
                    return '合并为一行显示'
                  }
                  return null
                }),
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '和值'
                  }
                  if (['content'].includes(column.property)) {
                    return '合并为一行显示'
                  }
                  return null
                })
              ]
              return footerData
            },
            // 通用行合并函数（将相同多列数据合并为一行）
            rowspanMethod ({ row, _rowIndex, column, visibleData }) {
              let fields = ['key']
              let cellValue = row[column.property]
              if (cellValue && fields.includes(column.property)) {
                let prevRow = visibleData[_rowIndex - 1]
                let nextRow = visibleData[_rowIndex + 1]
                if (prevRow && prevRow[column.property] === cellValue) {
                  return { rowspan: 0, colspan: 0 }
                } else {
                  let countRowspan = 1
                  while (nextRow && nextRow[column.property] === cellValue) {
                    nextRow = visibleData[++countRowspan + _rowIndex]
                  }
                  if (countRowspan > 1) {
                    return { rowspan: countRowspan, colspan: 1 }
                  }
                }
              }
            },
            footerRowspanMethod ({ _rowIndex, _columnIndex }) {
              if (_rowIndex === 0) {
                if (_columnIndex === 2) {
                  return { rowspan: 2, colspan: 1 }
                }
              } else if (_rowIndex === 1) {
                if (_columnIndex === 2) {
                  return { rowspan: 0, colspan: 0 }
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
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    footerMethod ({ columns, data }) {
      const footerData = [
        columns.map((column, _columnIndex) => {
          if (_columnIndex === 0) {
            return '平均'
          }
          // 合并为一列显示
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, 'age')
          }
          if (['content'].includes(column.property)) {
            return '合并为一行显示'
          }
          return null
        }),
        columns.map((column, _columnIndex) => {
          if (_columnIndex === 0) {
            return '和值'
          }
          // 合并为一列显示
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, 'age')
          }
          if (['content'].includes(column.property)) {
            return '合并为一行显示'
          }
          return null
        })
      ]
      return footerData
    },
    colspanMethod ({ _rowIndex, _columnIndex }) {
      if (_rowIndex % 2 === 0) {
        if (_columnIndex === 2) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if (_columnIndex === 3) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    footerColspanMethod ({ _columnIndex }) {
      if (_columnIndex === 3) {
        return {
          rowspan: 1,
          colspan: 2
        }
      } else if (_columnIndex === 4) {
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    rowspanMethod ({ row, _rowIndex, column, visibleData }) {
      const fields = ['key']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    footerRowspanMethod ({ _rowIndex, _columnIndex }) {
      if (_rowIndex === 0) {
        if (_columnIndex === 2) {
          return { rowspan: 2, colspan: 1 }
        }
      } else if (_rowIndex === 1) {
        if (_columnIndex === 2) {
          return { rowspan: 0, colspan: 0 }
        }
      }
    }
  }
}
</script>
