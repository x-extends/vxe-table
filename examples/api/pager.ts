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
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'loading',
        descKey: 'app.api.pager.desc.loading',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'layouts',
        descKey: 'app.api.pager.desc.layouts',
        version: '',
        type: 'string[]',
        enum: 'PrevJump, PrevPage, Number, JumpNumber, NextPage, NextJump, Sizes, Jump, FullJump, PageCount, Total',
        defVal: '默认 [PrevJump, PrevPage, Jump, PageCount, NextPage, NextJump, Sizes, Total]，继承 setup.pager.layouts',
        list: []
      },
      {
        name: 'current-page',
        descKey: 'app.api.pager.desc.currentPage',
        version: '',
        type: 'number',
        enum: '',
        defVal: '1',
        list: []
      },
      {
        name: 'page-size',
        descKey: 'app.api.pager.desc.pageSize',
        version: '',
        type: 'number',
        enum: '',
        defVal: '默认 10，继承 setup.pager.pageSize',
        list: []
      },
      {
        name: 'total',
        descKey: 'app.api.pager.desc.total',
        version: '',
        type: 'number',
        enum: '',
        defVal: '0',
        list: []
      },
      {
        name: 'pager-count',
        descKey: 'app.api.pager.desc.pagerCount',
        version: '',
        type: 'number',
        enum: '',
        defVal: '默认 7，继承 setup.pager.pagerCount',
        list: []
      },
      {
        name: 'page-sizes',
        descKey: 'app.api.pager.desc.pageSizes',
        version: '',
        type: 'number[] | Array<{label: string, value: number}>',
        enum: '',
        defVal: '默认 [10,15,20,50,100]，继承 setup.pager.pageSizes',
        list: []
      },
      {
        name: 'align',
        descKey: 'app.api.pager.desc.align',
        version: '',
        type: 'string',
        enum: 'left（左对其）, center（居中对其）, right（右对齐）',
        defVal: '默认 right，继承 setup.pager.align',
        list: []
      },
      {
        name: 'border',
        descKey: 'app.api.pager.desc.border',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.pager.border',
        list: []
      },
      {
        name: 'background',
        descKey: 'app.api.pager.desc.background',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.pager.background',
        list: []
      },
      {
        name: 'perfect',
        desc: '配套的样式',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.pager.perfect',
        list: []
      },
      {
        name: 'class-name',
        desc: '给分页附加 className',
        version: '4.0.9',
        type: 'string, ({}) => string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'auto-hidden',
        desc: '当只有一页时自动隐藏',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.pager.autoHidden',
        list: []
      },
      {
        name: 'icon-prev-page',
        descKey: 'app.api.pager.desc.iconPrevPage',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'icon-jump-prev',
        descKey: 'app.api.pager.desc.iconJumpPrev',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'icon-jump-next',
        descKey: 'app.api.pager.desc.iconJumpNext',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'iconnext-page',
        descKey: 'app.api.pager.desc.iconNextPage',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'icon-jump-more',
        descKey: 'app.api.pager.desc.iconJumpMore',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
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
        name: 'left',
        desc: '自定义左侧模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{}',
        list: []
      },
      {
        name: 'right',
        desc: '自定义右侧模板',
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
        name: 'page-change',
        desc: '分页发生改变时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ type, currentPage, pageSize, $event }',
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
      //   name: 'prevPage()',
      //   desc: '跳转到上一页',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // },
      // {
      //   name: 'nextPage()',
      //   desc: '跳转到下一页',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // },
      // {
      //   name: 'prevJump()',
      //   desc: '向上翻页',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // },
      // {
      //   name: 'nextJump()',
      //   desc: '向下翻页',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // },
      // {
      //   name: 'jumpPage(currentPage)',
      //   desc: '跳转到指定页',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: 'currentPage: number',
      //   list: []
      // }
    ]
  }
]

export default apis
