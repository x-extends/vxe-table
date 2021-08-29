<template>
  <div>
    <p class="tip">
      滚动模式：支持 default 模式和 wheel 模式，通过参数 <table-api-link prop="scroll-y"/>.mode=wheel 开启<br>
      default 模式：浏览器默认行为，用于轻量级表格，极致流畅<br>
      wheel 模式：鼠标滚轮触发，用于左右固定列的复杂表格，更加流畅
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="loadList(50)">50条</vxe-button>
        <vxe-button @click="loadList(100)">100条</vxe-button>
        <vxe-button @click="loadList(1000)">1k条</vxe-button>
        <vxe-button @click="loadList(10000)">1w条</vxe-button>
        <vxe-button @click="loadList(50000)">5w条</vxe-button>
        <vxe-button @click="loadList(100000)">10w条</vxe-button>
        <vxe-button @click="loadList(200000)">20w条</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      show-header-overflow
      ref="xTable"
      height="600"
      :loading="loading"
      :checkbox-config="{checkField: 'checked'}"
      :scroll-y="{mode: 'wheel'}">
      <vxe-column type="seq" width="100" fixed="left"></vxe-column>
      <vxe-column field="attr0" title="Attr0" width="200" fixed="left" sortable></vxe-column>
      <vxe-column field="attr1" title="Attr1" width="200"></vxe-column>
      <vxe-column field="attr2" title="Attr2" width="200"></vxe-column>
      <vxe-column field="attr3" title="Attr3" width="200"></vxe-column>
      <vxe-column field="attr4" title="Attr4" width="120"></vxe-column>
      <vxe-column field="attr5" title="Attr5" width="200"></vxe-column>
      <vxe-column field="attr6" title="Attr6" width="300" sortable></vxe-column>
      <vxe-column field="attr7" title="Attr7" width="200" sortable></vxe-column>
      <vxe-column field="attr8" title="Attr8" width="220"></vxe-column>
      <vxe-column field="attr9" title="Attr9" width="200"></vxe-column>
      <vxe-column field="attr10" title="Attr10" width="130"></vxe-column>
      <vxe-column field="attr11" title="Attr11" width="200"></vxe-column>
      <vxe-column field="attr12" title="Attr12" width="100"></vxe-column>
      <vxe-column field="attr13" title="Attr14" width="200"></vxe-column>
      <vxe-column field="attr14" title="Attr14" width="300"></vxe-column>
      <vxe-column field="attr15" title="Attr15" width="200"></vxe-column>
      <vxe-column field="attr16" title="Attr16" width="200"></vxe-column>
      <vxe-column field="attr17" title="Attr17" width="80"></vxe-column>
      <vxe-column field="attr18" title="Attr18" width="200"></vxe-column>
      <vxe-column field="attr19" title="Attr19" width="140"></vxe-column>
      <vxe-column field="attr20" title="Attr20" width="200"></vxe-column>
      <vxe-column field="attr21" title="Attr21" width="160"></vxe-column>
      <vxe-column field="attr22" title="Attr22" width="200"></vxe-column>
      <vxe-column field="attr23" title="Attr23" width="200"></vxe-column>
      <vxe-column field="attr24" title="Attr24" width="100" fixed="right"></vxe-column>
      <vxe-column field="attr25" title="Attr25" width="200" fixed="right"></vxe-column>
    </vxe-table>

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
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="loadList(50)">50条</vxe-button>
            <vxe-button @click="loadList(100)">100条</vxe-button>
            <vxe-button @click="loadList(1000)">1k条</vxe-button>
            <vxe-button @click="loadList(10000)">1w条</vxe-button>
            <vxe-button @click="loadList(50000)">5w条</vxe-button>
            <vxe-button @click="loadList(100000)">10w条</vxe-button>
            <vxe-button @click="loadList(200000)">20w条</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          show-header-overflow
          ref="xTable"
          height="600"
          :loading="loading"
          :checkbox-config="{checkField: 'checked'}"
          :scroll-y="{mode: 'wheel'}">
          <vxe-column type="seq" width="100" fixed="left"></vxe-column>
          <vxe-column field="attr0" title="Attr0" width="200" fixed="left" sortable></vxe-column>
          <vxe-column field="attr1" title="Attr1" width="200"></vxe-column>
          <vxe-column field="attr2" title="Attr2" width="200"></vxe-column>
          <vxe-column field="attr3" title="Attr3" width="200"></vxe-column>
          <vxe-column field="attr4" title="Attr4" width="120"></vxe-column>
          <vxe-column field="attr5" title="Attr5" width="200"></vxe-column>
          <vxe-column field="attr6" title="Attr6" width="300" sortable></vxe-column>
          <vxe-column field="attr7" title="Attr7" width="200" sortable></vxe-column>
          <vxe-column field="attr8" title="Attr8" width="220"></vxe-column>
          <vxe-column field="attr9" title="Attr9" width="200"></vxe-column>
          <vxe-column field="attr10" title="Attr10" width="130"></vxe-column>
          <vxe-column field="attr11" title="Attr11" width="200"></vxe-column>
          <vxe-column field="attr12" title="Attr12" width="100"></vxe-column>
          <vxe-column field="attr13" title="Attr14" width="200"></vxe-column>
          <vxe-column field="attr14" title="Attr14" width="300"></vxe-column>
          <vxe-column field="attr15" title="Attr15" width="200"></vxe-column>
          <vxe-column field="attr16" title="Attr16" width="200"></vxe-column>
          <vxe-column field="attr17" title="Attr17" width="80"></vxe-column>
          <vxe-column field="attr18" title="Attr18" width="200"></vxe-column>
          <vxe-column field="attr19" title="Attr19" width="140"></vxe-column>
          <vxe-column field="attr20" title="Attr20" width="200"></vxe-column>
          <vxe-column field="attr21" title="Attr21" width="160"></vxe-column>
          <vxe-column field="attr22" title="Attr22" width="200"></vxe-column>
          <vxe-column field="attr23" title="Attr23" width="200"></vxe-column>
          <vxe-column field="attr24" title="Attr24" width="100" fixed="right"></vxe-column>
          <vxe-column field="attr25" title="Attr25" width="200" fixed="right"></vxe-column>
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
              this.mockList(size).then(data => {
                // 使用函数式加载，阻断 vue 对大数据的监听
                const xTable = this.$refs.xTable
                const startTime = Date.now()
                if (xTable) {
                  this.$refs.xTable.reloadData(data).then(() => {
                    this.$XModal.message({ content: \`渲染 \${size} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
                    this.loading = false
                  })
                }
              })
            },
            mockList (size) {
              return new Promise(resolve => {
                const list = []
                for (let i = 0; i < size; i++) {
                  list.push({
                    checked: false,
                    attr0: 'attr0_row_' + i,
                    attr1: 'attr1_row_' + i,
                    attr2: 'attr2_row_' + i,
                    attr3: 'attr3_row_' + i,
                    attr4: 'attr4_row_' + i,
                    attr5: 'attr5_row_' + i,
                    attr6: i,
                    attr7: '' + i,
                    attr8: 'attr8_row_' + i,
                    attr9: 'attr9_row_' + i,
                    attr10: 'attr10_row_' + i,
                    attr11: 'attr11_row_' + i,
                    attr12: 'attr12_row_' + i,
                    attr13: 'attr13_row_' + i,
                    attr14: 'attr14_row_' + i,
                    attr15: 'attr15_row_' + i,
                    attr16: 'attr16_row_' + i,
                    attr19: 'attr19_row_' + i,
                    attr20: 'attr20_row_' + i,
                    attr24: 'attr24_row_' + i,
                    attr25: 'attr25_row_' + i
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
    this.loadList(600)
  },
  methods: {
    loadList (size) {
      this.loading = true
      this.mockList(size).then(data => {
        // 使用函数式加载，阻断 vue 对大数据的监听
        const xTable = this.$refs.xTable
        const startTime = Date.now()
        if (xTable) {
          this.$refs.xTable.reloadData(data).then(() => {
            this.$XModal.message({ content: `渲染 ${size} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
            this.loading = false
          })
        }
      })
    },
    mockList (size) {
      return new Promise(resolve => {
        const list = []
        for (let i = 0; i < size; i++) {
          list.push({
            checked: false,
            attr0: 'attr0_row_' + i,
            attr1: 'attr1_row_' + i,
            attr2: 'attr2_row_' + i,
            attr3: 'attr3_row_' + i,
            attr4: 'attr4_row_' + i,
            attr5: 'attr5_row_' + i,
            attr6: i,
            attr7: '' + i,
            attr8: 'attr8_row_' + i,
            attr9: 'attr9_row_' + i,
            attr10: 'attr10_row_' + i,
            attr11: 'attr11_row_' + i,
            attr12: 'attr12_row_' + i,
            attr13: 'attr13_row_' + i,
            attr14: 'attr14_row_' + i,
            attr15: 'attr15_row_' + i,
            attr16: 'attr16_row_' + i,
            attr19: 'attr19_row_' + i,
            attr20: 'attr20_row_' + i,
            attr24: 'attr24_row_' + i,
            attr25: 'attr25_row_' + i
          })
        }
        resolve(list)
      })
    }
  }
}
</script>
