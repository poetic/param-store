import ParamStore from './param-store'
import actionTypeConstants from './action-type-constants'

export default (store) => {
  return ParamStore.listen((report) => {
    store.dispatch({
      type: actionTypeConstants.PUSH_PARAM_STORE,
      value: report
    })
  })
}
