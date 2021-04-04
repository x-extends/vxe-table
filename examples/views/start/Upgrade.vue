<template>
  <div>
    <h2>由于 vue 3 的机制改变</h2>
    <p class="tip">
      😘允许未定义属性直接使用
    </p>

    <pre>
      <pre-code class="typescript">{{ demoCodes[0] }}</pre-code>
    </pre>

    <p class="warn">
      😱不支持数组直接改变数据源<br>
      <span class="green">（注：自带 CRUD 功能不受影响，insert、remove ...等用法保持一致）</span>
    </p>

    <pre>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      demoCodes: [
        `
        import { defineComponent, ref } from 'vue'

        const tableData = ref([
          { name: 'test1' },
          { name: 'test2', sex: '1' }
        ])

        // 支持动态定义响应属性
        tableData.value[0].sex = '0'
        `,
        `
        import { defineComponent, ref } from 'vue'

        const tableData = ref([])

        // 将不会被响应 push、splice 等所有方法都将无效
        tableData.value.push({ name: 'test1' })
        // 可以改为
        tableData.value = [...tableData.value, { name: 'test1' }]
        `,
        `
        import { defineComponent, reactive } from 'vue'

        const state = reactive({
          tableData: []
        })

        // 将不会被响应 push、splice 等所有方法都将无效
        state.tableData.push({ name: 'test1' })
        // 可以改为
        state.tableData = [...state.tableData, { name: 'test1' }]
        `
      ]
    }
  }
})
</script>
