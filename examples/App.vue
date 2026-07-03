<template>
  <vxe-layout-container :size="componentsSize" vertical>
    <vxe-layout-header>
      <vxe-button @click="collapsed = !collapsed">折叠</vxe-button>
      <vxe-switch v-model="theme" close-value="light" open-value="dark" @change="changeTheme">主题切换</vxe-switch>
      <vxe-radio-group v-model="language" :options="langOptions" @change="changeLanguage"></vxe-radio-group>
      <vxe-radio-group class="switch-size" v-model="componentsSize" :options="sizeOptions" type="button" size="mini"></vxe-radio-group>
    </vxe-layout-header>
    <vxe-layout-container>
      <vxe-layout-aside class="page-layout-aside" :collapsed="collapsed">
        <VxeMenu :options="navList" />
      </vxe-layout-aside>
      <vxe-layout-container vertical>
        <vxe-layout-body padding>
          <RouterView />
        </vxe-layout-body>
        <vxe-layout-footer fixed>11111</vxe-layout-footer>
      </vxe-layout-container>
    </vxe-layout-container>
  </vxe-layout-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { VxeUI } from '../packages'

import { VxeMenuPropTypes, VxeLayoutContainerPropTypes } from 'vxe-pc-ui'

const collapsed = ref(false)

const componentsSize = ref<VxeLayoutContainerPropTypes.Size>('')
const sizeOptions = ref([
  { label: '默认', value: '' },
  { label: '中', value: 'medium' },
  { label: '小', value: 'small' },
  { label: '迷你', value: 'mini' }
])

const navList = ref<VxeMenuPropTypes.Options>([
  { name: 'Home', icon: 'vxe-icon-user-fill', routerLink: { path: '/' } },
  { name: 'ToolbarTest', routerLink: { name: 'ToolbarTest' } },
  { name: 'TableTest1', routerLink: { name: 'TableTest1' } },
  { name: 'TableTest2', routerLink: { name: 'TableTest2' } },
  { name: 'TableTest3', routerLink: { name: 'TableTest3' } },
  { name: 'TableTest4', routerLink: { name: 'TableTest4' } },
  { name: 'TableTest5', routerLink: { name: 'TableTest5' } },
  { name: 'TableTest6', routerLink: { name: 'TableTest6' } },
  { name: 'TableTest7', routerLink: { name: 'TableTest7' } },
  { name: 'TableTest8', routerLink: { name: 'TableTest8' } },
  { name: 'TableTest9', routerLink: { name: 'TableTest9' } },
  { name: 'TableTest10', routerLink: { name: 'TableTest10' } },
  { name: 'GridTest1', routerLink: { name: 'GridTest1' } },
  { name: 'GridTest2', routerLink: { name: 'GridTest2' } },
  { name: 'GridTest3', routerLink: { name: 'GridTest3' } },
  { name: 'GridTest4', routerLink: { name: 'GridTest4' } },
  { name: 'GridTest5', routerLink: { name: 'GridTest5' } },
  { name: 'TestKeepTest1', routerLink: { name: 'TestKeepTest1' } },
  { name: 'TestKeepTest2', routerLink: { name: 'TestKeepTest2' } },
  { name: 'TestKeepTest3', routerLink: { name: 'TestKeepTest3' } }
])

const theme = ref((localStorage.getItem('VXE_THEME') as 'light' | 'dark') || 'light')
VxeUI.setTheme(theme.value)
const changeTheme = () => {
  const themeName = VxeUI.getTheme() === 'dark' ? 'light' : 'dark'
  theme.value = themeName
  VxeUI.setTheme(themeName)
  localStorage.setItem('VXE_THEME', themeName)
}

const language = ref((localStorage.getItem('VXE_LANGUAGE') as 'zh-CN' | 'en-US') || 'zh-CN')
const langOptions = ref([
  { value: 'zh-CN', label: '中文' },
  { value: 'en-US', label: '英文' }
])
const changeLanguage = () => {
  VxeUI.setLanguage(language.value)
  localStorage.setItem('VXE_LANGUAGE', language.value)
}
</script>

<style lang="scss" scoped>
.nav {
  display: block;
}
.page-layout-aside {
  ::v-deep(.vxe-layout-aside--inner) {
    overflow-y: scroll;
  }
}
</style>
