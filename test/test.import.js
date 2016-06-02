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
import {Koel} from '../lib/';

describe('Import', ()=>{
  it('Should be able to be imported without a problem', (done)=>{
    expect(Koel).to.be.a.function();
    done();
  });
});
