<template>
  <div>
    <p class="tip">
      当一个表格需要铺满父容器时，通过设置 <table-api-link prop="height"/>=auto 表格会自动根据父容器的高度去铺满，但是只会在数据重新加载时才会计算<br>
      还可以根据不同场景添加 <table-api-link prop="sync-resize"/>（属性监听） 或 <table-api-link prop="auto-resize"/>（父元素监听），这样就只需要通过样式控制父容器高度就可以实现响应式表格
    </p>

    <div style="width: 100%; height: 300px">
      <vxe-table
        border
        height="auto"
        :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      </vxe-table>
    </div>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">也可以设置相对于父容器的百分比</p>

    <div style="height: 500px">
      <vxe-table
        border
        height="40%"
        :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      </vxe-table>
      <vxe-table
        border
        height="60%"
        :data="tableData">
        <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
        <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
        <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
        <vxe-table-column field="date13" title="Date" width="300"></vxe-table-column>
        <vxe-table-column field="address" title="Address" width="200" fixed="right" show-overflow></vxe-table-column>
      </vxe-table>
    </div>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">设置为 <table-api-link prop="auto-resize"/> 响应式就可以自动跟随父容器宽、高动态变化</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="tableWidth = '600px'">宽600px</vxe-button>
        <vxe-button @click="tableWidth = '700px'">宽700px</vxe-button>
        <vxe-button @click="tableWidth = '800px'">宽800px</vxe-button>
        <vxe-button @click="tableHeight = '300px'">高300px</vxe-button>
        <vxe-button @click="tableHeight = '500px'">高500px</vxe-button>
        <vxe-button @click="tableHeight = '800px'">高800px</vxe-button>
      </template>
    </vxe-toolbar>

    <div :style="{width: tableWidth, height: tableHeight}">
      <vxe-table
        border
        auto-resize
        show-footer
        height="auto"
        :footer-method="footerMethod"
        :data="tableData">
        <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
        <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
        <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
        <vxe-table-column field="date13" title="Date" width="300"></vxe-table-column>
        <vxe-table-column field="address" title="Address" width="200" fixed="right" show-overflow></vxe-table-column>
      </vxe-table>
    </div>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableWidth: null,
      tableHeight: '300px',
      tableData: [],
      demoCodes: [
        `
        <div style="width: 100%; height: 300px">
          <vxe-table
            border
            height="auto"
            :data="tableData">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
          </vxe-table>
        </div>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `,
        `
        <div style="height: 500px">
          <vxe-table
            border
            height="40%"
            :data="tableData">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
          </vxe-table>
          <vxe-table
            border
            height="60%"
            :data="tableData">
            <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
            <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
            <vxe-table-column field="date13" title="Date" width="300"></vxe-table-column>
            <vxe-table-column field="address" title="Address" width="200" fixed="right" show-overflow></vxe-table-column>
          </vxe-table>
        </div>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="tableWidth = '600px'">宽600px</vxe-button>
            <vxe-button @click="tableWidth = '700px'">宽700px</vxe-button>
            <vxe-button @click="tableWidth = '800px'">宽800px</vxe-button>
            <vxe-button @click="tableHeight = '300px'">高300px</vxe-button>
            <vxe-button @click="tableHeight = '500px'">高500px</vxe-button>
            <vxe-button @click="tableHeight = '800px'">高800px</vxe-button>
          </template>
        </vxe-toolbar>

        <div :style="{width: tableWidth, height: tableHeight}">
          <vxe-table
            border
            auto-resize
            show-footer
            height="auto"
            :footer-method="footerMethod"
            :data="tableData">
            <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
            <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
            <vxe-table-column field="date13" title="Date" width="300"></vxe-table-column>
            <vxe-table-column field="address" title="Address" width="200" fixed="right" show-overflow></vxe-table-column>
          </vxe-table>
        </div>
        `,
        `
        export default {
          data () {
            return {
              tableWidth: null,
              tableHeight: '300px',
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            footerMethod ({ columns, data }) {
              const means = []
              const sums = []
              columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                  means.push('平均')
                  sums.push('和值')
                } else {
                  let meanCell = null
                  let sumCell = null
                  switch (column.property) {
                    case 'age':
                    case 'rate':
                      meanCell = parseInt(XEUtils.mean(data, column.property))
                      sumCell = XEUtils.sum(data, column.property)
                      break
                  }
                  means.push(meanCell)
                  sums.push(sumCell)
                }
              })
              // 返回一个二维数组的表尾合计
              return [means, sums]
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    footerMethod ({ columns, data }) {
      const means = []
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push('平均')
          sums.push('和值')
        } else {
          let meanCell = null
          let sumCell = null
          switch (column.property) {
            case 'age':
            case 'rate':
              meanCell = parseInt(XEUtils.mean(data, column.property))
              sumCell = XEUtils.sum(data, column.property)
              break
          }
          means.push(meanCell)
          sums.push(sumCell)
        }
      })
      // 返回一个二维数组的表尾合计
      return [means, sums]
    }
  }
}
</script>
