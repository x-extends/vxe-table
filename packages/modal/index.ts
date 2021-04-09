import { App } from 'vue'
import XEUtils from 'xe-utils'
import VxeModalComponent, { allActivedModals } from './src/modal'
import { VXETable } from '../v-x-e-table'
import { dynamicApp, dynamicStore, checkDynamic } from '../dynamics'

import { VxeModalPropTypes, ModalEventTypes, VxeModalDefines } from '../../types/all'

function openModal (options: VxeModalDefines.ModalOptions): Promise<ModalEventTypes> {
  // 使用动态组件渲染动态弹框
  checkDynamic()
  return new Promise(resolve => {
    if (options && options.id && allActivedModals.some(comp => comp.props.id === options.id)) {
      resolve('exist')
    } else {
      const _onHide = options.onHide
      const modalOpts = Object.assign(options, {
        key: XEUtils.uniqueId(),
        modelValue: true,
        onHide (params) {
          const modalList = dynamicStore.modals
          if (_onHide) {
            _onHide(params)
          }
          dynamicStore.modals = modalList.filter(item => item.key !== modalOpts.key)
          resolve(params.type)
        }
      } as VxeModalDefines.ModalOptions)
      dynamicStore.modals.push(modalOpts)
    }
  })
}

function getModal (id: VxeModalPropTypes.ID) {
  return XEUtils.find(allActivedModals, $modal => $modal.props.id === id)
}

/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeModal (id?: VxeModalPropTypes.ID) {
  const modals = id ? [getModal(id)] : allActivedModals
  const restPromises: any[] = []
  modals.forEach($modal => {
    if ($modal) {
      restPromises.push($modal.close())
    }
  })
  return Promise.all(restPromises)
}

function handleOpen (defOpts: VxeModalDefines.ModalOptions, content: VxeModalPropTypes.Content | VxeModalDefines.ModalOptions, title?: VxeModalPropTypes.Title, options?: VxeModalDefines.ModalOptions) {
  let opts
  if (XEUtils.isObject(content)) {
    opts = content
  } else {
    opts = { content: XEUtils.toValueString(content), title }
  }
  return openModal({ ...defOpts, ...options, ...opts })
}

function openAlert (content: VxeModalPropTypes.Content | VxeModalDefines.ModalOptions, title?: VxeModalPropTypes.Title, options?: VxeModalDefines.ModalOptions) {
  return handleOpen({
    type: 'alert',
    showFooter: true
  }, content, title, options)
}

function openConfirm (content: VxeModalPropTypes.Content | VxeModalDefines.ModalOptions, title?: VxeModalPropTypes.Title, options?: VxeModalDefines.ModalOptions) {
  return handleOpen({
    type: 'confirm',
    status: 'question',
    showFooter: true
  }, content, title, options)
}

function openMessage (content: VxeModalPropTypes.Content | VxeModalDefines.ModalOptions, options?: VxeModalDefines.ModalOptions) {
  return handleOpen({
    type: 'message',
    mask: false,
    lockView: false,
    showHeader: false
  }, content, '', options)
}

const ModalController = {
  get: getModal,
  close: closeModal,
  open: openModal,
  alert: openAlert,
  confirm: openConfirm,
  message: openMessage
}

export const modal = ModalController

export const Modal = Object.assign(VxeModalComponent, {
  install: function (app: App) {
    dynamicApp.component(VxeModalComponent.name, VxeModalComponent)
    app.component(VxeModalComponent.name, VxeModalComponent)
    VXETable.modal = ModalController
  }
})

export default Modal
