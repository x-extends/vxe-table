<template>
  <div>
    <p class="tip">支持多种数据格式：默认标准结构、深层结构、二维数组</p>

    <vxe-table
      :data="tableData1">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="content" title="Html" type="html" show-overflow></vxe-table-column>
      <vxe-table-column field="role" title="Role" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">深层结构，可用于带有复杂结构的场景<span class="red">（缺点深层级数据类型必须先定义，深层结构将影响性能，具体取决于数据量大小）</span></p>

    <vxe-table
      :data="tableData2">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="userInfo.name" title="Name"></vxe-table-column>
      <vxe-table-column field="other[0].sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="userInfo.age" title="Age"></vxe-table-column>
      <vxe-table-column field="other[1].more.content" title="Html" type="html" show-overflow></vxe-table-column>
      <vxe-table-column field="role" title="Role" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">二维数组结构，适用场景较少<span class="red">（缺点局限性比较大，需要手动指定 <table-api-link prop="row-id"/> 唯一主键）</span></p>

    <vxe-table
      row-id="0"
      :data="tableData3">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="1" title="Name"></vxe-table-column>
      <vxe-table-column field="2" title="Sex"></vxe-table-column>
      <vxe-table-column field="3" title="Age"></vxe-table-column>
      <vxe-table-column field="4" title="Html" type="html" show-overflow></vxe-table-column>
      <vxe-table-column field="5" title="Role" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData1: [
        { name: 'Test2', age: 28, sex: '男', role: '后端', content: '<img height="40" src="static/other/img1.gif">' },
        { name: 'Test4', age: 26, sex: '男', role: '前端', content: '<a href="https://github.com/x-extends/vxe-table">我是链接</a>' },
        { name: 'Test3', age: 20, sex: '女', role: '程序员鼓励师', content: '<img height="40" src="static/other/img2.gif">' },
        { name: 'Test1', age: 22, sex: '女', role: '设计师', content: '<div><span style="color: red">在线观看.avi</span></div>' }
      ],
      tableData2: [
        {
          userInfo: { name: 'Test1', age: 22 },
          other: [
            { sex: '女' },
            { more: { content: '<div><span style="color: red">在线观看.avi</span></div>' } }
          ],
          role: '设计师'
        },
        {
          userInfo: { name: 'Test2', age: 28 },
          other: [
            { sex: '男' },
            { more: { content: '<img height="40" src="static/other/img1.gif">' } }
          ],
          role: '后端'
        },
        {
          userInfo: { name: 'Test3', age: 20 },
          other: [
            { sex: '女' },
            { more: { content: '<img height="40" src="static/other/img2.gif">' } }
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
      ],
      tableData3: [
        [101, 'Test4', '男', 26, '<a href="https://github.com/x-extends/vxe-table">我是链接</a>', '前端'],
        [102, 'Test2', '男', 28, '<img height="40" src="static/other/img1.gif">', '后端'],
        [103, 'Test1', '女', 22, '<div><span style="color: red">在线观看.avi</span></div>', '设计师'],
        [104, 'Test3', '女', 20, '<img height="40" src="static/other/img2.gif">', '程序员鼓励师']
      ],
      demoCodes: [
        `
        <vxe-table
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="content" title="Html" type="html" show-overflow></vxe-table-column>
          <vxe-table-column field="role" title="Role" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { name: 'Test2', age: 28, sex: '男', role: '后端', content: '<img height="40" src="static/other/img1.gif">' },
                { name: 'Test4', age: 26, sex: '男', role: '前端', content: '<a href="https://github.com/x-extends/vxe-table">我是链接</a>' },
                { name: 'Test3', age: 20, sex: '女', role: '程序员鼓励师', content: '<img height="40" src="static/other/img2.gif">' },
                { name: 'Test1', age: 22, sex: '女', role: '设计师', content: '<div><span style="color: red">在线观看.avi</span></div>' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="userInfo.name" title="Name"></vxe-table-column>
          <vxe-table-column field="other[0].sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="userInfo.age" title="Age"></vxe-table-column>
          <vxe-table-column field="other[1].more.content" title="Html" type="html" show-overflow></vxe-table-column>
          <vxe-table-column field="role" title="Role" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                {
                  userInfo: { name: 'Test1', age: 22 },
                  other: [
                    { sex: '女' },
                    { more: { content: '<div><span style="color: red">在线观看.avi</span></div>' } }
                  ],
                  role: '设计师'
                },
                {
                  userInfo: { name: 'Test2', age: 28 },
                  other: [
                    { sex: '男' },
                    { more: { content: '<img height="40" src="static/other/img1.gif">' } }
                  ],
                  role: '后端'
                },
                {
                  userInfo: { name: 'Test3', age: 20 },
                  other: [
                    { sex: '女' },
                    { more: { content: '<img height="40" src="static/other/img2.gif">' } }
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
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          row-id="0"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="1" title="Name"></vxe-table-column>
          <vxe-table-column field="2" title="Sex"></vxe-table-column>
          <vxe-table-column field="3" title="Age"></vxe-table-column>
          <vxe-table-column field="4" title="Html" type="html" show-overflow></vxe-table-column>
          <vxe-table-column field="5" title="Role" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                [101, 'Test4', '男', 26, '<a href="https://github.com/x-extends/vxe-table">我是链接</a>', '前端'],
                [102, 'Test2', '男', 28, '<img height="40" src="static/other/img1.gif">', '后端'],
                [103, 'Test1', '女', 22, '<div><span style="color: red">在线观看.avi</span></div>', '设计师'],
                [104, 'Test3', '女', 20, '<img height="40" src="static/other/img2.gif">', '程序员鼓励师']
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
