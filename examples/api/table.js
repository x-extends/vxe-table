import XEUtils from 'xe-utils'

const contextMenuApi = [
  {
    name: 'disabled',
    desc: '是否禁用右键',
    type: 'Boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'options',
    desc: '菜单配置',
    type: 'Array<Array>',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'code',
        desc: '菜单键值',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'name',
        desc: '菜单名称',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'prefixIcon',
        desc: '前缀图标 className',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'suffixIcon',
        desc: '后缀图标 className',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'disabled ',
        desc: '是否禁用',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'children ',
        desc: '二级菜单（最多只允许有二级）',
        type: 'Array',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'code',
            desc: '菜单键值',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'name',
            desc: '菜单名称',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'prefixIcon',
            desc: '前缀图标 className',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'disabled ',
            desc: '是否禁用',
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
    name: 'visibleMethod',
    desc: '该函数 Function({row, rowIndex, column, columnIndex}) 的返回值用来决定是否允许显示右键菜单',
    type: 'Function',
    enum: '',
    defVal: '',
    list: []
  }
]
const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'data',
        descKey: 'app.api.table.desc.data',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'customs',
        descKey: 'app.api.table.desc.customs',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'height',
        descKey: 'app.api.table.desc.height',
        type: 'Number, String',
        enum: 'auto（铺满父容器高度），数值px',
        defVal: '',
        list: []
      },
      {
        name: 'max-height',
        descKey: 'app.api.table.desc.maxHeight',
        type: 'Number, String',
        enum: '数值px',
        defVal: '',
        list: []
      },
      {
        name: 'auto-resize',
        descKey: 'app.api.table.desc.autoResize',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'resizable',
        descKey: 'app.api.table.desc.resizable',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'stripe',
        descKey: 'app.api.table.desc.stripe',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'border',
        descKey: 'app.api.table.desc.border',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'size',
        descKey: 'app.api.table.desc.size',
        type: 'String',
        enum: 'medium,small,mini',
        defVal: '',
        list: []
      },
      {
        name: 'fit',
        descKey: 'app.api.table.desc.fit',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'loading',
        descKey: 'app.api.table.desc.loading',
        type: 'Boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'show-header',
        descKey: 'app.api.table.desc.showHeader',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'start-index',
        descKey: 'app.api.table.desc.startIndex',
        type: 'Number',
        enum: '',
        defVal: '0',
        list: []
      },
      {
        name: 'highlight-current-row',
        descKey: 'app.api.table.desc.highlightCurrentRow',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'highlight-hover-row',
        descKey: 'app.api.table.desc.highlightHoverRow',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'highlight-current-column',
        descKey: 'app.api.table.desc.highlightCurrentColumn',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'highlight-hover-column',
        descKey: 'app.api.table.desc.highlightHoverColumn',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'highlight-cell',
        descKey: 'app.api.table.desc.highlightCell',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'row-class-name',
        descKey: 'app.api.table.desc.rowClassName',
        type: 'String, Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'cell-class-name',
        descKey: 'app.api.table.desc.cellClassName',
        type: 'String, Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'header-row-class-name',
        descKey: 'app.api.table.desc.headerRowClassName',
        type: 'String, Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'header-cell-class-name',
        descKey: 'app.api.table.desc.headerCellClassName',
        type: 'String, Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-row-class-name',
        descKey: 'app.api.table.desc.footerRowClassName',
        type: 'String, Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-cell-class-name',
        descKey: 'app.api.table.desc.footerCellClassName',
        type: 'String, Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'show-footer',
        descKey: 'app.api.table.desc.showFooter',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'footer-method',
        descKey: 'app.api.table.desc.footerMethod',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'span-method',
        descKey: 'app.api.table.desc.spanMethod',
        type: 'Object',
        enum: '',
        defVal: '{ rowspan: 1, colspan: 1}',
        list: []
      },
      {
        name: 'show-overflow',
        descKey: 'app.api.table.desc.showOverflow',
        type: 'Boolean, String',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'show-header-overflow',
        descKey: 'app.api.table.desc.showHeaderOverflow',
        type: 'Boolean, String',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'remote-sort',
        descKey: 'app.api.table.desc.remoteSort',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'remote-filter',
        descKey: 'app.api.table.desc.remoteFilter',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'row-key',
        descKey: 'app.api.table.desc.rowKey',
        type: 'Number, String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'radio-config',
        descKey: 'app.api.table.desc.radioConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'labelField',
            desc: '列显示的属性，可以直接显示在列中',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            type: 'String',
            enum: 'default（默认）,cell（点击单元格触发）,row（点击行触发）',
            defVal: 'default',
            list: []
          }
        ]
      },
      {
        name: 'select-config',
        descKey: 'app.api.table.desc.selectConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'key',
            desc: '行数据中的唯一主键',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'reserve',
            desc: '是否保留勾选状态，对于某些场景下非常有用，比如分页之后还保留之前选中的状态（需要设置 rowKey || key）',
            type: 'String',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'labelField',
            desc: '列显示的属性，可以直接显示在列中',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkField',
            desc: '绑定选中属性，如果设置了该属性渲染速度可以提升n倍（建议数据量大时使用）',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkAll',
            desc: '默认勾选所有',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'checkRowKeys',
            desc: '默认勾选开指定行（需要设置 rowKey || key）',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkMethod',
            desc: '是否允许勾选的方法，该方法 Function({row, rowIndex}) 的返回值用来决定这一行的 CheckBox 是否可以勾选',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            type: 'String',
            enum: 'default（默认）,cell（点击单元格触发）,row（点击行触发）',
            defVal: 'default',
            list: []
          }
        ]
      },
      {
        name: 'tooltip-config',
        descKey: 'app.api.table.desc.tooltipConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'zIndex',
            desc: '自定义 tooltip 的堆叠顺序（对于在弹框中使用是由于堆叠被覆盖时可能会用到）',
            type: 'Number',
            enum: '',
            defVal: '99',
            list: []
          },
          {
            name: 'theme',
            desc: '列 tooltip 的主题',
            type: 'String',
            enum: 'dark,light',
            defVal: 'dark',
            list: []
          }
        ]
      },
      {
        name: 'expand-config',
        descKey: 'app.api.table.desc.expandConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'key',
            desc: '行数据中的唯一主键',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'expandAll',
            desc: '默认展开所有行',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'expandRowKeys',
            desc: '默认展开指定行（需要设置 rowKey || key）',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'accordion',
            desc: '对于同一级的节点，每次只能展开一个',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            type: 'String',
            enum: 'default（点击按钮触发）,cell（点击单元格触发）,row（点击行触发）',
            defVal: 'default',
            list: []
          }
        ]
      },
      {
        name: 'tree-config',
        descKey: 'app.api.table.desc.treeConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'key',
            desc: '行数据中的唯一主键（需要设置 rowKey 或 key）',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'children',
            desc: '树子节点的属性',
            type: 'String',
            enum: '',
            defVal: 'children',
            list: []
          },
          {
            name: 'indent',
            desc: '树节点的缩进',
            type: 'Number',
            enum: '',
            defVal: '16',
            list: []
          },
          {
            name: 'expandAll',
            desc: '默认展开所有子孙树节点',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'expandRowKeys',
            desc: '默认展开指定树节点',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'accordion',
            desc: '对于同一级的节点，每次只能展开一个',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            type: 'String',
            enum: 'default（点击按钮触发）, cell（点击单元格触发）, row（点击行触发）',
            defVal: 'default',
            list: []
          }
        ]
      },
      {
        name: 'context-menu',
        descKey: 'app.api.table.desc.contextMenu',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'header',
            desc: '表头的快捷菜单',
            type: 'Object',
            enum: '',
            defVal: '',
            list: XEUtils.clone(contextMenuApi, true)
          },
          {
            name: 'body',
            desc: '内容的快捷菜单',
            type: 'Object',
            enum: '',
            defVal: '',
            list: XEUtils.clone(contextMenuApi, true)
          },
          {
            name: 'footer',
            desc: '表尾的快捷菜单',
            type: 'Object',
            enum: '',
            defVal: '',
            list: XEUtils.clone(contextMenuApi, true)
          }
        ]
      },
      {
        name: 'mouse-config',
        descKey: 'app.api.table.desc.mouseConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'selected',
            desc: '开启左键选中功能',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
          // {
          //   name: 'checked',
          //   desc: '开启鼠标移动单元格批量选中功能',
          //   type: 'Boolean',
          //   enum: '',
          //   defVal: 'false',
          //   list: []
          // }
        ]
      },
      {
        name: 'keyboard-config',
        descKey: 'app.api.table.desc.keyboardConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'isArrow',
            desc: '开启方向键功能',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isDel',
            desc: '开启删除键功能',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isTab',
            desc: '开启 Tab 键功能',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          // {
          //   name: 'isCut',
          //   desc: '开启复制粘贴功能',
          //   type: 'Boolean',
          //   enum: '',
          //   defVal: 'false',
          //   list: []
          // },
          {
            name: 'isEdit',
            desc: '开启任意键进入编辑（功能键除外）',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'editMethod',
            desc: '只对 isEdit=true 有效，用于重写选中编辑处理逻辑，该函数 Function({seq, row, rowIndex, column, columnIndex, cell}) 可以返回 false 来阻止默认行为',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'edit-config',
        descKey: 'app.api.table.desc.editConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'key',
            desc: '行数据中的唯一主键（需要设置 rowKey 或 key）',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            type: 'String',
            enum: 'manual（手动触发方式，只能用于 mode=row）,click（点击触发编辑）,dblclick（双击触发编辑）',
            defVal: 'click',
            list: []
          },
          {
            name: 'mode',
            desc: '编辑模式',
            type: 'String',
            enum: 'cell（单元格编辑模式）,row（行编辑模式）',
            defVal: 'cell',
            list: []
          },
          {
            name: 'showIcon',
            desc: '是否显示列头编辑图标',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'showStatus',
            desc: '是否显示单元格值的修改状态',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'autoClear',
            desc: '当点击非编辑列之后，是否自动清除单元格的激活状态',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'activeMethod',
            desc: '该方法 Function({row, rowIndex, column, columnIndex}) 决定该单元格是否允许编辑',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'valid-config',
        descKey: 'app.api.table.desc.validConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'message',
            desc: '校验提示框的方式',
            type: 'String',
            enum: 'default（如果不设置高度，则默认第一行使用 tooltip，之后使用 inline）, none（关闭提示）, inline（强制使用内联的提示）, tooltip（强制使用 tooltip 提示）',
            defVal: 'default',
            list: []
          },
          {
            name: 'maxWidth',
            desc: '所有提示框的最大宽度（对于列比较小的场景下可能会用到）',
            type: 'Number',
            enum: '',
            defVal: '320',
            list: []
          }
        ]
      },
      {
        name: 'edit-rules',
        descKey: 'app.api.table.desc.editRules',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'required',
            desc: '是否必填',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'min',
            desc: '校验值最小长度（如果 type=number 则比较值大小）',
            type: 'Number',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'max',
            desc: '校验值最大长度（如果 type=number 则比较值大小）',
            type: 'Number',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'type',
            desc: '数据校验的类型',
            type: 'String',
            enum: 'Number, String',
            defVal: 'string',
            list: []
          },
          {
            name: 'pattern',
            desc: '正则校验',
            type: 'RegExp',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'validator',
            desc: '自定义校验方法，Function(rule, value, callback, {rules,row,column,rowIndex,columnIndex})',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发校验方式（如果为空，则为常规校验方式； 如果指定触发方式，则只会在匹配情况下进行校验）',
            type: 'String',
            enum: 'blur,change',
            defVal: '',
            list: []
          },
          {
            name: 'maxWidth',
            desc: '提示框的最大宽度（对于列比较小的场景下可能会用到）',
            type: 'Number',
            enum: '',
            defVal: '320',
            list: []
          }
        ]
      },
      {
        name: 'optimization',
        descKey: 'app.api.table.desc.optimization',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'animat',
            desc: '表格动画效果开关（关闭后视觉效果更快）',
            type: 'Object',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'scrollX',
            desc: '横向 X 可视渲染配置',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'gt',
                desc: '指定大于多少范围时自动启动虚拟滚动渲染',
                type: 'Number',
                enum: '',
                defVal: '60',
                list: []
              },
              {
                name: 'oSize',
                desc: '超过指定阈值重新渲染',
                type: 'Number',
                enum: '',
                defVal: '6',
                list: []
              },
              {
                name: 'rSize',
                desc: '每次渲染条数',
                type: 'Number',
                enum: '',
                defVal: '16',
                list: []
              },
              {
                name: 'vSize',
                desc: '指定可视区域条数，默认自动计算',
                type: 'Number',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'adaptive',
                desc: '自动适配最优的渲染方式',
                type: 'Boolean',
                enum: '',
                defVal: 'true',
                list: []
              }
            ]
          },
          {
            name: 'scrollY',
            desc: '纵向 Y 可视渲染配置',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'gt',
                desc: '指定大于多少范围时自动启动虚拟滚动渲染',
                type: 'Number',
                enum: '',
                defVal: '500',
                list: []
              },
              {
                name: 'oSize',
                desc: '超过指定阈值重新渲染',
                type: 'Number',
                enum: '',
                defVal: '25',
                list: []
              },
              {
                name: 'rSize',
                desc: '每次渲染条数',
                type: 'Number',
                enum: '',
                defVal: '70',
                list: []
              },
              {
                name: 'vSize',
                desc: '指定可视区域条数，默认自动计算',
                type: 'Number',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'rHeight',
                desc: '指定行高，默认自动计算',
                type: 'Number',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'adaptive',
                desc: '自动适配最优的渲染方式',
                type: 'Boolean',
                enum: '',
                defVal: 'true',
                list: []
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
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'empty',
        descKey: 'app.api.table.desc.empty',
        type: '',
        enum: '',
        defVal: '暂无数据',
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
        name: 'current-change',
        descKey: 'app.api.table.desc.currentChange',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'radio-change',
        descKey: 'app.api.table.desc.radioChange',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'select-change',
        descKey: 'app.api.table.desc.selectChange',
        type: '',
        enum: '',
        defVal: '{selection,checked,row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'select-all',
        descKey: 'app.api.table.desc.selectAll',
        type: '',
        enum: '',
        defVal: '{selection,checked},event',
        list: []
      },
      {
        name: 'cell-click',
        descKey: 'app.api.table.desc.cellClick',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'cell-dblclick',
        descKey: 'app.api.table.desc.cellDblclick',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'header-cell-click',
        descKey: 'app.api.table.desc.headerCellClick',
        type: '',
        enum: '',
        defVal: '{$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'header-cell-dblclick',
        descKey: 'app.api.table.desc.headerCellDblclick',
        type: '',
        enum: '',
        defVal: '{$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'footer-cell-click',
        descKey: 'app.api.table.desc.footerCellClick',
        type: '',
        enum: '',
        defVal: '{$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'footer-cell-dblclick',
        descKey: 'app.api.table.desc.footerCellDblclick',
        type: '',
        enum: '',
        defVal: '{$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'cell-mouseenter',
        descKey: 'app.api.table.desc.cellMouseenter',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'cell-mouseleave',
        descKey: 'app.api.table.desc.cellMouseleave',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'sort-change',
        descKey: 'app.api.table.desc.sortChange',
        type: '',
        enum: '',
        defVal: '{column,field,order}',
        list: []
      },
      {
        name: 'filter-change',
        descKey: 'app.api.table.desc.filterChange',
        type: '',
        enum: '',
        defVal: '{column,field,values,filters}',
        list: []
      },
      {
        name: 'toggle-expand-change',
        descKey: 'app.api.table.desc.toggleExpandChange',
        type: '',
        enum: '',
        defVal: '{row,rowIndex},event',
        list: []
      },
      {
        name: 'toggle-tree-change',
        descKey: 'app.api.table.desc.toggleTreeChange',
        type: '',
        enum: '',
        defVal: '{row,rowIndex},event',
        list: []
      },
      {
        name: 'context-menu-click',
        descKey: 'app.api.table.desc.contextMenuClick',
        type: '',
        enum: '',
        defVal: '{menu,type,row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'edit-closed',
        descKey: 'app.api.table.desc.editClosed',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'edit-actived',
        descKey: 'app.api.table.desc.editActived',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'edit-disabled',
        descKey: 'app.api.table.desc.editDisabled',
        type: '',
        enum: '',
        defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell},event',
        list: []
      },
      {
        name: 'valid-error',
        descKey: 'app.api.table.desc.validError',
        type: '',
        enum: '',
        defVal: '{rule,row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell}',
        list: []
      },
      {
        name: 'scroll',
        descKey: 'app.api.table.desc.scroll',
        type: '',
        enum: '',
        defVal: '{type,fixed,scrollTop,scrollLeft},event',
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
        name: 'refresh()',
        desc: '刷新表格（对于某些特殊的场景可能会用到，比如树层节点元素发生变动）',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'loadData(datas)',
        desc: '加载数据（对于表格数据需要重载、局部递增场景下可能会用到）',
        type: 'Promise',
        enum: '',
        defVal: 'datas',
        list: []
      },
      {
        name: 'reloadData(datas)',
        desc: '加载数据并恢复到初始状态（对于表格数据需要重载、局部递增场景下可能会用到）',
        type: 'Promise',
        enum: '',
        defVal: 'datas',
        list: []
      },
      {
        name: 'loadColumn(columns)',
        desc: '加载列配置（对于表格列需要重载、局部递增场景下可能会用到）',
        type: 'Promise',
        enum: '',
        defVal: 'columns',
        list: []
      },
      {
        name: 'reloadCustoms(customs)',
        desc: '初始化加载显示/隐藏列（对于异步更新的场景下可能会用到）',
        type: 'Promise',
        enum: '',
        defVal: 'columns',
        list: []
      },
      {
        name: 'reloadColumn(columns)',
        desc: '加载列配置并恢复到初始状态（对于表格列需要重载、局部递增场景下可能会用到）',
        type: 'Promise',
        enum: '',
        defVal: 'columns',
        list: []
      },
      {
        name: 'insert(records)',
        desc: '往表格插入数据，从第一行新增一行或多行新数据',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: 'records',
        list: []
      },
      {
        name: 'insertAt(records, row)',
        desc: '往表格插入数据，从指定位置插入一行或多行；第二个参数：row 指定位置、null 从第一行插入、-1 从最后插入',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: 'records, row',
        list: []
      },
      {
        name: 'revert(rows, field)',
        desc: '还原更改，还原指定行 row 或者整个表格的数据',
        type: 'Promise',
        enum: '',
        defVal: 'rows?, field?',
        list: []
      },
      {
        name: 'remove(rows)',
        desc: '删除指定行数据，指定 row 或 [row, ...] 删除多条数据',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: 'rows',
        list: []
      },
      {
        name: 'removeSelecteds()',
        desc: '删除已选中的所有行数据',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getRowIndex(row)',
        desc: '根据 row 获取数据中的索引',
        type: 'Number',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'getRecords(rowIndex)',
        desc: '获取表格所有数据，和 data 属性一致行为，也可以指定索引获取数据',
        type: 'Array',
        enum: '',
        defVal: 'rowIndex?',
        list: []
      },
      {
        name: 'getTableData()',
        desc: '获取当前表格渲染中的数据（如果存在条件，则返回处理完条件之后的数据）',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getColumns(columnIndex)',
        desc: '获取表格所有列，也可以指定索引获取列',
        type: 'Array',
        enum: '',
        defVal: 'columnIndex?',
        list: []
      },
      {
        name: 'getColumnIndex(column)',
        desc: '根据 column 获取列中的索引',
        type: 'Number',
        enum: '',
        defVal: 'column',
        list: []
      },
      {
        name: 'getAllRecords()',
        desc: '获取表格数据集合',
        type: 'Array<{insertRecords, removeRecords, updateRecords}>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getInsertRecords()',
        desc: '获取新增数据',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getRemoveRecords()',
        desc: '获取已删除数据',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getUpdateRecords()',
        desc: '获取已修改数据',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getCurrentRow()',
        desc: '用于单选行，获取当前选中的数据',
        type: 'Row',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getSelectRecords()',
        desc: '用于多选行，获取已选中的数据',
        type: 'Array<Row>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getActiveRow()',
        desc: '获取已激活的行数据',
        type: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex,cell}',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'hasActiveRow(row)',
        desc: '检查行是否已激活为编辑状态',
        type: 'Boolean',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'hasRowChange(row, field)',
        desc: '检查行或列数据是否发生改变',
        type: 'Boolean',
        enum: '',
        defVal: 'row, field?',
        list: []
      },
      {
        name: 'hasRowExpand(row)',
        desc: '检查行是否已展开',
        type: 'Boolean',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'hasTreeExpand(row)',
        desc: '检查树节点是否已展开',
        type: 'Boolean',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'setActiveRow(row)',
        desc: '激活行编辑，如果是 mode=cell 则默认激活第一个单元格',
        type: 'Promise',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'setActiveCell(row, field)',
        desc: '激活单元格编辑',
        type: 'Promise',
        enum: '',
        defVal: 'row, field',
        list: []
      },
      {
        name: 'setSelectCell(row, field)',
        desc: '选中某个单元格',
        type: 'Promise',
        enum: '',
        defVal: 'row, field',
        list: []
      },
      {
        name: 'setRowExpansion(rows, checked)',
        desc: '设置展开行，二个参数设置这一行展开与否',
        type: 'Promise',
        enum: '',
        defVal: 'rows, checked',
        list: []
      },
      {
        name: 'setAllRowExpansion(checked)',
        desc: '设置所有行的展开与否',
        type: 'Promise',
        enum: '',
        defVal: 'checked',
        list: []
      },
      {
        name: 'setTreeExpansion(rows, checked)',
        desc: '设置展开树形节点，二个参数设置这一行展开与否',
        type: 'Promise',
        enum: '',
        defVal: 'rows, checked',
        list: []
      },
      {
        name: 'setAllTreeExpansion(checked)',
        desc: '设置所有树节点的展开与否',
        type: 'Promise',
        enum: '',
        defVal: 'checked',
        list: []
      },
      {
        name: 'setCurrentRow(row)',
        desc: '用于单选行，设置某一行为选中状态',
        type: 'Promise',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'setCurrentColumn(column)',
        desc: '用于单选列，设置某一列为选中状态',
        type: 'Promise',
        enum: '',
        defVal: 'column',
        list: []
      },
      {
        name: 'setSelection(rows, checked)',
        desc: '用于多选行，设置行为选中状态，第二个参数为选中与否',
        type: 'Promise',
        enum: '',
        defVal: 'rows, checked',
        list: []
      },
      {
        name: 'setAllSelection(checked)',
        desc: '用于多选行，设置所有行的选中状态',
        type: 'Promise',
        enum: '',
        defVal: 'checked',
        list: []
      },
      {
        name: 'toggleRowSelection(row)',
        desc: '用于多选行，切换某一行的选中状态',
        type: 'Promise',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'toggleAllSelection()',
        desc: '用于多选行，切换所有行的选中状态',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'toggleRowExpansion(row)',
        desc: '用于可展开表格，切换展开行',
        type: 'Promise',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'toggleTreeExpansion(row)',
        desc: '用于可树形表格，切换展开树形节点',
        type: 'Promise',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'clearCurrentRow()',
        desc: '用于单选行，清空用户的选择',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearCurrentColumn()',
        desc: '用于单选列，清空用户的选择列',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearSelection()',
        desc: '用于多选行，清空用户的选择',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearRowExpand()',
        desc: '清空展开行状态，数据会恢复成未展开的状态',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearTreeExpand()',
        desc: '清空树形节点的展开状态，数据会恢复成未展开的状态',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearSort()',
        desc: '清空排序条件，数据会恢复成未排序的状态',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearFilter()',
        desc: '清空筛选条件，数据会恢复成未筛选的状态',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      // {
      //   name: 'clearChecked()',
      //   desc: '清除单元格批量选中状态',
      //   type: 'Promise',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // },
      {
        name: 'clearSelected()',
        desc: '清除单元格选中状态',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearActived()',
        desc: '清除单元格激活状态',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      // {
      //   name: 'clearCopyed()',
      //   desc: '清空已复制的内容',
      //   type: 'Promise',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // },
      {
        name: 'clearData()',
        desc: '清空单元格内容',
        type: 'Promise',
        enum: '',
        defVal: '?',
        list: []
      },
      {
        name: 'clearScroll()',
        desc: '清除滚动相关信息，还原到初始状态',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearAll()',
        desc: '清除表格所有条件，还原到初始状态（对于增删改查的场景中可能会用到，比如在数据保存之后清除表格缓存）',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'closeFilter()',
        desc: '手动关闭筛选面板',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clostTooltip()',
        desc: '手动关闭 tooltip 提示',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'closeMenu()',
        desc: '手动关闭快捷菜单',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'recalculate()',
        desc: '重新计算并更新列宽',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'refreshColumn()',
        desc: '刷新列配置（对于显示/隐藏列场景下可能会用到）',
        type: 'Promise>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'updateFooter()',
        desc: '更新表尾合计（对于某些需要频繁更新的场景下可能会用到）',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'updateStatus(scope)',
        desc: '更新单元格状态（只对 showStatus=true 并且使用自定义渲染时，当值发生改变时才需要调用）',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getVirtualScroller()',
        desc: '获取虚拟滚动相关状态',
        type: 'Object',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'scrollTo(x, y)',
        desc: '如果有滚动条，则滚动到对应的位置',
        type: 'Promise',
        enum: '',
        defVal: 'x, y',
        list: []
      },
      {
        name: 'scrollToRow(row)',
        desc: '如果有滚动条，则滚动到对应的行',
        type: 'Promise',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'scrollToColumn(column)',
        desc: '如果有滚动条，则滚动到对应的列',
        type: 'Promise',
        enum: '',
        defVal: 'column',
        list: []
      },
      {
        name: 'sort(field,order)',
        desc: '手动对表格进行排序',
        type: 'Promise',
        enum: '',
        defVal: 'field,order',
        list: []
      },
      {
        name: 'validate(rows, callback)',
        desc: '表格校验函数，如果指定 row 或 rows 则校验指定一行或多行，否则校验整个表格。该回调函数会在校验结束后被调用，并传入两个参数：（是否校验成功，最近一列未通过校验的字段）。若不传入回调函数，则会返回一个 promise',
        type: 'Promise',
        enum: '',
        defVal: 'rows?,callback?',
        list: []
      },
      {
        name: 'fullValidate(rows, callback)',
        desc: '表格完整校验函数，和 validate 的区别就是会对数据的所有规则进行完整校验',
        type: 'Promise',
        enum: '',
        defVal: 'rows?,callback?',
        list: []
      },
      {
        name: 'exportCsv(options)',
        desc: '将表格数据导出为 .csv 文件，说明：支持IE、Edge、Chrome、Firefox 等常用浏览器（部分浏览器需要手动修改后缀名为 .csv）',
        type: 'Promise',
        enum: '',
        defVal: 'options',
        list: [
          {
            name: 'filename',
            desc: '文件名',
            type: 'String',
            enum: '',
            defVal: 'table.csv',
            list: []
          },
          {
            name: 'original',
            desc: '是否导出源数据（可视渲染启用后默认是 true）',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isHeader',
            desc: '是否显示表头',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'download',
            desc: '是否马上下载，如果设置为 false 则通过返回结果为内容的 Promise',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'data',
            desc: '自定义数据',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'columns',
            desc: '自定义列',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'columnFilterMethod',
            desc: '列过滤方法，该函数 Function(column,columnIndex) 的返回值用来决定该列是否导出',
            type: 'Function',
            enum: '',
            defVal: '默认过滤掉 type=index,selection,radio 和 field 为空的列',
            list: []
          },
          {
            name: 'dataFilterMethod',
            desc: '数据过滤方法，该函数 Function(row,rowIndex) 的返回值用来决定该数据是否导出',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      }
    ]
  }
]

export default apis
