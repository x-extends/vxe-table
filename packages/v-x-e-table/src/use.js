import Interceptor from './interceptor'
import Renderer from './renderer'
import setup from './setup'

const installedPlugins = []

function use (Plugin, options) {
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install({ setup, interceptor: Interceptor, renderer: Renderer }, options)
      installedPlugins.push(Plugin)
    }
  }
}

export default use
