export default {
  vxe: {
    error: {
      groupFixed: 'If grouping headers are used, fixed columns must be on the left and right sides.',
      notResizable: 'Horizontal virtual scrolling does not support resizable.',
      cellEditRender: 'The renderer cell-render and edit-render cannot be used together.',
      scrollOriginal: 'Virtual scrolling can only export source data, please set original=true.',
      treeFixedExpand: 'The fixed columns of the tree structure conflict with the expanded row.',
      scrollYHeight: 'You must set the height or max-height to enable virtual scrolling.',
      unableInsert: 'Unable to insert to the specified location.',

      barUnableLink: 'Toolbar cannot associate table.',
      toolbarId: 'Toolbar must have a unique id',

      reqModule: 'require {{0}} module.',
      emptyProp: 'The property {{0}} is not allowed to be empty.',
      notFunc: '{{0}} method not exist.',
      noTree: 'The tree structure does not support {{0}}.',
      delFunc: 'The property {{0}} is deprecated, please use {{1}}.',
      delProp: 'The function {{0}} is deprecated, please use {{1}}.'
    },
    table: {
      emptyText: 'No Data',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      allFilter: 'All'
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
    }
  }
}
