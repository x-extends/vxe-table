import { createI18n } from 'vue-i18n'

import tableZhCN from '../../packages/locale/lang/zh-CN'
import tableZhTC from '../../packages/locale/lang/zh-TC'
import tableEnUS from '../../packages/locale/lang/en-US'

import myZhCN from './lang/zh-CN'
import myZhTC from './lang/zh-TC'
import myEnUS from './lang/en-US'

const languageList = ['zh_CN', 'zh_TC', 'en_US']
const customLanguage = localStorage.getItem('language')

const i18n = createI18n({
  warnHtmlMessage: false,
  locale: customLanguage && languageList.includes(customLanguage) ? customLanguage : ['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'].includes(navigator.language) ? 'zh_CN' : 'en_US',
  messages: {
    zh_CN: {
      ...tableZhCN,
      ...myZhCN
    },
    zh_TC: {
      ...tableZhTC,
      ...myZhTC
    },
    en_US: {
      ...tableEnUS,
      ...myEnUS
    }
  }
})

export default i18n
