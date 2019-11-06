"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _tools = require("../../tools");

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFileTypes() {
  return Object.keys(_vXETable.default.types);
}

function handleExport($table, opts, oColumns, fullData) {
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
  var bodyNodes = xmlDoc.getElementsByTagName('body');
  var fields = [];
  var rows = [];

  if (bodyNodes.length) {
    var tableNodes = bodyNodes[0].getElementsByTagName('table');

    if (tableNodes.length) {
      var theadNodes = tableNodes[0].getElementsByTagName('thead');

      if (theadNodes.length) {
        _xeUtils.default.arrayEach(theadNodes[0].getElementsByTagName('tr'), function (rowNode) {
          _xeUtils.default.arrayEach(rowNode.getElementsByTagName('th'), function (cellNode) {
            var field = cellNode.textContent;

            if (field) {
              fields.push(field);
            }
          });
        });

        var tbodyNodes = tableNodes[0].getElementsByTagName('tbody');

        if (tbodyNodes.length) {
          _xeUtils.default.arrayEach(tbodyNodes[0].getElementsByTagName('tr'), function (rowNode) {
            var item = {};

            _xeUtils.default.arrayEach(rowNode.getElementsByTagName('td'), function (cellNode, colIndex) {
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
  var sheetNodes = xmlDoc.getElementsByTagName('Worksheet');
  var fields = [];
  var rows = [];

  if (sheetNodes.length) {
    var tableNodes = sheetNodes[0].getElementsByTagName('Table');

    if (tableNodes.length) {
      var rowNodes = tableNodes[0].getElementsByTagName('Row');

      if (rowNodes.length) {
        _xeUtils.default.arrayEach(rowNodes[0].getElementsByTagName('Cell'), function (cellNode) {
          var field = cellNode.textContent;

          if (field) {
            fields.push(field);
          }
        });

        _xeUtils.default.arrayEach(rowNodes, function (rowNode, index) {
          if (index) {
            var item = {};
            var cellNodes = rowNode.getElementsByTagName('Cell');

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

function handleImport($table, content, opts) {
  var tableFullColumn = $table.tableFullColumn,
      importCallback = $table.importCallback;
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
      return $table.reloadData(data);
    });
  } else if (!importCallback) {
    _tools.UtilTools.error('vxe.error.impFields');
  }

  if (importCallback) {
    importCallback(status);
  }
}

var _default = {
  methods: {
    // 在 v3.0 中废弃 exportCsv 方法
    _exportCsv: function _exportCsv(options) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['exportCsv', 'exportData']);

      return this.exportData(options);
    },
    _openExport: function _openExport(options) {
      var $toolbar = this.$toolbar;

      if ($toolbar) {
        return $toolbar.openExport(options);
      }

      return this.exportData();
    },

    /**
     * 导出文件，支持 csv/html/xml
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     * @param {Object} options 参数
     */
    _exportData: function _exportData(options) {
      var visibleColumn = this.visibleColumn,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad,
          treeConfig = this.treeConfig;
      var types = Object.keys(_vXETable.default.types);
      var opts = Object.assign({
        filename: '',
        sheetName: '',
        original: !!treeConfig,
        isHeader: true,
        isFooter: true,
        download: true,
        type: 'csv',
        data: null,
        columns: null,
        columnFilterMethod: null,
        dataFilterMethod: null,
        footerFilterMethod: null
      }, options);

      if (!opts.filename) {
        opts.filename = 'export';
      }

      if (!opts.sheetName) {
        opts.sheetName = 'Sheet1';
      }

      if (!types.includes(opts.type)) {
        throw new Error(_tools.UtilTools.getLog('vxe.error.notType', [opts.type]));
      }

      if (!opts.original) {
        if (scrollXLoad || scrollYLoad) {
          opts.original = true;

          _tools.UtilTools.warn('vxe.error.scrollOriginal');
        }
      }

      if (!options || !options.columns) {
        // 在 v3.0 中废弃 type=selection
        opts.columnFilterMethod = function (column) {
          return column.property && ['index', 'checkbox', 'selection', 'radio'].indexOf(column.type) === -1;
        };
      }

      var columns = visibleColumn;
      var fullData = this.tableFullData;

      if (treeConfig) {
        fullData = _xeUtils.default.toTreeArray(fullData, treeConfig);
      }

      return handleExport(this, opts, columns, fullData);
    },
    _importData: function _importData(callback) {
      var _this$$refs = this.$refs,
          impForm = _this$$refs.impForm,
          impInput = _this$$refs.impInput;
      impInput.accept = ".".concat(getFileTypes().join(', .'));
      impForm.reset();
      impInput.click();
      this.importCallback = callback;
    },
    fileChangeEvent: function fileChangeEvent(evnt) {
      var _this = this;

      if (window.FileReader) {
        var file = evnt.target.files[0];
        var name = file.name;

        var tIndex = _xeUtils.default.lastIndexOf(name, '.');

        var type = name.substring(tIndex + 1, name.length);
        var filename = name.substring(0, tIndex);
        var options = {
          filename: filename,
          type: type
        };

        if (getFileTypes().includes(type)) {
          this.preventEvent(evnt, 'event.import', {
            $table: this,
            options: options,
            columns: this.tableFullColumn
          }, function () {
            var reader = new FileReader();

            reader.onerror = function (e) {
              _tools.UtilTools.error('vxe.error.notType', [type]);
            };

            reader.onload = function (e) {
              handleImport(_this, e.target.result, options);
            };

            reader.readAsText(file, 'UTF-8');
          });
        } else {
          _tools.UtilTools.error('vxe.error.notType', [type]);
        }
      } else {
        _tools.UtilTools.error('vxe.error.notExp');
      }
    }
  }
};
exports.default = _default;