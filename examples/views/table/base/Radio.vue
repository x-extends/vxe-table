<template>
  <div>
    <p class="tip">单选表格，用户手动选中时会触发事件 <table-api-link prop="radio-change"/>，还通过 <table-api-link prop="highlight"/> 设置高亮选中行</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable1.setRadioRow(tableData[1])">设置第二行选中</vxe-button>
        <vxe-button @click="clearRadioRowEevnt">取消选中</vxe-button>
        <vxe-button @click="getRadioEvent1">获取选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable1"
      height="300"
      :data="tableData"
      :radio-config="{highlight: true}"
      @cell-click="cellClickEvent"
      @radio-change="radioChangeEvent">
      <vxe-table-column type="radio" width="60">
        <template v-slot:header>
          <vxe-button type="text" @click="clearRadioRowEevnt" :disabled="!selectRow">取消</vxe-button>
        </template>
      </vxe-table-column>
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
      还可以通过 <table-api-link prop="checkMethod"/> 方法控制 checkbox 是否允许用户手动选中，还可以配置 <table-api-link prop="labelField"/> 列显示属性
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable2.setRadioRow(tableData[0])">设置第一行选中（如果被禁用，不可选中）</vxe-button>
        <vxe-button @click="$refs.xTable2.setRadioRow(tableData[1])">设置第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.clearRadioRow()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable2"
      height="300"
      :radio-config="{labelField: 'name', checkMethod: checkRadioMethod}"
      :data="tableData">
      <vxe-table-column type="radio" title="请选择" width="100"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">
      默认选中，通过指定 <table-api-link prop="checkRowKey"/> 设置默认选中的行，指定默认值需要有 <table-api-link prop="row-id"/><br>
      <span class="red">（注：默认行为只会在 reload 之后触发一次）</span>
    </p>

    <vxe-table
      border
      height="300"
      row-id="id"
      :data="tableData"
      :radio-config="{checkRowKey: defaultSelecteRow}">
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column field="id" title="ID"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>

    <p class="tip">使用 <table-api-link prop="highlight-current-row"/> 高亮方式</p>

    <vxe-table
      border
      highlight-current-row
      height="300"
      :data="tableData"
      @current-change="currentChangeEvent">
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>

    <p class="tip">两种方式混合使用</p>

    <vxe-table
      border
      highlight-current-row
      height="300"
      :radio-config="{labelField: 'name'}"
      :data="tableData">
      <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[8] }}</code>
      <code class="javascript">{{ demoCodes[9] }}</code>
    </pre>

    <p class="tip">当然也可以两种方式同时使用</p>

    <vxe-table
      border
      highlight-hover-row
      highlight-current-row
      height="300"
      :radio-config="{labelField: 'name', trigger: 'row'}"
      :data="tableData">
      <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[10] }}</code>
      <code class="javascript">{{ demoCodes[11] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
      ],
      defaultSelecteRow: 10002,
      selectRow: null,
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable1.setRadioRow(tableData[1])">设置第二行选中</vxe-button>
            <vxe-button @click="clearRadioRowEevnt">取消选中</vxe-button>
            <vxe-button @click="getRadioEvent1">获取选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable1"
          height="300"
          :data="tableData"
          :radio-config="{highlight: true}"
          @cell-click="cellClickEvent"
          @radio-change="radioChangeEvent">
          <vxe-table-column type="radio" width="60">
            <template v-slot:header>
              <vxe-button type="text" @click="clearRadioRowEevnt" :disabled="!selectRow">取消</vxe-button>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ],
              selectRow: null
            }
          },
          methods: {
            cellClickEvent () {
              console.log('单元格点击事件')
            },
            radioChangeEvent ({ row }) {
              this.selectRow = row
              console.log('单选事件')
            },
            clearRadioRowEevnt () {
              this.selectRow = null
              this.$refs.xTable1.clearRadioRow()
            },
            getRadioEvent1 () {
              this.$XModal.alert(JSON.stringify(this.$refs.xTable1.getRadioRecord()))
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable2.setRadioRow(tableData[0])">设置第一行选中（如果被禁用，不可选中）</vxe-button>
            <vxe-button @click="$refs.xTable2.setRadioRow(tableData[1])">设置第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.clearRadioRow()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable2"
          height="300"
          :radio-config="{labelField: 'name', checkMethod: checkRadioMethod}"
          :data="tableData">
          <vxe-table-column type="radio" title="请选择" width="100"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          },
          methods: {
            checkRadioMethod ({ row }) {
              return row.age > 26
            }
          }
        }
        `,
        `
        <vxe-table
          border
          height="300"
          row-id="id"
          :data="tableData"
          :radio-config="{checkRowKey: defaultSelecteRow}">
          <vxe-table-column type="radio" width="60"></vxe-table-column>
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              defaultSelecteRow: 10002,
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-current-row
          height="300"
          :data="tableData"
          @current-change="currentChangeEvent">
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          },
          methods: {
            currentChangeEvent ({ row }) {
              console.log('行选中事件')
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-current-row
          height="300"
          :radio-config="{labelField: 'name'}"
          :data="tableData">
          <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          highlight-current-row
          height="300"
          :radio-config="{labelField: 'name', trigger: 'row'}"
          :data="tableData">
          <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
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
    checkRadioMethod ({ row }) {
      return row.age > 26
    },
    cellClickEvent () {
      console.log('单元格点击事件')
    },
    currentChangeEvent ({ rowIndex }) {
      console.log(`行选中事件 ${rowIndex}`)
    },
    radioChangeEvent ({ row }) {
      this.selectRow = row
      console.log('单选事件')
    },
    clearRadioRowEevnt () {
      this.selectRow = null
      this.$refs.xTable1.clearRadioRow()
    },
    getRadioEvent1 () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable1.getRadioRecord()))
    }
  }
}
</script>
