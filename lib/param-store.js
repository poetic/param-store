'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _history = require('history');

var _domurl = require('domurl');

var _domurl2 = _interopRequireDefault(_domurl);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _history.createHistory)();

var ParamStore = {
  previousParams: {},

  get: function get() {
    var params = this._getParams();

    for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
      names[_key] = arguments[_key];
    }

    if (names.length === 0) {
      return params;
    } else {
      return _lodash2.default.pick(params, names);
    }
  },
  set: function set(params) {
    var currentParams = this._getParams();
    var nextParams = _lodash2.default.clone(params);

    // do not push if there is no change on params
    var paramsIsSame = _lodash2.default.every({ nextParams: nextParams }, function (value, name) {
      return _lodash2.default.isEqual(value, currentParams[name]);
    });

    if (!paramsIsSame) {
      history.push(this._getNextLocation(nextParams));
    }
  },
  listen: function listen() {
    var args = Array.prototype.slice.call(arguments);
    var callback = args.pop();
    var handler = { names: args, callback: callback };
    this._handlers.push(handler);
    return handler;
  },
  unlisten: function unlisten(handler) {
    var index = _lodash2.default.findIndex(this._handlers, function (h) {
      return h === handler;
    });
    if (index !== -1) {
      delete this._handlers[index];
    }
  },


  _handlers: [],

  _getParams: function _getParams() {
    var url = new _domurl2.default();
    var path = url.path.substr(1);
    var params = Object.assign({}, { path: path }, url.query);

    return params;
  },
  _getNextLocation: function _getNextLocation(nextParams) {
    var url = new _domurl2.default();

    _lodash2.default.each(nextParams, function (value, name) {
      if (name !== 'path') {
        url.query[name] = value;
      }
    });

    var pathname = nextParams.path ? '/' + nextParams.path : url.path;
    var queryString = url.query.toString();
    var search = (queryString ? '?' : '') + queryString;

    return { pathname: pathname, search: search };
  }
};

history.listen(function () {
  var previousParams = _lodash2.default.clone(ParamStore.previousParams);
  var currentParams = ParamStore._getParams();

  ParamStore._handlers.forEach(function (handler) {
    var names = handler.names;
    var callback = handler.callback;
    // get the names of the changed params

    var allParamNames = _lodash2.default.union(_lodash2.default.keys(previousParams), _lodash2.default.keys(currentParams));
    var changedParams = allParamNames.filter(function (paramName) {
      return !_lodash2.default.isEqual(previousParams[paramName], currentParams[paramName]);
    });
    // check if the changed ones contains the listened ones
    var shouldNotify = _lodash2.default.difference(names, changedParams).length < names.length;
    if (shouldNotify) {
      callback({
        changedParams: _lodash2.default.pick(currentParams, names),
        currentParams: currentParams,
        previousParams: previousParams
      });
    }
  });

  ParamStore.previousParams = _lodash2.default.clone(currentParams);
});

exports.default = ParamStore;