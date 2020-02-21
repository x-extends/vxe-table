"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 默认导出或打印的 HTML 样式
var defaultHtmlStyle = 'body{margin:0}body *{-webkit-box-sizing:border-box;box-sizing:border-box}.vxe-table{border:0;border-collapse:separate;table-layout:fixed;text-align:left;font-size:14px;border-spacing:0}.vxe-table.is--print{width:100%}td,thead tr:last-child th{border-bottom:1px solid #e8eaec}.vxe-table:not(.b--style-none) thead tr:first-child th,.vxe-table:not(.show--head):not(.b--style-none) tbody tr:first-child td{border-top:1px solid #e8eaec}.vxe-table:not(.b--style-none) tr td:first-child,.vxe-table:not(.b--style-none) tr th:first-child{border-left:1px solid #e8eaec}.vxe-table:not(.t--border){border-width:1px}.vxe-table.t--border:not(.b--style-none) td,table.t--border:not(.b--style-none) th{border-right:1px solid #e8eaec}.vxe-table:not(.b--style-none) thead{background-color:#f8f8f9}.vxe-table td>div,.vxe-table th>div{padding:.5em .4em}.col--center{text-align:center}.col--right{text-align:right}.col--ellipsis>div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:break-all}.vxe-table--tree-node{text-align:left}.vxe-table--tree-node-wrapper{position:relative}.vxe-table--tree-icon-wrapper{position:absolute;top:50%;width:1em;height:1em;text-align:center;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vxe-table--tree-icon{position:absolute;left:0;top:.3em;width:0;height:0;border-style:solid;border-width:.5em;border-top-color:#939599;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vxe-table--tree-cell{display:block;padding-left:1.5em}';

function hasTreeChildren($xetable, row) {
  var treeOpts = $xetable.treeOpts;
  return row[treeOpts.children] && row[treeOpts.children].length;
}

function getSeq($xetable, row, rowIndex, column, columnIndex) {
  // 在 v3.0 中废弃 startIndex、indexMethod
  var seqOpts = $xetable.seqOpts;
  var seqMethod = seqOpts.seqMethod || column.indexMethod;
  return seqMethod ? seqMethod({
    row: row,
    rowIndex: rowIndex,
    column: column,
    columnIndex: columnIndex
  }) : (seqOpts.startIndex || $xetable.startIndex) + rowIndex + 1;
}

function getLabelData($xetable, opts, columns, datas) {
  var treeConfig = $xetable.treeConfig,
      treeOpts = $xetable.treeOpts,
      scrollXLoad = $xetable.scrollXLoad,
      scrollYLoad = $xetable.scrollYLoad;

  if (treeConfig) {
    // 如果是树表格只允许导出数据源
    var rest = [];

    _xeUtils.default.eachTree(datas, function (row, rowIndex, items, path, parent, nodes) {
      var item = {
        _level: nodes.length - 1,
        _hasChild: hasTreeChildren($xetable, row)
      };
      columns.forEach(function (column, columnIndex) {
        var cellValue = '';

        switch (column.type) {
          // v3.0 废弃 type=index
          case 'seq':
          case 'index':
            cellValue = getSeq($xetable, row, rowIndex, column, columnIndex);
            break;
          // v3.0 废弃 type=selection

          case 'selection':
          case 'checkbox':
            cellValue = $xetable.isCheckedByCheckboxRow(row);
            break;

          case 'radio':
            cellValue = $xetable.isCheckedByRadioRow(row);
            break;

          default:
            if (opts.original) {
              cellValue = _tools.UtilTools.getCellValue(row, column);
            } else {
              var cellRender = column.cellRender,
                  editRender = column.editRender;
              var exportMethod;

              if (editRender && editRender.name) {
                var compConf = _vXETable.default.renderer.get(editRender.name);

                if (compConf) {
                  exportMethod = compConf.editCellExportMethod;
                }
              } else if (cellRender && cellRender.name) {
                var _compConf = _vXETable.default.renderer.get(cellRender.name);

                if (_compConf) {
                  exportMethod = _compConf.cellExportMethod;
                }
              }

              cellValue = exportMethod ? exportMethod({
                $table: $xetable,
                row: row,
                column: column
              }) : _tools.UtilTools.getCellLabel(row, column, {
                $table: $xetable
              });
            }

        }

        item[column.id] = _xeUtils.default.toString(cellValue);
      });
      rest.push(Object.assign(item, row));
    }, treeOpts);

    return rest;
  }

  return datas.map(function (row, rowIndex) {
    var item = {};
    columns.forEach(function (column, columnIndex) {
      var cellValue = '';

      switch (column.type) {
        // v3.0 废弃 type=index
        case 'seq':
        case 'index':
          cellValue = getSeq($xetable, row, rowIndex, column, columnIndex);
          break;
        // v3.0 废弃 type=selection

        case 'selection':
        case 'checkbox':
          cellValue = $xetable.isCheckedByCheckboxRow(row);
          break;

        case 'radio':
          cellValue = $xetable.isCheckedByRadioRow(row);
          break;

        default:
          if (opts.original) {
            cellValue = _tools.UtilTools.getCellValue(row, column);
          } else if (scrollXLoad || scrollYLoad) {
            // 如果是虚拟滚动
            var cellRender = column.cellRender,
                editRender = column.editRender;
            var exportMethod;

            if (editRender && editRender.name) {
              var compConf = _vXETable.default.renderer.get(editRender.name);

              if (compConf) {
                exportMethod = compConf.editCellExportMethod;
              }
            } else if (cellRender && cellRender.name) {
              var _compConf2 = _vXETable.default.renderer.get(cellRender.name);

              if (_compConf2) {
                exportMethod = _compConf2.cellExportMethod;
              }
            }

            cellValue = exportMethod ? exportMethod({
              $table: $xetable,
              row: row,
              column: column
            }) : _tools.UtilTools.getCellLabel(row, column, {
              $table: $xetable
            });
          } else {
            var cell = _tools.DomTools.getCell($xetable, {
              row: row,
              column: column
            });

            cellValue = cell ? cell.innerText.trim() : _tools.UtilTools.getCellLabel(row, column, {
              $table: $xetable
            });
          }

      }

      item[column.id] = _xeUtils.default.toString(cellValue);
    });
    return item;
  });
}

