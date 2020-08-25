<template>
  <div>
    <p class="tip">
      虚拟滚动渲染<span class="orange">（最大可以支撑 5w 列、30w 行）</span><br>
      大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="reloadData"/> 函数<br>
      <table-api-link prop="data"/> 和 <table-api-link prop="loadData"/>/<table-api-link prop="reloadData"/> 不应该同时使用，请根据数据量决定使用哪种方式，保证一致性<br>
      <span class="red">（注：启用纵向虚拟滚的后不支持动态行高；如果需要支持，将虚拟滚动关闭即可）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="loadList(5000)">5k条</vxe-button>
        <vxe-button @click="loadList(10000)">1w条</vxe-button>
        <vxe-button @click="loadList(50000)">5w条</vxe-button>
        <vxe-button @click="loadList(100000)">10w条</vxe-button>
        <vxe-button @click="loadList(200000)">20w条</vxe-button>
        <vxe-button @click="loadList(300000)">30w条</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      show-header-overflow
      export-config
      ref="xTable"
      height="300"
      :sort-config="{trigger: 'cell'}"
      :loading="loading">
      <vxe-table-column type="seq" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable width="200"></vxe-table-column>
      <vxe-table-column field="id" title="ID" width="200"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" width="200"></vxe-table-column>
      <vxe-table-column field="region" title="Region" width="200"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
      <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
      <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
      <vxe-table-column field="attr1" title="Attr1" width="200"></vxe-table-column>
      <vxe-table-column field="attr2" title="Attr2" width="200"></vxe-table-column>
      <vxe-table-column field="attr3" title="Attr3" width="200"></vxe-table-column>
      <vxe-table-column field="attr4" title="Attr4" width="200"></vxe-table-column>
      <vxe-table-column field="attr5" title="Attr5" width="200"></vxe-table-column>
      <vxe-table-column field="attr6" title="Attr6" width="200"></vxe-table-column>
      <vxe-table-column field="attr7" title="Attr7" width="200"></vxe-table-column>
      <vxe-table-column field="attr8" title="Attr8" width="200"></vxe-table-column>
      <vxe-table-column field="attr11" title="attr11" width="200"></vxe-table-column>
      <vxe-table-column field="attr9" title="Attr9" width="200"></vxe-table-column>
      <vxe-table-column field="attr10" title="attr10" width="200"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      demoCodes: [
        `
        <vxe-toolbar export>
          <template v-slot:buttons>
            <vxe-button @click="loadList(5000)">5k条</vxe-button>
            <vxe-button @click="loadList(10000)">1w条</vxe-button>
            <vxe-button @click="loadList(50000)">5w条</vxe-button>
            <vxe-button @click="loadList(100000)">10w条</vxe-button>
            <vxe-button @click="loadList(200000)">20w条</vxe-button>
            <vxe-button @click="loadList(300000)">30w条</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          show-header-overflow
          export-config
          ref="xTable"
          height="300"
          :sort-config="{trigger: 'cell'}"
          :loading="loading">
          <vxe-table-column type="seq" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable width="200"></vxe-table-column>
          <vxe-table-column field="id" title="ID" width="200"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" width="200"></vxe-table-column>
          <vxe-table-column field="region" title="Region" width="200"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
          <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
          <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
          <vxe-table-column field="attr1" title="Attr1" width="200"></vxe-table-column>
          <vxe-table-column field="attr2" title="Attr2" width="200"></vxe-table-column>
          <vxe-table-column field="attr3" title="Attr3" width="200"></vxe-table-column>
          <vxe-table-column field="attr4" title="Attr4" width="200"></vxe-table-column>
          <vxe-table-column field="attr5" title="Attr5" width="200"></vxe-table-column>
          <vxe-table-column field="attr6" title="Attr6" width="200"></vxe-table-column>
          <vxe-table-column field="attr7" title="Attr7" width="200"></vxe-table-column>
          <vxe-table-column field="attr8" title="Attr8" width="200"></vxe-table-column>
          <vxe-table-column field="attr11" title="attr11" width="200"></vxe-table-column>
          <vxe-table-column field="attr9" title="Attr9" width="200"></vxe-table-column>
          <vxe-table-column field="attr10" title="attr10" width="200"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          created () {
            this.loadList(600)
          },
          methods: {
            loadList (size) {
              this.loading = true
              XEAjax.mockList(size).then(data => {
                // 使用函数式加载，阻断 vue 对大数据的监听
                const xTable = this.$refs.xTable
                const startTime = Date.now()
                if (xTable) {
                  this.$refs.xTable.reloadData(data).then(() => {
                    this.$XModal.message({ message: \`渲染 \${size} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
                    this.loading = false
                  })
                }
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loadList(600)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    loadList (size) {
      this.loading = true
      XEAjax.mockList(size).then(data => {
        // 使用函数式加载，阻断 vue 对大数据的监听
        const xTable = this.$refs.xTable
        const startTime = Date.now()
        if (xTable) {
          this.$refs.xTable.reloadData(data).then(() => {
            this.$XModal.message({ message: `渲染 ${size} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
