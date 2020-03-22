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
          <vxe-select class="locale-switch" size="mini" v-model="$i18n.locale">
            <vxe-option value="zh_CN" label="中文"></vxe-option>
            <vxe-option value="zh_TC" label="繁體中文"></vxe-option>
            <vxe-option value="en_US" label="English"></vxe-option>
            <vxe-option value="ja_JP" label="ジャパン"></vxe-option>
          </vxe-select>
          <span>{{ $t('app.body.label.version') }}: </span>
          <vxe-select class="version-switch" size="mini" v-model="version" @change="vChangeEvent">
            <vxe-option value="1" label="1.x"></vxe-option>
            <vxe-option value="2" label="2.x"></vxe-option>
            <vxe-option value="3" label="3.x"></vxe-option>
            <vxe-option value="4" label="4.x"></vxe-option>
          </vxe-select>
          <vxe-tooltip :content="$t('app.footer.donationDesc')" enterable>
            <router-link class="donation" :to="{name: 'Donation'}">{{ $t('app.footer.donation') }}☕</router-link>
          </vxe-tooltip>
        </div>
      </div>
    </header>
    <div class="page-container">
      <div class="aside">
        <div class="header">
          <div v-if="stableVersionList.length" class="version-list">
            <span class="title">{{  $t('app.body.label.stableVersion')}}</span>
            <select>
              <option v-for="(pack, index) in stableVersionList" :key="index">{{ pack.version }}</option>
            </select>
            <template v-if="showBetaVetsion">
              <span class="title">{{  $t('app.body.label.latestVersion')}}</span>
              <select>
                <option v-for="(pack, index) in newBetsVersionList" :key="index">{{ pack.version }}</option>
              </select>
            </template>
          </div>
          <vxe-input clearable v-model="filterName" class="search-input" :placeholder="$t('app.body.search.searchPlaceholder')" @keyup="searchEvent" @clear="searchEvent"></vxe-input>
        </div>
        <div class="body">
          <template v-if="apiList.length">
            <ul class="nav-menu">
              <li v-for="(item, index) in apiList" :key="index" :class="{expand: item.expand}">
                <a class="nav-link" @click="linkEvent(item)" :title="item.disabled ? $t('app.body.other.newFunc') : item.label" :class="{disabled: item.disabled, active: pageKey === item.value}">
                  <i class="vxe-icon--arrow-right nav-link-icon"></i>
                  <span v-html="item.label"></span>
                </a>
                <ul v-if="item.children" v-show="item.expand" class="nav-child-menu">
                  <li v-for="(child, cIndex) in item.children" :key="cIndex" :class="{'is-donation': ['Donation'].includes(child.locat.name)}">
                    <a class="nav-link disabled" v-if="child.disabled" :title="$t('app.body.other.newFunc')" v-html="child.label"></a>
                    <router-link v-else class="nav-link" :to="child.locat" :title="child.label" v-html="child.label"></router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="search-nodata">{{ $t('app.body.search.noDataPrefix') }}<span class="keyword-lighten">{{ filterName }}</span>{{ $t('app.body.search.noDataSuffix') }}</div>
          </template>
        </div>
      </div>
      <div class="body">
        <div class="content" :class="{full: ['VXEAPI', 'Donation'].includes($route.name)}">
          <template v-if="!/\/start|\/module|\/api/.test($route.path)">
            <a v-if="demoLink" class="link todemo" :href="demoLink" target="_blank"><i class="fa fa-bug"></i>{{ $t('app.body.button.runDemo') }}</a>
          </template>
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'

