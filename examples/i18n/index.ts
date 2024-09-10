import Vue from 'vue'
import VueI18n from 'vue-i18n'

import myZhCN from './lang/zh-CN'
import myZhTC from './lang/zh-TC'
import myEnUS from './lang/en-US'

Vue.use(VueI18n)

const languageList = ['zh_CN', 'zh_TC', 'en_US']
const customLanguage = localStorage.getItem('language')

const i18n = new VueI18n({
  locale: customLanguage && languageList.includes(customLanguage) ? customLanguage : ['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'].includes(navigator.language) ? 'zh_CN' : 'en_US',
  messages: {
    zh_CN: {
      ...myZhCN
    },
    zh_TC: {
      ...myZhTC
    },
    en_US: {
      ...myEnUS
    }
  }
})

export default i18n
