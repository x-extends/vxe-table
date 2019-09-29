<template>
  <div>
    <p class="tip">附加上传，使用 <a class="link" href="https://element.eleme.cn/#/zh-CN/component/upload" target="_black">el-upload</a> 上传附件</p>

    <el-progress type="circle" :status="uploadStatus" :percentage="uploadPercentage"></el-progress>

    <vxe-toolbar>
      <template v-slot:buttons>
        <el-upload
          ref="elUpload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :show-file-list="false"
          :on-progress="handleProgress"
          :on-success="handleSuccess"
          :on-error="handleError">
          <el-button size="small" type="primary" @click="clickEvent">点击上传</el-button>
        </el-upload>
        <vxe-button @click="delSelectedEvent">删除选中</vxe-button>
        <vxe-button @click="getDataEvent">获取数据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      class="vxe-table-element"
      height="400"
      :data="tableData">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="File Name"></vxe-table-column>
      <vxe-table-column field="size" title="File Size" :formatter="formatterSize"></vxe-table-column>
      <vxe-table-column field="createDate" title="Create Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
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
      tableData: [],
      uploadStatus: null,
      uploadPercentage: 0,
      demoCodes: [
        `
        <el-progress type="circle" :status="uploadStatus" :percentage="uploadPercentage"></el-progress>

        <vxe-toolbar>
          <template v-slot:buttons>
            <el-upload
              ref="elUpload"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :show-file-list="false"
              :on-progress="handleProgress"
              :on-success="handleSuccess"
              :on-error="handleError">
              <el-button size="small" type="primary" @click="clickEvent">点击上传</el-button>
            </el-upload>
            <vxe-button @click="delSelectedEvent">删除选中</vxe-button>
            <vxe-button @click="getDataEvent">获取数据</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          ref="xTable"
          class="vxe-table-element"
          height="400"
          :data="tableData">
          <vxe-table-column type="selection" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="File Name"></vxe-table-column>
          <vxe-table-column field="size" title="File Size" :formatter="formatterSize"></vxe-table-column>
          <vxe-table-column field="createDate" title="Create Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              uploadStatus: null,
              uploadPercentage: 0
            }
          },
          methods: {
            formatterSize ({ cellValue }) {
              let size = this.$utils.toNumber(cellValue)
              if (size > 1024) {
                if (size > 1048576) {
                  return \`\${this.$utils.toFixedNumber(size / 1048576, 2)}M\`
                }
                return \`\${this.$utils.toFixedNumber(size / 1024, 2)}KB\`
              }
              return \`\${size}B\`
            },
            clickEvent () {
              this.uploadStatus = null
              this.uploadPercentage = 0
            },
            handleProgress (event, file, fileList) {
              if (event.lengthComputable) {
                this.uploadPercentage = parseInt(100 * event.loaded / event.total)
              }
            },
            handleSuccess (response, file, fileList) {
              this.tableData.push({
                name: file.name,
                size: file.size,
                createDate: this.$utils.toDateString(Date.now(), 'yyyy-MM-dd hh:mm:ss')
              })
              this.uploadStatus = 'success'
            },
            handleError (err, file, fileList) {
              if (err) {
                this.uploadStatus = 'exception'
              }
            },
            delSelectedEvent () {
              let selectRecords = this.$refs.xTable.getSelectRecords()
              this.tableData = this.tableData.filter(row => !selectRecords.includes(row))
            },
            getDataEvent () {
              this.$XModal.alert(this.tableData.length)
            }
          }
        }
        `,
        `
        .upload-demo {
          display: inline-block;
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatterSize ({ cellValue }) {
      let size = this.$utils.toNumber(cellValue)
      if (size > 1024) {
        if (size > 1048576) {
          return `${this.$utils.toFixedNumber(size / 1048576, 2)}M`
        }
        return `${this.$utils.toFixedNumber(size / 1024, 2)}KB`
      }
      return `${size}B`
    },
    clickEvent () {
      this.uploadStatus = null
      this.uploadPercentage = 0
    },
    handleProgress (event, file, fileList) {
      if (event.lengthComputable) {
        this.uploadPercentage = parseInt(100 * event.loaded / event.total)
      }
    },
    handleSuccess (response, file, fileList) {
      this.tableData.push({
        name: file.name,
        size: file.size,
        createDate: this.$utils.toDateString(Date.now(), 'yyyy-MM-dd hh:mm:ss')
      })
      this.uploadStatus = 'success'
    },
    handleError (err, file, fileList) {
      if (err) {
        this.uploadStatus = 'exception'
      }
    },
    delSelectedEvent () {
      let selectRecords = this.$refs.xTable.getSelectRecords()
      this.tableData = this.tableData.filter(row => !selectRecords.includes(row))
    },
    getDataEvent () {
      this.$XModal.alert(this.tableData.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
  display: inline-block;
}
</style>
