<template>
  <div>
    <p class="tip">
      通过设置 <table-api-link prop="expand-config"/> 属性和 type=<table-api-link prop="expand"/> 与 <table-column-api-link prop="slot"/> 可以开启展开行功能<br>
      <span class="red">（注：展开行不能用于虚拟滚动，该示例仅供参考）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="toggleSeqFixed">切换第一固定列</vxe-button>
        <vxe-button @click="toggleExpandFixed">切换第二固定列</vxe-button>
        <vxe-button @click="$refs.xTable.toggleRowExpand(tableData[1])">切换第二行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setRowExpand([tableData[2], tableData[3]], true)">设置第三、四行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setAllRowExpand(true)">设置所有行展开</vxe-button>
        <vxe-button @click="$refs.xTable.clearRowExpand()">关闭所有行展开</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      :data="tableData"
      @toggle-row-expand="toggleExpandChangeEvent">
      <vxe-table-column type="seq" width="60" :fixed="seqFixed"></vxe-table-column>
      <vxe-table-column type="expand" width="80" :fixed="expandFixed">
        <template #content="{ row, rowIndex }">
          <template v-if="rowIndex === 1">
            <vxe-table
              border
              :data="tableData">
              <vxe-table-column field="role" title="Role"></vxe-table-column>
              <vxe-table-column field="age" title="Age"></vxe-table-column>
            </vxe-table>
          </template>
          <template v-else>
            <ul>
              <li>
                <span>ID：</span>
                <span>{{ row.id }}</span>
              </li>
              <li>
                <span>Name：</span>
                <span>{{ row.name }}</span>
              </li>
              <li>
                <span>UpdateTime：</span>
                <span>{{ row.age }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.address }}</span>
              </li>
            </ul>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name" width="400"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="400"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="400"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">默认展开指定行，通过 <table-api-link prop="expandRowKeys"/> 参数设置默认展开行，指定默认值需要有 <table-api-link prop="row-id"/></p>

    <vxe-table
      border
      row-id="id"
      :expand-config="{expandRowKeys: ['1']}"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" width="60">
        <template #content="{ row, rowIndex }">
          <template v-if="rowIndex === 1">
            <vxe-table
              border
              :data="tableData">
              <vxe-table-column field="role" title="Role"></vxe-table-column>
              <vxe-table-column field="age" title="Age"></vxe-table-column>
            </vxe-table>
          </template>
          <template v-else>
            <ul>
              <li>
                <span>ID：</span>
                <span>{{ row.id }}</span>
              </li>
              <li>
                <span>Name：</span>
                <span>{{ row.name }}</span>
              </li>
              <li>
                <span>UpdateTime：</span>
                <span>{{ row.age }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.address }}</span>
              </li>
            </ul>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">
      默认展开所有行，通过 <table-api-link prop="expandAll"/> 参数设置默认展开所有行<br>
      还可以配置 <table-api-link prop="labelField"/> 列显示属性
    </p>

    <vxe-table
      border
      :data="tableData"
      :expand-config="{labelField: 'name', expandAll: true}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" title="Name">
        <template #content="{ row }">
          <ul>
            <li>
              <span>ID：</span>
              <span>{{ row.id }}</span>
            </li>
            <li>
              <span>Name：</span>
              <span>{{ row.name }}</span>
            </li>
            <li>
              <span>UpdateTime：</span>
              <span>{{ row.age }}</span>
            </li>
            <li>
              <span>CreateTime：</span>
              <span>{{ row.address }}</span>
            </li>
          </ul>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      seqFixed: null,
      expandFixed: null,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 36, address: 'Guangzhou' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man ', age: 34, address: 'vxe-table 从入门到放弃' }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="toggleSeqFixed">切换第一固定列</vxe-button>
            <vxe-button @click="toggleExpandFixed">切换第二固定列</vxe-button>
            <vxe-button @click="$refs.xTable.toggleRowExpand(tableData[1])">切换第二行展开</vxe-button>
            <vxe-button @click="$refs.xTable.setRowExpand([tableData[2], tableData[3]], true)">设置第三、四行展开</vxe-button>
            <vxe-button @click="$refs.xTable.setAllRowExpand(true)">设置所有行展开</vxe-button>
            <vxe-button @click="$refs.xTable.clearRowExpand()">关闭所有行展开</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          :data="tableData"
          @toggle-row-expand="toggleExpandChangeEvent">
          <vxe-table-column type="seq" width="60" :fixed="seqFixed"></vxe-table-column>
          <vxe-table-column type="expand" width="80" :fixed="expandFixed">
            <template #content="{ row, rowIndex }">
              <template v-if="rowIndex === 1">
                <vxe-table
                  border
                  :data="tableData">
                  <vxe-table-column field="role" title="Role"></vxe-table-column>
                  <vxe-table-column field="age" title="Age"></vxe-table-column>
                </vxe-table>
              </template>
              <template v-else>
                <ul>
                  <li>
                    <span>ID：</span>
                    <span>{{ row.id }}</span>
                  </li>
                  <li>
                    <span>Name：</span>
                    <span>{{ row.name }}</span>
                  </li>
                  <li>
                    <span>UpdateTime：</span>
                    <span>{{ row.age }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.address }}</span>
                  </li>
                </ul>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Name" width="400"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="400"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="400"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              seqFixed: null,
              expandFixed: null,
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 36, address: 'Guangzhou' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 24, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man ', age: 34, address: 'vxe-table 从入门到放弃' }
              ]
            }
          },
          methods: {
            toggleSeqFixed () {
              this.seqFixed = this.seqFixed ? null : 'left'
              this.$nextTick(() => {
                this.$refs.xTable.refreshColumn()
              })
            },
            toggleExpandFixed () {
              this.expandFixed = this.expandFixed ? null : 'left'
              this.$nextTick(() => {
                this.$refs.xTable.refreshColumn()
              })
            },
            toggleExpandChangeEvent ({ row, expanded }) {
              console.log('行展开事件' + expanded)
            }
          }
        }
        `,
        `
        <vxe-table
          border
          row-id="id"
          :expand-config="{expandRowKeys: ['1']}"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" width="60">
            <template #content="{ row, rowIndex }">
              <template v-if="rowIndex === 1">
                <vxe-table
                  border
                  :data="tableData">
                  <vxe-table-column field="role" title="Role"></vxe-table-column>
                  <vxe-table-column field="age" title="Age"></vxe-table-column>
                </vxe-table>
              </template>
              <template v-else>
                <ul>
                  <li>
                    <span>ID：</span>
                    <span>{{ row.id }}</span>
                  </li>
                  <li>
                    <span>Name：</span>
                    <span>{{ row.name }}</span>
                  </li>
                  <li>
                    <span>UpdateTime：</span>
                    <span>{{ row.age }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.address }}</span>
                  </li>
                </ul>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 36, address: 'Guangzhou' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 24, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man ', age: 34, address: 'vxe-table 从入门到放弃' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          :data="tableData"
          :expand-config="{labelField: 'name', expandAll: true}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" title="Name">
            <template #content="{ row }">
              <ul>
                <li>
                  <span>ID：</span>
                  <span>{{ row.id }}</span>
                </li>
                <li>
                  <span>Name：</span>
                  <span>{{ row.name }}</span>
                </li>
                <li>
                  <span>UpdateTime：</span>
                  <span>{{ row.age }}</span>
                </li>
                <li>
                  <span>CreateTime：</span>
                  <span>{{ row.address }}</span>
                </li>
              </ul>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 36, address: 'Guangzhou' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 24, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man ', age: 34, address: 'vxe-table 从入门到放弃' }
              ]
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    toggleSeqFixed () {
      this.seqFixed = this.seqFixed ? null : 'left'
      this.$nextTick(() => {
        this.$refs.xTable.refreshColumn()
      })
    },
    toggleExpandFixed () {
      this.expandFixed = this.expandFixed ? null : 'left'
      this.$nextTick(() => {
        this.$refs.xTable.refreshColumn()
      })
    },
    toggleExpandChangeEvent ({ expanded }) {
      console.log('行展开事件' + expanded)
    }
  }
}
</script>
