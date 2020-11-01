<template>
  <div>
    <p class="tip">
      高级打印，可以将任意视图直接输出打印<br>
      给 vue 实例挂载属性：<br>
      Vue.prototype.$XPrint = VXETable.print<br>
    </p>

    <vxe-toolbar print>
      <template v-slot:buttons>
        <vxe-button @click="printEvent1">打印出货单据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable"
      height="300"
      :print-config="printConfig"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">打印条形码：先用第三方 <a class="link" href="https://www.npmjs.com/package/jsbarcode" target="_blank">jsbarcode</a> 库生成条形码，再用打印模块输出打印</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="printEvent2">打印条形码</vxe-button>
      </template>
    </vxe-toolbar>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">打印二维码：先用第三方 <a class="link" href="https://www.npmjs.com/package/qrcode" target="_blank">qrcode</a> 库生成二维码，再用打印模块输出打印</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="printEvent3">打印二维码</vxe-button>
      </template>
    </vxe-toolbar>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">打印合同</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="printEvent4">打印合同</vxe-button>
      </template>
    </vxe-toolbar>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[7] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import jsbarcode from 'jsbarcode'

// 打印样式
const printStyle = `
.title {
  text-align: center;
}
.my-list-row {
  display: inline-block;
  width: 100%;
}
.my-list-col {
  float: left;
  width: 33.33%;
  height: 28px;
  line-height: 28px;
}
.my-top,
.my-bottom {
  font-size: 12px;
}
.my-top {
  margin-bottom: 5px;
}
.my-bottom {
  margin-top: 30px;
  text-align: right;
}
`

// 打印顶部内容模板
const topHtml = `
<h1 class="title">出货单据</h1>
<div class="my-top">
  <div class="my-list-row">
    <div class="my-list-col">商品名称：vxe-table</div>
    <div class="my-list-col">发货单号：X2665847132654</div>
    <div class="my-list-col">发货日期：2020-09-20</div>
  </div>
  <div class="my-list-row">
    <div class="my-list-col">收货姓名：小徐</div>
    <div class="my-list-col">收货地址：火星第七区18号001</div>
    <div class="my-list-col">联系电话：10086</div>
  </div>
</div>
`

// 打印底部内容模板
const bottomHtml = `
<div class="my-bottom">
  <div class="my-list-row">
    <div class="my-list-col"></div>
    <div class="my-list-col">创建人：小徐</div>
    <div class="my-list-col">创建日期：2020-09-20</div>
  </div>
</div>
`

