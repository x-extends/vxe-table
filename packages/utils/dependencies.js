// 按需加载依赖

// object
import assign from 'xe-utils/methods/object/assign'
import objectEach from 'xe-utils/methods/object/objectEach'
// import lastObjectEach from 'xe-utils/methods/object/lastObjectEach'
import objectMap from 'xe-utils/methods/object/objectMap'

// array
import map from 'xe-utils/methods/array/map'
import some from 'xe-utils/methods/array/some'
// import every from 'xe-utils/methods/array/every'
import includeArrays from 'xe-utils/methods/array/includeArrays'
import arrayEach from 'xe-utils/methods/array/arrayEach'
// import lastArrayEach from 'xe-utils/methods/array/lastArrayEach'
// import uniq from 'xe-utils/methods/array/uniq'
// import union from 'xe-utils/methods/array/union'
// import toArray from 'xe-utils/methods/array/toArray'
import sortBy from 'xe-utils/methods/array/sortBy'
// import shuffle from 'xe-utils/methods/array/shuffle'
// import sample from 'xe-utils/methods/array/sample'
import slice from 'xe-utils/methods/array/slice'
import filter from 'xe-utils/methods/array/filter'
// import findKey from 'xe-utils/methods/array/findKey'
// import includes from 'xe-utils/methods/array/includes'
import find from 'xe-utils/methods/array/find'
import findLast from 'xe-utils/methods/array/findLast'
// import reduce from 'xe-utils/methods/array/reduce'
// import copyWithin from 'xe-utils/methods/array/copyWithin'
import chunk from 'xe-utils/methods/array/chunk'
// import zip from 'xe-utils/methods/array/zip'
// import unzip from 'xe-utils/methods/array/unzip'
// import zipObject from 'xe-utils/methods/array/zipObject'
// import pluck from 'xe-utils/methods/array/pluck'
// import invoke from 'xe-utils/methods/array/invoke'
import toArrayTree from 'xe-utils/methods/array/toArrayTree'
import toTreeArray from 'xe-utils/methods/array/toTreeArray'
import findTree from 'xe-utils/methods/array/findTree'
import eachTree from 'xe-utils/methods/array/eachTree'
import mapTree from 'xe-utils/methods/array/mapTree'
import filterTree from 'xe-utils/methods/array/filterTree'
import searchTree from 'xe-utils/methods/array/searchTree'
// import arrayIndexOf from 'xe-utils/methods/array/arrayIndexOf'
// import arrayLastIndexOf from 'xe-utils/methods/array/arrayLastIndexOf'

