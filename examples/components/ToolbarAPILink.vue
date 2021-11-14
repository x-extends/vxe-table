<template>
  <span>{{ prop || name }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolbarApiLink',
  props: {
    name: String,
    prop: String
  }
})
</script>
