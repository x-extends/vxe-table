import XEUtils from 'xe-utils'
import tableAPI from './table'
import columnAPI from './column'
import toolbarAPI from './toolbar'
import pagerAPI from './pager'
import formAPI from './form'
import formItemAPI from './form-item'

const toolbarSlots = XEUtils.clone(toolbarAPI.find(item => item.name === 'Slots'), true)
toolbarSlots.name = 'slots'

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
        name: 'form-config',
        descKey: 'app.api.grid.desc.formConfig',
        version: '1.15.18',
        type: 'Boolean, Object',
        enum: '',
        defVal: '',
        list: XEUtils.clone(formAPI.find(item => item.name === 'Props'), true).list.map(item => Object.assign({}, item, { name: XEUtils.camelCase(item.name) })).concat([
          {
            name: 'items',
            desc: '项配置',
            version: '',
            type: 'Array',
            enum: '',
            defVal: '',
            list: XEUtils.clone(formItemAPI.find(item => item.name === 'Props'), true).list.map(item => Object.assign({}, item, { name: XEUtils.camelCase(item.name) }))
          }
        ])
      },
      {
        name: 'toolbar',
        descKey: 'app.api.grid.desc.toolbar',
        version: '',
        type: 'Boolean, Object',
        enum: '',
        defVal: '',
        list: XEUtils.clone(toolbarAPI.find(item => item.name === 'Props').list, true).concat([{
          name: 'zoom',
          desc: '是否允许最大化显示',
          version: '1.15.14',
          type: 'Boolean, Object',
          enum: '',
          defVal: '',
          list: [
            {
              name: 'escRestore',
              desc: '是否允许按 Esc 键还原',
              version: '',
              type: 'Boolean',
              enum: '',
              defVal: 'true',
              list: []
            },
            {
              name: 'iconIn',
              desc: '自定义最大化图标',
              version: '',
              type: 'String',
              enum: '',
              defVal: '',
              list: []
            },
            {
              name: 'iconOut',
              desc: '自定义还原图标',
              version: '',
              type: 'String',
              enum: '',
              defVal: '',
              list: []
            }
          ]
        }, toolbarSlots])
      },
      {
        name: 'pager-config',
        descKey: 'app.api.grid.desc.pagerConfig',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '',
        list: XEUtils.mapTree(pagerAPI.find(item => item.name === 'Props').list.filter(item => !['size', 'loading'].includes(item.name)), item => Object.assign({}, item, { name: XEUtils.camelCase(item.name) }))
      },
      {
        name: 'proxy-config',
        descKey: 'app.api.grid.desc.proxyConfig',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'autoLoad',
            desc: '是否自动加载查询数据',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'message',
            desc: '是否显示内置的消息提示（可以设为 false 关闭内置的消息提示）',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'index',
            disabled: true,
            desc: '即将废弃，请使用 seq',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'seq',
            desc: '存在 type=index 列时有效，是否代理动态序号（根据分页动态变化）',
            version: '1.15.18',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'sort',
            desc: '是否代理排序',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'filter',
            desc: '是否代理筛选',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'form',
            desc: '是否代理表单',
            version: '1.15.18',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'props',
            desc: '获取的属性配置',
            version: '',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'list',
                desc: '响应结果中获取数据列表的属性',
                version: '',
                type: 'String',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'data',
                disabled: true,
                desc: '即将废弃，请使用 result',
                version: '',
                type: 'String',
                enum: '',
                defVal: 'result',
                list: []
              },
              {
                name: 'result',
                desc: '只对 pager-config 配置了有效，响应结果中获取数据列表的属性',
                version: '',
                type: 'String',
                enum: '',
                defVal: 'result',
                list: []
              },
              {
                name: 'total',
                desc: '只对 pager-config 配置了有效，响应结果中获取分页的属性',
                version: '',
                type: 'String',
                enum: '',
                defVal: 'page.total',
                list: []
              }
            ]
          },
          {
            name: 'ajax',
            desc: '代理配置（任何使用 Promise API 的任何库都可以对接数据代理）',
            version: '',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'query',
                desc: '查询方法 Function({ page, sort, filters, form }, ...arguments)，默认处理的数据结构 {page: {total: 0}, result: []}；如果使用了服务端排序，sort 属性可以获取相关信息；如果使用了服务端过滤，filter 属性可以获取相关信息；如果使用了表单，form 属性可以获取相关信息',
                version: '',
                type: 'Function / Promise',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'delete',
                desc: '删除方法 Function({ body }, ...arguments)，提交的参数 { removeRecords }',
                version: '',
                type: 'Function / Promise',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'save',
                desc: '保存方法 Function({ body }, ...arguments)，提交的参数 { insertRecords, updateRecords, removeRecords, pendingRecords}',
                version: '',
                type: 'Function / Promise',
                enum: '',
                defVal: '',
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
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'form',
        desc: '只对 form-config 配置时有效，表单模板',
        version: '1.15.18',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'top',
        desc: '表格顶部模板',
        version: '1.15.19',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'bottom',
        desc: '表格底部模板',
        version: '1.15.19',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'pager',
        desc: '只对 pager-config 配置时有效，分页模板',
        version: '1.15.18',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'buttons',
        desc: '只对 toolbar 配置时有效，工具栏按钮列表模板',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'tools',
        desc: '只对 toolbar 配置时有效，工具栏右侧工具列表',
        version: '1.15.18',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'empty',
        desc: '空数据时显示的文本内容',
        version: '',
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
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'current-page-change',
        disabled: true,
        desc: '即将废弃，请使用 page-change',
        version: '',
        type: '',
        enum: '',
        defVal: '{currentPage}',
        list: []
      },
      {
        name: 'page-size-change',
        disabled: true,
        desc: '即将废弃，请使用 page-change',
        version: '',
        type: '',
        enum: '',
        defVal: '{pageSize}',
        list: []
      },
      {
        name: 'page-change',
        desc: '只对 pager-config 配置时有效，分页发生改变时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{type, currentPage, pageSize}',
        list: []
      },
      {
        name: 'form-submit',
        desc: '只对 form-config 配置时有效，表单提交时会触发该事件',
        version: '1.15.18',
        type: '',
        enum: '',
        defVal: '{data}, event',
        list: []
      },
      {
        name: 'form-submit-invalid',
        desc: '只对 form-config 配置时有效，表单提交时如果校验不通过会触发该事件',
        version: '1.15.18',
        type: '',
        enum: '',
        defVal: '{data, errMap}, event',
        list: []
      },
      {
        name: 'form-reset',
        desc: '只对 form-config 配置时有效，表单重置时会触发该事件',
        version: '1.15.18',
        type: '',
        enum: '',
        defVal: '{data}, event',
        list: []
      },
      {
        name: 'form-toggle-collapse',
        desc: '只对 form-config 配置时有效，当折叠按钮被手动点击时会触发该事件',
        version: '1.15.18',
        type: '',
        enum: '',
        defVal: '{collapse, data}, event',
        list: []
      },
      {
        name: 'toolbar-button-click',
        desc: '只对 toolbar.buttons 配置时有效，当工具栏的按钮被点击时会后触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{code}, event',
        list: []
      },
      {
        name: 'zoom',
        desc: '只对 toolbar.zoom 配置时有效，当工具栏的缩放按钮被点击时会后触发该事件',
        version: '1.15.23',
        type: '',
        enum: '',
        defVal: '{maximize}, event',
        list: []
      },
      {
        name: 'custom',
        desc: '只对 toolbar.custom 配置时有效，当工具栏的自定义列按钮被点击时会后触发该事件',
        version: '1.15.23',
        type: '',
        enum: '',
        defVal: '{type}, event',
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
        name: 'commitProxy(code, ...arguments)',
        desc: '给数据代理提交指令（支持额外的参数，对于很多特殊场景很有用）',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'zoom()',
        desc: '切换表格最大化/还原',
        version: '1.15.14',
        type: 'Promise<status>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'isMaximized()',
        desc: '判断是否最大化显示',
        version: '1.15.14',
        type: 'Boolean',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  }
]

