module.exports = {
  app: {
    header: {
      desc: 'A fully functional Vue table component, perfect compatibility with any component library.'
    },
    aside: {
      nav: {
        start: 'Development',
        install: 'Install',
        global: 'Global props',
        use: 'Quick start',
        theme: 'Custom theme',
        i18n: 'Internationalization',

        icon: '图标',
        basics: '基础功能',
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
        headerHighlight: '高亮列',
        current: '高亮行',
        radio: 'Radio',
        checkbox: 'Checkbox',
        sort: 'Sorting',
        filter: 'Filter',
        empty: 'Empty data',
        loading: 'Loading',
        format: 'Format content',

        more: '更多功能',
        events: 'Event',
        template: 'Template',
        customSort: '自定义列头排序',
        span: 'Rowspan and colspan',
        spanRow: '更加复杂的合并行',
        footer: 'Footer summary',
        export: 'Export CSV',
        contextMenu: 'Context menu',
        menuPrivilege: '快捷菜单 + 权限控制',
        expandRow: 'Expandable row',
        toolbar: 'Toolbar',
        customs: 'Custom column',
        customStorage: 'Custom column + localStorage',
        customlWidthStorage: '自定义列&列宽 + localStorage',
        search: 'Table search',
        pager: 'Pager',

        tree: 'Tree table',
        edit: 'Editable',
        crudToolbar: 'CRUD + Toolbar',
        lazy: 'Lazy loading',
        full: '完整功能',

        grid: '配置式表格',
        reverse: '反转表格',
        proxy: 'DataProxy',
        proxyPage: 'DataProxy + Pager',
        fullQuery: '完整查询',
        customToolbar: '自定义工具栏',
        dynamicColumn: '实现可配置动态列',
        baseTree: 'Basics tree',
        crudTreeToolbar: 'Tree + CRUD + Toolbar',

        scroll: 'Big table',
        bigData: 'Virtual Scroller',
        big1wRow: '10,000 row',
        big10wRow: '100,000 row, More complex rendering',
        big1wRow1wCol: '10,000 row 10,000 column',
        big10wRow1wCol: '100,000 row 10,000 column, More complex rendering',
        treeScroll: '树结构',
        infiniteScroll: 'The infinite scroll',

        editable: 'Editable',
        manual: 'Manual trigger',
        click: 'Click trigger',
        dblclick: 'dblclick trigger',
        select: 'Select the content',
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

        excel: '更多实现',
        cell: 'Cell',

        other: '更多集成',
        elementRender: 'element-ui -> Cell',
        iviewRender: 'iview -> Cell',
        antd: 'ant-design-vue -> Cell',
        sortablejsRow: 'sortablejs -> Row drag',
        sortablejsColumn: 'sortablejs -> column moving',
        xlsxRender: 'xlsx -> Export.xlsx',

        plugin: 'Use plug-in',
        elementPlugin: 'plugin-element 基本配置',
        elementFilterPlugin: 'plugin-element 筛选配置',
        elementPluginMore: 'plugin-element 更多配置',
        iviewPlugin: 'plugin-iview 基本配置',
        iviewFilter: 'plugin-iview 筛选配置',
        iviewPluginMore: 'plugin-iview 更多配置',
        antdPlugin: 'plugin-antd 基本配置',
        antdFilter: 'plugin-antd 筛选配置',
        antdPluginMore: 'plugin-antd 更多配置',

        renderer: 'Renderer',
        rendererFilter: 'Filter renderer',
        rendererDefault: 'Default renderer',
        rendererEdit: 'Edit renderer',

        interceptor: 'Event collision interceptor',

        optimize: 'Optimization and suggestion',
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
        vxeButton: 'vxe-button',
        vxeTooltip: 'vxe-tooltip',
        vxeMessageBox: 'vxe-message'
      }
    },
    body: {
      button: {
        viewCode: 'View source',
        runDemo: 'Run demo',
        showCode: 'Show code',
        refresh: 'Refresh',
        insert: 'Insert',
        save: 'Save',
        markCancel: 'Mark/Cancel',
        deleteSelectedRecords: 'Delete selected records'
      },
      label: {
        name: 'Name',
        age: 'Age',
        sex: 'Sex',
        createTime: 'Create Date',
        updateTime: 'Update Date'
      },
      valid: {
        rName: 'The name of the required.'
      }
    },
    footer: {
      donation: 'Donation',
      donationDesc: 'It takes a lot of time and energy to maintain a project. In order to make the project healthy and sustainable, you can support the author through sponsorship😊'
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
          columns: 'Column configuration',
          customs: 'Initialize the show/hide column (hide the column by default by setting visible to false)',
          height: 'Table height, supports adaptive or fixed width and height',
          maxHeight: 'Maximum height of the table',
          autoResize: 'Whether to automatically listen to the parent container to adjust the table width and height in a responsive manner (this may be used if you need to automatically follow the parent container\'s height)',
          resizable: 'Whether drag column width resizing is allowed for all columns',
          stripe: 'Whether with zebra stripes',
          border: 'Whether there is a vertical border',
          size: 'Table size',
          fit: 'Whether the width of all columns is self-supporting',
          loading: 'Whether the table is loaded',
          align: '所有的列对其方式',
          headerAlign: '所有的表头列的对齐方式',
          showHeader: 'Whether to display the header',
          startIndex: '只对 type=index 的列有效，动态索引的起始值',
          highlightCurrentRow: 'Whether to highlight the current row',
          highlightHoverRow: 'Mouse over a row to highlight',
          highlightCurrentColumn: '是否要高亮当前列',
          highlightHoverColumn: '鼠标移到列是否要高亮显示',
          highlightCell: '只对 editConfig 配置时有效，是否在编辑时高亮单元格边框',
          rowClassName: '给行附加 className，也可以是函数 Function({seq, row, rowIndex, $rowIndex})',
          cellClassName: '给单元格附加 className，也可以是函数 Function({seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex})',
          headerRowClassName: '给表头的行附加 className，也可以是函数 Function({$rowIndex})',
          headerCellClassName: '给表头的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
          footerRowClassName: '给表尾的行附加 className，也可以是函数 Function({$rowIndex})',
          footerCellClassName: '给表尾的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
          showFooter: 'Whether to display table end totals',
          footerMethod: '表尾合计的计算方法 Function({columns, data})',
          spanMethod: '合并行或列，该函数 Function({seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, data}) 返回计算后的值',
          showOverflow: 'Sets all content to appear as ellipses if it is too long',
          showHeaderOverflow: 'Sets the header to show ellipsis when all content is too long',
          remoteSort: '所有列是否使用服务端排序，如果设置为 true 则所有列不会对数据进行处理',
          remoteFilter: '是否使用服务端筛选，如果设置为 true 则不会对数据进行处理',
          columnKey: 'Whether the key attribute needs to be set for each column VNode (not required for non-exceptional cases)',
          rowKey: 'Do you need to set the key attribute for VNode on each row (not necessary for non-exceptional cases)',
          rowId: 'Field names for custom row data unique primary keys (row data must have a unique primary key, automatically generated by default)',
          sortConfig: 'Sort configuration',
          radioConfig: 'Radio configuration',
          selectConfig: 'Checkbox configuration',
          tooltipConfig: 'tooltip configuration',
          expandConfig: 'Expand the row configuration',
          treeConfig: 'Tree configuration',
          contextMenu: 'context menu configuration',
          mouseConfig: 'Mouse configuration',
          keyboardConfig: 'Keyboard configuration',
          editConfig: 'Editable configuration',
          validConfig: 'Validate configuration',
          editRules: 'Checksum rule configuration entries',
          optimization: 'Optimize configuration',

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
          type: 'The type of the column',
          field: 'Column field name',
          title: 'Column title',
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
          sortable: 'Whether column sorting is allowed',
          sortBy: '只对 sortable 有效，自定义排序的属性',
          remoteSort: '是否使用服务端排序，如果设置为 true 则不会对数据进行处理',
          filters: 'Configure filter conditions',
          filterMultiple: '只对 filters 有效，筛选是否允许多选',
          filterMethod: '只对 filters 有效，自定义筛选方法 Function({value, row, column})',
          filterRender: '筛选渲染器配置项',
          treeNode: '只对 tree-config 配置时有效，指定为树节点',
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
          size: 'Size',
          data: '与表格的 data 属性同步绑定',
          refresh: '刷新按钮',
          resizable: '列宽拖动配置',
          setting: '列个性化配置'
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
      msg: {
        desc: {
          value: 'Binding values',
          id: '只对 type=message 有效，如果不想提示框重复点击，可以设置唯一的 id 防止重复提示',
          title: 'Message title',
          type: 'Message type',
          status: '只对 type=message 有效，消息状态',
          message: '提示框的内容',
          lockView: '是否锁住页面，不允许提示框之外的任何操作',
          lockScroll: '是否锁住滚动条，不允许页面滚动',
          mask: '是否显示遮罩层',
          maskClosable: '是否允许点击遮罩层关闭提示框',
          duration: '只对 type=message 有效，自动关闭的延时',
          top: '只对 type=message 有效，消息距离顶部的位置',
          zIndex: '自定义堆叠顺序（对于在弹框中使用是由于堆叠被覆盖时可能会用到）'
        }
      }
    }
  }
}
