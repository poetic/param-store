import { createHistory, useQueries } from 'history'
import _ from 'lodash'

const history = useQueries(createHistory)()

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

  set(params, options) {
    const currentParams = this._getParams()
    const nextParams = _.clone(params)

    // do not push if there is no change on params
    const paramsIsSame = _.every({nextParams}, function(value, name) {
      return _.isEqual(value, currentParams[name])
    })

    if (paramsIsSame) {
      return;
    }

    const methodName = _.get(options, 'replaceState') ? 'replace' : 'push'
    const nextLocation = this._getNextLocation(nextParams)
    history[methodName](nextLocation);
  },

  setAll(params, options) {
    const currentParamsWithNull = _.mapValues(this._getParams(), () => null)
    this.set(_.extend(currentParamsWithNull, params), options)
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
    const {pathname, query} = history.getCurrentLocation()
    const path = pathname.substr(1)
    return Object.assign({path}, query)
  },

  _getNextLocation(nextParams) {
    const location = history.getCurrentLocation()
    const query = _.cloneDeep(location.query)

    _.each(nextParams, function(value, name) {
      if (name !== 'path' && !_.isUndefined(value)) {
        query[name] = _.isNull(value) ? undefined : value
      }
    })

    let pathname;
    if (_.isUndefined(nextParams.path)) {
      pathname = location.pathname
    } else if (_.isNull(nextParams.path)) {
      pathname = ''
    } else {
      pathname = '/' + nextParams.path
    }

    return {pathname, query}
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
    const watchAll = names.length === 0
    const watchedChanged = _.intersection(names, changedParams).length > 0
    const shouldNotify = watchAll || watchedChanged
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
