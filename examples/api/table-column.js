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
        enum: 'index,selection,radio,expand',
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
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'min-width',
        desc: '最小列宽度，会把剩余空间按比例分配',
        type: 'Number,String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'fixed',
        desc: '将列固定在左侧或者右侧',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'align',
        desc: '列对其方式',
        type: 'String',
        enum: '',
        defVal: 'left',
        list: []
      },
      {
        name: 'header-align',
        desc: '表头对齐方式',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'show-overflow',
        desc: '当内容过长时显示为省略号',
        type: 'String,Boolean',
        enum: 'ellipsis,title,tooltip',
        defVal: '',
        list: []
      },
      {
        name: 'show-header-overflow',
        desc: '当表头内容过长时显示为省略号',
        type: 'String,Boolean',
        enum: 'ellipsis,title,tooltip',
        defVal: '',
        list: []
      },
      {
        name: 'formatter',
        desc: '格式化显示内容 Function({cellValue, seq, row, rowIndex, column, columnIndex})',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'index-method',
        desc: '只对 type=index 有效，自定义索引方法 Function({seq, row, rowIndex, column, columnIndex})',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'sortable',
        desc: '是否允许列排序，如果是服务端排序需要设置为custom',
        type: 'Boolean,String',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'sortBy',
        desc: '只对 sortable 有效，自定义排序的属性',
        type: 'String,Array',
        enum: '',
        defVal: '',
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
        desc: '只对 filters 有效，自定义筛选方法 Function({value, row, column})，如果是服务端排序需要设置为custom',
        type: 'String,Function',
        enum: '',
        defVal: '',
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
            desc: '支持渲染的组件',
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
