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
        name: 'modelValue',
        descKey: 'app.api.tooltip.desc.value',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'content',
        descKey: 'app.api.tooltip.desc.content',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'trigger',
        descKey: 'app.api.tooltip.desc.trigger',
        version: '',
        type: 'string',
        enum: 'manual, hover, click',
        defVal: 'hover',
        list: []
      },
      {
        name: 'theme',
        descKey: 'app.api.tooltip.desc.theme',
        version: '',
        type: 'string',
        enum: 'dark, light',
        defVal: 'dark',
        list: []
      },
      {
        name: 'zIndex',
        descKey: 'app.api.tooltip.desc.zIndex',
        version: '',
        type: 'number',
        enum: '',
        defVal: '继承 setup.zIndex',
        list: []
      },
      {
        name: 'isArrow',
        descKey: 'app.api.tooltip.desc.isArrow',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'enterable',
        descKey: 'app.api.tooltip.desc.enterable',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'leaveDelay',
        descKey: 'app.api.tooltip.desc.leaveDelay',
        version: '',
        type: 'number',
        enum: '',
        defVal: '300',
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
        defVal: '',
        list: []
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
    list: [
      {
        name: 'open(target, message)',
        desc: '手动打开提示框',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'target?: HTMLElement, message?: string | number',
        list: []
      },
      {
        name: 'close()',
        desc: '手动关闭提示框',
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
