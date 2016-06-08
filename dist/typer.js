'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./errors');

var TypeError = _require.TypeError;
var RangeError = _require.RangeError;


var DEFAULT_TYPES = [{ key: 'description', type: 'string' }, { key: 'notes', type: 'string' }, { key: 'required', type: 'boolean', default: true }];

/*
const DEFAULT_PREFIXES = {
  '*': {required: false},
};
*/

var toFullType = function toFullType(typeInfo) {
  if (typeof typeInfo === 'string') {
    return {
      type: 'string',
      key: typeInfo
    };
  }
  return typeInfo;
};

var uniqueTypes = function uniqueTypes(typeInfo, index, arr) {
  var idx = arr.findIndex(function (elem) {
    return elem.key === typeInfo.key;
  });
  return idx === index;
};

var KoelType = exports.KoelType = function () {
  function KoelType() {
    _classCallCheck(this, KoelType);
  }

  _createClass(KoelType, [{
    key: 'optional',
    value: function optional() {
      var isOptional = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      return this.required(!isOptional);
    }
  }]);

  return KoelType;
}();

;

var KoelTyper = exports.KoelTyper = function KoelTyper(type, types) {
  var baseOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  //const prefixes = Object.assign({}, DEFAULT_PREFIXES, baseOptions.prefixes || {});
  var objTypes = [].concat(types.map(toFullType), baseOptions.defaultTypes || [], DEFAULT_TYPES).filter(uniqueTypes);
  var defaults = objTypes.filter(function (info) {
    return info.default !== void 0;
  }).map(function (info) {
    var key = info.key;
    var value = info['default'];

    return {
      key: key,
      value: value
    };
  });

  var Handler = function (_KoelType) {
    _inherits(Handler, _KoelType);

    function Handler() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      _classCallCheck(this, Handler);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Handler).call(this, props, options));

      if (baseOptions.constructor) {
        props = baseOptions.constructor.apply(_this, arguments);
      }
      _this.type = type;
      var defaultProps = defaults.reduce(function (obj, def) {
        obj[def.key] = def.value;
        return obj;
      }, {});
      _this.props = Object.assign(defaultProps, props);
      //this.prefixes = prefixes;
      return _this;
    }

    _createClass(Handler, [{
      key: 'toJSON',
      value: function toJSON() {
        return Object.assign({}, this.props, { type: this.type });
      }
    }, {
      key: 'toString',
      value: function toString() {
        return JSON.stringify(Object.assign({}, this.props, { type: this.type }), null, '  ');
      }
    }]);

    return Handler;
  }(KoelType);

  ;

  objTypes.forEach(function (info) {
    var _info$type = info.type;
    var type = _info$type === undefined ? 'string' : _info$type;
    var key = info.key;
    var _info$min = info.min;
    var min = _info$min === undefined ? false : _info$min;
    var _info$max = info.max;
    var max = _info$max === undefined ? false : _info$max;


    return Handler.prototype[key] = function (value) {
      var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
      if (valueType !== info.type) {
        throw new TypeError(type, valueType);
      }
      if (min !== false && value < min) {
        throw new RangeError('less than allowed minimum', value, min);
      }
      if (max !== false && value > max) {
        throw new RangeError('greater than allowed maximum', value, max);
      }
      return new Handler(Object.assign({}, this.props, _defineProperty({}, key, value)));
    };
  });

  return Handler;
};
//# sourceMappingURL=typer.js.map