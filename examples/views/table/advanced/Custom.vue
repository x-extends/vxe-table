<template>
  <div>
    <p class="tip">
      通过 <table-column-api-link prop="visible"/> 属性设置默认是否显示，也可以通过函数式调用 <table-api-link prop="showColumn"/>、<table-api-link prop="hideColumn"/> 操作列的显示/隐藏<br>
      还可以通过动态修改列的 visible 属性，可以实现远程读取配置后控制是否显示，最后调用 <table-api-link prop="refreshColumn"/> 刷新列
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable1.hideColumn($refs.xTable1.getColumnByField('role'))">隐藏role</vxe-button>
        <vxe-button @click="$refs.xTable1.showColumn($refs.xTable1.getColumnByField('role'))">显示role</vxe-button>
        <vxe-button @click="$refs.xTable1.showColumn($refs.xTable1.getColumnByField('sex'))">显示sex</vxe-button>
        <vxe-button @click="$refs.xTable1.resetColumn()">重置</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable1"
      height="200"
      :data="tableData">
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :visible="false"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">如果是根据服务端数据控制显示/隐藏列，在获取到配置信息后动态更改列的 <table-column-api-link prop="visible"/> 属性，然后调用 <table-api-link prop="refreshColumn"/> 属性列即可</p>

    <p>
      <template v-for="(column,index) in columns2">
        <vxe-checkbox v-model="column.visible" :key="index" @change="$refs.xTable2.refreshColumn()">{{ column.title }}</vxe-checkbox>
      </template>
    </p>

    <vxe-table
      border
      ref="xTable2"
      height="200"
      :loading="loading"
      :data="tableData">
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">通过 <table-column-api-link prop="visible"/> 属性设置默认是否显示，通过 <table-api-link prop="resetColumn"/> 函数重置全部列为可视状态</p>

    <p>
      <template v-for="(column,index) in columns3">
        <vxe-checkbox v-if="column.title" v-model="column.visible" :key="index">{{ column.title }}</vxe-checkbox>
      </template>
      <vxe-button @click="$refs.xTable3.refreshColumn()">刷新列信息</vxe-button>
      <vxe-button @click="$refs.xTable3.resetColumn()">重置自定义列</vxe-button>
    </p>

    <vxe-table
      border
      ref="xTable3"
      height="300"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :visible="false"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column title="基本信息">
        <vxe-table-column field="sex" title="Sex" :visible="false"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column title="其他信息">
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
          <vxe-table-column field="flag" title="Flag"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>

    <p class="tip">实现折叠列</p>

    <vxe-table
      border
      ref="xTable4"
      height="200"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="200">
        <template v-slot:header>
          <i :class="collapsable1 ? 'fa fa-minus-square' : 'fa fa-plus-square'" @click="collapsable1Event"></i>
          <span>Name</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="role" title="Role" :visible="false" width="200"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :visible="false" width="200"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="200">
        <template v-slot:header>
          <i :class="collapsable2 ? 'fa fa-minus-square' : 'fa fa-plus-square'" @click="collapsable2Event"></i>
          <span>Age</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="rate" title="Rate" :visible="false" width="200"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :visible="false" width="200"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      collapsable1: false,
      collapsable2: false,
      columns2: [],
      columns3: [],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable1.hideColumn($refs.xTable1.getColumnByField('role'))">隐藏role</vxe-button>
            <vxe-button @click="$refs.xTable1.showColumn($refs.xTable1.getColumnByField('role'))">显示role</vxe-button>
            <vxe-button @click="$refs.xTable1.showColumn($refs.xTable1.getColumnByField('sex'))">显示sex</vxe-button>
            <vxe-button @click="$refs.xTable1.resetColumn()">重置</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable1"
          height="200"
          :data="tableData">
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :visible="false"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            }
          }
        }
        `,
        `
        <p>
          <template v-for="(column,index) in columns2">
            <vxe-checkbox v-model="column.visible" :key="index" @change="$refs.xTable2.refreshColumn()">{{ column.title }}</vxe-checkbox>
          </template>
        </p>

        <vxe-table
          border
          ref="xTable2"
          height="200"
          :loading="loading"
          :data="tableData">
          <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              columns: [],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            }
          },
          created () {
            // 获取所有列配置
            this.$nextTick(() => {
              this.columns = this.$refs.xTable2.getColumns()
            })
            this.loading = true
            setTimeout(() => {
              // 将指定列设置为隐藏状态
              this.columns.forEach(column => {
                if (['name'].includes(column.property)) {
                  column.visible = false
                }
              })
              if (this.$refs.xTable2) {
                this.$refs.xTable2.refreshColumn()
              }
              this.loading = false
            }, 800)
          }
        }
        `,
        `
        <p>
          <template v-for="(column,index) in columns3">
            <vxe-checkbox v-if="column.title" v-model="column.visible" :key="index">{{ column.title }}</vxe-checkbox>
          </template>
          <vxe-button @click="$refs.xTable3.refreshColumn()">刷新列信息</vxe-button>
          <vxe-button @click="$refs.xTable3.resetColumn()">重置自定义列</vxe-button>
        </p>

        <vxe-table
          border
          ref="xTable3"
          height="300"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :visible="false"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column title="基本信息">
            <vxe-table-column field="sex" title="Sex" :visible="false"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column title="其他信息">
              <vxe-table-column field="rate" title="Rate"></vxe-table-column>
              <vxe-table-column field="flag" title="Flag"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              columns: [],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            }
          },
          created () {
            // 获取所有列配置
            this.$nextTick(() => {
              this.columns = this.$refs.xTable3.getColumns()
            })
          }
        }
        `,
        `
        <vxe-table
          border
          ref="xTable4"
          height="200"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="200">
            <template v-slot:header>
              <i :class="collapsable1 ? 'fa fa-minus-square' : 'fa fa-plus-square'" @click="collapsable1Event"></i>
              <span>Name</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="Role" :visible="false" width="200"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :visible="false" width="200"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="200">
            <template v-slot:header>
              <i :class="collapsable2 ? 'fa fa-minus-square' : 'fa fa-plus-square'" @click="collapsable2Event"></i>
              <span>Age</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="rate" title="Rate" :visible="false" width="200"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :visible="false" width="200"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              columns: [],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            }
          },
          methods: {
            collapsable1Event () {
              const fields = ['role', 'sex']
              this.collapsable1 = !this.collapsable1
              const xTable4 = this.$refs.xTable4
              fields.forEach(field => {
                const column = xTable4.getColumnByField(field)
                column.visible = this.collapsable1
              })
              xTable4.refreshColumn()
            },
            collapsable2Event () {
              const fields = ['rate', 'address']
              this.collapsable2 = !this.collapsable2
              const xTable4 = this.$refs.xTable4
              fields.forEach(field => {
                const column = xTable4.getColumnByField(field)
                column.visible = this.collapsable2
              })
              xTable4.refreshColumn()
            }
          }
        }
        `
      ]
    }
  },
  created () {
    // 获取所有列配置
    this.$nextTick(() => {
      this.columns2 = this.$refs.xTable2.getColumns()
      this.columns3 = this.$refs.xTable3.getColumns()
    })
    this.loading = true
    this.tableData = window.MOCK_DATA_LIST.slice(0, 8)
    setTimeout(() => {
      // 将指定列设置为隐藏状态
      this.columns2.forEach(column => {
        if (['name'].includes(column.property)) {
          column.visible = false
        }
      })
      if (this.$refs.xTable2) {
        this.$refs.xTable2.refreshColumn()
      }
      this.loading = false
    }, 800)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    collapsable1Event () {
      const fields = ['role', 'sex']
      this.collapsable1 = !this.collapsable1
      const xTable4 = this.$refs.xTable4
      fields.forEach(field => {
        const column = xTable4.getColumnByField(field)
        column.visible = this.collapsable1
      })
      xTable4.refreshColumn()
    },
    collapsable2Event () {
      const fields = ['rate', 'address']
      this.collapsable2 = !this.collapsable2
      const xTable4 = this.$refs.xTable4
      fields.forEach(field => {
        const column = xTable4.getColumnByField(field)
        column.visible = this.collapsable2
      })
      xTable4.refreshColumn()
    }
  }
}
</script>
