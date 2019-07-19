(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xe-utils"));
	else if(typeof define === 'function' && define.amd)
		define(["xe-utils"], factory);
	else if(typeof exports === 'object')
		exports["VXETable"] = factory(require("xe-utils"));
	else
		root["VXETable"] = factory(root["XEUtils"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE_f0af__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "014b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("e53d");
var has = __webpack_require__("07e3");
var DESCRIPTORS = __webpack_require__("8e60");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var META = __webpack_require__("ebfd").KEY;
var $fails = __webpack_require__("294c");
var shared = __webpack_require__("dbdb");
var setToStringTag = __webpack_require__("45f2");
var uid = __webpack_require__("62a0");
var wks = __webpack_require__("5168");
var wksExt = __webpack_require__("ccb9");
var wksDefine = __webpack_require__("6718");
var enumKeys = __webpack_require__("47ee");
var isArray = __webpack_require__("9003");
var anObject = __webpack_require__("e4ae");
var isObject = __webpack_require__("f772");
var toObject = __webpack_require__("241e");
var toIObject = __webpack_require__("36c3");
var toPrimitive = __webpack_require__("1bc3");
var createDesc = __webpack_require__("aebd");
var _create = __webpack_require__("a159");
var gOPNExt = __webpack_require__("0395");
var $GOPD = __webpack_require__("bf0b");
var $GOPS = __webpack_require__("9aa9");
var $DP = __webpack_require__("d9f6");
var $keys = __webpack_require__("c3a1");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("6abf").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("355d").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("b8e3")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("35e8")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0395":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("36c3");
var gOPN = __webpack_require__("6abf").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0fc9":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1654":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("71c1")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("30f1")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "1691":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "1991":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var invoke = __webpack_require__("31f4");
var html = __webpack_require__("fab2");
var cel = __webpack_require__("230e");
var global = __webpack_require__("7726");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("2d95")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "1a97":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1c4c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("9b43");
var $export = __webpack_require__("5ca1");
var toObject = __webpack_require__("4bf8");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var toLength = __webpack_require__("9def");
var createProperty = __webpack_require__("f1ae");
var getIterFn = __webpack_require__("27ee");

$export($export.S + $export.F * !__webpack_require__("5cc5")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "241e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "25eb":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "268f":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("fde4");

/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "30f1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var $iterCreate = __webpack_require__("8f60");
var setToStringTag = __webpack_require__("45f2");
var getPrototypeOf = __webpack_require__("53e2");
var ITERATOR = __webpack_require__("5168")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "31f4":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "32a6":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("241e");
var $keys = __webpack_require__("c3a1");

__webpack_require__("ce7e")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "32fc":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("e53d").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "335c":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6b4c");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "355d":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "36c3":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("335c");
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "386b":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a38":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "454f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("46a7");
var $Object = __webpack_require__("584a").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "45f2":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("d9f6").f;
var has = __webpack_require__("07e3");
var TAG = __webpack_require__("5168")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "46a7":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("8e60"), 'Object', { defineProperty: __webpack_require__("d9f6").f });


/***/ }),

/***/ "47ee":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("c3a1");
var gOPS = __webpack_require__("9aa9");
var pIE = __webpack_require__("355d");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "481b":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "50ed":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "5168":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("dbdb")('wks');
var uid = __webpack_require__("62a0");
var Symbol = __webpack_require__("e53d").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "53e2":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("07e3");
var toObject = __webpack_require__("241e");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "551c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var global = __webpack_require__("7726");
var ctx = __webpack_require__("9b43");
var classof = __webpack_require__("23c6");
var $export = __webpack_require__("5ca1");
var isObject = __webpack_require__("d3f4");
var aFunction = __webpack_require__("d8e8");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var speciesConstructor = __webpack_require__("ebd6");
var task = __webpack_require__("1991").set;
var microtask = __webpack_require__("8079")();
var newPromiseCapabilityModule = __webpack_require__("a5b8");
var perform = __webpack_require__("9c80");
var userAgent = __webpack_require__("a25f");
var promiseResolve = __webpack_require__("bcaa");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("2b4c")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("dcbc")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7f20")($Promise, PROMISE);
__webpack_require__("7a56")(PROMISE);
Wrapper = __webpack_require__("8378")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("5cc5")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5559":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("dbdb")('keys');
var uid = __webpack_require__("62a0");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "55dd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var aFunction = __webpack_require__("d8e8");
var toObject = __webpack_require__("4bf8");
var fails = __webpack_require__("79e5");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__("2f21")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5b4e":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("36c3");
var toLength = __webpack_require__("b447");
var toAbsoluteIndex = __webpack_require__("0fc9");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5d58":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d8d6");

/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5df3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("02f4")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("01f9")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "62a0":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "6718":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var LIBRARY = __webpack_require__("b8e3");
var wksExt = __webpack_require__("ccb9");
var defineProperty = __webpack_require__("d9f6").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "67ab":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("ca5a")('meta');
var isObject = __webpack_require__("d3f4");
var has = __webpack_require__("69a8");
var setDesc = __webpack_require__("86cc").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("79e5")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "67bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("f921");

/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "69d3":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6718")('asyncIterator');


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6abf":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("e6f3");
var hiddenKeys = __webpack_require__("1691").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "6b4c":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6c1c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c367");
var global = __webpack_require__("e53d");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var TO_STRING_TAG = __webpack_require__("5168")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "71c1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var defined = __webpack_require__("25eb");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "765d":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6718")('observable');


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7e90":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var anObject = __webpack_require__("e4ae");
var getKeys = __webpack_require__("c3a1");

module.exports = __webpack_require__("8e60") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8079":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var macrotask = __webpack_require__("1991").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("2d95")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "8436":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "85f2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("454f");

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8aae":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("32a6");
module.exports = __webpack_require__("584a").Object.keys;


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8f60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("a159");
var descriptor = __webpack_require__("aebd");
var setToStringTag = __webpack_require__("45f2");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("35e8")(IteratorPrototype, __webpack_require__("5168")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "9003":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("6b4c");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9138":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("35e8");


/***/ }),

/***/ "9aa9":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9c80":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a159":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("e4ae");
var dPs = __webpack_require__("7e90");
var enumBugKeys = __webpack_require__("1691");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("1ec9")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("32fc").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "a25f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a4bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("8aae");

/***/ }),

/***/ "a5b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("d8e8");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b39a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "b447":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("3a38");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "b8e3":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "bcaa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var newPromiseCapability = __webpack_require__("a5b8");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "bf0b":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("355d");
var createDesc = __webpack_require__("aebd");
var toIObject = __webpack_require__("36c3");
var toPrimitive = __webpack_require__("1bc3");
var has = __webpack_require__("07e3");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("8e60") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "bf90":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__("36c3");
var $getOwnPropertyDescriptor = __webpack_require__("bf0b").f;

__webpack_require__("ce7e")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "c207":
/***/ (function(module, exports) {



/***/ }),

/***/ "c26b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__("86cc").f;
var create = __webpack_require__("2aeb");
var redefineAll = __webpack_require__("dcbc");
var ctx = __webpack_require__("9b43");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var $iterDefine = __webpack_require__("01f9");
var step = __webpack_require__("d53b");
var setSpecies = __webpack_require__("7a56");
var DESCRIPTORS = __webpack_require__("9e1e");
var fastKey = __webpack_require__("67ab").fastKey;
var validate = __webpack_require__("b39a");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("8436");
var step = __webpack_require__("50ed");
var Iterators = __webpack_require__("481b");
var toIObject = __webpack_require__("36c3");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("30f1")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "c3a1":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("e6f3");
var enumBugKeys = __webpack_require__("1691");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ccb9":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("5168");


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "ce7e":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("63b6");
var core = __webpack_require__("584a");
var fails = __webpack_require__("294c");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "d263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__("386b")('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d8d6":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1654");
__webpack_require__("6c1c");
module.exports = __webpack_require__("ccb9").f('iterator');


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "dbdb":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b8e3") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "e0b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var redefineAll = __webpack_require__("dcbc");
var meta = __webpack_require__("67ab");
var forOf = __webpack_require__("4a59");
var anInstance = __webpack_require__("f605");
var isObject = __webpack_require__("d3f4");
var fails = __webpack_require__("79e5");
var $iterDetect = __webpack_require__("5cc5");
var setToStringTag = __webpack_require__("7f20");
var inheritIfRequired = __webpack_require__("5dbc");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e265":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("ed33");

/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "e6f3":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("07e3");
var toIObject = __webpack_require__("36c3");
var arrayIndexOf = __webpack_require__("5b4e")(false);
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "ebfd":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("62a0")('meta');
var isObject = __webpack_require__("f772");
var has = __webpack_require__("07e3");
var setDesc = __webpack_require__("d9f6").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("294c")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "ed33":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("014b");
module.exports = __webpack_require__("584a").Object.getOwnPropertySymbols;


/***/ }),

/***/ "f0af":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_f0af__;

/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f400":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__("c26b");
var validate = __webpack_require__("b39a");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__("e0b8")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "f921":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("014b");
__webpack_require__("c207");
__webpack_require__("69d3");
__webpack_require__("765d");
module.exports = __webpack_require__("584a").Symbol;


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"root":"XEUtils","commonjs":"xe-utils","commonjs2":"xe-utils","amd":"xe-utils"}
var external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_ = __webpack_require__("f0af");
var external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default = /*#__PURE__*/__webpack_require__.n(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.fixed.js
var es6_string_fixed = __webpack_require__("d263");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("85f2");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    define_property_default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__("5df3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.map.js
var es6_map = __webpack_require__("f400");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./packages/conf/index.js
// import XEUtils from 'xe-utils'
// import zhCNLocat from '../lib/locale/lang/zh-CN'
var GlobalConfig = {
  // showOverflow: null,
  // showHeaderOverflow: null,
  // resizeInterval: 250,
  // size: null,
  // validConfig: {
  //   message: 'default'
  // },
  // resizable: false,
  // stripe: false,
  // border: false,
  fit: true,
  showHeader: true,
  version: 0,
  // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  optimization: {
    animat: true,
    scrollX: {
      gt: 500,
      oSize: 6,
      rSize: 18,
      vSize: 0
    },
    scrollY: {
      gt: 500,
      oSize: 30,
      rSize: 100,
      vSize: 0,
      rHeight: 0
    }
  },
  icon: {
    sortAsc: 'vxe-icon--caret-top',
    sortDesc: 'vxe-icon--caret-bottom',
    filter: 'vxe-icon--funnel',
    edit: 'vxe-icon--edit-outline',
    tree: 'vxe-icon--caret-right',
    jumpPrev: 'vxe-icon--d-arrow-left',
    jumpNext: 'vxe-icon--d-arrow-right',
    prevPage: 'vxe-icon--arrow-left',
    nextPage: 'vxe-icon--arrow-right',
    msgClose: 'vxe-icon--close',
    msgInfo: 'vxe-icon--info',
    msgSuccess: 'vxe-icon--success',
    msgWarning: 'vxe-icon--warning',
    msgError: 'vxe-icon--error',
    msgLoading: 'vxe-icon--refresh roll'
  },
  grid: {},
  menu: {},
  tooltip: {
    // zIndex: 99,
    theme: 'dark'
  },
  pager: {// pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  toolbar: {// storageKey: 'VXE_TABLE_CUSTOM_HIDDEN',
    // setting: false,
    // buttons: []
  },
  message: {
    // zIndex: 999,
    lockView: true,
    lockScroll: true,
    mask: true,
    duration: 3000,
    animat: true
  },
  i18n: function i18n(key) {
    return key;
  },
  _tip: 0 // 是否按需加载了 tooltip

};
/* harmony default export */ var conf = (GlobalConfig);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/interceptor.js
 // 当渲染其他组件时，存在事件冲突时，可以通过该拦截器阻止单元格被自动关闭问题

var _storeMap = {
  // 清除激活单元格之前触发拦截
  'event.clear_actived': [],
  // 清除筛选面板之前触发拦截
  'event.clear_filter': []
};
var Interceptor = {
  get: function get(type) {
    return _storeMap[type] || [];
  },
  add: function add(type, callback) {
    var eList = _storeMap[type];

    if (eList && callback && eList.indexOf(callback) === -1) {
      eList.push(callback);
    }
  },
  delete: function _delete(type, callback) {
    var eList = _storeMap[type];

    if (eList) {
      external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(eList, function (cb) {
        return cb === callback;
      });
    }
  }
};
/* harmony default export */ var interceptor = (Interceptor);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js
var iterator = __webpack_require__("5d58");
var iterator_default = /*#__PURE__*/__webpack_require__.n(iterator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/symbol.js
var symbol = __webpack_require__("67bb");
var symbol_default = /*#__PURE__*/__webpack_require__.n(symbol);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js



function typeof_typeof2(obj) { if (typeof symbol_default.a === "function" && typeof iterator_default.a === "symbol") { typeof_typeof2 = function _typeof2(obj) { return typeof obj; }; } else { typeof_typeof2 = function _typeof2(obj) { return obj && typeof symbol_default.a === "function" && obj.constructor === symbol_default.a && obj !== symbol_default.a.prototype ? "symbol" : typeof obj; }; } return typeof_typeof2(obj); }

function typeof_typeof(obj) {
  if (typeof symbol_default.a === "function" && typeof_typeof2(iterator_default.a) === "symbol") {
    typeof_typeof = function _typeof(obj) {
      return typeof_typeof2(obj);
    };
  } else {
    typeof_typeof = function _typeof(obj) {
      return obj && typeof symbol_default.a === "function" && obj.constructor === symbol_default.a && obj !== symbol_default.a.prototype ? "symbol" : typeof_typeof2(obj);
    };
  }

  return typeof_typeof(obj);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./packages/tools/src/utils.js





var columnUniqueId = 0;

var utils_ColumnConfig = function ColumnConfig(_vm) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      renderHeader = _ref.renderHeader,
      renderCell = _ref.renderCell,
      renderData = _ref.renderData;

  _classCallCheck(this, ColumnConfig);

  Object.assign(this, {
    // 基本属性
    id: "col--".concat(++columnUniqueId),
    type: _vm.type,
    prop: _vm.prop,
    property: _vm.field || _vm.prop,
    title: _vm.title,
    label: _vm.label,
    width: _vm.width,
    minWidth: _vm.minWidth,
    resizable: _vm.resizable,
    fixed: _vm.fixed,
    align: _vm.align,
    headerAlign: _vm.headerAlign,
    showOverflow: _vm.showOverflow,
    showHeaderOverflow: _vm.showHeaderOverflow,
    indexMethod: _vm.indexMethod,
    formatter: _vm.formatter,
    sortable: _vm.sortable,
    sortBy: _vm.sortBy,
    remoteSort: _vm.remoteSort,
    filters: (_vm.filters || []).map(function (_ref2) {
      var label = _ref2.label,
          value = _ref2.value,
          data = _ref2.data;
      return {
        label: label,
        value: value,
        data: data,
        _data: data,
        checked: false
      };
    }),
    filterMultiple: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
    filterMethod: _vm.filterMethod,
    filterRender: _vm.filterRender,
    treeNode: _vm.treeNode,
    columnKey: _vm.columnKey,
    editRender: _vm.editRender,
    // 自定义参数
    params: _vm.params,
    // 渲染属性
    visible: true,
    level: 1,
    rowSpan: 1,
    colSpan: 1,
    order: null,
    renderWidth: 0,
    renderHeight: 0,
    resizeWidth: 0,
    renderLeft: 0,
    renderHeader: renderHeader || _vm.renderHeader,
    renderCell: renderCell || _vm.renderCell,
    renderData: renderData,
    // 单元格插槽，只对 grid 有效
    slots: _vm.slots,
    own: _vm
  });
};

var UtilTools = {
  getSize: function getSize(_ref3) {
    var size = _ref3.size,
        $parent = _ref3.$parent;
    return size || ($parent && ['medium', 'small', 'mini'].indexOf($parent.size) > -1 ? $parent.size : null);
  },
  getRowKey: function getRowKey($table) {
    var rowKey = $table.rowKey,
        rowId = $table.rowId,
        _$table$selectConfig = $table.selectConfig,
        selectConfig = _$table$selectConfig === void 0 ? {} : _$table$selectConfig,
        _$table$treeConfig = $table.treeConfig,
        treeConfig = _$table$treeConfig === void 0 ? {} : _$table$treeConfig,
        _$table$expandConfig = $table.expandConfig,
        expandConfig = _$table$expandConfig === void 0 ? {} : _$table$expandConfig,
        _$table$editConfig = $table.editConfig,
        editConfig = _$table$editConfig === void 0 ? {} : _$table$editConfig;

    if (!rowKey) {
      // 在 v2.0 中废弃 key
      rowKey = rowId || selectConfig.key || treeConfig.key || expandConfig.key || editConfig.key;
    }

    return rowKey;
  },
  getRowPrimaryKey: function getRowPrimaryKey($table, row, rowIndex) {
    var rowKey = UtilTools.getRowKey($table);
    return "".concat(rowKey ? encodeURIComponent(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey)) : rowIndex);
  },
  // 触发事件
  emitEvent: function emitEvent(_vm, type, args) {
    if (_vm.$listeners[type]) {
      _vm.$emit.apply(_vm, [type].concat(args));
    }
  },
  // 获取所有的列，排除分组
  getColumnList: function getColumnList(columns) {
    var result = [];
    columns.forEach(function (column) {
      if (column.children && column.children.length) {
        result.push.apply(result, UtilTools.getColumnList(column.children));
      } else {
        result.push(column);
      }
    });
    return result;
  },
  formatText: function formatText(value, placeholder) {
    return '' + (value === null || value === void 0 ? placeholder ? '　' : '' : value);
  },
  getCellValue: function getCellValue(row, column) {
    return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, column.property);
  },
  getCellLabel: function getCellLabel(row, column, params) {
    var formatter = column.formatter;
    var cellValue = UtilTools.getCellValue(row, column);

    if (params && formatter) {
      if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isString(formatter)) {
        return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a[formatter](cellValue);
      } else if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(formatter)) {
        return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a[formatter[0]].apply(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a, [cellValue].concat(formatter.slice(1)));
      }

      return formatter(Object.assign({
        cellValue: cellValue
      }, params));
    }

    return cellValue;
  },
  setCellValue: function setCellValue(row, column, value) {
    return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, column.property, value);
  },
  getColumnConfig: function getColumnConfig(_vm, options) {
    return _vm instanceof utils_ColumnConfig ? _vm : new utils_ColumnConfig(_vm, options);
  },
  // 组装列配置
  assemColumn: function assemColumn(_vm) {
    var $table = _vm.$table,
        $parent = _vm.$parent,
        columnConfig = _vm.columnConfig;
    var parentColumnConfig = $parent.columnConfig;
    columnConfig.slots = _vm.$scopedSlots;

    if (parentColumnConfig && $parent.$children.length > 0) {
      if (!parentColumnConfig.children) {
        parentColumnConfig.children = [];
      }

      parentColumnConfig.children.splice([].indexOf.call($parent.$el.children, _vm.$el), 0, columnConfig);
    } else {
      $table.collectColumn.splice([].indexOf.call($table.$refs.hideColumn.children, _vm.$el), 0, columnConfig);
    }
  },
  // 销毁列
  destroyColumn: function destroyColumn(_vm) {
    var $table = _vm.$table,
        columnConfig = _vm.columnConfig;
    var matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree($table.collectColumn, function (column) {
      return column === columnConfig;
    });

    if (matchObj) {
      matchObj.items.splice(matchObj.index, 1);
    }
  },
  hasChildrenList: function hasChildrenList(item) {
    return item && item.children && item.children.length > 0;
  }
};
/* harmony default export */ var utils = (UtilTools);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// CONCATENATED MODULE: ./packages/tools/src/dom.js



var browse = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.browse();
var htmlElem = document.querySelector('html');
var dom_bodyElem = document.body;
var DomTools = {
  browse: browse,
  isPx: function isPx(val) {
    return val && /^\d+(px)?$/.test(val);
  },
  isScale: function isScale(val) {
    return val && /^\d+%$/.test(val);
  },
  hasClass: function hasClass(elem, cls) {
    return elem && elem.className && elem.className.split && elem.className.split(' ').indexOf(cls) > -1;
  },
  getDomNode: function getDomNode() {
    return {
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
      scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft,
      visibleHeight: document.documentElement.clientHeight || document.body.clientHeight,
      visibleWidth: document.documentElement.clientWidth || document.body.clientWidth
    };
  },

  /**
   * 检查触发源是否属于目标节点
   */
  getEventTargetNode: function getEventTargetNode(evnt, container, queryCls) {
    var targetElem;
    var target = evnt.target;

    while (target && target.nodeType && target !== document) {
      if (queryCls && DomTools.hasClass(target, queryCls)) {
        targetElem = target;
      } else if (target === container) {
        return {
          flag: queryCls ? !!targetElem : true,
          container: container,
          targetElem: targetElem
        };
      }

      target = target.parentNode;
    }

    return {
      flag: false
    };
  },

  /**
   * 获取元素相对于 document 的位置
   */
  getOffsetPos: function getOffsetPos(elem, container) {
    return getNodeOffset(elem, container, {
      left: 0,
      top: 0
    });
  },
  getAbsolutePos: function getAbsolutePos(elem) {
    var bounding = elem.getBoundingClientRect();

    var _DomTools$getDomNode = DomTools.getDomNode(),
        scrollTop = _DomTools$getDomNode.scrollTop,
        scrollLeft = _DomTools$getDomNode.scrollLeft;

    return {
      top: scrollTop + bounding.top,
      left: scrollLeft + bounding.left
    };
  },
  getCellIndexs: function getCellIndexs(cell) {
    var trElem = cell.parentNode;
    var colIndex = cell.getAttribute('data-index');
    var rowPrimaryKey = trElem.getAttribute('data-rowid');
    var columnIndex = [].indexOf.call(trElem.children, cell);
    var rowIndex = [].indexOf.call(trElem.parentNode.children, trElem);
    return {
      rowPrimaryKey: rowPrimaryKey,
      rowIndex: rowIndex,
      colIndex: colIndex ? parseInt(colIndex) : colIndex,
      columnIndex: columnIndex
    };
  },
  getCell: function getCell($table, _ref) {
    var row = _ref.row,
        rowIndex = _ref.rowIndex,
        column = _ref.column;
    var rowPrimaryKey = utils.getRowPrimaryKey($table, row, rowIndex);
    return $table.$refs.tableBody.$el.querySelector(".vxe-body--row[data-rowid=\"".concat(rowPrimaryKey, "\"] .").concat(column.id));
  },
  getCursorPosition: function getCursorPosition(textarea) {
    var rangeData = {
      text: '',
      start: 0,
      end: 0
    };

    if (textarea.setSelectionRange) {
      rangeData.start = textarea.selectionStart;
      rangeData.end = textarea.selectionEnd;
      rangeData.text = rangeData.start !== rangeData.end ? textarea.value.substring(rangeData.start, rangeData.end) : '';
    } else if (document.selection) {
      var index = 0;
      var range = document.selection.createRange();
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(textarea);
      rangeData.text = range.text;
      rangeData.bookmark = range.getBookmark();

      for (; textRange.compareEndPoints('StartToStart', range) < 0 && range.moveStart('character', -1) !== 0; index++) {
        if (textarea.value.charAt(index) === '\n') {
          index++;
        }
      }

      rangeData.start = index;
      rangeData.end = rangeData.text.length + rangeData.start;
    }

    return rangeData;
  },
  setCursorPosition: function setCursorPosition(textarea, rangeData) {
    if (textarea.setSelectionRange) {
      textarea.focus();
      textarea.setSelectionRange(rangeData.start, rangeData.end);
    } else if (textarea.createTextRange) {
      var textRange = textarea.createTextRange();

      if (textarea.value.length === rangeData.start) {
        textRange.collapse(false);
        textRange.select();
      } else {
        textRange.moveToBookmark(rangeData.bookmark);
        textRange.select();
      }
    }
  }
};

function getNodeOffset(elem, container, rest) {
  if (elem) {
    var parentElem = elem.parentNode;
    rest.top += elem.offsetTop;
    rest.left += elem.offsetLeft;

    if (parentElem && parentElem !== htmlElem && parentElem !== dom_bodyElem) {
      rest.top -= parentElem.scrollTop;
      rest.left -= parentElem.scrollLeft;
    }

    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest);
    }
  }

  return rest;
}

/* harmony default export */ var dom = (DomTools);
// CONCATENATED MODULE: ./packages/tools/src/export.js
var ExportTools = {};
/* harmony default export */ var src_export = (ExportTools);
// CONCATENATED MODULE: ./packages/tools/src/event.js
 // 监听全局事件

var wheelName = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel';
var eventStore = [];
var GlobalEvent = {
  on: function on(comp, type, cb) {
    eventStore.push({
      comp: comp,
      type: type,
      cb: cb
    });
  },
  off: function off(comp, type) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(eventStore, function (item) {
      return item.comp === comp && item.type === type;
    });
  },
  trigger: function trigger(evnt) {
    eventStore.forEach(function (_ref) {
      var comp = _ref.comp,
          type = _ref.type,
          cb = _ref.cb;

      if (type === evnt.type || type === 'mousewheel' && evnt.type === wheelName) {
        cb.call(comp, evnt);
      }
    });
  }
};
document.addEventListener('keydown', GlobalEvent.trigger, false);
document.addEventListener('contextmenu', GlobalEvent.trigger, false); // document.addEventListener('mouseover', GlobalEvent.trigger, false)
// document.addEventListener('mouseout', GlobalEvent.trigger, false)

window.addEventListener('mousedown', GlobalEvent.trigger, false);
window.addEventListener('blur', GlobalEvent.trigger, false);
window.addEventListener('resize', GlobalEvent.trigger, false);
window.addEventListener(wheelName, GlobalEvent.trigger, false);
/* harmony default export */ var src_event = (GlobalEvent);
// CONCATENATED MODULE: ./packages/tools/src/resize.js
var ResizeEvent = {};
/* harmony default export */ var resize = (ResizeEvent);
// CONCATENATED MODULE: ./packages/tools/index.js










/* harmony default export */ var tools = ({
  UtilTools: utils,
  DomTools: dom,
  ExportTools: src_export,
  GlobalEvent: src_event,
  ResizeEvent: resize
});
// CONCATENATED MODULE: ./packages/v-x-e-table/src/renderer.js






/**
 * 内置渲染器
 * 只支持 input 和 textarea
 */

function defaultRenderer(h, attrs, editRender, params) {
  var $table = params.$table,
      row = params.row,
      column = params.column;
  var name = editRender.name;
  return [h('div', {
    class: 'vxe-input--wrapper'
  }, [h(name, {
    class: "vxe-".concat(name),
    attrs: attrs,
    domProps: {
      value: UtilTools.getCellValue(row, column)
    },
    on: {
      input: function input(evnt) {
        var cellValue = evnt.target.value;
        UtilTools.setCellValue(row, column, cellValue);
        $table.updateStatus(params, cellValue);
      }
    }
  })])];
}

function renderOptgroups(h, editRender, params) {
  var optionGroups = editRender.optionGroups,
      _editRender$optionGro = editRender.optionGroupProps,
      optionGroupProps = _editRender$optionGro === void 0 ? {} : _editRender$optionGro;
  var groupOptions = optionGroupProps.options || 'options';
  var groupLabel = optionGroupProps.label || 'label';
  return optionGroups.map(function (group, gIndex) {
    return h('optgroup', {
      domProps: {
        label: group[groupLabel]
      },
      key: gIndex
    }, renderer_renderOptions(h, group[groupOptions], editRender, params));
  });
}

function renderer_renderOptions(h, options, editRender, params) {
  var _editRender$optionPro = editRender.optionProps,
      optionProps = _editRender$optionPro === void 0 ? {} : _editRender$optionPro;
  var row = params.row,
      column = params.column;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  return options.map(function (item, index) {
    return h('option', {
      domProps: {
        value: item[valueProp],
        selected: item.value === UtilTools.getCellValue(row, column)
      },
      key: index
    }, item[labelProp]);
  });
}

var renderer_storeMap = {
  input: {
    autofocus: '.vxe-input',
    renderEdit: function renderEdit(h, editRender, params) {
      return defaultRenderer(h, {
        type: 'text'
      }, editRender, params);
    }
  },
  textarea: {
    autofocus: '.vxe-textarea',
    renderEdit: function renderEdit(h, editRender, params) {
      return defaultRenderer(h, null, editRender, params);
    }
  },
  select: {
    renderEdit: function renderEdit(h, editRender, params) {
      var options = editRender.options,
          optionGroups = editRender.optionGroups;
      var $table = params.$table,
          row = params.row,
          column = params.column;
      return [h('select', {
        class: 'vxe-default-select',
        on: {
          change: function change(evnt) {
            var cellValue = evnt.target.value;
            UtilTools.setCellValue(row, column, cellValue);
            $table.updateStatus(params, cellValue);
          }
        }
      }, optionGroups ? renderOptgroups(h, editRender, params) : renderer_renderOptions(h, options, editRender, params))];
    },
    renderCell: function renderCell(h, editRender, params) {
      var options = editRender.options,
          optionGroups = editRender.optionGroups,
          _editRender$optionPro2 = editRender.optionProps,
          optionProps = _editRender$optionPro2 === void 0 ? {} : _editRender$optionPro2,
          _editRender$optionGro2 = editRender.optionGroupProps,
          optionGroupProps = _editRender$optionGro2 === void 0 ? {} : _editRender$optionGro2;
      var row = params.row,
          column = params.column;
      var cellValue = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, column.property);

      if (!(cellValue === null || cellValue === undefined || cellValue === '')) {
        var _ret = function () {
          var selectItem;
          var labelProp = optionProps.label || 'label';
          var valueProp = optionProps.value || 'value';

          if (optionGroups) {
            var groupOptions = optionGroupProps.options || 'options';

            for (var index = 0; index < optionGroups.length; index++) {
              selectItem = optionGroups[index][groupOptions].find(function (item) {
                return item[valueProp] === cellValue;
              });

              if (selectItem) {
                break;
              }
            }

            return {
              v: selectItem ? selectItem[labelProp] : null
            };
          } else {
            selectItem = options.find(function (item) {
              return item[valueProp] === cellValue;
            });
            return {
              v: selectItem ? selectItem[labelProp] : null
            };
          }
        }();

        if (typeof_typeof(_ret) === "object") return _ret.v;
      }

      return '';
    }
  }
  /**
   * 全局渲染器
   */

};
var Renderer = {
  mixin: function mixin(map) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.each(map, function (options, name) {
      return Renderer.add(name, options);
    });
    return Renderer;
  },
  get: function get(name) {
    return renderer_storeMap[name] || null;
  },
  add: function add(name, options) {
    if (name && options) {
      var renders = renderer_storeMap[name];

      if (renders) {
        Object.assign(renders, options);
      } else {
        renderer_storeMap[name] = options;
      }
    }

    return Renderer;
  },
  delete: function _delete(name) {
    delete renderer_storeMap[name];
    return Renderer;
  }
};
/* harmony default export */ var renderer = (Renderer);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/setup.js

/**
 * 全局参数设置
 */

function setup() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var icon = conf.icon,
      menu = conf.menu;

  if (options.menu) {
    Object.assign(menu, options.menu);
  }

  if (options.contextMenu) {
    // v2.0废弃
    console.warn('[vxe-table] The property contextMenu is deprecated, please use menu');
    Object.assign(menu, options.contextMenu);
  }

  if (options.icon) {
    Object.assign(icon, options.icon);
  }

  if (options.iconMap) {
    // v2.0废弃
    console.warn('[vxe-table] The property iconMap is deprecated, please use icon');
    Object.assign(icon, options.iconMap);
  }

  Object.assign(conf, options, {
    icon: icon
  });
}

/* harmony default export */ var src_setup = (setup);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/use.js



var installedPlugins = [];

function use(Plugin, options) {
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install({
        setup: src_setup,
        interceptor: interceptor,
        renderer: renderer
      }, options);
      installedPlugins.push(Plugin);
    }
  }
}

/* harmony default export */ var src_use = (use);
// CONCATENATED MODULE: ./packages/v-x-e-table/index.js





var VXETable = {
  t: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get,
  use: src_use,
  setup: src_setup,
  interceptor: interceptor,
  renderer: renderer
};


/* harmony default export */ var v_x_e_table = (VXETable);
// CONCATENATED MODULE: ./packages/cell/src/cell.js






