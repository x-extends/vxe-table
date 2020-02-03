<template>
  <div>
    <h2>{{ $t('app.aside.nav.tooltip') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'tooltip'}}">API</router-link></p>

    <p>
      <vxe-tooltip content="我是提示内容">
        <a class="link">文字提示</a>
      </vxe-tooltip>
    </p>

    <p>
      <vxe-tooltip content="除了点击之外不会自动消息" trigger="click">
        <vxe-button>点击触发</vxe-button>
      </vxe-tooltip>
      <vxe-tooltip content="hover 提示内容">
        <vxe-button>Hover 触发</vxe-button>
      </vxe-tooltip>
      <vxe-tooltip content="鼠标可以进入到 tooltip 中" enterable>
        <vxe-button>设置 Enterable</vxe-button>
      </vxe-tooltip>
    </p>

    <p>
      <vxe-tooltip v-model="value1" content="自定义提示内容" trigger="manual">
        <vxe-button @mouseenter="value1 = true" @mouseleave="value1 = false">手动模式</vxe-button>
      </vxe-tooltip>
    </p>

    <p>
      <vxe-tooltip ref="myTip"></vxe-tooltip>
      <vxe-button @mouseenter="$refs.myTip.toVisible($event.target, '自定义提示内容')" @mouseleave="$refs.myTip.close()">高性能模式，只创建一个实例</vxe-button>
    </p>

    <p>
      <vxe-tooltip ref="xTip"></vxe-tooltip>
      <vxe-table
        border
        height="200"
        :data="tableData"
        @cell-mouseenter="cellMouseenterEvent"
        @cell-mouseleave="cellMouseleaveEvent">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data  () {
    return {
      value1: false,
      tableData: [],
      demoCodes: [
        `
        <p>
          <vxe-tooltip content="我是提示内容">
            <a class="link">文字提示</a>
          </vxe-tooltip>
        </p>

        <p>
          <vxe-tooltip content="除了点击之外不会自动消息" trigger="click">
            <vxe-button>点击触发</vxe-button>
          </vxe-tooltip>
          <vxe-tooltip content="hover 提示内容">
            <vxe-button>Hover 触发</vxe-button>
          </vxe-tooltip>
          <vxe-tooltip content="鼠标可以进入到 tooltip 中" enterable>
            <vxe-button>设置 Enterable</vxe-button>
          </vxe-tooltip>
        </p>

        <p>
          <vxe-tooltip v-model="value1" content="自定义提示内容" trigger="manual">
            <vxe-button @mouseenter="value1 = true" @mouseleave="value1 = false">手动模式</vxe-button>
          </vxe-tooltip>
        </p>

        <p>
          <vxe-tooltip ref="myTip"></vxe-tooltip>
          <vxe-button @mouseenter="$refs.myTip.toVisible($event.target, '自定义提示内容')" @mouseleave="$refs.myTip.close()">高性能模式，只创建一个实例</vxe-button>
        </p>

        <p>
          <vxe-tooltip ref="xTip"></vxe-tooltip>
          <vxe-table
            border
            height="200"
            :data="tableData"
            @cell-mouseenter="cellMouseenterEvent"
            @cell-mouseleave="cellMouseleaveEvent">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
          </vxe-table>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: false
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 8)
          },
          methods: {
            cellMouseenterEvent ({ row, column, cell }) {
              this.$refs.xTip.toVisible(cell, \`自定义提示内容：\${cell.innerText}\`)
            },
            cellMouseleaveEvent ({ row, column, cell }) {
              this.$refs.xTip.close()
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 8)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    cellMouseenterEvent ({ row, column, cell }) {
      this.$refs.xTip.toVisible(cell, `自定义提示内容：${cell.innerText}`)
    },
    cellMouseleaveEvent ({ row, column, cell }) {
      this.$refs.xTip.close()
    }
  }
}
</script>
