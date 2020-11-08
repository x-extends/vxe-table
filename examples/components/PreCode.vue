<template>
  <code ref="codeElem">
    <slot>{{ content }}</slot>
  </code>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, Ref } from 'vue'
import hljs from 'highlight.js'

export default defineComponent({
  name: 'PreCode',
  props: {
    content: String
  },
  setup () {
    const codeElem = ref() as Ref<HTMLElement>
    nextTick(() => {
      const block = codeElem.value
      hljs.highlightBlock(block)
    })
    return {
      codeElem
    }
  }
})
</script>
