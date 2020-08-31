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
            <ul class="my-fe-child-menu-group-list" v-for="(cList, gIndex) in caseGroups" :key="gIndex">
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
        <input v-model="option.data.sVal" placeholder="搜索"/>
        <i class="fa fa-search my-fe-search-icon"></i>
      </div>
      <ul class="my-fe-search-list">
        <li class="my-fe-search-item" @click="sAllEvent">
          <i class="fa fa-square-o my-fe-search-item-icon"></i>
          <span>(全选)</span>
        </li>
        <li class="my-fe-search-item" v-for="(val, sIndex) in searchList" :key="sIndex" @click="sItemEvent(val)">
          <i :class="[option.data.vals.indexOf(val) === -1 ? 'fa fa-square-o my-fe-search-item-icon' : 'fa fa-check-square-o my-fe-search-item-icon']"></i>
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

<script>
import XEUtils from 'xe-utils'
import { VXETable } from '../../../../../packages/vxe-table'

export default {
  name: 'FilterExcel',
  props: {
    params: Object
  },
  data () {
    return {
      column: null,
      option: null,
      colValList: [],
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
      ],
      allCaseList: [
        { value: '1', label: '等于' },
        { value: '2', label: '不等于' },
        { value: '3', label: '大于' },
        { value: '4', label: '大于或等于' },
        { value: '5', label: '小于' },
        { value: '6', label: '小于或等于' }
      ]
    }
  },
  computed: {
    searchList () {
      const { option, colValList } = this
      return option.data.sVal ? colValList.filter(val => val.indexOf(option.data.sVal) > -1) : colValList
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      const { $table, column } = this.params
      const { fullData } = $table.getTableData()
      const option = column.filters[0]
      const colValList = Object.keys(XEUtils.groupBy(fullData, column.property))
      this.column = column
      this.option = option
      this.colValList = colValList
    },
    sAllEvent () {
      const { data } = this.option
      if (data.vals.length > 0) {
        data.vals = []
      } else {
        data.vals = this.colValList
      }
    },
    sItemEvent (val) {
      const { data } = this.option
      const vIndex = data.vals.indexOf(val)
      if (vIndex === -1) {
        data.vals.push(val)
      } else {
        data.vals.splice(vIndex, 1)
      }
    },
    confirmFilterEvent (evnt) {
      const { params, option } = this
      const { data } = option
      const { $panel } = params
      data.f1 = ''
      data.f2 = ''
      $panel.changeOption(evnt, true, option)
      $panel.confirmFilter()
    },
    resetFilterEvent () {
      const { $panel } = this.params
      $panel.resetFilter()
    },
    childMenuClickEvent (cItem) {
      const { $table, $panel } = this.params
      const { option, allCaseList } = this
      const { data } = option
      this.selectCMenuItem = cItem
      data.fMode = 'and'
      data.f1Val = ''
      data.f2Val = ''
      switch (cItem.value) {
        case 'equal':
          data.f1Type = '1'
          data.f2Type = ''
          break
        case 'ne':
          data.f1Type = '2'
          data.f2Type = ''
          break
        case 'greater':
          data.f1Type = '3'
          data.f2Type = ''
          break
        case 'ge':
          data.f1Type = '4'
          data.f2Type = ''
          break
        case 'less':
          data.f1Type = '5'
          data.f2Type = ''
          break
        case 'le':
          data.f1Type = '6'
          data.f2Type = ''
          break
      }
      $table.closeFilter()
      VXETable.modal.open({
        title: '自定义自动筛选方式',
        width: 600,
        slots: {
          default: ({ $modal }) => {
            return [
              <div class="my-fe-popup">
                <div class="my-fe-popup-filter my-fe-popup-f1">
                  <vxe-select class="my-fe-popup-filter-select" v-model={ data.f1Type } transfer clearable>
                    {
                      allCaseList.map(fItem => {
                        return <vxe-option value={ fItem.value } label={ fItem.label }></vxe-option>
                      })
                    }
                  </vxe-select>
                  <vxe-input class="my-fe-popup-filter-input" v-model={ data.f1Val } clearable></vxe-input>
                </div>
                <div class="my-fe-popup-concat">
                  <vxe-radio-group v-model={ data.fMode }>
                    <vxe-radio label="and">与</vxe-radio>
                    <vxe-radio label="or">或</vxe-radio>
                  </vxe-radio-group>
                </div>
                <div class="my-fe-popup-filter my-fe-popup-f2">
                  <vxe-select class="my-fe-popup-filter-select" v-model={ data.f2Type } transfer clearable>
                    {
                      allCaseList.map(fItem => {
                        return <vxe-option value={ fItem.value } label={ fItem.label }></vxe-option>
                      })
                    }
                  </vxe-select>
                  <vxe-input class="my-fe-popup-filter-input" v-model={ data.f2Val } clearable></vxe-input>
                </div>
                <div class="my-fe-popup-describe">
                  <span>可用 ? 代表单个字符<br/>用 * 代表任意多个字符</span>
                </div>
                <div class="my-fe-popup-footer">
                  <vxe-button status="primary" onClick={
                    () => {
                      data.fMenu = cItem.value
                      option.checked = true
                      $modal.close()
                      $panel.confirmFilter()
                    }
                  }>确认</vxe-button>
                  <vxe-button onClick={
                    () => {
                      $modal.close()
                    }
                  }>取消</vxe-button>
                </div>
              </div>
            ]
          }
        }
      })
    }
  }
}
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