var Cell = {
  createColumn: function createColumn($table, _vm) {
    var type = _vm.type,
        sortable = _vm.sortable,
        remoteSort = _vm.remoteSort,
        filters = _vm.filters,
        editRender = _vm.editRender,
        treeNode = _vm.treeNode;
    var selectConfig = $table.selectConfig,
        treeConfig = $table.treeConfig;
    var isTreeNode = treeConfig && treeNode;
    var renMaps = {
      renderHeader: this.renderHeader,
      renderCell: isTreeNode ? this.renderTreeCell : this.renderCell
    };

    switch (type) {
      case 'index':
        renMaps.renderHeader = this.renderIndexHeader;
        renMaps.renderCell = isTreeNode ? this.renderTreeIndexCell : this.renderIndexCell;
        break;

      case 'radio':
        renMaps.renderHeader = this.renderRadioHeader;
        renMaps.renderCell = isTreeNode ? this.renderTreeRadioCell : this.renderRadioCell;
        break;

      case 'selection':
        renMaps.renderHeader = this.renderSelectionHeader; // 在 v2.0 中废弃 checkProp

        renMaps.renderCell = selectConfig && (selectConfig.checkField || selectConfig.checkProp) ? isTreeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp : isTreeNode ? this.renderTreeSelectionCell : this.renderSelectionCell;
        break;

      case 'expand':
        renMaps.renderCell = this.renderExpandCell;
        renMaps.renderData = this.renderExpandData;
        break;

      default:
        if (editRender) {
          renMaps.renderHeader = this.renderEditHeader;
          renMaps.renderCell = $table.editConfig && $table.editConfig.mode === 'cell' ? isTreeNode ? this.renderTreeCellEdit : this.renderCellEdit : isTreeNode ? this.renderTreeRadioCell : this.renderRowEdit;
        } else if (filters && filters.length && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader;
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader;
        } else if (filters && filters.length) {
          renMaps.renderHeader = this.renderFilterHeader;
        }

    }

    return UtilTools.getColumnConfig(_vm, renMaps);
  },

  /**
   * 单元格
   */
  renderHeader: function renderHeader(h, params) {
    var column = params.column;
    var slots = column.slots,
        own = column.own;

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    return [UtilTools.formatText(own.title || own.label, 1)];
  },
  renderCell: function renderCell(h, params) {
    var cellValue;
    var row = params.row,
        column = params.column;
    var slots = column.slots;

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    cellValue = UtilTools.getCellLabel(row, column, params);
    return [UtilTools.formatText(cellValue, 1)];
  },
  renderTreeCell: function renderTreeCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderCell(h, params));
  },

  /**
   * 树节点
   */
  renderTreeIcon: function renderTreeIcon(h, params) {
    var icon = conf.icon;
    var $table = params.$table;
    var treeConfig = $table.treeConfig,
        treeExpandeds = $table.treeExpandeds;
    var row = params.row,
        level = params.level;
    var children = treeConfig.children,
        indent = treeConfig.indent,
        trigger = treeConfig.trigger;
    var rowChildren = row[children];
    var on = {};

    if (!trigger || trigger === 'default') {
      on.click = function (evnt) {
        return $table.triggerTreeExpandEvent(evnt, params);
      };
    }

    return [h('span', {
      class: 'vxe-tree--indent',
      style: {
        width: "".concat(level * (indent || 16), "px")
      }
    }), h('span', {
      class: ['vxe-tree-wrapper', {
        'is--active': treeExpandeds.indexOf(row) > -1
      }],
      on: on
    }, rowChildren && rowChildren.length ? [h('i', {
      class: "vxe-tree--node-btn ".concat(icon.tree)
    })] : [])];
  },

  /**
   * 索引
   */
  renderIndexHeader: function renderIndexHeader(h, params) {
    var column = params.column;
    var slots = column.slots,
        own = column.own;

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    return [UtilTools.formatText(own.title || own.label || '#', 1)];
  },
  renderIndexCell: function renderIndexCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var startIndex = $table.startIndex;
    var slots = column.slots,
        indexMethod = column.indexMethod;

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    var $seq = params.$seq,
        seq = params.seq,
        level = params.level;
    return [UtilTools.formatText(indexMethod ? indexMethod(params) : level ? "".concat($seq, ".").concat(seq) : startIndex + seq, 1)];
  },
  renderTreeIndexCell: function renderTreeIndexCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderIndexCell(h, params));
  },

  /**
   * 单选
   */
  renderRadioHeader: function renderRadioHeader(h, params) {
    var own = params.column.own;
    return [UtilTools.formatText(own.title || own.label, 1)];
  },
  renderRadioCell: function renderRadioCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var vSize = $table.vSize,
        _$table$radioConfig = $table.radioConfig,
        radioConfig = _$table$radioConfig === void 0 ? {} : _$table$radioConfig;
    var slots = column.slots; // 在 v2.0 中废弃 labelProp

    var labelProp = radioConfig.labelField || radioConfig.labelProp;

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    var selectRow = $table.selectRow;
    var row = params.row;
    var options = {
      attrs: {
        type: 'radio',
        name: "vxe-radio--".concat($table.id)
      }
    };

    if (!params.isHidden) {
      options.domProps = {
        checked: row === selectRow
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerRadioRowEvent(evnt, params);
        }
      };
    }

    return [h('label', {
      class: ['vxe-radio', _defineProperty({}, "size--".concat(vSize), vSize)]
    }, [h('input', options), h('span', {
      class: 'radio--icon'
    }), labelProp ? h('span', {
      class: 'radio--label'
    }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, labelProp)) : null])];
  },
  renderTreeRadioCell: function renderTreeRadioCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderRadioCell(h, params));
  },

  /**
   * 多选
   */
  renderSelectionHeader: function renderSelectionHeader(h, params) {
    var _ref2;

    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var vSize = $table.vSize;
    var slots = column.slots,
        own = column.own;
    var headerTitle = own.title || own.label;
    var options = {
      attrs: {
        type: 'checkbox'
      }
    };

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    if (!isHidden) {
      options.domProps = {
        checked: $table.isAllSelected
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerCheckAllEvent(evnt, evnt.target.checked);
        }
      };
    }

    return [h('label', {
      class: ['vxe-checkbox', (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--indeterminate', $table.isIndeterminate), _ref2)]
    }, [h('input', options), h('span', {
      class: 'checkbox--icon'
    }), headerTitle ? h('span', {
      class: 'checkbox--label'
    }, headerTitle) : null])];
  },
  renderSelectionCell: function renderSelectionCell(h, params) {
    var _ref3;

    var $table = params.$table;
    var vSize = $table.vSize,
        _$table$selectConfig = $table.selectConfig,
        selectConfig = _$table$selectConfig === void 0 ? {} : _$table$selectConfig,
        treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var checkMethod = selectConfig.checkMethod;
    var row = params.row,
        isHidden = params.isHidden; // 在 v2.0 中废弃 labelProp

    var labelProp = selectConfig.labelField || selectConfig.labelProp;
    var indeterminate = false;
    var isDisabled = !!checkMethod;
    var options = {
      attrs: {
        type: 'checkbox'
      }
    };

    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params);
        options.attrs.disabled = isDisabled;
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }

      options.domProps = {
        checked: $table.selection.indexOf(row) > -1
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerCheckRowEvent(evnt, params, evnt.target.checked);
        }
      };
    }

    return [h('label', {
      class: ['vxe-checkbox', (_ref3 = {}, _defineProperty(_ref3, "size--".concat(vSize), vSize), _defineProperty(_ref3, 'is--indeterminate', indeterminate), _defineProperty(_ref3, 'is--disabled', isDisabled), _ref3)]
    }, [h('input', options), h('span', {
      class: 'checkbox--icon'
    }), labelProp ? h('span', {
      class: 'checkbox--label'
    }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, labelProp)) : null])];
  },
  renderTreeSelectionCell: function renderTreeSelectionCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCell(h, params));
  },
  renderSelectionCellByProp: function renderSelectionCellByProp(h, params) {
    var _ref4;

    var $table = params.$table;
    var vSize = $table.vSize,
        _$table$selectConfig2 = $table.selectConfig,
        selectConfig = _$table$selectConfig2 === void 0 ? {} : _$table$selectConfig2,
        treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var checkMethod = selectConfig.checkMethod;
    var row = params.row,
        isHidden = params.isHidden; // 在 v2.0 中废弃 labelProp

    var labelProp = selectConfig.labelField || selectConfig.labelProp;
    var indeterminate = false;
    var isDisabled = !!checkMethod; // 在 v2.0 中废弃 checkProp

    var property = selectConfig.checkField || selectConfig.checkProp;
    var options = {
      attrs: {
        type: 'checkbox'
      }
    };

    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params);
        options.attrs.disabled = isDisabled;
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }

      options.domProps = {
        checked: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property)
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerCheckRowEvent(evnt, params, evnt.target.checked);
        }
      };
    }

    return [h('label', {
      class: ['vxe-checkbox', (_ref4 = {}, _defineProperty(_ref4, "size--".concat(vSize), vSize), _defineProperty(_ref4, 'is--indeterminate', indeterminate), _defineProperty(_ref4, 'is--disabled', isDisabled), _ref4)]
    }, [h('input', options), h('span', {
      class: 'checkbox--icon'
    }), labelProp ? h('span', {
      class: 'checkbox--label'
    }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, labelProp)) : null])];
  },
  renderTreeSelectionCellByProp: function renderTreeSelectionCellByProp(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCellByProp(h, params));
  },

  /**
   * 展开行
   */
  renderExpandCell: function renderExpandCell(h, params) {
    var $table = params.$table,
        isHidden = params.isHidden;
    var expandActive = false;

    if (!isHidden) {
      expandActive = $table.expandeds.indexOf(params.row) > -1;
    }

    return [h('span', {
      class: ['vxe-table--expanded', {
        'expand--active': expandActive
      }],
      on: {
        click: function click(evnt) {
          $table.triggerRowExpandEvent(evnt, params);
        }
      }
    }, [h('i', {
      class: 'vxe-table--expand-icon'
    })])];
  },
  renderExpandData: function renderExpandData(h, params) {
    var column = params.column;
    var slots = column.slots;

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    return [];
  },

  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader: function renderSortAndFilterHeader(h, params) {
    return Cell.renderHeader(h, params).concat(Cell.renderSortIcon(h, params)).concat(Cell.renderFilterIcon(h, params));
  },

  /**
   * 排序
   */
  renderSortHeader: function renderSortHeader(h, params) {
    return Cell.renderHeader(h, params).concat(Cell.renderSortIcon(h, params));
  },
  renderSortIcon: function renderSortIcon(h, params) {
    var icon = conf.icon;
    var $table = params.$table,
        column = params.column;
    return [h('span', {
      class: 'vxe-sort-wrapper'
    }, [h('i', {
      class: ['vxe-sort--asc-btn', icon.sortAsc, {
        'sort--active': column.order === 'asc'
      }],
      on: {
        click: function click(evnt) {
          $table.triggerSortEvent(evnt, column, params, 'asc');
        }
      }
    }), h('i', {
      class: ['vxe-sort--desc-btn', icon.sortDesc, {
        'sort--active': column.order === 'desc'
      }],
      on: {
        click: function click(evnt) {
          $table.triggerSortEvent(evnt, column, params, 'desc');
        }
      }
    })])];
  },

  /**
   * 筛选
   */
  renderFilterHeader: function renderFilterHeader(h, params) {
    return Cell.renderHeader(h, params).concat(Cell.renderFilterIcon(h, params));
  },
  renderFilterIcon: function renderFilterIcon(h, params) {
    var icon = conf.icon;
    var $table = params.$table,
        column = params.column;
    var filterStore = $table.filterStore;
    return [h('span', {
      class: ['vxe-filter-wrapper', {
        'is--active': filterStore.visible && filterStore.column === column
      }]
    }, [h('i', {
      class: "vxe-filter--btn ".concat(icon.filter),
      on: {
        click: function click(evnt) {
          $table.triggerFilterEvent(evnt, params.column, params);
        }
      }
    })])];
  },

  /**
   * 可编辑
   */
  renderEditHeader: function renderEditHeader(h, params) {
    var icon = conf.icon;
    var $table = params.$table,
        column = params.column;
    var editRules = $table.editRules,
        editConfig = $table.editConfig;
    var sortable = column.sortable,
        remoteSort = column.remoteSort,
        filters = column.filters;
    var isRequired;

    if (editRules) {
      var columnRules = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(editRules, params.column.property);

      if (columnRules) {
        isRequired = columnRules.some(function (rule) {
          return rule.required;
        });
      }
    }

    return [isRequired ? h('i', {
      class: 'vxe-required-icon'
    }) : null, editConfig && editConfig.showIcon === false ? null : h('i', {
      class: "vxe-edit-icon ".concat(icon.edit)
    })].concat(Cell.renderHeader(h, params)).concat(sortable || remoteSort ? Cell.renderSortIcon(h, params) : []).concat(filters && filters.length ? Cell.renderFilterIcon(h, params) : []);
  },
  // 行格编辑模式
  renderRowEdit: function renderRowEdit(h, params) {
    var $table = params.$table;
    var actived = $table.editStore.actived;
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row);
  },
  renderTreeRowEdit: function renderTreeRowEdit(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderRowEdit(h, params));
  },
  // 单元格编辑模式
  renderCellEdit: function renderCellEdit(h, params) {
    var $table = params.$table;
    var actived = $table.editStore.actived;
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row && actived.column === params.column);
  },
  renderTreeCellEdit: function renderTreeCellEdit(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderCellEdit(h, params));
  },
  runRenderer: function runRenderer(h, params, _vm, isEdit) {
    var $table = params.$table,
        row = params.row,
        column = params.column;
    var slots = column.slots,
        formatter = column.formatter;
    var editRender = _vm ? _vm.editRender : column.editRender;
    var compConf = Renderer.get(editRender.name);
    var context = {
      $excel: $table.$parent,
      $table: $table,
      $column: column
    };

    if (editRender.type === 'visible' || isEdit) {
      if (slots && slots.edit) {
        return slots.edit(params, h);
      }

      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, params, context) : [];
    }

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    if (formatter) {
      return [UtilTools.formatText(UtilTools.getCellLabel(row, column, params), 1)];
    }

    return compConf && compConf.renderCell ? compConf.renderCell.call($table, h, editRender, params, context) : Cell.renderCell(h, params);
  }
};
/* harmony default export */ var src_cell = (Cell);
// CONCATENATED MODULE: ./packages/cell/index.js


/* harmony default export */ var packages_cell = (src_cell);
// CONCATENATED MODULE: ./packages/table/src/table.js















var rowUniqueId = 1000000;
var table_browse = DomTools.browse;
var debounceScrollYDuration = table_browse.msie ? 40 : 20;
/**
 * 渲染浮固定列
 */

function renderFixed(h, $table, fixedType) {
  var tableData = $table.tableData,
      tableColumn = $table.tableColumn,
      visibleColumn = $table.visibleColumn,
      collectColumn = $table.collectColumn,
      isGroup = $table.isGroup,
      height = $table.height,
      containerHeight = $table.containerHeight,
      vSize = $table.vSize,
      headerHeight = $table.headerHeight,
      footerHeight = $table.footerHeight,
      showHeader = $table.showHeader,
      showFooter = $table.showFooter,
      tableHeight = $table.tableHeight,
      scrollbarWidth = $table.scrollbarWidth,
      scrollbarHeight = $table.scrollbarHeight,
      scrollRightToLeft = $table.scrollRightToLeft,
      scrollLeftToRight = $table.scrollLeftToRight,
      columnStore = $table.columnStore,
      footerData = $table.footerData;
  var customHeight = height === 'auto' ? containerHeight : external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(height);
  var isRightFixed = fixedType === 'right';
  var fixedColumn = columnStore["".concat(fixedType, "List")];
  var style = {
    height: "".concat((customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1), "px"),
    width: "".concat(fixedColumn.reduce(function (previous, column) {
      return previous + column.renderWidth;
    }, isRightFixed ? scrollbarWidth : 0), "px")
  };
  return h('div', {
    class: ["vxe-table--fixed-".concat(fixedType, "-wrapper"), {
      'scrolling--middle': isRightFixed ? scrollRightToLeft : scrollLeftToRight
    }],
    style: style,
    ref: "".concat(fixedType, "Container")
  }, [showHeader ? h('vxe-table-header', {
    props: {
      fixedType: fixedType,
      tableData: tableData,
      tableColumn: tableColumn,
      visibleColumn: visibleColumn,
      collectColumn: collectColumn,
      size: vSize,
      fixedColumn: fixedColumn,
      isGroup: isGroup
    },
    ref: "".concat(fixedType, "Header")
  }) : null, h('vxe-table-body', {
    style: {
      top: "".concat(headerHeight, "px")
    },
    props: {
      fixedType: fixedType,
      tableData: tableData,
      tableColumn: tableColumn,
      visibleColumn: visibleColumn,
      collectColumn: collectColumn,
      fixedColumn: fixedColumn,
      size: vSize,
      isGroup: isGroup
    },
    ref: "".concat(fixedType, "Body")
  }), showFooter ? h('vxe-table-footer', {
    style: {
      top: "".concat(customHeight ? customHeight - footerHeight : tableHeight, "px")
    },
    props: {
      fixedType: fixedType,
      footerData: footerData,
      tableColumn: tableColumn,
      visibleColumn: visibleColumn,
      size: vSize,
      fixedColumn: fixedColumn
    },
    ref: "".concat(fixedType, "Footer")
  }) : null]);
} // 分组表头的属性


