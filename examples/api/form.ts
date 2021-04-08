import XEUtils from 'xe-utils'
import itemAPI from './form-item'
// import gatherAPI from './form-gather'

const itemProps: any = itemAPI.find(item => item.name === 'Props')
// const gatherProps: any = gatherAPI.find(item => item.name === 'Props')

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
        type: 'any',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'loading',
        descKey: 'app.api.form.desc.loading',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'span',
        descKey: 'app.api.form.desc.span',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'align',
        descKey: 'app.api.form.desc.align',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.form.desc.size',
        version: '',
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'title-align',
        descKey: 'app.api.form.desc.titleAlign',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title-width',
        descKey: 'app.api.form.desc.titleWidth',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title-colon',
        descKey: 'app.api.form.desc.titleColon',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.form.titleColon',
        list: []
      },
      {
        name: 'title-asterisk',
        descKey: 'app.api.form.desc.titleAsterisk',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 true，继承 setup.form.titleAsterisk',
        list: []
      },
      {
        name: 'title-overflow',
        descKey: 'app.api.form.desc.titleOverflow',
        version: '4.0.4',
        type: 'string | boolean',
        enum: 'ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'class-name',
        desc: '给表单附加 className',
        version: '4.0.9',
        type: 'string, ({ data }) => string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'items',
        desc: '项列表',
        version: '',
        type: 'any[]',
        enum: '',
        defVal: '',
        list: XEUtils.mapTree(itemProps.list, (item: any) => Object.assign({}, item, { name: XEUtils.camelCase(item.name) })).concat([
          {
            name: 'children',
            desc: '项集合',
            version: '4.0.7',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          }
        ])
      },
      {
        name: 'rules',
        descKey: 'app.api.form.desc.rules',
        version: '',
        type: '{ [field: string]: VxeFormDefines.FormRule[] }',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'required',
            desc: '是否必填',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'min',
            desc: '校验值最小长度（如果 type=number 则比较值大小）',
            version: '',
            type: 'number',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'max',
            desc: '校验值最大长度（如果 type=number 则比较值大小）',
            version: '',
            type: 'number',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'type',
            desc: '数据校验的类型',
            version: '',
            type: 'string',
            enum: 'number | string',
            defVal: 'string',
            list: []
          },
          {
            name: 'pattern',
            desc: '正则校验',
            version: '',
            type: 'RegExp | string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'validator',
            desc: '自定义校验方法，返回一个 Error 或者 Promise<new Error("提示消息")>',
            version: '',
            type: '({ itemValue, rule, rules, data, property }) => Error | Promise<any>',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'message',
            desc: '校验提示内容（支持开启国际化）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发校验方式（如果为空，则为常规校验方式； 如果指定触发方式，则只会在匹配情况下进行校验）',
            version: '',
            type: 'string',
            enum: 'change',
            defVal: '',
            list: []
          },
          {
            name: 'maxWidth',
            desc: '提示框的最大宽度（对于某些特殊场景可能会用到）',
            version: '',
            type: 'string | number',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'prevent-submit',
        desc: '是否禁用默认的回车提交方式，禁用后配合 validate() 方法可以更加自由的控制提交逻辑',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'valid-config',
        desc: '检验配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'autoPos',
            desc: '是否自动定位到校验不通过的项',
            version: '',
            type: 'bolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'showMessage',
            desc: '是否显示错误显示',
            version: '',
            type: 'bolean',
            enum: '',
            defVal: 'true',
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
        desc: '只对 prevent-submit=false 有效，表单提交时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ data, $event }',
        list: []
      },
      {
        name: 'submit-invalid',
        desc: '只对 prevent-submit=false 有效，表单提交时如果校验不通过会触发该事件',
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
        name: 'reset()',
        desc: '重置表单',
        version: '',
        type: 'Promise<any>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'validate(callback)',
        desc: '对表单进行校验，参数为一个回调函数。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise',
        version: '',
        type: 'Promise<ErrMap>',
        enum: '',
        defVal: 'callback?: Function',
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
      },
      {
        name: 'getItems()',
        desc: '获取表单项列表',
        version: '',
        type: 'any[]',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  }
]

export default apis
