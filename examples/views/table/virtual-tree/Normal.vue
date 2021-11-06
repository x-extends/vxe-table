<template>
  <div>
    <p class="tip">普通树</p>

    <vxe-virtual-tree
      show-overflow
      row-key
      ref="xVTree1"
      row-id="id"
      :show-header="false"
      :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
      :tree-config="{children: 'children'}"
      :radio-config="{labelField: 'name'}"
      :columns="tableColumn1"
      :data="tableData">
      <template #toolbar_buttons>
        <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xVTree1.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xVTree1.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">更多功能</p>

    <vxe-virtual-tree
      show-overflow
      highlight-hover-row
      ref="xVTree3"
      row-id="id"
      :show-header="false"
      :data="tableData"
      :checkbox-config="{labelField: 'name', checkField: 'checked', halfField: 'indeterminate'}"
      :tree-config="{children: 'children', iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
      :columns="tableColumn3">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
      <pre-code class="css">{{ demoCodes[4] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 1000, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'test abc96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        {
          id: 23666,
          name: 'Test23',
          type: 'mp4',
          size: null,
          date: '2021-01-02',
          children: [
            {
              id: 27666,
              name: 'test abc96',
              type: 'avi',
              size: null,
              date: '2021-08-04',
              children: [
                { id: 29330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-03' },
                { id: 29331, name: 'Test33', type: 'pdf', size: 512, date: '2020-03-01' }
              ]
            }
          ]
        },
        { id: 24555, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ],
      tableColumn1: [
        { type: 'radio', treeNode: true }
      ],
      tableColumn2: [
        { type: 'checkbox', treeNode: true }
      ],
      tableColumn3: [
        {
          type: 'checkbox',
          treeNode: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  {
                    row.children && row.children.length
                      ? <i class={ ['tree-node-icon fa', this.$refs.xVTree3.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'] }></i>
                      : <i class="tree-node-icon fa fa-file-o"></i>
                  }
                  <span>{ row.name }</span>
                </span>
              ]
            }
          }
        },
        {
          title: '操作',
          width: 140,
          slots: {
            default: () => {
              return [
                <vxe-button type="text" icon="fa fa-eye"></vxe-button>,
                <vxe-button type="text" icon="fa fa-edit"></vxe-button>,
                <vxe-button type="text" icon="fa fa-trash-o"></vxe-button>,
                <vxe-button type="text" icon="fa fa-id-card-o"></vxe-button>
              ]
            }
          }
        }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          show-overflow
          row-key
          ref="xVTree1"
          row-id="id"
          :show-header="false"
          :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
          :tree-config="{children: 'children'}"
          :radio-config="{labelField: 'name'}"
          :columns="tableColumn1"
          :data="tableData">
          <template #toolbar_buttons>
            <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
            <vxe-button @click="$refs.xVTree1.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xVTree1.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 1000, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                {
                  id: 1005,
                  name: 'Test2',
                  type: 'mp4',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                    { id: 20045, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
                    {
                      id: 10053,
                      name: 'test abc96',
                      type: 'avi',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
                        { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                        { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                      ]
                    }
                  ]
                },
                {
                  id: 23666,
                  name: 'Test23',
                  type: 'mp4',
                  size: null,
                  date: '2021-01-02',
                  children: [
                    {
                      id: 27666,
                      name: 'test abc96',
                      type: 'avi',
                      size: null,
                      date: '2021-08-04',
                      children: [
                        { id: 29330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-03' },
                        { id: 29331, name: 'Test33', type: 'pdf', size: 512, date: '2020-03-01' }
                      ]
                    }
                  ]
                },
                { id: 24555, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ],
              tableColumn1: [
                { type: 'radio', treeNode: true }
              ]
            }
          },
          methods: {
            getTreeExpansionEvent () {
              let selectRow = this.$refs.xVTree.getRadioRecord()
              this.$XModal.alert(selectRow ? selectRow.name : 'null')
            },
            getTreeExpansionEvent () {
              let treeExpandRecords = this.$refs.xVTree.getTreeExpandRecords()
              this.$XModal.alert(treeExpandRecords.length)
            }
          }
        }
        `,
        `
        <vxe-virtual-tree
          show-overflow
          highlight-hover-row
          ref="xVTree"
          row-id="id"
          :show-header="false"
          :data="tableData"
          :checkbox-config="{labelField: 'name', checkField: 'checked', halfField: 'indeterminate'}"
          :tree-config="{children: 'children', iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
          :columns="tableColumn3">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 1000, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                {
                  id: 1005,
                  name: 'Test2',
                  type: 'mp4',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                    { id: 20045, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
                    {
                      id: 10053,
                      name: 'test abc96',
                      type: 'avi',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
                        { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                        { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                      ]
                    }
                  ]
                },
                {
                  id: 23666,
                  name: 'Test23',
                  type: 'mp4',
                  size: null,
                  date: '2021-01-02',
                  children: [
                    {
                      id: 27666,
                      name: 'test abc96',
                      type: 'avi',
                      size: null,
                      date: '2021-08-04',
                      children: [
                        { id: 29330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-03' },
                        { id: 29331, name: 'Test33', type: 'pdf', size: 512, date: '2020-03-01' }
                      ]
                    }
                  ]
                },
                { id: 24555, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ],
              tableColumn: [
                {
                  type: 'checkbox',
                  treeNode: true,
                  slots: {
                    default: ({ row }) => {
                      return [
                        <span>
                          {
                            row.children && row.children.length
                              ? <i class={ ['tree-node-icon fa', this.$refs.xVTree.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'] }></i>
                              : <i class="tree-node-icon fa fa-file-o"></i>
                          }
                          <span>{ row.name }</span>
                        </span>
                      ]
                    }
                  }
                },
                {
                  title: '操作',
                  width: 140,
                  slots: {
                    default: ({ row }) => {
                      return [
                        <vxe-button type="text" icon="fa fa-eye"></vxe-button>,
                        <vxe-button type="text" icon="fa fa-edit"></vxe-button>,
                        <vxe-button type="text" icon="fa fa-trash-o"></vxe-button>,
                        <vxe-button type="text" icon="fa fa-id-card-o"></vxe-button>
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
        `,
        `
        .tree-node-icon {
          width: 24px;
          text-align: center;
        }
        `
      ]
    }
  },
  methods: {
    getTreeRadioEvent () {
      const selectRow = this.$refs.xVTree1.getRadioRecord()
      this.$XModal.alert(selectRow ? selectRow.name : 'null')
    },
    getTreeExpansionEvent () {
      const treeExpandRecords = this.$refs.xVTree1.getTreeExpandRecords()
      this.$XModal.alert(treeExpandRecords.length)
    }
  }
}
</script>

<style scoped>
.tree-node-icon {
  width: 24px;
  text-align: center;
}
</style>
