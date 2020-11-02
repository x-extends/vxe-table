"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePrint = handlePrint;
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatText = _tools.UtilTools.formatText; // 默认导出或打印的 HTML 样式

var defaultHtmlStyle = 'body{margin:0}body *{-webkit-box-sizing:border-box;box-sizing:border-box}.vxe-table{border:0;border-collapse:separate;text-align:left;font-size:14px;border-spacing:0}.vxe-table:not(.is--print){table-layout:fixed}.vxe-table.is--print{width:100%}.vxe-table.border--default,.vxe-table.border--full,.vxe-table.border--outer{border-top:1px solid #e8eaec}.vxe-table.border--default,.vxe-table.border--full,.vxe-table.border--outer{border-left:1px solid #e8eaec}.vxe-table.border--outer,.vxe-table.border--default th,.vxe-table.border--default td,.vxe-table.border--full th,.vxe-table.border--full td,.vxe-table.border--outer th,.vxe-table.border--inner th,.vxe-table.border--inner td{border-bottom:1px solid #e8eaec}.vxe-table.border--default,.vxe-table.border--outer,.vxe-table.border--full th,.vxe-table.border--full td{border-right:1px solid #e8eaec}.vxe-table.border--default th,.vxe-table.border--full th,.vxe-table.border--outer th{background-color:#f8f8f9}.vxe-table td>div,.vxe-table th>div{padding:.5em .4em}.col--center{text-align:center}.col--right{text-align:right}.vxe-table:not(.is--print) .col--ellipsis>div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:break-all}.vxe-table--tree-node{text-align:left}.vxe-table--tree-node-wrapper{position:relative}.vxe-table--tree-icon-wrapper{position:absolute;top:50%;width:1em;height:1em;text-align:center;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vxe-table--tree-icon{position:absolute;left:0;top:.3em;width:0;height:0;border-style:solid;border-width:.5em;border-top-color:#939599;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vxe-table--tree-cell{display:block;padding-left:1.5em}.vxe-table input[type="checkbox"]{margin:0}.vxe-table input[type="checkbox"],.vxe-table input[type="radio"],.vxe-table input[type="checkbox"]+span,.vxe-table input[type="radio"]+span{vertical-align:middle;padding-left: 0.4em}';
var htmlCellElem; // 导入

var fileForm;
var fileInput; // 打印

var printFrame;

function createFrame() {
  var frame = document.createElement('iframe');
  frame.className = 'vxe-table--print-frame';
  return frame;
}

function getExportBlobByContent(content, options) {
  if (window.Blob) {
    return new Blob([content], {
      type: "text/".concat(options.type)
    });
  }

  return null;
}

function hasTreeChildren($xetable, row) {
  var treeOpts = $xetable.treeOpts;
  return row[treeOpts.children] && row[treeOpts.children].length;
}

function getSeq($xetable, row, rowIndex, column, columnIndex) {
  var seqOpts = $xetable.seqOpts;
  var seqMethod = seqOpts.seqMethod || column.seqMethod;
  return seqMethod ? seqMethod({
    row: row,
    rowIndex: rowIndex,
    column: column,
    columnIndex: columnIndex
  }) : seqOpts.startIndex + rowIndex + 1;
}

function defaultFilterExportColumn(column) {
  return column.property || ['seq', 'checkbox', 'radio'].indexOf(column.type) > -1;
}

function toTableBorder(border) {
  if (border === true) {
    return 'full';
  }

  if (border) {
    return border;
  }

  return 'default';
}

