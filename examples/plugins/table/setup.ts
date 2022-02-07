import i18n from '@/i18n'

import { VXETable } from '../../../packages/all'

// 设置默认参数
VXETable.setup({
  table: {
    exportConfig: {
      types: ['csv', 'html', 'xml', 'txt']
    },
    scrollY: {
      mode: 'wheel'
    }
  },
  translate: (key: any) => key && key.indexOf('app.') > -1 ? i18n.global.t(key) : key,
  i18n: (key: any, args?: any) => i18n.global.t(key, args)
})
