"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _vXETable = require("../../v-x-e-table");

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browse = _tools.DomTools.browse;
var _default = {
  _insert: function _insert(records) {
    return this.insertAt(records);
  },

  /**
   * 从指定行插入数据
   */
  _insertAt: function _insertAt(records, row) {
    var _this = this;

    var afterFullData = this.afterFullData,
        editStore = this.editStore,
        scrollYLoad = this.scrollYLoad,
        tableFullData = this.tableFullData,
        treeConfig = this.treeConfig;

    if (treeConfig) {
      throw new Error(_tools.UtilTools.error('vxe.error.treeInsert'));
    }

    if (!_xeUtils.default.isArray(records)) {
      records = [records];
    }

    var nowData = afterFullData;
    var newRecords = records.map(function (record) {
      return _this.defineField(Object.assign({}, record));
    });

    if (!row) {
      nowData.unshift.apply(nowData, newRecords);
      tableFullData.unshift.apply(tableFullData, newRecords);
    } else {
      if (row === -1) {
        nowData.push.apply(nowData, newRecords);
        tableFullData.push.apply(tableFullData, newRecords);
      } else {
        var targetIndex = nowData.indexOf(row);

        if (targetIndex === -1) {
          throw new Error(_tools.UtilTools.error('vxe.error.unableInsert'));
        }

        nowData.splice.apply(nowData, [targetIndex, 0].concat(newRecords));
        tableFullData.splice.apply(tableFullData, [tableFullData.indexOf(row), 0].concat(newRecords));
      }
    }

    [].unshift.apply(editStore.insertList, newRecords);
    this.handleTableData();
    this.updateCache();
    this.checkSelectionStatus();

    if (scrollYLoad) {
      this.updateScrollYSpace();
    }

    return this.$nextTick().then(function () {
      _this.recalculate();

      return {
        row: newRecords.length ? newRecords[newRecords.length - 1] : null,
        rows: newRecords
      };
    });
  },

  /**
   * 删除指定行数据
   * 如果传 row 则删除一行
   * 如果传 rows 则删除多行
   */
  _remove: function _remove(rows) {
    var _this2 = this;

    var afterFullData = this.afterFullData,
        tableFullData = this.tableFullData,
        editStore = this.editStore,
        treeConfig = this.treeConfig,
        _this$selectConfig = this.selectConfig,
        selectConfig = _this$selectConfig === void 0 ? {} : _this$selectConfig,
        selection = this.selection,
        hasRowInsert = this.hasRowInsert,
        scrollYLoad = this.scrollYLoad;
    var removeList = editStore.removeList,
        insertList = editStore.insertList;
    var property = selectConfig.checkField;
    var rest = [];
    var nowData = afterFullData;

    if (treeConfig) {
      throw new Error(_tools.UtilTools.error('vxe.error.treeRemove'));
    }

    if (!rows) {
      rows = tableFullData;
    } else if (!_xeUtils.default.isArray(rows)) {
      rows = [rows];
    } // 如果是新增，则保存记录


    rows.forEach(function (row) {
      if (!hasRowInsert(row)) {
        removeList.push(row);
      }
    }); // 如果绑定了多选属性，则更新状态

    if (!property) {
      _xeUtils.default.remove(selection, function (row) {
        return rows.indexOf(row) > -1;
      });
    } // 从数据源中移除


    if (tableFullData === rows) {
      rows = tableFullData.slice(0);
      tableFullData.length = 0;
      nowData.length = 0;
    } else {
      rest = _xeUtils.default.remove(tableFullData, function (row) {
        return rows.indexOf(row) > -1;
      });

      _xeUtils.default.remove(nowData, function (row) {
        return rows.indexOf(row) > -1;
      });
    } // 从新增中移除已删除的数据


    _xeUtils.default.remove(insertList, function (row) {
      return rows.indexOf(row) > -1;
    });

    this.handleTableData();
    this.updateCache();
    this.checkSelectionStatus();

    if (scrollYLoad) {
      this.updateScrollYSpace();
    }

    return this.$nextTick().then(function () {
      _this2.recalculate();

      return {
        row: rows && rows.length ? rows[rows.length - 1] : null,
        rows: rest
      };
    });
  },

  /**
   * 删除选中数据
   */
  _removeSelecteds: function _removeSelecteds() {
    var _this3 = this;

    return this.remove(this.getSelectRecords()).then(function (params) {
      _this3.clearSelection();

      return params;
    });
  },
  _revert: function _revert() {
    _tools.UtilTools.warn('vxe.error.delRevert');

    return this.revertData.apply(this, arguments);
  },

  /**
   * 还原数据
   * 如果不传任何参数，则还原整个表格
   * 如果传 row 则还原一行
   * 如果传 rows 则还原多行
   * 如果还额外传了 field 则还原指定单元格
   */
  _revertData: function _revertData(rows, field) {
    var tableSourceData = this.tableSourceData,
        getRowIndex = this.getRowIndex;

    if (arguments.length) {
      if (rows && !_xeUtils.default.isArray(rows)) {
        rows = [rows];
      }

      rows.forEach(function (row) {
        var rowIndex = getRowIndex(row);
        var oRow = tableSourceData[rowIndex];

        if (oRow && row) {
          if (field) {
            _xeUtils.default.set(row, field, _xeUtils.default.get(oRow, field));
          } else {
            _xeUtils.default.destructuring(row, oRow);
          }
        }
      });
      return this.$nextTick();
    }

    return this.reloadData(tableSourceData);
  },

  /**
   * 获取表格数据集
   */
  _getRecordset: function _getRecordset() {
    return {
      insertRecords: this.getInsertRecords(),
      removeRecords: this.getRemoveRecords(),
      updateRecords: this.getUpdateRecords()
    };
  },

  /**
   * 获取新增数据
   */
  _getInsertRecords: function _getInsertRecords() {
    return this.editStore.insertList;
  },

  /**
   * 获取删除数据
   */
  _getRemoveRecords: function _getRemoveRecords() {
    return this.editStore.removeList;
  },

  /**
   * 获取更新数据
   * 只精准匹配 row 的更改
   * 如果是树表格，子节点更改状态不会影响父节点的更新状态
   */
  _getUpdateRecords: function _getUpdateRecords() {
    var tableFullData = this.tableFullData,
        hasRowChange = this.hasRowChange,
        treeConfig = this.treeConfig;

    if (treeConfig) {
      return _xeUtils.default.filterTree(tableFullData, function (row) {
        return hasRowChange(row);
      }, treeConfig);
    }

    return tableFullData.filter(function (row) {
      return hasRowChange(row);
    });
  },

  /**
   * 处理激活编辑
   */
  handleActived: function handleActived(params, evnt) {
    var _this4 = this;

    var editStore = this.editStore,
        editConfig = this.editConfig,
        tableColumn = this.tableColumn;
    var activeMethod = editConfig.activeMethod;
    var actived = editStore.actived;
    var row = params.row,
        column = params.column,
        cell = params.cell;
    var model = column.model,
        editRender = column.editRender;

    if (editRender && cell) {
      if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
        // 判断是否禁用编辑
        var type = 'edit-disabled';

        if (!activeMethod || activeMethod(params)) {
          if (this.keyboardConfig || this.mouseConfig) {
            this.clearCopyed(evnt);
            this.clearChecked();
            this.clearSelected(evnt);
          }

          this.clostTooltip();
          this.clearActived(evnt);
          type = 'edit-actived';
          column.renderHeight = cell.offsetHeight;
          actived.args = params;
          actived.row = row;
          actived.column = column;

          if (editConfig.mode === 'row') {
            tableColumn.forEach(function (column) {
              if (column.editRender) {
                column.model.value = _tools.UtilTools.getCellValue(row, column);
                column.model.update = false;
              }
            });
          } else {
            model.value = _tools.UtilTools.getCellValue(row, column);
            model.update = false;
          }

          this.$nextTick(function () {
            _this4.handleFocus(params, evnt);
          });
        }

        _tools.UtilTools.emitEvent(this, type, [params, evnt]);
      } else {
        var oldColumn = actived.column;

        if (oldColumn !== column) {
          var oldModel = oldColumn.model;

          if (oldModel.update) {
            _tools.UtilTools.setCellValue(row, oldColumn, oldModel.value);
          }

          this.clearValidate();
        }

        column.renderHeight = cell.offsetHeight;
        actived.args = params;
        actived.column = column;
        setTimeout(function () {
          _this4.handleFocus(params, evnt);
        });
      }
    }

    return this.$nextTick();
  },

  /**
   * 清除激活的编辑
   */
  _clearActived: function _clearActived(evnt) {
    var editStore = this.editStore;
    var actived = editStore.actived;
    var args = actived.args,
        row = actived.row,
        column = actived.column;

    if (row || column) {
      var model = column.model;

      if (model.update) {
        _tools.UtilTools.setCellValue(row, column, model.value);

        model.update = false;
        model.value = null;
        this.updateFooter();
      }

      _tools.UtilTools.emitEvent(this, 'edit-closed', [args, evnt]);
    }

    actived.args = null;
    actived.row = null;
    actived.column = null;
    return this.clearValidate().then(function () {
      return row || column ? new Promise(function (resolve) {
        return setTimeout(resolve);
      }) : 0;
    }).then(this.recalculate);
  },
  _getActiveRow: function _getActiveRow() {
    var $el = this.$el,
        editStore = this.editStore,
        tableData = this.tableData;
    var _editStore$actived = editStore.actived,
        args = _editStore$actived.args,
        row = _editStore$actived.row;

    if (args && tableData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
      return Object.assign({}, args);
    }

    return null;
  },
  _hasActiveRow: function _hasActiveRow(row) {
    return this.editStore.actived.row === row;
  },

  /**
   * 处理聚焦
   */
  handleFocus: function handleFocus(params, evnt) {
    var column = params.column,
        cell = params.cell;
    var editRender = column.editRender;

    if (editRender) {
      var compRender = _vXETable.Renderer.get(editRender.name);

      var autofocus = editRender.autofocus,
          autoselect = editRender.autoselect;
      var inputElem; // 如果指定了聚焦 class

      if (autofocus) {
        inputElem = cell.querySelector(autofocus);
      } // 渲染器的聚焦处理


      if (!inputElem && compRender && compRender.autofocus) {
        inputElem = cell.querySelector(compRender.autofocus);
      }

      if (inputElem) {
        inputElem[autoselect ? 'select' : 'focus']();

        if (browse.msie) {
          var textRange = inputElem.createTextRange();
          textRange.collapse(false);
          textRange.select();
        }
      }
    }
  },

  /**
   * 激活行编辑
   */
  _setActiveRow: function _setActiveRow(row) {
    return this.setActiveCell(row, this.visibleColumn.find(function (column) {
      return column.editRender;
    }).property);
  },

  /**
   * 激活单元格编辑
   */
  _setActiveCell: function _setActiveCell(row, field) {
    var _this5 = this;

    return this.scrollToRow(row, true).then(function () {
      if (row && field) {
        var column = _this5.visibleColumn.find(function (column) {
          return column.property === field;
        });

        if (column && column.editRender) {
          var cell = _tools.DomTools.getCell(_this5, {
            row: row,
            column: column
          });

          if (cell) {
            _this5.handleActived({
              row: row,
              rowIndex: _this5.getRowIndex(row),
              column: column,
              columnIndex: _this5.getColumnIndex(column),
              cell: cell,
              $table: _this5
            });

            _this5.lastCallTime = Date.now();
          }
        }
      }

      return _this5.$nextTick();
    });
  },

  /**
   * 只对 trigger=dblclick 有效，选中单元格
   */
  _setSelectCell: function _setSelectCell(row, field) {
    var tableData = this.tableData,
        editConfig = this.editConfig,
        visibleColumn = this.visibleColumn;

    if (row && field && editConfig.trigger !== 'manual') {
      var column = visibleColumn.find(function (column) {
        return column.property === field;
      });
      var rowIndex = tableData.indexOf(row);

      if (rowIndex > -1 && column) {
        var cell = _tools.DomTools.getCell(this, {
          row: row,
          rowIndex: rowIndex,
          column: column
        });

        var params = {
          row: row,
          rowIndex: rowIndex,
          column: column,
          columnIndex: visibleColumn.indexOf(column),
          cell: cell
        };
        this.handleSelected(params, {});
      }
    }

    return this.$nextTick();
  },

  /**
   * 处理选中源
   */
  handleSelected: function handleSelected(params, evnt) {
    var _this6 = this;

    var _this$mouseConfig = this.mouseConfig,
        mouseConfig = _this$mouseConfig === void 0 ? {} : _this$mouseConfig,
        editConfig = this.editConfig,
        editStore = this.editStore,
        elemStore = this.elemStore;
    var actived = editStore.actived,
        selected = editStore.selected;
    var row = params.row,
        column = params.column,
        cell = params.cell;

    var selectMethod = function selectMethod() {
      if (selected.row !== row || selected.column !== column) {
        if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
          if (_this6.keyboardConfig || _this6.mouseConfig) {
            _this6.clearChecked(evnt);

            _this6.clearIndexChecked();

            _this6.clearHeaderChecked();

            _this6.clearSelected(evnt);
          }

          _this6.clearActived(evnt);

          selected.args = params;
          selected.row = row;
          selected.column = column;

          if (mouseConfig.selected) {
            var listElem = elemStore['main-body-list'];

            var rowid = _tools.UtilTools.getRowid(_this6, row);

            var trElem = listElem.querySelector("[data-rowid=\"".concat(rowid, "\"]"));
            var tdElem = trElem.querySelector(".".concat(column.id));

            _tools.DomTools.addClass(tdElem, 'col--selected');
          } // 如果配置了批量选中功能，则为批量选中状态


          if (mouseConfig.checked) {
            var headerElem = elemStore['main-header-list'];

            _this6.handleChecked([[cell]]);

            if (headerElem) {
              _this6.handleHeaderChecked([[headerElem.querySelector(".".concat(column.id))]]);
            }

            _this6.handleIndexChecked([[cell.parentNode.querySelector('.col--index')]]);
          }
        }
      }

      return _this6.$nextTick();
    };

    return selectMethod();
  }
};
exports.default = _default;