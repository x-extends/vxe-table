<template>
  <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'toolbar'}, query: {filterName: prop}}">{{ prop || name }}</router-link>
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