const gridAPI = XEUtils.clone(tableAPI, true).map(item => {
  const rest = apis.find(obj => obj.name === item.name)
  rest.list = item.list.concat(rest.list)
  return rest
})

XEUtils.eachTree(gridAPI, (item, index, obj, paths, parent) => {
  if (parent && parent.name === 'buttons' && item.name === 'code') {
    item.list = [
      {
        name: 'reload',
        desc: '刷新数据并恢复到初始状态；触发 ajax.query 方法',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'query',
        desc: '刷新数据；会自动触发 ajax.query 方法',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'insert',
        desc: '新增数据',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'insert_actived',
        desc: '新增数据并且默认激活第一个可编辑的单元格',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'mark_cancel',
        desc: '将选中的数据标记或取消删除',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'delete_selection',
        desc: '删除选中行；会自动触发 ajax.delete 方法',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'remove_selection',
        desc: '移除选中行',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'save',
        desc: '保存数据；会自动触发 ajax.save 方法，并且在 Promise 完成之后重新触发 ajax.query 方法',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'import',
        desc: '直接导入',
        version: '2.6.14',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'open_import',
        desc: '高级导入',
        version: '2.6.14',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'export',
        desc: '直接导出',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'open_export',
        desc: '高级导出',
        version: '2.6.14',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'reset_custom',
        desc: '重置个性化数据（显示/隐藏列、列宽拖动状态）',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  }
}, { children: 'list' })

const columnSlots = XEUtils.clone(columnAPI.find(item => item.name === 'Slots'), true)
columnSlots.name = 'slots'
columnSlots.list.forEach(item => {
  item.type = 'String, Function'
})

gridAPI.find(item => item.name === 'Props').list.splice(1, 0, {
  name: 'columns',
  descKey: 'app.api.table.desc.columns',
  type: 'Array',
  enum: '',
  defVal: '',
  list: XEUtils.mapTree(columnAPI.find(item => item.name === 'Props').list, item => Object.assign({}, item, { name: XEUtils.camelCase(item.name) })).concat([
    {
      name: 'children',
      desc: '表头分组',
      version: '',
      type: 'Array<ColumnConfig>',
      enum: '',
      defVal: '',
      list: []
    },
    columnSlots
  ])
})

export default gridAPI
