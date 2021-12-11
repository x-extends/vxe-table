<template>
  <code ref="codeElem">
    <slot>{{ content }}</slot>
  </code>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PreCode',
  props: {
    content: String
  }
})
</script>
