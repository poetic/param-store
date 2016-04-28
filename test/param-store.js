import ParamStore from '../src/index';
import Url from 'domurl';

describe('ParamStore', function () {
  beforeEach(function () {
    ParamStore.reset();
  });

  afterEach(function () {
    ParamStore.reset();
  });

  describe('get', function () {
    it('should get part of params which user specified', function () {
      window.history.pushState({}, 'runner', '/?paramA=valueA');
      expect(ParamStore.get('paramA')).to.eql('valueA');
    });
  });

  describe('getAll', function () {
    it('should get all params in url', function () {
      window.history.pushState({}, 'runner', '/?paramA=valueA');
      expect(ParamStore.getAll()).to.eql({
        path: '',
        paramA: 'valueA'
      });
    });
  });

  describe('pick', function () {
    it('should pick specific params', function () {
      window.history.pushState({}, 'runner', '/?paramA=valueA');
      expect(ParamStore.pick(['paramA'])).to.eql({ paramA: 'valueA' });
    });
  });

  describe('set', function () {
    it('should set path', function () {
      ParamStore.set({path: 'new-path'});
      expect(ParamStore.get('path')).to.eql('new-path');
    });

    it('should set params', function () {
      ParamStore.set({paramA: 'valueA'});
      expect(ParamStore.get('paramA')).to.eql('valueA');
      expect(ParamStore.get('path')).to.eql('');
    });
  });

  describe('reset', function () {
    it('should remove all params', function () {
      ParamStore.set({path: 'new-path', paramB: 'valueB'});
      expect(ParamStore.get('paramB')).to.eql('valueB');
      ParamStore.reset();
      expect(ParamStore.get('paramB')).to.be.undefined;
    });
  })

  describe('listen', function () {
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
});
