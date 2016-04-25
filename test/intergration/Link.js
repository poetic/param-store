import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from '../../src/index';
import ParamStore from '../../src/index';

describe('Link', () => {
  beforeEach(() => {
    ParamStore.set({path: 'test/runner.html'});
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('test'));
    ParamStore.set({path: 'test/runner.html'});
  });

  it('should change the url when clicked', function () {
    ReactDOM.render(
      React.createElement(
        Link,
        {
          id: 'new-path',
          params: {path: 'new-path'}
        }
      ),
      document.getElementById('test')
    );

    document.getElementById('new-path').click()

    expect(ParamStore.get('path').path).to.eql('new-path')
  });
});
