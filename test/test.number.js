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
  KoelNumber
} = require('../lib/number');
const {
  TypeError
} = require('../lib/errors');

describe('Number', ()=>{
  it('Should be able to create a number representation', (done)=>{
    const s = new KoelNumber();
    const o = JSON.parse(JSON.stringify(s));
    expect(s).to.be.an.object();
    expect(s.type).to.be.a.string().and.to.equal('number');
    expect(o).to.be.an.object();
    expect(o.type).to.be.a.string().and.to.equal('number');
    done();
  });

  it('Should be able to set a default value', (done)=>{
    const s = new KoelNumber().default(123);
    const o = JSON.parse(JSON.stringify(s));
    expect(o.default).to.be.a.number().and.to.equal(123);
    done();
  });

  it('Should throw an error is default is not a number', (done)=>{
    try{
      new KoelNumber().default('foo');
    }catch(e){
      done();
    }
  });

  it('Should be able to set a minimum size', (done)=>{
    const s = new KoelNumber().min(1);
    const o = JSON.parse(JSON.stringify(s));
    expect(o.min).to.be.a.number().and.to.equal(1);
    done();
  });

  it('Should be able to set a maximum size', (done)=>{
    const s = new KoelNumber().max(10);
    const o = JSON.parse(JSON.stringify(s));
    expect(o.max).to.be.a.number().and.to.equal(10);
    done();
  });
});
