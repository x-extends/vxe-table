<template>
  <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'grid'}, query: {filterName: prop}}">{{ prop || name }}</router-link>
</template>

<script>
export default {
  name: 'GridApiLink',
  props: {
    name: String,
    prop: String
  }
}
</script>
