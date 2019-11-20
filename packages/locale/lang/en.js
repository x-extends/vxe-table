export default {
  vxe: {
    error: {
      groupFixed: 'If grouping headers are used, fixed columns must be on the left and right sides.',
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
      notType: 'Unsupported file types "{{0}}"',
      notExp: 'The browser does not support import / export.',
      impFields: 'Import failed, please check that the field name and data format are correct.'
    },
    table: {
      emptyText: 'No Data',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      allFilter: 'All',
      sortAsc: 'Ascending: lowest to highest',
      sortDesc: 'Descending: highest to lowest',
      filter: 'Enable filtering on selected columns',
      impSuccess: 'Import success',
      expSuccess: 'Export success'
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
      setting: 'Column settings',
      impTitle: 'Import parameter settings',
      impFile: 'Filename',
      impSelect: 'Select file',
      impType: 'File type',
      impOpts: 'Import option',
      impConfirm: 'Import',
      impModeCovering: 'Covering',
      impModeAppend: 'Append',
      expTitle: 'Export parameter settings',
      expName: 'Filename',
      expNamePlaceholder: 'Please enter filename',
      expSheetName: 'Sheet name',
      expSheetNamePlaceholder: 'Please enter a sheet name.',
      expType: 'Save the type',
      expMode: 'Data to export',
      expAll: 'All data',
      expSelected: 'Selected data',
      expAllColumn: 'All the field',
      expColumn: 'The field to export',
      expOpts: 'Export option',
      expOptHeader: 'Header',
      expOptFooter: 'Footer',
      expOptOriginal: 'Original (Support for importing)',
      expPrint: 'Print',
      expConfirm: 'Export'
    }
  }
}
