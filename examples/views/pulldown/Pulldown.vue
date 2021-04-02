<template>
  <div>
    <h2>{{ $t('app.aside.nav.pulldown') }}</h2>
    <p class="tip">下拉容器，可以非常简单的基于下拉容器去实现各种下拉组件。查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'pulldown'}}">API</router-link></p>

    <p>
      <vxe-pulldown ref="xDown1">
        <template #default>
          <vxe-input v-model="demo1.value1" placeholder="可搜索的下拉框" @focus="focusEvent1" @keyup="keyupEvent1"></vxe-input>
        </template>
        <template #dropdown>
          <div class="my-dropdown1">
            <div class="list-item1" v-for="item in demo1.list1" :key="item.value" @click="selectEvent1(item)">
              <i class="fa fa-user-o"></i>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </template>
      </vxe-pulldown>

      <vxe-pulldown ref="xDown2">
        <template #default>
          <vxe-input v-model="demo2.value2" placeholder="可搜索的大数据下拉框" @focus="focusEvent2" @keyup="keyupEvent2"></vxe-input>
        </template>
        <template #dropdown>
          <vxe-list height="200" class="my-dropdown2" :data="demo2.list2" auto-resize>
            <template #default="{ items }">
              <div class="list-item2" v-for="item in items" :key="item.value" @click="selectEvent2(item)">
                <i class="fa fa-envelope-o"></i>
                <span>{{ item.label }}</span>
              </div>
            </template>
          </vxe-list>
        </template>
      </vxe-pulldown>

      <vxe-pulldown ref="xDown3" destroy-on-close>
        <template #default>
          <vxe-button icon="fa fa-table" @click="clickEvent3">切换下拉表格</vxe-button>
        </template>
        <template #dropdown>
          <div class="my-dropdown3">
            <vxe-table
              auto-resize
              :data="demo3.tableData3">
              <vxe-table-column field="name" title="Name"></vxe-table-column>
              <vxe-table-column field="role" title="Role"></vxe-table-column>
              <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            </vxe-table>
          </div>
        </template>
      </vxe-pulldown>

      <vxe-pulldown ref="xDown4" transfer>
        <template #default>
          <vxe-input v-model="demo4.value4" suffix-icon="fa fa-search" placeholder="实现下拉分页表格" @keyup="keyupEvent4" @focus="focusEvent4" @suffix-click="suffixClick4"></vxe-input>
        </template>
        <template #dropdown>
          <div class="my-dropdown4">
            <vxe-grid
              highlight-hover-row
              auto-resize
              height="auto"
              :loading="demo4.loading4"
              :pager-config="demo4.tablePage4"
              :data="demo4.tableData4"
              :columns="demo4.tableColumn4"
              @cell-click="cellClickEvent4"
              @page-change="pageChangeEvent4">
            </vxe-grid>
          </div>
        </template>
      </vxe-pulldown>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { VxePulldownInstance, VxeGridEvents } from '../../../types/index'

interface ItemVO1 {
  label: string;
  vlue: string;
}

interface ItemVO2 {
  label: string;
  vlue: string;
}

