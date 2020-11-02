"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Cell = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderHelpIcon(h, params) {
  var $table = params.$table,
      column = params.column;
  var titleHelp = column.titleHelp;
  return titleHelp ? [h('i', {
    class: ['vxe-cell-help-icon', titleHelp.icon || _conf.default.icon.TABLE_HELP],
    on: {
      mouseenter: function mouseenter(evnt) {
        $table.triggerHeaderHelpEvent(evnt, params);
      },
      mouseleave: function mouseleave(evnt) {
        $table.handleTargetLeaveEvent(evnt);
      }
    }
  })] : [];
}

function renderTitleContent(h, params, content) {
  var $table = params.$table,
      column = params.column;
  var showHeaderOverflow = column.showHeaderOverflow;
  var allColumnHeaderOverflow = $table.showHeaderOverflow,
      tooltipOpts = $table.tooltipOpts;
  var enabled = tooltipOpts.enabled;
  var headOverflow = _ctor.default.isUndefined(showHeaderOverflow) || _ctor.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
  var showTitle = headOverflow === 'title';
  var showTooltip = headOverflow === true || headOverflow === 'tooltip';
  var ons = {};

  if (showTitle || showTooltip || enabled) {
    ons.mouseenter = function (evnt) {
      if ($table._isResize) {
        return;
      }

      if (showTitle) {
        _tools.DomTools.updateCellTitle(evnt.currentTarget, column);
      } else if (showTooltip || enabled) {
        $table.triggerHeaderTooltipEvent(evnt, params);
      }
    };
  }

  if (showTooltip || enabled) {
    ons.mouseleave = function (evnt) {
      if ($table._isResize) {
        return;
      }

      if (showTooltip || enabled) {
        $table.handleTargetLeaveEvent(evnt);
      }
    };
  }

  return [h('span', {
    class: 'vxe-cell--title',
    on: ons
  }, content)];
}

function getFooterContent(h, params) {
  var $table = params.$table,
      column = params.column,
      _columnIndex = params._columnIndex,
      items = params.items;
  var slots = column.slots,
      editRender = column.editRender,
      cellRender = column.cellRender;
  var renderOpts = editRender || cellRender;

  if (slots && slots.footer) {
    return slots.footer.call($table, params, h);
  }

  if (renderOpts) {
    var compConf = _vXETable.default.renderer.get(renderOpts.name);

    if (compConf && compConf.renderFooter) {
      return compConf.renderFooter.call($table, h, renderOpts, params, {
        $grid: $table.$xegrid,
        $table: $table
      });
    }
  }

  return [_tools.UtilTools.formatText(items[_columnIndex], 1)];
}

