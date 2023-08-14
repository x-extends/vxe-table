<template>
  <div>
    <p class="tip">最大高度，通过设置 <table-api-link prop="max-height"/> 启用，当数据少时自适应</p>

    <vxe-table
      border
      resizable
      show-overflow
      ref="xTable1"
      max-height="400"
      :loading="demo1.loading">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column field="name" title="Name" sortable width="200"></vxe-column>
      <vxe-column field="age" title="Age" width="200"></vxe-column>
      <vxe-column field="sex" title="Sex" width="200"></vxe-column>
      <vxe-column field="region" title="Region" width="200"></vxe-column>
      <vxe-column field="address" title="Address" width="300" show-overflow></vxe-column>
      <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
      <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">当数据超过最大高度时自动显示滚动条</p>

    <vxe-table
      border
      resizable
      show-overflow
      ref="xTable2"
      max-height="400"
      :loading="demo2.loading"
      :scroll-y="{enabled: true}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column field="name" title="Name" sortable width="200"></vxe-column>
      <vxe-column field="age" title="Age" width="200"></vxe-column>
      <vxe-column field="rate" title="Rate" width="200"></vxe-column>
      <vxe-column field="time" title="Time" width="200"></vxe-column>
      <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
      <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const mockList = (size: number) => {
      const list = []
      for (let index = 0; index < size; index++) {
        list.push({
          name: `名称${index}`,
          sex: '0',
          num: 123,
          age: 18,
          num2: 234,
          rate: 3,
          address: 'shenzhen'
        })
      }
      return list
    }

    const demo1 = reactive({
      loading: false
    })

    const xTable1 = ref({} as VxeTableInstance)

    const findList1 = () => {
      demo1.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          const tableData = mockList(3)
          // 阻断 vue 对大数组的监听，避免 vue 绑定大数据造成短暂的卡顿
          const $table = xTable1.value
          if ($table) {
            $table.loadData(tableData)
          }
          resolve(null)
          demo1.loading = false
        }, 300)
      })
    }

    const demo2 = reactive({
      loading: false
    })

    const xTable2 = ref({} as VxeTableInstance)

    const findList2 = () => {
      demo2.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          const tableData = mockList(60)
          // 阻断 vue 对大数组的监听，避免 vue 绑定大数据造成短暂的卡顿
          const $table = xTable2.value
          if ($table) {
            $table.loadData(tableData)
          }
          resolve(null)
          demo2.loading = false
        }, 300)
      })
    }

    findList1()
    findList2()

    return {
      xTable1,
      demo1,
      xTable2,
      demo2,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          ref="xTable1"
          max-height="400"
          :loading="demo1.loading">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="100"></vxe-column>
          <vxe-column field="name" title="Name" sortable width="200"></vxe-column>
          <vxe-column field="age" title="Age" width="200"></vxe-column>
          <vxe-column field="sex" title="Sex" width="200"></vxe-column>
          <vxe-column field="region" title="Region" width="200"></vxe-column>
          <vxe-column field="address" title="Address" width="300" show-overflow></vxe-column>
          <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const mockList = (size: number) => {
              const list = []
              for (let index = 0; index < size; index++) {
                list.push({
                  name: \`名称\${index}\`,
                  sex: '0',
                  num: 123,
                  age: 18,
                  num2: 234,
                  rate: 3,
                  address: 'shenzhen'
                })
              }
              return list
            }

            const demo2 = reactive({
              loading: false
            })

            const xTable2 = ref({} as VxeTableInstance)

            const findList2 = () => {
              demo2.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  const tableData = mockList(400)
                  // 阻断 vue 对大数组的监听，避免 vue 绑定大数据造成短暂的卡顿
                  const $table = xTable2.value
                  if ($table) {
                    $table.loadData(tableData)
                  }
                  resolve(null)
                  demo2.loading = false
                }, 300)
              })
            }

            findList2()

            return {
              xTable2,
              demo2
            }
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          show-overflow
          ref="xTable2"
          max-height="400"
          :loading="demo2.loading">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="100"></vxe-column>
          <vxe-column field="name" title="Name" sortable width="200"></vxe-column>
          <vxe-column field="age" title="Age" width="200"></vxe-column>
          <vxe-column field="rate" title="Rate" width="200"></vxe-column>
          <vxe-column field="time" title="Time" width="200"></vxe-column>
          <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const mockList = (size: number) => {
              const list = []
              for (let index = 0; index < size; index++) {
                list.push({
                  name: \`名称\${index}\`,
                  sex: '0',
                  num: 123,
                  age: 18,
                  num2: 234,
                  rate: 3,
                  address: 'shenzhen'
                })
              }
              return list
            }

            const demo2 = reactive({
              loading: false
            })

            const xTable2 = ref({} as VxeTableInstance)

            const findList2 = () => {
              demo2.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  const tableData = mockList(60)
                  // 阻断 vue 对大数组的监听，避免 vue 绑定大数据造成短暂的卡顿
                  const $table = xTable2.value
                  if ($table) {
                    $table.loadData(tableData)
                  }
                  resolve(null)
                  demo2.loading = false
                }, 300)
              })
            }

            findList2()

            return {
              xTable2,
              demo2
            }
          }
        })
        `
      ]
    }
  }
})
</script>
