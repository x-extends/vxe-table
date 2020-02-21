import XEUtils from 'xe-utils/methods/xe-utils'
import { template } from 'xe-ajax-mock'

let idIndex = 100000

// Mock 辅助函数
class Helper {
  constructor (data, ModelVO) {
    this.list = template(data)
    this.ModelVO = ModelVO
  }

  // 获取最新数据、支持排序
  findList (options) {
    const { list } = this
    const { sort = ['updateTime'], order = 'desc', max } = options || {}
    return function (request) {
      let rest = list
      const params = request.params
      let sortProp = sort
      let orderPrpo = order
      if (params) {
        const filterProps = XEUtils.keys(params).filter(key => !['sort', 'order'].includes(key) && params[key])
        if (filterProps) {
          rest = rest.filter(data => filterProps.every(key => XEUtils.toString(data[key]).indexOf(params[key]) > -1))
        }
        if (params.order) {
          orderPrpo = params.order
        }
        if (params.sort) {
          sortProp = params.sort.split(',')
        }
      }
      rest = XEUtils.sortBy(rest, sortProp)
      if (orderPrpo === 'desc') {
        rest = rest.reverse()
      }
      return max ? rest.slice(0, max) : rest
    }
  }

  findAllList (options) {
    const { list } = this
    const { sort = ['updateTime'], order = 'desc' } = options || {}
    return function (request) {
      let rest = list
      const params = request.params
      let sortProp = sort
      let orderPrpo = order
      if (params) {
        const filterProps = XEUtils.keys(params).filter(key => !['sort', 'order'].includes(key) && params[key])
        if (filterProps) {
          rest = rest.filter(data => filterProps.every(key => XEUtils.toString(data[key]).indexOf(params[key]) > -1))
        }
        if (params.order) {
          orderPrpo = params.order
        }
        if (params.sort) {
          sortProp = params.sort.split(',')
        }
      }
      rest = XEUtils.sortBy(rest, sortProp)
      if (orderPrpo === 'desc') {
        rest = rest.reverse()
      }
      return rest
    }
  }

