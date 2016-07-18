import ParamStore from '../src/index';

describe('ParamStore', function () {
  beforeEach(function () {
    ParamStore.setAll();
  });

  afterEach(function () {
    ParamStore.setAll();
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

  describe('setAll', function () {
    it('should remove all params', function () {
      ParamStore.set({path: 'new-path', paramB: 'valueB'});
      expect(ParamStore.get('paramB')).to.eql('valueB');
      ParamStore.setAll();
      expect(ParamStore.get('paramB')).to.be.undefined;
    });
  })

  describe('listen', function () {
    it('should notify handler', (done) => {
      const handler = ParamStore.listen('paramA', function(report) {
        ParamStore.unlisten(handler);
        expect(report.changedParams).to.eql({paramA: 'valueA'});
        done();
      });
      ParamStore.set({paramA: 'valueA'});
    });

    it('should notify handler if user do not specify arguments', (done) => {
      const handler = ParamStore.listen(function(report) {
        ParamStore.unlisten(handler);
        expect(report.changedParams).to.eql({});
        done();
      });
      ParamStore.set({paramA: 'valueA', paramB: 'valueB'});
    });

    it('should notify handler only the change value', (done) => {
      const handler = ParamStore.listen('paramA', function(report) {
        ParamStore.unlisten(handler);
        expect(report.changedParams).to.eql({paramA: 'valueA'});
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
        ParamStore.unlisten(handler);
        done();
      }, 50);
    });
  });
});
