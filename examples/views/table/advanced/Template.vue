<template>
  <div>
    <p class="tip">使用 <table-column-api-link prop="slot"/> 自定义模板；可以实现自定义任意内容及 html 元素<br>
      <table-column-api-link prop="default"/>：自定义内容模板（提前格式化（最优） > <table-column-api-link prop="formatter"/>（值发生变化时） > <table-column-api-link prop="slots"/>（即时））<br>
      <table-column-api-link prop="header"/>：自定义表头模板<br>
      <table-column-api-link prop="filter"/>：自定义筛选模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）<br>
      <table-column-api-link prop="edit"/>：自定义可编辑模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button>{{ $t('app.body.button.insert') }}</vxe-button>
        <vxe-button>
          <template>下拉按钮</template>
          <template v-slot:dropdowns>
            <vxe-button>删除</vxe-button>
            <vxe-button>保存</vxe-button>
          </template>
        </vxe-button>
      </template>
      <template v-slot:tools>
        <vxe-input placeholder="搜索"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      :data="tableData">
      <vxe-table-column type="seq" width="100" :resizable="false" show-overflow>
        <template v-slot:header="{ row }">
          <div class="first-col">
            <div class="first-col-top">名称</div>
            <div class="first-col-bottom">序号</div>
          </div>
        </template>
        <template v-slot="{ row, seq }">
          <vxe-button @click="showDetailEvent(row)">弹框{{ seq }}</vxe-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="app.body.label.name" sortable>
        <template v-slot="{ row }">
          <a href="https://github.com/xuliangzhan/vxe-table" target="_black">我是超链接：{{ row.name }}</a>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="app.body.label.sex" :filters="[{data: ''}]" :filter-method="filterSexMethod">
        <template v-slot:header="{ column }">
          <vxe-tooltip v-model="showSexTip" content="这样玩也行？">
            <span style="color: red;" @click="showSexTip = !showSexTip">这样玩也行</span>
          </vxe-tooltip>
        </template>
        <template v-slot:filter="{ column, context }">
          <template v-for="(option, index) in column.filters">
            <input type="type" v-model="option.data" :key="index" @input="changeFilterEvent($event, option, context)">
          </template>
        </template>
        <template v-slot="{ row }">
          <span>{{ row.sex }} </span>
          <vxe-button type="text">编辑</vxe-button>
          <vxe-button type="text">删除</vxe-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="time" title="Time">
        <template v-slot:header="{ column }">
          <vxe-input placeholder="这样也行" size="mini"></vxe-input>
        </template>
        <template v-slot="{ row }">
          <span>{{ formatDate(row.time) }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow>
        <template v-slot="{ row, rowIndex }">
          <select v-if="rowIndex === 1">
            <option value="1">还可以这样</option>
          </select>
          <a href="https://github.com/xuliangzhan/vxe-table">{{ row.name }}</a>
        </template>
      </vxe-table-column>
      <vxe-table-column field="html1" title="Html片段" width="160" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.html1"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="img1" title="图片路径" width="120">
        <template v-slot="{ row, rowIndex }">
          <img v-if="row.img1" :src="row.img1" style="width: 100px;">
          <span v-else>无</span>
        </template>
      </vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
      <template>{{ selectRow ? selectRow.text : '' }}</template>
    </vxe-modal>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      showSexTip: false,
      showDetails: false,
      selectRow: null,
      tableData: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button>{{ $t('app.body.button.insert') }}</vxe-button>
            <vxe-button>
              <template>下拉按钮</template>
              <template v-slot:dropdowns>
                <vxe-button>删除</vxe-button>
                <vxe-button>保存</vxe-button>
              </template>
            </vxe-button>
          </template>
          <template v-slot:tools>
            <vxe-input placeholder="搜索"></vxe-input>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          :data="tableData">
          <vxe-table-column type="seq" width="100" :resizable="false" show-overflow>
            <template v-slot:header="{ row }">
              <div class="first-col">
                <div class="first-col-top">名称</div>
                <div class="first-col-bottom">序号</div>
              </div>
            </template>
            <template v-slot="{ row, seq }">
              <vxe-button @click="showDetailEvent(row)">弹框{{ seq }}</vxe-button>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="app.body.label.name" sortable>
            <template v-slot="{ row }">
              <a href="https://github.com/xuliangzhan/vxe-table" target="_black">我是超链接：{{ row.name }}</a>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="app.body.label.sex" :filters="[{data: ''}]" :filter-method="filterSexMethod">
            <template v-slot:header="{ column }">
              <vxe-tooltip v-model="showSexTip" content="这样玩也行？">
                <span style="color: red;" @click="showSexTip = !showSexTip">这样玩也行</span>
              </vxe-tooltip>
            </template>
            <template v-slot:filter="{ column, context }">
              <template v-for="(option, index) in column.filters">
                <input type="type" v-model="option.data" :key="index" @input="changeFilterEvent($event, option, context)">
              </template>
            </template>
            <template v-slot="{ row }">
              <span>{{ row.sex }} </span>
              <vxe-button type="text">编辑</vxe-button>
              <vxe-button type="text">删除</vxe-button>
            </template>
          </vxe-table-column>
          <vxe-table-column field="time" title="Time">
            <template v-slot:header="{ column }">
              <vxe-input placeholder="这样也行" size="mini"></vxe-input>
            </template>
            <template v-slot="{ row }">
              <span>{{ formatDate(row.time) }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow>
            <template v-slot="{ row, rowIndex }">
              <select v-if="rowIndex === 1">
                <option value="1">还可以这样</option>
              </select>
              <a href="https://github.com/xuliangzhan/vxe-table">{{ row.name }}</a>
            </template>
          </vxe-table-column>
          <vxe-table-column field="html1" title="Html片段" width="160" show-overflow>
            <template v-slot="{ row }">
              <span v-html="row.html1"></span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="img1" title="图片路径" width="120">
            <template v-slot="{ row, rowIndex }">
              <img v-if="row.img1" :src="row.img1" style="width: 100px;">
              <span v-else>无</span>
            </template>
          </vxe-table-column>
        </vxe-table>

        <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
          <template>{{ selectRow ? selectRow.text : '' }}</template>
        </vxe-modal>
        `,
        `
        export default {
          data () {
            return {
              showSexTip: false,
              showDetails: false,
              selectRow: null,
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            formatDate (value) {
              return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
            },
            filterSexMethod ({ option, row }) {
              return row.sex === option.data
            },
            changeFilterEvent (evnt, option, context) {
              context.changeMultipleOption(evnt, !!option.data, option)
            },
            showDetailEvent (row) {
              this.selectRow = row
              this.showDetails = true
            }
          }
        }
        `,
        `
        .first-col {
          position: relative;
          height: 20px;
        }
        .first-col:before {
          content: "";
          position: absolute;
          left: -15px;
          top: 10px;
          width: 110px;
          height: 1px;
          transform: rotate(28deg);
          background-color: #e8eaec;
        }
        .first-col .first-col-top {
          position: absolute;
          right: 4px;
          top: -10px;
        }
        .first-col .first-col-bottom {
          position: absolute;
          left: 4px;
          bottom: -10px;
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatDate (value) {
      return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
    },
    filterSexMethod ({ option, row }) {
      return row.sex === option.data
    },
    changeFilterEvent (evnt, option, context) {
      context.changeMultipleOption(evnt, !!option.data, option)
    },
    showDetailEvent (row) {
      this.selectRow = row
      this.showDetails = true
    }
  }
}
</script>

<style scoped>
.first-col {
  position: relative;
  height: 20px;
}
.first-col:before {
  content: "";
  position: absolute;
  left: -15px;
  top: 10px;
  width: 110px;
  height: 1px;
  transform: rotate(28deg);
  background-color: #e8eaec;
}
.first-col .first-col-top {
  position: absolute;
  right: 4px;
  top: -10px;
}
.first-col .first-col-bottom {
  position: absolute;
  left: 4px;
  bottom: -10px;
}
</style>
