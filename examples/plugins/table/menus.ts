import { VXETable } from '../../../packages/all'

// 自定义全局的格式化处理函数
VXETable.menus.mixin({
  alertMsg: {
    menuMethod () {
      alert('1')
    }
  },
  test1 () {
    alert('2')
  }
})
