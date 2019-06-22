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
        descKey: 'app.api.msg.desc.value',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title',
        descKey: 'app.api.msg.desc.title',
        type: 'String',
        enum: '',
        defVal: '消息提示',
        list: []
      },
      {
        name: 'type',
        descKey: 'app.api.msg.desc.type',
        type: 'String',
        enum: 'alert, confirm, message',
        defVal: '',
        list: []
      },
      {
        name: 'message',
        descKey: 'app.api.msg.desc.message',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'lock-view',
        descKey: 'app.api.msg.desc.lockView',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'lock-scroll',
        descKey: 'app.api.msg.desc.lockScroll',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'mask',
        descKey: 'app.api.msg.desc.mask',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'mask-closable',
        descKey: 'app.api.msg.desc.maskClosable',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'duration',
        descKey: 'app.api.msg.desc.duration',
        type: 'Number',
        enum: '',
        defVal: '3000',
        list: []
      },
      {
        name: 'top',
        descKey: 'app.api.msg.desc.top',
        type: 'Number',
        enum: '',
        defVal: '15',
        list: []
      },
      {
        name: 'zIndex',
        descKey: 'app.api.msg.desc.zIndex',
        type: 'Number',
        enum: '',
        defVal: '999',
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
        desc: '提示框内容',
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
        name: 'show',
        desc: '在提示框打开时会触发该事件',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'hide',
        desc: '在提示框关闭时会触发该事件',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'confirm',
        desc: '点击确定按钮时会触发该事件',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'close',
        desc: '点击关闭按钮时会触发该事件',
        type: '',
        enum: '',
        defVal: '',
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
