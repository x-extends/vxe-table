<template>
  <div>
    <p class="tip">支持多种数据格式：默认标准结构、深层结构、二维数组</p>

    <vxe-table
      :data="tableData1">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="content" title="Html" type="html" show-overflow></vxe-column>
      <vxe-column field="role" title="Role" show-overflow></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">深层结构，可用于带有复杂结构的场景<span class="red">（缺点深层级数据类型必须先定义，深层结构将影响性能，具体取决于数据量大小）</span></p>

    <vxe-table
      :data="tableData2">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="userInfo.name" title="Name"></vxe-column>
      <vxe-column field="other[0].sex" title="Sex"></vxe-column>
      <vxe-column field="userInfo.age" title="Age"></vxe-column>
      <vxe-column field="other[1].more.content" title="Html" type="html" show-overflow></vxe-column>
      <vxe-column field="role" title="Role" show-overflow></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">二维数组结构，适用场景较少<span class="red">（缺点局限性比较大，需要手动指定 <table-api-link prop="row-id"/> 唯一主键）</span></p>

    <vxe-table
      :row-config="{keyField: '0'}"
      :data="tableData3">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="1" title="Name"></vxe-column>
      <vxe-column field="2" title="Sex"></vxe-column>
      <vxe-column field="3" title="Age"></vxe-column>
      <vxe-column field="4" title="Html" type="html" show-overflow></vxe-column>
      <vxe-column field="5" title="Role" show-overflow></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const tableData1 = ref([
      { name: 'Test2', age: 28, sex: '男', role: '后端', content: '<img height="40" src="/vxe-table/static/other/img1.gif">' },
      { name: 'Test4', age: 26, sex: '男', role: '前端', content: '<a href="https://github.com/x-extends/vxe-table">我是链接</a>' },
      { name: 'Test3', age: 20, sex: '女', role: '程序员鼓励师', content: '<img height="40" src="/vxe-table/static/other/img2.gif">' },
      { name: 'Test1', age: 22, sex: '女', role: '设计师', content: '<div><span style="color: red">我是 Htmp 片段</span></div>' }
    ])

    const tableData2 = ref([
      {
        userInfo: { name: 'Test1', age: 22 },
        other: [
          { sex: '女' },
          { more: { content: '<div><span style="color: red">我是 Htmp 片段</span></div>' } }
        ],
        role: '设计师'
      },
      {
        userInfo: { name: 'Test2', age: 28 },
        other: [
          { sex: '男' },
          { more: { content: '<img height="40" src="/vxe-table/static/other/img1.gif">' } }
        ],
        role: '后端'
      },
      {
        userInfo: { name: 'Test3', age: 20 },
        other: [
          { sex: '女' },
          { more: { content: '<img height="40" src="/vxe-table/static/other/img2.gif">' } }
        ],
        role: '程序员鼓励师'
      },
      {
        userInfo: { name: 'Test4', age: 26 },
        other: [
          { sex: '男' },
          { more: { content: '<a href="https://github.com/x-extends/vxe-table">我是链接</a>' } }
        ],
        role: '前端'
      }
    ])

    const tableData3 = ref([
      [101, 'Test4', '男', 26, '<a href="https://github.com/x-extends/vxe-table">我是链接</a>', '前端'],
      [102, 'Test2', '男', 28, '<img height="40" src="/vxe-table/static/other/img1.gif">', '后端'],
      [103, 'Test1', '女', 22, '<div><span style="color: red">我是 Htmp 片段</span></div>', '设计师'],
      [104, 'Test3', '女', 20, '<img height="40" src="/vxe-table/static/other/img2.gif">', '程序员鼓励师']
    ])

    return {
      tableData1,
      tableData2,
      tableData3,
      demoCodes: [
        `
        <vxe-table
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
          <vxe-column field="content" title="Html" type="html" show-overflow></vxe-column>
          <vxe-column field="role" title="Role" show-overflow></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData1 = ref([
              { name: 'Test2', age: 28, sex: '男', role: '后端', content: '<img height="40" src="/vxe-table/static/other/img1.gif">' },
              { name: 'Test4', age: 26, sex: '男', role: '前端', content: '<a href="https://github.com/x-extends/vxe-table">我是链接</a>' },
              { name: 'Test3', age: 20, sex: '女', role: '程序员鼓励师', content: '<img height="40" src="/vxe-table/static/other/img2.gif">' },
              { name: 'Test1', age: 22, sex: '女', role: '设计师', content: '<div><span style="color: red">我是 Htmp 片段</span></div>' }
            ])

            return {
              tableData1
            }
          }
        })
        `,
        `
        <vxe-table
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="userInfo.name" title="Name"></vxe-column>
          <vxe-column field="other[0].sex" title="Sex"></vxe-column>
          <vxe-column field="userInfo.age" title="Age"></vxe-column>
          <vxe-column field="other[1].more.content" title="Html" type="html" show-overflow></vxe-column>
          <vxe-column field="role" title="Role" show-overflow></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData2 = ref([
              {
                userInfo: { name: 'Test1', age: 22 },
                other: [
                  { sex: '女' },
                  { more: { content: '<div><span style="color: red">我是 Htmp 片段</span></div>' } }
                ],
                role: '设计师'
              },
              {
                userInfo: { name: 'Test2', age: 28 },
                other: [
                  { sex: '男' },
                  { more: { content: '<img height="40" src="/vxe-table/static/other/img1.gif">' } }
                ],
                role: '后端'
              },
              {
                userInfo: { name: 'Test3', age: 20 },
                other: [
                  { sex: '女' },
                  { more: { content: '<img height="40" src="/vxe-table/static/other/img2.gif">' } }
                ],
                role: '程序员鼓励师'
              },
              {
                userInfo: { name: 'Test4', age: 26 },
                other: [
                  { sex: '男' },
                  { more: { content: '<a href="https://github.com/x-extends/vxe-table">我是链接</a>' } }
                ],
                role: '前端'
              }
            ])

            return {
              tableData2
            }
          }
        })
        `,
        `
        <vxe-table
          row-id="0"
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="1" title="Name"></vxe-column>
          <vxe-column field="2" title="Sex"></vxe-column>
          <vxe-column field="3" title="Age"></vxe-column>
          <vxe-column field="4" title="Html" type="html" show-overflow></vxe-column>
          <vxe-column field="5" title="Role" show-overflow></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData3 = ref([
              [101, 'Test4', '男', 26, '<a href="https://github.com/x-extends/vxe-table">我是链接</a>', '前端'],
              [102, 'Test2', '男', 28, '<img height="40" src="/vxe-table/static/other/img1.gif">', '后端'],
              [103, 'Test1', '女', 22, '<div><span style="color: red">我是 Htmp 片段</span></div>', '设计师'],
              [104, 'Test3', '女', 20, '<img height="40" src="/vxe-table/static/other/img2.gif">', '程序员鼓励师']
            ])

            return {
              tableData3
            }
          }
        })
        `
      ]
    }
  }
})
</script>
