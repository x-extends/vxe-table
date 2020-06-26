<template>
  <div>
    <p class="tip">具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-renderer" target="_blank">vxe-table-plugin-renderer</a> 插件的 API</p>

    <vxe-grid
      border
      height="460"
      class="vxe-table-x-renderer"
      :loading="loading"
      :data="tableData"
      :columns="tableColumn"
      :edit-config="{trigger: 'click', mode: 'cell'}"></vxe-grid>

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
        { type: 'checkbox', width: 60 },
        { type: 'seq', title: 'Number', width: 80 },
        {
          field: 'name',
          title: 'Name',
          editRender: {
            name: 'XTextarea'
          }
        },
        {
          field: 'role',
          title: 'Role',
          showOverflow: true,
          editRender: {
            name: 'XTextarea'
          }
        },
        {
          field: 'nickname',
          title: 'Nickname',
          editRender: {
            name: 'XInput'
          }
        },
        {
          field: 'sex',
          title: 'Sex',
          editRender: {
            name: 'XInput',
            props: {
              suffixIcon: 'vxe-icon--more'
            }
          }
        }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          height="460"
          class="vxe-table-x-renderer"
          :loading="loading"
          :data="tableData"
          :columns="tableColumn"
          :edit-config="{trigger: 'click', mode: 'cell'}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              tableColumn: [
                { type: 'checkbox', width: 60 },
                { type: 'seq', title: 'Number', width: 80 },
                {
                  field: 'name',
                  title: 'Name',
                  editRender: {
                    name: 'XTextarea'
                  }
                },
                {
                  field: 'role',
                  title: 'Role',
                  showOverflow: true,
                  editRender: {
                    name: 'XTextarea'
                  }
                },
                {
                  field: 'nickname',
                  title: 'Nickname',
                  editRender: {
                    name: 'XInput'
                  }
                },
                {
                  field: 'sex',
                  title: 'Sex',
                  editRender: {
                    name: 'XInput',
                    props: {
                      suffixIcon: 'vxe-icon--more'
                    }
                  }
                }
              ]
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
              this.loading = false
            }, 500)
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
      this.loading = false
    }, 500)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
