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
import TableExpand from './views/table/advanced/Expand.vue'

import GridBasic from './views/table/grid/Basic.vue'
import GridPage from './views/table/grid/Page.vue'

import TableScroll from './views/table/scroll/Scroll.vue'
import TableScrollRows from './views/table/scroll/ScrollRows.vue'
import TableScrollFullRows from './views/table/scroll/ScrollFullRows.vue'
import TableScrollCols from './views/table/scroll/ScrollCols.vue'
import TableScrollFullCols from './views/table/scroll/ScrollFullCols.vue'

import TableEditManual from './views/table/edit/Manual.vue'
import TableEditClick from './views/table/edit/Click.vue'
import TableEditDBLClick from './views/table/edit/DBLClick.vue'
import TableEditInsert from './views/table/edit/Insert.vue'
import TableEditRemove from './views/table/edit/Remove.vue'
import TableEditRevert from './views/table/edit/Revert.vue'
import TableEditStatus from './views/table/edit/Status.vue'
import TableEditDisable from './views/table/edit/Disable.vue'
import TableEditKeyboard from './views/table/edit/Keyboard.vue'
import TableEditValid from './views/table/edit/Valid.vue'
import TableEditTemplate from './views/table/edit/Template.vue'

import TableExcelCell from './views/table/excel/Cell.vue'

import TableOtherElement from './views/table/other/Element.vue'
import TableOtherElementConfig from './views/table/other/ElementConfig.vue'
import TableOtherElementPage from './views/table/other/ElementPage.vue'
import TableOtherIview from './views/table/other/Iview.vue'
import TableOtherIviewConfig from './views/table/other/IviewConfig.vue'
import TableOtherIviewPage from './views/table/other/IviewPage.vue'

import TableAPI from './views/table/api/Table.vue'

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
      path: '/table/grid/basic',
      name: 'GridBasic',
      component: GridBasic
    },
    {
      path: '/table/grid/page',
      name: 'GridPage',
      component: GridPage
    },
    {
      path: '/table/scroll/scroll',
      name: 'TableScroll',
      component: TableScroll
    },
    {
      path: '/table/scroll/rows',
      name: 'TableScrollRows',
      component: TableScrollRows
    },
    {
      path: '/table/scroll/fullRows',
      name: 'TableScrollFullRows',
      component: TableScrollFullRows
    },
    {
      path: '/table/scroll/cols',
      name: 'TableScrollCols',
      component: TableScrollCols
    },
    {
      path: '/table/scroll/fullCols',
      name: 'TableScrollFullCols',
      component: TableScrollFullCols
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
      path: '/table/edit/insert',
      name: 'TableEditInsert',
      component: TableEditInsert
    },
    {
      path: '/table/edit/remove',
      name: 'TableEditRemove',
      component: TableEditRemove
    },
    {
      path: '/table/edit/revert',
      name: 'TableEditRevert',
      component: TableEditRevert
    },
    {
      path: '/table/edit/status',
      name: 'TableEditStatus',
      component: TableEditStatus
    },
    {
      path: '/table/edit/disable',
      name: 'TableEditDisable',
      component: TableEditDisable
    },
    {
      path: '/table/edit/keyboard',
      name: 'TableEditKeyboard',
      component: TableEditKeyboard
    },
    {
      path: '/table/edit/template',
      name: 'TableEditTemplate',
      component: TableEditTemplate
    },
    {
      path: '/table/edit/valid',
      name: 'TableEditValid',
      component: TableEditValid
    },
    {
      path: '/table/excel/cell',
      name: 'TableExcelCell',
      component: TableExcelCell
    },
    {
      path: '/table/other/element',
      name: 'TableOtherElement',
      component: TableOtherElement
    },
    {
      path: '/table/other/elementConfig',
      name: 'TableOtherElementConfig',
      component: TableOtherElementConfig
    },
    {
      path: '/table/other/elementPage',
      name: 'TableOtherElementPage',
      component: TableOtherElementPage
    },
    {
      path: '/table/other/iview',
      name: 'TableOtherIview',
      component: TableOtherIview
    },
    {
      path: '/table/other/iviewConfig',
      name: 'TableOtherIviewConfig',
      component: TableOtherIviewConfig
    },
    {
      path: '/table/other/iviewPage',
      name: 'TableOtherIviewPage',
      component: TableOtherIviewPage
    },
    {
      path: '/table/api',
      name: 'TableAPI',
      component: TableAPI
    }
  ]
})
