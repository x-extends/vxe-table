"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browse = _tools.DomTools.browse;
var _default2 = {
  name: 'VxeList',
  mixins: [_size.default],
  props: {
    data: Array,
    height: [Number, String],
    maxHeight: [Number, String],
    loading: Boolean,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.list.size || _conf.default.size;
      }
    },
    autoResize: Boolean,
    syncResize: [Boolean, String, Number],
    scrollY: Object
  },
  data: function data() {
    return {
      scrollYLoad: false,
      bodyHeight: 0,
      topSpaceHeight: 0,
      items: []
    };
  },
  computed: {
    sYOpts: function sYOpts() {
      return Object.assign({}, _conf.default.list.scrollY, this.scrollY);
    },
    styles: function styles() {
      var height = this.height,
          maxHeight = this.maxHeight;
      var style = {};

      if (height) {
        style.height = isNaN(height) ? height : "".concat(height, "px");
      } else if (maxHeight) {
        style.height = 'auto';
        style.maxHeight = isNaN(maxHeight) ? maxHeight : "".concat(maxHeight, "px");
      }

      return style;
    }
  },
  watch: {
    data: function data(value) {
      this.loadData(value);
    },
    syncResize: function syncResize(value) {
      var _this = this;

      if (value) {
        this.recalculate();
        this.$nextTick(function () {
          return setTimeout(function () {
            return _this.recalculate();
          });
        });
      }
    }
  },
  created: function created() {
    Object.assign(this, {
      fullData: [],
      lastScrollLeft: 0,
      lastScrollTop: 0,
      scrollYStore: {
        startIndex: 0,
        endIndex: 0,
        visibleSize: 0
      }
    });
    this.loadData(this.data);

    _tools.GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.autoResize) {
      var resizeObserver = new _tools.ResizeEvent(function () {
        return _this2.recalculate();
      });
      resizeObserver.observe(this.$el);
      this.$resize = resizeObserver;
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$resize) {
      this.$resize.disconnect();
    }
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'resize');
  },
  render: function render(h) {
    var $scopedSlots = this.$scopedSlots,
        styles = this.styles,
        bodyHeight = this.bodyHeight,
        topSpaceHeight = this.topSpaceHeight,
        items = this.items,
        loading = this.loading;
    return [h('div', {
      class: ['vxe-list', {
        'is--loading': loading
      }]
    }, [h('div', {
      ref: 'virtualWrapper',
      class: 'vxe-list--virtual-wrapper',
      style: styles,
      on: {
        scroll: this.scrollEvent
      }
    }, [h('div', {
      ref: 'ySpace',
      class: 'vxe-list--y-space',
      style: {
        height: bodyHeight ? "".concat(bodyHeight, "px") : ''
      }
    }), h('div', {
      ref: 'body',
      class: 'vxe-list--body',
      style: {
        marginTop: topSpaceHeight ? "".concat(topSpaceHeight, "px") : ''
      }
    }, $scopedSlots.default ? $scopedSlots.default.call(this, {
      items: items,
      $list: this
    }, h) : [])]), h('div', {
      class: ['vxe-list--loading vxe-loading', {
        'is--visible': loading
      }]
    }, [h('div', {
      class: 'vxe-loading--spinner'
    })])])];
  },
  methods: {
    getParentElem: function getParentElem() {
      return this.$el.parentNode;
    },

    /**
     * 加载数据
     * @param {Array} datas 数据
     */
    loadData: function loadData(datas) {
      var _this3 = this;

      var sYOpts = this.sYOpts,
          scrollYStore = this.scrollYStore;
      var fullData = datas || [];
      scrollYStore.startIndex = 0;
      scrollYStore.visibleIndex = 0;
      this.fullData = fullData;
      this.scrollYLoad = sYOpts.gt > -1 && sYOpts.gt <= fullData.length;
      this.handleData();
      return this.computeScrollLoad().then(function () {
        _this3.refreshScroll();
      });
    },

    /**
     * 重新加载数据
     * @param {Array} datas 数据
     */
    reloadData: function reloadData(datas) {
      this.clearScroll();
      return this.loadData(datas);
    },
    handleData: function handleData() {
      var fullData = this.fullData,
          scrollYLoad = this.scrollYLoad,
          scrollYStore = this.scrollYStore;
      this.items = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0);
      return this.$nextTick();
    },

    /**
     * 重新计算列表
     */
    recalculate: function recalculate() {
      var $el = this.$el;

      if ($el.clientWidth && $el.clientHeight) {
        return this.computeScrollLoad();
      }

      return Promise.resolve();
    },

    /**
     * 清除滚动条
     */
    clearScroll: function clearScroll() {
      var _this4 = this;

      var scrollBodyElem = this.$refs.virtualWrapper;

      if (scrollBodyElem) {
        scrollBodyElem.scrollTop = 0;
      }

      return new Promise(function (resolve) {
        requestAnimationFrame(function () {
          resolve(_this4.$nextTick());
        });
      });
    },

    /**
     * 刷新滚动条
     */
    refreshScroll: function refreshScroll() {
      var _this5 = this;

      var lastScrollLeft = this.lastScrollLeft,
          lastScrollTop = this.lastScrollTop;
      return this.clearScroll().then(function () {
        if (lastScrollLeft || lastScrollTop) {
          _this5.lastScrollLeft = 0;
          _this5.lastScrollTop = 0;
          return _this5.scrollTo(lastScrollLeft, lastScrollTop);
        }
      });
    },

    /**
     * 如果有滚动条，则滚动到对应的位置
     * @param {Number} scrollLeft 左距离
     * @param {Number} scrollTop 上距离
     */
    scrollTo: function scrollTo(scrollLeft, scrollTop) {
      var _this6 = this;

      var scrollBodyElem = this.$refs.virtualWrapper;

      if (_ctor.default.isNumber(scrollLeft)) {
        scrollBodyElem.scrollLeft = scrollLeft;
      }

      if (_ctor.default.isNumber(scrollTop)) {
        scrollBodyElem.scrollTop = scrollTop;
      }

      if (this.scrollYLoad) {
        return new Promise(function (resolve) {
          return setTimeout(function () {
            return resolve(_this6.$nextTick());
          }, 50);
        });
      }

      return this.$nextTick();
    },
    computeScrollLoad: function computeScrollLoad() {
      var _this7 = this;

      return this.$nextTick().then(function () {
        var $refs = _this7.$refs,
            sYOpts = _this7.sYOpts,
            scrollYLoad = _this7.scrollYLoad,
            scrollYStore = _this7.scrollYStore;
        var rowHeight = 0;
        var firstItemElem;

        if (sYOpts.sItem) {
          firstItemElem = $refs.body.querySelector(sYOpts.sItem);
        }

        if (!firstItemElem) {
          firstItemElem = $refs.body.children[0];
        }

        if (firstItemElem) {
          rowHeight = firstItemElem.offsetHeight;
        }

        rowHeight = Math.max(20, rowHeight);
        scrollYStore.rowHeight = rowHeight; // 计算 Y 逻辑

        if (scrollYLoad) {
          var visibleYSize = Math.max(8, Math.ceil($refs.virtualWrapper.clientHeight / rowHeight));
          var offsetYSize = sYOpts.oSize ? _ctor.default.toNumber(sYOpts.oSize) : browse.msie ? 20 : browse.edge ? 10 : 0;
          scrollYStore.offsetSize = offsetYSize;
          scrollYStore.visibleSize = visibleYSize;
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex, visibleYSize + offsetYSize, scrollYStore.endIndex);

          _this7.updateYData();
        } else {
          _this7.updateYSpace();
        }

        _this7.rowHeight = rowHeight;
      });
    },
    scrollEvent: function scrollEvent(evnt) {
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var scrollLeft = scrollBodyElem.scrollLeft;
      var isX = scrollLeft !== this.lastScrollLeft;
      var isY = scrollTop !== this.lastScrollTop;
      this.lastScrollTop = scrollTop;
      this.lastScrollLeft = scrollLeft;

      if (this.scrollYLoad) {
        this.loadYData(evnt);
      }

      this.$emit('scroll', {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        isX: isX,
        isY: isY,
        $event: evnt
      });
    },
    loadYData: function loadYData(evnt) {
      var scrollYStore = this.scrollYStore;
      var startIndex = scrollYStore.startIndex,
          endIndex = scrollYStore.endIndex,
          visibleSize = scrollYStore.visibleSize,
          offsetSize = scrollYStore.offsetSize,
          rowHeight = scrollYStore.rowHeight;
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var toVisibleIndex = Math.floor(scrollTop / rowHeight);
      var offsetStartIndex = Math.max(0, toVisibleIndex - 1 - offsetSize);
      var offsetEndIndex = toVisibleIndex + visibleSize + offsetSize;

      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex;
          scrollYStore.endIndex = offsetEndIndex;
          this.updateYData();
        }
      }
    },
    updateYData: function updateYData() {
      this.handleData();
      this.updateYSpace();
    },
    updateYSpace: function updateYSpace() {
      var scrollYStore = this.scrollYStore,
          scrollYLoad = this.scrollYLoad,
          fullData = this.fullData;
      this.bodyHeight = scrollYLoad ? fullData.length * scrollYStore.rowHeight : 0;
      this.topSpaceHeight = scrollYLoad ? Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0) : 0;
    },
    handleGlobalResizeEvent: function handleGlobalResizeEvent() {
      this.recalculate();
    }
  }
};
exports.default = _default2;