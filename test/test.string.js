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
  KoelString
} = require('../lib/string');
const {
  TypeError
} = require('../lib/errors');

describe('String', ()=>{
  it('Should be able to create a string representation', (done)=>{
    const s = new KoelString();
    const o = JSON.parse(JSON.stringify(s));
    expect(s).to.be.an.object();
    expect(s.type).to.be.a.string().and.to.equal('string');
    expect(o).to.be.an.object();
    expect(o.type).to.be.a.string().and.to.equal('string');
    done();
  });

  it('Should be able to set a default value', (done)=>{
    const s = new KoelString().default('foo');
    const o = JSON.parse(JSON.stringify(s));
    expect(o.default).to.be.a.string().and.to.equal('foo');
    done();
  });

  it('Should be able to set a minimum length', (done)=>{
    const s = new KoelString().min(1);
    const o = JSON.parse(JSON.stringify(s));
    expect(o.min).to.be.a.number().and.to.equal(1);
    done();
  });

  it('Should throw an error if min is not a number', (done)=>{
    try{
      const s = new KoelString().min('foo');
    }catch(e){
      done();
    }
  });

  it('Should throw an error if max is not a number', (done)=>{
    try{
      const s = new KoelString().min('foo');
    }catch(e){
      done();
    }
  });

  it('Should throw an error if min is less than 0', (done)=>{
    try{
      const s = new KoelString().min(-1);
    }catch(e){
      done();
    }
  });

  it('Should throw an error if max is less than 0', (done)=>{
    try{
      const s = new KoelString().max(-1);
    }catch(e){
      done();
    }
  });
});
