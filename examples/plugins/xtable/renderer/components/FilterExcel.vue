<template>
  <div>
    <div class="myexcel-filter">
      <div class="me-list">
        <ul class="me-group">
          <li class="me-menu" @click="sortAscEvent">
            <i class="fa fa-sort-alpha-asc me-menu-left-icon"></i>
            <span>升序</span>
          </li>
          <li class="me-menu" @click="sortDescEvent">
            <i class="fa fa-sort-alpha-desc me-menu-left-icon"></i>
            <span>降序</span>
          </li>
        </ul>
        <ul class="me-group">
          <li class="me-menu" @click="resetFilterEvent">
            <span>清除筛选</span>
          </li>
          <li class="me-menu">
            <i class="fa fa-filter me-menu-left-icon"></i>
            <span>筛选条件</span>
            <i class="fa fa-caret-right me-menu-right-icon"></i>
            <div class="me-child-list">
                <ul class="me-child-group" v-for="(cList, gIndex) in caseGroups" :key="gIndex">
                  <li v-for="(cItem, cIndex) in cList" :key="cIndex" :class="[option.data.fMenu === cItem.value ? 'me-child-menu active' : 'me-child-menu']" @click="childMenuClickEvent(cItem)">
                    <i class="fa fa-check me-child-menu-left-icon"></i>
                    <span>{{ cItem.label }}</span>
                  </li>
                </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="me-search">
        <div class="header">
          <input v-model="option.data.sVal" placeholder="搜索"/>
          <i class="fa fa-search me-search-icon"></i>
        </div>
        <ul v-if="searchList.length" class="body">
          <li class="me-val-item" @click="sAllEvent">
            <i :class="[isAllSearch ? 'fa fa-check-square-o me-val-icon' : 'fa fa-square-o me-val-icon']"></i>
            <span>(全选)</span>
          </li>
          <li class="me-val-item" v-for="(val, sIndex) in searchList" :key="sIndex" @click="sItemEvent(val)">
            <i :class="[option.data.vals.indexOf(val) === -1 ? 'fa fa-square-o me-val-icon' : 'fa fa-check-square-o me-val-icon']"></i>
            <span>{{ val }}</span>
          </li>
        </ul>
        <div v-else class="body">
          <div class="me-search-empty">无匹配项</div>
        </div>
      </div>
      <div class="me-footer">
        <button @click="confirmFilterEvent">确认</button>
        <button @click="resetFilterEvent">重置</button>
      </div>
    </div>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

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
          { value: 'le', label: '小于或等于' },
          { value: 'between', label: '介于' }
        ],
        [
          // { value: 'top10', label: '前 10 项' },
          // { value: 'gt_mean', label: '高于平均值' },
          // { value: 'lt_mean', label: '低于平均值' },
          { value: 'custom', label: '自定义筛选' }
        ]
      ],
      allCaseList: [
        { value: '', label: '' },
        { value: '1', label: '等于' },
        { value: '2', label: '不等于' },
        { value: '3', label: '大于' },
        { value: '4', label: '大于或等于' },
        { value: '5', label: '小于' },
        { value: '6', label: '小于或等于' },
        { value: '7', label: '开头是' },
        { value: '8', label: '开头不是' },
        { value: '9', label: '结尾是' },
        { value: '10', label: '结尾不是' },
        { value: '11', label: '包含' },
        { value: '12', label: '不包含' }
      ]
    }
  },
  computed: {
    isAllSearch () {
      const { option, searchList } = this
      return searchList.every(val => option.data.vals.indexOf(val) > -1)
    },
    searchList () {
      const { option, colValList } = this
      return option.data.sVal ? colValList.filter(val => val.indexOf(option.data.sVal) > -1) : colValList
    }
  },
  created () {
    // filters 可以配置多个，实际只用一个就可以满足需求了
    const { $table, column } = this.params
    const { fullData } = $table.getTableData()
    const option = column.filters[0]
    const colValList = Object.keys(XEUtils.groupBy(fullData, column.property))
    this.column = column
    this.option = option
    this.colValList = colValList
  },
  methods: {
    sortAscEvent () {
      const { $table, column } = this.params
      $table.closeFilter()
      $table.sort(column.property, 'asc')
    },
    sortDescEvent () {
      const { $table, column } = this.params
      $table.closeFilter()
      $table.sort(column.property, 'desc')
    },
    sAllEvent () {
      const { data } = this.option
      if (this.isAllSearch) {
        data.vals = []
      } else {
        data.vals = this.searchList
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
    confirmFilterEvent () {
      const { params, option } = this
      const { data } = option
      const { $panel } = params
      data.f1 = ''
      data.f2 = ''
      option.checked = true
      $panel.confirmFilter()
    },
    resetFilterEvent () {
      const { $panel } = this.params
      $panel.resetFilter()
    },
    childMenuClickEvent (cItem) {
      const { $table, $panel } = this.params
      const { $XModal, option, allCaseList } = this
      const { data } = option
      this.selectCMenuItem = cItem
      data.fMode = 'and'
      data.f1Val = ''
      data.f2Val = ''
      switch (cItem.value === 'custom' ? (data.fMenu || cItem.value) : cItem.value) {
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
        case 'between':
          data.f1Type = '4'
          data.f2Type = '6'
          break
        case 'custom':
          break
        default:
          return
      }
      $table.closeFilter()
      // 动态弹出框
      $XModal.open({
        title: '自定义自动筛选方式',
        width: 600,
        slots: {
          default: ({ $modal }) => {
            return [
              <div class="me-popup">
                <div class="me-popup-title">显示行</div>
                <div class="me-popup-filter me-popup-f1">
                  <select v-model={ data.f1Type }>
                    {
                      allCaseList.map(fItem => {
                        return <option value={ fItem.value }>{ fItem.label }</option>
                      })
                    }
                  </select>
                  <input v-model={ data.f1Val }/>
                </div>
                <div class="me-popup-concat">
                  <vxe-radio v-model={ data.fMode } label="and" name="fmode">与</vxe-radio>
                  <vxe-radio v-model={ data.fMode } label="or" name="fmode">或</vxe-radio>
                </div>
                <div class="me-popup-filter me-popup-f2">
                  <select v-model={ data.f2Type }>
                    {
                      allCaseList.map(fItem => {
                        return <option value={ fItem.value }>{ fItem.label }</option>
                      })
                    }
                  </select>
                  <input v-model={ data.f2Val }/>
                </div>
                <div class="me-popup-describe">
                  <span>可用 ? 代表单个字符<br/>用 * 代表任意多个字符</span>
                </div>
                <div class="me-popup-footer">
                  <button onClick={ () => {
                    data.fMenu = cItem.value
                    option.checked = true
                    $modal.close()
                    $panel.confirmFilter()
                  } }>确认</button>
                  <button onClick={ () => { $modal.close() } }>取消</button>
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
.vxe-table--filter-wrapper.myexcel-filter-render .vxe-table--filter-template {
  overflow: initial;
  max-height: initial;
  padding: 0;
}
.myexcel-filter {
  user-select: none;
}
.myexcel-filter .me-list .me-group {
  position: relative;
  margin: 0;
  padding: 0;
}
.myexcel-filter .me-list .me-group:after {
  content: "";
  position: absolute;
  width: 190px;
  right: 0;
  bottom: 0;
  border-bottom: 1px solid #E2E4E7;
}
.myexcel-filter .me-list .me-group .me-menu {
  position: relative;
  padding: 4px 20px 4px 30px;
  cursor: pointer;
}
.myexcel-filter .me-list .me-group .me-menu:hover {
  background-color: #C5C5C5;
}
.myexcel-filter .me-list .me-group .me-menu-left-icon {
  position: absolute;
  left: 10px;
  top: 6px;
}
.myexcel-filter .me-list .me-group .me-menu-right-icon {
  position: absolute;
  right: 10px;
  top: 6px;
}
.myexcel-filter .me-list .me-group .me-menu:hover .me-child-list {
  display: block;
}
.myexcel-filter .me-list .me-group .me-menu .me-child-list {
  display: none;
  position: absolute;
  top: 0;
  right: -120px;
  width: 120px;
  background-color: #fff;
  border: 1px solid #DADCE0;
  box-shadow: 3px 3px 4px -2px rgba(0, 0, 0, 0.6);
}
.myexcel-filter .me-list .me-group .me-menu .me-child-group {
  position: relative;
}
.myexcel-filter .me-list .me-group .me-menu .me-child-group:after {
  content: "";
  position: absolute;
  width: 90px;
  right: 0;
  bottom: 0;
  border-bottom: 1px solid #E2E4E7;
}
.myexcel-filter .me-list .me-group .me-menu .me-child-group > .me-child-menu {
  position: relative;
  padding: 4px 20px 4px 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.myexcel-filter .me-list .me-group .me-menu .me-child-group > .me-child-menu:hover {
  background-color: #C5C5C5;
}
.myexcel-filter .me-list .me-group .me-menu .me-child-group > .me-child-menu .me-child-menu-left-icon {
  display: none;
  position: absolute;
  left: 10px;
  top: 6px;
}
.myexcel-filter .me-list .me-group .me-menu .me-child-group > .me-child-menu.active .me-child-menu-left-icon {
  display: block;
}
.myexcel-filter .me-search {
  padding: 0 10px 0 30px;
}
.myexcel-filter .me-search .header {
  position: relative;
  padding: 5px 0;
}
.myexcel-filter .me-search .header > input {
  border: 1px solid #ABABAB;
  padding: 0 20px 0 2px;
  width: 200px;
  height: 22px;
  line-height: 22px;
}
.myexcel-filter .me-search .header > .me-search-icon {
  position: absolute;
  right: 5px;
  top: 10px;
}
.myexcel-filter .me-search .body {
  margin: 0;
  border: 1px solid #E2E4E7;
  padding: 2px 10px;
  overflow: auto;
  height: 140px;
}
.myexcel-filter .me-search .body .me-search-empty {
  text-align: center;
  padding-top: 20px;
}
.myexcel-filter .me-search .body .me-val-item {
  cursor: pointer;
  padding: 2px 0;
}
.myexcel-filter .me-search .body .me-val-item .me-val-icon {
  width: 16px;
}
.myexcel-filter .me-footer {
  text-align: right;
  padding: 10px 10px 10px 0;
}
.myexcel-filter .me-footer button {
  padding: 0 15px;
  margin-left: 15px;
}
.me-popup .me-popup-filter {
  padding-left: 30px;
}
.me-popup .me-popup-filter > select {
  height: 22px;
  line-height: 22px;
  width: 100px;
}
.me-popup .me-popup-filter > input {
  height: 22px;
  line-height: 22px;
  margin-left: 10px;
  width: 400px;
}
.me-popup .me-popup-describe {
  padding: 20px 0 10px 0;
}
.me-popup .me-popup-concat {
  padding-left: 50px;
}
.me-popup .me-popup-footer {
  text-align: right;
}
.me-popup .me-popup-footer button {
  padding: 0 15px;
  margin-left: 15px;
}
</style>