function getLabelData($xetable, opts, columns, datas) {
  var treeConfig = $xetable.treeConfig,
      treeOpts = $xetable.treeOpts,
      radioOpts = $xetable.radioOpts,
      checkboxOpts = $xetable.checkboxOpts;

  if (!htmlCellElem) {
    htmlCellElem = document.createElement('div');
  }

  if (treeConfig) {
    // 如果是树表格只允许导出数据源
    var rest = [];

    _ctor.default.eachTree(datas, function (row, rowIndex, items, path, parent, nodes) {
      var item = {
        _level: nodes.length - 1,
        _hasChild: hasTreeChildren($xetable, row)
      };
      columns.forEach(function (column, columnIndex) {
        var cellValue = '';
        var renderOpts = column.editRender || column.cellRender;
        var exportLabelMethod = column.exportMethod;

        if (!exportLabelMethod && renderOpts && renderOpts.name) {
          var compConf = _vXETable.default.renderer.get(renderOpts.name);

          if (compConf) {
            exportLabelMethod = compConf.exportMethod || compConf.cellExportMethod;
          }
        }

        if (exportLabelMethod) {
          cellValue = exportLabelMethod({
            $table: $xetable,
            row: row,
            column: column
          });
        } else {
          switch (column.type) {
            case 'seq':
              cellValue = getSeq($xetable, row, rowIndex, column, columnIndex);
              break;

            case 'checkbox':
              cellValue = $xetable.isCheckedByCheckboxRow(row);
              item._checkboxLabel = checkboxOpts.labelField ? _ctor.default.get(row, checkboxOpts.labelField) : '';
              item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({
                row: row
              });
              break;

            case 'radio':
              cellValue = $xetable.isCheckedByRadioRow(row);
              item._radioLabel = radioOpts.labelField ? _ctor.default.get(row, radioOpts.labelField) : '';
              item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({
                row: row
              });
              break;

            default:
              if (opts.original) {
                cellValue = _tools.UtilTools.getCellValue(row, column);
              } else {
                cellValue = _tools.UtilTools.getCellLabel(row, column, {
                  $table: $xetable
                });

                if (column.type === 'html') {
                  htmlCellElem.innerHTML = cellValue;
                  cellValue = htmlCellElem.innerText.trim();
                }
              }

          }
        }

        item[column.id] = _ctor.default.toString(cellValue);
      });
      rest.push(Object.assign(item, row));
    }, treeOpts);

    return rest;
  }

  return datas.map(function (row, rowIndex) {
    var item = {};
    columns.forEach(function (column, columnIndex) {
      var cellValue = '';
      var renderOpts = column.editRender || column.cellRender;
      var exportLabelMethod = column.exportMethod;

      if (!exportLabelMethod && renderOpts && renderOpts.name) {
        var compConf = _vXETable.default.renderer.get(renderOpts.name);

        if (compConf) {
          exportLabelMethod = compConf.exportMethod || compConf.cellExportMethod;
        }
      }

      if (exportLabelMethod) {
        cellValue = exportLabelMethod({
          $table: $xetable,
          row: row,
          column: column
        });
      } else {
        switch (column.type) {
          case 'seq':
            cellValue = getSeq($xetable, row, rowIndex, column, columnIndex);
            break;

          case 'checkbox':
            cellValue = $xetable.isCheckedByCheckboxRow(row);
            item._checkboxLabel = checkboxOpts.labelField ? _ctor.default.get(row, checkboxOpts.labelField) : '';
            item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({
              row: row
            });
            break;

          case 'radio':
            cellValue = $xetable.isCheckedByRadioRow(row);
            item._radioLabel = radioOpts.labelField ? _ctor.default.get(row, radioOpts.labelField) : '';
            item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({
              row: row
            });
            break;

          default:
            if (opts.original) {
              cellValue = _tools.UtilTools.getCellValue(row, column);
            } else {
              cellValue = _tools.UtilTools.getCellLabel(row, column, {
                $table: $xetable
              });

              if (column.type === 'html') {
                htmlCellElem.innerHTML = cellValue;
                cellValue = htmlCellElem.innerText.trim();
              }
            }

        }
      }

      item[column.id] = _ctor.default.toString(cellValue);
    });
    return item;
  });
}

