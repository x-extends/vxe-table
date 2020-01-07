import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tableEnUS from '../../packages/locale/lang/en-US'
import tableZhCN from '../../packages/locale/lang/zh-CN'
import elementEn from 'element-ui/lib/locale/lang/en'
import elementZhCN from 'element-ui/lib/locale/lang/zh-CN'

import myEnUS from './lang/en-US'
import myZhCN from './lang/zh-CN'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: ['zh-CN', 'zh-TW'].includes(navigator.language) ? 'zh_CN' : 'en_US',
  messages: {
    en_US: {
      ...tableEnUS,
      ...elementEn,
      ...myEnUS
    },
    zh_CN: {
      ...tableZhCN,
      ...elementZhCN,
      ...myZhCN
    }
  }
})

export default i18n
