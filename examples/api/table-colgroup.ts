import XEUtils from 'xe-utils'
import columnAPI from './column'

const columnProps: any = columnAPI.find(item => item.name === 'Props')

const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: XEUtils.clone(columnProps, true).list.filter((item: any) => [
      'field',
      'title',
      'width',
      'min-width',
      'resizable',
      'visible',
      'fixed',
      'align',
      'header-align',
      'show-overflow',
      'show-header-overflow',
      'header-class-name'
    ].includes(item.name))
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
    list: []
  },
  {
    name: 'Methods',
    descKey: 'app.api.title.methods',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  }
]

export default apis
