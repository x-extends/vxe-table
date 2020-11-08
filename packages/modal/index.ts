import { App } from 'vue'
import XEUtils from 'xe-utils/ctor'
import VxeModalComponent, { allActivedModals } from './src/modal'
import VXETable from '../v-x-e-table'
import { dynamicApp, dynamicStore, checkDynamic } from '../dynamics'

import { VxeModalOptions, ModalEventTypes } from '../../types/vxe-table'

declare module '../../types/vxe-table' {
  interface VxeModalOptions {
    key?: string | number;
  }
}

function openModal (options: VxeModalOptions): Promise<ModalEventTypes> {
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
      } as VxeModalOptions)
      dynamicStore.modals.push(modalOpts)
    }
  })
}

function getModal (id: string) {
  return XEUtils.find(allActivedModals, $modal => $modal.props.id === id)
}

/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeModal (id?: string) {
  const modals = id ? [getModal(id)] : allActivedModals
  const restPromises: any[] = []
  modals.forEach($modal => {
    if ($modal) {
      restPromises.push($modal.close())
    }
  })
  return Promise.all(restPromises)
}

function handleOpen (defOpts: VxeModalOptions, message: string | VxeModalOptions, title?: string, options?: VxeModalOptions) {
  let opts
  if (XEUtils.isString(message)) {
    opts = { message, title }
  } else {
    opts = message
  }
  return openModal({ ...defOpts, ...options, ...opts })
}

function openAlert (message: string | VxeModalOptions, title?: string, options?: VxeModalOptions) {
  return handleOpen({
    type: 'alert',
    showFooter: true
  }, message, title, options)
}

function openConfirm (message: string | VxeModalOptions, title?: string, options?: VxeModalOptions) {
  return handleOpen({
    type: 'confirm',
    status: 'question',
    showFooter: true
  }, message, title, options)
}

function openMessage (message: string | VxeModalOptions, options?: VxeModalOptions) {
  return handleOpen({
    type: 'message',
    mask: false,
    lockView: false,
    showHeader: false
  }, message, '', options)
}

export const ModalController = {
  get: getModal,
  close: closeModal,
  open: openModal,
  alert: openAlert,
  confirm: openConfirm,
  message: openMessage
}

declare module '../v-x-e-table' {
  interface VXETableInstance {
    modal: typeof ModalController;
  }
}

export const Modal = {
  install: function (app: App) {
    const { globalProperties } = app.config
    dynamicApp.component(VxeModalComponent.name, VxeModalComponent)
    app.component(VxeModalComponent.name, VxeModalComponent)
    VXETable.modal = ModalController
    if (!globalProperties.$vxe) {
      globalProperties.$vxe = { modal: ModalController }
    } else {
      globalProperties.$vxe.modal = ModalController
    }
  }
}

export default Modal