export default {
  data () {
    return {
      printConfig: {
        sheetName: '打印出货单据',
        style: printStyle,
        beforePrintMethod: ({ content }) => {
          return topHtml + content + bottomHtml
        }
      },
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Beijing' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shenzhen' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
      ],
      codeList: [
        { name: '某年xx1', price: 340, code: 1201545742000 },
        { name: 'vue 开发指南', price: 99, code: 1271545042006 },
        { name: 'vxe-table 从入门到放弃', price: 288, code: 1001545847781 },
        { name: 'vue 进阶用法', price: 188, code: 1201511842009 },
        { name: '某某xx2', price: 860, code: 1201543242003 },
        { name: 'js 从入门到精通', price: 99, code: 1201775849605 },
        { name: 'vxe-table pro 从入门到放弃', price: 888, code: 1201775112606 },
        { name: 'js 进阶宝典', price: 166, code: 1201775849608 }
      ],
      demoCodes: [
        `
        <vxe-toolbar print>
          <template v-slot:buttons>
            <vxe-button @click="printEvent1">打印出货单据</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable"
          height="300"
          :print-config="printConfig"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address"></vxe-table-column>
        </vxe-table>
        `,
        `
        // 打印样式
        const printStyle = \`
        .title {
          text-align: center;
        }
        .my-list-row {
          display: inline-block;
          width: 100%;
        }
        .my-list-col {
          float: left;
          width: 33.33%;
          height: 28px;
          line-height: 28px;
        }
        .my-top,
        .my-bottom {
          font-size: 12px;
        }
        .my-top {
          margin-bottom: 5px;
        }
        .my-bottom {
          margin-top: 30px;
          text-align: right;
        }
        \`
        // 打印顶部内容模板
        const topHtml = \`
        <h1 class="title">出货单据</h1>
        <div class="my-top">
          <div class="my-list-row">
            <div class="my-list-col">商品名称：vxe-table</div>
            <div class="my-list-col">发货单号：X2665847132654</div>
            <div class="my-list-col">发货日期：2020-09-20</div>
          </div>
          <div class="my-list-row">
            <div class="my-list-col">收货姓名：小徐</div>
            <div class="my-list-col">收货地址：火星第七区18号001</div>
            <div class="my-list-col">联系电话：10086</div>
          </div>
        </div>
        \`
        // 打印底部内容模板
        const bottomHtml = \`
        <div class="my-bottom">
          <div class="my-list-row">
            <div class="my-list-col"></div>
            <div class="my-list-col">创建人：小徐</div>
            <div class="my-list-col">创建日期：2020-09-20</div>
          </div>
        </div>
        \`

        export default {
          data () {
            return {
              printConfig: {
                sheetName: '打印出货单据',
                style: printStyle,
                beforePrintMethod: ({ content }) => {
                  return topHtml + content + bottomHtml
                }
              },
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Beijing' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shenzhen' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            }
          },
          methods: {
            printEvent1 () {
              this.$refs.xTable.print({
                sheetName: '打印出货单据',
                style: printStyle,
                columns: [
                  { type: 'seq' },
                  { field: 'name' },
                  { field: 'role' },
                  { field: 'address' }
                ],
                beforePrintMethod: ({ content }) => {
                  // 拦截打印之前，返回自定义的 html 内容
                  return topHtml + content + bottomHtml
                }
              })
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="printEvent2">打印条形码</vxe-button>
          </template>
        </vxe-toolbar>
        `,
        `
        export default {
          data () {
            return {
              codeList: [
                { name: '某年xx1', price: 340, code: 1201545742000 },
                { name: 'vue 开发指南', price: 99, code: 1271545042006 },
                { name: 'vxe-table 从入门到放弃', price: 288, code: 1001545847781 },
                { name: 'vue 进阶用法', price: 188, code: 1201511842009 },
                { name: '某某xx2', price: 860, code: 1201543242003 },
                { name: 'js 从入门到精通', price: 99, code: 1201775849605 },
                { name: 'vxe-table pro 从入门到放弃', price: 888, code: 1201775112606 },
                { name: 'js 进阶宝典', price: 166, code: 1201775849608 }
              ]
            }
          },
          methods: {
            printEvent2 () {
              // 打印样式
              const printStyle = \`
              .bar-code {
                display: inline-block;
                width: 50%;
                height: 240px;
                float: left;
                text-align: center;
              }
              \`
              // 打印模板
              const printTmpls = []
              this.codeList.forEach(item => {
                const img = document.createElement('img')
                // 生成条形码
                jsbarcode(img, item.code, {
                  lineColor: '#000',
                  width: 2,
                  height: 80,
                  displayValue: true
                })
                const tmpl = \`
                <div class="bar-code">
                  <p>\${item.name}</p>
                  \${img.outerHTML}
                  <p>统一售价：￥\${item.price}</p>
                </div>
                \`
                printTmpls.push(tmpl)
              })
              this.$XPrint({
                sheetName: '打印条形码模板',
                style: printStyle,
                content: printTmpls.join('')
              })
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="printEvent3">打印二维码</vxe-button>
          </template>
        </vxe-toolbar>
        `,
        `
        export default {
          methods: {
            printEvent3 () {
              // 打印样式
              const printStyle = \`
              .title,
              .qrcode {
                text-align: center;
              }
              \`
              // 生成二维码
              QRCode.toDataURL('https://gitee.com/xuliangzhan_admin/vxe-table').then(url => {
                // 打印模板
                const printTmpl = \`
                <p class="title">扫一扫二维码</p>
                <div class="qrcode">
                  <img src="\${url}">
                  <div style="margin-top: 15px;">如果对您有帮助，点击右上角捐赠打赏我们一杯咖啡！</div>
                </div>
                \`
                this.$XPrint({
                  sheetName: '打印二维码模板',
                  style: printStyle,
                  content: printTmpl
                })
              })
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="printEvent4">打印合同</vxe-button>
          </template>
        </vxe-toolbar>
        `,
        `
        export default {
          methods: {
            printEvent4 () {
              // 打印样式
              const printStyle = \`
              .page-1 {
                height: 1000px;
              }
              .page-2 {
                padding: 15px 0;
              }
              .fill-row {
                display: block;
                font-size: 14px;
                height: 36px;
              }
              .fill-span {
                display: inline-block;
                font-size: 14px;
                height: 36px;
              }
              .fill-title {
                display: inline-block;
                vertical-align: middle;
              }
              .fill-empty,
              .fill-part {
                display: inline-block;
                vertical-align: bottom;
                border-bottom: 1px solid #000;
              }
              .number {
                width: 250px;
                margin-top: 40px;
              }
              .number .fill-empty {
                width: 160px;
              }
              .title {
                text-align: center;
                margin: 80px 0;
              }
              .info-a,
              .info-b {
                margin: 0 auto;
                width: 400px;
                text-align: right;
              }
              .info-a .fill-row,
              .info-b .fill-row {
                height: 48px;
              }
              .info-a .fill-empty,
              .info-b .fill-empty {
                width: 200px;
              }
              .info-b {
                margin-top: 80px;
              }
              .list-desc {
                padding-left: 15px;
              }
              \`
              // 打印模板
              const printTmpl = \`
              <div class="page-1">
                <div class="fill-row number">
                  <span class="fill-title">编号：</span>
                  <span class="fill-empty"></span>
                </div>
                <h1 class="title">劳动合同书</h1>
                <div class="info-a">
                  <div class="fill-row">
                    <span class="fill-title">甲方（用人单位名称）名称：</span>
                    <span class="fill-empty"></span>
                  </div>
                  <div class="fill-row">
                    <span class="fill-title">住址：</span>
                    <span class="fill-empty"></span>
                  </div>
                  <div class="fill-row">
                    <span class="fill-title">法定代表人（委托代理人）：</span>
                    <span class="fill-empty"></span>
                  </div>
                </div>
                <div class="info-b">
                  <div class="fill-row">
                    <span class="fill-title">乙方（劳动者）姓名：</span>
                    <span class="fill-empty"></span>
                  </div>
                  <div class="fill-row">
                    <span class="fill-title">性别：</span>
                    <span class="fill-empty"></span>
                  </div>
                  <div class="fill-row">
                    <span class="fill-title">住址：</span>
                    <span class="fill-empty"></span>
                  </div>
                  <div class="fill-row">
                    <span class="fill-title">居民身份证号：</span>
                    <span class="fill-empty"></span>
                  </div>
                  <div class="fill-row">
                    <span class="fill-title">联系电话：</span>
                    <span class="fill-empty"></span>
                  </div>
                </div>
              </div>

              <div class="page-2">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;甲乙双方根据《中国人民共和国劳动合同法》等法律、法规、规章的规定，在平等、自愿、协商一致的基础上，同意订立本劳动合同，共同遵守本合同所列条款。</p>
                <h2>一：合同类型的期限</h2>
                <div class="list-desc">
                  <p>第一条 甲、乙双方选择以下第<span class="fill-part" style="width: 100px"></span>等形式确定本合同期限：</p>
                  <div class="list-desc">
                    <p>1、固定期限：自<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日起至<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日止。</p>
                    <p>2、无固定期限：自<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日起至<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日止</p>
                    <p>3、以完成一定的工作（任务）为期限：自<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日起至工作（任务）完成时即行终止。</p>
                    <p>双方约定的试用期限<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日只，期限为<span class="fill-part" style="width: 40px"></span>月</p>
                  </div>
                </div>
                <h2>二：工作内容和工作地点</h2>
                <div class="list-desc">...省略</div>
                <h2>三：工作时间和休息休假</h2>
                <div class="list-desc">...省略</div>
                <div style="margin-top: 15px;">如果对您有帮助，点击右上角捐赠打赏我们一杯咖啡！</div>
              </div>
              \`
              this.$XPrint({
                sheetName: '打印合同模板',
                style: printStyle,
                content: printTmpl
              })
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    printEvent1 () {
      this.$refs.xTable.print({
        sheetName: '打印出货单据',
        style: printStyle,
        columns: [
          { type: 'seq' },
          { field: 'name' },
          { field: 'role' },
          { field: 'address' }
        ],
        beforePrintMethod: ({ content }) => {
          // 拦截打印之前，返回自定义的 html 内容
          return topHtml + content + bottomHtml
        }
      })
    },
    printEvent2 () {
      // 打印样式
      const printStyle = `
      .barcode {
        display: inline-block;
        width: 50%;
        height: 240px;
        float: left;
        text-align: center;
      }
      `
      // 打印模板
      const printTmpls = []
      this.codeList.forEach(item => {
        const img = document.createElement('img')
        // 生成条形码
        jsbarcode(img, item.code, {
          lineColor: '#000',
          width: 2,
          height: 80,
          displayValue: true
        })
        const tmpl = `
        <div class="barcode">
          <p>${item.name}</p>
          ${img.outerHTML}
          <p>统一售价：￥${item.price}</p>
        </div>
        `
        printTmpls.push(tmpl)
      })
      this.$XPrint({
        sheetName: '打印条形码模板',
        style: printStyle,
        content: printTmpls.join('')
      })
    },
    printEvent3 () {
      // 打印样式
      const printStyle = `
      .title,
      .qrcode {
        text-align: center;
      }
      `
      // 生成二维码
      QRCode.toDataURL('https://gitee.com/xuliangzhan_admin/vxe-table').then(url => {
        // 打印模板
        const printTmpl = `
        <p class="title">扫一扫二维码</p>
        <div class="qrcode">
          <img src="${url}">
          <div style="margin-top: 15px;">如果对您有帮助，点击右上角捐赠打赏我们一杯咖啡！</div>
        </div>
        `
        this.$XPrint({
          sheetName: '打印二维码模板',
          style: printStyle,
          content: printTmpl
        })
      })
    },
    printEvent4 () {
      // 打印样式
      const printStyle = `
      .page-1 {
        height: 1000px;
      }
      .page-2 {
        padding: 15px 0;
      }
      .fill-row {
        display: block;
        font-size: 14px;
        height: 36px;
      }
      .fill-span {
        display: inline-block;
        font-size: 14px;
        height: 36px;
      }
      .fill-title {
        display: inline-block;
        vertical-align: middle;
      }
      .fill-empty,
      .fill-part {
        display: inline-block;
        vertical-align: bottom;
        border-bottom: 1px solid #000;
      }
      .number {
        width: 250px;
        margin-top: 40px;
      }
      .number .fill-empty {
        width: 160px;
      }
      .title {
        text-align: center;
        margin: 80px 0;
      }
      .info-a,
      .info-b {
        margin: 0 auto;
        width: 400px;
        text-align: right;
      }
      .info-a .fill-row,
      .info-b .fill-row {
        height: 48px;
      }
      .info-a .fill-empty,
      .info-b .fill-empty {
        width: 200px;
      }
      .info-b {
        margin-top: 80px;
      }
      .list-desc {
        padding-left: 15px;
      }
      `
      // 打印模板
      const printTmpl = `
      <div class="page-1">
        <div class="fill-row number">
          <span class="fill-title">编号：</span>
          <span class="fill-empty"></span>
        </div>
        <h1 class="title">劳动合同书</h1>
        <div class="info-a">
          <div class="fill-row">
            <span class="fill-title">甲方（用人单位名称）名称：</span>
            <span class="fill-empty"></span>
          </div>
          <div class="fill-row">
            <span class="fill-title">住址：</span>
            <span class="fill-empty"></span>
          </div>
          <div class="fill-row">
            <span class="fill-title">法定代表人（委托代理人）：</span>
            <span class="fill-empty"></span>
          </div>
        </div>
        <div class="info-b">
          <div class="fill-row">
            <span class="fill-title">乙方（劳动者）姓名：</span>
            <span class="fill-empty"></span>
          </div>
          <div class="fill-row">
            <span class="fill-title">性别：</span>
            <span class="fill-empty"></span>
          </div>
          <div class="fill-row">
            <span class="fill-title">住址：</span>
            <span class="fill-empty"></span>
          </div>
          <div class="fill-row">
            <span class="fill-title">居民身份证号：</span>
            <span class="fill-empty"></span>
          </div>
          <div class="fill-row">
            <span class="fill-title">联系电话：</span>
            <span class="fill-empty"></span>
          </div>
        </div>
      </div>

      <div class="page-2">
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;甲乙双方根据《中国人民共和国劳动合同法》等法律、法规、规章的规定，在平等、自愿、协商一致的基础上，同意订立本劳动合同，共同遵守本合同所列条款。</p>
        <h2>一：合同类型的期限</h2>
        <div class="list-desc">
          <p>第一条 甲、乙双方选择以下第<span class="fill-part" style="width: 100px"></span>等形式确定本合同期限：</p>
          <div class="list-desc">
            <p>1、固定期限：自<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日起至<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日止。</p>
            <p>2、无固定期限：自<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日起至<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日止</p>
            <p>3、以完成一定的工作（任务）为期限：自<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日起至工作（任务）完成时即行终止。</p>
            <p>双方约定的试用期限<span class="fill-part" style="width: 60px"></span>年<span class="fill-part" style="width: 40px"></span>月<span class="fill-part" style="width: 40px"></span>日只，期限为<span class="fill-part" style="width: 40px"></span>月</p>
          </div>
        </div>
        <h2>二：工作内容和工作地点</h2>
        <div class="list-desc">...省略</div>
        <h2>三：工作时间和休息休假</h2>
        <div class="list-desc">...省略</div>
        <div style="margin-top: 15px;">如果对您有帮助，点击右上角捐赠打赏我们一杯咖啡！</div>
      </div>
      `
      this.$XPrint({
        sheetName: '打印合同模板',
        style: printStyle,
        content: printTmpl
      })
    }
  }
}
</script>
