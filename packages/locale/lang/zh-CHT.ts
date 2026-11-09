export default {
  vxe: {
    base: {
      pleaseInput: '請輸入',
      pleaseSelect: '請選擇',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: '載入中...'
    },
    error: {
      downErr: '下載失敗',
      errLargeData: '當綁定的資料量過大時，應該請使用 {0}，否則可能會出現卡頓',
      groupFixed: '如果使用分組表頭，凍結欄必須按組設定',
      groupMouseRange: '分組表頭與 "{0}" 不能同時使用，這可能會出現錯誤',
      groupTag: '分組欄頭應該使用 "{0}" 而不是 "{1}"，這可能會出現錯誤',
      scrollErrProp: '啟用虛擬捲動後不支援該參數 "{0}"',
      errConflicts: '參數 "{0}" 與 "{1}" 有衝突',
      modelConflicts: '綁定的欄位值 "{0}" 與 "{1}" 存在衝突，將會出現錯誤',
      notSupportProp: '當啟用參數 "{0}" 時不支援 "{1}"，應該為 "{2}"，否則將會出現錯誤',
      reqSupportProp: '當使用 "{0}" 時，應該設定 "{1}"，否則可能會出現錯誤',
      notConflictProp: '當使用 "{0}" 時，應該設定 "{1}"，否則可能會存在功能衝突',
      unableInsert: '無法插入到指定位置，請檢查參數是否正確',
      useErr: '安裝 "{0}" 模組時發生錯誤，可能順序不正確，依賴的模組需要在 Table 之前安裝',
      barUnableLink: '工具列無法關聯表格',
      expandContent: '展開列的插槽應該是 "content"，請檢查是否正確',
      reqComp: '缺少 "{0}" 元件，請檢查是否正確安裝。 https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: '缺少 "{0}" 模組',
      reqProp: '缺少必要的 "{0}" 參數，這可能會導致出現錯誤',
      emptyProp: '參數 "{0}" 不允許為空',
      errProp: '不支援的參數 "{0}"，可能為 "{1}"',
      colRepet: 'column.{0}="{1}" 重複了，這可能會導致某些功能無法使用',
      notFunc: '方法 "{0}" 不存在',
      errFunc: '參數 "{0}" 不是一個方法',
      notValidators: '全域校驗 "{0}" 不存在',
      notFormats: '全域格式化 "{0}" 不存在',
      notCommands: '全域指令 "{0}" 不存在',
      notSlot: '插槽 "{0}" 不存在',
      noTree: '樹結構不支援 "{0}"',
      noGroup: '資料分組後不支援 "{0}"',
      notProp: '不支援的參數 "{0}"',
      returnErr: '參數 "{0}" 的返回值期望是 "{1}" 實際是 "{2}"',
      notSupportReturn: '當返回值為 "{0}" 時的參數應該使用 "{1}" 而不是 "{2}"',
      checkProp: '當資料量過大時可能會導致核取方塊卡頓，建議設定參數 "{0}" 提升渲染速度',
      coverProp: '"{0}" 的參數 "{1}" 重複定義，這可能會出現錯誤',
      uniField: '欄位名 "{0}" 重複定義，這可能會出現錯誤',
      repeatKey: '主鍵重複 {0}="{1}"，這可能會出現錯誤',
      repeatProp: '參數重複 {0}="{1}"，這可能會出現錯誤',
      delFunc: '方法 "{0}" 已廢棄，請使用 "{1}"',
      delProp: '參數 "{0}" 已廢棄，請使用 "{1}"',
      delEvent: '事件 "{0}" 已廢棄，請使用 "{1}"',
      removeProp: '參數 "{0}" 已廢棄，不建議使用，這可能會導致出現錯誤',
      errFormat: '全域的格式化內容應該使用 "VXETable.formats" 定義，掛載 "formatter={0}" 的方式已不建議使用',
      notType: '不支援的檔案類型 "{0}"',
      notExp: '該瀏覽器不支援匯入/匯出功能',
      impFields: '匯入失敗，請檢查欄位名和資料格式是否正確',
      treeNotImp: '樹表格不支援匯入',
      treeCrossDrag: '只能拖曳第一層級',
      treeDragChild: '父級不能拖曳到自己的子級中',
      reqPlugin: '擴充外掛未安裝 "{1}" https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: '超過支援的最大資料量 {0} 列，這可能會導致出現錯誤',
      useNew: '不建議使用 {0}，請使用 {1}',
      errorVersion: '版本不匹配，當前版本 {0}，最低支援版本為 {1}',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: '暫無資料',
      allTitle: '全選/取消',
      seqTitle: '序號',
      actionTitle: '操作',
      confirmFilter: '篩選',
      resetFilter: '重設',
      allFilter: '全部',
      sortAsc: '升序：最低到最高',
      sortDesc: '降序：最高到最低',
      filter: '對所選的欄啟用篩選',
      impSuccess: '成功匯入 {0} 筆記錄',
      expLoading: '正在匯出中',
      expSuccess: '匯出成功',
      expError: '匯出失敗',
      expFilename: '匯出_{0}',
      expOriginFilename: '匯出_來源_{0}',
      customTitle: '個人化設定',
      customAll: '全部',
      customConfirm: '確認',
      customClose: '關閉',
      customCancel: '取消',
      customRestore: '恢復預設',
      maxFixedCol: '最大凍結欄的數量不能超過 {0} 個',
      maxGroupCol: '最大分組欄位的數量不能超過 {0} 個',
      dragTip: '移動：{0}',
      resizeColTip: '寬：{0} 像素',
      resizeRowTip: '高：{0} 像素',
      rowGroupContentTotal: '{0}（{1}）',
      menuLoading: '載入中...'
    },
    grid: {
      selectOneRecord: '請至少選擇一筆記錄！',
      deleteSelectRecord: '您確定要刪除所選記錄嗎？',
      removeSelectRecord: '您確定要移除所選記錄嗎？',
      dataUnchanged: '資料未改動！',
      delSuccess: '成功刪除所選記錄！',
      saveSuccess: '儲存成功！',
      operError: '發生錯誤，操作失敗！'
    },
    select: {
      clear: '清除',
      allChecked: '全選',
      total: '已選 {0} 項',
      close: '關閉',
      search: '搜尋',
      loadingText: '載入中...',
      emptyText: '暫無資料',
      maxSize: '最大可選擇的數量不能超過 {0} 個',
      overSizeErr: '已超出最大可選數量 {0} 個，超出部分將被忽略！',
      searchEmpty: '未匹配到資料！'
    },
    list: {
      allChecked: '全選',
      dragTip: '移動：{0}'
    },
    tree: {
      searchEmpty: '未匹配到資料！',
      dragTip: '移動：{0}'
    },
    treeSelect: {
      clearChecked: '清除',
      allChecked: '全選',
      allExpand: '全部展開',
      clearExpand: '全部收合',
      total: '已選 {0} 項',
      filterCount: '共找到 {0} 筆記錄',
      close: '關閉',
      search: '搜尋',
      emptyText: '暫無資料'
    },
    tableSelect: {
      filterCount: '共找到 {0} 筆記錄'
    },
    pager: {
      goto: '前往',
      gotoTitle: '頁數',
      pagesize: '{0}筆/頁',
      total: '共 {0} 筆記錄',
      pageClassifier: '頁',
      homePage: '首頁',
      homePageTitle: '首頁',
      prevPage: '上一頁',
      prevPageTitle: '上一頁',
      nextPage: '下一頁',
      nextPageTitle: '下一頁',
      prevJump: '向上跳頁',
      prevJumpTitle: '向上跳頁',
      nextJump: '向下跳頁',
      nextJumpTitle: '向下跳頁',
      endPage: '末頁',
      endPageTitle: '末頁'
    },
    alert: {
      title: '系統提示'
    },
    button: {
      confirm: '確認',
      cancel: '取消',
      clear: '清除'
    },
    filter: {
      search: '搜尋'
    },
    custom: {
      cstmTitle: '個人化設定',
      cstmRestore: '恢復預設',
      cstmCancel: '取消',
      cstmConfirm: '確定',
      cstmConfirmRestore: '請確認是否恢復成預設欄配置？',
      cstmDragTarget: '移動：{0}',
      setting: {
        colSort: '排序',
        sortHelpTip: '點擊圖示開始拖曳',
        colTitle: '欄標題',
        colResizable: '欄寬（像素）',
        colVisible: '是否顯示',
        colFixed: '凍結欄',
        colFixedMax: '凍結欄（{0}）',
        colAlign: '對齊方式',
        colHeadAlign: '表頭對齊方式',
        colFootAlign: '表尾對齊方式',
        fixedLeft: '左',
        fixedUnset: '無',
        fixedRight: '右',
        alignLeft: '左',
        alignCenter: '中',
        alignRight: '右',
        moveUp: '上移',
        moveDn: '下移',
        putTop: '置頂',
        putBottom: '置尾',
        moveUpTitle: '點擊向上移動',
        moveDnTitle: '點擊向下移動',
        putTopTitle: '點擊置頂',
        putBottomTitle: '點擊置尾',
        anLeftTitle: '靠左對齊',
        anCenterTitle: '置中',
        anRightTitle: '靠右對齊'
      }
    },
    import: {
      modes: {
        covering: '覆蓋方式（直接覆蓋表格資料）',
        insert: '底部追加（在表格的底部追加新資料）',
        insertTop: '頂部追加（在表格的頂部追加新資料）',
        insertBottom: '底部追加（在表格的底部追加新資料）'
      },
      impTitle: '匯入資料',
      impFile: '檔案名稱',
      impSelect: '選擇檔案',
      impType: '檔案類型',
      impOpts: '參數設定',
      impMode: '匯入模式',
      impConfirm: '匯入',
      impCancel: '取消'
    },
    export: {
      types: {
        csv: 'CSV (逗號分隔)(*.csv)',
        html: '網頁(*.html)',
        xml: 'XML 資料(*.xml)',
        txt: '文字檔(定位點分隔)(*.txt)',
        xls: 'Excel 97-2003 活頁簿(*.xls)',
        xlsx: 'Excel 活頁簿(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: '空資料',
        current: '目前資料（目前頁的資料）',
        selected: '選取資料（目前頁選取的資料）',
        all: '全量資料（包括所有分頁的資料）'
      },
      printTitle: '列印資料',
      expTitle: '匯出資料',
      expName: '檔案名稱',
      expNamePlaceholder: '請輸入檔案名稱',
      expSheetName: '標題',
      expSheetNamePlaceholder: '請輸入標題',
      expType: '儲存類型',
      expMode: '選擇資料',
      expCurrentColumn: '全部欄位',
      expColumn: '選擇欄位',
      widthMode: '欄寬設定',
      wModeTitle: '設定列印時欄寬的渲染方式',
      wdModes: {
        default: '預設',
        auto: '自適應（根據內容自適應欄寬）',
        scale: '等比例（根據頁面比例渲染欄寬）'
      },
      expOpts: '參數設定',
      expOptHeader: '表頭',
      expHeaderTitle: '是否需要表頭',
      expOptFooter: '表尾',
      expFooterTitle: '是否需要表尾',
      expOptColgroup: '分組表頭',
      expOptTitle: '欄標題',
      expTitleTitle: '是否為欄標題，否則顯示為欄的欄位名',
      expColgroupTitle: '如果存在，則支援帶有分組結構的表頭',
      expOptMerge: '合併',
      expMergeTitle: '如果存在，則支援帶有合併結構的儲存格',
      expOptAllExpand: '展開樹',
      expAllExpandTitle: '如果存在，則支援將帶有層級結構的資料全部展開',
      expOptTreeAllExpand: '展開樹',
      expTreeAllExpandTitle: '如果存在，則自動展開所有樹層級',
      expOptRowGroupAllExpand: '展開分組',
      expRowGroupAllExpandTitle: '如果存在，則自動展開所有分組層級',
      expOptUseStyle: '樣式',
      expUseStyleTitle: '如果存在，則支援帶樣式的儲存格',
      expOptOriginal: '來源資料',
      expOriginalTitle: '如果為來源資料，則支援匯入到表格中',
      expPrint: '列印',
      expConfirm: '匯出',
      expCancel: '取消'
    },
    modal: {
      errTitle: '錯誤提示',
      zoomMin: '最小化',
      zoomIn: '最大化',
      zoomOut: '還原',
      close: '關閉',
      miniMaxSize: '最小化視窗的數量不能超過 {0} 個',
      footPropErr: 'show-footer 僅用於啟用表尾，需配合 show-confirm-button | show-cancel-button | 插槽使用'
    },
    drawer: {
      close: '關閉'
    },
    form: {
      folding: '收合',
      unfolding: '展開'
    },
    toolbar: {
      import: '匯入',
      export: '匯出',
      print: '列印',
      refresh: '重新整理',
      zoomIn: '全螢幕',
      zoomOut: '還原',
      custom: '個人化設定',
      customAll: '全部',
      customConfirm: '確認',
      customRestore: '重設',
      fixedLeft: '凍結在左側',
      fixedRight: '凍結在右側',
      cancelFixed: '取消凍結欄'
    },
    iconPicker: {
      search: '搜尋',
      emptyText: '暫無資料'
    },
    datePicker: {
      yearTitle: '{0} 年'
    },
    dateRangePicker: {
      pleaseRange: '請選擇開始日期與結束日期'
    },
    input: {
      date: {
        m1: '01 月',
        m2: '02 月',
        m3: '03 月',
        m4: '04 月',
        m5: '05 月',
        m6: '06 月',
        m7: '07 月',
        m8: '08 月',
        m9: '09 月',
        m10: '10 月',
        m11: '11 月',
        m12: '12 月',
        quarterLabel: '{0} 年',
        monthLabel: '{0} 年',
        dayLabel: '{0} 年 {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy 年第 WW 週',
          month: 'yyyy-MM',
          quarter: 'yyyy 年第 q 季度',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: '週日',
          w1: '週一',
          w2: '週二',
          w3: '週三',
          w4: '週四',
          w5: '週五',
          w6: '週六'
        },
        months: {
          m0: '一月',
          m1: '二月',
          m2: '三月',
          m3: '四月',
          m4: '五月',
          m5: '六月',
          m6: '七月',
          m7: '八月',
          m8: '九月',
          m9: '十月',
          m10: '十一月',
          m11: '十二月'
        },
        quarters: {
          q1: '第一季',
          q2: '第二季',
          q3: '第三季',
          q4: '第四季'
        }
      }
    },
    calendar: {
      yearLabel: '{0} 年',
      monthLabel: '{0} 月'
    },
    cascader: {
      clearChecked: '清除',
      allChecked: '全選',
      total: '已選 {0} 項',
      close: '關閉',
      search: '搜尋'
    },
    numberInput: {
      currencySymbol: '¥'
    },
    imagePreview: {
      popupTitle: '預覽',
      operBtn: {
        zoomOut: '縮小',
        zoomIn: '放大',
        pctFull: '等比例縮放',
        pct11: '顯示原始尺寸',
        rotateLeft: '向左旋轉',
        rotateRight: '向右旋轉',
        print: '點擊列印圖片',
        download: '點擊下載圖片'
      }
    },
    upload: {
      fileBtnText: '點擊或拖曳上傳',
      imgBtnText: '點擊或拖曳上傳',
      dragPlaceholder: '請把檔案拖放到這個區域即可上傳',
      imgSizeHint: '單張{0}',
      imgCountHint: '最多{0}張',
      fileTypeHint: '支援 {0} 檔案類型',
      fileSizeHint: '單個檔案大小不超過{0}',
      fileCountHint: '最多可上傳{0}個檔案',
      uploadTypeErr: '檔案類型不匹配！',
      overCountErr: '最多只能選擇{0}個檔案！',
      overCountExtraErr: '已超出最大數量{0}個，超出的{1}個檔案將被忽略！',
      overSizeErr: '檔案大小最大不能超過{0}！',
      manualUpload: '點擊上傳',
      reUpload: '重新上傳',
      uploadProgress: '上傳中 {0}%',
      uploadErr: '上傳失敗',
      uploadSuccess: '上傳成功',
      moreBtnText: '更多（{0}）',
      moreImgBtnText: '圖片（{0}）',
      moreFileBtnText: '檔案（{0}）',
      viewItemTitle: '點擊查看',
      morePopup: {
        readTitle: '查看列表',
        imageTitle: '上傳圖片',
        fileTitle: '上傳檔案'
      }
    },
    empty: {
      defText: '暫無資料'
    },
    colorPicker: {
      clear: '清除',
      confirm: '確認',
      copySuccess: '已複製到剪貼簿：{0}',
      hex: '十六進位'
    },
    formDesign: {
      formName: '表單名稱',
      defFormTitle: '未命名的表單',
      widgetPropTab: '控制項屬性',
      widgetFormTab: '表單屬性',
      error: {
        wdFormUni: '該類型的控制項在表單中只允許新增一個',
        wdSubUni: '該類型的控制項在子表中只允許新增一個'
      },
      styleSetting: {
        btn: '樣式設定',
        title: '表單的樣式設定',
        layoutTitle: '控制項佈局',
        verticalLayout: '上下佈局',
        horizontalLayout: '橫向佈局',
        styleTitle: '標題樣式',
        boldTitle: '標題粗體',
        fontBold: '粗體',
        fontNormal: '一般',
        colonTitle: '顯示冒號',
        colonVisible: '顯示',
        colonHidden: '隱藏',
        alignTitle: '對齊方式',
        widthTitle: '標題寬度',
        alignLeft: '靠左',
        alignRight: '靠右',
        unitPx: '像素',
        unitPct: '百分比'
      },
      widget: {
        group: {
          base: '基礎控制項',
          layout: '佈局控制項',
          system: '系統控制項',
          module: '模組控制項',
          chart: '圖表控制項',
          advanced: '進階控制項'
        },
        copyTitle: '副本_{0}',
        component: {
          input: '輸入框',
          textarea: '文字區域',
          select: '下拉選擇',
          row: '一列多欄',
          title: '標題',
          text: '文字',
          subtable: '子表',
          VxeSwitch: '是/否',
          VxeInput: '輸入框',
          VxeNumberInput: '數字',
          VxeDatePicker: '日期',
          VxeTextarea: '文字區域',
          VxeSelect: '下拉選擇',
          VxeTreeSelect: '樹狀選擇',
          VxeRadioGroup: '單選框',
          VxeCheckboxGroup: '核取方塊',
          VxeUploadFile: '檔案',
          VxeUploadImage: '圖片',
          VxeRate: '評分',
          VxeSlider: '滑桿'
        },
        row: {
          placeholder: '控件位置'
        }
      },
      widgetProp: {
        name: '控制項名稱',
        placeholder: '提示文字',
        required: '必填驗證',
        multiple: '允許多選',
        displaySetting: {
          name: '顯示設定',
          pc: '電腦端',
          mobile: '手機端',
          visible: '顯示',
          hidden: '隱藏'
        },
        dataSource: {
          name: '資料來源',
          defValue: '選項{0}',
          addOption: '新增選項',
          batchEditOption: '批次編輯',
          batchEditTip: '每行對應一個選項，支援從表格、Excel、WPS 中直接複製貼上。',
          batchEditSubTip: '每行對應一個選項，如果是分組，子項可以是空格或定位鍵開頭，支援從表格、Excel、WPS 中直接複製貼上。',
          buildOption: '產生選項'
        },
        rowProp: {
          colSize: '欄數',
          col2: '兩欄',
          col3: '三欄',
          col4: '四欄',
          col6: '六欄',
          layout: '佈局'
        },
        textProp: {
          name: '內容',
          alignTitle: '對齊方式',
          alignLeft: '靠左',
          alignCenter: '置中',
          alignRight: '靠右',
          colorTitle: '字型顏色',
          sizeTitle: '字型大小',
          boldTitle: '字型粗體',
          fontNormal: '一般',
          fontBold: '粗體'
        },
        subtableProp: {
          seqTitle: '序號',
          showSeq: '顯示序號',
          showCheckbox: '允許多選',
          errSubDrag: '子表不支援該控制項，請使用其他控制項',
          colPlace: '將控制項拖曳進來'
        },
        uploadProp: {
          limitFileCount: '檔案數量限制',
          limitFileSize: '檔案大小限制',
          multiFile: '允許上傳多個檔案',
          limitImgCount: '圖片數量限制',
          limitImgSize: '圖片大小限制',
          multiImg: '允許上傳多張圖片'
        },
        rules: {
          required: '必填欄位'
        }
      }
    },
    listDesign: {
      fieldSettingTab: '欄位設定',
      listSettingTab: '參數設定',
      searchTitle: '查詢條件',
      listTitle: '列表欄位',
      searchField: '查詢欄位',
      listField: '列表欄位',
      activeBtn: {
        ActionButtonUpdate: '編輯',
        ActionButtonDelete: '刪除'
      },
      search: {
        addBtn: '編輯',
        emptyText: '未設定查詢條件',
        editPopupTitle: '編輯查詢欄位'
      },
      searchPopup: {
        colTitle: '標題',
        saveBtn: '儲存'
      }
    },
    text: {
      copySuccess: '已複製到剪貼簿',
      copyError: '目前環境不支援該操作'
    },
    countdown: {
      formats: {
        yyyy: '年',
        MM: '月',
        dd: '天',
        HH: '時',
        mm: '分',
        ss: '秒'
      }
    },
    contextMenu: {
      loadingText: '載入中...'
    },
    switch: {
      onText: '開啟',
      offText: '關閉'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}年',
        quarter: '{yyyy}年第{q}季度',
        month: '{yyyy}年{MM}月',
        week: '{yyyy}年第{W}週',
        day: '{yyyy}年{MM}月 {eLabel}',
        date: '{yyyy}年{MM}月{dd}日',
        hour: '{yyyy}年{MM}月{dd}日{HH}時',
        minute: '{yyyy}年{MM}月{dd}日{HH}時{mm}分',
        second: '{yyyy}年{MM}月{dd}日{HH}時{mm}分{ss}秒'
      },
      tSimpleFormat: {
        year: '{yyyy}年',
        quarter: '{q}季度',
        month: '{M}月',
        week: '{W}週',
        day: '{eLabel}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      stepFormat: {
        year: '{start.yyyy}~{end.yyyy}年',
        quarter: '{start.q}~{end.q}季度',
        month: '{start.M}~{end.M}月',
        week: '{start.W}~{end.W}週',
        day: '{eStartLabel}~{eEndLabel}',
        date: '{start.d}~{end.d}',
        hour: '{start.HH}~{end.HH}',
        minute: '{start.mm}~{end.mm}',
        second: '{start.ss}~{end.ss}'
      },
      dayss: {
        w0: '日',
        w1: '一',
        w2: '二',
        w3: '三',
        w4: '四',
        w5: '五',
        w6: '六'
      },
      days: {
        w0: '日',
        w1: '一',
        w2: '二',
        w3: '三',
        w4: '四',
        w5: '五',
        w6: '六'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '無法對合併儲存格進行該操作',
          multiErr: '無法對多重選取區域進行該操作',
          selectErr: '無法操作指定區域的儲存格',
          extendErr: '若要執行此操作，所有合併的儲存格需大小相同',
          pasteMultiErr: '無法貼上，需要相同大小的複製區域和貼上區域才能執行此操作',
          cpInvalidErr: '該操作無法進行，您選擇的區域中存在被禁止的欄（{0}）'
        },
        fnr: {
          title: '尋找和取代',
          titleFd: '尋找',
          titleRe: '取代',
          findLabel: '尋找',
          replaceLabel: '取代',
          findTitle: '尋找內容：',
          replaceTitle: '取代為：',
          tabs: {
            find: '尋找',
            replace: '取代'
          },
          filter: {
            re: '正規表達式',
            whole: '全詞匹配',
            sensitive: '區分大小寫'
          },
          btns: {
            findNext: '尋找下一個',
            findAll: '尋找全部',
            replace: '取代',
            replaceAll: '全部取代',
            cancel: '取消'
          },
          header: {
            seq: '#',
            cell: '儲存格',
            value: '值'
          },
          body: {
            row: '列：{0}',
            col: '欄：{0}'
          },
          empty: '(空值)',
          reError: '無效的正規表達式',
          recordCount: '已找到 {0} 個儲存格',
          notCell: '找不到匹配的儲存格',
          replaceSuccess: '成功取代 {0} 個儲存格'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: '分組',
          values: '值',
          groupPlaceholder: '拖曳至此處進行分組',
          valuesPlaceholder: '拖曳至此處進行彙總',
          dragExistCol: '該欄已存在',
          sortHelpTip: '點擊圖示開始拖曳'
        },
        aggFuncs: {
          sum: '求和',
          count: '計數',
          avg: '平均值',
          min: '最小值',
          max: '最大值',
          first: '首個值',
          last: '末尾值'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: '凍結欄',
          fixedGroup: '凍結分組',
          cancelFixed: '取消凍結',
          fixedLeft: '凍結左側',
          fixedRight: '凍結右側'
        },
        cases: {
          equal: '等於',
          gt: '大於',
          lt: '小於',
          begin: '開頭是',
          endin: '結尾是',
          include: '包含',
          isSensitive: '區分大小寫'
        }
      },
      filterCombination: {
        menus: {
          sort: '排序',
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '凍結欄',
          fixedGroup: '凍結分組',
          cancelFixed: '取消凍結',
          fixedLeft: '凍結左側',
          fixedRight: '凍結右側',
          clearFilter: '清除篩選',
          textOption: '文字篩選',
          numberOption: '數值篩選',
          dateOption: '日期篩選'
        },
        popup: {
          title: '自訂篩選的方式',
          currColumnTitle: '顯示列：',
          and: '與',
          or: '或',
          describeHtml: '可用 ? 代表單一字元<br/>用 * 代表任意多個字元'
        },
        cases: {
          equal: '等於',
          unequal: '不等於',
          gt: '大於',
          ge: '大於或等於',
          lt: '小於',
          le: '小於或等於',
          begin: '開頭是',
          notbegin: '開頭不是',
          endin: '結尾是',
          notendin: '結尾不是',
          include: '包含',
          exclude: '不包含',
          between: '介於',
          isAfter: '在以下日期之後',
          eqAfter: '在以下日期之後或與之相同',
          isBefore: '在以下日期之前',
          eqBefore: '在以下日期之前或與之相同',
          top10: '前10項',
          aboveAverage: '高於平均值',
          belowAverage: '低於平均值',
          before: '之前',
          after: '之後',
          tomorrow: '明天',
          today: '今天',
          yesterday: '昨天',
          nextWeek: '下週',
          thisWeek: '本週',
          lastWeek: '上週',
          nextMonth: '下月',
          thisMonth: '本月',
          lastMonth: '上月',
          nextYear: '明年',
          thisYear: '今年',
          lastYear: '去年',
          yearToDate: '本年度截至現在',
          custom: '自訂篩選',
          insensitive: '不區分大小寫',
          isSensitive: '區分大小寫'
        },
        empty: '(空白)',
        notData: '無匹配項'
      }
    },
    pro: {
      area: {
        mergeErr: '無法對合併儲存格進行該操作',
        multiErr: '無法對多重選取區域進行該操作',
        extendErr: '若要執行此操作，所有合併的儲存格需大小相同',
        pasteMultiErr: '無法貼上，需要相同大小的複製區域和貼上區域才能執行此操作'
      },
      fnr: {
        title: '尋找和取代',
        titleFd: '尋找',
        titleRe: '取代',
        findLabel: '尋找',
        replaceLabel: '取代',
        findTitle: '尋找內容：',
        replaceTitle: '取代為：',
        tabs: {
          find: '尋找',
          replace: '取代'
        },
        filter: {
          re: '正規表達式',
          whole: '全詞匹配',
          sensitive: '區分大小寫'
        },
        btns: {
          findNext: '尋找下一個',
          findAll: '尋找全部',
          replace: '取代',
          replaceAll: '全部取代',
          cancel: '取消'
        },
        header: {
          seq: '#',
          cell: '儲存格',
          value: '值'
        },
        empty: '(空值)',
        reError: '無效的正規表達式',
        recordCount: '已找到 {0} 個儲存格',
        notCell: '找不到匹配的儲存格',
        replaceSuccess: '成功取代 {0} 個儲存格'
      }
    },
    renderer: {
      search: '搜尋',
      cases: {
        equal: '等於',
        unequal: '不等於',
        gt: '大於',
        ge: '大於或等於',
        lt: '小於',
        le: '小於或等於',
        begin: '開頭是',
        notbegin: '開頭不是',
        endin: '結尾是',
        notendin: '結尾不是',
        include: '包含',
        exclude: '不包含',
        between: '介於',
        top10: '前10項',
        aboveAverage: '高於平均值',
        belowAverage: '低於平均值',
        custom: '自訂篩選',
        insensitive: '不區分大小寫',
        isSensitive: '區分大小寫'
      },
      combination: {
        menus: {
          sort: '排序',
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '凍結欄',
          fixedGroup: '凍結分組',
          cancelFixed: '取消凍結',
          fixedLeft: '凍結到左側',
          fixedRight: '凍結到右側',
          clearFilter: '清除篩選',
          textOption: '文字篩選',
          numberOption: '數值篩選',
          dateOption: '日期篩選'
        },
        popup: {
          title: '自訂篩選的方式',
          currColumnTitle: '顯示列：',
          and: '與',
          or: '或',
          describeHtml: '可用 ? 代表單一字元<br/>用 * 代表任意多個字元'
        },
        empty: '(空白)',
        notData: '無匹配項'
      }
    }
  }
}
