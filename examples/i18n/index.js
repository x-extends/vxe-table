import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tableZhCN from '../../packages/locale/lang/zh-CN'
import tableZhTC from '../../packages/locale/lang/zh-TC'
import tableEnUS from '../../packages/locale/lang/en-US'
import tableJAJP from '../../packages/locale/lang/ja-JP'

import myZhCN from './lang/zh-CN'
import myZhTC from './lang/zh-TC'
import myEnUS from './lang/en-US'
import myJAJP from './lang/ja-JP'

Vue.use(VueI18n)

const languageList = ['zh_CN', 'zh_TC', 'en-US']
const customLanguage = localStorage.getItem('language')

const i18n = new VueI18n({
  /* eslint-disable @typescript-eslint/camelcase */
  locale: customLanguage && languageList.includes(customLanguage) ? customLanguage : ['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'].includes(navigator.language) ? 'zh_CN' : 'en_US',
  messages: {
    en_US: {
      ...tableEnUS,
      ...myEnUS
    },
    zh_CN: {
      ...tableZhCN,
      ...myZhCN
    },
    zh_TC: {
      ...tableZhTC,
      ...myZhTC
    },
    ja_JP: {
      ...tableJAJP,
      ...myJAJP
    }
  }
})

export default i18n
