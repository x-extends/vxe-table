<template>
  <div>
    <p class="tip">通过设置 <table-api-link prop="resizable"/> 属性启用列宽拖动功能</p>

    <vxe-table
      resizable
      :data="demo1.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="time" title="Time"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">横向滚动条</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      :data="demo2.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">固定左列宽拖动（固定左不允许超过表格右边距）</p>

    <vxe-table
      border
      resizable
      :data="demo3.tableData">
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
      <vxe-table-column field="atrr2" title="atrr2" width="200"></vxe-table-column>
      <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
      <vxe-table-column field="atrr4" title="atrr4" width="200"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">固定右列宽拖动（固定右不允许超过表格左边距）</p>

    <vxe-table
      border
      resizable
      :data="demo4.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="200"></vxe-table-column>
      <vxe-table-column field="attr7" title="Attr7" width="200"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="200"></vxe-table-column>
      <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
      <vxe-table-column field="atrr2" title="atrr2" width="200"></vxe-table-column>
      <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
      <vxe-table-column field="atrr4" title="atrr4" width="200"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="100" fixed="right"></vxe-table-column>
      <vxe-table-column field="atrr6" title="Atrr6" width="100" fixed="right"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="100" fixed="right"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[7] }}</pre-code>
    </pre>

    <p class="tip">左右固定列宽拖动（固定左不允许超过固定右，固定右不允许超过固定左）</p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="demo5.tableData">
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
      <vxe-table-column field="atrr2" title="atrr2 其他2" width="200"></vxe-table-column>
      <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
      <vxe-table-column field="atrr4" title="atrr4 其他4" width="200"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="100" fixed="right"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="100" fixed="right"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="100" fixed="right"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[8] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[9] }}</pre-code>
    </pre>

    <p class="tip">分组表头拖动（只允许列拖动，不允许分组标题拖动）</p>

    <vxe-table
      border
      resizable
      :data="demo6.tableData">
      <vxe-table-colgroup title="基本信息">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="更多信息">
        <vxe-table-column field="role" title="Role"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-colgroup title="详细信息">
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="140" show-overflow></vxe-table-column>
        </vxe-table-colgroup>
      </vxe-table-colgroup>
      <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[10] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[11] }}</pre-code>
    </pre>

    <p class="tip">左右固定列的分组表头拖动（只允许列拖动，不允许分组标题拖动）</p>

    <vxe-table
      border
      resizable
      :data="demo7.tableData">
      <vxe-table-colgroup title="基本信息" fixed="left">
        <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
        <vxe-table-column field="name" title="Name" fixed="left" width="100"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="更多信息">
        <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
        <vxe-table-column field="attr1" title="Attr1" width="300"></vxe-table-column>
        <vxe-table-colgroup title="详细信息">
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
        </vxe-table-colgroup>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="其他信息" fixed="right">
        <vxe-table-column field="age" title="Age" width="100" fixed="right" show-overflow></vxe-table-column>
        <vxe-table-column field="address" title="Address" width="100" fixed="right" show-overflow></vxe-table-column>
      </vxe-table-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[12] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[13] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' }
      ]
    })
    return {
      demo1,
      demo2: demo1,
      demo3: demo1,
      demo4: demo1,
      demo5: demo1,
      demo6: demo1,
      demo7: demo1,
      demoCodes: [
        `
        <vxe-table
          resizable
          :data="demo1.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="time" title="Time"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' }
              ]
            })
            return {
              demo1
            }
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          :data="demo2.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' }
              ]
            })
            return {
              demo2
            }
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          :data="demo3.tableData">
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
          <vxe-table-column field="atrr2" title="atrr2" width="200"></vxe-table-column>
          <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
          <vxe-table-column field="atrr4" title="atrr4" width="200"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo3 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' }
              ]
            })
            return {
              demo3
            }
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          :data="demo4.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="200"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="200"></vxe-table-column>
          <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
          <vxe-table-column field="atrr2" title="atrr2" width="200"></vxe-table-column>
          <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
          <vxe-table-column field="atrr4" title="atrr4" width="200"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="100" fixed="right"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="100" fixed="right"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="100" fixed="right"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo4 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' }
              ]
            })
            return {
              demo4
            }
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="demo5.tableData">
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
          <vxe-table-column field="atrr2" title="atrr2 其他2" width="200"></vxe-table-column>
          <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
          <vxe-table-column field="atrr4" title="atrr4 其他4" width="200"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="100" fixed="right"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="100" fixed="right"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="100" fixed="right"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo5 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' }
              ]
            })
            return {
              demo5
            }
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          :data="demo6.tableData">
          <vxe-table-colgroup title="基本信息">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="更多信息">
            <vxe-table-column field="role" title="Role"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-colgroup title="详细信息">
              <vxe-table-column field="sex" title="Sex"></vxe-table-column>
              <vxe-table-column field="date" title="Date" width="140" show-overflow></vxe-table-column>
            </vxe-table-colgroup>
          </vxe-table-colgroup>
          <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo6 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' }
              ]
            })
            return {
              demo6
            }
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          :data="demo7.tableData">
          <vxe-table-colgroup title="基本信息" fixed="left">
            <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column field="name" title="Name" fixed="left" width="100"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="更多信息">
            <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
            <vxe-table-column field="attr1" title="Attr1" width="300"></vxe-table-column>
            <vxe-table-colgroup title="详细信息">
              <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
              <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
            </vxe-table-colgroup>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="其他信息" fixed="right">
            <vxe-table-column field="age" title="Age" width="100" fixed="right" show-overflow></vxe-table-column>
            <vxe-table-column field="address" title="Address" width="100" fixed="right" show-overflow></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo7 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' }
              ]
            })
            return {
              demo7
            }
          }
        })
        `
      ]
    }
  }
})
</script>
