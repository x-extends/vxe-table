const getAllColumns = (columns: any, parentColumn?: any) => {
  const result: any[] = []
  columns.forEach((column: any) => {
    column.parentId = parentColumn ? parentColumn.id : null
    if (column.visible) {
      if (column.children && column.children.length && column.children.some((column: any) => column.visible)) {
        result.push(column)
        result.push(...getAllColumns(column.children, column))
      } else {
        result.push(column)
      }
    }
  })
  return result
}

export const convertToRows = (originColumns: any, useCustomRowSpan?: boolean): any[][] => {
  let maxLevel = 1
  const traverse = (column: any, parent?: any) => {
    if (parent) {
      column.level = parent.level + 1
      if (maxLevel < column.level) {
        maxLevel = column.level
      }
    }
    if (column.children && column.children.length && column.children.some((column: any) => column.visible)) {
      let colSpan = 0
      column.children.forEach((subColumn: any) => {
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

  originColumns.forEach((column: any) => {
    column.level = 1
    traverse(column)
  })

  const rows: any[] = []
  for (let i = 0; i < maxLevel; i++) {
    rows.push([])
  }

  const allColumns = getAllColumns(originColumns)

  // rowSpan 计算
  const getGroupParentRowSpan = (columnId: string) => {
    let r = 0
    for (let i = 0; i < allColumns.length; i++) {
      const column = allColumns[i]
      if (column.id === columnId) {
        if (column.rowSpan && column.rowSpan > 1) {
          r = r + column.rowSpan
        }
        if (column.parentId) {
          r = r + getGroupParentRowSpan(column.parentId)
        }
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
        let parentRowSpan = getGroupParentRowSpan(column.parentId)
        parentRowSpan = parentRowSpan > 0 ? parentRowSpan - 1 : 0
        alevel = alevel + parentRowSpan
        if (alevel >= maxLevel) {
          alevel = maxLevel - 1
        }
      }
      rows[alevel].push(column)
    } else {
      if (column.children && column.children.length && column.children.some((column: any) => column.visible)) {
        column.rowSpan = 1
      } else {
        column.rowSpan = maxLevel - column.level + 1
      }
      rows[column.level - 1].push(column)
    }
  })

  return rows
}
