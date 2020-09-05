import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import 'font-awesome/scss/font-awesome.scss'
import './assets/style/index.scss'
import './plugins'
import './mock'
import XEUtils from 'xe-utils'
import moment from 'moment'

// **************** （注意：该全局变量仅用于开发环境调试） ****************
if (process.env.NODE_ENV === 'development') {
  window.XEUtils = XEUtils
}
// **************** （注意：该全局变量仅用于开发环境调试） ****************

Vue.config.productionTip = false

// 生成模拟数据
const list = []
let currTime = Date.now()
const nameList = XEUtils.shuffle(['a', 'T', 'b', 'v', 'G', 'k', 'r', 'H', 'x', 'z', 'c', 'd', 'e', 'p', 'U', 'f', 's', 'N'])
const nickList = XEUtils.shuffle(['徐', '李', '雷', '赵', '马', '孙', '钱', '蒋', '老', '蔡', '吕', '项', '徐', '杨', '胡', '杜', '嬴', '叼'])
function mockData () {
  for (let index = 0; index < 400; index++) {
    currTime += 7200000
    const date = new Date(currTime)
    const mDate = moment(currTime)
    list.push({
      id: 1000000 + index,
      name: nameList[index % 10] + nameList[index % 5] + index,
      nickname: nickList[index % 10] + nickList[index % 5] + index,
      role: index % 5 === 0 ? '前端' : index % 4 === 0 ? '设计师' : index % 3 === 0 ? '测试' : '项目经理',
      role1: index === 1 ? '1' : '',
      key: 'home.label.key' + Math.max(0, index % 2 === 0 ? index - 1 : index),
      language: index % 2 === 0 ? 'zh_CN' : 'en_US',
      content: index % 2 === 0 ? 'vxe-table 从入门到放弃' + index : 'Content' + index,
      checked: false,
      checked1: index % 2 === 0,
      checked2: index % 3 === 0,
      checked3: index % 4 === 0,
      checked4: index % 5 === 0,
      checkedList: [],
      flag: index % 2 === 0,
      flag1: index % 2 === 0 ? 'Y' : 'N',
      flag2: index % 3 === 0 ? 'N' : 'Y',
      date: date,
      date1: date,
      date2: '09:00:00',
      date3: index % 3 === 0 ? XEUtils.toDateString(currTime, 'yyyy-MM-dd') : '',
      date4: date,
      date5: '09:00',
      date6: null,
      date7: mDate,
      date8: mDate,
      date9: mDate,
      date10: mDate,
      date11: [],
      date12: index % 3 === 0 ? XEUtils.toDateString(currTime - 666, 'yyyy-MM-dd') : '',
      date13: index % 4 === 0 ? XEUtils.toDateString(currTime - 9999, 'yyyy-MM-dd') : '',
      date14: index % 9 === 0 ? '2020-05-30' : index % 7 === 0 ? '2020-08-01' : index % 5 === 0 ? '2020-12-22' : index % 3 === 0 ? '2020-11-30' : index % 2 === 0 ? '2020-12-04' : '2020-02-18',
      num: (0.234 * index).toFixed(0),
      num1: (0.185 * index).toFixed(0),
      num2: (0.567 * index).toFixed(1),
      num3: (0.789 * index).toFixed(1),
      num4: (0.348 * index).toFixed(2),
      num5: (0.967 * index).toFixed(2),
      num6: `${(0.234 * index).toFixed(0)}`,
      num7: (1.39784 * (index + 1)).toFixed(5),
      num8: (1.39784 * (index + 1)).toFixed(5),
      num9: (1.39784 * (index + 1)).toFixed(5),
      color: index % 4 === 0 ? 'rgba(255, 0, 0, 0.8)' : index % 3 === 0 ? 'rgba(0, 255, 0, 0.8)' : '',
      color1: index % 4 === 0 ? '#409EFF' : index % 3 === 0 ? '#22de22' : '',
      slider: index % 5 === 0 ? 40 : index % 4 === 0 ? 20 : index % 3 === 0 ? 60 : 0,
      list: [],
      time: currTime + 360000,
      sex: index % 3 === 0 ? '0' : '1',
      sex1: index % 3 === 0 ? ['0'] : index % 4 === 0 ? ['0', '1'] : index % 5 === 0 ? [] : ['1'],
      sex2: index % 4 === 0 ? '1' : index % 3 === 0 ? '0' : '',
      sex3: index % 3 === 0 ? 0 : 1,
      sex4: index % 4 === 0 ? 0 : 1,
      sex5: index % 5 === 0 ? '0' : '1',
      sex6: index % 5 === 0 ? 0 : 1,
      amount: 10000000 * (index % 11 === 0 ? 9.46676 : index % 7 === 8.9886 ? 34.78869 : index % 3 === 2.894453 ? 3.33356 : 7.6566444) + index * 88,
      bankCard: '6200000' + (100000000 + index),
      age: index % 8 === 0 ? 22 : index % 7 === 0 ? 24 : index % 6 === 0 ? 16 : index % 5 === 0 ? 18 : index % 4 === 0 ? 26 : index % 3 === 0 ? 28 : 30,
      age1: `${index % 6 === 0 ? 18 : index % 4 === 0 ? 26 : index % 3 === 0 ? 28 : 30}`,
      region: index % 4 === 0 ? [19, 199, 1773] : index % 3 === 0 ? [9, 73, 719] : [1, 1, 5],
      rate: index % 4 === 0 ? 2 : index % 3 === 0 ? 3 : 0,
      rate1: `${index % 4 === 0 ? 2 : index % 3 === 0 ? 3 : 0}`,
      state: `${index % 4 === 0 ? 'value:Washington' : index % 3 === 0 ? 'value:Delaware' : ''}`,
      address: `vxe-table 从入门到放弃 - ${index}`,
      address2: `vxe-table 从入门到放弃${index}`,
      img: `static/other/img${index % 3 ? '1' : '2'}.gif`,
      img1: index % 4 === 0 ? `static/other/img${index % 3 ? '1' : '2'}.gif` : '',
      html1: index % 3 === 0 ? `<span style="color:red;">我是一段Html代码</span><br><span style="color:blue;">vxe-table 从入门到放弃${index}</span><br><span style="color:green;">绿到你发慌！</span>` : '',
      html2: index % 3 === 0 ? `<span style="color:red;">我是一段Html代码</span><span style="color:blue;">vxe-table 从入门到住院${index}</span><span style="color:green;">绿到你发慌！</span>` : '',
      html3: `${index} -> <span style="color:red;">我是一段Html代码</span><span style="color:blue;">vxe-table 从入门到放弃${index}</span><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">绿到你发慌！</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码，绿到你发慌！</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:red;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span><br><span style="color:green;">我是一段Html代码,我是一段Html代码，我是一段Html代码</span>`,
      text: `${index} -> ${nickList.concat(nameList).join('').repeat(index % 6 === 0 ? 12 : index % 4 === 16 ? 18 : index % 3 === 0 ? 22 : 26)}`,
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
    })
  }
}

