const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'id',
        desc: '唯一 ID 标识',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'data',
        desc: '与表格的 data 属性同步绑定',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'setting',
        desc: '显示列个性化设置按钮',
        type: 'Boolean,Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'trigger',
            desc: '触发方式',
            type: 'String',
            enum: 'manual,click,hover',
            defVal: 'click',
            list: []
          },
          {
            name: 'immediate',
            desc: '列勾选之后是否实时同步',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'storage',
            desc: '是否启用 localStorage 本地保存，会将保存列个性化的设置状态保存到本地（需要设置 id）',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
        ]
      }
    ]
  },
  {
    name: 'Slots',
    descKey: 'app.api.title.slots',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'buttons',
        desc: '按钮列表',
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
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'toolbar-button-click',
        desc: '只对 toolbar 配置时有效，当工具栏的按钮被点击时会后触发该事件',
        type: '',
        enum: '',
        defVal: '{menu,type,row,rowIndex,column,columnIndex,cell},event',
        list: []
      }
    ]
  },
  {
    name: 'Methods',
    descKey: 'app.api.title.methods',
    type: '',
    enum: '',
    defVal: '',
    list: []
  }
]

export default apis
