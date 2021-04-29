<template>
  <div id="app" @click="clickEvent">
    <header class="page-header">
      <div class="left">
        <a href="/vxe-table/">
          <img src="/vxe-table/logo.png" width="18">
          <span class="title">vxe-table</span>
        </a>
        <a href='https://gitee.com/xuliangzhan_admin/vxe-table/stargazers'>
          <img src='https://gitee.com/xuliangzhan_admin/vxe-table/badge/star.svg?theme=gvp' alt='star'>
        </a>
        <a href="https://github.com/x-extends/vxe-table/stargazers">
          <img src="https://img.shields.io/github/stars/xuliangzhan/vxe-table.svg">
        </a>
        <a href="http://npm-stat.com/charts.html?package=vxe-table">
          <img src="https://img.shields.io/npm/dm/vxe-table.svg">
        </a>
      </div>
      <div class="right">
        <div class="content">
          <span v-if="appData.usedJSHeapSize && appData.usedJSHeapSize !== '0'" class="performance">Memory used: {{ appData.usedJSHeapSize }} MB.</span>
          <span>{{ $t('app.body.label.translations') }}:</span>
          <vxe-select class="locale-switch" size="mini" v-model="$i18n.locale">
            <vxe-option value="zh_CN" label="中文"></vxe-option>
            <vxe-option value="zh_TC" label="繁體中文"></vxe-option>
            <vxe-option value="en_US" label="English"></vxe-option>
            <!-- <vxe-option value="ja_JP" label="ジャパン"></vxe-option> -->
          </vxe-select>
          <span>{{ $t('app.body.label.version') }}: </span>
          <vxe-select class="version-switch" size="mini" v-model="appData.version" @change="vChangeEvent">
            <!-- <vxe-option value="4.5" :label="$t('app.body.other.v4d5')" disabled></vxe-option> -->
            <vxe-option value="4" :label="$t('app.body.other.v4')"></vxe-option>
            <!-- <vxe-option value="3.5" :label="$t('app.body.other.v3d5')" disabled></vxe-option> -->
            <vxe-option value="3" :label="$t('app.body.other.v3')"></vxe-option>
            <vxe-option value="2" :label="$t('app.body.other.v2')" class-name="due-to-stop"></vxe-option>
            <vxe-option value="1" :label="$t('app.body.other.v1')" class-name="end-of-life"></vxe-option>
          </vxe-select>
          <router-link class="link donation" :title="$t('app.footer.donationDesc')" :to="{name: 'Donation'}">{{ $t('app.header.label.donation') }}</router-link>
          <a v-if="appData.showPlugin" class="link support" href="/vxe-table/plugins" target="_blank">💡插件</a>
        </div>
      </div>
    </header>
    <div class="page-container">
      <div class="aside" :class="{visible: appData.showLeft}">
        <div class="header">
          <div class="version-list">
            <template v-if="appData.stableVersionList.length">
              <span class="title">{{  $t('app.body.label.stableVersion')}}</span>
              <vxe-select class="stable-select" v-model="appData.selectStableVersion" size="mini" :options="appData.stableVersionList"></vxe-select>
            </template>
            <template v-if="showBetaVetsion">
              <span class="title">{{  $t('app.body.label.latestVersion')}}</span>
              <vxe-select class="latest-select" v-model="appData.selectBetaVersion" size="mini" :options="newBetsVersionList"></vxe-select>
            </template>
          </div>
          <vxe-input clearable v-model="appData.filterName" type="search" class="search-input" :placeholder="$t('app.body.search.searchPlaceholder')" @keyup="searchEvent" @clear="searchEvent"></vxe-input>
        </div>
        <div class="body">
          <div class="sponsors" v-if="appData.sponsorList.length">
            <h4 class="title">赞助商</h4>
            <div v-for="(item, index) in appData.sponsorList" :key="index">
              <a :href="item.url" :title="item.title" target="_blank">
                <img :src="item.img" :style="{width: item.width, height: item.height}">
              </a>
            </div>
          </div>
          <div class="docs">
            <template v-if="appData.apiList.length">
              <ul class="nav-menu">
                <li class="is-warn">
                  <router-link class="nav-link" :to="{name: 'StartUpgrade'}">
                    <span>注意事项</span>
                  </router-link>
                </li>
                <li v-for="(item, index) in appData.apiList" :key="index" :class="{expand: item.expand}">
                  <a class="nav-link" @click="linkEvent(item)" :title="item.disabled ? $t('app.body.other.newFunc') : item.label" :class="{disabled: item.disabled, active: pageKey === item.value}">
                    <i class="vxe-icon--arrow-right nav-link-icon"></i>
                    <span v-html="item.label"></span>
                  </a>
                  <ul v-if="item.children" v-show="item.expand" class="nav-child-menu">
                    <li v-for="(child, cIndex) in item.children" :key="cIndex" :class="{'is-donation': ['Donation'].includes(child.locat.name), 'is-bad': ['TableBadEdit', 'TableBadLineHeight', 'TableBadNonsupport'].includes(child.locat.name)}">
                      <a class="nav-link disabled" v-if="child.disabled" :title="$t('app.body.other.newFunc')" v-html="child.label"></a>
                      <router-link v-else class="nav-link" :to="child.locat" :title="child.label" v-html="child.label"></router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </template>
            <template v-else>
              <div class="search-nodata">{{ $t('app.body.search.noDataPrefix') }}<span class="keyword-lighten">{{ appData.filterName }}</span>{{ $t('app.body.search.noDataSuffix') }}</div>
            </template>
          </div>
        </div>
      </div>
      <div class="oper-wrapper" v-show="showOperBtn">
        <vxe-button class="oper-btn" :icon="appData.showLeft ? 'vxe-icon--arrow-left' : 'vxe-icon--arrow-right'" @click="appData.showLeft = !appData.showLeft"></vxe-button>
      </div>
      <div class="body">
        <div class="content" :class="{full: ['VXEAPI', 'Donation', 'Run'].includes($route.name)}">
          <template v-if="!/\/start|\/module|\/api/.test($route.path)">
            <a v-if="demoLink" class="link todemo" :href="demoLink" target="_blank"><i class="fa fa-bug"></i>{{ $t('app.body.button.runDemo') }}</a>
          </template>
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, watch } from 'vue'
import i18n from '@/i18n'
import router from '@/router'
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'

