<template>
  <div>
    <p class="tip">
      虚拟滚动渲染，左右固定列<br>
      大数据不建议使用双向绑定的 data 属性，建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="reloadData"/> 函数<br>
      对于多选 type=<table-column-api-link prop="checkbox"/> 当数据量海量时应该绑定 <table-api-link prop="checkField"/> 属性渲染速度更快<br>
      <span class="red">（注：启用纵向虚拟滚的后不支持动态行高；如果需要支持，将虚拟滚动关闭即可）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="loadList(50)">50条</vxe-button>
        <vxe-button @click="loadList(100)">100条</vxe-button>
        <vxe-button @click="loadList(1000)">1k条</vxe-button>
        <vxe-button @click="loadList(5000)">5k条</vxe-button>
        <vxe-button @click="loadList(10000)">1w条</vxe-button>
        <vxe-button @click="loadList(50000)">5w条</vxe-button>
        <vxe-button @click="loadList(100000)">10w条</vxe-button>
        <vxe-button @click="loadList(200000)">20w条</vxe-button>
        <vxe-button @click="$refs.xTable.setAllCheckboxRow(true)">所有选中</vxe-button>
        <vxe-button @click="$refs.xTable.clearCheckboxRow()">清除选中</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      row-key
      show-header-overflow
      highlight-hover-row
      highlight-current-row
      ref="xTable"
      height="600"
      :export-config="{}"
      :loading="demo1.loading"
      :sort-config="{trigger: 'cell'}"
      :checkbox-config="{checkField: 'checked'}">
      <vxe-table-column type="seq" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="attr0" title="Attr0" width="200" sortable></vxe-table-column>
      <vxe-table-column field="attr1" title="Attr1" width="200"></vxe-table-column>
      <vxe-table-column field="attr2" title="Attr2" width="200"></vxe-table-column>
      <vxe-table-column field="attr3" title="Attr3" width="200"></vxe-table-column>
      <vxe-table-column field="attr4" title="Attr4" width="200"></vxe-table-column>
      <vxe-table-column field="attr5" title="Attr5" width="200"></vxe-table-column>
      <vxe-table-column field="attr6" title="Attr6" width="300" sortable></vxe-table-column>
      <vxe-table-column field="attr7" title="Attr7" width="200" sortable></vxe-table-column>
      <vxe-table-column field="attr8" title="Attr8" width="200"></vxe-table-column>
      <vxe-table-column field="attr9" title="Attr9" width="200"></vxe-table-column>
      <vxe-table-column field="attr10" title="Attr10" width="200"></vxe-table-column>
      <vxe-table-column field="attr11" title="Attr11" width="200"></vxe-table-column>
      <vxe-table-column field="attr12" title="Attr12" width="200"></vxe-table-column>
      <vxe-table-column field="attr13" title="Attr14" width="200"></vxe-table-column>
      <vxe-table-column field="attr14" title="Attr14" width="200"></vxe-table-column>
      <vxe-table-column field="attr15" title="Attr15" width="200"></vxe-table-column>
      <vxe-table-column field="attr16" title="Attr16" width="200" fixed="right"></vxe-table-column>
    </vxe-table>

    <pre>
      <pre-code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
        | Page Up | 向上翻页滚动 |
        | Page Down | 向下翻页滚动 |
        | Spacebar | 翻页滚动 |
        | Home | 滚动到顶部 |
        | End | 滚动到底部 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance } from '../../../../types/index'
import XEUtils from 'xe-utils'

