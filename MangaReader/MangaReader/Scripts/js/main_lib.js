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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/application";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return sym; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TASK; });
/* unused harmony export HELPER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return MATCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CANCEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SAGA_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return SELF_CANCELLATION; });
/* unused harmony export konst */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return kTrue; });
/* unused harmony export kFalse */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return ident; });
/* harmony export (immutable) */ __webpack_exports__["n"] = check;
/* unused harmony export hasOwn */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return object; });
/* harmony export (immutable) */ __webpack_exports__["l"] = remove;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return array; });
/* harmony export (immutable) */ __webpack_exports__["g"] = deferred;
/* harmony export (immutable) */ __webpack_exports__["h"] = arrayOfDeffered;
/* harmony export (immutable) */ __webpack_exports__["a"] = delay;
/* harmony export (immutable) */ __webpack_exports__["i"] = createMockTask;
/* unused harmony export autoInc */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return uid; });
/* harmony export (immutable) */ __webpack_exports__["m"] = makeIterator;
/* harmony export (immutable) */ __webpack_exports__["q"] = log;
/* harmony export (immutable) */ __webpack_exports__["o"] = deprecate;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return updateIncentive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return internalErr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return createSetContextWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return wrapSagaDispatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return cloneableGenerator; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sym = function sym(id) {
  return '@@redux-saga/' + id;
};

var TASK = sym('TASK');
var HELPER = sym('HELPER');
var MATCH = sym('MATCH');
var CANCEL = sym('CANCEL_PROMISE');
var SAGA_ACTION = sym('SAGA_ACTION');
var SELF_CANCELLATION = sym('SELF_CANCELLATION');
var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue = konst(true);
var kFalse = konst(false);
var noop = function noop() {};
var ident = function ident(v) {
  return v;
};

function check(value, predicate, error) {
  if (!predicate(value)) {
    log('error', 'uncaught at check', error);
    throw new Error(error);
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(object, property) {
  return is.notUndef(object) && hasOwnProperty.call(object, property);
}

var is = {
  undef: function undef(v) {
    return v === null || v === undefined;
  },
  notUndef: function notUndef(v) {
    return v !== null && v !== undefined;
  },
  func: function func(f) {
    return typeof f === 'function';
  },
  number: function number(n) {
    return typeof n === 'number';
  },
  string: function string(s) {
    return typeof s === 'string';
  },
  array: Array.isArray,
  object: function object(obj) {
    return obj && !is.array(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  },
  promise: function promise(p) {
    return p && is.func(p.then);
  },
  iterator: function iterator(it) {
    return it && is.func(it.next) && is.func(it.throw);
  },
  iterable: function iterable(it) {
    return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
  },
  task: function task(t) {
    return t && t[TASK];
  },
  observable: function observable(ob) {
    return ob && is.func(ob.subscribe);
  },
  buffer: function buffer(buf) {
    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
  },
  pattern: function pattern(pat) {
    return pat && (is.string(pat) || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
  },
  channel: function channel(ch) {
    return ch && is.func(ch.take) && is.func(ch.close);
  },
  helper: function helper(it) {
    return it && it[HELPER];
  },
  stringableFunc: function stringableFunc(f) {
    return is.func(f) && hasOwn(f, 'toString');
  }
};

var object = {
  assign: function assign(target, source) {
    for (var i in source) {
      if (hasOwn(source, i)) {
        target[i] = source[i];
      }
    }
  }
};

function remove(array, item) {
  var index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

var array = {
  from: function from(obj) {
    var arr = Array(obj.length);
    for (var i in obj) {
      if (hasOwn(obj, i)) {
        arr[i] = obj[i];
      }
    }
    return arr;
  }
};

function deferred() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var def = _extends({}, props);
  var promise = new Promise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  def.promise = promise;
  return def;
}

function arrayOfDeffered(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(deferred());
  }
  return arr;
}

function delay(ms) {
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var timeoutId = void 0;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(function () {
      return resolve(val);
    }, ms);
  });

  promise[CANCEL] = function () {
    return clearTimeout(timeoutId);
  };

  return promise;
}

function createMockTask() {
  var _ref;

  var running = true;
  var _result = void 0,
      _error = void 0;

  return _ref = {}, _ref[TASK] = true, _ref.isRunning = function isRunning() {
    return running;
  }, _ref.result = function result() {
    return _result;
  }, _ref.error = function error() {
    return _error;
  }, _ref.setRunning = function setRunning(b) {
    return running = b;
  }, _ref.setResult = function setResult(r) {
    return _result = r;
  }, _ref.setError = function setError(e) {
    return _error = e;
  }, _ref;
}

function autoInc() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function () {
    return ++seed;
  };
}

var uid = autoInc();

var kThrow = function kThrow(err) {
  throw err;
};
var kReturn = function kReturn(value) {
  return { value: value, done: true };
};
function makeIterator(next) {
  var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var isHelper = arguments[3];

  var iterator = { name: name, next: next, throw: thro, return: kReturn };

  if (isHelper) {
    iterator[HELPER] = true;
  }
  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }
  return iterator;
}

/**
  Print error in a useful way whether in a browser environment
  (with expandable error stack traces), or in a node.js environment
  (text-only log output)
 **/
function log(level, message) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  /*eslint-disable no-console*/
  if (typeof window === 'undefined') {
    console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
  } else {
    console[level](message, error);
  }
}

function deprecate(fn, deprecationWarning) {
  return function () {
    if (process.env.NODE_ENV === 'development') log('warn', deprecationWarning);
    return fn.apply(undefined, arguments);
  };
}

var updateIncentive = function updateIncentive(deprecated, preferred) {
  return deprecated + ' has been deprecated in favor of ' + preferred + ', please update your code';
};

var internalErr = function internalErr(err) {
  return new Error('\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project\'s github repo.\n  Error: ' + err + '\n');
};

var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + 'setContext(props): argument ' + props + ' is not a plain object';
};

var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    return dispatch(Object.defineProperty(action, SAGA_ACTION, { value: true }));
  };
};

var cloneableGenerator = function cloneableGenerator(generatorFunc) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var history = [];
    var gen = generatorFunc.apply(undefined, args);
    return {
      next: function next(arg) {
        history.push(arg);
        return gen.next(arg);
      },
      clone: function clone() {
        var clonedGen = cloneableGenerator(generatorFunc).apply(undefined, args);
        history.forEach(function (arg) {
          return clonedGen.next(arg);
        });
        return clonedGen;
      },
      return: function _return(value) {
        return gen.return(value);
      },
      throw: function _throw(exception) {
        return gen.throw(exception);
      }
    };
  };
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(73)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(72)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var React = __webpack_require__(5);
var factory = __webpack_require__(55);

if (typeof React === 'undefined') {
  throw Error(
    'create-react-class could not find the React object. If you are using script tags, ' +
      'make sure that React is being loaded before create-react-class.'
  );
}

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.createPath = exports.parsePath = exports.getQueryStringValueFromPath = exports.stripQueryStringValueFromPath = exports.addQueryStringValueToPath = undefined;

var _warning = __webpack_require__(8);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addQueryStringValueToPath = exports.addQueryStringValueToPath = function addQueryStringValueToPath(path, key, value) {
  var _parsePath = parsePath(path),
      pathname = _parsePath.pathname,
      search = _parsePath.search,
      hash = _parsePath.hash;

  return createPath({
    pathname: pathname,
    search: search + (search.indexOf('?') === -1 ? '?' : '&') + key + '=' + value,
    hash: hash
  });
};

var stripQueryStringValueFromPath = exports.stripQueryStringValueFromPath = function stripQueryStringValueFromPath(path, key) {
  var _parsePath2 = parsePath(path),
      pathname = _parsePath2.pathname,
      search = _parsePath2.search,
      hash = _parsePath2.hash;

  return createPath({
    pathname: pathname,
    search: search.replace(new RegExp('([?&])' + key + '=[a-zA-Z0-9]+(&?)'), function (match, prefix, suffix) {
      return prefix === '?' ? prefix : suffix;
    }),
    hash: hash
  });
};

var getQueryStringValueFromPath = exports.getQueryStringValueFromPath = function getQueryStringValueFromPath(path, key) {
  var _parsePath3 = parsePath(path),
      search = _parsePath3.search;

  var match = search.match(new RegExp('[?&]' + key + '=([a-zA-Z0-9]+)'));
  return match && match[1];
};

var extractPath = function extractPath(string) {
  var match = string.match(/^(https?:)?\/\/[^\/]*/);
  return match == null ? string : string.substring(match[0].length);
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = extractPath(path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(path === pathname, 'A path must be pathname + search + hash only, not a full URL like "%s"', path) : void 0;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  if (location == null || typeof location === 'string') return location;

  var basename = location.basename,
      pathname = location.pathname,
      search = location.search,
      hash = location.hash;

  var path = (basename || '') + pathname;

  if (search && search !== '?') path += search;

  if (hash) path += hash;

  return path;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isReactChildren;
/* harmony export (immutable) */ __webpack_exports__["c"] = createRouteFromReactElement;
/* unused harmony export createRoutesFromReactChildren */
/* harmony export (immutable) */ __webpack_exports__["a"] = createRoutes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function isValidChild(object) {
  return object == null || __WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(object);
}

function isReactChildren(object) {
  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
}

function createRoute(defaultProps, props) {
  return _extends({}, defaultProps, props);
}

function createRouteFromReactElement(element) {
  var type = element.type;
  var route = createRoute(type.defaultProps, element.props);

  if (route.children) {
    var childRoutes = createRoutesFromReactChildren(route.children, route);

    if (childRoutes.length) route.childRoutes = childRoutes;

    delete route.children;
  }

  return route;
}

/**
 * Creates and returns a routes object from the given ReactChildren. JSX
 * provides a convenient way to visualize how routes in the hierarchy are
 * nested.
 *
 *   import { Route, createRoutesFromReactChildren } from 'react-router'
 *
 *   const routes = createRoutesFromReactChildren(
 *     <Route component={App}>
 *       <Route path="home" component={Dashboard}/>
 *       <Route path="news" component={NewsFeed}/>
 *     </Route>
 *   )
 *
 * Note: This method is automatically used when you provide <Route> children
 * to a <Router> component.
 */
function createRoutesFromReactChildren(children, parentRoute) {
  var routes = [];

  __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (element) {
    if (__WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(element)) {
      // Component classes may have a static create* method.
      if (element.type.createRouteFromReactElement) {
        var route = element.type.createRouteFromReactElement(element, parentRoute);

        if (route) routes.push(route);
      } else {
        routes.push(createRouteFromReactElement(element));
      }
    }
  });

  return routes;
}

/**
 * Creates and returns an array of routes from the given object which
 * may be a JSX route, a plain object route, or an array of either.
 */
function createRoutes(routes) {
  if (isReactChildren(routes)) {
    routes = createRoutesFromReactChildren(routes);
  } else if (routes && !Array.isArray(routes)) {
    routes = [routes];
  }

  return routes;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.locationsAreEqual = exports.statesAreEqual = exports.createLocation = exports.createQuery = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = __webpack_require__(8);

var _warning2 = _interopRequireDefault(_warning);

var _PathUtils = __webpack_require__(6);

var _Actions = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createQuery = exports.createQuery = function createQuery(props) {
  return _extends(Object.create(null), props);
};

var createLocation = exports.createLocation = function createLocation() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Actions.POP;
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var object = typeof input === 'string' ? (0, _PathUtils.parsePath)(input) : input;

  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!object.path, 'Location descriptor objects should have a `pathname`, not a `path`.') : void 0;

  var pathname = object.pathname || '/';
  var search = object.search || '';
  var hash = object.hash || '';
  var state = object.state;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
};

var isDate = function isDate(object) {
  return Object.prototype.toString.call(object) === '[object Date]';
};

var statesAreEqual = exports.statesAreEqual = function statesAreEqual(a, b) {
  if (a === b) return true;

  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (typeofA !== typeofB) return false;

  !(typeofA !== 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store functions in location state') : (0, _invariant2.default)(false) : void 0;

  // Not the same object, but same type.
  if (typeofA === 'object') {
    !!(isDate(a) && isDate(b)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store Date objects in location state') : (0, _invariant2.default)(false) : void 0;

    if (!Array.isArray(a)) {
      var keysofA = Object.keys(a);
      var keysofB = Object.keys(b);
      return keysofA.length === keysofB.length && keysofA.every(function (key) {
        return statesAreEqual(a[key], b[key]);
      });
    }

    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return statesAreEqual(item, b[index]);
    });
  }

  // All other serializable types (string, number, boolean)
  // should be strict equal.
  return false;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.key === b.key &&
  // a.action === b.action && // Different action !== location change.
  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && statesAreEqual(a.state, b.state);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export compilePattern */
/* harmony export (immutable) */ __webpack_exports__["c"] = matchPattern;
/* harmony export (immutable) */ __webpack_exports__["b"] = getParamNames;
/* unused harmony export getParams */
/* harmony export (immutable) */ __webpack_exports__["a"] = formatPattern;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_invariant__);


function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function _compilePattern(pattern) {
  var regexpSource = '';
  var paramNames = [];
  var tokens = [];

  var match = void 0,
      lastIndex = 0,
      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)|\\\(|\\\)/g;
  while (match = matcher.exec(pattern)) {
    if (match.index !== lastIndex) {
      tokens.push(pattern.slice(lastIndex, match.index));
      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
    }

    if (match[1]) {
      regexpSource += '([^/]+)';
      paramNames.push(match[1]);
    } else if (match[0] === '**') {
      regexpSource += '(.*)';
      paramNames.push('splat');
    } else if (match[0] === '*') {
      regexpSource += '(.*?)';
      paramNames.push('splat');
    } else if (match[0] === '(') {
      regexpSource += '(?:';
    } else if (match[0] === ')') {
      regexpSource += ')?';
    } else if (match[0] === '\\(') {
      regexpSource += '\\(';
    } else if (match[0] === '\\)') {
      regexpSource += '\\)';
    }

    tokens.push(match[0]);

    lastIndex = matcher.lastIndex;
  }

  if (lastIndex !== pattern.length) {
    tokens.push(pattern.slice(lastIndex, pattern.length));
    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
  }

  return {
    pattern: pattern,
    regexpSource: regexpSource,
    paramNames: paramNames,
    tokens: tokens
  };
}

var CompiledPatternsCache = Object.create(null);

function compilePattern(pattern) {
  if (!CompiledPatternsCache[pattern]) CompiledPatternsCache[pattern] = _compilePattern(pattern);

  return CompiledPatternsCache[pattern];
}

/**
 * Attempts to match a pattern on the given pathname. Patterns may use
 * the following special characters:
 *
 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
 *                  captured string is considered a "param"
 * - ()             Wraps a segment of the URL that is optional
 * - *              Consumes (non-greedy) all characters up to the next
 *                  character in the pattern, or to the end of the URL if
 *                  there is none
 * - **             Consumes (greedy) all characters up to the next character
 *                  in the pattern, or to the end of the URL if there is none
 *
 *  The function calls callback(error, matched) when finished.
 * The return value is an object with the following properties:
 *
 * - remainingPathname
 * - paramNames
 * - paramValues
 */
function matchPattern(pattern, pathname) {
  // Ensure pattern starts with leading slash for consistency with pathname.
  if (pattern.charAt(0) !== '/') {
    pattern = '/' + pattern;
  }

  var _compilePattern2 = compilePattern(pattern),
      regexpSource = _compilePattern2.regexpSource,
      paramNames = _compilePattern2.paramNames,
      tokens = _compilePattern2.tokens;

  if (pattern.charAt(pattern.length - 1) !== '/') {
    regexpSource += '/?'; // Allow optional path separator at end.
  }

  // Special-case patterns like '*' for catch-all routes.
  if (tokens[tokens.length - 1] === '*') {
    regexpSource += '$';
  }

  var match = pathname.match(new RegExp('^' + regexpSource, 'i'));
  if (match == null) {
    return null;
  }

  var matchedPath = match[0];
  var remainingPathname = pathname.substr(matchedPath.length);

  if (remainingPathname) {
    // Require that the match ends at a path separator, if we didn't match
    // the full path, so any remaining pathname is a new path segment.
    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
      return null;
    }

    // If there is a remaining pathname, treat the path separator as part of
    // the remaining pathname for properly continuing the match.
    remainingPathname = '/' + remainingPathname;
  }

  return {
    remainingPathname: remainingPathname,
    paramNames: paramNames,
    paramValues: match.slice(1).map(function (v) {
      return v && decodeURIComponent(v);
    })
  };
}

function getParamNames(pattern) {
  return compilePattern(pattern).paramNames;
}

function getParams(pattern, pathname) {
  var match = matchPattern(pattern, pathname);
  if (!match) {
    return null;
  }

  var paramNames = match.paramNames,
      paramValues = match.paramValues;

  var params = {};

  paramNames.forEach(function (paramName, index) {
    params[paramName] = paramValues[index];
  });

  return params;
}

/**
 * Returns a version of the given pattern with params interpolated. Throws
 * if there is a dynamic segment of the pattern for which there is no param.
 */
