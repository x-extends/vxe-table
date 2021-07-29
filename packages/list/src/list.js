import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import { GlobalEvent, createResizeEvent } from '../../tools'
import { browse } from '../../tools/src/dom'

export default {
  name: 'VxeList',
  mixins: [vSize],
  props: {
    data: Array,
    height: [Number, String],
    maxHeight: [Number, String],
    loading: Boolean,
    className: [String, Function],
    size: { type: String, default: () => GlobalConfig.list.size || GlobalConfig.size },
    autoResize: { type: Boolean, default: () => GlobalConfig.list.autoResize },
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
        endIndex: 0,
        visibleSize: 0
      }
    })
    this.loadData(this.data)
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent)
  },
  mounted () {
    if (this.autoResize) {
      const resizeObserver = createResizeEvent(() => this.recalculate())
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
    const { $scopedSlots, styles, bodyHeight, topSpaceHeight, items, className, loading } = this
    return h('div', {
      class: ['vxe-list', className ? (XEUtils.isFunction(className) ? className({ $list: this }) : className) : '', {
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
          ref: 'virtualBody',
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
      Object.assign(scrollYStore, {
        startIndex: 0,
        endIndex: 1,
        visibleSize: 0
      })
      this.fullData = fullData
      this.scrollYLoad = sYOpts.enabled && sYOpts.gt > -1 && sYOpts.gt <= fullData.length
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
      this.items = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0)
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
      return this.$nextTick()
    },
    /**
     * 刷新滚动条
     */
    refreshScroll () {
      const { lastScrollLeft, lastScrollTop } = this
      return this.clearScroll().then(() => {
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
      if (this.scrollYLoad) {
        return new Promise(resolve => setTimeout(() => resolve(this.$nextTick()), 50))
      }
      return this.$nextTick()
    },
    computeScrollLoad () {
      return this.$nextTick().then(() => {
        const { $refs, sYOpts, scrollYLoad, scrollYStore } = this
        const { virtualWrapper: virtualWrapperElem, virtualBody: virtualBodyElem } = $refs
        let rowHeight = 0
        let firstItemElem
        if (virtualBodyElem) {
          if (sYOpts.sItem) {
            firstItemElem = virtualBodyElem.querySelector(sYOpts.sItem)
          }
          if (!firstItemElem) {
            firstItemElem = virtualBodyElem.children[0]
          }
        }
        if (firstItemElem) {
          rowHeight = firstItemElem.offsetHeight
        }
        rowHeight = Math.max(20, rowHeight)
        scrollYStore.rowHeight = rowHeight
        // 计算 Y 逻辑
        if (scrollYLoad) {
          const visibleYSize = Math.max(8, Math.ceil(virtualWrapperElem.clientHeight / rowHeight))
          const offsetYSize = sYOpts.oSize ? XEUtils.toNumber(sYOpts.oSize) : browse.msie ? 20 : (browse.edge ? 10 : 0)
          scrollYStore.offsetSize = offsetYSize
          scrollYStore.visibleSize = visibleYSize
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex, visibleYSize + offsetYSize, scrollYStore.endIndex)
          this.updateYData()
        } else {
          this.updateYSpace()
        }
        this.rowHeight = rowHeight
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
      const { scrollYStore } = this
      const { startIndex, endIndex, visibleSize, offsetSize, rowHeight } = scrollYStore
      const scrollBodyElem = evnt.target
      const scrollTop = scrollBodyElem.scrollTop
      const toVisibleIndex = Math.floor(scrollTop / rowHeight)
      const offsetStartIndex = Math.max(0, toVisibleIndex - 1 - offsetSize)
      const offsetEndIndex = toVisibleIndex + visibleSize + offsetSize
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex
          scrollYStore.endIndex = offsetEndIndex
          this.updateYData()
        }
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
