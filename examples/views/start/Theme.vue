<template>
  <div>
    <h2>{{ $t('app.aside.nav.theme') }}</h2>
    <p class="tip">创建 scss 文件（<a class="link" href="https://gitee.com/x-extends/vxe-table/blob/v4.6/styles/variable.scss" target="_blank">查看所有变量</a>），并引入所有样式</p>
    <pre>
      <pre-code class="scss">
        @use 'vxe-table/styles/variable.scss' with (
          $vxe-font-color: #999999,
          $vxe-primary-color: #ff0000
        );
        @use 'vxe-table/styles/all.scss';
      </pre-code>
    </pre>
  </div>
</template>
