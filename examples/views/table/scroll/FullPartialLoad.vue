<template>
  <div>
    <p class="tip">
      虚拟滚动渲染，更加复杂局部递增数据、局部递增列、固定列<br>
    </p>

    <vxe-toolbar :loading="gridOptions.loading">
      <template #buttons>
        <vxe-button @click="loadList(20)">+20条</vxe-button>
        <vxe-button @click="loadList(50)">+50条</vxe-button>
        <vxe-button @click="loadList(100)">+100条</vxe-button>
        <vxe-button @click="loadList(300)">+300条</vxe-button>
        <vxe-button @click="removeList(20)">-20条</vxe-button>
        <vxe-button @click="removeList(50)">-50条</vxe-button>
        <vxe-button @click="loadColumns(10)">+10列</vxe-button>
        <vxe-button @click="loadColumns(30)">+30列</vxe-button>
        <vxe-button @click="loadColumns(50)">+50列</vxe-button>
        <vxe-button @click="removeColumn(10)">-10列</vxe-button>
        <vxe-button @click="removeColumn(20)">-20列</vxe-button>
        <vxe-button @click="$refs.xGrid.scrollTo(1000, 2000)">x=1000,y=2000</vxe-button>
        <vxe-button @click="$refs.xGrid.clearScroll()">清除滚动</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-grid ref="xGrid" v-bind="gridOptions"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue'
import { VxeGridInstance, VxeGridPropTypes, VxeGridProps } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xGrid = ref({} as VxeGridInstance)

    const gridOptions = reactive({
      border: true,
      showOverflow: true,
      showHeaderOverflow: true,
      height: 500,
      rowId: 'id',
      checkboxConfig: {
        checkField: 'checked',
        labelField: 'id'
      },
      loading: false
    } as VxeGridProps)

    let colIndex = 0
    let rowIndex = 1

    let allData: any[] = []
    let allColumn: VxeGridPropTypes.Columns = []

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
          const list = []
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

    const removeColumn = (size: number) => {
      gridOptions.loading = true
      if (allColumn.length > size) {
        const $grid = xGrid.value
        allColumn = allColumn.slice(0, allColumn.length - size)
        if ($grid) {
          $grid.loadColumn(allColumn)
        }
        gridOptions.loading = false
      }
    }

    const loadColumns = (size: number) => {
      gridOptions.loading = true
      findColumnList(size).then(data => {
        const $grid = xGrid.value
        allColumn = allColumn.concat(data) // 局部追加并保存全量数据
        if ($grid) {
          $grid.loadColumn(allColumn)
        }
        gridOptions.loading = false
      })
    }

    const removeList = (size: number) => {
      gridOptions.loading = true
      setTimeout(() => {
        if (allData.length > size) {
          const $grid = xGrid.value
          allData = allData.slice(0, allData.length - size)
          if ($grid) {
            $grid.loadData(allData)
          }
        }
        gridOptions.loading = false
      }, 100)
    }

    const loadList = (size: number) => {
      gridOptions.loading = true
      findDataList(size).then(data => {
        const $grid = xGrid.value
        allData = allData.concat(data) // 局部追加并保存全量数据
        if ($grid) {
          $grid.loadData(allData)
        }
        gridOptions.loading = false
      })
    }

    const init = () => {
      gridOptions.loading = true
      Promise.all([
        findColumnList(200).then(data => {
          const $grid = xGrid.value
          allColumn = allColumn.concat(data)
          if ($grid) {
            $grid.loadColumn(allColumn)
          }
        }),
        findDataList(600).then(data => {
          const $grid = xGrid.value
          allData = allData.concat(data)
          if ($grid) {
            $grid.loadData(allData)
          }
        })
      ]).then(() => {
        gridOptions.loading = false
      })
    }

    init()

    return {
      xGrid,
      gridOptions,
      removeColumn,
      loadColumns,
      removeList,
      loadList,
      demoCodes: [
        `
        <vxe-toolbar :loading="gridOptions.loading">
          <template #buttons>
            <vxe-button @click="loadList(20)">+20条</vxe-button>
            <vxe-button @click="loadList(50)">+50条</vxe-button>
            <vxe-button @click="loadList(100)">+100条</vxe-button>
            <vxe-button @click="loadList(300)">+300条</vxe-button>
            <vxe-button @click="removeList(20)">-20条</vxe-button>
            <vxe-button @click="removeList(50)">-50条</vxe-button>
            <vxe-button @click="loadColumns(10)">+10列</vxe-button>
            <vxe-button @click="loadColumns(30)">+30列</vxe-button>
            <vxe-button @click="loadColumns(50)">+50列</vxe-button>
            <vxe-button @click="removeColumn(10)">-10列</vxe-button>
            <vxe-button @click="removeColumn(20)">-20列</vxe-button>
            <vxe-button @click="$refs.xGrid.scrollTo(1000, 2000)">x=1000,y=2000</vxe-button>
            <vxe-button @click="$refs.xGrid.clearScroll()">清除滚动</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-grid ref="xGrid" v-bind="gridOptions"></vxe-grid>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeGridInstance, VxeGridPropTypes, VxeGridProps } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xGrid = ref({} as VxeGridInstance)

            const gridOptions = reactive({
              border: true,
              showOverflow: true,
              showHeaderOverflow: true,
              height: 500,
              rowId: 'id',
              checkboxConfig: {
                checkField: 'checked',
                labelField: 'id'
              },
              loading: false
            } as VxeGridProps)

            let colIndex = 0
            let rowIndex = 1

            let allData: any[] = []
            let allColumn: VxeGridPropTypes.Columns = []

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
                  const list = []
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

            const removeColumn = (size: number) => {
              gridOptions.loading = true
              if (allColumn.length > size) {
                const $grid = xGrid.value
                allColumn = allColumn.slice(0, allColumn.length - size)
                if ($grid) {
                  $grid.loadColumn(allColumn)
                }
                gridOptions.loading = false
              }
            }

            const loadColumns = (size: number) => {
              gridOptions.loading = true
              findColumnList(size).then(data => {
                const $grid = xGrid.value
                allColumn = allColumn.concat(data) // 局部追加并保存全量数据
                if ($grid) {
                  $grid.loadColumn(allColumn)
                }
                gridOptions.loading = false
              })
            }

            const removeList = (size: number) => {
              gridOptions.loading = true
              setTimeout(() => {
                if (allData.length > size) {
                  const $grid = xGrid.value
                  allData = allData.slice(0, allData.length - size)
                  if ($grid) {
                    $grid.loadData(allData)
                  }
                }
                gridOptions.loading = false
              }, 100)
            }

            const loadList = (size: number) => {
              gridOptions.loading = true
              findDataList(size).then(data => {
                const $grid = xGrid.value
                allData = allData.concat(data) // 局部追加并保存全量数据
                if ($grid) {
                  $grid.loadData(allData)
                }
                gridOptions.loading = false
              })
            }

            const init = () => {
              gridOptions.loading = true
              Promise.all([
                findColumnList(200).then(data => {
                  const $grid = xGrid.value
                  allColumn = allColumn.concat(data)
                  if ($grid) {
                    $grid.loadColumn(allColumn)
                  }
                }),
                findDataList(600).then(data => {
                  const $grid = xGrid.value
                  allData = allData.concat(data)
                  if ($grid) {
                    $grid.loadData(allData)
                  }
                })
              ]).then(() => {
                gridOptions.loading = false
              })
            }

            init()

            return {
              xGrid,
              gridOptions,
              removeColumn,
              loadColumns,
              removeList,
              loadList
            }
          }
        })
        `
      ]
    }
  }
})
</script>
