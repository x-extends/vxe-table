"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

var _default = {
  getCsvContent: function getCsvContent(opts, oData, oColumns, tableElem) {
    var isOriginal = opts.original;

    var _getCsvData = getCsvData(opts, oData, oColumns, tableElem),
        columns = _getCsvData.columns,
        datas = _getCsvData.datas;

    var content = "\uFEFF";

    if (opts.isHeader) {
      content += columns.map(function (_ref) {
        var own = _ref.own;
        return own.title || own.label;
      }).join(',') + '\n';
    }

    datas.forEach(function (row, rowIndex) {
      if (isOriginal) {
        content += columns.map(function (column) {
          if (column.type === 'index') {
            return "\"".concat(column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1, "\"");
          }

          return "\"".concat(_tools.UtilTools.getCellValue(row, column) || '', "\"");
        }).join(',') + '\n';
      } else {
        content += columns.map(function (column) {
          return "\"".concat(row[column.id], "\"");
        }).join(',') + '\n';
      }
    });
    return content;
  },
  downloadCsc: function downloadCsc(opts, content) {
    if (!opts.download) {
      return Promise.resolve(content);
    }

    if (navigator.msSaveBlob && window.Blob) {
      navigator.msSaveBlob(new Blob([content], {
        type: 'text/csv'
      }), opts.filename);
    } else if (_tools.DomTools.browse['-ms']) {
      var win = window.top.open('about:blank', '_blank');
      win.document.charset = 'utf-8';
      win.document.write(content);
      win.document.close();
      win.document.execCommand('SaveAs', opts.filename);
      win.close();
    } else {
      var linkElem = document.createElement('a');
      linkElem.target = '_blank';
      linkElem.download = opts.filename;
      linkElem.href = getCsvUrl(opts, content);
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
    }
  }
};
exports.default = _default;

function getCsvLabelData(columns, oData, tableElem) {
  var trElemList = tableElem.querySelectorAll('.vxe-table--body-wrapper.body--wrapper .vxe-body--row');
  return Array.from(trElemList).map(function (trElem) {
    var item = {};
    columns.forEach(function (column) {
      var cell = trElem.querySelector(".".concat(column.id));
      item[column.id] = cell ? cell.innerText.trim() : '';
    });
    return item;
  });
}

function getCsvData(opts, oData, oColumns, tableElem) {
  var isOriginal = opts.original;
  var columns = opts.columns ? opts.columns : oColumns;

  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod);
  }

  var datas = opts.data ? opts.data : isOriginal ? oData : getCsvLabelData(columns, oData, tableElem);

  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod);
  }

  return {
    columns: columns,
    datas: datas
  };
}

function getCsvUrl(opts, content) {
  if (window.Blob && window.URL && window.URL.createObjectURL && !_tools.DomTools.browse.safari) {
    return URL.createObjectURL(new Blob([content], {
      type: 'text/csv'
    }));
  }

  return "data:attachment/csv;charset=utf-8,".concat(encodeURIComponent(content));
}