function formatPattern(pattern, params) {
  params = params || {};

  var _compilePattern3 = compilePattern(pattern),
      tokens = _compilePattern3.tokens;

  var parenCount = 0,
      pathname = '',
      splatIndex = 0,
      parenHistory = [];

  var token = void 0,
      paramName = void 0,
      paramValue = void 0;
  for (var i = 0, len = tokens.length; i < len; ++i) {
    token = tokens[i];

    if (token === '*' || token === '**') {
      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;

      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false) : void 0;

      if (paramValue != null) pathname += encodeURI(paramValue);
    } else if (token === '(') {
      parenHistory[parenCount] = '';
      parenCount += 1;
    } else if (token === ')') {
      var parenText = parenHistory.pop();
      parenCount -= 1;

      if (parenCount) parenHistory[parenCount - 1] += parenText;else pathname += parenText;
    } else if (token === '\\(') {
      pathname += '(';
    } else if (token === '\\)') {
      pathname += ')';
    } else if (token.charAt(0) === ':') {
      paramName = token.substring(1);
      paramValue = params[paramName];

      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false) : void 0;

      if (paramValue == null) {
        if (parenCount) {
          parenHistory[parenCount - 1] = '';

          var curTokenIdx = tokens.indexOf(token);
          var tokensSubset = tokens.slice(curTokenIdx, tokens.length);
          var nextParenIdx = -1;

          for (var _i = 0; _i < tokensSubset.length; _i++) {
            if (tokensSubset[_i] == ')') {
              nextParenIdx = _i;
              break;
            }
          }

          !(nextParenIdx > 0) ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false, 'Path "%s" is missing end paren at segment "%s"', pattern, tokensSubset.join('')) : __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false) : void 0;

          // jump to ending paren
          i = curTokenIdx + nextParenIdx - 1;
        }
      } else if (parenCount) parenHistory[parenCount - 1] += encodeURIComponent(paramValue);else pathname += encodeURIComponent(paramValue);
    } else {
      if (parenCount) parenHistory[parenCount - 1] += token;else pathname += token;
    }
  }

  !(parenCount <= 0) ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false, 'Path "%s" is missing end paren', pattern) : __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false) : void 0;

  return pathname.replace(/\/+/g, '/');
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = routerWarning;
/* unused harmony export _resetWarned */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);


var warned = {};

function routerWarning(falseToWarn, message) {
  // Only issue deprecation warnings once.
  if (message.indexOf('deprecated') !== -1) {
    if (warned[message]) {
      return;
    }

    warned[message] = true;
  }

  message = '[react-router] ' + message;

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  __WEBPACK_IMPORTED_MODULE_0_warning___default.a.apply(undefined, [falseToWarn, message].concat(args));
}

function _resetWarned() {
  warned = {};
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isEnd; });
/* harmony export (immutable) */ __webpack_exports__["f"] = emitter;
/* unused harmony export INVALID_BUFFER */
/* unused harmony export UNDEFINED_INPUT_ERROR */
/* harmony export (immutable) */ __webpack_exports__["c"] = channel;
/* harmony export (immutable) */ __webpack_exports__["b"] = eventChannel;
/* harmony export (immutable) */ __webpack_exports__["d"] = stdChannel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buffers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler__ = __webpack_require__(49);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
var END = { type: CHANNEL_END_TYPE };
var isEnd = function isEnd(a) {
  return a && a.type === CHANNEL_END_TYPE;
};

function emitter() {
  var subscribers = [];

  function subscribe(sub) {
    subscribers.push(sub);
    return function () {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["l" /* remove */])(subscribers, sub);
    };
  }

  function emit(item) {
    var arr = subscribers.slice();
    for (var i = 0, len = arr.length; i < len; i++) {
      arr[i](item);
    }
  }

  return {
    subscribe: subscribe,
    emit: emit
  };
}

var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = 'Saga was provided with an undefined action';

if (process.env.NODE_ENV !== 'production') {
  UNDEFINED_INPUT_ERROR += '\nHints:\n    - check that your Action Creator returns a non-undefined value\n    - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners\n  ';
}

function channel() {
  var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_1__buffers__["a" /* buffers */].fixed();

  var closed = false;
  var takers = [];

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].buffer, INVALID_BUFFER);

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["w" /* internalErr */])('Cannot have a closed channel with pending takers');
    }
    if (takers.length && !buffer.isEmpty()) {
      throw __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["w" /* internalErr */])('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    checkForbiddenStates();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(input, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, UNDEFINED_INPUT_ERROR);
    if (closed) {
      return;
    }
    if (!takers.length) {
      return buffer.put(input);
    }
    for (var i = 0; i < takers.length; i++) {
      var cb = takers[i];
      if (!cb[__WEBPACK_IMPORTED_MODULE_0__utils__["x" /* MATCH */]] || cb[__WEBPACK_IMPORTED_MODULE_0__utils__["x" /* MATCH */]](input)) {
        takers.splice(i, 1);
        return cb(input);
      }
    }
  }

  function take(cb) {
    checkForbiddenStates();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(cb, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func, "channel.take's callback must be a function");

    if (closed && buffer.isEmpty()) {
      cb(END);
    } else if (!buffer.isEmpty()) {
      cb(buffer.take());
    } else {
      takers.push(cb);
      cb.cancel = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["l" /* remove */])(takers, cb);
      };
    }
  }

  function flush(cb) {
    checkForbiddenStates(); // TODO: check if some new state should be forbidden now
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(cb, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func, "channel.flush' callback must be a function");
    if (closed && buffer.isEmpty()) {
      cb(END);
      return;
    }
    cb(buffer.flush());
  }

  function close() {
    checkForbiddenStates();
    if (!closed) {
      closed = true;
      if (takers.length) {
        var arr = takers;
        takers = [];
        for (var i = 0, len = arr.length; i < len; i++) {
          arr[i](END);
        }
      }
    }
  }

  return {
    take: take,
    put: put,
    flush: flush,
    close: close,
    get __takers__() {
      return takers;
    },
    get __closed__() {
      return closed;
    }
  };
}

function eventChannel(subscribe) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_1__buffers__["a" /* buffers */].none();
  var matcher = arguments[2];

  /**
    should be if(typeof matcher !== undefined) instead?
    see PR #273 for a background discussion
  **/
  if (arguments.length > 2) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(matcher, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func, 'Invalid match function passed to eventChannel');
  }

  var chan = channel(buffer);
  var close = function close() {
    if (!chan.__closed__) {
      if (unsubscribe) {
        unsubscribe();
      }
      chan.close();
    }
  };
  var unsubscribe = subscribe(function (input) {
    if (isEnd(input)) {
      close();
      return;
    }
    if (matcher && !matcher(input)) {
      return;
    }
    chan.put(input);
  });
  if (chan.__closed__) {
    unsubscribe();
  }

  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(unsubscribe)) {
    throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
  }

  return {
    take: chan.take,
    flush: chan.flush,
    close: close
  };
}

function stdChannel(subscribe) {
  var chan = eventChannel(function (cb) {
    return subscribe(function (input) {
      if (input[__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* SAGA_ACTION */]]) {
        cb(input);
        return;
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__scheduler__["a" /* asap */])(function () {
        return cb(input);
      });
    });
  });

  return _extends({}, chan, {
    take: function take(cb, matcher) {
      if (arguments.length > 1) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(matcher, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func, "channel.take's matcher argument must be a function");
        cb[__WEBPACK_IMPORTED_MODULE_0__utils__["x" /* MATCH */]] = matcher;
      }
      chan.take(cb);
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = take;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return takem; });
/* harmony export (immutable) */ __webpack_exports__["h"] = put;
/* harmony export (immutable) */ __webpack_exports__["i"] = all;
/* harmony export (immutable) */ __webpack_exports__["j"] = race;
/* harmony export (immutable) */ __webpack_exports__["e"] = call;
/* harmony export (immutable) */ __webpack_exports__["k"] = apply;
/* harmony export (immutable) */ __webpack_exports__["l"] = cps;
/* harmony export (immutable) */ __webpack_exports__["d"] = fork;
/* harmony export (immutable) */ __webpack_exports__["m"] = spawn;
/* harmony export (immutable) */ __webpack_exports__["n"] = join;
/* harmony export (immutable) */ __webpack_exports__["f"] = cancel;
/* harmony export (immutable) */ __webpack_exports__["o"] = select;
/* harmony export (immutable) */ __webpack_exports__["b"] = actionChannel;
/* harmony export (immutable) */ __webpack_exports__["p"] = cancelled;
/* harmony export (immutable) */ __webpack_exports__["q"] = flush;
/* harmony export (immutable) */ __webpack_exports__["r"] = getContext;
/* harmony export (immutable) */ __webpack_exports__["s"] = setContext;
/* harmony export (immutable) */ __webpack_exports__["t"] = takeEvery;
/* harmony export (immutable) */ __webpack_exports__["u"] = takeLatest;
/* harmony export (immutable) */ __webpack_exports__["v"] = throttle;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return asEffect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sagaHelpers__ = __webpack_require__(48);



var IO = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["y" /* sym */])('IO');
var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

var effect = function effect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref[type] = payload, _ref;
};

function take() {
  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  if (arguments.length) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(arguments[0], __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].pattern(patternOrChannel)) {
    return effect(TAKE, { pattern: patternOrChannel });
  }
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].channel(patternOrChannel)) {
    return effect(TAKE, { channel: patternOrChannel });
  }
  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
}

take.maybe = function () {
  var eff = take.apply(undefined, arguments);
  eff[TAKE].maybe = true;
  return eff;
};

var takem = /*#__PURE__*/__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["o" /* deprecate */])(take.maybe, /*#__PURE__*/__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["p" /* updateIncentive */])('takem', 'take.maybe'));

function put(channel, action) {
  if (arguments.length > 1) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, 'put(channel, action): argument channel is undefined');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(action, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, 'put(channel, action): argument action is undefined');
  } else {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, 'put(action): argument action is undefined');
    action = channel;
    channel = null;
  }
  return effect(PUT, { channel: channel, action: action });
}

put.resolve = function () {
  var eff = put.apply(undefined, arguments);
  eff[PUT].resolve = true;
  return eff;
};

put.sync = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["o" /* deprecate */])(put.resolve, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["p" /* updateIncentive */])('put.sync', 'put.resolve'));

function all(effects) {
  return effect(ALL, effects);
}

function race(effects) {
  return effect(RACE, effects);
}

function getFnCallDesc(meth, fn, args) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(fn, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, meth + ': argument fn is undefined');

  var context = null;
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].array(fn)) {
    var _fn = fn;
    context = _fn[0];
    fn = _fn[1];
  } else if (fn.fn) {
    var _fn2 = fn;
    context = _fn2.context;
    fn = _fn2.fn;
  }
  if (context && __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].string(fn) && __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(context[fn])) {
    fn = context[fn];
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(fn, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func, meth + ': argument ' + fn + ' is not a function');

  return { context: context, fn: fn, args: args };
}

function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return effect(CALL, getFnCallDesc('call', fn, args));
}

function apply(context, fn) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return effect(CALL, getFnCallDesc('apply', { context: context, fn: fn }, args));
}

function cps(fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return effect(CPS, getFnCallDesc('cps', fn, args));
}

function fork(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return effect(FORK, getFnCallDesc('fork', fn, args));
}

function spawn(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  var eff = fork.apply(undefined, [fn].concat(args));
  eff[FORK].detached = true;
  return eff;
}

function join() {
  for (var _len5 = arguments.length, tasks = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    tasks[_key5] = arguments[_key5];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return join(t);
    }));
  }
  var task = tasks[0];
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, 'join(task): argument task is undefined');
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].task, 'join(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  return effect(JOIN, task);
}

function cancel() {
  for (var _len6 = arguments.length, tasks = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    tasks[_key6] = arguments[_key6];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return cancel(t);
    }));
  }
  var task = tasks[0];
  if (tasks.length === 1) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, 'cancel(task): argument task is undefined');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].task, 'cancel(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  }
  return effect(CANCEL, task || __WEBPACK_IMPORTED_MODULE_0__utils__["s" /* SELF_CANCELLATION */]);
}

function select(selector) {
  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    args[_key7 - 1] = arguments[_key7];
  }

  if (arguments.length === 0) {
    selector = __WEBPACK_IMPORTED_MODULE_0__utils__["z" /* ident */];
  } else {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(selector, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, 'select(selector,[...]): argument selector is undefined');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(selector, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func, 'select(selector,[...]): argument ' + selector + ' is not a function');
  }
  return effect(SELECT, { selector: selector, args: args });
}

/**
  channel(pattern, [buffer])    => creates an event channel for store actions
**/
function actionChannel(pattern, buffer) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(pattern, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
  if (arguments.length > 1) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].buffer, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
  }
  return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
}

function cancelled() {
  return effect(CANCELLED, {});
}

function flush(channel) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].channel, 'flush(channel): argument ' + channel + ' is not valid channel');
  return effect(FLUSH, channel);
}

function getContext(prop) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(prop, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].string, 'getContext(prop): argument ' + prop + ' is not a string');
  return effect(GET_CONTEXT, prop);
}

function setContext(props) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(props, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].object, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["v" /* createSetContextWarning */])(null, props));
  return effect(SET_CONTEXT, props);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len8 = arguments.length, args = Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
    args[_key8 - 2] = arguments[_key8];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["d" /* takeEveryHelper */], patternOrChannel, worker].concat(args));
}

function takeLatest(patternOrChannel, worker) {
  for (var _len9 = arguments.length, args = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
    args[_key9 - 2] = arguments[_key9];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["e" /* takeLatestHelper */], patternOrChannel, worker].concat(args));
}

function throttle(ms, pattern, worker) {
  for (var _len10 = arguments.length, args = Array(_len10 > 3 ? _len10 - 3 : 0), _key10 = 3; _key10 < _len10; _key10++) {
    args[_key10 - 3] = arguments[_key10];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["f" /* throttleHelper */], ms, pattern, worker].concat(args));
}

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    return effect && effect[IO] && effect[type];
  };
};

var asEffect = {
  take: createAsEffectType(TAKE),
  put: createAsEffectType(PUT),
  all: createAsEffectType(ALL),
  race: createAsEffectType(RACE),
  call: createAsEffectType(CALL),
  cps: createAsEffectType(CPS),
  fork: createAsEffectType(FORK),
  join: createAsEffectType(JOIN),
  cancel: createAsEffectType(CANCEL),
  select: createAsEffectType(SELECT),
  actionChannel: createAsEffectType(ACTION_CHANNEL),
  cancelled: createAsEffectType(CANCELLED),
  flush: createAsEffectType(FLUSH),
  getContext: createAsEffectType(GET_CONTEXT),
  setContext: createAsEffectType(SET_CONTEXT)
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = falsy;
/* unused harmony export history */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return components; });
/* unused harmony export route */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


function falsy(props, propName, componentName) {
  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
}

var history = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prop_types__["shape"])({
  listen: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  push: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  replace: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  go: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  goBack: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  goForward: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired
});

var component = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["func"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"]]);
var components = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([component, __WEBPACK_IMPORTED_MODULE_0_prop_types__["object"]]);
var route = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["object"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]);
var routes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([route, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prop_types__["arrayOf"])(route)]);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Indicates that navigation was caused by a call to history.push.
 */
var PUSH = exports.PUSH = 'PUSH';

/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = exports.REPLACE = 'REPLACE';

/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = exports.POP = 'POP';

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopstateOnHashchange = exports.supportsPopstateOnHashchange = function supportsPopstateOnHashchange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BUFFER_OVERFLOW */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buffers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);


var BUFFER_OVERFLOW = "Channel's Buffer overflow!";

var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;

var zeroBuffer = { isEmpty: __WEBPACK_IMPORTED_MODULE_0__utils__["k" /* kTrue */], put: __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */], take: __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */] };

function ringBuffer() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var overflowAction = arguments[1];

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];
    while (length) {
      items.push(take());
    }
    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit = void 0;
        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);
          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;
          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;

            arr = flush();

            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;

            arr.length = doubledLimit;
            limit = doubledLimit;

            push(it);
            break;
          default:
          // DROP
        }
      }
    },
    take: take,
    flush: flush
  };
}

var buffers = {
  none: function none() {
    return zeroBuffer;
  },
  fixed: function fixed(limit) {
    return ringBuffer(limit, ON_OVERFLOW_THROW);
  },
  dropping: function dropping(limit) {
    return ringBuffer(limit, ON_OVERFLOW_DROP);
  },
  sliding: function sliding(limit) {
    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
  },
  expanding: function expanding(initialSize) {
    return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(19);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.go = exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getUserConfirmation = exports.getCurrentLocation = undefined;

var _LocationUtils = __webpack_require__(9);

var _DOMUtils = __webpack_require__(17);

var _DOMStateStorage = __webpack_require__(31);

var _PathUtils = __webpack_require__(6);

var _ExecutionEnvironment = __webpack_require__(22);

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var needsHashchangeListener = _ExecutionEnvironment.canUseDOM && !(0, _DOMUtils.supportsPopstateOnHashchange)();

var _createLocation = function _createLocation(historyState) {
  var key = historyState && historyState.key;

  return (0, _LocationUtils.createLocation)({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: key ? (0, _DOMStateStorage.readState)(key) : undefined
  }, undefined, key);
};

var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
  var historyState = void 0;
  try {
    historyState = window.history.state || {};
  } catch (error) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    historyState = {};
  }

  return _createLocation(historyState);
};

var getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

var startListener = exports.startListener = function startListener(listener) {
  var handlePopState = function handlePopState(event) {
    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) // Ignore extraneous popstate events in WebKit
      return;
    listener(_createLocation(event.state));
  };

  (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

  var handleUnpoppedHashChange = function handleUnpoppedHashChange() {
    return listener(getCurrentLocation());
  };

  if (needsHashchangeListener) {
    (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);
  }

  return function () {
    (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

    if (needsHashchangeListener) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);
    }
  };
};

var updateLocation = function updateLocation(location, updateState) {
  var state = location.state,
      key = location.key;


  if (state !== undefined) (0, _DOMStateStorage.saveState)(key, state);

  updateState({ key: key }, (0, _PathUtils.createPath)(location));
};

var pushLocation = exports.pushLocation = function pushLocation(location) {
  return updateLocation(location, function (state, path) {
    return window.history.pushState(state, null, path);
  });
};

var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
  return updateLocation(location, function (state, path) {
    return window.history.replaceState(state, null, path);
  });
};

