const {KoelTyper} = require('./typer');

export const KoelObject = new KoelTyper('object', [
  {key: 'items', default: []},
], {
  constructor(...items){
    const options = (typeof(items[0])==='object')?items.shift():{};
    return Object.assign({}, options, {items});
  }
});
