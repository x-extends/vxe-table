export default {
  vxe: {
    error: {
      groupFixed: '如果使用分組表頭，固定列必須按組設定',
      groupMouseRange: '分组表頭與 "{0}" 不能同時使用，這可能會出現錯誤',
      groupTag: '分組列頭應該使用 "{0}" 而不是 "{1}"，這可能會出現錯誤',
      scrollErrProp: '啟用虛擬滾動後不支持該參數 "{0}"',
      scrollXNotGroup: '橫向虛擬滾動不支持分組表頭，需要設定 "scroll-x.enabled=false" 參數，否則可能會導致出現錯誤',
      errConflicts: '參數 "{0}" 與 "{1}" 有衝突',
      unableInsert: '無法插入到指定位置，請檢查參數是否正確',
      useErr: '安裝 "{0}" 模組時發生錯誤，可能順序不正確，依賴的模組需要在Table之前安裝',
      barUnableLink: '工具欄無法關聯表格',
      expandContent: '展開行的插槽應該是 “content”，請檢查是否正確',
      reqModule: '缺少 "{0}" 模組',
      reqProp: '缺少必要的 "{0}" 參數，可能會導致出現錯誤',
      emptyProp: '參數 "{0}" 不允許為空',
      errProp: '不支持的參數 "{0}"，可能為 "{1}"',
      colRepet: 'column.{0}="{1}" 重複了，這可能會導致某些功能無法使用',
      notFunc: '方法 "{0}" 不存在',
      notSlot: '插槽 "{0}" 不存在',
      noTree: '樹狀結構不支援 {0}',
      notProp: '不支持的參數 "{0}"',
      coverProp: '"{0}" 的參數 "{1}" 被覆蓋，這可能會出現錯誤',
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
        extendErr: '如果延伸的區域包含被合併的儲存格，所有合併的儲存格需大小相同'
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
    table: {
      emptyText: '暫無資料',
      allTitle: '全選/取消',
      seqTitle: '#',
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
      customConfirm: '確認',
      customRestore: '還原'
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
      emptyText: '暫無資料'
    },
    pager: {
      goto: '前往',
      pagesize: '{0}項/頁',
      total: '共 {0} 項記錄',
      pageClassifier: '頁',
      prevPage: '上一頁',
      nextPage: '下一頁',
      prevJump: '向上跳頁',
      nextJump: '向下跳頁'
    },
    alert: {
      title: '訊息提示'
    },
    button: {
      confirm: '確認',
      cancel: '取消'
    },
    import: {
      modes: {
        covering: '覆盖',
        insert: '新增'
      },
      impTitle: '導入數據',
      impFile: '檔名',
      impSelect: '選擇檔案',
      impType: '檔案類型',
      impOpts: '參數設置',
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
      zoomIn: '最大化',
      zoomOut: '還原',
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
      customConfirm: '確認',
      customRestore: '還原'
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
    }
  }
}
