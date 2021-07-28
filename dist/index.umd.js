(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('stream')) :
  typeof define === 'function' && define.amd ? define(['exports', 'stream'], factory) :
  (global = global || self, factory(global.bufferCutter = {}, global.stream));
}(this, (function (exports, stream) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var stream__default = /*#__PURE__*/_interopDefaultLegacy(stream);

  function _asyncIterator(iterable) {
    var method;

    if (typeof Symbol !== "undefined") {
      if (Symbol.asyncIterator) method = iterable[Symbol.asyncIterator];
      if (method == null && Symbol.iterator) method = iterable[Symbol.iterator];
    }

    if (method == null) method = iterable["@@asyncIterator"];
    if (method == null) method = iterable["@@iterator"];
    if (method == null) throw new TypeError("Object is not async iterable");
    return method.call(iterable);
  }

  function _AwaitValue(value) {
    this.wrapped = value;
  }

  function _AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;
        var wrappedAwait = value instanceof _AwaitValue;
        Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
          if (wrappedAwait) {
            resume(key === "return" ? "return" : "next", arg);
            return;
          }

          settle(result.done ? "return" : "normal", arg);
        }, function (err) {
          resume("throw", err);
        });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  _AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () {
    return this;
  };

  _AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  _AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  _AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  function _wrapAsyncGenerator(fn) {
    return function () {
      return new _AsyncGenerator(fn.apply(this, arguments));
    };
  }

  function _awaitAsyncGenerator(value) {
    return new _AwaitValue(value);
  }

  function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {},
        waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) {
        resolve(inner[key](value));
      });
      return {
        done: false,
        value: awaitWrap(value)
      };
    }

    iter[typeof Symbol !== "undefined" && Symbol.iterator || "@@iterator"] = function () {
      return this;
    };

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }

      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }

        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        if (waiting) {
          waiting = false;
          return value;
        }

        return pump("return", value);
      };
    }

    return iter;
  }

  function cutBuffer(buf, opts = {}) {
    if (!(buf instanceof Buffer)) {
      throw new Error(`${buf} is not Buffer`);
    }

    const deepCopy = 'deepCopy' in opts ? opts.deepCopy : true;
    const start = 'start' in opts ? opts.start : 0;
    const end = 'end' in opts ? opts.end : buf.length;
    const length = buf.length < end ? buf.length - start : end - start;

    if (deepCopy) {
      const result = Buffer.alloc(length);
      buf.copy(result, 0, start, start + length);
      return result;
    }

    return buf.subarray(start, start + length);
  }
  function cuttingBuffer(buffer, opts = {}) {
    if (!(buffer instanceof Buffer)) {
      throw new Error(`${buffer} is not Buffer`);
    }

    const result = [];
    const deepCopy = 'deepCopy' in opts ? opts.deepCopy : true;
    const length = 'length' in opts ? opts.length : buffer.length;

    for (let i = 0; i < buffer.length;) {
      result.push(cutBuffer(buffer, {
        deepCopy,
        start: i,
        end: i += length
      }));
    }

    return result;
  }
  function cuttingRStream(_x) {
    return _cuttingRStream.apply(this, arguments);
  }

  function _cuttingRStream() {
    _cuttingRStream = _wrapAsyncGenerator(function* (readable, opts = {}) {
      if (!(readable instanceof stream__default['default'].Readable)) {
        throw new Error(`${readable} is not Readable Stream`);
      }

      const deepCopy = 'deepCopy' in opts ? opts.deepCopy : true;
      const length = 'length' in opts ? opts.length : null;

      if (length === null) {
        throw new Error('no unit to cut');
      }

      let tmpBuffers = [];
      let tmpTotalSize = 0; // eslint-disable-next-line no-restricted-syntax

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;

      var _iteratorError;

      try {
        for (var _iterator = _asyncIterator(readable), _step, _value; _step = yield _awaitAsyncGenerator(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield _awaitAsyncGenerator(_step.value), !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
          const chunk = _value;
          tmpBuffers.push(chunk);
          tmpTotalSize += chunk.length;

          if (tmpTotalSize > length) {
            const buffers = cuttingBuffer(Buffer.concat(tmpBuffers), {
              deepCopy,
              length
            });
            const isRest = buffers.length % length !== 0;
            const loopTimes = isRest ? buffers.length - 1 : buffers.length;

            for (let i = 0; i < loopTimes; i += 1) {
              yield buffers[i];
            }

            if (isRest) {
              tmpBuffers = [buffers[buffers.length - 1]];
              tmpTotalSize = tmpBuffers.reduce((sum, buf) => sum + buf.length, 0);
            } else {
              tmpBuffers = [];
              tmpTotalSize = 0;
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            yield _awaitAsyncGenerator(_iterator.return());
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (tmpBuffers.length > 0) yield* _asyncGeneratorDelegate(_asyncIterator(tmpBuffers), _awaitAsyncGenerator);
    });
    return _cuttingRStream.apply(this, arguments);
  }

  exports.cutBuffer = cutBuffer;
  exports.cuttingBuffer = cuttingBuffer;
  exports.cuttingRStream = cuttingRStream;

})));
//# sourceMappingURL=index.umd.js.map
