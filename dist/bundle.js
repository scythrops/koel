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
var KoelObject = exports.KoelObject = new KoelTyper('object', [{ key: 'items', default: [] }], {
  constructor: function constructor() {
    for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    var options = _typeof(items[0]) === 'object' ? items.shift() : {};
    return Object.assign({}, options, { items: items });
  }
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _require = require('./typer');

var KoelTyper = _require.KoelTyper;
var KoelConstant = exports.KoelConstant = new KoelTyper('constant', [{ key: 'value' }], {
  constructor: function constructor(args) {
    if (args === void 0 || args === null || (typeof args === 'undefined' ? 'undefined' : _typeof(args)) !== 'object') {
      args = { value: args };
    }
    return args;
  }
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('./typer');

var KoelTyper = _require.KoelTyper;
var KoelDate = exports.KoelDate = new KoelTyper('date', ['default', { type: 'date', key: 'min' }, { type: 'date', key: 'max' }]);
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
    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var _props$allows = props.allows;
    var allows = _props$allows === undefined ? [] : _props$allows;

    allows.forEach(function (item) {
      var type = typeof item === 'undefined' ? 'undefined' : _typeof(item);
      if (type === 'string' || type === 'number') {
        return;
      }
      throw new UnallowedTypeError(type);
    });
    return props;
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/*
{
  "required": string(),
  "optional": string().optional(),
  "link": link("collection.key[=collection.display]"),
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

var _require6 = require('./date');

var KoelDate = _require6.KoelDate;

var _require7 = require('./object');

var KoelObject = _require7.KoelObject;

var _require8 = require('./const');

var KoelConstant = _require8.KoelConstant;

var _require9 = require('./array');

var KoelArray = _require9.KoelArray;
var CONSTANT_TYPES = exports.CONSTANT_TYPES = ['string', 'number', 'boolean'];

var DEFAULT_MAPPERS = exports.DEFAULT_MAPPERS = {
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
  date: function date() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return new (Function.prototype.bind.apply(KoelDate, [null].concat(args)))();
  },
  enumeration: function enumeration() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var allows = args.length === 1 && args[0] instanceof Array ? args : [args[0]];
    return new KoelEnum({ allows: allows });
  },
  any: function any() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return new (Function.prototype.bind.apply(KoelAny, [null].concat(args)))();
  },
  constant: function constant() {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return new (Function.prototype.bind.apply(KoelConstant, [null].concat(args)))();
  },
  object: function object(proto) {
    var _ref = proto || {};

    var _ref$keys = _ref.keys;
    var keys = _ref$keys === undefined ? {} : _ref$keys;

    var rest = _objectWithoutProperties(_ref, ['keys']);

    var newKeys = this.replaceSpecial(keys);
    return new KoelObject(_extends({ keys: newKeys }, rest));
  },
  array: function array() {
    for (var _len7 = arguments.length, types = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      types[_key7] = arguments[_key7];
    }

    return new (Function.prototype.bind.apply(KoelArray, [null].concat(types)))();
  }
};

var SPECIAL_MAPPERS = exports.SPECIAL_MAPPERS = [{
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
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return (value === void 0 || CONSTANT_TYPES.indexOf(type) > -1 || value === null) && !(value || {}).type;
  },
  map: function map(value, mappers) {
    return mappers.constant(value);
  }
}, {
  check: function check(value) {
    return value instanceof Object && !value.type;
  },
  map: function map(keys, mappers) {
    return mappers.object.call(this, keys);
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
  var value = void 0;

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
    this.mappers = Object.assign({}, DEFAULT_MAPPERS, options.mappers);
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
        var rawValue = schema[key];
        var mapper = find(_this.specialMappers, function (mapper) {
          return mapper.check(rawValue);
        });
        var value = mapper ? mapper.map.call(_this, rawValue, _this.mappers) : schema[key];
        s[key] = value;
        return s;
      }, {});
    }

    /*
      processPrefixes(schema){
        const keys = Object.keys(schema);
        const prefixes = this.prefixes;
        const response = keys.reduce((s, key)=>{
          let value = schema[key];
          let idx = 0;
          let char = key.charAt(idx);
          let handler;
          while(handler = prefixes[char]){
            value = handler.call(this, value, key, schema);
            idx++;
            char = key.charAt(idx);
          }
          s[key.substr(idx)] = value;
          return s;
        }, {});
        return response;
      }
    */

  }, {
    key: 'parseSchema',
    value: function parseSchema(schema) {
      var _this2 = this;

      var mapperNames = Object.keys(this.mappers);
      var mappers = mapperNames.map(function (name) {
        return _this2.mappers[name].bind(_this2);
      });
      var src = typeof schema === 'string' ? schema : JSON.stringify(schema, null, '  ');
      var mapSrc = 'return ' + schema + ';';
      var f = new Function(mapperNames, mapSrc);
      //const prefixedSchema = f(...mappers);
      //const _schema = this.processPrefixes(prefixedSchema);
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
var KoelObject = exports.KoelObject = new KoelTyper('object', [{ key: 'keys', default: {} }]);
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
