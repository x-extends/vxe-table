<template>
  <div>
    <p class="tip">
      虚拟滚动<span class="orange">（最大可以支撑 5w 列、30w 行）</span><br>
      高性能的虚拟渲染，通过设置 <table-api-link prop="height"/>、<table-api-link prop="max-height"/> 即可启用虚拟渲染，只会渲染可指定范围内的可视区数据，其他的数据将被卷去收起，当滚动到可视区时才显示出来<br>
      如果列较多建议使用 <grid-api-link name="vxe-grid"/>，使渲染性能达到最优，虚拟滚动只会渲染可视区域的数据，对于海量数据的性能提升非常大<br>
      <span class="red">（注：启用虚拟滚动后：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/>，<table-api-link prop="show-footer-overflow"/> 参数将根据不同场景各自触发生效，无法取消；如果需要支持，将虚拟滚动关闭即可）</span>
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
      手动调优，对于低性能的浏览器可以通过设置 <table-api-link prop="oSize"/> 偏移量来缓解渲染次数，偏移量越大渲染次数就越少，但是每次渲染的耗时就越久<br>
      通过指定 <table-api-link prop="scroll-x"/>={gt: 20} 或 <table-api-link prop="scroll-y"/>={gt: 40} 适合的参数可以手动调优，如果为 0 则总是启用，如果为 -1 关闭虚拟滚动<br>
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
      <vxe-table-column field="attr19" title="Name" width="150" sortable></vxe-table-column>
      <vxe-table-column field="attr18" title="Sex" width="100"></vxe-table-column>
      <vxe-table-column field="attr17" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="date3" title="Date" width="200" show-overflow></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="100"></vxe-table-column>
      <vxe-table-column field="attr16" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="attr15" title="Num2" width="100"></vxe-table-column>
      <vxe-table-column field="attr14" title="Sex" width="100"></vxe-table-column>
      <vxe-table-column field="attr13" title="Name" width="150" sortable></vxe-table-column>
      <vxe-table-column field="attr12" title="Sex" width="100"></vxe-table-column>
      <vxe-table-column field="attr11" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="attr1" title="Num" width="100"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
      <vxe-table-column field="attr2" title="Role" width="100"></vxe-table-column>
      <vxe-table-column field="attr3" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="attr4" title="Num2" width="100"></vxe-table-column>
      <vxe-table-column field="attr5" title="Rate" width="100"></vxe-table-column>
      <vxe-table-column field="attr6" title="Name" width="150" sortable></vxe-table-column>
      <vxe-table-column field="attr7" title="Date" width="200" show-overflow></vxe-table-column>
      <vxe-table-column field="attr8" title="Role" width="100"></vxe-table-column>
      <vxe-table-column field="attr9" title="Num" width="100"></vxe-table-column>
      <vxe-table-column field="attr10" title="Address" width="200" show-overflow></vxe-table-column>
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
          <vxe-table-column field="attr19" title="Name" width="150" sortable></vxe-table-column>
          <vxe-table-column field="attr18" title="Sex" width="100"></vxe-table-column>
          <vxe-table-column field="attr17" title="Age" width="100"></vxe-table-column>
          <vxe-table-column field="date3" title="Date" width="200" show-overflow></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="100"></vxe-table-column>
          <vxe-table-column field="attr16" title="Age" width="100"></vxe-table-column>
          <vxe-table-column field="attr15" title="Num2" width="100"></vxe-table-column>
          <vxe-table-column field="attr14" title="Sex" width="100"></vxe-table-column>
          <vxe-table-column field="attr13" title="Name" width="150" sortable></vxe-table-column>
          <vxe-table-column field="attr12" title="Sex" width="100"></vxe-table-column>
          <vxe-table-column field="attr11" title="Age" width="100"></vxe-table-column>
          <vxe-table-column field="attr1" title="Num" width="100"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
          <vxe-table-column field="attr2" title="Role" width="100"></vxe-table-column>
          <vxe-table-column field="attr3" title="Age" width="100"></vxe-table-column>
          <vxe-table-column field="attr4" title="Num2" width="100"></vxe-table-column>
          <vxe-table-column field="attr5" title="Rate" width="100"></vxe-table-column>
          <vxe-table-column field="attr6" title="Name" width="150" sortable></vxe-table-column>
          <vxe-table-column field="attr7" title="Date" width="200" show-overflow></vxe-table-column>
          <vxe-table-column field="attr8" title="Role" width="100"></vxe-table-column>
          <vxe-table-column field="attr9" title="Num" width="100"></vxe-table-column>
          <vxe-table-column field="attr10" title="Address" width="200" show-overflow></vxe-table-column>
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
