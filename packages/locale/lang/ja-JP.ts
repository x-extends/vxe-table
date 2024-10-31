export default {
  vxe: {
    base: {
      pleaseInput: '入力してください',
      pleaseSelect: '選択してください',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Loading...'
    },
    error: {
      downErr: '下载失败',
      groupFixed: 'ヘッダー結合を使用する場合、固定列はグループで設定しなければなりません',
      groupMouseRange: 'ヘッダー結合と「{0}」は同時に使用できません。これによりエラーが発生する可能性があります',
      groupTag: 'ヘッダー結合は "{0}" を使ってください。 "{1}" はエラーが発生する可能性があります',
      scrollErrProp: '仮想スクロールはこのパラメータを使えません： "{0}"',
      errConflicts: 'パラメータ "{0}" と "{1}" は同時に使えません',
      unableInsert: '指定された位置に挿入できない',
      useErr: '"{0}" モジュールをインストールする際にエラーが発生し、順序が正しくない可能性がある。依存するモジュールはTableの前にインストールする必要がある',
      barUnableLink: 'ツールバーはフォームを関連付けることができない',
      expandContent: '拡張行スロットは "content" である必要があります。確認してください',
      reqComp: 'Require "{0}" component, check whether the install is correct. https://vxeui.com/#/start/useGlobal',
      reqModule: '"{0}" モジュールが必要です',
      reqProp: '必要な "{0}" パラメーターが欠落しているため、エラーが発生する可能性があります',
      emptyProp: '"{0}" プロパティは空白が許可されていません',
      errProp: 'サポートされていないパラメーター "{0}"、"{1}" の可能性があります',
      colRepet: 'column.{0}="{0}" が重複しているため、機能が使えなくなる可能性があります。',
      notFunc: 'メソッド "{0}" がありません',
      errFunc: 'The argument "{0}" is not a method',
      notValidators: 'Global validators "{0}" no existe.',
      notFormats: 'Global formats "{0}" no existe.',
      notCommands: 'Global commands "{0}" no existe.',
      notSlot: 'slot "{0}" がありません',
      noTree: 'Tree structureは "{0}" をサポートしていません',
      notProp: 'サポートされていないパラメータ "{0}"',
      checkProp: 'パフマンス低下になる可能性があります。パラメータ "{0}" の値を指定してください',
      coverProp: 'The parameter "{1}" to "{0}" is repeatedly defined. This may cause an error',
      uniField: '字段名 "{0}" 重复定义，这可能会出现错误',
      delFunc: '"{0}" functionが非推奨です。"{1}"を使用してください',
      delProp: '"{0}" propertyが非推奨です。"{1}"を使用してください',
      delEvent: 'イベント "{0}" が廃止されました。 "{1}" を使用してください',
      removeProp: 'パラメーター "{0}" が非推奨です。エラーが発生する可能性があります',
      errFormat: '全般フォーマットするには "VXETable.formats" で定義してください。 "formatter={0}" での方式が非推奨です',
      notType: 'サポートされていないファイルの種類 "{0}"',
      notExp: 'ご利用のブラウザはインポート/エクスポート機能を利用できません',
      impFields: 'インポートに失敗しました。フィールド名とデータ形式を確認してください',
      treeNotImp: 'ツリーテーブルはインポートをサポートしていません'
    },
    table: {
      emptyText: 'データがありません',
      allTitle: '全て選択/取消',
      seqTitle: 'N/S',
      actionTitle: 'Action',
      confirmFilter: 'OK',
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
      customConfirm: 'OK',
      customClose: '关闭',
      customCancel: 'Cancel',
      customRestore: 'リセット',
      maxFixedCol: '最大固定列数が {0} です。'
    },
    grid: {
      selectOneRecord: '1つ以上のレコードを選択してください',
      deleteSelectRecord: 'レコードを削除してもよろしいですか？',
      removeSelectRecord: 'レコードを削除してもよろしいですか？',
      dataUnchanged: 'データが変更されませんでした',
      delSuccess: '選択したレコードを削除しました',
      saveSuccess: '保存しました',
      operError: 'エラーが発生しました。操作が失敗しました'
    },
    select: {
      search: '検索',
      loadingText: 'Loading',
      emptyText: 'データがありません'
    },
    pager: {
      goto: '移動',
      gotoTitle: '页数',
      pagesize: '{0}件/ページ',
      total: '全 {0} 件',
      pageClassifier: 'ページ',
      homePage: '1ページ目',
      homePageTitle: '1ページ目',
      prevPage: '前のページ',
      prevPageTitle: '前のページ',
      nextPage: '次のページ',
      nextPageTitle: '次のページ',
      prevJump: '前のページに移動',
      prevJumpTitle: '前のページに移動',
      nextJump: '次のページに移動',
      nextJumpTitle: '次のページに移動',
      endPage: '最後ページ',
      endPageTitle: '最後ページ'
    },
    alert: {
      title: '確認'
    },
    button: {
      confirm: 'OK',
      cancel: 'キャンセル'
    },
    filter: {
      search: '検索'
    },
    custom: {
      cstmTitle: '列設定',
      cstmRestore: 'リセット',
      cstmCancel: 'キャンセル',
      cstmConfirm: 'OK',
      cstmConfirmRestore: '列をデフォルト状態に戻します。よろしいですか？',
      cstmDragTarget: '移動ターゲット: {0}',
      setting: {
        colSort: 'ソート',
        sortHelpTip: 'ドラッグして列を並べ替えます',
        colTitle: 'タイトル',
        colResizable: '列の幅 (px)',
        colVisible: '表示する',
        colFixed: '列固定',
        colFixedMax: '列固定（最大 {0} 列）',
        fixedLeft: '左側',
        fixedUnset: '指定しない',
        fixedRight: '右側'
      }
    },
    import: {
      modes: {
        covering: '上書きモード',
        insert: '追加モード（最後行に追加）',
        insertTop: '追加モード（先頭行に追加）',
        insertBottom: '追加モード（最後行に追加）'
      },
      impTitle: 'データインポート',
      impFile: 'ファイル名',
      impSelect: 'ファイル選択',
      impType: 'ファイルの種類',
      impOpts: 'パラメータ指定',
      impMode: 'インポートモード',
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
        selected: '選択したデータ(表示中のページに選択したデータ)',
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
      expConfirm: 'OK',
      expCancel: 'キャンセル'
    },
    modal: {
      errTitle: 'エラー',
      zoomMin: '最小化',
      zoomIn: '最大化',
      zoomOut: '縮小',
      close: '閉じる',
      miniMaxSize: 'The number of minimized Windows cannot exceed {0}.',
      footPropErr: 'show-footer 仅用于启用表尾，需配合 show-confirm-button | show-cancel-button | 插槽使用'
    },
    drawer: {
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
      customRestore: 'リセット',
      fixedLeft: '左側に固定',
      fixedRight: '右側に固定',
      cancelFixed: '列固定を取消'
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
    },
    imagePreview: {
      popupTitle: 'Preview',
      operBtn: {
        zoomOut: 'Reduce',
        zoomIn: 'Enlarge',
        pctFull: 'Proportional scaling',
        pct11: 'Show original size',
        rotateLeft: 'Rotate left',
        rotateRight: 'Rotate right',
        print: 'Click to print',
        download: 'Click to download'
      }
    },
    upload: {
      fileBtnText: 'Click or drag',
      imgBtnText: 'Click or drag',
      dragPlaceholder: 'Please drag and drop the file into this area to upload it.',
      imgSizeHint: 'Single {0}',
      imgCountHint: 'Up to {0}',
      fileTypeHint: 'Support {0} file types',
      fileSizeHint: 'Single file size does not exceed {0}',
      fileCountHint: 'Up to {0} file can be uploaded',
      overCountErr: 'You can only choose {0} file!',
      overCountExtraErr: 'It has exceeded the maximum number {0}, and more than {0} file will be ignored!超出最大数量 1 个，超出的 1 个文件将被忽略！',
      overSizeErr: 'The size of the file is not more than {0}}!',
      reUpload: 'Re upload',
      uploadProgress: 'Uploading {0}%',
      uploadErr: 'Fail to upload',
      uploadSuccess: 'Successfully upload',
      moreBtnText: 'More ({0})',
      viewItemTitle: 'click to view',
      morePopup: {
        readTitle: '查看列表',
        imageTitle: '上传图片',
        fileTitle: '上传文件'
      }
    },
    empty: {
      defText: '暂无数据'
    },
    formDesign: {
      formName: 'Form name',
      defFormTitle: 'Unnamed form',
      widgetPropTab: 'Field property',
      widgetFormTab: 'Form property',
      error: {
        wdFormUni: '该类型的控件在表单中只允许添加一个',
        wdSubUni: '该类型的控件在子表中只允许添加一个'
      },
      styleSetting: {
        btn: 'Style setting',
        title: 'Form style setting',
        layoutTitle: 'Field layout',
        verticalLayout: 'Vertical layout',
        horizontalLayout: 'Horizontal layout',
        styleTitle: 'Title style',
        boldTitle: 'Bold title',
        fontBold: 'Bold',
        fontNormal: 'Normal',
        colonTitle: 'Display colon',
        colonVisible: 'Visible',
        colonHidden: 'Hidden',
        alignTitle: 'Title align',
        widthTitle: 'Title width',
        alignLeft: 'Left',
        alignRight: 'Right',
        unitPx: 'Px',
        unitPct: 'Pct'
      },
      widget: {
        group: {
          base: 'Base control',
          layout: 'Layout control',
          system: 'System control',
          module: 'Module control',
          chart: 'Chart control',
          advanced: 'Advanced control'
        },
        copyTitle: 'Copy_{0}',
        component: {
          input: 'Input',
          textarea: 'Textarea',
          select: 'Select',
          row: 'Row/column',
          title: 'Title',
          text: 'Text',
          subtable: 'Subtable',
          VxeSwitch: 'Yes/no',
          VxeInput: 'Input',
          VxeNumberInput: 'Number',
          VxeDatePicker: 'Date',
          VxeTextarea: 'Textarea',
          VxeSelect: 'Select',
          VxeTreeSelect: 'Tree select',
          VxeRadioGroup: 'Radio',
          VxeCheckboxGroup: 'Checkbox',
          VxeUploadFile: 'File',
          VxeUploadImage: 'Image',
          VxeRate: 'Rate',
          VxeSlider: 'Slider'
        }
      },
      widgetProp: {
        name: 'Field name',
        placeholder: 'Field placeholder',
        required: 'Required',
        multiple: 'Allow to select multiple',
        displaySetting: {
          name: 'Display setting',
          pc: 'PC',
          mobile: 'Mobile',
          visible: 'Visible',
          hidden: 'Hidden'
        },
        dataSource: {
          name: 'Data source',
          defValue: 'Option {0}',
          addOption: 'Add option',
          batchEditOption: 'Batch edit',
          batchEditTip: 'Each row corresponds to an option, supporting direct copying and pasting from tables, Excel, and WPS.',
          batchEditSubTip: 'Each row corresponds to an option. If grouped, the sub items can start with spaces or tab keys, and can be directly copied and pasted from tables, Excel, or WPS.',
          buildOption: 'Build option'
        },
        rowProp: {
          colSize: 'Number of columns',
          col2: 'Two columns',
          col3: 'Three columns',
          col4: 'Four columns',
          col6: 'Six columns',
          layout: 'Layout'
        },
        textProp: {
          name: 'Content',
          alignTitle: 'Align',
          alignLeft: 'Left',
          alignCenter: 'Center',
          alignRight: 'Right',
          colorTitle: 'Color',
          sizeTitle: 'Font size',
          boldTitle: 'Font bold',
          fontNormal: 'Normal',
          fontBold: 'Bold'
        },
        subtableProp: {
          seqTitle: 'S/N',
          showSeq: 'Display serial number',
          showCheckbox: 'Allow multiple selections',
          errSubDrag: 'The sub table does not support this control. Please use another control.',
          colPlace: '将控件拖拽进来'
        },
        uploadProp: {
          limitFileCount: 'File quantity limitation',
          limitFileSize: 'File size limitation',
          multiFile: 'Allows multiple files',
          limitImgCount: 'Image quantity limitation',
          limitImgSize: 'Image size limitation',
          multiImg: 'Allows multiple images'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Field',
      listSettingTab: 'Parameter',
      searchTitle: 'Search',
      listTitle: 'List',
      searchField: 'Search field',
      listField: 'List field',
      activeBtn: {
        ActionButtonUpdate: 'Edit',
        ActionButtonDelete: 'Delete'
      },
      search: {
        addBtn: 'Edit',
        emptyText: 'No filter condition is configured.',
        editPopupTitle: '编辑查询字段'
      },
      searchPopup: {
        colTitle: '标题',
        saveBtn: '保存'
      }
    },
    text: {
      copySuccess: 'Successfully copied to clipboard.',
      copyError: 'The current environment does not support this operation.'
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
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '該当セルに操作できません',
          multiErr: '複数の選択箇所に操作できません',
          extendErr: '結合セルが含まれている場合、すべての結合セルのサイズが同じでなければなりません',
          pasteMultiErr: 'ペーストできません。同じサーズの領域を選択してください',
          cpInvalidErr: '操作できません。選択禁止の列（{0}）が選択されています'
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
      filterComplexInput: {
        menus: {
          fixedColumn: '列ロック',
          fixedGroup: 'グループロック',
          cancelFixed: 'ロック解除',
          fixedLeft: '左側ロック',
          fixedRight: '右側ロック'
        },
        cases: {
          equal: 'イコール',
          gt: '大なり',
          lt: '小なり',
          begin: '先頭は',
          endin: '末尾は',
          include: '含む',
          isSensitive: '大文字小文字区別する'
        }
      },
      filterCombination: {
        menus: {
          clearSort: 'ソートクリア',
          sortAsc: '昇順',
          sortDesc: '降順',
          fixedColumn: '列ロック',
          fixedGroup: 'グループロック',
          cancelFixed: 'ロック解除',
          fixedLeft: '左側ロック',
          fixedRight: '右側ロック',
          clearFilter: '絞り込みクリア',
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
        empty: '(空白)',
        notData: 'データなし'
      }
    },
    renderer: {
      search: '搜索',
      cases: {
        equal: '等于',
        unequal: '不等于',
        gt: '大于',
        ge: '大于或等于',
        lt: '小于',
        le: '小于或等于',
        begin: '开头是',
        notbegin: '开头不是',
        endin: '结尾是',
        notendin: '结尾不是',
        include: '包含',
        exclude: '不包含',
        between: '介于',
        custom: '自定义筛选',
        insensitive: '不区分大小写',
        isSensitive: '区分大小写'
      },
      combination: {
        menus: {
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '冻结列',
          fixedGroup: '冻结分组',
          cancelFixed: '取消冻结',
          fixedLeft: '冻结到左侧',
          fixedRight: '冻结到右侧',
          clearFilter: '清除筛选',
          textOption: '文本筛选',
          numberOption: '数值筛选'
        },
        popup: {
          title: '自定义筛选的方式',
          currColumnTitle: '当前列：',
          and: '与',
          or: '或',
          describeHtml: '可用 ? 代表单个字符<br/>用 * 代表任意多个字符'
        },
        empty: '(空白)',
        notData: '无匹配项'
      }
    },
    pro: {
      area: {
        mergeErr: '无法对合并单元格进行该操作',
        multiErr: '无法对多重选择区域进行该操作',
        extendErr: '如果延伸的区域包含被合并的单元格，所有合并的单元格需大小相同',
        pasteMultiErr: '无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作'
      },
      fnr: {
        title: '查找和替换',
        findLabel: '查找',
        replaceLabel: '替换',
        findTitle: '查找内容：',
        replaceTitle: '替换为：',
        tabs: {
          find: '查找',
          replace: '替换'
        },
        filter: {
          re: '正则表达式',
          whole: '全词匹配',
          sensitive: '区分大小写'
        },
        btns: {
          findNext: '查找下一个',
          findAll: '查找全部',
          replace: '替换',
          replaceAll: '替换全部',
          cancel: '取消'
        },
        header: {
          seq: '#',
          cell: '单元格',
          value: '值'
        },
        empty: '(空值)',
        reError: '无效的正则表达式',
        recordCount: '已找到 {0} 个单元格',
        notCell: '找不到匹配的单元格',
        replaceSuccess: '成功替换 {0} 个单元格'
      }
    }
  }
}
