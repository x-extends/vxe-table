import XEUtils from 'xe-utils'

const titleTooltip = [
  {
    name: 'message',
    desc: '提示消息（支持开启国际化）',
    version: '',
    type: 'string',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'enterable',
    desc: '只对 message 设置后有效，鼠标是否可进入到 tooltip 中',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'theme',
    desc: '只对 message 设置后有效，设置 tooltip 的主题样式',
    version: '',
    type: 'string',
    enum: 'dark, light',
    defVal: 'dark',
    list: []
  },
  {
    name: 'icon',
    desc: '自定义图标',
    version: '',
    type: 'string',
    enum: '',
    defVal: '',
    list: []
  }
]

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
        name: 'field',
        descKey: 'app.api.formItem.desc.field',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title',
        descKey: 'app.api.formItem.desc.title',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'span',
        descKey: 'app.api.formItem.desc.span',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'align',
        descKey: 'app.api.formItem.desc.align',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title-align',
        descKey: 'app.api.formItem.desc.titleAlign',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title-width',
        descKey: 'app.api.formItem.desc.titleWidth',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title-overflow',
        descKey: 'app.api.formItem.desc.titleOverflow',
        version: '4.0.4',
        type: 'string | boolean',
        enum: 'ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）',
        defVal: '继承 form.title-overflow',
        list: []
      },
      {
        name: 'class-name',
        desc: '给表单项附加 className',
        version: '',
        type: 'string, ({ field, data }) => string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'visible',
        descKey: 'app.api.formItem.desc.visible',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'visible-method',
        descKey: 'app.api.formItem.desc.visibleMethod',
        version: '',
        type: '({ data }) => boolean',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'folding',
        descKey: 'app.api.formItem.desc.folding',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'collapse-node',
        descKey: 'app.api.formItem.desc.collapseNode',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'title-prefix',
        descKey: 'app.api.formItem.desc.titlePrefix',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: XEUtils.clone(titleTooltip, true)
      },
      {
        name: 'title-suffix',
        descKey: 'app.api.formItem.desc.titleSuffix',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: XEUtils.clone(titleTooltip, true)
      },
      {
        name: 'reset-value',
        descKey: 'app.api.formItem.desc.resetValue',
        version: '',
        type: 'any',
        enum: '',
        defVal: 'null',
        list: []
      },
      {
        name: 'item-render',
        descKey: 'app.api.formItem.desc.itemRender',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'string',
            enum: 'input, textarea, select, $input, $textarea, $select, $button, $buttons, $radio, $checkbox, $switch',
            defVal: '',
            list: []
          },
          {
            name: 'enabled',
            desc: '是否启用',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          // {
          //   name: 'attrs',
          //   desc: '渲染的属性（请查看目标渲染的 Attribute）',
          //   version: '',
          //   type: 'any',
          //   enum: '',
          //   defVal: '',
          //   list: []
          // },
          {
            name: 'options',
            desc: '只对 name=select 有效，下拉选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionProps',
            desc: '只对 name=select 有效，下拉选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ value, label }',
            list: []
          },
          {
            name: 'optionGroups',
            desc: '只对 name=select 有效，下拉分组选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionGroupProps',
            desc: '只对 name=select 有效，下拉分组选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ options, label }',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{data, property}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'content',
            desc: '渲染组件的内容（仅用于特殊组件）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'defaultValue',
            desc: '项默认值',
            version: '',
            type: 'any',
            enum: '',
            defVal: 'null',
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
    list: [
      {
        name: 'default',
        desc: '自定义表单项',
        version: '',
        type: '',
        enum: '',
        defVal: '{ data, property }',
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
    list: []
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
