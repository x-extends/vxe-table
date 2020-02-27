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
        name: '*',
        desc: '在需要时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{}, event',
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
        version: '1.15.14',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'blur()',
        desc: '使输入框失去焦点',
        version: '1.15.14',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  }
]

export default apis
