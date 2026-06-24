import { VxeUI } from '@vxe-ui/core'

const { log } = VxeUI

const tableVersion = `table v${process.env.VUE_APP_VXE_VERSION}`

export function createComponentLog (name: string) {
  const uiVersion = VxeUI.uiVersion ? `ui v${VxeUI.uiVersion}` : ''
  const ganttVersion = VxeUI.ganttVersion ? `gantt v${VxeUI.ganttVersion}` : ''
  const designVersion = VxeUI.designVersion ? `design v${VxeUI.designVersion}` : ''
  const versionInfo = [uiVersion, tableVersion, ganttVersion, designVersion].join(' ')
  return {
    warnLog: log.create('warn', versionInfo + '] [' + name),
    errLog: log.create('error', versionInfo + '] [' + name)
  }
}

export const warnLog = log.create('warn', tableVersion)
export const errLog = log.create('error', tableVersion)
