import ParamStore from '../src/index';
import Url from 'domurl';

describe('ParamStore', () => {
  beforeEach(() => {
    ParamStore.reset();
  });

  afterEach(() => {
    ParamStore.reset();
  });

  describe('get', () => {
    it('should get all params in url', () => {
      window.history.pushState({}, 'runner', '/?paramA=valueA');
      expect(ParamStore.get()).to.eql({
        path: '',
        paramA: 'valueA'
      });
    });

    it('should get part of params which user specified', () => {
      window.history.pushState({}, 'runner', '/?paramA=valueA');
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
      expect(ParamStore.get('path').path).to.eql('');
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
      });
      ParamStore.set({paramB: 'valueB'});
      setTimeout(function() {
        done();
        ParamStore.unlisten(handler);
      }, 50);
    });
  });

  describe('reset', () => {
    it('should remove all params', () => {
      ParamStore.set({path: 'new-path', paramB: 'valueB'});
      expect(ParamStore.get('paramB').paramB).to.eql('valueB');
      ParamStore.reset();
      expect(ParamStore.get('paramB').paramB).to.be.undefined;
    });
  })
});
