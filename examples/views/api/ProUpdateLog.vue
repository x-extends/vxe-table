<template>
  <div>
    <ul>
      <li>
        v1.0.0 - 2019-06-01
        实现对单元格操作的完整支持
      </li>
      <li>
        v1.0.1 - 2019-10-01
        内部优化
        小bug修复
      </li>
      <li>
        v1.0.2 - 2020-11-10
        增加参数 clip-config
        增加事件 cell-area-copy
        增加事件 cell-area-cut
        增加事件 cell-area-paste
        增加事件 cell-area-merge
        增加事件 cell-area-selection-start
        增加事件 cell-area-selection-end
        增加事件 cell-area-extension-start
        增加事件 cell-area-extension-end
      </li>
      <li>
        v1.0.3 - 2020-11-23 
        修复 MacOS 复制粘贴失效问题
      </li>
      <li>
        v1.0.4 - 2020-11-25 
        支持查找与替换可自定义显示
        支持查找与替换自定义方法
      </li>
      <li>
        v1.0.5 - 2020-11-29
        优化 cell-area-* 相关事件的参数
      </li>
      <li>
        v1.0.6 - 2020-12-01
        增加参数 clip-config.copyMethod 对应旧的 clip-config.getMethod
        增加参数 clip-config.beforeCopyMethod 对应旧的 clip-config.beforeGetMethod
        增加参数 clip-config.pasteMethod 对应旧的 clip-config.setMethod
        增加参数 clip-config.beforePasteMethod 对应旧的 clip-config.beforeSetMethod
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>