'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _paramStore = require('./param-store');

var _paramStore2 = _interopRequireDefault(_paramStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// may be have a state and change this to active or not

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
  }

  _createClass(Link, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var type = _props.type;
      var params = _props.params;

      var other = _objectWithoutProperties(_props, ['type', 'params']);

      other.onClick = other.onClick || function (e) {
        e.preventDefault();
        _paramStore2.default.set(params);
      };

      if (type === 'a') {
        other.href = other.href || '#';
      }

      return _react2.default.createElement(type, other);
    }
  }]);

  return Link;
}(_react2.default.Component);

exports.default = Link;


Link.defaultProps = {
  type: 'a'
};