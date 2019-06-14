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
    // 带背景颜色
    background: Boolean
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data () {
    return {
      showSizes: false,
      panelStyle: null
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
      return Math.max(Math.ceil(this.total / this.pageSize), 1)
    },
    numList () {
      return Array.from(new Array(this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount))
    },
    offsetNumber () {
      return Math.floor((this.pagerCount - 2) / 2)
    }
  },
  created () {
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
  },
  mounted () {
    let sizePanel = this.$refs.sizePanel
    if (sizePanel) {
      document.body.appendChild(this.$refs.sizePanel)
    }
  },
  beforeDestroy () {
    let sizePanel = this.$refs.sizePanel
    if (sizePanel && sizePanel.parentNode) {
      sizePanel.parentNode.removeChild(sizePanel)
    }
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
  },
  render (h) {
    let { layouts, isSizes, loading, vSize, background } = this
    return h('div', {
      class: ['vxe-pager', {
        [`size--${vSize}`]: vSize,
        'p--background': background,
        'is--loading': loading
      }]
    }, layouts.map(name => this[`render${name}`](h)).concat(isSizes ? this.renderSizePanel(h) : []))
  },
  methods: {
    // prevPage
    renderPrevPage (h) {
      let { currentPage } = this
      return h('span', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': currentPage <= 1
        }],
        on: {
          click: this.prevPageEvent
        }
      }, [
        h('i', {
          class: ['vxe-icon--page-icon', GlobalConfig.iconMap.prevPage]
        })
      ])
    },
    // prevJump
    renderPrevJump (h, tagName) {
      let { numList, currentPage } = this
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': currentPage <= 1
        }],
        on: {
          click: () => this.jumpPageEvent(Math.max(currentPage - numList.length, 1))
        }
      }, [
        tagName ? h('i', {
          class: 'vxe-pager--jump-more vxe-icon--more'
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', GlobalConfig.iconMap.jumpPrev]
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
    // nextJump
    renderNextJump (h, tagName) {
      let { numList, currentPage, pageCount } = this
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': currentPage >= pageCount
        }],
        on: {
          click: () => this.jumpPageEvent(Math.min(currentPage + numList.length, pageCount))
        }
      }, [
        tagName ? h('i', {
          class: 'vxe-pager--jump-more vxe-icon--more'
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', GlobalConfig.iconMap.jumpNext]
        })
      ])
    },
    // nextPage
    renderNextPage (h) {
      let { currentPage, pageCount } = this
      return h('span', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': currentPage >= pageCount
        }],
        on: {
          click: this.nextPageEvent
        }
      }, [
        h('i', {
          class: ['vxe-icon--page-icon', GlobalConfig.iconMap.nextPage]
        })
      ])
    },
    // sizes
    renderSizes (h) {
      let { pageSize } = this
      return h('span', {
        class: ['vxe-pager--sizes', {
          'is--active': this.showSizes
        }],
        on: {
          click: this.toggleSizePanel
        },
        ref: 'sizeBtn'
      }, [
        h('i', {
          class: 'vxe-pager--sizes-arrow vxe-icon--caret-bottom'
        }),
        h('span', {
          class: 'size--content'
        }, `${pageSize}${GlobalConfig.i18n('vxe.pager.pagesize')}`)
      ])
    },
    // 分页面板
    renderSizePanel (h) {
      let { panelStyle, pageSize, pageSizes, showSizes } = this
      return h('ul', {
        class: ['vxe-pager-size--select', {
          'is--show': showSizes
        }],
        style: panelStyle,
        ref: 'sizePanel'
      }, pageSizes.map(num => {
        return h('li', {
          class: ['size--option', {
            'is--active': num === pageSize
          }],
          on: {
            click: () => this.sizeChangeEvent(num)
          }
        }, `${num}${GlobalConfig.i18n('vxe.pager.pagesize')}`)
      }))
    },
    // FullJump
    renderFullJump (h) {
      return this.renderJump(h, true)
    },
    // Jump
    renderJump (h, isFull) {
      let { currentPage, pageCount } = this
      return h('span', {
        class: 'vxe-pager--jump'
      }, [
        isFull ? h('span', {
          class: 'vxe-pager--goto-text'
        }, GlobalConfig.i18n('vxe.pager.goto')) : null,
        h('input', {
          class: 'vxe-pager--goto',
          domProps: {
            value: currentPage
          },
          attrs: {
            type: 'text',
            autocomplete: 'off'
          },
          on: {
            keydown: evnt => {
              if (evnt.keyCode === 13) {
                let value = XEUtils.toNumber(evnt.target.value)
                let current = value <= 0 ? 1 : value >= pageCount ? pageCount : value
                evnt.target.value = current
                this.jumpPageEvent(current)
              } else if (evnt.keyCode === 38) {
                evnt.preventDefault()
                this.nextPageEvent(evnt)
              } else if (evnt.keyCode === 40) {
                evnt.preventDefault()
                this.prevPageEvent(evnt)
              }
            }
          }
        }),
        isFull ? h('span', {
          class: 'vxe-pager--classifier-text'
        }, GlobalConfig.i18n('vxe.pager.pageClassifier')) : null
      ])
    },
    // PageCount
    renderPageCount (h) {
      let { pageCount } = this
      return h('span', {
        class: 'vxe-pager--count'
      }, [
        h('span', {
          class: 'vxe-pager--separator'
        }, '/'),
        h('span', pageCount)
      ])
    },
    // total
    renderTotal (h) {
      let { total } = this
      return h('span', {
        class: 'vxe-pager--total'
      }, XEUtils.template(GlobalConfig.i18n('vxe.pager.total'), { total }))
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
              click: () => this.jumpPageEvent(1)
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
                click: () => this.jumpPageEvent(number)
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
              click: () => this.jumpPageEvent(pageCount)
            }
          }, pageCount)
        )
      }
      return nums
    },
    handleGlobalMousedownEvent (evnt) {
      if (this.showSizes && !(DomTools.getEventTargetNode(evnt, this.$refs.sizeBtn).flag || DomTools.getEventTargetNode(evnt, this.$refs.sizePanel).flag)) {
        this.hideSizePanel()
      }
    },
    prevPageEvent () {
      let { currentPage } = this
      if (currentPage > 1) {
        this.jumpPageEvent(Math.max(currentPage - 1, 1))
      }
    },
    nextPageEvent () {
      let { currentPage, pageCount } = this
      if (currentPage < pageCount) {
        this.jumpPageEvent(Math.min(currentPage + 1, pageCount))
      }
    },
    jumpPageEvent (currentPage) {
      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage)
        UtilTools.emitEvent(this, 'current-change', [currentPage])
      }
    },
    sizeChangeEvent (pageSize) {
      if (pageSize !== this.pageSize) {
        this.$emit('update:pageSize', pageSize)
        UtilTools.emitEvent(this, 'size-change', [pageSize])
      }
      this.hideSizePanel()
    },
    toggleSizePanel () {
      if (this.showSizes) {
        this.hideSizePanel()
      } else {
        this.showSizePanel()
      }
    },
    hideSizePanel () {
      this.showSizes = false
    },
    showSizePanel () {
      let { $refs } = this
      let sizeBtnElem = $refs.sizeBtn
      let { left, top } = DomTools.getOffsetPos(sizeBtnElem)
      let { scrollTop, scrollLeft, visibleWidth, visibleHeight } = DomTools.getDomNode()
      this.panelStyle = {
        left: `${left}px`,
        top: `${top + sizeBtnElem.offsetHeight + 6}px`
      }
      this.showSizes = true
      this.$nextTick().then(() => {
        let sizePanelElem = $refs.sizePanel
        if (sizePanelElem) {
          this.panelStyle = {
            top: `${top + sizeBtnElem.offsetHeight + 6}px`,
            left: `${left + Math.floor((sizeBtnElem.offsetWidth - sizePanelElem.offsetWidth) / 2)}px`
          }
          return this.$nextTick()
        }
      }).then(() => {
        let sizePanelElem = $refs.sizePanel
        if (sizePanelElem) {
          let offsetHeight = sizePanelElem.offsetHeight
          let offsetWidth = sizePanelElem.offsetWidth
          if (top + sizeBtnElem.offsetHeight + offsetHeight > scrollTop + visibleHeight) {
            this.panelStyle.top = `${top - offsetHeight - 6}px`
          }
          if (left + offsetWidth > scrollLeft + visibleWidth) {
            this.panelStyle.left = `${scrollLeft + visibleWidth - offsetWidth - 6}px`
          }
        }
      })
    }
  }
}
