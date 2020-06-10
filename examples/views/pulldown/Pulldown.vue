<template>
  <div>
    <h2>{{ $t('app.aside.nav.pulldown') }}</h2>
    <p class="tip">下拉容器，可以非常简单的基于下拉容器去实现各种下拉组件。查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'pulldown'}}">API</router-link></p>

    <p>
      <vxe-pulldown ref="xDown1">
        <template>
          <vxe-input v-model="value1" placeholder="可搜索的虚拟下拉框" @focus="focusEvent1" @keyup="keyupEvent1"></vxe-input>
        </template>
        <template v-slot:dropdown>
          <vxe-list height="200" class="my-dropdown1" :data="list1" auto-resize>
            <template v-slot="{ items }">
              <div class="list-item1" v-for="item in items" :key="item.value" @click="selectEvent1(item)">
                <i class="fa fa-user-o"></i>
                <span>{{ item.label }}</span>
              </div>
            </template>
          </vxe-list>
        </template>
      </vxe-pulldown>

      <vxe-pulldown ref="xDown2">
        <template>
          <vxe-button icon="fa fa-table" @click="clickEvent2">切换下拉表格</vxe-button>
        </template>
        <template v-slot:dropdown>
          <div class="my-dropdown2">
            <vxe-table
              auto-resize
              :data="tableData2">
              <vxe-table-column field="name" title="Name"></vxe-table-column>
              <vxe-table-column field="role" title="Role"></vxe-table-column>
              <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            </vxe-table>
          </div>
        </template>
      </vxe-pulldown>

      <vxe-pulldown ref="xDown3">
        <template>
          <vxe-input v-model="value3" suffix-icon="fa fa-search" placeholder="实现下拉分页表格" @keyup="keyupEvent3" @focus="focusEvent3" @suffix-click="suffixClick3"></vxe-input>
        </template>
        <template v-slot:dropdown>
          <div class="my-dropdown3">
            <vxe-grid
              highlight-hover-row
              auto-resize
              height="auto"
              :loading="loading3"
              :pager-config="tablePage3"
              :data="tableData3"
              :columns="tableColumn3"
              @cell-click="cellClickEvent3">
            </vxe-grid>
          </div>
        </template>
      </vxe-pulldown>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      value1: '',
      list1: [],
      tableData2: [
        { name: 'Test1', role: '前端', sex: '男' },
        { name: 'Test2', role: '后端', sex: '男' },
        { name: 'Test3', role: '测试', sex: '男' },
        { name: 'Test4', role: '设计师', sex: '女' }
      ],
      value3: '',
      tableColumn3: [
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' }
      ],
      loading3: false,
      tableData3: [],
      tableList3: [
        { name: 'Test1', role: '前端', sex: '男' },
        { name: 'Test2', role: '后端', sex: '男' },
        { name: 'Test3', role: '测试', sex: '男' },
        { name: 'Test4', role: '设计师', sex: '女' },
        { name: 'Test5', role: '前端', sex: '男' },
        { name: 'Test6', role: '前端', sex: '男' },
        { name: 'Test7', role: '前端', sex: '男' }
      ],
      tablePage3: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      demoCodes: [
        `
        <p>
          <vxe-pulldown ref="xDown1">
            <template>
              <vxe-input v-model="value1" placeholder="可搜索的虚拟下拉框" @focus="focusEvent1" @keyup="keyupEvent1"></vxe-input>
            </template>
            <template v-slot:dropdown>
              <vxe-list height="200" class="my-dropdown1" :data="list1" auto-resize>
                <template v-slot="{ items }">
                  <div class="list-item1" v-for="item in items" :key="item.value" @click="selectEvent1(item)">
                    <i class="fa fa-user-o"></i>
                    <span>{{ item.label }}</span>
                  </div>
                </template>
              </vxe-list>
            </template>
          </vxe-pulldown>

          <vxe-pulldown ref="xDown2">
            <template>
              <vxe-button icon="fa fa-table" @click="clickEvent2">切换下拉表格</vxe-button>
            </template>
            <template v-slot:dropdown>
              <div class="my-dropdown2">
                <vxe-table
                  auto-resize
                  :data="tableData2">
                  <vxe-table-column field="name" title="Name"></vxe-table-column>
                  <vxe-table-column field="role" title="Role"></vxe-table-column>
                  <vxe-table-column field="sex" title="Sex"></vxe-table-column>
                </vxe-table>
              </div>
            </template>
          </vxe-pulldown>

          <vxe-pulldown ref="xDown3">
            <template>
              <vxe-input v-model="value3" suffix-icon="fa fa-search" placeholder="实现下拉分页表格" @keyup="keyupEvent3" @focus="focusEvent3" @suffix-click="suffixClick3"></vxe-input>
            </template>
            <template v-slot:dropdown>
              <div class="my-dropdown3">
                <vxe-grid
                  highlight-hover-row
                  auto-resize
                  height="auto"
                  :loading="loading3"
                  :pager-config="tablePage3"
                  :data="tableData3"
                  :columns="tableColumn3"
                  @cell-click="cellClickEvent3">
                </vxe-grid>
              </div>
            </template>
          </vxe-pulldown>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: '',
              list1: [
                { label: '选项1', value: 1 },
                { label: '选项2', value: 2 },
                { label: '选项3', value: 3 },
                { label: '选项4', value: 4 },
                { label: '选项5', value: 5 }
              ],
              tableData2: [
                { name: 'Test1', role: '前端', sex: '男' },
                { name: 'Test2', role: '后端', sex: '男' },
                { name: 'Test3', role: '测试', sex: '男' },
                { name: 'Test4', role: '设计师', sex: '女' }
              ],
              value3: '',
              tableColumn3: [
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                { field: 'sex', title: 'Sex' }
              ],
              loading3: false,
              tableData3: [],
              tableList3: [
                { name: 'Test1', role: '前端', sex: '男' },
                { name: 'Test2', role: '后端', sex: '男' },
                { name: 'Test3', role: '测试', sex: '男' },
                { name: 'Test4', role: '设计师', sex: '女' },
                { name: 'Test5', role: '前端', sex: '男' },
                { name: 'Test6', role: '前端', sex: '男' },
                { name: 'Test7', role: '前端', sex: '男' }
              ],
              tablePage3: {
                total: 0,
                currentPage: 1,
                pageSize: 10
              }
            }
          },
          created () {
            const list1 = []
            for (let index = 0; index < 1000; index++) {
              list1.push({ label: \`选项\${index}\`, value: index })
            }
            this.data1 = list1
            this.list1 = list1
            this.keyupEvent3()
          },
          methods: {
            focusEvent1 () {
              this.$refs.xDown1.showPanel()
            },
            keyupEvent1 () {
              const { value1 } = this
              this.list1 = value1 ? this.data1.filter(item => item.label.indexOf(value1) > -1) : this.data1
            },
            selectEvent1 (item) {
              this.value1 = item.label
              this.$refs.xDown1.hidePanel().then(() => {
                this.list1 = this.data1
              })
            },
            clickEvent2 () {
              this.$refs.xDown2.togglePanel()
            },
            focusEvent3 () {
              this.$refs.xDown3.showPanel()
            },
            keyupEvent3 () {
              const { value3 } = this
              this.loading3 = true
              setTimeout(() => {
                this.loading3 = false
                if (value3) {
                  this.tableData3 = this.tableList3.filter(row => row.name.indexOf(value3) > -1)
                } else {
                  this.tableData3 = this.tableList3.slice(0)
                }
              }, 100)
            },
            suffixClick3 () {
              this.$refs.xDown3.togglePanel()
            },
            cellClickEvent3 ({ row }) {
              this.value3 = row.name
              this.$refs.xDown3.hidePanel()
            }
          }
        }
        `,
        `
        .my-dropdown1 {
          border-radius: 4px;
          background-color: #fff;
          border: 1px solid #dcdfe6;
        }
        .list-item1:hover {
          background-color: #f5f7fa;
        }
        .my-dropdown2 {
          width: 400px;
          background-color: #fff;
          border: 1px solid #dcdfe6;
          box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
        }
        .my-dropdown3 {
          width: 600px;
          height: 300px;
          background-color: #fff;
          border: 1px solid #dcdfe6;
          box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
        }
        `
      ]
    }
  },
  created () {
    const list1 = []
    for (let index = 0; index < 1000; index++) {
      list1.push({ label: `选项${index}`, value: index })
    }
    this.data1 = list1
    this.list1 = list1
    this.keyupEvent3()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    focusEvent1 () {
      this.$refs.xDown1.showPanel()
    },
    keyupEvent1 () {
      const { value1 } = this
      this.list1 = value1 ? this.data1.filter(item => item.label.indexOf(value1) > -1) : this.data1
    },
    selectEvent1 (item) {
      this.value1 = item.label
      this.$refs.xDown1.hidePanel().then(() => {
        this.list1 = this.data1
      })
    },
    clickEvent2 () {
      this.$refs.xDown2.togglePanel()
    },
    focusEvent3 () {
      this.$refs.xDown3.showPanel()
    },
    keyupEvent3 () {
      const { value3 } = this
      this.loading3 = true
      setTimeout(() => {
        this.loading3 = false
        if (value3) {
          this.tableData3 = this.tableList3.filter(row => row.name.indexOf(value3) > -1)
        } else {
          this.tableData3 = this.tableList3.slice(0)
        }
      }, 100)
    },
    suffixClick3 () {
      this.$refs.xDown3.togglePanel()
    },
    cellClickEvent3 ({ row }) {
      this.value3 = row.name
      this.$refs.xDown3.hidePanel()
    }
  }
}
</script>

<style lang="css" scoped>
.my-dropdown1 {
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
}
.list-item1:hover {
  background-color: #f5f7fa;
}
.my-dropdown2 {
  width: 400px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
}
.my-dropdown3 {
  width: 600px;
  height: 300px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
}
</style>
