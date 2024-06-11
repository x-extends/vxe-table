/**
 * v4保留兼容，已废弃，即将删除文件
 * @deprecated
 */
export default {
  vxe: {
    base: {
      pleaseInput: '请输入',
      pleaseSelect: '请选择'
    },
    loading: {
      text: '加载中...'
    },
    error: {
      groupFixed: '如果使用分组表头，冻结列必须按组设置',
      groupMouseRange: '分组表头与 "{0}" 不能同时使用，这可能会出现错误',
      groupTag: '分组列头应该使用 "{0}" 而不是 "{1}"，这可能会出现错误',
      scrollErrProp: '启用虚拟滚动后不支持该参数 "{0}"',
      errConflicts: '参数 "{0}" 与 "{1}" 有冲突',
      unableInsert: '无法插入到指定位置，请检查参数是否正确',
      useErr: '安装 "{0}" 模块时发生错误，可能顺序不正确，依赖的模块需要在 Table 之前安装',
      barUnableLink: '工具栏无法关联表格',
      expandContent: '展开行的插槽应该是 "content"，请检查是否正确',
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
      delFunc: '方法 "{0}" 已废弃，请使用 "{1}"',
      delProp: '参数 "{0}" 已废弃，请使用 "{1}"',
      delEvent: '事件 "{0}" 已废弃，请使用 "{1}"',
      removeProp: '参数 "{0}" 已废弃，不建议使用，这可能会导致出现错误',
      errFormat: '全局的格式化内容应该使用 "VXETable.formats" 定义，挂载 "formatter={0}" 的方式已不建议使用',
      notType: '不支持的文件类型 "{0}"',
      notExp: '该浏览器不支持导入/导出功能',
      impFields: '导入失败，请检查字段名和数据格式是否正确',
      treeNotImp: '树表格不支持导入'
    },
    table: {
      emptyText: '暂无数据',
      allTitle: '全选/取消',
      seqTitle: '#',
      confirmFilter: '筛选',
      resetFilter: '重置',
      allFilter: '全部',
      sortAsc: '升序：最低到最高',
      sortDesc: '降序：最高到最低',
      filter: '对所选的列启用筛选',
      impSuccess: '成功导入 {0} 条记录',
      expLoading: '正在导出中',
      expSuccess: '导出成功',
      expFilename: '导出_{0}',
      expOriginFilename: '导出_源_{0}',
      customTitle: '列设置',
      customAll: '全部',
      customConfirm: '确认',
      customRestore: '重置',
      maxFixedCol: '最大冻结列的数量不能超过 {0} 个'
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
      cancel: '取消'
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
      cstmDragTarget: '移动目标：{0}',
      setting: {
        colSort: '排序',
        sortHelpTip: '点击并拖动图标可以调整列的排序',
        colTitle: '标题',
        colVisible: '是否显示',
        colFixed: '冻结列（最多 {0} 列）',
        fixedLeft: '左侧',
        fixedUnset: '不设置',
        fixedRight: '右侧'
      }
    },
    import: {
      modes: {
        covering: '覆盖',
        insert: '新增'
      },
      impTitle: '导入数据',
      impFile: '文件名',
      impSelect: '选择文件',
      impType: '文件类型',
      impOpts: '参数设置',
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
      expColgroupTitle: '如果存在，则支持带有分组结构的表头',
      expOptMerge: '合并',
      expMergeTitle: '如果存在，则支持带有合并结构的单元格',
      expOptAllExpand: '展开层级',
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
      zoomIn: '最大化',
      zoomOut: '还原',
      close: '关闭'
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
    formDesign: {
      widget: {
        input: '输入框',
        textarea: '文本域',
        select: '下拉框'
      }
    },

    /**
     * 扩展插件
     */
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '无法对合并单元格进行该操作',
          multiErr: '无法对多重选择区域进行该操作',
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

    /**
     * 以下废弃
     * @deprecated
     */
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
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '锁定列',
          fixedGroup: '锁定组',
          cancelFixed: '取消锁定',
          fixedLeft: '锁定左侧',
          fixedRight: '锁定右侧',
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
