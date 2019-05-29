<template>
  <div id="app" @click="clickEvent">
    <header class="page-header">
      <img class="logo" src="./assets/logo.jpg">
      <h1 class="title">
        <a href="https://github.com/xuliangzhan/vxe-table">vxe-table</a>
      </h1>
      <span class="desc">一个功能更加强大的 Vue 表格组件</span>
    </header>
    <div class="page-container">
      <div class="aside">
        <ul class="nav-menu">
          <li v-for="(item, index) in tableList" :key="index">
            <a class="nav-link" @click="linkEvent(item)">{{ item.label }}</a>
            <ul v-if="item.children" v-show="item.expand" class="nav-child-menu">
              <li v-for="(child, cIndex) in item.children" :key="cIndex">
                <a class="nav-link disabled" v-if="child.disabled" title="后续版本会考虑支持该功能！">{{ child.label }}</a>
                <router-link v-else class="nav-link" :to="child.locat">{{ child.label }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="body">
        <a class="link tosrc" href="https://github.com/xuliangzhan/vxe-table/tree/master/examples/views/table" target="_blank">查看代码</a>
        <a v-if="demoLink" class="link todemo" :href="demoLink" target="_blank">在线运行</a>
        <router-view/>
      </div>
    </div>
    <footer class="page-footer">
      <p class="copyright">github <a class="link" href="https://github.com/xuliangzhan/vxe-table">vxe-table</a> Copyright (c) 2019-present, Xu Liangzhan</p>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null,
      tableList: [
        {
          label: '开发指南',
          value: 'start',
          expand: false,
          children: [
            {
              label: '安装',
              locat: {
                name: 'Install'
              }
            },
            {
              label: '快速上手',
              locat: {
                name: 'Use'
              }
            },
            {
              label: '高级函数',
              locat: {
                name: 'Advanced'
              }
            }
          ]
        },
        {
          label: '基本功能',
          value: 'base',
          expand: false,
          children: [
            {
              label: '基础',
              demoUrl: 'https://jsrun.net/VrXKp',
              locat: {
                name: 'TableBasic'
              }
            },
            {
              label: '尺寸',
              demoUrl: 'https://jsrun.net/PmXKp',
              locat: {
                name: 'TableSize'
              }
            },
            {
              label: '内容显示省略号',
              locat: {
                name: 'TableOverflow'
              }
            },
            {
              label: '斑马线条纹',
              demoUrl: 'https://jsrun.net/zrXKp',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              label: '带边框',
              demoUrl: 'https://jsrun.net/QrXKp',
              locat: {
                name: 'TableBorder'
              }
            },
            {
              label: '单元格样式',
              demoUrl: 'https://jsrun.net/EmXKp',
              locat: {
                name: 'TableStyle'
              }
            },
            {
              label: '隐藏头部',
              demoUrl: 'https://jsrun.net/7mXKp',
              locat: {
                name: 'TableHeader'
              }
            },
            {
              label: '列宽拖动',
              demoUrl: 'https://jsrun.net/5AXKp',
              locat: {
                name: 'TableResizable'
              }
            },
            {
              label: '流体高度',
              demoUrl: 'https://jsrun.net/smXKp',
              locat: {
                name: 'TableMaxHeight'
              }
            },
            {
              label: '固定表头',
              demoUrl: 'https://jsrun.net/JrXKp',
              locat: {
                name: 'TableHeight'
              }
            },
            {
              label: '固定列',
              demoUrl: 'https://jsrun.net/TrXKp',
              locat: {
                name: 'TableFixed'
              }
            },
            {
              label: '固定表头和列',
              demoUrl: 'https://jsrun.net/8rXKp',
              locat: {
                name: 'TableFixedFull'
              }
            },
            {
              label: '表头分组',
              demoUrl: 'https://jsrun.net/7rXKp',
              locat: {
                name: 'TableGroup'
              }
            },
            {
              label: '序号',
              demoUrl: 'https://jsrun.net/xrXKp',
              locat: {
                name: 'TableIndex'
              }
            },
            {
              label: '单选',
              demoUrl: 'https://jsrun.net/9rXKp',
              locat: {
                name: 'TableRadio'
              }
            },
            {
              label: '多选',
              demoUrl: 'https://jsrun.net/erXKp',
              locat: {
                name: 'TableSelection'
              }
            },
            {
              label: '排序',
              demoUrl: 'https://jsrun.net/crXKp',
              locat: {
                name: 'TableSort'
              }
            },
            {
              label: '筛选',
              demoUrl: 'https://jsrun.net/drXKp',
              locat: {
                name: 'TableFilter'
              }
            },
            {
              label: '空数据',
              locat: {
                name: 'TableEmpty'
              }
            },
            {
              label: '加载中',
              demoUrl: 'https://jsrun.net/GjXKp',
              locat: {
                name: 'TableLoading'
              }
            },
            {
              label: '格式化内容',
              demoUrl: 'https://jsrun.net/FrXKp',
              locat: {
                name: 'TableFormat'
              }
            }
          ]
        },
        {
          label: '高级功能',
          value: 'advanced',
          expand: false,
          children: [
            {
              label: '自定义模板',
              demoUrl: 'https://jsrun.net/DjXKp',
              locat: {
                name: 'TableTemplate'
              }
            },
            {
              label: '合并行或列',
              demoUrl: 'https://jsrun.net/5jXKp',
              locat: {
                name: 'TableSpan'
              }
            },
            {
              label: '表尾合计',
              demoUrl: 'https://jsrun.net/dmXKp',
              locat: {
                name: 'TableFooter'
              }
            },
            {
              label: '显示/隐藏列',
              demoUrl: 'https://jsrun.net/PrXKp',
              locat: {
                name: 'TableCustom'
              }
            },
            {
              label: '导出.csv',
              demoUrl: 'https://jsrun.net/cmXKp',
              locat: {
                name: 'TableExport'
              }
            },
            {
              label: '快捷菜单',
              demoUrl: 'https://jsrun.net/VjXKp',
              locat: {
                name: 'TableMenu'
              }
            },
            {
              label: '展开行',
              demoUrl: 'https://jsrun.net/eRXKp',
              locat: {
                name: 'TableExpand'
              }
            }
          ]
        },
        {
          label: 'Tree 表格',
          value: 'tree',
          expand: false,
          children: [
            {
              label: '基本树形',
              locat: {
                name: 'TableTreeBasic'
              }
            },
            {
              label: '单选树形',
              locat: {
                name: 'TableTreeRadio'
              }
            },
            {
              label: '多选树形',
              locat: {
                name: 'TableTreeSelection'
              }
            },
            {
              label: '复杂树形',
              disabled: true,
              locat: {
                name: 'TableTreeBasic'
              }
            }
          ]
        },
        {
          label: 'Grid 表格',
          value: 'grid',
          expand: false,
          children: [
            {
              label: '基础',
              demoUrl: 'https://jsrun.net/5RXKp',
              locat: {
                name: 'GridBasic'
              }
            },
            {
              label: '带分页',
              locat: {
                name: 'GridPage'
              }
            },
            {
              label: '数据代理',
              locat: {
                name: 'GridProxy'
              }
            },
            {
              label: '完整查询',
              locat: {
                name: 'GridFullQuery'
              }
            },
            {
              label: '可编辑',
              locat: {
                name: 'GridEdit'
              }
            },
            {
              label: '带工具栏',
              locat: {
                name: 'GridToolbar'
              }
            },
            {
              label: '复杂功能',
              disabled: true,
              locat: {
                name: 'GridFullEdit'
              }
            }
          ]
        },
        {
          label: 'Big 表格',
          value: 'scroll',
          expand: false,
          children: [
            {
              label: '海量数据',
              demoUrl: 'https://jsrun.net/XRXKp',
              locat: {
                name: 'TableScroll'
              }
            },
            {
              label: '1 万行',
              locat: {
                name: 'TableScrollRows'
              }
            },
            {
              label: '10 万行 + 更复杂渲染',
              locat: {
                name: 'TableScrollFullRows'
              }
            },
            {
              label: '1 万行 1 万列',
              locat: {
                name: 'TableScrollCols'
              }
            },
            {
              label: '10 万行 1 万列 + 更复杂渲染',
              locat: {
                name: 'TableScrollFullCols'
              }
            },
            {
              label: '无限滚动',
              disabled: true,
              locat: {
                name: 'TableScroll'
              }
            }
          ]
        },
        {
          label: 'Edit 表格',
          value: 'edit',
          expand: false,
          children: [
            {
              label: '手动触发',
              locat: {
                name: 'TableEditManual'
              }
            },
            {
              label: '点击触发',
              locat: {
                name: 'TableEditClick'
              }
            },
            {
              label: '双击触发',
              locat: {
                name: 'TableEditDBLClick'
              }
            },
            {
              label: '插入数据',
              locat: {
                name: 'TableEditInsert'
              }
            },
            {
              label: '删除数据',
              locat: {
                name: 'TableEditRemove'
              }
            },
            {
              label: '还原数据',
              locat: {
                name: 'TableEditRevert'
              }
            },
            {
              label: '编辑状态',
              locat: {
                name: 'TableEditStatus'
              }
            },
            {
              label: '禁用编辑 cell',
              locat: {
                name: 'TableEditCellDisable'
              }
            },
            {
              label: '禁用编辑 row',
              locat: {
                name: 'TableEditRowDisable'
              }
            },
            {
              label: '数据校验 cell',
              locat: {
                name: 'TableEditCellValid'
              }
            },
            {
              label: '数据校验 row',
              locat: {
                name: 'TableEditRowValid'
              }
            },
            {
              label: '全键盘操作',
              locat: {
                name: 'TableEditKeyboard'
              }
            },
            {
              label: '自定义渲染',
              locat: {
                name: 'TableEditTemplate'
              }
            },
            {
              label: '复杂渲染',
              disabled: true,
              locat: {
                name: 'TableEditFull'
              }
            }
          ]
        },
        {
          label: 'Excel 表格',
          value: 'excel',
          expand: false,
          children: [
            {
              label: '单元格',
              locat: {
                name: 'TableExcelCell'
              }
            }
          ]
        },
        {
          label: 'UI 集成',
          value: 'other',
          expand: false,
          children: [
            {
              label: 'element-ui 自定义渲染',
              locat: {
                name: 'TableOtherElement'
              }
            },
            {
              label: 'iview 自定义渲染',
              locat: {
                name: 'TableOtherIview'
              }
            },
            {
              label: '使用 sortablejs 拖拽行排序',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            }
          ]
        },
        {
          label: 'Plugin 插件',
          value: 'plugin',
          expand: false,
          children: [
            {
              label: 'element-ui 适配插件',
              locat: {
                name: 'TablePluginElementConfig'
              }
            },
            {
              label: 'element-ui 更多配置',
              locat: {
                name: 'TablePluginElementPage'
              }
            },
            {
              label: 'iview 适配插件',
              locat: {
                name: 'TablePluginIviewConfig'
              }
            },
            {
              label: 'iview 更多配置',
              locat: {
                name: 'TablePluginIviewPage'
              }
            }
          ]
        },
        {
          label: 'API',
          value: 'api',
          expand: false,
          children: [
            {
              label: 'vxe-table',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'table'
                }
              }
            },
            {
              label: 'vxe-table-column',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'table-column'
                }
              }
            },
            {
              label: 'vxe-grid',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'grid'
                }
              }
            },
            {
              label: 'vxe-excel',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'excel'
                }
              }
            },
            {
              label: 'vxe-pagination',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'pagination'
                }
              }
            },
            {
              label: 'vxe-radio',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'radio'
                }
              }
            },
            {
              label: 'vxe-checkbox',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'checkbox'
                }
              }
            },
            {
              label: 'vxe-input',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'input'
                }
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    demoLink () {
      let group = this.tableList.find(item => item.expand)
      if (group && group.children) {
        let selected = group.children.find(item => item.locat && item.locat.name === this.$route.name)
        if (selected) {
          return selected.demoUrl
        }
      }
      return null
    }
  },
  created () {
    let group = this.tableList.find(item => item.value === this.$route.path.split('/')[2])
    if (group) {
      group.expand = true
    }
  },
  methods: {
    clickEvent (evnt) {
      let pElem = evnt.target
      if (pElem && pElem.className === 'demo-code') {
        let nextElem = pElem.nextSibling
        if (nextElem && nextElem.tagName.toLowerCase() === 'pre') {
          if (nextElem.className.indexOf('is-show') > -1) {
            nextElem.className = ''
          } else {
            nextElem.className = 'is-show'
          }
        }
      }
    },
    linkEvent (item) {
      this.tableList.forEach(group => {
        if (item !== group) {
          group.expand = false
        }
      })
      item.expand = !item.expand
    }
  }
}
</script>