var go = exports.go = function go(n) {
  if (n) window.history.go(n);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _AsyncUtils = __webpack_require__(57);

var _PathUtils = __webpack_require__(6);

var _runTransitionHook = __webpack_require__(24);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _Actions = __webpack_require__(16);

var _LocationUtils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHistory = function createHistory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getCurrentLocation = options.getCurrentLocation,
      getUserConfirmation = options.getUserConfirmation,
      pushLocation = options.pushLocation,
      replaceLocation = options.replaceLocation,
      go = options.go,
      keyLength = options.keyLength;


  var currentLocation = void 0;
  var pendingLocation = void 0;
  var beforeListeners = [];
  var listeners = [];
  var allKeys = [];

  var getCurrentIndex = function getCurrentIndex() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) return allKeys.indexOf(pendingLocation.key);

    if (currentLocation) return allKeys.indexOf(currentLocation.key);

    return -1;
  };

  var updateLocation = function updateLocation(nextLocation) {
    var currentIndex = getCurrentIndex();

    currentLocation = nextLocation;

    if (currentLocation.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, currentIndex + 1), [currentLocation.key]);
    } else if (currentLocation.action === _Actions.REPLACE) {
      allKeys[currentIndex] = currentLocation.key;
    }

    listeners.forEach(function (listener) {
      return listener(currentLocation);
    });
  };

  var listenBefore = function listenBefore(listener) {
    beforeListeners.push(listener);

    return function () {
      return beforeListeners = beforeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var listen = function listen(listener) {
    listeners.push(listener);

    return function () {
      return listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, callback) {
    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {
      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {
        return result != null ? done(result) : next();
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          return callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  };

  var transitionTo = function transitionTo(nextLocation) {
    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation

      pendingLocation = null;

      if (ok) {
        // Treat PUSH to same path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = (0, _PathUtils.createPath)(currentLocation);
          var nextPath = (0, _PathUtils.createPath)(nextLocation);

          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
        }

        if (nextLocation.action === _Actions.POP) {
          updateLocation(nextLocation);
        } else if (nextLocation.action === _Actions.PUSH) {
          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);
        } else if (nextLocation.action === _Actions.REPLACE) {
          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);
        }
      } else if (currentLocation && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(currentLocation.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL
      }
    });
  };

  var push = function push(input) {
    return transitionTo(createLocation(input, _Actions.PUSH));
  };

  var replace = function replace(input) {
    return transitionTo(createLocation(input, _Actions.REPLACE));
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength || 6);
  };

  var createHref = function createHref(location) {
    return (0, _PathUtils.createPath)(location);
  };

  var createLocation = function createLocation(location, action) {
    var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : createKey();
    return (0, _LocationUtils.createLocation)(location, action, key);
  };

  return {
    getCurrentLocation: getCurrentLocation,
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: _PathUtils.createPath,
    createHref: createHref,
    createLocation: createLocation
  };
};

exports.default = createHistory;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _warning = __webpack_require__(8);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runTransitionHook = function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(result === undefined, 'You should not "return" in a transition hook with a callback argument; ' + 'call the callback instead') : void 0;
  }
};

exports.default = runTransitionHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = loopAsync;
/* harmony export (immutable) */ __webpack_exports__["a"] = mapAsync;
function loopAsync(turns, work, callback) {
  var currentTurn = 0,
      isDone = false;
  var sync = false,
      hasNext = false,
      doneArgs = void 0;

  function done() {
    isDone = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      doneArgs = [].concat(Array.prototype.slice.call(arguments));
      return;
    }

    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) {
      return;
    }

    hasNext = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      return;
    }

    sync = true;

    while (!isDone && currentTurn < turns && hasNext) {
      hasNext = false;
      work.call(this, currentTurn++, next, done);
    }

    sync = false;

    if (isDone) {
      // This means the loop finished synchronously.
      callback.apply(this, doneArgs);
      return;
    }

    if (currentTurn >= turns && hasNext) {
      isDone = true;
      callback();
    }
  }

  next();
}

function mapAsync(array, work, callback) {
  var length = array.length;
  var values = [];

  if (length === 0) return callback(null, values);

  var isDone = false,
      doneCount = 0;

  function done(index, error, value) {
    if (isDone) return;

    if (error) {
      isDone = true;
      callback(error);
    } else {
      values[index] = value;

      isDone = ++doneCount === length;

      if (isDone) callback(null, values);
    }
  }

  array.forEach(function (item, index) {
    work(item, index, function (error, value) {
      done(index, error, value);
    });
  });
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ContextProvider;
/* harmony export (immutable) */ __webpack_exports__["b"] = ContextSubscriber;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


// Works around issues with context updates failing to propagate.
// Caveat: the context value is expected to never change its identity.
// https://github.com/facebook/react/issues/2517
// https://github.com/reactjs/react-router/issues/470

var contextProviderShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  subscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  eventIndex: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number.isRequired
});

function makeContextName(name) {
  return '@@contextSubscriber/' + name;
}

function ContextProvider(name) {
  var _childContextTypes, _ref2;

  var contextName = makeContextName(name);
  var listenersKey = contextName + '/listeners';
  var eventIndexKey = contextName + '/eventIndex';
  var subscribeKey = contextName + '/subscribe';

  return _ref2 = {
    childContextTypes: (_childContextTypes = {}, _childContextTypes[contextName] = contextProviderShape.isRequired, _childContextTypes),

    getChildContext: function getChildContext() {
      var _ref;

      return _ref = {}, _ref[contextName] = {
        eventIndex: this[eventIndexKey],
        subscribe: this[subscribeKey]
      }, _ref;
    },
    componentWillMount: function componentWillMount() {
      this[listenersKey] = [];
      this[eventIndexKey] = 0;
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
      this[eventIndexKey]++;
    },
    componentDidUpdate: function componentDidUpdate() {
      var _this = this;

      this[listenersKey].forEach(function (listener) {
        return listener(_this[eventIndexKey]);
      });
    }
  }, _ref2[subscribeKey] = function (listener) {
    var _this2 = this;

    // No need to immediately call listener here.
    this[listenersKey].push(listener);

    return function () {
      _this2[listenersKey] = _this2[listenersKey].filter(function (item) {
        return item !== listener;
      });
    };
  }, _ref2;
}

function ContextSubscriber(name) {
  var _contextTypes, _ref4;

  var contextName = makeContextName(name);
  var lastRenderedEventIndexKey = contextName + '/lastRenderedEventIndex';
  var handleContextUpdateKey = contextName + '/handleContextUpdate';
  var unsubscribeKey = contextName + '/unsubscribe';

  return _ref4 = {
    contextTypes: (_contextTypes = {}, _contextTypes[contextName] = contextProviderShape, _contextTypes),

    getInitialState: function getInitialState() {
      var _ref3;

      if (!this.context[contextName]) {
        return {};
      }

      return _ref3 = {}, _ref3[lastRenderedEventIndexKey] = this.context[contextName].eventIndex, _ref3;
    },
    componentDidMount: function componentDidMount() {
      if (!this.context[contextName]) {
        return;
      }

      this[unsubscribeKey] = this.context[contextName].subscribe(this[handleContextUpdateKey]);
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
      var _setState;

      if (!this.context[contextName]) {
        return;
      }

      this.setState((_setState = {}, _setState[lastRenderedEventIndexKey] = this.context[contextName].eventIndex, _setState));
    },
    componentWillUnmount: function componentWillUnmount() {
      if (!this[unsubscribeKey]) {
        return;
      }

      this[unsubscribeKey]();
      this[unsubscribeKey] = null;
    }
  }, _ref4[handleContextUpdateKey] = function (eventIndex) {
    if (eventIndex !== this.state[lastRenderedEventIndexKey]) {
      var _setState2;

      this.setState((_setState2 = {}, _setState2[lastRenderedEventIndexKey] = eventIndex, _setState2));
    }
  }, _ref4;
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routerShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return locationShape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


var routerShape = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prop_types__["shape"])({
  push: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  replace: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  go: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  goBack: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  goForward: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  setRouteLeaveHook: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired,
  isActive: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"].isRequired
});

var locationShape = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prop_types__["shape"])({
  pathname: __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"].isRequired,
  search: __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"].isRequired,
  state: __WEBPACK_IMPORTED_MODULE_0_prop_types__["object"],
  action: __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"].isRequired,
  key: __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"]
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_create_react_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getRouteParams__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ContextUtils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__RouteUtils__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };










/**
 * A <RouterContext> renders the component tree for a given router state
 * and sets the history object and the current location in context.
 */
var RouterContext = __WEBPACK_IMPORTED_MODULE_2_create_react_class___default()({
  displayName: 'RouterContext',

  mixins: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__ContextUtils__["a" /* ContextProvider */])('router')],

  propTypes: {
    router: __WEBPACK_IMPORTED_MODULE_3_prop_types__["object"].isRequired,
    location: __WEBPACK_IMPORTED_MODULE_3_prop_types__["object"].isRequired,
    routes: __WEBPACK_IMPORTED_MODULE_3_prop_types__["array"].isRequired,
    params: __WEBPACK_IMPORTED_MODULE_3_prop_types__["object"].isRequired,
    components: __WEBPACK_IMPORTED_MODULE_3_prop_types__["array"].isRequired,
    createElement: __WEBPACK_IMPORTED_MODULE_3_prop_types__["func"].isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      createElement: __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement
    };
  },


  childContextTypes: {
    router: __WEBPACK_IMPORTED_MODULE_3_prop_types__["object"].isRequired
  },

  getChildContext: function getChildContext() {
    return {
      router: this.props.router
    };
  },
  createElement: function createElement(component, props) {
    return component == null ? null : this.props.createElement(component, props);
  },
  render: function render() {
    var _this = this;

    var _props = this.props,
        location = _props.location,
        routes = _props.routes,
        params = _props.params,
        components = _props.components,
        router = _props.router;

    var element = null;

    if (components) {
      element = components.reduceRight(function (element, components, index) {
        if (components == null) return element; // Don't create new children; use the grandchildren.

        var route = routes[index];
        var routeParams = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__getRouteParams__["a" /* default */])(route, params);
        var props = {
          location: location,
          params: params,
          route: route,
          router: router,
          routeParams: routeParams,
          routes: routes
        };

        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__RouteUtils__["b" /* isReactChildren */])(element)) {
          props.children = element;
        } else if (element) {
          for (var prop in element) {
            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
          }
        }

        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
          var elements = {};

          for (var key in components) {
            if (Object.prototype.hasOwnProperty.call(components, key)) {
              // Pass through the key as a prop to createElement to allow
              // custom createElement functions to know which named component
              // they're rendering, for e.g. matching up to fetched data.
              elements[key] = _this.createElement(components[key], _extends({
                key: key }, props));
            }
          }

          return elements;
        }

        return _this.createElement(components, props);
      }, element);
    }

    !(element === null || element === false || __WEBPACK_IMPORTED_MODULE_1_react___default.a.isValidElement(element)) ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false, 'The root route must render a single element') : __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false) : void 0;

    return element;
  }
});

/* harmony default export */ __webpack_exports__["a"] = (RouterContext);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return qEnd; });
/* harmony export (immutable) */ __webpack_exports__["c"] = safeName;
/* harmony export (immutable) */ __webpack_exports__["a"] = fsmIterator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);


var done = { done: true, value: undefined };
var qEnd = {};

function safeName(patternOrChannel) {
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].channel(patternOrChannel)) {
    return 'channel';
  } else if (Array.isArray(patternOrChannel)) {
    return String(patternOrChannel.map(function (entry) {
      return String(entry);
    }));
  } else {
    return String(patternOrChannel);
  }
}

function fsmIterator(fsm, q0) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';

  var updateState = void 0,
      qNext = q0;

  function next(arg, error) {
    if (qNext === qEnd) {
      return done;
    }

    if (error) {
      qNext = qEnd;
      throw error;
    } else {
      updateState && updateState(arg);

      var _fsm$qNext = fsm[qNext](),
          q = _fsm$qNext[0],
          output = _fsm$qNext[1],
          _updateState = _fsm$qNext[2];

      qNext = q;
      updateState = _updateState;
      return qNext === qEnd ? done : output;
    }
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* makeIterator */])(next, function (error) {
    return next(null, error);
  }, name, true);
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.readState = exports.saveState = undefined;

var _warning = __webpack_require__(8);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuotaExceededErrors = {
  QuotaExceededError: true,
  QUOTA_EXCEEDED_ERR: true
};

var SecurityErrors = {
  SecurityError: true
};

var KeyPrefix = '@@History/';

var createKey = function createKey(key) {
  return KeyPrefix + key;
};

var saveState = exports.saveState = function saveState(key, state) {
  if (!window.sessionStorage) {
    // Session storage is not available or hidden.
    // sessionStorage is undefined in Internet Explorer when served via file protocol.
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available') : void 0;

    return;
  }

  try {
    if (state == null) {
      window.sessionStorage.removeItem(createKey(key));
    } else {
      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
    }
  } catch (error) {
    if (SecurityErrors[error.name]) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available due to security settings') : void 0;

      return;
    }

    if (QuotaExceededErrors[error.name] && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : void 0;

      return;
    }

    throw error;
  }
};

var readState = exports.readState = function readState(key) {
  var json = void 0;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (SecurityErrors[error.name]) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to read state; sessionStorage is not available due to security settings') : void 0;

      return undefined;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return undefined;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _runTransitionHook = __webpack_require__(24);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _PathUtils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useBasename = function useBasename(createHistory) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var history = createHistory(options);
    var basename = options.basename;


    var addBasename = function addBasename(location) {
      if (!location) return location;

      if (basename && location.basename == null) {
        if (location.pathname.toLowerCase().indexOf(basename.toLowerCase()) === 0) {
          location.pathname = location.pathname.substring(basename.length);
          location.basename = basename;

          if (location.pathname === '') location.pathname = '/';
        } else {
          location.basename = '';
        }
      }

      return location;
    };

    var prependBasename = function prependBasename(location) {
      if (!basename) return location;

      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
      var pname = object.pathname;
      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
      var pathname = normalizedBasename + normalizedPathname;

      return _extends({}, object, {
        pathname: pathname
      });
    };

    // Override all read methods with basename-aware versions.
    var getCurrentLocation = function getCurrentLocation() {
      return addBasename(history.getCurrentLocation());
    };

    var listenBefore = function listenBefore(hook) {
      return history.listenBefore(function (location, callback) {
        return (0, _runTransitionHook2.default)(hook, addBasename(location), callback);
      });
    };

    var listen = function listen(listener) {
      return history.listen(function (location) {
        return listener(addBasename(location));
      });
    };

    // Override all write methods with basename-aware versions.
    var push = function push(location) {
      return history.push(prependBasename(location));
    };

    var replace = function replace(location) {
      return history.replace(prependBasename(location));
    };

    var createPath = function createPath(location) {
      return history.createPath(prependBasename(location));
    };

    var createHref = function createHref(location) {
      return history.createHref(prependBasename(location));
    };

    var createLocation = function createLocation(location) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
    };

    return _extends({}, history, {
      getCurrentLocation: getCurrentLocation,
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation
    });
  };
};

exports.default = useBasename;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _queryString = __webpack_require__(74);

var _runTransitionHook = __webpack_require__(24);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _LocationUtils = __webpack_require__(9);

var _PathUtils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStringifyQuery = function defaultStringifyQuery(query) {
  return (0, _queryString.stringify)(query).replace(/%20/g, '+');
};

var defaultParseQueryString = _queryString.parse;

/**
 * Returns a new createHistory function that may be used to create
 * history objects that know how to handle URL queries.
 */
var useQueries = function useQueries(createHistory) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var history = createHistory(options);
    var stringifyQuery = options.stringifyQuery,
        parseQueryString = options.parseQueryString;


    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

    var decodeQuery = function decodeQuery(location) {
      if (!location) return location;

      if (location.query == null) location.query = parseQueryString(location.search.substring(1));

      return location;
    };

    var encodeQuery = function encodeQuery(location, query) {
      if (query == null) return location;

      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
      var queryString = stringifyQuery(query);
      var search = queryString ? '?' + queryString : '';

      return _extends({}, object, {
        search: search
      });
    };

    // Override all read methods with query-aware versions.
    var getCurrentLocation = function getCurrentLocation() {
      return decodeQuery(history.getCurrentLocation());
    };

    var listenBefore = function listenBefore(hook) {
      return history.listenBefore(function (location, callback) {
        return (0, _runTransitionHook2.default)(hook, decodeQuery(location), callback);
      });
    };

    var listen = function listen(listener) {
      return history.listen(function (location) {
        return listener(decodeQuery(location));
      });
    };

    // Override all write methods with query-aware versions.
    var push = function push(location) {
      return history.push(encodeQuery(location, location.query));
    };

    var replace = function replace(location) {
      return history.replace(encodeQuery(location, location.query));
    };

    var createPath = function createPath(location) {
      return history.createPath(encodeQuery(location, location.query));
    };

    var createHref = function createHref(location) {
      return history.createHref(encodeQuery(location, location.query));
    };

    var createLocation = function createLocation(location) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var newLocation = history.createLocation.apply(history, [encodeQuery(location, location.query)].concat(args));

      if (location.query) newLocation.query = (0, _LocationUtils.createQuery)(location.query);

      return decodeQuery(newLocation);
    };

    return _extends({}, history, {
      getCurrentLocation: getCurrentLocation,
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation
    });
  };
};

exports.default = useQueries;

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(69);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(70);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_create_react_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PropTypes__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ContextUtils__ = __webpack_require__(27);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
function isEmptyObject(object) {
  for (var p in object) {
    if (Object.prototype.hasOwnProperty.call(object, p)) return false;
  }return true;
}

function resolveToLocation(to, router) {
  return typeof to === 'function' ? to(router.location) : to;
}

/**
 * A <Link> is used to create an <a> element that links to a route.
 * When that route is active, the link gets the value of its
 * activeClassName prop.
 *
 * For example, assuming you have the following route:
 *
 *   <Route path="/posts/:postID" component={Post} />
 *
 * You could use the following component to link to that route:
 *
 *   <Link to={`/posts/${post.id}`} />
 */
