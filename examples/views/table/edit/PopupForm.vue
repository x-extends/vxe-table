<template>
  <div>
    <p class="tip">实现弹框表单编辑功能，双击行可以弹出编辑框<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      row-key
      highlight-hover-row
      ref="xTable"
      height="500"
      :data="tableData"
      @cell-dblclick="cellDBLClickEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      <vxe-table-column title="操作" width="100" show-overflow>
        <template v-slot="{ row }">
          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="removeEvent(row)"></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
      <template v-slot>
        <vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
      </template>
    </vxe-modal>

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
      submitLoading: false,
      tableData: [],
      selectRow: null,
      showEdit: false,
      sexList: [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ],
      formData: {
        name: null,
        nickname: null,
        role: null,
        sex: null,
        age: null,
        num: null,
        checkedList: [],
        flag1: null,
        date3: null,
        address: null
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        nickname: [
          { required: true, message: '请输入昵称' }
        ],
        sex: [
          { required: true, message: '请选择性别' }
        ]
      },
      formItems: [
        { title: 'Basic information', span: 24, titleAlign: 'left', titleWidth: 200, titlePrefix: { icon: 'fa fa-address-card-o' } },
        { field: 'name', title: 'Name', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
        { field: 'nickname', title: 'Nickname', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入昵称' } } },
        { field: 'role', title: 'Role', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
        { field: 'sex', title: 'Sex', span: 12, itemRender: { name: '$select', options: [] } },
        { field: 'age', title: 'Age', span: 12, itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
        { field: 'flag1', title: '是否单身', span: 12, itemRender: { name: '$radio', options: [{ label: '是', value: 'Y' }, { label: '否', value: 'N' }] } },
        { field: 'checkedList', title: '可选信息', span: 24, visibleMethod: this.visibleMethod, itemRender: { name: '$checkbox', options: [{ label: '运动、跑步', value: '1' }, { label: '听音乐', value: '2' }, { label: '泡妞', value: '3' }, { label: '吃美食', value: '4' }] } },
        { title: 'Other information', span: 24, titleAlign: 'left', titleWidth: 200, titlePrefix: { message: '请填写必填项', icon: 'fa fa-info-circle' } },
        { field: 'num', title: 'Number', span: 12, itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入数值' } } },
        { field: 'date3', title: 'Date', span: 12, itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择日期' } } },
        { field: 'address', title: 'Address', span: 24, titleSuffix: { message: '提示信息！！', icon: 'fa fa-question-circle' }, itemRender: { name: '$textarea', props: { autosize: { minRows: 2, maxRows: 4 }, placeholder: '请输入地址' } } },
        { align: 'center', span: 24, titleAlign: 'left', itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          row-key
          highlight-hover-row
          ref="xTable"
          height="500"
          :data="tableData"
          @cell-dblclick="cellDBLClickEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
          <vxe-table-column title="操作" width="100" show-overflow>
            <template v-slot="{ row }">
              <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)"></vxe-button>
              <vxe-button type="text" icon="fa fa-trash-o" @click="removeEvent(row)"></vxe-button>
            </template>
          </vxe-table-column>
        </vxe-table>

        <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
          <template v-slot>
            <vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
          </template>
        </vxe-modal>
        `,
        `
        export default {
          data () {
            return {
              submitLoading: false,
              tableData: [],
              selectRow: null,
              showEdit: false,
              sexList: [
                { label: '女', value: '0' },
                { label: '男', value: '1' }
              ],
              formData: {
                name: null,
                nickname: null,
                role: null,
                sex: null,
                age: null,
                num: null,
                checkedList: [],
                flag1: null,
                date3: null,
                address: null
              },
              formRules: {
                name: [
                  { required: true, message: '请输入名称' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
                ],
                nickname: [
                  { required: true, message: '请输入昵称' }
                ],
                sex: [
                  { required: true, message: '请选择性别' }
                ]
              },
              formItems: [
                { title: 'Basic information', span: 24, titleAlign: 'left', titleWidth: 200, titlePrefix: { icon: 'fa fa-address-card-o' } },
                { field: 'name', title: 'Name', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
                { field: 'nickname', title: 'Nickname', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入昵称' } } },
                { field: 'role', title: 'Role', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
                { field: 'sex', title: 'Sex', span: 12, itemRender: { name: '$select', options: [] } },
                { field: 'age', title: 'Age', span: 12, itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
                { field: 'flag1', title: '是否单身', span: 12, itemRender: { name: '$radio', options: [{ label: '是', value: 'Y' }, { label: '否', value: 'N' }] } },
                { field: 'checkedList', title: '可选信息', span: 24, visibleMethod: this.visibleMethod, itemRender: { name: '$checkbox', options: [{ label: '运动、跑步', value: '1' }, { label: '听音乐', value: '2' }, { label: '泡妞', value: '3' }, { label: '吃美食', value: '4' }] } },
                { title: 'Other information', span: 24, titleAlign: 'left', titleWidth: 200, titlePrefix: { message: '请填写必填项', icon: 'fa fa-info-circle' } },
                { field: 'num', title: 'Number', span: 12, itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入数值' } } },
                { field: 'date3', title: 'Date', span: 12, itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择日期' } } },
                { field: 'address', title: 'Address', span: 24, titleSuffix: { message: '提示信息！！', icon: 'fa fa-question-circle' }, itemRender: { name: '$textarea', props: { autosize: { minRows: 2, maxRows: 4 }, placeholder: '请输入地址' } } },
                { align: 'center', span: 24, titleAlign: 'left', itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
              ]
            }
          },
          created () {
            this.formItems[4].itemRender.options = this.sexList
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            formatterSex ({ cellValue }) {
              let item = this.sexList.find(item => item.value === cellValue)
              return item ? item.label : ''
            },
            visibleMethod ({ data }) {
              return data.flag1 === 'Y'
            },
            cellDBLClickEvent ({ row }) {
              this.editEvent(row)
            },
            insertEvent () {
              this.formData = {
                name: '',
                nickname: '',
                role: '',
                sex: '',
                age: '',
                num: '',
                checkedList: [],
                flag1: '',
                date3: '',
                address: ''
              }
              this.selectRow = null
              this.showEdit = true
            },
            editEvent (row) {
              this.formData = {
                name: row.name,
                nickname: row.nickname,
                role: row.role,
                sex: row.sex,
                age: row.age,
                num: row.num,
                checkedList: row.checkedList,
                flag1: row.flag1,
                date3: row.date3,
                address: row.address
              }
              this.selectRow = row
              this.showEdit = true
            },
            removeEvent (row) {
              this.$XModal.confirm('您确定要删除该数据?').then(type => {
                if (type === 'confirm') {
                  this.$refs.xTable.remove(row)
                }
              })
            },
            submitEvent () {
              this.submitLoading = true
              setTimeout(() => {
                this.submitLoading = false
                this.showEdit = false
                if (this.selectRow) {
                  this.$XModal.message({ message: '保存成功', status: 'success' })
                  Object.assign(this.selectRow, this.formData)
                } else {
                  this.$XModal.message({ message: '新增成功', status: 'success' })
                  this.$refs.xTable.insert(this.formData)
                }
              }, 500)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.formItems[4].itemRender.options = this.sexList
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatterSex ({ cellValue }) {
      const item = this.sexList.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    visibleMethod ({ data }) {
      return data.flag1 === 'Y'
    },
    cellDBLClickEvent ({ row }) {
      this.editEvent(row)
    },
    insertEvent () {
      this.formData = {
        name: '',
        nickname: '',
        role: '',
        sex: '',
        age: '',
        num: '',
        checkedList: [],
        flag1: '',
        date3: '',
        address: ''
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent (row) {
      this.formData = {
        name: row.name,
        nickname: row.nickname,
        role: row.role,
        sex: row.sex,
        age: row.age,
        num: row.num,
        checkedList: row.checkedList,
        flag1: row.flag1,
        date3: row.date3,
        address: row.address
      }
      this.selectRow = row
      this.showEdit = true
    },
    removeEvent (row) {
      this.$XModal.confirm('您确定要删除该数据?').then(type => {
        if (type === 'confirm') {
          this.$refs.xTable.remove(row)
        }
      })
    },
    submitEvent () {
      this.submitLoading = true
      setTimeout(() => {
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          this.$XModal.message({ message: '保存成功', status: 'success' })
          Object.assign(this.selectRow, this.formData)
        } else {
          this.$XModal.message({ message: '新增成功', status: 'success' })
          this.$refs.xTable.insert(this.formData)
        }
      }, 500)
    }
  }
}
</script>
