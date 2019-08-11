const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'value,v-model',
        descKey: 'app.api.tooltip.desc.value',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'content',
        descKey: 'app.api.tooltip.desc.content',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'trigger',
        descKey: 'app.api.tooltip.desc.trigger',
        type: 'String',
        enum: 'manual, hover, click',
        defVal: 'hover',
        list: []
      },
      {
        name: 'theme',
        descKey: 'app.api.tooltip.desc.theme',
        type: 'String',
        enum: 'dark,light',
        defVal: 'dark',
        list: []
      },
      {
        name: 'zIndex',
        descKey: 'app.api.tooltip.desc.zIndex',
        type: 'Number',
        enum: '',
        defVal: '3000',
        list: []
      },
      {
        name: 'isArrow',
        descKey: 'app.api.tooltip.desc.isArrow',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
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
        defVal: '',
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
    list: [
      {
        name: 'show()',
        desc: '手动显示提示框',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'close()',
        desc: '手动关闭提示框',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'toVisible(target, message)',
        desc: '手动显示提示框（对于可复用高性能场景非常适合，只需要创建一个实例，后续通过该方法调用即可显示）',
        type: 'Promise',
        enum: '',
        defVal: 'Event.target, message',
        list: []
      }
    ]
  }
]

export default apis
