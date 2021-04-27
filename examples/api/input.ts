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
        name: 'type',
        desc: '渲染类型',
        version: '',
        type: 'string',
        enum: 'text, search, number, integer, float, password, date, time, datetime, week, month, quarter, year',
        defVal: 'text',
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
        name: 'clearable',
        desc: '当有值时，是否在右侧显示清除按钮',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.input.clearable',
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
        name: 'autocomplete',
        desc: '原生 autocomplete 属性',
        version: '',
        type: 'string',
        enum: '',
        defVal: 'off',
        list: []
      },
      {
        name: 'maxlength',
        desc: '原生 maxlength 属性',
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
        name: 'className',
        desc: '附加 className',
        version: '4.0.7',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'prefix-icon',
        descKey: 'app.api.input.desc.prefixIcon',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'suffix-icon',
        descKey: 'app.api.input.desc.suffixIcon',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'min',
        desc: '只对 type=number|integer|float 有效，最小值',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'max',
        desc: '只对 type=number|integer|float 有效，最大值',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'step',
        desc: '只对 type=number|integer|float 有效，数字间隔',
        version: '',
        type: 'number | string',
        enum: '',
        defVal: '1',
        list: []
      },
      {
        name: 'digits',
        desc: '只对 type=float 有效，小数位数',
        version: '',
        type: 'number | string',
        enum: '',
        defVal: '默认 2，继承 setup.input.digits',
        list: []
      },
      {
        name: 'align',
        desc: '内容对齐方式',
        version: '',
        type: 'string',
        enum: 'left, center, right',
        defVal: 'left',
        list: []
      },
      {
        name: 'controls',
        desc: '只对 type=number|integer|float 有效，是否显示控制按钮',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 true，继承 setup.input.controls',
        list: []
      },
      {
        name: 'min-date',
        abandoned: true,
        desc: '只对 type=date|datetime|week|month|quarter|year 有效，设置日期可选范围的最小值',
        version: '',
        type: 'number | string | Date',
        enum: '',
        defVal: '默认 new Date(1900, 0, 1)，继承 setup.input.minDate',
        list: []
      },
      {
        name: 'max-date',
        abandoned: true,
        desc: '只对 type=date|datetime|week|month|quarter|year 有效，设置日期可选范围的最大值',
        version: '',
        type: 'number | string | Date',
        enum: '',
        defVal: '默认 new Date(2100, 0, 1)，继承 setup.input.maxDate',
        list: []
      },
      {
        name: 'start-week',
        desc: '只对 type=week 有效，设置起始周',
        version: '',
        type: 'number | string',
        enum: '0, 1, 2, 3, 4, 5, 6',
        defVal: '默认 1，继承 setup.input.startWeek',
        list: []
      },
      {
        name: 'label-format',
        desc: '只对 type=date|datetime|week|month|quarter|year 有效，输入框中显示的日期格式',
        version: '',
        type: 'string',
        enum: '',
        defVal: '继承 setup.input.labelFormat',
        list: []
      },
      {
        name: 'value-format',
        desc: '只对 type=date|datetime|week|month|quarter|year 有效，绑定值的返回格式，默认返回 Date 类型，如果指定格式则返回字符串',
        version: '',
        type: 'string',
        enum: '',
        defVal: '继承 setup.input.valueFormat',
        list: []
      },
      {
        name: 'editable',
        desc: '只对 type=date|time|datetime|week|month|quarter|year 有效，文本框是否允许输入',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 true，继承 setup.input.editable',
        list: []
      },
      {
        name: 'disabled-method',
        desc: '只对 type=date|datetime|week|month|quarter|year 有效，该方法的返回值用来决定该日期是否允许选中',
        version: '',
        type: '({ date, viewType }) => boolean',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'festival-method',
        desc: '只对 type=date|datetime|week|month|quarter|year 有效，该方法用于返回对应日期显示的节日',
        version: '',
        type: '({ date, viewType }) => any',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'transfer',
        desc: '只对 type=date|time|datetime|week|month|quarter|year 有效，是否将弹框容器插入于 body 内（对于嵌入到表格或者弹窗中被遮挡时需要设置为 true）',
        version: '',
        type: 'boolean',
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
    list: [
      {
        name: 'prefix',
        desc: '前缀图标模板',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'suffix',
        desc: '后缀图标模板',
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
        name: 'input',
        desc: '在键盘输入时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'change',
        desc: '在键盘输入时值发生变化时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'keydown',
        desc: '在键盘输入按下时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'keyup',
        desc: '在键盘输入按下弹起时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      // {
      //   name: 'wheel',
      //   desc: '在鼠标在输入框内滚动时触发该事件',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '{ value, $event }',
      //   list: []
      // },
      {
        name: 'click',
        desc: '在点击输入框时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'focus',
        desc: '在输入框聚焦时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'blur',
        desc: '在输入框失焦时触发该事件',
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
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'search-click',
        desc: '只对 type=search 有效，在点击右侧搜索按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'toggle-visible',
        desc: '只对 type=password 有效，在点击右侧切换按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, visible, $event }',
        list: []
      },
      {
        name: 'prev-number',
        desc: '只对 type=number 有效，在点击右侧向上按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'next-number',
        desc: '只对 type=number 有效，在点击右侧向下按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'prefix-click',
        desc: '在点击头部图标时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'suffix-click',
        desc: '在点击尾部图标时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'date-prev',
        desc: '只对 type=date|datetime|week|month|year 有效，在点击上一个视图按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'date-today',
        desc: '只对 type=date|datetime|week|month|year 有效，在点击到今天视图按钮时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ value, $event }',
        list: []
      },
      {
        name: 'date-next',
        desc: '只对 type=date|datetime|week|month|year 有效，在点击下一个视图按钮时触发该事件',
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
