export default {
  vxe: {
    error: {
      rowIdEmpty: '參數 row-id 不允許為空',
      delProp: '參數 prop 已停用，請使用 field',
      delLabel: '參數 label 已停用，請使用 title',
      delGetRecords: '方法 getRecords 已停用，請使用 getData',
      delGetAllRecords: '方法 getAllRecords 已停用，請使用 getRecordset',
      delRevert: '方法 revert 已停用，請使用 revertData',
      groupFixed: '如果使用分组表頭，固定列必须在左右兩側',
      notResizable: '横向虛擬滾動不支援 resizable',
      cellEditRender: '渲染器 cell-render 和 edit-render 不能同時使用',
      scrollOriginal: '虛擬滾動啓用後只能匯出來源資料，請將設定 original=true',
      treeInsert: '樹狀結構不支援 insert 操作',
      treeRemove: '樹狀結構不支援 remove 操作',
      treeFixedExpand: '樹狀結構的固定列與展開行功能有冲衝突',
      scrollYHeight: '啓用虛擬滾動必须要設定 height 或 max-height',
      unableInsert: '無法插入到指定位置',

      notQuery: 'query 方法不存在',
      notDelete: 'delete 方法不存在',
      notSave: 'save 方法不存在',

      toolbarId: '工具栏需要设置唯一 id',

      reqModule: '缺少 {{name}} 模块'
    },
    table: {
      emptyText: '暫無資料',
      confirmFilter: '篩選',
      resetFilter: '重置',
      allFilter: '全部'
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
      pageClassifier: '頁'
    },
    alert: {
      title: '訊息提示'
    },
    button: {
      confirm: '確認',
      cancel: '取消'
    }
  }
}
