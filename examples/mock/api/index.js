import { DELETE, POST, GET } from 'xe-ajax-mock'
import Helper from './helper'

import regionConf from './conf/region.json'
import sexConf from './conf/sex.json'
import columnsConf from './conf/columns.json'
import languagesConf from './conf/languages.json'

import cityAll from './city/all.json'

import roleList from './role/list.json'
import userList from './user/list.json'
import fileList from './file/list.json'
import columnList from './column/list.json'
import i18nList from './i18n/list.json'

GET('/api/conf/region/list', regionConf)
GET('/api/conf/sex/list', sexConf)
GET('/api/conf/columns/list', columnsConf)
GET('/api/conf/languages/list', languagesConf)
GET('/api/conf/city/all', cityAll)

class RoleVO {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.describe = data.describe
    this.createTime = data.createTime
    this.updateTime = data.updateTime
  }
}
const roleHelper = new Helper(roleList, RoleVO)
DELETE('/api/role/delete/{id}', roleHelper.deleteByPathVariable())
POST('/api/role/add', roleHelper.insertByBody())
POST('/api/role/update', roleHelper.updateByBody())
POST('/api/role/save', roleHelper.saveListByBody())
GET('/api/role/list', roleHelper.findList({ max: 10 }))
GET('/api/role/full', roleHelper.findAllList())
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
const userHelper = new Helper(userList, UserVO)
DELETE('/api/user/delete/{id}', userHelper.deleteByPathVariable())
POST('/api/user/add', userHelper.insertByBody())
POST('/api/user/update', userHelper.updateByBody())
POST('/api/user/save', userHelper.saveListByBody())
GET('/api/user/list', userHelper.findList({ max: 10 }))
GET('/api/user/full', userHelper.findAllList())
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
const fileHelper = new Helper(fileList, FileVO)
DELETE('/api/file/delete/{id}', fileHelper.deleteByPathVariable())
POST('/api/file/add', fileHelper.insertByBody())
POST('/api/file/update', fileHelper.updateByBody())
POST('/api/file/save', fileHelper.saveTreeListByBody())
GET('/api/file/list', fileHelper.findList())
GET('/api/file/node/list', fileHelper.findTreeNodeList())
GET('/api/file/full', fileHelper.findAllList())
GET('/api/file/page/list/{pageSize}/{currentPage}', fileHelper.findPageList())

class ColumnVO {
  constructor (data) {
    this.id = data.id
    this.key = data.key
    this.name = data.name
    this.isEdit = data.isEdit
    this.required = data.required
    this.validator = data.validator
    this.validMsg = data.validMsg
    this.visible = data.visible
    this.width = data.width
    this.type = data.type
    this.link = data.link
    this.describe = data.describe
    this.createTime = data.createTime
    this.updateTime = data.updateTime
  }
}
const columnHelper = new Helper(columnList, ColumnVO)
DELETE('/api/column/delete/{id}', columnHelper.deleteByPathVariable())
POST('/api/column/add', columnHelper.insertByBody())
POST('/api/column/update', columnHelper.updateByBody())
POST('/api/column/save', columnHelper.saveListByBody())
GET('/api/column/list', columnHelper.findList())
GET('/api/column/full', columnHelper.findAllList())
GET('/api/column/page/list/{pageSize}/{currentPage}', columnHelper.findPageList())

class I18nVO {
  constructor (data) {
    this.id = data.id
    this.key = data.key
    this.name = data.name
    this.language = data.language
    this.createTime = data.createTime
    this.updateTime = data.updateTime
  }
}
const i18nHelper = new Helper(i18nList, I18nVO)
DELETE('/api/i18n/delete/{id}', i18nHelper.deleteByPathVariable())
POST('/api/i18n/add', i18nHelper.insertByBody())
POST('/api/i18n/update', i18nHelper.updateByBody())
POST('/api/i18n/save', i18nHelper.saveListByBody())
GET('/api/i18n/list', i18nHelper.findList())
GET('/api/i18n/full', i18nHelper.findAllList())
GET('/api/i18n/page/list/{pageSize}/{currentPage}', i18nHelper.findPageList({ sort: ['key'], order: 'asc' }))
