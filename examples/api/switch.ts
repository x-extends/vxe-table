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
        descKey: 'app.api.switch.desc.value',
        version: '',
        type: 'string | number | boolean',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'disabled',
        descKey: 'app.api.switch.desc.disabled',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.switch.desc.size',
        version: '',
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'open-label',
        descKey: 'app.api.switch.desc.onLabel',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'close-label',
        descKey: 'app.api.switch.desc.offLabel',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'open-value',
        descKey: 'app.api.switch.desc.onValue',
        version: '',
        type: 'string | number | boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'close-value',
        descKey: 'app.api.switch.desc.offValue',
        version: '',
        type: 'string | number | boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'open-icon',
        descKey: 'app.api.switch.desc.onIcon',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'close-icon',
        descKey: 'app.api.switch.desc.offIcon',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
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
        desc: '值改变时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
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
