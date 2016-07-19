import ParamStore from './param-store'

const initialState = {
  currentParams: ParamStore.getAll(),
  previousParams: {},
  changedParams: {}
}

export default (state=initialState, action) => {
  if (action.type === 'CHANGE_PARAM_STORE') {
    return action.value
  } else {
    return state
  }
}
