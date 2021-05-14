<template>
  <div>
    <p class="tip">
      通过 <table-column-api-link prop="slot"/>插槽（实时） 或者 <table-column-api-link prop="formatter"/> 格式化内容（值改变时），自动计算联动的行数据，如果是用原生输入框可以通过添加 <table-column-api-link prop="immediate"/> 启用实时运算<br>
      <span class="red">（具体请自行实现，该示例仅供参考）</span>
    </p>

    <vxe-table
      border
      resizable
      show-overflow
      show-footer
      :data="tableData"
      :footer-method="footerMethod"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="书名" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="amount" title="单价" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-column>
      <vxe-column field="number" title="数量" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-column>
      <vxe-column title="总价">
        <template #default="{ row }">
          <span>{{ countAmount(row) }} 元</span>
        </template>
      </vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const tableData = ref([
      { name: 'vxe-table 从入门到放弃', amount: 80, number: 5 },
      { name: 'JavaScript 权威指南', amount: 40, number: 3 },
      { name: 'Vue 入门到精通', amount: 90, number: 9 },
      { name: '深入现代 JavaScript 应用开发', amount: 60, number: 1 }
    ])

    const countAmount = (row: any) => {
      return row.amount * row.number
    }

    const countAllAmount = (data: any[]) => {
      let count = 0
      data.forEach(row => {
        count += countAmount(row)
      })
      return count
    }

    const sumNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    }

    const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          if (columnIndex === 3) {
            return `${sumNum(data, 'number')} 本`
          } else if (columnIndex === 4) {
            return `共 ${countAllAmount(data)} 元`
          }
          return '-'
        })
      ]
    }

    return {
      tableData,
      countAmount,
      footerMethod,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          show-footer
          :data="tableData"
          :footer-method="footerMethod"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="书名" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="amount" title="单价" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-column>
          <vxe-column field="number" title="数量" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-column>
          <vxe-column title="总价">
            <template #default="{ row }">
              <span>{{ countAmount(row) }} 元</span>
            </template>
          </vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const tableData = ref([
              { name: 'vxe-table 从入门到放弃', amount: 80, number: 5 },
              { name: 'JavaScript 权威指南', amount: 40, number: 3 },
              { name: 'Vue 入门到精通', amount: 90, number: 9 },
              { name: '深入现代 JavaScript 应用开发', amount: 60, number: 1 }
            ])

            const countAmount = (row: any) => {
              return row.amount * row.number
            }

            const countAllAmount = (data: any[]) => {
              let count = 0
              data.forEach(row => {
                count += countAmount(row)
              })
              return count
            }

            const sumNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            }

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '合计'
                  }
                  if (columnIndex === 3) {
                    return \`\${sumNum(data, 'number')} 本\`
                  } else if (columnIndex === 4) {
                    return \`共 \${countAllAmount(data)} 元\`
                  }
                  return '-'
                })
              ]
            }

            return {
              tableData,
              countAmount,
              footerMethod
            }
          }
        })
        `
      ]
    }
  }
})
</script>
