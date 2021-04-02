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
        descKey: 'app.api.input.desc.value',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: []
      },
      // {
      //   name: 'immediate',
      //   descKey: 'app.api.input.desc.immediate',
      //   version: '',
      //   type: 'boolean',
      //   enum: '',
      //   defVal: 'true',
      //   list: []
      // },
      {
        name: 'size',
        descKey: 'app.api.input.desc.size',
        version: '',
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'name',
        desc: '原生 name 属性',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'form',
        desc: '原生 form 属性',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'placeholder',
        desc: '当值为空时，显示的占位符',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
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
        name: 'rows',
        desc: '原生 rows 属性',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'maxlength',
        desc: '最大长度',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'readonly',
        desc: '是否只读',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'disabled',
        descKey: 'app.api.input.desc.disabled',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'resize',
        desc: '调整文本域大小的方式',
        version: '',
        type: 'string',
        enum: 'none, both, horizontal, vertical',
        defVal: '',
        list: []
      },
      {
        name: 'autosize',
        desc: '自适应文本高度',
        version: '',
        type: 'boolean | object',
        enum: '',
        defVal: '继承 setup.textarea.autosize',
        list: [
          {
            name: 'minRows',
            desc: '最小行',
            version: '',
            type: 'number',
            enum: '',
            defVal: '1',
            list: []
          },
          {
            name: 'maxRows',
            desc: '最大行',
            version: '',
            type: 'number',
            enum: '',
            defVal: '10',
            list: []
          }
        ]
      },
      {
        name: 'showWordCount',
        desc: '是否显示字数统计',
        version: '',
        type: 'boolean',
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
        name: 'input',
        desc: '在输入时触发该方法',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'change',
        desc: '在值发生改变时触发该方法',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'focus',
        desc: '在聚焦时触发该方法',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'blur',
        desc: '在失焦时触发该方法',
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
    list: [
      {
        name: 'focus()',
        desc: '使输入框获取焦点',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'blur()',
        desc: '使输入框失去焦点',
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
