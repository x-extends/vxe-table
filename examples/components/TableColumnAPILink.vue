<template>
  <router-link class="link" :to="{name: 'TableAPI', params: {name: 'table-column'}, query: {filterName: prop}}">{{ prop || name }}</router-link>
</template>

<script>
export default {
  name: 'TableColumnApiLink',
  props: {
    name: String,
    prop: String
  }
}
</script>
