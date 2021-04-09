<template>
  <div>
    <h2>{{ $t('app.aside.nav.icon') }}</h2>
    <p class="tip">内置轻量级的 css 图标，可以通过 <router-link class="link" :to="{name: 'StartIcons'}">setup</router-link> 替换为 font 图标，例如第三方图标库：font-awesome、inconfont</p>

    <ul class="vxe-row icon-list" title="点击复制内容">
      <li class="vxe-col--4" v-for="item in list" :key="item.icon" @click="copyEvent(item)">
        <i :class="item.icon"></i>
        <div class="title">{{ item.icon }}</div>
      </li>
    </ul>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VXETable } from '../../../packages/all'
import XEClipboard from 'xe-clipboard'

interface ItemVO {
  icon: string;
}

export default defineComponent({
  setup () {
    const copyEvent = ({ icon }: ItemVO) => {
      if (XEClipboard.copy(icon)) {
        VXETable.modal.message({ content: '已复制到剪贴板！', status: 'success' })
      }
    }
    return {
      list: [
        {
          icon: 'vxe-icon--caret-top'
        },
        {
          icon: 'vxe-icon--caret-bottom'
        },
        {
          icon: 'vxe-icon--caret-left'
        },
        {
          icon: 'vxe-icon--caret-right'
        },
        {
          icon: 'vxe-icon--arrow-top'
        },
        {
          icon: 'vxe-icon--arrow-bottom'
        },
        {
          icon: 'vxe-icon--arrow-left'
        },
        {
          icon: 'vxe-icon--arrow-right'
        },
        {
          icon: 'vxe-icon--d-arrow-left'
        },
        {
          icon: 'vxe-icon--d-arrow-right'
        },
        {
          icon: 'vxe-icon--menu'
        },
        {
          icon: 'vxe-icon--edit-outline'
        },
        {
          icon: 'vxe-icon--more'
        },
        {
          icon: 'vxe-icon--check'
        },
        {
          icon: 'vxe-icon--close'
        },
        {
          icon: 'vxe-icon--plus'
        },
        {
          icon: 'vxe-icon--minus'
        },
        {
          icon: 'vxe-icon--refresh'
        },
        {
          icon: 'vxe-icon--refresh roll'
        },
        {
          icon: 'vxe-icon--funnel'
        },
        {
          icon: 'vxe-icon--question'
        },
        {
          icon: 'vxe-icon--info'
        },
        {
          icon: 'vxe-icon--warning'
        },
        {
          icon: 'vxe-icon--success'
        },
        {
          icon: 'vxe-icon--error'
        },
        {
          icon: 'vxe-icon--remove'
        },
        {
          icon: 'vxe-icon--circle-plus'
        },
        {
          icon: 'vxe-icon--zoomin'
        },
        {
          icon: 'vxe-icon--zoomout'
        },
        {
          icon: 'vxe-icon--upload'
        },
        {
          icon: 'vxe-icon--download'
        },
        {
          icon: 'vxe-icon--eye'
        },
        {
          icon: 'vxe-icon--eye-slash'
        },
        {
          icon: 'vxe-icon--calendar'
        },
        {
          icon: 'vxe-icon--dot'
        },
        {
          icon: 'vxe-icon--print'
        },
        {
          icon: 'vxe-icon--search'
        }
      ] as ItemVO[],
      copyEvent,
      demoCodes: [
        `
        <i class="vxe-icon--caret-top"></i>
        `
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.icon-list {
  font-size: 26px;
  text-align: center;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  overflow: hidden;
  margin: 0;
  padding: 0;
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