function getExportData($xetable, opts, fullData, oColumns) {
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
    datas: getLabelData($xetable, opts, columns, datas)
  };
}

function getHeaderTitle(opts, column) {
  return (opts.original ? column.property : column.getTitle()) || '';
}

function getFooterCellValue($xetable, opts, items, column) {
  var cellRender = column.cellRender,
      editRender = column.editRender;
  var exportMethod;

  if (editRender && editRender.name) {
    var compConf = _vXETable.default.renderer.get(editRender.name);

    if (compConf) {
      exportMethod = compConf.footerCellExportMethod;
    }
  } else if (cellRender && cellRender.name) {
    var _compConf3 = _vXETable.default.renderer.get(cellRender.name);

    if (_compConf3) {
      exportMethod = _compConf3.footerCellExportMethod;
    }
  }

  var itemIndex = $xetable.$getColumnIndex(column);
  var cellValue = exportMethod ? exportMethod({
    $table: $xetable,
    items: items,
    itemIndex: itemIndex,
    column: column
  }) : _xeUtils.default.toString(items[itemIndex]);
  return cellValue;
}

function toCsv($xetable, opts, columns, datas) {
  var content = "\uFEFF";

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "\"".concat(getHeaderTitle(opts, column), "\"");
    }).join(',') + '\n';
  }

  datas.forEach(function (row) {
    content += columns.map(function (column) {
      return "\"".concat(row[column.id], "\"");
    }).join(',') + '\n';
  });

  if (opts.isFooter) {
    var footerData = $xetable.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "\"".concat(getFooterCellValue($xetable, opts, rows, column), "\"");
      }).join(',') + '\n';
    });
  }

  return content;
}

function toTxt($xetable, opts, columns, datas) {
  var content = '';

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "".concat(getHeaderTitle(opts, column));
    }).join('\t') + '\n';
  }

  datas.forEach(function (row) {
    content += columns.map(function (column) {
      return "".concat(row[column.id]);
    }).join('\t') + '\n';
  });

  if (opts.isFooter) {
    var footerData = $xetable.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "".concat(getFooterCellValue($xetable, opts, rows, column));
      }).join(',') + '\n';
    });
  }

  return content;
}

function hasEllipsis($xetable, column, property, allColumnOverflow) {
  var columnOverflow = column[property];
  var headOverflow = _xeUtils.default.isUndefined(columnOverflow) || _xeUtils.default.isNull(columnOverflow) ? allColumnOverflow : columnOverflow;
  var showEllipsis = headOverflow === 'ellipsis';
  var showTitle = headOverflow === 'title';
  var showTooltip = headOverflow === true || headOverflow === 'tooltip';
  var isEllipsis = showTitle || showTooltip || showEllipsis; // 虚拟滚动不支持动态高度

  if (($xetable.scrollXLoad || $xetable.scrollYLoad) && !isEllipsis) {
    isEllipsis = true;
  }

  return isEllipsis;
}

