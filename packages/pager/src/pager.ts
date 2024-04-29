import { defineComponent, h, PropType, computed, inject, ref, Ref, reactive, nextTick, watch } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VxeSelectComponent from '../../select'
import { hasEventKey, EVENT_KEYS } from '../../tools/event'
import { useSize } from '../../hooks/size'
import { errLog } from '../../tools/log'

import { VxePagerPropTypes, VxePagerConstructor, VxePagerEmits, VxeSelectEvents, PagerPrivateRef, VxeGridConstructor, PagerMethods, PagerPrivateMethods, VxePagerPrivateMethods, PagerReactData } from '../../../types/all'

export default defineComponent({
  name: 'VxePager',
  props: {
    size: { type: String as PropType<VxePagerPropTypes.Size>, default: () => GlobalConfig.pager.size || GlobalConfig.size },
    // 自定义布局
    layouts: { type: Array as PropType<VxePagerPropTypes.Layouts>, default: () => GlobalConfig.pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total'] },
    // 当前页
    currentPage: { type: Number as PropType<VxePagerPropTypes.CurrentPage>, default: 1 },
    // 加载中
    loading: Boolean as PropType<VxePagerPropTypes.Loading>,
    // 每页大小
    pageSize: { type: Number as PropType<VxePagerPropTypes.PageSize>, default: () => GlobalConfig.pager.pageSize || 10 },
    // 总条数
    total: { type: Number as PropType<VxePagerPropTypes.Total>, default: 0 },
    // 显示页码按钮的数量
    pagerCount: { type: Number as PropType<VxePagerPropTypes.PagerCount>, default: () => GlobalConfig.pager.pagerCount || 7 },
    // 每页大小选项列表
    pageSizes: { type: Array as PropType<VxePagerPropTypes.PageSizes>, default: () => GlobalConfig.pager.pageSizes || [10, 15, 20, 50, 100] },
    // 列对其方式
    align: { type: String as PropType<VxePagerPropTypes.Align>, default: () => GlobalConfig.pager.align },
    // 带边框
    border: { type: Boolean as PropType<VxePagerPropTypes.Border>, default: () => GlobalConfig.pager.border },
    // 带背景颜色
    background: { type: Boolean as PropType<VxePagerPropTypes.Background>, default: () => GlobalConfig.pager.background },
    // 配套的样式
    perfect: { type: Boolean as PropType<VxePagerPropTypes.Perfect>, default: () => GlobalConfig.pager.perfect },
    // 当只有一页时隐藏
    autoHidden: { type: Boolean as PropType<VxePagerPropTypes.AutoHidden>, default: () => GlobalConfig.pager.autoHidden },
    transfer: { type: Boolean as PropType<VxePagerPropTypes.Transfer>, default: () => GlobalConfig.pager.transfer },
    className: [String, Function] as PropType<VxePagerPropTypes.ClassName>,
    // 自定义图标
    iconPrevPage: String as PropType<VxePagerPropTypes.IconPrevPage>,
    iconJumpPrev: String as PropType<VxePagerPropTypes.IconJumpPrev>,
    iconJumpNext: String as PropType<VxePagerPropTypes.IconJumpNext>,
    iconNextPage: String as PropType<VxePagerPropTypes.IconNextPage>,
    iconJumpMore: String as PropType<VxePagerPropTypes.IconJumpMore>,
    iconHomePage: String as PropType<VxePagerPropTypes.IconHome>,
    iconEndPage: String as PropType<VxePagerPropTypes.IconEnd>
  },
  emits: [
    'update:pageSize',
    'update:currentPage',
    'page-change'
  ] as VxePagerEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const $xegrid = inject('$xegrid', null as VxeGridConstructor | null)

    const reactData = reactive<PagerReactData>({
      inpCurrPage: props.currentPage
    })

    const refElem = ref() as Ref<HTMLDivElement>

    const refMaps: PagerPrivateRef = {
      refElem
    }

    const $xepager = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    } as unknown as VxePagerConstructor & VxePagerPrivateMethods

    let pagerMethods = {} as PagerMethods
    let pagerPrivateMethods = {} as PagerPrivateMethods

    const getPageCount = (total: number, size: number) => {
      return Math.max(Math.ceil(total / size), 1)
    }

    const computePageCount = computed(() => {
      return getPageCount(props.total, props.pageSize)
    })

    const jumpPageEvent = (evnt: Event, currentPage: number) => {
      emit('update:currentPage', currentPage)
      if (evnt && currentPage !== props.currentPage) {
        pagerMethods.dispatchEvent('page-change', { type: 'current', pageSize: props.pageSize, currentPage }, evnt)
      }
    }

    const changeCurrentPage = (currentPage: number, evnt?: Event) => {
      emit('update:currentPage', currentPage)
      if (evnt && currentPage !== props.currentPage) {
        pagerMethods.dispatchEvent('page-change', { type: 'current', pageSize: props.pageSize, currentPage }, evnt)
      }
    }

    const triggerJumpEvent = (evnt: Event) => {
      const inputElem: HTMLInputElement = evnt.target as HTMLInputElement
      const inpValue = XEUtils.toInteger(inputElem.value)
      const pageCount = computePageCount.value
      const current = inpValue <= 0 ? 1 : inpValue >= pageCount ? pageCount : inpValue
      const currPage = XEUtils.toValueString(current)
      inputElem.value = currPage
      reactData.inpCurrPage = currPage
      changeCurrentPage(current, evnt)
    }

    const computeNumList = computed(() => {
      const { pagerCount } = props
      const pageCount = computePageCount.value
      const len = pageCount > pagerCount ? pagerCount - 2 : pagerCount
      const rest = []
      for (let index = 0; index < len; index++) {
        rest.push(index)
      }
      return rest
    })

    const computeOffsetNumber = computed(() => {
      return Math.floor((props.pagerCount - 2) / 2)
    })

    const computeSizeList = computed(() => {
      return props.pageSizes.map((item) => {
        if (XEUtils.isNumber(item)) {
          return {
            value: item,
            label: `${GlobalConfig.i18n('vxe.pager.pagesize', [item])}`
          }
        }
        return { value: '', label: '', ...item }
      })
    })

    const handleHomePage = (evnt?: Event) => {
      const { currentPage } = props
      if (currentPage > 1) {
        changeCurrentPage(1, evnt)
      }
    }

    const handleEndPage = (evnt?: Event) => {
      const { currentPage } = props
      const pageCount = computePageCount.value
      if (currentPage < pageCount) {
        changeCurrentPage(pageCount, evnt)
      }
    }

    const handlePrevPage = (evnt?: Event) => {
      const { currentPage } = props
      const pageCount = computePageCount.value
      if (currentPage > 1) {
        changeCurrentPage(Math.min(pageCount, Math.max(currentPage - 1, 1)), evnt)
      }
    }

    const handleNextPage = (evnt?: Event) => {
      const { currentPage } = props
      const pageCount = computePageCount.value
      if (currentPage < pageCount) {
        changeCurrentPage(Math.min(pageCount, currentPage + 1), evnt)
      }
    }

    const handlePrevJump = (evnt?: Event) => {
      const numList = computeNumList.value
      changeCurrentPage(Math.max(props.currentPage - numList.length, 1), evnt)
    }

    const handleNextJump = (evnt?: Event) => {
      const pageCount = computePageCount.value
      const numList = computeNumList.value
      changeCurrentPage(Math.min(props.currentPage + numList.length, pageCount), evnt)
    }

    const pageSizeEvent: VxeSelectEvents.Change = (params) => {
      const { value } = params
      const pageSize = XEUtils.toNumber(value)
      const pageCount = getPageCount(props.total, pageSize)
      let currentPage = props.currentPage
      if (currentPage > pageCount) {
        currentPage = pageCount
        emit('update:currentPage', pageCount)
      }
      emit('update:pageSize', pageSize)
      pagerMethods.dispatchEvent('page-change', { type: 'size', pageSize, currentPage })
    }

    const jumpInputEvent = (evnt: KeyboardEvent) => {
      const inputElem: HTMLInputElement = evnt.target as HTMLInputElement
      reactData.inpCurrPage = inputElem.value
    }

    const jumpKeydownEvent = (evnt: KeyboardEvent) => {
      if (hasEventKey(evnt, EVENT_KEYS.ENTER)) {
        triggerJumpEvent(evnt)
      } else if (hasEventKey(evnt, EVENT_KEYS.ARROW_UP)) {
        evnt.preventDefault()
        handleNextPage(evnt)
      } else if (hasEventKey(evnt, EVENT_KEYS.ARROW_DOWN)) {
        evnt.preventDefault()
        handlePrevPage(evnt)
      }
    }

    // 第一页
    const renderHomePage = () => {
      return h('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': props.currentPage <= 1
        }],
        type: 'button',
        title: GlobalConfig.i18n('vxe.pager.homePageTitle'),
        onClick: handleHomePage
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', props.iconHomePage || GlobalConfig.icon.PAGER_HOME]
        })
      ])
    }

    // 上一页
    const renderPrevPage = () => {
      return h('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': props.currentPage <= 1
        }],
        type: 'button',
        title: GlobalConfig.i18n('vxe.pager.prevPageTitle'),
        onClick: handlePrevPage
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', props.iconPrevPage || GlobalConfig.icon.PAGER_PREV_PAGE]
        })
      ])
    }

    // 向上翻页
    const renderPrevJump = (tagName?: string) => {
      return h(tagName || 'button', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': props.currentPage <= 1
        }],
        type: 'button',
        title: GlobalConfig.i18n('vxe.pager.prevJumpTitle'),
        onClick: handlePrevJump
      }, [
        tagName ? h('i', {
          class: ['vxe-pager--jump-more-icon', props.iconJumpMore || GlobalConfig.icon.PAGER_JUMP_MORE]
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', props.iconJumpPrev || GlobalConfig.icon.PAGER_JUMP_PREV]
        })
      ])
    }

    // 向下翻页
    const renderNextJump = (tagName?: string) => {
      const pageCount = computePageCount.value
      return h(tagName || 'button', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': props.currentPage >= pageCount
        }],
        type: 'button',
        title: GlobalConfig.i18n('vxe.pager.nextJumpTitle'),
        onClick: handleNextJump
      }, [
        tagName ? h('i', {
          class: ['vxe-pager--jump-more-icon', props.iconJumpMore || GlobalConfig.icon.PAGER_JUMP_MORE]
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', props.iconJumpNext || GlobalConfig.icon.PAGER_JUMP_NEXT]
        })
      ])
    }

    // 下一页
    const renderNextPage = () => {
      const pageCount = computePageCount.value
      return h('button', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': props.currentPage >= pageCount
        }],
        type: 'button',
        title: GlobalConfig.i18n('vxe.pager.nextPageTitle'),
        onClick: handleNextPage
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', props.iconNextPage || GlobalConfig.icon.PAGER_NEXT_PAGE]
        })
      ])
    }

    // 最后一页
    const renderEndPage = () => {
      const pageCount = computePageCount.value
      return h('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': props.currentPage >= pageCount
        }],
        type: 'button',
        title: GlobalConfig.i18n('vxe.pager.endPageTitle'),
        onClick: handleEndPage
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', props.iconEndPage || GlobalConfig.icon.PAGER_END]
        })
      ])
    }

    // 页数
    const renderNumber = (showJump?: boolean) => {
      const { currentPage, pagerCount } = props
      const nums = []
      const pageCount = computePageCount.value
      const numList = computeNumList.value
      const offsetNumber = computeOffsetNumber.value
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
            type: 'button',
            onClick: (evnt: Event) => jumpPageEvent(evnt, 1)
          }, 1),
          renderPrevJump('span')
        )
      }
      numList.forEach((item, index) => {
        const number = startNumber + index
        if (number <= pageCount) {
          nums.push(
            h('button', {
              key: number,
              class: ['vxe-pager--num-btn', {
                'is--active': currentPage === number
              }],
              type: 'button',
              onClick: (evnt: Event) => jumpPageEvent(evnt, number)
            }, number)
          )
        }
      })
      if (showJump && isGt) {
        nums.push(
          renderNextJump('button'),
          h('button', {
            class: 'vxe-pager--num-btn',
            type: 'button',
            onClick: (evnt: Event) => jumpPageEvent(evnt, pageCount)
          }, pageCount)
        )
      }
      return h('span', {
        class: 'vxe-pager--btn-wrapper'
      }, nums)
    }

    // jumpNumber
    const renderJumpNumber = () => {
      return renderNumber(true)
    }

    // sizes
    const renderSizes = () => {
      const sizeList = computeSizeList.value
      return h(VxeSelectComponent, {
        class: 'vxe-pager--sizes',
        modelValue: props.pageSize,
        placement: 'top',
        transfer: props.transfer,
        options: sizeList,
        onChange: pageSizeEvent
      })
    }

    // Jump
    const renderJump = (isFull?: boolean) => {
      return h('span', {
        class: 'vxe-pager--jump'
      }, [
        isFull ? h('span', {
          class: 'vxe-pager--goto-text'
        }, GlobalConfig.i18n('vxe.pager.goto')) : null,
        h('input', {
          class: 'vxe-pager--goto',
          value: reactData.inpCurrPage,
          type: 'text',
          autocomplete: 'off',
          onInput: jumpInputEvent,
          onKeydown: jumpKeydownEvent,
          onBlur: triggerJumpEvent
        }),
        isFull ? h('span', {
          class: 'vxe-pager--classifier-text'
        }, GlobalConfig.i18n('vxe.pager.pageClassifier')) : null
      ])
    }

    // FullJump
    const renderFullJump = () => {
      return renderJump(true)
    }

    // PageCount
    const renderPageCount = () => {
      const pageCount = computePageCount.value
      return h('span', {
        class: 'vxe-pager--count'
      }, [
        h('span', {
          class: 'vxe-pager--separator'
        }),
        h('span', pageCount)
      ])
    }

    // total
    const renderTotal = () => {
      return h('span', {
        class: 'vxe-pager--total'
      }, GlobalConfig.i18n('vxe.pager.total', [props.total]))
    }

    pagerMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $pager: $xepager, $event: evnt }, params))
      },
      homePage () {
        handleHomePage()
        return nextTick()
      },
      endPage () {
        handleEndPage()
        return nextTick()
      },
      prevPage () {
        handlePrevPage()
        return nextTick()
      },
      nextPage () {
        handleNextPage()
        return nextTick()
      },
      prevJump () {
        handlePrevJump()
        return nextTick()
      },
      nextJump () {
        handleNextJump()
        return nextTick()
      }
    }

    pagerPrivateMethods = {
      handlePrevPage,
      handleNextPage,
      handlePrevJump,
      handleNextJump
    }

    Object.assign($xepager, pagerMethods, pagerPrivateMethods)

    watch(() => props.currentPage, (value) => {
      reactData.inpCurrPage = value
    })

    const renderVN = () => {
      const { align, layouts, className } = props
      const childNodes = []
      const vSize = computeSize.value
      const pageCount = computePageCount.value
      if (slots.left) {
        childNodes.push(
          h('span', {
            class: 'vxe-pager--left-wrapper'
          }, slots.left({ $grid: $xegrid }))
        )
      }
      layouts.forEach((name) => {
        let renderFn
        switch (name) {
          case 'Home':
            renderFn = renderHomePage
            break
          case 'PrevJump':
            renderFn = renderPrevJump
            break
          case 'PrevPage':
            renderFn = renderPrevPage
            break
          case 'Number':
            renderFn = renderNumber
            break
          case 'JumpNumber':
            renderFn = renderJumpNumber
            break
          case 'NextPage':
            renderFn = renderNextPage
            break
          case 'NextJump':
            renderFn = renderNextJump
            break
          case 'End':
            renderFn = renderEndPage
            break
          case 'Sizes':
            renderFn = renderSizes
            break
          case 'FullJump':
            renderFn = renderFullJump
            break
          case 'Jump':
            renderFn = renderJump
            break
          case 'PageCount':
            renderFn = renderPageCount
            break
          case 'Total':
            renderFn = renderTotal
            break
        }
        if (renderFn) {
          childNodes.push(renderFn())
        } else {
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            errLog('vxe.error.notProp', [`layouts -> ${name}`])
          }
        }
      })
      if (slots.right) {
        childNodes.push(
          h('span', {
            class: 'vxe-pager--right-wrapper'
          }, slots.right({ $grid: $xegrid }))
        )
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-pager', className ? (XEUtils.isFunction(className) ? className({ $pager: $xepager }) : className) : '', {
          [`size--${vSize}`]: vSize,
          [`align--${align}`]: align,
          'is--border': props.border,
          'is--background': props.background,
          'is--perfect': props.perfect,
          'is--hidden': props.autoHidden && pageCount === 1,
          'is--loading': props.loading
        }]
      }, [
        h('div', {
          class: 'vxe-pager--wrapper'
        }, childNodes)
      ])
    }

    $xepager.renderVN = renderVN

    return $xepager
  },
  render () {
    return this.renderVN()
  }
})
