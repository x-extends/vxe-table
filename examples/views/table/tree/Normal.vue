<template>
  <div>
    <p class="tip">
      普通树
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xTree1.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree1.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      show-overflow
      ref="xTree1"
      :show-header="false"
      :tree-config="{}"
      :radio-config="{labelField: 'name'}"
      :data="demo1.tableData">
      <vxe-table-column type="radio" tree-node></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">带连接线</p>

    <vxe-table
      show-overflow
      highlight-hover-row
      row-key
      :show-header="false"
      :data="demo2.tableData"
      :checkbox-config="{labelField: 'name'}"
      :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-caret-down', iconClose: 'fa fa-caret-right'}">
      <vxe-table-column type="checkbox" tree-node></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">更多功能</p>

    <vxe-table
      show-overflow
      highlight-hover-row
      row-key
      ref="xTree3"
      border="inner"
      :show-header="false"
      :data="demo3.tableData"
      :checkbox-config="{labelField: 'name'}"
      :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}">
      <vxe-table-column type="checkbox" tree-node>
        <template #default="{ row }">
          <span>
            <template v-if="row.children && row.children.length">
              <i class="tree-node-icon fa" :class="$refs.xTree3.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'"></i>
            </template>
            <template v-else>
              <i class="tree-node-icon fa fa-file-o"></i>
            </template>
            <span>{{ row.name }}</span>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="140">
        <template #default="{ row }">
          <vxe-button type="text" icon="fa fa-eye"></vxe-button>
          <vxe-button type="text" icon="fa fa-edit"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="removeRowEvent(row)"></vxe-button>
          <vxe-button type="text" icon="fa fa-id-card-o"></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
      <pre-code class="css">{{ demoCodes[6] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import XEUtils from 'xe-utils'
import { VXETable } from '../../../../packages/vxe-table'
import { VxeTableInstance } from '../../../../types/vxe-table'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 1000, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'Test96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'Test5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'Test9', type: 'avi', size: 224, date: '2020-10-01' }
      ]
    })

    const xTree1 = ref() as Ref<VxeTableInstance>

    const getTreeRadioEvent = () => {
      const $table = xTree1.value
      const selectRow = $table.getRadioRecord()
      VXETable.modal.alert(selectRow ? selectRow.name : null)
    }

    const getTreeExpansionEvent = () => {
      const $table = xTree1.value
      const treeExpandRecords = $table.getTreeExpandRecords()
      VXETable.modal.alert(`${treeExpandRecords.length}`)
    }

    const demo2 = reactive({
      tableData: [
        { id: 1000, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'Test96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'Test5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'Test9', type: 'avi', size: 224, date: '2020-10-01' }
      ]
    })

    const demo3 = reactive({
      tableData: [
        { id: 1000, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'Test96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'Test5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'Test9', type: 'avi', size: 224, date: '2020-10-01' }
      ]
    })

    const xTree3 = ref() as Ref<VxeTableInstance>

    const removeRowEvent = (row: any) => {
      VXETable.modal.confirm('您确定要删除吗？').then(type => {
        if (type === 'confirm') {
          const matchObj = XEUtils.findTree(demo3.tableData, item => item === row)
          if (matchObj) {
            // 从树节点中移除
            matchObj.items.splice(matchObj.index, 1)
          }
        }
      })
    }

    return {
      demo1,
      xTree1,
      getTreeRadioEvent,
      getTreeExpansionEvent,
      demo2,
      demo3,
      xTree3,
      removeRowEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
            <vxe-button @click="$refs.xTree1.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree1.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          show-overflow
          ref="xTree1"
          :show-header="false"
          :tree-config="{}"
          :radio-config="{labelField: 'name'}"
          :data="demo1.tableData">
          <vxe-table-column type="radio" tree-node></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, Ref } from 'vue'
        import XEUtils from 'xe-utils'
        import { VXETable, VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 1000, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
                {
                  id: 1005,
                  name: 'Test2',
                  type: 'mp4',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                    { id: 20045, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
                    {
                      id: 10053,
                      name: 'Test96',
                      type: 'avi',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24330, name: 'Test5', type: 'txt', size: 25, date: '2021-10-01' },
                        { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                        { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                      ]
                    }
                  ]
                },
                { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 24555, name: 'Test9', type: 'avi', size: 224, date: '2020-10-01' }
              ]
            })

            const xTree1 = ref() as Ref<VxeTableInstance>

            const getTreeRadioEvent = () => {
              const $table = xTree1.value
              const selectRow = $table.getRadioRecord()
              VXETable.modal.alert(selectRow ? selectRow.name : null)
            }

            const getTreeExpansionEvent = () => {
              const $table = xTree1.value
              const treeExpandRecords = $table.getTreeExpandRecords()
              VXETable.modal.alert(\`\${treeExpandRecords.length}\`)
            }

            return {
              demo1,
              xTree1,
              getTreeRadioEvent,
              getTreeExpansionEvent
            }
          }
        })
        `,
        `
        <vxe-table
          show-overflow
          highlight-hover-row
          row-key
          :show-header="false"
          :data="demo2.tableData"
          :checkbox-config="{labelField: 'name'}"
          :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-caret-down', iconClose: 'fa fa-caret-right'}">
          <vxe-table-column type="checkbox" tree-node></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              tableData: [
                { id: 1000, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
                {
                  id: 1005,
                  name: 'Test2',
                  type: 'mp4',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                    { id: 20045, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
                    {
                      id: 10053,
                      name: 'Test96',
                      type: 'avi',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24330, name: 'Test5', type: 'txt', size: 25, date: '2021-10-01' },
                        { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                        { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                      ]
                    }
                  ]
                },
                { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 24555, name: 'Test9', type: 'avi', size: 224, date: '2020-10-01' }
              ]
            })

            return {
              demo2
            }
          }
        })
        `,
        `
        <vxe-table
          show-overflow
          highlight-hover-row
          row-key
          ref="xTree3"
          border="inner"
          :show-header="false"
          :data="demo3.tableData"
          :checkbox-config="{labelField: 'name'}"
          :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}">
          <vxe-table-column type="checkbox" tree-node>
            <template #default="{ row }">
              <span>
                <template v-if="row.children && row.children.length">
                  <i class="tree-node-icon fa" :class="$refs.xTree3.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'"></i>
                </template>
                <template v-else>
                  <i class="tree-node-icon fa fa-file-o"></i>
                </template>
                <span>{{ row.name }}</span>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作" width="140">
            <template #default="{ row }">
              <vxe-button type="text" icon="fa fa-eye"></vxe-button>
              <vxe-button type="text" icon="fa fa-edit"></vxe-button>
              <vxe-button type="text" icon="fa fa-trash-o" @click="removeRowEvent(row)"></vxe-button>
              <vxe-button type="text" icon="fa fa-id-card-o"></vxe-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, Ref } from 'vue'
        import XEUtils from 'xe-utils'
        import { VXETable, VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo3 = reactive({
              tableData: [
                { id: 1000, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
                {
                  id: 1005,
                  name: 'Test2',
                  type: 'mp4',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                    { id: 20045, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
                    {
                      id: 10053,
                      name: 'Test96',
                      type: 'avi',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24330, name: 'Test5', type: 'txt', size: 25, date: '2021-10-01' },
                        { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                        { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                      ]
                    }
                  ]
                },
                { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 24555, name: 'Test9', type: 'avi', size: 224, date: '2020-10-01' }
              ]
            })

            const xTree3 = ref() as Ref<VxeTableInstance>

            const removeRowEvent = (row: any) => {
              VXETable.modal.confirm('您确定要删除吗？').then(type => {
                if (type === 'confirm') {
                  const matchObj = XEUtils.findTree(demo3.tableData, item => item === row)
                  if (matchObj) {
                    // 从树节点中移除
                    matchObj.items.splice(matchObj.index, 1)
                  }
                }
              })
            }

            return {
              demo3,
              xTree3,
              removeRowEvent
            }
          }
        })
        `,
        `
        .tree-node-icon {
          width: 24px;
          text-align: center;
        }
        `
      ]
    }
  }
})
</script>

<style scoped>
.tree-node-icon {
  width: 24px;
  text-align: center;
}
</style>
