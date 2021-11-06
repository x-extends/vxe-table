<template>
  <div>
    <p class="tip">
      当一个表格需要铺满父容器时，通过设置 <table-api-link prop="height"/>=auto 表格会自动根据父容器的高度去铺满，但是只会在数据重新加载时才会计算<br>
      还可以根据不同场景添加 <table-api-link prop="sync-resize"/>（属性监听） 或 <table-api-link prop="auto-resize"/>（父元素监听），这样就只需要通过样式控制父容器高度就可以实现响应式表格
    </p>

    <div style="overflow: hidden; width: 100%; height: 300px">
      <vxe-table
        border
        height="auto"
        :data="tableData">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
        <vxe-column field="address" title="Address" show-overflow></vxe-column>
      </vxe-table>
    </div>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">也可以设置相对于父容器的百分比</p>

    <div style="overflow: hidden; height: 500px">
      <vxe-table
        border
        height="40%"
        :data="tableData">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
        <vxe-column field="address" title="Address" show-overflow></vxe-column>
      </vxe-table>
      <vxe-table
        border
        height="60%"
        :data="tableData">
        <vxe-column type="seq" width="60" fixed="left"></vxe-column>
        <vxe-column field="name" title="Name" width="300"></vxe-column>
        <vxe-column field="sex" title="Sex" width="300"></vxe-column>
        <vxe-column field="age" title="Age" width="300"></vxe-column>
        <vxe-column field="date13" title="Date" width="300"></vxe-column>
        <vxe-column field="address" title="Address" width="200" fixed="right" show-overflow></vxe-column>
      </vxe-table>
    </div>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">设置为 <table-api-link prop="auto-resize"/> 响应式就可以自动跟随父容器宽、高动态变化</p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="tableWidth = '600px'">宽600px</vxe-button>
        <vxe-button @click="tableWidth = '700px'">宽700px</vxe-button>
        <vxe-button @click="tableWidth = '800px'">宽800px</vxe-button>
        <vxe-button @click="tableHeight = '300px'">高300px</vxe-button>
        <vxe-button @click="tableHeight = '500px'">高500px</vxe-button>
        <vxe-button @click="tableHeight = '800px'">高800px</vxe-button>
      </template>
    </vxe-toolbar>

    <div style="overflow: hidden;" :style="{width: tableWidth, height: tableHeight}">
      <vxe-table
        border
        auto-resize
        show-footer
        height="auto"
        :footer-method="footerMethod"
        :data="tableData">
        <vxe-column type="seq" width="60" fixed="left"></vxe-column>
        <vxe-column field="name" title="Name" width="300"></vxe-column>
        <vxe-column field="sex" title="Sex" width="300"></vxe-column>
        <vxe-column field="age" title="Age" width="300"></vxe-column>
        <vxe-column field="date13" title="Date" width="300"></vxe-column>
        <vxe-column field="address" title="Address" width="200" fixed="right" show-overflow></vxe-column>
      </vxe-table>
    </div>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableWidth: null,
      tableHeight: '300px',
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
        <div style="overflow: hidden; width: 100%; height: 300px">
          <vxe-table
            border
            height="auto"
            :data="tableData">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name"></vxe-column>
            <vxe-column field="sex" title="Sex"></vxe-column>
            <vxe-column field="age" title="Age"></vxe-column>
            <vxe-column field="address" title="Address" show-overflow></vxe-column>
          </vxe-table>
        </div>
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
          }
        }
        `,
        `
        <div style="overflow: hidden; height: 500px">
          <vxe-table
            border
            height="40%"
            :data="tableData">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name"></vxe-column>
            <vxe-column field="sex" title="Sex"></vxe-column>
            <vxe-column field="age" title="Age"></vxe-column>
            <vxe-column field="address" title="Address" show-overflow></vxe-column>
          </vxe-table>
          <vxe-table
            border
            height="60%"
            :data="tableData">
            <vxe-column type="seq" width="60" fixed="left"></vxe-column>
            <vxe-column field="name" title="Name" width="300"></vxe-column>
            <vxe-column field="sex" title="Sex" width="300"></vxe-column>
            <vxe-column field="age" title="Age" width="300"></vxe-column>
            <vxe-column field="date13" title="Date" width="300"></vxe-column>
            <vxe-column field="address" title="Address" width="200" fixed="right" show-overflow></vxe-column>
          </vxe-table>
        </div>
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
          }
        }
        `,
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="tableWidth = '600px'">宽600px</vxe-button>
            <vxe-button @click="tableWidth = '700px'">宽700px</vxe-button>
            <vxe-button @click="tableWidth = '800px'">宽800px</vxe-button>
            <vxe-button @click="tableHeight = '300px'">高300px</vxe-button>
            <vxe-button @click="tableHeight = '500px'">高500px</vxe-button>
            <vxe-button @click="tableHeight = '800px'">高800px</vxe-button>
          </template>
        </vxe-toolbar>

        <div style="overflow: hidden;" :style="{width: tableWidth, height: tableHeight}">
          <vxe-table
            border
            auto-resize
            show-footer
            height="auto"
            :footer-method="footerMethod"
            :data="tableData">
            <vxe-column type="seq" width="60" fixed="left"></vxe-column>
            <vxe-column field="name" title="Name" width="300"></vxe-column>
            <vxe-column field="sex" title="Sex" width="300"></vxe-column>
            <vxe-column field="age" title="Age" width="300"></vxe-column>
            <vxe-column field="date13" title="Date" width="300"></vxe-column>
            <vxe-column field="address" title="Address" width="200" fixed="right" show-overflow></vxe-column>
          </vxe-table>
        </div>
        `,
        `
        export default {
          data () {
            return {
              tableWidth: null,
              tableHeight: '300px',
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
            sumNum (list, field) {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            },
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
                      meanCell = parseInt(this.meanNum(data, column.property))
                      sumCell = this.sumNum(data, column.property)
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
  methods: {
    meanNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    sumNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    },
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
              meanCell = parseInt(this.meanNum(data, column.property))
              sumCell = this.sumNum(data, column.property)
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
