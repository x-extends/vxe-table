<template>
  <div id="app" @click="clickEvent">
    <header class="page-header">
      <div class="left">
        <a href="https://github.com/xuliangzhan/vxe-table">
          <span class="title">🐬vxe-table</span>
        </a>
        <a href='https://gitee.com/xuliangzhan_admin/vxe-table/stargazers'>
          <img src='https://gitee.com/xuliangzhan_admin/vxe-table/badge/star.svg?theme=dark' alt='star'>
        </a>
        <a href="https://github.com/xuliangzhan/vxe-table/stargazers">
          <img src="https://img.shields.io/github/stars/xuliangzhan/vxe-table.svg">
        </a>
        <a href="http://npm-stat.com/charts.html?package=vxe-table">
          <img src="https://img.shields.io/npm/dm/vxe-table.svg">
        </a>
        <a href="https://github.com/xuliangzhan/vxe-table/blob/master/LICENSE">
          <img src="https://img.shields.io/github/license/mashape/apistatus.svg">
        </a>
      </div>
      <div class="right">
        <div class="content">
          <span v-if="usedJSHeapSize" class="performance">Memory used: {{ usedJSHeapSize }} MB.</span>
          <span>{{ $t('app.body.label.translations') }}:</span>
          <select class="locale-switch" v-model="$i18n.locale">
            <option value="zh-CN">中文</option>
            <option value="en">English</option>
          </select>
          <span>{{ $t('app.body.label.version') }}: </span>
          <select class="version-switch" v-model="version" @change="vChangeEvent">
            <option value="1">V1</option>
            <option value="2">V2</option>
            <option value="3">V3</option>
          </select>
          <vxe-tooltip :content="$t('app.footer.donationDesc')" enterable>
            <a class="donation" href="https://github.com/xuliangzhan/vxe-table#donation" target="_blank">{{ $t('app.footer.donation') }}☕</a>
          </vxe-tooltip>
        </div>
      </div>
    </header>
    <div class="page-container">
      <div class="aside">
        <ul class="nav-menu">
          <li v-for="(item, index) in tableList" :key="index" :class="{expand: item.expand}">
            <a class="nav-link" @click="linkEvent(item)" :title="$t(item.disabled ? 'app.body.other.newFunc' : item.label)" :class="{disabled: item.disabled, active: pageKey === item.value}"><i class="vxe-icon--arrow-right nav-link-icon"></i>{{ $t(item.label) }}</a>
            <ul v-if="item.children" v-show="item.expand" class="nav-child-menu">
              <li v-for="(child, cIndex) in item.children" :key="cIndex">
                <a class="nav-link disabled" v-if="child.disabled" :title="$t('app.body.other.newFunc')">{{ $t(child.label) }}</a>
                <router-link v-else class="nav-link" :to="child.locat" :title="$t(child.label)">{{ $t(child.label) }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="body">
        <div class="content" :class="{full: $route.name && $route.name.indexOf('API') > 0}">
          <template v-if="$route.path.indexOf('/module') === -1 && $route.path.indexOf('/api') === -1">
            <a class="link tosrc" :href="`https://github.com/xuliangzhan/vxe-table/tree/master/examples/views/table/${pageKey}`" target="_blank">{{ $t('app.body.button.viewCode') }}</a>
            <a v-if="demoLink" class="link todemo" :href="demoLink" target="_blank">{{ $t('app.body.button.runDemo') }}</a>
          </template>
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      selected: null,
      version: '1',
      usedJSHeapSize: 0,
      tableList: [
        {
          label: 'app.aside.nav.start',
          value: 'start',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.install',
              locat: {
                name: 'StartInstall'
              }
            },
            {
              label: 'app.aside.nav.use',
              locat: {
                name: 'StartUse'
              }
            },
            {
              label: 'app.aside.nav.global',
              locat: {
                name: 'StartGlobal'
              }
            },
            {
              label: 'app.aside.nav.icons',
              locat: {
                name: 'StartIcons'
              }
            },
            {
              label: 'app.aside.nav.theme',
              locat: {
                name: 'StartTheme'
              }
            },
            {
              label: 'app.aside.nav.i18n',
              locat: {
                name: 'StartI18n'
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
              demoUrl: 'https://jsrun.net/VrXKp/edit',
              locat: {
                name: 'TableBasic'
              }
            },
            {
              label: 'app.aside.nav.size',
              demoUrl: 'https://jsrun.net/PmXKp/edit',
              locat: {
                name: 'TableSize'
              }
            },
            {
              label: 'app.aside.nav.width',
              locat: {
                name: 'TableWidth'
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
              demoUrl: 'https://jsrun.net/zrXKp/edit',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              label: 'app.aside.nav.border',
              demoUrl: 'https://jsrun.net/QrXKp/edit',
              locat: {
                name: 'TableBorder'
              }
            },
            {
              label: 'app.aside.nav.style',
              demoUrl: 'https://jsrun.net/EmXKp/edit',
              locat: {
                name: 'TableStyle'
              }
            },
            {
              label: 'app.aside.nav.dynamicStyle',
              demoUrl: 'https://jsrun.pro/mVWKp/edit',
              locat: {
                name: 'TableDynamicStyle'
              }
            },
            {
              label: 'app.aside.nav.hideHead',
              demoUrl: 'https://jsrun.net/7mXKp/edit',
              locat: {
                name: 'TableHeader'
              }
            },
            {
              label: 'app.aside.nav.resizable',
              demoUrl: 'https://jsrun.net/5AXKp/edit',
              locat: {
                name: 'TableResizable'
              }
            },
            {
              label: 'app.aside.nav.fluidHeight',
              demoUrl: 'https://jsrun.net/smXKp/edit',
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
              demoUrl: 'https://jsrun.net/JrXKp/edit',
              locat: {
                name: 'TableHeight'
              }
            },
            {
              label: 'app.aside.nav.fixed',
              demoUrl: 'https://jsrun.net/TrXKp/edit',
              locat: {
                name: 'TableFixed'
              }
            },
            {
              label: 'app.aside.nav.fullFixed',
              demoUrl: 'https://jsrun.net/8rXKp/edit',
              locat: {
                name: 'TableFixedFull'
              }
            },
            {
              label: 'app.aside.nav.group',
              demoUrl: 'https://jsrun.net/7rXKp/edit',
              locat: {
                name: 'TableGroup'
              }
            },
            {
              label: 'app.aside.nav.seq',
              demoUrl: 'https://jsrun.net/xrXKp/edit',
              locat: {
                name: 'TableIndex'
              }
            },
            {
              label: 'app.aside.nav.headerHighlight',
              locat: {
                name: 'TableHeaderHighlight'
              }
            },
            {
              label: 'app.aside.nav.current',
              locat: {
                name: 'TableCurrent'
              }
            },
            {
              label: 'app.aside.nav.radio',
              demoUrl: 'https://jsrun.net/9rXKp/edit',
              locat: {
                name: 'TableRadio'
              }
            },
            {
              label: 'app.aside.nav.checkbox',
              demoUrl: 'https://jsrun.net/erXKp/edit',
              locat: {
                name: 'TableSelection'
              }
            },
            {
              label: 'app.aside.nav.sort',
              demoUrl: 'https://jsrun.net/crXKp/edit',
              locat: {
                name: 'TableSort'
              }
            },
            {
              label: 'app.aside.nav.filter',
              demoUrl: 'https://jsrun.net/drXKp/edit',
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
              demoUrl: 'https://jsrun.net/GjXKp/edit',
              locat: {
                name: 'TableLoading'
              }
            },
            {
              label: 'app.aside.nav.format',
              demoUrl: 'https://jsrun.net/FrXKp/edit',
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
              demoUrl: 'https://jsrun.net/DjXKp/edit',
              locat: {
                name: 'TableTemplate'
              }
            },
            {
              label: 'app.aside.nav.dynamic',
              demoUrl: 'https://jsrun.pro/SIWKp/edit',
              locat: {
                name: 'TableDynamic'
              }
            },
            {
              label: 'app.aside.nav.sortIcon',
              locat: {
                name: 'TableSortIcon'
              }
            },
            {
              label: 'app.aside.nav.customSort',
              locat: {
                name: 'TableCustomSort'
              }
            },
            {
              label: 'app.aside.nav.manualFilter',
              locat: {
                name: 'TableManualFilter'
              }
            },
            {
              label: 'app.aside.nav.filterIcon',
              locat: {
                name: 'TableFilterIcon'
              }
            },
            {
              label: 'app.aside.nav.span',
              demoUrl: 'https://jsrun.net/5jXKp/edit',
              locat: {
                name: 'TableSpan'
              }
            },
            {
              label: 'app.aside.nav.footer',
              demoUrl: 'https://jsrun.net/dmXKp/edit',
              locat: {
                name: 'TableFooter'
              }
            },
            {
              label: 'app.aside.nav.footerSpan',
              locat: {
                name: 'TableFooterSpan'
              }
            },
            {
              label: 'app.aside.nav.fluidHeight',
              locat: {
                name: 'TableFooterMaxHeight'
              }
            },
            {
              label: 'app.aside.nav.import',
              demoUrl: 'https://jsrun.pro/UaWKp/edit',
              locat: {
                name: 'TableImport'
              }
            },
            {
              label: 'app.aside.nav.export',
              demoUrl: 'https://jsrun.net/cmXKp/edit',
              locat: {
                name: 'TableExport'
              }
            },
            {
              label: 'app.aside.nav.print',
              locat: {
                name: 'TablePrint'
              }
            },
            {
              label: 'app.aside.nav.fixedType',
              locat: {
                name: 'TableFixedType'
              }
            },
            {
              label: 'app.aside.nav.contextMenu',
              demoUrl: 'https://jsrun.net/VjXKp/edit',
              locat: {
                name: 'TableMenu'
              }
            },
            {
              label: 'app.aside.nav.menuPrivilege',
              locat: {
                name: 'TableMenuPrivilege'
              }
            },
            {
              label: 'app.aside.nav.expandRow',
              demoUrl: 'https://jsrun.net/eRXKp/edit',
              locat: {
                name: 'TableExpand'
              }
            },
            {
              label: 'app.aside.nav.expandRowIcon',
              locat: {
                name: 'TableExpandIcon'
              }
            },
            {
              label: 'app.aside.nav.accordion',
              locat: {
                name: 'TableExpandAccordion'
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
              demoUrl: 'https://jsrun.net/PrXKp/edit',
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
              label: 'app.aside.nav.customlWidthStorage',
              locat: {
                name: 'TableCustomlWidthStorage'
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
            },
            {
              label: 'app.aside.nav.pageIcon',
              locat: {
                name: 'TablePageIcon'
              }
            },
            {
              label: 'app.aside.nav.moveHighlight',
              locat: {
                name: 'TableHighlight'
              }
            },
            {
              label: 'app.aside.nav.tabs',
              locat: {
                name: 'TableTabs'
              }
            },
            {
              label: 'app.aside.nav.keepAlives',
              locat: {
                name: 'TableKeepAliveTable1'
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
              demoUrl: 'https://jsrun.net/5RXKp/edit',
              locat: {
                name: 'GridBasic'
              }
            },
            {
              label: 'app.aside.nav.group',
              demoUrl: 'https://jsrun.pro/M8WKp/edit',
              locat: {
                name: 'GridGroup'
              }
            },
            {
              label: 'app.aside.nav.reverse',
              demoUrl: 'https://jsrun.pro/zIWKp/edit',
              locat: {
                name: 'GridReverse'
              }
            },
            {
              label: 'app.aside.nav.template',
              locat: {
                name: 'GridTemplate'
              }
            },
            {
              label: 'app.aside.nav.footer',
              locat: {
                name: 'GridFooter'
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
              demoUrl: 'https://jsrun.pro/XwWKp/edit',
              locat: {
                name: 'GridProxy'
              }
            },
            {
              label: 'app.aside.nav.proxyPage',
              demoUrl: 'https://jsrun.pro/ywWKp/edit',
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
              label: 'app.aside.nav.cellDisable',
              locat: {
                name: 'GridCellDisable'
              }
            },
            {
              label: 'app.aside.nav.rowDisable',
              locat: {
                name: 'GridRowDisable'
              }
            },
            {
              label: 'app.aside.nav.crudToolbar',
              locat: {
                name: 'GridToolbar'
              }
            },
            {
              label: 'app.aside.nav.customToolbar',
              locat: {
                name: 'GridCustomToolbar'
              }
            },
            {
              label: 'app.aside.nav.toolbarIcon',
              locat: {
                name: 'GridToolbarIcon'
              }
            },
            {
              label: 'app.aside.nav.fullscreen',
              locat: {
                name: 'GridFullscreen'
              }
            },
            {
              label: 'app.aside.nav.dynamicColumn',
              locat: {
                name: 'GridDynamic'
              }
            },
            {
              label: 'app.aside.nav.contextMenu',
              demoUrl: 'https://jsrun.pro/m6WKp/edit',
              locat: {
                name: 'GridMenu'
              }
            },
            {
              label: 'app.aside.nav.span',
              disabled: true,
              locat: {
                name: 'GridSpan'
              }
            },
            {
              label: 'app.aside.nav.upload',
              locat: {
                name: 'GridUpload'
              }
            },
            {
              label: 'app.aside.nav.baseTree',
              locat: {
                name: 'GridTree'
              }
            },
            {
              label: 'app.aside.nav.lazyTree',
              locat: {
                name: 'GridTreeLazy'
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
              demoUrl: 'https://jsrun.pro/r6WKp/edit',
              locat: {
                name: 'GridFullEdit'
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
              demoUrl: 'https://jsrun.pro/YfWKp/edit',
              locat: {
                name: 'TableTreeBasic'
              }
            },
            {
              label: 'app.aside.nav.treeNormal',
              locat: {
                name: 'TableTreeNormal'
              }
            },
            {
              label: 'app.aside.nav.customIcon',
              locat: {
                name: 'TableTreeIcon'
              }
            },
            {
              label: 'app.aside.nav.radio',
              demoUrl: 'https://jsrun.pro/kfWKp/edit',
              locat: {
                name: 'TableTreeRadio'
              }
            },
            {
              label: 'app.aside.nav.accordion',
              locat: {
                name: 'TableTreeAccordion'
              }
            },
            {
              label: 'app.aside.nav.checkbox',
              demoUrl: 'https://jsrun.pro/B6bKp/edit',
              locat: {
                name: 'TableTreeSelection'
              }
            },
            {
              label: 'app.aside.nav.fixed',
              demoUrl: 'https://jsrun.pro/ifWKp/edit',
              locat: {
                name: 'TableTreeFixed'
              }
            },
            {
              label: 'app.aside.nav.fluidHeight',
              locat: {
                name: 'TableTreeMaxHeight'
              }
            },
            {
              label: 'app.aside.nav.groupSummary',
              demoUrl: 'https://jsrun.pro/KVWKp/edit',
              locat: {
                name: 'TableTreeGroupSummary'
              }
            },
            {
              label: 'app.aside.nav.groupSummaryCount',
              demoUrl: 'https://jsrun.pro/GTWKp/edit',
              locat: {
                name: 'TableTreeGroupSummaryCount'
              }
            },
            {
              label: 'app.aside.nav.expandRow',
              locat: {
                name: 'TableTreeExpand'
              }
            },
            {
              label: 'app.aside.nav.crudToolbar',
              locat: {
                name: 'TableTreeToolbar'
              }
            },
            {
              label: 'app.aside.nav.insert',
              locat: {
                name: 'TableTreeInsert'
              }
            },
            {
              label: 'app.aside.nav.contextMenu',
              locat: {
                name: 'TableTreeMenu'
              }
            },
            {
              label: 'app.aside.nav.span',
              disabled: true,
              locat: {
                name: 'TableTreeSpan'
              }
            },
            {
              label: 'app.aside.nav.moveHighlight',
              locat: {
                name: 'TableTreeHighlight'
              }
            },
            {
              label: 'app.aside.nav.keyboard',
              disabled: true,
              locat: {
                name: 'TableTreeKeyboard'
              }
            },
            {
              label: 'app.aside.nav.lazy',
              locat: {
                name: 'TableTreeLazy'
              }
            },
            {
              label: 'app.aside.nav.treeLine',
              locat: {
                name: 'TableTreeLine'
              }
            },
            {
              label: 'app.aside.nav.edit',
              locat: {
                name: 'TableTreeEdit'
              }
            },
            {
              label: 'app.aside.nav.cellValid',
              locat: {
                name: 'TableTreeEditCellValid'
              }
            },
            {
              label: 'app.aside.nav.rowValid',
              locat: {
                name: 'TableTreeEditRowValid'
              }
            },
            {
              label: 'app.aside.nav.forceCellValid',
              disabled: true,
              locat: {
                name: 'TableTreeEditForceCellValid'
              }
            },
            {
              label: 'app.aside.nav.forceRowValid',
              disabled: true,
              locat: {
                name: 'TableTreeEditForceRowValid'
              }
            },
            {
              label: 'app.aside.nav.template',
              locat: {
                name: 'TableTreeTemplate'
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
          label: 'app.aside.nav.virtualTree',
          value: 'virtualTree',
          expand: false,
          disabled: true,
          children: [
            {
              label: 'app.aside.nav.base',
              locat: {
                name: 'TableVirtualTreeBasic'
              }
            },
            {
              label: 'app.aside.nav.treeNormal',
              locat: {
                name: 'TableVirtualTreeNormal'
              }
            },
            {
              label: 'app.aside.nav.radio',
              locat: {
                name: 'TableVirtualTreeRadio'
              }
            },
            {
              label: 'app.aside.nav.checkbox',
              locat: {
                name: 'TableVirtualTreeCheckbox'
              }
            },
            {
              label: 'app.aside.nav.icon',
              locat: {
                name: 'TableVirtualTreeIcon'
              }
            },
            {
              label: 'app.aside.nav.fixed',
              locat: {
                name: 'TableVirtualTreeFixed'
              }
            },
            {
              label: 'app.aside.nav.fluidHeight',
              locat: {
                name: 'TableVirtualTreeMaxHeight'
              }
            },
            {
              label: 'app.aside.nav.edit',
              locat: {
                name: 'TableVirtualTreeEdit'
              }
            },
            {
              label: 'app.aside.nav.insert',
              locat: {
                name: 'TableVirtualTreeInsert'
              }
            },
            {
              label: 'app.aside.nav.delete',
              locat: {
                name: 'TableVirtualTreeRemove'
              }
            },
            {
              label: 'app.aside.nav.contextMenu',
              locat: {
                name: 'TableVirtualTreeMenu'
              }
            },
            {
              label: 'app.aside.nav.template',
              locat: {
                name: 'TableVirtualTreeTemplate'
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
              demoUrl: 'https://jsrun.net/XRXKp/edit',
              locat: {
                name: 'TableScroll'
              }
            },
            {
              label: 'app.aside.nav.moveHighlight',
              locat: {
                name: 'TableScrollHighlight'
              }
            },
            {
              label: 'app.aside.nav.keyboard',
              locat: {
                name: 'TableScrollKeyboard'
              }
            },
            {
              label: 'app.aside.nav.fluidHeight',
              locat: {
                name: 'TableScrollMaxHeight'
              }
            },
            {
              label: 'app.aside.nav.edit',
              demoUrl: 'https://jsrun.pro/MIWKp/edit',
              locat: {
                name: 'TableScrollEdit'
              }
            },
            {
              label: 'app.aside.nav.scrollTree',
              disabled: true,
              locat: {
                name: 'TableScrollTree'
              }
            },
            {
              label: 'app.aside.nav.rowValid',
              locat: {
                name: 'TableScrollRowValid'
              }
            },
            {
              label: 'app.aside.nav.forceCellValid',
              disabled: true,
              locat: {
                name: 'TableScrollForceCellValid'
              }
            },
            {
              label: 'app.aside.nav.forceRowValid',
              disabled: true,
              locat: {
                name: 'TableScrollForceRowValid'
              }
            },
            {
              label: 'app.aside.nav.partialLoad',
              demoUrl: 'https://jsrun.pro/EVWKp/edit',
              locat: {
                name: 'TableScrollPartialLoad'
              }
            },
            {
              label: 'app.aside.nav.fullPartialLoad',
              demoUrl: 'https://jsrun.pro/sVWKp/edit',
              locat: {
                name: 'TableScrollFullPartialLoad'
              }
            },
            {
              label: 'app.aside.nav.template',
              locat: {
                name: 'TableScrollTemplate'
              }
            },
            {
              label: 'app.aside.nav.tabs',
              locat: {
                name: 'TableScrollTabs'
              }
            },
            {
              label: 'app.aside.nav.keepAlives',
              locat: {
                name: 'TableScrollKeepAliveTable1'
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
              demoUrl: 'https://jsrun.net/ULyKp/edit',
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
            },
            {
              label: 'app.aside.nav.full',
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
              demoUrl: 'https://jsrun.pro/SWWKp/edit',
              locat: {
                name: 'TableEditManual'
              }
            },
            {
              label: 'app.aside.nav.click',
              demoUrl: 'https://jsrun.pro/4WWKp/edit',
              locat: {
                name: 'TableEditClick'
              }
            },
            {
              label: 'app.aside.nav.dblclick',
              demoUrl: 'https://jsrun.pro/KfWKp/edit',
              locat: {
                name: 'TableEditDBLClick'
              }
            },
            {
              label: 'app.aside.nav.select',
              demoUrl: 'https://jsrun.pro/pfWKp/edit',
              locat: {
                name: 'TableEditSelect'
              }
            },
            {
              label: 'app.aside.nav.autoClear',
              demoUrl: 'https://jsrun.pro/LcWKp',
              locat: {
                name: 'TableAutoClearManual'
              }
            },
            {
              label: 'app.aside.nav.insert',
              demoUrl: 'https://jsrun.pro/vcWKp',
              locat: {
                name: 'TableEditInsert'
              }
            },
            {
              label: 'app.aside.nav.delete',
              demoUrl: 'https://jsrun.pro/6cWKp',
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
              label: 'app.aside.nav.cellValid',
              demoUrl: 'https://jsrun.pro/IcWKp',
              locat: {
                name: 'TableEditCellValid'
              }
            },
            {
              label: 'app.aside.nav.rowValid',
              demoUrl: 'https://jsrun.pro/wcWKp',
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
              label: 'app.aside.nav.forceRowValid',
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
              label: 'app.aside.nav.keyboardEdit',
              locat: {
                name: 'TableEditKeyboardEdit'
              }
            },
            {
              label: 'app.aside.nav.footer',
              locat: {
                name: 'TableEditFooter'
              }
            },
            {
              label: 'app.aside.nav.footerImmediately',
              locat: {
                name: 'TableEditFooterImmediately'
              }
            },
            {
              label: 'app.aside.nav.expandRow',
              locat: {
                name: 'TableEditExpand'
              }
            },
            {
              label: 'app.aside.nav.contextMenu',
              locat: {
                name: 'TableEditMenu'
              }
            },
            {
              label: 'app.aside.nav.span',
              locat: {
                name: 'TableEditSpan'
              }
            },
            {
              label: 'app.aside.nav.upload',
              locat: {
                name: 'TableEditUpload'
              }
            },
            {
              label: 'app.aside.nav.realtimeSave',
              locat: {
                name: 'TableEditRealtimeSave'
              }
            },
            {
              label: 'app.aside.nav.dataCount',
              demoUrl: 'https://jsrun.pro/JQWKp/edit',
              locat: {
                name: 'TableEditDataCount'
              }
            },
            {
              label: 'app.aside.nav.uniqueSelect',
              locat: {
                name: 'TableEditUniqueSelect'
              }
            },
            {
              label: 'app.aside.nav.cascadingSelect',
              locat: {
                name: 'TableEditCascadingSelect'
              }
            },
            {
              label: 'app.aside.nav.events',
              demoUrl: 'https://jsrun.pro/QIWKp/edit',
              locat: {
                name: 'TableEditEvents'
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
          label: 'app.aside.nav.bad',
          value: 'bad',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.edit',
              demoUrl: 'https://jsrun.pro/uIWKp/edit',
              locat: {
                name: 'TableBadEdit'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.module',
          value: 'module',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.icon',
              locat: {
                name: 'ModuleIcon'
              }
            },
            {
              label: 'app.aside.nav.button',
              locat: {
                name: 'ModuleButton'
              }
            },
            {
              label: 'app.aside.nav.radio',
              locat: {
                name: 'ModuleRadio'
              }
            },
            {
              label: 'app.aside.nav.checkbox',
              locat: {
                name: 'ModuleCheckbox'
              }
            },
            {
              label: 'app.aside.nav.input',
              locat: {
                name: 'ModuleInput'
              }
            },
            {
              label: 'app.aside.nav.pager',
              locat: {
                name: 'ModulePager'
              }
            },
            {
              label: 'app.aside.nav.modal',
              locat: {
                name: 'ModuleModal'
              }
            },
            {
              label: 'app.aside.nav.tooltip',
              locat: {
                name: 'ModuleTooltip'
              }
            },
            {
              label: 'app.aside.nav.toolbar',
              locat: {
                name: 'ModuleToolbar'
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
              label: 'app.aside.nav.elementUpload',
              locat: {
                name: 'TableOtherElementUpload'
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
              demoUrl: 'https://jsrun.net/MibKp/edit',
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
              demoUrl: 'https://jsrun.pro/dwbKp/edit',
              locat: {
                name: 'TablePluginElementConfig'
              }
            },
            {
              label: 'app.aside.nav.elementFilterPlugin',
              demoUrl: 'https://jsrun.pro/BWWKp/edit',
              locat: {
                name: 'TablePluginElementFilter'
              }
            },
            {
              label: 'app.aside.nav.elementPluginMore',
              demoUrl: 'https://jsrun.pro/uWWKp/edit',
              locat: {
                name: 'TablePluginElementPage'
              }
            },
            {
              label: 'app.aside.nav.iviewPlugin',
              demoUrl: 'https://jsrun.pro/HPWKp/edit',
              locat: {
                name: 'TablePluginIviewConfig'
              }
            },
            {
              label: 'app.aside.nav.iviewFilter',
              demoUrl: 'https://jsrun.pro/nPWKp/edit',
              locat: {
                name: 'TablePluginIviewFilter'
              }
            },
            {
              label: 'app.aside.nav.iviewPluginMore',
              demoUrl: 'https://jsrun.pro/rPWKp/edit',
              locat: {
                name: 'TablePluginIviewPage'
              }
            },
            {
              label: 'app.aside.nav.antdPlugin',
              demoUrl: 'https://jsrun.pro/APWKp/edit',
              locat: {
                name: 'TablePluginAntdConfig'
              }
            },
            {
              label: 'app.aside.nav.antdFilter',
              locat: {
                name: 'TablePluginAntdFilter'
              }
            },
            {
              label: 'app.aside.nav.antdPluginMore',
              locat: {
                name: 'TablePluginAntdPage'
              }
            },
            {
              label: 'app.aside.nav.shortcutKeyPlugin',
              disabled: true,
              locat: {
                name: 'TablePluginShortcutKey'
              }
            },
            {
              label: 'app.aside.nav.chartsPlugin',
              demoUrl: 'https://jsrun.pro/9aWKp/edit',
              disabled: true,
              locat: {
                name: 'TablePluginCharts'
              }
            },
            {
              label: 'app.aside.nav.exportXLSXPlugin',
              demoUrl: 'https://jsrun.pro/PIWKp/edit',
              locat: {
                name: 'TablePluginExportXLSX'
              }
            },
            {
              label: 'app.aside.nav.exportPDFPlugin',
              demoUrl: 'https://jsrun.pro/I8WKp/edit',
              locat: {
                name: 'TablePluginExportPDF'
              }
            },
            {
              label: 'app.aside.nav.rendererPlugin',
              disabled: true,
              locat: {
                name: 'TablePluginRenderer'
              }
            },
            {
              label: 'app.aside.nav.menusPlugin',
              locat: {
                name: 'TablePluginMenus'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.renderer',
          value: 'renderer',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.api',
              locat: {
                name: 'RendererAPI'
              }
            },
            {
              label: 'app.aside.nav.rendererFilter',
              locat: {
                name: 'RendererFilter'
              }
            },
            {
              label: 'app.aside.nav.rendererDefault',
              locat: {
                name: 'RendererDefault'
              }
            },
            {
              label: 'app.aside.nav.rendererEdit',
              locat: {
                name: 'RendererEdit'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.bottons',
          value: 'bottons',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.api',
              locat: {
                name: 'BottonsAPI'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.menus',
          value: 'menus',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.api',
              locat: {
                name: 'MenusAPI'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.interceptor',
          value: 'interceptor',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.api',
              locat: {
                name: 'InterceptorAPI'
              }
            }
          ]
        },
        // {
        //   label: 'app.aside.nav.optimize',
        //   value: 'optimize',
        //   expand: false,
        //   children: [
        //     {
        //       label: 'app.aside.nav.optimizeScroller',
        //       locat: {
        //         name: 'TableOptimizeScroller'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.optimizeEdit',
        //       locat: {
        //         name: 'TableOptimizeEdit'
        //       }
        //     }
        //   ]
        // },
        {
          label: 'app.aside.nav.api',
          value: 'api',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.vxeTable',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'table'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeTableColumn',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'table-column'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeGrid',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'grid'
                }
              }
            },
            // {
            //   label: 'app.aside.nav.vxeVirtualTree',
            //   locat: {
            //     name: 'VXEAPI',
            //     params: {
            //       name: 'virtual-tree'
            //     }
            //   }
            // },
            // {
            //   label: 'app.aside.nav.vxeExcel',
            //   locat: {
            //     name: 'VXEAPI',
            //     params: {
            //       name: 'excel'
            //     }
            //   }
            // },
            {
              label: 'app.aside.nav.vxeToolbar',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'toolbar'
                }
              }
            },
            {
              label: 'app.aside.nav.vxePager',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'pager'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeRadio',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'radio'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeCheckbox',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'checkbox'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeInput',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'input'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeTextarea',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'textarea'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeButton',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'button'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeModal',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'modal'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeTooltip',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'tooltip'
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
    if (process.env.NODE_ENV === 'development') {
      setInterval(() => {
        let performance = window.performance || window.webkitPerformance
        if (performance && performance.memory) {
          this.usedJSHeapSize = XEUtils.toFixedNumber(performance.memory.usedJSHeapSize / 1048576, 2)
        }
      }, 3000)
    }
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
      if (!item.disabled) {
        this.tableList.forEach(group => {
          if (item !== group) {
            group.expand = false
          }
        })
        item.expand = !item.expand
      }
    },
    vChangeEvent () {
      switch (this.version) {
        case '1':
          location.href = '/vxe-table/v1/index.html'
          break
        case '2':
          location.href = '/vxe-table'
          break
        case '3':
          this.version = '1'
          this.$XModal.message({ message: this.$t('app.body.other.newDevelopment'), status: 'info' })
          break
      }
    }
  }
}
</script>
