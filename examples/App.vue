<template>
  <div id="app" @click="clickEvent">
    <!--icon-->
    <!-- <i class="vxe-icon--caret-top"></i>
    <i class="vxe-icon--caret-bottom"></i>
    <i class="vxe-icon--caret-left"></i>
    <i class="vxe-icon--caret-right"></i>
    <i class="vxe-icon--arrow-top"></i>
    <i class="vxe-icon--arrow-bottom"></i>
    <i class="vxe-icon--arrow-left"></i>
    <i class="vxe-icon--arrow-right"></i>
    <i class="vxe-icon--d-arrow-top"></i>
    <i class="vxe-icon--d-arrow-bottom"></i>
    <i class="vxe-icon--d-arrow-left"></i>
    <i class="vxe-icon--d-arrow-right"></i>
    <i class="vxe-icon--menu"></i>
    <i class="vxe-icon--funnel"></i>
    <i class="vxe-icon--edit-outline"></i>
    <i class="vxe-icon--more"></i> -->
    <header class="page-header">
      <img class="logo" src="./assets/logo.jpg">
      <h1 class="title">
        <a href="https://github.com/xuliangzhan/vxe-table">vxe-table</a>
      </h1>
      <div class="right">
        <div class="langs">
          <vxe-radio v-model="$i18n.locale" name="lang" label="zh-CN">中文</vxe-radio>
          <vxe-radio v-model="$i18n.locale" name="lang" label="en">English</vxe-radio>
        </div>
        <div class="desc">{{ $t('app.header.desc') }}</div>
      </div>
    </header>
    <div class="page-container">
      <div class="aside">
        <ul class="nav-menu">
          <li v-for="(item, index) in tableList" :key="index">
            <a class="nav-link" @click="linkEvent(item)" :title="$t(item.label)">{{ $t(item.label) }}</a>
            <ul v-if="item.children" v-show="item.expand" class="nav-child-menu">
              <li v-for="(child, cIndex) in item.children" :key="cIndex">
                <a class="nav-link disabled" v-if="child.disabled" title="由于作者比较忙，后续有时间会完善该功能！">{{ $t(child.label) }}</a>
                <router-link v-else class="nav-link" :to="child.locat" :title="$t(child.label)">{{ $t(child.label) }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="body">
        <a class="link tosrc" :href="`https://github.com/xuliangzhan/vxe-table/tree/master/examples/views/table/${pageKey}`" target="_blank">{{ $t('app.body.button.viewCode') }}</a>
        <a v-if="demoLink" class="link todemo" :href="demoLink" target="_blank">{{ $t('app.body.button.runDemo') }}</a>
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
          label: 'app.aside.nav.start',
          value: 'start',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.install',
              locat: {
                name: 'Install'
              }
            },
            {
              label: 'app.aside.nav.use',
              locat: {
                name: 'Use'
              }
            },
            {
              label: 'app.aside.nav.theme',
              locat: {
                name: 'Theme'
              }
            },
            {
              label: 'app.aside.nav.i18n',
              locat: {
                name: 'I18n'
              }
            },
            {
              label: 'app.aside.nav.advancedFunctions',
              locat: {
                name: 'Advanced'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.basics',
          value: 'base',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.base',
              demoUrl: 'https://jsrun.net/VrXKp',
              locat: {
                name: 'TableBasic'
              }
            },
            {
              label: 'app.aside.nav.size',
              demoUrl: 'https://jsrun.net/PmXKp',
              locat: {
                name: 'TableSize'
              }
            },
            {
              label: 'app.aside.nav.ellipsis',
              locat: {
                name: 'TableOverflow'
              }
            },
            {
              label: 'app.aside.nav.stripe',
              demoUrl: 'https://jsrun.net/zrXKp',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              label: 'app.aside.nav.border',
              demoUrl: 'https://jsrun.net/QrXKp',
              locat: {
                name: 'TableBorder'
              }
            },
            {
              label: 'app.aside.nav.style',
              demoUrl: 'https://jsrun.net/EmXKp',
              locat: {
                name: 'TableStyle'
              }
            },
            {
              label: 'app.aside.nav.hideHead',
              demoUrl: 'https://jsrun.net/7mXKp',
              locat: {
                name: 'TableHeader'
              }
            },
            {
              label: 'app.aside.nav.resizable',
              demoUrl: 'https://jsrun.net/5AXKp',
              locat: {
                name: 'TableResizable'
              }
            },
            {
              label: 'app.aside.nav.fluidHeight',
              demoUrl: 'https://jsrun.net/smXKp',
              locat: {
                name: 'TableMaxHeight'
              }
            },
            {
              label: 'app.aside.nav.resize',
              locat: {
                name: 'TableAutoHeight'
              }
            },
            {
              label: 'app.aside.nav.height',
              demoUrl: 'https://jsrun.net/JrXKp',
              locat: {
                name: 'TableHeight'
              }
            },
            {
              label: 'app.aside.nav.fixed',
              demoUrl: 'https://jsrun.net/TrXKp',
              locat: {
                name: 'TableFixed'
              }
            },
            {
              label: 'app.aside.nav.fullFixed',
              demoUrl: 'https://jsrun.net/8rXKp',
              locat: {
                name: 'TableFixedFull'
              }
            },
            {
              label: 'app.aside.nav.group',
              demoUrl: 'https://jsrun.net/7rXKp',
              locat: {
                name: 'TableGroup'
              }
            },
            {
              label: 'app.aside.nav.seq',
              demoUrl: 'https://jsrun.net/xrXKp',
              locat: {
                name: 'TableIndex'
              }
            },
            {
              label: 'app.aside.nav.radio',
              demoUrl: 'https://jsrun.net/9rXKp',
              locat: {
                name: 'TableRadio'
              }
            },
            {
              label: 'app.aside.nav.checkbox',
              demoUrl: 'https://jsrun.net/erXKp',
              locat: {
                name: 'TableSelection'
              }
            },
            {
              label: 'app.aside.nav.sort',
              demoUrl: 'https://jsrun.net/crXKp',
              locat: {
                name: 'TableSort'
              }
            },
            {
              label: 'app.aside.nav.filter',
              demoUrl: 'https://jsrun.net/drXKp',
              locat: {
                name: 'TableFilter'
              }
            },
            {
              label: 'app.aside.nav.empty',
              locat: {
                name: 'TableEmpty'
              }
            },
            {
              label: 'app.aside.nav.loading',
              demoUrl: 'https://jsrun.net/GjXKp',
              locat: {
                name: 'TableLoading'
              }
            },
            {
              label: 'app.aside.nav.format',
              demoUrl: 'https://jsrun.net/FrXKp',
              locat: {
                name: 'TableFormat'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.more',
          value: 'advanced',
          expand: false,
          children: [
            {

              label: 'app.aside.nav.events',
              locat: {
                name: 'TableEvent'
              }
            },
            {
              label: 'app.aside.nav.template',
              demoUrl: 'https://jsrun.net/DjXKp',
              locat: {
                name: 'TableTemplate'
              }
            },
            {
              label: 'app.aside.nav.span',
              demoUrl: 'https://jsrun.net/5jXKp',
              locat: {
                name: 'TableSpan'
              }
            },
            {
              label: 'app.aside.nav.footer',
              demoUrl: 'https://jsrun.net/dmXKp',
              locat: {
                name: 'TableFooter'
              }
            },
            {
              label: 'app.aside.nav.export',
              demoUrl: 'https://jsrun.net/cmXKp',
              locat: {
                name: 'TableExport'
              }
            },
            {
              label: 'app.aside.nav.contextMenu',
              demoUrl: 'https://jsrun.net/VjXKp',
              locat: {
                name: 'TableMenu'
              }
            },
            {
              label: 'app.aside.nav.expandRow',
              demoUrl: 'https://jsrun.net/eRXKp',
              locat: {
                name: 'TableExpand'
              }
            },
            {
              label: 'app.aside.nav.toolbar',
              locat: {
                name: 'Toolbar'
              }
            },
            {
              label: 'app.aside.nav.customs',
              demoUrl: 'https://jsrun.net/PrXKp',
              locat: {
                name: 'TableCustom'
              }
            },
            {
              label: 'app.aside.nav.customStorage',
              locat: {
                name: 'TableCustomStorage'
              }
            },
            {
              label: 'app.aside.nav.search',
              locat: {
                name: 'TableSearch'
              }
            },
            {
              label: 'app.aside.nav.pager',
              locat: {
                name: 'TablePage'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.tree',
          value: 'tree',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.base',
              locat: {
                name: 'TableTreeBasic'
              }
            },
            {
              label: 'app.aside.nav.radio',
              locat: {
                name: 'TableTreeRadio'
              }
            },
            {
              label: 'app.aside.nav.checkbox',
              locat: {
                name: 'TableTreeSelection'
              }
            },
            {
              label: 'app.aside.nav.edit',
              locat: {
                name: 'TableTreeEdit'
              }
            },
            {
              label: 'app.aside.nav.crudToolbar',
              locat: {
                name: 'TableTreeToolbar'
              }
            },
            {
              label: 'app.aside.nav.lazy',
              disabled: true,
              locat: {
                name: 'TableTreeBasic'
              }
            },
            {
              label: 'app.aside.nav.full',
              disabled: true,
              locat: {
                name: 'TableTreeBasic'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.grid',
          value: 'grid',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.base',
              demoUrl: 'https://jsrun.net/5RXKp',
              locat: {
                name: 'GridBasic'
              }
            },
            {
              label: 'app.aside.nav.template',
              locat: {
                name: 'GridTemplate'
              }
            },
            {
              label: 'app.aside.nav.pager',
              locat: {
                name: 'GridPage'
              }
            },
            {
              label: 'app.aside.nav.proxy',
              locat: {
                name: 'GridProxy'
              }
            },
            {
              label: 'app.aside.nav.proxyPage',
              locat: {
                name: 'GridPageProxy'
              }
            },
            {
              label: 'app.aside.nav.fullQuery',
              locat: {
                name: 'GridFullQuery'
              }
            },
            {
              label: 'app.aside.nav.edit',
              locat: {
                name: 'GridEdit'
              }
            },
            {
              label: 'app.aside.nav.crudToolbar',
              locat: {
                name: 'GridToolbar'
              }
            },
            {
              label: 'app.aside.nav.dynamicColumn',
              locat: {
                name: 'GridDynamic'
              }
            },
            {
              label: 'app.aside.nav.baseTree',
              locat: {
                name: 'GridTree'
              }
            },
            {
              label: 'app.aside.nav.crudTreeToolbar',
              locat: {
                name: 'GridTreeEdit'
              }
            },
            {
              label: 'app.aside.nav.full',
              locat: {
                name: 'GridFullEdit'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.scroll',
          value: 'scroll',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.bigData',
              demoUrl: 'https://jsrun.net/XRXKp',
              locat: {
                name: 'TableScroll'
              }
            },
            {
              label: 'app.aside.nav.big1wRow',
              locat: {
                name: 'TableScrollRows'
              }
            },
            {
              label: 'app.aside.nav.big10wRow',
              locat: {
                name: 'TableScrollFullRows'
              }
            },
            {
              label: 'app.aside.nav.big1wRow1wCol',
              demoUrl: 'https://jsrun.net/ULyKp',
              locat: {
                name: 'TableScrollCols'
              }
            },
            {
              label: 'app.aside.nav.big10wRow1wCol',
              locat: {
                name: 'TableScrollFullCols'
              }
            },
            {
              label: 'app.aside.nav.infiniteScroll',
              disabled: true,
              locat: {
                name: 'TableScroll'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.editable',
          value: 'edit',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.manual',
              locat: {
                name: 'TableEditManual'
              }
            },
            {
              label: 'app.aside.nav.click',
              locat: {
                name: 'TableEditClick'
              }
            },
            {
              label: 'app.aside.nav.dblclick',
              locat: {
                name: 'TableEditDBLClick'
              }
            },
            {
              label: 'app.aside.nav.select',
              locat: {
                name: 'TableEditSelect'
              }
            },
            {
              label: 'app.aside.nav.autoClear',
              locat: {
                name: 'TableAutoClearManual'
              }
            },
            {
              label: 'app.aside.nav.insert',
              locat: {
                name: 'TableEditInsert'
              }
            },
            {
              label: 'app.aside.nav.delete',
              locat: {
                name: 'TableEditRemove'
              }
            },
            {
              label: 'app.aside.nav.revert',
              locat: {
                name: 'TableEditRevert'
              }
            },
            {
              label: 'app.aside.nav.status',
              locat: {
                name: 'TableEditStatus'
              }
            },
            {
              label: 'app.aside.nav.cellDisable',
              locat: {
                name: 'TableEditCellDisable'
              }
            },
            {
              label: 'app.aside.nav.rowDisable',
              locat: {
                name: 'TableEditRowDisable'
              }
            },
            {
              label: 'app.aside.nav.cellVaild',
              locat: {
                name: 'TableEditCellValid'
              }
            },
            {
              label: 'app.aside.nav.rowVaild',
              locat: {
                name: 'TableEditRowValid'
              }
            },
            {
              label: 'app.aside.nav.forceCellValid',
              disabled: true,
              locat: {
                name: 'TableEditForceCellValid'
              }
            },
            {
              label: 'app.aside.nav.forceRowVaild',
              disabled: true,
              locat: {
                name: 'TableEditForceRowValid'
              }
            },
            {
              label: 'app.aside.nav.keyboard',
              locat: {
                name: 'TableEditKeyboard'
              }
            },
            {
              label: 'app.aside.nav.template',
              locat: {
                name: 'TableEditTemplate'
              }
            },
            {
              label: 'app.aside.nav.full',
              disabled: true,
              locat: {
                name: 'TableEditFull'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.excel',
          value: 'excel',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.cell',
              locat: {
                name: 'TableExcelCell'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.other',
          value: 'other',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.elementRender',
              locat: {
                name: 'TableOtherElement'
              }
            },
            {
              label: 'app.aside.nav.iviewRender',
              locat: {
                name: 'TableOtherIview'
              }
            },
            {
              label: 'app.aside.nav.antd',
              locat: {
                name: 'TableOtherAntd'
              }
            },
            {
              label: 'app.aside.nav.sortablejsRow',
              locat: {
                name: 'TableSortableRow'
              }
            },
            {
              label: 'app.aside.nav.sortablejsColumn',
              locat: {
                name: 'TableSortableColumn'
              }
            },
            {
              label: 'app.aside.nav.xlsxRender',
              locat: {
                name: 'TableXlsx'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.plugin',
          value: 'plugin',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.elementPlugin',
              locat: {
                name: 'TablePluginElementConfig'
              }
            },
            {
              label: 'app.aside.nav.elementPluginMore',
              locat: {
                name: 'TablePluginElementPage'
              }
            },
            {
              label: 'app.aside.nav.iviewPlugin',
              locat: {
                name: 'TablePluginIviewConfig'
              }
            },
            {
              label: 'app.aside.nav.iviewPluginMore',
              locat: {
                name: 'TablePluginIviewPage'
              }
            },
            {
              label: 'app.aside.nav.antdPlugin',
              locat: {
                name: 'TablePluginAntdConfig'
              }
            },
            {
              label: 'app.aside.nav.antdPluginMore',
              locat: {
                name: 'TablePluginAntdPage'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.api',
          value: 'api',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.vxeTable',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'table'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeTableColumn',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'table-column'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeGrid',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'grid'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeExcel',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'excel'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeToolbar',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'toolbar'
                }
              }
            },
            {
              label: 'app.aside.nav.vxePager',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'pager'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeRadio',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'radio'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeCheckbox',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'checkbox'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeInput',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'input'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeButton',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'button'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeMessageBox',
              locat: {
                name: 'TableAPI',
                params: {
                  name: 'message-box'
                }
              }
            // },
            // {
            //   label: 'app.aside.nav.vxeTooltip',
            //   locat: {
            //     name: 'TableAPI',
            //     params: {
            //       name: 'tooltip'
            //     }
            //   }
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
    },
    pageKey () {
      return this.$route.path.split('/')[2]
    }
  },
  watch: {
    pageKey () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.tableList.forEach(item => {
        item.expand = false
      })
      let group = this.tableList.find(item => item.value === this.pageKey)
      if (group) {
        group.expand = true
      }
    },
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
