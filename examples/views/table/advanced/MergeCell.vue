<template>
  <div>
    <p class="tip">通用的单元格合并<br><span class="red">（注：<table-api-link prop="span-method"/> 合并的逻辑都是自行实现的，该示例仅供参考）</span></p>

    <vxe-table
      border
      resizable
      height="600"
      align="center"
      :span-method="mergeMethod"
      :data="tableData">
      <vxe-table-column field="a" title="A"></vxe-table-column>
      <vxe-table-column field="b" title="B"></vxe-table-column>
      <vxe-table-column field="c" title="C"></vxe-table-column>
      <vxe-table-column field="d" title="D"></vxe-table-column>
      <vxe-table-column field="e" title="E"></vxe-table-column>
      <vxe-table-column field="f" title="F"></vxe-table-column>
      <vxe-table-column field="g" title="G"></vxe-table-column>
      <vxe-table-column field="h" title="H"></vxe-table-column>
      <vxe-table-column field="i" title="I"></vxe-table-column>
      <vxe-table-column field="j" title="J"></vxe-table-column>
      <vxe-table-column field="k" title="K"></vxe-table-column>
      <vxe-table-column field="l" title="L"></vxe-table-column>
      <vxe-table-column field="m" title="M"></vxe-table-column>
      <vxe-table-column field="n" title="N"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      mergeCells: [
        { row: 1, col: 1, rowspan: 3, colspan: 1 },
        { row: 1, col: 2, rowspan: 3, colspan: 1 },
        { row: 1, col: 3, rowspan: 3, colspan: 1 },
        { row: 6, col: 0, rowspan: 1, colspan: 4 },
        { row: 7, col: 0, rowspan: 1, colspan: 4 },
        { row: 8, col: 0, rowspan: 1, colspan: 4 },
        { row: 2, col: 7, rowspan: 2, colspan: 2 },
        { row: 4, col: 6, rowspan: 8, colspan: 4 }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          height="600"
          align="center"
          :span-method="mergeMethod"
          :data="tableData">
          <vxe-table-column field="a" title="A"></vxe-table-column>
          <vxe-table-column field="b" title="B"></vxe-table-column>
          <vxe-table-column field="c" title="C"></vxe-table-column>
          <vxe-table-column field="d" title="D"></vxe-table-column>
          <vxe-table-column field="e" title="E"></vxe-table-column>
          <vxe-table-column field="f" title="F"></vxe-table-column>
          <vxe-table-column field="g" title="G"></vxe-table-column>
          <vxe-table-column field="h" title="H"></vxe-table-column>
          <vxe-table-column field="i" title="I"></vxe-table-column>
          <vxe-table-column field="j" title="J"></vxe-table-column>
          <vxe-table-column field="k" title="K"></vxe-table-column>
          <vxe-table-column field="l" title="L"></vxe-table-column>
          <vxe-table-column field="m" title="M"></vxe-table-column>
          <vxe-table-column field="n" title="N"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              mergeCells: [
                { row: 1, col: 1, rowspan: 3, colspan: 1 },
                { row: 1, col: 2, rowspan: 3, colspan: 1 },
                { row: 1, col: 3, rowspan: 3, colspan: 1 },
                { row: 6, col: 0, rowspan: 1, colspan: 4 },
                { row: 7, col: 0, rowspan: 1, colspan: 4 },
                { row: 8, col: 0, rowspan: 1, colspan: 4 },
                { row: 2, col: 7, rowspan: 2, colspan: 2 },
                { row: 4, col: 6, rowspan: 8, colspan: 4 }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            // 通用单元格合并函数（将指定区域进行合并）
            mergeMethod ({ rowIndex, columnIndex }) {
              const { mergeCells } = this
              for (let mIndex = 0; mIndex < mergeCells.length; mIndex++) {
                const { row, col, rowspan, colspan } = mergeCells[mIndex]
                if (row === rowIndex && col === columnIndex) {
                  return { rowspan, colspan }
                }
                if (rowIndex >= row && rowIndex < row + rowspan && columnIndex >= col && columnIndex < col + colspan) {
                  return { rowspan: 0, colspan: 0 }
                }
              }
              return { rowspan: 1, colspan: 1 }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    const list = []
    for (let index = 0; index < 20; index++) {
      list.push({
        a: 'a' + index,
        b: 'b' + index,
        c: 'c' + index,
        d: 'd' + index,
        e: 'e' + index,
        f: 'f' + index,
        g: 'g' + index,
        h: 'h' + index,
        i: 'i' + index,
        j: 'j' + index,
        k: 'k' + index,
        l: 'l' + index,
        m: 'm' + index,
        n: 'n' + index
      })
    }
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    // 通用单元格合并函数（将指定区域进行合并）
    mergeMethod ({ rowIndex, columnIndex }) {
      const { mergeCells } = this
      for (let mIndex = 0; mIndex < mergeCells.length; mIndex++) {
        const { row, col, rowspan, colspan } = mergeCells[mIndex]
        if (row === rowIndex && col === columnIndex) {
          return { rowspan, colspan }
        }
        if (rowIndex >= row && rowIndex < row + rowspan && columnIndex >= col && columnIndex < col + colspan) {
          return { rowspan: 0, colspan: 0 }
        }
      }
      return { rowspan: 1, colspan: 1 }
    }
  }
}
</script>
