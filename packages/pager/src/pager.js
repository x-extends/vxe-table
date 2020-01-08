import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

export default {
  name: 'VxePager',
  props: {
    size: String,
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
    // 默认的样式
    perfect: { type: Boolean, default: () => GlobalConfig.pager.perfect },
    // 自定义图标
    iconPrevPage: String,
    iconJumpPrev: String,
    iconJumpNext: String,
    iconNextPage: String,
    iconJumpMore: String
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data () {
    return {
      showSizes: false,
      panelStyle: null,
      panelIndex: 0
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isSizes () {
      return this.layouts.some(name => name === 'Sizes')
    },
    pageCount () {
      return this.getPageCount(this.total, this.pageSize)
    },
    numList () {
      let len = this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount
      let rest = []
      for (let index = 0; index < len; index++) {
        rest.push(index)
      }
      return rest
    },
    offsetNumber () {
      return Math.floor((this.pagerCount - 2) / 2)
    }
  },
  created () {
    this.panelIndex = UtilTools.nextZIndex()
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
  },
  render (h) {
    let { vSize, align } = this
    return h('div', {
      class: ['vxe-pager', {
        [`size--${vSize}`]: vSize,
        [`align--${align}`]: align,
        'p--border': this.border,
        'p--background': this.background,
        'p--perfect': this.perfect,
        'is--loading': this.loading
      }]
    }, [
      h('div', {
        class: 'vxe-pager--wrapper'
      }, this.layouts.map(name => this[`render${name}`](h)))
    ])
  },
  methods: {
    // 上一页
    renderPrevPage (h) {
      return h('span', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: GlobalConfig.i18n('vxe.pager.prevPage')
        },
        on: {
          click: this.prevPage
        }
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', this.iconPrevPage || GlobalConfig.icon.prevPage]
        })
      ])
    },
    // 向上翻页
    renderPrevJump (h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: GlobalConfig.i18n('vxe.pager.prevJump')
        },
        on: {
          click: this.prevJump
        }
      }, [
        tagName ? h('i', {
          class: ['vxe-pager--jump-more', this.iconJumpMore || GlobalConfig.icon.jumpMore]
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', this.iconJumpPrev || GlobalConfig.icon.jumpPrev]
        })
      ])
    },
    // number
    renderNumber (h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h))
    },
    // jumpNumber
    renderJumpNumber (h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h, true))
    },
    // 向下翻页
    renderNextJump (h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: GlobalConfig.i18n('vxe.pager.nextJump')
        },
        on: {
          click: this.nextJump
        }
      }, [
        tagName ? h('i', {
          class: ['vxe-pager--jump-more', this.iconJumpMore || GlobalConfig.icon.jumpMore]
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', this.iconJumpNext || GlobalConfig.icon.jumpNext]
        })
      ])
    },
    // 下一页
    renderNextPage (h) {
      return h('span', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: GlobalConfig.i18n('vxe.pager.nextPage')
        },
        on: {
          click: this.nextPage
        }
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', this.iconNextPage || GlobalConfig.icon.nextPage]
        })
      ])
    },
    // sizes
    renderSizes (h) {
      return h('span', {
        class: ['vxe-pager--sizes', {
          'is--active': this.showSizes
        }],
        ref: 'sizeBtn'
      }, [
        h('span', {
          class: 'size--content',
          on: {
            click: this.toggleSizePanel
          }
        }, [
          h('span', `${this.pageSize}${GlobalConfig.i18n('vxe.pager.pagesize')}`),
          h('i', {
            class: `vxe-pager--sizes-arrow ${GlobalConfig.icon.caretBottom}`
          })
        ]),
        h('div', {
          class: 'vxe-pager-size--select-wrapper',
          style: this.panelStyle,
          ref: 'sizePanel'
        }, [
          h('ul', {
            class: 'vxe-pager-size--select'
          }, this.pageSizes.map(num => {
            return h('li', {
              class: ['size--option', {
                'is--active': num === this.pageSize
              }],
              on: {
                click: () => this.changePageSize(num)
              }
            }, `${num}${GlobalConfig.i18n('vxe.pager.pagesize')}`)
          }))
        ])
      ])
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
        }, '/'),
        h('span', this.pageCount)
      ])
    },
    // total
    renderTotal (h) {
      return h('span', {
        class: 'vxe-pager--total'
      }, XEUtils.template(GlobalConfig.i18n('vxe.pager.total'), { total: this.total }))
    },
    // number
    renderPageBtn (h, showJump) {
      let { numList, currentPage, pageCount, pagerCount, offsetNumber } = this
      let nums = []
      let isOv = pageCount > pagerCount
      let isLt = isOv && currentPage > offsetNumber + 1
      let isGt = isOv && currentPage < pageCount - offsetNumber
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
          h('li', {
            class: 'vxe-pager--num-btn',
            on: {
              click: () => this.jumpPage(1)
            }
          }, 1),
          this.renderPrevJump(h, 'li')
        )
      }
      numList.forEach((item, index) => {
        let number = startNumber + index
        if (number <= pageCount) {
          nums.push(
            h('li', {
              class: ['vxe-pager--num-btn', {
                'is--active': currentPage === number
              }],
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
          this.renderNextJump(h, 'li'),
          h('li', {
            class: 'vxe-pager--num-btn',
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
    handleGlobalMousedownEvent (evnt) {
      let $refs = this.$refs
      if (this.showSizes && !(DomTools.getEventTargetNode(evnt, $refs.sizeBtn).flag || DomTools.getEventTargetNode(evnt, $refs.sizePanel).flag)) {
        this.hideSizePanel()
      }
    },
    prevPage () {
      let currentPage = this.currentPage
      if (currentPage > 1) {
        this.jumpPage(Math.max(currentPage - 1, 1))
      }
    },
    nextPage () {
      let { currentPage, pageCount } = this
      if (currentPage < pageCount) {
        this.jumpPage(Math.min(currentPage + 1, pageCount))
      }
    },
    prevJump () {
      this.jumpPage(Math.max(this.currentPage - this.numList.length, 1))
    },
    nextJump () {
      this.jumpPage(Math.min(this.currentPage + this.numList.length, this.pageCount))
    },
    jumpPage (currentPage) {
      let type = 'current-change'
      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage)
        UtilTools.emitEvent(this, type, [currentPage])
        this.emitPageChange(type, this.pageSize, currentPage)
      }
    },
    changePageSize (pageSize) {
      let type = 'size-change'
      if (pageSize !== this.pageSize) {
        this.$emit('update:pageSize', pageSize)
        UtilTools.emitEvent(this, type, [pageSize])
        this.emitPageChange(type, pageSize, Math.min(this.currentPage, this.getPageCount(this.total, pageSize)))
      }
      this.hideSizePanel()
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
      let value = XEUtils.toNumber(evnt.target.value)
      let current = value <= 0 ? 1 : value >= this.pageCount ? this.pageCount : value
      evnt.target.value = current
      this.jumpPage(current)
    },
    emitPageChange (type, pageSize, currentPage) {
      UtilTools.emitEvent(this, 'page-change', [{ type, pageSize, currentPage }])
    },
    toggleSizePanel () {
      this[this.showSizes ? 'hideSizePanel' : 'showSizePanel']()
    },
    updateZindex () {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex()
      }
    },
    showSizePanel () {
      this.showSizes = true
      this.updateZindex()
      this.$nextTick(() => {
        let { sizeBtn, sizePanel } = this.$refs
        this.panelStyle = {
          zIndex: this.panelIndex,
          bottom: `${sizeBtn.clientHeight + 6}px`,
          left: `-${sizePanel.clientWidth / 2 - sizeBtn.clientWidth / 2}px`
        }
      })
    },
    hideSizePanel () {
      this.showSizes = false
    }
  }
}
