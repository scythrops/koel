const {KoelTyper} = require('./typer');
const {UnallowedTypeError} = require('./errors');

export const KoelEnum = new KoelTyper('enum', [
  'default',
  {type: 'array', key: 'allows'}
], {
  constructor(props = {}){
    const {
      allows = []
    } = props;
    allows.forEach((item)=>{
      const type = typeof(item);
      if(type === 'string' || type === 'number'){
        return;
      }
      throw new UnallowedTypeError(type);
    });
    return props;
  }
});
