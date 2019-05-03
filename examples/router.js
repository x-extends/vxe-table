import Vue from 'vue'
import Router from 'vue-router'

import TableInstall from './views/table/start/Install.vue'
import TableUse from './views/table/start/Use.vue'

import TableBasic from './views/table/base/Basic.vue'
import TableSize from './views/table/base/Size.vue'
import TableStripe from './views/table/base/Stripe.vue'
import TableBorder from './views/table/base/Border.vue'
import TableStyle from './views/table/base/Style.vue'
import TableHeader from './views/table/base/Header.vue'
import TableResizable from './views/table/base/Resizable.vue'
import TableMaxHeight from './views/table/base/MaxHeight.vue'
import TableHeight from './views/table/base/Height.vue'
import TableFixed from './views/table/base/Fixed.vue'
import TableFixedFull from './views/table/base/FixedFull.vue'
import TableGroup from './views/table/base/Group.vue'
import TableIndex from './views/table/base/Index.vue'
import TableRadio from './views/table/base/Radio.vue'
import TableSelection from './views/table/base/Selection.vue'
import TableSort from './views/table/base/Sort.vue'
import TableFilter from './views/table/base/Filter.vue'
import TableLoading from './views/table/base/Loading.vue'
import TableFormat from './views/table/base/Format.vue'
import TableTemplate from './views/table/base/Template.vue'

import TableSpan from './views/table/advanced/Span.vue'
import TableFooter from './views/table/advanced/Footer.vue'
import TableCustom from './views/table/advanced/Custom.vue'
import TableExport from './views/table/advanced/Export.vue'
import TableMenu from './views/table/advanced/Menu.vue'
import TableConfig from './views/table/advanced/Config.vue'
import TableExpand from './views/table/advanced/Expand.vue'

import TableScroll from './views/table/scroll/Scroll.vue'
import TableScrollSize from './views/table/scroll/ScrollSize.vue'
import TableScrollFixed from './views/table/scroll/ScrollFixed.vue'
import TableScrollFooter from './views/table/scroll/ScrollFooter.vue'

import TableEditManual from './views/table/edit/Manual.vue'
import TableEditClick from './views/table/edit/Click.vue'
import TableEditDBLClick from './views/table/edit/DBLClick.vue'

import TableExcelCell from './views/table/excel/Cell.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: {
        name: 'TableInstall'
      }
    },
    {
      path: '/',
      redirect: {
        name: 'TableInstall'
      }
    },
    {
      path: '/table/start/install',
      name: 'TableInstall',
      component: TableInstall
    },
    {
      path: '/table/start/use',
      name: 'TableUse',
      component: TableUse
    },
    {
      path: '/table/base/basic',
      name: 'TableBasic',
      component: TableBasic
    },
    {
      path: '/table/base/size',
      name: 'TableSize',
      component: TableSize
    },
    {
      path: '/table/base/stripe',
      name: 'TableStripe',
      component: TableStripe
    },
    {
      path: '/table/base/border',
      name: 'TableBorder',
      component: TableBorder
    },
    {
      path: '/table/base/style',
      name: 'TableStyle',
      component: TableStyle
    },
    {
      path: '/table/base/header',
      name: 'TableHeader',
      component: TableHeader
    },
    {
      path: '/table/base/resizable',
      name: 'TableResizable',
      component: TableResizable
    },
    {
      path: '/table/base/maxHeight',
      name: 'TableMaxHeight',
      component: TableMaxHeight
    },
    {
      path: '/table/base/height',
      name: 'TableHeight',
      component: TableHeight
    },
    {
      path: '/table/base/fixed',
      name: 'TableFixed',
      component: TableFixed
    },
    {
      path: '/table/base/fixedFull',
      name: 'TableFixedFull',
      component: TableFixedFull
    },
    {
      path: '/table/base/group',
      name: 'TableGroup',
      component: TableGroup
    },
    {
      path: '/table/base/index',
      name: 'TableIndex',
      component: TableIndex
    },
    {
      path: '/table/base/radio',
      name: 'TableRadio',
      component: TableRadio
    },
    {
      path: '/table/base/selection',
      name: 'TableSelection',
      component: TableSelection
    },
    {
      path: '/table/base/sort',
      name: 'TableSort',
      component: TableSort
    },
    {
      path: '/table/base/filter',
      name: 'TableFilter',
      component: TableFilter
    },
    {
      path: '/table/base/loading',
      name: 'TableLoading',
      component: TableLoading
    },
    {
      path: '/table/base/format',
      name: 'TableFormat',
      component: TableFormat
    },
    {
      path: '/table/base/template',
      name: 'TableTemplate',
      component: TableTemplate
    },
    {
      path: '/table/advanced/span',
      name: 'TableSpan',
      component: TableSpan
    },
    {
      path: '/table/advanced/footer',
      name: 'TableFooter',
      component: TableFooter
    },
    {
      path: '/table/advanced/custom',
      name: 'TableCustom',
      component: TableCustom
    },
    {
      path: '/table/advanced/export',
      name: 'TableExport',
      component: TableExport
    },
    {
      path: '/table/advanced/menu',
      name: 'TableMenu',
      component: TableMenu
    },
    {
      path: '/table/advanced/expand',
      name: 'TableExpand',
      component: TableExpand
    },
    {
      path: '/table/advanced/config',
      name: 'TableConfig',
      component: TableConfig
    },
    {
      path: '/table/scroll/scroll',
      name: 'TableScroll',
      component: TableScroll
    },
    {
      path: '/table/scroll/scrollSize/:size',
      name: 'TableScrollSize',
      component: TableScrollSize
    },
    {
      path: '/table/scroll/scrollFixed/:size',
      name: 'TableScrollFixed',
      component: TableScrollFixed
    },
    {
      path: '/table/scroll/scrollFooter/:size',
      name: 'TableScrollFooter',
      component: TableScrollFooter
    },
    {
      path: '/table/edit/manual',
      name: 'TableEditManual',
      component: TableEditManual
    },
    {
      path: '/table/edit/click',
      name: 'TableEditClick',
      component: TableEditClick
    },
    {
      path: '/table/edit/dblclick',
      name: 'TableEditDBLClick',
      component: TableEditDBLClick
    },
    {
      path: '/table/excel/cell',
      name: 'TableExcelCell',
      component: TableExcelCell
    }
  ]
})
