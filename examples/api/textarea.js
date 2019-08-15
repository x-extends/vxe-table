import XEUtils from 'xe-utils'
import inputAPI from './input'

const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    type: '',
    enum: '',
    defVal: '',
    list: XEUtils.clone(inputAPI.find(item => item.name === 'Props').list.filter(obj => !['type'].includes(obj.name)), true).concat([
      {
        name: 'rows',
        desc: '原生 rows 属性',
        type: 'String, Number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'resize',
        desc: '原生 resize 属性',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      }
    ])
  },
  {
    name: 'Slots',
    descKey: 'app.api.title.slots',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'Events',
    descKey: 'app.api.title.events',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: '*',
        desc: '在值发生改变时触发该事件',
        type: '',
        enum: '',
        defVal: '{ value }, event',
        list: []
      }
    ]
  },
  {
    name: 'Methods',
    descKey: 'app.api.title.methods',
    type: '',
    enum: '',
    defVal: '',
    list: []
  }
]

export default apis
