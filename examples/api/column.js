const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'type',
        descKey: 'app.api.tableColumn.desc.type',
        type: 'String',
        enum: 'index（序号）, selection（复选框）, radio（单选框）, expand（展开行）',
        defVal: '',
        list: []
      },
      {
        name: 'field',
        descKey: 'app.api.tableColumn.desc.field',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title',
        descKey: 'app.api.tableColumn.desc.title',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'width',
        descKey: 'app.api.tableColumn.desc.width',
        type: 'Number, String',
        enum: 'px，%',
        defVal: '继承 table 的 column-width',
        list: []
      },
      {
        name: 'min-width',
        descKey: 'app.api.tableColumn.desc.minWidth',
        type: 'Number, String',
        enum: 'px，%',
        defVal: '继承 table 的 column-min-width',
        list: []
      },
      {
        name: 'resizable',
        descKey: 'app.api.tableColumn.desc.resizable',
        type: 'Boolean',
        enum: '',
        defVal: '继承 table 的 resizable',
        list: []
      },
      {
        name: 'fixed',
        descKey: 'app.api.tableColumn.desc.fixed',
        type: 'String',
        enum: 'left（固定左侧）, right（固定右侧）',
        defVal: '',
        list: []
      },
      {
        name: 'align',
        descKey: 'app.api.tableColumn.desc.align',
        type: 'String',
        enum: 'left（左对其）, center（居中对其）, right（右对齐）',
        defVal: '继承 table 的 align',
        list: []
      },
      {
        name: 'header-align',
        descKey: 'app.api.tableColumn.desc.headerAlign',
        type: 'String',
        enum: 'left（左对其）, center（居中对其）, right（右对齐）',
        defVal: '继承 align > 继承 table 的 header-align',
        list: []
      },
      {
        name: 'show-overflow',
        descKey: 'app.api.tableColumn.desc.showOverflow',
        type: 'String,Boolean',
        enum: 'ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）',
        defVal: '继承 table 的 show-overflow',
        list: []
      },
      {
        name: 'show-header-overflow',
        descKey: 'app.api.tableColumn.desc.showHeaderOverflow',
        type: 'String,Boolean',
        enum: 'ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）',
        defVal: '继承 table 的 show-header-overflow',
        list: []
      },
      {
        name: 'formatter',
        descKey: 'app.api.tableColumn.desc.formatter',
        type: 'Function, Array, String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'index-method',
        descKey: 'app.api.tableColumn.desc.indexMethod',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'sortable',
        descKey: 'app.api.tableColumn.desc.sortable',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'sort-by',
        descKey: 'app.api.tableColumn.desc.sortBy',
        type: 'String, Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'sort-method',
        descKey: 'app.api.tableColumn.desc.sortMethod',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'remote-sort',
        descKey: 'app.api.tableColumn.desc.remoteSort',
        type: 'Boolean',
        enum: '',
        defVal: '继承 table 的 remote-sort',
        list: []
      },
      {
        name: 'filters',
        descKey: 'app.api.tableColumn.desc.filters',
        type: 'Array',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'label',
            desc: '显示的值',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'value',
            desc: '实际的值',
            type: 'Any',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checked',
            desc: '默认是否选中',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'data',
            desc: '自定义渲染的数据值（当使用自定义模板时可能会用到）',
            type: 'Any',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'filter-multiple',
        descKey: 'app.api.tableColumn.desc.filterMultiple',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'filter-method',
        descKey: 'app.api.tableColumn.desc.filterMethod',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'filter-render',
        descKey: 'app.api.tableColumn.desc.filterRender',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            type: 'String',
            enum: 'input, textarea, select',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'attrs',
            desc: '渲染的属性（请查看目标渲染的 Attrs）',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            type: 'Object',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          }
        ]
      },
      {
        name: 'cell-render',
        descKey: 'app.api.tableColumn.desc.cellRender',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            type: 'String',
            enum: 'input, textarea, select',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'attrs',
            desc: '渲染的属性（请查看目标渲染的 Attrs）',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'options',
            desc: '只对 name=select 有效，下拉选项列表',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionProps',
            desc: '只对 name=select 有效，下拉选项属性参数配置',
            type: 'Object',
            enum: '',
            defVal: '{ value, label }',
            list: []
          },
          {
            name: 'optionGroups',
            desc: '只对 name=select 有效，下拉分组选项列表',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionGroupProps',
            desc: '只对 name=select 有效，下拉分组选项属性参数配置',
            type: 'Object',
            enum: '',
            defVal: '{ options, label }',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            type: 'Object',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          }
        ]
      },
      {
        name: 'edit-render',
        descKey: 'app.api.tableColumn.desc.editRender',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'type',
            desc: '渲染类型',
            type: 'String',
            enum: 'default（组件触发后可视）,visible（组件一直可视）',
            defVal: 'default',
            list: []
          },
          {
            name: 'name',
            desc: '渲染器名称',
            type: 'String',
            enum: 'input, textarea, select',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'attrs',
            desc: '渲染的属性（请查看目标渲染的 Attrs）',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'options',
            desc: '只对 name=select 有效，下拉选项列表',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionProps',
            desc: '只对 name=select 有效，下拉选项属性参数配置',
            type: 'Object',
            enum: '',
            defVal: '{ value, label }',
            list: []
          },
          {
            name: 'optionGroups',
            desc: '只对 name=select 有效，下拉分组选项列表',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionGroupProps',
            desc: '只对 name=select 有效，下拉分组选项属性参数配置',
            type: 'Object',
            enum: '',
            defVal: '{ options, label }',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            type: 'Object',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'autofocus',
            desc: '如果是自定义渲染可以指定聚焦的 class',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'autoselect',
            desc: '是否在激活编辑之后自动选中输入框内容',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'defaultValue',
            desc: '默认值（插入数据时列的默认值）',
            type: 'Any',
            enum: '',
            defVal: 'null',
            list: []
          }
        ]
      },
      {
        name: 'tree-node',
        descKey: 'app.api.tableColumn.desc.treeNode',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'params',
        descKey: 'app.api.tableColumn.desc.params',
        type: 'Object',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  },
  {
    name: 'Slots',
    descKey: 'app.api.title.slots',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'default',
        desc: '自定义显示内容模板',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,fixed,isHidden}, h',
        list: []
      },
      {
        name: 'header',
        desc: '自定义表头内容的模板',
        type: '',
        enum: '',
        defVal: '{column,columnIndex,$columnIndex,fixed,isHidden}, h',
        list: []
      },
      {
        name: 'filter',
        desc: '自定义筛选模板',
        type: '',
        enum: '',
        defVal: '{column,columnIndex,$columnIndex,fixed,isHidden}, h',
        list: []
      },
      {
        name: 'edit',
        desc: '自定义可编辑组件模板',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,fixed,isHidden}, h',
        list: []
      }
    ]
  },
  {
    name: 'Events',
    descKey: 'app.api.title.events',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'Methods',
    descKey: 'app.api.title.methods',
    type: '',
    enum: '',
    defVal: '',
    list: []
  }
]

export default apis
