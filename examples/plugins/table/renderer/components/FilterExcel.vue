<template>
  <div class="my-filter-excel">
    <div class="my-fe-top">
      <ul class="my-fe-menu-group">
        <li class="my-fe-menu-link">
          <span>升序</span>
        </li>
        <li class="my-fe-menu-link">
          <span>倒序</span>
        </li>
      </ul>
      <ul class="my-fe-menu-group">
        <li class="my-fe-menu-link" @click="resetFilterEvent">
          <span>清除筛选</span>
        </li>
        <li class="my-fe-menu-link">
          <i class="fa fa-filter my-fe-menu-link-left-icon"></i>
          <span>筛选条件</span>
          <i class="fa fa-caret-right my-fe-menu-link-right-icon"></i>
          <div class="my-fe-menu-child-list">
            <ul class="my-fe-child-menu-group-list" v-for="(cList, gIndex) in demo1.caseGroups" :key="gIndex">
              <li v-for="(cItem, cIndex) in cList" :key="cIndex" class="my-fe-child-menu-item" @click="childMenuClickEvent(cItem)">
                <span>{{ cItem.label }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="my-fe-search">
      <div class="my-fe-search-top">
        <input v-model="demo1.option.data.sVal" placeholder="搜索"/>
        <i class="fa fa-search my-fe-search-icon"></i>
      </div>
      <ul class="my-fe-search-list">
        <li class="my-fe-search-item" @click="sAllEvent">
          <i class="fa fa-square-o my-fe-search-item-icon"></i>
          <span>(全选)</span>
        </li>
        <li class="my-fe-search-item" v-for="(val, sIndex) in searchList" :key="sIndex" @click="sItemEvent(val)">
          <i :class="[demo1.option.data.vals.indexOf(val) === -1 ? 'fa fa-square-o my-fe-search-item-icon' : 'fa fa-check-square-o my-fe-search-item-icon']"></i>
          <span>{{ val }}</span>
        </li>
      </ul>
    </div>
    <div class="my-fe-footer">
      <vxe-button status="primary" @click="confirmFilterEvent">确认</vxe-button>
      <vxe-button @click="resetFilterEvent">重置</vxe-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed } from 'vue'
import { VXETable } from '../../../../../packages/all'
import { VxeGlobalRendererHandles } from '../../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  name: 'FilterExcel',
  props: {
    params: Object as PropType<VxeGlobalRendererHandles.RenderFilterParams>
  },
  setup (props) {
    interface CaseItem {
      label: string;
      value: string;
    }

    const demo1 = reactive({
      option: null as any,
      colValList: [] as string[],
      caseGroups: [
        [
          { value: 'equal', label: '等于' },
          { value: 'ne', label: '不等于' }
        ],
        [
          { value: 'greater', label: '大于' },
          { value: 'ge', label: '大于或等于' },
          { value: 'less', label: '小于' },
          { value: 'le', label: '小于或等于' }
        ]
      ] as CaseItem[][]
    })

    const searchList = computed(() => {
      const { option, colValList } = demo1
      if (option) {
        return option.data.sVal ? colValList.filter(val => val.indexOf(option.data.sVal) > -1) : colValList
      }
      return []
    })

    const load = () => {
      const { params } = props
      if (params) {
        const { $table, column } = params
        const { fullData } = $table.getTableData()
        const option = column.filters[0]
        const colValList = Object.keys(XEUtils.groupBy(fullData, column.property))
        demo1.option = option
        demo1.colValList = colValList
      }
    }

    const sAllEvent = () => {
      const { option } = demo1
      if (option) {
        const { data } = option
        if (data.vals.length > 0) {
          data.vals = []
        } else {
          data.vals = demo1.colValList
        }
      }
    }

    const sItemEvent = (val: string) => {
      const { option } = demo1
      if (option) {
        const { data } = option
        const vIndex = data.vals.indexOf(val)
        if (vIndex === -1) {
          data.vals.push(val)
        } else {
          data.vals.splice(vIndex, 1)
        }
      }
    }

    const confirmFilterEvent = () => {
      const { params } = props
      const { option } = demo1
      if (params && option) {
        const { data } = option
        const { $panel } = params
        data.f1 = ''
        data.f2 = ''
        $panel.changeOption(null, true, option)
        $panel.confirmFilter()
      }
    }

    const resetFilterEvent = () => {
      const { params } = props
      if (params) {
        const { $panel } = params
        $panel.resetFilter()
      }
    }

    const childMenuClickEvent = (cItem: CaseItem) => {
      VXETable.modal.alert({ content: cItem.label })
    }

    load()

    return {
      demo1,
      searchList,
      sAllEvent,
      sItemEvent,
      confirmFilterEvent,
      resetFilterEvent,
      childMenuClickEvent
    }
  }
})
</script>

