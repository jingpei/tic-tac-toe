import React from 'react'
import FontAwesome from 'react-fontawesome'

class GameSquare extends React.Component {
  render() {
    return (
      <td onClick={ this.onClick.bind(this) }>
        <FontAwesome name={ this.props.val } />
      </td>
    )
  }

  onClick() {
    this.props.onClick.call(this, this.props.row, this.props.col)
  }
}

export default GameSquare;