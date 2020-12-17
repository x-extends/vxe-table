<template>
  <div>
    <p class="tip">
      虚拟滚动<span class="orange">（最大可以支撑 5w 列、30w 行）</span><br>
      高性能的虚拟渲染，默认情况下，如果设置了 <table-api-link prop="height"/>、<table-api-link prop="max-height"/> 则会根据触发规则自动启用虚拟渲染，触发规则由 <table-api-link prop="scroll-x"/>.<table-api-link prop="gt"/> | <table-api-link prop="scroll-y"/>.<table-api-link prop="gt"/> 设置。虚拟滚动启用后只会渲染指定范围内的可视区数据，其他的数据将被卷去收起，当滚动到可视区时才被渲染出来<br>
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
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">
      手动调优，对于低性能的浏览器可以通过设置 <table-api-link prop="oSize"/> 偏移量来缓解渲染次数，偏移量越大渲染次数就越少，但是每次渲染的耗时就越久<br>
      通过指定 <table-api-link prop="scroll-x"/>={gt: 20} 或 <table-api-link prop="scroll-y"/>={gt: 40} 适合的参数可以手动调优，如果设置 <table-api-link prop="enabled"/>=false 则关闭虚拟滚动<br>
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
      <pre-code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
        | Page Up | 向上翻页滚动 |
        | Page Down | 向下翻页滚动 |
        | Spacebar | 翻页滚动 |
        | Home | 滚动到顶部 |
        | End | 滚动到底部 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

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
            this.mockList(500).then(data => {
              this.tableData = data
            })
          },
          methods: {
            mockList (size) {
              return new Promise(resolve => {
                const list = []
                for (let index = 0; index < size; index++) {
                  list.push({
                    name: \`名称\${index}\`,
                    sex: '0',
                    num: 123,
                    age: 18,
                    num2: 234,
                    rate: 3,
                    address: 'shenzhen'
                  })
                }
                resolve(list)
              })
            }
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
            this.mockList(500).then(data => {
              this.tableData = data
            })
          },
          methods: {
            mockList (size) {
              return new Promise(resolve => {
                const list = []
                for (let index = 0; index < size; index++) {
                  list.push({
                    name: \`名称\${index}\`,
                    sex: '0',
                    num: 123,
                    age: 18,
                    num2: 234,
                    rate: 3,
                    address: 'shenzhen'
                  })
                }
                resolve(list)
              })
            },
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
    this.mockList(500).then(data => {
      this.tableData = data
    })
    this.mockList(200).then(data => {
      this.tableData2 = data
    })
  },
  methods: {
    mockList (size) {
      return new Promise(resolve => {
        const list = []
        for (let index = 0; index < size; index++) {
          list.push({
            name: `名称${index}`,
            sex: '0',
            num: 123,
            age: 18,
            num2: 234,
            rate: 3,
            address: 'shenzhen'
          })
        }
        resolve(list)
      })
    },
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
