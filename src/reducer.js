import ParamStore from './param-store'
import actionTypeConstants from './action-type-constants'

const initialState = {
  currentParams: ParamStore.getAll(),
  previousParams: {},
  changedParams: {}
}

export default (state=initialState, action) => {
  switch (action.type) {
    case actionTypeConstants.PUSH_PARAM_STORE:
      return action.value
    default:
      return state
  }
}
