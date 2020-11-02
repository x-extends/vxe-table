"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("xe-utils/assign"));

var _objectEach = _interopRequireDefault(require("xe-utils/objectEach"));

var _objectMap = _interopRequireDefault(require("xe-utils/objectMap"));

var _merge = _interopRequireDefault(require("xe-utils/merge"));

var _map = _interopRequireDefault(require("xe-utils/map"));

var _some = _interopRequireDefault(require("xe-utils/some"));

var _includeArrays = _interopRequireDefault(require("xe-utils/includeArrays"));

var _arrayEach = _interopRequireDefault(require("xe-utils/arrayEach"));

var _sortBy = _interopRequireDefault(require("xe-utils/sortBy"));

var _slice = _interopRequireDefault(require("xe-utils/slice"));

var _filter = _interopRequireDefault(require("xe-utils/filter"));

var _find = _interopRequireDefault(require("xe-utils/find"));

var _chunk = _interopRequireDefault(require("xe-utils/chunk"));

var _toArrayTree = _interopRequireDefault(require("xe-utils/toArrayTree"));

var _toTreeArray = _interopRequireDefault(require("xe-utils/toTreeArray"));

var _findTree = _interopRequireDefault(require("xe-utils/findTree"));

var _eachTree = _interopRequireDefault(require("xe-utils/eachTree"));

var _mapTree = _interopRequireDefault(require("xe-utils/mapTree"));

var _filterTree = _interopRequireDefault(require("xe-utils/filterTree"));

var _searchTree = _interopRequireDefault(require("xe-utils/searchTree"));

var _isArray = _interopRequireDefault(require("xe-utils/isArray"));

var _isNull = _interopRequireDefault(require("xe-utils/isNull"));

var _isUndefined = _interopRequireDefault(require("xe-utils/isUndefined"));

var _isFunction = _interopRequireDefault(require("xe-utils/isFunction"));

var _isObject = _interopRequireDefault(require("xe-utils/isObject"));

var _isString = _interopRequireDefault(require("xe-utils/isString"));

var _isPlainObject = _interopRequireDefault(require("xe-utils/isPlainObject"));

var _isDate = _interopRequireDefault(require("xe-utils/isDate"));

var _eqNull = _interopRequireDefault(require("xe-utils/eqNull"));

var _each = _interopRequireDefault(require("xe-utils/each"));

var _indexOf = _interopRequireDefault(require("xe-utils/indexOf"));

var _clone = _interopRequireDefault(require("xe-utils/clone"));

var _getSize = _interopRequireDefault(require("xe-utils/getSize"));

var _remove = _interopRequireDefault(require("xe-utils/remove"));

var _clear = _interopRequireDefault(require("xe-utils/clear"));

var _isBoolean = _interopRequireDefault(require("xe-utils/isBoolean"));

var _isNumber = _interopRequireDefault(require("xe-utils/isNumber"));

var _isRegExp = _interopRequireDefault(require("xe-utils/isRegExp"));

var _isError = _interopRequireDefault(require("xe-utils/isError"));

var _isEmpty = _interopRequireDefault(require("xe-utils/isEmpty"));

var _isEqual = _interopRequireDefault(require("xe-utils/isEqual"));

var _isEqualWith = _interopRequireDefault(require("xe-utils/isEqualWith"));

var _uniqueId = _interopRequireDefault(require("xe-utils/uniqueId"));

var _findIndexOf = _interopRequireDefault(require("xe-utils/findIndexOf"));

var _toStringJSON = _interopRequireDefault(require("xe-utils/toStringJSON"));

var _toJSONString = _interopRequireDefault(require("xe-utils/toJSONString"));

var _has = _interopRequireDefault(require("xe-utils/has"));

var _get = _interopRequireDefault(require("xe-utils/get"));

var _set = _interopRequireDefault(require("xe-utils/set"));

var _destructuring = _interopRequireDefault(require("xe-utils/destructuring"));

var _round = _interopRequireDefault(require("xe-utils/round"));

var _ceil = _interopRequireDefault(require("xe-utils/ceil"));

var _floor = _interopRequireDefault(require("xe-utils/floor"));

var _toFixed = _interopRequireDefault(require("xe-utils/toFixed"));

var _toInteger = _interopRequireDefault(require("xe-utils/toInteger"));

var _toNumber = _interopRequireDefault(require("xe-utils/toNumber"));

var _add = _interopRequireDefault(require("xe-utils/add"));

var _subtract = _interopRequireDefault(require("xe-utils/subtract"));

var _getWhatYear = _interopRequireDefault(require("xe-utils/getWhatYear"));

var _getWhatMonth = _interopRequireDefault(require("xe-utils/getWhatMonth"));

var _getWhatDay = _interopRequireDefault(require("xe-utils/getWhatDay"));

var _toStringDate = _interopRequireDefault(require("xe-utils/toStringDate"));

var _toDateString = _interopRequireDefault(require("xe-utils/toDateString"));

