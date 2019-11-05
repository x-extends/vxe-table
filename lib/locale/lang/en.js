"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  vxe: {
    error: {
      groupFixed: 'If grouping headers are used, fixed columns must be on the left and right sides.',
      scrollXNotResizable: 'Horizontal virtual scrolling does not support "resizable".',
      cellEditRender: 'The renderer "cell-render" and "edit-render" cannot be used together.',
      treeFixedExpand: 'The fixed columns of the tree structure conflict with the expanded row.',
      scrollOriginal: 'Virtual scrolling can only export source data, please set "original=true".',
      scrollXNotGroup: 'Horizontal Virtual scrolling does not support grouping headers',
      scrollYReqProp: 'Vertical virtual scrolling requires setting the "{{0}}".',
      unableInsert: 'Unable to insert to the specified location.',
      useErr: 'An error occurred while installing "{{0}}" module. The sequence is not correct.',
      barUnableLink: 'Toolbar cannot associate table.',
      toolbarId: 'Toolbar must have a unique "id"',
      toolbarDelBtn: 'Toolbar button "{{0}}" is deprecated, please use "{{1}}"',
      reqModule: 'require "{{0}}" module.',
      emptyProp: 'The property "{{0}}" is not allowed to be empty.',
      notFunc: '"{{0}}" method not exist.',
      noTree: 'The tree structure does not support "{{0}}".',
      delFunc: 'The property "{{0}}" is deprecated, please use "{{1}}".',
      delProp: 'The function "{{0}}" is deprecated, please use "{{1}}".',
      notType: 'Unsupported types "{{0}}"'
    },
    table: {
      emptyText: 'No Data',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      allFilter: 'All'
    },
    column: {
      indexTitle: '#'
    },
    grid: {
      selectOneRecord: 'Please choose at least one piece of record!',
      deleteSelectRecord: 'Are you sure you want to delete the selected record?',
      removeSelectRecord: 'Are you sure you want to remove the selected record?',
      dataUnchanged: 'Data unchanged! ',
      saveSuccess: 'save successfully.'
    },
    pager: {
      goto: 'Go to',
      pagesize: '/page',
      total: 'Total {{total}} record',
      pageClassifier: ''
    },
    alert: {
      title: 'Message notification'
    },
    button: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    types: {
      csv: 'CSV (逗号分隔)(*.csv)',
      html: '网页(*.html)',
      xml: 'XML 数据(*.xml)',
      txt: '文本文件(制表符分隔)(*.txt)',
      xlsx: 'Excel 工作簿(*.xlsx)'
    },
    toolbar: {
      expTitle: 'Export data',
      expName: 'Filename',
      expNamePlaceholder: 'Please enter filename',
      expSheetName: 'Sheet name',
      expSheetNamePlaceholder: 'Please enter a sheet name.',
      expType: 'File type',
      expMode: 'Data to export',
      expAll: 'All data',
      expSelected: 'Selected data',
      expColumn: 'The field to export',
      expOpts: 'Export parameter',
      expOptHeader: 'Header',
      expOptFooter: 'Footer',
      expOptOriginal: 'Original',
      expConfirm: 'Export'
    }
  }
};
exports.default = _default;