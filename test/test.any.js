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
  KoelAny
} = require('../lib/any');
const {
  TypeError
} = require('../lib/errors');

describe('Any', ()=>{
  it('Should be able to create an any handler', (done)=>{
    const s = new KoelAny({});
    const o = JSON.parse(JSON.stringify(s));
    expect(s).to.be.an.object();
    expect(s.type).to.be.a.string().and.to.equal('any');
    expect(o).to.be.an.object();
    expect(o.type).to.be.a.string().and.to.equal('any');
    done();
  });
});
