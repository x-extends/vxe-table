import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocat from './lang/en'
import zhCNLocat from './lang/zh-CN'
import tableEn from '../../lib/locale/lang/en'
import tableZhCN from '../../lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: {
    en: {
      ...tableEn,
      ...enLocat
    },
    'zh-CN': {
      ...tableZhCN,
      ...zhCNLocat
    }
  }
})

export default i18n
