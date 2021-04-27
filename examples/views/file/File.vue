<template>
  <div>
    <p class="tip">
      读取本地文件<br>
      给 vue 实例挂载属性：<br>
      app.config.globalProperties.$XReadFile = VXETable.readFile<br>
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
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VXETable } from '../../../packages/all'

export default defineComponent({
  setup () {
    const clickEvent1 = async () => {
      try {
        const { file } = await VXETable.readFile()
        VXETable.modal.alert(`文件名：${file.name}，文件大小：${file.size}`)
      } catch (e) {}
    }

    const clickEvent2 = async () => {
      try {
        const { file } = await VXETable.readFile({
          types: ['xlsx', 'html']
        })
        VXETable.modal.alert(`文件名：${file.name}，文件大小：${file.size}`)
      } catch (e) {}
    }

    const clickEvent3 = async () => {
      try {
        const { files } = await VXETable.readFile({
          multiple: true
        })
        VXETable.modal.alert(`共：${files.length} 个文件`)
      } catch (e) {}
    }

    const clickEvent6 = () => {
      VXETable.saveFile({
        filename: '文本',
        type: 'txt',
        content: '内容xxx'
      })
    }

    const clickEvent7 = () => {
      VXETable.saveFile({
        filename: '页面',
        type: 'html',
        content: '<html><head></head><body>内容xx</body></html>'
      })
    }

    const clickEvent10 = () => {
      // 请求文件
      fetch('/vxe-table/static/other/img2.gif')
        .then(response => response.blob())
        .then(blob => {
          // 下载到本地
          VXETable.saveFile({ filename: '图片', type: 'gif', content: blob })
        })
    }

    return {
      clickEvent1,
      clickEvent2,
      clickEvent3,
      clickEvent6,
      clickEvent7,
      clickEvent10,
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
        import { defineComponent } from 'vue'
        import { VXETable } from 'vxe-table'

        export default defineComponent({
          setup () {
            const clickEvent1 = async () => {
              try {
                const { file } = await VXETable.readFile()
                VXETable.modal.alert(\`文件名：\${file.name}，文件大小：\${file.size}\`)
              } catch (e) {}
            }

            const clickEvent2 = async () => {
              try {
                const { file } = await VXETable.readFile({
                  types: ['xlsx', 'html']
                })
                VXETable.modal.alert(\`文件名：\${file.name}，文件大小：\${file.size}\`)
              } catch (e) {}
            }

            const clickEvent3 = async () => {
              try {
                const { files } = await VXETable.readFile({
                  multiple: true
                })
                VXETable.modal.alert(\`共：\${files.length} 个文件\`)
              } catch (e) {}
            }

            const clickEvent6 = () => {
              VXETable.saveFile({
                filename: '文本',
                type: 'txt',
                content: '内容xxx'
              })
            }

            const clickEvent7 = () => {
              VXETable.saveFile({
                filename: '页面',
                type: 'html',
                content: '<html><head></head><body>内容xx</body></html>'
              })
            }

            const clickEvent10 = () => {
              // 请求文件
              fetch('/vxe-table/static/other/img2.gif')
                .then(response => response.blob())
                .then(blob => {
                  // 下载到本地
                  VXETable.saveFile({ filename: '图片', type: 'gif', content: blob })
                })
            }

            return {
              clickEvent1,
              clickEvent2,
              clickEvent3,
              clickEvent6,
              clickEvent7,
              clickEvent10
            }
          }
        }
        `
      ]
    }
  }
})
</script>