const dataList: any[] = []

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false,
      tableData: []
    })

    const xTable = ref({} as VxeTableInstance)

    const mockList = (rowSize: number): Promise<any[]> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const currSize = dataList.length
          if (currSize < rowSize) {
            for (let i = currSize; i < rowSize; i++) {
              dataList.push({
                checked: false,
                attr0: 'attr0_row_' + i,
                attr1: 'attr1_row_' + i,
                attr2: 'attr2_row_' + i,
                attr3: 'attr3_row_' + i,
                attr4: 'attr4_row_' + i,
                attr5: 'attr5_row_' + i,
                attr6: i,
                attr7: '' + i,
                attr8: 'attr8_row_' + i,
                attr9: 'attr9_row_' + i,
                attr10: 'attr10_row_' + i,
                attr11: 'attr11_row_' + i,
                attr12: 'attr12_row_' + i,
                attr13: 'attr13_row_' + i,
                attr14: 'attr14_row_' + i,
                attr15: 'attr15_row_' + i,
                attr16: 'attr16_row_' + i
              })
            }
          }
          const result = XEUtils.clone(dataList.slice(0, rowSize), true)
          resolve(result)
        }, 100)
      })
    }

    const loadList = (rowSize: number) => {
      demo1.loading = true
      mockList(rowSize).then(data => {
        const startTime = Date.now()
        const $table = xTable.value
        // 使用函数式加载
        if ($table) {
          $table.reloadData(data).then(() => {
            VXETable.modal.message({ content: `渲染 ${rowSize} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
            demo1.loading = false
          })
        } else {
          demo1.loading = false
        }
      })
    }

    const getSelectEvent = () => {
      const $table = xTable.value
      const selectRecords = $table.getCheckboxRecords()
      VXETable.modal.alert(`${selectRecords.length}`)
    }

    nextTick(() => {
      loadList(600)
    })

    return {
      xTable,
      demo1,
      loadList,
      getSelectEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="loadList(50)">50条</vxe-button>
            <vxe-button @click="loadList(100)">100条</vxe-button>
            <vxe-button @click="loadList(1000)">1k条</vxe-button>
            <vxe-button @click="loadList(5000)">5k条</vxe-button>
            <vxe-button @click="loadList(10000)">1w条</vxe-button>
            <vxe-button @click="loadList(50000)">5w条</vxe-button>
            <vxe-button @click="loadList(100000)">10w条</vxe-button>
            <vxe-button @click="loadList(200000)">20w条</vxe-button>
            <vxe-button @click="$refs.xTable.setAllCheckboxRow(true)">所有选中</vxe-button>
            <vxe-button @click="$refs.xTable.clearCheckboxRow()">清除选中</vxe-button>
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          row-key
          show-header-overflow
          highlight-hover-row
          highlight-current-row
          ref="xTable"
          height="600"
          :export-config="{}"
          :loading="demo1.loading"
          :sort-config="{trigger: 'cell'}"
          :checkbox-config="{checkField: 'checked'}">
          <vxe-table-column type="seq" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="attr0" title="Attr0" width="200" sortable></vxe-table-column>
          <vxe-table-column field="attr1" title="Attr1" width="200"></vxe-table-column>
          <vxe-table-column field="attr2" title="Attr2" width="200"></vxe-table-column>
          <vxe-table-column field="attr3" title="Attr3" width="200"></vxe-table-column>
          <vxe-table-column field="attr4" title="Attr4" width="200"></vxe-table-column>
          <vxe-table-column field="attr5" title="Attr5" width="200"></vxe-table-column>
          <vxe-table-column field="attr6" title="Attr6" width="300" sortable></vxe-table-column>
          <vxe-table-column field="attr7" title="Attr7" width="200" sortable></vxe-table-column>
          <vxe-table-column field="attr8" title="Attr8" width="200"></vxe-table-column>
          <vxe-table-column field="attr9" title="Attr9" width="200"></vxe-table-column>
          <vxe-table-column field="attr10" title="Attr10" width="200"></vxe-table-column>
          <vxe-table-column field="attr11" title="Attr11" width="200"></vxe-table-column>
          <vxe-table-column field="attr12" title="Attr12" width="200"></vxe-table-column>
          <vxe-table-column field="attr13" title="Attr14" width="200"></vxe-table-column>
          <vxe-table-column field="attr14" title="Attr14" width="200"></vxe-table-column>
          <vxe-table-column field="attr15" title="Attr15" width="200"></vxe-table-column>
          <vxe-table-column field="attr16" title="Attr16" width="200" fixed="right"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, nextTick, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance } from '../../../../types/index'
        import XEUtils from 'xe-utils'

        const dataList: any[] = []

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              loading: false,
              tableData: []
            })

            const xTable = ref({} as VxeTableInstance)

            const mockList = (rowSize: number): Promise<any[]> => {
              return new Promise(resolve => {
                setTimeout(() => {
                  const currSize = dataList.length
                  if (currSize < rowSize) {
                    for (let i = currSize; i < rowSize; i++) {
                      dataList.push({
                        checked: false,
                        attr0: 'attr0_row_' + i,
                        attr1: 'attr1_row_' + i,
                        attr2: 'attr2_row_' + i,
                        attr3: 'attr3_row_' + i,
                        attr4: 'attr4_row_' + i,
                        attr5: 'attr5_row_' + i,
                        attr6: i,
                        attr7: '' + i,
                        attr8: 'attr8_row_' + i,
                        attr9: 'attr9_row_' + i,
                        attr10: 'attr10_row_' + i,
                        attr11: 'attr11_row_' + i,
                        attr12: 'attr12_row_' + i,
                        attr13: 'attr13_row_' + i,
                        attr14: 'attr14_row_' + i,
                        attr15: 'attr15_row_' + i,
                        attr16: 'attr16_row_' + i
                      })
                    }
                  }
                  const result = XEUtils.clone(dataList.slice(0, rowSize), true)
                  resolve(result)
                }, 100)
              })
            }

            const loadList = (rowSize: number) => {
              demo1.loading = true
              mockList(rowSize).then(data => {
                const startTime = Date.now()
                const $table = xTable.value
                // 使用函数式加载
                if ($table) {
                  $table.reloadData(data).then(() => {
                    VXETable.modal.message({ content: \`渲染 \${rowSize} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
                    demo1.loading = false
                  })
                } else {
                  demo1.loading = false
                }
              })
            }

            const getSelectEvent = () => {
              const $table = xTable.value
              const selectRecords = $table.getCheckboxRecords()
              VXETable.modal.alert(\`\${selectRecords.length}\`)
            }

            nextTick(() => {
              loadList(600)
            })

            return {
              xTable,
              demo1,
              loadList,
              getSelectEvent
            }
          }
        }
        `
      ]
    }
  }
})
</script>
