import GlobalConfig from './conf'

export function setTheme (name: any) {
  let theme = name || GlobalConfig.theme
  if (!theme || theme === 'default') {
    theme = 'light'
  }
  GlobalConfig.theme = theme
  if (typeof document !== 'undefined') {
    const documentElement = document.documentElement
    if (documentElement) {
      documentElement.setAttribute('data-vxe-ui-theme', theme)
    }
  }
}

export function getTheme () {
  return GlobalConfig.theme
}
