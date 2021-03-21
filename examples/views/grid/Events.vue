<template>
  <div>
    <p class="tip">
      表格事件绑定，通过设置 <table-api-link prop="cell-click"/>、<table-api-link prop="cell-dblclick"/> ...等常用事件<br>
      <span class="red">（注：部分特殊事件需要开启对应的参数后才能有效）</span>
    </p>

    <vxe-grid v-bind="gridOptions" v-on="gridEvents"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeGridListeners, VxeGridProps } from '../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const gridOptions = reactive({
      border: true,
      stripe: true,
      resizable: true,
      showFooter: true,
      height: 500,
      tooltipConfig: {},
      exportConfig: {},
      menuConfig: {},
      toolbarConfig: {
        export: true,
        zoom: true
      },
      editConfig: {
        trigger: 'click',
        mode: 'cell'
      },
      columns: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        {
          field: 'name',
          title: 'Name',
          editRender: {
            name: 'input',
            events: {
              input: ({ column }) => {
                console.log(`${column.title} 触发 input 事件`)
              }
            }
          }
        },
        { field: 'nickname', title: 'Nickname' },
        { field: 'age', title: 'Age' },
        { field: 'rate', title: 'Rate' },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, rate: 5, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, rate: 0, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, rate: 7, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, rate: 4, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, rate: 6, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, rate: 5, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, rate: 5, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, rate: 3, address: 'Shenzhen' },
        { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: 'Man ', age: 35, rate: 2, address: 'Shenzhen' },
        { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 35, rate: 2, address: 'Guangzhou' },
        { id: 100011, name: 'Test11', nickname: 'T11', role: 'Test', sex: 'Women ', age: 26, rate: 5, address: 'Shenzhen' },
        { id: 100012, name: 'Test12', nickname: 'T12', role: 'Develop', sex: 'Man ', age: 34, rate: 1, address: 'Guangzhou' },
        { id: 100013, name: 'Test13', nickname: 'T13', role: 'Test', sex: 'Women ', age: 22, rate: 3, address: 'Shenzhen' }
      ],
      footerMethod ({ columns, data }) {
        return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '和值'
            }
            if (['age', 'rate'].includes(column.property)) {
              return XEUtils.sum(data, column.property)
            }
            return ''
          }),
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '平均'
            }
            if (['age', 'rate'].includes(column.property)) {
              return XEUtils.mean(data, column.property)
            }
            return ''
          })
        ]
      }
    } as VxeGridProps)

    const gridEvents: VxeGridListeners = {
      headerCellClick ({ column }) {
        console.log(`表头单元格点击${column.title}`)
      },
      headerCellDblclick ({ column }) {
        console.log(`表头单元格双击${column.title}`)
      },
      headerCellMenu ({ column }) {
        console.log(`表头右键单元格 ${column.title}`)
      },
      cellClick ({ column }) {
        console.log(`单元格点击${column.title}`)
      },
      cellDBLClick ({ column }) {
        console.log(`单元格双击${column.title}`)
      },
      cellMouseenter ({ column }) {
        console.log(`单元格鼠标进入${column.title}`)
      },
      cellMouseleave ({ column }) {
        console.log(`单元格鼠标离开${column.title}`)
      },
      cellMenu ({ row }) {
        console.log(`单元格右键行 ${row.name}`)
      },
      footerCellClick ({ column }) {
        console.log(`表尾单元格点击${column.title}`)
      },
      footerCellDblclick ({ column }) {
        console.log(`表尾单元格双击${column.title}`)
      },
      footerCellMenu ({ column }) {
        console.log(`表尾右键单元格 ${column.title}`)
      },
      checkboxChange ({ checked }) {
        console.log(`复选框切换 ${checked}`)
      },
      checkboxAll ({ checked }) {
        console.log(`复选框全选切换 ${checked}`)
      },
      scroll ({ scrollTop, scrollLeft }) {
        console.log(`滚动事件scrollTop=${scrollTop} scrollLeft=${scrollLeft}`)
      },
      zoom ({ type }) {
        console.log(`表格全屏 type=${type}`)
      }
    }

    return {
      gridOptions,
      gridEvents,
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions" v-on="gridEvents"></vxe-grid>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeGridListeners, VxeGridProps } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const gridOptions = reactive({
              border: true,
              stripe: true,
              resizable: true,
              showFooter: true,
              height: 500,
              tooltipConfig: {},
              exportConfig: {},
              menuConfig: {},
              toolbarConfig: {
                export: true,
                zoom: true
              },
              editConfig: {
                trigger: 'click',
                mode: 'cell'
              },
              columns: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
                {
                  field: 'name',
                  title: 'Name',
                  editRender: {
                    name: 'input',
                    events: {
                      input: ({ column }) => {
                        console.log(\`\${column.title} 触发 input 事件\`)
                      }
                    }
                  }
                },
                { field: 'nickname', title: 'Nickname' },
                { field: 'age', title: 'Age' },
                { field: 'rate', title: 'Rate' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, rate: 5, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, rate: 0, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, rate: 7, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, rate: 4, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, rate: 6, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, rate: 5, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, rate: 5, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, rate: 3, address: 'Shenzhen' },
                { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: 'Man ', age: 35, rate: 2, address: 'Shenzhen' },
                { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 35, rate: 2, address: 'Guangzhou' },
                { id: 100011, name: 'Test11', nickname: 'T11', role: 'Test', sex: 'Women ', age: 26, rate: 5, address: 'Shenzhen' },
                { id: 100012, name: 'Test12', nickname: 'T12', role: 'Develop', sex: 'Man ', age: 34, rate: 1, address: 'Guangzhou' },
                { id: 100013, name: 'Test13', nickname: 'T13', role: 'Test', sex: 'Women ', age: 22, rate: 3, address: 'Shenzhen' }
              ],
              footerMethod ({ columns, data }) {
                return [
                  columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                      return '和值'
                    }
                    if (['age', 'rate'].includes(column.property)) {
                      return XEUtils.sum(data, column.property)
                    }
                    return ''
                  }),
                  columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                      return '平均'
                    }
                    if (['age', 'rate'].includes(column.property)) {
                      return XEUtils.mean(data, column.property)
                    }
                    return ''
                  })
                ]
              }
            } as VxeGridProps)

            const gridEvents: VxeGridListeners = {
              headerCellClick ({ column }) {
                console.log(\`表头单元格点击\${column.title}\`)
              },
              headerCellDblclick ({ column }) {
                console.log(\`表头单元格双击\${column.title}\`)
              },
              headerCellMenu ({ column }) {
                console.log(\`表头右键单元格 \${column.title}\`)
              },
              cellClick ({ column }) {
                console.log(\`单元格点击\${column.title}\`)
              },
              cellDBLClick ({ column }) {
                console.log(\`单元格双击\${column.title}\`)
              },
              cellMouseenter ({ column }) {
                console.log(\`单元格鼠标进入\${column.title}\`)
              },
              cellMouseleave ({ column }) {
                console.log(\`单元格鼠标离开\${column.title}\`)
              },
              cellMenu ({ row }) {
                console.log(\`单元格右键行 \${row.name}\`)
              },
              footerCellClick ({ column }) {
                console.log(\`表尾单元格点击\${column.title}\`)
              },
              footerCellDblclick ({ column }) {
                console.log(\`表尾单元格双击\${column.title}\`)
              },
              footerCellMenu ({ column }) {
                console.log(\`表尾右键单元格 \${column.title}\`)
              },
              checkboxChange ({ checked }) {
                console.log(\`复选框切换 \${checked}\`)
              },
              checkboxAll ({ checked }) {
                console.log(\`复选框全选切换 \${checked}\`)
              },
              scroll ({ scrollTop, scrollLeft }) {
                console.log(\`滚动事件scrollTop=\${scrollTop} scrollLeft=\${scrollLeft}\`)
              },
              zoom ({ type }) {
                console.log(\`表格全屏 type=\${type}\`)
              }
            }

            return {
              gridOptions,
              gridEvents
            }
          }
        })
        `
      ]
    }
  }
})
</script>
