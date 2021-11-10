<template>
  <code ref="codeElem">
    <slot>{{ content }}</slot>
  </code>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, Ref } from 'vue'

export default defineComponent({
  name: 'PreCode',
  props: {
    content: String
  }
})
</script>
