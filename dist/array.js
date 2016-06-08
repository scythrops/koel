'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _require = require('./typer');

var KoelTyper = _require.KoelTyper;
var KoelArray = exports.KoelArray = new KoelTyper('array', [{ key: 'items', default: [] }], {
  constructor: function constructor() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var options = _typeof(args[0]) === 'object' ? args.shift() : {};
    var items = options.items || args.shift();
    return Object.assign({}, options, { items: items });
  }
});
//# sourceMappingURL=array.js.map