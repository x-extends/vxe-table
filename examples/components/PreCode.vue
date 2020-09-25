<template>
  <code ref="code">
    <slot>{{ content }}</slot>
  </code>
</template>

<script>
import hljs from 'highlight.js'

export default {
  name: 'PreCode',
  props: {
    content: String
  },
  mounted () {
    const block = this.$el
    hljs.highlightBlock(block)
  }
}
</script>
