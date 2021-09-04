<template>
  <div>
    <p class="tip">
      单元格与表尾数据合并，可以通过绑定参数 <table-api-link prop="merge-cells"/> 或调用函数 <table-api-link prop="setMergeCells"/>、<table-api-link prop="setMergeCells"/> 来控制单元格的临时合并状态<br>
      <span class="red">（注意：合并数据属于临时行为，例如：操作数据源、显示隐藏列、固定列...等操作都会导致合并状态被取消）</span>
    </p>

    <vxe-toolbar ref="xToolbar" print></vxe-toolbar>

    <vxe-table
      border
      resizable
      show-footer
      ref="xTable"
      height="800"
      align="center"
      :print-config="{}"
      :column-config="{width: 90}"
      :merge-cells="mergeCells"
      :merge-footer-items="mergeFooterItems"
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-column field="a" title="名称"></vxe-column>
      <vxe-colgroup field="b" title="教育经费投入">
        <vxe-column field="c" title="总计"></vxe-column>
        <vxe-colgroup title="基本投入">
          <vxe-colgroup title="合计">
            <vxe-column field="d" title="合计"></vxe-column>
            <vxe-column field="e" title="比上年增长"></vxe-column>
          </vxe-colgroup>
          <vxe-column field="f" title="人员经费"></vxe-column>
          <vxe-column field="g" title="公用经费"></vxe-column>
          <vxe-colgroup title="其他经费">
            <vxe-column field="w" title="合计"></vxe-column>
            <vxe-colgroup title="其中">
              <vxe-column field="h" title="标准化建设"></vxe-column>
              <vxe-column field="i" title="信息化建设"></vxe-column>
            </vxe-colgroup>
          </vxe-colgroup>
        </vxe-colgroup>
        <vxe-column field="j" title="附加信息"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="其他投入">
        <vxe-colgroup title="投入">
          <vxe-column field="k" title="合计"></vxe-column>
          <vxe-colgroup title="其中">
            <vxe-column field="l" title="人员经费"></vxe-column>
            <vxe-column field="m" title="教育经费"></vxe-column>
            <vxe-column field="n" title="项目经费"></vxe-column>
            <vxe-column field="o" title="基建投入"></vxe-column>
          </vxe-colgroup>
        </vxe-colgroup>
        <vxe-colgroup title="社会捐款">
          <vxe-column field="p" title="合计"></vxe-column>
          <vxe-colgroup title="其中">
            <vxe-column field="q" title="项目经费"></vxe-column>
            <vxe-column field="r" title="基建投入"></vxe-column>
          </vxe-colgroup>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-colgroup title="补充资料">
        <vxe-colgroup title="信息化建设">
          <vxe-column field="s" title="本年投入金额"></vxe-column>
          <vxe-colgroup title="其中">
            <vxe-column field="t" title="合计"></vxe-column>
            <vxe-column field="u" title="建设数"></vxe-column>
          </vxe-colgroup>
          <vxe-column field="v" title="备注"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
    </vxe-table>

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
      tableData: [],
      mergeCells: [],
      mergeFooterItems: [],
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar" print></vxe-toolbar>

        <vxe-table
          border
          resizable
          show-footer
          ref="xTable"
          height="800"
          align="center"
          :print-config="{}"
          :column-config="{width: 90}"
          :merge-cells="mergeCells"
          :merge-footer-items="mergeFooterItems"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-column field="a" title="名称"></vxe-column>
          <vxe-colgroup field="b" title="教育经费投入">
            <vxe-column field="c" title="总计"></vxe-column>
            <vxe-colgroup title="基本投入">
              <vxe-colgroup title="合计">
                <vxe-column field="d" title="合计"></vxe-column>
                <vxe-column field="e" title="比上年增长"></vxe-column>
              </vxe-colgroup>
              <vxe-column field="f" title="人员经费"></vxe-column>
              <vxe-column field="g" title="公用经费"></vxe-column>
              <vxe-colgroup title="其他经费">
                <vxe-column field="w" title="合计"></vxe-column>
                <vxe-colgroup title="其中">
                  <vxe-column field="h" title="标准化建设"></vxe-column>
                  <vxe-column field="i" title="信息化建设"></vxe-column>
                </vxe-colgroup>
              </vxe-colgroup>
            </vxe-colgroup>
            <vxe-column field="j" title="附加信息"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup title="其他投入">
            <vxe-colgroup title="投入">
              <vxe-column field="k" title="合计"></vxe-column>
              <vxe-colgroup title="其中">
                <vxe-column field="l" title="人员经费"></vxe-column>
                <vxe-column field="m" title="教育经费"></vxe-column>
                <vxe-column field="n" title="项目经费"></vxe-column>
                <vxe-column field="o" title="基建投入"></vxe-column>
              </vxe-colgroup>
            </vxe-colgroup>
            <vxe-colgroup title="社会捐款">
              <vxe-column field="p" title="合计"></vxe-column>
              <vxe-colgroup title="其中">
                <vxe-column field="q" title="项目经费"></vxe-column>
                <vxe-column field="r" title="基建投入"></vxe-column>
              </vxe-colgroup>
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-colgroup title="补充资料">
            <vxe-colgroup title="信息化建设">
              <vxe-column field="s" title="本年投入金额"></vxe-column>
              <vxe-colgroup title="其中">
                <vxe-column field="t" title="合计"></vxe-column>
                <vxe-column field="u" title="建设数"></vxe-column>
              </vxe-colgroup>
              <vxe-column field="v" title="备注"></vxe-column>
            </vxe-colgroup>
          </vxe-colgroup>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              mergeCells: [],
              mergeFooterItems: []
            }
          },
          created () {
            this.$nextTick(() => {
              // 手动将表格和工具栏进行关联
              this.$refs.xTable.connect(this.$refs.xToolbar)
            })
            this.loadList()
          },
          methods: {
            loadList () {
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
              this.handleMerge()
            },
            handleMerge () {
              // 根据行数据计算合并规则
              const mergeCells = [
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
              ]
              // 根据行数据计算表尾合并规则
              const mergeFooterItems = [
                { row: 0, col: 1, rowspan: 1, colspan: 2 },
                { row: 0, col: 6, rowspan: 1, colspan: 2 },
                { row: 0, col: 14, rowspan: 2, colspan: 5 },
                { row: 1, col: 4, rowspan: 1, colspan: 8 }
              ]
              this.mergeCells = mergeCells
              this.mergeFooterItems = mergeFooterItems
            },
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
    this.$nextTick(() => {
      // 手动将表格和工具栏进行关联
      this.$refs.xTable.connect(this.$refs.xToolbar)
    })
    this.loadList()
  },
  methods: {
    loadList () {
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
      this.handleMerge()
    },
    handleMerge () {
      // 根据行数据计算合并规则
      const mergeCells = [
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
      ]
      // 根据行数据计算表尾合并规则
      const mergeFooterItems = [
        { row: 0, col: 1, rowspan: 1, colspan: 2 },
        { row: 0, col: 6, rowspan: 1, colspan: 2 },
        { row: 0, col: 14, rowspan: 2, colspan: 5 },
        { row: 1, col: 4, rowspan: 1, colspan: 8 }
      ]
      this.mergeCells = mergeCells
      this.mergeFooterItems = mergeFooterItems
    },
    footerMethod ({ columns }) {
      return [
        columns.map((column, index) => index),
        columns.map((column, index) => 1000 + index)
      ]
    }
  }
}
</script>
