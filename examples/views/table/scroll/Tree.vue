<template>
  <div>
    <p class="tip">虚拟树的使用</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree.setAllTreeExpansion(false)">收起所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-virtual-tree
      resizable
      show-overflow
      row-key
      ref="xTree"
      height="500"
      :loading="loading"
      :data="tableData"
      :tree-config="{children: 'children'}"
      :columns="tableColumn">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
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
      tableColumn: [
        { type: 'index', title: '序号', width: 100 },
        { field: 'name', title: 'Name', treeNode: true },
        { field: 'id', title: '邮政编码' },
        { field: 'date', title: '更新时间' }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree.setAllTreeExpansion(false)">收起所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-virtual-tree
          resizable
          show-overflow
          row-key
          ref="xTree"
          height="500"
          :loading="loading"
          :data="tableData"
          :tree-config="{children: 'children'}"
          :columns="tableColumn">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              tableColumn: [
                { type: 'index', title: '序号', width: 100 },
                { field: 'name', title: 'Name', treeNode: true },
                { field: 'id', title: '邮政编码' },
                { field: 'date', title: '更新时间' }
              ]
            }
          },
          created () {
            this.findCityAll()
          },
          methods: {
            findCityAll () {
              this.loading = true
              this.$ajax.getJSON('/api/conf/city/all').then(data => {
                this.tableData = data
                this.loading = false
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findCityAll()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findCityAll () {
      this.loading = true
      this.$ajax.getJSON('/api/conf/city/all').then(data => {
        this.tableData = data
        this.loading = false
      })
    }
  }
}
</script>
