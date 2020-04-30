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
        desc: '渲染类型',
        version: '',
        type: 'String',
        enum: 'text, number, integer, float, password, date, datetime, week, month, year',
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
        enum: '',
        defVal: '默认 false，继承 setup.input.clearable',
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
        desc: '原生 maxlength 属性',
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
        version: '2.8.4',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'suffix-icon',
        descKey: 'app.api.input.desc.suffixIcon',
        version: '2.8.4',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'min',
        desc: '只对 type=number|integer 有效，最小值',
        version: '2.8.15',
        type: 'String, Number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'max',
        desc: '只对 type=number|integer 有效，最大值',
        version: '2.8.15',
        type: 'String, Number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'step',
        desc: '只对 type=number|integer 有效，数字间隔',
        version: '2.8.9',
        type: 'Number, String',
        enum: '',
        defVal: '1',
        list: []
      },
      {
        name: 'digits',
        desc: '只对 type=float 有效，小数位数',
        version: '2.8.32',
        type: 'Number, String',
        enum: '',
        defVal: '默认 2，继承 setup.input.digits',
        list: []
      },
      {
        name: 'date-config',
        disabled: true,
        desc: '只对 type=date|datetime|week|month|year 有效，日期配置项',
        version: '2.8.12',
        type: 'Object',
        enum: '',
        defVal: '继承 setup.input.dateConfig',
        list: [
          {
            name: 'startWeek',
            desc: '只对 type=week 有效，设置起始周',
            version: '',
            type: 'Number, String',
            enum: '0, 1, 2, 3, 4, 5, 6',
            defVal: '1',
            list: []
          },
          {
            name: 'labelFormat',
            desc: '只对 type=date|week|month|year 有效，输入框中显示的日期格式',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'parseFormat',
            desc: '只对 type=date|week|month|year 有效，绑定值的解析格式，如果是值为字符串时可能会用到',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'valueFormat',
            desc: '只对 type=date|week|month|year 有效，绑定值的返回格式，默认返回 Date 类型，如果指定格式则返回字符串',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'editable',
            desc: '文本框是否允许输入',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'disabledMethod',
            desc: '该方法 Function({date}) 的返回值用来决定该日期是否允许选中',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'startWeek',
        desc: '只对 type=week 有效，设置起始周',
        version: '2.8.32',
        type: 'Number, String',
        enum: '0, 1, 2, 3, 4, 5, 6',
        defVal: '默认 1，继承 setup.input.startWeek',
        list: []
      },
      {
        name: 'labelFormat',
        desc: '只对 type=date|datetime|week|month|year 有效，输入框中显示的日期格式',
        version: '2.8.32',
        type: 'String',
        enum: '',
        defVal: '继承 setup.input.labelFormat',
        list: []
      },
      {
        name: 'parseFormat',
        desc: '只对 type=date|datetime|week|month|year 有效，绑定值的解析格式，如果是值为字符串时可能会用到',
        version: '2.8.32',
        type: 'String',
        enum: '',
        defVal: '继承 setup.input.parseFormat',
        list: []
      },
      {
        name: 'valueFormat',
        desc: '只对 type=date|datetime|week|month|year 有效，绑定值的返回格式，默认返回 Date 类型，如果指定格式则返回字符串',
        version: '2.8.32',
        type: 'String',
        enum: '',
        defVal: '继承 setup.input.valueFormat',
        list: []
      },
      {
        name: 'editable',
        desc: '只对 type=date|datetime|week|month|year 有效，文本框是否允许输入',
        version: '2.8.32',
        type: 'Boolean',
        enum: '',
        defVal: '默认 true，继承 setup.input.editable',
        list: []
      },
      {
        name: 'disabledMethod',
        desc: '只对 type=date|datetime|week|month|year 有效，该方法 Function({date}) 的返回值用来决定该日期是否允许选中',
        version: '2.8.32',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'transfer',
        desc: '只对 type=date|datetime|week|month|year 有效，是否将弹框容器插入于 body 内（对于嵌入到表格或者弹窗中被遮挡时需要设置为 true）',
        version: '2.8.9',
        type: 'Boolean',
        enum: '',
        defVal: '默认 false，继承 setup.input.transfer',
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
        desc: '原生事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'clear',
        desc: '在点击右侧清除按钮时触发该事件',
        version: '2.8',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'prefix-click',
        desc: '在点击头部图标时触发该事件',
        version: '2.8.4',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'suffix-click',
        desc: '在点击尾部图标时触发该事件',
        version: '2.8.4',
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
