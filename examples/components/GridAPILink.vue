<template>
  <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'grid'}, query: {filterName: prop}}">{{ prop || name }}</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GridApiLink',
  props: {
    name: String,
    prop: String
  }
})
</script>
