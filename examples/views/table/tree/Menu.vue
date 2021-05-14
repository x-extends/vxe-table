<template>
  <div>
    <p class="tip">快捷菜单操作</p>

    <vxe-toolbar custom></vxe-toolbar>

    <vxe-table
      resizable
      show-overflow
      keep-source
      ref="xTree1"
      :tree-config="demo1.treeConfig"
      :menu-config="demo1.tableMenu"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="demo1.tableData"
      @menu-click="contextMenuClickEvent">
      <vxe-column type="checkbox" width="120" tree-node></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-column>
    </vxe-table>

    <pre>
      <pre-code>
        | Arrow Up ↑ | 移动到上一个菜单选项 |
        | Arrow Down ↓ | 移动到下一个菜单选项 |
        | Arrow Left ← | 关闭二级菜单 |
        | Arrow Right → | 打开二级菜单 |
        | Esc | 关闭菜单选项 |
        | Enter | 选中当前菜单选项 |
        | Spacebar | 选中当前菜单选项 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance, VxeTablePropTypes, VxeTableEvents } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTree1 = ref({} as VxeTableInstance)

    const demo1 = reactive({
      treeConfig: {
        children: 'children'
      } as VxeTablePropTypes.TreeConfig,
      tableMenu: {
        header: {
          options: [
            [
              { code: 'hideCurrColumn', name: '隐藏列', disabled: false },
              { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'expand', name: '展开节点', disabled: false },
              { code: 'contract', name: '收缩节点', disabled: false }
            ]
          ]
        },
        visibleMethod ({ row, type, options }) {
          const $table = xTree1.value
          const treeConfig = demo1.treeConfig
          if (type === 'body') {
            options.forEach(list => {
              list.forEach(item => {
                if (item.code === 'expand' || item.code === 'contract') {
                  if (row && treeConfig.children && row[treeConfig.children] && row[treeConfig.children].length) {
                    const isExpand = $table.isTreeExpandByRow(row)
                    item.disabled = item.code === 'expand' ? isExpand : !isExpand
                  } else {
                    item.disabled = true
                  }
                }
              })
            })
          }
          return true
        }
      } as VxeTablePropTypes.MenuConfig,
      tableData: [
        { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'vxe-table 从入门到放弃96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
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
              name: 'vxe-table 从入门到放弃96',
              type: 'avi',
              size: null,
              date: '2021-08-04',
              children: [
                { id: 29330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-03' },
                { id: 29331, name: 'Test33', type: 'pdf', size: 512, date: '2020-03-01' }
              ]
            }
          ]
        },
        { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
      ]
    })

    const contextMenuClickEvent: VxeTableEvents.MenuClick = ({ menu, row, column }) => {
      const $table = xTree1.value
      switch (menu.code) {
        case 'hideCurrColumn':
          $table.hideColumn(column)
          break
        case 'showAllColumn':
          $table.resetColumn()
          break
        case 'expand':
          $table.setTreeExpand(row, true)
          break
        case 'contract':
          $table.setTreeExpand(row, false)
          break
      }
    }

    return {
      xTree1,
      demo1,
      contextMenuClickEvent,
      demoCodes: [
        `
        <vxe-toolbar custom></vxe-toolbar>

        <vxe-table
          resizable
          show-overflow
          keep-source
          ref="xTree1"
          :tree-config="demo1.treeConfig"
          :menu-config="demo1.tableMenu"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data="demo1.tableData"
          @menu-click="contextMenuClickEvent">
          <vxe-column type="checkbox" width="120" tree-node></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeTablePropTypes, VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTree1 = ref({} as VxeTableInstance)

            const demo1 = reactive({
              treeConfig: {
                children: 'children'
              } as VxeTablePropTypes.TreeConfig,
              tableMenu: {
                header: {
                  options: [
                    [
                      { code: 'hideCurrColumn', name: '隐藏列', disabled: false },
                      { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
                    ]
                  ]
                },
                body: {
                  options: [
                    [
                      { code: 'expand', name: '展开节点', disabled: false },
                      { code: 'contract', name: '收缩节点', disabled: false }
                    ]
                  ]
                },
                visibleMethod ({ row, type, options }) {
                  const $table = xTree1.value
                  const treeConfig = demo1.treeConfig
                  if (type === 'body') {
                    options.forEach(list => {
                      list.forEach(item => {
                        if (item.code === 'expand' || item.code === 'contract') {
                          if (row && treeConfig.children && row[treeConfig.children] && row[treeConfig.children].length) {
                            const isExpand = $table.isTreeExpandByRow(row)
                            item.disabled = item.code === 'expand' ? isExpand : !isExpand
                          } else {
                            item.disabled = true
                          }
                        }
                      })
                    })
                  }
                  return true
                }
              } as VxeTablePropTypes.MenuConfig,
              tableData: [
                { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
                {
                  id: 1005,
                  name: 'Test2',
                  type: 'mp4',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                    { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                    {
                      id: 10053,
                      name: 'vxe-table 从入门到放弃96',
                      type: 'avi',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
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
                      name: 'vxe-table 从入门到放弃96',
                      type: 'avi',
                      size: null,
                      date: '2021-08-04',
                      children: [
                        { id: 29330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-03' },
                        { id: 29331, name: 'Test33', type: 'pdf', size: 512, date: '2020-03-01' }
                      ]
                    }
                  ]
                },
                { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
              ]
            })

            const contextMenuClickEvent: VxeTableEvents.MenuClick = ({ menu, row, column }) => {
              const $table = xTree1.value
              switch (menu.code) {
                case 'hideCurrColumn':
                  $table.hideColumn(column)
                  break
                case 'showAllColumn':
                  $table.resetColumn()
                  break
                case 'expand':
                  $table.setTreeExpand(row, true)
                  break
                case 'contract':
                  $table.setTreeExpand(row, false)
                  break
              }
            }

            return {
              xTree1,
              demo1,
              contextMenuClickEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
