import XEUtils from 'xe-utils'
import Handles from './handle'

var VXETableElementPlugin = {
  renderMap: {
    ElInput: {
      autofocus: 'input.el-input__inner'
    },
    ElInputNumber: {
      autofocus: 'input.el-input__inner'
    },
    ElSelect: {
      render: function (h, editRender, params) {
        var $table = params.$table
        var row = params.row
        var column = params.column
        var props = editRender.props || {}
        var optionProps = props.optionProps || {}
        var labelProp = optionProps.label || 'label'
        var valueProp = optionProps.value || 'value'
        if ($table.size) {
          props = XEUtils.assign({ size: $table.size }, props)
        }
        return [
          h('el-select', {
            props,
            model: {
              value: XEUtils.get(row, column.property),
              callback (value) {
                XEUtils.set(row, column.property, value)
              }
            }
          }, XEUtils.map(editRender.options, function (item, index) {
            return h('el-option', {
              props: {
                value: item[valueProp],
                label: item[labelProp]
              },
              key: index
            })
          }))
        ]
      },
      formatLabel: Handles.formatSelectLabel
    },
    ElCascader: {
      formatLabel: function (cellValue, editRender) {
        var props = editRender.props || {}
        return Handles.getCascaderLabel(cellValue, props.options, props)
      }
    },
    ElDatePicker: {
      formatLabel: Handles.formatDatePickerLabel
    },
    ElTimePicker: {},
    ElRate: {},
    ElSwitch: {}
  }
}

export default VXETableElementPlugin
