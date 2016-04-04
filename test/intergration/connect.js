import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from '../../src/index';
import ParamStore from '../../src/index';

describe('connect', () => {
  beforeEach(() => {
    ParamStore.set({path: 'test/runner.html', paramA: null, paramB: null});
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('test'));
    ParamStore.set({path: 'test/runner.html', paramA: null, paramB: null});
  });

  it('should listen to the change of url params', () => {
    let paramA;

    const ComponentA = React.createClass({
      render: function() {
        paramA = this.props.changedParams.paramA;
        return null;
      }
    });

    const WrappedComponent = connect(ComponentA, 'paramA');

    ReactDOM.render(
      React.createElement(WrappedComponent),
      document.getElementById('test')
    );

    ParamStore.set({paramA: 'valueA'});

    expect(paramA).to.eql('valueA');
  });

  it('should pass through all the props', () => {
    let propA;

    const ComponentA = React.createClass({
      render: function() {
        propA = this.props.propA;
        return null;
      }
    });

    const WrappedComponent = connect(ComponentA, 'paramA');

    ReactDOM.render(
      React.createElement(WrappedComponent, {propA: 'propA'}),
      document.getElementById('test')
    );

    expect(propA).to.eql('propA');
  });
});