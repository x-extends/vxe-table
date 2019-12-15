<template>
  <div>
    <p class="tip">自定义列头排序的实现，你可以把表格封装成子组件进行定制，通过 <table-column-api-link prop="slot"/> 非常简单就可以实现自定义排序</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      highlight-current-row
      class="my-sort"
      ref="xTable"
      height="300"
      :data="tableData"
      @header-cell-click="headerCellClickEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10', value: 10}, {label: 'id大于40', value: 40}]" :filter-method="filterNameMethod">
        <template v-slot:header="{ column }">
          <span>{{ column.title }}</span>
          <span class="custom-sort" :class="{'is-order': column.order}">
            <i class="fa" :class="[column.order ? `fa-sort-alpha-${column.order}` : 'fa-long-arrow-down']"></i>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable>
        <template v-slot:header="{ column }">
          <span>{{ column.title }}</span>
          <span class="custom-sort" :class="{'is-order': column.order}">
            <i class="fa" :class="[column.order ? `fa-sort-numeric-${column.order}` : 'fa-long-arrow-down']"></i>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="amount" title="Amount" formatter="commafy" sortable>
        <template v-slot:header="{ column }">
          <span>{{ column.title }}</span>
          <span class="custom-sort" :class="{'is-order': column.order}">
            <i class="fa" :class="[column.order ? `fa-sort-amount-${column.order}` : 'fa-long-arrow-down']"></i>
          </span>
        </template>
      </vxe-table-column>
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

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          highlight-current-row
          class="my-sort"
          ref="xTable"
          height="300"
          :data="tableData"
          @header-cell-click="headerCellClickEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10', value: 10}, {label: 'id大于40', value: 40}]" :filter-method="filterNameMethod">
            <template v-slot:header="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" :class="{'is-order': column.order}">
                <i class="fa" :class="[column.order ? \`fa-sort-alpha-\${column.order}\` : 'fa-long-arrow-down']"></i>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable>
            <template v-slot:header="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" :class="{'is-order': column.order}">
                <i class="fa" :class="[column.order ? \`fa-sort-numeric-\${column.order}\` : 'fa-long-arrow-down']"></i>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="amount" title="Amount" formatter="commafy" sortable>
            <template v-slot:header="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" :class="{'is-order': column.order}">
                <i class="fa" :class="[column.order ? \`fa-sort-amount-\${column.order}\` : 'fa-long-arrow-down']"></i>
              </span>
            </template>
          </vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            headerCellClickEvent ({ column, triggerResizable, triggerSort, triggerFilter }) {
              // 如果点击了列并且没触发对应的按钮、则手动排序、列宽拖动
              if (column.sortable && !(triggerResizable || triggerSort || triggerFilter)) {
                this.$refs.xTable.sort(column.property)
              }
            },
            filterNameMethod ({ value, row, column }) {
              return row.id >= value
            }
          }
        }
        `,
        `
        .my-sort .vxe-sort-wrapper {
          display: none;
        }
        .my-sort .vxe-header--column.is--sortable {
          cursor: pointer;
          user-select: none;
        }
        .my-sort .custom-sort {
          padding: 0 4px;
        }
        .my-sort .custom-sort.is-order {
          color: #409eff;
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    headerCellClickEvent ({ column, triggerResizable, triggerSort, triggerFilter }) {
      // 如果点击了列并且没触发对应的按钮、则手动排序、列宽拖动
      if (column.sortable && !(triggerResizable || triggerSort || triggerFilter)) {
        this.$refs.xTable.sort(column.property)
      }
    },
    filterNameMethod ({ value, row, column }) {
      return row.id >= value
    }
  }
}
</script>

<style>
.my-sort .vxe-sort-wrapper {
  display: none;
}
.my-sort .vxe-header--column.is--sortable {
  cursor: pointer;
  user-select: none;
}
.my-sort .custom-sort {
  padding: 0 4px;
}
.my-sort .custom-sort.is-order {
  color: #409eff;
}
</style>
