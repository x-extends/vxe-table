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
        name: 'content',
        descKey: 'app.api.button.desc.content',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'type',
        descKey: 'app.api.button.desc.type',
        version: '',
        type: 'string',
        enum: 'text,submit,reset,button',
        defVal: 'button',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.button.desc.size',
        version: '',
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'name',
        descKey: 'app.api.button.desc.name',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'icon',
        descKey: 'app.api.button.desc.icon',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'round',
        desc: '圆角边框',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'circle',
        desc: '圆角按钮',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'status',
        descKey: 'app.api.button.desc.status',
        version: '',
        type: 'string',
        enum: 'perfect, primary, success, info, warning, danger',
        defVal: '',
        list: []
      },
      {
        name: 'disabled',
        descKey: 'app.api.button.desc.disabled',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
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
        name: 'loading',
        descKey: 'app.api.button.desc.loading',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'placement',
        descKey: 'app.api.button.desc.placement',
        version: '',
        type: 'string',
        enum: 'top, bottom',
        defVal: 'bottom',
        list: []
      },
      {
        name: 'destroy-on-close',
        desc: '在下拉容器关闭时销毁内容',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'transfer',
        descKey: 'app.api.button.desc.transfer',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.button.transfer',
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
        name: 'click',
        desc: '在单击按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'dropdown-click',
        desc: '下拉列表按钮点击时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ name, $event }',
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
        name: 'focus()',
        desc: '使按钮获取焦点',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'blur()',
        desc: '使按钮失去焦点',
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
