const apis = [
  {
    name: 'Props',
    desc: '参数',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'size',
        desc: '尺寸',
        type: 'String',
        enum: 'medium,small,mini',
        defVal: '',
        list: []
      },
      {
        name: 'layouts',
        desc: '自定义布局',
        type: 'Array',
        enum: 'PrevJump,PrevPage,Number,jumpNumber,NextPage,NextJump,Sizes,Jump,PageCount,Total',
        defVal: '',
        list: []
      },
      {
        name: 'current-page',
        desc: '当前页',
        type: 'Number',
        enum: '',
        defVal: '1',
        list: []
      },
      {
        name: 'page-size',
        desc: '每页大小',
        type: 'Number',
        enum: '',
        defVal: '10',
        list: []
      },
      {
        name: 'total',
        desc: '总条数',
        type: 'Number',
        enum: '',
        defVal: '0',
        list: []
      },
      {
        name: 'pager-count',
        desc: '显示页码按钮的数量',
        type: 'Number',
        enum: '',
        defVal: '7',
        list: []
      },
      {
        name: 'page-sizes',
        desc: '每页大小选项列表',
        type: 'Array',
        enum: '',
        defVal: '[10,15,20,50,100]',
        list: []
      },
      {
        name: 'background',
        desc: '带背景颜色',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      }
    ]
  },
  {
    name: 'Slots',
    desc: '插槽',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'Events',
    desc: '事件',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'current-change',
        desc: '当前页发生改变时会触发该事件',
        type: '',
        enum: '',
        defVal: 'currentPage',
        list: []
      },
      {
        name: 'size-change',
        desc: '每页大小发生改变时会触发该事件',
        type: '',
        enum: '',
        defVal: 'pageSize',
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
