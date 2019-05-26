<template>
  <div id="app" @click="clickEvent">
    <header class="page-header">
      <img class="logo" src="./assets/logo.jpg">
      <h1 class="title"><a href="https://github.com/xuliangzhan/vxe-table">vxe-table</a></h1>
      <span class="desc">一个功能更加强大的 Vue 表格组件</span>
    </header>
    <div class="page-container">
      <div class="aside">
        <ul class="nav-menu">
          <li v-for="(item, index) in tableList" :key="index">
            <a class="nav-link" @click="linkEvent(item)">{{ item.lable }}</a>
            <ul v-if="item.children" v-show="item.expand" class="nav-child-menu">
              <li v-for="(child, cIndex) in item.children" :key="cIndex">
                <a class="nav-link disabled" v-if="child.disabled" title="后续版本会考虑支持该功能！">{{ child.lable }}</a>
                <router-link v-else class="nav-link" :to="child.locat">{{ child.lable }}</router-link>
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
          lable: '开发指南',
          value: 'start',
          expand: false,
          children: [
            {
              lable: '安装',
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '快速上手',
              locat: {
                name: 'TableUse'
              }
            }
          ]
        },
        {
          lable: '基本功能',
          value: 'base',
          expand: false,
          children: [
            {
              lable: '基础',
              demoUrl: 'https://jsrun.net/VrXKp',
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '尺寸',
              demoUrl: 'https://jsrun.net/PmXKp',
              locat: {
                name: 'TableSize'
              }
            },
            {
              lable: '内容显示省略号',
              locat: {
                name: 'TableOverflow'
              }
            },
            {
              lable: '斑马线条纹',
              demoUrl: 'https://jsrun.net/zrXKp',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '带边框',
              demoUrl: 'https://jsrun.net/QrXKp',
              locat: {
                name: 'TableBorder'
              }
            },
            {
              lable: '单元格样式',
              demoUrl: 'https://jsrun.net/EmXKp',
              locat: {
                name: 'TableStyle'
              }
            },
            {
              lable: '隐藏头部',
              demoUrl: 'https://jsrun.net/7mXKp',
              locat: {
                name: 'TableHeader'
              }
            },
            {
              lable: '列宽拖动',
              demoUrl: 'https://jsrun.net/5AXKp',
              locat: {
                name: 'TableResizable'
              }
            },
            {
              lable: '流体高度',
              demoUrl: 'https://jsrun.net/smXKp',
              locat: {
                name: 'TableMaxHeight'
              }
            },
            {
              lable: '固定表头',
              demoUrl: 'https://jsrun.net/JrXKp',
              locat: {
                name: 'TableHeight'
              }
            },
            {
              lable: '固定列',
              demoUrl: 'https://jsrun.net/TrXKp',
              locat: {
                name: 'TableFixed'
              }
            },
            {
              lable: '固定表头和列',
              demoUrl: 'https://jsrun.net/8rXKp',
              locat: {
                name: 'TableFixedFull'
              }
            },
            {
              lable: '表头分组',
              demoUrl: 'https://jsrun.net/7rXKp',
              locat: {
                name: 'TableGroup'
              }
            },
            {
              lable: '序号',
              demoUrl: 'https://jsrun.net/xrXKp',
              locat: {
                name: 'TableIndex'
              }
            },
            {
              lable: '单选',
              demoUrl: 'https://jsrun.net/9rXKp',
              locat: {
                name: 'TableRadio'
              }
            },
            {
              lable: '多选',
              demoUrl: 'https://jsrun.net/erXKp',
              locat: {
                name: 'TableSelection'
              }
            },
            {
              lable: '排序',
              demoUrl: 'https://jsrun.net/crXKp',
              locat: {
                name: 'TableSort'
              }
            },
            {
              lable: '筛选',
              demoUrl: 'https://jsrun.net/drXKp',
              locat: {
                name: 'TableFilter'
              }
            },
            {
              lable: '空数据',
              locat: {
                name: 'TableEmpty'
              }
            },
            {
              lable: '加载中',
              demoUrl: 'https://jsrun.net/GjXKp',
              locat: {
                name: 'TableLoading'
              }
            },
            {
              lable: '格式化内容',
              demoUrl: 'https://jsrun.net/FrXKp',
              locat: {
                name: 'TableFormat'
              }
            }
          ]
        },
        {
          lable: '高级功能',
          value: 'advanced',
          expand: false,
          children: [
            {
              lable: '自定义模板',
              demoUrl: 'https://jsrun.net/DjXKp',
              locat: {
                name: 'TableTemplate'
              }
            },
            {
              lable: '合并行或列',
              demoUrl: 'https://jsrun.net/5jXKp',
              locat: {
                name: 'TableSpan'
              }
            },
            {
              lable: '表尾合计',
              demoUrl: 'https://jsrun.net/dmXKp',
              locat: {
                name: 'TableFooter'
              }
            },
            {
              lable: '显示/隐藏列',
              demoUrl: 'https://jsrun.net/PrXKp',
              locat: {
                name: 'TableCustom'
              }
            },
            {
              lable: '导出.csv',
              demoUrl: 'https://jsrun.net/cmXKp',
              locat: {
                name: 'TableExport'
              }
            },
            {
              lable: '快捷菜单',
              demoUrl: 'https://jsrun.net/VjXKp',
              locat: {
                name: 'TableMenu'
              }
            },
            {
              lable: '展开行',
              demoUrl: 'https://jsrun.net/eRXKp',
              locat: {
                name: 'TableExpand'
              }
            }
          ]
        },
        {
          lable: 'Tree 表格',
          value: 'tree',
          expand: false,
          children: [
            {
              lable: '基本树形',
              locat: {
                name: 'TableTreeBasic'
              }
            },
            {
              lable: '单选树形',
              locat: {
                name: 'TableTreeRadio'
              }
            },
            {
              lable: '多选树形',
              locat: {
                name: 'TableTreeSelection'
              }
            },
            {
              lable: '复杂树形',
              disabled: true,
              locat: {
                name: 'TableTreeBasic'
              }
            }
          ]
        },
        {
          lable: 'Grid 表格',
          value: 'grid',
          expand: false,
          children: [
            {
              lable: '基础',
              demoUrl: 'https://jsrun.net/5RXKp',
              locat: {
                name: 'GridBasic'
              }
            },
            {
              lable: '带分页',
              locat: {
                name: 'GridPage'
              }
            },
            {
              lable: '完整功能',
              locat: {
                name: 'GridFull'
              }
            }
          ]
        },
        {
          lable: 'Big 表格',
          value: 'scroll',
          expand: false,
          children: [
            {
              lable: '海量数据',
              demoUrl: 'https://jsrun.net/XRXKp',
              locat: {
                name: 'TableScroll'
              }
            },
            {
              lable: '1 万行',
              locat: {
                name: 'TableScrollRows'
              }
            },
            {
              lable: '10 万行 + 更复杂渲染',
              locat: {
                name: 'TableScrollFullRows'
              }
            },
            {
              lable: '1 万行 1 万列',
              locat: {
                name: 'TableScrollCols'
              }
            },
            {
              lable: '10 万行 1 万列 + 更复杂渲染',
              locat: {
                name: 'TableScrollFullCols'
              }
            },
            {
              lable: '无限滚动',
              disabled: true,
              locat: {
                name: 'TableScroll'
              }
            }
          ]
        },
        {
          lable: 'Edit 表格',
          value: 'edit',
          expand: false,
          children: [
            {
              lable: '手动触发',
              locat: {
                name: 'TableEditManual'
              }
            },
            {
              lable: '点击触发',
              locat: {
                name: 'TableEditClick'
              }
            },
            {
              lable: '双击触发',
              locat: {
                name: 'TableEditDBLClick'
              }
            },
            {
              lable: '插入数据',
              locat: {
                name: 'TableEditInsert'
              }
            },
            {
              lable: '删除数据',
              locat: {
                name: 'TableEditRemove'
              }
            },
            {
              lable: '还原数据',
              locat: {
                name: 'TableEditRevert'
              }
            },
            {
              lable: '编辑状态',
              locat: {
                name: 'TableEditStatus'
              }
            },
            {
              lable: '禁用编辑 cell',
              locat: {
                name: 'TableEditCellDisable'
              }
            },
            {
              lable: '禁用编辑 row',
              locat: {
                name: 'TableEditRowDisable'
              }
            },
            {
              lable: '数据校验 cell',
              locat: {
                name: 'TableEditCellValid'
              }
            },
            {
              lable: '数据校验 row',
              locat: {
                name: 'TableEditRowValid'
              }
            },
            {
              lable: '全键盘操作',
              locat: {
                name: 'TableEditKeyboard'
              }
            },
            {
              lable: '自定义渲染',
              locat: {
                name: 'TableEditTemplate'
              }
            }
          ]
        },
        {
          lable: 'Excel 表格',
          value: 'excel',
          expand: false,
          children: [
            {
              lable: '单元格',
              locat: {
                name: 'TableExcelCell'
              }
            }
          ]
        },
        {
          lable: 'UI 集成',
          value: 'other',
          expand: false,
          children: [
            {
              lable: 'element-ui 自定义渲染',
              locat: {
                name: 'TableOtherElement'
              }
            },
            {
              lable: 'iview 自定义渲染',
              locat: {
                name: 'TableOtherIview'
              }
            },
            {
              lable: '使用 sortablejs 拖拽行排序',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            }
          ]
        },
        {
          lable: 'Plugin 插件',
          value: 'plugin',
          expand: false,
          children: [
            {
              lable: 'element-ui 配置式插件',
              locat: {
                name: 'TablePluginElementConfig'
              }
            },
            {
              lable: 'element-ui 配置式插件 + 分页',
              locat: {
                name: 'TablePluginElementPage'
              }
            },
            {
              lable: 'iview 配置式插件',
              locat: {
                name: 'TablePluginIviewConfig'
              }
            },
            {
              lable: 'iview 配置式插件 + 分页',
              locat: {
                name: 'TablePluginIviewPage'
              }
            }
          ]
        },
        {
          lable: 'API',
          value: 'api',
          expand: false,
          children: [
            {
              lable: 'vxe-table',
              locat: {
                name: 'TableAPI'
              }
            },
            {
              lable: 'vxe-table-column',
              locat: {
                name: 'TableColumnAPI'
              }
            },
            {
              lable: 'vxe-grid',
              locat: {
                name: 'GridAPI'
              }
            },
            {
              lable: 'vxe-excel',
              locat: {
                name: 'ExcelAPI'
              }
            },
            {
              lable: 'vxe-pagination',
              locat: {
                name: 'PaginationAPI'
              }
            },
            {
              lable: 'vxe-radio',
              locat: {
                name: 'RadioAPI'
              }
            },
            {
              lable: 'vxe-checkbox',
              locat: {
                name: 'CheckboxAPI'
              }
            },
            {
              lable: 'vxe-input',
              locat: {
                name: 'InputAPI'
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
