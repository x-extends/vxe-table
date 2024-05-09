import GlobalConfig from '../../v-x-e-table/src/conf'

export function setTheme (options) {
  const theme = (options ? options.theme : null) || GlobalConfig.theme || 'default'
  if (typeof document !== 'undefined') {
    const documentElement = document.documentElement
    if (documentElement) {
      documentElement.setAttribute('data-vxe-table-theme', theme)
    }
  }
}
