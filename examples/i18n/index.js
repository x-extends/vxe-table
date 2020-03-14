import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tableEnUS from '../../packages/locale/lang/en-US'
import tableZhCN from '../../packages/locale/lang/zh-CN'
import tableZhTW from '../../packages/locale/lang/zh-TW'
import tableJAJP from '../../packages/locale/lang/ja-JP'

import myEnUS from './lang/en-US'
import myZhCN from './lang/zh-CN'
import myZhTW from './lang/zh-TW'
import myJAJP from './lang/ja-JP'

Vue.use(VueI18n)

const languageList = ['zh_CN', 'zh_TW', 'zh_TW', 'ja_JP']
const customLanguage = localStorage.getItem('language')

const i18n = new VueI18n({
  /* eslint-disable @typescript-eslint/camelcase */
  locale: customLanguage && languageList.includes(customLanguage) ? customLanguage : ['zh-CN', 'zh-TW'].includes(navigator.language) ? 'zh_CN' : 'en_US',
  messages: {
    en_US: {
      ...tableEnUS,
      ...myEnUS
    },
    zh_CN: {
      ...tableZhCN,
      ...myZhCN
    },
    zh_TW: {
      ...tableZhTW,
      ...myZhTW
    },
    ja_JP: {
      ...tableJAJP,
      ...myJAJP
    }
  }
})

export default i18n