export default defineComponent({
  setup () {
    const data1: ItemVO1[] = [
      { label: '选项1', vlue: '1' },
      { label: '选项2', vlue: '2' },
      { label: '选项3', vlue: '3' },
      { label: '选项4', vlue: '4' },
      { label: '选项5', vlue: '5' },
      { label: '选项6', vlue: '6' },
      { label: '选项7', vlue: '7' },
      { label: '选项8', vlue: '8' },
      { label: '选项9', vlue: '9' },
      { label: '选项10', vlue: '10' },
      { label: '选项11', vlue: '11' },
      { label: '选项12', vlue: '12' }
    ]

    const demo1 = reactive({
      value1: '',
      list1: data1
    })

    const xDown1 = ref({} as VxePulldownInstance)

    const focusEvent1 = () => {
      const $pulldown1 = xDown1.value
      $pulldown1.showPanel()
    }

    const keyupEvent1 = () => {
      demo1.list1 = demo1.value1 ? data1.filter((item) => item.label.indexOf(demo1.value1) > -1) : data1
    }

    const selectEvent1 = (item: ItemVO1) => {
      const $pulldown1 = xDown1.value
      demo1.value1 = item.label
      $pulldown1.hidePanel().then(() => {
        demo1.list1 = data1
      })
    }

    const data2: ItemVO2[] = [
      { label: '选项1', vlue: '1' },
      { label: '选项2', vlue: '2' },
      { label: '选项3', vlue: '3' },
      { label: '选项4', vlue: '4' },
      { label: '选项5', vlue: '5' },
      { label: '选项6', vlue: '6' },
      { label: '选项7', vlue: '7' },
      { label: '选项8', vlue: '8' },
      { label: '选项9', vlue: '9' },
      { label: '选项10', vlue: '10' },
      { label: '选项11', vlue: '11' },
      { label: '选项12', vlue: '12' }
    ]
    const demo2 = reactive({
      value2: '',
      list2: data2
    })

    const xDown2 = ref({} as VxePulldownInstance)

    const focusEvent2 = () => {
      const $pulldown2 = xDown2.value
      $pulldown2.showPanel()
    }

    const keyupEvent2 = () => {
      demo2.list2 = demo2.value2 ? data2.filter((item) => item.label.indexOf(demo2.value2) > -1) : data2
    }

    const selectEvent2 = (item: ItemVO2) => {
      const $pulldown2 = xDown2.value
      demo2.value2 = item.label
      $pulldown2.hidePanel().then(() => {
        demo2.list2 = data2
      })
    }

    const demo3 = reactive({
      tableData3: [
        { name: 'Test1', role: '前端', sex: '男' },
        { name: 'Test2', role: '后端', sex: '男' },
        { name: 'Test3', role: '测试', sex: '男' },
        { name: 'Test4', role: '设计师', sex: '女' }
      ]
    })

    const xDown3 = ref({} as VxePulldownInstance)

    const clickEvent3 = () => {
      const $pulldown3 = xDown3.value
      $pulldown3.togglePanel()
    }

    const demo4 = reactive({
      value4: '',
      tableColumn4: [
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' }
      ],
      loading4: false,
      tableData4: [] as any[],
      tableList4: [
        { name: 'Test1', role: '前端', sex: '男' },
        { name: 'Test2', role: '后端', sex: '男' },
        { name: 'Test3', role: '测试', sex: '男' },
        { name: 'Test4', role: '设计师', sex: '女' },
        { name: 'Test5', role: '前端', sex: '男' },
        { name: 'Test6', role: '前端', sex: '男' },
        { name: 'Test7', role: '前端', sex: '男' }
      ],
      tablePage4: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    })

    const xDown4 = ref({} as VxePulldownInstance)

    const focusEvent4 = () => {
      const $pulldown4 = xDown4.value
      $pulldown4.showPanel()
    }

    const keyupEvent4 = () => {
      demo4.loading4 = true
      setTimeout(() => {
        demo4.loading4 = false
        if (demo4.value4) {
          demo4.tableData4 = demo4.tableList4.filter((row) => row.name.indexOf(demo4.value4) > -1)
        } else {
          demo4.tableData4 = demo4.tableList4.slice(0)
        }
      }, 100)
    }

    const suffixClick4 = () => {
      const $pulldown4 = xDown4.value
      $pulldown4.togglePanel()
    }

    const cellClickEvent4: VxeGridEvents.CellClick = ({ row }) => {
      const $pulldown4 = xDown4.value
      demo4.value4 = row.name
      $pulldown4.hidePanel()
    }

    const pageChangeEvent4: VxeGridEvents.PageChange = ({ currentPage, pageSize }) => {
      demo4.tablePage4.currentPage = currentPage
      demo4.tablePage4.pageSize = pageSize
    }

    onMounted(() => {
      keyupEvent4()
    })

    return {
      demo1,
      xDown1,
      focusEvent1,
      keyupEvent1,
      selectEvent1,
      demo2,
      xDown2,
      focusEvent2,
      keyupEvent2,
      selectEvent2,
      demo3,
      xDown3,
      clickEvent3,
      demo4,
      xDown4,
      focusEvent4,
      keyupEvent4,
      suffixClick4,
      cellClickEvent4,
      pageChangeEvent4,
      demoCodes: [
        `
        <p>
          <vxe-pulldown ref="xDown1">
            <template #default>
              <vxe-input v-model="demo1.value1" placeholder="可搜索的下拉框" @focus="focusEvent1" @keyup="keyupEvent1"></vxe-input>
            </template>
            <template #dropdown>
              <div class="my-dropdown1">
                <div class="list-item1" v-for="item in demo1.list1" :key="item.value" @click="selectEvent1(item)">
                  <i class="fa fa-user-o"></i>
                  <span>{{ item.label }}</span>
                </div>
              </div>
            </template>
          </vxe-pulldown>

          <vxe-pulldown ref="xDown2">
            <template #default>
              <vxe-input v-model="demo2.value2" placeholder="可搜索的大数据下拉框" @focus="focusEvent2" @keyup="keyupEvent2"></vxe-input>
            </template>
            <template #dropdown>
              <vxe-list height="200" class="my-dropdown2" :data="demo2.list2" auto-resize>
                <template #default="{ items }">
                  <div class="list-item2" v-for="item in items" :key="item.value" @click="selectEvent2(item)">
                    <i class="fa fa-envelope-o"></i>
                    <span>{{ item.label }}</span>
                  </div>
                </template>
              </vxe-list>
            </template>
          </vxe-pulldown>

          <vxe-pulldown ref="xDown3" destroy-on-close>
            <template #default>
              <vxe-button icon="fa fa-table" @click="clickEvent3">切换下拉表格</vxe-button>
            </template>
            <template #dropdown>
              <div class="my-dropdown3">
                <vxe-table
                  auto-resize
                  :data="demo3.tableData3">
                  <vxe-table-column field="name" title="Name"></vxe-table-column>
                  <vxe-table-column field="role" title="Role"></vxe-table-column>
                  <vxe-table-column field="sex" title="Sex"></vxe-table-column>
                </vxe-table>
              </div>
            </template>
          </vxe-pulldown>

          <vxe-pulldown ref="xDown4" transfer>
            <template #default>
              <vxe-input v-model="demo4.value4" suffix-icon="fa fa-search" placeholder="实现下拉分页表格" @keyup="keyupEvent4" @focus="focusEvent4" @suffix-click="suffixClick4"></vxe-input>
            </template>
            <template #dropdown>
              <div class="my-dropdown4">
                <vxe-grid
                  highlight-hover-row
                  auto-resize
                  height="auto"
                  :loading="demo4.loading4"
                  :pager-config="demo4.tablePage4"
                  :data="demo4.tableData4"
                  :columns="demo4.tableColumn4"
                  @cell-click="cellClickEvent4"
                  @page-change="pageChangeEvent4">
                </vxe-grid>
              </div>
            </template>
          </vxe-pulldown>
        </p>
        `,
        `
        import { defineComponent, onMounted, reactive, ref } from 'vue'
        import { VxePulldownInstance } from 'vxe-table'

        interface ItemVO {
          label: string;
          vlue: string;
        }

        export default defineComponent({
          setup () {
            const data1: ItemVO[] = [
              { label: '选项1', vlue: '1' },
              { label: '选项2', vlue: '2' },
              { label: '选项3', vlue: '3' },
              { label: '选项4', vlue: '4' },
              { label: '选项5', vlue: '5' },
              { label: '选项6', vlue: '6' },
              { label: '选项7', vlue: '7' },
              { label: '选项8', vlue: '8' },
              { label: '选项9', vlue: '9' },
              { label: '选项10', vlue: '10' },
              { label: '选项11', vlue: '11' },
              { label: '选项12', vlue: '12' }
            ]

            const demo1 = reactive({
              value1: '',
              list1: data1
            })

            const xDown1 = ref({} as VxePulldownInstance)

            const focusEvent1 = () => {
              const $pulldown1 = xDown1.value
              $pulldown1.showPanel()
            }

            const keyupEvent1 = () => {
              demo1.list1 = demo1.value1 ? data1.filter((item) => item.label.indexOf(demo1.value1) > -1) : data1
            }

            const selectEvent1 = (item: ItemVO) => {
              const $pulldown1 = xDown1.value
              demo1.value1 = item.label
              $pulldown1.hidePanel().then(() => {
                demo1.list1 = data1
              })
            }

            const data2: ItemVO[] = [
              { label: '选项1', vlue: '1' },
              { label: '选项2', vlue: '2' },
              { label: '选项3', vlue: '3' },
              { label: '选项4', vlue: '4' },
              { label: '选项5', vlue: '5' },
              { label: '选项6', vlue: '6' },
              { label: '选项7', vlue: '7' },
              { label: '选项8', vlue: '8' },
              { label: '选项9', vlue: '9' },
              { label: '选项10', vlue: '10' },
              { label: '选项11', vlue: '11' },
              { label: '选项12', vlue: '12' }
            ]

            const demo2 = reactive({
              value2: '',
              list2: data2
            })

            const xDown2 = ref({} as VxePulldownInstance)

            const focusEvent2 = () => {
              const $pulldown2 = xDown2.value
              $pulldown2.showPanel()
            }

            const keyupEvent2 = () => {
              demo2.list2 = demo2.value2 ? data2.filter((item) => item.label.indexOf(demo2.value2) > -1) : data2
            }

            const selectEvent2 = (item) => {
              const $pulldown2 = xDown2.value
              demo2.value2 = item.label
              $pulldown2.hidePanel().then(() => {
                demo2.list2 = data2
              })
            }

            const demo3 = reactive({
              tableData3: [
                { name: 'Test1', role: '前端', sex: '男' },
                { name: 'Test2', role: '后端', sex: '男' },
                { name: 'Test3', role: '测试', sex: '男' },
                { name: 'Test4', role: '设计师', sex: '女' }
              ]
            })

            const xDown3 = ref({} as VxePulldownInstance)

            const clickEvent3 = () => {
              const $pulldown3 = xDown3.value
              $pulldown3.togglePanel()
            }

            const demo4 = reactive({
              value4: '',
              tableColumn4: [
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                { field: 'sex', title: 'Sex' }
              ],
              loading4: false,
              tableData4: [] as any[],
              tableList4: [
                { name: 'Test1', role: '前端', sex: '男' },
                { name: 'Test2', role: '后端', sex: '男' },
                { name: 'Test3', role: '测试', sex: '男' },
                { name: 'Test4', role: '设计师', sex: '女' },
                { name: 'Test5', role: '前端', sex: '男' },
                { name: 'Test6', role: '前端', sex: '男' },
                { name: 'Test7', role: '前端', sex: '男' }
              ],
              tablePage4: {
                total: 0,
                currentPage: 1,
                pageSize: 10
              }
            })

            const xDown4 = ref({} as VxePulldownInstance)

            const focusEvent4 = () => {
              const $pulldown4 = xDown4.value
              $pulldown4.showPanel()
            }

            const keyupEvent4 = () => {
              demo4.loading4 = true
              setTimeout(() => {
                demo4.loading4 = false
                if (demo4.value4) {
                  demo4.tableData4 = demo4.tableList4.filter((row) => row.name.indexOf(demo4.value4) > -1)
                } else {
                  demo4.tableData4 = demo4.tableList4.slice(0)
                }
              }, 100)
            }

            const suffixClick4 = () => {
              const $pulldown4 = xDown4.value
              $pulldown4.togglePanel()
            }

            const cellClickEvent4 = ({ row }: ItemVO) => {
              const $pulldown4 = xDown4.value
              demo4.value4 = row.name
              $pulldown4.hidePanel()
            }

            const pageChangeEvent4: VxeGridEvents.PageChange = ({ currentPage, pageSize }) => {
              demo4.tablePage4.currentPage = currentPage
              demo4.tablePage4.pageSize = pageSize
            }

            onMounted(() => {
              keyupEvent4()
            })

            return {
              demo1,
              xDown1,
              focusEvent1,
              keyupEvent1,
              selectEvent1,
              demo2,
              xDown2,
              focusEvent2,
              keyupEvent2,
              selectEvent2,
              demo3,
              xDown3,
              clickEvent3,
              demo4,
              xDown4,
              focusEvent4,
              keyupEvent4,
              suffixClick4,
              cellClickEvent4,
              pageChangeEvent4
              }
            }
          }
        }
        `,
        `
        .my-dropdown1 {
          height: 200px;
          overflow: auto;
          border-radius: 4px;
          background-color: #fff;
          border: 1px solid #dcdfe6;
        }
        .list-item1:hover {
          background-color: #f5f7fa;
        }
        .my-dropdown2 {
          border-radius: 4px;
          background-color: #fff;
          border: 1px solid #dcdfe6;
        }
        .list-item2:hover {
          background-color: #f5f7fa;
        }
        .my-dropdown3 {
          width: 400px;
          background-color: #fff;
          border: 1px solid #dcdfe6;
          box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
        }
        .my-dropdown4 {
          width: 600px;
          height: 300px;
          background-color: #fff;
          border: 1px solid #dcdfe6;
          box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
        }
        `
      ]
    }
  }
})
</script>

<style lang="css" scoped>
.my-dropdown1 {
  height: 200px;
  overflow: auto;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
}
.list-item1:hover {
  background-color: #f5f7fa;
}
.my-dropdown2 {
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
}
.list-item2:hover {
  background-color: #f5f7fa;
}
.my-dropdown3 {
  width: 400px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
}
.my-dropdown4 {
  width: 600px;
  height: 300px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
}
</style>
