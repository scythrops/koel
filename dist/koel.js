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
  array: function array(proto) {
    var _this = this;

    var _ref2 = proto || {};

    var _ref2$items = _ref2.items;
    var items = _ref2$items === undefined ? [] : _ref2$items;

    var rest = _objectWithoutProperties(_ref2, ['items']);

    var newItems = items.map(function (item) {
      return _this.replaceSpecial(item);
    });
    return new KoelArray(_extends({ items: newItems }, rest));
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
  map: function map(items, mappers) {
    return mappers.array.call(this, { items: items });
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
      var _this2 = this;

      if (typeof schema.type === 'string') {
        return schema;
      }
      var keys = Object.keys(schema);
      return keys.reduce(function (s, key) {
        var rawValue = schema[key];
        var mapper = find(_this2.specialMappers, function (mapper) {
          return mapper.check(rawValue);
        });
        var value = mapper ? mapper.map.call(_this2, rawValue, _this2.mappers) : schema[key];
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
      var _this3 = this;

      var mapperNames = Object.keys(this.mappers);
      var mappers = mapperNames.map(function (name) {
        return _this3.mappers[name].bind(_this3);
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
//# sourceMappingURL=koel.js.map