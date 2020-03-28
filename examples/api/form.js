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
        name: 'data',
        descKey: 'app.api.form.desc.data',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'loading',
        descKey: 'app.api.form.desc.loading',
        version: '2.8',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'span',
        descKey: 'app.api.form.desc.span',
        version: '',
        type: 'String, Number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'align',
        descKey: 'app.api.form.desc.align',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.form.desc.size',
        version: '',
        type: 'String',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'title-align',
        descKey: 'app.api.form.desc.titleAlign',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title-width',
        descKey: 'app.api.form.desc.titleWidth',
        version: '',
        type: 'String, Number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title-colon',
        descKey: 'app.api.form.desc.titleColon',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: '默认 false，继承 setup.form.titleColon',
        list: []
      },
      {
        name: 'items',
        desc: '项列表',
        version: '2.8.24',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'rules',
        descKey: 'app.api.form.desc.rules',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'required',
            desc: '是否必填',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'min',
            desc: '校验值最小长度（如果 type=number 则比较值大小）',
            version: '',
            type: 'Number',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'max',
            desc: '校验值最大长度（如果 type=number 则比较值大小）',
            version: '',
            type: 'Number',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'type',
            desc: '数据校验的类型',
            version: '',
            type: 'String',
            enum: 'number, string',
            defVal: 'string',
            list: []
          },
          {
            name: 'pattern',
            desc: '正则校验',
            version: '',
            type: 'RegExp, String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'validator',
            desc: '自定义校验方法，Function(rule, value, callback, {rules,property})，通过调用 callback() 则校验成功，调用 callback(new Error("该字段必填")) 则校验失败',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'message',
            desc: '校验提示内容（支持开启国际化）',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发校验方式（如果为空，则为常规校验方式； 如果指定触发方式，则只会在匹配情况下进行校验）',
            version: '',
            type: 'String',
            enum: 'change',
            defVal: '',
            list: []
          },
          {
            name: 'maxWidth',
            desc: '提示框的最大宽度（对于某些特殊场景可能会用到）',
            version: '',
            type: 'String, Number',
            enum: '',
            defVal: '',
            list: []
          }
        ]
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
        name: 'submit',
        desc: '表单提交时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ data, $event }',
        list: []
      },
      {
        name: 'submit-invalid',
        desc: '表单提交时如果校验不通过会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ data, errMap, $event }',
        list: []
      },
      {
        name: 'reset',
        desc: '表单重置时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ data, $event }',
        list: []
      },
      {
        name: 'toggle-collapse',
        desc: '当折叠按钮被手动点击时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ collapse, data, $event }',
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
        name: 'validate(callback)',
        desc: '对表单进行校验，参数为一个回调函数。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise',
        version: '2.8.32',
        type: 'Promise<ErrMap>',
        enum: '',
        defVal: 'callback: Function',
        list: []
      },
      {
        name: 'clearValidate(field)',
        desc: '手动清除校验状态，如果指定 field 则清除指定的项，否则清除整个表单',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'field?: string',
        list: []
      },
      {
        name: 'updateStatus(scope)',
        desc: '更新项状态（当使用自定义渲染时可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'scope: { property }',
        list: []
      },
      {
        name: 'toggleCollapse()',
        desc: '手动切换折叠状态',
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
