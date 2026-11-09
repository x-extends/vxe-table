export default {
  vxe: {
    base: {
      pleaseInput: '入力してください',
      pleaseSelect: '選択してください',
      comma: '、',
      fullStop: '。'
    },
    loading: {
      text: '読み込み中...'
    },
    error: {
      downErr: 'ダウンロードに失敗しました',
      errLargeData: 'バインドするデータ量が大きすぎる場合は {0} を使用してください。そうしないと動作が重くなる可能性があります',
      groupFixed: 'グループヘッダーを使用する場合、固定列はグループ単位で設定する必要があります',
      groupMouseRange: 'グループヘッダーと "{0}" は同時に使用できません。エラーが発生する可能性があります',
      groupTag: 'グループ列ヘッダーには "{1}" ではなく "{0}" を使用してください。エラーが発生する可能性があります',
      scrollErrProp: '仮想スクロールを有効にした後は、パラメータ "{0}" はサポートされません',
      errConflicts: 'パラメータ "{0}" と "{1}" が競合しています',
      modelConflicts: 'バインドされたフィールド値 "{0}" と "{1}" が競合しています。エラーが発生します',
      notSupportProp: 'パラメータ "{0}" を有効にした場合、"{1}" はサポートされません。"{2}" にしてください。そうしないとエラーが発生します',
      reqSupportProp: '"{0}" を使用する場合、"{1}" を設定してください。そうしないとエラーが発生する可能性があります',
      notConflictProp: '"{0}" を使用する場合、"{1}" を設定してください。そうしないと機能が競合する可能性があります',
      unableInsert: '指定した位置に挿入できません。パラメータが正しいか確認してください',
      useErr: '"{0}" モジュールのインストール中にエラーが発生しました。順序が正しくない可能性があります。依存モジュールは Table より前にインストールする必要があります',
      barUnableLink: 'ツールバーをテーブルに関連付けできません',
      expandContent: '展開行のスロットは "content" である必要があります。正しいか確認してください',
      reqComp: '"{0}" コンポーネントがありません。正しくインストールされているか確認してください。 https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: '"{0}" モジュールがありません',
      reqProp: '必須パラメータ "{0}" がありません。エラーが発生する可能性があります',
      emptyProp: 'パラメータ "{0}" は空にできません',
      errProp: 'サポートされていないパラメータ "{0}" です。おそらく "{1}" です',
      colRepet: 'column.{0}="{1}" が重複しています。一部の機能が使用できなくなる可能性があります',
      notFunc: 'メソッド "{0}" は存在しません',
      errFunc: 'パラメータ "{0}" はメソッドではありません',
      notValidators: 'グローバルバリデータ "{0}" は存在しません',
      notFormats: 'グローバルフォーマッター "{0}" は存在しません',
      notCommands: 'グローバルコマンド "{0}" は存在しません',
      notSlot: 'スロット "{0}" は存在しません',
      noTree: 'ツリー構造では "{0}" はサポートされません',
      noGroup: 'データグループ化後は "{0}" はサポートされません',
      notProp: 'サポートされていないパラメータ "{0}" です',
      returnErr: 'パラメータ "{0}" の戻り値は "{1}" が期待されますが、実際は "{2}" です',
      notSupportReturn: '戻り値が "{0}" の場合、パラメータには "{2}" ではなく "{1}" を使用してください',
      checkProp: 'データ量が大きいとチェックボックスが重くなる可能性があります。パラメータ "{0}" を設定して描画速度を向上することをおすすめします',
      coverProp: '"{0}" のパラメータ "{1}" が重複定義されています。エラーが発生する可能性があります',
      uniField: 'フィールド名 "{0}" が重複定義されています。エラーが発生する可能性があります',
      repeatKey: '主キーが重複しています {0}="{1}"。エラーが発生する可能性があります',
      repeatProp: 'パラメータが重複しています {0}="{1}"。エラーが発生する可能性があります',
      delFunc: 'メソッド "{0}" は非推奨です。"{1}" を使用してください',
      delProp: 'パラメータ "{0}" は非推奨です。"{1}" を使用してください',
      delEvent: 'イベント "{0}" は非推奨です。"{1}" を使用してください',
      removeProp: 'パラメータ "{0}" は非推奨であり、使用は推奨されません。エラーが発生する可能性があります',
      errFormat: 'グローバルのフォーマット内容は "VXETable.formats" で定義してください。"formatter={0}" をマウントする方法は推奨されません',
      notType: 'サポートされていないファイル形式 "{0}" です',
      notExp: 'このブラウザはインポート/エクスポート機能をサポートしていません',
      impFields: 'インポートに失敗しました。フィールド名とデータ形式が正しいか確認してください',
      treeNotImp: 'ツリーテーブルはインポートをサポートしていません',
      treeCrossDrag: '第1階層のみドラッグできます',
      treeDragChild: '親を自身の子にドラッグすることはできません',
      reqPlugin: '拡張プラグイン "{1}" がインストールされていません https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: 'サポートされる最大データ量 {0} 行を超えています。エラーが発生する可能性があります',
      useNew: '{0} の使用は推奨されません。{1} を使用してください',
      errorVersion: 'バージョンが一致しません。現在のバージョンは {0}、最低サポートバージョンは {1} です',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: 'データなし',
      allTitle: 'すべて選択/解除',
      seqTitle: '番号',
      actionTitle: '操作',
      confirmFilter: 'フィルター',
      resetFilter: 'リセット',
      allFilter: 'すべて',
      sortAsc: '昇順：最小から最大',
      sortDesc: '降順：最大から最小',
      filter: '選択した列のフィルターを有効にする',
      impSuccess: '{0} 件のレコードをインポートしました',
      expLoading: 'エクスポート中',
      expSuccess: 'エクスポートに成功しました',
      expError: 'エクスポートに失敗しました',
      expFilename: 'エクスポート_{0}',
      expOriginFilename: 'エクスポート_元_{0}',
      customTitle: 'カスタマイズ設定',
      customAll: 'すべて',
      customConfirm: '確認',
      customClose: '閉じる',
      customCancel: 'キャンセル',
      customRestore: 'デフォルトに戻す',
      maxFixedCol: '固定列の最大数は {0} を超えることはできません',
      maxGroupCol: 'グループ化フィールドの最大数は {0} を超えることはできません',
      dragTip: '移動：{0}',
      resizeColTip: '幅：{0} ピクセル',
      resizeRowTip: '高さ：{0} ピクセル',
      rowGroupContentTotal: '{0}（{1}）',
      menuLoading: '読み込み中...'
    },
    grid: {
      selectOneRecord: '少なくとも1件のレコードを選択してください！',
      deleteSelectRecord: '選択したレコードを削除してもよろしいですか？',
      removeSelectRecord: '選択したレコードを移除してもよろしいですか？',
      dataUnchanged: 'データは変更されていません！',
      delSuccess: '選択したレコードを削除しました！',
      saveSuccess: '保存に成功しました！',
      operError: 'エラーが発生し、操作に失敗しました！'
    },
    select: {
      clear: 'クリア',
      allChecked: 'すべて選択',
      total: '{0} 項目選択済み',
      close: '閉じる',
      search: '検索',
      loadingText: '読み込み中...',
      emptyText: 'データなし',
      maxSize: '選択可能な最大数は {0} を超えることはできません',
      overSizeErr: '選択可能な最大数 {0} を超えました。超過分は無視されます！',
      searchEmpty: '一致するデータがありません！'
    },
    list: {
      allChecked: 'すべて選択',
      dragTip: '移動：{0}'
    },
    tree: {
      searchEmpty: '一致するデータがありません！',
      dragTip: '移動：{0}'
    },
    treeSelect: {
      clearChecked: 'クリア',
      allChecked: 'すべて選択',
      allExpand: 'すべて展開',
      clearExpand: 'すべて折りたたむ',
      total: '{0} 項目選択済み',
      filterCount: '合計 {0} 件のレコードが見つかりました',
      close: '閉じる',
      search: '検索',
      emptyText: 'データなし'
    },
    tableSelect: {
      filterCount: '合計 {0} 件のレコードが見つかりました'
    },
    pager: {
      goto: '移動',
      gotoTitle: 'ページ数',
      pagesize: '{0}件/ページ',
      total: '全 {0} 件',
      pageClassifier: 'ページ',
      homePage: '最初のページ',
      homePageTitle: '最初のページ',
      prevPage: '前のページ',
      prevPageTitle: '前のページ',
      nextPage: '次のページ',
      nextPageTitle: '次のページ',
      prevJump: '前へジャンプ',
      prevJumpTitle: '前へジャンプ',
      nextJump: '後ろへジャンプ',
      nextJumpTitle: '後ろへジャンプ',
      endPage: '最後のページ',
      endPageTitle: '最後のページ'
    },
    alert: {
      title: 'システムメッセージ'
    },
    button: {
      confirm: '確認',
      cancel: 'キャンセル',
      clear: 'クリア'
    },
    filter: {
      search: '検索'
    },
    custom: {
      cstmTitle: 'カスタマイズ設定',
      cstmRestore: 'デフォルトに戻す',
      cstmCancel: 'キャンセル',
      cstmConfirm: 'OK',
      cstmConfirmRestore: 'デフォルトの列設定に戻してもよろしいですか？',
      cstmDragTarget: '移動：{0}',
      setting: {
        colSort: '並べ替え',
        sortHelpTip: 'アイコンをクリックしてドラッグを開始',
        colTitle: '列タイトル',
        colResizable: '列幅（ピクセル）',
        colVisible: '表示',
        colFixed: '固定列',
        colFixedMax: '固定列（{0}）',
        colAlign: '配置',
        colHeadAlign: 'ヘッダー配置',
        colFootAlign: 'フッター配置',
        fixedLeft: '左',
        fixedUnset: 'なし',
        fixedRight: '右',
        alignLeft: '左',
        alignCenter: '中央',
        alignRight: '右',
        moveUp: '上へ移動',
        moveDn: '下へ移動',
        putTop: '先頭へ',
        putBottom: '末尾へ',
        moveUpTitle: 'クリックして上へ移動',
        moveDnTitle: 'クリックして下へ移動',
        putTopTitle: 'クリックして先頭へ',
        putBottomTitle: 'クリックして末尾へ',
        anLeftTitle: '左寄せ',
        anCenterTitle: '中央揃え',
        anRightTitle: '右寄せ'
      }
    },
    import: {
      modes: {
        covering: '上書き（テーブルデータを直接上書き）',
        insert: '末尾に追加（テーブルの末尾に新しいデータを追加）',
        insertTop: '先頭に追加（テーブルの先頭に新しいデータを追加）',
        insertBottom: '末尾に追加（テーブルの末尾に新しいデータを追加）'
      },
      impTitle: 'データのインポート',
      impFile: 'ファイル名',
      impSelect: 'ファイルを選択',
      impType: 'ファイル形式',
      impOpts: 'オプション設定',
      impMode: 'インポートモード',
      impConfirm: 'インポート',
      impCancel: 'キャンセル'
    },
    export: {
      types: {
        csv: 'CSV (カンマ区切り)(*.csv)',
        html: 'ウェブページ(*.html)',
        xml: 'XML データ(*.xml)',
        txt: 'テキストファイル(タブ区切り)(*.txt)',
        xls: 'Excel 97-2003 ブック(*.xls)',
        xlsx: 'Excel ブック(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: '空データ',
        current: '現在のデータ（現在のページのデータ）',
        selected: '選択データ（現在のページで選択したデータ）',
        all: '全データ（すべてのページのデータを含む）'
      },
      printTitle: 'データを印刷',
      expTitle: 'データをエクスポート',
      expName: 'ファイル名',
      expNamePlaceholder: 'ファイル名を入力してください',
      expSheetName: 'タイトル',
      expSheetNamePlaceholder: 'タイトルを入力してください',
      expType: '保存形式',
      expMode: 'データを選択',
      expCurrentColumn: 'すべてのフィールド',
      expColumn: 'フィールドを選択',
      widthMode: '列幅設定',
      wModeTitle: '印刷時の列幅のレンダリング方法を設定',
      wdModes: {
        default: 'デフォルト',
        auto: '自動調整（内容に応じて列幅を自動調整）',
        scale: '等倍（ページ比率に応じて列幅をレンダリング）'
      },
      expOpts: 'オプション設定',
      expOptHeader: 'ヘッダー',
      expHeaderTitle: 'ヘッダーが必要か',
      expOptFooter: 'フッター',
      expFooterTitle: 'フッターが必要か',
      expOptColgroup: 'グループヘッダー',
      expOptTitle: '列タイトル',
      expTitleTitle: '列タイトルを使用するか。使用しない場合は列のフィールド名を表示',
      expColgroupTitle: '存在する場合、グループ構造を持つヘッダーをサポート',
      expOptMerge: '結合',
      expMergeTitle: '存在する場合、結合構造を持つセルをサポート',
      expOptAllExpand: 'ツリーを展開',
      expAllExpandTitle: '存在する場合、階層構造データをすべて展開',
      expOptTreeAllExpand: 'ツリーを展開',
      expTreeAllExpandTitle: '存在する場合、すべてのツリーレベルを自動展開',
      expOptRowGroupAllExpand: 'グループを展開',
      expRowGroupAllExpandTitle: '存在する場合、すべてのグループレベルを自動展開',
      expOptUseStyle: 'スタイル',
      expUseStyleTitle: '存在する場合、スタイル付きセルをサポート',
      expOptOriginal: '元データ',
      expOriginalTitle: '元データの場合、テーブルへのインポートをサポート',
      expPrint: '印刷',
      expConfirm: 'エクスポート',
      expCancel: 'キャンセル'
    },
    modal: {
      errTitle: 'エラー',
      zoomMin: '最小化',
      zoomIn: '最大化',
      zoomOut: '元に戻す',
      close: '閉じる',
      miniMaxSize: '最小化ウィンドウ数は {0} 個を超えることはできません',
      footPropErr: 'show-footer はフッターを有効にする場合のみ使用し、show-confirm-button | show-cancel-button | スロットと組み合わせて使用する必要があります'
    },
    drawer: {
      close: '閉じる'
    },
    form: {
      folding: '折りたたむ',
      unfolding: '展開'
    },
    toolbar: {
      import: 'インポート',
      export: 'エクスポート',
      print: '印刷',
      refresh: '更新',
      zoomIn: '全画面',
      zoomOut: '元に戻す',
      custom: 'カスタマイズ設定',
      customAll: 'すべて',
      customConfirm: '確認',
      customRestore: 'リセット',
      fixedLeft: '左に固定',
      fixedRight: '右に固定',
      cancelFixed: '列の固定を解除'
    },
    iconPicker: {
      search: '検索',
      emptyText: 'データなし'
    },
    datePicker: {
      yearTitle: '{0}年'
    },
    dateRangePicker: {
      pleaseRange: '開始日と終了日を選択してください'
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
        quarterLabel: '{0}年',
        monthLabel: '{0}年',
        dayLabel: '{0}年 {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy年 第WW週',
          month: 'yyyy-MM',
          quarter: 'yyyy年 第q四半期',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: '日曜日',
          w1: '月曜日',
          w2: '火曜日',
          w3: '水曜日',
          w4: '木曜日',
          w5: '金曜日',
          w6: '土曜日'
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
    },
    calendar: {
      yearLabel: '{0}年',
      monthLabel: '{0}月'
    },
    cascader: {
      clearChecked: 'クリア',
      allChecked: 'すべて選択',
      total: '{0} 項目選択済み',
      close: '閉じる',
      search: '検索'
    },
    numberInput: {
      currencySymbol: '¥'
    },
    imagePreview: {
      popupTitle: 'プレビュー',
      operBtn: {
        zoomOut: '縮小',
        zoomIn: '拡大',
        pctFull: 'ページに合わせて拡大縮小',
        pct11: '元のサイズで表示',
        rotateLeft: '左に回転',
        rotateRight: '右に回転',
        print: '画像を印刷',
        download: '画像をダウンロード'
      }
    },
    upload: {
      fileBtnText: 'クリックまたはドラッグしてアップロード',
      imgBtnText: 'クリックまたはドラッグしてアップロード',
      dragPlaceholder: 'ファイルをこの領域にドラッグ＆ドロップするとアップロードできます',
      imgSizeHint: '1枚あたり{0}',
      imgCountHint: '最大{0}枚',
      fileTypeHint: '{0} ファイル形式に対応',
      fileSizeHint: '1ファイルのサイズは{0}以下',
      fileCountHint: '最大{0}個のファイルをアップロード可能',
      uploadTypeErr: 'ファイル形式が一致しません！',
      overCountErr: '最大{0}個のファイルまで選択できます！',
      overCountExtraErr: '最大数{0}個を超えました。超過分の{1}ファイルは無視されます！',
      overSizeErr: 'ファイルサイズは最大{0}を超えることはできません！',
      manualUpload: 'クリックしてアップロード',
      reUpload: '再アップロード',
      uploadProgress: 'アップロード中 {0}%',
      uploadErr: 'アップロードに失敗しました',
      uploadSuccess: 'アップロードに成功しました',
      moreBtnText: 'その他（{0}）',
      moreImgBtnText: '画像（{0}）',
      moreFileBtnText: 'ファイル（{0}）',
      viewItemTitle: 'クリックして表示',
      morePopup: {
        readTitle: 'リストを表示',
        imageTitle: '画像をアップロード',
        fileTitle: 'ファイルをアップロード'
      }
    },
    empty: {
      defText: 'データなし'
    },
    colorPicker: {
      clear: 'クリア',
      confirm: '確認',
      copySuccess: 'クリップボードにコピーしました：{0}',
      hex: '16進数'
    },
    formDesign: {
      formName: 'フォーム名',
      defFormTitle: '名称未設定のフォーム',
      widgetPropTab: 'ウィジェットプロパティ',
      widgetFormTab: 'フォームプロパティ',
      error: {
        wdFormUni: 'このタイプのウィジェットはフォームに1つだけ追加できます',
        wdSubUni: 'このタイプのウィジェットはサブテーブルに1つだけ追加できます'
      },
      styleSetting: {
        btn: 'スタイル設定',
        title: 'フォームのスタイル設定',
        layoutTitle: 'ウィジェットレイアウト',
        verticalLayout: '上下レイアウト',
        horizontalLayout: '横並びレイアウト',
        styleTitle: 'タイトルスタイル',
        boldTitle: 'タイトルを太字',
        fontBold: '太字',
        fontNormal: '標準',
        colonTitle: 'コロンを表示',
        colonVisible: '表示',
        colonHidden: '非表示',
        alignTitle: '配置',
        widthTitle: 'タイトル幅',
        alignLeft: '左寄せ',
        alignRight: '右寄せ',
        unitPx: 'ピクセル',
        unitPct: 'パーセント'
      },
      widget: {
        group: {
          base: '基本ウィジェット',
          layout: 'レイアウトウィジェット',
          system: 'システムウィジェット',
          module: 'モジュールウィジェット',
          chart: 'チャートウィジェット',
          advanced: '高度なウィジェット'
        },
        copyTitle: 'コピー_{0}',
        component: {
          input: '入力ボックス',
          textarea: 'テキストエリア',
          select: 'プルダウン選択',
          row: '1行複数列',
          title: 'タイトル',
          text: 'テキスト',
          subtable: 'サブテーブル',
          VxeSwitch: 'はい/いいえ',
          VxeInput: '入力ボックス',
          VxeNumberInput: '数値',
          VxeDatePicker: '日付',
          VxeTextarea: 'テキストエリア',
          VxeSelect: 'プルダウン選択',
          VxeTreeSelect: 'ツリー選択',
          VxeRadioGroup: 'ラジオボタン',
          VxeCheckboxGroup: 'チェックボックス',
          VxeUploadFile: 'ファイル',
          VxeUploadImage: '画像',
          VxeRate: '評価',
          VxeSlider: 'スライダー'
        },
        row: {
          placeholder: 'ウィジェット位置'
        }
      },
      widgetProp: {
        name: 'ウィジェット名',
        placeholder: 'プレースホルダー',
        required: '必須バリデーション',
        multiple: '複数選択を許可',
        displaySetting: {
          name: '表示設定',
          pc: 'PC',
          mobile: 'モバイル',
          visible: '表示',
          hidden: '非表示'
        },
        dataSource: {
          name: 'データソース',
          defValue: 'オプション{0}',
          addOption: 'オプションを追加',
          batchEditOption: '一括編集',
          batchEditTip: '各行が1つのオプションに対応します。テーブル、Excel、WPS から直接コピー＆ペーストできます。',
          batchEditSubTip: '各行が1つのオプションに対応します。グループの場合、子項目はスペースまたはタブで始めることができます。テーブル、Excel、WPS から直接コピー＆ペーストできます。',
          buildOption: 'オプションを生成'
        },
        rowProp: {
          colSize: '列数',
          col2: '2列',
          col3: '3列',
          col4: '4列',
          col6: '6列',
          layout: 'レイアウト'
        },
        textProp: {
          name: '内容',
          alignTitle: '配置',
          alignLeft: '左寄せ',
          alignCenter: '中央揃え',
          alignRight: '右寄せ',
          colorTitle: '文字色',
          sizeTitle: '文字サイズ',
          boldTitle: '文字を太字',
          fontNormal: '標準',
          fontBold: '太字'
        },
        subtableProp: {
          seqTitle: '番号',
          showSeq: '番号を表示',
          showCheckbox: '複数選択を許可',
          errSubDrag: 'サブテーブルではこのウィジェットはサポートされていません。別のウィジェットを使用してください',
          colPlace: 'ウィジェットをここにドラッグ'
        },
        uploadProp: {
          limitFileCount: 'ファイル数制限',
          limitFileSize: 'ファイルサイズ制限',
          multiFile: '複数ファイルのアップロードを許可',
          limitImgCount: '画像数制限',
          limitImgSize: '画像サイズ制限',
          multiImg: '複数画像のアップロードを許可'
        },
        rules: {
          required: '必須フィールド'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'フィールド設定',
      listSettingTab: 'オプション設定',
      searchTitle: '検索条件',
      listTitle: 'リストフィールド',
      searchField: '検索フィールド',
      listField: 'リストフィールド',
      activeBtn: {
        ActionButtonUpdate: '編集',
        ActionButtonDelete: '削除'
      },
      search: {
        addBtn: '編集',
        emptyText: '検索条件が設定されていません',
        editPopupTitle: '検索フィールドを編集'
      },
      searchPopup: {
        colTitle: 'タイトル',
        saveBtn: '保存'
      }
    },
    text: {
      copySuccess: 'クリップボードにコピーしました',
      copyError: '現在の環境ではこの操作はサポートされていません'
    },
    countdown: {
      formats: {
        yyyy: '年',
        MM: '月',
        dd: '日',
        HH: '時',
        mm: '分',
        ss: '秒'
      }
    },
    contextMenu: {
      loadingText: '読み込み中...'
    },
    switch: {
      onText: 'オン',
      offText: 'オフ'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}年',
        quarter: '{yyyy}年第{q}四半期',
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
        quarter: '{q}四半期',
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
        quarter: '{start.q}~{end.q}四半期',
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
        w1: '月',
        w2: '火',
        w3: '水',
        w4: '木',
        w5: '金',
        w6: '土'
      },
      days: {
        w0: '日',
        w1: '月',
        w2: '火',
        w3: '水',
        w4: '木',
        w5: '金',
        w6: '土'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '結合セルに対してこの操作は実行できません',
          multiErr: '複数選択領域に対してこの操作は実行できません',
          selectErr: '指定領域のセルを操作できません',
          extendErr: 'この操作を実行するには、すべての結合セルが同じサイズである必要があります',
          pasteMultiErr: '貼り付けできません。コピー元領域と貼り付け先領域が同じサイズである必要があります',
          cpInvalidErr: 'この操作は実行できません。選択領域に禁止された列（{0}）が含まれています'
        },
        fnr: {
          title: '検索と置換',
          titleFd: '検索',
          titleRe: '置換',
          findLabel: '検索',
          replaceLabel: '置換',
          findTitle: '検索内容：',
          replaceTitle: '置換後：',
          tabs: {
            find: '検索',
            replace: '置換'
          },
          filter: {
            re: '正規表現',
            whole: '単語単位で一致',
            sensitive: '大文字と小文字を区別'
          },
          btns: {
            findNext: '次を検索',
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
          body: {
            row: '行：{0}',
            col: '列：{0}'
          },
          empty: '(空値)',
          reError: '無効な正規表現です',
          recordCount: '{0} 個のセルが見つかりました',
          notCell: '一致するセルが見つかりません',
          replaceSuccess: '{0} 個のセルを置換しました'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'グループ',
          values: '値',
          groupPlaceholder: 'ここにドラッグしてグループ化',
          valuesPlaceholder: 'ここにドラッグして集計',
          dragExistCol: 'この列は既に存在します',
          sortHelpTip: 'アイコンをクリックしてドラッグを開始'
        },
        aggFuncs: {
          sum: '合計',
          count: '件数',
          avg: '平均',
          min: '最小値',
          max: '最大値',
          first: '先頭値',
          last: '末尾値'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: '列を固定',
          fixedGroup: 'グループを固定',
          cancelFixed: '固定を解除',
          fixedLeft: '左に固定',
          fixedRight: '右に固定'
        },
        cases: {
          equal: '等しい',
          gt: 'より大きい',
          lt: 'より小さい',
          begin: 'で始まる',
          endin: 'で終わる',
          include: '含む',
          isSensitive: '大文字と小文字を区別'
        }
      },
      filterCombination: {
        menus: {
          sort: '並べ替え',
          clearSort: '並べ替えをクリア',
          sortAsc: '昇順',
          sortDesc: '降順',
          fixedColumn: '列を固定',
          fixedGroup: 'グループを固定',
          cancelFixed: '固定を解除',
          fixedLeft: '左に固定',
          fixedRight: '右に固定',
          clearFilter: 'フィルターをクリア',
          textOption: 'テキストフィルター',
          numberOption: '数値フィルター',
          dateOption: '日付フィルター'
        },
        popup: {
          title: 'ユーザー定義フィルターの方法',
          currColumnTitle: '表示行：',
          and: 'かつ',
          or: 'または',
          describeHtml: '? は1文字を表します<br/>* は任意の複数文字を表します'
        },
        cases: {
          equal: '等しい',
          unequal: '等しくない',
          gt: 'より大きい',
          ge: '以上',
          lt: 'より小さい',
          le: '以下',
          begin: 'で始まる',
          notbegin: 'で始まらない',
          endin: 'で終わる',
          notendin: 'で終わらない',
          include: '含む',
          exclude: '含まない',
          between: '範囲内',
          isAfter: '指定日より後',
          eqAfter: '指定日以降',
          isBefore: '指定日より前',
          eqBefore: '指定日以前',
          top10: '上位10項目',
          aboveAverage: '平均より上',
          belowAverage: '平均より下',
          before: 'より前',
          after: 'より後',
          tomorrow: '明日',
          today: '今日',
          yesterday: '昨日',
          nextWeek: '来週',
          thisWeek: '今週',
          lastWeek: '先週',
          nextMonth: '来月',
          thisMonth: '今月',
          lastMonth: '先月',
          nextYear: '来年',
          thisYear: '今年',
          lastYear: '去年',
          yearToDate: '年初来',
          custom: 'ユーザー定義フィルター',
          insensitive: '大文字と小文字を区別しない',
          isSensitive: '大文字と小文字を区別'
        },
        empty: '(空白)',
        notData: '一致する項目なし'
      }
    },
    pro: {
      area: {
        mergeErr: '結合セルに対してこの操作は実行できません',
        multiErr: '複数選択領域に対してこの操作は実行できません',
        extendErr: 'この操作を実行するには、すべての結合セルが同じサイズである必要があります',
        pasteMultiErr: '貼り付けできません。コピー元領域と貼り付け先領域が同じサイズである必要があります'
      },
      fnr: {
        title: '検索と置換',
        titleFd: '検索',
        titleRe: '置換',
        findLabel: '検索',
        replaceLabel: '置換',
        findTitle: '検索内容：',
        replaceTitle: '置換後：',
        tabs: {
          find: '検索',
          replace: '置換'
        },
        filter: {
          re: '正規表現',
          whole: '単語単位で一致',
          sensitive: '大文字と小文字を区別'
        },
        btns: {
          findNext: '次を検索',
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
        empty: '(空値)',
        reError: '無効な正規表現です',
        recordCount: '{0} 個のセルが見つかりました',
        notCell: '一致するセルが見つかりません',
        replaceSuccess: '{0} 個のセルを置換しました'
      }
    },
    renderer: {
      search: '検索',
      cases: {
        equal: '等しい',
        unequal: '等しくない',
        gt: 'より大きい',
        ge: '以上',
        lt: 'より小さい',
        le: '以下',
        begin: 'で始まる',
        notbegin: 'で始まらない',
        endin: 'で終わる',
        notendin: 'で終わらない',
        include: '含む',
        exclude: '含まない',
        between: '範囲内',
        top10: '上位10項目',
        aboveAverage: '平均より上',
        belowAverage: '平均より下',
        custom: 'ユーザー定義フィルター',
        insensitive: '大文字と小文字を区別しない',
        isSensitive: '大文字と小文字を区別'
      },
      combination: {
        menus: {
          sort: '並べ替え',
          clearSort: '並べ替えをクリア',
          sortAsc: '昇順',
          sortDesc: '降順',
          fixedColumn: '列を固定',
          fixedGroup: 'グループを固定',
          cancelFixed: '固定を解除',
          fixedLeft: '左に固定',
          fixedRight: '右に固定',
          clearFilter: 'フィルターをクリア',
          textOption: 'テキストフィルター',
          numberOption: '数値フィルター',
          dateOption: '日付フィルター'
        },
        popup: {
          title: 'ユーザー定義フィルターの方法',
          currColumnTitle: '表示行：',
          and: 'かつ',
          or: 'または',
          describeHtml: '? は1文字を表します<br/>* は任意の複数文字を表します'
        },
        empty: '(空白)',
        notData: '一致する項目なし'
      }
    }
  }
}
