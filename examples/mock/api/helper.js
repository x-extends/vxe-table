import XEUtils from 'xe-utils'
import { template } from 'xe-ajax-mock'

var idIndex = 100000

// Mock 辅助函数
class Helper {
  constructor (data, ModelVO) {
    this.list = template(data)
    this.ModelVO = ModelVO
  }
  // 获取最新数据、支持排序
  findList (options) {
    let { list } = this
    let { sort = ['updateTime'], order = 'desc', max } = options || {}
    return function (request) {
      let rest = list
      let params = request.params
      let sortProp = sort
      let orderPrpo = order
      if (params) {
        let filterProps = XEUtils.keys(params).filter(key => !['sort', 'order'].includes(key) && params[key])
        if (filterProps) {
          rest = rest.filter(data => filterProps.every(key => '' + data[key] === '' + params[key]))
        }
        if (params.order) {
          orderPrpo = params.order
        }
        if (params.sort) {
          sortProp = params.sort.split(',')
        }
      }
      rest = XEUtils.sortBy(list, sortProp)
      if (orderPrpo === 'desc') {
        rest = rest.reverse()
      }
      return max ? rest.slice(0, max) : rest
    }
  }
  // 树形结构 获取节点数据、支持排序
  findTreeNodeList (options) {
    let { list } = this
    let { sort = ['updateTime'], order = 'desc', key = 'id', parentKey = 'parentId', max } = options || {}
    return function (request) {
      let rest = list
      let params = request.params
      let sortProp = sort
      let orderPrpo = order
      if (params) {
        let filterProps = XEUtils.keys(params).filter(key => !['sort', 'order'].includes(key) && params[key])
        if (filterProps) {
          rest = rest.filter(data => filterProps.every(key => '' + data[key] === '' + params[key]))
        }
        if (params.order) {
          orderPrpo = params.order
        }
        if (params.sort) {
          sortProp = params.sort.split(',')
        }
      }
      rest = XEUtils.toArrayTree(list, { key, parentKey, sortKey: sortProp })
      if (params && params[key]) {
        let matchObj = XEUtils.findTree(rest, item => '' + item[key] === '' + params[key], { key, parentKey })
        rest = matchObj ? matchObj.item.children : []
      }
      rest = rest.map(item => {
        if (item.children && item.children.length) {
          item.hasChildren = true
        }
        delete item.children
        return item
      })
      if (orderPrpo === 'desc') {
        rest = rest.reverse()
      }
      return max ? rest.slice(0, max) : rest
    }
  }
  // 分页、支持排序
  findPageList (options) {
    let { list } = this
    let { sort = ['updateTime'], order = 'desc', page } = options || {}
    return function (request, response, { pathVariable }) {
      let pageSize = 10
      let currentPage = 1
      let rest = list
      let params = request.params
      let sortProp = sort
      let orderPrpo = order
      if (params) {
        let filterProps = XEUtils.keys(params).filter(key => !['sort', 'order'].includes(key) && params[key])
        if (filterProps) {
          rest = rest.filter(data => filterProps.every(key => String(data[key] || '').indexOf(params[key]) > -1))
        }
        if (params.order) {
          orderPrpo = params.order
        }
        if (params.sort) {
          sortProp = params.sort.split(',')
        }
      }
      if (pathVariable) {
        pageSize = XEUtils.toNumber(pathVariable[page && page.size ? page.size : 'pageSize']) || pageSize
        currentPage = XEUtils.toNumber(pathVariable[page && page.current ? page.current : 'currentPage']) || currentPage
      }
      let totalResult = rest.length
      rest = XEUtils.sortBy(rest, sortProp)
      if (orderPrpo === 'desc') {
        rest = rest.reverse()
      }
      response.body = {
        page: { pageSize, currentPage, totalResult },
        result: rest.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      }
      return response
    }
  }
  // 删除单条
  deleteByPathVariable (options) {
    let { list } = this
    let { key = 'id' } = options || {}
    return function (request, response, { pathVariable }) {
      let rest = []
      if (pathVariable) {
        rest = XEUtils.remove(list, item => item[key] === pathVariable[key])
      }
      response.body = rest
      return response
    }
  }
  // 树结构 删除单条
  deleteTreeByPathVariable (options) {
    let { list } = this
    let { key = 'id', parentKey = 'parentId' } = options || {}
    return function (request, response, { pathVariable }) {
      let rest = []
      if (pathVariable) {
        let removes = XEUtils.remove(list, item => item[key] === pathVariable[key])
        rest = rest.concat(removes)
        while (removes.length) {
          removes = XEUtils.remove(list, item => removes.some(row => row[key] === item[parentKey]))
          rest = rest.concat(removes)
        }
      }
      response.body = rest
      return response
    }
  }
  // 插入单条
  insertByBody (options) {
    let { list, ModelVO } = this
    let { key = 'id' } = options || {}
    return function (request, response) {
      let result = []
      if (request.body) {
        let updateTime = Date.now()
        let insertRecords = [request.body]
        insertRecords.forEach(data => {
          let rest = Object.assign(new ModelVO(data), { [key]: idIndex++, updateTime, createTime: updateTime })
          result.push(rest)
          list.push(rest)
        })
      }
      return result
    }
  }
  // 树结构 插入单条
  insertTreeByBody (options) {
    let { list, ModelVO } = this
    let { key = 'id', parentKey = 'parentId' } = options || {}
    return function (request, response) {
      let result = []
      if (request.body) {
        let updateTime = Date.now()
        let insertRecords = [request.body]
        let insertTree = (records, parentObj) => {
          records.forEach(item => {
            let rest = Object.assign(new ModelVO(item), { [key]: idIndex++, updateTime, createTime: updateTime })
            if (parentObj) {
              rest[parentKey] = parentObj[key]
            }
            result.push(rest)
            list.push(rest)
            insertTree(item.children || [], rest)
          })
        }
        insertTree(XEUtils.toArrayTree(insertRecords, { key, parentKey }))
      }
      return result
    }
  }
  // 更新单条
  updateByBody (options) {
    let { list } = this
    let { key = 'id' } = options || {}
    return function (request, response) {
      let result = []
      if (request.body) {
        let updateTime = Date.now()
        let updateRecords = [request.body]
        updateRecords.forEach(data => {
          let item = list.find(item => item[key] === data[key])
          if (item) {
            XEUtils.destructuring(item, data, { updateTime })
            result.push(item)
          }
        })
      }
      return result
    }
  }
  // 批量保存
  saveListByBody (options) {
    let { list, ModelVO } = this
    let { key = 'id', page } = options || {}
    return function (request, response) {
      let insertRest = []
      let updateRest = []
      let removeRest = []
      if (request.body) {
        let updateTime = Date.now()
        let updateRecords = request.body[page && page.update ? page.update : 'updateRecords'] || []
        let removeRecords = request.body[page && page.remove ? page.remove : 'removeRecords'] || []
        let insertRecords = request.body[page && page.insert ? page.insert : 'insertRecords'] || []
        removeRest = XEUtils.remove(list, item => removeRecords.some(row => row[key] === item[key]))
        updateRecords.forEach(data => {
          let item = list.find(item => item[key] === data[key])
          if (item) {
            XEUtils.destructuring(item, data, { updateTime })
            updateRest.push(item)
          }
        })
        insertRecords.forEach(data => {
          let rest = Object.assign(new ModelVO(data), { [key]: idIndex++, updateTime, createTime: updateTime })
          insertRest.push(rest)
          list.push(rest)
        })
      }
      response.body = { insertRest, updateRest, removeRest }
      return response
    }
  }
  // 树结构 批量保存
  saveTreeListByBody (options) {
    let { list, ModelVO } = this
    let { key = 'id', parentKey = 'parentId', page } = options || {}
    return function (request, response) {
      let insertRest = []
      let updateRest = []
      let removeRest = []
      if (request.body) {
        let updateTime = Date.now()
        let updateRecords = request.body[page && page.update ? page.update : 'updateRecords'] || []
        let removeRecords = request.body[page && page.remove ? page.remove : 'removeRecords'] || []
        let insertRecords = request.body[page && page.insert ? page.insert : 'insertRecords'] || []
        // 删除树
        let removes = XEUtils.remove(list, item => removeRecords.some(row => row[key] === item[key]))
        removeRest = removeRest.concat(removes)
        while (removes.length) {
          removes = XEUtils.remove(list, item => removes.some(row => row[key] === item[parentKey]))
          removeRest = removeRest.concat(removes)
        }
        // 更新树
        updateRecords.forEach(data => {
          let item = list.find(item => item[key] === data[key])
          if (item) {
            XEUtils.destructuring(item, data, { updateTime })
            updateRest.push(item)
          }
        })
        // 插入树
        let insertTree = (records, parentObj) => {
          records.forEach(item => {
            let rest = Object.assign(new ModelVO(item), { [key]: idIndex++, updateTime, createTime: updateTime })
            if (parentObj) {
              rest[parentKey] = parentObj[key]
            }
            insertRest.push(rest)
            list.push(rest)
            insertTree(item.children || [], rest)
          })
        }
        insertTree(XEUtils.toArrayTree(insertRecords, { key, parentKey }))
      }
      response.body = { insertRest, updateRest, removeRest }
      return response
    }
  }
}

export default Helper
