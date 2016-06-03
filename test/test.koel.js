const Code = require('code');
const {
  expect,
} = Code;
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const {
  describe,
  it,
  before,
  after,
} = lab;
const {
  Koel,
} = require('../lib/koel');
const {
  KoelTyper,
} = require('../lib/typer');

describe('Koel', ()=>{
  it('Should be able to convert a basic schema', (done)=>{
    const k = new Koel(`{
      key: string()
    }`);
    done();
  });

  it('Should be able to set a default value functionally', (done)=>{
    const k = new Koel(`{
      key: string().default('test')
    }`);
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o.key.default).to.be.a.string().and.to.equal('test');
    done();
  });

  it('Should be able to set a default value via options', (done)=>{
    const k = new Koel(`{
      key: string({default: 'test'})
    }`);
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o.key.default).to.be.a.string().and.to.equal('test');
    done();
  });

  it('Should be able to convert a regular expression functionally', (done)=>{
    const k = new Koel(`{
      key: regex(/foo/gi)
    }`);
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o.key.regex).to.be.a.string().and.to.equal('foo');
    expect(o.key.flags).to.be.a.string().and.to.equal('gi');
    done();
  });

  it('Should be able to convert a constructed regular expression functionally', (done)=>{
    const k = new Koel(`{
      key: regex(new RegExp('foo', 'gi'))
    }`);
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o.key.regex).to.be.a.string().and.to.equal('foo');
    expect(o.key.flags).to.be.a.string().and.to.equal('gi');
    done();
  });

  it('Should be able to convert a string regular expression functionally', (done)=>{
    const k = new Koel(`{
      key: regex('foo')
    }`);
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o.key.regex).to.be.a.string().and.to.equal('foo');
    expect(o.key.flags).to.be.a.string().and.to.equal('');
    done();
  });

  it('Should be able to convert an object regular expression functionally', (done)=>{
    const k = new Koel(`{
      key: regex({regex: 'foo', flags: 'gi'})
    }`);
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o.key.regex).to.be.a.string().and.to.equal('foo');
    expect(o.key.flags).to.be.a.string().and.to.equal('gi');
    done();
  });

  it('Should be able to convert an object regular expression inline', (done)=>{
    const k = new Koel(`{
      key: /foo/gi
    }`);
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o.key.regex).to.be.a.string().and.to.equal('foo');
    expect(o.key.flags).to.be.a.string().and.to.equal('gi');
    done();
  });

  it('Should wrap objects up properly', (done)=>{
    const k = new Koel(`{
        obj: object()
      }`);
    const o = k.toJSON();
    expect(o.obj).to.be.an.object();
    expect(o.obj.type).to.be.a.string().and.to.equal('object');
    done();
  });

  it('Should wrap object literals up properly', (done)=>{
    const k = new Koel(`{
        obj: {
          keys: {
            str: string(),
            num: number()
          }
        }
      }`);
    const o = k.toJSON();
    expect(o.obj).to.be.an.object();
    expect(o.obj.type).to.be.a.string().and.to.equal('object');
    expect(o.obj.keys).to.be.an.object();
    expect(o.obj.keys.str.type).to.be.a.string().and.to.equal('string');
    expect(o.obj.keys.num.type).to.be.a.string().and.to.equal('number');
    done();
  });

  it('Should inline constants', (done)=>{
    const k = new Koel(`{
        str: 'String',
        bTrue: true,
        bFalse: false,
        num: 123,
        nl: null,
        ud: undefined
      }`);
    const o = k.toJSON();
    expect(o).to.be.an.object();
    expect(o.str).to.be.an.object();
    expect(o.str.type).to.be.a.string().and.to.equal('constant');
    expect(o.str.value).to.be.a.string().and.to.equal('String');
    expect(o.bTrue.type).to.be.a.string().and.to.equal('constant');
    expect(o.bTrue.value).to.be.a.boolean().and.to.equal(true);
    expect(o.bFalse.type).to.be.a.string().and.to.equal('constant');
    expect(o.bFalse.value).to.be.a.boolean().and.to.equal(false);
    expect(o.num.type).to.be.a.string().and.to.equal('constant');
    expect(o.num.value).to.be.a.number().and.to.equal(123);
    expect(o.nl.type).to.be.a.string().and.to.equal('constant');
    expect(o.nl.value).to.be.null();
    expect(o.ud.type).to.be.a.string().and.to.equal('constant');
    expect(o.ud.value).to.be.undefined();
    done();
  });

  it('Should pass the full test', (done)=>{
    const xpct = {
        "o": {
          "keys": {
            "str": {
              "required": true,
              "value": "string",
              "type": "constant"
            },
            "o2": {
              "keys": {
                "num": {
                  "required": true,
                  "value": 123,
                  "type": "constant"
                }
              },
              "required": true,
              "type": "object"
            }
          },
          "required": false,
          "type": "object"
        }
      };
    const k = new Koel(`{
        o: object({
          keys: {
            str: 'string',
            o2: {
              keys: {
                num: 123,
              }
            }
          }
        }).optional()
      }`);
    const o = k.toJSON();
    expect(o).to.equal(xpct);
    done();
  });
});
