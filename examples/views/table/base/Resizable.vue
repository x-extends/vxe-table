<template>
  <div>
    <p class="tip">通过设置 <table-api-link prop="resizable"/> 属性启用列宽拖动功能</p>

    <vxe-table
      resizable
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="time" title="Time"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">横向滚动条</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">固定左列宽拖动（固定左不允许超过表格右边距）</p>

    <vxe-table
      border
      resizable
      :data="tableData">
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
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>

    <p class="tip">固定右列宽拖动（固定右不允许超过表格左边距）</p>

    <vxe-table
      border
      resizable
      :data="tableData">
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
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>

    <p class="tip">左右固定列宽拖动（固定左不允许超过固定右，固定右不允许超过固定左）</p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData">
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
      <code class="xml">{{ demoCodes[8] }}</code>
      <code class="javascript">{{ demoCodes[9] }}</code>
    </pre>

    <p class="tip">分组表头拖动（只允许列拖动，不允许分组标题拖动）</p>

    <vxe-table
      border
      resizable
      :data="tableData">
      <vxe-table-column title="基本信息">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="更多信息">
        <vxe-table-column field="role" title="Role"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="140" show-overflow></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[10] }}</code>
      <code class="javascript">{{ demoCodes[11] }}</code>
    </pre>

    <p class="tip">左右固定列的分组表头拖动（只允许列拖动，不允许分组标题拖动）</p>

    <vxe-table
      border
      resizable
      :data="tableData">
      <vxe-table-column title="基本信息" fixed="left">
        <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
        <vxe-table-column field="name" title="Name" fixed="left" width="100"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="更多信息">
        <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
        <vxe-table-column field="attr1" title="Attr1" width="300"></vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="其他信息" fixed="right">
        <vxe-table-column field="age" title="Age" width="100" fixed="right" show-overflow></vxe-table-column>
        <vxe-table-column field="address" title="Address" width="100" fixed="right" show-overflow></vxe-table-column>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[12] }}</code>
      <code class="javascript">{{ demoCodes[13] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
      ],
      demoCodes: [
        `
        <vxe-table
          resizable
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="time" title="Time"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          :data="tableData">
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
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          :data="tableData">
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
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData">
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
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          :data="tableData">
          <vxe-table-column title="基本信息">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="更多信息">
            <vxe-table-column field="role" title="Role"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="sex" title="Sex"></vxe-table-column>
              <vxe-table-column field="date" title="Date" width="140" show-overflow></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          :data="tableData">
          <vxe-table-column title="基本信息" fixed="left">
            <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column field="name" title="Name" fixed="left" width="100"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="更多信息">
            <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
            <vxe-table-column field="attr1" title="Attr1" width="300"></vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
              <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="其他信息" fixed="right">
            <vxe-table-column field="age" title="Age" width="100" fixed="right" show-overflow></vxe-table-column>
            <vxe-table-column field="address" title="Address" width="100" fixed="right" show-overflow></vxe-table-column>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
