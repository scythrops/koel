const {KoelTyper} = require('./typer');

export const KoelRegex = new KoelTyper('regex', [
  'default',
  'regex',
  {type: 'string', key: 'flags', default: ''}
]);
