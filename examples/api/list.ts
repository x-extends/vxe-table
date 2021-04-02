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
        type: 'any[]',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.list.desc.size',
        version: '',
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'loading',
        desc: '是否加载中',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'height',
        desc: '列表高度',
        version: '',
        type: 'number | string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'className',
        desc: '附加 className',
        version: '4.0.7',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'auto-resize',
        desc: '自动监听父元素的变化去重新计算列表（对于父元素可能存在动态变化的场景可能会用到）',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'sync-resize',
        desc: '自动跟随某个属性的变化去重新计算列表，和手动调用 recalculate 方法是一样的效果（对于通过某个属性来控制显示/隐藏切换的场景可能会用到）',
        version: '',
        type: 'boolean | string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'scroll-y',
        desc: '纵向虚拟滚动配置',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
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
            name: 'gt',
            desc: '指定大于指定行时自动启动纵向虚拟滚动',
            version: '',
            type: 'number',
            enum: '',
            defVal: '100',
            list: []
          },
          {
            name: 'oSize',
            desc: '指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久',
            version: '',
            type: 'number',
            enum: '',
            defVal: '0',
            list: []
          },
          {
            name: 'sItem',
            desc: '指定行元素的选择器',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          // },
          // {
          //   name: 'rHeight',
          //   desc: '指定行高',
          //   version: '',
          //   type: 'number',
          //   enum: '',
          //   defVal: '默认自动计算',
          //   list: []
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
        desc: '加载数据',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'data: array',
        list: []
      },
      {
        name: 'reloadData(data)',
        desc: '加载数据并清除所有状态',
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
