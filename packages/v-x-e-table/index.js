import XEUtils from 'xe-utils'
import Interceptor from './src/interceptor'
import Renderer from './src/renderer'
import Setup from './src/setup'
import Use from './src/use'

export const VXETable = {
  t: XEUtils.get,
  use: Use,
  setup: Setup,
  interceptor: Interceptor,
  renderer: Renderer
}

export * from './src/interceptor'
export * from './src/renderer'
export default VXETable
