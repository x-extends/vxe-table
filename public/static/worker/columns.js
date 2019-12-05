function mockColumns (size) {
  var columns = []
  for (var index = 0; index < size; index++) {
    var colItem = {
      field: index % 2 === 0 ? 'age' : (index % 3 === 0 ? 'rate' : 'name'),
      title: 'col_' + index,
      width: index % 6 === 0 ? 340 : index % 4 === 0 ? 260 : index % 3 === 0 ? 120 : 160,
      resizable: true
    }
    if (index === 0) {
      colItem.width = 100
      colItem.type = 'index'
      colItem.title = '序号'
    }
    if (index === 1) {
      colItem.type = 'checkbox'
      colItem.title = '多选'
    }
    if (index < 4) {
      colItem.fixed = 'left'
      colItem.sortable = true
    } else if (index === 5) {
      colItem.filters = [
        { label: '= 100', value: 100 },
        { label: '= 2000', value: 2000 }
      ]
    }
    columns.push(colItem)
  }
  return columns
}

addEventListener('message', function (evnt) {
  var rest = evnt.data
  var columns = mockColumns(rest.size)
  postMessage({ key: rest.key, columns: columns })
})
