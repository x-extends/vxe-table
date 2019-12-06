<template>
  <div>
    <p class="tip">
      通过 <table-api-link prop="customs"/> 来双向绑定列配置，通过 <table-column-api-link prop="visible"/> 属性设置默认是否显示<br>
      也可以通过函数式调用 <table-api-link prop="showColumn"/>、<table-api-link prop="hideColumn"/> 操作列的显示/隐藏<br>
      还可以通过动态修改列的 visible 属性，可以轻松实现远程读取配置后控制是否显示，最后调用 <table-api-link prop="refreshColumn"/> 刷新列
    </p>

    <div>
      <template v-for="(column,index) in columns1">
        <vxe-checkbox v-model="column.visible" :key="index" @change="$refs.xTable1.refreshColumn()">{{ column.title }}</vxe-checkbox>
      </template>
    </div>

    <vxe-table
      border
      ref="xTable1"
      height="200"
      :data="tableData"
      :customs.sync="columns1">
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">如果是根据服务端数据控制显示/隐藏列，在获取到配置信息后动态更改列的 <table-column-api-link prop="visible"/> 属性，然后调用 <table-api-link prop="refreshColumn"/> 属性列即可</p>

    <div>
      <template v-for="(column,index) in columns2">
        <vxe-checkbox v-model="column.visible" :key="index" @change="$refs.xTable2.refreshColumn()">{{ column.title }}</vxe-checkbox>
      </template>
    </div>

    <vxe-table
      border
      ref="xTable2"
      height="200"
      :loading="loading"
      :data="tableData"
      :customs.sync="columns2">
      <vxe-table-column type="index" title="序号" width="60"></vxe-table-column>
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

    <p class="tip">通过 <table-column-api-link prop="visible"/> 属性设置默认是否显示，通过 <table-api-link prop="resetCustoms"/> 函数重置全部列为可视状态</p>

    <div>
      <template v-for="(column,index) in columns3">
        <vxe-checkbox v-if="column.title" v-model="column.visible" :key="index">{{ column.title }}</vxe-checkbox>
      </template>
      <vxe-button @click="$refs.xTable3.refreshColumn()">刷新列信息</vxe-button>
      <vxe-button @click="$refs.xTable3.resetCustoms()">重置自定义列</vxe-button>
    </div>

    <vxe-table
      border
      ref="xTable3"
      height="300"
      :data="tableData"
      :customs.sync="columns3">
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
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      columns1: [],
      columns2: [],
      columns3: [],
      demoCodes: [
        `
        <div>
          <template v-for="(column,index) in columns">
            <vxe-checkbox v-model="column.visible" :key="index" @change="$refs.xTable.refreshColumn()">{{ column.title }}</vxe-checkbox>
          </template>
        </div>

        <vxe-table
          border
          ref="xTable"
          height="200"
          :data="tableData"
          :customs.sync="columns">
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
              tableData: [],
              columns: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `,
        `
        <div>
          <template v-for="(column,index) in columns">
            <vxe-checkbox v-model="column.visible" :key="index" @change="$refs.xTable.refreshColumn()">{{ column.title }}</vxe-checkbox>
          </template>
        </div>

        <vxe-table
          border
          ref="xTable"
          height="200"
          :loading="loading"
          :data="tableData"
          :customs.sync="columns">
          <vxe-table-column type="index" title="序号" width="60"></vxe-table-column>
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
              tableData: [],
              columns: []
            }
          },
          created () {
            this.loading = true
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
            setTimeout(() => {
              // 将指定列设置为隐藏状态
              this.columns.forEach(column => {
                if (['name'].includes(column.property)) {
                  column.visible = false
                }
              })
              this.$refs.xTable.refreshColumn()
              this.loading = false
            }, 800)
          }
        }
        `,
        `
        <div>
          <template v-for="(column,index) in columns">
            <vxe-checkbox v-if="column.title" v-model="column.visible" :key="index">{{ column.title }}</vxe-checkbox>
          </template>
          <vxe-button @click="$refs.xTable.refreshColumn()">刷新列信息</vxe-button>
          <vxe-button @click="$refs.xTable.resetCustoms()">重置自定义列</vxe-button>
        </div>

        <vxe-table
          border
          ref="xTable"
          height="300"
          :data="tableData"
          :customs.sync="columns">
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
              tableData: [],
              columns: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
    setTimeout(() => {
      // 将指定列设置为隐藏状态
      this.columns2.forEach(column => {
        if (['name'].includes(column.property)) {
          column.visible = false
        }
      })
      this.$refs.xTable2.refreshColumn()
      this.loading = false
    }, 800)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
