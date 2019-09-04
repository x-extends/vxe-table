"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxePager',
  props: {
    size: String,
    // 自定义布局
    layouts: {
      type: Array,
      default: function _default() {
        return _conf.default.pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total'];
      }
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 加载中
    loading: Boolean,
    // 每页大小
    pageSize: {
      type: Number,
      default: function _default() {
        return _conf.default.pager.pageSize || 10;
      }
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 显示页码按钮的数量
    pagerCount: {
      type: Number,
      default: function _default() {
        return _conf.default.pager.pagerCount || 7;
      }
    },
    // 每页大小选项列表
    pageSizes: {
      type: Array,
      default: function _default() {
        return _conf.default.pager.pageSizes || [10, 15, 20, 50, 100];
      }
    },
    // 列对其方式
    align: String,
    // 带背景颜色
    background: Boolean
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data: function data() {
    return {
      showSizes: false,
      panelStyle: null
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isSizes: function isSizes() {
      return this.layouts.some(function (name) {
        return name === 'Sizes';
      });
    },
    pageCount: function pageCount() {
      return this.getPageCount(this.total, this.pageSize);
    },
    numList: function numList() {
      return Array.from(new Array(this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount));
    },
    offsetNumber: function offsetNumber() {
      return Math.floor((this.pagerCount - 2) / 2);
    }
  },
  created: function created() {
    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
  },
  mounted: function mounted() {
    var sizePanel = this.$refs.sizePanel;

    if (sizePanel) {
      document.body.appendChild(this.$refs.sizePanel);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var sizePanel = this.$refs.sizePanel;

    if (sizePanel && sizePanel.parentNode) {
      sizePanel.parentNode.removeChild(sizePanel);
    }
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousedown');
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var layouts = this.layouts,
        isSizes = this.isSizes,
        loading = this.loading,
        vSize = this.vSize,
        align = this.align,
        background = this.background;
    return h('div', {
      class: ['vxe-pager', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "align--".concat(align), align), _defineProperty(_ref, 'p--background', background), _defineProperty(_ref, 'is--loading', loading), _ref)]
    }, layouts.map(function (name) {
      return _this["render".concat(name)](h);
    }).concat(isSizes ? this.renderSizePanel(h) : []));
  },
  methods: {
    // prevPage
    renderPrevPage: function renderPrevPage(h) {
      var currentPage = this.currentPage;
      return h('span', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': currentPage <= 1
        }],
        on: {
          click: this.prevPage
        }
      }, [h('i', {
        class: ['vxe-icon--page-icon', _conf.default.icon.prevPage]
      })]);
    },
    // prevJump
    renderPrevJump: function renderPrevJump(h, tagName) {
      var _this2 = this;

      var numList = this.numList,
          currentPage = this.currentPage;
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': currentPage <= 1
        }],
        on: {
          click: function click() {
            return _this2.jumpPage(Math.max(currentPage - numList.length, 1));
          }
        }
      }, [tagName ? h('i', {
        class: 'vxe-pager--jump-more vxe-icon--more'
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', _conf.default.icon.jumpPrev]
      })]);
    },
    // number
    renderNumber: function renderNumber(h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h));
    },
    // jumpNumber
    renderJumpNumber: function renderJumpNumber(h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h, true));
    },
    // nextJump
    renderNextJump: function renderNextJump(h, tagName) {
      var _this3 = this;

      var numList = this.numList,
          currentPage = this.currentPage,
          pageCount = this.pageCount;
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': currentPage >= pageCount
        }],
        on: {
          click: function click() {
            return _this3.jumpPage(Math.min(currentPage + numList.length, pageCount));
          }
        }
      }, [tagName ? h('i', {
        class: 'vxe-pager--jump-more vxe-icon--more'
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', _conf.default.icon.jumpNext]
      })]);
    },
    // nextPage
    renderNextPage: function renderNextPage(h) {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;
      return h('span', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': currentPage >= pageCount
        }],
        on: {
          click: this.nextPage
        }
      }, [h('i', {
        class: ['vxe-icon--page-icon', _conf.default.icon.nextPage]
      })]);
    },
    // sizes
    renderSizes: function renderSizes(h) {
      var pageSize = this.pageSize;
      return h('span', {
        class: ['vxe-pager--sizes', {
          'is--active': this.showSizes
        }],
        on: {
          click: this.toggleSizePanel
        },
        ref: 'sizeBtn'
      }, [h('i', {
        class: "vxe-pager--sizes-arrow ".concat(_conf.default.icon.caretBottom)
      }), h('span', {
        class: 'size--content'
      }, "".concat(pageSize).concat(_conf.default.i18n('vxe.pager.pagesize')))]);
    },
    // 分页面板
    renderSizePanel: function renderSizePanel(h) {
      var _this4 = this;

      var panelStyle = this.panelStyle,
          pageSize = this.pageSize,
          pageSizes = this.pageSizes,
          showSizes = this.showSizes;
      return h('ul', {
        class: ['vxe-pager-size--select', {
          'is--show': showSizes
        }],
        style: panelStyle,
        ref: 'sizePanel'
      }, pageSizes.map(function (num) {
        return h('li', {
          class: ['size--option', {
            'is--active': num === pageSize
          }],
          on: {
            click: function click() {
              return _this4.changePageSize(num);
            }
          }
        }, "".concat(num).concat(_conf.default.i18n('vxe.pager.pagesize')));
      }));
    },
    // FullJump
    renderFullJump: function renderFullJump(h) {
      return this.renderJump(h, true);
    },
    // Jump
    renderJump: function renderJump(h, isFull) {
      var _this5 = this;

      var currentPage = this.currentPage,
          pageCount = this.pageCount;
      return h('span', {
        class: 'vxe-pager--jump'
      }, [isFull ? h('span', {
        class: 'vxe-pager--goto-text'
      }, _conf.default.i18n('vxe.pager.goto')) : null, h('input', {
        class: 'vxe-pager--goto',
        domProps: {
          value: currentPage
        },
        attrs: {
          type: 'text',
          autocomplete: 'off'
        },
        on: {
          keydown: function keydown(evnt) {
            if (evnt.keyCode === 13) {
              var value = _xeUtils.default.toNumber(evnt.target.value);

              var current = value <= 0 ? 1 : value >= pageCount ? pageCount : value;
              evnt.target.value = current;

              _this5.jumpPage(current);
            } else if (evnt.keyCode === 38) {
              evnt.preventDefault();

              _this5.nextPage(evnt);
            } else if (evnt.keyCode === 40) {
              evnt.preventDefault();

              _this5.prevPage(evnt);
            }
          }
        }
      }), isFull ? h('span', {
        class: 'vxe-pager--classifier-text'
      }, _conf.default.i18n('vxe.pager.pageClassifier')) : null]);
    },
    // PageCount
    renderPageCount: function renderPageCount(h) {
      var pageCount = this.pageCount;
      return h('span', {
        class: 'vxe-pager--count'
      }, [h('span', {
        class: 'vxe-pager--separator'
      }, '/'), h('span', pageCount)]);
    },
    // total
    renderTotal: function renderTotal(h) {
      var total = this.total;
      return h('span', {
        class: 'vxe-pager--total'
      }, _xeUtils.default.template(_conf.default.i18n('vxe.pager.total'), {
        total: total
      }));
    },
    // number
    renderPageBtn: function renderPageBtn(h, showJump) {
      var _this6 = this;

      var numList = this.numList,
          currentPage = this.currentPage,
          pageCount = this.pageCount,
          pagerCount = this.pagerCount,
          offsetNumber = this.offsetNumber;
      var nums = [];
      var isOv = pageCount > pagerCount;
      var isLt = isOv && currentPage > offsetNumber + 1;
      var isGt = isOv && currentPage < pageCount - offsetNumber;
      var startNumber = 1;

      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1);
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1);
        }
      }

      if (showJump && isLt) {
        nums.push(h('li', {
          class: 'vxe-pager--num-btn',
          on: {
            click: function click() {
              return _this6.jumpPage(1);
            }
          }
        }, 1), this.renderPrevJump(h, 'li'));
      }

      numList.forEach(function (item, index) {
        var number = startNumber + index;

        if (number <= pageCount) {
          nums.push(h('li', {
            class: ['vxe-pager--num-btn', {
              'is--active': currentPage === number
            }],
            on: {
              click: function click() {
                return _this6.jumpPage(number);
              }
            },
            key: number
          }, number));
        }
      });

      if (showJump && isGt) {
        nums.push(this.renderNextJump(h, 'li'), h('li', {
          class: 'vxe-pager--num-btn',
          on: {
            click: function click() {
              return _this6.jumpPage(pageCount);
            }
          }
        }, pageCount));
      }

      return nums;
    },
    getPageCount: function getPageCount(total, size) {
      return Math.max(Math.ceil(total / size), 1);
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      if (this.showSizes && !(_tools.DomTools.getEventTargetNode(evnt, this.$refs.sizeBtn).flag || _tools.DomTools.getEventTargetNode(evnt, this.$refs.sizePanel).flag)) {
        this.hideSizePanel();
      }
    },
    prevPage: function prevPage() {
      var currentPage = this.currentPage;

      if (currentPage > 1) {
        this.jumpPage(Math.max(currentPage - 1, 1));
      }
    },
    nextPage: function nextPage() {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;

      if (currentPage < pageCount) {
        this.jumpPage(Math.min(currentPage + 1, pageCount));
      }
    },
    jumpPage: function jumpPage(currentPage) {
      var type = 'current-change';

      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage);

        _tools.UtilTools.emitEvent(this, type, [currentPage]);

        this.emitPageChange(type, this.pageSize, currentPage);
      }
    },
    changePageSize: function changePageSize(pageSize) {
      var type = 'size-change';

      if (pageSize !== this.pageSize) {
        this.$emit('update:pageSize', pageSize);

        _tools.UtilTools.emitEvent(this, type, [pageSize]);

        this.emitPageChange(type, pageSize, Math.min(this.currentPage, this.getPageCount(this.total, pageSize)));
      }

      this.hideSizePanel();
    },
    emitPageChange: function emitPageChange(type, pageSize, currentPage) {
      _tools.UtilTools.emitEvent(this, 'page-change', [{
        type: type,
        pageSize: pageSize,
        currentPage: currentPage
      }]);
    },
    toggleSizePanel: function toggleSizePanel() {
      if (this.showSizes) {
        this.hideSizePanel();
      } else {
        this.showSizePanel();
      }
    },
    hideSizePanel: function hideSizePanel() {
      this.showSizes = false;
    },
    showSizePanel: function showSizePanel() {
      var _this7 = this;

      var $refs = this.$refs,
          _this$zIndex = this.zIndex,
          zIndex = _this$zIndex === void 0 ? _conf.default.tooltip.zIndex : _this$zIndex;
      var sizeBtnElem = $refs.sizeBtn;

      var _DomTools$getAbsolute = _tools.DomTools.getAbsolutePos(sizeBtnElem),
          left = _DomTools$getAbsolute.left,
          top = _DomTools$getAbsolute.top;

      var _DomTools$getDomNode = _tools.DomTools.getDomNode(),
          scrollTop = _DomTools$getDomNode.scrollTop,
          scrollLeft = _DomTools$getDomNode.scrollLeft,
          visibleWidth = _DomTools$getDomNode.visibleWidth,
          visibleHeight = _DomTools$getDomNode.visibleHeight;

      this.panelStyle = {
        zIndex: zIndex,
        left: "".concat(left, "px"),
        top: "".concat(top + sizeBtnElem.offsetHeight + 6, "px")
      };
      this.showSizes = true;
      this.$nextTick().then(function () {
        var sizePanelElem = $refs.sizePanel;

        if (sizePanelElem) {
          _this7.panelStyle.top = "".concat(top + sizeBtnElem.offsetHeight + 6, "px");
          _this7.panelStyle.left = "".concat(left + Math.floor((sizeBtnElem.offsetWidth - sizePanelElem.offsetWidth) / 2), "px");
          return _this7.$nextTick();
        }
      }).then(function () {
        var sizePanelElem = $refs.sizePanel;

        if (sizePanelElem) {
          var offsetHeight = sizePanelElem.offsetHeight;
          var offsetWidth = sizePanelElem.offsetWidth;

          if (top + sizeBtnElem.offsetHeight + offsetHeight > scrollTop + visibleHeight) {
            _this7.panelStyle.top = "".concat(top - offsetHeight - 6, "px");
          }

          if (left + offsetWidth > scrollLeft + visibleWidth) {
            _this7.panelStyle.left = "".concat(scrollLeft + visibleWidth - offsetWidth - 6, "px");
          }
        }
      });
    }
  }
};
exports.default = _default2;