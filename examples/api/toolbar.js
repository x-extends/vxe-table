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
        descKey: 'app.api.toolbar.desc.id',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.toolbar.desc.size',
        type: 'String',
        enum: 'medium,small,mini',
        defVal: '',
        list: []
      },
      {
        name: 'data',
        descKey: 'app.api.toolbar.desc.data',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'resizable',
        descKey: 'app.api.toolbar.desc.resizable',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'storage',
            desc: '是否启用 localStorage 本地保存，会将保存列宽拖动的状态保存到本地（需要设置 id）',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
        ]
      },
      {
        name: 'setting',
        descKey: 'app.api.toolbar.desc.setting',
        type: 'Object',
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
            desc: '是否启用 localStorage 本地保存，会将列的隐藏状态保存到本地（需要设置 id）',
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
    list: [
      {
        name: 'hideColumn(column)',
        desc: '隐藏指定列',
        type: '',
        enum: '',
        defVal: 'column',
        list: []
      },
      {
        name: 'showColumn(column)',
        desc: '显示指定列，如果不传参数则显示所有列',
        type: '',
        enum: '',
        defVal: 'column?',
        list: []
      },
      // {
      //   name: 'updateSetting()',
      //   desc: '更新列设置',
      //   type: '',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // },
      {
        name: 'resetStorage()',
        desc: '重置所有本地储存数据',
        type: '',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  }
]

export default apis
