import Vue from 'vue'
import Router from 'vue-router'

import Install from './views/table/start/Install.vue'
import Use from './views/table/start/Use.vue'
import Advanced from './views/table/start/Advanced.vue'

import TableBasic from './views/table/base/Basic.vue'
import TableSize from './views/table/base/Size.vue'
import TableOverflow from './views/table/base/Overflow.vue'
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
import TableEmpty from './views/table/base/Empty.vue'
import TableLoading from './views/table/base/Loading.vue'
import TableFormat from './views/table/base/Format.vue'

import TableEvent from './views/table/advanced/Event.vue'
import TableTemplate from './views/table/advanced/Template.vue'
import TableSpan from './views/table/advanced/Span.vue'
import TableFooter from './views/table/advanced/Footer.vue'
import TableCustom from './views/table/advanced/Custom.vue'
import TableExport from './views/table/advanced/Export.vue'
import TableMenu from './views/table/advanced/Menu.vue'
import TableExpand from './views/table/advanced/Expand.vue'
import TableToolbar from './views/table/advanced/Toolbar.vue'

import TableTreeBasic from './views/table/tree/Basic.vue'
import TableTreeSelection from './views/table/tree/Selection.vue'
import TableTreeRadio from './views/table/tree/Radio.vue'
import TableTreeToolbar from './views/table/tree/Toolbar.vue'
import TableTreeEdit from './views/table/tree/Edit.vue'

import GridBasic from './views/table/grid/Basic.vue'
import GridPage from './views/table/grid/Page.vue'
import GridFullQuery from './views/table/grid/FullQuery.vue'
import GridProxy from './views/table/grid/Proxy.vue'
import GridPageProxy from './views/table/grid/PageProxy.vue'
import GridEdit from './views/table/grid/Edit.vue'
import GridToolbar from './views/table/grid/Toolbar.vue'
import GridTree from './views/table/grid/Tree.vue'
import GridTreeEdit from './views/table/grid/TreeEdit.vue'
import GridFullEdit from './views/table/grid/FullEdit.vue'

import TableScroll from './views/table/scroll/Scroll.vue'
import TableScrollRows from './views/table/scroll/ScrollRows.vue'
import TableScrollFullRows from './views/table/scroll/ScrollFullRows.vue'
import TableScrollCols from './views/table/scroll/ScrollCols.vue'
import TableScrollFullCols from './views/table/scroll/ScrollFullCols.vue'

import TableEditManual from './views/table/edit/Manual.vue'
import TableEditClick from './views/table/edit/Click.vue'
import TableEditDBLClick from './views/table/edit/DBLClick.vue'
import TableAutoClearManual from './views/table/edit/AutoClear.vue'
import TableEditInsert from './views/table/edit/Insert.vue'
import TableEditRemove from './views/table/edit/Remove.vue'
import TableEditRevert from './views/table/edit/Revert.vue'
import TableEditStatus from './views/table/edit/Status.vue'
import TableEditCellDisable from './views/table/edit/CellDisable.vue'
import TableEditRowDisable from './views/table/edit/RowDisable.vue'
import TableEditKeyboard from './views/table/edit/Keyboard.vue'
import TableEditCellValid from './views/table/edit/CellValid.vue'
import TableEditRowValid from './views/table/edit/RowValid.vue'
import TableEditTemplate from './views/table/edit/Template.vue'
import TableEditFull from './views/table/edit/Full.vue'

import TableExcelCell from './views/table/excel/Cell.vue'

import TableOtherElement from './views/table/other/Element.vue'
import TableOtherIview from './views/table/other/Iview.vue'
import TableSortablejs from './views/table/other/Sortablejs.vue'

import TablePluginElementConfig from './views/table/plugin/ElementConfig.vue'
import TablePluginElementPage from './views/table/plugin/ElementPage.vue'
import TablePluginIviewConfig from './views/table/plugin/IviewConfig.vue'
import TablePluginIviewPage from './views/table/plugin/IviewPage.vue'

