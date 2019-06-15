module.exports = {
  app: {
    header: {
      desc: 'A powerful, flexible, configurable, extensible Vue Table component.'
    },
    aside: {
      nav: {
        start: 'Development',
        install: 'Install',
        use: 'Quick start',
        theme: 'Custom theme',
        i18n: 'Internationalization',
        advancedFunctions: 'Advanced Functions',

        basics: 'Basics',
        base: 'Basics table',
        size: 'Size',
        ellipsis: 'Ellipsis',
        stripe: 'Striped',
        border: 'Border',
        style: 'Cell style',
        hideHead: 'Hidden header',
        resizable: 'Resizable',
        fluidHeight: 'Fluid-height',
        resize: 'Resize height and width',
        height: 'Table with fixed header',
        fixed: 'Table with fixed column',
        fullFixed: 'Table with fixed columns and header ',
        group: 'Grouping table head',
        seq: 'Table sequence',
        radio: 'Radio',
        checkbox: 'Checkbox',
        sort: 'Sorting',
        filter: 'Filter',
        empty: 'Empty data',
        loading: 'Loading',
        format: 'Format content',

        more: 'More',
        events: '事件绑定',
        template: '自定义模板',
        span: 'Rowspan and colspan',
        footer: 'Footer summary',
        customs: 'Show/hide columns',
        export: 'Export CSV',
        contextMenu: 'Context menu',
        expandRow: 'Expandable row',
        toolbar: 'Toolbar',
        search: 'Table search',
        pager: 'Pager',

        tree: 'Tree table',
        edit: '可编辑',
        crudToolbar: 'CRUD + Toolbar',
        lazy: 'Lazy loading',
        full: '完整功能',

        grid: 'Grid table',
        proxy: 'DataProxy',
        proxyPage: 'DataProxy + Pager',
        fullQuery: '完整查询',
        dynamicColumn: '实现可配置动态列',
        baseTree: 'Basics tree',
        crudTreeToolbar: 'Tree + CRUD + Toolbar',

        scroll: 'Big table',
        bigData: 'Virtual Scroller',
        big1wRow: '10,000 row',
        big10wRow: '100,000 row, More complex rendering',
        big1wRow1wCol: '10,000 row 10,000 column',
        big10wRow1wCol: '100,000 row 10,000 column, More complex rendering',
        infiniteScroll: 'The infinite scroll',

        editable: 'Editable',
        manual: 'Manual trigger',
        click: 'Click trigger',
        dblclick: 'dblclick trigger',
        autoClear: 'Auto clear',
        insert: 'Insert',
        delete: 'Delete',
        revert: 'Revert',
        status: 'Status',
        cellDisable: 'Disable edit cell',
        rowDisable: 'Disable edit row',
        cellVaild: 'Validate call',
        rowVaild: 'Validate row',
        forceCellValid: 'Validate cell + lock',
        forceRowVaild: 'Validate row + lock',
        keyboard: 'Keyboard navigation',

        excel: 'Excel table',
        cell: 'Cell',

        other: 'Other rendering',
        elementRender: '使用 element-ui 渲染列',
        iviewRender: '使用 iview 渲染列',
        antd: '使用 ant-design-vue 渲染列',
        sortablejsRender: '使用 sortablejs 拖拽行排序',
        xlsxRender: '使用 xlsx 导出数据',

        plugin: 'Plugins',
        elementPlugin: 'element-ui 适配插件',
        elementPluginMore: 'element-ui 跟多配置',
        iviewPlugin: 'iview 适配插件',
        iviewPluginMore: 'iview 跟多配置',
        antdPlugin: 'ant-design-vue 适配插件',
        antdPluginMore: 'ant-design-vue 跟多配置',

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
        vxeButton: 'vxe-button',
        vxeMessageBox: 'vxe-message-box',
        vxeTooltip: 'vxe-tooltip'
      }
    },
    body: {
      button: {
        viewCode: 'View source',
        runDemo: 'Run demo',
        showCode: 'Show code'
      }
    },
    api: {
      form: {
        apiSearch: 'API Search'
      },
      title: {
        prop: 'Attribute',
        desc: 'Description',
        type: 'Type / Return type',
        enum: 'Accepted Values',
        defVal: 'Default / Arguments',
        props: 'Table Attributes',
        events: 'Table events',
        slots: 'Table slots',
        methods: 'Table methods'
      },
      table: {
        desc: {
          data: 'Table data',
          customs: 'Initialize the binding to show/hide columns;You can modify the display or hide columns by using the visible property',
          height: 'Table height, supports adaptive or fixed width and height',
          maxHeight: 'Maximum height of the table',
          autoResize: 'Whether to automatically listen to the parent container to adjust the table width and height in a responsive manner (this may be used if you need to automatically follow the parent container\'s height)',
          resizable: 'Whether drag column width resizing is allowed for all columns',
          stripe: 'Whether with zebra stripes',
          border: 'Whether there is a vertical border',
          size: 'Table size',
          fit: 'Whether the width of all columns is self-supporting',
          loading: 'Whether the table is loaded',
          showHeader: 'Whether to display the header',
          startIndex: '只对 type=index 的列有效，动态索引的起始值',
          highlightCurrentRow: 'Whether to highlight the currently selected row',
          highlightHoverRow: 'Mouse over a row to highlight',
          rowClassName: '给行附加 className，也可以是函数 Function({seq, row, rowIndex})',
          cellClassName: '给单元格附加 className，也可以是函数 Function({seq, row, rowIndex, column, columnIndex})',
          headerRowClassName: '给表头的行附加 className，也可以是函数 Function({headIndex})',
          headerCellClassName: '给表头的单元格附加 className，也可以是函数 Function({headIndex, column, columnIndex})',
          footerRowClassName: '给表尾的行附加 className，也可以是函数 Function({footIndex})',
          footerCellClassName: '给表尾的单元格附加 className，也可以是函数 Function({footIndex, column, columnIndex})',
          showFooter: 'Whether to display table end totals',
          footerMethod: '表尾合计的计算方法 Function({columns, data})',
          spanMethod: '合并行或列，该函数 Function({seq, row, rowIndex, column, columnIndex, data}) 返回计算后的值',
          showAllOverflow: 'Sets all content to appear as ellipses if it is too long',
          showHeaderAllOverflow: 'Sets the header to show ellipsis when all content is too long',
          rowKey: 'Key of row data, corresponding to the Key attribute of virtual DOM in row rendering (not required for non-exceptional cases)',
          radioConfig: 'Radio configuration',
          selectConfig: 'Select multiple configuration',
          tooltipConfig: 'tooltip configuration',
          expandConfig: 'Expand the row configuration',
          treeConfig: 'Tree configuration',
          contextMenu: 'context menu configuration',
          mouseConfig: 'Mouse configuration',
          keyboardConfig: 'Keyboard configuration',
          editConfig: 'Editable configuration',
          editRules: 'Checksum rule configuration entries',
          optimization: 'Optimize configuration',

          empty: '空数据时显示的文本内容',

          selectAll: '只对 type=selection 有效，当手动勾选全选时触发的事件',
          selectChange: '只对 type=selection,radio 有效，当手动勾选时触发的事件',
          cellClick: '单元格被点击时会触发该事件',
          cellDblclick: '单元格被双击时会触发该事件',
          headerCellClick: '表头单元格被点击时会触发该事件',
          headerCellDblclick: '表头单元格被双击时会触发该事件',
          footerCellClick: '表尾单元格被点击时会触发该事件',
          footerCellDblclick: '表尾单元格被双击时会触发该事件',
          cellMouseenter: '当单元格 hover 进入时会触发该事件',
          cellMouseleave: '当单元格 hover 退出时会触发该事件',
          sortChange: '当排序条件发生变化时会触发该事件',
          filterChange: '当筛选条件发生变化时会触发该事件',
          toggleExpandChange: '当行展开或收起时会触发该事件',
          toggleTreeChange: '当树节点展开或收起时会触发该事件',
          contextMenuClick: '只对 context-menu 配置时有效，当点击快捷菜单时会触发该事件',
          editClosed: '单元格编辑状态下被关闭时会触发该事件',
          editActived: '单元格被激活编辑时会触发该事件',
          editDisabled: '当点击后单元格如果是禁用状态时会触发该事件',
          validError: '当数据校验不通过时会触发该事件',
          bodyScroll: '内容滚动时会触发该事件',
          footerScroll: '表尾滚动时会触发该事件'
        }
      },
      tableColumn: {
        desc: {
          type: 'The type of the column',
          prop: 'Column field name',
          label: 'Column label',
          width: 'Column width',
          minWidth: 'Minimum height of the column,The remaining space is automatically allocated proportionally',
          resizable: 'Whether column resizing allows dragging column widths',
          fixed: 'Fix the column to the left or right (note: fixed columns should be left and right)',
          align: 'Column on its way',
          headerAlign: 'Alignment of header columns',
          showOverflow: 'Appears as an ellipsis when the content is too long',
          showHeaderOverflow: 'Appears as an ellipsis when the header content is too long',
          formatter: 'Format display content, Function({cellValue, row, rowIndex, column, columnIndex})',
          indexMethod: '只对 type=index 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex})',
          sortable: '是否允许列排序',
          sortBy: '只对 sortable 有效，自定义排序的属性',
          remoteSort: '是否使用服务端排序，如果设置为 true 则不会对数据进行处理',
          filters: 'Configure filter conditions',
          filterMultiple: '只对 filters 有效，筛选是否允许多选',
          filterMethod: '只对 filters 有效，自定义筛选方法 Function({value, row, column})',
          remoteFilter: '是否使用服务端筛选，如果设置为 true 则不会对数据进行处理',
          treeNode: '只对 tree-config 配置时有效，指定为树节点',
          columnKey: 'Key for column rendering, corresponding to the key attribute of the virtual DOM in column rendering (not required for non-exceptional cases)',
          editRender: 'Column edit configuration items'
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
          size: 'Size',
          data: '与表格的 data 属性同步绑定',
          setting: '显示列个性化设置按钮'
        }
      },
      pager: {
        desc: {
          size: 'Size',
          loading: '是否加载中',
          layouts: 'Custom layouts',
          currentPage: 'Current page',
          pageSize: 'Page size',
          total: 'Total number',
          pagerCount: '显示页码按钮的数量',
          pageSizes: '每页大小选项列表',
          background: 'Show background color'
        }
      },
      radio: {
        desc: {
          value: 'Binding values',
          size: 'Size',
          disabled: 'Whether to disable',
          name: '原生 name 属性'
        }
      },
      checkbox: {
        desc: {
          value: 'Size',
          size: '尺寸',
          disabled: 'Whether to disable'
        }
      },
      input: {
        desc: {
          value: 'Binding values',
          size: 'Size',
          disabled: 'Whether to disable'
        }
      },
      button: {
        desc: {
          type: '类型',
          size: 'Size'
        }
      },
      alert: {
        desc: {
          value: 'Binding values',
          title: '提示框的标题',
          message: '提示框的内容',
          lockView: '是否锁住页面，不允许提示框之外的任何操作',
          lockScroll: '是否锁住滚动条，不允许页面滚动',
          mask: '是否显示遮罩层',
          maskClosable: '是否允许点击遮罩层关闭提示框'
        }
      }
    }
  }
}
