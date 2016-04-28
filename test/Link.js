import React from 'react';
import ReactDOM from 'react-dom';
import ParamStore, {Link} from '../src/index';

const expect = chai.expect;

describe('Link', () => {
  beforeEach(() => {
    ParamStore.reset();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('test'));
    ParamStore.reset();
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

    expect(ParamStore.get('path')).to.eql('new-path')
  });
});
