<template>
  <div>
    <h2>{{ $t('app.aside.nav.quick') }}</h2>
    <p class="tip">基本写法（js）：</p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
    <p class="tip">基本写法（ts）：</p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">setup 写法（js）：</p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">setup 写法（ts）：</p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[6] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[7] }}</pre-code>
    </pre>

    <p class="tip">JSX 写法：</p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="typescript">{{ demoCodes[8] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      demoCodes: [
        `
        <vxe-table border :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name">
            <template #default="{ row }">
              <span>自定义插槽模板 {{ row.name }}</span>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>

        <vxe-grid v-bind="gridOptions">
          <template #name="{ row }">
            <span>自定义插槽模板 {{ row.name }}</span>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
              ],
              gridOptions: {
                border: true,
                columns: [
                  { type: 'seq', width: 50 },
                  { field: 'name', title: 'Name', slots: { default: 'name' } },
                  { field: 'sex', title: 'Sex', showHeaderOverflow: true },
                  { field: 'address', title: 'Address', showOverflow: true }
                ],
                data: [
                  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
                ]
              }
            }
          }
        }
        `,
        `
        <vxe-table border :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name">
            <template #default="{ row }">
              <span>自定义插槽模板 {{ row.name }}</span>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>

        <vxe-grid v-bind="gridOptions">
          <template #name="{ row }">
            <span>自定义插槽模板 {{ row.name }}</span>
          </template>
        </vxe-grid>
        `,
        `
        import { defineComponent } from 'vue'

        export default defineComponent({
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
              ],
              gridOptions: {
                border: true,
                columns: [
                  { type: 'seq', width: 50 },
                  { field: 'name', title: 'Name', slots: { default: 'name' } },
                  { field: 'sex', title: 'Sex', showHeaderOverflow: true },
                  { field: 'address', title: 'Address', showOverflow: true }
                ],
                data: [
                  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
                ]
              }
            }
          }
        })
        `,
        `
        <vxe-table border :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name">
            <template #default="{ row }">
              <span>自定义插槽模板 {{ row.name }}</span>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>

        <vxe-grid v-bind="gridOptions">
          <template #name="{ row }">
            <span>自定义插槽模板 {{ row.name }}</span>
          </template>
        </vxe-grid>
        `,
        `
        import { ref, reactive } from 'vue'

        export default {
          setup () {
            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
            ])

            const gridOptions = reactive({
              border: true,
              columns: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'Name', slots: { default: 'name' } },
                { field: 'sex', title: 'Sex', showHeaderOverflow: true },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              data: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
              ]
            })

            return {
              tableData,
              gridOptions
            }
          }
        }
        `,
        `
        <vxe-table border :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name">
            <template #default="{ row }">
              <span>自定义插槽模板 {{ row.name }}</span>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>

        <vxe-grid v-bind="gridOptions">
          <template #name="{ row }">
            <span>自定义插槽模板 {{ row.name }}</span>
          </template>
        </vxe-grid>
        `,
        `
        import { defineComponent, ref, reactive } from 'vue'
        import { VxeGridProps } from 'vxe-table'

        interface UserVO {
          id: number;
          name: string;
          role: string;
          sex: string;
          age: number;
          address: string;
        }

        export default defineComponent({
          setup () {
            const tableData = ref<UserVO[]>([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
            ])

            const gridOptions = reactive<VxeGridProps<UserVO>>({
              border: true,
              columns: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'Name', slots: { default: 'name' } },
                { field: 'sex', title: 'Sex', showHeaderOverflow: true },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              data: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
              ]
            })

            return {
              tableData,
              gridOptions
            }
          }
        })
        `,
        `
        import { defineComponent, ref, reactive } from 'vue'
        import { VxeTable, VxeColumn, VxeGrid, VxeGridProps } from 'vxe-table'

        interface UserVO {
          id: number;
          name: string;
          role: string;
          sex: string;
          age: number;
          address: string;
        }

        export default defineComponent({
          setup () {
            const tableData = ref<UserVO>([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
            ])

            const gridOptions = reactive<VxeGridProps<UserVO>>({
              border: true,
              columns: [
                { type: 'seq', width: 50 },
                {
                  field: 'name',
                  title: 'Name',
                  slots: {
                    default ({ row }: { row: UserVO }) {
                      return [
                        <span>自定义插槽模板 { row.name }</span>
                      ]
                    }
                  }
                },
                { field: 'sex', title: 'Sex', showHeaderOverflow: true },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              data: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
              ]
            })
            
            return () => {
              return (
                <div>
                  <VxeTable border data={tableData.value}>
                    <VxeColumn type="seq" width="60"></VxeColumn>
                    <VxeColumn field="name" title="Name">
                      {{
                        default ({ row }: { row: UserVO }) {
                          return [
                            <span>自定义插槽模板 { row.name }</span>
                          ]
                        }
                      }}
                    </VxeColumn>
                    <VxeColumn field="sex" title="Sex"></VxeColumn>
                    <VxeColumn field="age" title="Age"></VxeColumn>
                  </VxeTable>

                  <VxeGrid {...gridOptions}></VxeGrid>
                </div>
              )
            }
          }
        })
        `
      ]
    }
  }
})
</script>