var Link = __WEBPACK_IMPORTED_MODULE_1_create_react_class___default()({
  displayName: 'Link',

  mixins: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__ContextUtils__["b" /* ContextSubscriber */])('router')],

  contextTypes: {
    router: __WEBPACK_IMPORTED_MODULE_4__PropTypes__["b" /* routerShape */]
  },

  propTypes: {
    to: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_2_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_2_prop_types__["object"], __WEBPACK_IMPORTED_MODULE_2_prop_types__["func"]]),
    activeStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types__["object"],
    activeClassName: __WEBPACK_IMPORTED_MODULE_2_prop_types__["string"],
    onlyActiveOnIndex: __WEBPACK_IMPORTED_MODULE_2_prop_types__["bool"].isRequired,
    onClick: __WEBPACK_IMPORTED_MODULE_2_prop_types__["func"],
    target: __WEBPACK_IMPORTED_MODULE_2_prop_types__["string"]
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onlyActiveOnIndex: false,
      style: {}
    };
  },
  handleClick: function handleClick(event) {
    if (this.props.onClick) this.props.onClick(event);

    if (event.defaultPrevented) return;

    var router = this.context.router;

    !router ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_3_invariant___default()(false, '<Link>s rendered outside of a router context cannot navigate.') : __WEBPACK_IMPORTED_MODULE_3_invariant___default()(false) : void 0;

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

    // If target prop is set (e.g. to "_blank"), let browser handle link.
    /* istanbul ignore if: untestable with Karma */
    if (this.props.target) return;

    event.preventDefault();

    router.push(resolveToLocation(this.props.to, router));
  },
  render: function render() {
    var _props = this.props,
        to = _props.to,
        activeClassName = _props.activeClassName,
        activeStyle = _props.activeStyle,
        onlyActiveOnIndex = _props.onlyActiveOnIndex,
        props = _objectWithoutProperties(_props, ['to', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

    // Ignore if rendered outside the context of router to simplify unit testing.


    var router = this.context.router;


    if (router) {
      // If user does not specify a `to` prop, return an empty anchor tag.
      if (!to) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a', props);
      }

      var toLocation = resolveToLocation(to, router);
      props.href = router.createHref(toLocation);

      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
        if (router.isActive(toLocation, onlyActiveOnIndex)) {
          if (activeClassName) {
            if (props.className) {
              props.className += ' ' + activeClassName;
            } else {
              props.className = activeClassName;
            }
          }

          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
        }
      }
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a', _extends({}, props, { onClick: this.handleClick }));
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Link);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isPromise;
function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__RouteUtils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PatternUtils__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__ = __webpack_require__(14);







/**
 * A <Redirect> is used to declare another URL path a client should
 * be sent to when they request a given URL.
 *
 * Redirects are placed alongside routes in the route configuration
 * and are traversed in the same manner.
 */
/* eslint-disable react/require-render-return */
var Redirect = __WEBPACK_IMPORTED_MODULE_0_create_react_class___default()({
  displayName: 'Redirect',

  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element) {
      var route = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__RouteUtils__["c" /* createRouteFromReactElement */])(element);

      if (route.from) route.path = route.from;

      route.onEnter = function (nextState, replace) {
        var location = nextState.location,
            params = nextState.params;


        var pathname = void 0;
        if (route.to.charAt(0) === '/') {
          pathname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__PatternUtils__["a" /* formatPattern */])(route.to, params);
        } else if (!route.to) {
          pathname = location.pathname;
        } else {
          var routeIndex = nextState.routes.indexOf(route);
          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
          pathname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__PatternUtils__["a" /* formatPattern */])(pattern, params);
        }

        replace({
          pathname: pathname,
          query: route.query || location.query,
          state: route.state || location.state
        });
      };

      return route;
    },
    getRoutePattern: function getRoutePattern(routes, routeIndex) {
      var parentPattern = '';

      for (var i = routeIndex; i >= 0; i--) {
        var route = routes[i];
        var pattern = route.path || '';

        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

        if (pattern.indexOf('/') === 0) break;
      }

      return '/' + parentPattern;
    }
  },

  propTypes: {
    path: __WEBPACK_IMPORTED_MODULE_1_prop_types__["string"],
    from: __WEBPACK_IMPORTED_MODULE_1_prop_types__["string"], // Alias for path
    to: __WEBPACK_IMPORTED_MODULE_1_prop_types__["string"].isRequired,
    query: __WEBPACK_IMPORTED_MODULE_1_prop_types__["object"],
    state: __WEBPACK_IMPORTED_MODULE_1_prop_types__["object"],
    onEnter: __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__["c" /* falsy */],
    children: __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__["c" /* falsy */]
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
     true ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_2_invariant___default()(false, '<Redirect> elements are for router configuration only and should not be rendered') : __WEBPACK_IMPORTED_MODULE_2_invariant___default()(false) : void 0;
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Redirect);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createRouterObject;
/* harmony export (immutable) */ __webpack_exports__["b"] = assignRouterState;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function createRouterObject(history, transitionManager, state) {
  var router = _extends({}, history, {
    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
    isActive: transitionManager.isActive
  });

  return assignRouterState(router, state);
}

function assignRouterState(router, _ref) {
  var location = _ref.location,
      params = _ref.params,
      routes = _ref.routes;

  router.location = location;
  router.params = params;
  router.routes = routes;

  return router;
}

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createMemoryHistory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_useQueries__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_useQueries___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_lib_useQueries__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_history_lib_useBasename__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_history_lib_useBasename___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_history_lib_useBasename__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_lib_createMemoryHistory__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_lib_createMemoryHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_history_lib_createMemoryHistory__);




function createMemoryHistory(options) {
  // signatures and type checking differ between `useQueries` and
  // `createMemoryHistory`, have to create `memoryHistory` first because
  // `useQueries` doesn't understand the signature
  var memoryHistory = __WEBPACK_IMPORTED_MODULE_2_history_lib_createMemoryHistory___default()(options);
  var createHistory = function createHistory() {
    return memoryHistory;
  };
  var history = __WEBPACK_IMPORTED_MODULE_0_history_lib_useQueries___default()(__WEBPACK_IMPORTED_MODULE_1_history_lib_useBasename___default()(createHistory))(options);
  return history;
}

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createRouterHistory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__useRouterHistory__ = __webpack_require__(44);


var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

function createRouterHistory(createHistory) {
  var history = void 0;
  if (canUseDOM) history = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__useRouterHistory__["a" /* default */])(createHistory)();
  return history;
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = createTransitionManager;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__routerWarning__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__computeChangedRoutes__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TransitionUtils__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__isActive__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getComponents__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__matchRoutes__ = __webpack_require__(90);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








function hasAnyProperties(object) {
  for (var p in object) {
    if (Object.prototype.hasOwnProperty.call(object, p)) return true;
  }return false;
}

function createTransitionManager(history, routes) {
  var state = {};

  var _getTransitionUtils = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__TransitionUtils__["a" /* default */])(),
      runEnterHooks = _getTransitionUtils.runEnterHooks,
      runChangeHooks = _getTransitionUtils.runChangeHooks,
      runLeaveHooks = _getTransitionUtils.runLeaveHooks;

  // Signature should be (location, indexOnly), but needs to support (path,
  // query, indexOnly)


  function isActive(location, indexOnly) {
    location = history.createLocation(location);

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__isActive__["a" /* default */])(location, indexOnly, state.location, state.routes, state.params);
  }

  var partialNextState = void 0;

  function match(location, callback) {
    if (partialNextState && partialNextState.location === location) {
      // Continue from where we left off.
      finishMatch(partialNextState, callback);
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__matchRoutes__["a" /* default */])(routes, location, function (error, nextState) {
        if (error) {
          callback(error);
        } else if (nextState) {
          finishMatch(_extends({}, nextState, { location: location }), callback);
        } else {
          callback();
        }
      });
    }
  }

  function finishMatch(nextState, callback) {
    var _computeChangedRoutes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__computeChangedRoutes__["a" /* default */])(state, nextState),
        leaveRoutes = _computeChangedRoutes.leaveRoutes,
        changeRoutes = _computeChangedRoutes.changeRoutes,
        enterRoutes = _computeChangedRoutes.enterRoutes;

    runLeaveHooks(leaveRoutes, state);

    // Tear down confirmation hooks for left routes
    leaveRoutes.filter(function (route) {
      return enterRoutes.indexOf(route) === -1;
    }).forEach(removeListenBeforeHooksForRoute);

    // change and enter hooks are run in series
    runChangeHooks(changeRoutes, state, nextState, function (error, redirectInfo) {
      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

      runEnterHooks(enterRoutes, nextState, finishEnterHooks);
    });

    function finishEnterHooks(error, redirectInfo) {
      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

      // TODO: Fetch components after state is updated.
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__getComponents__["a" /* default */])(nextState, function (error, components) {
        if (error) {
          callback(error);
        } else {
          // TODO: Make match a pure function and have some other API
          // for "match and update state".
          callback(null, null, state = _extends({}, nextState, { components: components }));
        }
      });
    }

    function handleErrorOrRedirect(error, redirectInfo) {
      if (error) callback(error);else callback(null, redirectInfo);
    }
  }

  var RouteGuid = 1;

  function getRouteID(route) {
    var create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return route.__id__ || create && (route.__id__ = RouteGuid++);
  }

  var RouteHooks = Object.create(null);

  function getRouteHooksForRoutes(routes) {
    return routes.map(function (route) {
      return RouteHooks[getRouteID(route)];
    }).filter(function (hook) {
      return hook;
    });
  }

  function transitionHook(location, callback) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__matchRoutes__["a" /* default */])(routes, location, function (error, nextState) {
      if (nextState == null) {
        // TODO: We didn't actually match anything, but hang
        // onto error/nextState so we don't have to matchRoutes
        // again in the listen callback.
        callback();
        return;
      }

      // Cache some state here so we don't have to
      // matchRoutes() again in the listen callback.
      partialNextState = _extends({}, nextState, { location: location });

      var hooks = getRouteHooksForRoutes(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__computeChangedRoutes__["a" /* default */])(state, partialNextState).leaveRoutes);

      var result = void 0;
      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
        // Passing the location arg here indicates to
        // the user that this is a transition hook.
        result = hooks[i](location);
      }

      callback(result);
    });
  }

  /* istanbul ignore next: untestable with Karma */
  function beforeUnloadHook() {
    // Synchronously check to see if any route hooks want
    // to prevent the current window/tab from closing.
    if (state.routes) {
      var hooks = getRouteHooksForRoutes(state.routes);

      var message = void 0;
      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
        // Passing no args indicates to the user that this is a
        // beforeunload hook. We don't know the next location.
        message = hooks[i]();
      }

      return message;
    }
  }

  var unlistenBefore = void 0,
      unlistenBeforeUnload = void 0;

  function removeListenBeforeHooksForRoute(route) {
    var routeID = getRouteID(route);
    if (!routeID) {
      return;
    }

    delete RouteHooks[routeID];

    if (!hasAnyProperties(RouteHooks)) {
      // teardown transition & beforeunload hooks
      if (unlistenBefore) {
        unlistenBefore();
        unlistenBefore = null;
      }

      if (unlistenBeforeUnload) {
        unlistenBeforeUnload();
        unlistenBeforeUnload = null;
      }
    }
  }

  /**
   * Registers the given hook function to run before leaving the given route.
   *
   * During a normal transition, the hook function receives the next location
   * as its only argument and can return either a prompt message (string) to show the user,
   * to make sure they want to leave the page; or `false`, to prevent the transition.
   * Any other return value will have no effect.
   *
   * During the beforeunload event (in browsers) the hook receives no arguments.
   * In this case it must return a prompt message to prevent the transition.
   *
   * Returns a function that may be used to unbind the listener.
   */
  function listenBeforeLeavingRoute(route, hook) {
    var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);
    var routeID = getRouteID(route, true);

    RouteHooks[routeID] = hook;

    if (thereWereNoRouteHooks) {
      // setup transition & beforeunload hooks
      unlistenBefore = history.listenBefore(transitionHook);

      if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
    }

    return function () {
      removeListenBeforeHooksForRoute(route);
    };
  }

  /**
   * This is the API for stateful environments. As the location
   * changes, we update state and call the listener. We can also
   * gracefully handle errors and redirects.
   */
  function listen(listener) {
    function historyListener(location) {
      if (state.location === location) {
        listener(null, state);
      } else {
        match(location, function (error, redirectLocation, nextState) {
          if (error) {
            listener(error);
          } else if (redirectLocation) {
            history.replace(redirectLocation);
          } else if (nextState) {
            listener(null, nextState);
          } else {
            process.env.NODE_ENV !== 'production' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__routerWarning__["a" /* default */])(false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : void 0;
          }
        });
      }
    }

    // TODO: Only use a single history listener. Otherwise we'll end up with
    // multiple concurrent calls to match.

    // Set up the history listener first in case the initial match redirects.
    var unsubscribe = history.listen(historyListener);

    if (state.location) {
      // Picking up on a matchContext.
      listener(null, state);
    } else {
      historyListener(history.getCurrentLocation());
    }

    return unsubscribe;
  }

  return {
    isActive: isActive,
    match: match,
    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
    listen: listen
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = useRouterHistory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_useQueries__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_useQueries___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_lib_useQueries__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_history_lib_useBasename__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_history_lib_useBasename___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_history_lib_useBasename__);



function useRouterHistory(createHistory) {
  return function (options) {
    var history = __WEBPACK_IMPORTED_MODULE_0_history_lib_useQueries___default()(__WEBPACK_IMPORTED_MODULE_1_history_lib_useBasename___default()(createHistory))(options);
    return history;
  };
}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_io__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "take", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takem", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "put", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "race", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "call", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cps", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fork", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "spawn", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "join", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cancel", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "actionChannel", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cancelled", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeEvery", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeLatest", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["v"]; });


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export NOT_ITERATOR_ERROR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANNEL_END; });
/* unused harmony export TASK_CANCEL */
/* harmony export (immutable) */ __webpack_exports__["b"] = proc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__io__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__channel__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buffers__ = __webpack_require__(18);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }







var NOT_ITERATOR_ERROR = 'proc first argument (Saga function result) must be an iterator';

var CHANNEL_END = {
  toString: function toString() {
    return '@@redux-saga/CHANNEL_END';
  }
};
var TASK_CANCEL = {
  toString: function toString() {
    return '@@redux-saga/TASK_CANCEL';
  }
};

var matchers = {
  wildcard: function wildcard() {
    return __WEBPACK_IMPORTED_MODULE_0__utils__["k" /* kTrue */];
  },
  default: function _default(pattern) {
    return (typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) === 'symbol' ? function (input) {
      return input.type === pattern;
    } : function (input) {
      return input.type === String(pattern);
    };
  },
  array: function array(patterns) {
    return function (input) {
      return patterns.some(function (p) {
        return matcher(p)(input);
      });
    };
  },
  predicate: function predicate(_predicate) {
    return function (input) {
      return _predicate(input);
    };
  }
};

function matcher(pattern) {
  // prettier-ignore
  return (pattern === '*' ? matchers.wildcard : __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].array(pattern) ? matchers.array : __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].stringableFunc(pattern) ? matchers.default : __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(pattern) ? matchers.predicate : matchers.default)(pattern);
}

/**
  Used to track a parent task and its forks
  In the new fork model, forked tasks are attached by default to their parent
  We model this using the concept of Parent task && main Task
  main task is the main flow of the current Generator, the parent tasks is the
  aggregation of the main tasks + all its forked tasks.
  Thus the whole model represents an execution tree with multiple branches (vs the
  linear execution tree in sequential (non parallel) programming)

  A parent tasks has the following semantics
  - It completes if all its forks either complete or all cancelled
  - If it's cancelled, all forks are cancelled as well
  - It aborts if any uncaught error bubbles up from forks
  - If it completes, the return value is the one returned by the main task
**/
function forkQueue(name, mainTask, cb) {
  var tasks = [],
      result = void 0,
      completed = false;
  addTask(mainTask);

  function abort(err) {
    cancelAll();
    cb(err, true);
  }

  function addTask(task) {
    tasks.push(task);
    task.cont = function (res, isErr) {
      if (completed) {
        return;
      }

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["l" /* remove */])(tasks, task);
      task.cont = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }
        if (!tasks.length) {
          completed = true;
          cb(result);
        }
      }
    };
    // task.cont.cancel = task.cancel
  }

  function cancelAll() {
    if (completed) {
      return;
    }
    completed = true;
    tasks.forEach(function (t) {
      t.cont = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
      t.cancel();
    });
    tasks = [];
  }

  return {
    addTask: addTask,
    cancelAll: cancelAll,
    abort: abort,
    getTasks: function getTasks() {
      return tasks;
    },
    taskNames: function taskNames() {
      return tasks.map(function (t) {
        return t.name;
      });
    }
  };
}

function createTaskIterator(_ref) {
  var context = _ref.context,
      fn = _ref.fn,
      args = _ref.args;

  if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].iterator(fn)) {
    return fn;
  }

  // catch synchronous failures; see #152 and #441
  var result = void 0,
      error = void 0;
  try {
    result = fn.apply(context, args);
  } catch (err) {
    error = err;
  }

  // i.e. a generator function returns an iterator
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].iterator(result)) {
    return result;
  }

  // do not bubble up synchronous failures for detached forks
  // instead create a failed task. See #152 and #441
  return error ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* makeIterator */])(function () {
    throw error;
  }) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* makeIterator */])(function () {
    var pc = void 0;
    var eff = { done: false, value: result };
    var ret = function ret(value) {
      return { done: true, value: value };
    };
    return function (arg) {
      if (!pc) {
        pc = true;
        return eff;
      } else {
        return ret(arg);
      }
    };
  }());
}

var wrapHelper = function wrapHelper(helper) {
  return { fn: helper };
};

