"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowHeight = 24;

function getCursorPosition(textarea) {
  var rangeData = {
    text: '',
    start: 0,
    end: 0
  };

  if (textarea.setSelectionRange) {
    rangeData.start = textarea.selectionStart;
    rangeData.end = textarea.selectionEnd;
    rangeData.text = rangeData.start !== rangeData.end ? textarea.value.substring(rangeData.start, rangeData.end) : '';
  } else if (document.selection) {
    var index = 0;
    var range = document.selection.createRange();
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(textarea);
    rangeData.text = range.text;
    rangeData.bookmark = range.getBookmark();

    for (; textRange.compareEndPoints('StartToStart', range) < 0 && range.moveStart('character', -1) !== 0; index++) {
      if (textarea.value.charAt(index) === '\n') {
        index++;
      }
    }

    rangeData.start = index;
    rangeData.end = rangeData.text.length + rangeData.start;
  }

  return rangeData;
}

function setCursorPosition(textarea, rangeData) {
  if (textarea.setSelectionRange) {
    textarea.focus();
    textarea.setSelectionRange(rangeData.start, rangeData.end);
  } else if (textarea.createTextRange) {
    var textRange = textarea.createTextRange();

    if (textarea.value.length === rangeData.start) {
      textRange.collapse(false);
      textRange.select();
    } else {
      textRange.moveToBookmark(rangeData.bookmark);
      textRange.select();
    }
  }
}

var _default = {
  cell: {
    autofocus: '.vxe-textarea',
    renderEdit: function renderEdit(h, editRender, params, _ref) {
      var $excel = _ref.$excel;
      var excelStore = $excel.excelStore;
      var uploadRows = excelStore.uploadRows;
      var row = params.row,
          column = params.column;
      var model = column.model;
      return [h('div', {
        class: 'vxe-input--wrapper vxe-excel-cell',
        style: {
          height: "".concat(column.renderHeight - 1, "px")
        }
      }, [h('textarea', {
        class: 'vxe-textarea',
        style: {
          width: "".concat(column.renderWidth, "px")
        },
        domProps: {
          value: model.value
        },
        on: {
          input: function input(evnt) {
            var inpElem = evnt.target;
            model.update = true;
            model.value = inpElem.value;

            if (inpElem.scrollHeight > inpElem.offsetHeight) {
              if (uploadRows.indexOf(row) === -1) {
                inpElem.style.width = "".concat(inpElem.offsetWidth + 20, "px");
              } else {
                inpElem.style.height = "".concat(inpElem.scrollHeight, "px");
              }
            }
          },
          change: function change(evnt) {
            if (uploadRows.indexOf(row) === -1) {
              uploadRows.push(row);
            }
          },
          keydown: function keydown(evnt) {
            var inpElem = evnt.target;

            if (evnt.altKey && evnt.keyCode === 13) {
              evnt.preventDefault();
              evnt.stopPropagation();
              var rangeData = getCursorPosition(inpElem);
              var pos = rangeData.end;
              var cellValue = inpElem.value;
              cellValue = "".concat(cellValue.slice(0, pos), "\n").concat(cellValue.slice(pos, cellValue.length));
              inpElem.value = cellValue;
              model.update = true;
              model.value = cellValue;
              inpElem.style.height = "".concat((Math.floor(inpElem.offsetHeight / rowHeight) + 1) * rowHeight, "px");
              setTimeout(function () {
                rangeData.start = rangeData.end = ++pos;
                setCursorPosition(inpElem, rangeData);
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