  // 树形结构 获取节点数据、支持排序
  findTreeNodeList (options) {
    const { list } = this
    const { sort = ['updateTime'], order = 'desc', key = 'id', parentKey = 'parentId', max } = options || {}
    return function (request) {
      let rest = list
      const params = request.params
      let sortProp = sort
      let orderPrpo = order
      if (params) {
        const filterProps = XEUtils.keys(params).filter(key => !['sort', 'order', parentKey, key].includes(key) && params[key])
        if (filterProps) {
          rest = rest.filter(data => filterProps.every(key => XEUtils.toString(data[key]).indexOf(params[key]) > -1))
        }
        if (params.order) {
          orderPrpo = params.order
        }
        if (params.sort) {
          sortProp = params.sort.split(',')
        }
      }
      rest = XEUtils.toArrayTree(rest, { key, parentKey, sortKey: sortProp })
      if (params) {
        if (params[key]) {
          const matchObj = XEUtils.findTree(rest, item => '' + item[key] === '' + params[key], { key, parentKey })
          rest = matchObj ? matchObj.item.children : []
        }
        if (params[parentKey]) {
          const matchObj = XEUtils.findTree(rest, item => '' + item[key] === '' + params[parentKey], { key, parentKey })
          rest = matchObj ? matchObj.item.children : []
        }
      }
      rest = rest.map(item => {
        if (item.children && item.children.length) {
          item.hasChild = true
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
    const { list } = this
    const { sort = ['updateTime'], order = 'desc', page } = options || {}
    return function (request, response, { pathVariable }) {
      let pageSize = 10
      let currentPage = 1
      let rest = list
      const params = request.params
      let sortProp = sort
      let orderPrpo = order
      if (params) {
        const filterProps = XEUtils.keys(params).filter(key => !['sort', 'order'].includes(key) && params[key])
        if (filterProps) {
          rest = rest.filter(data => filterProps.every(key => XEUtils.toString(data[key]).indexOf(params[key]) > -1))
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
      const totalResult = rest.length
      rest = XEUtils.sortBy(rest, sortProp)
      if (orderPrpo === 'desc') {
        rest = rest.reverse()
      }
      response.body = {
        page: { pageSize, currentPage, totalResult, total: totalResult },
        result: rest.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      }
      return response
    }
  }

  // 删除单条
  deleteByPathVariable (options) {
    const { list } = this
    const { key = 'id' } = options || {}
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
    const { list } = this
    const { key = 'id', parentKey = 'parentId' } = options || {}
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
    const { list, ModelVO } = this
    const { key = 'id' } = options || {}
    return function (request) {
      const result = []
      if (request.body) {
        const updateTime = Date.now()
        const insertRecords = [request.body]
        insertRecords.forEach(data => {
          const rest = Object.assign(new ModelVO(data), { [key]: idIndex++, updateTime, createTime: updateTime })
          result.push(rest)
          list.push(rest)
        })
      }
      return result
    }
  }

  // 树结构 插入单条
  insertTreeByBody (options) {
    const { list, ModelVO } = this
    const { key = 'id', parentKey = 'parentId' } = options || {}
    return function (request) {
      const result = []
      if (request.body) {
        const updateTime = Date.now()
        const insertRecords = [request.body]
        const insertTree = (records, parentObj) => {
          records.forEach(item => {
            const rest = Object.assign(new ModelVO(item), { [key]: idIndex++, updateTime, createTime: updateTime })
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
    const { list } = this
    const { key = 'id' } = options || {}
    return function (request) {
      const result = []
      if (request.body) {
        const updateTime = Date.now()
        const updateRecords = [request.body]
        updateRecords.forEach(data => {
          const item = list.find(item => item[key] === data[key])
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
    const { list, ModelVO } = this
    const { key = 'id', page } = options || {}
    return function (request, response) {
      const insertRest = []
      const updateRest = []
      let removeRest = []
      if (request.body) {
        const updateTime = Date.now()
        const updateRecords = request.body[page && page.update ? page.update : 'updateRecords'] || []
        let removeRecords = request.body[page && page.remove ? page.remove : 'removeRecords'] || []
        const pendingRecords = request.body[page && page.remove ? page.remove : 'pendingRecords'] || []
        const insertRecords = request.body[page && page.insert ? page.insert : 'insertRecords'] || []
        updateRecords.forEach(data => {
          const item = list.find(item => item[key] === data[key])
          if (item) {
            XEUtils.destructuring(item, data, { updateTime })
            updateRest.push(item)
          }
        })
        insertRecords.forEach(data => {
          const rest = Object.assign(new ModelVO(data), { [key]: idIndex++, updateTime, createTime: updateTime })
          insertRest.push(rest)
          list.push(rest)
        })
        removeRecords = removeRecords.concat(pendingRecords)
        removeRest = XEUtils.remove(list, item => removeRecords.some(row => row[key] === item[key]))
      }
      response.body = { insertRest, updateRest, removeRest }
      return response
    }
  }

  // 树结构 批量保存
  saveTreeListByBody (options) {
    const { list, ModelVO } = this
    const { key = 'id', parentKey = 'parentId', page } = options || {}
    return function (request, response) {
      const insertRest = []
      const updateRest = []
      let removeRest = []
      if (request.body) {
        const updateTime = Date.now()
        const updateRecords = request.body[page && page.update ? page.update : 'updateRecords'] || []
        let removeRecords = request.body[page && page.remove ? page.remove : 'removeRecords'] || []
        const pendingRecords = request.body[page && page.remove ? page.remove : 'pendingRecords'] || []
        const insertRecords = request.body[page && page.insert ? page.insert : 'insertRecords'] || []
        // 更新树
        updateRecords.forEach(data => {
          const item = list.find(item => item[key] === data[key])
          if (item) {
            XEUtils.destructuring(item, data, { updateTime })
            updateRest.push(item)
          }
        })
        // 插入树
        const insertTree = (records, parentObj) => {
          records.forEach(item => {
            const rest = Object.assign(new ModelVO(item), { [key]: idIndex++, updateTime, createTime: updateTime })
            if (parentObj) {
              rest[parentKey] = parentObj[key]
            }
            insertRest.push(rest)
            list.push(rest)
            insertTree(item.children || [], rest)
          })
        }
        insertTree(XEUtils.toArrayTree(insertRecords, { key, parentKey }))
        // 删除树
        removeRecords = removeRecords.concat(pendingRecords)
        let removes = XEUtils.remove(list, item => removeRecords.some(row => row[key] === item[key]))
        removeRest = removeRest.concat(removes)
        while (removes.length) {
          removes = XEUtils.remove(list, item => removes.some(row => row[key] === item[parentKey]))
          removeRest = removeRest.concat(removes)
        }
      }
      response.body = { insertRest, updateRest, removeRest }
      return response
    }
  }
}

export default Helper
