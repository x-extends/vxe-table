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
        descKey: 'app.api.modal.desc.value',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.modal.desc.size',
        version: '',
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'loading',
        descKey: 'app.api.modal.desc.loading',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'id',
        descKey: 'app.api.modal.desc.id',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title',
        descKey: 'app.api.modal.desc.title',
        version: '',
        type: 'string',
        enum: '',
        defVal: '消息提示',
        list: []
      },
      {
        name: 'type',
        descKey: 'app.api.modal.desc.type',
        version: '',
        type: 'string',
        enum: 'alert, confirm, message',
        defVal: '',
        list: []
      },
      {
        name: 'status',
        descKey: 'app.api.modal.desc.status',
        version: '',
        type: 'string',
        enum: 'info, success, warning, error, loading',
        defVal: '',
        list: []
      },
      {
        name: 'className',
        desc: '给窗口附加 className',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'iconStatus',
        descKey: 'app.api.modal.desc.iconStatus',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'content',
        descKey: 'app.api.modal.desc.content',
        version: '4.0.10',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'message',
        abandoned: true,
        descKey: 'app.api.modal.desc.message',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'cancel-button-text',
        desc: '只对 type=confirm 有效，取消按钮的文本内容',
        version: '',
        type: 'string',
        enum: '',
        defVal: '取消',
        list: []
      },
      {
        name: 'confirm-button-text',
        desc: '只对 type=alert|confirm 有效，确定按钮的文本内容',
        version: '',
        type: 'string',
        enum: '',
        defVal: '确定',
        list: []
      },
      {
        name: 'showHeader',
        descKey: 'app.api.modal.desc.showHeader',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'showFooter',
        descKey: 'app.api.modal.desc.showFooter',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'lock-view',
        descKey: 'app.api.modal.desc.lockView',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'lock-scroll',
        descKey: 'app.api.modal.desc.lockScroll',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'mask',
        descKey: 'app.api.modal.desc.mask',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'mask-closable',
        descKey: 'app.api.modal.desc.maskClosable',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'esc-closable',
        descKey: 'app.api.modal.desc.escClosable',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'show-zoom',
        descKey: 'app.api.modal.desc.showZoom',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'show-close',
        desc: '是否显示关闭按钮',
        version: '4.0.14',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'resize',
        descKey: 'app.api.modal.desc.resize',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'duration',
        descKey: 'app.api.modal.desc.duration',
        version: '',
        type: 'number | string',
        enum: '',
        defVal: '3000',
        list: []
      },
      {
        name: 'width',
        descKey: 'app.api.modal.desc.width',
        version: '',
        type: 'number | string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'height',
        descKey: 'app.api.modal.desc.height',
        version: '',
        type: 'number | string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'min-width',
        descKey: 'app.api.modal.desc.minWidth',
        version: '',
        type: 'number | string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'min-height',
        descKey: 'app.api.modal.desc.minHeight',
        version: '',
        type: 'number | string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'top',
        descKey: 'app.api.modal.desc.top',
        version: '',
        type: 'number | string',
        enum: '',
        defVal: '15',
        list: []
      },
      {
        name: 'position',
        descKey: 'app.api.modal.desc.position',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'top',
            desc: '距离顶部的偏移',
            version: '',
            type: 'number | string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'left',
            desc: '距离左侧的偏移',
            version: '',
            type: 'number | string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'zIndex',
        descKey: 'app.api.modal.desc.zIndex',
        version: '',
        type: 'number',
        enum: '',
        defVal: '继承 setup.zIndex',
        list: []
      },
      {
        name: 'show-title-overflow',
        descKey: 'app.api.modal.desc.showTitleOverflow',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'transfer',
        desc: '是否将弹框容器插入于 body 内',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.modal.transfer',
        list: []
      },
      {
        name: 'fullscreen',
        descKey: 'app.api.modal.desc.fullscreen',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'dblclickZoom',
        descKey: 'app.api.modal.desc.dblclickZoom',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'remember',
        descKey: 'app.api.modal.desc.remember',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'destroy-on-close',
        descKey: 'app.api.modal.desc.destroyOnClose',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'storage',
        descKey: 'app.api.modal.desc.storage',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'before-hide-method',
        desc: '在窗口隐藏之前执行，可以返回 Error 阻止关闭，支持异步',
        version: '',
        type: '({ type }) => Error | Promise<any>',
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
    list: [
      {
        name: 'default',
        desc: '窗口内容模板',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'header',
        desc: '窗口头部的模板（如果使用了，则 solt title 无效）',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title',
        desc: '窗口标题的模板',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer',
        desc: '窗口底部的模板',
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
        name: 'show',
        desc: '在窗口显示时会触发该事件',
        version: '',
        type: '{ type }',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'hide',
        desc: '在窗口隐藏时会触发该事件',
        version: '',
        type: '{ type }',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'confirm',
        desc: '点击确定按钮时会触发该事件',
        version: '',
        type: '{ type, $event }',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'cancel',
        desc: '点击取消按钮时会触发该事件',
        version: '',
        type: '{ type, $event }',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'close',
        desc: '点击关闭按钮时会触发该事件',
        version: '',
        type: '{ type, $event }',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'zoom',
        desc: '窗口缩放时会触发该事件',
        version: '',
        type: '{ type, $event }',
        enum: '',
        defVal: '',
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
        name: 'open()',
        desc: '手动打开窗口',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'close()',
        desc: '手动关闭窗口',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getBox()',
        desc: '获取当前窗口元素',
        version: '',
        type: 'Element',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getPosition()',
        desc: '只对 type=modal 有效，获取窗口位置',
        version: '',
        type: '{top,left}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'setPosition(top, left)',
        desc: '只对 type=modal 有效，设置窗口位置',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'top?: number, left?: number',
        list: []
      },
      {
        name: 'isMaximized()',
        desc: '判断是否最大化显示',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'zoom()',
        desc: '切换窗口最大化/还原',
        version: '',
        type: 'Promise<status>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'maximize()',
        desc: '如果窗口处于常规状态，则最大化窗口',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'revert()',
        desc: '如果窗口处于最大化状态，则还原窗口',
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
