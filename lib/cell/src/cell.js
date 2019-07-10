"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Cell = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = require("../../v-x-e-table");

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = {
  createColumn: function createColumn($table, _vm) {
    var type = _vm.type,
        sortable = _vm.sortable,
        remoteSort = _vm.remoteSort,
        filters = _vm.filters,
        editRender = _vm.editRender,
        treeNode = _vm.treeNode;
    var selectConfig = $table.selectConfig,
        treeConfig = $table.treeConfig;
    var isTreeNode = treeConfig && treeNode;
    var renMaps = {
      renderHeader: this.renderHeader,
      renderCell: isTreeNode ? this.renderTreeCell : this.renderCell
    };

    switch (type) {
      case 'index':
        renMaps.renderHeader = this.renderIndexHeader;
        renMaps.renderCell = isTreeNode ? this.renderTreeIndexCell : this.renderIndexCell;
        break;

      case 'radio':
        renMaps.renderHeader = this.renderRadioHeader;
        renMaps.renderCell = isTreeNode ? this.renderTreeRadioCell : this.renderRadioCell;
        break;

      case 'selection':
        renMaps.renderHeader = this.renderSelectionHeader;
        renMaps.renderCell = selectConfig && selectConfig.checkField ? isTreeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp : isTreeNode ? this.renderTreeSelectionCell : this.renderSelectionCell;
        break;

      case 'expand':
        renMaps.renderCell = this.renderExpandCell;
        renMaps.renderData = this.renderExpandData;
        break;

      default:
        if (editRender) {
          renMaps.renderHeader = this.renderEditHeader;
          renMaps.renderCell = $table.editConfig && $table.editConfig.mode === 'cell' ? isTreeNode ? this.renderTreeCellEdit : this.renderCellEdit : isTreeNode ? this.renderTreeRadioCell : this.renderRowEdit;
        } else if (filters && filters.length && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader;
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader;
        } else if (filters && filters.length) {
          renMaps.renderHeader = this.renderFilterHeader;
        }

    }

    return _tools.UtilTools.getColumnConfig(_vm, renMaps);
  },

  /**
   * 单元格
   */
  renderHeader: function renderHeader(h, params) {
    var column = params.column;
    var slots = column.slots,
        own = column.own;

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    return [_tools.UtilTools.formatText(own.title || own.label, 1)];
  },
  renderCell: function renderCell(h, params) {
    var cellValue;
    var row = params.row,
        column = params.column;
    var slots = column.slots,
        formatter = column.formatter;

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    cellValue = _tools.UtilTools.getCellValue(row, column);

    if (formatter) {
      params.cellValue = cellValue;
      cellValue = formatter(params);
    }

    return [_tools.UtilTools.formatText(cellValue, 1)];
  },
  renderTreeCell: function renderTreeCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderCell(h, params));
  },

  /**
   * 树节点
   */
  renderTreeIcon: function renderTreeIcon(h, params) {
    var icon = _conf.default.icon;
    var $table = params.$table;
    var treeConfig = $table.treeConfig,
        treeExpandeds = $table.treeExpandeds;
    var row = params.row,
        level = params.level;
    var children = treeConfig.children,
        indent = treeConfig.indent,
        trigger = treeConfig.trigger;
    var rowChildren = row[children];
    var on = {};

    if (!trigger || trigger === 'default') {
      on.click = function (evnt) {
        return $table.triggerTreeExpandEvent(evnt, params);
      };
    }

    return [h('span', {
      class: 'vxe-tree--indent',
      style: {
        width: "".concat(level * (indent || 16), "px")
      }
    }), h('span', {
      class: ['vxe-tree-wrapper', {
        'is--active': treeExpandeds.indexOf(row) > -1
      }],
      on: on
    }, rowChildren && rowChildren.length ? [h('i', {
      class: ['vxe-tree--node-btn', icon.tree]
    })] : [])];
  },

  /**
   * 索引
   */
  renderIndexHeader: function renderIndexHeader(h, params) {
    var column = params.column;
    var slots = column.slots,
        own = column.own;

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    return [_tools.UtilTools.formatText(own.title || own.label || '#', 1)];
  },
  renderIndexCell: function renderIndexCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var startIndex = $table.startIndex;
    var slots = column.slots,
        indexMethod = column.indexMethod;

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    var $seq = params.$seq,
        seq = params.seq,
        level = params.level;
    return [_tools.UtilTools.formatText(indexMethod ? indexMethod(params) : level ? "".concat($seq, ".").concat(seq) : startIndex + seq, 1)];
  },
  renderTreeIndexCell: function renderTreeIndexCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderIndexCell(h, params));
  },

  /**
   * 单选
   */
  renderRadioHeader: function renderRadioHeader(h, params) {
    var own = params.column.own;
    return [_tools.UtilTools.formatText(own.title || own.label, 1)];
  },
  renderRadioCell: function renderRadioCell(h, params) {
    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var _$table$radioConfig = $table.radioConfig,
        radioConfig = _$table$radioConfig === void 0 ? {} : _$table$radioConfig;
    var slots = column.slots;
    var labelField = radioConfig.labelField;

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    var selectRow = $table.selectRow;
    var row = params.row;
    var options = {
      attrs: {
        type: 'radio',
        name: "vxe-radio--".concat($table.id)
      }
    };

    if (!isHidden) {
      options.domProps = {
        checked: row === selectRow
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerRadioRowEvent(evnt, params);
        }
      };
    }

    return [h('label', {
      class: ['vxe-radio']
    }, [h('input', options), h('span', {
      class: ['radio--icon']
    }), labelField ? h('span', {
      class: 'radio--label'
    }, _xeUtils.default.get(row, labelField)) : null])];
  },
  renderTreeRadioCell: function renderTreeRadioCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderRadioCell(h, params));
  },

  /**
   * 多选
   */
  renderSelectionHeader: function renderSelectionHeader(h, params) {
    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var slots = column.slots,
        own = column.own;
    var headerTitle = own.title || own.label;
    var options = {
      attrs: {
        type: 'checkbox'
      }
    };

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    if (!isHidden) {
      options.domProps = {
        checked: $table.isAllSelected
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerCheckAllEvent(evnt, evnt.target.checked);
        }
      };
    }

    return [h('label', {
      class: ['vxe-checkbox', {
        'is--indeterminate': $table.isIndeterminate
      }]
    }, [h('input', options), h('span', {
      class: ['checkbox--icon']
    }), headerTitle ? h('span', {
      class: 'checkbox--label'
    }, headerTitle) : null])];
  },
  renderSelectionCell: function renderSelectionCell(h, params) {
    var $table = params.$table;
    var _$table$selectConfig = $table.selectConfig,
        selectConfig = _$table$selectConfig === void 0 ? {} : _$table$selectConfig,
        treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var labelField = selectConfig.labelField,
        checkMethod = selectConfig.checkMethod;
    var row = params.row,
        isHidden = params.isHidden;
    var indeterminate = false;
    var isDisabled = !!checkMethod;
    var options = {
      attrs: {
        type: 'checkbox'
      }
    };

    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params);
        options.attrs.disabled = isDisabled;
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }

      options.domProps = {
        checked: $table.selection.indexOf(row) > -1
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerCheckRowEvent(evnt, params, evnt.target.checked);
        }
      };
    }

    return [h('label', {
      class: ['vxe-checkbox', {
        'is--indeterminate': indeterminate,
        'is--disabled': isDisabled
      }]
    }, [h('input', options), h('span', {
      class: ['checkbox--icon']
    }), labelField ? h('span', {
      class: 'checkbox--label'
    }, _xeUtils.default.get(row, labelField)) : null])];
  },
  renderTreeSelectionCell: function renderTreeSelectionCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCell(h, params));
  },
  renderSelectionCellByProp: function renderSelectionCellByProp(h, params) {
    var $table = params.$table;
    var _$table$selectConfig2 = $table.selectConfig,
        selectConfig = _$table$selectConfig2 === void 0 ? {} : _$table$selectConfig2,
        treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var labelField = selectConfig.labelField,
        property = selectConfig.checkField,
        checkMethod = selectConfig.checkMethod;
    var row = params.row,
        isHidden = params.isHidden;
    var indeterminate = false;
    var isDisabled = !!checkMethod;
    var options = {
      attrs: {
        type: 'checkbox'
      }
    };

    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params);
        options.attrs.disabled = isDisabled;
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }

      options.domProps = {
        checked: _xeUtils.default.get(row, property)
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerCheckRowEvent(evnt, params, evnt.target.checked);
        }
      };
    }

    return [h('label', {
      class: ['vxe-checkbox', {
        'is--indeterminate': indeterminate,
        'is--disabled': isDisabled
      }]
    }, [h('input', options), h('span', {
      class: ['checkbox--icon']
    }), labelField ? h('span', {
      class: 'checkbox--label'
    }, _xeUtils.default.get(row, labelField)) : null])];
  },
  renderTreeSelectionCellByProp: function renderTreeSelectionCellByProp(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCellByProp(h, params));
  },

  /**
   * 展开行
   */
  renderExpandCell: function renderExpandCell(h, params) {
    var $table = params.$table,
        isHidden = params.isHidden;
    var expandActive = false;

    if (!isHidden) {
      expandActive = $table.expandeds.indexOf(params.row) > -1;
    }

    return [h('span', {
      class: ['vxe-table--expanded', {
        'expand--active': expandActive
      }],
      on: {
        click: function click(evnt) {
          $table.triggerRowExpandEvent(evnt, params);
        }
      }
    }, [h('i', {
      class: ['vxe-table--expand-icon']
    })])];
  },
  renderExpandData: function renderExpandData(h, params) {
    var column = params.column;
    var slots = column.slots;

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    return [];
  },

  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader: function renderSortAndFilterHeader(h, params) {
    return Cell.renderHeader(h, params).concat(Cell.renderSortIcon(h, params)).concat(Cell.renderFilterIcon(h, params));
  },

  /**
   * 排序
   */
  renderSortHeader: function renderSortHeader(h, params) {
    return Cell.renderHeader(h, params).concat(Cell.renderSortIcon(h, params));
  },
  renderSortIcon: function renderSortIcon(h, params) {
    var icon = _conf.default.icon;
    var $table = params.$table,
        column = params.column;
    return [h('span', {
      class: ['vxe-sort-wrapper']
    }, [h('i', {
      class: ['vxe-sort--asc-btn', icon.sortAsc, {
        'sort--active': column.order === 'asc'
      }],
      on: {
        click: function click(evnt) {
          $table.triggerSortEvent(evnt, column, params, 'asc');
        }
      }
    }), h('i', {
      class: ['vxe-sort--desc-btn', icon.sortDesc, {
        'sort--active': column.order === 'desc'
      }],
      on: {
        click: function click(evnt) {
          $table.triggerSortEvent(evnt, column, params, 'desc');
        }
      }
    })])];
  },

  /**
   * 筛选
   */
  renderFilterHeader: function renderFilterHeader(h, params) {
    return Cell.renderHeader(h, params).concat(Cell.renderFilterIcon(h, params));
  },
  renderFilterIcon: function renderFilterIcon(h, params) {
    var icon = _conf.default.icon;
    var $table = params.$table,
        column = params.column;
    var filterStore = $table.filterStore;
    return [h('span', {
      class: ['vxe-filter-wrapper', {
        'is--active': filterStore.visible && filterStore.column === column
      }]
    }, [h('i', {
      class: ['vxe-filter--btn', icon.filter],
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
    var icon = _conf.default.icon;
    var $table = params.$table,
        column = params.column;
    var editRules = $table.editRules,
        editConfig = $table.editConfig;
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
    }) : null, editConfig && editConfig.showIcon === false ? null : h('i', {
      class: ['vxe-edit-icon', icon.edit]
    })].concat(Cell.renderHeader(h, params)).concat(sortable || remoteSort ? Cell.renderSortIcon(h, params) : []).concat(filters && filters.length ? Cell.renderFilterIcon(h, params) : []);
  },
  // 行格编辑模式
  renderRowEdit: function renderRowEdit(h, params) {
    var $table = params.$table;
    var actived = $table.editStore.actived;
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row);
  },
  renderTreeRowEdit: function renderTreeRowEdit(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderRowEdit(h, params));
  },
  // 单元格编辑模式
  renderCellEdit: function renderCellEdit(h, params) {
    var $table = params.$table;
    var actived = $table.editStore.actived;
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row && actived.column === params.column);
  },
  renderTreeCellEdit: function renderTreeCellEdit(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderCellEdit(h, params));
  },
  runRenderer: function runRenderer(h, params, _vm, isEdit) {
    var $table = params.$table,
        row = params.row,
        column = params.column;
    var slots = column.slots,
        formatter = column.formatter;
    var editRender = _vm ? _vm.editRender : column.editRender;

    var compConf = _vXETable.Renderer.get(editRender.name);

    var context = {
      $excel: $table.$parent,
      $table: $table,
      $column: column
    };

    if (editRender.type === 'visible' || isEdit) {
      if (slots && slots.edit) {
        return slots.edit(params, h);
      }

      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, params, context) : [];
    }

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    if (formatter) {
      params.cellValue = _tools.UtilTools.getCellValue(row, column);
      return [_tools.UtilTools.formatText(formatter(params), 1)];
    }

    return compConf && compConf.renderCell ? compConf.renderCell.call($table, h, editRender, params, context) : Cell.renderCell(h, params);
  }
};
exports.Cell = Cell;
var _default = Cell;
exports.default = _default;