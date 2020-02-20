"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Cell = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = {
  createColumn: function createColumn($xetable, _vm) {
    var type = _vm.type,
        sortable = _vm.sortable,
        remoteSort = _vm.remoteSort,
        filters = _vm.filters,
        editRender = _vm.editRender,
        treeNode = _vm.treeNode;
    var editConfig = $xetable.editConfig,
        editOpts = $xetable.editOpts,
        checkboxOpts = $xetable.checkboxOpts;
    var renMaps = {
      renderHeader: this.renderDefaultHeader,
      renderCell: treeNode ? this.renderTreeCell : this.renderDefaultCell,
      renderFooter: this.renderDefaultFooter
    };

    switch (type) {
      case 'seq':
      case 'index':
        renMaps.renderHeader = this.renderIndexHeader;
        renMaps.renderCell = treeNode ? this.renderTreeIndexCell : this.renderIndexCell;
        break;

      case 'radio':
        renMaps.renderHeader = this.renderRadioHeader;
        renMaps.renderCell = treeNode ? this.renderTreeRadioCell : this.renderRadioCell;
        break;
      // 在 v3.0 中废弃 type=selection

      case 'checkbox':
      case 'selection':
        renMaps.renderHeader = this.renderSelectionHeader;
        renMaps.renderCell = checkboxOpts.checkField ? treeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp : treeNode ? this.renderTreeSelectionCell : this.renderSelectionCell;
        break;

      case 'expand':
        renMaps.renderCell = this.renderExpandCell;
        renMaps.renderData = this.renderExpandData;
        break;

      case 'html':
        renMaps.renderCell = treeNode ? this.renderTreeHTMLCell : this.renderHTMLCell;

        if (filters && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader;
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader;
        } else if (filters) {
          renMaps.renderHeader = this.renderFilterHeader;
        }

        break;

      default:
        if (editConfig && editRender) {
          renMaps.renderHeader = this.renderEditHeader;
          renMaps.renderCell = editOpts.mode === 'cell' ? treeNode ? this.renderTreeCellEdit : this.renderCellEdit : treeNode ? this.renderTreeRowEdit : this.renderRowEdit;
        } else if (filters && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader;
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader;
        } else if (filters) {
          renMaps.renderHeader = this.renderFilterHeader;
        }

    }

    return _tools.UtilTools.getColumnConfig($xetable, _vm, renMaps);
  },

  /**
   * 单元格
   */
  renderDefaultHeader: function renderDefaultHeader(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots,
        own = column.own;
    var renderOpts = own.editRender || own.cellRender;

    if (slots && slots.header) {
      return slots.header.call($table, params, h);
    }

    if (renderOpts) {
      var compConf = _vXETable.default.renderer.get(renderOpts.name);

      if (compConf && compConf.renderHeader) {
        return compConf.renderHeader.call($table, h, renderOpts, params, {
          $grid: $table.$xegrid,
          $excel: $table.$parent,
          $table: $table
        });
      }
    } // 在 v3.0 中废弃 label


    return [_tools.UtilTools.formatText(_tools.UtilTools.getFuncText(own.title || own.label), 1)];
  },
  renderDefaultCell: function renderDefaultCell(h, params) {
    var $table = params.$table,
        row = params.row,
        column = params.column;
    var slots = column.slots,
        own = column.own;
    var renderOpts = own.editRender || own.cellRender;

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    if (renderOpts) {
      var funName = own.editRender ? 'renderCell' : 'renderDefault';

      var compConf = _vXETable.default.renderer.get(renderOpts.name);

      if (compConf && compConf[funName]) {
        return compConf[funName].call($table, h, renderOpts, Object.assign({
          isEdit: !!own.editRender
        }, params), {
          $type: own.editRender ? 'edit' : 'cell',
          $grid: $table.$xegrid,
          $excel: $table.$parent,
          $table: $table
        });
      }
    }

    return [_tools.UtilTools.formatText(_tools.UtilTools.getCellLabel(row, column, params), 1)];
  },
  renderTreeCell: function renderTreeCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderDefaultCell.call(this, h, params));
  },
  renderDefaultFooter: function renderDefaultFooter(h, params) {
    var $table = params.$table,
        column = params.column,
        itemIndex = params.itemIndex,
        items = params.items;
    var slots = column.slots,
        own = column.own;
    var renderOpts = own.editRender || own.cellRender;

    if (slots && slots.footer) {
      return slots.footer.call($table, params, h);
    }

    if (renderOpts) {
      var compConf = _vXETable.default.renderer.get(renderOpts.name);

      if (compConf && compConf.renderFooter) {
        return compConf.renderFooter.call($table, h, renderOpts, params, {
          $grid: $table.$xegrid,
          $excel: $table.$parent,
          $table: $table
        });
      }
    }

    return [_tools.UtilTools.formatText(items[itemIndex], 1)];
  },

  /**
   * 树节点
   */
  renderTreeIcon: function renderTreeIcon(h, params, cellVNodes) {
    var $table = params.$table,
        isHidden = params.isHidden;
    var treeOpts = $table.treeOpts,
        treeExpandeds = $table.treeExpandeds,
        treeLazyLoadeds = $table.treeLazyLoadeds;
    var row = params.row,
        column = params.column,
        level = params.level;
    var slots = column.slots;
    var children = treeOpts.children,
        hasChild = treeOpts.hasChild,
        indent = treeOpts.indent,
        lazy = treeOpts.lazy,
        trigger = treeOpts.trigger,
        iconLoaded = treeOpts.iconLoaded,
        iconOpen = treeOpts.iconOpen,
        iconClose = treeOpts.iconClose;
    var rowChilds = row[children];
    var hasLazyChilds = false;
    var isAceived = false;
    var isLazyLoaded = false;
    var on = {};

    if (slots && slots.icon) {
      return slots.icon.call($table, params, h, cellVNodes);
    }

    if (!isHidden) {
      isAceived = treeExpandeds.indexOf(row) > -1;

      if (lazy) {
        isLazyLoaded = treeLazyLoadeds.indexOf(row) > -1;
        hasLazyChilds = row[hasChild];
      }
    }

    if (!trigger || trigger === 'default') {
      on.click = function (evnt) {
        return $table.triggerTreeExpandEvent(evnt, params);
      };
    }

    return [h('div', {
      class: ['vxe-cell--tree-node', {
        'is--active': isAceived
      }],
      style: {
        paddingLeft: "".concat(level * indent, "px")
      }
    }, [rowChilds && rowChilds.length || hasLazyChilds ? [h('div', {
      class: 'vxe-tree--btn-wrapper',
      on: on
    }, [h('i', {
      class: ['vxe-tree--node-btn', isLazyLoaded ? iconLoaded || _conf.default.icon.treeLoaded : isAceived ? iconOpen || _conf.default.icon.treeOpen : iconClose || _conf.default.icon.treeClose]
    })])] : null, h('div', {
      class: 'vxe-tree-cell'
    }, cellVNodes)])];
  },

  /**
   * 索引
   */
  renderIndexHeader: function renderIndexHeader(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots;

    if (slots && slots.header) {
      return slots.header.call($table, params, h);
    }

    return [_tools.UtilTools.formatText(column.getTitle(), 1)];
  },
  renderIndexCell: function renderIndexCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var seqOpts = $table.seqOpts,
        startIndex = $table.startIndex;
    var slots = column.slots,
        indexMethod = column.indexMethod;

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    var $seq = params.$seq,
        seq = params.seq,
        level = params.level; // 在 v3.0 中废弃 startIndex、indexMethod

    var seqMethod = seqOpts.seqMethod || indexMethod;
    return [_tools.UtilTools.formatText(seqMethod ? seqMethod(params) : level ? "".concat($seq, ".").concat(seq) : (seqOpts.startIndex || startIndex) + seq, 1)];
  },
  renderTreeIndexCell: function renderTreeIndexCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderIndexCell(h, params));
  },

  /**
   * 单选
   */
  renderRadioHeader: function renderRadioHeader(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots,
        own = column.own;

    if (slots && slots.header) {
      return slots.header.call($table, params, h);
    } // 在 v3.0 中废弃 label


    return [_tools.UtilTools.formatText(_tools.UtilTools.getFuncText(own.title || own.label), 1)];
  },
  renderRadioCell: function renderRadioCell(h, params) {
    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var radioOpts = $table.radioOpts,
        selectRow = $table.selectRow;
    var slots = column.slots;
    var labelField = radioOpts.labelField,
        checkMethod = radioOpts.checkMethod;
    var row = params.row;
    var isChecked = row === selectRow;
    var isDisabled = !!checkMethod;
    var on;

    if (!isHidden) {
      on = {
        click: function click(evnt) {
          if (!isDisabled) {
            $table.triggerRadioRowEvent(evnt, params);
          }
        }
      };

      if (checkMethod) {
        isDisabled = !checkMethod(params);
      }
    }

    return [h('span', {
      class: ['vxe-cell--radio', {
        'is--checked': isChecked,
        'is--disabled': isDisabled
      }],
      on: on
    }, [h('i', {
      class: 'vxe-radio--icon'
    })].concat(labelField ? slots && slots.default ? slots.default.call($table, params, h) : [_xeUtils.default.get(row, labelField)] : []))];
  },
  renderTreeRadioCell: function renderTreeRadioCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderRadioCell(h, params));
  },

  /**
   * 多选
   */
  renderSelectionHeader: function renderSelectionHeader(h, params) {
    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var isIndeterminate = $table.isIndeterminate,
        isAllCheckboxDisabled = $table.isAllCheckboxDisabled;
    var slots = column.slots,
        own = column.own;
    var checkboxOpts = $table.checkboxOpts; // 在 v3.0 中废弃 label

    var headerTitle = own.title || own.label;
    var isChecked = false;
    var on;

    if (checkboxOpts.checkStrictly ? !checkboxOpts.showHeader : checkboxOpts.showHeader === false) {
      return slots && slots.header ? slots.header.call($table, params, h) : [_tools.UtilTools.getFuncText(headerTitle)];
    }

    if (!isHidden) {
      isChecked = isAllCheckboxDisabled ? false : $table.isAllSelected;
      on = {
        click: function click(evnt) {
          if (!isAllCheckboxDisabled) {
            $table.triggerCheckAllEvent(evnt, !isChecked);
          }
        }
      };
    }

    return [h('span', {
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isAllCheckboxDisabled,
        'is--indeterminate': isIndeterminate
      }],
      attrs: {
        title: _conf.default.i18n('vxe.table.allTitle')
      },
      on: on
    }, [h('i', {
      class: 'vxe-checkbox--icon'
    })].concat(headerTitle ? slots && slots.header ? slots.header.call($table, params, h) : [_tools.UtilTools.getFuncText(headerTitle)] : []))];
  },
  renderSelectionCell: function renderSelectionCell(h, params) {
    var $table = params.$table,
        row = params.row,
        column = params.column,
        isHidden = params.isHidden;
    var treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var _$table$checkboxOpts = $table.checkboxOpts,
        labelField = _$table$checkboxOpts.labelField,
        checkMethod = _$table$checkboxOpts.checkMethod;
    var slots = column.slots;
    var indeterminate = false;
    var isChecked = false;
    var isDisabled = !!checkMethod;
    var on;

    if (!isHidden) {
      isChecked = $table.selection.indexOf(row) > -1;
      on = {
        click: function click(evnt) {
          if (!isDisabled) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked);
          }
        }
      };

      if (checkMethod) {
        isDisabled = !checkMethod(params);
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }
    }

    return [h('span', {
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isDisabled,
        'is--indeterminate': indeterminate
      }],
      on: on
    }, [h('i', {
      class: 'vxe-checkbox--icon'
    })].concat(labelField ? slots && slots.default ? slots.default.call($table, params, h) : [_xeUtils.default.get(row, labelField)] : []))];
  },
  renderTreeSelectionCell: function renderTreeSelectionCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderSelectionCell(h, params));
  },
  renderSelectionCellByProp: function renderSelectionCellByProp(h, params) {
    var $table = params.$table,
        row = params.row,
        column = params.column,
        isHidden = params.isHidden;
    var treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var _$table$checkboxOpts2 = $table.checkboxOpts,
        labelField = _$table$checkboxOpts2.labelField,
        property = _$table$checkboxOpts2.checkField,
        checkMethod = _$table$checkboxOpts2.checkMethod;
    var slots = column.slots;
    var indeterminate = false;
    var isChecked = false;
    var isDisabled = !!checkMethod;
    var on;

    if (!isHidden) {
      isChecked = _xeUtils.default.get(row, property);
      on = {
        click: function click(evnt) {
          if (!isDisabled) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked);
          }
        }
      };

      if (checkMethod) {
        isDisabled = !checkMethod(params);
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }
    }

    return [h('span', {
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isDisabled,
        'is--indeterminate': indeterminate
      }],
      on: on
    }, [h('i', {
      class: 'vxe-checkbox--icon'
    })].concat(labelField ? slots && slots.default ? slots.default.call($table, params, h) : [_xeUtils.default.get(row, labelField)] : []))];
  },
  renderTreeSelectionCellByProp: function renderTreeSelectionCellByProp(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderSelectionCellByProp(h, params));
  },

  /**
   * 展开行
   */
  renderExpandCell: function renderExpandCell(h, params) {
    var $table = params.$table,
        isHidden = params.isHidden,
        row = params.row,
        column = params.column;
    var expandOpts = $table.expandOpts,
        rowExpandeds = $table.rowExpandeds,
        expandLazyLoadeds = $table.expandLazyLoadeds;
    var lazy = expandOpts.lazy,
        labelField = expandOpts.labelField,
        iconLoaded = expandOpts.iconLoaded,
        iconOpen = expandOpts.iconOpen,
        iconClose = expandOpts.iconClose;
    var slots = column.slots;
    var isAceived = false;
    var isLazyLoaded = false;

    if (slots && slots.icon) {
      return slots.icon.call($table, params, h);
    }

    if (!isHidden) {
      isAceived = rowExpandeds.indexOf(params.row) > -1;

      if (lazy) {
        isLazyLoaded = expandLazyLoadeds.indexOf(row) > -1;
      }
    }

    return [h('span', {
      class: ['vxe-table--expanded', {
        'is--active': isAceived
      }],
      on: {
        click: function click(evnt) {
          $table.triggerRowExpandEvent(evnt, params);
        }
      }
    }, [h('i', {
      class: ['vxe-table--expand-btn', isLazyLoaded ? iconLoaded || _conf.default.icon.treeLoaded : isAceived ? iconOpen || _conf.default.icon.expandOpen : iconClose || _conf.default.icon.expandClose]
    })]), slots.content && slots.default ? slots.default.call($table, params, h) : labelField ? _xeUtils.default.get(row, labelField) : null];
  },
  renderExpandData: function renderExpandData(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots;

    if (slots) {
      if (slots.content) {
        return slots.content.call($table, params, h);
      } // 在 v3.0 中严格支持 content


      if (slots.default) {
        return slots.default.call($table, params, h);
      }
    }

    return [];
  },

  /**
   * HTML 标签
   */
  renderHTMLCell: function renderHTMLCell(h, params) {
    var $table = params.$table,
        row = params.row,
        column = params.column;
    var slots = column.slots;

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    return [h('span', {
      class: 'vxe-cell--html',
      domProps: {
        innerHTML: _tools.UtilTools.formatText(_tools.UtilTools.getCellLabel(row, column, params), 1)
      }
    })];
  },
  renderTreeHTMLCell: function renderTreeHTMLCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderHTMLCell(h, params));
  },

  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader: function renderSortAndFilterHeader(h, params) {
    return Cell.renderDefaultHeader(h, params).concat(Cell.renderSortIcon(h, params)).concat(Cell.renderFilterIcon(h, params));
  },

  /**
   * 排序
   */
  renderSortHeader: function renderSortHeader(h, params) {
    return Cell.renderDefaultHeader(h, params).concat(Cell.renderSortIcon(h, params));
  },
  renderSortIcon: function renderSortIcon(h, params) {
    var $table = params.$table,
        column = params.column;
    var _$table$sortOpts = $table.sortOpts,
        showIcon = _$table$sortOpts.showIcon,
        iconAsc = _$table$sortOpts.iconAsc,
        iconDesc = _$table$sortOpts.iconDesc;
    return showIcon === false ? [] : [h('span', {
      class: 'vxe-sort-wrapper'
    }, [h('i', {
      class: ['vxe-sort--asc-btn', iconAsc || _conf.default.icon.sortAsc, {
        'sort--active': column.order === 'asc'
      }],
      attrs: {
        title: _conf.default.i18n('vxe.table.sortAsc')
      },
      on: {
        click: function click(evnt) {
          $table.triggerSortEvent(evnt, column, 'asc');
        }
      }
    }), h('i', {
      class: ['vxe-sort--desc-btn', iconDesc || _conf.default.icon.sortDesc, {
        'sort--active': column.order === 'desc'
      }],
      attrs: {
        title: _conf.default.i18n('vxe.table.sortDesc')
      },
      on: {
        click: function click(evnt) {
          $table.triggerSortEvent(evnt, column, 'desc');
        }
      }
    })])];
  },

  /**
   * 筛选
   */
  renderFilterHeader: function renderFilterHeader(h, params) {
    return Cell.renderDefaultHeader(h, params).concat(Cell.renderFilterIcon(h, params));
  },
  renderFilterIcon: function renderFilterIcon(h, params) {
    var $table = params.$table,
        column = params.column,
        hasFilter = params.hasFilter;
    var filterStore = $table.filterStore,
        filterOpts = $table.filterOpts;
    var showIcon = filterOpts.showIcon,
        iconNone = filterOpts.iconNone,
        iconMatch = filterOpts.iconMatch;
    return showIcon === false ? [] : [h('span', {
      class: ['vxe-filter-wrapper', {
        'is--active': filterStore.visible && filterStore.column === column
      }]
    }, [h('i', {
      class: ['vxe-filter--btn', hasFilter ? iconMatch || _conf.default.icon.filterMatch : iconNone || _conf.default.icon.filterNone],
      attrs: {
        title: _conf.default.i18n('vxe.table.filter')
      },
      on: {
        click: function click(evnt) {
          $table.triggerFilterEvent(evnt, params.column, params);
        }
      }
    })])];
  },

  /**
   * 可编辑
   */
  renderEditHeader: function renderEditHeader(h, params) {
    var $table = params.$table,
        column = params.column;
    var editRules = $table.editRules,
        editOpts = $table.editOpts;
    var sortable = column.sortable,
        remoteSort = column.remoteSort,
        filters = column.filters;
    var isRequired;

    if (editRules) {
      var columnRules = _xeUtils.default.get(editRules, params.column.property);

      if (columnRules) {
        isRequired = columnRules.some(function (rule) {
          return rule.required;
        });
      }
    }

    return [isRequired ? h('i', {
      class: 'vxe-required-icon'
    }) : null, editOpts.showIcon === false ? null : h('i', {
      class: ['vxe-edit-icon', editOpts.icon || _conf.default.icon.edit]
    })].concat(Cell.renderDefaultHeader(h, params)).concat(sortable || remoteSort ? Cell.renderSortIcon(h, params) : []).concat(filters ? Cell.renderFilterIcon(h, params) : []);
  },
  // 行格编辑模式
  renderRowEdit: function renderRowEdit(h, params) {
    var $table = params.$table;
    var actived = $table.editStore.actived;
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row);
  },
  renderTreeRowEdit: function renderTreeRowEdit(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderRowEdit(h, params));
  },
  // 单元格编辑模式
  renderCellEdit: function renderCellEdit(h, params) {
    var $table = params.$table;
    var actived = $table.editStore.actived;
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row && actived.column === params.column);
  },
  renderTreeCellEdit: function renderTreeCellEdit(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderCellEdit(h, params));
  },
  runRenderer: function runRenderer(h, params, _vm, isEdit) {
    var $table = params.$table,
        row = params.row,
        column = params.column;
    var slots = column.slots,
        own = column.own,
        formatter = column.formatter;
    var editRender = own.editRender;

    var compConf = _vXETable.default.renderer.get(editRender.name);

    if (editRender.type === 'visible' || isEdit) {
      if (slots && slots.edit) {
        return slots.edit.call($table, params, h);
      }

      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, Object.assign({
        isEdit: true
      }, params), {
        $type: 'edit',
        $grid: $table.$xegrid,
        $excel: $table.$parent,
        $table: $table
      }) : [];
    }

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    if (formatter) {
      return [_tools.UtilTools.formatText(_tools.UtilTools.getCellLabel(row, column, params), 1)];
    }

    return Cell.renderDefaultCell.call(_vm, h, params);
  }
};
exports.Cell = Cell;
var _default = Cell;
exports.default = _default;