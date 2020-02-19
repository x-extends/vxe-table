"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  vxe: {
    error: {
      groupFixed: '如果使用分组表頭，固定列必须在左右兩側',
      groupMouseRange: '分组表頭与 "{{0}}" 不能同時使用，这可能會出現錯誤',
      cellEditRender: '渲染器 "cell-render" 和 "edit-render" 不能同時使用',
      treeFixedExpand: '樹結構的固定列與展開行有衝突',
      treeLineExpand: '樹結構的節點線與展開行有衝突',
      scrollXNotGroup: '橫向虛擬滾動不支持分組表頭',
      unableInsert: '無法插入到指定位置',
      useErr: '安裝 "{{0}}" 模塊時發生錯誤，可能順序不正確，依賴的模塊需要在Table之前安裝',
      barUnableLink: '工具欄無法關聯表格',
      toolbarId: '工具欄需要設置唯一 "id"',
      expandContent: '展開行的插槽應該是 “content”，請檢查是否正確',
      reqModule: '缺少 "{{0}}" 模塊',
      reqProp: '缺少必要的 "{{0}}" 參數，可能會導致出現錯誤',
      emptyProp: '參數 "{{0}}" 不允許為空',
      errProp: '不支持的參數 "{{0}}"，可能為 "{{1}}"',
      notFunc: '方法 "{{0}}" 不存在',
      notSlot: '插槽 "{{0}}" 不存在',
      noTree: '樹狀結構不支援 {{0}}',
      delFunc: '方法 "{{0}}" 已停用，請使用 "{{1}}"',
      delProp: '參數 "{{0}}" 已停用，請使用 "{{1}}"',
      delEvent: '事件 "{{0}}" 已停用，請使用 "{{1}}"',
      removeProp: '參數 "{{0}}" 已停用，不建議使用，這可能會導致出現錯誤',
      notType: '不支持的檔案類型 "{{0}}"',
      notExp: '該瀏覽器不支持導入/匯出功能',
      impFields: '導入失敗，請檢查欄位名和數據格式是否正確',
      treeNotImp: '樹錶不支持導入',
      typeErr: '"{{0}}" 類型錯誤，期望是 {{1}}，得到是 {{2}}'
    },
    table: {
      emptyText: '暫無資料',
      allTitle: '全選/取消',
      seqTitle: '#',
      confirmFilter: '篩選',
      resetFilter: '重置',
      allFilter: '全部',
      sortAsc: '昇冪：最低到最高',
      sortDesc: '按高到低進行排序',
      filter: '對所選的列啟用篩選',
      impSuccess: '導入成功',
      expSuccess: '匯出成功',
      expOriginFilename: '匯出_{{0}}',
      expSrcFilename: '匯出_據_{{0}}',
      expSheetName: 'Sheet1'
    },
    grid: {
      selectOneRecord: '請至少選擇一條記錄！',
      deleteSelectRecord: '您確定要刪除所選記錄嗎？',
      removeSelectRecord: '您確定要移除所選記錄嗎？',
      dataUnchanged: '資料未更改！ ',
      saveSuccess: '保存成功'
    },
    pager: {
      goto: '前往',
      pagesize: '項/頁',
      total: '共 {{total}} 項記錄',
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
    types: {
      csv: 'CSV (逗号分隔)(*.csv)',
      html: '网页(*.html)',
      xml: 'XML 数据(*.xml)',
      txt: '文本文件(制表符分隔)(*.txt)',
      xlsx: 'Excel 工作簿(*.xlsx)',
      pdf: 'PDF (*.pdf)'
    },
    modal: {
      zoomIn: '最大化',
      zoomOut: '向下還原',
      close: '關閉'
    },
    form: {
      folding: '收起',
      unfolding: '展開'
    },
    toolbar: {
      import: '導入數據',
      export: '匯出數據',
      refresh: '重繪',
      zoomIn: '全屏',
      zoomOut: '還原',
      custom: '列設定',
      customAll: '全部',
      customConfirm: '确认',
      customRestore: '還原',
      impTitle: '導入參數設置',
      impFile: '檔名',
      impSelect: '選擇檔案',
      impType: '檔案類型',
      impOpts: '導入選項',
      impConfirm: '導入',
      impModeCovering: '覆蓋',
      impCoveringTitle: '使用覆蓋的管道將數據導入到表格中',
      impModeAppend: '追加',
      impAppendTitle: '使用追加的管道將數據導入到表格中',
      expTitle: '匯出參數設置',
      expName: '檔名',
      expNamePlaceholder: '請輸入檔名',
      expSheetName: '工作表名稱',
      expSheetNamePlaceholder: '請輸入工作表名稱',
      expType: '保存類型',
      expMode: '要匯出的數據',
      expAll: '全部數據',
      expSelected: '選中數據',
      expAllColumn: '全部欄位',
      expColumn: '要匯出的欄位',
      expOpts: '匯出選項',
      expOptHeader: '錶頭',
      expHeaderTitle: '是否需要匯出表頭',
      expOptFooter: '錶尾',
      expFooterTitle: '是否需要匯出錶尾',
      expOptOriginal: '源數據',
      expOriginalTitle: '是否需要匯出源數據，如果勾上則支持導入到表格中',
      expPrint: '列印',
      expConfirm: '匯出'
    }
  }
};
exports.default = _default;