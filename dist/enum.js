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
//# sourceMappingURL=enum.js.map