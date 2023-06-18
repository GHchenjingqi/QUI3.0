(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.QUI = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var QUIFun = {};
  QUIFun.setRem = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var w, rem;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //重置rem单位
          w = document.body.clientWidth;
          rem = window.innerWidth / 12;
          if (w < 768) {
            rem = window.innerWidth / 4;
          } else if (w > 768 && w < 1290) {
            rem = window.innerWidth / 7;
          } else if (w > 1280 && w < 1450) {
            rem = window.innerWidth / 8;
          } else if (w > 1450 && w < 1900) {
            rem = window.innerWidth / 10;
          }
          document.documentElement.style.fontSize = rem + 'px';
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  /**
   * 设备分辨率
   */
  QUIFun.windowSize = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var h, w;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          h = window.screen.height;
          w = window.screen.width;
          this.screen = {
            width: w,
            height: h
          };
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));

  /**
   * 获取当前页面DOM宽度
   */
  QUIFun.getPageSize = function () {
    this.dom = {};
    this.dom.width = document.body.getBoundingClientRect().width;
    this.dom.height = document.body.getBoundingClientRect().height;
  };

  /**
   * 动态标题
   */
  QUIFun.titleChange = function () {
    var OriginTitile = document.title,
      titleTime;
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        document.title = QUIFun.titleInPage || "期待与你下次相遇！";
        clearTimeout(titleTime);
      } else {
        document.title = QUIFun.titleOutPage || "你好呀！";
        titleTime = setTimeout(function () {
          document.title = OriginTitile;
        }, 1000);
      }
    });
  };

  /**
   * 二维码生成
   * @param {*} options 
   */
  QUIFun.createQRcode = function (options) {
    var id = options.id,
      text = options.text,
      _options$width = options.width,
      width = _options$width === void 0 ? 88 : _options$width,
      _options$height = options.height,
      height = _options$height === void 0 ? 88 : _options$height,
      color = options.color;
    document.getElementById(id).innerHTML = "";
    new QRCode(id, {
      //文字内容
      text: text,
      //宽度
      width: width,
      //高度
      height: height,
      //颜色
      colorDark: color,
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  };

  /**
   *  图片预览加载调用
   *  仅对父级盒子className = "viewer-img-box" 里面的图片生效
   */
  QUIFun.loadViewer = function () {
    document.body.addEventListener('click', function (e) {
      var type = e.target.tagName;
      var parent = e.target.parentNode;
      // 保证只允许一个插件运行
      if (!window.imger) {
        if (type === 'IMG' && parent.className === 'viewer-img-box') {
          var src = e.target.src;
          window.imger = new Viewer(src);
          window.imger.viewer();
        }
      }
    }, true);
  };

  /**
   *  加载中
   * @param {*} loadingSrc 
   */
  QUIFun.loading = function (loadingSrc) {
    loadingSrc = loadingSrc ? loadingSrc : 'https://www.51qux.com//wp-content/themes/QUIPlus/static/QUI3.0/css/icons/loading.gif';
    var div = document.createElement("div");
    div.className = "qui-loading";
    div.innerHTML = "<img src=\"".concat(loadingSrc, "\" alt=\"\u52A0\u8F7D\u4E2D...\">");
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
    document.body.appendChild(div);
  };
  /**
   * 关闭加载中
   */
  QUIFun.removeLoading = function () {
    document.body.removeChild(document.getElementsByClassName("qui-loading")[0]);
    document.body.style.height = "auto";
    document.body.style.overflow = "auto";
  };

  // 常用方法归档：
  /**
   * Log打印
   * @param {*} val 
   * @returns 
   */
  QUIFun.log = function (val) {
    return console.log(val);
  };
  /**
   * Error打印
   * @param {*} val 
   * @returns 
   */
  QUIFun.error = function (val) {
    return console.error(val);
  };

  /**
   * 获取域名地址
   * @returns 
   */
  QUIFun.getUrl = function () {
    var webSite = {};
    try {
      this.log("进入获取url模块");
      webSite.url = window.location.href;
      webSite.domain = window.location.host;
      webSite.port = window.location.port;
      webSite.search = window.location.search;
      webSite.hash = window.location.hash;
      webSite.pathname = window.location.pathname;
      this.log("退出获取url模块");
    } catch (_unused) {
      this.error("Url初始化失败，请求获取失败！");
    }
    return webSite;
  };
  /**
   * 判断参数是否为空
   * @param {*} obj 
   * @returns 布尔
   */
  QUIFun.isEmpty = function (obj) {
    if (obj == undefined || obj == null || obj == '' || obj == [] || obj == {}) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * 判断参数类型
   * @param {*} obj 
   * @returns 布尔
   */
  QUIFun.getType = function (obj) {
    var res = Object.prototype.toString.call(obj).slice(8, -1);
    return res;
  };

  /**
   * 判断数组类型
   * @param {*} arrays 
   * @returns 布尔
   */
  QUIFun.isArray = function (arrays) {
    return Array.isArray(arrays);
  };

  /**
   * 判断对象类型
   * @param {*} obj 
   * @returns  布尔
   */
  QUIFun.isObject = function (obj) {
    return "Object" === this.getType(obj);
  };

  /**
   * 判断时间类型
   * @param {*} dates 
   * @returns  布尔
   */
  QUIFun.isDate = function (dates) {
    return "Date" === this.getType(dates);
  };

  /**
   * 判断字符串类型
   * @param {*} str 
   * @returns 
   */
  QUIFun.isString = function (str) {
    return "String" === this.getType(str);
  };

  /**
   * 判断数字类型
   * @param {*} num 
   * @returns 
   */
  QUIFun.isNumber = function (num) {
    return "Number" === this.getType(num);
  };

  /**
   * 判断布尔类型
   * @param {*} bl 
   * @returns 
   */
  QUIFun.isBoolean = function (bl) {
    return "Boolean" === this.getType(bl);
  };

  /**
   * 判断函数类型
   * @param {*} fn 
   * @returns 
   */
  QUIFun.isFunction = function (fn) {
    return "Function" === this.getType(fn);
  };

  /**
   * 判断Null
   * @param {*} val 
   * @returns 
   */
  QUIFun.isNull = function (val) {
    return "Null" === this.getType(val);
  };

  /**
   * 判断Undefined
   * @param {*} val 
   * @returns 
   */
  QUIFun.isUndefined = function (val) {
    return "Undefined" === this.getType(val);
  };

  /**
   * 断言
   * @param {*} condition 
   * @param {*} msg 
   */
  QUIFun.assert = function (condition, msg) {
    if (!condition) {
      throw new Error(msg);
    }
  };

  /**
   * 判断是否含有某个字符
   * @param {*} obj 
   * @param {*} param 
   * @returns 
   */
  QUIFun.isHas = function (obj, param) {
    if (this.isObject(obj) && Object.hasOwn(obj, param)) {
      return true;
    }
    if (this.isArray(obj)) {
      for (var i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i)) {
          if (obj[i] === param || Object.hasOwn(obj[i], param)) {
            return true;
          }
        }
      }
      return true;
    }
    if (this.isString(obj && obj.indexOf(param) > -1)) {
      return true;
    }
    return false;
  };

  /**
   * 是否是微信内置浏览器
   * @returns 
   */
  QUIFun.isWeiXin = function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  };

  /**
   * 对象转数组 多参数字符串转数组  —— objToArr(a,b,c)
   * @param  {...any} obj 
   * @returns array
   */
  QUIFun.objToArr = function () {
    var arr = [];
    for (var _len = arguments.length, obj = new Array(_len), _key = 0; _key < _len; _key++) {
      obj[_key] = arguments[_key];
    }
    if (this.isObject(obj)) {
      arr.push(obj);
    } else if (this.isArray(obj)) {
      arr = obj;
    }
    return arr;
  };

  /**
   * 动态创建js
   * @param {*} src 
   */
  QUIFun.createScript = function (src) {
    var el = document.createElement('script');
    el.src = src;
    el.async = true;
    el.defer = true;
    document.body.appendChild(el);
  };

  /**
   * 动态加载js后，调用回调函数
   * @param {*} url 
   * @param {*} callback 
   */
  QUIFun.loadScript = function (url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof callback != "undefined") {
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = function () {
          callback();
        };
      }
    }
    script.src = url;
    document.body.appendChild(script);
  };

  /**
   * 防抖
   * @param {*} func 
   * @param {*} delay 
   * @returns 
   */
  QUIFun.debounce = function (func, delay) {
    var timer = null;
    return function () {
      var that = this;
      var args = arguments;
      //每次触发事件 都把定时器清掉重新计时
      clearTimeout(timer);
      timer = setTimeout(function () {
        //执行事件处理程序
        func.call(that, args);
      }, delay);
    };
  };

  /**
   * 节流
   * @param {*} func 
   * @param {*} delay 
   * @returns 
   */
  QUIFun.throttle = function (func, delay) {
    var timer = null;
    return function () {
      var that = this;
      var args = arguments;
      if (!timer) {
        timer = setTimeout(function () {
          //执行事件处理程序
          func.call(that, args);
          //事件执行完后把定时器清除掉，下次触发事件的时候再设置
          timer = null;
        }, delay);
      }
    };
  };

  /**
   * 时间格式化
   * @param {*} date Date类型不能是时间戳
   * @param {*} formatStr str
   * @returns 
   */
  QUIFun.dateFormat = function (date, formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, date.getYear() % 100 > 9 ? (date.getYear() % 100).toString() : '0' + date.getYear() % 100);
    var month = date.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);
    str = str.replace(/w|W/g, Week[date.getDay()]);
    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());
    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());
    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());
    return str;
  };

  /**
   * 获取当前时间戳
   * @returns date
   */
  QUIFun.getTimeHCuo = function () {
    return new Date().getTime();
  };

  /**
   * 更新时间是否过期：6小时更新一次 —— 参数均为时间戳
   * @param {*} time 时间戳
   * @param {*} oldTime 时间戳
   * @returns  小时
   */
  QUIFun.getTimeHour = function (time, oldTime) {
    var newTime = (time - oldTime) / 1000 / 60 / 60; // 转换为 小时
    return newTime;
  };

  /**
   * 当前时间段欢迎语
   * @returns string
   */
  QUIFun.getTimeWord = function () {
    var str = "";
    var hour = new Date().getHours();
    if (hour < 6) {
      str = "凌晨好！";
    } else if (hour < 9) {
      str = "早上好！";
    } else if (hour < 12) {
      str = "上午好！";
    } else if (hour < 14) {
      str = "中午好！";
    } else if (hour < 17) {
      str = "下午好！";
    } else if (hour < 19) {
      str = "傍晚好！";
    } else if (hour < 22) {
      str = "晚上好！";
    } else {
      str = "夜里好！";
    }
    return str;
  };

  /**
   * 时间戳转换成时间
   * @param {*} timestamp 
   * @returns string 2022-01-28 10:34:21
   */
  QUIFun.timeStampToDate = function (timestamp) {
    var time = new Date(timestamp); //先将时间戳转为Date对象，然后才能使用Date的方法
    var year = time.getFullYear();
    var month = time.getMonth() + 1; //月份是从0开始的
    month = month < 10 ? '0' + month : month;
    var day = time.getDate();
    day = day < 10 ? '0' + day : day;
    var hour = time.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    var minute = time.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    var second = time.getSeconds();
    second = second < 10 ? '0' + second : second;
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  };

  /**
   * 计算日期时间差，返回单位（天）
   * @param {*} startDate  2022-03-16  
   * @param {*} endDate 2022-03-16  
   * @returns number 天
   */
  QUIFun.diffDate = function (startDate, endDate) {
    var diftime = Date.parse(endDate) - Date.parse(startDate);
    var day = 24 * 60 * 60 * 1000;
    return Math.floor(diftime / day);
  };

  /**
   * 获取url对应参数
   * @param {*} name 
   * @returns string
   */
  QUIFun.getQuery = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  };

  /**
   * 返回对应天气类型的index序号
   * @param {*} arr 
   * @param {*} val 
   * @returns number
   */
  QUIFun.filterWeatherType = function (arr, val) {
    var n = 0;
    arr.forEach(function (item, index) {
      if (item.state.indexOf(val) > -1) {
        n = index;
      }
    });
    return n;
  };

  /**
   * 生成全局唯一标识符 ，36进制：8位随机数
   * @returns 8位随机数
   */
  QUIFun.getGuid = function () {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  };

  /**
   * 获取n个随机数
   * @param {*} n 
   * @returns 
   */
  QUIFun.romCode = function (n) {
    //将数字、小写字母及大写字母输入
    var str = "1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    //给一个空字符串
    var res = '';
    //循环4次，得到4个字符
    for (var i = 0; i < n; i++) {
      //将得到的结果给字符串，调用随机函数，0最小数，62表示数字加字母的总数
      res += str[QUIFun.Random(0, 62)];
    }
    return res;
  };

  /**
   * 获取指定区间随机数
   * @param {*} max 
   * @param {*} min 
   * @returns 
   */
  QUIFun.random = function (max, min) {
    return Math.round(Math.random() * (max - min) + min);
  };

  /**
   * 合并对象
   * @param {*} obj1 
   * @param {*} obj2 
   * @returns Object
   */
  QUIFun.combineObject = function (obj1, obj2) {
    if (isObject(obj1) && isObject(obj2)) {
      return _objectSpread2(_objectSpread2({}, obj1), obj2);
    }
  };

  /**
   * 记录清除
   * @param {*} obj1 
   * @returns 
   */
  QUIFun.destroy = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(obj) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            this.Cookie.clear();
            this.LocalStg.clear();
            this.SessionStg.clear();
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * ajax请求
   * @param {*} options 
   * @returns 
   */
  QUIFun.ajax = function (options) {
    //如果options参数没有传递，直接返回。
    if (!options || _typeof(options) !== "object") {
      return;
    }
    //处理默认参数
    //如果参数不是post，那就默认为get
    var type = options.type == "post" ? "post" : "get";
    //如果没有传url，那就传当前地址
    var url = options.url || location.pathname;
    //如果参数不是false，那就默认是true，发异步请求
    var async = options.async == false ? false : true;
    var params = options.data;
    var xhr = new XMLHttpRequest();
    //设置请求行
    if (type == "get") {
      url = url + "?" + params;
    }
    xhr.open(type, url, async);
    //设置请求头
    if (type == "post") {
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    }
    //设置请求参数
    xhr.send(params);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          /*根据响应头的content-type属性指定方法接收到的内容*/
          var contentType = xhr.getResponseHeader('content-type');
          var data = null;
          if (contentType.indexOf('json') > -1) {
            data = JSON.parse(xhr.responseText);
          } else if (contentType.indexOf('xml') > -1) {
            data = xhr.responseXML;
          } else {
            data = xhr.responseText;
          }
          /*执行成功函数*/
          options.success && options.success(data);
        } else {
          options.error && options.error(xhr.responseText);
        }
      }
    };
  };

  /**
   * cookie使用:增删改查
   */
  QUIFun.Cookie = {
    /**
     * 根据key值获取对应的cookie
     * @param {*} key 
     * @returns 
     */
    get: function get(key) {
      //获取cookie
      var data = document.cookie;
      //获取key第一次出现的位置    pwd=
      var startIndex = data.indexOf(key + '=');
      //  name=123;pwd=abc
      //如果开始索引值大于0表示有cookie
      if (startIndex > -1) {
        //key的起始位置等于出现的位置加key的长度+1
        startIndex = startIndex + key.length + 1;
        //结束位置等于从key开始的位置之后第一次;号所出现的位置
        var endIndex = data.indexOf(';', startIndex);
        //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
        endIndex = endIndex < 0 ? data.length : endIndex;
        return decodeURIComponent(data.substring(startIndex, endIndex));
      } else {
        return '';
      }
    },
    /**
     * 设置cookie
     * @param {*} key 
     * @param {*} value 
     * @param {*} time 
     */
    set: function set(key, value, time) {
      //默认保存时间
      time = time || 7; //默认七天
      //获取当前时间
      var cur = new Date();
      var undefined$1;
      //设置指定时间
      cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
      //创建cookie  并且设置生存周期为GMT时间
      document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (time === undefined$1 ? '' : cur.toGMTString());
    },
    /**
     * 删除指定cookie
     * @param {*} key 
     */
    del: function del(key) {
      //获取cookie
      var data = this.get(key);
      //如果获取到cookie则重新设置cookie的生存周期为过去时间
      if (data !== false) {
        this.set(key, data, -1);
      }
    },
    /**
     * 清空全部cookie
     */
    clear: function clear() {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--;) {
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
        }
      }
    }
  };

  /** 
   * localStorage
   * H5存储:增删改查
   */
  var Storage = /*#__PURE__*/function () {
    function Storage(type) {
      _classCallCheck(this, Storage);
      this.type = type || 'localStorage'; //设置默认缓存类型为localStorage
      this.options = {
        startTime: 0,
        // 开始时间(ms)
        duration: 0 // 有效持续时间(ms)
      };
    }
    /**
     * 存储数据
     * @param {*} name 数据名称
     * @param {*} data 数据内容
     * @param {*} duration 有效期-天
     */
    _createClass(Storage, [{
      key: "set",
      value: function set(name, data, duration) {
        this.options.startTime = new Date();
        this.options.duration = duration || 1; // 默认一天有效 单位 天,默认一天
        var value = null;
        if (_typeof(data) !== 'object' || data == null) {
          value = data;
        } else {
          value = JSON.stringify(data);
        }
        if (this.type === "localStorage") {
          localStorage.setItem(name, value);
        } else {
          sessionStorage.setItem(name, value);
        }
      }
      /**
       * 获取存储数据
       * @param {*} name 
       * @returns 
       */
    }, {
      key: "get",
      value: function get(name) {
        var item = this.type === "localStorage" ? localStorage.getItem(name) : sessionStorage.getItem(name);
        try {
          item = JSON.parse(item);
        } catch (e) {
          item = item;
        }
        if (this.options.startTime) {
          var start = this.options.startTime;
          var now = new Date();
          var diff = QUIFun.diffDate(start, now);
          if (diff > this.options.duration) {
            this.del(name);
            return null;
          }
        }
        return item;
      }
      /**
       * 删除数据
       * @param {*} name 
       */
    }, {
      key: "del",
      value: function del(name) {
        if (this.type === "localStorage") {
          localStorage.removeItem(name);
        } else {
          sessionStorage.removeItem(name);
        }
      }
      /**
       * 清空存储数据
       */
    }, {
      key: "clear",
      value: function clear() {
        localStorage.clear();
        sessionStorage.clear();
      }
    }]);
    return Storage;
  }();
  QUIFun.LocalStg = new Storage("localStorage");
  QUIFun.SessionStg = new Storage("sessionStorage");

  function initFun(vm) {
    for (var key in QUIFun) {
      if (Object.hasOwnProperty.call(QUIFun, key)) {
        vm[key] = QUIFun[key];
      }
    }
  }

  function ininRun(vm) {
    vm.setRem();
    vm.windowSize();
    vm.getPageSize();
    vm.loadViewer();
    if (vm.QRoptions) {
      vm.createQRcode(vm.QRoptions);
    }
    // 视口变化监听
    window.addEventListener("resize", function () {
      __reset();
    });
    function __reset() {
      console.clear();
      vm.setRem();
    }
  }

  // 原始数组原型链
  var OrginArrayMethod = Array.prototype;

  // 继承原型上的方法
  var ArrayMethod = Object.create(OrginArrayMethod);
  var methods = ["push", "pop", "unshift", "shift", "splice"];
  methods.forEach(function (item) {
    ArrayMethod[item] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      // 数组方法劫持
      var res = OrginArrayMethod[item].call(this, args);

      // 数组新增属性劫持
      var addValue;
      switch (item) {
        case "push":
        case "unshift":
          addValue = args;
          break;
        case "splice":
          addValue = splice(2);
          break;
      }
      var ob = this.__ob__;
      if (addValue) {
        ob.walkArray(addValue);
      }
      return res;
    };
  });

  function observer(data) {
    if (_typeof(data) != 'object' || data == null) {
      return data;
    }
    return new Observer(data);
  }
  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);
      // 保留数组的this,便于数组新增属性时进行调用walkArray进行劫持
      Object.defineProperty(value, "__ob__", {
        // 不可修改
        enumerable: false,
        value: this
      });
      if (Array.isArray(value)) {
        // 劫持数组的方法，从而实现数组相应
        value.__proto__ = ArrayMethod;
        // 数组对象深度劫持 [{a}]
        this.walkArray(value);
      } else {
        this.walk(value);
      }
    }
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 遍历
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = data[key];
          // 对数据进行劫持
          defineReactive(data, key, value);
        }
      }
    }, {
      key: "walkArray",
      value: function walkArray(data) {
        //遍历，并深度劫持
        for (var i = 0; i < data.length; i++) {
          observer(data[i]);
        }
      }
    }]);
    return Observer;
  }();
  /**
   * 深度劫持 
   * @param {*} data 
   * @param {*} key 
   * @param {*} value 
   *  Object.defineProperty 只能劫持对象的一个属性，因此需要遍历对象，分别进行深度劫持
   */
  function defineReactive(data, key, value) {
    // 深度劫持
    observer(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue == value) return;
        // 修改劫持
        observer(newValue);
        value = newValue;
      }
    });
  }

  function initState(vm) {
    var opts = vm.$options;
    // 数据响应劫持
    if (opts.data) {
      initData(vm);
    }
  }
  function initData(vm) {
    var data = vm.$options.data;
    // 获取data的值，同时改变this的指向到当前实例
    data = vm._data = typeof data === "function" ? data.call(vm) : data;
    // 数据代理，遍历实例外部获取data里的值
    for (var key in data) {
      proxy(vm, "_data", key);
    }
    // 对象观察者
    observer(data);
  }
  function proxy(data, source, key) {
    Object.defineProperty(data, key, {
      get: function get() {
        return data[source][key];
      },
      set: function set(newValue) {
        data[source][key] = newValue;
      }
    });
  }

  function initMixin(QUI) {
    QUI.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      // 合并方法
      initFun(vm);

      // 初始化状态
      initState(vm);
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
      // 初始化QUI入口
      ininRun(vm);
    };
    QUI.prototype.$mount = function (el) {
      // 模板编译优先级 el < template < render
      el = document.querySelector(el);
      var vm = this;
      var options = vm.$options;
      if (!options.render) {
        var template = options.template;
        if (!template && el) {
          el = el.outerHTML;
          // console.log(el)
        }
      }
    };
  }

  var QRCode$1;
  (function () {
    //---------------------------------------------------------------------
    // QRCode for JavaScript
    //---------------------------------------------------------------------
    function QR8bitByte(data) {
      this.mode = QRMode.MODE_8BIT_BYTE;
      this.data = data;
      this.parsedData = [];

      // Added to support UTF-8 Characters
      for (var i = 0, l = this.data.length; i < l; i++) {
        var byteArray = [];
        var code = this.data.charCodeAt(i);
        if (code > 0x10000) {
          byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
          byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
          byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
          byteArray[3] = 0x80 | code & 0x3F;
        } else if (code > 0x800) {
          byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
          byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
          byteArray[2] = 0x80 | code & 0x3F;
        } else if (code > 0x80) {
          byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
          byteArray[1] = 0x80 | code & 0x3F;
        } else {
          byteArray[0] = code;
        }
        this.parsedData.push(byteArray);
      }
      this.parsedData = Array.prototype.concat.apply([], this.parsedData);
      if (this.parsedData.length != this.data.length) {
        this.parsedData.unshift(191);
        this.parsedData.unshift(187);
        this.parsedData.unshift(239);
      }
    }
    QR8bitByte.prototype = {
      getLength: function getLength(buffer) {
        return this.parsedData.length;
      },
      write: function write(buffer) {
        for (var i = 0, l = this.parsedData.length; i < l; i++) {
          buffer.put(this.parsedData[i], 8);
        }
      }
    };
    function QRCodeModel(typeNumber, errorCorrectLevel) {
      this.typeNumber = typeNumber;
      this.errorCorrectLevel = errorCorrectLevel;
      this.modules = null;
      this.moduleCount = 0;
      this.dataCache = null;
      this.dataList = [];
    }
    function QRPolynomial(num, shift) {
      if (num.length == undefined) throw new Error(num.length + "/" + shift);
      var offset = 0;
      while (offset < num.length && num[offset] == 0) offset++;
      this.num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
    }
    function QRRSBlock(totalCount, dataCount) {
      this.totalCount = totalCount, this.dataCount = dataCount;
    }
    function QRBitBuffer() {
      this.buffer = [], this.length = 0;
    }
    QRCodeModel.prototype = {
      "addData": function addData(data) {
        var newData = new QR8bitByte(data);
        this.dataList.push(newData), this.dataCache = null;
      },
      "isDark": function isDark(row, col) {
        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) throw new Error(row + "," + col);
        return this.modules[row][col];
      },
      "getModuleCount": function getModuleCount() {
        return this.moduleCount;
      },
      "make": function make() {
        this.makeImpl(!1, this.getBestMaskPattern());
      },
      "makeImpl": function makeImpl(test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17, this.modules = new Array(this.moduleCount);
        for (var row = 0; row < this.moduleCount; row++) {
          this.modules[row] = new Array(this.moduleCount);
          for (var col = 0; col < this.moduleCount; col++) this.modules[row][col] = null;
        }
        this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(test, maskPattern), this.typeNumber >= 7 && this.setupTypeNumber(test), this.dataCache == null && (this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, maskPattern);
      },
      "setupPositionProbePattern": function setupPositionProbePattern(row, col) {
        for (var r = -1; r <= 7; r++) {
          if (row + r <= -1 || this.moduleCount <= row + r) continue;
          for (var c = -1; c <= 7; c++) {
            if (col + c <= -1 || this.moduleCount <= col + c) continue;
            0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4 ? this.modules[row + r][col + c] = !0 : this.modules[row + r][col + c] = !1;
          }
        }
      },
      "getBestMaskPattern": function getBestMaskPattern() {
        var minLostPoint = 0,
          pattern = 0;
        for (var i = 0; i < 8; i++) {
          this.makeImpl(!0, i);
          var lostPoint = QRUtil.getLostPoint(this);
          if (i == 0 || minLostPoint > lostPoint) minLostPoint = lostPoint, pattern = i;
        }
        return pattern;
      },
      "createMovieClip": function createMovieClip(target_mc, instance_name, depth) {
        var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth),
          cs = 1;
        this.make();
        for (var row = 0; row < this.modules.length; row++) {
          var y = row * cs;
          for (var col = 0; col < this.modules[row].length; col++) {
            var x = col * cs,
              dark = this.modules[row][col];
            dark && (qr_mc.beginFill(0, 100), qr_mc.moveTo(x, y), qr_mc.lineTo(x + cs, y), qr_mc.lineTo(x + cs, y + cs), qr_mc.lineTo(x, y + cs), qr_mc.endFill());
          }
        }
        return qr_mc;
      },
      "setupTimingPattern": function setupTimingPattern() {
        for (var r = 8; r < this.moduleCount - 8; r++) {
          if (this.modules[r][6] != null) continue;
          this.modules[r][6] = r % 2 == 0;
        }
        for (var c = 8; c < this.moduleCount - 8; c++) {
          if (this.modules[6][c] != null) continue;
          this.modules[6][c] = c % 2 == 0;
        }
      },
      "setupPositionAdjustPattern": function setupPositionAdjustPattern() {
        var pos = QRUtil.getPatternPosition(this.typeNumber);
        for (var i = 0; i < pos.length; i++) for (var j = 0; j < pos.length; j++) {
          var row = pos[i],
            col = pos[j];
          if (this.modules[row][col] != null) continue;
          for (var r = -2; r <= 2; r++) for (var c = -2; c <= 2; c++) r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0 ? this.modules[row + r][col + c] = !0 : this.modules[row + r][col + c] = !1;
        }
      },
      "setupTypeNumber": function setupTypeNumber(test) {
        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        for (var i = 0; i < 18; i++) {
          var mod = !test && (bits >> i & 1) == 1;
          this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        }
        for (var i = 0; i < 18; i++) {
          var mod = !test && (bits >> i & 1) == 1;
          this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
        }
      },
      "setupTypeInfo": function setupTypeInfo(test, maskPattern) {
        var data = this.errorCorrectLevel << 3 | maskPattern,
          bits = QRUtil.getBCHTypeInfo(data);
        for (var i = 0; i < 15; i++) {
          var mod = !test && (bits >> i & 1) == 1;
          i < 6 ? this.modules[i][8] = mod : i < 8 ? this.modules[i + 1][8] = mod : this.modules[this.moduleCount - 15 + i][8] = mod;
        }
        for (var i = 0; i < 15; i++) {
          var mod = !test && (bits >> i & 1) == 1;
          i < 8 ? this.modules[8][this.moduleCount - i - 1] = mod : i < 9 ? this.modules[8][15 - i - 1 + 1] = mod : this.modules[8][15 - i - 1] = mod;
        }
        this.modules[this.moduleCount - 8][8] = !test;
      },
      "mapData": function mapData(data, maskPattern) {
        var inc = -1,
          row = this.moduleCount - 1,
          bitIndex = 7,
          byteIndex = 0;
        for (var col = this.moduleCount - 1; col > 0; col -= 2) {
          col == 6 && col--;
          for (;;) {
            for (var c = 0; c < 2; c++) if (this.modules[row][col - c] == null) {
              var dark = !1;
              byteIndex < data.length && (dark = (data[byteIndex] >>> bitIndex & 1) == 1);
              var mask = QRUtil.getMask(maskPattern, row, col - c);
              mask && (dark = !dark), this.modules[row][col - c] = dark, bitIndex--, bitIndex == -1 && (byteIndex++, bitIndex = 7);
            }
            row += inc;
            if (row < 0 || this.moduleCount <= row) {
              row -= inc, inc = -inc;
              break;
            }
          }
        }
      }
    }, QRCodeModel.PAD0 = 236, QRCodeModel.PAD1 = 17, QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel),
        buffer = new QRBitBuffer();
      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        buffer.put(data.mode, 4), buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber)), data.write(buffer);
      }
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
      if (buffer.getLengthInBits() > totalDataCount * 8) throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
      buffer.getLengthInBits() + 4 <= totalDataCount * 8 && buffer.put(0, 4);
      while (buffer.getLengthInBits() % 8 != 0) buffer.putBit(!1);
      for (;;) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) break;
        buffer.put(QRCodeModel.PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) break;
        buffer.put(QRCodeModel.PAD1, 8);
      }
      return QRCodeModel.createBytes(buffer, rsBlocks);
    }, QRCodeModel.createBytes = function (buffer, rsBlocks) {
      var offset = 0,
        maxDcCount = 0,
        maxEcCount = 0,
        dcdata = new Array(rsBlocks.length),
        ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r].dataCount,
          ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount), maxEcCount = Math.max(maxEcCount, ecCount), dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcdata[r].length; i++) dcdata[r][i] = 255 & buffer.buffer[i + offset];
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount),
          rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1),
          modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
      var data = new Array(totalCodeCount),
        index = 0;
      for (var i = 0; i < maxDcCount; i++) for (var r = 0; r < rsBlocks.length; r++) i < dcdata[r].length && (data[index++] = dcdata[r][i]);
      for (var i = 0; i < maxEcCount; i++) for (var r = 0; r < rsBlocks.length; r++) i < ecdata[r].length && (data[index++] = ecdata[r][i]);
      return data;
    };
    var QRMode = {
        "MODE_NUMBER": 1,
        "MODE_ALPHA_NUM": 2,
        "MODE_8BIT_BYTE": 4,
        "MODE_KANJI": 8
      },
      QRErrorCorrectLevel = {
        "L": 1,
        "M": 0,
        "Q": 3,
        "H": 2
      },
      QRMaskPattern = {
        "PATTERN000": 0,
        "PATTERN001": 1,
        "PATTERN010": 2,
        "PATTERN011": 3,
        "PATTERN100": 4,
        "PATTERN101": 5,
        "PATTERN110": 6,
        "PATTERN111": 7
      },
      QRUtil = {
        "PATTERN_POSITION_TABLE": [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
        "G15": 1335,
        "G18": 7973,
        "G15_MASK": 21522,
        "getBCHTypeInfo": function getBCHTypeInfo(data) {
          var d = data << 10;
          while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
          return (data << 10 | d) ^ QRUtil.G15_MASK;
        },
        "getBCHTypeNumber": function getBCHTypeNumber(data) {
          var d = data << 12;
          while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
          return data << 12 | d;
        },
        "getBCHDigit": function getBCHDigit(data) {
          var digit = 0;
          while (data != 0) digit++, data >>>= 1;
          return digit;
        },
        "getPatternPosition": function getPatternPosition(typeNumber) {
          return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
        },
        "getMask": function getMask(maskPattern, i, j) {
          switch (maskPattern) {
            case QRMaskPattern.PATTERN000:
              return (i + j) % 2 == 0;
            case QRMaskPattern.PATTERN001:
              return i % 2 == 0;
            case QRMaskPattern.PATTERN010:
              return j % 3 == 0;
            case QRMaskPattern.PATTERN011:
              return (i + j) % 3 == 0;
            case QRMaskPattern.PATTERN100:
              return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
            case QRMaskPattern.PATTERN101:
              return i * j % 2 + i * j % 3 == 0;
            case QRMaskPattern.PATTERN110:
              return (i * j % 2 + i * j % 3) % 2 == 0;
            case QRMaskPattern.PATTERN111:
              return (i * j % 3 + (i + j) % 2) % 2 == 0;
            default:
              throw new Error("bad maskPattern:" + maskPattern);
          }
        },
        "getErrorCorrectPolynomial": function getErrorCorrectPolynomial(errorCorrectLength) {
          var a = new QRPolynomial([1], 0);
          for (var i = 0; i < errorCorrectLength; i++) a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
          return a;
        },
        "getLengthInBits": function getLengthInBits(mode, type) {
          if (1 <= type && type < 10) switch (mode) {
            case QRMode.MODE_NUMBER:
              return 10;
            case QRMode.MODE_ALPHA_NUM:
              return 9;
            case QRMode.MODE_8BIT_BYTE:
              return 8;
            case QRMode.MODE_KANJI:
              return 8;
            default:
              throw new Error("mode:" + mode);
          } else if (type < 27) switch (mode) {
            case QRMode.MODE_NUMBER:
              return 12;
            case QRMode.MODE_ALPHA_NUM:
              return 11;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 10;
            default:
              throw new Error("mode:" + mode);
          } else {
            if (!(type < 41)) throw new Error("type:" + type);
            switch (mode) {
              case QRMode.MODE_NUMBER:
                return 14;
              case QRMode.MODE_ALPHA_NUM:
                return 13;
              case QRMode.MODE_8BIT_BYTE:
                return 16;
              case QRMode.MODE_KANJI:
                return 12;
              default:
                throw new Error("mode:" + mode);
            }
          }
        },
        "getLostPoint": function getLostPoint(qrCode) {
          var moduleCount = qrCode.getModuleCount(),
            lostPoint = 0;
          for (var row = 0; row < moduleCount; row++) for (var col = 0; col < moduleCount; col++) {
            var sameCount = 0,
              dark = qrCode.isDark(row, col);
            for (var r = -1; r <= 1; r++) {
              if (row + r < 0 || moduleCount <= row + r) continue;
              for (var c = -1; c <= 1; c++) {
                if (col + c < 0 || moduleCount <= col + c) continue;
                if (r == 0 && c == 0) continue;
                dark == qrCode.isDark(row + r, col + c) && sameCount++;
              }
            }
            sameCount > 5 && (lostPoint += 3 + sameCount - 5);
          }
          for (var row = 0; row < moduleCount - 1; row++) for (var col = 0; col < moduleCount - 1; col++) {
            var count = 0;
            qrCode.isDark(row, col) && count++, qrCode.isDark(row + 1, col) && count++, qrCode.isDark(row, col + 1) && count++, qrCode.isDark(row + 1, col + 1) && count++;
            if (count == 0 || count == 4) lostPoint += 3;
          }
          for (var row = 0; row < moduleCount; row++) for (var col = 0; col < moduleCount - 6; col++) qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6) && (lostPoint += 40);
          for (var col = 0; col < moduleCount; col++) for (var row = 0; row < moduleCount - 6; row++) qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col) && (lostPoint += 40);
          var darkCount = 0;
          for (var col = 0; col < moduleCount; col++) for (var row = 0; row < moduleCount; row++) qrCode.isDark(row, col) && darkCount++;
          var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
          return lostPoint += ratio * 10, lostPoint;
        }
      },
      QRMath = {
        "glog": function glog(n) {
          if (n < 1) throw new Error("glog(" + n + ")");
          return QRMath.LOG_TABLE[n];
        },
        "gexp": function gexp(n) {
          while (n < 0) n += 255;
          while (n >= 256) n -= 255;
          return QRMath.EXP_TABLE[n];
        },
        "EXP_TABLE": new Array(256),
        "LOG_TABLE": new Array(256)
      };
    for (var i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;
    for (var i = 8; i < 256; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    for (var i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
    QRPolynomial.prototype = {
      "get": function get(index) {
        return this.num[index];
      },
      "getLength": function getLength() {
        return this.num.length;
      },
      "multiply": function multiply(e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for (var i = 0; i < this.getLength(); i++) for (var j = 0; j < e.getLength(); j++) num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        return new QRPolynomial(num, 0);
      },
      "mod": function mod(e) {
        if (this.getLength() - e.getLength() < 0) return this;
        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0)),
          num = new Array(this.getLength());
        for (var i = 0; i < this.getLength(); i++) num[i] = this.get(i);
        for (var i = 0; i < e.getLength(); i++) num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        return new QRPolynomial(num, 0).mod(e);
      }
    }, QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
      var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
      if (rsBlock == undefined) throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
      var length = rsBlock.length / 3,
        list = [];
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0],
          totalCount = rsBlock[i * 3 + 1],
          dataCount = rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j++) list.push(new QRRSBlock(totalCount, dataCount));
      }
      return list;
    }, QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
      switch (errorCorrectLevel) {
        case QRErrorCorrectLevel.L:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectLevel.M:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectLevel.Q:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectLevel.H:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
          return undefined;
      }
    }, QRBitBuffer.prototype = {
      "get": function get(index) {
        var bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
      },
      "put": function put(num, length) {
        for (var i = 0; i < length; i++) this.putBit((num >>> length - i - 1 & 1) == 1);
      },
      "getLengthInBits": function getLengthInBits() {
        return this.length;
      },
      "putBit": function putBit(bit) {
        var bufIndex = Math.floor(this.length / 8);
        this.buffer.length <= bufIndex && this.buffer.push(0), bit && (this.buffer[bufIndex] |= 128 >>> this.length % 8), this.length++;
      }
    };
    var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
    function _isSupportCanvas() {
      return typeof CanvasRenderingContext2D != "undefined";
    }

    // android 2.x doesn't support Data-URI spec
    function _getAndroid() {
      var android = false;
      var sAgent = navigator.userAgent;
      if (/android/i.test(sAgent)) {
        // android
        android = true;
        aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
        if (aMat && aMat[1]) {
          android = parseFloat(aMat[1]);
        }
      }
      return android;
    }
    var svgDrawer = function () {
      var Drawing = function Drawing(el, htOption) {
        this._el = el;
        this._htOption = htOption;
      };
      Drawing.prototype.draw = function (oQRCode) {
        var _htOption = this._htOption;
        var _el = this._el;
        var nCount = oQRCode.getModuleCount();
        Math.floor(_htOption.width / nCount);
        Math.floor(_htOption.height / nCount);
        this.clear();
        function makeSVG(tag, attrs) {
          var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
          for (var k in attrs) if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
          return el;
        }
        var svg = makeSVG("svg", {
          'viewBox': '0 0 ' + String(nCount) + " " + String(nCount),
          'width': '100%',
          'height': '100%',
          'fill': _htOption.colorLight
        });
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        _el.appendChild(svg);
        svg.appendChild(makeSVG("rect", {
          "fill": _htOption.colorDark,
          "width": "1",
          "height": "1",
          "id": "template"
        }));
        for (var row = 0; row < nCount; row++) {
          for (var col = 0; col < nCount; col++) {
            if (oQRCode.isDark(row, col)) {
              var child = makeSVG("use", {
                "x": String(row),
                "y": String(col)
              });
              child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template");
              svg.appendChild(child);
            }
          }
        }
      };
      Drawing.prototype.clear = function () {
        while (this._el.hasChildNodes()) this._el.removeChild(this._el.lastChild);
      };
      return Drawing;
    }();
    var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

    // Drawing in DOM by using Table tag
    var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? function () {
      var Drawing = function Drawing(el, htOption) {
        this._el = el;
        this._htOption = htOption;
      };

      /**
       * Draw the QRCode
       * 
       * @param {QRCode} oQRCode
       */
      Drawing.prototype.draw = function (oQRCode) {
        var _htOption = this._htOption;
        var _el = this._el;
        var nCount = oQRCode.getModuleCount();
        var nWidth = Math.floor(_htOption.width / nCount);
        var nHeight = Math.floor(_htOption.height / nCount);
        var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
        for (var row = 0; row < nCount; row++) {
          aHTML.push('<tr>');
          for (var col = 0; col < nCount; col++) {
            aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
          }
          aHTML.push('</tr>');
        }
        aHTML.push('</table>');
        _el.innerHTML = aHTML.join('');

        // Fix the margin values as real size.
        var elTable = _el.childNodes[0];
        var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
        var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
        if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
          elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";
        }
      };

      /**
       * Clear the QRCode
       */
      Drawing.prototype.clear = function () {
        this._el.innerHTML = '';
      };
      return Drawing;
    }() : function () {
      // Drawing in Canvas
      function _onMakeImage() {
        this._elImage.src = this._elCanvas.toDataURL("image/png");
        this._elImage.style.display = "block";
        this._elCanvas.style.display = "none";
      }

      // Android 2.1 bug workaround
      // http://code.google.com/p/android/issues/detail?id=5141
      if (this && this._android <= 2.1) {
        var factor = 1 / window.devicePixelRatio;
        var drawImage = CanvasRenderingContext2D.prototype.drawImage;
        CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
          if ("nodeName" in image && /img/i.test(image.nodeName)) {
            for (var i = arguments.length - 1; i >= 1; i--) {
              arguments[i] = arguments[i] * factor;
            }
          } else if (typeof dw == "undefined") {
            arguments[1] *= factor;
            arguments[2] *= factor;
            arguments[3] *= factor;
            arguments[4] *= factor;
          }
          drawImage.apply(this, arguments);
        };
      }

      /**
       * Check whether the user's browser supports Data URI or not
       * 
       * @private
       * @param {Function} fSuccess Occurs if it supports Data URI
       * @param {Function} fFail Occurs if it doesn't support Data URI
       */
      function _safeSetDataURI(fSuccess, fFail) {
        var self = this;
        self._fFail = fFail;
        self._fSuccess = fSuccess;

        // Check it just once
        if (self._bSupportDataURI === null) {
          var el = document.createElement("img");
          var fOnError = function fOnError() {
            self._bSupportDataURI = false;
            if (self._fFail) {
              _fFail.call(self);
            }
          };
          var fOnSuccess = function fOnSuccess() {
            self._bSupportDataURI = true;
            if (self._fSuccess) {
              self._fSuccess.call(self);
            }
          };
          el.onabort = fOnError;
          el.onerror = fOnError;
          el.onload = fOnSuccess;
          el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
          return;
        } else if (self._bSupportDataURI === true && self._fSuccess) {
          self._fSuccess.call(self);
        } else if (self._bSupportDataURI === false && self._fFail) {
          self._fFail.call(self);
        }
      }

      /**
       * Drawing QRCode by using canvas
       * 
       * @constructor
       * @param {HTMLElement} el
       * @param {Object} htOption QRCode Options 
       */
      var Drawing = function Drawing(el, htOption) {
        this._bIsPainted = false;
        this._android = _getAndroid();
        this._htOption = htOption;
        this._elCanvas = document.createElement("canvas");
        this._elCanvas.width = htOption.width;
        this._elCanvas.height = htOption.height;
        el.appendChild(this._elCanvas);
        this._el = el;
        this._oContext = this._elCanvas.getContext("2d");
        this._bIsPainted = false;
        this._elImage = document.createElement("img");
        this._elImage.alt = "Scan me!";
        this._elImage.style.display = "none";
        this._el.appendChild(this._elImage);
        this._bSupportDataURI = null;
      };

      /**
       * Draw the QRCode
       * 
       * @param {QRCode} oQRCode 
       */
      Drawing.prototype.draw = function (oQRCode) {
        var _elImage = this._elImage;
        var _oContext = this._oContext;
        var _htOption = this._htOption;
        var nCount = oQRCode.getModuleCount();
        var nWidth = _htOption.width / nCount;
        var nHeight = _htOption.height / nCount;
        var nRoundedWidth = Math.round(nWidth);
        var nRoundedHeight = Math.round(nHeight);
        _elImage.style.display = "none";
        this.clear();
        for (var row = 0; row < nCount; row++) {
          for (var col = 0; col < nCount; col++) {
            var bIsDark = oQRCode.isDark(row, col);
            var nLeft = col * nWidth;
            var nTop = row * nHeight;
            _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
            _oContext.lineWidth = 1;
            _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
            _oContext.fillRect(nLeft, nTop, nWidth, nHeight);
            _oContext.strokeRect(Math.floor(nLeft) + 0.5, Math.floor(nTop) + 0.5, nRoundedWidth, nRoundedHeight);
            _oContext.strokeRect(Math.ceil(nLeft) - 0.5, Math.ceil(nTop) - 0.5, nRoundedWidth, nRoundedHeight);
          }
        }
        this._bIsPainted = true;
      };

      /**
       * Make the image from Canvas if the browser supports Data URI.
       */
      Drawing.prototype.makeImage = function () {
        if (this._bIsPainted) {
          _safeSetDataURI.call(this, _onMakeImage);
        }
      };

      /**
       * Return whether the QRCode is painted or not
       * 
       * @return {Boolean}
       */
      Drawing.prototype.isPainted = function () {
        return this._bIsPainted;
      };

      /**
       * Clear the QRCode
       */
      Drawing.prototype.clear = function () {
        this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
        this._bIsPainted = false;
      };

      /**
       * @private
       * @param {Number} nNumber
       */
      Drawing.prototype.round = function (nNumber) {
        if (!nNumber) {
          return nNumber;
        }
        return Math.floor(nNumber * 1000) / 1000;
      };
      return Drawing;
    }();

    /**
     * Get the type by string length
     * 
     * @private
     * @param {String} sText
     * @param {Number} nCorrectLevel
     * @return {Number} type
     */
    function _getTypeNumber(sText, nCorrectLevel) {
      var nType = 1;
      var length = _getUTF8Length(sText);
      for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
        var nLimit = 0;
        switch (nCorrectLevel) {
          case QRErrorCorrectLevel.L:
            nLimit = QRCodeLimitLength[i][0];
            break;
          case QRErrorCorrectLevel.M:
            nLimit = QRCodeLimitLength[i][1];
            break;
          case QRErrorCorrectLevel.Q:
            nLimit = QRCodeLimitLength[i][2];
            break;
          case QRErrorCorrectLevel.H:
            nLimit = QRCodeLimitLength[i][3];
            break;
        }
        if (length <= nLimit) {
          break;
        } else {
          nType++;
        }
      }
      if (nType > QRCodeLimitLength.length) {
        throw new Error("Too long data");
      }
      return nType;
    }
    function _getUTF8Length(sText) {
      var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
      return replacedText.length + (replacedText.length != sText ? 3 : 0);
    }

    /**
     * @class QRCode
     * @constructor
     * @example 
     * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
     *
     * @example
     * var oQRCode = new QRCode("test", {
     *    text : "http://naver.com",
     *    width : 128,
     *    height : 128
     * });
     * 
     * oQRCode.clear(); // Clear the QRCode.
     * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
     *
     * @param {HTMLElement|String} el target element or 'id' attribute of element.
     * @param {Object|String} vOption
     * @param {String} vOption.text QRCode link data
     * @param {Number} [vOption.width=256]
     * @param {Number} [vOption.height=256]
     * @param {String} [vOption.colorDark="#000000"]
     * @param {String} [vOption.colorLight="#ffffff"]
     * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H] 
     */
    QRCode$1 = function QRCode(el, vOption) {
      this._htOption = {
        width: 256,
        height: 256,
        typeNumber: 4,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRErrorCorrectLevel.H
      };
      if (typeof vOption === 'string') {
        vOption = {
          text: vOption
        };
      }

      // Overwrites options
      if (vOption) {
        for (var i in vOption) {
          this._htOption[i] = vOption[i];
        }
      }
      if (typeof el == "string") {
        el = document.getElementById(el);
      }
      this._android = _getAndroid();
      this._el = el;
      this._oQRCode = null;
      this._oDrawing = new Drawing(this._el, this._htOption);
      if (this._htOption.text) {
        this.makeCode(this._htOption.text);
      }
    };

    /**
     * Make the QRCode
     * 
     * @param {String} sText link data
     */
    QRCode$1.prototype.makeCode = function (sText) {
      this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
      this._oQRCode.addData(sText);
      this._oQRCode.make();
      this._el.title = sText;
      this._oDrawing.draw(this._oQRCode);
      this.makeImage();
    };

    /**
     * Make the Image from Canvas element
     * - It occurs automatically
     * - Android below 3 doesn't support Data-URI spec.
     * 
     * @private
     */
    QRCode$1.prototype.makeImage = function () {
      if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
        this._oDrawing.makeImage();
      }
    };

    /**
     * Clear the QRCode
     */
    QRCode$1.prototype.clear = function () {
      this._el.innerHTML = '';
      this._oDrawing.clear();
    };

    /**
     * @name QRCode.CorrectLevel
     */
    QRCode$1.CorrectLevel = QRErrorCorrectLevel;
  })();
  var QRCode$2 = QRCode$1;

  /** viewer.js图片预览插件
   *  author:cjq
   *  time: 2023-03-31
   *  options参数解析：
   *  src —— 必填图片src路径
   */
  var Viewer$1 = /*#__PURE__*/function () {
    function Viewer(src) {
      _classCallCheck(this, Viewer);
      this.src = src;
    }
    _createClass(Viewer, [{
      key: "viewer",
      value: function viewer() {
        this.creatLayer();
        this.listenEvent();
      }
    }, {
      key: "creatLayer",
      value: function creatLayer() {
        var div = document.createElement("div");
        div.className = "qui-boom";
        div.innerHTML = "<div class=\"qui-boom-layer\"></div><div class=\"qui-boom-img\"><img draggable=\"true\" src=\"".concat(this.src, "\" alt=\"\"> </div>\n                <div class=\"viewer-oper\">\n                <i class=\"icon icon-zoom-in\" id=\"viewerZoomIn\"></i>\n                <i class=\"icon icon-zoom-out\" id=\"viewerZoomOut\"></i>\n                <i class=\"icon icon-x\" id=\"viewerClose\"></i>\n            </div>");
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
        document.body.appendChild(div);
      }
    }, {
      key: "listenEvent",
      value: function listenEvent() {
        // 关闭事件监听
        var box = document.getElementsByClassName("qui-boom-layer")[0];
        var that = this;
        box.addEventListener("click", function () {
          that.closeLayer();
        });
        var close = document.getElementById("viewerClose");
        close.addEventListener("click", function () {
          that.closeLayer();
        });

        //缩小事件
        var ZoomOut = document.getElementById("viewerZoomOut");
        ZoomOut.addEventListener("click", function () {
          that.viewZoomOut();
        });
        //放大事件
        var ZoomIn = document.getElementById("viewerZoomIn");
        ZoomIn.addEventListener("click", function () {
          that.viewZoomIn();
        });
        //鼠标滚轴事件
        window.onmousewheel = document.onmousewheel = function (e) {
          if (e.wheelDelta < 0) {
            // 缩小
            that.viewZoomOut();
          } else if (e.wheelDelta > 0) {
            // 放大
            that.viewZoomIn();
          }
        };
      }
    }, {
      key: "closeLayer",
      value: function closeLayer() {
        document.body.removeChild(document.getElementsByClassName("qui-boom")[0]);
        window.imger = null;
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
      }
    }, {
      key: "viewZoomIn",
      value: function viewZoomIn() {
        var scale = window.scale || 1;
        var imgbox = document.getElementsByClassName("qui-boom-img")[0];
        if (imgbox && scale < 4) {
          scale = scale + 0.6;
          window.scale = scale;
          imgbox.childNodes[0].style.transform = "scale(".concat(scale, ")");
        }
      }
    }, {
      key: "viewZoomOut",
      value: function viewZoomOut() {
        var scale = window.scale || 1;
        var imgbox = document.getElementsByClassName("qui-boom-img")[0];
        if (imgbox && scale > 0.6) {
          scale = scale - 0.6;
          window.scale = scale;
          imgbox.childNodes[0].style.transform = "scale(".concat(scale, ")");
        }
      }
    }]);
    return Viewer;
  }();

  /** Messages.js消息提示插件
   *  author:cjq
   *  time: 2023-4-3
   *  options参数解析：
   *  type —— 可选字段：warn，success，error
   *  msg —— 必填字段
   */
  var Messages = /*#__PURE__*/function () {
    function Messages(options) {
      _classCallCheck(this, Messages);
      var type = options.type,
        msg = options.msg;
      this.type = type;
      this.msg = msg;
    }
    _createClass(Messages, [{
      key: "show",
      value: function () {
        var _show = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var that;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.creatElement();
              case 2:
                that = this;
                setTimeout(function () {
                  that.hide();
                }, 3000);
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function show() {
          return _show.apply(this, arguments);
        }
        return show;
      }()
    }, {
      key: "creatElement",
      value: function () {
        var _creatElement = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var msgbox, div, startHTML, errHTML, warnHTML, sucessHTML, endHTML, middleHTML, itmeHtml, childNode, childdiv;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                msgbox = document.getElementsByClassName("ui-messages")[0];
                div = null;
                if (msgbox) {
                  div = msgbox;
                } else {
                  div = document.createElement("div");
                  div.className = "ui-messages";
                }
                startHTML = "<div class=\"item ".concat(this.type, "\">");
                errHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-x-circle\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line></svg>";
                warnHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-alert-circle\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"></line></svg>";
                sucessHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-check-circle\"><path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"></path><polyline points=\"22 4 12 14.01 9 11.01\"></polyline></svg>";
                endHTML = "<span>".concat(this.msg, "</span></div>"); // 默认不带图标
                middleHTML = "";
                if (this.type === "warn") {
                  middleHTML = warnHTML;
                }
                if (this.type === "success") {
                  middleHTML = sucessHTML;
                }
                if (this.type === "error") {
                  middleHTML = errHTML;
                }
                //middleHTML 可扩展
                itmeHtml = startHTML + middleHTML + endHTML;
                if (div.childNodes && div.childNodes.length > 0) {
                  childNode = div.childNodes[div.childNodes.length];
                  if (!childNode) {
                    childdiv = document.createElement("div");
                    childdiv.className = "item  ".concat(this.type);
                    childdiv.innerHTML = middleHTML + "<span>".concat(this.msg, "</span> ");
                    div.appendChild(childdiv);
                  }
                } else {
                  div.innerHTML = itmeHtml;
                  document.body.appendChild(div);
                }
                _context2.next = 16;
                return this.sleep(1000);
              case 16:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function creatElement() {
          return _creatElement.apply(this, arguments);
        }
        return creatElement;
      }()
    }, {
      key: "hide",
      value: function hide() {
        var item = document.getElementsByClassName("ui-messages")[0].children[0];
        if (item) {
          document.getElementsByClassName("ui-messages")[0].removeChild(item);
        } else {
          document.body.removeChild(document.getElementsByClassName("ui-messages")[0]);
        }
      }
    }, {
      key: "sleep",
      value: function sleep(time) {
        return new Promise(function (resolve) {
          window.setTimeout(function () {
            resolve();
          }, time);
        });
      }
    }]);
    return Messages;
  }();

  /** Layer.js弹窗提示插件
   *  author:cjq
   *  time: 2023-4-4
   *  options参数解析：
   * * * * title —— 弹窗标题，String，可选
   * * * * content —— 弹窗内容，String，可选
   * * * * buttons —— 弹窗按钮，String，可选。多个按钮采用“|”分割:"cancle|confirm|submit"，按钮支持回调事件，使用横线-："submit-subEvent|ok-sucessEuent"
   * * * * buttonAlign —— 弹窗按钮对齐方式，可选。值：right,left,center。 默认右对齐
   * * * * width —— 弹窗宽度，String，Number，可选。
   * * * * height —— 弹窗高度，String，Number，可选。
   * * * * radius —— 弹窗圆角，Number，可选。
   * * * * layerType —— 弹窗类型，String，可选。值：normal,image 。
   * * * * src —— 弹出类型为image时，String，必填！其他类型为空！
   * * * * position —— 弹窗位置，String，可选。值：top,bottom,center,top-left,top-right,bottom-left,bottom-right,left-center,right-center。图片弹窗仅支持top,bottom,center
   * 
   * 文字弹窗例子：
   * let popoptions = {
  		title:"温馨提示",
  		content:"您的会员已于23年10月1日到期，请重置！",
  		width:500,
  		buttons:"cancle|confirm",
  		position:"center",
  	}

   * 图片弹窗例子：
     let popoptions = {
  		width: 800,
  		position:"bottom",
  		radius:"30",			
  		src:"https://cdn.staticaly.com/gh/GHchenjingqi/picx-images-hosting@master/084925tI2CY.1b5fr0lah8ow.webp",
  		layerType:"image"
  	}
   */
  var PopLayer = /*#__PURE__*/function () {
    function PopLayer(options) {
      _classCallCheck(this, PopLayer);
      var _options = _objectSpread2({}, options),
        title = _options.title,
        content = _options.content,
        buttons = _options.buttons,
        _options$buttonAlign = _options.buttonAlign,
        buttonAlign = _options$buttonAlign === void 0 ? "right" : _options$buttonAlign,
        _options$width = _options.width,
        width = _options$width === void 0 ? 300 : _options$width,
        _options$height = _options.height,
        height = _options$height === void 0 ? 'auto' : _options$height,
        _options$radius = _options.radius,
        radius = _options$radius === void 0 ? 2 : _options$radius,
        _options$layerType = _options.layerType,
        layerType = _options$layerType === void 0 ? "normal" : _options$layerType,
        src = _options.src,
        _options$position = _options.position,
        position = _options$position === void 0 ? "center" : _options$position;
      this.title = title;
      this.content = content;
      this.buttons = buttons;
      this.width = width == 'auto' ? width : width + 'px';
      this.height = height == 'auto' ? height : height + 'px';
      this.radius = radius;
      this.layerType = layerType;
      this.src = src;
      this.position = position;
      this.buttonAlign = buttonAlign;
    }
    _createClass(PopLayer, [{
      key: "show",
      value: function show() {
        this.creatPop();
        this.listenEvent();
      }
    }, {
      key: "listenEvent",
      value: function listenEvent() {
        // 关闭事件监听
        var box = document.getElementsByClassName("qui-boom-layer")[0];
        var that = this;
        box.addEventListener("click", function () {
          that.hide();
        });
        var close = document.getElementsByClassName("qui-boom-icon-close")[0];
        if (close) {
          close.addEventListener("click", function () {
            that.hide();
          });
        }
        var cancleBtn = document.getElementById("cancle");
        if (cancleBtn) {
          cancleBtn.addEventListener("click", function () {
            that.hide();
          });
        }
        //回调事件添加
        if (this.buttons) {
          var btnGroup = this.buttons.split('|');
          var eval2 = eval;
          if (btnGroup.length > 0) {
            btnGroup.forEach(function (item) {
              var btnItem = item.split('-');
              if (btnItem[1]) {
                //将字符串当成函数执行
                var events = btnItem[1] + '()';
                document.getElementById(btnItem[0]).addEventListener("click", function () {
                  eval2(events);
                });
              }
            });
          }
        }
      }
    }, {
      key: "creatPop",
      value: function creatPop() {
        var _this = this;
        var div = document.createElement("div");
        div.className = "qui-boom";
        if (this.layerType === 'normal') {
          var startHtml = "<div class=\"qui-boom-layer\"></div><div class=\"qui-boom-".concat(this.position, " bgff\" style=\"width: ").concat(this.width, ";height: ").concat(this.height, ";border-radius: ").concat(this.radius, "px;\">");
          var titleHtml = this.title ? "<div class=\"qui-boom-title\">".concat(this.title, "</div>") : '';
          var contentHtml = this.content ? "<div class=\"qui-boom-content\">".concat(this.content, "</div>") : '';
          var btnHtml = "";
          if (this.buttons) {
            var btnGroup = this.buttons.split('|');
            var btnstr = '';
            if (btnGroup.length > 0) {
              btnGroup.forEach(function (item) {
                var btnItem = item.split('-');
                if (btnItem[0] === 'cancle') {
                  btnstr = btnstr + "<button class=\"white\" id=\"".concat(btnItem[0], "\">").concat(_this.getBtnText(btnItem[0]), "</button>");
                } else {
                  btnstr = btnstr + "<button id=\"".concat(btnItem[0], "\">").concat(_this.getBtnText(btnItem[0]), "</button>");
                }
              });
            }
            btnHtml = "<div class=\"qui-boom-btn text-".concat(this.buttonAlign, "\">").concat(btnstr, "</div>");
          }
          var endHtml = " <div class=\"qui-boom-icon-close\"><i class=\"icon icon-x\"></i></div></div>";
          div.innerHTML = startHtml + titleHtml + contentHtml + btnHtml + endHtml;
        }
        if (this.layerType === 'image') {
          div.innerHTML = "<div class=\"qui-boom-layer\"></div><div class=\"qui-boom-img qui-boom-".concat(this.position, "\"><img draggable=\"true\" style=\"width:").concat(this.width, ";height:").concat(this.height, ";border-radius:").concat(this.radius, "px\" src=\"").concat(this.src, "\" alt=\"\"> </div>");
        }
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
        document.body.appendChild(div);
      }
    }, {
      key: "getBtnText",
      value: function getBtnText(label) {
        var textlist = {
          cancle: "取消",
          confirm: "确认",
          submit: "提交"
        };
        return textlist[label] ? textlist[label] : label;
      }
    }, {
      key: "hide",
      value: function hide() {
        document.body.removeChild(document.getElementsByClassName("qui-boom")[0]);
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
      }
    }]);
    return PopLayer;
  }();

  /** Drawer.js 抽屉弹窗插件
   *  author:cjq
   *  time: 2023-4-6
   *  options参数解析：
   *  direction —— String 方向，默认右侧。可选
   *  width —— String | Number 宽度，方向为顶部，底部时默认100%宽度，左右抽屉时默认宽度360px。可选
   *  height —— String | Number 高度，方向为左侧，右侧时默认100%高度，上下抽屉时默认宽度360px。可选
   *  title —— String，标题内容，可选
   *  content —— String，弹框内容，必填
   *  closeIcon —— Boolean,弹框关闭按钮是否显示，可选
   * 
   *  案例：
   *  let options = {
  			title:"抽屉标题",
  			content:"抽屉内容",
  			direction:"bottom",
  			width:500,
  			height:300
   *	}
   */
  var Drawer = /*#__PURE__*/function () {
    function Drawer(options) {
      _classCallCheck(this, Drawer);
      var _options$direction = options.direction,
        direction = _options$direction === void 0 ? "right" : _options$direction,
        width = options.width,
        height = options.height,
        title = options.title,
        content = options.content,
        _options$closeIcon = options.closeIcon,
        closeIcon = _options$closeIcon === void 0 ? true : _options$closeIcon;
      this.title = title;
      this.content = content;
      this.closeIcon = closeIcon;
      this.direction = direction;
      if (["top", "bottom"].includes(this.direction)) {
        this.width = "100%";
        this.height = height ? height + 'px' : "360px";
      }
      if (["left", "right"].includes(this.direction)) {
        this.height = "100%";
        this.width = width ? width + 'px' : "360px";
      }
      this.iconHtml = "";
      if (this.closeIcon) {
        this.iconHtml = "<i class=\"icon icon-x qui-boom-close\"></i>";
      }
    }
    _createClass(Drawer, [{
      key: "show",
      value: function show() {
        this.creatPop();
        this.listenEvent();
      }
    }, {
      key: "creatPop",
      value: function creatPop() {
        var div = document.createElement("div");
        div.className = "qui-boom";
        var startHtml = "<div class=\"qui-boom-layer\"></div><div class=\"qui-boom-".concat(this.direction, " ui-drawer\" id=\"ui-drawer\" style=\"width:").concat(this.width, ";height:").concat(this.height, "\">");
        var headerHtml = this.title ? "<div class=\"ui-drawer-header\"><span>".concat(this.title, "</span>").concat(this.iconHtml, "</div>") : "";
        var contentHtml = "<div class=\"ui-drawer-content\">".concat(this.content, "</div></div>");
        div.innerHTML = startHtml + headerHtml + contentHtml;
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
        document.body.appendChild(div);
      }
    }, {
      key: "listenEvent",
      value: function listenEvent() {
        // 关闭事件监听
        var box = document.getElementsByClassName("qui-boom-layer")[0];
        var that = this;
        box.addEventListener("click", function () {
          that.hide();
        });
        var close = document.getElementsByClassName("qui-boom-close")[0];
        if (close) {
          close.addEventListener("click", function () {
            that.hide();
          });
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        document.body.removeChild(document.getElementsByClassName("qui-boom")[0]);
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
      }
    }]);
    return Drawer;
  }();

  var Plugins = {
    QRCode: QRCode$2,
    Viewer: Viewer$1,
    Messages: Messages,
    Layer: PopLayer,
    Drawer: Drawer
  };
  Plugins.creat = function () {
    for (var key in Plugins) {
      if (Object.hasOwnProperty.call(Plugins, key)) {
        window[key] = Plugins[key];
      }
    }
  };

  function QUI(optios) {
    Plugins.creat();
    this._init(optios);
  }
  initMixin(QUI);

  return QUI;

})));
//# sourceMappingURL=qui.js.map
