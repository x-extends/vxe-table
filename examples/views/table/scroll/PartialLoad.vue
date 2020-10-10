<template>
  <div>
    <p class="tip">局部递增数据</p>

    <vxe-toolbar :loading="loading">
      <template v-slot:buttons>
        <vxe-button @click="loadList(20)">+20条</vxe-button>
        <vxe-button @click="loadList(100)">+100条</vxe-button>
        <vxe-button @click="loadList(500)">+500条</vxe-button>
        <vxe-button @click="loadList(1000)">+1000条</vxe-button>
        <vxe-button @click="loadList(2000)">+2000条</vxe-button>
        <vxe-button @click="$refs.xTable.scrollTo(null, 4000)">y=4000</vxe-button>
        <vxe-button @click="$refs.xTable.clearScroll()">清除滚动状态</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      resizable
      show-overflow
      height="500"
      row-id="id"
      :loading="loading">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
      <vxe-table-column field="address" title="Address"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      demoCodes: [
        `
        <vxe-toolbar :loading="loading">
          <template v-slot:buttons>
            <vxe-button @click="loadList(20)">+20条</vxe-button>
            <vxe-button @click="loadList(100)">+100条</vxe-button>
            <vxe-button @click="loadList(500)">+500条</vxe-button>
            <vxe-button @click="loadList(1000)">+1000条</vxe-button>
            <vxe-button @click="loadList(2000)">+2000条</vxe-button>
            <vxe-button @click="$refs.xTable.scrollTo(null, 4000)">y=4000</vxe-button>
            <vxe-button @click="$refs.xTable.clearScroll()">清除滚动状态</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          resizable
          show-overflow
          height="500"
          row-id="id"
          :loading="loading">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
          <vxe-table-column field="address" title="Address"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          created () {
            // 动态定义，阻断 vue 对大数据双向绑定，提升加载速度
            this.allData = []
            this.loadList(600)
          },
          methods: {
            loadList (size) {
              this.loading = true
              this.findList(size).then(data => {
                this.allData = this.allData.concat(data)// 局部追加并保存所有数据
                const xTable = this.$refs.xTable
                if (xTable) {
                  xTable.loadData(this.allData)
                }
                this.loading = false
              })
            },
            findList (size) {
              return new Promise(resolve => {
                setTimeout(() => {
                  var list = []
                  for (var index = 0; index < size; index++) {
                    list.push({
                      id: XEUtils.uniqueId(),
                      name: 'test' + index,
                      role: 'developer',
                      age: 10,
                      date: '2019-05-01',
                      address: 'address abc' + index
                    })
                  }
                  resolve(list)
                }, 250)
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    // 动态定义，阻断 vue 对大数据双向绑定，提升加载速度
    this.allData = []
    this.loadList(600)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    loadList (size) {
      this.loading = true
      this.findList(size).then(data => {
        this.allData = this.allData.concat(data)// 局部追加并保存所有数据
        const xTable = this.$refs.xTable
        if (xTable) {
          xTable.loadData(this.allData)
        }
        this.loading = false
      })
    },
    findList (size) {
      return new Promise(resolve => {
        setTimeout(() => {
          const list = []
          for (let index = 0; index < size; index++) {
            list.push({
              id: XEUtils.uniqueId(),
              name: 'test' + index,
              role: 'developer',
              age: 10,
              date: '2019-05-01',
              address: 'address abc' + index
            })
          }
          resolve(list)
        }, 250)
      })
    }
  }
}
</script>
