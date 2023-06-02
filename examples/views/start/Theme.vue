<template>
  <div>
    <h2>{{ $t('app.aside.nav.theme') }}</h2>
    <p class="tip">根据项目主题选择器创建主题变量scss/less/css 文件并引入</p>
    <pre>
      <pre-code type="css" class="scss">
        // 比如 scss 常用的 html[theme="light"]， 下文是以class为主题划分的例子 完整自定义请查看variable.scss
       {{code}}
      </pre-code>

      <div :class="{'night':isNight}">
        <div>当前主题：<vxe-button icon="vxe-icon-swap" :content="isNight?'夜间':'白天'" @click="isNight=!isNight"/></div>
        <vxe-grid v-bind="sampleSetting"/>
      </div>

    </pre>

  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VxeGridProps } from '../../../types'
interface IRow {
  name:string;
  id:number;
  age:number;
  role:string;
  address:string;
  sex:'Man'|'Women'
}
export default defineComponent({
  setup () {
    const code = `
     .night {
          --vxe-modal-header-background-color: #27355d;
          --vxe-form-background-color: #212b4b;
          --vxe-table-body-background-color: #212b4b;
          --vxe-grid-maximize-background-color: #212b4b;
          --vxe-textarea-background-color: #212b4b;
          --vxe-table-row-current-background-color: #334579;
          --vxe-table-column-current-background-color: #334579;
          --vxe-table-column-hover-background-color: #334579;
          --vxe-table-row-hover-background-color: #405492;
          --vxe-table-row-hover-current-background-color: #4d63ad;
          --vxe-input-date-picker-hover-background-color: #4d63ad;
          --vxe-loading-background-color: #677dc780;
          --vxe-loading-color: #75bcea;
          --vxe-modal-body-background-color: #212b4b;
          --vxe-button-default-background-color: #212b4b;
          --vxe-pulldown-panel-background-color: #212b4b;
          --vxe-input-background-color: #212b4b;
          --vxe-select-panel-background-color: #212b4b;
          --vxe-radio-button-default-background-color: #212b4b;
          --vxe-toolbar-background-color: #212b4b;
          --vxe-pager-background-color: #212b4b;
          --vxe-pager-perfect-background-color: #212b4b;
          --vxe-table-tree-node-line-color: #bec1c5;
          --vxe-table-border-color: #e2ebf6;
          --vxe-textarea-count-color: #e2ebf6;
          --vxe-table-header-font-color: #fff;
          --vxe-table-header-background-color: #27355d;
          --vxe-select-option-hover-background-color: #27355d;
          --vxe-font-size: 14px;
          --vxe-font-color: #e2ebf6;
          --vxe-font-l10-color: #f5f8fc;
          --vxe-font-l20-color: #fff;
          --vxe-pager-font-color: #ffffffe6;
          --vxe-row-selected-bg-color: #d39a26;
        }
    `
    const isNight = ref(false)
    const sampleSetting:VxeGridProps<IRow> = {
      size: 'mini',
      data: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ],
      columns: [
        { field: 'id', title: 'ID', width: 80 },
        { field: 'name', title: '名字', width: 120 },
        { field: 'role', title: '角色', width: 120 },
        { field: 'sex', title: '性别', width: 80 },
        { field: 'age', title: '年龄', width: 80 },
        { field: 'address', title: '地址', minWidth: 200 }
      ]
    }
    return {
      isNight,
      sampleSetting,
      code
    }
  }
})
</script>
<style lang="scss" scoped>
.night {
  --vxe-modal-header-background-color: #27355d;
  --vxe-form-background-color: #212b4b;
  --vxe-table-body-background-color: #212b4b;
  --vxe-grid-maximize-background-color: #212b4b;
  --vxe-textarea-background-color: #212b4b;
  --vxe-table-row-current-background-color: #334579;
  --vxe-table-column-current-background-color: #334579;
  --vxe-table-column-hover-background-color: #334579;
  --vxe-table-row-hover-background-color: #405492;
  --vxe-table-row-hover-current-background-color: #4d63ad;
  --vxe-input-date-picker-hover-background-color: #4d63ad;
  --vxe-loading-background-color: #677dc780;
  --vxe-loading-color: #75bcea;
  --vxe-modal-body-background-color: #212b4b;
  --vxe-button-default-background-color: #212b4b;
  --vxe-pulldown-panel-background-color: #212b4b;
  --vxe-input-background-color: #212b4b;
  --vxe-select-panel-background-color: #212b4b;
  --vxe-radio-button-default-background-color: #212b4b;
  --vxe-toolbar-background-color: #212b4b;
  --vxe-pager-background-color: #212b4b;
  --vxe-pager-perfect-background-color: #212b4b;
  --vxe-table-tree-node-line-color: #bec1c5;
  --vxe-table-border-color: #e2ebf6;
  --vxe-textarea-count-color: #e2ebf6;
  --vxe-table-header-font-color: #fff;
  --vxe-table-header-background-color: #27355d;
  --vxe-select-option-hover-background-color: #27355d;
  --vxe-font-size: 14px;
  --vxe-font-color: #e2ebf6;
  --vxe-font-l10-color: #f5f8fc;
  --vxe-font-l20-color: #fff;
  --vxe-pager-font-color: #ffffffe6;
  --vxe-row-selected-bg-color: #d39a26;
}
</style>
