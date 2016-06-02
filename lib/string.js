const {KoelTyper} = require('./typer');

export const KoelString = new KoelTyper('string', [
  'default',
  {type: 'number', min: 0, key: 'min'},
  {type: 'number', min: 0, key: 'max'},
]);
