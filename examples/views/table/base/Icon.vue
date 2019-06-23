<template>
  <div>
    <p>内置的小图标，可以通过全局参数 <router-link class="link" :to="{name: 'Use'}">iconMap</router-link> 更改</p>
    <ul class="icon-list">
      <li v-for="item in list" :key="item.icon" @click="copyEvent(item)" title="点击复制">
        <i :class="item.icon"></i>
        <div class="title">{{ item.icon }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import XEClipboard from 'xe-clipboard'

export default {
  data () {
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
          icon: 'vxe-icon--d-arrow-top'
        },
        {
          icon: 'vxe-icon--d-arrow-bottom'
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
          icon: 'vxe-icon--funnel'
        },
        {
          icon: 'vxe-icon--edit-outline'
        },
        {
          icon: 'vxe-icon--more'
        },
        {
          icon: 'vxe-icon--close'
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
        }
      ]
    }
  },
  methods: {
    copyEvent ({ icon }) {
      if (XEClipboard.copy(icon)) {
        this.$XMsg.message({ message: '已复制到剪贴板！', status: 'success' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-list {
  font-size: 30px;
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
    float: left;
    height: 100px;
    width: 16.66%;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    & > i {
      border-color: #000;
      color: #000;
    }
    .title {
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>
