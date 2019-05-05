<template>
  <div id="app">
    <header class="page-header">
      <img class="logo" src="./assets/logo.png">
      <h1 class="title"><a href="https://github.com/xuliangzhan/vxe-table">vxe-table</a></h1>
      <span class="desc">一个性能更优、功能更强的 Vue 表格组件</span>
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
          lable: '基本表格',
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
            },
            {
              lable: '自定义模板',
              demoUrl: 'https://jsrun.net/DjXKp',
              locat: {
                name: 'TableTemplate'
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
              lable: '自定义列',
              demoUrl: 'https://jsrun.net/PrXKp',
              locat: {
                name: 'TableCustom'
              }
            },
            {
              lable: '导出.cvs',
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
            },
            {
              lable: '配置的方式',
              demoUrl: 'https://jsrun.net/5RXKp',
              locat: {
                name: 'TableConfig'
              }
            },
            {
              lable: '树形结构',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            }
          ]
        },
        {
          lable: '海量数据',
          value: 'scroll',
          expand: false,
          children: [
            {
              lable: '滚动渲染',
              demoUrl: 'https://jsrun.net/XRXKp',
              locat: {
                name: 'TableScroll'
              }
            },
            {
              lable: '1 万条',
              locat: {
                name: 'TableScrollSize',
                params: {
                  size: 10000
                }
              }
            },
            {
              lable: '10 万条 + 固定列',
              locat: {
                name: 'TableScrollFixed',
                params: {
                  size: 100000
                }
              }
            },
            {
              lable: '20 万条 + 表尾合计',
              locat: {
                name: 'TableScrollFooter',
                params: {
                  size: 200000
                }
              }
            }
          ]
        },
        {
          lable: '可编辑表格',
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
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '删除数据',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '修改数据',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '还原数据',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '编辑状态',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '禁用编辑',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '数据校验',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '键盘导航',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '自定义渲染',
              disabled: true,
              locat: {
                name: 'TableInstall'
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
              lable: '单元格编辑',
              locat: {
                name: 'TableExcelCell'
              }
            },
            {
              lable: '单元格拖拽',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            }
          ]
        },
        {
          lable: '集成渲染',
          expand: false,
          children: [
            {
              lable: '与 element-ui 集成',
              locat: {
                name: 'TableOtherElement'
              }
            },
            {
              lable: '使用 element-ui 配置式插件',
              locat: {
                name: 'TableOtherElementConfig'
              }
            },
            {
              lable: '与 iview 集成',
              locat: {
                name: 'TableOtherIview'
              }
            },
            {
              lable: '使用 iview 配置式插件',
              locat: {
                name: 'TableOtherIviewConfig'
              }
            },
            {
              lable: '使用 sortablejs 实现行排序',
              disabled: true,
              locat: {
                name: 'TableInstall'
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
