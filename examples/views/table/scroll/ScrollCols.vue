<template>
  <div>
    <p class="tip">
      虚拟滚动渲染<br>
      大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="loadColumn"/> 函数<br>
      <span class="red">(注：如果要启用横向虚拟滚动，不支持分组表头)</span>
    </p>

    <vxe-grid
      border
      resizable
      show-overflow
      show-header-overflow
      ref="xGrid"
      height="500"
      :loading="loading"
      :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
      :checkbox-config="{checkField: 'checked'}">
      <template #toolbar_buttons>
        <vxe-button @click="loadColumnAndData(1000, 20)">1k列20条</vxe-button>
        <vxe-button @click="loadColumnAndData(1000, 100)">1k列100条</vxe-button>
        <vxe-button @click="loadColumnAndData(5000, 500)">5k列500条</vxe-button>
        <vxe-button @click="loadColumnAndData(5000, 10000)">5k列1w条</vxe-button>
        <vxe-button @click="loadColumnAndData(10000, 50000)">1w列5w条</vxe-button>
        <vxe-button @click="loadColumnAndData(10000, 100000)">1w列10w条</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          show-overflow
          show-header-overflow
          ref="xGrid"
          height="500"
          :loading="loading"
          :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
          :checkbox-config="{checkField: 'checked'}">
          <template #toolbar_buttons>
            <vxe-button @click="loadColumnAndData(1000, 20)">1k列20条</vxe-button>
            <vxe-button @click="loadColumnAndData(1000, 100)">1k列100条</vxe-button>
            <vxe-button @click="loadColumnAndData(5000, 500)">5k列500条</vxe-button>
            <vxe-button @click="loadColumnAndData(5000, 10000)">5k列1w条</vxe-button>
            <vxe-button @click="loadColumnAndData(10000, 50000)">1w列5w条</vxe-button>
            <vxe-button @click="loadColumnAndData(10000, 100000)">1w列10w条</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          created () {
            this.loadColumnAndData(600, 10)
          },
          methods: {
            loadColumnAndData (colSize, rowSize) {
              this.loading = true
              Promise.all([
                this.mockColumns(colSize),
                this.mockList(rowSize)
              ]).then(rest => {
                const columns = rest[0]
                const data = rest[1]
                const startTime = Date.now()
                const xGrid = this.$refs.xGrid
                // 使用函数式加载，阻断 vue 对大数组的双向绑定
                if (xGrid) {
                  Promise.all([
                    xGrid.reloadColumn(columns),
                    xGrid.reloadData(data)
                  ]).then(() => {
                    this.$XModal.message({ content: \`渲染 \${colSize} 列 \${rowSize} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
                    this.loading = false
                  })
                }
              })
            },
            mockColumns (size) {
              return new Promise(resolve => {
                const cols = []
                for (let index = 0; index < size; index++) {
                  if (index === 0) {
                    cols.push({
                      type: 'checkbox',
                      width: 80
                    })
                  } else {
                    cols.push({
                      title: \`Col_\${index}\`,
                      field: \`col\${index}\`,
                      width: 160
                    })
                  }
                }
                resolve(cols)
              })
            },
            mockList (size) {
              return new Promise(resolve => {
                const list = []
                for (let index = 0; index < size; index++) {
                  list.push({
                    name: \`名称\${index}\`,
                    checked: false,
                    col1: '0',
                    col2: 123,
                    col3: 18,
                    col4: 234,
                    col5: 3,
                    col6: 'shenzhen'
                  })
                }
                resolve(list)
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loadColumnAndData(600, 10)
  },
  methods: {
    loadColumnAndData (colSize, rowSize) {
      this.loading = true
      Promise.all([
        this.mockColumns(colSize),
        this.mockList(rowSize)
      ]).then(rest => {
        const columns = rest[0]
        const data = rest[1]
        const startTime = Date.now()
        const xGrid = this.$refs.xGrid
        // 使用函数式加载，阻断 vue 对大数组的双向绑定
        if (xGrid) {
          Promise.all([
            xGrid.reloadColumn(columns.map(conf => {
              conf.fixed = null
              return conf
            })),
            xGrid.reloadData(data)
          ]).then(() => {
            this.$XModal.message({ content: `渲染 ${colSize} 列 ${rowSize} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
            this.loading = false
          })
        }
      })
    },
    mockColumns (size) {
      return new Promise(resolve => {
        const cols = []
        for (let index = 0; index < size; index++) {
          if (index === 0) {
            cols.push({
              type: 'checkbox',
              width: 80
            })
          } else {
            cols.push({
              title: `Col_${index}`,
              field: `col${index}`,
              width: 160
            })
          }
        }
        resolve(cols)
      })
    },
    mockList (size) {
      return new Promise(resolve => {
        const list = []
        for (let index = 0; index < size; index++) {
          list.push({
            name: `名称${index}`,
            checked: false,
            col1: '0',
            col2: 123,
            col3: 18,
            col4: 234,
            col5: 3,
            col6: 'shenzhen'
          })
        }
        resolve(list)
      })
    }
  }
}
</script>
