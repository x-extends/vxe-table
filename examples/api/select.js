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
        type: 'any',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.select.desc.size',
        version: '',
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'multiple',
        descKey: 'app.api.select.desc.multiple',
        version: '',
        type: 'boolean',
        enum: 'false',
        defVal: '',
        list: []
      },
      {
        name: 'multi-char-overflow',
        desc: '只对 multiple 有效，设置多选中每个选项显示值的最大字符数，如果超出显示省略号；如果为 -1 则关闭',
        version: '',
        type: 'number, string',
        enum: '',
        defVal: '默认 8，继承 setup.select.multiCharOverflow',
        list: []
      },
      {
        name: 'clearable',
        descKey: 'app.api.select.desc.clearable',
        version: '',
        type: 'boolean',
        enum: 'false',
        defVal: '',
        list: []
      },
      {
        name: 'placeholder',
        descKey: 'app.api.select.desc.placeholder',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'visible',
        desc: '是否显示',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'disabled',
        descKey: 'app.api.select.desc.disabled',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'prefix-icon',
        descKey: 'app.api.select.desc.prefixIcon',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'placement',
        descKey: 'app.api.select.desc.placement',
        version: '',
        type: 'string',
        enum: 'top, bottom',
        defVal: 'bottom',
        list: []
      },
      {
        name: 'options',
        desc: '下拉选项列表',
        version: '',
        type: 'any[]',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'option-props',
        desc: '下拉选项属性参数配置',
        version: '',
        type: 'any',
        enum: '',
        defVal: '{ value, label }',
        list: []
      },
      {
        name: 'option-groups',
        desc: '下拉分组选项列表',
        version: '',
        type: 'any[]',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'option-group-props',
        desc: '下拉分组选项属性参数配置',
        version: '',
        type: 'any',
        enum: '',
        defVal: '{ options, label }',
        list: []
      },
      {
        name: 'opt-id',
        desc: '自定义选项唯一主键的字段名（选项必须要有唯一主键，默认自动生成）',
        version: '',
        type: 'string',
        enum: '',
        defVal: '默认 _XID，继承 setup.select.rowId',
        list: []
      },
      {
        name: 'opt-key',
        desc: '是否需要为每一行的 VNode 设置 key 属性（非特殊情况下没必要设置）',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'transfer',
        descKey: 'app.api.select.desc.transfer',
        version: '',
        type: 'boolean',
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
        desc: '在值发生改变时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
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
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'blur()',
        desc: '使下拉框失去焦点',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'refreshOption()',
        desc: '刷新选项（对于动态修改显示/隐藏选项等场景下可能会用到）',
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
