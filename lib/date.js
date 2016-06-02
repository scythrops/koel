const {KoelTyper} = require('./typer');

export const KoelDate = new KoelTyper('date', [
  'default',
  {type: 'date', key: 'min'},
  {type: 'date', key: 'max'},
]);
