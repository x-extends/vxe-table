export default {
  vxe: {
    base: {
      pleaseInput: '请输入',
      pleaseSelect: '请选择',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: '加载中...'
    },
    error: {
      downErr: '下载失败',
      errLargeData: '当绑定的数据量过大时，应该请使用 {0}，否则可能会出现卡顿',
      groupFixed: '如果使用分组表头，冻结列必须按组设置',
      groupMouseRange: '分组表头与 "{0}" 不能同时使用，这可能会出现错误',
      groupTag: '分组列头应该使用 "{0}" 而不是 "{1}"，这可能会出现错误',
      scrollErrProp: '启用虚拟滚动后不支持该参数 "{0}"',
      errConflicts: '参数 "{0}" 与 "{1}" 有冲突',
      notSupportProp: '当启用参数 "{0}" 时不支持 "{1}"，应该为 "{2}"，否则将会出现错误',
      notConflictProp: '当使用 "{0}" 时，应该设置 "{1}"，否则可能会存在功能冲突',
      unableInsert: '无法插入到指定位置，请检查参数是否正确',
      useErr: '安装 "{0}" 模块时发生错误，可能顺序不正确，依赖的模块需要在 Table 之前安装',
      barUnableLink: '工具栏无法关联表格',
      expandContent: '展开行的插槽应该是 "content"，请检查是否正确',
      reqComp: '缺少 "{0}" 组件，请检查是否正确安装。 https://vxeui.com/#/start/useGlobal',
      reqModule: '缺少 "{0}" 模块',
      reqProp: '缺少必要的 "{0}" 参数，这可能会导致出现错误',
      emptyProp: '参数 "{0}" 不允许为空',
      errProp: '不支持的参数 "{0}"，可能为 "{1}"',
      colRepet: 'column.{0}="{1}" 重复了，这可能会导致某些功能无法使用',
      notFunc: '方法 "{0}" 不存在',
      errFunc: '参数 "{0}" 不是一个方法',
      notValidators: '全局校验 "{0}" 不存在',
      notFormats: '全局格式化 "{0}" 不存在',
      notCommands: '全局指令 "{0}" 不存在',
      notSlot: '插槽 "{0}" 不存在',
      noTree: '树结构不支持 "{0}"',
      notProp: '不支持的参数 "{0}"',
      checkProp: '当数据量过大时可能会导致复选框卡顿，建议设置参数 "{0}" 提升渲染速度',
      coverProp: '"{0}" 的参数 "{1}" 重复定义，这可能会出现错误',
      uniField: '字段名 "{0}" 重复定义，这可能会出现错误',
      repeatKey: '主键重复 {0}="{1}"，这可能会出现错误',
      delFunc: '方法 "{0}" 已废弃，请使用 "{1}"',
      delProp: '参数 "{0}" 已废弃，请使用 "{1}"',
      delEvent: '事件 "{0}" 已废弃，请使用 "{1}"',
      removeProp: '参数 "{0}" 已废弃，不建议使用，这可能会导致出现错误',
      errFormat: '全局的格式化内容应该使用 "VXETable.formats" 定义，挂载 "formatter={0}" 的方式已不建议使用',
      notType: '不支持的文件类型 "{0}"',
      notExp: '该浏览器不支持导入/导出功能',
      impFields: '导入失败，请检查字段名和数据格式是否正确',
      treeNotImp: '树表格不支持导入',
      treeCrossDrag: '只能拖拽第一层级',
      treeDragChild: '父级不能拖拽到自己的子级中',
      reqPlugin: '扩展插件未安装 "{1}" https://vxeui.com/other{0}/#/{1}/install',
      errMaxRow: '超过支持的最大数据量 {0} 行，这可能会导致出现错误'
    },
    table: {
      emptyText: 'لا توجد بيانات حتى الآن',
      allTitle: 'تحديد الكل/إلغاء',
      seqTitle: 'رقم سري',
      actionTitle: 'تعمل',
      confirmFilter: 'فلتر',
      resetFilter: 'إعادة ضبط',
      allFilter: 'الجميع',
      sortAsc: 'ترتيب تصاعدي: من الأدنى إلى الأعلى',
      sortDesc: 'الترتيب التنازلي: من الأعلى إلى الأدنى',
      filter: 'تمكين التصفية على الأعمدة المحددة',
      impSuccess: 'تم استيراد {0} من السجلات بنجاح',
      expLoading: 'تصدير',
      expSuccess: 'تم التصدير بنجاح',
      expError: 'فشل التصدير',
      expFilename: 'تصدير_{0}',
      expOriginFilename: 'تصدير_مصدر_{0}',
      customTitle: 'إعدادات العمود',
      customAll: 'الجميع',
      customConfirm: 'يتأكد',
      customClose: 'إنهاء',
      customCancel: 'يلغي',
      customRestore: 'استعادة الافتراضي',
      maxFixedCol: 'لا يمكن أن يتجاوز الحد الأقصى لعدد الأعمدة المجمدة {0}',
      dragTip: 'نقل: {0}',
      resizeColTip: 'Width: {0} Pixels',
      resizeRowTip: 'Height: {0} Pixels',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: '请至少选择一条记录！',
      deleteSelectRecord: '您确定要删除所选记录吗？',
      removeSelectRecord: '您确定要移除所选记录吗？',
      dataUnchanged: '数据未改动！',
      delSuccess: '成功删除所选记录！',
      saveSuccess: '保存成功！',
      operError: '发生错误，操作失败！'
    },
    select: {
      search: '搜索',
      loadingText: '加载中',
      emptyText: '暂无数据'
    },
    pager: {
      goto: '前往',
      gotoTitle: '页数',
      pagesize: '{0}条/页',
      total: '共 {0} 条记录',
      pageClassifier: '页',
      homePage: '首页',
      homePageTitle: '首页',
      prevPage: '上一页',
      prevPageTitle: '上一页',
      nextPage: '下一页',
      nextPageTitle: '下一页',
      prevJump: '向上跳页',
      prevJumpTitle: '向上跳页',
      nextJump: '向下跳页',
      nextJumpTitle: '向下跳页',
      endPage: '末页',
      endPageTitle: '末页'
    },
    alert: {
      title: '系统提示'
    },
    button: {
      confirm: '确认',
      cancel: '取消',
      clear: '清除'
    },
    filter: {
      search: '搜索'
    },
    custom: {
      cstmTitle: '列设置',
      cstmRestore: '恢复默认',
      cstmCancel: '取消',
      cstmConfirm: '确定',
      cstmConfirmRestore: '请确认是否恢复成默认列配置？',
      cstmDragTarget: '移动：{0}',
      setting: {
        colSort: '排序',
        sortHelpTip: '点击并拖动图标可以调整列的排序',
        colTitle: '列标题',
        colResizable: '列宽（像素）',
        colVisible: '是否显示',
        colFixed: '冻结列',
        colFixedMax: '冻结列（最多 {0} 列）',
        fixedLeft: '左侧',
        fixedUnset: '不设置',
        fixedRight: '右侧'
      }
    },
    import: {
      modes: {
        covering: '覆盖方式（直接覆盖表格数据）',
        insert: '底部追加（在表格的底部追加新数据）',
        insertTop: '顶部追加（在表格的顶部追加新数据）',
        insertBottom: '底部追加（在表格的底部追加新数据）'
      },
      impTitle: '导入数据',
      impFile: '文件名',
      impSelect: '选择文件',
      impType: '文件类型',
      impOpts: '参数设置',
      impMode: '导入模式',
      impConfirm: '导入',
      impCancel: '取消'
    },
    export: {
      types: {
        csv: 'CSV (逗号分隔)(*.csv)',
        html: '网页(*.html)',
        xml: 'XML 数据(*.xml)',
        txt: '文本文件(制表符分隔)(*.txt)',
        xls: 'Excel 97-2003 工作簿(*.xls)',
        xlsx: 'Excel 工作簿(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: '空数据',
        current: '当前数据（当前页的数据）',
        selected: '选中数据（当前页选中的数据）',
        all: '全量数据（包括所有分页的数据）'
      },
      printTitle: '打印数据',
      expTitle: '导出数据',
      expName: '文件名',
      expNamePlaceholder: '请输入文件名',
      expSheetName: '标题',
      expSheetNamePlaceholder: '请输入标题',
      expType: '保存类型',
      expMode: '选择数据',
      expCurrentColumn: '全部字段',
      expColumn: '选择字段',
      expOpts: '参数设置',
      expOptHeader: '表头',
      expHeaderTitle: '是否需要表头',
      expOptFooter: '表尾',
      expFooterTitle: '是否需要表尾',
      expOptColgroup: '分组表头',
      expOptTitle: '列标题',
      expTitleTitle: '是否为列标题，否则显示为列的字段名',
      expColgroupTitle: '如果存在，则支持带有分组结构的表头',
      expOptMerge: '合并',
      expMergeTitle: '如果存在，则支持带有合并结构的单元格',
      expOptAllExpand: '展开树',
      expAllExpandTitle: '如果存在，则支持将带有层级结构的数据全部展开',
      expOptUseStyle: '样式',
      expUseStyleTitle: '如果存在，则支持带样式的单元格',
      expOptOriginal: '源数据',
      expOriginalTitle: '如果为源数据，则支持导入到表格中',
      expPrint: '打印',
      expConfirm: '导出',
      expCancel: '取消'
    },
    modal: {
      errTitle: '错误提示',
      zoomMin: '最小化',
      zoomIn: '最大化',
      zoomOut: '还原',
      close: '关闭',
      miniMaxSize: '最小化窗口的数量不能超过 {0} 个',
      footPropErr: 'show-footer 仅用于启用表尾，需配合 show-confirm-button | show-cancel-button | 插槽使用'
    },
    drawer: {
      close: '关闭'
    },
    form: {
      folding: '收起',
      unfolding: '展开'
    },
    toolbar: {
      import: '导入',
      export: '导出',
      print: '打印',
      refresh: '刷新',
      zoomIn: '全屏',
      zoomOut: '还原',
      custom: '列设置',
      customAll: '全部',
      customConfirm: '确认',
      customRestore: '重置',
      fixedLeft: '冻结在左侧',
      fixedRight: '冻结在右侧',
      cancelFixed: '取消冻结列'
    },
    datePicker: {
      yearTitle: '{0} 年'
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
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: '预览',
      operBtn: {
        zoomOut: '缩小',
        zoomIn: '放大',
        pctFull: '等比例缩放',
        pct11: '显示原始尺寸',
        rotateLeft: '向左旋转',
        rotateRight: '向右旋转',
        print: '点击打印图片',
        download: '点击下载图片'
      }
    },
    upload: {
      fileBtnText: '点击或拖拽上传',
      imgBtnText: '点击或拖拽上传',
      dragPlaceholder: '请把文件拖放到这个区域即可上传',
      imgSizeHint: '单张{0}',
      imgCountHint: '最多{0}张',
      fileTypeHint: '支持 {0} 文件类型',
      fileSizeHint: '单个文件大小不超过{0}',
      fileCountHint: '最多可上传{0}个文件',
      uploadTypeErr: '文件类型不匹配！',
      overCountErr: '最多只能选择{0}个文件！',
      overCountExtraErr: '已超出最大数量{0}个，超出的{1}个文件将被忽略！',
      overSizeErr: '文件大小最大不能超过{0}！',
      reUpload: '重新上传',
      uploadProgress: '上传中 {0}%',
      uploadErr: '上传失败',
      uploadSuccess: '上传成功',
      moreBtnText: '更多（{0}）',
      viewItemTitle: '点击查看',
      morePopup: {
        readTitle: '查看列表',
        imageTitle: '上传图片',
        fileTitle: '上传文件'
      }
    },
    empty: {
      defText: '暂无数据'
    },
    colorPicker: {
      clear: '清除',
      confirm: '确认',
      copySuccess: '已复制到剪贴板：{0}'
    },
    formDesign: {
      formName: '表单名称',
      defFormTitle: '未命名的表单',
      widgetPropTab: '控件属性',
      widgetFormTab: '表单属性',
      error: {
        wdFormUni: '该类型的控件在表单中只允许添加一个',
        wdSubUni: '该类型的控件在子表中只允许添加一个'
      },
      styleSetting: {
        btn: '样式设置',
        title: '表单的样式设置',
        layoutTitle: '控件布局',
        verticalLayout: '上下布局',
        horizontalLayout: '横向布局',
        styleTitle: '标题样式',
        boldTitle: '标题加粗',
        fontBold: '加粗',
        fontNormal: '常规',
        colonTitle: '显示冒号',
        colonVisible: '显示',
        colonHidden: '隐藏',
        alignTitle: '对齐方式',
        widthTitle: '标题宽度',
        alignLeft: '居左',
        alignRight: '居右',
        unitPx: '像素',
        unitPct: '百分比'
      },
      widget: {
        group: {
          base: '基础控件',
          layout: '布局控件',
          system: '系统控件',
          module: '模块控件',
          chart: '图表控件',
          advanced: '高级控件'
        },
        copyTitle: '副本_{0}',
        component: {
          input: '输入框',
          textarea: '文本域',
          select: '下拉选择',
          row: '一行多列',
          title: '标题',
          text: '文本',
          subtable: '子表',
          VxeSwitch: '是/否',
          VxeInput: '输入框',
          VxeNumberInput: '数字',
          VxeDatePicker: '日期',
          VxeTextarea: '文本域',
          VxeSelect: '下拉选择',
          VxeTreeSelect: '树形选择',
          VxeRadioGroup: '单选框',
          VxeCheckboxGroup: '复选框',
          VxeUploadFile: '文件',
          VxeUploadImage: '图片',
          VxeRate: '评分',
          VxeSlider: '滑块'
        }
      },
      widgetProp: {
        name: '控件名称',
        placeholder: '提示语',
        required: '必填校验',
        multiple: '允许多选',
        displaySetting: {
          name: '显示设置',
          pc: '电脑端',
          mobile: '手机端',
          visible: '显示',
          hidden: '隐藏'
        },
        dataSource: {
          name: '数据源',
          defValue: '选项{0}',
          addOption: '添加选项',
          batchEditOption: '批量编辑',
          batchEditTip: '每行对应一个选项，支持从表格、Excel、WPS 中直接复制粘贴。',
          batchEditSubTip: '每行对应一个选项，如果是分组，子项可以是空格或制表键开头，支持从表格、Excel、WPS 中直接复制粘贴。',
          buildOption: '生成选项'
        },
        rowProp: {
          colSize: '列数',
          col2: '两列',
          col3: '三列',
          col4: '四列',
          col6: '六列',
          layout: '布局'
        },
        textProp: {
          name: '内容',
          alignTitle: '对齐方式',
          alignLeft: '居左',
          alignCenter: '居中',
          alignRight: '居右',
          colorTitle: '字体颜色',
          sizeTitle: '字体大小',
          boldTitle: '字体加粗',
          fontNormal: '常规',
          fontBold: '加粗'
        },
        subtableProp: {
          seqTitle: '序号',
          showSeq: '显示序号',
          showCheckbox: '允许多选',
          errSubDrag: '子表不支持该控件，请使用其他控件',
          colPlace: '将控件拖拽进来'
        },
        uploadProp: {
          limitFileCount: '文件数量限制',
          limitFileSize: '文件大小限制',
          multiFile: '允许上传多个文件',
          limitImgCount: '图片数量限制',
          limitImgSize: '图片大小限制',
          multiImg: '允许上传多张图片'
        }
      }
    },
    listDesign: {
      fieldSettingTab: '字段设置',
      listSettingTab: '参数设置',
      searchTitle: '查询条件',
      listTitle: '列表字段',
      searchField: '查询字段',
      listField: '列表字段',
      activeBtn: {
        ActionButtonUpdate: '编辑',
        ActionButtonDelete: '删除'
      },
      search: {
        addBtn: '编辑',
        emptyText: '未配置查询条件',
        editPopupTitle: '编辑查询字段'
      },
      searchPopup: {
        colTitle: '标题',
        saveBtn: '保存'
      }
    },
    text: {
      copySuccess: '已复制到剪贴板',
      copyError: '当前环境不支持该操作'
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
          mergeErr: '无法对合并单元格进行该操作',
          multiErr: '无法对多重选择区域进行该操作',
          selectErr: '无法操作指定区域的单元格',
          extendErr: '如果延伸的区域包含被合并的单元格，所有合并的单元格需大小相同',
          pasteMultiErr: '无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作',
          cpInvalidErr: '该操作无法进行，您选择的区域中存在被禁止的列（{0}）'
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
          body: {
            row: '行：{0}',
            col: '列：{0}'
          },
          empty: '(空值)',
          reError: '无效的正则表达式',
          recordCount: '已找到 {0} 个单元格',
          notCell: '找不到匹配的单元格',
          replaceSuccess: '成功替换 {0} 个单元格'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: '冻结列',
          fixedGroup: '冻结分组',
          cancelFixed: '取消冻结',
          fixedLeft: '冻结左侧',
          fixedRight: '冻结右侧'
        },
        cases: {
          equal: '等于',
          gt: '大于',
          lt: '小于',
          begin: '开头是',
          endin: '结尾是',
          include: '包含',
          isSensitive: '区分大小写'
        }
      },
      filterCombination: {
        menus: {
          sort: '排序',
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '冻结列',
          fixedGroup: '冻结分组',
          cancelFixed: '取消冻结',
          fixedLeft: '冻结左侧',
          fixedRight: '冻结右侧',
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
          sort: '排序',
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
    }
  }
}
