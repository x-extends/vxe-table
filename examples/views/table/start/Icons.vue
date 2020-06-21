<template>
  <div>
    <h2>{{ $t('app.aside.nav.icons') }}</h2>
    <p class="tip">如果项目已有适合的图标，例如第三方图标库 <a class="link" href="https://www.npmjs.com/package/font-awesome" target="_black">font-awesome</a>，可通过配置替换并自行调整相关的样式即可</p>
    <pre>
      <code class="javascript">
        import VXETable from 'vxe-table'

        VXETable.setup({
        // icon: {
        //   // table
        //   TABLE_SORT_ASC: 'vxe-icon--caret-top',
        //   TABLE_SORT_DESC: 'vxe-icon--caret-bottom',
        //   TABLE_FILTER_NONE: 'vxe-icon--funnel',
        //   TABLE_FILTER_MATCH: 'vxe-icon--funnel',
        //   TABLE_EDIT: 'vxe-icon--edit-outline',
        //   TABLE_TREE_LOADED: 'vxe-icon--refresh roll',
        //   TABLE_TREE_OPEN: 'vxe-icon--caret-right rotate90',
        //   TABLE_TREE_CLOSE: 'vxe-icon--caret-right',
        //   TABLE_EXPAND_LOADED: 'vxe-icon--refresh roll',
        //   TABLE_EXPAND_OPEN: 'vxe-icon--arrow-right rotate90',
        //   TABLE_EXPAND_CLOSE: 'vxe-icon--arrow-right',

        //   // button
        //   BUTTON_DROPDOWN: 'vxe-icon--arrow-bottom',
        //   BUTTON_LOADING: 'vxe-icon--refresh roll',

        //   // select
        //   SELECT_OPEN: 'vxe-icon--caret-bottom rotate180',
        //   SELECT_CLOSE: 'vxe-icon--caret-bottom',

        //   // pager
        //   PAGER_JUMP_PREV: 'vxe-icon--d-arrow-left',
        //   PAGER_JUMP_NEXT: 'vxe-icon--d-arrow-right',
        //   PAGER_PREV_PAGE: 'vxe-icon--arrow-left',
        //   PAGER_NEXT_PAGE: 'vxe-icon--arrow-right',
        //   PAGER_JUMP_MORE: 'vxe-icon--more',

        //   // input
        //   INPUT_CLEAR: 'vxe-icon--close',
        //   INPUT_PWD: 'vxe-icon--eye-slash',
        //   INPUT_SHOW_PWD: 'vxe-icon--eye',
        //   INPUT_PREV_NUM: 'vxe-icon--caret-top',
        //   INPUT_NEXT_NUM: 'vxe-icon--caret-bottom',
        //   INPUT_DATE: 'vxe-icon--calendar',
        //   INPUT_SEARCH: 'vxe-icon--search',

        //   // modal
        //   MODAL_ZOOM_IN: 'vxe-icon--square',
        //   MODAL_ZOOM_OUT: 'vxe-icon--zoomout',
        //   MODAL_CLOSE: 'vxe-icon--close',
        //   MODAL_INFO: 'vxe-icon--info',
        //   MODAL_SUCCESS: 'vxe-icon--success',
        //   MODAL_WARNING: 'vxe-icon--warning',
        //   MODAL_ERROR: 'vxe-icon--error',
        //   MODAL_QUESTION: 'vxe-icon--question',
        //   MODAL_LOADING: 'vxe-icon--refresh roll',

        //   // toolbar
        //   TOOLBAR_TOOLS_REFRESH: 'vxe-icon--refresh',
        //   TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-icon--refresh roll',
        //   TOOLBAR_TOOLS_IMPORT: 'vxe-icon--upload',
        //   TOOLBAR_TOOLS_EXPORT: 'vxe-icon--download',
        //   TOOLBAR_TOOLS_ZOOM_IN: 'vxe-icon--zoomin',
        //   TOOLBAR_TOOLS_ZOOM_OUT: 'vxe-icon--zoomout',
        //   TOOLBAR_TOOLS_CUSTOM: 'vxe-icon--menu',

        //   // form
        //   FORM_PREFIX: 'vxe-icon--info',
        //   FORM_SUFFIX: 'vxe-icon--info',
        //   FORM_FOLDING: 'vxe-icon--arrow-top rotate180',
        //   FORM_UNFOLDING: 'vxe-icon--arrow-top'
        // }
      })
      </code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
