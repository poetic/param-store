import React from 'react'
import ParamStore from './param-store'

export default class Link extends React.Component {
  render () {
    const {type, params, ...other} = this.props

    other.onClick = other.onClick || function (e) {
      e.preventDefault()
      ParamStore.setAll(params)
    }

    if (type === 'a') {
      other.href = other.href || '#'
    }

    return React.createElement(type, other)
  }
}

Link.defaultProps = {
  type: 'a'
}
