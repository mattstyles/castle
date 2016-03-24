
import React, { Component } from 'react'

// Must be stateful for react-blessed to update without recreating everything
export default class Root extends Component {
  constructor( props ) {
    super( props )
  }

  render() {
    let style = {
      top: 0,
      left: 0,
      width: 80,
      height: 24,
      style: {
        bg: 'black',
        fg: 'white'
      }
    }

    return (
      <box { ...style }>
        Root Component
      </box>
    )
  }
}