// base
// import hasOwnProp from 'xe-utils/methods/base/hasOwnProp'
import isArray from 'xe-utils/methods/base/isArray'
import isNull from 'xe-utils/methods/base/isNull'
// import isNumberNaN from 'xe-utils/methods/base/isNaN'
import isUndefined from 'xe-utils/methods/base/isUndefined'
import isFunction from 'xe-utils/methods/base/isFunction'
import isObject from 'xe-utils/methods/base/isObject'
import isString from 'xe-utils/methods/base/isString'
import isPlainObject from 'xe-utils/methods/base/isPlainObject'
// import isLeapYear from 'xe-utils/methods/base/isLeapYear'
import isDate from 'xe-utils/methods/base/isDate'
import eqNull from 'xe-utils/methods/base/eqNull'
import each from 'xe-utils/methods/base/each'
// import forOf from 'xe-utils/methods/base/forOf'
// import lastForOf from 'xe-utils/methods/base/lastForOf'
import indexOf from 'xe-utils/methods/base/indexOf'
// import lastIndexOf from 'xe-utils/methods/base/lastIndexOf'
// import keys from 'xe-utils/methods/base/keys'
// import values from 'xe-utils/methods/base/values'
import clone from 'xe-utils/methods/base/clone'
import getSize from 'xe-utils/methods/base/getSize'
// import lastEach from 'xe-utils/methods/base/lastEach'
import remove from 'xe-utils/methods/base/remove'
import clear from 'xe-utils/methods/base/clear'
// import isNumberFinite from 'xe-utils/methods/base/isFinite'
// import isFloat from 'xe-utils/methods/base/isFloat'
// import isInteger from 'xe-utils/methods/base/isInteger'
import isBoolean from 'xe-utils/methods/base/isBoolean'
import isNumber from 'xe-utils/methods/base/isNumber'
import isRegExp from 'xe-utils/methods/base/isRegExp'
import isError from 'xe-utils/methods/base/isError'
// import isTypeError from 'xe-utils/methods/base/isTypeError'
import isEmpty from 'xe-utils/methods/base/isEmpty'
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
import isEqual from 'xe-utils/methods/base/isEqual'
import isEqualWith from 'xe-utils/methods/base/isEqualWith'
// import getType from 'xe-utils/methods/base/getType'
import uniqueId from 'xe-utils/methods/base/uniqueId'
import findIndexOf from 'xe-utils/methods/base/findIndexOf'
// import findLastIndexOf from 'xe-utils/methods/base/findLastIndexOf'
import toStringJSON from 'xe-utils/methods/base/toStringJSON'
import toJSONString from 'xe-utils/methods/base/toJSONString'
// import entries from 'xe-utils/methods/base/entries'
// import pick from 'xe-utils/methods/base/pick'
// import omit from 'xe-utils/methods/base/omit'
// import first from 'xe-utils/methods/base/first'
// import last from 'xe-utils/methods/base/last'
import has from 'xe-utils/methods/base/has'
import get from 'xe-utils/methods/base/get'
import set from 'xe-utils/methods/base/set'
// import groupBy from 'xe-utils/methods/base/groupBy'
// import countBy from 'xe-utils/methods/base/countBy'
// import range from 'xe-utils/methods/base/range'
import destructuring from 'xe-utils/methods/base/destructuring'

// number
// import random from 'xe-utils/methods/number/random'
// import max from 'xe-utils/methods/number/max'
// import min from 'xe-utils/methods/number/min'
// import commafy from 'xe-utils/methods/number/commafy'
import round from 'xe-utils/methods/number/round'
import ceil from 'xe-utils/methods/number/ceil'
import floor from 'xe-utils/methods/number/floor'
import toFixed from 'xe-utils/methods/number/toFixed'
import toFixedString from 'xe-utils/methods/number/toFixedString'
import toFixedNumber from 'xe-utils/methods/number/toFixedNumber'
import toInteger from 'xe-utils/methods/number/toInteger'
import toNumber from 'xe-utils/methods/number/toNumber'
import add from 'xe-utils/methods/number/add'
import subtract from 'xe-utils/methods/number/subtract'
// import multiply from 'xe-utils/methods/number/multiply'
// import divide from 'xe-utils/methods/number/divide'
// import sum from 'xe-utils/methods/number/sum'
// import mean from 'xe-utils/methods/number/mean'

// date
import getWhatYear from 'xe-utils/methods/date/getWhatYear'
import getWhatMonth from 'xe-utils/methods/date/getWhatMonth'
import getWhatDay from 'xe-utils/methods/date/getWhatDay'
import toStringDate from 'xe-utils/methods/date/toStringDate'
import toDateString from 'xe-utils/methods/date/toDateString'
// import now from 'xe-utils/methods/date/now'
// import timestamp from 'xe-utils/methods/date/timestamp'
import isDateSame from 'xe-utils/methods/date/isDateSame'
import getWhatWeek from 'xe-utils/methods/date/getWhatWeek'
// import getYearDay from 'xe-utils/methods/date/getYearDay'
import getYearWeek from 'xe-utils/methods/date/getYearWeek'
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
import escape from 'xe-utils/methods/string/escape'
// import unescape from 'xe-utils/methods/string/unescape'
import camelCase from 'xe-utils/methods/string/camelCase'
// import kebabCase from 'xe-utils/methods/string/kebabCase'
// import startsWith from 'xe-utils/methods/string/startsWith'
// import endsWith from 'xe-utils/methods/string/endsWith'
import template from 'xe-utils/methods/string/template'
import toValString from 'xe-utils/methods/string/toString'

