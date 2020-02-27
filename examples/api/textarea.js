import XEUtils from 'xe-utils/methods/xe-utils'
import inputAPI from './input'

const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: XEUtils.clone(inputAPI.find(item => item.name === 'Props').list.filter(obj => !['type', 'clearable', 'prefix-icon', 'suffix-icon'].includes(obj.name)), true).concat([
      {
        name: 'rows',
        desc: '原生 rows 属性',
        version: '',
        type: 'String, Number',
        enum: '',
        defVal: '',
        list: []
      }
    ])
  },
  {
    name: 'Slots',
    descKey: 'app.api.title.slots',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'Events',
    descKey: 'app.api.title.events',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: '*',
        desc: '在需要时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{}, event',
        list: []
      }
    ]
  },
  {
    name: 'Methods',
    descKey: 'app.api.title.methods',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'focus',
        desc: '使输入框获取焦点',
        version: '2.8',
        type: '',
        enum: '',
        defVal: '{}, event',
        list: []
      },
      {
        name: 'blur',
        desc: '使输入框失去焦点',
        version: '2.8',
        type: '',
        enum: '',
        defVal: '{}, event',
        list: []
      }
    ]
  }
]

export default apis
