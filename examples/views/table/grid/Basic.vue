<template>
  <div>
    <p class="tip">
      <grid-api-link name="vxe-grid"/> 高级表格：一个包含表单、工具栏、基础表格、分页...等全功能的组件<br>
      通过 <grid-api-link prop="columns"/> 可配置化，适用于动态渲染的场景，再配合 <router-link class="link" :to="{name: 'GridConfigProxy'}">数据代理</router-link> ，甚至可以非常简单的用一个 json 数据就能渲染一个完整表格
    </p>

    <vxe-grid
      border
      resizable
      height="300"
      :align="allAlign"
      :loading="loading"
      :columns="tableColumn"
      :toolbar="{slots: {buttons: 'toolbar_buttons'}}"
      :data="tableData">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="allAlign = 'left'">居左</vxe-button>
        <vxe-button @click="allAlign = 'center'">居中</vxe-button>
        <vxe-button @click="allAlign = 'right'">居右</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      allAlign: null,
      loading: false,
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          height="300"
          :align="allAlign"
          :loading="loading"
          :columns="tableColumn"
          :toolbar="{slots: {buttons: 'toolbar_buttons'}}"
          :data="tableData">
          <template v-slot:toolbar_buttons>
            <vxe-button @click="allAlign = 'left'">居左</vxe-button>
            <vxe-button @click="allAlign = 'center'">居中</vxe-button>
            <vxe-button @click="allAlign = 'right'">居右</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              allAlign: null,
              loading: false,
              tableColumn: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              tableData: []
            }
          },
          created () {
            this.loading = true
            XEAjax.mockList(50).then(data => {
              this.tableData = data
              this.loading = false
            })
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    XEAjax.mockList(50).then(data => {
      this.tableData = data
      this.loading = false
    })
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
