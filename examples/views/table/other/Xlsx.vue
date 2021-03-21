<template>
  <div>
    <p class="tip">
      使用 <a class="link" href="https://www.npmjs.com/package/xlsx" target="_blank">xlsx</a> 实现导入数据<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-grid ref="xGrid1" v-bind="gridOptions1">
      <template #toolbar>
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="impotEvent">选择文件</vxe-button>
          </template>
        </vxe-toolbar>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">
      使用 <a class="link" href="https://www.npmjs.com/package/xlsx" target="_blank">xlsx</a> 实现导出 xlsx 文件<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-grid ref="xGrid2" v-bind="gridOptions2">
      <template #toolbar>
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="exportEvent">导出.xlsx</vxe-button>
          </template>
        </vxe-toolbar>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeGridProps, VxeGridInstance } from '../../../../types/index'
import XLSX from 'xlsx'

export default defineComponent({
  setup () {
    const xGrid1 = ref({} as VxeGridInstance)

    const gridOptions1 = reactive({
      border: true,
      height: 300,
      columns: [
        { type: 'checkbox', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        {
          field: 'sex',
          title: 'Sex',
          formatter ({ cellValue }) {
            if (cellValue === '1') {
              return '男'
            } else if (cellValue === '0') {
              return '女'
            }
            return ''
          }
        },
        { field: 'age', title: 'Age' },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      data: [] as any[]
    } as VxeGridProps)

    const impotEvent = async () => {
      const $grid = xGrid1.value
      const { files } = await $grid.readFile({
        types: ['xls', 'xlsx']
      })
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const data = event.target ? event.target.result : ''
        const workbook = XLSX.read(data, { type: 'binary' })
        const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets.Sheet1)
        const tableData: any[] = []
        // 解析数据
        const { columns } = gridOptions1
        if (columns) {
          csvData.split('\n').forEach((vRow) => {
            if (vRow) {
              const vCols = vRow.split(',')
              const item: any = {}
              vCols.forEach((val, cIndex) => {
                const column = columns[cIndex]
                if (column.field) {
                  item[column.field] = val
                }
              })
              tableData.push(item)
            }
          })
        }
        gridOptions1.data = tableData
      }
      fileReader.readAsBinaryString(files[0])
    }

    const xGrid2 = ref({} as VxeGridInstance)

    const gridOptions2 = reactive({
      border: true,
      height: 300,
      columns: [
        { type: 'checkbox', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        {
          field: 'sex',
          title: 'Sex',
          formatter ({ cellValue }) {
            if (cellValue === '1') {
              return '男'
            } else if (cellValue === '0') {
              return '女'
            }
            return ''
          }
        },
        { field: 'age', title: 'Age' },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '0', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', age: 29, address: 'Guangzhou' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '1', age: 35, address: 'Shenzhen' },
        { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: '1', age: 24, address: 'Shenzhen' },
        { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', age: 20, address: 'Guangzhou' }
      ]
    } as VxeGridProps)

    const toBuffer = (wbout: any) => {
      const buf = new ArrayBuffer(wbout.length)
      const view = new Uint8Array(buf)
      for (let index = 0; index !== wbout.length; ++index) view[index] = wbout.charCodeAt(index) & 0xFF
      return buf
    }

    const exportEvent = () => {
      const $grid = xGrid2.value
      // 转换数据
      const table = $grid.$el.querySelector('.body--wrapper>.vxe-table--body') as HTMLElement
      const book = XLSX.utils.book_new()
      const sheet = XLSX.utils.table_to_sheet(table)
      XLSX.utils.book_append_sheet(book, sheet)
      const wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: false, type: 'binary' })
      const blob = new Blob([toBuffer(wbout)], { type: 'application/octet-stream' })
      // 保存导出
      VXETable.saveFile({ filename: '数据导出', type: 'xlsx', content: blob })
    }

    return {
      xGrid1,
      gridOptions1,
      impotEvent,
      xGrid2,
      gridOptions2,
      exportEvent,
      demoCodes: [
        `
        <vxe-grid ref="xGrid1" v-bind="gridOptions1">
          <template #toolbar>
            <vxe-toolbar>
              <template #buttons>
                <vxe-button @click="impotEvent">选择文件</vxe-button>
              </template>
            </vxe-toolbar>
          </template>
        </vxe-grid>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeGridProps, VxeGridInstance } from 'vxe-table'
        import XLSX from 'xlsx'

        export default defineComponent({
          setup () {
            const xGrid1 = ref({} as VxeGridInstance)

            const gridOptions1 = reactive({
              border: true,
              height: 300,
              columns: [
                { type: 'checkbox', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                {
                  field: 'sex',
                  title: 'Sex',
                  formatter ({ cellValue }) {
                    if (cellValue === '1') {
                      return '男'
                    } else if (cellValue === '0') {
                      return '女'
                    }
                    return ''
                  }
                },
                { field: 'age', title: 'Age' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              data: [] as any[]
            } as VxeGridProps)

            const impotEvent = async () => {
              const $grid = xGrid1.value
              const { files } = await $grid.readFile({
                types: ['xls', 'xlsx']
              })
              const fileReader = new FileReader()
              fileReader.onload = (event) => {
                const data = event.target ? event.target.result : ''
                const workbook = XLSX.read(data, { type: 'binary' })
                const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets.Sheet1)
                const tableData: any[] = []
                // 解析数据
                const { columns } = gridOptions1
                if (columns) {
                  csvData.split('\\n').forEach((vRow) => {
                    if (vRow) {
                      const vCols = vRow.split(',')
                      const item: any = {}
                      vCols.forEach((val, cIndex) => {
                        const column = columns[cIndex]
                        if (column.field) {
                          item[column.field] = val
                        }
                      })
                      tableData.push(item)
                    }
                  })
                }
                gridOptions1.data = tableData
              }
              fileReader.readAsBinaryString(files[0])
            }

            return {
              xGrid1,
              gridOptions1,
              impotEvent
            }
          }
        })
        `,
        `
        <vxe-grid ref="xGrid2" v-bind="gridOptions2">
          <template #toolbar>
            <vxe-toolbar>
              <template #buttons>
                <vxe-button @click="exportEvent">导出.xlsx</vxe-button>
              </template>
            </vxe-toolbar>
          </template>
        </vxe-grid>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeGridProps, VxeGridInstance } from 'vxe-table'
        import XLSX from 'xlsx'

        export default defineComponent({
          setup () {
            const xGrid2 = ref({} as VxeGridInstance)

            const gridOptions2 = reactive({
              border: true,
              height: 300,
              columns: [
                { type: 'checkbox', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                {
                  field: 'sex',
                  title: 'Sex',
                  formatter ({ cellValue }) {
                    if (cellValue === '1') {
                      return '男'
                    } else if (cellValue === '0') {
                      return '女'
                    }
                    return ''
                  }
                },
                { field: 'age', title: 'Age' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '0', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', age: 29, address: 'Guangzhou' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '1', age: 35, address: 'Shenzhen' },
                { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: '1', age: 24, address: 'Shenzhen' },
                { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', age: 20, address: 'Guangzhou' }
              ]
            } as VxeGridProps)

            const toBuffer = (wbout: any) => {
              const buf = new ArrayBuffer(wbout.length)
              const view = new Uint8Array(buf)
              for (let index = 0; index !== wbout.length; ++index) view[index] = wbout.charCodeAt(index) & 0xFF
              return buf
            }

            const exportEvent = () => {
              const $grid = xGrid2.value
              // 转换数据
              const table = $grid.$el.querySelector('.body--wrapper>.vxe-table--body') as HTMLElement
              const book = XLSX.utils.book_new()
              const sheet = XLSX.utils.table_to_sheet(table)
              XLSX.utils.book_append_sheet(book, sheet)
              const wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: false, type: 'binary' })
              const blob = new Blob([toBuffer(wbout)], { type: 'application/octet-stream' })
              // 保存导出
              VXETable.saveFile({ filename: '数据导出', type: 'xlsx', content: blob })
            }

            return {
              xGrid2,
              gridOptions2,
              exportEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
