"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  filter: function filter(field, callback) {
    var column = this.getColumnByField(field);
    var filters = column.filters;

    if (callback) {
      var rest = callback(filters);

      if (_xeUtils.default.isArray(rest)) {
        column.filters = _tools.UtilTools.getFilters(rest);
      }
    }

    return Promise.resolve(filters);
  },

  /**
   * 点击筛选事件
   */
  triggerFilterEvent: function triggerFilterEvent(evnt, column, params) {
    var $refs = this.$refs,
        filterStore = this.filterStore;

    if (filterStore.column === column && filterStore.visible) {
      filterStore.visible = false;
    } else {
      var targetElem = evnt.target;
      var filterWrapper = $refs.filterWrapper;

      var _DomTools$getAbsolute = _tools.DomTools.getAbsolutePos(targetElem),
          top = _DomTools$getAbsolute.top,
          left = _DomTools$getAbsolute.left;

      Object.assign(filterStore, {
        args: params,
        multiple: column.filterMultiple,
        options: column.filters,
        column: column,
        style: {
          zIndex: _conf.default.tooltip.zIndex,
          top: "".concat(top + targetElem.clientHeight + 6, "px"),
          left: "".concat(left, "px")
        },
        visible: true
      });
      filterStore.isAllSelected = filterStore.options.every(function (item) {
        return item.checked;
      });
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(function (item) {
        return item.checked;
      });
      this.$nextTick(function () {
        var filterWrapperElem = filterWrapper.$el;
        filterStore.style.top = "".concat(top + targetElem.clientHeight + 6, "px");
        filterStore.style.left = "".concat(left - filterWrapperElem.clientWidth / 2 + 10, "px");
      });
    }
  },
  // 确认筛选
  confirmFilterEvent: function confirmFilterEvent(evnt) {
    var visibleColumn = this.visibleColumn,
        filterStore = this.filterStore,
        remoteFilter = this.remoteFilter,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad;
    var column = filterStore.column;
    var property = column.property;
    var values = [];
    var datas = [];
    column.filters.forEach(function (item) {
      if (item.checked) {
        values.push(item.value);
        datas.push(item.data);
      }
    });
    filterStore.visible = false; // 如果是服务端筛选，则跳过本地筛选处理

    if (!remoteFilter) {
      this.handleData(true);
    }

    var filterList = [];
    visibleColumn.filter(function (column) {
      var property = column.property,
          filters = column.filters;
      var valueList = [];
      var dataList = [];

      if (filters && filters.length) {
        filters.forEach(function (item) {
          if (item.checked) {
            valueList.push(item.value);
            dataList.push(item.data);
          }
        }); // 在 v3.0 中废弃 prop

        filterList.push({
          column: column,
          property: property,
          field: property,
          prop: property,
          values: valueList,
          datas: dataList
        });
      }
    }); // 在 v3.0 中废弃 prop

    _tools.UtilTools.emitEvent(this, 'filter-change', [{
      column: column,
      property: property,
      field: property,
      prop: property,
      values: values,
      datas: datas,
      filters: filterList,
      $table: this
    }]);

    this.updateFooter();

    if (scrollXLoad || scrollYLoad) {
      this.clearScroll();

      if (scrollYLoad) {
        this.updateScrollYSpace();
      }
    }

    this.closeFilter();
    this.$nextTick(this.recalculate);
  },
  // 重置筛选
  resetFilterEvent: function resetFilterEvent(evnt) {
    this.filterStore.options.forEach(function (item) {
      item.checked = false;
      item.data = item._data;
    });
    this.confirmFilterEvent(evnt);
  },
  clearFilter: function clearFilter(field) {
    var column = arguments.length ? this.getColumnByField(field) : null;
    var filterStore = this.filterStore;

    var handleClear = function handleClear(column) {
      var filters = column.filters;

      if (filters && filters.length) {
        filters.forEach(function (item) {
          item.checked = false;
          item.data = item._data;
        });
      }
    };

    if (column) {
      handleClear(column);
    } else {
      this.visibleColumn.forEach(handleClear);
    }

    if (!column || column !== filterStore.column) {
      Object.assign(filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      });
    }

    return this.updateData();
  }
};
exports.default = _default;