function getExportData($xetable, opts) {
  var columnFilterMethod = opts.columnFilterMethod,
      dataFilterMethod = opts.dataFilterMethod;
  var columns = opts.columns;
  var datas = opts.data;

  if (columnFilterMethod) {
    columns = columns.filter(function (column, index) {
      return columnFilterMethod({
        column: column,
        $columnIndex: index
      });
    });
  }

  if (dataFilterMethod) {
    datas = datas.filter(function (row, index) {
      return dataFilterMethod({
        row: row,
        $rowIndex: index
      });
    });
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
  var renderOpts = column.editRender || column.cellRender;
  var exportLabelMethod = column.footerExportMethod;

  if (!exportLabelMethod && renderOpts && renderOpts.name) {
    var compConf = _vXETable.default.renderer.get(renderOpts.name);

    if (compConf) {
      exportLabelMethod = compConf.footerExportMethod || compConf.footerCellExportMethod;
    }
  }

  var _columnIndex = $xetable._getColumnIndex(column);

  var cellValue = exportLabelMethod ? exportLabelMethod({
    $table: $xetable,
    items: items,
    itemIndex: _columnIndex,
    _columnIndex: _columnIndex,
    column: column
  }) : _ctor.default.toString(items[_columnIndex]);
  return cellValue;
}

function getFooterData(opts, footerData) {
  var footerFilterMethod = opts.footerFilterMethod;
  return footerFilterMethod ? footerData.filter(function (items, index) {
    return footerFilterMethod({
      items: items,
      $rowIndex: index
    });
  }) : footerData;
}

function getCsvCellTypeLabel(column, cellValue) {
  if (cellValue) {
    switch (column.cellType) {
      case 'string':
        if (!isNaN(cellValue)) {
          return '\t' + cellValue;
        }

        break;

      case 'number':
        break;

      default:
        if (cellValue.length >= 12 && !isNaN(cellValue)) {
          return '\t' + cellValue;
        }

        break;
    }
  }

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
      return "\"".concat(getCsvCellTypeLabel(column, row[column.id]), "\"");
    }).join(',') + '\n';
  });

  if (opts.isFooter) {
    var footerData = $xetable.footerData;
    var footers = getFooterData(opts, footerData);
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
    var footers = getFooterData(opts, footerData);
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
  var headOverflow = _ctor.default.isUndefined(columnOverflow) || _ctor.default.isNull(columnOverflow) ? allColumnOverflow : columnOverflow;
  var showEllipsis = headOverflow === 'ellipsis';
  var showTitle = headOverflow === 'title';
  var showTooltip = headOverflow === true || headOverflow === 'tooltip';
  var isEllipsis = showTitle || showTooltip || showEllipsis; // 虚拟滚动不支持动态高度

  if (($xetable.scrollXLoad || $xetable.scrollYLoad) && !isEllipsis) {
    isEllipsis = true;
  }

  return isEllipsis;
}

function createHtmlPage(opts, content) {
  var style = opts.style;
  return ['<!DOCTYPE html><html>', '<head>', '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">', "<title>".concat(opts.sheetName, "</title>"), "<style>".concat(defaultHtmlStyle, "</style>"), style ? "<style>".concat(style, "</style>") : '', '</head>', "<body>".concat(content, "</body>"), '</html>'].join('');
}