export default defineComponent({
  setup () {
    const appData = reactive({
      showLeft: true,
      selected: null,
      filterName: '',
      apiList: [] as any[],
      tableData: [] as any[],
      selectBetaVersion: null,
      betaVersionList: [] as any[],
      selectStableVersion: null,
      stableVersionList: [] as any[],
      version: '4',
      usedJSHeapSize: '0',
      sponsorList: [],
      showPlugin: false,
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
              label: 'app.aside.nav.switch',
              locat: {
                name: 'ModuleSwitch'
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
              label: 'app.aside.nav.pulldown',
              locat: {
                name: 'ModulePulldown'
              }
            },
            {
              label: 'app.aside.nav.pager',
              locat: {
                name: 'ModulePager'
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
            },
            {
              label: 'app.aside.nav.list',
              locat: {
                name: 'ModuleList'
              }
            },
            {
              label: 'app.aside.nav.modal',
              locat: {
                name: 'ModuleModal'
              }
            },
            {
              label: 'app.aside.nav.file',
              locat: {
                name: 'ModuleFile'
              }
            },
            {
              label: 'app.aside.nav.print',
              locat: {
                name: 'ModulePrint'
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
              label: 'app.aside.nav.autoBreak',
              locat: {
                name: 'TableAutoBreak'
              }
            },
            {
              label: 'app.aside.nav.tooltips',
              locat: {
                name: 'TableTooltip'
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
              label: 'app.aside.nav.round',
              demoUrl: 'https://jsrun.pro/Ua2Kp/edit',
              locat: {
                name: 'TableRound'
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
              // demoUrl: 'https://jsrun.pro/SIWKp/edit',
              locat: {
                name: 'TableDynamic'
              }
            },
            {
              label: 'app.aside.nav.customCheckbox',
              locat: {
                name: 'TableCustomCheckbox'
              }
            },
            {
              label: 'app.aside.nav.customRadio',
              locat: {
                name: 'TableCustomRadio'
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
              label: 'app.aside.nav.multiSort',
              locat: {
                name: 'TableMultiSort'
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
              label: 'app.aside.nav.mergeCell',
              locat: {
                name: 'TableMergeCell'
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
            // {
            //   label: 'app.aside.nav.customPrint',
            //   locat: {
            //     name: 'TableCustomPrint'
            //   }
            // },
            {
              label: 'app.aside.nav.fixedType',
              locat: {
                name: 'TableFixedType'
              }
            },
            {
              label: 'app.aside.nav.contextMenu',
              // demoUrl: 'https://jsrun.pro/VjXKp/edit',
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
              // demoUrl: 'https://jsrun.pro/eRXKp/edit',
              locat: {
                name: 'TableExpand'
              }
            },
            // {
            //   label: 'app.aside.nav.expandRowIcon',
            //   locat: {
            //     name: 'TableExpandIcon'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.expandRowLazy',
            //   locat: {
            //     name: 'TableExpandLazy'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.accordion',
            //   locat: {
            //     name: 'TableExpandAccordion'
            //   }
            // },
            {
              label: 'app.aside.nav.toolbar',
              locat: {
                name: 'TableToolbar'
              }
            },
            // {
            //   label: 'app.aside.nav.customs',
            //   // demoUrl: 'https://jsrun.pro/PrXKp/edit',
            //   locat: {
            //     name: 'TableCustom'
            //   }
            // },
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
            // {
            //   label: 'app.aside.nav.groupBy',
            //   locat: {
            //     name: 'TableGroupBy'
            //   }
            // },
            {
              label: 'app.aside.nav.details',
              locat: {
                name: 'TableDetails'
              }
            },
            // {
            //   label: 'app.aside.nav.popupEdit',
            //   locat: {
            //     name: 'TablePopupEdit'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.form',
            //   locat: {
            //     name: 'TableForm'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.pager',
            //   locat: {
            //     name: 'TablePage'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.pageIcon',
            //   locat: {
            //     name: 'TablePageIcon'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.moveHighlight',
            //   locat: {
            //     name: 'TableHighlight'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.rangeSelect',
            //   locat: {
            //     name: 'TableRangeSelect'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.tabs',
            //   locat: {
            //     name: 'TableTabs'
            //   }
            // },
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
              // demoUrl: 'https://jsrun.pro/YfWKp/edit',
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
              // demoUrl: 'https://jsrun.pro/kfWKp/edit',
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
              // demoUrl: 'https://jsrun.pro/B6bKp/edit',
              locat: {
                name: 'TableTreeSelection'
              }
            },
            {
              label: 'app.aside.nav.fixed',
              // demoUrl: 'https://jsrun.pro/ifWKp/edit',
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
              // demoUrl: 'https://jsrun.pro/CDWKp/edit',
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
            // {
            //   label: 'app.aside.nav.groupSummary',
            //   // demoUrl: 'https://jsrun.pro/KVWKp/edit',
            //   locat: {
            //     name: 'TableTreeGroupSummary'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.groupSummaryCount',
            //   // demoUrl: 'https://jsrun.pro/GTWKp/edit',
            //   locat: {
            //     name: 'TableTreeGroupSummaryCount'
            //   }
            // },
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
            // {
            //   label: 'app.aside.nav.insert',
            //   locat: {
            //     name: 'TableTreeInsert'
            //   }
            // },
            {
              label: 'app.aside.nav.contextMenu',
              locat: {
                name: 'TableTreeMenu'
              }
            },
            // // {
            // //   label: 'app.aside.nav.span',
            // //   disabled: true,
            // //   locat: {
            // //     name: 'TableTreeSpan'
            // //   }
            // // },
            // {
            //   label: 'app.aside.nav.moveHighlight',
            //   locat: {
            //     name: 'TableTreeHighlight'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.keyboard',
            //   disabled: true,
            //   locat: {
            //     name: 'TableTreeKeyboard'
            //   }
            // },
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
            // {
            //   label: 'app.aside.nav.cellValid',
            //   locat: {
            //     name: 'TableTreeEditCellValid'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.rowValid',
            //   locat: {
            //     name: 'TableTreeEditRowValid'
            //   }
            // },
            // // {
            // //   label: 'app.aside.nav.forceCellValid',
            // //   disabled: true,
            // //   locat: {
            // //     name: 'TableTreeEditForceCellValid'
            // //   }
            // // },
            // // {
            // //   label: 'app.aside.nav.forceRowValid',
            // //   disabled: true,
            // //   locat: {
            // //     name: 'TableTreeEditForceRowValid'
            // //   }
            // // },
            {
              label: 'app.aside.nav.template',
              locat: {
                name: 'TableTreeTemplate'
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
              label: 'app.aside.nav.cellPlaceholder',
              locat: {
                name: 'TableEditCellPlaceholder'
              }
            },
            {
              label: 'app.aside.nav.insert',
              // demoUrl: 'https://jsrun.pro/vcWKp/edit',
              locat: {
                name: 'TableEditInsert'
              }
            },
            {
              label: 'app.aside.nav.delete',
              // demoUrl: 'https://jsrun.pro/6cWKp/edit',
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
            // {
            //   label: 'app.aside.nav.cellDisable',
            //   locat: {
            //     name: 'TableEditCellDisable'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.rowDisable',
            //   locat: {
            //     name: 'TableEditRowDisable'
            //   }
            // },
            {
              label: 'app.aside.nav.cellValid',
              // demoUrl: 'https://jsrun.pro/IcWKp/edit',
              locat: {
                name: 'TableEditCellValid'
              }
            },
            {
              label: 'app.aside.nav.rowValid',
              // demoUrl: 'https://jsrun.pro/wcWKp/edit',
              locat: {
                name: 'TableEditRowValid'
              }
            },
            // {
            //   label: 'app.aside.nav.forceCellValid',
            //   disabled: true,
            //   locat: {
            //     name: 'TableEditForceCellValid'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.forceRowValid',
            //   disabled: true,
            //   locat: {
            //     name: 'TableEditForceRowValid'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.highlightCell',
            //   locat: {
            //     name: 'TableEditHighlightCell'
            //   }
            // },
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
              // demoUrl: 'https://jsrun.pro/QIWKp/edit',
              locat: {
                name: 'TableEditEvents'
              }
            },
            {
              label: 'app.aside.nav.template',
              locat: {
                name: 'TableEditTemplate'
              }
            // // },
            // // {
            // //   label: 'app.aside.nav.full',
            // //   disabled: true,
            // //   locat: {
            // //     name: 'TableEditFull'
            // //   }
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
              label: 'app.aside.nav.events',
              locat: {
                name: 'GridEvents'
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
              // demoUrl: 'https://jsrun.pro/XwWKp/edit',
              locat: {
                name: 'GridProxy'
              }
            },
            {
              label: 'app.aside.nav.proxyPage',
              // demoUrl: 'https://jsrun.pro/ywWKp/edit',
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
            // {
            //   label: 'app.aside.nav.dynamicColumn',
            //   locat: {
            //     name: 'GridDynamic'
            //   }
            // },
            {
              label: 'app.aside.nav.contextMenu',
              // demoUrl: 'https://jsrun.pro/m6WKp/edit',
              locat: {
                name: 'GridMenu'
              }
            },
            // // {
            // //   label: 'app.aside.nav.span',
            // //   disabled: true,
            // //   locat: {
            // //     name: 'GridSpan'
            // //   }
            // // },
            // {
            //   label: 'app.aside.nav.upload',
            //   locat: {
            //     name: 'GridUpload'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.baseTree',
            //   locat: {
            //     name: 'GridTree'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.lazyTree',
            //   locat: {
            //     name: 'GridTreeLazy'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.treeLazyEdit',
            //   locat: {
            //     name: 'GridTreeLazyEdit'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.crudTreeToolbar',
            //   locat: {
            //     name: 'GridTreeEdit'
            //   }
            // },
            {
              label: 'app.aside.nav.fullQuery',
              locat: {
                name: 'GridFullQuery'
              }
            },
            {
              label: 'app.aside.nav.full',
              // demoUrl: 'https://jsrun.pro/r6WKp/edit',
              locat: {
                name: 'GridFullEdit'
              }
            }
            // {
            //   label: 'app.aside.nav.configProxy',
            //   locat: {
            //     name: 'GridConfigProxy'
            //   }
            // }
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
            // {
            //   label: 'app.aside.nav.moveHighlight',
            //   locat: {
            //     name: 'TableScrollHighlight'
            //   }
            // },
            {
              label: 'app.aside.nav.fluidHeight',
              locat: {
                name: 'TableScrollMaxHeight'
              }
            },
            {
              label: 'app.aside.nav.group',
              locat: {
                name: 'TableScrollGroup'
              }
            },
            {
              label: 'app.aside.nav.merge',
              locat: {
                name: 'TableScrollMerge'
              }
            },
            {
              label: 'app.aside.nav.keyboard',
              locat: {
                name: 'TableScrollKeyboard'
              }
            },
            {
              label: 'app.aside.nav.edit',
              // demoUrl: 'https://jsrun.pro/MIWKp/edit',
              locat: {
                name: 'TableScrollEdit'
              }
            },
            // {
            //   label: 'app.aside.nav.cellValid',
            //   locat: {
            //     name: 'TableScrollCellValid'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.rowValid',
            //   locat: {
            //     name: 'TableScrollRowValid'
            //   }
            // },
            // // {
            // //   label: 'app.aside.nav.forceCellValid',
            // //   disabled: true,
            // //   locat: {
            // //     name: 'TableScrollForceCellValid'
            // //   }
            // // },
            // // {
            // //   label: 'app.aside.nav.forceRowValid',
            // //   disabled: true,
            // //   locat: {
            // //     name: 'TableScrollForceRowValid'
            // //   }
            // // },
            {
              label: 'app.aside.nav.partialLoad',
              // demoUrl: 'https://jsrun.pro/EVWKp/edit',
              locat: {
                name: 'TableScrollPartialLoad'
              }
            },
            {
              label: 'app.aside.nav.fullPartialLoad',
              // demoUrl: 'https://jsrun.pro/sVWKp/edit',
              locat: {
                name: 'TableScrollFullPartialLoad'
              }
            },
            {
              label: 'app.aside.nav.footer',
              locat: {
                name: 'TableScrollFooter'
              }
            },
            {
              label: 'app.aside.nav.template',
              locat: {
                name: 'TableScrollTemplate'
              }
            },
            // {
            //   label: 'app.aside.nav.tabs',
            //   locat: {
            //     name: 'TableScrollTabs'
            //   }
            // },
            {
              label: 'app.aside.nav.keepAlives',
              locat: {
                name: 'TableScrollKeepAliveTable1'
              }
            },
            {
              label: 'app.aside.nav.scrollMode',
              locat: {
                name: 'TableScrollMode'
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
            // },
            // {
            //   label: 'app.aside.nav.infiniteScroll',
            //   disabled: true,
            //   locat: {
            //     name: 'TableScroll'
            //   }
            }
          ]
        },
        // {
        //   label: 'app.aside.nav.virtualTree',
        //   value: 'virtualTree',
        //   expand: false,
        //   children: [
        //     {
        //       label: 'app.aside.nav.base',
        //       locat: {
        //         name: 'TableVirtualTreeBasic'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.treeNormal',
        //       locat: {
        //         name: 'TableVirtualTreeNormal'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.radio',
        //       locat: {
        //         name: 'TableVirtualTreeRadio'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.checkbox',
        //       locat: {
        //         name: 'TableVirtualTreeCheckbox'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.icon',
        //       locat: {
        //         name: 'TableVirtualTreeIcon'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.fixed',
        //       locat: {
        //         name: 'TableVirtualTreeFixed'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.fluidHeight',
        //       locat: {
        //         name: 'TableVirtualTreeMaxHeight'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.edit',
        //       locat: {
        //         name: 'TableVirtualTreeEdit'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.insert',
        //       locat: {
        //         name: 'TableVirtualTreeInsert'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.delete',
        //       locat: {
        //         name: 'TableVirtualTreeRemove'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.contextMenu',
        //       locat: {
        //         name: 'TableVirtualTreeMenu'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.template',
        //       locat: {
        //         name: 'TableVirtualTreeTemplate'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.big',
        //       locat: {
        //         name: 'TableVirtualTreeBig'
        //       }
        //     }
        //   ]
        // },
        // {
        //   label: 'app.aside.nav.bad',
        //   value: 'bad',
        //   expand: false,
        //   children: [
        //     {
        //       label: 'app.aside.nav.badEdit',
        //       demoUrl: 'https://jsrun.pro/uIWKp/edit',
        //       locat: {
        //         name: 'TableBadEdit'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.badLineHeight',
        //       locat: {
        //         name: 'TableBadLineHeight'
        //       }
        //     },
        //     {
        //       label: 'app.aside.nav.badNonsupport',
        //       locat: {
        //         name: 'TableBadNonsupport'
        //       }
        //     }
        //   ]
        // },
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
            // {
            //   label: 'app.aside.nav.iviewRender',
            //   locat: {
            //     name: 'TableOtherIview'
            //   }
            // },
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
            // {
            //   label: 'app.aside.nav.iviewPlugin',
            //   demoUrl: 'https://jsrun.pro/HPWKp/edit',
            //   locat: {
            //     name: 'TablePluginIviewConfig'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.iviewFilter',
            //   demoUrl: 'https://jsrun.pro/nPWKp/edit',
            //   locat: {
            //     name: 'TablePluginIviewFilter'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.iviewPluginMore',
            //   demoUrl: 'https://jsrun.pro/rPWKp/edit',
            //   locat: {
            //     name: 'TablePluginIviewPage'
            //   }
            // },
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
            // // {
            // //   label: 'app.aside.nav.shortcutKeyPlugin',
            // //   disabled: true,
            // //   locat: {
            // //     name: 'TablePluginShortcutKey'
            // //   }
            // // },
            // // {
            // //   label: 'app.aside.nav.chartsPlugin',
            // //   disabled: true,
            // //   demoUrl: 'https://jsrun.pro/9aWKp/edit',
            // //   locat: {
            // //     name: 'TablePluginCharts'
            // //   }
            // // },
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
            // {
            //   label: 'app.aside.nav.treeRowPlugin',
            //   locat: {
            //     name: 'TablePluginTreeRows'
            //   }
            // },
            // {
            //   label: 'app.aside.nav.treeColPlugin',
            //   locat: {
            //     name: 'TablePluginTreeCols'
            //   }
            // }
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
            // {
            //   label: 'app.footer.donation',
            //   locat: {
            //     name: 'Donation'
            //   }
            // },
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
              label: 'app.aside.nav.vxeTableColgroup',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'colgroup'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeTableColumn',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'column'
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
              label: 'app.aside.nav.vxeRadioGroup',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'radio-group'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeRadioButton',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'radio-button'
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
              label: 'app.aside.nav.vxeCheckboxGroup',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'checkbox-group'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeSwitch',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'switch'
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
              label: 'app.aside.nav.vxeOptgroup',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'optgroup'
                }
              }
            },
            {
              label: 'app.aside.nav.vxeOption',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'option'
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
              label: 'app.aside.nav.vxeFormGather',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'form-gather'
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
            },
            {
              label: 'app.aside.nav.vxeList',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'list'
                }
              }
            },
            {
              label: 'app.aside.nav.vxePulldown',
              locat: {
                name: 'VXEAPI',
                params: {
                  name: 'pulldown'
                }
              }
            }
          ]
        }
      ]
    })

    const getVersion = () => {
      XEAjax.get('https://api.xuliangzhan.com:10443/demo/api/npm/versions/vxe-table').then(({ time, tags, versions }) => {
        appData.showPlugin = true
        const stableVersionList: any = []
        const betaVersionList: any = []
        if (versions) {
          versions.forEach((version: any) => {
            if (new RegExp(`^${appData.version}.\\d{1,3}.\\d{1,3}$`).test(version)) {
              stableVersionList.push({ label: version, value: version })
            } else if (new RegExp(`^${appData.version}.\\d{1,3}.\\d{1,3}-beta.\\d{1,3}$`).test(version)) {
              betaVersionList.push({ label: version, value: version })
            }
          })
        }
        appData.stableVersionList = stableVersionList
        appData.betaVersionList = betaVersionList
        if (stableVersionList.length) {
          appData.selectStableVersion = tags && tags[`xtable-v${appData.version}`] ? tags[`xtable-v${appData.version}`] : stableVersionList[0].value
        }
        if (betaVersionList.length) {
          appData.selectBetaVersion = betaVersionList[0].value
        }

        // 样式处理
        const serveDate = XEUtils.toStringDate(time)
        const yymmdd = XEUtils.toDateString(serveDate, 'yyyyMMdd')
        if (['20210404', '20220405', '20230405', '20240404', '20250404'].includes(yymmdd)) {
          localStorage.setItem('qingmingjie', '1')
          document.body.className = `${document.body.className} qingmingjie`
        } else {
          localStorage.removeItem('qingmingjie')
          document.body.className = document.body.className.replace('qingmingjie', '')
        }
      })

      if (localStorage.getItem('qingmingjie')) {
        document.body.className = `${document.body.className} qingmingjie`
      }
    }

    const handleSearch = () => {
      const filterName = XEUtils.toValueString(appData.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const rest = XEUtils.searchTree(appData.tableData, (item: any) => item.label.toLowerCase().indexOf(filterName) > -1)
        XEUtils.eachTree(rest, (item: any) => {
          item.label = item.label.replace(filterRE, (match: any) => `<span class="keyword-lighten">${match}</span>`)
        })
        appData.apiList = rest
        appData.apiList.forEach(group => {
          group.expand = true
        })
      } else {
        appData.apiList = appData.tableData
      }
    }

    // 调用频率间隔 500 毫秒
    const searchEvent = XEUtils.debounce(handleSearch, 500, { leading: false, trailing: true })

    const clickEvent = (evnt: any) => {
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
    }

    const linkEvent = (item: any) => {
      if (!item.disabled) {
        item.expand = !item.expand
      }
    }

    const vChangeEvent = () => {
      switch (appData.version) {
        case '1':
          location.href = '/vxe-table/v1/'
          break
        case '2':
          location.href = '/vxe-table/v2/'
          break
        case '3':
          location.href = '/vxe-table/v3/'
          break
        case '4':
          location.href = '/vxe-table/v4/'
          break
      }
    }

    const demoLink = computed(() => {
      const $route = router.currentRoute.value
      const apiList: any[] = appData.apiList
      for (let gIndex = 0; gIndex < apiList.length; gIndex++) {
        const group = apiList[gIndex]
        if (group.children) {
          for (let cIndex = 0; cIndex < group.children.length; cIndex++) {
            const item = group.children[cIndex]
            if (item.locat && item.locat.name === $route.name) {
              return item.demoV4Url
            }
          }
        }
      }
      return null
    })

    const showBetaVetsion = computed(() => {
      const betaVersionList: any[] = appData.betaVersionList
      const stableVersionList: any[] = appData.stableVersionList
      if (stableVersionList.length) {
        if (betaVersionList.length) {
          const stableNums = stableVersionList[0].value.split('-')[0].split('.')
          const stable1 = XEUtils.toNumber(stableNums[0])
          const stable2 = XEUtils.toNumber(stableNums[1])
          const stable3 = XEUtils.toNumber(stableNums[2])
          const betaNums = betaVersionList[0].value.split('-')[0].split('.')
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
      } else {
        return betaVersionList.some((item: any) => item.value.indexOf('4.') === 0)
      }
      return false
    })

    const newBetsVersionList = computed(() => {
      const betaVersionList: any[] = appData.betaVersionList
      const stableVersionList: any[] = appData.stableVersionList
      if (stableVersionList.length) {
        if (betaVersionList.length) {
          const stableNums = stableVersionList[0].value.split('-')[0].split('.')
          const stable1 = XEUtils.toNumber(stableNums[0])
          const stable2 = XEUtils.toNumber(stableNums[1])
          const stable3 = XEUtils.toNumber(stableNums[2])
          return betaVersionList.filter((pack: any) => {
            const betaNums = pack.value.split('-')[0].split('.')
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
      } else {
        return betaVersionList.filter((item: any) => item.value.indexOf('4.') === 0)
      }
      return stableVersionList
    })

    const pageKey = computed(() => {
      const $route = router.currentRoute.value
      return $route.path.split('/')[2]
    })

    const showOperBtn = computed(() => {
      const $route = router.currentRoute.value
      return XEUtils.isString($route.name) && ['StartInstall', 'StartUse', 'StartGlobal', 'StartIcons', 'StartTheme', 'StartI18n', 'VXEAPI', 'Donation', 'Run'].includes($route.name)
    })

    const defaultExpand = () => {
      const group = appData.apiList.find(item => item.value === pageKey.value)
      if (group) {
        group.expand = true
      }
    }

    const loadSponsors = () => {
      XEAjax.get('https://api.xuliangzhan.com:10443/demo/api/pub/sponsors').then(data => {
        appData.sponsorList = data
      })
    }

    const loadList = () => {
      appData.tableData = XEUtils.clone(appData.tableList, true)
      XEUtils.eachTree(appData.tableData, (item: any) => {
        item.label = i18n.global.t(item.label)
      })
      handleSearch()
    }

    const init = () => {
      getVersion()
      loadList()
      loadSponsors()
      setTimeout(() => defaultExpand(), 1500)
    }

    watch(() => i18n.global.locale, (value) => {
      localStorage.setItem('language', value)
      loadList()
      defaultExpand()
    })

    watch(pageKey, () => {
      defaultExpand()
    })

    nextTick(() => {
      if (process.env.NODE_ENV === 'development') {
        setInterval(() => {
          const performance: any = window.performance
          if (performance && performance.memory) {
            appData.usedJSHeapSize = XEUtils.toFixed(XEUtils.floor(performance.memory.usedJSHeapSize / 1048576, 2), 2)
          }
        }, 3000)
      }
      init()
    })

    return {
      appData,
      demoLink,
      showBetaVetsion,
      newBetsVersionList,
      pageKey,
      showOperBtn,

      searchEvent,
      clickEvent,
      linkEvent,
      vChangeEvent
    }
  }
})
</script>
