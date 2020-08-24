<template>
  <div>
    <p class="tip">
      单元格与表尾数据合并，可以通过绑定参数 <table-api-link prop="merge-cells"/> 或调用函数 <table-api-link prop="setMergeCells"/>、<table-api-link prop="setMergeCells"/> 来控制单元格的临时合并状态<br>
      <span class="red">（注意：合并数据属于临时行为，例如：操作数据源、显示隐藏列、固定列...等操作都会导致合并状态被取消）</span>
    </p>

    <vxe-table
      border
      resizable
      show-footer
      ref="xTable"
      height="800"
      align="center"
      :column-config="{width: 90}"
      :merge-cells="mergeCells"
      :merge-footer-items="mergeFooterItems"
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-table-column field="a" title="名称"></vxe-table-column>
      <vxe-table-column field="b" title="教育经费投入">
        <vxe-table-column field="c" title="总计"></vxe-table-column>
        <vxe-table-column title="基本投入">
          <vxe-table-column title="合计">
            <vxe-table-column field="d" title="合计"></vxe-table-column>
            <vxe-table-column field="e" title="比上年增长"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="f" title="人员经费"></vxe-table-column>
          <vxe-table-column field="g" title="公用经费"></vxe-table-column>
          <vxe-table-column title="其他经费">
            <vxe-table-column field="w" title="合计"></vxe-table-column>
            <vxe-table-column title="其中">
              <vxe-table-column field="h" title="标准化建设"></vxe-table-column>
              <vxe-table-column field="i" title="信息化建设"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
        </vxe-table-column>
        <vxe-table-column field="j" title="附加信息"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="其他投入">
        <vxe-table-column title="投入">
          <vxe-table-column field="k" title="合计"></vxe-table-column>
          <vxe-table-column title="其中">
            <vxe-table-column field="l" title="人员经费"></vxe-table-column>
            <vxe-table-column field="m" title="教育经费"></vxe-table-column>
            <vxe-table-column field="n" title="项目经费"></vxe-table-column>
            <vxe-table-column field="o" title="基建投入"></vxe-table-column>
          </vxe-table-column>
        </vxe-table-column>
        <vxe-table-column title="社会捐款">
          <vxe-table-column field="p" title="合计"></vxe-table-column>
          <vxe-table-column title="其中">
            <vxe-table-column field="q" title="项目经费"></vxe-table-column>
            <vxe-table-column field="r" title="基建投入"></vxe-table-column>
          </vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="补充资料">
        <vxe-table-column title="信息化建设">
          <vxe-table-column field="s" title="本年投入金额"></vxe-table-column>
          <vxe-table-column title="其中">
            <vxe-table-column field="t" title="合计"></vxe-table-column>
            <vxe-table-column field="u" title="建设数"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="v" title="备注"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
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
        { row: 0, col: 0, rowspan: 2, colspan: 1 },
        { row: 0, col: 1, rowspan: 2, colspan: 1 },
        { row: 0, col: 2, rowspan: 2, colspan: 1 },
        { row: 0, col: 3, rowspan: 2, colspan: 1 },
        { row: 0, col: 4, rowspan: 2, colspan: 1 },
        { row: 0, col: 5, rowspan: 2, colspan: 1 },
        { row: 0, col: 6, rowspan: 2, colspan: 1 },
        { row: 0, col: 7, rowspan: 2, colspan: 1 },
        { row: 0, col: 8, rowspan: 2, colspan: 1 },
        { row: 0, col: 9, rowspan: 2, colspan: 1 },
        { row: 0, col: 15, rowspan: 10, colspan: 1 },
        { row: 0, col: 16, rowspan: 10, colspan: 1 },
        { row: 0, col: 18, rowspan: 2, colspan: 1 },
        { row: 0, col: 19, rowspan: 2, colspan: 1 },
        { row: 0, col: 20, rowspan: 2, colspan: 1 },
        { row: 0, col: 21, rowspan: 2, colspan: 1 },
        { row: 1, col: 11, rowspan: 1, colspan: 4 },

        { row: 2, col: 0, rowspan: 4, colspan: 2 },
        { row: 2, col: 2, rowspan: 4, colspan: 1 },
        { row: 2, col: 3, rowspan: 4, colspan: 1 },
        { row: 2, col: 6, rowspan: 4, colspan: 1 },
        { row: 2, col: 7, rowspan: 4, colspan: 1 },
        { row: 2, col: 8, rowspan: 4, colspan: 1 },
        { row: 2, col: 9, rowspan: 4, colspan: 1 },
        { row: 2, col: 17, rowspan: 4, colspan: 1 },
        { row: 2, col: 18, rowspan: 3, colspan: 1 },
        { row: 2, col: 19, rowspan: 3, colspan: 1 },
        { row: 2, col: 20, rowspan: 3, colspan: 2 },
        { row: 3, col: 4, rowspan: 2, colspan: 2 },
        { row: 4, col: 11, rowspan: 2, colspan: 4 },
        { row: 5, col: 18, rowspan: 1, colspan: 4 },

        { row: 6, col: 0, rowspan: 3, colspan: 1 },
        { row: 6, col: 1, rowspan: 3, colspan: 1 },
        { row: 6, col: 4, rowspan: 3, colspan: 1 },
        { row: 6, col: 5, rowspan: 3, colspan: 1 },
        { row: 6, col: 6, rowspan: 3, colspan: 1 },
        { row: 6, col: 7, rowspan: 3, colspan: 1 },
        { row: 6, col: 8, rowspan: 3, colspan: 1 },
        { row: 6, col: 9, rowspan: 3, colspan: 1 },
        { row: 6, col: 18, rowspan: 3, colspan: 1 },
        { row: 6, col: 19, rowspan: 3, colspan: 1 },
        { row: 6, col: 20, rowspan: 3, colspan: 1 },
        { row: 6, col: 21, rowspan: 3, colspan: 1 },
        { row: 6, col: 2, rowspan: 1, colspan: 2 },
        { row: 8, col: 2, rowspan: 1, colspan: 2 },
        { row: 9, col: 0, rowspan: 1, colspan: 15 },

        { row: 11, col: 5, rowspan: 4, colspan: 12 }
      ],
      mergeFooterItems: [
        { row: 0, col: 1, rowspan: 1, colspan: 2 },
        { row: 0, col: 6, rowspan: 1, colspan: 2 },
        { row: 0, col: 14, rowspan: 2, colspan: 5 },
        { row: 1, col: 4, rowspan: 1, colspan: 8 }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-footer
          ref="xTable"
          height="800"
          align="center"
          :column-config="{width: 90}"
          :merge-cells="mergeCells"
          :merge-footer-items="mergeFooterItems"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-table-column field="a" title="名称"></vxe-table-column>
          <vxe-table-column field="b" title="教育经费投入">
            <vxe-table-column field="c" title="总计"></vxe-table-column>
            <vxe-table-column title="基本投入">
              <vxe-table-column title="合计">
                <vxe-table-column field="d" title="合计"></vxe-table-column>
                <vxe-table-column field="e" title="比上年增长"></vxe-table-column>
              </vxe-table-column>
              <vxe-table-column field="f" title="人员经费"></vxe-table-column>
              <vxe-table-column field="g" title="公用经费"></vxe-table-column>
              <vxe-table-column title="其他经费">
                <vxe-table-column field="w" title="合计"></vxe-table-column>
                <vxe-table-column title="其中">
                  <vxe-table-column field="h" title="标准化建设"></vxe-table-column>
                  <vxe-table-column field="i" title="信息化建设"></vxe-table-column>
                </vxe-table-column>
              </vxe-table-column>
            </vxe-table-column>
            <vxe-table-column field="j" title="附加信息"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="其他投入">
            <vxe-table-column title="投入">
              <vxe-table-column field="k" title="合计"></vxe-table-column>
              <vxe-table-column title="其中">
                <vxe-table-column field="l" title="人员经费"></vxe-table-column>
                <vxe-table-column field="m" title="教育经费"></vxe-table-column>
                <vxe-table-column field="n" title="项目经费"></vxe-table-column>
                <vxe-table-column field="o" title="基建投入"></vxe-table-column>
              </vxe-table-column>
            </vxe-table-column>
            <vxe-table-column title="社会捐款">
              <vxe-table-column field="p" title="合计"></vxe-table-column>
              <vxe-table-column title="其中">
                <vxe-table-column field="q" title="项目经费"></vxe-table-column>
                <vxe-table-column field="r" title="基建投入"></vxe-table-column>
              </vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="补充资料">
            <vxe-table-column title="信息化建设">
              <vxe-table-column field="s" title="本年投入金额"></vxe-table-column>
              <vxe-table-column title="其中">
                <vxe-table-column field="t" title="合计"></vxe-table-column>
                <vxe-table-column field="u" title="建设数"></vxe-table-column>
              </vxe-table-column>
              <vxe-table-column field="v" title="备注"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              mergeCells: [
                { row: 0, col: 0, rowspan: 2, colspan: 1 },
                { row: 0, col: 1, rowspan: 2, colspan: 1 },
                { row: 0, col: 2, rowspan: 2, colspan: 1 },
                { row: 0, col: 3, rowspan: 2, colspan: 1 },
                { row: 0, col: 4, rowspan: 2, colspan: 1 },
                { row: 0, col: 5, rowspan: 2, colspan: 1 },
                { row: 0, col: 6, rowspan: 2, colspan: 1 },
                { row: 0, col: 7, rowspan: 2, colspan: 1 },
                { row: 0, col: 8, rowspan: 2, colspan: 1 },
                { row: 0, col: 9, rowspan: 2, colspan: 1 },
                { row: 0, col: 15, rowspan: 10, colspan: 1 },
                { row: 0, col: 16, rowspan: 10, colspan: 1 },
                { row: 0, col: 18, rowspan: 2, colspan: 1 },
                { row: 0, col: 19, rowspan: 2, colspan: 1 },
                { row: 0, col: 20, rowspan: 2, colspan: 1 },
                { row: 0, col: 21, rowspan: 2, colspan: 1 },
                { row: 1, col: 11, rowspan: 1, colspan: 4 },

                { row: 2, col: 0, rowspan: 4, colspan: 2 },
                { row: 2, col: 2, rowspan: 4, colspan: 1 },
                { row: 2, col: 3, rowspan: 4, colspan: 1 },
                { row: 2, col: 6, rowspan: 4, colspan: 1 },
                { row: 2, col: 7, rowspan: 4, colspan: 1 },
                { row: 2, col: 8, rowspan: 4, colspan: 1 },
                { row: 2, col: 9, rowspan: 4, colspan: 1 },
                { row: 2, col: 17, rowspan: 4, colspan: 1 },
                { row: 2, col: 18, rowspan: 3, colspan: 1 },
                { row: 2, col: 19, rowspan: 3, colspan: 1 },
                { row: 2, col: 20, rowspan: 3, colspan: 2 },
                { row: 3, col: 4, rowspan: 2, colspan: 2 },
                { row: 4, col: 11, rowspan: 2, colspan: 4 },
                { row: 5, col: 18, rowspan: 1, colspan: 4 },

                { row: 6, col: 0, rowspan: 3, colspan: 1 },
                { row: 6, col: 1, rowspan: 3, colspan: 1 },
                { row: 6, col: 4, rowspan: 3, colspan: 1 },
                { row: 6, col: 5, rowspan: 3, colspan: 1 },
                { row: 6, col: 6, rowspan: 3, colspan: 1 },
                { row: 6, col: 7, rowspan: 3, colspan: 1 },
                { row: 6, col: 8, rowspan: 3, colspan: 1 },
                { row: 6, col: 9, rowspan: 3, colspan: 1 },
                { row: 6, col: 18, rowspan: 3, colspan: 1 },
                { row: 6, col: 19, rowspan: 3, colspan: 1 },
                { row: 6, col: 20, rowspan: 3, colspan: 1 },
                { row: 6, col: 21, rowspan: 3, colspan: 1 },
                { row: 6, col: 2, rowspan: 1, colspan: 2 },
                { row: 8, col: 2, rowspan: 1, colspan: 2 },
                { row: 9, col: 0, rowspan: 1, colspan: 15 },

                { row: 11, col: 5, rowspan: 4, colspan: 12 }
              ],
              mergeFooterItems: [
                { row: 0, col: 1, rowspan: 1, colspan: 2 },
                { row: 0, col: 6, rowspan: 1, colspan: 2 },
                { row: 0, col: 14, rowspan: 2, colspan: 5 },
                { row: 1, col: 4, rowspan: 1, colspan: 8 }
              ]
            }
          },
          created () {
            const list = []
            for (let index = 0; index < 15; index++) {
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
                n: 'n' + index,
                o: 'o' + index,
                p: 'p' + index,
                q: 'q' + index,
                r: 'r' + index,
                s: 's' + index,
                t: 't' + index,
                u: 'u' + index,
                v: 'v' + index,
                w: 'w' + index
              })
            }
            this.tableData = list
          },
          methods: {
            footerMethod ({ columns }) {
              return [
                columns.map((column, index) => index),
                columns.map((column, index) => 1000 + index)
              ]
            }
          }
        }
        `
      ]
    }
  },
  created () {
    const list = []
    for (let index = 0; index < 15; index++) {
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
        n: 'n' + index,
        o: 'o' + index,
        p: 'p' + index,
        q: 'q' + index,
        r: 'r' + index,
        s: 's' + index,
        t: 't' + index,
        u: 'u' + index,
        v: 'v' + index,
        w: 'w' + index
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
    footerMethod ({ columns }) {
      return [
        columns.map((column, index) => index),
        columns.map((column, index) => 1000 + index)
      ]
    }
  }
}
</script>
