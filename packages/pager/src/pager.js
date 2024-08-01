import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import { errLog } from '../../tools/log'

export default {
  name: 'VxePager',
  mixins: [vSize],
  props: {
    size: { type: String, default: () => GlobalConfig.pager.size || GlobalConfig.size },
    // 自定义布局
    layouts: { type: Array, default: () => GlobalConfig.pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total'] },
    // 当前页
    currentPage: { type: Number, default: 1 },
    // 加载中
    loading: Boolean,
    // 每页大小
    pageSize: { type: Number, default: () => GlobalConfig.pager.pageSize || 10 },
    // 总条数
    total: { type: Number, default: 0 },
    // 显示页码按钮的数量
    pagerCount: { type: Number, default: () => GlobalConfig.pager.pagerCount || 7 },
    // 每页大小选项列表
    pageSizes: { type: Array, default: () => GlobalConfig.pager.pageSizes || [10, 15, 20, 50, 100] },
    // 列对其方式
    align: { type: String, default: () => GlobalConfig.pager.align },
    // 带边框
    border: { type: Boolean, default: () => GlobalConfig.pager.border },
    // 带背景颜色
    background: { type: Boolean, default: () => GlobalConfig.pager.background },
    // 配套的样式
    perfect: { type: Boolean, default: () => GlobalConfig.pager.perfect },
    // 当只有一页时隐藏
    autoHidden: { type: Boolean, default: () => GlobalConfig.pager.autoHidden },
    transfer: { type: Boolean, default: () => GlobalConfig.pager.transfer },
    className: [String, Function],
    pageSizePlacement: {
      type: String,
      default: () => GlobalConfig.pager.pageSizePlacement
    },
    // 自定义图标
    iconPrevPage: String,
    iconJumpPrev: String,
    iconJumpNext: String,
    iconNextPage: String,
    iconJumpMore: String,
    iconHomePage: String,
    iconEndPage: String
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  data () {
    return {
      inpCurrPage: this.currentPage
    }
  },
  computed: {
    isSizes () {
      return this.layouts.some(name => name === 'Sizes')
    },
    pageCount () {
      return this.getPageCount(this.total, this.pageSize)
    },
    numList () {
      const len = this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount
      const rest = []
      for (let index = 0; index < len; index++) {
        rest.push(index)
      }
      return rest
    },
    offsetNumber () {
      return Math.floor((this.pagerCount - 2) / 2)
    },
    sizeList () {
      return this.pageSizes.map(item => {
        if (XEUtils.isNumber(item)) {
          return {
            value: item,
            label: `${GlobalConfig.i18n('vxe.pager.pagesize', [item])}`
          }
        }
        return { value: '', label: '', ...item }
      })
    }
  },
  watch: {
    currentPage (value) {
      this.inpCurrPage = value
    }
  },
  render (h) {
    const { $scopedSlots, $xegrid, vSize, align, className } = this
    const childNodes = []
    if ($scopedSlots.left) {
      childNodes.push(
        h('span', {
          class: 'vxe-pager--left-wrapper'
        }, $scopedSlots.left.call(this, { $grid: $xegrid }))
      )
    }
    this.layouts.forEach(name => {
      if (this[`render${name}`](h)) {
        childNodes.push(this[`render${name}`](h))
      } else {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          errLog('vxe.error.notProp', [`layouts -> ${name}`])
        }
      }
    })
    if ($scopedSlots.right) {
      childNodes.push(
        h('span', {
          class: 'vxe-pager--right-wrapper'
        }, $scopedSlots.right.call(this, { $grid: $xegrid }))
      )
    }
    return h('div', {
      class: ['vxe-pager', className ? (XEUtils.isFunction(className) ? className({ $pager: this }) : className) : '', {
        [`size--${vSize}`]: vSize,
        [`align--${align}`]: align,
        'is--border': this.border,
        'is--background': this.background,
        'is--perfect': this.perfect,
        'is--hidden': this.autoHidden && this.pageCount === 1,
        'is--loading': this.loading
      }]
    }, [
      h('div', {
        class: 'vxe-pager--wrapper'
      }, childNodes)
    ])
  },
  methods: {
    // 首页
    renderHome (h) {
      return h('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          type: 'button',
          title: GlobalConfig.i18n('vxe.pager.homePageTitle')
        },
        on: {
          click: this.homePage
        }
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', this.iconHomePage || GlobalConfig.icon.PAGER_HOME]
        })
      ])
    },
    // 末页
    renderEnd (h) {
      return h('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          type: 'button',
          title: GlobalConfig.i18n('vxe.pager.endPageTitle')
        },
        on: {
          click: this.endPage
        }
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', this.iconEndPage || GlobalConfig.icon.PAGER_END]
        })
      ])
    },
    // 上一页
    renderPrevPage (h) {
      return h('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          type: 'button',
          title: GlobalConfig.i18n('vxe.pager.prevPageTitle')
        },
        on: {
          click: this.prevPage
        }
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', this.iconPrevPage || GlobalConfig.icon.PAGER_PREV_PAGE]
        })
      ])
    },
    // 向上翻页
    renderPrevJump (h, tagName) {
      return h(tagName || 'button', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          type: 'button',
          title: GlobalConfig.i18n('vxe.pager.prevJumpTitle')
        },
        on: {
          click: this.prevJump
        }
      }, [
        tagName ? h('i', {
          class: ['vxe-pager--jump-more-icon', this.iconJumpMore || GlobalConfig.icon.PAGER_JUMP_MORE]
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', this.iconJumpPrev || GlobalConfig.icon.PAGER_JUMP_PREV]
        })
      ])
    },
    // number
    renderNumber (h) {
      return h('span', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h))
    },
    // jumpNumber
    renderJumpNumber (h) {
      return h('span', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h, true))
    },
    // 向下翻页
    renderNextJump (h, tagName) {
      return h(tagName || 'button', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          type: 'button',
          title: GlobalConfig.i18n('vxe.pager.nextJumpTitle')
        },
        on: {
          click: this.nextJump
        }
      }, [
        tagName ? h('i', {
          class: ['vxe-pager--jump-more-icon', this.iconJumpMore || GlobalConfig.icon.PAGER_JUMP_MORE]
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', this.iconJumpNext || GlobalConfig.icon.PAGER_JUMP_NEXT]
        })
      ])
    },
    // 下一页
    renderNextPage (h) {
      return h('button', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          type: 'button',
          title: GlobalConfig.i18n('vxe.pager.nextPageTitle')
        },
        on: {
          click: this.nextPage
        }
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', this.iconNextPage || GlobalConfig.icon.PAGER_NEXT_PAGE]
        })
      ])
    },
    // sizes
    renderSizes (h) {
      return h('vxe-select', {
        class: 'vxe-pager--sizes',
        props: {
          value: this.pageSize,
          placement: this.pageSizePlacement,
          transfer: this.transfer,
          options: this.sizeList
        },
        on: {
          change: ({ value }) => {
            this.pageSizeEvent(value)
          }
        }
      })
    },
    // FullJump
    renderFullJump (h) {
      return this.renderJump(h, true)
    },
    // Jump
    renderJump (h, isFull) {
      return h('span', {
        class: 'vxe-pager--jump'
      }, [
        isFull ? h('span', {
          class: 'vxe-pager--goto-text'
        }, GlobalConfig.i18n('vxe.pager.goto')) : null,
        h('input', {
          class: 'vxe-pager--goto',
          domProps: {
            value: this.inpCurrPage
          },
          attrs: {
            type: 'text',
            autocomplete: 'off'
          },
          on: {
            input: this.jumpInputEvent,
            keydown: this.jumpKeydownEvent,
            blur: this.triggerJumpEvent
          }
        }),
        isFull ? h('span', {
          class: 'vxe-pager--classifier-text'
        }, GlobalConfig.i18n('vxe.pager.pageClassifier')) : null
      ])
    },
    // PageCount
    renderPageCount (h) {
      return h('span', {
        class: 'vxe-pager--count'
      }, [
        h('span', {
          class: 'vxe-pager--separator'
        }),
        h('span', this.pageCount)
      ])
    },
    // total
    renderTotal (h) {
      return h('span', {
        class: 'vxe-pager--total'
      }, GlobalConfig.i18n('vxe.pager.total', [this.total]))
    },
    // number
    renderPageBtn (h, showJump) {
      const { numList, currentPage, pageCount, pagerCount, offsetNumber } = this
      const nums = []
      const isOv = pageCount > pagerCount
      const isLt = isOv && currentPage > offsetNumber + 1
      const isGt = isOv && currentPage < pageCount - offsetNumber
      let startNumber = 1
      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1)
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1)
        }
      }
      if (showJump && isLt) {
        nums.push(
          h('button', {
            class: 'vxe-pager--num-btn',
            attrs: {
              type: 'button'
            },
            on: {
              click: () => this.jumpPage(1)
            }
          }, 1),
          this.renderPrevJump(h, 'span')
        )
      }
      numList.forEach((item, index) => {
        const number = startNumber + index
        if (number <= pageCount) {
          nums.push(
            h('button', {
              class: ['vxe-pager--num-btn', {
                'is--active': currentPage === number
              }],
              attrs: {
                type: 'button'
              },
              on: {
                click: () => this.jumpPage(number)
              },
              key: number
            }, number)
          )
        }
      })
      if (showJump && isGt) {
        nums.push(
          this.renderNextJump(h, 'button'),
          h('button', {
            class: 'vxe-pager--num-btn',
            attrs: {
              type: 'button'
            },
            on: {
              click: () => this.jumpPage(pageCount)
            }
          }, pageCount)
        )
      }
      return nums
    },
    getPageCount (total, size) {
      return Math.max(Math.ceil(total / size), 1)
    },
    homePage () {
      const { currentPage } = this
      if (currentPage > 1) {
        this.jumpPage(1)
      }
    },
    endPage () {
      const { currentPage, pageCount } = this
      if (currentPage < pageCount) {
        this.jumpPage(pageCount)
      }
    },
    prevPage () {
      const { currentPage, pageCount } = this
      if (currentPage > 1) {
        this.jumpPage(Math.min(pageCount, Math.max(currentPage - 1, 1)))
      }
    },
    nextPage () {
      const { currentPage, pageCount } = this
      if (currentPage < pageCount) {
        this.jumpPage(Math.min(pageCount, currentPage + 1))
      }
    },
    prevJump () {
      this.jumpPage(Math.max(this.currentPage - this.numList.length, 1))
    },
    nextJump () {
      this.jumpPage(Math.min(this.currentPage + this.numList.length, this.pageCount))
    },
    jumpPage (currentPage) {
      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage)
        this.$emit('page-change', { type: 'current', pageSize: this.pageSize, currentPage })
      } else {
        this.inpCurrPage = currentPage
      }
    },
    pageSizeEvent (pageSize) {
      const pageCount = this.getPageCount(this.total, pageSize)
      let currentPage = this.currentPage
      if (currentPage > pageCount) {
        currentPage = pageCount
        this.$emit('update:currentPage', pageCount)
      }
      this.$emit('update:pageSize', pageSize)
      this.$emit('page-change', { type: 'size', pageSize, currentPage })
    },
    jumpInputEvent (evnt) {
      this.inpCurrPage = evnt.target.value
    },
    jumpKeydownEvent (evnt) {
      if (evnt.keyCode === 13) {
        this.triggerJumpEvent(evnt)
      } else if (evnt.keyCode === 38) {
        evnt.preventDefault()
        this.nextPage()
      } else if (evnt.keyCode === 40) {
        evnt.preventDefault()
        this.prevPage()
      }
    },
    triggerJumpEvent (evnt) {
      const value = XEUtils.toInteger(evnt.target.value)
      const current = value <= 0 ? 1 : value >= this.pageCount ? this.pageCount : value
      const currPage = XEUtils.toValueString(current)
      evnt.target.value = currPage
      this.inpCurrPage = currPage
      this.jumpPage(current)
    }
  }
}
