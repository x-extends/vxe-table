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
        descKey: 'app.api.input.desc.value',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.input.desc.size',
        version: '',
        type: 'String',
        enum: 'medium,small,mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'name',
        desc: '原生 name 属性',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'form',
        desc: '原生 form 属性',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'placeholder',
        desc: '当值为空时，显示的占位符',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'rows',
        desc: '原生 rows 属性',
        version: '',
        type: 'String, Number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'maxlength',
        desc: '最大长度',
        version: '',
        type: 'String, Number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'readonly',
        desc: '是否只读',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'disabled',
        descKey: 'app.api.input.desc.disabled',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'resize',
        desc: '调整文本域大小的方式',
        version: '2.8.13',
        type: 'String',
        enum: 'none, both, horizontal, vertical',
        defVal: '',
        list: []
      },
      {
        name: 'autosize',
        desc: '自适应文本高度',
        version: '2.8.13',
        type: 'Boolean, Object',
        enum: '',
        defVal: '继承 setup.textarea.autosize',
        list: [
          {
            name: 'minRows',
            desc: '最小行',
            version: '',
            type: 'Number',
            enum: '',
            defVal: '1',
            list: []
          },
          {
            name: 'maxRows',
            desc: '最大行',
            version: '',
            type: 'Number',
            enum: '',
            defVal: '10',
            list: []
          }
        ]
      },
      {
        name: 'showWordCount',
        desc: '是否显示字数统计',
        version: '2.8.13',
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
        desc: '在值发生变化时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'keydown',
        desc: '在键盘按下时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'keyup',
        desc: '在键盘按下弹起时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      // {
      //   name: 'mousewheel',
      //   desc: '在鼠标在输入框内滚动时触发该事件',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '{ $event }',
      //   list: []
      // },
      {
        name: 'click',
        desc: '在单击输入框时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'dblclick',
        desc: '在双击输入框时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'focus',
        desc: '在输入框聚焦时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'blur',
        desc: '在输入框失焦时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
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
        version: '2.8.9',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'blur()',
        desc: '使输入框失去焦点',
        version: '2.8.9',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  }
]

export default apis
