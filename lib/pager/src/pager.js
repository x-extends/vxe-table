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
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousedown');
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var layouts = this.layouts,
        loading = this.loading,
        vSize = this.vSize,
        background = this.background;
    return h('div', {
      class: ['vxe-pager', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'p--background', background), _defineProperty(_ref, 'is--loading', loading), _ref)]
    }, layouts.map(function (name) {
      return _this["render".concat(name)](h);
    }));
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
          click: this.prevPageEvent
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
            return _this2.jumpPageEvent(Math.max(currentPage - numList.length, 1));
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
            return _this3.jumpPageEvent(Math.min(currentPage + numList.length, pageCount));
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
          click: this.nextPageEvent
        }
      }, [h('i', {
        class: ['vxe-icon--page-icon', _conf.default.icon.nextPage]
      })]);
    },
    // sizes
    renderSizes: function renderSizes(h) {
      var _this4 = this;

      var pageSizes = this.pageSizes,
          showSizes = this.showSizes,
          pageSize = this.pageSize,
          panelStyle = this.panelStyle;
      return h('span', {
        class: ['vxe-pager--sizes', {
          'is--active': showSizes
        }],
        ref: 'sizeBtn'
      }, [h('span', {
        class: 'size--content',
        on: {
          click: this.toggleSizePanel
        }
      }, [h('span', "".concat(pageSize).concat(_conf.default.i18n('vxe.pager.pagesize'))), h('i', {
        class: 'vxe-pager--sizes-arrow vxe-icon--caret-bottom'
      })]), h('div', {
        class: 'vxe-pager-size--select-wrapper',
        style: panelStyle,
        ref: 'sizePanel'
      }, [h('ul', {
        class: 'vxe-pager-size--select'
      }, pageSizes.map(function (num) {
        return h('li', {
          class: ['size--option', {
            'is--active': num === pageSize
          }],
          on: {
            click: function click() {
              return _this4.sizeChangeEvent(num);
            }
          }
        }, "".concat(num).concat(_conf.default.i18n('vxe.pager.pagesize')));
      }))])]);
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

              _this5.jumpPageEvent(current);
            } else if (evnt.keyCode === 38) {
              evnt.preventDefault();

              _this5.nextPageEvent(evnt);
            } else if (evnt.keyCode === 40) {
              evnt.preventDefault();

              _this5.prevPageEvent(evnt);
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
              return _this6.jumpPageEvent(1);
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
                return _this6.jumpPageEvent(number);
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
              return _this6.jumpPageEvent(pageCount);
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
    prevPageEvent: function prevPageEvent() {
      var currentPage = this.currentPage;

      if (currentPage > 1) {
        this.jumpPageEvent(Math.max(currentPage - 1, 1));
      }
    },
    nextPageEvent: function nextPageEvent() {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;

      if (currentPage < pageCount) {
        this.jumpPageEvent(Math.min(currentPage + 1, pageCount));
      }
    },
    jumpPageEvent: function jumpPageEvent(currentPage) {
      var type = 'current-change';

      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage);

        _tools.UtilTools.emitEvent(this, type, [currentPage]);

        this.emitPageChange(type, this.pageSize, currentPage);
      }
    },
    sizeChangeEvent: function sizeChangeEvent(pageSize) {
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
      this[this.showSizes ? 'hideSizePanel' : 'showSizePanel']();
    },
    showSizePanel: function showSizePanel() {
      var _this7 = this;

      this.showSizes = true;
      this.$nextTick(function () {
        var $refs = _this7.$refs;
        var sizeBtn = $refs.sizeBtn,
            sizePanel = $refs.sizePanel;
        _this7.panelStyle = {
          bottom: "".concat(sizeBtn.clientHeight + 6, "px"),
          left: "-".concat(sizePanel.clientWidth / 2 - sizeBtn.clientWidth / 2, "px")
        };
      });
    },
    hideSizePanel: function hideSizePanel() {
      this.showSizes = false;
    }
  }
};
exports.default = _default2;