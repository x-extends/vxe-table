<template>
  <div>
    <p class="tip">
      <grid-api-link name="vxe-grid"/> 高级表格，解决动态数据一切需求（动态列、动态数据、动态个性化...）<br>
      渲染性能对比：<grid-api-link name="vxe-grid"/>（性能最优，不需要为每一列创建实例） > <table-api-link name="vxe-table"/>（性能略差，需要为每一列创建实例）<br>
      通过 <grid-api-link prop="columns"/> 动态配置列信息，这非常适用于动态渲染的场景，完全使用数据进行配置
    </p>

    <vxe-grid
      border
      resizable
      toolbar
      height="300"
      :align="allAlign"
      :columns="tableColumn"
      :data="tableData">
      <template v-slot:buttons>
        <vxe-button @click="allAlign = 'left'">居左</vxe-button>
        <vxe-button @click="allAlign = 'center'">居中</vxe-button>
        <vxe-button @click="allAlign = 'right'">居右</vxe-button>
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
      allAlign: null,
      tableColumn: [
        { type: 'index', width: 50 },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          height="300"
          :columns="tableColumn"
          :data="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              allAlign: null,
              tableColumn: [
                { type: 'index', width: 50 },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
