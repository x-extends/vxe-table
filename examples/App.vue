<template>
  <div id="app">
    <header class="header">
      <img class="logo" src="./assets/logo.png">
      <h1 class="title"><a href="https://github.com/xuliangzhan/vxe-table">vxe-table</a></h1>
      <span class="desc">一个性能更优、功能更强的 Vue 表格组件</span>
    </header>
    <div class="container">
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
        <a v-if="demoLink" class="link todemo" :href="demoLink" target="_blank">在线运行</a>
        <router-view/>
      </div>
    </div>
    <footer>
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
              lable: '树形结构',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            }
          ]
        },
        {
          lable: '大数据表格',
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
          expand: false,
          children: [
            {
              lable: '手动触发',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '点击触发',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '双击触发',
              disabled: true,
              locat: {
                name: 'TableInstall'
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
              lable: '显示状态',
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
            },
            {
              lable: '渲染 element-ui 组件',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '渲染 iview 组件',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            }
          ]
        },
        {
          lable: 'Excel 表格',
          expand: false,
          children: [
            {
              lable: '基础',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '单元格拖拽',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '行高拖动',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            }
          ]
        },
        {
          lable: '与第三方库集成',
          expand: false,
          children: [
            {
              lable: '集成 element-ui',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '集成 iview',
              disabled: true,
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '集成 sortablejs 实现行排序',
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

<style lang="scss" scoped>
#app {
  width: 1200px;
  margin: 0 auto;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
  * {
    box-sizing: border-box;
  }
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.header {
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;
  &:after {
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
  }
  .logo {
    float: left;
    width: 30px;
    height: 30px;
    margin: 12px 4px 0 0;
    border-radius: 50%;
  }
  .title {
    font-size: 22px;
    a {
      color: #409eff;
      text-decoration: none;
      cursor: pointer;
    }
    float: left;
  }
  .desc {
    float: right;
    font-size: 14px;
    color: #333;
    margin-top: 30px;
  }
}
.container {
  display: flex;
  border-bottom: 1px solid #dcdfe6;
  > .aside {
    width: 220px;
    flex-shrink: 0;
    user-select: none;
    padding: 15px 0 25px 0;
    border-right: 1px solid #dcdfe6;
    overflow: hidden;
    .nav-menu {
      font-size: 16px;
      color: #333;
      text-decoration: none;
      font-weight: 700;
      .nav-link {
        height: 40px;
        line-height: 40px;
      }
    }
    .nav-child-menu {
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 400;
      > li {
        padding-left: 15px;
      }
      .nav-link {
        display: block;
        height: 30px;
        line-height: 30px;
        &.router-link-exact-active,
        &:hover {
          color: #409eff;
        }
        &.router-link-exact-active {
          border-right: 2px solid #409eff;
        }
        &.disabled {
          color: #c0c4cc;
          cursor: not-allowed;
        }
      }
    }
    .nav-link {
      color: #444;
      cursor: pointer;
      text-decoration: none;
    }
  }
  > .body {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    padding: 15px 0 25px 25px;
    .todemo {
      position: absolute;
      top: 10px;
      right: 0;
      font-size: 16px;
    }
  }
}
footer {
  font-size: 12px;
  color: #333;
  text-align: center;
}
</style>