export default {
  data () {
    return {
      selected: null,
      filterName: '',
      apiList: [],
      tableData: [],
      betaVersionList: [],
      stableVersionList: [],
      version: '3',
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
              demoUrl: 'https://jsrun.pro/SbfKp/edit',
              locat: {
                name: 'StartI18n'
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
              label: 'app.aside.nav.textarea',
              locat: {
                name: 'ModuleTextarea'
              }
            },
            {
              label: 'app.aside.nav.select',
              locat: {
                name: 'ModuleSelect'
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
            // {
            //   label: 'app.aside.nav.tooltip',
            //   locat: {
            //     name: 'ModuleTooltip'
            //   }
            // },
            {
              label: 'app.aside.nav.toolbar',
              locat: {
                name: 'ModuleToolbar'
              }
            },
            {
              label: 'app.aside.nav.form',
              locat: {
                name: 'ModuleForm'
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
              demoUrl: 'https://jsrun.pro/VrXKp/edit',
              locat: {
                name: 'TableBasic'
              }
            },
            {
              label: 'app.aside.nav.size',
              demoUrl: 'https://jsrun.pro/PmXKp/edit',
              locat: {
                name: 'TableSize'
              }
            },
            {
              label: 'app.aside.nav.seq',
              demoUrl: 'https://jsrun.pro/xrXKp/edit',
              locat: {
                name: 'TableSeq'
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
              demoUrl: 'https://jsrun.pro/zrXKp/edit',
              locat: {
                name: 'TableStripe'
              }
            },
            {
              label: 'app.aside.nav.border',
              demoUrl: 'https://jsrun.pro/QrXKp/edit',
              locat: {
                name: 'TableBorder'
              }
            },
            {
              label: 'app.aside.nav.style',
              demoUrl: 'https://jsrun.pro/EmXKp/edit',
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
              label: 'app.aside.nav.scrollStyle',
              locat: {
                name: 'TableScrollStyle'
              }
            },
            {
              label: 'app.aside.nav.hideHead',
              demoUrl: 'https://jsrun.pro/7mXKp/edit',
              locat: {
                name: 'TableHeader'
              }
            },
            {
              label: 'app.aside.nav.resizable',
              demoUrl: 'https://jsrun.pro/5AXKp/edit',
              locat: {
                name: 'TableResizable'
              }
            },
            {
              label: 'app.aside.nav.fluidHeight',
              demoUrl: 'https://jsrun.pro/smXKp/edit',
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
              demoUrl: 'https://jsrun.pro/JrXKp/edit',
              locat: {
                name: 'TableHeight'
              }
            },
            {
              label: 'app.aside.nav.fixed',
              demoUrl: 'https://jsrun.pro/TrXKp/edit',
              locat: {
                name: 'TableFixed'
              }
            },
            {
              label: 'app.aside.nav.fullFixed',
              demoUrl: 'https://jsrun.pro/8rXKp/edit',
              locat: {
                name: 'TableFixedFull'
              }
            },
            {
              label: 'app.aside.nav.group',
              demoUrl: 'https://jsrun.pro/7rXKp/edit',
              locat: {
                name: 'TableGroup'
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
              demoUrl: 'https://jsrun.pro/9rXKp/edit',
              locat: {
                name: 'TableRadio'
              }
            },
            {
              label: 'app.aside.nav.checkbox',
              demoUrl: 'https://jsrun.pro/erXKp/edit',
              locat: {
                name: 'TableSelection'
              }
            },
            {
              label: 'app.aside.nav.sort',
              demoUrl: 'https://jsrun.pro/crXKp/edit',
              locat: {
                name: 'TableSort'
              }
            },
            {
              label: 'app.aside.nav.filter',
              demoUrl: 'https://jsrun.pro/drXKp/edit',
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
              demoUrl: 'https://jsrun.pro/GjXKp/edit',
              locat: {
                name: 'TableLoading'
              }
            },
            {
              label: 'app.aside.nav.format',
              demoUrl: 'https://jsrun.pro/FrXKp/edit',
              locat: {
                name: 'TableFormat'
              }
            },
            {
              label: 'app.aside.nav.html',
              demoUrl: 'https://jsrun.pro/ItWKp/edit',
              locat: {
                name: 'TableHTML'
              }
            },
            {
              label: 'app.aside.nav.data',
              demoUrl: 'https://jsrun.pro/FjWKp/edit',
              locat: {
                name: 'TableData'
              }
            },
            {
              label: 'app.aside.nav.full',
              locat: {
                name: 'TableFull'
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
              demoUrl: 'https://jsrun.pro/DjXKp/edit',
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
              demoUrl: 'https://jsrun.pro/5jXKp/edit',
              locat: {
                name: 'TableSpan'
              }
            },
            {
              label: 'app.aside.nav.spanRow',
              locat: {
                name: 'TableSpanRow'
              }
            },
            {
              label: 'app.aside.nav.footer',
              demoUrl: 'https://jsrun.pro/dmXKp/edit',
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
              demoUrl: 'https://jsrun.pro/cmXKp/edit',
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
              demoUrl: 'https://jsrun.pro/VjXKp/edit',
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
              demoUrl: 'https://jsrun.pro/eRXKp/edit',
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
              label: 'app.aside.nav.expandRowLazy',
              locat: {
                name: 'TableExpandLazy'
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
              demoUrl: 'https://jsrun.pro/PrXKp/edit',
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
              label: 'app.aside.nav.details',
              locat: {
                name: 'TableDetails'
              }
            },
            {
              label: 'app.aside.nav.popupEdit',
              locat: {
                name: 'TablePopupEdit'
              }
            },
            {
              label: 'app.aside.nav.form',
              locat: {
                name: 'TableForm'
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
              label: 'app.aside.nav.rangeSelect',
              locat: {
                name: 'TableRangeSelect'
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
              label: 'app.aside.nav.treeSearch',
              demoUrl: 'https://jsrun.pro/CDWKp/edit',
              locat: {
                name: 'TableTreeFilter'
              }
            },
            {
              label: 'app.aside.nav.treeSort',
              locat: {
                name: 'TableTreeSort'
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
              label: 'app.aside.nav.expandTreeLazy',
              locat: {
                name: 'TableTreeExpandLazy'
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
              label: 'app.aside.nav.lazyMenu',
              locat: {
                name: 'TableTreeLazyMenu'
              }
            },
            {
              label: 'app.aside.nav.lazyEdit',
              locat: {
                name: 'TableTreeLazyEdit'
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
          label: 'app.aside.nav.editable',
          value: 'edit',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.popupForm',
              locat: {
                name: 'TableEditPopupForm'
              }
            },
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
              label: 'app.aside.nav.selectContent',
              demoUrl: 'https://jsrun.pro/pfWKp/edit',
              locat: {
                name: 'TableEditSelect'
              }
            },
            {
              label: 'app.aside.nav.autoClear',
              demoUrl: 'https://jsrun.pro/LcWKp/edit',
              locat: {
                name: 'TableAutoClearManual'
              }
            },
            {
              label: 'app.aside.nav.insert',
              demoUrl: 'https://jsrun.pro/vcWKp/edit',
              locat: {
                name: 'TableEditInsert'
              }
            },
            {
              label: 'app.aside.nav.delete',
              demoUrl: 'https://jsrun.pro/6cWKp/edit',
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
              demoUrl: 'https://jsrun.pro/IcWKp/edit',
              locat: {
                name: 'TableEditCellValid'
              }
            },
            {
              label: 'app.aside.nav.rowValid',
              demoUrl: 'https://jsrun.pro/wcWKp/edit',
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
              label: 'app.aside.nav.highlightCell',
              locat: {
                name: 'TableEditHighlightCell'
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
              label: 'app.aside.nav.form',
              locat: {
                name: 'TableEditForm'
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
          label: 'app.aside.nav.grid',
          value: 'grid',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.base',
              demoUrl: 'https://jsrun.pro/5RXKp/edit',
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
              label: 'app.aside.nav.form',
              locat: {
                name: 'GridForm'
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
              label: 'app.aside.nav.formProxy',
              locat: {
                name: 'GridFormProxy'
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
              label: 'app.aside.nav.treeLazyEdit',
              locat: {
                name: 'GridTreeLazyEdit'
              }
            },
            {
              label: 'app.aside.nav.crudTreeToolbar',
              locat: {
                name: 'GridTreeEdit'
              }
            },
            {
              label: 'app.aside.nav.fullQuery',
              locat: {
                name: 'GridFullQuery'
              }
            },
            {
              label: 'app.aside.nav.full',
              demoUrl: 'https://jsrun.pro/r6WKp/edit',
              locat: {
                name: 'GridFullEdit'
              }
            },
            {
              label: 'app.aside.nav.configProxy',
              locat: {
                name: 'GridConfigProxy'
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
              demoUrl: 'https://jsrun.pro/XRXKp/edit',
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
              label: 'app.aside.nav.cellValid',
              locat: {
                name: 'TableScrollCellValid'
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
              label: 'app.aside.nav.scrollRows',
              locat: {
                name: 'TableScrollRows'
              }
            },
            {
              label: 'app.aside.nav.scrollFullRows',
              locat: {
                name: 'TableScrollFullRows'
              }
            },
            {
              label: 'app.aside.nav.scrollCols',
              locat: {
                name: 'TableScrollCols'
              }
            },
            {
              label: 'app.aside.nav.scrollFullCols',
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
          label: 'app.aside.nav.virtualTree',
          value: 'virtualTree',
          disabled: true,
          expand: false,
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
          label: 'app.aside.nav.bad',
          value: 'bad',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.badEdit',
              demoUrl: 'https://jsrun.pro/uIWKp/edit',
              locat: {
                name: 'TableBadEdit'
              }
            },
            {
              label: 'app.aside.nav.badLineHeight',
              locat: {
                name: 'TableBadLineHeight'
              }
            },
            {
              label: 'app.aside.nav.badNonsupport',
              locat: {
                name: 'TableBadNonsupport'
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
              demoUrl: 'https://jsrun.pro/MibKp/edit',
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
              demoUrl: 'https://jsrun.pro/BWWKpv/edit',
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
            // {
            //   label: 'app.aside.nav.shortcutKeyPlugin',
            //   disabled: true,
            //   locat: {
            //     name: 'TablePluginShortcutKey'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.chartsPlugin',
            //   disabled: true,
            //   demoUrl: 'https://jsrun.pro/9aWKp/edit',
            //   locat: {
            //     name: 'TablePluginCharts'
            //   }
            // },
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
            // {
            //   label: 'app.aside.nav.rendererPlugin',
            //   disabled: true,
            //   locat: {
            //     name: 'TablePluginRenderer'
            //   }
            // },
            {
              label: 'app.aside.nav.menusPlugin',
              locat: {
                name: 'TablePluginMenus'
              }
            // },
            // {
            //   label: 'app.aside.nav.excelPlugin',
            //   locat: {
            //     name: 'TablePluginExcel'
            //   }
            }
          ]
        },
        {
          label: 'app.aside.nav.formats',
          value: 'formats',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.api',
              locat: {
                name: 'FormatsAPI'
              }
            }
          ]
        },
        {
          label: 'app.aside.nav.commands',
          value: 'commands',
          expand: false,
          children: [
            {
              label: 'app.aside.nav.api',
              locat: {
                name: 'CommandsAPI'
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
            },
            {
              label: 'app.aside.nav.rendererExpand',
              locat: {
                name: 'RendererExpand'
              }
            },
            {
              label: 'app.aside.nav.rendererToolbar',
              locat: {
                name: 'RendererToolbar'
              }
            },
            {
              label: 'app.aside.nav.rendererForm',
              locat: {
                name: 'RendererForm'
              }
            },
            {
              label: 'app.aside.nav.rendererEmpty',
              locat: {
                name: 'RendererEmpty'
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
        {
          label: 'app.aside.nav.api',
          value: 'api',
          expand: false,
          children: [
            {
              label: 'app.footer.donation',
              locat: {
                name: 'Donation'
              }
            },
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
              label: 'app.aside.nav.vxeSelect',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'select'
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
            // {
            //   label: 'app.aside.nav.vxeTooltip',
            //   locat: {
            //     name: 'VXEAPI',
            //     params: {
            //       name: 'tooltip'
            //     }
            //   }
            // },
            {
              label: 'app.aside.nav.vxeForm',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'form'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeFormItem',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'form-item'
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
      const { $route, apiList } = this
      for (let gIndex = 0; gIndex < apiList.length; gIndex++) {
        const group = apiList[gIndex]
        if (group.children) {
          for (let cIndex = 0; cIndex < group.children.length; cIndex++) {
            const item = group.children[cIndex]
            if (item.locat && item.locat.name === $route.name) {
              return item.demoUrl
            }
          }
        }
      }
      return null
    },
    showBetaVetsion () {
      const { betaVersionList, stableVersionList } = this
      if (stableVersionList.length) {
        if (betaVersionList.length) {
          const stableNums = stableVersionList[0].version.split('-')[0].split('.')
          const stable1 = XEUtils.toNumber(stableNums[0])
          const stable2 = XEUtils.toNumber(stableNums[1])
          const stable3 = XEUtils.toNumber(stableNums[2])
          const betaNums = betaVersionList[0].version.split('-')[0].split('.')
          const beta1 = XEUtils.toNumber(betaNums[0])
          const beta2 = XEUtils.toNumber(betaNums[1])
          const beta3 = XEUtils.toNumber(betaNums[2])
          if (beta1 > stable1) {
            return true
          } else if (beta1 === stable1) {
            if (beta2 > stable2) {
              return true
            } else if (beta2 === stable2) {
              if (beta3 > stable3) {
                return true
              }
            }
          }
        } else {
          return true
        }
      }
      return false
    },
    newBetsVersionList () {
      const { betaVersionList, stableVersionList } = this
      if (betaVersionList.length && stableVersionList.length) {
        const stableNums = stableVersionList[0].version.split('-')[0].split('.')
        const stable1 = XEUtils.toNumber(stableNums[0])
        const stable2 = XEUtils.toNumber(stableNums[1])
        const stable3 = XEUtils.toNumber(stableNums[2])
        return betaVersionList.filter(pack => {
          const betaNums = pack.version.split('-')[0].split('.')
          const beta1 = XEUtils.toNumber(betaNums[0])
          const beta2 = XEUtils.toNumber(betaNums[1])
          const beta3 = XEUtils.toNumber(betaNums[2])
          if (beta1 > stable1) {
            return true
          } else if (beta1 === stable1) {
            if (beta2 > stable2) {
              return true
            } else if (beta2 === stable2) {
              if (beta3 > stable3) {
                return true
              }
            }
          }
          return false
        })
      }
      return stableVersionList
    },
    pageKey () {
      return this.$route.path.split('/')[2]
    }
  },
  watch: {
    '$i18n.locale' (value) {
      localStorage.setItem('language', value)
      this.loadList()
      this.defaultExpand()
    },
    pageKey () {
      this.defaultExpand()
    }
  },
  created () {
    if (process.env.NODE_ENV === 'development') {
      setInterval(() => {
        const performance = window.performance || window.webkitPerformance
        if (performance && performance.memory) {
          this.usedJSHeapSize = XEUtils.toFixedNumber(performance.memory.usedJSHeapSize / 1048576, 2)
        }
      }, 3000)
    }
    this.init()
  },
  methods: {
    init () {
      this.getVersion()
      this.loadList()
      setTimeout(() => this.defaultExpand(), 1500)
    },
    loadList () {
      this.tableData = XEUtils.clone(this.tableList, true)
      XEUtils.eachTree(this.tableData, item => {
        item.label = this.$t(item.label)
      })
      this.handleSearch()
    },
    defaultExpand () {
      const group = this.apiList.find(item => item.value === this.pageKey)
      if (group) {
        group.expand = true
        this.$nextTick(() => {
          const navElem = document.querySelector('.nav-link.router-link-active')
          if (navElem) {
            if (navElem.scrollIntoViewIfNeeded) {
              navElem.scrollIntoViewIfNeeded()
            } else if (navElem.scrollIntoView) {
              navElem.scrollIntoView()
            }
          }
        })
      }
    },
    getVersion () {
      XEAjax.get('https://registry.npm.taobao.org/vxe-table').then(data => {
        const stableVersionList = []
        const betaVersionList = []
        Object.values(data.versions).forEach(pack => {
          if (/^3.\d{1,3}.\d{1,3}$/.test(pack.version)) {
            stableVersionList.push({
              version: pack.version
            })
          } else if (/^3.\d{1,3}.\d{1,3}-beta.\d{1,3}$/.test(pack.version)) {
            betaVersionList.push({
              version: pack.version
            })
          }
        })
        this.stableVersionList = stableVersionList
        this.betaVersionList = betaVersionList
      })
    },
    // 调用频率间隔 500 毫秒
    searchEvent: XEUtils.debounce(function () {
      this.handleSearch()
    }, 500, { leading: false, trailing: true }),
    handleSearch () {
      const filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const rest = XEUtils.searchTree(this.tableData, item => item.label.toLowerCase().indexOf(filterName) > -1)
        XEUtils.eachTree(rest, item => {
          item.label = item.label.replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
        })
        this.apiList = rest
        this.apiList.forEach(group => {
          group.expand = true
        })
      } else {
        this.apiList = this.tableData
      }
    },
    clickEvent (evnt) {
      const pElem = evnt.target
      if (pElem && pElem.className === 'demo-code') {
        const nextElem = pElem.nextSibling
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
        item.expand = !item.expand
      }
    },
    vChangeEvent () {
      switch (this.version) {
        case '1':
          location.href = '/vxe-table/v1/index.html'
          break
        case '2':
          location.href = '/vxe-table/v2/index.html'
          break
        case '3':
          location.href = '/vxe-table'
          break
        case '4':
          this.version = '2'
          this.$XModal.message({ message: this.$t('app.body.other.newDevelopment'), status: 'info' })
          break
      }
    }
  }
}
</script>
