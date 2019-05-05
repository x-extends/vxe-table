import XEUtils from 'xe-utils'
import Handles from './handle'

var VXETableIViewPlugin = {
  renderMap: {
    Input: {
      autofocus: 'input.ivu-input'
    },
    InputNumber: {
      autofocus: 'input.ivu-input-number-input'
    },
    Select: {
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
          h('Select', {
            props,
            model: {
              value: XEUtils.get(row, column.property),
              callback (value) {
                XEUtils.set(row, column.property, value)
              }
            }
          }, XEUtils.map(editRender.options, function (item, index) {
            return h('Option', {
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
    Cascader: {
      formatLabel: function (cellValue, editRender) {
        var props = editRender.props || {}
        var values = cellValue || []
        var labels = []
        Handles.matchCascaderData(0, props.data, values, labels)
        return labels.join(` ${props.separator || '/'} `)
      }
    },
    DatePicker: {
      formatLabel: Handles.formatDatePickerLabel
    },
    TimePicker: {},
    Rate: {},
    iSwitch: {}
  }
}

export default VXETableIViewPlugin
