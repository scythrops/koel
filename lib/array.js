const {KoelTyper} = require('./typer');

export const KoelArray = new KoelTyper('array', [
  {key: 'items', default: []},
], {
  constructor(...args){
    const options = (typeof(args[0])==='object')?args.shift():{};
    const items = options.items || args.shift();
    return Object.assign({}, options, {items});
  }
});
