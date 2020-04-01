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
        descKey: 'app.api.select.desc.value',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearable',
        descKey: 'app.api.select.desc.clearable',
        version: '',
        type: 'Boolean',
        enum: 'false',
        defVal: '',
        list: []
      },
      {
        name: 'placeholder',
        descKey: 'app.api.select.desc.placeholder',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'disabled',
        descKey: 'app.api.select.desc.disabled',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'placement',
        descKey: 'app.api.select.desc.placement',
        version: '',
        type: 'String',
        enum: 'top, bottom',
        defVal: 'bottom',
        list: []
      },
      {
        name: 'options',
        desc: '下拉选项列表',
        version: '1.15.24',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'option-props',
        desc: '下拉选项属性参数配置',
        version: '1.15.24',
        type: 'Object',
        enum: '',
        defVal: '{ value, label, disabled }',
        list: []
      },
      {
        name: 'option-groups',
        desc: '下拉分组选项列表',
        version: '1.15.24',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'option-group-props',
        desc: '下拉分组选项属性参数配置',
        version: '1.15.24',
        type: 'Object',
        enum: '',
        defVal: '{ options, label }',
        list: []
      },
      {
        name: 'optId',
        desc: '自定义选项唯一主键的字段名（选项必须要有唯一主键，默认自动生成）',
        version: '1.15.27',
        type: 'String',
        enum: '',
        defVal: '默认 _XID，继承 setup.select.rowId',
        list: []
      },
      {
        name: 'optKey',
        desc: '是否需要为每一行的 VNode 设置 key 属性（非特殊情况下没必要设置）',
        version: '1.15.27',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'transfer',
        descKey: 'app.api.select.desc.transfer',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: '默认 false，继承 setup.select.transfer',
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
        desc: '在点击右侧清除按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'clear',
        desc: '在点击右侧清除按钮时触发该事件',
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
        desc: '使下拉框获取焦点',
        version: '1.15.14',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'blur()',
        desc: '使下拉框失去焦点',
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
