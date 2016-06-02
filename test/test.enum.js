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
  KoelEnum
} = require('../lib/enum');
const {
  TypeError
} = require('../lib/errors');

describe('Enum', ()=>{
  it('Should be able to create an enumeration', (done)=>{
    const s = new KoelEnum({});
    const o = JSON.parse(JSON.stringify(s));
    expect(s).to.be.an.object();
    expect(s.type).to.be.a.string().and.to.equal('enum');
    expect(o).to.be.an.object();
    expect(o.type).to.be.a.string().and.to.equal('enum');
    done();
  });

  it('Should set the allows member', (done)=>{
    const s = new KoelEnum({allows: ['test', 'foo']});
    const o = JSON.parse(JSON.stringify(s));
    expect(o).to.be.an.object();
    expect(o.type).to.be.a.string().and.to.equal('enum');
    expect(o).to.be.an.object();
    expect(o.allows).to.be.an.array().and.to.include('test', 'foo').and.to.have.length(2);
    done();
  });

  it('Should throw an error for allows types that are not String or Number', (done)=>{
    try{
      new KoelEnum({allows: [{do: 'it'}]});
    }catch(e){
      done();
    }
  });
});
