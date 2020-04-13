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
        name: 'data',
        descKey: 'app.api.list.desc.data',
        version: '',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'height',
        descKey: '高度',
        version: '',
        type: 'Number, String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'scrollY',
        desc: '纵向虚拟滚动配置',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'item',
            desc: '指定行元素的选择器',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'gt',
            desc: '指定大于指定行时自动启动纵向虚拟滚动',
            version: '',
            type: 'Number',
            enum: '',
            defVal: '100',
            list: []
          },
          {
            name: 'oSize',
            desc: '当剩余数据少于指定行时触发重新渲染',
            version: '',
            type: 'Number',
            enum: '',
            defVal: '默认自动计算',
            list: []
          },
          {
            name: 'rSize',
            desc: '每次渲染条数',
            version: '',
            type: 'Number',
            enum: '',
            defVal: '默认自动计算',
            list: []
          },
          {
            name: 'vSize',
            desc: '指定可视区域条数',
            version: '',
            type: 'Number',
            enum: '',
            defVal: '默认自动计算',
            list: []
          },
          {
            name: 'rHeight',
            desc: '指定行高',
            version: '',
            type: 'Number',
            enum: '',
            defVal: '默认自动计算',
            list: []
          }
        ]
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
    list: []
  },
  {
    name: 'Events',
    descKey: 'app.api.title.events',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'scroll',
        desc: '列表滚动时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      }
    ]
  },
  {
    name: 'Methods',
    descKey: 'app.api.title.methods',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'loadData(data)',
        desc: '加载数据（',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'data: array',
        list: []
      },
      {
        name: 'reloadData(data)',
        desc: '加载数据并恢复到初始状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'data: array',
        list: []
      },
      {
        name: 'recalculate()',
        desc: '重新计算列表',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'scrollTo(scrollLeft, scrollTop)',
        desc: '如果有滚动条，则滚动到对应的位置',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'scrollLeft?: number, scrollTop?: number',
        list: []
      },
      {
        name: 'refreshScroll()',
        desc: '刷新滚动操作，手动同步滚动相关位置',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearScroll()',
        desc: '手动清除滚动相关信息，还原到初始状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  }
]

export default apis
