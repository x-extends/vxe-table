<template>
  <div>
    <h2>size</h2>
    <pre>
      <code class="xml">
        每个组件都有 size 属性，默认是继承父组件，所以只要给局部的父组件设置 size，所有后代组件一律继承，该功能对于很多场景中都非常有用
      </code>
    </pre>
    <h2>Default Global Props</h2>
    <pre>
      <code class="javascript">
        import VXETable from 'vxe-table'

        VXETable.setup({
          // 表格的全局参数
          // size: 'small',
          // showOverflow: null,
          // showHeaderOverflow: null,
          // align: null,
          // headerAlign: null,
          // stripe: false,
          // border: false,
          // resizable: false,
          // showHeader: true,
          // highlightCurrentRow: false,
          // highlightHoverRow: false,
          // highlightCurrentColumn: false,
          // highlightHoverColumn: false,
          // zIndex: 100, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
          // keepSource: false,
          // rowId: null, // 行数据的唯一主键字段名 _XID
          radioConfig: {
            // trigger: 'default'
          },
          checkboxConfig: {
            // trigger: 'default'
          },
          sortConfig: {
            // remote: false,
            // trigger: 'default',
            orders: ['asc', 'desc', null]
          },
          filterConfig: {
            // remote: false
          },
          importConfig: {
            // mode: 'covering',
            // modes: ['insert', 'covering'],
            // remote: false,
            // importMethod () {}
          },
          exportConfig: {
            // isPrint: true,
            // modes: ['current', 'selected'],
            // types: ['csv', 'html', 'xml', 'txt'],
            // remote: false,
            // exportMethod () {}
          },
          expandConfig: {
            // trigger: 'default'
          },
          treeConfig: {
            // children: 'children',
            // hasChild: 'hasChild',
            // indent: 20
          },
          tooltipConfig: {
            // theme: 'dark'
          },
          validConfig: {
            // message: 'default'
          },
          editConfig: {
            // mode: 'cell'
          },
          contextMenu: {
            // header: {
            //   options: []
            // },
            // body: {
            //   options: []
            // },
            // footer: {
            //   options: []
            // },
            // visibleMethod () {}
          },
          // 版本号（对于某些带 Storage 数据储存的功能有用到，上升版本号可以用于重置 Storage 数据）
          // version: 0,
          // 高级表格的全局参数
          grid: {
            proxyConfig: {
              // autoLoad: true,
              // message: true,
              // props: {
              //   list: null,
              //   result: 'result',
              //   total: 'page.total'
              // },
              // 列初始化之前
              // beforeColumn ({ column }) {},
              // 查询触发之前
              // beforeQuery ({ options, page, sort, filters }) {
              //   page 如果有，读取当前分页的对象
              //   sort 如果有，读取当前排序的条件
              //   filters 如果有，读取当前筛选的条件
              //   return fetch('url', { method: 'GET' }).then(response => response.json())
              // },
              // 删除触发之前
              // beforeDelete ({ options, body }) {
              //   body.removeRecords 移除的数据列表
              //   return fetch('url', { method: 'DELETE' }).then(response => response.json())
              // },
              // 删除完成之后
              // afterDelete ({ $grid }) {
              //   $grid.commitProxy('reload')
              // },
              // 保存触发之前
              // beforeSave ({ options, body }) {
              //   body.pendingRecords 标记删除的数据列表
              //   body.insertRecords 插入的数据列表
              //   body.removeRecords 移除的数据列表
              //   body.updateRecords 改变的数据列表
              //   return fetch('url', { method: 'POST', body }).then(response => response.json())
              // },
              // 保存完成之后
              // afterSave ({ $grid }) {
              //   $grid.commitProxy('reload')
              // }
            }
          },
          // 默认 tooltip 主题样式
          tooltip: {
            // trigger: 'hover',
            // theme: 'dark'
          },
          // 分页的全局参数
          pager: {
            // perfect: true,
            // pageSize: 10,
            // pagerCount: 7,
            // pageSizes: [10, 15, 20, 50, 100],
            // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total'] // 非常灵活的分页布局，支持任意位置随意换
          },
          // 表单的全局参数
          form: {
            // colon: false
          },
          input: {
            // transfer: false
            // parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
            // labelFormat: '',
            // valueFormat: '',
            startWeek: 1,
            digits: 2
          },
          // 下拉框的全局参数
          select: {
            // transfer: false
          },
          // 工具栏的全局参数
          toolbar: {
            // refresh: false,
            // resizable: {
            //   storage: false
            // },
            // custom: {
            //   storage: false,
            //   isFooter: true
            // },
            // buttons: []
          },
          // 按钮的全局参数
          button: {
            // transfer: false
          },
          // 窗口的全局参数
          modal: {
            // minWidth: 340,
            // minHeight: 200,
            // lockView: true,
            // mask: true,
            // duration: 3000,
            // marginSize: 8,
            // dblclickZoom: true,
            // showTitleOverflow: true,
            // remember: false,
            // animat: true,
            // storage: false,
            // storageKey: 'VXE_MODAL_POSITION'
          },
          // 优化的全局参数
          optimization : {
            // animat: true,
            // cloak: false, // 可以设置为 true 来避免初始化渲染时的闪动
            // delayHover: 250,
            // scrollX: {
            //   gt: 40
            // },
            // scrollY: {
            //   gt: 100
            // }
          },
          // 集成国际化（将对列头、校验提示..进行自动翻译）
          // translate: : key => i18n.t(key)
        })
      </code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
