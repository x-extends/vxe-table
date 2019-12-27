"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  vxe: {
    error: {
      groupFixed: 'If grouping headers are used, fixed columns must be on the left and right sides.',
      cellEditRender: 'The renderer "cell-render" and "edit-render" cannot be used together.',
      treeFixedExpand: 'The fixed column of the tree structure conflicts with the expanded row.',
      treeLineExpand: 'The node line of tree structure conflicts with the expanded line.',
      treeLineReqProp: 'To enable tree node line, you need to set "{{0}}"',
      scrollXNotGroup: 'Horizontal Virtual scrolling does not support grouping headers',
      scrollXReqProp: 'Horizontal virtual scrolling requires setting the "{{0}}".',
      scrollYReqProp: 'Vertical virtual scrolling requires setting the "{{0}}".',
      unableInsert: 'Unable to insert to the specified location.',
      useErr: 'Error installing "{{0}}" module, possibly in the wrong order, dependent modules need to be installed before Table.',
      barUnableLink: 'Toolbar cannot associate table.',
      toolbarId: 'Toolbar must have a unique "id"',
      expandContent: 'Expand row slot should be "content", please check if it is correct.',
      reqModule: 'require "{{0}}" module.',
      emptyProp: 'The property "{{0}}" is not allowed to be empty.',
      errProp: 'Props "{{0}}" type error',
      notFunc: '"{{0}}" method not exist.',
      noTree: 'The tree structure does not support "{{0}}".',
      delFunc: 'The function "{{0}}" is deprecated, please use "{{1}}".',
      delProp: 'The property "{{0}}" is deprecated, please use "{{1}}".',
      delEvent: 'The event "{{0}}" is deprecated, please use "{{1}}"',
      notType: 'Unsupported file types "{{0}}"',
      notExp: 'The browser does not support import / export.',
      impFields: 'Import failed, please check that the field name and data format are correct.',
      treeNotImp: 'Tree table does not support import.'
    },
    table: {
      emptyText: 'No Data',
      allTitle: 'Select all / cancel',
      seqTitle: '#',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      allFilter: 'All',
      sortAsc: 'Ascending: lowest to highest',
      sortDesc: 'Descending: highest to lowest',
      filter: 'Enable filtering on selected columns',
      impSuccess: 'Import success',
      expSuccess: 'Export success',
      expFilename: 'Export_{0}',
      expOriginFilename: 'Export_original_{0}',
      expSheetName: 'Sheet1'
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
      pageClassifier: '',
      prevPage: 'Previous page',
      nextPage: 'next page',
      prevJump: 'Jump previous page',
      nextJump: 'Jump next page'
    },
    alert: {
      title: 'Message notification'
    },
    button: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    types: {
      csv: 'CSV (Comma separated) (*.csv)',
      html: 'Web Page (*.html)',
      xml: 'XML Data(*.xml)',
      txt: 'Text (Tab delimited) (*.txt)',
      xlsx: 'Excel Workbook (*.xlsx)',
      pdf: 'PDF (*.pdf)'
    },
    modal: {
      zoomIn: 'Maximization',
      zoomOut: 'Downward reduction',
      close: 'Close'
    },
    toolbar: {
      import: 'Import data',
      export: 'Export data',
      refresh: 'Refresh',
      zoomIn: 'Maximization',
      zoomOut: 'Downward reduction',
      custom: 'Custom columns',
      customAll: 'All',
      customConfirm: 'Confirm',
      customReset: 'Reset',
      impTitle: 'Import parameter settings',
      impFile: 'Filename',
      impSelect: 'Select file',
      impType: 'File type',
      impOpts: 'Import option',
      impConfirm: 'Import',
      impModeCovering: 'Covering',
      impCoveringTitle: 'Importing data into a table using overrides',
      impModeAppend: 'Append',
      impAppendTitle: 'Importing data into a table by appending',
      expTitle: 'Export parameter settings',
      expName: 'Filename',
      expNamePlaceholder: 'Please enter filename',
      expSheetName: 'Sheet name',
      expSheetNamePlaceholder: 'Please enter a sheet name',
      expType: 'Save the type',
      expMode: 'Data to export',
      expAll: 'All data',
      expSelected: 'Selected data',
      expAllColumn: 'All the field',
      expColumn: 'The field to export',
      expOpts: 'Export option',
      expOptHeader: 'Header',
      expHeaderTitle: 'Need to export header',
      expOptFooter: 'Footer',
      expFooterTitle: 'Need to export footer',
      expOptOriginal: 'Original data',
      expOriginalTitle: 'Need to export original data? If it is checked, import to table is supported',
      expPrint: 'Print',
      expConfirm: 'Export'
    }
  }
};
exports.default = _default;