import Vue from 'vue'
import i18n from '@/i18n'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
