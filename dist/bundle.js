'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('./typer');

var KoelTyper = _require.KoelTyper;
var KoelAny = exports.KoelAny = new KoelTyper('any', ['default']);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _require = require('./typer');

var KoelTyper = _require.KoelTyper;

var _require2 = require('./errors');

var UnallowedTypeError = _require2.UnallowedTypeError;
var KoelEnum = exports.KoelEnum = new KoelTyper('enum', ['default', { type: 'array', key: 'allows' }], {
  constructor: function constructor() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var _options$allows = options.allows;
    var allows = _options$allows === undefined ? [] : _options$allows;

    allows.forEach(function (item) {
      var type = typeof item === 'undefined' ? 'undefined' : _typeof(item);
      if (type === 'string' || type === 'number') {
        return;
      }
      throw new UnallowedTypeError(type);
    });
  }
});
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koel = require('./koel');

Object.keys(_koel).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _koel[key];
    }
  });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arguments = arguments;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
{
  "required": string(),
  "*optional": string(),
  ">link": "collection.key[=collection.display]",
  "number": number(),
  "regex": /someregex/gi,
  "anything": any(),
  "date": date(),
  "object": {
    ...
  },
  "array": [
    string(), // Allow Strings
    number(), // Allow Numbers
    ...
  ],
  "default": string().default('value'),
  "enumeration": enumeration('some', 'value'), // Only 'some' or 'value' will be allowed
  "constant": "value"|0|true,
}
*/

var _require = require('./string');

var KoelString = _require.KoelString;

var _require2 = require('./number');

var KoelNumber = _require2.KoelNumber;

var _require3 = require('./regex');

var KoelRegex = _require3.KoelRegex;

var _require4 = require('./enum');

var KoelEnum = _require4.KoelEnum;

var _require5 = require('./any');

var KoelAny = _require5.KoelAny;


var MAPPERS = {
  string: function string() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(KoelString, [null].concat(args)))();
  },
  number: function number() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return new (Function.prototype.bind.apply(KoelNumber, [null].concat(args)))();
  },
  regex: function regex(expr) {
    if (expr instanceof RegExp) {
      var source = expr.toString().split('/');
      var flags = source[2];
      var regex = source[1];
      return new KoelRegex({ regex: regex, flags: flags });
    }
    if (typeof expr === 'string') {
      var _regex = expr;
      return new KoelRegex({ regex: _regex });
    }
    return new KoelRegex(expr);
  },
  enumeration: function enumeration() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var allows = args.length === 1 && args[0] instanceof Array ? args : [args[0]];
    return new KoelEnum({ allows: allows });
  },
  any: function any() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return new (Function.prototype.bind.apply(KoelAny, [null].concat(args)))();
  },
  object: function object() {
    return arguments.length <= 0 ? undefined : arguments[0];
  },
  array: function array() {}
};

var SPECIAL_MAPPERS = [{
  check: function check(value) {
    return value instanceof RegExp;
  },
  map: function map(value, mappers) {
    return mappers.regex(value);
  }
}, {
  check: function check(value) {
    return Array.isArray(value);
  },
  map: function map(value, mappers) {
    return mappers.array(value);
  }
}, {
  check: function check(value) {
    return value instanceof Date;
  },
  map: function map(value, mappers) {
    return mappers.date(value);
  }
}, {
  check: function check(value) {
    return value instanceof Object;
  },
  map: function map(value, mappers) {
    return mappers.object(value);
  }
}];

var find = function find(array, predicate) {
  if (array === null) {
    throw new TypeError('find called on null or undefined');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }
  var list = Object(array);
  var length = list.length >>> 0;
  var thisArg = _arguments[1];
  var value;

  for (var i = 0; i < length; i++) {
    value = list[i];
    if (predicate.call(thisArg, value, i, list)) {
      return value;
    }
  }
  return undefined;
};

var Koel = exports.Koel = function () {
  function Koel(schema) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Koel);

    this.schema = schema;
    this.mappers = Object.assign({}, MAPPERS, options.mappers);
    this.specialMappers = options.specialMappers || SPECIAL_MAPPERS;
    this._schema = this.parseSchema(schema);
  }

  _createClass(Koel, [{
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this._schema, null, '  ');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return JSON.parse(JSON.stringify(this._schema));
    }
  }, {
    key: 'replaceSpecial',
    value: function replaceSpecial(schema) {
      var _this = this;

      var keys = Object.keys(schema);
      return keys.reduce(function (s, key) {
        var value = schema[key];
        var mapper = find(_this.specialMappers, function (mapper) {
          return mapper.check(value);
        });
        if (mapper) {
          s[key] = mapper.map(value, _this.mappers);
          return s;
        }
        s[key] = value;
        return s;
      }, {});
    }
  }, {
    key: 'parseSchema',
    value: function parseSchema(schema) {
      var _this2 = this;

      var mapperNames = Object.keys(this.mappers);
      var mappers = mapperNames.map(function (name) {
        return _this2.mappers[name];
      });
      var src = typeof schema === 'string' ? schema : JSON.stringify(schema, null, '  ');
      var mapSrc = 'return ' + schema + ';';
      var f = new Function(mapperNames, mapSrc);
      var _schema = f.apply(undefined, _toConsumableArray(mappers));
      return this.replaceSpecial(_schema);
    }
  }]);

  return Koel;
}();

;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('./typer');

var KoelTyper = _require.KoelTyper;
var KoelNumber = exports.KoelNumber = new KoelTyper('number', [{ type: 'number', key: 'default' }, { type: 'number', key: 'min' }, { type: 'number', key: 'max' }, { type: 'boolean', key: 'integer', default: false }, { type: 'number', key: 'percision', min: 0 }]);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('./typer');

var KoelTyper = _require.KoelTyper;
var KoelRegex = exports.KoelRegex = new KoelTyper('regex', ['default', 'regex', { type: 'string', key: 'flags', default: '' }]);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('./typer');

var KoelTyper = _require.KoelTyper;
var KoelString = exports.KoelString = new KoelTyper('string', ['default', { type: 'number', min: 0, key: 'min' }, { type: 'number', min: 0, key: 'max' }]);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./errors');

var TypeError = _require.TypeError;
var RangeError = _require.RangeError;


var DEFAULT_TYPES = [{ key: 'description', type: 'string' }, { key: 'notes', type: 'string' }, { key: 'required', type: 'boolean', default: true }];

var DEFAULT_PREFIXES = {
  '*': { required: false }
};

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

var KoelTyper = exports.KoelTyper = function KoelTyper(type, types) {
  var baseOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var prefixes = Object.assign({}, DEFAULT_PREFIXES, baseOptions.prefixes || {});
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

  var Handler = function () {
    function Handler() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      _classCallCheck(this, Handler);

      if (baseOptions.constructor) {
        baseOptions.constructor.apply(this, arguments);
      }
      this.type = type;
      var defaultProps = defaults.reduce(function (obj, def) {
        obj[def.key] = def.value;
        return obj;
      }, {});
      this.props = Object.assign(defaultProps, props);
      this.prefixes = prefixes;
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
  }();

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