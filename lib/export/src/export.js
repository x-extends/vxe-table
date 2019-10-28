"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

var _default = {
  getCsvContent: function getCsvContent($table, opts, oColumns, fullData) {
    var isOriginal = opts.original;

    var _getCsvData = getCsvData($table, opts, fullData, oColumns),
        columns = _getCsvData.columns,
        datas = _getCsvData.datas;

    var content = "\uFEFF";

    if (opts.isHeader) {
      content += columns.map(function (_ref) {
        var own = _ref.own;
        return _tools.UtilTools.getFuncText(own.title || own.label);
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

    if (opts.isFooter) {
      var footerData = $table.footerData;
      var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
      var filterMaps = $table.tableColumn.map(function (column) {
        return columns.includes(column);
      });
      footers.forEach(function (rows) {
        content += rows.filter(function (val, colIndex) {
          return filterMaps[colIndex];
        }).join(',') + '\n';
      });
    }

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

function getCsvLabelData($table, columns, datas) {
  return datas.map(function (row) {
    var item = {};
    columns.forEach(function (column) {
      var cell = _tools.DomTools.getCell($table, {
        row: row,
        column: column
      });

      item[column.id] = cell ? cell.innerText.trim() : '';
    });
    return item;
  });
}

function getCsvData($table, opts, fullData, oColumns) {
  var columns = opts.columns ? opts.columns : oColumns;
  var datas = opts.data || fullData;

  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod);
  }

  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod);
  }

  return {
    columns: columns,
    datas: opts.original ? datas : getCsvLabelData($table, columns, datas)
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