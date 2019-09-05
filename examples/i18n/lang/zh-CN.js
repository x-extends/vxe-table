module.exports = {
  app: {
    aside: {
      nav: {
        start: '开发指南',
        install: '安装',
        global: '全局参数',
        use: '快速上手',
        theme: '自定义主题',
        i18n: '国际化',

        icon: '图标',
        basics: '基础功能',
        base: '基础',
        size: '尺寸',
        ellipsis: '内容显示省略号',
        stripe: '斑马线条纹',
        border: '边框',
        style: '单元格样式',
        hideHead: '隐藏头部',
        resizable: '列宽拖动',
        fluidHeight: '流体高度',
        resize: '响应式宽高',
        height: '固定表头',
        fixed: '固定列',
        fullFixed: '固定表头和列',
        group: '表头分组',
        seq: '序号',
        headerHighlight: '高亮列',
        current: '高亮行',
        radio: '单选框',
        checkbox: '复选框',
        sort: '排序',
        filter: '筛选',
        empty: '空数据',
        loading: '加载中',
        format: '格式化内容',

        more: '更多功能',
        events: '事件绑定',
        template: '自定义模板',
        customSort: '自定义列头排序',
        manualFilter: '手动筛选',
        span: '合并行或列',
        footer: '表尾合计',
        export: '导出 CSV',
        contextMenu: '快捷菜单',
        menuPrivilege: '快捷菜单 + 权限控制',
        expandRow: '展开行',
        toolbar: '工具栏',
        customs: '自定义列',
        customStorage: '自定义列 + localStorage',
        customlWidthStorage: '自定义列&列宽 + localStorage',
        search: '全表搜索',
        pager: '分页',

        tree: '树形表格',
        edit: '可编辑',
        crudToolbar: '增删改查 + 工具栏',
        lazy: '懒加载',
        full: '完整功能',

        grid: '配置式表格',
        reverse: '反转表格',
        proxy: '数据代理',
        proxyPage: '数据代理 + 分页',
        fullQuery: '完整查询',
        customToolbar: '自定义工具栏',
        dynamicColumn: '实现可配置动态列',
        baseTree: '基础树',
        crudTreeToolbar: '树 + 增删改查 + 工具栏',

        scroll: '大数据表格',
        bigData: '虚拟滚动',
        big1wRow: '1 万行',
        big10wRow: '10 万行 + 更复杂渲染',
        big1wRow1wCol: '1 万行 1 万列',
        big10wRow1wCol: '10 万行 1 万列 + 更复杂渲染',
        treeScroll: '树结构',
        pageScroll: '滚动分页',
        infiniteScroll: '无限滚动',

        editable: '可编辑表格',
        manual: '手动触发',
        click: '点击触发',
        dblclick: '双击触发',
        select: '选中内容',
        autoClear: '关闭自动清除',
        insert: '插入数据',
        delete: '删除数据',
        revert: '还原数据',
        status: '编辑状态',
        cellDisable: '禁用编辑 cell',
        rowDisable: '禁用编辑 row',
        cellVaild: '数据校验 call',
        rowVaild: '数据校验 row',
        forceCellValid: '数据校验 cell + 强制锁定',
        forceRowVaild: '数据校验 row + 强制锁定',
        keyboard: '键盘导航',

        excel: '更多实现',
        cell: '单元格',

        module: '功能模块',
        button: '按钮',
        input: '输入框',
        modal: '模态窗口',
        tooltip: '文字提示',

        other: '集成第三方库',
        elementRender: 'element-ui -> 单元格',
        iviewRender: 'iview -> 单元格',
        antd: 'ant-design-vue -> 单元格',
        sortablejsRow: 'sortablejs -> 行拖拽',
        sortablejsColumn: 'sortablejs -> 列拖拽',
        xlsxRender: 'xlsx -> 导出 xlsx',

        plugin: '插件库',
        elementPlugin: 'plugin-element 基本配置',
        elementFilterPlugin: 'plugin-element 筛选配置',
        elementPluginMore: 'plugin-element 更多配置',
        iviewPlugin: 'plugin-iview 基本配置',
        iviewFilter: 'plugin-iview 筛选配置',
        iviewPluginMore: 'plugin-iview 更多配置',
        antdPlugin: 'plugin-antd 基本配置',
        antdFilter: 'plugin-antd 筛选配置',
        antdPluginMore: 'plugin-antd 更多配置',
        spanPlugin: '单元格选中合并',
        shortcutKeyPlugin: 'plugin-shortcut-key 快捷键设置',
        chartsPlugin: 'plugin-charts 图表工具',
        rendererPlugin: 'plugin-renderer 更多渲染器',
        menusPlugin: 'plugin-menus 快捷菜单集',

        renderer: '(抽象) 渲染器',
        rendererFilter: '筛选渲染器',
        rendererDefault: '默认的渲染器',
        rendererEdit: '可编辑渲染器',

        bottons: '(抽象) 工具栏按钮',
        menus: '(抽象) 快捷菜单',
        interceptor: '(兼容) 事件拦截器',

        optimize: '优化建议',
        optimizeScroller: '虚拟滚动优化',
        optimizeEdit: '可编辑优化',

        api: 'API',
        vxeTable: 'vxe-table',
        vxeTableColumn: 'vxe-table-column',
        vxeGrid: 'vxe-grid',
        vxeExcel: 'vxe-excel',
        vxeToolbar: 'vxe-toolbar',
        vxePager: 'vxe-pager',
        vxeRadio: 'vxe-radio',
        vxeCheckbox: 'vxe-checkbox',
        vxeInput: 'vxe-input',
        vxeTextarea: 'vxe-textarea',
        vxeButton: 'vxe-button',
        vxeTooltip: 'vxe-tooltip',
        vxeModal: 'vxe-modal'
      }
    },
    body: {
      button: {
        viewCode: '查看代码',
        runDemo: '在线运行',
        showCode: '显示代码',
        refresh: '刷新',
        insert: '新增',
        save: '保存',
        markCancel: '标记/取消',
        deleteSelectedRecords: '删除选中'
      },
      label: {
        copy: '复制',
        cut: '剪贴',
        paste: '粘贴',
        delete: '删除',
        sort: '排序',
        filter: '筛选',
        translations: '语言',
        version: '版本',
        name: '名字',
        age: '年龄',
        sex: '性别',
        createTime: '创建时间',
        updateTime: '更新时间'
      },
      valid: {
        rName: '名称必须填写'
      },
      msg: {
        error: '错误提示',
        copyToClipboard: '已复制到剪贴板！'
      }
    },
    footer: {
      donation: '捐赠',
      donationDesc: '为了使项目能够健康持续的发展下去，你可以通过赞助来支持作者 😊'
    },
    api: {
      form: {
        apiSearch: 'API 搜索'
      },
      title: {
        prop: '属性',
        desc: '说明',
        type: '类型 / 返回类型',
        enum: '可选值',
        defVal: '默认值 / 参数',
        props: '参数',
        events: '事件',
        slots: '插槽',
        methods: '方法'
      },
      table: {
        desc: {
          data: '显示的数据',
          columns: '列配置项',
          customs: '初始化显示/隐藏列（通过 visible 设置为 false 则默认隐藏列）',
          height: '表格的高度；支持铺满父容器或者固定宽高',
          maxHeight: '表格的最大高度',
          syncResize: '响应式跟随某个属性（对于通过某个属性来控制显示/隐藏切换的场景可能会用到）',
          autoResize: '父元素响应式监听（对于父元素可能存在动态变化的场景可能会用到）',
          resizable: '所有的列是否允许拖动列宽调整大小',
          stripe: '是否带有斑马纹',
          border: '是否带有纵向边框',
          size: '表格的尺寸',
          fit: '所有列的宽度是否自撑开',
          loading: '表格是否显示加载中',
          align: '所有的列对其方式',
          headerAlign: '所有的表头列的对齐方式',
          showHeader: '是否显示表头',
          startIndex: '只对 type=index 的列有效，动态索引的起始值',
          highlightCurrentRow: '是否要高亮当前行',
          highlightHoverRow: '鼠标移到行是否要高亮显示',
          highlightCurrentColumn: '是否要高亮当前列',
          highlightHoverColumn: '鼠标移到列是否要高亮显示',
          rowClassName: '给行附加 className，也可以是函数 Function({seq, row, rowIndex, $rowIndex})',
          cellClassName: '给单元格附加 className，也可以是函数 Function({seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex})',
          headerRowClassName: '给表头的行附加 className，也可以是函数 Function({$rowIndex})',
          headerCellClassName: '给表头的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
          footerRowClassName: '给表尾的行附加 className，也可以是函数 Function({$rowIndex})',
          footerCellClassName: '给表尾的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
          showFooter: '是否显示表尾合计',
          footerMethod: '表尾合计的计算方法 Function({columns, data})',
          spanMethod: '合并行或列，该函数 Function({seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, data}) 返回计算后的值',
          showOverflow: '设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）',
          showHeaderOverflow: '设置表头所有内容过长时显示为省略号',
          showAllOverflow: '即将废弃，请使用 show-overflow',
          showHeaderAllOverflow: '即将废弃，请使用 show-header-overflow',
          sortMethod: '自定义所有列的排序方法，当触发排序时会调用该函数 Function({ data, column, property, order  }) 返回排序后的结果',
          remoteSort: '所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理',
          remoteFilter: '所有列是否使用服务端筛选，如果设置为 true 则不会对数据进行处理',
          columnWidth: '所有列宽度',
          columnMinWidth: '所有最小列宽度；会自动将剩余空间按比例分配',
          columnKey: '是否需要为每一列的 VNode 设置 key 属性（非特殊情况下不需要使用）',
          rowKey: '是否需要为每一行的 VNode 设置 key 属性（非特殊情况下没必要设置）',
          rowId: '自定义行数据唯一主键的字段名（行数据必须要有唯一主键，默认自动生成）',
          sortConfig: '排序配置项',
          radioConfig: '单选框配置项',
          selectConfig: '复选框配置项',
          tooltipConfig: 'tooltip 配置项',
          expandConfig: '展开行配置项',
          treeConfig: '树形结构配置项',
          contextMenu: '快捷菜单配置项',
          mouseConfig: '鼠标配置项',
          keyboardConfig: '按键配置项',
          editConfig: '可编辑配置项',
          validConfig: '校验配置项',
          editRules: '校验规则配置项',
          optimization: '优化配置项',

          params: '额外的参数（自定义一些数据参数，对于某些特殊的场景可能会用到）',

          empty: '空数据时显示的文本内容',

          currentChange: '只对 highlightCurrentRow 有效，当手动选中行并且值发生改变时触发的事件',
          radioChange: '只对 type=radio 有效，当手动勾选并且值发生改变时触发的事件',
          selectChange: '只对 type=selection 有效，当手动勾选并且值发生改变时触发的事件',
          selectAll: '只对 type=selection 有效，当手动勾选全选时触发的事件',
          cellClick: '单元格被点击时会触发该事件',
          cellDblclick: '单元格被双击时会触发该事件',
          cellContextmenu: '单元格被鼠标右键点击时触发该事件',
          headerCellClick: '表头单元格被点击时会触发该事件',
          headerCellDblclick: '表头单元格被双击时会触发该事件',
          headerCellContextmenu: '表头单元格被鼠标右键点击时触发该事件',
          footerCellClick: '表尾单元格被点击时会触发该事件',
          footerCellDblclick: '表尾单元格被双击时会触发该事件',
          footerCellContextmenu: '表尾单元格被鼠标右键点击时触发该事件',
          cellMouseenter: '当单元格 hover 进入时会触发该事件',
          cellMouseleave: '当单元格 hover 退出时会触发该事件',
          sortChange: '当排序条件发生变化时会触发该事件',
          filterChange: '当筛选条件发生变化时会触发该事件',
          resizableChange: '当列宽拖动发生变化时会触发该事件',
          toggleExpandChange: '当行展开或收起时会触发该事件',
          toggleTreeChange: '当树节点展开或收起时会触发该事件',
          contextMenuClick: '只对 context-menu 配置时有效，当点击快捷菜单时会触发该事件',
          editClosed: '单元格编辑状态下被关闭时会触发该事件',
          editActived: '单元格被激活编辑时会触发该事件',
          editDisabled: '当单元格激活时如果是禁用状态时会触发该事件',
          validError: '当数据校验不通过时会触发该事件',
          scroll: '表格滚动时会触发该事件'
        }
      },
      tableColumn: {
        desc: {
          type: '列的类型',
          prop: '即将废弃，请使用 field',
          field: '列属性',
          label: '即将废弃，请使用 title',
          title: '列标题（支持开启国际化）',
          width: '列宽度',
          minWidth: '最小列宽度；会自动将剩余空间按比例分配',
          resizable: '列是否允许拖动列宽调整大小',
          fixed: '将列固定在左侧或者右侧（注意：固定列应该放在左右两侧的位置）',
          align: '列对其方式',
          headerAlign: '表头列的对齐方式',
          showOverflow: '当内容过长时显示为省略号',
          showHeaderOverflow: '当表头内容过长时显示为省略号',
          formatter: '格式化显示内容 Function({cellValue, row, rowIndex, column, columnIndex})',
          indexMethod: '只对 type=index 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex})',
          sortable: '是否允许列排序',
          sortBy: '只对 sortable 有效，自定义排序的属性',
          sortMethod: '自定义排序方法，Array.sort(a, b)',
          remoteSort: '是否使用服务端排序，如果设置为 true 则不会对数据进行处理',
          filters: '配置筛选条件',
          filterMultiple: '只对 filters 有效，筛选是否允许多选',
          filterMethod: '只对 filters 有效，自定义筛选方法 Function({value, row, column})',
          filterRender: '筛选渲染器配置项',
          treeNode: '只对 tree-config 配置时有效，指定为树节点',
          columnKey: '列渲染的 key，对应列渲染中虚拟 DOM 的 key 属性（非特殊情况下不需要使用）',
          cellRender: '默认的渲染器配置项',
          editRender: '可编辑渲染器配置项',
          params: '额外的参数（自定义一些数据参数，对于某些特殊的场景可能会用到）'
        }
      },
      tooltip: {
        desc: {
          value: '是否显示',
          content: '显示内容',
          trigger: '触发方式',
          theme: '主题样式',
          zIndex: '自定义堆叠顺序（对于在弹框中使用是由于堆叠被覆盖时可能会用到）',
          isArrow: '是否显示箭头'
        }
      },
      grid: {
        desc: {
          toolbar: '工具栏配置',
          pagerConfig: '分页配置项',
          proxyConfig: '数据代理配置项'
        }
      },
      toolbar: {
        desc: {
          id: '唯一 ID 标识',
          size: '尺寸',
          loading: '是否加载中',
          refresh: '刷新按钮',
          resizable: '列宽拖动配置（需要设置 id）',
          setting: '列个性化配置（需要设置 id）'
        }
      },
      pager: {
        desc: {
          size: '尺寸',
          loading: '是否加载中',
          layouts: '自定义布局',
          currentPage: '当前页',
          pageSize: '每页大小',
          total: '总条数',
          pagerCount: '显示页码按钮的数量',
          pageSizes: '每页大小选项列表',
          align: '对其方式',
          background: '带背景颜色'
        }
      },
      radio: {
        desc: {
          value: '绑定值',
          size: '尺寸',
          disabled: '是否禁用',
          name: '原生 name 属性'
        }
      },
      checkbox: {
        desc: {
          value: '绑定值',
          size: '尺寸',
          disabled: '是否禁用'
        }
      },
      input: {
        desc: {
          value: '绑定值',
          size: '尺寸',
          disabled: '是否禁用'
        }
      },
      button: {
        desc: {
          type: '类型',
          size: '尺寸',
          name: '用来标识这一项'
        }
      },
      msg: {
        desc: {
          value: '绑定值',
          id: '只对 type=message 有效，如果不想窗口重复点击，可以设置唯一的 id 防止重复提示',
          title: '窗口的标题（支持开启国际化）',
          type: '窗口类型',
          status: '只对 type=message 有效，消息状态',
          message: '窗口的内容',
          showHeader: '是否显示头部',
          showFooter: '是否显示底部',
          lockView: '是否锁住页面，不允许窗口之外的任何操作',
          lockScroll: '是否锁住滚动条，不允许页面滚动',
          mask: '是否显示遮罩层',
          maskClosable: '是否允许点击遮罩层关闭窗口',
          escClosable: '是否允许按 Esc 键关闭窗口',
          resize: '是否允许拖动调整窗口大小',
          duration: '只对 type=message 有效，自动关闭的延时',
          width: '窗口的宽度',
          height: '窗口的高度',
          top: '只对 type=message 有效，消息距离顶部的位置',
          zIndex: '自定义堆叠顺序（对于在弹框中使用是由于堆叠被覆盖时可能会用到）'
        }
      }
    }
  }
}
