<template>
  <div>
    <p class="tip">具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-renderer" target="_blank">vxe-table-plugin-renderer</a> 插件的 API</p>

    <vxe-grid
      border
      show-overflow
      height="400"
      :loading="loading"
      :data="tableData"
      :columns="tableColumn"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: [
        { id: 101, name: 'test1', num1: 30, num2: 60, num3: [47, 67, 100], num4: [60, 28, 26] },
        { id: 102, name: 'test2', num1: 15, num2: 85, num3: [60, 83, 87], num4: [28, 60, 32] },
        { id: 103, name: 'test3', num1: 75, num2: 45, num3: [84, 11, 44], num4: [100, 17, 39] },
        { id: 104, name: 'test4', num1: 50, num2: 0, num3: [25, 71, 26], num4: [19, 76, 99] },
        { id: 105, name: 'test5', num1: 44, num2: 72, num3: [100, 29, 65], num4: [35, 63, 100] },
        { id: 106, name: 'test6', num1: 100, num2: 50, num3: [66, 100, 88], num4: [13, 57, 60] },
        { id: 107, name: 'test7', num1: 69, num2: 16, num3: [60, 0, 10], num4: [60, 40, 0] },
        { id: 108, name: 'test8', num1: 0, num2: 24, num3: [55, 76, 86], num4: [46, 71, 83] },
        { id: 109, name: 'test9', num1: 98, num2: 88, num3: [97, 60, 1], num4: [55, 33, 53] },
        { id: 1010, name: 'test10', num1: 81, num2: 100, num3: [17, 31, 2], num4: [77, 100, 58] }
      ],
      tableColumn: [
        { type: 'checkbox', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'num1', title: '进度条', width: 200, cellRender: { name: 'ProgressBar' } },
        {
          field: 'num3',
          title: '多个进度条',
          width: 200,
          cellRender: {
            name: 'ProgressBars',
            children: [
              { props: { lineWidth: 12 } },
              { props: { lineWidth: 12 } },
              { props: { lineWidth: 12 } }
            ]
          }
        },
        { field: 'num2', title: '环形条', width: 100, cellRender: { name: 'ProgressRing', props: { lineColor: '#C23531' } } },
        {
          field: 'num4',
          title: '多个环形条',
          width: 200,
          cellRender: {
            name: 'ProgressRings',
            children: [
              { props: { lineColor: '#D48265' } },
              { props: { lineColor: '#FFDB5C' } },
              { props: { lineColor: '#BDA29A' } }
            ]
          }
        }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          show-overflow
          height="400"
          :loading="loading"
          :data="tableData"
          :columns="tableColumn"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [
                { id: 100, name: 'test1', num1: 30, num2: 60 },
                { id: 101, name: 'test2', num1: 15, num2: 85 },
                { id: 102, name: 'test3', num1: 75, num2: 45 }
              ],
              tableColumn: [
                { type: 'checkbox', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'num1', title: '进度条', width: 260, cellRender: { name: 'ProgressBar' } },
                { field: 'num2', title: '环形进度条', width: 120, cellRender: { name: 'ProgressRing' } }
              ]
            }
          }
        }
        `
      ]
    }
  }
}
</script>
