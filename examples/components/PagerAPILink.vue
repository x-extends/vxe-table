<template>
  <router-link class="link" :to="{name: 'TableAPI', params: {name: 'pager'}, query: {filterName: prop}}">{{ prop || name }}</router-link>
</template>

<script>
export default {
  name: 'PagerApiLink',
  props: {
    name: String,
    prop: String
  }
}
</script>
