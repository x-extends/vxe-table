import Vue from 'vue'
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'

// 挂载到 vue 实例中
Vue.prototype.$ajax = XEAjax

/* eslint-disable @typescript-eslint/camelcase */

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
      field: 'col_' + index,
      title: 'col_' + index,
      width: index % 6 === 0 ? 340 : index % 4 === 0 ? 260 : index % 3 === 0 ? 120 : 160,
      resizable: true
    }
    if (index === 0) {
      colItem.width = 100
      colItem.fixed = 'left'
      colItem.type = 'seq'
      colItem.title = '序号'
    } else if (index === 1) {
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
      role: index % 4 === 0 ? '前端' : index % 3 === 0 ? '入门到放弃' : '后端'
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
        role: index % 4 === 0 ? '前端' : index % 3 === 0 ? '入门到放弃' : '后端',
        role1: index === 1 ? '1' : '',
        key: 'home.label.key' + Math.max(0, index % 2 === 0 ? index - 1 : index),
        language: index % 2 === 0 ? 'zh_CN' : 'en_US',
        content: index % 2 === 0 ? 'vxe-table 从入门到放弃' + index : 'Content' + index,
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
        address: 'vxe-table 从入门到放弃 vxe-table 从入门到放弃 vxe-table 从入门到放弃' + index,
        address2: 'vxe-table 从入门到放弃' + index,
        img: 'static/other/img' + (index % 3 ? '1' : '2') + '.gif',
        img1: index % 4 === 0 ? 'static/other/img' + (index % 3 ? '1' : '2') + '.gif' : '',
        html1: index % 3 === 0 ? '<span style="color:red;">我是一段Html代码</span><br><span style="color:blue;">vxe-table 从入门到放弃' + index + '</span><br><span style="color:green;">绿到你发慌！</span>' : '',
        html2: index % 3 === 0 ? '<span style="color:red;">我是一段Html代码</span><span style="color:blue;">vxe-table 从入门到放弃' + index + '</span><span style="color:green;">绿到你发慌！</span>' : '',
        html3: index + ' -> <span style="color:red;">我是一段Html代码</span><span style="color:blue;">vxe-table 从入门到放弃' + index + '</span><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码，绿到你发慌！</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span>',
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
          name2: '算了，还是废弃吧' + index,
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
        role: index % 4 === 0 ? '前端' : index % 3 === 0 ? '入门到放弃' : '后端',
        role1: index === 1 ? '1' : '',
        key: 'home.label.key' + Math.max(0, index % 2 === 0 ? index - 1 : index),
        language: index % 2 === 0 ? 'zh_CN' : 'en_US',
        content: index % 2 === 0 ? 'vxe-table 入门到放弃' + index : 'Content' + index,
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
        address: 'vxe-table 从入门到放弃 vxe-table 从入门到放弃 vxe-table 从入门到放弃' + index,
        address2: 'vxe-table 从入门到放弃' + index,
        img: 'static/other/img' + (index % 3 ? '1' : '2') + '.gif',
        img1: index % 4 === 0 ? 'static/other/img' + (index % 3 ? '1' : '2') + '.gif' : '',
        html1: index % 3 === 0 ? '<span style="color:red;">我是一段Html代码</span><br><span style="color:blue;">vxe-table 从入门到放弃' + index + '</span><br><span style="color:green;">绿到你发慌！</span>' : '',
        html2: index % 3 === 0 ? '<span style="color:red;">我是一段Html代码</span><span style="color:blue;">vxe-table 从入门到放弃' + index + '</span><span style="color:green;">绿到你发慌！</span>' : '',
        html3: index + ' -> <span style="color:red;">我是一段Html代码</span><span style="color:blue;">vxe-table 从入门到放弃' + index + '</span><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码，绿到你发慌！</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span>',
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
          name2: '算了，还是废弃吧' + index,
          more: {
            sex2: index % 3 ? '0' : '1',
            age2: index % 2 === 0 ? 26 : 30
          }
        },
        col_4: 'col_4_' + index,
        col_6: 'col_6_' + index,
        col_8: 'col_8_' + index,
        col_10: 'col_10_' + index,
        col_20: 'col_20_' + index,
        col_30: 'col_30_' + index,
        col_40: 'col_40_' + index,
        col_41: 'col_41_' + index,
        col_50: 'col_50_' + index,
        col_60: 'col_60_' + index,
        col_61: 'col_61_' + index,
        col_62: 'col_62_' + index,
        col_63: 'col_63_' + index,
        col_64: 'col_64_' + index,
        col_65: 'col_65_' + index,
        col_100: 'col_100_' + index,
        col_110: 'col_110_' + index,
        col_111: 'col_111_' + index,
        col_112: 'col_112_' + index,
        col_113: 'col_113_' + index,
        col_114: 'col_114_' + index,
        col_115: 'col_115_' + index,
        col_116: 'col_116_' + index,
        col_117: 'col_117_' + index,
        col_118: 'col_118_' + index,
        col_119: 'col_119_' + index,
        col_120: 'col_120_' + index,
        col_500: 'col_500_' + index,
        col_501: 'col_501_' + index,
        col_502: 'col_502_' + index,
        col_503: 'col_503_' + index,
        col_504: 'col_504_' + index,
        col_510: 'col_510_' + index,
        col_520: 'col_520_' + index,
        col_521: 'col_521_' + index,
        col_522: 'col_522_' + index,
        col_523: 'col_523_' + index,
        col_524: 'col_524_' + index,
        col_525: 'col_525_' + index,
        col_526: 'col_526_' + index,
        col_527: 'col_527_' + index,
        col_528: 'col_528_' + index,
        col_529: 'col_529_' + index,
        col_530: 'col_530_' + index,
        col_1000: 'col_1000_' + index,
        col_1500: 'col_1500_' + index,
        col_2000: 'col_2000_' + index,
        col_2001: 'col_2001_' + index,
        col_2002: 'col_2002_' + index,
        col_2003: 'col_2003_' + index,
        col_2004: 'col_2004_' + index,
        col_2005: 'col_2005_' + index,
        col_2006: 'col_2006_' + index,
        col_2007: 'col_2007_' + index,
        col_2008: 'col_2008_' + index,
        col_2009: 'col_2009_' + index,
        col_2010: 'col_2010_' + index,
        col_2011: 'col_2011_' + index,
        col_2012: 'col_2012_' + index,
        col_2013: 'col_2013_' + index
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
        const rest = dataCacheList.slice(0, size)
        rest.forEach(item => {
          item.checked = false
        })
        resolve(rest)
      }, 100)
    })
  },
  mockTreeList (size) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (treeCacheList.length < size) {
          mockData(size, true)
        }
        const rest = treeCacheList.slice(0, size)
        XEUtils.eachTree(rest, item => {
          item.checked = false
        })
        resolve(rest)
      }, 100)
    })
  }
})
