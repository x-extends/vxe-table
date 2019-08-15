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
        descKey: 'app.api.button.desc.type',
        type: '',
        enum: 'text,primary',
        defVal: '',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.button.desc.size',
        type: 'String',
        enum: 'medium,small,mini',
        defVal: '',
        list: []
      },
      {
        name: 'name',
        descKey: 'app.api.button.desc.name',
        type: 'String, Number',
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
        name: '—',
        desc: '按钮内容',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'dropdowns',
        desc: '下拉按钮',
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
    list: [
      {
        name: 'dropdown-click',
        desc: '下拉列表按钮点击时会触发该事件',
        type: '',
        enum: '',
        defVal: '{name}, event',
        list: []
      }
    ]
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
