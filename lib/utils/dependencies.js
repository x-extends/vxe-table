"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("xe-utils/methods/object/assign"));

var _objectEach = _interopRequireDefault(require("xe-utils/methods/object/objectEach"));

var _objectMap = _interopRequireDefault(require("xe-utils/methods/object/objectMap"));

var _map = _interopRequireDefault(require("xe-utils/methods/array/map"));

var _includeArrays = _interopRequireDefault(require("xe-utils/methods/array/includeArrays"));

var _arrayEach = _interopRequireDefault(require("xe-utils/methods/array/arrayEach"));

var _sortBy = _interopRequireDefault(require("xe-utils/methods/array/sortBy"));

var _slice = _interopRequireDefault(require("xe-utils/methods/array/slice"));

var _find = _interopRequireDefault(require("xe-utils/methods/array/find"));

var _toArrayTree = _interopRequireDefault(require("xe-utils/methods/array/toArrayTree"));

var _toTreeArray = _interopRequireDefault(require("xe-utils/methods/array/toTreeArray"));

var _findTree = _interopRequireDefault(require("xe-utils/methods/array/findTree"));

var _eachTree = _interopRequireDefault(require("xe-utils/methods/array/eachTree"));

var _mapTree = _interopRequireDefault(require("xe-utils/methods/array/mapTree"));

var _filterTree = _interopRequireDefault(require("xe-utils/methods/array/filterTree"));

var _searchTree = _interopRequireDefault(require("xe-utils/methods/array/searchTree"));

var _isArray = _interopRequireDefault(require("xe-utils/methods/base/isArray"));

var _isNull = _interopRequireDefault(require("xe-utils/methods/base/isNull"));

var _isUndefined = _interopRequireDefault(require("xe-utils/methods/base/isUndefined"));

var _isFunction = _interopRequireDefault(require("xe-utils/methods/base/isFunction"));

var _isObject = _interopRequireDefault(require("xe-utils/methods/base/isObject"));

var _isString = _interopRequireDefault(require("xe-utils/methods/base/isString"));

var _isPlainObject = _interopRequireDefault(require("xe-utils/methods/base/isPlainObject"));

var _eqNull = _interopRequireDefault(require("xe-utils/methods/base/eqNull"));

var _each = _interopRequireDefault(require("xe-utils/methods/base/each"));

var _indexOf = _interopRequireDefault(require("xe-utils/methods/base/indexOf"));

var _clone = _interopRequireDefault(require("xe-utils/methods/base/clone"));

var _getSize = _interopRequireDefault(require("xe-utils/methods/base/getSize"));

var _remove = _interopRequireDefault(require("xe-utils/methods/base/remove"));

var _clear = _interopRequireDefault(require("xe-utils/methods/base/clear"));

var _isBoolean = _interopRequireDefault(require("xe-utils/methods/base/isBoolean"));

var _isNumber = _interopRequireDefault(require("xe-utils/methods/base/isNumber"));

var _isRegExp = _interopRequireDefault(require("xe-utils/methods/base/isRegExp"));

var _isError = _interopRequireDefault(require("xe-utils/methods/base/isError"));

var _isEmpty = _interopRequireDefault(require("xe-utils/methods/base/isEmpty"));

var _isEqual = _interopRequireDefault(require("xe-utils/methods/base/isEqual"));

var _isEqualWith = _interopRequireDefault(require("xe-utils/methods/base/isEqualWith"));

var _uniqueId = _interopRequireDefault(require("xe-utils/methods/base/uniqueId"));

var _findIndexOf = _interopRequireDefault(require("xe-utils/methods/base/findIndexOf"));

var _toStringJSON = _interopRequireDefault(require("xe-utils/methods/base/toStringJSON"));

var _toJSONString = _interopRequireDefault(require("xe-utils/methods/base/toJSONString"));

var _has = _interopRequireDefault(require("xe-utils/methods/base/has"));

var _get = _interopRequireDefault(require("xe-utils/methods/base/get"));

var _set = _interopRequireDefault(require("xe-utils/methods/base/set"));

var _destructuring = _interopRequireDefault(require("xe-utils/methods/base/destructuring"));

