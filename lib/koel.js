
/*
{
  "required": string(),
  "*optional": string(),
  ">link": "collection.key[=collection.display]",
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

export const MAPPERS={
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
/*
  object(proto){
    if(proto.type==='object'){
      return proto;
    }
    const keys = this.parseSchema(proto);
    return {
      type: 'object',
      keys
    };
  },
  array(...types){
    return types.map((type)=>this.parseSchema(type));
  },
*/
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
    map(value, mappers){
      return mappers.array(value);
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
/*
  {
    check(value){
      return (value instanceof Object) && (value.type !== 'object');
    },
    map(value, mappers){
      return mappers.object(value);
    }
  },
*/
];

export const DEFAULT_PREFIXES = {
  '*'(value){
    return value.required(false);
  }
};

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
    this.mappers = Object.assign({}, MAPPERS, options.mappers);
    this.specialMappers = options.specialMappers || SPECIAL_MAPPERS;
    this.prefixes = options.prefixes || DEFAULT_PREFIXES;
    this._schema = this.parseSchema(schema);
  }

  toString(){
    return JSON.stringify(this._schema, null, '  ');
  }

  toJSON(){
    return JSON.parse(JSON.stringify(this._schema));
  }

  replaceSpecial(schema){
    const keys = Object.keys(schema);
    return keys.reduce((s, key)=>{
      const prefixes = this.prefixes;
      const rawValue = schema[key];
      const mapper = find(this.specialMappers, (mapper)=>{
        return mapper.check(rawValue);
      });
      let value = mapper?mapper.map(this, rawValue, this.mappers):schema[key];
      let idx = 0;
      let char = key.charAt(idx);
      let handler;
      while(handler = prefixes[char]){
        value = handler(this, value, rawValue, key, schema);
        idx++;
        char = key.charAt(idx);
      }
      s[key.substr(idx)] = value;
      return s;
    }, {});
  }

  parseSchema(schema){
    const mapperNames = Object.keys(this.mappers);
    const mappers = mapperNames.map((name)=>this.mappers[name].bind(this));
    const src = typeof(schema)==='string'?schema:JSON.stringify(schema, null, '  ');
    const mapSrc = `return ${schema};`;
    const f = new Function(mapperNames, mapSrc);
    const _schema = f(...mappers);
    return this.replaceSpecial(_schema);
  }
};
