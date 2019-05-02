import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style/layout.scss'
import './plugins/highlight.js'
import './plugins/element.js'
import './plugins/index.js'
import './mock'
import XEUtils from 'xe-utils'
// import './plugins/iview.js'

Vue.config.productionTip = false

// 后台异步生成10万数据，为了避免大量运算卡主页面，生成大约需要15秒左右
var list = window.CACHE_DATA_LIST = []
var currTime = Date.now()
var fullIndex = 0
var size = 200000
function mockData () {
  for (var index = 0; index < 1000; index++) {
    currTime += 5000
    fullIndex++
    list.push({
      id: fullIndex,
      name: 'name_' + fullIndex,
      key: 'home.label.key' + index,
      language: index % 2 === 0 ? 'zh_CN' : 'en_US',
      checked: false,
      date: currTime,
      time: currTime + XEUtils.random(100, 10000),
      sex: index % 3 ? '0' : '1',
      age: index % 4 === 0 ? 30 : index % 3 === 0 ? 28 : index % 2 === 0 ? 26 : 24,
      region: index % 4 === 0 ? [19, 199, 1773] : index % 3 === 0 ? [9, 73, 719] : [1, 1, 5],
      rate: index % 4 === 0 ? 4 : index % 3 === 0 ? 3 : index % 2 === 0 ? 2 : 1,
      address: `地址 地址地址 地址地址 址地址址地址 址地址 址地址址地址址地址 地址${index}`,
      updateTime: currTime,
      createTime: currTime
    })
  }
  if (fullIndex < size) {
    setTimeout(mockData, 20)
  }
}

mockData()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