function proc(iterator) {
  var subscribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
  };
  var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
  var getState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
  var parentContext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var parentEffectId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var name = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'anonymous';
  var cont = arguments[8];

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(iterator, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].iterator, NOT_ITERATOR_ERROR);

  var effectsString = '[...effects]';
  var runParallelEffect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["o" /* deprecate */])(runAllEffect, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["p" /* updateIncentive */])(effectsString, 'all(' + effectsString + ')'));

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;

  var log = logger || __WEBPACK_IMPORTED_MODULE_0__utils__["q" /* log */];
  var stdChannel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["d" /* stdChannel */])(subscribe);
  var taskContext = Object.create(parentContext);
  /**
    Tracks the current effect cancellation
    Each time the generator progresses. calling runEffect will set a new value
    on it. It allows propagating cancellation to child effects
  **/
  next.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];

  /**
    Creates a new task descriptor for this generator, We'll also create a main task
    to track the main flow (besides other forked tasks)
  **/
  var task = newTask(parentEffectId, name, iterator, cont);
  var mainTask = { name: name, cancel: cancelMain, isRunning: true };
  var taskQueue = forkQueue(name, mainTask, end);

  /**
    cancellation of the main task. We'll simply resume the Generator with a Cancel
  **/
  function cancelMain() {
    if (mainTask.isRunning && !mainTask.isCancelled) {
      mainTask.isCancelled = true;
      next(TASK_CANCEL);
    }
  }

  /**
    This may be called by a parent generator to trigger/propagate cancellation
    cancel all pending tasks (including the main task), then end the current task.
     Cancellation propagates down to the whole execution tree holded by this Parent task
    It's also propagated to all joiners of this task and their execution tree/joiners
     Cancellation is noop for terminated/Cancelled tasks tasks
  **/
  function cancel() {
    /**
      We need to check both Running and Cancelled status
      Tasks can be Cancelled but still Running
    **/
    if (iterator._isRunning && !iterator._isCancelled) {
      iterator._isCancelled = true;
      taskQueue.cancelAll();
      /**
        Ending with a Never result will propagate the Cancellation to all joiners
      **/
      end(TASK_CANCEL);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/
  cont && (cont.cancel = cancel);

  // tracks the running status
  iterator._isRunning = true;

  // kicks up the generator
  next();

  // then return the task descriptor to the caller
  return task;

  /**
    This is the generator driver
    It's a recursive async/continuation function which calls itself
    until the generator terminates or throws
  **/
  function next(arg, isErr) {
    // Preventive measure. If we end up here, then there is really something wrong
    if (!mainTask.isRunning) {
      throw new Error('Trying to resume an already finished generator');
    }

    try {
      var result = void 0;
      if (isErr) {
        result = iterator.throw(arg);
      } else if (arg === TASK_CANCEL) {
        /**
          getting TASK_CANCEL automatically cancels the main task
          We can get this value here
           - By cancelling the parent task manually
          - By joining a Cancelled task
        **/
        mainTask.isCancelled = true;
        /**
          Cancels the current effect; this will propagate the cancellation down to any called tasks
        **/
        next.cancel();
        /**
          If this Generator has a `return` method then invokes it
          This will jump to the finally block
        **/
        result = __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(iterator.return) ? iterator.return(TASK_CANCEL) : { done: true, value: TASK_CANCEL };
      } else if (arg === CHANNEL_END) {
        // We get CHANNEL_END by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
        result = __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(iterator.return) ? iterator.return() : { done: true };
      } else {
        result = iterator.next(arg);
      }

      if (!result.done) {
        runEffect(result.value, parentEffectId, '', next);
      } else {
        /**
          This Generator has ended, terminate the main task and notify the fork queue
        **/
        mainTask.isMainRunning = false;
        mainTask.cont && mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.isCancelled) {
        log('error', 'uncaught at ' + name, error.message);
      }
      mainTask.isMainRunning = false;
      mainTask.cont(error, true);
    }
  }

  function end(result, isErr) {
    iterator._isRunning = false;
    stdChannel.close();
    if (!isErr) {
      if (process.env.NODE_ENV === 'development' && result === TASK_CANCEL) {
        log('info', name + ' has been cancelled', '');
      }
      iterator._result = result;
      iterator._deferredEnd && iterator._deferredEnd.resolve(result);
    } else {
      if (result instanceof Error) {
        result.sagaStack = 'at ' + name + ' \n ' + (result.sagaStack || result.stack);
      }
      if (!task.cont) {
        log('error', 'uncaught', result.sagaStack || result.stack);
        if (result instanceof Error && onError) {
          onError(result);
        }
      }
      iterator._error = result;
      iterator._isAborted = true;
      iterator._deferredEnd && iterator._deferredEnd.reject(result);
    }
    task.cont && task.cont(result, isErr);
    task.joiners.forEach(function (j) {
      return j.cb(result, isErr);
    });
    task.joiners = null;
  }

  function runEffect(effect, parentEffectId) {
    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var cb = arguments[3];

    var effectId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["r" /* uid */])();
    sagaMonitor && sagaMonitor.effectTriggered({ effectId: effectId, parentEffectId: parentEffectId, label: label, effect: effect });

    /**
      completion callback and cancel callback are mutually exclusive
      We can't cancel an already completed effect
      And We can't complete an already cancelled effectId
    **/
    var effectSettled = void 0;

    // Completion callback passed to the appropriate effect runner
    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      cb.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */]; // defensive measure
      if (sagaMonitor) {
        isErr ? sagaMonitor.effectRejected(effectId, res) : sagaMonitor.effectResolved(effectId, res);
      }
      cb(res, isErr);
    }
    // tracks down the current cancel
    currCb.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];

    // setup cancellation logic on the parent cb
    cb.cancel = function () {
      // prevents cancelling an already completed effect
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      /**
        propagates cancel downward
        catch uncaught cancellations errors; since we can no longer call the completion
        callback, log errors raised during cancellations into the console
      **/
      try {
        currCb.cancel();
      } catch (err) {
        log('error', 'uncaught at ' + name, err.message);
      }
      currCb.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */]; // defensive measure

      sagaMonitor && sagaMonitor.effectCancelled(effectId);
    };

    /**
      each effect runner must attach its own logic of cancellation to the provided callback
      it allows this generator to propagate cancellation downward.
       ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
      And the setup must occur before calling the callback
       This is a sort of inversion of control: called async functions are responsible
      for completing the flow by calling the provided continuation; while caller functions
      are responsible for aborting the current flow by calling the attached cancel function
       Library users can attach their own cancellation logic to promises by defining a
      promise[CANCEL] method in their returned promises
      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
    **/
    var data = void 0;
    // prettier-ignore
    return (
      // Non declarative effect
      __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].promise(effect) ? resolvePromise(effect, currCb) : __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].helper(effect) ? runForkEffect(wrapHelper(effect), effectId, currCb) : __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].iterator(effect) ? resolveIterator(effect, effectId, name, currCb)

      // declarative effects
      : __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].array(effect) ? runParallelEffect(effect, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].take(effect)) ? runTakeEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].put(effect)) ? runPutEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].all(effect)) ? runAllEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].race(effect)) ? runRaceEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].call(effect)) ? runCallEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].cps(effect)) ? runCPSEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].fork(effect)) ? runForkEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].join(effect)) ? runJoinEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].cancel(effect)) ? runCancelEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].select(effect)) ? runSelectEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].actionChannel(effect)) ? runChannelEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].flush(effect)) ? runFlushEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].cancelled(effect)) ? runCancelledEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].getContext(effect)) ? runGetContextEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["a" /* asEffect */].setContext(effect)) ? runSetContextEffect(data, currCb) : /* anything else returned as is */currCb(effect)
    );
  }

  function resolvePromise(promise, cb) {
    var cancelPromise = promise[__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* CANCEL */]];
    if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(cancelPromise)) {
      cb.cancel = cancelPromise;
    } else if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(promise.abort)) {
      cb.cancel = function () {
        return promise.abort();
      };
      // TODO: add support for the fetch API, whenever they get around to
      // adding cancel support
    }
    promise.then(cb, function (error) {
      return cb(error, true);
    });
  }

  function resolveIterator(iterator, effectId, name, cb) {
    proc(iterator, subscribe, dispatch, getState, taskContext, options, effectId, name, cb);
  }

  function runTakeEffect(_ref2, cb) {
    var channel = _ref2.channel,
        pattern = _ref2.pattern,
        maybe = _ref2.maybe;

    channel = channel || stdChannel;
    var takeCb = function takeCb(inp) {
      return inp instanceof Error ? cb(inp, true) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["e" /* isEnd */])(inp) && !maybe ? cb(CHANNEL_END) : cb(inp);
    };
    try {
      channel.take(takeCb, matcher(pattern));
    } catch (err) {
      return cb(err, true);
    }
    cb.cancel = takeCb.cancel;
  }

  function runPutEffect(_ref3, cb) {
    var channel = _ref3.channel,
        action = _ref3.action,
        resolve = _ref3.resolve;

    /**
      Schedule the put in case another saga is holding a lock.
      The put will be executed atomically. ie nested puts will execute after
      this put has terminated.
    **/
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scheduler__["a" /* asap */])(function () {
      var result = void 0;
      try {
        result = (channel ? channel.put : dispatch)(action);
      } catch (error) {
        // If we have a channel or `put.resolve` was used then bubble up the error.
        if (channel || resolve) return cb(error, true);
        log('error', 'uncaught at ' + name, error.stack || error.message || error);
      }

      if (resolve && __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].promise(result)) {
        resolvePromise(result, cb);
      } else {
        return cb(result);
      }
    });
    // Put effects are non cancellables
  }

  function runCallEffect(_ref4, effectId, cb) {
    var context = _ref4.context,
        fn = _ref4.fn,
        args = _ref4.args;

    var result = void 0;
    // catch synchronous failures; see #152
    try {
      result = fn.apply(context, args);
    } catch (error) {
      return cb(error, true);
    }
    return __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].promise(result) ? resolvePromise(result, cb) : __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].iterator(result) ? resolveIterator(result, effectId, fn.name, cb) : cb(result);
  }

  function runCPSEffect(_ref5, cb) {
    var context = _ref5.context,
        fn = _ref5.fn,
        args = _ref5.args;

    // CPS (ie node style functions) can define their own cancellation logic
    // by setting cancel field on the cb

    // catch synchronous failures; see #152
    try {
      var cpsCb = function cpsCb(err, res) {
        return __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].undef(err) ? cb(res) : cb(err, true);
      };
      fn.apply(context, args.concat(cpsCb));
      if (cpsCb.cancel) {
        cb.cancel = function () {
          return cpsCb.cancel();
        };
      }
    } catch (error) {
      return cb(error, true);
    }
  }

  function runForkEffect(_ref6, effectId, cb) {
    var context = _ref6.context,
        fn = _ref6.fn,
        args = _ref6.args,
        detached = _ref6.detached;

    var taskIterator = createTaskIterator({ context: context, fn: fn, args: args });

    try {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scheduler__["b" /* suspend */])();
      var _task = proc(taskIterator, subscribe, dispatch, getState, taskContext, options, effectId, fn.name, detached ? null : __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */]);

      if (detached) {
        cb(_task);
      } else {
        if (taskIterator._isRunning) {
          taskQueue.addTask(_task);
          cb(_task);
        } else if (taskIterator._error) {
          taskQueue.abort(taskIterator._error);
        } else {
          cb(_task);
        }
      }
    } finally {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scheduler__["c" /* flush */])();
    }
    // Fork effects are non cancellables
  }

  function runJoinEffect(t, cb) {
    if (t.isRunning()) {
      var joiner = { task: task, cb: cb };
      cb.cancel = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["l" /* remove */])(t.joiners, joiner);
      };
      t.joiners.push(joiner);
    } else {
      t.isAborted() ? cb(t.error(), true) : cb(t.result());
    }
  }

  function runCancelEffect(taskToCancel, cb) {
    if (taskToCancel === __WEBPACK_IMPORTED_MODULE_0__utils__["s" /* SELF_CANCELLATION */]) {
      taskToCancel = task;
    }
    if (taskToCancel.isRunning()) {
      taskToCancel.cancel();
    }
    cb();
    // cancel effects are non cancellables
  }

  function runAllEffect(effects, effectId, cb) {
    var keys = Object.keys(effects);

    if (!keys.length) {
      return cb(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].array(effects) ? [] : {});
    }

    var completedCount = 0;
    var completed = void 0;
    var results = {};
    var childCbs = {};

    function checkEffectEnd() {
      if (completedCount === keys.length) {
        completed = true;
        cb(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].array(effects) ? __WEBPACK_IMPORTED_MODULE_0__utils__["t" /* array */].from(_extends({}, results, { length: keys.length })) : results);
      }
    }

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }
        if (isErr || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["e" /* isEnd */])(res) || res === CHANNEL_END || res === TASK_CANCEL) {
          cb.cancel();
          cb(res, isErr);
        } else {
          results[key] = res;
          completedCount++;
          checkEffectEnd();
        }
      };
      chCbAtKey.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };

    keys.forEach(function (key) {
      return runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runRaceEffect(effects, effectId, cb) {
    var completed = void 0;
    var keys = Object.keys(effects);
    var childCbs = {};

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }

        if (isErr) {
          // Race Auto cancellation
          cb.cancel();
          cb(res, true);
        } else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["e" /* isEnd */])(res) && res !== CHANNEL_END && res !== TASK_CANCEL) {
          var _cb;

          cb.cancel();
          completed = true;
          cb((_cb = {}, _cb[key] = res, _cb));
        }
      };
      chCbAtKey.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      // prevents unnecessary cancellation
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };
    keys.forEach(function (key) {
      if (completed) {
        return;
      }
      runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runSelectEffect(_ref7, cb) {
    var selector = _ref7.selector,
        args = _ref7.args;

    try {
      var state = selector.apply(undefined, [getState()].concat(args));
      cb(state);
    } catch (error) {
      cb(error, true);
    }
  }

  function runChannelEffect(_ref8, cb) {
    var pattern = _ref8.pattern,
        buffer = _ref8.buffer;

    var match = matcher(pattern);
    match.pattern = pattern;
    cb(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["b" /* eventChannel */])(subscribe, buffer || __WEBPACK_IMPORTED_MODULE_4__buffers__["a" /* buffers */].fixed(), match));
  }

  function runCancelledEffect(data, cb) {
    cb(!!mainTask.isCancelled);
  }

  function runFlushEffect(channel, cb) {
    channel.flush(cb);
  }

  function runGetContextEffect(prop, cb) {
    cb(taskContext[prop]);
  }

  function runSetContextEffect(props, cb) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* object */].assign(taskContext, props);
    cb();
  }

  function newTask(id, name, iterator, cont) {
    var _done, _ref9, _mutatorMap;

    iterator._deferredEnd = null;
    return _ref9 = {}, _ref9[__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* TASK */]] = true, _ref9.id = id, _ref9.name = name, _done = 'done', _mutatorMap = {}, _mutatorMap[_done] = _mutatorMap[_done] || {}, _mutatorMap[_done].get = function () {
      if (iterator._deferredEnd) {
        return iterator._deferredEnd.promise;
      } else {
        var def = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* deferred */])();
        iterator._deferredEnd = def;
        if (!iterator._isRunning) {
          iterator._error ? def.reject(iterator._error) : def.resolve(iterator._result);
        }
        return def.promise;
      }
    }, _ref9.cont = cont, _ref9.joiners = [], _ref9.cancel = cancel, _ref9.isRunning = function isRunning() {
      return iterator._isRunning;
    }, _ref9.isCancelled = function isCancelled() {
      return iterator._isCancelled;
    }, _ref9.isAborted = function isAborted() {
      return iterator._isAborted;
    }, _ref9.result = function result() {
      return iterator._result;
    }, _ref9.error = function error() {
      return iterator._error;
    }, _ref9.setContext = function setContext(props) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(props, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].object, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["v" /* createSetContextWarning */])('task', props));
      __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* object */].assign(taskContext, props);
    }, _defineEnumerableProperties(_ref9, _mutatorMap), _ref9;
  }
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = runSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__proc__ = __webpack_require__(46);



var RUN_SAGA_SIGNATURE = 'runSaga(storeInterface, saga, ...args)';
var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ': saga argument must be a Generator function!';

function runSaga(storeInterface, saga) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var iterator = void 0;

  if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].iterator(storeInterface)) {
    if (process.env.NODE_ENV === 'development') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* log */])('warn', 'runSaga(iterator, storeInterface) has been deprecated in favor of ' + RUN_SAGA_SIGNATURE);
    }
    iterator = storeInterface;
    storeInterface = saga;
  } else {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(saga, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func, NON_GENERATOR_ERR);
    iterator = saga.apply(undefined, args);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(iterator, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].iterator, NON_GENERATOR_ERR);
  }

  var _storeInterface = storeInterface,
      subscribe = _storeInterface.subscribe,
      dispatch = _storeInterface.dispatch,
      getState = _storeInterface.getState,
      context = _storeInterface.context,
      sagaMonitor = _storeInterface.sagaMonitor,
      logger = _storeInterface.logger,
      onError = _storeInterface.onError;


  var effectId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["r" /* uid */])();

  if (sagaMonitor) {
    // monitors are expected to have a certain interface, let's fill-in any missing ones
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* noop */];

    sagaMonitor.effectTriggered({ effectId: effectId, root: true, parentEffectId: 0, effect: { root: true, saga: saga, args: args } });
  }

  var task = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__proc__["b" /* default */])(iterator, subscribe, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["A" /* wrapSagaDispatch */])(dispatch), getState, context, { sagaMonitor: sagaMonitor, logger: logger, onError: onError }, effectId, saga.name);

  if (sagaMonitor) {
    sagaMonitor.effectResolved(effectId, task);
  }

  return task;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return takeEvery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return takeLatest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return throttle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__takeEvery__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__takeLatest__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__throttle__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__takeEvery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__takeLatest__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__throttle__["a"]; });






