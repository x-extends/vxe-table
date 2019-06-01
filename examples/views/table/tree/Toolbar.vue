<template>
  <div>
    <p>增删改查、工具栏，如果 key 值一样的情况下（row-key、tree-config、edit-config 的 key 任意配置一个即可）</p>

    <vxe-table-toolbar :customs="customColumns" setting>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-table-toolbar>

    <vxe-table
      ref="xTree"
      :tree-config="{key: 'id', children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :customs.sync="customColumns"
      :data.sync="tableData">
      <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="size" label="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="type" label="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">显示代码</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      customColumns: [],
      tableData: [
        {
          id: '10000',
          name: '文件夹 10000',
          size: '53k',
          type: '',
          date: '2019-05-16',
          checked: false,
          children: [
            {
              id: '11000',
              name: '文件 11000',
              size: '11k',
              type: 'js',
              date: '2019-05-16',
              checked: false
            },
            {
              id: '12000',
              name: '文件夹 12000',
              size: '22k',
              type: '',
              date: '2019-05-16',
              checked: false,
              children: [
                {
                  id: '12100',
                  name: '文件夹 12100',
                  size: '60k',
                  type: 'js',
                  date: '2019-05-16',
                  checked: false,
                  children: [
                    {
                      id: '12110',
                      name: '文件 12110',
                      size: '100k',
                      type: 'js',
                      date: '2019-05-16',
                      checked: false
                    }
                  ]
                },
                {
                  id: '122000',
                  name: '文件 122000',
                  size: '80k',
                  type: 'js',
                  date: '2019-05-16',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          id: '20000',
          name: '文件 20000',
          size: '66k',
          type: 'js',
          date: '2019-05-16',
          checked: false
        },
        {
          id: '30000',
          name: '文件夹 30000',
          size: '3k',
          type: '',
          date: '2019-05-16',
          checked: false,
          children: [
            {
              id: '31000',
              name: '文件夹 31000',
              size: '9k',
              type: '',
              date: '2019-05-16',
              checked: false,
              children: [
                {
                  id: '31100',
                  name: '文件 31100',
                  size: '1k',
                  type: 'js',
                  date: '2019-05-16',
                  checked: false
                },
                {
                  id: '31200',
                  name: '文件 31200',
                  size: '224k',
                  type: 'js',
                  date: '2019-05-16',
                  checked: false
                }
              ]
            },
            {
              id: '32000',
              name: '文件夹 32000',
              size: '33k',
              type: '',
              date: '2019-05-16',
              checked: false,
              children: [
                {
                  id: '32100',
                  name: '文件 32100',
                  size: '35k',
                  type: 'js',
                  date: '2019-05-16',
                  checked: false
                }
              ]
            },
            {
              id: '33000',
              name: '文件夹 33000',
              size: '33k',
              type: '',
              date: '2019-05-16',
              checked: false,
              children: [
                {
                  id: '33100',
                  name: '文件 33100',
                  size: '35k',
                  type: 'js',
                  date: '2019-05-16',
                  checked: false
                }
              ]
            }
          ]
        }
      ],
      demoCodes: [
        `
        <vxe-table-toolbar :customs="customColumns" setting>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-table-toolbar>

        <vxe-table
          ref="xTree"
          :tree-config="{key: 'id', children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :customs.sync="customColumns"
          :data.sync="tableData">
          <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="size" label="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="type" label="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData:  [
                {
                  id: '10000',
                  name: '文件夹 10000',
                  size: '53k',
                  type: '',
                  date: '2019-05-16',
                  children: [
                    {
                      id: '11000',
                      name: '文件 11000',
                      size: '11k',
                      type: 'js',
                      date: '2019-05-16'
                    },
                    {
                      id: '12000',
                      name: '文件夹 12000',
                      size: '22k',
                      type: '',
                      date: '2019-05-16',
                      children: [
                        {
                          id: '12100',
                          name: '文件夹 12100',
                          size: '60k',
                          type: 'js',
                          date: '2019-05-16',
                          children: [
                            {
                              id: '12110',
                              name: '文件 12110',
                              size: '100k',
                              type: 'js',
                              date: '2019-05-16'
                            }
                          ]
                        },
                        {
                          id: '122000',
                          name: '文件 122000',
                          size: '80k',
                          type: 'js',
                          date: '2019-05-16'
                        }
                      ]
                    }
                  ]
                },
                {
                  id: '20000',
                  name: '文件 20000',
                  size: '66k',
                  type: 'js',
                  date: '2019-05-16'
                },
                {
                  id: '30000',
                  name: '文件夹 30000',
                  size: '3k',
                  type: '',
                  date: '2019-05-16',
                  children: [
                    {
                      id: '31000',
                      name: '文件夹 31000',
                      size: '9k',
                      type: '',
                      date: '2019-05-16',
                      children: [
                        {
                          id: '31100',
                          name: '文件 31100',
                          size: '1k',
                          type: 'js',
                          date: '2019-05-16'
                        },
                        {
                          id: '31200',
                          name: '文件 31200',
                          size: '224k',
                          type: 'js',
                          date: '2019-05-16'
                        }
                      ]
                    },
                    {
                      id: '32000',
                      name: '文件夹 32000',
                      size: '33k',
                      type: '',
                      date: '2019-05-16',
                      children: [
                        {
                          id: '32100',
                          name: '文件 32100',
                          size: '35k',
                          type: 'js',
                          date: '2019-05-16'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          },
          methods: {
            insertEvent () {
              let record = {
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              this.$refs.xTree.insert(record)
                .then(({ row }) => this.$refs.xTree.setActiveRow(row))
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTree.getInsertRecords()
              alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTree.getRemoveRecords()
              alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTree.getUpdateRecords()
              alert(updateRecords.length)
            }
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
  methods: {
    insertEvent () {
      let record = {
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      this.$refs.xTree.insert(record)
        .then(({ row }) => this.$refs.xTree.setActiveRow(row))
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTree.getInsertRecords()
      alert(insertRecords.length)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTree.getRemoveRecords()
      alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTree.getUpdateRecords()
      alert(updateRecords.length)
    }
  }
}
</script>
