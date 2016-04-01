import paramStore from '../../src/param-store';

describe('paramStore', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(paramStore, 'greet');
      paramStore.greet();
    });

    it('should have been run once', () => {
      expect(paramStore.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(paramStore.greet).to.have.always.returned('hello');
    });
  });
});
