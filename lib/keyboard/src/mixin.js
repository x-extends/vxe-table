"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browse = _tools.DomTools.browse;

function getTargetOffset(target, container) {
  var offsetTop = 0;
  var offsetLeft = 0;

  var triggerCheckboxLabel = !browse.firefox && _tools.DomTools.hasClass(target, 'vxe-checkbox--label');

  if (triggerCheckboxLabel) {
    var checkboxLabelStyle = getComputedStyle(target);
    offsetTop -= _ctor.default.toNumber(checkboxLabelStyle.paddingTop);
    offsetLeft -= _ctor.default.toNumber(checkboxLabelStyle.paddingLeft);
  }

  while (target && target !== container) {
    offsetTop += target.offsetTop;
    offsetLeft += target.offsetLeft;
    target = target.offsetParent;

    if (triggerCheckboxLabel) {
      var checkboxStyle = getComputedStyle(target);
      offsetTop -= _ctor.default.toNumber(checkboxStyle.paddingTop);
      offsetLeft -= _ctor.default.toNumber(checkboxStyle.paddingLeft);
    }
  }

  return {
    offsetTop: offsetTop,
    offsetLeft: offsetLeft
  };
}

function getCheckboxRangeRows(_vm, params, targetTrElem, moveRange) {
  var countHeight = 0;
  var rangeRows = [];
  var isDown = moveRange > 0;
  var moveSize = moveRange > 0 ? moveRange : Math.abs(moveRange) + targetTrElem.offsetHeight;
  var afterFullData = _vm.afterFullData,
      scrollYStore = _vm.scrollYStore,
      scrollYLoad = _vm.scrollYLoad;

  if (scrollYLoad) {
    var _rowIndex = _vm._getRowIndex(params.row);

    if (isDown) {
      rangeRows = afterFullData.slice(_rowIndex, _rowIndex + Math.ceil(moveSize / scrollYStore.rowHeight));
    } else {
      rangeRows = afterFullData.slice(_rowIndex - Math.floor(moveSize / scrollYStore.rowHeight) + 1, _rowIndex + 1);
    }
  } else {
    var siblingProp = isDown ? 'next' : 'previous';

    while (targetTrElem && countHeight < moveSize) {
      rangeRows.push(_vm.getRowNode(targetTrElem).item);
      countHeight += targetTrElem.offsetHeight;
      targetTrElem = targetTrElem["".concat(siblingProp, "ElementSibling")];
    }
  }

  return rangeRows;
}

