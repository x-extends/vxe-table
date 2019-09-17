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
        name: 'id',
        descKey: 'app.api.msg.desc.id',
        type: 'String',
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
        name: 'status',
        descKey: 'app.api.msg.desc.status',
        type: 'String',
        enum: 'info, success, warning, error, loading',
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
        name: 'showHeader',
        descKey: 'app.api.msg.desc.showHeader',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'showFooter',
        descKey: 'app.api.msg.desc.showFooter',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
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
        name: 'esc-closable',
        descKey: 'app.api.msg.desc.escClosable',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'resize',
        descKey: 'app.api.msg.desc.resize',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'duration',
        descKey: 'app.api.msg.desc.duration',
        type: 'Number, String',
        enum: '',
        defVal: '3000',
        list: []
      },
      {
        name: 'width',
        descKey: 'app.api.msg.desc.width',
        type: 'Number, String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'height',
        descKey: 'app.api.msg.desc.height',
        type: 'Number, String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'min-width',
        descKey: 'app.api.msg.desc.minWidth',
        type: 'Number, String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'min-height',
        descKey: 'app.api.msg.desc.minHeight',
        type: 'Number, String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'top',
        descKey: 'app.api.msg.desc.top',
        type: 'Number, String',
        enum: '',
        defVal: '15',
        list: []
      },
      {
        name: 'zIndex',
        descKey: 'app.api.msg.desc.zIndex',
        type: 'Number, String',
        enum: '',
        defVal: '起始 2000',
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
        desc: '窗口内容模板',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer',
        desc: '窗口底部的模板',
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
        desc: '在窗口打开时会触发该事件',
        type: '{type}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'hide',
        desc: '在窗口关闭时会触发该事件',
        type: '{type}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'confirm',
        desc: '点击确定按钮时会触发该事件',
        type: '{type}, event',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'close',
        desc: '点击关闭按钮时会触发该事件',
        type: '{type}, event',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'zoom',
        desc: '窗口缩放时会触发该事件',
        type: '{type}, event',
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
    list: [
      {
        name: 'open()',
        desc: '手动打开窗口',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'close()',
        desc: '手动关闭窗口',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getBox()',
        desc: '获取当前窗口元素',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'maximize()',
        desc: '如果窗口处于常规状态，则最大化窗口',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'revert()',
        desc: '如果窗口处于最大化状态，则还原窗口',
        type: '',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  }
]

export default apis
