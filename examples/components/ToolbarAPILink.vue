<template>
  <router-link class="link" :to="{name: 'TableAPI', params: {name: 'toolbar'}, query: {filterName: prop}}">{{ prop || name }}</router-link>
</template>

<script>
export default {
  name: 'ToolbarApiLink',
  props: {
    name: String,
    prop: String
  }
}
</script>
