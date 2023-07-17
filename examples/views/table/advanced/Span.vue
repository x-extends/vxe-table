<template>
  <div>
    <p class="tip">
      合并行或列，通过 <table-api-link prop="merge-cells"/> 临时合并，或者自定义 <table-api-link prop="span-method"/> 合并方法<br>
      <span class="red">（注：<table-api-link prop="span-method"/> ，不能用于虚拟滚动、树形结构、展开行、固定列，合并的逻辑都是自行实现的，该示例仅供参考）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="demo1.allAlign = 'left'">居左</vxe-button>
        <vxe-button @click="demo1.allAlign = 'center'">居中</vxe-button>
        <vxe-button @click="demo1.allAlign = 'right'">居右</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      height="300"
      :align="demo1.allAlign"
      :merge-cells="demo1.mergeCells"
      :data="demo1.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">合并列</p>

    <vxe-table
      border
      resizable
      height="300"
      :scroll-y="{enabled: false}"
      :span-method="colspanMethod"
      :data="demo2.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">合并行</p>

    <vxe-table
      border
      resizable
      height="300"
      :scroll-y="{enabled: false}"
      :span-method="mergeRowMethod"
      :data="demo3.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="key" title="Key"></vxe-column>
      <vxe-column field="content" title="Translate"></vxe-column>
      <vxe-column field="language" title="Language" :filters="demo1.languageOptions"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[5] }}</pre-code>
    </pre>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      allAlign: null as VxeTablePropTypes.Align,
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      languageOptions: [{ label: '中文', value: 'zh_CN' }, { label: 'English', value: 'en_US' }],
      mergeCells: [
        { row: 1, col: 1, rowspan: 3, colspan: 3 },
        { row: 5, col: 0, rowspan: 2, colspan: 2 }
      ] as VxeTablePropTypes.MergeCells
    })

    const demo2 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ]
    })

    const colspanMethod: VxeTablePropTypes.SpanMethod = ({ _rowIndex, columnIndex }) => {
      if (_rowIndex % 2 === 0) {
        if (columnIndex === 2) {
          return { rowspan: 1, colspan: 2 }
        } else if (columnIndex === 3) {
          return { rowspan: 0, colspan: 0 }
        }
      }
    }

    const demo3 = reactive({
      tableData: [
        { id: 10001, key: 'app.label.name', content: '名称', language: 'zh_CN' },
        { id: 10002, key: 'app.label.name', content: 'Name', language: 'en_US' },
        { id: 10003, key: 'app.label.sex', content: '性别', language: 'zh_CN' },
        { id: 10004, key: 'app.label.sex', content: 'Sex', language: 'en_US' },
        { id: 10005, key: 'app.label.age', content: '年龄', language: 'zh_CN' },
        { id: 10006, key: 'app.label.age', content: 'Age', language: 'en_US' },
        { id: 10007, key: 'app.label.role', content: '角色', language: 'zh_CN' },
        { id: 10008, key: 'app.label.role', content: 'Role', language: 'en_US' },
        { id: 10009, key: 'app.label.address', content: '地址', language: 'zh_CN' },
        { id: 10010, key: 'app.label.address', content: 'Address', language: 'en_US' },
        { id: 10011, key: 'app.label.nickname', content: '昵称', language: 'zh_CN' },
        { id: 10012, key: 'app.label.nickname', content: 'Nickname', language: 'en_US' }
      ]
    })

    // 通用行合并函数（将相同多列数据合并为一行）
    const mergeRowMethod: VxeTablePropTypes.SpanMethod = ({ row, _rowIndex, column, visibleData }) => {
      const fields = ['key']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    }

    return {
      demo1,
      demo2,
      colspanMethod,
      demo3,
      mergeRowMethod,
      demoCodes: []
    }
  }
})
</script>
