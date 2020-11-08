<template>
  <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'toolbar'}, query: {filterName: prop}}">{{ prop || name }}</router-link>
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
