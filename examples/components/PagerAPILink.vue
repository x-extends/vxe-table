<template>
  <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'pager'}, query: {filterName: prop}}">{{ prop || name }}</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PagerApiLink',
  props: {
    name: String,
    prop: String
  }
})
</script>