function toHtml($xetable, opts, columns, datas) {
  var id = $xetable.id,
      border = $xetable.border,
      treeConfig = $xetable.treeConfig,
      treeOpts = $xetable.treeOpts,
      isAllSelected = $xetable.isAllSelected,
      allHeaderAlign = $xetable.headerAlign,
      allAlign = $xetable.align,
      allFooterAlign = $xetable.footerAlign,
      allShowOverflow = $xetable.showOverflow,
      oldShowAllOverflow = $xetable.showAllOverflow,
      allHeaderOverflow = $xetable.showHeaderOverflow,
      oldHeaderOverflow = $xetable.showHeaderAllOverflow; // v2.0 废弃属性，保留兼容

  var allColumnOverflow = _xeUtils.default.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow;
  var allColumnHeaderOverflow = _xeUtils.default.isBoolean(oldHeaderOverflow) ? oldHeaderOverflow : allHeaderOverflow;
  var clss = ['vxe-table', border ? 't--border' : '', border === 'none' ? 'b--style-none' : '', opts.print ? 'is--print' : '', opts.isHeader ? 'show--head' : ''].filter(function (cls) {
    return cls;
  });
  var html = ['<html>', '<head>', "<meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui\"><title>".concat(opts.sheetName, "</title>"), "<style>".concat(opts.style || defaultHtmlStyle, "</style>"), '</head>', '<body>', "<table class=\"".concat(clss.join(' '), "\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"), "<colgroup>".concat(columns.map(function (column) {
    return "<col style=\"width:".concat(column.renderWidth, "px\">");
  }).join(''), "</colgroup>")].join('');

  if (opts.isHeader) {
    html += "<thead><tr>".concat(columns.map(function (column) {
      var headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign;
      var classNames = hasEllipsis($xetable, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : [];
      var cellTitle = getHeaderTitle(opts, column);

      if (headAlign) {
        classNames.push("col--".concat(headAlign));
      }

      if (['selection', 'checkbox'].indexOf(column.type) > -1) {
        return "<td class=\"".concat(classNames.join(' '), "\"><div style=\"width: ").concat(column.renderWidth, "px\"><input type=\"checkbox\" ").concat(isAllSelected ? 'checked' : '', "></div></td>");
      }

      return "<th class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellTitle, "\"><div style=\"width: ").concat(column.renderWidth, "px\">").concat(cellTitle, "</div></th>");
    }).join(''), "</tr></thead>");
  }

  if (datas.length) {
    html += '<tbody>';

    if (treeConfig) {
      datas.forEach(function (row) {
        html += '<tr>' + columns.map(function (column) {
          var cellAlign = column.align || allAlign;
          var classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
          var cellValue = row[column.id];

          if (cellAlign) {
            classNames.push("col--".concat(cellAlign));
          }

          if (column.treeNode) {
            var treeIcon = '';

            if (row._hasChild) {
              treeIcon = '<i class="vxe-table--tree-icon"></i>';
            }

            classNames.push('vxe-table--tree-node');

            if (column.type === 'radio') {
              return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div style=\"width: ").concat(column.renderWidth, "px\"><div class=\"vxe-table--tree-node-wrapper\" style=\"padding-left: ").concat(row._level * treeOpts.indent, "px\"><div class=\"vxe-table--tree-icon-wrapper\">").concat(treeIcon, "</div><div class=\"vxe-table--tree-cell\"><input type=\"radio\" name=\"radio_").concat(id, "\" ").concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "></div></div></div></td>");
            } else if (['selection', 'checkbox'].indexOf(column.type) > -1) {
              return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div style=\"width: ").concat(column.renderWidth, "px\"><div class=\"vxe-table--tree-node-wrapper\" style=\"padding-left: ").concat(row._level * treeOpts.indent, "px\"><div class=\"vxe-table--tree-icon-wrapper\">").concat(treeIcon, "</div><div class=\"vxe-table--tree-cell\"><input type=\"checkbox\" ").concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "></div></div></div></td>");
            }

            return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div style=\"width: ").concat(column.renderWidth, "px\"><div class=\"vxe-table--tree-node-wrapper\" style=\"padding-left: ").concat(row._level * treeOpts.indent, "px\"><div class=\"vxe-table--tree-icon-wrapper\">").concat(treeIcon, "</div><div class=\"vxe-table--tree-cell\">").concat(cellValue, "</div></div></div></td>");
          }

          if (column.type === 'radio') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div style=\"width: ").concat(column.renderWidth, "px\"><input type=\"radio\" name=\"radio_").concat(id, "\" ").concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "></div></td>");
          } else if (['selection', 'checkbox'].indexOf(column.type) > -1) {
            return "<td class=\"".concat(classNames.join(' '), "\"><div style=\"width: ").concat(column.renderWidth, "px\"><input type=\"checkbox\" ").concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "></div></td>");
          }

          return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div style=\"width: ").concat(column.renderWidth, "px\">").concat(cellValue, "</div></td>");
        }).join('') + '</tr>';
      });
    } else {
      datas.forEach(function (row) {
        html += '<tr>' + columns.map(function (column) {
          var cellAlign = column.align || allAlign;
          var classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
          var cellValue = row[column.id];

          if (cellAlign) {
            classNames.push("col--".concat(cellAlign));
          }

          if (column.type === 'radio') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div style=\"width: ").concat(column.renderWidth, "px\"><input type=\"radio\" name=\"radio_").concat(id, "\" ").concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "></div></td>");
          } else if (['selection', 'checkbox'].indexOf(column.type) > -1) {
            return "<td class=\"".concat(classNames.join(' '), "\"><div style=\"width: ").concat(column.renderWidth, "px\"><input type=\"checkbox\" ").concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "></div></td>");
          }

          return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div style=\"width: ").concat(column.renderWidth, "px\">").concat(cellValue, "</div></td>");
        }).join('') + '</tr>';
      });
    }

    html += '</tbody>';
  }

  if (opts.isFooter) {
    var footerData = $xetable.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;

    if (footers.length) {
      html += '<tfoot>';
      footers.forEach(function (rows) {
        html += "<tr>".concat(columns.map(function (column) {
          var footAlign = column.footerAlign || column.align || allFooterAlign || allAlign;
          var classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
          var cellValue = getFooterCellValue($xetable, opts, rows, column);

          if (footAlign) {
            classNames.push("col--".concat(footAlign));
          }

          return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div style=\"width: ").concat(column.renderWidth, "px\">").concat(cellValue, "</div></td>");
        }).join(''), "</tr>");
      });
      html += '</tfoot>';
    }
  }

  return html + '</table></body></html>';
}

