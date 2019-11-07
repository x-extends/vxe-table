"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContent($table, opts, columns, datas) {
  switch (opts.type) {
    case 'csv':
      return toCsv($table, opts, columns, datas);

    case 'txt':
      return toTxt($table, opts, columns, datas);

    case 'html':
      return toHtml($table, opts, columns, datas);

    case 'xml':
      return toXML($table, opts, columns, datas);
  }

  return '';
}

function getHeaderTitle(opts, column) {
  return opts.original ? column.property : column.getTitle();
}

function toCsv($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var content = "\uFEFF";

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "\"".concat(getHeaderTitle(opts, column), "\"");
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
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "\"".concat(rows[$table.getColumnIndex(column)] || '', "\"");
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
      return "".concat(getHeaderTitle(opts, column));
    }).join('\t') + '\n';
  }

  datas.forEach(function (row, rowIndex) {
    if (isOriginal) {
      content += columns.map(function (column) {
        if (column.type === 'index') {
          return "".concat(column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1);
        }

        return "".concat(_tools.UtilTools.getCellValue(row, column) || '');
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
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "".concat(rows[$table.getColumnIndex(column)] || '');
      }).join(',') + '\n';
    });
  }

  return content;
}

function toHtml($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var html = ['<!DOCTYPE html>', '<html>', "<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui\"><title>".concat(opts.sheetName, "</title></head>"), '<body>', '<table border="1" cellspacing="0" cellpadding="0">', "<colgroup>".concat(columns.map(function (column) {
    return "<col width=\"".concat(column.renderWidth, "\">");
  }).join(''), "</colgroup>")].join('');

  if (opts.isHeader) {
    html += "<thead><tr>".concat(columns.map(function (column) {
      return "<th>".concat(getHeaderTitle(opts, column), "</th>");
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

    if (footers.length) {
      html += '<tfoot>';
      footers.forEach(function (rows) {
        html += "<tr>".concat(columns.map(function (column) {
          return "<td>".concat(rows[$table.getColumnIndex(column)] || '', "</td>");
        }).join(''), "</tr>");
      });
      html += '</tfoot>';
    }
  }

  return html + '</table></body></html>';
}

function toXML($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var xml = ['<?xml version="1.0"?>', '<?mso-application progid="Excel.Sheet"?>', '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">', '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">', '<Version>16.00</Version>', '</DocumentProperties>', '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">', '<WindowHeight>7920</WindowHeight>', '<WindowWidth>21570</WindowWidth>', '<WindowTopX>32767</WindowTopX>', '<WindowTopY>32767</WindowTopY>', '<ProtectStructure>False</ProtectStructure>', '<ProtectWindows>False</ProtectWindows>', '</ExcelWorkbook>', "<Worksheet ss:Name=\"".concat(opts.sheetName, "\">"), '<Table>', columns.map(function (column) {
    return "<Column ss:Width=\"".concat(column.renderWidth, "\"/>");
  }).join('')].join('');

  if (opts.isHeader) {
    xml += "<Row>".concat(columns.map(function (column) {
      return "<Cell><Data ss:Type=\"String\">".concat(getHeaderTitle(opts, column), "</Data></Cell>");
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
    footers.forEach(function (rows) {
      xml += "<Row>".concat(columns.map(function (column) {
        return "<Cell><Data ss:Type=\"String\">".concat(rows[$table.getColumnIndex(column) || ''], "</Data></Cell>");
      }).join(''), "</Row>");
    });
  }

  return "".concat(xml, "</Table></Worksheet></Workbook>");
}

function downloadFile($table, opts, content) {
  var filename = opts.filename,
      type = opts.type,
      download = opts.download;
  var name = "".concat(filename, ".").concat(type);

  if (!download) {
    return Promise.resolve(content);
  }

  if (window.Blob) {
    var blob = new Blob([content], {
      type: "text/".concat(type)
    });

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, name);
    } else {
      var linkElem = document.createElement('a');
      linkElem.target = '_blank';
      linkElem.download = name;
      linkElem.href = URL.createObjectURL(blob);
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
    }

    if (opts.message) {
      $table.$XModal.message({
        message: _conf.default.i18n('vxe.table.expSuccess'),
        status: 'success'
      });
    }
  } else {
    _tools.UtilTools.error('vxe.error.notExp');
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

function replaceDoubleQuotation(val) {
  return val.replace(/^"/, '').replace(/"$/, '');
}

function parseCsv(columns, content) {
  var list = content.split('\n');
  var fields = [];
  var rows = [];

  if (list.length) {
    var rList = list.slice(1);
    list[0].split(',').forEach(function (val) {
      var field = replaceDoubleQuotation(val);

      if (field) {
        fields.push(field);
      }
    });
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split(',').forEach(function (val, colIndex) {
          item[fields[colIndex]] = replaceDoubleQuotation(val);
        });
        rows.push(item);
      }
    });
  }

  return {
    fields: fields,
    rows: rows
  };
}

function parseTxt(columns, content) {
  var list = content.split('\n');
  var fields = [];
  var rows = [];

  if (list.length) {
    var rList = list.slice(1);
    list[0].split('\t').forEach(function (field) {
      if (field) {
        fields.push(field);
      }
    });
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split('\t').forEach(function (val, colIndex) {
          item[fields[colIndex]] = replaceDoubleQuotation(val);
        });
        rows.push(item);
      }
    });
  }

  return {
    fields: fields,
    rows: rows
  };
}

