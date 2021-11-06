<template>
  <div>
    <p class="tip">
      重写默认的滚动条样式，可以自行根据不同浏览器的特性去做修改，简单示例如下：<br>
      <span class="red">（组件不支持改动原生滚动条，各种兼容性问题可自行实现，该示例仅供参考）</span>
    </p>

    <vxe-table
      border
      show-footer
      class="mytable-scrollbar"
      height="400"
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-column type="seq" width="60" fixed="left"></vxe-column>
      <vxe-column field="name" title="Name" width="300"></vxe-column>
      <vxe-column field="sex" title="Sex" width="250"></vxe-column>
      <vxe-column field="age" title="Age" width="250"></vxe-column>
      <vxe-column field="role" title="Role" width="300"></vxe-column>
      <vxe-column field="address" title="Address" width="350" show-overflow></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="scss">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          show-footer
          class="mytable-scrollbar"
          height="400"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-column type="seq" width="60" fixed="left"></vxe-column>
          <vxe-column field="name" title="Name" width="300"></vxe-column>
          <vxe-column field="sex" title="Sex" width="250"></vxe-column>
          <vxe-column field="age" title="Age" width="250"></vxe-column>
          <vxe-column field="role" title="Role" width="300"></vxe-column>
          <vxe-column field="address" title="Address" width="350" show-overflow></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
              ]
            }
          },
          methods: {
            meanNum (list, field) {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age'].includes(column.property)) {
                    return parseInt(this.meanNum(data, column.property))
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
        .mytable-scrollbar ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        /*滚动条的轨道*/
        .mytable-scrollbar ::-webkit-scrollbar-track {
          background-color: #FFFFFF;
        }
        /*滚动条里面的小方块，能向上向下移动*/
        .mytable-scrollbar ::-webkit-scrollbar-thumb {
          background-color: #bfbfbf;
          border-radius: 5px;
          border: 1px solid #F1F1F1;
          box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        }
        .mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
          background-color: #A8A8A8;
        }
        .mytable-scrollbar ::-webkit-scrollbar-thumb:active {
          background-color: #787878;
        }
        /*边角，即两个滚动条的交汇处*/
        .mytable-scrollbar ::-webkit-scrollbar-corner {
          background-color: #FFFFFF;
        }
        `
      ]
    }
  },
  methods: {
    meanNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age'].includes(column.property)) {
            return parseInt(this.meanNum(data, column.property))
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
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}
</style>
