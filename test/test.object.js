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
  KoelObject,
} = require('../lib/object');

describe('Object', ()=>{
  it('Should be able to create an object wrapper', (done)=>{
    const s = new KoelObject({});
    const o = JSON.parse(JSON.stringify(s));
    expect(s).to.be.an.object();
    expect(s.type).to.be.a.string().and.to.equal('object');
    expect(o).to.be.an.object();
    expect(o.type).to.be.a.string().and.to.equal('object');
    done();
  });

  it('Should wrap an object up properly', (done)=>{
    const s = new KoelObject({keys: {str: {type: 'string', default: 'foo'}}});
    const o = JSON.parse(JSON.stringify(s));
    expect(o).to.be.an.object();
    expect(o.type).to.be.a.string().and.to.equal('object');
    expect(o.keys.str).to.be.an.object();
    expect(o.keys.str.type).to.be.a.string().and.to.equal('string');
    done();
  });
});
