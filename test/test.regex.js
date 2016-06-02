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
  KoelRegex
} = require('../lib/regex');
const {
  TypeError
} = require('../lib/errors');

describe('Regex', ()=>{
  it('Should be able to create a regex representation', (done)=>{
    const s = new KoelRegex({regex: 'foo'});
    const o = JSON.parse(JSON.stringify(s));
    expect(s).to.be.an.object();
    expect(s.type).to.be.a.string().and.to.equal('regex');
    expect(o).to.be.an.object();
    expect(o.type).to.be.a.string().and.to.equal('regex');
    done();
  });

  it('Should keep the regular expression', (done)=>{
    const s = new KoelRegex({regex: 'foo'});
    const o = JSON.parse(JSON.stringify(s));
    expect(o.regex).to.be.a.string().and.to.equal('foo');
    done();
  });

  it('Should keep the flags', (done)=>{
    const s = new KoelRegex({regex: 'foo', flags: 'gi'});
    const o = JSON.parse(JSON.stringify(s));
    expect(o.flags).to.be.a.string().and.to.equal('gi');
    done();
  });
});
