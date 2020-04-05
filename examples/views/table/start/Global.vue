<template>
  <div>
    <h2>Default Global Props</h2>
    <pre>
      <code class="javascript">
        import VXETable from 'vxe-table'

        VXETable.setup({
          // size: null, // 全局尺寸
          zIndex: 100, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
          version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
          table: {
            showHeader: true,
            keepSource: true,
            // showOverflow: null,
            // showHeaderOverflow: null,
            // resizeInterval: 500,
            // size: null,
            // zIndex: null,
            // resizable: false,
            // stripe: false,
            // border: false,
            // radioConfig: {
            //   trigger: 'default'
            // },
            // checkboxConfig: {
            //   trigger: 'default'
            // },
            // sortConfig: {
            //   remote: false,
            //   trigger: 'default',
            //   orders: ['asc', 'desc', null]
            // },
            // filterConfig: {
            //   remote: false
            // },
            // expandConfig: {
            //   trigger: 'default'
            // },
            // treeConfig: {
            //   children: 'children',
            //   hasChild: 'hasChild',
            //   indent: 20
            // },
            // tooltipConfig: {
            //   theme: 'dark'
            // },
            // validConfig: {
            //   message: 'default'
            // },
            // editConfig: {
            //   mode: 'cell'
            // },
            // contextMenu: {
            //   visibleMethod () {}
            // },
            // rowId: '_XID', // 行数据的唯一主键字段名
            importConfig: {
              modes: ['insert', 'covering']
            },
            exportConfig: {
              isPrint: true,
              modes: ['current', 'selected']
            },
            optimization: {
              animat: true,
              // cloak: false,
              delayHover: 250,
              // rHeights: {
              //   default: 48,
              //   medium: 44,
              //   small: 40,
              //   mini: 36
              // },
              scrollX: {
                gt: 60
                // oSize: 0,
                // rSize: 0
                // vSize: 0
              },
              scrollY: {
                gt: 100
                // oSize: 0,
                // rSize: 0
                // vSize: 0,
                // rHeight: 0
              }
            }
          },
          grid: {
            // size: null,
            proxyConfig: {
              autoLoad: true,
              message: true,
              props: {
                list: null,
                result: 'result',
                total: 'page.total'
              }
              // beforeItem: null,
              // beforeColumn: null,
              // beforeQuery: null,
              // afterQuery: null,
              // beforeDelete: null,
              // afterDelete: null,
              // beforeSave: null,
              // afterSave: null
            }
          },
          tooltip: {
            // size: null,
            trigger: 'hover',
            theme: 'dark',
            leaveDelay: 300
          },
          pager: {
            // size: null,
            // perfect: true,
            // pageSize: 10,
            // pagerCount: 7,
            // pageSizes: [10, 15, 20, 50, 100],
            // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
          },
          form: {
            // size: null,
            // colon: false
          },
          input: {
            // size: null,
            // transfer: false
            // parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
            // labelFormat: '',
            // valueFormat: '',
            startWeek: 1,
            digits: 2
          },
          textarea: {
            // size: null,
            // autosize: {
            //   minRows: 1,
            //   maxRows: 10
            // }
          },
          select: {
            // size: null,
            // transfer: false
          },
          toolbar: {
            // size: null,
            // import: {
            //   mode: 'covering'
            // },
            // export: {
            //   types: ['csv', 'html', 'xml', 'txt']
            // },
            // resizable: {
            //   storage: false
            // },
            // custom: {
            //   storage: false,
            //   isFooter: true
            // },
            // buttons: []
          },
          button: {
            // transfer: false
          },
          radio: {
            // size: null
          },
          checkbox: {
            // size: null
          },
          switch: {
            // size: null
          },
          modal: {
            // size: null,
            minWidth: 340,
            minHeight: 200,
            lockView: true,
            mask: true,
            duration: 3000,
            marginSize: 8,
            dblclickZoom: true,
            showTitleOverflow: true,
            animat: true,
            // storage: false,
            storageKey: 'VXE_MODAL_POSITION'
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
