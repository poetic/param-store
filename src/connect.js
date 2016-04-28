import React from 'react'
import ParamStore from './param-store'

function connect(Component, ...paramNames) {
  const WrappedComponent = React.createClass({
    getInitialState: function() {
      return {
        changedParams: ParamStore.pick(...paramNames),
        currentParams: ParamStore.getAll(),
        previousParams: {}
      }
    },

    componentWillMount: function() {
      this.listener = ParamStore.listen(...paramNames, (report) => {
        this.setState(report)
      })
    },

    componentWillUnmount: function() {
      ParamStore.unlisten(this.listener)
    },

    render: function() {
      const props = Object.assign({}, this.props, this.state)
      return React.createElement(Component, props)
    }
  })
  return WrappedComponent
}

export default connect
