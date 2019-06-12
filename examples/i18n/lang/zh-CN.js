module.exports = {
  app: {
    header: {
      desc: '一个功能强大的、灵活、可配置、可扩展的 Vue 表格组件'
    },
    aside: {
      nav: {
        start: '开发指南',
        install: '安装',
        use: '快速上手',
        advancedFunctions: '高级函数',

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
        radio: '单选',
        checkbox: '多选',
        sort: '排序',
        filter: '筛选',
        empty: '空数据',
        loading: '加载中',
        format: '格式化内容',

        more: '更多功能',
        events: '事件绑定',
        template: '自定义模板',
        span: '合并行货列',
        footer: '表尾合计',
        customs: '显示/隐藏列',
        export: '导出 CSV',
        contextMenu: '快捷菜单',
        expandRow: '展开行',
        toolbar: '工具栏',
        search: '全表搜索',
        pager: '分页',

        tree: '树形表格',
        edit: '可编辑',
        crudToolbar: '增删改查 + 工具栏',
        lazy: '懒加载',
        full: '完整功能',

        grid: '高级表格',
        proxy: '数据代理',
        proxyPage: '数据代理 + 分页',
        fullQuery: '完整查询',
        dynamicColumn: '实现可配置动态列',
        baseTree: '基础树',
        crudTreeToolbar: '树 + 增删改查 + 工具栏',

        scroll: '大数据表格',
        bigData: '海量数据',
        big1wRow: '1 万行',
        big10wRow: '10 万行 + 更复杂渲染',
        big1wRow1wCol: '1 万行 1 万列',
        big10wRow1wCol: '1 万行 1 万列 + 更复杂渲染',
        infiniteScroll: '无限滚动',

        editable: '可编辑表格',
        manual: '手动触发',
        click: '点击触发',
        dblclick: '双击触发',
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
        keyboard: '全键盘操作',

        excel: 'Excel 表格',
        cell: '单元格',

        other: '其他渲染',
        elementRender: '使用 element-ui 渲染列',
        iviewRender: '使用 iview 渲染列',
        antd: '使用 ant-design-vue 渲染列',
        sortablejsRender: '使用 sortablejs 拖拽行排序',
        xlsxRender: '使用 xlsx 导出数据',

        plugin: '插件',
        elementPlugin: 'element-ui 适配插件',
        elementPluginMore: 'element-ui 跟多配置',
        iviewPlugin: 'iview 适配插件',
        iviewPluginMore: 'iview 跟多配置',
        antdPlugin: 'ant-design-vue 适配插件',
        antdPluginMore: 'ant-design-vue 跟多配置',

        api: 'API 文档',
        vxeTable: 'vxe-table',
        vxeTableColumn: 'vxe-table-column',
        vxeGrid: 'vxe-grid',
        vxeExcel: 'vxe-excel',
        vxeToolbar: 'vxe-toolbar',
        vxePager: 'vxe-pager',
        vxeRadio: 'vxe-radio',
        vxeCheckbox: 'vxe-checkbox',
        vxeInput: 'vxe-input',
        vxeButton: 'vxe-button',
        vxeAlert: 'vxe-alert',
        vxeTooltip: 'vxe-tooltip'
      }
    },
    body: {
      button: {
        viewCode: '查看代码',
        runDemo: '在线运行',
        showCode: '显示代码'
      }
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
        props: '参数'
      },
      table: {
        desc: {
          data: '显示的数据',
          customs: '初始化绑定显示/隐藏列；可以通过 visible 动态修改显示或隐藏',
          height: '表格的高度；支持自适应或者固定宽高',
          maxHeight: '表格的最大高度',
          autoResize: '是否自动监听父容器响应式调整表格宽高（如果需要自动跟随父容器的高度变化时可能会用到）',
          resizable: '所有的列是否允许拖动列宽调整大小',
          stripe: '是否带有斑马纹',
          border: '是否带有纵向边框',
          size: '表格的尺寸'
        }
      },
      tableColumn: {
        desc: {
          type: '列的类型'
        }
      }
    }
  }
}
