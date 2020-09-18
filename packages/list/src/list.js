import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import { DomTools, GlobalEvent, ResizeEvent } from '../../tools'

export default {
  name: 'VxeList',
  props: {
    data: Array,
    height: [Number, String],
    maxHeight: [Number, String],
    loading: Boolean,
    size: { type: String, default: () => GlobalConfig.list.size || GlobalConfig.size },
    autoResize: Boolean,
    syncResize: [Boolean, String, Number],
    scrollY: Object
  },
  data () {
    return {
      scrollYLoad: false,
      bodyHeight: 0,
      topSpaceHeight: 0,
      items: []
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    sYOpts () {
      return Object.assign({}, GlobalConfig.list.scrollY, this.scrollY)
    },
    styles () {
      const { height, maxHeight } = this
      const style = {}
      if (height) {
        style.height = isNaN(height) ? height : `${height}px`
      } else if (maxHeight) {
        style.height = 'auto'
        style.maxHeight = isNaN(maxHeight) ? maxHeight : `${maxHeight}px`
      }
      return style
    }
  },
  watch: {
    data (value) {
      this.loadData(value)
    },
    syncResize (value) {
      if (value) {
        this.recalculate()
        this.$nextTick(() => setTimeout(() => this.recalculate()))
      }
    }
  },
  created () {
    Object.assign(this, {
      fullData: [],
      lastScrollLeft: 0,
      lastScrollTop: 0,
      scrollYStore: {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: 0
      }
    })
    this.loadData(this.data)
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent)
  },
  mounted () {
    if (this.autoResize) {
      const resizeObserver = new ResizeEvent(() => this.recalculate())
      resizeObserver.observe(this.$el)
      this.$resize = resizeObserver
    }
  },
  beforeDestroy () {
    if (this.$resize) {
      this.$resize.disconnect()
    }
  },
  destroyed () {
    GlobalEvent.off(this, 'resize')
  },
  render (h) {
    const { $scopedSlots, styles, bodyHeight, topSpaceHeight, items, loading } = this
    return [
      h('div', {
        class: ['vxe-list', {
          'is--loading': loading
        }]
      }, [
        h('div', {
          ref: 'virtualWrapper',
          class: 'vxe-list--virtual-wrapper',
          style: styles,
          on: {
            scroll: this.scrollEvent
          }
        }, [
          h('div', {
            ref: 'ySpace',
            class: 'vxe-list--y-space',
            style: {
              height: bodyHeight ? `${bodyHeight}px` : ''
            }
          }),
          h('div', {
            ref: 'body',
            class: 'vxe-list--body',
            style: {
              marginTop: topSpaceHeight ? `${topSpaceHeight}px` : ''
            }
          }, $scopedSlots.default ? $scopedSlots.default.call(this, { items, $list: this }, h) : [])
        ]),
        h('div', {
          class: ['vxe-list--loading vxe-loading', {
            'is--visible': loading
          }]
        }, [
          h('div', {
            class: 'vxe-loading--spinner'
          })
        ])
      ])
    ]
  },
  methods: {
    getParentElem () {
      return this.$el.parentNode
    },
    /**
     * 加载数据
     * @param {Array} datas 数据
     */
    loadData (datas) {
      const { sYOpts, scrollYStore } = this
      const fullData = datas || []
      scrollYStore.startIndex = 0
      scrollYStore.visibleIndex = 0
      this.fullData = fullData
      this.scrollYLoad = sYOpts.gt > -1 && fullData.length > sYOpts.gt
      this.handleData()
      return this.computeScrollLoad().then(() => {
        this.refreshScroll()
      })
    },
    /**
     * 重新加载数据
     * @param {Array} datas 数据
     */
    reloadData (datas) {
      this.clearScroll()
      return this.loadData(datas)
    },
    handleData () {
      const { fullData, scrollYLoad, scrollYStore } = this
      this.items = scrollYLoad ? fullData.slice(scrollYStore.startIndex, Math.max(scrollYStore.startIndex + scrollYStore.renderSize, 1)) : fullData.slice(0)
      return this.$nextTick()
    },
    /**
     * 重新计算列表
     */
    recalculate () {
      const { $el } = this
      if ($el.clientWidth && $el.clientHeight) {
        return this.computeScrollLoad()
      }
      return Promise.resolve()
    },
    /**
     * 清除滚动条
     */
    clearScroll () {
      const scrollBodyElem = this.$refs.virtualWrapper
      if (scrollBodyElem) {
        scrollBodyElem.scrollTop = 0
      }
    },
    /**
     * 刷新滚动条
     */
    refreshScroll () {
      const { lastScrollLeft, lastScrollTop } = this
      this.clearScroll()
      return this.$nextTick().then(() => {
        if (lastScrollLeft || lastScrollTop) {
          this.lastScrollLeft = 0
          this.lastScrollTop = 0
          return this.scrollTo(lastScrollLeft, lastScrollTop)
        }
      })
    },
    /**
     * 如果有滚动条，则滚动到对应的位置
     * @param {Number} scrollLeft 左距离
     * @param {Number} scrollTop 上距离
     */
    scrollTo (scrollLeft, scrollTop) {
      const scrollBodyElem = this.$refs.virtualWrapper
      if (XEUtils.isNumber(scrollLeft)) {
        scrollBodyElem.scrollLeft = scrollLeft
      }
      if (XEUtils.isNumber(scrollTop)) {
        scrollBodyElem.scrollTop = scrollTop
      }
      DomTools.triggerEvent(scrollBodyElem, 'scroll')
      if (this.scrollYLoad) {
        return new Promise(resolve => setTimeout(() => resolve(this.$nextTick()), 50))
      }
      return this.$nextTick()
    },
    computeScrollLoad () {
      return this.$nextTick().then(() => {
        const { $refs, sYOpts, scrollYLoad, scrollYStore } = this
        if (scrollYLoad) {
          let rHeight = 48
          if (sYOpts.rHeight) {
            rHeight = sYOpts.rHeight
          } else {
            let firstItemElem
            if (sYOpts.sItem) {
              firstItemElem = $refs.body.querySelector(sYOpts.sItem)
            }
            if (!firstItemElem) {
              firstItemElem = $refs.body.children[0]
            }
            if (firstItemElem) {
              rHeight = firstItemElem.offsetHeight
            }
          }
          const visibleYSize = XEUtils.toNumber(sYOpts.vSize || Math.ceil($refs.virtualWrapper.clientHeight / rHeight))
          scrollYStore.visibleSize = visibleYSize
          scrollYStore.rowHeight = rHeight
          if (!sYOpts.oSize) {
            scrollYStore.offsetSize = visibleYSize
          }
          if (!sYOpts.rSize) {
            scrollYStore.renderSize = Math.max(6, visibleYSize + 2)
          }
          this.updateYData()
        } else {
          this.updateYSpace()
        }
      })
    },
    scrollEvent (evnt) {
      const scrollBodyElem = evnt.target
      const scrollTop = scrollBodyElem.scrollTop
      const scrollLeft = scrollBodyElem.scrollLeft
      const isX = scrollLeft !== this.lastScrollLeft
      const isY = scrollTop !== this.lastScrollTop
      this.lastScrollTop = scrollTop
      this.lastScrollLeft = scrollLeft
      if (this.scrollYLoad) {
        this.loadYData(evnt)
      }
      this.$emit('scroll', { scrollLeft, scrollTop, isX, isY, $event: evnt })
    },
    loadYData (evnt) {
      const { fullData, scrollYStore, isLoadData } = this
      const { startIndex, renderSize, offsetSize, visibleSize, rowHeight } = scrollYStore
      const scrollBodyElem = evnt.target
      const scrollTop = scrollBodyElem.scrollTop
      const toVisibleIndex = Math.ceil(scrollTop / rowHeight)
      let preload = false
      if (isLoadData || scrollYStore.visibleIndex !== toVisibleIndex) {
        const marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize)
        if (scrollYStore.visibleIndex > toVisibleIndex) {
          preload = toVisibleIndex - offsetSize <= startIndex
          if (preload) {
            scrollYStore.startIndex = Math.max(0, toVisibleIndex - Math.max(marginSize, renderSize - visibleSize))
          }
        } else {
          preload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize
          if (preload) {
            scrollYStore.startIndex = Math.max(0, Math.min(fullData.length - renderSize, toVisibleIndex - marginSize))
          }
        }
        if (preload) {
          this.updateYData()
        }
        scrollYStore.visibleIndex = toVisibleIndex
        this.isLoadData = false
      }
    },
    updateYData () {
      this.handleData()
      this.updateYSpace()
    },
    updateYSpace () {
      const { scrollYStore, scrollYLoad, fullData } = this
      this.bodyHeight = scrollYLoad ? fullData.length * scrollYStore.rowHeight : 0
      this.topSpaceHeight = scrollYLoad ? Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0) : 0
    },
    handleGlobalResizeEvent () {
      this.recalculate()
    }
  }
}
