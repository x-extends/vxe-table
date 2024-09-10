import { VxeUI } from '@vxe-ui/core'

const { log } = VxeUI

const version = `table v${process.env.VUE_APP_VXE_VERSION}`

export const warnLog = log.create('warn', version)
export const errLog = log.create('error', version)
