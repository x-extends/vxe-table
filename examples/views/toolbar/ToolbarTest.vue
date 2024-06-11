<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <button>按钮1</button>
        <button>按钮2</button>
        <button>按钮3</button>
      </template>
      <template #tools>
        <button>按钮4</button>
        <button @click="funnelEvent">按钮5</button>
      </template>
    </vxe-toolbar>
  </div>
</template>

<script lang="ts" setup>
const funnelEvent = () => {
  alert('点击事件')
}
</script>
