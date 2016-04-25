import React from 'react'
import ParamStore from './param-store'

// may be have a state and change this to active or not
export default class Link extends React.Component {
  render () {
    const {type, ...other} = this.props;

    if (type === 'a') {
      other.href = other.href || '#';
    }

    return React.createElement(type, other)
  }
}

Link.defaultProps = {
  type: 'a',
  onClick: function (e) {
    e.preventDefalut();
    ParamStore.set(this.props.params)
  }
}
