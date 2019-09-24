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
        descKey: 'app.api.button.desc.type',
        version: '',
        type: '',
        enum: 'text,primary',
        defVal: '',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.button.desc.size',
        version: '',
        type: 'String',
        enum: 'medium,small,mini',
        defVal: '',
        list: []
      },
      {
        name: 'name',
        descKey: 'app.api.button.desc.name',
        version: '',
        type: 'String, Number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'disabled',
        descKey: 'app.api.button.desc.disabled',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'loading',
        descKey: 'app.api.button.desc.loading',
        version: '1.14.17',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
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
        name: '—',
        desc: '按钮内容',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'dropdowns',
        desc: '下拉按钮',
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
    list: [
      {
        name: '*',
        desc: '原生事件',
        version: '',
        type: '',
        enum: '',
        defVal: 'event',
        list: []
      },
      {
        name: 'dropdown-click',
        desc: '下拉列表按钮点击时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ name }, event',
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
    list: []
  }
]

export default apis
