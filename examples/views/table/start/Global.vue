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
          // 默认表格参数
          size: 'small',
          showOverflow: null,
          showHeaderOverflow: null,
          align: null,
          headerAlign: null,
          stripe: false,
          border: false,
          resizable: false,
          fit: true,
          showHeader: true,
          highlightCurrentRow: false,
          highlightHoverRow: false,
          highlightCurrentColumn: false,
          highlightHoverColumn: false,
          export: {}, // 导出默认参数
          import: {}, // 导入默认参数
          zIndex: 100, // 全局 zIndex 起始值
          rowId: '_XID',
          sortConfig: {
            remote: false,
            trigger: 'default'
          },
          filterConfig: {
            remote: false
          },
          expandConfig: {
            trigger: 'default'
          },
          treeConfig: {
            children: 'children',
            hasChild: 'hasChild',
            indent: 20
          },
          tooltipConfig: {
            theme: 'dark'
          },
          validConfig: {
            message: 'default'
          },
          // 版本号（对于某些带 Storage 数据储存的功能有用到，上升版本号可以用于重置 Storage 数据）
          version: 0,
          // 配置式表格的默认参数
          grid: {
            proxyConfig: {
              autoLoad: true,
              message: true,
              props: {
                list: null,
                result: 'result',
                total: 'page.total'
              }
            }
          },
          // 默认快捷菜单
          menu: {},
          // 默认 tooltip 主题样式
          tooltip: {
            trigger: 'hover',
            theme: 'dark'
          },
          // 默认分页参数
          pager: {
            perfect: true,
            pageSize: 10,
            pagerCount: 7,
            pageSizes: [10, 15, 20, 50, 100],
            layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total'] // 非常灵活的分页布局，支持任意位置随意换
          },
          // 默认工具栏参数
          toolbar: {
            refresh: false,
            import: {
              mode: 'covering'
            },
            export: {
              types: ['csv', 'html', 'xml', 'txt']
            },
            resizable: {
              storage: false
            },
            custom: {
              storage: false
            },
            buttons: []
          },
          // 默认模态窗口参数
          modal: {
            minWidth: 340,
            minHeight: 200,
            lockView: true,
            mask: true,
            duration: 3000,
            marginSize: 8,
            dblclickZoom: true,
            remember: false,
            animat: true
          },
          // 默认优化配置项
          optimization : {
            animat: true,
            delayHover: 250,
            scrollX: {
              gt: 100
            },
            scrollY: {
              gt: 500
            }
          },
          // 集成国际化（将对列头、校验提示..进行自动翻译）
          translate: : key => i18n.t(key)
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
