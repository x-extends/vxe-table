"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

function toCsv($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var content = "\uFEFF";

  if (opts.isHeader) {
    content += columns.map(function (_ref) {
      var own = _ref.own;
      return "\"".concat(_tools.UtilTools.getFuncText(own.title || own.label), "\"");
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
        return "\"".concat(filterMaps[colIndex], "\"");
      }).join(',') + '\n';
    });
  }

  return content;
}

function toHtml($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var html = '<table border="1" cellspacing="0" cellpadding="0">';

  if (opts.isHeader) {
    html += '<thead><tr><th>' + columns.map(function (_ref2) {
      var own = _ref2.own;
      return _tools.UtilTools.getFuncText(own.title || own.label);
    }).join('</th><th>') + '</th></tr></thead>';
  }

  html += '<tbody>';
  datas.forEach(function (row, rowIndex) {
    html += '<tr>';

    if (isOriginal) {
      html += '<td>' + columns.map(function (column) {
        if (column.type === 'index') {
          return "".concat(column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1);
        }

        return "".concat(_tools.UtilTools.getCellValue(row, column) || '');
      }).join('</td><td>') + '</td>';
    } else {
      html += '<td>' + columns.map(function (column) {
        return "".concat(row[column.id]);
      }).join('</td><td>') + '</td>';
    }

    html += '</tr>';
  });
  html += '</tbody>';

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    var filterMaps = $table.tableColumn.map(function (column) {
      return columns.includes(column);
    });

    if (footers.length) {
      html += '<tfoot>';
      footers.forEach(function (rows) {
        html += '<tr><td>' + rows.filter(function (val, colIndex) {
          return filterMaps[colIndex];
        }).join('</td><td>') + '</td></tr>';
      });
      html += '</tfoot>';
    }
  }

  return html + '</table>';
}

function getLabelData($table, columns, datas) {
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

function getExportData($table, opts, fullData, oColumns) {
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
    datas: opts.original ? datas : getLabelData($table, columns, datas)
  };
}

function getDownloadUrl(opts, content) {
  switch (opts.type) {
    case 'csv':
    case 'html':
      return getCsvAndHtmlUrl(opts, content);
  }

  return '';
}

function getCsvAndHtmlUrl(_ref3, content) {
  var type = _ref3.type;

  if (window.Blob && window.URL && window.URL.createObjectURL && !_tools.DomTools.browse.safari) {
    return URL.createObjectURL(new Blob([content], {
      type: "text/".concat(type)
    }));
  }

  return "data:attachment/".concat(type, ";charset=utf-8,").concat(encodeURIComponent(content));
}

var _default = {
  getCsvContent: function getCsvContent($table, opts, oColumns, fullData) {
    var type = opts.type;

    var _getExportData = getExportData($table, opts, fullData, oColumns),
        columns = _getExportData.columns,
        datas = _getExportData.datas;

    if (type === 'csv') {
      return toCsv($table, opts, columns, datas);
    } else if (type === 'html') {
      return toHtml($table, opts, columns, datas);
    }

    return '';
  },
  downloadCsc: function downloadCsc(opts, content) {
    var filename = opts.filename,
        type = opts.type,
        download = opts.download;
    var name = "".concat(filename, ".").concat(type);

    if (!download) {
      return Promise.resolve(content);
    }

    if (navigator.msSaveBlob && window.Blob) {
      navigator.msSaveBlob(new Blob([content], {
        type: "text/".concat(type)
      }), name);
    } else if (_tools.DomTools.browse['-ms']) {
      var win = window.top.open('about:blank', '_blank');
      win.document.charset = 'utf-8';
      win.document.write(content);
      win.document.close();
      win.document.execCommand('SaveAs', name);
      win.close();
    } else {
      var linkElem = document.createElement('a');
      linkElem.target = '_blank';
      linkElem.download = name;
      linkElem.href = getDownloadUrl(opts, content);
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
    }
  }
};
exports.default = _default;