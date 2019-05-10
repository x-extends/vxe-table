import Excel from '../table/src/excel'

Excel.install = function (Vue) {
  Vue.component(Excel.name, Excel)
}

export default Excel
