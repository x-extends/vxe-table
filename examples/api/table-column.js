const apis = [
  {
    name: 'Props',
    desc: '参数',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'type',
        desc: '列的类型',
        type: 'String',
        enum: 'index（序号）,selection（多选）,radio（单选）,expand（展开行）',
        defVal: '',
        list: []
      },
      {
        name: 'prop',
        desc: '列属性',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'label',
        desc: '列标题',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'width',
        desc: '列宽度',
        type: 'Number,String',
        enum: '数值px，数值%',
        defVal: '默认均匀分配',
        list: []
      },
      {
        name: 'min-width',
        desc: '最小列宽度，会把剩余空间按比例分配',
        type: 'Number,String',
        enum: '数值px，数值%',
        defVal: '',
        list: []
      },
      {
        name: 'resizable',
        desc: '列是否允许拖动列宽调整大小',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'fixed',
        desc: '将列固定在左侧或者右侧（规范：固定列放在左右两侧）',
        type: 'String',
        enum: 'left（固定左侧）,right（固定右侧）',
        defVal: '',
        list: []
      },
      {
        name: 'align',
        desc: '列对其方式',
        type: 'String',
        enum: 'left（居左）,center（居中）,right（居右）',
        defVal: 'left',
        list: []
      },
      {
        name: 'header-align',
        desc: '表头对齐方式',
        type: 'String',
        enum: 'left（居左）,center（居中）,right（居右）',
        defVal: '',
        list: []
      },
      {
        name: 'show-overflow',
        desc: '当内容过长时显示为省略号',
        type: 'String,Boolean',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'show-header-overflow',
        desc: '当表头内容过长时显示为省略号',
        type: 'String,Boolean',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'formatter',
        desc: '格式化显示内容 Function({cellValue, row, rowIndex, column, columnIndex})',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'index-method',
        desc: '只对 type=index 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex})',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'sortable',
        desc: '是否允许列排序',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'sort-by',
        desc: '只对 sortable 有效，自定义排序的属性',
        type: 'String,Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'remote-sort',
        desc: '是否使用服务端排序，如果设置为 true 则不会对数据进行处理',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'filters',
        desc: '配置筛选条件数组',
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
          }
        ]
      },
      {
        name: 'filter-multiple',
        desc: '只对 filters 有效，筛选是否允许多选',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'filter-method',
        desc: '只对 filters 有效，自定义筛选方法 Function({value, row, column})',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'remote-filter',
        desc: '是否使用服务端筛选，如果设置为 true 则不会对数据进行处理',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'tree-node',
        desc: '只对 tree-config 配置时有效，指定为树节点',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'column-key',
        desc: '列渲染的 key，对应列渲染中虚拟 DOM 的 key 属性（非特殊情况下不需要使用）',
        type: 'String,Number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'edit-render',
        desc: '列编辑配置项',
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
            desc: '支持渲染的组件，自带精简的输入组件，建议配合其他 UI 库混合渲染',
            type: 'String',
            enum: 'input,textarea',
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
    desc: '插槽',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'default',
        desc: '自定义显示内容',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,column,columnIndex,fixed,isHidden}',
        list: []
      },
      {
        name: 'header',
        desc: '自定义表头的内容',
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
        defVal: '{column,columnIndex,fixed,isHidden}',
        list: []
      }
    ]
  },
  {
    name: 'Events',
    desc: '事件',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'Methods',
    desc: '方法',
    type: '',
    enum: '',
    defVal: '',
    list: []
  }
]

export default apis