// function
// import property from 'xe-utils/methods/function/property'
// import bind from 'xe-utils/methods/function/bind'
// import once from 'xe-utils/methods/function/once'
// import after from 'xe-utils/methods/function/after'
// import before from 'xe-utils/methods/function/before'
import throttle from 'xe-utils/methods/function/throttle'
import debounce from 'xe-utils/methods/function/debounce'
// import delay from 'xe-utils/methods/function/delay'

// url
// import unserialize from 'xe-utils/methods/url/unserialize'
// import serialize from 'xe-utils/methods/url/serialize'
// import parseUrl from 'xe-utils/methods/url/parseUrl'

// browse
// import getBaseURL from 'xe-utils/methods/browse/getBaseURL'
// import locat from 'xe-utils/methods/browse/locat'
// import cookie from 'xe-utils/methods/browse/cookie'
import browse from 'xe-utils/methods/browse/browse'

export default {
  // object
  assign,
  objectEach,
  // lastObjectEach,
  objectMap,

  // array
  map,
  some,
  // every,
  includeArrays,
  arrayEach,
  // lastArrayEach,
  // uniq,
  // union,
  // toArray,
  sortBy,
  // shuffle,
  // sample,
  slice,
  filter,
  // findKey,
  // includes,
  find,
  findLast,
  // sum,
  // mean,
  // reduce,
  // copyWithin,
  chunk,
  // zip,
  // unzip,
  // zipObject,
  // pluck,
  // invoke,
  toArrayTree,
  toTreeArray,
  findTree,
  eachTree,
  mapTree,
  filterTree,
  searchTree,
  // arrayIndexOf,
  // arrayLastIndexOf,

  // base
  // hasOwnProp,
  isArray,
  isNull,
  // isNaN: isNumberNaN,
  isUndefined,
  isFunction,
  isObject,
  isString,
  isPlainObject,
  // isLeapYear,
  isDate,
  eqNull,
  each,
  // forOf,
  // lastForOf,
  indexOf,
  // lastIndexOf,
  // keys,
  // values,
  clone,
  getSize,
  // lastEach,
  remove,
  clear,
  // isFinite: isNumberFinite,
  // isFloat,
  // isInteger,
  isBoolean,
  isNumber,
  isRegExp,
  isError,
  // isTypeError,
  isEmpty,
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
  isEqual,
  isEqualWith,
  // getType,
  uniqueId,
  findIndexOf,
  // findLastIndexOf,
  toStringJSON,
  toJSONString,
  // entries,
  // pick,
  // omit,
  // first,
  // last,
  has,
  get,
  set,
  // groupBy,
  // countBy,
  // range,
  destructuring,

  // number
  // random,
  // max,
  // min,
  // commafy,
  round,
  ceil,
  floor,
  toFixed,
  toFixedString,
  toFixedNumber,
  toInteger,
  toNumber,
  add,
  subtract,
  // multiply,
  // divide,

  // date
  getWhatYear,
  getWhatMonth,
  getWhatDay,
  toStringDate,
  toDateString,
  // now,
  // timestamp,
  isDateSame,
  getWhatWeek,
  // getYearDay,
  getYearWeek,
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
  escape,
  // unescape,
  camelCase,
  // kebabCase,
  // startsWith,
  // endsWith,
  template,
  toString: toValString,

  // function
  // property,
  // bind,
  // once,
  // after,
  // before,
  throttle,
  debounce,
  // delay,

  // url
  // unserialize,
  // serialize,
  // parseUrl,

  // browse
  // getBaseURL,
  // locat,
  // cookie,
  browse
}
