const {
  KoelTyper
} = require('./typer');

export const KoelNumber = new KoelTyper('number', [
  {type: 'number', key: 'default'},
  {type: 'number', key: 'min'},
  {type: 'number', key: 'max'},
  {type: 'boolean', key: 'integer', default: false},
  {type: 'number', key: 'percision', min: 0}
]);