function parseHTML(columns, content) {
  var domParser = new DOMParser();
  var xmlDoc = domParser.parseFromString(content, 'text/html');
  var bodyNodes = getElementsByTagName(xmlDoc, 'body');
  var fields = [];
  var rows = [];

  if (bodyNodes.length) {
    var tableNodes = getElementsByTagName(bodyNodes[0], 'table');

    if (tableNodes.length) {
      var theadNodes = getElementsByTagName(tableNodes[0], 'thead');

      if (theadNodes.length) {
        _xeUtils.default.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), function (rowNode) {
          _xeUtils.default.arrayEach(getElementsByTagName(rowNode, 'th'), function (cellNode) {
            var field = cellNode.textContent;

            if (field) {
              fields.push(field);
            }
          });
        });

        var tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody');

        if (tbodyNodes.length) {
          _xeUtils.default.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), function (rowNode) {
            var item = {};

            _xeUtils.default.arrayEach(getElementsByTagName(rowNode, 'td'), function (cellNode, colIndex) {
              item[fields[colIndex]] = cellNode.textContent || '';
            });

            rows.push(item);
          });
        }
      }
    }
  }

  return {
    fields: fields,
    rows: rows
  };
}

function parseXML(columns, content) {
  var domParser = new DOMParser();
  var xmlDoc = domParser.parseFromString(content, 'application/xml');
  var sheetNodes = getElementsByTagName(xmlDoc, 'Worksheet');
  var fields = [];
  var rows = [];

  if (sheetNodes.length) {
    var tableNodes = getElementsByTagName(sheetNodes[0], 'Table');

    if (tableNodes.length) {
      var rowNodes = getElementsByTagName(tableNodes[0], 'Row');

      if (rowNodes.length) {
        _xeUtils.default.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), function (cellNode) {
          var field = cellNode.textContent;

          if (field) {
            fields.push(field);
          }
        });

        _xeUtils.default.arrayEach(rowNodes, function (rowNode, index) {
          if (index) {
            var item = {};
            var cellNodes = getElementsByTagName(rowNode, 'Cell');

            _xeUtils.default.arrayEach(cellNodes, function (cellNode, colIndex) {
              item[fields[colIndex]] = cellNode.textContent;
            });

            rows.push(item);
          }
        });
      }
    }
  }

  return {
    fields: fields,
    rows: rows
  };
}

function getElementsByTagName(elem, qualifiedName) {
  return elem.getElementsByTagName(qualifiedName);
}
/**
 * 检查导入的列是否完整
 * @param {Array} fields 字段名列表
 * @param {Array} rows 数据列表
 */


function checkImportData(columns, fields, rows) {
  var tableFields = [];
  columns.forEach(function (column) {
    var field = column.property;

    if (field) {
      tableFields.push(field);
    }
  });
  return tableFields.every(function (field) {
    return fields.includes(field);
  });
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
      return downloadFile($table, opts, getContent($table, opts, columns, datas));
    });
  },
  handleImport: function handleImport($table, content, opts) {
    var tableFullColumn = $table.tableFullColumn,
        _importCallback = $table._importCallback;
    var rest = {
      fields: [],
      rows: []
    };

    switch (opts.type) {
      case 'csv':
        rest = parseCsv(tableFullColumn, content);
        break;

      case 'txt':
        rest = parseTxt(tableFullColumn, content);
        break;

      case 'html':
        rest = parseHTML(tableFullColumn, content);
        break;

      case 'xml':
        rest = parseXML(tableFullColumn, content);
        break;
    }

    var _rest = rest,
        fields = _rest.fields,
        rows = _rest.rows;
    var status = checkImportData(tableFullColumn, fields, rows);

    if (status) {
      $table.createData(rows).then(function (data) {
        if (opts.mode === 'append') {
          $table.insertAt(data, -1);
        } else {
          $table.reloadData(data);
        }
      });

      if (opts.message) {
        $table.$XModal.message({
          message: _conf.default.i18n('vxe.table.impSuccess'),
          status: 'success'
        });
      }
    } else if (opts.message) {
      $table.$XModal.message({
        message: _conf.default.i18n('vxe.error.impFields'),
        status: 'error'
      });
    }

    if (_importCallback) {
      _importCallback(status);
    }
  }
};
exports.default = _default;