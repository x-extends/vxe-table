<template>
  <div>
    <p class="tip">
      虚拟滚动渲染，加载 1 万行 1 万列<br>
      大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="loadColumn"/> 函数<br>
      <span class="red">注意：如果要启用横向虚拟滚动，不支持分组表头</span>
    </p>

    <vxe-grid
      border
      show-overflow
      show-header-overflow
      ref="xGrid"
      height="500"
      :toolbar="{export: true}"
      :loading="loading"
      :checkbox-config="{checkField: 'checked', labelField: 'nickname'}">
      <template v-slot:buttons>
        <vxe-button @click="loadColumnAndData(3000, 3000)">加载3k列3k条</vxe-button>
        <vxe-button @click="loadColumnAndData(5000, 5000)">加载5k列5k条</vxe-button>
        <vxe-button @click="loadColumnAndData(10000, 10000)">加载1w列1w条</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      demoCodes: [
        `
        <vxe-grid
          border
          show-overflow
          show-header-overflow
          ref="xGrid"
          height="500"
          :toolbar="{export: true}"
          :loading="loading"
          :checkbox-config="{checkField: 'checked', labelField: 'nickname'}">
          <template v-slot:buttons>
            <vxe-button @click="loadColumnAndData(3000, 3000)">加载3k列3k条</vxe-button>
            <vxe-button @click="loadColumnAndData(5000, 5000)">加载5k列5k条</vxe-button>
            <vxe-button @click="loadColumnAndData(10000, 10000)">加载1w列1w条</vxe-button>
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
            this.loadColumnAndData(200, 600)
          },
          methods: {
            loadColumnAndData (colSize, rowSize) {
              this.loading = true
              Promise.all([
                this.loadColumn(colSize),
                this.loadList(rowSize)
              ]).then(() => {
                this.loading = false
              })
            },
            loadColumn (size) {
              return this.$ajax.mockColumns(size).then(columns => {
                // 使用函数式加载，阻断 vue 对大数组的双向绑定
                return this.$refs.xGrid.reloadColumn(columns)
              })
            },
            loadList (size) {
              return this.$ajax.mockList(size).then(data => {
                // 使用函数式加载，阻断 vue 对大数组的双向绑定
                return this.$refs.xGrid.reloadData(data)
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loadColumnAndData(200, 600)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    loadColumnAndData (colSize, rowSize) {
      this.loading = true
      Promise.all([
        this.loadColumn(colSize),
        this.loadList(rowSize)
      ]).then(() => {
        this.loading = false
      })
    },
    loadColumn (size) {
      return this.$ajax.mockColumns(size).then(columns => {
        // 使用函数式加载，阻断 vue 对大数组的双向绑定
        return this.$refs.xGrid.reloadColumn(columns)
      })
    },
    loadList (size) {
      return this.$ajax.mockList(size).then(data => {
        // 使用函数式加载，阻断 vue 对大数组的双向绑定
        return this.$refs.xGrid.reloadData(data)
      })
    }
  }
}
</script>
