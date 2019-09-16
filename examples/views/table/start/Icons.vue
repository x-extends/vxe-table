<template>
  <div>
    <h2>Custom Icons</h2>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        VXETable.setup({
          // 自定义图标配置（如果全部图标都使用自定义，可以不需要引入 Icon 模块了，减少体积）
          icon: {
            sortAsc: 'vxe-icon--caret-top',
            sortDesc: 'vxe-icon--caret-bottom',
            filter: 'vxe-icon--funnel',
            edit: 'vxe-icon--edit-outline',
            tree: 'vxe-icon--caret-right',
            refresh: 'vxe-icon--refresh',
            custom: 'vxe-icon--menu',
            jumpPrev: 'vxe-icon--d-arrow-left',
            jumpNext: 'vxe-icon--d-arrow-right',
            prevPage: 'vxe-icon--arrow-left',
            nextPage: 'vxe-icon--arrow-right',
            zoomIn: 'vxe-icon--zoomin',
            zoomOut: 'vxe-icon--zoomout',
            modalClose: 'vxe-icon--close',
            modalInfo: 'vxe-icon--info',
            modalSuccess: 'vxe-icon--success',
            modalWarning: 'vxe-icon--warning',
            modalError: 'vxe-icon--error',
            modalQuestion: 'vxe-icon--question',
            modalLoading: 'vxe-icon--refresh roll',
            caretBottom: 'vxe-icon--caret-bottom',
            dropdownBottom: 'vxe-icon--arrow-bottom'
          }
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
