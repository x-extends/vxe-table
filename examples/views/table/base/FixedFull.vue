<template>
  <div>
    <p class="tip">横纵内容过多时，同时固定列和表头</p>

    <vxe-table
      border
      resizable
      height="300"
      highlight-hover-row
      :data="tableData">
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
      <vxe-table-column title="操作" fixed="right" width="200">
        <template>
          <vxe-button type="text">按钮1</vxe-button>
          <vxe-button type="text">按钮2</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">固定列建议设置 <table-api-link prop="show-overflow"/> 该值，禁用自动换行，大幅提升渲染速度</p>

    <vxe-table
      border
      height="300"
      highlight-hover-row
      show-overflow
      :data="tableData">
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
      <vxe-table-column title="操作" fixed="right" width="200">
        <template>
          <vxe-button status="primary">按钮1</vxe-button>
          <vxe-button>按钮2</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <pre>
      <code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
        | Page Up | 向上翻页滚动 |
        | Page Down | 向下翻页滚动 |
        | Spacebar | 翻页滚动 |
        | Home | 滚动到顶部 |
        | End | 滚动到底部 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">
      <span class="red">分组表头</span>
    </p>

    <vxe-table
      border
      height="400"
      :data="tableData">
      <vxe-table-column title="基本信息" fixed="left">
        <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
        <vxe-table-column field="name" title="Name" fixed="left" width="180"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="更多信息">
        <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
          <vxe-table-column field="num" title="Num" width="200"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="额外信息" fixed="right">
        <vxe-table-column field="date3" title="Date" fixed="right" width="140"></vxe-table-column>
        <vxe-table-column field="address" title="Address" fixed="right" width="200" show-overflow></vxe-table-column>
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
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          height="300"
          highlight-hover-row
          :data="tableData">
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
          <vxe-table-column title="操作" fixed="right" width="200">
            <template>
              <vxe-button type="text">按钮1</vxe-button>
              <vxe-button type="text">按钮2</vxe-button>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `,
        `
        <vxe-table
          border
          height="300"
          highlight-hover-row
          show-overflow
          :data="tableData">
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
          <vxe-table-column title="操作" fixed="right" width="200">
            <template>
              <vxe-button status="primary">按钮1</vxe-button>
              <vxe-button>按钮2</vxe-button>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `,
        `
        <vxe-table
          border
          height="400"
          :data="tableData">
          <vxe-table-column title="基本信息" fixed="left">
            <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column field="name" title="Name" fixed="left" width="180"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="更多信息">
            <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
              <vxe-table-column field="num" title="Num" width="200"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="额外信息" fixed="right">
            <vxe-table-column field="date3" title="Date" fixed="right" width="140"></vxe-table-column>
            <vxe-table-column field="address" title="Address" fixed="right" width="200" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
