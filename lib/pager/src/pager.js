"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxePager',
  mixins: [_size.default],
  props: {
    size: {
      type: String,
      default: function _default() {
        return _conf.default.pager.size || _conf.default.size;
      }
    },
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
    align: {
      type: String,
      default: function _default() {
        return _conf.default.pager.align;
      }
    },
    // 带边框
    border: {
      type: Boolean,
      default: function _default() {
        return _conf.default.pager.border;
      }
    },
    // 带背景颜色
    background: {
      type: Boolean,
      default: function _default() {
        return _conf.default.pager.background;
      }
    },
    // 配套的样式
    perfect: {
      type: Boolean,
      default: function _default() {
        return _conf.default.pager.perfect;
      }
    },
    // 当只有一页时隐藏
    autoHidden: {
      type: Boolean,
      default: function _default() {
        return _conf.default.pager.autoHidden;
      }
    },
    // 自定义图标
    iconPrevPage: String,
    iconJumpPrev: String,
    iconJumpNext: String,
    iconNextPage: String,
    iconJumpMore: String
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  computed: {
    isSizes: function isSizes() {
      return this.layouts.some(function (name) {
        return name === 'Sizes';
      });
    },
    pageCount: function pageCount() {
      return this.getPageCount(this.total, this.pageSize);
    },
    numList: function numList() {
      var len = this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount;
      var rest = [];

      for (var index = 0; index < len; index++) {
        rest.push(index);
      }

      return rest;
    },
    offsetNumber: function offsetNumber() {
      return Math.floor((this.pagerCount - 2) / 2);
    },
    sizeList: function sizeList() {
      return this.pageSizes.map(function (item) {
        if (_ctor.default.isNumber(item)) {
          return {
            value: item,
            label: "".concat(_ctor.default.template(_conf.default.i18n('vxe.pager.pagesize'), [item]))
          };
        }

        return _objectSpread({
          value: '',
          label: ''
        }, item);
      });
    }
  },
  render: function render(h) {
    var _this = this,
        _ref;

    var $scopedSlots = this.$scopedSlots,
        $xegrid = this.$xegrid,
        vSize = this.vSize,
        align = this.align;
    var childNodes = [];

    if ($scopedSlots.left) {
      childNodes.push(h('span', {
        class: 'vxe-pager--left-wrapper'
      }, $scopedSlots.left.call(this, {
        $grid: $xegrid
      })));
    }

    this.layouts.forEach(function (name) {
      childNodes.push(_this["render".concat(name)](h));
    });

    if ($scopedSlots.right) {
      childNodes.push(h('span', {
        class: 'vxe-pager--right-wrapper'
      }, $scopedSlots.right.call(this, {
        $grid: $xegrid
      })));
    }

    return h('div', {
      class: ['vxe-pager', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "align--".concat(align), align), _defineProperty(_ref, 'is--border', this.border), _defineProperty(_ref, 'is--background', this.background), _defineProperty(_ref, 'is--perfect', this.perfect), _defineProperty(_ref, 'is--hidden', this.autoHidden && this.pageCount === 1), _defineProperty(_ref, 'is--loading', this.loading), _ref)]
    }, [h('div', {
      class: 'vxe-pager--wrapper'
    }, childNodes)]);
  },
  methods: {
    // 上一页
    renderPrevPage: function renderPrevPage(h) {
      return h('span', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: _conf.default.i18n('vxe.pager.prevPage')
        },
        on: {
          click: this.prevPage
        }
      }, [h('i', {
        class: ['vxe-pager--btn-icon', this.iconPrevPage || _conf.default.icon.PAGER_PREV_PAGE]
      })]);
    },
    // 向上翻页
    renderPrevJump: function renderPrevJump(h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: _conf.default.i18n('vxe.pager.prevJump')
        },
        on: {
          click: this.prevJump
        }
      }, [tagName ? h('i', {
        class: ['vxe-pager--jump-more-icon', this.iconJumpMore || _conf.default.icon.PAGER_JUMP_MORE]
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', this.iconJumpPrev || _conf.default.icon.PAGER_JUMP_PREV]
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
    // 向下翻页
    renderNextJump: function renderNextJump(h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: _conf.default.i18n('vxe.pager.nextJump')
        },
        on: {
          click: this.nextJump
        }
      }, [tagName ? h('i', {
        class: ['vxe-pager--jump-more-icon', this.iconJumpMore || _conf.default.icon.PAGER_JUMP_MORE]
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', this.iconJumpNext || _conf.default.icon.PAGER_JUMP_NEXT]
      })]);
    },
    // 下一页
    renderNextPage: function renderNextPage(h) {
      return h('span', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: _conf.default.i18n('vxe.pager.nextPage')
        },
        on: {
          click: this.nextPage
        }
      }, [h('i', {
        class: ['vxe-pager--btn-icon', this.iconNextPage || _conf.default.icon.PAGER_NEXT_PAGE]
      })]);
    },
    // sizes
    renderSizes: function renderSizes(h) {
      var _this2 = this;

      return h('vxe-select', {
        class: 'vxe-pager--sizes',
        props: {
          value: this.pageSize,
          placement: 'top',
          options: this.sizeList
        },
        on: {
          change: function change(_ref2) {
            var value = _ref2.value;

            _this2.pageSizeEvent(value);
          }
        }
      });
    },
    // FullJump
    renderFullJump: function renderFullJump(h) {
      return this.renderJump(h, true);
    },
    // Jump
    renderJump: function renderJump(h, isFull) {
      return h('span', {
        class: 'vxe-pager--jump'
      }, [isFull ? h('span', {
        class: 'vxe-pager--goto-text'
      }, _conf.default.i18n('vxe.pager.goto')) : null, h('input', {
        class: 'vxe-pager--goto',
        domProps: {
          value: this.currentPage
        },
        attrs: {
          type: 'text',
          autocomplete: 'off'
        },
        on: {
          keydown: this.jumpKeydownEvent,
          blur: this.triggerJumpEvent
        }
      }), isFull ? h('span', {
        class: 'vxe-pager--classifier-text'
      }, _conf.default.i18n('vxe.pager.pageClassifier')) : null]);
    },
    // PageCount
    renderPageCount: function renderPageCount(h) {
      return h('span', {
        class: 'vxe-pager--count'
      }, [h('span', {
        class: 'vxe-pager--separator'
      }), h('span', this.pageCount)]);
    },
    // total
    renderTotal: function renderTotal(h) {
      return h('span', {
        class: 'vxe-pager--total'
      }, _ctor.default.template(_conf.default.i18n('vxe.pager.total'), [this.total]));
    },
    // number
    renderPageBtn: function renderPageBtn(h, showJump) {
      var _this3 = this;

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
              return _this3.jumpPage(1);
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
                return _this3.jumpPage(number);
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
              return _this3.jumpPage(pageCount);
            }
          }
        }, pageCount));
      }

      return nums;
    },
    getPageCount: function getPageCount(total, size) {
      return Math.max(Math.ceil(total / size), 1);
    },
    prevPage: function prevPage() {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;

      if (currentPage > 1) {
        this.jumpPage(Math.min(pageCount, Math.max(currentPage - 1, 1)));
      }
    },
    nextPage: function nextPage() {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;

      if (currentPage < pageCount) {
        this.jumpPage(Math.min(pageCount, currentPage + 1));
      }
    },
    prevJump: function prevJump() {
      this.jumpPage(Math.max(this.currentPage - this.numList.length, 1));
    },
    nextJump: function nextJump() {
      this.jumpPage(Math.min(this.currentPage + this.numList.length, this.pageCount));
    },
    jumpPage: function jumpPage(currentPage) {
      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage);
        this.$emit('page-change', {
          type: 'current',
          pageSize: this.pageSize,
          currentPage: currentPage,
          $event: {
            type: 'current'
          }
        });
      }
    },
    pageSizeEvent: function pageSizeEvent(pageSize) {
      this.changePageSize(pageSize);
    },
    changePageSize: function changePageSize(pageSize) {
      if (pageSize !== this.pageSize) {
        this.$emit('update:pageSize', pageSize);
        this.$emit('page-change', {
          type: 'size',
          pageSize: pageSize,
          currentPage: Math.min(this.currentPage, this.getPageCount(this.total, pageSize)),
          $event: {
            type: 'size'
          }
        });
      }
    },
    jumpKeydownEvent: function jumpKeydownEvent(evnt) {
      if (evnt.keyCode === 13) {
        this.triggerJumpEvent(evnt);
      } else if (evnt.keyCode === 38) {
        evnt.preventDefault();
        this.nextPage();
      } else if (evnt.keyCode === 40) {
        evnt.preventDefault();
        this.prevPage();
      }
    },
    triggerJumpEvent: function triggerJumpEvent(evnt) {
      var value = _ctor.default.toNumber(evnt.target.value);

      var current = value <= 0 ? 1 : value >= this.pageCount ? this.pageCount : value;
      evnt.target.value = current;
      this.jumpPage(current);
    }
  }
};
exports.default = _default2;