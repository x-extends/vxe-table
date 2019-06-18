<template>
  <div>
    <p>使用 <a class="link" href="https://www.npmjs.com/package/sortablejs" target="_blank">sortablejs</a> 实现列移动，由于操作了 Dom 节点所以需要指定 <table-column-api-link prop="column-key"/></p>

    <vxe-grid
      border
      class="sortable-column-demo"
      :columns="tableColumn"
      :data.sync="tableData"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import Sortable from 'sortablejs'

export default {
  data () {
    return {
      tableColumn: [
        { prop: 'name', label: 'Name', columnKey: 'name' },
        { prop: 'role', label: 'Role', columnKey: 'role' },
        { prop: 'sex', label: 'Sex', columnKey: 'sex' },
        { prop: 'date3', label: 'Date', columnKey: 'date3', width: 120 },
        { prop: 'address', label: 'Address', columnKey: 'address', showOverflow: true }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          :columns="tableColumn"
          :data.sync="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { prop: 'name', label: 'Name', columnKey: 'name' },
                { prop: 'role', label: 'Role', columnKey: 'role' },
                { prop: 'sex', label: 'Sex', columnKey: 'sex' },
                { prop: 'date3', label: 'Date', columnKey: 'date3', width: 120 },
                { prop: 'address', label: 'Address', columnKey: 'address', showOverflow: true }
              ],
              tableData: []
            }
          },
          destroyed () {
            if (this.sortable) {
              this.sortable.destroy()
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            columnDrop () {
              this.$nextTick(() => {
                this.sortable = Sortable.create(this.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
                  handle: '.vxe-header--column',
                  onEnd: ({ newIndex, oldIndex }) => {
                    let currRow = this.tableColumn.splice(oldIndex, 1)[0]
                    this.tableColumn.splice(newIndex, 0, currRow)
                  }
                })
              })
            }
          }
        }
        `,
        `
        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
          background-color: #dfecfb;
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
    this.columnDrop()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    columnDrop () {
      this.$nextTick(() => {
        this.sortable = Sortable.create(this.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
          handle: '.vxe-header--column',
          onEnd: ({ newIndex, oldIndex }) => {
            let currRow = this.tableColumn.splice(oldIndex, 1)[0]
            this.tableColumn.splice(newIndex, 0, currRow)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
  background-color: #dfecfb;
}
</style>