var _isDateSame = _interopRequireDefault(require("xe-utils/isDateSame"));

var _getWhatWeek = _interopRequireDefault(require("xe-utils/getWhatWeek"));

var _getYearWeek = _interopRequireDefault(require("xe-utils/getYearWeek"));

var _escape = _interopRequireDefault(require("xe-utils/escape"));

var _camelCase = _interopRequireDefault(require("xe-utils/camelCase"));

var _template = _interopRequireDefault(require("xe-utils/template"));

var _toString = _interopRequireDefault(require("xe-utils/toString"));

var _throttle = _interopRequireDefault(require("xe-utils/throttle"));

var _debounce = _interopRequireDefault(require("xe-utils/debounce"));

var _browse = _interopRequireDefault(require("xe-utils/browse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 按需加载依赖
// object
// import lastObjectEach from 'xe-utils/lastObjectEach'
// array
// import every from 'xe-utils/every'
// import lastArrayEach from 'xe-utils/lastArrayEach'
// import uniq from 'xe-utils/uniq'
// import union from 'xe-utils/union'
// import toArray from 'xe-utils/toArray'
// import shuffle from 'xe-utils/shuffle'
// import sample from 'xe-utils/sample'
// import findKey from 'xe-utils/findKey'
// import includes from 'xe-utils/includes'
// import reduce from 'xe-utils/reduce'
// import copyWithin from 'xe-utils/copyWithin'
// import zip from 'xe-utils/zip'
// import unzip from 'xe-utils/unzip'
// import zipObject from 'xe-utils/zipObject'
// import pluck from 'xe-utils/pluck'
// import invoke from 'xe-utils/invoke'
// import arrayIndexOf from 'xe-utils/arrayIndexOf'
// import arrayLastIndexOf from 'xe-utils/arrayLastIndexOf'
// base
// import hasOwnProp from 'xe-utils/hasOwnProp'
// import isNumberNaN from 'xe-utils/isNaN'
// import isLeapYear from 'xe-utils/isLeapYear'
// import forOf from 'xe-utils/forOf'
// import lastForOf from 'xe-utils/lastForOf'
// import lastIndexOf from 'xe-utils/lastIndexOf'
// import keys from 'xe-utils/keys'
// import values from 'xe-utils/values'
// import lastEach from 'xe-utils/lastEach'
// import isNumberFinite from 'xe-utils/isFinite'
// import isFloat from 'xe-utils/isFloat'
// import isInteger from 'xe-utils/isInteger'
// import isTypeError from 'xe-utils/isTypeError'
// import isSymbol from 'xe-utils/isSymbol'
// import isArguments from 'xe-utils/isArguments'
// import isElement from 'xe-utils/isElement'
// import isDocument from 'xe-utils/isDocument'
// import isWindow from 'xe-utils/isWindow'
// import isFormData from 'xe-utils/isFormData'
// import isMap from 'xe-utils/isMap'
// import isWeakMap from 'xe-utils/isWeakMap'
// import isSet from 'xe-utils/isSet'
// import isWeakSet from 'xe-utils/isWeakSet'
// import isMatch from 'xe-utils/isMatch'
// import getType from 'xe-utils/getType'
// import findLastIndexOf from 'xe-utils/findLastIndexOf'
// import entries from 'xe-utils/entries'
// import pick from 'xe-utils/pick'
// import omit from 'xe-utils/omit'
// import first from 'xe-utils/first'
// import last from 'xe-utils/last'
// import groupBy from 'xe-utils/groupBy'
// import countBy from 'xe-utils/countBy'
// import range from 'xe-utils/range'
// number
// import random from 'xe-utils/random'
// import max from 'xe-utils/max'
// import min from 'xe-utils/min'
// import commafy from 'xe-utils/commafy'
// import multiply from 'xe-utils/multiply'
// import divide from 'xe-utils/divide'
// import sum from 'xe-utils/sum'
// import mean from 'xe-utils/mean'
// date
// import now from 'xe-utils/now'
// import timestamp from 'xe-utils/timestamp'
// import getYearDay from 'xe-utils/getYearDay'
// import getMonthWeek from 'xe-utils/getMonthWeek'
// import getDayOfYear from 'xe-utils/getDayOfYear'
// import getDayOfMonth from 'xe-utils/getDayOfMonth'
// import getDateDiff from 'xe-utils/getDateDiff'
// string
// import padEnd from 'xe-utils/padEnd'
// import padStart from 'xe-utils/padStart'
// import repeat from 'xe-utils/repeat'
// import trim from 'xe-utils/trim'
// import trimRight from 'xe-utils/trimRight'
// import trimLeft from 'xe-utils/trimLeft'
// import unescape from 'xe-utils/unescape'
// import kebabCase from 'xe-utils/kebabCase'
// import startsWith from 'xe-utils/startsWith'
// import endsWith from 'xe-utils/endsWith'
// function
// import property from 'xe-utils/property'
// import bind from 'xe-utils/bind'
// import once from 'xe-utils/once'
// import after from 'xe-utils/after'
// import before from 'xe-utils/before'
// import delay from 'xe-utils/delay'
// url
// import unserialize from 'xe-utils/unserialize'
// import serialize from 'xe-utils/serialize'
// import parseUrl from 'xe-utils/parseUrl'
// browse
// import getBaseURL from 'xe-utils/getBaseURL'
// import locat from 'xe-utils/locat'
// import cookie from 'xe-utils/cookie'
var _default = {
  // object
  assign: _assign.default,
  objectEach: _objectEach.default,
  // lastObjectEach,
  objectMap: _objectMap.default,
  merge: _merge.default,
  // array
  map: _map.default,
  some: _some.default,
  // every,
  includeArrays: _includeArrays.default,
  arrayEach: _arrayEach.default,
  // lastArrayEach,
  // uniq,
  // union,
  // toArray,
  sortBy: _sortBy.default,
  // shuffle,
  // sample,
  slice: _slice.default,
  filter: _filter.default,
  // findKey,
  // includes,
  find: _find.default,
  // sum,
  // mean,
  // reduce,
  // copyWithin,
  chunk: _chunk.default,
  // zip,
  // unzip,
  // zipObject,
  // pluck,
  // invoke,
  toArrayTree: _toArrayTree.default,
  toTreeArray: _toTreeArray.default,
  findTree: _findTree.default,
  eachTree: _eachTree.default,
  mapTree: _mapTree.default,
  filterTree: _filterTree.default,
  searchTree: _searchTree.default,
  // arrayIndexOf,
  // arrayLastIndexOf,
  // base
  // hasOwnProp,
  isArray: _isArray.default,
  isNull: _isNull.default,
  // isNaN: isNumberNaN,
  isUndefined: _isUndefined.default,
  isFunction: _isFunction.default,
  isObject: _isObject.default,
  isString: _isString.default,
  isPlainObject: _isPlainObject.default,
  // isLeapYear,
  isDate: _isDate.default,
  eqNull: _eqNull.default,
  each: _each.default,
  // forOf,
  // lastForOf,
  indexOf: _indexOf.default,
  // lastIndexOf,
  // keys,
  // values,
  clone: _clone.default,
  getSize: _getSize.default,
  // lastEach,
  remove: _remove.default,
  clear: _clear.default,
  // isFinite: isNumberFinite,
  // isFloat,
  // isInteger,
  isBoolean: _isBoolean.default,
  isNumber: _isNumber.default,
  isRegExp: _isRegExp.default,
  isError: _isError.default,
  // isTypeError,
  isEmpty: _isEmpty.default,
  // isSymbol,
  // isArguments,
  // isElement,
  // isDocument,
  // isWindow,
  // isFormData,
  // isMap,
  // isWeakMap,
  // isSet,
  // isWeakSet,
  // isMatch,
  isEqual: _isEqual.default,
  isEqualWith: _isEqualWith.default,
  // getType,
  uniqueId: _uniqueId.default,
  findIndexOf: _findIndexOf.default,
  // findLastIndexOf,
  toStringJSON: _toStringJSON.default,
  toJSONString: _toJSONString.default,
  // entries,
  // pick,
  // omit,
  // first,
  // last,
  has: _has.default,
  get: _get.default,
  set: _set.default,
  // groupBy,
  // countBy,
  // range,
  destructuring: _destructuring.default,
  // number
  // random,
  // max,
  // min,
  // commafy,
  round: _round.default,
  ceil: _ceil.default,
  floor: _floor.default,
  toFixed: _toFixed.default,
  toInteger: _toInteger.default,
  toNumber: _toNumber.default,
  add: _add.default,
  subtract: _subtract.default,
  // multiply,
  // divide,
  // date
  getWhatYear: _getWhatYear.default,
  getWhatMonth: _getWhatMonth.default,
  getWhatDay: _getWhatDay.default,
  toStringDate: _toStringDate.default,
  toDateString: _toDateString.default,
  // now,
  // timestamp,
  isDateSame: _isDateSame.default,
  getWhatWeek: _getWhatWeek.default,
  // getYearDay,
  getYearWeek: _getYearWeek.default,
  // getMonthWeek,
  // getDayOfYear,
  // getDayOfMonth,
  // getDateDiff,
  // string
  // padEnd,
  // padStart,
  // repeat,
  // trim,
  // trimRight,
  // trimLeft,
  escape: _escape.default,
  // unescape,
  camelCase: _camelCase.default,
  // kebabCase,
  // startsWith,
  // endsWith,
  template: _template.default,
  toString: _toString.default,
  // function
  // property,
  // bind,
  // once,
  // after,
  // before,
  throttle: _throttle.default,
  debounce: _debounce.default,
  // delay,
  // url
  // unserialize,
  // serialize,
  // parseUrl,
  // browse
  // getBaseURL,
  // locat,
  // cookie,
  browse: _browse.default
};
exports.default = _default;