function toHtml($xetable, opts, columns, datas) {
  var id = $xetable.id,
      border = $xetable.border,
      treeConfig = $xetable.treeConfig,
      treeOpts = $xetable.treeOpts,
      isAllSelected = $xetable.isAllSelected,
      isIndeterminate = $xetable.isIndeterminate,
      allHeaderAlign = $xetable.headerAlign,
      allAlign = $xetable.align,
      allFooterAlign = $xetable.footerAlign,
      allColumnOverflow = $xetable.showOverflow,
      allColumnHeaderOverflow = $xetable.showHeaderOverflow;
  var isPrint = opts.print,
      isHeader = opts.isHeader,
      isFooter = opts.isFooter;
  var allCls = 'check-all';
  var clss = ['vxe-table', "border--".concat(toTableBorder(border)), isPrint ? 'is--print' : '', isHeader ? 'show--head' : ''].filter(function (cls) {
    return cls;
  });
  var body = ["<table class=\"".concat(clss.join(' '), "\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"), "<colgroup>".concat(columns.map(function (column) {
    return "<col style=\"width:".concat(column.renderWidth, "px\">");
  }).join(''), "</colgroup>")].join('');

  if (isHeader) {
    body += "<thead><tr>".concat(columns.map(function (column) {
      var headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign;
      var classNames = hasEllipsis($xetable, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : [];
      var cellTitle = getHeaderTitle(opts, column);

      if (headAlign) {
        classNames.push("col--".concat(headAlign));
      }

      if (column.type === 'checkbox') {
        return "<th class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"checkbox\" class=\"").concat(allCls, "\" ").concat(isAllSelected ? 'checked' : '', "><span>").concat(cellTitle, "</span></div></th>");
      }

      return "<th class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellTitle, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><span>").concat(formatText(cellTitle, true), "</span></div></th>");
    }).join(''), "</tr></thead>");
  }

  if (datas.length) {
    body += '<tbody>';

    if (treeConfig) {
      datas.forEach(function (item) {
        body += '<tr>' + columns.map(function (column) {
          var cellAlign = column.align || allAlign;
          var classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
          var cellValue = item[column.id];

          if (cellAlign) {
            classNames.push("col--".concat(cellAlign));
          }

          if (column.treeNode) {
            var treeIcon = '';

            if (item._hasChild) {
              treeIcon = '<i class="vxe-table--tree-icon"></i>';
            }

            classNames.push('vxe-table--tree-node');

            if (column.type === 'radio') {
              return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><div class=\"vxe-table--tree-node-wrapper\" style=\"padding-left: ").concat(item._level * treeOpts.indent, "px\"><div class=\"vxe-table--tree-icon-wrapper\">").concat(treeIcon, "</div><div class=\"vxe-table--tree-cell\"><input type=\"radio\" name=\"radio_").concat(id, "\" ").concat(item._radioDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._radioLabel, "</span></div></div></div></td>");
            } else if (column.type === 'checkbox') {
              return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><div class=\"vxe-table--tree-node-wrapper\" style=\"padding-left: ").concat(item._level * treeOpts.indent, "px\"><div class=\"vxe-table--tree-icon-wrapper\">").concat(treeIcon, "</div><div class=\"vxe-table--tree-cell\"><input type=\"checkbox\" ").concat(item._checkboxDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._checkboxLabel, "</span></div></div></div></td>");
            }

            return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><div class=\"vxe-table--tree-node-wrapper\" style=\"padding-left: ").concat(item._level * treeOpts.indent, "px\"><div class=\"vxe-table--tree-icon-wrapper\">").concat(treeIcon, "</div><div class=\"vxe-table--tree-cell\">").concat(cellValue, "</div></div></div></td>");
          }

          if (column.type === 'radio') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"radio\" name=\"radio_").concat(id, "\" ").concat(item._radioDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._radioLabel, "</span></div></td>");
          } else if (column.type === 'checkbox') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"checkbox\" ").concat(item._checkboxDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._checkboxLabel, "</span></div></td>");
          }

          return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), ">").concat(formatText(cellValue, true), "</div></td>");
        }).join('') + '</tr>';
      });
    } else {
      datas.forEach(function (item) {
        body += '<tr>' + columns.map(function (column) {
          var cellAlign = column.align || allAlign;
          var classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
          var cellValue = item[column.id];

          if (cellAlign) {
            classNames.push("col--".concat(cellAlign));
          }

          if (column.type === 'radio') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"radio\" name=\"radio_").concat(id, "\" ").concat(item._radioDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._radioLabel, "</span></div></td>");
          } else if (column.type === 'checkbox') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"checkbox\" ").concat(item._checkboxDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._checkboxLabel, "</span></div></td>");
          }

          return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), ">").concat(formatText(cellValue, true), "</div></td>");
        }).join('') + '</tr>';
      });
    }

    body += '</tbody>';
  }

  if (isFooter) {
    var footerData = $xetable.footerData;
    var footers = getFooterData(opts, footerData);

    if (footers.length) {
      body += '<tfoot>';
      footers.forEach(function (rows) {
        body += "<tr>".concat(columns.map(function (column) {
          var footAlign = column.footerAlign || column.align || allFooterAlign || allAlign;
          var classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
          var cellValue = getFooterCellValue($xetable, opts, rows, column);

          if (footAlign) {
            classNames.push("col--".concat(footAlign));
          }

          return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), ">").concat(formatText(cellValue, true), "</div></td>");
        }).join(''), "</tr>");
      });
      body += '</tfoot>';
    }
  } // 是否半选状态


  var script = !isAllSelected && isIndeterminate ? "<script>(function(){var a=document.querySelector(\".".concat(allCls, "\");if(a){a.indeterminate=true}})()</script>") : '';
  body += '</table>' + script;
  return isPrint ? body : createHtmlPage(opts, body);
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
    var footers = getFooterData(opts, footerData);
    footers.forEach(function (rows) {
      xml += "<Row>".concat(columns.map(function (column) {
        return "<Cell><Data ss:Type=\"String\">".concat(getFooterCellValue($xetable, opts, rows, column), "</Data></Cell>");
      }).join(''), "</Row>");
    });
  }

  return "".concat(xml, "</Table></Worksheet></Workbook>");
}

