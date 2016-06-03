const {KoelTyper} = require('./typer');

export const KoelConstant = new KoelTyper('constant', [
  {key: 'value'},
], {
  constructor(args){
    if((args === void 0)||(args === null)||(typeof(args)!=='object')){
      args = {value: args};
    }
    return args;
  }
});