var headerProps = {
  children: 'children'
};
/* harmony default export */ var table = ({
  name: 'VxeTable',
  props: {
    /** 基本属性 */
    // 数据
    data: Array,
    // 初始化绑定动态列
    customs: Array,
    // 表格的高度
    height: [Number, String],
    // 表格的最大高度
    maxHeight: [Number, String],
    // 所有列是否允许拖动列宽调整大小
    resizable: {
      type: Boolean,
      default: function _default() {
        return conf.resizable;
      }
    },
    // 是否带有斑马纹
    stripe: {
      type: Boolean,
      default: function _default() {
        return conf.stripe;
      }
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: function _default() {
        return conf.border;
      }
    },
    // 表格的尺寸
    size: {
      type: String,
      default: function _default() {
        return conf.size;
      }
    },
    // 列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: function _default() {
        return conf.fit;
      }
    },
    // 表格是否加载中
    loading: Boolean,
    // 所有的列对其方式
    align: String,
    // 所有的表头列的对齐方式
    headerAlign: String,
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: function _default() {
        return conf.showHeader;
      }
    },
    // 只对 type=index 时有效，自定义序号的起始值
    startIndex: {
      type: Number,
      default: 0
    },
    // 是否要高亮当前选中行
    highlightCurrentRow: Boolean,
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: Boolean,
    // 是否要高亮当前选中列
    highlightCurrentColumn: Boolean,
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: Boolean,
    // 是否显示表尾合计
    showFooter: Boolean,
    // 表尾合计的计算方法
    footerMethod: Function,
    // 给行附加 className
    rowClassName: [String, Function],
    // 给单元格附加 className
    cellClassName: [String, Function],
    // 给表头的行附加 className
    headerRowClassName: [String, Function],
    // 给表头的单元格附加 className
    headerCellClassName: [String, Function],
    // 给表尾的行附加 className
    footerRowClassName: [String, Function],
    // 给表尾的单元格附加 className
    footerCellClassName: [String, Function],
    // 合并行或列
    spanMethod: Function,
    // （v2.0 废弃）
    showAllOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return conf.showOverflow;
      }
    },
    // （v2.0 废弃）
    showHeaderAllOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return conf.showHeaderOverflow;
      }
    },
    // 设置所有内容过长时显示为省略号
    showOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return conf.showOverflow;
      }
    },
    // 设置表头所有内容过长时显示为省略号
    showHeaderOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return conf.showHeaderOverflow;
      }
    },
    // 是否服务端筛选
    remoteFilter: Boolean,

    /** 高级属性 */
    // 行数据的 Key
    rowKey: [String, Number],
    rowId: [String, Number],
    // 是否自动根据父容器响应式调整表格宽高
    autoResize: Boolean,
    // 单选配置
    radioConfig: Object,
    // 多选配置项
    selectConfig: Object,
    // tooltip 配置项
    tooltipConfig: Object,
    // 展开行配置项
    expandConfig: Object,
    // 树形结构配置项
    treeConfig: Object,
    // 快捷菜单配置项
    contextMenu: Object,
    // 鼠标配置项
    mouseConfig: Object,
    // 按键配置项
    keyboardConfig: Object,
    // 编辑配置项
    editConfig: Object,
    // 校验配置项
    validConfig: Object,
    // 校验规则配置项
    editRules: Object,
    // 优化配置项
    optimization: Object
  },
  provide: function provide() {
    return {
      $table: this
    };
  },
  data: function data() {
    return {
      id: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.uniqueId(),
      // 列分组配置
      collectColumn: [],
      // 完整所有列
      tableFullColumn: [],
      // 渲染的列
      tableColumn: [],
      // 完整数据
      // tableFullData: [],
      // afterFullData: [],
      // 渲染中的数据
      tableData: [],
      // 表格父容器的高度
      containerHeight: 0,
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      // 是否启用了横向 X 可视渲染方式加载
      scrollXLoad: false,
      // 是否启用了纵向 Y 可视渲染方式加载
      scrollYLoad: false,
      // 是否存在纵向滚动条
      overflowY: true,
      // 是否存在横向滚动条
      overflowX: false,
      // 纵向滚动条的宽度
      scrollbarWidth: 0,
      // 横向滚动条的高度
      scrollbarHeight: 0,
      // 左侧固定列是否向右滚动了
      scrollLeftToRight: false,
      // 右侧固定列是否向左滚动了
      scrollRightToLeft: false,
      // 是否全选
      isAllSelected: false,
      // 多选属性，有选中且非全选状态
      isIndeterminate: false,
      // 多选属性，已选中的列
      selection: [],
      // 当前行
      currentRow: null,
      // 单选属性，选中行
      selectRow: null,
      // 单选属性，选中列
      selectColumn: null,
      // 表尾合计数据
      footerData: [],
      // 已展开的行
      expandeds: [],
      // 已展开树节点
      treeExpandeds: [],
      // 树节点不确定状态的列表
      treeIndeterminates: [],
      // 当前 hover 行
      hoverRow: null,
      // 是否加载了 Loading 模块
      isLoading: false,
      // 当前选中的筛选列
      filterStore: {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      },
      // 存放列相关的信息
      columnStore: {
        leftList: [],
        centerList: [],
        rightList: [],
        resizeList: [],
        pxList: [],
        pxMinList: [],
        scaleList: [],
        scaleMinList: [],
        autoList: []
      },
      // 存放快捷菜单的信息
      ctxMenuStore: {
        selected: null,
        visible: false,
        showChild: false,
        selectChild: null,
        list: [],
        style: null
      },
      // 存放横向 X 可视渲染相关的信息
      scrollXStore: {
        renderSize: 0,
        visibleSize: 0,
        offsetSize: 0,
        rowHeight: 0,
        startIndex: 0,
        visibleIndex: 0,
        leftSpaceWidth: 0,
        rightSpaceWidth: 0
      },
      // 存放纵向 Y 可视渲染相关的信息
      scrollYStore: {
        renderSize: 0,
        visibleSize: 0,
        offsetSize: 0,
        rowHeight: 0,
        startIndex: 0,
        visibleIndex: 0,
        topSpaceHeight: 0,
        bottomSpaceHeight: 0
      },
      // 存放 tooltip 相关信息
      tooltipStore: {
        visible: false,
        row: null,
        column: null,
        content: ''
      },
      // 存放可编辑相关信息
      editStore: {
        // 所有选中
        checked: {
          rows: [],
          columns: [],
          tRows: [],
          tColumns: []
        },
        // 选中源
        selected: {
          row: null,
          column: null
        },
        // 已复制源
        copyed: {
          cut: false,
          rows: [],
          columns: []
        },
        // 激活
        actived: {
          row: null,
          column: null
        },
        insertList: [],
        removeList: []
      },
      // 存放数据校验相关信息
      validStore: {
        visible: false,
        row: null,
        column: null,
        content: '',
        rule: null,
        isArrow: false
      }
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    validOpts: function validOpts() {
      return Object.assign({
        message: 'default'
      }, conf.validConfig, this.validConfig);
    },
    // 优化的参数
    optimizeOpts: function optimizeOpts() {
      return Object.assign({}, conf.optimization, this.optimization);
    },
    // 是否使用了分组表头
    isGroup: function isGroup() {
      return this.collectColumn.some(function (column) {
        return UtilTools.hasChildrenList(column);
      });
    },
    hasTip: function hasTip() {
      return conf._tip;
    },
    visibleColumn: function visibleColumn() {
      return this.tableFullColumn ? this.tableFullColumn.filter(function (column) {
        return column.visible;
      }) : [];
    },
    isResizable: function isResizable() {
      return this.resizable || this.tableFullColumn.some(function (column) {
        return column.resizable;
      });
    },
    hasFilter: function hasFilter() {
      return this.tableColumn.some(function (column) {
        return column.filters && column.filters.length;
      });
    },
    headerCtxMenu: function headerCtxMenu() {
      return this.ctxMenuConfig.header && this.ctxMenuConfig.header.options ? this.ctxMenuConfig.header.options : [];
    },
    bodyCtxMenu: function bodyCtxMenu() {
      return this.ctxMenuConfig.body && this.ctxMenuConfig.body.options ? this.ctxMenuConfig.body.options : [];
    },
    isCtxMenu: function isCtxMenu() {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length;
    },
    ctxMenuConfig: function ctxMenuConfig() {
      return Object.assign({}, conf.menu, this.contextMenu);
    },
    ctxMenuList: function ctxMenuList() {
      var rest = [];
      this.ctxMenuStore.list.forEach(function (list) {
        list.forEach(function (item) {
          rest.push(item);
        });
      });
      return rest;
    }
  },
  watch: {
    data: function data(value) {
      if (!this.isUpdateData) {
        this.loadData(value, true).then(this.handleDefault);
      }

      this.isUpdateData = false;
    },
    customs: function customs(value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value);
      }

      this.isUpdateCustoms = false;
    },
    collectColumn: function collectColumn(value) {
      var tableFullColumn = UtilTools.getColumnList(value);
      this.tableFullColumn = tableFullColumn;
      this.cacheColumnMap();
    },
    tableColumn: function tableColumn() {
      this.analyColumnWidth();
    },
    height: function height() {
      this.$nextTick(this.recalculate);
    },
    loading: function loading() {
      if (!this.isLoading) {
        this.isLoading = true;
      }
    }
  },
  created: function created() {
    var _this = this;

    var scrollYStore = this.scrollYStore,
        optimizeOpts = this.optimizeOpts,
        _this$radioConfig = this.radioConfig,
        radioConfig = _this$radioConfig === void 0 ? {} : _this$radioConfig,
        _this$selectConfig = this.selectConfig,
        selectConfig = _this$selectConfig === void 0 ? {} : _this$selectConfig,
        treeConfig = this.treeConfig,
        editConfig = this.editConfig,
        loading = this.loading,
        showAllOverflow = this.showAllOverflow,
        showHeaderAllOverflow = this.showHeaderAllOverflow;
    var scrollY = optimizeOpts.scrollY;

    if (loading) {
      this.isLoading = true;
    }

    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: scrollY.rSize,
        offsetSize: scrollY.oSize
      });
    }

    if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(showAllOverflow)) {
      console.warn('[vxe-table] The property show-all-overflow is deprecated, please use show-overflow');
    }

    if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(showHeaderAllOverflow)) {
      console.warn('[vxe-table] The property show-header-all-overflow is deprecated, please use show-header-overflow');
    }

    if (radioConfig.labelProp) {
      console.warn('[vxe-table] The property labelProp is deprecated, please use labelField');
    }

    if (selectConfig.checkProp) {
      console.warn('[vxe-table] The property checkProp is deprecated, please use checkField');
    }

    if (selectConfig.labelProp) {
      console.warn('[vxe-table] The property labelProp is deprecated, please use labelField');
    }

    this.lastScrollLeft = 0;
    this.lastScrollTop = 0;
    this.afterFullData = [];
    this.fullDataIndexMap = new Map();
    this.fullDataRowIdMap = new Map();
    this.fullColumnIndexMap = new Map();
    this.loadData(this.data, true).then(function () {
      var rowKey = UtilTools.getRowKey(_this);

      if (selectConfig.key) {
        console.warn('[vxe-table] The property select-config.key is deprecated, please use (row-id | row-key)');
      } else if (treeConfig && treeConfig.key) {
        console.warn('[vxe-table] The property tree-config.key is deprecated, please use (row-id | row-key)');
      } else if (editConfig && editConfig.key) {
        console.warn('[vxe-table] The property edit-config.key is deprecated, please use (row-id | row-key)');
      }

      if (selectConfig.reserve && !rowKey) {
        throw new Error('[vxe-table] Checkbox status reserve must have a unique primary key (row-id | row-key).');
      } else if (treeConfig && !rowKey) {
        throw new Error('[vxe-table] Tree table must have a unique primary key (row-id | row-key).');
      } else if (editConfig && !rowKey) {
        throw new Error('[vxe-table] Editable must have a unique primary key (row-id | row-key).');
      }

      _this.tableFullColumn = UtilTools.getColumnList(_this.collectColumn);

      if (_this.customs) {
        _this.mergeCustomColumn(_this.customs);
      }

      _this.refreshColumn();

      _this.handleDefault();
    });
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent);
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);
  },
  mounted: function mounted() {
    if (this.autoResize) {
      ResizeEvent.on(this, this.$el.parentNode, this.recalculate);
    }

    document.body.appendChild(this.$refs.tableWrapper);
  },
  activated: function activated() {
    var $refs = this.$refs,
        lastScrollTop = this.lastScrollTop,
        lastScrollLeft = this.lastScrollLeft;
    var bodyElem = $refs.tableBody.$el;

    if (bodyElem) {
      if (lastScrollTop) {
        bodyElem.scrollTop = lastScrollTop;
      }

      if (lastScrollLeft) {
        bodyElem.scrollLeft = lastScrollLeft;
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    var tableWrapper = this.$refs.tableWrapper;

    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper);
    }

    if (ResizeEvent.off) {
      ResizeEvent.off(this, this.$el.parentNode);
    }

    this.afterFullData.length = 0;
    this.fullDataIndexMap.clear();
    this.fullColumnIndexMap.clear();
    this.closeFilter();
    this.closeMenu();
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'blur');
    GlobalEvent.off(this, 'contextmenu');
    GlobalEvent.off(this, 'mousewheel');
    GlobalEvent.off(this, 'keydown');
    GlobalEvent.off(this, 'resize');
  },
  render: function render(h) {
    var _e = this._e,
        id = this.id,
        tableData = this.tableData,
        tableColumn = this.tableColumn,
        visibleColumn = this.visibleColumn,
        collectColumn = this.collectColumn,
        isGroup = this.isGroup,
        hasFilter = this.hasFilter,
        isResizable = this.isResizable,
        isCtxMenu = this.isCtxMenu,
        loading = this.loading,
        isLoading = this.isLoading,
        showHeader = this.showHeader,
        border = this.border,
        stripe = this.stripe,
        height = this.height,
        highlightHoverRow = this.highlightHoverRow,
        highlightHoverColumn = this.highlightHoverColumn,
        vSize = this.vSize,
        editConfig = this.editConfig,
        validOpts = this.validOpts,
        editRules = this.editRules,
        showFooter = this.showFooter,
        footerMethod = this.footerMethod,
        overflowX = this.overflowX,
        overflowY = this.overflowY,
        scrollbarHeight = this.scrollbarHeight,
        optimizeOpts = this.optimizeOpts,
        columnStore = this.columnStore,
        filterStore = this.filterStore,
        ctxMenuStore = this.ctxMenuStore,
        tooltipStore = this.tooltipStore,
        tooltipConfig = this.tooltipConfig,
        validStore = this.validStore,
        footerData = this.footerData,
        hasTip = this.hasTip;
    var leftList = columnStore.leftList,
        rightList = columnStore.rightList;
    return h('div', {
      class: ['vxe-table', vSize ? "size--".concat(vSize) : '', {
        'vxe-editable': editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'scroll--y': overflowY,
        'scroll--x': overflowX,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        't--animat': optimizeOpts.animat,
        't--stripe': stripe,
        't--border': border,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn
      }]
    }, [
    /**
     * 隐藏列
     */
    h('div', {
      class: ['vxe-table-hidden-column'],
      ref: 'hideColumn'
    }, this.$slots.default),
    /**
     * 主头部
     */
    showHeader ? h('vxe-table-header', {
      ref: 'tableHeader',
      props: {
        tableData: tableData,
        tableColumn: tableColumn,
        visibleColumn: visibleColumn,
        collectColumn: collectColumn,
        size: vSize,
        isGroup: isGroup
      }
    }) : _e(),
    /**
     * 主内容
     */
    h('vxe-table-body', {
      ref: 'tableBody',
      props: {
        tableData: tableData,
        tableColumn: tableColumn,
        visibleColumn: visibleColumn,
        collectColumn: collectColumn,
        size: vSize,
        isGroup: isGroup
      }
    }),
    /**
     * 底部汇总
     */
    showFooter ? h('vxe-table-footer', {
      props: {
        footerData: footerData,
        footerMethod: footerMethod,
        tableColumn: tableColumn,
        visibleColumn: visibleColumn,
        size: vSize
      },
      ref: 'tableFooter'
    }) : _e(),
    /**
     * 左侧固定列
     */
    leftList && leftList.length && overflowX ? renderFixed(h, this, 'left') : _e(),
    /**
     * 右侧固定列
     */
    rightList && rightList.length && overflowX ? renderFixed(h, this, 'right') : _e(),
    /**
     * 列宽线
     */
    isResizable ? h('div', {
      class: ['vxe-table--resizable-bar'],
      style: overflowX ? {
        'padding-bottom': "".concat(scrollbarHeight, "px")
      } : null,
      ref: 'resizeBar'
    }) : _e(),
    /**
     * 加载中
     */
    isLoading ? h('vxe-table-loading', {
      props: {
        visible: loading
      }
    }) : _e(), h('div', {
      class: ["vxe-table".concat(id, "-wrapper")],
      ref: 'tableWrapper'
    }, [
    /**
     * 筛选
     */
    hasFilter ? h('vxe-table-filter', {
      props: {
        optimizeOpts: optimizeOpts,
        filterStore: filterStore
      },
      ref: 'filterWrapper'
    }) : _e(),
    /**
     * 快捷菜单
     */
    isCtxMenu ? h('vxe-table-context-menu', {
      props: {
        ctxMenuStore: ctxMenuStore
      },
      ref: 'ctxWrapper'
    }) : _e(),
    /**
     * Ellipsis tooltip
     */
    hasTip ? h('vxe-tooltip', {
      props: Object.assign({}, tooltipStore, tooltipConfig),
      ref: 'tooltip'
    }) : _e(),
    /**
     * valid error tooltip
     */
    hasTip && editRules && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip') ? h('vxe-tooltip', {
      class: 'vxe-table--valid-error',
      props: validOpts.message === 'tooltip' || tableData.length === 1 ? Object.assign({}, validStore, tooltipConfig) : null,
      ref: 'validTip'
    }) : _e()])]);
  },
  methods: {
    clearSort: function clearSort() {
      this.tableFullColumn.forEach(function (column) {
        column.order = null;
      });
      this.tableFullData = this.data || [];
      this.tableData = this.getTableData(true).tableData;
      return this.$nextTick();
    },
    clearAll: function clearAll() {
      this.clearScroll();
      this.clearSort();
      this.clearFilter();
      this.clearCurrentRow();
      this.clearCurrentColumn();
      this.clearSelection();
      this.clearRowExpand();
      this.clearTreeExpand();
      this.clearChecked();
      this.clearSelected();
      this.clearActived();
      return this.$nextTick();
    },
    refreshData: function refreshData() {
      var _this2 = this;

      return this.$nextTick(function () {
        _this2.tableData = [];
        return _this2.$nextTick(function () {
          return _this2.loadData(_this2.tableFullData);
        });
      });
    },
    loadData: function loadData(datas, notRefresh) {
      var height = this.height,
          maxHeight = this.maxHeight,
          editStore = this.editStore,
          optimizeOpts = this.optimizeOpts,
          recalculate = this.recalculate;
      var scrollY = optimizeOpts.scrollY;
      var tableFullData = datas || [];
      var scrollYLoad = scrollY && scrollY.gt && scrollY.gt < tableFullData.length;
      editStore.insertList = [];
      editStore.removeList = []; // 全量数据

      this.tableFullData = tableFullData; // 缓存数据

      this.cacheDataMap(); // 原始数据

      this.tableSourceData = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.clone(tableFullData, true);
      this.scrollYLoad = scrollYLoad;

      if (scrollYLoad && !(height || maxHeight)) {
        throw new Error('[vxe-table] The height/max-height must be set for the scroll load.');
      }

      this.tableData = this.getTableData(true).tableData;
      this.reserveCheckSelection();
      this.checkSelectionStatus();
      var rest = this.$nextTick();

      if (!notRefresh) {
        rest = rest.then(recalculate);
      }

      return rest;
    },
    reloadData: function reloadData(datas) {
      this.clearAll();
      return this.loadData(datas).then(this.handleDefault);
    },
    loadColumn: function loadColumn(columns) {
      var _this3 = this;

      var collectColumn = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.mapTree(columns, function (column) {
        return packages_cell.createColumn(_this3, column);
      }, headerProps);
      this.collectColumn = collectColumn;
      this.tableFullColumn = UtilTools.getColumnList(collectColumn);

      if (this.customs) {
        this.mergeCustomColumn(this.customs);
      }

      this.cacheColumnMap();
      this.refreshColumn();
      return this.$nextTick();
    },
    reloadColumn: function reloadColumn(columns) {
      this.clearAll();
      return this.loadColumn(columns);
    },
    // 更新数据的 Map
    cacheDataMap: function cacheDataMap() {
      var treeConfig = this.treeConfig,
          tableFullData = this.tableFullData,
          fullDataIndexMap = this.fullDataIndexMap,
          fullDataRowIdMap = this.fullDataRowIdMap;
      var rowKey = UtilTools.getRowKey(this);
      fullDataIndexMap.clear();
      fullDataRowIdMap.clear();

      if (treeConfig) {
        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, function (row, index) {
          var rowPrimaryKey = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey);

          if (!rowPrimaryKey) {
            rowPrimaryKey = ++rowUniqueId;
            external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, rowKey, rowPrimaryKey);
          }

          fullDataRowIdMap.set("".concat(rowPrimaryKey), {
            rowKey: rowKey,
            row: row,
            index: index
          });
          fullDataIndexMap.set(row, {
            row: row,
            index: rowPrimaryKey
          });
        }, treeConfig);
      } else {
        tableFullData.forEach(function (row, rowIndex) {
          var rowPrimaryKey = rowIndex;

          if (rowKey) {
            rowPrimaryKey = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey);

            if (!rowPrimaryKey) {
              rowPrimaryKey = ++rowUniqueId;
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, rowKey, rowPrimaryKey);
            }
          }

          fullDataRowIdMap.set("".concat(rowPrimaryKey), {
            row: row,
            index: rowIndex
          });
          fullDataIndexMap.set(row, {
            row: row,
            rowPrimaryKey: rowPrimaryKey,
            index: rowIndex
          });
        });
      }
    },
    // 更新列的 Map
    cacheColumnMap: function cacheColumnMap() {
      var tableFullColumn = this.tableFullColumn,
          fullColumnIndexMap = this.fullColumnIndexMap;
      fullColumnIndexMap.clear();
      tableFullColumn.forEach(function (row, index) {
        fullColumnIndexMap.set(row, {
          row: row,
          index: index
        });
      });
    },
    getRowNode: function getRowNode(tr) {
      var _this4 = this;

      if (tr) {
        var treeConfig = this.treeConfig,
            tableFullData = this.tableFullData,
            fullDataRowIdMap = this.fullDataRowIdMap;
        var rowPrimaryKey = tr.getAttribute('data-rowid');

        if (treeConfig) {
          var matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (row, rowIndex) {
            return UtilTools.getRowPrimaryKey(_this4, row, rowIndex) === rowPrimaryKey;
          }, treeConfig);

          if (matchObj) {
            return matchObj;
          }
        } else {
          if (fullDataRowIdMap.has(rowPrimaryKey)) {
            var rest = fullDataRowIdMap.get(rowPrimaryKey);
            return {
              item: rest.row,
              index: rest.index,
              items: tableFullData
            };
          }
        }
      }

      return null;
    },
    getColumnNode: function getColumnNode(th) {
      if (th) {
        var isGroup = this.isGroup,
            fullColumnIdMap = this.fullColumnIdMap,
            tableFullColumn = this.tableFullColumn;
        var colId = th.getAttribute('data-colid');

        if (isGroup) {
          var matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullColumn, function (column) {
            return column.id === colId;
          }, headerProps);

          if (matchObj) {
            return matchObj;
          }
        } else {
          var column = fullColumnIdMap.get(colId);
          return {
            item: column,
            index: this.getColumnMapIndex(column),
            items: tableFullColumn
          };
        }
      }

      return null;
    },
    getRowMapIndex: function getRowMapIndex(row) {
      return this.fullDataIndexMap.has(row) ? this.fullDataIndexMap.get(row).index : -1;
    },
    getRowIndex: function getRowIndex(row) {
      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;
      return treeConfig ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
        return item === row;
      }, treeConfig) : this.getRowMapIndex(row);
    },
    getColumnMapIndex: function getColumnMapIndex(column) {
      return this.fullColumnIndexMap.has(column) ? this.fullColumnIndexMap.get(column).index : -1;
    },
    getColumnIndex: function getColumnIndex(column) {
      return this.getColumnMapIndex(column);
    },
    insert: function insert(records) {
      return this.insertAt(records);
    },

    /**
     * 从指定行插入数据
     */
    insertAt: function insertAt(records, row) {
      var _this5 = this,
          _arguments = arguments;

      var tableData = this.tableData,
          editStore = this.editStore,
          defineProperty = this.defineProperty,
          scrollYLoad = this.scrollYLoad,
          tableFullData = this.tableFullData;

      if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(records)) {
        records = [records];
      }

      var newRecords = records.map(function (record) {
        return defineProperty(record);
      });
      return new Promise(function (resolve) {
        if (_arguments.length === 1) {
          tableData.unshift.apply(tableData, newRecords);

          if (scrollYLoad) {
            tableFullData.unshift.apply(tableFullData, newRecords);

            _this5.updateAfterFullData();
          }
        } else {
          if (scrollYLoad) {
            throw new Error('[vxe-table] Virtual scroller does not support this operation.');
          }

          if (row === -1) {
            tableData.push.apply(tableData, newRecords);
          } else {
            var rowIndex = tableData.indexOf(row);
            tableData.splice.apply(tableData, [rowIndex, 0].concat(newRecords));
          }
        }

        [].unshift.apply(editStore.insertList, newRecords);

        _this5.checkSelectionStatus();

        _this5.$nextTick(function () {
          _this5.recalculate();

          resolve({
            row: newRecords.length ? newRecords[newRecords.length - 1] : null,
            rows: newRecords
          });
        });
      });
    },
    defineProperty: function defineProperty(record) {
      var recordItem = Object.assign({}, record);
      var rowKey = UtilTools.getRowKey(this);
      this.visibleColumn.forEach(function (column) {
        if (column.property && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.has(recordItem, column.property)) {
          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(recordItem, column.property, null);
        }
      }); // 如果设置了 Key 就必须要唯一，可以自行设置；如果为空，则默认生成一个随机数

      if (rowKey && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(recordItem, rowKey)) {
        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(recordItem, rowKey, ++rowUniqueId);
      }

      return recordItem;
    },

    /**
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     */
    remove: function remove(rows) {
      var _this6 = this;

      var tableData = this.tableData,
          tableFullData = this.tableFullData,
          editStore = this.editStore,
          treeConfig = this.treeConfig,
          _this$selectConfig2 = this.selectConfig,
          selectConfig = _this$selectConfig2 === void 0 ? {} : _this$selectConfig2,
          selection = this.selection,
          hasRowInsert = this.hasRowInsert;
      var removeList = editStore.removeList,
          insertList = editStore.insertList;
      var property = selectConfig.checkField || selectConfig.checkProp;
      var rest = [];
      this.isUpdateData = true;

      if (rows) {
        if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        if (treeConfig) {
          rows.forEach(function (row) {
            var matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
              return item === row;
            }, treeConfig);

            if (matchObj) {
              var item = matchObj.item,
                  items = matchObj.items,
                  index = matchObj.index; // 如果是新增，则保存记录

              if (!hasRowInsert(item)) {
                removeList.push(item);
              } // 从树节点中移除


              var restRow = items.splice(index, 1)[0]; // 如果绑定了多选属性，则更新状态

              if (!property) {
                external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, function (row) {
                  return rows.indexOf(row) > -1;
                });
              }

              rest.push(restRow);
            }
          });
        } else {
          // 如果是新增，则保存记录
          rows.forEach(function (row) {
            if (!hasRowInsert(row)) {
              removeList.push(row);
            }
          }); // 从数据源中移除

          rest = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(tableFullData, function (row) {
            return rows.indexOf(row) > -1;
          }); // 如果绑定了多选属性，则更新状态

          if (!property) {
            external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, function (row) {
              return rows.indexOf(row) > -1;
            });
          } // 从列表中移除


          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(tableData, function (row) {
            return rows.indexOf(row) > -1;
          });
        }

        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(insertList, function (row) {
          return rows.indexOf(row) > -1;
        });
      }

      this.checkSelectionStatus();
      return this.$nextTick().then(function () {
        _this6.recalculate();

        return {
          row: rows && rows.length ? rows[rows.length - 1] : null,
          rows: rest
        };
      });
    },

    /**
     * 删除选中数据
     */
    removeSelecteds: function removeSelecteds() {
      var _this7 = this;

      return this.remove(this.getSelectRecords()).then(function (params) {
        _this7.clearSelection();

        return params;
      });
    },

    /**
     * 还原数据
     * 如果不传任何参数，则还原整个表格
     * 如果传 row 则还原一行
     * 如果传 rows 则还原多行
     * 如果还额外传了 field 则还原指定单元格
     */
    revert: function revert(rows, field) {
      var tableSourceData = this.tableSourceData,
          tableFullData = this.tableFullData;

      if (arguments.length) {
        if (rows && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        rows.forEach(function (row) {
          var rowIndex = tableFullData.indexOf(row);
          var oRow = tableSourceData[rowIndex];

          if (oRow && row) {
            if (field) {
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, field, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(oRow, field));
            } else {
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.destructuring(row, oRow);
            }
          }
        });
        return this.$nextTick();
      }

      return this.reloadData(tableSourceData);
    },

    /**
     * 清空单元格内容
     * 如果不创参数，则清空整个表格内容
     * 如果传 row 则清空一行内容
     * 如果传 rows 则清空多行内容
     * 如果还额外传了 field 则清空指定单元格内容
     */
    clearData: function clearData(rows, field) {
      var tableSourceData = this.tableSourceData,
          visibleColumn = this.visibleColumn;

      if (!arguments.length) {
        rows = tableSourceData;
      } else if (rows && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      }

      if (field) {
        rows.forEach(function (row) {
          return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, field, null);
        });
      } else {
        rows.forEach(function (row) {
          visibleColumn.forEach(function (column) {
            if (column.property) {
              UtilTools.setCellValue(row, column, null);
            }
          });
        });
      }

      return this.$nextTick();
    },
    hasRowInsert: function hasRowInsert(row) {
      var treeConfig = this.treeConfig,
          tableSourceData = this.tableSourceData;

      if (treeConfig) {
        return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableSourceData, function (item) {
          return item === row;
        }, treeConfig);
      }

      return this.getRowMapIndex(row) === -1;
    },
    hasRowChange: function hasRowChange(row, field) {
      var tableSourceData = this.tableSourceData,
          treeConfig = this.treeConfig;
      var rowKey = UtilTools.getRowKey(this);
      var oRow;

      if (rowKey || treeConfig) {
        var rowPrimaryKey = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey);

        if (treeConfig) {
          var children = treeConfig.children;
          var matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableSourceData, function (row) {
            return rowPrimaryKey === external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey);
          }, treeConfig);
          row = Object.assign({}, row, _defineProperty({}, children, null));

          if (matchObj) {
            oRow = Object.assign({}, matchObj.item, _defineProperty({}, children, null));
          }
        } else {
          oRow = tableSourceData.find(function (row) {
            return rowPrimaryKey === external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey);
          });
        }
      } else {
        var oRowIndex = this.getRowMapIndex(row);
        oRow = tableSourceData[oRowIndex];
      }

      if (arguments.length > 1) {
        return oRow && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isEqual(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(oRow, field), external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, field));
      }

      return oRow && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isEqual(oRow, row);
    },

    /**
     * 获取表格所有列
     */
    getColumns: function getColumns(columnIndex) {
      var columns = this.visibleColumn;
      return arguments.length ? columns[columnIndex] : columns.slice(0);
    },

    /**
     * 获取表格可视列
     */
    getTableColumn: function getTableColumn() {
      return this.tableColumn;
    },

    /**
     * 获取表格所有数据
     */
    getRecords: function getRecords(rowIndex) {
      var list = this.tableFullData;
      return arguments.length ? list[rowIndex] : list.slice(0);
    },

    /**
     * 获取表格数据集合
     */
    getAllRecords: function getAllRecords() {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      };
    },

    /**
     * 获取新增数据
     */
    getInsertRecords: function getInsertRecords() {
      return this.editStore.insertList;
    },

    /**
     * 获取删除数据
     */
    getRemoveRecords: function getRemoveRecords() {
      return this.editStore.removeList;
    },

    /**
     * 获取选中数据
     */
    getSelectRecords: function getSelectRecords() {
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          treeConfig = this.treeConfig,
          _this$selectConfig3 = this.selectConfig,
          selectConfig = _this$selectConfig3 === void 0 ? {} : _this$selectConfig3,
          selection = this.selection;
      var property = selectConfig.checkField || selectConfig.checkProp;
      var rowList = [];
      var insList = [];

      if (property) {
        if (treeConfig) {
          rowList = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
            return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property);
          }, treeConfig);
        } else {
          rowList = tableFullData.filter(function (row) {
            return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property);
          });
        }

        insList = editStore.insertList.filter(function (row) {
          return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property);
        });
      } else {
        if (treeConfig) {
          rowList = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
            return selection.indexOf(row) > -1;
          }, treeConfig);
        } else {
          rowList = tableFullData.filter(function (row) {
            return selection.indexOf(row) > -1;
          });
        }

        insList = editStore.insertList.filter(function (row) {
          return selection.indexOf(row) > -1;
        });
      }

      return rowList.concat(insList);
    },

    /**
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    getUpdateRecords: function getUpdateRecords() {
      var tableFullData = this.tableFullData,
          hasRowChange = this.hasRowChange,
          treeConfig = this.treeConfig;

      if (treeConfig) {
        return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
          return hasRowChange(row);
        }, treeConfig);
      }

      return tableFullData.filter(function (row) {
        return hasRowChange(row);
      });
    },

    /**
     * 获取处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    updateAfterFullData: function updateAfterFullData() {
      var visibleColumn = this.visibleColumn,
          tableFullData = this.tableFullData,
          remoteFilter = this.remoteFilter;
      var column = this.visibleColumn.find(function (column) {
        return column.order;
      });
      var tableData = tableFullData;
      var filterColumn = visibleColumn.filter(function (_ref) {
        var filters = _ref.filters;
        return filters && filters.length;
      });
      tableData = tableData.filter(function (row) {
        return filterColumn.every(function (column) {
          var property = column.property,
              filters = column.filters,
              filterMethod = column.filterMethod,
              filterRender = column.filterRender;
          var compConf = filterRender ? Renderer.get(filterRender.name) : null;
          var valueList = [];
          var itemList = [];

          if (filters && filters.length) {
            filters.forEach(function (item) {
              if (item.checked) {
                itemList.push(item);
                valueList.push(item.value);
              }
            });

            if (valueList.length && !remoteFilter) {
              if (!filterMethod && compConf && compConf.renderFilter) {
                filterMethod = compConf.filterMethod;
              }

              return filterMethod ? itemList.some(function (item) {
                return filterMethod({
                  value: item.value,
                  option: item,
                  row: row,
                  column: column
                });
              }) : valueList.indexOf(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property)) > -1;
            }
          }

          return true;
        });
      });

      if (column && column.order) {
        var rest = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.sortBy(tableData, column.property);
        tableData = column.order === 'desc' ? rest.reverse() : rest;
      }

      this.afterFullData = tableData;
      return tableData;
    },

    /**
     * 获取处理后的表格数据
     * 如果存在筛选条件，继续处理
     * 如果存在排序，继续处理
     */
    getTableData: function getTableData(force) {
      var scrollYLoad = this.scrollYLoad,
          scrollYStore = this.scrollYStore;
      var fullData = force ? this.updateAfterFullData() : this.afterFullData;
      return {
        fullData: fullData,
        tableData: scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0)
      };
    },
    handleDefault: function handleDefault() {
      if (this.selectConfig) {
        this.handleSelectionDefChecked();
      }

      if (this.radioConfig) {
        this.handleRadioDefChecked();
      }

      if (this.expandConfig) {
        this.handleDefaultRowExpand();
      }

      if (this.treeConfig) {
        this.handleDefaultTreeExpand();
      }

      this.updateFooter();
      this.$nextTick(this.recalculate);
    },

    /**
     * 动态列处理
     */
    mergeCustomColumn: function mergeCustomColumn(customColumns) {
      this.isUpdateCustoms = true;
      this.tableFullColumn.forEach(function (column) {
        // 在 v3.0 中废弃 prop
        var item = customColumns.find(function (item) {
          return column.property && (item.field || item.prop) === column.property;
        });
        column.visible = item ? !!item.visible : true;
      });
      this.$emit('update:customs', this.tableFullColumn);
    },

    /**
     * 初始化加载动态列
     */
    reloadCustoms: function reloadCustoms(customColumns) {
      var _this8 = this;

      return this.$nextTick().then(function () {
        _this8.mergeCustomColumn(customColumns);

        return _this8.refreshColumn().then(function () {
          return _this8.tableFullColumn;
        });
      });
    },

    /**
     * 刷新列信息
     * 将固定的列左边、右边分别靠边
     * 如果使用了分组表头，固定列必须在左侧或者右侧
     */
    refreshColumn: function refreshColumn() {
      var isColspan;
      var letIndex = 0;
      var leftList = [];
      var rightIndex = 0;
      var centerList = [];
      var rightList = [];
      var collectColumn = this.collectColumn,
          tableFullColumn = this.tableFullColumn,
          isGroup = this.isGroup,
          columnStore = this.columnStore,
          scrollXStore = this.scrollXStore,
          optimizeOpts = this.optimizeOpts;
      var scrollX = optimizeOpts.scrollX; // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏

      if (isGroup) {
        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(collectColumn, function (column) {
          if (column.children && column.children.length) {
            column.visible = !!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(column.children, function (subColumn) {
              return subColumn.children && subColumn.children.length ? 0 : subColumn.visible;
            }, headerProps);
          }
        }, headerProps);
      } // 重新分配列


      tableFullColumn.filter(function (column) {
        return column.visible;
      }).forEach(function (column, columnIndex) {
        if (column.fixed === 'left') {
          if (!isColspan) {
            if (columnIndex - letIndex !== 0) {
              isColspan = true;
            } else {
              letIndex++;
            }
          }

          leftList.push(column);
        } else if (column.fixed === 'right') {
          if (!isColspan) {
            if (!rightIndex) {
              rightIndex = columnIndex;
            }

            if (columnIndex - rightIndex !== 0) {
              isColspan = true;
            } else {
              rightIndex++;
            }
          }

          rightList.push(column);
        } else {
          centerList.push(column);
        }
      });
      var visibleColumn = leftList.concat(centerList).concat(rightList);
      var scrollXLoad = scrollX && scrollX.gt && scrollX.gt < tableFullColumn.length;
      Object.assign(columnStore, {
        leftList: leftList,
        centerList: centerList,
        rightList: rightList
      });

      if (isColspan && isGroup || rightIndex && rightIndex !== visibleColumn.length) {
        throw new Error('[vxe-table] Fixed column must to the left and right sides.');
      }

      if (scrollXLoad) {
        Object.assign(scrollXStore, {
          startIndex: 0,
          visibleIndex: 0,
          renderSize: scrollX.rSize,
          offsetSize: scrollX.oSize
        });
        visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
      }

      this.scrollXLoad = scrollXLoad;
      this.tableColumn = visibleColumn; // 需要计算两次，解决隐藏列首次被显示无宽度造成闪动问题

      return this.$nextTick().then(this.recalculate).then(this.recalculate);
    },

    /**
     * 指定列宽的列进行拆分
     */
    analyColumnWidth: function analyColumnWidth() {
      var resizeList = [];
      var pxList = [];
      var pxMinList = [];
      var scaleList = [];
      var scaleMinList = [];
      var autoList = [];
      this.tableFullColumn.forEach(function (column) {
        if (column.visible) {
          if (column.resizeWidth) {
            resizeList.push(column);
          } else if (DomTools.isPx(column.width)) {
            pxList.push(column);
          } else if (DomTools.isScale(column.width)) {
            scaleList.push(column);
          } else if (DomTools.isPx(column.minWidth)) {
            pxMinList.push(column);
          } else if (DomTools.isScale(column.minWidth)) {
            scaleMinList.push(column);
          } else {
            autoList.push(column);
          }
        }
      });
      Object.assign(this.columnStore, {
        resizeList: resizeList,
        pxList: pxList,
        pxMinList: pxMinList,
        scaleList: scaleList,
        scaleMinList: scaleMinList,
        autoList: autoList
      });
    },

    /**
     * 计算单元格列宽，动态分配可用剩余空间
     * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
     */
    recalculate: function recalculate(refull) {
      var _this9 = this;

      var _this$$refs = this.$refs,
          tableBody = _this$$refs.tableBody,
          tableHeader = _this$$refs.tableHeader,
          tableFooter = _this$$refs.tableFooter;
      var bodyElem = tableBody ? tableBody.$el : null;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;

      if (bodyElem) {
        var bodyWidth = bodyElem.clientWidth; // let tableWidth = this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)

        this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth);

        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return this.computeScrollLoad().then(function () {
            bodyWidth = bodyElem.clientWidth; // if (bodyWidth !== tableWidth) {

            _this9.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth); // }


            _this9.computeScrollLoad();
          });
        }
      }

      return this.computeScrollLoad();
    },
    // 列宽计算
    autoCellWidth: function autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth) {
      var meanWidth;
      var tableWidth = 0;
      var minCellWidth = 40; // 列宽最少限制 40px

      var remainWidth = bodyWidth;
      var $el = this.$el,
          fit = this.fit,
          columnStore = this.columnStore;
      var resizeList = columnStore.resizeList,
          pxMinList = columnStore.pxMinList,
          pxList = columnStore.pxList,
          scaleList = columnStore.scaleList,
          scaleMinList = columnStore.scaleMinList,
          autoList = columnStore.autoList; // 最小宽

      pxMinList.forEach(function (column) {
        var minWidth = parseInt(column.minWidth);
        tableWidth += minWidth;
        column.renderWidth = minWidth;
      }); // 最小百分比

      meanWidth = remainWidth / 100;
      scaleMinList.forEach(function (column) {
        var scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      }); // 固定百分比

      scaleList.forEach(function (column) {
        var scaleWidth = Math.floor(parseInt(column.width) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      }); // 固定宽

      pxList.forEach(function (column) {
        var width = parseInt(column.width);
        tableWidth += width;
        column.renderWidth = width;
      }); // 调整了列宽

      resizeList.forEach(function (column) {
        var width = parseInt(column.resizeWidth);
        tableWidth += width;
        column.renderWidth = width;
      });
      remainWidth -= tableWidth;
      meanWidth = remainWidth > 0 ? Math.max(Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)), minCellWidth) : minCellWidth;

      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).forEach(function (column) {
            tableWidth += meanWidth;
            column.renderWidth += meanWidth;
          });
        }
      } else {
        meanWidth = minCellWidth;
      } // 自适应


      autoList.forEach(function (column, index) {
        column.renderWidth = meanWidth;
        tableWidth += meanWidth;

        if (fit && index === autoList.length - 1) {
          // 如果所有列足够放的情况下，修补列之间的误差
          var odiffer = bodyWidth - tableWidth;

          if (odiffer > 0) {
            column.renderWidth += odiffer;
            tableWidth = bodyWidth;
          }
        }
      });
      var tableHeight = bodyElem.offsetHeight;
      var overflowY = bodyElem.scrollHeight > bodyElem.clientHeight;
      this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyWidth : 0;
      this.overflowY = overflowY;
      this.tableWidth = tableWidth;
      this.tableHeight = tableHeight;
      this.containerHeight = $el.parentNode.clientHeight;

      if (headerElem) {
        this.headerHeight = headerElem.offsetHeight;
      }

      if (footerElem) {
        var footerHeight = footerElem.offsetHeight;
        this.scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0);
        this.overflowX = tableWidth > footerElem.clientWidth;
        this.footerHeight = footerHeight;
      } else {
        this.scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0);
        this.overflowX = tableWidth > bodyWidth;
      }

      if (this.overflowX) {
        this.checkScrolling();
      }

      return tableWidth;
    },

    /**
     * 处理固定列的显示状态
     */
    checkScrolling: function checkScrolling() {
      var _this$$refs2 = this.$refs,
          tableBody = _this$$refs2.tableBody,
          leftBody = _this$$refs2.leftBody,
          rightBody = _this$$refs2.rightBody;
      var bodyElem = tableBody ? tableBody.$el : null;

      if (bodyElem) {
        if (leftBody) {
          this.scrollLeftToRight = bodyElem.scrollLeft > 0;
        }

        if (rightBody) {
          this.scrollRightToLeft = bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft;
        }
      }
    },
    preventEvent: function preventEvent(evnt, type, args, callback) {
      var _this10 = this;

      var evntList = Interceptor.get(type);

      if (!evntList.some(function (func) {
        return func(args, evnt, _this10) === false;
      })) {
        callback();
      }
    },

    /**
     * 全局按下事件处理
     */
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var _this11 = this;

      var $refs = this.$refs,
          editStore = this.editStore,
          ctxMenuStore = this.ctxMenuStore,
          _this$editConfig = this.editConfig,
          editConfig = _this$editConfig === void 0 ? {} : _this$editConfig,
          filterStore = this.filterStore;
      var actived = editStore.actived;
      var filterWrapper = $refs.filterWrapper,
          validTip = $refs.validTip;

      if (filterWrapper) {
        if (this.getEventTargetNode(evnt, this.$el, 'vxe-filter-wrapper').flag) {// 如果点击了筛选按钮
        } else if (this.getEventTargetNode(evnt, filterWrapper.$el).flag) {// 如果点击筛选容器
        } else {
          this.preventEvent(evnt, 'event.clear_filter', filterStore.args, this.closeFilter);
        }
      } // 如果已激活了编辑状态


      if (actived.row) {
        if (!(editConfig.autoClear === false)) {
          if (validTip && this.getEventTargetNode(evnt, validTip.$el).flag) {// 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
            this.preventEvent(evnt, 'event.clear_actived', actived.args, function () {
              var isClear;
              var isReadonlyCol = !_this11.getEventTargetNode(evnt, _this11.$el, 'col--edit').flag; // row 方式

              if (editConfig.mode === 'row') {
                var rowNode = _this11.getEventTargetNode(evnt, _this11.$el, 'vxe-body--row');

                var isOtherRow = rowNode.flag ? rowNode.targetElem !== actived.args.cell.parentNode : 0;

                if (editConfig.trigger === 'manual') {
                  // manual 触发，如果点击了不同行
                  isClear = isOtherRow;
                } else {
                  // click,dblclick 触发，如果点击了不同行的非编辑列
                  isClear = isOtherRow && isReadonlyCol;
                }
              } else {
                // cell 方式，如果是非编辑列
                isClear = isReadonlyCol;
              }

              if (isClear || // 如果点击了当前表格之外
              !_this11.getEventTargetNode(evnt, _this11.$el).flag) {
                // this.triggerValidate('blur').then(a => {
                // 保证 input 的 change 事件能先触发之后再清除
                setTimeout(_this11.clearActived); // }).catch(e => e)
              }
            });
          }
        }
      } // 如果配置了快捷菜单且，点击了其他地方则关闭


      if (ctxMenuStore.visible && this.$refs.ctxWrapper && !this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
        this.closeMenu();
      }
    },

    /**
     * 窗口失焦事件处理
     */
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      this.closeFilter();
      this.closeMenu();
    },

    /**
     * 全局滚动事件
     */
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      this.clostTooltip();
      this.closeMenu();
    },

    /**
     * 全局键盘事件
     */
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var params;
      var isCtxMenu = this.isCtxMenu,
          ctxMenuStore = this.ctxMenuStore,
          editStore = this.editStore,
          _this$mouseConfig = this.mouseConfig,
          mouseConfig = _this$mouseConfig === void 0 ? {} : _this$mouseConfig,
          _this$keyboardConfig = this.keyboardConfig,
          keyboardConfig = _this$keyboardConfig === void 0 ? {} : _this$keyboardConfig;
      var selected = editStore.selected,
          actived = editStore.actived;
      var keyCode = evnt.keyCode;
      var isBack = keyCode === 8;
      var isTab = keyCode === 9;
      var isEnter = keyCode === 13;
      var isEsc = keyCode === 27;
      var isSpacebar = keyCode === 32;
      var isLeftArrow = keyCode === 37;
      var isUpArrow = keyCode === 38;
      var isRightArrow = keyCode === 39;
      var isDwArrow = keyCode === 40;
      var isDel = keyCode === 46;
      var isC = keyCode === 67;
      var isV = keyCode === 86;
      var isX = keyCode === 88;
      var isF2 = keyCode === 113;
      var isCtrlKey = evnt.ctrlKey;
      var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
      var operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);

      if (isEsc) {
        // 如果按下了 Esc 键，关闭快捷菜单、筛选
        this.closeMenu();
        this.closeFilter(); // 如果是激活编辑状态，则取消编辑

        if (actived.row) {
          params = actived.args;
          this.clearActived(evnt); // 如果配置了选中功能，则为选中状态

          if (mouseConfig.selected) {
            this.handleSelected(params, evnt);
          }
        }
      } else if (isEnter && (keyboardConfig.isArrow || keyboardConfig.isTab) && (selected.row || actived.row)) {
        // 如果是激活状态，退则出到下一行
        this.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt);
      } else if (operCtxMenu) {
        // 如果配置了右键菜单; 支持方向键操作、回车
        evnt.preventDefault();

        if (ctxMenuStore.showChild && UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
        } else {
          this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, this.ctxMenuList);
        }
      } else if (isF2) {
        // 如果按下了 F2 键
        if (selected.row && selected.column) {
          this.handleActived(selected.args, evnt);
        }
      } else if (operArrow && keyboardConfig.isArrow) {
        // 如果按下了方向键
        if (selected.row && selected.column) {
          evnt.preventDefault();
          this.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
        }
      } else if (isTab && keyboardConfig.isTab) {
        // 如果按下了 Tab 键切换
        if (selected.row || selected.column) {
          evnt.preventDefault();
          this.moveTabSelected(selected.args, evnt);
        } else if (actived.row || actived.column) {
          evnt.preventDefault();
          this.moveTabSelected(actived.args, evnt);
        }
      } else if (isDel || isBack) {
        // 如果是删除键
        if (keyboardConfig.isDel && (selected.row || selected.column)) {
          UtilTools.setCellValue(selected.row, selected.column, null);

          if (isBack) {
            this.handleActived(selected.args, evnt);
          }
        }
      } else if (keyboardConfig.isCut && isCtrlKey && (isX || isC || isV)) {
        // 如果开启复制功能
        if (isX || isC) {
          this.handleCopyed(isX, evnt);
        } else {
          this.handlePaste(evnt);
        }
      } else if (keyboardConfig.isEdit && !isCtrlKey && (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222 || keyCode === 32)) {
        // 如果是按下非功能键之外允许直接编辑
        if (selected.row || selected.column) {
          if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
            UtilTools.setCellValue(selected.row, selected.column, null);
            this.handleActived(selected.args, evnt);
          }
        }
      }
    },
    // 处理 Tab 键移动
    moveTabSelected: function moveTabSelected(args, evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editConfig = this.editConfig;
      var nextRow;
      var nextRowIndex;
      var nextColumn;
      var nextColumnIndex;
      var params = Object.assign({}, args);
      var rowIndex = tableData.indexOf(params.row);
      var columnIndex = visibleColumn.indexOf(params.column);

      for (var index = columnIndex + 1; index < visibleColumn.length; index++) {
        if (visibleColumn[index].editRender) {
          nextColumnIndex = index;
          nextColumn = visibleColumn[index];
          break;
        }
      }

      if (!nextColumn && rowIndex < tableData.length - 1) {
        // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
        nextRowIndex = rowIndex + 1;
        nextRow = tableData[nextRowIndex];

        for (var _index = 0; _index < visibleColumn.length; _index++) {
          if (visibleColumn[_index].editRender) {
            nextColumnIndex = _index;
            nextColumn = visibleColumn[_index];
            break;
          }
        }
      }

      if (nextColumn) {
        if (nextRow) {
          params.rowIndex = nextRowIndex;
          params.row = nextRow;
        } else {
          params.rowIndex = rowIndex;
        }

        params.columnIndex = nextColumnIndex;
        params.column = nextColumn;
        params.cell = DomTools.getCell(this, params);

        if (editConfig) {
          if (editConfig.trigger === 'click' || editConfig.trigger === 'dblclick') {
            if (editConfig.mode === 'row') {
              this.handleActived(params, evnt);
            } else {
              this.handleSelected(params, evnt);
            }
          }
        }
      }
    },
    // 处理方向键移动
    moveSelected: function moveSelected(args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          handleSelected = this.handleSelected;
      var params = Object.assign({}, args);

      if (isUpArrow && params.rowIndex) {
        params.rowIndex -= 1;
        params.row = tableData[params.rowIndex];
      } else if (isDwArrow && params.rowIndex < tableData.length - 1) {
        params.rowIndex += 1;
        params.row = tableData[params.rowIndex];
      } else if (isLeftArrow && params.columnIndex) {
        for (var len = params.columnIndex - 1; len >= 0; len--) {
          if (visibleColumn[len].editRender) {
            params.columnIndex = len;
            params.column = visibleColumn[len];
            break;
          }
        }
      } else if (isRightArrow && params.columnIndex) {
        for (var index = params.columnIndex + 1; index < visibleColumn.length; index++) {
          if (visibleColumn[index].editRender) {
            params.columnIndex = index;
            params.column = visibleColumn[index];
            break;
          }
        }
      }

      params.cell = DomTools.getCell(this, params);
      handleSelected(params, evnt);
    },
    // 处理菜单的移动
    moveCtxMenu: function moveCtxMenu(evnt, keyCode, ctxMenuStore, property, operKey, operRest, menuList) {
      var selectIndex = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findIndexOf(menuList, function (item) {
        return ctxMenuStore[property] === item;
      });

      if (keyCode === operKey) {
        if (operRest && UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          ctxMenuStore.showChild = true;
        } else {
          ctxMenuStore.showChild = false;
          ctxMenuStore.selectChild = null;
        }
      } else if (keyCode === 38) {
        ctxMenuStore[property] = menuList[selectIndex - 1] || menuList[menuList.length - 1];
      } else if (keyCode === 40) {
        ctxMenuStore[property] = menuList[selectIndex + 1] || menuList[0];
      } else if (ctxMenuStore[property] && (keyCode === 13 || keyCode === 32)) {
        this.ctxMenuLinkEvent(evnt, ctxMenuStore[property]);
      }
    },
    handleGlobalResizeEvent: function handleGlobalResizeEvent() {
      this.recalculate();
    },

    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent: function handleGlobalContextmenuEvent(evnt) {
      var isCtxMenu = this.isCtxMenu,
          ctxMenuStore = this.ctxMenuStore;

      if (isCtxMenu) {
        if (ctxMenuStore.visible) {
          if (ctxMenuStore.visible && this.$refs.ctxWrapper && this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
            evnt.preventDefault();
            return;
          }
        } // 右键头部


        var headeWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--header-wrapper');

        if (headeWrapperNode.flag) {
          this.openContextMenu(evnt, 'header', {});
          return;
        } // 右键内容


        var bodyWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--body-wrapper');

        if (bodyWrapperNode.flag) {
          this.openContextMenu(evnt, 'body', {});
          return;
        } // 右键表尾


        var footerWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--footer-wrapper');

        if (footerWrapperNode.flag) {
          this.openContextMenu(evnt, 'footer', {});
          return;
        }
      }

      this.closeMenu();
      this.closeFilter();
    },

    /**
     * 显示快捷菜单
     */
    openContextMenu: function openContextMenu(evnt, type, params) {
      var _this12 = this;

      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          ctxMenuStore = this.ctxMenuStore,
          ctxMenuConfig = this.ctxMenuConfig,
          fullDataRowIdMap = this.fullDataRowIdMap,
          tableFullColumn = this.tableFullColumn;
      var config = ctxMenuConfig[type];

      if (config) {
        var options = config.options,
            visibleMethod = config.visibleMethod,
            disabled = config.disabled;

        if (disabled) {
          evnt.preventDefault();
        } else if (options && options.length) {
          if (!visibleMethod || visibleMethod(params, evnt)) {
            evnt.preventDefault();

            var _DomTools$getDomNode = DomTools.getDomNode(),
                scrollTop = _DomTools$getDomNode.scrollTop,
                scrollLeft = _DomTools$getDomNode.scrollLeft,
                visibleHeight = _DomTools$getDomNode.visibleHeight,
                visibleWidth = _DomTools$getDomNode.visibleWidth;

            var _this$getEventTargetN = this.getEventTargetNode(evnt, this.$el, "vxe-".concat(type, "--column")),
                targetElem = _this$getEventTargetN.targetElem,
                flag = _this$getEventTargetN.flag;

            var args = {
              type: type,
              $table: this
            };

            if (flag) {
              var _DomTools$getCellInde = DomTools.getCellIndexs(targetElem),
                  rowPrimaryKey = _DomTools$getCellInde.rowPrimaryKey,
                  rowIndex = _DomTools$getCellInde.rowIndex,
                  colIndex = _DomTools$getCellInde.colIndex,
                  columnIndex = _DomTools$getCellInde.columnIndex;

              var column = colIndex ? tableFullColumn[colIndex] : visibleColumn[columnIndex];

              if (type === 'body') {
                var _ref2 = rowPrimaryKey ? fullDataRowIdMap.get(rowPrimaryKey) : tableData[rowIndex],
                    row = _ref2.row;

                args.row = row;
                args.rowIndex = rowIndex;
              }

              Object.assign(args, {
                column: column,
                columnIndex: columnIndex,
                cell: targetElem
              });
            }

            var top = evnt.clientY + scrollTop;
            var left = evnt.clientX + scrollLeft;
            Object.assign(ctxMenuStore, {
              args: args,
              visible: true,
              list: options,
              selected: null,
              selectChild: null,
              showChild: false,
              style: {
                top: "".concat(top, "px"),
                left: "".concat(left, "px")
              }
            });
            this.$nextTick(function () {
              var ctxElem = _this12.$refs.ctxWrapper.$el;
              var clientHeight = ctxElem.clientHeight;
              var clientWidth = ctxElem.clientWidth;
              var offsetTop = evnt.clientY + clientHeight - visibleHeight;
              var offsetLeft = evnt.clientX + clientWidth - visibleWidth;

              if (offsetTop > -10) {
                ctxMenuStore.style.top = "".concat(top - clientHeight, "px");
              }

              if (offsetLeft > -10) {
                ctxMenuStore.style.left = "".concat(left - clientWidth, "px");
              }
            });
          } else {
            this.closeMenu();
          }
        }
      }

      this.closeFilter();
    },

    /**
     * 关闭快捷菜单
     */
    closeMenu: function closeMenu() {
      Object.assign(this.ctxMenuStore, {
        visible: false,
        selected: null,
        selectChild: null,
        showChild: false
      });
      return this.$nextTick();
    },
    ctxMenuMouseoverEvent: function ctxMenuMouseoverEvent(evnt, item, child) {
      var ctxMenuStore = this.ctxMenuStore;
      evnt.preventDefault();
      evnt.stopPropagation();
      ctxMenuStore.selected = item;
      ctxMenuStore.selectChild = child;

      if (!child) {
        ctxMenuStore.showChild = UtilTools.hasChildrenList(item);
      }
    },
    ctxMenuMouseoutEvent: function ctxMenuMouseoutEvent(evnt, item, child) {
      var ctxMenuStore = this.ctxMenuStore;

      if (!item.children) {
        ctxMenuStore.selected = null;
      }

      ctxMenuStore.selectChild = null;
    },

    /**
     * 快捷菜单点击事件
     */
    ctxMenuLinkEvent: function ctxMenuLinkEvent(evnt, menu) {
      if (!menu.disabled && (!menu.children || !menu.children.length)) {
        UtilTools.emitEvent(this, 'context-menu-click', [Object.assign({
          menu: menu
        }, this.ctxMenuStore.args), evnt]);
        this.closeMenu();
      }
    },

    /**
     * 触发表头 tooltip 事件
     */
    triggerHeaderTooltipEvent: function triggerHeaderTooltipEvent(evnt, _ref3) {
      var column = _ref3.column;
      var tooltipStore = this.tooltipStore;
      var own = column.own;

      if (tooltipStore.column !== column || !tooltipStore.visible) {
        this.showTooltip(evnt, own.title || own.label, column);
      }
    },

    /**
     * 触发 tooltip 事件
     */
    triggerTooltipEvent: function triggerTooltipEvent(evnt, params) {
      var editConfig = this.editConfig,
          editStore = this.editStore,
          tooltipStore = this.tooltipStore;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column;

      if (editConfig) {
        if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {
          return;
        }
      }

      if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
        this.showTooltip(evnt, UtilTools.getCellLabel(row, column, params), column, row);
      }
    },
    // 显示 tooltip
    showTooltip: function showTooltip(evnt, content, column, row) {
      var cell = evnt.currentTarget;
      var tooltip = this.$refs.tooltip;
      var wrapperElem = cell.children[0];

      if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
        Object.assign(this.tooltipStore, {
          row: row,
          column: column,
          content: UtilTools.formatText(content),
          visible: true
        });

        if (tooltip) {
          tooltip.toVisible(cell);
        }
      }

      return this.$nextTick();
    },
    // 关闭 tooltip
    clostTooltip: function clostTooltip() {
      var tooltip = this.$refs.tooltip;
      Object.assign(this.tooltipStore, {
        row: null,
        column: null,
        content: null,
        visible: false
      });

      if (tooltip) {
        tooltip.close();
      }

      return this.$nextTick();
    },

    /**
     * 处理复选框默认勾选
     */
    handleSelectionDefChecked: function handleSelectionDefChecked() {
      var _this$selectConfig4 = this.selectConfig,
          selectConfig = _this$selectConfig4 === void 0 ? {} : _this$selectConfig4,
          fullDataRowIdMap = this.fullDataRowIdMap;
      var checkAll = selectConfig.checkAll,
          checkRowKeys = selectConfig.checkRowKeys;

      if (checkAll) {
        this.setAllSelection(true);
      } else if (checkRowKeys) {
        var property = UtilTools.getRowKey(this);

        if (!property) {
          throw new Error('[vxe-table] Checked rows must have a unique primary key (row-id | row-key).');
        }

        this.setSelection(checkRowKeys.map(function (checkKey) {
          return fullDataRowIdMap.get(checkKey).row;
        }), true);
      }
    },
    setSelection: function setSelection(rows, value) {
      var _this13 = this;

      if (rows && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      }

      rows.forEach(function (row) {
        return _this13.handleSelectRow(null, {
          row: row
        }, !!value);
      });
      return this.$nextTick();
    },

    /**
     * 多选，行选中处理
     * value 选中true 不选false 不确定-1
     */
    handleSelectRow: function handleSelectRow(evnt, _ref4, value) {
      var row = _ref4.row;
      var selection = this.selection,
          tableFullData = this.tableFullData,
          _this$selectConfig5 = this.selectConfig,
          selectConfig = _this$selectConfig5 === void 0 ? {} : _this$selectConfig5,
          treeConfig = this.treeConfig,
          treeIndeterminates = this.treeIndeterminates;
      var checkStrictly = selectConfig.checkStrictly,
          checkMethod = selectConfig.checkMethod;
      var property = selectConfig.checkField || selectConfig.checkProp;

      if (!checkMethod || checkMethod({
        row: row,
        rowIndex: tableFullData.indexOf(row)
      })) {
        if (property) {
          if (treeConfig && !checkStrictly) {
            if (value === -1) {
              treeIndeterminates.push(row);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, property, false);
            } else {
              // 更新子节点状态
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree([row], function (item) {
                return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(item, property, value);
              }, treeConfig);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(treeIndeterminates, function (item) {
                return item === row;
              });
            } // 如果存在父节点，更新父节点状态


            var matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
              return item === row;
            }, treeConfig);

            if (matchObj && matchObj.parent) {
              var indeterminatesItem = matchObj.items.find(function (item) {
                return treeIndeterminates.indexOf(item) > -1;
              });
              var parentStatus = value;

              if (indeterminatesItem) {
                parentStatus = -1;
              } else {
                var selectItems = matchObj.items.filter(function (item) {
                  return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(item, property);
                });
                parentStatus = selectItems.length === matchObj.items.length ? true : selectItems.length || value === -1 ? -1 : false;
              }

              return this.handleSelectRow(evnt, {
                row: matchObj.parent
              }, parentStatus);
            }
          } else {
            external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, property, value);
          }
        } else {
          if (treeConfig && !checkStrictly) {
            if (value === -1) {
              treeIndeterminates.push(row);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, function (item) {
                return item === row;
              });
            } else {
              // 更新子节点状态
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree([row], function (item) {
                if (value) {
                  if (selection.indexOf(item) === -1) {
                    selection.push(item);
                  }
                } else {
                  external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, function (select) {
                    return select === item;
                  });
                }
              }, treeConfig);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(treeIndeterminates, function (item) {
                return item === row;
              });
            } // 如果存在父节点，更新父节点状态


            var _matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
              return item === row;
            }, treeConfig);

            if (_matchObj && _matchObj.parent) {
              var _indeterminatesItem = _matchObj.items.find(function (item) {
                return treeIndeterminates.indexOf(item) > -1;
              });

              var _parentStatus = value;

              if (_indeterminatesItem) {
                _parentStatus = -1;
              } else {
                var _selectItems = _matchObj.items.filter(function (item) {
                  return selection.indexOf(item) > -1;
                });

                _parentStatus = _selectItems.length === _matchObj.items.length ? true : _selectItems.length || value === -1 ? -1 : false;
              }

              return this.handleSelectRow(evnt, {
                row: _matchObj.parent
              }, _parentStatus);
            }
          } else {
            if (value) {
              if (selection.indexOf(row) === -1) {
                selection.push(row);
              }
            } else {
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, function (item) {
                return item === row;
              });
            }
          }
        }

        this.checkSelectionStatus();
      }
    },
    handleToggleCheckRowEvent: function handleToggleCheckRowEvent(params, evnt) {
      var _this$selectConfig6 = this.selectConfig,
          selectConfig = _this$selectConfig6 === void 0 ? {} : _this$selectConfig6,
          selection = this.selection;
      var property = selectConfig.checkField;
      var row = params.row;
      var value = property ? !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property) : selection.indexOf(row) === -1;

      if (evnt) {
        this.triggerCheckRowEvent(evnt, params, value);
      } else {
        this.handleSelectRow(null, params, value);
      }
    },
    triggerCheckRowEvent: function triggerCheckRowEvent(evnt, params, value) {
      this.handleSelectRow(evnt, params, value);
      UtilTools.emitEvent(this, 'select-change', [Object.assign({
        selection: this.getSelectRecords(),
        checked: value
      }, params), evnt]);
    },

    /**
     * 多选，切换某一行的选中状态
     */
    toggleRowSelection: function toggleRowSelection(row) {
      this.handleToggleCheckRowEvent({
        row: row
      });
      return this.$nextTick();
    },
    setAllSelection: function setAllSelection(value) {
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          _this$selectConfig7 = this.selectConfig,
          selectConfig = _this$selectConfig7 === void 0 ? {} : _this$selectConfig7,
          treeConfig = this.treeConfig,
          selection = this.selection;
      var reserve = selectConfig.reserve,
          checkStrictly = selectConfig.checkStrictly,
          checkMethod = selectConfig.checkMethod;
      var property = selectConfig.checkField || selectConfig.checkProp;
      var insertList = editStore.insertList;
      var selectRows = []; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (!checkStrictly) {
        if (property) {
          var updateValue = function updateValue(row, rowIndex) {
            if (!checkMethod || checkMethod({
              row: row,
              rowIndex: rowIndex
            })) {
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, property, value);
            }
          };

          if (treeConfig) {
            external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, updateValue, treeConfig);
          } else {
            tableFullData.forEach(updateValue);
          }
        } else {
          if (value) {
            if (treeConfig) {
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, function (row, rowIndex) {
                if (!checkMethod || checkMethod({
                  row: row,
                  rowIndex: rowIndex
                })) {
                  selectRows.push(row);
                }
              }, treeConfig);
            } else {
              if (checkMethod) {
                selectRows = tableFullData.filter(function (row, rowIndex) {
                  return checkMethod({
                    row: row,
                    rowIndex: rowIndex
                  });
                });
              } else {
                selectRows = tableFullData.slice(0);
              }
            }
          }
        }

        this.selection = value && reserve ? selection.concat(selectRows.filter(function (row) {
          return selection.indexOf(row) === -1;
        })) : selectRows;
      }

      this.isAllSelected = value;
      this.isIndeterminate = false;
      this.treeIndeterminates = [];
    },
    checkSelectionStatus: function checkSelectionStatus() {
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          _this$selectConfig8 = this.selectConfig,
          selectConfig = _this$selectConfig8 === void 0 ? {} : _this$selectConfig8,
          selection = this.selection,
          treeIndeterminates = this.treeIndeterminates;
      var checkStrictly = selectConfig.checkStrictly,
          checkMethod = selectConfig.checkMethod;
      var property = selectConfig.checkField || selectConfig.checkProp;
      var insertList = editStore.insertList; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (!checkStrictly) {
        if (property) {
          this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
            return !checkMethod({
              row: row,
              rowIndex: rowIndex
            }) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property);
          } : function (row) {
            return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property);
          });
          this.isIndeterminate = !this.isAllSelected && tableFullData.some(function (row) {
            return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property) || treeIndeterminates.indexOf(row) > -1;
          });
        } else {
          this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
            return !checkMethod({
              row: row,
              rowIndex: rowIndex
            }) || selection.indexOf(row) > -1;
          } : function (row) {
            return selection.indexOf(row) > -1;
          });
          this.isIndeterminate = !this.isAllSelected && tableFullData.some(function (row) {
            return treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1;
          });
        }
      }
    },
    // 保留选中状态
    reserveCheckSelection: function reserveCheckSelection() {
      var _this$selectConfig9 = this.selectConfig,
          selectConfig = _this$selectConfig9 === void 0 ? {} : _this$selectConfig9,
          selection = this.selection,
          fullDataRowIdMap = this.fullDataRowIdMap;
      var reserve = selectConfig.reserve;
      var rowKey = UtilTools.getRowKey(this);

      if (reserve && selection.length) {
        this.selection = selection.map(function (row) {
          var rowPrimaryKey = '' + external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey);
          return fullDataRowIdMap.has(rowPrimaryKey) ? fullDataRowIdMap.get(rowPrimaryKey).row : row;
        });
      }
    },

    /**
     * 多选，选中所有事件
     */
    triggerCheckAllEvent: function triggerCheckAllEvent(evnt, value) {
      this.setAllSelection(value);
      UtilTools.emitEvent(this, 'select-all', [{
        selection: this.getSelectRecords(),
        checked: value
      }, evnt]);
    },

    /**
     * 多选，切换所有行的选中状态
     */
    toggleAllSelection: function toggleAllSelection() {
      this.triggerCheckAllEvent(null, !this.isAllSelected);
      return this.$nextTick();
    },
    clearSelection: function clearSelection() {
      var tableFullData = this.tableFullData,
          _this$selectConfig10 = this.selectConfig,
          selectConfig = _this$selectConfig10 === void 0 ? {} : _this$selectConfig10,
          treeConfig = this.treeConfig;
      var property = selectConfig.checkField || selectConfig.checkProp;

      if (property) {
        if (treeConfig) {
          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, function (item) {
            return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(item, property, false);
          }, treeConfig);
        } else {
          tableFullData.forEach(function (item) {
            return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(item, property, false);
          });
        }
      }

      this.isAllSelected = false;
      this.isIndeterminate = false;
      this.selection = [];
      this.treeIndeterminates = [];
      return this.$nextTick();
    },

    /**
     * 处理单选框默认勾选
     */
    handleRadioDefChecked: function handleRadioDefChecked() {
      var _this$radioConfig2 = this.radioConfig,
          radioConfig = _this$radioConfig2 === void 0 ? {} : _this$radioConfig2,
          fullDataRowIdMap = this.fullDataRowIdMap;
      var checkRowKey = radioConfig.checkRowKey;

      if (checkRowKey) {
        var property = UtilTools.getRowKey(this);

        if (!property) {
          throw new Error('[vxe-table] Checked row must have a unique primary key (row-id | row-key).');
        }

        this.setRadioRow(fullDataRowIdMap.get(checkRowKey).row);
      }
    },

    /**
     * 单选，行选中事件
     */
    triggerRadioRowEvent: function triggerRadioRowEvent(evnt, params) {
      if (!this.$listeners['radio-change'] && this.$listeners['select-change']) {
        console.warn('[vxe-table] Radio should use radio-change events');
      }

      UtilTools.emitEvent(this, 'radio-change', [params, evnt]);
      return this.setRadioRow(params.row);
    },
    triggerCurrentRowEvent: function triggerCurrentRowEvent(evnt, params) {
      this.setCurrentRow(params.row);
      UtilTools.emitEvent(this, 'current-change', [params, evnt]);
    },

    /**
     * 单选，设置某一行为选中状态，如果调不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow: function setCurrentRow(row) {
      if (this.highlightCurrentRow) {
        this.clearCurrentColumn();
        this.currentRow = row;
      }

      return this.$nextTick();
    },
    setRadioRow: function setRadioRow(row) {
      this.selectRow = row;
      return this.$nextTick();
    },
    clearCurrentRow: function clearCurrentRow() {
      this.currentRow = null;
      this.hoverRow = null;
      return this.$nextTick();
    },
    clearRadioRow: function clearRadioRow() {
      this.selectRow = null;
      return this.$nextTick();
    },
    getCurrentRow: function getCurrentRow() {
      return this.currentRow;
    },
    getRadioRow: function getRadioRow() {
      return this.selectRow;
    },

    /**
     * 行 hover 事件
     */
    triggerHoverEvent: function triggerHoverEvent(evnt, _ref5) {
      var row = _ref5.row;
      this.hoverRow = row;
    },

    /**
     * 选中事件
     */
    triggerCellMousedownEvent: function triggerCellMousedownEvent(evnt, params) {
      var $el = this.$el,
          tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore,
          editConfig = this.editConfig,
          handleSelected = this.handleSelected,
          handleChecked = this.handleChecked;
      var checked = editStore.checked,
          actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var button = evnt.button;
      var isLeftBtn = button === 0;
      var isRightBtn = button === 2;

      if (isLeftBtn || isRightBtn) {
        if (editConfig && editConfig.trigger === 'dblclick') {
          if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {// 如果已经是激活状态
          } else {
            if (isLeftBtn) {
              evnt.preventDefault();
              evnt.stopPropagation();
              this.handleSelected(params, evnt);
              var domMousemove = document.onmousemove;
              var domMouseup = document.onmouseup;
              var start = DomTools.getCellIndexs(cell);
              var updateEvent = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.throttle(function (evnt) {
                evnt.preventDefault();

                var _DomTools$getEventTar = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column'),
                    flag = _DomTools$getEventTar.flag,
                    targetElem = _DomTools$getEventTar.targetElem;

                if (flag) {
                  handleChecked(start, DomTools.getCellIndexs(targetElem), evnt);
                }
              }, table_browse.msie ? 80 : 40, {
                leading: true,
                trailing: true
              });
              document.onmousemove = updateEvent;

              document.onmouseup = function (evnt) {
                document.onmousemove = domMousemove;
                document.onmouseup = domMouseup;
              };

              this.closeFilter();
              this.closeMenu();
            } else {
              // 如果不在所有选中的范围之内则重新选中
              var select = DomTools.getCellIndexs(cell);

              if (checked.rows.indexOf(tableData[select.rowIndex]) === -1 || checked.columns.indexOf(visibleColumn[select.columnIndex]) === -1) {
                handleSelected(params, evnt);
              }
            }
          }
        }
      }
    },

    /**
     * 边角事件
     */
    triggerCornerMousedownEvent: function triggerCornerMousedownEvent(params, evnt) {
      evnt.preventDefault();
      evnt.stopPropagation();
      var $el = this.$el,
          tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore,
          editConfig = this.editConfig,
          handleTempChecked = this.handleTempChecked;
      var checked = editStore.checked;
      var button = evnt.button;
      var isLeftBtn = button === 0;
      var isRightBtn = button === 2;

      if (isLeftBtn || isRightBtn) {
        if (editConfig && checked.rows.length && editConfig.trigger === 'dblclick') {
          var domMousemove = document.onmousemove;
          var domMouseup = document.onmouseup;
          var start = {
            rowIndex: tableData.indexOf(checked.rows[0]),
            columnIndex: visibleColumn.indexOf(checked.columns[0])
          };
          var updateEvent = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.throttle(function (evnt) {
            evnt.preventDefault();

            var _DomTools$getEventTar2 = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column'),
                flag = _DomTools$getEventTar2.flag,
                targetElem = _DomTools$getEventTar2.targetElem;

            if (flag) {
              handleTempChecked(start, DomTools.getCellIndexs(targetElem), evnt);
            }
          }, table_browse.msie ? 80 : 40, {
            leading: true,
            trailing: true
          });
          document.onmousemove = updateEvent;

          document.onmouseup = function (evnt) {
            document.onmousemove = domMousemove;
            document.onmouseup = domMouseup;
            checked.rows = checked.tRows;
            checked.columns = checked.tColumns;
          };
        }
      }
    },
    triggerHeaderCellClickEvent: function triggerHeaderCellClickEvent(evnt, params) {
      var column = params.column,
          cell = params.cell;
      UtilTools.emitEvent(this, 'header-cell-click', [Object.assign({
        triggerSort: this.getEventTargetNode(evnt, cell, 'vxe-sort-wrapper').flag,
        triggerFilter: this.getEventTargetNode(evnt, cell, 'vxe-filter-wrapper').flag
      }, params), evnt]);
      return this.setCurrentColumn(column, true);
    },
    setCurrentColumn: function setCurrentColumn(column) {
      if (this.highlightCurrentColumn) {
        this.clearCurrentRow();
        this.selectColumn = column;
      }

      return this.$nextTick();
    },
    clearCurrentColumn: function clearCurrentColumn() {
      this.selectColumn = null;
    },

    /**
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent: function triggerCellClickEvent(evnt, params) {
      var _this14 = this;

      var $el = this.$el,
          highlightCurrentRow = this.highlightCurrentRow,
          editStore = this.editStore,
          _this$radioConfig3 = this.radioConfig,
          radioConfig = _this$radioConfig3 === void 0 ? {} : _this$radioConfig3,
          _this$selectConfig11 = this.selectConfig,
          selectConfig = _this$selectConfig11 === void 0 ? {} : _this$selectConfig11,
          _this$treeConfig = this.treeConfig,
          treeConfig = _this$treeConfig === void 0 ? {} : _this$treeConfig,
          editConfig = this.editConfig;
      var actived = editStore.actived;
      var column = params.column,
          columnIndex = params.columnIndex,
          row = params.row,
          cell = params.cell;

      if (highlightCurrentRow) {
        if (radioConfig.trigger === 'row' || !this.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag && !this.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
          this.triggerCurrentRowEvent(evnt, params);
          UtilTools.emitEvent(this, 'current-change', [params, evnt]);
        }
      } // 如果是单选


      if ((radioConfig.trigger === 'row' || column.type === 'radio' && radioConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
        this.triggerRadioRowEvent(evnt, params);
      } // 如果是多选


      if ((selectConfig.trigger === 'row' || column.type === 'selection' && selectConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
        this.handleToggleCheckRowEvent(params, evnt);
      } // 如果是树形表格


      if (treeConfig.trigger === 'row' || column.treeNode && treeConfig.trigger === 'cell') {
        this.triggerTreeExpandEvent(evnt, params);
      }

      if (editConfig) {
        if (editConfig.trigger === 'click') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editConfig.mode === 'row') {
              this.triggerValidate('blur').catch(function (e) {
                return e;
              }).then(function () {
                _this14.handleActived(params, evnt).then(function () {
                  return _this14.triggerValidate('change');
                }).catch(function (e) {
                  return e;
                });
              });
            } else if (editConfig.mode === 'cell') {
              this.handleActived(params, evnt).then(function () {
                return _this14.triggerValidate('change');
              }).catch(function (e) {
                return e;
              });
            }
          }
        } else if (editConfig.trigger === 'dblclick') {
          if (!actived.args || cell !== actived.args.cell) {
            if (editConfig.mode === 'row') {
              if (row === actived.row) {
                actived.args.columnIndex = columnIndex;
                actived.column = actived.args.column = column;
              } else {
                this.handleSelected(params, evnt);
              }
            } else if (editConfig.mode === 'cell') {
              this.handleSelected(params, evnt);
            }
          }
        }
      }

      UtilTools.emitEvent(this, 'cell-click', [params, evnt]);
    },

    /**
     * 列双击点击事件
     * 如果是双击模式，则激活为编辑状态
     */
    triggerCellDBLClickEvent: function triggerCellDBLClickEvent(evnt, params) {
      var _this15 = this;

      var editStore = this.editStore,
          editConfig = this.editConfig;
      var actived = editStore.actived;

      if (editConfig) {
        if (editConfig.trigger === 'dblclick') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editConfig.mode === 'row') {
              this.triggerValidate('blur').catch(function (e) {
                return e;
              }).then(function () {
                _this15.handleActived(params, evnt).then(function () {
                  return _this15.triggerValidate('change');
                }).catch(function (e) {
                  return e;
                });
              });
            } else if (editConfig.mode === 'cell') {
              this.handleActived(params, evnt).then(function () {
                return _this15.triggerValidate('change');
              }).catch(function (e) {
                return e;
              });
            }
          }
        }
      }

      UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt]);
    },

    /**
     * 处理激活编辑
     */
    handleActived: function handleActived(params, evnt) {
      var _this16 = this;

      var editStore = this.editStore,
          editConfig = this.editConfig;
      var activeMethod = editConfig.activeMethod;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender) {
        if (editConfig.mode === 'row' ? actived.row !== row : actived.row !== row || actived.column !== column) {
          // 判断是否禁用编辑
          var type = 'edit-disabled';

          if (!activeMethod || activeMethod(params)) {
            this.clostTooltip();
            this.clearCopyed(evnt);
            this.clearChecked(evnt);
            this.clearSelected(evnt);
            this.clearActived(evnt);
            type = 'edit-actived';
            column.renderHeight = cell.offsetHeight;
            actived.args = params;
            actived.row = row;
            actived.column = column;
            this.$nextTick(function () {
              _this16.handleFocus(params, evnt);
            });
          }

          UtilTools.emitEvent(this, type, [params, evnt]);
        } else {
          column.renderHeight = cell.offsetHeight;
          actived.args = params;

          if (actived.column !== column) {
            this.clearValidate();
          }

          setTimeout(function () {
            _this16.handleFocus(params, evnt);
          });
        }
      }

      return this.$nextTick();
    },

    /**
     * 清除激活的编辑
     */
    clearActived: function clearActived(evnt) {
      var editStore = this.editStore;
      var actived = editStore.actived;
      var args = actived.args,
          row = actived.row,
          column = actived.column;

      if (row || column) {
        this.updateFooter();
        UtilTools.emitEvent(this, 'edit-closed', [args, evnt]);
      }

      actived.args = null;
      actived.row = null;
      actived.column = null;
      return this.clearValidate();
    },
    getActiveRow: function getActiveRow() {
      var $el = this.$el,
          editStore = this.editStore,
          tableData = this.tableData;
      var _editStore$actived = editStore.actived,
          args = _editStore$actived.args,
          row = _editStore$actived.row;

      if (args && tableData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args);
      }

      return null;
    },
    hasActiveRow: function hasActiveRow(row) {
      return this.editStore.actived.row === row;
    },

    /**
     * 清除所选中源状态
     */
    clearSelected: function clearSelected(evnt) {
      var editStore = this.editStore;
      var selected = editStore.selected;
      selected.row = null;
      selected.column = null;
      return this.$nextTick();
    },

    /**
     * 处理选中源
     */
    handleSelected: function handleSelected(params, evnt) {
      var _this17 = this;

      var _this$mouseConfig2 = this.mouseConfig,
          mouseConfig = _this$mouseConfig2 === void 0 ? {} : _this$mouseConfig2,
          editStore = this.editStore;
      var selected = editStore.selected;
      var row = params.row,
          column = params.column;

      var selectMethod = function selectMethod() {
        if (selected.row !== row || selected.column !== column) {
          _this17.clearChecked(evnt);

          _this17.clearActived(evnt);

          selected.args = params;
          selected.row = row;
          selected.column = column;
        } // 如果配置了批量选中功能，则为批量选中状态


        if (mouseConfig.checked) {
          var select = DomTools.getCellIndexs(params.cell);

          _this17.handleChecked(select, select, evnt);
        }

        return _this17.$nextTick();
      }; // return editRules ? this.triggerValidate('blur').then(selectMethod).catch(e => e) : selectMethod()


      return selectMethod();
    },

    /**
     * 清除所有选中状态
     */
    clearChecked: function clearChecked(evnt) {
      var editStore = this.editStore;
      var checked = editStore.checked;
      checked.rows = [];
      checked.columns = [];
      checked.tRows = [];
      checked.tColumns = [];
      return this.$nextTick();
    },

    /**
     * 处理所有选中
     */
    handleChecked: function handleChecked(start, end, evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore;
      var checked = editStore.checked;
      var sRowIndex = start.rowIndex,
          sColumnIndex = start.columnIndex;
      var eRowIndex = end.rowIndex,
          eColumnIndex = end.columnIndex;
      checked.tRows = [];
      checked.tColumns = [];

      if (sRowIndex < eRowIndex) {
        // 向下
        checked.rows = tableData.slice(sRowIndex, eRowIndex + 1);
      } else {
        // 向上
        checked.rows = tableData.slice(eRowIndex, sRowIndex + 1);
      }

      if (sColumnIndex < eColumnIndex) {
        // 向右
        checked.columns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1);
      } else {
        // 向左
        checked.columns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex + 1);
      }
    },

    /**
     * 处理所有选中的临时选中
     */
    handleTempChecked: function handleTempChecked(start, end, evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore;
      var checked = editStore.checked;
      var rows = checked.rows,
          tRows = checked.tRows,
          columns = checked.columns,
          tColumns = checked.tColumns;
      var sRowIndex = start.rowIndex,
          sColumnIndex = start.columnIndex;
      var eRowIndex = end.rowIndex,
          eColumnIndex = end.columnIndex;

      if (tRows.length > rows.length) {
        eColumnIndex = visibleColumn.indexOf(columns[columns.length - 1]);
      } else if (tColumns.length > columns.length) {
        eRowIndex = tableData.indexOf(rows[rows.length - 1]);
      }

      if (sRowIndex < eRowIndex) {
        // 向下
        checked.tRows = tableData.slice(sRowIndex, eRowIndex + 1);
      } else {
        // 向上
        sRowIndex += rows.length;
        checked.tRows = tableData.slice(eRowIndex, sRowIndex);
      }

      if (sColumnIndex < eColumnIndex) {
        // 向右
        checked.tColumns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1);
      } else {
        // 向左
        sColumnIndex += columns.length;
        checked.tColumns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex);
      }
    },

    /**
     * 清空已复制的内容
     */
    clearCopyed: function clearCopyed() {
      var editStore = this.editStore;
      var copyed = editStore.copyed;
      copyed.cut = false;
      copyed.rows = [];
      copyed.columns = [];
      return this.$nextTick();
    },

    /**
     * 处理复制
     */
    handleCopyed: function handleCopyed(cut, evnt) {
      var editStore = this.editStore;
      var copyed = editStore.copyed,
          checked = editStore.checked;
      copyed.cut = cut;
      copyed.rows = checked.rows;
      copyed.columns = checked.columns;
    },

    /**
     * 处理粘贴
     */
    handlePaste: function handlePaste(evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore;
      var copyed = editStore.copyed,
          selected = editStore.selected;
      var cut = copyed.cut,
          rows = copyed.rows,
          columns = copyed.columns;

      if (rows.length && columns.length && selected.row && selected.column) {
        var _selected$args = selected.args,
            rowIndex = _selected$args.rowIndex,
            columnIndex = _selected$args.columnIndex;
        var start = {
          rowIndex: rowIndex,
          columnIndex: columnIndex
        };
        var end = {
          rowIndex: rowIndex + rows.length - 1,
          columnIndex: columnIndex + columns.length - 1
        };
        rows.forEach(function (row, rIndex) {
          var offsetRow = tableData[rowIndex + rIndex];

          if (offsetRow) {
            columns.forEach(function (column, cIndex) {
              var offsetColumn = visibleColumn[columnIndex + cIndex];

              if (offsetColumn) {
                UtilTools.setCellValue(offsetRow, offsetColumn, UtilTools.getCellValue(row, column));
              }

              if (cut) {
                UtilTools.setCellValue(row, column, null);
              }
            });
          }
        });

        if (cut) {
          this.clearCopyed();
        }

        this.handleChecked(start, end, evnt);
      }
    },

    /**
     * 处理聚焦
     */
    handleFocus: function handleFocus(params, evnt) {
      var column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender) {
        var compRender = Renderer.get(editRender.name);
        var autofocus = editRender.autofocus,
            autoselect = editRender.autoselect;
        var inputElem; // 如果指定了聚焦 class

        if (autofocus) {
          inputElem = cell.querySelector(autofocus);
        } // 渲染器的聚焦处理


        if (!inputElem && compRender && compRender.autofocus) {
          inputElem = cell.querySelector(compRender.autofocus);
        }

        if (inputElem) {
          inputElem[autoselect ? 'select' : 'focus']();

          if (table_browse.msie) {
            var textRange = inputElem.createTextRange();
            textRange.collapse(false);
            textRange.select();
          }
        }
      }
    },

    /**
     * 激活行编辑
     */
    setActiveRow: function setActiveRow(row) {
      return this.setActiveCell(row, this.visibleColumn.find(function (column) {
        return column.editRender;
      }).property);
    },

    /**
     * 激活单元格编辑
     */
    setActiveCell: function setActiveCell(row, field) {
      var _this18 = this;

      return new Promise(function (resolve) {
        setTimeout(function () {
          var tableData = _this18.tableData,
              visibleColumn = _this18.visibleColumn,
              handleActived = _this18.handleActived;

          if (row && field) {
            var rowIndex = tableData.indexOf(row);

            if (rowIndex > -1) {
              var column = visibleColumn.find(function (column) {
                return column.property === field;
              });
              var cell = DomTools.getCell(_this18, {
                row: row,
                rowIndex: rowIndex,
                column: column
              });
              handleActived({
                row: row,
                column: column,
                cell: cell
              });
              _this18.lastCallTime = Date.now();
            }
          }

          resolve(_this18.$nextTick());
        });
      });
    },

    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    setSelectCell: function setSelectCell(row, field) {
      var tableData = this.tableData,
          editConfig = this.editConfig,
          visibleColumn = this.visibleColumn;

      if (row && field && editConfig.trigger !== 'manual') {
        var column = visibleColumn.find(function (column) {
          return column.property === field;
        });
        var rowIndex = tableData.indexOf(row);

        if (rowIndex > -1 && column) {
          var cell = DomTools.getCell(this, {
            row: row,
            rowIndex: rowIndex,
            column: column
          });
          var params = {
            row: row,
            rowIndex: rowIndex,
            column: column,
            columnIndex: visibleColumn.indexOf(column),
            cell: cell
          };
          this.handleSelected(params, {});
        }
      }

      return this.$nextTick();
    },

    /**
     * 点击排序事件
     */
    triggerSortEvent: function triggerSortEvent(evnt, column, params, order) {
      this.sort(column.property, order);
    },
    sort: function sort(field, order) {
      var visibleColumn = this.visibleColumn,
          tableFullColumn = this.tableFullColumn,
          remoteSort = this.remoteSort;
      var column = visibleColumn.find(function (item) {
        return item.property === field;
      });
      var isRemote = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort;

      if (column.sortable) {
        if (!order) {
          order = column.order === 'desc' ? 'asc' : 'desc';
        }

        if (column.order !== order) {
          tableFullColumn.forEach(function (column) {
            column.order = null;
          });
          column.order = order; // 如果是服务端排序，则跳过本地排序处理

          if (!isRemote) {
            this.tableData = this.getTableData(true).tableData;
          } // 在 v3.0 中废弃 prop


          UtilTools.emitEvent(this, 'sort-change', [{
            column: column,
            prop: field,
            field: field,
            order: order
          }]);
        }
      }

      return this.$nextTick();
    },

    /**
     * 点击筛选事件
     */
    triggerFilterEvent: function triggerFilterEvent(evnt, column, params) {
      var $refs = this.$refs,
          filterStore = this.filterStore,
          overflowX = this.overflowX;

      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false;
      } else {
        var targetElem = evnt.target;
        var bodyElem = $refs.tableBody.$el;
        var filterWrapper = $refs.filterWrapper;

        var _DomTools$getOffsetPo = DomTools.getOffsetPos(targetElem),
            top = _DomTools$getOffsetPo.top,
            left = _DomTools$getOffsetPo.left;

        if (overflowX) {
          left -= bodyElem.scrollLeft;
        }

        Object.assign(filterStore, {
          args: params,
          multiple: column.filterMultiple,
          options: column.filters,
          column: column,
          style: {
            zIndex: conf.tooltip.zIndex,
            top: "".concat(top + targetElem.clientHeight + 6, "px"),
            left: "".concat(left, "px")
          },
          visible: true
        });
        filterStore.isAllSelected = filterStore.options.every(function (item) {
          return item.checked;
        });
        filterStore.isIndeterminate = !this.isAllSelected && filterStore.options.some(function (item) {
          return item.checked;
        });
        this.$nextTick(function () {
          var filterWrapperElem = filterWrapper.$el;
          filterStore.style.top = "".concat(top + targetElem.clientHeight + 6, "px");
          filterStore.style.left = "".concat(left - filterWrapperElem.clientWidth / 2 + 10, "px");
        });
      }
    },
    // 确认筛选
    confirmFilterEvent: function confirmFilterEvent(evnt) {
      var visibleColumn = this.visibleColumn,
          filterStore = this.filterStore,
          remoteFilter = this.remoteFilter,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad;
      var column = filterStore.column;
      var values = [];
      column.filters.forEach(function (item) {
        if (item.checked) {
          values.push(item.value);
        }
      });
      filterStore.visible = false; // 如果是服务端筛选，则跳过本地筛选处理

      if (!remoteFilter) {
        this.tableData = this.getTableData(true).tableData;
      }

      var filterList = [];
      visibleColumn.filter(function (column) {
        var property = column.property,
            filters = column.filters;
        var valueList = [];

        if (filters && filters.length) {
          filters.forEach(function (item) {
            if (item.checked) {
              valueList.push(item.value);
            }
          }); // 在 v3.0 中废弃 prop

          filterList.push({
            column: column,
            field: property,
            prop: property,
            values: valueList
          });
        }
      }); // 在 v3.0 中废弃 prop

      UtilTools.emitEvent(this, 'filter-change', [{
        column: column,
        field: column.property,
        prop: column.property,
        values: values,
        filters: filterList
      }]);

      if (scrollXLoad || scrollYLoad) {
        this.clearScroll();
      }

      this.closeFilter();
      this.$nextTick(this.recalculate);
    },
    // 关闭筛选
    closeFilter: function closeFilter(evnt) {
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        options: [],
        visible: false
      });
      return this.$nextTick();
    },
    // 重置筛选
    resetFilterEvent: function resetFilterEvent(evnt) {
      this.filterStore.options.forEach(function (item) {
        item.checked = false;
        item.data = item._data;
      });
      this.confirmFilterEvent(evnt);
    },
    clearFilter: function clearFilter() {
      var visibleColumn = this.visibleColumn;
      visibleColumn.forEach(function (column) {
        var filters = column.filters;

        if (filters && filters.length) {
          filters.forEach(function (item) {
            item.checked = false;
          });
        }
      });
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      });
      this.tableData = this.getTableData(true).tableData;
      return this.$nextTick();
    },

    /**
     * 展开行事件
     */
    triggerRowExpandEvent: function triggerRowExpandEvent(evnt, _ref6) {
      var row = _ref6.row;
      var rest = this.toggleRowExpansion(row);
      UtilTools.emitEvent(this, 'toggle-expand-change', [{
        row: row,
        rowIndex: this.getRowMapIndex(row),
        $table: this
      }, evnt]);
      return rest;
    },

    /**
     * 切换展开行
     */
    toggleRowExpansion: function toggleRowExpansion(row) {
      return this.setRowExpansion(row);
    },

    /**
     * 处理默认展开行
     */
    handleDefaultRowExpand: function handleDefaultRowExpand() {
      var _this$expandConfig = this.expandConfig,
          expandConfig = _this$expandConfig === void 0 ? {} : _this$expandConfig,
          tableFullData = this.tableFullData;
      var expandAll = expandConfig.expandAll,
          expandRowKeys = expandConfig.expandRowKeys;
      var rowKey = UtilTools.getRowKey(this);

      if (expandAll) {
        this.expandeds = tableFullData.slice(0);
      } else if (expandRowKeys) {
        var property = rowKey;

        if (!property) {
          throw new Error('[vxe-table] Expand rows must have a unique primary key (row-id | row-key).');
        }

        this.expandeds = expandRowKeys.map(function (expandKey) {
          return tableFullData.find(function (item) {
            return expandKey === item[property];
          });
        });
      }
    },
    setAllRowExpansion: function setAllRowExpansion(expanded) {
      this.expandeds = expanded ? this.tableFullData.slice(0) : [];
      return this.$nextTick();
    },

    /**
     * 设置展开行，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     */
    setRowExpansion: function setRowExpansion(rows, expanded) {
      var expandeds = this.expandeds,
          _this$expandConfig2 = this.expandConfig,
          expandConfig = _this$expandConfig2 === void 0 ? {} : _this$expandConfig2;
      var isToggle = arguments.length === 1;

      if (rows) {
        if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        if (expandConfig.accordion) {
          // 只能同时展开一个
          expandeds.length = 0;
          rows = rows.slice(rows.length - 1, rows.length);
        }

        rows.forEach(function (row) {
          var index = expandeds.indexOf(row);

          if (index > -1) {
            if (isToggle || !expanded) {
              expandeds.splice(index, 1);
            }
          } else {
            if (isToggle || expanded) {
              expandeds.push(row);
            }
          }
        });
      }

      return this.$nextTick();
    },
    hasRowExpand: function hasRowExpand(row) {
      return this.expandeds.indexOf(row) > -1;
    },
    clearRowExpand: function clearRowExpand() {
      this.expandeds = [];
      return this.$nextTick();
    },

    /**
     * 展开树节点事件
     */
    triggerTreeExpandEvent: function triggerTreeExpandEvent(evnt, _ref7) {
      var row = _ref7.row;
      var rest = this.toggleTreeExpansion(row);
      UtilTools.emitEvent(this, 'toggle-tree-change', [{
        row: row,
        rowIndex: this.getRowMapIndex(row),
        $table: this
      }, evnt]);
      return rest;
    },

    /**
     * 切换/展开树节点
     */
    toggleTreeExpansion: function toggleTreeExpansion(row) {
      return this.setTreeExpansion(row);
    },

    /**
     * 处理默认展开树节点
     */
    handleDefaultTreeExpand: function handleDefaultTreeExpand() {
      var treeConfig = this.treeConfig,
          tableFullData = this.tableFullData;

      if (treeConfig) {
        var expandAll = treeConfig.expandAll,
            expandRowKeys = treeConfig.expandRowKeys;
        var children = treeConfig.children;
        var property = UtilTools.getRowKey(this);
        var treeExpandeds = [];

        if (expandAll) {
          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
            var rowChildren = row[children];

            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(row);
            }
          }, treeConfig);
          this.treeExpandeds = treeExpandeds;
        } else if (expandRowKeys) {
          expandRowKeys.forEach(function (rowPrimaryKey) {
            var matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
              return rowPrimaryKey === external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(item, property);
            }, treeConfig);
            var rowChildren = matchObj ? matchObj.item[children] : 0;

            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(matchObj.item);
            }
          });
          this.treeExpandeds = treeExpandeds;
        }
      }
    },
    setAllTreeExpansion: function setAllTreeExpansion(expanded) {
      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;
      var children = treeConfig.children;
      var treeExpandeds = [];

      if (expanded) {
        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, function (row) {
          var rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(row);
          }
        }, treeConfig);
      }

      this.treeExpandeds = treeExpandeds;
      return this.$nextTick();
    },

    /**
     * 设置展开树形节点，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     */
    setTreeExpansion: function setTreeExpansion(rows, expanded) {
      var tableFullData = this.tableFullData,
          treeExpandeds = this.treeExpandeds,
          treeConfig = this.treeConfig;
      var children = treeConfig.children;
      var isToggle = arguments.length === 1;

      if (rows) {
        if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        if (treeConfig.accordion) {
          rows = rows.slice(rows.length - 1, rows.length);
        }

        rows.forEach(function (row) {
          var rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            var index = treeExpandeds.indexOf(row);

            if (treeConfig.accordion) {
              // 同一级只能展开一个
              var matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
                return item === row;
              }, treeConfig);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(treeExpandeds, function (item) {
                return matchObj.items.indexOf(item) > -1;
              });
            }

            if (index > -1) {
              if (isToggle || !expanded) {
                treeExpandeds.splice(index, 1);
              }
            } else {
              if (isToggle || expanded) {
                treeExpandeds.push(row);
              }
            }
          }
        });
      }

      return this.$nextTick();
    },
    hasTreeExpand: function hasTreeExpand(row) {
      return this.treeExpandeds.indexOf(row) > -1;
    },
    clearTreeExpand: function clearTreeExpand() {
      this.treeExpandeds = [];
      return this.$nextTick();
    },

    /**
     * 是否启用了横向 X 可视渲染
     */
    isScrollXLoad: function isScrollXLoad() {
      console.warn('[vxe-table] The function isScrollXLoad is deprecated, please use getVirtualScroller');
      return this.scrollXLoad;
    },

    /**
     * 是否启用了纵向 Y 可视渲染
     */
    isScrollYLoad: function isScrollYLoad() {
      console.warn('[vxe-table] The function isScrollXLoad is deprecated, please use getVirtualScroller');
      return this.scrollYLoad;
    },

    /**
     * 获取虚拟滚动状态
     */
    getVirtualScroller: function getVirtualScroller() {
      var $refs = this.$refs,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad;
      var bodyElem = $refs.tableBody.$el;
      return {
        scrollX: scrollXLoad,
        scrollY: scrollYLoad,
        scrollTop: bodyElem.scrollTop,
        scrollLeft: bodyElem.scrollLeft
      };
    },

    /**
     * 横向 X 可视渲染事件处理
     */
    triggerScrollXEvent: function triggerScrollXEvent(evnt) {
      var $refs = this.$refs,
          visibleColumn = this.visibleColumn,
          scrollXStore = this.scrollXStore;
      var startIndex = scrollXStore.startIndex,
          renderSize = scrollXStore.renderSize,
          offsetSize = scrollXStore.offsetSize,
          visibleSize = scrollXStore.visibleSize;
      var scrollBodyElem = $refs.tableBody.$el;
      var scrollLeft = scrollBodyElem.scrollLeft;
      var toVisibleIndex = 0;
      var width = 0;

      for (var index = 0; index < visibleColumn.length; index++) {
        width += visibleColumn[index].renderWidth;

        if (scrollLeft < width) {
          toVisibleIndex = index;
          break;
        }
      }

      if (scrollXStore.visibleIndex !== toVisibleIndex) {
        var isReload;
        var preloadSize = 0;
        var isLeft = scrollXStore.visibleIndex > toVisibleIndex; // 如果渲染数量不充足

        var isTooLow = renderSize < visibleSize * 3; // 除去可视条数剩余数量

        var residueSize = renderSize - visibleSize;

        if (isLeft) {
          preloadSize = residueSize - (isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5));
          isReload = toVisibleIndex - offsetSize <= startIndex;
        } else {
          preloadSize = isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5);
          isReload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;
        }

        if (isReload) {
          scrollXStore.visibleIndex = toVisibleIndex;
          scrollXStore.startIndex = Math.min(Math.max(toVisibleIndex - preloadSize, 0), visibleColumn.length - renderSize);
          this.updateScrollXSpace();
          this.$nextTick(function () {
            scrollBodyElem.scrollLeft = scrollLeft;
          });
        }
      }

      this.clostTooltip();
    },

    /**
     * 纵向 Y 可视渲染事件处理
     */
    triggerScrollYEvent: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.debounce(function (evnt) {
      var tableFullData = this.tableFullData,
          scrollYStore = this.scrollYStore;
      var startIndex = scrollYStore.startIndex,
          renderSize = scrollYStore.renderSize,
          offsetSize = scrollYStore.offsetSize,
          visibleSize = scrollYStore.visibleSize,
          rowHeight = scrollYStore.rowHeight;
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var toVisibleIndex = Math.ceil(scrollTop / rowHeight);

      if (scrollYStore.visibleIndex !== toVisibleIndex) {
        var isReload;
        var preloadSize = 0;
        var isTop = scrollYStore.visibleIndex > toVisibleIndex; // 如果渲染数量不充足

        var isTooLow = renderSize < visibleSize * 3; // 除去可视条数剩余数量

        var residueSize = renderSize - visibleSize;

        if (isTop) {
          preloadSize = residueSize - (isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5));
          isReload = toVisibleIndex - offsetSize <= startIndex;
        } else {
          preloadSize = isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5);
          isReload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;
        }

        if (isReload) {
          scrollYStore.visibleIndex = toVisibleIndex;
          scrollYStore.startIndex = Math.min(Math.max(toVisibleIndex - preloadSize, 0), tableFullData.length - renderSize);
          this.updateScrollYSpace();
          this.$nextTick(function () {
            scrollBodyElem.scrollTop = scrollTop;
          });
        }
      }
    }, debounceScrollYDuration, {
      leading: false,
      trailing: true
    }),
    // 计算可视渲染相关数据
    computeScrollLoad: function computeScrollLoad() {
      var _this19 = this;

      return this.$nextTick().then(function () {
        var scrollXLoad = _this19.scrollXLoad,
            scrollYLoad = _this19.scrollYLoad,
            scrollYStore = _this19.scrollYStore,
            scrollXStore = _this19.scrollXStore,
            visibleColumn = _this19.visibleColumn,
            optimizeOpts = _this19.optimizeOpts;
        var scrollX = optimizeOpts.scrollX,
            scrollY = optimizeOpts.scrollY;
        var tableBody = _this19.$refs.tableBody;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var tableHeader = _this19.$refs.tableHeader;

        if (tableBodyElem) {
          // 计算 X 逻辑
          if (scrollXLoad) {
            // 无法预知，默认取前 10 条平均宽度进行运算
            scrollXStore.visibleSize = scrollX.vSize || Math.ceil(tableBodyElem.clientWidth / (visibleColumn.slice(0, 10).reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0) / 10));

            _this19.updateScrollXSpace();
          } // 计算 Y 逻辑


          if (scrollYLoad) {
            if (scrollY.rHeight) {
              scrollYStore.rowHeight = scrollY.rHeight;
            } else {
              var firstTrElem = tableBodyElem.querySelector('tbody>tr');

              if (!firstTrElem && tableHeader) {
                firstTrElem = tableHeader.$el.querySelector('thead>tr');
              }

              if (firstTrElem) {
                scrollYStore.rowHeight = firstTrElem.clientHeight;
              }
            }

            scrollYStore.visibleSize = scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / scrollYStore.rowHeight);

            _this19.updateScrollYSpace();
          }
        }

        return _this19.$nextTick();
      });
    },
    // 更新横向 X 可视渲染上下剩余空间大小
    updateScrollXSpace: function updateScrollXSpace() {
      var visibleColumn = this.visibleColumn,
          scrollXStore = this.scrollXStore;
      this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
      scrollXStore.leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
      scrollXStore.rightSpaceWidth = visibleColumn.slice(scrollXStore.startIndex + scrollXStore.renderSize, visibleColumn.length).reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    },
    // 更新纵向 Y 可视渲染上下剩余空间大小
    updateScrollYSpace: function updateScrollYSpace() {
      var scrollYStore = this.scrollYStore;

      var _this$getTableData = this.getTableData(),
          fullData = _this$getTableData.fullData,
          tableData = _this$getTableData.tableData;

      this.tableData = tableData;
      scrollYStore.topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0);
      scrollYStore.bottomSpaceHeight = Math.max((fullData.length - (scrollYStore.startIndex + scrollYStore.renderSize)) * scrollYStore.rowHeight, 0);
    },
    clearScroll: function clearScroll() {
      var _this20 = this;

      Object.assign(this.scrollXStore, {
        visibleSize: 0,
        startIndex: 0,
        leftSpaceWidth: 0,
        rightSpaceWidth: 0
      });
      Object.assign(this.scrollYStore, {
        visibleSize: 0,
        startIndex: 0,
        topSpaceHeight: 0,
        bottomSpaceHeight: 0
      });
      this.$nextTick(function () {
        var tableBody = _this20.$refs.tableBody;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var tableFooter = _this20.$refs.tableFooter;
        var tableFooterElem = tableFooter ? tableFooter.$el : null;

        if (tableBodyElem) {
          tableBodyElem.scrollTop = 0;
          tableBodyElem.scrollLeft = 0;
        }

        if (tableFooterElem) {
          tableFooterElem.scrollLeft = 0;
        }
      });
      return this.$nextTick();
    },

    /**
     * 更新表尾合计
     */
    updateFooter: function updateFooter() {
      var showFooter = this.showFooter,
          visibleColumn = this.visibleColumn,
          footerMethod = this.footerMethod;

      if (showFooter && footerMethod) {
        this.footerData = visibleColumn.length ? footerMethod({
          columns: visibleColumn,
          data: this.editStore.insertList.concat(this.tableFullData)
        }) : [];
      }

      return this.$nextTick();
    },

    /**
     * 更新列状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus: function updateStatus(scope, cellValue) {
      var _this21 = this;

      var customVal = !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isUndefined(cellValue);
      return this.$nextTick().then(function () {
        var $refs = _this21.$refs,
            tableData = _this21.tableData,
            editRules = _this21.editRules,
            validStore = _this21.validStore;

        if (scope && $refs.tableBody && editRules) {
          var row = scope.row,
              column = scope.column;
          var type = 'change';

          if (_this21.hasCellRules(type, row, column)) {
            var rowIndex = tableData.indexOf(row);
            var cell = DomTools.getCell(_this21, {
              row: row,
              rowIndex: rowIndex,
              column: column
            });

            if (cell) {
              return _this21.validCellRules(type, row, column, cellValue).then(function () {
                if (customVal && validStore.visible) {
                  UtilTools.setCellValue(row, column, cellValue);
                }

                _this21.clearValidate();
              }).catch(function (_ref8) {
                var rule = _ref8.rule;

                if (customVal) {
                  UtilTools.setCellValue(row, column, cellValue);
                }

                _this21.showValidTooltip({
                  rule: rule,
                  row: row,
                  column: column,
                  cell: cell
                });
              });
            }
          }
        }
      });
    },
    triggerValidate: function triggerValidate(type) {
      var _this22 = this;

      var editConfig = this.editConfig,
          editStore = this.editStore,
          editRules = this.editRules,
          validStore = this.validStore;
      var actived = editStore.actived; // let type = validStore.visible ? 'all' : 'blur'
      // this.clearValidate()

      if (actived.row && editRules) {
        var _actived$args = actived.args,
            row = _actived$args.row,
            column = _actived$args.column,
            cell = _actived$args.cell; // if (editConfig.mode === 'row') {
        //   return this.validRowRules(type, row)
        //     .catch(params => {
        //       this.handleValidError(params)
        //       return Promise.reject(params)
        //     })
        // } else {

        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(function () {
            if (editConfig.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                _this22.clearValidate();
              }
            }
          }).catch(function (_ref9) {
            var rule = _ref9.rule;

            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              var rest = {
                rule: rule,
                row: row,
                column: column,
                cell: cell
              };

              _this22.showValidTooltip(rest);

              return Promise.reject(rest);
            }

            return Promise.resolve();
          });
        } // }

      }

      return Promise.resolve();
    },

    /**
     * 与 validate 一致行为，区别就是会校验所有并返回所有不通过的所有列
     */
    fullValidate: function fullValidate(rows, cb) {
      return this.beginValidate(rows, cb, true);
    },

    /**
     * 对表格数据进行校验
     */
    validate: function validate(rows, cb) {
      return this.beginValidate(rows, cb);
    },

    /**
     * 对表格数据进行校验
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    beginValidate: function beginValidate(rows, cb, isAll) {
      var _this23 = this;

      var validRest = {};
      var status = true;
      var editRules = this.editRules,
          tableData = this.tableData,
          tableFullData = this.tableFullData,
          scrollYLoad = this.scrollYLoad,
          _scrollYStore = this._scrollYStore;
      var vaildDatas = scrollYLoad ? tableFullData : tableData;

      if (rows) {
        if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(rows)) {
          cb = rows;
        } else {
          vaildDatas = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows) ? rows : [rows];
        }
      }

      var rowValids = [];
      this.lastCallTime = Date.now();
      this.clearValidate();

      if (editRules) {
        var columns = this.getColumns();
        vaildDatas.forEach(function (row) {
          var rowIndex = tableData.indexOf(row);
          var colVailds = [];
          columns.forEach(function (column, columnIndex) {
            if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.has(editRules, column.property)) {
              colVailds.push(new Promise(function (resolve, reject) {
                _this23.validCellRules('all', row, column).then(resolve).catch(function (_ref10) {
                  var rule = _ref10.rule,
                      rules = _ref10.rules;
                  var rest = {
                    rule: rule,
                    rules: rules,
                    rowIndex: rowIndex,
                    row: row,
                    columnIndex: columnIndex,
                    column: column
                  };

                  if (isAll) {
                    if (!validRest[column.property]) {
                      validRest[column.property] = [];
                    }

                    validRest[column.property].push(rest);
                    return resolve();
                  }

                  return reject(rest);
                });
              }));
            }
          });
          rowValids.push(Promise.all(colVailds));
        });
        return Promise.all(rowValids).then(function () {
          var ruleProps = Object.keys(validRest);

          if (ruleProps.length) {
            return Promise.reject(validRest[ruleProps[0]][0]);
          }

          if (cb) {
            cb(status);
          }
        }).catch(function (params) {
          var args = isAll ? validRest : _defineProperty({}, params.column.property, params);
          return new Promise(function (resolve, reject) {
            var finish = function finish() {
              params.cell = DomTools.getCell(_this23, params);

              _this23.handleValidError(params);

              if (cb) {
                status = false;
                resolve(cb(status, args));
              } else {
                reject(args);
              }
            };

            if (scrollYLoad) {
              var startIndex = _scrollYStore.startIndex,
                  renderSize = _scrollYStore.renderSize,
                  rowHeight = _scrollYStore.rowHeight;

              var rowIndex = _this23.getRowMapIndex(params.row);

              if (rowIndex < startIndex || rowIndex > startIndex + renderSize) {
                var bodyElem = _this23.$refs.tableBody.$el;
                bodyElem.scrollTop = (rowIndex - 1) * rowHeight;
                return setTimeout(finish, 40);
              }
            }

            finish();
          });
        });
      } else {
        if (cb) {
          cb(status);
        }
      }

      return Promise.resolve(true);
    },
    // validRowRules (type, row) {
    //   let { tableData, editRules } = this
    //   let rowIndex = tableData.indexOf(row)
    //   let validPromise = Promise.resolve()
    //   if (editRules) {
    //     this.getColumns().forEach(column => {
    //       if (XEUtils.has(editRules, column.property)) {
    //         validPromise = validPromise.then(() => new Promise((resolve, reject) => {
    //           this.validCellRules('all', row, column)
    //             .then(resolve)
    //             .catch(rule => {
    //               let rest = { rule, row, column, cell: DomTools.getCell(this, { row, rowIndex, column }) }
    //               return reject(rest)
    //             })
    //         }))
    //       }
    //     })
    //   }
    //   return validPromise
    // },
    hasCellRules: function hasCellRules(type, row, column) {
      var editRules = this.editRules;
      var property = column.property;

      if (property && editRules) {
        var rules = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(editRules, property);
        return rules && rules.find(function (rule) {
          return type === 'all' || !rule.trigger || type === rule.trigger;
        });
      }

      return false;
    },

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise，结果返回一个 Boolean 值
     * 如果是传回调方式这返回一个 Boolean 值和校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function(rule, value, callback, {rules, row, column, rowIndex, columnIndex}) 自定义校验
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validCellRules: function validCellRules(type, row, column, cellValue) {
      var _this24 = this;

      var editRules = this.editRules;
      var property = column.property;
      var errorRules = [];
      var cellVailds = [];

      if (property && editRules) {
        var rules = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(editRules, property);
        var value = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isUndefined(cellValue) ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property) : cellValue;

        if (rules) {
          rules.forEach(function (rule) {
            cellVailds.push(new Promise(function (resolve) {
              var isRequired = rule.required === true;

              if (type === 'all' || !rule.trigger || type === rule.trigger) {
                if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(rule.validator)) {
                  rule.validator(rule, value, function (e) {
                    if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isError(e)) {
                      var cusRule = {
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e.message,
                        rule: rule
                      };
                      errorRules.push(cusRule);
                    }

                    return resolve();
                  }, {
                    rules: rules,
                    row: row,
                    column: column,
                    rowIndex: _this24.getRowMapIndex(row),
                    columnIndex: _this24.getColumnMapIndex(column)
                  });
                } else {
                  var len;
                  var restVal = value;
                  var isNumber = rule.type === 'number';
                  var isEmpty = value === null || value === undefined || value === '';

                  if (isNumber) {
                    restVal = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(value);
                  } else {
                    len = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.getSize(restVal);
                  }

                  if (isRequired && isEmpty) {
                    errorRules.push(rule);
                  } else if (isNumber && isNaN(value) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isRegExp(rule.pattern) && !rule.pattern.test(value) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isNumber(rule.min) && (isNumber ? restVal < rule.min : len < rule.min) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isNumber(rule.max) && (isNumber ? restVal > rule.max : len > rule.max)) {
                    errorRules.push(rule);
                  }

                  resolve();
                }
              } else {
                resolve();
              }
            }));
          });
        }
      }

      return Promise.all(cellVailds).then(function () {
        if (errorRules.length) {
          var rest = {
            rules: errorRules,
            rule: errorRules[0]
          };
          return Promise.reject(rest);
        }
      });
    },
    clearValidate: function clearValidate() {
      var validTip = this.$refs.validTip;
      Object.assign(this.validStore, {
        visible: false,
        row: null,
        column: null,
        content: '',
        rule: null
      });

      if (validTip && validTip.visible) {
        validTip.close();
      }

      return this.$nextTick();
    },

    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError: function handleValidError(params) {
      var _this25 = this;

      this.handleActived(params, {
        type: 'valid-error',
        trigger: 'call'
      }).then(function () {
        return _this25.showValidTooltip(params);
      });
    },

    /**
     * 弹出校验错误提示
     */
    showValidTooltip: function showValidTooltip(params) {
      var _this26 = this;

      var $refs = this.$refs,
          height = this.height,
          tableData = this.tableData,
          validOpts = this.validOpts;
      var validTip = $refs.validTip;
      var rule = params.rule,
          row = params.row,
          column = params.column,
          cell = params.cell;
      this.$nextTick(function () {
        Object.assign(_this26.validStore, {
          row: row,
          column: column,
          rule: rule,
          content: UtilTools.formatText(rule.message),
          visible: true
        });

        if (validTip && (validOpts.message === 'tooltip' || validOpts.message === 'default' && !height && tableData.length < 2)) {
          validTip.toVisible(cell);
        }

        UtilTools.emitEvent(_this26, 'valid-error', [params]);
      });
    },

    /**
     * 导出 csv 文件
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了可视渲染，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     */
    exportCsv: function exportCsv(options) {
      var visibleColumn = this.visibleColumn,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad,
          treeConfig = this.treeConfig;
      var opts = Object.assign({
        filename: 'table.csv',
        original: !!treeConfig,
        isHeader: true,
        download: true,
        data: null,
        columns: null,
        columnFilterMethod: function columnFilterMethod(column) {
          return ['index', 'selection', 'radio'].indexOf(column.type) === -1 && column.property;
        },
        dataFilterMethod: null
      }, options);

      if (opts.filename.indexOf('.csv') === -1) {
        opts.filename += '.csv';
      }

      if (scrollXLoad || scrollYLoad) {
        opts.original = true;
      }

      var columns = visibleColumn;
      var oData = this.getTableData().fullData;

      if (treeConfig) {
        oData = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toTreeArray(oData, treeConfig);
      }

      return ExportTools.downloadCsc(opts, ExportTools.getCsvContent(opts, oData, columns, this.$el));
    },

    /*************************
     * Publish methods
     *************************/
    // 检查触发源是否属于目标节点
    getEventTargetNode: DomTools.getEventTargetNode
    /*************************
     * Publish methods
     *************************/

  }
});
// CONCATENATED MODULE: ./packages/table/index.js