function getDefaultCellLabel(params) {
  var row = params.row,
      column = params.column;
  return _tools.UtilTools.formatText(_tools.UtilTools.getCellLabel(row, column, params), 1);
}

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
        renMaps.renderHeader = this.renderIndexHeader;
        renMaps.renderCell = treeNode ? this.renderTreeIndexCell : this.renderIndexCell;
        break;

      case 'radio':
        renMaps.renderHeader = this.renderRadioHeader;
        renMaps.renderCell = treeNode ? this.renderTreeRadioCell : this.renderRadioCell;
        break;

      case 'checkbox':
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
  renderHeaderTitle: function renderHeaderTitle(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots,
        editRender = column.editRender,
        cellRender = column.cellRender;
    var renderOpts = editRender || cellRender;

    if (slots && slots.header) {
      return renderTitleContent(h, params, slots.header.call($table, params, h));
    }

    if (renderOpts) {
      var compConf = _vXETable.default.renderer.get(renderOpts.name);

      if (compConf && compConf.renderHeader) {
        return renderTitleContent(h, params, compConf.renderHeader.call($table, h, renderOpts, params, {
          $grid: $table.$xegrid,
          $table: $table
        }));
      }
    }

    return renderTitleContent(h, params, _tools.UtilTools.formatText(column.getTitle(), 1));
  },
  renderDefaultHeader: function renderDefaultHeader(h, params) {
    return renderHelpIcon(h, params).concat(Cell.renderHeaderTitle(h, params));
  },
  renderDefaultCell: function renderDefaultCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots,
        editRender = column.editRender,
        cellRender = column.cellRender;
    var renderOpts = editRender || cellRender;

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    if (renderOpts) {
      var funName = editRender ? 'renderCell' : 'renderDefault';

      var compConf = _vXETable.default.renderer.get(renderOpts.name);

      if (compConf && compConf[funName]) {
        return compConf[funName].call($table, h, renderOpts, Object.assign({
          $type: editRender ? 'edit' : 'cell'
        }, params), {
          $grid: $table.$xegrid,
          $table: $table
        });
      }
    }

    return [h('span', {
      class: 'vxe-cell--label'
    }, [getDefaultCellLabel(params)])];
  },
  renderTreeCell: function renderTreeCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderDefaultCell.call(this, h, params));
  },
  renderDefaultFooter: function renderDefaultFooter(h, params) {
    return [h('span', {
      class: 'vxe-cell--item'
    }, getFooterContent(h, params))];
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
        showIcon = treeOpts.showIcon,
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
    }, [showIcon && (rowChilds && rowChilds.length || hasLazyChilds) ? [h('div', {
      class: 'vxe-tree--btn-wrapper',
      on: on
    }, [h('i', {
      class: ['vxe-tree--node-btn', isLazyLoaded ? iconLoaded || _conf.default.icon.TABLE_TREE_LOADED : isAceived ? iconOpen || _conf.default.icon.TABLE_TREE_OPEN : iconClose || _conf.default.icon.TABLE_TREE_CLOSE]
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
    return renderTitleContent(h, params, slots && slots.header ? slots.header.call($table, params, h) : _tools.UtilTools.formatText(column.getTitle(), 1));
  },
  renderIndexCell: function renderIndexCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var seqOpts = $table.seqOpts;
    var slots = column.slots;

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    var $seq = params.$seq,
        seq = params.seq,
        level = params.level;
    var seqMethod = seqOpts.seqMethod;
    return [_tools.UtilTools.formatText(seqMethod ? seqMethod(params) : level ? "".concat($seq, ".").concat(seq) : seqOpts.startIndex + seq, 1)];
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
    var slots = column.slots;
    return renderTitleContent(h, params, slots && slots.header ? slots.header.call($table, params, h) : [h('span', {
      class: 'vxe-radio--label'
    }, _tools.UtilTools.formatText(column.getTitle(), 1))]);
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
        isDisabled = !checkMethod({
          row: row
        });
      }
    }

    return [h('span', {
      class: ['vxe-cell--radio', {
        'is--checked': isChecked,
        'is--disabled': isDisabled
      }],
      on: on
    }, [h('span', {
      class: 'vxe-radio--icon vxe-radio--checked-icon'
    }), h('span', {
      class: 'vxe-radio--icon vxe-radio--unchecked-icon'
    })].concat(slots && slots.default ? slots.default.call($table, params, h) : labelField ? [h('span', {
      class: 'vxe-radio--label'
    }, _ctor.default.get(row, labelField))] : []))];
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
    var slots = column.slots;
    var checkboxOpts = $table.checkboxOpts;
    var headerTitle = column.getTitle();
    var isChecked = false;
    var on;

    if (checkboxOpts.checkStrictly ? !checkboxOpts.showHeader : checkboxOpts.showHeader === false) {
      return renderTitleContent(h, params, slots && slots.header ? slots.header.call($table, params, h) : [h('span', {
        class: 'vxe-checkbox--label'
      }, headerTitle)]);
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

    return renderTitleContent(h, params, [h('span', {
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isAllCheckboxDisabled,
        'is--indeterminate': isIndeterminate
      }],
      attrs: {
        title: _conf.default.i18n('vxe.table.allTitle')
      },
      on: on
    }, [h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
    })].concat(slots && slots.header ? slots.header.call($table, params, h) : headerTitle ? [h('span', {
      class: 'vxe-checkbox--label'
    }, headerTitle)] : []))]);
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
        isDisabled = !checkMethod({
          row: row
        });
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
    }, [h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
    })].concat(slots && slots.default ? slots.default.call($table, params, h) : labelField ? [h('span', {
      class: 'vxe-checkbox--label'
    }, _ctor.default.get(row, labelField))] : []))];
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
        halfField = _$table$checkboxOpts2.halfField,
        checkMethod = _$table$checkboxOpts2.checkMethod;
    var slots = column.slots;
    var indeterminate = false;
    var isChecked = false;
    var isDisabled = !!checkMethod;
    var on;

    if (!isHidden) {
      isChecked = _ctor.default.get(row, property);
      on = {
        click: function click(evnt) {
          if (!isDisabled) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked);
          }
        }
      };

      if (checkMethod) {
        isDisabled = !checkMethod({
          row: row
        });
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }
    }

    return [h('span', {
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isDisabled,
        'is--indeterminate': halfField && !isChecked ? row[halfField] : indeterminate
      }],
      on: on
    }, [h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
    })].concat(slots && slots.default ? slots.default.call($table, params, h) : labelField ? [h('span', {
      class: 'vxe-checkbox--label'
    }, _ctor.default.get(row, labelField))] : []))];
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
        showIcon = expandOpts.showIcon,
        iconOpen = expandOpts.iconOpen,
        iconClose = expandOpts.iconClose,
        visibleMethod = expandOpts.visibleMethod;
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

    return [showIcon && (!visibleMethod || visibleMethod(params)) ? h('span', {
      class: ['vxe-table--expanded', {
        'is--active': isAceived
      }],
      on: {
        click: function click(evnt) {
          $table.triggerRowExpandEvent(evnt, params);
        }
      }
    }, [h('i', {
      class: ['vxe-table--expand-btn', isLazyLoaded ? iconLoaded || _conf.default.icon.TABLE_EXPAND_LOADED : isAceived ? iconOpen || _conf.default.icon.TABLE_EXPAND_OPEN : iconClose || _conf.default.icon.TABLE_EXPAND_CLOSE]
    })]) : null, slots && slots.default || labelField ? h('span', {
      class: 'vxe-table--expand-label'
    }, slots.default ? slots.default.call($table, params, h) : _ctor.default.get(row, labelField)) : null];
  },
  renderExpandData: function renderExpandData(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots,
        contentRender = column.contentRender;

    if (slots && slots.content) {
      return slots.content.call($table, params, h);
    }

    if (contentRender) {
      var compConf = _vXETable.default.renderer.get(contentRender.name);

      if (compConf && compConf.renderExpand) {
        return compConf.renderExpand.call($table, h, contentRender, params, {
          $grid: $table.$xegrid,
          $table: $table
        });
      }
    }

    return [];
  },

  /**
   * HTML 标签
   */
  renderHTMLCell: function renderHTMLCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots;

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    return [h('span', {
      class: 'vxe-cell--html',
      domProps: {
        innerHTML: getDefaultCellLabel(params)
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
    return showIcon ? [h('span', {
      class: 'vxe-cell--sort'
    }, [h('i', {
      class: ['vxe-sort--asc-btn', iconAsc || _conf.default.icon.TABLE_SORT_ASC, {
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
      class: ['vxe-sort--desc-btn', iconDesc || _conf.default.icon.TABLE_SORT_DESC, {
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
    })])] : [];
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
    return showIcon ? [h('span', {
      class: ['vxe-cell--filter', {
        'is--active': filterStore.visible && filterStore.column === column
      }]
    }, [h('i', {
      class: ['vxe-filter--btn', hasFilter ? iconMatch || _conf.default.icon.TABLE_FILTER_MATCH : iconNone || _conf.default.icon.TABLE_FILTER_NONE],
      attrs: {
        title: _conf.default.i18n('vxe.table.filter')
      },
      on: {
        click: function click(evnt) {
          $table.triggerFilterEvent(evnt, params.column, params);
        }
      }
    })])] : [];
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
      var columnRules = _ctor.default.get(editRules, params.column.property);

      if (columnRules) {
        isRequired = columnRules.some(function (rule) {
          return rule.required;
        });
      }
    }

    return [isRequired && editOpts.showAsterisk ? h('i', {
      class: 'vxe-cell--required-icon'
    }) : null, editOpts.showIcon ? h('i', {
      class: ['vxe-cell--edit-icon', editOpts.icon || _conf.default.icon.TABLE_EDIT]
    }) : null].concat(Cell.renderDefaultHeader(h, params)).concat(sortable || remoteSort ? Cell.renderSortIcon(h, params) : []).concat(filters ? Cell.renderFilterIcon(h, params) : []);
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
        column = params.column;
    var slots = column.slots,
        editRender = column.editRender,
        formatter = column.formatter;

    var compConf = _vXETable.default.renderer.get(editRender.name);

    if (isEdit) {
      if (slots && slots.edit) {
        return slots.edit.call($table, params, h);
      }

      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, Object.assign({
        $type: 'edit'
      }, params), {
        $grid: $table.$xegrid,
        $table: $table
      }) : [];
    }

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    if (formatter) {
      return [h('span', {
        class: 'vxe-cell--label'
      }, [getDefaultCellLabel(params)])];
    }

    return Cell.renderDefaultCell.call(_vm, h, params);
  }
};
exports.Cell = Cell;
var _default = Cell;
exports.default = _default;