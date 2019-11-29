import XEUtils from 'xe-utils/methods/xe-utils'
import Table from '../../table'
import Grid from '../../grid'
import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'

const propKeys = Object.keys(Table.props).filter(name => ['data', 'treeConfig'].indexOf(name) === -1)

function countTreeExpand ($xTree, prevRow) {
  const rowChildren = prevRow[$xTree.treeConfig.children]
  let count = 1
  if ($xTree.isTreeExpandByRow(prevRow)) {
    for (let index = 0; index < rowChildren.length; index++) {
      count += countTreeExpand($xTree, rowChildren[index])
    }
  }
  return count
}

function getOffsetSize ($xTree) {
  switch ($xTree.vSize) {
    case 'mini':
      return 3
    case 'small':
      return 2
    case 'medium':
      return 1
  }
  return 0
}

function calcTreeLine ($table, $xTree, matchObj) {
  const { index, items } = matchObj
  let expandSize = 1
  if (index) {
    expandSize = countTreeExpand($xTree, items[index - 1])
  }
  return $table.rowHeight * expandSize - (index ? 1 : (12 - getOffsetSize($xTree)))
}

export default {
  name: 'VxeVirtualTree',
  extends: Grid,
  data () {
    return {
      removeList: []
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    renderClass () {
      const { tableProps, vSize, maximize, treeConfig } = this
      return [ 'vxe-grid vxe-virtual-tree', {
        [`size--${vSize}`]: vSize,
        't--animat': tableProps.optimization.animat,
        'has--tree-line': treeConfig && treeConfig.line,
        'is--maximize': maximize
      }]
    },
    tableExtendProps () {
      let rest = {}
      propKeys.forEach(key => {
        rest[key] = this[key]
      })
      return rest
    }
  },
  watch: {
    columns (value) {
      this.loadColumn(this.handleColumns())
    },
    data (value) {
      this.loadData(value)
    }
  },
  created () {
    const { data } = this
    Object.assign(this, {
      fullTreeData: [],
      tableData: [],
      fullTreeRowMap: new Map()
    })
    this.handleColumns()
    if (data) {
      this.reloadData(data)
    }
  },
  methods: {
    renderTreeLine (params, h) {
      const { treeConfig, fullTreeRowMap } = this
      const { $table, row, column } = params
      const { treeNode } = column
      if (treeNode && treeConfig && treeConfig.line) {
        const $xTree = this
        const rowLevel = row._X_LEVEL
        const matchObj = fullTreeRowMap.get(row)
        return [
          treeNode && treeConfig && treeConfig.line ? h('div', {
            class: 'vxe-tree--line-wrapper'
          }, [
            h('div', {
              class: 'vxe-tree--line',
              style: {
                height: `${calcTreeLine($table, $xTree, matchObj)}px`,
                left: `${rowLevel * (treeConfig.indent || 20) + (rowLevel ? 2 - getOffsetSize($xTree) : 0) + 16}px`
              }
            })
          ]) : null
        ]
      }
      return []
    },
    renderTreeIcon (params, h) {
      let { isHidden } = params
      let { row } = params
      let { children, indent, trigger, iconOpen, iconClose } = this.treeConfig
      let rowChildren = row[children]
      let isAceived = false
      let on = {}
      if (!isHidden) {
        isAceived = row._X_EXPAND
      }
      if (!trigger || trigger === 'default') {
        on.click = evnt => this.toggleTreeExpansion(row)
      }
      return [
        h('span', {
          class: 'vxe-tree--indent',
          style: {
            width: `${row._X_LEVEL * (indent || 20)}px`
          }
        }),
        h('span', {
          class: ['vxe-tree-wrapper', {
            'is--active': isAceived
          }],
          on
        }, rowChildren && rowChildren.length ? [
          h('span', {
            class: 'vxe-tree--btn-wrapper'
          }, [
            h('i', {
              class: ['vxe-tree--node-btn', isAceived ? (iconOpen || GlobalConfig.icon.treeOpen) : (iconClose || GlobalConfig.icon.treeClose)]
            })
          ])
        ] : [])
      ]
    },
    _loadTreeData (data) {
      return this.$nextTick().then(() => this.$refs.xTable.loadData(data))
    },
    loadData (data) {
      return this._loadTreeData(this.toVirtualTree(data))
    },
    reloadData (data) {
      return this.$nextTick()
        .then(() => this.$refs.xTable.reloadData(this.toVirtualTree(data)))
        .then(() => this.handleDefaultTreeExpand())
    },
    isTreeExpandByRow (row) {
      return !!row._X_EXPAND
    },
    setTreeExpansion (rows, expanded) {
      if (rows) {
        if (!XEUtils.isArray(rows)) {
          rows = [rows]
        }
        rows.forEach(row => this.virtualExpand(row, !!expanded))
      }
      return this._loadTreeData(this.tableData)
    },
    setAllTreeExpansion (expanded) {
      return this._loadTreeData(this.virtualAllExpand(expanded))
    },
    toggleTreeExpansion (row) {
      return this._loadTreeData(this.virtualExpand(row, !row._X_EXPAND))
    },
    getTreeExpandRecords () {
      const hasChilds = this.hasChilds
      const treeExpandRecords = []
      XEUtils.eachTree(this.fullTreeData, row => {
        if (row._X_EXPAND && hasChilds(row)) {
          treeExpandRecords.push(row)
        }
      }, this.treeConfig)
      return treeExpandRecords
    },
    clearTreeExpand () {
      return this.setAllTreeExpansion(false)
    },
    handleColumns () {
      return this.columns.map(conf => {
        if (conf.treeNode) {
          let slots = conf.slots || {}
          slots.icon = this.renderTreeIcon
          slots.line = this.renderTreeLine
          conf.slots = slots
        }
        return conf
      })
    },
    hasChilds (row) {
      const childList = row[this.treeConfig.children]
      return childList && childList.length
    },
    /**
     * 获取表格数据集，包含新增、删除、修改
     */
    getRecordset () {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      }
    },
    isInsertByRow (row) {
      return !!row._X_INSERT
    },
    getInsertRecords () {
      const insertRecords = []
      XEUtils.eachTree(this.fullTreeData, row => {
        if (row._X_INSERT) {
          insertRecords.push(row)
        }
      }, this.treeConfig)
      return insertRecords
    },
    insert (records) {
      return this.insertAt(records)
    },
    insertAt (records, row) {
      const { fullTreeData, tableData, treeConfig } = this
      if (!XEUtils.isArray(records)) {
        records = [records]
      }
      let newRecords = records.map(record => this.defineField(Object.assign({
        _X_EXPAND: false,
        _X_INSERT: true,
        _X_LEVEL: 0
      }, record)))
      if (!row) {
        fullTreeData.unshift.apply(fullTreeData, newRecords)
        tableData.unshift.apply(tableData, newRecords)
      } else {
        if (row === -1) {
          fullTreeData.push.apply(fullTreeData, newRecords)
          tableData.push.apply(tableData, newRecords)
        } else {
          let matchObj = XEUtils.findTree(fullTreeData, item => item === row, treeConfig)
          if (!matchObj || matchObj.index === -1) {
            throw new Error(UtilTools.error('vxe.error.unableInsert'))
          }
          let { items, index, nodes } = matchObj
          let rowIndex = tableData.indexOf(row)
          if (rowIndex > -1) {
            tableData.splice.apply(tableData, [rowIndex, 0].concat(newRecords))
          }
          items.splice.apply(items, [index, 0].concat(newRecords))
          newRecords.forEach(item => {
            item._X_LEVEL = nodes.length - 1
          })
        }
      }
      return this._loadTreeData(tableData).then(() => {
        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        }
      })
    },
    /**
     * 获取已删除的数据
     */
    getRemoveRecords () {
      return this.removeList
    },
    /**
     * 删除选中数据
     */
    removeSelecteds () {
      return this.remove(this.getSelectRecords()).then(params => {
        this.clearSelection()
        return params
      })
    },
    remove (rows) {
      const { removeList, fullTreeData, treeConfig } = this
      let rest = []
      if (!rows) {
        rows = fullTreeData
      } else if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      rows.forEach(row => {
        let matchObj = XEUtils.findTree(fullTreeData, item => item === row, treeConfig)
        if (matchObj) {
          const { item, items, index, parent } = matchObj
          if (!this.isInsertByRow(row)) {
            removeList.push(row)
          }
          if (parent) {
            let isExpand = this.isTreeExpandByRow(parent)
            if (isExpand) {
              this.handleCollapsing(parent)
            }
            items.splice(index, 1)
            if (isExpand) {
              this.handleExpanding(parent)
            }
          } else {
            this.handleCollapsing(item)
            items.splice(index, 1)
            this.tableData.splice(this.tableData.indexOf(item), 1)
          }
          rest.push(item)
        }
      })
      return this._loadTreeData(this.tableData).then(() => {
        return { row: rest.length ? rest[rest.length - 1] : null, rows: rest }
      })
    },
    /**
     * 处理默认展开树节点
     */
    handleDefaultTreeExpand () {
      let { treeConfig, tableFullData } = this
      if (treeConfig) {
        let { expandAll, expandRowKeys } = treeConfig
        let { children } = treeConfig
        if (expandAll) {
          this.setAllTreeExpansion(true)
        } else if (expandRowKeys) {
          let rowkey = UtilTools.getRowkey(this)
          expandRowKeys.forEach(rowid => {
            let matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), treeConfig)
            let rowChildren = matchObj ? matchObj.item[children] : 0
            if (rowChildren && rowChildren.length) {
              this.setTreeExpansion(matchObj.item, true)
            }
          })
        }
      }
    },
    /**
     * 定义树属性
     */
    toVirtualTree (treeData) {
      let fullTreeRowMap = this.fullTreeRowMap
      fullTreeRowMap.clear()
      XEUtils.eachTree(treeData, (item, index, items, paths, parent, nodes) => {
        item._X_EXPAND = false
        item._X_INSERT = false
        item._X_LEVEL = nodes.length - 1
        fullTreeRowMap.set(item, { item, index, items, paths, parent, nodes })
      })
      this.fullTreeData = treeData.slice(0)
      this.tableData = treeData.slice(0)
      return treeData
    },
    /**
     * 展开/收起树节点
     */
    virtualExpand (row, expanded) {
      if (row._X_EXPAND !== expanded) {
        if (row._X_EXPAND) {
          this.handleCollapsing(row)
        } else {
          this.handleExpanding(row)
        }
      }
      return this.tableData
    },
    // 展开节点
    handleExpanding (row) {
      if (this.hasChilds(row)) {
        const { tableData, treeConfig } = this
        let childRows = row[treeConfig.children]
        let expandList = []
        let rowIndex = tableData.indexOf(row)
        if (rowIndex === -1) {
          throw new Error('错误的操作！')
        }
        XEUtils.eachTree(childRows, (item, index, obj, paths, parent, nodes) => {
          if (!parent || parent._X_EXPAND) {
            expandList.push(item)
          }
        }, treeConfig)
        row._X_EXPAND = true
        tableData.splice.apply(tableData, [rowIndex + 1, 0].concat(expandList))
      }
      return this.tableData
    },
    // 收起节点
    handleCollapsing (row) {
      if (this.hasChilds(row)) {
        const { tableData, treeConfig } = this
        let childRows = row[treeConfig.children]
        let nodeChildList = []
        XEUtils.eachTree(childRows, item => {
          nodeChildList.push(item)
        }, treeConfig)
        row._X_EXPAND = false
        this.tableData = tableData.filter(item => nodeChildList.indexOf(item) === -1)
      }
      return this.tableData
    },
    /**
     * 展开/收起所有树节点
     */
    virtualAllExpand (expanded) {
      XEUtils.eachTree(this.fullTreeData, row => {
        this.virtualExpand(row, expanded)
      }, this.treeConfig)
      return this.tableData
    }
  }
}
