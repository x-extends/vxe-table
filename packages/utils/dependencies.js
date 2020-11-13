// 按需加载依赖

// object
import assign from 'xe-utils/assign'
import objectEach from 'xe-utils/objectEach'
// import lastObjectEach from 'xe-utils/lastObjectEach'
import objectMap from 'xe-utils/objectMap'
import merge from 'xe-utils/merge'

// array
import map from 'xe-utils/map'
import some from 'xe-utils/some'
// import every from 'xe-utils/every'
import includeArrays from 'xe-utils/includeArrays'
import arrayEach from 'xe-utils/arrayEach'
// import lastArrayEach from 'xe-utils/lastArrayEach'
// import uniq from 'xe-utils/uniq'
// import union from 'xe-utils/union'
// import toArray from 'xe-utils/toArray'
import orderBy from 'xe-utils/orderBy'
// import shuffle from 'xe-utils/shuffle'
// import sample from 'xe-utils/sample'
import slice from 'xe-utils/slice'
import filter from 'xe-utils/filter'
// import findKey from 'xe-utils/findKey'
// import includes from 'xe-utils/includes'
import find from 'xe-utils/find'
// import reduce from 'xe-utils/reduce'
// import copyWithin from 'xe-utils/copyWithin'
import chunk from 'xe-utils/chunk'
// import zip from 'xe-utils/zip'
// import unzip from 'xe-utils/unzip'
// import zipObject from 'xe-utils/zipObject'
// import pluck from 'xe-utils/pluck'
// import invoke from 'xe-utils/invoke'
import toArrayTree from 'xe-utils/toArrayTree'
import toTreeArray from 'xe-utils/toTreeArray'
import findTree from 'xe-utils/findTree'
import eachTree from 'xe-utils/eachTree'
import mapTree from 'xe-utils/mapTree'
import filterTree from 'xe-utils/filterTree'
import searchTree from 'xe-utils/searchTree'
// import arrayIndexOf from 'xe-utils/arrayIndexOf'
// import arrayLastIndexOf from 'xe-utils/arrayLastIndexOf'

// base
// import hasOwnProp from 'xe-utils/hasOwnProp'
import isArray from 'xe-utils/isArray'
import isNull from 'xe-utils/isNull'
// import isNumberNaN from 'xe-utils/isNaN'
import isUndefined from 'xe-utils/isUndefined'
import isFunction from 'xe-utils/isFunction'
import isObject from 'xe-utils/isObject'
import isString from 'xe-utils/isString'
import isPlainObject from 'xe-utils/isPlainObject'
// import isLeapYear from 'xe-utils/isLeapYear'
import isDate from 'xe-utils/isDate'
import eqNull from 'xe-utils/eqNull'
import each from 'xe-utils/each'
// import forOf from 'xe-utils/forOf'
// import lastForOf from 'xe-utils/lastForOf'
import indexOf from 'xe-utils/indexOf'
// import lastIndexOf from 'xe-utils/lastIndexOf'
// import keys from 'xe-utils/keys'
// import values from 'xe-utils/values'
import clone from 'xe-utils/clone'
import getSize from 'xe-utils/getSize'
// import lastEach from 'xe-utils/lastEach'
import remove from 'xe-utils/remove'
import clear from 'xe-utils/clear'
// import isNumberFinite from 'xe-utils/isFinite'
// import isFloat from 'xe-utils/isFloat'
// import isInteger from 'xe-utils/isInteger'
import isBoolean from 'xe-utils/isBoolean'
import isNumber from 'xe-utils/isNumber'
import isRegExp from 'xe-utils/isRegExp'
import isError from 'xe-utils/isError'
// import isTypeError from 'xe-utils/isTypeError'
import isEmpty from 'xe-utils/isEmpty'
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
import isEqual from 'xe-utils/isEqual'
import isEqualWith from 'xe-utils/isEqualWith'
// import getType from 'xe-utils/getType'
import uniqueId from 'xe-utils/uniqueId'
import findIndexOf from 'xe-utils/findIndexOf'
// import findLastIndexOf from 'xe-utils/findLastIndexOf'
import toStringJSON from 'xe-utils/toStringJSON'
import toJSONString from 'xe-utils/toJSONString'
// import entries from 'xe-utils/entries'
// import pick from 'xe-utils/pick'
// import omit from 'xe-utils/omit'
// import first from 'xe-utils/first'
// import last from 'xe-utils/last'
import has from 'xe-utils/has'
import get from 'xe-utils/get'
import set from 'xe-utils/set'
// import groupBy from 'xe-utils/groupBy'
// import countBy from 'xe-utils/countBy'
// import range from 'xe-utils/range'
import destructuring from 'xe-utils/destructuring'

// number
// import random from 'xe-utils/random'
// import max from 'xe-utils/max'
// import min from 'xe-utils/min'
// import commafy from 'xe-utils/commafy'
import round from 'xe-utils/round'
import ceil from 'xe-utils/ceil'
import floor from 'xe-utils/floor'
import toFixed from 'xe-utils/toFixed'
import toInteger from 'xe-utils/toInteger'
import toNumber from 'xe-utils/toNumber'
import add from 'xe-utils/add'
import subtract from 'xe-utils/subtract'
// import multiply from 'xe-utils/multiply'
// import divide from 'xe-utils/divide'
// import sum from 'xe-utils/sum'
// import mean from 'xe-utils/mean'

// date
import getWhatYear from 'xe-utils/getWhatYear'
import getWhatMonth from 'xe-utils/getWhatMonth'
import getWhatDay from 'xe-utils/getWhatDay'
import toStringDate from 'xe-utils/toStringDate'
import toDateString from 'xe-utils/toDateString'
// import now from 'xe-utils/now'
// import timestamp from 'xe-utils/timestamp'
import isDateSame from 'xe-utils/isDateSame'
import getWhatWeek from 'xe-utils/getWhatWeek'
// import getYearDay from 'xe-utils/getYearDay'
import getYearWeek from 'xe-utils/getYearWeek'
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
import escape from 'xe-utils/escape'
// import unescape from 'xe-utils/unescape'
import camelCase from 'xe-utils/camelCase'
import kebabCase from 'xe-utils/kebabCase'
// import startsWith from 'xe-utils/startsWith'
// import endsWith from 'xe-utils/endsWith'
import template from 'xe-utils/template'
import toValString from 'xe-utils/toString'

// function
// import property from 'xe-utils/property'
// import bind from 'xe-utils/bind'
// import once from 'xe-utils/once'
// import after from 'xe-utils/after'
// import before from 'xe-utils/before'
import throttle from 'xe-utils/throttle'
import debounce from 'xe-utils/debounce'
// import delay from 'xe-utils/delay'

// url
// import unserialize from 'xe-utils/unserialize'
// import serialize from 'xe-utils/serialize'
// import parseUrl from 'xe-utils/parseUrl'

// browse
// import getBaseURL from 'xe-utils/getBaseURL'
// import locat from 'xe-utils/locat'
// import cookie from 'xe-utils/cookie'
import browse from 'xe-utils/browse'

export default {
  // object
  assign,
  objectEach,
  // lastObjectEach,
  objectMap,
  merge,

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
  orderBy,
  // shuffle,
  // sample,
  slice,
  filter,
  // findKey,
  // includes,
  find,
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
  kebabCase,
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