<style>
.my-filter-excel {
  user-select: none;
}
.my-filter-excel .my-fe-top .my-fe-menu-group {
  position: relative;
  margin: 0;
  padding: 0;
}
.my-filter-excel .my-fe-top .my-fe-menu-group:after {
  content: "";
  position: absolute;
  width: 190px;
  right: 0;
  bottom: 0;
  border-bottom: 1px solid #E2E4E7;
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link {
  position: relative;
  padding: 4px 20px 4px 30px;
  cursor: pointer;
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link:hover {
  background-color: #C5C5C5;
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link-left-icon {
  position: absolute;
  left: 10px;
  top: 6px;
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link-right-icon {
  position: absolute;
  right: 10px;
  top: 6px;
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link:hover .my-fe-menu-child-list {
  display: block;
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link .my-fe-menu-child-list {
  display: none;
  position: absolute;
  top: 0;
  right: -120px;
  width: 120px;
  background-color: #fff;
  border: 1px solid #DADCE0;
  box-shadow: 3px 3px 4px -2px rgba(0, 0, 0, 0.6);
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link .my-fe-child-menu-group-list {
  position: relative;
  padding: 0;
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link .my-fe-child-menu-group-list:after {
  content: "";
  position: absolute;
  width: 90px;
  right: 0;
  bottom: 0;
  border-bottom: 1px solid #E2E4E7;
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link .my-fe-child-menu-group-list > .my-fe-child-menu-item {
  position: relative;
  padding: 4px 20px 4px 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.my-filter-excel .my-fe-top .my-fe-menu-group .my-fe-menu-link .my-fe-child-menu-group-list > .my-fe-child-menu-item:hover {
  background-color: #C5C5C5;
}
.my-filter-excel .my-fe-search {
  padding: 0 10px 0 30px;
}
.my-filter-excel .my-fe-search .my-fe-search-top {
  position: relative;
  padding: 5px 0;
}
.my-filter-excel .my-fe-search .my-fe-search-top > input {
  border: 1px solid #ABABAB;
  padding: 0 20px 0 2px;
  width: 200px;
  height: 22px;
  line-height: 22px;
}
.my-filter-excel .my-fe-search .my-fe-search-top > .my-fe-search-icon {
  position: absolute;
  right: 5px;
  top: 10px;
}
.my-filter-excel .my-fe-search .my-fe-search-list {
  margin: 0;
  border: 1px solid #E2E4E7;
  padding: 2px 10px;
  overflow: auto;
  height: 140px;
}
.my-filter-excel .my-fe-search .my-fe-search-list .my-fe-search-item {
  cursor: pointer;
  padding: 2px 0;
}
.my-filter-excel .my-fe-search .my-fe-search-list .my-fe-search-item .my-fe-search-item-icon {
  width: 16px;
}
.my-filter-excel .my-fe-footer {
  text-align: right;
  padding: 10px 10px 10px 0;
}
.my-fe-popup .my-fe-popup-filter {
  padding-left: 30px;
}
.my-fe-popup .my-fe-popup-filter > .my-fe-popup-filter-select {
  width: 120px;
}
.my-fe-popup .my-fe-popup-filter > .my-fe-popup-filter-input {
  margin-left: 15px;
  width: 380px;
}
.my-fe-popup .my-fe-popup-describe {
  padding: 20px 0 10px 0;
}
.my-fe-popup .my-fe-popup-concat {
  padding-left: 50px;
}
.my-fe-popup .my-fe-popup-footer {
  text-align: right;
}
</style>
