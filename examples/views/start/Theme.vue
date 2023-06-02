<template>
  <div>
    <h2>{{ $t('app.aside.nav.theme') }}</h2>
    <p class="tip">根据项目主题选择器创建主题变量scss/less/css 文件并引入</p>
    <pre>
      <pre-code type="css" class="scss">
        // 比如 scss 常用的 html[theme="light"]， 下文是以class为主题划分的例子 完整自定义请查看variable.scss
        .gay-theme {
        	--vxe-font-size: 14px;
          --vxe-font-color: #666;
          --vxe-primary-color: #9660ee;
          --vxe-primary-l6-color: #a87cf1;
          --vxe-primary-l10-color: #b48ef3;
          --vxe-primary-l20-color: #d3bcf8;
          --vxe-primary-d2-color: #9057ed;
          --vxe-primary-d3-color: #8d52ed;
          --vxe-primary-d10-color: #7832e9;
          --vxe-primary-d20-color: #5e16d2;
          --vxe-table-font-color: var(--vxe-font-color);
          --vxe-table-border-color: #e8eaec;
          --vxe-table-border-radius: 4px;
        }
      </pre-code>
      <div>
        默认主题：<vxe-button status="primary">主要按钮</vxe-button>
      </div>
      <div class="gay-theme">
        紫色主题：<vxe-button status="primary">主要按钮</vxe-button>
      </div>
    </pre>

  </div>
</template>
<style lang="scss" scoped>
.gay-theme {
  --vxe-font-size: 14px;
  --vxe-font-color: #666;
  --vxe-primary-color: #9660ee;
  --vxe-primary-l6-color: #a87cf1;
  --vxe-primary-l10-color: #b48ef3;
  --vxe-primary-l20-color: #d3bcf8;
  --vxe-primary-d2-color: #9057ed;
  --vxe-primary-d3-color: #8d52ed;
  --vxe-primary-d10-color: #7832e9;
  --vxe-primary-d20-color: #5e16d2;
  --vxe-table-font-color: var(--vxe-font-color);
  --vxe-table-border-color: #e8eaec;
  --vxe-table-border-radius: 4px;
}
</style>
