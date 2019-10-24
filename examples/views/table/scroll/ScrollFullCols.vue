<template>
  <div>
    <p class="tip">
      虚拟滚动渲染，加载 10 万行 1 万列，左右固定列<br>
      大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="loadColumn"/> 函数<br>
      对于多选 type=<table-column-api-link prop="checkbox"/> 当数据量海量时应该绑定 <table-api-link prop="checkField"/> 属性渲染速度更快<br>
      <span class="red">注意：如果要启用横向虚拟滚动，所有的列宽度必须一致，否则无法兼容</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xGrid.toggleRowSelection($refs.xGrid.getData(1))">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xGrid.setSelection([$refs.xGrid.getData(2), $refs.xGrid.getData(3)], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xGrid.setAllSelection(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xGrid.clearSelection()">清除所有行选中</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-grid
      border
      show-overflow
      show-header-overflow
      highlight-hover-row
      highlight-current-row
      ref="xGrid"
      height="600"
      :loading="loading"
      :checkbox-config="{checkField: 'checked'}">
    </vxe-grid>

    <pre>
      <code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
        | Spacebar | 翻页滚动 |
        | ctrl + Home | 滚动到顶部 |
        | ctrl + End | 滚动到底部 |
      </code>
    </pre>

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
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xGrid.toggleRowSelection($refs.xGrid.getData(1))">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xGrid.setSelection([$refs.xGrid.getData(2), $refs.xGrid.getData(3)], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xGrid.setAllSelection(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xGrid.clearSelection()">清除所有行选中</vxe-button>
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-grid
          border
          show-overflow
          show-header-overflow
          highlight-hover-row
          highlight-current-row
          ref="xGrid"
          height="600"
          :loading="loading"
          :checkbox-config="{checkField: 'checked'}">
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
            this.loading = true
            setTimeout(() => {
              let tableData = window.MOCK_DATA_LIST.slice(0, 100000)
              let tableColumn = window.MOCK_COLUMN_LIST.slice(0, 10000)
              // 使用函数式加载，阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
              if (this.$refs.xGrid) {
                this.$refs.xGrid.loadColumn(tableColumn)
                this.$refs.xGrid.loadData(tableData)
              }
              this.loading = false
            }, 300)
          },
          methods: {
            getSelectEvent () {
              let selectRecords = this.$refs.xGrid.getSelectRecords()
              this.$XModal.alert(selectRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      let tableData = window.MOCK_DATA_LIST.slice(0, 100000)
      let tableColumn = window.MOCK_COLUMN_LIST.slice(0, 10000)
      // 使用函数式加载，阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
      if (this.$refs.xGrid) {
        this.$refs.xGrid.loadColumn(tableColumn)
        this.$refs.xGrid.loadData(tableData)
      }
      this.loading = false
    }, 300)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    getSelectEvent () {
      let selectRecords = this.$refs.xGrid.getSelectRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>
