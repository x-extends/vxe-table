export default {
  vxe: {
    base: {
      pleaseInput: 'Please enter',
      pleaseSelect: 'Please select',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Loading...'
    },
    error: {
      downErr: 'Download failed',
      errLargeData: 'When the bound data volume is too large, please use {0}; otherwise, performance may lag',
      groupFixed: 'If grouped headers are used, fixed columns must be set by group',
      groupMouseRange: 'Grouped headers cannot be used together with "{0}", which may cause errors',
      groupTag: 'Group columns should use "{0}" instead of "{1}", which may cause errors',
      scrollErrProp: 'The parameter "{0}" is not supported after virtual scrolling is enabled',
      errConflicts: 'Parameter "{0}" conflicts with "{1}"',
      modelConflicts: 'The bound field value "{0}" conflicts with "{1}", which will cause errors',
      notSupportProp: 'When parameter "{0}" is enabled, "{1}" is not supported; it should be "{2}", otherwise errors may occur',
      reqSupportProp: 'When using "{0}", "{1}" should be set, otherwise errors may occur',
      notConflictProp: 'When using "{0}", "{1}" should be set, otherwise functional conflicts may occur',
      unableInsert: 'Unable to insert at the specified position. Please check whether the parameters are correct',
      useErr: 'An error occurred while installing the "{0}" module. The order may be incorrect; dependent modules must be installed before Table',
      barUnableLink: 'The toolbar cannot be linked to the table',
      expandContent: 'The slot for the expanded row should be "content". Please check whether it is correct',
      reqComp: 'Missing "{0}" component. Please check whether it is installed correctly. https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: 'Missing "{0}" module',
      reqProp: 'Missing required parameter "{0}", which may cause errors',
      emptyProp: 'Parameter "{0}" cannot be empty',
      errProp: 'Unsupported parameter "{0}", possibly "{1}"',
      colRepet: 'column.{0}="{1}" is duplicated, which may cause some features to be unavailable',
      notFunc: 'Method "{0}" does not exist',
      errFunc: 'Parameter "{0}" is not a method',
      notValidators: 'Global validator "{0}" does not exist',
      notFormats: 'Global formatter "{0}" does not exist',
      notCommands: 'Global command "{0}" does not exist',
      notSlot: 'Slot "{0}" does not exist',
      noTree: 'Tree structure does not support "{0}"',
      noGroup: '"{0}" is not supported after data grouping',
      notProp: 'Unsupported parameter "{0}"',
      returnErr: 'The return value of parameter "{0}" is expected to be "{1}" but is actually "{2}"',
      notSupportReturn: 'When the return value is "{0}", the parameter should use "{1}" instead of "{2}"',
      checkProp: 'Large data volumes may cause checkbox lag. It is recommended to set parameter "{0}" to improve rendering speed',
      coverProp: 'Parameter "{1}" of "{0}" is defined repeatedly, which may cause errors',
      uniField: 'Field name "{0}" is defined repeatedly, which may cause errors',
      repeatKey: 'Duplicate primary key {0}="{1}", which may cause errors',
      repeatProp: 'Duplicate parameter {0}="{1}", which may cause errors',
      delFunc: 'Method "{0}" is deprecated. Please use "{1}"',
      delProp: 'Parameter "{0}" is deprecated. Please use "{1}"',
      delEvent: 'Event "{0}" is deprecated. Please use "{1}"',
      removeProp: 'Parameter "{0}" is deprecated and not recommended, which may cause errors',
      errFormat: 'Global formatting content should be defined using "VXETable.formats". Mounting "formatter={0}" is no longer recommended',
      notType: 'Unsupported file type "{0}"',
      notExp: 'This browser does not support import/export',
      impFields: 'Import failed. Please check whether field names and data formats are correct',
      treeNotImp: 'Tree table does not support import',
      treeCrossDrag: 'Only the first level can be dragged',
      treeDragChild: 'A parent cannot be dragged into its own children',
      reqPlugin: 'Extension plugin "{1}" is not installed. https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: 'Exceeds the maximum supported data volume of {0} rows, which may cause errors',
      useNew: '{0} is not recommended. Please use {1}',
      errorVersion: 'Version mismatch. Current version is {0}, minimum supported version is {1}',
      errMaxVersion: 'Version mismatch. Current version is {0}, maximum supported version is {1}'
    },
    table: {
      emptyText: 'No data',
      allTitle: 'Select all/Clear',
      seqTitle: 'No.',
      actionTitle: 'Actions',
      confirmFilter: 'Filter',
      resetFilter: 'Reset',
      allFilter: 'All',
      sortAsc: 'Ascending: lowest to highest',
      sortDesc: 'Descending: highest to lowest',
      filter: 'Enable filtering for the selected column',
      impSuccess: 'Successfully imported {0} records',
      expLoading: 'Exporting',
      expSuccess: 'Export successful',
      expError: 'Export failed',
      expFilename: 'Export_{0}',
      expOriginFilename: 'Export_Source_{0}',
      customTitle: 'Custom settings',
      customAll: 'All',
      customConfirm: 'Confirm',
      customClose: 'Close',
      customCancel: 'Cancel',
      customRestore: 'Restore defaults',
      maxFixedCol: 'The maximum number of fixed columns cannot exceed {0}',
      maxGroupCol: 'The maximum number of grouped fields cannot exceed {0}',
      dragTip: 'Move: {0}',
      resizeColTip: 'Width: {0} px',
      resizeRowTip: 'Height: {0} px',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: 'Loading...'
    },
    grid: {
      selectOneRecord: 'Please select at least one record!',
      deleteSelectRecord: 'Are you sure you want to delete the selected records?',
      removeSelectRecord: 'Are you sure you want to remove the selected records?',
      dataUnchanged: 'Data has not changed!',
      delSuccess: 'Selected records deleted successfully!',
      saveSuccess: 'Saved successfully!',
      operError: 'An error occurred. Operation failed!'
    },
    select: {
      clear: 'Clear',
      allChecked: 'All',
      total: '{0} selected',
      close: 'Close',
      search: 'Search',
      loadingText: 'Loading...',
      emptyText: 'No data',
      maxSize: 'The maximum number of selectable items cannot exceed {0}',
      overSizeErr: 'The maximum selectable count of {0} has been exceeded. The excess will be ignored!',
      searchEmpty: 'No matching data!'
    },
    list: {
      allChecked: 'All',
      dragTip: 'Move: {0}'
    },
    tree: {
      searchEmpty: 'No matching data!',
      dragTip: 'Move: {0}'
    },
    treeSelect: {
      clearChecked: 'Clear',
      allChecked: 'All',
      allExpand: 'Expand all',
      clearExpand: 'Collapse all',
      total: '{0} selected',
      filterCount: '{0} records found',
      close: 'Close',
      search: 'Search',
      emptyText: 'No data'
    },
    tableSelect: {
      filterCount: '{0} records found'
    },
    pager: {
      goto: 'Go to',
      gotoTitle: 'Page',
      pagesize: '{0}/page',
      total: 'Total {0} records',
      pageClassifier: 'Page',
      homePage: 'Home',
      homePageTitle: 'Home',
      prevPage: 'Previous',
      prevPageTitle: 'Previous',
      nextPage: 'Next',
      nextPageTitle: 'Next',
      prevJump: 'Jump up',
      prevJumpTitle: 'Jump up',
      nextJump: 'Jump down',
      nextJumpTitle: 'Jump down',
      endPage: 'Last',
      endPageTitle: 'Last'
    },
    alert: {
      title: 'System prompt'
    },
    button: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      clear: 'Clear'
    },
    filter: {
      search: 'Search'
    },
    custom: {
      cstmTitle: 'Custom settings',
      cstmRestore: 'Restore defaults',
      cstmCancel: 'Cancel',
      cstmConfirm: 'OK',
      cstmConfirmRestore: 'Are you sure you want to restore the default column configuration?',
      cstmDragTarget: 'Move: {0}',
      setting: {
        colSort: 'Sort',
        sortHelpTip: 'Click the icon to start dragging',
        colTitle: 'Column title',
        colResizable: 'Column width (px)',
        colVisible: 'Visible',
        colFixed: 'Fixed column',
        colFixedMax: 'Fixed columns ({0})',
        colAlign: 'Alignment',
        colHeadAlign: 'Header alignment',
        colFootAlign: 'Footer alignment',
        fixedLeft: 'Left',
        fixedUnset: 'None',
        fixedRight: 'Right',
        alignLeft: 'Left',
        alignCenter: 'Center',
        alignRight: 'Right',
        moveUp: 'Up',
        moveDn: 'Down',
        putTop: 'Top',
        putBottom: 'Bottom',
        moveUpTitle: 'Click to move up',
        moveDnTitle: 'Click to move down',
        putTopTitle: 'Click to move to top',
        putBottomTitle: 'Click to move to bottom',
        anLeftTitle: 'Align left',
        anCenterTitle: 'Align center',
        anRightTitle: 'Align right'
      }
    },
    import: {
      modes: {
        covering: 'Cover (directly overwrite table data)',
        insert: 'Append at bottom (append new data to the bottom of the table)',
        insertTop: 'Append at top (append new data to the top of the table)',
        insertBottom: 'Append at bottom (append new data to the bottom of the table)'
      },
      impTitle: 'Import data',
      impFile: 'File name',
      impSelect: 'Select file',
      impType: 'File type',
      impOpts: 'Options',
      impMode: 'Import mode',
      impConfirm: 'Import',
      impCancel: 'Cancel'
    },
    export: {
      types: {
        csv: 'CSV (comma separated)(*.csv)',
        html: 'Web page (*.html)',
        xml: 'XML data (*.xml)',
        txt: 'Text file (tab separated)(*.txt)',
        xls: 'Excel 97-2003 Workbook (*.xls)',
        xlsx: 'Excel workbook (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Empty data',
        current: 'Current data (data on the current page)',
        selected: 'Selected data (data selected on the current page)',
        all: 'All data (including data on all pages)'
      },
      printTitle: 'Print data',
      expTitle: 'Export data',
      expName: 'File name',
      expNamePlaceholder: 'Please enter a file name',
      expSheetName: 'Title',
      expSheetNamePlaceholder: 'Please enter a title',
      expType: 'Save type',
      expMode: 'Select data',
      expCurrentColumn: 'All fields',
      expColumn: 'Select fields',
      widthMode: 'Column width settings',
      wModeTitle: 'Set how column widths are rendered when printing',
      wdModes: {
        default: 'Default',
        auto: 'Auto (adjust column widths based on content)',
        scale: 'Scale (render column widths according to page scale)'
      },
      expOpts: 'Options',
      expOptHeader: 'Header',
      expHeaderTitle: 'Whether a header is needed',
      expOptFooter: 'Footer',
      expFooterTitle: 'Whether a footer is needed',
      expOptColgroup: 'Grouped header',
      expOptTitle: 'Column titles',
      expTitleTitle: 'Whether to use column titles; otherwise, display field names',
      expColgroupTitle: 'If present, supports headers with grouped structure',
      expOptMerge: 'Merge',
      expMergeTitle: 'If present, supports cells with merged structure',
      expOptAllExpand: 'Expand tree',
      expAllExpandTitle: 'If present, supports fully expanding hierarchical data',
      expOptTreeAllExpand: 'Expand tree',
      expTreeAllExpandTitle: 'If present, automatically expands all tree levels',
      expOptRowGroupAllExpand: 'Expand groups',
      expRowGroupAllExpandTitle: 'If present, automatically expands all group levels',
      expOptUseStyle: 'Styles',
      expUseStyleTitle: 'If present, supports styled cells',
      expOptOriginal: 'Source data',
      expOriginalTitle: 'If source data, supports importing into the table',
      expPrint: 'Print',
      expConfirm: 'Export',
      expCancel: 'Cancel'
    },
    modal: {
      errTitle: 'Error',
      zoomMin: 'Minimize',
      zoomIn: 'Maximize',
      zoomOut: 'Restore',
      close: 'Close',
      miniMaxSize: 'The number of minimized windows cannot exceed {0}',
      footPropErr: 'show-footer is only used to enable the footer and must be used with show-confirm-button | show-cancel-button | slots'
    },
    drawer: {
      close: 'Close'
    },
    form: {
      folding: 'Collapse',
      unfolding: 'Expand'
    },
    toolbar: {
      import: 'Import',
      export: 'Export',
      print: 'Print',
      refresh: 'Refresh',
      zoomIn: 'Fullscreen',
      zoomOut: 'Restore',
      custom: 'Custom settings',
      customAll: 'All',
      customConfirm: 'Confirm',
      customRestore: 'Reset',
      fixedLeft: 'Freeze left',
      fixedRight: 'Freeze right',
      cancelFixed: 'Unfreeze'
    },
    iconPicker: {
      search: 'Search',
      emptyText: 'No data'
    },
    datePicker: {
      yearTitle: '{0}'
    },
    dateRangePicker: {
      pleaseRange: 'Please select a start date and an end date'
    },
    input: {
      date: {
        m1: 'Jan',
        m2: 'Feb',
        m3: 'Mar',
        m4: 'Apr',
        m5: 'May',
        m6: 'Jun',
        m7: 'Jul',
        m8: 'Aug',
        m9: 'Sep',
        m10: 'Oct',
        m11: 'Nov',
        m12: 'Dec',
        quarterLabel: '{0}',
        monthLabel: '{0}',
        dayLabel: '{0} {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Week WW, yyyy',
          month: 'yyyy-MM',
          quarter: 'Qq yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
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
          q1: 'Q1',
          q2: 'Q2',
          q3: 'Q3',
          q4: 'Q4'
        }
      }
    },
    calendar: {
      yearLabel: '{0}',
      monthLabel: '{0}'
    },
    cascader: {
      clearChecked: 'Clear',
      allChecked: 'All',
      total: '{0} selected',
      close: 'Close',
      search: 'Search'
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Preview',
      operBtn: {
        zoomOut: 'Zoom out',
        zoomIn: 'Zoom in',
        pctFull: 'Fit to page',
        pct11: 'Original size',
        rotateLeft: 'Rotate left',
        rotateRight: 'Rotate right',
        print: 'Click to print image',
        download: 'Click to download image'
      }
    },
    upload: {
      fileBtnText: 'Click or drag to upload',
      imgBtnText: 'Click or drag to upload',
      dragPlaceholder: 'Drag files here to upload',
      imgSizeHint: 'Single image {0}',
      imgCountHint: 'Up to {0} images',
      fileTypeHint: 'Supports {0} file types',
      fileSizeHint: 'Single file size must not exceed {0}',
      fileCountHint: 'Up to {0} files can be uploaded',
      uploadTypeErr: 'File type mismatch!',
      overCountErr: 'You can select up to {0} files!',
      overCountExtraErr: 'The maximum count of {0} has been exceeded. The excess {1} files will be ignored!',
      overSizeErr: 'File size cannot exceed {0}!',
      manualUpload: 'Click to upload',
      reUpload: 'Re-upload',
      uploadProgress: 'Uploading {0}%',
      uploadErr: 'Upload failed',
      uploadSuccess: 'Upload successful',
      moreBtnText: 'More ({0})',
      moreImgBtnText: 'Images ({0})',
      moreFileBtnText: 'Files ({0})',
      viewItemTitle: 'Click to view',
      morePopup: {
        readTitle: 'View list',
        imageTitle: 'Upload images',
        fileTitle: 'Upload files'
      }
    },
    empty: {
      defText: 'No data'
    },
    colorPicker: {
      clear: 'Clear',
      confirm: 'Confirm',
      copySuccess: 'Copied to clipboard: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Form name',
      defFormTitle: 'Untitled form',
      widgetPropTab: 'Widget properties',
      widgetFormTab: 'Form properties',
      error: {
        wdFormUni: 'Only one widget of this type can be added to the form',
        wdSubUni: 'Only one widget of this type can be added to the subtable'
      },
      styleSetting: {
        btn: 'Style settings',
        title: 'Form style settings',
        layoutTitle: 'Widget layout',
        verticalLayout: 'Vertical layout',
        horizontalLayout: 'Horizontal layout',
        styleTitle: 'Title style',
        boldTitle: 'Bold title',
        fontBold: 'Bold',
        fontNormal: 'Normal',
        colonTitle: 'Show colon',
        colonVisible: 'Show',
        colonHidden: 'Hide',
        alignTitle: 'Alignment',
        widthTitle: 'Title width',
        alignLeft: 'Left',
        alignRight: 'Right',
        unitPx: 'px',
        unitPct: '%'
      },
      widget: {
        group: {
          base: 'Basic widgets',
          layout: 'Layout widgets',
          system: 'System widgets',
          module: 'Module widgets',
          chart: 'Chart widgets',
          advanced: 'Advanced widgets'
        },
        copyTitle: 'Copy_{0}',
        component: {
          input: 'Input',
          textarea: 'Textarea',
          select: 'Select',
          row: 'Row with multiple columns',
          title: 'Title',
          text: 'Text',
          subtable: 'Subtable',
          VxeSwitch: 'Yes/No',
          VxeInput: 'Input',
          VxeNumberInput: 'Number',
          VxeDatePicker: 'Date',
          VxeTextarea: 'Textarea',
          VxeSelect: 'Select',
          VxeTreeSelect: 'Tree select',
          VxeRadioGroup: 'Radio group',
          VxeCheckboxGroup: 'Checkbox group',
          VxeUploadFile: 'File',
          VxeUploadImage: 'Image',
          VxeRate: 'Rate',
          VxeSlider: 'Slider'
        },
        row: {
          placeholder: 'widget position'
        }
      },
      widgetProp: {
        name: 'Widget name',
        placeholder: 'Placeholder',
        required: 'Required validation',
        multiple: 'Allow multiple selection',
        displaySetting: {
          name: 'Display settings',
          pc: 'Desktop',
          mobile: 'Mobile',
          visible: 'Visible',
          hidden: 'Hidden'
        },
        dataSource: {
          name: 'Data source',
          defValue: 'Option {0}',
          addOption: 'Add option',
          batchEditOption: 'Batch edit',
          batchEditTip: 'Each line corresponds to one option. You can copy and paste directly from tables, Excel, or WPS.',
          batchEditSubTip: 'Each line corresponds to one option. For groups, sub-items can start with spaces or tabs. You can copy and paste directly from tables, Excel, or WPS.',
          buildOption: 'Generate options'
        },
        rowProp: {
          colSize: 'Columns',
          col2: 'Two columns',
          col3: 'Three columns',
          col4: 'Four columns',
          col6: 'Six columns',
          layout: 'Layout'
        },
        textProp: {
          name: 'Content',
          alignTitle: 'Alignment',
          alignLeft: 'Left',
          alignCenter: 'Center',
          alignRight: 'Right',
          colorTitle: 'Font color',
          sizeTitle: 'Font size',
          boldTitle: 'Bold font',
          fontNormal: 'Normal',
          fontBold: 'Bold'
        },
        subtableProp: {
          seqTitle: 'No.',
          showSeq: 'Show row number',
          showCheckbox: 'Allow multiple selection',
          errSubDrag: 'This widget is not supported in subtables. Please use another widget',
          colPlace: 'Drag a widget here'
        },
        uploadProp: {
          limitFileCount: 'File count limit',
          limitFileSize: 'File size limit',
          multiFile: 'Allow uploading multiple files',
          limitImgCount: 'Image count limit',
          limitImgSize: 'Image size limit',
          multiImg: 'Allow uploading multiple images'
        },
        rules: {
          required: 'Required field'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Field settings',
      listSettingTab: 'Options',
      searchTitle: 'Search conditions',
      listTitle: 'List fields',
      searchField: 'Search field',
      listField: 'List field',
      activeBtn: {
        ActionButtonUpdate: 'Edit',
        ActionButtonDelete: 'Delete'
      },
      search: {
        addBtn: 'Edit',
        emptyText: 'No search conditions configured',
        editPopupTitle: 'Edit search field'
      },
      searchPopup: {
        colTitle: 'Title',
        saveBtn: 'Save'
      }
    },
    text: {
      copySuccess: 'Copied to clipboard',
      copyError: 'This operation is not supported in the current environment'
    },
    countdown: {
      formats: {
        yyyy: 'Year',
        MM: 'Month',
        dd: 'Day',
        HH: 'Hour',
        mm: 'Minute',
        ss: 'Second'
      }
    },
    contextMenu: {
      loadingText: 'Loading...'
    },
    switch: {
      onText: 'On',
      offText: 'Off'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}',
        quarter: 'Q{q} {yyyy}',
        month: '{MM}/{yyyy}',
        week: 'Week {W}, {yyyy}',
        day: '{MM}/{dd}/{yyyy} {eLabel}',
        date: '{MM}/{dd}/{yyyy}',
        hour: '{MM}/{dd}/{yyyy} {HH}:00',
        minute: '{MM}/{dd}/{yyyy} {HH}:{mm}',
        second: '{MM}/{dd}/{yyyy} {HH}:{mm}:{ss}'
      },
      tSimpleFormat: {
        year: '{yyyy}',
        quarter: 'Q{q}',
        month: '{M}',
        week: 'W{W}',
        day: '{eLabel}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      stepFormat: {
        year: '{start.yyyy}~{end.yyyy}',
        quarter: 'Q{start.q}~Q{end.q}',
        month: '{start.M}~{end.M}',
        week: 'W{start.W}~W{end.W}',
        day: '{sE}~{eE}',
        date: '{start.d}~{end.d}',
        hour: '{start.HH}~{end.HH}',
        minute: '{start.mm}~{end.mm}',
        second: '{start.ss}~{end.ss}'
      },
      dayss: {
        w0: 'Sun',
        w1: 'Mon',
        w2: 'Tue',
        w3: 'Wed',
        w4: 'Thu',
        w5: 'Fri',
        w6: 'Sat'
      },
      days: {
        w0: 'Sun',
        w1: 'Mon',
        w2: 'Tue',
        w3: 'Wed',
        w4: 'Thu',
        w5: 'Fri',
        w6: 'Sat'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'This operation cannot be performed on merged cells',
          multiErr: 'This operation cannot be performed on multiple selected areas',
          selectErr: 'Cannot operate on cells in the specified area',
          extendErr: 'To perform this operation, all merged cells must be the same size',
          pasteMultiErr: 'Cannot paste. The copied area and the paste area must be the same size to perform this operation',
          cpInvalidErr: 'This operation cannot be performed because the selected area contains prohibited columns ({0})'
        },
        fnr: {
          title: 'Find and replace',
          titleFd: 'Find',
          titleRe: 'Replace',
          findLabel: 'Find',
          replaceLabel: 'Replace',
          findTitle: 'Find what:',
          replaceTitle: 'Replace with:',
          tabs: {
            find: 'Find',
            replace: 'Replace'
          },
          filter: {
            re: 'Regular expression',
            whole: 'Match whole word',
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
            row: 'Row: {0}',
            col: 'Column: {0}'
          },
          empty: '(empty)',
          reError: 'Invalid regular expression',
          recordCount: '{0} cells found',
          notCell: 'No matching cell found',
          replaceSuccess: 'Successfully replaced {0} cells'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Group',
          values: 'Values',
          groupPlaceholder: 'Drag here to group',
          valuesPlaceholder: 'Drag here to aggregate',
          dragExistCol: 'This column already exists',
          sortHelpTip: 'Click the icon to start dragging'
        },
        aggFuncs: {
          sum: 'Sum',
          count: 'Count',
          avg: 'Average',
          min: 'Min',
          max: 'Max',
          first: 'First',
          last: 'Last'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Fixed column',
          fixedGroup: 'Fixed group',
          cancelFixed: 'Unfix',
          fixedLeft: 'Fix left',
          fixedRight: 'Fix right'
        },
        cases: {
          equal: 'Equals',
          gt: 'Greater',
          lt: 'Less',
          begin: 'Begins',
          endin: 'Ends',
          include: 'Contains',
          isSensitive: 'Case sensitive'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Sort',
          clearSort: 'Clear sort',
          sortAsc: 'Ascending',
          sortDesc: 'Descending',
          fixedColumn: 'Freeze column',
          fixedGroup: 'Freeze group',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'Fix left',
          fixedRight: 'Fix right',
          clearFilter: 'Clear filter',
          textOption: 'Text filter',
          numberOption: 'Number filter',
          dateOption: 'Date filter'
        },
        popup: {
          title: 'Custom filter method',
          currColumnTitle: 'Show rows:',
          and: 'And',
          or: 'Or',
          describeHtml: 'Available? Represents a single character<br/>Use * Represents any multiple characters'
        },
        cases: {
          equal: 'Equals',
          unequal: 'Not equal',
          gt: 'Greater',
          ge: 'Greater or equal',
          lt: 'Less',
          le: 'Less or equal',
          begin: 'Start',
          notbegin: "It's not at the beginning",
          endin: 'End',
          notendin: 'The ending is not',
          include: 'Include',
          exclude: 'Not included',
          between: 'Between',
          isAfter: 'Is after',
          eqAfter: 'Is on or after',
          isBefore: 'Is before',
          eqBefore: 'Is on or before',
          top10: 'Top 10',
          aboveAverage: 'Above average',
          belowAverage: 'Below average',
          before: 'Before',
          after: 'After',
          tomorrow: 'Tomorrow',
          today: 'Today',
          yesterday: 'Yesterday',
          nextWeek: 'Next Week',
          thisWeek: 'This Week',
          lastWeek: 'Last Week',
          nextMonth: 'Next Month',
          thisMonth: 'This Month',
          lastMonth: 'Last Month',
          nextYear: 'Next Year',
          thisYear: 'This Year',
          lastYear: 'Last Year',
          yearToDate: 'Year to Date',
          custom: 'Custom filter',
          insensitive: 'Case insensitive',
          isSensitive: 'Case sensitive'
        },
        empty: '(blank)',
        notData: 'No matches'
      }
    },
    pro: {
      area: {
        mergeErr: 'This operation cannot be performed on merged cells',
        multiErr: 'This operation cannot be performed on multiple selected areas',
        extendErr: 'To perform this operation, all merged cells must be the same size',
        pasteMultiErr: 'Cannot paste. The copied area and the paste area must be the same size to perform this operation'
      },
      fnr: {
        title: 'Find and replace',
        titleFd: 'Find',
        titleRe: 'Replace',
        findLabel: 'Find',
        replaceLabel: 'Replace',
        findTitle: 'Find what:',
        replaceTitle: 'Replace with:',
        tabs: {
          find: 'Find',
          replace: 'Replace'
        },
        filter: {
          re: 'Regular expression',
          whole: 'Match whole word',
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
        empty: '(empty)',
        reError: 'Invalid regular expression',
        recordCount: '{0} cells found',
        notCell: 'No matching cell found',
        replaceSuccess: 'Successfully replaced {0} cells'
      }
    },
    renderer: {
      search: 'Search',
      cases: {
        equal: 'Equals',
        unequal: 'Not equal',
        gt: 'Greater',
        ge: 'Greater or equal',
        lt: 'Less',
        le: 'Less or equal',
        begin: 'Begins',
        notbegin: 'Not begin',
        endin: 'Ends',
        notendin: 'Not end',
        include: 'Contains',
        exclude: 'Not contain',
        between: 'Between',
        top10: 'Top 10',
        aboveAverage: 'Above average',
        belowAverage: 'Below average',
        custom: 'Custom filter',
        insensitive: 'Case insensitive',
        isSensitive: 'Case sensitive'
      },
      combination: {
        menus: {
          sort: 'Sort',
          clearSort: 'Clear sort',
          sortAsc: 'Ascending',
          sortDesc: 'Descending',
          fixedColumn: 'Freeze column',
          fixedGroup: 'Freeze group',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'Fix left',
          fixedRight: 'Fix right',
          clearFilter: 'Clear filter',
          textOption: 'Text filter',
          numberOption: 'Number filter',
          dateOption: 'Date filter'
        },
        popup: {
          title: 'Custom filter method',
          currColumnTitle: 'Show rows:',
          and: 'And',
          or: 'Or',
          describeHtml: 'Use ? for a single character<br/>Use * for any number of characters'
        },
        empty: '(blank)',
        notData: 'No matches'
      }
    }
  }
}