import TableAPI from './views/table/api/API.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: {
        name: 'Install'
      }
    },
    {
      path: '/',
      redirect: {
        name: 'Install'
      }
    },
    {
      path: '/table/start/install',
      name: 'Install',
      component: Install
    },
    {
      path: '/table/start/use',
      name: 'Use',
      component: Use
    },
    {
      path: '/table/start/advanced',
      name: 'Advanced',
      component: Advanced
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
      path: '/table/base/overflow',
      name: 'TableOverflow',
      component: TableOverflow
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
      path: '/table/base/empty',
      name: 'TableEmpty',
      component: TableEmpty
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
      path: '/table/base/event',
      name: 'TableEvent',
      component: TableEvent
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
      path: '/table/advanced/toolbar',
      name: 'TableToolbar',
      component: TableToolbar
    },
    {
      path: '/table/tree/basic',
      name: 'TableTreeBasic',
      component: TableTreeBasic
    },
    {
      path: '/table/tree/selection',
      name: 'TableTreeSelection',
      component: TableTreeSelection
    },
    {
      path: '/table/tree/radio',
      name: 'TableTreeRadio',
      component: TableTreeRadio
    },
    {
      path: '/table/tree/toolbar',
      name: 'TableTreeToolbar',
      component: TableTreeToolbar
    },
    {
      path: '/table/tree/edit',
      name: 'TableTreeEdit',
      component: TableTreeEdit
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
      path: '/table/grid/proxy',
      name: 'GridProxy',
      component: GridProxy
    },
    {
      path: '/table/grid/pageProxy',
      name: 'GridPageProxy',
      component: GridPageProxy
    },
    {
      path: '/table/grid/edit',
      name: 'GridEdit',
      component: GridEdit
    },
    {
      path: '/table/grid/toolbar',
      name: 'GridToolbar',
      component: GridToolbar
    },
    {
      path: '/table/grid/tree',
      name: 'GridTree',
      component: GridTree
    },
    {
      path: '/table/grid/treeEdit',
      name: 'GridTreeEdit',
      component: GridTreeEdit
    },
    {
      path: '/table/grid/fullEdit',
      name: 'GridFullEdit',
      component: GridFullEdit
    },
    {
      path: '/table/grid/fullQuery',
      name: 'GridFullQuery',
      component: GridFullQuery
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
      path: '/table/edit/autoClear',
      name: 'TableAutoClearManual',
      component: TableAutoClearManual
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
      path: '/table/edit/cellDisable',
      name: 'TableEditCellDisable',
      component: TableEditCellDisable
    },
    {
      path: '/table/edit/rowDisable',
      name: 'TableEditRowDisable',
      component: TableEditRowDisable
    },
    {
      path: '/table/edit/keyboard',
      name: 'TableEditKeyboard',
      component: TableEditKeyboard
    },
    {
      path: '/table/edit/cellValid',
      name: 'TableEditCellValid',
      component: TableEditCellValid
    },
    {
      path: '/table/edit/rowValid',
      name: 'TableEditRowValid',
      component: TableEditRowValid
    },
    {
      path: '/table/edit/template',
      name: 'TableEditTemplate',
      component: TableEditTemplate
    },
    {
      path: '/table/edit/full',
      name: 'TableEditFull',
      component: TableEditFull
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
      path: '/table/other/iview',
      name: 'TableOtherIview',
      component: TableOtherIview
    },
    {
      path: '/table/other/Sortablejs',
      name: 'TableSortablejs',
      component: TableSortablejs
    },
    {
      path: '/table/plugin/elementConfig',
      name: 'TablePluginElementConfig',
      component: TablePluginElementConfig
    },
    {
      path: '/table/plugin/elementPage',
      name: 'TablePluginElementPage',
      component: TablePluginElementPage
    },
    {
      path: '/table/plugin/iviewConfig',
      name: 'TablePluginIviewConfig',
      component: TablePluginIviewConfig
    },
    {
      path: '/table/plugin/iviewPage',
      name: 'TablePluginIviewPage',
      component: TablePluginIviewPage
    },
    {
      path: '/:name/api',
      name: 'TableAPI',
      component: TableAPI
    }
  ]
})
