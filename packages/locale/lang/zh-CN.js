export default {
  vxe: {
    error: {
      groupFixed: '如果使用分组表头，固定列必须在左右两侧',
      notResizable: '横向虚拟滚动不支持 resizable',
      cellEditRender: '渲染器 cell-render 和 edit-render 不能同时使用',
      scrollOriginal: '虚拟滚动启用后只能导出源数据，请将设置 original=true',
      treeFixedExpand: '树结构的固定列与展开行功能有冲突',
      scrollYHeight: '启用虚拟滚动必须要设置 height 或 max-height',
      unableInsert: '无法插入到指定位置',
      useErr: '安装 {{0}} 模块时发生错误，顺序不正确',

      barUnableLink: '工具栏无法关联表格',
      toolbarId: '工具栏需要设置唯一 id',

      reqModule: '缺少 {{0}} 模块',
      emptyProp: '参数 {{0}} 不允许为空',
      notFunc: '{{0}} 方法不存在',
      noTree: '树结构不支持 {{0}}',
      delFunc: '方法 {{0}} 已废弃，请使用 {{1}}',
      delProp: '参数 {{0}} 已废弃，请使用 {{1}}'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      allFilter: '全部'
    },
    column: {
      indexTitle: '#'
    },
    grid: {
      selectOneRecord: '请至少选择一条记录！',
      deleteSelectRecord: '您确定要删除所选记录吗？',
      removeSelectRecord: '您确定要移除所选记录吗？',
      dataUnchanged: '数据未改动！ ',
      saveSuccess: '保存成功'
    },
    pager: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {{total}} 条记录',
      pageClassifier: '页'
    },
    alert: {
      title: '消息提示'
    },
    button: {
      confirm: '确认',
      cancel: '取消'
    },
    toolbar: {
      expTitle: '导出数据',
      expName: '文件名',
      expNamePlaceholder: '请输入文件名',
      expSuffix: '文件类型',
      expType: '要导出的数据',
      expAll: '全部数据',
      expSelected: '选中数据',
      expColumn: '要导出的字段',
      expOpts: '导出参数',
      expOptHeader: '表头',
      expOptOriginal: '源',
      expConfirm: '导出'
    }
  }
}