table.install = function (Vue) {
  Vue.component(table.name, table);
};

var Table = table;
/* harmony default export */ var packages_table = (table);
// CONCATENATED MODULE: ./packages/column/src/column.js



/* harmony default export */ var src_column = ({
  name: 'VxeTableColumn',
  props: {
    // 渲染类型 index,radio,selection,expand
    type: String,
    // 在 v3.0 中废弃
    prop: String,
    // 在 v3.0 中废弃
    label: String,
    // 列属性
    field: String,
    // 列标题
    title: String,
    // 列宽度
    width: [Number, String],
    // 列最小宽度，把剩余宽度按比例分配
    minWidth: [Number, String],
    // 是否允许拖动列宽调整大小
    resizable: {
      type: Boolean,
      default: null
    },
    // 将列固定在左侧或者右侧
    fixed: String,
    // 列对其方式
    align: String,
    // 表头对齐方式
    headerAlign: String,
    // 当内容过长时显示为省略号
    showOverflow: {
      type: [Boolean, String],
      default: null
    },
    // 当表头内容过长时显示为省略号
    showHeaderOverflow: {
      type: [Boolean, String],
      default: null
    },
    // 格式化显示内容
    formatter: [Function, Array, String],
    // 自定义索引方法
    indexMethod: Function,
    // 是否允许排序
    sortable: Boolean,
    // 是否服务端排序
    remoteSort: Boolean,
    // 自定义排序的属性
    sortBy: [String, Array],
    // 配置筛选条件数组
    filters: Array,
    // 筛选是否允许多选
    filterMultiple: {
      type: Boolean,
      default: true
    },
    // 自定义筛选方法
    filterMethod: Function,
    // 筛选模板配置项
    filterRender: Object,
    // 指定为树节点
    treeNode: Boolean,
    // 列的 key
    columnKey: [String, Number],
    // 列编辑配置项
    editRender: Object,
    // 额外的参数
    params: Object
  },
  inject: ['$table'],
  created: function created() {
    this.columnConfig = this.createColumn(this.$table, this);
  },
  mounted: function mounted() {
    UtilTools.assemColumn(this);
  },
  destroyed: function destroyed() {
    UtilTools.destroyColumn(this);
  },
  render: function render(h) {
    return h('div', this.$slots.default);
  },
  methods: packages_cell
});
// CONCATENATED MODULE: ./packages/column/index.js



