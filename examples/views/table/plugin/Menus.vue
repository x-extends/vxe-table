<template>
  <div>
    <p class="tip">具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-menus" target="_blank">vxe-table-plugin-menus</a> 插件的 API</p>

    <vxe-table
      border
      :data.sync="tableData"
      :context-menu="{body: {options: bodyMenus}}"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

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
      tableData: [],
      bodyMenus: [
        [
          {
            code: 'EXPORT_ALL',
            name: '导出.csv'
          },
          {
            code: 'INSERT_ACTIVED_ROW',
            name: '新增'
          },
          {
            code: 'INSERT_ACTIVED_ROW',
            name: '新增2',
            params: [
              [{ name: '默认值 Name' }],
              ['sex']
            ]
          }
        ]
      ],
      demoCodes: [
        `
        <vxe-table
          border
          :data.sync="tableData"
          :context-menu="{body: {options: bodyMenus}}"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              bodyMenus: [
                [
                  {
                    code: 'EXPORT_ALL',
                    name: '导出.csv'
                  },
                  {
                    code: 'INSERT_ACTIVED_ROW',
                    name: '新增'
                  },
                  {
                    code: 'INSERT_ACTIVED_ROW',
                    name: '新增2',
                    params: [
                      [{ name: '默认值 Name' }],
                      ['sex']
                    ]
                  }
                ]
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 5)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 5)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
