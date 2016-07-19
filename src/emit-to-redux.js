export default (store) => {
  ParamStore.listen((report) => {
    store.dispatch({
      type: 'CHANGE_PARAM_STORE',
      value: report
    })
  })
}
