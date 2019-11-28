import XEUtils from 'xe-utils/methods/xe-utils'
import Table from '../../table'
import Grid from '../../grid'
import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'

const propKeys = Object.keys(Table.props).filter(name => ['data', 'treeConfig'].indexOf(name) === -1)

export default {
  name: 'VxeVirtualTree',
  extends: Grid,
  data () {
    return {
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    tableProps () {
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
    window.aa = this
    const { data } = this
    Object.assign(this, {
      fullTreeData: [],
      tableData: []
    })
    this.handleColumns()
    if (data) {
      this.reloadData(data)
    }
  },
  methods: {
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
      const { fullTreeData, tableData } = this
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
          let matchObj = XEUtils.findTree(fullTreeData, item => item === row)
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
      XEUtils.eachTree(treeData, (item, index, obj, paths, parent, nodes) => {
        item._X_EXPAND = false
        item._X_INSERT = false
        item._X_LEVEL = nodes.length - 1
      })
      this.fullTreeData = treeData.slice(0)
      this.tableData = treeData.slice(0)
      return treeData
    },
    /**
     * 展开/收起树节点
     */
    virtualExpand (row, expanded) {
      let { children } = this.treeConfig
      if (row._X_EXPAND !== expanded) {
        if (this.hasChilds(row)) {
          let childRows = row[children]
          let tableData = this.tableData
          if (row._X_EXPAND) {
            // 展开节点
            let nodeChildList = []
            XEUtils.eachTree(childRows, item => {
              nodeChildList.push(item)
            }, this.treeConfig)
            tableData = tableData.filter(item => nodeChildList.indexOf(item) === -1)
          } else {
            // 收起节点
            let expandList = []
            let rowIndex = tableData.indexOf(row)
            if (rowIndex === -1) {
              throw new Error('错误的操作！')
            }
            XEUtils.eachTree(childRows, (item, index, obj, paths, parent, nodes) => {
              if (!parent || parent._X_EXPAND) {
                expandList.push(item)
              }
            }, this.treeConfig)
            tableData.splice.apply(tableData, [rowIndex + 1, 0].concat(expandList))
          }
          row._X_EXPAND = !row._X_EXPAND
          this.tableData = tableData
        }
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
