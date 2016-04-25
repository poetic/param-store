import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from '../../src/index';
import ParamStore from '../../src/index';

describe('Link', () => {
  beforeEach(() => {
    ParamStore.set({path: 'test/runner.html', paramA: null, paramB: null});
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('test'));
    ParamStore.set({path: 'test/runner.html', paramA: null, paramB: null});
  });

  it('should change the url when clicked', () => {
    const LinkA = React.createClass({
      render: function() {
        return ;
      }
    });

    ReactDOM.render(
      React.createElement(LinkA),
      document.getElementById('test')
    );

    expect(paramA).to.eql('valueA');
  });
});
