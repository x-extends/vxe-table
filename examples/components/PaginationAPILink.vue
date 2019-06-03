<template>
  <router-link class="link" :to="{name: 'TableAPI', params: {name: 'pagination'}, query: {filterName: prop}}">{{ prop || name }}</router-link>
</template>

<script>
export default {
  name: 'PaginationApiLink',
  props: {
    name: String,
    prop: String
  }
}
</script>
