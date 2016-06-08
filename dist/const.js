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
//# sourceMappingURL=const.js.map