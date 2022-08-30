<template>
  <div>
    <h2>{{ $t('app.aside.nav.icon') }}</h2>
    <p class="tip">内置轻量级的 css 图标，可以通过 <router-link class="link" :to="{name: 'StartIcons'}">setup</router-link> 替换为 font 图标，例如第三方图标库：font-awesome、inconfont</p>

    <ul class="vxe-row icon-list" title="点击复制内容">
      <li class="vxe-col--4" v-for="name in iconList" :key="name">
        <i :class="`${prefixClass}${name}`"></i>
        <div class="title">{{ prefixClass }}{{ name }}</div>
      </li>
    </ul>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEClipboard from 'xe-clipboard'

export default {
  data () {
    return {
      prefixClass: 'vxe-icon-',
      iconList: ['add', 'alipay', 'arrow-double-left', 'arrow-double-right', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'bell', 'bell-fill', 'calendar', 'caret-down', 'caret-left', 'caret-right', 'caret-up', 'chart-bar-x', 'chart-bar-y', 'chart-line', 'chart-pie', 'chart-radar', 'chat', 'chat-fill', 'check', 'checkbox-checked', 'checkbox-indeterminate', 'checkbox-unchecked', 'close', 'cloud-download', 'cloud-upload', 'comment', 'company', 'copy', 'custom-column', 'cut', 'delete', 'delete-fill', 'dot', 'download', 'edit', 'ellipsis-h', 'ellipsis-v', 'envelope', 'envelope-fill', 'envelope-open', 'envelope-open-fill', 'error-circle', 'error-circle-fill', 'exclamation', 'eye-fill', 'eye-fill-close', 'file-excel', 'file-image', 'file-markdown', 'file-pdf', 'file-ppt', 'file-txt', 'file-word', 'file-zip', 'fixed', 'fixed-fill', 'flow-branch', 'folder', 'folder-open', 'fullscreen', 'funnel', 'home', 'home-fill', 'indicator', 'info-circle', 'info-circle-fill', 'information', 'link', 'lock', 'lock-fill', 'maximize', 'menu', 'merge-cells', 'message-fill', 'minimize', 'minus', 'num-list', 'paste', 'picture', 'picture-fill', 'print', 'question', 'question-circle', 'question-circle-fill', 'radio-checked', 'radio-unchecked', 'refresh', 'repeat', 'save', 'search', 'search-zoom-in', 'send', 'send-fill', 'setting', 'setting-fill', 'sort', 'sort-alpha-asc', 'sort-alpha-desc', 'sort-numeric-asc', 'sort-numeric-desc', 'spinner', 'square', 'square-caret-right', 'square-caret-right-fill', 'square-checked', 'square-checked-fill', 'square-close', 'square-close-fill', 'square-down', 'square-down-fill', 'square-fill', 'square-left', 'square-left-fill', 'square-minus', 'square-minus-fill', 'square-plus', 'square-plus-fill', 'square-plus-square', 'square-right', 'square-right-fill', 'square-square', 'square-up', 'square-up-fill', 'star', 'star-fill', 'star-half', 'success-circle', 'success-circle-fill', 'swap', 'swap-left', 'swap-right', 'table', 'undo', 'unlock', 'unlock-fill', 'upload', 'user', 'user-fill', 'voice', 'voice-fill', 'warning-circle', 'warning-triangle', 'warning-triangle-fill', 'warnion-circle-fill', 'wechat', 'zoom-in', 'zoom-out'],
      demoCodes: [
        `
        <i class="vxe-icon-delete"></i>
        `
      ]
    }
  },
  methods: {
    copyEvent ({ icon }) {
      if (XEClipboard.copy(icon)) {
        this.$XModal.message({ content: '已复制到剪贴板！', status: 'success' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-list {
  font-size: 26px;
  text-align: center;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  overflow: hidden;
  margin: 0;
  &:after {
    content: "";
    clear: both;
  }
  & > li {
    height: 100px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    padding-top: 10px;
    & > i {
      color: #606266;
      border-color: #606266;
    }
    &:hover {
      & > i {
        color: #5CB6FF;
        border-color: #5CB6FF;
      }
    }
    .title {
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>
