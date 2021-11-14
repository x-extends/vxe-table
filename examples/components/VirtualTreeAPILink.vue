<template>
  <span>{{ prop || name }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VirtualTreeApiLink',
  props: {
    name: String,
    prop: String
  }
})
</script>
