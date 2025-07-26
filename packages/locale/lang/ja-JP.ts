export default {
  vxe: {
    base: {
      pleaseInput: '入力してください',
      pleaseSelect: '選択してください',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: '読み込み...'
    },
    error: {
      downErr: 'ダウンロードが失敗しました',
      errLargeData: 'バインドされたデータの量が大きすぎる場合は、{0}を使用してください。',
      groupFixed: 'グループ化されたヘッダーを使用する場合、凍結列はグループごとに設定する必要があります',
      groupMouseRange: 'グループ化ヘッダーは「{0}」と同時に使用することはできません。これにより、エラーが発生する可能性があります。',
      groupTag: 'グループ化列ヘッダーは、「{1}」の代わりに「{0}」を使用する必要があります。',
      scrollErrProp: 'このパラメーター「{0}」は、仮想スクロールが有効になった後にサポートされていません',
      errConflicts: 'パラメーター「{0}」は「{1}」と競合します',
      modelConflicts: '绑定的字段值 "{0}" 与 "{1}" 存在冲突，将会出现错误',
      notSupportProp: '「{1}」はパラメーター「{0}」が有効になっている場合、「{2}」である必要があります。そうしないと、エラーが発生します。',
      notConflictProp: '「{0}」を使用する場合、「{1}」を設定する必要があります。',
      unableInsert: '指定された場所に挿入できません。パラメーターが正しいかどうかを確認してください',
      useErr: '「{0}」モジュールのインストール中にエラーが発生しました。注文が正しくない場合があります。従属モジュールは、テーブルの前にインストールする必要があります',
      barUnableLink: 'ツールバーはテーブルを関連付けることができません',
      expandContent: '拡張ラインのスロットは「コンテンツ」である必要があります。正しいかどうかを確認してください',
      reqComp: '「{0}」コンポーネントがありません。正しくインストールされているかどうかを確認してください。 https://vxeui.com/#/start/useglobal',
      reqModule: '「{0}」モジュールがありません',
      reqProp: '必要な「{0}」パラメーターが欠落しているため、エラーが発生する場合があります',
      emptyProp: 'パラメーター「{0}」は空にすることは許可されていません',
      errProp: 'サポートされていないパラメーター「{0}」、おそらく「{1}」',
      colRepet: '列。{0} = "{1}"が繰り返されるため、一部の機能が使用できなくなる可能性があります',
      notFunc: 'メソッド「{0}」は存在しません',
      errFunc: 'パラメーター「{0}」はメソッドではありません',
      notValidators: 'グローバル検証「{0}」は存在しません',
      notFormats: 'グローバルフォーマット「{0}」は存在しません',
      notCommands: 'グローバル指令「{0}」は存在しません',
      notSlot: 'スロット「{0}」は存在しません',
      noTree: '「{0}」はツリー構造ではサポートされていません',
      noGroup: '数据分组后不支持 "{0}"',
      notProp: 'サポートされていないパラメーター "{0}"',
      checkProp: 'データのボリュームが大きすぎると、チェックボックスがutter音を立てる可能性があります。レンダリング速度を改善するためにパラメーター「{0}」を設定することをお勧めします',
      coverProp: '「{0}」のパラメーター「{1}」が繰り返し定義されているため、エラーが発生する可能性があります',
      uniField: 'フィールド名「{0}」が繰り返し定義されているため、エラーが発生する可能性があります',
      repeatKey: 'プライマリキー{0} = "{1}"を繰り返します。これはエラーを引き起こす可能性があります',
      delFunc: 'メソッド「{0}」は非推奨です。「{1}」を使用してください',
      delProp: 'パラメーター「{0}」は非推奨です。「{1}」を使用してください',
      delEvent: 'イベント「{0}」は非推奨です。「{1}」を使用してください',
      removeProp: 'パラメーター「{0}」は非推奨であり、推奨されていないため、エラーが発生する可能性があります',
      errFormat: 'グローバルフォーマットコンテンツは、「Vxetable.Formats」を使用して定義する必要があり、「Formatter = {0}」を取り付ける方法は推奨されなくなります。',
      notType: 'サポートされていないファイルタイプ "{0}"',
      notExp: 'このブラウザは、インポート/エクスポート機能をサポートしません',
      impFields: 'インポートが失敗しました。フィールド名とデータ形式が正しいかどうかを確認してください。',
      treeNotImp: 'ツリーテーブルはインポートをサポートしていません',
      treeCrossDrag: '最初のレベルのみをドラッグします',
      treeDragChild: '親は自分の子供にドラッグすることはできません',
      reqPlugin: '「{1}」はhttps://vxeui.com/other {0 }/#/ {1 }/installにインストールされていません',
      errMaxRow: 'サポートされている最大データボリューム{0}行を超えると、これによりエラーが発生する可能性があります',
      useNew: '不建议使用 {0}，请使用 {1}'
    },
    table: {
      emptyText: 'まだデータはありません',
      allTitle: 'すべてを選択/キャンセルします',
      seqTitle: 'シリアルナンバー',
      actionTitle: '動作します',
      confirmFilter: 'フィルター',
      resetFilter: 'リセット',
      allFilter: '全て',
      sortAsc: '昇順：最低から最高',
      sortDesc: '降順注文：最高から最低',
      filter: '選択した列のフィルタリングを有効にします',
      impSuccess: '{0}レコードを正常にインポートしました',
      expLoading: 'エクスポート',
      expSuccess: '正常にエクスポート',
      expError: 'エクスポートは失敗しました',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'export_source_ {0}',
      customTitle: '列設定',
      customAll: '全て',
      customConfirm: '確認する',
      customClose: '閉鎖',
      customCancel: 'キャンセル',
      customRestore: 'デフォルトを復元します',
      maxFixedCol: '凍結柱の最大数は{0}を超えることはできません',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: '移動：{0}',
      resizeColTip: '幅：{0}ピクセル',
      resizeRowTip: '高さ：{0}ピクセル',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: '少なくとも1つのレコードを選択してください！',
      deleteSelectRecord: '選択したレコードを削除したいですか？',
      removeSelectRecord: '選択したレコードを削除したいですか？',
      dataUnchanged: 'データは変更されていません！',
      delSuccess: '選択したレコードは正常に削除されました！',
      saveSuccess: '正常に保存してください！',
      operError: 'エラーが発生し、操作が失敗しました！'
    },
    select: {
      clear: '清除',
      allChecked: '全选',
      total: '{0} / {1}',
      search: '検索',
      loadingText: '読み込み',
      emptyText: 'まだデータはありません',
      maxOpt: '最大可选择的数量不能超过 {0} 个',
      overSizeErr: '已超出最大可选数量 {0} 个，超出部分将被忽略！',
      searchEmpty: '未匹配到数据！'
    },
    tree: {
      searchEmpty: '未匹配到数据！'
    },
    treeSelect: {
      clearChecked: '清除',
      allChecked: '全选',
      allExpand: '全部展开',
      clearExpand: '全部收起',
      total: '已选 {0}',
      search: '搜索',
      emptyText: '暂无数据'
    },
    pager: {
      goto: '行く',
      gotoTitle: 'ページ数',
      pagesize: '{0}アイテム/ページ',
      total: '合計{0}レコード',
      pageClassifier: 'ページ',
      homePage: 'フロントページ',
      homePageTitle: 'フロントページ',
      prevPage: '前のページ',
      prevPageTitle: '前のページ',
      nextPage: '次のページ',
      nextPageTitle: '次のページ',
      prevJump: 'ジャンプアップページ',
      prevJumpTitle: 'ジャンプアップページ',
      nextJump: 'ジャンプダウンページ',
      nextJumpTitle: 'ジャンプダウンページ',
      endPage: '最後のページ',
      endPageTitle: '最後のページ'
    },
    alert: {
      title: 'システムプロンプト'
    },
    button: {
      confirm: '確認する',
      cancel: 'キャンセル',
      clear: 'クリア'
    },
    filter: {
      search: '検索'
    },
    custom: {
      cstmTitle: '列設定',
      cstmRestore: 'デフォルトを復元します',
      cstmCancel: 'キャンセル',
      cstmConfirm: 'もちろん',
      cstmConfirmRestore: 'デフォルトの列構成に復元されているかどうかを確認してください。',
      cstmDragTarget: '移動：{0}',
      setting: {
        colSort: '選別',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: '列のタイトル',
        colResizable: '列幅（ピクセル）',
        colVisible: '表示するかどうか',
        colFixed: 'フリーズコラム',
        colFixedMax: 'フリーズ列（{0}列まで）',
        fixedLeft: '左側',
        fixedUnset: '設定されていません',
        fixedRight: '右側'
      }
    },
    import: {
      modes: {
        covering: 'メソッドを上書きする（テーブルデータを直接上書きする）',
        insert: '下部に追加します（テーブルの下部に新しいデータを追加）',
        insertTop: '上部に追加します（テーブルの上部に新しいデータを追加）',
        insertBottom: '下部に追加します（テーブルの下部に新しいデータを追加）'
      },
      impTitle: 'データをインポートします',
      impFile: 'ファイル名',
      impSelect: '[ファイル]を選択します',
      impType: 'ファイルタイプ',
      impOpts: 'パラメーター設定',
      impMode: 'インポートモード',
      impConfirm: '輸入',
      impCancel: 'キャンセル'
    },
    export: {
      types: {
        csv: 'CSV（コンマ分離）（*。CSV）',
        html: 'Webページ（*.html）',
        xml: 'XMLデータ（*.xml）',
        txt: 'テキストファイル（タブ分離）（*。txt）',
        xls: 'Excel 97-2003ワークブック（*.xls）',
        xlsx: 'Excelワークブック（*.xlsx）',
        pdf: 'pdf（*.pdf）'
      },
      modes: {
        empty: '空のデータ',
        current: '現在のデータ（現在のページのデータ）',
        selected: '選択されたデータ（現在のページで選択されたデータ）',
        all: '完全なデータ（すべてのページデータを含む）'
      },
      printTitle: 'データを印刷します',
      expTitle: 'データのエクスポート',
      expName: 'ファイル名',
      expNamePlaceholder: 'ファイル名を入力してください',
      expSheetName: 'タイトル',
      expSheetNamePlaceholder: 'タイトルを入力してください',
      expType: 'タイプを保存します',
      expMode: 'データを選択します',
      expCurrentColumn: 'すべてのフィールド',
      expColumn: 'フィールドを選択します',
      expOpts: 'パラメーター設定',
      expOptHeader: 'ヘッダ',
      expHeaderTitle: 'テーブルヘッダーが必要です',
      expOptFooter: 'テーブルの終わり',
      expFooterTitle: 'テーブルの終わりは必要ですか？',
      expOptColgroup: 'グループ化ヘッダー',
      expOptTitle: '列のタイトル',
      expTitleTitle: 'それが列のタイトルであるかどうか、それ以外の場合は列のフィールド名として表示されます',
      expColgroupTitle: '存在する場合、グループ構造を持つヘッダーがサポートされています',
      expOptMerge: 'マージ',
      expMergeTitle: '存在する場合、マージされた構造を持つ細胞がサポートされます',
      expOptAllExpand: 'ツリーを拡張します',
      expAllExpandTitle: '存在する場合、階層構造を使用してすべてのデータを拡張することがサポートされています',
      expOptUseStyle: 'スタイル',
      expUseStyleTitle: '存在する場合、スタイルのあるセルがサポートされています',
      expOptOriginal: 'ソースデータ',
      expOriginalTitle: 'ソースデータの場合、テーブルへのインポートがサポートされています',
      expPrint: '印刷',
      expConfirm: '輸出',
      expCancel: 'キャンセル'
    },
    modal: {
      errTitle: 'エラーメッセージ',
      zoomMin: '最小化します',
      zoomIn: '最大化します',
      zoomOut: '削減',
      close: '閉鎖',
      miniMaxSize: '最小化されたウィンドウの数は{0}を超えることはできません',
      footPropErr: 'ショーフッターは、テーブルテールを有効にするためにのみ使用され、Show-Confirm-Buttonで使用する必要があります|ショーキャンセルボタン|スロット'
    },
    drawer: {
      close: '閉鎖'
    },
    form: {
      folding: '近い',
      unfolding: '拡大する'
    },
    toolbar: {
      import: '輸入',
      export: '輸出',
      print: '印刷',
      refresh: 'リフレッシュします',
      zoomIn: '全画面表示',
      zoomOut: '削減',
      custom: '列設定',
      customAll: '全て',
      customConfirm: '確認する',
      customRestore: 'リセット',
      fixedLeft: '左フリーズ',
      fixedRight: '右フリーズします',
      cancelFixed: '凍結外'
    },
    datePicker: {
      yearTitle: '{0} 年'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
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
          w: '',
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
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'プレビュー',
      operBtn: {
        zoomOut: '縮む',
        zoomIn: '拡大します',
        pctFull: '均等にスケーリング',
        pct11: '元のサイズを表示します',
        rotateLeft: '左に回転します',
        rotateRight: '右に回転します',
        print: 'クリックして画像を印刷します',
        download: 'クリックして写真をダウンロードします'
      }
    },
    upload: {
      fileBtnText: 'クリックまたはドラッグしてアップロードします',
      imgBtnText: 'クリックまたはドラッグしてアップロードします',
      dragPlaceholder: 'このエリアにファイルをドラッグアンドドロップしてアップロードしてください',
      imgSizeHint: 'リーフレット{0}',
      imgCountHint: '最大{0}写真',
      fileTypeHint: 'サポート{0}ファイルタイプ',
      fileSizeHint: '単一のファイルサイズが{0}を超えない',
      fileCountHint: '最大{0}ファイルをアップロードできます',
      uploadTypeErr: 'ファイルタイプの不一致！',
      overCountErr: 'せいぜい{0}ファイルのみを選択できます！',
      overCountExtraErr: '{0}の最大数は超えており、過剰な{1}ファイルは無視されます！',
      overSizeErr: '最大ファイルサイズは{0}を超えることはできません！',
      manualUpload: '点击上传',
      reUpload: '再アップロード',
      uploadProgress: '{0}％のアップロード',
      uploadErr: 'アップロードに失敗しました',
      uploadSuccess: '正常にアップロードします',
      moreBtnText: 'その他（{0}）',
      viewItemTitle: 'クリックして表示します',
      morePopup: {
        readTitle: 'リストを表示します',
        imageTitle: '写真をアップロードします',
        fileTitle: 'ファイルをアップロードします'
      }
    },
    empty: {
      defText: 'まだデータはありません'
    },
    colorPicker: {
      clear: 'クリア',
      confirm: '確認する',
      copySuccess: 'クリップボードにコピー：{0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'フォーム名',
      defFormTitle: '名前のないフォーム',
      widgetPropTab: '制御プロパティ',
      widgetFormTab: 'フォームプロパティ',
      error: {
        wdFormUni: 'このタイプのコントロールは、フォームに1つだけを追加することができます',
        wdSubUni: 'このタイプのコントロールは、サブテーブルに1つだけを追加することができます'
      },
      styleSetting: {
        btn: 'スタイル設定',
        title: 'フォームスタイル設定',
        layoutTitle: 'コントロールレイアウト',
        verticalLayout: '上部および下部のレイアウト',
        horizontalLayout: '水平レイアウト',
        styleTitle: 'タイトルスタイル',
        boldTitle: 'タイトル太字',
        fontBold: '大胆な',
        fontNormal: '従来の',
        colonTitle: 'コロンを表示します',
        colonVisible: '見せる',
        colonHidden: '隠れる',
        alignTitle: 'アライメント',
        widthTitle: 'タイトル幅',
        alignLeft: '左に',
        alignRight: '右側に',
        unitPx: 'ピクセル',
        unitPct: 'パーセンテージ'
      },
      widget: {
        group: {
          base: '基本的なコントロール',
          layout: 'レイアウトコントロール',
          system: 'システムコントロール',
          module: 'モジュールコントロール',
          chart: 'チャート制御',
          advanced: '高度なコントロール'
        },
        copyTitle: 'copy_ {0}',
        component: {
          input: '入力ボックス',
          textarea: 'テキストフィールド',
          select: 'プルダウンして選択します',
          row: '1つの行と複数の列',
          title: 'タイトル',
          text: '文章',
          subtable: 'サブテーブル',
          VxeSwitch: 'かどうか',
          VxeInput: '入力ボックス',
          VxeNumberInput: '番号',
          VxeDatePicker: '日付',
          VxeTextarea: 'テキストフィールド',
          VxeSelect: 'プルダウンして選択します',
          VxeTreeSelect: 'ツリー選択',
          VxeRadioGroup: 'ラジオボタン',
          VxeCheckboxGroup: 'チェックボックス',
          VxeUploadFile: '書類',
          VxeUploadImage: '写真',
          VxeRate: 'スコア',
          VxeSlider: 'スライダー'
        }
      },
      widgetProp: {
        name: 'コントロール名',
        placeholder: 'プロンプト',
        required: '必要な検証',
        multiple: '複数の選択肢が許可されています',
        displaySetting: {
          name: '設定を表示します',
          pc: 'PC',
          mobile: '携帯',
          visible: '見せる',
          hidden: '隠れる'
        },
        dataSource: {
          name: 'データソース',
          defValue: 'オプション{0}',
          addOption: 'オプションを追加します',
          batchEditOption: 'バッチ編集',
          batchEditTip: '各行はオプションに対応し、テーブル、Excel、およびWPSからの直接コピーと貼り付けをサポートします。',
          batchEditSubTip: '各行はオプションに対応します。それがグループの場合、子アイテムはスペースまたはタブキーから始めることができ、テーブル、Excel、およびWPSからの直接コピーと貼り付けをサポートします。',
          buildOption: 'オプションを構築します'
        },
        rowProp: {
          colSize: '列数',
          col2: '2つの列',
          col3: '3つの列',
          col4: '4つの列',
          col6: '6列',
          layout: 'レイアウト'
        },
        textProp: {
          name: 'コンテンツ',
          alignTitle: 'アライメント',
          alignLeft: '左に',
          alignCenter: '中心',
          alignRight: '右側に',
          colorTitle: 'フォントカラー',
          sizeTitle: 'フォントサイズ',
          boldTitle: '大胆なフォント',
          fontNormal: '従来の',
          fontBold: '大胆な'
        },
        subtableProp: {
          seqTitle: 'シリアルナンバー',
          showSeq: 'シリアル番号を表示します',
          showCheckbox: '複数の選択肢が許可されています',
          errSubDrag: 'サブテーブルはこのコントロールをサポートしていません。他のコントロールを使用してください',
          colPlace: 'コントロールをドラッグします'
        },
        uploadProp: {
          limitFileCount: 'ファイル数量制限',
          limitFileSize: 'ファイルサイズ制限',
          multiFile: '複数のファイルをアップロードします',
          limitImgCount: '写真の数を制限します',
          limitImgSize: '画像サイズの制限',
          multiImg: '複数の写真をアップロードしてください'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'フィールド設定',
      listSettingTab: 'パラメーター設定',
      searchTitle: 'クエリ基準',
      listTitle: 'リストフィールド',
      searchField: 'クエリフィールド',
      listField: 'リストフィールド',
      activeBtn: {
        ActionButtonUpdate: '編集',
        ActionButtonDelete: '消去'
      },
      search: {
        addBtn: '編集',
        emptyText: 'クエリ条件が構成されていません',
        editPopupTitle: 'クエリフィールドを編集します'
      },
      searchPopup: {
        colTitle: 'タイトル',
        saveBtn: '保存'
      }
    },
    text: {
      copySuccess: 'クリップボードにコピーします',
      copyError: '現在の環境はこの操作をサポートしていません'
    },
    countdown: {
      formats: {
        yyyy: '年',
        MM: '月',
        dd: '空',
        HH: '時間',
        mm: 'ポイント',
        ss: '2番'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'この操作は、マージされたセルで実行することはできません',
          multiErr: 'この操作は、複数の選択領域で実行することはできません',
          selectErr: '指定された範囲のセルで動作することができません',
          extendErr: '拡張範囲にマージされたセルが含まれている場合、すべてのマージされたセルは同じサイズでなければなりません',
          pasteMultiErr: '貼り付けることができないため、この操作を実行するには、コピーされたエリアと貼り付けエリアが同じサイズである必要があります',
          cpInvalidErr: '操作は実行できません。選択した範囲に禁止された列（{0}）があります。'
        },
        fnr: {
          title: '見つけて交換します',
          findLabel: '探す',
          replaceLabel: '交換する',
          findTitle: '何を見つける：',
          replaceTitle: '置き換えてください：',
          tabs: {
            find: '探す',
            replace: '交換する'
          },
          filter: {
            re: '正規表現',
            whole: '完全な一致',
            sensitive: '大文字と小文字を区別'
          },
          btns: {
            findNext: '次を見つけます',
            findAll: 'すべてを見つけてください',
            replace: '交換する',
            replaceAll: 'すべてを交換します',
            cancel: 'キャンセル'
          },
          header: {
            seq: '#',
            cell: '細胞',
            value: '価値'
          },
          body: {
            row: '行：{0}',
            col: '列：{0}'
          },
          empty: '（null値）',
          reError: '無効な正規表現',
          recordCount: '{0}セルが見つかりました',
          notCell: '一致するセルは見つかりません',
          replaceSuccess: '{0}セルを正常に交換しました'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: '分组',
          values: '值',
          groupPlaceholder: '拖至此处进行分组',
          valuesPlaceholder: '拖至此处进行聚合',
          dragExistCol: '该列已存在',
          sortHelpTip: '点击并拖动图标可以调整顺序'
        },
        aggFuncs: {
          sum: '求和',
          count: '计数',
          avg: '平均值',
          min: '最小值',
          max: '最大值',
          first: '首个值',
          last: '末尾值'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'フリーズコラム',
          fixedGroup: '凍結グループ',
          cancelFixed: '凍結外',
          fixedLeft: '左フリーズ',
          fixedRight: '右フリーズします'
        },
        cases: {
          equal: '等しい',
          gt: 'より大きい',
          lt: '未満',
          begin: '始まりはです',
          endin: '終わりです',
          include: '含む',
          isSensitive: '大文字と小文字を区別'
        }
      },
      filterCombination: {
        menus: {
          sort: '選別',
          clearSort: 'クリアソート',
          sortAsc: '昇順',
          sortDesc: '降順',
          fixedColumn: 'フリーズコラム',
          fixedGroup: '凍結グループ',
          cancelFixed: '凍結外',
          fixedLeft: '左フリーズ',
          fixedRight: '右フリーズします',
          clearFilter: 'クリアフィルター',
          textOption: 'テキストフィルター',
          numberOption: '数値フィルター'
        },
        popup: {
          title: 'カスタムフィルタリング方法',
          currColumnTitle: '現在の列：',
          and: 'そして',
          or: 'または',
          describeHtml: '利用可能？単一の文字を表す<br/> use *は複数の文字を表します'
        },
        cases: {
          equal: '等しい',
          unequal: '等しくない',
          gt: 'より大きい',
          ge: '以上大きい',
          lt: '未満',
          le: '以下以上',
          begin: '始まりはです',
          notbegin: '最初はありません',
          endin: '終わりです',
          notendin: 'エンディングはそうではありません',
          include: '含む',
          exclude: '含まれていません',
          between: '間',
          custom: 'カスタムフィルター',
          insensitive: '症例は無感覚です',
          isSensitive: '大文字と小文字を区別'
        },
        empty: '（空白）',
        notData: '一致しません'
      }
    },
    pro: {
      area: {
        mergeErr: 'この操作は、マージされたセルで実行することはできません',
        multiErr: 'この操作は、複数の選択領域で実行することはできません',
        extendErr: '拡張範囲にマージされたセルが含まれている場合、すべてのマージされたセルは同じサイズでなければなりません',
        pasteMultiErr: '貼り付けることができないため、この操作を実行するには、コピーされたエリアと貼り付けエリアが同じサイズである必要があります'
      },
      fnr: {
        title: '見つけて交換します',
        findLabel: '探す',
        replaceLabel: '交換する',
        findTitle: 'コンテンツを見つける：',
        replaceTitle: '置き換えてください：',
        tabs: {
          find: '探す',
          replace: '交換する'
        },
        filter: {
          re: '正規表現',
          whole: '完全な一致',
          sensitive: '大文字と小文字を区別'
        },
        btns: {
          findNext: '次を見つけます',
          findAll: 'すべてを見つけてください',
          replace: '交換する',
          replaceAll: 'すべてを交換します',
          cancel: 'キャンセル'
        },
        header: {
          seq: '#',
          cell: '細胞',
          value: '価値'
        },
        empty: '（null値）',
        reError: '無効な正規表現',
        recordCount: '{0}セルが見つかりました',
        notCell: '一致するセルは見つかりません',
        replaceSuccess: '{0}セルを正常に交換しました'
      }
    },
    renderer: {
      search: '検索',
      cases: {
        equal: '等しい',
        unequal: '等しくない',
        gt: 'より大きい',
        ge: '以上大きい',
        lt: '未満',
        le: '以下以上',
        begin: '始まりはです',
        notbegin: '最初はありません',
        endin: '終わりです',
        notendin: 'エンディングはそうではありません',
        include: '含む',
        exclude: '含まれていません',
        between: '間',
        custom: 'カスタムフィルター',
        insensitive: '症例は無感覚です',
        isSensitive: '大文字と小文字を区別'
      },
      combination: {
        menus: {
          sort: '選別',
          clearSort: 'クリアソート',
          sortAsc: '昇順',
          sortDesc: '降順',
          fixedColumn: 'フリーズコラム',
          fixedGroup: '凍結グループ',
          cancelFixed: '凍結外',
          fixedLeft: '左フリーズ',
          fixedRight: '右フリーズします',
          clearFilter: 'クリアフィルター',
          textOption: 'テキストフィルタリング',
          numberOption: '数値フィルタリング'
        },
        popup: {
          title: 'カスタムフィルタリング方法',
          currColumnTitle: '現在の列：',
          and: 'そして',
          or: 'または',
          describeHtml: '利用可能？単一の文字を表す<br/> use *は複数の文字を表します'
        },
        empty: '（空白）',
        notData: '一致しません'
      }
    }
  }
}
