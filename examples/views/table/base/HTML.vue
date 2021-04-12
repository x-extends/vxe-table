<template>
  <div>
    <p class="tip">
      设置 <table-column-api-link prop="type"/>=<table-column-api-link prop="html"/> 显示为 HTML 标签，不支持和其他功能列共存<br>
      <span class="red">（动态渲染任意 HTML 是非常危险的，很容易导致 <a class="link" href="https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC">XSS</a> 攻击，请确保内容是可信的）</span>
    </p>

    <vxe-table
      border
      :data="demo1.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column
        field="describeHtml"
        title="<span class=red>HTML 标签与筛选</span>"
        type="html"
        sort-by="describe"
        sortable
        :filters="[{label:'包含 aa', value: 'aa'}, {label:'包含 bb', value: 'bb'}]"
        :filter-method="filterDescribeMethod">
      </vxe-table-column>
      <vxe-table-column field="role" type="html" title="<span class=green>HTML 标签与格式化</span>" :formatter="formatRole"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeColumnPropTypes } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { name: 'xx1', describe: '字母 aa -1', describeHtml: '<span style="color: red">字母 <span style="color: blue">aa</span> -1</span>', role: 'oo1' },
        { name: 'xx2', describe: '字母 bb -2', describeHtml: '<span style="color: blue">字母 <span style="color: green">bb</span> -2</span>', role: 'oo2' },
        { name: 'xx3', describe: '字母 cc -3', describeHtml: '<span style="color: green">字母 <span style="color: red">cc</span> -3</span>', role: 'oo3' },
        { name: 'xx4', describe: '字母 dd -4', describeHtml: '<span style="color: blue">字母 <span style="color: green">dd</span> -4</span>', role: 'oo4' }
      ]
    })

    const formatRole: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
      return `<a href="https://github.com/x-extends/vxe-table" class="link" target="_black" style="color: orange">链接 ${cellValue}</a>`
    }

    const filterDescribeMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
      return XEUtils.toValueString(row.html1).indexOf(value) > -1
    }

    return {
      demo1,
      formatRole,
      filterDescribeMethod,
      demoCodes: [
        `
        <vxe-table
          border
          :data="demo1.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column
            field="describeHtml"
            title="<span class=red>HTML 标签与筛选</span>"
            type="html"
            sort-by="describe"
            sortable
            :filters="[{label:'包含 aa', value: 'aa'}, {label:'包含 bb', value: 'bb'}]"
            :filter-method="filterDescribeMethod">
          </vxe-table-column>
          <vxe-table-column field="role" type="html" title="<span class=green>HTML 标签与格式化</span>" :formatter="formatRole"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeColumnPropTypes } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { name: 'xx1', describe: '字母 aa -1', describeHtml: '<span style="color: red">字母 <span style="color: blue">aa</span> -1</span>', role: 'oo1' },
                { name: 'xx2', describe: '字母 bb -2', describeHtml: '<span style="color: blue">字母 <span style="color: green">bb</span> -2</span>', role: 'oo2' },
                { name: 'xx3', describe: '字母 cc -3', describeHtml: '<span style="color: green">字母 <span style="color: red">cc</span> -3</span>', role: 'oo3' },
                { name: 'xx4', describe: '字母 dd -4', describeHtml: '<span style="color: blue">字母 <span style="color: green">dd</span> -4</span>', role: 'oo4' }
              ]
            })

            const formatRole: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
              return \`<a href="https://github.com/x-extends/vxe-table" class="link" target="_black" style="color: orange">链接 \${cellValue}</a>\`
            }

            const filterDescribeMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
              return XEUtils.toValueString(row.html1).indexOf(value) > -1
            }

            return {
              demo1,
              formatRole,
              filterDescribeMethod
            }
          }
        })
        `
      ]
    }
  }
})
</script>
