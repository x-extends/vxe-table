<template>
  <div>
    <p class="tip">
      表尾合并行或列，通过 <table-api-link prop="merge-footer-items"/> 临时合并，或者自定义 <table-api-link prop="footer-span-method"/> 合并方法<br>
      <span class="red">（注：<table-api-link prop="footer-span-method"/> ，不能用于虚拟滚动、树形结构、展开行、固定列，合并的逻辑都是自行实现的，该示例仅供参考）</span>
    </p>

    <vxe-table
      border
      show-footer
      height="400"
      :merge-footer-items="demo1.mergeFooterItems"
      :footer-method="footerMethod"
      :data="demo1.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable></vxe-column>
      <vxe-column field="role" title="Role" sortable></vxe-column>
      <vxe-column field="rate" title="Rate" footer-align="center"></vxe-column>
      <vxe-column field="age" title="Age" footer-align="center"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">合并列</p>

    <vxe-table
      border
      show-footer
      height="400"
      :footer-span-method="footerColspanMethod"
      :footer-method="footerMethod"
      :data="demo2.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable></vxe-column>
      <vxe-column field="role" title="Role" sortable></vxe-column>
      <vxe-column field="rate" title="Rate" footer-align="center"></vxe-column>
      <vxe-column field="age" title="Age" footer-align="center"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">合并行</p>

    <vxe-table
      border
      show-footer
      height="400"
      :footer-span-method="footerRowspanMethod"
      :footer-method="footerMethod"
      :data="demo3.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable></vxe-column>
      <vxe-column field="role" title="Role" sortable></vxe-column>
      <vxe-column field="rate" title="Rate" footer-align="center"></vxe-column>
      <vxe-column field="age" title="Age" footer-align="center"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
      ],
      mergeFooterItems: [
        { row: 0, col: 1, rowspan: 1, colspan: 3 }
      ] as VxeTablePropTypes.MergeFooterItems
    })

    const demo2 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const footerColspanMethod: VxeTablePropTypes.FooterSpanMethod = ({ $rowIndex, _columnIndex }) => {
      if ($rowIndex === 0) {
        if (_columnIndex === 1) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if (_columnIndex === 2) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }

    const demo3 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const footerRowspanMethod: VxeTablePropTypes.FooterSpanMethod = ({ _rowIndex, _columnIndex }) => {
      if (_rowIndex === 0) {
        if (_columnIndex === 1) {
          return { rowspan: 2, colspan: 1 }
        }
      } else if (_rowIndex === 1) {
        if (_columnIndex === 1) {
          return { rowspan: 0, colspan: 0 }
        }
      }
    }

    const meanNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    }

    const sumNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    }

    const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
      const footerData = [
        columns.map((column, _columnIndex) => {
          if (_columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return meanNum(data, 'age')
          }
          if (['name'].includes(column.property)) {
            return '合并了'
          }
          if (['content'].includes(column.property)) {
            return '合并了'
          }
          return null
        }),
        columns.map((column, _columnIndex) => {
          if (_columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return sumNum(data, 'age')
          }
          return null
        })
      ]
      return footerData
    }

    return {
      demo1,
      demo2,
      footerColspanMethod,
      demo3,
      footerRowspanMethod,
      footerMethod,
      demoCodes: [
        `
        <vxe-table
          border
          show-footer
          height="400"
          :merge-footer-items="demo1.mergeFooterItems"
          :footer-method="footerMethod"
          :data="demo1.tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" sortable></vxe-column>
          <vxe-column field="role" title="Role" sortable></vxe-column>
          <vxe-column field="rate" title="Rate" footer-align="center"></vxe-column>
          <vxe-column field="age" title="Age" footer-align="center"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
              ],
              mergeFooterItems: [
                { row: 0, col: 1, rowspan: 1, colspan: 3 }
              ] as VxeTablePropTypes.MergeFooterItems
            })

            const meanNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            }

            const sumNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            }

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
              const footerData = [
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return meanNum(data, 'age')
                  }
                  if (['name'].includes(column.property)) {
                    return '合并了'
                  }
                  if (['content'].includes(column.property)) {
                    return '合并了'
                  }
                  return null
                }),
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return sumNum(data, 'age')
                  }
                  return null
                })
              ]
              return footerData
            }

            return {
              demo1,
              footerMethod
            }
          }
        })
        `,
        `
        <vxe-table
          border
          show-footer
          height="400"
          :footer-span-method="footerColspanMethod"
          :footer-method="footerMethod"
          :data="demo2.tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" sortable></vxe-column>
          <vxe-column field="role" title="Role" sortable></vxe-column>
          <vxe-column field="rate" title="Rate" footer-align="center"></vxe-column>
          <vxe-column field="age" title="Age" footer-align="center"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const footerColspanMethod: VxeTablePropTypes.FooterSpanMethod = ({ $rowIndex, _columnIndex }) => {
              if ($rowIndex === 0) {
                if (_columnIndex === 1) {
                  return {
                    rowspan: 1,
                    colspan: 2
                  }
                } else if (_columnIndex === 2) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }

            const meanNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            }

            const sumNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            }

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
              const footerData = [
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return meanNum(data, 'age')
                  }
                  if (['name'].includes(column.property)) {
                    return '合并了'
                  }
                  if (['content'].includes(column.property)) {
                    return '合并了'
                  }
                  return null
                }),
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return sumNum(data, 'age')
                  }
                  return null
                })
              ]
              return footerData
            }

            return {
              demo2,
              footerColspanMethod,
              footerMethod
            }
          }
        })
        `,
        `
        <vxe-table
          border
          show-footer
          height="400"
          :footer-span-method="footerRowspanMethod"
          :footer-method="footerMethod"
          :data="demo3.tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" sortable></vxe-column>
          <vxe-column field="role" title="Role" sortable></vxe-column>
          <vxe-column field="rate" title="Rate" footer-align="center"></vxe-column>
          <vxe-column field="age" title="Age" footer-align="center"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo3 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const footerRowspanMethod: VxeTablePropTypes.FooterSpanMethod = ({ _rowIndex, _columnIndex }) => {
              if (_rowIndex === 0) {
                if (_columnIndex === 1) {
                  return { rowspan: 2, colspan: 1 }
                }
              } else if (_rowIndex === 1) {
                if (_columnIndex === 1) {
                  return { rowspan: 0, colspan: 0 }
                }
              }
            }

            const meanNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            }

            const sumNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            }

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
              const footerData = [
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return meanNum(data, 'age')
                  }
                  if (['name'].includes(column.property)) {
                    return '合并了'
                  }
                  if (['content'].includes(column.property)) {
                    return '合并了'
                  }
                  return null
                }),
                columns.map((column, _columnIndex) => {
                  if (_columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return sumNum(data, 'age')
                  }
                  return null
                })
              ]
              return footerData
            }

            return {
              demo3,
              footerRowspanMethod,
              footerMethod
            }
          }
        })
        `
      ]
    }
  }
})
</script>
