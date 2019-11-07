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
        descKey: 'app.api.pager.desc.size',
        version: '',
        type: 'String',
        enum: 'medium,small,mini',
        defVal: '',
        list: []
      },
      {
        name: 'loading',
        descKey: 'app.api.pager.desc.loading',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'layouts',
        descKey: 'app.api.pager.desc.layouts',
        version: '',
        type: 'Array',
        enum: 'PrevJump,PrevPage,Number,JumpNumber,NextPage,NextJump,Sizes,Jump,FullJump,PageCount,Total',
        defVal: '[PrevPage,NextPage,FullJump,Sizes,Total]',
        list: []
      },
      {
        name: 'current-page',
        descKey: 'app.api.pager.desc.currentPage',
        version: '',
        type: 'Number',
        enum: '',
        defVal: '1',
        list: []
      },
      {
        name: 'page-size',
        descKey: 'app.api.pager.desc.pageSize',
        version: '',
        type: 'Number',
        enum: '',
        defVal: '10',
        list: []
      },
      {
        name: 'total',
        descKey: 'app.api.pager.desc.total',
        version: '',
        type: 'Number',
        enum: '',
        defVal: '0',
        list: []
      },
      {
        name: 'pager-count',
        descKey: 'app.api.pager.desc.pagerCount',
        version: '',
        type: 'Number',
        enum: '',
        defVal: '7',
        list: []
      },
      {
        name: 'page-sizes',
        descKey: 'app.api.pager.desc.pageSizes',
        version: '',
        type: 'Array',
        enum: '',
        defVal: '[10,15,20,50,100]',
        list: []
      },
      {
        name: 'align',
        descKey: 'app.api.pager.desc.align',
        version: '',
        type: 'String',
        enum: 'left（左对其）, center（居中对其）, right（右对齐）',
        defVal: 'right',
        list: []
      },
      {
        name: 'border',
        descKey: 'app.api.pager.desc.border',
        version: '2.6.14',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'background',
        descKey: 'app.api.pager.desc.background',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'perfect',
        descKey: 'app.api.pager.desc.perfect',
        version: '1.15.12',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
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
        name: 'current-change',
        desc: '当前页发生改变时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: 'currentPage',
        list: []
      },
      {
        name: 'size-change',
        desc: '每页大小发生改变时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: 'pageSize',
        list: []
      },
      {
        name: 'page-change',
        desc: '分页发生改变时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{type, currentPage, pageSize}',
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
        name: 'prevPage()',
        desc: '跳转到上一页',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'nextPage()',
        desc: '跳转到下一页',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'jumpPage(currentPage)',
        desc: '跳转到指定页',
        version: '',
        type: '',
        enum: '',
        defVal: 'currentPage',
        list: []
      },
      {
        name: 'changePageSize(pageSize)',
        desc: '更改每页大小',
        version: '',
        type: '',
        enum: '',
        defVal: 'pageSize',
        list: []
      }
    ]
  }
]

export default apis