src_column.install = function (Vue) {
  Vue.component(src_column.name, src_column);
};

var Column = src_column;
/* harmony default export */ var packages_column = (src_column);
// CONCATENATED MODULE: ./packages/header/src/header.js






var getAllColumns = function getAllColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.visible) {
      if (column.children && column.children.length && column.children.some(function (column) {
        return column.visible;
      })) {
        result.push(column);
        result.push.apply(result, getAllColumns(column.children));
      } else {
        result.push(column);
      }
    }
  });
  return result;
};

var convertToRows = function convertToRows(originColumns) {
  var maxLevel = 1;

  var traverse = function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;

      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }

    if (column.children && column.children.length && column.children.some(function (column) {
      return column.visible;
    })) {
      var colSpan = 0;
      column.children.forEach(function (subColumn) {
        if (subColumn.visible) {
          traverse(subColumn, column);
          colSpan += subColumn.colSpan;
        }
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(function (column) {
    column.level = 1;
    traverse(column);
  });
  var rows = [];

  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  var allColumns = getAllColumns(originColumns);
  allColumns.forEach(function (column) {
    if (column.children && column.children.length && column.children.some(function (column) {
      return column.visible;
    })) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = maxLevel - column.level + 1;
    }

    rows[column.level - 1].push(column);
  });
  return rows;
};

/* harmony default export */ var header = ({
  name: 'VxeTableHeader',
  props: {
    tableData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
  },
  data: function data() {
    return {
      headerColumn: []
    };
  },
  watch: {
    tableColumn: function tableColumn() {
      this.uploadColumn();
    }
  },
  created: function created() {
    this.uploadColumn();
  },
  render: function render(h) {
    var $table = this.$parent,
        fixedType = this.fixedType,
        headerColumn = this.headerColumn,
        tableColumn = this.tableColumn,
        resizeMousedown = this.resizeMousedown,
        fixedColumn = this.fixedColumn;
    var tableListeners = $table.$listeners,
        resizable = $table.resizable,
        border = $table.border,
        overflowX = $table.overflowX,
        headerRowClassName = $table.headerRowClassName,
        headerCellClassName = $table.headerCellClassName,
        allHeaderOverflow = $table.showHeaderOverflow,
        oldHeaderOverflow = $table.showHeaderAllOverflow,
        allHeaderAlign = $table.headerAlign,
        allAlign = $table.align,
        highlightCurrentColumn = $table.highlightCurrentColumn,
        selectColumn = $table.selectColumn,
        tableWidth = $table.tableWidth,
        scrollXLoad = $table.scrollXLoad,
        scrollXStore = $table.scrollXStore,
        scrollbarWidth = $table.scrollbarWidth,
        getColumnMapIndex = $table.getColumnMapIndex; // v2.0 废弃属性，保留兼容

    var allColumnHeaderOverflow = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(oldHeaderOverflow) ? oldHeaderOverflow : allHeaderOverflow; // 横向滚动渲染

    if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }

      tableWidth = tableColumn.reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    }

    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? "fixed--".concat(fixedType, "-wrapper") : 'body--wrapper']
    }, [!fixedType && scrollXLoad ? h('div', {
      class: ['vxe-body--x-space'],
      style: {
        width: "".concat($table.tableWidth + scrollbarWidth, "px")
      }
    }) : null, h('table', {
      class: 'vxe-table--header',
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      style: {
        width: tableWidth === null ? tableWidth : "".concat(tableWidth + scrollbarWidth, "px"),
        'margin-left': fixedType ? null : "".concat(scrollXStore.leftSpaceWidth, "px")
      }
    }, [
    /**
     * 列宽
     */
    h('colgroup', tableColumn.map(function (column, columnIndex) {
      return h('col', {
        attrs: {
          name: column.id,
          width: column.renderWidth
        },
        key: columnIndex
      });
    }).concat([h('col', {
      attrs: {
        width: scrollbarWidth
      }
    })])),
    /**
     * 头部
     */
    h('thead', headerColumn.map(function (cols, $rowIndex) {
      return h('tr', {
        class: ['vxe-header--row', headerRowClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(headerRowClassName) ? headerRowClassName({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : headerRowClassName : '']
      }, cols.map(function (column, $columnIndex) {
        var _ref;

        var columnKey = column.columnKey,
            showHeaderOverflow = column.showHeaderOverflow,
            headerAlign = column.headerAlign,
            align = column.align,
            renderWidth = column.renderWidth,
            own = column.own;
        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var headOverflow = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isUndefined(showHeaderOverflow) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
        var headAlign = headerAlign || align || allHeaderAlign || allAlign;
        var showEllipsis = headOverflow === 'ellipsis';
        var showTitle = headOverflow === 'title';
        var showTooltip = headOverflow === true || headOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var thOns = {}; // 确保任何情况下 columnIndex 都精准指向真实列索引

        var columnIndex = getColumnMapIndex(column);

        if (showTooltip) {
          thOns.mouseover = function (evnt) {
            return $table.triggerHeaderTooltipEvent(evnt, {
              $table: $table,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType
            });
          };

          thOns.mouseout = $table.clostTooltip;
        }

        if (highlightCurrentColumn || tableListeners['header-cell-click']) {
          thOns.click = function (evnt) {
            return $table.triggerHeaderCellClickEvent(evnt, {
              $table: $table,
              $rowIndex: $rowIndex,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            });
          };
        }

        if (tableListeners['header-cell-dblclick']) {
          thOns.dblclick = function (evnt) {
            return UtilTools.emitEvent($table, 'header-cell-dblclick', [{
              $table: $table,
              $rowIndex: $rowIndex,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        }

        return h('th', {
          class: ['vxe-header--column', column.id, (_ref = {}, _defineProperty(_ref, "col--".concat(headAlign), headAlign), _defineProperty(_ref, 'col--group', isColGroup), _defineProperty(_ref, 'col--ellipsis', hasEllipsis), _defineProperty(_ref, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref, 'col--current', selectColumn === column), _defineProperty(_ref, 'filter--active', column.filters.some(function (item) {
            return item.checked;
          })), _ref), headerCellClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(headerCellClassName) ? headerCellClassName({
            $table: $table,
            $rowIndex: $rowIndex,
            column: column,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            fixed: fixedType
          }) : headerCellClassName : ''],
          attrs: {
            'data-index': columnIndex,
            'data-colid': column.id,
            colspan: column.colSpan,
            rowspan: column.rowSpan
          },
          on: thOns,
          key: columnKey || (isColGroup ? column.id : columnIndex)
        }, [h('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }],
          attrs: {
            title: showTitle ? own.title || own.label : null
          },
          style: {
            width: hasEllipsis ? "".concat(border ? renderWidth - 1 : renderWidth, "px") : null
          }
        }, column.renderHeader(h, {
          $table: $table,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          fixed: fixedType,
          isHidden: fixedHiddenColumn
        })),
        /**
         * 列宽拖动
         * 固定列不允许拖动 -> 待解决 需要处理的逻辑复杂、涉及场景较大
         */
        !fixedHiddenColumn && !isColGroup && (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(column.resizable) ? column.resizable : resizable) ? h('div', {
          class: ['vxe-resizable', {
            'is--line': !border
          }],
          on: {
            mousedown: function mousedown(evnt) {
              return resizeMousedown(evnt, column);
            }
          }
        }) : null]);
      }).concat(scrollbarWidth ? [h('th', {
        class: ['col--gutter'],
        style: {
          width: "".concat(scrollbarWidth, "px")
        }
      })] : []));
    }))]),
    /**
     * 其他
     */
    h('div', {
      class: ['vxe-table--repair'],
      style: {
        width: tableWidth === null ? tableWidth : "".concat(tableWidth, "px")
      }
    })]);
  },
  methods: {
    uploadColumn: function uploadColumn() {
      this.headerColumn = this.isGroup ? convertToRows(this.collectColumn) : [this.$parent.scrollXLoad && this.fixedType ? this.fixedColumn : this.tableColumn];
    },
    resizeMousedown: function resizeMousedown(evnt, column) {
      var $table = this.$parent,
          $el = this.$el,
          fixedType = this.fixedType;
      var _$table$$refs = $table.$refs,
          tableBody = _$table$$refs.tableBody,
          leftContainer = _$table$$refs.leftContainer,
          rightContainer = _$table$$refs.rightContainer,
          resizeBarElem = _$table$$refs.resizeBar;
      var dragBtnElem = evnt.target,
          dragClientX = evnt.clientX;
      var cell = dragBtnElem.parentNode;
      var dragLeft = 0;
      var minInterval = 36; // 列之间的最小间距

      var tableBodyElem = tableBody.$el;
      var pos = DomTools.getOffsetPos(dragBtnElem, $el);
      var dragBtnWidth = dragBtnElem.clientWidth;
      var dragMinLeft = pos.left - cell.clientWidth + dragBtnWidth + minInterval;
      var dragPosLeft = pos.left + Math.floor(dragBtnWidth / 2);
      var domMousemove = document.onmousemove;
      var domMouseup = document.onmouseup;
      var isLeftFixed = fixedType === 'left';
      var isRightFixed = fixedType === 'right'; // 计算左右侧固定列偏移量

      var fixedOffsetWidth = 0;

      if (isLeftFixed || isRightFixed) {
        var siblingProp = isLeftFixed ? 'nextElementSibling' : 'previousElementSibling';
        var tempCellElem = cell[siblingProp];

        while (tempCellElem) {
          if (DomTools.hasClass(tempCellElem, 'fixed--hidden')) {
            break;
          } else if (!DomTools.hasClass(tempCellElem, 'col--group')) {
            fixedOffsetWidth += tempCellElem.offsetWidth;
          }

          tempCellElem = tempCellElem[siblingProp];
        }

        if (isRightFixed && rightContainer) {
          dragPosLeft = rightContainer.offsetLeft + fixedOffsetWidth;
        }
      } // 处理拖动事件


      var updateEvent = function updateEvent(evnt) {
        evnt.stopPropagation();
        evnt.preventDefault();
        var offsetX = evnt.clientX - dragClientX;
        var left = dragPosLeft + offsetX;
        var scrollLeft = fixedType ? 0 : tableBodyElem.scrollLeft;

        if (isLeftFixed) {
          // 左固定列（不允许超过右侧固定列、不允许超过右边距）
          left = Math.min(left, (rightContainer ? rightContainer.offsetLeft : tableBodyElem.clientWidth) - fixedOffsetWidth - minInterval);
        } else if (isRightFixed) {
          // 右侧固定列（不允许超过左侧固定列、不允许超过左边距）
          dragMinLeft = (leftContainer ? leftContainer.clientWidth : 0) + fixedOffsetWidth + minInterval;
          left = Math.min(left, dragPosLeft + cell.clientWidth - minInterval);
        }

        dragLeft = Math.max(left, dragMinLeft);
        resizeBarElem.style.left = "".concat(dragLeft - scrollLeft, "px");
      };

      resizeBarElem.style.display = 'block';
      document.onmousemove = updateEvent;

      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        column.resizeWidth = column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft);
        resizeBarElem.style.display = 'none';
        $table.analyColumnWidth();
        $table.recalculate(true);
      };

      updateEvent(evnt);
    }
  }
});
// CONCATENATED MODULE: ./packages/header/index.js



