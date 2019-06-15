<template>
  <div>
    <h3>主题</h3>
    <p>Case 1.使用默认的主题样式</p>
    <pre>
      <code class="scss">
        @import 'vxe-table/lib/index.css';
      </code>
    </pre>
    <p>Case 2.修改主题颜色，只需在项目的 scss 文件中修改局部变量即可</p>
    <pre>
      <code class="scss">
        @import 'vxe-table/styles/variable.scss';
        $vxe-font-color: #606266;
        $vxe-table-header-background-color: #f8f8f9;
        $vxe-table-border-color: #e8eaec;
        $vxe-table-background-color: #ffffff;
        @import 'vxe-table/styles/default.scss';
      </code>
    </pre>
    <p>Case 3.如果需要完全重写主题样式，把 vxe-table/styles/** 目录全部复制到项目中自行修改</p>
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
