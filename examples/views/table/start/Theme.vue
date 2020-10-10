<template>
  <div>
    <h2>{{ $t('app.aside.nav.theme') }}</h2>
    <p class="tip">第一种方式：创建 scss 文件（<a class="link" href="https://github.com/x-extends/vxe-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a>），并引入所有样式</p>
    <pre>
      <code class="scss">
        @import 'vxe-table/styles/variable.scss';

        // 局部修改变量
        $vxe-font-size: 14px;
        $vxe-font-color: #666;
        $vxe-primary-color: #409eff;
        $vxe-table-font-color: $vxe-font-color;
        $vxe-table-border-color: #e8eaec;
        $vxe-table-border-radius: 4px;
        // ...

        @import 'vxe-table/styles/modules.scss';
      </code>
    </pre>
    <p class="tip">第二种方式：创建 scss 文件（<a class="link" href="https://github.com/x-extends/vxe-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a>），并按需引入模块样式（<a class="link" href="https://github.com/x-extends/vxe-table/blob/master/styles/modules.scss" target="_blank">查看所有模块</a>）</p>
    <pre>
      <code class="scss">
        @import 'vxe-table/styles/variable.scss';

        // 局部修改变量
        $vxe-font-size: 14px;
        $vxe-font-color: #666;
        $vxe-primary-color: #409eff;
        $vxe-table-font-color: $vxe-font-color;
        $vxe-table-border-color: #e8eaec;
        $vxe-table-border-radius: 4px;
        // ...

        @import 'vxe-table/styles/icon.scss';
        @import 'vxe-table/styles/table.scss';
        @import 'vxe-table/styles/column.scss';
        @import 'vxe-table/styles/header.scss';
        @import 'vxe-table/styles/body.scss';
        @import 'vxe-table/styles/footer.scss';
        @import 'vxe-table/styles/filter.scss';
        // ...
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
