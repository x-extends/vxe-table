"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  vxe: {
    error: {
      rowIdEmpty: 'row-id propertyはemptyが許可されていません',
      delProp: 'prop propertyは非推奨です、fieldを使用してください',
      delLabel: 'label propertyは非推奨です、titleを使用してください',
      delColumnKey: '参数 <column>.column-key 已废弃，请使用 <table>.column-key',
      delShowAllOverflow: '参数 show-all-overflow 已废弃，请使用 show-overflow',
      delShowHeaderAllOverflow: '参数 show-header-all-overflow 已废弃，请使用 show-header-overflow',
      delGetRecords: 'getRecords functionは非推奨です、getDataを使用してください',
      delGetAllRecords: 'getAllRecords functionは非推奨です、getRecordsetを使用してください',
      delRevert: 'revert functionは非推奨です、revertDataを使用してください',
      groupFixed: 'Grouping headersが使われている場合、fixed columnsは左右になくてはなりません',
      notResizable: 'Horizontal virtual scrollingはresizableをサポートしていません',
      notMouse: 'Horizontal virtual scrolling does not support mouse-config.',
      cellEditRender: 'Rendererはcell-renderとedit-renderを同時に仕様できません',
      scrollOriginal: 'Virtual scrollingはsource dataのみエクスポートできます、original=trueを設定してください',
      treeInsert: 'Tree structureはinsert operationsをサポートしていません',
      scrollYHeight: 'Virtual scrollingを有効にするにはheightかmax-heightを設定してください',
      unableInsert: '指定位置に挿入できません。',
      notQuery: 'query methodがありません',
      notDelete: 'delete methodがありません',
      notSave: 'save methodがありません',
      toolbarId: 'Toolbarはunique idが必要です'
    },
    table: {
      emptyText: 'データがありません',
      confirmFilter: '完了',
      resetFilter: 'リセット',
      allFilter: '全て'
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
      pageClassifier: ''
    },
    alert: {
      title: 'メッセージ'
    },
    button: {
      confirm: '完了',
      cancel: 'キャンセル'
    }
  }
};
exports.default = _default;