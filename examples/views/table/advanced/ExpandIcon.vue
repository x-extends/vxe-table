<template>
  <div>
    <p class="tip">
      改变图标，通过设置 <table-api-link prop="expand-config"/>={<table-api-link prop="iconOpen"/>, <table-api-link prop="iconClose"/>} 局部替换默认的图标<br>
      也可以通过 <table-column-api-link prop="slot"/> 自定义内容模板，还可以使用 <router-link class="link" :to="{name: 'RendererExpand'}">渲染器</router-link> 创建可复用的展开行内容模板
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTable.toggleRowExpand(tableData[1])">切换第二行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setRowExpand([tableData[2], tableData[3]], true)">设置第三、四行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setAllRowExpand(true)">设置所有行展开</vxe-button>
        <vxe-button @click="$refs.xTable.clearRowExpand()">关闭所有行展开</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      :expand-config="{iconOpen: 'fa fa-minus-square', iconClose: 'fa fa-plus-square'}"
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="expand" title="Name">
        <template #default="{ row }">
          <span>{{ row.name }}</span>
        </template>
        <template #content="{ row, rowIndex }">
          <div v-if="rowIndex === 1" class="expand-wrapper">
            <vxe-table
              border
              :data="tableData">
              <vxe-column field="role" title="Role"></vxe-column>
              <vxe-column field="age" title="Age"></vxe-column>
            </vxe-table>
          </div>
          <div v-else class="expand-wrapper">
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
                <span>{{ row.updateTime }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.createTime }}</span>
              </li>
            </ul>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>

    <p class="tip">还可以通过 <table-api-link prop="expand-config"/>={<table-api-link prop="toggleMethod"/>} 方法实现展开与关闭的细节处理，返回值用来决定是否允许继续执行</p>

    <vxe-table
      border
      :expand-config="{toggleMethod: toggleExpandMethod}"
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="expand" title="Name">
        <template #default="{ row }">
          <span>{{ row.name }}</span>
        </template>
        <template #content="{ row, rowIndex }">
          <div v-if="rowIndex === 1" class="expand-wrapper">
            <vxe-table
              border
              :data="tableData">
              <vxe-column field="role" title="Role"></vxe-column>
              <vxe-column field="age" title="Age"></vxe-column>
            </vxe-table>
          </div>
          <div v-else class="expand-wrapper">
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
                <span>{{ row.updateTime }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.createTime }}</span>
              </li>
            </ul>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[3] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[4] }}</pre-code>
      <pre-code class="css">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">还可以通过 <table-api-link prop="expand-config"/>={<table-api-link prop="visibleMethod"/>} 方法实现权限控制，返回值用来决定是否显示展开按钮</p>

    <vxe-table
      border
      :expand-config="{visibleMethod: expandVisibleMethod}"
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="expand" title="Name">
        <template #default="{ row }">
          <span>{{ row.name }}</span>
        </template>
        <template #content="{ row, rowIndex }">
          <div v-if="rowIndex === 1" class="expand-wrapper">
            <vxe-table
              border
              :data="tableData">
              <vxe-column field="role" title="Role"></vxe-column>
              <vxe-column field="age" title="Age"></vxe-column>
            </vxe-table>
          </div>
          <div v-else class="expand-wrapper">
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
                <span>{{ row.updateTime }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.createTime }}</span>
              </li>
            </ul>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[7] }}</pre-code>
      <pre-code class="css">{{ demoCodes[8] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
      ],
      demoCodes: [
        `
        <vxe-table
          ref="xTable"
          border
          :expand-config="{iconOpen: 'fa fa-minus-square', iconClose: 'fa fa-plus-square'}"
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="expand" title="Name">
            <template #default="{ row, rowIndex }">
              <span>{{ row.name }}</span>
            </template>
            <template #content="{ row, rowIndex }">
              <div v-if="rowIndex === 1" class="expand-wrapper">
                <vxe-table
                  border
                  :data="tableData">
                  <vxe-column field="role" title="Role"></vxe-column>
                  <vxe-column field="age" title="Age"></vxe-column>
                </vxe-table>
              </div>
              <div v-else class="expand-wrapper">
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
                    <span>{{ row.updateTime }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.createTime }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        .expand-wrapper {
          padding: 20px;
        }
        `,
        `
        <vxe-table
          border
          :expand-config="{toggleMethod: toggleExpandMethod}"
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="expand" title="Name">
            <template #default="{ row, rowIndex }">
              <span>{{ row.name }}</span>
            </template>
            <template #content="{ row, rowIndex }">
              <div v-if="rowIndex === 1" class="expand-wrapper">
                <vxe-table
                  border
                  :data="tableData">
                  <vxe-column field="role" title="Role"></vxe-column>
                  <vxe-column field="age" title="Age"></vxe-column>
                </vxe-table>
              </div>
              <div v-else class="expand-wrapper">
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
                    <span>{{ row.updateTime }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.createTime }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
              ]
            }
          },
          methods: {
            toggleExpandMethod ({ expanded, row }) {
              if (expanded) {
                if (row.sex === '1') {
                  this.$XModal.message({ id: 'openErr', content: '不允许展开', status: 'error' })
                  return false
                }
              } else {
                if (row.sex === '0') {
                  this.$XModal.message({ id: 'closeErr', content: '不允许关闭', status: 'error' })
                  return false
                }
              }
              return true
            }
          }
        }
        `,
        `
        .expand-wrapper {
          padding: 20px;
        }
        `,
        `
        <vxe-table
          border
          :expand-config="{visibleMethod: expandVisibleMethod}"
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="expand" title="Name">
            <template #default="{ row, rowIndex }">
              <span>{{ row.name }}</span>
            </template>
            <template #content="{ row, rowIndex }">
              <div v-if="rowIndex === 1" class="expand-wrapper">
                <vxe-table
                  border
                  :data="tableData">
                  <vxe-column field="role" title="Role"></vxe-column>
                  <vxe-column field="age" title="Age"></vxe-column>
                </vxe-table>
              </div>
              <div v-else class="expand-wrapper">
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
                    <span>{{ row.updateTime }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.createTime }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
              ]
            }
          },
          methods: {
            expandVisibleMethod ({ row }) {
              if (row.sex === '1') {
                return false
              }
              return true
            }
          }
        }
        `,
        `
        .expand-wrapper {
          padding: 20px;
        }
        `
      ]
    }
  },
  methods: {
    toggleExpandMethod ({ expanded, row }) {
      if (expanded) {
        if (row.sex === '1') {
          this.$XModal.message({ id: 'openErr', content: '不允许展开', status: 'error' })
          return false
        }
      } else {
        if (row.sex === '0') {
          this.$XModal.message({ id: 'closeErr', content: '不允许关闭', status: 'error' })
          return false
        }
      }
      return true
    },
    expandVisibleMethod ({ row }) {
      if (row.sex === '1') {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.expand-wrapper {
  padding: 20px;
}
</style>
