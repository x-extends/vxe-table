<template>
  <div>
    <p>虚拟滚动渲染，加载 1 万行，左右固定列</p>
    <p>大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="reloadData"/> 函数</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="validEvent">校验</vxe-button>
        <vxe-button @click="fullValidEvent">完整校验</vxe-button>
        <vxe-button @click="selectValidEvent">选中校验</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      resizable
      show-overflow
      height="300"
      :loading="loading"
      :edit-rules="validRules"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row'}"
      :optimization ="{scrollY: {gt: 500, oSize: 10, rSize: 30}}">>
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable width="200" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="age" label="Age" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200"></vxe-table-column>
      <vxe-table-column prop="region" label="Region" width="200"></vxe-table-column>
      <vxe-table-column prop="time" label="Time" width="200"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" width="300" show-overflow></vxe-table-column>
      <vxe-table-column prop="updateTime" label="UpdateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="createTime" label="CreateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="attr1" label="Attr1" width="200"></vxe-table-column>
      <vxe-table-column prop="attr2" label="Attr2" width="200"></vxe-table-column>
      <vxe-table-column prop="attr3" label="Attr3" width="200"></vxe-table-column>
      <vxe-table-column prop="attr4" label="Attr4" width="200"></vxe-table-column>
      <vxe-table-column prop="attr5" label="Attr5" width="200"></vxe-table-column>
      <vxe-table-column prop="attr6" label="Attr6" width="200"></vxe-table-column>
      <vxe-table-column prop="attr7" label="Attr7" width="200"></vxe-table-column>
      <vxe-table-column prop="attr8" label="Attr8" width="200"></vxe-table-column>
      <vxe-table-column prop="attr9" label="Attr9" width="200"></vxe-table-column>
      <vxe-table-column prop="createTime" label="CreateTime" width="200"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      validRules: {
        name: [
          { required: true, message: '名称必须填写' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [
          { required: true, message: '性别必须填写' }
        ]
      }
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      let tableData = window.MOCK_DATA_LIST.slice(0, 10000)
      // 阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
      if (this.$refs.xTable) {
        this.$refs.xTable.loadData(tableData)
      }
      this.loading = false
    }, 300)
  },
  methods: {
    validEvent () {
      this.$refs.xTable.validate(valid => {
        if (valid) {
          this.$XMsg.message({ status: 'success', message: '校验成功！' })
        } else {
          this.$XMsg.message({ status: 'error', message: '校验不通过！' })
        }
      })
    },
    fullValidEvent () {
      this.$refs.xTable.fullValidate((valid, errMap) => {
        if (valid) {
          this.$XMsg.message({ status: 'success', message: '校验成功！' })
        } else {
          let msgList = []
          Object.values(errMap).forEach(errList => {
            errList.forEach(params => {
              let { rowIndex, column, rules } = params
              rules.forEach(rule => {
                msgList.push(`第 ${rowIndex} 行 ${column.label} 校验错误：${rule.message}`)
              })
            })
          })
          this.$XMsg.message({
            status: 'error',
            message: () => {
              return [
                <div class="red" style="max-height: 400px;overflow: auto;">
                  {
                    msgList.map(msg => {
                      return <div>{ msg }</div>
                    })
                  }
                </div>
              ]
            }
          })
        }
      })
    },
    selectValidEvent () {
      let selectRecords = this.$refs.xTable.getSelectRecords()
      if (selectRecords.length > 0) {
        this.$refs.xTable.validate(selectRecords, valid => {
          if (valid) {
            this.$XMsg.message({ status: 'success', message: '校验成功！' })
          } else {
            this.$XMsg.message({ status: 'error', message: '校验不通过！' })
          }
        })
      } else {
        this.$XMsg.message({ status: 'warning', message: '未选中数据！' })
      }
    },
    insertEvent () {
      this.$refs.xTable.insert().then(({ row }) => {
        // 插入一条数据并触发校验
        this.$refs.xTable.validate(row, valid => {
          if (valid) {

          }
        })
      })
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XMsg.alert(insertRecords.length)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTable.getRemoveRecords()
      this.$XMsg.alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTable.getUpdateRecords()
      this.$XMsg.alert(updateRecords.length)
    }
  }
}
</script>
