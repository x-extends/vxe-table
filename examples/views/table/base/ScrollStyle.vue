<template>
  <div>
    <p class="tip">重写默认的滚动条样式，可以自行根据不同浏览器的特性去做修改，简单示例如下：</p>

    <vxe-table
      border
      show-footer
      class="mytable-scrollbar"
      height="400"
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="250"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="250"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="350" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="scss">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          show-footer
          class="mytable-scrollbar"
          height="400"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="250"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="250"></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="350" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age'].includes(column.property)) {
                    return parseInt(XEUtils.sum(data, column.property))
                  }
                  return '-'
                })
              ]
            }
          }
        }
        `,
        `
        /*滚动条整体部分*/
        .mytable-scrollbar div::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        /*滚动条的轨道*/
        .mytable-scrollbar div::-webkit-scrollbar-track {
          background-color: #FFFFFF;
        }
        /*滚动条里面的小方块，能向上向下移动*/
        .mytable-scrollbar div::-webkit-scrollbar-thumb {
          background-color: #bfbfbf;
          border-radius: 5px;
          border: 1px solid #F1F1F1;
          box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        }
        .mytable-scrollbar div::-webkit-scrollbar-thumb:hover {
          background-color: #A8A8A8;
        }
        .mytable-scrollbar div::-webkit-scrollbar-thumb:active {
          background-color: #787878;
        }
        /*边角，即两个滚动条的交汇处*/
        .mytable-scrollbar div::-webkit-scrollbar-corner {
          background-color: #FFFFFF;
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
  },
  methods: {
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age'].includes(column.property)) {
            return parseInt(XEUtils.sum(data, column.property))
          }
          return '-'
        })
      ]
    }
  }
}
</script>

<style>
/*滚动条整体部分*/
.mytable-scrollbar div::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar div::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar div::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar div::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}
.mytable-scrollbar div::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar div::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}
</style>
