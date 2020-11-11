<template>
  <div>
    <p class="tip">
      树表格，通过配置 <table-api-link prop="tree-config"/> 和指定列 <table-column-api-link prop="tree-node"/> 属性来开启树表格，通过 <table-api-link prop="row-id"/> 指定主键，还可以通过 <table-api-link prop="trigger"/> 指定触发方式<br>
      <span class="red">(注：树结构不支持大量数据，如果数据量超过 2000 条，请谨慎使用！)</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      border="inner"
      ref="xTree"
      :tree-config="{}"
      :data="demo1.tableData"
      @toggle-tree-expand="toggleExpandChangeEvent">
      <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">默认展开树节点，通过 <table-api-link prop="tree-config"/>={<table-api-link prop="expandRowKeys"/>: []} 设置默认展开树节点的主键</p>

    <vxe-table
      resizable
      row-id="id"
      :tree-config="{children: 'children', expandRowKeys: demo1.defaultExpandKeys}"
      :data="demo1.tableData">
      <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">默认展开所有树节点，通过 <table-api-link prop="tree-config"/>={<table-api-link prop="expandAll"/>: true} 设置默认展开所有树节点</p>

    <vxe-table
      border
      show-overflow
      row-id="id"
      :data="demo1.tableData"
      :tree-config="{children: 'children', expandAll: true}">
      <vxe-table-column type="seq" width="180" title="序号" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
      <vxe-table-colgroup title="基本信息">
        <vxe-table-column field="size" title="Size11"></vxe-table-column>
        <vxe-table-column field="type" title="Type22"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import XEUtils from 'xe-utils'
import { VXETable } from '../../../../packages/vxe-table'
import { VxeTableInstance } from '../../../../types/vxe-table'

export default defineComponent({
  setup () {
    const xTree = ref({} as VxeTableInstance)

    const demo1 = reactive({
      defaultExpandKeys: [1005],
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

    const toggleExpandChangeEvent = (params: any) => {
      const { expanded } = params
      console.log('节点展开事件' + expanded)
    }

    const getTreeExpansionEvent = () => {
      const $table = xTree.value
      const treeExpandRecords = $table.getTreeExpandRecords()
      VXETable.modal.alert(XEUtils.toString(treeExpandRecords.length))
    }

    return {
      xTree,
      demo1,
      toggleExpandChangeEvent,
      getTreeExpansionEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
            <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          border="inner"
          ref="xTree"
          :tree-config="{}"
          :data="tableData"
          @toggle-tree-expand="toggleExpandChangeEvent">
          <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import XEUtils from 'xe-utils'
        import { VXETable, VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTree = ref({} as VxeTableInstance)

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

            const toggleExpandChangeEvent = (params: any) => {
              const { expanded } = params
              console.log('节点展开事件' + expanded)
            }

            const getTreeExpansionEvent = () => {
              const $table = xTree.value
              const treeExpandRecords = $table.getTreeExpandRecords()
              VXETable.modal.alert(XEUtils.toString(treeExpandRecords.length))
            }

            return {
              xTree,
              demo1,
              toggleExpandChangeEvent,
              getTreeExpansionEvent
            }
          }
        }
        `,
        `
        <vxe-table
          resizable
          row-id="id"
          :tree-config="{children: 'children', expandRowKeys: defaultExpandKeys}"
          :data="tableData">
          <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              defaultExpandKeys: [1005],
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
              demo1
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-overflow
          row-id="id"
          :data="tableData"
          :tree-config="{children: 'children', expandAll: true}">
          <vxe-table-column type="seq" width="180" title="序号" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-colgroup title="基本信息">
            <vxe-table-column field="size" title="Size"></vxe-table-column>
            <vxe-table-column field="type" title="Type"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTree = ref({} as VxeTableInstance)

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

            return {
              xTree,
              demo1
            }
          }
        }
        `
      ]
    }
  }
})
</script>
