(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xe-utils/ctor"));
	else if(typeof define === 'function' && define.amd)
		define(["xe-utils"], factory);
	else if(typeof exports === 'object')
		exports["VXETable"] = factory(require("xe-utils/ctor"));
	else
		root["VXETable"] = factory(root["XEUtils"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__7fd6__) {
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

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
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

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0ccb":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__("50c4");
var repeat = __webpack_require__("1148");
var requireObjectCoercible = __webpack_require__("1d80");

var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = String(requireObjectCoercible($this));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : String(fillString);
    var intMaxLength = toLength(maxLength);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat.call(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0d3b":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ "1148":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
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
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
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
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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
}, !SUPPORTS_Y);


/***/ }),

/***/ "13d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $reduce = __webpack_require__("d58f").left;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "19aa":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "1a97":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "2266":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var bind = __webpack_require__("0366");
var getIteratorMethod = __webpack_require__("35a1");
var callWithSafeIterationClosing = __webpack_require__("9bdd");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var fails = __webpack_require__("d039");
var flags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "2626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var definePropertyModule = __webpack_require__("9bf2");
var wellKnownSymbol = __webpack_require__("b622");
var DESCRIPTORS = __webpack_require__("83ab");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "2b3d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("3ca3");
var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var USE_NATIVE_URL = __webpack_require__("0d3b");
var global = __webpack_require__("da84");
var defineProperties = __webpack_require__("37e8");
var redefine = __webpack_require__("6eeb");
var anInstance = __webpack_require__("19aa");
var has = __webpack_require__("5135");
var assign = __webpack_require__("60da");
var arrayFrom = __webpack_require__("4df4");
var codeAt = __webpack_require__("6547").codeAt;
var toASCII = __webpack_require__("5fb2");
var setToStringTag = __webpack_require__("d44e");
var URLSearchParamsModule = __webpack_require__("9861");
var InternalStateModule = __webpack_require__("69f3");

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
// eslint-disable-next-line no-control-regex
var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "408a":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};


/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "45fc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $some = __webpack_require__("b727").some;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('some');
var USES_TO_LENGTH = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "466d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toLength = __webpack_require__("50c4");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "498a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $trim = __webpack_require__("58a8").trim;
var forcedStringTrimMethod = __webpack_require__("c8d2");

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ "4d63":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var inheritIfRequired = __webpack_require__("7156");
var defineProperty = __webpack_require__("9bf2").f;
var getOwnPropertyNames = __webpack_require__("241c").f;
var isRegExp = __webpack_require__("44e7");
var getFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var setInternalState = __webpack_require__("69f3").set;
var setSpecies = __webpack_require__("2626");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y && sticky) setInternalState(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
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
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4d90":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $padStart = __webpack_require__("0ccb").start;
var WEBKIT_BUG = __webpack_require__("9a0c");

// `String.prototype.padStart` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__("0366");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var getIteratorMethod = __webpack_require__("35a1");

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "4ec9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__("6d61");
var collectionStrong = __webpack_require__("6566");

// `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects
module.exports = collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

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
    return nativeReplace.call(replacement, symbols, function (match, ch) {
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

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__("44e7");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "5c6c":
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

/***/ "5fb2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line  max-statements
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};


/***/ }),

/***/ "60da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var objectKeys = __webpack_require__("df75");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "6566":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__("9bf2").f;
var create = __webpack_require__("7c73");
var redefineAll = __webpack_require__("e2cc");
var bind = __webpack_require__("0366");
var anInstance = __webpack_require__("19aa");
var iterate = __webpack_require__("2266");
var defineIterator = __webpack_require__("7dd0");
var setSpecies = __webpack_require__("2626");
var DESCRIPTORS = __webpack_require__("83ab");
var fastKey = __webpack_require__("f183").fastKey;
var InternalStateModule = __webpack_require__("69f3");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6d61":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var InternalMetadataModule = __webpack_require__("f183");
var iterate = __webpack_require__("2266");
var anInstance = __webpack_require__("19aa");
var isObject = __webpack_require__("861d");
var fails = __webpack_require__("d039");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var setToStringTag = __webpack_require__("d44e");
var inheritIfRequired = __webpack_require__("7156");

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7db0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $find = __webpack_require__("b727").find;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "7fd6":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7fd6__;

/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "857a":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

var quot = /"/g;

// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
// https://tc39.github.io/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
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

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9861":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("e260");
var $ = __webpack_require__("23e7");
var getBuiltIn = __webpack_require__("d066");
var USE_NATIVE_URL = __webpack_require__("0d3b");
var redefine = __webpack_require__("6eeb");
var redefineAll = __webpack_require__("e2cc");
var setToStringTag = __webpack_require__("d44e");
var createIteratorConstructor = __webpack_require__("9ed3");
var InternalStateModule = __webpack_require__("69f3");
var anInstance = __webpack_require__("19aa");
var hasOwn = __webpack_require__("5135");
var bind = __webpack_require__("0366");
var classof = __webpack_require__("f5df");
var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");
var wellKnownSymbol = __webpack_require__("b622");

var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: first.value + '', value: second.value + '' });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.appent` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: name + '', value: value + '' });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674
if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
  $({ global: true, enumerable: true, forced: true }, {
    fetch: function fetch(input /* , init */) {
      var args = [input];
      var init, body, headers;
      if (arguments.length > 1) {
        init = arguments[1];
        if (isObject(init)) {
          body = init.body;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            init = create(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }
        args.push(init);
      } return $fetch.apply(this, args);
    }
  });
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "9a0c":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/zloirock/core-js/issues/280
var userAgent = __webpack_require__("342f");

// eslint-disable-next-line unicorn/no-unsafe-regex
module.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);


/***/ }),

/***/ "9a1f":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var getIteratorMethod = __webpack_require__("35a1");

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var arrayMethodIsStrict = __webpack_require__("a640");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "a434":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toAbsoluteIndex = __webpack_require__("23cb");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var toObject = __webpack_require__("7b0b");
var arraySpeciesCreate = __webpack_require__("65f0");
var createProperty = __webpack_require__("8418");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a623":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $every = __webpack_require__("b727").every;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('every');
var USES_TO_LENGTH = arrayMethodUsesToLength('every');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "ae40":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__("e163");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "af03":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b680":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toInteger = __webpack_require__("a691");
var thisNumberValue = __webpack_require__("408a");
var repeat = __webpack_require__("1148");
var fails = __webpack_require__("d039");

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var FORCED = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + repeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "baa5":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var lastIndexOf = __webpack_require__("e58c");

// `Array.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});


/***/ }),

/***/ "bb2f":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c7cd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createHTML = __webpack_require__("857a");
var forcedStringHTMLMethod = __webpack_require__("af03");

// `String.prototype.fixed` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fixed
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fixed') }, {
  fixed: function fixed() {
    return createHTML(this, 'tt', '', '');
  }
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8d2":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var whitespaces = __webpack_require__("5899");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ "c975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $indexOf = __webpack_require__("4d64").indexOf;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cca6":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var assign = __webpack_require__("60da");

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d58f":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");
var toLength = __webpack_require__("50c4");

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

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

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
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
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dbb4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var ownKeys = __webpack_require__("56ef");
var toIndexedObject = __webpack_require__("fc6a");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var createProperty = __webpack_require__("8418");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var has = __webpack_require__("5135");
var isObject = __webpack_require__("861d");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e2cc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("6eeb");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "e439":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
var DESCRIPTORS = __webpack_require__("83ab");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e58c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "f183":
/***/ (function(module, exports, __webpack_require__) {

var hiddenKeys = __webpack_require__("d012");
var isObject = __webpack_require__("861d");
var has = __webpack_require__("5135");
var defineProperty = __webpack_require__("9bf2").f;
var uid = __webpack_require__("90e3");
var FREEZING = __webpack_require__("bb2f");

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "VXETable", function() { return /* reexport */ VXETable; });
__webpack_require__.d(__webpack_exports__, "Column", function() { return /* reexport */ Column; });
__webpack_require__.d(__webpack_exports__, "Header", function() { return /* reexport */ Header; });
__webpack_require__.d(__webpack_exports__, "Footer", function() { return /* reexport */ Footer; });
__webpack_require__.d(__webpack_exports__, "Filter", function() { return /* reexport */ Filter; });
__webpack_require__.d(__webpack_exports__, "Grid", function() { return /* reexport */ Grid; });
__webpack_require__.d(__webpack_exports__, "Menu", function() { return /* reexport */ Menu; });
__webpack_require__.d(__webpack_exports__, "Toolbar", function() { return /* reexport */ Toolbar; });
__webpack_require__.d(__webpack_exports__, "Pager", function() { return /* reexport */ Pager; });
__webpack_require__.d(__webpack_exports__, "Checkbox", function() { return /* reexport */ Checkbox; });
__webpack_require__.d(__webpack_exports__, "Radio", function() { return /* reexport */ Radio; });
__webpack_require__.d(__webpack_exports__, "Input", function() { return /* reexport */ Input; });
__webpack_require__.d(__webpack_exports__, "Textarea", function() { return /* reexport */ Textarea; });
__webpack_require__.d(__webpack_exports__, "Button", function() { return /* reexport */ Button; });
__webpack_require__.d(__webpack_exports__, "Modal", function() { return /* reexport */ Modal; });
__webpack_require__.d(__webpack_exports__, "Tooltip", function() { return /* reexport */ Tooltip; });
__webpack_require__.d(__webpack_exports__, "Form", function() { return /* reexport */ Form; });
__webpack_require__.d(__webpack_exports__, "Select", function() { return /* reexport */ Select; });
__webpack_require__.d(__webpack_exports__, "Switch", function() { return /* reexport */ Switch; });
__webpack_require__.d(__webpack_exports__, "List", function() { return /* reexport */ List; });
__webpack_require__.d(__webpack_exports__, "Pulldown", function() { return /* reexport */ Pulldown; });
__webpack_require__.d(__webpack_exports__, "Edit", function() { return /* reexport */ Edit; });
__webpack_require__.d(__webpack_exports__, "Export", function() { return /* reexport */ Export; });
__webpack_require__.d(__webpack_exports__, "Keyboard", function() { return /* reexport */ Keyboard; });
__webpack_require__.d(__webpack_exports__, "Validator", function() { return /* reexport */ Validator; });
__webpack_require__.d(__webpack_exports__, "Table", function() { return /* reexport */ Table; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./styles/index.scss
var styles = __webpack_require__("1a97");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: external {"root":"XEUtils","commonjs":"xe-utils/ctor","commonjs2":"xe-utils/ctor","amd":"xe-utils"}
var ctor_amd_xe_utils_ = __webpack_require__("7fd6");
var ctor_amd_xe_utils_default = /*#__PURE__*/__webpack_require__.n(ctor_amd_xe_utils_);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// CONCATENATED MODULE: ./packages/conf/index.js
var iconPrefix = 'vxe-icon--';
var GlobalConfig = {
  size: null,
  // 全局尺寸
  zIndex: 100,
  // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  version: 0,
  // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  // resizeInterval: 500,
  emptyCell: '　',
  table: {
    fit: true,
    showHeader: true,
    delayHover: 250,
    // keepSource: false,
    // showOverflow: null,
    // showHeaderOverflow: null,
    // showFooterOverflow: null,
    // resizeInterval: 500,
    // size: null,
    // zIndex: null,
    // resizable: false,
    // autoResize: false,
    // stripe: false,
    // border: false,
    // round: false,
    // emptyRender: {
    //   name: ''
    // },
    // radioConfig: {
    //   trigger: 'default'
    // },
    // checkboxConfig: {
    //   trigger: 'default'
    // },
    // tooltipConfig: {
    //   theme: 'dark',
    //   enterable: false
    // },
    // validConfig: {
    //   message: 'default'
    // },
    // contextMenu: {
    //   visibleMethod () {}
    // },
    // customConfig: {
    //  storage: false,
    //  checkMethod () {}
    // },
    // rowId: '_XID', // 行数据的唯一主键字段名
    sortConfig: {
      // remote: false,
      // trigger: 'default',
      // orders: ['asc', 'desc', null],
      // sortMethod: null,
      showIcon: true
    },
    filterConfig: {
      // remote: false,
      // filterMethod: null,
      showIcon: true
    },
    treeConfig: {
      children: 'children',
      hasChild: 'hasChild',
      indent: 20,
      showIcon: true
    },
    expandConfig: {
      // trigger: 'default',
      showIcon: true
    },
    editConfig: {
      // mode: 'cell',
      showIcon: true,
      showAsterisk: true
    },
    importConfig: {
      modes: ['insert', 'covering']
    },
    exportConfig: {
      isPrint: true,
      modes: ['current', 'selected']
    },
    mouseConfig: {
      extension: true
    },
    scrollX: {
      gt: 60 // oSize: 0

    },
    scrollY: {
      gt: 100 // oSize: 0

    }
  },
  export: {
    types: {}
  },
  icon: {
    // table
    TABLE_SORT_ASC: iconPrefix + 'caret-top',
    TABLE_SORT_DESC: iconPrefix + 'caret-bottom',
    TABLE_FILTER_NONE: iconPrefix + 'funnel',
    TABLE_FILTER_MATCH: iconPrefix + 'funnel',
    TABLE_EDIT: iconPrefix + 'edit-outline',
    TABLE_HELP: iconPrefix + 'question',
    TABLE_TREE_LOADED: iconPrefix + 'refresh roll',
    TABLE_TREE_OPEN: iconPrefix + 'caret-right rotate90',
    TABLE_TREE_CLOSE: iconPrefix + 'caret-right',
    TABLE_EXPAND_LOADED: iconPrefix + 'refresh roll',
    TABLE_EXPAND_OPEN: iconPrefix + 'arrow-right rotate90',
    TABLE_EXPAND_CLOSE: iconPrefix + 'arrow-right',
    // button
    BUTTON_DROPDOWN: iconPrefix + 'arrow-bottom',
    BUTTON_LOADING: iconPrefix + 'refresh roll',
    // select
    SELECT_OPEN: iconPrefix + 'caret-bottom rotate180',
    SELECT_CLOSE: iconPrefix + 'caret-bottom',
    // pager
    PAGER_JUMP_PREV: iconPrefix + 'd-arrow-left',
    PAGER_JUMP_NEXT: iconPrefix + 'd-arrow-right',
    PAGER_PREV_PAGE: iconPrefix + 'arrow-left',
    PAGER_NEXT_PAGE: iconPrefix + 'arrow-right',
    PAGER_JUMP_MORE: iconPrefix + 'more',
    // input
    INPUT_CLEAR: iconPrefix + 'close',
    INPUT_PWD: iconPrefix + 'eye-slash',
    INPUT_SHOW_PWD: iconPrefix + 'eye',
    INPUT_PREV_NUM: iconPrefix + 'caret-top',
    INPUT_NEXT_NUM: iconPrefix + 'caret-bottom',
    INPUT_DATE: iconPrefix + 'calendar',
    INPUT_SEARCH: iconPrefix + 'search',
    // modal
    MODAL_ZOOM_IN: iconPrefix + 'square',
    MODAL_ZOOM_OUT: iconPrefix + 'zoomout',
    MODAL_CLOSE: iconPrefix + 'close',
    MODAL_INFO: iconPrefix + 'info',
    MODAL_SUCCESS: iconPrefix + 'success',
    MODAL_WARNING: iconPrefix + 'warning',
    MODAL_ERROR: iconPrefix + 'error',
    MODAL_QUESTION: iconPrefix + 'question',
    MODAL_LOADING: iconPrefix + 'refresh roll',
    // toolbar
    TOOLBAR_TOOLS_REFRESH: iconPrefix + 'refresh',
    TOOLBAR_TOOLS_REFRESH_LOADING: iconPrefix + 'refresh roll',
    TOOLBAR_TOOLS_IMPORT: iconPrefix + 'upload',
    TOOLBAR_TOOLS_EXPORT: iconPrefix + 'download',
    TOOLBAR_TOOLS_PRINT: iconPrefix + 'print',
    TOOLBAR_TOOLS_ZOOM_IN: iconPrefix + 'zoomin',
    TOOLBAR_TOOLS_ZOOM_OUT: iconPrefix + 'zoomout',
    TOOLBAR_TOOLS_CUSTOM: iconPrefix + 'menu',
    // form
    FORM_PREFIX: iconPrefix + 'question',
    FORM_SUFFIX: iconPrefix + 'question',
    FORM_FOLDING: iconPrefix + 'arrow-top rotate180',
    FORM_UNFOLDING: iconPrefix + 'arrow-top'
  },
  grid: {
    // size: null,
    // zoomConfig: {
    //   escRestore: true
    // },
    // pagerConfig: {
    //   perfect: false
    // },
    // toolbar: {
    //   perfect: false
    // },
    proxyConfig: {
      autoLoad: true,
      message: true,
      props: {
        list: null,
        result: 'result',
        total: 'page.total',
        message: 'message'
      } // beforeItem: null,
      // beforeColumn: null,
      // beforeQuery: null,
      // afterQuery: null,
      // beforeDelete: null,
      // afterDelete: null,
      // beforeSave: null,
      // afterSave: null

    }
  },
  tooltip: {
    // size: null,
    trigger: 'hover',
    theme: 'dark',
    leaveDelay: 300
  },
  pager: {// size: null,
    // autoHidden: false,
    // perfect: true,
    // pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  form: {
    // preventSubmit: false,
    // validConfig: {
    //   autoPos: true
    // },
    // size: null,
    // colon: false,
    titleAsterisk: true
  },
  input: {
    // size: null,
    // transfer: false
    // parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
    // labelFormat: '',
    // valueFormat: '',
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(2100, 0, 1),
    startWeek: 1,
    digits: 2,
    controls: true
  },
  textarea: {// size: null,
    // autosize: {
    //   minRows: 1,
    //   maxRows: 10
    // }
  },
  select: {
    // size: null,
    // transfer: false,
    multiCharOverflow: 8
  },
  toolbar: {// size: null,
    // import: {
    //   mode: 'covering'
    // },
    // export: {
    //   types: ['csv', 'html', 'xml', 'txt']
    // },
    // custom: {
    //   isFooter: true
    // },
    // buttons: []
  },
  button: {// size: null,
    // transfer: false
  },
  radio: {// size: null
  },
  checkbox: {// size: null
  },
  switch: {// size: null
  },
  modal: {
    // size: null,
    minWidth: 340,
    minHeight: 140,
    lockView: true,
    mask: true,
    duration: 3000,
    marginSize: 0,
    dblclickZoom: true,
    showTitleOverflow: true,
    animat: true,
    // storage: false,
    storageKey: 'VXE_MODAL_POSITION'
  },
  list: {
    // size: null,
    scrollY: {
      gt: 100 // oSize: 0

    }
  },
  i18n: function i18n(key) {
    return key;
  }
};
/* harmony default export */ var conf = (GlobalConfig);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// CONCATENATED MODULE: ./packages/v-x-e-table/src/interceptor.js









function toType(type) {
  return ctor_amd_xe_utils_default.a.toString(type).replace('_', '').toLowerCase();
}

var eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType);
var storeMap = {};
var interceptor = {
  mixin: function mixin(map) {
    ctor_amd_xe_utils_default.a.each(map, function (evntFn, type) {
      return interceptor.add(type, evntFn);
    });
    return interceptor;
  },
  get: function get(type) {
    return storeMap[toType(type)] || [];
  },
  add: function add(type, evntFn) {
    type = toType(type);

    if (evntFn && eventTypes.indexOf(type) > -1) {
      var eList = storeMap[type];

      if (!eList) {
        eList = storeMap[type] = [];
      }

      eList.push(evntFn);
    }

    return interceptor;
  },
  delete: function _delete(type, evntFn) {
    var eList = storeMap[toType(type)];

    if (eList) {
      ctor_amd_xe_utils_default.a.remove(eList, function (fn) {
        return fn === evntFn;
      });
    }

    return interceptor;
  }
};
/* harmony default export */ var src_interceptor = (interceptor);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__("b680");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.last-index-of.js
var es_array_last_index_of = __webpack_require__("baa5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.fixed.js
var es_string_fixed = __webpack_require__("c7cd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js







function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js







function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: ./packages/v-x-e-table/src/store.js



/**
 * 创建数据仓库
 */
var store_Store = /*#__PURE__*/function () {
  function Store() {
    _classCallCheck(this, Store);

    this.store = {};
  }

  _createClass(Store, [{
    key: "mixin",
    value: function mixin(map) {
      Object.assign(this.store, map);
      return Store;
    }
  }, {
    key: "get",
    value: function get(type) {
      return this.store[type];
    }
  }, {
    key: "add",
    value: function add(type, render) {
      this.store[type] = render;
      return Store;
    }
  }, {
    key: "delete",
    value: function _delete(type) {
      delete this.store[type];
      return Store;
    }
  }]);

  return Store;
}();

/* harmony default export */ var store = (store_Store);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/formats.js

var formats = new store();
/* harmony default export */ var src_formats = (formats);
// CONCATENATED MODULE: ./packages/tools/src/utils.js

















var zindexIndex = 0;
var lastZindex = 1;

function getColFuncWidth(isExists) {
  var defaultWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  return isExists ? defaultWidth : 0;
}

var utils_ColumnInfo = /*#__PURE__*/function () {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  function ColumnInfo($xetable, _vm) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        renderHeader = _ref.renderHeader,
        renderCell = _ref.renderCell,
        renderFooter = _ref.renderFooter,
        renderData = _ref.renderData;

    _classCallCheck(this, ColumnInfo);

    var $xegrid = $xetable.$xegrid;
    var proxyOpts = $xegrid ? $xegrid.proxyOpts : null;
    var formatter = _vm.formatter;
    var visible = ctor_amd_xe_utils_default.a.isBoolean(_vm.visible) ? _vm.visible : true;

    if (false) { var _globalFunc, globalFunc, types; }

    Object.assign(this, {
      // 基本属性
      type: _vm.type,
      property: _vm.field,
      title: _vm.title,
      width: _vm.width,
      minWidth: _vm.minWidth,
      resizable: _vm.resizable,
      fixed: _vm.fixed,
      align: _vm.align,
      headerAlign: _vm.headerAlign,
      footerAlign: _vm.footerAlign,
      showOverflow: _vm.showOverflow,
      showHeaderOverflow: _vm.showHeaderOverflow,
      showFooterOverflow: _vm.showFooterOverflow,
      className: _vm.className,
      headerClassName: _vm.headerClassName,
      footerClassName: _vm.footerClassName,
      formatter: formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      sortMethod: _vm.sortMethod,
      remoteSort: _vm.remoteSort,
      filters: UtilTools.getFilters(_vm.filters),
      filterMultiple: ctor_amd_xe_utils_default.a.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
      filterMethod: _vm.filterMethod,
      filterRender: _vm.filterRender,
      treeNode: _vm.treeNode,
      cellType: _vm.cellType,
      cellRender: _vm.cellRender,
      editRender: _vm.editRender,
      contentRender: _vm.contentRender,
      exportMethod: _vm.exportMethod,
      footerExportMethod: _vm.footerExportMethod,
      titleHelp: _vm.titleHelp,
      // 自定义参数
      params: _vm.params,
      // 渲染属性
      id: _vm.colId || ctor_amd_xe_utils_default.a.uniqueId('col_'),
      parentId: null,
      visible: visible,
      halfVisible: false,
      defaultVisible: visible,
      checked: false,
      halfChecked: false,
      disabled: false,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      renderWidth: 0,
      renderHeight: 0,
      resizeWidth: 0,
      renderLeft: 0,
      renderArgs: [],
      // 渲染参数可用于扩展
      model: {},
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderFooter: renderFooter || _vm.renderFooter,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots
    });

    if (proxyOpts && proxyOpts.beforeColumn) {
      proxyOpts.beforeColumn({
        $grid: $xegrid,
        column: this
      });
    }
  }

  _createClass(ColumnInfo, [{
    key: "getTitle",
    value: function getTitle() {
      return UtilTools.getFuncText(this.title || (this.type === 'seq' ? conf.i18n('vxe.table.seqTitle') : ''));
    }
  }, {
    key: "getKey",
    value: function getKey() {
      return this.property || (this.type ? "type=".concat(this.type) : null);
    }
  }, {
    key: "update",
    value: function update(name, value) {
      // 不支持双向的属性
      if (name !== 'filters') {
        if (name === 'field') {
          this.property = value;
        } else {
          this[name] = value;
        }
      }
    }
  }]);

  return ColumnInfo;
}();

function outLog(type) {
  return function (message, params) {
    var msg = UtilTools.getLog(message, params);
    console[type](msg);
    return msg;
  };
}

var UtilTools = {
  warn: outLog('warn'),
  error: outLog('error'),
  getLog: function getLog(message, args) {
    return "[vxe-table] ".concat(conf.i18n(message, args));
  },
  getFuncText: function getFuncText(content) {
    return ctor_amd_xe_utils_default.a.isFunction(content) ? content() : conf.translate ? conf.translate(content) : content;
  },
  nextZIndex: function nextZIndex() {
    lastZindex = conf.zIndex + zindexIndex++;
    return lastZindex;
  },
  getLastZIndex: function getLastZIndex() {
    return lastZindex;
  },
  // 行主键 key
  getRowkey: function getRowkey($xetable) {
    return $xetable.rowId || '_XID';
  },
  // 行主键 value
  getRowid: function getRowid($xetable, row) {
    var rowId = ctor_amd_xe_utils_default.a.get(row, UtilTools.getRowkey($xetable));
    return rowId ? encodeURIComponent(rowId) : '';
  },
  // 获取所有的列，排除分组
  getColumnList: function getColumnList(columns) {
    var result = [];
    columns.forEach(function (column) {
      result.push.apply(result, _toConsumableArray(column.children && column.children.length ? UtilTools.getColumnList(column.children) : [column]));
    });
    return result;
  },
  getClass: function getClass(property, params) {
    return property ? ctor_amd_xe_utils_default.a.isFunction(property) ? property(params) : property : '';
  },
  getFilters: function getFilters(filters) {
    if (filters && ctor_amd_xe_utils_default.a.isArray(filters)) {
      return filters.map(function (_ref2) {
        var label = _ref2.label,
            value = _ref2.value,
            data = _ref2.data,
            resetValue = _ref2.resetValue,
            checked = _ref2.checked;
        return {
          label: label,
          value: value,
          data: data,
          resetValue: resetValue,
          checked: !!checked,
          _checked: !!checked
        };
      });
    }

    return filters;
  },
  formatText: function formatText(value, placeholder) {
    return '' + (value === '' || value === null || value === undefined ? placeholder ? conf.emptyCell : '' : value);
  },
  getCellValue: function getCellValue(row, column) {
    return ctor_amd_xe_utils_default.a.get(row, column.property);
  },
  getCellLabel: function getCellLabel(row, column, params) {
    var formatter = column.formatter;
    var cellValue = UtilTools.getCellValue(row, column);
    var cellLabel = cellValue;

    if (params && formatter) {
      var rest, formatData;
      var $table = params.$table;
      var colid = column.id;
      var fullAllDataRowMap = $table.fullAllDataRowMap;
      var cacheFormat = fullAllDataRowMap.has(row);
      var formatParams = {
        cellValue: cellValue,
        row: row,
        column: column
      };

      if (cacheFormat) {
        rest = fullAllDataRowMap.get(row);
        formatData = rest.formatData;

        if (!formatData) {
          formatData = fullAllDataRowMap.get(row).formatData = {};
        }

        if (rest && formatData[colid]) {
          if (formatData[colid].value === cellValue) {
            return formatData[colid].label;
          }
        }
      }

      if (ctor_amd_xe_utils_default.a.isString(formatter)) {
        var globalFunc = src_formats.get(formatter);
        cellLabel = globalFunc ? globalFunc(formatParams) : '';
      } else if (ctor_amd_xe_utils_default.a.isArray(formatter)) {
        var _globalFunc2 = src_formats.get(formatter[0]);

        cellLabel = _globalFunc2 ? _globalFunc2.apply(void 0, [formatParams].concat(_toConsumableArray(formatter.slice(1)))) : '';
      } else {
        cellLabel = formatter(formatParams);
      }

      if (formatData) {
        formatData[colid] = {
          value: cellValue,
          label: cellLabel
        };
      }
    }

    return cellLabel;
  },
  setCellValue: function setCellValue(row, column, value) {
    return ctor_amd_xe_utils_default.a.set(row, column.property, value);
  },
  isColumn: function isColumn(column) {
    return column instanceof utils_ColumnInfo;
  },
  getColumnConfig: function getColumnConfig($xetable, _vm, options) {
    return UtilTools.isColumn(_vm) ? _vm : new utils_ColumnInfo($xetable, _vm, options);
  },
  // 组装列配置
  assemColumn: function assemColumn(_vm) {
    var $el = _vm.$el,
        $xetable = _vm.$xetable,
        $xecolumn = _vm.$xecolumn,
        columnConfig = _vm.columnConfig;
    var groupConfig = $xecolumn ? $xecolumn.columnConfig : null;
    columnConfig.slots = _vm.$scopedSlots;

    if (groupConfig) {
      if (false) {}

      if (!groupConfig.children) {
        groupConfig.children = [];
      }

      groupConfig.children.splice([].indexOf.call($xecolumn.$el.children, $el), 0, columnConfig);
    } else {
      $xetable.staticColumns.splice([].indexOf.call($xetable.$refs.hideColumn.children, $el), 0, columnConfig);
    }
  },
  // 销毁列
  destroyColumn: function destroyColumn(_vm) {
    var $xetable = _vm.$xetable,
        columnConfig = _vm.columnConfig;
    var matchObj = ctor_amd_xe_utils_default.a.findTree($xetable.staticColumns, function (column) {
      return column === columnConfig;
    });

    if (matchObj) {
      matchObj.items.splice(matchObj.index, 1);
    }
  },
  hasChildrenList: function hasChildrenList(item) {
    return item && item.children && item.children.length > 0;
  },
  getColMinWidth: function getColMinWidth(_vm, column) {
    var sortOpts = _vm.sortOpts,
        filterOpts = _vm.filterOpts,
        editOpts = _vm.editOpts;
    var type = column.type,
        filters = column.filters,
        sortable = column.sortable,
        remoteSort = column.remoteSort,
        editRender = column.editRender,
        titleHelp = column.titleHelp;
    return 40 + getColFuncWidth(type === 'checkbox', 18) + getColFuncWidth(titleHelp, 18) + getColFuncWidth(filters && filterOpts.showIcon) + getColFuncWidth((sortable || remoteSort) && sortOpts.showIcon) + getColFuncWidth(editRender && editOpts.showIcon, 32);
  },
  parseFile: function parseFile(file) {
    var name = file.name;
    var tIndex = ctor_amd_xe_utils_default.a.lastIndexOf(name, '.');
    var type = name.substring(tIndex + 1, name.length);
    var filename = name.substring(0, tIndex);
    return {
      filename: filename,
      type: type
    };
  }
};
/* harmony default export */ var utils = (UtilTools);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__("4d63");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// CONCATENATED MODULE: ./packages/tools/src/dom.js










var dom_getRowid = utils.getRowid;
var browse = ctor_amd_xe_utils_default.a.browse();
var htmlElem = browse.isDoc ? document.querySelector('html') : 0;
var dom_bodyElem = browse.isDoc ? document.body : 0;
var reClsMap = {};

function getClsRE(cls) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp("(?:^|\\s)".concat(cls, "(?!\\S)"), 'g');
  }

  return reClsMap[cls];
}

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

function isScale(val) {
  return val && /^\d+%$/.test(val);
}

function hasClass(elem, cls) {
  return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls));
}

function removeClass(elem, cls) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), '');
  }
}

function getDomNode() {
  var documentElement = document.documentElement;
  var bodyElem = document.body;
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  };
}

var DomTools = {
  browse: browse,
  isPx: function isPx(val) {
    return val && /^\d+(px)?$/.test(val);
  },
  isScale: isScale,
  hasClass: hasClass,
  removeClass: removeClass,
  addClass: function addClass(elem, cls) {
    if (elem && !hasClass(elem, cls)) {
      removeClass(elem, cls);
      elem.className = "".concat(elem.className, " ").concat(cls);
    }
  },
  updateCellTitle: function updateCellTitle(overflowElem, column) {
    var content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent;

    if (overflowElem.getAttribute('title') !== content) {
      overflowElem.setAttribute('title', content);
    }
  },
  rowToVisible: function rowToVisible($xetable, row) {
    var bodyElem = $xetable.$refs.tableBody.$el;
    var trElem = bodyElem.querySelector("[data-rowid=\"".concat(dom_getRowid($xetable, row), "\"]"));

    if (trElem) {
      var bodyHeight = bodyElem.clientHeight;
      var bodySrcollTop = bodyElem.scrollTop;
      var trOffsetTop = trElem.offsetTop + (trElem.offsetParent ? trElem.offsetParent.offsetTop : 0);
      var trHeight = trElem.clientHeight; // 检测行是否在可视区中

      if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
        // 向上定位
        return $xetable.scrollTo(null, trOffsetTop);
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        // 向下定位
        return $xetable.scrollTo(null, bodySrcollTop + trHeight);
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($xetable.scrollYLoad) {
        return $xetable.scrollTo(null, ($xetable.afterFullData.indexOf(row) - 1) * $xetable.scrollYStore.rowHeight);
      }
    }

    return Promise.resolve();
  },
  colToVisible: function colToVisible($xetable, column) {
    var bodyElem = $xetable.$refs.tableBody.$el;
    var tdElem = bodyElem.querySelector(".".concat(column.id));

    if (tdElem) {
      var bodyWidth = bodyElem.clientWidth;
      var bodySrcollLeft = bodyElem.scrollLeft;
      var tdOffsetLeft = tdElem.offsetLeft + (tdElem.offsetParent ? tdElem.offsetParent.offsetLeft : 0);
      var tdWidth = tdElem.clientWidth; // 检测行是否在可视区中

      if (tdOffsetLeft < bodySrcollLeft || tdOffsetLeft > bodySrcollLeft + bodyWidth) {
        // 向左定位
        return $xetable.scrollTo(tdOffsetLeft);
      } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
        // 向右定位
        return $xetable.scrollTo(bodySrcollLeft + tdWidth);
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($xetable.scrollXLoad) {
        var visibleColumn = $xetable.visibleColumn;
        var scrollLeft = 0;

        for (var index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index] === column) {
            break;
          }

          scrollLeft += visibleColumn[index].renderWidth;
        }

        return $xetable.scrollTo(scrollLeft);
      }
    }

    return Promise.resolve();
  },
  getDomNode: getDomNode,

  /**
   * 检查触发源是否属于目标节点
   */
  getEventTargetNode: function getEventTargetNode(evnt, container, queryCls, queryMethod) {
    var targetElem;
    var target = evnt.target;

    while (target && target.nodeType && target !== document) {
      if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
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
    var boundingTop = bounding.top;
    var boundingLeft = bounding.left;

    var _getDomNode = getDomNode(),
        scrollTop = _getDomNode.scrollTop,
        scrollLeft = _getDomNode.scrollLeft,
        visibleHeight = _getDomNode.visibleHeight,
        visibleWidth = _getDomNode.visibleWidth;

    return {
      boundingTop: boundingTop,
      top: scrollTop + boundingTop,
      boundingLeft: boundingLeft,
      left: scrollLeft + boundingLeft,
      visibleHeight: visibleHeight,
      visibleWidth: visibleWidth
    };
  },
  toView: function toView(elem) {
    var scrollIntoViewIfNeeded = 'scrollIntoViewIfNeeded';
    var scrollIntoView = 'scrollIntoView';

    if (elem) {
      if (elem[scrollIntoViewIfNeeded]) {
        elem[scrollIntoViewIfNeeded]();
      } else if (elem[scrollIntoView]) {
        elem[scrollIntoView]();
      }
    }
  },
  triggerEvent: function triggerEvent(targetElem, type) {
    var evnt;

    if (typeof Event === 'function') {
      evnt = new Event(type);
    } else {
      evnt = document.createEvent('Event');
      evnt.initEvent(type, true, true);
    }

    targetElem.dispatchEvent(evnt);
  },
  calcHeight: function calcHeight($xetable, key) {
    var val = $xetable[key];
    var num = 0;

    if (val) {
      if (val === 'auto') {
        num = $xetable.parentHeight;
      } else {
        var excludeHeight = $xetable.getExcludeHeight();

        if (isScale(val)) {
          num = Math.floor((ctor_amd_xe_utils_default.a.toInteger(val) || 1) / 100 * $xetable.parentHeight);
        } else {
          num = ctor_amd_xe_utils_default.a.toNumber(val);
        }

        num = Math.max(40, num - excludeHeight);
      }
    }

    return num;
  }
};
/* harmony default export */ var dom = (DomTools);
// CONCATENATED MODULE: ./packages/tools/src/event.js


 // 监听全局事件

var event_browse = dom.browse;
var wheelName = event_browse.firefox ? 'DOMMouseScroll' : 'mousewheel';
var eventStore = [];
var GlobalEvent = {
  on: function on(comp, type, cb) {
    if (cb) {
      eventStore.push({
        comp: comp,
        type: type,
        cb: cb
      });
    }
  },
  off: function off(comp, type) {
    ctor_amd_xe_utils_default.a.remove(eventStore, function (item) {
      return item.comp === comp && item.type === type;
    });
  },
  trigger: function trigger(evnt) {
    var isWheel = evnt.type === wheelName;
    eventStore.forEach(function (_ref) {
      var comp = _ref.comp,
          type = _ref.type,
          cb = _ref.cb;

      if (type === evnt.type || isWheel && type === 'mousewheel') {
        cb.call(comp, evnt);
      }
    });
  }
};

if (event_browse.isDoc) {
  if (!event_browse.msie) {
    document.addEventListener('copy', GlobalEvent.trigger, false);
    document.addEventListener('cut', GlobalEvent.trigger, false);
    document.addEventListener('paste', GlobalEvent.trigger, false);
  }

  document.addEventListener('keydown', GlobalEvent.trigger, false);
  document.addEventListener('contextmenu', GlobalEvent.trigger, false);
  window.addEventListener('mousedown', GlobalEvent.trigger, false);
  window.addEventListener('blur', GlobalEvent.trigger, false);
  window.addEventListener('resize', GlobalEvent.trigger, false);
  window.addEventListener(wheelName, ctor_amd_xe_utils_default.a.throttle(GlobalEvent.trigger, 100, {
    leading: true,
    trailing: false
  }), false);
}

/* harmony default export */ var src_event = (GlobalEvent);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.some.js
var es_array_some = __webpack_require__("45fc");

// CONCATENATED MODULE: ./packages/tools/src/resize.js









/**
 * 监听 resize 事件
 * 如果项目中已使用了 resize-observer-polyfill，那么只需要将方法定义全局，该组件就会自动使用
 */

var resizeTimeout;
var resize_eventStore = [];
var defaultInterval = 500;

function eventHandle() {
  if (resize_eventStore.length) {
    resize_eventStore.forEach(function (item) {
      item.tarList.forEach(function (observer) {
        var target = observer.target,
            width = observer.width,
            heighe = observer.heighe;
        var clientWidth = target.clientWidth;
        var clientHeight = target.clientHeight;
        var rWidth = clientWidth && width !== clientWidth;
        var rHeight = clientHeight && heighe !== clientHeight;

        if (rWidth || rHeight) {
          observer.width = clientWidth;
          observer.heighe = clientHeight;
          requestAnimationFrame(item.callback);
        }
      });
    });
    /* eslint-disable @typescript-eslint/no-use-before-define */

    eventListener();
  }
}

function eventListener() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(eventHandle, conf.resizeInterval || defaultInterval);
}

var resize_ResizeObserverPolyfill = /*#__PURE__*/function () {
  function ResizeObserverPolyfill(callback) {
    _classCallCheck(this, ResizeObserverPolyfill);

    this.tarList = [];
    this.callback = callback;
  }

  _createClass(ResizeObserverPolyfill, [{
    key: "observe",
    value: function observe(target) {
      var _this = this;

      if (target) {
        if (this.tarList.indexOf(target) === -1) {
          this.tarList.push({
            target: target,
            width: target.clientWidth,
            heighe: target.clientHeight
          });
        }

        if (!resize_eventStore.length) {
          eventListener();
        }

        if (!resize_eventStore.some(function (item) {
          return item === _this;
        })) {
          resize_eventStore.push(this);
        }
      }
    }
  }, {
    key: "unobserve",
    value: function unobserve(target) {
      ctor_amd_xe_utils_default.a.remove(resize_eventStore, function (item) {
        return item.tarList.indexOf(target) > -1;
      });
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this2 = this;

      ctor_amd_xe_utils_default.a.remove(resize_eventStore, function (item) {
        return item === _this2;
      });
    }
  }]);

  return ResizeObserverPolyfill;
}();

var ResizeEvent = dom.browse.isDoc ? window.ResizeObserver || resize_ResizeObserverPolyfill : resize_ResizeObserverPolyfill;
/* harmony default export */ var src_resize = (ResizeEvent);
// CONCATENATED MODULE: ./packages/tools/index.js








/* harmony default export */ var tools = ({
  UtilTools: utils,
  DomTools: dom,
  GlobalEvent: src_event,
  ResizeEvent: src_resize
});
// CONCATENATED MODULE: ./packages/v-x-e-table/src/renderer.js












var inputEventTypes = ['input', 'textarea', '$input', '$textarea'];
var defaultCompProps = {
  transfer: true
};

function isEmptyValue(cellValue) {
  return cellValue === null || cellValue === undefined || cellValue === '';
}

function getChangeEvent(renderOpts) {
  return inputEventTypes.indexOf(renderOpts.name) > -1 ? 'input' : 'change';
}

function parseDate(value, props) {
  return value && props.valueFormat ? ctor_amd_xe_utils_default.a.toStringDate(value, props.valueFormat) : value;
}

function getFormatDate(value, props, defaultFormat) {
  var _props$dateConfig = props.dateConfig,
      dateConfig = _props$dateConfig === void 0 ? {} : _props$dateConfig;
  return ctor_amd_xe_utils_default.a.toDateString(parseDate(value, props), dateConfig.labelFormat || defaultFormat);
}

function getLabelFormatDate(value, props) {
  return getFormatDate(value, props, conf.i18n("vxe.input.date.labelFormat.".concat(props.type)));
}

function getDefaultComponentName(_ref) {
  var name = _ref.name;
  return "vxe-".concat(name.replace('$', ''));
}

function handleConfirmFilter(params, checked, option) {
  var $panel = params.$panel;
  $panel.changeOption({}, checked, option);
}

function getNativeAttrs(_ref2) {
  var name = _ref2.name,
      attrs = _ref2.attrs;

  if (name === 'input') {
    attrs = Object.assign({
      type: 'text'
    }, attrs);
  }

  return attrs;
}

function getCellEditFilterProps(renderOpts, params, value, defaultProps) {
  var vSize = params.$table.vSize;
  return ctor_amd_xe_utils_default.a.assign(vSize ? {
    size: vSize
  } : {}, defaultCompProps, defaultProps, renderOpts.props, {
    value: value
  });
}

function getItemProps(renderOpts, params, value, defaultProps) {
  var vSize = params.$form.vSize;
  return ctor_amd_xe_utils_default.a.assign(vSize ? {
    size: vSize
  } : {}, defaultCompProps, defaultProps, renderOpts.props, {
    value: value
  });
}

function getNativeOns(renderOpts, params) {
  var nativeEvents = renderOpts.nativeEvents;
  var nativeOns = {};
  ctor_amd_xe_utils_default.a.objectEach(nativeEvents, function (func, key) {
    nativeOns[key] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      func.apply(void 0, [params].concat(args));
    };
  });
  return nativeOns;
}

function getOns(renderOpts, params, inputFunc, changeFunc) {
  var events = renderOpts.events;
  var modelEvent = 'input';
  var changeEvent = getChangeEvent(renderOpts);
  var isSameEvent = changeEvent === modelEvent;
  var ons = {};
  ctor_amd_xe_utils_default.a.objectEach(events, function (func, key) {
    ons[key] = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      func.apply(void 0, [params].concat(args));
    };
  });

  if (inputFunc) {
    ons[modelEvent] = function (targetEvnt) {
      inputFunc(targetEvnt);

      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt);
      }

      if (isSameEvent && changeFunc) {
        changeFunc(targetEvnt);
      }
    };
  }

  if (!isSameEvent && changeFunc) {
    ons[changeEvent] = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      changeFunc.apply(void 0, args);

      if (events && events[changeEvent]) {
        events[changeEvent].apply(events, [params].concat(args));
      }
    };
  }

  return ons;
}

function getEditOns(renderOpts, params) {
  var $table = params.$table,
      row = params.row,
      column = params.column;
  return getOns(renderOpts, params, function (value) {
    // 处理 model 值双向绑定
    ctor_amd_xe_utils_default.a.set(row, column.property, value);
  }, function () {
    // 处理 change 事件相关逻辑
    $table.updateStatus(params);
  });
}

function getFilterOns(renderOpts, params, option) {
  return getOns(renderOpts, params, function (value) {
    // 处理 model 值双向绑定
    option.data = value;
  }, function () {
    handleConfirmFilter(params, !ctor_amd_xe_utils_default.a.eqNull(option.data), option);
  });
}

function getItemOns(renderOpts, params) {
  var $form = params.$form,
      data = params.data,
      property = params.property;
  return getOns(renderOpts, params, function (value) {
    // 处理 model 值双向绑定
    ctor_amd_xe_utils_default.a.set(data, property, value);
  }, function () {
    // 处理 change 事件相关逻辑
    $form.updateStatus(params);
  });
}

function isSyncCell(renderOpts, params) {
  return renderOpts.immediate || params.$type === 'cell';
}

function getNativeEditOns(renderOpts, params) {
  var $table = params.$table,
      row = params.row,
      column = params.column;
  var model = column.model;
  return getOns(renderOpts, params, function (evnt) {
    // 处理 model 值双向绑定
    var cellValue = evnt.target.value;

    if (isSyncCell(renderOpts, params)) {
      UtilTools.setCellValue(row, column, cellValue);
    } else {
      model.update = true;
      model.value = cellValue;
    }
  }, function (evnt) {
    // 处理 change 事件相关逻辑
    var cellValue = evnt.target.value;
    $table.updateStatus(params, cellValue);
  });
}

function getNativeFilterOns(renderOpts, params, option) {
  return getOns(renderOpts, params, function (evnt) {
    // 处理 model 值双向绑定
    option.data = evnt.target.value;
  }, function () {
    handleConfirmFilter(params, !ctor_amd_xe_utils_default.a.eqNull(option.data), option);
  });
}

function getNativeItemOns(renderOpts, params) {
  var $form = params.$form,
      data = params.data,
      property = params.property;
  return getOns(renderOpts, params, function (evnt) {
    // 处理 model 值双向绑定
    var itemValue = evnt.target.value;
    ctor_amd_xe_utils_default.a.set(data, property, itemValue);
  }, function () {
    // 处理 change 事件相关逻辑
    $form.updateStatus(params);
  });
}
/**
 * 单元格可编辑渲染-原生的标签
 * input、textarea、select
 */


function nativeEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);
  var cellValue = isSyncCell(renderOpts, params) ? UtilTools.getCellValue(row, column) : column.model.value;
  return [h(name, {
    class: "vxe-default-".concat(name),
    attrs: attrs,
    domProps: {
      value: cellValue
    },
    on: getNativeEditOns(renderOpts, params)
  })];
}

function defaultEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;
  var cellValue = UtilTools.getCellValue(row, column);
  return [h(getDefaultComponentName(renderOpts), {
    props: getCellEditFilterProps(renderOpts, params, cellValue),
    on: getEditOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  })];
}

function defaultButtonEditRender(h, renderOpts, params) {
  return [h('vxe-button', {
    props: getCellEditFilterProps(renderOpts, params),
    on: getOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  })];
}

function defaultButtonsEditRender(h, renderOpts, params) {
  return renderOpts.children.map(function (childRenderOpts) {
    return defaultButtonEditRender(h, childRenderOpts, params)[0];
  });
}

function renderNativeOptgroups(h, renderOpts, params, renderOptionsMethods) {
  var optionGroups = renderOpts.optionGroups,
      _renderOpts$optionGro = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro === void 0 ? {} : _renderOpts$optionGro;
  var groupOptions = optionGroupProps.options || 'options';
  var groupLabel = optionGroupProps.label || 'label';
  return optionGroups.map(function (group, gIndex) {
    return h('optgroup', {
      key: gIndex,
      domProps: {
        label: group[groupLabel]
      }
    }, renderOptionsMethods(h, group[groupOptions], renderOpts, params));
  });
}
/**
 * 渲染原生的 option 标签
 */


function renderNativeOptions(h, options, renderOpts, params) {
  var _renderOpts$optionPro = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro === void 0 ? {} : _renderOpts$optionPro;
  var row = params.row,
      column = params.column;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';
  var cellValue = isSyncCell(renderOpts, params) ? UtilTools.getCellValue(row, column) : column.model.value;
  return options.map(function (option, oIndex) {
    return h('option', {
      key: oIndex,
      attrs: {
        value: option[valueProp],
        disabled: option[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: option[valueProp] == cellValue
      }
    }, option[labelProp]);
  });
}

function nativeFilterRender(h, renderOpts, params) {
  var column = params.column;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);
  return column.filters.map(function (option, oIndex) {
    return h(name, {
      key: oIndex,
      class: "vxe-default-".concat(name),
      attrs: attrs,
      domProps: {
        value: option.data
      },
      on: getNativeFilterOns(renderOpts, params, option)
    });
  });
}

function defaultFilterRender(h, renderOpts, params) {
  var column = params.column;
  return column.filters.map(function (option, oIndex) {
    var optionValue = option.data;
    return h(getDefaultComponentName(renderOpts), {
      key: oIndex,
      props: getCellEditFilterProps(renderOpts, renderOpts, optionValue),
      on: getFilterOns(renderOpts, params, option)
    });
  });
}

function handleFilterMethod(_ref3) {
  var option = _ref3.option,
      row = _ref3.row,
      column = _ref3.column;
  var data = option.data;
  var cellValue = ctor_amd_xe_utils_default.a.get(row, column.property);
  /* eslint-disable eqeqeq */

  return cellValue == data;
}

function nativeSelectEditRender(h, renderOpts, params) {
  return [h('select', {
    class: 'vxe-default-select',
    attrs: getNativeAttrs(renderOpts),
    on: getNativeEditOns(renderOpts, params)
  }, renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params))];
}

function defaultSelectEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;
  var options = renderOpts.options,
      optionProps = renderOpts.optionProps,
      optionGroups = renderOpts.optionGroups,
      optionGroupProps = renderOpts.optionGroupProps;
  var cellValue = UtilTools.getCellValue(row, column);
  return [h(getDefaultComponentName(renderOpts), {
    props: getCellEditFilterProps(renderOpts, params, cellValue, {
      options: options,
      optionProps: optionProps,
      optionGroups: optionGroups,
      optionGroupProps: optionGroupProps
    }),
    on: getEditOns(renderOpts, params)
  })];
}

function getSelectCellValue(renderOpts, _ref4) {
  var row = _ref4.row,
      column = _ref4.column;
  var _renderOpts$props = renderOpts.props,
      props = _renderOpts$props === void 0 ? {} : _renderOpts$props,
      options = renderOpts.options,
      optionGroups = renderOpts.optionGroups,
      _renderOpts$optionPro2 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro2 === void 0 ? {} : _renderOpts$optionPro2,
      _renderOpts$optionGro2 = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro2 === void 0 ? {} : _renderOpts$optionGro2;
  var cellValue = ctor_amd_xe_utils_default.a.get(row, column.property);
  var selectItem;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';

  if (!isEmptyValue(cellValue)) {
    return ctor_amd_xe_utils_default.a.map(props.multiple ? cellValue : [cellValue], optionGroups ? function (value) {
      var groupOptions = optionGroupProps.options || 'options';

      for (var index = 0; index < optionGroups.length; index++) {
        /* eslint-disable eqeqeq */
        selectItem = ctor_amd_xe_utils_default.a.find(optionGroups[index][groupOptions], function (item) {
          return item[valueProp] == value;
        });

        if (selectItem) {
          break;
        }
      }

      return selectItem ? selectItem[labelProp] : value;
    } : function (value) {
      /* eslint-disable eqeqeq */
      selectItem = ctor_amd_xe_utils_default.a.find(options, function (item) {
        return item[valueProp] == value;
      });
      return selectItem ? selectItem[labelProp] : value;
    }).join(', ');
  }

  return null;
}
/**
 * 渲染表单-项
 * 用于渲染原生的标签
 */


function nativeItemRender(h, renderOpts, params) {
  var data = params.data,
      property = params.property;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);
  var itemValue = ctor_amd_xe_utils_default.a.get(data, property);
  return [h(name, {
    class: "vxe-default-".concat(name),
    attrs: attrs,
    domProps: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : {
      value: itemValue
    },
    on: getNativeItemOns(renderOpts, params)
  })];
}

function defaultItemRender(h, renderOpts, params) {
  var data = params.data,
      property = params.property;
  var itemValue = ctor_amd_xe_utils_default.a.get(data, property);
  return [h(getDefaultComponentName(renderOpts), {
    props: getItemProps(renderOpts, params, itemValue),
    on: getItemOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  })];
}

function defaultButtonItemRender(h, renderOpts, params) {
  return [h('vxe-button', {
    props: getItemProps(renderOpts, params),
    on: getOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  })];
}

function defaultButtonsItemRender(h, renderOpts, params) {
  return renderOpts.children.map(function (childRenderOpts) {
    return defaultButtonItemRender(h, childRenderOpts, params)[0];
  });
}
/**
 * 渲染原生的 select 标签
 */


function renderNativeFormOptions(h, options, renderOpts, params) {
  var data = params.data,
      property = params.property;
  var _renderOpts$optionPro3 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro3 === void 0 ? {} : _renderOpts$optionPro3;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';
  var cellValue = ctor_amd_xe_utils_default.a.get(data, property);
  return options.map(function (item, oIndex) {
    return h('option', {
      key: oIndex,
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: item[valueProp] == cellValue
      }
    }, item[labelProp]);
  });
}

function handleExportSelectMethod(params) {
  var column = params.column;
  return getSelectCellValue(column.editRender || column.cellRender, params);
}
/**
 * 渲染表单-项中
 * 单选框和复选框
 */


function defaultFormItemRadioAndCheckboxRender(h, renderOpts, params) {
  var options = renderOpts.options,
      _renderOpts$optionPro4 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro4 === void 0 ? {} : _renderOpts$optionPro4;
  var data = params.data,
      property = params.property;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';
  var itemValue = ctor_amd_xe_utils_default.a.get(data, property);
  var name = getDefaultComponentName(renderOpts);
  return [h("".concat(name, "-group"), {
    props: getItemProps(renderOpts, params, itemValue),
    on: getItemOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  }, options.map(function (item, index) {
    return h(name, {
      key: index,
      props: {
        label: item[valueProp],
        content: item[labelProp],
        disabled: item[disabledProp]
      }
    });
  }))];
}
/**
 * 内置的组件渲染
 */


var renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: nativeEditRender,
    renderDefault: nativeEditRender,
    renderFilter: nativeFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: nativeItemRender
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: nativeEditRender,
    renderItem: nativeItemRender
  },
  select: {
    renderEdit: nativeSelectEditRender,
    renderDefault: nativeSelectEditRender,
    renderCell: function renderCell(h, renderOpts, params) {
      return getSelectCellValue(renderOpts, params);
    },
    renderFilter: function renderFilter(h, renderOpts, params) {
      var column = params.column;
      return column.filters.map(function (option, oIndex) {
        return h('select', {
          key: oIndex,
          class: 'vxe-default-select',
          attrs: getNativeAttrs(renderOpts),
          on: getNativeFilterOns(renderOpts, params, option)
        }, renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params));
      });
    },
    filterMethod: handleFilterMethod,
    renderItem: function renderItem(h, renderOpts, params) {
      return [h('select', {
        class: 'vxe-default-select',
        attrs: getNativeAttrs(renderOpts),
        on: getNativeItemOns(renderOpts, params)
      }, renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeFormOptions) : renderNativeFormOptions(h, renderOpts.options, renderOpts, params))];
    },
    cellExportMethod: handleExportSelectMethod
  },
  $input: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultEditRender,
    renderCell: function renderCell(h, renderOpts, params) {
      var _renderOpts$props2 = renderOpts.props,
          props = _renderOpts$props2 === void 0 ? {} : _renderOpts$props2;
      var row = params.row,
          column = params.column;
      var digits = props.digits || conf.input.digits;
      var cellValue = ctor_amd_xe_utils_default.a.get(row, column.property);

      if (cellValue) {
        switch (props.type) {
          case 'date':
          case 'week':
          case 'month':
          case 'year':
            cellValue = getLabelFormatDate(cellValue, props);
            break;

          case 'float':
            cellValue = ctor_amd_xe_utils_default.a.toFixed(ctor_amd_xe_utils_default.a.floor(cellValue, digits), digits);
            break;
        }
      }

      return cellValue;
    },
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: defaultItemRender
  },
  $textarea: {
    autofocus: '.vxe-textarea--inner',
    renderItem: defaultItemRender
  },
  $button: {
    renderDefault: defaultButtonEditRender,
    renderItem: defaultButtonItemRender
  },
  $buttons: {
    renderDefault: defaultButtonsEditRender,
    renderItem: defaultButtonsItemRender
  },
  $select: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultSelectEditRender,
    renderDefault: defaultSelectEditRender,
    renderCell: function renderCell(h, renderOpts, params) {
      return getSelectCellValue(renderOpts, params);
    },
    renderFilter: function renderFilter(h, renderOpts, params) {
      var column = params.column;
      var options = renderOpts.options,
          optionProps = renderOpts.optionProps,
          optionGroups = renderOpts.optionGroups,
          optionGroupProps = renderOpts.optionGroupProps;
      var nativeOn = getNativeOns(renderOpts, params);
      return column.filters.map(function (option, oIndex) {
        var optionValue = option.data;
        return h(getDefaultComponentName(renderOpts), {
          key: oIndex,
          props: getCellEditFilterProps(renderOpts, params, optionValue, {
            options: options,
            optionProps: optionProps,
            optionGroups: optionGroups,
            optionGroupProps: optionGroupProps
          }),
          on: getFilterOns(renderOpts, params, option),
          nativeOn: nativeOn
        });
      });
    },
    filterMethod: handleFilterMethod,
    renderItem: function renderItem(h, renderOpts, params) {
      var data = params.data,
          property = params.property;
      var options = renderOpts.options,
          optionProps = renderOpts.optionProps,
          optionGroups = renderOpts.optionGroups,
          optionGroupProps = renderOpts.optionGroupProps;
      var itemValue = ctor_amd_xe_utils_default.a.get(data, property);
      return [h(getDefaultComponentName(renderOpts), {
        props: getItemProps(renderOpts, params, itemValue, {
          options: options,
          optionProps: optionProps,
          optionGroups: optionGroups,
          optionGroupProps: optionGroupProps
        }),
        on: getItemOns(renderOpts, params),
        nativeOn: getNativeOns(renderOpts, params)
      })];
    },
    cellExportMethod: handleExportSelectMethod
  },
  $radio: {
    autofocus: '.vxe-radio--input',
    renderItem: defaultFormItemRadioAndCheckboxRender
  },
  $checkbox: {
    autofocus: '.vxe-checkbox--input',
    renderItem: defaultFormItemRadioAndCheckboxRender
  },
  $switch: {
    autofocus: '.vxe-switch--button',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderItem: defaultItemRender
  }
};
/**
 * 全局渲染器
 */

var renderer = {
  mixin: function mixin(map) {
    ctor_amd_xe_utils_default.a.each(map, function (options, name) {
      return renderer.add(name, options);
    });
    return renderer;
  },
  get: function get(name) {
    return renderMap[name] || null;
  },
  add: function add(name, options) {
    if (name && options) {
      var renders = renderMap[name];

      if (renders) {
        Object.assign(renders, options);
      } else {
        renderMap[name] = options;
      }
    }

    return renderer;
  },
  delete: function _delete(name) {
    delete renderMap[name];
    return renderer;
  }
};
/* harmony default export */ var src_renderer = (renderer);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/commands.js

var commands = new store();
/* harmony default export */ var src_commands = (commands);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/menus.js

var menus = new store();
/* harmony default export */ var src_menus = (menus);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/setup.js


/**
 * 全局参数设置
 */

function setup(options) {
  return ctor_amd_xe_utils_default.a.merge(conf, options);
}

/* harmony default export */ var src_setup = (setup);
// CONCATENATED MODULE: ./packages/v-x-e-table/index.js










var installedPlugins = [];

function use(Plugin, options) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(VXETable, options);
      installedPlugins.push(Plugin);
    }
  }

  return VXETable;
}
/**
 * 检测模块的安装顺序是否正确
 */


function reg(key) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (VXETable.Table) {
    UtilTools.error('vxe.error.useErr', [key]);
  }

  VXETable["_".concat(key)] = 1;
}

var VXETable = {
  t: function t(key, args) {
    return conf.i18n(key, args);
  },
  v: 'v3',
  reg: reg,
  use: use,
  setup: src_setup,
  interceptor: src_interceptor,
  renderer: src_renderer,
  commands: src_commands,
  formats: src_formats,
  menus: src_menus
};
/**
 * 获取当前的 zIndex
 */

Object.defineProperty(VXETable, 'zIndex', {
  get: UtilTools.getLastZIndex
});
/**
 * 获取下一个 zIndex
 */

Object.defineProperty(VXETable, 'nextZIndex', {
  get: UtilTools.nextZIndex
});

function getExportOrImpotType(types, flag) {
  var rest = [];
  ctor_amd_xe_utils_default.a.objectEach(types, function (val, type) {
    if (val === 0 || val === flag) {
      rest.push(type);
    }
  });
  return rest;
}
/**
 * 获取所有导出类型
 */


Object.defineProperty(VXETable, 'exportTypes', {
  get: function get() {
    return getExportOrImpotType(conf.export.types, 1);
  }
});
/**
 * 获取所有导入类型
 */

Object.defineProperty(VXETable, 'importTypes', {
  get: function get() {
    return getExportOrImpotType(conf.export.types, 2);
  }
});
/* harmony default export */ var v_x_e_table = (VXETable);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.every.js
var es_array_every = __webpack_require__("a623");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.map.js
var es_map = __webpack_require__("4ec9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
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
// CONCATENATED MODULE: ./packages/table/src/body.js














var cellType = 'body';
var lineOffsetSizes = {
  mini: 3,
  small: 2,
  medium: 1
}; // 滚动、拖动过程中不需要触发

function isOperateMouse($xetable) {
  return $xetable._isResize || $xetable.lastScrollTime && Date.now() < $xetable.lastScrollTime + $xetable.delayHover;
}

function countTreeExpand(prevRow, params) {
  var $table = params.$table;
  var rowChildren = prevRow[$table.treeOpts.children];
  var count = 1;

  if ($table.isTreeExpandByRow(prevRow)) {
    for (var index = 0; index < rowChildren.length; index++) {
      count += countTreeExpand(rowChildren[index], params);
    }
  }

  return count;
}

function getOffsetSize($xetable) {
  return lineOffsetSizes[$xetable.vSize] || 0;
}

function calcTreeLine(params, items) {
  var $table = params.$table,
      $rowIndex = params.$rowIndex;
  var expandSize = 1;

  if ($rowIndex) {
    expandSize = countTreeExpand(items[$rowIndex - 1], params);
  }

  return $table.rowHeight * expandSize - ($rowIndex ? 1 : 12 - getOffsetSize($table));
}

function renderLine(h, _vm, $xetable, rowLevel, items, params) {
  var column = params.column;
  var treeOpts = $xetable.treeOpts,
      treeConfig = $xetable.treeConfig;
  var slots = column.slots,
      treeNode = column.treeNode;

  if (slots && slots.line) {
    return slots.line.call($xetable, params, h);
  }

  if (treeConfig && treeNode && treeOpts.line) {
    return [h('div', {
      class: 'vxe-tree--line-wrapper'
    }, [h('div', {
      class: 'vxe-tree--line',
      style: {
        height: "".concat(calcTreeLine(params, items), "px"),
        left: "".concat(rowLevel * treeOpts.indent + (rowLevel ? 2 - getOffsetSize($xetable) : 0) + 16, "px")
      }
    })])];
  }

  return [];
}

function mergeMethod(mergeList, _rowIndex, _columnIndex) {
  for (var mIndex = 0; mIndex < mergeList.length; mIndex++) {
    var _mergeList$mIndex = mergeList[mIndex],
        mergeRowIndex = _mergeList$mIndex.row,
        mergeColIndex = _mergeList$mIndex.col,
        mergeRowspan = _mergeList$mIndex.rowspan,
        mergeColspan = _mergeList$mIndex.colspan;

    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return {
          rowspan: mergeRowspan,
          colspan: mergeColspan
        };
      }

      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
}
/**
 * 渲染列
 */


function renderColumn(h, _vm, $xetable, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, columns, items) {
  var _ref2;

  var tableListeners = $xetable.$listeners,
      afterFullData = $xetable.afterFullData,
      tableData = $xetable.tableData,
      height = $xetable.height,
      columnKey = $xetable.columnKey,
      overflowX = $xetable.overflowX,
      scrollXLoad = $xetable.scrollXLoad,
      scrollYLoad = $xetable.scrollYLoad,
      highlightCurrentRow = $xetable.highlightCurrentRow,
      allColumnOverflow = $xetable.showOverflow,
      allAlign = $xetable.align,
      currentColumn = $xetable.currentColumn,
      cellClassName = $xetable.cellClassName,
      cellStyle = $xetable.cellStyle,
      mergeList = $xetable.mergeList,
      spanMethod = $xetable.spanMethod,
      radioOpts = $xetable.radioOpts,
      checkboxOpts = $xetable.checkboxOpts,
      expandOpts = $xetable.expandOpts,
      treeOpts = $xetable.treeOpts,
      tooltipOpts = $xetable.tooltipOpts,
      mouseConfig = $xetable.mouseConfig,
      editConfig = $xetable.editConfig,
      editOpts = $xetable.editOpts,
      editRules = $xetable.editRules,
      validOpts = $xetable.validOpts,
      editStore = $xetable.editStore,
      validStore = $xetable.validStore;
  var type = column.type,
      cellRender = column.cellRender,
      editRender = column.editRender,
      align = column.align,
      showOverflow = column.showOverflow,
      className = column.className,
      treeNode = column.treeNode;
  var actived = editStore.actived;
  var enabled = tooltipOpts.enabled;
  var columnIndex = $xetable.getColumnIndex(column);

  var _columnIndex = $xetable._getColumnIndex(column);

  var fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX;
  var cellOverflow = ctor_amd_xe_utils_default.a.isUndefined(showOverflow) || ctor_amd_xe_utils_default.a.isNull(showOverflow) ? allColumnOverflow : showOverflow;
  var showEllipsis = cellOverflow === 'ellipsis';
  var showTitle = cellOverflow === 'title';
  var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
  var hasEllipsis = showTitle || showTooltip || showEllipsis;
  var isDirty;
  var tdOns = {};
  var cellAlign = align || allAlign;
  var hasValidError = validStore.row === row && validStore.column === column;
  var hasDefaultTip = editRules && (validOpts.message === 'default' ? height || tableData.length > 1 : validOpts.message === 'inline');
  var attrs = {
    'data-colid': column.id
  };
  var bindMouseenter = tableListeners['cell-mouseenter'];
  var bindMouseleave = tableListeners['cell-mouseleave'];
  var triggerDblclick = editRender && editConfig && editOpts.trigger === 'dblclick';
  var params = {
    $table: $xetable,
    $seq: $seq,
    seq: seq,
    rowid: rowid,
    row: row,
    rowIndex: rowIndex,
    $rowIndex: $rowIndex,
    _rowIndex: _rowIndex,
    column: column,
    columnIndex: columnIndex,
    $columnIndex: $columnIndex,
    _columnIndex: _columnIndex,
    fixed: fixedType,
    type: cellType,
    isHidden: fixedHiddenColumn,
    level: rowLevel,
    visibleData: afterFullData,
    data: tableData,
    items: items
  }; // 虚拟滚动不支持动态高度

  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true;
  } // hover 进入事件


  if (showTitle || showTooltip || enabled || bindMouseenter) {
    tdOns.mouseenter = function (evnt) {
      if (isOperateMouse($xetable)) {
        return;
      }

      if (showTitle) {
        DomTools.updateCellTitle(evnt.currentTarget, column);
      } else if (showTooltip || enabled) {
        // 如果配置了显示 tooltip
        $xetable.triggerBodyTooltipEvent(evnt, params);
      }

      if (bindMouseenter) {
        $xetable.emitEvent('cell-mouseenter', Object.assign({
          cell: evnt.currentTarget
        }, params), evnt);
      }
    };
  } // hover 退出事件


  if (showTooltip || enabled || bindMouseleave) {
    tdOns.mouseleave = function (evnt) {
      if (isOperateMouse($xetable)) {
        return;
      }

      if (showTooltip || enabled) {
        $xetable.handleTargetLeaveEvent(evnt);
      }

      if (bindMouseleave) {
        $xetable.emitEvent('cell-mouseleave', Object.assign({
          cell: evnt.currentTarget
        }, params), evnt);
      }
    };
  } // 按下事件处理


  if (checkboxOpts.range || mouseConfig) {
    tdOns.mousedown = function (evnt) {
      $xetable.triggerCellMousedownEvent(evnt, params);
    };
  } // 点击事件处理


  if (highlightCurrentRow || tableListeners['cell-click'] || editRender && editConfig || expandOpts.trigger === 'row' || expandOpts.trigger === 'cell' || radioOpts.trigger === 'row' || column.type === 'radio' && radioOpts.trigger === 'cell' || checkboxOpts.trigger === 'row' || column.type === 'checkbox' && checkboxOpts.trigger === 'cell' || treeOpts.trigger === 'row' || column.treeNode && treeOpts.trigger === 'cell') {
    tdOns.click = function (evnt) {
      $xetable.triggerCellClickEvent(evnt, params);
    };
  } // 双击事件处理


  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = function (evnt) {
      $xetable.triggerCellDBLClickEvent(evnt, params);
    };
  } // 合并行或列


  if (mergeList.length) {
    var spanRest = mergeMethod(mergeList, _rowIndex, _columnIndex);

    if (spanRest) {
      var rowspan = spanRest.rowspan,
          colspan = spanRest.colspan;

      if (!rowspan || !colspan) {
        return null;
      }

      if (rowspan > 1) {
        attrs.rowspan = rowspan;
      }

      if (colspan > 1) {
        attrs.colspan = colspan;
      }
    }
  } else if (spanMethod) {
    // 自定义合并行或列的方法
    var _ref = spanMethod(params) || {},
        _ref$rowspan = _ref.rowspan,
        _rowspan = _ref$rowspan === void 0 ? 1 : _ref$rowspan,
        _ref$colspan = _ref.colspan,
        _colspan = _ref$colspan === void 0 ? 1 : _ref$colspan;

    if (!_rowspan || !_colspan) {
      return null;
    }

    if (_rowspan > 1) {
      attrs.rowspan = _rowspan;
    }

    if (_colspan > 1) {
      attrs.colspan = _colspan;
    }
  } // 如果被合并不可隐藏


  if (fixedHiddenColumn && mergeList) {
    if (attrs.colspan > 1 || attrs.rowspan > 1) {
      fixedHiddenColumn = false;
    }
  } // 如果编辑列开启显示状态


  if (!fixedHiddenColumn && editConfig && (editRender || cellRender) && editOpts.showStatus) {
    isDirty = $xetable.isUpdateByRow(row, column.property);
  }

  var tdVNs = [];

  if (allColumnOverflow && fixedHiddenColumn) {
    tdVNs.push(h('div', {
      class: ['vxe-cell', {
        'c--title': showTitle,
        'c--tooltip': showTooltip,
        'c--ellipsis': showEllipsis
      }]
    }));
  } else {
    // 渲染单元格
    tdVNs.push.apply(tdVNs, _toConsumableArray(renderLine(h, _vm, $xetable, rowLevel, items, params)).concat([h('div', {
      class: ['vxe-cell', {
        'c--title': showTitle,
        'c--tooltip': showTooltip,
        'c--ellipsis': showEllipsis
      }],
      attrs: {
        title: showTitle ? UtilTools.getCellLabel(row, column, params) : null
      }
    }, column.renderCell(h, params))]));

    if (hasDefaultTip && hasValidError) {
      tdVNs.push(h('div', {
        class: 'vxe-cell--valid',
        style: validStore.rule && validStore.rule.maxWidth ? {
          width: "".concat(validStore.rule.maxWidth, "px")
        } : null
      }, [h('span', {
        class: 'vxe-cell--valid-msg'
      }, validStore.content)]));
    }
  }

  return h('td', {
    class: ['vxe-body--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(cellAlign), cellAlign), _defineProperty(_ref2, "col--".concat(type), type), _defineProperty(_ref2, 'col--last', $columnIndex === columns.length - 1), _defineProperty(_ref2, 'col--tree-node', treeNode), _defineProperty(_ref2, 'col--edit', !!editRender), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref2, 'col--dirty', isDirty), _defineProperty(_ref2, 'col--actived', editConfig && editRender && actived.row === row && (actived.column === column || editOpts.mode === 'row')), _defineProperty(_ref2, 'col--valid-error', hasValidError), _defineProperty(_ref2, 'col--current', currentColumn === column), _ref2), UtilTools.getClass(className, params), UtilTools.getClass(cellClassName, params)],
    key: columnKey ? column.id : $columnIndex,
    attrs: attrs,
    style: cellStyle ? ctor_amd_xe_utils_default.a.isFunction(cellStyle) ? cellStyle(params) : cellStyle : null,
    on: tdOns
  }, tdVNs);
}

function renderRows(h, _vm, $xetable, $seq, rowLevel, fixedType, tableData, tableColumn) {
  var stripe = $xetable.stripe,
      rowKey = $xetable.rowKey,
      highlightHoverRow = $xetable.highlightHoverRow,
      rowClassName = $xetable.rowClassName,
      rowStyle = $xetable.rowStyle,
      allColumnOverflow = $xetable.showOverflow,
      treeConfig = $xetable.treeConfig,
      treeOpts = $xetable.treeOpts,
      treeExpandeds = $xetable.treeExpandeds,
      scrollYLoad = $xetable.scrollYLoad,
      scrollYStore = $xetable.scrollYStore,
      editStore = $xetable.editStore,
      rowExpandeds = $xetable.rowExpandeds,
      radioOpts = $xetable.radioOpts,
      checkboxOpts = $xetable.checkboxOpts,
      expandColumn = $xetable.expandColumn;
  var rows = [];
  tableData.forEach(function (row, $rowIndex) {
    var trOn = {};
    var rowIndex = $rowIndex;
    var seq = rowIndex + 1;

    if (scrollYLoad) {
      seq += scrollYStore.startIndex;
    }

    var _rowIndex = $xetable._getRowIndex(row); // 确保任何情况下 rowIndex 都精准指向真实 data 索引


    rowIndex = $xetable.getRowIndex(row); // 事件绑定

    if (highlightHoverRow) {
      trOn.mouseenter = function (evnt) {
        if (isOperateMouse($xetable)) {
          return;
        }

        $xetable.triggerHoverEvent(evnt, {
          row: row,
          rowIndex: rowIndex
        });
      };

      trOn.mouseleave = function () {
        if (isOperateMouse($xetable)) {
          return;
        }

        $xetable.clearHoverRow();
      };
    }

    var rowid = UtilTools.getRowid($xetable, row);
    var params = {
      $table: $xetable,
      $seq: $seq,
      seq: seq,
      rowid: rowid,
      fixed: fixedType,
      type: cellType,
      level: rowLevel,
      row: row,
      rowIndex: rowIndex,
      $rowIndex: $rowIndex
    };
    rows.push(h('tr', {
      class: ['vxe-body--row', {
        'row--stripe': stripe && ($xetable._getRowIndex(row) + 1) % 2 === 0,
        'is--new': editStore.insertList.indexOf(row) > -1,
        'row--radio': radioOpts.highlight && $xetable.selectRow === row,
        'row--checked': checkboxOpts.highlight && $xetable.isCheckedByCheckboxRow(row)
      }, rowClassName ? ctor_amd_xe_utils_default.a.isFunction(rowClassName) ? rowClassName(params) : rowClassName : ''],
      attrs: {
        'data-rowid': rowid
      },
      style: rowStyle ? ctor_amd_xe_utils_default.a.isFunction(rowStyle) ? rowStyle(params) : rowStyle : null,
      key: rowKey || treeConfig ? rowid : $rowIndex,
      on: trOn
    }, tableColumn.map(function (column, $columnIndex) {
      return renderColumn(h, _vm, $xetable, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData);
    }))); // 如果行被展开了

    if (expandColumn && rowExpandeds.length && rowExpandeds.indexOf(row) > -1) {
      var cellStyle;

      if (treeConfig) {
        cellStyle = {
          paddingLeft: "".concat(rowLevel * treeOpts.indent + 30, "px")
        };
      }

      var showOverflow = expandColumn.showOverflow;
      var hasEllipsis = ctor_amd_xe_utils_default.a.isUndefined(showOverflow) || ctor_amd_xe_utils_default.a.isNull(showOverflow) ? allColumnOverflow : showOverflow;
      var expandParams = {
        $table: $xetable,
        $seq: $seq,
        seq: seq,
        column: expandColumn,
        fixed: fixedType,
        type: cellType,
        level: rowLevel,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex
      };
      rows.push(h('tr', {
        class: 'vxe-body--expanded-row',
        key: "expand_".concat(rowid),
        style: rowStyle ? ctor_amd_xe_utils_default.a.isFunction(rowStyle) ? rowStyle(expandParams) : rowStyle : null,
        on: trOn
      }, [h('td', {
        class: ['vxe-body--expanded-column', {
          'fixed--hidden': fixedType,
          'col--ellipsis': hasEllipsis
        }],
        attrs: {
          colspan: tableColumn.length
        }
      }, [h('div', {
        class: 'vxe-body--expanded-cell',
        style: cellStyle
      }, [expandColumn.renderData(h, expandParams)])])]));
    } // 如果是树形表格


    if (treeConfig && treeExpandeds.length) {
      var rowChildren = row[treeOpts.children];

      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, _toConsumableArray(renderRows(h, _vm, $xetable, $seq ? "".concat($seq, ".").concat(seq) : "".concat(seq), rowLevel + 1, fixedType, rowChildren, tableColumn)));
      }
    }
  });
  return rows;
}
/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，实现相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
 * css3 translate 方式：对于同步滚动效果会有产生卡顿感觉，虽然可以利用硬件加速，渲染性能略优，但失去table布局能力
 */


var scrollProcessTimeout;

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
    fixedColumn: Array,
    size: String,
    fixedType: String
  },
  mounted: function mounted() {
    var $xetable = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $xetable.elemStore;
    var prefix = "".concat(fixedType || 'main', "-body-");
    elemStore["".concat(prefix, "wrapper")] = $el;
    elemStore["".concat(prefix, "table")] = $refs.table;
    elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    elemStore["".concat(prefix, "list")] = $refs.tbody;
    elemStore["".concat(prefix, "xSpace")] = $refs.xSpace;
    elemStore["".concat(prefix, "ySpace")] = $refs.ySpace;
    elemStore["".concat(prefix, "emptyBlock")] = $refs.emptyBlock;
    this.$el.onscroll = this.scrollEvent;
    this.$el._onscroll = this.scrollEvent;
  },
  beforeDestroy: function beforeDestroy() {
    this.$el._onscroll = null;
    this.$el.onscroll = null;
  },
  render: function render(h) {
    var _e = this._e,
        $xetable = this.$parent,
        fixedColumn = this.fixedColumn,
        fixedType = this.fixedType;
    var $scopedSlots = $xetable.$scopedSlots,
        tId = $xetable.tId,
        tableData = $xetable.tableData,
        tableColumn = $xetable.tableColumn,
        allColumnOverflow = $xetable.showOverflow,
        keyboardConfig = $xetable.keyboardConfig,
        keyboardOpts = $xetable.keyboardOpts,
        mergeList = $xetable.mergeList,
        spanMethod = $xetable.spanMethod,
        scrollXLoad = $xetable.scrollXLoad,
        emptyRender = $xetable.emptyRender,
        emptyOpts = $xetable.emptyOpts,
        mouseConfig = $xetable.mouseConfig,
        mouseOpts = $xetable.mouseOpts; // 如果是固定列与设置了超出隐藏

    if (!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) {
      if (fixedType && allColumnOverflow) {
        tableColumn = fixedColumn;
      } else if (scrollXLoad) {
        if (fixedType) {
          tableColumn = fixedColumn;
        }
      }
    }

    var emptyContent;

    if ($scopedSlots.empty) {
      emptyContent = $scopedSlots.empty.call(this, {
        $table: $xetable
      }, h);
    } else {
      var compConf = emptyRender ? v_x_e_table.renderer.get(emptyOpts.name) : null;

      if (compConf && compConf.renderEmpty) {
        emptyContent = compConf.renderEmpty.call(this, h, emptyOpts, {
          $table: $xetable
        });
      } else {
        emptyContent = $xetable.emptyText || conf.i18n('vxe.table.emptyText');
      }
    }

    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      attrs: {
        'data-tid': tId
      }
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('div', {
      class: 'vxe-body--y-space',
      ref: 'ySpace'
    }), h('table', {
      class: 'vxe-table--body',
      attrs: {
        'data-tid': tId,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      ref: 'table'
    }, [
    /**
     * 列宽
     */
    h('colgroup', {
      ref: 'colgroup'
    }, tableColumn.map(function (column, $columnIndex) {
      return h('col', {
        attrs: {
          name: column.id
        },
        key: $columnIndex
      });
    })),
    /**
     * 内容
     */
    h('tbody', {
      ref: 'tbody'
    }, renderRows(h, this, $xetable, '', 0, fixedType, tableData, tableColumn))]), h('div', {
      class: 'vxe-table--checkbox-range'
    }), mouseConfig && mouseOpts.area ? h('div', {
      class: 'vxe-table--cell-area'
    }, [h('span', {
      class: 'vxe-table--cell-main-area'
    }, mouseOpts.extension ? [h('span', {
      class: 'vxe-table--cell-main-area-btn',
      on: {
        mousedown: function mousedown(evnt) {
          $xetable.triggerCellExtendMousedownEvent(evnt, {
            $table: $xetable,
            fixed: fixedType,
            type: cellType
          });
        }
      }
    })] : null), h('span', {
      class: 'vxe-table--cell-copy-area'
    }), h('span', {
      class: 'vxe-table--cell-extend-area'
    }), h('span', {
      class: 'vxe-table--cell-multi-area'
    }), h('span', {
      class: 'vxe-table--cell-active-area'
    })]) : null, !fixedType ? h('div', {
      class: 'vxe-table--empty-block',
      ref: 'emptyBlock'
    }, [h('div', {
      class: 'vxe-table--empty-content'
    }, emptyContent)]) : null]);
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent: function scrollEvent(evnt) {
      var $el = this.$el,
          $xetable = this.$parent,
          fixedType = this.fixedType;
      var $refs = $xetable.$refs,
          highlightHoverRow = $xetable.highlightHoverRow,
          scrollXLoad = $xetable.scrollXLoad,
          scrollYLoad = $xetable.scrollYLoad,
          lastScrollTop = $xetable.lastScrollTop,
          lastScrollLeft = $xetable.lastScrollLeft;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          leftBody = $refs.leftBody,
          rightBody = $refs.rightBody,
          tableFooter = $refs.tableFooter,
          validTip = $refs.validTip;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;
      var bodyElem = tableBody.$el;
      var leftElem = leftBody ? leftBody.$el : null;
      var rightElem = rightBody ? rightBody.$el : null;
      var scrollTop = $el.scrollTop;
      var scrollLeft = bodyElem.scrollLeft;
      var isX = scrollLeft !== lastScrollLeft;
      var isY = scrollTop !== lastScrollTop;
      $xetable.lastScrollTop = scrollTop;
      $xetable.lastScrollLeft = scrollLeft;
      $xetable.lastScrollTime = Date.now();

      if (highlightHoverRow) {
        $xetable.clearHoverRow();
      }

      if (leftElem && fixedType === 'left') {
        scrollTop = leftElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, rightElem);
      } else if (rightElem && fixedType === 'right') {
        scrollTop = rightElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, leftElem);
      } else {
        if (isX) {
          if (headerElem) {
            headerElem.scrollLeft = bodyElem.scrollLeft;
          }

          if (footerElem) {
            footerElem.scrollLeft = bodyElem.scrollLeft;
          }
        }

        if (leftElem || rightElem) {
          $xetable.checkScrolling();

          if (isY) {
            syncBodyScroll(scrollTop, leftElem, rightElem);
          }
        }
      }

      if (scrollXLoad && isX) {
        $xetable.triggerScrollXEvent(evnt);

        if (headerElem && scrollLeft + bodyElem.clientWidth >= bodyElem.scrollWidth - 80) {
          // 修复拖动滚动条时可能存在不同步问题
          this.$nextTick(function () {
            if (bodyElem.scrollLeft !== headerElem.scrollLeft) {
              headerElem.scrollLeft = bodyElem.scrollLeft;
            }
          });
        }
      }

      if (scrollYLoad && isY) {
        $xetable.triggerScrollYEvent(evnt);
      }

      if (isX && validTip && validTip.visible) {
        validTip.updatePlacement();
      }

      $xetable.emitEvent('scroll', {
        type: cellType,
        fixed: fixedType,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        isX: isX,
        isY: isY
      }, evnt);
    }
  }
});
// CONCATENATED MODULE: ./packages/mixins/size.js
/* harmony default export */ var size = ({
  computed: {
    vSize: function vSize() {
      var $parent = this.$parent,
          size = this.size;
      return size || $parent && ($parent.size || $parent.vSize);
    }
  }
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("13d5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// CONCATENATED MODULE: ./packages/table/src/cell.js










function renderHelpIcon(h, params) {
  var $table = params.$table,
      column = params.column;
  var titleHelp = column.titleHelp;
  return titleHelp ? [h('i', {
    class: ['vxe-cell-help-icon', titleHelp.icon || conf.icon.TABLE_HELP],
    on: {
      mouseenter: function mouseenter(evnt) {
        $table.triggerHeaderHelpEvent(evnt, params);
      },
      mouseleave: function mouseleave(evnt) {
        $table.handleTargetLeaveEvent(evnt);
      }
    }
  })] : [];
}

function renderTitleContent(h, params, content) {
  var $table = params.$table,
      column = params.column;
  var showHeaderOverflow = column.showHeaderOverflow;
  var allColumnHeaderOverflow = $table.showHeaderOverflow,
      tooltipOpts = $table.tooltipOpts;
  var enabled = tooltipOpts.enabled;
  var headOverflow = ctor_amd_xe_utils_default.a.isUndefined(showHeaderOverflow) || ctor_amd_xe_utils_default.a.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
  var showTitle = headOverflow === 'title';
  var showTooltip = headOverflow === true || headOverflow === 'tooltip';
  var ons = {};

  if (showTitle || showTooltip || enabled) {
    ons.mouseenter = function (evnt) {
      if ($table._isResize) {
        return;
      }

      if (showTitle) {
        DomTools.updateCellTitle(evnt.currentTarget, column);
      } else if (showTooltip || enabled) {
        $table.triggerHeaderTooltipEvent(evnt, params);
      }
    };
  }

  if (showTooltip || enabled) {
    ons.mouseleave = function (evnt) {
      if ($table._isResize) {
        return;
      }

      if (showTooltip || enabled) {
        $table.handleTargetLeaveEvent(evnt);
      }
    };
  }

  return [h('span', {
    class: 'vxe-cell--title',
    on: ons
  }, content)];
}

function getFooterContent(h, params) {
  var $table = params.$table,
      column = params.column,
      _columnIndex = params._columnIndex,
      items = params.items;
  var slots = column.slots,
      editRender = column.editRender,
      cellRender = column.cellRender;
  var renderOpts = editRender || cellRender;

  if (slots && slots.footer) {
    return slots.footer.call($table, params, h);
  }

  if (renderOpts) {
    var compConf = v_x_e_table.renderer.get(renderOpts.name);

    if (compConf && compConf.renderFooter) {
      return compConf.renderFooter.call($table, h, renderOpts, params);
    }
  }

  return [UtilTools.formatText(items[_columnIndex], 1)];
}

function getDefaultCellLabel(params) {
  var row = params.row,
      column = params.column;
  return UtilTools.formatText(UtilTools.getCellLabel(row, column, params), 1);
}

var Cell = {
  createColumn: function createColumn($xetable, _vm) {
    var type = _vm.type,
        sortable = _vm.sortable,
        remoteSort = _vm.remoteSort,
        filters = _vm.filters,
        editRender = _vm.editRender,
        treeNode = _vm.treeNode;
    var editConfig = $xetable.editConfig,
        editOpts = $xetable.editOpts,
        checkboxOpts = $xetable.checkboxOpts;
    var renMaps = {
      renderHeader: this.renderDefaultHeader,
      renderCell: treeNode ? this.renderTreeCell : this.renderDefaultCell,
      renderFooter: this.renderDefaultFooter
    };

    switch (type) {
      case 'seq':
        renMaps.renderHeader = this.renderIndexHeader;
        renMaps.renderCell = treeNode ? this.renderTreeIndexCell : this.renderIndexCell;
        break;

      case 'radio':
        renMaps.renderHeader = this.renderRadioHeader;
        renMaps.renderCell = treeNode ? this.renderTreeRadioCell : this.renderRadioCell;
        break;

      case 'checkbox':
        renMaps.renderHeader = this.renderSelectionHeader;
        renMaps.renderCell = checkboxOpts.checkField ? treeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp : treeNode ? this.renderTreeSelectionCell : this.renderSelectionCell;
        break;

      case 'expand':
        renMaps.renderCell = this.renderExpandCell;
        renMaps.renderData = this.renderExpandData;
        break;

      case 'html':
        renMaps.renderCell = treeNode ? this.renderTreeHTMLCell : this.renderHTMLCell;

        if (filters && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader;
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader;
        } else if (filters) {
          renMaps.renderHeader = this.renderFilterHeader;
        }

        break;

      default:
        if (editConfig && editRender) {
          renMaps.renderHeader = this.renderEditHeader;
          renMaps.renderCell = editOpts.mode === 'cell' ? treeNode ? this.renderTreeCellEdit : this.renderCellEdit : treeNode ? this.renderTreeRowEdit : this.renderRowEdit;
        } else if (filters && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader;
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader;
        } else if (filters) {
          renMaps.renderHeader = this.renderFilterHeader;
        }

    }

    return UtilTools.getColumnConfig($xetable, _vm, renMaps);
  },

  /**
   * 单元格
   */
  renderHeaderTitle: function renderHeaderTitle(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots,
        editRender = column.editRender,
        cellRender = column.cellRender;
    var renderOpts = editRender || cellRender;

    if (slots && slots.header) {
      return renderTitleContent(h, params, slots.header.call($table, params, h));
    }

    if (renderOpts) {
      var compConf = v_x_e_table.renderer.get(renderOpts.name);

      if (compConf && compConf.renderHeader) {
        return renderTitleContent(h, params, compConf.renderHeader.call($table, h, renderOpts, params));
      }
    }

    return renderTitleContent(h, params, UtilTools.formatText(column.getTitle(), 1));
  },
  renderDefaultHeader: function renderDefaultHeader(h, params) {
    return renderHelpIcon(h, params).concat(Cell.renderHeaderTitle(h, params));
  },
  renderDefaultCell: function renderDefaultCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots,
        editRender = column.editRender,
        cellRender = column.cellRender;
    var renderOpts = editRender || cellRender;

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    if (renderOpts) {
      var funName = editRender ? 'renderCell' : 'renderDefault';
      var compConf = v_x_e_table.renderer.get(renderOpts.name);

      if (compConf && compConf[funName]) {
        return compConf[funName].call($table, h, renderOpts, Object.assign({
          $type: editRender ? 'edit' : 'cell'
        }, params));
      }
    }

    return [h('span', {
      class: 'vxe-cell--label'
    }, [getDefaultCellLabel(params)])];
  },
  renderTreeCell: function renderTreeCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderDefaultCell.call(this, h, params));
  },
  renderDefaultFooter: function renderDefaultFooter(h, params) {
    return [h('span', {
      class: 'vxe-cell--item'
    }, getFooterContent(h, params))];
  },

  /**
   * 树节点
   */
  renderTreeIcon: function renderTreeIcon(h, params, cellVNodes) {
    var $table = params.$table,
        isHidden = params.isHidden;
    var treeOpts = $table.treeOpts,
        treeExpandeds = $table.treeExpandeds,
        treeLazyLoadeds = $table.treeLazyLoadeds;
    var row = params.row,
        column = params.column,
        level = params.level;
    var slots = column.slots;
    var children = treeOpts.children,
        hasChild = treeOpts.hasChild,
        indent = treeOpts.indent,
        lazy = treeOpts.lazy,
        trigger = treeOpts.trigger,
        iconLoaded = treeOpts.iconLoaded,
        showIcon = treeOpts.showIcon,
        iconOpen = treeOpts.iconOpen,
        iconClose = treeOpts.iconClose;
    var rowChilds = row[children];
    var hasLazyChilds = false;
    var isAceived = false;
    var isLazyLoaded = false;
    var on = {};

    if (slots && slots.icon) {
      return slots.icon.call($table, params, h, cellVNodes);
    }

    if (!isHidden) {
      isAceived = treeExpandeds.indexOf(row) > -1;

      if (lazy) {
        isLazyLoaded = treeLazyLoadeds.indexOf(row) > -1;
        hasLazyChilds = row[hasChild];
      }
    }

    if (!trigger || trigger === 'default') {
      on.click = function (evnt) {
        return $table.triggerTreeExpandEvent(evnt, params);
      };
    }

    return [h('div', {
      class: ['vxe-cell--tree-node', {
        'is--active': isAceived
      }],
      style: {
        paddingLeft: "".concat(level * indent, "px")
      }
    }, [showIcon && (rowChilds && rowChilds.length || hasLazyChilds) ? [h('div', {
      class: 'vxe-tree--btn-wrapper',
      on: on
    }, [h('i', {
      class: ['vxe-tree--node-btn', isLazyLoaded ? iconLoaded || conf.icon.TABLE_TREE_LOADED : isAceived ? iconOpen || conf.icon.TABLE_TREE_OPEN : iconClose || conf.icon.TABLE_TREE_CLOSE]
    })])] : null, h('div', {
      class: 'vxe-tree-cell'
    }, cellVNodes)])];
  },

  /**
   * 索引
   */
  renderIndexHeader: function renderIndexHeader(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots;
    return renderTitleContent(h, params, slots && slots.header ? slots.header.call($table, params, h) : UtilTools.formatText(column.getTitle(), 1));
  },
  renderIndexCell: function renderIndexCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var seqOpts = $table.seqOpts;
    var slots = column.slots;

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    var $seq = params.$seq,
        seq = params.seq,
        level = params.level;
    var seqMethod = seqOpts.seqMethod;
    return [UtilTools.formatText(seqMethod ? seqMethod(params) : level ? "".concat($seq, ".").concat(seq) : seqOpts.startIndex + seq, 1)];
  },
  renderTreeIndexCell: function renderTreeIndexCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderIndexCell(h, params));
  },

  /**
   * 单选
   */
  renderRadioHeader: function renderRadioHeader(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots;
    return renderTitleContent(h, params, slots && slots.header ? slots.header.call($table, params, h) : [h('span', {
      class: 'vxe-radio--label'
    }, UtilTools.formatText(column.getTitle(), 1))]);
  },
  renderRadioCell: function renderRadioCell(h, params) {
    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var radioOpts = $table.radioOpts,
        selectRow = $table.selectRow;
    var slots = column.slots;
    var labelField = radioOpts.labelField,
        checkMethod = radioOpts.checkMethod;
    var row = params.row;
    var isChecked = row === selectRow;
    var isDisabled = !!checkMethod;
    var on;

    if (!isHidden) {
      on = {
        click: function click(evnt) {
          if (!isDisabled) {
            $table.triggerRadioRowEvent(evnt, params);
          }
        }
      };

      if (checkMethod) {
        isDisabled = !checkMethod({
          row: row
        });
      }
    }

    return [h('span', {
      class: ['vxe-cell--radio', {
        'is--checked': isChecked,
        'is--disabled': isDisabled
      }],
      on: on
    }, [h('span', {
      class: 'vxe-radio--icon vxe-radio--checked-icon'
    }), h('span', {
      class: 'vxe-radio--icon vxe-radio--unchecked-icon'
    })].concat(slots && slots.default ? slots.default.call($table, params, h) : labelField ? [h('span', {
      class: 'vxe-radio--label'
    }, ctor_amd_xe_utils_default.a.get(row, labelField))] : []))];
  },
  renderTreeRadioCell: function renderTreeRadioCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderRadioCell(h, params));
  },

  /**
   * 多选
   */
  renderSelectionHeader: function renderSelectionHeader(h, params) {
    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var isIndeterminate = $table.isIndeterminate,
        isAllCheckboxDisabled = $table.isAllCheckboxDisabled;
    var slots = column.slots;
    var checkboxOpts = $table.checkboxOpts;
    var headerTitle = column.getTitle();
    var isChecked = false;
    var on;

    if (checkboxOpts.checkStrictly ? !checkboxOpts.showHeader : checkboxOpts.showHeader === false) {
      return renderTitleContent(h, params, slots && slots.header ? slots.header.call($table, params, h) : [h('span', {
        class: 'vxe-checkbox--label'
      }, headerTitle)]);
    }

    if (!isHidden) {
      isChecked = isAllCheckboxDisabled ? false : $table.isAllSelected;
      on = {
        click: function click(evnt) {
          if (!isAllCheckboxDisabled) {
            $table.triggerCheckAllEvent(evnt, !isChecked);
          }
        }
      };
    }

    return renderTitleContent(h, params, [h('span', {
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isAllCheckboxDisabled,
        'is--indeterminate': isIndeterminate
      }],
      attrs: {
        title: conf.i18n('vxe.table.allTitle')
      },
      on: on
    }, [h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
    })].concat(slots && slots.header ? slots.header.call($table, params, h) : headerTitle ? [h('span', {
      class: 'vxe-checkbox--label'
    }, headerTitle)] : []))]);
  },
  renderSelectionCell: function renderSelectionCell(h, params) {
    var $table = params.$table,
        row = params.row,
        column = params.column,
        isHidden = params.isHidden;
    var treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var _$table$checkboxOpts = $table.checkboxOpts,
        labelField = _$table$checkboxOpts.labelField,
        checkMethod = _$table$checkboxOpts.checkMethod;
    var slots = column.slots;
    var indeterminate = false;
    var isChecked = false;
    var isDisabled = !!checkMethod;
    var on;

    if (!isHidden) {
      isChecked = $table.selection.indexOf(row) > -1;
      on = {
        click: function click(evnt) {
          if (!isDisabled) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked);
          }
        }
      };

      if (checkMethod) {
        isDisabled = !checkMethod({
          row: row
        });
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }
    }

    return [h('span', {
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isDisabled,
        'is--indeterminate': indeterminate
      }],
      on: on
    }, [h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
    })].concat(slots && slots.default ? slots.default.call($table, params, h) : labelField ? [h('span', {
      class: 'vxe-checkbox--label'
    }, ctor_amd_xe_utils_default.a.get(row, labelField))] : []))];
  },
  renderTreeSelectionCell: function renderTreeSelectionCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderSelectionCell(h, params));
  },
  renderSelectionCellByProp: function renderSelectionCellByProp(h, params) {
    var $table = params.$table,
        row = params.row,
        column = params.column,
        isHidden = params.isHidden;
    var treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var _$table$checkboxOpts2 = $table.checkboxOpts,
        labelField = _$table$checkboxOpts2.labelField,
        property = _$table$checkboxOpts2.checkField,
        halfField = _$table$checkboxOpts2.halfField,
        checkMethod = _$table$checkboxOpts2.checkMethod;
    var slots = column.slots;
    var indeterminate = false;
    var isChecked = false;
    var isDisabled = !!checkMethod;
    var on;

    if (!isHidden) {
      isChecked = ctor_amd_xe_utils_default.a.get(row, property);
      on = {
        click: function click(evnt) {
          if (!isDisabled) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked);
          }
        }
      };

      if (checkMethod) {
        isDisabled = !checkMethod({
          row: row
        });
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }
    }

    return [h('span', {
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isDisabled,
        'is--indeterminate': halfField && !isChecked ? row[halfField] : indeterminate
      }],
      on: on
    }, [h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
    })].concat(slots && slots.default ? slots.default.call($table, params, h) : labelField ? [h('span', {
      class: 'vxe-checkbox--label'
    }, ctor_amd_xe_utils_default.a.get(row, labelField))] : []))];
  },
  renderTreeSelectionCellByProp: function renderTreeSelectionCellByProp(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderSelectionCellByProp(h, params));
  },

  /**
   * 展开行
   */
  renderExpandCell: function renderExpandCell(h, params) {
    var $table = params.$table,
        isHidden = params.isHidden,
        row = params.row,
        column = params.column;
    var expandOpts = $table.expandOpts,
        rowExpandeds = $table.rowExpandeds,
        expandLazyLoadeds = $table.expandLazyLoadeds;
    var lazy = expandOpts.lazy,
        labelField = expandOpts.labelField,
        iconLoaded = expandOpts.iconLoaded,
        showIcon = expandOpts.showIcon,
        iconOpen = expandOpts.iconOpen,
        iconClose = expandOpts.iconClose,
        visibleMethod = expandOpts.visibleMethod;
    var slots = column.slots;
    var isAceived = false;
    var isLazyLoaded = false;

    if (slots && slots.icon) {
      return slots.icon.call($table, params, h);
    }

    if (!isHidden) {
      isAceived = rowExpandeds.indexOf(params.row) > -1;

      if (lazy) {
        isLazyLoaded = expandLazyLoadeds.indexOf(row) > -1;
      }
    }

    return [showIcon && (!visibleMethod || visibleMethod(params)) ? h('span', {
      class: ['vxe-table--expanded', {
        'is--active': isAceived
      }],
      on: {
        click: function click(evnt) {
          $table.triggerRowExpandEvent(evnt, params);
        }
      }
    }, [h('i', {
      class: ['vxe-table--expand-btn', isLazyLoaded ? iconLoaded || conf.icon.TABLE_EXPAND_LOADED : isAceived ? iconOpen || conf.icon.TABLE_EXPAND_OPEN : iconClose || conf.icon.TABLE_EXPAND_CLOSE]
    })]) : null, slots && slots.default || labelField ? h('span', {
      class: 'vxe-table--expand-label'
    }, slots.default ? slots.default.call($table, params, h) : ctor_amd_xe_utils_default.a.get(row, labelField)) : null];
  },
  renderExpandData: function renderExpandData(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots,
        contentRender = column.contentRender;

    if (slots && slots.content) {
      return slots.content.call($table, params, h);
    }

    if (contentRender) {
      var compConf = v_x_e_table.renderer.get(contentRender.name);

      if (compConf && compConf.renderExpand) {
        return compConf.renderExpand.call($table, h, contentRender, params);
      }
    }

    return [];
  },

  /**
   * HTML 标签
   */
  renderHTMLCell: function renderHTMLCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots;

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    return [h('span', {
      class: 'vxe-cell--html',
      domProps: {
        innerHTML: getDefaultCellLabel(params)
      }
    })];
  },
  renderTreeHTMLCell: function renderTreeHTMLCell(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderHTMLCell(h, params));
  },

  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader: function renderSortAndFilterHeader(h, params) {
    return Cell.renderDefaultHeader(h, params).concat(Cell.renderSortIcon(h, params)).concat(Cell.renderFilterIcon(h, params));
  },

  /**
   * 排序
   */
  renderSortHeader: function renderSortHeader(h, params) {
    return Cell.renderDefaultHeader(h, params).concat(Cell.renderSortIcon(h, params));
  },
  renderSortIcon: function renderSortIcon(h, params) {
    var $table = params.$table,
        column = params.column;
    var _$table$sortOpts = $table.sortOpts,
        showIcon = _$table$sortOpts.showIcon,
        iconAsc = _$table$sortOpts.iconAsc,
        iconDesc = _$table$sortOpts.iconDesc;
    return showIcon ? [h('span', {
      class: 'vxe-cell--sort'
    }, [h('i', {
      class: ['vxe-sort--asc-btn', iconAsc || conf.icon.TABLE_SORT_ASC, {
        'sort--active': column.order === 'asc'
      }],
      attrs: {
        title: conf.i18n('vxe.table.sortAsc')
      },
      on: {
        click: function click(evnt) {
          $table.triggerSortEvent(evnt, column, 'asc');
        }
      }
    }), h('i', {
      class: ['vxe-sort--desc-btn', iconDesc || conf.icon.TABLE_SORT_DESC, {
        'sort--active': column.order === 'desc'
      }],
      attrs: {
        title: conf.i18n('vxe.table.sortDesc')
      },
      on: {
        click: function click(evnt) {
          $table.triggerSortEvent(evnt, column, 'desc');
        }
      }
    })])] : [];
  },

  /**
   * 筛选
   */
  renderFilterHeader: function renderFilterHeader(h, params) {
    return Cell.renderDefaultHeader(h, params).concat(Cell.renderFilterIcon(h, params));
  },
  renderFilterIcon: function renderFilterIcon(h, params) {
    var $table = params.$table,
        column = params.column,
        hasFilter = params.hasFilter;
    var filterStore = $table.filterStore,
        filterOpts = $table.filterOpts;
    var showIcon = filterOpts.showIcon,
        iconNone = filterOpts.iconNone,
        iconMatch = filterOpts.iconMatch;
    return showIcon ? [h('span', {
      class: ['vxe-cell--filter', {
        'is--active': filterStore.visible && filterStore.column === column
      }]
    }, [h('i', {
      class: ['vxe-filter--btn', hasFilter ? iconMatch || conf.icon.TABLE_FILTER_MATCH : iconNone || conf.icon.TABLE_FILTER_NONE],
      attrs: {
        title: conf.i18n('vxe.table.filter')
      },
      on: {
        click: function click(evnt) {
          $table.triggerFilterEvent(evnt, params.column, params);
        }
      }
    })])] : [];
  },

  /**
   * 可编辑
   */
  renderEditHeader: function renderEditHeader(h, params) {
    var $table = params.$table,
        column = params.column;
    var editRules = $table.editRules,
        editOpts = $table.editOpts;
    var sortable = column.sortable,
        remoteSort = column.remoteSort,
        filters = column.filters;
    var isRequired;

    if (editRules) {
      var columnRules = ctor_amd_xe_utils_default.a.get(editRules, params.column.property);

      if (columnRules) {
        isRequired = columnRules.some(function (rule) {
          return rule.required;
        });
      }
    }

    return [isRequired && editOpts.showAsterisk ? h('i', {
      class: 'vxe-cell--required-icon'
    }) : null, editOpts.showIcon ? h('i', {
      class: ['vxe-cell--edit-icon', editOpts.icon || conf.icon.TABLE_EDIT]
    }) : null].concat(Cell.renderDefaultHeader(h, params)).concat(sortable || remoteSort ? Cell.renderSortIcon(h, params) : []).concat(filters ? Cell.renderFilterIcon(h, params) : []);
  },
  // 行格编辑模式
  renderRowEdit: function renderRowEdit(h, params) {
    var $table = params.$table;
    var actived = $table.editStore.actived;
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row);
  },
  renderTreeRowEdit: function renderTreeRowEdit(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderRowEdit(h, params));
  },
  // 单元格编辑模式
  renderCellEdit: function renderCellEdit(h, params) {
    var $table = params.$table;
    var actived = $table.editStore.actived;
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row && actived.column === params.column);
  },
  renderTreeCellEdit: function renderTreeCellEdit(h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderCellEdit(h, params));
  },
  runRenderer: function runRenderer(h, params, _vm, isEdit) {
    var $table = params.$table,
        column = params.column;
    var slots = column.slots,
        editRender = column.editRender,
        formatter = column.formatter;
    var compConf = v_x_e_table.renderer.get(editRender.name);

    if (isEdit) {
      if (slots && slots.edit) {
        return slots.edit.call($table, params, h);
      }

      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, Object.assign({
        $type: 'edit'
      }, params)) : [];
    }

    if (slots && slots.default) {
      return slots.default.call($table, params, h);
    }

    if (formatter) {
      return [h('span', {
        class: 'vxe-cell--label'
      }, [getDefaultCellLabel(params)])];
    }

    return Cell.renderDefaultCell.call(_vm, h, params);
  }
};
/* harmony default export */ var src_cell = (Cell);
// CONCATENATED MODULE: ./packages/table/src/methods.js



























var methods_getRowid = UtilTools.getRowid,
    getRowkey = UtilTools.getRowkey,
    methods_setCellValue = UtilTools.setCellValue,
    methods_getCellLabel = UtilTools.getCellLabel,
    hasChildrenList = UtilTools.hasChildrenList,
    methods_getColumnList = UtilTools.getColumnList;
var methods_browse = DomTools.browse,
    methods_calcHeight = DomTools.calcHeight,
    methods_hasClass = DomTools.hasClass,
    addClass = DomTools.addClass,
    methods_removeClass = DomTools.removeClass,
    getEventTargetNode = DomTools.getEventTargetNode;
var isWebkit = methods_browse['-webkit'] && !methods_browse.edge;
var debounceScrollYDuration = methods_browse.msie ? 40 : 20;
var resizableStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_WIDTH';
var visibleStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE';
/**
 * 生成行的唯一主键
 */

function getRowUniqueId() {
  return ctor_amd_xe_utils_default.a.uniqueId('row_');
}
/**
 * 单元格的值为：'' | null | undefined 时都属于空值
 */


function eqCellNull(cellValue) {
  return cellValue === '' || ctor_amd_xe_utils_default.a.eqNull(cellValue);
}

function eqCellValue(row1, row2, field) {
  var val1 = ctor_amd_xe_utils_default.a.get(row1, field);
  var val2 = ctor_amd_xe_utils_default.a.get(row2, field);

  if (eqCellNull(val1) && eqCellNull(val2)) {
    return true;
  }

  if (ctor_amd_xe_utils_default.a.isString(val1) || ctor_amd_xe_utils_default.a.isNumber(val1)) {
    /* eslint-disable eqeqeq */
    return val1 == val2;
  }

  return ctor_amd_xe_utils_default.a.isEqual(val1, val2);
}

function getNextSortOrder(_vm, column) {
  var orders = _vm.sortOpts.orders;
  var currOrder = column.order || null;
  var oIndex = orders.indexOf(currOrder) + 1;
  return orders[oIndex < orders.length ? oIndex : 0];
}

function getCustomStorageMap(key) {
  var version = conf.version;
  var rest = ctor_amd_xe_utils_default.a.toStringJSON(localStorage.getItem(key));
  return rest && rest._v === version ? rest : {
    _v: version
  };
}

function getRecoverRow(_vm, list) {
  var fullAllDataRowMap = _vm.fullAllDataRowMap;
  return list.filter(function (row) {
    return fullAllDataRowMap.has(row);
  });
}

function handleReserveRow(_vm, reserveRowMap) {
  var fullDataRowIdData = _vm.fullDataRowIdData;
  var reserveList = [];
  ctor_amd_xe_utils_default.a.each(reserveRowMap, function (item, rowid) {
    if (fullDataRowIdData[rowid] && reserveList.indexOf(fullDataRowIdData[rowid].row) === -1) {
      reserveList.push(fullDataRowIdData[rowid].row);
    }
  });
  return reserveList;
}

function computeVirtualX(_vm) {
  var $refs = _vm.$refs,
      visibleColumn = _vm.visibleColumn;
  var tableBody = $refs.tableBody;
  var tableBodyElem = tableBody ? tableBody.$el : null;

  if (tableBodyElem) {
    var scrollLeft = tableBodyElem.scrollLeft,
        clientWidth = tableBodyElem.clientWidth;
    var endWidth = scrollLeft + clientWidth;
    var toVisibleIndex = -1;
    var cWidth = 0;
    var visibleSize = 0;

    for (var colIndex = 0, colLen = visibleColumn.length; colIndex < colLen; colIndex++) {
      cWidth += visibleColumn[colIndex].renderWidth;

      if (toVisibleIndex === -1 && scrollLeft < cWidth) {
        toVisibleIndex = colIndex;
      }

      if (toVisibleIndex >= 0) {
        visibleSize++;

        if (cWidth > endWidth) {
          break;
        }
      }
    }

    return {
      toVisibleIndex: Math.max(0, toVisibleIndex),
      visibleSize: Math.max(8, visibleSize)
    };
  }

  return {
    toVisibleIndex: 0,
    visibleSize: 8
  };
}

function computeVirtualY(_vm) {
  var $refs = _vm.$refs,
      vSize = _vm.vSize,
      rowHeightMaps = _vm.rowHeightMaps;
  var tableHeader = $refs.tableHeader,
      tableBody = $refs.tableBody;
  var tableBodyElem = tableBody ? tableBody.$el : null;

  if (tableBodyElem) {
    var tableHeaderElem = tableHeader ? tableHeader.$el : null;
    var rowHeight = 0;
    var firstTrElem;
    firstTrElem = tableBodyElem.querySelector('tr');

    if (!firstTrElem && tableHeaderElem) {
      firstTrElem = tableHeaderElem.querySelector('tr');
    }

    if (firstTrElem) {
      rowHeight = firstTrElem.clientHeight;
    }

    if (!rowHeight) {
      rowHeight = rowHeightMaps[vSize || 'default'];
    }

    var visibleSize = Math.max(8, Math.ceil(tableBodyElem.clientHeight / rowHeight) + 2);
    return {
      rowHeight: rowHeight,
      visibleSize: visibleSize
    };
  }

  return {
    rowHeight: 0,
    visibleSize: 8
  };
}

function calculateMergerOffserIndex(list, offsetItem, type) {
  for (var mcIndex = 0, len = list.length; mcIndex < len; mcIndex++) {
    var mergeItem = list[mcIndex];
    var startIndex = offsetItem.startIndex,
        endIndex = offsetItem.endIndex;
    var mergeStartIndex = mergeItem[type];
    var mergeSpanNumber = mergeItem[type + 'span'];
    var mergeEndIndex = mergeStartIndex + mergeSpanNumber;

    if (mergeStartIndex < startIndex && startIndex < mergeEndIndex) {
      offsetItem.startIndex = mergeStartIndex;
    }

    if (mergeStartIndex < endIndex && endIndex < mergeEndIndex) {
      offsetItem.endIndex = mergeEndIndex;
    }

    if (offsetItem.startIndex !== startIndex || offsetItem.endIndex !== endIndex) {
      mcIndex = -1;
    }
  }
}

function setMerges(_vm, merges, mList, rowList) {
  if (merges) {
    var treeConfig = _vm.treeConfig,
        visibleColumn = _vm.visibleColumn;

    if (treeConfig) {
      throw new Error(UtilTools.getLog('vxe.error.noTree', ['merge-footer-items']));
    }

    if (!ctor_amd_xe_utils_default.a.isArray(merges)) {
      merges = [merges];
    }

    merges.forEach(function (item) {
      var row = item.row,
          col = item.col,
          rowspan = item.rowspan,
          colspan = item.colspan;

      if (rowList && ctor_amd_xe_utils_default.a.isNumber(row)) {
        row = rowList[row];
      }

      if (ctor_amd_xe_utils_default.a.isNumber(col)) {
        col = visibleColumn[col];
      }

      if ((rowList ? row : ctor_amd_xe_utils_default.a.isNumber(row)) && col && (rowspan || colspan)) {
        rowspan = ctor_amd_xe_utils_default.a.toNumber(rowspan) || 1;
        colspan = ctor_amd_xe_utils_default.a.toNumber(colspan) || 1;

        if (rowspan > 1 || colspan > 1) {
          var mcIndex = ctor_amd_xe_utils_default.a.findIndexOf(mList, function (item) {
            return item._row === row && item._col === col;
          });
          var mergeItem = mList[mcIndex];

          if (mergeItem) {
            mergeItem.rowspan = rowspan;
            mergeItem.colspan = colspan;
            mergeItem._rowspan = rowspan;
            mergeItem._colspan = colspan;
          } else {
            var mergeRowIndex = rowList ? rowList.indexOf(row) : row;
            var mergeColIndex = visibleColumn.indexOf(col);
            mList.push({
              row: mergeRowIndex,
              col: mergeColIndex,
              rowspan: rowspan,
              colspan: colspan,
              _row: row,
              _col: col,
              _rowspan: rowspan,
              _colspan: colspan
            });
          }
        }
      }
    });
  }
}

function removeMerges(_vm, merges, mList, rowList) {
  var rest = [];

  if (merges) {
    var treeConfig = _vm.treeConfig,
        visibleColumn = _vm.visibleColumn;

    if (treeConfig) {
      throw new Error(UtilTools.getLog('vxe.error.noTree', ['merge-cells']));
    }

    if (!ctor_amd_xe_utils_default.a.isArray(merges)) {
      merges = [merges];
    }

    merges.forEach(function (item) {
      var row = item.row,
          col = item.col;

      if (rowList && ctor_amd_xe_utils_default.a.isNumber(row)) {
        row = rowList[row];
      }

      if (ctor_amd_xe_utils_default.a.isNumber(col)) {
        col = visibleColumn[col];
      }

      var mcIndex = ctor_amd_xe_utils_default.a.findIndexOf(mList, function (item) {
        return item._row === row && item._col === col;
      });

      if (mcIndex > -1) {
        var rItems = mList.splice(mcIndex, 1);
        rest.push(rItems[0]);
      }
    });
  }

  return rest;
}

var Methods = {
  /**
   * 获取父容器元素
   */
  getParentElem: function getParentElem() {
    return this.$xegrid ? this.$xegrid.$el.parentNode : this.$el.parentNode;
  },

  /**
   * 获取父容器的高度
   */
  getParentHeight: function getParentHeight() {
    return this.$xegrid ? this.$xegrid.getParentHeight() : this.getParentElem().clientHeight;
  },

  /**
   * 获取需要排除的高度
   * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
   * 如果存在表尾合计滚动条，则需要排除滚动条高度
   */
  getExcludeHeight: function getExcludeHeight() {
    return this.$xegrid ? this.$xegrid.getExcludeHeight() : 0;
  },

  /**
   * 重置表格的一切数据状态
   */
  clearAll: function clearAll() {
    this.inited = false;
    this.clearSort();
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.clearRadioRow();
    this.clearRadioReserve();
    this.clearCheckboxRow();
    this.clearCheckboxReserve();
    this.clearRowExpand();
    this.clearTreeExpand();
    this.clearTreeExpandReserve();

    if (v_x_e_table._edit) {
      this.clearActived();
    }

    if (v_x_e_table._filter) {
      this.clearFilter();
    }

    if (this.keyboardConfig || this.mouseConfig) {
      this.clearSelected();
    }

    if (this.mouseConfig) {
      this.clearCellAreas();
      this.clearCopyCellArea();
    }

    return this.clearScroll();
  },

  /**
   * 同步 data 数据
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  syncData: function syncData() {
    var _this = this;

    return this.$nextTick().then(function () {
      _this.tableData = [];
      return _this.$nextTick().then(function () {
        return _this.loadTableData(_this.tableFullData);
      });
    });
  },

  /**
   * 手动处理数据
   * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
   */
  updateData: function updateData() {
    return this.handleTableData(true).then(this.updateFooter).then(this.recalculate);
  },
  handleTableData: function handleTableData(force) {
    var scrollYLoad = this.scrollYLoad,
        scrollYStore = this.scrollYStore;
    var fullData = force ? this.updateAfterFullData() : this.afterFullData;
    this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0);
    return this.$nextTick();
  },

  /**
   * 加载表格数据
   * @param {Array} datas 数据
   */
  loadTableData: function loadTableData(datas) {
    var _this2 = this;

    var keepSource = this.keepSource,
        treeConfig = this.treeConfig,
        editStore = this.editStore,
        sYOpts = this.sYOpts,
        scrollYStore = this.scrollYStore,
        scrollXStore = this.scrollXStore;
    var tableFullData = datas ? datas.slice(0) : [];
    var scrollYLoad = !treeConfig && sYOpts.gt > -1 && sYOpts.gt < tableFullData.length;
    scrollYStore.startIndex = 0;
    scrollYStore.endIndex = 1;
    scrollXStore.startIndex = 0;
    scrollXStore.endIndex = 1;
    editStore.insertList = [];
    editStore.removeList = []; // 全量数据

    this.tableFullData = tableFullData; // 缓存数据

    this.updateCache(true); // 原始数据

    this.tableSynchData = datas;

    if (keepSource) {
      this.tableSourceData = ctor_amd_xe_utils_default.a.clone(tableFullData, true);
    }

    this.scrollYLoad = scrollYLoad;

    if (scrollYLoad) {
      if (!(this.height || this.maxHeight)) {
        UtilTools.error('vxe.error.reqProp', ['height | max-height']);
      }

      if (!this.showOverflow) {
        UtilTools.warn('vxe.error.reqProp', ['show-overflow']);
      }

      if (this.spanMethod) {
        UtilTools.warn('vxe.error.scrollErrProp', ['span-method']);
      }
    }

    this.clearMergeCells();
    this.clearMergeFooterItems();
    this.handleTableData(true);
    this.updateFooter();
    return this.computeScrollLoad().then(function () {
      // 是否加载了数据
      if (scrollYLoad) {
        scrollYStore.endIndex = scrollYStore.visibleSize;
      }

      _this2.handleReserveStatus();

      _this2.checkSelectionStatus();

      return _this2.$nextTick().then(function () {
        return _this2.recalculate();
      }).then(function () {
        return _this2.refreshScroll();
      });
    });
  },

  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData: function loadData(datas) {
    var _this3 = this;

    return this.loadTableData(datas).then(function () {
      if (!_this3.inited) {
        _this3.inited = true;

        _this3.handleDefaults();
      }

      _this3.recalculate();
    });
  },

  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData: function reloadData(datas) {
    var _this4 = this;

    return this.clearAll().then(function () {
      _this4.inited = true;
      return _this4.loadTableData(datas);
    }).then(this.handleDefaults);
  },

  /**
   * 局部加载行数据并恢复到初始状态
   * 对于行数据需要局部更改的场景中可能会用到
   * @param {Row} row 行对象
   * @param {Object} record 新数据
   * @param {String} field 字段名
   */
  reloadRow: function reloadRow(row, record, field) {
    var keepSource = this.keepSource,
        tableSourceData = this.tableSourceData,
        tableData = this.tableData;

    if (keepSource) {
      var rowIndex = this.getRowIndex(row);
      var oRow = tableSourceData[rowIndex];

      if (oRow && row) {
        if (field) {
          ctor_amd_xe_utils_default.a.set(oRow, field, ctor_amd_xe_utils_default.a.get(record || row, field));
        } else {
          if (record) {
            tableSourceData[rowIndex] = record;
            ctor_amd_xe_utils_default.a.clear(row, undefined);
            Object.assign(row, this.defineField(Object.assign({}, record)));
            this.updateCache(true);
          } else {
            ctor_amd_xe_utils_default.a.destructuring(oRow, ctor_amd_xe_utils_default.a.clone(row, true));
          }
        }
      }

      this.tableData = tableData.slice(0);
    } else {
      UtilTools.warn('vxe.error.reqProp', ['keep-source']);
    }

    return this.$nextTick();
  },

  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  loadColumn: function loadColumn(columns) {
    var _this5 = this;

    var collectColumn = ctor_amd_xe_utils_default.a.mapTree(columns, function (column) {
      return src_cell.createColumn(_this5, column);
    });
    this.handleColumn(collectColumn);
    return this.$nextTick();
  },

  /**
   * 加载列配置并恢复到初始状态
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  reloadColumn: function reloadColumn(columns) {
    this.clearAll();
    return this.loadColumn(columns);
  },
  handleColumn: function handleColumn(collectColumn) {
    var _this6 = this;

    this.collectColumn = collectColumn;
    var tableFullColumn = methods_getColumnList(collectColumn);
    this.tableFullColumn = tableFullColumn;
    this.cacheColumnMap();
    this.restoreCustomStorage();
    this.refreshColumn().then(function () {
      if (_this6.scrollXLoad) {
        _this6.loadScrollXData(true);
      }
    });
    this.clearMergeCells();
    this.clearMergeFooterItems();
    this.handleTableData(true);

    if ((this.scrollXLoad || this.scrollYLoad) && this.expandColumn) {
      UtilTools.warn('vxe.error.scrollErrProp', ['column.type=expand']);
    }

    this.$nextTick(function () {
      if (_this6.$toolbar) {
        _this6.$toolbar.syncUpdate({
          collectColumn: collectColumn,
          $table: _this6
        });
      }
    });
  },

  /**
   * 更新数据行的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  updateCache: function updateCache(source) {
    var _this7 = this;

    var treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        tableFullData = this.tableFullData,
        fullDataRowMap = this.fullDataRowMap,
        fullAllDataRowMap = this.fullAllDataRowMap;
    var fullDataRowIdData = this.fullDataRowIdData,
        fullAllDataRowIdData = this.fullAllDataRowIdData;
    var rowkey = getRowkey(this);
    var isLazy = treeConfig && treeOpts.lazy;

    var handleCache = function handleCache(row, index, items, path, parent) {
      var rowid = methods_getRowid(_this7, row);

      if (!rowid) {
        rowid = getRowUniqueId();
        ctor_amd_xe_utils_default.a.set(row, rowkey, rowid);
      }

      if (isLazy && row[treeOpts.hasChild] && ctor_amd_xe_utils_default.a.isUndefined(row[treeOpts.children])) {
        row[treeOpts.children] = null;
      }

      var rest = {
        row: row,
        rowid: rowid,
        index: treeConfig && parent ? -1 : index,
        items: items,
        parent: parent
      };

      if (source) {
        fullDataRowIdData[rowid] = rest;
        fullDataRowMap.set(row, rest);
      }

      fullAllDataRowIdData[rowid] = rest;
      fullAllDataRowMap.set(row, rest);
    };

    if (source) {
      fullDataRowIdData = this.fullDataRowIdData = {};
      fullDataRowMap.clear();
    }

    fullAllDataRowIdData = this.fullAllDataRowIdData = {};
    fullAllDataRowMap.clear();

    if (treeConfig) {
      ctor_amd_xe_utils_default.a.eachTree(tableFullData, handleCache, treeOpts);
    } else {
      tableFullData.forEach(handleCache);
    }
  },
  appendTreeCache: function appendTreeCache(row, childs) {
    var _this8 = this;

    var keepSource = this.keepSource,
        tableSourceData = this.tableSourceData,
        treeOpts = this.treeOpts,
        fullDataRowIdData = this.fullDataRowIdData,
        fullDataRowMap = this.fullDataRowMap,
        fullAllDataRowMap = this.fullAllDataRowMap,
        fullAllDataRowIdData = this.fullAllDataRowIdData;
    var children = treeOpts.children,
        hasChild = treeOpts.hasChild;
    var rowkey = getRowkey(this);
    var rowid = methods_getRowid(this, row);
    var matchObj;

    if (keepSource) {
      matchObj = ctor_amd_xe_utils_default.a.findTree(tableSourceData, function (item) {
        return rowid === methods_getRowid(_this8, item);
      }, treeOpts);
    }

    ctor_amd_xe_utils_default.a.eachTree(childs, function (row, index, items, path, parent) {
      var rowid = methods_getRowid(_this8, row);

      if (!rowid) {
        rowid = getRowUniqueId();
        ctor_amd_xe_utils_default.a.set(row, rowkey, rowid);
      }

      if (row[hasChild] && ctor_amd_xe_utils_default.a.isUndefined(row[children])) {
        row[children] = null;
      }

      var rest = {
        row: row,
        rowid: rowid,
        index: -1,
        items: items,
        parent: parent
      };
      fullDataRowIdData[rowid] = rest;
      fullDataRowMap.set(row, rest);
      fullAllDataRowIdData[rowid] = rest;
      fullAllDataRowMap.set(row, rest);
    }, treeOpts);

    if (matchObj) {
      matchObj.item[children] = ctor_amd_xe_utils_default.a.clone(childs, true);
    }
  },

  /**
   * 更新数据列的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  cacheColumnMap: function cacheColumnMap() {
    var tableFullColumn = this.tableFullColumn,
        collectColumn = this.collectColumn,
        fullColumnMap = this.fullColumnMap;
    var fullColumnIdData = this.fullColumnIdData = {};
    var fullColumnFieldData = this.fullColumnFieldData = {};
    var isGroup = collectColumn.some(hasChildrenList);
    var expandColumn;
    var treeNodeColumn;
    var hasFixed;

    var handleFunc = function handleFunc(column, index, items, path, parent) {
      var colid = column.id,
          property = column.property,
          fixed = column.fixed,
          type = column.type,
          treeNode = column.treeNode;
      var rest = {
        column: column,
        colid: colid,
        index: index,
        items: items,
        parent: parent
      };

      if (property) {
        if (fullColumnFieldData[property]) {
          UtilTools.warn('vxe.error.fieldRepet', ['field', property]);
        }

        fullColumnFieldData[property] = rest;
      }

      if (!hasFixed && fixed) {
        hasFixed = fixed;
      }

      if (!treeNodeColumn && treeNode) {
        treeNodeColumn = column;
      } else if (!expandColumn && type === 'expand') {
        expandColumn = column;
      }

      if (fullColumnIdData[colid]) {
        UtilTools.error('vxe.error.fieldRepet', ['colId', colid]);
      }

      fullColumnIdData[colid] = rest;
      fullColumnMap.set(column, rest);
    };

    fullColumnMap.clear();

    if (isGroup) {
      ctor_amd_xe_utils_default.a.eachTree(collectColumn, function (column, index, items, path, parent, nodes) {
        column.level = nodes.length;
        handleFunc(column, index, items, path, parent);
      });
    } else {
      tableFullColumn.forEach(handleFunc);
    }

    if (expandColumn && hasFixed) {
      UtilTools.warn('vxe.error.errConflicts', ['column.fixed', 'column.type=expand']);
    }

    if (expandColumn && this.mouseOpts.area) {
      UtilTools.error('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand']);
    }

    this.isGroup = isGroup;
    this.treeNodeColumn = treeNodeColumn;
    this.expandColumn = expandColumn;
  },

  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode: function getRowNode(tr) {
    if (tr) {
      var fullAllDataRowIdData = this.fullAllDataRowIdData;
      var rowid = tr.getAttribute('data-rowid');
      var rest = fullAllDataRowIdData[rowid];

      if (rest) {
        return {
          rowid: rest.rowid,
          item: rest.row,
          index: rest.index,
          items: rest.items,
          parent: rest.parent
        };
      }
    }

    return null;
  },

  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param {Element} cell 元素
   */
  getColumnNode: function getColumnNode(cell) {
    if (cell) {
      var fullColumnIdData = this.fullColumnIdData;
      var colid = cell.getAttribute('data-colid');
      var rest = fullColumnIdData[colid];

      if (rest) {
        return {
          colid: rest.colid,
          item: rest.column,
          index: rest.index,
          items: rest.items,
          parent: rest.parent
        };
      }
    }

    return null;
  },

  /**
   * 根据 row 获取相对于 data 中的索引
   * @param {Row} row 行对象
   */
  getRowIndex: function getRowIndex(row) {
    return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1;
  },

  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param {Row} row 行对象
   */
  _getRowIndex: function _getRowIndex(row) {
    return this.afterFullData.indexOf(row);
  },

  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param {Row} row 行对象
   */
  $getRowIndex: function $getRowIndex(row) {
    return this.tableData.indexOf(row);
  },

  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnInfo} column 列配置
   */
  getColumnIndex: function getColumnIndex(column) {
    return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1;
  },

  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param {ColumnInfo} column 列配置
   */
  _getColumnIndex: function _getColumnIndex(column) {
    return this.visibleColumn.indexOf(column);
  },

  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param {ColumnInfo} column 列配置
   */
  $getColumnIndex: function $getColumnIndex(column) {
    return this.tableColumn.indexOf(column);
  },

  /**
   * 判断是否为索引列
   * @param {ColumnInfo} column 列配置
   */
  isSeqColumn: function isSeqColumn(column) {
    return column && column.type === 'seq';
  },

  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} record 行数据
   */
  defineField: function defineField(record) {
    var treeConfig = this.treeConfig,
        treeOpts = this.treeOpts;
    var rowkey = getRowkey(this);
    this.visibleColumn.forEach(function (_ref) {
      var property = _ref.property,
          editRender = _ref.editRender;

      if (property && !ctor_amd_xe_utils_default.a.has(record, property)) {
        ctor_amd_xe_utils_default.a.set(record, property, editRender && !ctor_amd_xe_utils_default.a.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null);
      }
    });

    if (treeConfig && treeOpts.lazy && ctor_amd_xe_utils_default.a.isUndefined(record[treeOpts.children])) {
      record[treeOpts.children] = null;
    } // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数


    if (!ctor_amd_xe_utils_default.a.get(record, rowkey)) {
      ctor_amd_xe_utils_default.a.set(record, rowkey, getRowUniqueId());
    }

    return record;
  },

  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param {Array} records 新数据
   */
  createData: function createData(records) {
    var _this9 = this;

    var rowkey = getRowkey(this);
    var rows = records.map(function (record) {
      return _this9.defineField(Object.assign({}, record, _defineProperty({}, rowkey, null)));
    });
    return this.$nextTick().then(function () {
      return rows;
    });
  },

  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow: function createRow(records) {
    var _this10 = this;

    var isArr = ctor_amd_xe_utils_default.a.isArray(records);

    if (!isArr) {
      records = [records];
    }

    return this.$nextTick().then(function () {
      return _this10.createData(records).then(function (rows) {
        return isArr ? rows : rows[0];
      });
    });
  },

  /**
   * 还原数据
   * 如果不传任何参数，则还原整个表格
   * 如果传 row 则还原一行
   * 如果传 rows 则还原多行
   * 如果还额外传了 field 则还原指定的单元格数据
   */
  revertData: function revertData(rows, field) {
    var _this11 = this;

    var keepSource = this.keepSource,
        tableSourceData = this.tableSourceData,
        treeConfig = this.treeConfig;

    if (keepSource) {
      if (arguments.length) {
        if (rows && !ctor_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        rows.forEach(function (row) {
          if (!_this11.isInsertByRow(row)) {
            var rowIndex = _this11.getRowIndex(row);

            if (treeConfig && rowIndex === -1) {
              throw new Error(UtilTools.getLog('vxe.error.noTree', ['revertData']));
            }

            var oRow = tableSourceData[rowIndex];

            if (oRow && row) {
              if (field) {
                ctor_amd_xe_utils_default.a.set(row, field, ctor_amd_xe_utils_default.a.clone(ctor_amd_xe_utils_default.a.get(oRow, field), true));
              } else {
                ctor_amd_xe_utils_default.a.destructuring(row, ctor_amd_xe_utils_default.a.clone(oRow, true));
              }
            }
          }
        });
        return this.$nextTick();
      }

      return this.reloadData(tableSourceData);
    } else {
      UtilTools.warn('vxe.error.reqProp', ['keep-source']);
    }

    return this.$nextTick();
  },

  /**
   * 清空单元格内容
   * 如果不创参数，则清空整个表格内容
   * 如果传 row 则清空一行内容
   * 如果传 rows 则清空多行内容
   * 如果还额外传了 field 则清空指定单元格内容
   * @param {Array/Row} rows 行数据
   * @param {String} field 字段名
   */
  clearData: function clearData(rows, field) {
    var tableFullData = this.tableFullData,
        visibleColumn = this.visibleColumn;

    if (!arguments.length) {
      rows = tableFullData;
    } else if (rows && !ctor_amd_xe_utils_default.a.isArray(rows)) {
      rows = [rows];
    }

    if (field) {
      rows.forEach(function (row) {
        return ctor_amd_xe_utils_default.a.set(row, field, null);
      });
    } else {
      rows.forEach(function (row) {
        visibleColumn.forEach(function (column) {
          if (column.property) {
            methods_setCellValue(row, column, null);
          }
        });
      });
    }

    return this.$nextTick();
  },

  /**
   * 检查是否为临时行数据
   * @param {Row} row 行对象
   */
  isInsertByRow: function isInsertByRow(row) {
    return this.editStore.insertList.indexOf(row) > -1;
  },

  /**
   * 检查行或列数据是否发生改变
   * @param {Row} row 行对象
   * @param {String} field 字段名
   */
  isUpdateByRow: function isUpdateByRow(row, field) {
    var _this12 = this;

    var visibleColumn = this.visibleColumn,
        keepSource = this.keepSource,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        tableSourceData = this.tableSourceData,
        fullDataRowIdData = this.fullDataRowIdData;

    if (keepSource) {
      var oRow, property;
      var rowid = methods_getRowid(this, row); // 新增的数据不需要检测

      if (!fullDataRowIdData[rowid]) {
        return false;
      }

      if (treeConfig) {
        var children = treeOpts.children;
        var matchObj = ctor_amd_xe_utils_default.a.findTree(tableSourceData, function (item) {
          return rowid === methods_getRowid(_this12, item);
        }, treeOpts);
        row = Object.assign({}, row, _defineProperty({}, children, null));

        if (matchObj) {
          oRow = Object.assign({}, matchObj.item, _defineProperty({}, children, null));
        }
      } else {
        var oRowIndex = fullDataRowIdData[rowid].index;
        oRow = tableSourceData[oRowIndex];
      }

      if (oRow) {
        if (arguments.length > 1) {
          return !eqCellValue(oRow, row, field);
        }

        for (var index = 0, len = visibleColumn.length; index < len; index++) {
          property = visibleColumn[index].property;

          if (property && !eqCellValue(oRow, row, property)) {
            return true;
          }
        }
      }
    }

    return false;
  },

  /**
   * 获取表格的可视列，也可以指定索引获取列
   * @param {Number} columnIndex 索引
   */
  getColumns: function getColumns(columnIndex) {
    var columns = this.visibleColumn;
    return arguments.length ? columns[columnIndex] : columns.slice(0);
  },

  /**
   * 根据列的唯一主键获取列
   * @param {String} colid 列主键
   */
  getColumnById: function getColumnById(colid) {
    var fullColumnIdData = this.fullColumnIdData;
    return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null;
  },

  /**
   * 根据列的字段名获取列
   * @param {String} field 字段名
   */
  getColumnByField: function getColumnByField(field) {
    var fullColumnFieldData = this.fullColumnFieldData;
    return fullColumnFieldData[field] ? fullColumnFieldData[field].column : null;
  },

  /**
   * 获取当前表格的列
   * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn: function getTableColumn() {
    return {
      collectColumn: this.collectColumn.slice(0),
      fullColumn: this.tableFullColumn.slice(0),
      visibleColumn: this.visibleColumn.slice(0),
      tableColumn: this.tableColumn.slice(0)
    };
  },

  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData: function getData(rowIndex) {
    var tableSynchData = this.data || this.tableSynchData;
    return arguments.length ? tableSynchData[rowIndex] : tableSynchData.slice(0);
  },

  /**
   * 用于多选行，获取已选中的数据
   */
  getCheckboxRecords: function getCheckboxRecords() {
    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField;
    var rowList = [];

    if (property) {
      if (treeConfig) {
        rowList = ctor_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
          return ctor_amd_xe_utils_default.a.get(row, property);
        }, treeOpts);
      } else {
        rowList = tableFullData.filter(function (row) {
          return ctor_amd_xe_utils_default.a.get(row, property);
        });
      }
    } else {
      var selection = this.selection;

      if (treeConfig) {
        rowList = ctor_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
          return selection.indexOf(row) > -1;
        }, treeOpts);
      } else {
        rowList = tableFullData.filter(function (row) {
          return selection.indexOf(row) > -1;
        });
      }
    }

    return rowList;
  },

  /**
   * 获取处理后全量的表格数据
   * 如果存在筛选条件，继续处理
   */
  updateAfterFullData: function updateAfterFullData() {
    var visibleColumn = this.visibleColumn,
        tableFullData = this.tableFullData,
        filterOpts = this.filterOpts,
        sortOpts = this.sortOpts;
    var tableData = tableFullData.slice(0);
    var column = ctor_amd_xe_utils_default.a.find(visibleColumn, function (column) {
      return column.order;
    });
    var filterColumns = [];
    visibleColumn.forEach(function (column) {
      if (column.filters && column.filters.length) {
        var valueList = [];
        var itemList = [];
        column.filters.forEach(function (item) {
          if (item.checked) {
            itemList.push(item);
            valueList.push(item.value);
          }
        });
        filterColumns.push({
          column: column,
          valueList: valueList,
          itemList: itemList
        });
      }
    });

    if (filterColumns.length) {
      tableData = tableData.filter(function (row) {
        return filterColumns.every(function (_ref2) {
          var column = _ref2.column,
              valueList = _ref2.valueList,
              itemList = _ref2.itemList;

          if (valueList.length && !filterOpts.remote) {
            var filterRender = column.filterRender,
                property = column.property;
            var filterMethod = column.filterMethod;
            var allFilterMethod = filterOpts.filterMethod;
            var compConf = filterRender ? v_x_e_table.renderer.get(filterRender.name) : null;

            if (!filterMethod && compConf && compConf.renderFilter) {
              filterMethod = compConf.filterMethod;
            }

            if (allFilterMethod && !filterMethod) {
              return allFilterMethod({
                options: itemList,
                values: valueList,
                row: row,
                column: column
              });
            }

            return filterMethod ? itemList.some(function (item) {
              return filterMethod({
                value: item.value,
                option: item,
                row: row,
                column: column
              });
            }) : valueList.indexOf(ctor_amd_xe_utils_default.a.get(row, property)) > -1;
          }

          return true;
        });
      });
    }

    if (column && column.order) {
      var remoteSort = column.remoteSort,
          sortMethod = column.sortMethod,
          property = column.property,
          order = column.order;
      var allSortMethod = sortOpts.sortMethod;
      var isRemote = ctor_amd_xe_utils_default.a.isBoolean(remoteSort) ? remoteSort : sortOpts.remote;

      if (!isRemote) {
        if (allSortMethod && !sortMethod) {
          tableData = allSortMethod({
            data: tableData,
            column: column,
            property: property,
            order: order,
            $table: this
          }) || tableData;
        } else {
          var params = {
            $table: this
          };
          var rest = sortMethod ? tableData.sort(sortMethod) : ctor_amd_xe_utils_default.a.sortBy(tableData, column.sortBy || (column.formatter ? function (row) {
            return methods_getCellLabel(row, column, params);
          } : property));
          tableData = order === 'desc' ? rest.reverse() : rest;
        }
      }
    }

    this.afterFullData = tableData;
    return tableData;
  },

  /**
   * 根据行的唯一主键获取行
   * @param {String/Number} rowid 行主键
   */
  getRowById: function getRowById(rowid) {
    var fullDataRowIdData = this.fullDataRowIdData;
    return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null;
  },

  /**
   * 根据行获取行的唯一主键
   * @param {Row} row 行对象
   */
  getRowid: function getRowid(row) {
    var fullAllDataRowMap = this.fullAllDataRowMap;
    return fullAllDataRowMap.has(row) ? fullAllDataRowMap.get(row).rowid : null;
  },

  /**
   * 获取处理后的表格数据
   * 如果存在筛选条件，继续处理
   * 如果存在排序，继续处理
   */
  getTableData: function getTableData() {
    var tableFullData = this.tableFullData,
        afterFullData = this.afterFullData,
        tableData = this.tableData,
        footerData = this.footerData;
    return {
      fullData: tableFullData.slice(0),
      visibleData: afterFullData.slice(0),
      tableData: tableData.slice(0),
      footerData: footerData.slice(0)
    };
  },

  /**
   * 默认行为只允许执行一次，除非被重置
   */
  handleDefaults: function handleDefaults() {
    var _this13 = this;

    if (this.checkboxConfig) {
      this.handleDefaultSelectionChecked();
    }

    if (this.radioConfig) {
      this.handleDefaultRadioChecked();
    }

    if (this.sortConfig) {
      this.handleDefaultSort();
    }

    if (this.expandConfig) {
      this.handleDefaultRowExpand();
    }

    if (this.treeConfig) {
      this.handleDefaultTreeExpand();
    }

    if (this.mergeCells) {
      this.handleDefaultMergeCells();
    }

    if (this.mergeFooterItems) {
      this.handleDefaultMergeFooterItems();
    }

    this.$nextTick(function () {
      return requestAnimationFrame(_this13.recalculate);
    });
  },

  /**
   * 隐藏指定列
   * @param {ColumnInfo} column 列配置
   */
  hideColumn: function hideColumn(column) {
    column.visible = false;
    return this.handleCustom();
  },

  /**
   * 显示指定列
   * @param {ColumnInfo} column 列配置
   */
  showColumn: function showColumn(column) {
    column.visible = true;
    return this.handleCustom();
  },

  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；
   * 如果为 true 则重置所有状态
   * 如果已关联工具栏，则会同步更新
   */
  resetColumn: function resetColumn(options) {
    var customOpts = this.customOpts;
    var checkMethod = customOpts.checkMethod;
    var opts = Object.assign({
      visible: true,
      resizable: options === true
    }, options);
    this.tableFullColumn.forEach(function (column) {
      if (opts.resizable) {
        column.resizeWidth = 0;
      }

      if (!checkMethod || checkMethod({
        column: column
      })) {
        column.visible = column.defaultVisible;
      }
    });

    if (opts.resizable) {
      this.saveCustomResizable(true);
    }

    return this.handleCustom();
  },
  handleCustom: function handleCustom() {
    this.saveCustomVisible();
    this.analyColumnWidth();
    return this.refreshColumn();
  },

  /**
   * 还原自定义列操作状态
   */
  restoreCustomStorage: function restoreCustomStorage() {
    var id = this.id,
        collectColumn = this.collectColumn,
        customConfig = this.customConfig,
        customOpts = this.customOpts;
    var storage = customOpts.storage;
    var isAllStorage = customOpts.storage === true;
    var isResizable = isAllStorage || storage && storage.resizable;
    var isVisible = isAllStorage || storage && storage.visible;

    if (customConfig && (isResizable || isVisible)) {
      var customMap = {};

      if (!id) {
        UtilTools.error('vxe.error.reqProp', ['id']);
        return;
      }

      if (isResizable) {
        var columnWidthStorage = getCustomStorageMap(resizableStorageKey)[id];

        if (columnWidthStorage) {
          ctor_amd_xe_utils_default.a.each(columnWidthStorage, function (resizeWidth, field) {
            customMap[field] = {
              field: field,
              resizeWidth: resizeWidth
            };
          });
        }
      }

      if (isVisible) {
        var columnVisibleStorage = getCustomStorageMap(visibleStorageKey)[id];

        if (columnVisibleStorage) {
          var colVisibles = columnVisibleStorage.split('|');
          var colHides = colVisibles[0] ? colVisibles[0].split(',') : [];
          var colShows = colVisibles[1] ? colVisibles[1].split(',') : [];
          colHides.forEach(function (field) {
            if (customMap[field]) {
              customMap[field].visible = false;
            } else {
              customMap[field] = {
                field: field,
                visible: false
              };
            }
          });
          colShows.forEach(function (field) {
            if (customMap[field]) {
              customMap[field].visible = true;
            } else {
              customMap[field] = {
                field: field,
                visible: true
              };
            }
          });
        }
      }

      var keyMap = {};
      ctor_amd_xe_utils_default.a.eachTree(collectColumn, function (column) {
        var colKey = column.getKey();

        if (colKey) {
          keyMap[colKey] = column;
        }
      });
      ctor_amd_xe_utils_default.a.each(customMap, function (_ref3, field) {
        var visible = _ref3.visible,
            resizeWidth = _ref3.resizeWidth;
        var column = keyMap[field];

        if (column) {
          if (ctor_amd_xe_utils_default.a.isNumber(resizeWidth)) {
            column.resizeWidth = resizeWidth;
          }

          if (ctor_amd_xe_utils_default.a.isBoolean(visible)) {
            column.visible = visible;
          }
        }
      });
    }
  },
  saveCustomVisible: function saveCustomVisible() {
    var id = this.id,
        collectColumn = this.collectColumn,
        customConfig = this.customConfig,
        customOpts = this.customOpts;
    var checkMethod = customOpts.checkMethod,
        storage = customOpts.storage;
    var isAllStorage = customOpts.storage === true;
    var isVisible = isAllStorage || storage && storage.visible;

    if (customConfig && isVisible) {
      var columnVisibleStorageMap = getCustomStorageMap(visibleStorageKey);
      var colHides = [];
      var colShows = [];

      if (!id) {
        UtilTools.error('vxe.error.reqProp', ['id']);
        return;
      }

      ctor_amd_xe_utils_default.a.eachTree(collectColumn, function (column) {
        if (!checkMethod || checkMethod({
          column: column
        })) {
          if (!column.visible && column.defaultVisible) {
            var colKey = column.getKey();

            if (colKey) {
              colHides.push(colKey);
            }
          } else if (column.visible && !column.defaultVisible) {
            var _colKey = column.getKey();

            if (_colKey) {
              colShows.push(_colKey);
            }
          }
        }
      });
      columnVisibleStorageMap[id] = [colHides.join(',')].concat(colShows.length ? [colShows.join(',')] : []).join('|') || undefined;
      localStorage.setItem(visibleStorageKey, ctor_amd_xe_utils_default.a.toJSONString(columnVisibleStorageMap));
    }
  },
  saveCustomResizable: function saveCustomResizable(isReset) {
    var id = this.id,
        collectColumn = this.collectColumn,
        customConfig = this.customConfig,
        customOpts = this.customOpts;
    var storage = customOpts.storage;
    var isAllStorage = customOpts.storage === true;
    var isResizable = isAllStorage || storage && storage.resizable;

    if (customConfig && isResizable) {
      var columnWidthStorageMap = getCustomStorageMap(resizableStorageKey);
      var columnWidthStorage;

      if (!id) {
        UtilTools.error('vxe.error.reqProp', ['id']);
        return;
      }

      if (!isReset) {
        columnWidthStorage = ctor_amd_xe_utils_default.a.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {};
        ctor_amd_xe_utils_default.a.eachTree(collectColumn, function (column) {
          if (column.resizeWidth) {
            var colKey = column.getKey();

            if (colKey) {
              columnWidthStorage[colKey] = column.renderWidth;
            }
          }
        });
      }

      columnWidthStorageMap[id] = ctor_amd_xe_utils_default.a.isEmpty(columnWidthStorage) ? undefined : columnWidthStorage;
      localStorage.setItem(resizableStorageKey, ctor_amd_xe_utils_default.a.toJSONString(columnWidthStorageMap));
    }
  },

  /**
   * 刷新列信息
   * 将固定的列左边、右边分别靠边
   */
  refreshColumn: function refreshColumn() {
    var _this14 = this;

    var leftList = [];
    var centerList = [];
    var rightList = [];
    var collectColumn = this.collectColumn,
        tableFullColumn = this.tableFullColumn,
        isGroup = this.isGroup,
        columnStore = this.columnStore,
        sXOpts = this.sXOpts,
        scrollXStore = this.scrollXStore; // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏

    if (isGroup) {
      var leftGroupList = [];
      var centerGroupList = [];
      var rightGroupList = [];
      ctor_amd_xe_utils_default.a.eachTree(collectColumn, function (column, index, items, path, parent) {
        var isColGroup = hasChildrenList(column); // 如果是分组，必须按组设置固定列，不允许给子列设置固定

        if (parent && parent.fixed) {
          column.fixed = parent.fixed;
        }

        if (parent && column.fixed !== parent.fixed) {
          UtilTools.error('vxe.error.groupFixed');
        }

        if (isColGroup) {
          column.visible = !!ctor_amd_xe_utils_default.a.findTree(column.children, function (subColumn) {
            return hasChildrenList(subColumn) ? null : subColumn.visible;
          });
        } else if (column.visible) {
          if (column.fixed === 'left') {
            leftList.push(column);
          } else if (column.fixed === 'right') {
            rightList.push(column);
          } else {
            centerList.push(column);
          }
        }
      });
      collectColumn.forEach(function (column) {
        if (column.visible) {
          if (column.fixed === 'left') {
            leftGroupList.push(column);
          } else if (column.fixed === 'right') {
            rightGroupList.push(column);
          } else {
            centerGroupList.push(column);
          }
        }
      });
      this.tableGroupColumn = leftGroupList.concat(centerGroupList).concat(rightGroupList);
    } else {
      // 重新分配列
      tableFullColumn.forEach(function (column) {
        if (column.visible) {
          if (column.fixed === 'left') {
            leftList.push(column);
          } else if (column.fixed === 'right') {
            rightList.push(column);
          } else {
            centerList.push(column);
          }
        }
      });
    }

    var visibleColumn = leftList.concat(centerList).concat(rightList);
    var scrollXLoad = sXOpts.gt > -1 && sXOpts.gt < tableFullColumn.length;
    Object.assign(columnStore, {
      leftList: leftList,
      centerList: centerList,
      rightList: rightList
    });

    if (scrollXLoad && isGroup) {
      scrollXLoad = false;
      UtilTools.warn('vxe.error.scrollXNotGroup');
    }

    if (scrollXLoad) {
      if (this.showHeader && !this.showHeaderOverflow) {
        UtilTools.warn('vxe.error.reqProp', ['show-header-overflow']);
      }

      if (this.showFooter && !this.showFooterOverflow) {
        UtilTools.warn('vxe.error.reqProp', ['show-footer-overflow']);
      }

      if (this.spanMethod) {
        UtilTools.warn('vxe.error.scrollErrProp', ['span-method']);
      }

      if (this.footerSpanMethod) {
        UtilTools.warn('vxe.error.scrollErrProp', ['footer-span-method']);
      }

      var _computeVirtualX = computeVirtualX(this),
          visibleSize = _computeVirtualX.visibleSize;

      scrollXStore.startIndex = 0;
      scrollXStore.endIndex = visibleSize;
      scrollXStore.visibleSize = visibleSize;
    } // 如果列被显示/隐藏，则清除合并状态
    // 如果列被设置为固定，则清除合并状态


    if (visibleColumn.length !== this.visibleColumn.length || !this.visibleColumn.every(function (column, index) {
      return column === visibleColumn[index];
    })) {
      this.clearMergeCells();
      this.clearMergeFooterItems();
    }

    this.scrollXLoad = scrollXLoad;
    this.visibleColumn = visibleColumn;
    this.handleTableColumn();
    return this.$nextTick().then(function () {
      _this14.updateFooter();

      return _this14.recalculate(true);
    }).then(function () {
      _this14.updateCellAreas();
    });
  },

  /**
   * 指定列宽的列进行拆分
   */
  analyColumnWidth: function analyColumnWidth() {
    var columnOpts = this.columnOpts;
    var defaultWidth = columnOpts.width,
        defaultMinWidth = columnOpts.minWidth;
    var resizeList = [];
    var pxList = [];
    var pxMinList = [];
    var scaleList = [];
    var scaleMinList = [];
    var autoList = [];
    this.tableFullColumn.forEach(function (column) {
      if (defaultWidth && !column.width) {
        column.width = defaultWidth;
      }

      if (defaultMinWidth && !column.minWidth) {
        column.minWidth = defaultMinWidth;
      }

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
   * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
   */
  refreshScroll: function refreshScroll() {
    var _this15 = this;

    var lastScrollLeft = this.lastScrollLeft,
        lastScrollTop = this.lastScrollTop;
    return this.clearScroll().then(function () {
      if (lastScrollLeft || lastScrollTop) {
        // 重置最后滚动状态
        _this15.lastScrollLeft = 0;
        _this15.lastScrollTop = 0; // 还原滚动状态

        return _this15.scrollTo(lastScrollLeft, lastScrollTop);
      }
    });
  },

  /**
   * 计算单元格列宽，动态分配可用剩余空间
   * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
   */
  recalculate: function recalculate(refull) {
    var _this16 = this;

    var $refs = this.$refs;
    var tableBody = $refs.tableBody,
        tableHeader = $refs.tableHeader,
        tableFooter = $refs.tableFooter;
    var bodyElem = tableBody ? tableBody.$el : null;
    var headerElem = tableHeader ? tableHeader.$el : null;
    var footerElem = tableFooter ? tableFooter.$el : null;

    if (bodyElem) {
      this.autoCellWidth(headerElem, bodyElem, footerElem);

      if (refull === true) {
        // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
        return this.computeScrollLoad().then(function () {
          _this16.autoCellWidth(headerElem, bodyElem, footerElem);

          _this16.computeScrollLoad();
        });
      }
    }

    return this.computeScrollLoad();
  },

  /**
   * 列宽算法
   * 支持 px、%、固定 混合分配
   * 支持动态列表调整分配
   * 支持自动分配偏移量
   * @param {Element} headerElem
   * @param {Element} bodyElem
   * @param {Element} footerElem
   * @param {Number} bodyWidth
   */
  autoCellWidth: function autoCellWidth(headerElem, bodyElem, footerElem) {
    var tableWidth = 0;
    var minCellWidth = 40; // 列宽最少限制 40px

    var bodyWidth = bodyElem.clientWidth;
    var remainWidth = bodyWidth;
    var meanWidth = remainWidth / 100;
    var fit = this.fit,
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
    meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)) : 0;

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


    autoList.forEach(function (column) {
      var width = Math.max(meanWidth, minCellWidth);
      column.renderWidth = width;
      tableWidth += width;
    });

    if (fit) {
      /**
       * 偏移量算法
       * 如果所有列足够放的情况下，从最后动态列开始分配
       */
      var dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoList);
      var dynamicSize = dynamicList.length - 1;

      if (dynamicSize > 0) {
        var odiffer = bodyWidth - tableWidth;

        if (odiffer > 0) {
          while (odiffer > 0 && dynamicSize >= 0) {
            odiffer--;
            dynamicList[dynamicSize--].renderWidth++;
          }

          tableWidth = bodyWidth;
        }
      }
    }

    var tableHeight = bodyElem.offsetHeight;
    var overflowY = bodyElem.scrollHeight > bodyElem.clientHeight;
    this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyWidth : 0;
    this.overflowY = overflowY;
    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;

    if (headerElem) {
      this.headerHeight = headerElem.clientHeight; // 检测是否同步滚动

      if (headerElem.scrollLeft !== bodyElem.scrollLeft) {
        headerElem.scrollLeft = bodyElem.scrollLeft;
      }
    } else {
      this.headerHeight = 0;
    }

    if (footerElem) {
      var footerHeight = footerElem.offsetHeight;
      this.scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0);
      this.overflowX = tableWidth > footerElem.clientWidth;
      this.footerHeight = footerHeight;
    } else {
      this.footerHeight = 0;
      this.scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0);
      this.overflowX = tableWidth > bodyWidth;
    }

    this.customHeight = methods_calcHeight(this, 'height');
    this.customMaxHeight = methods_calcHeight(this, 'maxHeight');
    this.parentHeight = Math.max(this.headerHeight + this.footerHeight + 20, this.getParentHeight());

    if (this.overflowX) {
      this.checkScrolling();
    }
  },
  updateStyle: function updateStyle() {
    var _this17 = this;

    var $refs = this.$refs,
        isGroup = this.isGroup,
        fullColumnIdData = this.fullColumnIdData,
        tableColumn = this.tableColumn,
        customHeight = this.customHeight,
        customMaxHeight = this.customMaxHeight,
        border = this.border,
        headerHeight = this.headerHeight,
        showFooter = this.showFooter,
        allColumnOverflow = this.showOverflow,
        allColumnHeaderOverflow = this.showHeaderOverflow,
        allColumnFooterOverflow = this.showFooterOverflow,
        footerHeight = this.footerHeight,
        tableHeight = this.tableHeight,
        tableWidth = this.tableWidth,
        scrollbarHeight = this.scrollbarHeight,
        scrollbarWidth = this.scrollbarWidth,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad,
        cellOffsetWidth = this.cellOffsetWidth,
        columnStore = this.columnStore,
        elemStore = this.elemStore,
        editStore = this.editStore,
        currentRow = this.currentRow,
        mouseConfig = this.mouseConfig;
    var containerList = ['main', 'left', 'right'];
    var emptyPlaceholderElem = $refs.emptyPlaceholder;
    var bodyWrapperElem = elemStore['main-body-wrapper'];

    if (emptyPlaceholderElem) {
      emptyPlaceholderElem.style.top = "".concat(headerHeight, "px");
      emptyPlaceholderElem.style.height = bodyWrapperElem ? "".concat(bodyWrapperElem.offsetHeight - scrollbarHeight, "px") : '';
    }

    if (customHeight > 0) {
      if (showFooter) {
        customHeight += scrollbarHeight;
      }
    }

    containerList.forEach(function (name, index) {
      var fixedType = index > 0 ? name : '';
      var layoutList = ['header', 'body', 'footer'];
      var fixedColumn = columnStore["".concat(fixedType, "List")];
      var fixedWrapperElem = $refs["".concat(fixedType, "Container")];
      layoutList.forEach(function (layout) {
        var wrapperElem = elemStore["".concat(name, "-").concat(layout, "-wrapper")];
        var tableElem = elemStore["".concat(name, "-").concat(layout, "-table")];

        if (layout === 'header') {
          // 表头体样式处理
          // 横向滚动渲染
          var tWidth = tableWidth;

          if (scrollXLoad) {
            if (fixedType) {
              tableColumn = fixedColumn;
            }

            tWidth = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          }

          if (tableElem) {
            tableElem.style.width = tWidth ? "".concat(tWidth + scrollbarWidth, "px") : ''; // 修复 IE 中高度无法自适应问题

            if (methods_browse.msie) {
              ctor_amd_xe_utils_default.a.arrayEach(tableElem.querySelectorAll('.vxe-resizable'), function (resizeElem) {
                resizeElem.style.height = "".concat(resizeElem.parentNode.offsetHeight, "px");
              });
            }
          }

          var repairElem = elemStore["".concat(name, "-").concat(layout, "-repair")];

          if (repairElem) {
            repairElem.style.width = "".concat(tableWidth, "px");
          }

          var listElem = elemStore["".concat(name, "-").concat(layout, "-list")];

          if (isGroup && listElem) {
            ctor_amd_xe_utils_default.a.arrayEach(listElem.querySelectorAll('.col--group'), function (thElem) {
              var colNode = _this17.getColumnNode(thElem);

              if (colNode) {
                var column = colNode.item;
                var showHeaderOverflow = column.showHeaderOverflow;
                var cellOverflow = ctor_amd_xe_utils_default.a.isBoolean(showHeaderOverflow) ? showHeaderOverflow : allColumnHeaderOverflow;
                var showEllipsis = cellOverflow === 'ellipsis';
                var showTitle = cellOverflow === 'title';
                var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
                var hasEllipsis = showTitle || showTooltip || showEllipsis;
                var childWidth = 0;
                var countChild = 0;

                if (hasEllipsis) {
                  ctor_amd_xe_utils_default.a.eachTree(column.children, function (item) {
                    if (!item.children || !column.children.length) {
                      countChild++;
                    }

                    childWidth += item.renderWidth;
                  });
                }

                thElem.style.width = hasEllipsis ? "".concat(childWidth - countChild - (border ? 2 : 0), "px") : '';
              }
            });
          }
        } else if (layout === 'body') {
          var emptyBlockElem = elemStore["".concat(name, "-").concat(layout, "-emptyBlock")];

          if (wrapperElem) {
            if (customMaxHeight) {
              wrapperElem.style.maxHeight = "".concat(fixedType ? customMaxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : customMaxHeight - headerHeight, "px");
            } else {
              if (customHeight > 0) {
                wrapperElem.style.height = "".concat(fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight, "px");
              } else {
                wrapperElem.style.height = '';
              }
            }
          } // 如果是固定列


          if (fixedWrapperElem) {
            var isRightFixed = fixedType === 'right';
            var _fixedColumn = columnStore["".concat(fixedType, "List")];

            if (wrapperElem) {
              wrapperElem.style.top = "".concat(headerHeight, "px");
            }

            fixedWrapperElem.style.height = "".concat((customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1), "px");
            fixedWrapperElem.style.width = "".concat(_fixedColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, isRightFixed ? scrollbarWidth : 0), "px");
          }

          var _tWidth = tableWidth; // 如果是固定列与设置了超出隐藏

          if (fixedType && allColumnOverflow) {
            tableColumn = fixedColumn;
            _tWidth = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          } else if (scrollXLoad) {
            if (fixedType) {
              tableColumn = fixedColumn;
            }

            _tWidth = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          }

          if (tableElem) {
            tableElem.style.width = _tWidth ? "".concat(_tWidth, "px") : ''; // 兼容性处理

            tableElem.style.paddingRight = scrollbarWidth && fixedType && (methods_browse['-moz'] || methods_browse.safari) ? "".concat(scrollbarWidth, "px") : '';
          }

          if (emptyBlockElem) {
            emptyBlockElem.style.width = _tWidth ? "".concat(_tWidth, "px") : '';
          }
        } else if (layout === 'footer') {
          // 如果是使用优化模式
          var _tWidth2 = tableWidth;

          if (fixedType && allColumnOverflow) {
            tableColumn = fixedColumn;
            _tWidth2 = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          } else if (scrollXLoad) {
            if (fixedType) {
              tableColumn = fixedColumn;
            }

            _tWidth2 = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          }

          if (wrapperElem) {
            // 如果是固定列
            if (fixedWrapperElem) {
              wrapperElem.style.top = "".concat(customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight, "px");
            }

            wrapperElem.style.marginTop = "".concat(-scrollbarHeight, "px");
          }

          if (tableElem) {
            tableElem.style.width = _tWidth2 ? "".concat(_tWidth2 + scrollbarWidth, "px") : '';
          }
        }

        var colgroupElem = elemStore["".concat(name, "-").concat(layout, "-colgroup")];

        if (colgroupElem) {
          ctor_amd_xe_utils_default.a.arrayEach(colgroupElem.children, function (colElem) {
            var colid = colElem.getAttribute('name');

            if (colid === 'col_gutter') {
              colElem.style.width = "".concat(scrollbarWidth, "px");
            }

            if (fullColumnIdData[colid]) {
              var column = fullColumnIdData[colid].column;
              var showHeaderOverflow = column.showHeaderOverflow,
                  showFooterOverflow = column.showFooterOverflow,
                  showOverflow = column.showOverflow;
              var cellOverflow;
              colElem.style.width = "".concat(column.renderWidth, "px");

              if (layout === 'header') {
                cellOverflow = ctor_amd_xe_utils_default.a.isUndefined(showHeaderOverflow) || ctor_amd_xe_utils_default.a.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
              } else if (layout === 'footer') {
                cellOverflow = ctor_amd_xe_utils_default.a.isUndefined(showFooterOverflow) || ctor_amd_xe_utils_default.a.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow;
              } else {
                cellOverflow = ctor_amd_xe_utils_default.a.isUndefined(showOverflow) || ctor_amd_xe_utils_default.a.isNull(showOverflow) ? allColumnOverflow : showOverflow;
              }

              var showEllipsis = cellOverflow === 'ellipsis';
              var showTitle = cellOverflow === 'title';
              var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
              var hasEllipsis = showTitle || showTooltip || showEllipsis;
              var _listElem = elemStore["".concat(name, "-").concat(layout, "-list")]; // 滚动的渲染不支持动态行高

              if (layout === 'header' || layout === 'footer') {
                if (scrollXLoad && !hasEllipsis) {
                  hasEllipsis = true;
                }
              } else {
                if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
                  hasEllipsis = true;
                }
              }

              if (_listElem) {
                ctor_amd_xe_utils_default.a.arrayEach(_listElem.querySelectorAll(".".concat(column.id)), function (elem) {
                  var colspan = parseInt(elem.getAttribute('colspan') || 1);
                  var cellElem = elem.querySelector('.vxe-cell');
                  var colWidth = column.renderWidth;

                  if (cellElem) {
                    if (colspan > 1) {
                      var columnIndex = _this17.getColumnIndex(column);

                      for (var _index = 1; _index < colspan; _index++) {
                        var nextColumn = _this17.getColumns(columnIndex + _index);

                        if (nextColumn) {
                          colWidth += nextColumn.renderWidth;
                        }
                      }
                    }

                    cellElem.style.width = hasEllipsis ? "".concat(colWidth - cellOffsetWidth * colspan, "px") : '';
                  }
                });
              }
            }
          });
        }
      });
    });

    if (currentRow) {
      this.setCurrentRow(currentRow);
    }

    if (mouseConfig && mouseConfig.selected && editStore.selected.row && editStore.selected.column) {
      this.addColSdCls();
    }

    return this.$nextTick();
  },

  /**
   * 处理固定列的显示状态
   */
  checkScrolling: function checkScrolling() {
    var _this$$refs = this.$refs,
        tableBody = _this$$refs.tableBody,
        leftContainer = _this$$refs.leftContainer,
        rightContainer = _this$$refs.rightContainer;
    var bodyElem = tableBody ? tableBody.$el : null;

    if (bodyElem) {
      if (leftContainer) {
        DomTools[bodyElem.scrollLeft > 0 ? 'addClass' : 'removeClass'](leftContainer, 'scrolling--middle');
      }

      if (rightContainer) {
        DomTools[bodyElem.clientWidth < bodyElem.scrollWidth - Math.ceil(bodyElem.scrollLeft) ? 'addClass' : 'removeClass'](rightContainer, 'scrolling--middle');
      }
    }
  },
  preventEvent: function preventEvent(evnt, type, args, next, end) {
    var _this18 = this;

    var evntList = v_x_e_table.interceptor.get(type);
    var rest;

    if (!evntList.some(function (func) {
      return func(Object.assign({
        $grid: _this18.$xegrid,
        $table: _this18,
        $event: evnt
      }, args)) === false;
    })) {
      if (next) {
        rest = next();
      }
    }

    if (end) {
      end();
    }

    return rest;
  },

  /**
   * 全局按下事件处理
   */
  handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
    var _this19 = this;

    var $el = this.$el,
        $refs = this.$refs,
        mouseConfig = this.mouseConfig,
        editStore = this.editStore,
        ctxMenuStore = this.ctxMenuStore,
        editOpts = this.editOpts,
        filterStore = this.filterStore,
        getRowNode = this.getRowNode;
    var actived = editStore.actived;
    var ctxWrapper = $refs.ctxWrapper,
        filterWrapper = $refs.filterWrapper,
        validTip = $refs.validTip;

    if (filterWrapper) {
      if (getEventTargetNode(evnt, $el, 'vxe-cell--filter').flag) {// 如果点击了筛选按钮
      } else if (getEventTargetNode(evnt, filterWrapper.$el).flag) {// 如果点击筛选容器
      } else {
        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
          this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter);
        }
      }
    } // 如果已激活了编辑状态


    if (actived.row) {
      if (!(editOpts.autoClear === false)) {
        if (validTip && getEventTargetNode(evnt, validTip.$el).flag) {// 如果是激活状态，且点击了校验提示框
        } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
          // 如果是激活状态，且点击了下拉选项
          if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
            // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
            this.preventEvent(evnt, 'event.clearActived', actived.args, function () {
              var isClear;

              if (editOpts.mode === 'row') {
                var rowNode = getEventTargetNode(evnt, $el, 'vxe-body--row'); // row 方式，如果点击了不同行

                isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== actived.args.row : false;
              } else {
                // cell 方式，如果是非编辑列
                isClear = !getEventTargetNode(evnt, $el, 'col--edit').flag;
              } // 如果点击表头行，则清除激活状态


              if (!isClear) {
                isClear = getEventTargetNode(evnt, $el, 'vxe-header--row').flag;
              } // 如果点击表尾行，则清除激活状态


              if (!isClear) {
                isClear = getEventTargetNode(evnt, $el, 'vxe-footer--row').flag;
              } // 如果固定了高度且点击了行之外的空白处，则清除激活状态


              if (!isClear && _this19.height && !_this19.overflowY) {
                var bodyWrapperElem = evnt.target;

                if (methods_hasClass(bodyWrapperElem, 'vxe-table--body-wrapper')) {
                  isClear = evnt.offsetY < bodyWrapperElem.clientHeight;
                }
              }

              if (isClear || // 如果点击了当前表格之外
              !getEventTargetNode(evnt, $el).flag) {
                requestAnimationFrame(function () {
                  return _this19.clearActived(evnt);
                });
              }
            });
          }
        }
      }
    } else if (mouseConfig) {
      if (!getEventTargetNode(evnt, $el).flag && (!ctxWrapper || !getEventTargetNode(evnt, ctxWrapper.$el).flag)) {
        this.clearSelected();

        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-areas-clear').flag) {
          this.preventEvent(evnt, 'event.clearAreas', {}, function () {
            _this19.clearCellAreas();

            _this19.clearCopyCellArea();
          });
        }
      }
    } // 如果配置了快捷菜单且，点击了其他地方则关闭


    if (ctxMenuStore.visible && ctxWrapper && !getEventTargetNode(evnt, ctxWrapper.$el).flag) {
      this.closeMenu();
    } // 最后激活的表格


    this.isActivated = getEventTargetNode(evnt, (this.$xegrid || this).$el).flag;
  },

  /**
   * 窗口失焦事件处理
   */
  handleGlobalBlurEvent: function handleGlobalBlurEvent() {
    this.closeFilter();
    this.closeMenu();
  },

  /**
   * 全局滚动事件
   */
  handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent() {
    this.clostTooltip();
    this.closeMenu();
  },

  /**
   * 全局键盘事件
   */
  handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
    var _this20 = this;

    // 该行为只对当前激活的表格有效
    if (this.isActivated) {
      this.preventEvent(evnt, 'event.keydown', null, function () {
        var isCtxMenu = _this20.isCtxMenu,
            ctxMenuStore = _this20.ctxMenuStore,
            editStore = _this20.editStore,
            editOpts = _this20.editOpts,
            editConfig = _this20.editConfig,
            _this20$mouseConfig = _this20.mouseConfig,
            mouseConfig = _this20$mouseConfig === void 0 ? {} : _this20$mouseConfig,
            _this20$keyboardConfi = _this20.keyboardConfig,
            keyboardConfig = _this20$keyboardConfi === void 0 ? {} : _this20$keyboardConfi,
            treeConfig = _this20.treeConfig,
            treeOpts = _this20.treeOpts,
            highlightCurrentRow = _this20.highlightCurrentRow,
            currentRow = _this20.currentRow,
            bodyCtxMenu = _this20.bodyCtxMenu;
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
        var isF2 = keyCode === 113;
        var isContextMenu = keyCode === 93;
        var isCtrlKey = evnt.ctrlKey;
        var isShiftKey = evnt.shiftKey;
        var isAltKey = evnt.altKey;
        var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
        var operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);
        var isEditStatus = editConfig && actived.column && actived.row;
        var params;

        if (operCtxMenu) {
          // 如果配置了右键菜单; 支持方向键操作、回车
          evnt.preventDefault();

          if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
            _this20.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
          } else {
            _this20.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, _this20.ctxMenuList);
          }
        } else if (keyboardConfig && _this20.mouseConfig && _this20.mouseOpts.area && _this20.handleKeyboardEvent) {
          _this20.handleKeyboardEvent(evnt);
        } else if (isSpacebar && (keyboardConfig.isArrow || keyboardConfig.isTab) && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'radio')) {
          // 空格键支持选中复选框
          evnt.preventDefault();

          if (selected.column.type === 'checkbox') {
            _this20.handleToggleCheckRowEvent(evnt, selected.args);
          } else {
            _this20.triggerRadioRowEvent(evnt, selected.args);
          }
        } else if (isEsc) {
          // 如果按下了 Esc 键，关闭快捷菜单、筛选
          _this20.closeMenu();

          _this20.closeFilter(); // 如果是激活编辑状态，则取消编辑


          if (actived.row) {
            params = actived.args;

            _this20.clearActived(evnt); // 如果配置了选中功能，则为选中状态


            if (mouseConfig.selected) {
              _this20.$nextTick(function () {
                return _this20.handleSelected(params, evnt);
              });
            }
          }
        } else if (isF2) {
          if (!isEditStatus) {
            // 如果按下了 F2 键
            if (selected.row && selected.column) {
              evnt.preventDefault();

              _this20.handleActived(selected.args, evnt);
            }
          }
        } else if (isContextMenu) {
          // 如果按下上下文键
          _this20._keyCtx = selected.row && selected.column && bodyCtxMenu.length;
          clearTimeout(_this20.keyCtxTimeout);
          _this20.keyCtxTimeout = setTimeout(function () {
            _this20._keyCtx = false;
          }, 1000);
        } else if (isEnter && !isAltKey && keyboardConfig.isEnter && (selected.row || actived.row || treeConfig && highlightCurrentRow && currentRow)) {
          // 退出选中
          if (isCtrlKey) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              params = actived.args;

              _this20.clearActived(evnt); // 如果配置了选中功能，则为选中状态


              if (mouseConfig.selected) {
                _this20.$nextTick(function () {
                  return _this20.handleSelected(params, evnt);
                });
              }
            }
          } else {
            // 如果是激活状态，退则出到上一行/下一行
            if (selected.row || actived.row) {
              if (isShiftKey) {
                if (keyboardConfig.enterToTab) {
                  _this20.moveTabSelected(selected.args, isShiftKey, evnt);
                } else {
                  _this20.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, true, isRightArrow, false, evnt);
                }
              } else {
                if (keyboardConfig.enterToTab) {
                  _this20.moveTabSelected(selected.args, isShiftKey, evnt);
                } else {
                  _this20.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, false, isRightArrow, true, evnt);
                }
              }
            } else if (treeConfig && highlightCurrentRow && currentRow) {
              // 如果是树形表格当前行回车移动到子节点
              var childrens = currentRow[treeOpts.children];

              if (childrens && childrens.length) {
                evnt.preventDefault();
                var targetRow = childrens[0];
                params = {
                  $table: _this20,
                  row: targetRow
                };

                _this20.setTreeExpand(currentRow, true).then(function () {
                  return _this20.scrollToRow(targetRow);
                }).then(function () {
                  return _this20.triggerCurrentRowEvent(evnt, params);
                });
              }
            }
          }
        } else if (operArrow && keyboardConfig.isArrow) {
          if (!isEditStatus) {
            // 如果按下了方向键
            if (selected.row && selected.column) {
              _this20.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
            } else if ((isUpArrow || isDwArrow) && highlightCurrentRow) {
              // 当前行按键上下移动
              _this20.moveCurrentRow(isUpArrow, isDwArrow, evnt);
            }
          }
        } else if (isTab && keyboardConfig.isTab) {
          // 如果按下了 Tab 键切换
          if (selected.row || selected.column) {
            _this20.moveTabSelected(selected.args, isShiftKey, evnt);
          } else if (actived.row || actived.column) {
            _this20.moveTabSelected(actived.args, isShiftKey, evnt);
          }
        } else if (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardConfig.isArrow : isBack)) {
          if (!isEditStatus) {
            // 如果是删除键
            if (keyboardConfig.isDel && (selected.row || selected.column)) {
              methods_setCellValue(selected.row, selected.column, null);

              if (isBack) {
                _this20.handleActived(selected.args, evnt);
              }
            } else if (isBack && keyboardConfig.isArrow && treeConfig && highlightCurrentRow && currentRow) {
              // 如果树形表格回退键关闭当前行返回父节点
              var _XEUtils$findTree = ctor_amd_xe_utils_default.a.findTree(_this20.afterFullData, function (item) {
                return item === currentRow;
              }, treeOpts),
                  parentRow = _XEUtils$findTree.parent;

              if (parentRow) {
                evnt.preventDefault();
                params = {
                  $table: _this20,
                  row: parentRow
                };

                _this20.setTreeExpand(parentRow, false).then(function () {
                  return _this20.scrollToRow(parentRow);
                }).then(function () {
                  return _this20.triggerCurrentRowEvent(evnt, params);
                });
              }
            }
          }
        } else if (keyboardConfig.isEdit && !isCtrlKey && (isSpacebar || keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222)) {
          // 启用编辑后，空格键功能将失效
          // if (isSpacebar) {
          //   evnt.preventDefault()
          // }
          // 如果是按下非功能键之外允许直接编辑
          if (selected.column && selected.row && selected.column.editRender) {
            if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
              if (!editOpts.activeMethod || editOpts.activeMethod(selected.args)) {
                methods_setCellValue(selected.row, selected.column, null);

                _this20.handleActived(selected.args, evnt);
              }
            }
          }
        }

        _this20.emitEvent('keydown', {}, evnt);
      });
    }
  },
  handleGlobalPasteEvent: function handleGlobalPasteEvent(evnt) {
    var isActivated = this.isActivated,
        keyboardConfig = this.keyboardConfig,
        mouseConfig = this.mouseConfig,
        mouseOpts = this.mouseOpts,
        editStore = this.editStore;
    var actived = editStore.actived;

    if (isActivated && !(actived.row || actived.column)) {
      if (keyboardConfig && keyboardConfig.isClip && mouseConfig && mouseOpts.area && this.handlePasteCellAreaEvent) {
        this.handlePasteCellAreaEvent(evnt);
      }
    }
  },
  handleGlobalCopyEvent: function handleGlobalCopyEvent(evnt) {
    var isActivated = this.isActivated,
        keyboardConfig = this.keyboardConfig,
        mouseConfig = this.mouseConfig,
        mouseOpts = this.mouseOpts,
        editStore = this.editStore;
    var actived = editStore.actived;

    if (isActivated && !(actived.row || actived.column)) {
      if (keyboardConfig && keyboardConfig.isClip && mouseConfig && mouseOpts.area && this.handleCopyCellAreaEvent) {
        this.handleCopyCellAreaEvent(evnt);
      }
    }
  },
  handleGlobalCutEvent: function handleGlobalCutEvent(evnt) {
    var isActivated = this.isActivated,
        keyboardConfig = this.keyboardConfig,
        mouseConfig = this.mouseConfig,
        mouseOpts = this.mouseOpts,
        editStore = this.editStore;
    var actived = editStore.actived;

    if (isActivated && !(actived.row || actived.column)) {
      if (keyboardConfig && keyboardConfig.isClip && mouseConfig && mouseOpts.area && this.handleCutCellAreaEvent) {
        this.handleCutCellAreaEvent(evnt);
      }
    }
  },
  handleGlobalResizeEvent: function handleGlobalResizeEvent() {
    this.closeMenu();
    this.recalculate(true);
  },
  handleTooltipLeaveMethod: function handleTooltipLeaveMethod() {
    var _this21 = this;

    var tooltipOpts = this.tooltipOpts;
    setTimeout(function () {
      if (!_this21.tooltipActive) {
        _this21.clostTooltip();
      }
    }, tooltipOpts.leaveDelay);
    return false;
  },
  handleTargetEnterEvent: function handleTargetEnterEvent() {
    clearTimeout(this.tooltipTimeout);
    this.tooltipActive = true;
    this.clostTooltip();
  },
  handleTargetLeaveEvent: function handleTargetLeaveEvent() {
    var _this22 = this;

    var tooltipOpts = this.tooltipOpts;
    this.tooltipActive = false;

    if (tooltipOpts.enterable) {
      this.tooltipTimeout = setTimeout(function () {
        if (!_this22.$refs.tooltip.isHover) {
          _this22.clostTooltip();
        }
      }, tooltipOpts.leaveDelay);
    } else {
      this.clostTooltip();
    }
  },
  triggerHeaderHelpEvent: function triggerHeaderHelpEvent(evnt, params) {
    var column = params.column;
    var titleHelp = column.titleHelp;

    if (titleHelp.message) {
      var $refs = this.$refs,
          tooltipStore = this.tooltipStore;
      var tooltip = $refs.tooltip;
      var content = UtilTools.getFuncText(titleHelp.message);
      this.handleTargetEnterEvent();
      tooltipStore.visible = true;

      if (tooltip) {
        tooltip.toVisible(evnt.currentTarget, content);
      }
    }
  },

  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent: function triggerHeaderTooltipEvent(evnt, params) {
    var tooltipStore = this.tooltipStore;
    var column = params.column;
    var titleElem = evnt.currentTarget;
    this.handleTargetEnterEvent();

    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, titleElem, titleElem, null, params);
    }
  },

  /**
   * 触发单元格 tooltip 事件
   */
  triggerBodyTooltipEvent: function triggerBodyTooltipEvent(evnt, params) {
    var editConfig = this.editConfig,
        editOpts = this.editOpts,
        editStore = this.editStore,
        tooltipStore = this.tooltipStore;
    var actived = editStore.actived;
    var row = params.row,
        column = params.column;
    var cell = evnt.currentTarget;
    this.handleTargetEnterEvent();

    if (editConfig) {
      if (editOpts.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {
        return;
      }
    }

    if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
      var overflowElem;
      var tipElem;

      if (column.treeNode) {
        overflowElem = cell.querySelector('.vxe-tree-cell');

        if (column.type === 'html') {
          tipElem = cell.querySelector('.vxe-cell--html');
        }
      } else {
        tipElem = cell.querySelector(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label');
      }

      this.handleTooltip(evnt, cell, overflowElem || cell.children[0], tipElem, params);
    }
  },

  /**
   * 触发表尾 tooltip 事件
   */
  triggerFooterTooltipEvent: function triggerFooterTooltipEvent(evnt, params) {
    var column = params.column;
    var tooltipStore = this.tooltipStore;
    var cell = evnt.currentTarget;
    this.handleTargetEnterEvent();

    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, cell, cell.querySelector('.vxe-cell--item') || cell.children[0], null, params);
    }
  },

  /**
   * 处理显示 tooltip
   * @param {Event} evnt 事件
   * @param {ColumnInfo} column 列配置
   * @param {Row} row 行对象
   */
  handleTooltip: function handleTooltip(evnt, cell, overflowElem, tipElem, params) {
    params.cell = cell;
    var $refs = this.$refs,
        tooltipOpts = this.tooltipOpts,
        tooltipStore = this.tooltipStore;
    var column = params.column,
        row = params.row;
    var enabled = tooltipOpts.enabled,
        contentMethod = tooltipOpts.contentMethod;
    var tooltip = $refs.tooltip;
    var customContent = contentMethod ? contentMethod(params) : null;
    var useCustom = contentMethod && !ctor_amd_xe_utils_default.a.eqNull(customContent);
    var content = useCustom ? customContent : (column.type === 'html' ? overflowElem.innerText : overflowElem.textContent).trim();
    var isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth;

    if (content && (enabled || useCustom || isCellOverflow)) {
      Object.assign(tooltipStore, {
        row: row,
        column: column,
        visible: true
      });

      if (tooltip) {
        tooltip.toVisible(isCellOverflow ? overflowElem : tipElem || overflowElem, UtilTools.formatText(content));
      }
    }

    return this.$nextTick();
  },

  /**
   * 关闭 tooltip
   */
  clostTooltip: function clostTooltip() {
    var $refs = this.$refs,
        tooltipStore = this.tooltipStore;
    var tooltip = $refs.tooltip;

    if (tooltipStore.visible) {
      Object.assign(tooltipStore, {
        row: null,
        column: null,
        content: null,
        visible: false
      });

      if (tooltip) {
        tooltip.close();
      }
    }

    return this.$nextTick();
  },

  /**
   * 判断复选框是否全选
   */
  isAllCheckboxChecked: function isAllCheckboxChecked() {
    return this.isAllSelected;
  },

  /**
   * 判断复选框是否全选
   */
  isCheckboxIndeterminate: function isCheckboxIndeterminate() {
    return !this.isAllSelected && this.isIndeterminate;
  },

  /**
   * 获取复选框半选状态的行数据
   */
  getCheckboxIndeterminateRecords: function getCheckboxIndeterminateRecords() {
    var treeConfig = this.treeConfig,
        treeIndeterminates = this.treeIndeterminates;

    if (treeConfig) {
      return treeIndeterminates.slice(0);
    }

    return [];
  },

  /**
   * 处理默认勾选
   */
  handleDefaultSelectionChecked: function handleDefaultSelectionChecked() {
    var fullDataRowIdData = this.fullDataRowIdData,
        checkboxOpts = this.checkboxOpts;
    var checkAll = checkboxOpts.checkAll,
        checkRowKeys = checkboxOpts.checkRowKeys;

    if (checkAll) {
      this.setAllCheckboxRow(true);
    } else if (checkRowKeys) {
      var defSelection = [];
      checkRowKeys.forEach(function (rowid) {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row);
        }
      });
      this.setCheckboxRow(defSelection, true);
    }
  },

  /**
   * 用于多选行，设置行为选中状态，第二个参数为选中与否
   * @param {Array/Row} rows 行数据
   * @param {Boolean} value 是否选中
   */
  setCheckboxRow: function setCheckboxRow(rows, value) {
    var _this23 = this;

    if (rows && !ctor_amd_xe_utils_default.a.isArray(rows)) {
      rows = [rows];
    }

    rows.forEach(function (row) {
      return _this23.handleSelectRow({
        row: row
      }, !!value);
    });
    return this.$nextTick();
  },
  isCheckedByCheckboxRow: function isCheckedByCheckboxRow(row) {
    var property = this.checkboxOpts.checkField;

    if (property) {
      return ctor_amd_xe_utils_default.a.get(row, property);
    }

    return this.selection.indexOf(row) > -1;
  },

  /**
   * 多选，行选中事件
   * value 选中true 不选false 不确定-1
   */
  handleSelectRow: function handleSelectRow(_ref4, value) {
    var _this24 = this;

    var row = _ref4.row;
    var selection = this.selection,
        afterFullData = this.afterFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        treeIndeterminates = this.treeIndeterminates,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField,
        checkStrictly = checkboxOpts.checkStrictly,
        checkMethod = checkboxOpts.checkMethod;

    if (property) {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          if (treeIndeterminates.indexOf(row) === -1) {
            treeIndeterminates.push(row);
          }

          ctor_amd_xe_utils_default.a.set(row, property, false);
        } else {
          // 更新子节点状态
          ctor_amd_xe_utils_default.a.eachTree([row], function (item) {
            if (row === item || !checkMethod || checkMethod({
              row: item
            })) {
              ctor_amd_xe_utils_default.a.set(item, property, value);
              ctor_amd_xe_utils_default.a.remove(treeIndeterminates, function (half) {
                return half === item;
              });

              _this24.handleCheckboxReserveRow(row, value);
            }
          }, treeOpts);
        } // 如果存在父节点，更新父节点状态


        var matchObj = ctor_amd_xe_utils_default.a.findTree(afterFullData, function (item) {
          return item === row;
        }, treeOpts);

        if (matchObj && matchObj.parent) {
          var parentStatus;
          var vItems = checkMethod ? matchObj.items.filter(function (item) {
            return checkMethod({
              row: item
            });
          }) : matchObj.items;
          var indeterminatesItem = ctor_amd_xe_utils_default.a.find(matchObj.items, function (item) {
            return treeIndeterminates.indexOf(item) > -1;
          });

          if (indeterminatesItem) {
            parentStatus = -1;
          } else {
            var selectItems = matchObj.items.filter(function (item) {
              return ctor_amd_xe_utils_default.a.get(item, property);
            });
            parentStatus = selectItems.filter(function (item) {
              return vItems.indexOf(item) > -1;
            }).length === vItems.length ? true : selectItems.length || value === -1 ? -1 : false;
          }

          return this.handleSelectRow({
            row: matchObj.parent
          }, parentStatus);
        }
      } else {
        if (!checkMethod || checkMethod({
          row: row
        })) {
          ctor_amd_xe_utils_default.a.set(row, property, value);
          this.handleCheckboxReserveRow(row, value);
        }
      }
    } else {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          if (treeIndeterminates.indexOf(row) === -1) {
            treeIndeterminates.push(row);
          }

          ctor_amd_xe_utils_default.a.remove(selection, function (item) {
            return item === row;
          });
        } else {
          // 更新子节点状态
          ctor_amd_xe_utils_default.a.eachTree([row], function (item) {
            if (row === item || !checkMethod || checkMethod({
              row: item
            })) {
              if (value) {
                selection.push(item);
              } else {
                ctor_amd_xe_utils_default.a.remove(selection, function (select) {
                  return select === item;
                });
              }

              ctor_amd_xe_utils_default.a.remove(treeIndeterminates, function (half) {
                return half === item;
              });

              _this24.handleCheckboxReserveRow(row, value);
            }
          }, treeOpts);
        } // 如果存在父节点，更新父节点状态


        var _matchObj = ctor_amd_xe_utils_default.a.findTree(afterFullData, function (item) {
          return item === row;
        }, treeOpts);

        if (_matchObj && _matchObj.parent) {
          var _parentStatus;

          var _vItems = checkMethod ? _matchObj.items.filter(function (item) {
            return checkMethod({
              row: item
            });
          }) : _matchObj.items;

          var _indeterminatesItem = ctor_amd_xe_utils_default.a.find(_matchObj.items, function (item) {
            return treeIndeterminates.indexOf(item) > -1;
          });

          if (_indeterminatesItem) {
            _parentStatus = -1;
          } else {
            var _selectItems = _matchObj.items.filter(function (item) {
              return selection.indexOf(item) > -1;
            });

            _parentStatus = _selectItems.filter(function (item) {
              return _vItems.indexOf(item) > -1;
            }).length === _vItems.length ? true : _selectItems.length || value === -1 ? -1 : false;
          }

          return this.handleSelectRow({
            row: _matchObj.parent
          }, _parentStatus);
        }
      } else {
        if (!checkMethod || checkMethod({
          row: row
        })) {
          if (value) {
            if (selection.indexOf(row) === -1) {
              selection.push(row);
            }
          } else {
            ctor_amd_xe_utils_default.a.remove(selection, function (item) {
              return item === row;
            });
          }

          this.handleCheckboxReserveRow(row, value);
        }
      }
    }

    this.checkSelectionStatus();
  },
  handleToggleCheckRowEvent: function handleToggleCheckRowEvent(evnt, params) {
    var selection = this.selection,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField;
    var row = params.row;
    var value = property ? !ctor_amd_xe_utils_default.a.get(row, property) : selection.indexOf(row) === -1;

    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, value);
    } else {
      this.handleSelectRow(params, value);
    }
  },
  triggerCheckRowEvent: function triggerCheckRowEvent(evnt, params, value) {
    var checkMethod = this.checkboxOpts.checkMethod;

    if (!checkMethod || checkMethod({
      row: params.row
    })) {
      this.handleSelectRow(params, value);
      this.emitEvent('checkbox-change', Object.assign({
        records: this.getCheckboxRecords(),
        reserves: this.getCheckboxReserveRecords(),
        indeterminates: this.getCheckboxIndeterminateRecords(),
        checked: value
      }, params), evnt);
    }
  },

  /**
   * 多选，切换某一行的选中状态
   */
  toggleCheckboxRow: function toggleCheckboxRow(row) {
    this.handleToggleCheckRowEvent(null, {
      row: row
    });
    return this.$nextTick();
  },

  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllCheckboxRow: function setAllCheckboxRow(value) {
    var _this25 = this;

    var afterFullData = this.afterFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        selection = this.selection,
        checkboxReserveRowMap = this.checkboxReserveRowMap,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField,
        reserve = checkboxOpts.reserve,
        checkStrictly = checkboxOpts.checkStrictly,
        checkMethod = checkboxOpts.checkMethod;
    var selectRows = [];
    var beforeSelection = treeConfig ? [] : selection.filter(function (row) {
      return afterFullData.indexOf(row) === -1;
    });

    if (checkStrictly) {
      this.isAllSelected = value;
    } else {
      /**
       * 绑定属性方式（高性能，有污染）
       * 必须在行数据存在对应的属性，否则将不响应
       */
      if (property) {
        var checkValFn = function checkValFn(row) {
          if (!checkMethod || checkMethod({
            row: row
          })) {
            if (value) {
              selectRows.push(row);
            }

            ctor_amd_xe_utils_default.a.set(row, property, value);
          }
        }; // 如果存在选中方法
        // 如果方法成立，则更新值，否则忽略该数据


        if (treeConfig) {
          ctor_amd_xe_utils_default.a.eachTree(afterFullData, checkValFn, treeOpts);
        } else {
          afterFullData.forEach(checkValFn);
        }
      } else {
        /**
         * 默认方式（低性能，无污染）
         * 无需任何属性，直接绑定
         */
        if (treeConfig) {
          if (value) {
            /**
             * 如果是树勾选
             * 如果方法成立，则添加到临时集合中
             */
            ctor_amd_xe_utils_default.a.eachTree(afterFullData, function (row) {
              if (!checkMethod || checkMethod({
                row: row
              })) {
                selectRows.push(row);
              }
            }, treeOpts);
          } else {
            /**
             * 如果是树取消
             * 如果方法成立，则不添加到临时集合中
             */
            if (checkMethod) {
              ctor_amd_xe_utils_default.a.eachTree(afterFullData, function (row) {
                if (checkMethod({
                  row: row
                }) ? 0 : selection.indexOf(row) > -1) {
                  selectRows.push(row);
                }
              }, treeOpts);
            }
          }
        } else {
          if (value) {
            /**
             * 如果是行勾选
             * 如果存在选中方法且成立或者本身已勾选，则添加到临时集合中
             * 如果不存在选中方法，则添加所有数据到临时集合中
             */
            if (checkMethod) {
              selectRows = afterFullData.filter(function (row) {
                return selection.indexOf(row) > -1 || checkMethod({
                  row: row
                });
              });
            } else {
              selectRows = afterFullData.slice(0);
            }
          } else {
            /**
             * 如果是行取消
             * 如果方法成立，则不添加到临时集合中；如果方法不成立则判断当前是否已勾选，如果已被勾选则添加到新集合中
             * 如果不存在选中方法，无需处理，临时集合默认为空
             */
            if (checkMethod) {
              selectRows = afterFullData.filter(function (row) {
                return checkMethod({
                  row: row
                }) ? 0 : selection.indexOf(row) > -1;
              });
            }
          }
        }
      }

      if (reserve) {
        if (value) {
          selectRows.forEach(function (row) {
            checkboxReserveRowMap[methods_getRowid(_this25, row)] = row;
          });
        } else {
          afterFullData.forEach(function (row) {
            return _this25.handleCheckboxReserveRow(row, false);
          });
        }
      }

      this.selection = property ? [] : beforeSelection.concat(selectRows);
    }

    this.treeIndeterminates = [];
    this.checkSelectionStatus();
  },
  checkSelectionStatus: function checkSelectionStatus() {
    var afterFullData = this.afterFullData,
        selection = this.selection,
        treeIndeterminates = this.treeIndeterminates,
        checkboxOpts = this.checkboxOpts,
        treeConfig = this.treeConfig;
    var checkField = checkboxOpts.checkField,
        halfField = checkboxOpts.halfField,
        checkStrictly = checkboxOpts.checkStrictly,
        checkMethod = checkboxOpts.checkMethod;

    if (!checkStrictly) {
      var isAllSelected = false;
      var isIndeterminate = false;

      if (checkField) {
        isAllSelected = afterFullData.length && afterFullData.every(checkMethod ? function (row) {
          return !checkMethod({
            row: row
          }) || ctor_amd_xe_utils_default.a.get(row, checkField);
        } : function (row) {
          return ctor_amd_xe_utils_default.a.get(row, checkField);
        });

        if (treeConfig) {
          if (halfField) {
            isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
              return ctor_amd_xe_utils_default.a.get(row, checkField) || ctor_amd_xe_utils_default.a.get(row, halfField) || treeIndeterminates.indexOf(row) > -1;
            });
          } else {
            isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
              return ctor_amd_xe_utils_default.a.get(row, checkField) || treeIndeterminates.indexOf(row) > -1;
            });
          }
        } else {
          if (halfField) {
            isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
              return ctor_amd_xe_utils_default.a.get(row, checkField) || ctor_amd_xe_utils_default.a.get(row, halfField);
            });
          } else {
            isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
              return ctor_amd_xe_utils_default.a.get(row, checkField);
            });
          }
        }
      } else {
        isAllSelected = afterFullData.length && afterFullData.every(checkMethod ? function (row) {
          return !checkMethod({
            row: row
          }) || selection.indexOf(row) > -1;
        } : function (row) {
          return selection.indexOf(row) > -1;
        });

        if (treeConfig) {
          isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
            return treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1;
          });
        } else {
          isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
            return selection.indexOf(row) > -1;
          });
        }
      }

      this.isAllSelected = isAllSelected;
      this.isIndeterminate = isIndeterminate;
    }
  },
  // 还原展开、选中等相关状态
  handleReserveStatus: function handleReserveStatus() {
    var expandColumn = this.expandColumn,
        treeOpts = this.treeOpts,
        treeConfig = this.treeConfig,
        fullDataRowIdData = this.fullDataRowIdData,
        fullAllDataRowMap = this.fullAllDataRowMap,
        currentRow = this.currentRow,
        selectRow = this.selectRow,
        radioReserveRow = this.radioReserveRow,
        radioOpts = this.radioOpts,
        checkboxOpts = this.checkboxOpts,
        selection = this.selection,
        rowExpandeds = this.rowExpandeds,
        treeExpandeds = this.treeExpandeds,
        expandOpts = this.expandOpts; // 单选框

    if (selectRow && !fullAllDataRowMap.has(selectRow)) {
      this.selectRow = null; // 刷新单选行状态
    } // 还原保留选中状态


    if (radioOpts.reserve && radioReserveRow) {
      var rowid = methods_getRowid(this, radioReserveRow);

      if (fullDataRowIdData[rowid]) {
        this.setRadioRow(fullDataRowIdData[rowid].row);
      }
    } // 复选框


    this.selection = getRecoverRow(this, selection); // 刷新多选行状态
    // 还原保留选中状态

    if (checkboxOpts.reserve) {
      this.setCheckboxRow(handleReserveRow(this, this.checkboxReserveRowMap), true);
    }

    if (currentRow && !fullAllDataRowMap.has(currentRow)) {
      this.currentRow = null; // 刷新当前行状态
    } // 行展开


    this.rowExpandeds = expandColumn ? getRecoverRow(this, rowExpandeds) : []; // 刷新行展开状态
    // 还原保留状态

    if (expandColumn && expandOpts.reserve) {
      this.setRowExpand(handleReserveRow(this, this.rowExpandedReserveRowMap), true);
    } // 树展开


    this.treeExpandeds = treeConfig ? getRecoverRow(this, treeExpandeds) : []; // 刷新树展开状态

    if (treeConfig && treeOpts.reserve) {
      this.setTreeExpand(handleReserveRow(this, this.treeExpandedReserveRowMap), true);
    }
  },

  /**
   * 获取单选框保留选中的行
   */
  getRadioReserveRecord: function getRadioReserveRecord() {
    var fullDataRowIdData = this.fullDataRowIdData,
        radioReserveRow = this.radioReserveRow,
        radioOpts = this.radioOpts;

    if (radioOpts.reserve && radioReserveRow) {
      if (!fullDataRowIdData[methods_getRowid(this, radioReserveRow)]) {
        return radioReserveRow;
      }
    }

    return null;
  },
  clearRadioReserve: function clearRadioReserve() {
    this.radioReserveRow = null;
    return this.$nextTick();
  },
  handleRadioReserveRow: function handleRadioReserveRow(row) {
    var radioOpts = this.radioOpts;

    if (radioOpts.reserve) {
      this.radioReserveRow = row;
    }
  },

  /**
   * 获取复选框保留选中的行
   */
  getCheckboxReserveRecords: function getCheckboxReserveRecords() {
    var fullDataRowIdData = this.fullDataRowIdData,
        checkboxReserveRowMap = this.checkboxReserveRowMap,
        checkboxOpts = this.checkboxOpts;
    var reserveSelection = [];

    if (checkboxOpts.reserve) {
      ctor_amd_xe_utils_default.a.each(checkboxReserveRowMap, function (row, rowid) {
        if (row && !fullDataRowIdData[rowid]) {
          reserveSelection.push(row);
        }
      });
    }

    return reserveSelection;
  },
  clearCheckboxReserve: function clearCheckboxReserve() {
    this.checkboxReserveRowMap = {};
    return this.$nextTick();
  },
  handleCheckboxReserveRow: function handleCheckboxReserveRow(row, checked) {
    var checkboxReserveRowMap = this.checkboxReserveRowMap,
        checkboxOpts = this.checkboxOpts;

    if (checkboxOpts.reserve) {
      var rowid = methods_getRowid(this, row);

      if (checked) {
        checkboxReserveRowMap[rowid] = row;
      } else if (checkboxReserveRowMap[rowid]) {
        delete checkboxReserveRowMap[rowid];
      }
    }
  },

  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent: function triggerCheckAllEvent(evnt, value) {
    this.setAllCheckboxRow(value);
    this.emitEvent('checkbox-all', {
      records: this.getCheckboxRecords(),
      reserves: this.getCheckboxReserveRecords(),
      indeterminates: this.getCheckboxIndeterminateRecords(),
      checked: value
    }, evnt);
  },

  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllCheckboxRow: function toggleAllCheckboxRow() {
    this.triggerCheckAllEvent(null, !this.isAllSelected);
    return this.$nextTick();
  },

  /**
   * 用于多选行，手动清空用户的选择
   * 清空行为不管是否被禁用还是保留记录，都将彻底清空选中状态
   */
  clearCheckboxRow: function clearCheckboxRow() {
    var _this26 = this;

    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField,
        reserve = checkboxOpts.reserve;

    if (property) {
      if (treeConfig) {
        ctor_amd_xe_utils_default.a.eachTree(tableFullData, function (item) {
          return ctor_amd_xe_utils_default.a.set(item, property, false);
        }, treeOpts);
      } else {
        tableFullData.forEach(function (item) {
          return ctor_amd_xe_utils_default.a.set(item, property, false);
        });
      }
    }

    if (reserve) {
      tableFullData.forEach(function (row) {
        return _this26.handleCheckboxReserveRow(row, false);
      });
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
  handleDefaultRadioChecked: function handleDefaultRadioChecked() {
    var radioOpts = this.radioOpts,
        fullDataRowIdData = this.fullDataRowIdData;
    var rowid = radioOpts.checkRowKey,
        reserve = radioOpts.reserve;

    if (rowid) {
      if (fullDataRowIdData[rowid]) {
        this.setRadioRow(fullDataRowIdData[rowid].row);
      }

      if (reserve) {
        var rowkey = getRowkey(this);
        this.radioReserveRow = _defineProperty({}, rowkey, rowid);
      }
    }
  },

  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent: function triggerRadioRowEvent(evnt, params) {
    var isChange = this.selectRow !== params.row;
    this.setRadioRow(params.row);

    if (isChange) {
      this.emitEvent('radio-change', params, evnt);
    }
  },
  triggerCurrentRowEvent: function triggerCurrentRowEvent(evnt, params) {
    var isChange = this.currentRow !== params.row;
    this.setCurrentRow(params.row);

    if (isChange) {
      this.emitEvent('current-change', params, evnt);
    }
  },

  /**
   * 用于当前行，设置某一行为高亮状态
   * @param {Row} row 行对象
   */
  setCurrentRow: function setCurrentRow(row) {
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.currentRow = row;

    if (this.highlightCurrentRow) {
      ctor_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(methods_getRowid(this, row), "\"]")), function (elem) {
        return addClass(elem, 'row--current');
      });
    }

    return this.$nextTick();
  },
  isCheckedByRadioRow: function isCheckedByRadioRow(row) {
    return this.selectRow === row;
  },

  /**
   * 用于单选行，设置某一行为选中状态
   * @param {Row} row 行对象
   */
  setRadioRow: function setRadioRow(row) {
    var radioOpts = this.radioOpts;
    var checkMethod = radioOpts.checkMethod;

    if (row && (!checkMethod || checkMethod({
      row: row
    }))) {
      this.selectRow = row;
      this.handleRadioReserveRow(row);
    }

    return this.$nextTick();
  },

  /**
   * 用于当前行，手动清空当前高亮的状态
   */
  clearCurrentRow: function clearCurrentRow() {
    this.currentRow = null;
    this.hoverRow = null;
    ctor_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll('.row--current'), function (elem) {
      return methods_removeClass(elem, 'row--current');
    });
    return this.$nextTick();
  },

  /**
   * 用于单选行，手动清空用户的选择
   */
  clearRadioRow: function clearRadioRow() {
    this.selectRow = null;
    return this.$nextTick();
  },

  /**
   * 用于当前行，获取当前行的数据
   */
  getCurrentRecord: function getCurrentRecord() {
    return this.highlightCurrentRow ? this.currentRow : null;
  },

  /**
   * 用于单选行，获取当已选中的数据
   */
  getRadioRecord: function getRadioRecord() {
    return this.selectRow;
  },

  /**
   * 行 hover 事件
   */
  triggerHoverEvent: function triggerHoverEvent(evnt, _ref5) {
    var row = _ref5.row;
    this.setHoverRow(row);
  },
  setHoverRow: function setHoverRow(row) {
    var rowid = methods_getRowid(this, row);
    this.clearHoverRow();
    ctor_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(rowid, "\"]")), function (elem) {
      return addClass(elem, 'row--hover');
    });
    this.hoverRow = row;
  },
  clearHoverRow: function clearHoverRow() {
    ctor_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll('.vxe-body--row.row--hover'), function (elem) {
      return methods_removeClass(elem, 'row--hover');
    });
    this.hoverRow = null;
  },
  triggerHeaderCellClickEvent: function triggerHeaderCellClickEvent(evnt, params) {
    var _lastResizeTime = this._lastResizeTime,
        sortOpts = this.sortOpts;
    var column = params.column;
    var cell = evnt.currentTarget;

    var triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300;

    var triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag;
    var triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag;

    if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
      this.triggerSortEvent(evnt, column, getNextSortOrder(this, column));
    }

    this.emitEvent('header-cell-click', Object.assign({
      triggerResizable: triggerResizable,
      triggerSort: triggerSort,
      triggerFilter: triggerFilter,
      cell: cell
    }, params), evnt);

    if (this.highlightCurrentColumn) {
      return this.setCurrentColumn(column);
    }

    return this.$nextTick();
  },
  triggerHeaderCellDBLClickEvent: function triggerHeaderCellDBLClickEvent(evnt, params) {
    this.emitEvent('header-cell-dblclick', Object.assign({
      cell: evnt.currentTarget
    }, params), evnt);
  },
  getCurrentColumn: function getCurrentColumn() {
    return this.highlightCurrentColumn ? this.currentColumn : null;
  },

  /**
   * 用于当前列，设置某列行为高亮状态
   * @param {ColumnInfo} column 列配置
   */
  setCurrentColumn: function setCurrentColumn(column) {
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.currentColumn = column;
    return this.$nextTick();
  },

  /**
   * 用于当前列，手动清空当前高亮的状态
   */
  clearCurrentColumn: function clearCurrentColumn() {
    this.currentColumn = null;
    return this.$nextTick();
  },
  checkValidate: function checkValidate(type) {
    if (v_x_e_table._valid) {
      return this.triggerValidate(type);
    }

    return this.$nextTick();
  },

  /**
   * 当单元格发生改变时
   * 如果存在规则，则校验
   */
  handleChangeCell: function handleChangeCell(evnt, params) {
    var _this27 = this;

    this.checkValidate('blur').catch(function (e) {
      return e;
    }).then(function () {
      _this27.handleActived(params, evnt).then(function () {
        return _this27.checkValidate('change');
      }).catch(function (e) {
        return e;
      });
    });
  },

  /**
   * 列点击事件
   * 如果是单击模式，则激活为编辑状态
   * 如果是双击模式，则单击后选中状态
   */
  triggerCellClickEvent: function triggerCellClickEvent(evnt, params) {
    var highlightCurrentRow = this.highlightCurrentRow,
        editStore = this.editStore,
        radioOpts = this.radioOpts,
        expandOpts = this.expandOpts,
        treeOpts = this.treeOpts,
        editConfig = this.editConfig,
        editOpts = this.editOpts,
        checkboxOpts = this.checkboxOpts;
    var actived = editStore.actived;
    var _params = params,
        row = _params.row,
        column = _params.column;
    var type = column.type,
        treeNode = column.treeNode;
    var isRadioType = type === 'radio';
    var isCheckboxType = type === 'checkbox';
    var isExpandType = type === 'expand';
    var cell = evnt.currentTarget;
    var triggerRadio = isRadioType && getEventTargetNode(evnt, cell, 'vxe-cell--radio').flag;
    var triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag;
    var triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-tree--btn-wrapper').flag;
    var triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-table--expanded').flag;
    params = Object.assign({
      cell: cell,
      triggerRadio: triggerRadio,
      triggerCheckbox: triggerCheckbox,
      triggerTreeNode: triggerTreeNode,
      triggerExpandNode: triggerExpandNode
    }, params); // 如果是展开行

    if (!triggerExpandNode && (expandOpts.trigger === 'row' || isExpandType && expandOpts.trigger === 'cell')) {
      this.triggerRowExpandEvent(evnt, params);
    } // 如果是树形表格


    if (treeOpts.trigger === 'row' || treeNode && treeOpts.trigger === 'cell') {
      this.triggerTreeExpandEvent(evnt, params);
    } // 如果点击了树节点


    if (!triggerTreeNode) {
      if (!triggerExpandNode) {
        // 如果是高亮行
        if (highlightCurrentRow) {
          if (!triggerCheckbox && !triggerRadio) {
            this.triggerCurrentRowEvent(evnt, params);
          }
        } // 如果是单选框


        if (!triggerRadio && (radioOpts.trigger === 'row' || isRadioType && radioOpts.trigger === 'cell')) {
          this.triggerRadioRowEvent(evnt, params);
        } // 如果是复选框


        if (!triggerCheckbox && (checkboxOpts.trigger === 'row' || isCheckboxType && checkboxOpts.trigger === 'cell')) {
          this.handleToggleCheckRowEvent(evnt, params);
        }
      } // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）


      if (editConfig) {
        if (editOpts.trigger === 'manual') {
          if (actived.args && actived.row === row && column !== actived.column) {
            this.handleChangeCell(evnt, params);
          }
        } else if (!actived.args || row !== actived.row || column !== actived.column) {
          if (editOpts.trigger === 'click') {
            this.handleChangeCell(evnt, params);
          } else if (editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row' && actived.row === row) {
              this.handleChangeCell(evnt, params);
            }
          }
        }
      }
    }

    this.emitEvent('cell-click', params, evnt);
  },

  /**
   * 列双击点击事件
   * 如果是双击模式，则激活为编辑状态
   */
  triggerCellDBLClickEvent: function triggerCellDBLClickEvent(evnt, params) {
    var _this28 = this;

    var editStore = this.editStore,
        editConfig = this.editConfig,
        editOpts = this.editOpts;
    var actived = editStore.actived;
    var cell = evnt.currentTarget;
    params.cell = cell;

    if (editConfig && editOpts.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editOpts.mode === 'row') {
          this.checkValidate('blur').catch(function (e) {
            return e;
          }).then(function () {
            _this28.handleActived(params, evnt).then(function () {
              return _this28.checkValidate('change');
            }).catch(function (e) {
              return e;
            });
          });
        } else if (editOpts.mode === 'cell') {
          this.handleActived(params, evnt).then(function () {
            return _this28.checkValidate('change');
          }).catch(function (e) {
            return e;
          });
        }
      }
    }

    this.emitEvent('cell-dblclick', params, evnt);
  },
  handleDefaultSort: function handleDefaultSort() {
    var defaultSort = this.sortOpts.defaultSort;

    if (defaultSort) {
      var field = defaultSort.field,
          order = defaultSort.order;

      if (field && order) {
        var column = ctor_amd_xe_utils_default.a.find(this.visibleColumn, function (item) {
          return item.property === field;
        });

        if (column && !column.order) {
          this.sort(field, order);
        }
      }
    }
  },

  /**
   * 点击排序事件
   */
  triggerSortEvent: function triggerSortEvent(evnt, column, order) {
    var property = column.property;

    if (column.sortable || column.remoteSort) {
      var params = {
        column: column,
        property: property,
        order: order,
        sortBy: column.sortBy
      };

      if (!order || column.order === order) {
        params.order = null;
        this.clearSort();
      } else {
        this.sort(property, order);
      }

      this.emitEvent('sort-change', params, evnt);
    }
  },
  sort: function sort(field, order) {
    var tableFullColumn = this.tableFullColumn,
        sortOpts = this.sortOpts;
    var column = this.getColumnByField(field);

    if (column) {
      var isRemote = ctor_amd_xe_utils_default.a.isBoolean(column.remoteSort) ? column.remoteSort : sortOpts.remote;

      if (column.sortable || column.remoteSort) {
        if (arguments.length <= 1) {
          order = getNextSortOrder(this, column);
        }

        if (column.order !== order) {
          tableFullColumn.forEach(function (column) {
            column.order = null;
          });
          column.order = order; // 如果是服务端排序，则跳过本地排序处理

          if (!isRemote) {
            this.handleTableData(true);
          }
        }

        return this.$nextTick().then(this.updateStyle);
      }
    }

    return this.$nextTick();
  },

  /**
   * 手动清空排序条件，数据会恢复成未排序的状态
   */
  clearSort: function clearSort() {
    this.tableFullColumn.forEach(function (column) {
      column.order = null;
    });
    return this.handleTableData(true);
  },
  getSortColumn: function getSortColumn() {
    return ctor_amd_xe_utils_default.a.find(this.visibleColumn, function (column) {
      return column.sortable && column.order;
    });
  },

  /**
   * 关闭筛选
   * @param {Event} evnt 事件
   */
  closeFilter: function closeFilter() {
    Object.assign(this.filterStore, {
      isAllSelected: false,
      isIndeterminate: false,
      options: [],
      visible: false
    });
    return this.$nextTick();
  },

  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param {String} field 字段名
   */
  isFilter: function isFilter(field) {
    if (field) {
      var column = this.getColumnByField(field);
      return column && column.filters && column.filters.some(function (option) {
        return option.checked;
      });
    }

    return this.visibleColumn.some(function (column) {
      return column.filters && column.filters.some(function (option) {
        return option.checked;
      });
    });
  },

  /**
   * 判断展开行是否懒加载完成
   * @param {Row} row 行对象
   */
  isRowExpandLoaded: function isRowExpandLoaded(row) {
    var rest = this.fullAllDataRowMap.get(row);
    return rest && rest.expandLoaded;
  },
  clearRowExpandLoaded: function clearRowExpandLoaded(row) {
    var expandOpts = this.expandOpts,
        expandLazyLoadeds = this.expandLazyLoadeds,
        fullAllDataRowMap = this.fullAllDataRowMap;
    var lazy = expandOpts.lazy;
    var rest = fullAllDataRowMap.get(row);

    if (lazy && rest) {
      rest.expandLoaded = false;
      ctor_amd_xe_utils_default.a.remove(expandLazyLoadeds, function (item) {
        return row === item;
      });
    }

    return this.$nextTick();
  },

  /**
   * 重新加载展开行的内容
   * @param {Row} row 行对象
   */
  reloadExpandContent: function reloadExpandContent(row) {
    var _this29 = this;

    var expandOpts = this.expandOpts,
        expandLazyLoadeds = this.expandLazyLoadeds;
    var lazy = expandOpts.lazy;

    if (lazy && expandLazyLoadeds.indexOf(row) === -1) {
      this.clearRowExpandLoaded(row).then(function () {
        return _this29.handleAsyncRowExpand(row);
      });
    }

    return this.$nextTick();
  },

  /**
   * 展开行事件
   */
  triggerRowExpandEvent: function triggerRowExpandEvent(evnt, params) {
    var expandOpts = this.expandOpts,
        expandLazyLoadeds = this.expandLazyLoadeds,
        column = this.expandColumn;
    var row = params.row;
    var lazy = expandOpts.lazy;

    if (!lazy || expandLazyLoadeds.indexOf(row) === -1) {
      var expanded = !this.isExpandByRow(row);
      var columnIndex = this.getColumnIndex(column);
      var $columnIndex = this.$getColumnIndex(column);
      this.setRowExpand(row, expanded);
      this.emitEvent('toggle-row-expand', {
        expanded: expanded,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        row: row,
        rowIndex: this.getRowIndex(row),
        $rowIndex: this.$getRowIndex(row)
      }, evnt);
    }
  },

  /**
   * 切换展开行
   */
  toggleRowExpand: function toggleRowExpand(row) {
    return this.setRowExpand(row, !this.isExpandByRow(row));
  },

  /**
   * 处理默认展开行
   */
  handleDefaultRowExpand: function handleDefaultRowExpand() {
    var expandOpts = this.expandOpts,
        fullDataRowIdData = this.fullDataRowIdData;
    var expandAll = expandOpts.expandAll,
        expandRowKeys = expandOpts.expandRowKeys;

    if (expandAll) {
      this.setAllRowExpand(true);
    } else if (expandRowKeys) {
      var defExpandeds = [];
      expandRowKeys.forEach(function (rowid) {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row);
        }
      });
      this.setRowExpand(defExpandeds, true);
    }
  },

  /**
   * 设置所有行的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllRowExpand: function setAllRowExpand(expanded) {
    return this.setRowExpand(this.expandOpts.lazy ? this.tableData : this.tableFullData, expanded);
  },
  handleAsyncRowExpand: function handleAsyncRowExpand(row) {
    var _this30 = this;

    var rest = this.fullAllDataRowMap.get(row);
    return new Promise(function (resolve) {
      _this30.expandLazyLoadeds.push(row);

      _this30.expandOpts.loadMethod({
        $table: _this30,
        row: row,
        rowIndex: _this30.getRowIndex(row),
        $rowIndex: _this30.$getRowIndex(row)
      }).catch(function (e) {
        return e;
      }).then(function () {
        rest.expandLoaded = true;
        ctor_amd_xe_utils_default.a.remove(_this30.expandLazyLoadeds, function (item) {
          return item === row;
        });

        _this30.rowExpandeds.push(row);

        resolve(_this30.$nextTick().then(_this30.recalculate));
      });
    });
  },

  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setRowExpand: function setRowExpand(rows, expanded) {
    var _this31 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        expandLazyLoadeds = this.expandLazyLoadeds,
        expandOpts = this.expandOpts,
        column = this.expandColumn;
    var rowExpandeds = this.rowExpandeds;
    var reserve = expandOpts.reserve,
        lazy = expandOpts.lazy,
        accordion = expandOpts.accordion,
        toggleMethod = expandOpts.toggleMethod;
    var lazyRests = [];
    var columnIndex = this.getColumnIndex(column);
    var $columnIndex = this.$getColumnIndex(column);

    if (rows) {
      if (!ctor_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      }

      if (accordion) {
        // 只能同时展开一个
        rowExpandeds = [];
        rows = rows.slice(rows.length - 1, rows.length);
      }

      var validRows = toggleMethod ? rows.filter(function (row) {
        return toggleMethod({
          expanded: expanded,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          row: row,
          rowIndex: _this31.getRowIndex(row),
          $rowIndex: _this31.$getRowIndex(row)
        });
      }) : rows;

      if (expanded) {
        validRows.forEach(function (row) {
          if (rowExpandeds.indexOf(row) === -1) {
            var rest = fullAllDataRowMap.get(row);
            var isLoad = lazy && !rest.expandLoaded && expandLazyLoadeds.indexOf(row) === -1;

            if (isLoad) {
              lazyRests.push(_this31.handleAsyncRowExpand(row));
            } else {
              rowExpandeds.push(row);
            }
          }
        });
      } else {
        ctor_amd_xe_utils_default.a.remove(rowExpandeds, function (row) {
          return validRows.indexOf(row) > -1;
        });
      }

      if (reserve) {
        validRows.forEach(function (row) {
          return _this31.handleRowExpandReserve(row, expanded);
        });
      }
    }

    this.rowExpandeds = rowExpandeds;
    return Promise.all(lazyRests).then(this.recalculate);
  },

  /**
   * 判断行是否为展开状态
   * @param {Row} row 行对象
   */
  isExpandByRow: function isExpandByRow(row) {
    return this.rowExpandeds.indexOf(row) > -1;
  },

  /**
   * 手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand: function clearRowExpand() {
    var _this32 = this;

    var expandOpts = this.expandOpts,
        rowExpandeds = this.rowExpandeds,
        tableFullData = this.tableFullData;
    var reserve = expandOpts.reserve;
    var isExists = rowExpandeds.length;
    this.rowExpandeds = [];

    if (reserve) {
      tableFullData.forEach(function (row) {
        return _this32.handleRowExpandReserve(row, false);
      });
    }

    return this.$nextTick().then(function () {
      if (isExists) {
        _this32.recalculate();
      }
    });
  },
  clearRowExpandReserve: function clearRowExpandReserve() {
    this.rowExpandedReserveRowMap = {};
    return this.$nextTick();
  },
  handleRowExpandReserve: function handleRowExpandReserve(row, expanded) {
    var rowExpandedReserveRowMap = this.rowExpandedReserveRowMap,
        expandOpts = this.expandOpts;

    if (expandOpts.reserve) {
      var rowid = methods_getRowid(this, row);

      if (expanded) {
        rowExpandedReserveRowMap[rowid] = row;
      } else if (rowExpandedReserveRowMap[rowid]) {
        delete rowExpandedReserveRowMap[rowid];
      }
    }
  },
  getRowExpandRecords: function getRowExpandRecords() {
    return this.rowExpandeds.slice(0);
  },
  getTreeExpandRecords: function getTreeExpandRecords() {
    return this.treeExpandeds.slice(0);
  },

  /**
   * 获取数表格状态
   */
  getTreeStatus: function getTreeStatus() {
    if (this.treeConfig) {
      return {
        config: this.treeOpts,
        rowExpandeds: this.getTreeExpandRecords()
      };
    }

    return null;
  },

  /**
   * 判断树节点是否懒加载完成
   * @param {Row} row 行对象
   */
  isTreeExpandLoaded: function isTreeExpandLoaded(row) {
    var rest = this.fullAllDataRowMap.get(row);
    return rest && rest.treeLoaded;
  },
  clearTreeExpandLoaded: function clearTreeExpandLoaded(row) {
    var treeOpts = this.treeOpts,
        treeExpandeds = this.treeExpandeds,
        fullAllDataRowMap = this.fullAllDataRowMap;
    var lazy = treeOpts.lazy;
    var rest = fullAllDataRowMap.get(row);

    if (lazy && rest) {
      rest.treeLoaded = false;
      ctor_amd_xe_utils_default.a.remove(treeExpandeds, function (item) {
        return row === item;
      });
    }

    return this.$nextTick();
  },

  /**
   * 重新加载树的子节点
   * @param {Row} row 行对象
   */
  reloadTreeChilds: function reloadTreeChilds(row) {
    var _this33 = this;

    var treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds;
    var lazy = treeOpts.lazy,
        hasChild = treeOpts.hasChild;

    if (lazy && row[hasChild] && treeLazyLoadeds.indexOf(row) === -1) {
      this.clearTreeExpandLoaded(row).then(function () {
        return _this33.handleAsyncTreeExpandChilds(row);
      });
    }

    return this.$nextTick();
  },

  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent: function triggerTreeExpandEvent(evnt, params) {
    var treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds;
    var row = params.row,
        column = params.column;
    var lazy = treeOpts.lazy;

    if (!lazy || treeLazyLoadeds.indexOf(row) === -1) {
      var expanded = !this.isTreeExpandByRow(row);
      var columnIndex = this.getColumnIndex(column);
      var $columnIndex = this.$getColumnIndex(column);
      this.setTreeExpand(row, expanded);
      this.emitEvent('toggle-tree-expand', {
        expanded: expanded,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        row: row
      }, evnt);
    }
  },

  /**
   * 切换/展开树节点
   */
  toggleTreeExpand: function toggleTreeExpand(row) {
    return this.setTreeExpand(row, !this.isTreeExpandByRow(row));
  },

  /**
   * 处理默认展开树节点
   */
  handleDefaultTreeExpand: function handleDefaultTreeExpand() {
    var treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        tableFullData = this.tableFullData;

    if (treeConfig) {
      var expandAll = treeOpts.expandAll,
          expandRowKeys = treeOpts.expandRowKeys;

      if (expandAll) {
        this.setAllTreeExpand(true);
      } else if (expandRowKeys) {
        var defExpandeds = [];
        var rowkey = getRowkey(this);
        expandRowKeys.forEach(function (rowid) {
          var matchObj = ctor_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
            return rowid === ctor_amd_xe_utils_default.a.get(item, rowkey);
          }, treeOpts);

          if (matchObj) {
            defExpandeds.push(matchObj.item);
          }
        });
        this.setTreeExpand(defExpandeds, true);
      }
    }
  },
  handleAsyncTreeExpandChilds: function handleAsyncTreeExpandChilds(row) {
    var _this34 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        treeExpandeds = this.treeExpandeds,
        treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds,
        checkboxOpts = this.checkboxOpts;
    var loadMethod = treeOpts.loadMethod,
        children = treeOpts.children;
    var checkStrictly = checkboxOpts.checkStrictly;
    var rest = fullAllDataRowMap.get(row);
    return new Promise(function (resolve) {
      treeLazyLoadeds.push(row);
      loadMethod({
        $table: _this34,
        row: row
      }).catch(function () {
        return [];
      }).then(function (childs) {
        rest.treeLoaded = true;
        ctor_amd_xe_utils_default.a.remove(treeLazyLoadeds, function (item) {
          return item === row;
        });

        if (!ctor_amd_xe_utils_default.a.isArray(childs)) {
          childs = [];
        }

        if (childs) {
          row[children] = childs;

          _this34.appendTreeCache(row, childs);

          if (childs.length && treeExpandeds.indexOf(row) === -1) {
            treeExpandeds.push(row);
          } // 如果当前节点已选中，则展开后子节点也被选中


          if (!checkStrictly && _this34.isCheckedByCheckboxRow(row)) {
            _this34.setCheckboxRow(childs, true);
          }
        }

        resolve(_this34.$nextTick().then(_this34.recalculate));
      });
    });
  },

  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpand: function setAllTreeExpand(expanded) {
    var tableFullData = this.tableFullData,
        treeOpts = this.treeOpts;
    var lazy = treeOpts.lazy,
        children = treeOpts.children;
    var expandeds = [];
    ctor_amd_xe_utils_default.a.eachTree(tableFullData, function (row) {
      var rowChildren = row[children];

      if (lazy || rowChildren && rowChildren.length) {
        expandeds.push(row);
      }
    }, treeOpts);
    return this.setTreeExpand(expandeds, expanded);
  },

  /**
   * 设置展开树形节点，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setTreeExpand: function setTreeExpand(rows, expanded) {
    var _this35 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        tableFullData = this.tableFullData,
        treeExpandeds = this.treeExpandeds,
        treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds,
        treeNodeColumn = this.treeNodeColumn;
    var reserve = treeOpts.reserve,
        lazy = treeOpts.lazy,
        hasChild = treeOpts.hasChild,
        children = treeOpts.children,
        accordion = treeOpts.accordion,
        toggleMethod = treeOpts.toggleMethod;
    var result = [];
    var columnIndex = this.getColumnIndex(treeNodeColumn);
    var $columnIndex = this.$getColumnIndex(treeNodeColumn);

    if (rows) {
      if (!ctor_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      }

      if (rows.length) {
        var validRows = toggleMethod ? rows.filter(function (row) {
          return toggleMethod({
            expanded: expanded,
            column: treeNodeColumn,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            row: row
          });
        }) : rows;

        if (accordion) {
          validRows = validRows.length ? [validRows[validRows.length - 1]] : []; // 同一级只能展开一个

          var matchObj = ctor_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
            return item === validRows[0];
          }, treeOpts);

          if (matchObj) {
            ctor_amd_xe_utils_default.a.remove(treeExpandeds, function (item) {
              return matchObj.items.indexOf(item) > -1;
            });
          }
        }

        if (expanded) {
          validRows.forEach(function (row) {
            if (treeExpandeds.indexOf(row) === -1) {
              var rest = fullAllDataRowMap.get(row);
              var isLoad = lazy && row[hasChild] && !rest.treeLoaded && treeLazyLoadeds.indexOf(row) === -1; // 是否使用懒加载

              if (isLoad) {
                result.push(_this35.handleAsyncTreeExpandChilds(row));
              } else {
                if (row[children] && row[children].length) {
                  treeExpandeds.push(row);
                }
              }
            }
          });
        } else {
          ctor_amd_xe_utils_default.a.remove(treeExpandeds, function (row) {
            return validRows.indexOf(row) > -1;
          });
        }

        if (reserve) {
          validRows.forEach(function (row) {
            return _this35.handleTreeExpandReserve(row, expanded);
          });
        }

        return Promise.all(result).then(this.recalculate);
      }
    }

    return this.$nextTick();
  },

  /**
   * 判断行是否为树形节点展开状态
   * @param {Row} row 行对象
   */
  isTreeExpandByRow: function isTreeExpandByRow(row) {
    return this.treeExpandeds.indexOf(row) > -1;
  },

  /**
   * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand: function clearTreeExpand() {
    var _this36 = this;

    var treeOpts = this.treeOpts,
        treeExpandeds = this.treeExpandeds,
        tableFullData = this.tableFullData;
    var reserve = treeOpts.reserve;
    var isExists = treeExpandeds.length;
    this.treeExpandeds = [];

    if (reserve) {
      ctor_amd_xe_utils_default.a.eachTree(tableFullData, function (row) {
        return _this36.handleTreeExpandReserve(row, false);
      }, treeOpts);
    }

    return this.$nextTick().then(function () {
      if (isExists) {
        _this36.recalculate();
      }
    });
  },
  clearTreeExpandReserve: function clearTreeExpandReserve() {
    this.treeExpandedReserveRowMap = {};
    return this.$nextTick();
  },
  handleTreeExpandReserve: function handleTreeExpandReserve(row, expanded) {
    var treeExpandedReserveRowMap = this.treeExpandedReserveRowMap,
        treeOpts = this.treeOpts;

    if (treeOpts.reserve) {
      var rowid = methods_getRowid(this, row);

      if (expanded) {
        treeExpandedReserveRowMap[rowid] = row;
      } else if (treeExpandedReserveRowMap[rowid]) {
        delete treeExpandedReserveRowMap[rowid];
      }
    }
  },

  /**
   * 获取表格的滚动状态
   */
  getScroll: function getScroll() {
    var $refs = this.$refs,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad;
    var bodyElem = $refs.tableBody.$el;
    return {
      virtualX: scrollXLoad,
      virtualY: scrollYLoad,
      scrollTop: bodyElem.scrollTop,
      scrollLeft: bodyElem.scrollLeft
    };
  },

  /**
   * 横向 X 可视渲染事件处理
   */
  triggerScrollXEvent: function triggerScrollXEvent() {
    this.loadScrollXData();
  },
  loadScrollXData: function loadScrollXData() {
    var mergeList = this.mergeList,
        mergeFooterList = this.mergeFooterList,
        scrollXStore = this.scrollXStore;
    var startIndex = scrollXStore.startIndex,
        endIndex = scrollXStore.endIndex,
        offsetSize = scrollXStore.offsetSize;

    var _computeVirtualX2 = computeVirtualX(this),
        toVisibleIndex = _computeVirtualX2.toVisibleIndex,
        visibleSize = _computeVirtualX2.visibleSize;

    var offsetItem = {
      startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
      endIndex: toVisibleIndex + visibleSize + offsetSize
    };
    calculateMergerOffserIndex(mergeList.concat(mergeFooterList), offsetItem, 'col');
    var offsetStartIndex = offsetItem.startIndex,
        offsetEndIndex = offsetItem.endIndex;

    if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
      if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
        scrollXStore.startIndex = offsetStartIndex;
        scrollXStore.endIndex = offsetEndIndex;
        this.updateScrollXData();
      }
    }

    this.clostTooltip();
  },

  /**
   * 纵向 Y 可视渲染事件处理
   */
  triggerScrollYEvent: function triggerScrollYEvent(evnt) {
    // webkit 浏览器使用最佳的渲染方式
    if (isWebkit && this.scrollYStore.adaptive) {
      this.loadScrollYData(evnt);
    } else {
      this.debounceScrollY(evnt);
    }
  },
  debounceScrollY: ctor_amd_xe_utils_default.a.debounce(function (evnt) {
    this.loadScrollYData(evnt);
  }, debounceScrollYDuration, {
    leading: false,
    trailing: true
  }),

  /**
   * 纵向 Y 可视渲染处理
   */
  loadScrollYData: function loadScrollYData(evnt) {
    var mergeList = this.mergeList,
        scrollYStore = this.scrollYStore;
    var startIndex = scrollYStore.startIndex,
        endIndex = scrollYStore.endIndex,
        visibleSize = scrollYStore.visibleSize,
        offsetSize = scrollYStore.offsetSize,
        rowHeight = scrollYStore.rowHeight;
    var scrollBodyElem = evnt.target;
    var scrollTop = scrollBodyElem.scrollTop;
    var toVisibleIndex = Math.floor(scrollTop / rowHeight);
    var offsetItem = {
      startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
      endIndex: toVisibleIndex + visibleSize + offsetSize
    };
    calculateMergerOffserIndex(mergeList, offsetItem, 'row');
    var offsetStartIndex = offsetItem.startIndex,
        offsetEndIndex = offsetItem.endIndex;

    if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
      if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
        scrollYStore.startIndex = offsetStartIndex;
        scrollYStore.endIndex = offsetEndIndex;
        this.updateScrollYData();
      }
    }
  },
  // 计算可视渲染相关数据
  computeScrollLoad: function computeScrollLoad() {
    var _this37 = this;

    return this.$nextTick().then(function () {
      var sYOpts = _this37.sYOpts,
          sXOpts = _this37.sXOpts,
          scrollXLoad = _this37.scrollXLoad,
          scrollYLoad = _this37.scrollYLoad,
          scrollXStore = _this37.scrollXStore,
          scrollYStore = _this37.scrollYStore; // 计算 X 逻辑

      if (scrollXLoad) {
        var _computeVirtualX3 = computeVirtualX(_this37),
            visibleXSize = _computeVirtualX3.visibleSize;

        var offsetXSize = sXOpts.oSize ? ctor_amd_xe_utils_default.a.toNumber(sXOpts.oSize) : methods_browse.msie ? 10 : methods_browse.edge ? 5 : 0;
        scrollXStore.offsetSize = offsetXSize;
        scrollXStore.visibleSize = visibleXSize;
        scrollXStore.endIndex = Math.max(scrollXStore.startIndex + scrollXStore.visibleSize + offsetXSize, scrollXStore.endIndex);

        _this37.updateScrollXData();
      } else {
        _this37.updateScrollXSpace();
      } // 计算 Y 逻辑


      var _computeVirtualY = computeVirtualY(_this37),
          rowHeight = _computeVirtualY.rowHeight,
          visibleYSize = _computeVirtualY.visibleSize;

      scrollYStore.rowHeight = rowHeight;

      if (scrollYLoad) {
        var offsetYSize = sYOpts.oSize ? ctor_amd_xe_utils_default.a.toNumber(sYOpts.oSize) : methods_browse.msie ? 20 : methods_browse.edge ? 10 : 0;
        scrollYStore.offsetSize = offsetYSize;
        scrollYStore.visibleSize = visibleYSize;
        scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex);

        _this37.updateScrollYData();
      } else {
        _this37.updateScrollYSpace();
      }

      _this37.rowHeight = rowHeight;

      _this37.$nextTick(_this37.updateStyle);
    });
  },
  handleTableColumn: function handleTableColumn() {
    var scrollXLoad = this.scrollXLoad,
        visibleColumn = this.visibleColumn,
        scrollXStore = this.scrollXStore;
    this.tableColumn = scrollXLoad ? visibleColumn.slice(scrollXStore.startIndex, scrollXStore.endIndex) : visibleColumn.slice(0);
  },
  updateScrollXData: function updateScrollXData() {
    this.handleTableColumn();
    this.updateScrollXSpace();
  },
  // 更新横向 X 可视渲染上下剩余空间大小
  updateScrollXSpace: function updateScrollXSpace() {
    var $refs = this.$refs,
        elemStore = this.elemStore,
        visibleColumn = this.visibleColumn,
        scrollXStore = this.scrollXStore,
        scrollXLoad = this.scrollXLoad,
        tableWidth = this.tableWidth,
        scrollbarWidth = this.scrollbarWidth;
    var tableHeader = $refs.tableHeader,
        tableBody = $refs.tableBody,
        tableFooter = $refs.tableFooter;
    var tableBodyElem = tableBody ? tableBody.$el : null;

    if (tableBodyElem) {
      var tableHeaderElem = tableHeader ? tableHeader.$el : null;
      var tableFooterElem = tableFooter ? tableFooter.$el : null;
      var headerElem = tableHeaderElem ? tableHeaderElem.querySelector('.vxe-table--header') : null;
      var bodyElem = tableBodyElem.querySelector('.vxe-table--body');
      var footerElem = tableFooterElem ? tableFooterElem.querySelector('.vxe-table--footer') : null;
      var leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
      var marginLeft = '';

      if (scrollXLoad) {
        marginLeft = "".concat(leftSpaceWidth, "px");
      }

      if (headerElem) {
        headerElem.style.marginLeft = marginLeft;
      }

      bodyElem.style.marginLeft = marginLeft;

      if (footerElem) {
        footerElem.style.marginLeft = marginLeft;
      }

      var containerList = ['main'];
      containerList.forEach(function (name) {
        var layoutList = ['header', 'body', 'footer'];
        layoutList.forEach(function (layout) {
          var xSpaceElem = elemStore["".concat(name, "-").concat(layout, "-xSpace")];

          if (xSpaceElem) {
            xSpaceElem.style.width = scrollXLoad ? "".concat(tableWidth + (layout === 'header' ? scrollbarWidth : 0), "px") : '';
          }
        });
      });
      this.$nextTick(this.updateStyle);
    }
  },
  updateScrollYData: function updateScrollYData() {
    this.handleTableData();
    this.updateScrollYSpace();
  },
  // 更新纵向 Y 可视渲染上下剩余空间大小
  updateScrollYSpace: function updateScrollYSpace() {
    var elemStore = this.elemStore,
        scrollYStore = this.scrollYStore,
        scrollYLoad = this.scrollYLoad,
        afterFullData = this.afterFullData;
    var startIndex = scrollYStore.startIndex,
        rowHeight = scrollYStore.rowHeight;
    var bodyHeight = afterFullData.length * rowHeight;
    var topSpaceHeight = Math.max(0, startIndex * rowHeight);
    var containerList = ['main', 'left', 'right'];
    var marginTop = '';
    var ySpaceHeight = '';

    if (scrollYLoad) {
      marginTop = "".concat(topSpaceHeight, "px");
      ySpaceHeight = "".concat(bodyHeight, "px");
    }

    containerList.forEach(function (name) {
      var layoutList = ['header', 'body', 'footer'];
      var tableElem = elemStore["".concat(name, "-body-table")];

      if (tableElem) {
        tableElem.style.marginTop = marginTop;
      }

      layoutList.forEach(function (layout) {
        var ySpaceElem = elemStore["".concat(name, "-").concat(layout, "-ySpace")];

        if (ySpaceElem) {
          ySpaceElem.style.height = ySpaceHeight;
        }
      });
    });
    this.$nextTick(this.updateStyle);
  },

  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param {Number} scrollLeft 左距离
   * @param {Number} scrollTop 上距离
   */
  scrollTo: function scrollTo(scrollLeft, scrollTop) {
    var _this38 = this;

    var $refs = this.$refs;
    var tableBody = $refs.tableBody,
        rightBody = $refs.rightBody,
        tableFooter = $refs.tableFooter;
    var tableBodyElem = tableBody ? tableBody.$el : null;
    var rightBodyElem = rightBody ? rightBody.$el : null;
    var bodyTargetElem = rightBodyElem || tableBodyElem;
    var tableFooterElem = tableFooter ? tableFooter.$el : null;
    var footerTargetElem = tableFooterElem || tableBodyElem;

    if (ctor_amd_xe_utils_default.a.isNumber(scrollLeft)) {
      footerTargetElem.scrollLeft = scrollLeft;
    }

    if (ctor_amd_xe_utils_default.a.isNumber(scrollTop)) {
      bodyTargetElem.scrollTop = scrollTop;
    }

    if (this.scrollXLoad || this.scrollYLoad) {
      return new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(_this38.$nextTick());
        }, 50);
      });
    }

    return this.$nextTick();
  },

  /**
   * 如果有滚动条，则滚动到对应的行
   * @param {Row} row 行对象
   * @param {ColumnInfo} column 列配置
   */
  scrollToRow: function scrollToRow(row, column) {
    var rest = [];

    if (row) {
      if (this.treeConfig) {
        rest.push(this.scrollToTreeRow(row));
      } else {
        rest.push(DomTools.rowToVisible(this, row));
      }
    }

    if (column) {
      rest.push(this.scrollToColumn(column));
    }

    return Promise.all(rest);
  },

  /**
   * 如果有滚动条，则滚动到对应的列
   * @param {ColumnInfo} column 列配置
   */
  scrollToColumn: function scrollToColumn(column) {
    if (column && this.fullColumnMap.has(column)) {
      return DomTools.colToVisible(this, column);
    }

    return this.$nextTick();
  },

  /**
   * 对于树形结构中，可以直接滚动到指定深层节点中
   * 对于某些特定的场景可能会用到，比如定位到某一节点
   * @param {Row} row 行对象
   */
  scrollToTreeRow: function scrollToTreeRow(row) {
    var _this39 = this;

    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts;

    if (treeConfig) {
      var matchObj = ctor_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
        return item === row;
      }, treeOpts);

      if (matchObj) {
        var nodes = matchObj.nodes;
        nodes.forEach(function (row, index) {
          if (index < nodes.length - 1 && !_this39.isTreeExpandByRow(row)) {
            _this39.setTreeExpand(row, true);
          }
        });
      }
    }

    return this.$nextTick();
  },

  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll: function clearScroll() {
    var _this40 = this;

    var $refs = this.$refs;
    var tableBody = $refs.tableBody,
        rightBody = $refs.rightBody,
        tableFooter = $refs.tableFooter;
    var tableBodyElem = tableBody ? tableBody.$el : null;
    var rightBodyElem = rightBody ? rightBody.$el : null;
    var tableFooterElem = tableFooter ? tableFooter.$el : null;

    if (rightBodyElem) {
      rightBodyElem.scrollTop = 0;
    }

    if (tableFooterElem) {
      tableFooterElem.scrollLeft = 0;
    }

    if (tableBodyElem) {
      tableBodyElem.scrollTop = 0;
      tableBodyElem.scrollLeft = 0;
    }

    return new Promise(function (resolve) {
      requestAnimationFrame(function () {
        resolve(_this40.$nextTick());
      });
    });
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
        data: this.afterFullData,
        $table: this,
        $grid: this.$xegrid
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
    var _this41 = this;

    var customVal = !ctor_amd_xe_utils_default.a.isUndefined(cellValue);
    return this.$nextTick().then(function () {
      var $refs = _this41.$refs,
          editRules = _this41.editRules,
          validStore = _this41.validStore;

      if (scope && $refs.tableBody && editRules) {
        var row = scope.row,
            column = scope.column;
        var type = 'change';

        if (_this41.hasCellRules(type, row, column)) {
          var cell = _this41.getCell(row, column);

          if (cell) {
            return _this41.validCellRules(type, row, column, cellValue).then(function () {
              if (customVal && validStore.visible) {
                methods_setCellValue(row, column, cellValue);
              }

              _this41.clearValidate();
            }).catch(function (_ref6) {
              var rule = _ref6.rule;

              if (customVal) {
                methods_setCellValue(row, column, cellValue);
              }

              _this41.showValidTooltip({
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
  handleDefaultMergeCells: function handleDefaultMergeCells() {
    this.setMergeCells(this.mergeCells);
  },

  /**
   * 设置合并单元格
   * @param {MergeOptions[]} merges { row: Row|number, column: ColumnInfo|number, rowspan: number, colspan: number }
   */
  setMergeCells: function setMergeCells(merges) {
    var _this42 = this;

    if (this.spanMethod) {
      UtilTools.error('vxe.error.errConflicts', ['merge-cells', 'span-method']);
    }

    setMerges(this, merges, this.mergeList, this.afterFullData);
    return this.$nextTick().then(function () {
      return _this42.updateCellAreas();
    });
  },

  /**
   * 移除单元格合并
   * @param {MergeOptions[]} merges 多个或数组 [{row:Row|number, col:ColumnInfo|number}]
   */
  removeMergeCells: function removeMergeCells(merges) {
    var _this43 = this;

    if (this.spanMethod) {
      UtilTools.error('vxe.error.errConflicts', ['merge-cells', 'span-method']);
    }

    var rest = removeMerges(this, merges, this.mergeList, this.afterFullData);
    return this.$nextTick().then(function () {
      _this43.updateCellAreas();

      return rest;
    });
  },

  /**
   * 获取所有被合并的单元格
   */
  getMergeCells: function getMergeCells() {
    return this.mergeList.slice(0);
  },

  /**
   * 清除所有单元格合并
   */
  clearMergeCells: function clearMergeCells() {
    this.mergeList = [];
    return this.$nextTick();
  },
  handleDefaultMergeFooterItems: function handleDefaultMergeFooterItems() {
    this.setMergeFooterItems(this.mergeFooterItems);
  },
  setMergeFooterItems: function setMergeFooterItems(merges) {
    var _this44 = this;

    if (this.footerSpanMethod) {
      UtilTools.error('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method']);
    }

    setMerges(this, merges, this.mergeFooterList, null);
    return this.$nextTick().then(function () {
      return _this44.updateCellAreas();
    });
  },
  removeMergeFooterItems: function removeMergeFooterItems(merges) {
    var _this45 = this;

    if (this.footerSpanMethod) {
      UtilTools.error('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method']);
    }

    var rest = removeMerges(this, merges, this.mergeFooterList, null);
    return this.$nextTick().then(function () {
      _this45.updateCellAreas();

      return rest;
    });
  },

  /**
   * 获取所有被合并的表尾
   */
  getMergeFooterItems: function getMergeFooterItems() {
    return this.mergeFooterList.slice(0);
  },

  /**
   * 清除所有表尾合并
   */
  clearMergeFooterItems: function clearMergeFooterItems() {
    this.mergeFooterList = [];
    return this.$nextTick();
  },
  updateZindex: function updateZindex() {
    if (this.zIndex) {
      this.tZindex = this.zIndex;
    } else if (this.tZindex < UtilTools.getLastZIndex()) {
      this.tZindex = UtilTools.nextZIndex();
    }
  },
  updateCellAreas: function updateCellAreas() {
    var _this46 = this;

    this.recalculate().then(function () {
      return _this46.refreshScroll();
    }).then(function () {
      if (_this46.mouseConfig && _this46.mouseOpts.area && _this46.handleUpdateCellAreas) {
        _this46.handleUpdateCellAreas();
      }
    });
  },
  emitEvent: function emitEvent(type, params, evnt) {
    this.$emit(type, Object.assign({
      $table: this,
      $grid: this.$xegrid,
      $event: evnt
    }, params));
  },
  focus: function focus() {
    this.isActivated = true;
    return this.$nextTick();
  },
  blur: function blur() {
    this.isActivated = false;
    return this.$nextTick();
  },
  // 连接工具栏
  connect: function connect($toolbar) {
    if ($toolbar && $toolbar.syncUpdate) {
      $toolbar.syncUpdate({
        collectColumn: this.collectColumn,
        $table: this
      });
      this.$toolbar = $toolbar;
    } else {
      UtilTools.error('vxe.error.barUnableLink');
    }

    return this.$nextTick();
  },

  /*************************
   * Publish methods
   *************************/
  getCell: function getCell(row, column) {
    var $refs = this.$refs;
    var rowid = methods_getRowid(this, row);
    var bodyElem = $refs["".concat(column.fixed || 'table', "Body")] || $refs.tableBody;

    if (bodyElem && bodyElem.$el) {
      return bodyElem.$el.querySelector(".vxe-body--row[data-rowid=\"".concat(rowid, "\"] .").concat(column.id));
    }

    return null;
  }
  /*************************
   * Publish methods
   *************************/

}; // Module methods

var funcs = 'setFilter,clearFilter,closeMenu,setActiveCellArea,getActiveCellArea,getCellAreas,clearCellAreas,copyCellArea,cutCellArea,pasteCellArea,getCopyCellArea,clearCopyCellArea,setCellAreas,openFind,openReplace,getSelectedCell,clearSelected,insert,insertAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearActived,getActiveRecord,isActiveByRow,setActiveRow,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,openExport,exportData,openImport,importData,readFile,importByFile,print'.split(',');
funcs.forEach(function (name) {
  Methods[name] = function () {
    return this["_".concat(name)] ? this["_".concat(name)].apply(this, arguments) : null;
  };
});
/* harmony default export */ var methods = (Methods);
// CONCATENATED MODULE: ./packages/table/src/table.js

















/**
 * 渲染浮固定列
 * 分别渲染左边固定列和右边固定列
 * 如果宽度足够情况下，则不需要渲染固定列
 * @param {Function} h 创建 VNode 函数
 * @param {Object} $xetable 表格实例
 * @param {String} fixedType 固定列类型
 */

function renderFixed(h, $xetable, fixedType) {
  var _e = $xetable._e,
      tableData = $xetable.tableData,
      tableColumn = $xetable.tableColumn,
      tableGroupColumn = $xetable.tableGroupColumn,
      vSize = $xetable.vSize,
      showHeader = $xetable.showHeader,
      showFooter = $xetable.showFooter,
      columnStore = $xetable.columnStore,
      footerData = $xetable.footerData;
  var fixedColumn = columnStore["".concat(fixedType, "List")];
  return h('div', {
    class: "vxe-table--fixed-".concat(fixedType, "-wrapper"),
    ref: "".concat(fixedType, "Container")
  }, [showHeader ? h('vxe-table-header', {
    props: {
      fixedType: fixedType,
      tableData: tableData,
      tableColumn: tableColumn,
      tableGroupColumn: tableGroupColumn,
      size: vSize,
      fixedColumn: fixedColumn
    },
    ref: "".concat(fixedType, "Header")
  }) : _e(), h('vxe-table-body', {
    props: {
      fixedType: fixedType,
      tableData: tableData,
      tableColumn: tableColumn,
      fixedColumn: fixedColumn,
      size: vSize
    },
    ref: "".concat(fixedType, "Body")
  }), showFooter ? h('vxe-table-footer', {
    props: {
      footerData: footerData,
      tableColumn: tableColumn,
      fixedColumn: fixedColumn,
      fixedType: fixedType,
      size: vSize
    },
    ref: "".concat(fixedType, "Footer")
  }) : _e()]);
}

function renderEmptyContenet(h, _vm) {
  var $scopedSlots = _vm.$scopedSlots,
      emptyOpts = _vm.emptyOpts;
  var emptyContent = '';
  var params = {
    $table: _vm
  };

  if ($scopedSlots.empty) {
    emptyContent = $scopedSlots.empty.call(_vm, params, h);
  } else {
    var compConf = _vm.emptyRender ? v_x_e_table.renderer.get(emptyOpts.name) : null;

    if (compConf) {
      emptyContent = compConf.renderEmpty.call(_vm, h, emptyOpts, params);
    } else {
      emptyContent = _vm.emptyText || conf.i18n('vxe.table.emptyText');
    }
  }

  return emptyContent;
}

/* harmony default export */ var table = ({
  name: 'VxeTable',
  mixins: [size],
  props: {
    /** 基本属性 */
    id: String,
    // 数据
    data: Array,
    // 表格的高度
    height: [Number, String],
    // 表格的最大高度
    maxHeight: [Number, String],
    // 所有列是否允许拖动列宽调整大小
    resizable: {
      type: Boolean,
      default: function _default() {
        return conf.table.resizable;
      }
    },
    // 是否带有斑马纹
    stripe: {
      type: Boolean,
      default: function _default() {
        return conf.table.stripe;
      }
    },
    // 是否带有边框
    border: {
      type: [Boolean, String],
      default: function _default() {
        return conf.table.border;
      }
    },
    // 是否圆角边框
    round: {
      type: Boolean,
      default: function _default() {
        return conf.table.round;
      }
    },
    // 表格的尺寸
    size: {
      type: String,
      default: function _default() {
        return conf.table.size || conf.size;
      }
    },
    // 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
    fit: {
      type: Boolean,
      default: function _default() {
        return conf.table.fit;
      }
    },
    // 表格是否加载中
    loading: Boolean,
    // 所有的列对其方式
    align: {
      type: String,
      default: function _default() {
        return conf.table.align;
      }
    },
    // 所有的表头列的对齐方式
    headerAlign: {
      type: String,
      default: function _default() {
        return conf.table.headerAlign;
      }
    },
    // 所有的表尾列的对齐方式
    footerAlign: {
      type: String,
      default: function _default() {
        return conf.table.footerAlign;
      }
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: function _default() {
        return conf.table.showHeader;
      }
    },
    // 是否要高亮当前选中行
    highlightCurrentRow: {
      type: Boolean,
      default: function _default() {
        return conf.table.highlightCurrentRow;
      }
    },
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: {
      type: Boolean,
      default: function _default() {
        return conf.table.highlightHoverRow;
      }
    },
    // 是否要高亮当前选中列
    highlightCurrentColumn: {
      type: Boolean,
      default: function _default() {
        return conf.table.highlightCurrentColumn;
      }
    },
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: {
      type: Boolean,
      default: function _default() {
        return conf.table.highlightHoverColumn;
      }
    },
    // 激活单元格编辑时是否高亮显示
    highlightCell: Boolean,
    // 是否显示表尾合计
    showFooter: Boolean,
    // 表尾合计的计算方法
    footerMethod: {
      type: Function,
      default: function _default() {
        return conf.table.footerMethod;
      }
    },
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
    // 给单元格附加样式
    cellStyle: [Object, Function],
    // 给表头单元格附加样式
    headerCellStyle: [Object, Function],
    // 给表尾单元格附加样式
    footerCellStyle: [Object, Function],
    // 给行附加样式
    rowStyle: [Object, Function],
    // 给表头行附加样式
    headerRowStyle: [Object, Function],
    // 给表尾行附加样式
    footerRowStyle: [Object, Function],
    // 合并指定单元格
    mergeCells: Array,
    // 合并指定的表尾
    mergeFooterItems: Array,
    // 自定义合并行或列的方法
    spanMethod: Function,
    // 表尾合并行或列
    footerSpanMethod: Function,
    // 设置所有内容过长时显示为省略号
    showOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return conf.table.showOverflow;
      }
    },
    // 设置表头所有内容过长时显示为省略号
    showHeaderOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return conf.table.showHeaderOverflow;
      }
    },
    // 设置表尾所有内容过长时显示为省略号
    showFooterOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return conf.table.showFooterOverflow;
      }
    },

    /** 高级属性 */
    // 主键配置
    columnKey: Boolean,
    rowKey: Boolean,
    rowId: {
      type: String,
      default: function _default() {
        return conf.table.rowId;
      }
    },
    zIndex: Number,
    emptyText: String,
    keepSource: {
      type: Boolean,
      default: function _default() {
        return conf.table.keepSource;
      }
    },
    // 是否自动监听父容器变化去更新响应式表格宽高
    autoResize: {
      type: Boolean,
      default: function _default() {
        return conf.table.autoResize;
      }
    },
    // 是否自动根据状态属性去更新响应式表格宽高
    syncResize: [Boolean, String, Number],
    // 设置列的默认参数，仅对部分支持的属性有效
    columnConfig: Object,
    // 序号配置项
    seqConfig: Object,
    // 排序配置项
    sortConfig: Object,
    // 筛选配置项
    filterConfig: Object,
    // 单选框配置
    radioConfig: Object,
    // 复选框配置项
    checkboxConfig: Object,
    // tooltip 配置项
    tooltipConfig: Object,
    // 导出配置项
    exportConfig: [Boolean, Object],
    // 导入配置项
    importConfig: [Boolean, Object],
    // 打印配置项
    printConfig: Object,
    // 展开行配置项
    expandConfig: Object,
    // 树形结构配置项
    treeConfig: [Boolean, Object],
    // 快捷菜单配置项
    contextMenu: [Boolean, Object],
    // 鼠标配置项
    mouseConfig: Object,
    // 按键配置项
    keyboardConfig: Object,
    // 编辑配置项
    editConfig: [Boolean, Object],
    // 校验配置项
    validConfig: Object,
    // 校验规则配置项
    editRules: Object,
    // 空内容渲染配置项
    emptyRender: [Boolean, Object],
    // 自定义列配置项
    customConfig: [Boolean, Object],
    // 横向虚拟滚动配置项
    scrollX: Object,
    // 纵向虚拟滚动配置项
    scrollY: Object,
    // 优化相关
    animat: {
      type: Boolean,
      default: function _default() {
        return conf.table.animat;
      }
    },
    delayHover: {
      type: Number,
      default: function _default() {
        return conf.table.delayHover;
      }
    },
    // 额外的参数
    params: Object
  },
  components: {
    VxeTableBody: src_body
  },
  provide: function provide() {
    return {
      $xetable: this,
      xecolgroup: null
    };
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  data: function data() {
    return {
      tId: "".concat(ctor_amd_xe_utils_default.a.uniqueId()),
      // 低性能的静态列
      staticColumns: [],
      // 渲染的列分组
      tableGroupColumn: [],
      // 可视区渲染的列
      tableColumn: [],
      // 渲染中的数据
      tableData: [],
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
      // 行高
      rowHeight: 0,
      // 表格父容器的高度
      parentHeight: 0,
      // 是否使用分组表头
      isGroup: false,
      // 复选框属性，是否全选
      isAllSelected: false,
      // 复选框属性，有选中且非全选状态
      isIndeterminate: false,
      // 复选框属性，已选中的行
      selection: [],
      // 当前行
      currentRow: null,
      // 单选框属性，选中列
      currentColumn: null,
      // 单选框属性，选中行
      selectRow: null,
      // 表尾合计数据
      footerData: [],
      // 展开列信息
      expandColumn: null,
      // 树节点列信息
      treeNodeColumn: null,
      // 已展开的行
      rowExpandeds: [],
      // 懒加载中的展开行的列表
      expandLazyLoadeds: [],
      // 已展开树节点
      treeExpandeds: [],
      // 懒加载中的树节点的列表
      treeLazyLoadeds: [],
      // 树节点不确定状态的列表
      treeIndeterminates: [],
      // 合并单元格的对象集
      mergeList: [],
      // 合并表尾数据的对象集
      mergeFooterList: [],
      // 初始化标识
      initStore: {
        filter: false,
        import: false,
        export: false
      },
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
      // 存放可编辑相关信息
      editStore: {
        indexs: {
          columns: []
        },
        titles: {
          columns: []
        },
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
      },
      // 导入相关信息
      importStore: {
        inited: false,
        file: null,
        type: '',
        modeList: [],
        typeList: [],
        filename: '',
        visible: false
      },
      importParams: {
        mode: '',
        types: null,
        message: true
      },
      // 导出相关信息
      exportStore: {
        inited: false,
        name: '',
        modeList: [],
        typeList: [],
        columns: [],
        hasFooter: false,
        visible: false
      },
      exportParams: {
        filename: '',
        sheetName: '',
        mode: '',
        type: '',
        original: false,
        message: true,
        isHeader: false,
        isFooter: false
      }
    };
  },
  computed: {
    validOpts: function validOpts() {
      return Object.assign({
        message: 'default'
      }, conf.table.validConfig, this.validConfig);
    },
    sXOpts: function sXOpts() {
      return Object.assign({}, conf.table.scrollX, this.scrollX);
    },
    sYOpts: function sYOpts() {
      return Object.assign({}, conf.table.scrollY, this.scrollY);
    },
    rowHeightMaps: function rowHeightMaps() {
      return {
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      };
    },
    columnOpts: function columnOpts() {
      return Object.assign({}, this.columnConfig);
    },
    seqOpts: function seqOpts() {
      return Object.assign({
        startIndex: 0
      }, conf.table.seqConfig, this.seqConfig);
    },
    radioOpts: function radioOpts() {
      return Object.assign({}, conf.table.radioConfig, this.radioConfig);
    },
    checkboxOpts: function checkboxOpts() {
      return Object.assign({}, conf.table.checkboxConfig, this.checkboxConfig);
    },
    tooltipOpts: function tooltipOpts() {
      var opts = Object.assign({
        leaveDelay: 300
      }, conf.table.tooltipConfig, this.tooltipConfig);

      if (opts.enterable) {
        opts.leaveMethod = this.handleTooltipLeaveMethod;
      }

      return opts;
    },
    vaildTipOpts: function vaildTipOpts() {
      return Object.assign({
        isArrow: false
      }, this.tooltipOpts);
    },
    editOpts: function editOpts() {
      return Object.assign({}, conf.table.editConfig, this.editConfig);
    },
    sortOpts: function sortOpts() {
      return Object.assign({
        orders: ['asc', 'desc', null]
      }, conf.table.sortConfig, this.sortConfig);
    },
    filterOpts: function filterOpts() {
      return Object.assign({}, conf.table.filterConfig, this.filterConfig);
    },
    mouseOpts: function mouseOpts() {
      return Object.assign({}, conf.table.mouseConfig, this.mouseConfig);
    },
    keyboardOpts: function keyboardOpts() {
      return Object.assign({}, this.keyboardConfig);
    },
    hasTip: function hasTip() {
      return v_x_e_table._tooltip;
    },
    headerCtxMenu: function headerCtxMenu() {
      var headerOpts = this.ctxMenuOpts.header;
      return headerOpts && headerOpts.options ? headerOpts.options : [];
    },
    bodyCtxMenu: function bodyCtxMenu() {
      var bodyOpts = this.ctxMenuOpts.body;
      return bodyOpts && bodyOpts.options ? bodyOpts.options : [];
    },
    footerCtxMenu: function footerCtxMenu() {
      var footerOpts = this.ctxMenuOpts.footer;
      return footerOpts && footerOpts.options ? footerOpts.options : [];
    },
    isCtxMenu: function isCtxMenu() {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length || this.footerCtxMenu.length;
    },
    ctxMenuOpts: function ctxMenuOpts() {
      return Object.assign({}, conf.table.contextMenu, this.contextMenu);
    },
    ctxMenuList: function ctxMenuList() {
      var rest = [];
      this.ctxMenuStore.list.forEach(function (list) {
        list.forEach(function (item) {
          rest.push(item);
        });
      });
      return rest;
    },
    exportOpts: function exportOpts() {
      return Object.assign({}, conf.table.exportConfig, this.exportConfig);
    },
    importOpts: function importOpts() {
      return Object.assign({}, conf.table.importConfig, this.importConfig);
    },
    printOpts: function printOpts() {
      return Object.assign({}, conf.table.printConfig, this.printConfig);
    },
    expandOpts: function expandOpts() {
      return Object.assign({}, conf.table.expandConfig, this.expandConfig);
    },
    treeOpts: function treeOpts() {
      return Object.assign({}, conf.table.treeConfig, this.treeConfig);
    },
    emptyOpts: function emptyOpts() {
      return Object.assign({}, conf.table.emptyRender, this.emptyRender);
    },
    cellOffsetWidth: function cellOffsetWidth() {
      return this.border ? Math.max(2, Math.ceil(this.scrollbarWidth / this.tableColumn.length)) : 1;
    },
    customOpts: function customOpts() {
      return Object.assign({}, conf.table.customConfig, this.customConfig);
    },
    tableBorder: function tableBorder() {
      var border = this.border;

      if (border === true) {
        return 'full';
      }

      if (border) {
        return border;
      }

      return 'default';
    },

    /**
     * 判断列全选的复选框是否禁用
     */
    isAllCheckboxDisabled: function isAllCheckboxDisabled() {
      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          checkboxOpts = this.checkboxOpts;
      var strict = checkboxOpts.strict,
          checkMethod = checkboxOpts.checkMethod;

      if (strict) {
        if (tableFullData.length) {
          if (checkMethod) {
            if (treeConfig) {// 暂时不支持树形结构
            } // 如果所有行都被禁用


            return tableFullData.every(function (row) {
              return !checkMethod({
                row: row
              });
            });
          }

          return false;
        }

        return true;
      }

      return false;
    }
  },
  watch: {
    data: function data(value) {
      var _this = this;

      this.loadTableData(value).then(function () {
        if (!_this.inited) {
          _this.inited = true;

          _this.handleDefaults();
        }

        if ((_this.scrollXLoad || _this.scrollYLoad) && _this.expandColumn) {
          UtilTools.warn('vxe.error.scrollErrProp', ['column.type=expand']);
        }
      });
    },
    staticColumns: function staticColumns(value) {
      this.handleColumn(value);
    },
    tableColumn: function tableColumn() {
      this.analyColumnWidth();
    },
    showHeader: function showHeader() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.recalculate(true).then(function () {
          return _this2.refreshScroll();
        });
      });
    },
    showFooter: function showFooter() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.recalculate(true).then(function () {
          return _this3.refreshScroll();
        });
      });
    },
    height: function height() {
      var _this4 = this;

      this.$nextTick(function () {
        return _this4.recalculate(true);
      });
    },
    maxHeight: function maxHeight() {
      var _this5 = this;

      this.$nextTick(function () {
        return _this5.recalculate(true);
      });
    },
    syncResize: function syncResize(value) {
      var _this6 = this;

      if (value) {
        var $el = this.$el; // 只在可视状态下才去更新

        if ($el.clientWidth && $el.clientHeight) {
          this.recalculate();
        }

        this.$nextTick(function () {
          setTimeout(function () {
            if ($el.clientWidth && $el.clientHeight) {
              _this6.recalculate(true);
            }
          });
        });
      }
    }
  },
  created: function created() {
    var _this7 = this;

    var _Object$assign = Object.assign(this, {
      tZindex: 0,
      elemStore: {},
      // 存放横向 X 虚拟滚动相关的信息
      scrollXStore: {},
      // 存放纵向 Y 虚拟滚动相关信息
      scrollYStore: {},
      // 存放 tooltip 相关信息
      tooltipStore: {},
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      // 当前 hover 行
      // hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      // 单选框属性，已选中保留的行
      radioReserveRow: null,
      // 复选框属性，已选中保留的行
      checkboxReserveRowMap: {},
      // 行数据，已展开保留的行
      rowExpandedReserveRowMap: {},
      // 树结构数据，已展开保留的行
      treeExpandedReserveRowMap: {},
      // 完整数据、条件处理后
      tableFullData: [],
      afterFullData: [],
      // 收集的列配置（带分组）
      collectColumn: [],
      // 完整所有列（不带分组）
      tableFullColumn: [],
      // 渲染所有列
      visibleColumn: [],
      // 缓存数据集
      fullAllDataRowMap: new Map(),
      fullAllDataRowIdData: {},
      fullDataRowMap: new Map(),
      fullDataRowIdData: {},
      fullColumnMap: new Map(),
      fullColumnIdData: {},
      fullColumnFieldData: {}
    }),
        scrollXStore = _Object$assign.scrollXStore,
        sYOpts = _Object$assign.sYOpts,
        scrollYStore = _Object$assign.scrollYStore,
        data = _Object$assign.data,
        editOpts = _Object$assign.editOpts,
        treeOpts = _Object$assign.treeOpts,
        treeConfig = _Object$assign.treeConfig,
        showOverflow = _Object$assign.showOverflow;

    if (false) {}

    var customOpts = this.customOpts;

    if (!this.id && this.customConfig && (customOpts.storage === true || customOpts.storage && customOpts.storage.resizable || customOpts.storage && customOpts.storage.visible)) {
      UtilTools.error('vxe.error.reqProp', ['id']);
    }

    if (this.treeConfig && this.checkboxOpts.range) {
      UtilTools.error('vxe.error.noTree', ['checkbox-config.range']);
    }

    if (false) {} // 检查是否有安装需要的模块


    if (false) {}

    Object.assign(scrollYStore, {
      startIndex: 0,
      endIndex: 0,
      visibleSize: 0,
      adaptive: sYOpts.adaptive !== false
    });
    Object.assign(scrollXStore, {
      startIndex: 0,
      endIndex: 0,
      visibleSize: 0
    });
    this.loadTableData(data).then(function () {
      if (data && data.length) {
        _this7.inited = true;

        _this7.handleDefaults();
      }

      _this7.updateStyle();
    });
    GlobalEvent.on(this, 'paste', this.handleGlobalPasteEvent);
    GlobalEvent.on(this, 'copy', this.handleGlobalCopyEvent);
    GlobalEvent.on(this, 'cut', this.handleGlobalCutEvent);
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent);
    this.preventEvent(null, 'created');
  },
  mounted: function mounted() {
    var _this8 = this;

    if (this.autoResize) {
      var resizeObserver = new ResizeEvent(function () {
        return _this8.recalculate(true);
      });
      resizeObserver.observe(this.$el);
      resizeObserver.observe(this.getParentElem());
      this.$resize = resizeObserver;
    }

    this.preventEvent(null, 'mounted');
  },
  activated: function activated() {
    var _this9 = this;

    this.recalculate().then(function () {
      return _this9.refreshScroll();
    });
    this.preventEvent(null, 'activated');
  },
  deactivated: function deactivated() {
    this.preventEvent(null, 'deactivated');
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$resize) {
      this.$resize.disconnect();
    }

    this.closeFilter();
    this.closeMenu();
    this.preventEvent(null, 'beforeDestroy');
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'paste');
    GlobalEvent.off(this, 'copy');
    GlobalEvent.off(this, 'cut');
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'blur');
    GlobalEvent.off(this, 'mousewheel');
    GlobalEvent.off(this, 'keydown');
    GlobalEvent.off(this, 'resize');
    GlobalEvent.off(this, 'contextmenu');
    this.preventEvent(null, 'destroyed');
  },
  render: function render(h) {
    var _e = this._e,
        tId = this.tId,
        tableData = this.tableData,
        tableColumn = this.tableColumn,
        tableGroupColumn = this.tableGroupColumn,
        isGroup = this.isGroup,
        loading = this.loading,
        stripe = this.stripe,
        showHeader = this.showHeader,
        height = this.height,
        tableBorder = this.tableBorder,
        treeOpts = this.treeOpts,
        treeConfig = this.treeConfig,
        mouseConfig = this.mouseConfig,
        mouseOpts = this.mouseOpts,
        vSize = this.vSize,
        validOpts = this.validOpts,
        showFooter = this.showFooter,
        overflowX = this.overflowX,
        overflowY = this.overflowY,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad,
        scrollbarHeight = this.scrollbarHeight,
        highlightCell = this.highlightCell,
        highlightHoverRow = this.highlightHoverRow,
        highlightHoverColumn = this.highlightHoverColumn,
        editConfig = this.editConfig,
        vaildTipOpts = this.vaildTipOpts,
        tooltipOpts = this.tooltipOpts,
        initStore = this.initStore,
        columnStore = this.columnStore,
        filterStore = this.filterStore,
        ctxMenuStore = this.ctxMenuStore,
        ctxMenuOpts = this.ctxMenuOpts,
        footerData = this.footerData,
        hasTip = this.hasTip;
    var leftList = columnStore.leftList,
        rightList = columnStore.rightList;
    return h('div', {
      class: ['vxe-table', "tid_".concat(tId), vSize ? "size--".concat(vSize) : '', "border--".concat(tableBorder), {
        'vxe-editable': !!editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'is--group': isGroup,
        'has--height': height,
        'has--tree-line': treeConfig && treeOpts.line,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        'c--highlight': highlightCell,
        't--animat': !!this.animat,
        'is--round': this.round,
        't--stripe': stripe,
        't--selected': mouseConfig && mouseOpts.selected,
        'is--area': mouseConfig && mouseOpts.area,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn,
        'is--loading': loading,
        'is--empty': !loading && !tableData.length,
        'scroll--y': overflowY,
        'scroll--x': overflowX,
        'virtual--x': scrollXLoad,
        'virtual--y': scrollYLoad
      }]
    }, [
    /**
     * 隐藏列
     */
    h('div', {
      class: 'vxe-table-slots',
      ref: 'hideColumn'
    }, this.$slots.default), h('div', {
      class: 'vxe-table--main-wrapper'
    }, [
    /**
     * 表头
     */
    showHeader ? h('vxe-table-header', {
      ref: 'tableHeader',
      props: {
        tableData: tableData,
        tableColumn: tableColumn,
        tableGroupColumn: tableGroupColumn,
        size: vSize
      }
    }) : _e(),
    /**
     * 表体
     */
    h('vxe-table-body', {
      ref: 'tableBody',
      props: {
        tableData: tableData,
        tableColumn: tableColumn,
        size: vSize
      }
    }),
    /**
     * 表尾
     */
    showFooter ? h('vxe-table-footer', {
      ref: 'tableFooter',
      props: {
        footerData: footerData,
        tableColumn: tableColumn,
        size: vSize
      }
    }) : _e()]), h('div', {
      class: 'vxe-table--fixed-wrapper'
    }, [
    /**
     * 左侧固定区域
     */
    leftList && leftList.length && overflowX ? renderFixed(h, this, 'left') : _e(),
    /**
     * 右侧固定区域
     */
    rightList && rightList.length && overflowX ? renderFixed(h, this, 'right') : _e()]),
    /**
     * 空数据
     */
    h('div', {
      ref: 'emptyPlaceholder',
      class: 'vxe-table--empty-placeholder'
    }, [h('div', {
      class: 'vxe-table--empty-content'
    }, renderEmptyContenet(h, this))]),
    /**
     * 边框线
     */
    h('div', {
      class: 'vxe-table--border-line'
    }),
    /**
     * 列宽线
     */
    h('div', {
      class: 'vxe-table--resizable-bar',
      style: overflowX ? {
        'padding-bottom': "".concat(scrollbarHeight, "px")
      } : null,
      ref: 'resizeBar'
    }),
    /**
     * 加载中
     */
    h('div', {
      class: ['vxe-table--loading vxe-loading', {
        'is--visible': loading
      }]
    }, [h('div', {
      class: 'vxe-loading--spinner'
    })]),
    /**
     * 筛选
     */
    initStore.filter ? h('vxe-table-filter', {
      ref: 'filterWrapper',
      props: {
        filterStore: filterStore
      }
    }) : _e(),
    /**
     * 导入
     */
    initStore.import && this.importConfig ? h('vxe-import-panel', {
      props: {
        defaultOptions: this.importParams,
        storeData: this.importStore
      }
    }) : _e(),
    /**
     * 导出
     */
    initStore.export && this.exportConfig ? h('vxe-export-panel', {
      props: {
        defaultOptions: this.exportParams,
        storeData: this.exportStore
      }
    }) : _e(),
    /**
     * 快捷菜单
     */
    ctxMenuStore.visible && this.isCtxMenu ? h('vxe-table-context-menu', {
      ref: 'ctxWrapper',
      props: {
        ctxMenuStore: ctxMenuStore,
        ctxMenuOpts: ctxMenuOpts
      }
    }) : _e(),
    /**
     * 工具提示
     */
    hasTip ? h('vxe-tooltip', {
      key: 'mTip',
      ref: 'tooltip',
      props: tooltipOpts
    }) : _e(),
    /**
     * 校验提示
     */
    hasTip && this.editRules && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip') ? h('vxe-tooltip', {
      key: 'vTip',
      ref: 'validTip',
      class: 'vxe-table--valid-error',
      props: validOpts.message === 'tooltip' || tableData.length === 1 ? vaildTipOpts : null
    }) : _e()]);
  },
  methods: methods
});
// CONCATENATED MODULE: ./packages/table/index.js





table.install = function (Vue) {
  if (typeof window !== 'undefined' && window.VXETableMixin) {
    table.mixins.push(window.VXETableMixin);
    delete window.VXETableMixin;
  }

  v_x_e_table.Vue = Vue;
  v_x_e_table.Table = table;

  if (!Vue.prototype.$vxe) {
    Vue.prototype.$vxe = {
      t: v_x_e_table.t
    };
  } else {
    Vue.prototype.$vxe.t = v_x_e_table.t;
  }

  Vue.component(table.name, table);
  Vue.component(src_body.name, src_body);
};

var Table = table;
/* harmony default export */ var packages_table = (table);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// CONCATENATED MODULE: ./packages/column/src/column.js






var column_props = {
  // 列唯一主键
  colId: [String, Number],
  // 渲染类型 seq,radio,checkbox,expand,html
  type: String,
  // 列字段名
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
  // 表尾列的对齐方式
  footerAlign: String,
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
  // 当表尾内容过长时显示为省略号
  showFooterOverflow: {
    type: [Boolean, String],
    default: null
  },
  // 给单元格附加 className
  className: [String, Function],
  // 给表头单元格附加 className
  headerClassName: [String, Function],
  // 给表尾单元格附加 className
  footerClassName: [String, Function],
  // 格式化显示内容
  formatter: [Function, Array, String],
  // 是否允许排序
  sortable: Boolean,
  // 是否服务端排序
  remoteSort: {
    type: Boolean,
    default: null
  },
  // 自定义排序的属性
  sortBy: [String, Array],
  // 自定义排序方法
  sortMethod: Function,
  // 配置筛选条件数组
  filters: {
    type: Array,
    default: null
  },
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
  // 是否可视
  visible: {
    type: Boolean,
    default: null
  },
  // 单元格数据导出方法
  exportMethod: Function,
  // 表尾单元格数据导出方法
  footerExportMethod: Function,
  // 标题帮助图标配置项
  titleHelp: Object,
  // 单元格值类型
  cellType: String,
  // 单元格渲染配置项
  cellRender: Object,
  // 单元格编辑渲染配置项
  editRender: Object,
  // 内容渲染配置项
  contentRender: Object,
  // 额外的参数
  params: Object
};
var watch = {};
Object.keys(column_props).forEach(function (name) {
  watch[name] = function (value) {
    this.columnConfig.update(name, value);
  };
});
/* harmony default export */ var src_column = ({
  name: 'VxeTableColumn',
  props: column_props,
  provide: function provide() {
    return {
      $xecolumn: this
    };
  },
  inject: {
    $xetable: {
      default: null
    },
    $xecolumn: {
      default: null
    }
  },
  watch: watch,
  created: function created() {
    this.columnConfig = this.createColumn(this.$xetable, this);
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
  methods: src_cell
});
// CONCATENATED MODULE: ./packages/column/src/group.js

/* harmony default export */ var src_group = ({
  name: 'VxeTableColgroup',
  extends: src_column,
  provide: function provide() {
    return {
      xecolgroup: this
    };
  }
});
// CONCATENATED MODULE: ./packages/column/index.js




src_column.install = function (Vue) {
  Vue.component(src_column.name, src_column);
  Vue.component(src_group.name, src_group);
};

var Column = src_column;
/* harmony default export */ var packages_column = (src_column);
// CONCATENATED MODULE: ./packages/header/src/util.js





var util_getAllColumns = function getAllColumns(columns, parentColumn) {
  var result = [];
  columns.forEach(function (column) {
    column.parentId = parentColumn ? parentColumn.id : null;

    if (column.visible) {
      if (column.children && column.children.length && column.children.some(function (column) {
        return column.visible;
      })) {
        result.push(column);
        result.push.apply(result, _toConsumableArray(getAllColumns(column.children, column)));
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

  var allColumns = util_getAllColumns(originColumns);
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
// CONCATENATED MODULE: ./packages/header/src/header.js








var header_cellType = 'header';
/* harmony default export */ var header = ({
  name: 'VxeTableHeader',
  props: {
    tableData: Array,
    tableColumn: Array,
    tableGroupColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
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
  mounted: function mounted() {
    var $xetable = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $xetable.elemStore;
    var prefix = "".concat(fixedType || 'main', "-header-");
    elemStore["".concat(prefix, "wrapper")] = $el;
    elemStore["".concat(prefix, "table")] = $refs.table;
    elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    elemStore["".concat(prefix, "list")] = $refs.thead;
    elemStore["".concat(prefix, "xSpace")] = $refs.xSpace;
    elemStore["".concat(prefix, "repair")] = $refs.repair;
  },
  render: function render(h) {
    var _this = this;

    var _e = this._e,
        $xetable = this.$parent,
        fixedType = this.fixedType,
        headerColumn = this.headerColumn,
        fixedColumn = this.fixedColumn;
    var tableListeners = $xetable.$listeners,
        tId = $xetable.tId,
        resizable = $xetable.resizable,
        border = $xetable.border,
        columnKey = $xetable.columnKey,
        headerRowClassName = $xetable.headerRowClassName,
        headerCellClassName = $xetable.headerCellClassName,
        headerRowStyle = $xetable.headerRowStyle,
        headerCellStyle = $xetable.headerCellStyle,
        allColumnHeaderOverflow = $xetable.showHeaderOverflow,
        allHeaderAlign = $xetable.headerAlign,
        allAlign = $xetable.align,
        highlightCurrentColumn = $xetable.highlightCurrentColumn,
        currentColumn = $xetable.currentColumn,
        scrollXLoad = $xetable.scrollXLoad,
        overflowX = $xetable.overflowX,
        scrollbarWidth = $xetable.scrollbarWidth,
        sortOpts = $xetable.sortOpts,
        mouseConfig = $xetable.mouseConfig;
    var tableColumn = this.tableColumn; // 横向滚动渲染

    if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }
    }

    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      attrs: {
        'data-tid': tId
      }
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('table', {
      class: 'vxe-table--header',
      attrs: {
        'data-tid': tId,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      ref: 'table'
    }, [
    /**
     * 列宽
     */
    h('colgroup', {
      ref: 'colgroup'
    }, tableColumn.map(function (column, $columnIndex) {
      return h('col', {
        attrs: {
          name: column.id
        },
        key: $columnIndex
      });
    }).concat(scrollbarWidth ? [h('col', {
      attrs: {
        name: 'col_gutter'
      }
    })] : [])),
    /**
     * 头部
     */
    h('thead', {
      ref: 'thead'
    }, headerColumn.map(function (cols, $rowIndex) {
      return h('tr', {
        class: ['vxe-header--row', headerRowClassName ? ctor_amd_xe_utils_default.a.isFunction(headerRowClassName) ? headerRowClassName({
          $table: $xetable,
          $rowIndex: $rowIndex,
          fixed: fixedType,
          type: header_cellType
        }) : headerRowClassName : ''],
        style: headerRowStyle ? ctor_amd_xe_utils_default.a.isFunction(headerRowStyle) ? headerRowStyle({
          $table: $xetable,
          $rowIndex: $rowIndex,
          fixed: fixedType,
          type: header_cellType
        }) : headerRowStyle : null
      }, cols.map(function (column, $columnIndex) {
        var _ref;

        var type = column.type,
            showHeaderOverflow = column.showHeaderOverflow,
            headerAlign = column.headerAlign,
            align = column.align,
            headerClassName = column.headerClassName; // const { enabled } = tooltipOpts

        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var headOverflow = ctor_amd_xe_utils_default.a.isUndefined(showHeaderOverflow) || ctor_amd_xe_utils_default.a.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
        var headAlign = headerAlign || align || allHeaderAlign || allAlign;
        var showEllipsis = headOverflow === 'ellipsis';
        var showTitle = headOverflow === 'title';
        var showTooltip = headOverflow === true || headOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var thOns = {};
        var hasFilter = column.filters && column.filters.some(function (item) {
          return item.checked;
        });
        var columnIndex = $xetable.getColumnIndex(column);

        var _columnIndex = $xetable._getColumnIndex(column);

        var params = {
          $table: $xetable,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          _columnIndex: _columnIndex,
          fixed: fixedType,
          type: header_cellType,
          isHidden: fixedHiddenColumn,
          hasFilter: hasFilter
        }; // 虚拟滚动不支持动态高度

        if (scrollXLoad && !hasEllipsis) {
          showEllipsis = hasEllipsis = true;
        }

        if (highlightCurrentColumn || tableListeners['header-cell-click'] || sortOpts.trigger === 'cell') {
          thOns.click = function (evnt) {
            return $xetable.triggerHeaderCellClickEvent(evnt, params);
          };
        }

        if (tableListeners['header-cell-dblclick']) {
          thOns.dblclick = function (evnt) {
            return $xetable.triggerHeaderCellDBLClickEvent(evnt, params);
          };
        } // 按下事件处理


        if (mouseConfig) {
          thOns.mousedown = function (evnt) {
            return $xetable.triggerHeaderCellMousedownEvent(evnt, params);
          };
        }

        return h('th', {
          class: ['vxe-header--column', column.id, (_ref = {}, _defineProperty(_ref, "col--".concat(headAlign), headAlign), _defineProperty(_ref, "col--".concat(type), type), _defineProperty(_ref, 'col--last', $columnIndex === cols.length - 1), _defineProperty(_ref, 'col--fixed', column.fixed), _defineProperty(_ref, 'col--group', isColGroup), _defineProperty(_ref, 'col--ellipsis', hasEllipsis), _defineProperty(_ref, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref, 'is--sortable', column.sortable), _defineProperty(_ref, 'is--filter', !!column.filters), _defineProperty(_ref, 'filter--active', hasFilter), _defineProperty(_ref, 'col--current', currentColumn === column), _ref), UtilTools.getClass(headerClassName, params), UtilTools.getClass(headerCellClassName, params)],
          attrs: {
            'data-colid': column.id,
            colspan: column.colSpan > 1 ? column.colSpan : null,
            rowspan: column.rowSpan > 1 ? column.rowSpan : null
          },
          style: headerCellStyle ? ctor_amd_xe_utils_default.a.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle : null,
          on: thOns,
          key: columnKey || isColGroup ? column.id : $columnIndex
        }, [h('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }]
        }, column.renderHeader(h, params)),
        /**
         * 列宽拖动
         */
        !fixedHiddenColumn && !isColGroup && (ctor_amd_xe_utils_default.a.isBoolean(column.resizable) ? column.resizable : resizable) ? h('div', {
          class: ['vxe-resizable', {
            'is--line': !border || border === 'none'
          }],
          on: {
            mousedown: function mousedown(evnt) {
              return _this.resizeMousedown(evnt, params);
            }
          }
        }) : null]);
      }).concat(scrollbarWidth ? [h('th', {
        class: 'col--gutter'
      })] : []));
    }))]),
    /**
     * 其他
     */
    h('div', {
      class: 'vxe-table--header-border-line',
      ref: 'repair'
    })]);
  },
  methods: {
    uploadColumn: function uploadColumn() {
      var $xetable = this.$parent;
      this.headerColumn = $xetable.isGroup ? convertToRows(this.tableGroupColumn) : [$xetable.scrollXLoad && this.fixedType ? this.fixedColumn : this.tableColumn];
    },
    resizeMousedown: function resizeMousedown(evnt, params) {
      var column = params.column;
      var $xetable = this.$parent,
          $el = this.$el,
          fixedType = this.fixedType;
      var _$xetable$$refs = $xetable.$refs,
          tableBody = _$xetable$$refs.tableBody,
          leftContainer = _$xetable$$refs.leftContainer,
          rightContainer = _$xetable$$refs.rightContainer,
          resizeBarElem = _$xetable$$refs.resizeBar;
      var dragBtnElem = evnt.target,
          dragClientX = evnt.clientX;
      var cell = dragBtnElem.parentNode;
      var dragLeft = 0;
      var tableBodyElem = tableBody.$el;
      var pos = DomTools.getOffsetPos(dragBtnElem, $el);
      var dragBtnWidth = dragBtnElem.clientWidth;
      var dragBtnOffsetWidth = Math.floor(dragBtnWidth / 2);
      var minInterval = UtilTools.getColMinWidth($xetable, column) - dragBtnOffsetWidth; // 列之间的最小间距

      var dragMinLeft = pos.left - cell.clientWidth + dragBtnWidth + minInterval;
      var dragPosLeft = pos.left + dragBtnOffsetWidth;
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
        } else {
          dragMinLeft = Math.max(tableBodyElem.scrollLeft, dragMinLeft); // left = Math.min(left, tableBodyElem.clientWidth + tableBodyElem.scrollLeft - 40)
        }

        dragLeft = Math.max(left, dragMinLeft);
        resizeBarElem.style.left = "".concat(dragLeft - scrollLeft, "px");
      };

      $xetable._isResize = true;
      DomTools.addClass($xetable.$el, 'drag--resize');
      resizeBarElem.style.display = 'block';
      document.onmousemove = updateEvent;

      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        column.resizeWidth = column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft);
        resizeBarElem.style.display = 'none';
        $xetable._isResize = false;
        $xetable._lastResizeTime = Date.now();
        $xetable.analyColumnWidth();
        $xetable.saveCustomResizable();
        $xetable.recalculate(true).then(function () {
          $xetable.updateCellAreas();
        });
        DomTools.removeClass($xetable.$el, 'drag--resize');
        $xetable.emitEvent('resizable-change', params, evnt);
      };

      updateEvent(evnt);
      $xetable.closeMenu();
    }
  }
});
// CONCATENATED MODULE: ./packages/header/index.js



header.install = function (Vue) {
  Vue.component(header.name, header);
};

var Header = header;
/* harmony default export */ var packages_header = (header);
// CONCATENATED MODULE: ./packages/footer/src/footer.js






var footer_cellType = 'footer';

function mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex) {
  for (var mIndex = 0; mIndex < mergeFooterList.length; mIndex++) {
    var _mergeFooterList$mInd = mergeFooterList[mIndex],
        mergeRowIndex = _mergeFooterList$mInd.row,
        mergeColIndex = _mergeFooterList$mInd.col,
        mergeRowspan = _mergeFooterList$mInd.rowspan,
        mergeColspan = _mergeFooterList$mInd.colspan;

    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return {
          rowspan: mergeRowspan,
          colspan: mergeColspan
        };
      }

      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
}

/* harmony default export */ var footer = ({
  name: 'VxeTableFooter',
  props: {
    footerData: Array,
    tableColumn: Array,
    fixedColumn: Array,
    fixedType: String,
    size: String
  },
  mounted: function mounted() {
    var $xetable = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $xetable.elemStore;
    var prefix = "".concat(fixedType || 'main', "-footer-");
    elemStore["".concat(prefix, "wrapper")] = $el;
    elemStore["".concat(prefix, "table")] = $refs.table;
    elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    elemStore["".concat(prefix, "list")] = $refs.tfoot;
    elemStore["".concat(prefix, "xSpace")] = $refs.xSpace;
  },
  render: function render(h) {
    var _e = this._e,
        $xetable = this.$parent,
        fixedType = this.fixedType,
        fixedColumn = this.fixedColumn,
        tableColumn = this.tableColumn,
        footerData = this.footerData;
    var tableListeners = $xetable.$listeners,
        tId = $xetable.tId,
        footerRowClassName = $xetable.footerRowClassName,
        footerCellClassName = $xetable.footerCellClassName,
        footerRowStyle = $xetable.footerRowStyle,
        footerCellStyle = $xetable.footerCellStyle,
        allFooterAlign = $xetable.footerAlign,
        mergeFooterList = $xetable.mergeFooterList,
        footerSpanMethod = $xetable.footerSpanMethod,
        allAlign = $xetable.align,
        scrollXLoad = $xetable.scrollXLoad,
        columnKey = $xetable.columnKey,
        allColumnFooterOverflow = $xetable.showFooterOverflow,
        currentColumn = $xetable.currentColumn,
        overflowX = $xetable.overflowX,
        scrollbarWidth = $xetable.scrollbarWidth,
        tooltipOpts = $xetable.tooltipOpts; // 如果是使用优化模式

    if (!mergeFooterList.length || !footerSpanMethod) {
      if (fixedType && allColumnFooterOverflow) {
        tableColumn = fixedColumn;
      } else if (scrollXLoad) {
        if (fixedType) {
          tableColumn = fixedColumn;
        }
      }
    }

    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      attrs: {
        'data-tid': tId
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('table', {
      class: 'vxe-table--footer',
      attrs: {
        'data-tid': tId,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      ref: 'table'
    }, [
    /**
     * 列宽
     */
    h('colgroup', {
      ref: 'colgroup'
    }, tableColumn.map(function (column, $columnIndex) {
      return h('col', {
        attrs: {
          name: column.id
        },
        key: $columnIndex
      });
    }).concat(scrollbarWidth ? [h('col', {
      attrs: {
        name: 'col_gutter'
      }
    })] : [])),
    /**
     * 底部
     */
    h('tfoot', {
      ref: 'tfoot'
    }, footerData.map(function (list, _rowIndex) {
      var $rowIndex = _rowIndex;
      return h('tr', {
        class: ['vxe-footer--row', footerRowClassName ? ctor_amd_xe_utils_default.a.isFunction(footerRowClassName) ? footerRowClassName({
          $table: $xetable,
          _rowIndex: _rowIndex,
          $rowIndex: $rowIndex,
          fixed: fixedType,
          type: footer_cellType
        }) : footerRowClassName : ''],
        style: footerRowStyle ? ctor_amd_xe_utils_default.a.isFunction(footerRowStyle) ? footerRowStyle({
          $table: $xetable,
          _rowIndex: _rowIndex,
          $rowIndex: $rowIndex,
          fixed: fixedType,
          type: footer_cellType
        }) : footerRowStyle : null
      }, tableColumn.map(function (column, $columnIndex) {
        var _ref2;

        var type = column.type,
            showFooterOverflow = column.showFooterOverflow,
            footerAlign = column.footerAlign,
            align = column.align,
            footerClassName = column.footerClassName;
        var enabled = tooltipOpts.enabled;
        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var footOverflow = ctor_amd_xe_utils_default.a.isUndefined(showFooterOverflow) || ctor_amd_xe_utils_default.a.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow;
        var footAlign = footerAlign || align || allFooterAlign || allAlign;
        var showEllipsis = footOverflow === 'ellipsis';
        var showTitle = footOverflow === 'title';
        var showTooltip = footOverflow === true || footOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var attrs = {
          'data-colid': column.id
        };
        var tfOns = {};
        var columnIndex = $xetable.getColumnIndex(column);

        var _columnIndex = $xetable._getColumnIndex(column);

        var itemIndex = _columnIndex;
        var params = {
          $table: $xetable,
          _rowIndex: _rowIndex,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          _columnIndex: _columnIndex,
          itemIndex: itemIndex,
          items: list,
          fixed: fixedType,
          type: footer_cellType,
          data: footerData
        }; // 虚拟滚动不支持动态高度

        if (scrollXLoad && !hasEllipsis) {
          showEllipsis = hasEllipsis = true;
        }

        if (showTitle || showTooltip || enabled) {
          tfOns.mouseenter = function (evnt) {
            if (showTitle) {
              DomTools.updateCellTitle(evnt.currentTarget, column);
            } else if (showTooltip || enabled) {
              $xetable.triggerFooterTooltipEvent(evnt, params);
            }
          };
        }

        if (showTooltip || enabled) {
          tfOns.mouseleave = function (evnt) {
            if (showTooltip || enabled) {
              $xetable.handleTargetLeaveEvent(evnt);
            }
          };
        }

        if (tableListeners['footer-cell-click']) {
          tfOns.click = function (evnt) {
            $xetable.emitEvent('footer-cell-click', Object.assign({
              cell: evnt.currentTarget
            }, params), evnt);
          };
        }

        if (tableListeners['footer-cell-dblclick']) {
          tfOns.dblclick = function (evnt) {
            $xetable.emitEvent('footer-cell-dblclick', Object.assign({
              cell: evnt.currentTarget
            }, params), evnt);
          };
        } // 合并行或列


        if (mergeFooterList.length) {
          var spanRest = mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex);

          if (spanRest) {
            var rowspan = spanRest.rowspan,
                colspan = spanRest.colspan;

            if (!rowspan || !colspan) {
              return null;
            }

            if (rowspan > 1) {
              attrs.rowspan = rowspan;
            }

            if (colspan > 1) {
              attrs.colspan = colspan;
            }
          }
        } else if (footerSpanMethod) {
          // 自定义合并方法
          var _ref = footerSpanMethod(params) || {},
              _ref$rowspan = _ref.rowspan,
              _rowspan = _ref$rowspan === void 0 ? 1 : _ref$rowspan,
              _ref$colspan = _ref.colspan,
              _colspan = _ref$colspan === void 0 ? 1 : _ref$colspan;

          if (!_rowspan || !_colspan) {
            return null;
          }

          if (_rowspan > 1) {
            attrs.rowspan = _rowspan;
          }

          if (_colspan > 1) {
            attrs.colspan = _colspan;
          }
        }

        return h('td', {
          class: ['vxe-footer--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(footAlign), footAlign), _defineProperty(_ref2, "col--".concat(type), type), _defineProperty(_ref2, 'col--last', $columnIndex === tableColumn.length - 1), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'col--current', currentColumn === column), _ref2), UtilTools.getClass(footerClassName, params), UtilTools.getClass(footerCellClassName, params)],
          attrs: attrs,
          style: footerCellStyle ? ctor_amd_xe_utils_default.a.isFunction(footerCellStyle) ? footerCellStyle(params) : footerCellStyle : null,
          on: tfOns,
          key: columnKey ? column.id : $columnIndex
        }, [h('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }]
        }, column.renderFooter(h, params))]);
      }).concat(scrollbarWidth ? [h('td', {
        class: 'col--gutter'
      })] : []));
    }))])]);
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent: function scrollEvent(evnt) {
      var $xetable = this.$parent,
          fixedType = this.fixedType;
      var $refs = $xetable.$refs,
          scrollXLoad = $xetable.scrollXLoad,
          triggerScrollXEvent = $xetable.triggerScrollXEvent,
          lastScrollLeft = $xetable.lastScrollLeft;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          tableFooter = $refs.tableFooter,
          validTip = $refs.validTip;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;
      var bodyElem = tableBody.$el;
      var scrollLeft = footerElem.scrollLeft;
      var isX = scrollLeft !== lastScrollLeft;
      $xetable.lastScrollLeft = scrollLeft;
      $xetable.lastScrollTime = Date.now();

      if (headerElem) {
        headerElem.scrollLeft = scrollLeft;
      }

      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft;
      }

      if (scrollXLoad && isX) {
        triggerScrollXEvent(evnt);
      }

      if (isX && validTip && validTip.visible) {
        validTip.updatePlacement();
      }

      $xetable.emitEvent('scroll', {
        type: footer_cellType,
        fixed: fixedType,
        scrollTop: bodyElem.scrollTop,
        scrollLeft: scrollLeft,
        isX: isX,
        isY: false
      }, evnt);
    }
  }
});
// CONCATENATED MODULE: ./packages/footer/index.js



footer.install = function (Vue) {
  Vue.component(footer.name, footer);
};

var Footer = footer;
/* harmony default export */ var packages_footer = (footer);
// CONCATENATED MODULE: ./packages/filter/src/panel.js











/* harmony default export */ var panel = ({
  name: 'VxeTableFilter',
  props: {
    filterStore: Object
  },
  computed: {
    hasCheckOption: function hasCheckOption() {
      var filterStore = this.filterStore;
      return filterStore && filterStore.options.some(function (option) {
        return option.checked;
      });
    }
  },
  render: function render(h) {
    var $xetable = this.$parent,
        filterStore = this.filterStore;
    var column = filterStore.column;
    var filterRender = column ? column.filterRender : null;
    var compConf = filterRender ? v_x_e_table.renderer.get(filterRender.name) : null;
    return h('div', {
      class: ['vxe-table--filter-wrapper', 'filter--prevent-default', compConf && compConf.className ? compConf.className : '', {
        't--animat': $xetable.animat,
        'is--multiple': filterStore.multiple,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? this.renderOptions(h, filterRender, compConf).concat(this.renderFooter(h)) : []);
  },
  methods: {
    renderOptions: function renderOptions(h, filterRender, compConf) {
      var _this = this;

      var $xetable = this.$parent,
          filterStore = this.filterStore;
      var args = filterStore.args,
          column = filterStore.column,
          multiple = filterStore.multiple;
      var slots = column.slots;

      if (slots && slots.filter) {
        return [h('div', {
          class: 'vxe-table--filter-template'
        }, slots.filter.call($xetable, Object.assign({
          $panel: this,
          context: this
        }, args), h))];
      } else if (compConf && compConf.renderFilter) {
        return [h('div', {
          class: 'vxe-table--filter-template'
        }, compConf.renderFilter.call($xetable, h, filterRender, Object.assign({
          $panel: this,
          context: this
        }, args)))];
      }

      return [h('ul', {
        class: 'vxe-table--filter-header'
      }, [h('li', {
        class: ['vxe-table--filter-option', {
          'is--checked': multiple ? filterStore.isAllSelected : !filterStore.options.some(function (item) {
            return item._checked;
          }),
          'is--indeterminate': multiple && filterStore.isIndeterminate
        }],
        attrs: {
          title: conf.i18n(multiple ? 'vxe.table.allTitle' : 'vxe.table.allFilter')
        },
        on: {
          click: function click(evnt) {
            _this.changeAllOption(evnt, !filterStore.isAllSelected);
          }
        }
      }, (multiple ? [h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
      })] : []).concat([h('span', {
        class: 'vxe-checkbox--label'
      }, conf.i18n('vxe.table.allFilter'))]))]), h('ul', {
        class: 'vxe-table--filter-body'
      }, filterStore.options.map(function (item) {
        return h('li', {
          class: ['vxe-table--filter-option', {
            'is--checked': item._checked
          }],
          attrs: {
            title: item.label
          },
          on: {
            click: function click(evnt) {
              _this.changeOption(evnt, !item._checked, item);
            }
          }
        }, (multiple ? [h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
        }), h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
        }), h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
        })] : []).concat([h('span', {
          class: 'vxe-checkbox--label'
        }, UtilTools.formatText(item.label, 1))]));
      }))];
    },
    renderFooter: function renderFooter(h) {
      var hasCheckOption = this.hasCheckOption,
          filterStore = this.filterStore;
      var column = filterStore.column,
          multiple = filterStore.multiple;
      var filterRender = column.filterRender;
      var compConf = filterRender ? v_x_e_table.renderer.get(filterRender.name) : null;
      var isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate;
      return multiple && (!compConf || compConf.isFooter !== false) ? [h('div', {
        class: 'vxe-table--filter-footer'
      }, [h('button', {
        class: {
          'is--disabled': isDisabled
        },
        attrs: {
          disabled: isDisabled
        },
        on: {
          click: this.confirmFilter
        }
      }, conf.i18n('vxe.table.confirmFilter')), h('button', {
        on: {
          click: this.resetFilter
        }
      }, conf.i18n('vxe.table.resetFilter'))])] : [];
    },
    // 全部筛选事件
    filterCheckAllEvent: function filterCheckAllEvent(evnt, value) {
      var filterStore = this.filterStore;
      filterStore.options.forEach(function (option) {
        option._checked = value;
        option.checked = value;
      });
      filterStore.isAllSelected = value;
      filterStore.isIndeterminate = false;
    },

    /*************************
     * Publish methods
     *************************/
    // （单选）筛选发生改变
    changeRadioOption: function changeRadioOption(evnt, checked, item) {
      var $xetable = this.$parent,
          filterStore = this.filterStore;
      filterStore.options.forEach(function (option) {
        option._checked = false;
      });
      item._checked = checked;
      $xetable.checkFilterOptions();
      this.confirmFilter(evnt);
    },
    // （多选）筛选发生改变
    changeMultipleOption: function changeMultipleOption(evnt, checked, item) {
      var $xetable = this.$parent;
      item._checked = checked;
      $xetable.checkFilterOptions();
    },
    changeAllOption: function changeAllOption(evnt, checked) {
      if (this.filterStore.multiple) {
        this.filterCheckAllEvent(evnt, checked);
      } else {
        this.resetFilter(evnt);
      }
    },
    // 筛选发生改变
    changeOption: function changeOption(evnt, checked, item) {
      if (this.filterStore.multiple) {
        this.changeMultipleOption(evnt, checked, item);
      } else {
        this.changeRadioOption(evnt, checked, item);
      }
    },
    // 确认筛选
    confirmFilter: function confirmFilter(evnt) {
      var $xetable = this.$parent,
          filterStore = this.filterStore;
      filterStore.options.forEach(function (option) {
        option.checked = option._checked;
      });
      $xetable.confirmFilterEvent(evnt);
    },
    // 重置筛选
    resetFilter: function resetFilter(evnt) {
      var $xetable = this.$parent;
      $xetable.resetFilterEvent(evnt);
    }
    /*************************
     * Publish methods
     *************************/

  }
});
// CONCATENATED MODULE: ./packages/filter/src/mixin.js










/* harmony default export */ var src_mixin = ({
  methods: {
    /**
     * 修改筛选条件列表
     * @param {ColumnInfo} column 列
     * @param {Array} options 选项
     */
    _setFilter: function _setFilter(column, options) {
      if (column.filters && options) {
        column.filters = UtilTools.getFilters(options);
      }

      return this.$nextTick();
    },
    checkFilterOptions: function checkFilterOptions() {
      var filterStore = this.filterStore;
      filterStore.isAllSelected = filterStore.options.every(function (item) {
        return item._checked;
      });
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(function (item) {
        return item._checked;
      });
    },

    /**
     * 点击筛选事件
     * 当筛选图标被点击时触发
     * 更新选项是否全部状态
     * 打开筛选面板
     * @param {Event} evnt 事件
     * @param {ColumnInfo} column 列配置
     * @param {Object} params 参数
     */
    triggerFilterEvent: function triggerFilterEvent(evnt, column, params) {
      var _this = this;

      var filterStore = this.filterStore;

      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false;
      } else {
        var targetElem = evnt.target,
            pageX = evnt.pageX;

        var _DomTools$getDomNode = DomTools.getDomNode(),
            visibleWidth = _DomTools$getDomNode.visibleWidth;

        Object.assign(filterStore, {
          args: params,
          multiple: column.filterMultiple,
          options: column.filters,
          column: column,
          style: null,
          visible: true
        }); // 复原状态

        filterStore.options.forEach(function (option) {
          option._checked = option.checked;
        });
        this.checkFilterOptions();
        this.initStore.filter = true;
        this.$nextTick(function () {
          var $refs = _this.$refs;
          var bodyElem = $refs.tableBody.$el;
          var filterWrapperElem = $refs.filterWrapper.$el;
          var filterWidth = filterWrapperElem.offsetWidth;
          var centerWidth = filterWidth / 2;
          var minMargin = 32;
          var left, right;
          var style = {
            top: "".concat(targetElem.offsetTop + targetElem.offsetParent.offsetTop + targetElem.offsetHeight + 8, "px")
          };

          if (column.fixed === 'left') {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth;
          } else if (column.fixed === 'right') {
            right = targetElem.offsetParent.offsetWidth - targetElem.offsetLeft + (targetElem.offsetParent.offsetParent.offsetWidth - targetElem.offsetParent.offsetLeft) - column.renderWidth - centerWidth;
          } else {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth - bodyElem.scrollLeft;
          }

          if (left) {
            var overflowWidth = pageX + filterWidth - centerWidth + minMargin - visibleWidth;

            if (overflowWidth > 0) {
              left -= overflowWidth;
            }

            style.left = "".concat(Math.max(minMargin, left), "px");
          } else if (right) {
            var _overflowWidth = pageX + filterWidth - centerWidth + minMargin - visibleWidth;

            if (_overflowWidth > 0) {
              right += _overflowWidth;
            }

            style.right = "".concat(right, "px");
          }

          filterStore.style = style;
        });
      }
    },

    /**
     * 确认筛选
     * 当筛选面板中的确定按钮被按下时触发
     * @param {Event} evnt 事件
     */
    confirmFilterEvent: function confirmFilterEvent(evnt) {
      var _this2 = this;

      var visibleColumn = this.visibleColumn,
          filterStore = this.filterStore,
          remoteFilter = this.remoteFilter,
          filterOpts = this.filterOpts,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad;
      var column = filterStore.column;
      var property = column.property;
      var values = [];
      var datas = [];
      column.filters.forEach(function (item) {
        if (item.checked) {
          values.push(item.value);
          datas.push(item.data);
        }
      });
      filterStore.visible = false; // 如果是服务端筛选，则跳过本地筛选处理

      if (!(filterOpts.remote || remoteFilter)) {
        this.handleTableData(true);
        this.checkSelectionStatus();
      }

      var filterList = [];
      visibleColumn.filter(function (column) {
        var property = column.property,
            filters = column.filters;
        var valueList = [];
        var dataList = [];

        if (filters && filters.length) {
          filters.forEach(function (item) {
            if (item.checked) {
              valueList.push(item.value);
              dataList.push(item.data);
            }
          });
          filterList.push({
            column: column,
            property: property,
            values: valueList,
            datas: dataList
          });
        }
      });
      this.emitEvent('filter-change', {
        column: column,
        property: property,
        values: values,
        datas: datas,
        filters: filterList
      }, evnt);
      this.updateFooter();

      if (scrollXLoad || scrollYLoad) {
        this.clearScroll();

        if (scrollYLoad) {
          this.updateScrollYSpace();
        }
      }

      this.closeFilter();
      this.$nextTick(function () {
        _this2.recalculate();

        _this2.updateCellAreas();
      });
    },
    handleClearFilter: function handleClearFilter(column) {
      if (column) {
        var filters = column.filters,
            filterRender = column.filterRender;

        if (filters) {
          filters.forEach(function (item) {
            item._checked = false;
            item.checked = false;
            item.data = ctor_amd_xe_utils_default.a.clone(item.resetValue, true);
          });
          var compConf = filterRender ? v_x_e_table.renderer.get(filterRender.name) : null;

          if (compConf && compConf.filterResetMethod) {
            compConf.filterResetMethod({
              options: filters,
              column: column,
              $table: this
            });
          }
        }
      }
    },

    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    resetFilterEvent: function resetFilterEvent(evnt) {
      this.handleClearFilter(this.filterStore.column);
      this.confirmFilterEvent(evnt);
    },

    /**
     * 清空指定列的筛选条件
     * 如果为空则清空所有列的筛选条件
     * @param {String} column 列
     */
    _clearFilter: function _clearFilter(column) {
      if (arguments.length && ctor_amd_xe_utils_default.a.isString(column)) {
        column = this.getColumnByField(column);
      }

      var filterStore = this.filterStore;

      if (column) {
        this.handleClearFilter(column);
      } else {
        this.visibleColumn.forEach(this.handleClearFilter);
      }

      if (!column || column !== filterStore.column) {
        Object.assign(filterStore, {
          isAllSelected: false,
          isIndeterminate: false,
          style: null,
          options: [],
          column: null,
          multiple: false,
          visible: false
        });
      }

      return this.updateData();
    }
  }
});
// CONCATENATED MODULE: ./packages/filter/index.js






panel.install = function (Vue) {
  v_x_e_table.reg('filter');
  packages_table.mixins.push(src_mixin);
  Vue.component(panel.name, panel);
};

var Filter = panel;
/* harmony default export */ var filter = (panel);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js









function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
// CONCATENATED MODULE: ./packages/grid/src/grid.js

















var grid_methods = {};
var propKeys = Object.keys(packages_table.props);

function getOffsetHeight(elem) {
  return elem ? elem.offsetHeight : 0;
}

function getPaddingTopBottomSize(elem) {
  var computedStyle = getComputedStyle(elem);
  var paddingTop = ctor_amd_xe_utils_default.a.toNumber(computedStyle.paddingTop);
  var paddingBottom = ctor_amd_xe_utils_default.a.toNumber(computedStyle.paddingBottom);
  return paddingTop + paddingBottom;
}

function renderDefaultForm(h, _vm) {
  var proxyConfig = _vm.proxyConfig,
      proxyOpts = _vm.proxyOpts,
      formData = _vm.formData,
      formConfig = _vm.formConfig,
      formOpts = _vm.formOpts;

  if (formConfig && formOpts.items && formOpts.items.length) {
    if (!formOpts.inited) {
      formOpts.inited = true;
      var beforeItem = proxyOpts.beforeItem;

      if (proxyOpts && beforeItem) {
        formOpts.items.forEach(function (item) {
          beforeItem.call(_vm, {
            $grid: _vm,
            item: item
          });
        });
      }
    }

    return [h('vxe-form', {
      props: Object.assign({}, formOpts, {
        data: proxyConfig && proxyOpts.form ? formData : formOpts.data
      }),
      on: {
        submit: _vm.submitEvent,
        reset: _vm.resetEvent,
        'submit-invalid': _vm.submitInvalidEvent,
        'toggle-collapse': _vm.togglCollapseEvent
      },
      ref: 'form'
    })];
  }

  return [];
}

function getToolbarSlots(_vm) {
  var $scopedSlots = _vm.$scopedSlots,
      toolbarOpts = _vm.toolbarOpts;
  var toolbarOptSlots = toolbarOpts.slots;
  var $buttons;
  var $tools;
  var slots = {};

  if (toolbarOptSlots) {
    $buttons = toolbarOptSlots.buttons;
    $tools = toolbarOptSlots.tools;

    if ($buttons && $scopedSlots[$buttons]) {
      $buttons = $scopedSlots[$buttons];
    }

    if ($tools && $scopedSlots[$tools]) {
      $tools = $scopedSlots[$tools];
    }
  }

  if ($buttons) {
    slots.buttons = $buttons;
  }

  if ($tools) {
    slots.tools = $tools;
  }

  return slots;
}

function getPagerSlots(_vm) {
  var $scopedSlots = _vm.$scopedSlots,
      pagerOpts = _vm.pagerOpts;
  var pagerOptSlots = pagerOpts.slots;
  var slots = {};
  var $left;
  var $right;

  if (pagerOptSlots) {
    $left = pagerOptSlots.left;
    $right = pagerOptSlots.right;

    if ($left && $scopedSlots[$left]) {
      $left = $scopedSlots[$left];
    }

    if ($right && $scopedSlots[$right]) {
      $right = $scopedSlots[$right];
    }
  }

  if ($left) {
    slots.left = $left;
  }

  if ($right) {
    slots.right = $right;
  }

  return slots;
}

function getTableOns(_vm) {
  var $listeners = _vm.$listeners,
      proxyConfig = _vm.proxyConfig,
      proxyOpts = _vm.proxyOpts;
  var ons = {};
  ctor_amd_xe_utils_default.a.each($listeners, function (cb, type) {
    ons[type] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _vm.$emit.apply(_vm, [type].concat(args));
    };
  });

  if (proxyConfig) {
    if (proxyOpts.sort) {
      ons['sort-change'] = _vm.sortChangeEvent;
    }

    if (proxyOpts.filter) {
      ons['filter-change'] = _vm.filterChangeEvent;
    }
  }

  return ons;
}

Object.keys(packages_table.methods).forEach(function (name) {
  grid_methods[name] = function () {
    var _this$$refs$xTable;

    return this.$refs.xTable && (_this$$refs$xTable = this.$refs.xTable)[name].apply(_this$$refs$xTable, arguments);
  };
});
/* harmony default export */ var grid = ({
  name: 'VxeGrid',
  mixins: [size],
  props: _objectSpread2(_objectSpread2({}, packages_table.props), {}, {
    columns: Array,
    pagerConfig: [Boolean, Object],
    proxyConfig: Object,
    toolbar: [Boolean, Object],
    formConfig: [Boolean, Object],
    zoomConfig: Object,
    size: {
      type: String,
      default: function _default() {
        return conf.grid.size || conf.size;
      }
    }
  }),
  provide: function provide() {
    return {
      $xegrid: this
    };
  },
  data: function data() {
    return {
      tableLoading: false,
      isZMax: false,
      tableData: [],
      pendingRecords: [],
      filterData: [],
      formData: {},
      sortData: {},
      tZindex: 0,
      tablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  computed: {
    isMsg: function isMsg() {
      return this.proxyOpts.message !== false;
    },
    proxyOpts: function proxyOpts() {
      return Object.assign({}, conf.grid.proxyConfig, this.proxyConfig);
    },
    pagerOpts: function pagerOpts() {
      return Object.assign({}, conf.grid.pagerConfig, this.pagerConfig);
    },
    formOpts: function formOpts() {
      return Object.assign({}, conf.grid.formConfig, this.formConfig);
    },
    toolbarOpts: function toolbarOpts() {
      return Object.assign({}, conf.grid.toolbar, this.toolbar);
    },
    zoomOpts: function zoomOpts() {
      return Object.assign({}, conf.grid.zoomConfig, this.zoomConfig);
    },
    renderStyle: function renderStyle() {
      return this.isZMax ? {
        zIndex: this.tZindex
      } : null;
    },
    tableExtendProps: function tableExtendProps() {
      var _this = this;

      var rest = {};
      propKeys.forEach(function (key) {
        rest[key] = _this[key];
      });
      return rest;
    },
    tableProps: function tableProps() {
      var isZMax = this.isZMax,
          seqConfig = this.seqConfig,
          pagerConfig = this.pagerConfig,
          loading = this.loading,
          editConfig = this.editConfig,
          proxyConfig = this.proxyConfig,
          proxyOpts = this.proxyOpts,
          tableExtendProps = this.tableExtendProps,
          tableLoading = this.tableLoading,
          tablePage = this.tablePage,
          tableData = this.tableData;
      var props = Object.assign({}, tableExtendProps);

      if (isZMax) {
        if (tableExtendProps.maxHeight) {
          props.maxHeight = 'auto';
        } else {
          props.height = 'auto';
        }
      }

      if (proxyConfig) {
        props.loading = loading || tableLoading;
        props.data = tableData;
        props.rowClassName = this.handleRowClassName;

        if ((proxyOpts.seq || proxyOpts.index) && pagerConfig) {
          props.seqConfig = Object.assign({}, seqConfig, {
            startIndex: (tablePage.currentPage - 1) * tablePage.pageSize
          });
        }
      }

      if (editConfig) {
        props.editConfig = Object.assign({}, editConfig, {
          activeMethod: this.handleActiveMethod
        });
      }

      return props;
    },
    pagerProps: function pagerProps() {
      return Object.assign({}, this.pagerOpts, this.proxyConfig ? this.tablePage : {});
    }
  },
  watch: {
    columns: function columns(value) {
      var _this2 = this;

      this.$nextTick(function () {
        return _this2.loadColumn(value);
      });
    },
    toolbar: function toolbar(value) {
      if (value) {
        this.initToolbar();
      }
    },
    proxyConfig: function proxyConfig() {
      this.initProxy();
    },
    pagerConfig: function pagerConfig() {
      this.initPages();
    }
  },
  created: function created() {
    var data = this.data,
        formOpts = this.formOpts,
        proxyOpts = this.proxyOpts,
        proxyConfig = this.proxyConfig;

    if (proxyConfig && (data || proxyOpts.form && formOpts.data)) {
      console.error('[vxe-grid] There is a conflict between the props proxy-config and data.');
    }

    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
  },
  mounted: function mounted() {
    if (this.columns && this.columns.length) {
      this.loadColumn(this.columns);
    }

    this.initToolbar();
    this.initPages();
    this.initProxy();
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'keydown');
  },
  render: function render(h) {
    var _ref;

    var $scopedSlots = this.$scopedSlots,
        vSize = this.vSize,
        isZMax = this.isZMax;
    var hasForm = !!($scopedSlots.form || this.formConfig);
    var hasToolbar = !!($scopedSlots.toolbar || this.toolbar);
    var hasPager = !!($scopedSlots.pager || this.pagerConfig);
    return h('div', {
      class: ['vxe-grid', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 't--animat', !!this.animat), _defineProperty(_ref, 'is--round', this.round), _defineProperty(_ref, 'is--maximize', isZMax), _defineProperty(_ref, 'is--loading', this.loading || this.tableLoading), _ref)],
      style: this.renderStyle
    }, [
    /**
     * 渲染表单
     */
    hasForm ? h('div', {
      ref: 'formWrapper',
      class: 'vxe-grid--form-wrapper'
    }, $scopedSlots.form ? $scopedSlots.form.call(this, {
      $grid: this
    }, h) : renderDefaultForm(h, this)) : null,
    /**
     * 渲染工具栏
     */
    hasToolbar ? h('div', {
      ref: 'toolbarWrapper',
      class: 'vxe-grid--toolbar-wrapper'
    }, $scopedSlots.toolbar ? $scopedSlots.toolbar.call(this, {
      $grid: this
    }, h) : [h('vxe-toolbar', {
      props: this.toolbarOpts,
      ref: 'xToolbar',
      scopedSlots: getToolbarSlots(this)
    })]) : null,
    /**
     * 渲染表格顶部区域
     */
    $scopedSlots.top ? h('div', {
      ref: 'topWrapper',
      class: 'vxe-grid--top-wrapper'
    }, $scopedSlots.top.call(this, {
      $grid: this
    }, h)) : null,
    /**
     * 渲染表格
     */
    h('vxe-table', {
      props: this.tableProps,
      on: getTableOns(this),
      scopedSlots: $scopedSlots,
      ref: 'xTable'
    }, this.$slots.default),
    /**
     * 渲染表格底部区域
     */
    $scopedSlots.bottom ? h('div', {
      ref: 'bottomWrapper',
      class: 'vxe-grid--bottom-wrapper'
    }, $scopedSlots.bottom.call(this, {
      $grid: this
    }, h)) : null,
    /**
     * 渲染分页
     */
    hasPager ? h('div', {
      ref: 'pagerWrapper',
      class: 'vxe-grid--pager-wrapper'
    }, $scopedSlots.pager ? $scopedSlots.pager.call(this, {
      $grid: this
    }, h) : [h('vxe-pager', {
      props: this.pagerProps,
      on: {
        'page-change': this.pageChangeEvent
      },
      scopedSlots: getPagerSlots(this)
    })]) : null]);
  },
  methods: _objectSpread2(_objectSpread2({}, grid_methods), {}, {
    getParentHeight: function getParentHeight() {
      return (this.isZMax ? DomTools.getDomNode().visibleHeight : this.$el.parentNode.clientHeight) - this.getExcludeHeight();
    },

    /**
     * 获取需要排除的高度
     */
    getExcludeHeight: function getExcludeHeight() {
      var $refs = this.$refs,
          $el = this.$el,
          isZMax = this.isZMax;
      var formWrapper = $refs.formWrapper,
          toolbarWrapper = $refs.toolbarWrapper,
          topWrapper = $refs.topWrapper,
          bottomWrapper = $refs.bottomWrapper,
          pagerWrapper = $refs.pagerWrapper;
      var parentPaddingSize = isZMax ? 0 : getPaddingTopBottomSize($el.parentNode);
      return parentPaddingSize + getPaddingTopBottomSize($el) + getOffsetHeight(formWrapper) + getOffsetHeight(toolbarWrapper) + getOffsetHeight(topWrapper) + getOffsetHeight(bottomWrapper) + getOffsetHeight(pagerWrapper);
    },
    handleRowClassName: function handleRowClassName(params) {
      var rowClassName = this.rowClassName;
      var clss = [];

      if (this.pendingRecords.some(function (item) {
        return item === params.row;
      })) {
        clss.push('row--pending');
      }

      return clss.concat(rowClassName ? rowClassName(params) : []);
    },
    handleActiveMethod: function handleActiveMethod(params) {
      var activeMethod = this.editConfig.activeMethod;
      return this.pendingRecords.indexOf(params.row) === -1 && (!activeMethod || activeMethod(params));
    },
    loadColumn: function loadColumn(columns) {
      var $scopedSlots = this.$scopedSlots;
      ctor_amd_xe_utils_default.a.eachTree(columns, function (column) {
        if (column.slots) {
          ctor_amd_xe_utils_default.a.each(column.slots, function (func, name, slots) {
            if (!ctor_amd_xe_utils_default.a.isFunction(func)) {
              if ($scopedSlots[func]) {
                slots[name] = $scopedSlots[func];
              } else {
                slots[name] = null;
                UtilTools.error('vxe.error.notSlot', [func]);
              }
            }
          });
        }
      });
      this.$refs.xTable.loadColumn(columns);
    },
    reloadColumn: function reloadColumn(columns) {
      this.clearAll();
      return this.loadColumn(columns);
    },
    initToolbar: function initToolbar() {
      var _this3 = this;

      this.$nextTick(function () {
        var _this3$$refs = _this3.$refs,
            xTable = _this3$$refs.xTable,
            xToolbar = _this3$$refs.xToolbar;

        if (xTable && xToolbar) {
          xTable.connect(xToolbar);
        }
      });
    },
    initPages: function initPages() {
      var tablePage = this.tablePage,
          pagerConfig = this.pagerConfig,
          pagerOpts = this.pagerOpts;
      var currentPage = pagerOpts.currentPage,
          pageSize = pagerOpts.pageSize;

      if (pagerConfig) {
        if (currentPage) {
          tablePage.currentPage = currentPage;
        }

        if (pageSize) {
          tablePage.pageSize = pageSize;
        }
      }
    },
    initProxy: function initProxy() {
      var _this4 = this;

      var proxyInited = this.proxyInited,
          proxyConfig = this.proxyConfig,
          proxyOpts = this.proxyOpts,
          formConfig = this.formConfig,
          formOpts = this.formOpts;

      if (proxyConfig) {
        if (formConfig && proxyOpts.form && formOpts.items) {
          var formData = {};
          formOpts.items.forEach(function (_ref2) {
            var field = _ref2.field,
                itemRender = _ref2.itemRender;

            if (field) {
              formData[field] = itemRender && !ctor_amd_xe_utils_default.a.isUndefined(itemRender.defaultValue) ? itemRender.defaultValue : undefined;
            }
          });
          this.formData = formData;
        }

        if (!proxyInited && proxyOpts.autoLoad !== false) {
          this.proxyInited = true;
          this.$nextTick(function () {
            return _this4.commitProxy('init');
          });
        }
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var isEsc = evnt.keyCode === 27;

      if (isEsc && this.isZMax && this.zoomOpts.escRestore !== false) {
        this.triggerZoomEvent(evnt);
      }
    },

    /**
     * 提交指令，支持 code 或 button
     * @param {String/Object} code 字符串或对象
     */
    commitProxy: function commitProxy(code) {
      var _this5 = this;

      var $refs = this.$refs,
          toolbar = this.toolbar,
          toolbarOpts = this.toolbarOpts,
          proxyOpts = this.proxyOpts,
          tablePage = this.tablePage,
          pagerConfig = this.pagerConfig,
          sortData = this.sortData,
          filterData = this.filterData,
          formData = this.formData,
          isMsg = this.isMsg;
      var beforeQuery = proxyOpts.beforeQuery,
          afterQuery = proxyOpts.afterQuery,
          beforeDelete = proxyOpts.beforeDelete,
          afterDelete = proxyOpts.afterDelete,
          beforeSave = proxyOpts.beforeSave,
          afterSave = proxyOpts.afterSave,
          _proxyOpts$ajax = proxyOpts.ajax,
          ajax = _proxyOpts$ajax === void 0 ? {} : _proxyOpts$ajax,
          _proxyOpts$props = proxyOpts.props,
          props = _proxyOpts$props === void 0 ? {} : _proxyOpts$props;
      var $xetable = $refs.xTable;
      var button;

      if (ctor_amd_xe_utils_default.a.isString(code)) {
        var matchObj = toolbar ? ctor_amd_xe_utils_default.a.findTree(toolbarOpts.buttons, function (item) {
          return item.code === code;
        }, {
          children: 'dropdowns'
        }) : null;
        button = matchObj ? matchObj.item : null;
      } else {
        button = code;
        code = button.code;
      }

      var btnParams = button ? button.params : null;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      switch (code) {
        case 'insert':
          this.insert();
          break;

        case 'insert_actived':
          this.insert().then(function (_ref3) {
            var row = _ref3.row;
            return _this5.setActiveRow(row);
          });
          break;

        case 'mark_cancel':
          this.triggerPendingEvent(code);
          break;

        case 'remove':
          return this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', function () {
            return _this5.removeCheckboxRow();
          });

        case 'import':
          this.importData(btnParams);
          break;

        case 'open_import':
          this.openImport(btnParams);
          break;

        case 'export':
          this.exportData(btnParams);
          break;

        case 'open_export':
          this.openExport(btnParams);
          break;

        case 'reset_custom':
          this.resetColumn(true);
          break;

        case 'init':
        case 'reload':
        case 'query':
          {
            var isInited = code === 'init';
            var isReload = code === 'reload';
            var ajaxMethods = ajax.query;

            if (ajaxMethods) {
              var params = {
                code: code,
                button: button,
                $grid: this,
                sort: sortData,
                filters: filterData,
                form: formData,
                options: ajaxMethods
              };

              if (pagerConfig) {
                if (isReload) {
                  tablePage.currentPage = 1;
                }

                params.page = tablePage;
              }

              if (isInited || isReload) {
                var defaultSort = $xetable.sortOpts.defaultSort;
                var sortParams = {}; // 如果使用默认排序

                if (defaultSort) {
                  sortParams = {
                    property: defaultSort.field,
                    order: defaultSort.order
                  };
                }

                this.sortData = params.sort = sortParams;
                this.filterData = params.filters = [];
                this.pendingRecords = [];
                this.clearAll();
              }

              var applyArgs = [params].concat(args);
              this.tableLoading = true;
              return Promise.resolve((beforeQuery || ajaxMethods).apply(this, applyArgs)).catch(function (e) {
                return e;
              }).then(function (rest) {
                _this5.tableLoading = false;

                if (rest) {
                  if (pagerConfig) {
                    tablePage.total = ctor_amd_xe_utils_default.a.get(rest, props.total || 'page.total') || 0;
                    _this5.tableData = ctor_amd_xe_utils_default.a.get(rest, props.result || props.data || 'result') || [];
                  } else {
                    _this5.tableData = (props.list ? ctor_amd_xe_utils_default.a.get(rest, props.list) : rest) || [];
                  }
                } else {
                  _this5.tableData = [];
                }

                if (afterQuery) {
                  afterQuery.apply(void 0, _toConsumableArray(applyArgs));
                }
              });
            } else {
              UtilTools.error('vxe.error.notFunc', ['query']);
            }

            break;
          }

        case 'delete':
          {
            var _ajaxMethods = ajax.delete;

            if (_ajaxMethods) {
              var removeRecords = this.getCheckboxRecords();
              var body = {
                removeRecords: removeRecords
              };

              var _applyArgs = [{
                $grid: this,
                code: code,
                button: button,
                body: body,
                options: _ajaxMethods
              }].concat(args);

              if (removeRecords.length) {
                return this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', function () {
                  _this5.tableLoading = true;
                  return Promise.resolve((beforeDelete || _ajaxMethods).apply(_this5, _applyArgs)).then(function (rest) {
                    _this5.tableLoading = false;
                    _this5.pendingRecords = _this5.pendingRecords.filter(function (row) {
                      return removeRecords.indexOf(row) === -1;
                    });

                    if (isMsg) {
                      v_x_e_table.modal.message({
                        message: _this5.getRespMsg(rest, 'vxe.grid.delSuccess'),
                        status: 'success'
                      });
                    }

                    if (afterDelete) {
                      afterDelete.apply(void 0, _toConsumableArray(_applyArgs));
                    } else {
                      _this5.commitProxy('query');
                    }
                  }).catch(function (rest) {
                    _this5.tableLoading = false;

                    if (isMsg) {
                      v_x_e_table.modal.message({
                        id: code,
                        message: _this5.getRespMsg(rest, 'vxe.grid.operError'),
                        status: 'error'
                      });
                    }
                  });
                });
              } else {
                if (isMsg) {
                  v_x_e_table.modal.message({
                    id: code,
                    message: conf.i18n('vxe.grid.selectOneRecord'),
                    status: 'warning'
                  });
                }
              }
            } else {
              UtilTools.error('vxe.error.notFunc', [code]);
            }

            break;
          }

        case 'save':
          {
            var _ajaxMethods2 = ajax.save;

            if (_ajaxMethods2) {
              var _body = Object.assign({
                pendingRecords: this.pendingRecords
              }, this.getRecordset());

              var insertRecords = _body.insertRecords,
                  _removeRecords = _body.removeRecords,
                  updateRecords = _body.updateRecords,
                  pendingRecords = _body.pendingRecords;

              var _applyArgs2 = [{
                $grid: this,
                code: code,
                button: button,
                body: _body,
                options: _ajaxMethods2
              }].concat(args); // 排除掉新增且标记为删除的数据


              if (insertRecords.length) {
                _body.pendingRecords = pendingRecords.filter(function (row) {
                  return insertRecords.indexOf(row) === -1;
                });
              } // 排除已标记为删除的数据


              if (pendingRecords.length) {
                _body.insertRecords = insertRecords.filter(function (row) {
                  return pendingRecords.indexOf(row) === -1;
                });
              } // 只校验新增和修改的数据


              return this.validate(_body.insertRecords.concat(updateRecords)).then(function () {
                if (_body.insertRecords.length || _removeRecords.length || updateRecords.length || _body.pendingRecords.length) {
                  _this5.tableLoading = true;
                  return Promise.resolve((beforeSave || _ajaxMethods2).apply(_this5, _applyArgs2)).then(function (rest) {
                    _this5.tableLoading = false;
                    _this5.pendingRecords = [];

                    if (isMsg) {
                      v_x_e_table.modal.message({
                        message: _this5.getRespMsg(rest, 'vxe.grid.saveSuccess'),
                        status: 'success'
                      });
                    }

                    if (afterSave) {
                      afterSave.apply(void 0, _toConsumableArray(_applyArgs2));
                    } else {
                      _this5.commitProxy('query');
                    }
                  }).catch(function (rest) {
                    _this5.tableLoading = false;

                    if (isMsg) {
                      v_x_e_table.modal.message({
                        id: code,
                        message: _this5.getRespMsg(rest, 'vxe.grid.operError'),
                        status: 'error'
                      });
                    }
                  });
                } else {
                  if (isMsg) {
                    v_x_e_table.modal.message({
                      id: code,
                      message: conf.i18n('vxe.grid.dataUnchanged'),
                      status: 'info'
                    });
                  }
                }
              }).catch(function (errMap) {
                return errMap;
              });
            } else {
              UtilTools.error('vxe.error.notFunc', [code]);
            }

            break;
          }

        default:
          {
            var btnMethod = v_x_e_table.commands.get(code);

            if (btnMethod) {
              btnMethod.apply(this, [{
                code: code,
                button: button,
                $grid: this,
                $table: $xetable
              }].concat(args));
            }
          }
      }

      return this.$nextTick();
    },
    getRespMsg: function getRespMsg(rest, defaultMsg) {
      var _this$proxyOpts$props = this.proxyOpts.props,
          props = _this$proxyOpts$props === void 0 ? {} : _this$proxyOpts$props;
      var msg;

      if (rest && props.message) {
        msg = ctor_amd_xe_utils_default.a.get(rest, props.message);
      }

      return msg || conf.i18n(defaultMsg);
    },
    handleDeleteRow: function handleDeleteRow(code, alertKey, callback) {
      var selectRecords = this.getCheckboxRecords();

      if (this.isMsg) {
        if (selectRecords.length) {
          return v_x_e_table.modal.confirm({
            id: "cfm_".concat(code),
            message: conf.i18n(alertKey),
            escClosable: true
          }).then(function (type) {
            if (type === 'confirm') {
              callback();
            }
          });
        } else {
          v_x_e_table.modal.message({
            id: "msg_".concat(code),
            message: conf.i18n('vxe.grid.selectOneRecord'),
            status: 'warning'
          });
        }
      } else {
        if (selectRecords.length) {
          callback();
        }
      }

      return Promise.resolve();
    },
    getFormItems: function getFormItems(index) {
      var formConfig = this.formConfig,
          formOpts = this.formOpts;
      var items = formConfig && formOpts.items ? formOpts.items : [];
      return arguments.length ? items[index] : items;
    },
    getPendingRecords: function getPendingRecords() {
      return this.pendingRecords;
    },
    triggerToolbarBtnEvent: function triggerToolbarBtnEvent(button, evnt) {
      this.commitProxy(button, evnt);
      this.$emit('toolbar-button-click', {
        code: button.code,
        button: button,
        $grid: this,
        $event: evnt
      });
    },
    triggerPendingEvent: function triggerPendingEvent(code) {
      var pendingRecords = this.pendingRecords,
          isMsg = this.isMsg;
      var selectRecords = this.getCheckboxRecords();

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

        this.clearCheckboxRow();
      } else {
        if (isMsg) {
          v_x_e_table.modal.message({
            id: code,
            message: conf.i18n('vxe.grid.selectOneRecord'),
            status: 'warning'
          });
        }
      }
    },
    pageChangeEvent: function pageChangeEvent(params) {
      var proxyConfig = this.proxyConfig,
          tablePage = this.tablePage;
      var currentPage = params.currentPage,
          pageSize = params.pageSize;
      tablePage.currentPage = currentPage;
      tablePage.pageSize = pageSize;
      this.$emit('page-change', Object.assign({
        $grid: this
      }, params));

      if (proxyConfig) {
        this.commitProxy('query');
      }
    },
    sortChangeEvent: function sortChangeEvent(params) {
      var remoteSort = this.remoteSort;
      var $table = params.$table,
          column = params.column;
      var isRemote = ctor_amd_xe_utils_default.a.isBoolean(column.remoteSort) ? column.remoteSort : $table.sortOpts.remote || remoteSort;
      var property = params.order ? params.property : null; // 如果是服务端排序

      if (isRemote) {
        this.sortData = property ? {
          property: property,
          order: params.order,
          sortBy: params.sortBy
        } : {};

        if (this.proxyConfig) {
          this.tablePage.currentPage = 1;
          this.commitProxy('query');
        }
      }

      this.$emit('sort-change', Object.assign({
        $grid: this
      }, params));
    },
    filterChangeEvent: function filterChangeEvent(params) {
      var $table = params.$table,
          filters = params.filters; // 如果是服务端过滤

      if ($table.filterOpts.remote || this.remoteFilter) {
        this.filterData = filters;

        if (this.proxyConfig) {
          this.tablePage.currentPage = 1;
          this.commitProxy('query');
        }
      }

      this.$emit('filter-change', Object.assign({
        $grid: this
      }, params));
    },
    submitEvent: function submitEvent(params) {
      var proxyConfig = this.proxyConfig;

      if (proxyConfig) {
        this.commitProxy('reload');
      }

      this.$emit('form-submit', Object.assign({
        $grid: this
      }, params));
    },
    resetEvent: function resetEvent(params) {
      var proxyConfig = this.proxyConfig;

      if (proxyConfig) {
        this.commitProxy('reload');
      }

      this.$emit('form-reset', Object.assign({
        $grid: this
      }, params));
    },
    submitInvalidEvent: function submitInvalidEvent(params) {
      this.$emit('form-submit-invalid', Object.assign({
        $grid: this
      }, params));
    },
    togglCollapseEvent: function togglCollapseEvent(params) {
      var _this6 = this;

      this.$nextTick(function () {
        return _this6.recalculate(true);
      });
      this.$emit('form-toggle-collapse', Object.assign({
        $grid: this
      }, params));
    },
    triggerZoomEvent: function triggerZoomEvent(evnt) {
      this.zoom();
      this.$emit('zoom', {
        $grid: this,
        type: this.isZMax ? 'max' : 'revert',
        $event: evnt
      });
    },
    zoom: function zoom() {
      return this[this.isZMax ? 'revert' : 'maximize']();
    },
    isMaximized: function isMaximized() {
      return this.isZMax;
    },
    maximize: function maximize() {
      return this.handleZoom(true);
    },
    revert: function revert() {
      return this.handleZoom();
    },
    handleZoom: function handleZoom(isMax) {
      var _this7 = this;

      var isZMax = this.isZMax;

      if (isMax ? !isZMax : isZMax) {
        this.isZMax = !isZMax;

        if (this.tZindex < UtilTools.getLastZIndex()) {
          this.tZindex = UtilTools.nextZIndex();
        }
      }

      return this.$nextTick().then(function () {
        return _this7.recalculate(true);
      }).then(function () {
        return _this7.isZMax;
      });
    },
    getProxyInfo: function getProxyInfo() {
      return this.proxyConfig ? {
        data: this.tableData,
        filter: this.filterData,
        form: this.formData,
        sort: this.sortData,
        pager: this.tablePage,
        pendingRecords: this.pendingRecords
      } : null;
    }
  })
});
// CONCATENATED MODULE: ./packages/grid/index.js




grid.install = function (Vue) {
  v_x_e_table.Grid = grid;
  Vue.component(grid.name, grid);
};

var Grid = grid;
/* harmony default export */ var packages_grid = (grid);
// CONCATENATED MODULE: ./packages/menu/src/panel.js




/* harmony default export */ var src_panel = ({
  name: 'VxeTableContextMenu',
  props: {
    ctxMenuStore: Object,
    ctxMenuOpts: Object
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    var $el = this.$el;

    if ($el.parentNode) {
      $el.parentNode.removeChild($el);
    }
  },
  render: function render(h) {
    var $xetable = this.$parent;
    var ctxMenuOpts = this.ctxMenuOpts,
        ctxMenuStore = this.ctxMenuStore;
    return h('div', {
      class: ['vxe-table--context-menu-wrapper', ctxMenuOpts.className],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map(function (options, gIndex) {
      return h('ul', {
        class: 'vxe-context-menu--option-wrapper',
        key: gIndex
      }, options.map(function (item, index) {
        var hasChildMenus = item.children && item.children.length;
        return item.visible === false ? null : h('li', {
          class: [item.className, {
            'link--disabled': item.disabled,
            'link--active': item === ctxMenuStore.selected
          }],
          key: "".concat(gIndex, "_").concat(index)
        }, [h('a', {
          class: 'vxe-context-menu--link',
          on: {
            click: function click(evnt) {
              $xetable.ctxMenuLinkEvent(evnt, item);
            },
            mouseover: function mouseover(evnt) {
              $xetable.ctxMenuMouseoverEvent(evnt, item);
            },
            mouseout: function mouseout(evnt) {
              $xetable.ctxMenuMouseoutEvent(evnt, item);
            }
          }
        }, [h('i', {
          class: ['vxe-context-menu--link-prefix', item.prefixIcon]
        }), h('span', {
          class: 'vxe-context-menu--link-content'
        }, UtilTools.getFuncText(item.name)), h('i', {
          class: ['vxe-context-menu--link-suffix', hasChildMenus ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
        })]), hasChildMenus ? h('ul', {
          class: ['vxe-table--context-menu-clild-wrapper', {
            'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
          }]
        }, item.children.map(function (child, cIndex) {
          return child.visible === false ? null : h('li', {
            class: [child.className, {
              'link--disabled': child.disabled,
              'link--active': child === ctxMenuStore.selectChild
            }],
            key: "".concat(gIndex, "_").concat(index, "_").concat(cIndex)
          }, [h('a', {
            class: 'vxe-context-menu--link',
            on: {
              click: function click(evnt) {
                $xetable.ctxMenuLinkEvent(evnt, child);
              },
              mouseover: function mouseover(evnt) {
                $xetable.ctxMenuMouseoverEvent(evnt, item, child);
              },
              mouseout: function mouseout(evnt) {
                $xetable.ctxMenuMouseoutEvent(evnt, item, child);
              }
            }
          }, [h('i', {
            class: ['vxe-context-menu--link-prefix', child.prefixIcon]
          }), h('span', {
            class: 'vxe-context-menu--link-content'
          }, UtilTools.getFuncText(child.name))])]);
        })) : null]);
      }));
    }));
  }
});
// CONCATENATED MODULE: ./packages/menu/src/mixin.js




/* harmony default export */ var menu_src_mixin = ({
  methods: {
    /**
     * 关闭快捷菜单
     */
    _closeMenu: function _closeMenu() {
      Object.assign(this.ctxMenuStore, {
        visible: false,
        selected: null,
        selectChild: null,
        showChild: false
      });
      return this.$nextTick();
    },
    // 处理菜单的移动
    moveCtxMenu: function moveCtxMenu(evnt, keyCode, ctxMenuStore, property, operKey, operRest, menuList) {
      var selectItem;
      var selectIndex = ctor_amd_xe_utils_default.a.findIndexOf(menuList, function (item) {
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
        for (var len = selectIndex - 1; len >= 0; len--) {
          if (menuList[len].visible !== false) {
            selectItem = menuList[len];
            break;
          }
        }

        ctxMenuStore[property] = selectItem || menuList[menuList.length - 1];
      } else if (keyCode === 40) {
        for (var index = selectIndex + 1; index < menuList.length; index++) {
          if (menuList[index].visible !== false) {
            selectItem = menuList[index];
            break;
          }
        }

        ctxMenuStore[property] = selectItem || menuList[0];
      } else if (ctxMenuStore[property] && (keyCode === 13 || keyCode === 32)) {
        this.ctxMenuLinkEvent(evnt, ctxMenuStore[property]);
      }
    },

    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent: function handleGlobalContextmenuEvent(evnt) {
      var $refs = this.$refs,
          tId = this.tId,
          editStore = this.editStore,
          contextMenu = this.contextMenu,
          ctxMenuStore = this.ctxMenuStore,
          ctxMenuOpts = this.ctxMenuOpts,
          mouseConfig = this.mouseConfig,
          mouseOpts = this.mouseOpts;
      var selected = editStore.selected;
      var layoutList = ['header', 'body', 'footer'];

      if (contextMenu) {
        if (ctxMenuStore.visible && $refs.ctxWrapper && DomTools.getEventTargetNode(evnt, $refs.ctxWrapper.$el).flag) {
          evnt.preventDefault();
          return;
        }

        if (this._keyCtx) {
          var type = 'body';
          var params = {
            type: type,
            $grid: this.$xegrid,
            $table: this,
            keyboard: true,
            columns: this.visibleColumn.slice(0),
            $event: evnt
          }; // 如果开启单元格区域

          if (mouseConfig && mouseOpts.area) {
            var activeArea = this.getActiveCellArea();

            if (activeArea && activeArea.row && activeArea.column) {
              params.row = activeArea.row;
              params.column = activeArea.column;
              this.openContextMenu(evnt, type, params);
              return;
            }
          } else if (mouseConfig && mouseOpts.selected) {
            // 如果启用键盘导航且已选中单元格
            if (selected.row && selected.column) {
              params.row = selected.row;
              params.column = selected.column;
              this.openContextMenu(evnt, type, params);
              return;
            }
          }
        } // 分别匹配表尾、内容、表尾的快捷菜单


        for (var index = 0; index < layoutList.length; index++) {
          var layout = layoutList[index];
          var columnTargetNode = DomTools.getEventTargetNode(evnt, this.$el, "vxe-".concat(layout, "--column"), function (target) {
            // target=td|th，直接向上找 table 去匹配即可
            return target.parentNode.parentNode.parentNode.getAttribute('data-tid') === tId;
          });
          var _params = {
            type: layout,
            $grid: this.$xegrid,
            $table: this,
            columns: this.visibleColumn.slice(0),
            $event: evnt
          };

          if (columnTargetNode.flag) {
            var cell = columnTargetNode.targetElem;
            var column = this.getColumnNode(cell).item;
            var typePrefix = "".concat(layout, "-");
            Object.assign(_params, {
              column: column,
              columnIndex: this.getColumnIndex(column),
              cell: cell
            });

            if (layout === 'body') {
              var row = this.getRowNode(cell.parentNode).item;
              typePrefix = '';
              _params.row = row;
              _params.rowIndex = this.getRowIndex(row);
            }

            this.openContextMenu(evnt, layout, _params);
            this.emitEvent("".concat(typePrefix, "cell-context-menu"), _params, evnt);
            return;
          } else if (DomTools.getEventTargetNode(evnt, this.$el, "vxe-table--".concat(layout, "-wrapper"), function (target) {
            return target.getAttribute('data-tid') === tId;
          }).flag) {
            if (ctxMenuOpts.trigger === 'cell') {
              evnt.preventDefault();
            } else {
              this.openContextMenu(evnt, layout, _params);
            }

            return;
          }
        }
      }

      if ($refs.filterWrapper && !DomTools.getEventTargetNode(evnt, $refs.filterWrapper.$el).flag) {
        this.closeFilter();
      }

      this.closeMenu();
    },

    /**
     * 显示快捷菜单
     */
    openContextMenu: function openContextMenu(evnt, type, params) {
      var _this = this;

      var ctxMenuStore = this.ctxMenuStore,
          ctxMenuOpts = this.ctxMenuOpts;
      var config = ctxMenuOpts[type];
      var visibleMethod = ctxMenuOpts.visibleMethod;

      if (config) {
        var options = config.options,
            disabled = config.disabled;

        if (disabled) {
          evnt.preventDefault();
        } else if (options && options.length) {
          params.options = options;
          this.preventEvent(evnt, 'event.showMenu', params, null, function () {
            if (!visibleMethod || visibleMethod(params)) {
              evnt.preventDefault();

              _this.updateZindex();

              var _DomTools$getDomNode = DomTools.getDomNode(),
                  scrollTop = _DomTools$getDomNode.scrollTop,
                  scrollLeft = _DomTools$getDomNode.scrollLeft,
                  visibleHeight = _DomTools$getDomNode.visibleHeight,
                  visibleWidth = _DomTools$getDomNode.visibleWidth;

              var top = evnt.clientY + scrollTop;
              var left = evnt.clientX + scrollLeft;

              var handleVisible = function handleVisible() {
                Object.assign(ctxMenuStore, {
                  args: params,
                  visible: true,
                  list: options,
                  selected: null,
                  selectChild: null,
                  showChild: false,
                  style: {
                    zIndex: _this.tZindex,
                    top: "".concat(top, "px"),
                    left: "".concat(left, "px")
                  }
                });

                _this.$nextTick(function () {
                  var ctxElem = _this.$refs.ctxWrapper.$el;
                  var clientHeight = ctxElem.clientHeight;
                  var clientWidth = ctxElem.clientWidth;

                  var _DomTools$getAbsolute = DomTools.getAbsolutePos(ctxElem),
                      boundingTop = _DomTools$getAbsolute.boundingTop,
                      boundingLeft = _DomTools$getAbsolute.boundingLeft;

                  var offsetTop = boundingTop + clientHeight - visibleHeight;
                  var offsetLeft = boundingLeft + clientWidth - visibleWidth;

                  if (offsetTop > -10) {
                    ctxMenuStore.style.top = "".concat(Math.max(scrollTop + 2, top - clientHeight - 2), "px");
                  }

                  if (offsetLeft > -10) {
                    ctxMenuStore.style.left = "".concat(Math.max(scrollLeft + 2, left - clientWidth - 2), "px");
                  }
                });
              };

              var keyboard = params.keyboard,
                  row = params.row,
                  column = params.column;

              if (keyboard && row && column) {
                _this.scrollToRow(row, column).then(function () {
                  var cell = _this.getCell(row, column);

                  var _DomTools$getAbsolute2 = DomTools.getAbsolutePos(cell),
                      boundingTop = _DomTools$getAbsolute2.boundingTop,
                      boundingLeft = _DomTools$getAbsolute2.boundingLeft;

                  top = boundingTop + scrollTop + Math.floor(cell.offsetHeight / 2);
                  left = boundingLeft + scrollLeft + Math.floor(cell.offsetWidth / 2);
                  handleVisible();
                });
              } else {
                handleVisible();
              }
            } else {
              _this.closeMenu();
            }
          });
        }
      }

      this.closeFilter();
    },
    ctxMenuMouseoverEvent: function ctxMenuMouseoverEvent(evnt, item, child) {
      var menuElem = evnt.currentTarget;
      var ctxMenuStore = this.ctxMenuStore;
      evnt.preventDefault();
      evnt.stopPropagation();
      ctxMenuStore.selected = item;
      ctxMenuStore.selectChild = child;

      if (!child) {
        ctxMenuStore.showChild = UtilTools.hasChildrenList(item);

        if (ctxMenuStore.showChild) {
          this.$nextTick(function () {
            var childWrapperElem = menuElem.nextElementSibling;

            if (childWrapperElem) {
              var _DomTools$getAbsolute3 = DomTools.getAbsolutePos(menuElem),
                  boundingTop = _DomTools$getAbsolute3.boundingTop,
                  boundingLeft = _DomTools$getAbsolute3.boundingLeft,
                  visibleHeight = _DomTools$getAbsolute3.visibleHeight,
                  visibleWidth = _DomTools$getAbsolute3.visibleWidth;

              var posTop = boundingTop + menuElem.offsetHeight;
              var posLeft = boundingLeft + menuElem.offsetWidth;
              var left = '';
              var right = ''; // 是否超出右侧

              if (posLeft + childWrapperElem.offsetWidth > visibleWidth - 10) {
                left = 'auto';
                right = "".concat(menuElem.offsetWidth, "px");
              } // 是否超出底部


              var top = '';
              var bottom = '';

              if (posTop + childWrapperElem.offsetHeight > visibleHeight - 10) {
                top = 'auto';
                bottom = '0';
              }

              childWrapperElem.style.left = left;
              childWrapperElem.style.right = right;
              childWrapperElem.style.top = top;
              childWrapperElem.style.bottom = bottom;
            }
          });
        }
      }
    },
    ctxMenuMouseoutEvent: function ctxMenuMouseoutEvent(evnt, item) {
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
        var ctxMenuMethod = v_x_e_table.menus.get(menu.code);
        var params = Object.assign({
          menu: menu,
          $grid: this.$xegrid,
          $table: this,
          $event: evnt
        }, this.ctxMenuStore.args);

        if (ctxMenuMethod) {
          ctxMenuMethod.call(this, params, evnt);
        }

        this.emitEvent('context-menu-click', params, evnt);
        this.closeMenu();
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/menu/index.js






src_panel.install = function (Vue) {
  v_x_e_table.reg('menu');
  packages_table.mixins.push(menu_src_mixin);
  Vue.component(src_panel.name, src_panel);
};

var Menu = src_panel;
/* harmony default export */ var packages_menu = (src_panel);
// CONCATENATED MODULE: ./packages/toolbar/src/toolbar.js













/**
 * 渲染按钮
 */

function renderBtns(h, _vm) {
  var _e = _vm._e,
      $scopedSlots = _vm.$scopedSlots,
      $xegrid = _vm.$xegrid,
      $xetable = _vm.$xetable,
      _vm$buttons = _vm.buttons,
      buttons = _vm$buttons === void 0 ? [] : _vm$buttons;

  if ($scopedSlots.buttons) {
    return $scopedSlots.buttons.call(_vm, {
      $grid: $xegrid,
      $table: $xetable
    }, h);
  }

  return buttons.map(function (item) {
    var _dropdowns = item.dropdowns,
        buttonRender = item.buttonRender;
    var compConf = buttonRender ? v_x_e_table.renderer.get(buttonRender.name) : null;

    if (item.visible === false) {
      return _e();
    }

    if (compConf && compConf.renderButton) {
      return h('span', {
        class: 'vxe-button--item'
      }, compConf.renderButton.call(_vm, h, buttonRender, {
        $grid: $xegrid,
        $table: $xetable,
        button: item
      }));
    }

    return h('vxe-button', {
      on: {
        click: function click(evnt) {
          return _vm.btnEvent(evnt, item);
        }
      },
      props: {
        disabled: item.disabled,
        loading: item.loading,
        type: item.type,
        icon: item.icon,
        circle: item.circle,
        round: item.round,
        status: item.status,
        content: UtilTools.getFuncText(item.name),
        destroyOnClose: item.destroyOnClose,
        placement: item.placement,
        transfer: item.transfer
      },
      scopedSlots: _dropdowns && _dropdowns.length ? {
        dropdowns: function dropdowns() {
          return _dropdowns.map(function (child) {
            return child.visible === false ? _e() : h('vxe-button', {
              on: {
                click: function click(evnt) {
                  return _vm.btnEvent(evnt, child);
                }
              },
              props: {
                disabled: child.disabled,
                loading: child.loading,
                type: child.type,
                icon: child.icon,
                circle: child.circle,
                round: child.round,
                status: child.status,
                content: UtilTools.getFuncText(child.name)
              }
            });
          });
        }
      } : null
    });
  });
}
/**
 * 渲染右侧工具
 */


function renderRightTools(h, _vm) {
  var $scopedSlots = _vm.$scopedSlots,
      $xegrid = _vm.$xegrid,
      $xetable = _vm.$xetable;

  if ($scopedSlots.tools) {
    return $scopedSlots.tools.call(_vm, {
      $grid: $xegrid,
      $table: $xetable
    }, h);
  }

  return [];
}

function renderCustoms(h, _vm) {
  var $xetable = _vm.$xetable,
      customStore = _vm.customStore,
      customOpts = _vm.customOpts,
      columns = _vm.columns;
  var cols = [];
  var customBtnOns = {};
  var customWrapperOns = {};
  var checkMethod = $xetable ? $xetable.customOpts.checkMethod : null;

  if (customOpts.trigger === 'manual') {// 手动触发
  } else if (customOpts.trigger === 'hover') {
    // hover 触发
    customBtnOns.mouseenter = _vm.handleMouseenterSettingEvent;
    customBtnOns.mouseleave = _vm.handleMouseleaveSettingEvent;
    customWrapperOns.mouseenter = _vm.handleWrapperMouseenterEvent;
    customWrapperOns.mouseleave = _vm.handleWrapperMouseleaveEvent;
  } else {
    // 点击触发
    customBtnOns.click = _vm.handleClickSettingEvent;
  }

  ctor_amd_xe_utils_default.a.eachTree(columns, function (column) {
    var colTitle = UtilTools.formatText(column.getTitle(), 1);
    var colKey = column.getKey();
    var isColGroup = column.children && column.children.length;
    var isDisabled = checkMethod ? !checkMethod({
      column: column
    }) : false;

    if (isColGroup || colKey) {
      cols.push(h('li', {
        class: ['vxe-custom--option', "level--".concat(column.level), {
          'is--group': isColGroup,
          'is--checked': column.visible,
          'is--indeterminate': column.halfVisible,
          'is--disabled': isDisabled
        }],
        attrs: {
          title: colTitle
        },
        on: {
          click: function click() {
            if (!isDisabled) {
              _vm.changeCustomOption(column);
            }
          }
        }
      }, [h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
      }), h('span', {
        class: 'vxe-checkbox--label'
      }, colTitle)]));
    }
  });
  return h('div', {
    class: ['vxe-custom--wrapper', {
      'is--active': customStore.visible
    }],
    ref: 'customWrapper'
  }, [h('vxe-button', {
    props: {
      circle: true,
      icon: customOpts.icon || conf.icon.TOOLBAR_TOOLS_CUSTOM
    },
    attrs: {
      title: conf.i18n('vxe.toolbar.custom')
    },
    on: customBtnOns
  }), h('div', {
    class: 'vxe-custom--option-wrapper'
  }, [h('ul', {
    class: 'vxe-custom--header'
  }, [h('li', {
    class: ['vxe-custom--option', {
      'is--checked': customStore.isAll,
      'is--indeterminate': customStore.isIndeterminate
    }],
    attrs: {
      title: conf.i18n('vxe.table.allTitle')
    },
    on: {
      click: _vm.allCustomEvent
    }
  }, [h('span', {
    class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
  }), h('span', {
    class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
  }), h('span', {
    class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
  }), h('span', {
    class: 'vxe-checkbox--label'
  }, conf.i18n('vxe.toolbar.customAll'))])]), h('ul', {
    class: 'vxe-custom--body',
    on: customWrapperOns
  }, cols), customOpts.isFooter === false ? null : h('div', {
    class: 'vxe-custom--footer'
  }, [h('button', {
    class: 'btn--confirm',
    on: {
      click: _vm.confirmCustomEvent
    }
  }, conf.i18n('vxe.toolbar.customConfirm')), h('button', {
    class: 'btn--reset',
    on: {
      click: _vm.resetCustomEvent
    }
  }, conf.i18n('vxe.toolbar.customRestore'))])])]);
}

/* harmony default export */ var src_toolbar = ({
  name: 'VxeToolbar',
  mixins: [size],
  props: {
    loading: Boolean,
    refresh: [Boolean, Object],
    import: [Boolean, Object],
    export: [Boolean, Object],
    print: [Boolean, Object],
    zoom: [Boolean, Object],
    custom: [Boolean, Object],
    buttons: {
      type: Array,
      default: function _default() {
        return conf.toolbar.buttons;
      }
    },
    perfect: {
      type: Boolean,
      default: function _default() {
        return conf.toolbar.perfect;
      }
    },
    size: {
      type: String,
      default: function _default() {
        return conf.toolbar.size || conf.size;
      }
    }
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  data: function data() {
    return {
      $xetable: null,
      isRefresh: false,
      columns: [],
      customStore: {
        isAll: false,
        isIndeterminate: false,
        visible: false
      }
    };
  },
  computed: {
    refreshOpts: function refreshOpts() {
      return Object.assign({}, conf.toolbar.refresh, this.refresh);
    },
    importOpts: function importOpts() {
      return Object.assign({}, conf.toolbar.import, this.import);
    },
    exportOpts: function exportOpts() {
      return Object.assign({}, conf.toolbar.export, this.export);
    },
    printOpts: function printOpts() {
      return Object.assign({}, conf.toolbar.print, this.print);
    },
    zoomOpts: function zoomOpts() {
      return Object.assign({}, conf.toolbar.zoom, this.zoom);
    },
    customOpts: function customOpts() {
      return Object.assign({}, conf.toolbar.custom, this.custom);
    }
  },
  created: function created() {
    var _this = this;

    var refresh = this.refresh,
        refreshOpts = this.refreshOpts;
    this.$nextTick(function () {
      var $xetable = _this.fintTable();

      if (refresh && !_this.$xegrid && !refreshOpts.query) {
        UtilTools.warn('vxe.error.notFunc', ['query']);
      }

      if ($xetable) {
        $xetable.connect(_this);
      }
    });
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref;

    var _e = this._e,
        $xegrid = this.$xegrid,
        perfect = this.perfect,
        loading = this.loading,
        importOpts = this.importOpts,
        exportOpts = this.exportOpts,
        refresh = this.refresh,
        refreshOpts = this.refreshOpts,
        zoom = this.zoom,
        zoomOpts = this.zoomOpts,
        custom = this.custom,
        vSize = this.vSize;
    return h('div', {
      class: ['vxe-toolbar', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--perfect', perfect), _defineProperty(_ref, 'is--loading', loading), _ref)]
    }, [h('div', {
      class: 'vxe-button--wrapper'
    }, renderBtns(h, this)), h('div', {
      class: 'vxe-tools--wrapper'
    }, renderRightTools(h, this)), h('div', {
      class: 'vxe-tools--operate'
    }, [this.import ? h('vxe-button', {
      props: {
        circle: true,
        icon: importOpts.icon || conf.icon.TOOLBAR_TOOLS_IMPORT
      },
      attrs: {
        title: conf.i18n('vxe.toolbar.import')
      },
      on: {
        click: this.importEvent
      }
    }) : _e(), this.export ? h('vxe-button', {
      props: {
        circle: true,
        icon: exportOpts.icon || conf.icon.TOOLBAR_TOOLS_EXPORT
      },
      attrs: {
        title: conf.i18n('vxe.toolbar.export')
      },
      on: {
        click: this.exportEvent
      }
    }) : _e(), this.print ? h('vxe-button', {
      props: {
        circle: true,
        icon: this.printOpts.icon || conf.icon.TOOLBAR_TOOLS_PRINT
      },
      attrs: {
        title: conf.i18n('vxe.toolbar.print')
      },
      on: {
        click: this.printEvent
      }
    }) : _e(), refresh ? h('vxe-button', {
      props: {
        circle: true,
        icon: this.isRefresh ? refreshOpts.iconLoading || conf.icon.TOOLBAR_TOOLS_REFRESH_LOADING : refreshOpts.icon || conf.icon.TOOLBAR_TOOLS_REFRESH
      },
      attrs: {
        title: conf.i18n('vxe.toolbar.refresh')
      },
      on: {
        click: this.refreshEvent
      }
    }) : _e(), zoom && $xegrid ? h('vxe-button', {
      props: {
        circle: true,
        icon: $xegrid.isMaximized() ? zoomOpts.iconOut || conf.icon.TOOLBAR_TOOLS_ZOOM_OUT : zoomOpts.iconIn || conf.icon.TOOLBAR_TOOLS_ZOOM_IN
      },
      attrs: {
        title: conf.i18n("vxe.toolbar.zoom".concat($xegrid.isMaximized() ? 'Out' : 'In'))
      },
      on: {
        click: $xegrid.triggerZoomEvent
      }
    }) : _e(), custom ? renderCustoms(h, this) : _e()])]);
  },
  methods: {
    syncUpdate: function syncUpdate(params) {
      var collectColumn = params.collectColumn,
          $table = params.$table;
      this.$xetable = $table;
      this.columns = collectColumn;
    },
    fintTable: function fintTable() {
      var $children = this.$parent.$children;
      var selfIndex = $children.indexOf(this);
      return ctor_amd_xe_utils_default.a.find($children, function (comp, index) {
        return comp && comp.refreshColumn && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table';
      });
    },
    checkTable: function checkTable() {
      if (this.$xetable) {
        return true;
      }

      UtilTools.error('vxe.error.barUnableLink');
    },
    showCustom: function showCustom() {
      this.customStore.visible = true;
      this.checkCustomStatus();
    },
    closeCustom: function closeCustom() {
      var custom = this.custom,
          customStore = this.customStore;

      if (customStore.visible) {
        customStore.visible = false;

        if (custom && !customStore.immediate) {
          this.handleCustoms();
        }
      }
    },
    confirmCustomEvent: function confirmCustomEvent(evnt) {
      this.closeCustom();
      this.emitCustomEvent('confirm', evnt);
    },
    customOpenEvent: function customOpenEvent(evnt) {
      var customStore = this.customStore;

      if (this.checkTable()) {
        if (!customStore.visible) {
          this.showCustom();
          this.emitCustomEvent('open', evnt);
        }
      }
    },
    customColseEvent: function customColseEvent(evnt) {
      var customStore = this.customStore;

      if (customStore.visible) {
        this.closeCustom();
        this.emitCustomEvent('close', evnt);
      }
    },
    resetCustomEvent: function resetCustomEvent(evnt) {
      var $xetable = this.$xetable,
          columns = this.columns;
      var checkMethod = $xetable.customOpts.checkMethod;
      ctor_amd_xe_utils_default.a.eachTree(columns, function (column) {
        if (!checkMethod || checkMethod({
          column: column
        })) {
          column.visible = column.defaultVisible;
          column.halfVisible = false;
        }

        column.resizeWidth = 0;
      });
      $xetable.saveCustomResizable(true);
      this.closeCustom();
      this.emitCustomEvent('reset', evnt);
    },
    emitCustomEvent: function emitCustomEvent(type, evnt) {
      var $xetable = this.$xetable,
          $xegrid = this.$xegrid;
      var comp = $xegrid || $xetable;
      comp.$emit('custom', {
        type: type,
        $table: $xetable,
        $grid: $xegrid,
        $event: evnt
      });
    },
    changeCustomOption: function changeCustomOption(column) {
      var isChecked = !column.visible;
      ctor_amd_xe_utils_default.a.eachTree([column], function (item) {
        item.visible = isChecked;
        item.halfVisible = false;
      });
      this.handleOptionCheck(column);

      if (this.custom && this.customOpts.immediate) {
        this.handleCustoms();
      }

      this.checkCustomStatus();
    },
    handleOptionCheck: function handleOptionCheck(column) {
      var matchObj = ctor_amd_xe_utils_default.a.findTree(this.columns, function (item) {
        return item === column;
      });

      if (matchObj && matchObj.parent) {
        var parent = matchObj.parent;

        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every(function (column) {
            return column.visible;
          });
          parent.halfVisible = !parent.visible && parent.children.some(function (column) {
            return column.visible || column.halfVisible;
          });
          this.handleOptionCheck(parent);
        }
      }
    },
    handleCustoms: function handleCustoms() {
      var $xetable = this.$xetable;
      $xetable.saveCustomVisible();
      $xetable.analyColumnWidth();
      $xetable.refreshColumn();
    },
    checkCustomStatus: function checkCustomStatus() {
      var $xetable = this.$xetable,
          columns = this.columns;
      var checkMethod = $xetable.customOpts.checkMethod;
      this.customStore.isAll = columns.every(function (column) {
        return (checkMethod ? !checkMethod({
          column: column
        }) : false) || column.visible;
      });
      this.customStore.isIndeterminate = !this.customStore.isAll && columns.some(function (column) {
        return (!checkMethod || checkMethod({
          column: column
        })) && (column.visible || column.halfVisible);
      });
    },
    allCustomEvent: function allCustomEvent() {
      var $xetable = this.$xetable,
          columns = this.columns,
          customStore = this.customStore;
      var checkMethod = $xetable.customOpts.checkMethod;
      var isAll = !customStore.isAll;
      ctor_amd_xe_utils_default.a.eachTree(columns, function (column) {
        if (!checkMethod || checkMethod({
          column: column
        })) {
          column.visible = isAll;
          column.halfVisible = false;
        }
      });
      customStore.isAll = isAll;
      this.checkCustomStatus();
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      if (!DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.customColseEvent(evnt);
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      this.customColseEvent(evnt);
    },
    handleClickSettingEvent: function handleClickSettingEvent(evnt) {
      if (this.customStore.visible) {
        this.customColseEvent(evnt);
      } else {
        this.customOpenEvent(evnt);
      }
    },
    handleMouseenterSettingEvent: function handleMouseenterSettingEvent(evnt) {
      this.customStore.activeBtn = true;
      this.customOpenEvent(evnt);
    },
    handleMouseleaveSettingEvent: function handleMouseleaveSettingEvent(evnt) {
      var _this2 = this;

      var customStore = this.customStore;
      customStore.activeBtn = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this2.customColseEvent(evnt);
        }
      }, 300);
    },
    handleWrapperMouseenterEvent: function handleWrapperMouseenterEvent(evnt) {
      this.customStore.activeWrapper = true;
      this.customOpenEvent(evnt);
    },
    handleWrapperMouseleaveEvent: function handleWrapperMouseleaveEvent(evnt) {
      var _this3 = this;

      var customStore = this.customStore;
      customStore.activeWrapper = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this3.customColseEvent(evnt);
        }
      }, 300);
    },
    refreshEvent: function refreshEvent() {
      var _this4 = this;

      var $xegrid = this.$xegrid,
          refreshOpts = this.refreshOpts,
          isRefresh = this.isRefresh;

      if (!isRefresh) {
        if (refreshOpts.query) {
          this.isRefresh = true;

          try {
            Promise.resolve(refreshOpts.query()).catch(function (e) {
              return e;
            }).then(function () {
              _this4.isRefresh = false;
            });
          } catch (e) {
            this.isRefresh = false;
          }
        } else if ($xegrid) {
          this.isRefresh = true;
          $xegrid.commitProxy('reload').catch(function (e) {
            return e;
          }).then(function () {
            _this4.isRefresh = false;
          });
        }
      }
    },
    btnEvent: function btnEvent(evnt, item) {
      var $xegrid = this.$xegrid,
          $xetable = this.$xetable;
      var code = item.code;

      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarBtnEvent(item, evnt);
        } else {
          var commandMethod = v_x_e_table.commands.get(code);
          var params = {
            code: code,
            button: item,
            $xegrid: $xegrid,
            $table: $xetable,
            $event: evnt
          };

          if (commandMethod) {
            commandMethod.call(this, params, evnt);
          }

          this.$emit('button-click', params);
        }
      }
    },
    importEvent: function importEvent() {
      if (this.checkTable()) {
        this.$xetable.openImport(this.importOpts);
      }
    },
    exportEvent: function exportEvent() {
      if (this.checkTable()) {
        this.$xetable.openExport(this.exportOpts);
      }
    },
    printEvent: function printEvent() {
      if (this.checkTable()) {
        this.$xetable.print(this.printOpts);
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
// CONCATENATED MODULE: ./packages/pager/src/pager.js










/* harmony default export */ var pager = ({
  name: 'VxePager',
  mixins: [size],
  props: {
    size: {
      type: String,
      default: function _default() {
        return conf.pager.size || conf.size;
      }
    },
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
    // 列对其方式
    align: {
      type: String,
      default: function _default() {
        return conf.pager.align;
      }
    },
    // 带边框
    border: {
      type: Boolean,
      default: function _default() {
        return conf.pager.border;
      }
    },
    // 带背景颜色
    background: {
      type: Boolean,
      default: function _default() {
        return conf.pager.background;
      }
    },
    // 配套的样式
    perfect: {
      type: Boolean,
      default: function _default() {
        return conf.pager.perfect;
      }
    },
    // 当只有一页时隐藏
    autoHidden: {
      type: Boolean,
      default: function _default() {
        return conf.pager.autoHidden;
      }
    },
    // 自定义图标
    iconPrevPage: String,
    iconJumpPrev: String,
    iconJumpNext: String,
    iconNextPage: String,
    iconJumpMore: String
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  computed: {
    isSizes: function isSizes() {
      return this.layouts.some(function (name) {
        return name === 'Sizes';
      });
    },
    pageCount: function pageCount() {
      return this.getPageCount(this.total, this.pageSize);
    },
    numList: function numList() {
      var len = this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount;
      var rest = [];

      for (var index = 0; index < len; index++) {
        rest.push(index);
      }

      return rest;
    },
    offsetNumber: function offsetNumber() {
      return Math.floor((this.pagerCount - 2) / 2);
    },
    sizeList: function sizeList() {
      return this.pageSizes.map(function (item) {
        if (ctor_amd_xe_utils_default.a.isNumber(item)) {
          return {
            value: item,
            label: "".concat(conf.i18n('vxe.pager.pagesize', [item]))
          };
        }

        return _objectSpread2({
          value: '',
          label: ''
        }, item);
      });
    }
  },
  render: function render(h) {
    var _this = this,
        _ref;

    var $scopedSlots = this.$scopedSlots,
        $xegrid = this.$xegrid,
        vSize = this.vSize,
        align = this.align;
    var childNodes = [];

    if ($scopedSlots.left) {
      childNodes.push(h('span', {
        class: 'vxe-pager--left-wrapper'
      }, $scopedSlots.left.call(this, {
        $grid: $xegrid
      })));
    }

    this.layouts.forEach(function (name) {
      childNodes.push(_this["render".concat(name)](h));
    });

    if ($scopedSlots.right) {
      childNodes.push(h('span', {
        class: 'vxe-pager--right-wrapper'
      }, $scopedSlots.right.call(this, {
        $grid: $xegrid
      })));
    }

    return h('div', {
      class: ['vxe-pager', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "align--".concat(align), align), _defineProperty(_ref, 'is--border', this.border), _defineProperty(_ref, 'is--background', this.background), _defineProperty(_ref, 'is--perfect', this.perfect), _defineProperty(_ref, 'is--hidden', this.autoHidden && this.pageCount === 1), _defineProperty(_ref, 'is--loading', this.loading), _ref)]
    }, [h('div', {
      class: 'vxe-pager--wrapper'
    }, childNodes)]);
  },
  methods: {
    // 上一页
    renderPrevPage: function renderPrevPage(h) {
      return h('span', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: conf.i18n('vxe.pager.prevPage')
        },
        on: {
          click: this.prevPage
        }
      }, [h('i', {
        class: ['vxe-pager--btn-icon', this.iconPrevPage || conf.icon.PAGER_PREV_PAGE]
      })]);
    },
    // 向上翻页
    renderPrevJump: function renderPrevJump(h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: conf.i18n('vxe.pager.prevJump')
        },
        on: {
          click: this.prevJump
        }
      }, [tagName ? h('i', {
        class: ['vxe-pager--jump-more-icon', this.iconJumpMore || conf.icon.PAGER_JUMP_MORE]
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', this.iconJumpPrev || conf.icon.PAGER_JUMP_PREV]
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
    // 向下翻页
    renderNextJump: function renderNextJump(h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: conf.i18n('vxe.pager.nextJump')
        },
        on: {
          click: this.nextJump
        }
      }, [tagName ? h('i', {
        class: ['vxe-pager--jump-more-icon', this.iconJumpMore || conf.icon.PAGER_JUMP_MORE]
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', this.iconJumpNext || conf.icon.PAGER_JUMP_NEXT]
      })]);
    },
    // 下一页
    renderNextPage: function renderNextPage(h) {
      return h('span', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: conf.i18n('vxe.pager.nextPage')
        },
        on: {
          click: this.nextPage
        }
      }, [h('i', {
        class: ['vxe-pager--btn-icon', this.iconNextPage || conf.icon.PAGER_NEXT_PAGE]
      })]);
    },
    // sizes
    renderSizes: function renderSizes(h) {
      var _this2 = this;

      return h('vxe-select', {
        class: 'vxe-pager--sizes',
        props: {
          value: this.pageSize,
          placement: 'top',
          options: this.sizeList
        },
        on: {
          change: function change(_ref2) {
            var value = _ref2.value;

            _this2.pageSizeEvent(value);
          }
        }
      });
    },
    // FullJump
    renderFullJump: function renderFullJump(h) {
      return this.renderJump(h, true);
    },
    // Jump
    renderJump: function renderJump(h, isFull) {
      return h('span', {
        class: 'vxe-pager--jump'
      }, [isFull ? h('span', {
        class: 'vxe-pager--goto-text'
      }, conf.i18n('vxe.pager.goto')) : null, h('input', {
        class: 'vxe-pager--goto',
        domProps: {
          value: this.currentPage
        },
        attrs: {
          type: 'text',
          autocomplete: 'off'
        },
        on: {
          keydown: this.jumpKeydownEvent,
          blur: this.triggerJumpEvent
        }
      }), isFull ? h('span', {
        class: 'vxe-pager--classifier-text'
      }, conf.i18n('vxe.pager.pageClassifier')) : null]);
    },
    // PageCount
    renderPageCount: function renderPageCount(h) {
      return h('span', {
        class: 'vxe-pager--count'
      }, [h('span', {
        class: 'vxe-pager--separator'
      }), h('span', this.pageCount)]);
    },
    // total
    renderTotal: function renderTotal(h) {
      return h('span', {
        class: 'vxe-pager--total'
      }, conf.i18n('vxe.pager.total', [this.total]));
    },
    // number
    renderPageBtn: function renderPageBtn(h, showJump) {
      var _this3 = this;

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
              return _this3.jumpPage(1);
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
                return _this3.jumpPage(number);
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
              return _this3.jumpPage(pageCount);
            }
          }
        }, pageCount));
      }

      return nums;
    },
    getPageCount: function getPageCount(total, size) {
      return Math.max(Math.ceil(total / size), 1);
    },
    prevPage: function prevPage() {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;

      if (currentPage > 1) {
        this.jumpPage(Math.min(pageCount, Math.max(currentPage - 1, 1)));
      }
    },
    nextPage: function nextPage() {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;

      if (currentPage < pageCount) {
        this.jumpPage(Math.min(pageCount, currentPage + 1));
      }
    },
    prevJump: function prevJump() {
      this.jumpPage(Math.max(this.currentPage - this.numList.length, 1));
    },
    nextJump: function nextJump() {
      this.jumpPage(Math.min(this.currentPage + this.numList.length, this.pageCount));
    },
    jumpPage: function jumpPage(currentPage) {
      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage);
        this.$emit('page-change', {
          type: 'current',
          pageSize: this.pageSize,
          currentPage: currentPage
        });
      }
    },
    pageSizeEvent: function pageSizeEvent(pageSize) {
      this.changePageSize(pageSize);
    },
    changePageSize: function changePageSize(pageSize) {
      if (pageSize !== this.pageSize) {
        this.$emit('update:pageSize', pageSize);
        this.$emit('page-change', {
          type: 'size',
          pageSize: pageSize,
          currentPage: Math.min(this.currentPage, this.getPageCount(this.total, pageSize))
        });
      }
    },
    jumpKeydownEvent: function jumpKeydownEvent(evnt) {
      if (evnt.keyCode === 13) {
        this.triggerJumpEvent(evnt);
      } else if (evnt.keyCode === 38) {
        evnt.preventDefault();
        this.nextPage();
      } else if (evnt.keyCode === 40) {
        evnt.preventDefault();
        this.prevPage();
      }
    },
    triggerJumpEvent: function triggerJumpEvent(evnt) {
      var value = ctor_amd_xe_utils_default.a.toNumber(evnt.target.value);
      var current = value <= 0 ? 1 : value >= this.pageCount ? this.pageCount : value;
      evnt.target.value = current;
      this.jumpPage(current);
    }
  }
});
// CONCATENATED MODULE: ./packages/pager/index.js



pager.install = function (Vue) {
  Vue.component(pager.name, pager);
};

var Pager = pager;
/* harmony default export */ var packages_pager = (pager);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// CONCATENATED MODULE: ./packages/checkbox/src/checkbox.js








/* harmony default export */ var src_checkbox = ({
  name: 'VxeCheckbox',
  mixins: [size],
  props: {
    value: Boolean,
    label: [String, Number],
    indeterminate: Boolean,
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return conf.checkbox.size || conf.size;
      }
    }
  },
  inject: {
    $xecheckboxgroup: {
      default: null
    }
  },
  computed: {
    isGroup: function isGroup() {
      return this.$xecheckboxgroup;
    },
    isDisabled: function isDisabled() {
      return this.disabled || this.isGroup && this.$xecheckboxgroup.disabled;
    }
  },
  render: function render(h) {
    var _ref;

    var $slots = this.$slots,
        $xecheckboxgroup = this.$xecheckboxgroup,
        isGroup = this.isGroup,
        isDisabled = this.isDisabled,
        title = this.title,
        vSize = this.vSize,
        indeterminate = this.indeterminate,
        value = this.value,
        label = this.label,
        content = this.content;
    var attrs = {};

    if (title) {
      attrs.title = title;
    }

    return h('label', {
      class: ['vxe-checkbox', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--indeterminate', indeterminate), _defineProperty(_ref, 'is--disabled', isDisabled), _ref)],
      attrs: attrs
    }, [h('input', {
      class: 'vxe-checkbox--input',
      attrs: {
        type: 'checkbox',
        disabled: isDisabled
      },
      domProps: {
        checked: isGroup ? ctor_amd_xe_utils_default.a.includes($xecheckboxgroup.value, label) : value
      },
      on: {
        change: this.changeEvent
      }
    }), h('span', {
      class: 'vxe-checkbox--icon'
    }), h('span', {
      class: 'vxe-checkbox--label'
    }, $slots.default || [UtilTools.getFuncText(content)])]);
  },
  methods: {
    changeEvent: function changeEvent(evnt) {
      var $xecheckboxgroup = this.$xecheckboxgroup,
          isGroup = this.isGroup,
          isDisabled = this.isDisabled,
          label = this.label;

      if (!isDisabled) {
        var checked = evnt.target.checked;
        var params = {
          checked: checked,
          label: label,
          $event: evnt
        };

        if (isGroup) {
          $xecheckboxgroup.handleChecked(params);
        } else {
          this.$emit('input', checked);
          this.$emit('change', params);
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/checkbox/src/group.js



/* harmony default export */ var checkbox_src_group = ({
  name: 'VxeCheckboxGroup',
  props: {
    value: Array,
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return conf.checkbox.size || conf.size;
      }
    }
  },
  provide: function provide() {
    return {
      $xecheckboxgroup: this
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    return h('div', {
      class: 'vxe-checkbox-group'
    }, this.$slots.default);
  },
  methods: {
    handleChecked: function handleChecked(params) {
      var checked = params.checked,
          label = params.label;
      var checklist = this.value || [];
      var checkIndex = checklist.indexOf(label);

      if (checked) {
        if (checkIndex === -1) {
          checklist.push(label);
        }
      } else {
        checklist.splice(checkIndex, 1);
      }

      this.$emit('input', checklist);
      this.$emit('change', Object.assign({
        checklist: checklist
      }, params));
    }
  }
});
// CONCATENATED MODULE: ./packages/checkbox/index.js




src_checkbox.install = function (Vue) {
  Vue.component(src_checkbox.name, src_checkbox);
  Vue.component(checkbox_src_group.name, checkbox_src_group);
};

var Checkbox = src_checkbox;
/* harmony default export */ var packages_checkbox = (src_checkbox);
// CONCATENATED MODULE: ./packages/radio/src/radio.js






/* harmony default export */ var src_radio = ({
  name: 'VxeRadio',
  mixins: [size],
  props: {
    value: [String, Number],
    label: [String, Number],
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    name: String,
    size: {
      type: String,
      default: function _default() {
        return conf.radio.size || conf.size;
      }
    }
  },
  inject: {
    $xeradiogroup: {
      default: null
    }
  },
  computed: {
    isGroup: function isGroup() {
      return this.$xeradiogroup;
    },
    isDisabled: function isDisabled() {
      return this.disabled || this.isGroup && this.$xeradiogroup.disabled;
    }
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var $slots = this.$slots,
        $xeradiogroup = this.$xeradiogroup,
        isGroup = this.isGroup,
        isDisabled = this.isDisabled,
        title = this.title,
        vSize = this.vSize,
        value = this.value,
        label = this.label,
        name = this.name,
        content = this.content;
    var attrs = {};

    if (title) {
      attrs.title = title;
    }

    return h('label', {
      class: ['vxe-radio', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', isDisabled), _ref)],
      attrs: attrs
    }, [h('input', {
      class: 'vxe-radio--input',
      attrs: {
        type: 'radio',
        name: isGroup ? $xeradiogroup.name : name,
        disabled: isDisabled
      },
      domProps: {
        checked: isGroup ? $xeradiogroup.value === label : value === label
      },
      on: {
        change: function change(evnt) {
          if (!isDisabled) {
            var params = {
              label: label,
              $event: evnt
            };

            if (isGroup) {
              $xeradiogroup.handleChecked(params);
            } else {
              _this.$emit('input', label);

              _this.$emit('change', params);
            }
          }
        }
      }
    }), h('span', {
      class: 'vxe-radio--icon'
    }), h('span', {
      class: 'vxe-radio--label'
    }, $slots.default || [UtilTools.getFuncText(content)])]);
  },
  methods: {
    changeEvent: function changeEvent(evnt) {
      var $xeradiogroup = this.$xeradiogroup,
          isGroup = this.isGroup,
          isDisabled = this.isDisabled,
          label = this.label;

      if (!isDisabled) {
        var params = {
          label: label,
          $event: evnt
        };

        if (isGroup) {
          $xeradiogroup.handleChecked(params);
        } else {
          this.$emit('input', label);
          this.$emit('change', params);
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/radio/src/button.js





/* harmony default export */ var src_button = ({
  name: 'VxeRadioButton',
  props: {
    label: [String, Number],
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return conf.radio.size || conf.size;
      }
    }
  },
  inject: {
    $xeradiogroup: {
      default: null
    }
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isGroup: function isGroup() {
      return this.$xeradiogroup;
    },
    isDisabled: function isDisabled() {
      return this.disabled || this.isGroup && this.$xeradiogroup.disabled;
    }
  },
  render: function render(h) {
    var _ref;

    var $slots = this.$slots,
        $xeradiogroup = this.$xeradiogroup,
        isGroup = this.isGroup,
        isDisabled = this.isDisabled,
        title = this.title,
        vSize = this.vSize,
        label = this.label,
        content = this.content;
    var attrs = {};

    if (title) {
      attrs.title = title;
    }

    return h('label', {
      class: ['vxe-radio', 'vxe-radio-button', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', isDisabled), _ref)],
      attrs: attrs
    }, [h('input', {
      class: 'vxe-radio--input',
      attrs: {
        type: 'radio',
        name: isGroup ? $xeradiogroup.name : null,
        disabled: isDisabled
      },
      domProps: {
        checked: isGroup && $xeradiogroup.value === label
      },
      on: {
        change: this.changeEvent
      }
    }), h('span', {
      class: 'vxe-radio--label'
    }, $slots.default || [UtilTools.getFuncText(content)])]);
  },
  methods: {
    changeEvent: function changeEvent(evnt) {
      var $xeradiogroup = this.$xeradiogroup,
          isGroup = this.isGroup,
          isDisabled = this.isDisabled,
          label = this.label;

      if (!isDisabled) {
        if (isGroup) {
          $xeradiogroup.handleChecked({
            label: label,
            $event: evnt
          });
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/radio/src/group.js



/* harmony default export */ var radio_src_group = ({
  name: 'VxeRadioGroup',
  props: {
    value: [String, Number],
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return conf.radio.size || conf.size;
      }
    }
  },
  provide: function provide() {
    return {
      $xeradiogroup: this
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  data: function data() {
    return {
      name: ctor_amd_xe_utils_default.a.uniqueId('xegroup_')
    };
  },
  render: function render(h) {
    return h('div', {
      class: 'vxe-radio-group'
    }, this.$slots.default);
  },
  methods: {
    handleChecked: function handleChecked(params) {
      this.$emit('input', params.label);
      this.$emit('change', params);
    }
  }
});
// CONCATENATED MODULE: ./packages/radio/index.js





src_radio.install = function (Vue) {
  Vue.component(src_radio.name, src_radio);
  Vue.component(src_button.name, src_button);
  Vue.component(radio_src_group.name, radio_src_group);
};

var Radio = src_radio;
/* harmony default export */ var packages_radio = (src_radio);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.pad-start.js
var es_string_pad_start = __webpack_require__("4d90");

// CONCATENATED MODULE: ./packages/input/src/input.js




















var input_browse = DomTools.browse;
var input_wheelName = input_browse.firefox ? 'DOMMouseScroll' : 'mousewheel';
var yearSize = 20;
var monthSize = 20;

function toStringTime(str) {
  if (str) {
    var rest = new Date();
    var h, m, s;

    if (ctor_amd_xe_utils_default.a.isDate(str)) {
      h = str.getHours();
      m = str.getMinutes();
      s = str.getSeconds();
    } else {
      str = ctor_amd_xe_utils_default.a.toString(str);
      var parses = str.match(/^(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?/);

      if (parses) {
        h = parses[1];
        m = parses[3];
        s = parses[5];
      }
    }

    rest.setHours(h || 0);
    rest.setMinutes(m || 0);
    rest.setSeconds(s || 0);
    return rest;
  }

  return new Date('');
}

function renderDefaultInput(h, _vm) {
  var inpAttrs = _vm.inpAttrs,
      inpEvents = _vm.inpEvents,
      value = _vm.value;
  return h('input', {
    ref: 'input',
    class: 'vxe-input--inner',
    domProps: {
      value: value
    },
    attrs: inpAttrs,
    on: inpEvents
  });
}

function renderDateInput(h, _vm) {
  var inpAttrs = _vm.inpAttrs,
      inpEvents = _vm.inpEvents,
      inputValue = _vm.inputValue;
  return h('input', {
    ref: 'input',
    class: 'vxe-input--inner',
    domProps: {
      value: inputValue
    },
    attrs: inpAttrs,
    on: inpEvents
  });
}

function renderDateLabel(h, _vm, item, label) {
  var festivalMethod = _vm.festivalMethod;

  if (festivalMethod) {
    var festivalRest = festivalMethod(_objectSpread2({
      type: _vm.datePanelType
    }, item));
    var festivalItem = festivalRest ? ctor_amd_xe_utils_default.a.isString(festivalRest) ? {
      label: festivalRest
    } : festivalRest : {};
    var extraItem = festivalItem.extra ? ctor_amd_xe_utils_default.a.isString(festivalItem.extra) ? {
      label: festivalItem.extra
    } : festivalItem.extra : null;
    var labels = [h('span', {
      class: ['vxe-input--date-label', {
        'is-notice': festivalItem.notice
      }]
    }, extraItem && extraItem.label ? [h('span', label), h('span', {
      class: ['vxe-input--date-label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
      style: extraItem.style
    }, ctor_amd_xe_utils_default.a.toString(extraItem.label))] : label)];
    var festivalLabel = festivalItem.label;

    if (festivalLabel) {
      // 默认最多支持3个节日重叠
      var festivalLabels = ctor_amd_xe_utils_default.a.toString(festivalLabel).split(',');
      labels.push(h('span', {
        class: ['vxe-input--date-festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
        style: festivalItem.style
      }, [festivalLabels.length > 1 ? h('span', {
        class: ['vxe-input--date-festival--overlap', "overlap--".concat(festivalLabels.length)]
      }, festivalLabels.map(function (label) {
        return h('span', label.substring(0, 3));
      })) : h('span', {
        class: 'vxe-input--date-festival--label'
      }, festivalLabels[0].substring(0, 3))]));
    }

    return labels;
  }

  return label;
}

function isDateDisabled(_vm, item) {
  var disabledMethod = _vm.disabledMethod || _vm.dateOpts.disabledMethod;
  return disabledMethod && disabledMethod({
    type: _vm.type,
    date: item.date
  });
}

function renderDateDayTable(h, _vm) {
  var datePanelType = _vm.datePanelType,
      dateValue = _vm.dateValue,
      datePanelValue = _vm.datePanelValue,
      dateHeaders = _vm.dateHeaders,
      dayDatas = _vm.dayDatas;
  var matchFormat = 'yyyy-MM-dd';
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('thead', [h('tr', dateHeaders.map(function (item) {
    return h('th', item.label);
  }))]), h('tbody', dayDatas.map(function (rows) {
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--prev': item.isPrev,
          'is--current': item.isCurrent,
          'is--now': item.isNow,
          'is--next': item.isNext,
          'is--disabled': isDateDisabled(_vm, item),
          'is--selected': ctor_amd_xe_utils_default.a.isDateSame(dateValue, item.date, matchFormat),
          'is--hover': ctor_amd_xe_utils_default.a.isDateSame(datePanelValue, item.date, matchFormat)
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, renderDateLabel(h, _vm, item, item.label));
    }));
  }))])];
}

function renderDateWeekTable(h, _vm) {
  var datePanelType = _vm.datePanelType,
      dateValue = _vm.dateValue,
      datePanelValue = _vm.datePanelValue,
      weekHeaders = _vm.weekHeaders,
      weekDates = _vm.weekDates;
  var matchFormat = 'yyyy-MM-dd';
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('thead', [h('tr', weekHeaders.map(function (item) {
    return h('th', item.label);
  }))]), h('tbody', weekDates.map(function (rows) {
    var isSelected = rows.some(function (item) {
      return ctor_amd_xe_utils_default.a.isDateSame(dateValue, item.date, matchFormat);
    });
    var isHover = rows.some(function (item) {
      return ctor_amd_xe_utils_default.a.isDateSame(datePanelValue, item.date, matchFormat);
    });
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--prev': item.isPrev,
          'is--current': item.isCurrent,
          'is--now': item.isNow,
          'is--next': item.isNext,
          'is--disabled': isDateDisabled(_vm, item),
          'is--selected': isSelected,
          'is--hover': isHover
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, renderDateLabel(h, _vm, item, item.label));
    }));
  }))])];
}

function renderDateMonthTable(h, _vm) {
  var dateValue = _vm.dateValue,
      datePanelType = _vm.datePanelType,
      monthDatas = _vm.monthDatas,
      datePanelValue = _vm.datePanelValue;
  var matchFormat = 'yyyy-MM';
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('tbody', monthDatas.map(function (rows) {
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--prev': item.isPrev,
          'is--current': item.isCurrent,
          'is--now': item.isNow,
          'is--next': item.isNext,
          'is--disabled': isDateDisabled(_vm, item),
          'is--selected': ctor_amd_xe_utils_default.a.isDateSame(dateValue, item.date, matchFormat),
          'is--hover': ctor_amd_xe_utils_default.a.isDateSame(datePanelValue, item.date, matchFormat)
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, renderDateLabel(h, _vm, item, conf.i18n("vxe.input.date.months.m".concat(item.month))));
    }));
  }))])];
}

function renderDateYearTable(h, _vm) {
  var dateValue = _vm.dateValue,
      datePanelType = _vm.datePanelType,
      yearDatas = _vm.yearDatas,
      datePanelValue = _vm.datePanelValue;
  var matchFormat = 'yyyy';
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('tbody', yearDatas.map(function (rows) {
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--disabled': isDateDisabled(_vm, item),
          'is--current': item.isCurrent,
          'is--now': item.isNow,
          'is--selected': ctor_amd_xe_utils_default.a.isDateSame(dateValue, item.date, matchFormat),
          'is--hover': ctor_amd_xe_utils_default.a.isDateSame(datePanelValue, item.date, matchFormat)
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, renderDateLabel(h, _vm, item, item.year));
    }));
  }))])];
}

function renderDateTable(h, _vm) {
  var datePanelType = _vm.datePanelType;

  switch (datePanelType) {
    case 'week':
      return renderDateWeekTable(h, _vm);

    case 'month':
      return renderDateMonthTable(h, _vm);

    case 'year':
      return renderDateYearTable(h, _vm);
  }

  return renderDateDayTable(h, _vm);
}

function renderDatePanel(h, _vm) {
  var datePanelType = _vm.datePanelType,
      selectDatePanelLabel = _vm.selectDatePanelLabel,
      isDisabledPrevDateBtn = _vm.isDisabledPrevDateBtn,
      isDisabledNextDateBtn = _vm.isDisabledNextDateBtn;
  return [h('div', {
    class: 'vxe-input--date-picker-header'
  }, [h('div', {
    class: 'vxe-input--date-picker-type-wrapper'
  }, [datePanelType === 'year' ? h('span', {
    class: 'vxe-input--date-picker-label'
  }, selectDatePanelLabel) : h('span', {
    class: 'vxe-input--date-picker-btn',
    on: {
      click: _vm.dateToggleTypeEvent
    }
  }, selectDatePanelLabel)]), h('div', {
    class: 'vxe-input--date-picker-btn-wrapper'
  }, [h('span', {
    class: ['vxe-input--date-picker-btn vxe-input--date-picker-prev-btn', {
      'is--disabled': isDisabledPrevDateBtn
    }],
    on: {
      click: _vm.datePrevEvent
    }
  }, [h('i', {
    class: 'vxe-icon--caret-left'
  })]), h('span', {
    class: 'vxe-input--date-picker-btn vxe-input--date-picker-current-btn',
    on: {
      click: _vm.dateTodayMonthEvent
    }
  }, [h('i', {
    class: 'vxe-icon--dot'
  })]), h('span', {
    class: ['vxe-input--date-picker-btn vxe-input--date-picker-next-btn', {
      'is--disabled': isDisabledNextDateBtn
    }],
    on: {
      click: _vm.dateNextEvent
    }
  }, [h('i', {
    class: 'vxe-icon--caret-right'
  })])])]), h('div', {
    class: 'vxe-input--date-picker-body'
  }, renderDateTable(h, _vm))];
}

function renderTimePanel(h, _vm) {
  var dateTimeLabel = _vm.dateTimeLabel,
      datetimePanelValue = _vm.datetimePanelValue,
      hourList = _vm.hourList,
      minuteList = _vm.minuteList,
      secondList = _vm.secondList;
  return [h('div', {
    class: 'vxe-input--time-picker-header'
  }, [h('span', {
    class: 'vxe-input--time-picker-title'
  }, dateTimeLabel), h('button', {
    class: 'vxe-input--time-picker-confirm',
    attrs: {
      type: 'button'
    },
    on: {
      click: _vm.dateConfirmEvent
    }
  }, conf.i18n('vxe.button.confirm'))]), h('div', {
    ref: 'timeBody',
    class: 'vxe-input--time-picker-body'
  }, [h('ul', {
    class: 'vxe-input--time-picker-hour-list'
  }, hourList.map(function (item, index) {
    return h('li', {
      key: index,
      class: {
        'is--selected': datetimePanelValue && datetimePanelValue.getHours() === item.value
      },
      on: {
        click: function click(evnt) {
          return _vm.dateHourEvent(evnt, item);
        }
      }
    }, item.label);
  })), h('ul', {
    class: 'vxe-input--time-picker-minute-list'
  }, minuteList.map(function (item, index) {
    return h('li', {
      key: index,
      class: {
        'is--selected': datetimePanelValue && datetimePanelValue.getMinutes() === item.value
      },
      on: {
        click: function click(evnt) {
          return _vm.dateMinuteEvent(evnt, item);
        }
      }
    }, item.label);
  })), h('ul', {
    class: 'vxe-input--time-picker-second-list'
  }, secondList.map(function (item, index) {
    return h('li', {
      key: index,
      class: {
        'is--selected': datetimePanelValue && datetimePanelValue.getSeconds() === item.value
      },
      on: {
        click: function click(evnt) {
          return _vm.dateSecondEvent(evnt, item);
        }
      }
    }, item.label);
  }))])];
}

function renderPanel(h, _vm) {
  var type = _vm.type,
      vSize = _vm.vSize,
      isDatePicker = _vm.isDatePicker,
      transfer = _vm.transfer,
      animatVisible = _vm.animatVisible,
      visiblePanel = _vm.visiblePanel,
      panelPlacement = _vm.panelPlacement,
      panelStyle = _vm.panelStyle;
  var renders = [];

  if (isDatePicker) {
    var _ref;

    if (type === 'datetime') {
      renders.push(h('div', {
        class: 'vxe-input--panel-layout-wrapper'
      }, [h('div', {
        class: 'vxe-input--panel-left-wrapper'
      }, renderDatePanel(h, _vm)), h('div', {
        class: 'vxe-input--panel-right-wrapper'
      }, renderTimePanel(h, _vm))]));
    } else if (type === 'time') {
      renders.push(h('div', {
        class: 'vxe-input--panel-wrapper'
      }, renderTimePanel(h, _vm)));
    } else {
      renders.push(h('div', {
        class: 'vxe-input--panel-wrapper'
      }, renderDatePanel(h, _vm)));
    }

    return h('div', {
      ref: 'panel',
      class: ['vxe-table--ignore-clear vxe-input--panel', "type--".concat(type), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--transfer', transfer), _defineProperty(_ref, 'animat--leave', animatVisible), _defineProperty(_ref, 'animat--enter', visiblePanel), _ref)],
      attrs: {
        'data-placement': panelPlacement
      },
      style: panelStyle
    }, renders);
  }

  return null;
}

function renderNumberIcon(h, _vm) {
  return h('span', {
    class: 'vxe-input--number-suffix'
  }, [h('span', {
    class: 'vxe-input--number-prev is--prev',
    on: {
      mousedown: _vm.numberMousedownEvent,
      mouseup: _vm.numberStopDown,
      mouseleave: _vm.numberStopDown
    }
  }, [h('i', {
    class: ['vxe-input--number-prev-icon', conf.icon.INPUT_PREV_NUM]
  })]), h('span', {
    class: 'vxe-input--number-next is--next',
    on: {
      mousedown: _vm.numberMousedownEvent,
      mouseup: _vm.numberStopDown,
      mouseleave: _vm.numberStopDown
    }
  }, [h('i', {
    class: ['vxe-input--number-next-icon', conf.icon.INPUT_NEXT_NUM]
  })])]);
}

function renderDatePickerIcon(h, _vm) {
  return h('span', {
    class: 'vxe-input--date-picker-suffix',
    on: {
      click: _vm.datePickerOpenEvent
    }
  }, [h('i', {
    class: ['vxe-input--date-picker-icon', conf.icon.INPUT_DATE]
  })]);
}

function renderSearchIcon(h, _vm) {
  return h('span', {
    class: 'vxe-input--search-suffix',
    on: {
      click: _vm.searchEvent
    }
  }, [h('i', {
    class: ['vxe-input--search-icon', conf.icon.INPUT_SEARCH]
  })]);
}

function renderPasswordIcon(h, _vm) {
  var showPwd = _vm.showPwd;
  return h('span', {
    class: 'vxe-input--password-suffix',
    on: {
      click: _vm.passwordToggleEvent
    }
  }, [h('i', {
    class: ['vxe-input--password-icon', showPwd ? conf.icon.INPUT_SHOW_PWD : conf.icon.INPUT_PWD]
  })]);
}

function rendePrefixIcon(h, _vm) {
  var $scopedSlots = _vm.$scopedSlots,
      prefixIcon = _vm.prefixIcon;
  var icons = [];

  if ($scopedSlots.prefix) {
    icons.push(h('span', {
      class: 'vxe-input--prefix-icon'
    }, $scopedSlots.prefix.call(this, {}, h)));
  } else if (prefixIcon) {
    icons.push(h('i', {
      class: ['vxe-input--prefix-icon', prefixIcon]
    }));
  }

  return icons.length ? h('span', {
    class: 'vxe-input--prefix',
    on: {
      click: _vm.clickPrefixEvent
    }
  }, icons) : null;
}

function renderSuffixIcon(h, _vm) {
  var $scopedSlots = _vm.$scopedSlots,
      value = _vm.value,
      isClearable = _vm.isClearable,
      disabled = _vm.disabled,
      suffixIcon = _vm.suffixIcon;
  var icons = [];

  if ($scopedSlots.suffix) {
    icons.push(h('span', {
      class: 'vxe-input--suffix-icon'
    }, $scopedSlots.suffix.call(this, {}, h)));
  } else if (suffixIcon) {
    icons.push(h('i', {
      class: ['vxe-input--suffix-icon', suffixIcon]
    }));
  }

  if (isClearable) {
    icons.push(h('i', {
      class: ['vxe-input--clear-icon', conf.icon.INPUT_CLEAR]
    }));
  }

  return icons.length ? h('span', {
    class: ['vxe-input--suffix', {
      'is--clear': isClearable && !disabled && !(value === '' || ctor_amd_xe_utils_default.a.eqNull(value))
    }],
    on: {
      click: _vm.clickSuffixEvent
    }
  }, icons) : null;
}

function renderExtraSuffixIcon(h, _vm) {
  var controls = _vm.controls,
      isPassword = _vm.isPassword,
      isNumber = _vm.isNumber,
      isDatePicker = _vm.isDatePicker,
      isSearch = _vm.isSearch;
  var icons;

  if (controls) {
    if (isPassword) {
      icons = renderPasswordIcon(h, _vm);
    } else if (isNumber) {
      icons = renderNumberIcon(h, _vm);
    } else if (isDatePicker) {
      icons = renderDatePickerIcon(h, _vm);
    } else if (isSearch) {
      icons = renderSearchIcon(h, _vm);
    }
  }

  return icons ? h('span', {
    class: 'vxe-input--extra-suffix'
  }, [icons]) : null;
}

/* harmony default export */ var input = ({
  name: 'VxeInput',
  mixins: [size],
  props: {
    value: [String, Number, Date],
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: function _default() {
        return conf.input.clearable;
      }
    },
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    autocomplete: {
      type: String,
      default: 'off'
    },
    align: String,
    form: String,
    size: {
      type: String,
      default: function _default() {
        return conf.input.size || conf.size;
      }
    },
    // number、integer、float
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: [String, Number],
    // number、integer、float、password
    controls: {
      type: Boolean,
      default: function _default() {
        return conf.input.controls;
      }
    },
    // float
    digits: {
      type: [String, Number],
      default: function _default() {
        return conf.input.digits;
      }
    },
    // date、week、month、year
    dateConfig: Object,
    minDate: {
      type: [String, Number, Date],
      default: function _default() {
        return conf.input.minDate;
      }
    },
    maxDate: {
      type: [String, Number, Date],
      default: function _default() {
        return conf.input.maxDate;
      }
    },
    startWeek: {
      type: Number,
      default: function _default() {
        return conf.input.startWeek;
      }
    },
    labelFormat: {
      type: String,
      default: function _default() {
        return conf.input.labelFormat;
      }
    },
    parseFormat: {
      type: String,
      default: function _default() {
        return conf.input.parseFormat;
      }
    },
    valueFormat: {
      type: String,
      default: function _default() {
        return conf.input.valueFormat;
      }
    },
    editable: {
      type: Boolean,
      default: true
    },
    festivalMethod: {
      type: Function,
      default: function _default() {
        return conf.input.festivalMethod;
      }
    },
    disabledMethod: {
      type: Function,
      default: function _default() {
        return conf.input.disabledMethod;
      }
    },
    prefixIcon: String,
    suffixIcon: String,
    placement: String,
    transfer: {
      type: Boolean,
      default: function _default() {
        return conf.input.transfer;
      }
    }
  },
  data: function data() {
    return {
      panelIndex: 0,
      showPwd: false,
      visiblePanel: false,
      animatVisible: false,
      panelStyle: null,
      panelPlacement: null,
      isActivated: false,
      inputValue: '',
      datetimePanelValue: null,
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    };
  },
  computed: {
    isNumber: function isNumber() {
      return ['number', 'integer', 'float'].indexOf(this.type) > -1;
    },
    isDatePicker: function isDatePicker() {
      return this.hasTime || ['date', 'week', 'month', 'year'].indexOf(this.type) > -1;
    },
    hasTime: function hasTime() {
      var type = this.type;
      return type === 'time' || type === 'datetime';
    },
    isPassword: function isPassword() {
      return this.type === 'password';
    },
    isSearch: function isSearch() {
      return this.type === 'search';
    },
    stepValue: function stepValue() {
      var type = this.type,
          step = this.step;

      if (type === 'integer') {
        return ctor_amd_xe_utils_default.a.toInteger(step) || 1;
      } else if (type === 'float') {
        return ctor_amd_xe_utils_default.a.toNumber(step) || 1 / Math.pow(10, this.digitsValue);
      }

      return ctor_amd_xe_utils_default.a.toNumber(step) || 1;
    },
    digitsValue: function digitsValue() {
      return ctor_amd_xe_utils_default.a.toInteger(this.digits) || 1;
    },
    isClearable: function isClearable() {
      return this.clearable && (this.isPassword || this.isNumber || this.isDatePicker || this.type === 'text' || this.type === 'search');
    },
    isDisabledPrevDateBtn: function isDisabledPrevDateBtn() {
      var selectMonth = this.selectMonth,
          dateMinTime = this.dateMinTime;

      if (selectMonth) {
        return selectMonth <= dateMinTime;
      }

      return false;
    },
    isDisabledNextDateBtn: function isDisabledNextDateBtn() {
      var selectMonth = this.selectMonth,
          dateMaxTime = this.dateMaxTime;

      if (selectMonth) {
        return selectMonth >= dateMaxTime;
      }

      return false;
    },
    dateMinTime: function dateMinTime() {
      return this.minDate ? ctor_amd_xe_utils_default.a.toStringDate(this.minDate) : null;
    },
    dateMaxTime: function dateMaxTime() {
      return this.maxDate ? ctor_amd_xe_utils_default.a.toStringDate(this.maxDate) : null;
    },
    dateValue: function dateValue() {
      var value = this.value,
          isDatePicker = this.isDatePicker,
          type = this.type,
          dateValueFormat = this.dateValueFormat;

      if (value && isDatePicker) {
        if (type === 'time') {
          return toStringTime(value, dateValueFormat);
        }

        return ctor_amd_xe_utils_default.a.toStringDate(value, dateValueFormat);
      }

      return null;
    },
    dateTimeLabel: function dateTimeLabel() {
      var datetimePanelValue = this.datetimePanelValue;

      if (datetimePanelValue) {
        return ctor_amd_xe_utils_default.a.toDateString(datetimePanelValue, 'HH:mm:ss');
      }

      return '';
    },
    hmsTime: function hmsTime() {
      var dateValue = this.dateValue;
      return dateValue && this.hasTime ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0;
    },
    dateLabelFormat: function dateLabelFormat() {
      if (this.isDatePicker) {
        return this.labelFormat || this.dateOpts.labelFormat || conf.i18n("vxe.input.date.labelFormat.".concat(this.type));
      }

      return null;
    },
    dateValueFormat: function dateValueFormat() {
      var type = this.type;
      return type === 'time' ? 'HH:mm:ss' : this.valueFormat || this.dateOpts.valueFormat || (type === 'datetime' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd');
    },
    selectDatePanelLabel: function selectDatePanelLabel() {
      if (this.isDatePicker) {
        var datePanelType = this.datePanelType,
            selectMonth = this.selectMonth,
            yearList = this.yearList;
        var year = '';
        var month;

        if (selectMonth) {
          year = selectMonth.getFullYear();
          month = selectMonth.getMonth() + 1;
        }

        if (datePanelType === 'month') {
          return conf.i18n('vxe.input.date.monthLabel', [year]);
        } else if (datePanelType === 'year') {
          return yearList.length ? "".concat(yearList[0].year, " - ").concat(yearList[yearList.length - 1].year) : '';
        }

        return conf.i18n('vxe.input.date.dayLabel', [year, month ? conf.i18n("vxe.input.date.m".concat(month)) : '-']);
      }

      return '';
    },
    weekDatas: function weekDatas() {
      var weeks = [];

      if (this.isDatePicker) {
        var sWeek = ctor_amd_xe_utils_default.a.toNumber(ctor_amd_xe_utils_default.a.isNumber(this.startWeek) ? this.startWeek : this.dateOpts.startWeek);
        weeks.push(sWeek);

        for (var index = 0; index < 6; index++) {
          if (sWeek >= 6) {
            sWeek = 0;
          } else {
            sWeek++;
          }

          weeks.push(sWeek);
        }
      }

      return weeks;
    },
    dateHeaders: function dateHeaders() {
      if (this.isDatePicker) {
        return this.weekDatas.map(function (day) {
          return {
            value: day,
            label: conf.i18n("vxe.input.date.weeks.w".concat(day))
          };
        });
      }

      return [];
    },
    weekHeaders: function weekHeaders() {
      if (this.isDatePicker) {
        return [{
          label: conf.i18n('vxe.input.date.weeks.w')
        }].concat(this.dateHeaders);
      }

      return [];
    },
    yearList: function yearList() {
      var selectMonth = this.selectMonth,
          currentDate = this.currentDate;
      var months = [];

      if (selectMonth && currentDate) {
        var currFullYear = currentDate.getFullYear();
        var startYear = new Date(('' + selectMonth.getFullYear()).replace(/\d{1}$/, '0'), 0, 1);

        for (var index = -10; index < yearSize - 10; index++) {
          var date = ctor_amd_xe_utils_default.a.getWhatYear(startYear, index, 'first');
          var itemFullYear = date.getFullYear();
          months.push({
            date: date,
            isCurrent: true,
            isNow: currFullYear === itemFullYear,
            year: itemFullYear
          });
        }
      }

      return months;
    },
    yearDatas: function yearDatas() {
      return ctor_amd_xe_utils_default.a.chunk(this.yearList, 4);
    },
    monthList: function monthList() {
      var selectMonth = this.selectMonth,
          currentDate = this.currentDate;
      var months = [];

      if (selectMonth && currentDate) {
        var currFullYear = currentDate.getFullYear();
        var currMonth = currentDate.getMonth();
        var selFullYear = ctor_amd_xe_utils_default.a.getWhatYear(selectMonth, 0, 'first').getFullYear();

        for (var index = -4; index < monthSize - 4; index++) {
          var date = ctor_amd_xe_utils_default.a.getWhatYear(selectMonth, 0, index);
          var itemFullYear = date.getFullYear();
          var itemMonth = date.getMonth();
          var isPrev = itemFullYear < selFullYear;
          months.push({
            date: date,
            isPrev: isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth,
            isNext: !isPrev && itemFullYear > selFullYear,
            month: itemMonth
          });
        }
      }

      return months;
    },
    monthDatas: function monthDatas() {
      return ctor_amd_xe_utils_default.a.chunk(this.monthList, 4);
    },
    dayList: function dayList() {
      var weekDatas = this.weekDatas,
          selectMonth = this.selectMonth,
          currentDate = this.currentDate,
          hmsTime = this.hmsTime;
      var days = [];

      if (selectMonth && currentDate) {
        var currFullYear = currentDate.getFullYear();
        var currMonth = currentDate.getMonth();
        var currDate = currentDate.getDate();
        var selFullYear = selectMonth.getFullYear();
        var selMonth = selectMonth.getMonth();
        var selDay = selectMonth.getDay();
        var prevOffsetDate = -weekDatas.indexOf(selDay);
        var startDate = new Date(ctor_amd_xe_utils_default.a.getWhatDay(selectMonth, prevOffsetDate).getTime() + hmsTime);

        for (var index = 0; index < 42; index++) {
          var date = ctor_amd_xe_utils_default.a.getWhatDay(startDate, index);
          var itemFullYear = date.getFullYear();
          var itemMonth = date.getMonth();
          var itemDate = date.getDate();
          var isPrev = date < selectMonth;
          days.push({
            date: date,
            isPrev: isPrev,
            isCurrent: itemFullYear === selFullYear && itemMonth === selMonth,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth && itemDate === currDate,
            isNext: !isPrev && selMonth !== itemMonth,
            label: itemDate
          });
        }
      }

      return days;
    },
    dayDatas: function dayDatas() {
      return ctor_amd_xe_utils_default.a.chunk(this.dayList, 7);
    },
    weekDates: function weekDates() {
      return this.dayDatas.map(function (list) {
        var firstItem = list[0];
        var item = {
          date: firstItem.date,
          isWeekNumber: true,
          isPrev: false,
          isCurrent: false,
          isNow: false,
          isNext: false,
          label: ctor_amd_xe_utils_default.a.getYearWeek(firstItem.date)
        };
        return [item].concat(list);
      });
    },
    dateOpts: function dateOpts() {
      return Object.assign({}, this.dateConfig, conf.input.dateConfig);
    },
    hourList: function hourList() {
      var list = [];

      if (this.hasTime) {
        for (var index = 0; index < 24; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, 0)
          });
        }
      }

      return list;
    },
    minuteList: function minuteList() {
      var list = [];

      if (this.hasTime) {
        for (var index = 0; index < 60; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, 0)
          });
        }
      }

      return list;
    },
    secondList: function secondList() {
      return this.minuteList;
    },
    inpAttrs: function inpAttrs() {
      var isDatePicker = this.isDatePicker,
          isNumber = this.isNumber,
          isPassword = this.isPassword,
          type = this.type,
          name = this.name,
          placeholder = this.placeholder,
          readonly = this.readonly,
          disabled = this.disabled,
          maxlength = this.maxlength,
          form = this.form,
          autocomplete = this.autocomplete,
          showPwd = this.showPwd,
          editable = this.editable;
      var inputType = type;

      if (isDatePicker || isNumber || isPassword && showPwd || type === 'number') {
        inputType = 'text';
      }

      var attrs = {
        name: name,
        form: form,
        type: inputType,
        placeholder: placeholder,
        maxlength: isNumber && !ctor_amd_xe_utils_default.a.toNumber(maxlength) ? 16 : maxlength,
        // 数值最大长度限制 16 位，包含小数
        readonly: readonly || type === 'week' || !editable || this.dateOpts.editable === false,
        disabled: disabled,
        autocomplete: autocomplete
      };

      if (placeholder) {
        attrs.placeholder = UtilTools.getFuncText(placeholder);
      }

      return attrs;
    },
    inpEvents: function inpEvents() {
      var _this = this;

      var evnts = {};
      ctor_amd_xe_utils_default.a.each(this.$listeners, function (cb, name) {
        if (['change', 'clear', 'prefix-click', 'suffix-click'].indexOf(name) === -1) {
          evnts[name] = _this.triggerEvent;
        }
      });

      if (this.isNumber) {
        evnts.keydown = this.keydownEvent;
        evnts[input_wheelName] = this.mousewheelEvent;
      } else if (this.isDatePicker) {
        evnts.click = this.clickEvent;
      }

      evnts.input = this.inputEvent;
      evnts.focus = this.focusEvent;
      evnts.blur = this.blurEvent;
      return evnts;
    }
  },
  watch: {
    value: function value() {
      this.changeValue();
    },
    dateLabelFormat: function dateLabelFormat() {
      this.dateParseValue(this.datePanelValue);
      this.inputValue = this.datePanelLabel;
    }
  },
  created: function created() {
    this.initValue();
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  mounted: function mounted() {
    if (this.dateConfig) {
      UtilTools.warn('vxe.error.removeProp', ['date-config']);
    }

    if (this.isDatePicker) {
      if (this.transfer) {
        document.body.appendChild(this.$refs.panel);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    this.numberStopDown();
    GlobalEvent.off(this, 'mousewheel');
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'keydown');
    GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref2;

    var controls = this.controls,
        isDatePicker = this.isDatePicker,
        visiblePanel = this.visiblePanel,
        isActivated = this.isActivated,
        vSize = this.vSize,
        type = this.type,
        align = this.align,
        readonly = this.readonly,
        disabled = this.disabled;
    var childs = [];
    var prefix = rendePrefixIcon(h, this);
    var suffix = renderSuffixIcon(h, this); // 前缀图标

    if (prefix) {
      childs.push(prefix);
    } // 输入框


    childs.push(isDatePicker ? renderDateInput(h, this) : renderDefaultInput(h, this)); // 后缀图标

    if (suffix) {
      childs.push(suffix);
    } // 特殊功能图标


    childs.push(renderExtraSuffixIcon(h, this)); // 面板容器

    if (isDatePicker) {
      childs.push(renderPanel(h, this));
    }

    return h('div', {
      class: ['vxe-input', "type--".concat(type), (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, "is--".concat(align), align), _defineProperty(_ref2, 'is--controls', controls), _defineProperty(_ref2, 'is--prefix', !!prefix), _defineProperty(_ref2, 'is--suffix', !!suffix), _defineProperty(_ref2, 'is--readonly', readonly), _defineProperty(_ref2, 'is--visivle', visiblePanel), _defineProperty(_ref2, 'is--disabled', disabled), _defineProperty(_ref2, 'is--active', isActivated), _ref2)]
    }, childs);
  },
  methods: {
    focus: function focus() {
      this.$refs.input.focus();
      return this.$nextTick();
    },
    blur: function blur() {
      this.$refs.input.blur();
      return this.$nextTick();
    },
    triggerEvent: function triggerEvent(evnt) {
      var $refs = this.$refs,
          value = this.value;
      this.$emit(evnt.type, {
        $panel: $refs.panel,
        value: value,
        $event: evnt
      });
    },
    emitUpdate: function emitUpdate(value, evnt) {
      if (ctor_amd_xe_utils_default.a.toString(this.value) !== value) {
        this.$emit('input', value);
        this.$emit('change', {
          value: value,
          $event: evnt
        });
      }
    },
    inputEvent: function inputEvent(evnt) {
      var isDatePicker = this.isDatePicker;
      var value = evnt.target.value;
      this.inputValue = value;

      if (!isDatePicker) {
        this.emitUpdate(value, evnt);
      }
    },
    focusEvent: function focusEvent(evnt) {
      this.isActivated = true;
      this.triggerEvent(evnt);
    },
    blurEvent: function blurEvent(evnt) {
      this.afterCheckValue();
      this.triggerEvent(evnt);
    },
    keydownEvent: function keydownEvent(evnt) {
      if (this.isNumber) {
        var isCtrlKey = evnt.ctrlKey;
        var isShiftKey = evnt.shiftKey;
        var isAltKey = evnt.altKey;
        var keyCode = evnt.keyCode;

        if (!isCtrlKey && !isShiftKey && !isAltKey && (keyCode === 32 || keyCode >= 65 && keyCode <= 90)) {
          evnt.preventDefault();
        }

        this.numberKeydownEvent(evnt);
      }

      this.triggerEvent(evnt);
    },
    mousewheelEvent: function mousewheelEvent(evnt) {
      if (this.isNumber && this.controls) {
        if (this.isActivated) {
          var delta = -evnt.wheelDelta || evnt.detail;

          if (delta > 0) {
            this.numberNextEvent(evnt);
          } else if (delta < 0) {
            this.numberPrevEvent(evnt);
          }

          evnt.preventDefault();
        }
      }
    },
    clickEvent: function clickEvent(evnt) {
      var isDatePicker = this.isDatePicker;

      if (isDatePicker) {
        this.datePickerOpenEvent(evnt);
      }

      this.triggerEvent(evnt);
    },
    clickPrefixEvent: function clickPrefixEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          value = this.value;

      if (!disabled) {
        this.$emit('prefix-click', {
          $panel: $refs.panel,
          value: value,
          $event: evnt
        });
      }
    },
    clickSuffixEvent: function clickSuffixEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          value = this.value;

      if (!disabled) {
        if (DomTools.hasClass(evnt.currentTarget, 'is--clear')) {
          this.emitUpdate('', evnt);
          this.clearValueEvent(evnt, '');
        } else {
          this.$emit('suffix-click', {
            $panel: $refs.panel,
            value: value,
            $event: evnt
          });
        }
      }
    },
    clearValueEvent: function clearValueEvent(evnt, value) {
      var $refs = this.$refs,
          type = this.type,
          isNumber = this.isNumber;

      if (this.isDatePicker) {
        this.hidePanel();
      }

      if (isNumber || ['text', 'search', 'password'].indexOf(type) > -1) {
        this.focus();
      }

      this.$emit('clear', {
        $panel: $refs.panel,
        value: value,
        $event: evnt
      });
    },

    /**
     * 检查初始值
     */
    initValue: function initValue() {
      var type = this.type,
          isDatePicker = this.isDatePicker,
          value = this.value,
          digitsValue = this.digitsValue;

      if (isDatePicker) {
        this.changeValue();
      } else if (type === 'float') {
        if (value) {
          var validValue = ctor_amd_xe_utils_default.a.toFixed(ctor_amd_xe_utils_default.a.floor(value, digitsValue), digitsValue);

          if (value !== validValue) {
            this.emitUpdate(validValue, {
              type: 'init'
            });
          }
        }
      }
    },

    /**
     * 值变化时处理
     */
    changeValue: function changeValue() {
      if (this.isDatePicker) {
        this.dateParseValue(this.value);
        this.inputValue = this.datePanelLabel;
      }
    },
    afterCheckValue: function afterCheckValue() {
      var type = this.type,
          inpAttrs = this.inpAttrs,
          value = this.value,
          inputValue = this.inputValue,
          isDatePicker = this.isDatePicker,
          isNumber = this.isNumber,
          datetimePanelValue = this.datetimePanelValue,
          dateLabelFormat = this.dateLabelFormat,
          min = this.min,
          max = this.max,
          digitsValue = this.digitsValue;

      if (!inpAttrs.readonly) {
        if (isNumber) {
          if (value) {
            var inpVal = type === 'integer' ? ctor_amd_xe_utils_default.a.toInteger(value) : ctor_amd_xe_utils_default.a.toNumber(value);

            if (!this.vaildMinNum(inpVal)) {
              inpVal = min;
            } else if (!this.vaildMaxNum(inpVal)) {
              inpVal = max;
            }

            this.emitUpdate(type === 'float' ? ctor_amd_xe_utils_default.a.toFixed(ctor_amd_xe_utils_default.a.floor(inpVal, digitsValue), digitsValue) : ctor_amd_xe_utils_default.a.toString(inpVal), {
              type: 'check'
            });
          }
        } else if (isDatePicker) {
          var _inpVal = inputValue;

          if (_inpVal) {
            if (type === 'time') {
              _inpVal = toStringTime(_inpVal, dateLabelFormat);
            } else {
              _inpVal = ctor_amd_xe_utils_default.a.toStringDate(_inpVal, dateLabelFormat);
            }

            if (ctor_amd_xe_utils_default.a.isValidDate(_inpVal)) {
              if (type === 'time') {
                _inpVal = ctor_amd_xe_utils_default.a.toDateString(_inpVal, dateLabelFormat);

                if (value !== _inpVal) {
                  this.emitUpdate(_inpVal, {
                    type: 'check'
                  });
                }

                this.inputValue = _inpVal;
              } else {
                if (!ctor_amd_xe_utils_default.a.isDateSame(value, _inpVal, dateLabelFormat)) {
                  if (type === 'datetime') {
                    datetimePanelValue.setHours(_inpVal.getHours());
                    datetimePanelValue.setMinutes(_inpVal.getMinutes());
                    datetimePanelValue.setSeconds(_inpVal.getSeconds());
                  }

                  this.dateChange(_inpVal);
                } else {
                  this.inputValue = ctor_amd_xe_utils_default.a.toDateString(value, dateLabelFormat);
                }
              }
            } else {
              this.dateRevert();
            }
          } else {
            this.emitUpdate('', {
              type: 'check'
            });
          }
        }
      }
    },
    // 密码
    passwordToggleEvent: function passwordToggleEvent(evnt) {
      var disabled = this.disabled,
          readonly = this.readonly,
          showPwd = this.showPwd;

      if (!disabled && !readonly) {
        this.showPwd = !showPwd;
      }

      this.$emit('toggle-visible', {
        visible: this.showPwd,
        $event: evnt
      });
    },
    // 密码
    // 搜索
    searchEvent: function searchEvent(evnt) {
      this.$emit('search-click', {
        $event: evnt
      });
    },
    // 搜索
    // 数值
    vaildMinNum: function vaildMinNum(num) {
      return this.min === null || num >= ctor_amd_xe_utils_default.a.toNumber(this.min);
    },
    vaildMaxNum: function vaildMaxNum(num) {
      return this.max === null || num <= ctor_amd_xe_utils_default.a.toNumber(this.max);
    },
    numberStopDown: function numberStopDown() {
      clearTimeout(this.downbumTimeout);
    },
    numberDownPrevEvent: function numberDownPrevEvent(evnt) {
      var _this2 = this;

      this.downbumTimeout = setTimeout(function () {
        _this2.numberPrevEvent(evnt);

        _this2.numberDownPrevEvent(evnt);
      }, 60);
    },
    numberDownNextEvent: function numberDownNextEvent(evnt) {
      var _this3 = this;

      this.downbumTimeout = setTimeout(function () {
        _this3.numberNextEvent(evnt);

        _this3.numberDownNextEvent(evnt);
      }, 60);
    },
    numberKeydownEvent: function numberKeydownEvent(evnt) {
      var keyCode = evnt.keyCode;
      var isUpArrow = keyCode === 38;
      var isDwArrow = keyCode === 40;

      if (isUpArrow || isDwArrow) {
        evnt.preventDefault();

        if (isUpArrow) {
          this.numberPrevEvent(evnt);
        } else {
          this.numberNextEvent(evnt);
        }
      }
    },
    numberMousedownEvent: function numberMousedownEvent(evnt) {
      var _this4 = this;

      this.numberStopDown();

      if (evnt.button === 0) {
        var isPrevNumber = DomTools.hasClass(evnt.currentTarget, 'is--prev');

        if (isPrevNumber) {
          this.numberPrevEvent(evnt);
        } else {
          this.numberNextEvent(evnt);
        }

        this.downbumTimeout = setTimeout(function () {
          if (isPrevNumber) {
            _this4.numberDownPrevEvent(evnt);
          } else {
            _this4.numberDownNextEvent(evnt);
          }
        }, 500);
      }
    },
    numberPrevEvent: function numberPrevEvent(evnt) {
      var disabled = this.disabled,
          readonly = this.readonly;
      clearTimeout(this.downbumTimeout);

      if (!disabled && !readonly) {
        this.numberChange(true, evnt);
      }

      this.$emit('prev-number', {
        $event: evnt
      });
    },
    numberNextEvent: function numberNextEvent(evnt) {
      var disabled = this.disabled,
          readonly = this.readonly;
      clearTimeout(this.downbumTimeout);

      if (!disabled && !readonly) {
        this.numberChange(false, evnt);
      }

      this.$emit('next-number', {
        $event: evnt
      });
    },
    numberChange: function numberChange(isPlus, evnt) {
      var type = this.type,
          digitsValue = this.digitsValue,
          value = this.value,
          stepValue = this.stepValue;
      var inputValue = type === 'integer' ? ctor_amd_xe_utils_default.a.toInteger(value) : ctor_amd_xe_utils_default.a.toNumber(value);
      var newValue = isPlus ? ctor_amd_xe_utils_default.a.add(inputValue, stepValue) : ctor_amd_xe_utils_default.a.subtract(inputValue, stepValue);

      if (this.vaildMinNum(newValue) && this.vaildMaxNum(newValue)) {
        this.emitUpdate(type === 'float' ? ctor_amd_xe_utils_default.a.toFixed(ctor_amd_xe_utils_default.a.floor(newValue, digitsValue), digitsValue) : ctor_amd_xe_utils_default.a.toString(newValue), evnt);
      }
    },
    // 数值
    // 日期
    datePickerOpenEvent: function datePickerOpenEvent(evnt) {
      evnt.preventDefault();
      this.showPanel();
    },
    dateMonthHandle: function dateMonthHandle(date, offsetMonth) {
      this.selectMonth = ctor_amd_xe_utils_default.a.getWhatMonth(date, offsetMonth, 'first');
    },
    dateNowHandle: function dateNowHandle() {
      var currentDate = ctor_amd_xe_utils_default.a.getWhatDay(Date.now(), 0, 'first');
      this.currentDate = currentDate;
      this.dateMonthHandle(currentDate, 0);
    },
    dateToggleTypeEvent: function dateToggleTypeEvent() {
      var datePanelType = this.datePanelType;

      if (datePanelType === 'month') {
        datePanelType = 'year';
      } else {
        datePanelType = 'month';
      }

      this.datePanelType = datePanelType;
    },
    datePrevEvent: function datePrevEvent(evnt) {
      var isDisabledPrevDateBtn = this.isDisabledPrevDateBtn,
          type = this.type,
          datePanelType = this.datePanelType;

      if (!isDisabledPrevDateBtn) {
        if (type === 'year') {
          this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, -yearSize, 'first');
        } else if (type === 'month') {
          if (datePanelType === 'year') {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, -yearSize, 'first');
          } else {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, -1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, -yearSize, 'first');
          } else if (datePanelType === 'month') {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, -1, 'first');
          } else {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatMonth(this.selectMonth, -1, 'first');
          }
        }

        this.$emit('date-prev', {
          type: type,
          $event: evnt
        });
      }
    },
    dateTodayMonthEvent: function dateTodayMonthEvent(evnt) {
      this.dateNowHandle();
      this.dateChange(this.currentDate);
      this.hidePanel();
      this.$emit('date-today', {
        type: this.type,
        $event: evnt
      });
    },
    dateNextEvent: function dateNextEvent(evnt) {
      var isDisabledNextDateBtn = this.isDisabledNextDateBtn,
          type = this.type,
          datePanelType = this.datePanelType;

      if (!isDisabledNextDateBtn) {
        if (type === 'year') {
          this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, yearSize, 'first');
        } else if (type === 'month') {
          if (datePanelType === 'year') {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, yearSize, 'first');
          } else {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, 1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, yearSize, 'first');
          } else if (datePanelType === 'month') {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatYear(this.selectMonth, 1, 'first');
          } else {
            this.selectMonth = ctor_amd_xe_utils_default.a.getWhatMonth(this.selectMonth, 1, 'first');
          }
        }

        this.$emit('date-next', {
          type: type,
          $event: evnt
        });
      }
    },
    dateSelectEvent: function dateSelectEvent(item) {
      if (!isDateDisabled(this, item)) {
        this.dateSelectItem(item.date);
      }
    },
    dateSelectItem: function dateSelectItem(date) {
      var type = this.type,
          datePanelType = this.datePanelType;

      if (type === 'month') {
        if (datePanelType === 'year') {
          this.datePanelType = 'month';
          this.dateCheckMonth(date);
        } else {
          this.dateChange(date);
          this.hidePanel();
        }
      } else if (type === 'year') {
        this.hidePanel();
        this.dateChange(date);
      } else {
        if (datePanelType === 'month') {
          this.datePanelType = type === 'week' ? type : 'day';
          this.dateCheckMonth(date);
        } else if (datePanelType === 'year') {
          this.datePanelType = 'month';
          this.dateCheckMonth(date);
        } else {
          this.dateChange(date);
          this.hidePanel();
        }
      }
    },
    dateMouseenterEvent: function dateMouseenterEvent(item) {
      if (!isDateDisabled(this, item)) {
        var datePanelType = this.datePanelType;

        if (datePanelType === 'month') {
          this.dateMoveMonth(item.date);
        } else if (datePanelType === 'year') {
          this.dateMoveYear(item.date);
        } else {
          this.dateMoveDay(item.date);
        }
      }
    },
    dateHourEvent: function dateHourEvent(evnt, item) {
      this.datetimePanelValue.setHours(item.value);
      this.dateTimeChangeEvent(evnt);
    },
    dateConfirmEvent: function dateConfirmEvent() {
      this.dateChange(this.dateValue || this.currentDate);
      this.hidePanel();
    },
    dateMinuteEvent: function dateMinuteEvent(evnt, item) {
      this.datetimePanelValue.setMinutes(item.value);
      this.dateTimeChangeEvent(evnt);
    },
    dateSecondEvent: function dateSecondEvent(evnt, item) {
      this.datetimePanelValue.setSeconds(item.value);
      this.dateTimeChangeEvent(evnt);
    },
    dateTimeChangeEvent: function dateTimeChangeEvent(evnt) {
      this.datetimePanelValue = new Date(this.datetimePanelValue.getTime());
      this.updateTimePos(evnt.currentTarget);
    },
    updateTimePos: function updateTimePos(liElem) {
      if (liElem) {
        var height = liElem.offsetHeight;
        liElem.parentNode.scrollTop = liElem.offsetTop - height * 4;
      }
    },
    dateMoveDay: function dateMoveDay(offsetDay) {
      if (!isDateDisabled(this, {
        date: offsetDay
      })) {
        if (!this.dayList.some(function (item) {
          return ctor_amd_xe_utils_default.a.isDateSame(item.date, offsetDay, 'yyyy-MM-dd');
        })) {
          this.dateCheckMonth(offsetDay);
        }

        this.dateParseValue(offsetDay);
      }
    },
    dateMoveMonth: function dateMoveMonth(offsetMonth) {
      if (!isDateDisabled(this, {
        date: offsetMonth
      })) {
        if (!this.monthList.some(function (item) {
          return ctor_amd_xe_utils_default.a.isDateSame(item.date, offsetMonth, 'yyyy-MM');
        })) {
          this.dateCheckMonth(offsetMonth);
        }

        this.dateParseValue(offsetMonth);
      }
    },
    dateMoveYear: function dateMoveYear(offsetYear) {
      if (!isDateDisabled(this, {
        date: offsetYear
      })) {
        if (!this.yearList.some(function (item) {
          return ctor_amd_xe_utils_default.a.isDateSame(item.date, offsetYear, 'yyyy');
        })) {
          this.dateCheckMonth(offsetYear);
        }

        this.dateParseValue(offsetYear);
      }
    },
    dateParseValue: function dateParseValue(date) {
      var type = this.type,
          dateLabelFormat = this.dateLabelFormat,
          parseFormat = this.parseFormat;
      var dValue = null;
      var dLabel = '';

      if (date) {
        if (type === 'time') {
          dValue = toStringTime(date, parseFormat || this.dateOpts.parseFormat);
        } else {
          dValue = ctor_amd_xe_utils_default.a.toStringDate(date, parseFormat || this.dateOpts.parseFormat);
        }
      }

      if (ctor_amd_xe_utils_default.a.isValidDate(dValue)) {
        dLabel = ctor_amd_xe_utils_default.a.toDateString(dValue, dateLabelFormat);
      } else {
        dValue = null;
      }

      this.datePanelValue = dValue;
      this.datePanelLabel = dLabel;
    },
    dateOffsetEvent: function dateOffsetEvent(evnt) {
      var isActivated = this.isActivated,
          datePanelValue = this.datePanelValue,
          datePanelType = this.datePanelType;

      if (isActivated) {
        evnt.preventDefault();
        var keyCode = evnt.keyCode;
        var isLeftArrow = keyCode === 37;
        var isUpArrow = keyCode === 38;
        var isRightArrow = keyCode === 39;
        var isDwArrow = keyCode === 40;

        if (datePanelType === 'year') {
          var offsetYear = ctor_amd_xe_utils_default.a.getWhatYear(datePanelValue || Date.now(), 0, 'first');

          if (isLeftArrow) {
            offsetYear = ctor_amd_xe_utils_default.a.getWhatYear(offsetYear, -1);
          } else if (isUpArrow) {
            offsetYear = ctor_amd_xe_utils_default.a.getWhatYear(offsetYear, -4);
          } else if (isRightArrow) {
            offsetYear = ctor_amd_xe_utils_default.a.getWhatYear(offsetYear, 1);
          } else if (isDwArrow) {
            offsetYear = ctor_amd_xe_utils_default.a.getWhatYear(offsetYear, 4);
          }

          this.dateMoveYear(offsetYear);
        } else if (datePanelType === 'month') {
          var offsetMonth = ctor_amd_xe_utils_default.a.getWhatMonth(datePanelValue || Date.now(), 0, 'first');

          if (isLeftArrow) {
            offsetMonth = ctor_amd_xe_utils_default.a.getWhatMonth(offsetMonth, -1);
          } else if (isUpArrow) {
            offsetMonth = ctor_amd_xe_utils_default.a.getWhatMonth(offsetMonth, -4);
          } else if (isRightArrow) {
            offsetMonth = ctor_amd_xe_utils_default.a.getWhatMonth(offsetMonth, 1);
          } else if (isDwArrow) {
            offsetMonth = ctor_amd_xe_utils_default.a.getWhatMonth(offsetMonth, 4);
          }

          this.dateMoveMonth(offsetMonth);
        } else {
          var offsetDay = datePanelValue || ctor_amd_xe_utils_default.a.getWhatDay(Date.now(), 0, 'first');

          if (isLeftArrow) {
            offsetDay = ctor_amd_xe_utils_default.a.getWhatDay(offsetDay, -1);
          } else if (isUpArrow) {
            offsetDay = ctor_amd_xe_utils_default.a.getWhatWeek(offsetDay, -1);
          } else if (isRightArrow) {
            offsetDay = ctor_amd_xe_utils_default.a.getWhatDay(offsetDay, 1);
          } else if (isDwArrow) {
            offsetDay = ctor_amd_xe_utils_default.a.getWhatWeek(offsetDay, 1);
          }

          this.dateMoveDay(offsetDay);
        }
      }
    },
    datePgOffsetEvent: function datePgOffsetEvent(evnt) {
      var isActivated = this.isActivated;

      if (isActivated) {
        var isPgUp = evnt.keyCode === 33;
        evnt.preventDefault();

        if (isPgUp) {
          this.datePrevEvent(evnt);
        } else {
          this.dateNextEvent(evnt);
        }
      }
    },
    dateChange: function dateChange(date) {
      var value = this.value,
          datetimePanelValue = this.datetimePanelValue,
          dateValueFormat = this.dateValueFormat;

      if (this.type === 'week') {
        var sWeek = ctor_amd_xe_utils_default.a.toNumber(ctor_amd_xe_utils_default.a.isNumber(this.startWeek) ? this.startWeek : this.dateOpts.startWeek);
        date = ctor_amd_xe_utils_default.a.getWhatWeek(date, 0, sWeek);
      } else if (this.hasTime) {
        date.setHours(datetimePanelValue.getHours());
        date.setMinutes(datetimePanelValue.getMinutes());
        date.setSeconds(datetimePanelValue.getSeconds());
      }

      var inpVal = ctor_amd_xe_utils_default.a.toDateString(date, dateValueFormat);
      this.dateCheckMonth(date);

      if (!ctor_amd_xe_utils_default.a.isEqual(value, inpVal)) {
        this.emitUpdate(inpVal, {
          type: 'update'
        });
      }
    },
    dateCheckMonth: function dateCheckMonth(date) {
      var month = ctor_amd_xe_utils_default.a.getWhatMonth(date, 0, 'first');

      if (!ctor_amd_xe_utils_default.a.isEqual(month, this.selectMonth)) {
        this.selectMonth = month;
      }
    },
    dateOpenPanel: function dateOpenPanel() {
      var _this5 = this;

      var type = this.type,
          dateValue = this.dateValue;

      if (['year', 'month', 'week'].indexOf(type) > -1) {
        this.datePanelType = type;
      } else {
        this.datePanelType = 'day';
      }

      this.currentDate = ctor_amd_xe_utils_default.a.getWhatDay(Date.now(), 0, 'first');

      if (dateValue) {
        this.dateMonthHandle(dateValue, 0);
        this.dateParseValue(dateValue);
      } else {
        this.dateNowHandle();
      }

      if (this.hasTime) {
        this.datetimePanelValue = this.datePanelValue || ctor_amd_xe_utils_default.a.getWhatDay(Date.now(), 0, 'first');
        this.$nextTick(function () {
          ctor_amd_xe_utils_default.a.arrayEach(_this5.$refs.timeBody.querySelectorAll('li.is--selected'), _this5.updateTimePos);
        });
      }
    },
    dateRevert: function dateRevert() {
      this.inputValue = this.datePanelLabel;
    },
    // 日期
    // 弹出面板
    updateZindex: function updateZindex() {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex();
      }
    },
    showPanel: function showPanel() {
      var _this6 = this;

      var disabled = this.disabled,
          visiblePanel = this.visiblePanel,
          isDatePicker = this.isDatePicker;

      if (!disabled && !visiblePanel) {
        clearTimeout(this.hidePanelTimeout);
        this.isActivated = true;
        this.animatVisible = true;

        if (isDatePicker) {
          this.dateOpenPanel();
        }

        setTimeout(function () {
          _this6.visiblePanel = true;
        }, 10);
        this.updateZindex();
        this.updatePlacement();
      }
    },
    hidePanel: function hidePanel() {
      var _this7 = this;

      this.visiblePanel = false;
      this.hidePanelTimeout = setTimeout(function () {
        _this7.animatVisible = false;
      }, 350);
    },
    updatePlacement: function updatePlacement() {
      var _this8 = this;

      return this.$nextTick().then(function () {
        var $refs = _this8.$refs,
            transfer = _this8.transfer,
            placement = _this8.placement,
            panelIndex = _this8.panelIndex;
        var targetElem = $refs.input;
        var panelElem = $refs.panel;

        if (targetElem && panelElem) {
          var targetHeight = targetElem.offsetHeight;
          var targetWidth = targetElem.offsetWidth;
          var panelHeight = panelElem.offsetHeight;
          var panelWidth = panelElem.offsetWidth;
          var marginSize = 5;
          var panelStyle = {
            zIndex: panelIndex
          };

          var _DomTools$getAbsolute = DomTools.getAbsolutePos(targetElem),
              boundingTop = _DomTools$getAbsolute.boundingTop,
              boundingLeft = _DomTools$getAbsolute.boundingLeft,
              visibleHeight = _DomTools$getAbsolute.visibleHeight,
              visibleWidth = _DomTools$getAbsolute.visibleWidth;

          var panelPlacement = 'bottom';

          if (transfer) {
            var left = boundingLeft;
            var top = boundingTop + targetHeight;

            if (placement === 'top') {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              } // 如果上面不够放，则向下（优先）


              if (top < marginSize) {
                panelPlacement = 'bottom';
                top = boundingTop + targetHeight;
              }
            } // 如果溢出右边


            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            } // 如果溢出左边


            if (left < marginSize) {
              left = marginSize;
            }

            Object.assign(panelStyle, {
              left: "".concat(left, "px"),
              top: "".concat(top, "px"),
              minWidth: "".concat(targetWidth, "px")
            });
          } else {
            if (placement === 'top') {
              panelPlacement = 'top';
              panelStyle.bottom = "".concat(targetHeight, "px");
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top';
                  panelStyle.bottom = "".concat(targetHeight, "px");
                }
              }
            }
          }

          _this8.panelStyle = panelStyle;
          _this8.panelPlacement = panelPlacement;
          return _this8.$nextTick();
        }
      });
    },
    // 弹出面板
    // 全局事件
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel,
          isActivated = this.isActivated;

      if (!disabled && isActivated) {
        this.isActivated = DomTools.getEventTargetNode(evnt, $el).flag || DomTools.getEventTargetNode(evnt, $refs.panel).flag;

        if (!this.isActivated) {
          // 如果是日期类型
          if (this.isDatePicker) {
            if (visiblePanel) {
              this.hidePanel();
              this.afterCheckValue();
            }
          } else {
            this.afterCheckValue();
          }
        }
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var isDatePicker = this.isDatePicker,
          visiblePanel = this.visiblePanel,
          clearable = this.clearable,
          disabled = this.disabled;

      if (!disabled) {
        var keyCode = evnt.keyCode;
        var isTab = keyCode === 9;
        var isDel = keyCode === 46;
        var isEsc = keyCode === 27;
        var isEnter = keyCode === 13;
        var isLeftArrow = keyCode === 37;
        var isUpArrow = keyCode === 38;
        var isRightArrow = keyCode === 39;
        var isDwArrow = keyCode === 40;
        var isPgUp = keyCode === 33;
        var isPgDn = keyCode === 34;
        var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
        var isActivated = this.isActivated;

        if (isTab) {
          if (isActivated) {
            this.afterCheckValue();
          }

          isActivated = false;
          this.isActivated = isActivated;
        } else if (operArrow) {
          if (isDatePicker) {
            if (isActivated) {
              if (visiblePanel) {
                this.dateOffsetEvent(evnt);
              } else if (isUpArrow || isDwArrow) {
                evnt.preventDefault();
                this.showPanel();
              }
            }
          }
        } else if (isEnter) {
          if (isDatePicker) {
            if (visiblePanel) {
              if (this.datePanelValue) {
                this.dateSelectItem(this.datePanelValue);
              } else {
                this.hidePanel();
              }
            } else if (isActivated) {
              this.showPanel();
            }
          }
        } else if (isPgUp || isPgDn) {
          if (isDatePicker) {
            if (isActivated) {
              this.datePgOffsetEvent(evnt);
            }
          }
        }

        if (isTab || isEsc) {
          if (visiblePanel) {
            this.hidePanel();
          }
        } else if (isDel && clearable) {
          if (isActivated) {
            this.clearValueEvent(evnt, null);
          }
        }
      }
    },
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        if (visiblePanel) {
          if (DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
            this.updatePlacement();
          } else {
            this.hidePanel();
            this.afterCheckValue();
          }
        }
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent() {
      var isActivated = this.isActivated,
          visiblePanel = this.visiblePanel;

      if (visiblePanel) {
        this.hidePanel();
        this.afterCheckValue();
      } else if (isActivated) {
        this.afterCheckValue();
      }
    } // 全局事件

  }
});
// CONCATENATED MODULE: ./packages/input/index.js



input.install = function (Vue) {
  Vue.component(input.name, input);
};

var Input = input;
/* harmony default export */ var packages_input = (input);
// CONCATENATED MODULE: ./packages/textarea/src/textarea.js












var autoTxtElem = document.createElement('div');
/* harmony default export */ var src_textarea = ({
  name: 'VxeTextarea',
  mixins: [size],
  props: {
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    rows: {
      type: [String, Number],
      default: 2
    },
    showWordCount: Boolean,
    autosize: [Boolean, Object],
    form: String,
    resize: {
      type: String,
      default: function _default() {
        return conf.textarea.resize;
      }
    },
    size: {
      type: String,
      default: function _default() {
        return conf.textarea.size || conf.size;
      }
    }
  },
  computed: {
    inputCount: function inputCount() {
      return ctor_amd_xe_utils_default.a.getSize(this.value);
    },
    isCountError: function isCountError() {
      return this.maxlength && this.inputCount > ctor_amd_xe_utils_default.a.toNumber(this.maxlength);
    },
    defaultEvents: function defaultEvents() {
      var _this = this;

      var evnts = {};
      ctor_amd_xe_utils_default.a.each(this.$listeners, function (cb, name) {
        if (['change'].indexOf(name) === -1) {
          evnts[name] = _this.triggerEvent;
        }
      });
      evnts.input = this.inputEvent;
      return evnts;
    },
    sizeOpts: function sizeOpts() {
      return Object.assign({
        minRows: 1,
        maxRows: 10
      }, conf.textarea.autosize, this.autosize);
    }
  },
  watch: {
    value: function value() {
      this.updateAutoTxt();
    }
  },
  mounted: function mounted() {
    if (this.value) {
      this.updateAutoTxt();
      this.handleResize();
    }
  },
  render: function render(h) {
    var _ref;

    var defaultEvents = this.defaultEvents,
        value = this.value,
        vSize = this.vSize,
        name = this.name,
        form = this.form,
        resize = this.resize,
        placeholder = this.placeholder,
        readonly = this.readonly,
        disabled = this.disabled,
        maxlength = this.maxlength,
        autosize = this.autosize,
        showWordCount = this.showWordCount;
    var attrs = {
      name: name,
      form: form,
      placeholder: placeholder,
      maxlength: maxlength,
      readonly: readonly,
      disabled: disabled
    };

    if (placeholder) {
      attrs.placeholder = UtilTools.getFuncText(placeholder);
    }

    return h('div', {
      class: ['vxe-textarea', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--autosize', autosize), _defineProperty(_ref, 'is--disabled', disabled), _ref)]
    }, [h('textarea', {
      ref: 'textarea',
      class: 'vxe-textarea--inner',
      domProps: {
        value: value
      },
      attrs: attrs,
      style: resize ? {
        resize: resize
      } : null,
      on: defaultEvents
    }), showWordCount ? h('span', {
      class: ['vxe-textarea--count', {
        'is--error': this.isCountError
      }]
    }, "".concat(this.inputCount).concat(maxlength ? "/".concat(maxlength) : '')) : null]);
  },
  methods: {
    focus: function focus() {
      this.$refs.textarea.focus();
      return this.$nextTick();
    },
    blur: function blur() {
      this.$refs.textarea.blur();
      return this.$nextTick();
    },
    triggerEvent: function triggerEvent(evnt) {
      var value = this.value;
      this.$emit(evnt.type, {
        value: value,
        $event: evnt
      });
    },
    emitUpdate: function emitUpdate(value, evnt) {
      if (this.value !== value) {
        this.$emit('input', value);
        this.$emit('change', {
          value: value,
          $event: evnt
        });
      }
    },
    inputEvent: function inputEvent(evnt) {
      this.emitUpdate(evnt.target.value, evnt);
      this.handleResize();
    },
    updateAutoTxt: function updateAutoTxt() {
      var $refs = this.$refs,
          value = this.value,
          size = this.size,
          autosize = this.autosize;

      if (autosize) {
        if (!autoTxtElem.parentNode) {
          document.body.appendChild(autoTxtElem);
        }

        var textElem = $refs.textarea;
        var textStyle = getComputedStyle(textElem);
        autoTxtElem.className = ['vxe-textarea--autosize', size ? "size--".concat(size) : ''].join(' ');
        autoTxtElem.style.width = "".concat(textElem.clientWidth, "px");
        autoTxtElem.style.padding = textStyle.padding;
        autoTxtElem.innerHTML = ('' + (value || '　')).replace(/\n$/, '\n　');
      }
    },
    handleResize: function handleResize() {
      var _this2 = this;

      if (this.autosize) {
        this.$nextTick(function () {
          var $refs = _this2.$refs,
              sizeOpts = _this2.sizeOpts;
          var minRows = sizeOpts.minRows,
              maxRows = sizeOpts.maxRows;
          var textElem = $refs.textarea;
          var sizeHeight = autoTxtElem.clientHeight;
          var textStyle = getComputedStyle(textElem);
          var lineHeight = ctor_amd_xe_utils_default.a.toNumber(textStyle.lineHeight);
          var paddingTop = ctor_amd_xe_utils_default.a.toNumber(textStyle.paddingTop);
          var paddingBottom = ctor_amd_xe_utils_default.a.toNumber(textStyle.paddingBottom);
          var borderTopWidth = ctor_amd_xe_utils_default.a.toNumber(textStyle.borderTopWidth);
          var borderBottomWidth = ctor_amd_xe_utils_default.a.toNumber(textStyle.borderBottomWidth);
          var intervalHeight = paddingTop + paddingBottom + borderTopWidth + borderBottomWidth;
          var rowNum = (sizeHeight - intervalHeight) / lineHeight;
          var textRows = rowNum && /[0-9]/.test(rowNum) ? rowNum : Math.floor(rowNum) + 1;
          var vaildRows = textRows;

          if (textRows < minRows) {
            vaildRows = minRows;
          } else if (textRows > maxRows) {
            vaildRows = maxRows;
          }

          textElem.style.height = "".concat(vaildRows * lineHeight + intervalHeight, "px");
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/textarea/index.js



src_textarea.install = function (Vue) {
  Vue.component(src_textarea.name, src_textarea);
};

var Textarea = src_textarea;
/* harmony default export */ var packages_textarea = (src_textarea);
// CONCATENATED MODULE: ./packages/button/src/button.js









/* harmony default export */ var button_src_button = ({
  name: 'VxeButton',
  mixins: [size],
  props: {
    type: String,
    size: {
      type: String,
      default: function _default() {
        return conf.button.size || conf.size;
      }
    },
    name: [String, Number],
    content: String,
    placement: String,
    status: String,
    icon: String,
    round: Boolean,
    circle: Boolean,
    disabled: Boolean,
    loading: Boolean,
    destroyOnClose: Boolean,
    transfer: {
      type: Boolean,
      default: function _default() {
        return conf.button.transfer;
      }
    }
  },
  data: function data() {
    return {
      inited: false,
      showPanel: false,
      animatVisible: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null
    };
  },
  computed: {
    isText: function isText() {
      return this.type === 'text';
    },
    isFormBtn: function isFormBtn() {
      return ['submit', 'reset', 'button'].indexOf(this.type) > -1;
    },
    btnType: function btnType() {
      return this.isText ? this.type : 'button';
    },
    btnStatus: function btnStatus() {
      return this.status;
    }
  },
  created: function created() {
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'mousewheel');
  },
  render: function render(h) {
    var _ref,
        _ref2,
        _this = this,
        _ref3,
        _ref4;

    var $scopedSlots = this.$scopedSlots,
        $listeners = this.$listeners,
        inited = this.inited,
        type = this.type,
        destroyOnClose = this.destroyOnClose,
        isFormBtn = this.isFormBtn,
        btnStatus = this.btnStatus,
        btnType = this.btnType,
        vSize = this.vSize,
        name = this.name,
        disabled = this.disabled,
        loading = this.loading,
        showPanel = this.showPanel,
        animatVisible = this.animatVisible,
        panelPlacement = this.panelPlacement;
    var downsSlot = $scopedSlots.dropdowns;
    return downsSlot ? h('div', {
      class: ['vxe-button--dropdown', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--active', showPanel), _ref)]
    }, [h('button', {
      ref: 'btn',
      class: ['vxe-button', "type--".concat(btnType), (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, "theme--".concat(btnStatus), btnStatus), _defineProperty(_ref2, 'is--round', this.round), _defineProperty(_ref2, 'is--circle', this.circle), _defineProperty(_ref2, 'is--disabled', disabled || loading), _defineProperty(_ref2, 'is--loading', loading), _ref2)],
      attrs: {
        name: name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading
      },
      on: Object.assign({
        mouseenter: this.mouseenterEvent,
        mouseleave: this.mouseleaveEvent
      }, ctor_amd_xe_utils_default.a.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, {
            $event: evnt
          });
        };
      }))
    }, this.renderContent(h).concat([h('i', {
      class: "vxe-button--dropdown-arrow ".concat(conf.icon.BUTTON_DROPDOWN)
    })])), h('div', {
      ref: 'panel',
      class: ['vxe-button--dropdown-panel', (_ref3 = {}, _defineProperty(_ref3, "size--".concat(vSize), vSize), _defineProperty(_ref3, 'animat--leave', animatVisible), _defineProperty(_ref3, 'animat--enter', showPanel), _ref3)],
      attrs: {
        'data-placement': panelPlacement
      },
      style: this.panelStyle
    }, inited ? [h('div', {
      class: 'vxe-button--dropdown-wrapper',
      on: {
        click: this.clickDropdownEvent,
        mouseenter: this.mouseenterEvent,
        mouseleave: this.mouseleaveEvent
      }
    }, destroyOnClose && !showPanel ? [] : downsSlot.call(this, {}, h))] : null)]) : h('button', {
      ref: 'btn',
      class: ['vxe-button', "type--".concat(btnType), (_ref4 = {}, _defineProperty(_ref4, "size--".concat(vSize), vSize), _defineProperty(_ref4, "theme--".concat(btnStatus), btnStatus), _defineProperty(_ref4, 'is--round', this.round), _defineProperty(_ref4, 'is--circle', this.circle), _defineProperty(_ref4, 'is--disabled', disabled || loading), _defineProperty(_ref4, 'is--loading', loading), _ref4)],
      attrs: {
        name: name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading
      },
      on: ctor_amd_xe_utils_default.a.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, {
            $event: evnt
          });
        };
      })
    }, this.renderContent(h));
  },
  methods: {
    renderContent: function renderContent(h) {
      var $scopedSlots = this.$scopedSlots,
          content = this.content,
          icon = this.icon,
          loading = this.loading;
      var contents = [];

      if (loading) {
        contents.push(h('i', {
          class: ['vxe-button--loading-icon', conf.icon.BUTTON_LOADING]
        }));
      } else if (icon) {
        contents.push(h('i', {
          class: ['vxe-button--icon', icon]
        }));
      }

      if ($scopedSlots.default) {
        contents.push(h('span', {
          class: 'vxe-button--content'
        }, $scopedSlots.default.call(this)));
      } else if (content) {
        contents.push(h('span', {
          class: 'vxe-button--content'
        }, [UtilTools.getFuncText(content)]));
      }

      return contents;
    },
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      if (this.showPanel && !DomTools.getEventTargetNode(evnt, this.$refs.panel).flag) {
        this.updatePlacement();
      }
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex();
      }
    },
    clickDropdownEvent: function clickDropdownEvent(evnt) {
      var _this2 = this;

      var dropdownElem = evnt.currentTarget;
      var panelElem = this.$refs.panel;

      var _DomTools$getEventTar = DomTools.getEventTargetNode(evnt, dropdownElem, 'vxe-button'),
          flag = _DomTools$getEventTar.flag,
          targetElem = _DomTools$getEventTar.targetElem;

      if (flag) {
        panelElem.dataset.active = 'N';
        this.showPanel = false;
        setTimeout(function () {
          if (panelElem.dataset.active !== 'Y') {
            _this2.animatVisible = false;
          }
        }, 350);
        this.$emit('dropdown-click', {
          name: targetElem.getAttribute('name'),
          $event: evnt
        });
      }
    },
    mouseenterEvent: function mouseenterEvent() {
      var _this3 = this;

      var panelElem = this.$refs.panel;

      if (!this.inited) {
        this.inited = true;

        if (this.transfer) {
          document.body.appendChild(panelElem);
        }
      }

      panelElem.dataset.active = 'Y';
      this.animatVisible = true;
      setTimeout(function () {
        if (panelElem.dataset.active === 'Y') {
          _this3.showPanel = true;

          _this3.updateZindex();

          _this3.updatePlacement();
        }
      }, 10);
    },
    mouseleaveEvent: function mouseleaveEvent() {
      var _this4 = this;

      var panelElem = this.$refs.panel;
      panelElem.dataset.active = 'N';
      setTimeout(function () {
        if (panelElem.dataset.active !== 'Y') {
          _this4.showPanel = false;
          setTimeout(function () {
            if (panelElem.dataset.active !== 'Y') {
              _this4.animatVisible = false;
            }
          }, 350);
        }
      }, 100);
    },
    updatePlacement: function updatePlacement() {
      var _this5 = this;

      return this.$nextTick().then(function () {
        var $refs = _this5.$refs,
            transfer = _this5.transfer,
            placement = _this5.placement,
            panelIndex = _this5.panelIndex;
        var targetElem = $refs.btn;
        var panelElem = $refs.panel;

        if (panelElem && targetElem) {
          var targetHeight = targetElem.offsetHeight;
          var targetWidth = targetElem.offsetWidth;
          var panelHeight = panelElem.offsetHeight;
          var panelWidth = panelElem.offsetWidth;
          var marginSize = 5;
          var panelStyle = {
            zIndex: panelIndex
          };

          var _DomTools$getAbsolute = DomTools.getAbsolutePos(targetElem),
              boundingTop = _DomTools$getAbsolute.boundingTop,
              boundingLeft = _DomTools$getAbsolute.boundingLeft,
              visibleHeight = _DomTools$getAbsolute.visibleHeight,
              visibleWidth = _DomTools$getAbsolute.visibleWidth;

          var panelPlacement = 'bottom';

          if (transfer) {
            var left = boundingLeft;
            var top = boundingTop + targetHeight;

            if (placement === 'top') {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              } // 如果上面不够放，则向下（优先）


              if (top < marginSize) {
                panelPlacement = 'bottom';
                top = boundingTop + targetHeight;
              }
            } // 如果溢出右边


            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            } // 如果溢出左边


            if (left < marginSize) {
              left = marginSize;
            }

            Object.assign(panelStyle, {
              left: "".concat(left, "px"),
              top: "".concat(top, "px"),
              minWidth: "".concat(targetWidth, "px")
            });
          } else {
            if (placement === 'top') {
              panelPlacement = 'top';
              panelStyle.bottom = "".concat(targetHeight, "px");
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top';
                  panelStyle.bottom = "".concat(targetHeight, "px");
                }
              }
            }
          }

          _this5.panelStyle = panelStyle;
          _this5.panelPlacement = panelPlacement;
          return _this5.$nextTick();
        }
      });
    },
    focus: function focus() {
      this.$el.focus();
      return this.$nextTick();
    },
    blur: function blur() {
      this.$el.blur();
      return this.$nextTick();
    }
  }
});
// CONCATENATED MODULE: ./packages/button/index.js



button_src_button.install = function (Vue) {
  Vue.component(button_src_button.name, button_src_button);
};

var Button = button_src_button;
/* harmony default export */ var packages_button = (button_src_button);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js






function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./packages/modal/src/queue.js
var queue = [];
/* harmony default export */ var src_queue = (queue);
// CONCATENATED MODULE: ./packages/modal/src/activities.js
var allActivedModals = [];
/* harmony default export */ var activities = (allActivedModals);
// CONCATENATED MODULE: ./packages/modal/src/modal.js



















var activeModals = [];
/* harmony default export */ var modal = ({
  name: 'VxeModal',
  mixins: [size],
  props: {
    value: Boolean,
    id: String,
    type: {
      type: String,
      default: 'modal'
    },
    loading: {
      type: Boolean,
      default: null
    },
    status: String,
    iconStatus: String,
    className: String,
    top: {
      type: [Number, String],
      default: 15
    },
    position: [String, Object],
    title: String,
    duration: {
      type: [Number, String],
      default: function _default() {
        return conf.modal.duration;
      }
    },
    message: [String, Function],
    cancelButtonText: String,
    confirmButtonText: String,
    lockView: {
      type: Boolean,
      default: function _default() {
        return conf.modal.lockView;
      }
    },
    lockScroll: Boolean,
    mask: {
      type: Boolean,
      default: function _default() {
        return conf.modal.mask;
      }
    },
    maskClosable: Boolean,
    escClosable: Boolean,
    resize: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: Boolean,
    dblclickZoom: {
      type: Boolean,
      default: function _default() {
        return conf.modal.dblclickZoom;
      }
    },
    width: [Number, String],
    height: [Number, String],
    minWidth: {
      type: [Number, String],
      default: function _default() {
        return conf.modal.minWidth;
      }
    },
    minHeight: {
      type: [Number, String],
      default: function _default() {
        return conf.modal.minHeight;
      }
    },
    zIndex: Number,
    marginSize: {
      type: [Number, String],
      default: conf.modal.marginSize
    },
    fullscreen: Boolean,
    remember: {
      type: Boolean,
      default: function _default() {
        return conf.modal.remember;
      }
    },
    destroyOnClose: Boolean,
    showTitleOverflow: {
      type: Boolean,
      default: function _default() {
        return conf.modal.showTitleOverflow;
      }
    },
    transfer: {
      type: Boolean,
      default: function _default() {
        return conf.modal.transfer;
      }
    },
    storage: {
      type: Boolean,
      default: function _default() {
        return conf.modal.storage;
      }
    },
    storageKey: {
      type: String,
      default: function _default() {
        return conf.modal.storageKey;
      }
    },
    animat: {
      type: Boolean,
      default: function _default() {
        return conf.modal.animat;
      }
    },
    size: {
      type: String,
      default: function _default() {
        return conf.modal.size || conf.size;
      }
    },
    slots: Object,
    events: Object
  },
  data: function data() {
    return {
      inited: false,
      visible: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: 0,
      zoomLocat: null,
      firstOpen: false
    };
  },
  computed: {
    isMsg: function isMsg() {
      return this.type === 'message';
    }
  },
  watch: {
    width: function width() {
      this.recalculate();
    },
    height: function height() {
      this.recalculate();
    },
    value: function value(visible) {
      this[visible ? 'open' : 'close']();
    }
  },
  created: function created() {
    if (this.storage && !this.id) {
      UtilTools.error('vxe.error.reqProp', ['modal.id']);
    }

    activeModals.push(this);
  },
  mounted: function mounted() {
    var $listeners = this.$listeners,
        _this$events = this.events,
        events = _this$events === void 0 ? {} : _this$events;

    if (this.value) {
      this.open();
    }

    this.recalculate();

    if (this.escClosable) {
      GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    } // 触发 inserted 事件


    var type = 'inserted';
    var params = {
      type: type,
      $modal: this,
      $event: {
        type: type
      }
    };

    if ($listeners.inserted) {
      this.$emit('inserted', params);
    } else if (events.inserted) {
      events.inserted.call(this, params);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var _this = this;

    var $el = this.$el;
    GlobalEvent.off(this, 'keydown');
    this.removeMsgQueue();

    if ($el.parentNode === document.body) {
      $el.parentNode.removeChild($el);
    }

    ctor_amd_xe_utils_default.a.remove(activeModals, function ($modal) {
      return $modal === _this;
    });
  },
  render: function render(h) {
    var _ref,
        _this2 = this;

    var $scopedSlots = this.$scopedSlots,
        _this$slots = this.slots,
        slots = _this$slots === void 0 ? {} : _this$slots,
        inited = this.inited,
        vSize = this.vSize,
        className = this.className,
        type = this.type,
        resize = this.resize,
        animat = this.animat,
        loading = this.loading,
        status = this.status,
        iconStatus = this.iconStatus,
        showFooter = this.showFooter,
        zoomLocat = this.zoomLocat,
        modalTop = this.modalTop,
        dblclickZoom = this.dblclickZoom,
        contentVisible = this.contentVisible,
        visible = this.visible,
        title = this.title,
        message = this.message,
        lockScroll = this.lockScroll,
        lockView = this.lockView,
        mask = this.mask,
        isMsg = this.isMsg,
        showTitleOverflow = this.showTitleOverflow,
        destroyOnClose = this.destroyOnClose;
    var defaultSlot = $scopedSlots.default || slots.default;
    var footerSlot = $scopedSlots.footer || slots.footer;
    var headerSlot = $scopedSlots.header || slots.header;
    var titleSlot = $scopedSlots.title || slots.title;
    var headerOns = {
      mousedown: this.mousedownEvent
    };

    if (resize && dblclickZoom && type === 'modal') {
      headerOns.dblclick = this.toggleZoomEvent;
    }

    return h('div', {
      class: ['vxe-modal--wrapper', "type--".concat(type), className || '', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "status--".concat(status), status), _defineProperty(_ref, 'is--animat', animat), _defineProperty(_ref, 'lock--scroll', lockScroll), _defineProperty(_ref, 'lock--view', lockView), _defineProperty(_ref, 'is--mask', mask), _defineProperty(_ref, 'is--maximize', zoomLocat), _defineProperty(_ref, 'is--visible', contentVisible), _defineProperty(_ref, 'is--active', visible), _defineProperty(_ref, 'is--loading', loading), _ref)],
      style: {
        zIndex: this.modalZindex,
        top: modalTop ? "".concat(modalTop, "px") : null
      },
      on: {
        click: this.selfClickEvent
      }
    }, [h('div', {
      class: 'vxe-modal--box',
      on: {
        mousedown: this.boxMousedownEvent
      },
      ref: 'modalBox'
    }, [this.showHeader ? h('div', {
      class: ['vxe-modal--header', !isMsg && showTitleOverflow ? 'is--ellipsis' : ''],
      on: headerOns
    }, headerSlot ? !inited || destroyOnClose && !visible ? [] : headerSlot.call(this, {
      $modal: this
    }, h) : [titleSlot ? titleSlot.call(this, {
      $modal: this
    }, h) : h('span', {
      class: 'vxe-modal--title'
    }, title ? UtilTools.getFuncText(title) : conf.i18n('vxe.alert.title')), resize ? h('i', {
      class: ['vxe-modal--zoom-btn', 'trigger--btn', zoomLocat ? conf.icon.MODAL_ZOOM_OUT : conf.icon.MODAL_ZOOM_IN],
      attrs: {
        title: conf.i18n("vxe.modal.zoom".concat(zoomLocat ? 'Out' : 'In'))
      },
      on: {
        click: this.toggleZoomEvent
      }
    }) : null, h('i', {
      class: ['vxe-modal--close-btn', 'trigger--btn', conf.icon.MODAL_CLOSE],
      attrs: {
        title: conf.i18n('vxe.modal.close')
      },
      on: {
        click: this.closeEvent
      }
    })]) : null, h('div', {
      class: 'vxe-modal--body'
    }, [status ? h('div', {
      class: 'vxe-modal--status-wrapper'
    }, [h('i', {
      class: ['vxe-modal--status-icon', iconStatus || conf.icon["MODAL_".concat(status).toLocaleUpperCase()]]
    })]) : null, h('div', {
      class: 'vxe-modal--content'
    }, defaultSlot ? !inited || destroyOnClose && !visible ? [] : defaultSlot.call(this, {
      $modal: this
    }, h) : UtilTools.getFuncText(message)), !isMsg ? h('div', {
      class: ['vxe-loading', {
        'is--visible': loading
      }]
    }, [h('div', {
      class: 'vxe-loading--spinner'
    })]) : null]), showFooter ? h('div', {
      class: 'vxe-modal--footer'
    }, footerSlot ? !inited || destroyOnClose && !visible ? [] : footerSlot.call(this, {
      $modal: this
    }, h) : [type === 'confirm' ? h('vxe-button', {
      ref: 'cancelBtn',
      on: {
        click: this.cancelEvent
      }
    }, this.cancelButtonText || conf.i18n('vxe.button.cancel')) : null, h('vxe-button', {
      ref: 'confirmBtn',
      props: {
        status: 'primary'
      },
      on: {
        click: this.confirmEvent
      }
    }, this.confirmButtonText || conf.i18n('vxe.button.confirm'))]) : null, !isMsg && resize ? h('span', {
      class: 'vxe-modal--resize'
    }, ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map(function (type) {
      return h('span', {
        class: "".concat(type, "-resize"),
        attrs: {
          'data-type': type
        },
        on: {
          mousedown: _this2.dragEvent
        }
      });
    })) : null])]);
  },
  methods: {
    recalculate: function recalculate() {
      var width = this.width,
          height = this.height;
      var modalBoxElem = this.getBox();
      modalBoxElem.style.width = width ? isNaN(width) ? width : "".concat(width, "px") : null;
      modalBoxElem.style.height = height ? isNaN(height) ? height : "".concat(height, "px") : null;
      return this.$nextTick();
    },
    selfClickEvent: function selfClickEvent(evnt) {
      if (this.maskClosable && evnt.target === this.$el) {
        var type = 'mask';
        this.close(type);
      }
    },
    updateZindex: function updateZindex() {
      var zIndex = this.zIndex,
          modalZindex = this.modalZindex;

      if (zIndex) {
        this.modalZindex = zIndex;
      } else if (modalZindex < UtilTools.getLastZIndex()) {
        this.modalZindex = UtilTools.nextZIndex();
      }
    },
    closeEvent: function closeEvent(evnt) {
      var type = 'close';
      this.$emit(type, {
        type: type,
        $modal: this,
        $event: evnt
      });
      this.close(type);
    },
    confirmEvent: function confirmEvent(evnt) {
      var type = 'confirm';
      this.$emit(type, {
        type: type,
        $modal: this,
        $event: evnt
      });
      this.close(type);
    },
    cancelEvent: function cancelEvent(evnt) {
      var type = 'cancel';
      this.$emit(type, {
        type: type,
        $modal: this,
        $event: evnt
      });
      this.close(type);
    },
    open: function open() {
      var _this3 = this;

      var $refs = this.$refs,
          _this$events2 = this.events,
          events = _this$events2 === void 0 ? {} : _this$events2,
          inited = this.inited,
          duration = this.duration,
          visible = this.visible,
          isMsg = this.isMsg,
          remember = this.remember,
          showFooter = this.showFooter;

      if (!inited) {
        this.inited = true;

        if (this.transfer) {
          document.body.appendChild(this.$el);
        }
      }

      if (!visible) {
        var type = 'show';
        var params = {
          type: type,
          $modal: this,
          $event: {
            type: type
          }
        };

        if (!remember) {
          this.recalculate();
        }

        this.visible = true;
        this.contentVisible = false;
        this.updateZindex();
        activities.push(this);
        this.$emit('activated', params);
        setTimeout(function () {
          _this3.contentVisible = true;

          _this3.$nextTick(function () {
            if (showFooter) {
              var operBtn = $refs.confirmBtn || $refs.cancelBtn;

              if (operBtn) {
                operBtn.focus();
              }
            }

            if (events.show) {
              events.show.call(_this3, params);
            } else {
              _this3.$emit('input', true);

              _this3.$emit('show', params);
            }
          });
        }, 10);

        if (isMsg) {
          this.addMsgQueue();

          if (duration !== -1) {
            setTimeout(this.close, ctor_amd_xe_utils_default.a.toNumber(duration));
          }
        } else {
          this.$nextTick(function () {
            var firstOpen = _this3.firstOpen,
                fullscreen = _this3.fullscreen;

            if (!remember || !firstOpen) {
              _this3.updatePosition().then(function () {
                setTimeout(function () {
                  return _this3.updatePosition();
                }, 20);
              });
            }

            if (!firstOpen) {
              _this3.firstOpen = true;

              if (_this3.hasPosStorage()) {
                _this3.restorePosStorage();
              } else if (fullscreen) {
                _this3.$nextTick(function () {
                  return _this3.maximize();
                });
              }
            }
          });
        }
      }
    },
    addMsgQueue: function addMsgQueue() {
      if (src_queue.indexOf(this) === -1) {
        src_queue.push(this);
      }

      this.updateStyle();
    },
    removeMsgQueue: function removeMsgQueue() {
      var _this4 = this;

      if (src_queue.indexOf(this) > -1) {
        ctor_amd_xe_utils_default.a.remove(src_queue, function (comp) {
          return comp === _this4;
        });
      }

      this.updateStyle();
    },
    updateStyle: function updateStyle() {
      this.$nextTick(function () {
        var offsetTop = 0;
        src_queue.forEach(function (comp) {
          offsetTop += ctor_amd_xe_utils_default.a.toNumber(comp.top);
          comp.modalTop = offsetTop;
          offsetTop += comp.$refs.modalBox.clientHeight;
        });
      });
    },
    updatePosition: function updatePosition() {
      var _this5 = this;

      return this.$nextTick().then(function () {
        var marginSize = _this5.marginSize,
            position = _this5.position;

        var modalBoxElem = _this5.getBox();

        var clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var isPosCenter = position === 'center';

        var _ref2 = isPosCenter ? {
          top: position,
          left: position
        } : Object.assign({}, position),
            top = _ref2.top,
            left = _ref2.left;

        var topCenter = isPosCenter || top === 'center';
        var leftCenter = isPosCenter || left === 'center';
        var posTop = '';
        var posLeft = '';

        if (left && !leftCenter) {
          posLeft = isNaN(left) ? left : "".concat(left, "px");
        } else {
          posLeft = "".concat(Math.max(marginSize, clientVisibleWidth / 2 - modalBoxElem.offsetWidth / 2), "px");
        }

        if (top && !topCenter) {
          posTop = isNaN(top) ? top : "".concat(top, "px");
        } else {
          posTop = "".concat(Math.max(marginSize, clientVisibleHeight / 2 - modalBoxElem.offsetHeight / 2), "px");
        }

        modalBoxElem.style.top = posTop;
        modalBoxElem.style.left = posLeft;
      });
    },
    close: function close(type) {
      var _this6 = this;

      var _this$events3 = this.events,
          events = _this$events3 === void 0 ? {} : _this$events3,
          remember = this.remember,
          visible = this.visible,
          isMsg = this.isMsg;
      var params = {
        type: type,
        $modal: this,
        $event: {
          type: type
        }
      };

      if (visible) {
        if (isMsg) {
          this.removeMsgQueue();
        }

        this.contentVisible = false;

        if (!remember) {
          this.zoomLocat = null;
        }

        this.$emit('deactivated', params);
        ctor_amd_xe_utils_default.a.remove(activities, function (item) {
          return item === _this6;
        });
        setTimeout(function () {
          _this6.visible = false;

          if (events.hide) {
            events.hide.call(_this6, params);
          } else {
            _this6.$emit('input', false);

            _this6.$emit('hide', params);
          }
        }, 200);
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var _this7 = this;

      if (evnt.keyCode === 27) {
        var lastModal = ctor_amd_xe_utils_default.a.max(activities, function (item) {
          return item.modalZindex;
        }); // 多个时，只关掉最上层的窗口

        if (lastModal) {
          setTimeout(function () {
            if (lastModal === _this7 && lastModal.escClosable) {
              _this7.close();
            }
          }, 10);
        }
      }
    },
    getBox: function getBox() {
      return this.$refs.modalBox;
    },
    isMaximized: function isMaximized() {
      return !!this.zoomLocat;
    },
    maximize: function maximize() {
      var _this8 = this;

      return this.$nextTick().then(function () {
        if (_this8.resize && !_this8.zoomLocat) {
          var marginSize = _this8.marginSize;

          var modalBoxElem = _this8.getBox();

          var _DomTools$getDomNode = DomTools.getDomNode(),
              visibleHeight = _DomTools$getDomNode.visibleHeight,
              visibleWidth = _DomTools$getDomNode.visibleWidth;

          _this8.zoomLocat = {
            top: modalBoxElem.offsetTop,
            left: modalBoxElem.offsetLeft,
            width: modalBoxElem.offsetWidth + (modalBoxElem.style.width ? 0 : 1),
            height: modalBoxElem.offsetHeight + (modalBoxElem.style.height ? 0 : 1)
          };
          Object.assign(modalBoxElem.style, {
            top: "".concat(marginSize, "px"),
            left: "".concat(marginSize, "px"),
            width: "".concat(visibleWidth - marginSize * 2, "px"),
            height: "".concat(visibleHeight - marginSize * 2, "px")
          });

          _this8.savePosStorage();
        }
      });
    },
    revert: function revert() {
      var _this9 = this;

      return this.$nextTick().then(function () {
        var zoomLocat = _this9.zoomLocat;

        if (zoomLocat) {
          var modalBoxElem = _this9.getBox();

          _this9.zoomLocat = null;
          Object.assign(modalBoxElem.style, {
            top: "".concat(zoomLocat.top, "px"),
            left: "".concat(zoomLocat.left, "px"),
            width: "".concat(zoomLocat.width, "px"),
            height: "".concat(zoomLocat.height, "px")
          });

          _this9.savePosStorage();
        }
      });
    },
    zoom: function zoom() {
      var _this10 = this;

      return this[this.zoomLocat ? 'revert' : 'maximize']().then(function () {
        return _this10.isMaximized();
      });
    },
    toggleZoomEvent: function toggleZoomEvent(evnt) {
      var _this11 = this;

      var $listeners = this.$listeners,
          zoomLocat = this.zoomLocat,
          _this$events4 = this.events,
          events = _this$events4 === void 0 ? {} : _this$events4;
      var params = {
        type: zoomLocat ? 'revert' : 'max',
        $modal: this,
        $event: evnt
      };
      return this.zoom().then(function () {
        if ($listeners.zoom) {
          _this11.$emit('zoom', params);
        } else if (events.zoom) {
          events.zoom.call(_this11, params);
        }
      });
    },
    getPosition: function getPosition() {
      if (!this.isMsg) {
        var modalBoxElem = this.getBox();

        if (modalBoxElem) {
          return {
            top: modalBoxElem.offsetTop,
            left: modalBoxElem.offsetLeft
          };
        }
      }

      return null;
    },
    setPosition: function setPosition(top, left) {
      if (!this.isMsg) {
        var modalBoxElem = this.getBox();

        if (ctor_amd_xe_utils_default.a.isNumber(top)) {
          modalBoxElem.style.top = "".concat(top, "px");
        }

        if (ctor_amd_xe_utils_default.a.isNumber(left)) {
          modalBoxElem.style.left = "".concat(left, "px");
        }
      }

      return this.$nextTick();
    },
    boxMousedownEvent: function boxMousedownEvent() {
      var modalZindex = this.modalZindex;

      if (activeModals.some(function (_vm) {
        return _vm.visible && _vm.modalZindex > modalZindex;
      })) {
        this.updateZindex();
      }
    },
    mousedownEvent: function mousedownEvent(evnt) {
      var _this12 = this;

      var remember = this.remember,
          storage = this.storage,
          marginSize = this.marginSize,
          zoomLocat = this.zoomLocat;
      var modalBoxElem = this.getBox();

      if (!zoomLocat && evnt.button === 0 && !DomTools.getEventTargetNode(evnt, modalBoxElem, 'trigger--btn').flag) {
        evnt.preventDefault();
        var domMousemove = document.onmousemove;
        var domMouseup = document.onmouseup;
        var disX = evnt.clientX - modalBoxElem.offsetLeft;
        var disY = evnt.clientY - modalBoxElem.offsetTop;

        var _DomTools$getDomNode2 = DomTools.getDomNode(),
            visibleHeight = _DomTools$getDomNode2.visibleHeight,
            visibleWidth = _DomTools$getDomNode2.visibleWidth;

        document.onmousemove = function (evnt) {
          evnt.preventDefault();
          var offsetWidth = modalBoxElem.offsetWidth;
          var offsetHeight = modalBoxElem.offsetHeight;
          var minX = marginSize;
          var maxX = visibleWidth - offsetWidth - marginSize - 1;
          var minY = marginSize;
          var maxY = visibleHeight - offsetHeight - marginSize - 1;
          var left = evnt.clientX - disX;
          var top = evnt.clientY - disY;

          if (left > maxX) {
            left = maxX;
          }

          if (left < minX) {
            left = minX;
          }

          if (top > maxY) {
            top = maxY;
          }

          if (top < minY) {
            top = minY;
          }

          modalBoxElem.style.left = "".concat(left, "px");
          modalBoxElem.style.top = "".concat(top, "px");
        };

        document.onmouseup = function () {
          document.onmousemove = domMousemove;
          document.onmouseup = domMouseup;

          if (remember && storage) {
            _this12.$nextTick(function () {
              _this12.savePosStorage();
            });
          }
        };
      }
    },
    dragEvent: function dragEvent(evnt) {
      var _this13 = this;

      evnt.preventDefault();
      var $listeners = this.$listeners,
          marginSize = this.marginSize,
          _this$events5 = this.events,
          events = _this$events5 === void 0 ? {} : _this$events5,
          remember = this.remember,
          storage = this.storage;

      var _DomTools$getDomNode3 = DomTools.getDomNode(),
          visibleHeight = _DomTools$getDomNode3.visibleHeight,
          visibleWidth = _DomTools$getDomNode3.visibleWidth;

      var type = evnt.target.dataset.type;
      var minWidth = ctor_amd_xe_utils_default.a.toNumber(this.minWidth);
      var minHeight = ctor_amd_xe_utils_default.a.toNumber(this.minHeight);
      var maxWidth = visibleWidth;
      var maxHeight = visibleHeight;
      var modalBoxElem = this.getBox();
      var domMousemove = document.onmousemove;
      var domMouseup = document.onmouseup;
      var clientWidth = modalBoxElem.clientWidth;
      var clientHeight = modalBoxElem.clientHeight;
      var disX = evnt.clientX;
      var disY = evnt.clientY;
      var offsetTop = modalBoxElem.offsetTop;
      var offsetLeft = modalBoxElem.offsetLeft;
      var params = {
        type: 'resize',
        $modal: this
      };

      document.onmousemove = function (evnt) {
        evnt.preventDefault();
        var dragLeft;
        var dragTop;
        var width;
        var height;

        switch (type) {
          case 'wl':
            dragLeft = disX - evnt.clientX;
            width = dragLeft + clientWidth;

            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
                modalBoxElem.style.left = "".concat(offsetLeft - dragLeft, "px");
              }
            }

            break;

          case 'swst':
            dragLeft = disX - evnt.clientX;
            dragTop = disY - evnt.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;

            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
                modalBoxElem.style.left = "".concat(offsetLeft - dragLeft, "px");
              }
            }

            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
                modalBoxElem.style.top = "".concat(offsetTop - dragTop, "px");
              }
            }

            break;

          case 'swlb':
            dragLeft = disX - evnt.clientX;
            dragTop = evnt.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;

            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
                modalBoxElem.style.left = "".concat(offsetLeft - dragLeft, "px");
              }
            }

            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
              }
            }

            break;

          case 'st':
            dragTop = disY - evnt.clientY;
            height = clientHeight + dragTop;

            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
                modalBoxElem.style.top = "".concat(offsetTop - dragTop, "px");
              }
            }

            break;

          case 'wr':
            dragLeft = evnt.clientX - disX;
            width = dragLeft + clientWidth;

            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
              }
            }

            break;

          case 'sest':
            dragLeft = evnt.clientX - disX;
            dragTop = disY - evnt.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;

            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
              }
            }

            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
                modalBoxElem.style.top = "".concat(offsetTop - dragTop, "px");
              }
            }

            break;

          case 'selb':
            dragLeft = evnt.clientX - disX;
            dragTop = evnt.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;

            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
              }
            }

            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
              }
            }

            break;

          case 'sb':
            dragTop = evnt.clientY - disY;
            height = dragTop + clientHeight;

            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
              }
            }

            break;
        }

        modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + ' is--drag';

        if (remember && storage) {
          _this13.savePosStorage();
        }

        if ($listeners.zoom) {
          _this13.$emit('zoom', params);
        } else if (events.zoom) {
          events.zoom.call(_this13, params);
        }
      };

      document.onmouseup = function () {
        _this13.zoomLocat = null;
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        setTimeout(function () {
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '');
        }, 50);
      };
    },
    getStorageMap: function getStorageMap(key) {
      var version = conf.version;
      var rest = ctor_amd_xe_utils_default.a.toStringJSON(localStorage.getItem(key));
      return rest && rest._v === version ? rest : {
        _v: version
      };
    },
    hasPosStorage: function hasPosStorage() {
      var id = this.id,
          remember = this.remember,
          storage = this.storage,
          storageKey = this.storageKey;
      return !!(remember && storage && this.getStorageMap(storageKey)[id]);
    },
    restorePosStorage: function restorePosStorage() {
      var id = this.id,
          remember = this.remember,
          storage = this.storage,
          storageKey = this.storageKey;

      if (remember && storage) {
        var posStorage = this.getStorageMap(storageKey)[id];

        if (posStorage) {
          var modalBoxElem = this.getBox();

          var _posStorage$split = posStorage.split(','),
              _posStorage$split2 = _slicedToArray(_posStorage$split, 8),
              left = _posStorage$split2[0],
              top = _posStorage$split2[1],
              width = _posStorage$split2[2],
              height = _posStorage$split2[3],
              zoomLeft = _posStorage$split2[4],
              zoomTop = _posStorage$split2[5],
              zoomWidth = _posStorage$split2[6],
              zoomHeight = _posStorage$split2[7];

          if (left) {
            modalBoxElem.style.left = "".concat(left, "px");
          }

          if (top) {
            modalBoxElem.style.top = "".concat(top, "px");
          }

          if (width) {
            modalBoxElem.style.width = "".concat(width, "px");
          }

          if (height) {
            modalBoxElem.style.height = "".concat(height, "px");
          }

          if (zoomLeft && zoomTop) {
            this.zoomLocat = {
              left: zoomLeft,
              top: zoomTop,
              width: zoomWidth,
              height: zoomHeight
            };
          }
        }
      }
    },
    savePosStorage: function savePosStorage() {
      var id = this.id,
          remember = this.remember,
          storage = this.storage,
          storageKey = this.storageKey,
          zoomLocat = this.zoomLocat;

      if (remember && storage) {
        var modalBoxElem = this.getBox();
        var posStorageMap = this.getStorageMap(storageKey);
        posStorageMap[id] = [modalBoxElem.style.left, modalBoxElem.style.top, modalBoxElem.style.width, modalBoxElem.style.height].concat(zoomLocat ? [zoomLocat.left, zoomLocat.top, zoomLocat.width, zoomLocat.height] : []).map(function (val) {
          return val ? ctor_amd_xe_utils_default.a.toNumber(val) : '';
        }).join(',');
        localStorage.setItem(storageKey, ctor_amd_xe_utils_default.a.toJSONString(posStorageMap));
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/modal/index.js











/* eslint-disable @typescript-eslint/no-use-before-define */

var ModalClass = null;

function openModal(opts) {
  var options = Object.assign({}, opts, {
    transfer: true
  });
  return new Promise(function (resolve) {
    if (options && options.id && activities.some(function (comp) {
      return comp.id === options.id;
    })) {
      resolve('exist');
    } else {
      var events = options.events || {};
      options.events = Object.assign({}, events, {
        hide: function hide(params) {
          if (events.hide) {
            events.hide.call(this, params);
          }

          setTimeout(function () {
            return $modal.$destroy();
          }, $modal.isMsg ? 500 : 100);
          resolve(params.type);
        }
      });
      var $modal = new ModalClass({
        el: document.createElement('div'),
        propsData: options
      });
      setTimeout(function () {
        if ($modal.isDestroy) {
          $modal.close();
        } else {
          $modal.open();
        }
      });
    }
  });
}
/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */


function closeModal(id) {
  var modals = arguments.length ? [getModal(id)] : activities;
  modals.forEach(function ($modal) {
    if ($modal) {
      $modal.isDestroy = true;
      $modal.close('close');
    }
  });
  return Promise.resolve();
}

function getModal(id) {
  return ctor_amd_xe_utils_default.a.find(activities, function ($modal) {
    return $modal.id === id;
  });
}

var ModalController = {
  get: getModal,
  close: closeModal,
  open: openModal
};
var shortcutTypes = ['alert', 'confirm', 'message'];
shortcutTypes.forEach(function (type, index) {
  var defOpts = index === 2 ? {
    mask: false,
    lockView: false,
    showHeader: false
  } : {
    showFooter: true
  };
  defOpts.type = type;
  defOpts.dblclickZoom = false;

  if (index === 1) {
    defOpts.status = 'question';
  }

  ModalController[type] = function (message, title, options) {
    var opts;

    if (ctor_amd_xe_utils_default.a.isObject(message)) {
      opts = message;
    } else {
      if (title) {
        opts = index === 2 ? {
          status: title
        } : {
          title: title
        };
      }
    }

    return openModal(Object.assign({
      message: ctor_amd_xe_utils_default.a.toString(message),
      type: type
    }, defOpts, opts, options));
  };
});

modal.install = function (Vue) {
  v_x_e_table._modal = 1;
  Vue.component(modal.name, modal);
  ModalClass = Vue.extend(modal);
  v_x_e_table.modal = ModalController;

  if (!Vue.prototype.$vxe) {
    Vue.prototype.$vxe = {
      modal: ModalController
    };
  } else {
    Vue.prototype.$vxe.modal = ModalController;
  }
};

var Modal = modal;
/* harmony default export */ var packages_modal = (modal);
// CONCATENATED MODULE: ./packages/tooltip/src/tooltip.js








function updateTipStyle(_vm) {
  var wrapperElem = _vm.$el,
      tipTarget = _vm.tipTarget,
      tipStore = _vm.tipStore;

  var _DomTools$getDomNode = DomTools.getDomNode(),
      scrollTop = _DomTools$getDomNode.scrollTop,
      scrollLeft = _DomTools$getDomNode.scrollLeft,
      visibleWidth = _DomTools$getDomNode.visibleWidth;

  var _DomTools$getAbsolute = DomTools.getAbsolutePos(tipTarget),
      top = _DomTools$getAbsolute.top,
      left = _DomTools$getAbsolute.left;

  var marginSize = 6;
  var offsetHeight = wrapperElem.offsetHeight;
  var offsetWidth = wrapperElem.offsetWidth;
  var tipLeft = left;
  var tipTop = top - offsetHeight - marginSize;
  tipLeft = Math.max(marginSize, left + Math.floor((tipTarget.offsetWidth - offsetWidth) / 2));

  if (tipLeft + offsetWidth + marginSize > scrollLeft + visibleWidth) {
    tipLeft = scrollLeft + visibleWidth - offsetWidth - marginSize;
  }

  if (top - offsetHeight < scrollTop + marginSize) {
    tipStore.placement = 'bottom';
    tipTop = top + tipTarget.offsetHeight + marginSize;
  }

  tipStore.style.top = "".concat(tipTop, "px");
  tipStore.style.left = "".concat(tipLeft, "px");
  tipStore.arrowStyle.left = "".concat(left - tipLeft + tipTarget.offsetWidth / 2, "px");
}

/* harmony default export */ var src_tooltip = ({
  name: 'VxeTooltip',
  mixins: [size],
  props: {
    value: Boolean,
    size: {
      type: String,
      default: function _default() {
        return conf.tooltip.size || conf.size;
      }
    },
    trigger: {
      type: String,
      default: function _default() {
        return conf.tooltip.trigger;
      }
    },
    theme: {
      type: String,
      default: function _default() {
        return conf.tooltip.theme;
      }
    },
    content: [String, Function],
    zIndex: [String, Number],
    isArrow: {
      type: Boolean,
      default: true
    },
    enterable: Boolean,
    leaveDelay: {
      type: Number,
      default: conf.tooltip.leaveDelay
    },
    leaveMethod: Function
  },
  data: function data() {
    return {
      isUpdate: false,
      isHover: false,
      visible: false,
      message: '',
      tipTarget: null,
      tipZindex: 0,
      tipStore: {
        style: {},
        placement: '',
        arrowStyle: null
      }
    };
  },
  watch: {
    content: function content(value) {
      this.message = value;
    },
    value: function value(_value) {
      if (!this.isUpdate) {
        this[_value ? 'show' : 'close']();
      }

      this.isUpdate = false;
    }
  },
  mounted: function mounted() {
    var $el = this.$el,
        trigger = this.trigger,
        content = this.content,
        value = this.value;
    var parentNode = $el.parentNode;
    var target;
    this.message = content;
    this.tipZindex = UtilTools.nextZIndex();
    ctor_amd_xe_utils_default.a.arrayEach($el.children, function (elem, index) {
      if (index > 1) {
        parentNode.insertBefore(elem, $el);

        if (!target) {
          target = elem;
        }
      }
    });
    parentNode.removeChild($el);
    this.target = target;

    if (target) {
      if (trigger === 'hover') {
        target.onmouseleave = this.targetMouseleaveEvent;
        target.onmouseenter = this.targetMouseenterEvent;
      } else if (trigger === 'click') {
        target.onclick = this.clickEvent;
      }
    }

    if (value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy() {
    var $el = this.$el,
        target = this.target,
        trigger = this.trigger;
    var parentNode = $el.parentNode;

    if (parentNode) {
      parentNode.removeChild($el);
    }

    if (target) {
      if (trigger === 'hover') {
        target.onmouseenter = null;
        target.onmouseleave = null;
      } else if (trigger === 'click') {
        target.onclick = null;
      }
    }
  },
  render: function render(h) {
    var _ref;

    var vSize = this.vSize,
        theme = this.theme,
        message = this.message,
        isHover = this.isHover,
        isArrow = this.isArrow,
        visible = this.visible,
        tipStore = this.tipStore,
        enterable = this.enterable;
    var on;

    if (enterable) {
      on = {
        mouseenter: this.wrapperMouseenterEvent,
        mouseleave: this.wrapperMouseleaveEvent
      };
    }

    return h('div', {
      class: ['vxe-table--tooltip-wrapper', "theme--".concat(theme), "placement--".concat(tipStore.placement), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--enterable', enterable), _defineProperty(_ref, 'is--visible', visible), _defineProperty(_ref, 'is--arrow', isArrow), _defineProperty(_ref, 'is--hover', isHover), _ref)],
      style: tipStore.style,
      ref: 'tipWrapper',
      on: on
    }, [h('div', {
      class: 'vxe-table--tooltip-content'
    }, this.$slots.content || message), h('div', {
      class: 'vxe-table--tooltip-arrow',
      style: tipStore.arrowStyle
    })].concat(this.$slots.default));
  },
  methods: {
    show: function show(target, message) {
      return this.toVisible(target || this.target, message);
    },
    close: function close() {
      this.tipTarget = null;
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

        if (this.$listeners.input) {
          this.$emit('input', this.visible);
        }
      }
    },
    updateZindex: function updateZindex() {
      if (this.tipZindex < UtilTools.getLastZIndex()) {
        this.tipZindex = UtilTools.nextZIndex();
      }
    },
    toVisible: function toVisible(target, message) {
      this.targetActive = true;

      if (target) {
        var $el = this.$el,
            tipStore = this.tipStore,
            zIndex = this.zIndex;
        var parentNode = $el.parentNode;

        if (!parentNode) {
          document.body.appendChild($el);
        }

        if (message) {
          this.message = message;
        }

        this.tipTarget = target;
        this.update(true);
        this.updateZindex();
        tipStore.placement = 'top';
        tipStore.style = {
          width: 'auto',
          left: 0,
          top: 0,
          zIndex: zIndex || this.tipZindex
        };
        tipStore.arrowStyle = {
          left: '50%'
        };
        return this.updatePlacement();
      }

      return this.$nextTick();
    },
    updatePlacement: function updatePlacement() {
      var _this = this;

      return this.$nextTick().then(function () {
        var wrapperElem = _this.$el,
            tipTarget = _this.tipTarget;

        if (tipTarget && wrapperElem) {
          updateTipStyle(_this);
          return _this.$nextTick().then(function () {
            return updateTipStyle(_this);
          });
        }
      });
    },
    clickEvent: function clickEvent() {
      this[this.visible ? 'close' : 'show']();
    },
    targetMouseenterEvent: function targetMouseenterEvent() {
      this.show();
    },
    targetMouseleaveEvent: function targetMouseleaveEvent() {
      var _this2 = this;

      var trigger = this.trigger,
          enterable = this.enterable,
          leaveDelay = this.leaveDelay;
      this.targetActive = false;

      if (enterable && trigger === 'hover') {
        setTimeout(function () {
          if (!_this2.isHover) {
            _this2.close();
          }
        }, leaveDelay);
      } else {
        this.close();
      }
    },
    wrapperMouseenterEvent: function wrapperMouseenterEvent() {
      this.isHover = true;
    },
    wrapperMouseleaveEvent: function wrapperMouseleaveEvent(evnt) {
      var _this3 = this;

      var leaveMethod = this.leaveMethod,
          trigger = this.trigger,
          enterable = this.enterable,
          leaveDelay = this.leaveDelay;
      this.isHover = false;

      if (!leaveMethod || leaveMethod({
        $event: evnt
      }) !== false) {
        if (enterable && trigger === 'hover') {
          setTimeout(function () {
            if (!_this3.targetActive) {
              _this3.close();
            }
          }, leaveDelay);
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/tooltip/index.js




src_tooltip.install = function (Vue) {
  v_x_e_table._tooltip = 1;
  Vue.component(src_tooltip.name, src_tooltip);
};

var Tooltip = src_tooltip;
/* harmony default export */ var packages_tooltip = (src_tooltip);
// CONCATENATED MODULE: ./packages/form/src/util.js






var util_ItemConfig = /*#__PURE__*/function () {
  function ItemConfig($xeform, _vm) {
    _classCallCheck(this, ItemConfig);

    Object.assign(this, {
      id: ctor_amd_xe_utils_default.a.uniqueId('item_'),
      title: _vm.title,
      field: _vm.field,
      span: _vm.span,
      align: _vm.align,
      titleAlign: _vm.titleAlign,
      titleWidth: _vm.titleWidth,
      titlePrefix: _vm.titlePrefix,
      titleSuffix: _vm.titleSuffix,
      resetValue: _vm.resetValue,
      visible: _vm.visible,
      visibleMethod: _vm.visibleMethod,
      folding: _vm.folding,
      collapseNode: _vm.collapseNode,
      itemRender: _vm.itemRender,
      // 渲染属性
      showError: false,
      errRule: null,
      slots: _vm.slots
    });
  }

  _createClass(ItemConfig, [{
    key: "update",
    value: function update(name, value) {
      this[name] = value;
    }
  }]);

  return ItemConfig;
}();

function isItem(option) {
  return option instanceof util_ItemConfig;
}
function getItemConfig($xeform, _vm, options) {
  return isItem(_vm) ? _vm : new util_ItemConfig($xeform, _vm, options);
}
function createItem($xeform, _vm) {
  return getItemConfig($xeform, _vm);
}
function destroyItem(_vm) {
  var $xeform = _vm.$xeform,
      itemConfig = _vm.itemConfig;
  var matchObj = ctor_amd_xe_utils_default.a.findTree($xeform.staticItems, function (option) {
    return option === itemConfig;
  });

  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
}
function assemItem(_vm) {
  var $el = _vm.$el,
      $xeform = _vm.$xeform,
      itemConfig = _vm.itemConfig;
  itemConfig.slots = _vm.$scopedSlots;
  $xeform.staticItems.splice([].indexOf.call($xeform.$refs.hideItem.children, $el), 0, itemConfig);
}
// CONCATENATED MODULE: ./packages/form/src/form.js

























var form_Rule = /*#__PURE__*/function () {
  function Rule(rule) {
    _classCallCheck(this, Rule);

    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.min,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    });
  }

  _createClass(Rule, [{
    key: "message",
    get: function get() {
      return UtilTools.getFuncText(this.$options.message);
    }
  }]);

  return Rule;
}();

function getResetValue(value, resetValue) {
  if (ctor_amd_xe_utils_default.a.isArray(value)) {
    resetValue = [];
  }

  return resetValue;
}

function renderPrefixIcon(h, titlePrefix) {
  return h('span', {
    class: 'vxe-form--item-title-prefix'
  }, [h('i', {
    class: titlePrefix.icon || conf.icon.FORM_PREFIX
  })]);
}

function form_renderSuffixIcon(h, titleSuffix) {
  return h('span', {
    class: 'vxe-form--item-title-suffix'
  }, [h('i', {
    class: titleSuffix.icon || conf.icon.FORM_SUFFIX
  })]);
}

function renderTitle(h, _vm, item) {
  var titlePrefix = item.titlePrefix,
      titleSuffix = item.titleSuffix;
  var tss = [];

  if (titlePrefix) {
    tss.push(titlePrefix.message ? h('vxe-tooltip', {
      props: {
        content: UtilTools.getFuncText(titlePrefix.message),
        enterable: titlePrefix.enterable,
        theme: titlePrefix.theme
      }
    }, [renderPrefixIcon(h, titlePrefix)]) : renderPrefixIcon(h, titlePrefix));
  }

  tss.push(h('span', {
    class: 'vxe-form--item-title-label'
  }, UtilTools.getFuncText(item.title)));

  if (titleSuffix) {
    tss.push(titleSuffix.message ? h('vxe-tooltip', {
      props: {
        content: UtilTools.getFuncText(titleSuffix.message),
        enterable: titleSuffix.enterable,
        theme: titleSuffix.theme
      }
    }, [form_renderSuffixIcon(h, titleSuffix)]) : form_renderSuffixIcon(h, titleSuffix));
  }

  return tss;
}

function renderItems(h, _vm) {
  var _e = _vm._e,
      rules = _vm.rules,
      formItems = _vm.formItems,
      data = _vm.data,
      collapseAll = _vm.collapseAll;
  return formItems.map(function (item, index) {
    var slots = item.slots,
        title = item.title,
        folding = item.folding,
        visible = item.visible,
        visibleMethod = item.visibleMethod,
        field = item.field,
        collapseNode = item.collapseNode,
        itemRender = item.itemRender,
        showError = item.showError,
        errRule = item.errRule;
    var compConf = itemRender ? v_x_e_table.renderer.get(itemRender.name) : null;
    var span = item.span || _vm.span;
    var align = item.align || _vm.align;
    var titleAlign = item.titleAlign || _vm.titleAlign;
    var titleWidth = item.titleWidth || _vm.titleWidth;
    var itemVisibleMethod = visibleMethod;
    var params = {
      data: data,
      property: field,
      $form: _vm
    };
    var isRequired;

    if (visible === false) {
      return _e();
    }

    if (!itemVisibleMethod && compConf && compConf.itemVisibleMethod) {
      itemVisibleMethod = compConf.itemVisibleMethod;
    }

    if (rules) {
      var itemRules = rules[field];

      if (itemRules) {
        isRequired = itemRules.some(function (rule) {
          return rule.required;
        });
      }
    }

    return h('div', {
      class: ['vxe-form--item', item.id, span ? "vxe-col--".concat(span, " is--span") : null, {
        'is--title': title,
        'is--required': isRequired,
        'is--hidden': folding && collapseAll,
        'is--active': !itemVisibleMethod || itemVisibleMethod(params),
        'is--error': showError
      }],
      key: index
    }, [h('div', {
      class: 'vxe-form--item-inner'
    }, [title ? h('div', {
      class: ['vxe-form--item-title', titleAlign ? "align--".concat(titleAlign) : null],
      style: titleWidth ? {
        width: isNaN(titleWidth) ? titleWidth : "".concat(titleWidth, "px")
      } : null
    }, renderTitle(h, _vm, item)) : null, h('div', {
      class: ['vxe-form--item-content', align ? "align--".concat(align) : null]
    }, (compConf && compConf.renderItem ? compConf.renderItem.call(_vm, h, itemRender, params) : slots && slots.default ? slots.default.call(_vm, params, h) : []).concat([collapseNode ? h('div', {
      class: 'vxe-form--item-trigger-node',
      on: {
        click: _vm.toggleCollapseEvent
      }
    }, [h('span', {
      class: 'vxe-form--item-trigger-text'
    }, collapseAll ? conf.i18n('vxe.form.unfolding') : conf.i18n('vxe.form.folding')), h('i', {
      class: ['vxe-form--item-trigger-icon', collapseAll ? conf.icon.FORM_FOLDING : conf.icon.FORM_UNFOLDING]
    })]) : null, errRule ? h('div', {
      class: 'vxe-form--item-valid',
      style: errRule.maxWidth ? {
        width: "".concat(errRule.maxWidth, "px")
      } : null
    }, errRule.message) : null]))])]);
  });
}

/* harmony default export */ var src_form = ({
  name: 'VxeForm',
  mixins: [size],
  props: {
    loading: Boolean,
    data: Object,
    size: {
      type: String,
      default: function _default() {
        return conf.form.size || conf.size;
      }
    },
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number],
    titleColon: {
      type: Boolean,
      default: function _default() {
        return conf.form.titleColon;
      }
    },
    titleAsterisk: {
      type: Boolean,
      default: function _default() {
        return conf.form.titleAsterisk;
      }
    },
    items: Array,
    rules: Object,
    preventSubmit: {
      type: Boolean,
      default: function _default() {
        return conf.form.preventSubmit;
      }
    },
    validConfig: Object
  },
  data: function data() {
    return {
      collapseAll: true,
      staticItems: [],
      formItems: []
    };
  },
  provide: function provide() {
    return {
      $xeform: this
    };
  },
  computed: {
    validOpts: function validOpts() {
      return Object.assign({}, conf.form.validConfig, this.validConfig);
    }
  },
  created: function created() {
    var items = this.items;

    if (items) {
      this.loadItem(items);
    }
  },
  watch: {
    staticItems: function staticItems(value) {
      this.formItems = value;
    },
    items: function items(value) {
      this.loadItem(value);
    }
  },
  render: function render(h) {
    var _ref;

    var loading = this.loading,
        vSize = this.vSize;
    return h('form', {
      class: ['vxe-form', 'vxe-row', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--colon', this.titleColon), _defineProperty(_ref, 'is--asterisk', this.titleAsterisk), _defineProperty(_ref, 'is--loading', loading), _ref)],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, renderItems(h, this).concat([h('div', {
      class: 'vxe-form-slots',
      ref: 'hideItem'
    }, this.$slots.default), h('div', {
      class: ['vxe-loading', {
        'is--visible': loading
      }]
    }, [h('div', {
      class: 'vxe-loading--spinner'
    })])]));
  },
  methods: {
    loadItem: function loadItem(list) {
      var _this = this;

      var $scopedSlots = this.$scopedSlots;
      list.forEach(function (item) {
        if (item.slots) {
          ctor_amd_xe_utils_default.a.each(item.slots, function (func, name, slots) {
            if (!ctor_amd_xe_utils_default.a.isFunction(func)) {
              if ($scopedSlots[func]) {
                slots[name] = $scopedSlots[func];
              } else {
                slots[name] = null;
                UtilTools.error('vxe.error.notSlot', [func]);
              }
            }
          });
        }
      });
      this.staticItems = list.map(function (item) {
        return createItem(_this, item);
      });
      return this.$nextTick();
    },
    getItems: function getItems() {
      return this.formItems.slice(0);
    },
    toggleCollapse: function toggleCollapse() {
      this.collapseAll = !this.collapseAll;
      return this.$nextTick();
    },
    toggleCollapseEvent: function toggleCollapseEvent(evnt) {
      this.toggleCollapse();
      this.$emit('toggle-collapse', {
        collapse: !this.collapseAll,
        data: this.data,
        $form: this,
        $event: evnt
      }, evnt);
    },
    submitEvent: function submitEvent(evnt) {
      var _this2 = this;

      evnt.preventDefault();

      if (!this.preventSubmit) {
        this.beginValidate().then(function () {
          _this2.$emit('submit', {
            data: _this2.data,
            $form: _this2,
            $event: evnt
          });
        }).catch(function (errMap) {
          _this2.$emit('submit-invalid', {
            data: _this2.data,
            errMap: errMap,
            $form: _this2,
            $event: evnt
          });
        });
      }
    },
    reset: function reset() {
      var _this3 = this;

      var data = this.data,
          formItems = this.formItems;

      if (data) {
        formItems.forEach(function (item) {
          var field = item.field,
              resetValue = item.resetValue,
              itemRender = item.itemRender;

          if (field) {
            ctor_amd_xe_utils_default.a.set(data, field, resetValue === null ? getResetValue(ctor_amd_xe_utils_default.a.get(data, field), undefined) : resetValue);
            var compConf = itemRender ? v_x_e_table.renderer.get(itemRender.name) : null;

            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({
                data: data,
                property: field,
                $form: _this3
              });
            }
          }
        });
      }

      return this.clearValidate();
    },
    resetEvent: function resetEvent(evnt) {
      evnt.preventDefault();
      this.reset();
      this.$emit('reset', {
        data: this.data,
        $form: this,
        $event: evnt
      });
    },
    clearValidate: function clearValidate(field) {
      var formItems = this.formItems;

      if (field) {
        var item = formItems.find(function (item) {
          return item.field === field;
        });

        if (item) {
          item.showError = false;
        }
      } else {
        formItems.forEach(function (item) {
          item.showError = false;
        });
      }

      return this.$nextTick();
    },
    validate: function validate(callback) {
      return this.beginValidate(callback);
    },
    beginValidate: function beginValidate(type, callback) {
      var _this4 = this;

      var data = this.data,
          formRules = this.rules,
          formItems = this.formItems,
          validOpts = this.validOpts;
      var validRest = {};
      var validFields = [];
      var itemValids = [];
      this.clearValidate();
      clearTimeout(this.showErrTime);

      if (data && formRules) {
        formItems.forEach(function (item) {
          var field = item.field;

          if (field) {
            itemValids.push(_this4.validItemRules(type || 'all', field).then(function () {
              item.errRule = null;
            }).catch(function (_ref2) {
              var rule = _ref2.rule,
                  rules = _ref2.rules;
              var rest = {
                rule: rule,
                rules: rules,
                data: data,
                property: field,
                $form: _this4
              };

              if (!validRest[field]) {
                validRest[field] = [];
              }

              validRest[field].push(rest);
              validFields.push(field);
              item.errRule = rule;
              return Promise.reject(rest);
            }));
          }
        });
        return Promise.all(itemValids).then(function () {
          if (callback) {
            callback();
          }
        }).catch(function () {
          _this4.showErrTime = setTimeout(function () {
            formItems.forEach(function (item) {
              if (item.errRule) {
                item.showError = true;
              }
            });
          }, 20);

          if (callback) {
            callback(validRest);
          }

          if (validOpts.autoPos !== false) {
            _this4.$nextTick(function () {
              _this4.handleFocus(validFields);
            });
          }

          return Promise.reject(validRest);
        });
      }

      if (callback) {
        callback();
      }

      return Promise.resolve();
    },

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者 Promise<(ErrMap 校验不通过列的信息)>
     * 如果是传回调方式这返回一个 (ErrMap 校验不通过列的信息)
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ itemValue, rule, rules, data, property }) 自定义校验，接收一个 Promise
     *  trigger=change 触发方式
     */
    validItemRules: function validItemRules(type, property, val) {
      var _this5 = this;

      var data = this.data,
          formRules = this.rules;
      var errorRules = [];
      var syncVailds = [];

      if (property && formRules) {
        var rules = ctor_amd_xe_utils_default.a.get(formRules, property);

        if (rules) {
          var itemValue = ctor_amd_xe_utils_default.a.isUndefined(val) ? ctor_amd_xe_utils_default.a.get(data, property) : val;
          rules.forEach(function (rule) {
            if (type === 'all' || !rule.trigger || type === rule.trigger) {
              if (ctor_amd_xe_utils_default.a.isFunction(rule.validator)) {
                var customValid = rule.validator({
                  itemValue: itemValue,
                  rule: rule,
                  rules: rules,
                  data: data,
                  property: property,
                  $form: _this5
                });

                if (customValid) {
                  if (ctor_amd_xe_utils_default.a.isError(customValid)) {
                    errorRules.push(new form_Rule({
                      type: 'custom',
                      trigger: rule.trigger,
                      message: customValid.message,
                      rule: new form_Rule(rule)
                    }));
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(customValid.catch(function (e) {
                      errorRules.push(new form_Rule({
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e ? e.message : rule.message,
                        rule: new form_Rule(rule)
                      }));
                    }));
                  }
                }
              } else {
                var isNumber = rule.type === 'number';
                var numVal = isNumber ? ctor_amd_xe_utils_default.a.toNumber(itemValue) : ctor_amd_xe_utils_default.a.getSize(itemValue);

                if (itemValue === null || itemValue === undefined || itemValue === '') {
                  if (rule.required) {
                    errorRules.push(new form_Rule(rule));
                  }
                } else if (isNumber && isNaN(itemValue) || !isNaN(rule.min) && numVal < parseFloat(rule.min) || !isNaN(rule.max) && numVal > parseFloat(rule.max) || rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(itemValue)) {
                  errorRules.push(new form_Rule(rule));
                }
              }
            }
          });
        }
      }

      return Promise.all(syncVailds).then(function () {
        if (errorRules.length) {
          var rest = {
            rules: errorRules,
            rule: errorRules[0]
          };
          return Promise.reject(rest);
        }
      });
    },
    handleFocus: function handleFocus(fields) {
      var $el = this.$el,
          formItems = this.formItems;
      fields.some(function (property) {
        var item = formItems.find(function (item) {
          return item.field === property;
        });

        if (item && item.itemRender) {
          var itemRender = item.itemRender;
          var compConf = v_x_e_table.renderer.get(itemRender.name);
          var inputElem; // 如果指定了聚焦 class

          if (itemRender.autofocus) {
            inputElem = $el.querySelector(".".concat(item.id, " ").concat(itemRender.autofocus));
          } // 渲染器的聚焦处理


          if (!inputElem && compConf && compConf.autofocus) {
            inputElem = $el.querySelector(".".concat(item.id, " ").concat(compConf.autofocus));
          }

          if (inputElem) {
            inputElem.focus(); // 保持一致行为，光标移到末端

            if (DomTools.browse.msie) {
              var textRange = inputElem.createTextRange();
              textRange.collapse(false);
              textRange.select();
            }

            return true;
          }
        }
      });
    },

    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus: function updateStatus(scope, itemValue) {
      var _this6 = this;

      var property = scope.property;

      if (property) {
        this.validItemRules('change', property, itemValue).then(function () {
          _this6.clearValidate(property);
        }).catch(function (_ref3) {
          var rule = _ref3.rule;

          var item = _this6.formItems.find(function (item) {
            return item.field === property;
          });

          if (item) {
            item.showError = true;
            item.errRule = rule;
          }
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/form/src/form-item.js





var form_item_props = {
  title: String,
  field: String,
  size: String,
  span: [String, Number],
  align: String,
  titleAlign: String,
  titleWidth: [String, Number],
  titlePrefix: Object,
  titleSuffix: Object,
  resetValue: {
    default: null
  },
  visible: {
    type: Boolean,
    default: null
  },
  visibleMethod: Function,
  folding: Boolean,
  collapseNode: Boolean,
  itemRender: Object
};
var form_item_watch = {};
Object.keys(form_item_props).forEach(function (name) {
  form_item_watch[name] = function (value) {
    this.itemConfig.update(name, value);
  };
});
/* harmony default export */ var form_item = ({
  name: 'VxeFormItem',
  props: form_item_props,
  inject: {
    $xeform: {
      default: null
    }
  },
  watch: form_item_watch,
  mounted: function mounted() {
    assemItem(this);
  },
  created: function created() {
    this.itemConfig = createItem(this.$xeform, this);
  },
  destroyed: function destroyed() {
    destroyItem(this);
  },
  render: function render(h) {
    return h('div');
  }
});
// CONCATENATED MODULE: ./packages/form/index.js




src_form.install = function (Vue) {
  Vue.component(src_form.name, src_form);
  Vue.component(form_item.name, form_item);
};

var Form = src_form;
/* harmony default export */ var packages_form = (src_form);
// CONCATENATED MODULE: ./packages/select/src/select.js



















function isOptionVisible(option) {
  return option.visible !== false;
}

function getOptUniqueId() {
  return ctor_amd_xe_utils_default.a.uniqueId('opt_');
}

function getOptkey(_vm) {
  return _vm.optionId || '_XID';
}

function getOptid(_vm, option) {
  var optid = option[getOptkey(_vm)];
  return optid ? encodeURIComponent(optid) : '';
}

function findOffsetOption(_vm, optionValue, isUpArrow) {
  var isGroup = _vm.isGroup,
      visibleOptionList = _vm.visibleOptionList,
      visibleGroupList = _vm.visibleGroupList,
      valueField = _vm.valueField,
      groupOptionsField = _vm.groupOptionsField;
  var firstOption;
  var prevOption;
  var nextOption;
  var currOption;

  if (isGroup) {
    for (var gIndex = 0; gIndex < visibleGroupList.length; gIndex++) {
      var group = visibleGroupList[gIndex];
      var groupOptionList = group[groupOptionsField];
      var isGroupDisabled = group.disabled;

      if (groupOptionList) {
        for (var index = 0; index < groupOptionList.length; index++) {
          var option = groupOptionList[index];
          var isVisible = isOptionVisible(option);
          var isDisabled = isGroupDisabled || option.disabled;

          if (!firstOption && !isDisabled) {
            firstOption = option;
          }

          if (currOption) {
            if (isVisible && !isDisabled) {
              nextOption = option;

              if (!isUpArrow) {
                return {
                  offsetOption: nextOption
                };
              }
            }
          }

          if (optionValue === option[valueField]) {
            currOption = option;

            if (isUpArrow) {
              return {
                offsetOption: prevOption
              };
            }
          } else {
            if (isVisible && !isDisabled) {
              prevOption = option;
            }
          }
        }
      }
    }
  } else {
    for (var _index = 0; _index < visibleOptionList.length; _index++) {
      var _option = visibleOptionList[_index];
      var _isDisabled = _option.disabled;

      if (!firstOption && !_isDisabled) {
        firstOption = _option;
      }

      if (currOption) {
        if (!_isDisabled) {
          nextOption = _option;

          if (!isUpArrow) {
            return {
              offsetOption: nextOption
            };
          }
        }
      }

      if (optionValue === _option[valueField]) {
        currOption = _option;

        if (isUpArrow) {
          return {
            offsetOption: prevOption
          };
        }
      } else {
        if (!_isDisabled) {
          prevOption = _option;
        }
      }
    }
  }

  return {
    firstOption: firstOption
  };
}

function findOption(_vm, optionValue) {
  var isGroup = _vm.isGroup,
      fullOptionList = _vm.fullOptionList,
      fullGroupList = _vm.fullGroupList,
      valueField = _vm.valueField;

  if (isGroup) {
    for (var gIndex = 0; gIndex < fullGroupList.length; gIndex++) {
      var group = fullGroupList[gIndex];

      if (group.options) {
        for (var index = 0; index < group.options.length; index++) {
          var option = group.options[index];

          if (optionValue === option[valueField]) {
            return option;
          }
        }
      }
    }
  }

  return fullOptionList.find(function (item) {
    return optionValue === item[valueField];
  });
}

function getSelectLabel(_vm, value) {
  var item = findOption(_vm, value);
  return ctor_amd_xe_utils_default.a.toString(item ? item[_vm.labelField] : value);
}

function renderOption(h, _vm, list, group) {
  var isGroup = _vm.isGroup,
      labelField = _vm.labelField,
      valueField = _vm.valueField,
      optionKey = _vm.optionKey,
      value = _vm.value,
      multiple = _vm.multiple,
      currentValue = _vm.currentValue;
  return list.map(function (option, cIndex) {
    var isVisible = !isGroup || isOptionVisible(option);
    var isDisabled = group && group.disabled || option.disabled;
    var optionValue = option[valueField];
    var optid = getOptid(_vm, option);
    return isVisible ? h('div', {
      key: optionKey ? optid : cIndex,
      class: ['vxe-select-option', {
        'is--disabled': isDisabled,
        'is--selected': multiple ? value && value.indexOf(optionValue) > -1 : value === optionValue,
        'is--hover': currentValue === optionValue
      }],
      attrs: {
        'data-optid': optid
      },
      on: {
        click: function click(evnt) {
          if (!isDisabled) {
            _vm.changeOptionEvent(evnt, optionValue);
          }
        },
        mouseenter: function mouseenter() {
          if (!isDisabled) {
            _vm.setCurrentOption(option);
          }
        }
      }
    }, UtilTools.formatText(UtilTools.getFuncText(option[labelField]))) : null;
  });
}
function renderOptgroup(h, _vm) {
  var optionKey = _vm.optionKey,
      visibleGroupList = _vm.visibleGroupList,
      groupLabelField = _vm.groupLabelField,
      groupOptionsField = _vm.groupOptionsField;
  return visibleGroupList.map(function (group, gIndex) {
    var optid = getOptid(_vm, group);
    var isGroupDisabled = group.disabled;
    return h('div', {
      key: optionKey ? optid : gIndex,
      class: ['vxe-optgroup', {
        'is--disabled': isGroupDisabled
      }],
      attrs: {
        'data-optid': optid
      }
    }, [h('div', {
      class: 'vxe-optgroup--title'
    }, UtilTools.getFuncText(group[groupLabelField])), h('div', {
      class: 'vxe-optgroup--wrapper'
    }, renderOption(h, _vm, group[groupOptionsField], group))]);
  });
}

function select_renderOpts(h, _vm) {
  var isGroup = _vm.isGroup,
      visibleGroupList = _vm.visibleGroupList,
      visibleOptionList = _vm.visibleOptionList;

  if (isGroup) {
    if (visibleGroupList.length) {
      return renderOptgroup(h, _vm);
    }
  } else {
    if (visibleOptionList.length) {
      return renderOption(h, _vm, visibleOptionList);
    }
  }

  return [h('div', {
    class: 'vxe-select--empty-placeholder'
  }, _vm.emptyText || conf.i18n('vxe.select.emptyText'))];
}

/* harmony default export */ var src_select = ({
  name: 'VxeSelect',
  mixins: [size],
  props: {
    value: null,
    clearable: Boolean,
    placeholder: String,
    disabled: Boolean,
    multiple: Boolean,
    multiCharOverflow: {
      type: [Number, String],
      default: function _default() {
        return conf.select.multiCharOverflow;
      }
    },
    prefixIcon: String,
    placement: String,
    options: Array,
    optionProps: Object,
    optionGroups: Array,
    optionGroupProps: Object,
    size: {
      type: String,
      default: function _default() {
        return conf.select.size || conf.size;
      }
    },
    emptyText: String,
    optionId: {
      type: String,
      default: function _default() {
        return conf.select.optionId;
      }
    },
    optionKey: Boolean,
    transfer: {
      type: Boolean,
      default: function _default() {
        return conf.select.transfer;
      }
    }
  },
  components: {
    VxeInput: input
  },
  provide: function provide() {
    return {
      $xeselect: this
    };
  },
  data: function data() {
    return {
      inited: false,
      collectOption: [],
      fullGroupList: [],
      fullOptionList: [],
      visibleGroupList: [],
      visibleOptionList: [],
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    };
  },
  computed: {
    propsOpts: function propsOpts() {
      return this.optionProps || {};
    },
    groupPropsOpts: function groupPropsOpts() {
      return this.optionGroupProps || {};
    },
    labelField: function labelField() {
      return this.propsOpts.label || 'label';
    },
    valueField: function valueField() {
      return this.propsOpts.value || 'value';
    },
    groupLabelField: function groupLabelField() {
      return this.groupPropsOpts.label || 'label';
    },
    groupOptionsField: function groupOptionsField() {
      return this.groupPropsOpts.options || 'options';
    },
    isGroup: function isGroup() {
      return this.fullGroupList.some(function (item) {
        return item.options && item.options.length;
      });
    },
    multiMaxCharNum: function multiMaxCharNum() {
      return ctor_amd_xe_utils_default.a.toNumber(this.multiCharOverflow);
    },
    selectLabel: function selectLabel() {
      var _this = this;

      var value = this.value,
          multiple = this.multiple,
          multiMaxCharNum = this.multiMaxCharNum;

      if (value && multiple) {
        return value.map(function (val) {
          var label = getSelectLabel(_this, val);

          if (multiMaxCharNum > 0 && label.length > multiMaxCharNum) {
            return "".concat(label.substring(0, multiMaxCharNum), "...");
          }

          return label;
        }).join(', ');
      }

      return getSelectLabel(this, value);
    }
  },
  watch: {
    collectOption: function collectOption(value) {
      if (value.some(function (item) {
        return item.options && item.options.length;
      })) {
        this.fullOptionList = [];
        this.fullGroupList = value;
      } else {
        this.fullGroupList = [];
        this.fullOptionList = value;
      }

      this.updateCache();
    },
    options: function options(value) {
      this.fullGroupList = [];
      this.fullOptionList = value;
      this.updateCache();
    },
    optionGroups: function optionGroups(value) {
      this.fullOptionList = [];
      this.fullGroupList = value;
      this.updateCache();
    }
  },
  created: function created() {
    var options = this.options,
        optionGroups = this.optionGroups;

    if (optionGroups) {
      this.fullGroupList = optionGroups;
    } else if (options) {
      this.fullOptionList = options;
    }

    this.updateCache();
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'mousewheel');
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'keydown');
    GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref, _ref2;

    var vSize = this.vSize,
        inited = this.inited,
        isActivated = this.isActivated,
        disabled = this.disabled,
        visiblePanel = this.visiblePanel;
    return h('div', {
      class: ['vxe-select', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--visivle', visiblePanel), _defineProperty(_ref, 'is--disabled', disabled), _defineProperty(_ref, 'is--active', isActivated), _ref)]
    }, [h('div', {
      class: 'vxe-select-slots',
      ref: 'hideOption'
    }, this.$slots.default), h('vxe-input', {
      ref: 'input',
      props: {
        clearable: this.clearable,
        placeholder: this.placeholder,
        readonly: true,
        disabled: disabled,
        type: 'text',
        prefixIcon: this.prefixIcon,
        suffixIcon: visiblePanel ? conf.icon.SELECT_OPEN : conf.icon.SELECT_CLOSE,
        value: this.selectLabel
      },
      on: {
        clear: this.clearEvent,
        click: this.togglePanelEvent,
        focus: this.focusEvent,
        blur: this.blurEvent,
        'suffix-click': this.togglePanelEvent
      }
    }), h('div', {
      ref: 'panel',
      class: ['vxe-table--ignore-clear vxe-select--panel', (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--transfer', this.transfer), _defineProperty(_ref2, 'animat--leave', this.animatVisible), _defineProperty(_ref2, 'animat--enter', visiblePanel), _ref2)],
      attrs: {
        'data-placement': this.panelPlacement
      },
      style: this.panelStyle
    }, inited ? [h('div', {
      ref: 'optWrapper',
      class: 'vxe-select-option--wrapper'
    }, select_renderOpts(h, this))] : null)]);
  },
  methods: {
    updateCache: function updateCache() {
      var _this2 = this;

      var fullOptionList = this.fullOptionList,
          fullGroupList = this.fullGroupList,
          groupOptionsField = this.groupOptionsField;
      var optkey = getOptkey(this);

      var handleOptis = function handleOptis(item) {
        if (!getOptid(_this2, item)) {
          item[optkey] = getOptUniqueId();
        }
      };

      if (fullGroupList.length) {
        fullGroupList.forEach(function (group) {
          handleOptis(group);

          if (group[groupOptionsField]) {
            group[groupOptionsField].forEach(handleOptis);
          }
        });
      } else if (fullOptionList.length) {
        fullOptionList.forEach(handleOptis);
      }

      this.refreshOption();
    },

    /**
     * 刷新选项，当选项被动态显示/隐藏时可能会用到
     */
    refreshOption: function refreshOption() {
      var isGroup = this.isGroup,
          fullOptionList = this.fullOptionList,
          fullGroupList = this.fullGroupList;

      if (isGroup) {
        this.visibleGroupList = fullGroupList.filter(isOptionVisible);
      } else {
        this.visibleOptionList = fullOptionList.filter(isOptionVisible);
      }

      return this.$nextTick();
    },
    setCurrentOption: function setCurrentOption(option) {
      if (option) {
        this.currentValue = option[this.valueField];
      }
    },
    scrollToOption: function scrollToOption(option, isAlignBottom) {
      var _this3 = this;

      return this.$nextTick().then(function () {
        if (option) {
          var $refs = _this3.$refs;
          var optWrapperElem = $refs.optWrapper;
          var optElem = $refs.panel.querySelector("[data-optid='".concat(getOptid(_this3, option), "']"));

          if (optWrapperElem && optElem) {
            var wrapperHeight = optWrapperElem.offsetHeight;
            var offsetPadding = 5;

            if (isAlignBottom) {
              if (optElem.offsetTop + optElem.offsetHeight - optWrapperElem.scrollTop > wrapperHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop + optElem.offsetHeight - wrapperHeight;
              }
            } else {
              if (optElem.offsetTop + offsetPadding < optWrapperElem.scrollTop || optElem.offsetTop + offsetPadding > optWrapperElem.scrollTop + optWrapperElem.clientHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop - offsetPadding;
              }
            }
          }
        }
      });
    },
    clearEvent: function clearEvent(params, evnt) {
      this.clearValueEvent(evnt, null);
      this.hideOptionPanel();
    },
    clearValueEvent: function clearValueEvent(evnt, selectValue) {
      this.changeEvent(evnt, selectValue);
      this.$emit('clear', {
        value: selectValue,
        $event: evnt
      });
    },
    changeEvent: function changeEvent(evnt, selectValue) {
      if (selectValue !== this.value) {
        this.$emit('input', selectValue);
        this.$emit('change', {
          value: selectValue,
          $event: evnt
        });
      }
    },
    changeOptionEvent: function changeOptionEvent(evnt, selectValue) {
      var value = this.value,
          multiple = this.multiple;

      if (multiple) {
        var multipleValue;

        if (value) {
          if (value.indexOf(selectValue) === -1) {
            multipleValue = value.concat([selectValue]);
          } else {
            multipleValue = value.filter(function (val) {
              return val !== selectValue;
            });
          }
        } else {
          multipleValue = [selectValue];
        }

        this.changeEvent(evnt, multipleValue);
      } else {
        this.changeEvent(evnt, selectValue);
        this.hideOptionPanel();
      }
    },
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        if (visiblePanel) {
          if (DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
            this.updatePlacement();
          } else {
            this.hideOptionPanel();
          }
        }
      }
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        this.isActivated = DomTools.getEventTargetNode(evnt, $el).flag || DomTools.getEventTargetNode(evnt, $refs.panel).flag;

        if (visiblePanel && !this.isActivated) {
          this.hideOptionPanel();
        }
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var visiblePanel = this.visiblePanel,
          currentValue = this.currentValue,
          clearable = this.clearable,
          disabled = this.disabled;

      if (!disabled) {
        var keyCode = evnt.keyCode;
        var isTab = keyCode === 9;
        var isEnter = keyCode === 13;
        var isEsc = keyCode === 27;
        var isUpArrow = keyCode === 38;
        var isDwArrow = keyCode === 40;
        var isDel = keyCode === 46;
        var isSpacebar = keyCode === 32;

        if (isTab) {
          this.isActivated = false;
        }

        if (visiblePanel) {
          if (isEsc || isTab) {
            this.hideOptionPanel();
          } else if (isEnter) {
            this.changeOptionEvent(evnt, currentValue);
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault();

            var _findOffsetOption = findOffsetOption(this, currentValue, isUpArrow),
                firstOption = _findOffsetOption.firstOption,
                offsetOption = _findOffsetOption.offsetOption;

            if (!offsetOption && !findOption(this, currentValue)) {
              offsetOption = firstOption;
            }

            this.setCurrentOption(offsetOption);
            this.scrollToOption(offsetOption, isDwArrow);
          } else if (isSpacebar) {
            evnt.preventDefault();
          }
        } else if ((isUpArrow || isDwArrow || isEnter || isSpacebar) && this.isActivated) {
          evnt.preventDefault();
          this.showOptionPanel();
        }

        if (this.isActivated) {
          if (isDel && clearable) {
            this.clearValueEvent(evnt, null);
          }
        }
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent() {
      this.hideOptionPanel();
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex();
      }
    },
    focusEvent: function focusEvent() {
      if (!this.disabled) {
        this.isActivated = true;
      }
    },
    blurEvent: function blurEvent() {
      this.isActivated = false;
    },
    togglePanelEvent: function togglePanelEvent(params) {
      var $event = params.$event;
      $event.preventDefault();

      if (this.visiblePanel) {
        this.hideOptionPanel();
      } else {
        this.showOptionPanel();
      }
    },
    showOptionPanel: function showOptionPanel() {
      var _this4 = this;

      if (!this.disabled) {
        clearTimeout(this.hidePanelTimeout);

        if (!this.inited) {
          this.inited = true;

          if (this.transfer) {
            document.body.appendChild(this.$refs.panel);
          }
        }

        this.isActivated = true;
        this.animatVisible = true;
        setTimeout(function () {
          var value = _this4.value,
              multiple = _this4.multiple;
          var currOption = findOption(_this4, multiple && value ? value[0] : value);
          _this4.visiblePanel = true;

          if (currOption) {
            _this4.setCurrentOption(currOption);

            _this4.scrollToOption(currOption);
          }
        }, 10);
        this.updateZindex();
        this.updatePlacement();
      }
    },
    hideOptionPanel: function hideOptionPanel() {
      var _this5 = this;

      this.visiblePanel = false;
      this.hidePanelTimeout = setTimeout(function () {
        _this5.animatVisible = false;
      }, 350);
    },
    updatePlacement: function updatePlacement() {
      var _this6 = this;

      return this.$nextTick().then(function () {
        var $refs = _this6.$refs,
            transfer = _this6.transfer,
            placement = _this6.placement,
            panelIndex = _this6.panelIndex;
        var targetElem = $refs.input.$el;
        var panelElem = $refs.panel;

        if (panelElem && targetElem) {
          var targetHeight = targetElem.offsetHeight;
          var targetWidth = targetElem.offsetWidth;
          var panelHeight = panelElem.offsetHeight;
          var panelWidth = panelElem.offsetWidth;
          var marginSize = 5;
          var panelStyle = {
            zIndex: panelIndex
          };

          var _DomTools$getAbsolute = DomTools.getAbsolutePos(targetElem),
              boundingTop = _DomTools$getAbsolute.boundingTop,
              boundingLeft = _DomTools$getAbsolute.boundingLeft,
              visibleHeight = _DomTools$getAbsolute.visibleHeight,
              visibleWidth = _DomTools$getAbsolute.visibleWidth;

          var panelPlacement = 'bottom';

          if (transfer) {
            var left = boundingLeft;
            var top = boundingTop + targetHeight;

            if (placement === 'top') {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              } // 如果上面不够放，则向下（优先）


              if (top < marginSize) {
                panelPlacement = 'bottom';
                top = boundingTop + targetHeight;
              }
            } // 如果溢出右边


            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            } // 如果溢出左边


            if (left < marginSize) {
              left = marginSize;
            }

            Object.assign(panelStyle, {
              left: "".concat(left, "px"),
              top: "".concat(top, "px"),
              minWidth: "".concat(targetWidth, "px")
            });
          } else {
            if (placement === 'top') {
              panelPlacement = 'top';
              panelStyle.bottom = "".concat(targetHeight, "px");
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top';
                  panelStyle.bottom = "".concat(targetHeight, "px");
                }
              }
            }
          }

          _this6.panelStyle = panelStyle;
          _this6.panelPlacement = panelPlacement;
          return _this6.$nextTick();
        }
      });
    },
    focus: function focus() {
      this.showOptionPanel();
      return this.$nextTick();
    },
    blur: function blur() {
      this.hideOptionPanel();
      return this.$nextTick();
    }
  }
});
// CONCATENATED MODULE: ./packages/select/src/util.js






var util_OptionConfig = /*#__PURE__*/function () {
  function OptionConfig($xeselect, _vm) {
    _classCallCheck(this, OptionConfig);

    Object.assign(this, {
      value: _vm.value,
      label: _vm.label,
      visible: _vm.visible,
      disabled: _vm.disabled
    });
  }

  _createClass(OptionConfig, [{
    key: "update",
    value: function update(name, value) {
      this[name] = value;
    }
  }]);

  return OptionConfig;
}();

function isOption(option) {
  return option instanceof util_OptionConfig;
}
function getOptionConfig($xeselect, _vm, options) {
  return isOption(_vm) ? _vm : new util_OptionConfig($xeselect, _vm, options);
}
function createOption($xeselect, _vm) {
  return getOptionConfig($xeselect, _vm);
}
function destroyOption(_vm) {
  var $xeselect = _vm.$xeselect,
      optionConfig = _vm.optionConfig;
  var matchObj = ctor_amd_xe_utils_default.a.findTree($xeselect.collectOption, function (option) {
    return option === optionConfig;
  });

  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
}
function assemOption(_vm) {
  var $el = _vm.$el,
      $xeselect = _vm.$xeselect,
      $xeoptgroup = _vm.$xeoptgroup,
      optionConfig = _vm.optionConfig;
  var groupConfig = $xeoptgroup ? $xeoptgroup.optionConfig : null;
  optionConfig.slots = _vm.$scopedSlots;

  if (groupConfig) {
    if (!groupConfig.options) {
      groupConfig.options = [];
    }

    groupConfig.options.splice([].indexOf.call($xeoptgroup.$el.children, $el), 0, optionConfig);
  } else {
    $xeselect.collectOption.splice([].indexOf.call($xeselect.$refs.hideOption.children, $el), 0, optionConfig);
  }
}
// CONCATENATED MODULE: ./packages/select/src/option.js





var option_props = {
  value: null,
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  visible: {
    type: Boolean,
    default: null
  },
  disabled: Boolean
};
var option_watch = {};
Object.keys(option_props).forEach(function (name) {
  option_watch[name] = function (value) {
    this.optionConfig.update(name, value);
  };
});
/* harmony default export */ var src_option = ({
  name: 'VxeOption',
  props: option_props,
  inject: {
    $xeselect: {
      default: null
    },
    $xeoptgroup: {
      default: null
    }
  },
  watch: option_watch,
  mounted: function mounted() {
    assemOption(this);
  },
  created: function created() {
    this.optionConfig = createOption(this.$xeselect, this);
  },
  destroyed: function destroyed() {
    destroyOption(this);
  },
  render: function render(h) {
    return h('div');
  }
});
// CONCATENATED MODULE: ./packages/select/src/optgroup.js





var optgroup_props = {
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  visible: {
    type: Boolean,
    default: null
  },
  disabled: Boolean
};
var optgroup_watch = {};
Object.keys(optgroup_props).forEach(function (name) {
  optgroup_watch[name] = function (value) {
    this.optionConfig.update(name, value);
  };
});
/* harmony default export */ var optgroup = ({
  name: 'VxeOptgroup',
  props: optgroup_props,
  provide: function provide() {
    return {
      $xeoptgroup: this
    };
  },
  inject: {
    $xeselect: {
      default: null
    }
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  watch: optgroup_watch,
  mounted: function mounted() {
    assemOption(this);
  },
  created: function created() {
    this.optionConfig = createOption(this.$xeselect, this);
  },
  destroyed: function destroyed() {
    destroyOption(this);
  },
  render: function render(h) {
    return h('div', this.$slots.default);
  }
});
// CONCATENATED MODULE: ./packages/select/index.js





src_select.install = function (Vue) {
  Vue.component(src_select.name, src_select);
  Vue.component(src_option.name, src_option);
  Vue.component(optgroup.name, optgroup);
};

var Select = src_select;
/* harmony default export */ var packages_select = (src_select);
// CONCATENATED MODULE: ./packages/switch/src/switch.js





var switch_browse = DomTools.browse;
/* harmony default export */ var src_switch = ({
  name: 'VxeSwitch',
  mixins: [size],
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return conf.switch.size || conf.size;
      }
    },
    onLabel: String,
    offLabel: String,
    onValue: {
      type: [String, Number, Boolean],
      default: true
    },
    offValue: {
      type: [String, Number, Boolean],
      default: false
    },
    onIcon: String,
    offIcon: String
  },
  data: function data() {
    return {
      hasAnimat: false,
      offsetLeft: 0
    };
  },
  computed: {
    isChecked: function isChecked() {
      return this.value === this.onValue;
    },
    onShowLabel: function onShowLabel() {
      return UtilTools.getFuncText(this.onLabel);
    },
    offShowLabel: function offShowLabel() {
      return UtilTools.getFuncText(this.offLabel);
    },
    styles: function styles() {
      return switch_browse.msie && this.isChecked ? {
        left: "".concat(this.offsetLeft, "px")
      } : null;
    }
  },
  created: function created() {
    var _this = this;

    if (switch_browse.msie) {
      this.$nextTick(function () {
        return _this.updateStyle();
      });
    }
  },
  render: function render(h) {
    var _ref;

    var isChecked = this.isChecked,
        vSize = this.vSize,
        disabled = this.disabled,
        onIcon = this.onIcon,
        offIcon = this.offIcon;
    return h('div', {
      class: ['vxe-switch', isChecked ? 'is--on' : 'is--off', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', disabled), _defineProperty(_ref, 'is--animat', this.hasAnimat), _ref)]
    }, [h('button', {
      ref: 'btn',
      class: 'vxe-switch--button',
      attrs: {
        type: 'button',
        disabled: disabled
      },
      on: {
        click: this.clickEvent
      }
    }, [h('span', {
      class: 'vxe-switch--label vxe-switch--label-on'
    }, [onIcon ? h('i', {
      class: ['vxe-switch--label-icon', onIcon]
    }) : null, this.onShowLabel]), h('span', {
      class: 'vxe-switch--label vxe-switch--label-off'
    }, [offIcon ? h('i', {
      class: ['vxe-switch--label-icon', offIcon]
    }) : null, this.offShowLabel]), h('span', {
      class: 'vxe-switch--icon',
      style: this.styles
    })])]);
  },
  methods: {
    updateStyle: function updateStyle() {
      // 兼容 IE
      this.hasAnimat = true;
      this.offsetLeft = this.$refs.btn.offsetWidth;
    },
    clickEvent: function clickEvent(evnt) {
      var _this2 = this;

      if (!this.disabled) {
        clearTimeout(this.activeTimeout);
        var value = this.isChecked ? this.offValue : this.onValue;
        this.hasAnimat = true;

        if (switch_browse.msie) {
          this.updateStyle();
        }

        this.$emit('input', value);
        this.$emit('change', {
          value: value,
          $event: evnt
        });
        this.activeTimeout = setTimeout(function () {
          _this2.hasAnimat = false;
        }, 400);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/switch/index.js



src_switch.install = function (Vue) {
  Vue.component(src_switch.name, src_switch);
};

var Switch = src_switch;
/* harmony default export */ var packages_switch = (src_switch);
// CONCATENATED MODULE: ./packages/list/src/list.js







var list_browse = DomTools.browse;
/* harmony default export */ var src_list = ({
  name: 'VxeList',
  mixins: [size],
  props: {
    data: Array,
    height: [Number, String],
    maxHeight: [Number, String],
    loading: Boolean,
    size: {
      type: String,
      default: function _default() {
        return conf.list.size || conf.size;
      }
    },
    autoResize: Boolean,
    syncResize: [Boolean, String, Number],
    scrollY: Object
  },
  data: function data() {
    return {
      scrollYLoad: false,
      bodyHeight: 0,
      topSpaceHeight: 0,
      items: []
    };
  },
  computed: {
    sYOpts: function sYOpts() {
      return Object.assign({}, conf.list.scrollY, this.scrollY);
    },
    styles: function styles() {
      var height = this.height,
          maxHeight = this.maxHeight;
      var style = {};

      if (height) {
        style.height = isNaN(height) ? height : "".concat(height, "px");
      } else if (maxHeight) {
        style.height = 'auto';
        style.maxHeight = isNaN(maxHeight) ? maxHeight : "".concat(maxHeight, "px");
      }

      return style;
    }
  },
  watch: {
    data: function data(value) {
      this.loadData(value);
    },
    syncResize: function syncResize(value) {
      var _this = this;

      if (value) {
        this.recalculate();
        this.$nextTick(function () {
          return setTimeout(function () {
            return _this.recalculate();
          });
        });
      }
    }
  },
  created: function created() {
    Object.assign(this, {
      fullData: [],
      lastScrollLeft: 0,
      lastScrollTop: 0,
      scrollYStore: {
        startIndex: 0,
        endIndex: 0,
        visibleSize: 0
      }
    });
    this.loadData(this.data);
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.autoResize) {
      var resizeObserver = new ResizeEvent(function () {
        return _this2.recalculate();
      });
      resizeObserver.observe(this.$el);
      this.$resize = resizeObserver;
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$resize) {
      this.$resize.disconnect();
    }
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'resize');
  },
  render: function render(h) {
    var $scopedSlots = this.$scopedSlots,
        styles = this.styles,
        bodyHeight = this.bodyHeight,
        topSpaceHeight = this.topSpaceHeight,
        items = this.items,
        loading = this.loading;
    return h('div', {
      class: ['vxe-list', {
        'is--loading': loading
      }]
    }, [h('div', {
      ref: 'virtualWrapper',
      class: 'vxe-list--virtual-wrapper',
      style: styles,
      on: {
        scroll: this.scrollEvent
      }
    }, [h('div', {
      ref: 'ySpace',
      class: 'vxe-list--y-space',
      style: {
        height: bodyHeight ? "".concat(bodyHeight, "px") : ''
      }
    }), h('div', {
      ref: 'body',
      class: 'vxe-list--body',
      style: {
        marginTop: topSpaceHeight ? "".concat(topSpaceHeight, "px") : ''
      }
    }, $scopedSlots.default ? $scopedSlots.default.call(this, {
      items: items,
      $list: this
    }, h) : [])]), h('div', {
      class: ['vxe-list--loading vxe-loading', {
        'is--visible': loading
      }]
    }, [h('div', {
      class: 'vxe-loading--spinner'
    })])]);
  },
  methods: {
    getParentElem: function getParentElem() {
      return this.$el.parentNode;
    },

    /**
     * 加载数据
     * @param {Array} datas 数据
     */
    loadData: function loadData(datas) {
      var _this3 = this;

      var sYOpts = this.sYOpts,
          scrollYStore = this.scrollYStore;
      var fullData = datas || [];
      scrollYStore.startIndex = 0;
      scrollYStore.visibleIndex = 0;
      this.fullData = fullData;
      this.scrollYLoad = sYOpts.gt > -1 && sYOpts.gt <= fullData.length;
      this.handleData();
      return this.computeScrollLoad().then(function () {
        _this3.refreshScroll();
      });
    },

    /**
     * 重新加载数据
     * @param {Array} datas 数据
     */
    reloadData: function reloadData(datas) {
      this.clearScroll();
      return this.loadData(datas);
    },
    handleData: function handleData() {
      var fullData = this.fullData,
          scrollYLoad = this.scrollYLoad,
          scrollYStore = this.scrollYStore;
      this.items = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0);
      return this.$nextTick();
    },

    /**
     * 重新计算列表
     */
    recalculate: function recalculate() {
      var $el = this.$el;

      if ($el.clientWidth && $el.clientHeight) {
        return this.computeScrollLoad();
      }

      return Promise.resolve();
    },

    /**
     * 清除滚动条
     */
    clearScroll: function clearScroll() {
      var _this4 = this;

      var scrollBodyElem = this.$refs.virtualWrapper;

      if (scrollBodyElem) {
        scrollBodyElem.scrollTop = 0;
      }

      return new Promise(function (resolve) {
        requestAnimationFrame(function () {
          resolve(_this4.$nextTick());
        });
      });
    },

    /**
     * 刷新滚动条
     */
    refreshScroll: function refreshScroll() {
      var _this5 = this;

      var lastScrollLeft = this.lastScrollLeft,
          lastScrollTop = this.lastScrollTop;
      return this.clearScroll().then(function () {
        if (lastScrollLeft || lastScrollTop) {
          _this5.lastScrollLeft = 0;
          _this5.lastScrollTop = 0;
          return _this5.scrollTo(lastScrollLeft, lastScrollTop);
        }
      });
    },

    /**
     * 如果有滚动条，则滚动到对应的位置
     * @param {Number} scrollLeft 左距离
     * @param {Number} scrollTop 上距离
     */
    scrollTo: function scrollTo(scrollLeft, scrollTop) {
      var _this6 = this;

      var scrollBodyElem = this.$refs.virtualWrapper;

      if (ctor_amd_xe_utils_default.a.isNumber(scrollLeft)) {
        scrollBodyElem.scrollLeft = scrollLeft;
      }

      if (ctor_amd_xe_utils_default.a.isNumber(scrollTop)) {
        scrollBodyElem.scrollTop = scrollTop;
      }

      if (this.scrollYLoad) {
        return new Promise(function (resolve) {
          return setTimeout(function () {
            return resolve(_this6.$nextTick());
          }, 50);
        });
      }

      return this.$nextTick();
    },
    computeScrollLoad: function computeScrollLoad() {
      var _this7 = this;

      return this.$nextTick().then(function () {
        var $refs = _this7.$refs,
            sYOpts = _this7.sYOpts,
            scrollYLoad = _this7.scrollYLoad,
            scrollYStore = _this7.scrollYStore;
        var rowHeight = 0;
        var firstItemElem;

        if (sYOpts.sItem) {
          firstItemElem = $refs.body.querySelector(sYOpts.sItem);
        }

        if (!firstItemElem) {
          firstItemElem = $refs.body.children[0];
        }

        if (firstItemElem) {
          rowHeight = firstItemElem.offsetHeight;
        }

        rowHeight = Math.max(20, rowHeight);
        scrollYStore.rowHeight = rowHeight; // 计算 Y 逻辑

        if (scrollYLoad) {
          var visibleYSize = Math.max(8, Math.ceil($refs.virtualWrapper.clientHeight / rowHeight));
          var offsetYSize = sYOpts.oSize ? ctor_amd_xe_utils_default.a.toNumber(sYOpts.oSize) : list_browse.msie ? 20 : list_browse.edge ? 10 : 0;
          scrollYStore.offsetSize = offsetYSize;
          scrollYStore.visibleSize = visibleYSize;
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex, visibleYSize + offsetYSize, scrollYStore.endIndex);

          _this7.updateYData();
        } else {
          _this7.updateYSpace();
        }

        _this7.rowHeight = rowHeight;
      });
    },
    scrollEvent: function scrollEvent(evnt) {
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var scrollLeft = scrollBodyElem.scrollLeft;
      var isX = scrollLeft !== this.lastScrollLeft;
      var isY = scrollTop !== this.lastScrollTop;
      this.lastScrollTop = scrollTop;
      this.lastScrollLeft = scrollLeft;

      if (this.scrollYLoad) {
        this.loadYData(evnt);
      }

      this.$emit('scroll', {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        isX: isX,
        isY: isY,
        $event: evnt
      });
    },
    loadYData: function loadYData(evnt) {
      var scrollYStore = this.scrollYStore;
      var startIndex = scrollYStore.startIndex,
          endIndex = scrollYStore.endIndex,
          visibleSize = scrollYStore.visibleSize,
          offsetSize = scrollYStore.offsetSize,
          rowHeight = scrollYStore.rowHeight;
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var toVisibleIndex = Math.floor(scrollTop / rowHeight);
      var offsetStartIndex = Math.max(0, toVisibleIndex - 1 - offsetSize);
      var offsetEndIndex = toVisibleIndex + visibleSize + offsetSize;

      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex;
          scrollYStore.endIndex = offsetEndIndex;
          this.updateYData();
        }
      }
    },
    updateYData: function updateYData() {
      this.handleData();
      this.updateYSpace();
    },
    updateYSpace: function updateYSpace() {
      var scrollYStore = this.scrollYStore,
          scrollYLoad = this.scrollYLoad,
          fullData = this.fullData;
      this.bodyHeight = scrollYLoad ? fullData.length * scrollYStore.rowHeight : 0;
      this.topSpaceHeight = scrollYLoad ? Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0) : 0;
    },
    handleGlobalResizeEvent: function handleGlobalResizeEvent() {
      this.recalculate();
    }
  }
});
// CONCATENATED MODULE: ./packages/list/index.js



src_list.install = function (Vue) {
  Vue.component(src_list.name, src_list);
};

var List = src_list;
/* harmony default export */ var packages_list = (src_list);
// CONCATENATED MODULE: ./packages/pulldown/src/pulldown.js





/* harmony default export */ var pulldown = ({
  name: 'VxePulldown',
  mixins: [size],
  props: {
    disabled: Boolean,
    placement: String,
    size: {
      type: String,
      default: function _default() {
        return conf.size;
      }
    },
    destroyOnClose: Boolean,
    transfer: Boolean
  },
  data: function data() {
    return {
      inited: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    };
  },
  created: function created() {
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'mousewheel');
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref, _ref2;

    var $scopedSlots = this.$scopedSlots,
        inited = this.inited,
        vSize = this.vSize,
        destroyOnClose = this.destroyOnClose,
        transfer = this.transfer,
        isActivated = this.isActivated,
        disabled = this.disabled,
        animatVisible = this.animatVisible,
        visiblePanel = this.visiblePanel,
        panelStyle = this.panelStyle,
        panelPlacement = this.panelPlacement;
    var defaultSlot = $scopedSlots.default;
    var downSlot = $scopedSlots.dropdown;
    return h('div', {
      class: ['vxe-pulldown', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--visivle', visiblePanel), _defineProperty(_ref, 'is--disabled', disabled), _defineProperty(_ref, 'is--active', isActivated), _ref)]
    }, [h('div', {
      ref: 'content',
      class: 'vxe-pulldown--content'
    }, defaultSlot ? defaultSlot.call(this, {
      $pulldown: this
    }, h) : []), h('div', {
      ref: 'panel',
      class: ['vxe-table--ignore-clear vxe-pulldown--panel', (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--transfer', transfer), _defineProperty(_ref2, 'animat--leave', animatVisible), _defineProperty(_ref2, 'animat--enter', visiblePanel), _ref2)],
      attrs: {
        'data-placement': panelPlacement
      },
      style: panelStyle
    }, downSlot ? !inited || destroyOnClose && !visiblePanel && !animatVisible ? [] : downSlot.call(this, {
      $pulldown: this
    }, h) : [])]);
  },
  methods: {
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        if (visiblePanel) {
          if (DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
            this.updatePlacement();
          } else {
            this.hidePanel();
            this.$emit('hide-panel', {
              $event: evnt
            });
          }
        }
      }
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        this.isActivated = DomTools.getEventTargetNode(evnt, $el).flag || DomTools.getEventTargetNode(evnt, $refs.panel).flag;

        if (visiblePanel && !this.isActivated) {
          this.hidePanel();
          this.$emit('hide-panel', {
            $event: evnt
          });
        }
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      if (this.visiblePanel) {
        this.hidePanel();
        this.$emit('hide-panel', {
          $event: evnt
        });
      }
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex();
      }
    },
    isPanelVisible: function isPanelVisible() {
      return this.visiblePanel;
    },

    /**
     * 切换下拉面板
     */
    togglePanel: function togglePanel() {
      if (this.visiblePanel) {
        return this.hidePanel();
      }

      return this.showPanel();
    },

    /**
     * 显示下拉面板
     */
    showPanel: function showPanel() {
      var _this = this;

      if (!this.inited) {
        this.inited = true;

        if (this.transfer) {
          document.body.appendChild(this.$refs.panel);
        }
      }

      return new Promise(function (resolve) {
        if (!_this.disabled) {
          clearTimeout(_this.hidePanelTimeout);
          _this.isActivated = true;
          _this.animatVisible = true;
          setTimeout(function () {
            _this.visiblePanel = true;

            _this.updatePlacement();

            setTimeout(function () {
              resolve(_this.updatePlacement());
            }, 40);
          }, 10);

          _this.updateZindex();
        } else {
          resolve(_this.$nextTick());
        }
      });
    },

    /**
     * 隐藏下拉面板
     */
    hidePanel: function hidePanel() {
      var _this2 = this;

      this.visiblePanel = false;
      return new Promise(function (resolve) {
        if (_this2.animatVisible) {
          _this2.hidePanelTimeout = setTimeout(function () {
            _this2.animatVisible = false;
            resolve(_this2.$nextTick());
          }, 350);
        } else {
          resolve(_this2.$nextTick());
        }
      });
    },

    /**
     * 手动更新位置
     */
    updatePlacement: function updatePlacement() {
      var _this3 = this;

      return this.$nextTick().then(function () {
        var $refs = _this3.$refs,
            transfer = _this3.transfer,
            placement = _this3.placement,
            panelIndex = _this3.panelIndex,
            visiblePanel = _this3.visiblePanel;

        if (visiblePanel) {
          var panelElem = $refs.panel;
          var targetElem = $refs.content;

          if (panelElem && targetElem) {
            var targetHeight = targetElem.offsetHeight;
            var targetWidth = targetElem.offsetWidth;
            var panelHeight = panelElem.offsetHeight;
            var panelWidth = panelElem.offsetWidth;
            var marginSize = 5;
            var panelStyle = {
              zIndex: panelIndex
            };

            var _DomTools$getAbsolute = DomTools.getAbsolutePos(targetElem),
                boundingTop = _DomTools$getAbsolute.boundingTop,
                boundingLeft = _DomTools$getAbsolute.boundingLeft,
                visibleHeight = _DomTools$getAbsolute.visibleHeight,
                visibleWidth = _DomTools$getAbsolute.visibleWidth;

            var panelPlacement = 'bottom';

            if (transfer) {
              var left = boundingLeft;
              var top = boundingTop + targetHeight;

              if (placement === 'top') {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              } else if (!placement) {
                // 如果下面不够放，则向上
                if (top + panelHeight + marginSize > visibleHeight) {
                  panelPlacement = 'top';
                  top = boundingTop - panelHeight;
                } // 如果上面不够放，则向下（优先）


                if (top < marginSize) {
                  panelPlacement = 'bottom';
                  top = boundingTop + targetHeight;
                }
              } // 如果溢出右边


              if (left + panelWidth + marginSize > visibleWidth) {
                left -= left + panelWidth + marginSize - visibleWidth;
              } // 如果溢出左边


              if (left < marginSize) {
                left = marginSize;
              }

              Object.assign(panelStyle, {
                left: "".concat(left, "px"),
                top: "".concat(top, "px"),
                minWidth: "".concat(targetWidth, "px")
              });
            } else {
              if (placement === 'top') {
                panelPlacement = 'top';
                panelStyle.bottom = "".concat(targetHeight, "px");
              } else if (!placement) {
                // 如果下面不够放，则向上
                if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                  // 如果上面不够放，则向下（优先）
                  if (boundingTop - targetHeight - panelHeight > marginSize) {
                    panelPlacement = 'top';
                    panelStyle.bottom = "".concat(targetHeight, "px");
                  }
                }
              }
            }

            _this3.panelStyle = panelStyle;
            _this3.panelPlacement = panelPlacement;
          }
        }

        return _this3.$nextTick();
      });
    }
  }
});
// CONCATENATED MODULE: ./packages/pulldown/index.js



pulldown.install = function (Vue) {
  Vue.component(pulldown.name, pulldown);
};

var Pulldown = pulldown;
/* harmony default export */ var packages_pulldown = (pulldown);
// CONCATENATED MODULE: ./packages/edit/src/mixin.js














/* harmony default export */ var edit_src_mixin = ({
  methods: {
    /**
     * 往表格中插入临时数据
     *
     * @param {*} records
     */
    _insert: function _insert(records) {
      return this.insertAt(records);
    },

    /**
     * 往表格指定行中插入临时数据
     * 如果 row 为空则从插入到顶部
     * 如果 row 为 -1 则从插入到底部
     * 如果 row 为有效行则插入到该行的位置
     * @param {Object/Array} records 新的数据
     * @param {Row} row 指定行
     */
    _insertAt: function _insertAt(records, row) {
      var _this = this,
          _editStore$insertList;

      var mergeList = this.mergeList,
          afterFullData = this.afterFullData,
          editStore = this.editStore,
          sYOpts = this.sYOpts,
          scrollYLoad = this.scrollYLoad,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;

      if (!ctor_amd_xe_utils_default.a.isArray(records)) {
        records = [records];
      }

      var newRecords = records.map(function (record) {
        return _this.defineField(Object.assign({}, record));
      });

      if (!row) {
        afterFullData.unshift.apply(afterFullData, _toConsumableArray(newRecords));
        tableFullData.unshift.apply(tableFullData, _toConsumableArray(newRecords)); // 刷新单元格合并

        mergeList.forEach(function (mergeItem) {
          var mergeRowIndex = mergeItem.row;

          if (mergeRowIndex > 0) {
            mergeItem.row = mergeRowIndex + newRecords.length;
          }
        });
      } else {
        if (row === -1) {
          afterFullData.push.apply(afterFullData, _toConsumableArray(newRecords));
          tableFullData.push.apply(tableFullData, _toConsumableArray(newRecords)); // 刷新单元格合并

          mergeList.forEach(function (mergeItem) {
            var mergeRowIndex = mergeItem.row,
                mergeRowspan = mergeItem.rowspan;

            if (mergeRowIndex + mergeRowspan > afterFullData.length) {
              mergeItem.rowspan = mergeRowspan + newRecords.length;
            }
          });
        } else {
          if (treeConfig) {
            throw new Error(UtilTools.getLog('vxe.error.noTree', ['insert']));
          }

          var afIndex = afterFullData.indexOf(row);

          if (afIndex === -1) {
            throw new Error(UtilTools.error('vxe.error.unableInsert'));
          }

          afterFullData.splice.apply(afterFullData, [afIndex, 0].concat(_toConsumableArray(newRecords)));
          tableFullData.splice.apply(tableFullData, [tableFullData.indexOf(row), 0].concat(_toConsumableArray(newRecords))); // 刷新单元格合并

          mergeList.forEach(function (mergeItem) {
            var mergeRowIndex = mergeItem.row,
                mergeRowspan = mergeItem.rowspan;

            if (mergeRowIndex > afIndex) {
              mergeItem.row = mergeRowIndex + newRecords.length;
            } else if (mergeRowIndex + mergeRowspan > afIndex) {
              mergeItem.rowspan = mergeRowspan + newRecords.length;
            }
          });
        }
      }

      (_editStore$insertList = editStore.insertList).unshift.apply(_editStore$insertList, _toConsumableArray(newRecords));

      this.scrollYLoad = !treeConfig && sYOpts.gt > -1 && sYOpts.gt < tableFullData.length;
      this.handleTableData();
      this.updateFooter();
      this.updateCache();
      this.checkSelectionStatus();

      if (scrollYLoad) {
        this.updateScrollYSpace();
      }

      return this.$nextTick().then(function () {
        _this.recalculate();

        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        };
      });
    },

    /**
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     * 如果为空则删除所有
     */
    _remove: function _remove(rows) {
      var _this2 = this;

      var afterFullData = this.afterFullData,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          mergeList = this.mergeList,
          editStore = this.editStore,
          checkboxOpts = this.checkboxOpts,
          selection = this.selection,
          isInsertByRow = this.isInsertByRow,
          sYOpts = this.sYOpts,
          scrollYLoad = this.scrollYLoad;
      var actived = editStore.actived,
          removeList = editStore.removeList,
          insertList = editStore.insertList;
      var property = checkboxOpts.checkField;
      var rest = [];

      if (!rows) {
        rows = tableFullData;
      } else if (!ctor_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      } // 如果是新增，则保存记录


      rows.forEach(function (row) {
        if (!isInsertByRow(row)) {
          removeList.push(row);
        }
      }); // 如果绑定了多选属性，则更新状态

      if (!property) {
        rows.forEach(function (row) {
          var sIndex = selection.indexOf(row);

          if (sIndex > -1) {
            selection.splice(sIndex, 1);
          }
        });
      } // 从数据源中移除


      if (tableFullData === rows) {
        rows = rest = tableFullData.slice(0);
        this.tableFullData = [];
        this.afterFullData = [];
        this.clearMergeCells();
      } else {
        rows.forEach(function (row) {
          var tfIndex = tableFullData.indexOf(row);

          if (tfIndex > -1) {
            var rItems = tableFullData.splice(tfIndex, 1);
            rest.push(rItems[0]);
          }

          var afIndex = afterFullData.indexOf(row);

          if (afIndex > -1) {
            // 刷新单元格合并
            mergeList.forEach(function (mergeItem) {
              var mergeRowIndex = mergeItem.row,
                  mergeRowspan = mergeItem.rowspan;

              if (mergeRowIndex > afIndex) {
                mergeItem.row = mergeRowIndex - 1;
              } else if (mergeRowIndex + mergeRowspan > afIndex) {
                mergeItem.rowspan = mergeRowspan - 1;
              }
            });
            afterFullData.splice(afIndex, 1);
          }
        });
      } // 如果当前行被激活编辑，则清除激活状态


      if (actived.row && rows.indexOf(actived.row) > -1) {
        this.clearActived();
      } // 从新增中移除已删除的数据


      rows.forEach(function (row) {
        var iIndex = insertList.indexOf(row);

        if (iIndex > -1) {
          insertList.splice(iIndex, 1);
        }
      });
      this.scrollYLoad = !treeConfig && sYOpts.gt > -1 && sYOpts.gt < tableFullData.length;
      this.handleTableData();
      this.updateFooter();
      this.updateCache();
      this.checkSelectionStatus();

      if (scrollYLoad) {
        this.updateScrollYSpace();
      }

      return this.$nextTick().then(function () {
        _this2.recalculate();

        return {
          row: rest.length ? rest[rest.length - 1] : null,
          rows: rest
        };
      });
    },

    /**
     * 删除复选框选中的数据
     */
    _removeCheckboxRow: function _removeCheckboxRow() {
      var _this3 = this;

      return this.remove(this.getCheckboxRecords()).then(function (params) {
        _this3.clearCheckboxRow();

        return params;
      });
    },

    /**
     * 删除单选框选中的数据
     */
    _removeRadioRow: function _removeRadioRow() {
      var _this4 = this;

      var radioRecord = this.getRadioRecord();
      return this.remove(radioRecord || []).then(function (params) {
        _this4.clearRadioRow();

        return params;
      });
    },

    /**
     * 删除当前行选中的数据
     */
    _removeCurrentRow: function _removeCurrentRow() {
      var _this5 = this;

      var currentRecord = this.getCurrentRecord();
      return this.remove(currentRecord || []).then(function (params) {
        _this5.clearCurrentRow();

        return params;
      });
    },

    /**
     * 获取表格数据集，包含新增、删除、修改
     */
    _getRecordset: function _getRecordset() {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      };
    },

    /**
     * 获取新增的临时数据
     */
    _getInsertRecords: function _getInsertRecords() {
      var insertList = this.editStore.insertList;
      var insertRecords = [];

      if (insertList.length) {
        this.tableFullData.forEach(function (row) {
          if (insertList.indexOf(row) > -1) {
            insertRecords.push(row);
          }
        });
      }

      return insertRecords;
    },

    /**
     * 获取已删除的数据
     */
    _getRemoveRecords: function _getRemoveRecords() {
      return this.editStore.removeList;
    },

    /**
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    _getUpdateRecords: function _getUpdateRecords() {
      var keepSource = this.keepSource,
          tableFullData = this.tableFullData,
          isUpdateByRow = this.isUpdateByRow,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;

      if (keepSource) {
        if (treeConfig) {
          return ctor_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
            return isUpdateByRow(row);
          }, treeOpts);
        }

        return tableFullData.filter(function (row) {
          return isUpdateByRow(row);
        });
      }

      return [];
    },

    /**
     * 处理激活编辑
     */
    handleActived: function handleActived(params, evnt) {
      var _this6 = this;

      var editStore = this.editStore,
          editOpts = this.editOpts,
          tableColumn = this.tableColumn;
      var mode = editOpts.mode,
          activeMethod = editOpts.activeMethod;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender && cell) {
        if (actived.row !== row || (mode === 'cell' ? actived.column !== column : false)) {
          // 判断是否禁用编辑
          var type = 'edit-disabled';

          if (!activeMethod || activeMethod(params)) {
            if (this.mouseConfig) {
              this.clearSelected(evnt);
              this.clearCellAreas(evnt);
              this.clearCopyCellArea(evnt);
            }

            this.clostTooltip();
            this.clearActived(evnt);
            type = 'edit-actived';
            column.renderHeight = cell.offsetHeight;
            actived.args = params;
            actived.row = row;
            actived.column = column;

            if (mode === 'row') {
              tableColumn.forEach(function (column) {
                return _this6._getColumnModel(row, column);
              });
            } else {
              this._getColumnModel(row, column);
            }

            this.$nextTick(function () {
              _this6.handleFocus(params, evnt);
            });
          }

          this.emitEvent(type, params, evnt);
        } else {
          var oldColumn = actived.column;

          if (oldColumn !== column) {
            var oldModel = oldColumn.model;

            if (oldModel.update) {
              UtilTools.setCellValue(row, oldColumn, oldModel.value);
            }

            this.clearValidate();
          }

          column.renderHeight = cell.offsetHeight;
          actived.args = params;
          actived.column = column;
          setTimeout(function () {
            _this6.handleFocus(params, evnt);
          });
        }

        this.focus();
      }

      return this.$nextTick();
    },
    _getColumnModel: function _getColumnModel(row, column) {
      var model = column.model,
          editRender = column.editRender;

      if (editRender) {
        model.value = UtilTools.getCellValue(row, column);
        model.update = false;
      }
    },
    _setColumnModel: function _setColumnModel(row, column) {
      var model = column.model,
          editRender = column.editRender;

      if (editRender && model.update) {
        UtilTools.setCellValue(row, column, model.value);
        model.update = false;
        model.value = null;
      }
    },

    /**
     * 清除激活的编辑
     */
    _clearActived: function _clearActived(evnt) {
      var _this7 = this;

      var tableColumn = this.tableColumn,
          editStore = this.editStore,
          editOpts = this.editOpts;
      var actived = editStore.actived;
      var args = actived.args,
          row = actived.row,
          column = actived.column;

      if (row || column) {
        if (editOpts.mode === 'row') {
          tableColumn.forEach(function (column) {
            return _this7._setColumnModel(row, column);
          });
        } else {
          this._setColumnModel(row, column);
        }

        this.updateFooter();
        this.emitEvent('edit-closed', args, evnt);
      }

      actived.args = null;
      actived.row = null;
      actived.column = null;
      return (v_x_e_table._valid ? this.clearValidate() : this.$nextTick()).then(this.recalculate);
    },
    _getActiveRecord: function _getActiveRecord() {
      var $el = this.$el,
          editStore = this.editStore,
          afterFullData = this.afterFullData;
      var _editStore$actived = editStore.actived,
          args = _editStore$actived.args,
          row = _editStore$actived.row;

      if (args && afterFullData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args);
      }

      return null;
    },

    /**
     * 判断行是否为激活编辑状态
     * @param {Row} row 行对象
     */
    _isActiveByRow: function _isActiveByRow(row) {
      return this.editStore.actived.row === row;
    },

    /**
     * 处理聚焦
     */
    handleFocus: function handleFocus(params) {
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender) {
        var compRender = v_x_e_table.renderer.get(editRender.name);
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
          inputElem.focus();

          if (autoselect) {
            inputElem.select();
          } else {
            // 保持一致行为，光标移到末端
            if (DomTools.browse.msie) {
              var textRange = inputElem.createTextRange();
              textRange.collapse(false);
              textRange.select();
            }
          }
        } else {
          // 显示到可视区中
          this.scrollToRow(row, column);
        }
      }
    },

    /**
     * 激活行编辑
     */
    _setActiveRow: function _setActiveRow(row) {
      return this.setActiveCell(row, ctor_amd_xe_utils_default.a.find(this.visibleColumn, function (column) {
        return column.editRender;
      }).property);
    },

    /**
     * 激活单元格编辑
     */
    _setActiveCell: function _setActiveCell(row, field) {
      var _this8 = this;

      return this.scrollToRow(row, true).then(function () {
        if (row && field) {
          var column = ctor_amd_xe_utils_default.a.find(_this8.visibleColumn, function (column) {
            return column.property === field;
          });

          if (column && column.editRender) {
            var cell = _this8.getCell(row, column);

            if (cell) {
              _this8.handleActived({
                row: row,
                rowIndex: _this8.getRowIndex(row),
                column: column,
                columnIndex: _this8.getColumnIndex(column),
                cell: cell,
                $table: _this8
              });

              _this8.lastCallTime = Date.now();
            }
          }
        }

        return _this8.$nextTick();
      });
    },

    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    _setSelectCell: function _setSelectCell(row, field) {
      var tableData = this.tableData,
          editOpts = this.editOpts,
          visibleColumn = this.visibleColumn;

      if (row && field && editOpts.trigger !== 'manual') {
        var column = ctor_amd_xe_utils_default.a.find(visibleColumn, function (column) {
          return column.property === field;
        });
        var rowIndex = tableData.indexOf(row);

        if (rowIndex > -1 && column) {
          var cell = this.getCell(row, column);
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
     * 处理选中源
     */
    handleSelected: function handleSelected(params, evnt) {
      var _this9 = this;

      var mouseConfig = this.mouseConfig,
          mouseOpts = this.mouseOpts,
          editOpts = this.editOpts,
          editStore = this.editStore;
      var actived = editStore.actived,
          selected = editStore.selected;
      var row = params.row,
          column = params.column;
      var isMouseSelected = mouseConfig && mouseOpts.selected;

      var selectMethod = function selectMethod() {
        if (isMouseSelected && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editOpts.mode === 'cell' ? actived.column !== column : false)) {
            _this9.clearActived(evnt);

            _this9.clearSelected(evnt);

            _this9.clearCellAreas(evnt);

            _this9.clearCopyCellArea(evnt);

            selected.args = params;
            selected.row = row;
            selected.column = column;

            if (isMouseSelected) {
              _this9.addColSdCls();
            }

            _this9.focus();
          }
        }

        return _this9.$nextTick();
      };

      return selectMethod();
    },

    /**
     * 获取选中的单元格
     */
    _getSelectedCell: function _getSelectedCell() {
      var _this$editStore$selec = this.editStore.selected,
          args = _this$editStore$selec.args,
          column = _this$editStore$selec.column;

      if (args && column) {
        return Object.assign({}, args);
      }

      return null;
    },

    /**
     * 清除所选中源状态
     */
    _clearSelected: function _clearSelected() {
      var selected = this.editStore.selected;
      selected.row = null;
      selected.column = null;
      this.reColTitleSdCls();
      this.reColSdCls();
      return this.$nextTick();
    },
    reColTitleSdCls: function reColTitleSdCls() {
      var headerElem = this.elemStore['main-header-list'];

      if (headerElem) {
        ctor_amd_xe_utils_default.a.arrayEach(headerElem.querySelectorAll('.col--title-selected'), function (elem) {
          return DomTools.removeClass(elem, 'col--title-selected');
        });
      }
    },
    reColSdCls: function reColSdCls() {
      var cell = this.$el.querySelector('.col--selected');

      if (cell) {
        DomTools.removeClass(cell, 'col--selected');
      }
    },
    addColSdCls: function addColSdCls() {
      var selected = this.editStore.selected;
      var row = selected.row,
          column = selected.column;
      this.reColSdCls();

      if (row && column) {
        var cell = this.getCell(row, column);

        if (cell) {
          DomTools.addClass(cell, 'col--selected');
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/edit/index.js



var Edit = {
  install: function install() {
    v_x_e_table.reg('edit');
    packages_table.mixins.push(edit_src_mixin);
  }
};
/* harmony default export */ var edit = (Edit);
// CONCATENATED MODULE: ./packages/export/src/export-panel.js












/* harmony default export */ var export_panel = ({
  name: 'VxeExportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    VxeModal: modal,
    VxeInput: input,
    VxeCheckbox: src_checkbox,
    VxeSelect: src_select,
    VxeOption: src_option
  },
  data: function data() {
    return {
      isAll: false,
      isIndeterminate: false,
      loading: false
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    showSheet: function showSheet() {
      return ['html', 'xml', 'xlsx'].indexOf(this.defaultOptions.type) > -1;
    }
  },
  render: function render(h) {
    var _this = this;

    var _e = this._e,
        isAll = this.isAll,
        isIndeterminate = this.isIndeterminate,
        showSheet = this.showSheet,
        defaultOptions = this.defaultOptions,
        storeData = this.storeData;
    var cols = [];
    ctor_amd_xe_utils_default.a.eachTree(storeData.columns, function (column) {
      var colTitle = UtilTools.formatText(column.getTitle(), 1);
      var isColGroup = column.children && column.children.length;
      cols.push(h('li', {
        class: ['vxe-export--panel-column-option', "level--".concat(column.level), {
          'is--group': isColGroup,
          'is--checked': column.checked,
          'is--indeterminate': column.halfChecked,
          'is--disabled': column.disabled
        }],
        attrs: {
          title: colTitle
        },
        on: {
          click: function click() {
            if (!column.disabled) {
              _this.changeOption(column);
            }
          }
        }
      }, [h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
      }), h('span', {
        class: 'vxe-checkbox--label'
      }, colTitle)]));
    });
    return h('vxe-modal', {
      res: 'modal',
      props: {
        value: storeData.visible,
        title: conf.i18n('vxe.export.expTitle'),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      },
      on: {
        input: function input(value) {
          storeData.visible = value;
        },
        show: this.showEvent
      }
    }, [h('div', {
      class: 'vxe-export--panel'
    }, [h('table', {
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [h('tbody', [[h('tr', [h('td', conf.i18n('vxe.export.expName')), h('td', [h('vxe-input', {
      ref: 'filename',
      props: {
        value: defaultOptions.filename,
        type: 'text',
        clearable: true,
        placeholder: conf.i18n('vxe.export.expNamePlaceholder')
      },
      on: {
        input: function input(value) {
          defaultOptions.filename = value;
        }
      }
    })])]), h('tr', [h('td', conf.i18n('vxe.export.expType')), h('td', [h('vxe-select', {
      props: {
        value: defaultOptions.type
      },
      on: {
        input: function input(value) {
          defaultOptions.type = value;
        }
      }
    }, storeData.typeList.map(function (item) {
      return h('vxe-option', {
        props: {
          value: item.value,
          label: conf.i18n(item.label)
        }
      });
    }))])]), showSheet ? h('tr', [h('td', conf.i18n('vxe.export.expSheetName')), h('td', [h('vxe-input', {
      props: {
        value: defaultOptions.sheetName,
        type: 'text',
        clearable: true,
        placeholder: conf.i18n('vxe.export.expSheetNamePlaceholder')
      },
      on: {
        input: function input(value) {
          defaultOptions.sheetName = value;
        }
      }
    })])]) : _e(), h('tr', [h('td', conf.i18n('vxe.export.expMode')), h('td', [h('vxe-select', {
      props: {
        value: defaultOptions.mode
      },
      on: {
        input: function input(value) {
          defaultOptions.mode = value;
        }
      }
    }, storeData.modeList.map(function (item) {
      return h('vxe-option', {
        props: {
          value: item.value,
          label: conf.i18n(item.label)
        }
      });
    }))])]), h('tr', [h('td', [conf.i18n('vxe.export.expColumn')]), h('td', [h('div', {
      class: 'vxe-export--panel-column'
    }, [h('ul', {
      class: 'vxe-export--panel-column-header'
    }, [h('li', {
      class: ['vxe-export--panel-column-option', {
        'is--checked': isAll,
        'is--indeterminate': isIndeterminate
      }],
      attrs: {
        title: conf.i18n('vxe.table.allTitle')
      },
      on: {
        click: this.allColumnEvent
      }
    }, [h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
    }), h('span', {
      class: 'vxe-checkbox--label'
    }, conf.i18n('vxe.export.expCurrentColumn'))])]), h('ul', {
      class: 'vxe-export--panel-column-body'
    }, cols)])])]), h('tr', [h('td', conf.i18n('vxe.export.expOpts')), h('td', [h('vxe-checkbox', {
      props: {
        value: defaultOptions.isHeader,
        title: conf.i18n('vxe.export.expHeaderTitle')
      },
      on: {
        input: function input(value) {
          defaultOptions.isHeader = value;
        }
      }
    }, conf.i18n('vxe.export.expOptHeader')), h('vxe-checkbox', {
      props: {
        value: defaultOptions.isFooter,
        disabled: !storeData.hasFooter,
        title: conf.i18n('vxe.export.expFooterTitle')
      },
      on: {
        input: function input(value) {
          defaultOptions.isFooter = value;
        }
      }
    }, conf.i18n('vxe.export.expOptFooter')), h('vxe-checkbox', {
      props: {
        value: defaultOptions.original,
        title: conf.i18n('vxe.export.expOriginalTitle')
      },
      on: {
        input: function input(value) {
          defaultOptions.original = value;
        }
      }
    }, conf.i18n('vxe.export.expOptOriginal'))])])]])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [defaultOptions.isPrint ? h('vxe-button', {
      on: {
        click: this.printEvent
      }
    }, conf.i18n('vxe.export.expPrint')) : null, h('vxe-button', {
      props: {
        status: 'primary'
      },
      on: {
        click: this.exportEvent
      }
    }, conf.i18n('vxe.export.expConfirm'))])])]);
  },
  methods: {
    changeOption: function changeOption(column) {
      var isChecked = !column.checked;
      ctor_amd_xe_utils_default.a.eachTree([column], function (item) {
        item.checked = isChecked;
        item.halfChecked = false;
      });
      this.handleOptionCheck(column);
      this.checkStatus();
    },
    handleOptionCheck: function handleOptionCheck(column) {
      var matchObj = ctor_amd_xe_utils_default.a.findTree(this.storeData.columns, function (item) {
        return item === column;
      });

      if (matchObj && matchObj.parent) {
        var parent = matchObj.parent;

        if (parent.children && parent.children.length) {
          parent.checked = parent.children.every(function (column) {
            return column.checked;
          });
          parent.halfChecked = !parent.checked && parent.children.some(function (column) {
            return column.checked || column.halfChecked;
          });
          this.handleOptionCheck(parent);
        }
      }
    },
    checkStatus: function checkStatus() {
      var columns = this.storeData.columns;
      this.isAll = columns.every(function (column) {
        return column.disabled || column.checked;
      });
      this.isIndeterminate = !this.isAll && columns.some(function (column) {
        return !column.disabled && (column.checked || column.halfChecked);
      });
    },
    allColumnEvent: function allColumnEvent() {
      var isAll = !this.isAll;
      ctor_amd_xe_utils_default.a.eachTree(this.storeData.columns, function (column) {
        if (!column.disabled) {
          column.checked = isAll;
          column.halfChecked = false;
        }
      });
      this.isAll = isAll;
      this.checkStatus();
    },
    showEvent: function showEvent() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.$refs.filename.focus();
      });
      this.checkStatus();
    },
    getExportOption: function getExportOption() {
      var storeData = this.storeData,
          defaultOptions = this.defaultOptions;
      var checkColumns = [];
      ctor_amd_xe_utils_default.a.eachTree(storeData.columns, function (column) {
        var isColGroup = column.children && column.children.length;

        if (!isColGroup && column.checked) {
          checkColumns.push(column);
        }
      });
      return Object.assign({
        columns: checkColumns
      }, defaultOptions);
    },
    printEvent: function printEvent() {
      var $xetable = this.$parent;
      this.storeData.visible = false;
      $xetable.print(Object.assign({}, $xetable.printOpts, this.getExportOption()));
    },
    exportEvent: function exportEvent() {
      var _this3 = this;

      var $xetable = this.$parent;
      this.loading = true;
      $xetable.exportData(Object.assign({}, $xetable.exportOpts, this.getExportOption())).then(function () {
        _this3.loading = false;
        _this3.storeData.visible = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./packages/export/src/import-panel.js









/* harmony default export */ var import_panel = ({
  name: 'VxeImportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    VxeModal: modal,
    VxeRadio: src_radio
  },
  data: function data() {
    return {
      loading: false
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    selectName: function selectName() {
      return "".concat(this.storeData.filename, ".").concat(this.storeData.type);
    },
    hasFile: function hasFile() {
      return this.storeData.file && this.storeData.type;
    },
    parseTypeLabel: function parseTypeLabel() {
      var storeData = this.storeData;
      var type = storeData.type,
          typeList = storeData.typeList;

      if (type) {
        var selectItem = ctor_amd_xe_utils_default.a.find(typeList, function (item) {
          return type === item.value;
        });
        return selectItem ? conf.i18n(selectItem.label) : '*.*';
      }

      return "*.".concat(typeList.map(function (item) {
        return item.value;
      }).join(', *.'));
    }
  },
  render: function render(h) {
    var hasFile = this.hasFile,
        parseTypeLabel = this.parseTypeLabel,
        defaultOptions = this.defaultOptions,
        storeData = this.storeData,
        selectName = this.selectName;
    return h('vxe-modal', {
      res: 'modal',
      props: {
        value: storeData.visible,
        title: conf.i18n('vxe.import.impTitle'),
        width: 440,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      },
      on: {
        input: function input(value) {
          storeData.visible = value;
        }
      }
    }, [h('div', {
      class: 'vxe-export--panel'
    }, [h('table', {
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [h('tbody', [h('tr', [h('td', conf.i18n('vxe.import.impFile')), h('td', [hasFile ? h('div', {
      class: 'vxe-import-selected--file',
      attrs: {
        title: selectName
      }
    }, [h('span', selectName), h('i', {
      class: conf.icon.INPUT_CLEAR,
      on: {
        click: this.clearFileEvent
      }
    })]) : h('span', {
      class: 'vxe-import-select--file',
      on: {
        click: this.selectFileEvent
      }
    }, conf.i18n('vxe.import.impSelect'))])]), h('tr', [h('td', conf.i18n('vxe.import.impType')), h('td', parseTypeLabel)]), h('tr', [h('td', conf.i18n('vxe.import.impOpts')), h('td', [h('vxe-radio-group', {
      props: {
        value: defaultOptions.mode
      },
      on: {
        input: function input(value) {
          defaultOptions.mode = value;
        }
      }
    }, storeData.modeList.map(function (item) {
      return h('vxe-radio', {
        props: {
          label: item.value
        }
      }, conf.i18n(item.label));
    }))])])])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [h('vxe-button', {
      props: {
        status: 'primary',
        disabled: !hasFile
      },
      on: {
        click: this.importEvent
      }
    }, conf.i18n('vxe.import.impConfirm'))])])]);
  },
  methods: {
    clearFileEvent: function clearFileEvent() {
      Object.assign(this.storeData, {
        filename: '',
        sheetName: '',
        type: ''
      });
    },
    selectFileEvent: function selectFileEvent() {
      var _this = this;

      var $xetable = this.$parent;
      $xetable.readFile(this.defaultOptions).then(function (evnt) {
        var file = evnt.target.files[0];
        Object.assign(_this.storeData, UtilTools.parseFile(file), {
          file: file
        });
      }).catch(function (e) {
        return e;
      });
    },
    importEvent: function importEvent() {
      var _this2 = this;

      var $xetable = this.$parent;
      this.loading = true;
      $xetable.importByFile(this.storeData.file, Object.assign({}, $xetable.importOpts, this.defaultOptions)).then(function () {
        _this2.loading = false;
        _this2.storeData.visible = false;
      });
    }
  }
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__("2b3d");

// CONCATENATED MODULE: ./packages/export/src/mixin.js
























var mixin_formatText = UtilTools.formatText; // 默认导出或打印的 HTML 样式

var defaultHtmlStyle = 'body{margin:0}body *{-webkit-box-sizing:border-box;box-sizing:border-box}.vxe-table{border:0;border-collapse:separate;text-align:left;font-size:14px;border-spacing:0}.vxe-table:not(.is--print){table-layout:fixed}.vxe-table.is--print{width:100%}.vxe-table.border--default,.vxe-table.border--full,.vxe-table.border--outer{border-top:1px solid #e8eaec}.vxe-table.border--default,.vxe-table.border--full,.vxe-table.border--outer{border-left:1px solid #e8eaec}.vxe-table.border--outer,.vxe-table.border--default th,.vxe-table.border--default td,.vxe-table.border--full th,.vxe-table.border--full td,.vxe-table.border--outer th,.vxe-table.border--inner th,.vxe-table.border--inner td{border-bottom:1px solid #e8eaec}.vxe-table.border--default,.vxe-table.border--outer,.vxe-table.border--full th,.vxe-table.border--full td{border-right:1px solid #e8eaec}.vxe-table.border--default th,.vxe-table.border--full th,.vxe-table.border--outer th{background-color:#f8f8f9}.vxe-table td>div,.vxe-table th>div{padding:.5em .4em}.col--center{text-align:center}.col--right{text-align:right}.vxe-table:not(.is--print) .col--ellipsis>div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:break-all}.vxe-table--tree-node{text-align:left}.vxe-table--tree-node-wrapper{position:relative}.vxe-table--tree-icon-wrapper{position:absolute;top:50%;width:1em;height:1em;text-align:center;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vxe-table--tree-icon{position:absolute;left:0;top:.3em;width:0;height:0;border-style:solid;border-width:.5em;border-top-color:#939599;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vxe-table--tree-cell{display:block;padding-left:1.5em}.vxe-table input[type="checkbox"]{margin:0}.vxe-table input[type="checkbox"],.vxe-table input[type="radio"],.vxe-table input[type="checkbox"]+span,.vxe-table input[type="radio"]+span{vertical-align:middle;padding-left: 0.4em}';
var htmlCellElem; // 导入

var fileForm;
var fileInput; // 打印

var printFrame;

function createFrame() {
  var frame = document.createElement('iframe');
  frame.className = 'vxe-table--print-frame';
  return frame;
}

function getExportBlobByContent(content, options) {
  if (window.Blob) {
    return new Blob([content], {
      type: "text/".concat(options.type)
    });
  }

  return null;
}

function hasTreeChildren($xetable, row) {
  var treeOpts = $xetable.treeOpts;
  return row[treeOpts.children] && row[treeOpts.children].length;
}

function getSeq($xetable, row, rowIndex, column, columnIndex) {
  var seqOpts = $xetable.seqOpts;
  var seqMethod = seqOpts.seqMethod || column.seqMethod;
  return seqMethod ? seqMethod({
    row: row,
    rowIndex: rowIndex,
    column: column,
    columnIndex: columnIndex
  }) : seqOpts.startIndex + rowIndex + 1;
}

function defaultFilterExportColumn(column) {
  return column.property || ['seq', 'checkbox', 'radio'].indexOf(column.type) > -1;
}

function toTableBorder(border) {
  if (border === true) {
    return 'full';
  }

  if (border) {
    return border;
  }

  return 'default';
}

function getLabelData($xetable, opts, columns, datas) {
  var treeConfig = $xetable.treeConfig,
      treeOpts = $xetable.treeOpts,
      radioOpts = $xetable.radioOpts,
      checkboxOpts = $xetable.checkboxOpts;

  if (!htmlCellElem) {
    htmlCellElem = document.createElement('div');
  }

  if (treeConfig) {
    // 如果是树表格只允许导出数据源
    var rest = [];
    ctor_amd_xe_utils_default.a.eachTree(datas, function (row, rowIndex, items, path, parent, nodes) {
      var item = {
        _level: nodes.length - 1,
        _hasChild: hasTreeChildren($xetable, row)
      };
      columns.forEach(function (column, columnIndex) {
        var cellValue = '';
        var renderOpts = column.editRender || column.cellRender;
        var exportLabelMethod = column.exportMethod;

        if (!exportLabelMethod && renderOpts && renderOpts.name) {
          var compConf = v_x_e_table.renderer.get(renderOpts.name);

          if (compConf) {
            exportLabelMethod = compConf.exportMethod || compConf.cellExportMethod;
          }
        }

        if (exportLabelMethod) {
          cellValue = exportLabelMethod({
            $table: $xetable,
            row: row,
            column: column
          });
        } else {
          switch (column.type) {
            case 'seq':
              cellValue = getSeq($xetable, row, rowIndex, column, columnIndex);
              break;

            case 'checkbox':
              cellValue = $xetable.isCheckedByCheckboxRow(row);
              item._checkboxLabel = checkboxOpts.labelField ? ctor_amd_xe_utils_default.a.get(row, checkboxOpts.labelField) : '';
              item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({
                row: row
              });
              break;

            case 'radio':
              cellValue = $xetable.isCheckedByRadioRow(row);
              item._radioLabel = radioOpts.labelField ? ctor_amd_xe_utils_default.a.get(row, radioOpts.labelField) : '';
              item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({
                row: row
              });
              break;

            default:
              if (opts.original) {
                cellValue = UtilTools.getCellValue(row, column);
              } else {
                cellValue = UtilTools.getCellLabel(row, column, {
                  $table: $xetable
                });

                if (column.type === 'html') {
                  htmlCellElem.innerHTML = cellValue;
                  cellValue = htmlCellElem.innerText.trim();
                }
              }

          }
        }

        item[column.id] = ctor_amd_xe_utils_default.a.toString(cellValue);
      });
      rest.push(Object.assign(item, row));
    }, treeOpts);
    return rest;
  }

  return datas.map(function (row, rowIndex) {
    var item = {};
    columns.forEach(function (column, columnIndex) {
      var cellValue = '';
      var renderOpts = column.editRender || column.cellRender;
      var exportLabelMethod = column.exportMethod;

      if (!exportLabelMethod && renderOpts && renderOpts.name) {
        var compConf = v_x_e_table.renderer.get(renderOpts.name);

        if (compConf) {
          exportLabelMethod = compConf.exportMethod || compConf.cellExportMethod;
        }
      }

      if (exportLabelMethod) {
        cellValue = exportLabelMethod({
          $table: $xetable,
          row: row,
          column: column
        });
      } else {
        switch (column.type) {
          case 'seq':
            cellValue = getSeq($xetable, row, rowIndex, column, columnIndex);
            break;

          case 'checkbox':
            cellValue = $xetable.isCheckedByCheckboxRow(row);
            item._checkboxLabel = checkboxOpts.labelField ? ctor_amd_xe_utils_default.a.get(row, checkboxOpts.labelField) : '';
            item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({
              row: row
            });
            break;

          case 'radio':
            cellValue = $xetable.isCheckedByRadioRow(row);
            item._radioLabel = radioOpts.labelField ? ctor_amd_xe_utils_default.a.get(row, radioOpts.labelField) : '';
            item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({
              row: row
            });
            break;

          default:
            if (opts.original) {
              cellValue = UtilTools.getCellValue(row, column);
            } else {
              cellValue = UtilTools.getCellLabel(row, column, {
                $table: $xetable
              });

              if (column.type === 'html') {
                htmlCellElem.innerHTML = cellValue;
                cellValue = htmlCellElem.innerText.trim();
              }
            }

        }
      }

      item[column.id] = ctor_amd_xe_utils_default.a.toString(cellValue);
    });
    return item;
  });
}

function getExportData($xetable, opts) {
  var columnFilterMethod = opts.columnFilterMethod,
      dataFilterMethod = opts.dataFilterMethod;
  var columns = opts.columns;
  var datas = opts.data;

  if (columnFilterMethod) {
    columns = columns.filter(function (column, index) {
      return columnFilterMethod({
        column: column,
        $columnIndex: index
      });
    });
  }

  if (dataFilterMethod) {
    datas = datas.filter(function (row, index) {
      return dataFilterMethod({
        row: row,
        $rowIndex: index
      });
    });
  }

  return {
    columns: columns,
    datas: getLabelData($xetable, opts, columns, datas)
  };
}

function getHeaderTitle(opts, column) {
  return (opts.original ? column.property : column.getTitle()) || '';
}

function getFooterCellValue($xetable, opts, items, column) {
  var renderOpts = column.editRender || column.cellRender;
  var exportLabelMethod = column.footerExportMethod;

  if (!exportLabelMethod && renderOpts && renderOpts.name) {
    var compConf = v_x_e_table.renderer.get(renderOpts.name);

    if (compConf) {
      exportLabelMethod = compConf.footerExportMethod || compConf.footerCellExportMethod;
    }
  }

  var _columnIndex = $xetable._getColumnIndex(column);

  var cellValue = exportLabelMethod ? exportLabelMethod({
    $table: $xetable,
    items: items,
    itemIndex: _columnIndex,
    _columnIndex: _columnIndex,
    column: column
  }) : ctor_amd_xe_utils_default.a.toString(items[_columnIndex]);
  return cellValue;
}

function getFooterData(opts, footerData) {
  var footerFilterMethod = opts.footerFilterMethod;
  return footerFilterMethod ? footerData.filter(function (items, index) {
    return footerFilterMethod({
      items: items,
      $rowIndex: index
    });
  }) : footerData;
}

function getCsvCellTypeLabel(column, cellValue) {
  if (cellValue) {
    switch (column.cellType) {
      case 'string':
        if (!isNaN(cellValue)) {
          return '\t' + cellValue;
        }

        break;

      case 'number':
        break;

      default:
        if (cellValue.length >= 12 && !isNaN(cellValue)) {
          return '\t' + cellValue;
        }

        break;
    }
  }

  return cellValue;
}

function toCsv($xetable, opts, columns, datas) {
  var content = "\uFEFF";

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "\"".concat(getHeaderTitle(opts, column), "\"");
    }).join(',') + '\n';
  }

  datas.forEach(function (row) {
    content += columns.map(function (column) {
      return "\"".concat(getCsvCellTypeLabel(column, row[column.id]), "\"");
    }).join(',') + '\n';
  });

  if (opts.isFooter) {
    var footerData = $xetable.footerData;
    var footers = getFooterData(opts, footerData);
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "\"".concat(getFooterCellValue($xetable, opts, rows, column), "\"");
      }).join(',') + '\n';
    });
  }

  return content;
}

function toTxt($xetable, opts, columns, datas) {
  var content = '';

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "".concat(getHeaderTitle(opts, column));
    }).join('\t') + '\n';
  }

  datas.forEach(function (row) {
    content += columns.map(function (column) {
      return "".concat(row[column.id]);
    }).join('\t') + '\n';
  });

  if (opts.isFooter) {
    var footerData = $xetable.footerData;
    var footers = getFooterData(opts, footerData);
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "".concat(getFooterCellValue($xetable, opts, rows, column));
      }).join(',') + '\n';
    });
  }

  return content;
}

function mixin_hasEllipsis($xetable, column, property, allColumnOverflow) {
  var columnOverflow = column[property];
  var headOverflow = ctor_amd_xe_utils_default.a.isUndefined(columnOverflow) || ctor_amd_xe_utils_default.a.isNull(columnOverflow) ? allColumnOverflow : columnOverflow;
  var showEllipsis = headOverflow === 'ellipsis';
  var showTitle = headOverflow === 'title';
  var showTooltip = headOverflow === true || headOverflow === 'tooltip';
  var isEllipsis = showTitle || showTooltip || showEllipsis; // 虚拟滚动不支持动态高度

  if (($xetable.scrollXLoad || $xetable.scrollYLoad) && !isEllipsis) {
    isEllipsis = true;
  }

  return isEllipsis;
}

function createHtmlPage(opts, content) {
  var style = opts.style;
  return ['<!DOCTYPE html><html>', '<head>', '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">', "<title>".concat(opts.sheetName, "</title>"), "<style>".concat(defaultHtmlStyle, "</style>"), style ? "<style>".concat(style, "</style>") : '', '</head>', "<body>".concat(content, "</body>"), '</html>'].join('');
}

function toHtml($xetable, opts, columns, datas) {
  var id = $xetable.id,
      border = $xetable.border,
      treeConfig = $xetable.treeConfig,
      treeOpts = $xetable.treeOpts,
      isAllSelected = $xetable.isAllSelected,
      isIndeterminate = $xetable.isIndeterminate,
      allHeaderAlign = $xetable.headerAlign,
      allAlign = $xetable.align,
      allFooterAlign = $xetable.footerAlign,
      allColumnOverflow = $xetable.showOverflow,
      allColumnHeaderOverflow = $xetable.showHeaderOverflow;
  var isPrint = opts.print,
      isHeader = opts.isHeader,
      isFooter = opts.isFooter;
  var allCls = 'check-all';
  var clss = ['vxe-table', "border--".concat(toTableBorder(border)), isPrint ? 'is--print' : '', isHeader ? 'show--head' : ''].filter(function (cls) {
    return cls;
  });
  var body = ["<table class=\"".concat(clss.join(' '), "\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"), "<colgroup>".concat(columns.map(function (column) {
    return "<col style=\"width:".concat(column.renderWidth, "px\">");
  }).join(''), "</colgroup>")].join('');

  if (isHeader) {
    body += "<thead><tr>".concat(columns.map(function (column) {
      var headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign;
      var classNames = mixin_hasEllipsis($xetable, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : [];
      var cellTitle = getHeaderTitle(opts, column);

      if (headAlign) {
        classNames.push("col--".concat(headAlign));
      }

      if (column.type === 'checkbox') {
        return "<th class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"checkbox\" class=\"").concat(allCls, "\" ").concat(isAllSelected ? 'checked' : '', "><span>").concat(cellTitle, "</span></div></th>");
      }

      return "<th class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellTitle, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><span>").concat(mixin_formatText(cellTitle, true), "</span></div></th>");
    }).join(''), "</tr></thead>");
  }

  if (datas.length) {
    body += '<tbody>';

    if (treeConfig) {
      datas.forEach(function (item) {
        body += '<tr>' + columns.map(function (column) {
          var cellAlign = column.align || allAlign;
          var classNames = mixin_hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
          var cellValue = item[column.id];

          if (cellAlign) {
            classNames.push("col--".concat(cellAlign));
          }

          if (column.treeNode) {
            var treeIcon = '';

            if (item._hasChild) {
              treeIcon = '<i class="vxe-table--tree-icon"></i>';
            }

            classNames.push('vxe-table--tree-node');

            if (column.type === 'radio') {
              return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><div class=\"vxe-table--tree-node-wrapper\" style=\"padding-left: ").concat(item._level * treeOpts.indent, "px\"><div class=\"vxe-table--tree-icon-wrapper\">").concat(treeIcon, "</div><div class=\"vxe-table--tree-cell\"><input type=\"radio\" name=\"radio_").concat(id, "\" ").concat(item._radioDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._radioLabel, "</span></div></div></div></td>");
            } else if (column.type === 'checkbox') {
              return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><div class=\"vxe-table--tree-node-wrapper\" style=\"padding-left: ").concat(item._level * treeOpts.indent, "px\"><div class=\"vxe-table--tree-icon-wrapper\">").concat(treeIcon, "</div><div class=\"vxe-table--tree-cell\"><input type=\"checkbox\" ").concat(item._checkboxDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._checkboxLabel, "</span></div></div></div></td>");
            }

            return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><div class=\"vxe-table--tree-node-wrapper\" style=\"padding-left: ").concat(item._level * treeOpts.indent, "px\"><div class=\"vxe-table--tree-icon-wrapper\">").concat(treeIcon, "</div><div class=\"vxe-table--tree-cell\">").concat(cellValue, "</div></div></div></td>");
          }

          if (column.type === 'radio') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"radio\" name=\"radio_").concat(id, "\" ").concat(item._radioDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._radioLabel, "</span></div></td>");
          } else if (column.type === 'checkbox') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"checkbox\" ").concat(item._checkboxDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._checkboxLabel, "</span></div></td>");
          }

          return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), ">").concat(mixin_formatText(cellValue, true), "</div></td>");
        }).join('') + '</tr>';
      });
    } else {
      datas.forEach(function (item) {
        body += '<tr>' + columns.map(function (column) {
          var cellAlign = column.align || allAlign;
          var classNames = mixin_hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
          var cellValue = item[column.id];

          if (cellAlign) {
            classNames.push("col--".concat(cellAlign));
          }

          if (column.type === 'radio') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"radio\" name=\"radio_").concat(id, "\" ").concat(item._radioDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._radioLabel, "</span></div></td>");
          } else if (column.type === 'checkbox') {
            return "<td class=\"".concat(classNames.join(' '), "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), "><input type=\"checkbox\" ").concat(item._checkboxDisabled ? 'disabled ' : '').concat(cellValue === true || cellValue === 'true' ? 'checked' : '', "><span>").concat(item._checkboxLabel, "</span></div></td>");
          }

          return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), ">").concat(mixin_formatText(cellValue, true), "</div></td>");
        }).join('') + '</tr>';
      });
    }

    body += '</tbody>';
  }

  if (isFooter) {
    var footerData = $xetable.footerData;
    var footers = getFooterData(opts, footerData);

    if (footers.length) {
      body += '<tfoot>';
      footers.forEach(function (rows) {
        body += "<tr>".concat(columns.map(function (column) {
          var footAlign = column.footerAlign || column.align || allFooterAlign || allAlign;
          var classNames = mixin_hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
          var cellValue = getFooterCellValue($xetable, opts, rows, column);

          if (footAlign) {
            classNames.push("col--".concat(footAlign));
          }

          return "<td class=\"".concat(classNames.join(' '), "\" title=\"").concat(cellValue, "\"><div ").concat(isPrint ? '' : "style=\"width: ".concat(column.renderWidth, "px\""), ">").concat(mixin_formatText(cellValue, true), "</div></td>");
        }).join(''), "</tr>");
      });
      body += '</tfoot>';
    }
  } // 是否半选状态


  var script = !isAllSelected && isIndeterminate ? "<script>(function(){var a=document.querySelector(\".".concat(allCls, "\");if(a){a.indeterminate=true}})()</script>") : '';
  body += '</table>' + script;
  return isPrint ? body : createHtmlPage(opts, body);
}

function toXML($xetable, opts, columns, datas) {
  var xml = ['<?xml version="1.0"?>', '<?mso-application progid="Excel.Sheet"?>', '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">', '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">', '<Version>16.00</Version>', '</DocumentProperties>', '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">', '<WindowHeight>7920</WindowHeight>', '<WindowWidth>21570</WindowWidth>', '<WindowTopX>32767</WindowTopX>', '<WindowTopY>32767</WindowTopY>', '<ProtectStructure>False</ProtectStructure>', '<ProtectWindows>False</ProtectWindows>', '</ExcelWorkbook>', "<Worksheet ss:Name=\"".concat(opts.sheetName, "\">"), '<Table>', columns.map(function (column) {
    return "<Column ss:Width=\"".concat(column.renderWidth, "\"/>");
  }).join('')].join('');

  if (opts.isHeader) {
    xml += "<Row>".concat(columns.map(function (column) {
      return "<Cell><Data ss:Type=\"String\">".concat(getHeaderTitle(opts, column), "</Data></Cell>");
    }).join(''), "</Row>");
  }

  datas.forEach(function (row) {
    xml += '<Row>' + columns.map(function (column) {
      return "<Cell><Data ss:Type=\"String\">".concat(row[column.id], "</Data></Cell>");
    }).join('') + '</Row>';
  });

  if (opts.isFooter) {
    var footerData = $xetable.footerData;
    var footers = getFooterData(opts, footerData);
    footers.forEach(function (rows) {
      xml += "<Row>".concat(columns.map(function (column) {
        return "<Cell><Data ss:Type=\"String\">".concat(getFooterCellValue($xetable, opts, rows, column), "</Data></Cell>");
      }).join(''), "</Row>");
    });
  }

  return "".concat(xml, "</Table></Worksheet></Workbook>");
}

function getContent($xetable, opts, columns, datas) {
  if (columns.length) {
    switch (opts.type) {
      case 'csv':
        return toCsv($xetable, opts, columns, datas);

      case 'txt':
        return toTxt($xetable, opts, columns, datas);

      case 'html':
        return toHtml($xetable, opts, columns, datas);

      case 'xml':
        return toXML($xetable, opts, columns, datas);
    }
  }

  return '';
}

function downloadFile($xetable, opts, content) {
  var filename = opts.filename,
      type = opts.type,
      download = opts.download;
  var name = "".concat(filename, ".").concat(type);

  if (window.Blob) {
    var blob = getExportBlobByContent(content, opts);

    if (!download) {
      return Promise.resolve({
        type: type,
        content: content,
        blob: blob
      });
    }

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, name);
    } else {
      var linkElem = document.createElement('a');
      linkElem.target = '_blank';
      linkElem.download = name;
      linkElem.href = URL.createObjectURL(blob);
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
    }

    if (opts.message !== false) {
      v_x_e_table.modal.message({
        message: conf.i18n('vxe.table.expSuccess'),
        status: 'success'
      });
    }
  } else {
    UtilTools.error('vxe.error.notExp');
  }
}

function handleExport($xetable, opts) {
  if (opts.remote) {
    var params = {
      options: opts,
      $table: $xetable,
      $grid: $xetable.$xegrid
    };

    if (opts.exportMethod) {
      return opts.exportMethod(params);
    }

    return Promise.resolve(params);
  }

  var _getExportData = getExportData($xetable, opts),
      columns = _getExportData.columns,
      datas = _getExportData.datas;

  return Promise.resolve($xetable.preventEvent(null, 'event.export', {
    options: opts,
    columns: columns,
    datas: datas
  }, function () {
    return downloadFile($xetable, opts, getContent($xetable, opts, columns, datas));
  }));
}

function getElementsByTagName(elem, qualifiedName) {
  return elem.getElementsByTagName(qualifiedName);
}

function replaceDoubleQuotation(val) {
  return val.replace(/^"/, '').replace(/"$/, '');
}

function parseCsv(columns, content) {
  var list = content.split('\n');
  var rows = [];
  var fields = [];

  if (list.length) {
    var rList = list.slice(1);
    fields = list[0].split(',').map(replaceDoubleQuotation);
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split(',').forEach(function (val, colIndex) {
          if (fields[colIndex]) {
            item[fields[colIndex]] = replaceDoubleQuotation(val);
          }
        });
        rows.push(item);
      }
    });
  }

  return {
    fields: fields,
    rows: rows
  };
}

function parseTxt(columns, content) {
  var list = content.split('\n');
  var rows = [];
  var fields = [];

  if (list.length) {
    var rList = list.slice(1);
    fields = list[0].split('\t');
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split('\t').forEach(function (val, colIndex) {
          if (fields[colIndex]) {
            item[fields[colIndex]] = replaceDoubleQuotation(val);
          }
        });
        rows.push(item);
      }
    });
  }

  return {
    fields: fields,
    rows: rows
  };
}

function parseHTML(columns, content) {
  var domParser = new DOMParser();
  var xmlDoc = domParser.parseFromString(content, 'text/html');
  var bodyNodes = getElementsByTagName(xmlDoc, 'body');
  var rows = [];
  var fields = [];

  if (bodyNodes.length) {
    var tableNodes = getElementsByTagName(bodyNodes[0], 'table');

    if (tableNodes.length) {
      var theadNodes = getElementsByTagName(tableNodes[0], 'thead');

      if (theadNodes.length) {
        ctor_amd_xe_utils_default.a.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), function (rowNode) {
          ctor_amd_xe_utils_default.a.arrayEach(getElementsByTagName(rowNode, 'th'), function (cellNode) {
            fields.push(cellNode.textContent);
          });
        });
        var tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody');

        if (tbodyNodes.length) {
          ctor_amd_xe_utils_default.a.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), function (rowNode) {
            var item = {};
            ctor_amd_xe_utils_default.a.arrayEach(getElementsByTagName(rowNode, 'td'), function (cellNode, colIndex) {
              if (fields[colIndex]) {
                item[fields[colIndex]] = cellNode.textContent || '';
              }
            });
            rows.push(item);
          });
        }
      }
    }
  }

  return {
    fields: fields,
    rows: rows
  };
}

function parseXML(columns, content) {
  var domParser = new DOMParser();
  var xmlDoc = domParser.parseFromString(content, 'application/xml');
  var sheetNodes = getElementsByTagName(xmlDoc, 'Worksheet');
  var rows = [];
  var fields = [];

  if (sheetNodes.length) {
    var tableNodes = getElementsByTagName(sheetNodes[0], 'Table');

    if (tableNodes.length) {
      var rowNodes = getElementsByTagName(tableNodes[0], 'Row');

      if (rowNodes.length) {
        ctor_amd_xe_utils_default.a.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), function (cellNode) {
          fields.push(cellNode.textContent);
        });
        ctor_amd_xe_utils_default.a.arrayEach(rowNodes, function (rowNode, index) {
          if (index) {
            var item = {};
            var cellNodes = getElementsByTagName(rowNode, 'Cell');
            ctor_amd_xe_utils_default.a.arrayEach(cellNodes, function (cellNode, colIndex) {
              if (fields[colIndex]) {
                item[fields[colIndex]] = cellNode.textContent;
              }
            });
            rows.push(item);
          }
        });
      }
    }
  }

  return {
    fields: fields,
    rows: rows
  };
}
/**
 * 检查导入的列是否完整
 * @param {Array} fields 字段名列表
 * @param {Array} rows 数据列表
 */


function checkImportData(columns, fields) {
  var tableFields = [];
  columns.forEach(function (column) {
    var field = column.property;

    if (field) {
      tableFields.push(field);
    }
  });
  return tableFields.every(function (field) {
    return fields.indexOf(field) > -1;
  });
}

function handleImport($xetable, content, opts) {
  var tableFullColumn = $xetable.tableFullColumn,
      _importResolve = $xetable._importResolve;
  var rest = {
    fields: [],
    rows: []
  };

  switch (opts.type) {
    case 'csv':
      rest = parseCsv(tableFullColumn, content);
      break;

    case 'txt':
      rest = parseTxt(tableFullColumn, content);
      break;

    case 'html':
      rest = parseHTML(tableFullColumn, content);
      break;

    case 'xml':
      rest = parseXML(tableFullColumn, content);
      break;
  }

  var _rest = rest,
      fields = _rest.fields,
      rows = _rest.rows;
  var status = checkImportData(tableFullColumn, fields);

  if (status) {
    $xetable.createData(rows).then(function (data) {
      if (opts.mode === 'insert') {
        $xetable.insert(data);
      } else {
        $xetable.reloadData(data);
      }
    });

    if (opts.message !== false) {
      v_x_e_table.modal.message({
        message: conf.i18n('vxe.table.impSuccess', [rows.length]),
        status: 'success'
      });
    }
  } else if (opts.message !== false) {
    v_x_e_table.modal.message({
      message: conf.i18n('vxe.error.impFields'),
      status: 'error'
    });
  }

  if (_importResolve) {
    _importResolve(status);

    $xetable._importResolve = null;
  }
}

function readLocalFile() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!fileForm) {
    fileForm = document.createElement('form');
    fileInput = document.createElement('input');
    fileForm.className = 'vxe-table--file-form';
    fileInput.name = 'file';
    fileInput.type = 'file';
    fileForm.appendChild(fileInput);
    document.body.appendChild(fileForm);
  }

  var fileResolve;
  var fileReject;
  var types = options.types || v_x_e_table.importTypes;

  if (options.multiple) {
    fileInput.multiple = 'multiple';
  }

  fileInput.accept = ".".concat(types.join(', .'));

  fileInput.onchange = function (evnt) {
    var _UtilTools$parseFile = UtilTools.parseFile(evnt.target.files[0]),
        type = _UtilTools$parseFile.type;

    if (types.indexOf(type) > -1) {
      fileResolve(evnt);
    } else {
      if (options.message !== false) {
        v_x_e_table.modal.message({
          message: conf.i18n('vxe.error.notType', [type]),
          status: 'error'
        });
      }

      fileReject(evnt);
    }
  };

  fileForm.reset();
  fileInput.click();
  return new Promise(function (resolve, reject) {
    fileResolve = resolve;
    fileReject = reject;
  });
}
function handlePrint($xetable, opts, content) {
  var beforePrintMethod = opts.beforePrintMethod;

  if (beforePrintMethod) {
    content = beforePrintMethod({
      content: content,
      options: opts,
      $table: $xetable
    }) || '';
  }

  content = createHtmlPage(opts, content);
  var blob = getExportBlobByContent(content, opts);

  if (DomTools.browse.msie) {
    if (printFrame) {
      try {
        printFrame.contentDocument.write('');
        printFrame.contentDocument.clear();
      } catch (e) {}

      document.body.removeChild(printFrame);
    }

    printFrame = createFrame();
    document.body.appendChild(printFrame);
    printFrame.contentDocument.write(content);
    printFrame.contentDocument.execCommand('print');
  } else {
    if (!printFrame) {
      printFrame = createFrame();

      printFrame.onload = function (evnt) {
        if (evnt.target.src) {
          evnt.target.contentWindow.print();
        }
      };

      document.body.appendChild(printFrame);
    }

    printFrame.src = URL.createObjectURL(blob);
  }
}
/* harmony default export */ var export_src_mixin = ({
  methods: {
    /**
     * 导出文件，支持 csv/html/xml/txt
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     * @param {Object} options 参数
     */
    _exportData: function _exportData(options) {
      var _this = this;

      var $xegrid = this.$xegrid,
          visibleColumn = this.visibleColumn,
          tableFullColumn = this.tableFullColumn,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          exportOpts = this.exportOpts;
      var columns = options && options.columns;
      var expColumns = [];

      if (columns && columns.length) {
        columns.forEach(function (item) {
          var targetColumn;

          if (item) {
            if (UtilTools.isColumn(item)) {
              targetColumn = item;
            } else if (ctor_amd_xe_utils_default.a.isString(item)) {
              targetColumn = _this.getColumnByField(item);
            } else {
              var type = item.type;
              var field = item.property || item.field;

              if (field && type) {
                targetColumn = tableFullColumn.find(function (column) {
                  return column.property === field && column.type === type;
                });
              } else if (field) {
                targetColumn = _this.getColumnByField(field);
              } else if (type) {
                targetColumn = tableFullColumn.find(function (column) {
                  return column.type === type;
                });
              }
            }

            if (targetColumn) {
              expColumns.push(targetColumn);
            }
          }
        });
      } else {
        expColumns = visibleColumn;
      }

      var opts = Object.assign({
        // filename: '',
        // sheetName: '',
        // original: false,
        // message: false,
        isHeader: true,
        isFooter: true,
        download: true,
        type: 'csv',
        mode: 'current',
        // data: null,
        // remote: false,
        // dataFilterMethod: null,
        // footerFilterMethod: null,
        // exportMethod: null,
        columnFilterMethod: columns && columns.length ? null : function (_ref) {
          var column = _ref.column;
          return defaultFilterExportColumn(column);
        }
      }, exportOpts, {
        print: false
      }, options, {
        columns: expColumns
      });

      if (!opts.filename) {
        opts.filename = conf.i18n(opts.original ? 'vxe.table.expOriginFilename' : 'vxe.table.expFilename', [ctor_amd_xe_utils_default.a.toDateString(Date.now(), 'yyyyMMddHHmmss')]);
      }

      if (!opts.sheetName) {
        opts.sheetName = document.title;
      }

      if (v_x_e_table.exportTypes.indexOf(opts.type) === -1) {
        throw new Error(UtilTools.getLog('vxe.error.notType', [opts.type]));
      }

      if (!opts.data) {
        opts.data = tableFullData;

        if (opts.mode === 'selected') {
          var selectRecords = this.getCheckboxRecords();

          if (['html', 'pdf'].indexOf(opts.type) > -1 && treeConfig) {
            opts.data = ctor_amd_xe_utils_default.a.searchTree(this.getTableData().fullData, function (item) {
              return selectRecords.indexOf(item) > -1;
            }, treeOpts);
          } else {
            opts.data = selectRecords;
          }
        } else if (opts.mode === 'all') {
          if ($xegrid && !opts.remote) {
            var _$xegrid$proxyOpts = $xegrid.proxyOpts,
                beforeQueryAll = _$xegrid$proxyOpts.beforeQueryAll,
                afterQueryAll = _$xegrid$proxyOpts.afterQueryAll,
                _$xegrid$proxyOpts$aj = _$xegrid$proxyOpts.ajax,
                ajax = _$xegrid$proxyOpts$aj === void 0 ? {} : _$xegrid$proxyOpts$aj,
                _$xegrid$proxyOpts$pr = _$xegrid$proxyOpts.props,
                props = _$xegrid$proxyOpts$pr === void 0 ? {} : _$xegrid$proxyOpts$pr;
            var ajaxMethods = ajax.queryAll;

            if (ajaxMethods) {
              var params = {
                $table: this,
                $grid: $xegrid,
                sort: $xegrid.sortData,
                filters: $xegrid.filterData,
                form: $xegrid.formData,
                target: ajaxMethods,
                options: opts
              };
              return Promise.resolve((beforeQueryAll || ajaxMethods)(params)).catch(function (e) {
                return e;
              }).then(function (rest) {
                opts.data = (props.list ? ctor_amd_xe_utils_default.a.get(rest, props.list) : rest) || [];

                if (afterQueryAll) {
                  afterQueryAll(params);
                }

                return handleExport(_this, opts);
              });
            }
          }
        }
      }

      return handleExport(this, opts);
    },
    _importByFile: function _importByFile(file, opts) {
      var _this2 = this;

      if (window.FileReader) {
        var _UtilTools$parseFile2 = UtilTools.parseFile(file),
            type = _UtilTools$parseFile2.type,
            filename = _UtilTools$parseFile2.filename;

        var options = Object.assign({
          mode: 'insert'
        }, opts, {
          type: type,
          filename: filename
        });
        var types = options.types || v_x_e_table.importTypes;

        if (types.indexOf(type) > -1) {
          if (options.remote) {
            var params = {
              file: file,
              options: options,
              $table: this
            };

            if (options.importMethod) {
              return options.importMethod(params);
            }

            return Promise.resolve(params);
          }

          this.preventEvent(null, 'event.import', {
            file: file,
            options: options,
            columns: this.tableFullColumn
          }, function () {
            var reader = new FileReader();

            reader.onerror = function () {
              UtilTools.error('vxe.error.notType', [type]);
            };

            reader.onload = function (e) {
              handleImport(_this2, e.target.result.trim(), options);
            };

            reader.readAsText(file, 'UTF-8');
          });
        } else {
          UtilTools.error('vxe.error.notType', [type]);
        }
      } else {
        UtilTools.error('vxe.error.notExp');
      }

      return Promise.resolve();
    },
    _importData: function _importData(options) {
      var _this3 = this;

      var opts = Object.assign({}, this.importOpts, options);
      var rest = new Promise(function (resolve, reject) {
        _this3._importResolve = resolve;
        _this3._importReject = reject;
      });
      readLocalFile(opts).then(function (evnt) {
        _this3.importByFile(evnt.target.files[0], opts);
      }).catch(function (evnt) {
        _this3._importReject(evnt);

        _this3._importReject = null;
      });
      return rest;
    },
    _readFile: function _readFile(options) {
      return readLocalFile(options);
    },
    _print: function _print(options) {
      var _this4 = this;

      var opts = Object.assign({
        original: false
      }, this.printOpts, options, {
        type: 'html',
        download: false,
        remote: false,
        print: true
      });

      if (!opts.sheetName) {
        opts.sheetName = document.title;
      }

      if (opts.content) {
        handlePrint(this, opts, opts.content);
      } else {
        this.exportData(opts).then(function (_ref2) {
          var content = _ref2.content;
          handlePrint(_this4, opts, content);
        });
      }
    },
    _openImport: function _openImport(options) {
      var defOpts = Object.assign({
        mode: 'insert',
        message: true
      }, options, this.importOpts);
      var types = defOpts.types || v_x_e_table.exportTypes;
      var isTree = !!this.getTreeStatus();

      if (isTree) {
        if (defOpts.message) {
          v_x_e_table.modal.message({
            message: conf.i18n('vxe.error.treeNotImp'),
            status: 'error'
          });
        }

        return;
      }

      if (!this.importConfig) {
        UtilTools.error('vxe.error.reqProp', ['import-config']);
      } // 处理类型


      var typeList = types.map(function (value) {
        return {
          value: value,
          label: "vxe.export.types.".concat(value)
        };
      });
      var modeList = defOpts.modes.map(function (value) {
        return {
          value: value,
          label: "vxe.import.modes.".concat(value)
        };
      });
      Object.assign(this.importStore, {
        file: null,
        type: '',
        filename: '',
        modeList: modeList,
        typeList: typeList,
        visible: true
      });
      Object.assign(this.importParams, defOpts);
      this.initStore.import = true;
    },
    _openExport: function _openExport(options) {
      var exportConfig = this.exportConfig,
          customOpts = this.customOpts,
          exportOpts = this.exportOpts,
          collectColumn = this.collectColumn,
          footerData = this.footerData;
      var selectRecords = this.getCheckboxRecords();
      var hasFooter = !!footerData.length;
      var defOpts = Object.assign({
        message: true,
        isHeader: true
      }, exportOpts, options);
      var types = defOpts.types || v_x_e_table.exportTypes;
      var checkMethod = customOpts.checkMethod;
      var exportColumns = collectColumn.slice(0);

      if (!exportConfig) {
        UtilTools.error('vxe.error.reqProp', ['export-config']);
      } // 处理类型


      var typeList = types.map(function (value) {
        return {
          value: value,
          label: "vxe.export.types.".concat(value)
        };
      });
      var modeList = defOpts.modes.map(function (value) {
        return {
          value: value,
          label: "vxe.export.modes.".concat(value)
        };
      }); // 默认选中

      ctor_amd_xe_utils_default.a.eachTree(exportColumns, function (column, index, items, path, parent) {
        var isColGroup = column.children && column.children.length;

        if (isColGroup || defaultFilterExportColumn(column)) {
          column.checked = column.visible;
          column.halfChecked = false;
          column.disabled = parent && parent.disabled || (checkMethod ? !checkMethod({
            column: column
          }) : false);
        }
      }); // 更新条件

      Object.assign(this.exportStore, {
        columns: exportColumns,
        typeList: typeList,
        modeList: modeList,
        hasFooter: hasFooter,
        visible: true
      }); // 重置参数

      Object.assign(this.exportParams, {
        filename: defOpts.filename || '',
        sheetName: defOpts.sheetName || '',
        type: defOpts.type || typeList[0].value,
        mode: selectRecords.length ? 'selected' : 'current',
        original: defOpts.original,
        message: defOpts.message,
        isHeader: defOpts.isHeader,
        isFooter: hasFooter && (ctor_amd_xe_utils_default.a.isBoolean(exportOpts.isFooter) ? exportOpts.isFooter : true),
        isPrint: defOpts.isPrint
      });
      this.initStore.export = true;
      return this.$nextTick();
    }
  }
});
// CONCATENATED MODULE: ./packages/export/index.js







function print(options) {
  var opts = Object.assign({}, options, {
    type: 'html'
  });
  handlePrint(null, opts, opts.content);
}

var Export = {
  install: function install(Vue) {
    v_x_e_table.reg('export');
    v_x_e_table.readFile = readLocalFile;
    v_x_e_table.print = print;
    v_x_e_table.setup({
      export: {
        types: {
          csv: 0,
          html: 0,
          xml: 0,
          txt: 0
        }
      }
    });
    packages_table.mixins.push(export_src_mixin);
    Vue.component(export_panel.name, export_panel);
    Vue.component(import_panel.name, import_panel);
  }
};
/* harmony default export */ var packages_export = (Export);
// CONCATENATED MODULE: ./packages/keyboard/src/mixin.js







var mixin_browse = DomTools.browse;

function getTargetOffset(target, container) {
  var offsetTop = 0;
  var offsetLeft = 0;
  var triggerCheckboxLabel = !mixin_browse.firefox && DomTools.hasClass(target, 'vxe-checkbox--label');

  if (triggerCheckboxLabel) {
    var checkboxLabelStyle = getComputedStyle(target);
    offsetTop -= ctor_amd_xe_utils_default.a.toNumber(checkboxLabelStyle.paddingTop);
    offsetLeft -= ctor_amd_xe_utils_default.a.toNumber(checkboxLabelStyle.paddingLeft);
  }

  while (target && target !== container) {
    offsetTop += target.offsetTop;
    offsetLeft += target.offsetLeft;
    target = target.offsetParent;

    if (triggerCheckboxLabel) {
      var checkboxStyle = getComputedStyle(target);
      offsetTop -= ctor_amd_xe_utils_default.a.toNumber(checkboxStyle.paddingTop);
      offsetLeft -= ctor_amd_xe_utils_default.a.toNumber(checkboxStyle.paddingLeft);
    }
  }

  return {
    offsetTop: offsetTop,
    offsetLeft: offsetLeft
  };
}

function getCheckboxRangeRows(_vm, params, targetTrElem, moveRange) {
  var countHeight = 0;
  var rangeRows = [];
  var isDown = moveRange > 0;
  var moveSize = moveRange > 0 ? moveRange : Math.abs(moveRange) + targetTrElem.offsetHeight;
  var afterFullData = _vm.afterFullData,
      scrollYStore = _vm.scrollYStore,
      scrollYLoad = _vm.scrollYLoad;

  if (scrollYLoad) {
    var _rowIndex = _vm._getRowIndex(params.row);

    if (isDown) {
      rangeRows = afterFullData.slice(_rowIndex, _rowIndex + Math.ceil(moveSize / scrollYStore.rowHeight));
    } else {
      rangeRows = afterFullData.slice(_rowIndex - Math.floor(moveSize / scrollYStore.rowHeight) + 1, _rowIndex + 1);
    }
  } else {
    var siblingProp = isDown ? 'next' : 'previous';

    while (targetTrElem && countHeight < moveSize) {
      rangeRows.push(_vm.getRowNode(targetTrElem).item);
      countHeight += targetTrElem.offsetHeight;
      targetTrElem = targetTrElem["".concat(siblingProp, "ElementSibling")];
    }
  }

  return rangeRows;
}

/* harmony default export */ var keyboard_src_mixin = ({
  methods: {
    // 处理 Tab 键移动
    moveTabSelected: function moveTabSelected(args, isLeft, evnt) {
      var _this = this;

      var afterFullData = this.afterFullData,
          visibleColumn = this.visibleColumn,
          editConfig = this.editConfig,
          editOpts = this.editOpts;
      var targetRow;
      var targetRowIndex;
      var targetColumnIndex;
      var params = Object.assign({}, args);

      var _rowIndex = this._getRowIndex(params.row);

      var _columnIndex = this._getColumnIndex(params.column);

      evnt.preventDefault();

      if (isLeft) {
        // 向左
        if (_columnIndex <= 0) {
          // 如果已经是第一列，则移动到上一行
          if (_rowIndex > 0) {
            targetRowIndex = _rowIndex - 1;
            targetRow = afterFullData[targetRowIndex];
            targetColumnIndex = visibleColumn.length - 1;
          }
        } else {
          targetColumnIndex = _columnIndex - 1;
        }
      } else {
        if (_columnIndex >= visibleColumn.length - 1) {
          // 如果已经是第一列，则移动到上一行
          if (_rowIndex < afterFullData.length - 1) {
            targetRowIndex = _rowIndex + 1;
            targetRow = afterFullData[targetRowIndex];
            targetColumnIndex = 0;
          }
        } else {
          targetColumnIndex = _columnIndex + 1;
        }
      }

      var targetColumn = visibleColumn[targetColumnIndex];

      if (targetColumn) {
        if (targetRow) {
          params.rowIndex = targetRowIndex;
          params.row = targetRow;
        } else {
          params.rowIndex = _rowIndex;
        }

        params.columnIndex = targetColumnIndex;
        params.column = targetColumn;
        params.cell = this.getCell(params.row, params.column);

        if (editConfig) {
          if (editOpts.trigger === 'click' || editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row') {
              this.handleActived(params, evnt);
            } else {
              this.scrollToRow(params.row, params.column).then(function () {
                return _this.handleSelected(params, evnt);
              });
            }
          }
        } else {
          this.scrollToRow(params.row, params.column).then(function () {
            return _this.handleSelected(params, evnt);
          });
        }
      }
    },
    // 处理当前行方向键移动
    moveCurrentRow: function moveCurrentRow(isUpArrow, isDwArrow, evnt) {
      var _this2 = this;

      var currentRow = this.currentRow,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          afterFullData = this.afterFullData;
      var targetRow;
      evnt.preventDefault();

      if (currentRow) {
        if (treeConfig) {
          var _XEUtils$findTree = ctor_amd_xe_utils_default.a.findTree(afterFullData, function (item) {
            return item === currentRow;
          }, treeOpts),
              index = _XEUtils$findTree.index,
              items = _XEUtils$findTree.items;

          if (isUpArrow && index > 0) {
            targetRow = items[index - 1];
          } else if (isDwArrow && index < items.length - 1) {
            targetRow = items[index + 1];
          }
        } else {
          var _rowIndex = this._getRowIndex(currentRow);

          if (isUpArrow && _rowIndex > 0) {
            targetRow = afterFullData[_rowIndex - 1];
          } else if (isDwArrow && _rowIndex < afterFullData.length - 1) {
            targetRow = afterFullData[_rowIndex + 1];
          }
        }
      } else {
        targetRow = afterFullData[0];
      }

      if (targetRow) {
        var params = {
          $table: this,
          row: targetRow
        };
        this.scrollToRow(targetRow).then(function () {
          return _this2.triggerCurrentRowEvent(evnt, params);
        });
      }
    },
    // 处理可编辑方向键移动
    moveSelected: function moveSelected(args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      var _this3 = this;

      var afterFullData = this.afterFullData,
          visibleColumn = this.visibleColumn;
      var params = Object.assign({}, args);

      var _rowIndex = this._getRowIndex(params.row);

      var _columnIndex = this._getColumnIndex(params.column);

      evnt.preventDefault();

      if (isUpArrow && _rowIndex > 0) {
        // 移动到上一行
        params.rowIndex = _rowIndex - 1;
        params.row = afterFullData[params.rowIndex];
      } else if (isDwArrow && _rowIndex < afterFullData.length - 1) {
        // 移动到下一行
        params.rowIndex = _rowIndex + 1;
        params.row = afterFullData[params.rowIndex];
      } else if (isLeftArrow && _columnIndex) {
        // 移动到左侧单元格
        params.columnIndex = _columnIndex - 1;
        params.column = visibleColumn[params.columnIndex];
      } else if (isRightArrow && _columnIndex < visibleColumn.length - 1) {
        // 移动到右侧单元格
        params.columnIndex = _columnIndex + 1;
        params.column = visibleColumn[params.columnIndex];
      }

      this.scrollToRow(params.row, params.column).then(function () {
        params.cell = _this3.getCell(params.row, params.column);

        _this3.handleSelected(params, evnt);
      });
    },

    /**
     * 表头单元格按下事件
     */
    triggerHeaderCellMousedownEvent: function triggerHeaderCellMousedownEvent(evnt, params) {
      var mouseConfig = this.mouseConfig,
          mouseOpts = this.mouseOpts;

      if (mouseConfig && mouseOpts.area && this.handleHeaderCellAreaEvent) {
        var cell = evnt.currentTarget;
        var triggerSort = DomTools.getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag;
        var triggerFilter = DomTools.getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag;
        this.handleHeaderCellAreaEvent(evnt, Object.assign({
          cell: cell,
          triggerSort: triggerSort,
          triggerFilter: triggerFilter
        }, params));
      }

      this.focus();
      this.closeMenu();
    },

    /**
     * 单元格按下事件
     */
    triggerCellMousedownEvent: function triggerCellMousedownEvent(evnt, params) {
      var cell = evnt.currentTarget;
      params.cell = cell;
      this.handleCellMousedownEvent(evnt, params);
      this.focus();
      this.closeFilter();
      this.closeMenu();
    },
    handleCellMousedownEvent: function handleCellMousedownEvent(evnt, params) {
      var editConfig = this.editConfig,
          editOpts = this.editOpts,
          handleSelected = this.handleSelected,
          checkboxConfig = this.checkboxConfig,
          checkboxOpts = this.checkboxOpts,
          mouseConfig = this.mouseConfig,
          mouseOpts = this.mouseOpts;

      if (mouseConfig && mouseOpts.area && this.handleCellAreaEvent) {
        return this.handleCellAreaEvent(evnt, params);
      } else {
        if (checkboxConfig && checkboxOpts.range) {
          this.handleCheckboxRangeEvent(evnt, params);
        }

        if (mouseConfig && mouseOpts.selected) {
          if (!editConfig || editOpts.mode === 'cell') {
            handleSelected(params, evnt);
          }
        }
      }
    },
    handleCheckboxRangeEvent: function handleCheckboxRangeEvent(evnt, params) {
      var _this4 = this;

      var column = params.column,
          cell = params.cell;

      if (column.type === 'checkbox') {
        var $el = this.$el,
            elemStore = this.elemStore;
        var disX = evnt.clientX;
        var disY = evnt.clientY;
        var bodyWrapperElem = elemStore["".concat(column.fixed || 'main', "-body-wrapper")] || elemStore['main-body-wrapper'];
        var checkboxRangeElem = bodyWrapperElem.querySelector('.vxe-table--checkbox-range');
        var domMousemove = document.onmousemove;
        var domMouseup = document.onmouseup;
        var trElem = cell.parentNode;
        var selectRecords = this.getCheckboxRecords();
        var lastRangeRows = [];
        var marginSize = 1;
        var offsetRest = getTargetOffset(evnt.target, bodyWrapperElem);
        var startTop = offsetRest.offsetTop + evnt.offsetY;
        var startLeft = offsetRest.offsetLeft + evnt.offsetX;
        var startScrollTop = bodyWrapperElem.scrollTop;
        var rowHeight = trElem.offsetHeight;
        var mouseScrollTimeout = null;
        var isMouseScrollDown = false;
        var mouseScrollSpaceSize = 1;

        var triggerEvent = function triggerEvent(type, evnt) {
          _this4.emitEvent("checkbox-range-".concat(type), {
            records: _this4.getCheckboxRecords(),
            reserves: _this4.getCheckboxReserveRecords()
          }, evnt);
        };

        var handleChecked = function handleChecked(evnt) {
          var clientX = evnt.clientX,
              clientY = evnt.clientY;
          var offsetLeft = clientX - disX;
          var offsetTop = clientY - disY + (bodyWrapperElem.scrollTop - startScrollTop);
          var rangeHeight = Math.abs(offsetTop);
          var rangeWidth = Math.abs(offsetLeft);
          var rangeTop = startTop;
          var rangeLeft = startLeft;

          if (offsetTop < marginSize) {
            // 向上
            rangeTop += offsetTop;

            if (rangeTop < marginSize) {
              rangeTop = marginSize;
              rangeHeight = startTop;
            }
          } else {
            // 向下
            rangeHeight = Math.min(rangeHeight, bodyWrapperElem.scrollHeight - startTop - marginSize);
          }

          if (offsetLeft < marginSize) {
            // 向左
            rangeLeft += offsetLeft;

            if (rangeWidth > startLeft) {
              rangeLeft = marginSize;
              rangeWidth = startLeft;
            }
          } else {
            // 向右
            rangeWidth = Math.min(rangeWidth, bodyWrapperElem.clientWidth - startLeft - marginSize);
          }

          checkboxRangeElem.style.height = "".concat(rangeHeight, "px");
          checkboxRangeElem.style.width = "".concat(rangeWidth, "px");
          checkboxRangeElem.style.left = "".concat(rangeLeft, "px");
          checkboxRangeElem.style.top = "".concat(rangeTop, "px");
          checkboxRangeElem.style.display = 'block';
          var rangeRows = getCheckboxRangeRows(_this4, params, trElem, offsetTop < marginSize ? -rangeHeight : rangeHeight); // 至少滑动 10px 才能有效匹配

          if (rangeHeight > 10 && rangeRows.length !== lastRangeRows.length) {
            lastRangeRows = rangeRows;

            if (evnt.ctrlKey) {
              rangeRows.forEach(function (row) {
                _this4.handleSelectRow({
                  row: row
                }, selectRecords.indexOf(row) === -1);
              });
            } else {
              _this4.setAllCheckboxRow(false);

              _this4.setCheckboxRow(rangeRows, true);
            }

            triggerEvent('change', evnt);
          }
        }; // 停止鼠标滚动


        var stopMouseScroll = function stopMouseScroll() {
          clearTimeout(mouseScrollTimeout);
          mouseScrollTimeout = null;
        }; // 开始鼠标滚动


        var startMouseScroll = function startMouseScroll(evnt) {
          stopMouseScroll();
          mouseScrollTimeout = setTimeout(function () {
            if (mouseScrollTimeout) {
              var scrollLeft = bodyWrapperElem.scrollLeft,
                  scrollTop = bodyWrapperElem.scrollTop,
                  clientHeight = bodyWrapperElem.clientHeight,
                  scrollHeight = bodyWrapperElem.scrollHeight;
              var topSize = Math.ceil(mouseScrollSpaceSize * 50 / rowHeight);

              if (isMouseScrollDown) {
                if (scrollTop + clientHeight < scrollHeight) {
                  _this4.scrollTo(scrollLeft, scrollTop + topSize);

                  startMouseScroll(evnt);
                  handleChecked(evnt);
                } else {
                  stopMouseScroll();
                }
              } else {
                if (scrollTop) {
                  _this4.scrollTo(scrollLeft, scrollTop - topSize);

                  startMouseScroll(evnt);
                  handleChecked(evnt);
                } else {
                  stopMouseScroll();
                }
              }
            }
          }, 50);
        };

        DomTools.addClass($el, 'drag--range');

        document.onmousemove = function (evnt) {
          evnt.preventDefault();
          evnt.stopPropagation();
          var clientY = evnt.clientY;

          var _DomTools$getAbsolute = DomTools.getAbsolutePos(bodyWrapperElem),
              boundingTop = _DomTools$getAbsolute.boundingTop; // 如果超过可视区，触发滚动


          if (clientY < boundingTop) {
            isMouseScrollDown = false;
            mouseScrollSpaceSize = boundingTop - clientY;

            if (!mouseScrollTimeout) {
              startMouseScroll(evnt);
            }
          } else if (clientY > boundingTop + bodyWrapperElem.clientHeight) {
            isMouseScrollDown = true;
            mouseScrollSpaceSize = clientY - boundingTop - bodyWrapperElem.clientHeight;

            if (!mouseScrollTimeout) {
              startMouseScroll(evnt);
            }
          } else if (mouseScrollTimeout) {
            stopMouseScroll();
          }

          handleChecked(evnt);
        };

        document.onmouseup = function (evnt) {
          stopMouseScroll();
          DomTools.removeClass($el, 'drag--range');
          checkboxRangeElem.removeAttribute('style');
          document.onmousemove = domMousemove;
          document.onmouseup = domMouseup;
          triggerEvent('end', evnt);
        };

        triggerEvent('start', evnt);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/keyboard/index.js



var Keyboard = {
  install: function install() {
    v_x_e_table.reg('keyboard');
    packages_table.mixins.push(keyboard_src_mixin);
  }
};
/* harmony default export */ var packages_keyboard = (Keyboard);
// CONCATENATED MODULE: ./packages/validator/src/mixin.js
















/**
 * 校验规则
 */

var mixin_Rule = /*#__PURE__*/function () {
  function Rule(rule) {
    _classCallCheck(this, Rule);

    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.max,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    });
  }
  /**
   * 获取校验不通过的消息
   * 支持国际化翻译
   */


  _createClass(Rule, [{
    key: "message",
    get: function get() {
      return UtilTools.getFuncText(this.$options.message);
    }
  }]);

  return Rule;
}();

/* harmony default export */ var validator_src_mixin = ({
  methods: {
    /**
     * 完整校验，和 validate 的区别就是会给有效数据中的每一行进行校验
     */
    _fullValidate: function _fullValidate(rows, cb) {
      return this.beginValidate(rows, cb, true);
    },

    /**
     * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）
     */
    _validate: function _validate(rows, cb) {
      return this.beginValidate(rows, cb);
    },

    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError: function handleValidError(params) {
      var _this = this;

      if (this.validOpts.autoPos === false) {
        this.emitEvent('valid-error', params);
      } else {
        this.handleActived(params, {
          type: 'valid-error',
          trigger: 'call'
        }).then(function () {
          return setTimeout(function () {
            return _this.showValidTooltip(params);
          }, 10);
        });
      }
    },

    /**
     * 对表格数据进行校验
     * 如果不指定数据，则默认只校验临时变动的数据，例如新增或修改
     * 如果传 true 则校验当前表格数据
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    beginValidate: function beginValidate(rows, cb, isFull) {
      var _this2 = this;

      var validRest = {};
      var editRules = this.editRules,
          afterFullData = this.afterFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;
      var vaildDatas;

      if (rows === true) {
        vaildDatas = afterFullData;
      } else if (rows) {
        if (ctor_amd_xe_utils_default.a.isFunction(rows)) {
          cb = rows;
        } else {
          vaildDatas = ctor_amd_xe_utils_default.a.isArray(rows) ? rows : [rows];
        }
      }

      if (!vaildDatas) {
        vaildDatas = this.getInsertRecords().concat(this.getUpdateRecords());
      }

      var rowValids = [];
      this.lastCallTime = Date.now();
      this.validRuleErr = false; // 如果为快速校验，当存在某列校验不通过时将终止执行

      this.clearValidate();

      if (editRules) {
        var columns = this.getColumns();

        var handleVaild = function handleVaild(row) {
          if (isFull || !_this2.validRuleErr) {
            var colVailds = [];
            columns.forEach(function (column) {
              if ((isFull || !_this2.validRuleErr) && ctor_amd_xe_utils_default.a.has(editRules, column.property)) {
                colVailds.push(_this2.validCellRules('all', row, column).catch(function (_ref) {
                  var rule = _ref.rule,
                      rules = _ref.rules;
                  var rest = {
                    rule: rule,
                    rules: rules,
                    rowIndex: _this2.getRowIndex(row),
                    row: row,
                    columnIndex: _this2.getColumnIndex(column),
                    column: column,
                    $table: _this2
                  };

                  if (!validRest[column.property]) {
                    validRest[column.property] = [];
                  }

                  validRest[column.property].push(rest);

                  if (!isFull) {
                    _this2.validRuleErr = true;
                    return Promise.reject(rest);
                  }
                }));
              }
            });
            rowValids.push(Promise.all(colVailds));
          }
        };

        if (treeConfig) {
          ctor_amd_xe_utils_default.a.eachTree(vaildDatas, handleVaild, treeOpts);
        } else {
          vaildDatas.forEach(handleVaild);
        }

        return Promise.all(rowValids).then(function () {
          var ruleProps = Object.keys(validRest);

          if (ruleProps.length) {
            return Promise.reject(validRest[ruleProps[0]][0]);
          }

          if (cb) {
            cb();
          }
        }).catch(function (firstErrParams) {
          return new Promise(function (resolve, reject) {
            var finish = function finish() {
              if (cb) {
                cb(validRest);
                resolve();
              } else {
                reject(validRest);
              }
            };

            var posAndFinish = function posAndFinish() {
              firstErrParams.cell = _this2.getCell(firstErrParams.row, firstErrParams.column);
              DomTools.toView(firstErrParams.cell);

              _this2.handleValidError(firstErrParams);

              finish();
            };
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */


            var row = firstErrParams.row;
            var rowIndex = afterFullData.indexOf(row);
            var locatRow = rowIndex > 0 ? afterFullData[rowIndex - 1] : row;

            if (_this2.validOpts.autoPos === false) {
              finish();
            } else {
              if (treeConfig) {
                _this2.scrollToTreeRow(locatRow).then(posAndFinish);
              } else {
                _this2.scrollToRow(locatRow).then(posAndFinish);
              }
            }
          });
        });
      }

      if (cb) {
        cb();
      }

      return Promise.resolve();
    },
    hasCellRules: function hasCellRules(type, row, column) {
      var editRules = this.editRules;
      var property = column.property;

      if (property && editRules) {
        var rules = ctor_amd_xe_utils_default.a.get(editRules, property);
        return rules && ctor_amd_xe_utils_default.a.find(rules, function (rule) {
          return type === 'all' || !rule.trigger || type === rule.trigger;
        });
      }

      return false;
    },

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise<不通过列的错误消息>
     * 如果是传回调方式这返回一个校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ cellValue, rule, rules, row, column, rowIndex, columnIndex }) 自定义校验，接收一个 Promise
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validCellRules: function validCellRules(type, row, column, val) {
      var _this3 = this;

      var editRules = this.editRules;
      var property = column.property;
      var errorRules = [];
      var syncVailds = [];

      if (property && editRules) {
        var rules = ctor_amd_xe_utils_default.a.get(editRules, property);

        if (rules) {
          var cellValue = ctor_amd_xe_utils_default.a.isUndefined(val) ? ctor_amd_xe_utils_default.a.get(row, property) : val;
          rules.forEach(function (rule) {
            if (type === 'all' || !rule.trigger || type === rule.trigger) {
              if (ctor_amd_xe_utils_default.a.isFunction(rule.validator)) {
                var customValid = rule.validator({
                  cellValue: cellValue,
                  rule: rule,
                  rules: rules,
                  row: row,
                  rowIndex: _this3.getRowIndex(row),
                  column: column,
                  columnIndex: _this3.getColumnIndex(column),
                  $table: _this3
                });

                if (customValid) {
                  if (ctor_amd_xe_utils_default.a.isError(customValid)) {
                    _this3.validRuleErr = true;
                    errorRules.push(new mixin_Rule({
                      type: 'custom',
                      trigger: rule.trigger,
                      message: customValid.message,
                      rule: new mixin_Rule(rule)
                    }));
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(customValid.catch(function (e) {
                      _this3.validRuleErr = true;
                      errorRules.push(new mixin_Rule({
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e ? e.message : rule.message,
                        rule: new mixin_Rule(rule)
                      }));
                    }));
                  }
                }
              } else {
                var isNumber = rule.type === 'number';
                var numVal = isNumber ? ctor_amd_xe_utils_default.a.toNumber(cellValue) : ctor_amd_xe_utils_default.a.getSize(cellValue);

                if (rule.required && (cellValue === null || cellValue === undefined || cellValue === '')) {
                  _this3.validRuleErr = true;
                  errorRules.push(new mixin_Rule(rule));
                } else if (isNumber && isNaN(cellValue) || !isNaN(rule.min) && numVal < parseFloat(rule.min) || !isNaN(rule.max) && numVal > parseFloat(rule.max) || rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(cellValue)) {
                  _this3.validRuleErr = true;
                  errorRules.push(new mixin_Rule(rule));
                }
              }
            }
          });
        }
      }

      return Promise.all(syncVailds).then(function () {
        if (errorRules.length) {
          var rest = {
            rules: errorRules,
            rule: errorRules[0]
          };
          return Promise.reject(rest);
        }
      });
    },
    _clearValidate: function _clearValidate() {
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
     * 触发校验
     */
    triggerValidate: function triggerValidate(type) {
      var _this4 = this;

      var editConfig = this.editConfig,
          editStore = this.editStore,
          editRules = this.editRules,
          validStore = this.validStore;
      var actived = editStore.actived;

      if (actived.row && editRules) {
        var _actived$args = actived.args,
            row = _actived$args.row,
            column = _actived$args.column,
            cell = _actived$args.cell;

        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(function () {
            if (editConfig.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                _this4.clearValidate();
              }
            }
          }).catch(function (_ref2) {
            var rule = _ref2.rule;

            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              var rest = {
                rule: rule,
                row: row,
                column: column,
                cell: cell
              };

              _this4.showValidTooltip(rest);

              return Promise.reject(rest);
            }

            return Promise.resolve();
          });
        }
      }

      return Promise.resolve();
    },

    /**
     * 弹出校验错误提示
     */
    showValidTooltip: function showValidTooltip(params) {
      var _this5 = this;

      var $refs = this.$refs,
          height = this.height,
          tableData = this.tableData,
          validOpts = this.validOpts;
      var rule = params.rule,
          row = params.row,
          column = params.column,
          cell = params.cell;
      var validTip = $refs.validTip;
      var content = rule.message;
      this.$nextTick(function () {
        Object.assign(_this5.validStore, {
          row: row,
          column: column,
          rule: rule,
          content: content,
          visible: true
        });

        if (validTip && (validOpts.message === 'tooltip' || validOpts.message === 'default' && !height && tableData.length < 2)) {
          validTip.toVisible(cell, content);
        }

        _this5.emitEvent('valid-error', params);
      });
    }
  }
});
// CONCATENATED MODULE: ./packages/validator/index.js



var Validator = {
  install: function install() {
    v_x_e_table.reg('valid');
    packages_table.mixins.push(validator_src_mixin);
  }
};
/* harmony default export */ var validator = (Validator);
// CONCATENATED MODULE: ./packages/locale/lang/zh-CN.js
/* harmony default export */ var zh_CN = ({
  vxe: {
    error: {
      groupFixed: '如果使用分组表头，固定列必须按组设置',
      groupMouseRange: '分组表头与 "{0}" 不能同时使用，这可能会出现错误',
      groupTag: '分组列头应该使用 "{0}" 而不是 "{1}"，这可能会出现错误',
      scrollErrProp: '启用虚拟滚动后不支持该参数 "{0}"',
      scrollXNotGroup: '横向虚拟滚动不支持分组表头，请修改正确 "scroll-x.gt" 的参数，否则可能会导致出现错误',
      errConflicts: '参数 "{0}" 与 "{1}" 有冲突',
      unableInsert: '无法插入到指定位置，请检查参数是否正确',
      useErr: '安装 "{0}" 模块时发生错误，可能顺序不正确，依赖的模块需要在 Table 之前安装',
      barUnableLink: '工具栏无法关联表格',
      expandContent: '展开行的插槽应该是 "content"，请检查是否正确',
      reqModule: '缺少 "{0}" 模块',
      reqProp: '缺少必要的 "{0}" 参数，这可能会导致出现错误',
      emptyProp: '参数 "{0}" 不允许为空',
      errProp: '不支持的参数 "{0}"，可能为 "{1}"',
      fieldRepet: 'column.{0}="{1}" 重复了，这可能会导致某些功能无法使用',
      notFunc: '方法 "{0}" 不存在',
      notSlot: '插槽 "{0}" 不存在',
      noTree: '树结构不支持 "{0}"',
      notProp: '不支持的参数 "{0}"',
      delFunc: '方法 "{0}" 已废弃，请使用 "{1}"',
      delProp: '参数 "{0}" 已废弃，请使用 "{1}"',
      delEvent: '事件 "{0}" 已废弃，请使用 "{1}"',
      removeProp: '参数 "{0}" 已废弃，不建议使用，这可能会导致出现错误',
      errFormat: '全局的格式化内容应该使用 "VXETable.formats" 定义，挂载 "formatter={0}" 的方式已不建议使用',
      notType: '不支持的文件类型 "{0}"',
      notExp: '该浏览器不支持导入/导出功能',
      impFields: '导入失败，请检查字段名和数据格式是否正确',
      treeNotImp: '树表格不支持导入'
    },
    renderer: {
      search: '搜索',
      cases: {
        equal: '等于',
        unequal: '不等于',
        gt: '大于',
        ge: '大于或等于',
        lt: '小于',
        le: '小于或等于',
        begin: '开头是',
        notbegin: '开头不是',
        endin: '结尾是',
        notendin: '结尾不是',
        include: '包含',
        exclude: '不包含',
        between: '介于',
        custom: '自定义筛选',
        insensitive: '不区分大小写',
        isSensitive: '区分大小写'
      },
      combination: {
        menus: {
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '锁定列',
          fixedGroup: '锁定组',
          cancelFixed: '取消锁定',
          fixedLeft: '锁定左侧',
          fixedRight: '锁定右侧',
          clearFilter: '清除筛选',
          textOption: '文本筛选',
          numberOption: '数值筛选'
        },
        popup: {
          title: '自定义筛选的方式',
          currColumnTitle: '当前列：',
          and: '与',
          or: '或',
          describeHtml: '可用 ? 代表单个字符<br/>用 * 代表任意多个字符'
        },
        empty: '(空白)',
        notData: '无匹配项'
      }
    },
    pro: {
      area: {
        mergeErr: '无法对合并单元格进行该操作',
        multiErr: '无法对多重选择区域进行该操作',
        extendErr: '如果延伸的区域包含被合并的单元格，所有合并的单元格需大小相同'
      },
      fnr: {
        title: '查找和替换',
        findLabel: '查找',
        replaceLabel: '替换',
        findTitle: '查找内容：',
        replaceTitle: '替换为：',
        tabs: {
          find: '查找',
          replace: '替换'
        },
        filter: {
          re: '正则表达式',
          whole: '全词匹配',
          sensitive: '区分大小写'
        },
        btns: {
          findNext: '查找下一个',
          findAll: '查找全部',
          replace: '替换',
          replaceAll: '替换全部',
          cancel: '取消'
        },
        header: {
          seq: '#',
          cell: '单元格',
          value: '值'
        },
        empty: '(空值)',
        reError: '无效的正则表达式',
        recordCount: '已找到 {0} 个单元格',
        notCell: '找不到匹配的单元格',
        replaceSuccess: '成功替换 {0} 个单元格'
      }
    },
    table: {
      emptyText: '暂无数据',
      allTitle: '全选/取消',
      seqTitle: '#',
      confirmFilter: '筛选',
      resetFilter: '重置',
      allFilter: '全部',
      sortAsc: '升序：最低到最高',
      sortDesc: '降序：最高到最低',
      filter: '对所选的列启用筛选',
      impSuccess: '成功导入 {0} 条记录',
      expLoading: '正在导出中',
      expSuccess: '导出成功',
      expFilename: '导出_{0}',
      expOriginFilename: '导出_源_{0}',
      customTitle: '列设置',
      customAll: '全部',
      customConfirm: '确认',
      customRestore: '还原'
    },
    grid: {
      selectOneRecord: '请至少选择一条记录！',
      deleteSelectRecord: '您确定要删除所选记录吗？',
      removeSelectRecord: '您确定要移除所选记录吗？',
      dataUnchanged: '数据未改动！',
      delSuccess: '成功删除所选记录！',
      saveSuccess: '保存成功！',
      operError: '发生错误，操作失败！'
    },
    select: {
      emptyText: '暂无数据'
    },
    pager: {
      goto: '前往',
      pagesize: '{0}条/页',
      total: '共 {0} 条记录',
      pageClassifier: '页',
      prevPage: '上一页',
      nextPage: '下一页',
      prevJump: '向上跳页',
      nextJump: '向下跳页'
    },
    alert: {
      title: '消息提示'
    },
    button: {
      confirm: '确认',
      cancel: '取消'
    },
    import: {
      modes: {
        covering: '覆盖',
        insert: '新增'
      },
      impTitle: '导入参数设置',
      impFile: '文件名',
      impSelect: '选择文件',
      impType: '文件类型',
      impOpts: '导入选项',
      impConfirm: '导入'
    },
    export: {
      types: {
        csv: 'CSV (逗号分隔)(*.csv)',
        html: '网页(*.html)',
        xml: 'XML 数据(*.xml)',
        txt: '文本文件(制表符分隔)(*.txt)',
        xlsx: 'Excel 工作簿(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: '当前数据（当前页的数据）',
        selected: '选中数据（当前页选中的数据）',
        all: '全量数据（包括所有分页的数据）'
      },
      expTitle: '导出参数设置',
      expName: '文件名',
      expNamePlaceholder: '请输入文件名',
      expSheetName: '标题',
      expSheetNamePlaceholder: '请输入标题',
      expType: '保存类型',
      expMode: '要导出的数据',
      expCurrentColumn: '全部字段',
      expColumn: '要导出的字段',
      expOpts: '导出选项',
      expOptHeader: '表头',
      expHeaderTitle: '是否需要导出表头',
      expOptFooter: '表尾',
      expFooterTitle: '是否需要导出表尾',
      expOptOriginal: '源数据',
      expOriginalTitle: '是否需要导出源数据，如果勾上则支持导入到表格中',
      expPrint: '打印',
      expConfirm: '导出'
    },
    modal: {
      zoomIn: '最大化',
      zoomOut: '还原',
      close: '关闭'
    },
    form: {
      folding: '收起',
      unfolding: '展开'
    },
    toolbar: {
      import: '导入',
      export: '导出',
      print: '打印',
      refresh: '刷新',
      zoomIn: '全屏',
      zoomOut: '还原',
      custom: '列设置',
      customAll: '全部',
      customConfirm: '确认',
      customRestore: '还原'
    },
    input: {
      date: {
        m1: '01 月',
        m2: '02 月',
        m3: '03 月',
        m4: '04 月',
        m5: '05 月',
        m6: '06 月',
        m7: '07 月',
        m8: '08 月',
        m9: '09 月',
        m10: '10 月',
        m11: '11 月',
        m12: '12 月',
        monthLabel: '{0} 年',
        dayLabel: '{0} 年 {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy 年第 WW 周',
          month: 'yyyy-MM',
          year: 'yyyy'
        },
        weeks: {
          w: '周',
          w0: '周日',
          w1: '周一',
          w2: '周二',
          w3: '周三',
          w4: '周四',
          w5: '周五',
          w6: '周六'
        },
        months: {
          m0: '一月',
          m1: '二月',
          m2: '三月',
          m3: '四月',
          m4: '五月',
          m5: '六月',
          m6: '七月',
          m7: '八月',
          m8: '九月',
          m9: '十月',
          m10: '十一月',
          m11: '十二月'
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/vxe-table.js




























 // 按需加载的组件

var components = [// 模块
packages_column, packages_header, packages_footer, filter, packages_grid, packages_menu, packages_toolbar, packages_pager, packages_checkbox, packages_radio, packages_input, packages_textarea, packages_button, packages_modal, packages_tooltip, packages_form, packages_select, packages_switch, packages_list, packages_pulldown, edit, packages_export, packages_keyboard, validator, // 核心
packages_table]; // 默认安装

function vxe_table_install(Vue, options) {
  if (ctor_amd_xe_utils_default.a.isPlainObject(options)) {
    v_x_e_table.setup(options);
  }

  components.map(function (component) {
    return component.install(Vue);
  });
} // 默认中文


v_x_e_table.setup({
  i18n: function i18n(key, args) {
    return ctor_amd_xe_utils_default.a.template(ctor_amd_xe_utils_default.a.get(zh_CN, key), args, {
      tmplRE: /\{([.\w[\]\s]+)\}/g
    });
  }
});
v_x_e_table.install = vxe_table_install;

if (typeof window !== 'undefined' && window.Vue && window.Vue.use) {
  window.Vue.use(v_x_e_table);
}



























/* harmony default export */ var vxe_table = (v_x_e_table);
// CONCATENATED MODULE: ./index.js
// 默认主题
 // 默认安装全部模块



/* harmony default export */ var index_0 = (vxe_table);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (index_0);



/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ })["default"];
});