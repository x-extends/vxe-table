"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

function getContent($table, opts, columns, datas) {
  var type = opts.type;

  if (type === 'csv') {
    return toCsv($table, opts, columns, datas);
  } else if (type === 'txt') {
    return toTxt($table, opts, columns, datas);
  } else if (type === 'html') {
    return toHtml($table, opts, columns, datas);
  } else if (type === 'xml') {
    return toXML($table, opts, columns, datas);
  }

  return '';
}

function toCsv($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var content = "\uFEFF";

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "\"".concat(column.getTitle(), "\"");
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

function toTxt($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var content = '';

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "".concat(column.getTitle());
    }).join('\t') + '\n';
  }

  datas.forEach(function (row, rowIndex) {
    if (isOriginal) {
      content += columns.map(function (column) {
        if (column.type === 'index') {
          return "".concat(column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1);
        }

        return "\"".concat(_tools.UtilTools.getCellValue(row, column) || '', "\"");
      }).join('\t') + '\n';
    } else {
      content += columns.map(function (column) {
        return "".concat(row[column.id]);
      }).join('\t') + '\n';
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
        return "".concat(filterMaps[colIndex]);
      }).join('\t') + '\n';
    });
  }

  return content;
}

function toHtml($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var html = ['<!DOCTYPE html>', '<html>', "<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui\"><title>".concat(opts.filename, "</title></head>"), '<body>', '<table border="1" cellspacing="0" cellpadding="0">', "<colgroup>".concat(columns.map(function (column) {
    return "<col width=\"".concat(column.renderWidth, "\">");
  }).join(''), "</colgroup>")].join('');

  if (opts.isHeader) {
    html += "<thead><tr>".concat(columns.map(function (column) {
      return "<th>".concat(column.getTitle(), "</th>");
    }).join(''), "</tr></thead>");
  }

  if (datas.length) {
    html += '<tbody>';
    datas.forEach(function (row, rowIndex) {
      html += '<tr>';

      if (isOriginal) {
        html += columns.map(function (column) {
          if (column.type === 'index') {
            return "<td>".concat(column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1, "</td>");
          }

          return "<td>".concat(_tools.UtilTools.getCellValue(row, column) || '', "</td>");
        }).join('');
      } else {
        html += columns.map(function (column) {
          return "<td>".concat(row[column.id], "</td>");
        }).join('');
      }

      html += '</tr>';
    });
    html += '</tbody>';
  }

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    var filterMaps = $table.tableColumn.map(function (column) {
      return columns.includes(column);
    });

    if (footers.length) {
      html += '<tfoot>';
      footers.forEach(function (rows) {
        html += "<tr>".concat(rows.filter(function (val, colIndex) {
          return "<td>".concat(filterMaps[colIndex], "</td>");
        }).join(''), "</tr>");
      });
      html += '</tfoot>';
    }
  }

  return html + '</table></body></html>';
}

function toXML($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var xml = ['<?xml version="1.0"?>', '<?mso-application progid="Excel.Sheet"?>', '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">', '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">', '<Version>16.00</Version>', '</DocumentProperties>', '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">', '<WindowHeight>7920</WindowHeight>', '<WindowWidth>21570</WindowWidth>', '<WindowTopX>32767</WindowTopX>', '<WindowTopY>32767</WindowTopY>', '<ProtectStructure>False</ProtectStructure>', '<ProtectWindows>False</ProtectWindows>', '</ExcelWorkbook>', "<Worksheet ss:Name=\"".concat(opts.filename, "\">"), '<Table>', columns.map(function (column) {
    return "<Column ss:Width=\"".concat(column.renderWidth, "\"/>");
  }).join('')].join('');

  if (opts.isHeader) {
    xml += "<Row>".concat(columns.map(function (column) {
      return "<Cell><Data ss:Type=\"String\">".concat(column.getTitle(), "</Data></Cell>");
    }).join(''), "</Row>");
  }

  datas.forEach(function (row, rowIndex) {
    xml += '<Row>';

    if (isOriginal) {
      xml += columns.map(function (column) {
        if (column.type === 'index') {
          return "<Cell><Data ss:Type=\"String\">".concat(column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1, "</Data></Cell>");
        }

        return "<Cell><Data ss:Type=\"String\">".concat(_tools.UtilTools.getCellValue(row, column) || '', "</Data></Cell>");
      }).join('');
    } else {
      xml += columns.map(function (column) {
        return "<Cell><Data ss:Type=\"String\">".concat(row[column.id], "</Data></Cell>");
      }).join('');
    }

    xml += '</Row>';
  });

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    var filterMaps = $table.tableColumn.map(function (column) {
      return columns.includes(column);
    });

    if (footers.length) {
      footers.forEach(function (rows) {
        xml += "<Row>".concat(rows.filter(function (val, colIndex) {
          return "<Cell><Data ss:Type=\"String\">".concat(filterMaps[colIndex], "</Data></Cell>");
        }).join(''), "</Row>");
      });
    }
  }

  return "".concat(xml, "</Table></Worksheet></Workbook>");
}

function downloadFile(opts, content) {
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
    case 'xml':
    case 'txt':
      return getAttachmentUrl(opts, content);
  }

  return '';
}

function getAttachmentUrl(_ref, content) {
  var type = _ref.type;

  if (window.Blob && window.URL && window.URL.createObjectURL && !_tools.DomTools.browse.safari) {
    return URL.createObjectURL(new Blob([content], {
      type: "text/".concat(type)
    }));
  }

  return "data:attachment/".concat(type, ";charset=utf-8,").concat(encodeURIComponent(content));
}

var _default = {
  handleExport: function handleExport($table, opts, oColumns, fullData) {
    var _getExportData = getExportData($table, opts, fullData, oColumns),
        columns = _getExportData.columns,
        datas = _getExportData.datas;

    return $table.preventEvent(null, 'event.export', {
      $table: $table,
      options: opts,
      columns: columns,
      datas: datas
    }, function () {
      return downloadFile(opts, getContent($table, opts, columns, datas));
    });
  }
};
exports.default = _default;