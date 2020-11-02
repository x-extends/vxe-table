"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = {
  methods: {
    /**
     * 往表格中插入临时数据
     *
     * @param {*} records
     */
    _insert: function _insert(records) {
      return this.insertAt(records);
    },

    /**
     * 往表格指定行中插入临时数据
     * 如果 row 为空则从插入到顶部
     * 如果 row 为 -1 则从插入到底部
     * 如果 row 为有效行则插入到该行的位置
     * @param {Object/Array} records 新的数据
     * @param {Row} row 指定行
     */
    _insertAt: function _insertAt(records, row) {
      var _this = this,
          _editStore$insertList;

      var mergeList = this.mergeList,
          afterFullData = this.afterFullData,
          editStore = this.editStore,
          sYOpts = this.sYOpts,
          scrollYLoad = this.scrollYLoad,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;

      if (!_ctor.default.isArray(records)) {
        records = [records];
      }

      var newRecords = records.map(function (record) {
        return _this.defineField(Object.assign({}, record));
      });

      if (!row) {
        afterFullData.unshift.apply(afterFullData, _toConsumableArray(newRecords));
        tableFullData.unshift.apply(tableFullData, _toConsumableArray(newRecords)); // 刷新单元格合并

        mergeList.forEach(function (mergeItem) {
          var mergeRowIndex = mergeItem.row;

          if (mergeRowIndex > 0) {
            mergeItem.row = mergeRowIndex + newRecords.length;
          }
        });
      } else {
        if (row === -1) {
          afterFullData.push.apply(afterFullData, _toConsumableArray(newRecords));
          tableFullData.push.apply(tableFullData, _toConsumableArray(newRecords)); // 刷新单元格合并

          mergeList.forEach(function (mergeItem) {
            var mergeRowIndex = mergeItem.row,
                mergeRowspan = mergeItem.rowspan;

            if (mergeRowIndex + mergeRowspan > afterFullData.length) {
              mergeItem.rowspan = mergeRowspan + newRecords.length;
            }
          });
        } else {
          if (treeConfig) {
            throw new Error(_tools.UtilTools.getLog('vxe.error.noTree', ['insert']));
          }

          var afIndex = afterFullData.indexOf(row);

          if (afIndex === -1) {
            throw new Error(_tools.UtilTools.error('vxe.error.unableInsert'));
          }

          afterFullData.splice.apply(afterFullData, [afIndex, 0].concat(_toConsumableArray(newRecords)));
          tableFullData.splice.apply(tableFullData, [tableFullData.indexOf(row), 0].concat(_toConsumableArray(newRecords))); // 刷新单元格合并

          mergeList.forEach(function (mergeItem) {
            var mergeRowIndex = mergeItem.row,
                mergeRowspan = mergeItem.rowspan;

            if (mergeRowIndex > afIndex) {
              mergeItem.row = mergeRowIndex + newRecords.length;
            } else if (mergeRowIndex + mergeRowspan > afIndex) {
              mergeItem.rowspan = mergeRowspan + newRecords.length;
            }
          });
        }
      }

      (_editStore$insertList = editStore.insertList).unshift.apply(_editStore$insertList, _toConsumableArray(newRecords));

      this.scrollYLoad = !treeConfig && sYOpts.gt > -1 && sYOpts.gt < tableFullData.length;
      this.handleTableData();
      this.updateFooter();
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
     * 如果为空则删除所有
     */
    _remove: function _remove(rows) {
      var _this2 = this;

      var afterFullData = this.afterFullData,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          mergeList = this.mergeList,
          editStore = this.editStore,
          checkboxOpts = this.checkboxOpts,
          selection = this.selection,
          isInsertByRow = this.isInsertByRow,
          sYOpts = this.sYOpts,
          scrollYLoad = this.scrollYLoad;
      var actived = editStore.actived,
          removeList = editStore.removeList,
          insertList = editStore.insertList;
      var property = checkboxOpts.checkField;
      var rest = [];

      if (!rows) {
        rows = tableFullData;
      } else if (!_ctor.default.isArray(rows)) {
        rows = [rows];
      } // 如果是新增，则保存记录


      rows.forEach(function (row) {
        if (!isInsertByRow(row)) {
          removeList.push(row);
        }
      }); // 如果绑定了多选属性，则更新状态

      if (!property) {
        rows.forEach(function (row) {
          var sIndex = selection.indexOf(row);

          if (sIndex > -1) {
            selection.splice(sIndex, 1);
          }
        });
      } // 从数据源中移除


      if (tableFullData === rows) {
        rows = rest = tableFullData.slice(0);
        this.tableFullData = [];
        this.afterFullData = [];
        this.clearMergeCells();
      } else {
        rows.forEach(function (row) {
          var tfIndex = tableFullData.indexOf(row);

          if (tfIndex > -1) {
            var rItems = tableFullData.splice(tfIndex, 1);
            rest.push(rItems[0]);
          }

          var afIndex = afterFullData.indexOf(row);

          if (afIndex > -1) {
            // 刷新单元格合并
            mergeList.forEach(function (mergeItem) {
              var mergeRowIndex = mergeItem.row,
                  mergeRowspan = mergeItem.rowspan;

              if (mergeRowIndex > afIndex) {
                mergeItem.row = mergeRowIndex - 1;
              } else if (mergeRowIndex + mergeRowspan > afIndex) {
                mergeItem.rowspan = mergeRowspan - 1;
              }
            });
            afterFullData.splice(afIndex, 1);
          }
        });
      } // 如果当前行被激活编辑，则清除激活状态


      if (actived.row && rows.indexOf(actived.row) > -1) {
        this.clearActived();
      } // 从新增中移除已删除的数据


      rows.forEach(function (row) {
        var iIndex = insertList.indexOf(row);

        if (iIndex > -1) {
          insertList.splice(iIndex, 1);
        }
      });
      this.scrollYLoad = !treeConfig && sYOpts.gt > -1 && sYOpts.gt < tableFullData.length;
      this.handleTableData();
      this.updateFooter();
      this.updateCache();
      this.checkSelectionStatus();

      if (scrollYLoad) {
        this.updateScrollYSpace();
      }

      return this.$nextTick().then(function () {
        _this2.recalculate();

        return {
          row: rest.length ? rest[rest.length - 1] : null,
          rows: rest
        };
      });
    },

    /**
     * 删除复选框选中的数据
     */
    _removeCheckboxRow: function _removeCheckboxRow() {
      var _this3 = this;

      return this.remove(this.getCheckboxRecords()).then(function (params) {
        _this3.clearCheckboxRow();

        return params;
      });
    },

    /**
     * 删除单选框选中的数据
     */
    _removeRadioRow: function _removeRadioRow() {
      var _this4 = this;

      var radioRecord = this.getRadioRecord();
      return this.remove(radioRecord || []).then(function (params) {
        _this4.clearRadioRow();

        return params;
      });
    },

    /**
     * 删除当前行选中的数据
     */
    _removeCurrentRow: function _removeCurrentRow() {
      var _this5 = this;

      var currentRecord = this.getCurrentRecord();
      return this.remove(currentRecord || []).then(function (params) {
        _this5.clearCurrentRow();

        return params;
      });
    },

    /**
     * 获取表格数据集，包含新增、删除、修改
     */
    _getRecordset: function _getRecordset() {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      };
    },

    /**
     * 获取新增的临时数据
     */
    _getInsertRecords: function _getInsertRecords() {
      var insertList = this.editStore.insertList;
      var insertRecords = [];

      if (insertList.length) {
        this.tableFullData.forEach(function (row) {
          if (insertList.indexOf(row) > -1) {
            insertRecords.push(row);
          }
        });
      }

      return insertRecords;
    },

    /**
     * 获取已删除的数据
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
      var keepSource = this.keepSource,
          tableFullData = this.tableFullData,
          isUpdateByRow = this.isUpdateByRow,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;

      if (keepSource) {
        if (treeConfig) {
          return _ctor.default.filterTree(tableFullData, function (row) {
            return isUpdateByRow(row);
          }, treeOpts);
        }

        return tableFullData.filter(function (row) {
          return isUpdateByRow(row);
        });
      }

      return [];
    },

    /**
     * 处理激活编辑
     */
    handleActived: function handleActived(params, evnt) {
      var _this6 = this;

      var editStore = this.editStore,
          editOpts = this.editOpts,
          tableColumn = this.tableColumn;
      var mode = editOpts.mode,
          activeMethod = editOpts.activeMethod;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender && cell) {
        if (actived.row !== row || (mode === 'cell' ? actived.column !== column : false)) {
          // 判断是否禁用编辑
          var type = 'edit-disabled';

          if (!activeMethod || activeMethod(params)) {
            if (this.mouseConfig) {
              this.clearSelected(evnt);
              this.clearCellAreas(evnt);
              this.clearCopyCellArea(evnt);
            }

            this.clostTooltip();
            this.clearActived(evnt);
            type = 'edit-actived';
            column.renderHeight = cell.offsetHeight;
            actived.args = params;
            actived.row = row;
            actived.column = column;

            if (mode === 'row') {
              tableColumn.forEach(function (column) {
                return _this6._getColumnModel(row, column);
              });
            } else {
              this._getColumnModel(row, column);
            }

            this.$nextTick(function () {
              _this6.handleFocus(params, evnt);
            });
          }

          this.emitEvent(type, params, evnt);
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
            _this6.handleFocus(params, evnt);
          });
        }

        this.focus();
      }

      return this.$nextTick();
    },
    _getColumnModel: function _getColumnModel(row, column) {
      var model = column.model,
          editRender = column.editRender;

      if (editRender) {
        model.value = _tools.UtilTools.getCellValue(row, column);
        model.update = false;
      }
    },
    _setColumnModel: function _setColumnModel(row, column) {
      var model = column.model,
          editRender = column.editRender;

      if (editRender && model.update) {
        _tools.UtilTools.setCellValue(row, column, model.value);

        model.update = false;
        model.value = null;
      }
    },

    /**
     * 清除激活的编辑
     */
    _clearActived: function _clearActived(evnt) {
      var _this7 = this;

      var tableColumn = this.tableColumn,
          editStore = this.editStore,
          editOpts = this.editOpts;
      var actived = editStore.actived;
      var args = actived.args,
          row = actived.row,
          column = actived.column;

      if (row || column) {
        if (editOpts.mode === 'row') {
          tableColumn.forEach(function (column) {
            return _this7._setColumnModel(row, column);
          });
        } else {
          this._setColumnModel(row, column);
        }

        this.updateFooter();
        this.emitEvent('edit-closed', args, evnt);
      }

      actived.args = null;
      actived.row = null;
      actived.column = null;
      return (_vXETable.default._valid ? this.clearValidate() : this.$nextTick()).then(this.recalculate);
    },
    _getActiveRecord: function _getActiveRecord() {
      var $el = this.$el,
          editStore = this.editStore,
          afterFullData = this.afterFullData;
      var _editStore$actived = editStore.actived,
          args = _editStore$actived.args,
          row = _editStore$actived.row;

      if (args && afterFullData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args);
      }

      return null;
    },

    /**
     * 判断行是否为激活编辑状态
     * @param {Row} row 行对象
     */
    _isActiveByRow: function _isActiveByRow(row) {
      return this.editStore.actived.row === row;
    },

    /**
     * 处理聚焦
     */
    handleFocus: function handleFocus(params) {
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender) {
        var compRender = _vXETable.default.renderer.get(editRender.name);

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
          inputElem.focus();

          if (autoselect) {
            inputElem.select();
          } else {
            // 保持一致行为，光标移到末端
            if (_tools.DomTools.browse.msie) {
              var textRange = inputElem.createTextRange();
              textRange.collapse(false);
              textRange.select();
            }
          }
        } else {
          // 显示到可视区中
          this.scrollToRow(row, column);
        }
      }
    },

    /**
     * 激活行编辑
     */
    _setActiveRow: function _setActiveRow(row) {
      return this.setActiveCell(row, _ctor.default.find(this.visibleColumn, function (column) {
        return column.editRender;
      }).property);
    },

    /**
     * 激活单元格编辑
     */
    _setActiveCell: function _setActiveCell(row, field) {
      var _this8 = this;

      return this.scrollToRow(row, true).then(function () {
        if (row && field) {
          var column = _ctor.default.find(_this8.visibleColumn, function (column) {
            return column.property === field;
          });

          if (column && column.editRender) {
            var cell = _this8.getCell(row, column);

            if (cell) {
              _this8.handleActived({
                row: row,
                rowIndex: _this8.getRowIndex(row),
                column: column,
                columnIndex: _this8.getColumnIndex(column),
                cell: cell,
                $table: _this8
              });

              _this8.lastCallTime = Date.now();
            }
          }
        }

        return _this8.$nextTick();
      });
    },

    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    _setSelectCell: function _setSelectCell(row, field) {
      var tableData = this.tableData,
          editOpts = this.editOpts,
          visibleColumn = this.visibleColumn;

      if (row && field && editOpts.trigger !== 'manual') {
        var column = _ctor.default.find(visibleColumn, function (column) {
          return column.property === field;
        });

        var rowIndex = tableData.indexOf(row);

        if (rowIndex > -1 && column) {
          var cell = this.getCell(row, column);
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
      var _this9 = this;

      var mouseConfig = this.mouseConfig,
          mouseOpts = this.mouseOpts,
          editOpts = this.editOpts,
          editStore = this.editStore;
      var actived = editStore.actived,
          selected = editStore.selected;
      var row = params.row,
          column = params.column;
      var isMouseSelected = mouseConfig && mouseOpts.selected;

      var selectMethod = function selectMethod() {
        if (isMouseSelected && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editOpts.mode === 'cell' ? actived.column !== column : false)) {
            _this9.clearActived(evnt);

            _this9.clearSelected(evnt);

            _this9.clearCellAreas(evnt);

            _this9.clearCopyCellArea(evnt);

            selected.args = params;
            selected.row = row;
            selected.column = column;

            if (isMouseSelected) {
              _this9.addColSdCls();
            }

            _this9.focus();
          }
        }

        return _this9.$nextTick();
      };

      return selectMethod();
    },

    /**
     * 获取选中的单元格
     */
    _getSelectedCell: function _getSelectedCell() {
      var _this$editStore$selec = this.editStore.selected,
          args = _this$editStore$selec.args,
          column = _this$editStore$selec.column;

      if (args && column) {
        return Object.assign({}, args);
      }

      return null;
    },

    /**
     * 清除所选中源状态
     */
    _clearSelected: function _clearSelected() {
      var selected = this.editStore.selected;
      selected.row = null;
      selected.column = null;
      this.reColTitleSdCls();
      this.reColSdCls();
      return this.$nextTick();
    },
    reColTitleSdCls: function reColTitleSdCls() {
      var headerElem = this.elemStore['main-header-list'];

      if (headerElem) {
        _ctor.default.arrayEach(headerElem.querySelectorAll('.col--title-selected'), function (elem) {
          return _tools.DomTools.removeClass(elem, 'col--title-selected');
        });
      }
    },
    reColSdCls: function reColSdCls() {
      var cell = this.$el.querySelector('.col--selected');

      if (cell) {
        _tools.DomTools.removeClass(cell, 'col--selected');
      }
    },
    addColSdCls: function addColSdCls() {
      var selected = this.editStore.selected;
      var row = selected.row,
          column = selected.column;
      this.reColSdCls();

      if (row && column) {
        var cell = this.getCell(row, column);

        if (cell) {
          _tools.DomTools.addClass(cell, 'col--selected');
        }
      }
    }
  }
};
exports.default = _default;