function toXML($xetable, opts, columns, datas) {
  var xml = ['<?xml version="1.0"?>', '<?mso-application progid="Excel.Sheet"?>', '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">', '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">', '<Version>16.00</Version>', '</DocumentProperties>', '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">', '<WindowHeight>7920</WindowHeight>', '<WindowWidth>21570</WindowWidth>', '<WindowTopX>32767</WindowTopX>', '<WindowTopY>32767</WindowTopY>', '<ProtectStructure>False</ProtectStructure>', '<ProtectWindows>False</ProtectWindows>', '</ExcelWorkbook>', "<Worksheet ss:Name=\"".concat(opts.sheetName, "\">"), '<Table>', columns.map(function (column) {
    return "<Column ss:Width=\"".concat(column.renderWidth, "\"/>");
  }).join('')].join('');

  if (opts.isHeader) {
    xml += "<Row>".concat(columns.map(function (column) {
      return "<Cell><Data ss:Type=\"String\">".concat(getHeaderTitle(opts, column), "</Data></Cell>");
    }).join(''), "</Row>");
  }

  datas.forEach(function (row) {
    xml += '<Row>' + columns.map(function (column) {
      return "<Cell><Data ss:Type=\"String\">".concat(row[column.id], "</Data></Cell>");
    }).join('') + '</Row>';
  });

  if (opts.isFooter) {
    var footerData = $xetable.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    footers.forEach(function (rows) {
      xml += "<Row>".concat(columns.map(function (column) {
        return "<Cell><Data ss:Type=\"String\">".concat(getFooterCellValue($xetable, opts, rows, column), "</Data></Cell>");
      }).join(''), "</Row>");
    });
  }

  return "".concat(xml, "</Table></Worksheet></Workbook>");
}

function getContent($xetable, opts, columns, datas) {
  switch (opts.type) {
    case 'csv':
      return toCsv($xetable, opts, columns, datas);

    case 'txt':
      return toTxt($xetable, opts, columns, datas);

    case 'html':
      return toHtml($xetable, opts, columns, datas);

    case 'xml':
      return toXML($xetable, opts, columns, datas);
  }

  return '';
}

