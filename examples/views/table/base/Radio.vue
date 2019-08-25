<template>
  <div>
    <p class="tip">单选表格，用户手动选中时会触发事件 <table-api-link prop="radio-change"/></p>

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
      class="radio-table"
      height="300"
      :data.sync="tableData"
      :row-class-name="rowClassName"
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
      <code class="scss">{{ demoCodes[2] }}</code>
    </pre>

    <p class="tip">
      还可以通过 <table-api-link prop="checkMethod"/> 方法控制 CheckBox 是否允许用户手动选中，还可以配置 <table-api-link prop="labelField"/> 列显示属性<br>
      禁止用户手动选中，但是可以通过函数式调用强制选中，该功能对于某些场景需要强制选中指定行时非常有用
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable2.setRadioRow(tableData[0], true)">设置第一行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.clearRadioRow()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable2"
      height="300"
      :radio-config="{labelField: 'name', checkMethod}"
      :data.sync="tableData">
      <vxe-table-column type="radio" title="请选择" width="100"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
    </pre>

    <p class="tip">默认选中，通过指定 <table-api-link prop="checkRowKey"/> 设置默认选中的行，指定默认值需要有 <table-api-link prop="row-id"/></p>

    <vxe-table
      border
      height="300"
      row-id="id"
      :data.sync="tableData"
      :radio-config="{checkRowKey: '2'}">
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[5] }}</code>
      <code class="javascript">{{ demoCodes[6] }}</code>
    </pre>

    <p class="tip">使用 <table-api-link prop="highlight-current-row"/> 高亮方式</p>

    <vxe-table
      border
      highlight-current-row
      height="300"
      :data.sync="tableData"
      @current-change="currentChangeEvent">
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[7] }}</code>
      <code class="javascript">{{ demoCodes[8] }}</code>
    </pre>

    <p class="tip">两种方式混合使用</p>

    <vxe-table
      border
      highlight-current-row
      height="300"
      :radio-config="{labelField: 'name'}"
      :data.sync="tableData">
      <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[9] }}</code>
      <code class="javascript">{{ demoCodes[10] }}</code>
    </pre>

    <p class="tip">当然也可以两种方式同时使用</p>

    <vxe-table
      border
      highlight-hover-row
      highlight-current-row
      height="300"
      :radio-config="{labelField: 'name', trigger: 'row'}"
      :data.sync="tableData">
      <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[11] }}</code>
      <code class="javascript">{{ demoCodes[12] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
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
          class="radio-table"
          height="300"
          :data.sync="tableData"
          :row-class-name="rowClassName"
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
              tableData: [],
              selectRow: null
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            radioChangeEvent ({ row }) {
              this.selectRow = row
              console.log('单选事件')
            },
            clearRadioRowEevnt () {
              this.selectRow = null
              this.$refs.xTable1.clearRadioRow()
            },
            rowClassName ({ row }) {
              return {
                'row-checked': this.selectRow === row
              }
            },
            getRadioEvent1 () {
              this.$XModal.alert(JSON.stringify(this.$refs.xTable1.getRadioRow()))
            }
          }
        }
        `,
        `
        .radio-table.vxe-table .vxe-body--row.row-checked {
          background-color: #fbf8ec;
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable2.setRadioRow(tableData[0], true)">设置第一行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.clearRadioRow()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable2"
          height="300"
          :radio-config="{labelField: 'name', checkMethod}"
          :data.sync="tableData">
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
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            checkMethod ({ row }) {
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
          :data.sync="tableData"
          :radio-config="{checkRowKey: '2'}">
          <vxe-table-column type="radio" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-current-row
          height="300"
          :data.sync="tableData"
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
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
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
          :data.sync="tableData">
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
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
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
          :data.sync="tableData">
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
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
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
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  methods: {
    checkMethod ({ row }) {
      return row.age > 26
    },
    currentChangeEvent ({ row }) {
      console.log('行选中事件')
    },
    radioChangeEvent ({ row }) {
      this.selectRow = row
      console.log('单选事件')
    },
    clearRadioRowEevnt () {
      this.selectRow = null
      this.$refs.xTable1.clearRadioRow()
    },
    rowClassName ({ row }) {
      return {
        'row-checked': this.selectRow === row
      }
    },
    getRadioEvent1 () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable1.getRadioRow()))
    }
  }
}
</script>

<style lang="scss">
.radio-table.vxe-table .vxe-body--row.row-checked {
  background-color: #fbf8ec;
}
</style>
