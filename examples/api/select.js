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
        name: 'value,v-model',
        descKey: 'app.api.select.desc.value',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearable',
        descKey: 'app.api.select.desc.clearable',
        version: '',
        type: 'Boolean',
        enum: 'false',
        defVal: '',
        list: []
      },
      {
        name: 'placeholder',
        descKey: 'app.api.select.desc.placeholder',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'disabled',
        descKey: 'app.api.select.desc.disabled',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'placement',
        descKey: 'app.api.select.desc.placement',
        version: '',
        type: 'String',
        enum: 'top, bottom',
        defVal: 'bottom',
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
        name: 'change',
        desc: '在点击右侧清除按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{}, event',
        list: []
      },
      {
        name: 'clear',
        desc: '在点击右侧清除按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{}, event',
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
        name: 'blur()',
        desc: '取消焦点',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'focus()',
        desc: '获取焦点并显示下拉列表',
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