function getContent($xetable, opts, columns, datas) {
  if (columns.length) {
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
  }

  return '';
}

function downloadFile($xetable, opts, content) {
  var filename = opts.filename,
      type = opts.type,
      download = opts.download;
  var name = "".concat(filename, ".").concat(type);

  if (window.Blob) {
    var blob = getExportBlobByContent(content, opts);

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
      _vXETable.default.modal.message({
        message: _conf.default.i18n('vxe.table.expSuccess'),
        status: 'success'
      });
    }
  } else {
    _tools.UtilTools.error('vxe.error.notExp');
  }
}

function handleExport($xetable, opts) {
  if (opts.remote) {
    var params = {
      options: opts,
      $table: $xetable,
      $grid: $xetable.$xegrid
    };

    if (opts.exportMethod) {
      return opts.exportMethod(params);
    }

    return Promise.resolve(params);
  }

  var _getExportData = getExportData($xetable, opts),
      columns = _getExportData.columns,
      datas = _getExportData.datas;

  return Promise.resolve($xetable.preventEvent(null, 'event.export', {
    options: opts,
    columns: columns,
    datas: datas
  }, function () {
    return downloadFile($xetable, opts, getContent($xetable, opts, columns, datas));
  }));
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
        _ctor.default.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), function (rowNode) {
          _ctor.default.arrayEach(getElementsByTagName(rowNode, 'th'), function (cellNode) {
            fields.push(cellNode.textContent);
          });
        });

        var tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody');

        if (tbodyNodes.length) {
          _ctor.default.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), function (rowNode) {
            var item = {};

            _ctor.default.arrayEach(getElementsByTagName(rowNode, 'td'), function (cellNode, colIndex) {
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
        _ctor.default.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), function (cellNode) {
          fields.push(cellNode.textContent);
        });

        _ctor.default.arrayEach(rowNodes, function (rowNode, index) {
          if (index) {
            var item = {};
            var cellNodes = getElementsByTagName(rowNode, 'Cell');

            _ctor.default.arrayEach(cellNodes, function (cellNode, colIndex) {
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

function handleImport($xetable, content, opts) {
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
  var status = checkImportData(tableFullColumn, fields);

  if (status) {
    $xetable.createData(rows).then(function (data) {
      if (opts.mode === 'insert') {
        $xetable.insert(data);
      } else {
        $xetable.reloadData(data);
      }
    });

    if (opts.message !== false) {
      _vXETable.default.modal.message({
        message: _ctor.default.template(_conf.default.i18n('vxe.table.impSuccess'), [rows.length]),
        status: 'success'
      });
    }
  } else if (opts.message !== false) {
    _vXETable.default.modal.message({
      message: _conf.default.i18n('vxe.error.impFields'),
      status: 'error'
    });
  }

  if (_importResolve) {
    _importResolve(status);

    $xetable._importResolve = null;
  }
}

function handlePrint($xetable, opts, content) {
  var beforePrintMethod = opts.beforePrintMethod;

  if (beforePrintMethod) {
    content = beforePrintMethod({
      content: content,
      options: opts,
      $table: $xetable
    }) || '';
  }

  content = createHtmlPage(opts, content);
  var blob = getExportBlobByContent(content, opts);

  if (_tools.DomTools.browse.msie) {
    if (printFrame) {
      try {
        printFrame.contentDocument.write('');
        printFrame.contentDocument.clear();
      } catch (e) {}

      document.body.removeChild(printFrame);
    }

    printFrame = createFrame();
    document.body.appendChild(printFrame);
    printFrame.contentDocument.write(content);
    printFrame.contentDocument.execCommand('print');
  } else {
    if (!printFrame) {
      printFrame = createFrame();

      printFrame.onload = function (evnt) {
        if (evnt.target.src) {
          evnt.target.contentWindow.print();
        }
      };

      document.body.appendChild(printFrame);
    }

    printFrame.src = URL.createObjectURL(blob);
  }
}

var _default = {
  methods: {
    /**
     * 导出文件，支持 csv/html/xml/txt
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     * @param {Object} options 参数
     */
    _exportData: function _exportData(options) {
      var _this = this;

      var $xegrid = this.$xegrid,
          visibleColumn = this.visibleColumn,
          tableFullColumn = this.tableFullColumn,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          exportOpts = this.exportOpts;
      var columns = options && options.columns;
      var expColumns = [];

      if (columns && columns.length) {
        columns.forEach(function (item) {
          var targetColumn;

          if (item) {
            if (_tools.UtilTools.isColumn(item)) {
              targetColumn = item;
            } else if (_ctor.default.isString(item)) {
              targetColumn = _this.getColumnByField(item);
            } else {
              var type = item.type;
              var field = item.property || item.field;

              if (field && type) {
                targetColumn = tableFullColumn.find(function (column) {
                  return column.property === field && column.type === type;
                });
              } else if (field) {
                targetColumn = _this.getColumnByField(field);
              } else if (type) {
                targetColumn = tableFullColumn.find(function (column) {
                  return column.type === type;
                });
              }
            }

            if (targetColumn) {
              expColumns.push(targetColumn);
            }
          }
        });
      } else {
        expColumns = visibleColumn;
      }

      var opts = Object.assign({
        // filename: '',
        // sheetName: '',
        // original: false,
        // message: false,
        isHeader: true,
        isFooter: true,
        download: true,
        type: 'csv',
        mode: 'current',
        // data: null,
        // remote: false,
        // dataFilterMethod: null,
        // footerFilterMethod: null,
        // exportMethod: null,
        columnFilterMethod: columns && columns.length ? null : function (_ref) {
          var column = _ref.column;
          return defaultFilterExportColumn(column);
        }
      }, exportOpts, {
        print: false
      }, options, {
        columns: expColumns
      });

      if (!opts.filename) {
        opts.filename = _ctor.default.template(_conf.default.i18n(opts.original ? 'vxe.table.expOriginFilename' : 'vxe.table.expFilename'), [_ctor.default.toDateString(Date.now(), 'yyyyMMddHHmmss')]);
      }

      if (!opts.sheetName) {
        opts.sheetName = document.title;
      }

      if (_vXETable.default.exportTypes.indexOf(opts.type) === -1) {
        throw new Error(_tools.UtilTools.getLog('vxe.error.notType', [opts.type]));
      }

      if (!opts.data) {
        opts.data = tableFullData;

        if (opts.mode === 'selected') {
          var selectRecords = this.getCheckboxRecords();

          if (['html', 'pdf'].indexOf(opts.type) > -1 && treeConfig) {
            opts.data = _ctor.default.searchTree(this.getTableData().fullData, function (item) {
              return selectRecords.indexOf(item) > -1;
            }, treeOpts);
          } else {
            opts.data = selectRecords;
          }
        } else if (opts.mode === 'all') {
          if ($xegrid && !opts.remote) {
            var _$xegrid$proxyOpts = $xegrid.proxyOpts,
                beforeQueryAll = _$xegrid$proxyOpts.beforeQueryAll,
                afterQueryAll = _$xegrid$proxyOpts.afterQueryAll,
                _$xegrid$proxyOpts$aj = _$xegrid$proxyOpts.ajax,
                ajax = _$xegrid$proxyOpts$aj === void 0 ? {} : _$xegrid$proxyOpts$aj,
                _$xegrid$proxyOpts$pr = _$xegrid$proxyOpts.props,
                props = _$xegrid$proxyOpts$pr === void 0 ? {} : _$xegrid$proxyOpts$pr;
            var ajaxMethods = ajax.queryAll;

            if (ajaxMethods) {
              var params = {
                $table: this,
                $grid: $xegrid,
                sort: $xegrid.sortData,
                filters: $xegrid.filterData,
                form: $xegrid.formData,
                target: ajaxMethods,
                options: opts
              };
              return Promise.resolve((beforeQueryAll || ajaxMethods)(params)).catch(function (e) {
                return e;
              }).then(function (rest) {
                opts.data = (props.list ? _ctor.default.get(rest, props.list) : rest) || [];

                if (afterQueryAll) {
                  afterQueryAll(params);
                }

                return handleExport(_this, opts);
              });
            }
          }
        }
      }

      return handleExport(this, opts);
    },
    _importByFile: function _importByFile(file, opts) {
      var _this2 = this;

      if (window.FileReader) {
        var _UtilTools$parseFile = _tools.UtilTools.parseFile(file),
            type = _UtilTools$parseFile.type,
            filename = _UtilTools$parseFile.filename;

        var options = Object.assign({
          mode: 'insert'
        }, opts, {
          type: type,
          filename: filename
        });
        var types = options.types || _vXETable.default.importTypes;

        if (types.indexOf(type) > -1) {
          if (options.remote) {
            var params = {
              file: file,
              options: options,
              $table: this
            };

            if (options.importMethod) {
              return options.importMethod(params);
            }

            return Promise.resolve(params);
          }

          this.preventEvent(null, 'event.import', {
            file: file,
            options: options,
            columns: this.tableFullColumn
          }, function () {
            var reader = new FileReader();

            reader.onerror = function () {
              _tools.UtilTools.error('vxe.error.notType', [type]);
            };

            reader.onload = function (e) {
              handleImport(_this2, e.target.result.trim(), options);
            };

            reader.readAsText(file, 'UTF-8');
          });
        } else {
          _tools.UtilTools.error('vxe.error.notType', [type]);
        }
      } else {
        _tools.UtilTools.error('vxe.error.notExp');
      }

      return Promise.resolve();
    },
    _importData: function _importData(options) {
      var _this3 = this;

      var opts = Object.assign({}, this.importOpts, options);
      var rest = new Promise(function (resolve, reject) {
        _this3._importResolve = resolve;
        _this3._importReject = reject;
      });
      this.readFile(opts).then(function (evnt) {
        return _this3.importByFile(evnt.target.files[0], opts);
      }).catch(function (evnt) {
        _this3._importReject(evnt);

        _this3._importReject = null;
      });
      return rest;
    },
    _readFile: function _readFile() {
      var _this4 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!fileForm) {
        fileForm = document.createElement('form');
        fileInput = document.createElement('input');
        fileForm.className = 'vxe-table--file-form';
        fileInput.name = 'file';
        fileInput.type = 'file';
        fileForm.appendChild(fileInput);
        document.body.appendChild(fileForm);
      }

      var types = options.types || _vXETable.default.importTypes;

      if (options.multiple) {
        fileInput.multiple = 'multiple';
      }

      fileInput.accept = ".".concat(types.join(', .'));

      fileInput.onchange = function (evnt) {
        var _UtilTools$parseFile2 = _tools.UtilTools.parseFile(evnt.target.files[0]),
            type = _UtilTools$parseFile2.type;

        if (types.indexOf(type) > -1) {
          _this4._fileResolve(evnt);
        } else {
          if (options.message !== false) {
            _vXETable.default.modal.message({
              message: _ctor.default.template(_conf.default.i18n('vxe.error.notType'), [type]),
              status: 'error'
            });
          }

          _this4._fileReject(evnt);
        }

        _this4._fileResolve = null;
      };

      fileForm.reset();
      fileInput.click();
      return new Promise(function (resolve, reject) {
        _this4._fileResolve = resolve;
        _this4._fileReject = reject;
      });
    },
    _print: function _print(options) {
      var _this5 = this;

      var opts = Object.assign({
        original: false
      }, this.printOpts, options, {
        type: 'html',
        download: false,
        remote: false,
        print: true
      });

      if (!opts.sheetName) {
        opts.sheetName = document.title;
      }

      if (opts.content) {
        handlePrint(this, opts, opts.content);
      } else {
        this.exportData(opts).then(function (_ref2) {
          var content = _ref2.content;
          handlePrint(_this5, opts, content);
        });
      }
    },
    _openImport: function _openImport(options) {
      var defOpts = Object.assign({
        mode: 'insert',
        message: true
      }, options, this.importOpts);
      var types = defOpts.types || _vXETable.default.exportTypes;
      var isTree = !!this.getTreeStatus();

      if (isTree) {
        if (defOpts.message) {
          _vXETable.default.modal.message({
            message: _conf.default.i18n('vxe.error.treeNotImp'),
            status: 'error'
          });
        }

        return;
      }

      if (!this.importConfig) {
        _tools.UtilTools.error('vxe.error.reqProp', ['import-config']);
      } // 处理类型


      var typeList = types.map(function (value) {
        return {
          value: value,
          label: "vxe.export.types.".concat(value)
        };
      });
      var modeList = defOpts.modes.map(function (value) {
        return {
          value: value,
          label: "vxe.import.modes.".concat(value)
        };
      });
      Object.assign(this.importStore, {
        file: null,
        type: '',
        filename: '',
        modeList: modeList,
        typeList: typeList,
        visible: true
      });
      Object.assign(this.importParams, defOpts);
      this.initStore.import = true;
    },
    _openExport: function _openExport(options) {
      var exportConfig = this.exportConfig,
          customOpts = this.customOpts,
          exportOpts = this.exportOpts,
          collectColumn = this.collectColumn,
          footerData = this.footerData;
      var selectRecords = this.getCheckboxRecords();
      var hasFooter = !!footerData.length;
      var defOpts = Object.assign({
        message: true,
        isHeader: true
      }, exportOpts, options);
      var types = defOpts.types || _vXETable.default.exportTypes;
      var checkMethod = customOpts.checkMethod;
      var exportColumns = collectColumn.slice(0);

      if (!exportConfig) {
        _tools.UtilTools.error('vxe.error.reqProp', ['export-config']);
      } // 处理类型


      var typeList = types.map(function (value) {
        return {
          value: value,
          label: "vxe.export.types.".concat(value)
        };
      });
      var modeList = defOpts.modes.map(function (value) {
        return {
          value: value,
          label: "vxe.export.modes.".concat(value)
        };
      }); // 默认选中

      _ctor.default.eachTree(exportColumns, function (column, index, items, path, parent) {
        var isColGroup = column.children && column.children.length;

        if (isColGroup || defaultFilterExportColumn(column)) {
          column.checked = column.visible;
          column.halfChecked = false;
          column.disabled = parent && parent.disabled || (checkMethod ? !checkMethod({
            column: column
          }) : false);
        }
      }); // 更新条件


      Object.assign(this.exportStore, {
        columns: exportColumns,
        typeList: typeList,
        modeList: modeList,
        hasFooter: hasFooter,
        visible: true
      }); // 重置参数

      Object.assign(this.exportParams, {
        filename: defOpts.filename || '',
        sheetName: defOpts.sheetName || '',
        type: defOpts.type || typeList[0].value,
        mode: selectRecords.length ? 'selected' : 'current',
        original: defOpts.original,
        message: defOpts.message,
        isHeader: defOpts.isHeader,
        isFooter: hasFooter && (_ctor.default.isBoolean(exportOpts.isFooter) ? exportOpts.isFooter : true),
        isPrint: defOpts.isPrint
      });
      this.initStore.export = true;
      return this.$nextTick();
    }
  }
};
exports.default = _default;