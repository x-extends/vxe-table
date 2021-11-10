<template>
  <code ref="code">
    <slot>{{ content }}</slot>
  </code>
</template>

<script>
export default {
  name: 'PreCode',
  props: {
    content: String
  }
}
</script>