const treeList = [
  {
    id: '10000',
    parentId: null,
    name: '文件夹 10000',
    size: '53k',
    type: '',
    date: '2019-10-22',
    checked: false,
    indeterminate: false,
    childCols: [],
    childData: [],
    children: [
      {
        id: '11000',
        parentId: '10000',
        name: 'vxe-table 从入门到放弃.avi',
        size: '11k',
        type: 'avi',
        date: '2019-05-21',
        checked: false,
        indeterminate: false,
        childCols: [],
        childData: []
      },
      {
        id: '12000',
        parentId: '10000',
        name: '文件夹 12000',
        size: '22k',
        type: '',
        date: '2019-08-16',
        childCols: [],
        childData: [],
        checked: false,
        indeterminate: false,
        children: [
          {
            id: '12100',
            parentId: '12000',
            name: 'vxe-table 从入门到放弃 12100.png',
            size: '60k',
            type: '',
            date: '2019-08-20',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false,
            children: [
              {
                id: '12110',
                parentId: '12100',
                name: '某个页面 12110.html',
                size: '100k',
                type: 'html',
                date: '2019-05-19',
                childCols: [],
                childData: [],
                checked: false,
                indeterminate: false
              }
            ]
          },
          {
            id: '122000',
            parentId: '12000',
            name: 'xxx 122000.avi',
            size: '80k',
            type: 'avi',
            date: '2019-04-18',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false
          },
          {
            id: '123000',
            parentId: '12000',
            name: '文件夹 123000',
            size: '',
            type: '',
            date: '2019-06-17',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false,
            children: [
              {
                id: '123100',
                parentId: '123000',
                name: 'vxe-table 从入门到放弃 123100.avi',
                size: '105k',
                type: 'avi',
                date: '2019-05-16',
                childCols: [],
                childData: [],
                checked: false,
                indeterminate: false
              },
              {
                id: '123200',
                parentId: '123000',
                name: '文件 123200.avi',
                size: '105k',
                type: 'avi',
                date: '2019-02-20',
                childCols: [],
                childData: [],
                checked: false,
                indeterminate: false
              },
              {
                id: '123300',
                parentId: '123000',
                name: 'vxe-table 从入门到放弃 123300.txt',
                size: '18k',
                type: 'txt',
                date: '2019-04-21',
                childCols: [],
                childData: [],
                checked: false,
                indeterminate: false
              }
            ]
          },
          {
            id: '124000',
            parentId: '12000',
            name: 'vxe-table 放弃指南 124000.mp4',
            size: '860k',
            type: 'mp4',
            date: '2019-01-27',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false
          },
          {
            id: '125000',
            parentId: '12000',
            name: 'vxe-table 入坑指南 125000.avi',
            size: '660k',
            type: 'avi',
            date: '2019-09-12',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false
          },
          {
            id: '126000',
            parentId: '12000',
            name: 'vxe-table 填坑系列 126000.avi',
            size: '320k',
            type: 'avi',
            date: '2019-07-29',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false
          }
        ]
      }
    ]
  },
  {
    id: '20000',
    parentId: null,
    name: 'vxe-table 入坑系列 20000.png',
    size: '66k',
    type: 'png',
    date: '2019-08-23',
    childCols: [],
    childData: [],
    checked: false,
    indeterminate: false
  },
  {
    id: '30000',
    parentId: null,
    name: '文件夹 30000',
    size: '3k',
    type: '',
    date: '2019-05-14',
    childCols: [],
    childData: [],
    checked: false,
    indeterminate: false,
    children: [
      {
        id: '31000',
        parentId: '30000',
        name: '文件夹 31000',
        size: '9k',
        type: '',
        date: '2019-07-24',
        childCols: [],
        childData: [],
        checked: false,
        indeterminate: false,
        children: [
          {
            id: '31100',
            parentId: '31000',
            name: '从入门到放弃 31100.js',
            size: '40k',
            type: 'js',
            date: '2019-05-27',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false
          },
          {
            id: '31200',
            parentId: '31000',
            name: '文件 31200',
            size: '224k',
            type: 'java',
            date: '2019-10-25',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false
          }
        ]
      },
      {
        id: '32000',
        parentId: '30000',
        name: '文件夹 32000',
        size: '33k',
        type: '',
        date: '2019-05-25',
        childCols: [],
        childData: [],
        checked: false,
        indeterminate: false,
        children: [
          {
            id: '32100',
            parentId: '32000',
            name: 'vxe-table 从入门到放弃 32100.mp4',
            size: '35k',
            type: 'mp4',
            date: '2019-05-28',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false
          },
          {
            id: '32200',
            parentId: '32000',
            name: '文件夹 32000',
            size: '33k',
            type: '',
            date: '2019-02-29',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false,
            children: [
              {
                id: '32210',
                parentId: '32200',
                name: 'vxe-table 从入门到住院 32210.pdf',
                size: '75k',
                type: 'pdf',
                date: '2019-12-13',
                childCols: [],
                childData: [],
                checked: false,
                indeterminate: false
              },
              {
                id: '32220',
                parentId: '32200',
                name: '文件夹 32220',
                size: '33k',
                type: '',
                date: '2019-08-12',
                childCols: [],
                childData: [],
                checked: false,
                indeterminate: false,
                children: [
                  {
                    id: '32221',
                    parentId: '32220',
                    name: 'vxe-table 从入门到放弃 32221.pdf',
                    size: '85k',
                    type: 'pdf',
                    date: '2019-12-30',
                    childCols: [],
                    childData: [],
                    checked: false,
                    indeterminate: false
                  },
                  {
                    id: '32222',
                    parentId: '32220',
                    name: 'vxe-table 从入门到住院 32222.ppt',
                    size: '998k',
                    type: 'ppt',
                    date: '2019-10-30',
                    childCols: [],
                    childData: [],
                    checked: false,
                    indeterminate: false
                  },
                  {
                    id: '32223',
                    parentId: '32220',
                    name: 'vxe-table 从入门到精通 32223.xlsx',
                    size: '95k',
                    type: 'xlsx',
                    date: '2019-11-01',
                    childCols: [],
                    childData: [],
                    checked: false,
                    indeterminate: false
                  }
                ]
              }
            ]
          },
          {
            id: '32300',
            parentId: '32000',
            name: '文件夹 32300',
            size: '678k',
            type: '',
            date: '2019-01-10',
            childCols: [],
            childData: [],
            checked: false,
            indeterminate: false,
            children: [
              {
                id: '32310',
                parentId: '32300',
                name: 'vxe-table 从入门到精通 32310.mp4',
                size: '75k',
                type: 'mp4',
                date: '2019-11-09',
                childCols: [],
                childData: [],
                checked: false,
                indeterminate: false
              },
              {
                id: '32320',
                parentId: '32300',
                name: '文件夹 32320',
                size: '88k',
                type: '',
                date: '2019-08-08',
                childCols: [],
                childData: [],
                checked: false,
                indeterminate: false,
                children: [
                  {
                    id: '32321',
                    parentId: '32320',
                    name: '音乐 32321.mp3',
                    size: '5k',
                    type: 'mp3',
                    date: '2019-03-07',
                    childCols: [],
                    childData: [],
                    checked: false,
                    indeterminate: false
                  },
                  {
                    id: '32322',
                    parentId: '32320',
                    name: '在线观看 32322.avi',
                    size: '5k',
                    type: 'avi',
                    date: '2019-09-09',
                    childCols: [],
                    childData: [],
                    checked: false,
                    indeterminate: false
                  },
                  {
                    id: '32323',
                    parentId: '32320',
                    name: '音乐 32323.mp3',
                    size: '576k',
                    type: 'mp3',
                    date: '2019-09-04',
                    childCols: [],
                    childData: [],
                    checked: false,
                    indeterminate: false
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '33000',
        parentId: '30000',
        name: '在线文档 33000.txt',
        size: '95k',
        type: 'txt',
        date: '2019-01-14',
        childCols: [],
        childData: [],
        checked: false,
        indeterminate: false
      },
      {
        id: '34000',
        parentId: '30000',
        name: 'vxe-table 从入门到住院 34000.avi',
        size: '786k',
        type: 'avi',
        date: '2019-01-17',
        childCols: [],
        childData: [],
        checked: false,
        indeterminate: false
      },
      {
        id: '35000',
        parentId: '30000',
        name: '在线学习 35000.mp4',
        size: '286k',
        type: 'mp4',
        date: '2019-02-19',
        childCols: [],
        childData: [],
        checked: false,
        indeterminate: false
      },
      {
        id: '36000',
        parentId: '30000',
        name: 'vue3.0 入门教程 36000.pdf',
        size: '870k',
        type: 'pdf',
        date: '2019-12-27',
        childCols: [],
        childData: [],
        checked: false,
        indeterminate: false
      }
    ]
  },
  {
    id: '40000',
    parentId: null,
    name: '文件夹 40000',
    size: '26k',
    type: 'mp4',
    date: '2019-03-04',
    childCols: [],
    childData: [],
    checked: false,
    indeterminate: false,
    children: [
      {
        id: '41000',
        parentId: '40000',
        name: 'xxx 41000.mp4',
        size: '135k',
        type: 'mp4',
        date: '2019-02-03',
        childCols: [],
        childData: [],
        checked: false,
        indeterminate: false
      }
    ]
  },
  {
    id: '50000',
    parentId: null,
    name: 'vxe-table 从入门到放弃 50000.avi',
    size: '498k',
    type: 'avi',
    date: '2019-12-02',
    childCols: [],
    childData: [],
    children: [],
    checked: false,
    indeterminate: false
  }
]

Object.defineProperties(window, {
  MOCK_DATA_LIST: {
    get () {
      list.forEach(item => {
        item.checked = false
      })
      return list
    }
  },
  MOCK_TREE_DATA_LIST: {
    get () {
      XEUtils.eachTree(treeList, item => {
        item.checked = false
      })
      return treeList
    }
  }
})

mockData()

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
