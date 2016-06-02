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

  it('Should be able to use * prefix to set optional', (done)=>{
    const k = new Koel(`{
      '*key': string()
    }`);
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o.key.type).to.be.a.string().and.to.equal('string');
    expect(o.key.required).to.be.a.boolean().and.to.equal(false);
    done();
  });

  it('Should be able to use custom prefixes to set optional', (done)=>{
    const KoelLink = new KoelTyper('link', [
      'default',
      'link'
    ]);
    const mappers = Object.assign({}, Koel.MAPPERS, {
      link(...args){
        return new KoelLink(...args);
      }
    });
    const k = new Koel(`{
      '>key': 'table.name'
    }`, {
      mappers,
      prefixes: {
        '>'(link){
          return new KoelLink({link});
        },
        '*'(value){
          return value.required(false);
        }
      }
    });
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o['>key']).to.be.undefined();
    expect(o.key.type).to.be.a.string().and.to.equal('link');
    expect(o.key.link).to.be.a.string().and.to.equal('table.name');
    expect(o.key.required).to.be.a.boolean().and.to.equal(true);
    done();
  });

  it('Should be able to use multiple prefixes together', (done)=>{
    const KoelLink = new KoelTyper('link', [
      'default',
      'display',
      'link'
    ]);
    const mappers = Object.assign({}, Koel.MAPPERS, {
      link(...args){
        return new KoelLink(...args);
      }
    });
    const k = new Koel(`{
      '>*key': 'table.id=table.name'
    }`, {
      mappers,
      prefixes: {
        '>'(value){
          const [
            link,
            ...other
          ] = value.split('=');
          const display = other.length?other.join('='):link;
          return new KoelLink({link, display});
        },
        '*'(value){
          return value.required(false);
        }
      }
    });
    const o = k.toJSON();
    expect(o.key).to.be.an.object();
    expect(o['>*key']).to.be.undefined();
    expect(o['*key']).to.be.undefined();
    expect(o['>key']).to.be.undefined();
    expect(o.key.type).to.be.a.string().and.to.equal('link');
    expect(o.key.link).to.be.a.string().and.to.equal('table.id');
    expect(o.key.display).to.be.a.string().and.to.equal('table.name');
    expect(o.key.required).to.be.a.boolean().and.to.equal(false);
    done();
  });
});
