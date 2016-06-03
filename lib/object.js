const {KoelTyper} = require('./typer');

export const KoelObject = new KoelTyper('object', [
  {key: 'keys', default: {}},
]);
