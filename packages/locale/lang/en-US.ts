export default {
  vxe: {
    base: {
      pleaseInput: 'Please input',
      pleaseSelect: 'Select',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Loading...'
    },
    error: {
      downErr: 'Download failed.',
      groupFixed: 'If you use group headers, the freeze columns must be set by group.',
      groupMouseRange: 'Grouping headers and "{0}" cannot be used at the same time, which may cause errors.',
      groupTag: 'Grouping column header should use "{0}" instead of "{1}", which may cause errors.',
      scrollErrProp: 'The parameter "{0}" is not supported when virtual scrolling is enabled.',
      errConflicts: 'Argument "{0}" conflicts with "{1}"',
      unableInsert: 'Unable to insert to the specified location.',
      useErr: 'Error installing "{0}" module, possibly in the wrong order, dependent modules need to be installed before Table.',
      barUnableLink: 'Toolbar cannot associate table.',
      expandContent: 'Expand row slot should be "content", please check if it is correct.',
      reqComp: 'Require "{0}" component, check whether the install is correct. https://vxeui.com/#/start/useGlobal',
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
      coverProp: 'The parameter "{1}" to "{0}" is repeatedly defined. This may cause an error.',
      uniField: 'The field "{0}" is repeatedly defined, which may cause an error.',
      repeatKey: 'The primary key repeats {0}="{1}", which may cause an error',
      delFunc: 'The function "{0}" is deprecated, please use "{1}".',
      delProp: 'The property "{0}" is deprecated, please use "{1}".',
      delEvent: 'The event "{0}" is deprecated, please use "{1}"',
      removeProp: 'The property "{0}" is deprecated and is not recommended, which may cause error.',
      errFormat: 'The global formatted content should be defined with "VXETable.formats". Mounting "formatter={0}" is not recommended.',
      notType: 'Unsupported file types "{0}"',
      notExp: 'The browser does not support import / export.',
      impFields: 'Import failed, please check that the field name and data format are correct.',
      treeNotImp: 'Tree table does not support import.',
      treeCrossDrag: 'Only drag and drop the first level',
      treeDragChild: 'The parent cannot be dragged into its own child',
      reqPlugin: 'Optional extensions "{1}" https://vxeui.com/other{0}/#/{1}/install'
    },
    table: {
      emptyText: 'No Data',
      allTitle: 'Select all / cancel',
      seqTitle: 'N/S',
      actionTitle: 'Action',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      allFilter: 'All',
      sortAsc: 'Ascending: lowest to highest',
      sortDesc: 'Descending: highest to lowest',
      filter: 'Enable filtering on selected columns',
      impSuccess: 'Successfully imported {0} records',
      expLoading: 'Exporting',
      expSuccess: 'Export success',
      expError: 'Export failure',
      expFilename: 'Export_{0}',
      expOriginFilename: 'Export_original_{0}',
      customTitle: 'Column settings',
      customAll: 'All',
      customConfirm: 'Confirm',
      customClose: 'Close',
      customCancel: 'Cancel',
      customRestore: 'Restore',
      maxFixedCol: 'The maximum number of Freeze columns cannot exceed {0}',
      dragTip: 'Moving: {0}'
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
      gotoTitle: 'Number',
      pagesize: '{0}/page',
      total: 'Total {0} records',
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
      cstmDragTarget: 'Moving: {0}',
      setting: {
        colSort: 'Sort',
        sortHelpTip: 'Click and drag the icon to adjust the order of the columns.',
        colTitle: 'Column title',
        colResizable: 'Column width (px)',
        colVisible: 'Display',
        colFixed: 'Freeze columns',
        colFixedMax: 'Freeze columns (Max. {0})',
        fixedLeft: 'Left',
        fixedUnset: 'Unset',
        fixedRight: 'Right'
      }
    },
    import: {
      modes: {
        covering: 'Overwrite mode (directly overwrite table data)',
        insert: 'Bottom append (appends new data to the bottom of the table)',
        insertTop: 'Top append (appends new data to the top of the table)',
        insertBottom: 'Bottom append (appends new data to the bottom of the table)'
      },
      impTitle: 'Import data',
      impFile: 'Filename',
      impSelect: 'Select file',
      impType: 'File type',
      impOpts: 'Settings',
      impMode: 'Import mode',
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
      errTitle: 'Error',
      zoomMin: 'Minimize',
      zoomIn: 'Maximize',
      zoomOut: 'Reduction',
      close: 'Close',
      miniMaxSize: 'The number of minimized Windows cannot exceed {0}.',
      footPropErr: '"show-footer" is only used to enable table tails and needs to be used in conjunction with "show-confirm-button" | "show-cancel-button" | slots'
    },
    drawer: {
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
      cancelFixed: 'Unfreeze column'
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
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Preview',
      operBtn: {
        zoomOut: 'Reduce',
        zoomIn: 'Enlarge',
        pctFull: 'Proportional scaling',
        pct11: 'Show original size',
        rotateLeft: 'Rotate left',
        rotateRight: 'Rotate right',
        print: 'Click to print',
        download: 'Click to download'
      }
    },
    upload: {
      fileBtnText: 'Click or drag',
      imgBtnText: 'Click or drag',
      dragPlaceholder: 'Please drag and drop the file into this area to upload it.',
      imgSizeHint: 'Single {0}',
      imgCountHint: 'Up to {0}',
      fileTypeHint: 'Support {0} file types',
      fileSizeHint: 'Single file size does not exceed {0}',
      fileCountHint: 'Up to {0} file can be uploaded',
      uploadTypeErr: 'File type does not match!',
      overCountErr: 'You can only choose {0} file!',
      overCountExtraErr: 'It has exceeded the maximum number {0}, and more than {0} file will be ignored!超出最大数量 1 个，超出的 1 个文件将被忽略！',
      overSizeErr: 'The size of the file is not more than {0}}!',
      reUpload: 'Re upload',
      uploadProgress: 'Uploading {0}%',
      uploadErr: 'Fail to upload',
      uploadSuccess: 'Successfully upload',
      moreBtnText: 'More ({0})',
      viewItemTitle: 'click to view',
      morePopup: {
        readTitle: 'List',
        imageTitle: 'Upload image',
        fileTitle: 'Upload file'
      }
    },
    empty: {
      defText: 'No Data'
    },
    colorPicker: {
      clear: 'Clear',
      confirm: 'Confirm',
      copySuccess: 'Copied to clipboard: {0}'
    },
    formDesign: {
      formName: 'Form name',
      defFormTitle: 'Unnamed form',
      widgetPropTab: 'Field property',
      widgetFormTab: 'Form property',
      error: {
        wdFormUni: 'Only one control of this type is allowed to be added to the form.',
        wdSubUni: 'Only one control of this type is allowed to be added to a sub table.'
      },
      styleSetting: {
        btn: 'Style setting',
        title: 'Form style setting',
        layoutTitle: 'Field layout',
        verticalLayout: 'Vertical layout',
        horizontalLayout: 'Horizontal layout',
        styleTitle: 'Title style',
        boldTitle: 'Bold title',
        fontBold: 'Bold',
        fontNormal: 'Normal',
        colonTitle: 'Display colon',
        colonVisible: 'Visible',
        colonHidden: 'Hidden',
        alignTitle: 'Title align',
        widthTitle: 'Title width',
        alignLeft: 'Left',
        alignRight: 'Right',
        unitPx: 'Px',
        unitPct: 'Pct'
      },
      widget: {
        group: {
          base: 'Base control',
          layout: 'Layout control',
          system: 'System control',
          module: 'Module control',
          chart: 'Chart control',
          advanced: 'Advanced control'
        },
        copyTitle: 'Copy_{0}',
        component: {
          input: 'Input',
          textarea: 'Textarea',
          select: 'Select',
          row: 'Row/column',
          title: 'Title',
          text: 'Text',
          subtable: 'Subtable',
          VxeSwitch: 'Yes/no',
          VxeInput: 'Input',
          VxeNumberInput: 'Number',
          VxeDatePicker: 'Date',
          VxeTextarea: 'Textarea',
          VxeSelect: 'Select',
          VxeTreeSelect: 'Tree select',
          VxeRadioGroup: 'Radio',
          VxeCheckboxGroup: 'Checkbox',
          VxeUploadFile: 'File',
          VxeUploadImage: 'Image',
          VxeRate: 'Rate',
          VxeSlider: 'Slider'
        }
      },
      widgetProp: {
        name: 'Field name',
        placeholder: 'Field placeholder',
        required: 'Required',
        multiple: 'Allow to select multiple',
        displaySetting: {
          name: 'Display setting',
          pc: 'PC',
          mobile: 'Mobile',
          visible: 'Visible',
          hidden: 'Hidden'
        },
        dataSource: {
          name: 'Data source',
          defValue: 'Option {0}',
          addOption: 'Add option',
          batchEditOption: 'Batch edit',
          batchEditTip: 'Each row corresponds to an option, supporting direct copying and pasting from tables, Excel, and WPS.',
          batchEditSubTip: 'Each row corresponds to an option. If grouped, the sub items can start with spaces or tab keys, and can be directly copied and pasted from tables, Excel, or WPS.',
          buildOption: 'Build option'
        },
        rowProp: {
          colSize: 'Number of columns',
          col2: 'Two columns',
          col3: 'Three columns',
          col4: 'Four columns',
          col6: 'Six columns',
          layout: 'Layout'
        },
        textProp: {
          name: 'Content',
          alignTitle: 'Align',
          alignLeft: 'Left',
          alignCenter: 'Center',
          alignRight: 'Right',
          colorTitle: 'Color',
          sizeTitle: 'Font size',
          boldTitle: 'Font bold',
          fontNormal: 'Normal',
          fontBold: 'Bold'
        },
        subtableProp: {
          seqTitle: 'S/N',
          showSeq: 'Display serial number',
          showCheckbox: 'Allow multiple selections',
          errSubDrag: 'The sub table does not support this control. Please use another control.',
          colPlace: 'Drag the control in.'
        },
        uploadProp: {
          limitFileCount: 'File quantity limitation',
          limitFileSize: 'File size limitation',
          multiFile: 'Allows multiple files',
          limitImgCount: 'Image quantity limitation',
          limitImgSize: 'Image size limitation',
          multiImg: 'Allows multiple images'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Field',
      listSettingTab: 'Parameter',
      searchTitle: 'Search',
      listTitle: 'List',
      searchField: 'Search field',
      listField: 'List field',
      activeBtn: {
        ActionButtonUpdate: 'Edit',
        ActionButtonDelete: 'Delete'
      },
      search: {
        addBtn: 'Edit',
        emptyText: 'No filter condition is configured.',
        editPopupTitle: 'Edit search fields'
      },
      searchPopup: {
        colTitle: 'Title',
        saveBtn: 'Save'
      }
    },
    text: {
      copySuccess: 'Successfully copied to clipboard.',
      copyError: 'The current environment does not support this operation.'
    },
    countdown: {
      formats: {
        yyyy: 'Year',
        MM: 'Moon',
        dd: 'Day',
        HH: 'Hour',
        mm: 'Minute',
        ss: 'Second'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'The operation cannot be performed on merged cells',
          multiErr: 'The operation cannot be performed on multiple selection areas',
          selectErr: 'Unable to operate the cells in the designated area.',
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
          body: {
            row: '行：{0}',
            col: '列：{0}'
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
