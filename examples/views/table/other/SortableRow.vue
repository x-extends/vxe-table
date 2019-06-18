<template>
  <div>
    <p>使用 <a class="link" href="https://www.npmjs.com/package/sortablejs" target="_blank">sortablejs</a> 实现行拖动，由于操作了 Dom 节点所以需要指定 <table-api-link prop="row-key"/></p>

    <vxe-table
      border
      class="sortable-row-demo"
      row-key="id"
      :data.sync="tableData">
      <vxe-table-column width="60">
        <template v-slot:header>
          <el-tooltip class="item" placement="top">
            <div slot="content">按住后可以上下拖动</div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <template>
          <span class="drag-btn">
            <i class="vxe-icon--menu"></i>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

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
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          class="sortable-row-demo"
          row-key="id"
          :data.sync="tableData">
          <vxe-table-column width="60">
            <template v-slot:header>
              <el-tooltip class="item" placement="top">
                <div slot="content">按住后可以上下拖动排序，<br>完成后点击保存即可！</div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <template>
              <i class="el-icon-rank drag-btn"></i>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
            this.rowDrop()
          },
          destroyed () {
            if (this.sortable) {
              this.sortable.destroy()
            }
          },
          methods: {
            rowDrop () {
              this.$nextTick(() => {
                this.sortable = Sortable.create(this.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
                  handle: '.drag-btn',
                  onEnd: ({ newIndex, oldIndex }) => {
                    let currRow = this.tableData.splice(oldIndex, 1)[0]
                    this.tableData.splice(newIndex, 0, currRow)
                  }
                })
              })
            }
          }
        }
        `,
        `
        .sortable-row-demo .drag-btn {
          cursor: move;
          font-size: 12px;
        }
        .sortable-row-demo .vxe-body--row.sortable-ghost,
        .sortable-row-demo .vxe-body--row.sortable-chosen {
          background-color: #dfecfb;
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
    this.rowDrop()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  destroyed () {
    if (this.sortable) {
      this.sortable.destroy()
    }
  },
  methods: {
    rowDrop () {
      this.$nextTick(() => {
        this.sortable = Sortable.create(this.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
          handle: '.drag-btn',
          onEnd: ({ newIndex, oldIndex }) => {
            let currRow = this.tableData.splice(oldIndex, 1)[0]
            this.tableData.splice(newIndex, 0, currRow)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.sortable-row-demo .drag-btn {
  cursor: move;
  font-size: 12px;
}
.sortable-row-demo .vxe-body--row.sortable-ghost,
.sortable-row-demo .vxe-body--row.sortable-chosen {
  background-color: #dfecfb;
}
</style>
