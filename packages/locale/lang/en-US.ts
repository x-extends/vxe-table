export default {
  vxe: {
    base: {
      pleaseInput: 'Please input',
      pleaseSelect: 'Select'
    },
    loading: {
      text: 'Loading...'
    },
    error: {
      groupFixed: 'If you use group headers, the freeze columns must be set by group.',
      groupMouseRange: 'Grouping headers and "{0}" cannot be used at the same time, which may cause errors.',
      groupTag: 'Grouping column header should use "{0}" instead of "{1}", which may cause errors.',
      scrollErrProp: 'The parameter "{0}" is not supported when virtual scrolling is enabled.',
      errConflicts: 'Argument "{0}" conflicts with "{1}"',
      unableInsert: 'Unable to insert to the specified location.',
      useErr: 'Error installing "{0}" module, possibly in the wrong order, dependent modules need to be installed before Table.',
      barUnableLink: 'Toolbar cannot associate table.',
      expandContent: 'Expand row slot should be "content", please check if it is correct.',
      reqModule: 'require "{0}" module.',
      reqProp: 'Missing the necessary "{0}" parameter, which can cause error.',
      emptyProp: 'The property "{0}" is not allowed to be empty.',
      errProp: 'Unsupported parameter "{0}", possibly "{1}".',
      colRepet: 'column.{0}="{0}" is duplicated, which may make some features unusable',
      notFunc: 'method "{0}" not exist.',
      errFunc: 'The argument "{0}" is not a method',
      notValidators: 'Global validators "{0}" no existe.',
      notFormats: 'Global formats "{0}" no existe.',
      notCommands: 'Global commands "{0}" no existe.',
      notSlot: 'slot "{0}" does not exist',
      noTree: 'The tree structure does not support "{0}".',
      notProp: 'Unsupported parameters "{0}"',
      checkProp: 'The checkbox may stall when the amount of data is too large, it is recommended to set the parameter "{0}" to increase the rendering speed ',
      coverProp: 'The parameter "{1}" to "{0}" is repeatedly defined. This may cause an error',
      delFunc: 'The function "{0}" is deprecated, please use "{1}".',
      delProp: 'The property "{0}" is deprecated, please use "{1}".',
      delEvent: 'The event "{0}" is deprecated, please use "{1}"',
      removeProp: 'The property "{0}" is deprecated and is not recommended, which may cause error.',
      errFormat: 'The global formatted content should be defined with "VXETable.formats". Mounting "formatter={0}" is not recommended.',
      notType: 'Unsupported file types "{0}"',
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
      impSuccess: 'Successfully imported {0} records',
      expLoading: 'Exporting',
      expSuccess: 'Export success',
      expFilename: 'Export_{0}',
      expOriginFilename: 'Export_original_{0}',
      customTitle: 'Column settings',
      customAll: 'All',
      customConfirm: 'Confirm',
      customRestore: 'Reset',
      maxFixedCol: 'The maximum number of Freeze columns cannot exceed {0}'
    },
    grid: {
      selectOneRecord: 'Please choose at least one piece of record!',
      deleteSelectRecord: 'Are you sure you want to delete the selected record?',
      removeSelectRecord: 'Are you sure you want to remove the selected record?',
      dataUnchanged: 'Data unchanged! ',
      delSuccess: 'Successfully deleted the selected record!',
      saveSuccess: 'Saved successfully!',
      operError: 'Error occurred, operation failed!'
    },
    select: {
      search: 'Search',
      loadingText: 'Loading',
      emptyText: 'No Data'
    },
    pager: {
      goto: 'Go to',
      pagesize: '{0}/page',
      total: 'Total {0} record',
      pageClassifier: '',
      homePage: 'Home',
      homePageTitle: 'Home page',
      prevPage: 'Previous page',
      prevPageTitle: 'Previous page',
      nextPage: 'next page',
      nextPageTitle: 'next page',
      prevJump: 'Jump previous page',
      prevJumpTitle: 'Jump previous page',
      nextJump: 'Jump next page',
      nextJumpTitle: 'Jump next page',
      endPage: 'End page',
      endPageTitle: 'End'
    },
    alert: {
      title: 'System messages'
    },
    button: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    filter: {
      search: '搜索'
    },
    custom: {
      cstmTitle: 'Column Settings',
      cstmRestore: 'Restore default',
      cstmCancel: 'Cancelar',
      cstmConfirm: 'Confirm',
      cstmConfirmRestore: 'Please confirm whether to restore the default column configuration?',
      cstmDragTarget: 'Moving target: {0}',
      setting: {
        colSort: 'Sort',
        sortHelpTip: 'Click and drag the icon to adjust the order of the columns.',
        colTitle: 'Title',
        colVisible: 'Visible',
        colFixed: 'Freeze columns (Max. {0})',
        fixedLeft: 'Left',
        fixedUnset: 'Unset',
        fixedRight: 'Right'
      }
    },
    import: {
      modes: {
        covering: 'Covering',
        insert: 'Insert'
      },
      impTitle: 'Import data',
      impFile: 'Filename',
      impSelect: 'Select file',
      impType: 'File type',
      impOpts: 'Settings',
      impConfirm: 'Import',
      impCancel: 'Cancel'
    },
    export: {
      types: {
        csv: 'CSV (Comma separated) (*.csv)',
        html: 'Web Page (*.html)',
        xml: 'XML Data(*.xml)',
        txt: 'Text (Tab delimited) (*.txt)',
        xls: 'Excel 97-2003 Workbook(*.xls)',
        xlsx: 'Excel Workbook (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: 'Current data (data of current page)',
        selected: 'Selected data (data selected on the current page)',
        all: 'Full data (including all paging data)'
      },
      printTitle: 'Print data',
      expTitle: 'Export data',
      expName: 'Filename',
      expNamePlaceholder: 'Please enter filename',
      expSheetName: 'Title',
      expSheetNamePlaceholder: 'Please enter a title',
      expType: 'Save the type',
      expMode: 'Select data',
      expCurrentColumn: 'All the field',
      expColumn: 'Select field',
      expOpts: 'Settings',
      expOptHeader: 'Header',
      expHeaderTitle: 'Do I need a header',
      expOptFooter: 'Footer',
      expFooterTitle: 'Do you need the footer table',
      expOptColgroup: 'Group header',
      expColgroupTitle: 'If it exists, headers with grouping structure are supported',
      expOptMerge: 'Merge',
      expMergeTitle: 'If it exists, cells with merged structures are supported',
      expOptAllExpand: 'Expand nodes',
      expAllExpandTitle: 'If it exists, all data with tree structure can be expanded',
      expOptUseStyle: 'Styles',
      expUseStyleTitle: 'If it exists, cells with styles are supported',
      expOptOriginal: 'Source data',
      expOriginalTitle: 'If it is source data, import into the table is supported',
      expPrint: 'Print',
      expConfirm: 'Export',
      expCancel: 'Cancel'
    },
    modal: {
      zoomIn: 'Maximization',
      zoomOut: 'Reduction',
      close: 'Close'
    },
    form: {
      folding: 'Folding',
      unfolding: 'Unfolding'
    },
    toolbar: {
      import: 'Import',
      export: 'Export',
      print: 'Printing',
      refresh: 'Refresh',
      zoomIn: 'Full screen',
      zoomOut: 'Reduction',
      custom: 'Column settings',
      customAll: 'All',
      customConfirm: 'Confirm',
      customRestore: 'Reset',
      fixedLeft: 'Freeze on the left',
      fixedRight: 'Freeze on the right',
      cancelfixed: 'Unfreeze column'
    },
    input: {
      date: {
        m1: 'January',
        m2: 'February',
        m3: 'March',
        m4: 'April',
        m5: 'May',
        m6: 'June',
        m7: 'July',
        m8: 'August',
        m9: 'September',
        m10: 'October',
        m11: 'November',
        m12: 'December',
        quarterLabel: '{0}',
        monthLabel: '{0}',
        dayLabel: '{1} {0}',
        labelFormat: {
          date: 'dd/MM/yyyy',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: '[Week] WW, yyyy',
          month: 'MM/yyyy',
          quarter: '[Quarter] q, yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: 'Week',
          w0: 'Sun',
          w1: 'Mon',
          w2: 'Tue',
          w3: 'Wed',
          w4: 'Thu',
          w5: 'Fri',
          w6: 'Sat'
        },
        months: {
          m0: 'Jan',
          m1: 'Feb',
          m2: 'Mar',
          m3: 'Apr',
          m4: 'May',
          m5: 'Jun',
          m6: 'Jul',
          m7: 'Aug',
          m8: 'Sep',
          m9: 'Oct',
          m10: 'Nov',
          m11: 'Dec'
        },
        quarters: {
          q1: 'First quarter',
          q2: 'Second quarter',
          q3: 'Third quarter',
          q4: 'Fourth quarter'
        }
      }
    },

    /**
     * 扩展插件
     */
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'The operation cannot be performed on merged cells',
          multiErr: 'The operation cannot be performed on multiple selection areas',
          extendErr: 'If the extended area contains merged cells, all merged cells need to be the same size',
          pasteMultiErr: 'Cannot paste, copied area and pasted area of the same size are required to perform this operation',
          cpInvalidErr: 'This operation cannot be performed because there are prohibited columns in the area you selected ({0})'
        },
        fnr: {
          title: 'Find and replace',
          findLabel: 'Find',
          replaceLabel: 'Replace',
          findTitle: 'What to find:',
          replaceTitle: 'Replace with:',
          tabs: {
            find: 'Find',
            replace: 'Replace'
          },
          filter: {
            re: 'Regular Expression',
            whole: 'Whole word',
            sensitive: 'Case sensitive'
          },
          btns: {
            findNext: 'Find next',
            findAll: 'Find all',
            replace: 'Replace',
            replaceAll: 'Replace all',
            cancel: 'Cancel'
          },
          header: {
            seq: '#',
            cell: 'Cell',
            value: 'Value'
          },
          empty: '(Empty)',
          reError: 'Invalid regular expression',
          recordCount: 'Found {0} cells',
          notCell: 'No matching cells were found',
          replaceSuccess: 'Successfully replaced {0} cells'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Freeze column',
          fixedGroup: 'Freeze group',
          cancelFixed: 'Clear freeze',
          fixedLeft: 'Freeze the left',
          fixedRight: 'Freeze the right'
        },
        cases: {
          equal: 'Equal',
          gt: 'Greater than',
          lt: 'Less than',
          begin: 'Beginning is',
          endin: 'End is',
          include: 'Include',
          isSensitive: 'Case sensitive'
        }
      },
      filterCombination: {
        menus: {
          clearSort: 'Clear sort',
          sortAsc: 'Ascending order',
          sortDesc: 'Descending order',
          fixedColumn: 'Freeze column',
          fixedGroup: 'Freeze group',
          cancelFixed: 'Clear freeze',
          fixedLeft: 'Freeze the left',
          fixedRight: 'Freeze the right',
          clearFilter: 'Clear filter',
          textOption: 'Text filter',
          numberOption: 'Number filter'
        },
        popup: {
          title: 'Custom filtering',
          currColumnTitle: 'Current column:',
          and: 'And',
          or: 'Or',
          describeHtml: 'Use ? To represent a single character <br/> use * to represent any number of characters'
        },
        cases: {
          equal: 'Equal',
          unequal: 'Not equal',
          gt: 'Greater than',
          ge: 'Greater than or equal',
          lt: 'Less than',
          le: 'Less than or equal',
          begin: 'Beginning is',
          notbegin: 'Beginning is not',
          endin: 'End is',
          notendin: 'End is not',
          include: 'Include',
          exclude: 'Exclusive',
          between: 'Betweenness',
          custom: 'Custom filter',
          insensitive: 'Case insensitive',
          isSensitive: 'Case sensitive'
        },
        empty: '(Empty)',
        notData: 'No data'
      }
    },

    /**
     * 以下废弃
     * @deprecated
     */
    renderer: {
      search: 'Search',
      cases: {
        equal: 'Equal',
        unequal: 'Not equal',
        gt: 'Greater than',
        ge: 'Greater than or equal',
        lt: 'Less than',
        le: 'Less than or equal',
        begin: 'Beginning is',
        notbegin: 'Beginning is not',
        endin: 'End is',
        notendin: 'End is not',
        include: 'Include',
        exclude: 'Exclusive',
        between: 'Betweenness',
        custom: 'Custom filter',
        insensitive: 'Case insensitive',
        isSensitive: 'Case sensitive'
      },
      combination: {
        menus: {
          clearSort: 'Clear sort',
          sortAsc: 'Ascending order',
          sortDesc: 'Descending order',
          fixedColumn: 'Fixed column',
          fixedGroup: 'Fixed group',
          cancelFixed: 'Clear fixed',
          fixedLeft: 'Fixed the left',
          fixedRight: 'Fixed the right',
          clearFilter: 'Clear filter',
          textOption: 'Text filter',
          numberOption: 'Number filter'
        },
        popup: {
          title: 'Custom filtering',
          currColumnTitle: 'Current column:',
          and: 'And',
          or: 'Or',
          describeHtml: 'Use ? To represent a single character <br/> use * to represent any number of characters'
        },
        empty: '(Empty)',
        notData: 'No data'
      }
    },
    pro: {
      area: {
        mergeErr: 'The operation cannot be performed on merged cells',
        multiErr: 'The operation cannot be performed on multiple selection areas',
        extendErr: 'If the extended area contains merged cells, all merged cells need to be the same size',
        pasteMultiErr: 'Cannot paste, copied area and pasted area of the same size are required to perform this operation'
      },
      fnr: {
        title: 'Find and replace',
        findLabel: 'Find',
        replaceLabel: 'Replace',
        findTitle: 'What to find:',
        replaceTitle: 'Replace with:',
        tabs: {
          find: 'Find',
          replace: 'Replace'
        },
        filter: {
          re: 'Regular Expression',
          whole: 'Whole word',
          sensitive: 'Case sensitive'
        },
        btns: {
          findNext: 'Find next',
          findAll: 'Find all',
          replace: 'Replace',
          replaceAll: 'Replace all',
          cancel: 'Cancel'
        },
        header: {
          seq: '#',
          cell: 'Cell',
          value: 'Value'
        },
        empty: '(Empty)',
        reError: 'Invalid regular expression',
        recordCount: 'Found {0} cells',
        notCell: 'No matching cells were found',
        replaceSuccess: 'Successfully replaced {0} cells'
      }
    }
  }
}
