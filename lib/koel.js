
/*
{
  "required": string(),
  "optional": string().optional(),
  "link": link("collection.key[=collection.display]"),
  "number": number(),
  "regex": /someregex/gi,
  "anything": any(),
  "date": date(),
  "object": {
    ...
  },
  "array": [
    string(), // Allow Strings
    number(), // Allow Numbers
    ...
  ],
  "default": string().default('value'),
  "enumeration": enumeration('some', 'value'), // Only 'some' or 'value' will be allowed
  "constant": "value"|0|true,
}
*/

const {KoelString} = require('./string');
const {KoelNumber} = require('./number');
const {KoelRegex} = require('./regex');
const {KoelEnum} = require('./enum');
const {KoelAny} = require('./any');
const {KoelDate} = require('./date');
const {KoelObject} = require('./object');
const {KoelConstant} = require('./const');
const {KoelArray} = require('./array');

export const CONSTANT_TYPES = ['string', 'number', 'boolean'];

export const DEFAULT_MAPPERS={
  string(...args){
    return new KoelString(...args);
  },

  number(...args){
    return new KoelNumber(...args);
  },

  regex(expr){
    if(expr instanceof RegExp){
      const source = expr.toString().split('/');
      const flags = source[2];
      const regex = source[1];
      return new KoelRegex({regex, flags});
    }
    if(typeof(expr)==='string'){
      const regex = expr;
      return new KoelRegex({regex});
    }
    return new KoelRegex(expr);
  },

  date(...args){
    return new KoelDate(...args);
  },

  enumeration(...args){
    const allows = args.length === 1 && args[0] instanceof Array?args:[args[0]];
    return new KoelEnum({allows});
  },

  any(...args){
    return new KoelAny(...args);
  },

  constant(...args){
    return new KoelConstant(...args);
  },

  object(proto){
    const {
      keys = {},
      ...rest
    } = proto||{};
    const newKeys = this.replaceSpecial(keys);
    return new KoelObject({keys: newKeys, ...rest});
  },

  array(proto){
    const {
      items = [],
      ...rest
    } = proto || {};
    const newItems = items.map((item)=>this.replaceSpecial(item));
    return new KoelArray({items: newItems, ...rest});
  },
};

export const SPECIAL_MAPPERS = [
  {
    check(value){
      return value instanceof RegExp;
    },
    map(value, mappers){
      return mappers.regex(value);
    }
  },

  {
    check(value){
      return Array.isArray(value);
    },
    map(items, mappers){
      return mappers.array.call(this, {items});
    }
  },

  {
    check(value){
      return value instanceof Date;
    },
    map(value, mappers){
      return mappers.date(value);
    }
  },

  {
    check(value){
      const type = typeof(value);
      return ((value === void 0) || (CONSTANT_TYPES.indexOf(type) > -1) || (value === null)) && (!(value||{}).type);
    },
    map(value, mappers){
      return mappers.constant(value);
    }
  },

  {
    check(value){
      return (value instanceof Object) && (!value.type);
    },
    map(keys, mappers){
      return mappers.object.call(this, keys);
    }
  },

];

const find = (array, predicate)=>{
  if (array === null) {
    throw new TypeError('find called on null or undefined');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }
  let list = Object(array);
  let length = list.length >>> 0;
  let thisArg = arguments[1];
  let value;

  for (let i = 0; i < length; i++) {
    value = list[i];
    if (predicate.call(thisArg, value, i, list)) {
      return value;
    }
  }
  return undefined;
};

export class Koel{
  constructor(schema, options = {}){
    this.schema = schema;
    this.mappers = Object.assign({}, DEFAULT_MAPPERS, options.mappers);
    this.specialMappers = options.specialMappers || SPECIAL_MAPPERS;
    this._schema = this.parseSchema(schema);
  }

  toString(){
    return JSON.stringify(this._schema, null, '  ');
  }

  toJSON(){
    return JSON.parse(JSON.stringify(this._schema));
  }

  replaceSpecial(schema){
    if(typeof(schema.type)==='string'){
      return schema;
    }
    const keys = Object.keys(schema);
    return keys.reduce((s, key)=>{
      const rawValue = schema[key];
      const mapper = find(this.specialMappers, (mapper)=>{
        return mapper.check(rawValue);
      });
      let value = mapper?mapper.map.call(this, rawValue, this.mappers):schema[key];
      s[key] = value;
      return s;
    }, {});
  }

/*
  processPrefixes(schema){
    const keys = Object.keys(schema);
    const prefixes = this.prefixes;
    const response = keys.reduce((s, key)=>{
      let value = schema[key];
      let idx = 0;
      let char = key.charAt(idx);
      let handler;
      while(handler = prefixes[char]){
        value = handler.call(this, value, key, schema);
        idx++;
        char = key.charAt(idx);
      }
      s[key.substr(idx)] = value;
      return s;
    }, {});
    return response;
  }
*/

  parseSchema(schema){
    const mapperNames = Object.keys(this.mappers);
    const mappers = mapperNames.map((name)=>this.mappers[name].bind(this));
    const src = typeof(schema)==='string'?schema:JSON.stringify(schema, null, '  ');
    const mapSrc = `return ${schema};`;
    const f = new Function(mapperNames, mapSrc);
    //const prefixedSchema = f(...mappers);
    //const _schema = this.processPrefixes(prefixedSchema);
    const _schema = f(...mappers);
    return this.replaceSpecial(_schema);
  }
};
