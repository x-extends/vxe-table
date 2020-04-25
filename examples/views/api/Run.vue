<template>
  <div class="run-view">
    <div class="run-header">
      <vxe-button>运行</vxe-button>
    </div>
    <div class="run-body">
      <div class="left">
        <div class="code-wrapper">
          <div ref="runHTML"></div>
        </div>
        <div class="code-wrapper">
          <div ref="runJS"></div>
        </div>
      </div>
      <div class="right">
        <div class="code-wrapper">
          <div ref="runCSS"></div>
        </div>
        <div class="code-wrapper">
          <div ref="runDemo"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'

export default {
  created () {
    this.$nextTick(() => {
      CodeMirror(this.$refs.runHTML, {
        lineNumbers: true,
        mode: 'htmlmixed'
      })
      CodeMirror(this.$refs.runJS, {
        lineNumbers: true,
        mode: 'javascript'
      })
      CodeMirror(this.$refs.runCSS, {
        lineNumbers: true,
        mode: 'css'
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.run-body {
  height: 100%;
  display: flex;
  flex-direction: row;
  & > .left,
  & > .right {
    width: 50%;
    flex-grow: 1;
  }
  .code-wrapper {
    overflow: auto;
  }
}
</style>
