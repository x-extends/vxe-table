import GlobalConfig from './conf'

export function setTheme (options: any) {
  const theme = (options ? options.theme : null) || GlobalConfig.theme || 'default'
  if (typeof document !== 'undefined') {
    const documentElement = document.documentElement
    if (documentElement) {
      documentElement.setAttribute('data-vxe-table-theme', theme)
    }
  }
}
