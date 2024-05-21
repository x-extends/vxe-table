import { App } from 'vue'
import XEUtils from 'xe-utils'
import VxeDrawerComponent, { allActiveDrawers } from './src/modal'
import { VXETable } from '../v-x-e-table'
import { dynamicApp, dynamicStore, checkDynamic } from '../dynamics'

import { VxeDrawerPropTypes, DrawerEventTypes, VxeDrawerDefines } from '../../types'

function openDrawer (options: VxeDrawerDefines.DrawerOptions): Promise<DrawerEventTypes> {
  // 使用动态组件渲染动态弹框
  checkDynamic()
  return new Promise(resolve => {
    if (options && options.id && allActiveDrawers.some(comp => comp.props.id === options.id)) {
      resolve('exist')
    } else {
      const _onHide = options.onHide
      const drawerOpts = Object.assign(options, {
        key: XEUtils.uniqueId(),
        modelValue: true,
        onHide (params) {
          const drawerList = dynamicStore.drawers
          if (_onHide) {
            _onHide(params)
          }
          dynamicStore.drawers = drawerList.filter(item => item.key !== drawerOpts.key)
          resolve(params.type)
        }
      } as VxeDrawerDefines.DrawerOptions)
      dynamicStore.drawers.push(drawerOpts)
    }
  })
}

function getDrawer (id: VxeDrawerPropTypes.ID) {
  return XEUtils.find(allActiveDrawers, $drawer => $drawer.props.id === id)
}

/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeDrawer (id?: VxeDrawerPropTypes.ID) {
  const drawers = id ? [getDrawer(id)] : allActiveDrawers
  const restPromises: any[] = []
  drawers.forEach($drawer => {
    if ($drawer) {
      restPromises.push($drawer.close())
    }
  })
  return Promise.all(restPromises)
}

const DrawerController = {
  get: getDrawer,
  close: closeDrawer,
  open: openDrawer
}

export const drawer = DrawerController

export const VxeDrawer = Object.assign(VxeDrawerComponent, {
  install: function (app: App) {
    app.component(VxeDrawerComponent.name as string, VxeDrawerComponent)
    VXETable.drawer = DrawerController
  }
})

dynamicApp.component(VxeDrawerComponent.name as string, VxeDrawerComponent)

export const Drawer = VxeDrawer

export default VxeDrawer
