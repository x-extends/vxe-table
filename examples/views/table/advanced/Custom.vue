<template>
  <div>
    <p class="tip">
      通过 <table-column-api-link prop="visible"/> 属性设置默认是否显示，也可以通过函数式调用 <table-api-link prop="showColumn"/>、<table-api-link prop="hideColumn"/> 操作列的显示/隐藏<br>
      还可以通过动态修改列的 visible 属性，可以实现远程读取配置后控制是否显示，最后调用 <table-api-link prop="refreshColumn"/> 刷新列
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTable1.hideColumn($refs.xTable1.getColumnByField('role'))">隐藏role</vxe-button>
        <vxe-button @click="$refs.xTable1.showColumn($refs.xTable1.getColumnByField('role'))">显示role</vxe-button>
        <vxe-button @click="$refs.xTable1.showColumn($refs.xTable1.getColumnByField('sex'))">显示sex</vxe-button>
        <vxe-button @click="$refs.xTable1.resetColumn()">重置</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable1"
      height="200"
      :data="demo1.tableData">
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :visible="false"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">如果是根据服务端数据控制显示/隐藏列，在获取到配置信息后动态更改列的 <table-column-api-link prop="visible"/> 属性，然后调用 <table-api-link prop="refreshColumn"/> 属性列即可</p>

    <p>
      <vxe-checkbox v-model="column.visible" v-for="(column,index) in demo2.columns" :key="index" @change="$refs.xTable2.refreshColumn()">{{ column.title }}</vxe-checkbox>
    </p>

    <vxe-table
      border
      ref="xTable2"
      height="200"
      :loading="demo2.loading"
      :data="demo2.tableData">
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">通过 <table-column-api-link prop="visible"/> 属性设置默认是否显示，通过 <table-api-link prop="resetColumn"/> 函数重置全部列为可视状态</p>

    <p>
      <vxe-checkbox v-model="column.visible" v-for="(column,index) in demo3.columns" :key="index">{{ column.title }}</vxe-checkbox>
      <vxe-button @click="$refs.xTable3.refreshColumn()">刷新列信息</vxe-button>
      <vxe-button @click="$refs.xTable3.resetColumn()">重置自定义列</vxe-button>
    </p>

    <vxe-table
      border
      ref="xTable3"
      height="300"
      :loading="demo3.loading"
      :data="demo3.tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :visible="false"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-colgroup title="基本信息">
        <vxe-table-column field="sex" title="Sex" :visible="false"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-colgroup title="其他信息">
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
          <vxe-table-column field="flag" title="Flag"></vxe-table-column>
        </vxe-table-colgroup>
      </vxe-table-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">实现折叠列</p>

    <vxe-table
      border
      ref="xTable4"
      height="200"
      :data="demo4.tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="200">
        <template #header>
          <i :class="demo4.collapsable1 ? 'fa fa-minus-square' : 'fa fa-plus-square'" @click="collapsable1Event"></i>
          <span>Name</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="role" title="Role" :visible="false" width="200"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :visible="false" width="200"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="200">
        <template #header>
          <i :class="demo4.collapsable2 ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o'" @click="collapsable2Event"></i>
          <span>Age</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="rate" title="Rate" :visible="false" width="200"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :visible="false" width="200"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[7] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VxeTableInstance, VxeTableDefines } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable1 = ref({} as VxeTableInstance)
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const xTable2 = ref({} as VxeTableInstance)
    const demo2 = reactive({
      loading: false,
      columns: [] as VxeTableDefines.ColumnInfo[],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const xTable3 = ref({} as VxeTableInstance)
    const demo3 = reactive({
      loading: false,
      columns: [] as VxeTableDefines.ColumnInfo[],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const xTable4 = ref({} as VxeTableInstance)
    const demo4 = reactive({
      collapsable1: false,
      collapsable2: false,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const collapsable1Event = () => {
      const $table = xTable4.value
      const fields = ['role', 'sex']
      demo4.collapsable1 = !demo4.collapsable1
      fields.forEach(field => {
        const column = $table.getColumnByField(field)
        if (column) {
          column.visible = demo4.collapsable1
        }
      })
      $table.refreshColumn()
    }

    const collapsable2Event = () => {
      const $table = xTable4.value
      const fields = ['rate', 'address']
      demo4.collapsable2 = !demo4.collapsable2
      fields.forEach(field => {
        const column = $table.getColumnByField(field)
        if (column) {
          column.visible = demo4.collapsable2
        }
      })
      $table.refreshColumn()
    }

    setTimeout(() => {
      nextTick(() => {
        // 获取所有列配置
        const $table = xTable2.value
        demo2.loading = true
        demo2.columns = $table.getColumns()
        setTimeout(() => {
          // 将指定列设置为隐藏状态
          demo2.columns.forEach(column => {
            if (['name'].includes(column.property)) {
              column.visible = false
            }
          })
          if ($table) {
            $table.refreshColumn()
          }
          demo2.loading = false
        }, 800)
      })

      nextTick(() => {
        // 获取所有列配置
        const $table = xTable3.value
        demo3.loading = true
        demo3.columns = $table.getColumns()
        setTimeout(() => {
          demo3.loading = false
        }, 800)
      })
    }, 100)

    return {
      xTable1,
      demo1,
      xTable2,
      demo2,
      xTable3,
      demo3,
      xTable4,
      demo4,
      collapsable1Event,
      collapsable2Event,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="$refs.xTable1.hideColumn($refs.xTable1.getColumnByField('role'))">隐藏role</vxe-button>
            <vxe-button @click="$refs.xTable1.showColumn($refs.xTable1.getColumnByField('role'))">显示role</vxe-button>
            <vxe-button @click="$refs.xTable1.showColumn($refs.xTable1.getColumnByField('sex'))">显示sex</vxe-button>
            <vxe-button @click="$refs.xTable1.resetColumn()">重置</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable1"
          height="200"
          :data="demo1.tableData">
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :visible="false"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable1 = ref({} as VxeTableInstance)
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            return {
              xTable1,
              demo1
            }
          }
        })
        `,
        `
        <p>
          <vxe-checkbox v-model="column.visible" v-for="(column,index) in demo2.columns" :key="index" @change="$refs.xTable2.refreshColumn()">{{ column.title }}</vxe-checkbox>
        </p>

        <vxe-table
          border
          ref="xTable2"
          height="200"
          :loading="demo2.loading"
          :data="demo2.tableData">
          <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VxeTableInstance, VxeTableDefines } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable2 = ref({} as VxeTableInstance)
            const demo2 = reactive({
              loading: false,
              columns: [] as VxeTableDefines.ColumnInfo[],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            setTimeout(() => {
              nextTick(() => {
                // 获取所有列配置
                const $table = xTable2.value
                demo2.loading = true
                demo2.columns = $table.getColumns()
                setTimeout(() => {
                  // 将指定列设置为隐藏状态
                  demo2.columns.forEach(column => {
                    if (['name'].includes(column.property)) {
                      column.visible = false
                    }
                  })
                  if ($table) {
                    $table.refreshColumn()
                  }
                  demo2.loading = false
                }, 800)
              })
            }, 100)

            return {
              xTable2,
              demo2
            }
          }
        })
        `,
        `
        <p>
          <vxe-checkbox v-model="column.visible" v-for="(column,index) in demo3.columns" :key="index">{{ column.title }}</vxe-checkbox>
          <vxe-button @click="$refs.xTable3.refreshColumn()">刷新列信息</vxe-button>
          <vxe-button @click="$refs.xTable3.resetColumn()">重置自定义列</vxe-button>
        </p>

        <vxe-table
          border
          ref="xTable3"
          height="300"
          :loading="demo3.loading"
          :data="demo3.tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :visible="false"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-colgroup title="基本信息">
            <vxe-table-column field="sex" title="Sex" :visible="false"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-colgroup title="其他信息">
              <vxe-table-column field="rate" title="Rate"></vxe-table-column>
              <vxe-table-column field="flag" title="Flag"></vxe-table-column>
            </vxe-table-colgroup>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VxeTableInstance, VxeTableDefines } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable3 = ref({} as VxeTableInstance)
            const demo3 = reactive({
              loading: false,
              columns: [] as VxeTableDefines.ColumnInfo[],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            setTimeout(() => {
              nextTick(() => {
                // 获取所有列配置
                const $table = xTable3.value
                demo3.loading = true
                demo3.columns = $table.getColumns()
                setTimeout(() => {
                  demo3.loading = false
                }, 800)
              })
            }, 100)

            return {
              xTable3,
              demo3
            }
          }
        })
        `,
        `
        <vxe-table
          border
          ref="xTable4"
          height="200"
          :data="demo4.tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="200">
            <template #header>
              <i :class="demo4.collapsable1 ? 'fa fa-minus-square' : 'fa fa-plus-square'" @click="collapsable1Event"></i>
              <span>Name</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="Role" :visible="false" width="200"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :visible="false" width="200"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="200">
            <template #header>
              <i :class="demo4.collapsable2 ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o'" @click="collapsable2Event"></i>
              <span>Age</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="rate" title="Rate" :visible="false" width="200"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :visible="false" width="200"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable4 = ref({} as VxeTableInstance)
            const demo4 = reactive({
              collapsable1: false,
              collapsable2: false,
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const collapsable1Event = () => {
              const $table = xTable4.value
              const fields = ['role', 'sex']
              demo4.collapsable1 = !demo4.collapsable1
              fields.forEach(field => {
                const column = $table.getColumnByField(field)
                if (column) {
                  column.visible = demo4.collapsable1
                }
              })
              $table.refreshColumn()
            }

            const collapsable2Event = () => {
              const $table = xTable4.value
              const fields = ['rate', 'address']
              demo4.collapsable2 = !demo4.collapsable2
              fields.forEach(field => {
                const column = $table.getColumnByField(field)
                if (column) {
                  column.visible = demo4.collapsable2
                }
              })
              $table.refreshColumn()
            }

            return {
              xTable4,
              demo4,
              collapsable1Event,
              collapsable2Event
            }
          }
        })
        `
      ]
    }
  }
})
</script>
