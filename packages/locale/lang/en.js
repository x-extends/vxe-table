export default {
  vxe: {
    error: {
      rowIdEmpty: 'The property row-id is not allowed to be empty.',
      delProp: 'The property prop is deprecated, please use field.',
      delLabel: 'The property label is deprecated, please use title.',
      delColumnKey: 'The property <column>.column-key is deprecated, please use <table>.column-key.',
      delShowAllOverflow: 'The property show-all-overflow is deprecated, please use show-overflow',
      delShowHeaderAllOverflow: 'The property show-header-all-overflow is deprecated, please use show-header-overflow',
      delGetRecords: 'The function getRecords is deprecated, please use getData.',
      delGetAllRecords: 'The function getAllRecords is deprecated, please use getRecordset.',
      delRevert: 'The function revert is deprecated, please use revertData.',
      groupFixed: 'If grouping headers are used, fixed columns must be on the left and right sides.',
      notResizable: 'Horizontal virtual scrolling does not support resizable.',
      cellEditRender: 'The renderer cell-render and edit-render cannot be used together.',
      scrollOriginal: 'Virtual scrolling can only export source data, please set original=true.',
      treeInsert: 'The tree structure does not support insert operations.',
      treeRemove: 'The tree structure does not support remove operations.',
      treeFixedExpand: 'The fixed columns of the tree structure conflict with the expanded row.',
      scrollYHeight: 'You must set the height or max-height to enable virtual scrolling.',
      unableInsert: 'Unable to insert to the specified location.',

      notQuery: 'query method not exist.',
      notDelete: 'delete method not exist.',
      notSave: 'save method not exist.',

      toolbarId: 'Toolbar must have a unique id'
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
