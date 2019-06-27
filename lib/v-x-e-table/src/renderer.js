"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Renderer = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 内置渲染器
 * 只支持 input 和 textarea
 */
function defaultRenderer(h, attrs, editRender, params) {
  var $table = params.$table,
      row = params.row,
      column = params.column;
  var name = editRender.name;
  return [h('div', {
    class: 'vxe-input--wrapper'
  }, [h(name, {
    class: "vxe-".concat(name),
    attrs: attrs,
    domProps: {
      value: _tools.UtilTools.getCellValue(row, column)
    },
    on: {
      input: function input(evnt) {
        var cellValue = evnt.target.value;
        column.inputValue = cellValue; // UtilTools.setCellValue(row, column, evnt.target.value)

        $table.updateStatus(params, cellValue);
      },
      change: function change(evnt) {
        _tools.UtilTools.setCellValue(row, column, evnt.target.value);
      }
    }
  })])];
}

var rowHeight = 24;
var _storeMap = {
  input: {
    autofocus: '.vxe-input',
    renderEdit: function renderEdit(h, editRender, params) {
      return defaultRenderer(h, {
        type: 'text'
      }, editRender, params);
    }
  },
  textarea: {
    autofocus: '.vxe-textarea',
    renderEdit: function renderEdit(h, editRender, params) {
      return defaultRenderer(h, null, editRender, params);
    }
  },
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
          height: "".concat(column.renderHeight - 1, "px")
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
            column.inputValue = inpElem.value;

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
              column.inputValue = cellValue;
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
  /**
   * 全局渲染器
   */

};
var Renderer = {
  mixin: function mixin(map) {
    _xeUtils.default.each(map, function (options, name) {
      return Renderer.add(name, options);
    });

    return Renderer;
  },
  get: function get(name) {
    return _storeMap[name] || null;
  },
  add: function add(name, options) {
    if (name && options) {
      var renders = _storeMap[name];

      if (renders) {
        Object.assign(renders, options);
      } else {
        _storeMap[name] = options;
      }
    }

    return Renderer;
  },
  delete: function _delete(name) {
    delete _storeMap[name];
    return Renderer;
  }
};
exports.Renderer = Renderer;
var _default = Renderer;
exports.default = _default;