function downloadFile($xetable, opts, content) {
  var filename = opts.filename,
      type = opts.type,
      download = opts.download;
  var name = "".concat(filename, ".").concat(type);

  if (window.Blob) {
    var blob = new Blob([content], {
      type: "text/".concat(type)
    });

    if (!download) {
      return Promise.resolve({
        type: type,
        content: content,
        blob: blob
      });
    }

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

    if (opts.message !== false) {
      _vXETable.default.$modal.message({
        message: _conf.default.i18n('vxe.table.expSuccess'),
        status: 'success'
      });
    }
  } else {
    _tools.UtilTools.error('vxe.error.notExp');
  }
}

function getElementsByTagName(elem, qualifiedName) {
  return elem.getElementsByTagName(qualifiedName);
}

function replaceDoubleQuotation(val) {
  return val.replace(/^"/, '').replace(/"$/, '');
}

function parseCsv(columns, content) {
  var list = content.split('\n');
  var rows = [];
  var fields = [];

  if (list.length) {
    var rList = list.slice(1);
    fields = list[0].split(',').map(replaceDoubleQuotation);
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split(',').forEach(function (val, colIndex) {
          if (fields[colIndex]) {
            item[fields[colIndex]] = replaceDoubleQuotation(val);
          }
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
  var rows = [];
  var fields = [];

  if (list.length) {
    var rList = list.slice(1);
    fields = list[0].split('\t');
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split('\t').forEach(function (val, colIndex) {
          if (fields[colIndex]) {
            item[fields[colIndex]] = replaceDoubleQuotation(val);
          }
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
  var rows = [];
  var fields = [];

  if (bodyNodes.length) {
    var tableNodes = getElementsByTagName(bodyNodes[0], 'table');

    if (tableNodes.length) {
      var theadNodes = getElementsByTagName(tableNodes[0], 'thead');

      if (theadNodes.length) {
        _xeUtils.default.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), function (rowNode) {
          _xeUtils.default.arrayEach(getElementsByTagName(rowNode, 'th'), function (cellNode) {
            fields.push(cellNode.textContent);
          });
        });

        var tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody');

        if (tbodyNodes.length) {
          _xeUtils.default.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), function (rowNode) {
            var item = {};

            _xeUtils.default.arrayEach(getElementsByTagName(rowNode, 'td'), function (cellNode, colIndex) {
              if (fields[colIndex]) {
                item[fields[colIndex]] = cellNode.textContent || '';
              }
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
  var rows = [];
  var fields = [];

  if (sheetNodes.length) {
    var tableNodes = getElementsByTagName(sheetNodes[0], 'Table');

    if (tableNodes.length) {
      var rowNodes = getElementsByTagName(tableNodes[0], 'Row');

      if (rowNodes.length) {
        _xeUtils.default.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), function (cellNode) {
          fields.push(cellNode.textContent);
        });

        _xeUtils.default.arrayEach(rowNodes, function (rowNode, index) {
          if (index) {
            var item = {};
            var cellNodes = getElementsByTagName(rowNode, 'Cell');

            _xeUtils.default.arrayEach(cellNodes, function (cellNode, colIndex) {
              if (fields[colIndex]) {
                item[fields[colIndex]] = cellNode.textContent;
              }
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


function checkImportData(columns, fields) {
  var tableFields = [];
  columns.forEach(function (column) {
    var field = column.property;

    if (field) {
      tableFields.push(field);
    }
  });
  return tableFields.every(function (field) {
    return fields.indexOf(field) > -1;
  });
}

var _default = {
  handleExport: function handleExport($xetable, opts, oColumns, fullData) {
    var _getExportData = getExportData($xetable, opts, fullData, oColumns),
        columns = _getExportData.columns,
        datas = _getExportData.datas;

    return $xetable.preventEvent(null, 'event.export', {
      $table: $xetable,
      options: opts,
      columns: columns,
      datas: datas
    }, function () {
      return downloadFile($xetable, opts, getContent($xetable, opts, columns, datas));
    });
  },
  handleImport: function handleImport($xetable, content, opts) {
    var tableFullColumn = $xetable.tableFullColumn,
        _importResolve = $xetable._importResolve;
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
      $xetable.createData(rows).then(function (data) {
        if (opts.mode === 'append') {
          $xetable.insertAt(data, -1);
        } else {
          $xetable.reloadData(data);
        }
      });

      if (opts.message !== false) {
        _vXETable.default.$modal.message({
          message: _conf.default.i18n('vxe.table.impSuccess'),
          status: 'success'
        });
      }
    } else if (opts.message !== false) {
      _vXETable.default.$modal.message({
        message: _conf.default.i18n('vxe.error.impFields'),
        status: 'error'
      });
    }

    if (_importResolve) {
      _importResolve(status);

      $xetable._importResolve = null;
    }
  }
};
exports.default = _default;