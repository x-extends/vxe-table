module.exports =
/******/ (function(modules) { // webpackBootstrap
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

/***/ "07ac":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var $values = __webpack_require__("6f53").values;

// `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});


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

/***/ "1546":
/***/ (function(module, exports) {

module.exports = require("xe-utils/methods/xe-utils");

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
var sloppyArrayMethod = __webpack_require__("b301");

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
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
var V8_VERSION = __webpack_require__("60ae");

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
var bind = __webpack_require__("f8c2");
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
var toASCII = __webpack_require__("c98e");
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
var ALPHANUMERIC = /[\d+\-.A-Za-z]/;
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
var createNonEnumerableProperty = __webpack_require__("9112");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, create(null));
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
var forcedStringTrimMethod = __webpack_require__("e070");

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
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var setSpecies = __webpack_require__("2626");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || fails(function () {
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
    return !thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined ? pattern
      : inheritIfRequired(CORRECT_NEW
        ? new NativeRegExp(patternIsRegExp && !flagsAreUndefined ? pattern.source : pattern, flags)
        : NativeRegExp((patternIsRegExp = pattern instanceof RegExpWrapper)
          ? pattern.source
          : pattern, patternIsRegExp && flagsAreUndefined ? getFlags.call(pattern) : flags)
      , thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
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

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var fails = __webpack_require__("d039");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
  [].filter.call({ length: -1, 0: 1 }, function (it) { throw it; });
});

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

var bind = __webpack_require__("f8c2");
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
  var index = 0;
  var iteratorMethod = getIteratorMethod(O);
  var length, result, step, iterator, next;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      createProperty(result, index, mapping
        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
        : step.value
      );
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "4e82":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var aFunction = __webpack_require__("1c0b");
var toObject = __webpack_require__("7b0b");
var fails = __webpack_require__("d039");
var sloppyArrayMethod = __webpack_require__("b301");

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var SLOPPY_METHOD = sloppyArrayMethod('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});


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
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
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
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
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
  version: '3.5.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
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

/***/ "60ae":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("b39a");

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
var bind = __webpack_require__("f8c2");
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

/***/ "6f53":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var objectKeys = __webpack_require__("df75");
var toIndexedObject = __webpack_require__("fc6a");
var propertyIsEnumerable = __webpack_require__("d1e7").f;

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod(false)
};


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
var wrappedWellKnownSymbolModule = __webpack_require__("c032");
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
var IE_PROTO = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;


/***/ }),

/***/ "7db0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $find = __webpack_require__("b727").find;
var addToUnscopables = __webpack_require__("44d2");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
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
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
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
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
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
var bind = __webpack_require__("f8c2");
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
var V8_VERSION = __webpack_require__("60ae");

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

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var sloppyArrayMethod = __webpack_require__("b301");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var SLOPPY_METHOD = sloppyArrayMethod('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
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

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
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
var wrappedWellKnownSymbolModule = __webpack_require__("c032");
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

var isSymbol = NATIVE_SYMBOL && typeof $Symbol.iterator == 'symbol' ? function (it) {
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

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

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

if (!USE_SYMBOL_AS_UID) {
  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };
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

/***/ "b301":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "b39a":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


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
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : uid;

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

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("f8c2");
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

/***/ "c032":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


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
var forcedStringHTMLMethod = __webpack_require__("eae9");

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

/***/ "c975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $indexOf = __webpack_require__("4d64").indexOf;
var sloppyArrayMethod = __webpack_require__("b301");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "c98e":
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

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
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

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");

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
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
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
    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  }
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var fails = __webpack_require__("d039");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
  [].map.call({ length: -1, 0: 1 }, function (it) { throw it; });
});

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

/***/ "e070":
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

/***/ "e25e":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var parseIntImplementation = __webpack_require__("e583");

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
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

/***/ "e583":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var trim = __webpack_require__("58a8").trim;
var whitespaces = __webpack_require__("5899");

var nativeParseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return nativeParseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : nativeParseInt;


/***/ }),

/***/ "e58c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var sloppyArrayMethod = __webpack_require__("b301");

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('lastIndexOf');

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = (NEGATIVE_ZERO || SLOPPY_METHOD) ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
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

/***/ "eae9":
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

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "f8c2":
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

// EXTERNAL MODULE: ./styles/index.scss
var styles = __webpack_require__("1a97");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: external {"root":"XEUtils","commonjs":"xe-utils/methods/xe-utils","commonjs2":"xe-utils/methods/xe-utils","amd":"xe-utils"}
var xe_utils_amd_xe_utils_ = __webpack_require__("1546");
var xe_utils_amd_xe_utils_default = /*#__PURE__*/__webpack_require__.n(xe_utils_amd_xe_utils_);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// CONCATENATED MODULE: ./packages/v-x-e-table/src/interceptor.js









function toType(type) {
  return xe_utils_amd_xe_utils_default.a.toString(type).replace('_', '').toLowerCase();
}

var eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType);
var _storeMap = {};
var Interceptor = {
  mixin: function mixin(map) {
    xe_utils_amd_xe_utils_default.a.each(map, function (callback, type) {
      return Interceptor.add(type, callback);
    });
    return Interceptor;
  },
  get: function get(type) {
    return _storeMap[toType(type)] || [];
  },
  add: function add(type, callback) {
    type = toType(type);

    if (callback && xe_utils_amd_xe_utils_default.a.includes(eventTypes, type)) {
      var eList = _storeMap[type];

      if (!eList) {
        eList = _storeMap[type] = [];
      }

      eList.push(callback);
    }

    return Interceptor;
  },
  delete: function _delete(type, callback) {
    var eList = _storeMap[toType(type)];

    if (eList) {
      xe_utils_amd_xe_utils_default.a.remove(eList, function (cb) {
        return cb === callback;
      });
    }

    return Interceptor;
  }
};
/* harmony default export */ var interceptor = (Interceptor);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

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
// CONCATENATED MODULE: ./packages/conf/index.js
var GlobalConfig = {
  // showOverflow: null,
  // showHeaderOverflow: null,
  // resizeInterval: 250,
  // size: null,
  // radioConfig: {
  //   trigger: 'default'
  // },
  // checkboxConfig: {
  //   trigger: 'default'
  // },
  // sortConfig: {
  //   remote: false,
  //   trigger: 'default'
  // },
  // filterConfig: {
  //   remote: false
  // },
  // expandConfig: {
  //   trigger: 'default'
  // },
  // treeConfig: {
  //   children: 'children',
  //   hasChild: 'hasChild',
  //   indent: 20
  // },
  // tooltipConfig: {
  //   theme: 'dark'
  // },
  // validConfig: {
  //   message: 'default'
  // },
  // resizable: false,
  // stripe: false,
  // border: false,
  fit: true,
  emptyCell: '　',
  showHeader: true,
  zIndex: 100,
  rowId: '_XID',
  // 行数据的唯一主键字段名
  version: 0,
  // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  optimization: {
    animat: true,
    delayHover: 250,
    // rHeights: {
    //   default: 48,
    //   medium: 44,
    //   small: 40,
    //   mini: 36
    // },
    scrollX: {
      gt: 80 // oSize: 0,
      // rSize: 0
      // vSize: 0

    },
    scrollY: {
      gt: 200 // oSize: 0,
      // rSize: 0
      // vSize: 0,
      // rHeight: 0

    }
  },
  icon: {
    sortAsc: 'vxe-icon--caret-top',
    sortDesc: 'vxe-icon--caret-bottom',
    filterNone: 'vxe-icon--funnel',
    filterMatch: 'vxe-icon--funnel',
    edit: 'vxe-icon--edit-outline',
    treeLoaded: 'vxe-icon--refresh roll',
    treeOpen: 'vxe-icon--caret-right rotate90',
    treeClose: 'vxe-icon--caret-right',
    expandLoaded: 'vxe-icon--refresh roll',
    expandOpen: 'vxe-icon--arrow-right rotate90',
    expandClose: 'vxe-icon--arrow-right',
    refresh: 'vxe-icon--refresh',
    refreshLoading: 'vxe-icon--refresh roll',
    import: 'vxe-icon--upload',
    importRemove: 'vxe-icon--close',
    export: 'vxe-icon--download',
    zoomIn: 'vxe-icon--zoomin',
    zoomOut: 'vxe-icon--zoomout',
    custom: 'vxe-icon--menu',
    jumpPrev: 'vxe-icon--d-arrow-left',
    jumpNext: 'vxe-icon--d-arrow-right',
    prevPage: 'vxe-icon--arrow-left',
    nextPage: 'vxe-icon--arrow-right',
    jumpMore: 'vxe-icon--more',
    modalZoomIn: 'vxe-icon--zoomin',
    modalZoomOut: 'vxe-icon--zoomout',
    modalClose: 'vxe-icon--close',
    modalInfo: 'vxe-icon--info',
    modalSuccess: 'vxe-icon--success',
    modalWarning: 'vxe-icon--warning',
    modalError: 'vxe-icon--error',
    modalQuestion: 'vxe-icon--question',
    modalLoading: 'vxe-icon--refresh roll',
    caretBottom: 'vxe-icon--caret-bottom',
    dropdownBottom: 'vxe-icon--arrow-bottom',
    btnLoading: 'vxe-icon--refresh roll'
  },
  grid: {},
  menu: {},
  tooltip: {
    trigger: 'hover',
    theme: 'dark',
    leaveDelay: 300
  },
  pager: {// perfect: true,
    // pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  toolbar: {// import: {
    //   mode: 'covering'
    // },
    // export: {
    //   types: ['csv', 'html', 'xml', 'txt']
    // },
    // resizable: {
    //   storage: false
    // },
    // custom: {
    //   storage: false,
    //   isFooter: true
    // },
    // buttons: []
  },
  modal: {
    minWidth: 340,
    minHeight: 200,
    lockView: true,
    mask: true,
    duration: 3000,
    marginSize: 8,
    dblclickZoom: true,
    animat: true
  },
  i18n: function i18n(key) {
    return key;
  }
};
/* harmony default export */ var conf = (GlobalConfig);
// CONCATENATED MODULE: ./packages/tools/src/utils.js














var zindexIndex = 0;
var lastZindex = 0;
var columnUniqueId = 0;

var utils_ColumnConfig =
/*#__PURE__*/
function () {
  function ColumnConfig($table, _vm) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        renderHeader = _ref.renderHeader,
        renderCell = _ref.renderCell,
        renderData = _ref.renderData;

    _classCallCheck(this, ColumnConfig);

    var formatter = _vm.formatter;

    if (_vm.cellRender && _vm.editRender) {
      UtilTools.warn('vxe.error.cellEditRender');
    }

    if (_vm.type === 'index') {
      UtilTools.warn('vxe.error.delProp', ['index', 'seq']);
    } else if (_vm.type === 'selection') {
      UtilTools.warn('vxe.error.delProp', ['selection', 'checkbox']);
    } else if (_vm.type === 'expand') {
      if ($table.treeConfig && $table.treeOpts.line) {
        UtilTools.error('vxe.error.treeLineExpand');
      }

      if (_vm.slots && !_vm.slots.content && _vm.slots.default) {
        UtilTools.warn('vxe.error.expandContent');
      }
    }

    if (formatter) {
      if (xe_utils_amd_xe_utils_default.a.isString(formatter)) {
        if (!xe_utils_amd_xe_utils_default.a.isFunction(xe_utils_amd_xe_utils_default.a[formatter])) {
          UtilTools.error('vxe.error.notFunc', [formatter]);
        }
      } else if (xe_utils_amd_xe_utils_default.a.isArray(formatter)) {
        if (!xe_utils_amd_xe_utils_default.a.isFunction(xe_utils_amd_xe_utils_default.a[formatter[0]])) {
          UtilTools.error('vxe.error.notFunc', [formatter[0]]);
        }
      }
    }

    Object.assign(this, {
      // 基本属性
      id: "col_".concat(++columnUniqueId),
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
      footerAlign: _vm.footerAlign,
      showOverflow: _vm.showOverflow,
      showHeaderOverflow: _vm.showHeaderOverflow,
      className: _vm.class || _vm.className,
      headerClassName: _vm.headerClassName,
      footerClassName: _vm.footerClassName,
      indexMethod: _vm.indexMethod,
      formatter: formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      sortMethod: _vm.sortMethod,
      remoteSort: _vm.remoteSort,
      filters: UtilTools.getFilters(_vm.filters),
      filterMultiple: xe_utils_amd_xe_utils_default.a.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
      filterMethod: _vm.filterMethod,
      filterRender: _vm.filterRender,
      treeNode: _vm.treeNode,
      cellRender: _vm.cellRender,
      editRender: _vm.editRender,
      // 自定义参数
      params: _vm.params,
      // 渲染属性
      visible: xe_utils_amd_xe_utils_default.a.isBoolean(_vm.visible) ? _vm.visible : true,
      checked: false,
      disabled: false,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      renderWidth: 0,
      renderHeight: 0,
      resizeWidth: 0,
      renderLeft: 0,
      model: {},
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots,
      own: _vm
    });
  }

  _createClass(ColumnConfig, [{
    key: "getTitle",
    value: function getTitle() {
      // 在 v3.0 中废弃 label、type=index
      return UtilTools.getFuncText(this.own.title || this.own.label || (this.type === 'seq' || this.type === 'index' ? conf.i18n('vxe.table.seqTitle') : ''));
    }
  }, {
    key: "update",
    value: function update(name, value) {
      // 不支持双向的属性
      if (!['filters'].includes(name)) {
        this[name] = value;
      }
    }
  }]);

  return ColumnConfig;
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
  getLog: function getLog(message, params) {
    return "[vxe-table] ".concat(xe_utils_amd_xe_utils_default.a.template(conf.i18n(message), params));
  },
  getSize: function getSize(_ref2) {
    var size = _ref2.size,
        $parent = _ref2.$parent;
    return size || ($parent && ['medium', 'small', 'mini'].indexOf($parent.size) > -1 ? $parent.size : null);
  },
  getFuncText: function getFuncText(content) {
    return xe_utils_amd_xe_utils_default.a.isFunction(content) ? content() : conf.translate ? conf.translate(content) : content;
  },
  nextZIndex: function nextZIndex($table) {
    if ($table && $table.zIndex) {
      return $table.zIndex;
    }

    lastZindex = conf.zIndex + zindexIndex++;
    return lastZindex;
  },
  getLastZIndex: function getLastZIndex() {
    return lastZindex;
  },
  // 行主键 key
  getRowkey: function getRowkey($table) {
    return $table.rowId;
  },
  // 行主键 value
  getRowid: function getRowid($table, row) {
    var rowId = xe_utils_amd_xe_utils_default.a.get(row, UtilTools.getRowkey($table));
    return rowId ? encodeURIComponent(rowId) : '';
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
      result.push.apply(result, column.children && column.children.length ? UtilTools.getColumnList(column.children) : [column]);
    });
    return result;
  },
  getClass: function getClass(property, params) {
    return property ? xe_utils_amd_xe_utils_default.a.isFunction(property) ? property(params) : property : '';
  },
  getFilters: function getFilters(filters) {
    return (filters || []).map(function (_ref3) {
      var label = _ref3.label,
          value = _ref3.value,
          data = _ref3.data,
          checked = _ref3.checked;
      return {
        label: label,
        value: value,
        data: data,
        _data: data,
        checked: !!checked
      };
    });
  },
  formatText: function formatText(value, placeholder) {
    return '' + (value === null || value === void 0 ? placeholder ? conf.emptyCell : '' : value);
  },
  getCellValue: function getCellValue(row, column) {
    return xe_utils_amd_xe_utils_default.a.get(row, column.property);
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

      if (cacheFormat) {
        rest = fullAllDataRowMap.get(row);
        formatData = rest.formatData;

        if (!formatData) {
          formatData = fullAllDataRowMap.get(row).formatData = {};
        }
      }

      if (rest && formatData[colid]) {
        if (formatData[colid].value === cellValue) {
          return formatData[colid].label;
        }
      }

      if (xe_utils_amd_xe_utils_default.a.isString(formatter)) {
        cellLabel = xe_utils_amd_xe_utils_default.a[formatter] ? xe_utils_amd_xe_utils_default.a[formatter](cellValue) : '';
      } else if (xe_utils_amd_xe_utils_default.a.isArray(formatter)) {
        cellLabel = xe_utils_amd_xe_utils_default.a[formatter[0]] ? xe_utils_amd_xe_utils_default.a[formatter[0]].apply(xe_utils_amd_xe_utils_default.a, [cellValue].concat(formatter.slice(1))) : '';
      } else {
        cellLabel = formatter(Object.assign({
          cellValue: cellValue
        }, params));
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
    return xe_utils_amd_xe_utils_default.a.set(row, column.property, value);
  },
  getColumnConfig: function getColumnConfig($table, _vm, options) {
    return _vm instanceof utils_ColumnConfig ? _vm : new utils_ColumnConfig($table, _vm, options);
  },
  // 组装列配置
  assemColumn: function assemColumn(_vm) {
    var $table = _vm.$table,
        $column = _vm.$column,
        columnConfig = _vm.columnConfig;
    var groupConfig = $column ? $column.columnConfig : null;
    columnConfig.slots = _vm.$scopedSlots;

    if (groupConfig && $column.$children.length > 0) {
      if (!groupConfig.children) {
        groupConfig.children = [];
      }

      groupConfig.children.splice([].indexOf.call($column.$el.children, _vm.$el), 0, columnConfig);
    } else {
      $table.collectColumn.splice([].indexOf.call($table.$refs.hideColumn.children, _vm.$el), 0, columnConfig);
    }
  },
  // 销毁列
  destroyColumn: function destroyColumn(_vm) {
    var $table = _vm.$table,
        columnConfig = _vm.columnConfig;
    var matchObj = xe_utils_amd_xe_utils_default.a.findTree($table.collectColumn, function (column) {
      return column === columnConfig;
    });

    if (matchObj) {
      matchObj.items.splice(matchObj.index, 1);
    }
  },
  hasChildrenList: function hasChildrenList(item) {
    return item && item.children && item.children.length > 0;
  },
  parseFile: function parseFile(file) {
    var name = file.name;
    var tIndex = xe_utils_amd_xe_utils_default.a.lastIndexOf(name, '.');
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










var browse = xe_utils_amd_xe_utils_default.a.browse();
var htmlElem = browse.isDoc ? document.querySelector('html') : 0;
var dom_bodyElem = browse.isDoc ? document.body : 0;

function getClsRE(cls) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp("(?:^|\\s)".concat(cls, "(?!\\S)"), 'g');
  }

  return reClsMap[cls];
}

var reClsMap = {};
var DomTools = {
  browse: browse,
  isPx: function isPx(val) {
    return val && /^\d+(px)?$/.test(val);
  },
  isScale: function isScale(val) {
    return val && /^\d+%$/.test(val);
  },
  hasClass: function hasClass(elem, cls) {
    return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls));
  },
  removeClass: function removeClass(elem, cls) {
    if (elem && DomTools.hasClass(elem, cls)) {
      elem.className = elem.className.replace(getClsRE(cls), '');
    }
  },
  addClass: function addClass(elem, cls) {
    if (elem && !DomTools.hasClass(elem, cls)) {
      DomTools.removeClass(elem, cls);
      elem.className = "".concat(elem.className, " ").concat(cls);
    }
  },
  updateCellTitle: function updateCellTitle(evnt) {
    var cellElem = evnt.currentTarget.querySelector('.vxe-cell');
    var content = cellElem.innerText;

    if (cellElem.getAttribute('title') !== content) {
      cellElem.setAttribute('title', content);
    }
  },
  rowToVisible: function rowToVisible($table, row) {
    var bodyElem = $table.$refs.tableBody.$el;
    var trElem = bodyElem.querySelector("[data-rowid=\"".concat(utils.getRowid($table, row), "\"]"));

    if (trElem) {
      var bodyHeight = bodyElem.clientHeight;
      var bodySrcollTop = bodyElem.scrollTop;
      var trOffsetTop = trElem.offsetTop + (trElem.offsetParent ? trElem.offsetParent.offsetTop : 0);
      var trHeight = trElem.clientHeight; // 检测行是否在可视区中

      if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
        // 向上定位
        return $table.scrollTo(null, trOffsetTop);
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        // 向下定位
        return $table.scrollTo(null, bodySrcollTop + trHeight);
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($table.scrollYLoad) {
        return $table.scrollTo(null, ($table.afterFullData.indexOf(row) - 1) * $table.scrollYStore.rowHeight);
      }
    }

    return Promise.resolve();
  },
  colToVisible: function colToVisible($table, column) {
    var bodyElem = $table.$refs.tableBody.$el;
    var tdElem = bodyElem.querySelector(".".concat(column.id));

    if (tdElem) {
      var bodyWidth = bodyElem.clientWidth;
      var bodySrcollLeft = bodyElem.scrollLeft;
      var tdOffsetLeft = tdElem.offsetLeft + (tdElem.offsetParent ? tdElem.offsetParent.offsetLeft : 0);
      var tdWidth = tdElem.clientWidth; // 检测行是否在可视区中

      if (tdOffsetLeft < bodySrcollLeft || tdOffsetLeft > bodySrcollLeft + bodyWidth) {
        // 向左定位
        return $table.scrollTo(tdOffsetLeft);
      } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
        // 向右定位
        return $table.scrollTo(bodySrcollLeft + tdWidth);
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($table.scrollXLoad) {
        var visibleColumn = $table.visibleColumn;
        var scrollLeft = 0;

        for (var index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index] === column) {
            break;
          }

          scrollLeft += visibleColumn[index].renderWidth;
        }

        return $table.scrollTo(scrollLeft);
      }
    }

    return Promise.resolve();
  },
  getDomNode: function getDomNode() {
    var documentElement = document.documentElement;
    var bodyElem = document.body;
    return {
      scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
      scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
      visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
      visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
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

  /**
   * 获取单元格节点索引
   */
  getCellNodeIndex: function getCellNodeIndex(cell) {
    var trElem = cell.parentNode;
    var columnIndex = xe_utils_amd_xe_utils_default.a.arrayIndexOf(trElem.children, cell);
    var rowIndex = xe_utils_amd_xe_utils_default.a.arrayIndexOf(trElem.parentNode.children, trElem);
    return {
      columnIndex: columnIndex,
      rowIndex: rowIndex
    };
  },

  /**
   * 获取选中单元格矩阵范围
   */
  getRowNodes: function getRowNodes(trList, cellNode, targetCellNode) {
    var startColIndex = cellNode.columnIndex;
    var startRowIndex = cellNode.rowIndex;
    var targetColIndex = targetCellNode.columnIndex;
    var targetRowIndex = targetCellNode.rowIndex;
    var rows = [];

    for (var rowIndex = Math.min(startRowIndex, targetRowIndex), rowLen = Math.max(startRowIndex, targetRowIndex); rowIndex <= rowLen; rowIndex++) {
      var cells = [];
      var trElem = trList[rowIndex];

      for (var colIndex = Math.min(startColIndex, targetColIndex), colLen = Math.max(startColIndex, targetColIndex); colIndex <= colLen; colIndex++) {
        var tdElem = trElem.children[colIndex];
        cells.push(tdElem);
      }

      rows.push(cells);
    }

    return rows;
  },
  getCellIndexs: function getCellIndexs(cell) {
    var trElem = cell.parentNode;
    var rowid = trElem.getAttribute('data-rowid');
    var columnIndex = [].indexOf.call(trElem.children, cell);
    var rowIndex = [].indexOf.call(trElem.parentNode.children, trElem);
    return {
      rowid: rowid,
      rowIndex: rowIndex,
      columnIndex: columnIndex
    };
  },
  getCell: function getCell($table, _ref) {
    var row = _ref.row,
        column = _ref.column;
    var rowid = utils.getRowid($table, row);
    var bodyElem = $table.$refs["".concat(column.fixed || 'table', "Body")];
    return (bodyElem || $table.$refs.tableBody).$el.querySelector(".vxe-body--row[data-rowid=\"".concat(rowid, "\"] .").concat(column.id));
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
// CONCATENATED MODULE: ./packages/tools/src/event.js

 // 监听全局事件

var event_browse = dom.browse;
var wheelName = event_browse.isDoc && /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel';
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
    xe_utils_amd_xe_utils_default.a.remove(eventStore, function (item) {
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

if (event_browse.isDoc) {
  document.addEventListener('keydown', GlobalEvent.trigger, false);
  document.addEventListener('contextmenu', GlobalEvent.trigger, false);
  window.addEventListener('mousedown', GlobalEvent.trigger, false);
  window.addEventListener('blur', GlobalEvent.trigger, false);
  window.addEventListener('resize', GlobalEvent.trigger, false);
  window.addEventListener(wheelName, GlobalEvent.trigger, false);
}

/* harmony default export */ var src_event = (GlobalEvent);
// CONCATENATED MODULE: ./packages/tools/index.js






/* harmony default export */ var tools = ({
  UtilTools: utils,
  DomTools: dom,
  GlobalEvent: src_event
});
// CONCATENATED MODULE: ./packages/v-x-e-table/src/renderer.js








function renderer_getAttrs(_ref) {
  var name = _ref.name,
      attrs = _ref.attrs;

  if (name === 'input') {
    attrs = Object.assign({
      type: 'text'
    }, attrs);
  }

  return attrs;
}

function isSyncCell(renderOpts, params, context) {
  return renderOpts.immediate || renderOpts.type === 'visible' || context.$type === 'cell';
}
/**
 * 内置渲染器
 * 支持原生的 input、textarea、select
 */


function defaultEditRender(h, renderOpts, params, context) {
  var row = params.row,
      column = params.column;
  var name = renderOpts.name;
  var attrs = renderer_getAttrs(renderOpts);
  var cellValue = isSyncCell(renderOpts, params, context) ? UtilTools.getCellValue(row, column) : column.model.value;
  return [h(name, {
    class: "vxe-default-".concat(name),
    attrs: attrs,
    domProps: {
      value: cellValue
    },
    on: getEvents(renderOpts, params, context)
  })];
}

function getEvents(renderOpts, params, context) {
  var name = renderOpts.name,
      events = renderOpts.events;
  var $table = params.$table,
      row = params.row,
      column = params.column;
  var model = column.model;
  var isSelect = name === 'select';
  var type = isSelect ? 'change' : 'input';

  var on = _defineProperty({}, type, function (evnt) {
    var cellValue = evnt.target.value;

    if (isSyncCell(renderOpts, params, context)) {
      UtilTools.setCellValue(row, column, cellValue);
    } else {
      model.update = true;
      model.value = cellValue;
    }

    $table.updateStatus(params, cellValue);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return xe_utils_amd_xe_utils_default.a.assign({}, xe_utils_amd_xe_utils_default.a.objectMap(events, function (cb) {
      return function () {
        cb.apply(null, [params].concat.apply(params, arguments));
      };
    }), on);
  }

  return on;
}

function renderOptgroups(h, renderOpts, params, context) {
  var optionGroups = renderOpts.optionGroups,
      _renderOpts$optionGro = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro === void 0 ? {} : _renderOpts$optionGro;
  var groupOptions = optionGroupProps.options || 'options';
  var groupLabel = optionGroupProps.label || 'label';
  return optionGroups.map(function (group, gIndex) {
    return h('optgroup', {
      domProps: {
        label: group[groupLabel]
      },
      key: gIndex
    }, renderer_renderOptions(h, group[groupOptions], renderOpts, params, context));
  });
}

function renderer_renderOptions(h, options, renderOpts, params, context) {
  var _renderOpts$optionPro = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro === void 0 ? {} : _renderOpts$optionPro;
  var row = params.row,
      column = params.column;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';
  var cellValue = isSyncCell(renderOpts, params, context) ? UtilTools.getCellValue(row, column) : column.model.value;
  return options.map(function (item, index) {
    return h('option', {
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        selected: item[valueProp] === cellValue
      },
      key: index
    }, item[labelProp]);
  });
}

function getFilterEvents(item, renderOpts, params, context) {
  var _params = params,
      column = _params.column;
  var events = renderOpts.events;
  var type = name === 'select' ? 'change' : 'input';

  var on = _defineProperty({}, type, function (evnt) {
    item.data = evnt.target.value;
    handleConfirmFilter(context, column, !!item.data, item);

    if (events && events[type]) {
      events[type](Object.assign({
        context: context
      }, params), evnt);
    }
  });

  if (events) {
    return xe_utils_amd_xe_utils_default.a.assign({}, xe_utils_amd_xe_utils_default.a.objectMap(events, function (cb) {
      return function () {
        params = Object.assign({
          context: context
        }, params);
        cb.apply(null, [params].concat.apply(params, arguments));
      };
    }), on);
  }

  return on;
}

function defaultFilterRender(h, renderOpts, params, context) {
  var column = params.column;
  var name = renderOpts.name;
  var attrs = renderer_getAttrs(renderOpts);
  return column.filters.map(function (item) {
    return h(name, {
      class: "vxe-default-".concat(name),
      attrs: attrs,
      domProps: {
        value: item.data
      },
      on: getFilterEvents(item, renderOpts, params, context)
    });
  });
}

function handleConfirmFilter(context, column, checked, item) {
  context[column.filterMultiple ? 'changeMultipleOption' : 'changeRadioOption']({}, checked, item);
}

function defaultFilterMethod(_ref2) {
  var option = _ref2.option,
      row = _ref2.row,
      column = _ref2.column;
  var data = option.data;
  var cellValue = xe_utils_amd_xe_utils_default.a.get(row, column.property);
  /* eslint-disable eqeqeq */

  return cellValue == data;
}

function renderSelectEdit(h, renderOpts, params, context) {
  return [h('select', {
    class: 'vxe-default-select',
    attrs: renderer_getAttrs(renderOpts),
    on: getEvents(renderOpts, params, context)
  }, renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params, context) : renderer_renderOptions(h, renderOpts.options, renderOpts, params, context))];
}

var renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod
  },
  select: {
    renderEdit: renderSelectEdit,
    renderDefault: renderSelectEdit,
    renderCell: function renderCell(h, renderOpts, params, context) {
      var options = renderOpts.options,
          optionGroups = renderOpts.optionGroups,
          _renderOpts$optionPro2 = renderOpts.optionProps,
          optionProps = _renderOpts$optionPro2 === void 0 ? {} : _renderOpts$optionPro2,
          _renderOpts$optionGro2 = renderOpts.optionGroupProps,
          optionGroupProps = _renderOpts$optionGro2 === void 0 ? {} : _renderOpts$optionGro2;
      var row = params.row,
          column = params.column;
      var cellValue = xe_utils_amd_xe_utils_default.a.get(row, column.property);
      var selectItem;
      var labelProp = optionProps.label || 'label';
      var valueProp = optionProps.value || 'value';

      if (optionGroups) {
        var groupOptions = optionGroupProps.options || 'options';

        for (var index = 0; index < optionGroups.length; index++) {
          selectItem = xe_utils_amd_xe_utils_default.a.find(optionGroups[index][groupOptions], function (item) {
            return item[valueProp] === cellValue;
          });

          if (selectItem) {
            break;
          }
        }

        return selectItem ? selectItem[labelProp] : cellValue;
      } else {
        selectItem = xe_utils_amd_xe_utils_default.a.find(options, function (item) {
          return item[valueProp] === cellValue;
        });
        return selectItem ? selectItem[labelProp] : cellValue;
      }
    },
    renderFilter: function renderFilter(h, renderOpts, params, context) {
      var column = params.column;
      return column.filters.map(function (item) {
        return h('select', {
          class: 'vxe-default-select',
          attrs: renderer_getAttrs(renderOpts),
          on: getFilterEvents(item, renderOpts, params, context)
        }, renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params) : renderer_renderOptions(h, renderOpts.options, renderOpts, params, context));
      });
    },
    filterMethod: defaultFilterMethod
  }
};
/**
 * 全局渲染器
 */

var Renderer = {
  mixin: function mixin(map) {
    xe_utils_amd_xe_utils_default.a.each(map, function (options, name) {
      return Renderer.add(name, options);
    });
    return Renderer;
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

    return Renderer;
  },
  delete: function _delete(name) {
    delete renderMap[name];
    return Renderer;
  }
};
/* harmony default export */ var renderer = (Renderer);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/buttons.js
// 全局的工具栏按钮
var buttons_storeMap = {};
var Buttons = {
  mixin: function mixin(map) {
    Object.assign(buttons_storeMap, map);
    return Buttons;
  },
  get: function get(type) {
    return buttons_storeMap[type];
  },
  add: function add(type, callback) {
    buttons_storeMap[type] = callback;
    return Buttons;
  },
  delete: function _delete(type) {
    delete buttons_storeMap[type];
    return Buttons;
  }
};
/* harmony default export */ var src_buttons = (Buttons);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/menus.js
// 全局的快捷菜单
var menus_storeMap = {};
var Menus = {
  mixin: function mixin(map) {
    Object.assign(menus_storeMap, map);
    return Menus;
  },
  get: function get(type) {
    return menus_storeMap[type];
  },
  add: function add(type, callback) {
    menus_storeMap[type] = callback;
    return Menus;
  },
  delete: function _delete(type) {
    delete menus_storeMap[type];
    return Menus;
  }
};
/* harmony default export */ var menus = (Menus);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/setup.js



function mergeOpts(data1, data2) {
  if (data1 && xe_utils_amd_xe_utils_default.a.isObject(data2)) {
    xe_utils_amd_xe_utils_default.a.objectEach(data2, function (val, key) {
      data1[key] = data1[key] && val ? mergeOpts(data1[key], val) : val;
    });
    return data1;
  }

  return data2;
}
/**
 * 全局参数设置
 */


function setup() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mergeOpts(conf, options);
  return conf;
}

/* harmony default export */ var src_setup = (setup);
// CONCATENATED MODULE: ./packages/v-x-e-table/index.js










var installedPlugins = [];

function use(Plugin, options) {
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
  if (VXETable.Table) {
    UtilTools.error('vxe.error.useErr', [key]);
  }

  VXETable["_".concat(key)] = 1;
}

var VXETable = {
  t: function t(key) {
    return conf.i18n(key);
  },
  v: 'v2',
  reg: reg,
  use: use,
  types: {},
  setup: src_setup,
  interceptor: interceptor,
  renderer: renderer,
  buttons: src_buttons,
  menus: menus
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
/**
 * 获取所有导出类型
 */

Object.defineProperty(VXETable, 'exportTypes', {
  get: function get() {
    return Object.keys(VXETable.types);
  }
});
/**
 * 获取所有导入类型
 */

Object.defineProperty(VXETable, 'importTypes', {
  get: function get() {
    var rest = [];
    xe_utils_amd_xe_utils_default.a.each(VXETable.types, function (flag, type) {
      if (flag) {
        rest.push(type);
      }
    });
    return rest;
  }
});




/* harmony default export */ var v_x_e_table = (VXETable);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.map.js
var es_map = __webpack_require__("4ec9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.parse-int.js
var es_parse_int = __webpack_require__("e25e");

// CONCATENATED MODULE: ./packages/cell/src/cell.js








var Cell = {
  createColumn: function createColumn($table, _vm) {
    var type = _vm.type,
        sortable = _vm.sortable,
        remoteSort = _vm.remoteSort,
        filters = _vm.filters,
        editRender = _vm.editRender,
        treeNode = _vm.treeNode;
    var checkboxOpts = $table.checkboxOpts;
    var renMaps = {
      renderHeader: this.renderHeader,
      renderCell: treeNode ? this.renderTreeCell : this.renderCell
    };

    switch (type) {
      case 'seq':
      case 'index':
        renMaps.renderHeader = this.renderIndexHeader;
        renMaps.renderCell = treeNode ? this.renderTreeIndexCell : this.renderIndexCell;
        break;

      case 'radio':
        renMaps.renderHeader = this.renderRadioHeader;
        renMaps.renderCell = treeNode ? this.renderTreeRadioCell : this.renderRadioCell;
        break;
      // 在 v3.0 中废弃 type=selection

      case 'checkbox':
      case 'selection':
        renMaps.renderHeader = this.renderSelectionHeader;
        renMaps.renderCell = checkboxOpts.checkField ? treeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp : treeNode ? this.renderTreeSelectionCell : this.renderSelectionCell;
        break;

      case 'expand':
        renMaps.renderCell = this.renderExpandCell;
        renMaps.renderData = this.renderExpandData;
        break;

      default:
        if (editRender) {
          renMaps.renderHeader = this.renderEditHeader;
          renMaps.renderCell = $table.editConfig && $table.editConfig.mode === 'cell' ? treeNode ? this.renderTreeCellEdit : this.renderCellEdit : treeNode ? this.renderTreeRadioCell : this.renderRowEdit;
        } else if (filters && filters.length && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader;
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader;
        } else if (filters && filters.length) {
          renMaps.renderHeader = this.renderFilterHeader;
        }

    }

    return UtilTools.getColumnConfig($table, _vm, renMaps);
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
    } // 在 v3.0 中废弃 label


    return [UtilTools.formatText(UtilTools.getFuncText(own.title || own.label), 1)];
  },
  renderCell: function renderCell(h, params) {
    var cellValue;
    var $table = params.$table,
        row = params.row,
        column = params.column;
    var slots = column.slots,
        own = column.own;
    var renderOpts = own.editRender || own.cellRender;

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    if (renderOpts) {
      var funName = own.editRender ? 'renderCell' : 'renderDefault';
      var compConf = Renderer.get(renderOpts.name);

      if (compConf && compConf[funName]) {
        return compConf[funName].call($table, h, renderOpts, params, {
          $type: own.editRender ? 'edit' : 'cell',
          $excel: $table.$parent,
          $table: $table,
          $column: column
        });
      }
    }

    cellValue = UtilTools.getCellLabel(row, column, params);
    return [UtilTools.formatText(cellValue, 1)];
  },
  renderTreeCell: function renderTreeCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderCell.call(this, h, params));
  },

  /**
   * 树节点
   */
  renderTreeIcon: function renderTreeIcon(h, params) {
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
        iconOpen = treeOpts.iconOpen,
        iconClose = treeOpts.iconClose;
    var rowChilds = row[children];
    var hasLazyChilds = false;
    var isAceived = false;
    var isLazyLoaded = false;
    var on = {};

    if (slots && slots.icon) {
      return slots.icon(params, h);
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

    return [h('span', {
      class: 'vxe-tree--indent',
      style: {
        width: "".concat(level * indent, "px")
      }
    }), h('span', {
      class: ['vxe-tree-wrapper', {
        'is--active': isAceived
      }],
      on: on
    }, rowChilds && rowChilds.length || hasLazyChilds ? [h('span', {
      class: 'vxe-tree--btn-wrapper'
    }, [h('i', {
      class: ['vxe-tree--node-btn', isLazyLoaded ? iconLoaded || conf.icon.treeLoaded : isAceived ? iconOpen || conf.icon.treeOpen : iconClose || conf.icon.treeClose]
    })])] : [])];
  },

  /**
   * 索引
   */
  renderIndexHeader: function renderIndexHeader(h, params) {
    var column = params.column;
    var slots = column.slots;

    if (slots && slots.header) {
      return slots.header(params, h);
    }

    return [UtilTools.formatText(column.getTitle(), 1)];
  },
  renderIndexCell: function renderIndexCell(h, params) {
    var $table = params.$table,
        column = params.column;
    var seqOpts = $table.seqOpts,
        startIndex = $table.startIndex;
    var slots = column.slots,
        indexMethod = column.indexMethod;

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    var $seq = params.$seq,
        seq = params.seq,
        level = params.level; // 在 v3.0 中废弃 startIndex、indexMethod

    var seqMethod = seqOpts.seqMethod || indexMethod;
    return [UtilTools.formatText(seqMethod ? seqMethod(params) : level ? "".concat($seq, ".").concat(seq) : (seqOpts.startIndex || startIndex) + seq, 1)];
  },
  renderTreeIndexCell: function renderTreeIndexCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderIndexCell(h, params));
  },

  /**
   * 单选
   */
  renderRadioHeader: function renderRadioHeader(h, params) {
    var column = params.column;
    var slots = column.slots,
        own = column.own;

    if (slots && slots.header) {
      return slots.header(params, h);
    } // 在 v3.0 中废弃 label


    return [UtilTools.formatText(UtilTools.getFuncText(own.title || own.label), 1)];
  },
  renderRadioCell: function renderRadioCell(h, params) {
    var _ref;

    var $table = params.$table,
        column = params.column,
        isHidden = params.isHidden;
    var vSize = $table.vSize,
        radioOpts = $table.radioOpts;
    var slots = column.slots;
    var labelField = radioOpts.labelField,
        checkMethod = radioOpts.checkMethod;
    var isDisabled = !!checkMethod;
    var selectRow = $table.selectRow;
    var row = params.row;
    var options = {
      attrs: {
        type: 'radio',
        name: "vxe-radio--".concat($table.id)
      }
    };

    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params);
        options.attrs.disabled = isDisabled;
      }

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
      class: ['vxe-radio', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', isDisabled), _ref)]
    }, [h('input', options), h('span', {
      class: 'vxe-radio--icon'
    }), labelField ? h('span', {
      class: 'vxe-radio--label'
    }, slots && slots.default ? slots.default(params, h) : xe_utils_amd_xe_utils_default.a.get(row, labelField)) : null])];
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
    var vSize = $table.vSize,
        isIndeterminate = $table.isIndeterminate,
        isAllCheckboxDisabled = $table.isAllCheckboxDisabled;
    var slots = column.slots,
        own = column.own;
    var checkboxOpts = $table.checkboxOpts; // 在 v3.0 中废弃 label

    var headerTitle = own.title || own.label;
    var options = {
      attrs: {
        type: 'checkbox',
        disabled: isAllCheckboxDisabled
      }
    };

    if (checkboxOpts.checkStrictly ? !checkboxOpts.showHeader : checkboxOpts.showHeader === false) {
      return slots && slots.header ? slots.header(params, h) : [UtilTools.getFuncText(headerTitle)];
    }

    if (!isHidden) {
      options.domProps = {
        checked: isAllCheckboxDisabled ? false : $table.isAllSelected
      };
      options.on = {
        change: function change(evnt) {
          $table.triggerCheckAllEvent(evnt, evnt.target.checked);
        }
      };
    }

    return [h('label', {
      class: ['vxe-checkbox', (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--disabled', options.attrs.disabled), _defineProperty(_ref2, 'is--indeterminate', isIndeterminate), _ref2)],
      attrs: {
        title: conf.i18n('vxe.table.allTitle')
      }
    }, [h('input', options), h('span', {
      class: 'vxe-checkbox--icon'
    }), headerTitle ? h('span', {
      class: 'vxe-checkbox--label'
    }, slots && slots.header ? slots.header(params, h) : UtilTools.getFuncText(headerTitle)) : null])];
  },
  renderSelectionCell: function renderSelectionCell(h, params) {
    var _ref3;

    var $table = params.$table,
        row = params.row,
        column = params.column,
        isHidden = params.isHidden;
    var vSize = $table.vSize,
        treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var _$table$checkboxOpts = $table.checkboxOpts,
        labelField = _$table$checkboxOpts.labelField,
        checkMethod = _$table$checkboxOpts.checkMethod;
    var slots = column.slots;
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
      class: 'vxe-checkbox--icon'
    }), labelField ? h('span', {
      class: 'vxe-checkbox--label'
    }, slots && slots.default ? slots.default(params, h) : xe_utils_amd_xe_utils_default.a.get(row, labelField)) : null])];
  },
  renderTreeSelectionCell: function renderTreeSelectionCell(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCell(h, params));
  },
  renderSelectionCellByProp: function renderSelectionCellByProp(h, params) {
    var _ref4;

    var $table = params.$table,
        row = params.row,
        column = params.column,
        isHidden = params.isHidden;
    var vSize = $table.vSize,
        treeConfig = $table.treeConfig,
        treeIndeterminates = $table.treeIndeterminates;
    var _$table$checkboxOpts2 = $table.checkboxOpts,
        labelField = _$table$checkboxOpts2.labelField,
        property = _$table$checkboxOpts2.checkField,
        checkMethod = _$table$checkboxOpts2.checkMethod;
    var slots = column.slots;
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
        checked: xe_utils_amd_xe_utils_default.a.get(row, property)
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
      class: 'vxe-checkbox--icon'
    }), labelField ? h('span', {
      class: 'vxe-checkbox--label'
    }, slots && slots.default ? slots.default(params, h) : xe_utils_amd_xe_utils_default.a.get(row, labelField)) : null])];
  },
  renderTreeSelectionCellByProp: function renderTreeSelectionCellByProp(h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCellByProp(h, params));
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
        iconOpen = expandOpts.iconOpen,
        iconClose = expandOpts.iconClose;
    var slots = column.slots;
    var isAceived = false;
    var isLazyLoaded = false;

    if (slots && slots.icon) {
      return slots.icon(params, h);
    }

    if (!isHidden) {
      isAceived = rowExpandeds.indexOf(params.row) > -1;

      if (lazy) {
        isLazyLoaded = expandLazyLoadeds.indexOf(row) > -1;
      }
    }

    return [h('span', {
      class: ['vxe-table--expanded', {
        'is--active': isAceived
      }],
      on: {
        click: function click(evnt) {
          $table.triggerRowExpandEvent(evnt, params);
        }
      }
    }, [h('i', {
      class: ['vxe-table--expand-btn', isLazyLoaded ? iconLoaded || conf.icon.treeLoaded : isAceived ? iconOpen || conf.icon.expandOpen : iconClose || conf.icon.expandClose]
    })]), slots.content && slots.default ? slots.default(params, h) : labelField ? xe_utils_amd_xe_utils_default.a.get(row, labelField) : null];
  },
  renderExpandData: function renderExpandData(h, params) {
    var column = params.column;
    var slots = column.slots;

    if (slots) {
      if (slots.content) {
        return slots.content(params, h);
      } // 在 v3.0 中严格支持 content


      if (slots.default) {
        return slots.default(params, h);
      }
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
    var $table = params.$table,
        column = params.column;
    var _$table$sortOpts = $table.sortOpts,
        iconAsc = _$table$sortOpts.iconAsc,
        iconDesc = _$table$sortOpts.iconDesc;
    return [h('span', {
      class: 'vxe-sort-wrapper'
    }, [h('i', {
      class: ['vxe-sort--asc-btn', iconAsc || conf.icon.sortAsc, {
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
      class: ['vxe-sort--desc-btn', iconDesc || conf.icon.sortDesc, {
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
    })])];
  },

  /**
   * 筛选
   */
  renderFilterHeader: function renderFilterHeader(h, params) {
    return Cell.renderHeader(h, params).concat(Cell.renderFilterIcon(h, params));
  },
  renderFilterIcon: function renderFilterIcon(h, params) {
    var $table = params.$table,
        column = params.column,
        hasFilter = params.hasFilter;
    var filterStore = $table.filterStore,
        filterOpts = $table.filterOpts;
    var iconNone = filterOpts.iconNone,
        iconMatch = filterOpts.iconMatch;
    return [h('span', {
      class: ['vxe-filter-wrapper', {
        'is--active': filterStore.visible && filterStore.column === column
      }]
    }, [h('i', {
      class: ['vxe-filter--btn', hasFilter ? iconMatch || conf.icon.filterMatch : iconNone || conf.icon.filterNone],
      attrs: {
        title: conf.i18n('vxe.table.filter')
      },
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
    var $table = params.$table,
        column = params.column;
    var editRules = $table.editRules,
        editConfig = $table.editConfig;
    var sortable = column.sortable,
        remoteSort = column.remoteSort,
        filters = column.filters;
    var isRequired;

    if (editRules) {
      var columnRules = xe_utils_amd_xe_utils_default.a.get(editRules, params.column.property);

      if (columnRules) {
        isRequired = columnRules.some(function (rule) {
          return rule.required;
        });
      }
    }

    return [isRequired ? h('i', {
      class: 'vxe-required-icon'
    }) : null, editConfig && editConfig.showIcon === false ? null : h('i', {
      class: ['vxe-edit-icon', editConfig.icon || conf.icon.edit]
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
        own = column.own,
        formatter = column.formatter;
    var editRender = own.editRender;
    var compConf = Renderer.get(editRender.name);

    if (editRender.type === 'visible' || isEdit) {
      if (slots && slots.edit) {
        return slots.edit(params, h);
      }

      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, params, {
        $type: 'edit',
        $excel: $table.$parent,
        $table: $table,
        $column: column
      }) : [];
    }

    if (slots && slots.default) {
      return slots.default(params, h);
    }

    if (formatter) {
      return [UtilTools.formatText(UtilTools.getCellLabel(row, column, params), 1)];
    }

    return Cell.renderCell.call(_vm, h, params);
  }
};
/* harmony default export */ var src_cell = (Cell);
// CONCATENATED MODULE: ./packages/cell/index.js


/* harmony default export */ var packages_cell = (src_cell);
// CONCATENATED MODULE: ./packages/table/src/methods.js





















var rowUniqueId = 0;
var methods_browse = DomTools.browse;
var isWebkit = methods_browse['-webkit'] && !methods_browse.edge;
var debounceScrollYDuration = methods_browse.msie ? 40 : 20; // 分组表头的属性

var headerProps = {
  children: 'children'
};
/**
 * 生成行的唯一主键
 */

function getRowUniqueId() {
  return "row_".concat(++rowUniqueId);
}

function isTargetRadioOrCheckbox(evnt, column, colType, targetType) {
  var target = evnt.target;
  return target && column.type === colType && target.tagName.toLowerCase() === 'input' && target.type === (targetType || colType);
}

var Methods = {
  /**
   * 获取父容器元素
   */
  getParentElem: function getParentElem() {
    return this.$grid ? this.$grid.$el.parentNode : this.$el.parentNode;
  },

  /**
   * 获取父容器的高度
   */
  getParentHeight: function getParentHeight() {
    return this.$grid ? this.$grid.getParentHeight() : this.getParentElem().clientHeight;
  },

  /**
   * 获取需要排除的高度
   * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
   * 如果存在表尾合计滚动条，则需要排除滚动条高度
   */
  getExcludeHeight: function getExcludeHeight() {
    return this.$grid ? this.$grid.getExcludeHeight() : 0;
  },

  /**
   * 重置表格的一切数据状态
   */
  clearAll: function clearAll() {
    this.clearSort();
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.clearSelection();
    this.clearSelectReserve();
    this.clearRowExpand();
    this.clearTreeExpand();

    if (v_x_e_table._edit) {
      this.clearActived();
    }

    if (v_x_e_table._filter) {
      this.clearFilter();
    }

    if (this.keyboardConfig || this.mouseConfig) {
      this.clearIndexChecked();
      this.clearHeaderChecked();
      this.clearChecked();
      this.clearSelected();
      this.clearCopyed();
    }

    return this.clearScroll();
  },

  /**
   * 同步刷新 data 数据
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  refreshData: function refreshData() {
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
    this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0);
    return this.$nextTick();
  },

  /**
   * 加载表格数据
   * @param {Array} datas 数据
   * @param {Boolean} notRefresh 是否不重新运算列宽
   */
  loadTableData: function loadTableData(datas, notRefresh) {
    var _this2 = this;

    var height = this.height,
        maxHeight = this.maxHeight,
        showOverflow = this.showOverflow,
        treeConfig = this.treeConfig,
        editStore = this.editStore,
        optimizeOpts = this.optimizeOpts,
        scrollYStore = this.scrollYStore;
    var scrollY = optimizeOpts.scrollY;
    var tableFullData = datas ? datas.slice(0) : [];
    var scrollYLoad = !treeConfig && scrollY && scrollY.gt && scrollY.gt < tableFullData.length;
    scrollYStore.startIndex = 0;
    scrollYStore.visibleIndex = 0;
    editStore.insertList = [];
    editStore.removeList = []; // 全量数据

    this.tableFullData = tableFullData; // 缓存数据

    this.updateCache(true); // 原始数据

    this.tableSynchData = datas;
    this.tableSourceData = xe_utils_amd_xe_utils_default.a.clone(tableFullData, true);
    this.scrollYLoad = scrollYLoad;

    if (scrollYLoad && !(height || maxHeight)) {
      UtilTools.error('vxe.error.scrollYReqProp', ['height | max-height']);
    }

    if (scrollYLoad && !showOverflow) {
      UtilTools.warn('vxe.error.scrollYReqProp', ['show-header-overflow & show-overflow']);
    }

    var rest = Promise.resolve();

    if (scrollYLoad) {
      rest = this.computeScrollLoad();
    }

    return rest.then(function () {
      // 是否加载了数据
      _this2.isLoadData = true;

      _this2.computeRowHeight();

      _this2.handleTableData(true);

      _this2.handleReserveStatus();

      _this2.checkSelectionStatus();

      rest = _this2.$nextTick();

      if (!notRefresh) {
        rest = rest.then(_this2.recalculate);
      }

      return rest.then(_this2.refreshScroll);
    });
  },

  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData: function loadData(datas) {
    return this.loadTableData(datas).then(this.recalculate);
  },

  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData: function reloadData(datas) {
    var _this3 = this;

    return this.clearAll().then(function () {
      return _this3.loadTableData(datas);
    }).then(this.handleDefault);
  },

  /**
   * 局部加载行数据并恢复到初始状态
   * 对于行数据需要局部更改的场景中可能会用到
   * @param {Row} row 行对象
   * @param {Object} record 新数据
   * @param {String} field 字段名
   */
  reloadRow: function reloadRow(row, record, field) {
    var tableSourceData = this.tableSourceData,
        tableData = this.tableData;
    var rowIndex = this.getRowIndex(row);
    var oRow = tableSourceData[rowIndex];

    if (oRow && row) {
      if (field) {
        xe_utils_amd_xe_utils_default.a.set(oRow, field, xe_utils_amd_xe_utils_default.a.get(record || row, field));
      } else {
        if (record) {
          tableSourceData[rowIndex] = record;
          xe_utils_amd_xe_utils_default.a.clear(row, undefined);
          Object.assign(row, this.defineField(Object.assign({}, record)));
          this.updateCache(true);
        } else {
          xe_utils_amd_xe_utils_default.a.destructuring(oRow, xe_utils_amd_xe_utils_default.a.clone(row, true));
        }
      }
    }

    this.tableData = tableData.slice(0);
    return this.$nextTick();
  },

  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnConfig} columns 列配置
   */
  loadColumn: function loadColumn(columns) {
    var _this4 = this;

    this.collectColumn = xe_utils_amd_xe_utils_default.a.mapTree(columns, function (column) {
      return packages_cell.createColumn(_this4, column);
    }, headerProps);
    return this.$nextTick();
  },

  /**
   * 加载列配置并恢复到初始状态
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnConfig} columns 列配置
   */
  reloadColumn: function reloadColumn(columns) {
    this.clearAll();
    return this.loadColumn(columns);
  },

  /**
   * 更新数据行的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  updateCache: function updateCache(source) {
    var _this5 = this;

    var treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        tableFullData = this.tableFullData,
        fullDataRowIdData = this.fullDataRowIdData,
        fullDataRowMap = this.fullDataRowMap,
        fullAllDataRowMap = this.fullAllDataRowMap,
        fullAllDataRowIdData = this.fullAllDataRowIdData;
    var rowkey = UtilTools.getRowkey(this);
    var isLazy = treeConfig && treeOpts.lazy;

    var handleCache = function handleCache(row, index) {
      var rowid = UtilTools.getRowid(_this5, row);

      if (!rowid) {
        rowid = getRowUniqueId();
        xe_utils_amd_xe_utils_default.a.set(row, rowkey, rowid);
      }

      if (isLazy && row[treeOpts.hasChild] && xe_utils_amd_xe_utils_default.a.isUndefined(row[treeOpts.children])) {
        row[treeOpts.children] = null;
      }

      var rest = {
        row: row,
        rowid: rowid,
        index: index
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
      xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, handleCache, treeOpts);
    } else {
      tableFullData.forEach(handleCache);
    }
  },
  appendTreeCache: function appendTreeCache(row, childs) {
    var _this6 = this;

    var tableSourceData = this.tableSourceData,
        treeOpts = this.treeOpts,
        fullDataRowIdData = this.fullDataRowIdData,
        fullDataRowMap = this.fullDataRowMap,
        fullAllDataRowMap = this.fullAllDataRowMap,
        fullAllDataRowIdData = this.fullAllDataRowIdData;
    var children = treeOpts.children,
        hasChild = treeOpts.hasChild;
    var rowkey = UtilTools.getRowkey(this);
    var rowid = UtilTools.getRowid(this, row);
    var matchObj = xe_utils_amd_xe_utils_default.a.findTree(tableSourceData, function (item) {
      return rowid === UtilTools.getRowid(_this6, item);
    }, treeOpts);
    xe_utils_amd_xe_utils_default.a.eachTree(childs, function (row, index) {
      var rowid = UtilTools.getRowid(_this6, row);

      if (!rowid) {
        rowid = getRowUniqueId();
        xe_utils_amd_xe_utils_default.a.set(row, rowkey, rowid);
      }

      if (row[hasChild] && xe_utils_amd_xe_utils_default.a.isUndefined(row[children])) {
        row[children] = null;
      }

      var rest = {
        row: row,
        rowid: rowid,
        index: index
      };
      fullDataRowIdData[rowid] = rest;
      fullDataRowMap.set(row, rest);
      fullAllDataRowIdData[rowid] = rest;
      fullAllDataRowMap.set(row, rest);
    }, treeOpts);

    if (matchObj) {
      matchObj.item[children] = xe_utils_amd_xe_utils_default.a.clone(childs, true);
    }
  },

  /**
   * 更新数据列的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  cacheColumnMap: function cacheColumnMap() {
    var isGroup = this.isGroup,
        tableFullColumn = this.tableFullColumn,
        collectColumn = this.collectColumn,
        fullColumnMap = this.fullColumnMap;
    var fullColumnIdData = this.fullColumnIdData = {};
    fullColumnMap.clear();

    if (isGroup) {
      xe_utils_amd_xe_utils_default.a.eachTree(collectColumn, function (column, index) {
        if (column.children && column.children.length) {
          var rest = {
            column: column,
            colid: column.id,
            index: index
          };
          fullColumnIdData[column.id] = rest;
          fullColumnMap.set(column, rest);
        }
      }, headerProps);
    }

    tableFullColumn.forEach(function (column, index) {
      var rest = {
        column: column,
        colid: column.id,
        index: index
      };
      fullColumnIdData[column.id] = rest;
      fullColumnMap.set(column, rest);
    }, headerProps);
  },

  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode: function getRowNode(tr) {
    var _this7 = this;

    if (tr) {
      var treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          tableFullData = this.tableFullData,
          fullAllDataRowIdData = this.fullAllDataRowIdData;
      var rowid = tr.getAttribute('data-rowid');

      if (treeConfig) {
        var matchObj = xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (row) {
          return UtilTools.getRowid(_this7, row) === rowid;
        }, treeOpts);

        if (matchObj) {
          return matchObj;
        }
      } else {
        if (fullAllDataRowIdData[rowid]) {
          var rest = fullAllDataRowIdData[rowid];
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

  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param {Element} cell 元素
   */
  getColumnNode: function getColumnNode(cell) {
    if (cell) {
      var fullColumnIdData = this.fullColumnIdData,
          tableFullColumn = this.tableFullColumn;
      var colid = cell.getAttribute('data-colid');
      var _fullColumnIdData$col = fullColumnIdData[colid],
          column = _fullColumnIdData$col.column,
          index = _fullColumnIdData$col.index;
      return {
        item: column,
        index: index,
        items: tableFullColumn
      };
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
   * 根据 row 获取渲染中的虚拟索引
   * @param {Row} row 行对象
   */
  $getRowIndex: function $getRowIndex(row) {
    return this.afterFullData.indexOf(row);
  },

  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnConfig} column 列配置
   */
  getColumnIndex: function getColumnIndex(column) {
    return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1;
  },

  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param {ColumnConfig} column 列配置
   */
  $getColumnIndex: function $getColumnIndex(column) {
    return this.visibleColumn.indexOf(column);
  },

  /**
   * 判断是否为索引列
   * @param {ColumnConfig} column 列配置
   */
  isSeqColumn: function isSeqColumn(column) {
    return column && (column.type === 'seq' || column.type === 'index');
  },

  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} row 行数据
   */
  defineField: function defineField(row) {
    var treeConfig = this.treeConfig,
        treeOpts = this.treeOpts;
    var rowkey = UtilTools.getRowkey(this);
    this.visibleColumn.forEach(function (_ref) {
      var property = _ref.property,
          editRender = _ref.editRender;

      if (property && !xe_utils_amd_xe_utils_default.a.has(row, property)) {
        xe_utils_amd_xe_utils_default.a.set(row, property, editRender && !xe_utils_amd_xe_utils_default.a.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null);
      }
    });

    if (treeConfig && treeOpts.lazy && xe_utils_amd_xe_utils_default.a.isUndefined(row[treeOpts.children])) {
      row[treeOpts.children] = null;
    } // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数


    if (!xe_utils_amd_xe_utils_default.a.get(row, rowkey)) {
      xe_utils_amd_xe_utils_default.a.set(row, rowkey, getRowUniqueId());
    }

    return row;
  },

  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param {Array} records 新数据
   */
  createData: function createData(records) {
    var _this8 = this;

    return this.$nextTick().then(function () {
      return records.map(_this8.defineField);
    });
  },

  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow: function createRow(records) {
    var _this9 = this;

    var isArr = xe_utils_amd_xe_utils_default.a.isArray(records);

    if (!isArr) {
      records = [records];
    }

    return this.$nextTick().then(function () {
      var rows = records.map(function (record) {
        return _this9.defineField(Object.assign({}, record));
      });
      return isArr ? rows : rows[0];
    });
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
    } else if (rows && !xe_utils_amd_xe_utils_default.a.isArray(rows)) {
      rows = [rows];
    }

    if (field) {
      rows.forEach(function (row) {
        return xe_utils_amd_xe_utils_default.a.set(row, field, null);
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

  /**
   * 检查是否为临时行数据
   * @param {Row} row 行对象
   */
  isInsertByRow: function isInsertByRow(row) {
    return this.editStore.insertList.indexOf(row) > -1;
  },
  // 在 v3.0 中废弃 hasRowChange
  hasRowChange: function hasRowChange(row, field) {
    UtilTools.warn('vxe.error.delFunc', ['hasRowChange', 'isUpdateByRow']);
    return this.isUpdateByRow(row, field);
  },

  /**
   * 检查行或列数据是否发生改变
   * @param {Row} row 行对象
   * @param {String} field 字段名
   */
  isUpdateByRow: function isUpdateByRow(row, field) {
    var _this10 = this;

    var oRow, property;
    var visibleColumn = this.visibleColumn,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        tableSourceData = this.tableSourceData,
        fullDataRowIdData = this.fullDataRowIdData;
    var rowid = UtilTools.getRowid(this, row); // 新增的数据不需要检测

    if (!fullDataRowIdData[rowid]) {
      return false;
    }

    if (treeConfig) {
      var children = treeOpts.children;
      var matchObj = xe_utils_amd_xe_utils_default.a.findTree(tableSourceData, function (item) {
        return rowid === UtilTools.getRowid(_this10, item);
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
        return !xe_utils_amd_xe_utils_default.a.isEqual(xe_utils_amd_xe_utils_default.a.get(oRow, field), xe_utils_amd_xe_utils_default.a.get(row, field));
      }

      for (var index = 0, len = visibleColumn.length; index < len; index++) {
        property = visibleColumn[index].property;

        if (property && !xe_utils_amd_xe_utils_default.a.isEqual(xe_utils_amd_xe_utils_default.a.get(oRow, property), xe_utils_amd_xe_utils_default.a.get(row, property))) {
          return true;
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
    return xe_utils_amd_xe_utils_default.a.find(this.tableFullColumn, function (column) {
      return column.property === field;
    });
  },

  /**
   * 获取当前表格的列
   * 完整的全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn: function getTableColumn() {
    return {
      fullColumn: this.tableFullColumn.slice(0),
      visibleColumn: this.visibleColumn.slice(0),
      tableColumn: this.tableColumn.slice(0)
    };
  },
  // 在 v3.0 中废弃 getRecords
  getRecords: function getRecords() {
    UtilTools.warn('vxe.error.delFunc', ['getRecords', 'getData']);
    return this.getData.apply(this, arguments);
  },

  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData: function getData(rowIndex) {
    var tableSynchData = this.data || this.tableSynchData;
    return arguments.length ? tableSynchData[rowIndex] : tableSynchData.slice(0);
  },
  // 在 v3.0 中废弃 getAllRecords
  getAllRecords: function getAllRecords() {
    UtilTools.warn('vxe.error.delFunc', ['getAllRecords', 'getRecordset']);
    return this.getRecordset();
  },

  /**
   * 用于多选行，获取已选中的数据
   */
  getSelectRecords: function getSelectRecords() {
    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField;
    var rowList = [];

    if (property) {
      if (treeConfig) {
        rowList = xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
          return xe_utils_amd_xe_utils_default.a.get(row, property);
        }, treeOpts);
      } else {
        rowList = tableFullData.filter(function (row) {
          return xe_utils_amd_xe_utils_default.a.get(row, property);
        });
      }
    } else {
      var selection = this.selection;

      if (treeConfig) {
        rowList = xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
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
        remoteSort = this.remoteSort,
        remoteFilter = this.remoteFilter,
        filterOpts = this.filterOpts,
        sortOpts = this.sortOpts;
    var tableData = tableFullData.slice(0);
    var column = xe_utils_amd_xe_utils_default.a.find(visibleColumn, function (column) {
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

          if (valueList.length && !(filterOpts.remote || remoteFilter)) {
            var filterRender = column.filterRender,
                property = column.property,
                filterMethod = column.filterMethod;
            var compConf = filterRender ? Renderer.get(filterRender.name) : null;

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
            }) : valueList.indexOf(xe_utils_amd_xe_utils_default.a.get(row, property)) > -1;
          }

          return true;
        });
      });
    }

    if (column && column.order) {
      var allSortMethod = sortOpts.sortMethod || this.sortMethod;
      var isRemote = xe_utils_amd_xe_utils_default.a.isBoolean(column.remoteSort) ? column.remoteSort : sortOpts.remote || remoteSort;

      if (!isRemote) {
        if (allSortMethod) {
          tableData = allSortMethod({
            data: tableData,
            column: column,
            property: column.property,
            order: column.order,
            $table: this
          }) || tableData;
        } else {
          var rest = column.sortMethod ? tableData.sort(column.sortMethod) : xe_utils_amd_xe_utils_default.a.sortBy(tableData, column.property);
          tableData = column.order === 'desc' ? rest.reverse() : rest;
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
  handleDefault: function handleDefault() {
    var _this11 = this;

    // 在 v3.0 中废弃 selectConfig
    var checkboxConfig = this.checkboxConfig || this.selectConfig;

    if (checkboxConfig) {
      this.handleSelectionDefChecked();
    }

    if (this.radioConfig) {
      this.handleRadioDefChecked();
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

    this.updateFooter();
    this.$nextTick(function () {
      return setTimeout(_this11.recalculate);
    });
  },

  /**
   * 动态列处理
   */
  mergeCustomColumn: function mergeCustomColumn(customColumns) {
    var tableFullColumn = this.tableFullColumn;
    this.isUpdateCustoms = true;

    if (customColumns.length) {
      tableFullColumn.forEach(function (column) {
        // 在 v3.0 中废弃 prop
        var item = xe_utils_amd_xe_utils_default.a.find(customColumns, function (item) {
          return column.property && (item.field || item.prop) === column.property;
        });

        if (item) {
          if (xe_utils_amd_xe_utils_default.a.isNumber(item.resizeWidth)) {
            column.resizeWidth = item.resizeWidth;
          }

          if (xe_utils_amd_xe_utils_default.a.isBoolean(item.visible)) {
            column.visible = item.visible;
          }
        }
      });
    }

    this.$emit('update:customs', tableFullColumn);
  },

  /**
   * 手动重置列的所有操作，还原到初始状态
   * 如果已关联工具栏，则会同步更新
   */
  resetAll: function resetAll() {
    this.resetCustoms();
    this.resetResizable();
  },

  /**
   * 隐藏指定列
   * @param {ColumnConfig} column 列配置
   */
  hideColumn: function hideColumn(column) {
    return this.handleVisibleColumn(column, false);
  },

  /**
   * 显示指定列
   * @param {ColumnConfig} column 列配置
   */
  showColumn: function showColumn(column) {
    return this.handleVisibleColumn(column, true);
  },

  /**
   * 手动重置列的显示/隐藏操作，还原到初始状态
   * 如果已关联工具栏，则会同步更新
   */
  resetCustoms: function resetCustoms() {
    return this.handleVisibleColumn();
  },
  handleVisibleColumn: function handleVisibleColumn(column, visible) {
    if (arguments.length) {
      column.visible = visible;
    } else {
      this.tableFullColumn.forEach(function (column) {
        column.visible = true;
      });
    }

    if (this.$toolbar) {
      this.$toolbar.handleCustoms();
    }

    return this.$nextTick();
  },

  /**
   * 初始化加载显示/隐藏列
   * 对于异步更新的场景下可能会用到
   * @param {Array} customColumns 自定义列数组
   */
  reloadCustoms: function reloadCustoms(customColumns) {
    var _this12 = this;

    return this.$nextTick().then(function () {
      _this12.mergeCustomColumn(customColumns);

      return _this12.refreshColumn().then(function () {
        return _this12.tableFullColumn;
      });
    });
  },

  /**
   * 刷新列信息
   * 将固定的列左边、右边分别靠边
   * 如果使用了分组表头，固定列必须在左侧或者右侧
   */
  refreshColumn: function refreshColumn() {
    var _this13 = this;

    var isColspan;
    var letIndex = 0;
    var leftList = [];
    var leftStartIndex = null;
    var rightEndIndex = null;
    var centerList = [];
    var rightList = [];
    var tableFullColumn = this.tableFullColumn,
        isGroup = this.isGroup,
        columnStore = this.columnStore,
        scrollXStore = this.scrollXStore,
        optimizeOpts = this.optimizeOpts;
    var scrollX = optimizeOpts.scrollX; // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏

    if (isGroup) {
      xe_utils_amd_xe_utils_default.a.eachTree(this.collectColumn, function (column) {
        if (column.children && column.children.length) {
          column.visible = !!xe_utils_amd_xe_utils_default.a.findTree(column.children, function (subColumn) {
            return subColumn.children && subColumn.children.length ? 0 : subColumn.visible;
          }, headerProps);
        }
      }, headerProps);
    } // 重新分配列


    tableFullColumn.filter(function (column) {
      return column.visible;
    }).forEach(function (column, columnIndex) {
      if (column.fixed === 'left') {
        if (leftStartIndex === null) {
          leftStartIndex = letIndex;
        }

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
          if (rightEndIndex === null) {
            rightEndIndex = columnIndex;
          }

          if (columnIndex - rightEndIndex !== 0) {
            isColspan = true;
          } else {
            rightEndIndex++;
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

    if (isGroup && (isColspan || leftStartIndex || rightEndIndex !== null && rightEndIndex !== visibleColumn.length)) {
      UtilTools.error('vxe.error.groupFixed');
    }

    if (scrollXLoad) {
      if (this.isGroup) {
        UtilTools.warn('vxe.error.scrollXNotGroup');
      }

      if (!this.showHeaderOverflow) {
        UtilTools.warn('vxe.error.scrollXReqProp', ['show-header-overflow & show-overflow']);
      } // if (this.resizable || visibleColumn.some(column => column.resizable)) {
      //   UtilTools.warn('vxe.error.scrollXNotResizable')
      // }


      Object.assign(scrollXStore, {
        startIndex: 0,
        visibleIndex: 0
      });
      visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
    }

    this.scrollXLoad = scrollXLoad;
    this.tableColumn = visibleColumn;
    return this.$nextTick().then(function () {
      _this13.updateFooter();

      _this13.recalculate(true);
    });
  },

  /**
   * 指定列宽的列进行拆分
   */
  analyColumnWidth: function analyColumnWidth() {
    var columnWidth = this.columnWidth,
        columnMinWidth = this.columnMinWidth;
    var resizeList = [];
    var pxList = [];
    var pxMinList = [];
    var scaleList = [];
    var scaleMinList = [];
    var autoList = [];
    this.tableFullColumn.forEach(function (column) {
      if (columnWidth && !column.width) {
        column.width = columnWidth;
      }

      if (columnMinWidth && !column.minWidth) {
        column.minWidth = columnMinWidth;
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
    var _this14 = this;

    var lastScrollLeft = this.lastScrollLeft,
        lastScrollTop = this.lastScrollTop;
    this.clearScroll();
    return this.$nextTick().then(function () {
      if (lastScrollLeft || lastScrollTop) {
        // 重置最后滚动状态
        _this14.lastScrollLeft = 0;
        _this14.lastScrollTop = 0; // 还原滚动状态

        return _this14.scrollTo(lastScrollLeft, lastScrollTop);
      }
    });
  },

  /**
   * 计算单元格列宽，动态分配可用剩余空间
   * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
   */
  recalculate: function recalculate(refull) {
    var _this15 = this;

    var $refs = this.$refs;
    var tableBody = $refs.tableBody,
        tableHeader = $refs.tableHeader,
        tableFooter = $refs.tableFooter;
    var bodyElem = tableBody ? tableBody.$el : null;
    var headerElem = tableHeader ? tableHeader.$el : null;
    var footerElem = tableFooter ? tableFooter.$el : null; // DomTools.addClass($el, 'is--recalculate')

    if (bodyElem) {
      this.autoCellWidth(headerElem, bodyElem, footerElem);

      if (refull === true) {
        // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
        return this.computeScrollLoad().then(function () {
          _this15.autoCellWidth(headerElem, bodyElem, footerElem);

          _this15.computeScrollLoad(); // DomTools.removeClass($el, 'is--recalculate')

        });
      }
    } // DomTools.removeClass($el, 'is--recalculate')


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
    var meanWidth;
    var tableWidth = 0;
    var minCellWidth = 40; // 列宽最少限制 40px

    var bodyWidth = bodyElem.clientWidth;
    var remainWidth = bodyWidth;
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


    autoList.forEach(function (column, index) {
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
    this.isCoverBody = tableWidth >= bodyWidth - 2;
    this.parentHeight = this.getParentHeight();

    if (headerElem) {
      this.headerHeight = headerElem.offsetHeight; // 检测是否同步滚动

      if (headerElem.scrollLeft !== bodyElem.scrollLeft) {
        headerElem.scrollLeft = bodyElem.scrollLeft;
      }
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
  },

  /**
   * 手动重置列宽拖动的操作，还原到初始状态
   * 如果已关联工具栏，则会同步更新
   */
  resetResizable: function resetResizable() {
    this.tableFullColumn.forEach(function (column) {
      column.resizeWidth = 0;
    });

    if (this.$toolbar) {
      this.$toolbar.resetResizable();
    }

    this.analyColumnWidth();
    return this.recalculate(true);
  },

  /**
   * 放弃 vue 的双向 dom 绑定，使用原生的方式更新 Dom，性能翻倍提升
   */
  updateStyle: function updateStyle() {
    var _this16 = this;

    var $refs = this.$refs,
        isGroup = this.isGroup,
        fullColumnIdData = this.fullColumnIdData,
        maxHeight = this.maxHeight,
        height = this.height,
        parentHeight = this.parentHeight,
        border = this.border,
        tableColumn = this.tableColumn,
        headerHeight = this.headerHeight,
        allColumnHeaderOverflow = this.showHeaderOverflow,
        showFooter = this.showFooter,
        allColumnOverflow = this.showOverflow,
        footerHeight = this.footerHeight,
        tableHeight = this.tableHeight,
        tableWidth = this.tableWidth,
        scrollbarHeight = this.scrollbarHeight,
        scrollbarWidth = this.scrollbarWidth,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad,
        columnStore = this.columnStore,
        elemStore = this.elemStore,
        editStore = this.editStore,
        currentRow = this.currentRow,
        mouseConfig = this.mouseConfig;
    var containerList = ['main', 'left', 'right'];
    var customHeight = 0;

    if (height) {
      customHeight = height === 'auto' ? parentHeight : (DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : xe_utils_amd_xe_utils_default.a.toNumber(height)) - this.getExcludeHeight();

      if (showFooter) {
        customHeight += scrollbarHeight + 1;
      }
    }

    var emptyPlaceholderElem = $refs.emptyPlaceholder;

    if (emptyPlaceholderElem) {
      emptyPlaceholderElem.style.top = height ? '' : "".concat(headerHeight, "px");
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
              xe_utils_amd_xe_utils_default.a.arrayEach(tableElem.querySelectorAll('.vxe-resizable'), function (resizeElem) {
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
            // XEUtils.arrayEach(listElem.querySelectorAll(`.col--gutter`), thElem => {
            //   thElem.style.width = `${scrollbarWidth}px`
            // })
            xe_utils_amd_xe_utils_default.a.arrayEach(listElem.querySelectorAll(".col--group"), function (thElem) {
              var column = _this16.getColumnNode(thElem).item;

              var showHeaderOverflow = column.showHeaderOverflow;
              var cellOverflow = xe_utils_amd_xe_utils_default.a.isBoolean(showHeaderOverflow) ? showHeaderOverflow : allColumnHeaderOverflow;
              var showEllipsis = cellOverflow === 'ellipsis';
              var showTitle = cellOverflow === 'title';
              var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
              var hasEllipsis = showTitle || showTooltip || showEllipsis;
              var childWidth = 0;
              var countChild = 0;

              if (hasEllipsis) {
                xe_utils_amd_xe_utils_default.a.eachTree(column.children, function (item) {
                  if (!item.children || !column.children.length) {
                    countChild++;
                  }

                  childWidth += item.renderWidth;
                });
                thElem.style.width = "".concat(childWidth - countChild - (border ? 2 : 0), "px");
              }
            });
          }
        } else if (layout === 'body') {
          var emptyBlockElem = elemStore["".concat(name, "-").concat(layout, "-emptyBlock")];

          if (wrapperElem) {
            if (maxHeight) {
              maxHeight = maxHeight === 'auto' ? parentHeight : DomTools.isScale(maxHeight) ? Math.floor(parseInt(maxHeight) / 100 * parentHeight) : xe_utils_amd_xe_utils_default.a.toNumber(maxHeight);
              wrapperElem.style.maxHeight = "".concat(fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : maxHeight - headerHeight, "px");
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
            wrapperElem.style.top = "".concat(headerHeight, "px");
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

            tableElem.style.paddingRight = scrollbarWidth && fixedType && (methods_browse['-moz'] || methods_browse['safari']) ? "".concat(scrollbarWidth, "px") : '';
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

            wrapperElem.style.marginTop = "".concat(-scrollbarHeight - 1, "px");
          }

          if (tableElem) {
            tableElem.style.width = _tWidth2 ? "".concat(_tWidth2 + scrollbarWidth, "px") : '';
          } // let listElem = elemStore[`${name}-${layout}-list`]
          // if (listElem) {
          //   XEUtils.arrayEach(listElem.querySelectorAll(`.col--gutter`), thElem => {
          //     thElem.style.width = `${scrollbarWidth}px`
          //   })
          // }

        }

        var colgroupElem = elemStore["".concat(name, "-").concat(layout, "-colgroup")];

        if (colgroupElem) {
          xe_utils_amd_xe_utils_default.a.arrayEach(colgroupElem.children, function (colElem) {
            var colid = colElem.getAttribute('name');

            if (colid === 'col_gutter') {
              colElem.style.width = "".concat(scrollbarWidth, "px");
            }

            if (fullColumnIdData[colid]) {
              var column = fullColumnIdData[colid].column;
              var showHeaderOverflow = column.showHeaderOverflow,
                  showOverflow = column.showOverflow;
              var cellOverflow;
              colElem.style.width = "".concat(column.renderWidth, "px");

              if (layout === 'header') {
                cellOverflow = xe_utils_amd_xe_utils_default.a.isUndefined(showHeaderOverflow) || xe_utils_amd_xe_utils_default.a.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
              } else {
                cellOverflow = xe_utils_amd_xe_utils_default.a.isUndefined(showOverflow) || xe_utils_amd_xe_utils_default.a.isNull(showOverflow) ? allColumnOverflow : showOverflow;
              }

              var showEllipsis = cellOverflow === 'ellipsis';
              var showTitle = cellOverflow === 'title';
              var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
              var hasEllipsis = showTitle || showTooltip || showEllipsis;
              var _listElem = elemStore["".concat(name, "-").concat(layout, "-list")]; // 滚动的渲染不支持动态行高

              if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
                hasEllipsis = true;
              }

              if (_listElem && hasEllipsis) {
                xe_utils_amd_xe_utils_default.a.arrayEach(_listElem.querySelectorAll(".".concat(column.id)), function (elem) {
                  var colspan = parseInt(elem.getAttribute('colspan') || 1);
                  var cellElem = elem.querySelector('.vxe-cell');
                  var colWidth = column.renderWidth;

                  if (cellElem) {
                    if (colspan > 1) {
                      var columnIndex = _this16.getColumnIndex(column);

                      for (var _index = 1; _index < colspan; _index++) {
                        var nextColumn = _this16.getColumns(columnIndex + _index);

                        if (nextColumn) {
                          colWidth += nextColumn.renderWidth;
                        }
                      }
                    }

                    cellElem.style.width = "".concat(border ? colWidth - 2 * colspan : colWidth, "px");
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
        DomTools[bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft ? 'addClass' : 'removeClass'](rightContainer, 'scrolling--middle');
      }
    }
  },
  preventEvent: function preventEvent(evnt, type, args, next, end) {
    var _this17 = this;

    var evntList = Interceptor.get(type);
    var rest;

    if (!evntList.some(function (func) {
      return func(args, evnt, _this17) === false;
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
    var _this18 = this;

    var $el = this.$el,
        $refs = this.$refs,
        editStore = this.editStore,
        ctxMenuStore = this.ctxMenuStore,
        _this$editConfig = this.editConfig,
        editConfig = _this$editConfig === void 0 ? {} : _this$editConfig,
        filterStore = this.filterStore,
        getRowNode = this.getRowNode;
    var actived = editStore.actived;
    var filterWrapper = $refs.filterWrapper,
        validTip = $refs.validTip;

    if (filterWrapper) {
      if (DomTools.getEventTargetNode(evnt, $el, 'vxe-filter-wrapper').flag) {// 如果点击了筛选按钮
      } else if (DomTools.getEventTargetNode(evnt, filterWrapper.$el).flag) {// 如果点击筛选容器
      } else {
        this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter);
      }
    } // 如果已激活了编辑状态


    if (actived.row) {
      if (!(editConfig.autoClear === false)) {
        if (validTip && DomTools.getEventTargetNode(evnt, validTip.$el).flag) {// 如果是激活状态，且点击了校验提示框
        } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
          // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
          this.preventEvent(evnt, 'event.clearActived', actived.args, function () {
            var isClear;

            if (editConfig.mode === 'row') {
              var rowNode = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--row'); // row 方式，如果点击了不同行

              isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== getRowNode(actived.args.cell.parentNode).item : 0;
            } else {
              // cell 方式，如果是非编辑列
              isClear = !DomTools.getEventTargetNode(evnt, $el, 'col--edit').flag;
            }

            if (isClear || // 如果点击了当前表格之外
            !DomTools.getEventTargetNode(evnt, $el).flag) {
              setTimeout(function () {
                return _this18.clearActived(evnt);
              });
            }
          });
        }
      }
    } // 如果配置了快捷菜单且，点击了其他地方则关闭


    if (ctxMenuStore.visible && this.$refs.ctxWrapper && !DomTools.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
      this.closeMenu();
    } // 最后激活的表格


    this.isActivated = DomTools.getEventTargetNode(evnt, (this.$grid || this).$el).flag;
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
    var _this19 = this;

    // 该行为只对当前激活的表格有效
    if (this.isActivated) {
      this.preventEvent(evnt, 'event.keydown', {
        $table: this
      }, function () {
        var isCtxMenu = _this19.isCtxMenu,
            ctxMenuStore = _this19.ctxMenuStore,
            editStore = _this19.editStore,
            _this19$mouseConfig = _this19.mouseConfig,
            mouseConfig = _this19$mouseConfig === void 0 ? {} : _this19$mouseConfig,
            _this19$keyboardConfi = _this19.keyboardConfig,
            keyboardConfig = _this19$keyboardConfi === void 0 ? {} : _this19$keyboardConfi,
            treeConfig = _this19.treeConfig,
            treeOpts = _this19.treeOpts,
            highlightCurrentRow = _this19.highlightCurrentRow,
            currentRow = _this19.currentRow;
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
        var isA = keyCode === 65;
        var isC = keyCode === 67;
        var isV = keyCode === 86;
        var isX = keyCode === 88;
        var isF2 = keyCode === 113;
        var isCtrlKey = evnt.ctrlKey;
        var isShiftKey = evnt.shiftKey;
        var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
        var operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);
        var params;

        if (isEsc) {
          // 如果按下了 Esc 键，关闭快捷菜单、筛选
          _this19.closeMenu();

          _this19.closeFilter(); // 如果是激活编辑状态，则取消编辑


          if (actived.row) {
            params = actived.args;

            _this19.clearActived(evnt); // 如果配置了选中功能，则为选中状态


            if (mouseConfig.selected) {
              _this19.$nextTick(function () {
                return _this19.handleSelected(params, evnt);
              });
            }
          }
        } else if (isSpacebar && (keyboardConfig.isArrow || keyboardConfig.isTab) && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'selection' || selected.column.type === 'radio')) {
          // 在 v3.0 中废弃 type=selection
          // 空格键支持选中复选列
          evnt.preventDefault(); // 在 v3.0 中废弃 type=selection

          if (selected.column.type === 'checkbox' || selected.column.type === 'selection') {
            _this19.handleToggleCheckRowEvent(selected.args, evnt);
          } else {
            _this19.triggerRadioRowEvent(evnt, selected.args);
          }
        } else if (isEnter && (keyboardConfig.isArrow || keyboardConfig.isTab) && (selected.row || actived.row || treeConfig && highlightCurrentRow && currentRow)) {
          // 如果是激活状态，退则出到下一行
          if (selected.row || actived.row) {
            _this19.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt);
          } else if (treeConfig && highlightCurrentRow && currentRow) {
            // 如果是树形表格当前行回车移动到子节点
            var childrens = currentRow[treeOpts.children];

            if (childrens && childrens.length) {
              evnt.preventDefault();
              var targetRow = childrens[0];
              params = {
                $table: _this19,
                row: targetRow
              };

              _this19.setTreeExpansion(currentRow, true).then(function () {
                return _this19.scrollToRow(targetRow);
              }).then(function () {
                return _this19.triggerCurrentRowEvent(evnt, params);
              });
            }
          }
        } else if (operCtxMenu) {
          // 如果配置了右键菜单; 支持方向键操作、回车
          evnt.preventDefault();

          if (ctxMenuStore.showChild && UtilTools.hasChildrenList(ctxMenuStore.selected)) {
            _this19.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
          } else {
            _this19.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, _this19.ctxMenuList);
          }
        } else if (isF2) {
          // 如果按下了 F2 键
          if (selected.row && selected.column) {
            evnt.preventDefault();

            _this19.handleActived(selected.args, evnt);
          }
        } else if (operArrow && keyboardConfig.isArrow) {
          // 如果按下了方向键
          if (selected.row && selected.column) {
            _this19.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
          } else if ((isUpArrow || isDwArrow) && highlightCurrentRow && currentRow) {
            // 当前行按键上下移动
            _this19.moveCurrentRow(isUpArrow, isDwArrow, evnt);
          }
        } else if (isTab && keyboardConfig.isTab) {
          // 如果按下了 Tab 键切换
          if (selected.row || selected.column) {
            _this19.moveTabSelected(selected.args, isShiftKey, evnt);
          } else if (actived.row || actived.column) {
            _this19.moveTabSelected(actived.args, isShiftKey, evnt);
          }
        } else if (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardConfig.isArrow : isBack)) {
          // 如果是删除键
          if (keyboardConfig.isDel && (selected.row || selected.column)) {
            UtilTools.setCellValue(selected.row, selected.column, null);

            if (isBack) {
              _this19.handleActived(selected.args, evnt);
            }
          } else if (isBack && keyboardConfig.isArrow && treeConfig && highlightCurrentRow && currentRow) {
            // 如果树形表格回退键关闭当前行返回父节点
            var _XEUtils$findTree = xe_utils_amd_xe_utils_default.a.findTree(_this19.afterFullData, function (item) {
              return item === currentRow;
            }, treeOpts),
                parentRow = _XEUtils$findTree.parent;

            if (parentRow) {
              evnt.preventDefault();
              params = {
                $table: _this19,
                row: parentRow
              };

              _this19.setTreeExpansion(parentRow, false).then(function () {
                return _this19.scrollToRow(parentRow);
              }).then(function () {
                return _this19.triggerCurrentRowEvent(evnt, params);
              });
            }
          }
        } else if (keyboardConfig.isCut && isCtrlKey && (isA || isX || isC || isV)) {
          // 如果开启复制功能
          if (isA) {
            _this19.handleAllChecked(evnt);
          } else if (isX || isC) {
            _this19.handleCopyed(isX, evnt);
          } else {
            _this19.handlePaste(evnt);
          }
        } else if (keyboardConfig.isEdit && !isCtrlKey && (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222 || keyCode === 32)) {
          // 如果是按下非功能键之外允许直接编辑
          if (selected.column && selected.row && selected.column.editRender) {
            if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
              UtilTools.setCellValue(selected.row, selected.column, null);

              _this19.handleActived(selected.args, evnt);
            }
          }
        }
      });
    }
  },
  handleGlobalResizeEvent: function handleGlobalResizeEvent() {
    this.recalculate();
  },
  handleTooltipLeaveEvent: function handleTooltipLeaveEvent(evnt) {
    var _this20 = this;

    var tooltipOpts = this.tooltipOpts;
    setTimeout(function () {
      if (!_this20.tooltipActive) {
        _this20.clostTooltip();
      }
    }, tooltipOpts.leaveDelay);
  },
  handleTargetEnterEvent: function handleTargetEnterEvent(evnt) {
    clearTimeout(this.tooltipTimeout);
    this.tooltipActive = true;
    this.clostTooltip();
  },
  handleTargetLeaveEvent: function handleTargetLeaveEvent(evnt) {
    var _this21 = this;

    var tooltipOpts = this.tooltipOpts;
    this.tooltipActive = false;

    if (tooltipOpts.enterable) {
      this.tooltipTimeout = setTimeout(function () {
        if (!_this21.$refs.tooltip.isHover) {
          _this21.clostTooltip();
        }
      }, tooltipOpts.leaveDelay);
    } else {
      this.clostTooltip();
    }
  },

  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent: function triggerHeaderTooltipEvent(evnt, params) {
    var tooltipStore = this.tooltipStore;
    var column = params.column;
    this.handleTargetEnterEvent();

    if (tooltipStore.column !== column || !tooltipStore.visible) {
      // 在 v3.0 中废弃 label
      this.handleTooltip(evnt, column);
    }
  },

  /**
   * 触发表尾 tooltip 事件
   */
  triggerFooterTooltipEvent: function triggerFooterTooltipEvent(evnt, params) {
    var column = params.column;
    var tooltipStore = this.tooltipStore;
    this.handleTargetEnterEvent();

    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, column);
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
    this.handleTargetEnterEvent();

    if (editConfig) {
      if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {
        return;
      }
    }

    if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
      this.handleTooltip(evnt, column, row);
    }
  },

  /**
   * 处理显示 tooltip
   * @param {Event} evnt 事件
   * @param {ColumnConfig} column 列配置
   * @param {Row} row 行对象
   */
  handleTooltip: function handleTooltip(evnt, column, row) {
    var cell = evnt.currentTarget;
    var tooltip = this.$refs.tooltip;
    var wrapperElem = cell.children[0];
    var content = cell.innerText;

    if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
      Object.assign(this.tooltipStore, {
        row: row,
        column: column,
        visible: true
      });

      if (tooltip) {
        tooltip.toVisible(cell, UtilTools.formatText(content));
      }
    }

    return this.$nextTick();
  },

  /**
   * 关闭 tooltip
   */
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
   * 处理默认勾选
   */
  handleSelectionDefChecked: function handleSelectionDefChecked() {
    var fullDataRowIdData = this.fullDataRowIdData,
        checkboxOpts = this.checkboxOpts;
    var checkAll = checkboxOpts.checkAll,
        checkRowKeys = checkboxOpts.checkRowKeys;

    if (checkAll) {
      this.setAllSelection(true);
    } else if (checkRowKeys) {
      var defSelection = [];
      checkRowKeys.forEach(function (rowid) {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row);
        }
      });
      this.setSelection(defSelection, true);
    }
  },

  /**
   * 用于多选行，设置行为选中状态，第二个参数为选中与否
   * @param {Array/Row} rows 行数据
   * @param {Boolean} value 是否选中
   */
  setSelection: function setSelection(rows, value) {
    var _this22 = this;

    if (rows && !xe_utils_amd_xe_utils_default.a.isArray(rows)) {
      rows = [rows];
    }

    rows.forEach(function (row) {
      return _this22.handleSelectRow({
        row: row
      }, !!value);
    });
    return this.$nextTick();
  },
  isCheckedByRow: function isCheckedByRow(row) {
    var property = this.checkboxOpts.checkField;

    if (property) {
      return xe_utils_amd_xe_utils_default.a.get(row, property);
    }

    return this.selection.indexOf(row) > -1;
  },

  /**
   * 多选，行选中事件
   * value 选中true 不选false 不确定-1
   */
  handleSelectRow: function handleSelectRow(_ref3, value) {
    var _this23 = this;

    var row = _ref3.row;
    var selection = this.selection,
        tableFullData = this.tableFullData,
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
          treeIndeterminates.push(row);
          xe_utils_amd_xe_utils_default.a.set(row, property, false);
        } else {
          // 更新子节点状态
          xe_utils_amd_xe_utils_default.a.eachTree([row], function (item, $rowIndex) {
            if (row === item || !checkMethod || checkMethod({
              row: item,
              $rowIndex: $rowIndex
            })) {
              xe_utils_amd_xe_utils_default.a.set(item, property, value);

              _this23.handleSelectReserveRow(row, value);
            }
          }, treeOpts);
          xe_utils_amd_xe_utils_default.a.remove(treeIndeterminates, function (item) {
            return item === row;
          });
        } // 如果存在父节点，更新父节点状态


        var matchObj = xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
          return item === row;
        }, treeOpts);

        if (matchObj && matchObj.parent) {
          var parentStatus;
          var vItems = checkMethod ? matchObj.items.filter(function (item, $rowIndex) {
            return checkMethod({
              row: item,
              $rowIndex: $rowIndex
            });
          }) : matchObj.items;
          var indeterminatesItem = xe_utils_amd_xe_utils_default.a.find(matchObj.items, function (item) {
            return treeIndeterminates.indexOf(item) > -1;
          });

          if (indeterminatesItem) {
            parentStatus = -1;
          } else {
            var selectItems = matchObj.items.filter(function (item) {
              return xe_utils_amd_xe_utils_default.a.get(item, property);
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
        xe_utils_amd_xe_utils_default.a.set(row, property, value);
        this.handleSelectReserveRow(row, value);
      }
    } else {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          treeIndeterminates.push(row);
          xe_utils_amd_xe_utils_default.a.remove(selection, function (item) {
            return item === row;
          });
        } else {
          // 更新子节点状态
          xe_utils_amd_xe_utils_default.a.eachTree([row], function (item, $rowIndex) {
            if (row === item || !checkMethod || checkMethod({
              row: item,
              $rowIndex: $rowIndex
            })) {
              if (value) {
                selection.push(item);
              } else {
                xe_utils_amd_xe_utils_default.a.remove(selection, function (select) {
                  return select === item;
                });
              }

              _this23.handleSelectReserveRow(row, value);
            }
          }, treeOpts);
          xe_utils_amd_xe_utils_default.a.remove(treeIndeterminates, function (item) {
            return item === row;
          });
        } // 如果存在父节点，更新父节点状态


        var _matchObj = xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
          return item === row;
        }, treeOpts);

        if (_matchObj && _matchObj.parent) {
          var _parentStatus;

          var _vItems = checkMethod ? _matchObj.items.filter(function (item, $rowIndex) {
            return checkMethod({
              row: item,
              $rowIndex: $rowIndex
            });
          }) : _matchObj.items;

          var _indeterminatesItem = xe_utils_amd_xe_utils_default.a.find(_matchObj.items, function (item) {
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
        if (value) {
          if (selection.indexOf(row) === -1) {
            selection.push(row);
          }
        } else {
          xe_utils_amd_xe_utils_default.a.remove(selection, function (item) {
            return item === row;
          });
        }

        this.handleSelectReserveRow(row, value);
      }
    }

    this.checkSelectionStatus();
  },
  handleToggleCheckRowEvent: function handleToggleCheckRowEvent(params, evnt) {
    var selection = this.selection,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField;
    var row = params.row;
    var value = property ? !xe_utils_amd_xe_utils_default.a.get(row, property) : selection.indexOf(row) === -1;

    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, value);
    } else {
      this.handleSelectRow(params, value);
    }
  },
  triggerCheckRowEvent: function triggerCheckRowEvent(evnt, params, value) {
    var checkMethod = this.checkboxOpts.checkMethod;

    if (!checkMethod || checkMethod({
      row: params.row,
      rowIndex: params.rowIndex,
      $rowIndex: params.$rowIndex
    })) {
      this.handleSelectRow(params, value);
      UtilTools.emitEvent(this, 'select-change', [Object.assign({
        selection: this.getSelectRecords(),
        reserves: this.getSelectReserveRecords(),
        checked: value,
        $table: this
      }, params), evnt]);
    }
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

  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllSelection: function setAllSelection(value) {
    var _this24 = this;

    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        selection = this.selection,
        selectReserveRowMap = this.selectReserveRowMap,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField,
        reserve = checkboxOpts.reserve,
        checkStrictly = checkboxOpts.checkStrictly,
        checkMethod = checkboxOpts.checkMethod;
    var selectRows = [];

    if (!checkStrictly) {
      if (property) {
        var indexKey = "".concat(treeConfig ? '$' : '', "rowIndex");

        var setValFn = function setValFn(row, rowIndex) {
          var _checkMethod;

          if (!checkMethod || checkMethod((_checkMethod = {
            row: row
          }, _defineProperty(_checkMethod, indexKey, rowIndex), _defineProperty(_checkMethod, "$rowIndex", rowIndex), _checkMethod))) {
            xe_utils_amd_xe_utils_default.a.set(row, property, value);
          }
        };

        var clearValFn = function clearValFn(row, rowIndex) {
          var _checkMethod2;

          if (!checkMethod || (checkMethod((_checkMethod2 = {
            row: row
          }, _defineProperty(_checkMethod2, indexKey, rowIndex), _defineProperty(_checkMethod2, "$rowIndex", rowIndex), _checkMethod2)) ? 0 : selection.indexOf(row) > -1)) {
            xe_utils_amd_xe_utils_default.a.set(row, property, value);
          }
        };

        if (treeConfig) {
          xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, value ? setValFn : clearValFn, treeOpts);
        } else {
          tableFullData.forEach(value ? setValFn : clearValFn);
        }
      } else {
        if (treeConfig) {
          if (value) {
            xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, function (row, $rowIndex) {
              if (!checkMethod || checkMethod({
                row: row,
                $rowIndex: $rowIndex
              })) {
                selectRows.push(row);
              }
            }, treeOpts);
          } else {
            if (checkMethod) {
              xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, function (row, $rowIndex) {
                if (checkMethod({
                  row: row,
                  $rowIndex: $rowIndex
                }) ? 0 : selection.indexOf(row) > -1) {
                  selectRows.push(row);
                }
              }, treeOpts);
            }
          }
        } else {
          if (value) {
            if (checkMethod) {
              selectRows = tableFullData.filter(function (row, rowIndex) {
                return selection.indexOf(row) > -1 || checkMethod({
                  row: row,
                  rowIndex: rowIndex,
                  $rowIndex: rowIndex
                });
              });
            } else {
              selectRows = tableFullData.slice(0);
            }
          } else {
            if (checkMethod) {
              selectRows = tableFullData.filter(function (row, rowIndex) {
                return checkMethod({
                  row: row,
                  rowIndex: rowIndex,
                  $rowIndex: rowIndex
                }) ? 0 : selection.indexOf(row) > -1;
              });
            }
          }
        }
      }

      if (reserve) {
        if (value) {
          selectRows.forEach(function (row) {
            selectReserveRowMap[UtilTools.getRowid(_this24, row)] = row;
          });
        } else {
          tableFullData.forEach(function (row) {
            var rowid = UtilTools.getRowid(_this24, row);

            if (selectReserveRowMap[rowid]) {
              delete selectReserveRowMap[rowid];
            }
          });
        }
      }

      this.selection = selectRows;
    }

    this.treeIndeterminates = [];
    this.checkSelectionStatus();
  },
  checkSelectionStatus: function checkSelectionStatus() {
    var tableFullData = this.tableFullData,
        editStore = this.editStore,
        selection = this.selection,
        treeIndeterminates = this.treeIndeterminates,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField,
        checkStrictly = checkboxOpts.checkStrictly,
        checkMethod = checkboxOpts.checkMethod;
    var insertList = editStore.insertList; // 包含新增的数据

    if (insertList.length) {
      tableFullData = tableFullData.concat(insertList);
    }

    if (!checkStrictly) {
      if (property) {
        this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
          return !checkMethod({
            row: row,
            rowIndex: rowIndex,
            $rowIndex: rowIndex
          }) || xe_utils_amd_xe_utils_default.a.get(row, property);
        } : function (row) {
          return xe_utils_amd_xe_utils_default.a.get(row, property);
        });
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(function (row) {
          return xe_utils_amd_xe_utils_default.a.get(row, property) || treeIndeterminates.indexOf(row) > -1;
        });
      } else {
        this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
          return !checkMethod({
            row: row,
            rowIndex: rowIndex,
            $rowIndex: rowIndex
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
  // 还原展开、选中等相关状态
  handleReserveStatus: function handleReserveStatus() {
    var rowId = this.rowId,
        treeConfig = this.treeConfig,
        fullDataRowIdData = this.fullDataRowIdData,
        selectReserveRowMap = this.selectReserveRowMap,
        checkboxOpts = this.checkboxOpts;
    var reserveSelection = [];
    var reserveRowExpandeds = [];
    var reserveTreeExpandeds = [];
    var reserveTreeIndeterminates = []; // 复选框

    if (rowId) {
      this.handleReserveByRowid(this.selection, reserveSelection);
    }

    if (checkboxOpts.reserve) {
      Object.keys(selectReserveRowMap).forEach(function (rowid) {
        if (fullDataRowIdData[rowid] && reserveSelection.indexOf(fullDataRowIdData[rowid].row) === -1) {
          reserveSelection.push(fullDataRowIdData[rowid].row);
        }
      });
    }

    this.selection = reserveSelection; // 行展开

    if (rowId) {
      this.handleReserveByRowid(this.rowExpandeds, reserveRowExpandeds);
    }

    this.rowExpandeds = reserveRowExpandeds; // 树展开

    if (rowId && treeConfig) {
      this.handleReserveByRowid(this.treeIndeterminates, reserveTreeIndeterminates);
      this.handleReserveByRowid(this.treeExpandeds, reserveTreeExpandeds);
    }

    this.treeExpandeds = reserveTreeExpandeds;
    this.treeIndeterminates = reserveTreeIndeterminates;
  },
  handleReserveByRowid: function handleReserveByRowid(list, rest) {
    var _this25 = this;

    var fullDataRowIdData = this.fullDataRowIdData;
    list.forEach(function (row) {
      var rowid = UtilTools.getRowid(_this25, row);

      if (fullDataRowIdData[rowid]) {
        rest.push(fullDataRowIdData[rowid].row);
      }
    });
  },

  /**
   * 获取保留选中的行
   */
  getSelectReserveRecords: function getSelectReserveRecords() {
    var fullDataRowIdData = this.fullDataRowIdData,
        selectReserveRowMap = this.selectReserveRowMap,
        checkboxOpts = this.checkboxOpts;
    var reserveSelection = [];

    if (checkboxOpts.reserve) {
      Object.keys(selectReserveRowMap).forEach(function (rowid, row) {
        if (!fullDataRowIdData[rowid]) {
          reserveSelection.push(selectReserveRowMap[rowid]);
        }
      });
    }

    return reserveSelection;
  },
  clearSelectReserve: function clearSelectReserve() {
    this.selectReserveRowMap = {};
  },
  handleSelectReserveRow: function handleSelectReserveRow(row, checked) {
    var selectReserveRowMap = this.selectReserveRowMap,
        checkboxOpts = this.checkboxOpts;
    var reserve = checkboxOpts.reserve;

    if (reserve) {
      var rowid = UtilTools.getRowid(this, row);

      if (checked) {
        selectReserveRowMap[rowid] = row;
      } else if (selectReserveRowMap[rowid]) {
        delete selectReserveRowMap[rowid];
      }
    }
  },

  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent: function triggerCheckAllEvent(evnt, value) {
    this.setAllSelection(value);
    UtilTools.emitEvent(this, 'select-all', [{
      selection: this.getSelectRecords(),
      reserves: this.getSelectReserveRecords(),
      checked: value,
      $table: this
    }, evnt]);
  },

  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllSelection: function toggleAllSelection() {
    this.triggerCheckAllEvent(null, !this.isAllSelected);
    return this.$nextTick();
  },

  /**
   * 用于多选行，手动清空用户的选择
   */
  clearSelection: function clearSelection() {
    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField;

    if (property) {
      if (treeConfig) {
        xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, function (item) {
          return xe_utils_amd_xe_utils_default.a.set(item, property, false);
        }, treeOpts);
      } else {
        tableFullData.forEach(function (item) {
          return xe_utils_amd_xe_utils_default.a.set(item, property, false);
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
    var radioOpts = this.radioOpts,
        fullDataRowIdData = this.fullDataRowIdData;
    var rowid = radioOpts.checkRowKey;

    if (rowid && fullDataRowIdData[rowid]) {
      this.setRadioRow(fullDataRowIdData[rowid].row);
    }
  },

  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent: function triggerRadioRowEvent(evnt, params) {
    var radioOpts = this.radioOpts;
    var checkMethod = radioOpts.checkMethod;

    if (!checkMethod || checkMethod({
      row: params.row,
      rowIndex: params.rowIndex,
      $rowIndex: params.$rowIndex
    })) {
      var isChange = this.selectRow !== params.row;
      this.setRadioRow(params.row);

      if (isChange) {
        UtilTools.emitEvent(this, 'radio-change', [params, evnt]);
      }
    }
  },
  triggerCurrentRowEvent: function triggerCurrentRowEvent(evnt, params) {
    var isChange = this.currentRow !== params.row;
    this.setCurrentRow(params.row);

    if (isChange) {
      UtilTools.emitEvent(this, 'current-change', [params, evnt]);
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
      xe_utils_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(UtilTools.getRowid(this, row), "\"]")), function (elem) {
        return DomTools.addClass(elem, 'row--current');
      });
    }

    return this.$nextTick();
  },

  /**
   * 用于单选行，设置某一行为选中状态
   * @param {Row} row 行对象
   */
  setRadioRow: function setRadioRow(row) {
    if (this.selectRow !== row) {
      this.clearRadioRow();
    }

    this.selectRow = row;
    return this.$nextTick();
  },

  /**
   * 用于当前行，手动清空当前高亮的状态
   */
  clearCurrentRow: function clearCurrentRow() {
    this.currentRow = null;
    this.hoverRow = null;
    xe_utils_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll('.row--current'), function (elem) {
      return DomTools.removeClass(elem, 'row--current');
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
  getCurrentRow: function getCurrentRow() {
    return this.currentRow;
  },

  /**
   * 用于单选行，获取当已选中的数据
   */
  getRadioRow: function getRadioRow() {
    return this.selectRow;
  },

  /**
   * 行 hover 事件
   */
  triggerHoverEvent: function triggerHoverEvent(evnt, _ref4) {
    var row = _ref4.row;
    this.setHoverRow(row);
  },
  setHoverRow: function setHoverRow(row) {
    var rowid = UtilTools.getRowid(this, row);
    this.clearHoverRow();
    xe_utils_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(rowid, "\"]")), function (elem) {
      return DomTools.addClass(elem, 'row--hover');
    });
    this.hoverRow = row;
  },
  clearHoverRow: function clearHoverRow() {
    xe_utils_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll('.vxe-body--row.row--hover'), function (elem) {
      return DomTools.removeClass(elem, 'row--hover');
    });
    this.hoverRow = null;
  },
  triggerHeaderCellClickEvent: function triggerHeaderCellClickEvent(evnt, params) {
    var _lastResizeTime = this._lastResizeTime,
        sortOpts = this.sortOpts;
    var column = params.column,
        cell = params.cell;

    var triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300;

    var triggerSort = DomTools.getEventTargetNode(evnt, cell, 'vxe-sort-wrapper').flag;
    var triggerFilter = DomTools.getEventTargetNode(evnt, cell, 'vxe-filter-wrapper').flag;

    if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
      this.triggerSortEvent(evnt, column, column.order === 'desc' ? 'asc' : 'desc');
    }

    UtilTools.emitEvent(this, 'header-cell-click', [Object.assign({
      triggerResizable: triggerResizable,
      triggerSort: triggerSort,
      triggerFilter: triggerFilter
    }, params), evnt]);

    if (this.highlightCurrentColumn) {
      return this.setCurrentColumn(column, true);
    }

    return this.$nextTick();
  },

  /**
   * 用于当前列，设置某列行为高亮状态
   * @param {ColumnConfig} column 列配置
   */
  setCurrentColumn: function setCurrentColumn(column) {
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.currentColumn = column;
    xe_utils_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll(".".concat(column.id)), function (elem) {
      return DomTools.addClass(elem, 'col--current');
    });
    return this.$nextTick();
  },

  /**
   * 用于当前列，手动清空当前高亮的状态
   */
  clearCurrentColumn: function clearCurrentColumn() {
    this.currentColumn = null;
    xe_utils_amd_xe_utils_default.a.arrayEach(this.$el.querySelectorAll('.col--current'), function (elem) {
      return DomTools.removeClass(elem, 'col--current');
    });
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
    var _this26 = this;

    this.checkValidate('blur').catch(function (e) {
      return e;
    }).then(function () {
      _this26.handleActived(params, evnt).then(function () {
        return _this26.checkValidate('change');
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
    var $el = this.$el,
        highlightCurrentRow = this.highlightCurrentRow,
        editStore = this.editStore,
        radioOpts = this.radioOpts,
        expandOpts = this.expandOpts,
        treeOpts = this.treeOpts,
        editConfig = this.editConfig,
        checkboxOpts = this.checkboxOpts,
        _this$mouseConfig = this.mouseConfig,
        mouseConfig = _this$mouseConfig === void 0 ? {} : _this$mouseConfig;
    var actived = editStore.actived;
    var row = params.row,
        column = params.column; // 解决 checkbox 重复触发两次问题

    if (isTargetRadioOrCheckbox(evnt, column, 'radio') || isTargetRadioOrCheckbox(evnt, column, 'checkbox', 'checkbox') || isTargetRadioOrCheckbox(evnt, column, 'selection', 'checkbox')) {
      // 在 v3.0 中废弃 type=selection
      return;
    } // 如果是展开行


    if ((expandOpts.trigger === 'row' || column.type === 'expand' && expandOpts.trigger === 'cell') && !DomTools.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag) {
      this.triggerRowExpandEvent(evnt, params);
    } // 如果是树形表格


    if (treeOpts.trigger === 'row' || column.treeNode && treeOpts.trigger === 'cell') {
      this.triggerTreeExpandEvent(evnt, params);
    }

    if ((!column.treeNode || !DomTools.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag) && (column.type !== 'expand' || !DomTools.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag)) {
      // 如果是高亮行
      if (highlightCurrentRow) {
        if (radioOpts.trigger === 'row' || !DomTools.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag && !DomTools.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
          this.triggerCurrentRowEvent(evnt, params);
        }
      } // 如果是单选框


      if ((radioOpts.trigger === 'row' || column.type === 'radio' && radioOpts.trigger === 'cell') && !DomTools.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
        this.triggerRadioRowEvent(evnt, params);
      } // 如果是复选框


      if ((checkboxOpts.trigger === 'row' || (column.type === 'checkbox' || column.type === 'selection') && checkboxOpts.trigger === 'cell') && !DomTools.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
        // 在 v3.0 中废弃 type=selection
        this.handleToggleCheckRowEvent(params, evnt);
      } // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）


      if (!mouseConfig.checked) {
        if (editConfig) {
          if (editConfig.trigger === 'manual') {
            if (actived.args && actived.row === row && column !== actived.column) {
              this.handleChangeCell(evnt, params);
            }
          } else if (!actived.args || row !== actived.row || column !== actived.column) {
            if (editConfig.trigger === 'click') {
              this.handleChangeCell(evnt, params);
            } else if (editConfig.trigger === 'dblclick') {
              if (editConfig.mode === 'row' && actived.row === row) {
                this.handleChangeCell(evnt, params);
              } else {
                this.handleSelected(params, evnt);
              }
            }
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
    var _this27 = this;

    var editStore = this.editStore,
        editConfig = this.editConfig;
    var actived = editStore.actived;

    if (editConfig && editConfig.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editConfig.mode === 'row') {
          this.checkValidate('blur').catch(function (e) {
            return e;
          }).then(function () {
            _this27.handleActived(params, evnt).then(function () {
              return _this27.checkValidate('change');
            }).catch(function (e) {
              return e;
            });
          });
        } else if (editConfig.mode === 'cell') {
          this.handleActived(params, evnt).then(function () {
            return _this27.checkValidate('change');
          }).catch(function (e) {
            return e;
          });
        }
      }
    }

    UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt]);
  },
  handleDefaultSort: function handleDefaultSort() {
    var defaultSort = this.sortOpts.defaultSort;

    if (defaultSort) {
      var field = defaultSort.field,
          order = defaultSort.order;

      if (field && order) {
        this.sort(field, order);
      }
    }
  },

  /**
   * 点击排序事件
   */
  triggerSortEvent: function triggerSortEvent(evnt, column, order) {
    var property = column.property;

    if (column.sortable || column.remoteSort) {
      var evntParams = {
        column: column,
        property: property,
        field: property,
        prop: property,
        order: order,
        $table: this
      };

      if (column.order === order) {
        evntParams.order = null;
        this.clearSort(column.property);
      } else {
        this.sort(property, order);
      }

      UtilTools.emitEvent(this, 'sort-change', [evntParams, evnt]);
    }
  },
  sort: function sort(field, order) {
    var visibleColumn = this.visibleColumn,
        tableFullColumn = this.tableFullColumn,
        remoteSort = this.remoteSort,
        sortOpts = this.sortOpts;
    var column = xe_utils_amd_xe_utils_default.a.find(visibleColumn, function (item) {
      return item.property === field;
    });

    if (column) {
      var isRemote = xe_utils_amd_xe_utils_default.a.isBoolean(column.remoteSort) ? column.remoteSort : sortOpts.remote || remoteSort;

      if (column.sortable || column.remoteSort) {
        if (!order) {
          order = column.order === 'desc' ? 'asc' : 'desc';
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
    return this.visibleColumn.fild(function (column) {
      return column.sortable && column.order;
    });
  },

  /**
   * 关闭筛选
   * @param {Event} evnt 事件
   */
  closeFilter: function closeFilter(evnt) {
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
      return column.filters && column.filters.some(function (option) {
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
      xe_utils_amd_xe_utils_default.a.remove(expandLazyLoadeds, function (item) {
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
    var _this28 = this;

    var expandOpts = this.expandOpts,
        expandLazyLoadeds = this.expandLazyLoadeds;
    var lazy = expandOpts.lazy;

    if (lazy && expandLazyLoadeds.indexOf(row) === -1) {
      this.clearRowExpandLoaded(row).then(function () {
        return _this28.handleAsyncRowExpand(row);
      });
    }

    return this.$nextTick();
  },

  /**
   * 展开行事件
   */
  triggerRowExpandEvent: function triggerRowExpandEvent(evnt, params) {
    var $listeners = this.$listeners,
        expandOpts = this.expandOpts,
        expandLazyLoadeds = this.expandLazyLoadeds;
    var row = params.row;
    var lazy = expandOpts.lazy;

    if (!lazy || expandLazyLoadeds.indexOf(row) === -1) {
      var expanded = !this.isExpandByRow(row);
      this.setRowExpansion(row, expanded);

      if ($listeners['toggle-expand-change']) {
        UtilTools.warn('vxe.error.delEvent', ['toggle-expand-change', 'toggle-row-expand']);
        UtilTools.emitEvent(this, 'toggle-expand-change', [{
          expanded: expanded,
          row: row,
          rowIndex: this.getRowIndex(row),
          $table: this
        }, evnt]);
      } else {
        UtilTools.emitEvent(this, 'toggle-row-expand', [{
          expanded: expanded,
          row: row,
          rowIndex: this.getRowIndex(row),
          $table: this
        }, evnt]);
      }
    }
  },

  /**
   * 切换展开行
   */
  toggleRowExpansion: function toggleRowExpansion(row) {
    return this.setRowExpansion(row, !this.isExpandByRow(row));
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
      this.setAllRowExpansion(true);
    } else if (expandRowKeys) {
      var defExpandeds = [];
      expandRowKeys.forEach(function (rowid) {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row);
        }
      });
      this.setRowExpansion(defExpandeds, true);
    }
  },

  /**
   * 设置所有行的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllRowExpansion: function setAllRowExpansion(expanded) {
    if (this.expandOpts.lazy) {
      return this.setRowExpansion(this.tableData, true);
    }

    this.rowExpandeds = expanded ? this.tableFullData.slice(0) : [];
    return this.$nextTick().then(this.recalculate);
  },
  handleAsyncRowExpand: function handleAsyncRowExpand(row) {
    var _this29 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        rowExpandeds = this.rowExpandeds,
        expandLazyLoadeds = this.expandLazyLoadeds,
        expandOpts = this.expandOpts;
    var loadMethod = expandOpts.loadMethod;
    var rest = fullAllDataRowMap.get(row);
    return new Promise(function (resolve) {
      expandLazyLoadeds.push(row);
      loadMethod({
        $table: _this29,
        row: row
      }).catch(function (e) {
        return e;
      }).then(function () {
        rest.expandLoaded = true;
        xe_utils_amd_xe_utils_default.a.remove(expandLazyLoadeds, function (item) {
          return item === row;
        });
        rowExpandeds.push(row);
        resolve(_this29.$nextTick().then(_this29.recalculate));
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
  setRowExpansion: function setRowExpansion(rows, expanded) {
    var _this30 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        rowExpandeds = this.rowExpandeds,
        expandLazyLoadeds = this.expandLazyLoadeds,
        expandOpts = this.expandOpts;
    var lazy = expandOpts.lazy,
        accordion = expandOpts.accordion;
    var result = [];

    if (rows) {
      if (!xe_utils_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      }

      if (accordion) {
        // 只能同时展开一个
        rowExpandeds = [];
        rows = rows.slice(rows.length - 1, rows.length);
      }

      if (expanded) {
        rows.forEach(function (row) {
          if (rowExpandeds.indexOf(row) === -1) {
            var rest = fullAllDataRowMap.get(row);
            var isLoad = lazy && !rest.expandLoaded && expandLazyLoadeds.indexOf(row) === -1;

            if (isLoad) {
              result.push(_this30.handleAsyncRowExpand(row));
            } else {
              rowExpandeds.push(row);
            }
          }
        });
      } else {
        xe_utils_amd_xe_utils_default.a.remove(rowExpandeds, function (row) {
          return rows.indexOf(row) > -1;
        });
      }
    }

    this.rowExpandeds = rowExpandeds;
    return Promise.all(result).then(this.recalculate);
  },
  // 在 v3.0 中废弃 getRecords
  hasRowExpand: function hasRowExpand(row) {
    UtilTools.warn('vxe.error.delFunc', ['hasRowExpand', 'isExpandByRow']);
    return this.isExpandByRow(row);
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
    var _this31 = this;

    var isExists = this.rowExpandeds.length;
    this.rowExpandeds = [];
    return this.$nextTick().then(function () {
      return isExists ? _this31.recalculate() : 0;
    });
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
      xe_utils_amd_xe_utils_default.a.remove(treeExpandeds, function (item) {
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
    var _this32 = this;

    var treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds;
    var lazy = treeOpts.lazy,
        hasChild = treeOpts.hasChild;

    if (lazy && row[hasChild] && treeLazyLoadeds.indexOf(row) === -1) {
      this.clearTreeExpandLoaded(row).then(function () {
        return _this32.handleAsyncTreeExpandChilds(row);
      });
    }

    return this.$nextTick();
  },

  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent: function triggerTreeExpandEvent(evnt, params) {
    var $listeners = this.$listeners,
        treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds;
    var row = params.row;
    var lazy = treeOpts.lazy;

    if (!lazy || treeLazyLoadeds.indexOf(row) === -1) {
      var expanded = !this.isTreeExpandByRow(row);
      this.setTreeExpansion(row, expanded);

      if ($listeners['toggle-tree-change']) {
        UtilTools.warn('vxe.error.delEvent', ['toggle-tree-change', 'toggle-tree-expand']);
        UtilTools.emitEvent(this, 'toggle-tree-change', [{
          expanded: expanded,
          row: row,
          rowIndex: this.getRowIndex(row),
          $table: this
        }, evnt]);
      } else {
        UtilTools.emitEvent(this, 'toggle-tree-expand', [{
          expanded: expanded,
          row: row,
          rowIndex: this.getRowIndex(row),
          $table: this
        }, evnt]);
      }
    }
  },

  /**
   * 切换/展开树节点
   */
  toggleTreeExpansion: function toggleTreeExpansion(row) {
    return this.setTreeExpansion(row, !this.isTreeExpandByRow(row));
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
        this.setAllTreeExpansion(true);
      } else if (expandRowKeys) {
        var defExpandeds = [];
        var rowkey = UtilTools.getRowkey(this);
        expandRowKeys.forEach(function (rowid) {
          var matchObj = xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
            return rowid === xe_utils_amd_xe_utils_default.a.get(item, rowkey);
          }, treeOpts);

          if (matchObj) {
            defExpandeds.push(matchObj.item);
          }
        });
        this.setTreeExpansion(defExpandeds, true);
      }
    }
  },
  handleAsyncTreeExpandChilds: function handleAsyncTreeExpandChilds(row) {
    var _this33 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        treeExpandeds = this.treeExpandeds,
        treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds;
    var loadMethod = treeOpts.loadMethod,
        children = treeOpts.children;
    var rest = fullAllDataRowMap.get(row);
    return new Promise(function (resolve) {
      treeLazyLoadeds.push(row);
      loadMethod({
        $table: _this33,
        row: row
      }).catch(function (e) {
        return [];
      }).then(function (childs) {
        rest.treeLoaded = true;
        xe_utils_amd_xe_utils_default.a.remove(treeLazyLoadeds, function (item) {
          return item === row;
        });

        if (!xe_utils_amd_xe_utils_default.a.isArray(childs)) {
          childs = [];
        }

        if (childs) {
          row[children] = childs;

          _this33.appendTreeCache(row, childs);

          if (childs.length && treeExpandeds.indexOf(row) === -1) {
            treeExpandeds.push(row);
          } // 如果当前节点已选中，则展开后子节点也被选中


          if (_this33.isCheckedByRow(row)) {
            _this33.setSelection(childs, true);
          }
        }

        resolve(_this33.$nextTick().then(_this33.recalculate));
      });
    });
  },

  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpansion: function setAllTreeExpansion(expanded) {
    var _this34 = this;

    var tableFullData = this.tableFullData,
        treeOpts = this.treeOpts;
    var lazy = treeOpts.lazy,
        children = treeOpts.children;

    if (expanded) {
      if (lazy) {
        xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, function (row) {
          _this34.setTreeExpansion(row, true);
        }, treeOpts);
      } else {
        var treeExpandeds = [];
        xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, function (row) {
          var rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(row);
          }
        }, treeOpts);
        this.treeExpandeds = treeExpandeds;
      }
    } else {
      this.treeExpandeds = [];
    }

    return this.$nextTick().then(this.recalculate);
  },

  /**
   * 设置展开树形节点，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setTreeExpansion: function setTreeExpansion(rows, expanded) {
    var _this35 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        tableFullData = this.tableFullData,
        treeExpandeds = this.treeExpandeds,
        treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds;
    var lazy = treeOpts.lazy,
        hasChild = treeOpts.hasChild,
        children = treeOpts.children,
        accordion = treeOpts.accordion;
    var result = [];

    if (rows) {
      if (!xe_utils_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      }

      if (rows.length) {
        if (accordion) {
          rows = rows.slice(rows.length - 1, rows.length); // 同一级只能展开一个

          var matchObj = xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
            return item === rows[0];
          }, treeOpts);
          xe_utils_amd_xe_utils_default.a.remove(treeExpandeds, function (item) {
            return matchObj.items.indexOf(item) > -1;
          });
        }

        if (expanded) {
          rows.forEach(function (row) {
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
          xe_utils_amd_xe_utils_default.a.remove(treeExpandeds, function (row) {
            return rows.indexOf(row) > -1;
          });
        }

        return Promise.all(result).then(this.recalculate);
      }
    }

    return Promise.resolve();
  },
  // 在 v3.0 中废弃 hasTreeExpand
  hasTreeExpand: function hasTreeExpand(row) {
    UtilTools.warn('vxe.error.delFunc', ['hasTreeExpand', 'isTreeExpandByRow']);
    return this.isTreeExpandByRow(row);
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

    var isExists = this.treeExpandeds.length;
    this.treeExpandeds = [];
    return this.$nextTick().then(function () {
      return isExists ? _this36.recalculate() : 0;
    });
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
    this.updateVirtualScrollX();
  },
  updateVirtualScrollX: function updateVirtualScrollX(force) {
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
    var preload = force || false;
    var colLen = visibleColumn.length;

    for (var colIndex = 0; colIndex < colLen; colIndex++) {
      width += visibleColumn[colIndex].renderWidth;

      if (scrollLeft < width) {
        toVisibleIndex = colIndex;
        break;
      }
    }

    if (force || scrollXStore.visibleIndex !== toVisibleIndex) {
      var marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize);

      if (scrollXStore.visibleIndex === toVisibleIndex) {
        scrollXStore.startIndex = toVisibleIndex;
      } else if (scrollXStore.visibleIndex > toVisibleIndex) {
        // 向左
        preload = toVisibleIndex - offsetSize <= startIndex;

        if (preload) {
          scrollXStore.startIndex = Math.max(0, Math.max(0, toVisibleIndex - marginSize));
        }
      } else {
        // 向右
        preload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;

        if (preload) {
          scrollXStore.startIndex = Math.max(0, Math.min(visibleColumn.length - renderSize, toVisibleIndex - marginSize));
        }
      }

      if (preload) {
        this.updateScrollXData();
      }

      scrollXStore.visibleIndex = toVisibleIndex;
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
  debounceScrollY: xe_utils_amd_xe_utils_default.a.debounce(function (evnt) {
    this.loadScrollYData(evnt);
  }, debounceScrollYDuration, {
    leading: false,
    trailing: true
  }),

  /**
   * 纵向 Y 可视渲染处理
   */
  loadScrollYData: function loadScrollYData(evnt) {
    var afterFullData = this.afterFullData,
        scrollYStore = this.scrollYStore,
        isLoadData = this.isLoadData;
    var startIndex = scrollYStore.startIndex,
        renderSize = scrollYStore.renderSize,
        offsetSize = scrollYStore.offsetSize,
        visibleSize = scrollYStore.visibleSize,
        rowHeight = scrollYStore.rowHeight;
    var scrollBodyElem = evnt.target;
    var scrollTop = scrollBodyElem.scrollTop;
    var toVisibleIndex = Math.ceil(scrollTop / rowHeight);
    var preload = false;

    if (isLoadData || scrollYStore.visibleIndex !== toVisibleIndex) {
      var marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize);

      if (scrollYStore.visibleIndex > toVisibleIndex) {
        // 向上
        preload = toVisibleIndex - offsetSize <= startIndex;

        if (preload) {
          scrollYStore.startIndex = Math.max(0, toVisibleIndex - Math.max(marginSize, renderSize - visibleSize));
        }
      } else {
        // 向下
        preload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;

        if (preload) {
          scrollYStore.startIndex = Math.max(0, Math.min(afterFullData.length - renderSize, toVisibleIndex - marginSize));
        }
      }

      if (preload) {
        this.updateScrollYData();
      }

      scrollYStore.visibleIndex = toVisibleIndex;
      this.isLoadData = false;
    }
  },
  computeRowHeight: function computeRowHeight() {
    var tableBody = this.$refs.tableBody;
    var tableBodyElem = tableBody ? tableBody.$el : null;
    var tableHeader = this.$refs.tableHeader;
    var rowHeight;

    if (tableBodyElem) {
      var firstTrElem = tableBodyElem.querySelector('tbody>tr');

      if (!firstTrElem && tableHeader) {
        firstTrElem = tableHeader.$el.querySelector('thead>tr');
      }

      if (firstTrElem) {
        rowHeight = firstTrElem.clientHeight;
      }
    } // 默认的行高


    if (!rowHeight) {
      rowHeight = this.rowHeightMaps[this.vSize || 'default'];
    }

    this.rowHeight = rowHeight;
  },
  // 计算可视渲染相关数据
  computeScrollLoad: function computeScrollLoad() {
    var _this37 = this;

    return this.$nextTick().then(function () {
      var vSize = _this37.vSize,
          scrollXLoad = _this37.scrollXLoad,
          scrollYLoad = _this37.scrollYLoad,
          scrollYStore = _this37.scrollYStore,
          scrollXStore = _this37.scrollXStore,
          visibleColumn = _this37.visibleColumn,
          optimizeOpts = _this37.optimizeOpts,
          rowHeightMaps = _this37.rowHeightMaps;
      var scrollX = optimizeOpts.scrollX,
          scrollY = optimizeOpts.scrollY;
      var tableBody = _this37.$refs.tableBody;
      var tableBodyElem = tableBody ? tableBody.$el : null;
      var tableHeader = _this37.$refs.tableHeader;

      if (tableBodyElem) {
        // 计算 X 逻辑
        if (scrollXLoad) {
          var bodyWidth = tableBodyElem.clientWidth;
          var visibleXSize = xe_utils_amd_xe_utils_default.a.toNumber(scrollX.vSize);

          if (!scrollX.vSize) {
            var len = visibleXSize = visibleColumn.length;
            var countWidth = 0;
            var column;

            for (var colIndex = 0; colIndex < len; colIndex++) {
              column = visibleColumn[colIndex];
              countWidth += column.renderWidth;

              if (countWidth > bodyWidth) {
                visibleXSize = colIndex + 1;
                break;
              }
            }
          }

          scrollXStore.visibleSize = visibleXSize; // 自动优化

          if (!scrollX.oSize) {
            scrollXStore.offsetSize = visibleXSize;
          }

          if (!scrollX.rSize) {
            scrollXStore.renderSize = visibleXSize + 4;
          }

          _this37.updateScrollXData();
        } else {
          _this37.updateScrollXSpace();
        } // 计算 Y 逻辑


        if (scrollYLoad) {
          var rHeight;

          if (scrollY.rHeight) {
            rHeight = scrollY.rHeight;
          } else {
            var firstTrElem = tableBodyElem.querySelector('tbody>tr');

            if (!firstTrElem && tableHeader) {
              firstTrElem = tableHeader.$el.querySelector('thead>tr');
            }

            if (firstTrElem) {
              rHeight = firstTrElem.clientHeight;
            }
          } // 默认的行高


          if (!rHeight) {
            rHeight = rowHeightMaps[vSize || 'default'];
          }

          var visibleYSize = xe_utils_amd_xe_utils_default.a.toNumber(scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / rHeight));
          scrollYStore.visibleSize = visibleYSize;
          scrollYStore.rowHeight = rHeight; // 自动优化

          if (!scrollY.oSize) {
            scrollYStore.offsetSize = visibleYSize;
          }

          if (!scrollY.rSize) {
            scrollYStore.renderSize = methods_browse.edge ? visibleYSize * 10 : isWebkit ? visibleYSize + 2 : visibleYSize * 6;
          }

          _this37.updateScrollYData();
        } else {
          _this37.updateScrollYSpace();
        }
      }

      _this37.$nextTick(_this37.updateStyle);
    });
  },
  updateScrollXData: function updateScrollXData() {
    var visibleColumn = this.visibleColumn,
        scrollXStore = this.scrollXStore;
    this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
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
    var headerElem = tableHeader ? tableHeader.$el.querySelector('.vxe-table--header') : null;
    var bodyElem = tableBody.$el.querySelector('.vxe-table--body');
    var footerElem = tableFooter ? tableFooter.$el.querySelector('.vxe-table--footer') : null;
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
    var bodyHeight = afterFullData.length * scrollYStore.rowHeight;
    var topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0);
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

    var bodyElem = this.$refs.tableBody.$el;

    if (xe_utils_amd_xe_utils_default.a.isNumber(scrollLeft)) {
      var tableFooter = this.$refs.tableFooter;

      if (tableFooter) {
        tableFooter.$el.scrollLeft = scrollLeft;
      } else {
        bodyElem.scrollLeft = scrollLeft;
      }
    }

    if (xe_utils_amd_xe_utils_default.a.isNumber(scrollTop)) {
      var rightBody = this.$refs.rightBody;

      if (rightBody) {
        rightBody.$el.scrollTop = scrollTop;
      }

      bodyElem.scrollTop = scrollTop;
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
   * @param {ColumnConfig} column 列配置
   */
  scrollToRow: function scrollToRow(row, column) {
    var rest = [];

    if (row) {
      if (this.treeConfig) {
        rest.push(this.scrollToTreeRow(row));
      } else if (this.fullAllDataRowMap.has(row)) {
        rest.push(DomTools.rowToVisible(this, row));
      }
    }

    rest.push(this.scrollToColumn(column));
    return Promise.all(rest);
  },

  /**
   * 如果有滚动条，则滚动到对应的列
   * @param {ColumnConfig} column 列配置
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
      var matchObj = xe_utils_amd_xe_utils_default.a.findTree(tableFullData, function (item) {
        return item === row;
      }, treeOpts);

      if (matchObj) {
        var nodes = matchObj.nodes;
        nodes.forEach(function (row, index) {
          if (index < nodes.length - 1 && !_this39.isTreeExpandByRow(row)) {
            _this39.setTreeExpansion(row, true);
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
    var tableBody = $refs.tableBody;
    var tableBodyElem = tableBody ? tableBody.$el : null;
    var tableFooter = $refs.tableFooter;
    var tableFooterElem = tableFooter ? tableFooter.$el : null;
    var footerTargetElem = tableFooterElem || tableBodyElem;

    if (tableBodyElem) {
      tableBodyElem.scrollTop = 0;
    }

    if (footerTargetElem) {
      footerTargetElem.scrollLeft = 0;
    }

    return new Promise(function (resolve) {
      return setTimeout(function () {
        return resolve(_this40.$nextTick());
      });
    });
  },

  /**
   * 更新表尾合计
   */
  updateFooter: function updateFooter() {
    var showFooter = this.showFooter,
        tableColumn = this.tableColumn,
        footerMethod = this.footerMethod;

    if (showFooter && footerMethod) {
      this.footerData = tableColumn.length ? footerMethod({
        columns: tableColumn,
        data: this.afterFullData
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

    var customVal = !xe_utils_amd_xe_utils_default.a.isUndefined(cellValue);
    return this.$nextTick().then(function () {
      var $refs = _this41.$refs,
          tableData = _this41.tableData,
          editRules = _this41.editRules,
          validStore = _this41.validStore;

      if (scope && $refs.tableBody && editRules) {
        var row = scope.row,
            column = scope.column;
        var type = 'change';

        if (_this41.hasCellRules(type, row, column)) {
          var rowIndex = tableData.indexOf(row);
          var cell = DomTools.getCell(_this41, {
            row: row,
            rowIndex: rowIndex,
            column: column
          });

          if (cell) {
            return _this41.validCellRules(type, row, column, cellValue).then(function () {
              if (customVal && validStore.visible) {
                UtilTools.setCellValue(row, column, cellValue);
              }

              _this41.clearValidate();
            }).catch(function (_ref5) {
              var rule = _ref5.rule;

              if (customVal) {
                UtilTools.setCellValue(row, column, cellValue);
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
  updateZindex: function updateZindex() {
    if (this.tZindex < UtilTools.getLastZIndex()) {
      this.tZindex = UtilTools.nextZIndex(this);
    }
  },

  /*************************
   * Publish methods
   *************************/
  // 与工具栏对接
  connect: function connect(_ref6) {
    var toolbar = _ref6.toolbar;
    this.$toolbar = toolbar;
  },
  // 检查触发源是否属于目标节点
  getEventTargetNode: DomTools.getEventTargetNode
  /*************************
   * Publish methods
   *************************/

}; // Module methods

var funcs = 'filter,clearFilter,closeMenu,getMouseSelecteds,getMouseCheckeds,clearCopyed,clearChecked,clearHeaderChecked,clearIndexChecked,clearSelected,insert,insertAt,remove,removeSelecteds,revert,revertData,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearActived,getActiveRow,hasActiveRow,isActiveByRow,setActiveRow,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,exportCsv,openExport,exportData,openImport,importData,readFile,importByFile,print'.split(',');
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
 * @param {Object} $table 表格实例
 * @param {String} fixedType 固定列类型
 */

function renderFixed(h, $table, fixedType) {
  var tableData = $table.tableData,
      tableColumn = $table.tableColumn,
      visibleColumn = $table.visibleColumn,
      collectColumn = $table.collectColumn,
      isGroup = $table.isGroup,
      vSize = $table.vSize,
      showHeader = $table.showHeader,
      showFooter = $table.showFooter,
      columnStore = $table.columnStore,
      footerData = $table.footerData;
  var fixedColumn = columnStore["".concat(fixedType, "List")];
  return h('div', {
    class: "vxe-table--fixed-".concat(fixedType, "-wrapper"),
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
}

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
      type: [Boolean, String],
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
    align: {
      type: String,
      default: function _default() {
        return conf.align;
      }
    },
    // 所有的表头列的对齐方式
    headerAlign: {
      type: String,
      default: function _default() {
        return conf.headerAlign;
      }
    },
    // 所有的表尾列的对齐方式
    footerAlign: {
      type: String,
      default: function _default() {
        return conf.footerAlign;
      }
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: function _default() {
        return conf.showHeader;
      }
    },
    // （v3.0 废弃）
    startIndex: {
      type: Number,
      default: 0
    },
    // 是否要高亮当前选中行
    highlightCurrentRow: {
      type: Boolean,
      default: function _default() {
        return conf.highlightCurrentRow;
      }
    },
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: {
      type: Boolean,
      default: function _default() {
        return conf.highlightHoverRow;
      }
    },
    // 是否要高亮当前选中列
    highlightCurrentColumn: {
      type: Boolean,
      default: function _default() {
        return conf.highlightCurrentColumn;
      }
    },
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: {
      type: Boolean,
      default: function _default() {
        return conf.highlightHoverColumn;
      }
    },
    // 激活单元格编辑时是否高亮显示
    highlightCell: Boolean,
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
    // 合并行或列
    spanMethod: Function,
    // 表尾合并行或列
    footerSpanMethod: Function,
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
    // 是否所有服务端筛选
    remoteFilter: Boolean,
    // 是否所有服务端排序
    remoteSort: Boolean,
    // 自定义所有列的排序方法
    sortMethod: Function,
    // 所有列宽度
    columnWidth: [Number, String],
    // 所有列最小宽度，把剩余宽度按比例分配
    columnMinWidth: [Number, String],

    /** 高级属性 */
    // 主键配置
    columnKey: Boolean,
    rowKey: Boolean,
    rowId: {
      type: String,
      default: function _default() {
        return conf.rowId;
      }
    },
    zIndex: Number,
    // 是否自动监听父容器变化去更新响应式表格宽高
    autoResize: Boolean,
    // 是否自动根据状态属性去更新响应式表格宽高
    syncResize: Boolean,
    // 序号配置项
    seqConfig: Object,
    // 排序配置项
    sortConfig: Object,
    // 筛选配置项
    filterConfig: Object,
    // 单选框配置
    radioConfig: Object,
    // （v3.0 废弃）
    selectConfig: Object,
    // 复选框配置项
    checkboxConfig: Object,
    // tooltip 配置项
    tooltipConfig: Object,
    // 展开行配置项
    expandConfig: Object,
    // 树形结构配置项
    treeConfig: [Boolean, Object],
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
    optimization: Object,
    // 额外的参数
    params: Object
  },
  provide: function provide() {
    return {
      $table: this
    };
  },
  inject: {
    $grid: {
      default: null
    }
  },
  mixins: [],
  data: function data() {
    return {
      id: xe_utils_amd_xe_utils_default.a.uniqueId(),
      // 列分组配置
      collectColumn: [],
      // 完整所有列
      tableFullColumn: [],
      // 渲染的列
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
      // 所有列是否覆盖整个表格
      isCoverBody: false,
      // 行高
      rowHeight: 0,
      // 复选框属性，是否全选
      isAllSelected: false,
      // 复选框属性，有选中且非全选状态
      isIndeterminate: false,
      // 复选框属性，已选中的行
      selection: [],
      // 当前行
      currentRow: null,
      // 单选框属性，选中行
      selectRow: null,
      // 表尾合计数据
      footerData: [],
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
      printUrl: ''
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
    optimizeOpts: function optimizeOpts() {
      return Object.assign({}, conf.optimization, this.optimization);
    },
    rowHeightMaps: function rowHeightMaps() {
      return Object.assign({
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      }, this.optimizeOpts.rHeights);
    },
    seqOpts: function seqOpts() {
      return Object.assign({
        startIndex: 0
      }, conf.seqConfig, this.seqConfig);
    },
    radioOpts: function radioOpts() {
      return Object.assign({}, conf.radioConfig, this.radioConfig);
    },
    checkboxOpts: function checkboxOpts() {
      return Object.assign({}, conf.checkboxConfig, this.checkboxConfig || this.selectConfig);
    },
    tooltipOpts: function tooltipOpts() {
      return Object.assign({
        leaveDelay: 300
      }, conf.tooltipConfig, this.tooltipConfig);
    },
    vaildTipOpts: function vaildTipOpts() {
      return Object.assign({
        isArrow: false
      }, this.tooltipOpts);
    },
    sortOpts: function sortOpts() {
      return Object.assign({}, conf.sortConfig, this.sortConfig);
    },
    filterOpts: function filterOpts() {
      return Object.assign({}, conf.filterConfig, this.filterConfig);
    },
    // 是否使用了分组表头
    isGroup: function isGroup() {
      return this.collectColumn.some(function (column) {
        return UtilTools.hasChildrenList(column);
      });
    },
    hasTip: function hasTip() {
      return v_x_e_table._tooltip;
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
      return this.ctxMenuOpts.header && this.ctxMenuOpts.header.options ? this.ctxMenuOpts.header.options : [];
    },
    bodyCtxMenu: function bodyCtxMenu() {
      return this.ctxMenuOpts.body && this.ctxMenuOpts.body.options ? this.ctxMenuOpts.body.options : [];
    },
    isCtxMenu: function isCtxMenu() {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length;
    },
    ctxMenuOpts: function ctxMenuOpts() {
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
    },
    expandOpts: function expandOpts() {
      return Object.assign({}, conf.expandConfig, this.expandConfig);
    },
    treeOpts: function treeOpts() {
      return Object.assign({
        children: 'children',
        hasChild: 'hasChild',
        indent: 20
      }, conf.treeConfig, this.treeConfig);
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
            if (treeConfig) {} // 暂时不支持树形结构
            // 如果所有行都被禁用


            return tableFullData.every(function (row, rowIndex) {
              return !checkMethod({
                row: row,
                rowIndex: rowIndex,
                $rowIndex: rowIndex
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
      this.loadTableData(value, true).then(this.handleDefault);
    },
    customs: function customs(value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value);
      }

      this.isUpdateCustoms = false;
    },
    collectColumn: function collectColumn(value) {
      var _this = this;

      var tableFullColumn = UtilTools.getColumnList(value);
      this.tableFullColumn = tableFullColumn;
      this.cacheColumnMap();

      if (this.customs) {
        this.mergeCustomColumn(this.customs);
      }

      this.refreshColumn().then(function () {
        if (_this.scrollXLoad) {
          _this.updateVirtualScrollX(true);
        }
      });
      this.handleTableData(true);

      if (this.$toolbar) {
        this.$toolbar.updateColumn(tableFullColumn);
      } // 在 v3.0 中废弃 prop、label


      if (tableFullColumn.length) {
        var cIndex = Math.floor((tableFullColumn.length - 1) / 2);

        if (tableFullColumn[cIndex].prop) {
          UtilTools.warn('vxe.error.delProp', ['prop', 'field']);
        }

        if (tableFullColumn[cIndex].label) {
          UtilTools.warn('vxe.error.delProp', ['label', 'title']);
        }
      }

      if (this.treeConfig && tableFullColumn.some(function (column) {
        return column.fixed;
      }) && tableFullColumn.some(function (column) {
        return column.type === 'expand';
      })) {
        UtilTools.warn('vxe.error.treeFixedExpand');
      }
    },
    tableColumn: function tableColumn() {
      this.analyColumnWidth();
    },
    height: function height() {
      var _this2 = this;

      this.$nextTick(function () {
        return _this2.recalculate(true);
      });
    },
    loading: function loading() {
      if (!this._isLoading) {
        this._isLoading = true;
      }
    },
    syncResize: function syncResize(value) {
      var _this3 = this;

      if (value) {
        this.$nextTick(function () {
          return _this3.recalculate(true);
        });
      }
    }
  },
  created: function created() {
    var _this4 = this;

    var _Object$assign = Object.assign(this, {
      tZindex: 0,
      elemStore: {},
      // 存放横向 X 虚拟滚动相关的信息
      scrollXStore: {},
      // 存放纵向 Y 虚拟滚动相关信息
      scrollYStore: {},
      // 存放 tooltip 相关信息
      tooltipStore: {},
      // 表格父容器的高度
      parentHeight: 0,
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      // 单选框属性，选中列
      // currentColumn: null,
      // 当前 hover 行
      // hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      // 复选框属性，已选中保留的行
      selectReserveRowMap: {},
      // 完整数据、条件处理后
      tableFullData: [],
      afterFullData: [],
      // 缓存数据集
      fullAllDataRowMap: new Map(),
      fullAllDataRowIdData: {},
      fullDataRowMap: new Map(),
      fullDataRowIdData: {},
      fullColumnMap: new Map(),
      fullColumnIdData: {}
    }),
        scrollXStore = _Object$assign.scrollXStore,
        scrollYStore = _Object$assign.scrollYStore,
        optimizeOpts = _Object$assign.optimizeOpts,
        data = _Object$assign.data,
        loading = _Object$assign.loading,
        treeOpts = _Object$assign.treeOpts,
        treeConfig = _Object$assign.treeConfig,
        showOverflow = _Object$assign.showOverflow;

    var scrollX = optimizeOpts.scrollX,
        scrollY = optimizeOpts.scrollY; // 是否加载过 Loading 模块

    this._isLoading = loading;

    if (!UtilTools.getRowkey(this)) {
      UtilTools.error('vxe.error.emptyProp', ['row-id']);
    }

    if (this.startIndex) {
      UtilTools.warn('vxe.error.delProp', ['start-index', 'seq-config.startIndex']);
    }

    if (this.selectConfig) {
      UtilTools.warn('vxe.error.delProp', ['select-config', 'checkbox-config']);
    }

    if (treeConfig && treeOpts.line && !showOverflow) {
      UtilTools.warn('vxe.error.treeLineReqProp', ['show-overflow']);
    }

    if (this.sortMethod) {
      UtilTools.warn('vxe.error.delProp', ['sort-method', 'sort-config.sortMethod']);
    }

    if (this.remoteSort) {
      UtilTools.warn('vxe.error.delProp', ['remote-sort', 'sort-config.remote']);
    }

    if (this.remoteFilter) {
      UtilTools.warn('vxe.error.delProp', ['remote-filter', 'filter-config.remote']);
    } // 检查是否有安装需要的模块


    var errorModuleName;

    if (!v_x_e_table._edit && this.editConfig) {
      errorModuleName = 'Edit';
    } else if (!v_x_e_table._valid && this.editRules) {
      errorModuleName = 'Validator';
    } else if (!v_x_e_table._keyboard && (this.keyboardConfig || this.mouseConfig)) {
      errorModuleName = 'Keyboard';
    } else if (!v_x_e_table._resize && this.autoResize) {
      errorModuleName = 'Resize';
    }

    if (errorModuleName) {
      throw new Error(UtilTools.getLog('vxe.error.reqModule', [errorModuleName]));
    }

    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
        adaptive: xe_utils_amd_xe_utils_default.a.isBoolean(scrollY.adaptive) ? scrollY.adaptive : true,
        renderSize: xe_utils_amd_xe_utils_default.a.toNumber(scrollY.rSize),
        offsetSize: xe_utils_amd_xe_utils_default.a.toNumber(scrollY.oSize)
      });
    }

    if (scrollX) {
      Object.assign(scrollXStore, {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: xe_utils_amd_xe_utils_default.a.toNumber(scrollX.rSize),
        offsetSize: xe_utils_amd_xe_utils_default.a.toNumber(scrollX.oSize)
      });
    }

    this.loadTableData(data, true).then(function () {
      _this4.handleDefault();

      _this4.updateStyle();
    });
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent);
    this.preventEvent(null, 'created', {
      $table: this
    });
  },
  mounted: function mounted() {
    if (this.autoResize && v_x_e_table._resize) {
      this.bindResize();
    }

    document.body.appendChild(this.$refs.tableWrapper);
    this.preventEvent(null, 'mounted', {
      $table: this
    });
  },
  activated: function activated() {
    this.refreshScroll();
    this.preventEvent(null, 'activated', {
      $table: this
    });
  },
  deactivated: function deactivated() {
    this.preventEvent(null, 'deactivated', {
      $table: this
    });
  },
  beforeDestroy: function beforeDestroy() {
    var tableWrapper = this.$refs.tableWrapper;

    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper);
    }

    if (v_x_e_table._resize) {
      this.unbindResize();
    }

    this.closeFilter();
    this.closeMenu();
    this.clearAll();
    this.preventEvent(null, 'beforeDestroy', {
      $table: this
    });
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'blur');
    GlobalEvent.off(this, 'mousewheel');
    GlobalEvent.off(this, 'keydown');
    GlobalEvent.off(this, 'resize');
    GlobalEvent.off(this, 'contextmenu');
    this.preventEvent(null, 'destroyed', {
      $table: this
    });
  },
  render: function render(h) {
    var _e = this._e,
        id = this.id,
        isCoverBody = this.isCoverBody,
        tableData = this.tableData,
        tableColumn = this.tableColumn,
        visibleColumn = this.visibleColumn,
        collectColumn = this.collectColumn,
        isGroup = this.isGroup,
        hasFilter = this.hasFilter,
        isResizable = this.isResizable,
        isCtxMenu = this.isCtxMenu,
        loading = this.loading,
        stripe = this.stripe,
        _isLoading = this._isLoading,
        showHeader = this.showHeader,
        height = this.height,
        border = this.border,
        treeOpts = this.treeOpts,
        treeConfig = this.treeConfig,
        mouseConfig = this.mouseConfig,
        vSize = this.vSize,
        validOpts = this.validOpts,
        editRules = this.editRules,
        showFooter = this.showFooter,
        footerMethod = this.footerMethod,
        overflowX = this.overflowX,
        overflowY = this.overflowY,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad,
        scrollbarHeight = this.scrollbarHeight,
        highlightCell = this.highlightCell,
        highlightHoverRow = this.highlightHoverRow,
        highlightHoverColumn = this.highlightHoverColumn,
        editConfig = this.editConfig,
        optimizeOpts = this.optimizeOpts,
        vaildTipOpts = this.vaildTipOpts,
        tooltipOpts = this.tooltipOpts,
        columnStore = this.columnStore,
        filterStore = this.filterStore,
        ctxMenuStore = this.ctxMenuStore,
        footerData = this.footerData,
        hasTip = this.hasTip;
    var leftList = columnStore.leftList,
        rightList = columnStore.rightList;
    return h('div', {
      class: ['vxe-table', vSize ? "size--".concat(vSize) : '', border && xe_utils_amd_xe_utils_default.a.isString(border) ? "b--style-".concat(border) : '', {
        'vxe-editable': editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'is--group': isGroup,
        'has--height': height,
        'has--tree-line': treeConfig && treeOpts.line,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        'c--highlight': highlightCell,
        't--animat': optimizeOpts.animat,
        't--stripe': stripe,
        't--border': border,
        't--selected': mouseConfig && mouseConfig.selected,
        't--checked': mouseConfig && mouseConfig.checked,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn,
        'is--cover': isCoverBody,
        'is--loading': loading,
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
      class: 'vxe-table-hidden-column',
      ref: 'hideColumn'
    }, this.$slots.default), h('div', {
      class: 'vxe-table--main-wrapper'
    }, [
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
    }) : null]),
    /**
     * 左侧固定列
     */
    leftList && leftList.length && overflowX ? renderFixed(h, this, 'left') : _e(),
    /**
     * 右侧固定列
     */
    rightList && rightList.length && overflowX ? renderFixed(h, this, 'right') : _e(),
    /**
     * 空数据
     */
    !loading && !tableData.length ? h('div', {
      ref: 'emptyPlaceholder',
      class: 'vxe-table--empty-placeholder'
    }, [h('div', {
      class: 'vxe-table--empty-content'
    }, this.$scopedSlots.empty ? this.$scopedSlots.empty.call(this, {
      $table: this
    }, h) : conf.i18n('vxe.table.emptyText'))]) : _e(),
    /**
     * 列宽线
     */
    isResizable ? h('div', {
      class: 'vxe-table--resizable-bar',
      style: overflowX ? {
        'padding-bottom': "".concat(scrollbarHeight, "px")
      } : null,
      ref: 'resizeBar'
    }) : _e(),
    /**
     * 边框线
     */
    h('div', {
      class: 'vxe-table--border-line'
    }),
    /**
     * 加载中
     */
    _isLoading ? h('vxe-table-loading', {
      props: {
        visible: loading
      }
    }) : _e(),
    /**
     * 筛选
     */
    hasFilter ? h('vxe-table-filter', {
      props: {
        optimizeOpts: optimizeOpts,
        filterStore: filterStore
      },
      ref: 'filterWrapper'
    }) : _e(), h('div', {
      class: "vxe-table".concat(id, "-wrapper ").concat(this.$vnode.data.staticClass || ''),
      ref: 'tableWrapper'
    }, [
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
     * 单元格内容溢出的 tooltip
     */
    hasTip ? h('vxe-tooltip', {
      ref: 'tooltip',
      props: tooltipOpts,
      on: tooltipOpts.enterable ? {
        leave: this.handleTooltipLeaveEvent
      } : null
    }) : _e(),
    /**
     * 校验不通过的 tooltip
     */
    hasTip && editRules && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip') ? h('vxe-tooltip', {
      class: 'vxe-table--valid-error',
      props: validOpts.message === 'tooltip' || tableData.length === 1 ? vaildTipOpts : null,
      ref: 'validTip'
    }) : _e()])]);
  },
  methods: methods
});
// CONCATENATED MODULE: ./packages/table/index.js




table.install = function (Vue) {
  v_x_e_table.Vue = Vue;
  v_x_e_table.Table = table;
  Vue.component(table.name, table);
};

var Table = table;
/* harmony default export */ var packages_table = (table);
// CONCATENATED MODULE: ./packages/column/src/column.js





var column_props = {
  // 渲染类型 index,radio,checkbox,expand
  type: String,
  // 在 v3.0 中废弃 prop
  prop: String,
  // 在 v3.0 中废弃 label
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
  // 给单元格附加 className
  className: [String, Function],
  // 给表头单元格附加 className
  headerClassName: [String, Function],
  // 给表尾单元格附加 className
  footerClassName: [String, Function],
  // 格式化显示内容
  formatter: [Function, Array, String],
  // 自定义索引方法
  indexMethod: Function,
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
  // 是否可视
  visible: {
    type: Boolean,
    default: null
  },
  // 单元格渲染配置项
  cellRender: Object,
  // 单元格编辑渲染配置项
  editRender: Object,
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
      $column: this
    };
  },
  inject: {
    $table: {
      default: null
    },
    $column: {
      default: null
    }
  },
  watch: watch,
  created: function created() {
    this.columnConfig = this.createColumn(this.$table, this);
  },
  mounted: function mounted() {
    UtilTools.assemColumn(this);

    if (this.type === 'expand' && !this.$scopedSlots.content && this.$scopedSlots.default) {
      UtilTools.warn('vxe.error.expandContent');
    }
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
  mounted: function mounted() {
    var $table = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $table.elemStore;
    var prefix = "".concat(fixedType || 'main', "-header-");
    elemStore["".concat(prefix, "wrapper")] = $el;
    elemStore["".concat(prefix, "table")] = $refs.table;
    elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    elemStore["".concat(prefix, "list")] = $refs.thead;
    elemStore["".concat(prefix, "x-space")] = $refs.xSpace;
    elemStore["".concat(prefix, "repair")] = $refs.repair;
  },
  render: function render(h) {
    var _this = this;

    var _e = this._e,
        $table = this.$parent,
        fixedType = this.fixedType,
        headerColumn = this.headerColumn,
        tableColumn = this.tableColumn,
        fixedColumn = this.fixedColumn;
    var tableListeners = $table.$listeners,
        resizable = $table.resizable,
        border = $table.border,
        columnKey = $table.columnKey,
        headerRowClassName = $table.headerRowClassName,
        headerCellClassName = $table.headerCellClassName,
        headerRowStyle = $table.headerRowStyle,
        headerCellStyle = $table.headerCellStyle,
        allColumnHeaderOverflow = $table.showHeaderOverflow,
        allHeaderAlign = $table.headerAlign,
        allAlign = $table.align,
        highlightCurrentColumn = $table.highlightCurrentColumn,
        _$table$mouseConfig = $table.mouseConfig,
        mouseConfig = _$table$mouseConfig === void 0 ? {} : _$table$mouseConfig,
        scrollXLoad = $table.scrollXLoad,
        scrollYLoad = $table.scrollYLoad,
        overflowX = $table.overflowX,
        getColumnIndex = $table.getColumnIndex,
        sortOpts = $table.sortOpts; // 横向滚动渲染

    if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }
    }

    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper']
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('table', {
      class: 'vxe-table--header',
      attrs: {
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
    }, tableColumn.map(function (column, columnIndex) {
      var isColGroup = column.children && column.children.length;
      return h('col', {
        attrs: {
          name: column.id
        },
        key: columnKey || isColGroup ? column.id : columnIndex
      });
    }).concat([h('col', {
      attrs: {
        name: 'col_gutter'
      }
    })])),
    /**
     * 头部
     */
    h('thead', {
      ref: 'thead'
    }, headerColumn.map(function (cols, $rowIndex) {
      return h('tr', {
        class: ['vxe-header--row', headerRowClassName ? xe_utils_amd_xe_utils_default.a.isFunction(headerRowClassName) ? headerRowClassName({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : headerRowClassName : ''],
        style: headerRowStyle ? xe_utils_amd_xe_utils_default.a.isFunction(headerRowStyle) ? headerRowStyle({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : headerRowStyle : null
      }, cols.map(function (column, $columnIndex) {
        var _ref;

        var showHeaderOverflow = column.showHeaderOverflow,
            headerAlign = column.headerAlign,
            align = column.align,
            headerClassName = column.headerClassName;
        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var headOverflow = xe_utils_amd_xe_utils_default.a.isUndefined(showHeaderOverflow) || xe_utils_amd_xe_utils_default.a.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
        var headAlign = headerAlign || align || allHeaderAlign || allAlign;
        var showEllipsis = headOverflow === 'ellipsis';
        var showTitle = headOverflow === 'title';
        var showTooltip = headOverflow === true || headOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var thOns = {};
        var isFilter = column.filters.length;
        var hasFilter = isFilter && column.filters.some(function (item) {
          return item.checked;
        }); // 确保任何情况下 columnIndex 都精准指向真实列索引

        var columnIndex = getColumnIndex(column);
        var params = {
          $table: $table,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          fixed: fixedType,
          isHidden: fixedHiddenColumn,
          hasFilter: hasFilter
        }; // 虚拟滚动不支持动态高度

        if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
          showEllipsis = hasEllipsis = true;
        }

        if (showTitle || showTooltip) {
          thOns.mouseenter = function (evnt) {
            if ($table._isResize) {
              return;
            }

            if (showTitle) {
              DomTools.updateCellTitle(evnt);
            } else if (showTooltip) {
              $table.triggerHeaderTooltipEvent(evnt, {
                $table: $table,
                $rowIndex: $rowIndex,
                column: column,
                columnIndex: columnIndex,
                $columnIndex: $columnIndex,
                fixed: fixedType
              });
            }
          };
        }

        if (showTooltip) {
          thOns.mouseleave = function (evnt) {
            if ($table._isResize) {
              return;
            }

            if (showTooltip) {
              $table.handleTargetLeaveEvent(evnt);
            }
          };
        }

        if (highlightCurrentColumn || tableListeners['header-cell-click'] || mouseConfig.checked || sortOpts.trigger === 'cell') {
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
        } // 按下事件处理


        if (mouseConfig.checked) {
          thOns.mousedown = function (evnt) {
            return $table.triggerHeaderCellMousedownEvent(evnt, {
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

        return h('th', {
          class: ['vxe-header--column', column.id, (_ref = {}, _defineProperty(_ref, "col--".concat(headAlign), headAlign), _defineProperty(_ref, "col--".concat(column.type), column.type), _defineProperty(_ref, 'col--last', $columnIndex === cols.length - 1), _defineProperty(_ref, 'col--fixed', column.fixed), _defineProperty(_ref, 'col--group', isColGroup), _defineProperty(_ref, 'col--ellipsis', hasEllipsis), _defineProperty(_ref, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref, 'is--sortable', column.sortable), _defineProperty(_ref, 'is--filter', column.filters.length), _defineProperty(_ref, 'filter--active', hasFilter), _ref), UtilTools.getClass(headerClassName, params), UtilTools.getClass(headerCellClassName, params)],
          attrs: {
            'data-colid': column.id,
            colspan: column.colSpan,
            rowspan: column.rowSpan
          },
          style: headerCellStyle ? xe_utils_amd_xe_utils_default.a.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle : null,
          on: thOns,
          key: columnKey || isColGroup ? column.id : columnIndex
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
        !fixedHiddenColumn && !isColGroup && (xe_utils_amd_xe_utils_default.a.isBoolean(column.resizable) ? column.resizable : resizable) ? h('div', {
          class: ['vxe-resizable', {
            'is--line': !border
          }],
          on: {
            mousedown: function mousedown(evnt) {
              return _this.resizeMousedown(evnt, params);
            }
          }
        }) : null]);
      }).concat([h('th', {
        class: 'col--gutter'
      })]));
    }))]),
    /**
     * 其他
     */
    h('div', {
      class: 'vxe-table--repair',
      ref: 'repair'
    })]);
  },
  methods: {
    uploadColumn: function uploadColumn() {
      this.headerColumn = this.isGroup ? convertToRows(this.collectColumn) : [this.$parent.scrollXLoad && this.fixedType ? this.fixedColumn : this.tableColumn];
    },
    resizeMousedown: function resizeMousedown(evnt, params) {
      var column = params.column;
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

      $table._isResize = true;
      DomTools.addClass($table.$el, 'c--resize');
      resizeBarElem.style.display = 'block';
      document.onmousemove = updateEvent;

      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        column.resizeWidth = column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft);
        resizeBarElem.style.display = 'none';
        $table._isResize = false;
        $table._lastResizeTime = Date.now();
        $table.analyColumnWidth();
        $table.recalculate(true);
        DomTools.removeClass($table.$el, 'c--resize');

        if ($table.$toolbar) {
          $table.$toolbar.updateResizable();
        }

        UtilTools.emitEvent($table, 'resizable-change', [params]);
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









 // 滚动、拖动过程中不需要触发

function isOperateMouse($table) {
  return $table._isResize || $table.lastScrollTime && Date.now() < $table.lastScrollTime + $table.optimizeOpts.delayHover;
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

function getOffsetSize($table) {
  switch ($table.vSize) {
    case 'mini':
      return 3;

    case 'small':
      return 2;

    case 'medium':
      return 1;
  }

  return 0;
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

function renderBorder(h, type) {
  return h('div', {
    class: "vxe-table-".concat(type, "ed-borders"),
    ref: "".concat(type, "Borders")
  }, [h('span', {
    class: 'vxe-table-border-top',
    ref: "".concat(type, "Top")
  }), h('span', {
    class: 'vxe-table-border-right',
    ref: "".concat(type, "Right")
  }), h('span', {
    class: 'vxe-table-border-bottom',
    ref: "".concat(type, "Bottom")
  }), h('span', {
    class: 'vxe-table-border-left',
    ref: "".concat(type, "Left")
  })]);
}
/**
 * 渲染列
 */


function renderColumn(h, _vm, $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, columns, items) {
  var _ref2;

  var _e = $table._e,
      tableListeners = $table.$listeners,
      tableData = $table.tableData,
      height = $table.height,
      columnKey = $table.columnKey,
      overflowX = $table.overflowX,
      scrollXLoad = $table.scrollXLoad,
      scrollYLoad = $table.scrollYLoad,
      highlightCurrentRow = $table.highlightCurrentRow,
      allColumnOverflow = $table.showOverflow,
      allAlign = $table.align,
      cellClassName = $table.cellClassName,
      cellStyle = $table.cellStyle,
      spanMethod = $table.spanMethod,
      radioOpts = $table.radioOpts,
      checkboxOpts = $table.checkboxOpts,
      expandOpts = $table.expandOpts,
      treeOpts = $table.treeOpts,
      _$table$mouseConfig = $table.mouseConfig,
      mouseConfig = _$table$mouseConfig === void 0 ? {} : _$table$mouseConfig,
      editConfig = $table.editConfig,
      editRules = $table.editRules,
      validOpts = $table.validOpts,
      editStore = $table.editStore,
      validStore = $table.validStore;
  var editRender = column.editRender,
      align = column.align,
      showOverflow = column.showOverflow,
      className = column.className,
      treeNode = column.treeNode;
  var actived = editStore.actived;
  var fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX;
  var cellOverflow = xe_utils_amd_xe_utils_default.a.isUndefined(showOverflow) || xe_utils_amd_xe_utils_default.a.isNull(showOverflow) ? allColumnOverflow : showOverflow;
  var showEllipsis = cellOverflow === 'ellipsis';
  var showTitle = cellOverflow === 'title';
  var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
  var hasEllipsis = showTitle || showTooltip || showEllipsis;
  var isDirty;
  var tdOns = {};
  var cellAlign = align || allAlign;
  var validError = validStore.row === row && validStore.column === column;
  var hasDefaultTip = editRules && (validOpts.message === 'default' ? height || tableData.length > 1 : validOpts.message === 'inline');
  var attrs = {
    'data-colid': column.id
  };
  var triggerDblclick = editRender && editConfig && editConfig.trigger === 'dblclick';
  var params = {
    $table: $table,
    $seq: $seq,
    seq: seq,
    rowid: rowid,
    row: row,
    rowIndex: rowIndex,
    $rowIndex: $rowIndex,
    column: column,
    columnIndex: columnIndex,
    $columnIndex: $columnIndex,
    fixed: fixedType,
    isHidden: fixedHiddenColumn,
    level: rowLevel,
    data: tableData,
    items: items
  }; // 虚拟滚动不支持动态高度

  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true;
  } // hover 进入事件


  if (showTitle || showTooltip || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = function (evnt) {
      if (isOperateMouse($table)) {
        return;
      }

      var evntParams = {
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        isHidden: fixedHiddenColumn,
        level: rowLevel,
        cell: evnt.currentTarget
      };

      if (showTitle) {
        DomTools.updateCellTitle(evnt);
      } else if (showTooltip) {
        // 如果配置了显示 tooltip
        $table.triggerTooltipEvent(evnt, evntParams);
      }

      UtilTools.emitEvent($table, 'cell-mouseenter', [evntParams, evnt]);
    };
  } // hover 退出事件


  if (showTooltip || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = function (evnt) {
      if (isOperateMouse($table)) {
        return;
      }

      if (showTooltip) {
        $table.handleTargetLeaveEvent(evnt);
      }

      UtilTools.emitEvent($table, 'cell-mouseleave', [{
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        isHidden: fixedHiddenColumn,
        level: rowLevel,
        cell: evnt.currentTarget
      }, evnt]);
    };
  } // 按下事件处理


  if (mouseConfig.checked || mouseConfig.selected) {
    tdOns.mousedown = function (evnt) {
      $table.triggerCellMousedownEvent(evnt, {
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        isHidden: fixedHiddenColumn,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 点击事件处理


  if (highlightCurrentRow || tableListeners['cell-click'] || mouseConfig.checked || editRender && editConfig || expandOpts.trigger === 'row' || expandOpts.trigger === 'cell' || radioOpts.trigger === 'row' || column.type === 'radio' && radioOpts.trigger === 'cell' || // 在 v3.0 中废弃 type=selection
  checkboxOpts.trigger === 'row' || (column.type === 'checkbox' || column.type === 'selection') && checkboxOpts.trigger === 'cell' || treeOpts.trigger === 'row' || column.treeNode && treeOpts.trigger === 'cell') {
    tdOns.click = function (evnt) {
      $table.triggerCellClickEvent(evnt, {
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        isHidden: fixedHiddenColumn,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 双击事件处理


  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = function (evnt) {
      $table.triggerCellDBLClickEvent(evnt, {
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
        isHidden: fixedHiddenColumn,
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
    isDirty = $table.isUpdateByRow(row, column.property);
  }

  return h('td', {
    class: ['vxe-body--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(cellAlign), cellAlign), _defineProperty(_ref2, "col--".concat(column.type), column.type), _defineProperty(_ref2, 'col--last', $columnIndex === columns.length - 1), _defineProperty(_ref2, 'col--tree-node', treeNode), _defineProperty(_ref2, 'col--edit', editRender), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'edit--visible', editRender && editRender.type === 'visible'), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref2, 'col--dirty', isDirty), _defineProperty(_ref2, 'col--actived', editConfig && editRender && actived.row === row && (actived.column === column || editConfig.mode === 'row')), _defineProperty(_ref2, 'col--valid-error', validError), _ref2), UtilTools.getClass(className, params), UtilTools.getClass(cellClassName, params)],
    key: columnKey ? column.id : columnIndex,
    attrs: attrs,
    style: cellStyle ? xe_utils_amd_xe_utils_default.a.isFunction(cellStyle) ? cellStyle(params) : cellStyle : null,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn ? [] : renderLine(h, _vm, $table, rowLevel, items, params).concat([h('div', {
    class: ['vxe-cell', {
      'c--title': showTitle,
      'c--tooltip': showTooltip,
      'c--ellipsis': showEllipsis
    }],
    attrs: {
      title: showTitle ? UtilTools.getCellLabel(row, column, params) : null
    }
  }, column.renderCell(h, params)), hasDefaultTip ? validError ? h('div', {
    class: 'vxe-cell--valid',
    style: validStore.rule && validStore.rule.width ? {
      width: "".concat(validStore.rule.width, "px")
    } : null
  }, [h('span', {
    class: 'vxe-cell--valid-msg'
  }, validStore.content)]) : _e() : null]));
}

function renderLine(h, _vm, $table, rowLevel, items, params) {
  var column = params.column;
  var treeOpts = $table.treeOpts,
      treeConfig = $table.treeConfig;
  return column.slots && column.slots.line ? column.slots.line.call($table, params, h) : column.treeNode && treeConfig && treeOpts.line ? [h('div', {
    class: 'vxe-tree--line-wrapper'
  }, [h('div', {
    class: 'vxe-tree--line',
    style: {
      height: "".concat(calcTreeLine(params, items), "px"),
      left: "".concat(rowLevel * treeOpts.indent + (rowLevel ? 2 - getOffsetSize($table) : 0) + 16, "px")
    }
  })])] : [];
}

function renderRows(h, _vm, $table, $seq, rowLevel, fixedType, tableData, tableColumn) {
  var stripe = $table.stripe,
      rowKey = $table.rowKey,
      highlightHoverRow = $table.highlightHoverRow,
      rowClassName = $table.rowClassName,
      rowStyle = $table.rowStyle,
      treeConfig = $table.treeConfig,
      treeOpts = $table.treeOpts,
      treeExpandeds = $table.treeExpandeds,
      scrollYLoad = $table.scrollYLoad,
      scrollYStore = $table.scrollYStore,
      editStore = $table.editStore,
      rowExpandeds = $table.rowExpandeds,
      radioOpts = $table.radioOpts,
      checkboxOpts = $table.checkboxOpts,
      getColumnIndex = $table.getColumnIndex;
  var rows = [];
  tableData.forEach(function (row, $rowIndex) {
    var _ref3;

    var trOn = {};
    var rowIndex = $rowIndex;
    var seq = rowIndex + 1;

    if (scrollYLoad) {
      seq += scrollYStore.startIndex;
    } // 确保任何情况下 rowIndex 都精准指向真实 data 索引


    rowIndex = $table.getRowIndex(row); // 事件绑定

    if (highlightHoverRow) {
      trOn.mouseenter = function (evnt) {
        if (isOperateMouse($table)) {
          return;
        }

        $table.triggerHoverEvent(evnt, {
          row: row,
          rowIndex: rowIndex
        });
      };

      trOn.mouseleave = function (evnt) {
        if (isOperateMouse($table)) {
          return;
        }

        $table.clearHoverRow();
      };
    }

    var rowid = UtilTools.getRowid($table, row);
    rows.push(h('tr', {
      class: ['vxe-body--row', (_ref3 = {
        'row--stripe': stripe && rowIndex > 0 && (rowIndex + 1) % 2 === 0
      }, _defineProperty(_ref3, "row--level-".concat(rowLevel), treeConfig), _defineProperty(_ref3, 'row--new', editStore.insertList.indexOf(row) > -1), _defineProperty(_ref3, 'row--radio', radioOpts.highlight && $table.selectRow === row), _defineProperty(_ref3, 'row--cheched', checkboxOpts.highlight && $table.isCheckedByRow(row)), _ref3), rowClassName ? xe_utils_amd_xe_utils_default.a.isFunction(rowClassName) ? rowClassName({
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        fixedType: fixedType,
        rowLevel: rowLevel,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex
      }) : rowClassName : ''],
      attrs: {
        'data-rowid': rowid
      },
      style: rowStyle ? xe_utils_amd_xe_utils_default.a.isFunction(rowStyle) ? rowStyle({
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        fixedType: fixedType,
        rowLevel: rowLevel,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex
      }) : rowStyle : null,
      key: rowKey || treeConfig ? rowid : $rowIndex,
      on: trOn
    }, tableColumn.map(function (column, $columnIndex) {
      var columnIndex = getColumnIndex(column);
      return renderColumn(h, _vm, $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, tableColumn, tableData);
    }))); // 如果行被展开了

    if (rowExpandeds.length && rowExpandeds.indexOf(row) > -1) {
      var column = xe_utils_amd_xe_utils_default.a.find(tableColumn, function (column) {
        return column.type === 'expand';
      });
      var columnIndex = getColumnIndex(column);
      var cellStyle;

      if (treeConfig) {
        cellStyle = {
          paddingLeft: "".concat(rowLevel * treeOpts.indent + 30, "px")
        };
      }

      if (column) {
        rows.push(h('tr', {
          class: 'vxe-body--expanded-row',
          key: "expand_".concat(rowid),
          style: rowStyle ? xe_utils_amd_xe_utils_default.a.isFunction(rowStyle) ? rowStyle({
            $table: $table,
            $seq: $seq,
            seq: seq,
            rowid: rowid,
            fixedType: fixedType,
            rowLevel: rowLevel,
            row: row,
            rowIndex: rowIndex,
            $rowIndex: $rowIndex,
            isExpanded: true
          }) : rowStyle : null,
          on: trOn
        }, [h('td', {
          class: 'vxe-body--expanded-column',
          attrs: {
            colspan: tableColumn.length
          }
        }, [h('div', {
          class: ['vxe-body--expanded-cell', {
            'fixed--hidden': fixedType
          }],
          style: cellStyle
        }, [column.renderData(h, {
          $table: $table,
          seq: seq,
          rowid: rowid,
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
      var rowChildren = row[treeOpts.children];

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
 * css3 translate 方式：可以利用硬件加速，各方面较优，失去table布局能力
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
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
  },
  mounted: function mounted() {
    var $table = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $table.elemStore;
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
        $table = this.$parent,
        fixedColumn = this.fixedColumn,
        fixedType = this.fixedType;
    var $scopedSlots = $table.$scopedSlots,
        tableData = $table.tableData,
        tableColumn = $table.tableColumn,
        allColumnOverflow = $table.showOverflow,
        scrollXLoad = $table.scrollXLoad,
        _$table$mouseConfig2 = $table.mouseConfig,
        mouseConfig = _$table$mouseConfig2 === void 0 ? {} : _$table$mouseConfig2,
        _$table$keyboardConfi = $table.keyboardConfig,
        keyboardConfig = _$table$keyboardConfi === void 0 ? {} : _$table$keyboardConfi; // 如果是固定列与设置了超出隐藏

    if (fixedType && allColumnOverflow) {
      tableColumn = fixedColumn;
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }
    }

    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper']
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('div', {
      class: 'vxe-body--y-space',
      ref: 'ySpace'
    }), h('table', {
      class: 'vxe-table--body',
      attrs: {
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
    }, tableColumn.map(function (column, columnIndex) {
      return h('col', {
        attrs: {
          name: column.id
        },
        key: columnIndex
      });
    })),
    /**
     * 内容
     */
    h('tbody', {
      ref: 'tbody'
    }, renderRows(h, this, $table, '', 0, fixedType, tableData, tableColumn))]),
    /**
     * 选中边框线
     */
    !fixedType && (mouseConfig.checked || keyboardConfig.isCut) ? h('div', {
      class: 'vxe-table--borders'
    }, [mouseConfig.checked ? renderBorder(h, 'check') : null, keyboardConfig.isCut ? renderBorder(h, 'copy') : null]) : null, !fixedType ? h('div', {
      class: ['vxe-table--empty-block', tableData.length ? '' : 'is--empty'],
      ref: 'emptyBlock'
    }, [h('div', {
      class: 'vxe-table--empty-content'
    }, $scopedSlots.empty ? $scopedSlots.empty.call(this, {
      $table: this
    }, h) : conf.i18n('vxe.table.emptyText'))]) : null]);
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
          highlightHoverRow = $table.highlightHoverRow,
          scrollXLoad = $table.scrollXLoad,
          scrollYLoad = $table.scrollYLoad,
          lastScrollTop = $table.lastScrollTop,
          lastScrollLeft = $table.lastScrollLeft;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          leftBody = $refs.leftBody,
          rightBody = $refs.rightBody,
          tableFooter = $refs.tableFooter;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;
      var bodyElem = tableBody.$el;
      var leftElem = leftBody ? leftBody.$el : null;
      var rightElem = rightBody ? rightBody.$el : null;
      var scrollTop = bodyElem.scrollTop;
      var scrollLeft = bodyElem.scrollLeft;
      var isX = scrollLeft !== lastScrollLeft;
      var isY = scrollTop !== lastScrollTop;
      $table.lastScrollTop = scrollTop;
      $table.lastScrollLeft = scrollLeft;
      $table.lastScrollTime = Date.now();

      if (highlightHoverRow) {
        $table.clearHoverRow();
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
          $table.checkScrolling();

          if (isY) {
            syncBodyScroll(scrollTop, leftElem, rightElem);
          }
        }
      }

      if (scrollXLoad && isX) {
        $table.triggerScrollXEvent(evnt);

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
        $table.triggerScrollYEvent(evnt);
      }

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
  mounted: function mounted() {
    var $table = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $table.elemStore;
    var prefix = "".concat(fixedType || 'main', "-footer-");
    elemStore["".concat(prefix, "wrapper")] = $el;
    elemStore["".concat(prefix, "table")] = $refs.table;
    elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    elemStore["".concat(prefix, "list")] = $refs.tfoot;
    elemStore["".concat(prefix, "x-space")] = $refs.xSpace;
  },
  render: function render(h) {
    var _e = this._e,
        $table = this.$parent,
        fixedType = this.fixedType,
        fixedColumn = this.fixedColumn,
        tableColumn = this.tableColumn,
        footerData = this.footerData;
    var tableListeners = $table.$listeners,
        footerRowClassName = $table.footerRowClassName,
        footerCellClassName = $table.footerCellClassName,
        footerRowStyle = $table.footerRowStyle,
        footerCellStyle = $table.footerCellStyle,
        allFooterAlign = $table.footerAlign,
        footerSpanMethod = $table.footerSpanMethod,
        allAlign = $table.align,
        scrollXLoad = $table.scrollXLoad,
        columnKey = $table.columnKey,
        allColumnOverflow = $table.showOverflow,
        overflowX = $table.overflowX,
        getColumnIndex = $table.getColumnIndex; // 如果是使用优化模式

    if (fixedType && allColumnOverflow) {
      tableColumn = fixedColumn;
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }
    }

    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      on: {
        scroll: this.scrollEvent
      }
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('table', {
      class: 'vxe-table--footer',
      attrs: {
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
    }, tableColumn.map(function (column, columnIndex) {
      return h('col', {
        attrs: {
          name: column.id
        },
        key: columnIndex
      });
    }).concat([h('col', {
      attrs: {
        name: 'col_gutter'
      }
    })])),
    /**
     * 底部
     */
    h('tfoot', {
      ref: 'tfoot'
    }, footerData.map(function (list, $rowIndex) {
      return h('tr', {
        class: ['vxe-footer--row', footerRowClassName ? xe_utils_amd_xe_utils_default.a.isFunction(footerRowClassName) ? footerRowClassName({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : footerRowClassName : ''],
        style: footerRowStyle ? xe_utils_amd_xe_utils_default.a.isFunction(footerRowStyle) ? footerRowStyle({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : footerRowStyle : null
      }, tableColumn.map(function (column, $columnIndex) {
        var _ref2;

        var showOverflow = column.showOverflow,
            footerAlign = column.footerAlign,
            align = column.align,
            footerClassName = column.footerClassName;
        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var cellOverflow = xe_utils_amd_xe_utils_default.a.isUndefined(showOverflow) || xe_utils_amd_xe_utils_default.a.isNull(showOverflow) ? allColumnOverflow : showOverflow;
        var footAlign = footerAlign || align || allFooterAlign || allAlign;
        var showEllipsis = cellOverflow === 'ellipsis';
        var showTitle = cellOverflow === 'title';
        var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var attrs = {
          'data-colid': column.id
        };
        var tfOns = {}; // 确保任何情况下 columnIndex 都精准指向真实列索引

        var columnIndex = getColumnIndex(column);
        var params = {
          $table: $table,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          fixed: fixedType
        };

        if (showTitle || showTooltip) {
          tfOns.mouseenter = function (evnt) {
            if (showTitle) {
              DomTools.updateCellTitle(evnt);
            } else if (showTooltip) {
              $table.triggerFooterTooltipEvent(evnt, {
                $table: $table,
                $rowIndex: $rowIndex,
                column: column,
                columnIndex: columnIndex,
                $columnIndex: $columnIndex,
                fixed: fixedType
              });
            }
          };
        }

        if (showTooltip) {
          tfOns.mouseleave = function (evnt) {
            if (showTooltip) {
              $table.handleTargetLeaveEvent(evnt);
            }
          };
        }

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
        } // 合并行或列


        if (footerSpanMethod) {
          var _ref = footerSpanMethod({
            $table: $table,
            $rowIndex: $rowIndex,
            column: column,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            fixed: fixedType,
            data: footerData
          }) || {},
              _ref$rowspan = _ref.rowspan,
              rowspan = _ref$rowspan === void 0 ? 1 : _ref$rowspan,
              _ref$colspan = _ref.colspan,
              colspan = _ref$colspan === void 0 ? 1 : _ref$colspan;

          if (!rowspan || !colspan) {
            return null;
          }

          attrs.rowspan = rowspan;
          attrs.colspan = colspan;
        }

        return h('td', {
          class: ['vxe-footer--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(footAlign), footAlign), _defineProperty(_ref2, "col--".concat(column.type), column.type), _defineProperty(_ref2, 'col--last', $columnIndex === tableColumn.length - 1), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'filter--active', column.filters.some(function (item) {
            return item.checked;
          })), _ref2), UtilTools.getClass(footerClassName, params), UtilTools.getClass(footerCellClassName, params)],
          attrs: attrs,
          style: footerCellStyle ? xe_utils_amd_xe_utils_default.a.isFunction(footerCellStyle) ? footerCellStyle({
            $table: $table,
            $rowIndex: $rowIndex,
            column: column,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            fixed: fixedType
          }) : footerCellStyle : null,
          on: tfOns,
          key: columnKey ? column.id : columnIndex
        }, [h('div', {
          class: 'vxe-cell'
        }, UtilTools.formatText(list[$table.tableColumn.indexOf(column)], 1))]);
      }).concat([h('td', {
        class: 'col--gutter'
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
          triggerScrollXEvent = $table.triggerScrollXEvent,
          lastScrollLeft = $table.lastScrollLeft;
      var tableHeader = $refs.tableHeader;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var bodyElem = $refs.tableBody.$el;
      var footerElem = $refs.tableFooter.$el;
      var scrollLeft = footerElem.scrollLeft;
      var isX = scrollLeft !== lastScrollLeft;
      $table.lastScrollLeft = scrollLeft;
      $table.lastScrollTime = Date.now();

      if (headerElem) {
        headerElem.scrollLeft = scrollLeft;
      }

      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft;
      }

      if (scrollXLoad && isX) {
        triggerScrollXEvent(evnt);
      }

      UtilTools.emitEvent($table, 'scroll', [{
        type: 'footer',
        fixed: fixedType,
        scrollTop: bodyElem.scrollTop,
        scrollLeft: scrollLeft,
        isX: isX,
        isY: false,
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
// CONCATENATED MODULE: ./packages/filter/src/panel.js






/* harmony default export */ var panel = ({
  name: 'VxeTableFilter',
  props: {
    filterStore: Object,
    optimizeOpts: Object
  },
  render: function render(h) {
    var filterStore = this.filterStore,
        optimizeOpts = this.optimizeOpts;
    var column = filterStore.column;
    var filterRender = column ? column.own.filterRender : null;
    var compConf = filterRender ? Renderer.get(filterRender.name) : null;
    return h('div', {
      class: ['vxe-table--filter-wrapper', 'filter--prevent-default', compConf && compConf.className ? compConf.className : '', {
        't--animat': optimizeOpts.animat,
        'is--multiple': filterStore.multiple,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? [h('div', {
      class: 'vxe-table--filter-body'
    }, this.renderOptions(h, filterRender, compConf)), this.renderFooter(h)] : []);
  },
  methods: {
    renderOptions: function renderOptions(h, filterRender, compConf) {
      var _ref,
          _this = this;

      var $table = this.$parent,
          filterStore = this.filterStore;
      var vSize = $table.vSize;
      var args = filterStore.args,
          column = filterStore.column,
          multiple = filterStore.multiple;
      var slots = column.slots;

      if (slots && slots.filter) {
        return slots.filter.call($table, Object.assign({
          $table: $table,
          context: this
        }, args), h);
      } else if (compConf && compConf.renderFilter) {
        return compConf.renderFilter.call($table, h, filterRender, args, this);
      }

      var filterRens = [h('div', {
        class: ['vxe-table--filter-option', {
          'is--active': !filterStore.options.some(function (item) {
            return item.checked;
          })
        }],
        attrs: {
          title: conf.i18n('vxe.table.allTitle')
        }
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
            return _this.filterCheckAllEvent(evnt, evnt.target.checked);
          }
        }
      }), h('span', {
        class: 'vxe-checkbox--icon'
      }), h('span', {
        class: 'vxe-checkbox--label'
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
          attrs: {
            title: item.label
          },
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
              return _this.changeMultipleOption(evnt, evnt.target.checked, item);
            }
          }
        }), h('span', {
          class: 'vxe-checkbox--icon'
        }), h('span', {
          class: 'vxe-checkbox--label'
        }, item.label)]) : h('span', {
          class: 'vxe-table--filter-label',
          on: {
            click: function click(evnt) {
              return _this.changeRadioOption(evnt, !item.checked, item);
            }
          }
        }, item.label)]));
      });
      return filterRens;
    },
    renderFooter: function renderFooter(h) {
      var filterStore = this.filterStore;
      var column = filterStore.column,
          multiple = filterStore.multiple;
      var filterRender = column.own.filterRender;
      var compConf = filterRender ? Renderer.get(filterRender.name) : null;
      return multiple && (!compConf || compConf.isFooter !== false) ? h('div', {
        class: 'vxe-table--filter-footer'
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
    // 筛选发生改变
    changeOption: function changeOption(evnt, checked, item) {
      if (this.filterStore.multiple) {
        this.changeMultipleOption(evnt, checked, item);
      } else {
        this.changeRadioOption(evnt, checked, item);
      }
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
// CONCATENATED MODULE: ./packages/filter/src/mixin.js





/* harmony default export */ var src_mixin = ({
  methods: {
    /**
     * 手动调用筛选的方法
     * 如果不传回调则返回一个选项列表的 Promise 对象
     * 如果传回调则通过回调返回的值更新选项列表，并返回一个新选项列表的 Promise 对象
     * @param {String} field 字段名
     * @param {Function} callback 重置列表的回调函数，返回新的选项列表
     */
    _filter: function _filter(field, callback) {
      var column = this.getColumnByField(field);

      if (column) {
        var filters = column.filters;

        if (callback) {
          var rest = callback(filters);

          if (xe_utils_amd_xe_utils_default.a.isArray(rest)) {
            column.filters = UtilTools.getFilters(rest);
          }
        }

        return this.$nextTick().then(function () {
          return filters;
        });
      }

      return this.$nextTick();
    },

    /**
     * 点击筛选事件
     * 当筛选图标被点击时触发
     * 更新选项是否全部状态
     * 打开筛选面板
     * @param {Event} evnt 事件
     * @param {ColumnConfig} column 列配置
     * @param {Object} params 参数
     */
    triggerFilterEvent: function triggerFilterEvent(evnt, column, params) {
      var $refs = this.$refs,
          filterStore = this.filterStore;

      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false;
      } else {
        var filterWrapper = $refs.filterWrapper;
        var bodyElem = $refs.tableBody.$el;
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
        });
        filterStore.isAllSelected = filterStore.options.every(function (item) {
          return item.checked;
        });
        filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(function (item) {
          return item.checked;
        });
        this.$nextTick(function () {
          var filterWrapperElem = filterWrapper.$el;
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
          }); // 在 v3.0 中废弃 prop

          filterList.push({
            column: column,
            property: property,
            field: property,
            prop: property,
            values: valueList,
            datas: dataList
          });
        }
      }); // 在 v3.0 中废弃 prop

      UtilTools.emitEvent(this, 'filter-change', [{
        column: column,
        property: property,
        field: property,
        prop: property,
        values: values,
        datas: datas,
        filters: filterList,
        $table: this
      }]);
      this.updateFooter();

      if (scrollXLoad || scrollYLoad) {
        this.clearScroll();

        if (scrollYLoad) {
          this.updateScrollYSpace();
        }
      }

      this.closeFilter();
      this.$nextTick(this.recalculate);
    },

    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    resetFilterEvent: function resetFilterEvent(evnt) {
      this.filterStore.options.forEach(function (item) {
        item.checked = false;
        item.data = item._data;
      });
      this.confirmFilterEvent(evnt);
    },

    /**
     * 清空指定列的筛选条件
     * 如果为空则清空所有列的筛选条件
     * @param {String} field 字段名
     */
    _clearFilter: function _clearFilter(field) {
      var column = arguments.length ? this.getColumnByField(field) : null;
      var filterStore = this.filterStore;

      var handleClear = function handleClear(column) {
        var filters = column.filters;

        if (filters && filters.length) {
          filters.forEach(function (item) {
            item.checked = false;
            item.data = item._data;
          });
        }
      };

      if (column) {
        handleClear(column);
      } else {
        this.visibleColumn.forEach(handleClear);
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
// CONCATENATED MODULE: ./packages/loading/src/loading.js
/* harmony default export */ var src_loading = ({
  name: 'VxeTableLoading',
  props: {
    visible: Boolean
  },
  render: function render(h) {
    return h('div', {
      class: 'vxe-table--loading',
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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// CONCATENATED MODULE: ./packages/grid/src/grid.js













function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






var grid_methods = {};
var propKeys = Object.keys(packages_table.props);
Object.keys(packages_table.methods).forEach(function (name) {
  grid_methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments);
  };
});
/* harmony default export */ var grid = ({
  name: 'VxeGrid',
  props: _objectSpread({
    columns: Array,
    pagerConfig: Object,
    proxyConfig: Object,
    toolbar: [Boolean, Object]
  }, packages_table.props),
  provide: function provide() {
    return {
      $grid: this
    };
  },
  data: function data() {
    return {
      tableLoading: false,
      maximize: false,
      tableData: [],
      tableCustoms: [],
      pendingRecords: [],
      filterData: [],
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
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isMsg: function isMsg() {
      return this.proxyOpts.message !== false;
    },
    proxyOpts: function proxyOpts() {
      return Object.assign({}, conf.grid.proxyConfig, this.proxyConfig);
    },
    toolbarOpts: function toolbarOpts() {
      return Object.assign({}, conf.grid.toolbar, this.toolbar);
    },
    toolbarSlots: function toolbarSlots() {
      var $scopedSlots = this.$scopedSlots,
          toolbar = this.toolbar,
          toolbarOpts = this.toolbarOpts;
      var $buttons = $scopedSlots.buttons;
      var $tools = $scopedSlots.tools;
      var slots = {};

      if (toolbar) {
        if (toolbarOpts.slots) {
          $buttons = toolbarOpts.slots.buttons || $buttons;
          $tools = toolbarOpts.slots.tools || $tools;
        }
      }

      if ($buttons) {
        slots.buttons = $buttons;
      }

      if ($tools) {
        slots.tools = $tools;
      }

      return slots;
    },
    renderClass: function renderClass() {
      var _ref;

      var tableProps = this.tableProps,
          vSize = this.vSize,
          maximize = this.maximize;
      return ['vxe-grid', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 't--animat', tableProps.optimization.animat), _defineProperty(_ref, 'is--maximize', maximize), _ref)];
    },
    renderStyle: function renderStyle() {
      return this.maximize ? {
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
      var maximize = this.maximize,
          seqConfig = this.seqConfig,
          pagerConfig = this.pagerConfig,
          loading = this.loading,
          toolbar = this.toolbar,
          toolbarOpts = this.toolbarOpts,
          editConfig = this.editConfig,
          proxyConfig = this.proxyConfig,
          proxyOpts = this.proxyOpts,
          tableExtendProps = this.tableExtendProps,
          tableLoading = this.tableLoading,
          tablePage = this.tablePage,
          tableData = this.tableData,
          tableCustoms = this.tableCustoms,
          optimization = this.optimization;
      var props = Object.assign({}, tableExtendProps, {
        optimization: Object.assign({}, conf.optimization, optimization)
      });

      if (maximize) {
        if (tableExtendProps.maxHeight) {
          props.maxHeight = 'auto';
        } else {
          props.height = 'auto';
        }
      }

      if (proxyConfig) {
        Object.assign(props, {
          loading: loading || tableLoading,
          data: tableData,
          rowClassName: this.handleRowClassName
        });

        if (proxyOpts.index && pagerConfig) {
          props.seqConfig = Object.assign({}, seqConfig, {
            startIndex: (tablePage.currentPage - 1) * tablePage.pageSize
          });
        }
      }

      if (toolbar) {
        if (!(toolbarOpts.setting && toolbarOpts.setting.storage)) {
          props.customs = tableCustoms;
        }
      }

      if (editConfig) {
        props.editConfig = Object.assign({}, editConfig, {
          activeMethod: this.handleActiveMethod
        });
      }

      return props;
    },
    tableOns: function tableOns() {
      var $listeners = this.$listeners,
          toolbar = this.toolbar,
          proxyConfig = this.proxyConfig,
          proxyOpts = this.proxyOpts;
      var ons = Object.assign({}, $listeners);

      if (proxyConfig) {
        if (proxyOpts.sort) {
          ons['sort-change'] = this.sortChangeEvent;
        }

        if (proxyOpts.filter) {
          ons['filter-change'] = this.filterChangeEvent;
        }
      }

      if (toolbar) {
        ons['update:customs'] = this.updateCustomsEent;
      }

      return ons;
    },
    toolbarProps: function toolbarProps() {
      return Object.assign({
        loading: this.loading || this.tableLoading
      }, this.toolbarOpts);
    },
    pagerProps: function pagerProps() {
      return Object.assign({
        size: this.vSize,
        loading: this.loading || this.tableLoading
      }, this.pagerConfig, this.proxyConfig ? this.tablePage : {});
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
        data = this.data,
        proxyConfig = this.proxyConfig,
        proxyOpts = this.proxyOpts,
        pagerConfig = this.pagerConfig;
    var props = proxyOpts.props;

    if (customs) {
      this.tableCustoms = customs;
    }

    if (pagerConfig && pagerConfig.pageSize) {
      this.tablePage.pageSize = pagerConfig.pageSize;
    }

    if (data && proxyConfig) {
      console.warn('[vxe-grid] There is a conflict between the props proxy-config and data.');
    } // （v3.0 中废弃 proxyConfig.props.data）


    if (props && props.data) {
      UtilTools.warn('vxe.error.delProp', ['proxy-config.props.data', 'proxy-config.props.result']);
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
    return h('div', {
      class: this.renderClass,
      style: this.renderStyle
    }, [
    /**
     * 渲染工具栏
     */
    this.toolbar ? h('vxe-toolbar', {
      ref: 'toolbar',
      props: this.toolbarProps,
      scopedSlots: this.toolbarSlots
    }) : null,
    /**
     * 渲染表格
     */
    h('vxe-table', {
      props: this.tableProps,
      on: this.tableOns,
      scopedSlots: this.$scopedSlots,
      ref: 'xTable'
    }, this.$slots.default),
    /**
     * 渲染分页
     */
    this.pagerConfig ? h('vxe-pager', {
      props: this.pagerProps,
      on: {
        'page-change': this.pageChangeEvent
      },
      ref: 'pager'
    }) : null]);
  },
  methods: _objectSpread({}, grid_methods, {
    getParentHeight: function getParentHeight() {
      return (this.maximize ? DomTools.getDomNode().visibleHeight : this.$el.parentNode.clientHeight) - this.getExcludeHeight();
    },

    /**
     * 获取需要排除的高度
     */
    getExcludeHeight: function getExcludeHeight() {
      var _this$$refs = this.$refs,
          toolbar = _this$$refs.toolbar,
          pager = _this$$refs.pager;
      return (toolbar && toolbar.$el ? toolbar.$el.offsetHeight : 0) + (pager && pager.$el ? pager.$el.offsetHeight : 0);
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

    /**
     * 提交指令，支持 code 或 button
     * @param {String/Object} code 字符串或对象
     */
    commitProxy: function commitProxy(code) {
      var _this2 = this;

      var toolbar = this.toolbar,
          toolbarOpts = this.toolbarOpts,
          proxyOpts = this.proxyOpts,
          tablePage = this.tablePage,
          pagerConfig = this.pagerConfig,
          sortData = this.sortData,
          filterData = this.filterData,
          isMsg = this.isMsg;
      var _proxyOpts$ajax = proxyOpts.ajax,
          ajax = _proxyOpts$ajax === void 0 ? {} : _proxyOpts$ajax,
          _proxyOpts$props = proxyOpts.props,
          props = _proxyOpts$props === void 0 ? {} : _proxyOpts$props;
      var args = xe_utils_amd_xe_utils_default.a.slice(arguments, 1);
      var button;

      if (xe_utils_amd_xe_utils_default.a.isString(code)) {
        var matchObj = toolbar ? xe_utils_amd_xe_utils_default.a.findTree(toolbarOpts.buttons, function (item) {
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

      switch (code) {
        case 'insert':
          this.insert();
          break;

        case 'insert_actived':
          this.insert().then(function (_ref2) {
            var row = _ref2.row;
            return _this2.setActiveRow(row);
          });
          break;

        case 'mark_cancel':
          this.triggerPendingEvent(code);
          break;

        case 'delete_selection':
          this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', function () {
            return _this2.commitProxy.apply(_this2, ['delete'].concat(args));
          });
          break;

        case 'remove_selection':
          this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', function () {
            return _this2.removeSelecteds();
          });
          break;

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
          this.resetAll();
          break;

        case 'reload':
        case 'query':
          {
            if (ajax.query) {
              var params = {
                $grid: this,
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

                this.sortData = params.sort = {};
                this.filterData = params.filters = [];
                this.pendingRecords = [];
                this.clearAll();
              }

              return ajax.query.apply(this, [params].concat(args)).then(function (rest) {
                if (rest) {
                  if (pagerConfig) {
                    tablePage.total = xe_utils_amd_xe_utils_default.a.get(rest, props.total || 'page.total') || 0;
                    _this2.tableData = xe_utils_amd_xe_utils_default.a.get(rest, props.result || props.data || 'result') || [];
                  } else {
                    _this2.tableData = (props.list ? xe_utils_amd_xe_utils_default.a.get(rest, props.list) : rest) || [];
                  }
                } else {
                  _this2.tableData = [];
                }

                _this2.tableLoading = false;
              }).catch(function (e) {
                _this2.tableLoading = false;
              });
            } else {
              UtilTools.error('vxe.error.notFunc', [code]);
            }

            break;
          }

        case 'delete':
          {
            if (ajax.delete) {
              var selectRecords = this.getSelectRecords();
              this.remove(selectRecords).then(function () {
                var removeRecords = _this2.getRemoveRecords();

                var body = {
                  removeRecords: removeRecords
                };

                if (removeRecords.length) {
                  _this2.tableLoading = true;
                  return ajax.delete.apply(_this2, [{
                    $grid: _this2,
                    body: body
                  }].concat(args)).then(function (result) {
                    _this2.tableLoading = false;
                  }).catch(function (e) {
                    _this2.tableLoading = false;
                  }).then(function () {
                    return _this2.commitProxy('reload');
                  });
                } else {
                  if (isMsg && !selectRecords.length) {
                    _this2.$XModal.message({
                      id: code,
                      message: conf.i18n('vxe.grid.selectOneRecord'),
                      status: 'warning'
                    });
                  }
                }
              });
            } else {
              UtilTools.error('vxe.error.notFunc', [code]);
            }

            break;
          }

        case 'save':
          {
            if (ajax.save) {
              var body = Object.assign({
                pendingRecords: this.pendingRecords
              }, this.getRecordset());
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
                _this2.validate(body.insertRecords.concat(updateRecords), function (vaild) {
                  if (vaild) {
                    if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                      _this2.tableLoading = true;
                      resolve(ajax.save.apply(_this2, [{
                        $grid: _this2,
                        body: body
                      }].concat(args)).then(function () {
                        _this2.$XModal.message({
                          id: code,
                          message: conf.i18n('vxe.grid.saveSuccess'),
                          status: 'success'
                        });

                        _this2.tableLoading = false;
                      }).catch(function (e) {
                        _this2.tableLoading = false;
                      }).then(function () {
                        return _this2.commitProxy('reload');
                      }));
                    } else {
                      if (isMsg) {
                        // 直接移除未保存且标记为删除的数据
                        if (pendingRecords.length) {
                          _this2.remove(pendingRecords);
                        } else {
                          _this2.$XModal.message({
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
            } else {
              UtilTools.error('vxe.error.notFunc', [code]);
            }

            break;
          }

        default:
          var btnMethod = Buttons.get(code);

          if (btnMethod) {
            btnMethod.apply(this, [{
              code: code,
              button: button,
              $grid: this,
              $table: this.$refs.xTable
            }].concat(args));
          }

      }

      return this.$nextTick();
    },
    handleDeleteRow: function handleDeleteRow(code, alertKey, callback) {
      var selectRecords = this.getSelectRecords();

      if (this.isMsg) {
        if (selectRecords.length) {
          this.$XModal.confirm(conf.i18n(alertKey)).then(function (type) {
            if (type === 'confirm') {
              callback();
            }
          });
        } else {
          this.$XModal.message({
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
    updateCustomsEent: function updateCustomsEent(value) {
      this.tableCustoms = value;
    },
    triggerToolbarBtnEvent: function triggerToolbarBtnEvent(button, evnt) {
      this.commitProxy(button, evnt);
      UtilTools.emitEvent(this, 'toolbar-button-click', [{
        code: button.code,
        button: button,
        $grid: this
      }, evnt]);
    },
    triggerPendingEvent: function triggerPendingEvent(code) {
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
          this.$XModal.message({
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

      if (params.type === 'current-change') {
        UtilTools.emitEvent(this, 'current-page-change', [currentPage]);
      } else {
        UtilTools.emitEvent(this, 'page-size-change', [pageSize]);
      }

      UtilTools.emitEvent(this, 'page-change', [Object.assign({
        $grid: this
      }, params)]);

      if (proxyConfig) {
        this.commitProxy('query');
      }
    },
    sortChangeEvent: function sortChangeEvent(params) {
      var proxyConfig = this.proxyConfig,
          remoteSort = this.remoteSort;
      var $table = params.$table,
          column = params.column;
      var isRemote = xe_utils_amd_xe_utils_default.a.isBoolean(column.remoteSort) ? column.remoteSort : $table.sortOpts.remote || remoteSort; // 如果是服务端排序

      if (isRemote) {
        this.sortData = params;

        if (proxyConfig) {
          this.commitProxy('query');
        }
      }

      UtilTools.emitEvent(this, 'sort-change', [Object.assign({
        $grid: this
      }, params)]);
    },
    filterChangeEvent: function filterChangeEvent(params) {
      var remoteFilter = this.remoteFilter;
      var $table = params.$table,
          filters = params.filters; // 如果是服务端过滤

      if ($table.filterOpts.remote || remoteFilter) {
        this.filterData = filters;
        this.commitProxy('query');
      }

      UtilTools.emitEvent(this, 'filter-change', [Object.assign({
        $grid: this
      }, params)]);
    },
    zoom: function zoom() {
      var _this3 = this;

      this.maximize = !this.maximize;

      if (this.maximize) {
        if (this.tZindex < UtilTools.getLastZIndex()) {
          this.tZindex = UtilTools.nextZIndex();
        }
      }

      return this.$nextTick().then(function () {
        return _this3.recalculate(true);
      }).then(function () {
        return _this3.maximize;
      });
    },
    isMaximized: function isMaximized() {
      return this.maximize;
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
        class: 'vxe-ctxmenu--option-wrapper',
        key: gIndex
      }, options.map(function (item, index) {
        var hasChildMenus = item.children && item.children.length;
        return item.visible === false ? _e() : h('li', {
          class: {
            'link--disabled': item.disabled,
            'link--active': item === ctxMenuStore.selected
          },
          key: "".concat(gIndex, "_").concat(index)
        }, [h('a', {
          class: 'vxe-ctxmenu--link',
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
          class: 'vxe-ctxmenu--link-content'
        }, UtilTools.getFuncText(item.name)), h('i', {
          class: ['vxe-ctxmenu--link-suffix', hasChildMenus ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
        })]), hasChildMenus ? h('ul', {
          class: ['vxe-table--ctxmenu-clild-wrapper', {
            show: item === ctxMenuStore.selected && ctxMenuStore.showChild
          }]
        }, item.children.map(function (child, cIndex) {
          return child.visible === false ? _e() : h('li', {
            class: {
              'link--disabled': child.disabled,
              'link--active': child === ctxMenuStore.selectChild
            },
            key: "".concat(gIndex, "_").concat(index, "_").concat(cIndex)
          }, [h('a', {
            class: 'vxe-ctxmenu--link',
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
            class: 'vxe-ctxmenu--link-content'
          }, UtilTools.getFuncText(child.name))])]);
        })) : _e()]);
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
      var selectIndex = xe_utils_amd_xe_utils_default.a.findIndexOf(menuList, function (item) {
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
      var isCtxMenu = this.isCtxMenu,
          ctxMenuStore = this.ctxMenuStore,
          ctxMenuOpts = this.ctxMenuOpts;
      var layoutList = ['header', 'body', 'footer'];

      if (isCtxMenu) {
        if (ctxMenuStore.visible) {
          if (ctxMenuStore.visible && this.$refs.ctxWrapper && DomTools.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
            evnt.preventDefault();
            return;
          }
        }

        for (var index = 0; index < layoutList.length; index++) {
          var layout = layoutList[index];
          var columnTargetNode = DomTools.getEventTargetNode(evnt, this.$el, "vxe-".concat(layout, "--column"));
          var params = {
            type: layout,
            $table: this,
            columns: this.visibleColumn.slice(0)
          };

          if (columnTargetNode.flag) {
            var cell = columnTargetNode.targetElem;
            var column = this.getColumnNode(cell).item;
            var typePrefix = "".concat(layout, "-");
            Object.assign(params, {
              column: column,
              columnIndex: this.getColumnIndex(column),
              cell: cell
            });

            if (layout === 'body') {
              var row = this.getRowNode(cell.parentNode).item;
              typePrefix = '';
              params.row = row;
              params.rowIndex = this.getRowIndex(row);
            }

            this.openContextMenu(evnt, layout, params);
            UtilTools.emitEvent(this, "".concat(typePrefix, "cell-context-menu"), [params, evnt]);
            return;
          } else if (DomTools.getEventTargetNode(evnt, this.$el, "vxe-table--".concat(layout, "-wrapper")).flag) {
            if (ctxMenuOpts.trigger === 'cell') {
              evnt.preventDefault();
            } else {
              this.openContextMenu(evnt, layout, params);
            }

            return;
          }
        }
      }

      this.closeMenu();
      this.closeFilter();
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
          this.preventEvent(evnt, 'event.show_menu', params, null, function () {
            if (!visibleMethod || visibleMethod(params, evnt)) {
              evnt.preventDefault();

              _this.updateZindex();

              var _DomTools$getDomNode = DomTools.getDomNode(),
                  scrollTop = _DomTools$getDomNode.scrollTop,
                  scrollLeft = _DomTools$getDomNode.scrollLeft,
                  visibleHeight = _DomTools$getDomNode.visibleHeight,
                  visibleWidth = _DomTools$getDomNode.visibleWidth;

              var top = evnt.clientY + scrollTop;
              var left = evnt.clientX + scrollLeft;
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
              _this.closeMenu();
            }
          });
        }
      }

      this.closeFilter();
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
        var ctxMenuMethod = Menus.get(menu.code);
        var params = Object.assign({
          menu: menu,
          $table: this
        }, this.ctxMenuStore.args);

        if (ctxMenuMethod) {
          ctxMenuMethod.call(this, params, evnt);
        }

        UtilTools.emitEvent(this, 'context-menu-click', [params, evnt]);
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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__("07ac");

// CONCATENATED MODULE: ./packages/toolbar/src/toolbar.js














/* harmony default export */ var src_toolbar = ({
  name: 'VxeToolbar',
  props: {
    id: String,
    loading: false,
    resizable: [Boolean, Object],
    refresh: [Boolean, Object],
    import: [Boolean, Object],
    export: [Boolean, Object],
    zoom: [Boolean, Object],
    setting: [Boolean, Object],
    custom: [Boolean, Object],
    buttons: {
      type: Array,
      default: function _default() {
        return conf.toolbar.buttons;
      }
    },
    size: String
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data: function data() {
    return {
      $table: null,
      isRefresh: false,
      tableFullColumn: [],
      importStore: {
        file: null,
        type: '',
        filename: '',
        visible: false
      },
      importParams: {
        mode: '',
        types: null,
        message: true
      },
      exportStore: {
        name: '',
        mode: '',
        columns: [],
        selectRecords: [],
        hasFooter: false,
        forceOriginal: false,
        visible: false,
        isTree: false
      },
      exportParams: {
        filename: '',
        sheetName: '',
        type: '',
        types: [],
        original: false,
        message: true,
        isHeader: false,
        isFooter: false
      },
      customStore: {
        visible: false
      }
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    refreshOpts: function refreshOpts() {
      return Object.assign({}, conf.toolbar.refresh, this.refresh);
    },
    importOpts: function importOpts() {
      return Object.assign({}, conf.toolbar.import, this.import);
    },
    exportOpts: function exportOpts() {
      return Object.assign({}, conf.toolbar.export, this.export);
    },
    resizableOpts: function resizableOpts() {
      return Object.assign({
        storageKey: 'VXE_TABLE_CUSTOM_COLUMN_WIDTH'
      }, conf.toolbar.resizable, this.resizable);
    },
    zoomOpts: function zoomOpts() {
      return Object.assign({}, conf.toolbar.zoom, this.zoom);
    },
    customOpts: function customOpts() {
      return Object.assign({
        storageKey: 'VXE_TABLE_CUSTOM_COLUMN_HIDDEN'
      }, conf.toolbar.custom || conf.toolbar.setting, this.custom || this.setting);
    }
  },
  created: function created() {
    var _this = this;

    var customOpts = this.customOpts,
        setting = this.setting,
        id = this.id;

    if (customOpts.storage && !id) {
      return UtilTools.error('vxe.error.toolbarId');
    }

    if (setting) {
      UtilTools.warn('vxe.error.delProp', ['setting', 'custom']);
    }

    if (!v_x_e_table._export && (this.export || this.import)) {
      UtilTools.error('vxe.error.reqModule', ['Export']);
    }

    this.$nextTick(function () {
      _this.updateConf();

      _this.loadStorage();
    });
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'keydown');
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref,
        _this2 = this;

    var _e = this._e,
        $scopedSlots = this.$scopedSlots,
        $grid = this.$grid,
        $table = this.$table,
        loading = this.loading,
        customStore = this.customStore,
        importOpts = this.importOpts,
        exportOpts = this.exportOpts,
        refresh = this.refresh,
        refreshOpts = this.refreshOpts,
        zoom = this.zoom,
        zoomOpts = this.zoomOpts,
        custom = this.custom,
        setting = this.setting,
        customOpts = this.customOpts,
        _this$buttons = this.buttons,
        buttons = _this$buttons === void 0 ? [] : _this$buttons,
        vSize = this.vSize,
        tableFullColumn = this.tableFullColumn,
        importStore = this.importStore,
        importParams = this.importParams,
        exportStore = this.exportStore,
        exportParams = this.exportParams;
    var customBtnOns = {};
    var customWrapperOns = {};
    var $buttons = $scopedSlots.buttons;
    var $tools = $scopedSlots.tools;

    if (custom || setting) {
      if (customOpts.trigger === 'manual') {// 手动触发
      } else if (customOpts.trigger === 'hover') {
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
      class: ['vxe-toolbar', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--loading', loading), _ref)]
    }, [h('div', {
      class: 'vxe-button--wrapper'
    }, $buttons ? $buttons.call(this, {
      $grid: $grid,
      $table: $table
    }, h) : buttons.map(function (item) {
      return item.visible === false ? _e() : h('vxe-button', {
        on: {
          click: function click(evnt) {
            return _this2.btnEvent(evnt, item);
          }
        },
        props: {
          icon: item.icon,
          disabled: item.disabled
        },
        scopedSlots: item.dropdowns && item.dropdowns.length ? {
          default: function _default() {
            return UtilTools.getFuncText(item.name);
          },
          dropdowns: function dropdowns() {
            return item.dropdowns.map(function (child) {
              return child.visible === false ? _e() : h('vxe-button', {
                on: {
                  click: function click(evnt) {
                    return _this2.btnEvent(evnt, child);
                  }
                },
                props: {
                  icon: child.icon,
                  disabled: child.disabled
                }
              }, UtilTools.getFuncText(child.name));
            });
          }
        } : null
      }, UtilTools.getFuncText(item.name));
    })), $tools ? h('div', {
      class: 'vxe-tools--wrapper'
    }, $tools.call(this, {
      $grid: $grid,
      $table: $table
    }, h)) : null, h('div', {
      class: 'vxe-tools--operate'
    }, [this.import ? h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: conf.i18n('vxe.toolbar.import')
      },
      on: {
        click: this.importEvent
      }
    }, [h('i', {
      class: importOpts.icon || conf.icon.import
    })]) : null, this.export ? h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: conf.i18n('vxe.toolbar.export')
      },
      on: {
        click: this.exportEvent
      }
    }, [h('i', {
      class: exportOpts.icon || conf.icon.export
    })]) : null, refresh ? h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: conf.i18n('vxe.toolbar.refresh')
      },
      on: {
        click: this.refreshEvent
      }
    }, [h('i', {
      class: this.isRefresh ? refreshOpts.iconLoading || conf.icon.refreshLoading : refreshOpts.icon || conf.icon.refresh
    })]) : null, zoom && $grid ? h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: conf.i18n("vxe.toolbar.zoom".concat($grid.isMaximized() ? 'Out' : 'In'))
      },
      on: {
        click: function click() {
          return $grid.zoom();
        }
      }
    }, [h('i', {
      class: $grid.isMaximized() ? zoomOpts.iconOut || conf.icon.zoomOut : zoomOpts.iconIn || conf.icon.zoomIn
    })]) : null, custom || setting ? h('div', {
      class: ['vxe-custom--wrapper', {
        'is--active': customStore.visible
      }],
      ref: 'customWrapper'
    }, [h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: conf.i18n('vxe.toolbar.custom')
      },
      on: customBtnOns
    }, [h('i', {
      class: customOpts.icon || conf.icon.custom
    })]), h('div', {
      class: 'vxe-custom--option-wrapper'
    }, [h('ul', {
      class: 'vxe-custom--option',
      on: customWrapperOns
    }, tableFullColumn.map(function (column) {
      var headerTitle = column.getTitle();
      var isDisabled = customOpts.checkMethod ? !customOpts.checkMethod({
        column: column
      }) : false;
      return headerTitle ? h('li', {
        class: {
          'is--active': column.visible,
          'is--disabled': isDisabled
        },
        attrs: {
          title: headerTitle
        },
        on: {
          click: function click() {
            if (!isDisabled) {
              column.visible = !column.visible;

              if ((custom || setting) && customOpts.immediate) {
                _this2.handleCustoms();
              }
            }
          }
        }
      }, headerTitle) : null;
    })), customOpts.isFooter === false ? null : h('div', {
      class: 'vxe-custom--footer'
    }, [h('button', {
      class: 'btn--confirm',
      on: {
        click: this.confirmCustomEvent
      }
    }, conf.i18n('vxe.toolbar.customConfirm')), h('button', {
      class: 'btn--reset',
      on: {
        click: this.resetCustomEvent
      }
    }, conf.i18n('vxe.toolbar.customReset'))])])]) : null]), v_x_e_table._export ? h('vxe-import-panel', {
      props: {
        defaultOptions: importParams,
        storeData: importStore
      },
      on: {
        import: this.confirmImportEvent
      }
    }) : _e(), v_x_e_table._export ? h('vxe-export-panel', {
      props: {
        defaultOptions: exportParams,
        storeData: exportStore
      },
      on: {
        print: this.confirmPrintEvent,
        export: this.confirmExportEvent
      }
    }) : _e()]);
  },
  methods: {
    updateConf: function updateConf() {
      var $children = this.$parent.$children;
      var selfIndex = $children.indexOf(this);
      this.$table = xe_utils_amd_xe_utils_default.a.find($children, function (comp, index) {
        return comp && comp.refreshColumn && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table';
      });
    },
    openSetting: function openSetting() {
      this.customStore.visible = true;
    },
    closeCustom: function closeCustom() {
      var custom = this.custom,
          setting = this.setting,
          customStore = this.customStore;

      if (customStore.visible) {
        customStore.visible = false;

        if ((custom || setting) && !customStore.immediate) {
          this.handleCustoms();
        }
      }
    },
    loadStorage: function loadStorage() {
      var $grid = this.$grid,
          $table = this.$table,
          id = this.id,
          refresh = this.refresh,
          resizable = this.resizable,
          custom = this.custom,
          setting = this.setting,
          refreshOpts = this.refreshOpts,
          resizableOpts = this.resizableOpts,
          customOpts = this.customOpts;

      if (refresh && !$grid) {
        if (!refreshOpts.query) {
          UtilTools.warn('vxe.error.notFunc', ['query']);
        }
      }

      if ($grid || $table) {
        ($grid || $table).connect({
          toolbar: this
        });
      } else {
        if (resizable || custom || setting) {
          throw new Error(UtilTools.getLog('vxe.error.barUnableLink'));
        }
      }

      if (resizable || custom || setting) {
        var customMap = {};

        if (resizableOpts.storage) {
          var columnWidthStorage = this.getStorageMap(resizableOpts.storageKey)[id];

          if (columnWidthStorage) {
            xe_utils_amd_xe_utils_default.a.each(columnWidthStorage, function (resizeWidth, field) {
              customMap[field] = {
                field: field,
                resizeWidth: resizeWidth
              };
            });
          }
        }

        if (customOpts.storage) {
          var columnHideStorage = this.getStorageMap(customOpts.storageKey)[id];

          if (columnHideStorage) {
            columnHideStorage.split(',').forEach(function (field) {
              if (customMap[field]) {
                customMap[field].visible = false;
              } else {
                customMap[field] = {
                  field: field,
                  visible: false
                };
              }
            });
          }
        }

        var customList = Object.values(customMap);
        this.updateCustoms(customList.length ? customList : this.tableFullColumn);
      }
    },
    updateColumn: function updateColumn(fullColumn) {
      this.tableFullColumn = fullColumn;
    },
    updateCustoms: function updateCustoms(customs) {
      var _this3 = this;

      var comp = this.$grid || this.$table;

      if (comp) {
        comp.reloadCustoms(customs).then(function (fullColumn) {
          _this3.tableFullColumn = fullColumn;
        });
      }
    },
    getStorageMap: function getStorageMap(key) {
      var version = conf.version;
      var rest = xe_utils_amd_xe_utils_default.a.toStringJSON(localStorage.getItem(key));
      return rest && rest._v === version ? rest : {
        _v: version
      };
    },
    saveColumnHide: function saveColumnHide() {
      var id = this.id,
          tableFullColumn = this.tableFullColumn,
          customOpts = this.customOpts;

      if (customOpts.storage) {
        var columnHideStorageMap = this.getStorageMap(customOpts.storageKey);
        var colHides = tableFullColumn.filter(function (column) {
          return column.property && !column.visible;
        });
        columnHideStorageMap[id] = colHides.length ? colHides.map(function (column) {
          return column.property;
        }).join(',') : undefined;
        localStorage.setItem(customOpts.storageKey, xe_utils_amd_xe_utils_default.a.toJSONString(columnHideStorageMap));
      }

      return this.$nextTick();
    },
    saveColumnWidth: function saveColumnWidth(isReset) {
      var id = this.id,
          tableFullColumn = this.tableFullColumn,
          resizableOpts = this.resizableOpts;

      if (resizableOpts.storage) {
        var columnWidthStorageMap = this.getStorageMap(resizableOpts.storageKey);
        var columnWidthStorage;

        if (!isReset) {
          columnWidthStorage = xe_utils_amd_xe_utils_default.a.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {};
          tableFullColumn.forEach(function (_ref2) {
            var property = _ref2.property,
                resizeWidth = _ref2.resizeWidth,
                renderWidth = _ref2.renderWidth;

            if (property && resizeWidth) {
              columnWidthStorage[property] = renderWidth;
            }
          });
        }

        columnWidthStorageMap[id] = xe_utils_amd_xe_utils_default.a.isEmpty(columnWidthStorage) ? undefined : columnWidthStorage;
        localStorage.setItem(resizableOpts.storageKey, xe_utils_amd_xe_utils_default.a.toJSONString(columnWidthStorageMap));
      }

      return this.$nextTick();
    },
    hideColumn: function hideColumn(column) {
      UtilTools.warn('vxe.error.delFunc', ['hideColumn', 'table.hideColumn']);
      column.visible = false;
      return this.handleCustoms();
    },
    showColumn: function showColumn(column) {
      UtilTools.warn('vxe.error.delFunc', ['showColumn', 'table.showColumn']);
      column.visible = true;
      return this.handleCustoms();
    },
    resetCustoms: function resetCustoms() {
      return this.handleCustoms();
    },
    resetResizable: function resetResizable() {
      this.updateResizable(this);
    },
    confirmCustomEvent: function confirmCustomEvent() {
      this.closeCustom();
    },
    resetCustomEvent: function resetCustomEvent() {
      this.tableFullColumn.forEach(function (column) {
        column.visible = true;
        column.resizeWidth = 0;
      });
      this.resetCustoms();
      this.resetResizable();
      this.closeCustom();
    },
    updateResizable: function updateResizable(isReset) {
      var comp = this.$grid || this.$table;
      this.saveColumnWidth(isReset);
      comp.analyColumnWidth();
      return comp.recalculate(true);
    },
    handleCustoms: function handleCustoms() {
      (this.$grid || this.$table).refreshColumn();
      return this.saveColumnHide();
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var isEsc = evnt.keyCode === 27;

      if (isEsc && this.$grid && this.$grid.isMaximized() && this.zoomOpts && this.zoomOpts.escRestore !== false) {
        this.$grid.zoom();
      }
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      if (!DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.closeCustom();
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      this.closeCustom();
    },
    handleClickSettingEvent: function handleClickSettingEvent(evnt) {
      this.customStore.visible = !this.customStore.visible;
    },
    handleMouseenterSettingEvent: function handleMouseenterSettingEvent(evnt) {
      this.customStore.activeBtn = true;
      this.openSetting();
    },
    handleMouseleaveSettingEvent: function handleMouseleaveSettingEvent(evnt) {
      var _this4 = this;

      var customStore = this.customStore;
      customStore.activeBtn = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this4.closeCustom();
        }
      }, 300);
    },
    handleWrapperMouseenterEvent: function handleWrapperMouseenterEvent(evnt) {
      this.customStore.activeWrapper = true;
      this.openSetting();
    },
    handleWrapperMouseleaveEvent: function handleWrapperMouseleaveEvent(evnt) {
      var _this5 = this;

      var customStore = this.customStore;
      customStore.activeWrapper = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this5.closeCustom();
        }
      }, 300);
    },
    refreshEvent: function refreshEvent() {
      var _this6 = this;

      var $grid = this.$grid,
          refreshOpts = this.refreshOpts,
          isRefresh = this.isRefresh;

      if (!isRefresh) {
        if (refreshOpts.query) {
          this.isRefresh = true;
          refreshOpts.query().catch(function (e) {
            return e;
          }).then(function () {
            _this6.isRefresh = false;
          });
        } else if ($grid) {
          this.isRefresh = true;
          $grid.commitProxy('reload').catch(function (e) {
            return e;
          }).then(function () {
            _this6.isRefresh = false;
          });
        }
      }
    },
    btnEvent: function btnEvent(evnt, item) {
      var $grid = this.$grid,
          $table = this.$table;
      var code = item.code;

      if (code) {
        if ($grid) {
          $grid.triggerToolbarBtnEvent(item, evnt);
        } else {
          var btnMethod = Buttons.get(code);
          var params = {
            code: code,
            button: item,
            $grid: $grid,
            $table: $table
          };

          if (btnMethod) {
            btnMethod.call(this, params, evnt);
          }

          UtilTools.emitEvent(this, 'button-click', [params, evnt]);
        }
      }
    },
    importEvent: function importEvent() {
      if (this.$grid || this.$table) {
        this.openImport();
      } else {
        throw new Error(UtilTools.getLog('vxe.error.barUnableLink'));
      }
    },
    openImport: function openImport(options) {
      var comp = this.$grid || this.$table;
      var defOpts = Object.assign({
        mode: 'covering',
        message: true
      }, options, this.importOpts);
      var isTree = !!comp.getTreeStatus();

      if (isTree) {
        if (defOpts.message) {
          this.$XModal.message({
            message: conf.i18n('vxe.error.treeNotImp'),
            status: 'error'
          });
        }

        return;
      }

      Object.assign(this.importStore, {
        file: null,
        type: '',
        filename: '',
        visible: true
      });
      Object.assign(this.importParams, defOpts);
    },
    confirmImportEvent: function confirmImportEvent(options) {
      var comp = this.$grid || this.$table;
      comp.importByFile(this.importStore.file, options);
    },
    exportEvent: function exportEvent() {
      if (this.$grid || this.$table) {
        this.openExport();
      } else {
        throw new Error(UtilTools.getLog('vxe.error.barUnableLink'));
      }
    },
    openExport: function openExport(options) {
      var customOpts = this.customOpts;
      var comp = this.$grid || this.$table;

      var _comp$getTableColumn = comp.getTableColumn(),
          fullColumn = _comp$getTableColumn.fullColumn;

      var _comp$getTableData = comp.getTableData(),
          footerData = _comp$getTableData.footerData;

      var selectRecords = comp.getSelectRecords();
      var virtualScroller = comp.getVirtualScroller(); // v3.0 废弃 type=index

      var exportColumns = fullColumn.filter(function (column) {
        return ['seq', 'index'].indexOf(column.type) > -1 || column.property;
      });
      var treeStatus = comp.getTreeStatus();
      var isTree = !!treeStatus;
      var forceOriginal = isTree || virtualScroller.scrollX || virtualScroller.scrollY;
      var hasFooter = !!footerData.length;
      var defOpts = Object.assign({
        message: true
      }, this.exportOpts, options);
      var types = defOpts.types || v_x_e_table.exportTypes; // 处理类型

      defOpts.types = types.map(function (value) {
        return {
          value: value,
          label: "vxe.types.".concat(value)
        };
      }); // 默认全部选中

      exportColumns.forEach(function (column) {
        column.checked = column.visible;
        column.disabled = customOpts.checkMethod ? !customOpts.checkMethod({
          column: column
        }) : false;
      }); // 更新条件

      Object.assign(this.exportStore, {
        columns: exportColumns,
        selectRecords: selectRecords,
        mode: selectRecords.length ? 'selected' : 'all',
        forceOriginal: !!treeStatus || virtualScroller.scrollX || virtualScroller.scrollY,
        hasFooter: hasFooter,
        visible: true,
        isTree: isTree
      }); // 重置参数

      Object.assign(this.exportParams, {
        filename: defOpts.filename || '',
        sheetName: defOpts.sheetName || '',
        type: defOpts.type || defOpts.types[0].value,
        types: defOpts.types,
        original: forceOriginal || defOpts.original,
        message: defOpts.message,
        isHeader: true,
        isFooter: hasFooter
      });
      return this.$nextTick();
    },
    confirmPrintEvent: function confirmPrintEvent(options) {
      (this.$grid || this.$table).print(options);
    },
    confirmExportEvent: function confirmExportEvent(options) {
      (this.$grid || this.$table).exportData(options);
    }
  }
});
// CONCATENATED MODULE: ./packages/toolbar/index.js



src_toolbar.install = function (Vue) {
  Vue.component(src_toolbar.name, src_toolbar);
};

var Toolbar = src_toolbar;
/* harmony default export */ var packages_toolbar = (src_toolbar);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

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
    // 默认的样式
    perfect: {
      type: Boolean,
      default: function _default() {
        return conf.pager.perfect;
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
    $grid: {
      default: null
    }
  },
  data: function data() {
    return {
      showSizes: false,
      panelStyle: null,
      panelIndex: 0
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
    this.panelIndex = UtilTools.nextZIndex();
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
  },
  destroyed: function destroyed() {
    GlobalEvent.off(this, 'mousedown');
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var vSize = this.vSize,
        align = this.align;
    return h('div', {
      class: ['vxe-pager', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "align--".concat(align), align), _defineProperty(_ref, 'p--border', this.border), _defineProperty(_ref, 'p--background', this.background), _defineProperty(_ref, 'p--perfect', this.perfect), _defineProperty(_ref, 'is--loading', this.loading), _ref)]
    }, [h('div', {
      class: 'vxe-pager--wrapper'
    }, this.layouts.map(function (name) {
      return _this["render".concat(name)](h);
    }))]);
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
        class: ['vxe-pager--btn-icon', this.iconPrevPage || conf.icon.prevPage]
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
        class: ['vxe-pager--jump-more', this.iconJumpMore || conf.icon.jumpMore]
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', this.iconJumpPrev || conf.icon.jumpPrev]
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
        class: ['vxe-pager--jump-more', this.iconJumpMore || conf.icon.jumpMore]
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', this.iconJumpNext || conf.icon.jumpNext]
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
        class: ['vxe-pager--btn-icon', this.iconNextPage || conf.icon.nextPage]
      })]);
    },
    // sizes
    renderSizes: function renderSizes(h) {
      var _this2 = this;

      return h('span', {
        class: ['vxe-pager--sizes', {
          'is--active': this.showSizes
        }],
        ref: 'sizeBtn'
      }, [h('span', {
        class: 'size--content',
        on: {
          click: this.toggleSizePanel
        }
      }, [h('span', "".concat(this.pageSize).concat(conf.i18n('vxe.pager.pagesize'))), h('i', {
        class: "vxe-pager--sizes-arrow ".concat(conf.icon.caretBottom)
      })]), h('div', {
        class: 'vxe-pager-size--select-wrapper',
        style: this.panelStyle,
        ref: 'sizePanel'
      }, [h('ul', {
        class: 'vxe-pager-size--select'
      }, this.pageSizes.map(function (num) {
        return h('li', {
          class: ['size--option', {
            'is--active': num === _this2.pageSize
          }],
          on: {
            click: function click() {
              return _this2.changePageSize(num);
            }
          }
        }, "".concat(num).concat(conf.i18n('vxe.pager.pagesize')));
      }))])]);
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
          keydown: this.jumpKeydownEvent
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
      }, '/'), h('span', this.pageCount)]);
    },
    // total
    renderTotal: function renderTotal(h) {
      return h('span', {
        class: 'vxe-pager--total'
      }, xe_utils_amd_xe_utils_default.a.template(conf.i18n('vxe.pager.total'), {
        total: this.total
      }));
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
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs;

      if (this.showSizes && !(DomTools.getEventTargetNode(evnt, $refs.sizeBtn).flag || DomTools.getEventTargetNode(evnt, $refs.sizePanel).flag)) {
        this.hideSizePanel();
      }
    },
    prevPage: function prevPage() {
      var currentPage = this.currentPage;

      if (currentPage > 1) {
        this.jumpPage(Math.max(currentPage - 1, 1));
      }
    },
    nextPage: function nextPage() {
      var currentPage = this.currentPage,
          pageCount = this.pageCount;

      if (currentPage < pageCount) {
        this.jumpPage(Math.min(currentPage + 1, pageCount));
      }
    },
    prevJump: function prevJump() {
      this.jumpPage(Math.max(this.currentPage - this.numList.length, 1));
    },
    nextJump: function nextJump() {
      this.jumpPage(Math.min(this.currentPage + this.numList.length, this.pageCount));
    },
    jumpPage: function jumpPage(currentPage) {
      var type = 'current-change';

      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage);
        UtilTools.emitEvent(this, type, [currentPage]);
        this.emitPageChange(type, this.pageSize, currentPage);
      }
    },
    changePageSize: function changePageSize(pageSize) {
      var type = 'size-change';

      if (pageSize !== this.pageSize) {
        this.$emit('update:pageSize', pageSize);
        UtilTools.emitEvent(this, type, [pageSize]);
        this.emitPageChange(type, pageSize, Math.min(this.currentPage, this.getPageCount(this.total, pageSize)));
      }

      this.hideSizePanel();
    },
    jumpKeydownEvent: function jumpKeydownEvent(evnt) {
      if (evnt.keyCode === 13) {
        var value = xe_utils_amd_xe_utils_default.a.toNumber(evnt.target.value);
        var current = value <= 0 ? 1 : value >= this.pageCount ? this.pageCount : value;
        evnt.target.value = current;
        this.jumpPage(current);
      } else if (evnt.keyCode === 38) {
        evnt.preventDefault();
        this.nextPage();
      } else if (evnt.keyCode === 40) {
        evnt.preventDefault();
        this.prevPage();
      }
    },
    emitPageChange: function emitPageChange(type, pageSize, currentPage) {
      UtilTools.emitEvent(this, 'page-change', [{
        type: type,
        pageSize: pageSize,
        currentPage: currentPage
      }]);
    },
    toggleSizePanel: function toggleSizePanel() {
      this[this.showSizes ? 'hideSizePanel' : 'showSizePanel']();
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex();
      }
    },
    showSizePanel: function showSizePanel() {
      var _this4 = this;

      this.showSizes = true;
      this.updateZindex();
      this.$nextTick(function () {
        var _this4$$refs = _this4.$refs,
            sizeBtn = _this4$$refs.sizeBtn,
            sizePanel = _this4$$refs.sizePanel;
        _this4.panelStyle = {
          zIndex: _this4.panelIndex,
          bottom: "".concat(sizeBtn.clientHeight + 6, "px"),
          left: "-".concat(sizePanel.clientWidth / 2 - sizeBtn.clientWidth / 2, "px")
        };
      });
    },
    hideSizePanel: function hideSizePanel() {
      this.showSizes = false;
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
    title: [String, Number],
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
        title = this.title,
        vSize = this.vSize,
        indeterminate = this.indeterminate,
        value = this.value;
    var attrs = {};

    if (title) {
      attrs.title = title;
    }

    return h('label', {
      class: ['vxe-checkbox', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--indeterminate', indeterminate), _defineProperty(_ref, 'is--disabled', disabled), _ref)],
      attrs: attrs
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
      class: 'vxe-checkbox--icon'
    }), this.$slots.default ? h('span', {
      class: 'vxe-checkbox--label'
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
    title: [String, Number],
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
        title = this.title,
        vSize = this.vSize,
        value = this.value,
        label = this.label,
        name = this.name;
    var attrs = {};

    if (title) {
      attrs.title = title;
    }

    return h('label', {
      class: ['vxe-radio', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', disabled), _ref)],
      attrs: attrs
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
      class: 'vxe-radio--icon'
    }), $slots.default ? h('span', {
      class: 'vxe-radio--label'
    }, $slots.default) : null]);
  }
});
// CONCATENATED MODULE: ./packages/radio/index.js



src_radio.install = function (Vue) {
  Vue.component(src_radio.name, src_radio);
};

var Radio = src_radio;
/* harmony default export */ var packages_radio = (src_radio);
// CONCATENATED MODULE: ./packages/input/src/create.js





/* harmony default export */ var create = (function (compName) {
  var isInput = compName === 'input';
  var getAttrs = isInput ? function (_ref) {
    var type = _ref.type,
        name = _ref.name,
        readonly = _ref.readonly,
        disabled = _ref.disabled,
        maxlength = _ref.maxlength,
        autocomplete = _ref.autocomplete;
    return {
      type: type,
      name: name,
      readonly: readonly,
      disabled: disabled,
      maxlength: maxlength,
      autocomplete: autocomplete
    };
  } : function (_ref2) {
    var name = _ref2.name,
        readonly = _ref2.readonly,
        disabled = _ref2.disabled,
        maxlength = _ref2.maxlength,
        autocomplete = _ref2.autocomplete,
        rows = _ref2.rows,
        form = _ref2.form;
    return {
      name: name,
      readonly: readonly,
      disabled: disabled,
      maxlength: maxlength,
      autocomplete: autocomplete,
      rows: rows,
      form: form
    };
  };
  return {
    name: xe_utils_amd_xe_utils_default.a.camelCase("Vxe-".concat(compName)),
    props: {
      value: [String, Number],
      name: String,
      type: {
        type: String,
        default: 'text'
      },
      autocomplete: String,
      readonly: Boolean,
      disabled: Boolean,
      placeholder: String,
      maxlength: [String, Number],
      rows: {
        type: [String, Number],
        default: 2
      },
      form: String,
      size: String
    },
    computed: {
      vSize: function vSize() {
        return this.size || this.$parent.size || this.$parent.vSize;
      }
    },
    render: function render(h) {
      var _ref3,
          _this = this;

      var $listeners = this.$listeners,
          value = this.value,
          vSize = this.vSize,
          placeholder = this.placeholder;
      var attrs = getAttrs(this);

      if (placeholder) {
        attrs.placeholder = UtilTools.getFuncText(placeholder);
      }

      return h('div', {
        class: ['vxe-input--wrapper', "type--".concat(compName), (_ref3 = {}, _defineProperty(_ref3, "size--".concat(vSize), vSize), _defineProperty(_ref3, 'is--disabled', this.disabled), _ref3)]
      }, [h(compName, {
        class: "vxe-".concat(compName),
        domProps: {
          value: value
        },
        attrs: attrs,
        on: xe_utils_amd_xe_utils_default.a.objectMap($listeners, function (cb, type) {
          return function (evnt) {
            var value = evnt.target.value;
            var params = type === 'input' ? value : {
              value: value
            };

            _this.$emit(type, params, evnt);
          };
        })
      })]);
    }
  };
});
// CONCATENATED MODULE: ./packages/input/src/input.js

/* harmony default export */ var input = (create('input'));
// CONCATENATED MODULE: ./packages/input/src/textarea.js

/* harmony default export */ var src_textarea = (create('textarea'));
// CONCATENATED MODULE: ./packages/input/index.js




input.install = function (Vue) {
  Vue.component(input.name, input);
  Vue.component(src_textarea.name, src_textarea);
};

var Input = input;
/* harmony default export */ var packages_input = (input);
// CONCATENATED MODULE: ./packages/button/src/button.js







/* harmony default export */ var src_button = ({
  name: 'VxeButton',
  props: {
    type: String,
    size: String,
    name: [String, Number],
    icon: String,
    disabled: Boolean,
    loading: Boolean
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    var _ref2,
        _this = this,
        _ref3;

    var $scopedSlots = this.$scopedSlots,
        $listeners = this.$listeners,
        type = this.type,
        vSize = this.vSize,
        name = this.name,
        disabled = this.disabled,
        loading = this.loading;
    var isText = type === 'text';
    return $scopedSlots.dropdowns ? h('div', {
      class: ['vxe-button--dropdown', _defineProperty({}, "size--".concat(vSize), vSize)]
    }, [h('button', {
      class: ['vxe-button', "type--".concat(isText ? type : 'button'), (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, "theme--".concat(type), type && !isText), _defineProperty(_ref2, 'is--disabled', disabled || loading), _defineProperty(_ref2, 'is--loading', loading), _ref2)],
      attrs: {
        name: name,
        disabled: disabled || loading
      },
      on: Object.assign({
        mouseenter: this.mouseenterEvent,
        mouseleave: this.mouseleaveEvent
      }, xe_utils_amd_xe_utils_default.a.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, evnt);
        };
      }))
    }, this.renderContent(h).concat([h('i', {
      class: "vxe-button--dropdown-arrow ".concat(conf.icon.dropdownBottom)
    })])), h('div', {
      class: 'vxe-button--dropdown-wrapper',
      on: {
        click: this.clickDropdownEvent,
        mouseenter: this.mouseenterEvent,
        mouseleave: this.mouseleaveEvent
      }
    }, $scopedSlots.dropdowns.call(this))]) : h('button', {
      class: ['vxe-button', "type--".concat(isText ? type : 'button'), (_ref3 = {}, _defineProperty(_ref3, "size--".concat(vSize), vSize), _defineProperty(_ref3, "theme--".concat(type), type && !isText), _defineProperty(_ref3, 'is--disabled', disabled || loading), _defineProperty(_ref3, 'is--loading', loading), _ref3)],
      attrs: {
        name: name,
        disabled: disabled || loading
      },
      on: xe_utils_amd_xe_utils_default.a.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, evnt);
        };
      })
    }, this.renderContent(h));
  },
  methods: {
    renderContent: function renderContent(h) {
      var $scopedSlots = this.$scopedSlots,
          icon = this.icon,
          loading = this.loading;
      var contents = [];

      if (loading) {
        contents.push(h('i', {
          class: ['vxe-button--loading-icon', conf.icon.btnLoading]
        }));
      } else if (icon) {
        contents.push(h('i', {
          class: ['vxe-button--icon', icon]
        }));
      }

      if ($scopedSlots.default) {
        contents.push($scopedSlots.default.call(this));
      }

      return contents;
    },
    clickDropdownEvent: function clickDropdownEvent(evnt) {
      var dropdownElem = evnt.currentTarget;
      var wrapperElem = dropdownElem.parentNode;

      var _DomTools$getEventTar = DomTools.getEventTargetNode(evnt, dropdownElem, 'vxe-button'),
          flag = _DomTools$getEventTar.flag,
          targetElem = _DomTools$getEventTar.targetElem;

      if (flag) {
        wrapperElem.dataset.active = 'N';
        DomTools.removeClass(wrapperElem, 'is--active');
        UtilTools.emitEvent(this, 'dropdown-click', [{
          name: targetElem.getAttribute('name')
        }, evnt]);
      }
    },
    mouseenterEvent: function mouseenterEvent(evnt) {
      var dropdownElem = evnt.currentTarget;
      var wrapperElem = dropdownElem.parentNode;
      wrapperElem.dataset.active = 'Y';
      DomTools.addClass(wrapperElem, 'is--active');
    },
    mouseleaveEvent: function mouseleaveEvent(evnt) {
      var dropdownElem = evnt.currentTarget;
      var wrapperElem = dropdownElem.parentNode;
      wrapperElem.dataset.active = 'N';
      setTimeout(function () {
        if (wrapperElem.dataset.active !== 'Y') {
          DomTools.removeClass(wrapperElem, 'is--active');
        }
      }, 300);
    }
  }
});
// CONCATENATED MODULE: ./packages/button/index.js



src_button.install = function (Vue) {
  Vue.component(src_button.name, src_button);
};

var Button = src_button;
/* harmony default export */ var packages_button = (src_button);
// CONCATENATED MODULE: ./packages/modal/src/queue.js
var queue = [];
/* harmony default export */ var src_queue = (queue);
// CONCATENATED MODULE: ./packages/modal/src/modal.js










/* harmony default export */ var modal = ({
  name: 'VxeModal',
  props: {
    value: Boolean,
    id: String,
    type: {
      type: String,
      default: 'modal'
    },
    status: String,
    iconStatus: String,
    top: {
      type: [Number, String],
      default: 15
    },
    title: String,
    duration: {
      type: [Number, String],
      default: function _default() {
        return conf.modal.duration;
      }
    },
    message: [String, Function],
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
    animat: {
      type: Boolean,
      default: function _default() {
        return conf.modal.animat;
      }
    },
    size: String,
    slots: Object,
    events: Object
  },
  data: function data() {
    return {
      visible: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: this.zIndex || UtilTools.nextZIndex(),
      zoomLocat: null,
      isFirst: true
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
    }

    document.body.appendChild(this.$el); // 触发 inserted 事件

    var params = {
      type: 'inserted',
      $modal: this
    };

    if ($listeners.inserted) {
      this.$emit('inserted', params);
    } else if (events.inserted) {
      events.inserted.call(this, params);
    }
  },
  beforeDestroy: function beforeDestroy() {
    GlobalEvent.off(this, 'keydown');
    this.removeMsgQueue();
    this.$el.parentNode.removeChild(this.$el);
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var $scopedSlots = this.$scopedSlots,
        _this$slots = this.slots,
        slots = _this$slots === void 0 ? {} : _this$slots,
        vSize = this.vSize,
        type = this.type,
        resize = this.resize,
        animat = this.animat,
        status = this.status,
        iconStatus = this.iconStatus,
        showHeader = this.showHeader,
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
        isMsg = this.isMsg;
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
      class: ['vxe-modal--wrapper', "type--".concat(type), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "status--".concat(status), status), _defineProperty(_ref, 'is--animat', animat), _defineProperty(_ref, 'lock--scroll', lockScroll), _defineProperty(_ref, 'lock--view', lockView), _defineProperty(_ref, 'is--mask', mask), _defineProperty(_ref, 'is--maximize', zoomLocat), _defineProperty(_ref, 'is--visible', contentVisible), _defineProperty(_ref, "active", visible), _ref)],
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
        mousedown: this.updateZindex
      },
      ref: 'modalBox'
    }, [showHeader ? h('div', {
      class: 'vxe-modal--header',
      on: headerOns
    }, headerSlot ? headerSlot.call(this, {
      $modal: this
    }, h) : [titleSlot ? titleSlot.call(this, {
      $modal: this
    }, h) : h('span', {
      class: 'vxe-modal--title'
    }, title ? UtilTools.getFuncText(title) : conf.i18n('vxe.alert.title')), resize ? h('i', {
      class: ['vxe-modal--zoom-btn', 'trigger--btn', zoomLocat ? conf.icon.modalZoomOut : conf.icon.modalZoomIn],
      attrs: {
        title: conf.i18n("vxe.toolbar.zoom".concat(zoomLocat ? 'Out' : 'In'))
      },
      on: {
        click: this.toggleZoomEvent
      }
    }) : null, h('i', {
      class: ['vxe-modal--close-btn', 'trigger--btn', conf.icon.modalClose],
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
      class: ['vxe-modal--status-icon', iconStatus || conf.icon["modal".concat(status.replace(/\b(\w)/, function (word) {
        return word.toUpperCase();
      }))]]
    })]) : null, h('div', {
      class: 'vxe-modal--content'
    }, defaultSlot ? defaultSlot.call(this, {
      $modal: this
    }, h) : xe_utils_amd_xe_utils_default.a.isFunction(message) ? message.call(this, h) : message)]), showFooter ? h('div', {
      class: 'vxe-modal--footer'
    }, footerSlot ? footerSlot.call(this, {
      $modal: this
    }, h) : [type === 'confirm' ? h('vxe-button', {
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
    }, conf.i18n('vxe.button.confirm'))]) : null, !isMsg && resize ? h('span', {
      class: 'vxe-modal--resize'
    }, ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map(function (type) {
      return h('span', {
        class: "".concat(type, "-resize"),
        attrs: {
          'data-type': type
        },
        on: {
          mousedown: _this.dragEvent
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
      if (this.modalZindex < UtilTools.getLastZIndex()) {
        this.modalZindex = UtilTools.nextZIndex();
      }
    },
    closeEvent: function closeEvent(evnt) {
      var type = 'close';
      this.$emit(type, {
        type: type,
        $modal: this
      }, evnt);
      this.close(type);
    },
    confirmEvent: function confirmEvent(evnt) {
      var type = 'confirm';
      this.$emit(type, {
        type: type,
        $modal: this
      }, evnt);
      this.close(type);
    },
    cancelEvent: function cancelEvent(evnt) {
      var type = 'cancel';
      this.$emit(type, {
        type: type,
        $modal: this
      }, evnt);
      this.close(type);
    },
    open: function open() {
      var _this2 = this;

      var $listeners = this.$listeners,
          _this$events2 = this.events,
          events = _this$events2 === void 0 ? {} : _this$events2,
          duration = this.duration,
          visible = this.visible,
          isMsg = this.isMsg,
          remember = this.remember;

      if (!visible) {
        var params = {
          type: 'show',
          $modal: this
        };

        if (!remember) {
          this.recalculate();
        }

        this.visible = true;
        this.contentVisible = false;
        this.updateZindex();
        this.$emit('activated', params);
        setTimeout(function () {
          _this2.contentVisible = true;

          _this2.$nextTick(function () {
            if (!events.show) {
              _this2.$emit('input', true);

              _this2.$emit('show', params);
            }

            if (!$listeners.show && events.show) {
              events.show.call(_this2, params);
            }
          });
        }, 10);

        if (isMsg) {
          this.addMsgQueue();
          setTimeout(this.close, xe_utils_amd_xe_utils_default.a.toNumber(duration));
        } else {
          this.$nextTick(function () {
            var isFirst = _this2.isFirst,
                marginSize = _this2.marginSize,
                fullscreen = _this2.fullscreen;

            var modalBoxElem = _this2.getBox();

            var clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
            var clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
            modalBoxElem.style.left = "".concat(clientVisibleWidth / 2 - modalBoxElem.offsetWidth / 2, "px");

            if (modalBoxElem.offsetHeight + modalBoxElem.offsetTop + marginSize > clientVisibleHeight) {
              modalBoxElem.style.top = "".concat(marginSize, "px");
            }

            if (isFirst && fullscreen) {
              _this2.isFirst = false;

              _this2.$nextTick(_this2.maximize);
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
      var _this3 = this;

      if (src_queue.indexOf(this) > -1) {
        xe_utils_amd_xe_utils_default.a.remove(src_queue, function (comp) {
          return comp === _this3;
        });
      }

      this.updateStyle();
    },
    updateStyle: function updateStyle() {
      this.$nextTick(function () {
        var offsetTop = 0;
        src_queue.forEach(function (comp) {
          offsetTop += xe_utils_amd_xe_utils_default.a.toNumber(comp.top);
          comp.modalTop = offsetTop;
          offsetTop += comp.$refs.modalBox.clientHeight;
        });
      });
    },
    close: function close(type) {
      var _this4 = this;

      var _this$events3 = this.events,
          events = _this$events3 === void 0 ? {} : _this$events3,
          visible = this.visible,
          isMsg = this.isMsg;
      var params = {
        type: type,
        $modal: this
      };

      if (visible) {
        if (isMsg) {
          this.removeMsgQueue();
        }

        this.contentVisible = false;

        if (events.hide) {
          events.hide.call(this, params);
        } else {
          this.$emit('hide', params);
        }

        setTimeout(function () {
          _this4.visible = false;

          if (!events.hide) {
            _this4.$emit('input', false);
          }

          _this4.$emit('deactivated', params);
        }, 200);
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      if (evnt.keyCode === 27) {
        this.close();
      }
    },
    getBox: function getBox() {
      return this.$refs.modalBox;
    },
    maximize: function maximize() {
      var _this5 = this;

      return this.$nextTick().then(function () {
        if (!_this5.zoomLocat) {
          var marginSize = _this5.marginSize;

          var modalBoxElem = _this5.getBox();

          var _DomTools$getDomNode = DomTools.getDomNode(),
              visibleHeight = _DomTools$getDomNode.visibleHeight,
              visibleWidth = _DomTools$getDomNode.visibleWidth;

          _this5.zoomLocat = {
            top: modalBoxElem.offsetTop,
            left: modalBoxElem.offsetLeft,
            width: modalBoxElem.clientWidth,
            height: modalBoxElem.clientHeight
          };
          Object.assign(modalBoxElem.style, {
            top: "".concat(marginSize, "px"),
            left: "".concat(marginSize, "px"),
            width: "".concat(visibleWidth - marginSize * 2, "px"),
            height: "".concat(visibleHeight - marginSize * 2, "px")
          });
        }
      });
    },
    revert: function revert() {
      var _this6 = this;

      return this.$nextTick().then(function () {
        var zoomLocat = _this6.zoomLocat;

        if (zoomLocat) {
          var modalBoxElem = _this6.getBox();

          _this6.zoomLocat = null;
          Object.assign(modalBoxElem.style, {
            top: "".concat(zoomLocat.top, "px"),
            left: "".concat(zoomLocat.left, "px"),
            width: "".concat(zoomLocat.width, "px"),
            height: "".concat(zoomLocat.height, "px")
          });
        }
      });
    },
    toggleZoomEvent: function toggleZoomEvent(evnt) {
      var _this7 = this;

      var $listeners = this.$listeners,
          zoomLocat = this.zoomLocat,
          _this$events4 = this.events,
          events = _this$events4 === void 0 ? {} : _this$events4;
      var params = {
        type: zoomLocat ? 'min' : 'max',
        $modal: this
      };
      return this[zoomLocat ? 'revert' : 'maximize']().then(function () {
        if ($listeners.zoom) {
          _this7.$emit('zoom', params, evnt);
        } else if (events.zoom) {
          events.zoom.call(_this7, params, evnt);
        }
      });
    },
    mousedownEvent: function mousedownEvent(evnt) {
      var _this8 = this;

      var marginSize = this.marginSize,
          zoomLocat = this.zoomLocat;
      var modalBoxElem = this.getBox();

      if (!zoomLocat && evnt.button === 0 && !DomTools.getEventTargetNode(evnt, modalBoxElem, 'trigger--btn').flag) {
        evnt.preventDefault();
        var demMousemove = document.onmousemove;
        var demMouseup = document.onmouseup;
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
          var maxX = visibleWidth - offsetWidth - marginSize;
          var minY = marginSize;
          var maxY = visibleHeight - offsetHeight - marginSize;
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
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + " is--drag";
        };

        document.onmouseup = function (evnt) {
          document.onmousemove = demMousemove;
          document.onmouseup = demMouseup;

          _this8.$nextTick(function () {
            modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '');
          });
        };
      }
    },
    dragEvent: function dragEvent(evnt) {
      var _this9 = this;

      evnt.preventDefault();
      var $listeners = this.$listeners,
          marginSize = this.marginSize,
          _this$events5 = this.events,
          events = _this$events5 === void 0 ? {} : _this$events5;

      var _DomTools$getDomNode3 = DomTools.getDomNode(),
          visibleHeight = _DomTools$getDomNode3.visibleHeight,
          visibleWidth = _DomTools$getDomNode3.visibleWidth;

      var type = evnt.target.dataset.type;
      var minWidth = xe_utils_amd_xe_utils_default.a.toNumber(this.minWidth);
      var minHeight = xe_utils_amd_xe_utils_default.a.toNumber(this.minHeight);
      var maxWidth = visibleWidth - 20;
      var maxHeight = visibleHeight - 20;
      var modalBoxElem = this.getBox();
      var demMousemove = document.onmousemove;
      var demMouseup = document.onmouseup;
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

        modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + " is--drag";

        if ($listeners.zoom) {
          _this9.$emit('zoom', params, evnt);
        } else if (events.zoom) {
          events.zoom.call(_this9, params, evnt);
        }
      };

      document.onmouseup = function (evnt) {
        _this9.zoomLocat = null;
        document.onmousemove = demMousemove;
        document.onmouseup = demMouseup;
        setTimeout(function () {
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '');
        }, 50);
      };
    }
  }
});
// CONCATENATED MODULE: ./packages/modal/index.js







var AlertController = null;
var AllActivedModal = [];
function Modal(options) {
  return new Promise(function (resolve) {
    if (options && options.id && src_queue.some(function (comp) {
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

          $modal.$destroy();
          xe_utils_amd_xe_utils_default.a.remove(AllActivedModal, function (item) {
            return item === $modal;
          });
          resolve(params.type);
        }
      });
      var $modal = new AlertController({
        el: document.createElement('div'),
        propsData: options
      });
      setTimeout(function () {
        return $modal.open();
      });
      AllActivedModal.push($modal);
    }
  });
}
['alert', 'confirm', 'message'].forEach(function (type, index) {
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

  Modal[type] = function (message, title, options) {
    var opts;

    if (xe_utils_amd_xe_utils_default.a.isObject(message)) {
      opts = message;
    } else {
      if (title) {
        opts = {
          title: title
        };
      }
    }

    return Modal(Object.assign({
      message: xe_utils_amd_xe_utils_default.a.toString(message),
      type: type
    }, defOpts, opts, options));
  };
});

Modal.closeAll = function () {
  AllActivedModal.forEach(function ($modal) {
    return $modal.close('close');
  });
};

Modal.install = function (Vue) {
  v_x_e_table._modal = 1;
  Vue.component('vxe-message', modal);
  Vue.component(modal.name, modal);
  AlertController = Vue.extend(modal);
  Vue.prototype.$XMsg = Modal;
  Vue.prototype.$XModal = Modal;
};

/* harmony default export */ var packages_modal = (Modal);
// CONCATENATED MODULE: ./packages/tooltip/src/tooltip.js








/* harmony default export */ var src_tooltip = ({
  name: 'VxeTooltip',
  props: {
    value: Boolean,
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
    }
  },
  data: function data() {
    return {
      isUpdate: false,
      isHover: false,
      visible: false,
      message: '',
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
    Array.from($el.children).forEach(function (elem, index) {
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
    var theme = this.theme,
        message = this.message,
        isHover = this.isHover,
        isArrow = this.isArrow,
        visible = this.visible,
        tipStore = this.tipStore,
        enterable = this.enterable;
    var on = null;

    if (enterable) {
      on = {
        mouseenter: this.wrapperMouseenterEvent,
        mouseleave: this.wrapperMouseleaveEvent
      };
    }

    return h('div', {
      class: ['vxe-table--tooltip-wrapper', "theme--".concat(theme), "placement--".concat(tipStore.placement), {
        'is--enterable': enterable,
        'is--visible': visible,
        'is--arrow': isArrow,
        'is--hover': isHover
      }],
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
      var _this = this;

      this.targetActive = true;

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
        tipStore.style = {
          width: 'auto'
        };
        tipStore.arrowStyle = {
          left: '50%'
        };

        if (!parentNode) {
          document.body.appendChild($el);
        }

        if (message) {
          this.message = message;
        }

        this.update(true);
        this.updateZindex();
        return this.$nextTick().then(function () {
          var wrapperElem = $el;

          if (wrapperElem) {
            var clientHeight = wrapperElem.clientHeight;
            var clientWidth = xe_utils_amd_xe_utils_default.a.toNumber(getComputedStyle(wrapperElem).width);
            tipLeft = left + Math.floor((target.offsetWidth - clientWidth) / 2);
            tipStore.style = {
              zIndex: zIndex || _this.tipZindex,
              width: "".concat(clientWidth, "px"),
              top: "".concat(top - clientHeight - 6, "px"),
              left: "".concat(tipLeft, "px")
            };
            return _this.$nextTick();
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
              tipStore.style.top = "".concat(top + target.offsetHeight + 6, "px");
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
    },
    clickEvent: function clickEvent(event) {
      this[this.visible ? 'close' : 'show']();
    },
    targetMouseenterEvent: function targetMouseenterEvent(evnt) {
      this.show();
    },
    targetMouseleaveEvent: function targetMouseleaveEvent(evnt) {
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
    wrapperMouseenterEvent: function wrapperMouseenterEvent(evnt) {
      this.isHover = true;
    },
    wrapperMouseleaveEvent: function wrapperMouseleaveEvent(evnt) {
      var _this3 = this;

      var $listeners = this.$listeners,
          trigger = this.trigger,
          enterable = this.enterable,
          leaveDelay = this.leaveDelay;
      this.isHover = false;

      if ($listeners.leave) {
        this.$emit('leave', evnt);
      } else if (enterable && trigger === 'hover') {
        setTimeout(function () {
          if (!_this3.targetActive) {
            _this3.close();
          }
        }, leaveDelay);
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
// CONCATENATED MODULE: ./packages/edit/src/mixin.js












var mixin_browse = DomTools.browse;
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
      var _this = this;

      var afterFullData = this.afterFullData,
          editStore = this.editStore,
          scrollYLoad = this.scrollYLoad,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;

      if (treeConfig) {
        throw new Error(UtilTools.getLog('vxe.error.noTree', ['insert']));
      }

      if (!xe_utils_amd_xe_utils_default.a.isArray(records)) {
        records = [records];
      }

      var nowData = afterFullData;
      var newRecords = records.map(function (record) {
        return _this.defineField(Object.assign({}, record));
      });

      if (!row) {
        nowData.unshift.apply(nowData, newRecords);
        tableFullData.unshift.apply(tableFullData, newRecords);
      } else {
        if (row === -1) {
          nowData.push.apply(nowData, newRecords);
          tableFullData.push.apply(tableFullData, newRecords);
        } else {
          var targetIndex = nowData.indexOf(row);

          if (targetIndex === -1) {
            throw new Error(UtilTools.error('vxe.error.unableInsert'));
          }

          nowData.splice.apply(nowData, [targetIndex, 0].concat(newRecords));
          tableFullData.splice.apply(tableFullData, [tableFullData.indexOf(row), 0].concat(newRecords));
        }
      }

      [].unshift.apply(editStore.insertList, newRecords);
      this.handleTableData();
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
          editStore = this.editStore,
          treeConfig = this.treeConfig,
          checkboxOpts = this.checkboxOpts,
          selection = this.selection,
          isInsertByRow = this.isInsertByRow,
          scrollYLoad = this.scrollYLoad;
      var removeList = editStore.removeList,
          insertList = editStore.insertList;
      var property = checkboxOpts.checkField;
      var rest = [];
      var nowData = afterFullData;

      if (treeConfig) {
        throw new Error(UtilTools.getLog('vxe.error.noTree', ['remove']));
      }

      if (!rows) {
        rows = tableFullData;
      } else if (!xe_utils_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      } // 如果是新增，则保存记录


      rows.forEach(function (row) {
        if (!isInsertByRow(row)) {
          removeList.push(row);
        }
      }); // 如果绑定了多选属性，则更新状态

      if (!property) {
        xe_utils_amd_xe_utils_default.a.remove(selection, function (row) {
          return rows.indexOf(row) > -1;
        });
      } // 从数据源中移除


      if (tableFullData === rows) {
        rows = rest = tableFullData.slice(0);
        tableFullData.length = 0;
        nowData.length = 0;
      } else {
        rest = xe_utils_amd_xe_utils_default.a.remove(tableFullData, function (row) {
          return rows.indexOf(row) > -1;
        });
        xe_utils_amd_xe_utils_default.a.remove(nowData, function (row) {
          return rows.indexOf(row) > -1;
        });
      } // 从新增中移除已删除的数据


      xe_utils_amd_xe_utils_default.a.remove(insertList, function (row) {
        return rows.indexOf(row) > -1;
      });
      this.handleTableData();
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
     * 删除选中数据
     */
    _removeSelecteds: function _removeSelecteds() {
      var _this3 = this;

      return this.remove(this.getSelectRecords()).then(function (params) {
        _this3.clearSelection();

        return params;
      });
    },
    _revert: function _revert() {
      UtilTools.warn('vxe.error.delFunc', ['revert', 'revertData']);
      return this.revertData.apply(this, arguments);
    },

    /**
     * 还原数据
     * 如果不传任何参数，则还原整个表格
     * 如果传 row 则还原一行
     * 如果传 rows 则还原多行
     * 如果还额外传了 field 则还原指定的单元格数据
     */
    _revertData: function _revertData(rows, field) {
      var tableSourceData = this.tableSourceData,
          getRowIndex = this.getRowIndex;

      if (arguments.length) {
        if (rows && !xe_utils_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        rows.forEach(function (row) {
          var rowIndex = getRowIndex(row);
          var oRow = tableSourceData[rowIndex];

          if (oRow && row) {
            if (field) {
              xe_utils_amd_xe_utils_default.a.set(row, field, xe_utils_amd_xe_utils_default.a.clone(xe_utils_amd_xe_utils_default.a.get(oRow, field), true));
            } else {
              xe_utils_amd_xe_utils_default.a.destructuring(row, xe_utils_amd_xe_utils_default.a.clone(oRow, true));
            }
          }
        });
        return this.$nextTick();
      }

      return this.reloadData(tableSourceData);
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
      var tableFullData = this.tableFullData,
          isUpdateByRow = this.isUpdateByRow,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;

      if (treeConfig) {
        return xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, function (row) {
          return isUpdateByRow(row);
        }, treeOpts);
      }

      return tableFullData.filter(function (row) {
        return isUpdateByRow(row);
      });
    },

    /**
     * 处理激活编辑
     */
    handleActived: function handleActived(params, evnt) {
      var _this4 = this;

      var editStore = this.editStore,
          editConfig = this.editConfig,
          tableColumn = this.tableColumn;
      var activeMethod = editConfig.activeMethod;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender && cell) {
        if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
          // 判断是否禁用编辑
          var type = 'edit-disabled';

          if (!activeMethod || activeMethod(params)) {
            if (this.keyboardConfig || this.mouseConfig) {
              this.clearCopyed(evnt);
              this.clearChecked();
              this.clearSelected(evnt);
            }

            this.clostTooltip();
            this.clearActived(evnt);
            type = 'edit-actived';
            column.renderHeight = cell.offsetHeight;
            actived.args = params;
            actived.row = row;
            actived.column = column;

            if (editConfig.mode === 'row') {
              tableColumn.forEach(function (column) {
                return _this4._getColumnModel(row, column);
              });
            } else {
              this._getColumnModel(row, column);
            }

            this.$nextTick(function () {
              _this4.handleFocus(params, evnt);
            });
          }

          UtilTools.emitEvent(this, type, [params, evnt]);
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
            _this4.handleFocus(params, evnt);
          });
        }
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
      var _this5 = this;

      var tableColumn = this.tableColumn,
          editStore = this.editStore,
          _this$editConfig = this.editConfig,
          editConfig = _this$editConfig === void 0 ? {} : _this$editConfig;
      var actived = editStore.actived;
      var args = actived.args,
          row = actived.row,
          column = actived.column;

      if (row || column) {
        if (editConfig.mode === 'row') {
          tableColumn.forEach(function (column) {
            return _this5._setColumnModel(row, column);
          });
        } else {
          this._setColumnModel(row, column);
        }

        this.updateFooter();
        UtilTools.emitEvent(this, 'edit-closed', [args, evnt]);
      }

      actived.args = null;
      actived.row = null;
      actived.column = null;
      return (v_x_e_table._valid ? this.clearValidate() : this.$nextTick()).then(this.recalculate);
    },
    _getActiveRow: function _getActiveRow() {
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
    // 在 v3.0 中废弃 hasActiveRow
    _hasActiveRow: function _hasActiveRow(row) {
      UtilTools.warn('vxe.error.delFunc', ['hasActiveRow', 'isActiveByRow']);
      return this.isActiveByRow(row);
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
    handleFocus: function handleFocus(params, evnt) {
      var row = params.row,
          column = params.column,
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

          if (mixin_browse.msie) {
            var textRange = inputElem.createTextRange();
            textRange.collapse(false);
            textRange.select();
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
      return this.setActiveCell(row, xe_utils_amd_xe_utils_default.a.find(this.visibleColumn, function (column) {
        return column.editRender;
      }).property);
    },

    /**
     * 激活单元格编辑
     */
    _setActiveCell: function _setActiveCell(row, field) {
      var _this6 = this;

      return this.scrollToRow(row, true).then(function () {
        if (row && field) {
          var column = xe_utils_amd_xe_utils_default.a.find(_this6.visibleColumn, function (column) {
            return column.property === field;
          });

          if (column && column.editRender) {
            var cell = DomTools.getCell(_this6, {
              row: row,
              column: column
            });

            if (cell) {
              _this6.handleActived({
                row: row,
                rowIndex: _this6.getRowIndex(row),
                column: column,
                columnIndex: _this6.getColumnIndex(column),
                cell: cell,
                $table: _this6
              });

              _this6.lastCallTime = Date.now();
            }
          }
        }

        return _this6.$nextTick();
      });
    },

    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    _setSelectCell: function _setSelectCell(row, field) {
      var tableData = this.tableData,
          editConfig = this.editConfig,
          visibleColumn = this.visibleColumn;

      if (row && field && editConfig.trigger !== 'manual') {
        var column = xe_utils_amd_xe_utils_default.a.find(visibleColumn, function (column) {
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
     * 处理选中源
     */
    handleSelected: function handleSelected(params, evnt) {
      var _this7 = this;

      var _this$mouseConfig = this.mouseConfig,
          mouseConfig = _this$mouseConfig === void 0 ? {} : _this$mouseConfig,
          editConfig = this.editConfig,
          editStore = this.editStore,
          elemStore = this.elemStore;
      var actived = editStore.actived,
          selected = editStore.selected;
      var row = params.row,
          column = params.column,
          cell = params.cell;

      var selectMethod = function selectMethod() {
        if ((mouseConfig.selected || mouseConfig.checked) && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
            if (_this7.keyboardConfig) {
              _this7.clearChecked(evnt);

              _this7.clearIndexChecked();

              _this7.clearHeaderChecked();

              _this7.clearSelected(evnt);
            }

            _this7.clearActived(evnt);

            selected.args = params;
            selected.row = row;
            selected.column = column;

            if (mouseConfig.selected) {
              _this7.addColSdCls();
            } // 如果配置了批量选中功能，则为批量选中状态


            if (mouseConfig.checked) {
              var headerElem = elemStore['main-header-list'];

              _this7.handleChecked([[cell]]);

              if (headerElem) {
                _this7.handleHeaderChecked([[headerElem.querySelector(".".concat(column.id))]]);
              }

              _this7.handleIndexChecked([[cell.parentNode.querySelector('.col--index')]]);
            }
          }
        }

        return _this7.$nextTick();
      };

      return selectMethod();
    },

    /**
     * 清除所选中源状态
     */
    _clearSelected: function _clearSelected(evnt) {
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
        xe_utils_amd_xe_utils_default.a.arrayEach(headerElem.querySelectorAll('.col--title-selected'), function (elem) {
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
        var cell = DomTools.getCell(this, {
          row: row,
          column: column
        });

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
  data: function data() {
    return {
      isAll: false,
      isIndeterminate: false,
      modeList: [{
        value: 'all',
        label: 'vxe.toolbar.expAll'
      }, {
        value: 'selected',
        label: 'vxe.toolbar.expSelected'
      }]
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    showSheet: function showSheet() {
      return xe_utils_amd_xe_utils_default.a.includes(['html', 'xml', 'xlsx'], this.defaultOptions.type);
    },
    isNotImport: function isNotImport() {
      return this.storeData.isTree;
    }
  },
  render: function render(h) {
    var _this = this;

    var _e = this._e,
        isAll = this.isAll,
        isIndeterminate = this.isIndeterminate,
        showSheet = this.showSheet,
        defaultOptions = this.defaultOptions,
        storeData = this.storeData,
        modeList = this.modeList,
        isNotImport = this.isNotImport;
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: storeData.visible,
        callback: function callback(value) {
          storeData.visible = value;
        }
      },
      props: {
        title: conf.i18n('vxe.toolbar.expTitle'),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true
      },
      on: {
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
    }, [h('tr', [h('td', conf.i18n('vxe.toolbar.expName')), h('td', [h('input', {
      ref: 'filename',
      attrs: {
        type: 'text',
        placeholder: conf.i18n('vxe.toolbar.expNamePlaceholder')
      },
      domProps: {
        value: defaultOptions.filename
      },
      on: {
        input: function input(evnt) {
          defaultOptions.filename = evnt.target.value;
        }
      }
    })])]), h('tr', [h('td', conf.i18n('vxe.toolbar.expType')), h('td', [h('select', {
      on: {
        change: function change(evnt) {
          defaultOptions.type = evnt.target.value;
        }
      }
    }, defaultOptions.types.map(function (item) {
      return h('option', {
        attrs: {
          value: item.value
        },
        domProps: {
          selected: defaultOptions.type === item.value
        }
      }, conf.i18n(item.label));
    }))])]), showSheet ? h('tr', [h('td', conf.i18n('vxe.toolbar.expSheetName')), h('td', [h('input', {
      attrs: {
        type: 'text',
        placeholder: conf.i18n('vxe.toolbar.expSheetNamePlaceholder')
      },
      domProps: {
        value: defaultOptions.sheetName
      },
      on: {
        input: function input(evnt) {
          defaultOptions.sheetName = evnt.target.value;
        }
      }
    })])]) : _e(), h('tr', [h('td', conf.i18n('vxe.toolbar.expMode')), h('td', [h('select', {
      on: {
        change: function change(evnt) {
          storeData.mode = evnt.target.value;
        }
      }
    }, modeList.map(function (item) {
      return h('option', {
        attrs: {
          value: item.value
        },
        domProps: {
          selected: storeData.mode === item.value
        }
      }, conf.i18n(item.label));
    }))])]), h('tr', [h('td', [conf.i18n('vxe.toolbar.expColumn')]), h('td', [h('div', {
      class: 'vxe-export--panel-column'
    }, [h('vxe-checkbox', {
      props: {
        indeterminate: isIndeterminate,
        title: conf.i18n('vxe.table.allTitle')
      },
      model: {
        value: isAll,
        callback: function callback(value) {
          _this.isAll = value;
        }
      },
      on: {
        change: this.allColumnEvent
      }
    }, conf.i18n('vxe.toolbar.expAllColumn')), h('ul', storeData.columns.map(function (column) {
      var headerTitle = column.getTitle();
      return h('li', {
        class: {
          'is--active': column.checked,
          'is--disabled': column.disabled
        },
        attrs: {
          title: headerTitle
        },
        on: {
          click: function click() {
            if (!column.disabled) {
              column.checked = !column.checked;

              _this.checkStatus();
            }
          }
        }
      }, headerTitle);
    }))])])]), h('tr', [h('td', conf.i18n('vxe.toolbar.expOpts')), h('td', [h('vxe-checkbox', {
      props: {
        title: conf.i18n('vxe.toolbar.expHeaderTitle')
      },
      model: {
        value: defaultOptions.isHeader,
        callback: function callback(value) {
          defaultOptions.isHeader = value;
        }
      }
    }, conf.i18n('vxe.toolbar.expOptHeader')), h('vxe-checkbox', {
      props: {
        disabled: !storeData.hasFooter,
        title: conf.i18n('vxe.toolbar.expFooterTitle')
      },
      model: {
        value: defaultOptions.isFooter,
        callback: function callback(value) {
          defaultOptions.isFooter = value;
        }
      }
    }, conf.i18n('vxe.toolbar.expOptFooter')), h('vxe-checkbox', {
      props: {
        disabled: storeData.forceOriginal,
        title: conf.i18n('vxe.toolbar.expOriginalTitle')
      },
      model: {
        value: defaultOptions.original,
        callback: function callback(value) {
          defaultOptions.original = value;
        }
      }
    }, conf.i18n(isNotImport ? 'vxe.toolbar.expOptOriginNotImp' : 'vxe.toolbar.expOptOriginal'))])])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [h('vxe-button', {
      on: {
        click: this.printEvent
      }
    }, conf.i18n('vxe.toolbar.expPrint')), h('vxe-button', {
      props: {
        type: 'primary'
      },
      on: {
        click: this.exportEvent
      }
    }, conf.i18n('vxe.toolbar.expConfirm'))])])]);
  },
  methods: {
    checkStatus: function checkStatus() {
      var columns = this.storeData.columns;
      this.isAll = this.storeData.columns.every(function (column) {
        return column.disabled || column.checked;
      });
      this.isIndeterminate = !this.isAll && columns.some(function (column) {
        return !column.disabled && column.checked;
      });
    },
    allColumnEvent: function allColumnEvent() {
      var isAll = this.isAll;
      this.storeData.columns.forEach(function (column) {
        if (!column.disabled) {
          column.checked = isAll;
        }
      });
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
      var _this$$parent = this.$parent,
          $grid = _this$$parent.$grid,
          $table = _this$$parent.$table;
      var comp = $grid || $table;
      var selectRecords = storeData.selectRecords;
      var opts = Object.assign({
        columns: storeData.columns.filter(function (column) {
          return column.checked;
        })
      }, defaultOptions);

      if (storeData.mode === 'selected') {
        if (xe_utils_amd_xe_utils_default.a.includes(['html', 'pdf'], defaultOptions.type) && comp.treeConfig) {
          opts.data = xe_utils_amd_xe_utils_default.a.searchTree(comp.getTableData().fullData, function (item) {
            return selectRecords.indexOf(item) > -1;
          }, comp.getTreeStatus().config);
        } else {
          opts.data = selectRecords;
        }
      }

      return opts;
    },
    printEvent: function printEvent() {
      this.storeData.visible = false;
      this.$emit('print', this.getExportOption());
    },
    exportEvent: function exportEvent() {
      this.storeData.visible = false;
      this.$emit('export', this.getExportOption());
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

      if (storeData.type) {
        return conf.i18n("vxe.types.".concat(storeData.type));
      }

      return "*.".concat((this.defaultOptions.types || v_x_e_table.importTypes).join(', *.'));
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
      model: {
        value: storeData.visible,
        callback: function callback(value) {
          storeData.visible = value;
        }
      },
      props: {
        title: conf.i18n('vxe.toolbar.impTitle'),
        width: 440,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true
      }
    }, [h('div', {
      class: 'vxe-export--panel'
    }, [h('table', {
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [h('tr', [h('td', conf.i18n('vxe.toolbar.impFile')), h('td', [hasFile ? h('div', {
      class: 'vxe-import-selected--file',
      attrs: {
        title: selectName
      }
    }, [h('span', selectName), h('i', {
      class: conf.icon.importRemove,
      on: {
        click: this.clearFileEvent
      }
    })]) : h('span', {
      class: 'vxe-import-select--file',
      on: {
        click: this.selectFileEvent
      }
    }, conf.i18n('vxe.toolbar.impSelect'))])]), h('tr', [h('td', conf.i18n('vxe.toolbar.impType')), h('td', parseTypeLabel)]), h('tr', [h('td', conf.i18n('vxe.toolbar.impOpts')), h('td', [h('vxe-radio', {
      props: {
        name: 'mode',
        label: 'covering',
        title: conf.i18n('vxe.toolbar.impCoveringTitle')
      },
      model: {
        value: defaultOptions.mode,
        callback: function callback(value) {
          defaultOptions.mode = value;
        }
      }
    }, conf.i18n('vxe.toolbar.impModeCovering')), h('vxe-radio', {
      props: {
        name: 'mode',
        label: 'append',
        title: conf.i18n('vxe.toolbar.impAppendTitle')
      },
      model: {
        value: defaultOptions.mode,
        callback: function callback(value) {
          defaultOptions.mode = value;
        }
      }
    }, conf.i18n('vxe.toolbar.impModeAppend'))])])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [h('vxe-button', {
      props: {
        type: 'primary',
        disabled: !hasFile
      },
      on: {
        click: this.importEvent
      }
    }, conf.i18n('vxe.toolbar.impConfirm'))])])]);
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

      var _this$$parent = this.$parent,
          $grid = _this$$parent.$grid,
          $table = _this$$parent.$table;
      var comp = $grid || $table;

      if (comp) {
        comp.readFile(this.defaultOptions).then(function (evnt) {
          var file = evnt.target.files[0];
          Object.assign(_this.storeData, UtilTools.parseFile(file), {
            file: file
          });
        }).catch(function (e) {
          return e;
        });
      }
    },
    importEvent: function importEvent() {
      var storeData = this.storeData,
          defaultOptions = this.defaultOptions;
      var opts = Object.assign({}, defaultOptions);
      storeData.visible = false;
      this.$emit('import', opts);
    }
  }
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__("2b3d");

// CONCATENATED MODULE: ./packages/export/src/mixin.js




















 // 默认导出或打印的 HTML 样式

var defaultHtmlStyle = 'body{margin:0}table{font-size:14px;text-align:left;border-width:1px 0 0 1px}table,td,th{border-style:solid;border-color:#e8eaec}tfoot,thead{background-color:#f8f8f9}td,th{padding:.5em .4em;border-width:0 1px 1px 0}.tree-icon-wrapper{position:relative;display:inline-block;vertical-align:middle;width:1.2em}.tree-icon{position:absolute;top:-.3em;left:0;width:0;height:0;border-style:solid;border-width:.5em;border-top-color:#939599;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.tree-node{text-align:left}.tree-indent{display:inline-block}'; // 导入

var fileForm = document.createElement('form');
var fileInput = document.createElement('input');
fileForm.className = 'vxe-table--import-form';
fileInput.name = 'file';
fileInput.type = 'file';
fileForm.appendChild(fileInput); // 打印

var printFrame;

function createFrame() {
  var frame = document.createElement('iframe');
  frame.className = 'vxe-table--print-frame';
  return frame;
}

function hasTreeChildren($table, row) {
  var treeOpts = $table.treeOpts;
  return row[treeOpts.children] && row[treeOpts.children].length;
}

function handleExport($table, opts, oColumns, fullData) {
  var _getExportData = getExportData($table, opts, fullData, oColumns),
      columns = _getExportData.columns,
      datas = _getExportData.datas;

  return $table.preventEvent(null, 'event.export', {
    $table: $table,
    options: opts,
    columns: columns,
    datas: datas
  }, function () {
    return downloadFile($table, opts, getContent($table, opts, columns, datas));
  });
}

function getContent($table, opts, columns, datas) {
  switch (opts.type) {
    case 'csv':
      return toCsv($table, opts, columns, datas);

    case 'txt':
      return toTxt($table, opts, columns, datas);

    case 'html':
      return toHtml($table, opts, columns, datas);

    case 'xml':
      return toXML($table, opts, columns, datas);
  }

  return '';
}

function getSeq($table, row, rowIndex, column, columnIndex) {
  // 在 v3.0 中废弃 startIndex、indexMethod
  var seqOpts = $table.seqOpts;
  var seqMethod = seqOpts.seqMethod || column.indexMethod;
  return seqMethod ? seqMethod({
    row: row,
    rowIndex: rowIndex,
    column: column,
    columnIndex: columnIndex
  }) : (seqOpts.startIndex || $table.startIndex) + rowIndex + 1;
}

function getHeaderTitle(opts, column) {
  return (opts.original ? column.property : column.getTitle()) || '';
}

function toCsv($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var content = "\uFEFF";

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "\"".concat(getHeaderTitle(opts, column), "\"");
    }).join(',') + '\n';
  }

  datas.forEach(function (row, rowIndex) {
    if (isOriginal || opts.data) {
      content += columns.map(function (column, columnIndex) {
        // v3.0 废弃 type=index
        if (column.type === 'seq' || column.type === 'index') {
          return "\"".concat(getSeq($table, row, rowIndex, column, columnIndex), "\"");
        }

        return "\"".concat(UtilTools.getCellValue(row, column) || '', "\"");
      }).join(',') + '\n';
    } else {
      content += columns.map(function (column) {
        return "\"".concat(row[column.id], "\"");
      }).join(',') + '\n';
    }
  });

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "\"".concat(rows[$table.$getColumnIndex(column)] || '', "\"");
      }).join(',') + '\n';
    });
  }

  return content;
}

function toTxt($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var content = '';

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "".concat(getHeaderTitle(opts, column));
    }).join('\t') + '\n';
  }

  datas.forEach(function (row, rowIndex) {
    if (isOriginal || opts.data) {
      content += columns.map(function (column, columnIndex) {
        // v3.0 废弃 type=index
        if (column.type === 'seq' || column.type === 'index') {
          return "".concat(getSeq($table, row, rowIndex, column, columnIndex));
        }

        return "".concat(UtilTools.getCellValue(row, column) || '');
      }).join('\t') + '\n';
    } else {
      content += columns.map(function (column) {
        return "".concat(row[column.id]);
      }).join('\t') + '\n';
    }
  });

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "".concat(rows[$table.$getColumnIndex(column)] || '');
      }).join(',') + '\n';
    });
  }

  return content;
}

function toHtml($table, opts, columns, datas) {
  var treeConfig = $table.treeConfig,
      treeOpts = $table.treeOpts,
      tableFullData = $table.tableFullData;
  var isOriginal = opts.original;
  var html = ['<html>', "<head>", "<meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui\"><title>".concat(opts.sheetName, "</title>"), "<style>".concat(opts.style || defaultHtmlStyle, "</style>"), '</head>', '<body>', '<table border="1" cellspacing="0" cellpadding="0">', "<colgroup>".concat(columns.map(function (column) {
    return "<col width=\"".concat(column.renderWidth, "\">");
  }).join(''), "</colgroup>")].join('');

  if (opts.isHeader) {
    html += "<thead><tr>".concat(columns.map(function (column) {
      return "<th>".concat(getHeaderTitle(opts, column), "</th>");
    }).join(''), "</tr></thead>");
  }

  if (datas.length) {
    html += '<tbody>';

    if (treeConfig) {
      xe_utils_amd_xe_utils_default.a.eachTree(opts.data ? datas : tableFullData, function (row, rowIndex, items, path, parent, nodes) {
        html += '<tr>';

        if (isOriginal) {
          html += columns.map(function (column, columnIndex) {
            var cellValue = ''; // v3.0 废弃 type=index

            if (column.type === 'seq' || column.type === 'index') {
              cellValue = getSeq($table, row, rowIndex, column, columnIndex);
            } else {
              cellValue = UtilTools.getCellValue(row, column) || '';
            }

            if (column.treeNode) {
              var treeIcon = '';

              if (hasTreeChildren($table, row)) {
                treeIcon = "<i class=\"tree-icon\"></i>";
              }

              return "<td class=\"tree-node\"><span class=\"tree-indent\" style=\"width: ".concat((nodes.length - 1) * treeOpts.indent, "px\"></span><span class=\"tree-icon-wrapper\">").concat(treeIcon, "</span>").concat(cellValue, "</td>");
            }

            return "<td>".concat(cellValue, "</td>");
          }).join('');
        } else {
          html += columns.map(function (column) {
            if (column.treeNode) {
              var treeIcon = '';

              if (row._hasChild) {
                treeIcon = "<i class=\"tree-icon\"></i>";
              }

              return "<td class=\"tree-node\"><span class=\"tree-indent\" style=\"width: ".concat((nodes.length - 1) * treeOpts.indent, "px\"></span><span class=\"tree-icon-wrapper\">").concat(treeIcon, "</span>").concat(row[column.id], "</td>");
            }

            return "<td>".concat(row[column.id], "</td>");
          }).join('');
        }

        html += '</tr>';
      }, treeOpts);
    } else {
      datas.forEach(function (row, rowIndex) {
        html += '<tr>';

        if (isOriginal || opts.data) {
          html += columns.map(function (column, columnIndex) {
            var cellValue = ''; // v3.0 废弃 type=index

            if (column.type === 'seq' || column.type === 'index') {
              cellValue = getSeq($table, row, rowIndex, column, columnIndex);
            } else {
              cellValue = UtilTools.getCellValue(row, column) || '';
            }

            return "<td>".concat(cellValue, "</td>");
          }).join('');
        } else {
          html += columns.map(function (column) {
            return "<td>".concat(row[column.id], "</td>");
          }).join('');
        }

        html += '</tr>';
      });
    }

    html += '</tbody>';
  }

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;

    if (footers.length) {
      html += '<tfoot>';
      footers.forEach(function (rows) {
        html += "<tr>".concat(columns.map(function (column) {
          return "<td>".concat(rows[$table.$getColumnIndex(column)] || '', "</td>");
        }).join(''), "</tr>");
      });
      html += '</tfoot>';
    }
  }

  return html + '</table></body></html>';
}

function toXML($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var xml = ['<?xml version="1.0"?>', '<?mso-application progid="Excel.Sheet"?>', '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">', '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">', '<Version>16.00</Version>', '</DocumentProperties>', '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">', '<WindowHeight>7920</WindowHeight>', '<WindowWidth>21570</WindowWidth>', '<WindowTopX>32767</WindowTopX>', '<WindowTopY>32767</WindowTopY>', '<ProtectStructure>False</ProtectStructure>', '<ProtectWindows>False</ProtectWindows>', '</ExcelWorkbook>', "<Worksheet ss:Name=\"".concat(opts.sheetName, "\">"), '<Table>', columns.map(function (column) {
    return "<Column ss:Width=\"".concat(column.renderWidth, "\"/>");
  }).join('')].join('');

  if (opts.isHeader) {
    xml += "<Row>".concat(columns.map(function (column) {
      return "<Cell><Data ss:Type=\"String\">".concat(getHeaderTitle(opts, column), "</Data></Cell>");
    }).join(''), "</Row>");
  }

  datas.forEach(function (row, rowIndex) {
    xml += '<Row>';

    if (isOriginal || opts.data) {
      xml += columns.map(function (column, columnIndex) {
        // v3.0 废弃 type=index
        if (column.type === 'seq' || column.type === 'index') {
          return "<Cell><Data ss:Type=\"String\">".concat(getSeq($table, row, rowIndex, column, columnIndex), "</Data></Cell>");
        }

        return "<Cell><Data ss:Type=\"String\">".concat(UtilTools.getCellValue(row, column) || '', "</Data></Cell>");
      }).join('');
    } else {
      xml += columns.map(function (column) {
        return "<Cell><Data ss:Type=\"String\">".concat(row[column.id], "</Data></Cell>");
      }).join('');
    }

    xml += '</Row>';
  });

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    footers.forEach(function (rows) {
      xml += "<Row>".concat(columns.map(function (column) {
        return "<Cell><Data ss:Type=\"String\">".concat(rows[$table.$getColumnIndex(column) || ''], "</Data></Cell>");
      }).join(''), "</Row>");
    });
  }

  return "".concat(xml, "</Table></Worksheet></Workbook>");
}

function downloadFile($table, opts, content) {
  var filename = opts.filename,
      type = opts.type,
      download = opts.download;
  var name = "".concat(filename, ".").concat(type);

  if (window.Blob) {
    var blob = new Blob([content], {
      type: "text/".concat(type)
    });

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
      $table.$XModal.message({
        message: conf.i18n('vxe.table.expSuccess'),
        status: 'success'
      });
    }
  } else {
    UtilTools.error('vxe.error.notExp');
  }
}

function getLabelData($table, columns, datas) {
  var treeConfig = $table.treeConfig;
  return datas.map(function (row) {
    var item = {
      _hasChild: treeConfig && hasTreeChildren($table, row)
    };
    columns.forEach(function (column) {
      var cell = DomTools.getCell($table, {
        row: row,
        column: column
      });
      item[column.id] = cell ? cell.innerText.trim() : '';
    });
    return item;
  });
}

function getExportData($table, opts, fullData, oColumns) {
  var columns = opts.columns ? opts.columns : oColumns;
  var datas = opts.data || fullData;

  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod);
  }

  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod);
  }

  return {
    columns: columns,
    datas: opts.original || opts.data ? datas : getLabelData($table, columns, datas)
  };
}

function replaceDoubleQuotation(val) {
  return val.replace(/^"/, '').replace(/"$/, '');
}

function parseCsv(columns, content) {
  var list = content.split('\n');
  var fields = [];
  var rows = [];

  if (list.length) {
    var rList = list.slice(1);
    list[0].split(',').forEach(function (val) {
      var field = replaceDoubleQuotation(val);

      if (field) {
        fields.push(field);
      }
    });
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split(',').forEach(function (val, colIndex) {
          item[fields[colIndex]] = replaceDoubleQuotation(val);
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
  var fields = [];
  var rows = [];

  if (list.length) {
    var rList = list.slice(1);
    list[0].split('\t').forEach(function (field) {
      if (field) {
        fields.push(field);
      }
    });
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split('\t').forEach(function (val, colIndex) {
          item[fields[colIndex]] = replaceDoubleQuotation(val);
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
  var fields = [];
  var rows = [];

  if (bodyNodes.length) {
    var tableNodes = getElementsByTagName(bodyNodes[0], 'table');

    if (tableNodes.length) {
      var theadNodes = getElementsByTagName(tableNodes[0], 'thead');

      if (theadNodes.length) {
        xe_utils_amd_xe_utils_default.a.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), function (rowNode) {
          xe_utils_amd_xe_utils_default.a.arrayEach(getElementsByTagName(rowNode, 'th'), function (cellNode) {
            var field = cellNode.textContent;

            if (field) {
              fields.push(field);
            }
          });
        });
        var tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody');

        if (tbodyNodes.length) {
          xe_utils_amd_xe_utils_default.a.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), function (rowNode) {
            var item = {};
            xe_utils_amd_xe_utils_default.a.arrayEach(getElementsByTagName(rowNode, 'td'), function (cellNode, colIndex) {
              item[fields[colIndex]] = cellNode.textContent || '';
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
  var fields = [];
  var rows = [];

  if (sheetNodes.length) {
    var tableNodes = getElementsByTagName(sheetNodes[0], 'Table');

    if (tableNodes.length) {
      var rowNodes = getElementsByTagName(tableNodes[0], 'Row');

      if (rowNodes.length) {
        xe_utils_amd_xe_utils_default.a.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), function (cellNode) {
          var field = cellNode.textContent;

          if (field) {
            fields.push(field);
          }
        });
        xe_utils_amd_xe_utils_default.a.arrayEach(rowNodes, function (rowNode, index) {
          if (index) {
            var item = {};
            var cellNodes = getElementsByTagName(rowNode, 'Cell');
            xe_utils_amd_xe_utils_default.a.arrayEach(cellNodes, function (cellNode, colIndex) {
              item[fields[colIndex]] = cellNode.textContent;
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

function getElementsByTagName(elem, qualifiedName) {
  return elem.getElementsByTagName(qualifiedName);
}
/**
 * 检查导入的列是否完整
 * @param {Array} fields 字段名列表
 * @param {Array} rows 数据列表
 */


function checkImportData(columns, fields, rows) {
  var tableFields = [];
  columns.forEach(function (column) {
    var field = column.property;

    if (field) {
      tableFields.push(field);
    }
  });
  return tableFields.every(function (field) {
    return xe_utils_amd_xe_utils_default.a.includes(fields, field);
  });
}

function handleImport($table, content, opts) {
  var tableFullColumn = $table.tableFullColumn,
      _importResolve = $table._importResolve;
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
  var status = checkImportData(tableFullColumn, fields, rows);

  if (status) {
    $table.createData(rows).then(function (data) {
      if (opts.mode === 'append') {
        $table.insertAt(data, -1);
      } else {
        $table.reloadData(data);
      }
    });

    if (opts.message !== false) {
      $table.$XModal.message({
        message: conf.i18n('vxe.table.impSuccess'),
        status: 'success'
      });
    }
  } else if (opts.message !== false) {
    $table.$XModal.message({
      message: conf.i18n('vxe.error.impFields'),
      status: 'error'
    });
  }

  if (_importResolve) {
    _importResolve(status);

    $table._importResolve = null;
  }
}

/* harmony default export */ var export_src_mixin = ({
  methods: {
    // 在 v3.0 中废弃 exportCsv 方法
    _exportCsv: function _exportCsv(options) {
      UtilTools.warn('vxe.error.delFunc', ['exportCsv', 'exportData']);
      return this.exportData(options);
    },
    _openExport: function _openExport(options) {
      if (this.$toolbar) {
        return this.$toolbar.openExport(options);
      }

      throw new Error(UtilTools.getLog('vxe.error.barUnableLink'));
    },

    /**
     * 导出文件，支持 csv/html/xml
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     * @param {Object} options 参数
     */
    _exportData: function _exportData(options) {
      var visibleColumn = this.visibleColumn,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;
      var opts = Object.assign({
        filename: '',
        sheetName: '',
        original: !!treeConfig,
        message: false,
        isHeader: true,
        isFooter: true,
        download: true,
        type: 'csv',
        data: null,
        columns: null,
        // 在 v3.0 中废弃 type=selection
        columnFilterMethod: options.columns ? null : function (column) {
          return ['seq', 'index'].indexOf(column.type) > -1 || column.property;
        },
        dataFilterMethod: null,
        footerFilterMethod: null
      }, conf.export, options);

      if (!opts.filename) {
        opts.filename = 'export';
      }

      if (!opts.sheetName) {
        opts.sheetName = 'Sheet1';
      }

      if (!xe_utils_amd_xe_utils_default.a.includes(v_x_e_table.exportTypes, opts.type)) {
        throw new Error(UtilTools.getLog('vxe.error.notType', [opts.type]));
      }

      if (!opts.original) {
        if (scrollXLoad || scrollYLoad) {
          opts.original = true;
          UtilTools.warn('vxe.error.scrollOriginal');
        }
      }

      var columns = visibleColumn;
      var fullData = this.tableFullData;

      if (treeConfig) {
        fullData = xe_utils_amd_xe_utils_default.a.toTreeArray(fullData, treeOpts);
      }

      return handleExport(this, opts, columns, fullData);
    },
    _openImport: function _openImport(options) {
      if (this.$toolbar) {
        return this.$toolbar.openImport(options);
      }

      throw new Error(UtilTools.getLog('vxe.error.barUnableLink'));
    },
    _importByFile: function _importByFile(file, opts) {
      var _this = this;

      if (window.FileReader) {
        var _UtilTools$parseFile = UtilTools.parseFile(file),
            type = _UtilTools$parseFile.type,
            filename = _UtilTools$parseFile.filename;

        var options = Object.assign({
          mode: 'covering'
        }, opts, {
          type: type,
          filename: filename
        });
        var types = options.types || v_x_e_table.importTypes;

        if (xe_utils_amd_xe_utils_default.a.includes(types, type)) {
          this.preventEvent(null, 'event.import', {
            $table: this,
            file: file,
            options: options,
            columns: this.tableFullColumn
          }, function () {
            var reader = new FileReader();

            reader.onerror = function (e) {
              UtilTools.error('vxe.error.notType', [type]);
            };

            reader.onload = function (e) {
              handleImport(_this, e.target.result.trim(), options);
            };

            reader.readAsText(file, 'UTF-8');
          });
        } else {
          UtilTools.error('vxe.error.notType', [type]);
        }
      } else {
        UtilTools.error('vxe.error.notExp');
      }
    },
    _importData: function _importData(options) {
      var _this2 = this;

      var opts = Object.assign({}, conf.import, options);
      var rest = new Promise(function (resolve, reject) {
        _this2._importResolve = resolve;
        _this2._importReject = reject;
      });
      this.readFile(opts).then(function (evnt) {
        return _this2.importByFile(evnt.target.files[0], opts);
      }).catch(function (evnt) {
        _this2._importReject(evnt);

        _this2._importReject = null;
      });
      return rest;
    },
    _readFile: function _readFile() {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!fileForm.parentNode) {
        document.body.appendChild(fileForm);
      }

      var types = options.types || v_x_e_table.importTypes;

      if (options.multiple) {
        fileInput.multiple = 'multiple';
      }

      fileInput.accept = ".".concat(types.join(', .'));

      fileInput.onchange = function (evnt) {
        var _UtilTools$parseFile2 = UtilTools.parseFile(evnt.target.files[0]),
            type = _UtilTools$parseFile2.type;

        if (xe_utils_amd_xe_utils_default.a.includes(types, type)) {
          _this3._fileResolve(evnt);
        } else {
          if (options.message !== false) {
            _this3.$XModal.message({
              message: xe_utils_amd_xe_utils_default.a.template(conf.i18n('vxe.error.notType'), [type]),
              status: 'error'
            });
          }

          _this3._fileReject(evnt);
        }

        _this3._fileResolve = null;
      };

      fileForm.reset();
      fileInput.click();
      return new Promise(function (resolve, reject) {
        _this3._fileResolve = resolve;
        _this3._fileReject = reject;
      });
    },
    _print: function _print(options) {
      this.exportData(Object.assign({
        original: this.scrollXLoad || this.scrollYLoad
      }, options, {
        type: 'html',
        download: false
      })).then(function (_ref) {
        var content = _ref.content,
            blob = _ref.blob;

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
      });
    }
  }
});
// CONCATENATED MODULE: ./packages/export/index.js






var Export = {
  install: function install(Vue) {
    v_x_e_table.reg('export');
    Object.assign(v_x_e_table.types, {
      csv: 1,
      html: 1,
      xml: 1,
      txt: 1
    });
    packages_table.mixins.push(export_src_mixin);
    Vue.component(export_panel.name, export_panel);
    Vue.component(import_panel.name, import_panel);
  }
};
/* harmony default export */ var packages_export = (Export);
// CONCATENATED MODULE: ./packages/keyboard/src/mixin.js








/* harmony default export */ var keyboard_src_mixin = ({
  methods: {
    // 处理 Tab 键移动
    moveTabSelected: function moveTabSelected(args, isLeft, evnt) {
      var _this = this;

      var afterFullData = this.afterFullData,
          visibleColumn = this.visibleColumn,
          editConfig = this.editConfig,
          isSeqColumn = this.isSeqColumn;
      var targetRow;
      var targetRowIndex;
      var targetColumn;
      var targetColumnIndex;
      var params = Object.assign({}, args);
      var rowIndex = afterFullData.indexOf(params.row);
      var columnIndex = visibleColumn.indexOf(params.column);
      evnt.preventDefault();

      if (isLeft) {
        // 向左
        for (var len = columnIndex - 1; len >= 0; len--) {
          if (!isSeqColumn(visibleColumn[len])) {
            targetColumnIndex = len;
            targetColumn = visibleColumn[len];
            break;
          }
        }

        if (!targetColumn && rowIndex > 0) {
          // 如果找不到从上一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex - 1;
          targetRow = afterFullData[targetRowIndex];

          for (var _len = visibleColumn.length - 1; _len >= 0; _len--) {
            if (!isSeqColumn(visibleColumn[_len])) {
              targetColumnIndex = _len;
              targetColumn = visibleColumn[_len];
              break;
            }
          }
        }
      } else {
        // 向右
        for (var index = columnIndex + 1; index < visibleColumn.length; index++) {
          if (!isSeqColumn(visibleColumn[index])) {
            targetColumnIndex = index;
            targetColumn = visibleColumn[index];
            break;
          }
        }

        if (!targetColumn && rowIndex < afterFullData.length - 1) {
          // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex + 1;
          targetRow = afterFullData[targetRowIndex];

          for (var _index = 0; _index < visibleColumn.length; _index++) {
            if (!isSeqColumn(visibleColumn[_index])) {
              targetColumnIndex = _index;
              targetColumn = visibleColumn[_index];
              break;
            }
          }
        }
      }

      if (targetColumn) {
        if (targetRow) {
          params.rowIndex = targetRowIndex;
          params.row = targetRow;
        } else {
          params.rowIndex = rowIndex;
        }

        params.columnIndex = targetColumnIndex;
        params.column = targetColumn;
        params.cell = DomTools.getCell(this, params);

        if (editConfig) {
          if (editConfig.trigger === 'click' || editConfig.trigger === 'dblclick') {
            if (editConfig.mode === 'row') {
              this.handleActived(params, evnt);
            } else {
              this.scrollToRow(params.row, params.column).then(function () {
                return _this.handleSelected(params, evnt);
              });
            }
          }
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

      if (treeConfig) {
        var _XEUtils$findTree = xe_utils_amd_xe_utils_default.a.findTree(afterFullData, function (item) {
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
        var rowIndex = afterFullData.indexOf(currentRow);

        if (isUpArrow && rowIndex > 0) {
          targetRow = afterFullData[rowIndex - 1];
        } else if (isDwArrow && rowIndex < afterFullData.length - 1) {
          targetRow = afterFullData[rowIndex + 1];
        }
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
          visibleColumn = this.visibleColumn,
          isSeqColumn = this.isSeqColumn;
      var params = Object.assign({}, args);
      evnt.preventDefault();

      if (isUpArrow && params.rowIndex) {
        params.rowIndex -= 1;
        params.row = afterFullData[params.rowIndex];
      } else if (isDwArrow && params.rowIndex < afterFullData.length - 1) {
        params.rowIndex += 1;
        params.row = afterFullData[params.rowIndex];
      } else if (isLeftArrow && params.columnIndex) {
        for (var len = params.columnIndex - 1; len >= 0; len--) {
          if (!isSeqColumn(visibleColumn[len])) {
            params.columnIndex = len;
            params.column = visibleColumn[len];
            break;
          }
        }
      } else if (isRightArrow) {
        for (var index = params.columnIndex + 1; index < visibleColumn.length; index++) {
          if (!isSeqColumn(visibleColumn[index])) {
            params.columnIndex = index;
            params.column = visibleColumn[index];
            break;
          }
        }
      }

      this.scrollToRow(params.row, params.column).then(function () {
        params.cell = DomTools.getCell(_this3, params);

        _this3.handleSelected(params, evnt);
      });
    },

    /**
     * 表头按下事件
     */
    triggerHeaderCellMousedownEvent: function triggerHeaderCellMousedownEvent(evnt, params) {
      var $el = this.$el,
          tableData = this.tableData,
          _this$mouseConfig = this.mouseConfig,
          mouseConfig = _this$mouseConfig === void 0 ? {} : _this$mouseConfig,
          elemStore = this.elemStore,
          handleChecked = this.handleChecked,
          handleHeaderChecked = this.handleHeaderChecked;
      var button = evnt.button;
      var column = params.column,
          cell = params.cell;
      var isLeftBtn = button === 0; // v3.0 废弃 type=index

      var isIndex = column.type === 'seq' || column.type === 'index';

      if (isLeftBtn && mouseConfig.checked) {
        var headerList = elemStore['main-header-list'].children;
        var bodyList = elemStore['main-body-list'].children;

        if (isIndex) {
          this.handleAllChecked(evnt);
        } else {
          evnt.preventDefault();
          evnt.stopPropagation();
          this.clearSelected(evnt);
          this.clearHeaderChecked();
          this.clearIndexChecked();
          var domMousemove = document.onmousemove;
          var domMouseup = document.onmouseup;
          var startCell = bodyList[0].querySelector(".".concat(column.id));
          var updateEvent = xe_utils_amd_xe_utils_default.a.throttle(function (evnt) {
            evnt.preventDefault();

            var _DomTools$getEventTar = DomTools.getEventTargetNode(evnt, $el, 'vxe-header--column'),
                flag = _DomTools$getEventTar.flag,
                targetElem = _DomTools$getEventTar.targetElem;

            if (!flag) {
              var a = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column');
              flag = a.flag;
              targetElem = a.targetElem;
            }

            if (flag && !DomTools.hasClass(targetElem, 'col--index')) {
              var colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem);
              var endCell = bodyList[bodyList.length - 1].children[colIndex];
              var head = headerList[0].children[colIndex];
              handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(head), DomTools.getCellNodeIndex(cell)));
              handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)));
            }
          }, 80, {
            leading: true,
            trailing: true
          });
          DomTools.addClass($el, 'c--checked');
          document.onmousemove = updateEvent;

          document.onmouseup = function () {
            DomTools.removeClass($el, 'c--checked');
            document.onmousemove = domMousemove;
            document.onmouseup = domMouseup;
          };

          handleHeaderChecked([[cell]]);

          if (bodyList.length) {
            var endCell = bodyList[bodyList.length - 1].querySelector(".".concat(column.id));
            var firstTrElem = bodyList[0];
            var lastTrElem = bodyList[bodyList.length - 1];
            var firstCell = firstTrElem.querySelector(".col--index");
            params.rowIndex = 0;
            params.row = tableData[0];
            params.cell = DomTools.getCell(this, params);
            this.handleSelected(params, evnt);
            this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(lastTrElem.querySelector(".col--index"))));
            this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)));
          }
        }

        this.closeMenu();
      }

      this.isActivated = true;
    },

    /**
     * 单元格按下事件
     */
    triggerCellMousedownEvent: function triggerCellMousedownEvent(evnt, params) {
      var $el = this.$el,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore,
          editConfig = this.editConfig,
          handleSelected = this.handleSelected,
          _this$mouseConfig2 = this.mouseConfig,
          mouseConfig = _this$mouseConfig2 === void 0 ? {} : _this$mouseConfig2,
          handleChecked = this.handleChecked,
          handleIndexChecked = this.handleIndexChecked,
          handleHeaderChecked = this.handleHeaderChecked,
          elemStore = this.elemStore;
      var checked = editStore.checked,
          actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var button = evnt.button;
      var isLeftBtn = button === 0;

      if (editConfig) {
        if (actived.row !== row || !(editConfig.mode === 'cell' && actived.column === column)) {
          if (isLeftBtn && mouseConfig.checked) {
            evnt.preventDefault();
            evnt.stopPropagation();
            this.clearHeaderChecked();
            this.clearIndexChecked();
            var domMousemove = document.onmousemove;
            var domMouseup = document.onmouseup;
            var startCellNode = DomTools.getCellNodeIndex(cell); // v3.0 废弃 type=index

            var isIndex = column.type === 'seq' || column.type === 'index';
            var bodyList = elemStore['main-body-list'].children;
            var headerList = elemStore['main-header-list'].children;
            var cellLastElementChild = cell.parentNode.lastElementChild;
            var cellFirstElementChild = cell.parentNode.firstElementChild;
            var colIndex = [].indexOf.call(cell.parentNode.children, cell);
            var headStart = headerList[0].children[colIndex];
            var updateEvent = xe_utils_amd_xe_utils_default.a.throttle(function (evnt) {
              evnt.preventDefault();

              var _DomTools$getEventTar2 = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column'),
                  flag = _DomTools$getEventTar2.flag,
                  targetElem = _DomTools$getEventTar2.targetElem;

              if (flag) {
                if (isIndex) {
                  var firstCell = targetElem.parentNode.firstElementChild;
                  handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)));
                  handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)));
                } else if (!DomTools.hasClass(targetElem, 'col--index')) {
                  var _firstCell = targetElem.parentNode.firstElementChild;

                  var _colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem);

                  var head = headerList[0].children[_colIndex];
                  handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(head), DomTools.getCellNodeIndex(headStart)));
                  handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(_firstCell), DomTools.getCellNodeIndex(cellFirstElementChild)));
                  handleChecked(DomTools.getRowNodes(bodyList, startCellNode, DomTools.getCellNodeIndex(targetElem)));
                }
              }
            }, 80, {
              leading: true,
              trailing: true
            });
            document.onmousemove = updateEvent;

            document.onmouseup = function (evnt) {
              document.onmousemove = domMousemove;
              document.onmouseup = domMouseup;
            };

            if (isIndex) {
              var firstCell = cell.parentNode.firstElementChild;
              params.columnIndex++;
              params.column = visibleColumn[params.columnIndex];
              params.cell = cell.nextElementSibling;
              handleSelected(params, evnt);
              handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)));
              handleHeaderChecked([headerList[0].querySelectorAll('.vxe-header--column:not(.col--index)')]);
              handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)));
            } else {
              var _firstCell2 = cell.parentNode.firstElementChild;
              handleSelected(params, evnt);
              handleHeaderChecked([[headerList[0].querySelector(".".concat(column.id))]]);
              handleIndexChecked([[_firstCell2]]);
            }

            this.closeFilter();
            this.closeMenu();
          } else if (mouseConfig.selected) {
            // 除了双击其他都没有选中状态
            if (editConfig.trigger === 'dblclick') {
              // 如果不在所有选中的范围之内则重新选中
              if (!checked.rowNodes || !checked.rowNodes.some(function (list) {
                return xe_utils_amd_xe_utils_default.a.includes(list, cell);
              })) {
                handleSelected(params, evnt);
              }
            }
          }
        }
      } else if (mouseConfig.selected) {
        handleSelected(params, evnt);
      }

      this.isActivated = true;
    },

    /**
     * 边角事件
     */
    // triggerCornerMousedownEvent (params, evnt) {
    //   evnt.preventDefault()
    //   evnt.stopPropagation()
    //   let { $el, tableData, visibleColumn, editStore, editConfig, handleTempChecked } = this
    //   let { checked } = editStore
    //   let { button } = evnt
    //   let isLeftBtn = button === 0
    //   let isRightBtn = button === 2
    //   if (isLeftBtn || isRightBtn) {
    //     if (editConfig && checked.rows.length && editConfig.trigger === 'dblclick') {
    //       let domMousemove = document.onmousemove
    //       let domMouseup = document.onmouseup
    //       let start = {
    //         rowIndex: tableData.indexOf(checked.rows[0]),
    //         columnIndex: visibleColumn.indexOf(checked.columns[0])
    //       }
    //       let updateEvent = XEUtils.throttle(function (evnt) {
    //         evnt.preventDefault()
    //         let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
    //         if (flag) {
    //           handleTempChecked(start, DomTools.getCellIndexs(targetElem), evnt)
    //         }
    //       }, browse.msie ? 80 : 40, { leading: true, trailing: true })
    //       document.onmousemove = updateEvent
    //       document.onmouseup = function (evnt) {
    //         document.onmousemove = domMousemove
    //         document.onmouseup = domMouseup
    //         checked.rows = checked.tRows
    //         checked.columns = checked.tColumns
    //       }
    //     }
    //   }
    // },

    /**
     * 清除所有选中状态
     */
    _clearChecked: function _clearChecked(evnt) {
      var $refs = this.$refs,
          editStore = this.editStore,
          mouseConfig = this.mouseConfig;
      var checked = editStore.checked;

      if (mouseConfig && mouseConfig.checked) {
        var tableBody = $refs.tableBody;
        checked.rows = [];
        checked.columns = [];
        checked.tRows = [];
        checked.tColumns = [];
        var checkBorders = tableBody.$refs.checkBorders;
        checkBorders.style.display = 'none';
        xe_utils_amd_xe_utils_default.a.arrayEach(tableBody.$el.querySelectorAll('.col--checked'), function (elem) {
          return DomTools.removeClass(elem, 'col--checked');
        });
      }

      return this.$nextTick();
    },
    _getMouseSelecteds: function _getMouseSelecteds() {
      var _this$editStore$selec = this.editStore.selected,
          args = _this$editStore$selec.args,
          column = _this$editStore$selec.column;

      if (args && column) {
        return Object.assign({}, args);
      }

      return null;
    },
    _getMouseCheckeds: function _getMouseCheckeds() {
      var _this4 = this;

      var checked = this.editStore.checked;
      var _checked$rowNodes = checked.rowNodes,
          rowNodes = _checked$rowNodes === void 0 ? [] : _checked$rowNodes;
      var columns = [];
      var rows = [];

      if (rowNodes && rowNodes.length) {
        rows = rowNodes.map(function (list) {
          return _this4.getRowNode(list[0].parentNode).item;
        });
        columns = rowNodes[0].map(function (cell) {
          return _this4.getColumnNode(cell).item;
        });
      }

      return {
        columns: columns,
        rows: rows,
        rowNodes: rowNodes
      };
    },

    /**
     * 处理所有选中
     */
    handleChecked: function handleChecked(rowNodes) {
      var checked = this.editStore.checked;
      this.clearChecked();
      var cWidth = -2;
      var cHeight = -2;
      var offsetTop = 0;
      var offsetLeft = 0;
      xe_utils_amd_xe_utils_default.a.arrayEach(rowNodes, function (rows, rowIndex) {
        var isTop = rowIndex === 0;
        xe_utils_amd_xe_utils_default.a.arrayEach(rows, function (elem, colIndex) {
          var isLeft = colIndex === 0;

          if (isLeft && isTop) {
            offsetTop = elem.offsetTop;
            offsetLeft = elem.offsetLeft;
          }

          if (isTop) {
            cWidth += elem.offsetWidth;
          }

          if (isLeft) {
            cHeight += elem.offsetHeight;
          }

          DomTools.addClass(elem, 'col--checked');
        });
      });
      var _this$$refs$tableBody = this.$refs.tableBody.$refs,
          checkBorders = _this$$refs$tableBody.checkBorders,
          checkTop = _this$$refs$tableBody.checkTop,
          checkRight = _this$$refs$tableBody.checkRight,
          checkBottom = _this$$refs$tableBody.checkBottom,
          checkLeft = _this$$refs$tableBody.checkLeft;
      checkBorders.style.display = 'block';
      Object.assign(checkTop.style, {
        top: "".concat(offsetTop, "px"),
        left: "".concat(offsetLeft, "px"),
        width: "".concat(cWidth, "px")
      });
      Object.assign(checkRight.style, {
        top: "".concat(offsetTop, "px"),
        left: "".concat(offsetLeft + cWidth, "px"),
        height: "".concat(cHeight, "px")
      });
      Object.assign(checkBottom.style, {
        top: "".concat(offsetTop + cHeight, "px"),
        left: "".concat(offsetLeft, "px"),
        width: "".concat(cWidth, "px")
      });
      Object.assign(checkLeft.style, {
        top: "".concat(offsetTop, "px"),
        left: "".concat(offsetLeft, "px"),
        height: "".concat(cHeight, "px")
      });
      checked.rowNodes = rowNodes;
    },
    handleAllChecked: function handleAllChecked(evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          _this$mouseConfig3 = this.mouseConfig,
          mouseConfig = _this$mouseConfig3 === void 0 ? {} : _this$mouseConfig3,
          elemStore = this.elemStore;

      if (mouseConfig.checked) {
        evnt.preventDefault();
        var headerListElem = elemStore['main-header-list'];
        var headerList = headerListElem.children;
        var bodyList = elemStore['main-body-list'].children; // v3.0 废弃 type=index

        var column = xe_utils_amd_xe_utils_default.a.find(visibleColumn, function (column) {
          return column.type === 'seq' || column.type === 'index';
        }) || visibleColumn[0];
        var cell = headerListElem.querySelector(".".concat(column.id));
        var firstTrElem = bodyList[0];
        var lastTrElem = bodyList[bodyList.length - 1];
        var firstCell = firstTrElem.querySelector(".".concat(column.id));
        var params = {
          $table: this,
          rowIndex: 0,
          row: tableData[0],
          column: xe_utils_amd_xe_utils_default.a.find(visibleColumn, function (column) {
            return column.property;
          })
        };
        params.columnIndex = this.getColumnIndex(params.column);
        params.cell = DomTools.getCell(this, params);
        this.handleSelected(params, evnt);
        this.handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(cell.nextElementSibling), DomTools.getCellNodeIndex(cell.parentNode.lastElementChild)));
        this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(lastTrElem.querySelector(".".concat(column.id)))));
        this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(lastTrElem.lastElementChild)));
      }
    },
    handleIndexChecked: function handleIndexChecked(rowNodes) {
      var indexs = this.editStore.indexs;
      this.clearIndexChecked();
      xe_utils_amd_xe_utils_default.a.arrayEach(rowNodes, function (rows) {
        xe_utils_amd_xe_utils_default.a.arrayEach(rows, function (elem) {
          DomTools.addClass(elem, 'col--index-checked');
        });
      });
      indexs.rowNodes = rowNodes;
    },
    _clearIndexChecked: function _clearIndexChecked() {
      var elemStore = this.elemStore;
      var bodyElem = elemStore['main-body-list'];
      xe_utils_amd_xe_utils_default.a.arrayEach(bodyElem.querySelectorAll('.col--index-checked'), function (elem) {
        return DomTools.removeClass(elem, 'col--index-checked');
      });
      return this.$nextTick();
    },
    handleHeaderChecked: function handleHeaderChecked(rowNodes) {
      var titles = this.editStore.titles;
      this.clearHeaderChecked();
      xe_utils_amd_xe_utils_default.a.arrayEach(rowNodes, function (rows) {
        xe_utils_amd_xe_utils_default.a.arrayEach(rows, function (elem) {
          DomTools.addClass(elem, 'col--title-checked');
        });
      });
      titles.rowNodes = rowNodes;
    },
    _clearHeaderChecked: function _clearHeaderChecked() {
      var elemStore = this.elemStore;
      var headerElem = elemStore['main-header-list'];

      if (headerElem) {
        xe_utils_amd_xe_utils_default.a.arrayEach(headerElem.querySelectorAll('.col--title-checked'), function (elem) {
          return DomTools.removeClass(elem, 'col--title-checked');
        });
      }

      return this.$nextTick();
    },

    /**
     * 处理所有选中的临时选中
     */
    // handleTempChecked (start, end, evnt) {
    //   let { tableData, visibleColumn, editStore } = this
    //   let { checked } = editStore
    //   let { rows, tRows, columns, tColumns } = checked
    //   let { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
    //   let { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
    //   if (tRows.length > rows.length) {
    //     eColumnIndex = visibleColumn.indexOf(columns[columns.length - 1])
    //   } else if (tColumns.length > columns.length) {
    //     eRowIndex = tableData.indexOf(rows[rows.length - 1])
    //   }
    //   if (sRowIndex < eRowIndex) {
    //     // 向下
    //     checked.tRows = tableData.slice(sRowIndex, eRowIndex + 1)
    //   } else {
    //     // 向上
    //     sRowIndex += rows.length
    //     checked.tRows = tableData.slice(eRowIndex, sRowIndex)
    //   }
    //   if (sColumnIndex < eColumnIndex) {
    //     // 向右
    //     checked.tColumns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1)
    //   } else {
    //     // 向左
    //     sColumnIndex += columns.length
    //     checked.tColumns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex)
    //   }
    // },

    /**
     * 清空已复制的内容
     */
    _clearCopyed: function _clearCopyed() {
      var $refs = this.$refs,
          editStore = this.editStore,
          keyboardConfig = this.keyboardConfig;
      var copyed = editStore.copyed;

      if (keyboardConfig && keyboardConfig.isCut) {
        var tableBody = $refs.tableBody;
        var copyBorders = $refs.tableBody.$refs.copyBorders;
        copyed.cut = false;
        copyed.rows = [];
        copyed.columns = [];
        copyBorders.style.display = 'none';
        xe_utils_amd_xe_utils_default.a.arrayEach(tableBody.$el.querySelectorAll('.col--copyed'), function (elem) {
          return DomTools.removeClass(elem, 'col--copyed');
        });
      }

      return this.$nextTick();
    },

    /**
     * 处理复制
     */
    handleCopyed: function handleCopyed(cut, evnt) {
      var tableData = this.tableData,
          tableColumn = this.tableColumn,
          editStore = this.editStore;
      var copyed = editStore.copyed,
          checked = editStore.checked;
      var rowNodes = checked.rowNodes;
      this.clearCopyed();
      var cWidth = -3;
      var cHeight = -3;
      var offsetTop = 0;
      var offsetLeft = 0;
      var columns = [];
      var rows = [];

      if (rowNodes.length) {
        var firstRows = rowNodes[0];

        var _DomTools$getCellNode = DomTools.getCellNodeIndex(firstRows[0]),
            rowIndex = _DomTools$getCellNode.rowIndex,
            columnIndex = _DomTools$getCellNode.columnIndex;

        columns = tableColumn.slice(columnIndex, columnIndex + firstRows.length);
        rows = tableData.slice(rowIndex, rowIndex + rowNodes.length);
      }

      xe_utils_amd_xe_utils_default.a.arrayEach(rowNodes, function (rows, rowIndex) {
        var isTop = rowIndex === 0;
        xe_utils_amd_xe_utils_default.a.arrayEach(rows, function (elem, colIndex) {
          var isLeft = colIndex === 0;

          if (isLeft && isTop) {
            offsetTop = elem.offsetTop;
            offsetLeft = elem.offsetLeft;
          }

          if (isTop) {
            cWidth += elem.offsetWidth;
          }

          if (isLeft) {
            cHeight += elem.offsetHeight;
          }

          DomTools.addClass(elem, 'col--copyed');
        });
      });
      var _this$$refs$tableBody2 = this.$refs.tableBody.$refs,
          copyBorders = _this$$refs$tableBody2.copyBorders,
          copyTop = _this$$refs$tableBody2.copyTop,
          copyRight = _this$$refs$tableBody2.copyRight,
          copyBottom = _this$$refs$tableBody2.copyBottom,
          copyLeft = _this$$refs$tableBody2.copyLeft;
      copyBorders.style.display = 'block';
      Object.assign(copyTop.style, {
        top: "".concat(offsetTop, "px"),
        left: "".concat(offsetLeft, "px"),
        width: "".concat(cWidth, "px")
      });
      Object.assign(copyRight.style, {
        top: "".concat(offsetTop, "px"),
        left: "".concat(offsetLeft + cWidth, "px"),
        height: "".concat(cHeight, "px")
      });
      Object.assign(copyBottom.style, {
        top: "".concat(offsetTop + cHeight, "px"),
        left: "".concat(offsetLeft, "px"),
        width: "".concat(cWidth, "px")
      });
      Object.assign(copyLeft.style, {
        top: "".concat(offsetTop, "px"),
        left: "".concat(offsetLeft, "px"),
        height: "".concat(cHeight, "px")
      });
      copyed.cut = cut;
      copyed.rows = rows;
      copyed.columns = columns;
      copyed.rowNodes = rowNodes;
    },

    /**
     * 处理粘贴
     */
    handlePaste: function handlePaste(evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore,
          elemStore = this.elemStore;
      var copyed = editStore.copyed,
          selected = editStore.selected;
      var cut = copyed.cut,
          rows = copyed.rows,
          columns = copyed.columns;

      if (rows.length && columns.length && selected.row && selected.column) {
        var _selected$args = selected.args,
            rowIndex = _selected$args.rowIndex,
            columnIndex = _selected$args.columnIndex;
        xe_utils_amd_xe_utils_default.a.arrayEach(rows, function (row, rIndex) {
          var offsetRow = tableData[rowIndex + rIndex];

          if (offsetRow) {
            xe_utils_amd_xe_utils_default.a.arrayEach(columns, function (column, cIndex) {
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

        var bodyList = elemStore['main-body-list'].children;
        var cell = selected.args.cell;
        var trElem = cell.parentNode;
        var colIndex = xe_utils_amd_xe_utils_default.a.arrayIndexOf(trElem.children, cell);
        var rIndex = xe_utils_amd_xe_utils_default.a.arrayIndexOf(bodyList, trElem);
        var targetTrElem = bodyList[rIndex + rows.length - 1];
        var targetCell = targetTrElem.children[colIndex + columns.length - 1];
        this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(cell), DomTools.getCellNodeIndex(targetCell)));
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
/* harmony default export */ var keyboard = (Keyboard);
// CONCATENATED MODULE: ./packages/validator/src/mixin.js













var mixin_Rule =
/*#__PURE__*/
function () {
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

/* harmony default export */ var validator_src_mixin = ({
  methods: {
    /**
     * 与 validate 一致行为，区别就是会校验所有并返回所有不通过的所有列
     */
    _fullValidate: function _fullValidate(rows, cb) {
      return this.beginValidate(rows, cb, true);
    },

    /**
     * 对表格数据进行校验
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
        UtilTools.emitEvent(this, 'valid-error', [params]);
      } else {
        this.handleActived(params, {
          type: 'valid-error',
          trigger: 'call'
        }).then(function () {
          return _this.showValidTooltip(params);
        });
      }
    },

    /**
     * 对表格数据进行校验
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    beginValidate: function beginValidate(rows, cb, isAll) {
      var _this2 = this;

      var validRest = {};
      var status = true;
      var editRules = this.editRules,
          afterFullData = this.afterFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;
      var vaildDatas = afterFullData;

      if (rows) {
        if (xe_utils_amd_xe_utils_default.a.isFunction(rows)) {
          cb = rows;
        } else {
          vaildDatas = xe_utils_amd_xe_utils_default.a.isArray(rows) ? rows : [rows];
        }
      }

      var rowValids = [];
      this.lastCallTime = Date.now();
      this.clearValidate();

      if (editRules) {
        var columns = this.getColumns();

        var handleVaild = function handleVaild(row) {
          var colVailds = [];
          columns.forEach(function (column, columnIndex) {
            if (xe_utils_amd_xe_utils_default.a.has(editRules, column.property)) {
              colVailds.push(new Promise(function (resolve, reject) {
                _this2.validCellRules('all', row, column).then(resolve).catch(function (_ref) {
                  var _rest;

                  var rule = _ref.rule,
                      rules = _ref.rules;
                  var rest = (_rest = {
                    rule: rule,
                    rules: rules
                  }, _defineProperty(_rest, "".concat(treeConfig ? '$' : '', "rowIndex"), _this2.getRowIndex(row)), _defineProperty(_rest, "row", row), _defineProperty(_rest, "columnIndex", columnIndex), _defineProperty(_rest, "column", column), _defineProperty(_rest, "$table", _this2), _rest);

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
        };

        if (treeConfig) {
          xe_utils_amd_xe_utils_default.a.eachTree(vaildDatas, handleVaild, treeOpts);
        } else {
          vaildDatas.forEach(handleVaild);
        }

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
              status = false;

              if (cb) {
                cb(status, args);
                resolve();
              } else {
                reject(args);
              }
            };

            var posAndFinish = function posAndFinish() {
              params.cell = DomTools.getCell(_this2, params);

              _this2.handleValidError(params);

              finish();
            };
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */


            var row = params.row;
            var rowIndex = afterFullData.indexOf(row);
            var locatRow = rowIndex > 0 ? afterFullData[rowIndex - 1] : row;
            DomTools.toView(_this2.$el);

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
        cb(status);
      }

      return Promise.resolve();
    },
    hasCellRules: function hasCellRules(type, row, column) {
      var editRules = this.editRules;
      var property = column.property;

      if (property && editRules) {
        var rules = xe_utils_amd_xe_utils_default.a.get(editRules, property);
        return rules && xe_utils_amd_xe_utils_default.a.find(rules, function (rule) {
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
    validCellRules: function validCellRules(type, row, column, val) {
      var _this3 = this;

      var editRules = this.editRules,
          treeConfig = this.treeConfig;
      var property = column.property;
      var errorRules = [];
      var cellVailds = [];

      if (property && editRules) {
        var rules = xe_utils_amd_xe_utils_default.a.get(editRules, property);
        var cellValue = xe_utils_amd_xe_utils_default.a.isUndefined(val) ? xe_utils_amd_xe_utils_default.a.get(row, property) : val;

        if (rules) {
          rules.forEach(function (rule) {
            cellVailds.push(new Promise(function (resolve) {
              var isRequired = rule.required === true;

              if (type === 'all' || !rule.trigger || type === rule.trigger) {
                if (xe_utils_amd_xe_utils_default.a.isFunction(rule.validator)) {
                  var _rule$validator;

                  rule.validator(rule, cellValue, function (e) {
                    if (xe_utils_amd_xe_utils_default.a.isError(e)) {
                      var cusRule = {
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e.message,
                        rule: new mixin_Rule(rule)
                      };
                      errorRules.push(new mixin_Rule(cusRule));
                    }

                    return resolve();
                  }, (_rule$validator = {
                    rules: rules,
                    row: row,
                    column: column
                  }, _defineProperty(_rule$validator, "".concat(treeConfig ? '$' : '', "rowIndex"), _this3.getRowIndex(row)), _defineProperty(_rule$validator, "columnIndex", _this3.getColumnIndex(column)), _rule$validator));
                } else {
                  var len;
                  var restVal = cellValue;
                  var isNumber = rule.type === 'number';
                  var isEmpty = cellValue === null || cellValue === undefined || cellValue === '';

                  if (isNumber) {
                    restVal = xe_utils_amd_xe_utils_default.a.toNumber(cellValue);
                  } else {
                    len = xe_utils_amd_xe_utils_default.a.getSize(restVal);
                  }

                  if (isRequired && isEmpty) {
                    errorRules.push(new mixin_Rule(rule));
                  } else if (isNumber && isNaN(cellValue) || xe_utils_amd_xe_utils_default.a.isRegExp(rule.pattern) && !rule.pattern.test(cellValue) || xe_utils_amd_xe_utils_default.a.isNumber(rule.min) && (isNumber ? restVal < rule.min : len < rule.min) || xe_utils_amd_xe_utils_default.a.isNumber(rule.max) && (isNumber ? restVal > rule.max : len > rule.max)) {
                    errorRules.push(new mixin_Rule(rule));
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
          }).catch(function (_ref3) {
            var rule = _ref3.rule;

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

        UtilTools.emitEvent(_this5, 'valid-error', [params]);
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
// CONCATENATED MODULE: ./packages/resize/src/resize.js








/**
 * 监听 resize 事件
 * 如果项目中已使用了 resize-observer-polyfill，那么只需要将方法定义全局，该组件就会自动使用
 */

var resizeTimeout;
var resize_eventStore = [];
var defaultInterval = 250;

var resize_ResizeObserverPolyfill =
/*#__PURE__*/
function () {
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
        if (!xe_utils_amd_xe_utils_default.a.includes(this.tarList, target)) {
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
      xe_utils_amd_xe_utils_default.a.remove(resize_eventStore, function (item) {
        return xe_utils_amd_xe_utils_default.a.includes(item.tarList, target);
      });
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this2 = this;

      xe_utils_amd_xe_utils_default.a.remove(resize_eventStore, function (item) {
        return item === _this2;
      });
    }
  }]);

  return ResizeObserverPolyfill;
}();

var Resize = dom.browse.isDoc ? window.ResizeObserver || resize_ResizeObserverPolyfill : resize_ResizeObserverPolyfill;

function eventListener() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(eventHandle, conf.resizeInterval || defaultInterval);
}

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
    eventListener();
  }
}

/* harmony default export */ var src_resize = (Resize);
// CONCATENATED MODULE: ./packages/resize/src/mixin.js

/* harmony default export */ var resize_src_mixin = ({
  methods: {
    bindResize: function bindResize() {
      var _this = this;

      var resizeObserver = new src_resize(function () {
        return _this.recalculate(true);
      });
      resizeObserver.observe(this.getParentElem());
      this.$resize = resizeObserver;
    },
    unbindResize: function unbindResize() {
      var $resize = this.$resize;

      if ($resize) {
        $resize.disconnect();
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/resize/index.js



var resize_Resize = {
  install: function install() {
    v_x_e_table.reg('resize');
    packages_table.mixins.push(resize_src_mixin);
  }
};
/* harmony default export */ var packages_resize = (resize_Resize);
// CONCATENATED MODULE: ./packages/locale/lang/zh-CN.js
/* harmony default export */ var zh_CN = ({
  vxe: {
    error: {
      groupFixed: '如果使用分组表头，固定列必须在左右两侧',
      cellEditRender: '渲染器 "cell-render" 和 "edit-render" 不能同时使用',
      treeFixedExpand: '树结构的固定列与展开行有冲突',
      treeLineExpand: '树结构的节点线与展开行有冲突',
      treeLineReqProp: '启用树节点线需要设置 "{{0}}"',
      scrollOriginal: '虚拟滚动启用后只能导出源数据，请将设置 "original=true"',
      scrollXNotGroup: '横向虚拟滚动不支持分组表头',
      scrollXReqProp: '横向虚拟滚动需要设置 "{{0}}"',
      scrollYReqProp: '纵向虚拟滚动需要设置 "{{0}}"',
      unableInsert: '无法插入到指定位置',
      useErr: '安装 "{{0}}" 模块时发生错误，顺序不正确',
      barUnableLink: '工具栏无法关联表格',
      toolbarId: '工具栏需要设置唯一 "id"',
      expandContent: '展开行的插槽应该是 "content"，请检查是否正确',
      reqModule: '缺少 "{{0}}" 模块',
      emptyProp: '参数 "{{0}}" 不允许为空',
      errProp: '参数 "{{0}}" 类型错误',
      notFunc: '"{{0}}" 方法不存在',
      noTree: '树结构不支持 "{{0}}"',
      delFunc: '方法 "{{0}}" 已废弃，请使用 "{{1}}"',
      delProp: '参数 "{{0}}" 已废弃，请使用 "{{1}}"',
      delEvent: '事件 "{{0}}" 已废弃，请使用 "{{1}}"',
      notType: '不支持的文件类型 "{{0}}"',
      notExp: '该浏览器不支持导入/导出功能',
      impFields: '导入失败，请检查字段名和数据格式是否正确',
      treeNotImp: '树表格不支持导入'
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
      impSuccess: '导入成功',
      expSuccess: '导出成功'
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
    types: {
      csv: 'CSV (逗号分隔)(*.csv)',
      html: '网页(*.html)',
      xml: 'XML 数据(*.xml)',
      txt: '文本文件(制表符分隔)(*.txt)',
      xlsx: 'Excel 工作簿(*.xlsx)',
      pdf: 'PDF (*.pdf)'
    },
    modal: {
      zoomIn: '最大化',
      zoomOut: '向下还原',
      close: '关闭'
    },
    toolbar: {
      import: '导入数据',
      export: '导出数据',
      refresh: '刷新',
      zoomIn: '最大化',
      zoomOut: '向下还原',
      custom: '自定义列',
      customConfirm: '确认',
      customReset: '重置',
      impTitle: '导入参数设置',
      impFile: '文件名',
      impSelect: '选择文件',
      impType: '文件类型',
      impOpts: '导入选项',
      impConfirm: '导入',
      impModeCovering: '覆盖',
      impCoveringTitle: '使用覆盖的方式将数据导入到表格中',
      impModeAppend: '追加',
      impAppendTitle: '使用追加的方式将数据导入到表格中',
      expTitle: '导出参数设置',
      expName: '文件名',
      expNamePlaceholder: '请输入文件名',
      expSheetName: '工作表名称',
      expSheetNamePlaceholder: '请输入工作表名称',
      expType: '保存类型',
      expMode: '要导出的数据',
      expAll: '全部数据',
      expSelected: '选中数据',
      expAllColumn: '全部字段',
      expColumn: '要导出的字段',
      expOpts: '导出选项',
      expOptHeader: '表头',
      expHeaderTitle: '是否需要导出表头',
      expOptFooter: '表尾',
      expFooterTitle: '是否需要导出表尾',
      expOptOriginal: '源(支持导入)',
      expOptOriginNotImp: '源(不支持导入)',
      expOriginalTitle: '是否需要导出数据源，如果勾上则支持导入到表格中',
      expPrint: '打印',
      expConfirm: '导出'
    }
  }
});
// CONCATENATED MODULE: ./packages/vxe-table.js

























 // 按需加载的组件

var components = [// 模块
packages_column, packages_header, packages_body, packages_footer, filter, packages_loading, packages_grid, packages_menu, packages_toolbar, packages_pager, packages_checkbox, packages_radio, packages_input, packages_button, packages_modal, packages_tooltip, edit, packages_export, keyboard, validator, packages_resize, // 核心
packages_table]; // 默认安装

function vxe_table_install(Vue, options) {
  if (xe_utils_amd_xe_utils_default.a.isPlainObject(options)) {
    v_x_e_table.setup(options);
  }

  components.map(function (component) {
    return Vue.use(component);
  });
} // 默认中文


v_x_e_table.setup({
  i18n: function i18n(key, value) {
    return xe_utils_amd_xe_utils_default.a.get(zh_CN, key);
  }
});

if (typeof window !== 'undefined' && window.Vue) {
  vxe_table_install(window.Vue);
}

v_x_e_table.install = vxe_table_install;























/* harmony default export */ var vxe_table = (v_x_e_table);
// CONCATENATED MODULE: ./index.js
// 默认主题
 // 默认安装全部模块



/* harmony default export */ var index_0 = (vxe_table);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport components */__webpack_require__.d(__webpack_exports__, "components", function() { return components; });
/* concated harmony reexport VXETable */__webpack_require__.d(__webpack_exports__, "VXETable", function() { return VXETable; });
/* concated harmony reexport Column */__webpack_require__.d(__webpack_exports__, "Column", function() { return Column; });
/* concated harmony reexport Header */__webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* concated harmony reexport Body */__webpack_require__.d(__webpack_exports__, "Body", function() { return Body; });
/* concated harmony reexport Footer */__webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* concated harmony reexport Filter */__webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* concated harmony reexport Loading */__webpack_require__.d(__webpack_exports__, "Loading", function() { return Loading; });
/* concated harmony reexport Grid */__webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* concated harmony reexport Menu */__webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
/* concated harmony reexport Toolbar */__webpack_require__.d(__webpack_exports__, "Toolbar", function() { return Toolbar; });
/* concated harmony reexport Pager */__webpack_require__.d(__webpack_exports__, "Pager", function() { return Pager; });
/* concated harmony reexport Checkbox */__webpack_require__.d(__webpack_exports__, "Checkbox", function() { return Checkbox; });
/* concated harmony reexport Radio */__webpack_require__.d(__webpack_exports__, "Radio", function() { return Radio; });
/* concated harmony reexport Input */__webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* concated harmony reexport Button */__webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* concated harmony reexport Modal */__webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* concated harmony reexport Tooltip */__webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* concated harmony reexport Edit */__webpack_require__.d(__webpack_exports__, "Edit", function() { return Edit; });
/* concated harmony reexport Export */__webpack_require__.d(__webpack_exports__, "Export", function() { return Export; });
/* concated harmony reexport Keyboard */__webpack_require__.d(__webpack_exports__, "Keyboard", function() { return Keyboard; });
/* concated harmony reexport Validator */__webpack_require__.d(__webpack_exports__, "Validator", function() { return Validator; });
/* concated harmony reexport Resize */__webpack_require__.d(__webpack_exports__, "Resize", function() { return resize_Resize; });
/* concated harmony reexport Table */__webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* concated harmony reexport Interceptor */__webpack_require__.d(__webpack_exports__, "Interceptor", function() { return Interceptor; });
/* concated harmony reexport Renderer */__webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* concated harmony reexport Menus */__webpack_require__.d(__webpack_exports__, "Menus", function() { return Menus; });
/* concated harmony reexport Buttons */__webpack_require__.d(__webpack_exports__, "Buttons", function() { return Buttons; });


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
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
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
  && typeof Symbol() == 'symbol';


/***/ })

/******/ })["default"];