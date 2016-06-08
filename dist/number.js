'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('./typer');

var KoelTyper = _require.KoelTyper;
var KoelNumber = exports.KoelNumber = new KoelTyper('number', [{ type: 'number', key: 'default' }, { type: 'number', key: 'min' }, { type: 'number', key: 'max' }, { type: 'boolean', key: 'integer', default: false }, { type: 'number', key: 'percision', min: 0 }]);
//# sourceMappingURL=number.js.map