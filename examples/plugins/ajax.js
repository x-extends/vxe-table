import Vue from 'vue'
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'

// 挂载到 vue 实例中
Vue.prototype.$ajax = XEAjax

/**
 * 生成模拟数据
 */
const dataCacheList = []
const colCacheList = []
const treeCacheList = []
let dataIndex = 0
let colIndex = 0
let dataID = 2000000

function mockColumns (size) {
  let index = colIndex
  for (; index < size; index++) {
    const colItem = {
      field: index % 2 === 0 ? 'age' : (index % 3 === 0 ? 'rate' : 'name'),
      title: 'col_' + index,
      width: index % 6 === 0 ? 340 : index % 4 === 0 ? 260 : index % 3 === 0 ? 120 : 160,
      resizable: true
    }
    if (index === 0) {
      colItem.width = 100
      colItem.fixed = 'left'
      colItem.type = 'seq'
      colItem.title = '序号'
    }
    if (index === 1) {
      colItem.fixed = 'left'
      colItem.type = 'checkbox'
      colItem.title = '多选'
    }
    if (index < 4) {
      colItem.sortable = true
    } else if (index === 5) {
      colItem.filters = [
        { label: '= 100', value: 100 },
        { label: '= 2000', value: 2000 }
      ]
    } else if (index === 6) {
      colItem.sortable = true
      colItem.filters = [
        { label: '= 500', value: 300 },
        { label: '= 3000', value: 3000 }
      ]
    }
    colCacheList.push(colItem)
  }
  colIndex = index
}

function mockChildData (size, hasChild) {
  const rest = []
  for (let index = 0; index < size; index++) {
    dataID++
    const item = {
      id: dataID,
      name: 'Name - ' + dataID,
      nickname: 'Nickname - ' + dataID,
      role: index % 2 === 0 ? '前端' : '后端'
    }
    if (hasChild) {
      item.children = mockChildData(10)
    }
    rest.push(item)
  }
  return rest
}

