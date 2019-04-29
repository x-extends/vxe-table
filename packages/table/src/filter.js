import VxeCheckbox from '../../checkbox'

export default {
  props: {
    filterStore: Object,
    optimizeConfig: Object
  },
  components: {
    VxeCheckbox
  },
  render (h) {
    let $table = this.$parent
    let { filterStore, optimizeConfig, filterCheckAllEvent, filterOptionCheckEvent } = this
    return h('div', {
      class: ['vxe-table--filter-wrapper', {
        't--animat': optimizeConfig.animat,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? [
      h('ul', {
        class: ['vxe-table--filter-body']
      }, [
        h('li', {
          class: ['vxe-table--filter-option']
        }, [
          h('vxe-checkbox', {
            props: {
              value: filterStore.isAllSelected,
              indeterminate: filterStore.isIndeterminate
            },
            on: {
              change (value, evnt) {
                filterCheckAllEvent(evnt, value)
              }
            }
          }, '全部')
        ])
      ].concat(filterStore.options.map((item, index) => {
        return h('li', {
          class: ['vxe-table--filter-option'],
          key: index
        }, [
          h('vxe-checkbox', {
            props: {
              value: item.checked
            },
            on: {
              change (value, evnt) {
                filterOptionCheckEvent(evnt, value, item)
              }
            }
          }, item.label)
        ])
      }))),
      h('div', {
        class: ['vxe-table--filter-footer']
      }, [
        h('button', {
          class: {
            'is--disabled': !filterStore.isAllSelected && !filterStore.isIndeterminate
          },
          attrs: {
            disabled: !filterStore.isAllSelected && !filterStore.isIndeterminate
          },
          on: {
            click: $table.confirmFilterEvent
          }
        }, '筛选'),
        h('button', {
          on: {
            click: $table.resetFilterEvent
          }
        }, '重置')
      ])
    ] : [])
  },
  methods: {
    // 全部筛选事件
    filterCheckAllEvent (evnt, value) {
      let filterStore = this.filterStore
      filterStore.options.forEach(item => {
        item.checked = value
      })
      filterStore.isAllSelected = value
      filterStore.isIndeterminate = false
    },
    // 筛选选项勾选事件
    filterOptionCheckEvent (evnt, value, item) {
      let filterStore = this.filterStore
      item.checked = value
      filterStore.isAllSelected = filterStore.options.every(item => item.checked)
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item.checked)
    }
  }
}
