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
        name: 'size',
        descKey: 'app.api.toolbar.desc.size',
        version: '',
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'loading',
        descKey: 'app.api.toolbar.desc.loading',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'perfect',
        desc: '配套的样式',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.toolbar.perfect',
        list: []
      },
      {
        name: 'class-name',
        desc: '给工具栏 className',
        version: '4.0.7',
        type: 'string | (({}) => string)',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'import',
        descKey: 'app.api.toolbar.desc.import',
        version: '',
        type: 'boolean | object',
        enum: '',
        defVal: '默认继承 setup.toolbar.import',
        list: [
          // {
          //   name: 'mode',
          //   desc: '默认导入数据的方式',
          //   version: '',
          //   type: 'string',
          //   enum: 'covering, append',
          //   defVal: 'covering',
          //   list: []
          // },
          // {
          //   name: 'message',
          //   desc: '默认显示内置的消息提示',
          //   version: '',
          //   type: 'boolean',
          //   enum: '',
          //   defVal: 'true',
          //   list: []
          // },
          // {
          //   name: 'types',
          //   desc: '导入的文件类型列表',
          //   version: '',
          //   type: 'string[]',
          //   enum: 'csv, html, xml, txt',
          //   defVal: '支持所有类型',
          //   list: []
          // },
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
      },
      {
        name: 'export',
        descKey: 'app.api.toolbar.desc.export',
        version: '',
        type: 'boolean | object',
        enum: '',
        defVal: '默认继承 setup.toolbar.export',
        list: [
          // {
          //   name: 'filename',
          //   desc: '默认的文件名',
          //   version: '',
          //   type: 'string',
          //   enum: '',
          //   defVal: '',
          //   list: []
          // },
          // {
          //   name: 'sheetName',
          //   desc: '默认的表名（只对支持的文档类型有效）',
          //   version: '',
          //   type: 'string',
          //   enum: '',
          //   defVal: '',
          //   list: []
          // },
          // {
          //   name: 'original',
          //   desc: '默认是否导出源数据（如果需要支持导入，则必须设置为 true）',
          //   version: '',
          //   type: 'boolean',
          //   enum: '',
          //   defVal: 'true',
          //   list: []
          // },
          // {
          //   name: 'type',
          //   desc: '默认选中的类型',
          //   version: '',
          //   type: 'string',
          //   enum: '',
          //   defVal: '默认选中 types 第一个值',
          //   list: []
          // },
          // {
          //   name: 'types',
          //   desc: '导出的文件类型列表',
          //   version: '',
          //   type: 'string[]',
          //   enum: 'csv, html, xml, txt',
          //   defVal: '',
          //   list: []
          // },
          // {
          //   name: 'message',
          //   desc: '默认显示内置的消息提示',
          //   version: '',
          //   type: 'boolean',
          //   enum: '',
          //   defVal: 'true',
          //   list: []
          // },
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
      },
      {
        name: 'print',
        descKey: 'app.api.toolbar.desc.print',
        version: '',
        type: 'boolean | object',
        enum: '',
        defVal: '默认继承 setup.toolbar.print',
        list: [
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
      },
      {
        name: 'refresh',
        descKey: 'app.api.toolbar.desc.refresh',
        version: '',
        type: 'boolean | object',
        enum: '',
        defVal: '默认继承 setup.toolbar.refresh',
        list: [
          {
            name: 'query',
            desc: '查询的方法',
            version: '',
            type: '() => Promise<any>',
            enum: '',
            defVal: '',
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
          },
          {
            name: 'iconLoading',
            desc: '自定义加载中图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'custom',
        descKey: 'app.api.toolbar.desc.custom',
        version: '',
        type: 'boolean | object',
        enum: '',
        defVal: '默认继承 setup.toolbar.custom',
        list: [
          {
            name: 'trigger',
            desc: '触发方式',
            version: '',
            type: 'string',
            enum: 'manual,click,hover',
            defVal: 'click',
            list: []
          },
          {
            name: 'immediate',
            desc: '列勾选之后是否实时同步',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isFooter',
            desc: '是否显示底部操作按钮',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
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
      },
      {
        name: 'buttons',
        desc: '左侧按钮列表',
        version: '',
        type: 'any[]',
        enum: '',
        defVal: '默认继承 setup.toolbar.buttons',
        list: [
          {
            name: 'name',
            desc: '按钮名称（支持开启国际化）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'type',
            desc: '按钮类型',
            version: '',
            type: 'string',
            enum: 'text,submit,reset,button',
            defVal: 'button',
            list: []
          },
          {
            name: 'status',
            desc: '按钮状态',
            version: '',
            type: 'string',
            enum: 'primary, success, info, warning, danger',
            defVal: '',
            list: []
          },
          {
            name: 'code',
            desc: '指令编码',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'visible ',
            desc: '是否可视',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'disabled ',
            desc: '是否禁用',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'icon ',
            desc: '按钮图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'round',
            desc: '圆角边框',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'circle',
            desc: '圆角按钮',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'placement',
            descKey: 'app.api.button.desc.placement',
            version: '',
            type: 'string',
            enum: 'top, bottom',
            defVal: 'bottom',
            list: []
          },
          {
            name: 'destroy-on-close',
            desc: '在下拉容器关闭时销毁内容',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'transfer',
            descKey: 'app.api.button.desc.transfer',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: '默认 false，继承 setup.button.transfer',
            list: []
          },
          {
            name: 'dropdowns',
            desc: '下拉按钮列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'name',
                desc: '按钮名称（支持开启国际化）',
                version: '',
                type: 'string',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'type',
                desc: '按钮类型',
                version: '',
                type: 'string',
                enum: 'text,submit,reset,button',
                defVal: 'button',
                list: []
              },
              {
                name: 'status',
                desc: '按钮状态',
                version: '',
                type: 'string',
                enum: 'primary, success, info, warning, danger',
                defVal: '',
                list: []
              },
              {
                name: 'code',
                desc: '按钮编码',
                version: '',
                type: 'string',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'visible ',
                desc: '是否可视',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: 'true',
                list: []
              },
              {
                name: 'disabled ',
                desc: '是否禁用',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: 'false',
                list: []
              },
              {
                name: 'icon ',
                desc: '按钮图标',
                version: '',
                type: 'string',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'round',
                desc: '圆角边框',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: 'false',
                list: []
              },
              {
                name: 'circle',
                desc: '圆角按钮',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: 'false',
                list: []
              }
            ]
          },
          {
            name: 'buttonRender ',
            desc: '渲染器配置项',
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
                enum: '',
                defVal: '',
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
                name: 'events',
                desc: '渲染组件的事件（请查看目标渲染的 Events）',
                version: '',
                type: 'any',
                enum: '',
                defVal: '{button}, ...[目标渲染的 arguments]',
                list: []
              // },
              // {
              //   name: 'nativeEvents',
              //   desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
              //   version: '',
              //   type: 'any',
              //   enum: '',
              //   defVal: '{button}, ...[目标渲染的 arguments]',
              //   list: []
              }
            ]
          }
        ]
      },
      {
        name: 'tools',
        desc: '右侧工具列表',
        version: '4.0.7',
        type: 'any[]',
        enum: '',
        defVal: '默认继承 setup.toolbar.tools',
        list: [
          {
            name: 'name',
            desc: '按钮名称（支持开启国际化）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'type',
            desc: '按钮类型',
            version: '',
            type: 'string',
            enum: 'text,submit,reset,button',
            defVal: 'button',
            list: []
          },
          {
            name: 'status',
            desc: '按钮状态',
            version: '',
            type: 'string',
            enum: 'primary, success, info, warning, danger',
            defVal: '',
            list: []
          },
          {
            name: 'code',
            desc: '指令编码',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'visible ',
            desc: '是否可视',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'disabled ',
            desc: '是否禁用',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'icon ',
            desc: '按钮图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'round',
            desc: '圆角边框',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'circle',
            desc: '圆角按钮',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'placement',
            descKey: 'app.api.button.desc.placement',
            version: '',
            type: 'string',
            enum: 'top, bottom',
            defVal: 'bottom',
            list: []
          },
          {
            name: 'destroy-on-close',
            desc: '在下拉容器关闭时销毁内容',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'transfer',
            descKey: 'app.api.button.desc.transfer',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: '默认 false，继承 setup.button.transfer',
            list: []
          },
          {
            name: 'dropdowns',
            desc: '下拉按钮列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'name',
                desc: '按钮名称（支持开启国际化）',
                version: '',
                type: 'string',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'type',
                desc: '按钮类型',
                version: '',
                type: 'string',
                enum: 'text,submit,reset,button',
                defVal: 'button',
                list: []
              },
              {
                name: 'status',
                desc: '按钮状态',
                version: '',
                type: 'string',
                enum: 'primary, success, info, warning, danger',
                defVal: '',
                list: []
              },
              {
                name: 'code',
                desc: '按钮编码',
                version: '',
                type: 'string',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'visible ',
                desc: '是否可视',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: 'true',
                list: []
              },
              {
                name: 'disabled ',
                desc: '是否禁用',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: 'false',
                list: []
              },
              {
                name: 'icon ',
                desc: '按钮图标',
                version: '',
                type: 'string',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'round',
                desc: '圆角边框',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: 'false',
                list: []
              },
              {
                name: 'circle',
                desc: '圆角按钮',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: 'false',
                list: []
              }
            ]
          },
          {
            name: 'toolRender ',
            desc: '渲染器配置项',
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
                enum: '',
                defVal: '',
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
                name: 'events',
                desc: '渲染组件的事件（请查看目标渲染的 Events）',
                version: '',
                type: 'any',
                enum: '',
                defVal: '{tool}, ...[目标渲染的 arguments]',
                list: []
              // },
              // {
              //   name: 'nativeEvents',
              //   desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
              //   version: '',
              //   type: 'any',
              //   enum: '',
              //   defVal: '{tool}, ...[目标渲染的 arguments]',
              //   list: []
              }
            ]
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
        name: 'buttons',
        desc: '按钮列表',
        version: '',
        type: '',
        enum: '',
        defVal: '{}',
        list: []
      },
      {
        name: 'tools',
        desc: '右侧工具列表',
        version: '',
        type: '',
        enum: '',
        defVal: '{}',
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
        name: 'button-click',
        desc: '只对 buttons 配置时有效，当左侧按钮被点击时会后触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ code, button, $event}',
        list: []
      },
      {
        name: 'tool-click',
        desc: '只对 tools 配置时有效，当右侧工具被点击时会后触发该事件',
        version: '4.0.7',
        type: '',
        enum: '',
        defVal: '{ code, tool, $event}',
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
      // {
      //   name: 'hideColumn(column)',
      //   desc: '隐藏指定列',
      //   type: '',
      //   enum: '',
      //   defVal: 'column',
      //   list: []
      // },
      // {
      //   name: 'showColumn(column)',
      //   desc: '显示指定列',
      //   type: '',
      //   enum: '',
      //   defVal: 'column',
      //   list: []
      // },
      // {
      //   name: 'updateSetting()',
      //   desc: '手动更新列自定义的操作状态',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // },
      // {
      //   name: 'updateResizable()',
      //   desc: '手动更新列宽拖动的操作状态',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // }
    ]
  }
]

export default apis