function mockData (size, hasChild) {
  const currTime = Date.now()
  const nameList = XEUtils.shuffle(['a', 'T', 'b', 'v', 'G', 'k', 'r', 'H', 'x', 'z', 'c', 'd', 'e', 'p', 'U', 'f', 's', 'N'])
  const nickList = XEUtils.shuffle(['徐', '李', '雷', '赵', '马', '孙', '钱', '蒋', '老', '蔡', '吕', '项', '徐', '杨', '胡', '杜', '嬴', '叼'])
  let index = dataIndex
  for (; index < size; index++) {
    dataID++
    const date = new Date(currTime)
    let item
    if (hasChild) {
      item = {
        id: dataID,
        children: mockChildData(10, hasChild),
        name: nameList[index % 10] + nameList[index % 5] + index,
        nickname: nickList[index % 10] + nickList[index % 5] + index,
        role: index % 2 === 0 ? '前端' : '后端',
        role1: index === 1 ? '1' : '',
        key: 'home.label.key' + Math.max(0, index % 2 === 0 ? index - 1 : index),
        language: index % 2 === 0 ? 'zh_CN' : 'en_US',
        content: index % 2 === 0 ? '内容' + index : 'Content' + index,
        checked: false,
        flag: index % 2 === 0,
        date: date,
        date1: date,
        date2: '09:00:00',
        date3: index % 3 === 0 ? '2020-02-10' : '',
        date4: date,
        date5: '09:00',
        date6: null,
        date7: null,
        date8: null,
        date9: null,
        date10: null,
        date11: [],
        date12: index % 3 === 0 ? '2019-12-20' : '',
        date13: index % 4 === 0 ? '2020-01-01' : '',
        num: (0.234 * index).toFixed(0),
        num1: (0.185 * index).toFixed(0),
        num2: (0.567 * index).toFixed(1),
        num3: (0.789 * index).toFixed(1),
        num4: (0.348 * index).toFixed(2),
        num5: (0.967 * index).toFixed(2),
        num6: '' + (0.234 * index).toFixed(0),
        color: index % 4 === 0 ? 'rgba(255, 0, 0, 0.8)' : index % 3 === 0 ? 'rgba(0, 255, 0, 0.8)' : null,
        slider: index % 5 === 0 ? 40 : index % 4 === 0 ? 20 : index % 3 === 0 ? 60 : 0,
        list: [],
        time: currTime + 360000,
        sex: index % 3 ? '0' : '1',
        sex1: index % 3 ? ['0'] : index % 4 ? ['0', '1'] : index % 5 ? [] : ['1'],
        sex2: index % 4 ? '0' : '1',
        sex3: index % 3 ? 0 : 1,
        sex4: index % 4 ? 0 : 1,
        sex5: index % 5 ? '0' : '1',
        amount: 10000000 * (index % 11 === 0 ? 9.46676 : index % 7 === 8.9886 ? 34.78869 : index % 3 === 2.894453 ? 3.33356 : 7.6566444) + index * 88,
        bankCard: '6200000' + (100000000 + index),
        age: index % 6 === 0 ? 18 : index % 4 === 0 ? 26 : index % 3 === 0 ? 28 : 30,
        age1: '' + (index % 6 === 0 ? 18 : index % 4 === 0 ? 26 : index % 3 === 0 ? 28 : 30),
        region: index % 4 === 0 ? [19, 199, 1773] : index % 3 === 0 ? [9, 73, 719] : [1, 1, 5],
        rate: index % 4 === 0 ? 2 : index % 3 === 0 ? 3 : 0,
        rate1: '' + (index % 4 === 0 ? 2 : index % 3 === 0 ? 3 : 0),
        state: '' + (index % 4 === 0 ? 'value:Washington' : index % 3 === 0 ? 'value:Delaware' : ''),
        address: '地址 地址地址 地址地址 址地址 址地址  址地址 址地址址地址址地址 地址' + index,
        address2: '地址 地址地址 地址' + index,
        img: 'static/other/img' + (index % 3 ? '1' : '2') + '.gif',
        img1: index % 4 === 0 ? 'static/other/img' + (index % 3 ? '1' : '2') + '.gif' : '',
        html1: index % 3 === 0 ? '<span style="color:red;">我是一段Html代码</span><br><span style="color:blue;">我是一段Html代码' + index + '</span><br><span style="color:green;">绿到你发慌！</span>' : '',
        html2: index % 3 === 0 ? '<span style="color:red;">我是一段Html代码</span><span style="color:blue;">我是一段Html代码' + index + '</span><span style="color:green;">绿到你发慌！</span>' : '',
        html3: index + ' -> <span style="color:red;">我是一段Html代码</span><span style="color:blue;">我是一段Html代码' + index + '</span><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码，绿到你发慌！</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span>',
        text: index + ' -> ' + nickList.concat(nameList).join(''),
        updateTime: currTime,
        createTime: currTime,
        attr1: '',
        attr2: [],
        attr3: index % 2 ? '1' : '',
        attr4: '',
        attr5: 0,
        loading: false,
        info: {
          name2: 'name2_' + index,
          more: {
            sex2: index % 3 ? '0' : '1',
            age2: index % 2 === 0 ? 26 : 30
          }
        }
      }
      treeCacheList.push(item)
    } else {
      item = {
        id: 2000000 + index,
        name: nameList[index % 10] + nameList[index % 5] + index,
        nickname: nickList[index % 10] + nickList[index % 5] + index,
        role: index % 2 === 0 ? '前端' : '后端',
        role1: index === 1 ? '1' : '',
        key: 'home.label.key' + Math.max(0, index % 2 === 0 ? index - 1 : index),
        language: index % 2 === 0 ? 'zh_CN' : 'en_US',
        content: index % 2 === 0 ? '内容' + index : 'Content' + index,
        checked: false,
        flag: index % 2 === 0,
        date: date,
        date1: date,
        date2: '09:00:00',
        date3: index % 3 === 0 ? '2020-02-10' : '',
        date4: date,
        date5: '09:00',
        date6: null,
        date7: null,
        date8: null,
        date9: null,
        date10: null,
        date11: [],
        date12: index % 3 === 0 ? '2019-12-20' : '',
        date13: index % 4 === 0 ? '2020-01-01' : '',
        num: (0.234 * index).toFixed(0),
        num1: (0.185 * index).toFixed(0),
        num2: (0.567 * index).toFixed(1),
        num3: (0.789 * index).toFixed(1),
        num4: (0.348 * index).toFixed(2),
        num5: (0.967 * index).toFixed(2),
        num6: '' + (0.234 * index).toFixed(0),
        color: index % 4 === 0 ? 'rgba(255, 0, 0, 0.8)' : index % 3 === 0 ? 'rgba(0, 255, 0, 0.8)' : null,
        slider: index % 5 === 0 ? 40 : index % 4 === 0 ? 20 : index % 3 === 0 ? 60 : 0,
        list: [],
        time: currTime + 360000,
        sex: index % 3 ? '0' : '1',
        sex1: index % 3 ? ['0'] : index % 4 ? ['0', '1'] : index % 5 ? [] : ['1'],
        sex2: index % 4 ? '0' : '1',
        sex3: index % 3 ? 0 : 1,
        sex4: index % 4 ? 0 : 1,
        sex5: index % 5 ? '0' : '1',
        amount: 10000000 * (index % 11 === 0 ? 9.46676 : index % 7 === 8.9886 ? 34.78869 : index % 3 === 2.894453 ? 3.33356 : 7.6566444) + index * 88,
        bankCard: '6200000' + (100000000 + index),
        age: index % 6 === 0 ? 18 : index % 4 === 0 ? 26 : index % 3 === 0 ? 28 : 30,
        age1: '' + (index % 6 === 0 ? 18 : index % 4 === 0 ? 26 : index % 3 === 0 ? 28 : 30),
        region: index % 4 === 0 ? [19, 199, 1773] : index % 3 === 0 ? [9, 73, 719] : [1, 1, 5],
        rate: index % 4 === 0 ? 2 : index % 3 === 0 ? 3 : 0,
        rate1: '' + (index % 4 === 0 ? 2 : index % 3 === 0 ? 3 : 0),
        state: '' + (index % 4 === 0 ? 'value:Washington' : index % 3 === 0 ? 'value:Delaware' : ''),
        address: '地址 地址地址 地址地址 址地址 址地址  址地址 址地址址地址址地址 地址' + index,
        address2: '地址 地址地址 地址' + index,
        img: 'static/other/img' + (index % 3 ? '1' : '2') + '.gif',
        img1: index % 4 === 0 ? 'static/other/img' + (index % 3 ? '1' : '2') + '.gif' : '',
        html1: index % 3 === 0 ? '<span style="color:red;">我是一段Html代码</span><br><span style="color:blue;">我是一段Html代码' + index + '</span><br><span style="color:green;">绿到你发慌！</span>' : '',
        html2: index % 3 === 0 ? '<span style="color:red;">我是一段Html代码</span><span style="color:blue;">我是一段Html代码' + index + '</span><span style="color:green;">绿到你发慌！</span>' : '',
        html3: index + ' -> <span style="color:red;">我是一段Html代码</span><span style="color:blue;">我是一段Html代码' + index + '</span><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码，绿到你发慌！</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span>',
        text: index + ' -> ' + nickList.concat(nameList).join(''),
        updateTime: currTime,
        createTime: currTime,
        attr1: '',
        attr2: [],
        attr3: index % 2 ? '1' : '',
        attr4: '',
        attr5: 0,
        loading: false,
        info: {
          name2: 'name2_' + index,
          more: {
            sex2: index % 3 ? '0' : '1',
            age2: index % 2 === 0 ? 26 : 30
          }
        }
      }
      dataCacheList.push(item)
    }
  }
  dataIndex = index
}

XEAjax.mixin({
  mockColumns (size) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (colCacheList.length < size) {
          mockColumns(size)
        }
        resolve(colCacheList.slice(0, size))
      }, 100)
    })
  },
  mockList (size) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (dataCacheList.length < size) {
          mockData(size)
        }
        resolve(dataCacheList.slice(0, size))
      }, 100)
    })
  },
  mockTreeList (size) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (treeCacheList.length < size) {
          mockData(size, true)
        }
        resolve(treeCacheList.slice(0, size))
      }, 100)
    })
  }
})
