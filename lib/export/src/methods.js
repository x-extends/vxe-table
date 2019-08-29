"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCsvContent($table, opts, oColumns, oData) {
  var isOriginal = opts.original;
  var tableElem = $table.$el;

  var _getCsvData = getCsvData(opts, oData, oColumns, tableElem),
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
    $table.footerData.forEach(function (rows) {
      content += rows.join(',') + '\n';
    });
  }

  return content;
}

function downloadCsc(opts, content) {
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

var _default = {
  /**
     * 导出 csv 文件
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了可视渲染，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     */
  exportCsv: function exportCsv(options) {
    var visibleColumn = this.visibleColumn,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad,
        treeConfig = this.treeConfig;
    var opts = Object.assign({
      filename: 'table.csv',
      original: !!treeConfig,
      isHeader: true,
      isFooter: true,
      download: true,
      data: null,
      columns: null,
      columnFilterMethod: function columnFilterMethod(column) {
        return ['index', 'selection', 'radio'].indexOf(column.type) === -1 && column.property;
      },
      dataFilterMethod: null
    }, options);

    if (opts.filename.indexOf('.csv') === -1) {
      opts.filename += '.csv';
    }

    if (!opts.original) {
      if (scrollXLoad || scrollYLoad) {
        opts.original = true;

        _tools.UtilTools.warn('vxe.error.scrollOriginal');
      }
    }

    var columns = visibleColumn;
    var oData = this.tableFullData;

    if (treeConfig) {
      oData = _xeUtils.default.toTreeArray(oData, treeConfig);
    }

    return downloadCsc(opts, getCsvContent(this, opts, columns, oData));
  }
};
exports.default = _default;