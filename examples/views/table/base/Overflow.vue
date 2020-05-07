<template>
  <div>
    <p class="tip">
      当内容溢出时显示为省略号，<table-column-api-link prop="show-overflow"/> 和 <table-api-link prop="show-header-overflow"/> 和 <table-api-link prop="show-footer-overflow"/><br>
      <table-column-api-link prop="ellipsis"/> 当内容溢出时显示为省略号<br>
      <table-column-api-link prop="title"/> 当内容溢出时显示为省略号并用原生 title 显示<br>
      <table-column-api-link prop="tooltip"/> 当内容溢出时显示为省略号并用 tooltip 显示<br>
    </p>

    <vxe-table
      show-footer
      highlight-hover-row
      :footer-method="footerMethod"
      :data="tableData1">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="名称" show-overflow="ellipsis"></vxe-table-column>
      <vxe-table-column field="role" title="角色" show-overflow></vxe-table-column>
      <vxe-table-column field="date" title="标题溢出，显示为 tooltip xxxxxxxxxx" show-header-overflow show-overflow="title" show-footer-overflow></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" show-header-overflow="title">
        <template v-slot:header>
          <span>标题显示原生 title ___________________________</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="address" title="不换行不换行不换行不换行不换行不换行不换行不换行不换行" width="160"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">
      通过设置 <table-api-link prop="contentMethod"/> 方法重写默认的提示内容，显示逻辑完全自定义控制，可以返回 null 使用默认的提示消息<br>
      还可以通过 <table-api-link prop="enterable"/> 开启鼠标是否可进入到 tooltip 中
    </p>

    <vxe-table
      border
      show-footer
      show-header-overflow
      highlight-hover-row
      :footer-method="footerMethod"
      :data="tableData2"
      :tooltip-config="{contentMethod: showTooltipMethod, enterable: true}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="名称"></vxe-table-column>
      <vxe-table-column field="role" title="标题溢出直接隐藏 xxxxxxxxxxxxxxxxxxxxxxxxxxx" show-header-overflow="ellipsis"></vxe-table-column>
      <vxe-table-column field="date" title="Date" show-header-overflow show-overflow show-footer-overflow></vxe-table-column>
      <vxe-table-column title="基本信息">
        <vxe-table-column field="rate" show-header-overflow="title">
          <template v-slot:header>
            <span>标题溢出显示原生 title xxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
          </template>
        </vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column type="html" field="address" title="标题溢出显示tooltip内容内容内容内容内容内容" width="160" show-header-overflow show-overflow></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData1: [
        { name: 'Test1', role: '前端', date: '内容显示原生 title', rate: 5, address: 'address1' },
        { name: '内容超出隐藏，不显示提示信息xxxxxxxxxxxxxxxxxxx', role: '后端', date: '2020-02-22', rate: 2, address: 'address2\ntooltip文本换行\n换行xx' },
        { name: 'Test3', role: '内容超出一行显示为 tooltip xxxxxxxxxxxxxx', date: '2020-01-01', rate: 0, address: 'address3\ntooltip文本换行\n换行xx' },
        { name: 'Test4', role: '设计师', date: '2020-02-23', rate: 1, address: 'address4' },
        { name: 'Test5', role: '前端', date: '2020-01-20', rate: 3, address: 'address5\ntooltip文本换行\n换行xx' }
      ],
      tableData2: [
        { name: 'Test1', role: '前端', date: '不管是否超出都显示 tooltip', rate: 5, address: '支持多行超出显示 tooltip xxxxxxxxxxxxxxx<br>html换行<br>换行xx' },
        { name: 'Test2', role: '后端', date: '2020-02-22', rate: 2, address: 'address2' },
        { name: 'Test3', role: '前端', date: '2020-01-01', rate: 0, address: '支持多行超出显示 tooltip xxxxxxxxxxxxxxx<br>html换行<br>支持多行超出显示 tooltip xxxxxxxxxxxxxxx' },
        { name: 'Test4', role: '设计师', date: '2020-02-23', rate: 1, address: 'address4<br>html换行<br>换行xx' },
        { name: 'Test5', role: '前端', date: '2020-01-20', rate: 3, address: 'address5 xxxxxxxxxxxxxxxxxxxxxx<br>html换行<br>换行xx' }
      ],
      demoCodes: [
        `
        <vxe-table
          show-footer
          highlight-hover-row
          :footer-method="footerMethod"
          :data="tableData1">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="名称" show-overflow="ellipsis"></vxe-table-column>
          <vxe-table-column field="role" title="角色" show-overflow></vxe-table-column>
          <vxe-table-column field="date" title="标题溢出，显示为 tooltip xxxxxxxxxx" show-header-overflow show-overflow="title" show-footer-overflow></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" show-header-overflow="title">
            <template v-slot:header>
              <span>标题显示原生 title ___________________________</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="address" title="不换行不换行不换行不换行不换行不换行不换行不换行不换行" width="160"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData1: [
                { name: 'Test1', role: '前端', date: '内容显示原生 title', rate: 5, address: 'address1' },
                { name: '内容超出隐藏，不显示提示信息xxxxxxxxxxxxxxxxxxx', role: '后端', date: '2020-02-22', rate: 2, address: 'address2\\ntooltip文本换行\\n换行xx' },
                { name: 'Test3', role: '内容超出一行显示为 tooltip xxxxxxxxxxxxxx', date: '2020-01-01', rate: 0, address: 'address3\\ntooltip文本换行\\n换行xx' },
                { name: 'Test4', role: '设计师', date: '2020-02-23', rate: 1, address: 'address4' },
                { name: 'Test5', role: '前端', date: '2020-01-20', rate: 3, address: 'address5\\ntooltip文本换行\\n换行xx' }
              ]
            }
          },
          methods:{
            footerMethod ({ columns }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '合计'
                  }
                  if (['date'].includes(column.property)) {
                    return '说明 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                  }
                  if (['rate'].includes(column.property)) {
                    return '不想换行不想换行不想换行不想换行不想换行不想换行不想换行不想换行'
                  }
                  return null
                })
              ]
              return footerData
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-footer
          show-header-overflow
          highlight-hover-row
          :footer-method="footerMethod"
          :data="tableData2"
          :tooltip-config="{contentMethod: showTooltipMethod, enterable: true}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="名称"></vxe-table-column>
          <vxe-table-column field="role" title="标题溢出直接隐藏 xxxxxxxxxxxxxxxxxxxxxxxxxxx" show-header-overflow="ellipsis"></vxe-table-column>
          <vxe-table-column field="date" title="Date" show-header-overflow show-overflow show-footer-overflow></vxe-table-column>
          <vxe-table-column title="基本信息">
            <vxe-table-column field="rate" show-header-overflow="title">
              <template v-slot:header>
                <span>标题溢出显示原生 title xxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
              </template>
            </vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column type="html" field="address" title="标题溢出显示tooltip内容内容内容内容内容内容" width="160" show-header-overflow show-overflow></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData2: [
                { name: 'Test1', role: '前端', date: '不管是否超出都显示 tooltip', rate: 5, address: '支持多行超出显示 tooltip xxxxxxxxxxxxxxx<br>html换行<br>换行xx' },
                { name: 'Test2', role: '后端', date: '2020-02-22', rate: 2, address: 'address2' },
                { name: 'Test3', role: '前端', date: '2020-01-01', rate: 0, address: '支持多行超出显示 tooltip xxxxxxxxxxxxxxx<br>html换行<br>支持多行超出显示 tooltip xxxxxxxxxxxxxxx' },
                { name: 'Test4', role: '设计师', date: '2020-02-23', rate: 1, address: 'address4<br>html换行<br>换行xx' },
                { name: 'Test5', role: '前端', date: '2020-01-20', rate: 3, address: 'address5 xxxxxxxxxxxxxxxxxxxxxx<br>html换行<br>换行xx' }
              ]
            }
          },
          methods:{
            showTooltipMethod ({ type, column, row, items, _columnIndex }) {
              // 重写默认的提示内容
              if (column.property === 'date') {
                if (type === 'header') {
                  return '自定义标题提示内容：' + column.title
                } else if (type === 'footer') {
                  return '自定义表尾提示内容：' + items[_columnIndex]
                }
                return '自定义提示内容：' + row[column.property]
              }
            },
            footerMethod ({ columns }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '合计'
                  }
                  if (['date'].includes(column.property)) {
                    return '说明 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                  }
                  if (['rate'].includes(column.property)) {
                    return '不想换行不想换行不想换行不想换行不想换行不想换行不想换行不想换行'
                  }
                  return null
                })
              ]
              return footerData
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    showTooltipMethod ({ type, column, row, items, _columnIndex }) {
      // 重写默认的提示内容
      if (column.property === 'date') {
        if (type === 'header') {
          return '自定义标题提示内容：' + column.title
        } else if (type === 'footer') {
          return '自定义表尾提示内容：' + items[_columnIndex]
        }
        return '自定义提示内容：' + row[column.property]
      }
    },
    footerMethod ({ columns }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          if (['date'].includes(column.property)) {
            return '说明 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
          }
          if (['rate'].includes(column.property)) {
            return '不想换行不想换行不想换行不想换行不想换行不想换行不想换行不想换行'
          }
          return null
        })
      ]
      return footerData
    }
  }
}
</script>
