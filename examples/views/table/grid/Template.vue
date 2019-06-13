<template>
  <div>
    <p>使用自定义模板渲染，通过 slots 属性编写 JSX 模板或 VNode</p>
    <p>default：显示内容（建议优先使用 formatter）</p>
    <p>header：显示表头</p>
    <p>edit：编辑内容（建议使用渲染器）</p>

    <vxe-grid
      border
      height="400"
      :columns="tableColumn"
      :data.sync="tableData">
    </vxe-grid>

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
      tableColumn: [
        { type: 'index', width: 50 },
        {
          prop: 'name',
          label: 'Name',
          slots: {
            default: ({ row }) => {
              return [
                <span style="color: red;">{ row.name }</span>
              ]
            }
          }
        },
        {
          prop: 'sex',
          label: 'Sex',
          showHeaderOverflow: true,
          slots: {
            header: ({ column }) => {
              return [
                <span>
                  <i>@</i>
                  <span style="color: red;">{ column.label }</span>
                </span>
              ]
            }
          }
        },
        {
          prop: 'address',
          label: 'Address',
          showOverflow: true,
          slots: {
            default: ({ row }) => {
              let h = this.$createElement
              return [
                h('span', {
                  style: {
                    color: 'blue'
                  }
                }, row.address)
              ]
            }
          }
        }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          height="400"
          :columns="tableColumn"
          :data.sync="tableData">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'index', width: 50 },
                {
                  prop: 'name',
                  label: 'Name',
                  slots: {
                    default: ({ row }) => {
                      return [
                        <span style="color: red;">{ row.name }</span>
                      ]
                    }
                  }
                },
                {
                  prop: 'sex',
                  label: 'Sex',
                  showHeaderOverflow: true,
                  slots: {
                    header: ({ column }) => {
                      return [
                        <span>
                          <i>@</i>
                          <span style="color: red;">{ column.label }</span>
                        </span>
                      ]
                    }
                  }
                },
                {
                  prop: 'address',
                  label: 'Address',
                  showOverflow: true,
                  slots: {
                    default: ({ row }) => {
                      let h = this.$createElement
                      return [
                        h('span', {
                          style: {
                            color: 'blue'
                          }
                        }, row.address)
                      ]
                    }
                  }
                }
              ],
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 100)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
