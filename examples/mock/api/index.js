import { DELETE, POST, GET } from 'xe-ajax-mock'
import Helper from './helper'

GET('/api/conf/region/list', require('./conf/region.json'))
GET('/api/conf/sex/list', require('./conf/sex.json'))
GET('/api/conf/columns/list', require('./conf/columns.json'))
GET('/api/conf/languages/list', require('./conf/languages.json'))

class RoleVO {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.describe = data.describe
    this.createTime = data.createTime
    this.updateTime = data.updateTime
  }
}
const roleHelper = new Helper(require('./role/list.json'), RoleVO)
DELETE('/api/role/delete/{id}', roleHelper.deleteByPathVariable())
POST('/api/role/add', roleHelper.insertByBody())
POST('/api/role/update', roleHelper.updateByBody())
POST('/api/role/save', roleHelper.saveListByBody())
GET('/api/role/list', roleHelper.findList({ max: 10 }))
GET('/api/role/page/list/{pageSize}/{currentPage}', roleHelper.findPageList())

class UserVO {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.password = data.password
    this.sex = data.sex
    this.role = data.role
    this.region = data.region
    this.email = data.email
    this.age = data.age
    this.rate = data.rate
    this.flag = data.flag
    this.phone = data.phone
    this.describe = data.describe
    this.describe2 = data.describe2
    this.describe3 = data.describe3
    this.attr1 = data.attr1
    this.attr2 = data.attr2
    this.attr3 = data.attr3
    this.attr4 = data.attr4
    this.attr5 = data.attr5
    this.attr6 = data.attr6
    this.createTime = data.createTime
    this.updateTime = data.updateTime
  }
}
const userHelper = new Helper(require('./user/list.json'), UserVO)
DELETE('/api/user/delete/{id}', userHelper.deleteByPathVariable())
POST('/api/user/add', userHelper.insertByBody())
POST('/api/user/update', userHelper.updateByBody())
POST('/api/user/save', userHelper.saveListByBody())
GET('/api/user/list', userHelper.findList({ max: 10 }))
GET('/api/user/page/list/{pageSize}/{currentPage}', userHelper.findPageList())

class FileVO {
  constructor (data) {
    this.id = data.id
    this.parentId = data.parentId
    this.name = data.name
    this.size = data.size
    this.type = data.type
    this.createTime = data.createTime
    this.updateTime = data.updateTime
  }
}
const fileHelper = new Helper(require('./file/list.json'), FileVO)
DELETE('/api/file/delete/{id}', fileHelper.deleteByPathVariable())
POST('/api/file/add', fileHelper.insertByBody())
POST('/api/file/update', fileHelper.updateByBody())
POST('/api/file/save', fileHelper.saveTreeListByBody())
GET('/api/file/list', fileHelper.findList())
GET('/api/file/node/list', fileHelper.findTreeNodeList())
GET('/api/file/page/list/{pageSize}/{currentPage}', fileHelper.findPageList())

class ColumnVO {
  constructor (data) {
    this.id = data.id
    this.key = data.key
    this.name = data.name
    this.readonly = data.readonly
    this.required = data.required
    this.validator = data.validator
    this.validMsg = data.validMsg
    this.visible = data.visible
    this.width = data.width
    this.describe = data.describe
    this.createTime = data.createTime
    this.updateTime = data.updateTime
  }
}
const columnHelper = new Helper(require('./column/list.json'), ColumnVO)
DELETE('/api/column/delete/{id}', columnHelper.deleteByPathVariable())
POST('/api/column/add', columnHelper.insertByBody())
POST('/api/column/update', columnHelper.updateByBody())
POST('/api/column/save', columnHelper.saveListByBody())
GET('/api/column/list', columnHelper.findList())
GET('/api/column/page/list/{pageSize}/{currentPage}', columnHelper.findPageList())

class i18nVO {
  constructor (data) {
    this.id = data.id
    this.key = data.key
    this.name = data.name
    this.language = data.language
    this.createTime = data.createTime
    this.updateTime = data.updateTime
  }
}
const i18nHelper = new Helper(require('./i18n/list.json'), i18nVO)
DELETE('/api/i18n/delete/{id}', i18nHelper.deleteByPathVariable())
POST('/api/i18n/add', i18nHelper.insertByBody())
POST('/api/i18n/update', i18nHelper.updateByBody())
POST('/api/i18n/save', i18nHelper.saveListByBody())
GET('/api/i18n/list', i18nHelper.findList())
GET('/api/i18n/page/list/{pageSize}/{currentPage}', i18nHelper.findPageList({ sort: ['key'], order: 'asc' }))
