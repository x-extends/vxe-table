import { VXETable } from '../../../packages/all'

// 自定义全局的格式化处理函数
VXETable.validators.mixin({
  mobile: {
    cellValidatorMethod ({ cellValue }) {
      if (!cellValue) {
        return new Error('手机号不正确')
      }
    }
  }
})
