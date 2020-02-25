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
        name: 'type',
        desc: '原生 type 属性',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
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
        name: 'clearable',
        desc: '当有值时，是否在右侧显示清除按钮',
        version: '',
        type: 'Boolean',
        enum: 'false',
        defVal: '',
        list: []
      },
      {
        name: 'placeholder',
        desc: '原生 placeholder 属性',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'autocomplete',
        desc: '原生 autocomplete 属性',
        version: '',
        type: 'String',
        enum: '',
        defVal: 'off',
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
        name: 'prefix-icon',
        descKey: 'app.api.input.desc.prefixIcon',
        version: '1.15.22',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'suffix-icon',
        descKey: 'app.api.input.desc.suffixIcon',
        version: '1.15.22',
        type: 'String',
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
        name: '*',
        desc: '在需要时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{}, event',
        list: []
      },
      {
        name: 'change',
        desc: '在值发生改变时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value }, event',
        list: []
      },
      {
        name: 'clear',
        desc: '在点击右侧清除按钮时触发该事件',
        version: '1.15.20',
        type: '',
        enum: '',
        defVal: '{}, event',
        list: []
      },
      {
        name: 'prefix-click',
        desc: '在点击头部图标时触发该事件',
        version: '1.15.22',
        type: '',
        enum: '',
        defVal: '{}, event',
        list: []
      },
      {
        name: 'suffix-click',
        desc: '在点击尾部图标时触发该事件',
        version: '1.15.22',
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
    list: []
  }
]

export default apis
