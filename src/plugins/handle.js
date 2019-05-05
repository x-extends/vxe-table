import XEUtils from 'xe-utils'

function getFormatDate (value, props, defaultFormat) {
  return XEUtils.toDateString(value, props.format || defaultFormat)
}

function getFormatDates (values, props, separator, defaultFormat) {
  return XEUtils.map(values, function (date) {
    return getFormatDate(date, props, defaultFormat)
  }).join(separator)
}

function matchCascaderData (index, list, values, labels) {
  var val = values[index]
  if (list && values.length > index) {
    XEUtils.each(list, function (item) {
      if (item.value === val) {
        labels.push(item.label)
        matchCascaderData(++index, item.children, values, labels)
      }
    })
  }
}

function formatSelectLabel (cellValue, editRender) {
  var props = editRender.props || {}
  var options = editRender.options || []
  var optionProps = props.optionProps || {}
  var labelProp = optionProps.label || 'label'
  var valueProp = optionProps.value || 'value'
  var item = XEUtils.find(options, function (item) {
    return item[valueProp] === cellValue
  })
  return item ? item[labelProp] : null
}

function getCascaderLabel (cellValue, list, props) {
  var values = cellValue || []
  var labels = []
  matchCascaderData(0, list, values, labels)
  return labels.join(` ${props.separator || '/'} `)
}

function formatDatePickerLabel (cellValue, editRender) {
  var props = editRender.props || {}
  switch (props.type) {
    case 'week':
      return getFormatDate(cellValue, props, 'yyyywWW')
    case 'month':
      return getFormatDate(cellValue, props, 'yyyy-MM')
    case 'year':
      return getFormatDate(cellValue, props, 'yyyy')
    case 'dates':
      return getFormatDates(cellValue, props, ', ', 'yyyy-MM-dd')
    case 'daterange':
      return getFormatDates(cellValue, props, ` ${props.rangeSeparator || '-'} `, 'yyyy-MM-dd')
    case 'datetimerange':
      return getFormatDates(cellValue, props, ` ${props.rangeSeparator || '-'} `, 'yyyy-MM-dd HH:ss:mm')
  }
  return getFormatDate(cellValue, props, 'yyyy-MM-dd')
}

export default {
  formatSelectLabel,
  formatDatePickerLabel,
  getCascaderLabel
}
