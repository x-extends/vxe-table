export default {
  vxe: {
    base: {
      pleaseInput: 'Please enter',
      pleaseSelect: 'Please select',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'loading...'
    },
    error: {
      downErr: 'Download failed',
      errLargeData: 'When the amount of data bound is too large, you should use "{0}"; otherwise, a stall may occur',
      groupFixed: 'If using group headers, frozen columns must be set by group',
      groupMouseRange: 'The group header and "{0}" cannot be used at the same time, which may cause an error.',
      groupTag: 'Grouping column headers should use "{0}" instead of "{1}", which may cause errors',
      scrollErrProp: 'The parameter "{0}" is not supported when virtual scrolling is enabled',
      errConflicts: '"{1}" is not supported when parameter "{0}", it should be "{2}", otherwise an error will occur',
      notSupportProp: '"{1}" is not supported when parameter "{0}" is enabled, it should be "{2}", otherwise an error will occur',
      notConflictProp: 'When using "{0}", you should set "{1}", otherwise there may be a functional conflict',
      unableInsert: 'Unable to insert into the specified position, please check whether the parameters are correct',
      useErr: 'An error occurred while installing the "{0}" module. The order may be incorrect. The dependent modules need to be installed before Table.',
      barUnableLink: 'The toolbar cannot be associated with the table',
      expandContent: 'The slot to expand the row should be "content", please check if it is correct',
      reqComp: 'The "{0}" component is missing, please check if it is installed correctly. https://vxeui.com/#/start/useGlobal',
      reqModule: 'Missing module "{0}"',
      reqProp: 'The required "{0}" parameter is missing, which may result in an error',
      emptyProp: 'Parameter "{0}" is not allowed to be empty',
      errProp: 'Unsupported parameter "{0}", possible "{1}"',
      colRepet: 'column.{0}="{1}" is repeated, which may cause some functions to become unusable',
      notFunc: 'Method "{0}" does not exist',
      errFunc: 'Parameter "{0}" is not a method',
      notValidators: 'Global check "{0}" does not exist',
      notFormats: 'Global format "{0}" does not exist',
      notCommands: 'Global directive "{0}" does not exist',
      notSlot: 'Slot "{0}" does not exist',
      noTree: 'The tree structure does not support "{0}"',
      notProp: 'Unsupported parameter "{0}"',
      checkProp: 'When the amount of data is too large, it may cause the check box to freeze. It is recommended to set the parameter "{0}" to improve the rendering speed.',
      coverProp: 'The parameter "{1}" of "{0}" is defined repeatedly, which may cause an error.',
      uniField: 'Field name "{0}" is defined repeatedly, which may cause an error',
      repeatKey: 'Duplicate primary key {0}="{1}", this may cause an error',
      delFunc: 'Method "{0}" is deprecated, please use "{1}"',
      delProp: 'Parameter "{0}" is obsolete, please use "{1}"',
      delEvent: 'Event "{0}" is deprecated, please use "{1}"',
      removeProp: 'Parameter "{0}" is deprecated and is not recommended and may result in errors',
      errFormat: 'Global formatting content should be defined using "VXETable.formats". The method of mounting "formatter={0}" is no longer recommended.',
      notType: 'Unsupported file type "{0}"',
      notExp: 'This browser does not support import/export functionality',
      impFields: 'Import failed, please check whether the field name and data format are correct',
      treeNotImp: 'Tree tables do not support importing',
      treeCrossDrag: 'Only the first level can be dragged',
      treeDragChild: 'A parent cannot be dragged into its own children',
      reqPlugin: 'Extension plugin not installed "{1}" https://vxeui.com/other{0}/#/{1}/install',
      errMaxRow: 'The maximum supported data volume {0} line is exceeded, which may cause an error.'
    },
    table: {
      emptyText: 'No data yet',
      allTitle: 'Select all/Cancel',
      seqTitle: 'Serial number',
      actionTitle: 'operate',
      confirmFilter: 'filter',
      resetFilter: 'reset',
      allFilter: 'all',
      sortAsc: 'Ascending order: lowest to highest',
      sortDesc: 'Descending order: highest to lowest',
      filter: 'Enable filtering on selected columns',
      impSuccess: 'Successfully imported {0} records',
      expLoading: 'Exporting',
      expSuccess: 'Export successful',
      expError: 'Export failed',
      expFilename: 'Export_{0}',
      expOriginFilename: 'export_source_{0}',
      customTitle: 'Column settings',
      customAll: 'all',
      customConfirm: 'confirm',
      customClose: 'closure',
      customCancel: 'Cancel',
      customRestore: 'Restore default',
      maxFixedCol: 'The maximum number of frozen columns cannot exceed {0}',
      dragTip: 'Move: {0}',
      resizeColTip: 'Width: {0} Pixels',
      resizeRowTip: 'Height: {0} Pixels'
    },
    grid: {
      selectOneRecord: 'Please select at least one record!',
      deleteSelectRecord: 'Are you sure you want to delete the selected records?',
      removeSelectRecord: 'Are you sure you want to remove the selected records?',
      dataUnchanged: 'The data has not been changed!',
      delSuccess: 'Selected records successfully deleted!',
      saveSuccess: 'Saved successfully!',
      operError: 'An error occurred and the operation failed!'
    },
    select: {
      search: 'search',
      loadingText: 'loading',
      emptyText: 'No data yet'
    },
    pager: {
      goto: 'Go to',
      gotoTitle: 'Number of pages',
      pagesize: '{0} items/page',
      total: 'Total {0} records',
      pageClassifier: 'Page',
      homePage: 'front page',
      homePageTitle: 'front page',
      prevPage: 'Previous page',
      prevPageTitle: 'Previous page',
      nextPage: 'Next page',
      nextPageTitle: 'Next page',
      prevJump: 'Jump page up',
      prevJumpTitle: 'Jump page up',
      nextJump: 'Jump page down',
      nextJumpTitle: 'Jump page down',
      endPage: 'Last page',
      endPageTitle: 'Last page'
    },
    alert: {
      title: 'System prompt'
    },
    button: {
      confirm: 'confirm',
      cancel: 'Cancel',
      clear: '清除'
    },
    filter: {
      search: 'search'
    },
    custom: {
      cstmTitle: 'Column settings',
      cstmRestore: 'Restore default',
      cstmCancel: 'Cancel',
      cstmConfirm: 'Sure',
      cstmConfirmRestore: 'Please confirm whether to restore to the default column configuration?',
      cstmDragTarget: 'Move: {0}',
      setting: {
        colSort: 'sort',
        sortHelpTip: 'Click and drag the icon to adjust column ordering',
        colTitle: 'Column header',
        colResizable: 'Column width (pixels)',
        colVisible: 'Whether to display',
        colFixed: 'Freeze columns',
        colFixedMax: 'Freeze columns (up to {0} columns)',
        fixedLeft: 'left side',
        fixedUnset: 'Not set',
        fixedRight: 'right side'
      }
    },
    import: {
      modes: {
        covering: 'Overwriting method (directly overwrite table data)',
        insert: 'Append at the bottom (append new data at the bottom of the table)',
        insertTop: 'Top append (append new data at the top of the table)',
        insertBottom: 'Append at the bottom (append new data at the bottom of the table)'
      },
      impTitle: 'Import data',
      impFile: 'file name',
      impSelect: 'Select file',
      impType: 'File type',
      impOpts: 'Parameter settings',
      impMode: 'import mode',
      impConfirm: 'import',
      impCancel: 'Cancel'
    },
    export: {
      types: {
        csv: 'CSV (comma separated)(*.csv)',
        html: 'Web page (*.html)',
        xml: 'XML data (*.xml)',
        txt: 'Text file (tab delimited) (*.txt)',
        xls: 'Excel 97-2003 workbook (*.xls)',
        xlsx: 'Excel workbook (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Null data',
        current: 'Current data (data of the current page)',
        selected: 'Selected data (selected data on the current page)',
        all: 'Full data (including all paginated data)'
      },
      printTitle: 'Print data',
      expTitle: 'Export data',
      expName: 'file name',
      expNamePlaceholder: 'Please enter a file name',
      expSheetName: 'title',
      expSheetNamePlaceholder: 'Please enter a title',
      expType: 'save type',
      expMode: 'Select data',
      expCurrentColumn: 'All fields',
      expColumn: 'Select field',
      expOpts: 'Parameter settings',
      expOptHeader: 'Header',
      expHeaderTitle: 'Is a header required?',
      expOptFooter: 'end of table',
      expFooterTitle: 'Is a table footer required?',
      expOptColgroup: 'Group header',
      expColgroupTitle: 'If present, headers with grouping structures are supported',
      expOptMerge: 'merge',
      expMergeTitle: 'Supports cells with merge structures if present',
      expOptAllExpand: 'Expand level',
      expAllExpandTitle: 'If it exists, it supports expanding all data with hierarchical structure.',
      expOptUseStyle: 'style',
      expUseStyleTitle: 'Styled cells are supported if present',
      expOptOriginal: 'source data',
      expOriginalTitle: 'If it is source data, it supports importing into the table',
      expPrint: 'Print',
      expConfirm: 'Export',
      expCancel: 'Cancel'
    },
    modal: {
      errTitle: 'Error message',
      zoomMin: 'minimize',
      zoomIn: 'maximize',
      zoomOut: 'reduction',
      close: 'closure',
      miniMaxSize: 'The number of minimized windows cannot exceed {0}',
      footPropErr: 'show-footer is only used to enable table footer and needs to be used with show-confirm-button | show-cancel-button | slot'
    },
    drawer: {
      close: 'closure'
    },
    form: {
      folding: 'close',
      unfolding: 'Expand'
    },
    toolbar: {
      import: 'import',
      export: 'Export',
      print: 'Print',
      refresh: 'refresh',
      zoomIn: 'full screen',
      zoomOut: 'reduction',
      custom: 'Column settings',
      customAll: 'all',
      customConfirm: 'confirm',
      customRestore: 'reset',
      fixedLeft: 'frozen on left',
      fixedRight: 'frozen on right',
      cancelFixed: 'Unfreeze column'
    },
    datePicker: {
      yearTitle: '{0} years'
    },
    input: {
      date: {
        m1: 'January',
        m2: 'February',
        m3: 'March',
        m4: 'April',
        m5: 'May',
        m6: 'June 06',
        m7: 'July',
        m8: 'August',
        m9: 'September',
        m10: 'October',
        m11: 'November',
        m12: 'December',
        quarterLabel: '{0} years',
        monthLabel: '{0} years',
        dayLabel: '{0} year {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Week WW of year yyyy',
          month: 'yyyy-MM',
          quarter: 'quarter q of year yyyy',
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
          m0: 'January',
          m1: 'February',
          m2: 'March',
          m3: 'April',
          m4: 'May',
          m5: 'June',
          m6: 'July',
          m7: 'August',
          m8: 'September',
          m9: 'October',
          m10: 'November',
          m11: 'December'
        },
        quarters: {
          q1: 'first quarter',
          q2: 'second quarter',
          q3: 'third quarter',
          q4: 'fourth quarter'
        }
      }
    },
    numberInput: {
      currencySymbol: '￥'
    },
    imagePreview: {
      popupTitle: 'Preview',
      operBtn: {
        zoomOut: 'zoom out',
        zoomIn: 'enlarge',
        pctFull: 'proportional scaling',
        pct11: 'Show original size',
        rotateLeft: 'Rotate left',
        rotateRight: 'Rotate right',
        print: 'Click to print picture',
        download: 'Click to download image'
      }
    },
    upload: {
      fileBtnText: 'Click or drag to upload',
      imgBtnText: 'Click or drag to upload',
      dragPlaceholder: 'Please drag and drop the file into this area to upload it',
      imgSizeHint: 'Leaflet {0}',
      imgCountHint: 'Maximum {0} pictures',
      fileTypeHint: 'Supported {0} file types',
      fileSizeHint: 'The size of a single file does not exceed {0}',
      fileCountHint: 'Up to {0} files can be uploaded',
      uploadTypeErr: 'File type mismatch!',
      overCountErr: 'Only {0} files can be selected!',
      overCountExtraErr: 'The maximum number of {0} files has been exceeded. The excess {1} files will be ignored!',
      overSizeErr: 'The maximum file size cannot exceed {0}!',
      reUpload: 'Reupload',
      uploadProgress: 'Uploading {0}%',
      uploadErr: 'Upload failed',
      uploadSuccess: 'Upload successful',
      moreBtnText: 'More ({0})',
      viewItemTitle: 'Click to view',
      morePopup: {
        readTitle: 'View list',
        imageTitle: 'Upload pictures',
        fileTitle: 'Upload files'
      }
    },
    empty: {
      defText: 'No data yet'
    },
    colorPicker: {
      clear: 'Clear',
      confirm: 'confirm',
      copySuccess: 'Copied to clipboard: {0}'
    },
    formDesign: {
      formName: 'form name',
      defFormTitle: 'unnamed form',
      widgetPropTab: 'Control properties',
      widgetFormTab: 'form properties',
      error: {
        wdFormUni: 'Only one control of this type is allowed to be added to the form',
        wdSubUni: 'Only one control of this type is allowed to be added to the subtable'
      },
      styleSetting: {
        btn: 'Style settings',
        title: 'Form style settings',
        layoutTitle: 'Control layout',
        verticalLayout: 'Top and bottom layout',
        horizontalLayout: 'Horizontal layout',
        styleTitle: 'Title style',
        boldTitle: 'Title bold',
        fontBold: 'Bold',
        fontNormal: 'conventional',
        colonTitle: 'Show colon',
        colonVisible: 'show',
        colonHidden: 'hide',
        alignTitle: 'Alignment',
        widthTitle: 'title width',
        alignLeft: 'On the left',
        alignRight: 'On the right',
        unitPx: 'Pixel',
        unitPct: 'percentage'
      },
      widget: {
        group: {
          base: 'Basic controls',
          layout: 'Layout controls',
          system: 'System controls',
          module: 'module control',
          chart: 'chart control',
          advanced: 'Advanced controls'
        },
        copyTitle: 'Copy_{0}',
        component: {
          input: 'Input box',
          textarea: 'text field',
          select: 'drop down selection',
          row: 'One row and multiple columns',
          title: 'title',
          text: 'text',
          subtable: 'Subtable',
          VxeSwitch: 'whether',
          VxeInput: 'Input box',
          VxeNumberInput: 'number',
          VxeDatePicker: 'date',
          VxeTextarea: 'text field',
          VxeSelect: 'drop down selection',
          VxeTreeSelect: 'tree selection',
          VxeRadioGroup: 'radio button',
          VxeCheckboxGroup: 'checkbox',
          VxeUploadFile: 'document',
          VxeUploadImage: 'picture',
          VxeRate: 'score',
          VxeSlider: 'slider'
        }
      },
      widgetProp: {
        name: 'Control name',
        placeholder: 'prompt',
        required: 'Required verification',
        multiple: 'Allow multiple selections',
        displaySetting: {
          name: 'display settings',
          pc: 'PC',
          mobile: 'Mobile version',
          visible: 'show',
          hidden: 'hide'
        },
        dataSource: {
          name: 'data source',
          defValue: 'Option {0}',
          addOption: 'Add options',
          batchEditOption: 'Batch editing',
          batchEditTip: 'Each row corresponds to an option, and supports copying and pasting directly from tables, Excel, and WPS.',
          batchEditSubTip: 'Each row corresponds to an option. If it is a group, the sub-items can start with a space or a tab key. Direct copy and paste from tables, Excel, and WPS is supported.',
          buildOption: 'Build options'
        },
        rowProp: {
          colSize: 'Number of columns',
          col2: 'two columns',
          col3: 'three columns',
          col4: 'four columns',
          col6: 'six columns',
          layout: 'layout'
        },
        textProp: {
          name: 'content',
          alignTitle: 'Alignment',
          alignLeft: 'On the left',
          alignCenter: 'center',
          alignRight: 'On the right',
          colorTitle: 'Font color',
          sizeTitle: 'font size',
          boldTitle: 'Bold font',
          fontNormal: 'conventional',
          fontBold: 'Bold'
        },
        subtableProp: {
          seqTitle: 'Serial number',
          showSeq: 'Display serial number',
          showCheckbox: 'Allow multiple selections',
          errSubDrag: 'The subtable does not support this control, please use other controls',
          colPlace: 'Drag the control in'
        },
        uploadProp: {
          limitFileCount: 'File quantity limit',
          limitFileSize: 'File size limit',
          multiFile: 'Allow multiple file uploads',
          limitImgCount: 'Picture quantity limit',
          limitImgSize: 'Image size limit',
          multiImg: 'Allow multiple images to be uploaded'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Field settings',
      listSettingTab: 'Parameter settings',
      searchTitle: 'Query conditions',
      listTitle: 'list field',
      searchField: 'Query field',
      listField: 'list field',
      activeBtn: {
        ActionButtonUpdate: 'edit',
        ActionButtonDelete: 'delete'
      },
      search: {
        addBtn: 'edit',
        emptyText: 'No query conditions configured',
        editPopupTitle: 'Edit query fields'
      },
      searchPopup: {
        colTitle: 'title',
        saveBtn: 'save'
      }
    },
    text: {
      copySuccess: 'Copied to clipboard',
      copyError: 'The current environment does not support this operation'
    },
    countdown: {
      formats: {
        yyyy: 'Year',
        MM: 'moon',
        dd: 'sky',
        HH: 'hour',
        mm: 'point',
        ss: 'Second'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'This operation cannot be performed on merged cells',
          multiErr: 'This operation cannot be performed on multiple selection areas',
          selectErr: 'Unable to operate on cells in the specified range',
          extendErr: 'If the extended range contains merged cells, all merged cells must be the same size',
          pasteMultiErr: 'Unable to paste, the copied and pasted areas need to be of the same size to perform this operation',
          cpInvalidErr: 'The operation cannot be performed. There are prohibited columns ({0}) in the range you selected.'
        },
        fnr: {
          title: 'Find and replace',
          findLabel: 'Find',
          replaceLabel: 'replace',
          findTitle: 'Find what:',
          replaceTitle: 'Replace with:',
          tabs: {
            find: 'Find',
            replace: 'replace'
          },
          filter: {
            re: 'regular expression',
            whole: 'whole word match',
            sensitive: 'case sensitive'
          },
          btns: {
            findNext: 'Find next',
            findAll: 'Find all',
            replace: 'replace',
            replaceAll: 'Replace all',
            cancel: 'Cancel'
          },
          header: {
            seq: '#',
            cell: 'cell',
            value: 'value'
          },
          body: {
            row: 'Row: {0}',
            col: 'Column: {0}'
          },
          empty: '(null value)',
          reError: 'Invalid regular expression',
          recordCount: '{0} cells found',
          notCell: 'No matching cell found',
          replaceSuccess: 'Successfully replaced {0} cells'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Freeze columns',
          fixedGroup: 'freeze group',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'freeze left',
          fixedRight: 'freeze right'
        },
        cases: {
          equal: 'equal',
          gt: 'greater than',
          lt: 'less than',
          begin: 'The beginning is',
          endin: 'The end is',
          include: 'Include',
          isSensitive: 'case sensitive'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Sort',
          clearSort: 'Clear sort',
          sortAsc: 'Ascending order',
          sortDesc: 'descending order',
          fixedColumn: 'Freeze columns',
          fixedGroup: 'freeze group',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'freeze left',
          fixedRight: 'freeze right',
          clearFilter: 'Clear filters',
          textOption: 'text filter',
          numberOption: 'numerical filter'
        },
        popup: {
          title: 'How to customize filtering',
          currColumnTitle: 'Current column:',
          and: 'and',
          or: 'or',
          describeHtml: 'Available ? represents a single character<br/>Use * to represent any number of characters'
        },
        cases: {
          equal: 'equal',
          unequal: 'not equal to',
          gt: 'greater than',
          ge: 'greater than or equal to',
          lt: 'less than',
          le: 'less than or equal to',
          begin: 'The beginning is',
          notbegin: 'Not at the beginning',
          endin: 'The end is',
          notendin: 'The ending is not',
          include: 'Include',
          exclude: 'Not included',
          between: 'between',
          custom: 'Custom filter',
          insensitive: 'Not case sensitive',
          isSensitive: 'case sensitive'
        },
        empty: '(blank)',
        notData: 'No match'
      }
    },
    pro: {
      area: {
        mergeErr: 'This operation cannot be performed on merged cells',
        multiErr: 'This operation cannot be performed on multiple selection areas',
        extendErr: 'If the extended range contains merged cells, all merged cells must be the same size',
        pasteMultiErr: 'Unable to paste, the copied and pasted areas need to be of the same size to perform this operation'
      },
      fnr: {
        title: 'Find and replace',
        findLabel: 'Find',
        replaceLabel: 'replace',
        findTitle: 'Find what:',
        replaceTitle: 'Replace with:',
        tabs: {
          find: 'Find',
          replace: 'replace'
        },
        filter: {
          re: 'regular expression',
          whole: 'whole word match',
          sensitive: 'case sensitive'
        },
        btns: {
          findNext: 'Find next',
          findAll: 'Find all',
          replace: 'replace',
          replaceAll: 'Replace all',
          cancel: 'Cancel'
        },
        header: {
          seq: '#',
          cell: 'cell',
          value: 'value'
        },
        empty: '(null value)',
        reError: 'Invalid regular expression',
        recordCount: '{0} cells found',
        notCell: 'No matching cell found',
        replaceSuccess: 'Successfully replaced {0} cells'
      }
    },
    renderer: {
      search: 'search',
      cases: {
        equal: 'equal',
        unequal: 'not equal to',
        gt: 'greater than',
        ge: 'greater than or equal to',
        lt: 'less than',
        le: 'less than or equal to',
        begin: 'The beginning is',
        notbegin: 'Not at the beginning',
        endin: 'The end is',
        notendin: 'The ending is not',
        include: 'Include',
        exclude: 'Not included',
        between: 'between',
        custom: 'Custom filter',
        insensitive: 'Not case sensitive',
        isSensitive: 'case sensitive'
      },
      combination: {
        menus: {
          sort: 'Sort',
          clearSort: 'Clear sort',
          sortAsc: 'Ascending order',
          sortDesc: 'descending order',
          fixedColumn: 'Freeze columns',
          fixedGroup: 'freeze group',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'freeze to left',
          fixedRight: 'freeze to right',
          clearFilter: 'Clear filters',
          textOption: 'text filter',
          numberOption: 'numerical filter'
        },
        popup: {
          title: 'How to customize filtering',
          currColumnTitle: 'Current column:',
          and: 'and',
          or: 'or',
          describeHtml: 'Available ? represents a single character<br/>Use * to represent any number of characters'
        },
        empty: '(blank)',
        notData: 'No match'
      }
    }
  }
}
