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
      groupFixed: '如果使用分組表頭，凍結列必須按組設置',
      groupMouseRange: '分組表頭與 "{0}" 不能同時使用，這可能會出現錯誤',
      groupTag: '分組列頭應該使用 "{0}" 而不是 "{1}"，這可能會出現錯誤',
      scrollErrProp: '啟用虛擬滾動後不支援此參數 "{0}"',
      errConflicts: '參數 "{0}" 與 "{1}" 有衝突',
      unableInsert: '無法插入指定位置，請檢查參數是否正確',
      useErr: '安裝 "{0}" 模組時發生錯誤，可能順序不正確，依賴的模組需要在 Table 之前安裝',
      barUnableLink: '工具列無法關聯表格',
      expandContent: '展開行的插槽應該是 "content"，請檢查是否正確',
      reqComp: '缺少 "{0}" 元件，請檢查是否已正確安裝。 https://vxeui.com/#/start/useGlobal',
      reqModule: '缺少 "{0}" 模組',
      reqProp: '缺少必要的 "{0}" 參數，這可能會導致錯誤',
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
      notProp: '不支援的參數 "{0}"',
      checkProp: '當資料量過大時可能會導致複選框卡頓，建議設定參數 "{0}" 提升渲染速度',
      coverProp: '"{0}" 的參數 "{1}" 重複定義，這可能會出現錯誤',
      uniField: '欄位名稱 "{0}" 重複定義，這可能會出現錯誤',
      repeatKey: '主键重复 {0}="{1}"，这可能会出现错误',
      delFunc: '方法 "{0}" 已廢棄，請使用 "{1}"',
      delProp: '參數 "{0}" 已廢棄，請使用 "{1}"',
      delEvent: '事件 "{0}" 已廢棄，請使用 "{1}"',
      removeProp: '參數 "{0}" 已廢棄，不建議使用，這可能會導致錯誤',
      errFormat: '全域的格式化內容應該使用 "VXETable.formats" 定義，掛載 "formatter={0}" 的方式已不建議使用',
      notType: '不支援的文件類型 "{0}"',
      notExp: '該瀏覽器不支援匯入/匯出功能',
      impFields: '匯入失敗，請檢查欄位名稱和資料格式是否正確',
      treeNotImp: '樹表格不支援導入',
      treeCrossDrag: '只能拖拽第一层级的数据',
      treeDragChild: '父级数据不能拖拽到自己的子级中',
      reqPlugin: '可選擴展插件 "{1}" https://vxeui.com/other{0}/#/{1}/install'
    },
    table: {
      emptyText: '暫無數據',
      allTitle: '全選/取消',
      seqTitle: '序號',
      actionTitle: '操作',
      confirmFilter: '篩選',
      resetFilter: '重置',
      allFilter: '全部',
      sortAsc: '升序：最低到最高',
      sortDesc: '降序：最高到最低',
      filter: '對所選的列啟用篩選',
      impSuccess: '成功導入 {0} 筆記錄',
      expLoading: '正在匯出中',
      expSuccess: '匯出成功',
      expError: '导出失败',
      expFilename: '導出_{0}',
      expOriginFilename: '匯出_來源_{0}',
      customTitle: '列設定',
      customAll: '全部',
      customConfirm: '確認',
      customClose: '關閉',
      customCancel: '取消',
      customRestore: '恢復預設',
      maxFixedCol: '最大凍結列的數量不能超過 {0} 個',
      dragTip: '移動：{0}'
    },
    grid: {
      selectOneRecord: '請至少選擇一筆記錄！',
      deleteSelectRecord: '您確定要刪除所選記錄嗎？',
      removeSelectRecord: '您確定要移除所選記錄嗎？',
      dataUnchanged: '數據未改動！',
      delSuccess: '成功刪除所選記錄！',
      saveSuccess: '保存成功！',
      operError: '發生錯誤，操作失敗！'
    },
    select: {
      search: '搜尋',
      loadingText: '載入中',
      emptyText: '暫無數據'
    },
    pager: {
      goto: '前往',
      gotoTitle: '頁數',
      pagesize: '{0}條/頁',
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
      cancel: '取消'
    },
    filter: {
      search: '搜尋'
    },
    custom: {
      cstmTitle: '列設定',
      cstmRestore: '恢復預設',
      cstmCancel: '取消',
      cstmConfirm: '確定',
      cstmConfirmRestore: '請確認是否恢復成預設列配置？',
      cstmDragTarget: '移動：{0}',
      setting: {
        colSort: '排序',
        sortHelpTip: '點擊並拖曳圖示可以調整列的排序',
        colTitle: '標題',
        colResizable: '列寬（像素）',
        colVisible: '是否顯示',
        colFixed: '凍結列',
        colFixedMax: '凍結列（最多 {0} 列）',
        fixedLeft: '左側',
        fixedUnset: '不設定',
        fixedRight: '右側'
      }
    },
    import: {
      modes: {
        covering: '覆蓋方式（直接覆蓋表格資料）',
        insert: '底部追加（在表格的底部追加新資料）',
        insertTop: '頂部追加（在表格的頂部追加新資料）',
        insertBottom: '底部追加（在表格的底部追加新資料）'
      },
      impTitle: '導入數據',
      impFile: '檔案名稱',
      impSelect: '選擇文件',
      impType: '文件類型',
      impOpts: '參數設定',
      impMode: '導入模式',
      impConfirm: '導入',
      impCancel: '取消'
    },
    export: {
      types: {
        csv: 'CSV (逗號分隔)(*.csv)',
        html: '網頁(*.html)',
        xml: 'XML 資料(*.xml)',
        txt: '文字檔案(製表符分隔)(*.txt)',
        xls: 'Excel 97-2003 工作簿(*.xls)',
        xlsx: 'Excel 工作簿(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: '目前數據（當前頁的數據）',
        selected: '選取資料（目前頁選取的資料）',
        all: '全量資料（包括所有分頁的資料）'
      },
      printTitle: '列印數據',
      expTitle: '匯出數據',
      expName: '檔案名稱',
      expNamePlaceholder: '請輸入檔案名稱',
      expSheetName: '標題',
      expSheetNamePlaceholder: '請輸入標題',
      expType: '保存類型',
      expMode: '選擇數據',
      expCurrentColumn: '全部字段',
      expColumn: '選擇字段',
      expOpts: '參數設定',
      expOptHeader: '表頭',
      expHeaderTitle: '是否需要表頭',
      expOptFooter: '表尾',
      expFooterTitle: '是否需要表尾',
      expOptColgroup: '分組表頭',
      expColgroupTitle: '如果存在，則支援帶有分組結構的表頭',
      expOptMerge: '合併',
      expMergeTitle: '如果存在，則支援帶有合併結構的儲存格',
      expOptAllExpand: '展開層級',
      expAllExpandTitle: '如果存在，則支援將帶有層級結構的資料全部展開',
      expOptUseStyle: '樣式',
      expUseStyleTitle: '如果存在，則支援帶有樣式的儲存格',
      expOptOriginal: '來源資料',
      expOriginalTitle: '如果為來源數據，則支援匯入到表格中',
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
      footPropErr: 'show-footer 仅用于启用表尾，需配合 show-confirm-button | show-cancel-button | 插槽使用'
    },
    drawer: {
      close: '關閉'
    },
    form: {
      folding: '收起',
      unfolding: '展開'
    },
    toolbar: {
      import: '導入',
      export: '匯出',
      print: '列印',
      refresh: '重新整理',
      zoomIn: '全螢幕',
      zoomOut: '還原',
      custom: '列設定',
      customAll: '全部',
      customConfirm: '確認',
      customRestore: '重置',
      fixedLeft: '凍結在左側',
      fixedRight: '凍結在右側',
      cancelFixed: '取消凍結列'
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
          week: 'yyyy 年 WW 週',
          month: 'yyyy-MM',
          quarter: 'yyyy 年第 q 季度',
          year: 'yyyy'
        },
        weeks: {
          w: '週',
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
      fileTypeHint: '支援 {0} 文件類型',
      fileSizeHint: '單一檔案大小不超過{0}',
      fileCountHint: '最多可上傳{0}個文件',
      uploadTypeErr: '文件类型不匹配！',
      overCountErr: '最多只能選擇{0}個檔案！',
      overCountExtraErr: '已超出最大數量{0}個，超出的{1}個檔案將被忽略！',
      overSizeErr: '檔案大小最大不能超過{0}！',
      reUpload: '重新上傳',
      uploadProgress: '上傳中 {0}%',
      uploadErr: '上傳失敗',
      uploadSuccess: '上傳成功',
      moreBtnText: '更多（{0}）',
      viewItemTitle: '點擊查看',
      morePopup: {
        readTitle: '查看列表',
        imageTitle: '上傳圖片',
        fileTitle: '上傳文件'
      }
    },
    empty: {
      defText: '暂无数据'
    },
    formDesign: {
      formName: '表單名稱',
      defFormTitle: '未命名的表單',
      widgetPropTab: '控制項屬性',
      widgetFormTab: '表單屬性',
      error: {
        wdFormUni: '此類型的控制項在表單中只允許新增一個',
        wdSubUni: '此類型的控制項在子表中只允許新增一個'
      },
      styleSetting: {
        btn: '樣式設定',
        title: '表單的樣式設定',
        layoutTitle: '控制佈局',
        verticalLayout: '上下佈局',
        horizontalLayout: '橫向佈局',
        styleTitle: '標題樣式',
        boldTitle: '標題加粗',
        fontBold: '加粗',
        fontNormal: '常規',
        colonTitle: '顯示冒號',
        colonVisible: '顯示',
        colonHidden: '隱藏',
        alignTitle: '對齊方式',
        widthTitle: '標題寬度',
        alignLeft: '居左',
        alignRight: '居右',
        unitPx: '像素',
        unitPct: '百分比'
      },
      widget: {
        group: {
          base: '基礎控件',
          layout: '佈局控制項',
          system: '系統控制項',
          module: '模組控件',
          chart: '圖表控件',
          advanced: '進階控制'
        },
        copyTitle: '副本_{0}',
        component: {
          input: '輸入框',
          textarea: '文字域',
          select: '下拉選擇',
          row: '一行多列',
          title: '標題',
          text: '文字',
          subtable: '子表',
          VxeSwitch: '是/否',
          VxeInput: '輸入框',
          VxeNumberInput: '數位',
          VxeDatePicker: '日期',
          VxeTextarea: '文字域',
          VxeSelect: '下拉選擇',
          VxeTreeSelect: '樹形選擇',
          VxeRadioGroup: '單選框',
          VxeCheckboxGroup: '複選框',
          VxeUploadFile: '文件',
          VxeUploadImage: '圖片',
          VxeRate: '评分',
          VxeSlider: '滑块'
        }
      },
      widgetProp: {
        name: '控制項名稱',
        placeholder: '提示語',
        required: '必填校驗',
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
          batchEditTip: '每行對應一個選項，支援從表格、Excel、WPS 直接複製貼上。',
          batchEditSubTip: '每行對應一個選項，如果是分組，子項可以是空格或製表鍵開頭，支援從表格、Excel、WPS 直接複製貼上。',
          buildOption: '生成選項'
        },
        rowProp: {
          colSize: '列數',
          col2: '兩列',
          col3: '三列',
          col4: '四列',
          col6: '六列',
          layout: '佈局'
        },
        textProp: {
          name: '內容',
          alignTitle: '對齊方式',
          alignLeft: '居左',
          alignCenter: '居中',
          alignRight: '居右',
          colorTitle: '字體顏色',
          sizeTitle: '字體大小',
          boldTitle: '字體加粗',
          fontNormal: '常規',
          fontBold: '加粗'
        },
        subtableProp: {
          seqTitle: '序號',
          showSeq: '顯示序號',
          showCheckbox: '允許多選',
          errSubDrag: '子表不支援該控件，請使用其他控件',
          colPlace: '將控件拖曳進來'
        },
        uploadProp: {
          limitFileCount: '文件數量限制',
          limitFileSize: '檔案大小限制',
          multiFile: '允許上傳多個文件',
          limitImgCount: '圖片數量限制',
          limitImgSize: '圖片大小限制',
          multiImg: '允許上傳多張圖片'
        }
      }
    },
    listDesign: {
      fieldSettingTab: '字段設定',
      listSettingTab: '參數設定',
      searchTitle: '查詢條件',
      listTitle: '列表字段',
      searchField: '查詢字段',
      listField: '列表字段',
      activeBtn: {
        ActionButtonUpdate: '編輯',
        ActionButtonDelete: '刪除'
      },
      search: {
        addBtn: '編輯',
        emptyText: '未配置查詢條件',
        editPopupTitle: '編輯查詢字段'
      },
      searchPopup: {
        colTitle: '標題',
        saveBtn: '儲存'
      }
    },
    text: {
      copySuccess: '已複製到剪貼簿',
      copyError: '當前環境不支援該操作'
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
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '無法對合併儲存格進行該操作',
          multiErr: '無法對多重選擇區域進行此操作',
          selectErr: '无法操作指定区域的单元格',
          extendErr: '若延伸的區域包含被合併的儲存格，所有合併的儲存格需大小相同',
          pasteMultiErr: '無法貼上，需要相同大小的複製的區域和貼上的區域才能執行此操作',
          cpInvalidErr: '此操作無法進行，您選擇的區域中存在被禁止的列（{0}）'
        },
        fnr: {
          title: '尋找和替換',
          findLabel: '尋找',
          replaceLabel: '替換',
          findTitle: '尋找內容：',
          replaceTitle: '替換為：',
          tabs: {
            find: '尋找',
            replace: '替換'
          },
          filter: {
            re: '正規表示式',
            whole: '全詞匹配',
            sensitive: '區分大小寫'
          },
          btns: {
            findNext: '尋找下一個',
            findAll: '找全部',
            replace: '替換',
            replaceAll: '替換全部',
            cancel: '取消'
          },
          header: {
            seq: '#',
            cell: '單元格',
            value: '值'
          },
          empty: '(空值)',
          reError: '無效的正規表示式',
          recordCount: '已找到 {0} 個單元格',
          notCell: '找不到匹配的單元格',
          replaceSuccess: '成功替換 {0} 個單元格'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: '凍結列',
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
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '凍結列',
          fixedGroup: '凍結分組',
          cancelFixed: '取消凍結',
          fixedLeft: '凍結左側',
          fixedRight: '凍結右側',
          clearFilter: '清除篩選',
          textOption: '文字篩選',
          numberOption: '數值篩選'
        },
        popup: {
          title: '自訂篩選的方式',
          currColumnTitle: '目前列：',
          and: '與',
          or: '或',
          describeHtml: '可用 ? 代表單一字元<br/>用 * 代表任意多個字符'
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
        multiErr: '無法對多重選擇區域進行此操作',
        extendErr: '若延伸的區域包含被合併的儲存格，所有合併的儲存格需大小相同',
        pasteMultiErr: '無法貼上，需要相同大小的複製的區域和貼上的區域才能執行此操作'
      },
      fnr: {
        title: '尋找和替換',
        findLabel: '尋找',
        replaceLabel: '替換',
        findTitle: '尋找內容：',
        replaceTitle: '替換為：',
        tabs: {
          find: '尋找',
          replace: '替換'
        },
        filter: {
          re: '正規表示式',
          whole: '全詞匹配',
          sensitive: '區分大小寫'
        },
        btns: {
          findNext: '尋找下一個',
          findAll: '找全部',
          replace: '替換',
          replaceAll: '替換全部',
          cancel: '取消'
        },
        header: {
          seq: '#',
          cell: '單元格',
          value: '值'
        },
        empty: '(空值)',
        reError: '無效的正規表示式',
        recordCount: '已找到 {0} 個單元格',
        notCell: '找不到匹配的單元格',
        replaceSuccess: '成功替換 {0} 個單元格'
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
        custom: '自訂篩選',
        insensitive: '不區分大小寫',
        isSensitive: '區分大小寫'
      },
      combination: {
        menus: {
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '冻结列',
          fixedGroup: '冻结分组',
          cancelFixed: '取消冻结',
          fixedLeft: '冻结到左侧',
          fixedRight: '冻结到右侧',
          clearFilter: '清除篩選',
          textOption: '文字篩選',
          numberOption: '數值篩選'
        },
        popup: {
          title: '自訂篩選的方式',
          currColumnTitle: '目前列：',
          and: '與',
          or: '或',
          describeHtml: '可用 ? 代表單一字元<br/>用 * 代表任意多個字符'
        },
        empty: '(空白)',
        notData: '無匹配項'
      }
    }
  }
}
