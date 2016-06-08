'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeError = exports.TypeError = function (_Error) {
  _inherits(TypeError, _Error);

  function TypeError(expected, got) {
    _classCallCheck(this, TypeError);

    var message = 'Expected ' + expected + ' but got ' + got;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TypeError).call(this, message));

    _this.message = message;
    _this.name = 'TypeError';
    _this.expected = expected;
    _this.got = got;
    return _this;
  }

  return TypeError;
}(Error);

;

var RangeError = exports.RangeError = function (_Error2) {
  _inherits(RangeError, _Error2);

  function RangeError(msg, value, limit) {
    _classCallCheck(this, RangeError);

    var message = 'Value ' + value + ' ' + msg + ' of ' + limit;

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(RangeError).call(this, message));

    _this2.message = message;
    _this2.name = 'RangeError';
    _this2.value = value;
    _this2.limit = limit;
    return _this2;
  }

  return RangeError;
}(Error);

;

var UnallowedTypeError = exports.UnallowedTypeError = function (_Error3) {
  _inherits(UnallowedTypeError, _Error3);

  function UnallowedTypeError(typeName) {
    _classCallCheck(this, UnallowedTypeError);

    var message = 'Type ' + typeName + ' is not allowed';

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(UnallowedTypeError).call(this, message));

    _this3.message = message;
    _this3.name = UnallowedTypeError;
    _this3.typeName = typeName;
    return _this3;
  }

  return UnallowedTypeError;
}(Error);

;
//# sourceMappingURL=errors.js.map