var deprecationWarning = function deprecationWarning(helperName) {
  return 'import { ' + helperName + ' } from \'redux-saga\' has been deprecated in favor of import { ' + helperName + ' } from \'redux-saga/effects\'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield ' + helperName + ' will return task descriptor to your saga and execute next lines of code.';
};

var takeEvery = /*#__PURE__*/__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["o" /* deprecate */])(__WEBPACK_IMPORTED_MODULE_0__takeEvery__["a" /* default */], /*#__PURE__*/deprecationWarning('takeEvery'));
var takeLatest = /*#__PURE__*/__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["o" /* deprecate */])(__WEBPACK_IMPORTED_MODULE_1__takeLatest__["a" /* default */], /*#__PURE__*/deprecationWarning('takeLatest'));
var throttle = /*#__PURE__*/__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["o" /* deprecate */])(__WEBPACK_IMPORTED_MODULE_2__throttle__["a" /* default */], /*#__PURE__*/deprecationWarning('throttle'));



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = asap;
/* harmony export (immutable) */ __webpack_exports__["b"] = suspend;
/* harmony export (immutable) */ __webpack_exports__["c"] = flush;
var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/
var semaphore = 0;

/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/
function exec(task) {
  try {
    suspend();
    task();
  } finally {
    release();
  }
}

/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/
function asap(task) {
  queue.push(task);

  if (!semaphore) {
    suspend();
    flush();
  }
}

/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/
function suspend() {
  semaphore++;
}

/**
  Puts the scheduler in a `released` state.
**/
function release() {
  semaphore--;
}

/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/
function flush() {
  release();

  var task = void 0;
  while (!semaphore && (task = queue.shift()) !== undefined) {
    exec(task);
  }
}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 53 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(5);
const ReactDOM = __webpack_require__(108);
const redux = __webpack_require__(102);
const ReactRouter = __webpack_require__(87);
const ReduxSagaEffects = __webpack_require__(45);
const ReduxSaga = __webpack_require__(93);
window['react-router'] = ReactRouter;
window['react-dom'] = ReactDOM;
window['redux'] = redux;
window['react'] = React;
window['redux-saga/effects'] = ReduxSagaEffects;
window['redux-saga'] = ReduxSaga;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(36);

var emptyObject = __webpack_require__(56);
var _invariant = __webpack_require__(15);

if (process.env.NODE_ENV !== 'production') {
  var warning = __webpack_require__(20);
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (process.env.NODE_ENV !== 'production') {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isInherited = name in Constructor;
      _invariant(
        !isInherited,
        'ReactClass: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be ' +
          'due to a mixin.',
        name
      );
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (process.env.NODE_ENV !== 'production') {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var loopAsync = exports.loopAsync = function loopAsync(turns, work, callback) {
  var currentTurn = 0,
      isDone = false;
  var isSync = false,
      hasNext = false,
      doneArgs = void 0;

  var done = function done() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    isDone = true;

    if (isSync) {
      // Iterate instead of recursing if possible.
      doneArgs = args;
      return;
    }

    callback.apply(undefined, args);
  };

  var next = function next() {
    if (isDone) return;

    hasNext = true;

    if (isSync) return; // Iterate instead of recursing if possible.

    isSync = true;

    while (!isDone && currentTurn < turns && hasNext) {
      hasNext = false;
      work(currentTurn++, next, done);
    }

    isSync = false;

    if (isDone) {
      // This means the loop finished synchronously.
      callback.apply(undefined, doneArgs);
      return;
    }

    if (currentTurn >= turns && hasNext) {
      isDone = true;
      callback();
    }
  };

  next();
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

var _BrowserProtocol = __webpack_require__(21);

Object.defineProperty(exports, 'getUserConfirmation', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.getUserConfirmation;
  }
});
Object.defineProperty(exports, 'go', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.go;
  }
});

var _warning = __webpack_require__(8);

var _warning2 = _interopRequireDefault(_warning);

var _LocationUtils = __webpack_require__(9);

var _DOMUtils = __webpack_require__(17);

var _DOMStateStorage = __webpack_require__(31);

var _PathUtils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HashChangeEvent = 'hashchange';

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation(pathCoder, queryKey) {
  var path = pathCoder.decodePath(getHashPath());
  var key = (0, _PathUtils.getQueryStringValueFromPath)(path, queryKey);

  var state = void 0;
  if (key) {
    path = (0, _PathUtils.stripQueryStringValueFromPath)(path, queryKey);
    state = (0, _DOMStateStorage.readState)(key);
  }

  var init = (0, _PathUtils.parsePath)(path);
  init.state = state;

  return (0, _LocationUtils.createLocation)(init, undefined, key);
};

var prevLocation = void 0;

var startListener = exports.startListener = function startListener(listener, pathCoder, queryKey) {
  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = pathCoder.encodePath(path);

    if (path !== encodedPath) {
      // Always be sure we have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var currentLocation = getCurrentLocation(pathCoder, queryKey);

      if (prevLocation && currentLocation.key && prevLocation.key === currentLocation.key) return; // Ignore extraneous hashchange events

      prevLocation = currentLocation;

      listener(currentLocation);
    }
  };

  // Ensure the hash is encoded properly.
  var path = getHashPath();
  var encodedPath = pathCoder.encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);

  return function () {
    return (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
  };
};

var updateLocation = function updateLocation(location, pathCoder, queryKey, updateHash) {
  var state = location.state,
      key = location.key;


  var path = pathCoder.encodePath((0, _PathUtils.createPath)(location));

  if (state !== undefined) {
    path = (0, _PathUtils.addQueryStringValueToPath)(path, queryKey, key);
    (0, _DOMStateStorage.saveState)(key, state);
  }

  prevLocation = location;

  updateHash(path);
};

var pushLocation = exports.pushLocation = function pushLocation(location, pathCoder, queryKey) {
  return updateLocation(location, pathCoder, queryKey, function (path) {
    if (getHashPath() !== path) {
      pushHashPath(path);
    } else {
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'You cannot PUSH the same path using hash history') : void 0;
    }
  });
};

var replaceLocation = exports.replaceLocation = function replaceLocation(location, pathCoder, queryKey) {
  return updateLocation(location, pathCoder, queryKey, function (path) {
    if (getHashPath() !== path) replaceHashPath(path);
  });
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.replaceLocation = exports.pushLocation = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

var _BrowserProtocol = __webpack_require__(21);

Object.defineProperty(exports, 'getUserConfirmation', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.getUserConfirmation;
  }
});
Object.defineProperty(exports, 'go', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.go;
  }
});

var _LocationUtils = __webpack_require__(9);

var _PathUtils = __webpack_require__(6);

var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
  return (0, _LocationUtils.createLocation)(window.location);
};

var pushLocation = exports.pushLocation = function pushLocation(location) {
  window.location.href = (0, _PathUtils.createPath)(location);
  return false; // Don't update location
};

var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
  window.location.replace((0, _PathUtils.createPath)(location));
  return false; // Don't update location
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = __webpack_require__(22);

var _BrowserProtocol = __webpack_require__(21);

var BrowserProtocol = _interopRequireWildcard(_BrowserProtocol);

var _RefreshProtocol = __webpack_require__(59);

var RefreshProtocol = _interopRequireWildcard(_RefreshProtocol);

var _DOMUtils = __webpack_require__(17);

var _createHistory = __webpack_require__(23);

var _createHistory2 = _interopRequireDefault(_createHistory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve clean URLs. You can force this
 * behavior using { forceRefresh: true } in options.
 */
var createBrowserHistory = function createBrowserHistory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;

  var useRefresh = options.forceRefresh || !(0, _DOMUtils.supportsHistory)();
  var Protocol = useRefresh ? RefreshProtocol : BrowserProtocol;

  var getUserConfirmation = Protocol.getUserConfirmation,
      getCurrentLocation = Protocol.getCurrentLocation,
      pushLocation = Protocol.pushLocation,
      replaceLocation = Protocol.replaceLocation,
      go = Protocol.go;


  var history = (0, _createHistory2.default)(_extends({
    getUserConfirmation: getUserConfirmation }, options, {
    getCurrentLocation: getCurrentLocation,
    pushLocation: pushLocation,
    replaceLocation: replaceLocation,
    go: go
  }));

  var listenerCount = 0,
      stopListener = void 0;

  var startListener = function startListener(listener, before) {
    if (++listenerCount === 1) stopListener = BrowserProtocol.startListener(history.transitionTo);

    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopListener();
    };
  };

  var listenBefore = function listenBefore(listener) {
    return startListener(listener, true);
  };

  var listen = function listen(listener) {
    return startListener(listener, false);
  };

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen
  });
};

exports.default = createBrowserHistory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(8);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = __webpack_require__(22);

var _DOMUtils = __webpack_require__(17);

var _HashProtocol = __webpack_require__(58);

var HashProtocol = _interopRequireWildcard(_HashProtocol);

var _createHistory = __webpack_require__(23);

var _createHistory2 = _interopRequireDefault(_createHistory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultQueryKey = '_k';

var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!' + path;
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substring(1) : path;
    }
  },
  noslash: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '/' ? path.substring(1) : path;
    },
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

var createHashHistory = function createHashHistory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Hash history needs a DOM') : (0, _invariant2.default)(false) : void 0;

  var queryKey = options.queryKey,
      hashType = options.hashType;


  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(queryKey !== false, 'Using { queryKey: false } no longer works. Instead, just don\'t ' + 'use location state if you don\'t want a key in your URL query string') : void 0;

  if (typeof queryKey !== 'string') queryKey = DefaultQueryKey;

  if (hashType == null) hashType = 'slash';

  if (!(hashType in HashPathCoders)) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Invalid hash type: %s', hashType) : void 0;

    hashType = 'slash';
  }

  var pathCoder = HashPathCoders[hashType];

  var getUserConfirmation = HashProtocol.getUserConfirmation;


  var getCurrentLocation = function getCurrentLocation() {
    return HashProtocol.getCurrentLocation(pathCoder, queryKey);
  };

  var pushLocation = function pushLocation(location) {
    return HashProtocol.pushLocation(location, pathCoder, queryKey);
  };

  var replaceLocation = function replaceLocation(location) {
    return HashProtocol.replaceLocation(location, pathCoder, queryKey);
  };

  var history = (0, _createHistory2.default)(_extends({
    getUserConfirmation: getUserConfirmation }, options, {
    getCurrentLocation: getCurrentLocation,
    pushLocation: pushLocation,
    replaceLocation: replaceLocation,
    go: HashProtocol.go
  }));

  var listenerCount = 0,
      stopListener = void 0;

  var startListener = function startListener(listener, before) {
    if (++listenerCount === 1) stopListener = HashProtocol.startListener(history.transitionTo, pathCoder, queryKey);

    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopListener();
    };
  };

  var listenBefore = function listenBefore(listener) {
    return startListener(listener, true);
  };

  var listen = function listen(listener) {
    return startListener(listener, false);
  };

  var goIsSupportedWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var go = function go(n) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;

    history.go(n);
  };

  var createHref = function createHref(path) {
    return '#' + pathCoder.encodePath(history.createHref(path));
  };

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    go: go,
    createHref: createHref
  });
};

exports.default = createHashHistory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(8);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(9);

var _PathUtils = __webpack_require__(6);

var _createHistory = __webpack_require__(23);

var _createHistory2 = _interopRequireDefault(_createHistory);

var _Actions = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStateStorage = function createStateStorage(entries) {
  return entries.filter(function (entry) {
    return entry.state;
  }).reduce(function (memo, entry) {
    memo[entry.key] = entry.state;
    return memo;
  }, {});
};

var createMemoryHistory = function createMemoryHistory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (Array.isArray(options)) {
    options = { entries: options };
  } else if (typeof options === 'string') {
    options = { entries: [options] };
  }

  var getCurrentLocation = function getCurrentLocation() {
    var entry = entries[current];
    var path = (0, _PathUtils.createPath)(entry);

    var key = void 0,
        state = void 0;
    if (entry.key) {
      key = entry.key;
      state = readState(key);
    }

    var init = (0, _PathUtils.parsePath)(path);

    return (0, _LocationUtils.createLocation)(_extends({}, init, { state: state }), undefined, key);
  };

  var canGo = function canGo(n) {
    var index = current + n;
    return index >= 0 && index < entries.length;
  };

  var go = function go(n) {
    if (!n) return;

    if (!canGo(n)) {
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Cannot go(%s) there is not enough history', n) : void 0;

      return;
    }

    current += n;
    var currentLocation = getCurrentLocation();

    // Change action to POP
    history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
  };

  var pushLocation = function pushLocation(location) {
    current += 1;

    if (current < entries.length) entries.splice(current);

    entries.push(location);

    saveState(location.key, location.state);
  };

  var replaceLocation = function replaceLocation(location) {
    entries[current] = location;
    saveState(location.key, location.state);
  };

  var history = (0, _createHistory2.default)(_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    pushLocation: pushLocation,
    replaceLocation: replaceLocation,
    go: go
  }));

  var _options = options,
      entries = _options.entries,
      current = _options.current;


  if (typeof entries === 'string') {
    entries = [entries];
  } else if (!Array.isArray(entries)) {
    entries = ['/'];
  }

  entries = entries.map(function (entry) {
    return (0, _LocationUtils.createLocation)(entry);
  });

  if (current == null) {
    current = entries.length - 1;
  } else {
    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : (0, _invariant2.default)(false) : void 0;
  }

  var storage = createStateStorage(entries);

  var saveState = function saveState(key, state) {
    return storage[key] = state;
  };

  var readState = function readState(key) {
    return storage[key];
  };

  return _extends({}, history, {
    canGo: canGo
  });
};

exports.default = createMemoryHistory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(67);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(53)))

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(68);


/** Built-in value references. */
var getPrototype = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(34);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(64);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(15);
  var warning = __webpack_require__(20);
  var ReactPropTypesSecret = __webpack_require__(25);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(19);
var invariant = __webpack_require__(15);
var ReactPropTypesSecret = __webpack_require__(25);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(19);
var invariant = __webpack_require__(15);
var warning = __webpack_require__(20);

var ReactPropTypesSecret = __webpack_require__(25);
var checkPropTypes = __webpack_require__(71);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(103);
var objectAssign = __webpack_require__(36);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_create_react_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Link__ = __webpack_require__(37);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/**
 * An <IndexLink> is used to link to an <IndexRoute>.
 */
var IndexLink = __WEBPACK_IMPORTED_MODULE_1_create_react_class___default()({
  displayName: 'IndexLink',

  render: function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Link__["a" /* default */], _extends({}, this.props, { onlyActiveOnIndex: true }));
  }
});

/* harmony default export */ __webpack_exports__["a"] = (IndexLink);

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routerWarning__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Redirect__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__ = __webpack_require__(14);







/**
 * An <IndexRedirect> is used to redirect from an indexRoute.
 */
/* eslint-disable react/require-render-return */
var IndexRedirect = __WEBPACK_IMPORTED_MODULE_0_create_react_class___default()({
  displayName: 'IndexRedirect',

  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
      /* istanbul ignore else: sanity check */
      if (parentRoute) {
        parentRoute.indexRoute = __WEBPACK_IMPORTED_MODULE_4__Redirect__["a" /* default */].createRouteFromReactElement(element);
      } else {
        process.env.NODE_ENV !== 'production' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__routerWarning__["a" /* default */])(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
      }
    }
  },

  propTypes: {
    to: __WEBPACK_IMPORTED_MODULE_1_prop_types__["string"].isRequired,
    query: __WEBPACK_IMPORTED_MODULE_1_prop_types__["object"],
    state: __WEBPACK_IMPORTED_MODULE_1_prop_types__["object"],
    onEnter: __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__["c" /* falsy */],
    children: __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__["c" /* falsy */]
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
     true ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_3_invariant___default()(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : __WEBPACK_IMPORTED_MODULE_3_invariant___default()(false) : void 0;
  }
});

/* harmony default export */ __webpack_exports__["a"] = (IndexRedirect);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routerWarning__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RouteUtils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__ = __webpack_require__(14);







/**
 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
 * a JSX route config.
 */
/* eslint-disable react/require-render-return */
var IndexRoute = __WEBPACK_IMPORTED_MODULE_0_create_react_class___default()({
  displayName: 'IndexRoute',

  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
      /* istanbul ignore else: sanity check */
      if (parentRoute) {
        parentRoute.indexRoute = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__RouteUtils__["c" /* createRouteFromReactElement */])(element);
      } else {
        process.env.NODE_ENV !== 'production' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__routerWarning__["a" /* default */])(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
      }
    }
  },

  propTypes: {
    path: __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__["c" /* falsy */],
    component: __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__["a" /* component */],
    components: __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__["b" /* components */],
    getComponent: __WEBPACK_IMPORTED_MODULE_1_prop_types__["func"],
    getComponents: __WEBPACK_IMPORTED_MODULE_1_prop_types__["func"]
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
     true ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_3_invariant___default()(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : __WEBPACK_IMPORTED_MODULE_3_invariant___default()(false) : void 0;
  }
});

/* harmony default export */ __webpack_exports__["a"] = (IndexRoute);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__RouteUtils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__InternalPropTypes__ = __webpack_require__(14);






/**
 * A <Route> is used to declare which components are rendered to the
 * page when the URL matches a given pattern.
 *
 * Routes are arranged in a nested tree structure. When a new URL is
 * requested, the tree is searched depth-first to find a route whose
 * path matches the URL.  When one is found, all routes in the tree
 * that lead to it are considered "active" and their components are
 * rendered into the DOM, nested in the same order as in the tree.
 */