header.install = function (Vue) {
  Vue.component(header.name, header);
};

var Header = header;
/* harmony default export */ var packages_header = (header);
// CONCATENATED MODULE: ./packages/body/src/body.js






 // 处理选中位置

function handleLocation(obj, rows, columns, row, column) {
  var rowIndex = rows.indexOf(row);
  var columnIndex = columns.indexOf(column);
  obj.active = rowIndex > -1 && columnIndex > -1;
  obj.top = rowIndex === 0 && columnIndex > -1;
  obj.bottom = rowIndex === rows.length - 1 && columnIndex > -1;
  obj.left = rowIndex > -1 && columnIndex === 0;
  obj.right = rowIndex > -1 && columnIndex === columns.length - 1;
}
/**
 * 渲染列
 */


function renderColumn(h, _vm, $table, $seq, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex) {
  var _ref2;

  var _e = $table._e,
      tableListeners = $table.$listeners,
      tableData = $table.tableData,
      height = $table.height,
      overflowX = $table.overflowX,
      scrollXLoad = $table.scrollXLoad,
      scrollYLoad = $table.scrollYLoad,
      border = $table.border,
      highlightCurrentRow = $table.highlightCurrentRow,
      allShowOverflow = $table.showOverflow,
      oldShowAllOverflow = $table.showAllOverflow,
      allAlign = $table.align,
      selectColumn = $table.selectColumn,
      cellClassName = $table.cellClassName,
      spanMethod = $table.spanMethod,
      keyboardConfig = $table.keyboardConfig,
      _$table$radioConfig = $table.radioConfig,
      radioConfig = _$table$radioConfig === void 0 ? {} : _$table$radioConfig,
      _$table$selectConfig = $table.selectConfig,
      selectConfig = _$table$selectConfig === void 0 ? {} : _$table$selectConfig,
      _$table$treeConfig = $table.treeConfig,
      treeConfig = _$table$treeConfig === void 0 ? {} : _$table$treeConfig,
      mouseConfig = $table.mouseConfig,
      editConfig = $table.editConfig,
      editRules = $table.editRules,
      validOpts = $table.validOpts,
      editStore = $table.editStore,
      validStore = $table.validStore; // v2.0 废弃属性，保留兼容

  var allColumnOverflow = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow;
  var editRender = column.editRender,
      align = column.align,
      showOverflow = column.showOverflow,
      renderWidth = column.renderWidth,
      columnKey = column.columnKey;
  var checked = editStore.checked,
      selected = editStore.selected,
      actived = editStore.actived,
      copyed = editStore.copyed;
  var isMouseSelected = mouseConfig && mouseConfig.selected;
  var isMouseChecked = mouseConfig && mouseConfig.checked;
  var isKeyboardCut = keyboardConfig && keyboardConfig.isCut;
  var fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX;
  var cellOverflow = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isUndefined(showOverflow) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isNull(showOverflow) ? allColumnOverflow : showOverflow;
  var cellAlign = align || allAlign;
  var showEllipsis = cellOverflow === 'ellipsis';
  var showTitle = cellOverflow === 'title';
  var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
  var hasEllipsis = showTitle || showTooltip || showEllipsis;
  var isDirty;
  var tdOns = {};
  var checkedLocat = {};
  var checkedTLocat = {};
  var copyedLocat = {};
  var validError = validStore.row === row && validStore.column === column;
  var hasDefaultTip = editRules && (validOpts.message === 'default' ? height || tableData.length > 1 : validOpts.message === 'inline');
  var attrs = {
    'data-index': columnIndex
  };
  var triggerDblclick = editRender && editConfig && editConfig.trigger === 'dblclick';
  var params = {
    $table: $table,
    $seq: $seq,
    seq: seq,
    row: row,
    rowIndex: rowIndex,
    $rowIndex: $rowIndex,
    column: column,
    columnIndex: columnIndex,
    $columnIndex: $columnIndex,
    fixed: fixedType,
    level: rowLevel,
    isHidden: fixedHiddenColumn,
    data: tableData // 滚动的渲染不支持动态行高

  };

  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true;
  } // hover 进入事件


  if (showTooltip || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = function (evnt) {
      var evntParams = {
        $table: $table,
        seq: seq,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget // 如果配置了显示 tooltip

      };

      if (showTooltip) {
        $table.triggerTooltipEvent(evnt, evntParams);
      }

      UtilTools.emitEvent($table, 'cell-mouseenter', [evntParams, evnt]);
    };
  } // hover 退出事件


  if (showTooltip || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = function (evnt) {
      $table.clostTooltip();
      UtilTools.emitEvent($table, 'cell-mouseleave', [{
        $table: $table,
        seq: seq,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      }, evnt]);
    };
  } // 按下事件处理


  tdOns.mousedown = function (evnt) {
    $table.triggerCellMousedownEvent(evnt, {
      $table: $table,
      seq: seq,
      row: row,
      rowIndex: rowIndex,
      $rowIndex: $rowIndex,
      column: column,
      columnIndex: columnIndex,
      $columnIndex: $columnIndex,
      fixed: fixedType,
      level: rowLevel,
      cell: evnt.currentTarget
    });
  }; // 点击事件处理


  if (highlightCurrentRow || tableListeners['cell-click'] || editRender && editConfig || radioConfig.trigger === 'row' || column.type === 'radio' && radioConfig.trigger === 'cell' || selectConfig.trigger === 'row' || column.type === 'selection' && selectConfig.trigger === 'cell' || treeConfig.trigger === 'row' || column.treeNode && treeConfig.trigger === 'cell') {
    tdOns.click = function (evnt) {
      $table.triggerCellClickEvent(evnt, {
        $table: $table,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 双击事件处理


  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = function (evnt) {
      $table.triggerCellDBLClickEvent(evnt, {
        $table: $table,
        seq: seq,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 合并行或列


  if (spanMethod) {
    var _ref = spanMethod(params) || {},
        _ref$rowspan = _ref.rowspan,
        rowspan = _ref$rowspan === void 0 ? 1 : _ref$rowspan,
        _ref$colspan = _ref.colspan,
        colspan = _ref$colspan === void 0 ? 1 : _ref$colspan;

    if (!rowspan || !colspan) {
      return null;
    }

    attrs.rowspan = rowspan;
    attrs.colspan = colspan;
  } // 如果显示状态


  if (!fixedHiddenColumn && editConfig && editConfig.showStatus) {
    isDirty = $table.hasRowChange(row, column.property);
  } // 批量选中处理


  if (!fixedHiddenColumn && !fixedType) {
    if (isMouseChecked) {
      handleLocation(checkedLocat, checked.rows, checked.columns, row, column);
      handleLocation(checkedTLocat, checked.tRows, checked.tColumns, row, column);
    }

    if (isKeyboardCut) {
      handleLocation(copyedLocat, copyed.rows, copyed.columns, row, column);
    }
  }

  return h('td', {
    class: ['vxe-body--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(cellAlign), cellAlign), _defineProperty(_ref2, 'col--edit', editRender), _defineProperty(_ref2, 'col--checked', checkedLocat.active), _defineProperty(_ref2, 'col--checked-top', checkedLocat.top), _defineProperty(_ref2, 'col--checked-bottom', checkedLocat.bottom), _defineProperty(_ref2, 'col--checked-left', checkedLocat.left), _defineProperty(_ref2, 'col--checked-right', checkedLocat.right), _defineProperty(_ref2, 'col--checked-temp', checkedTLocat.active), _defineProperty(_ref2, 'col--checked-temp-top', checkedTLocat.top), _defineProperty(_ref2, 'col--checked-temp-bottom', checkedTLocat.bottom), _defineProperty(_ref2, 'col--checked-temp-left', checkedTLocat.left), _defineProperty(_ref2, 'col--checked-temp-right', checkedTLocat.right), _defineProperty(_ref2, 'col--selected', isMouseSelected && editRender && selected.row === row && selected.column === column), _defineProperty(_ref2, 'col--copyed', copyedLocat.active), _defineProperty(_ref2, 'col--copyed-top', copyedLocat.top), _defineProperty(_ref2, 'col--copyed-bottom', copyedLocat.bottom), _defineProperty(_ref2, 'col--copyed-left', copyedLocat.left), _defineProperty(_ref2, 'col--copyed-right', copyedLocat.right), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'col--actived', editConfig && editRender && actived.row === row && (actived.column === column || editConfig.mode === 'row')), _defineProperty(_ref2, 'col--dirty', isDirty), _defineProperty(_ref2, 'col--valid-error', validError), _defineProperty(_ref2, 'col--current', selectColumn === column), _defineProperty(_ref2, 'edit--visible', editRender && editRender.type === 'visible'), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _ref2), cellClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(cellClassName) ? cellClassName(params) : cellClassName : ''],
    key: columnKey || columnIndex,
    attrs: attrs,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn ? [] : [h('div', {
    class: ['vxe-cell', {
      'c--title': showTitle,
      'c--tooltip': showTooltip,
      'c--ellipsis': showEllipsis
    }],
    attrs: {
      title: showTitle ? UtilTools.getCellLabel(row, column, params) : null
    },
    style: {
      width: hasEllipsis ? "".concat(border ? renderWidth - 1 : renderWidth, "px") : null
    }
  }, column.renderCell(h, params)), hasDefaultTip ? validError ? h('div', {
    class: 'vxe-cell--valid',
    style: validStore.rule && validStore.rule.width ? {
      width: "".concat(validStore.rule.width, "px")
    } : null
  }, [h('span', {
    class: 'vxe-cell--valid-msg'
  }, validStore.content)]) : _e() : null, isMouseChecked && !fixedType ? h('span', {
    class: 'vxe-body--column-checked-lt'
  }) : null, isMouseChecked && !fixedType ? h('span', {
    class: 'vxe-body--column-checked-rb'
  }) : null, isKeyboardCut && !fixedType ? h('span', {
    class: 'vxe-body--column-copyed-lt'
  }) : null, isKeyboardCut && !fixedType ? h('span', {
    class: 'vxe-body--column-copyed-rb'
  }) : null, checkedLocat.bottom && checkedLocat.right ? h('span', {
    class: 'vxe-body--column-checked-corner',
    on: {
      mousedown: function mousedown(evnt) {
        $table.triggerCornerMousedownEvent({
          $table: $table,
          seq: seq,
          row: row,
          rowIndex: rowIndex,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          fixed: fixedType,
          level: rowLevel,
          cell: evnt.target.parentNode
        }, evnt);
      }
    }
  }) : null]);
}

function renderRows(h, _vm, $table, $seq, rowLevel, fixedType, tableData, tableColumn) {
  var rowKey = $table.rowKey,
      highlightHoverRow = $table.highlightHoverRow,
      highlightCurrentRow = $table.highlightCurrentRow,
      rowClassName = $table.rowClassName,
      currentRow = $table.currentRow,
      hoverRow = $table.hoverRow,
      treeConfig = $table.treeConfig,
      treeExpandeds = $table.treeExpandeds,
      scrollYLoad = $table.scrollYLoad,
      overflowX = $table.overflowX,
      columnStore = $table.columnStore,
      scrollYStore = $table.scrollYStore,
      editStore = $table.editStore,
      expandeds = $table.expandeds,
      getRowMapIndex = $table.getRowMapIndex,
      getColumnMapIndex = $table.getColumnMapIndex;
  var leftList = columnStore.leftList,
      rightList = columnStore.rightList;
  var rows = [];
  tableData.forEach(function (row, $rowIndex) {
    var _ref3;

    var trOn = {};
    var rowIndex = $rowIndex;
    var seq = rowIndex + 1;

    if (scrollYLoad) {
      seq += scrollYStore.startIndex;
    } // 确保任何情况下 rowIndex 都精准指向真实 data 索引


    rowIndex = getRowMapIndex(row); // 事件绑定

    if (highlightHoverRow && (leftList.length || rightList.length) && overflowX) {
      trOn.mouseenter = function (evnt) {
        if (row !== hoverRow) {
          $table.triggerHoverEvent(evnt, {
            row: row,
            rowIndex: rowIndex
          });
        }
      };

      trOn.mouseleave = function (evnt) {
        $table.hoverRow = null;
      };
    }

    var rowPrimaryKey = UtilTools.getRowPrimaryKey($table, row, rowIndex);
    rows.push(h('tr', {
      class: ['vxe-body--row', (_ref3 = {}, _defineProperty(_ref3, "row--level-".concat(rowLevel), treeConfig), _defineProperty(_ref3, 'row--current', highlightCurrentRow && row === currentRow), _defineProperty(_ref3, 'row--hover', row === hoverRow), _defineProperty(_ref3, 'row--new', editStore.insertList.indexOf(row) > -1), _ref3), rowClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(rowClassName) ? rowClassName({
        $table: $table,
        seq: seq,
        row: row,
        rowIndex: rowIndex
      }) : rowClassName : ''],
      attrs: {
        'data-rowid': rowPrimaryKey
      },
      key: treeConfig ? rowPrimaryKey : rowKey ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey) : $rowIndex,
      on: trOn
    }, tableColumn.map(function (column, $columnIndex) {
      var columnIndex = getColumnMapIndex(column);
      return renderColumn(h, _vm, $table, $seq, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex);
    }))); // 如果行被展开了

    if (expandeds.length && expandeds.indexOf(row) > -1) {
      var column = tableColumn.find(function (column) {
        return column.type === 'expand';
      });
      var columnIndex = getColumnMapIndex(column);

      if (column) {
        rows.push(h('tr', {
          class: 'vxe-body--expanded-row',
          key: "expand_".concat(rowPrimaryKey),
          on: trOn
        }, [h('td', {
          class: 'vxe-body--expanded-column',
          attrs: {
            colspan: tableColumn.length
          }
        }, [h('div', {
          class: 'vxe-body--expanded-cell'
        }, [column.renderData(h, {
          $table: $table,
          seq: seq,
          row: row,
          rowIndex: rowIndex,
          column: column,
          columnIndex: columnIndex,
          fixed: fixedType,
          level: rowLevel
        })])])]));
      }
    } // 如果是树形表格


    if (treeConfig && treeExpandeds.length) {
      var rowChildren = row[treeConfig.children];

      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, renderRows(h, _vm, $table, $seq ? "".concat($seq, ".").concat(seq) : "".concat(seq), rowLevel + 1, fixedType, rowChildren, tableColumn));
      }
    }
  });
  return rows;
}
/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，处理相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
 */


var scrollProcessTimeout;
var updateLeftScrollingTimeput;

function syncBodyScroll(scrollTop, elem1, elem2) {
  if (elem1 || elem2) {
    if (elem1) {
      elem1.onscroll = null;
      elem1.scrollTop = scrollTop;
    }

    if (elem2) {
      elem2.onscroll = null;
      elem2.scrollTop = scrollTop;
    }

    clearTimeout(scrollProcessTimeout);
    scrollProcessTimeout = setTimeout(function () {
      if (elem1) {
        elem1.onscroll = elem1._onscroll;
      }

      if (elem2) {
        elem2.onscroll = elem2._onscroll;
      }
    }, 100);
  }
}

/* harmony default export */ var src_body = ({
  name: 'VxeTableBody',
  props: {
    tableData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
  },
  mounted: function mounted() {
    this.$el.onscroll = this.scrollEvent;
    this.$el._onscroll = this.scrollEvent;
  },
  beforeDestroy: function beforeDestroy() {
    this.$el._onscroll = null;
    this.$el.onscroll = null;
  },
  render: function render(h) {
    var $table = this.$parent,
        fixedColumn = this.fixedColumn,
        fixedType = this.fixedType;
    var maxHeight = $table.maxHeight,
        height = $table.height,
        containerHeight = $table.containerHeight,
        loading = $table.loading,
        tableData = $table.tableData,
        tableColumn = $table.tableColumn,
        headerHeight = $table.headerHeight,
        showFooter = $table.showFooter,
        allShowOverflow = $table.showOverflow,
        oldShowAllOverflow = $table.showAllOverflow,
        footerHeight = $table.footerHeight,
        tableHeight = $table.tableHeight,
        tableWidth = $table.tableWidth,
        overflowY = $table.overflowY,
        scrollbarHeight = $table.scrollbarHeight,
        scrollbarWidth = $table.scrollbarWidth,
        scrollXStore = $table.scrollXStore,
        scrollXLoad = $table.scrollXLoad,
        scrollYStore = $table.scrollYStore,
        scrollYLoad = $table.scrollYLoad; // v2.0 废弃属性，保留兼容

    var allColumnOverflow = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow;
    var customHeight = height === 'auto' ? containerHeight : external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(height);
    var style = {};

    if (customHeight > 0) {
      style.height = "".concat(fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight, "px");
    } else if (maxHeight) {
      maxHeight = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(maxHeight);
      style['max-height'] = "".concat(fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : maxHeight - headerHeight, "px");
    } // 如果是固定列与设置了超出隐藏


    if (fixedType && allColumnOverflow) {
      tableColumn = fixedColumn;
      tableWidth = tableColumn.reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }

      tableWidth = tableColumn.reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    }

    var tableStyle = {
      width: tableWidth ? "".concat(tableWidth, "px") : tableWidth,
      marginLeft: fixedType ? null : "".concat(scrollXStore.leftSpaceWidth, "px") // 兼容火狐滚动条

    };

    if (overflowY && fixedType && (DomTools.browse['-moz'] || DomTools.browse['safari'])) {
      tableStyle.paddingRight = "".concat(scrollbarWidth, "px");
    }

    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? "fixed--".concat(fixedType, "-wrapper") : 'body--wrapper'],
      attrs: {
        fixed: fixedType
      },
      style: style
    }, [scrollYLoad ? h('div', {
      class: ['vxe-body--top-space'],
      style: {
        height: "".concat(scrollYStore.topSpaceHeight, "px")
      }
    }) : null, !fixedType && scrollXLoad ? h('div', {
      class: ['vxe-body--x-space'],
      style: {
        width: "".concat($table.tableWidth, "px")
      }
    }) : null, h('table', {
      class: ['vxe-table--body'],
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      style: tableStyle
    }, [
    /**
     * 列宽
     */
    h('colgroup', tableColumn.map(function (column, columnIndex) {
      return h('col', {
        attrs: {
          name: column.id,
          width: column.renderWidth
        },
        key: columnIndex
      });
    })),
    /**
     * 内容
     */
    h('tbody', renderRows(h, this, $table, '', 0, fixedType, tableData, tableColumn))]), !fixedType && !loading && !tableData.length ? h('div', {
      class: 'vxe-table--empty-block',
      style: {
        width: tableWidth ? "".concat(tableWidth, "px") : tableWidth
      }
    }, [h('span', {
      class: 'vxe-table--empty-text'
    }, $table.$slots.empty || conf.i18n('vxe.table.emptyText'))]) : null, scrollYLoad ? h('div', {
      class: ['vxe-body--bottom-space'],
      style: {
        height: "".concat(scrollYStore.bottomSpaceHeight, "px")
      }
    }) : null]);
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent: function scrollEvent(evnt) {
      var $table = this.$parent,
          fixedType = this.fixedType,
          lastScrollTop = this.lastScrollTop,
          lastScrollLeft = this.lastScrollLeft;
      var $refs = $table.$refs,
          scrollXLoad = $table.scrollXLoad,
          scrollYLoad = $table.scrollYLoad,
          triggerScrollXEvent = $table.triggerScrollXEvent,
          triggerScrollYEvent = $table.triggerScrollYEvent;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          leftBody = $refs.leftBody,
          rightBody = $refs.rightBody;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var bodyElem = tableBody.$el;
      var leftElem = leftBody ? leftBody.$el : null;
      var rightElem = rightBody ? rightBody.$el : null;
      var scrollTop = bodyElem.scrollTop;
      var scrollLeft = bodyElem.scrollLeft;
      var isX = lastScrollLeft !== scrollLeft;
      var isY = lastScrollTop !== scrollTop;

      if (leftElem && fixedType === 'left') {
        scrollTop = leftElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, rightElem);
      } else if (rightElem && fixedType === 'right') {
        scrollTop = rightElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, leftElem);
      } else {
        if (headerElem) {
          headerElem.scrollLeft = bodyElem.scrollLeft;
        } // 缓解 IE 卡顿


        if (leftElem || rightElem) {
          clearTimeout(updateLeftScrollingTimeput);
          updateLeftScrollingTimeput = setTimeout($table.checkScrolling, DomTools.browse.msie ? 200 : 20);
          syncBodyScroll(scrollTop, leftElem, rightElem);
        }
      }

      if (scrollXLoad) {
        triggerScrollXEvent(evnt);
      }

      if (scrollYLoad) {
        triggerScrollYEvent(evnt);
      }

      $table.lastScrollTop = scrollTop;
      $table.lastScrollLeft = scrollLeft;
      UtilTools.emitEvent($table, 'scroll', [{
        type: 'body',
        fixed: fixedType,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        isX: isX,
        isY: isY,
        $table: $table
      }, evnt]);
    }
  }
});
// CONCATENATED MODULE: ./packages/body/index.js



src_body.install = function (Vue) {
  Vue.component(src_body.name, src_body);
};

var Body = src_body;
/* harmony default export */ var packages_body = (src_body);
// CONCATENATED MODULE: ./packages/footer/src/footer.js




