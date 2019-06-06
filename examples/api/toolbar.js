const apis = [
  {
    name: 'Props',
    desc: '参数',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'customs',
        desc: '与表格的 customs 属性同步绑定',
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
          }
        ]
      }
    ]
  },
  {
    name: 'Slots',
    desc: '插槽',
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
    desc: '事件',
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
    desc: '方法',
    type: '',
    enum: '',
    defVal: '',
    list: []
  }
]

export default apis
