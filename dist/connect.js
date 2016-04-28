'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _paramStore = require('./param-store');

var _paramStore2 = _interopRequireDefault(_paramStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connect(Component) {
  for (var _len = arguments.length, paramNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    paramNames[_key - 1] = arguments[_key];
  }

  var WrappedComponent = _react2.default.createClass({
    displayName: 'WrappedComponent',

    getInitialState: function getInitialState() {
      return {
        changedParams: _paramStore2.default.pick.apply(_paramStore2.default, paramNames),
        currentParams: _paramStore2.default.getAll(),
        previousParams: {}
      };
    },

    componentWillMount: function componentWillMount() {
      var _this = this;

      this.listener = _paramStore2.default.listen.apply(_paramStore2.default, paramNames.concat([function (report) {
        _this.setState(report);
      }]));
    },

    componentWillUnmount: function componentWillUnmount() {
      _paramStore2.default.unlisten(this.listener);
    },

    render: function render() {
      var props = Object.assign({}, this.props, this.state);
      return _react2.default.createElement(Component, props);
    }
  });
  return WrappedComponent;
}

exports.default = connect;