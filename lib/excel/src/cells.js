"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowHeight = 24;
var _default = {
  cell: {
    autofocus: '.vxe-textarea',
    renderEdit: function renderEdit(h, editRender, params, _ref) {
      var $excel = _ref.$excel;
      var excelStore = $excel.excelStore;
      var uploadRows = excelStore.uploadRows;
      var row = params.row,
          column = params.column;
      return [h('div', {
        class: 'vxe-input--wrapper vxe-excel-cell',
        style: {
          height: "".concat(column.renderHeight, "px")
        }
      }, [h('textarea', {
        class: 'vxe-textarea',
        style: {
          width: "".concat(column.renderWidth, "px")
        },
        domProps: {
          value: _tools.UtilTools.getCellValue(row, column)
        },
        on: {
          input: function input(evnt) {
            var inpElem = evnt.target;

            _tools.UtilTools.setCellValue(row, column, inpElem.value);

            if (inpElem.scrollHeight > inpElem.offsetHeight) {
              if (uploadRows.indexOf(row) === -1) {
                inpElem.style.width = "".concat(inpElem.offsetWidth + 20, "px");
              } else {
                inpElem.style.height = "".concat(inpElem.scrollHeight, "px");
              }
            }
          },
          change: function change(evnt) {
            _tools.UtilTools.setCellValue(row, column, evnt.target.value);

            if (uploadRows.indexOf(row) === -1) {
              uploadRows.push(row);
            }
          },
          keydown: function keydown(evnt) {
            var inpElem = evnt.target;

            if (evnt.altKey && evnt.keyCode === 13) {
              evnt.preventDefault();
              evnt.stopPropagation();

              var rangeData = _tools.DomTools.getCursorPosition(inpElem);

              var pos = rangeData.end;
              var cellValue = inpElem.value;
              cellValue = "".concat(cellValue.slice(0, pos), "\n").concat(cellValue.slice(pos, cellValue.length));
              inpElem.value = cellValue;

              _tools.UtilTools.setCellValue(row, column, cellValue);

              inpElem.style.height = "".concat((Math.floor(inpElem.offsetHeight / rowHeight) + 1) * rowHeight, "px");
              setTimeout(function () {
                rangeData.start = rangeData.end = ++pos;

                _tools.DomTools.setCursorPosition(inpElem, rangeData);
              });
            }
          }
        }
      })])];
    },
    renderCell: function renderCell(h, editRender, params) {
      var row = params.row,
          column = params.column;
      return [h('span', {
        domProps: {
          innerHTML: _xeUtils.default.escape(_tools.UtilTools.getCellValue(row, column)).replace(/\n/g, '<br>')
        }
      })];
    }
  }
};
exports.default = _default;