/* eslint-disable react/require-render-return */
var Route = __WEBPACK_IMPORTED_MODULE_0_create_react_class___default()({
  displayName: 'Route',

  statics: {
    createRouteFromReactElement: __WEBPACK_IMPORTED_MODULE_3__RouteUtils__["c" /* createRouteFromReactElement */]
  },

  propTypes: {
    path: __WEBPACK_IMPORTED_MODULE_1_prop_types__["string"],
    component: __WEBPACK_IMPORTED_MODULE_4__InternalPropTypes__["a" /* component */],
    components: __WEBPACK_IMPORTED_MODULE_4__InternalPropTypes__["b" /* components */],
    getComponent: __WEBPACK_IMPORTED_MODULE_1_prop_types__["func"],
    getComponents: __WEBPACK_IMPORTED_MODULE_1_prop_types__["func"]
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
     true ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_2_invariant___default()(false, '<Route> elements are for router configuration only and should not be rendered') : __WEBPACK_IMPORTED_MODULE_2_invariant___default()(false) : void 0;
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Route);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_create_react_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createTransitionManager__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__RouterContext__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__RouteUtils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__RouterUtils__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routerWarning__ = __webpack_require__(11);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }













var propTypes = {
  history: __WEBPACK_IMPORTED_MODULE_3_prop_types__["object"],
  children: __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__["d" /* routes */],
  routes: __WEBPACK_IMPORTED_MODULE_5__InternalPropTypes__["d" /* routes */], // alias for children
  render: __WEBPACK_IMPORTED_MODULE_3_prop_types__["func"],
  createElement: __WEBPACK_IMPORTED_MODULE_3_prop_types__["func"],
  onError: __WEBPACK_IMPORTED_MODULE_3_prop_types__["func"],
  onUpdate: __WEBPACK_IMPORTED_MODULE_3_prop_types__["func"],

  // PRIVATE: For client-side rehydration of server match.
  matchContext: __WEBPACK_IMPORTED_MODULE_3_prop_types__["object"]
};

/**
 * A <Router> is a high-level API for automatically setting up
 * a router that renders a <RouterContext> with all the props
 * it needs each time the URL changes.
 */
var Router = __WEBPACK_IMPORTED_MODULE_2_create_react_class___default()({
  displayName: 'Router',

  propTypes: propTypes,

  getDefaultProps: function getDefaultProps() {
    return {
      render: function render(props) {
        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__RouterContext__["a" /* default */], props);
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      location: null,
      routes: null,
      params: null,
      components: null
    };
  },
  handleError: function handleError(error) {
    if (this.props.onError) {
      this.props.onError.call(this, error);
    } else {
      // Throw errors by default so we don't silently swallow them!
      throw error; // This error probably occurred in getChildRoutes or getComponents.
    }
  },
  createRouterObject: function createRouterObject(state) {
    var matchContext = this.props.matchContext;

    if (matchContext) {
      return matchContext.router;
    }

    var history = this.props.history;

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__RouterUtils__["a" /* createRouterObject */])(history, this.transitionManager, state);
  },
  createTransitionManager: function createTransitionManager() {
    var matchContext = this.props.matchContext;

    if (matchContext) {
      return matchContext.transitionManager;
    }

    var history = this.props.history;
    var _props = this.props,
        routes = _props.routes,
        children = _props.children;


    !history.getCurrentLocation ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false, 'You have provided a history object created with history v4.x or v2.x ' + 'and earlier. This version of React Router is only compatible with v3 ' + 'history objects. Please change to history v3.x.') : __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false) : void 0;

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__createTransitionManager__["a" /* default */])(history, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__RouteUtils__["a" /* createRoutes */])(routes || children));
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    this.transitionManager = this.createTransitionManager();
    this.router = this.createRouterObject(this.state);

    this._unlisten = this.transitionManager.listen(function (error, state) {
      if (error) {
        _this.handleError(error);
      } else {
        // Keep the identity of this.router because of a caveat in ContextUtils:
        // they only work if the object identity is preserved.
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__RouterUtils__["b" /* assignRouterState */])(_this.router, state);
        _this.setState(state, _this.props.onUpdate);
      }
    });
  },


  /* istanbul ignore next: sanity check */
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    process.env.NODE_ENV !== 'production' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__routerWarning__["a" /* default */])(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;

    process.env.NODE_ENV !== 'production' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__routerWarning__["a" /* default */])((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._unlisten) this._unlisten();
  },
  render: function render() {
    var _state = this.state,
        location = _state.location,
        routes = _state.routes,
        params = _state.params,
        components = _state.components;

    var _props2 = this.props,
        createElement = _props2.createElement,
        render = _props2.render,
        props = _objectWithoutProperties(_props2, ['createElement', 'render']);

    if (location == null) return null; // Async match

    // Only forward non-Router-specific props to routing context, as those are
    // the only ones that might be custom routing context props.
    Object.keys(propTypes).forEach(function (propType) {
      return delete props[propType];
    });

    return render(_extends({}, props, {
      router: this.router,
      location: location,
      routes: routes,
      params: params,
      components: components,
      createElement: createElement
    }));
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Router);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getTransitionUtils;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncUtils__ = __webpack_require__(26);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var PendingHooks = function PendingHooks() {
  var _this = this;

  _classCallCheck(this, PendingHooks);

  this.hooks = [];

  this.add = function (hook) {
    return _this.hooks.push(hook);
  };

  this.remove = function (hook) {
    return _this.hooks = _this.hooks.filter(function (h) {
      return h !== hook;
    });
  };

  this.has = function (hook) {
    return _this.hooks.indexOf(hook) !== -1;
  };

  this.clear = function () {
    return _this.hooks = [];
  };
};

function getTransitionUtils() {
  var enterHooks = new PendingHooks();
  var changeHooks = new PendingHooks();

  function createTransitionHook(hook, route, asyncArity, pendingHooks) {
    var isSync = hook.length < asyncArity;

    var transitionHook = function transitionHook() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      hook.apply(route, args);

      if (isSync) {
        var callback = args[args.length - 1];
        // Assume hook executes synchronously and
        // automatically call the callback.
        callback();
      }
    };

    pendingHooks.add(transitionHook);

    return transitionHook;
  }

  function getEnterHooks(routes) {
    return routes.reduce(function (hooks, route) {
      if (route.onEnter) hooks.push(createTransitionHook(route.onEnter, route, 3, enterHooks));
      return hooks;
    }, []);
  }

  function getChangeHooks(routes) {
    return routes.reduce(function (hooks, route) {
      if (route.onChange) hooks.push(createTransitionHook(route.onChange, route, 4, changeHooks));
      return hooks;
    }, []);
  }

  function runTransitionHooks(length, iter, callback) {
    if (!length) {
      callback();
      return;
    }

    var redirectInfo = void 0;
    function replace(location) {
      redirectInfo = location;
    }

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncUtils__["b" /* loopAsync */])(length, function (index, next, done) {
      iter(index, replace, function (error) {
        if (error || redirectInfo) {
          done(error, redirectInfo); // No need to continue.
        } else {
          next();
        }
      });
    }, callback);
  }

  /**
   * Runs all onEnter hooks in the given array of routes in order
   * with onEnter(nextState, replace, callback) and calls
   * callback(error, redirectInfo) when finished. The first hook
   * to use replace short-circuits the loop.
   *
   * If a hook needs to run asynchronously, it may use the callback
   * function. However, doing so will cause the transition to pause,
   * which could lead to a non-responsive UI if the hook is slow.
   */
  function runEnterHooks(routes, nextState, callback) {
    enterHooks.clear();
    var hooks = getEnterHooks(routes);
    return runTransitionHooks(hooks.length, function (index, replace, next) {
      var wrappedNext = function wrappedNext() {
        if (enterHooks.has(hooks[index])) {
          next.apply(undefined, arguments);
          enterHooks.remove(hooks[index]);
        }
      };
      hooks[index](nextState, replace, wrappedNext);
    }, callback);
  }

  /**
   * Runs all onChange hooks in the given array of routes in order
   * with onChange(prevState, nextState, replace, callback) and calls
   * callback(error, redirectInfo) when finished. The first hook
   * to use replace short-circuits the loop.
   *
   * If a hook needs to run asynchronously, it may use the callback
   * function. However, doing so will cause the transition to pause,
   * which could lead to a non-responsive UI if the hook is slow.
   */
  function runChangeHooks(routes, state, nextState, callback) {
    changeHooks.clear();
    var hooks = getChangeHooks(routes);
    return runTransitionHooks(hooks.length, function (index, replace, next) {
      var wrappedNext = function wrappedNext() {
        if (changeHooks.has(hooks[index])) {
          next.apply(undefined, arguments);
          changeHooks.remove(hooks[index]);
        }
      };
      hooks[index](state, nextState, replace, wrappedNext);
    }, callback);
  }

  /**
   * Runs all onLeave hooks in the given array of routes in order.
   */
  function runLeaveHooks(routes, prevState) {
    for (var i = 0, len = routes.length; i < len; ++i) {
      if (routes[i].onLeave) routes[i].onLeave.call(routes[i], prevState);
    }
  }

  return {
    runEnterHooks: runEnterHooks,
    runChangeHooks: runChangeHooks,
    runLeaveHooks: runLeaveHooks
  };
}

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RouterContext__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routerWarning__ = __webpack_require__(11);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/* harmony default export */ __webpack_exports__["a"] = (function () {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  if (process.env.NODE_ENV !== 'production') {
    middlewares.forEach(function (middleware, index) {
      process.env.NODE_ENV !== 'production' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__routerWarning__["a" /* default */])(middleware.renderRouterContext || middleware.renderRouteComponent, 'The middleware specified at index ' + index + ' does not appear to be ' + 'a valid React Router middleware.') : void 0;
    });
  }

  var withContext = middlewares.map(function (middleware) {
    return middleware.renderRouterContext;
  }).filter(Boolean);
  var withComponent = middlewares.map(function (middleware) {
    return middleware.renderRouteComponent;
  }).filter(Boolean);

  var makeCreateElement = function makeCreateElement() {
    var baseCreateElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"];
    return function (Component, props) {
      return withComponent.reduceRight(function (previous, renderRouteComponent) {
        return renderRouteComponent(previous, props);
      }, baseCreateElement(Component, props));
    };
  };

  return function (renderProps) {
    return withContext.reduceRight(function (previous, renderRouterContext) {
      return renderRouterContext(previous, renderProps);
    }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__RouterContext__["a" /* default */], _extends({}, renderProps, {
      createElement: makeCreateElement(renderProps.createElement)
    })));
  };
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_createBrowserHistory__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_lib_createBrowserHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__createRouterHistory__ = __webpack_require__(42);


/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__createRouterHistory__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_history_lib_createBrowserHistory___default.a));

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PatternUtils__ = __webpack_require__(10);


function routeParamsChanged(route, prevState, nextState) {
  if (!route.path) return false;

  var paramNames = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__PatternUtils__["b" /* getParamNames */])(route.path);

  return paramNames.some(function (paramName) {
    return prevState.params[paramName] !== nextState.params[paramName];
  });
}

/**
 * Returns an object of { leaveRoutes, changeRoutes, enterRoutes } determined by
 * the change from prevState to nextState. We leave routes if either
 * 1) they are not in the next state or 2) they are in the next state
 * but their params have changed (i.e. /users/123 => /users/456).
 *
 * leaveRoutes are ordered starting at the leaf route of the tree
 * we're leaving up to the common parent route. enterRoutes are ordered
 * from the top of the tree we're entering down to the leaf route.
 *
 * changeRoutes are any routes that didn't leave or enter during
 * the transition.
 */
function computeChangedRoutes(prevState, nextState) {
  var prevRoutes = prevState && prevState.routes;
  var nextRoutes = nextState.routes;

  var leaveRoutes = void 0,
      changeRoutes = void 0,
      enterRoutes = void 0;
  if (prevRoutes) {
    var parentIsLeaving = false;
    leaveRoutes = prevRoutes.filter(function (route) {
      if (parentIsLeaving) {
        return true;
      } else {
        var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
        if (isLeaving) parentIsLeaving = true;
        return isLeaving;
      }
    });

    // onLeave hooks start at the leaf route.
    leaveRoutes.reverse();

    enterRoutes = [];
    changeRoutes = [];

    nextRoutes.forEach(function (route) {
      var isNew = prevRoutes.indexOf(route) === -1;
      var paramsChanged = leaveRoutes.indexOf(route) !== -1;

      if (isNew || paramsChanged) enterRoutes.push(route);else changeRoutes.push(route);
    });
  } else {
    leaveRoutes = [];
    changeRoutes = [];
    enterRoutes = nextRoutes;
  }

  return {
    leaveRoutes: leaveRoutes,
    changeRoutes: changeRoutes,
    enterRoutes: enterRoutes
  };
}

/* harmony default export */ __webpack_exports__["a"] = (computeChangedRoutes);

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncUtils__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PromiseUtils__ = __webpack_require__(38);



function getComponentsForRoute(nextState, route, callback) {
  if (route.component || route.components) {
    callback(null, route.component || route.components);
    return;
  }

  var getComponent = route.getComponent || route.getComponents;
  if (getComponent) {
    var componentReturn = getComponent.call(route, nextState, callback);
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__PromiseUtils__["a" /* isPromise */])(componentReturn)) componentReturn.then(function (component) {
      return callback(null, component);
    }, callback);
  } else {
    callback();
  }
}

/**
 * Asynchronously fetches all components needed for the given router
 * state and calls callback(error, components) when finished.
 *
 * Note: This operation may finish synchronously if no routes have an
 * asynchronous getComponents method.
 */
function getComponents(nextState, callback) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncUtils__["a" /* mapAsync */])(nextState.routes, function (route, index, callback) {
    getComponentsForRoute(nextState, route, callback);
  }, callback);
}

/* harmony default export */ __webpack_exports__["a"] = (getComponents);

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PatternUtils__ = __webpack_require__(10);


/**
 * Extracts an object of params the given route cares about from
 * the given params object.
 */
function getRouteParams(route, params) {
  var routeParams = {};

  if (!route.path) return routeParams;

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__PatternUtils__["b" /* getParamNames */])(route.path).forEach(function (p) {
    if (Object.prototype.hasOwnProperty.call(params, p)) {
      routeParams[p] = params[p];
    }
  });

  return routeParams;
}

/* harmony default export */ __webpack_exports__["a"] = (getRouteParams);

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_createHashHistory__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_createHashHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_lib_createHashHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__createRouterHistory__ = __webpack_require__(42);


/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__createRouterHistory__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_history_lib_createHashHistory___default.a));

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Router__ = __webpack_require__(79);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_0__Router__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link__ = __webpack_require__(37);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_1__Link__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__IndexLink__ = __webpack_require__(75);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IndexLink", function() { return __WEBPACK_IMPORTED_MODULE_2__IndexLink__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__withRouter__ = __webpack_require__(91);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return __WEBPACK_IMPORTED_MODULE_3__withRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__IndexRedirect__ = __webpack_require__(76);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IndexRedirect", function() { return __WEBPACK_IMPORTED_MODULE_4__IndexRedirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__IndexRoute__ = __webpack_require__(77);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IndexRoute", function() { return __WEBPACK_IMPORTED_MODULE_5__IndexRoute__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Redirect__ = __webpack_require__(39);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return __WEBPACK_IMPORTED_MODULE_6__Redirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Route__ = __webpack_require__(78);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return __WEBPACK_IMPORTED_MODULE_7__Route__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__RouteUtils__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createRoutes", function() { return __WEBPACK_IMPORTED_MODULE_8__RouteUtils__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__RouterContext__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RouterContext", function() { return __WEBPACK_IMPORTED_MODULE_9__RouterContext__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__PropTypes__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "locationShape", function() { return __WEBPACK_IMPORTED_MODULE_10__PropTypes__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "routerShape", function() { return __WEBPACK_IMPORTED_MODULE_10__PropTypes__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__match__ = __webpack_require__(89);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "match", function() { return __WEBPACK_IMPORTED_MODULE_11__match__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__useRouterHistory__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "useRouterHistory", function() { return __WEBPACK_IMPORTED_MODULE_12__useRouterHistory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__PatternUtils__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "formatPattern", function() { return __WEBPACK_IMPORTED_MODULE_13__PatternUtils__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__applyRouterMiddleware__ = __webpack_require__(81);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyRouterMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_14__applyRouterMiddleware__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__browserHistory__ = __webpack_require__(82);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "browserHistory", function() { return __WEBPACK_IMPORTED_MODULE_15__browserHistory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__hashHistory__ = __webpack_require__(86);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "hashHistory", function() { return __WEBPACK_IMPORTED_MODULE_16__hashHistory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__createMemoryHistory__ = __webpack_require__(41);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMemoryHistory", function() { return __WEBPACK_IMPORTED_MODULE_17__createMemoryHistory__["a"]; });
/* components */









/* components (configuration) */










/* utils */















/* histories */








/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isActive;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PatternUtils__ = __webpack_require__(10);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



function deepEqual(a, b) {
  if (a == b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return deepEqual(item, b[index]);
    });
  }

  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
    for (var p in a) {
      if (!Object.prototype.hasOwnProperty.call(a, p)) {
        continue;
      }

      if (a[p] === undefined) {
        if (b[p] !== undefined) {
          return false;
        }
      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
        return false;
      } else if (!deepEqual(a[p], b[p])) {
        return false;
      }
    }

    return true;
  }

  return String(a) === String(b);
}

/**
 * Returns true if the current pathname matches the supplied one, net of
 * leading and trailing slash normalization. This is sufficient for an
 * indexOnly route match.
 */
function pathIsActive(pathname, currentPathname) {
  // Normalize leading slash for consistency. Leading slash on pathname has
  // already been normalized in isActive. See caveat there.
  if (currentPathname.charAt(0) !== '/') {
    currentPathname = '/' + currentPathname;
  }

  // Normalize the end of both path names too. Maybe `/foo/` shouldn't show
  // `/foo` as active, but in this case, we would already have failed the
  // match.
  if (pathname.charAt(pathname.length - 1) !== '/') {
    pathname += '/';
  }
  if (currentPathname.charAt(currentPathname.length - 1) !== '/') {
    currentPathname += '/';
  }

  return currentPathname === pathname;
}

