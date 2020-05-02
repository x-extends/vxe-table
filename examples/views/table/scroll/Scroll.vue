<template>
  <div>
    <p class="tip">
      <span class="orange">虚拟滚动（最大可以支撑 5w 列、30w 行）</span><br>
      如果列较多建议使用 <grid-api-link name="vxe-grid"/>，使渲染性能达到最优，虚拟滚动只会渲染可视区域的数据，对于海量数据的性能提升非常大<br>
      数据超大情况下必须使用：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/>，<table-api-link prop="show-footer-overflow"/> 参数<br>
      <span class="red">（注：启用纵向虚拟滚的后不支持动态行高，如果要支持动态行高，将虚拟滚动关闭即可）</span>
    </p>

    <vxe-table
      border
      show-overflow
      highlight-hover-row
      height="300"
      :sort-config="{trigger: 'cell'}"
      :data="tableData">
      <vxe-table-column type="seq" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">
      手动调优，默认自动优化（<span class="red">注：如果启用横向虚拟滚动，当列不确定大小时应该设置 <table-api-link prop="scroll-x"/>.<table-api-link prop="rSize"/> 来避免出现空白区域</span>）<br>
      通过指定 <table-api-link prop="scroll-x"/>={gt: 20} 或 <table-api-link prop="scroll-y"/>={gt: 40} 适合的参数可以手动调优，如果为 0 则总是启用，如果为 -1 关闭虚拟滚动<br>
      数据超大情况下必须使用：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/>，<table-api-link prop="show-footer-overflow"/> 参数
    </p>

    <vxe-table
      border
      show-overflow
      show-header-overflow
      show-footer-overflow
      show-footer
      ref="xTable"
      height="300"
      :sort-config="{trigger: 'cell'}"
      :footer-method="footerMethod"
      :scroll-x="{gt: 10}"
      :scroll-y="{gt: 100}"
      :data="tableData2">
      <vxe-table-column type="seq" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="150" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="100"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="num" title="Num" width="100"></vxe-table-column>
      <vxe-table-column field="num2" title="Num2" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="150" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="100"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="date3" title="Date" width="200" show-overflow></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="100"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="num2" title="Num2" width="100"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="150" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="100"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="num" title="Num" width="100"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="100"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="num2" title="Num2" width="100"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="150" sortable></vxe-table-column>
      <vxe-table-column field="date3" title="Date" width="200" show-overflow></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="100"></vxe-table-column>
      <vxe-table-column field="num" title="Num" width="100"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
    </vxe-table>

    <pre>
      <code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
        | Page Up | 向上翻页滚动 |
        | Page Down | 向下翻页滚动 |
        | Spacebar | 翻页滚动 |
        | Home | 滚动到顶部 |
        | End | 滚动到底部 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      tableData2: [],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          highlight-hover-row
          height="300"
          :sort-config="{trigger: 'cell'}"
          :data="tableData">
          <vxe-table-column type="seq" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            XEAjax.mockList(500).then(data => {
              this.tableData = data
            })
          }
        }
        `,
        `
        <vxe-table
          border
          show-overflow
          show-header-overflow
          show-footer-overflow
          show-footer
          ref="xTable"
          height="300"
          :sort-config="{trigger: 'cell'}"
          :footer-method="footerMethod"
          :scroll-x="{gt: 10}"
          :scroll-y="{gt: 100}"
          :data="tableData2">
          <vxe-table-column type="seq" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="150" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="100"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
          <vxe-table-column field="num" title="Num" width="100"></vxe-table-column>
          <vxe-table-column field="num2" title="Num2" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="150" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="100"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
          <vxe-table-column field="date3" title="Date" width="200" show-overflow></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="100"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
          <vxe-table-column field="num2" title="Num2" width="100"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="150" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="100"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
          <vxe-table-column field="num" title="Num" width="100"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="100"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
          <vxe-table-column field="num2" title="Num2" width="100"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="150" sortable></vxe-table-column>
          <vxe-table-column field="date3" title="Date" width="200" show-overflow></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="100"></vxe-table-column>
          <vxe-table-column field="num" title="Num" width="100"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            XEAjax.mockList(200).then(data => {
              this.tableData = data
            })
          },
          methods: {
            footerMethod ({ columns, data }) {
              // 返回一个二维数组的表尾合计
              console.log(data.length)
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  switch (column.property) {
                    case 'age':
                    case 'rate':
                    case 'num':
                    case 'num2':
                      return parseInt(XEUtils.mean(data, column.property))
                  }
                  return '无'
                })
              ]
            }
          }
        }
        `
      ]
    }
  },
  created () {
    XEAjax.mockList(500).then(data => {
      this.tableData = data
    })
    XEAjax.mockList(200).then(data => {
      this.tableData2 = data
    })
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    footerMethod ({ columns, data }) {
      // 返回一个二维数组的表尾合计
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          switch (column.property) {
            case 'age':
            case 'rate':
            case 'num':
            case 'num2':
              return parseInt(XEUtils.mean(data, column.property))
          }
          return '无'
        })
      ]
    }
  }
}
</script>
