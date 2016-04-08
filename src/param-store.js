import { createHistory } from 'history'
import Url from 'domurl'
import _ from 'lodash'

const history = createHistory()

const ParamStore = {
  previousParams: {},

  get(...names) {
    const params = this._getParams()

    if (names.length === 0) {
      return params
    } else {
      return _.pick(params, names)
    }
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

    return {
      pathname: nextParams.path ? ('/' + nextParams.path) : url.path,
      search: '?' + url.query.toString()
    }
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