/* harmony default export */ var footer = ({
  name: 'VxeTableFooter',
  props: {
    footerData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
  },
  render: function render(h) {
    var $table = this.$parent,
        fixedType = this.fixedType,
        fixedColumn = this.fixedColumn,
        tableColumn = this.tableColumn,
        footerData = this.footerData;
    var tableListeners = $table.$listeners,
        footerRowClassName = $table.footerRowClassName,
        footerCellClassName = $table.footerCellClassName,
        tableWidth = $table.tableWidth,
        scrollbarWidth = $table.scrollbarWidth,
        scrollbarHeight = $table.scrollbarHeight,
        scrollXLoad = $table.scrollXLoad,
        scrollXStore = $table.scrollXStore,
        optimizeOpts = $table.optimizeOpts,
        overflowX = $table.overflowX,
        getColumnMapIndex = $table.getColumnMapIndex;
    var overflow = optimizeOpts.overflow; // 如果是使用优化模式

    if (fixedType && overflow) {
      tableColumn = fixedColumn;
      tableWidth = tableColumn.reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }

      tableWidth = tableColumn.reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    }

    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? "fixed--".concat(fixedType, "-wrapper") : 'footer--wrapper'],
      style: {
        'margin-top': "".concat(-scrollbarHeight - 1, "px")
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [!fixedType && scrollXLoad ? h('div', {
      class: ['vxe-body--x-space'],
      style: {
        width: "".concat($table.tableWidth, "px")
      }
    }) : null, h('table', {
      class: 'vxe-table--footer',
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      style: {
        width: tableWidth === null ? tableWidth : "".concat(tableWidth + scrollbarWidth, "px"),
        'margin-left': fixedType ? null : "".concat(scrollXStore.leftSpaceWidth, "px")
      }
    }, [
    /**
     * 列宽
     */
    h('colgroup', tableColumn.map(function (column, columnIndex) {
      return h('col', {
        attrs: {
          name: column.id,
          width: column.renderWidth
        }
      });
    }).concat([h('col', {
      attrs: {
        width: scrollbarWidth
      }
    })])),
    /**
     * 底部
     */
    h('tfoot', footerData.map(function (list, $rowIndex) {
      return h('tr', {
        class: ['vxe-footer--row', footerRowClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(footerRowClassName) ? footerRowClassName({
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : footerRowClassName : '']
      }, tableColumn.map(function (column, $columnIndex) {
        var _ref;

        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var tfOns = {}; // 确保任何情况下 columnIndex 都精准指向真实列索引

        var columnIndex = getColumnMapIndex(column);

        if (tableListeners['header-cell-click']) {
          tfOns.click = function (evnt) {
            UtilTools.emitEvent($table, 'header-cell-click', [{
              $table: $table,
              $rowIndex: $rowIndex,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        }

        if (tableListeners['header-cell-dblclick']) {
          tfOns.dblclick = function (evnt) {
            UtilTools.emitEvent($table, 'header-cell-dblclick', [{
              $table: $table,
              $rowIndex: $rowIndex,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        }

        return h('td', {
          class: ['vxe-footer--column', column.id, (_ref = {}, _defineProperty(_ref, "col--".concat(column.headerAlign), column.headerAlign), _defineProperty(_ref, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref, 'filter--active', column.filters.some(function (item) {
            return item.checked;
          })), _ref), footerCellClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(footerCellClassName) ? footerCellClassName({
            $rowIndex: $rowIndex,
            column: column,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            fixed: fixedType
          }) : footerCellClassName : ''],
          attrs: {
            'data-index': columnIndex
          },
          on: tfOns,
          key: columnIndex
        }, [h('div', {
          class: ['vxe-cell']
        }, list[fixedType === 'right' ? list.length - tableColumn.length + columnIndex : columnIndex])]);
      }).concat([h('td', {
        class: ['col--gutter'],
        style: {
          width: "".concat(scrollbarWidth, "px")
        }
      })]));
    }))])]);
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent: function scrollEvent(evnt) {
      var $table = this.$parent,
          fixedType = this.fixedType;
      var $refs = $table.$refs,
          scrollXLoad = $table.scrollXLoad,
          triggerScrollXEvent = $table.triggerScrollXEvent;
      var tableHeader = $refs.tableHeader;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var bodyElem = $refs.tableBody.$el;
      var footerElem = $refs.tableFooter.$el;
      var scrollLeft = footerElem.scrollLeft;

      if (headerElem) {
        headerElem.scrollLeft = scrollLeft;
      }

      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft;
      }

      if (scrollXLoad) {
        triggerScrollXEvent(evnt);
      }

      UtilTools.emitEvent($table, 'scroll', [{
        type: 'footer',
        fixed: fixedType,
        scrollTop: bodyElem.scrollTop,
        scrollLeft: scrollLeft,
        $table: $table
      }, evnt]);
    }
  }
});
// CONCATENATED MODULE: ./packages/footer/index.js



footer.install = function (Vue) {
  Vue.component(footer.name, footer);
};

var Footer = footer;
/* harmony default export */ var packages_footer = (footer);
// CONCATENATED MODULE: ./packages/filter/src/filter.js





/* harmony default export */ var filter = ({
  name: 'VxeTableFilter',
  props: {
    filterStore: Object,
    optimizeOpts: Object
  },
  render: function render(h) {
    var filterStore = this.filterStore,
        optimizeOpts = this.optimizeOpts;
    return h('div', {
      class: ['vxe-table--filter-wrapper filter--prevent-default', {
        't--animat': optimizeOpts.animat,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? [h('ul', {
      class: ['vxe-table--filter-body']
    }, this.renderOptions(h)), this.renderFooter(h)] : []);
  },
  methods: {
    renderOptions: function renderOptions(h) {
      var _ref;

      var $table = this.$parent,
          filterStore = this.filterStore,
          filterCheckAllEvent = this.filterCheckAllEvent,
          changeRadioOption = this.changeRadioOption,
          changeMultipleOption = this.changeMultipleOption;
      var vSize = $table.vSize;
      var args = filterStore.args,
          column = filterStore.column,
          multiple = filterStore.multiple;
      var slots = column.slots,
          filterRender = column.filterRender;
      var compConf = filterRender ? Renderer.get(filterRender.name) : null;

      if (slots && slots.filter) {
        return slots.filter.call($table, Object.assign({
          context: this
        }, args), h);
      } else if (compConf && compConf.renderFilter) {
        return compConf.renderFilter(h, filterRender, args, this);
      }

      var filterRens = [h('li', {
        class: ['vxe-table--filter-option', {
          'is--active': !filterStore.options.some(function (item) {
            return item.checked;
          })
        }]
      }, [multiple ? h('label', {
        class: ['vxe-checkbox', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--indeterminate', filterStore.isIndeterminate), _ref)]
      }, [h('input', {
        attrs: {
          type: 'checkbox'
        },
        domProps: {
          checked: filterStore.isAllSelected
        },
        on: {
          change: function change(evnt) {
            filterCheckAllEvent(evnt, evnt.target.checked);
          }
        }
      }), h('span', {
        class: ['checkbox--icon']
      }), h('span', {
        class: ['checkbox--label']
      }, conf.i18n('vxe.table.allFilter'))]) : h('span', {
        class: 'vxe-table--filter-label',
        on: {
          click: $table.resetFilterEvent
        }
      }, conf.i18n('vxe.table.allFilter'))])];
      filterStore.options.forEach(function (item, index) {
        filterRens.push(h('li', {
          class: ['vxe-table--filter-option', {
            'is--active': item.checked
          }],
          key: index
        }, [multiple ? h('label', {
          class: ['vxe-checkbox', _defineProperty({}, "size--".concat(vSize), vSize)]
        }, [h('input', {
          attrs: {
            type: 'checkbox'
          },
          domProps: {
            checked: item.checked
          },
          on: {
            change: function change(evnt) {
              changeMultipleOption(evnt, evnt.target.checked, item);
            }
          }
        }), h('span', {
          class: ['checkbox--icon']
        }), h('span', {
          class: ['checkbox--label']
        }, item.label)]) : h('span', {
          class: 'vxe-table--filter-label',
          on: {
            click: function click(evnt) {
              changeRadioOption(evnt, !item.checked, item);
            }
          }
        }, item.label)]));
      });
      return filterRens;
    },
    renderFooter: function renderFooter(h) {
      var filterStore = this.filterStore;
      var multiple = filterStore.multiple;
      return multiple ? h('div', {
        class: ['vxe-table--filter-footer']
      }, [h('button', {
        class: {
          'is--disabled': !filterStore.isAllSelected && !filterStore.isIndeterminate
        },
        attrs: {
          disabled: !filterStore.isAllSelected && !filterStore.isIndeterminate
        },
        on: {
          click: this.confirmFilter
        }
      }, conf.i18n('vxe.table.confirmFilter')), h('button', {
        on: {
          click: this.resetFilter
        }
      }, conf.i18n('vxe.table.resetFilter'))]) : null;
    },
    // 全部筛选事件
    filterCheckAllEvent: function filterCheckAllEvent(evnt, value) {
      var filterStore = this.filterStore;
      filterStore.options.forEach(function (item) {
        item.checked = value;
      });
      filterStore.isAllSelected = value;
      filterStore.isIndeterminate = false;
    },
    checkOptions: function checkOptions() {
      var filterStore = this.filterStore;
      filterStore.isAllSelected = filterStore.options.every(function (item) {
        return item.checked;
      });
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(function (item) {
        return item.checked;
      });
    },

    /*************************
     * Publish methods
     *************************/
    // （单选）筛选发生改变
    changeRadioOption: function changeRadioOption(evnt, checked, item) {
      this.filterStore.options.forEach(function (item) {
        item.checked = false;
      });
      item.checked = checked;
      this.checkOptions();
      this.$parent.confirmFilterEvent();
    },
    // （多选）筛选发生改变
    changeMultipleOption: function changeMultipleOption(evnt, checked, item) {
      item.checked = checked;
      this.checkOptions();
    },
    // 确认筛选
    confirmFilter: function confirmFilter() {
      this.$parent.confirmFilterEvent();
    },
    // 重置筛选
    resetFilter: function resetFilter() {
      this.$parent.resetFilterEvent();
    }
    /*************************
     * Publish methods
     *************************/

  }
});
// CONCATENATED MODULE: ./packages/filter/index.js



filter.install = function (Vue) {
  Vue.component(filter.name, filter);
};

var Filter = filter;
/* harmony default export */ var packages_filter = (filter);
// CONCATENATED MODULE: ./packages/loading/src/loading.js
/* harmony default export */ var src_loading = ({
  name: 'VxeTableLoading',
  props: {
    visible: Boolean
  },
  render: function render(h) {
    return h('div', {
      class: ['vxe-table--loading'],
      style: {
        display: this.visible ? 'block' : 'none'
      }
    }, [h('div', {
      class: 'vxe-table--spinner'
    })]);
  }
});
// CONCATENATED MODULE: ./packages/loading/index.js



src_loading.install = function (Vue) {
  Vue.component(src_loading.name, src_loading);
};

var Loading = src_loading;
/* harmony default export */ var packages_loading = (src_loading);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js
var get_own_property_descriptor = __webpack_require__("268f");
var get_own_property_descriptor_default = /*#__PURE__*/__webpack_require__.n(get_own_property_descriptor);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js
var get_own_property_symbols = __webpack_require__("e265");
var get_own_property_symbols_default = /*#__PURE__*/__webpack_require__.n(get_own_property_symbols);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__("a4bb");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js




function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = keys_default()(source);

    if (typeof get_own_property_symbols_default.a === 'function') {
      ownKeys = ownKeys.concat(get_own_property_symbols_default()(source).filter(function (sym) {
        return get_own_property_descriptor_default()(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// CONCATENATED MODULE: ./packages/grid/src/grid.js













var methods = {};
var propKeys = Object.keys(packages_table.props);
Object.keys(packages_table.methods).forEach(function (name) {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments);
  };
});
/* harmony default export */ var grid = ({
  name: 'VxeGrid',
  props: _objectSpread({
    columns: Array,
    pagerConfig: Object,
    proxyConfig: Object,
    toolbar: Object
  }, packages_table.props),
  provide: function provide() {
    return {
      $grid: this
    };
  },
  data: function data() {
    return {
      tableLoading: false,
      tableData: [],
      tableCustoms: [],
      pendingRecords: [],
      filterData: [],
      sortData: {
        field: '',
        order: ''
      },
      tablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isMsg: function isMsg() {
      return this.proxyOpts.message !== false;
    },
    proxyOpts: function proxyOpts() {
      return Object.assign({}, conf.grid.proxyConfig, this.proxyConfig);
    },
    tableProps: function tableProps() {
      var _this = this;

      var rest = {};
      propKeys.forEach(function (key) {
        rest[key] = _this[key];
      });
      return rest;
    }
  },
  watch: {
    columns: function columns(value) {
      this.loadColumn(value);
    },
    tableCustoms: function tableCustoms() {
      var $refs = this.$refs,
          toolbar = this.toolbar;

      if (toolbar && $refs.toolbar) {
        $refs.toolbar.loadStorage();
      }
    }
  },
  created: function created() {
    var customs = this.customs,
        pagerConfig = this.pagerConfig;

    if (customs) {
      this.tableCustoms = customs;
    }

    if (pagerConfig && pagerConfig.pageSize) {
      this.tablePage.pageSize = pagerConfig.pageSize;
    }
  },
  mounted: function mounted() {
    var columns = this.columns,
        proxyConfig = this.proxyConfig,
        proxyOpts = this.proxyOpts;

    if (columns && columns.length) {
      this.loadColumn(this.columns);
    }

    if (proxyConfig && proxyOpts.autoLoad !== false) {
      this.commitProxy('query');
    }
  },
  render: function render(h) {
    var _this2 = this,
        _ref;

    var $slots = this.$slots,
        $scopedSlots = this.$scopedSlots,
        $listeners = this.$listeners,
        pagerConfig = this.pagerConfig,
        vSize = this.vSize,
        loading = this.loading,
        toolbar = this.toolbar,
        editConfig = this.editConfig,
        proxyConfig = this.proxyConfig,
        proxyOpts = this.proxyOpts,
        tableProps = this.tableProps,
        tableLoading = this.tableLoading,
        tablePage = this.tablePage,
        tableData = this.tableData,
        tableCustoms = this.tableCustoms,
        optimization = this.optimization;
    var props = Object.assign({}, tableProps, {
      optimization: Object.assign({}, conf.optimization, optimization)
    });
    var tableOns = Object.assign({}, $listeners);
    var $buttons = $scopedSlots.buttons;

    if (proxyConfig) {
      Object.assign(props, {
        loading: loading || tableLoading,
        data: tableData,
        rowClassName: this.handleRowClassName
      });

      if (proxyOpts.index && pagerConfig) {
        props.startIndex = (tablePage.currentPage - 1) * tablePage.pageSize;
      }

      if (proxyOpts.sort) {
        tableOns['sort-change'] = this.sortChangeEvent;
      }

      if (proxyOpts.filter) {
        tableOns['filter-change'] = this.filterChangeEvent;
      }
    }

    if (toolbar) {
      if (toolbar.slots) {
        $buttons = toolbar.slots.buttons || $buttons;
      }

      if (!(toolbar.setting && toolbar.setting.storage)) {
        props.customs = tableCustoms;
      }

      tableOns['update:customs'] = function (value) {
        _this2.tableCustoms = value;
      };
    }

    if (editConfig) {
      props.editConfig = Object.assign({}, editConfig, {
        activeMethod: this.handleActiveMethod
      });
    }

    return h('div', {
      class: ['vxe-grid', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 't--animat', props.optimization.animat), _ref)]
    }, [toolbar ? h('vxe-toolbar', {
      ref: 'toolbar',
      props: toolbar,
      scopedSlots: $buttons ? {
        buttons: $buttons
      } : null
    }) : null, h('vxe-table', {
      props: props,
      on: tableOns,
      ref: 'xTable'
    }, $slots.default), pagerConfig ? h('vxe-pager', {
      props: Object.assign({
        size: vSize,
        loading: loading || tableLoading
      }, pagerConfig, proxyConfig ? tablePage : {}),
      on: {
        'page-change': this.pageChangeEvent
      }
    }) : null]);
  },
  methods: _objectSpread({}, methods, {
    handleRowClassName: function handleRowClassName(_ref2) {
      var row = _ref2.row;

      if (this.pendingRecords.some(function (item) {
        return item === row;
      })) {
        return 'row--pending';
      }

      return '';
    },
    handleActiveMethod: function handleActiveMethod(_ref3) {
      var row = _ref3.row;
      return this.pendingRecords.indexOf(row) === -1;
    },
    commitProxy: function commitProxy(code) {
      var _this3 = this;

      var proxyOpts = this.proxyOpts,
          tablePage = this.tablePage,
          pagerConfig = this.pagerConfig,
          sortData = this.sortData,
          filterData = this.filterData,
          isMsg = this.isMsg;
      var ajax = proxyOpts.ajax,
          _proxyOpts$props = proxyOpts.props,
          props = _proxyOpts$props === void 0 ? {} : _proxyOpts$props;

      if (ajax) {
        switch (code) {
          case 'insert':
            this.insert();
            break;

          case 'insert_actived':
            this.insert().then(function (_ref4) {
              var row = _ref4.row;
              return _this3.setActiveRow(row);
            });
            break;

          case 'mark_cancel':
            this.triggerPendingEvent(code);
            break;

          case 'delete_selection':
            this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', function () {
              return _this3.commitProxy('delete');
            });
            break;

          case 'remove_selection':
            this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', function () {
              return _this3.removeSelecteds();
            });
            break;

          case 'export':
            this.exportCsv();
            break;

          case 'reload':
          case 'query':
            {
              if (ajax.query) {
                var params = {
                  sort: sortData,
                  filters: filterData
                };
                this.tableLoading = true;

                if (pagerConfig) {
                  params.page = tablePage;
                }

                if (code === 'reload') {
                  if (pagerConfig) {
                    tablePage.currentPage = 1;
                  }

                  this.pendingRecords = [];
                }

                return ajax.query(params).then(function (rest) {
                  if (rest) {
                    if (pagerConfig) {
                      // （v3.0 废弃 data）
                      tablePage.total = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(rest, props.total || 'page.total') || 0;
                      _this3.tableData = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(rest, props.result || props.data || 'result') || [];
                    } else {
                      _this3.tableData = (props.list ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(rest, props.list) : rest) || [];
                    }
                  } else {
                    _this3.tableData = [];
                  }

                  _this3.tableLoading = false;
                }).catch(function (e) {
                  _this3.tableLoading = false;
                });
              }

              break;
            }

          case 'delete':
            {
              if (ajax.delete) {
                var selectRecords = this.getSelectRecords();
                this.remove(selectRecords).then(function () {
                  var removeRecords = _this3.getRemoveRecords();

                  var body = {
                    removeRecords: removeRecords
                  };

                  if (removeRecords.length) {
                    _this3.tableLoading = true;
                    return ajax.delete({
                      body: body
                    }).then(function (result) {
                      _this3.tableLoading = false;
                    }).catch(function (e) {
                      _this3.tableLoading = false;
                    }).then(function () {
                      return _this3.commitProxy('reload');
                    });
                  } else {
                    if (isMsg && !selectRecords.length) {
                      _this3.$XMsg.message({
                        id: code,
                        message: conf.i18n('vxe.grid.selectOneRecord'),
                        status: 'warning'
                      });
                    }
                  }
                });
              }

              break;
            }

          case 'save':
            {
              if (ajax.save) {
                var body = Object.assign({
                  pendingRecords: this.pendingRecords
                }, this.getAllRecords());
                var insertRecords = body.insertRecords,
                    removeRecords = body.removeRecords,
                    updateRecords = body.updateRecords,
                    pendingRecords = body.pendingRecords; // 排除掉新增且标记为删除的数据

                if (insertRecords.length) {
                  body.pendingRecords = pendingRecords.filter(function (row) {
                    return insertRecords.indexOf(row) === -1;
                  });
                } // 排除已标记为删除的数据


                if (pendingRecords.length) {
                  body.insertRecords = insertRecords.filter(function (row) {
                    return pendingRecords.indexOf(row) === -1;
                  });
                } // 只校验新增和修改的数据


                return new Promise(function (resolve) {
                  _this3.validate(body.insertRecords.concat(updateRecords), function (vaild) {
                    if (vaild) {
                      if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                        _this3.tableLoading = true;
                        resolve(ajax.save({
                          body: body
                        }).then(function () {
                          _this3.$XMsg.message({
                            id: code,
                            message: conf.i18n('vxe.grid.saveSuccess'),
                            status: 'success'
                          });

                          _this3.tableLoading = false;
                        }).catch(function (e) {
                          _this3.tableLoading = false;
                        }).then(function () {
                          return _this3.commitProxy('reload');
                        }));
                      } else {
                        if (isMsg) {
                          // 直接移除未保存且标记为删除的数据
                          if (pendingRecords.length) {
                            _this3.remove(pendingRecords);
                          } else {
                            _this3.$XMsg.message({
                              id: code,
                              message: conf.i18n('vxe.grid.dataUnchanged'),
                              status: 'info'
                            });
                          }
                        }

                        resolve();
                      }
                    } else {
                      resolve(vaild);
                    }
                  });
                });
              }

              break;
            }
        }
      }

      return this.$nextTick();
    },
    handleDeleteRow: function handleDeleteRow(code, alertKey, callback) {
      var selectRecords = this.getSelectRecords();

      if (this.isMsg) {
        if (selectRecords.length) {
          this.$XMsg.confirm(conf.i18n(alertKey)).then(callback).catch(function (e) {
            return e;
          });
        } else {
          this.$XMsg.message({
            id: code,
            message: conf.i18n('vxe.grid.selectOneRecord'),
            status: 'warning'
          });
        }
      } else {
        if (selectRecords.length) {
          callback();
        }
      }
    },
    getPendingRecords: function getPendingRecords() {
      return this.pendingRecords;
    },
    triggerPendingEvent: function triggerPendingEvent(code, evnt) {
      var pendingRecords = this.pendingRecords,
          isMsg = this.isMsg;
      var selectRecords = this.getSelectRecords();

      if (selectRecords.length) {
        var plus = [];
        var minus = [];
        selectRecords.forEach(function (data) {
          if (pendingRecords.some(function (item) {
            return data === item;
          })) {
            minus.push(data);
          } else {
            plus.push(data);
          }
        });

        if (minus.length) {
          this.pendingRecords = pendingRecords.filter(function (item) {
            return minus.indexOf(item) === -1;
          }).concat(plus);
        } else if (plus.length) {
          this.pendingRecords = pendingRecords.concat(plus);
        }

        this.clearSelection();
      } else {
        if (isMsg) {
          this.$XMsg.message({
            id: code,
            message: conf.i18n('vxe.grid.selectOneRecord'),
            status: 'warning'
          });
        }
      }
    },
    pageChangeEvent: function pageChangeEvent(params) {
      var tablePage = this.tablePage;
      var currentPage = params.currentPage,
          pageSize = params.pageSize;
      tablePage.currentPage = currentPage;
      tablePage.pageSize = pageSize;

      if (params.type === 'current-change') {
        UtilTools.emitEvent(this, 'current-page-change', [currentPage]);
      } else {
        UtilTools.emitEvent(this, 'page-size-change', [pageSize]);
      }

      UtilTools.emitEvent(this, 'page-change', [params]);
      this.commitProxy('query');
    },
    sortChangeEvent: function sortChangeEvent(params) {
      var remoteSort = this.remoteSort,
          sortData = this.sortData;
      var column = params.column,
          field = params.field,
          order = params.order;
      var isRemote = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort; // 如果是服务端排序

      if (isRemote) {
        sortData.field = field;
        sortData.order = order;
        this.commitProxy('query');
      } else {
        UtilTools.emitEvent(this, 'sort-change', [params]);
      }
    },
    filterChangeEvent: function filterChangeEvent(params) {
      var remoteFilter = this.remoteFilter;
      var filters = params.filters; // 如果是服务端过滤

      if (remoteFilter) {
        this.filterData = filters;
        this.commitProxy('reload');
      } else {
        UtilTools.emitEvent(this, 'filter-change', [params]);
      }
    }
  })
});
// CONCATENATED MODULE: ./packages/grid/index.js



grid.install = function (Vue) {
  Vue.component(grid.name, grid);
};

var Grid = grid;
/* harmony default export */ var packages_grid = (grid);
// CONCATENATED MODULE: ./packages/excel/src/excel.js






var excelContextMenu = {
  header: {
    options: [[{
      code: 'exportAll',
      name: '隐藏列'
    }, {
      code: 'exportAll',
      name: '取消所有隐藏'
    }]]
  },
  body: {
    options: [[{
      code: 'clip',
      name: '剪贴'
    }, {
      code: 'copy',
      name: '复制'
    }, {
      code: 'paste',
      name: '粘贴'
    }], [{
      code: 'insert',
      name: '插入'
    }, {
      code: 'remove',
      name: '删除'
    }, {
      code: 'clearData',
      name: '清除内容'
    }], [// {
    //   code: 'filter',
    //   name: '筛选',
    //   children: [
    //     {
    //       code: 'clearFilter',
    //       name: '清除筛选'
    //     },
    //     {
    //       code: 'filterSelect',
    //       name: '按所选单元格的值筛选'
    //     }
    //   ]
    // },
    {
      code: 'sort',
      name: '排序',
      children: [{
        code: 'clearSort',
        name: '清除排序'
      }, {
        code: 'sortAsc',
        name: '升序'
      }, {
        code: 'sortDesc',
        name: '倒序'
      }]
    }], [{
      code: 'exportAll',
      name: '导出数据.csv'
    }]]
  }
};
var excel_methods = {};
var excelEditConfig = {
  trigger: 'dblclick',
  mode: 'cell',
  showIcon: false,
  showStatus: false
};

function buildColumns(h, columns) {
  return columns ? columns.map(function (props) {
    return h('vxe-table-column', {
      props: props
    }, buildColumns(h, props.children));
  }) : [];
}

function buildProps(h, _vm) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var editConfig = props.editConfig,
      contextMenu = props.contextMenu;
  return Object.assign({}, props, {
    border: true,
    resizable: true,
    showOverflow: null,
    headerCellClassName: _vm.handleHeaderCellClassName,
    cellClassName: _vm.handleCellClassName,
    contextMenu: Object.assign({}, contextMenu, excelContextMenu),
    mouseConfig: {
      selected: true,
      checked: true
    },
    keyboardConfig: {
      isArrow: true,
      isDel: true,
      isTab: true,
      isCut: true,
      isEdit: true
    },
    editConfig: editConfig ? Object.assign({}, excelEditConfig, editConfig) : excelEditConfig
  });
}

Object.keys(packages_table.methods).forEach(function (name) {
  excel_methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments);
  };
});
/* harmony default export */ var excel = ({
  name: 'VxeExcel',
  props: _objectSpread({
    columns: Array
  }, packages_table.props),
  data: function data() {
    return {
      excelStore: {
        uploadRows: []
      }
    };
  },
  render: function render(h) {
    return h('vxe-table', {
      class: 'vxe-excel',
      props: buildProps(h, this, this.$props),
      on: _objectSpread({}, this.$listeners, {
        'cell-click': this.cellClickEvent,
        'header-cell-click': this.headerCellClickEvent,
        'context-menu-click': this.contextMenuClickEvent
      }),
      ref: 'xTable'
    }, buildColumns(h, this.columns));
  },
  methods: _objectSpread({}, excel_methods, {
    handleHeaderCellClassName: function handleHeaderCellClassName(_ref) {
      var column = _ref.column,
          columnIndex = _ref.columnIndex,
          $table = _ref.$table;
      var editStore = $table.editStore;
      var selected = editStore.selected,
          actived = editStore.actived;

      if (columnIndex > 0) {
        if (selected.column === column || actived.column === column) {
          return 'vxe-excel--column-selected';
        }
      }
    },
    handleCellClassName: function handleCellClassName(_ref2) {
      var row = _ref2.row,
          column = _ref2.column,
          columnIndex = _ref2.columnIndex,
          $table = _ref2.$table;
      var editStore = $table.editStore;
      var selected = editStore.selected,
          actived = editStore.actived;

      if (columnIndex === 0) {
        if (selected.row === row || actived.row === row) {
          return 'vxe-excel--index-selected';
        }
      }
    },
    cellClickEvent: function cellClickEvent(_ref3, evnt) {
      var row = _ref3.row,
          rowIndex = _ref3.rowIndex,
          columnIndex = _ref3.columnIndex,
          $table = _ref3.$table;
      var $refs = $table.$refs,
          visibleColumn = $table.visibleColumn,
          handleSelected = $table.handleSelected,
          handleChecked = $table.handleChecked;

      if (columnIndex === 0) {
        columnIndex += 1;
        var tableBodyElem = $refs.tableBody.$el;
        var column = visibleColumn[columnIndex];
        var trElemList = tableBodyElem.querySelectorAll('.vxe-body--row');
        var trElem = trElemList[rowIndex];
        var cell = trElem.querySelector(".".concat(column.id));
        handleSelected({
          row: row,
          rowIndex: rowIndex,
          column: column,
          columnIndex: columnIndex,
          cell: cell,
          $table: $table
        }, evnt).then(function () {
          handleChecked({
            rowIndex: rowIndex,
            columnIndex: columnIndex
          }, {
            rowIndex: rowIndex,
            columnIndex: visibleColumn.length - 1
          }, evnt);
        });
      }
    },
    headerCellClickEvent: function headerCellClickEvent(_ref4, evnt) {
      var column = _ref4.column,
          columnIndex = _ref4.columnIndex,
          $table = _ref4.$table;
      var $refs = $table.$refs,
          tableData = $table.tableData,
          handleSelected = $table.handleSelected,
          handleChecked = $table.handleChecked;

      if (tableData.length) {
        var tableBodyElem = $refs.tableBody.$el;
        var rowIndex = 0;
        var row = tableData[rowIndex];
        var trElemList = tableBodyElem.querySelectorAll('.vxe-body--row');
        var trElem = trElemList[rowIndex];
        var cell = trElem.querySelector(".".concat(column.id));
        handleSelected({
          row: row,
          rowIndex: rowIndex,
          column: column,
          columnIndex: columnIndex,
          cell: cell,
          $table: $table
        }, evnt).then(function () {
          handleChecked({
            rowIndex: rowIndex,
            columnIndex: columnIndex
          }, {
            rowIndex: tableData.length - 1,
            columnIndex: columnIndex
          }, evnt);
        });
      }
    },
    contextMenuClickEvent: function contextMenuClickEvent(_ref5, evnt) {
      var menu = _ref5.menu,
          row = _ref5.row,
          column = _ref5.column;
      var $table = this.$refs.xTable;
      var property = column.property;

      switch (menu.code) {
        case 'clip':
          $table.handleCopyed(true, evnt);
          break;

        case 'copy':
          $table.handleCopyed(false, evnt);
          break;

        case 'paste':
          $table.handlePaste(evnt);
          break;

        case 'insert':
          $table.insertAt({}, row);
          break;

        case 'remove':
          $table.remove(row);
          break;

        case 'clearData':
          $table.clearData(row, property);
          break;

        case 'clearFilter':
          $table.clearFilter();
          break;

        case 'clearSort':
          $table.clearSort();
          break;

        case 'sortAsc':
          $table.sort(property, 'asc');
          break;

        case 'sortDesc':
          $table.sort(property, 'desc');
          break;

        case 'exportAll':
          $table.exportCsv({
            isHeader: false
          });
          break;
      }
    }
  })
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./packages/excel/src/cells.js



var cells_rowHeight = 24;
/* harmony default export */ var cells = ({
  cell: {
    autofocus: '.vxe-textarea',
    renderEdit: function renderEdit(h, editRender, params, _ref) {
      var $excel = _ref.$excel;
      var excelStore = $excel.excelStore;
      var uploadRows = excelStore.uploadRows;
      var row = params.row,
          column = params.column;
      return [h('div', {
        class: 'vxe-input--wrapper vxe-excel-cell',
        style: {
          height: "".concat(column.renderHeight - 1, "px")
        }
      }, [h('textarea', {
        class: 'vxe-textarea',
        style: {
          width: "".concat(column.renderWidth, "px")
        },
        domProps: {
          value: UtilTools.getCellValue(row, column)
        },
        on: {
          input: function input(evnt) {
            var inpElem = evnt.target;
            UtilTools.setCellValue(row, column, inpElem.value);

            if (inpElem.scrollHeight > inpElem.offsetHeight) {
              if (uploadRows.indexOf(row) === -1) {
                inpElem.style.width = "".concat(inpElem.offsetWidth + 20, "px");
              } else {
                inpElem.style.height = "".concat(inpElem.scrollHeight, "px");
              }
            }
          },
          change: function change(evnt) {
            UtilTools.setCellValue(row, column, evnt.target.value);

            if (uploadRows.indexOf(row) === -1) {
              uploadRows.push(row);
            }
          },
          keydown: function keydown(evnt) {
            var inpElem = evnt.target;

            if (evnt.altKey && evnt.keyCode === 13) {
              evnt.preventDefault();
              evnt.stopPropagation();
              var rangeData = DomTools.getCursorPosition(inpElem);
              var pos = rangeData.end;
              var cellValue = inpElem.value;
              cellValue = "".concat(cellValue.slice(0, pos), "\n").concat(cellValue.slice(pos, cellValue.length));
              inpElem.value = cellValue;
              UtilTools.setCellValue(row, column, cellValue);
              inpElem.style.height = "".concat((Math.floor(inpElem.offsetHeight / cells_rowHeight) + 1) * cells_rowHeight, "px");
              setTimeout(function () {
                rangeData.start = rangeData.end = ++pos;
                DomTools.setCursorPosition(inpElem, rangeData);
              });
            }
          }
        }
      })])];
    },
    renderCell: function renderCell(h, editRender, params) {
      var row = params.row,
          column = params.column;
      return [h('span', {
        domProps: {
          innerHTML: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.escape(UtilTools.getCellValue(row, column)).replace(/\n/g, '<br>')
        }
      })];
    }
  }
});
// CONCATENATED MODULE: ./packages/excel/index.js





excel.install = function (Vue) {
  v_x_e_table.renderer.mixin(cells);
  Vue.component(excel.name, excel);
};

var Excel = excel;
/* harmony default export */ var packages_excel = (excel);
// CONCATENATED MODULE: ./packages/menu/src/menu.js

/* harmony default export */ var src_menu = ({
  name: 'VxeTableContextMenu',
  props: {
    ctxMenuStore: Object
  },
  render: function render(h) {
    var $table = this.$parent;
    var _e = this._e,
        ctxMenuStore = this.ctxMenuStore;
    return h('div', {
      class: ['vxe-table--ctxmenu-wrapper', {
        show: ctxMenuStore.visible
      }],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map(function (options, gIndex) {
      return h('ul', {
        class: ['vxe-ctxmenu--option-wrapper'],
        key: gIndex
      }, options.map(function (item, index) {
        var hasChild = item.children && item.children.length;
        return h('li', {
          class: [{
            'link--disabled': item.disabled,
            'link--active': item === ctxMenuStore.selected
          }],
          key: "".concat(gIndex, "_").concat(index)
        }, [h('a', {
          class: ['vxe-ctxmenu--link'],
          on: {
            click: function click(evnt) {
              $table.ctxMenuLinkEvent(evnt, item);
            },
            mouseover: function mouseover(evnt) {
              $table.ctxMenuMouseoverEvent(evnt, item);
            },
            mouseout: function mouseout(evnt) {
              $table.ctxMenuMouseoutEvent(evnt, item);
            }
          }
        }, [h('i', {
          class: ['vxe-ctxmenu--link-prefix', item.prefixIcon]
        }), h('span', {
          class: ['vxe-ctxmenu--link-content']
        }, item.name), h('i', {
          class: ['vxe-ctxmenu--link-suffix', hasChild ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
        })]), hasChild ? h('ul', {
          class: ['vxe-table--ctxmenu-clild-wrapper', {
            show: item === ctxMenuStore.selected && ctxMenuStore.showChild
          }]
        }, item.children.map(function (child, cIndex) {
          return h('li', {
            class: [{
              'link--disabled': child.disabled,
              'link--active': child === ctxMenuStore.selectChild
            }],
            key: "".concat(gIndex, "_").concat(index, "_").concat(cIndex)
          }, [h('a', {
            class: ['vxe-ctxmenu--link'],
            on: {
              click: function click(evnt) {
                $table.ctxMenuLinkEvent(evnt, child);
              },
              mouseover: function mouseover(evnt) {
                $table.ctxMenuMouseoverEvent(evnt, item, child);
              },
              mouseout: function mouseout(evnt) {
                $table.ctxMenuMouseoutEvent(evnt, item, child);
              }
            }
          }, [h('i', {
            class: ['vxe-ctxmenu--link-prefix', child.prefixIcon]
          }), h('span', {
            class: ['vxe-ctxmenu--link-content']
          }, child.name)])]);
        })) : _e()]);
      }));
    }));
  }
});
// CONCATENATED MODULE: ./packages/menu/index.js



src_menu.install = function (Vue) {
  Vue.component(src_menu.name, src_menu);
};

var TableContextMenu = src_menu;
/* harmony default export */ var packages_menu = (src_menu);
// CONCATENATED MODULE: ./packages/toolbar/src/toolbar.js








/* harmony default export */ var src_toolbar = ({
  name: 'VxeToolbar',
  props: {
    id: String,
    setting: {
      type: [Boolean, Object],
      default: function _default() {
        return conf.toolbar.setting;
      }
    },
    buttons: {
      type: Array,
      default: function _default() {
        return conf.toolbar.buttons;
      }
    },
    size: String,
    data: Array,
    customs: Array
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data: function data() {
    return {
      tableCustoms: [],
      settingStore: {
        visible: false
      }
    };
  },
  computed: {
    $table: function $table() {
      var $parent = this.$parent,
          data = this.data;
      var $children = $parent.$children;
      var selfIndex = $children.indexOf(this);
      return $children.find(function (comp, index) {
        return comp && comp.refreshColumn && index > selfIndex && (data ? comp.data === data : comp.$vnode.componentOptions.tag === 'vxe-table');
      });
    },
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isStorage: function isStorage() {
      return this.setting && this.setting.storage;
    },
    storageKey: function storageKey() {
      return conf.toolbar.storageKey || 'VXE_TABLE_CUSTOM_HIDDEN';
    }
  },
  created: function created() {
    var _this = this;

    var isStorage = this.isStorage,
        id = this.id,
        customs = this.customs,
        setting = this.setting;

    if (customs) {
      this.tableCustoms = customs;
    }

    if (isStorage && !id) {
      throw new Error('[vxe-table] Toolbar must have a unique primary id.');
    }

    if (setting) {
      this.$nextTick(function () {
        return _this.loadStorage();
      });
    }

    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _this2 = this;

    var $scopedSlots = this.$scopedSlots,
        settingStore = this.settingStore,
        setting = this.setting,
        _this$buttons = this.buttons,
        buttons = _this$buttons === void 0 ? [] : _this$buttons,
        vSize = this.vSize,
        tableCustoms = this.tableCustoms;
    var customBtnOns = {};
    var customWrapperOns = {};
    var $buttons = $scopedSlots.buttons;

    if (setting) {
      if (setting.trigger === 'manual') {// 手动触发
      } else if (setting.trigger === 'hover') {
        // hover 触发
        customBtnOns.mouseenter = this.handleMouseenterSettingEvent;
        customBtnOns.mouseleave = this.handleMouseleaveSettingEvent;
        customWrapperOns.mouseenter = this.handleWrapperMouseenterEvent;
        customWrapperOns.mouseleave = this.handleWrapperMouseleaveEvent;
      } else {
        // 点击触发
        customBtnOns.click = this.handleClickSettingEvent;
      }
    }

    return h('div', {
      class: ['vxe-toolbar', _defineProperty({}, "size--".concat(vSize), vSize)]
    }, [h('div', {
      class: 'vxe-button--wrapper'
    }, $buttons ? $buttons.call(this, h) : buttons.map(function (item) {
      return h('vxe-button', {
        on: {
          click: function click(evnt) {
            return _this2.btnEvent(item, evnt);
          }
        }
      }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(item.name) ? item.name() : item.name);
    })), setting ? h('div', {
      class: ['vxe-custom--wrapper', {
        'is--active': settingStore.visible
      }],
      ref: 'customWrapper'
    }, [h('div', {
      class: 'vxe-custom--setting-btn',
      on: customBtnOns
    }, [h('i', {
      class: 'vxe-icon--menu'
    })]), h('div', {
      class: 'vxe-custom--option-wrapper'
    }, [h('div', {
      class: 'vxe-custom--option',
      on: customWrapperOns
    }, tableCustoms.map(function (column) {
      var property = column.property,
          visible = column.visible,
          own = column.own;
      var headerTitle = own.title || own.label;
      return property && headerTitle ? h('vxe-checkbox', {
        props: {
          value: visible
        },
        on: {
          change: function change(value) {
            column.visible = value;

            if (setting && setting.immediate) {
              _this2.updateSetting();
            }
          }
        }
      }, headerTitle) : null;
    }))])]) : null]);
  },
  methods: {
    openSetting: function openSetting() {
      this.settingStore.visible = true;
    },
    closeSetting: function closeSetting() {
      var setting = this.setting,
          settingStore = this.settingStore;

      if (settingStore.visible) {
        settingStore.visible = false;

        if (setting && !setting.immediate) {
          this.updateSetting();
        }
      }
    },
    loadStorage: function loadStorage() {
      if (this.isStorage) {
        var customStorageMap = this.getStorageMap();
        var customStorage = customStorageMap[this.id];

        if (customStorage) {
          this.updateCustoms(customStorage.split(',').map(function (prop) {
            return {
              prop: prop,
              visible: false
            };
          }));
        } else {
          this.updateCustoms(this.tableCustoms);
        }
      } else {
        this.updateCustoms(this.tableCustoms);
      }
    },
    updateCustoms: function updateCustoms(customs) {
      var _this3 = this;

      var $grid = this.$grid,
          $table = this.$table;
      var comp = $grid || $table;

      if (comp) {
        comp.reloadCustoms(customs).then(function (customs) {
          _this3.tableCustoms = customs;
        });
      }
    },
    getStorageMap: function getStorageMap() {
      var version = conf.version;
      var rest = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toStringJSON(localStorage.getItem(this.storageKey));
      return rest && rest._v === version ? rest : {
        _v: version
      };
    },
    saveStorageMap: function saveStorageMap() {
      var id = this.id,
          tableCustoms = this.tableCustoms,
          isStorage = this.isStorage,
          storageKey = this.storageKey;

      if (isStorage) {
        var customStorageMap = this.getStorageMap();
        customStorageMap[id] = tableCustoms.filter(function (column) {
          return !column.visible;
        }).map(function (column) {
          return column.property;
        }).join(',') || undefined;
        localStorage.setItem(storageKey, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toJSONString(customStorageMap));
      }

      return this.$nextTick();
    },
    hideColumn: function hideColumn(column) {
      column.visible = false;
      return this.updateSetting();
    },
    showColumn: function showColumn(column) {
      var tableCustoms = this.tableCustoms;

      if (column) {
        column.visible = true;
      } else {
        tableCustoms.forEach(function (column) {
          column.visible = true;
        });
      }

      return this.updateSetting();
    },
    updateSetting: function updateSetting() {
      var $grid = this.$grid,
          $table = this.$table;

      if ($grid || $table) {
        ($grid || $table).refreshColumn();
        return this.saveStorageMap();
      }

      throw new Error('[vxe-toolbar] Not found vxe-table.');
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      if (!DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.closeSetting();
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      this.closeSetting();
    },
    handleClickSettingEvent: function handleClickSettingEvent(evnt) {
      var settingStore = this.settingStore;
      settingStore.visible = !settingStore.visible;
    },
    handleMouseenterSettingEvent: function handleMouseenterSettingEvent(evnt) {
      this.settingStore.activeBtn = true;
      this.openSetting();
    },
    handleMouseleaveSettingEvent: function handleMouseleaveSettingEvent(evnt) {
      var _this4 = this;

      var settingStore = this.settingStore;
      settingStore.activeBtn = false;
      setTimeout(function () {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          _this4.closeSetting();
        }
      }, 300);
    },
    handleWrapperMouseenterEvent: function handleWrapperMouseenterEvent(evnt) {
      this.settingStore.activeWrapper = true;
      this.openSetting();
    },
    handleWrapperMouseleaveEvent: function handleWrapperMouseleaveEvent(evnt) {
      var _this5 = this;

      var settingStore = this.settingStore;
      settingStore.activeWrapper = false;
      setTimeout(function () {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          _this5.closeSetting();
        }
      }, 300);
    },
    btnEvent: function btnEvent(item, evnt) {
      var $grid = this.$grid;

      if ($grid) {
        $grid.commitProxy(item.code);
        UtilTools.emitEvent($grid, 'toolbar-button-click', [{
          button: item,
          $grid: $grid
        }, evnt]);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/toolbar/index.js



src_toolbar.install = function (Vue) {
  Vue.component(src_toolbar.name, src_toolbar);
};

var Toolbar = src_toolbar;
/* harmony default export */ var packages_toolbar = (src_toolbar);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.from.js
var es6_array_from = __webpack_require__("1c4c");

// CONCATENATED MODULE: ./packages/pager/src/pager.js








/* harmony default export */ var pager = ({
  name: 'VxePager',
  props: {
    size: String,
    // 自定义布局
    layouts: {
      type: Array,
      default: function _default() {
        return conf.pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total'];
      }
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 加载中
    loading: Boolean,
    // 每页大小
    pageSize: {
      type: Number,
      default: function _default() {
        return conf.pager.pageSize || 10;
      }
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 显示页码按钮的数量
    pagerCount: {
      type: Number,
      default: function _default() {
        return conf.pager.pagerCount || 7;
      }
    },
    // 每页大小选项列表
    pageSizes: {
      type: Array,
      default: function _default() {
        return conf.pager.pageSizes || [10, 15, 20, 50, 100];
      }
    },
    // 带背景颜色
    background: Boolean
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data: function data() {
    return {
      showSizes: false,
      panelStyle: null
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isSizes: function isSizes() {
      return this.layouts.some(function (name) {
        return name === 'Sizes';
      });
    },
    pageCount: function pageCount() {
      return this.getPageCount(this.total, this.pageSize);
    },
    numList: function numList() {
      return Array.from(new Array(this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount));
    },
    offsetNumber: function offsetNumber() {
      return Math.floor((this.pagerCount - 2) / 2);
    }
  },
  created: function created() {
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
  },
  mounted: function mounted() {
    var sizePanel = this.$refs.sizePanel;

    if (sizePanel) {
      document.body.appendChild(this.$refs.sizePanel);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var sizePanel = this.$refs.sizePanel;

    if (sizePanel && sizePanel.parentNode) {
      sizePanel.parentNode.removeChild(sizePanel);
    }
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'mousedown');
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var layouts = this.layouts,
        isSizes = this.isSizes,
        loading = this.loading,
        vSize = this.vSize,
        background = this.background;
    return h('div', {
      class: ['vxe-pager', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'p--background', background), _defineProperty(_ref, 'is--loading', loading), _ref)]
    }, layouts.map(function (name) {
      return _this["render".concat(name)](h);
    }).concat(isSizes ? this.renderSizePanel(h) : []));
  },
  methods: {
    // prevPage
    renderPrevPage: function renderPrevPage(h) {
      var currentPage = this.currentPage;
      return h('span', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': currentPage <= 1
        }],
        on: {
          click: this.prevPageEvent
        }
      }, [h('i', {
        class: ['vxe-icon--page-icon', conf.icon.prevPage]
      })]);
    },
    // prevJump
    renderPrevJump: function renderPrevJump(h, tagName) {
      var _this2 = this;

      var numList = this.numList,
          currentPage = this.currentPage;
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': currentPage <= 1
        }],
        on: {
          click: function click() {
            return _this2.jumpPageEvent(Math.max(currentPage - numList.length, 1));
          }
        }
      }, [tagName ? h('i', {
        class: 'vxe-pager--jump-more vxe-icon--more'
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', conf.icon.jumpPrev]
      })]);
    },
    // number
    renderNumber: function renderNumber(h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h));
    },
    // jumpNumber
    renderJumpNumber: function renderJumpNumber(h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h, true));
    },
    // nextJump
    renderNextJump: function renderNextJump(h, tagName) {
      var _this3 = this;

      var numList = this.numList,
          currentPage = this.currentPage,
          pageCount = this.pageCount;
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': currentPage >= pageCount
        }],
        on: {
          click: function click() {
            return _this3.jumpPageEvent(Math.min(currentPage + numList.length, pageCount));
          }
        }
      }, [tagName ? h('i', {
        class: 'vxe-pager--jump-more vxe-icon--more'
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', conf.icon.jumpNext]
      })]);
    },
    // nextPage
    renderNextPage: function renderNextPage(h) {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;
      return h('span', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': currentPage >= pageCount
        }],
        on: {
          click: this.nextPageEvent
        }
      }, [h('i', {
        class: ['vxe-icon--page-icon', conf.icon.nextPage]
      })]);
    },
    // sizes
    renderSizes: function renderSizes(h) {
      var pageSize = this.pageSize;
      return h('span', {
        class: ['vxe-pager--sizes', {
          'is--active': this.showSizes
        }],
        on: {
          click: this.toggleSizePanel
        },
        ref: 'sizeBtn'
      }, [h('i', {
        class: 'vxe-pager--sizes-arrow vxe-icon--caret-bottom'
      }), h('span', {
        class: 'size--content'
      }, "".concat(pageSize).concat(conf.i18n('vxe.pager.pagesize')))]);
    },
    // 分页面板
    renderSizePanel: function renderSizePanel(h) {
      var _this4 = this;

      var panelStyle = this.panelStyle,
          pageSize = this.pageSize,
          pageSizes = this.pageSizes,
          showSizes = this.showSizes;
      return h('ul', {
        class: ['vxe-pager-size--select', {
          'is--show': showSizes
        }],
        style: panelStyle,
        ref: 'sizePanel'
      }, pageSizes.map(function (num) {
        return h('li', {
          class: ['size--option', {
            'is--active': num === pageSize
          }],
          on: {
            click: function click() {
              return _this4.sizeChangeEvent(num);
            }
          }
        }, "".concat(num).concat(conf.i18n('vxe.pager.pagesize')));
      }));
    },
    // FullJump
    renderFullJump: function renderFullJump(h) {
      return this.renderJump(h, true);
    },
    // Jump
    renderJump: function renderJump(h, isFull) {
      var _this5 = this;

      var currentPage = this.currentPage,
          pageCount = this.pageCount;
      return h('span', {
        class: 'vxe-pager--jump'
      }, [isFull ? h('span', {
        class: 'vxe-pager--goto-text'
      }, conf.i18n('vxe.pager.goto')) : null, h('input', {
        class: 'vxe-pager--goto',
        domProps: {
          value: currentPage
        },
        attrs: {
          type: 'text',
          autocomplete: 'off'
        },
        on: {
          keydown: function keydown(evnt) {
            if (evnt.keyCode === 13) {
              var value = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(evnt.target.value);
              var current = value <= 0 ? 1 : value >= pageCount ? pageCount : value;
              evnt.target.value = current;

              _this5.jumpPageEvent(current);
            } else if (evnt.keyCode === 38) {
              evnt.preventDefault();

              _this5.nextPageEvent(evnt);
            } else if (evnt.keyCode === 40) {
              evnt.preventDefault();

              _this5.prevPageEvent(evnt);
            }
          }
        }
      }), isFull ? h('span', {
        class: 'vxe-pager--classifier-text'
      }, conf.i18n('vxe.pager.pageClassifier')) : null]);
    },
    // PageCount
    renderPageCount: function renderPageCount(h) {
      var pageCount = this.pageCount;
      return h('span', {
        class: 'vxe-pager--count'
      }, [h('span', {
        class: 'vxe-pager--separator'
      }, '/'), h('span', pageCount)]);
    },
    // total
    renderTotal: function renderTotal(h) {
      var total = this.total;
      return h('span', {
        class: 'vxe-pager--total'
      }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.template(conf.i18n('vxe.pager.total'), {
        total: total
      }));
    },
    // number
    renderPageBtn: function renderPageBtn(h, showJump) {
      var _this6 = this;

      var numList = this.numList,
          currentPage = this.currentPage,
          pageCount = this.pageCount,
          pagerCount = this.pagerCount,
          offsetNumber = this.offsetNumber;
      var nums = [];
      var isOv = pageCount > pagerCount;
      var isLt = isOv && currentPage > offsetNumber + 1;
      var isGt = isOv && currentPage < pageCount - offsetNumber;
      var startNumber = 1;

      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1);
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1);
        }
      }

      if (showJump && isLt) {
        nums.push(h('li', {
          class: 'vxe-pager--num-btn',
          on: {
            click: function click() {
              return _this6.jumpPageEvent(1);
            }
          }
        }, 1), this.renderPrevJump(h, 'li'));
      }

      numList.forEach(function (item, index) {
        var number = startNumber + index;

        if (number <= pageCount) {
          nums.push(h('li', {
            class: ['vxe-pager--num-btn', {
              'is--active': currentPage === number
            }],
            on: {
              click: function click() {
                return _this6.jumpPageEvent(number);
              }
            },
            key: number
          }, number));
        }
      });

      if (showJump && isGt) {
        nums.push(this.renderNextJump(h, 'li'), h('li', {
          class: 'vxe-pager--num-btn',
          on: {
            click: function click() {
              return _this6.jumpPageEvent(pageCount);
            }
          }
        }, pageCount));
      }

      return nums;
    },
    getPageCount: function getPageCount(total, size) {
      return Math.max(Math.ceil(total / size), 1);
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      if (this.showSizes && !(DomTools.getEventTargetNode(evnt, this.$refs.sizeBtn).flag || DomTools.getEventTargetNode(evnt, this.$refs.sizePanel).flag)) {
        this.hideSizePanel();
      }
    },
    prevPageEvent: function prevPageEvent() {
      var currentPage = this.currentPage;

      if (currentPage > 1) {
        this.jumpPageEvent(Math.max(currentPage - 1, 1));
      }
    },
    nextPageEvent: function nextPageEvent() {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;

      if (currentPage < pageCount) {
        this.jumpPageEvent(Math.min(currentPage + 1, pageCount));
      }
    },
    jumpPageEvent: function jumpPageEvent(currentPage) {
      var type = 'current-change';

      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage);
        UtilTools.emitEvent(this, type, [currentPage]);
        this.emitPageChange(type, this.pageSize, currentPage);
      }
    },
    sizeChangeEvent: function sizeChangeEvent(pageSize) {
      var type = 'size-change';

      if (pageSize !== this.pageSize) {
        this.$emit('update:pageSize', pageSize);
        UtilTools.emitEvent(this, type, [pageSize]);
        this.emitPageChange(type, pageSize, Math.min(this.currentPage, this.getPageCount(this.total, pageSize)));
      }

      this.hideSizePanel();
    },
    emitPageChange: function emitPageChange(type, pageSize, currentPage) {
      UtilTools.emitEvent(this, 'page-change', [{
        type: type,
        pageSize: pageSize,
        currentPage: currentPage
      }]);
    },
    toggleSizePanel: function toggleSizePanel() {
      if (this.showSizes) {
        this.hideSizePanel();
      } else {
        this.showSizePanel();
      }
    },
    hideSizePanel: function hideSizePanel() {
      this.showSizes = false;
    },
    showSizePanel: function showSizePanel() {
      var _this7 = this;

      var $refs = this.$refs,
          _this$zIndex = this.zIndex,
          zIndex = _this$zIndex === void 0 ? conf.tooltip.zIndex : _this$zIndex;
      var sizeBtnElem = $refs.sizeBtn;

      var _DomTools$getAbsolute = DomTools.getAbsolutePos(sizeBtnElem),
          left = _DomTools$getAbsolute.left,
          top = _DomTools$getAbsolute.top;

      var _DomTools$getDomNode = DomTools.getDomNode(),
          scrollTop = _DomTools$getDomNode.scrollTop,
          scrollLeft = _DomTools$getDomNode.scrollLeft,
          visibleWidth = _DomTools$getDomNode.visibleWidth,
          visibleHeight = _DomTools$getDomNode.visibleHeight;

      this.panelStyle = {
        zIndex: zIndex,
        left: "".concat(left, "px"),
        top: "".concat(top + sizeBtnElem.offsetHeight + 6, "px")
      };
      this.showSizes = true;
      this.$nextTick().then(function () {
        var sizePanelElem = $refs.sizePanel;

        if (sizePanelElem) {
          _this7.panelStyle.top = "".concat(top + sizeBtnElem.offsetHeight + 6, "px");
          _this7.panelStyle.left = "".concat(left + Math.floor((sizeBtnElem.offsetWidth - sizePanelElem.offsetWidth) / 2), "px");
          return _this7.$nextTick();
        }
      }).then(function () {
        var sizePanelElem = $refs.sizePanel;

        if (sizePanelElem) {
          var offsetHeight = sizePanelElem.offsetHeight;
          var offsetWidth = sizePanelElem.offsetWidth;

          if (top + sizeBtnElem.offsetHeight + offsetHeight > scrollTop + visibleHeight) {
            _this7.panelStyle.top = "".concat(top - offsetHeight - 6, "px");
          }

          if (left + offsetWidth > scrollLeft + visibleWidth) {
            _this7.panelStyle.left = "".concat(scrollLeft + visibleWidth - offsetWidth - 6, "px");
          }
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./packages/pager/index.js



pager.install = function (Vue) {
  Vue.component(pager.name, pager);
};

var Pager = pager;
/* harmony default export */ var packages_pager = (pager);
// CONCATENATED MODULE: ./packages/checkbox/src/checkbox.js

/* harmony default export */ var src_checkbox = ({
  name: 'VxeCheckbox',
  props: {
    value: Boolean,
    indeterminate: Boolean,
    disabled: Boolean,
    name: String,
    size: String
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var disabled = this.disabled,
        vSize = this.vSize,
        indeterminate = this.indeterminate,
        value = this.value;
    return h('label', {
      class: ['vxe-checkbox', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--indeterminate', indeterminate), _defineProperty(_ref, 'is--disabled', disabled), _ref)]
    }, [h('input', {
      attrs: {
        type: 'checkbox',
        disabled: disabled
      },
      domProps: {
        checked: value
      },
      on: {
        change: function change(evnt) {
          if (!_this.disabled) {
            var checked = evnt.target.checked;

            _this.$emit('input', checked);

            _this.$emit('change', checked, evnt);
          }
        }
      }
    }), h('span', {
      class: ['checkbox--icon']
    }), this.$slots.default ? h('span', {
      class: 'checkbox--label'
    }, this.$slots.default) : null]);
  }
});
// CONCATENATED MODULE: ./packages/checkbox/index.js



src_checkbox.install = function (Vue) {
  Vue.component(src_checkbox.name, src_checkbox);
};

var Checkbox = src_checkbox;
/* harmony default export */ var packages_checkbox = (src_checkbox);
// CONCATENATED MODULE: ./packages/radio/src/radio.js



/* harmony default export */ var src_radio = ({
  name: 'VxeRadio',
  props: {
    value: [String, Number],
    label: [String, Number],
    disabled: Boolean,
    name: String,
    size: String
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var $slots = this.$slots,
        disabled = this.disabled,
        vSize = this.vSize,
        value = this.value,
        label = this.label,
        name = this.name;
    return h('label', {
      class: ['vxe-radio', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', disabled), _ref)]
    }, [h('input', {
      attrs: {
        type: 'radio',
        name: name,
        disabled: disabled
      },
      domProps: {
        checked: value === label
      },
      on: {
        change: function change(evnt) {
          if (!disabled) {
            _this.$emit('input', label);

            _this.$emit('change', label, evnt);
          }
        }
      }
    }), h('span', {
      class: ['radio--icon']
    }), $slots.default ? h('span', {
      class: ['radio--label']
    }, $slots.default) : null]);
  }
});
// CONCATENATED MODULE: ./packages/radio/index.js



src_radio.install = function (Vue) {
  Vue.component(src_radio.name, src_radio);
};

var Radio = src_radio;
/* harmony default export */ var packages_radio = (src_radio);
// CONCATENATED MODULE: ./packages/input/src/input.js


/* harmony default export */ var src_input = ({
  name: 'VxeInput',
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean,
    placeholder: String,
    size: String
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    var _this = this,
        _ref;

    var $listeners = this.$listeners,
        value = this.value,
        type = this.type,
        vSize = this.vSize,
        placeholder = this.placeholder,
        disabled = this.disabled;
    var on = {
      input: function input(evnt) {
        return _this.$emit('input', evnt.target.value);
      }
    };

    if ($listeners.change) {
      on.change = function (evnt) {
        return _this.$emit('change', evnt.target.value, evnt);
      };
    }

    return h('div', {
      class: ['vxe-input--wrapper', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', this.disabled), _ref)]
    }, [h('input', {
      class: "vxe-input",
      domProps: {
        value: value
      },
      attrs: {
        type: type,
        placeholder: placeholder,
        disabled: disabled
      },
      on: on
    })]);
  }
});
// CONCATENATED MODULE: ./packages/input/index.js



src_input.install = function (Vue) {
  Vue.component(src_input.name, src_input);
};

var Input = src_input;
/* harmony default export */ var packages_input = (src_input);
// CONCATENATED MODULE: ./packages/button/src/button.js


/* harmony default export */ var src_button = ({
  name: 'VxeButton',
  props: {
    type: String,
    size: String
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    var _this = this,
        _ref;

    var $listeners = this.$listeners,
        type = this.type,
        vSize = this.vSize;
    var on = null;

    if ($listeners) {
      on = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, evnt);
        };
      });
    }

    return h(type === 'text' ? 'a' : 'button', {
      class: ['vxe-button', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "type--".concat(type), type), _ref)],
      on: on
    }, this.$slots.default);
  }
});
// CONCATENATED MODULE: ./packages/button/index.js



