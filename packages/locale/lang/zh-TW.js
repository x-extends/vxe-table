export default {
  vxe: {
    error: {
      groupFixed: '如果使用分组表頭，固定列必须在左右兩側',
      notResizable: '横向虛擬滾動不支援 resizable',
      cellEditRender: '渲染器 cell-render 和 edit-render 不能同時使用',
      scrollOriginal: '虛擬滾動啓用後只能匯出來源資料，請將設定 original=true',
      treeFixedExpand: '樹狀結構的固定列與展開行功能有冲衝突',
      scrollYHeight: '啓用虛擬滾動必须要設定 height 或 max-height',
      unableInsert: '無法插入到指定位置',

      barUnableLink: '工具欄無法關聯表格',
      toolbarId: '工具欄需要設置唯一 id',

      reqModule: '缺少 {{0}} 模块',
      emptyProp: '參數 {{0}} 不允許為空',
      notFunc: '{{0}} 方法不存在',
      noTree: '樹狀結構不支援 {{0}}',
      delFunc: '方法 {{0}} 已停用，請使用 {{1}}',
      delProp: '參數 {{0}} 已停用，請使用 {{1}}'
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
