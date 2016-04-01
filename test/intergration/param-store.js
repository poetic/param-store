import ParamStore from '../../src/index';
import Url from 'domurl';

describe('ParamStore', () => {
  beforeEach(() => {
    window.history.pushState({}, 'runner', '/test/runner.html');
  });

  afterEach(() => {
    window.history.pushState({}, 'runner', '/test/runner.html');
  });

  describe('get', () => {
    it('should get all params in url', () => {
      window.history.pushState({}, 'runner', 'runner.html?param1=value1');
      expect(ParamStore.get()).to.eql({
        path: 'test/runner.html',
        param1: 'value1'
      });
    });

    it('should get part of params which user specified', () => {
      window.history.pushState({}, 'runner', 'runner.html?param1=value1');
      expect(ParamStore.get('param1')).to.eql({
        param1: 'value1'
      });
    });
  });

  describe('set', () => {
    it('should set path', () => {
      ParamStore.set({path: 'new-path'});
      expect(ParamStore.get('path').path).to.eql('new-path');
    });

    it('should set params', () => {
      ParamStore.set({param1: 'value1'});
      expect(ParamStore.get('param1').param1).to.eql('value1');
      expect(ParamStore.get('path').path).to.eql('test/runner.html');
    });
  });

  describe('listen', () => {
    it('should notify handler', (done) => {
      const handler = ParamStore.listen('param1', function(report) {
        expect(report.changedParams).to.eql({param1: 'value1'});
        ParamStore.unlisten(handler);
        done();
      });
      ParamStore.set({param1: 'value1'});
    });

    it('should notify handler only the change value', (done) => {
      const handler = ParamStore.listen('param1', function(report) {
        expect(report.changedParams).to.eql({param1: 'value1'});
        ParamStore.unlisten(handler);
        done();
      });
      ParamStore.set({param1: 'value1', param2: 'value2'});
    });

    it('should not notify handler when the param did not change', (done) => {
      const handler = ParamStore.listen('param1', function(report) {
        throw new Error('this should not be called');
        done();
      });
      ParamStore.set({param2: 'value2'});
      setTimeout(function() { done(); }, 50);
    });
  });
});