/**
 * Returns true if the given pathname matches the active routes and params.
 */
function routeIsActive(pathname, routes, params) {
  var remainingPathname = pathname,
      paramNames = [],
      paramValues = [];

  // for...of would work here but it's probably slower post-transpilation.
  for (var i = 0, len = routes.length; i < len; ++i) {
    var route = routes[i];
    var pattern = route.path || '';

    if (pattern.charAt(0) === '/') {
      remainingPathname = pathname;
      paramNames = [];
      paramValues = [];
    }

    if (remainingPathname !== null && pattern) {
      var matched = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__PatternUtils__["c" /* matchPattern */])(pattern, remainingPathname);
      if (matched) {
        remainingPathname = matched.remainingPathname;
        paramNames = [].concat(paramNames, matched.paramNames);
        paramValues = [].concat(paramValues, matched.paramValues);
      } else {
        remainingPathname = null;
      }

      if (remainingPathname === '') {
        // We have an exact match on the route. Just check that all the params
        // match.
        // FIXME: This doesn't work on repeated params.
        return paramNames.every(function (paramName, index) {
          return String(paramValues[index]) === String(params[paramName]);
        });
      }
    }
  }

  return false;
}

/**
 * Returns true if all key/value pairs in the given query are
 * currently active.
 */
function queryIsActive(query, activeQuery) {
  if (activeQuery == null) return query == null;

  if (query == null) return true;

  return deepEqual(query, activeQuery);
}

/**
 * Returns true if a <Link> to the given pathname/query combination is
 * currently active.
 */
function isActive(_ref, indexOnly, currentLocation, routes, params) {
  var pathname = _ref.pathname,
      query = _ref.query;

  if (currentLocation == null) return false;

  // TODO: This is a bit ugly. It keeps around support for treating pathnames
  // without preceding slashes as absolute paths, but possibly also works
  // around the same quirks with basenames as in matchRoutes.
  if (pathname.charAt(0) !== '/') {
    pathname = '/' + pathname;
  }

  if (!pathIsActive(pathname, currentLocation.pathname)) {
    // The path check is necessary and sufficient for indexOnly, but otherwise
    // we still need to check the routes.
    if (indexOnly || !routeIsActive(pathname, routes, params)) {
      return false;
    }
  }

  return queryIsActive(query, currentLocation.query);
}

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_Actions__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_lib_Actions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_lib_Actions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createMemoryHistory__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createTransitionManager__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RouteUtils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__RouterUtils__ = __webpack_require__(40);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }









/**
 * A high-level API to be used for server-side rendering.
 *
 * This function matches a location to a set of routes and calls
 * callback(error, redirectLocation, renderProps) when finished.
 *
 * Note: You probably don't want to use this in a browser unless you're using
 * server-side rendering with async routes.
 */
function match(_ref, callback) {
  var history = _ref.history,
      routes = _ref.routes,
      location = _ref.location,
      options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);

  !(history || location) ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_1_invariant___default()(false, 'match needs a history or a location') : __WEBPACK_IMPORTED_MODULE_1_invariant___default()(false) : void 0;

  history = history ? history : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__createMemoryHistory__["a" /* default */])(options);
  var transitionManager = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__createTransitionManager__["a" /* default */])(history, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__RouteUtils__["a" /* createRoutes */])(routes));

  if (location) {
    // Allow match({ location: '/the/path', ... })
    location = history.createLocation(location);
  } else {
    location = history.getCurrentLocation();
  }

  transitionManager.match(location, function (error, redirectLocation, nextState) {
    var renderProps = void 0;

    if (nextState) {
      var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__RouterUtils__["a" /* createRouterObject */])(history, transitionManager, nextState);
      renderProps = _extends({}, nextState, {
        router: router,
        matchContext: { transitionManager: transitionManager, router: router }
      });
    }

    callback(error, redirectLocation && history.createLocation(redirectLocation, __WEBPACK_IMPORTED_MODULE_0_history_lib_Actions__["REPLACE"]), renderProps);
  });
}

/* harmony default export */ __webpack_exports__["a"] = (match);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = matchRoutes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncUtils__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PromiseUtils__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PatternUtils__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routerWarning__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RouteUtils__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







function getChildRoutes(route, location, paramNames, paramValues, callback) {
  if (route.childRoutes) {
    return [null, route.childRoutes];
  }
  if (!route.getChildRoutes) {
    return [];
  }

  var sync = true,
      result = void 0;

  var partialNextState = {
    location: location,
    params: createParams(paramNames, paramValues)
  };

  var childRoutesReturn = route.getChildRoutes(partialNextState, function (error, childRoutes) {
    childRoutes = !error && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__RouteUtils__["a" /* createRoutes */])(childRoutes);
    if (sync) {
      result = [error, childRoutes];
      return;
    }

    callback(error, childRoutes);
  });

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__PromiseUtils__["a" /* isPromise */])(childRoutesReturn)) childRoutesReturn.then(function (childRoutes) {
    return callback(null, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__RouteUtils__["a" /* createRoutes */])(childRoutes));
  }, callback);

  sync = false;
  return result; // Might be undefined.
}

function getIndexRoute(route, location, paramNames, paramValues, callback) {
  if (route.indexRoute) {
    callback(null, route.indexRoute);
  } else if (route.getIndexRoute) {
    var partialNextState = {
      location: location,
      params: createParams(paramNames, paramValues)
    };

    var indexRoutesReturn = route.getIndexRoute(partialNextState, function (error, indexRoute) {
      callback(error, !error && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__RouteUtils__["a" /* createRoutes */])(indexRoute)[0]);
    });

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__PromiseUtils__["a" /* isPromise */])(indexRoutesReturn)) indexRoutesReturn.then(function (indexRoute) {
      return callback(null, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__RouteUtils__["a" /* createRoutes */])(indexRoute)[0]);
    }, callback);
  } else if (route.childRoutes || route.getChildRoutes) {
    var onChildRoutes = function onChildRoutes(error, childRoutes) {
      if (error) {
        callback(error);
        return;
      }

      var pathless = childRoutes.filter(function (childRoute) {
        return !childRoute.path;
      });

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncUtils__["b" /* loopAsync */])(pathless.length, function (index, next, done) {
        getIndexRoute(pathless[index], location, paramNames, paramValues, function (error, indexRoute) {
          if (error || indexRoute) {
            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
            done(error, routes);
          } else {
            next();
          }
        });
      }, function (err, routes) {
        callback(null, routes);
      });
    };

    var result = getChildRoutes(route, location, paramNames, paramValues, onChildRoutes);
    if (result) {
      onChildRoutes.apply(undefined, result);
    }
  } else {
    callback();
  }
}

function assignParams(params, paramNames, paramValues) {
  return paramNames.reduce(function (params, paramName, index) {
    var paramValue = paramValues && paramValues[index];

    if (Array.isArray(params[paramName])) {
      params[paramName].push(paramValue);
    } else if (paramName in params) {
      params[paramName] = [params[paramName], paramValue];
    } else {
      params[paramName] = paramValue;
    }

    return params;
  }, params);
}

function createParams(paramNames, paramValues) {
  return assignParams({}, paramNames, paramValues);
}

function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
  var pattern = route.path || '';

  if (pattern.charAt(0) === '/') {
    remainingPathname = location.pathname;
    paramNames = [];
    paramValues = [];
  }

  // Only try to match the path if the route actually has a pattern, and if
  // we're not just searching for potential nested absolute paths.
  if (remainingPathname !== null && pattern) {
    try {
      var matched = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__PatternUtils__["c" /* matchPattern */])(pattern, remainingPathname);
      if (matched) {
        remainingPathname = matched.remainingPathname;
        paramNames = [].concat(paramNames, matched.paramNames);
        paramValues = [].concat(paramValues, matched.paramValues);
      } else {
        remainingPathname = null;
      }
    } catch (error) {
      callback(error);
    }

    // By assumption, pattern is non-empty here, which is the prerequisite for
    // actually terminating a match.
    if (remainingPathname === '') {
      var match = {
        routes: [route],
        params: createParams(paramNames, paramValues)
      };

      getIndexRoute(route, location, paramNames, paramValues, function (error, indexRoute) {
        if (error) {
          callback(error);
        } else {
          if (Array.isArray(indexRoute)) {
            var _match$routes;

            process.env.NODE_ENV !== 'production' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__routerWarning__["a" /* default */])(indexRoute.every(function (route) {
              return !route.path;
            }), 'Index routes should not have paths') : void 0;
            (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
          } else if (indexRoute) {
            process.env.NODE_ENV !== 'production' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__routerWarning__["a" /* default */])(!indexRoute.path, 'Index routes should not have paths') : void 0;
            match.routes.push(indexRoute);
          }

          callback(null, match);
        }
      });

      return;
    }
  }

  if (remainingPathname != null || route.childRoutes) {
    // Either a) this route matched at least some of the path or b)
    // we don't have to load this route's children asynchronously. In
    // either case continue checking for matches in the subtree.
    var onChildRoutes = function onChildRoutes(error, childRoutes) {
      if (error) {
        callback(error);
      } else if (childRoutes) {
        // Check the child routes to see if any of them match.
        matchRoutes(childRoutes, location, function (error, match) {
          if (error) {
            callback(error);
          } else if (match) {
            // A child route matched! Augment the match and pass it up the stack.
            match.routes.unshift(route);
            callback(null, match);
          } else {
            callback();
          }
        }, remainingPathname, paramNames, paramValues);
      } else {
        callback();
      }
    };

    var result = getChildRoutes(route, location, paramNames, paramValues, onChildRoutes);
    if (result) {
      onChildRoutes.apply(undefined, result);
    }
  } else {
    callback();
  }
}

/**
 * Asynchronously matches the given location to a set of routes and calls
 * callback(error, state) when finished. The state object will have the
 * following properties:
 *
 * - routes       An array of routes that matched, in hierarchical order
 * - params       An object of URL parameters
 *
 * Note: This operation may finish synchronously if no routes have an
 * asynchronous getChildRoutes method.
 */
function matchRoutes(routes, location, callback, remainingPathname) {
  var paramNames = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var paramValues = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

  if (remainingPathname === undefined) {
    // TODO: This is a little bit ugly, but it works around a quirk in history
    // that strips the leading slash from pathnames when using basenames with
    // trailing slashes.
    if (location.pathname.charAt(0) !== '/') {
      location = _extends({}, location, {
        pathname: '/' + location.pathname
      });
    }
    remainingPathname = location.pathname;
  }

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncUtils__["b" /* loopAsync */])(routes.length, function (index, next, done) {
    matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
      if (error || match) {
        done(error, match);
      } else {
        next();
      }
    });
  }, callback);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = withRouter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_create_react_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ContextUtils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PropTypes__ = __webpack_require__(28);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withRouter(WrappedComponent, options) {
  var withRef = options && options.withRef;

  var WithRouter = __WEBPACK_IMPORTED_MODULE_2_create_react_class___default()({
    displayName: 'WithRouter',

    mixins: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__ContextUtils__["b" /* ContextSubscriber */])('router')],

    contextTypes: { router: __WEBPACK_IMPORTED_MODULE_5__PropTypes__["b" /* routerShape */] },
    propTypes: { router: __WEBPACK_IMPORTED_MODULE_5__PropTypes__["b" /* routerShape */] },

    getWrappedInstance: function getWrappedInstance() {
      !withRef ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false) : void 0;

      return this.wrappedInstance;
    },
    render: function render() {
      var _this = this;

      var router = this.props.router || this.context.router;
      if (!router) {
        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(WrappedComponent, this.props);
      }

      var params = router.params,
          location = router.location,
          routes = router.routes;

      var props = _extends({}, this.props, { router: router, params: params, location: location, routes: routes });

      if (withRef) {
        props.ref = function (c) {
          _this.wrappedInstance = c;
        };
      }

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(WrappedComponent, props);
    }
  });

  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
  WithRouter.WrappedComponent = WrappedComponent;

  return __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics___default()(WithRouter, WrappedComponent);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_middleware__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_runSaga__ = __webpack_require__(47);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "runSaga", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_runSaga__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__internal_channel__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "END", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_channel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "eventChannel", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_channel__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "channel", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_channel__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__internal_buffers__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "buffers", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_buffers__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__ = __webpack_require__(48);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeEvery", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeLatest", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__internal_utils__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_utils__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CANCEL", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_utils__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__effects__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(98);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "effects", function() { return __WEBPACK_IMPORTED_MODULE_6__effects__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return __WEBPACK_IMPORTED_MODULE_7__utils__; });

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__internal_middleware__["a" /* default */]);












/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = sagaMiddlewareFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__channel__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runSaga__ = __webpack_require__(47);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






function sagaMiddlewareFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref$context = _ref.context,
      context = _ref$context === undefined ? {} : _ref$context,
      options = _objectWithoutProperties(_ref, ['context']);

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;


  if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(options)) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead');
    } else {
      throw new Error('You passed a function to the Saga middleware. You are likely trying to start a        Saga by directly passing it to the middleware. This is no longer possible starting from 0.10.0.        To run a Saga, you must do it dynamically AFTER mounting the middleware into the store.\n        Example:\n          import createSagaMiddleware from \'redux-saga\'\n          ... other imports\n\n          const sagaMiddleware = createSagaMiddleware()\n          const store = createStore(reducer, applyMiddleware(sagaMiddleware))\n          sagaMiddleware.run(saga, ...args)\n      ');
    }
  }

  if (logger && !__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(logger)) {
    throw new Error('`options.logger` passed to the Saga middleware is not a function!');
  }

  if (process.env.NODE_ENV === 'development' && options.onerror) {
    throw new Error('`options.onerror` was removed. Use `options.onError` instead.');
  }

  if (onError && !__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(onError)) {
    throw new Error('`options.onError` passed to the Saga middleware is not a function!');
  }

  if (options.emitter && !__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].func(options.emitter)) {
    throw new Error('`options.emitter` passed to the Saga middleware is not a function!');
  }

  function sagaMiddleware(_ref2) {
    var getState = _ref2.getState,
        dispatch = _ref2.dispatch;

    var sagaEmitter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* emitter */])();
    sagaEmitter.emit = (options.emitter || __WEBPACK_IMPORTED_MODULE_0__utils__["z" /* ident */])(sagaEmitter.emit);

    sagaMiddleware.run = __WEBPACK_IMPORTED_MODULE_2__runSaga__["a" /* runSaga */].bind(null, {
      context: context,
      subscribe: sagaEmitter.subscribe,
      dispatch: dispatch,
      getState: getState,
      sagaMonitor: sagaMonitor,
      logger: logger,
      onError: onError
    });

    return function (next) {
      return function (action) {
        if (sagaMonitor && sagaMonitor.actionDispatched) {
          sagaMonitor.actionDispatched(action);
        }
        var result = next(action); // hit reducers
        sagaEmitter.emit(action);
        return result;
      };
    };
  }

  sagaMiddleware.run = function () {
    throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
  };

  sagaMiddleware.setContext = function (props) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* check */])(props, __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* is */].object, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["v" /* createSetContextWarning */])('sagaMiddleware', props));
    __WEBPACK_IMPORTED_MODULE_0__utils__["u" /* object */].assign(context, props);
  };

  return sagaMiddleware;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = takeEvery;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmIterator__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(12);




function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__io__["c" /* take */])(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["d" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };

  var action = void 0,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["a" /* default */])({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* END */] ? [__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["b" /* qEnd */]] : ['q1', yFork(action)];
    }
  }, 'q1', 'takeEvery(' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["c" /* safeName */])(patternOrChannel) + ', ' + worker.name + ')');
}

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = takeLatest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmIterator__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(12);




function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__io__["c" /* take */])(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["d" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };
  var yCancel = function yCancel(task) {
    return { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__io__["f" /* cancel */])(task) };
  };

  var task = void 0,
      action = void 0;
  var setTask = function setTask(t) {
    return task = t;
  };
  var setAction = function setAction(ac) {
    return action = ac;
  };

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["a" /* default */])({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* END */] ? [__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["b" /* qEnd */]] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
    },
    q3: function q3() {
      return ['q1', yFork(action), setTask];
    }
  }, 'q1', 'takeLatest(' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["c" /* safeName */])(patternOrChannel) + ', ' + worker.name + ')');
}

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throttle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmIterator__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buffers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(2);






function throttle(delayLength, pattern, worker) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action = void 0,
      channel = void 0;

  var yActionChannel = { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__io__["b" /* actionChannel */])(pattern, __WEBPACK_IMPORTED_MODULE_3__buffers__["a" /* buffers */].sliding(1)) };
  var yTake = function yTake() {
    return { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__io__["c" /* take */])(channel) };
  };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_1__io__["d" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };
  var yDelay = { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__io__["e" /* call */])(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* delay */], delayLength) };

  var setAction = function setAction(ac) {
    return action = ac;
  };
  var setChannel = function setChannel(ch) {
    return channel = ch;
  };

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["a" /* default */])({
    q1: function q1() {
      return ['q2', yActionChannel, setChannel];
    },
    q2: function q2() {
      return ['q3', yTake(), setAction];
    },
    q3: function q3() {
      return action === __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* END */] ? [__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["b" /* qEnd */]] : ['q4', yFork(action)];
    },
    q4: function q4() {
      return ['q2', yDelay];
    }
  }, 'q1', 'throttle(' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__fsmIterator__["c" /* safeName */])(pattern) + ', ' + worker.name + ')');
}

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_utils__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TASK", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SAGA_ACTION", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deferred", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "arrayOfDeffered", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMockTask", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cloneableGenerator", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["j"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_io__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "asEffect", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_io__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__internal_proc__ = __webpack_require__(46);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_END", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_proc__["a"]; });




/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(50);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(52);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(52);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(105);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(106);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53), __webpack_require__(107)(module)))

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(54);


/***/ })
/******/ ]);
//# sourceMappingURL=main_lib.js.map