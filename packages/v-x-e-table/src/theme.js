import GlobalConfig from '../../v-x-e-table/src/conf'

export function setTheme (name) {
  let theme = name || GlobalConfig.theme
  if (!theme || theme === 'default') {
    theme = 'light'
  }
  if (typeof document !== 'undefined') {
    const documentElement = document.documentElement
    if (documentElement) {
      documentElement.setAttribute('data-vxe-ui-theme', theme)
    }
  }
}