var _toNumber = _interopRequireDefault(require("xe-utils/methods/number/toNumber"));

var _toStringDate = _interopRequireDefault(require("xe-utils/methods/date/toStringDate"));

var _toDateString = _interopRequireDefault(require("xe-utils/methods/date/toDateString"));

var _escape = _interopRequireDefault(require("xe-utils/methods/string/escape"));

var _camelCase = _interopRequireDefault(require("xe-utils/methods/string/camelCase"));

var _template = _interopRequireDefault(require("xe-utils/methods/string/template"));

var _toString = _interopRequireDefault(require("xe-utils/methods/string/toString"));

var _throttle = _interopRequireDefault(require("xe-utils/methods/function/throttle"));

var _debounce = _interopRequireDefault(require("xe-utils/methods/function/debounce"));

var _browse = _interopRequireDefault(require("xe-utils/methods/browse/browse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 按需加载依赖
// object
// import lastObjectEach from 'xe-utils/methods/object/lastObjectEach'
// array
// import some from 'xe-utils/methods/array/some'
// import every from 'xe-utils/methods/array/every'
// import lastArrayEach from 'xe-utils/methods/array/lastArrayEach'
// import uniq from 'xe-utils/methods/array/uniq'
// import union from 'xe-utils/methods/array/union'
// import toArray from 'xe-utils/methods/array/toArray'
// import shuffle from 'xe-utils/methods/array/shuffle'
// import sample from 'xe-utils/methods/array/sample'
// import filter from 'xe-utils/methods/array/filter'
// import findKey from 'xe-utils/methods/array/findKey'
// import includes from 'xe-utils/methods/array/includes'
// import sum from 'xe-utils/methods/array/sum'
// import mean from 'xe-utils/methods/array/mean'
// import reduce from 'xe-utils/methods/array/reduce'
// import copyWithin from 'xe-utils/methods/array/copyWithin'
// import chunk from 'xe-utils/methods/array/chunk'
// import zip from 'xe-utils/methods/array/zip'
// import unzip from 'xe-utils/methods/array/unzip'
// import zipObject from 'xe-utils/methods/array/zipObject'
// import pluck from 'xe-utils/methods/array/pluck'
// import invoke from 'xe-utils/methods/array/invoke'
// import arrayIndexOf from 'xe-utils/methods/array/arrayIndexOf'
// import arrayLastIndexOf from 'xe-utils/methods/array/arrayLastIndexOf'
// base
// import hasOwnProp from 'xe-utils/methods/base/hasOwnProp'
// import isNumberNaN from 'xe-utils/methods/base/isNaN'
// import isLeapYear from 'xe-utils/methods/base/isLeapYear'
// import isDate from 'xe-utils/methods/base/isDate'
// import forOf from 'xe-utils/methods/base/forOf'
// import lastForOf from 'xe-utils/methods/base/lastForOf'
// import lastIndexOf from 'xe-utils/methods/base/lastIndexOf'
// import keys from 'xe-utils/methods/base/keys'
// import values from 'xe-utils/methods/base/values'
// import lastEach from 'xe-utils/methods/base/lastEach'
// import isNumberFinite from 'xe-utils/methods/base/isFinite'
// import isFloat from 'xe-utils/methods/base/isFloat'
// import isInteger from 'xe-utils/methods/base/isInteger'
// import isTypeError from 'xe-utils/methods/base/isTypeError'
// import isSymbol from 'xe-utils/methods/base/isSymbol'
// import isArguments from 'xe-utils/methods/base/isArguments'
// import isElement from 'xe-utils/methods/base/isElement'
// import isDocument from 'xe-utils/methods/base/isDocument'
// import isWindow from 'xe-utils/methods/base/isWindow'
// import isFormData from 'xe-utils/methods/base/isFormData'
// import isMap from 'xe-utils/methods/base/isMap'
// import isWeakMap from 'xe-utils/methods/base/isWeakMap'
// import isSet from 'xe-utils/methods/base/isSet'
// import isWeakSet from 'xe-utils/methods/base/isWeakSet'
// import isMatch from 'xe-utils/methods/base/isMatch'
// import getType from 'xe-utils/methods/base/getType'
// import findLastIndexOf from 'xe-utils/methods/base/findLastIndexOf'
// import entries from 'xe-utils/methods/base/entries'
// import pick from 'xe-utils/methods/base/pick'
// import omit from 'xe-utils/methods/base/omit'
// import first from 'xe-utils/methods/base/first'
// import last from 'xe-utils/methods/base/last'
// import groupBy from 'xe-utils/methods/base/groupBy'
// import countBy from 'xe-utils/methods/base/countBy'
// import range from 'xe-utils/methods/base/range'
// number
// import random from 'xe-utils/methods/number/random'
// import max from 'xe-utils/methods/number/max'
// import min from 'xe-utils/methods/number/min'
// import commafy from 'xe-utils/methods/number/commafy'
// import toFixedString from 'xe-utils/methods/number/toFixedString'
// import toFixedNumber from 'xe-utils/methods/number/toFixedNumber'
// import toInteger from 'xe-utils/methods/number/toInteger'
// date
// import getWhatYear from 'xe-utils/methods/date/getWhatYear'
// import getWhatMonth from 'xe-utils/methods/date/getWhatMonth'
// import getWhatDay from 'xe-utils/methods/date/getWhatDay'
// import now from 'xe-utils/methods/date/now'
// import timestamp from 'xe-utils/methods/date/timestamp'
// import isDateSame from 'xe-utils/methods/date/isDateSame'
// import getWhatWeek from 'xe-utils/methods/date/getWhatWeek'
// import getYearDay from 'xe-utils/methods/date/getYearDay'
// import getYearWeek from 'xe-utils/methods/date/getYearWeek'
// import getMonthWeek from 'xe-utils/methods/date/getMonthWeek'
// import getDayOfYear from 'xe-utils/methods/date/getDayOfYear'
// import getDayOfMonth from 'xe-utils/methods/date/getDayOfMonth'
// import getDateDiff from 'xe-utils/methods/date/getDateDiff'
// string
// import padEnd from 'xe-utils/methods/string/padEnd'
// import padStart from 'xe-utils/methods/string/padStart'
// import repeat from 'xe-utils/methods/string/repeat'
// import trim from 'xe-utils/methods/string/trim'
// import trimRight from 'xe-utils/methods/string/trimRight'
// import trimLeft from 'xe-utils/methods/string/trimLeft'
// import unescape from 'xe-utils/methods/string/unescape'
// import kebabCase from 'xe-utils/methods/string/kebabCase'
// import startsWith from 'xe-utils/methods/string/startsWith'
// import endsWith from 'xe-utils/methods/string/endsWith'
// function
// import property from 'xe-utils/methods/function/property'
// import bind from 'xe-utils/methods/function/bind'
// import once from 'xe-utils/methods/function/once'
// import after from 'xe-utils/methods/function/after'
// import before from 'xe-utils/methods/function/before'
// import delay from 'xe-utils/methods/function/delay'
// url
// import unserialize from 'xe-utils/methods/url/unserialize'
// import serialize from 'xe-utils/methods/url/serialize'
// import parseUrl from 'xe-utils/methods/url/parseUrl'
// browse
// import getBaseURL from 'xe-utils/methods/browse/getBaseURL'
// import locat from 'xe-utils/methods/browse/locat'
// import cookie from 'xe-utils/methods/browse/cookie'
var _default = {
  // object
  assign: _assign.default,
  objectEach: _objectEach.default,
  // lastObjectEach,
  objectMap: _objectMap.default,
  // array
  map: _map.default,
  // some,
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
  // filter,
  // findKey,
  // includes,
  find: _find.default,
  // sum,
  // mean,
  // reduce,
  // copyWithin,
  // chunk,
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
  // isDate,
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
  // toFixedString,
  // toFixedNumber,
  // toInteger,
  toNumber: _toNumber.default,
  // date
  // getWhatYear,
  // getWhatMonth,
  // getWhatDay,
  toStringDate: _toStringDate.default,
  toDateString: _toDateString.default,
  // now,
  // timestamp,
  // isDateSame,
  // getWhatWeek,
  // getYearDay,
  // getYearWeek,
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