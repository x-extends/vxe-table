<template>
  <div>
    <p class="tip">
      读取本地文件<br>
      给 vue 实例挂载属性：<br>
      Vue.prototype.$XReadFile = VXETable.readFile<br>
    </p>

    <vxe-button @click="clickEvent1">读取一个文件</vxe-button>
    <vxe-button @click="clickEvent2">读取指定类型文件</vxe-button>
    <vxe-button @click="clickEvent3">读取多个文件</vxe-button>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      demoCodes: [
        `
        <vxe-button @click="clickEvent1">读取一个文件</vxe-button>
        <vxe-button @click="clickEvent2">读取多个文件</vxe-button>
        `,
        `
        export default {
          methods: {
            async clickEvent1 () {
              try {
                const event = await this.$XReadFile()
                const file = event.target.files[0]
                this.$XModal.alert(\`文件名：\${file.name}，文件大小：\${file.size}\`)
              } catch (e) {}
            },
            async clickEvent2 () {
              try {
                const event = await this.$XReadFile({
                  types: ['xlsx', 'html']
                })
                const file = event.target.files[0]
                this.$XModal.alert(\`文件名：\${file.name}，文件大小：\${file.size}\`)
              } catch (e) {}
            },
            async clickEvent3 () {
              try {
                const event = await this.$XReadFile({
                  multiple: true
                })
                const files = event.target.files
                this.$XModal.alert(\`共：\${files.length} 个文件\`)
              } catch (e) {}
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
        const event = await this.$XReadFile()
        const file = event.target.files[0]
        this.$XModal.alert(`文件名：${file.name}，文件大小：${file.size}`)
      } catch (e) {}
    },
    async clickEvent2 () {
      try {
        const event = await this.$XReadFile({
          types: ['xlsx', 'html']
        })
        const file = event.target.files[0]
        this.$XModal.alert(`文件名：${file.name}，文件大小：${file.size}`)
      } catch (e) {}
    },
    async clickEvent3 () {
      try {
        const event = await this.$XReadFile({
          multiple: true
        })
        const files = event.target.files
        this.$XModal.alert(`共：${files.length} 个文件`)
      } catch (e) {}
    }
  }
}
</script>
