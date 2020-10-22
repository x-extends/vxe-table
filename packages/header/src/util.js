const getAllColumns = (columns, parentColumn) => {
  const result = []
  columns.forEach((column) => {
    column.parentId = parentColumn ? parentColumn.id : null
    if (column.visible) {
      if (column.children && column.children.length && column.children.some(column => column.visible)) {
        result.push(column)
        result.push(...getAllColumns(column.children, column))
      } else {
        result.push(column)
      }
    }
  })
  return result
}

export const convertToRows = (useCustomRowSpan, originColumns) => {
  let maxLevel = 1
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1
      if (maxLevel < column.level) {
        maxLevel = column.level
      }
    }
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      let colSpan = 0
      column.children.forEach((subColumn) => {
        if (subColumn.visible) {
          traverse(subColumn, column)
          colSpan += subColumn.colSpan
        }
      })
      column.colSpan = colSpan
    } else {
      column.colSpan = 1
    }
  }

  originColumns.forEach((column) => {
    column.level = 1
    traverse(column)
  })

  const rows = []
  for (let i = 0; i < maxLevel; i++) {
    rows.push([])
  }

  const allColumns = getAllColumns(originColumns)

  const traverseParent = (column, findcolumnid) => {
    let r = null
    if (column.id === findcolumnid) {
      return column
    }
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      for (let i = 0; i < column.children.length; i++) {
        const subColumn = column.children[i]
        if (subColumn.visible) {
          const subr = traverseParent(subColumn, findcolumnid)
          if (subr) {
            r = subr
            break
          }
        }
      }
    }
    return r
  }

  const getParent = (columnId) => {
    let r = null
    for (let i = 0; i < originColumns.length; i++) {
      const column = originColumns[i]
      r = traverseParent(column, columnId)
      if (r) {
        break
      }
    }
    return r
  }

  allColumns.forEach((column) => {
    if (useCustomRowSpan) {
      if (column.customRowSpan) {
        column.rowSpan = column.customRowSpan
      } else {
        column.rowSpan = 1
      }
      let alevel = column.level - 1
      if (column.parentId) {
        const parent = getParent(column.parentId)
        alevel = parent.level + parent.rowSpan - 1
        if (alevel > maxLevel) {
          alevel = maxLevel
        }
      }
      rows[alevel].push(column)
    } else {
      if (column.children && column.children.length && column.children.some(column => column.visible)) {
        column.rowSpan = 1
      } else {
        column.rowSpan = maxLevel - column.level + 1
      }
      rows[column.level - 1].push(column)
    }
  })

  return rows
}
