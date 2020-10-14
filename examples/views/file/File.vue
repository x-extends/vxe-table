<template>
  <div>
    <p class="tip">
      文件操作<br>
      给 vue 实例挂载属性：<br>
      Vue.prototype.$XSaveFile = VXETable.saveFile<br>
      Vue.prototype.$XReadFile = VXETable.readFile<br>
    </p>

    <p>
      <vxe-button @click="clickEvent1">读取一个文件</vxe-button>
      <vxe-button @click="clickEvent2">读取指定类型文件</vxe-button>
      <vxe-button @click="clickEvent3">读取多个文件</vxe-button>
    </p>

    <p>
      <vxe-button @click="clickEvent6">保存为txt文件</vxe-button>
      <vxe-button @click="clickEvent7">保存为html文件</vxe-button>
    </p>

    <p>
      <vxe-button @click="clickEvent10">下载文件</vxe-button>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'

export default {
  data () {
    return {
      demoCodes: [
        `
        <p>
          <vxe-button @click="clickEvent1">读取一个文件</vxe-button>
          <vxe-button @click="clickEvent2">读取指定类型文件</vxe-button>
          <vxe-button @click="clickEvent3">读取多个文件</vxe-button>
        </p>

        <p>
          <vxe-button @click="clickEvent6">保存为txt文件</vxe-button>
          <vxe-button @click="clickEvent7">保存为html文件</vxe-button>
        </p>

        <p>
          <vxe-button @click="clickEvent10">下载文件</vxe-button>
        </p>
        `,
        `
        export default {
          methods: {
            async clickEvent1 () {
              try {
                const { file } = await this.$XReadFile()
                this.$XModal.alert(\`文件名：\${file.name}，文件大小：\${file.size}\`)
              } catch (e) {}
            },
            async clickEvent2 () {
              try {
                const { file } = await this.$XReadFile({
                  types: ['xlsx', 'html']
                })
                this.$XModal.alert(\`文件名：\${file.name}，文件大小：\${file.size}\`)
              } catch (e) {}
            },
            async clickEvent3 () {
              try {
                const { files } = await this.$XReadFile({
                  multiple: true
                })
                this.$XModal.alert(\`共：\${files.length} 个文件\`)
              } catch (e) {}
            },
            clickEvent6 () {
              this.$XSaveFile({
                filename: '文本',
                type: 'txt',
                content: '内容xxx'
              })
            },
            clickEvent7 () {
              this.$XSaveFile({
                filename: '页面',
                type: 'html',
                content: '<html><head></head><body>内容xx</body></html>'
              })
            },
            clickEvent10 () {
              // 请求文件
              XEAjax.fetch('/vxe-table/static/other/img2.gif').then(response => {
                response.blob().then(blob => {
                  // 下载到本地
                  this.$XSaveFile({ filename: '图片', type: 'gif', content: blob })
                })
              })
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    async clickEvent1 () {
      try {
        const { file } = await this.$XReadFile()
        this.$XModal.alert(`文件名：${file.name}，文件大小：${file.size}`)
      } catch (e) {}
    },
    async clickEvent2 () {
      try {
        const { file } = await this.$XReadFile({
          types: ['xlsx', 'html']
        })
        this.$XModal.alert(`文件名：${file.name}，文件大小：${file.size}`)
      } catch (e) {}
    },
    async clickEvent3 () {
      try {
        const { files } = await this.$XReadFile({
          multiple: true
        })
        this.$XModal.alert(`共：${files.length} 个文件`)
      } catch (e) {}
    },
    clickEvent6 () {
      this.$XSaveFile({
        filename: '文本',
        type: 'txt',
        content: '内容xxx'
      })
    },
    clickEvent7 () {
      this.$XSaveFile({
        filename: '页面',
        type: 'html',
        content: '<html><head></head><body>内容xx</body></html>'
      })
    },
    clickEvent10 () {
      // 请求文件
      XEAjax.fetch('/vxe-table/static/other/img2.gif').then(response => {
        response.blob().then(blob => {
          // 下载到本地
          this.$XSaveFile({ filename: '图片', type: 'gif', content: blob })
        })
      })
    }
  }
}
</script>
