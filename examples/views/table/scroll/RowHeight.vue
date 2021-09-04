<template>
  <div>
    <p class="tip">虚拟滚动启用后需要等行高，可以通过 <table-api-link prop="scroll-x"/>.rHeight 修改所有行的高度</p>

    <vxe-table
      border
      resizable
      show-overflow
      ref="xTable"
      height="500"
      :scroll-y="{gt: 0, rHeight: 120}"
      :loading="demo1.loading">
      <vxe-column type="seq" title="序号" width="100"></vxe-column>
      <vxe-column title="图片" width="140" align="center">
        <template #default>
          <img src="/vxe-table/static/other/img1.gif" style="width: 100px;">
        </template>
      </vxe-column>
      <vxe-column title="基本信息">
        <template #default="{ row }">
          <div class="label-ellipsis">{{ row.name }}</div>
          <div class="label-ellipsis">{{ row.num }}</div>
          <div class="label-ellipsis">{{ row.address }}</div>
        </template>
      </vxe-column>
      <vxe-column field="num" title="Num" width="200"></vxe-column>
      <vxe-column field="time" title="Time" width="200"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false
    })

    const xTable = ref({} as VxeTableInstance)

    const mockList = (size: number) => {
      const list: any[] = []
      for (let index = 0; index < size; index++) {
        list.push({
          name: `名称${index} 名称名称 名称名称 名称名称名称名称名称名称 名称名称名称名称 名称名称名称名称名称名称`,
          time: '2021-01-01 10:20:30',
          num: 20,
          address: 'shenzhen shenzhen shenzhen shenzhen shenzhen'
        })
      }
      return list
    }

    const findList = () => {
      demo1.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          const data = mockList(600)
          const $table = xTable.value
          if ($table) {
            $table.loadData(data)
          }
          resolve(null)
          demo1.loading = false
        }, 300)
      })
    }

    findList()

    return {
      demo1,
      xTable,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          ref="xTable"
          height="500"
          :scroll-y="{gt: 0, rHeight: 120}"
          :loading="loading">
          <vxe-column type="seq" title="序号" width="100"></vxe-column>
          <vxe-column title="图片" width="120" align="center">
            <template #default>
              <img src="/vxe-table/static/other/img1.gif" style="width: 100px;">
            </template>
          </vxe-column>
          <vxe-column title="基本信息">
            <template #default="{ row }">
              <div class="label-ellipsis">{{ row.name }}</div>
              <div class="label-ellipsis">{{ row.num }}</div>
              <div class="label-ellipsis">{{ row.address }}</div>
            </template>
          </vxe-column>
          <vxe-column field="num" title="Num" width="200"></vxe-column>
          <vxe-column field="time" title="Time" width="200"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          mounted () {
            this.loading = true
            this.$nextTick(() => {
              const $table = this.$refs.xTable
              this.mockList(1000).then(data => {
                this.loading = false
                if ($table) {
                  $table.loadData(data)
                }
              })
            })
          },
          methods: {
            mockList (size) {
              return new Promise(resolve => {
                const list = []
                for (let index = 0; index < size; index++) {
                  list.push({
                    name: \`名称\${index} 名称名称 名称名称 名称名称名称名称名称名称 名称名称名称名称 名称名称名称名称名称名称\`,
                    time: '2021-01-01 10:20:30',
                    num: 20,
                    address: 'shenzhen shenzhen shenzhen shenzhen shenzhen'
                  })
                }
                resolve(list)
              })
            }
          }
        })
        `,
        `
        .label-ellipsis {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        `
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.label-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
