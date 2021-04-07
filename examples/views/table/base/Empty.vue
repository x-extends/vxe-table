<template>
  <div>
    <p class="tip">当数据为空时，通过 <table-api-link prop="empty-text"/> 设置空数据提示文本，可以使用 <router-link class="link" :to="{name: 'RendererEmpty'}">渲染器</router-link> 实现全局复用</p>

    <vxe-table
      empty-text="没有更多数据了！"
      :data="tableData1">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">可以通过 slot=<table-api-link prop="empty"/> 自定义提示语</p>

    <vxe-table
      border
      :loading="demo2.loading"
      :data="demo2.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      <template #empty>
        <span style="color: red;">
          <img src="/vxe-table/static/other/img2.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">出现滚动条</p>

    <vxe-table
      border
      height="300"
      :loading="demo3.loading"
      :data="demo3.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
      <template #empty>
        <span style="color: red;">
          <img src="/vxe-table/static/other/img1.gif">
          <p>不用再看了，没有更多数据了！</p>
        </span>
      </template>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup () {
    const tableData1 = ref([])

    const demo2 = reactive({
      loading: false,
      tableData: []
    })

    const demo3 = reactive({
      loading: false,
      tableData: []
    })

    demo2.loading = true
    setTimeout(() => {
      demo2.tableData = []
      demo2.loading = false
    }, 1000)

    demo3.loading = true
    setTimeout(() => {
      demo3.tableData = []
      demo3.loading = false
    }, 1000)

    return {
      tableData1,
      demo2,
      demo3,
      demoCodes: [
        `
        <vxe-table
          empty-text="没有更多数据了！"
          :data="tableData1">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData1 = ref([])

            return {
              tableData1
            }
          }
        })
        `,
        `
        <vxe-table
          border
          :loading="demo2.loading"
          :data="demo2.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
          <template #empty>
            <span style="color: red;">
              <img src="/vxe-table/static/other/img2.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              loading: false,
              tableData: []
            })

            demo2.loading = true
            setTimeout(() => {
              demo2.tableData = []
              demo2.loading = false
            }, 1000)

            return {
              demo2
            }
          }
        })
        `,
        `
        <vxe-table
          border
          height="300"
          :loading="demo3.loading"
          :data="demo3.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
          <template #empty>
            <span style="color: red;">
              <img src="/vxe-table/static/other/img1.gif">
              <p>不用再看了，没有更多数据了！</p>
            </span>
          </template>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo3 = reactive({
              loading: false,
              tableData: []
            })

            demo3.loading = true
            setTimeout(() => {
              demo3.tableData = []
              demo3.loading = false
            }, 1000)

            return {
              demo3
            }
          }
        })
        `
      ]
    }
  }
})
</script>
