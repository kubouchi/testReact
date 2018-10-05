import React from 'react'

export default class ExampleBtn extends React.Component {
    render () {
      return (
        <button
          type={this.props.type}
        >
          {this.props.children}
        </button>
      )
    }
  }