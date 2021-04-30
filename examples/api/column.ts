const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'type',
        descKey: 'app.api.tableColumn.desc.type',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'seq',
            descKey: 'app.api.tableColumn.desc.seq',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkbox',
            descKey: 'app.api.tableColumn.desc.checkbox',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'radio',
            descKey: 'app.api.tableColumn.desc.radio',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'expand',
            descKey: 'app.api.tableColumn.desc.expand',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'html',
            descKey: 'app.api.tableColumn.desc.html',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'field',
        descKey: 'app.api.tableColumn.desc.field',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title',
        descKey: 'app.api.tableColumn.desc.title',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'width',
        descKey: 'app.api.tableColumn.desc.width',
        version: '',
        type: 'number | string',
        enum: 'px, %',
        defVal: '继承 table.column-config.width',
        list: []
      },
      {
        name: 'min-width',
        descKey: 'app.api.tableColumn.desc.minWidth',
        version: '',
        type: 'number | string',
        enum: 'px, %',
        defVal: '继承 table.column-config.minWidth',
        list: []
      },
      {
        name: 'resizable',
        descKey: 'app.api.tableColumn.desc.resizable',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '继承 table.resizable',
        list: []
      },
      {
        name: 'visible',
        descKey: 'app.api.tableColumn.desc.visible',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'fixed',
        descKey: 'app.api.tableColumn.desc.fixed',
        version: '',
        type: 'string',
        enum: 'left（固定左侧）, right（固定右侧）',
        defVal: '',
        list: []
      },
      {
        name: 'align',
        descKey: 'app.api.tableColumn.desc.align',
        version: '',
        type: 'string',
        enum: 'left（左对齐）, center（居中对齐）, right（右对齐）',
        defVal: '继承 table.align',
        list: []
      },
      {
        name: 'header-align',
        descKey: 'app.api.tableColumn.desc.headerAlign',
        version: '',
        type: 'string',
        enum: 'left（左对齐）, center（居中对齐）, right（右对齐）',
        defVal: '继承 align > 继承 table.header-align',
        list: []
      },
      {
        name: 'footer-align',
        descKey: 'app.api.tableColumn.desc.footerAlign',
        version: '',
        type: 'string',
        enum: 'left（左对齐）, center（居中对齐）, right（右对齐）',
        defVal: '继承 align > 继承 table.footer-align',
        list: []
      },
      {
        name: 'show-overflow',
        descKey: 'app.api.tableColumn.desc.showOverflow',
        version: '',
        type: 'string | boolean',
        enum: 'ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）',
        defVal: '继承 table.show-overflow',
        list: []
      },
      {
        name: 'show-header-overflow',
        descKey: 'app.api.tableColumn.desc.showHeaderOverflow',
        version: '',
        type: 'string | boolean',
        enum: 'ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）',
        defVal: '继承 table.show-header-overflow',
        list: []
      },
      {
        name: 'show-footer-overflow',
        descKey: 'app.api.tableColumn.desc.showFooterOverflow',
        version: '',
        type: 'boolean | string',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '继承 table.show-footer-overflow',
        list: []
      },
      {
        name: 'class-name',
        descKey: 'app.api.tableColumn.desc.className',
        version: '',
        type: 'string | (({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex}) => any)',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'header-class-name',
        descKey: 'app.api.tableColumn.desc.headerClassName',
        version: '',
        type: 'string | (({ $rowIndex, column, columnIndex, $columnIndex }) => any)',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-class-name',
        descKey: 'app.api.tableColumn.desc.footerClassName',
        version: '',
        type: 'string | (({ $rowIndex, column, columnIndex, $columnIndex }) => any)',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'formatter',
        descKey: 'app.api.tableColumn.desc.formatter',
        version: '',
        type: '(({ cellValue, row, column }) => string) | any[] | string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'sortable',
        descKey: 'app.api.tableColumn.desc.sortable',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'sort-by',
        descKey: 'app.api.tableColumn.desc.sortBy',
        version: '',
        type: 'string | (({ row, column }) => string | number)',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'sort-type',
        descKey: 'app.api.tableColumn.desc.sortType',
        version: '',
        type: 'string',
        enum: 'auto, number, string',
        defVal: 'auto',
        list: []
      },
      {
        name: 'filters',
        descKey: 'app.api.tableColumn.desc.filters',
        version: '',
        type: 'any[]',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'label',
            desc: '显示的值',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'value',
            desc: '实际的值',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checked',
            desc: '默认是否选中',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'resetValue',
            desc: '重置时的默认值',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'data',
            desc: '自定义渲染的数据值（当使用自定义模板时可能会用到）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'filter-multiple',
        descKey: 'app.api.tableColumn.desc.filterMultiple',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'filter-method',
        descKey: 'app.api.tableColumn.desc.filterMethod',
        version: '',
        type: '({ value, option, cellValue, row, column }) => boolean',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'filter-reset-method',
        descKey: 'app.api.tableColumn.desc.filterResetMethod',
        version: '',
        type: '({ options, column }) => void',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'filter-recover-method',
        descKey: 'app.api.tableColumn.desc.filterRecoverMethod',
        version: '',
        type: '({ option, column }) => void',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'filter-render',
        descKey: 'app.api.tableColumn.desc.filterRender',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'String',
            enum: 'input, textarea, select, $input, $textarea, $select',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            version: '',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          // {
          //   name: 'attrs',
          //   desc: '渲染的属性（请查看目标渲染的 Attribute）',
          //   version: '',
          //   type: 'Object',
          //   enum: '',
          //   defVal: '',
          //   list: []
          // },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'Object',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          // {
          //   name: 'nativeEvents',
          //   desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
          //   version: '',
          //   type: 'Object',
          //   enum: '',
          //   defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
          //   list: []
          // },
          {
            name: 'content',
            desc: '渲染组件的内容（仅用于特殊组件）',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'export-method',
        desc: '自定义单元格数据导出方法，返回自定义的值',
        version: '',
        type: '({ row, column }) => string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-export-method',
        desc: '自定义表尾单元格数据导出方法，返回自定义的值',
        version: '',
        type: '({ items, _columnIndex }) => string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title-help',
        desc: '标题帮助图标配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'message',
            desc: '提示消息（支持开启国际化）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'icon',
            desc: '自定义图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'cell-type',
        descKey: 'app.api.tableColumn.desc.cellType',
        version: '',
        type: 'string',
        enum: 'auto（默认自动转换），number（数值）, string（字符串）',
        defVal: 'auto',
        list: []
      },
      {
        name: 'cell-render',
        descKey: 'app.api.tableColumn.desc.cellRender',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'string',
            enum: 'input, textarea, select, $input, $select, $button, $buttons, $switch',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          // {
          //   name: 'attrs',
          //   desc: '渲染的属性（请查看目标渲染的 Attribute）',
          //   version: '',
          //   type: 'any',
          //   enum: '',
          //   defVal: '',
          //   list: []
          // },
          {
            name: 'options',
            desc: '只对 name=select 有效，下拉选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionProps',
            desc: '只对 name=select 有效，下拉选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ value, label }',
            list: []
          },
          {
            name: 'optionGroups',
            desc: '只对 name=select 有效，下拉分组选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionGroupProps',
            desc: '只对 name=select 有效，下拉分组选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ options, label }',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          // {
          //   name: 'nativeEvents',
          //   desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
          //   version: '',
          //   type: 'any',
          //   enum: '',
          //   defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
          //   list: []
          // },
          {
            name: 'content',
            desc: '渲染组件的内容（仅用于特殊组件）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'edit-render',
        descKey: 'app.api.tableColumn.desc.editRender',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'string',
            enum: 'input, textarea, select, $input, $select, $switch',
            defVal: '',
            list: []
          },
          {
            name: 'enabled',
            desc: '是否启用',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          // {
          //   name: 'attrs',
          //   desc: '渲染的属性（请查看目标渲染的 Attribute）',
          //   version: '',
          //   type: 'any',
          //   enum: '',
          //   defVal: '',
          //   list: []
          // },
          {
            name: 'options',
            desc: '只对 name=select 有效，下拉选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionProps',
            desc: '只对 name=select 有效，下拉选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ value, label }',
            list: []
          },
          {
            name: 'optionGroups',
            desc: '只对 name=select 有效，下拉分组选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionGroupProps',
            desc: '只对 name=select 有效，下拉分组选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ options, label }',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          // {
          //   name: 'nativeEvents',
          //   desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
          //   version: '',
          //   type: 'any',
          //   enum: '',
          //   defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
          //   list: []
          // },
          {
            name: 'content',
            desc: '渲染组件的内容（仅用于特殊组件）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'autofocus',
            desc: '如果是自定义渲染可以指定聚焦的选择器，例如 .my-input',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'autoselect',
            desc: '是否在激活编辑之后自动选中输入框内容',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'defaultValue',
            desc: '默认值（插入数据时列的默认值）',
            version: '',
            type: 'any',
            enum: '',
            defVal: 'null',
            list: []
          },
          {
            name: 'immediate',
            desc: '输入值实时同步更新（默认情况下单元格编辑的值只会在被触发时同步，如果需要实时同步可以设置为 true）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'placeholder',
            desc: '单元格占位符，但单元格为空值时显示的占位符',
            version: '4.0.5',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'content-render',
        descKey: 'app.api.tableColumn.desc.contentRender',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'string',
            enum: 'input, textarea, select, $input, $textarea, $select',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          // {
          //   name: 'attrs',
          //   desc: '渲染的属性（请查看目标渲染的 Attribute）',
          //   version: '',
          //   type: 'any',
          //   enum: '',
          //   defVal: '',
          //   list: []
          // },
          {
            name: 'options',
            desc: '只对 name=select 有效，下拉选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionProps',
            desc: '只对 name=select 有效，下拉选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ value, label }',
            list: []
          },
          {
            name: 'optionGroups',
            desc: '只对 name=select 有效，下拉分组选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionGroupProps',
            desc: '只对 name=select 有效，下拉分组选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ options, label }',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{data, property}, ...[目标渲染的 arguments]',
            list: []
          // },
          // {
          //   name: 'nativeEvents',
          //   desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
          //   version: '',
          //   type: 'any',
          //   enum: '',
          //   defVal: '{data, property}, ...[目标渲染的 arguments]',
          //   list: []
          }
        ]
      },
      {
        name: 'tree-node',
        descKey: 'app.api.tableColumn.desc.treeNode',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'params',
        descKey: 'app.api.tableColumn.desc.params',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'col-id',
        desc: '自定义列的唯一主键（注：99%的场景不应该设置，操作不正确将导致出现问题）',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  },
  {
    name: 'Slots',
    descKey: 'app.api.title.slots',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'default',
        desc: '自定义显示内容模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex}',
        list: []
      },
      {
        name: 'header',
        desc: '自定义表头内容的模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{column, columnIndex, $columnIndex, _columnIndex, $rowIndex}',
        list: []
      },
      {
        name: 'footer',
        desc: '自定义表尾内容的模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{column, columnIndex, $columnIndex, _columnIndex, $rowIndex, items}',
        list: []
      },
      {
        name: 'title',
        desc: '只对 type=checkbox,radio 有效，自定义标题模板',
        version: '4.0.15',
        type: '',
        enum: '',
        defVal: '{column, columnIndex, $columnIndex, _columnIndex, $rowIndex}',
        list: []
      },
      {
        name: 'checkbox',
        desc: '只对 type=checkbox 有效，自定义复选框模板',
        version: '4.0.15',
        type: '',
        enum: '',
        defVal: '{row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, checked, disabled, indeterminate}',
        list: []
      },
      {
        name: 'radio',
        desc: '只对 type=radio 有效，自定义单选框模板',
        version: '4.0.15',
        type: '',
        enum: '',
        defVal: '{row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, checked, disabled}',
        list: []
      },
      {
        name: 'content',
        desc: '只对 type=expand 有效，自定义展开后的内容模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{row, rowIndex, $rowIndex, column}',
        list: []
      },
      {
        name: 'filter',
        desc: '只对 filter-render 启用时有效，自定义筛选模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{column, columnIndex, $columnIndex}',
        list: []
      },
      {
        name: 'edit',
        desc: '只对 edit-render 启用时有效，自定义可编辑组件模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex}',
        list: []
      // },
      // {
      //   name: 'icon',
      //   desc: '只对 type=expand 或 tree-node 有效，自定义图标模板',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}',
      //   list: []
      }
    ]
  },
  {
    name: 'Events',
    descKey: 'app.api.title.events',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'Methods',
    descKey: 'app.api.title.methods',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  }
]

export default apis
