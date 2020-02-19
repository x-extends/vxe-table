"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  vxe: {
    error: {
      groupFixed: 'Grouping headersが使われている場合、fixed columnsは左右になくてはなりません',
      groupMouseRange: '分组表头与 "{{0}}" 不能同时使用，这可能會出現错误',
      cellEditRender: 'Rendererは"cell-render"と"edit-render"を同時に仕様できません',
      treeFixedExpand: '树结构的固定列与展开行有冲突',
      treeLineExpand: '树结构的节点线与展开行有冲突',
      scrollXNotGroup: '横向虚拟滚动不支持分组表头',
      unableInsert: '指定された位置に挿入できない',
      useErr: '"{{0}}" モジュールをインストールする際にエラーが発生し,順序が正しくない可能性があり,依頼するモジュールはTableの前にインストールする必要がある',
      barUnableLink: 'ツールバーはフォームを関連付けることができない',
      toolbarId: 'ツールバーはユニーク"id"を設定する必要がある',
      expandContent: '展开行的插槽应该是 "content"，请检查是否正确',
      reqModule: '"{{0}}" モジュールが必要',
      reqProp: '缺少必要的 "{{0}}" 参数，这可能会导致出现错误',
      emptyProp: '"{{0}}" propertyはemptyが許可されていません',
      errProp: '不支持的参数 "{{0}}"，可能为 "{{1}}"',
      notFunc: '方法 "{{0}}" 不存在',
      notSlot: '插槽 "{{0}}" 不存在',
      noTree: 'Tree structureは "{{0}}" をサポートしていません',
      delFunc: '"{{0}}" functionは非推奨です、"{{1}}"を使用してください',
      delProp: '"{{0}}" propertyは非推奨です、"{{1}}"を使用してください',
      delEvent: '事件 "{{0}}" 已废弃，请使用 "{{1}}"',
      removeProp: '参数 "{{0}}" 已废弃，不建议使用，这可能会导致出现错误',
      notType: '不支持的文件类型 "{{0}}"',
      notExp: '该浏览器不支持导入/导出功能',
      impFields: '导入失败，请检查字段名和数据格式是否正确',
      treeNotImp: '树表格不支持导入',
      typeErr: '"{{0}}" 类型错误，期望是 {{1}}，得到是 {{2}}'
    },
    table: {
      emptyText: 'データがありません',
      allTitle: '全选/取消',
      seqTitle: '#',
      confirmFilter: '完了',
      resetFilter: 'リセット',
      allFilter: '全て',
      sortAsc: '升序：最低到最高',
      sortDesc: '降序：最高到最低',
      filter: '对所选的列启用筛选',
      impSuccess: '导入成功',
      expSuccess: '导出成功',
      expOriginFilename: '导出_{{0}}',
      expSrcFilename: '导出_源_{{0}}',
      expSheetName: 'Sheet1'
    },
    grid: {
      selectOneRecord: '少なくとも1つのレコードを選択してください',
      deleteSelectRecord: 'レコードを削除してもよろしいですか？',
      removeSelectRecord: 'レコードを削除してもよろしいですか？',
      dataUnchanged: 'データは変更されませんでした',
      saveSuccess: '保存しました'
    },
    pager: {
      goto: '移動',
      pagesize: '件/ページ',
      total: '全 {{total}} 件',
      pageClassifier: '',
      prevPage: '上一页',
      nextPage: '下一页',
      prevJump: '向上跳页',
      nextJump: '向下跳页'
    },
    alert: {
      title: 'メッセージ'
    },
    button: {
      confirm: '完了',
      cancel: 'キャンセル'
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
      zoomOut: '向下还原',
      close: '关闭'
    },
    form: {
      folding: '收起',
      unfolding: '展开'
    },
    toolbar: {
      import: '导入数据',
      export: '导出数据',
      refresh: '刷新',
      zoomIn: '全屏',
      zoomOut: '还原',
      custom: '列设置',
      customAll: '全部',
      customConfirm: '确认',
      customRestore: '还原',
      impTitle: '导入参数设置',
      impFile: '文件名',
      impSelect: '选择文件',
      impType: '文件类型',
      impOpts: '导入选项',
      impConfirm: '导入',
      impModeCovering: '覆盖',
      impCoveringTitle: '使用覆盖的方式将数据导入到表格中',
      impModeAppend: '追加',
      impAppendTitle: '使用追加的方式将数据导入到表格中',
      expTitle: '导出参数设置',
      expName: '文件名',
      expNamePlaceholder: '请输入文件名',
      expSheetName: '工作表名称',
      expSheetNamePlaceholder: '请输入工作表名称',
      expType: '保存类型',
      expMode: '要导出的数据',
      expAll: '全部数据',
      expSelected: '选中数据',
      expAllColumn: '全部字段',
      expColumn: '要导出的字段',
      expOpts: '导出选项',
      expOptHeader: '表头',
      expHeaderTitle: '是否需要导出表头',
      expOptFooter: '表尾',
      expFooterTitle: '是否需要导出表尾',
      expOptOriginal: '源数据',
      expOriginalTitle: '是否需要导出源数据，如果勾上则支持导入到表格中',
      expPrint: '打印',
      expConfirm: '导出'
    }
  }
};
exports.default = _default;