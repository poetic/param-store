import React from 'react';
import ReactDOM from 'react-dom';
import ParamStore, {connect} from '../src/index';

const expect = chai.expect;

describe('connect', function () {
  beforeEach(function () {
    ParamStore.reset();
  });

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(document.getElementById('test'));
    ParamStore.reset();
  });

  it('should listen to the change of url params', function () {
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

  it('should pass through all the props', function () {
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
