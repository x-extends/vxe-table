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
        enum: 'index（序号）,selection（多选）,radio（单选）,expand（展开行）',
        defVal: '',
        list: []
      },
      {
        name: 'prop',
        descKey: 'app.api.tableColumn.desc.prop',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'label',
        descKey: 'app.api.tableColumn.desc.label',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'width',
        descKey: 'app.api.tableColumn.desc.width',
        type: 'Number,String',
        enum: '数值px，数值%',
        defVal: '默认均匀分配',
        list: []
      },
      {
        name: 'min-width',
        descKey: 'app.api.tableColumn.desc.minWidth',
        type: 'Number,String',
        enum: '数值px，数值%',
        defVal: '',
        list: []
      },
      {
        name: 'resizable',
        descKey: 'app.api.tableColumn.desc.resizable',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'fixed',
        descKey: 'app.api.tableColumn.desc.fixed',
        type: 'String',
        enum: 'left（固定左侧）,right（固定右侧）',
        defVal: '',
        list: []
      },
      {
        name: 'align',
        descKey: 'app.api.tableColumn.desc.align',
        type: 'String',
        enum: 'left（居左）,center（居中）,right（居右）',
        defVal: 'left',
        list: []
      },
      {
        name: 'header-align',
        descKey: 'app.api.tableColumn.desc.headerAlign',
        type: 'String',
        enum: 'left（居左）,center（居中）,right（居右）',
        defVal: '',
        list: []
      },
      {
        name: 'show-overflow',
        descKey: 'app.api.tableColumn.desc.showOverflow',
        type: 'String,Boolean',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'show-header-overflow',
        descKey: 'app.api.tableColumn.desc.showHeaderOverflow',
        type: 'String,Boolean',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'formatter',
        descKey: 'app.api.tableColumn.desc.formatter',
        type: 'Function',
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
        type: 'String,Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'remote-sort',
        descKey: 'app.api.tableColumn.desc.remoteSort',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
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
            name: 'data',
            desc: '额外的数据属性（当使用自定义模板时可能会用到）',
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
        descKey: '筛选模板配置项',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染组件的名称',
            type: 'String',
            enum: 'input,textarea',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染组件的参数',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'remote-filter',
        descKey: 'app.api.tableColumn.desc.remoteFilter',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
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
        name: 'column-key',
        descKey: 'app.api.tableColumn.desc.columnKey',
        type: 'String,Number',
        enum: '',
        defVal: '',
        list: []
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
            desc: '渲染组件的名称（自带精简的输入组件，建议配合其他 UI 库混合渲染）',
            type: 'String',
            enum: 'input,textarea',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染组件的参数',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'autofocus',
            desc: '如果是自定义渲染可以指定聚焦的 class',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          }
        ]
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
        defVal: '{row,rowIndex,column,columnIndex,fixed,isHidden}',
        list: []
      },
      {
        name: 'header',
        desc: '自定义表头内容的模板',
        type: '',
        enum: '',
        defVal: '{column,columnIndex,fixed,isHidden}',
        list: []
      },
      {
        name: 'filter',
        desc: '自定义筛选模板',
        type: '',
        enum: '',
        defVal: '{column,columnIndex,fixed,isHidden}',
        list: []
      },
      {
        name: 'edit',
        desc: '自定义可编辑组件模板',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,column,columnIndex,fixed,isHidden}',
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
