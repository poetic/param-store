import ParamStore from '../../src/index';
import Url from 'domurl';

describe('ParamStore', () => {
  beforeEach(() => {
    ParamStore.set({path: 'test/runner.html', paramA: null, paramB: null});
  });

  afterEach(() => {
    ParamStore.set({path: 'test/runner.html', paramA: null, paramB: null});
  });

  describe('get', () => {
    it('should get all params in url', () => {
      window.history.pushState({}, 'runner', '/test/runner.html?paramA=valueA');
      expect(ParamStore.get()).to.eql({
        path: 'test/runner.html',
        paramA: 'valueA'
      });
    });

    it('should get part of params which user specified', () => {
      window.history.pushState({}, 'runner', '/test/runner.html?paramA=valueA');
      expect(ParamStore.get('paramA')).to.eql({
        paramA: 'valueA'
      });
    });
  });

  describe('set', () => {
    it('should set path', () => {
      ParamStore.set({path: 'new-path'});
      expect(ParamStore.get('path').path).to.eql('new-path');
    });

    it('should set params', () => {
      ParamStore.set({paramA: 'valueA'});
      expect(ParamStore.get('paramA').paramA).to.eql('valueA');
      expect(ParamStore.get('path').path).to.eql('test/runner.html');
    });
  });

  describe('listen', () => {
    it('should notify handler', (done) => {
      const handler = ParamStore.listen('paramA', function(report) {
        expect(report.changedParams).to.eql({paramA: 'valueA'});
        ParamStore.unlisten(handler);
        done();
      });
      ParamStore.set({paramA: 'valueA'});
    });

    it('should notify handler only the change value', (done) => {
      const handler = ParamStore.listen('paramA', function(report) {
        expect(report.changedParams).to.eql({paramA: 'valueA'});
        ParamStore.unlisten(handler);
        done();
      });
      ParamStore.set({paramA: 'valueA', paramB: 'valueB'});
    });

    it('should not notify handler when the param did not change', (done) => {
      const handler = ParamStore.listen('paramA', function(report) {
        throw new Error('this should not be called');
        done();
      });
      ParamStore.set({paramB: 'valueB'});
      setTimeout(function() { done(); }, 50);
    });
  });
});
