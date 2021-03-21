<template>
  <div>
    <p class="tip">显示表尾，服务端计算表尾合计</p>

    <vxe-grid ref="xGrid" v-bind="gridOptions"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue'
import { VxeGridInstance, VxeGridPropTypes, VxeGridProps } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xGrid = ref({} as VxeGridInstance)

    const footerData = ref([] as string[][])

    const gridOptions = reactive({
      border: true,
      showOverflow: true,
      showHeaderOverflow: true,
      showFooterOverflow: true,
      showFooter: true,
      height: 500,
      rowId: 'id',
      loading: false,
      checkboxConfig: {
        checkField: 'checked',
        labelField: 'id'
      },
      footerMethod () {
        return footerData.value
      }
    } as VxeGridProps)

    let colIndex = 0
    let rowIndex = 1

    const findColumnList = (size: number): Promise<VxeGridPropTypes.Columns> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const columns: VxeGridPropTypes.Columns = []
          for (let index = 0; index < size; index++) {
            const key = colIndex++
            const config: any = {
              field: key ? `col_${key}` : 'id',
              title: key ? `标题_${key}` : 'ID',
              width: 140,
              type: null,
              fixed: null
            }
            if (!key) {
              config.type = 'checkbox'
            }
            if (key < 2) {
              config.fixed = 'left'
            }
            columns.push(config)
          }
          resolve(columns)
        }, 250)
      })
    }

    const findDataList = (size: number): Promise<any[]> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const list: any[] = []
          for (let index = 0; index < size; index++) {
            const key = rowIndex++
            const item: any = { id: key, checked: false }
            // 由于生成数据比较耗时，所以固定生成1000字段
            Array.from(new Array(1000)).forEach((num, cIndex) => {
              item[`col_${cIndex}`] = `内容_${cIndex}_${index}`
            })
            list.push(item)
          }
          resolve(list)
        }, 250)
      })
    }

    const init = () => {
      let tableColumn: VxeGridPropTypes.Columns = []
      gridOptions.loading = true
      Promise.all([
        findColumnList(200).then(columns => {
          const $grid = xGrid.value
          if ($grid) {
            tableColumn = columns
            $grid.loadColumn(columns)
          }
        }),
        findDataList(600).then(data => {
          const $grid = xGrid.value
          if ($grid) {
            $grid.loadData(data)
          }
        })
      ]).then(() => {
        const $grid = xGrid.value
        gridOptions.loading = false

        // 计算表尾数据
        const footList: string[][] = [[]]
        tableColumn.forEach((column, index) => {
          footList[0].push(index === 0 ? '合计' : `${index}`)
        })
        footerData.value = footList
        if ($grid) {
          $grid.updateFooter()
        }
      })
    }

    init()

    return {
      xGrid,
      gridOptions,
      demoCodes: [
        `
        <vxe-grid ref="xGrid" v-bind="gridOptions"></vxe-grid>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeGridInstance, VxeGridPropTypes, VxeGridProps } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xGrid = ref({} as VxeGridInstance)

            const footerData = ref([] as string[][])

            const gridOptions = reactive({
              border: true,
              showOverflow: true,
              showHeaderOverflow: true,
              showFooterOverflow: true,
              showFooter: true,
              height: 500,
              rowId: 'id',
              loading: false,
              checkboxConfig: {
                checkField: 'checked',
                labelField: 'id'
              },
              footerMethod () {
                return footerData.value
              }
            } as VxeGridProps)

            let colIndex = 0
            let rowIndex = 1

            const findColumnList = (size: number): Promise<VxeGridPropTypes.Columns> => {
              return new Promise(resolve => {
                setTimeout(() => {
                  const columns: VxeGridPropTypes.Columns = []
                  for (let index = 0; index < size; index++) {
                    const key = colIndex++
                    const config: any = {
                      field: key ? \`col_\${key}\` : 'id',
                      title: key ? \`标题_\${key}\` : 'ID',
                      width: 140,
                      type: null,
                      fixed: null
                    }
                    if (!key) {
                      config.type = 'checkbox'
                    }
                    if (key < 2) {
                      config.fixed = 'left'
                    }
                    columns.push(config)
                  }
                  resolve(columns)
                }, 250)
              })
            }

            const findDataList = (size: number): Promise<any[]> => {
              return new Promise(resolve => {
                setTimeout(() => {
                  const list: any[] = []
                  for (let index = 0; index < size; index++) {
                    const key = rowIndex++
                    const item: any = { id: key, checked: false }
                    // 由于生成数据比较耗时，所以固定生成1000字段
                    Array.from(new Array(1000)).forEach((num, cIndex) => {
                      item[\`col_\${cIndex}\`] = \`内容_\${cIndex}_\${index}\`
                    })
                    list.push(item)
                  }
                  resolve(list)
                }, 250)
              })
            }

            const init = () => {
              let tableColumn: VxeGridPropTypes.Columns = []
              gridOptions.loading = true
              Promise.all([
                findColumnList(200).then(columns => {
                  const $grid = xGrid.value
                  if ($grid) {
                    tableColumn = columns
                    $grid.loadColumn(columns)
                  }
                }),
                findDataList(600).then(data => {
                  const $grid = xGrid.value
                  if ($grid) {
                    $grid.loadData(data)
                  }
                })
              ]).then(() => {
                const $grid = xGrid.value
                gridOptions.loading = false

                // 计算表尾数据
                const footList: string[][] = [[]]
                tableColumn.forEach((column, index) => {
                  footList[0].push(index === 0 ? '合计' : \`\${index}\`)
                })
                footerData.value = footList
                if ($grid) {
                  $grid.updateFooter()
                }
              })
            }

            init()

            return {
              xGrid,
              gridOptions
            }
          }
        })
        `
      ]
    }
  }
})
</script>
