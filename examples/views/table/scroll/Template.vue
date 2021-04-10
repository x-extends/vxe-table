<template>
  <div>
    <p class="tip">
      使用自定义模板渲染，通过 <table-column-api-link prop="slots"/> 属性编写 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#JSX" target="_blank">JSX</a> 模板或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM" target="_blank">VNode</a><br>
    </p>

    <vxe-grid ref="xGrid" class="my-grid88" v-bind="gridOptions">
      <template #toolbar_buttons>
        <button>按钮</button>
        <input type="text"/>
        <vxe-button>按钮1</vxe-button>
        <vxe-button>按钮2</vxe-button>
      </template>

      <template #name_header>
        <div class="first-col">
          <div class="first-col-top">名称</div>
          <div class="first-col-bottom">类型</div>
        </div>
      </template>

      <template #default_name="{ row, column }">
        <span style="color: red;">{{ row.name }}</span>,
        <button @click="showDetailEvent(row, column)">弹框</button>
      </template>

      <template #default_sex="{ row }">
        <a class="link" href="https://x-extends.github.io/vxe-table/">我是超链接：{{ row.sex }}</a>
      </template>

      <template #filter_sex="{ column, $panel }">
        <div v-for="(option, index) in column.filters" :key="index">
          <input type="type" v-model="option.data" @input="changeFilterEvent($event, option, $panel)" />
        </div>
      </template>

      <template #header_sex="{ column }">
        <span>
          <i>@</i>
          <span style="color: red;" @click="headerClickEvent">{{ column.title }}</span>
        </span>
      </template>

      <template #edit_sex="{ row }">
        <input type="text" v-model="row.sex" />
      </template>

      <template #default_address="{ row }">
        <span style="color: blue" @click="addressClickEvent(row)">{{ row.address }}</span>
      </template>

      <template #default_html2="{ row }">
        <span v-html="row.html2"></span>
      </template>

      <template #default_img1="{ row }">
        <img v-if="row.img1" :src="row.img1" style="height: 40px;"/>
        <span v-else>无</span>
      </template>
    </vxe-grid>

    <vxe-modal v-model="demo1.showDetails" title="查看详情" width="800" height="400" resize>
      <template #default>
        <div v-if="demo1.selectRow">{{ demo1.selectRow.address }}</div>
      </template>
    </vxe-modal>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeGridProps, VxeGridInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      showDetails: false,
      selectRow: null
    })

    const xGrid = ref({} as VxeGridInstance)

    const gridOptions = reactive({
      border: true,
      resizable: true,
      showOverflow: true,
      loading: false,
      height: 400,
      toolbarConfig: {
        custom: true,
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      editConfig: {
        trigger: 'click',
        mode: 'cell'
      },
      columns: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'Name', width: 200, resizable: false, slots: { header: 'name_header', default: 'default_name' } },
        {
          field: 'sex',
          title: 'Sex',
          showHeaderOverflow: true,
          filters: [{ data: '' }],
          filterMethod: ({ option, row }) => {
            return row.sex === option.data
          },
          editRender: {},
          slots: {
            default: 'default_sex',
            header: 'header_sex',
            filter: 'filter_sex',
            edit: 'edit_sex'
          }
        },
        { field: 'address', title: 'Address', slots: { default: 'default_address' } },
        { field: 'html2', title: 'Html片段', slots: { default: 'default_html2' } },
        { field: 'img1', title: '图片路径', slots: { default: 'default_img1' } }
      ]
    } as VxeGridProps)

    const showDetailEvent = (row: any) => {
      demo1.selectRow = row
      demo1.showDetails = true
    }

    const headerClickEvent = () => {
      VXETable.modal.alert('头部点击事件')
    }

    const addressClickEvent = (row: any) => {
      VXETable.modal.alert(`address点击事件：${row.address}`)
    }

    const changeFilterEvent = (evnt: Event, option: any, $panel: any) => {
      $panel.changeOption(evnt, !!option.data, option)
    }

    const mockList = (size: number): Promise<any[]> => {
      return new Promise(resolve => {
        const list: any[] = []
        for (let index = 0; index < size; index++) {
          list.push({
            name: `名称${index}`,
            sex: '0',
            num: 123,
            age: 18,
            num2: 234,
            rate: 3,
            img1: '/vxe-table/static/other/img1.gif',
            html2: `<span style="color:red">HTML标签${index}</span>`,
            address: `vxe-table 从入门到放弃系列${index}`
          })
        }
        resolve(list)
      })
    }

    nextTick(() => {
      gridOptions.loading = true
      // 使用函数式加载
      mockList(400).then(data => {
        gridOptions.loading = false
        const $grid = xGrid.value
        if ($grid) {
          $grid.loadData(data)
        }
      })
    })

    return {
      demo1,
      xGrid,
      gridOptions,
      showDetailEvent,
      headerClickEvent,
      addressClickEvent,
      changeFilterEvent,
      demoCodes: [
        `
        <vxe-grid ref="xGrid" class="my-grid88" v-bind="gridOptions">
          <template #toolbar_buttons>
            <button>按钮</button>
            <input type="text"/>
            <vxe-button>按钮1</vxe-button>
            <vxe-button>按钮2</vxe-button>
          </template>

          <template #name_header>
            <div class="first-col">
              <div class="first-col-top">名称</div>
              <div class="first-col-bottom">类型</div>
            </div>
          </template>

          <template #default_name="{ row, column }">
            <span style="color: red;">{{ row.name }}</span>,
            <button @click="showDetailEvent(row, column)">弹框</button>
          </template>

          <template #default_sex="{ row }">
            <a class="link" href="https://x-extends.github.io/vxe-table/">我是超链接：{{ row.sex }}</a>
          </template>

          <template #filter_sex="{ column, $panel }">
            <div v-for="(option, index) in column.filters" :key="index">
              <input type="type" v-model="option.data" @input="changeFilterEvent($event, option, $panel)" />
            </div>
          </template>

          <template #header_sex="{ column }">
            <span>
              <i>@</i>
              <span style="color: red;" @click="headerClickEvent">{{ column.title }}</span>
            </span>
          </template>

          <template #edit_sex="{ row }">
            <input type="text" v-model="row.sex" />
          </template>

          <template #default_address="{ row }">
            <span style="color: blue" @click="addressClickEvent(row)">{{ row.address }}</span>
          </template>

          <template #default_html2="{ row }">
            <span v-html="row.html2"></span>
          </template>

          <template #default_img1="{ row }">
            <img v-if="row.img1" :src="row.img1" style="height: 40px;"/>
            <span v-else>无</span>
          </template>
        </vxe-grid>

        <vxe-modal v-model="demo1.showDetails" title="查看详情" width="800" height="400" resize>
          <template #default>
            <div v-if="demo1.selectRow">{{ demo1.selectRow.address }}</div>
          </template>
        </vxe-modal>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VXETable, VxeGridProps, VxeGridInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              showDetails: false,
              selectRow: null
            })

            const xGrid = ref({} as VxeGridInstance)

            const gridOptions = reactive({
              border: true,
              resizable: true,
              showOverflow: true,
              loading: false,
              height: 400,
              toolbarConfig: {
                custom: true,
                slots: {
                  buttons: 'toolbar_buttons'
                }
              },
              editConfig: {
                trigger: 'click',
                mode: 'cell'
              },
              columns: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'Name', width: 200, resizable: false, slots: { header: 'name_header', default: 'default_name' } },
                {
                  field: 'sex',
                  title: 'Sex',
                  showHeaderOverflow: true,
                  filters: [{ data: '' }],
                  filterMethod: ({ option, row }) => {
                    return row.sex === option.data
                  },
                  editRender: {},
                  slots: {
                    default: 'default_sex',
                    header: 'header_sex',
                    filter: 'filter_sex',
                    edit: 'edit_sex'
                  }
                },
                { field: 'address', title: 'Address', slots: { default: 'default_address' } },
                { field: 'html2', title: 'Html片段', slots: { default: 'default_html2' } },
                { field: 'img1', title: '图片路径', slots: { default: 'default_img1' } }
              ]
            } as VxeGridProps)

            const showDetailEvent = (row: any) => {
              demo1.selectRow = row
              demo1.showDetails = true
            }

            const headerClickEvent = () => {
              VXETable.modal.alert('头部点击事件')
            }

            const addressClickEvent = (row: any) => {
              VXETable.modal.alert(\`address点击事件：\${row.address}\`)
            }

            const changeFilterEvent = (evnt: Event, option: any, $panel: any) => {
              $panel.changeOption(evnt, !!option.data, option)
            }

            const mockList = (size: number): Promise<any[]> => {
              return new Promise(resolve => {
                const list: any[] = []
                for (let index = 0; index < size; index++) {
                  list.push({
                    name: \`名称\${index}\`,
                    sex: '0',
                    num: 123,
                    age: 18,
                    num2: 234,
                    rate: 3,
                    img1: '/vxe-table/static/other/img1.gif',
                    html2: \`<span style="color:red">HTML标签\${index}</span>\`,
                    address: \`vxe-table 从入门到放弃系列\${index}\`
                  })
                }
                resolve(list)
              })
            }

            nextTick(() => {
              gridOptions.loading = true
              // 使用函数式加载
              mockList(400).then(data => {
                gridOptions.loading = false
                const $grid = xGrid.value
                if ($grid) {
                  $grid.loadData(data)
                }
              })
            })

            return {
              demo1,
              xGrid,
              gridOptions,
              showDetailEvent,
              headerClickEvent,
              addressClickEvent,
              changeFilterEvent
            }
          }
        })
        `,
        `
        .my-grid88 .first-col {
          position: relative;
          height: 20px;
        }
        .my-grid88 .first-col:before {
          content: "";
          position: absolute;
          left: -14px;
          top: 10px;
          width: 204px;
          height: 1px;
          transform: rotate(13deg);
          background-color: #e8eaec;
        }
        .my-grid88 .first-col .first-col-top {
          position: absolute;
          right: 4px;
          top: -10px;
        }
        .my-grid88 .first-col .first-col-bottom {
          position: absolute;
          left: 4px;
          bottom: -10px;
        }
        `
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.my-grid88 .first-col {
  position: relative;
  height: 20px;
}
.my-grid88 .first-col:before {
  content: "";
  position: absolute;
  left: -14px;
  top: 10px;
  width: 204px;
  height: 1px;
  transform: rotate(13deg);
  background-color: #e8eaec;
}
.my-grid88 .first-col .first-col-top {
  position: absolute;
  right: 4px;
  top: -10px;
}
.my-grid88 .first-col .first-col-bottom {
  position: absolute;
  left: 4px;
  bottom: -10px;
}
</style>
