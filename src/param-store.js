import { createHistory } from 'history'
import Url from 'domurl'
import _ from 'lodash'

const history = createHistory()

const ParamStore = {
  previousParams: {},

  get(name) {
    return this._getParams()[name]
  },

  getAll(name) {
    return this._getParams()
  },

  pick(names) {
    return _.pick(this._getParams(), names)
  },

  set(params) {
    const currentParams = this._getParams()
    const nextParams = _.clone(params)

    // do not push if there is no change on params
    const paramsIsSame = _.every({nextParams}, function(value, name) {
      return _.isEqual(value, currentParams[name])
    })

    if (!paramsIsSame) {
      history.push(this._getNextLocation(nextParams))
    }
  },

  reset(params) {
    const currentParamsWithNull = _.mapValues(this._getParams(), () => null)
    this.set(_.extend(currentParamsWithNull, params))
  },

  listen() {
    const args = Array.prototype.slice.call(arguments)
    const callback = args.pop()
    const handler = {names: args, callback}
    this._handlers.push(handler)
    return handler
  },

  unlisten(handler) {
    const index = _.findIndex(this._handlers, (h) => (h === handler))
    if (index !== -1) {
      delete this._handlers[index]
    }
  },

  _handlers: [],

  _getParams() {
    const url = new Url()
    const path = url.path.substr(1)
    const params = Object.assign({}, {path}, url.query)

    return params
  },

  _getNextLocation(nextParams) {
    const url = new Url()

    _.each(nextParams, function(value, name) {
      if (name !== 'path') {
        url.query[name] = value
      }
    })

    let pathname;
    if (_.isUndefined(nextParams.path)) {
      pathname = url.path
    } else if (_.isNull(nextParams.path)) {
      pathname = ''
    } else {
      pathname = '/' + nextParams.path
    }

    const queryString = url.query.toString()
    const search = (queryString ? '?' : '') + queryString

    return {pathname, search}
  }
}

history.listen(function() {
  const previousParams = _.clone(ParamStore.previousParams)
  const currentParams = ParamStore._getParams()

  ParamStore._handlers.forEach(function(handler) {
    const {names, callback} = handler
    // get the names of the changed params
    const allParamNames = _.union(_.keys(previousParams), _.keys(currentParams))
    const changedParams = allParamNames.filter(function(paramName) {
      return !_.isEqual(previousParams[paramName], currentParams[paramName])
    })
    // check if the changed ones contains the listened ones
    const shouldNotify = _.difference(names, changedParams).length < names.length
    if (shouldNotify) {
      callback({
        changedParams: _.pick(currentParams, names),
        currentParams,
        previousParams
      })
    }
  })

  ParamStore.previousParams = _.clone(currentParams)
})

export default ParamStore
