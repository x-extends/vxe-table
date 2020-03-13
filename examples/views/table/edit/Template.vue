<template>
  <div>
    <p class="tip">
      使用 edit <table-column-api-link prop="slot"/> 自定义渲染任意 Vue 组件<br>
      <span class="red">（注：自定义渲染虽然可以支持任意的 vue 组件，但是并不是所有组件都能直接使用的，所有跨组件之间会存在冲突问题，如果不处理好冲突的情况下是大部分组件是无法使用的；
      可以通过 <router-link class="link" :to="{name: 'InterceptorAPI'}">事件拦截器</router-link> 来处理冲突）</span>
    </p>

    <vxe-table
      border
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template v-slot:edit="{ row }">
          <vxe-input type="text" v-model="row.role"></vxe-input>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{autofocus: '.custom-input'}">
        <template v-slot:edit="{ row }">
          <input type="text" v-model="row.name" class="custom-input">
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template v-slot:edit="{ row }">
          <vxe-input type="number" v-model="row.age"></vxe-input>
        </template>
      </vxe-table-column>
      <vxe-table-column field="date3" title="Date" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template v-slot:edit="{ row }">
          <vxe-input type="date" v-model="row.date3" transfer></vxe-input>
        </template>
        <template v-slot="{ row }">选中日期：{{ row.date3 }}</template>
      </vxe-table-column>
      <vxe-table-column field="attr1" title="不同行渲染" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row, rowIndex }">
          <template v-if="rowIndex <= 1">
            <vxe-input type="date" v-model="row.attr1" placeholder="请选择日期" transfer></vxe-input>
          </template>
          <template v-else-if="rowIndex <= 3">
            <vxe-select v-model="row.attr1" placeholder="请选择下拉" transfer>
              <vxe-option value="选项1" label="选项1"></vxe-option>
              <vxe-option value="选项2" label="选项2"></vxe-option>
              <vxe-option value="选项3" label="选项3"></vxe-option>
            </vxe-select>
          </template>
          <template v-else>
            <vxe-input type="number" v-model="row.attr1" placeholder="请输入数值" transfer></vxe-input>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{autofocus: '.vxe-input--inner'}">
            <template v-slot:edit="{ row }">
              <vxe-input type="text" v-model="row.role"></vxe-input>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{autofocus: '.custom-input'}">
            <template v-slot:edit="{ row }">
              <input type="text" v-model="row.name" class="custom-input">
            </template>
          </vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{autofocus: '.vxe-input--inner'}">
            <template v-slot:edit="{ row }">
              <vxe-input type="number" v-model="row.age"></vxe-input>
            </template>
          </vxe-table-column>
          <vxe-table-column field="date3" title="Date" :edit-render="{autofocus: '.vxe-input--inner'}">
            <template v-slot:edit="{ row }">
              <vxe-input type="date" v-model="row.date3" transfer></vxe-input>
            </template>
            <template v-slot="{ row }">选中日期：{{ row.date3 }}</template>
          </vxe-table-column>
          <vxe-table-column field="attr1" title="不同行渲染" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row, rowIndex }">
              <template v-if="rowIndex <= 1">
                <vxe-input type="date" v-model="row.attr1" placeholder="请选择日期" transfer></vxe-input>
              </template>
              <template v-else-if="rowIndex <= 3">
                <vxe-select v-model="row.attr1" placeholder="请选择下拉" transfer>
                  <vxe-option value="选项1" label="选项1"></vxe-option>
                  <vxe-option value="选项2" label="选项2"></vxe-option>
                  <vxe-option value="选项3" label="选项3"></vxe-option>
                </vxe-select>
              </template>
              <template v-else>
                <vxe-input type="number" v-model="row.attr1" placeholder="请输入数值" transfer></vxe-input>
              </template>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
