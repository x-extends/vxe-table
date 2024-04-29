export default {
  vxe: {
    error: {
      groupFixed: 'グループのヘッダを使用する場合、固定列をグループで設定しなければなりません',
      groupMouseRange: 'グループ化ヘッダーと「{0}」は同時に使用できません。これによりエラーが発生する可能性があります',
      groupTag: 'グループ化ヘッダーは "{0}" を使ってください。 "{1}" はエラーが発生する可能性があります',
      scrollErrProp: '仮想スクロールはこのパラメータを使えません： "{0}"',
      scrollXNotGroup: '横軸の仮想スクロールはグループ化ヘッダーを使えません。 "scroll-x.enabled=false" パラメータを指定してください',
      errConflicts: 'パラメータ "{0}" と "{1}" は同時に使えません',
      unableInsert: '指定された位置に挿入できない',
      useErr: '"{0}" モジュールをインストールする際にエラーが発生し、順序が正しくない可能性があります。依存するモジュールはTableの前にインストールする必要があります',
      barUnableLink: 'ツールバーはフォームを関連付けることができない',
      expandContent: '拡張行スロットは "content" である必要があります。確認してください',
      reqModule: '"{0}" モジュールが必要',
      reqProp: '必要な "{0}" パラメーターが欠落しているため、エラーが発生する可能性があります',
      emptyProp: '"{0}" プロパティは空白が許可されません',
      errProp: 'サポートされていないパラメーター "{0}"，"{1}" の可能性があります',
      colRepet: 'column.{0}="{0}" が重複しているため、機能が使えなくなる可能性があります。',
      notFunc: 'method "{0}" はありません',
      notSlot: 'slot "{0}" はありません',
      noTree: 'Tree structureは "{0}" をサポートしていません',
      notProp: 'サポートされていないパラメータ "{0}"',
      coverProp: '"{0}" のパラメータ "{1}" が上書きされるため、エラーが発生する可能性があります',
      delFunc: '"{0}" functionは非推奨です。"{1}"を使用してください',
      delProp: '"{0}" propertyは非推奨です。"{1}"を使用してください',
      delEvent: 'イベント "{0}" は廃止されました。 "{1}" を使用してください',
      removeProp: 'パラメーター "{0}" は非推奨および非推奨です。エラーが発生する可能性があります',
      errFormat: '全般フォーマットするには "VXETable.formats" で定義してください。 "formatter={0}" での方式が非推奨です',
      notType: 'サポートされていないファイル種類 "{0}"',
      notExp: 'ご利用のブラウザはインポート/エクスポートをサポートしていません',
      impFields: 'インポートに失敗しました。フィールド名とデータ形式を確認してください',
      treeNotImp: 'ツリーテーブルのインポートをサポートしていません'
    },
    renderer: {
      search: '搜索',
      cases: {
        equal: 'イコール',
        unequal: 'ノットイコール',
        gt: '大なり',
        ge: '大なりイコール',
        lt: '小なり',
        le: '小なりイコール',
        begin: '先頭は',
        notbegin: 'not begin',
        endin: '末尾は',
        notendin: 'not endin',
        include: '含む',
        exclude: '含まない',
        between: '属する',
        custom: 'カスタムフィルター',
        insensitive: '大文字小文字区別しない',
        isSensitive: '大文字小文字区別する'
      },
      combination: {
        menus: {
          sortAsc: '昇順',
          sortDesc: '降順',
          fixedColumn: '列ロック',
          fixedGroup: 'グループロック',
          cancelFixed: 'ロック解除',
          fixedLeft: '左側ロック',
          fixedRight: '右側ロック',
          clearFilter: 'フィルタークリア',
          textOption: '文字絞り込む',
          numberOption: '数値絞り込み'
        },
        popup: {
          title: 'カスタムフィルター',
          currColumnTitle: '現在列：',
          and: 'と',
          or: 'もしくは',
          describeHtml: ' ? で一文字<br/> * で複数文字を代替する'
        },
        empty: '(空白)',
        notData: 'データなし'
      }
    },
    pro: {
      area: {
        mergeErr: '結合セルに使えません',
        multiErr: '複数選択されたセルに使えません',
        extendErr: '結合セルが含まれている場合、すべての結合セルのサイズが同じでなければなりません'
      },
      fnr: {
        title: '検索と置換',
        findLabel: '検索',
        replaceLabel: '置換',
        findTitle: '検索内容：',
        replaceTitle: '置換する文字：',
        tabs: {
          find: '検索',
          replace: '置換'
        },
        filter: {
          re: '正規表現',
          whole: 'フルワード',
          sensitive: '大文字小文字区別する'
        },
        btns: {
          findNext: '次検索',
          findAll: 'すべて検索',
          replace: '置換',
          replaceAll: 'すべて置換',
          cancel: 'キャンセル'
        },
        header: {
          seq: '#',
          cell: 'セル',
          value: '値'
        },
        empty: '(空白)',
        reError: '無効な正規表現',
        recordCount: '{0} 個のセルが見つかりました',
        notCell: '見つかりませんでした',
        replaceSuccess: '{0} 個のセルを置換しました'
      }
    },
    table: {
      emptyText: 'データがありません',
      allTitle: '全て選択/取消',
      seqTitle: '#',
      confirmFilter: 'ＯＫ',
      resetFilter: 'リセット',
      allFilter: '全て',
      sortAsc: '昇順',
      sortDesc: '降順',
      filter: '選択した列が絞り込む有効',
      impSuccess: '{0} レコードがインポートされました',
      expLoading: 'エクスポート中',
      expSuccess: 'エクスポートが成功しました',
      expOriginFilename: 'エクスポート_{0}',
      expSrcFilename: 'エクスポート_ソース_{0}',
      customTitle: '列設定',
      customAll: '全部',
      customConfirm: 'ＯＫ',
      customRestore: 'リセット'
    },
    grid: {
      selectOneRecord: '1つ以上ののレコードを選択してください',
      deleteSelectRecord: 'レコードを削除してもよろしいですか？',
      removeSelectRecord: 'レコードを削除してもよろしいですか？',
      dataUnchanged: 'データが変更されませんでした',
      delSuccess: '選択したレコードを削除しました',
      saveSuccess: '保存しました',
      operError: 'エラーが発生しました。操作が失敗しました'
    },
    select: {
      emptyText: 'データがありません'
    },
    pager: {
      goto: '移動',
      pagesize: '{0}件/ページ',
      total: '全 {0} 件',
      pageClassifier: '',
      prevPage: '前のページ',
      nextPage: '次のページ',
      prevJump: '前のページに移動',
      nextJump: '次のページに移動'
    },
    alert: {
      title: 'メッセージ'
    },
    button: {
      confirm: '完了',
      cancel: 'キャンセル'
    },
    import: {
      modes: {
        covering: 'カバー',
        insert: '追加'
      },
      impTitle: 'データインポート',
      impFile: 'ファイル名',
      impSelect: 'ファイルを選択',
      impType: 'ファイルの種類',
      impOpts: 'パラメータ設定',
      impConfirm: 'インポート',
      impCancel: 'キャンセル'
    },
    export: {
      types: {
        csv: 'CSV (カンマ区切り)(*.csv)',
        html: 'webページ(*.html)',
        xml: 'XML データ(*.xml)',
        txt: 'テキストファイル（タブ区切り）(*.txt)',
        xls: 'Excel 97-2003 ワークブック(*.xls)',
        xlsx: 'Excel ワークブック(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: '表示中のデータ(表示中のページのデータ)',
        selected: '選択したデータ(現在のページで選択したデータ)',
        all: '全てのデータ（全てのページのデータを含む）'
      },
      printTitle: '印刷',
      expTitle: 'データ',
      expName: 'ファイル名',
      expNamePlaceholder: 'ファイル名を入力してください',
      expSheetName: 'タイトル',
      expSheetNamePlaceholder: 'タイトルを入力してください',
      expType: '保存タイプ',
      expMode: '保存データ',
      expCurrentColumn: '全てのフィールド',
      expColumn: '列',
      expOpts: 'パラメータ',
      expOptHeader: 'ヘッダー',
      expHeaderTitle: 'ヘッダーをエクスポート',
      expOptFooter: 'フッター',
      expFooterTitle: 'フッターをエクスポート',
      expOptColgroup: 'グループ分けタイトル',
      expColgroupTitle: 'グループ分けタイトルを有効にする',
      expOptMerge: '結合',
      expMergeTitle: '結合セルを有効にする',
      expOptAllExpand: '階層構造',
      expAllExpandTitle: '階層構造を有効にする',
      expOptUseStyle: 'スタイル',
      expUseStyleTitle: 'スタイルを有効にする',
      expOptOriginal: 'ソースデータ',
      expOriginalTitle: 'ソースデータを有効にする',
      expPrint: '印刷',
      expConfirm: 'ＯＫ',
      expCancel: 'キャンセル'
    },
    modal: {
      zoomIn: '最大化',
      zoomOut: '縮小',
      close: '閉じる'
    },
    form: {
      folding: '展開を戻す',
      unfolding: '展開'
    },
    toolbar: {
      import: 'ファイル読込',
      export: 'エクスポート',
      print: '印刷',
      refresh: '再読み込み',
      zoomIn: 'フルスクリーン',
      zoomOut: '縮小',
      custom: 'カスタム設定',
      customAll: '全部',
      customConfirm: 'OK',
      customRestore: '戻る'
    },
    input: {
      date: {
        m1: '1月',
        m2: '2月',
        m3: '3月',
        m4: '4月',
        m5: '5月',
        m6: '6月',
        m7: '7月',
        m8: '8月',
        m9: '9月',
        m10: '10月',
        m11: '11月',
        m12: '12月',
        quarterLabel: '{0} 年',
        monthLabel: '{0} 年',
        dayLabel: '{0} 年 {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy 年 WW',
          month: 'yyyy-MM',
          quarter: 'yyyy 年第 q 四半期',
          year: 'yyyy'
        },
        weeks: {
          w: '曜日',
          w0: '日',
          w1: '月',
          w2: '火',
          w3: '水',
          w4: '木',
          w5: '金',
          w6: '土'
        },
        months: {
          m0: '1月',
          m1: '2月',
          m2: '3月',
          m3: '4月',
          m4: '5月',
          m5: '6月',
          m6: '7月',
          m7: '8月',
          m8: '9月',
          m9: '10月',
          m10: '11月',
          m11: '12月'
        },
        quarters: {
          q1: '第1四半期',
          q2: '第2四半期',
          q3: '第3四半期',
          q4: '第4四半期'
        }
      }
    }
  }
}
