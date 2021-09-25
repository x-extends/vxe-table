<template>
  <div>
    <h2>{{ $t('app.aside.nav.tooltip') }}</h2>
    <p class="tip">工具提示，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'tooltip'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数</p>

    <p>
      <vxe-tooltip content="我是提示内容">
        <a class="link">文字提示</a>
      </vxe-tooltip>
    </p>

    <p>
      <vxe-tooltip content="除了点击之外不会自动消息" trigger="click">
        <vxe-button>点击触发</vxe-button>
      </vxe-tooltip>
      <vxe-tooltip content="hover 提示内容">
        <vxe-button>Hover 触发</vxe-button>
      </vxe-tooltip>
      <vxe-tooltip content="鼠标可以进入到 tooltip 中" enterable>
        <vxe-button>设置 Enterable</vxe-button>
      </vxe-tooltip>
    </p>

    <p>
      <vxe-tooltip v-model="demo1.value1" content="自定义提示内容" trigger="manual">
        <vxe-button @mouseenter="demo1.value1 = true" @mouseleave="demo1.value1 = false">手动模式</vxe-button>
      </vxe-tooltip>
    </p>

    <p>
      <vxe-tooltip ref="xTip4"></vxe-tooltip>
      <vxe-button @mouseenter="$refs.xTip4.show($event.target, '自定义提示内容')" @mouseleave="$refs.xTip4.close()">高性能模式，只创建一个实例</vxe-button>
    </p>

    <p>
      <vxe-tooltip ref="xTip5"></vxe-tooltip>
      <vxe-table
        border
        height="200"
        :tooltip-config="{}"
        :data="demo1.tableData"
        @cell-mouseenter="cellMouseenterEvent"
        @cell-mouseleave="cellMouseleaveEvent">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
      </vxe-table>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTooltipInstance } from '../../../types/index'

export default defineComponent({
  setup  () {
    const demo1 = reactive({
      value1: false,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ]
    })
    const xTip5 = ref({} as VxeTooltipInstance)
    const cellMouseenterEvent = ({ cell }: any) => {
      const $tooltip5 = xTip5.value
      $tooltip5.show(cell, `自定义提示内容：${cell.innerText}`)
    }
    const cellMouseleaveEvent = () => {
      const $tooltip5 = xTip5.value
      $tooltip5.close()
    }
    return {
      demo1,
      xTip5,
      cellMouseenterEvent,
      cellMouseleaveEvent,
      demoCodes: [
        `
        <p>
          <vxe-tooltip content="我是提示内容">
            <a class="link">文字提示</a>
          </vxe-tooltip>
        </p>

        <p>
          <vxe-tooltip content="除了点击之外不会自动消息" trigger="click">
            <vxe-button>点击触发</vxe-button>
          </vxe-tooltip>
          <vxe-tooltip content="hover 提示内容">
            <vxe-button>Hover 触发</vxe-button>
          </vxe-tooltip>
          <vxe-tooltip content="鼠标可以进入到 tooltip 中" enterable>
            <vxe-button>设置 Enterable</vxe-button>
          </vxe-tooltip>
        </p>

        <p>
          <vxe-tooltip v-model="demo1.value1" content="自定义提示内容" trigger="manual">
            <vxe-button @mouseenter="demo1.value1 = true" @mouseleave="demo1.value1 = false">手动模式</vxe-button>
          </vxe-tooltip>
        </p>

        <p>
          <vxe-tooltip ref="xTip1"></vxe-tooltip>
          <vxe-button @mouseenter="$refs.xTip1.show($event.target, '自定义提示内容')" @mouseleave="$refs.xTip1.close()">高性能模式，只创建一个实例</vxe-button>
        </p>

        <p>
          <vxe-tooltip ref="xTip2"></vxe-tooltip>
          <vxe-table
            border
            height="200"
            :tooltip-config="{}"
            :data="demo1.tableData"
            @cell-mouseenter="cellMouseenterEvent"
            @cell-mouseleave="cellMouseleaveEvent">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name"></vxe-column>
            <vxe-column field="sex" title="Sex"></vxe-column>
            <vxe-column field="age" title="Age"></vxe-column>
          </vxe-table>
        </p>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTooltipInstance } from 'vxe-table'

        export default defineComponent({
          setup  () {
            const demo1 = reactive({
              value1: false,
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
              ]
            })
            const xTip5 = ref({} as VxeTooltipInstance)
            const cellMouseenterEvent = ({ cell }: any) => {
              const $tooltip5 = xTip5.value
              $tooltip5.show(cell, \`自定义提示内容：\${cell.innerText}\`)
            }
            const cellMouseleaveEvent = () => {
              const $tooltip5 = xTip5.value
              $tooltip5.close()
            }
            return {
              demo1,
              xTip2,
              cellMouseenterEvent,
              cellMouseleaveEvent
            }
          }
        }
        `
      ]
    }
  }
})
</script>
