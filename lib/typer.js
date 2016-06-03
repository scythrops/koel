const {
  TypeError,
  RangeError,
} = require('./errors');

const DEFAULT_TYPES = [
  {key: 'description', type: 'string'},
  {key: 'notes', type: 'string'},
  {key: 'required', type: 'boolean', default: true},
];

/*
const DEFAULT_PREFIXES = {
  '*': {required: false},
};
*/

const toFullType = (typeInfo)=>{
  if(typeof(typeInfo) === 'string'){
    return {
      type: 'string',
      key: typeInfo
    };
  }
  return typeInfo;
};

const uniqueTypes = (typeInfo, index, arr)=>{
  const idx = arr.findIndex((elem)=>elem.key===typeInfo.key);
  return idx === index;
};

export class KoelType{
  optional(isOptional = true){
    return this.required(!isOptional);
  }
};

export const KoelTyper = (type, types, baseOptions = {})=>{
  //const prefixes = Object.assign({}, DEFAULT_PREFIXES, baseOptions.prefixes || {});
  const objTypes = [].concat(types.map(toFullType), baseOptions.defaultTypes || [], DEFAULT_TYPES).filter(uniqueTypes);
  const defaults = objTypes.filter((info)=>info.default !== void 0).map((info)=>{
    const {
      key,
      'default': value
    } = info;
    return {
      key,
      value
    };
  });

  class Handler extends KoelType{
    constructor(props = {}, options={}){
      super(props, options);
      if(baseOptions.constructor){
        props = baseOptions.constructor.apply(this, arguments);
      }
      this.type = type;
      const defaultProps = defaults.reduce((obj, def)=>{
        obj[def.key] = def.value;
        return obj;
      }, {});
      this.props = Object.assign(defaultProps, props);
      //this.prefixes = prefixes;
    }

    toJSON(){
      return Object.assign({}, this.props, {type: this.type});
    }

    toString(){
      return JSON.stringify(Object.assign({}, this.props, {type: this.type}), null, '  ');
    }
  };

  objTypes.forEach((info)=>{
    const {
      type = 'string',
      key,
      min = false,
      max = false,
    } = info;

    return Handler.prototype[key] = function(value){
      const valueType = typeof(value);
      if(valueType !== info.type){
        throw new TypeError(type, valueType);
      }
      if(min !== false && value < min){
        throw new RangeError('less than allowed minimum', value, min);
      }
      if(max !== false && value > max){
        throw new RangeError('greater than allowed maximum', value, max);
      }
      return new Handler(Object.assign({}, this.props, {[key]: value}));
    };
  });

  return Handler;
};