src_button.install = function (Vue) {
  Vue.component(src_button.name, src_button);
};

var Button = src_button;
/* harmony default export */ var packages_button = (src_button);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// CONCATENATED MODULE: ./packages/message/src/msgQueue.js
var msgQueue = [];
/* harmony default export */ var src_msgQueue = (msgQueue);
// CONCATENATED MODULE: ./packages/message/src/message.js







/* harmony default export */ var src_message = ({
  name: 'VxeMessage',
  props: {
    value: Boolean,
    id: String,
    type: String,
    status: String,
    top: {
      type: Number,
      default: 15
    },
    title: String,
    duration: {
      type: Number,
      default: function _default() {
        return conf.message.duration;
      }
    },
    message: [String, Function],
    lockView: {
      type: Boolean,
      default: function _default() {
        return conf.message.lockView;
      }
    },
    lockScroll: {
      type: Boolean,
      default: function _default() {
        return conf.message.lockScroll;
      }
    },
    mask: {
      type: Boolean,
      default: function _default() {
        return conf.message.mask;
      }
    },
    maskClosable: Boolean,
    zIndex: {
      type: Number,
      default: function _default() {
        return conf.message.zIndex;
      }
    },
    animat: {
      type: Boolean,
      default: function _default() {
        return conf.message.animat;
      }
    }
  },
  data: function data() {
    return {
      visible: false,
      contentVisible: false,
      beforeLockStyle: null,
      msgTop: 0
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent && (this.$parent.size || this.$parent.vSize);
    },
    isMsg: function isMsg() {
      return this.type === 'message';
    }
  },
  watch: {
    value: function value(visible) {
      this[visible ? 'open' : 'close']();
    }
  },
  created: function created() {
    if (this.value) {
      this.open();
    }
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    this.removeMsgQueue();
    this.$el.parentNode.removeChild(this.$el);
  },
  render: function render(h) {
    var _ref;

    var vSize = this.vSize,
        type = this.type,
        animat = this.animat,
        zIndex = this.zIndex,
        status = this.status,
        msgTop = this.msgTop,
        contentVisible = this.contentVisible,
        visible = this.visible,
        title = this.title,
        message = this.message,
        lockView = this.lockView,
        mask = this.mask,
        isMsg = this.isMsg;
    return h('div', {
      class: ['vxe-msg--wrapper', "type--".concat(type), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "msg--".concat(status), status), _defineProperty(_ref, 'is--animat', animat), _defineProperty(_ref, 'lock--view', lockView), _defineProperty(_ref, 'is--mask', mask), _defineProperty(_ref, 'is--visible', contentVisible), _defineProperty(_ref, "active", visible), _ref)],
      style: {
        zIndex: zIndex,
        top: msgTop ? "".concat(msgTop, "px") : msgTop
      },
      on: {
        click: this.selfClickEvent
      }
    }, [h('div', {
      class: 'vxe-msg--box',
      ref: 'msgBox'
    }, [!isMsg ? h('div', {
      class: 'vxe-msg--header'
    }, [h('span', {
      class: 'vxe-msg--title'
    }, title || conf.i18n('vxe.alert.title')), h('i', {
      class: ['vxe-msg--close-btn', conf.icon.msgClose],
      on: {
        click: this.closeEvent
      }
    })]) : null, h('div', {
      class: 'vxe-msg--body'
    }, [status ? h('div', {
      class: 'vxe-msg--status-wrapper'
    }, [h('i', {
      class: ['vxe-msg--status-icon', conf.icon["msg".concat(status.replace(/\b(\w)/, function (word) {
        return word.toUpperCase();
      }))]]
    })]) : null, h('div', {
      class: 'vxe-msg--content'
    }, this.$slots.default || (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(message) ? message.call(this, h) : message))]), !isMsg ? h('div', {
      class: 'vxe-msg--footer'
    }, [type === 'confirm' ? h('vxe-button', {
      on: {
        click: this.cancelEvent
      }
    }, conf.i18n('vxe.button.cancel')) : null, h('vxe-button', {
      props: {
        type: 'primary'
      },
      on: {
        click: this.confirmEvent
      }
    }, conf.i18n('vxe.button.confirm'))]) : null])]);
  },
  methods: {
    selfClickEvent: function selfClickEvent(evnt) {
      if (this.maskClosable && evnt.target === this.$el) {
        var type = 'mask';
        this.close(type);
      }
    },
    closeEvent: function closeEvent(evnt) {
      var type = 'close';
      this.$emit(type, evnt);
      this.close(type);
    },
    confirmEvent: function confirmEvent(evnt) {
      var type = 'confirm';
      this.$emit(type, evnt);
      this.close(type);
    },
    cancelEvent: function cancelEvent(evnt) {
      var type = 'cancel';
      this.$emit(type, evnt);
      this.close(type);
    },
    open: function open() {
      var _this = this;

      var duration = this.duration,
          visible = this.visible,
          lockScroll = this.lockScroll,
          _handleCustom = this._handleCustom,
          isMsg = this.isMsg;

      if (!visible) {
        this.visible = true;
        this.contentVisible = false;
        setTimeout(function () {
          _this.contentVisible = true;
        }, 10);

        if (lockScroll) {
          var bodyElem = document.body;
          this.beforeLockStyle = {
            paddingRight: bodyElem.style.paddingRight,
            overflow: bodyElem.style.overflow
          };
          bodyElem.style.paddingRight = "".concat(window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth), "px");
          bodyElem.style.overflow = 'hidden';
        }

        if (!_handleCustom) {
          this.$emit('input', true);
          this.$emit('show');
        }

        if (isMsg) {
          this.addMsgQueue();
          setTimeout(this.close, duration);
        }
      }
    },
    addMsgQueue: function addMsgQueue() {
      if (src_msgQueue.indexOf(this) === -1) {
        src_msgQueue.push(this);
      }

      this.updateStyle();
    },
    removeMsgQueue: function removeMsgQueue() {
      var _this2 = this;

      if (src_msgQueue.indexOf(this) > -1) {
        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(src_msgQueue, function (comp) {
          return comp === _this2;
        });
      }

      this.updateStyle();
    },
    updateStyle: function updateStyle() {
      this.$nextTick(function () {
        var offsetTop = 0;
        src_msgQueue.forEach(function (comp, index) {
          offsetTop += comp.top;
          comp.msgTop = offsetTop;
          offsetTop += comp.$refs.msgBox.clientHeight;
        });
      });
    },
    close: function close(type) {
      var _this3 = this;

      var visible = this.visible,
          lockScroll = this.lockScroll,
          beforeLockStyle = this.beforeLockStyle,
          isMsg = this.isMsg;

      if (visible) {
        if (isMsg) {
          this.removeMsgQueue();
        }

        this.contentVisible = false;
        setTimeout(function () {
          _this3.visible = false;

          if (lockScroll) {
            Object.assign(document.body.style, beforeLockStyle);
          }

          if (_this3._handleCustom) {
            _this3._handleCustom(type);
          } else {
            _this3.$emit('input', false);

            _this3.$emit('hide', type);
          }
        }, 200);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/message/index.js





var AlertController = null;
function Message(options) {
  return new Promise(function (resolve, reject) {
    if (options && options.id && src_msgQueue.some(function (comp) {
      return comp.id === options.id;
    })) {
      resolve('exist');
    } else {
      var $alert = new AlertController({
        el: document.createElement('div'),
        propsData: options
      });

      $alert._handleCustom = function (type) {
        $alert.$destroy();

        if (type === 'confirm' || options.type === 'message') {
          resolve(type);
        } else {
          reject(type);
        }
      };

      setTimeout(function () {
        return $alert.open();
      });
    }
  });
}
['alert', 'confirm', 'message'].forEach(function (type, index) {
  var defOpts = index === 2 ? {
    mask: false,
    lockView: false,
    lockScroll: false
  } : {};

  Message[type] = function (message, title, options) {
    var opts;

    if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isObject(message)) {
      opts = message;
    } else {
      if (title) {
        opts = {
          title: title
        };
      }
    }

    return Message(Object.assign({
      message: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toString(message),
      type: type
    }, defOpts, opts, options));
  };
});

Message.install = function (Vue) {
  AlertController = Vue.extend(src_message);
  Vue.prototype.$XMsg = Message;
};

/* harmony default export */ var packages_message = (Message);
// CONCATENATED MODULE: ./packages/tooltip/src/tooltip.js








/* harmony default export */ var src_tooltip = ({
  name: 'VxeTooltip',
  props: {
    value: Boolean,
    theme: {
      type: String,
      default: function _default() {
        return conf.tooltip.theme;
      }
    },
    content: String,
    zIndex: {
      type: Number,
      default: function _default() {
        return conf.tooltip.zIndex;
      }
    },
    isArrow: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      isUpdate: false,
      visible: false,
      tipStore: {
        style: {},
        placement: '',
        arrowStyle: null
      }
    };
  },
  watch: {
    value: function value(_value) {
      if (!this.isUpdate) {
        this[_value ? 'show' : 'close']();
      }

      this.isUpdate = false;
    }
  },
  mounted: function mounted() {
    var _this = this;

    var $el = this.$el,
        value = this.value;
    var parentNode = $el.parentNode;
    Array.from($el.children).forEach(function (elem, index) {
      if (index > 1) {
        parentNode.insertBefore(elem, $el);
        _this.target = elem;
      }
    });
    parentNode.removeChild($el);

    if (value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy() {
    var $el = this.$el;
    var parentNode = $el.parentNode;

    if (parentNode) {
      parentNode.removeChild($el);
    }
  },
  render: function render(h) {
    var theme = this.theme,
        content = this.content,
        isArrow = this.isArrow,
        visible = this.visible,
        tipStore = this.tipStore;
    return h('div', {
      class: ['vxe-table--tooltip-wrapper', "theme--".concat(theme), "placement--".concat(tipStore.placement), {
        'is--visible': visible,
        'is--arrow': isArrow
      }],
      style: tipStore.style,
      ref: 'tipWrapper'
    }, [h('div', {
      class: ['vxe-table--tooltip-content']
    }, this.$slots.content || content), h('div', {
      class: ['vxe-table--tooltip-arrow'],
      style: tipStore.arrowStyle
    })].concat(this.$slots.default));
  },
  methods: {
    show: function show() {
      return this.toVisible(this.target);
    },
    close: function close() {
      Object.assign(this.tipStore, {
        style: {},
        placement: '',
        arrowStyle: null
      });
      this.update(false);
      return this.$nextTick();
    },
    update: function update(value) {
      if (value !== this.visible) {
        this.visible = value;
        this.isUpdate = true;
        this.$emit('input', this.visible);
      }
    },
    toVisible: function toVisible(target) {
      var _this2 = this;

      if (target) {
        var $el = this.$el,
            tipStore = this.tipStore,
            zIndex = this.zIndex;

        var _DomTools$getAbsolute = DomTools.getAbsolutePos(target),
            top = _DomTools$getAbsolute.top,
            left = _DomTools$getAbsolute.left;

        var _DomTools$getDomNode = DomTools.getDomNode(),
            scrollTop = _DomTools$getDomNode.scrollTop,
            scrollLeft = _DomTools$getDomNode.scrollLeft,
            visibleWidth = _DomTools$getDomNode.visibleWidth;

        var parentNode = $el.parentNode;
        var tipLeft = left;
        tipStore.placement = 'top';
        tipStore.arrowStyle = {
          left: '50%'
        };

        if (!parentNode) {
          document.body.appendChild($el);
        }

        this.update(true);
        return this.$nextTick().then(function () {
          var wrapperElem = $el;

          if (wrapperElem) {
            var clientHeight = wrapperElem.clientHeight;
            var clientWidth = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(getComputedStyle(wrapperElem).width);
            tipLeft = left + Math.floor((target.clientWidth - clientWidth) / 2);
            tipStore.style = {
              zIndex: zIndex,
              width: "".concat(clientWidth, "px"),
              top: "".concat(top - clientHeight - 6, "px"),
              left: "".concat(tipLeft, "px")
            };
            return _this2.$nextTick();
          }
        }).then(function () {
          var wrapperElem = $el;

          if (wrapperElem) {
            var clientHeight = wrapperElem.clientHeight;
            var clientWidth = wrapperElem.clientWidth;
            Object.assign(tipStore.style, {
              top: "".concat(top - clientHeight - 6, "px"),
              left: "".concat(tipLeft, "px")
            });

            if (top - clientHeight < scrollTop + 6) {
              tipStore.placement = 'bottom';
              tipStore.style.top = "".concat(top + target.clientHeight + 6, "px");
            }

            if (tipLeft < scrollLeft + 6) {
              // 超出左边界
              tipLeft = scrollLeft + 6;
              tipStore.arrowStyle.left = "".concat(left > tipLeft + 16 ? left - tipLeft + 16 : 16, "px");
              tipStore.style.left = "".concat(tipLeft, "px");
            } else if (tipLeft + clientWidth > scrollLeft + visibleWidth) {
              // 超出右边界
              tipLeft = scrollLeft + visibleWidth - clientWidth - 6;
              tipStore.arrowStyle.left = "".concat(clientWidth - Math.max(Math.floor((tipLeft + clientWidth - left) / 2), 22), "px");
              tipStore.style.left = "".concat(tipLeft, "px");
            }
          }
        });
      }

      return this.$nextTick();
    }
  }
});
// CONCATENATED MODULE: ./packages/tooltip/index.js




src_tooltip.install = function (Vue) {
  conf._tip = 1;
  Vue.component(src_tooltip.name, src_tooltip);
};

var Tooltip = src_tooltip;
/* harmony default export */ var packages_tooltip = (src_tooltip);
// CONCATENATED MODULE: ./packages/export/src/export.js





/* harmony default export */ var export_src_export = ({
  getCsvContent: function getCsvContent(opts, oData, oColumns, tableElem) {
    var isOriginal = opts.original;

    var _getCsvData = getCsvData(opts, oData, oColumns, tableElem),
        columns = _getCsvData.columns,
        datas = _getCsvData.datas;

    var content = "\uFEFF";

    if (opts.isHeader) {
      content += columns.map(function (_ref) {
        var own = _ref.own;
        return own.title || own.label;
      }).join(',') + '\n';
    }

    datas.forEach(function (row, rowIndex) {
      if (isOriginal) {
        content += columns.map(function (column) {
          if (column.type === 'index') {
            return "\"".concat(column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1, "\"");
          }

          return "\"".concat(UtilTools.getCellValue(row, column) || '', "\"");
        }).join(',') + '\n';
      } else {
        content += columns.map(function (column) {
          return "\"".concat(row[column.id], "\"");
        }).join(',') + '\n';
      }
    });
    return content;
  },
  downloadCsc: function downloadCsc(opts, content) {
    if (!opts.download) {
      return Promise.resolve(content);
    }

    if (navigator.msSaveBlob && window.Blob) {
      navigator.msSaveBlob(new Blob([content], {
        type: 'text/csv'
      }), opts.filename);
    } else if (DomTools.browse['-ms']) {
      var win = window.top.open('about:blank', '_blank');
      win.document.charset = 'utf-8';
      win.document.write(content);
      win.document.close();
      win.document.execCommand('SaveAs', opts.filename);
      win.close();
    } else {
      var linkElem = document.createElement('a');
      linkElem.target = '_blank';
      linkElem.download = opts.filename;
      linkElem.href = getCsvUrl(opts, content);
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
    }
  }
});

function getCsvLabelData(columns, oData, tableElem) {
  var trElemList = tableElem.querySelectorAll('.vxe-table--body-wrapper.body--wrapper .vxe-body--row');
  return Array.from(trElemList).map(function (trElem) {
    var item = {};
    columns.forEach(function (column) {
      var cell = trElem.querySelector(".".concat(column.id));
      item[column.id] = cell ? cell.innerText.trim() : '';
    });
    return item;
  });
}

function getCsvData(opts, oData, oColumns, tableElem) {
  var isOriginal = opts.original;
  var columns = opts.columns ? opts.columns : oColumns;

  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod);
  }

  var datas = opts.data ? opts.data : isOriginal ? oData : getCsvLabelData(columns, oData, tableElem);

  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod);
  }

  return {
    columns: columns,
    datas: datas
  };
}

function getCsvUrl(opts, content) {
  if (window.Blob && window.URL && window.URL.createObjectURL && !DomTools.browse.safari) {
    return URL.createObjectURL(new Blob([content], {
      type: 'text/csv'
    }));
  }

  return "data:attachment/csv;charset=utf-8,".concat(encodeURIComponent(content));
}
// CONCATENATED MODULE: ./packages/export/index.js



export_src_export.install = function () {
  Object.assign(ExportTools, export_src_export);
};

var Export = export_src_export;
/* harmony default export */ var packages_export = (export_src_export);
// CONCATENATED MODULE: ./packages/resize/src/resize.js


/**
 * 支持任意元素模拟 resize 事件行为，定时检测
 * 用于支持表格响应式布局，当宽度或高度发生变化时更新表格布局
 */

var resize_eventStore = [];
var defaultInterval = 250;
var resizeTimeout = null;

function eventListener() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(eventHandle, conf.resizeInterval || defaultInterval);
}

function eventHandle() {
  if (resize_eventStore.length) {
    resize_eventStore.forEach(function (item) {
      var comp = item.comp,
          target = item.target,
          cb = item.cb,
          width = item.width,
          heighe = item.heighe;
      var clientWidth = target.clientWidth;
      var clientHeight = target.clientHeight;
      var rWidth = clientWidth && width !== clientWidth;
      var rHeight = clientHeight && heighe !== clientHeight;

      if (rWidth || rHeight) {
        item.width = clientWidth;
        item.heighe = clientHeight;
        cb.call(comp, {
          type: 'resize',
          target: target,
          rWidth: rWidth,
          rHeight: rHeight,
          currentTarget: target
        });
      }
    });
    resizeTimeout = setTimeout(eventHandle, conf.resizeInterval || defaultInterval);
  }
}

/* harmony default export */ var src_resize = ({
  on: function on(comp, target, cb) {
    if (!resize_eventStore.length) {
      eventListener();
    }

    if (!resize_eventStore.some(function (item) {
      return item.comp === comp && item.target === target;
    })) {
      resize_eventStore.push({
        comp: comp,
        target: target,
        cb: cb,
        width: target.clientWidth,
        heighe: target.clientWidth
      });
    }
  },
  off: function off(comp, target) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(resize_eventStore, function (item) {
      return item.comp === comp && item.target === target;
    });
  }
});
// CONCATENATED MODULE: ./packages/resize/index.js



src_resize.install = function () {
  Object.assign(ResizeEvent, src_resize);
};

var Resize = src_resize;
/* harmony default export */ var packages_resize = (src_resize);
// CONCATENATED MODULE: ./locale/lang/zh-CN.js
/* harmony default export */ var zh_CN = ({
  vxe: {
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      allFilter: '全部'
    },
    grid: {
      selectOneRecord: '请至少选择一条记录！',
      deleteSelectRecord: '您确定要删除所选记录吗？',
      removeSelectRecord: '您确定要移除所选记录吗？',
      dataUnchanged: '数据未改动！ ',
      saveSuccess: '保存成功'
    },
    pager: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {{total}} 条记录',
      pageClassifier: '页'
    },
    alert: {
      title: '消息提示'
    },
    button: {
      confirm: '确认',
      cancel: '取消'
    }
  }
});
// EXTERNAL MODULE: ./styles/index.scss
var styles = __webpack_require__("1a97");

// CONCATENATED MODULE: ./index.js






















 // 默认主题

 // 按需加载的组件

var components = [packages_table, packages_column, packages_header, packages_body, packages_footer, packages_filter, packages_loading, packages_grid, packages_excel, packages_menu, packages_toolbar, packages_pager, packages_checkbox, packages_radio, packages_input, packages_button, packages_message, packages_tooltip, packages_export, packages_resize]; // 默认安装

function install(Vue, options) {
  if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isPlainObject(options)) {
    v_x_e_table.setup(options);
  }

  components.map(function (component) {
    return Vue.use(component);
  });
} // 默认中文


v_x_e_table.setup({
  i18n: function i18n(key, value) {
    return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(zh_CN, key);
  }
});

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

v_x_e_table.install = install;





















/* harmony default export */ var index_0 = (v_x_e_table);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport components */__webpack_require__.d(__webpack_exports__, "components", function() { return components; });
/* concated harmony reexport Table */__webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* concated harmony reexport Column */__webpack_require__.d(__webpack_exports__, "Column", function() { return Column; });
/* concated harmony reexport Header */__webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* concated harmony reexport Body */__webpack_require__.d(__webpack_exports__, "Body", function() { return Body; });
/* concated harmony reexport Footer */__webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* concated harmony reexport Filter */__webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* concated harmony reexport Loading */__webpack_require__.d(__webpack_exports__, "Loading", function() { return Loading; });
/* concated harmony reexport Grid */__webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* concated harmony reexport Excel */__webpack_require__.d(__webpack_exports__, "Excel", function() { return Excel; });
/* concated harmony reexport TableContextMenu */__webpack_require__.d(__webpack_exports__, "TableContextMenu", function() { return TableContextMenu; });
/* concated harmony reexport Toolbar */__webpack_require__.d(__webpack_exports__, "Toolbar", function() { return Toolbar; });
/* concated harmony reexport Pager */__webpack_require__.d(__webpack_exports__, "Pager", function() { return Pager; });
/* concated harmony reexport Checkbox */__webpack_require__.d(__webpack_exports__, "Checkbox", function() { return Checkbox; });
/* concated harmony reexport Radio */__webpack_require__.d(__webpack_exports__, "Radio", function() { return Radio; });
/* concated harmony reexport Input */__webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* concated harmony reexport Button */__webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* concated harmony reexport Message */__webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* concated harmony reexport Tooltip */__webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* concated harmony reexport Export */__webpack_require__.d(__webpack_exports__, "Export", function() { return Export; });
/* concated harmony reexport Resize */__webpack_require__.d(__webpack_exports__, "Resize", function() { return Resize; });
/* concated harmony reexport VXETable */__webpack_require__.d(__webpack_exports__, "VXETable", function() { return VXETable; });
/* concated harmony reexport Interceptor */__webpack_require__.d(__webpack_exports__, "Interceptor", function() { return Interceptor; });
/* concated harmony reexport Renderer */__webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (index_0);



/***/ }),

/***/ "fde4":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("bf90");
var $Object = __webpack_require__("584a").Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ })["default"];
});