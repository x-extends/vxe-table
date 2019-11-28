"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Cell = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = require("../../v-x-e-table");

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cell = {
  createColumn: function createColumn($table, _vm) {
    var type = _vm.type,
        sortable = _vm.sortable,
        remoteSort = _vm.remoteSort,
        filters = _vm.filters,
        editRender = _vm.editRender,
        treeNode = _vm.treeNode; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = $table.checkboxConfig || $table.selectConfig;
    var renMaps = {
      renderHeader: this.renderHeader,
      renderCell: treeNode ? this.renderTreeCell : this.renderCell
    };

    switch (type) {
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
        renMaps.renderCell = checkboxConfig && checkboxConfig.checkField ? treeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp : treeNode ? this.renderTreeSelectionCell : this.renderSelectionCell;
        break;

      case 'expand':
        renMaps.renderCell = this.renderExpandCell;
        renMaps.renderData = this.renderExpandData;
        break;

      default:
        if (editRender) {
          renMaps.renderHeader = this.renderEditHeader;
          renMaps.renderCell = $table.editConfig && $table.editConfig.mode === 'cell' ? treeNode ? this.renderTreeCellEdit : this.renderCellEdit : treeNode ? this.renderTreeRadioCell : this.renderRowEdit;
        } else if (filters && filters.length && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader;
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader;
        } else if (filters && filters.length) {
          renMaps.renderHeader = this.renderFilterHeader;
        }

    }

    return _tools.UtilTools.getColumnConfig($table, _vm, renMaps);
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
    } // 在 v3.0 中废弃 label


    return [_tools.UtilTools.formatText(_tools.UtilTools.getFuncText(own.title || own.label), 1)];
  },
  renderCell: function renderCell(h, params) {
    var cellValue;
    var $table = params.$table,
        row = params.row,
        column = params.column;
    var slots = column.slots,
        own = column.own;
    var renderOpts = own.editRender || own.cellRender;

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    if (renderOpts) {
      var funName = own.editRender ? 'renderCell' : 'renderDefault';

      var compConf = _vXETable.Renderer.get(renderOpts.name);

      if (compConf && compConf[funName]) {
        return compConf[funName].call($table, h, renderOpts, params, {
          $type: own.editRender ? 'edit' : 'cell',
          $excel: $table.$parent,
          $table: $table,
          $column: column
        });
      }
    }

    cellValue = _tools.UtilTools.getCellLabel(row, column, params);
    return [_tools.UtilTools.formatText(cellValue, 1)];
  },
  renderTreeCell: function renderTreeCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderCell.call(this, h, params));
  },

  /**
   * 树节点
   */
  renderTreeIcon: function renderTreeIcon(h, params) {
    var $table = params.$table,
        isHidden = params.isHidden;
    var _$table$treeConfig = $table.treeConfig,
        treeConfig = _$table$treeConfig === void 0 ? {} : _$table$treeConfig,
        treeExpandeds = $table.treeExpandeds;
    var row = params.row,
        column = params.column,
        level = params.level;
    var slots = column.slots;
    var children = treeConfig.children,
        indent = treeConfig.indent,
        trigger = treeConfig.trigger,
        iconOpen = treeConfig.iconOpen,
        iconClose = treeConfig.iconClose;
    var rowChildren = row[children];
    var isAceived = false;
    var on = {};

    if (slots && slots.icon) {
      return slots.icon(params, h);
    }

    if (!isHidden) {
      isAceived = treeExpandeds.indexOf(row) > -1;
    }

    if (!trigger || trigger === 'default') {
      on.click = function (evnt) {
        return $table.triggerTreeExpandEvent(evnt, params);
      };
    }

    return [h('span', {
      class: 'vxe-tree--indent',
      style: {
        width: "".concat(level * (indent || 20), "px")
      }
    }), h('span', {
      class: ['vxe-tree-wrapper', {
        'is--active': isAceived
      }],
      on: on
    }, rowChildren && rowChildren.length ? [h('span', {
      class: 'vxe-tree--btn-wrapper'
    }, [h('i', {
      class: ['vxe-tree--node-btn', isAceived ? iconOpen || _conf.default.icon.treeOpen : iconClose || _conf.default.icon.treeClose]
    })])] : [])];
  },

  /**
   * 索引
   */
  renderIndexHeader: function renderIndexHeader(h, params) {
    var column = params.column;
    var slots = column.slots;

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    return [_tools.UtilTools.formatText(column.getTitle(), 1)];
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
    var column = params.column;
    var slots = column.slots,
        own = column.own;

    if (slots && slots.header) {
      return slots.header(params, h);
    } // 在 v3.0 中废弃 label


    return [_tools.UtilTools.formatText(_tools.UtilTools.getFuncText(own.title || own.label), 1)];
  },
  renderRadioCell: function renderRadioCell(h, params) {
    var _ref;

    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var vSize = $table.vSize,
        _$table$radioConfig = $table.radioConfig,
        radioConfig = _$table$radioConfig === void 0 ? {} : _$table$radioConfig;
    var slots = column.slots;
    var labelField = radioConfig.labelField,
        checkMethod = radioConfig.checkMethod;
    var isDisabled = !!checkMethod;
    var selectRow = $table.selectRow;
    var row = params.row;
    var options = {
      attrs: {
        type: 'radio',
        name: "vxe-radio--".concat($table.id)
      }
    };

    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params);
        options.attrs.disabled = isDisabled;
      }

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
      class: ['vxe-radio', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', isDisabled), _ref)]
    }, [h('input', options), h('span', {
      class: 'vxe-radio--icon'
    }), labelField ? h('span', {
      class: 'vxe-radio--label'
    }, slots && slots.default ? slots.default(params, h) : _xeUtils.default.get(row, labelField)) : null])];
  },
  renderTreeRadioCell: function renderTreeRadioCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderRadioCell(h, params));
  },

  /**
   * 多选
   */
  renderSelectionHeader: function renderSelectionHeader(h, params) {
    var _ref2;

    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var vSize = $table.vSize,
        isIndeterminate = $table.isIndeterminate,
        isAllCheckboxDisabled = $table.isAllCheckboxDisabled;
    var slots = column.slots,
        own = column.own; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = $table.checkboxConfig || $table.selectConfig; // 在 v3.0 中废弃 label

    var headerTitle = own.title || own.label;
    var options = {
      attrs: {
        type: 'checkbox',
        disabled: isAllCheckboxDisabled
      }
    };

    if (checkboxConfig && (checkboxConfig.checkStrictly ? !checkboxConfig.showHeader : checkboxConfig.showHeader === false)) {
      return slots && slots.header ? slots.header(params, h) : [_tools.UtilTools.getFuncText(headerTitle)];
    }

    if (!isHidden) {
      options.domProps = {
        checked: isAllCheckboxDisabled ? false : $table.isAllSelected
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerCheckAllEvent(evnt, evnt.target.checked);
        }
      };
    }

    return [h('label', {
      class: ['vxe-checkbox', (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--disabled', options.attrs.disabled), _defineProperty(_ref2, 'is--indeterminate', isIndeterminate), _ref2)]
    }, [h('input', options), h('span', {
      class: 'vxe-checkbox--icon'
    }), headerTitle ? h('span', {
      class: 'vxe-checkbox--label'
    }, slots && slots.header ? slots.header(params, h) : _tools.UtilTools.getFuncText(headerTitle)) : null])];
  },
  renderSelectionCell: function renderSelectionCell(h, params) {
    var _ref3;

    var $table = params.$table,
        row = params.row,
        column = params.column,
        isHidden = params.isHidden;
    var vSize = $table.vSize,
        treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = $table.checkboxConfig || $table.selectConfig || {};
    var labelField = checkboxConfig.labelField,
        checkMethod = checkboxConfig.checkMethod;
    var slots = column.slots;
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
      class: ['vxe-checkbox', (_ref3 = {}, _defineProperty(_ref3, "size--".concat(vSize), vSize), _defineProperty(_ref3, 'is--indeterminate', indeterminate), _defineProperty(_ref3, 'is--disabled', isDisabled), _ref3)]
    }, [h('input', options), h('span', {
      class: 'vxe-checkbox--icon'
    }), labelField ? h('span', {
      class: 'vxe-checkbox--label'
    }, slots && slots.default ? slots.default(params, h) : _xeUtils.default.get(row, labelField)) : null])];
  },
  renderTreeSelectionCell: function renderTreeSelectionCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCell(h, params));
  },
  renderSelectionCellByProp: function renderSelectionCellByProp(h, params) {
    var _ref4;

    var $table = params.$table,
        row = params.row,
        column = params.column,
        isHidden = params.isHidden;
    var vSize = $table.vSize,
        treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = $table.checkboxConfig || $table.selectConfig || {};
    var labelField = checkboxConfig.labelField,
        property = checkboxConfig.checkField,
        checkMethod = checkboxConfig.checkMethod;
    var slots = column.slots;
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
      class: ['vxe-checkbox', (_ref4 = {}, _defineProperty(_ref4, "size--".concat(vSize), vSize), _defineProperty(_ref4, 'is--indeterminate', indeterminate), _defineProperty(_ref4, 'is--disabled', isDisabled), _ref4)]
    }, [h('input', options), h('span', {
      class: 'vxe-checkbox--icon'
    }), labelField ? h('span', {
      class: 'vxe-checkbox--label'
    }, slots && slots.default ? slots.default(params, h) : _xeUtils.default.get(row, labelField)) : null])];
  },
  renderTreeSelectionCellByProp: function renderTreeSelectionCellByProp(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCellByProp(h, params));
  },

  /**
   * 展开行
   */
  renderExpandCell: function renderExpandCell(h, params) {
    var $table = params.$table,
        isHidden = params.isHidden,
        row = params.row,
        column = params.column;

    var _ref5 = $table.expandConfig || {},
        labelField = _ref5.labelField,
        iconOpen = _ref5.iconOpen,
        iconClose = _ref5.iconClose;

    var slots = column.slots;
    var isAceived = false;

    if (slots && slots.icon) {
      return slots.icon(params, h);
    }

    if (!isHidden) {
      isAceived = $table.rowExpandeds.indexOf(params.row) > -1;
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
      class: ['vxe-table--expand-btn', isAceived ? iconOpen || _conf.default.icon.expandOpen : iconClose || _conf.default.icon.expandClose]
    })]), slots.content && slots.default ? slots.default(params, h) : labelField ? _xeUtils.default.get(row, labelField) : null];
  },
  renderExpandData: function renderExpandData(h, params) {
    var column = params.column;
    var slots = column.slots;

    if (slots) {
      if (slots.content) {
        return slots.content(params, h);
      } // 在 v3.0 中严格支持 content


      if (slots.default) {
        return slots.default(params, h);
      }
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
    var $table = params.$table,
        column = params.column;
    return [h('span', {
      class: 'vxe-sort-wrapper'
    }, [h('i', {
      class: ['vxe-sort--asc-btn', _conf.default.icon.sortAsc, {
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
      class: ['vxe-sort--desc-btn', _conf.default.icon.sortDesc, {
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
    return Cell.renderHeader(h, params).concat(Cell.renderFilterIcon(h, params));
  },
  renderFilterIcon: function renderFilterIcon(h, params) {
    var $table = params.$table,
        column = params.column,
        hasFilter = params.hasFilter;
    var filterStore = $table.filterStore,
        _$table$filterConfig = $table.filterConfig,
        filterConfig = _$table$filterConfig === void 0 ? {} : _$table$filterConfig;
    var iconNone = filterConfig.iconNone,
        iconMatch = filterConfig.iconMatch;
    return [h('span', {
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
      class: ['vxe-edit-icon', editConfig.icon || _conf.default.icon.edit]
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
        own = column.own,
        formatter = column.formatter;
    var editRender = own.editRender;

    var compConf = _vXETable.Renderer.get(editRender.name);

    if (editRender.type === 'visible' || isEdit) {
      if (slots && slots.edit) {
        return slots.edit(params, h);
      }

      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, params, {
        $type: 'edit',
        $excel: $table.$parent,
        $table: $table,
        $column: column
      }) : [];
    }

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    if (formatter) {
      return [_tools.UtilTools.formatText(_tools.UtilTools.getCellLabel(row, column, params), 1)];
    }

    return Cell.renderCell.call(_vm, h, params);
  }
};
exports.Cell = Cell;
var _default = Cell;
exports.default = _default;