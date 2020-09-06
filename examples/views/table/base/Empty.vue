<template>
  <div>
    <p class="tip">当数据为空时，通过 <table-column-api-link prop="empty-text"/> 设置空数据提示文本，可以使用 <router-link class="link" :to="{name: 'RendererEmpty'}">渲染器</router-link> 实现全局复用</p>

    <vxe-table
      empty-text="没有更多数据了！"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">可以通过 slot=<table-api-link prop="empty"/> 自定义提示语</p>

    <vxe-table
      border
      :loading="loading"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      <template v-slot:empty>
        <span style="color: red;">
          <img src="static/other/img2.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">出现滚动条</p>

    <vxe-table
      border
      height="300"
      :loading="loading"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
      <template v-slot:empty>
        <span style="color: red;">
          <img src="static/other/img1.gif">
          <p>不用再看了，没有更多数据了！</p>
        </span>
      </template>
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
      tableData2: [],
      demoCodes: [
        `
        <vxe-table
          empty-text="没有更多数据了！"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
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
            setTimeout(() => {
              this.tableData = []
            }, 1000)
          }
        }
        `,
        `
        <vxe-table
          border
          :loading="loading"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
          <template v-slot:empty>
            <span style="color: red;">
              <img src="static/other/img2.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: []
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.tableData = []
              this.loading = false
            }, 1000)
          }
        }
        `,
        `
        <vxe-table
          border
          height="300"
          :loading="loading"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
          <template v-slot:empty>
            <span style="color: red;">
              <img src="static/other/img1.gif">
              <p>不用再看了，没有更多数据了！</p>
            </span>
          </template>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: []
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.tableData = []
              this.loading = false
            }, 1000)
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.tableData = []
      this.loading = false
    }, 1000)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