var _default = {
  methods: {
    // 处理 Tab 键移动
    moveTabSelected: function moveTabSelected(args, isLeft, evnt) {
      var _this = this;

      var afterFullData = this.afterFullData,
          visibleColumn = this.visibleColumn,
          editConfig = this.editConfig,
          editOpts = this.editOpts;
      var targetRow;
      var targetRowIndex;
      var targetColumnIndex;
      var params = Object.assign({}, args);

      var _rowIndex = this._getRowIndex(params.row);

      var _columnIndex = this._getColumnIndex(params.column);

      evnt.preventDefault();

      if (isLeft) {
        // 向左
        if (_columnIndex <= 0) {
          // 如果已经是第一列，则移动到上一行
          if (_rowIndex > 0) {
            targetRowIndex = _rowIndex - 1;
            targetRow = afterFullData[targetRowIndex];
            targetColumnIndex = visibleColumn.length - 1;
          }
        } else {
          targetColumnIndex = _columnIndex - 1;
        }
      } else {
        if (_columnIndex >= visibleColumn.length - 1) {
          // 如果已经是第一列，则移动到上一行
          if (_rowIndex < afterFullData.length - 1) {
            targetRowIndex = _rowIndex + 1;
            targetRow = afterFullData[targetRowIndex];
            targetColumnIndex = 0;
          }
        } else {
          targetColumnIndex = _columnIndex + 1;
        }
      }

      var targetColumn = visibleColumn[targetColumnIndex];

      if (targetColumn) {
        if (targetRow) {
          params.rowIndex = targetRowIndex;
          params.row = targetRow;
        } else {
          params.rowIndex = _rowIndex;
        }

        params.columnIndex = targetColumnIndex;
        params.column = targetColumn;
        params.cell = this.getCell(params.row, params.column);

        if (editConfig) {
          if (editOpts.trigger === 'click' || editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row') {
              this.handleActived(params, evnt);
            } else {
              this.scrollToRow(params.row, params.column).then(function () {
                return _this.handleSelected(params, evnt);
              });
            }
          }
        } else {
          this.scrollToRow(params.row, params.column).then(function () {
            return _this.handleSelected(params, evnt);
          });
        }
      }
    },
    // 处理当前行方向键移动
    moveCurrentRow: function moveCurrentRow(isUpArrow, isDwArrow, evnt) {
      var _this2 = this;

      var currentRow = this.currentRow,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          afterFullData = this.afterFullData;
      var targetRow;
      evnt.preventDefault();

      if (currentRow) {
        if (treeConfig) {
          var _XEUtils$findTree = _ctor.default.findTree(afterFullData, function (item) {
            return item === currentRow;
          }, treeOpts),
              index = _XEUtils$findTree.index,
              items = _XEUtils$findTree.items;

          if (isUpArrow && index > 0) {
            targetRow = items[index - 1];
          } else if (isDwArrow && index < items.length - 1) {
            targetRow = items[index + 1];
          }
        } else {
          var _rowIndex = this._getRowIndex(currentRow);

          if (isUpArrow && _rowIndex > 0) {
            targetRow = afterFullData[_rowIndex - 1];
          } else if (isDwArrow && _rowIndex < afterFullData.length - 1) {
            targetRow = afterFullData[_rowIndex + 1];
          }
        }
      } else {
        targetRow = afterFullData[0];
      }

      if (targetRow) {
        var params = {
          $table: this,
          row: targetRow
        };
        this.scrollToRow(targetRow).then(function () {
          return _this2.triggerCurrentRowEvent(evnt, params);
        });
      }
    },
    // 处理可编辑方向键移动
    moveSelected: function moveSelected(args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      var _this3 = this;

      var afterFullData = this.afterFullData,
          visibleColumn = this.visibleColumn;
      var params = Object.assign({}, args);

      var _rowIndex = this._getRowIndex(params.row);

      var _columnIndex = this._getColumnIndex(params.column);

      evnt.preventDefault();

      if (isUpArrow && _rowIndex > 0) {
        // 移动到上一行
        params.rowIndex = _rowIndex - 1;
        params.row = afterFullData[params.rowIndex];
      } else if (isDwArrow && _rowIndex < afterFullData.length - 1) {
        // 移动到下一行
        params.rowIndex = _rowIndex + 1;
        params.row = afterFullData[params.rowIndex];
      } else if (isLeftArrow && _columnIndex) {
        // 移动到左侧单元格
        params.columnIndex = _columnIndex - 1;
        params.column = visibleColumn[params.columnIndex];
      } else if (isRightArrow && _columnIndex < visibleColumn.length - 1) {
        // 移动到右侧单元格
        params.columnIndex = _columnIndex + 1;
        params.column = visibleColumn[params.columnIndex];
      }

      this.scrollToRow(params.row, params.column).then(function () {
        params.cell = _this3.getCell(params.row, params.column);

        _this3.handleSelected(params, evnt);
      });
    },

    /**
     * 表头单元格按下事件
     */
    triggerHeaderCellMousedownEvent: function triggerHeaderCellMousedownEvent(evnt, params) {
      var mouseConfig = this.mouseConfig,
          mouseOpts = this.mouseOpts;

      if (mouseConfig && mouseOpts.area && this.handleHeaderCellAreaEvent) {
        var cell = evnt.currentTarget;

        var triggerSort = _tools.DomTools.getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag;

        var triggerFilter = _tools.DomTools.getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag;

        this.handleHeaderCellAreaEvent(evnt, Object.assign({
          cell: cell,
          triggerSort: triggerSort,
          triggerFilter: triggerFilter
        }, params));
      }

      this.focus();
      this.closeMenu();
    },

    /**
     * 单元格按下事件
     */
    triggerCellMousedownEvent: function triggerCellMousedownEvent(evnt, params) {
      var cell = evnt.currentTarget;
      params.cell = cell;
      this.handleCellMousedownEvent(evnt, params);
      this.focus();
      this.closeFilter();
      this.closeMenu();
    },
    handleCellMousedownEvent: function handleCellMousedownEvent(evnt, params) {
      var editConfig = this.editConfig,
          editOpts = this.editOpts,
          handleSelected = this.handleSelected,
          checkboxConfig = this.checkboxConfig,
          checkboxOpts = this.checkboxOpts,
          mouseConfig = this.mouseConfig,
          mouseOpts = this.mouseOpts;

      if (mouseConfig && mouseOpts.area && this.handleCellAreaEvent) {
        return this.handleCellAreaEvent(evnt, params);
      } else {
        if (checkboxConfig && checkboxOpts.range) {
          this.handleCheckboxRangeEvent(evnt, params);
        }

        if (mouseConfig && mouseOpts.selected) {
          if (!editConfig || editOpts.mode === 'cell') {
            handleSelected(params, evnt);
          }
        }
      }
    },
    handleCheckboxRangeEvent: function handleCheckboxRangeEvent(evnt, params) {
      var _this4 = this;

      var column = params.column,
          cell = params.cell;

      if (column.type === 'checkbox') {
        var $el = this.$el,
            elemStore = this.elemStore;
        var disX = evnt.clientX;
        var disY = evnt.clientY;
        var bodyWrapperElem = elemStore["".concat(column.fixed || 'main', "-body-wrapper")] || elemStore['main-body-wrapper'];
        var checkboxRangeElem = bodyWrapperElem.querySelector('.vxe-table--checkbox-range');
        var domMousemove = document.onmousemove;
        var domMouseup = document.onmouseup;
        var trElem = cell.parentNode;
        var selectRecords = this.getCheckboxRecords();
        var lastRangeRows = [];
        var marginSize = 1;
        var offsetRest = getTargetOffset(evnt.target, bodyWrapperElem);
        var startTop = offsetRest.offsetTop + evnt.offsetY;
        var startLeft = offsetRest.offsetLeft + evnt.offsetX;
        var startScrollTop = bodyWrapperElem.scrollTop;
        var rowHeight = trElem.offsetHeight;
        var mouseScrollTimeout = null;
        var isMouseScrollDown = false;
        var mouseScrollSpaceSize = 1;

        var triggerEvent = function triggerEvent(type, evnt) {
          _this4.emitEvent("checkbox-range-".concat(type), {
            records: _this4.getCheckboxRecords(),
            reserves: _this4.getCheckboxReserveRecords()
          }, evnt);
        };

        var handleChecked = function handleChecked(evnt) {
          var clientX = evnt.clientX,
              clientY = evnt.clientY;
          var offsetLeft = clientX - disX;
          var offsetTop = clientY - disY + (bodyWrapperElem.scrollTop - startScrollTop);
          var rangeHeight = Math.abs(offsetTop);
          var rangeWidth = Math.abs(offsetLeft);
          var rangeTop = startTop;
          var rangeLeft = startLeft;

          if (offsetTop < marginSize) {
            // 向上
            rangeTop += offsetTop;

            if (rangeTop < marginSize) {
              rangeTop = marginSize;
              rangeHeight = startTop;
            }
          } else {
            // 向下
            rangeHeight = Math.min(rangeHeight, bodyWrapperElem.scrollHeight - startTop - marginSize);
          }

          if (offsetLeft < marginSize) {
            // 向左
            rangeLeft += offsetLeft;

            if (rangeWidth > startLeft) {
              rangeLeft = marginSize;
              rangeWidth = startLeft;
            }
          } else {
            // 向右
            rangeWidth = Math.min(rangeWidth, bodyWrapperElem.clientWidth - startLeft - marginSize);
          }

          checkboxRangeElem.style.height = "".concat(rangeHeight, "px");
          checkboxRangeElem.style.width = "".concat(rangeWidth, "px");
          checkboxRangeElem.style.left = "".concat(rangeLeft, "px");
          checkboxRangeElem.style.top = "".concat(rangeTop, "px");
          checkboxRangeElem.style.display = 'block';
          var rangeRows = getCheckboxRangeRows(_this4, params, trElem, offsetTop < marginSize ? -rangeHeight : rangeHeight); // 至少滑动 10px 才能有效匹配

          if (rangeHeight > 10 && rangeRows.length !== lastRangeRows.length) {
            lastRangeRows = rangeRows;

            if (evnt.ctrlKey) {
              rangeRows.forEach(function (row) {
                _this4.handleSelectRow({
                  row: row
                }, selectRecords.indexOf(row) === -1);
              });
            } else {
              _this4.setAllCheckboxRow(false);

              _this4.setCheckboxRow(rangeRows, true);
            }

            triggerEvent('change', evnt);
          }
        }; // 停止鼠标滚动


        var stopMouseScroll = function stopMouseScroll() {
          clearTimeout(mouseScrollTimeout);
          mouseScrollTimeout = null;
        }; // 开始鼠标滚动


        var startMouseScroll = function startMouseScroll(evnt) {
          stopMouseScroll();
          mouseScrollTimeout = setTimeout(function () {
            if (mouseScrollTimeout) {
              var scrollLeft = bodyWrapperElem.scrollLeft,
                  scrollTop = bodyWrapperElem.scrollTop,
                  clientHeight = bodyWrapperElem.clientHeight,
                  scrollHeight = bodyWrapperElem.scrollHeight;
              var topSize = Math.ceil(mouseScrollSpaceSize * 50 / rowHeight);

              if (isMouseScrollDown) {
                if (scrollTop + clientHeight < scrollHeight) {
                  _this4.scrollTo(scrollLeft, scrollTop + topSize);

                  startMouseScroll(evnt);
                  handleChecked(evnt);
                } else {
                  stopMouseScroll();
                }
              } else {
                if (scrollTop) {
                  _this4.scrollTo(scrollLeft, scrollTop - topSize);

                  startMouseScroll(evnt);
                  handleChecked(evnt);
                } else {
                  stopMouseScroll();
                }
              }
            }
          }, 50);
        };

        _tools.DomTools.addClass($el, 'drag--range');

        document.onmousemove = function (evnt) {
          evnt.preventDefault();
          evnt.stopPropagation();
          var clientY = evnt.clientY;

          var _DomTools$getAbsolute = _tools.DomTools.getAbsolutePos(bodyWrapperElem),
              boundingTop = _DomTools$getAbsolute.boundingTop; // 如果超过可视区，触发滚动


          if (clientY < boundingTop) {
            isMouseScrollDown = false;
            mouseScrollSpaceSize = boundingTop - clientY;

            if (!mouseScrollTimeout) {
              startMouseScroll(evnt);
            }
          } else if (clientY > boundingTop + bodyWrapperElem.clientHeight) {
            isMouseScrollDown = true;
            mouseScrollSpaceSize = clientY - boundingTop - bodyWrapperElem.clientHeight;

            if (!mouseScrollTimeout) {
              startMouseScroll(evnt);
            }
          } else if (mouseScrollTimeout) {
            stopMouseScroll();
          }

          handleChecked(evnt);
        };

        document.onmouseup = function (evnt) {
          stopMouseScroll();

          _tools.DomTools.removeClass($el, 'drag--range');

          checkboxRangeElem.removeAttribute('style');
          document.onmousemove = domMousemove;
          document.onmouseup = domMouseup;
          triggerEvent('end', evnt);
        };

        triggerEvent('start', evnt);
      }
    }
  }
};
exports.default = _default;