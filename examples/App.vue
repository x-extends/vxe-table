<template>
  <div id="app">
    <header class="header">
      <img class="logo" src="./assets/logo.png">
      <h1 class="title"><a href="https://github.com/xuliangzhan/vxe-table">VXE-Table</a></h1>
      <span class="desc">一个性能更优、功能更强的 Vue 表格组件</span>
    </header>
    <div class="container">
      <div class="aside">
        <ul class="nav-menu">
          <li v-for="(item, index) in tableList" :key="index">
            <a class="nav-link" @click="item.expand = !item.expand">{{ item.lable }}</a>
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
        <router-view/>
      </div>
    </div>
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
          expand: true,
          children: [
            {
              lable: '安装',
              locat: {
                name: 'TableInstall'
              }
            },
            {
              lable: '快速上手',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            }
          ]
        },
        {
          lable: '基本表格',
          expand: false,
          children: [
            {
              lable: '基础',
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '尺寸',
              locat: {
                name: 'TableSize'
              }
            },
            {
              lable: '斑马线条纹',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '带边框',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '单元格样式',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '列宽拖动',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '流体高度',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '固定表头',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '固定列',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '固定表头和列',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '表头分组',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '序号',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '单选',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '多选',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '排序',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '筛选',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '加载中',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '格式化内容',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '自定义模板',
              locat: {
                name: 'TableStripe'
              }
            }
          ]
        },
        {
          lable: '高级功能',
          expand: false,
          children: [
            {
              lable: '合并行或列',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '表尾合计',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '自定义列',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '导出.cvs',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '快捷菜单',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '展开行',
              disabled: true,
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '树形结构',
              disabled: true,
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '使用 sortablejs 实现行排序',
              disabled: true,
              locat: {
                name: 'TableStripe'
              }
            }
          ]
        },
        {
          lable: '大数据表格',
          expand: false,
          children: [
            {
              lable: '滚动渲染',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '加载 1 万条数据',
              disabled: true,
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '加载 10 万条数据',
              disabled: true,
              locat: {
                name: 'TableStripe'
              }
            },
            {
              lable: '加载 50 万条数据',
              disabled: true,
              locat: {
                name: 'TableStripe'
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
                name: 'TableBasic'
              }
            },
            {
              lable: '点击触发',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '双击触发',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '插入数据',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '删除数据',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '修改数据',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '还原数据',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '显示状态',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '禁用编辑',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '数据校验',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '键盘导航',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '自定义渲染',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '渲染 element-ui 组件',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '渲染 iview 组件',
              disabled: true,
              locat: {
                name: 'TableBasic'
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
                name: 'TableBasic'
              }
            },
            {
              lable: '单元格拖拽',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            },
            {
              lable: '行高拖动',
              disabled: true,
              locat: {
                name: 'TableBasic'
              }
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 20px;
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
    margin: 14px 4px 0 0;
    border-radius: 50%;
  }
  .title {
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
    margin-top: 44px;
  }
}
.container {
  display: flex;
  margin-top: 15px;
  > .aside {
    width: 220px;
    flex-shrink: 0;
    user-select: none;
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
        height: 30px;
        line-height: 30px;
        &.router-link-exact-active,
        &:hover {
          color: #409eff;
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
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
