<template>
  <div>
    <p class="tip">局部递增数据</p>

    <vxe-toolbar :loading="demo1.loading">
      <template #buttons>
        <vxe-button @click="loadList(20)">+20条</vxe-button>
        <vxe-button @click="loadList(100)">+100条</vxe-button>
        <vxe-button @click="loadList(500)">+500条</vxe-button>
        <vxe-button @click="loadList(1000)">+1000条</vxe-button>
        <vxe-button @click="loadList(2000)">+2000条</vxe-button>
        <vxe-button @click="$refs.xTable.scrollTo(null, 4000)">y=4000</vxe-button>
        <vxe-button @click="$refs.xTable.clearScroll()">清除滚动状态</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      resizable
      show-overflow
      height="500"
      :row-config="{keyField: 'id'}"
      :loading="demo1.loading"
      :checkbox-config="{checkField: 'checked'}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column field="name" title="Name" sortable></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
      <vxe-column field="address" title="Address"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    let allData: any[] = []

    const xTable = ref({} as VxeTableInstance)

    const demo1 = reactive({
      loading: false
    })

    const findList = (size: number): Promise<any[]> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const list: any[] = []
          for (let index = 0; index < size; index++) {
            list.push({
              checked: false,
              id: 10000 + index,
              name: 'test' + index,
              role: 'developer',
              age: 10,
              date: '2019-05-01',
              address: 'address abc' + index
            })
          }
          resolve(list)
        }, 250)
      })
    }

    const loadList = (size: number) => {
      demo1.loading = true
      findList(size).then(data => {
        const $table = xTable.value
        allData = allData.concat(data)// 局部追加并保存所有数据
        if ($table) {
          $table.loadData(allData)
        }
        demo1.loading = false
      })
    }

    loadList(600)

    return {
      xTable,
      demo1,
      loadList,
      demoCodes: [
        `
        <vxe-toolbar :loading="demo1.loading">
          <template #buttons>
            <vxe-button @click="loadList(20)">+20条</vxe-button>
            <vxe-button @click="loadList(100)">+100条</vxe-button>
            <vxe-button @click="loadList(500)">+500条</vxe-button>
            <vxe-button @click="loadList(1000)">+1000条</vxe-button>
            <vxe-button @click="loadList(2000)">+2000条</vxe-button>
            <vxe-button @click="$refs.xTable.scrollTo(null, 4000)">y=4000</vxe-button>
            <vxe-button @click="$refs.xTable.clearScroll()">清除滚动状态</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          resizable
          show-overflow
          height="500"
          row-id="id"
          :loading="demo1.loading"
          :checkbox-config="{checkField: 'checked'}">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="100"></vxe-column>
          <vxe-column field="name" title="Name" sortable></vxe-column>
          <vxe-column field="role" title="Role"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
          <vxe-column field="address" title="Address"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            let allData: any[] = []

            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              loading: false
            })

            const findList = (size: number): Promise<any[]> => {
              return new Promise(resolve => {
                setTimeout(() => {
                  const list: any[] = []
                  for (let index = 0; index < size; index++) {
                    list.push({
                      checked: false,
                      id: 10000 + index,
                      name: 'test' + index,
                      role: 'developer',
                      age: 10,
                      date: '2019-05-01',
                      address: 'address abc' + index
                    })
                  }
                  resolve(list)
                }, 250)
              })
            }

            const loadList = (size: number) => {
              demo1.loading = true
              findList(size).then(data => {
                const $table = xTable.value
                allData = allData.concat(data)// 局部追加并保存所有数据
                if ($table) {
                  $table.loadData(allData)
                }
                demo1.loading = false
              })
            }

            loadList(600)

            return {
              xTable,
              demo1,
              loadList
            }
          }
        })
        `
      ]
    }
  }
})
</script>
