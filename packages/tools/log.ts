import GlobalConfig from '../v-x-e-table/src/conf'

export function getLog (message: string, params?: any) {
  return `[vxe-table v${process.env.VUE_APP_VXE_TABLE_VERSION}] ${GlobalConfig.i18n(message, params)}`
}

function outLog (type: 'log' | 'warn' | 'error') {
  return function (message: string, params?: any) {
    const msg = getLog(message, params)
    console[type](msg)
    return msg
  }
}

export const warnLog = outLog('warn')
export const errLog = outLog('error')
