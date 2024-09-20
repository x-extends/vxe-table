export default {
  vxe: {
    base: {
      pleaseInput: '请输入',
      pleaseSelect: '请选择',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: '加載中...'
    },
    error: {
      downErr: '下载失败',
      groupFixed: '如果使用分組表頭，固冻结列必須按組設定',
      groupMouseRange: '分组表頭與 "{0}" 不能同時使用，這可能會出現錯誤',
      groupTag: '分組列頭應該使用 "{0}" 而不是 "{1}"，這可能會出現錯誤',
      scrollErrProp: '啟用虛擬滾動後不支持該參數 "{0}"',
      errConflicts: '參數 "{0}" 與 "{1}" 有衝突',
      unableInsert: '無法插入到指定位置，請檢查參數是否正確',
      useErr: '安裝 "{0}" 模組時發生錯誤，可能順序不正確，依賴的模組需要在Table之前安裝',
      barUnableLink: '工具欄無法關聯表格',
      expandContent: '展開行的插槽應該是 “content”，請檢查是否正確',
      reqComp: '缺少 "{0}" 組件，请检查是否正确安装。 https://vxeui.com/#/start/useGlobal',
      reqModule: '缺少 "{0}" 模組',
      reqProp: '缺少必要的 "{0}" 參數，可能會導致出現錯誤',
      emptyProp: '參數 "{0}" 不允許為空',
      errProp: '不支持的參數 "{0}"，可能為 "{1}"',
      colRepet: 'column.{0}="{1}" 重複了，這可能會導致某些功能無法使用',
      notFunc: '方法 "{0}" 不存在',
      errFunc: '參數 "{0}" 不是一個方法',
      notValidators: '全局校验 "{0}" 不存在',
      notFormats: '全局格式化 "{0}" 不存在',
      notCommands: '全局指令 "{0}" 不存在',
      notSlot: '插槽 "{0}" 不存在',
      noTree: '樹狀結構不支援 {0}',
      notProp: '不支持的參數 "{0}"',
      checkProp: '當數據量過大時可能會導致複選框卡頓，建議設置參數 "{0}" 提升渲染速度',
      coverProp: '"{0}" 的參數 "{1}" 重複定義，這可能會出現錯誤',
      uniField: '字段名 "{0}" 重複定義，這可能會出現錯誤',
      delFunc: '方法 "{0}" 已停用，請使用 "{1}"',
      delProp: '參數 "{0}" 已停用，請使用 "{1}"',
      delEvent: '事件 "{0}" 已停用，請使用 "{1}"',
      removeProp: '參數 "{0}" 已停用，不建議使用，這可能會導致出現錯誤',
      errFormat: '全域的格式化內容應該使用 "VXETable.formats" 定義，掛載 "formatter={0}" 的管道已不建議使用',
      notType: '不支持的檔案類型 "{0}"',
      notExp: '該瀏覽器不支持導入/匯出功能',
      impFields: '導入失敗，請檢查欄位名和數據格式是否正確',
      treeNotImp: '樹狀表格不支持導入'
    },
    table: {
      emptyText: '暫無資料',
      allTitle: '全選/取消',
      seqTitle: '序号',
      actionTitle: '操作',
      confirmFilter: '篩選',
      resetFilter: '重置',
      allFilter: '全部',
      sortAsc: '按低到高排序',
      sortDesc: '按高到低排序',
      filter: '對所選的列啟用篩選',
      impSuccess: '成功導入 {0} 條記錄',
      expLoading: '正在匯出中',
      expSuccess: '匯出成功',
      expOriginFilename: '匯出_{0}',
      expSrcFilename: '匯出_從_{0}',
      customTitle: '列設定',
      customAll: '全部',
      customConfirm: '确认',
      customClose: '关闭',
      customCancel: '取消',
      customRestore: '恢复默认',
      maxFixedCol: '最大冻结列的數量不能超過 {0} 個'
    },
    grid: {
      selectOneRecord: '請至少選擇一條記錄！',
      deleteSelectRecord: '您確定要刪除所選記錄嗎？',
      removeSelectRecord: '您確定要移除所選記錄嗎？',
      dataUnchanged: '資料未更改！ ',
      delSuccess: '成功删除所選記錄！',
      saveSuccess: '保存成功！',
      operError: '發生錯誤，操作失敗！'
    },
    select: {
      search: '蒐索',
      loadingText: '加載中',
      emptyText: '暫無資料'
    },
    pager: {
      goto: '前往',
      gotoTitle: '页数',
      pagesize: '{0}項/頁',
      total: '共 {0} 項記錄',
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
      search: '搜索'
    },
    custom: {
      cstmTitle: '列設定',
      cstmRestore: '恢復默認',
      cstmCancel: '取消',
      cstmConfirm: '確認',
      cstmConfirmRestore: '請確認是否恢復成默認列配置？',
      cstmDragTarget: '移動目標：{0}',
      setting: {
        colSort: '排序',
        sortHelpTip: '點擊並拖動圖標可以調整列的排序',
        colTitle: '標題',
        colResizable: '列宽（像素）',
        colVisible: '是否顯示',
        colFixed: '冻结列',
        colFixedMax: '冻结列（最多 {0} 列）',
        fixedLeft: '左側',
        fixedUnset: '不設定',
        fixedRight: '右側'
      }
    },
    import: {
      modes: {
        covering: '覆盖方式（直接覆盖表格数据）',
        insert: '底部追加（在表格的底部追加新数据）',
        insertTop: '顶部追加（在表格的顶部追加新数据）',
        insertBottom: '底部追加（在表格的底部追加新数据）'
      },
      impTitle: '導入數據',
      impFile: '檔名',
      impSelect: '選擇檔案',
      impType: '檔案類型',
      impOpts: '參數設置',
      impMode: '導入模式',
      impConfirm: '導入',
      impCancel: '取消'
    },
    export: {
      types: {
        csv: 'CSV (逗号分隔)(*.csv)',
        html: '網頁(*.html)',
        xml: 'XML 文件(*.xml)',
        txt: '文本文件(制表符分隔)(*.txt)',
        xls: 'Excel 97-2003 工作簿(*.xls)',
        xlsx: 'Excel 工作簿(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: '當前數據（當前頁的數據）',
        selected: '選中數據（當前頁選中的數據）',
        all: '全量數據（包括所有分頁的數據）'
      },
      printTitle: '列印數據',
      expTitle: '匯出數據',
      expName: '檔名',
      expNamePlaceholder: '請輸入檔名',
      expSheetName: '標題',
      expSheetNamePlaceholder: '請輸入標題',
      expType: '保存類型',
      expMode: '選擇數據',
      expCurrentColumn: '全部欄位',
      expColumn: '選擇欄位',
      expOpts: '參數設置',
      expOptHeader: '表頭',
      expHeaderTitle: '是否需要表頭',
      expOptFooter: '表尾',
      expFooterTitle: '是否需要表尾',
      expOptColgroup: '分组表头',
      expColgroupTitle: '如果存在，則支持帶有分組結構的表頭',
      expOptMerge: '合併',
      expMergeTitle: '如果存在，則支持帶有合併結構的儲存格',
      expOptAllExpand: '展開層級',
      expAllExpandTitle: '如果存在，則支持將帶有樹結構的數據全部展開',
      expOptUseStyle: '樣式',
      expUseStyleTitle: '如果存在，則支持帶樣式的儲存格',
      expOptOriginal: '源數據',
      expOriginalTitle: '如果為源數據，則支持導入到表格中',
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
      miniMaxSize: '最小化窗口的數量不能超過 {0} 個'
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
      refresh: '刷新',
      zoomIn: '全螢幕',
      zoomOut: '還原',
      custom: '列設定',
      customAll: '全部',
      fixedLeft: '冻结在左側',
      fixedRight: '冻结在右側',
      cancelFixed: '取消冻结列'
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
          week: 'yyyy 年第 WW 周',
          month: 'yyyy-MM',
          quarter: 'yyyy 年第 q 季度',
          year: 'yyyy'
        },
        weeks: {
          w: '周',
          w0: '周日',
          w1: '周一',
          w2: '周二',
          w3: '周三',
          w4: '周四',
          w5: '周五',
          w6: '周六'
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
          q1: '第一季度',
          q2: '第二季度',
          q3: '第三季度',
          q4: '第四季度'
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
        print: '點擊打印圖片',
        download: '點擊下載圖片'
      }
    },
    upload: {
      fileBtnText: '點擊或拖拽上傳',
      imgBtnText: '點擊或拖拽上傳',
      dragPlaceholder: '請把文件拖放到這個區域即可上傳',
      imgSizeHint: '單張{0}',
      imgCountHint: '最多{0}張',
      fileTypeHint: '支持 {0} 文件類型',
      fileSizeHint: '單個文件大小不超過{0}',
      fileCountHint: '最多可上傳{0}个文件',
      overCountErr: '最多隻能選擇{0}个文件！',
      overCountExtraErr: '已超出最大數量{0}個，超出的{1}個文件將被忽略！',
      overSizeErr: '文件大小最大不能超過{0}！',
      reUpload: '重新上傳',
      uploadProgress: '上傳中 {0}%',
      uploadErr: '上傳失敗',
      uploadSuccess: '上傳成功',
      moreBtnText: '更多（{0}）',
      viewItemTitle: '點擊查看',
      morePopup: {
        readTitle: '查看列表',
        imageTitle: '上传图片',
        fileTitle: '上传文件'
      }
    },
    formDesign: {
      formName: '表單名稱',
      defFormTitle: '未命名的表單',
      widgetPropTab: '控件屬性',
      widgetFormTab: '表單屬性',
      error: {
        wdFormUni: '該類型的控件在表單中只允許添加一個',
        wdSubUni: '該類型的控件在子表中只允許添加一個'
      },
      styleSetting: {
        btn: '樣式設置',
        title: '表單的樣式設置',
        layoutTitle: '控件佈局',
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
          layout: '佈局控件',
          system: '系統控件',
          module: '模塊控件',
          chart: '圖表控件',
          advanced: '高級控件'
        },
        copyTitle: '副本_{0}',
        component: {
          input: '輸入框',
          textarea: '文本域',
          select: '下拉選擇',
          row: '一行多列',
          title: '標題',
          text: '文本',
          subtable: '子表',
          VxeSwitch: '是/否',
          VxeInput: '輸入框',
          VxeNumberInput: '數字',
          VxeDatePicker: '日期',
          VxeTextarea: '文本域',
          VxeSelect: '下拉選擇',
          VxeTreeSelect: '樹形選擇',
          VxeRadioGroup: '單選框',
          VxeCheckboxGroup: '複選框',
          VxeUploadFile: '文件',
          VxeUploadImage: '圖片'
        }
      },
      widgetProp: {
        name: '控件名稱',
        placeholder: '控件提示',
        required: '必填校驗',
        multiple: '允許多選',
        displaySetting: {
          name: '顯示設置',
          pc: '電腦端',
          mobile: '手機端',
          visible: '顯示',
          hidden: '隱藏'
        },
        dataSource: {
          name: '數據源',
          defValue: '選項{0}',
          addOption: '添加選項',
          batchEditOption: '批量編輯',
          batchEditTip: '每行對應一個選項，支持從表格、Excel、WPS 中直接複製粘貼。',
          batchEditSubTip: '每行對應一個選項，如果是分組，子項可以是空格或製表鍵開頭，支持從表格、Excel、WPS 中直接複製粘貼。',
          buildOption: '生成選項'
        },
        rowProp: {
          colSize: '列數',
          col2: '两列',
          col3: '三列',
          col4: '四列',
          col6: '六列',
          layout: '佈局'
        },
        textProp: {
          name: '内容',
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
          errSubDrag: '子表不支持該控件，請使用其他控件',
          colPlace: '将控件拖拽进来'
        },
        uploadProp: {
          uploadProp: {
            limitFileCount: '文件數量限制',
            limitFileSize: '文件大小限制',
            multiFile: '允許上傳多個文件',
            limitImgCount: '圖片數量限制',
            limitImgSize: '圖片大小限制',
            multiImg: '允許上傳多張圖片'
          }
        }
      }
    },
    listDesign: {
      fieldSettingTab: '字段設置',
      listSettingTab: '参数设置',
      searchTitle: '查询条件',
      listTitle: '列表字段',
      searchField: '查询字段',
      listField: '列表字段',
      activeBtn: {
        ActionButtonUpdate: '編輯',
        ActionButtonDelete: '刪除'
      },
      search: {
        addBtn: '编辑',
        emptyText: '未配置查询条件',
        editPopupTitle: '编辑查询字段'
      },
      searchPopup: {
        colTitle: '标题',
        saveBtn: '保存'
      }
    },
    text: {
      copySuccess: '已複製到剪貼板',
      copyError: '當前環境不支持該操作'
    },
    countdown: {
      formats: {
        yyyy: '年',
        MM: '月',
        dd: '天',
        HH: '时',
        mm: '分',
        ss: '秒'
      }
    },

    /**
     * 扩展插件
     */
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '無法對合併儲存格進行該操作',
          multiErr: '無法對多重選擇區域進行該操作',
          extendErr: '如果延伸的區域包含被合併的儲存格，所有合併的儲存格需大小相同',
          pasteMultiErr: '无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作',
          cpInvalidErr: '該操作無法進行，您選擇的區域中存在被禁止的列（{0}）'
        },
        fnr: {
          title: '查找和替換',
          findLabel: '查找',
          replaceLabel: '替換',
          findTitle: '查找內容：',
          replaceTitle: '替換為：',
          tabs: {
            find: '查找',
            replace: '替換'
          },
          filter: {
            re: '規則運算式',
            whole: '全詞匹配',
            sensitive: '區分大小寫'
          },
          btns: {
            findNext: '查找下一個',
            findAll: '查找全部',
            replace: '替换',
            replaceAll: '替换全部',
            cancel: '取消'
          },
          header: {
            seq: '#',
            cell: '儲存格',
            value: '值'
          },
          empty: '(空值)',
          reError: '無效的規則運算式',
          recordCount: '已找到 {0} 個儲存格',
          notCell: '找不到匹配的儲存格',
          replaceSuccess: '成功替換 {0} 個儲存格'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: '凍結列',
          fixedGroup: '凍結分组',
          cancelFixed: '取消凍結',
          fixedLeft: '凍結左侧',
          fixedRight: '凍結右侧'
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
          sortAsc: '昇冪',
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
          title: '自定義篩選的管道',
          currColumnTitle: '當前列：',
          and: '與',
          or: '或',
          describeHtml: '用 ? 代表單個字元<br/>用 * 代表任意多個字元'
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
          custom: '自定義篩選',
          insensitive: '不區分大小寫',
          isSensitive: '區分大小寫'
        },
        empty: '(空白)',
        notData: '無匹配項'
      }
    },

    /**
     * 以下废弃
     * @deprecated
     */
    renderer: {
      search: '蒐索',
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
        custom: '自定義篩選',
        insensitive: '不區分大小寫',
        isSensitive: '區分大小寫'
      },
      combination: {
        menus: {
          clearSort: '清除排序',
          sortAsc: '昇冪',
          sortDesc: '降序',
          fixedColumn: '鎖定列',
          fixedGroup: '鎖定組',
          cancelFixed: '取消鎖定',
          fixedLeft: '鎖定左側',
          fixedRight: '鎖定右側',
          clearFilter: '清除篩選',
          textOption: '文字篩選',
          numberOption: '數值篩選'
        },
        popup: {
          title: '自定義篩選的管道',
          currColumnTitle: '當前列：',
          and: '與',
          or: '或',
          describeHtml: '用 ? 代表單個字元<br/>用 * 代表任意多個字元'
        },
        empty: '(空白)',
        notData: '無匹配項'
      }
    },
    pro: {
      area: {
        mergeErr: '無法對合併儲存格進行該操作',
        multiErr: '無法對多重選擇區域進行該操作',
        extendErr: '如果延伸的區域包含被合併的儲存格，所有合併的儲存格需大小相同',
        pasteMultiErr: '无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作'
      },
      fnr: {
        title: '查找和替換',
        findLabel: '查找',
        replaceLabel: '替換',
        findTitle: '查找內容：',
        replaceTitle: '替換為：',
        tabs: {
          find: '查找',
          replace: '替換'
        },
        filter: {
          re: '規則運算式',
          whole: '全詞匹配',
          sensitive: '區分大小寫'
        },
        btns: {
          findNext: '查找下一個',
          findAll: '查找全部',
          replace: '替换',
          replaceAll: '替换全部',
          cancel: '取消'
        },
        header: {
          seq: '#',
          cell: '儲存格',
          value: '值'
        },
        empty: '(空值)',
        reError: '無效的規則運算式',
        recordCount: '已找到 {0} 個儲存格',
        notCell: '找不到匹配的儲存格',
        replaceSuccess: '成功替換 {0} 個儲存格'
      }
    }
  }
}
