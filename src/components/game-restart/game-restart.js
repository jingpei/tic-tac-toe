import React from 'react'
import FontAwesome from 'react-fontawesome'

class GameRestart extends React.Component {
  render() {
    return (
      <div className='restart-container'>
        <div className='game-over'>
          <h1>Game Over</h1>
          { this.renderWinner.call(this) }
          <button onClick={ this.props.onClick }>Restart?</button>
        </div>
      </div>
    );
  }

  renderWinner() {
    if(this.props.isWinner) {
      return (
        <div className='winner'>
          <FontAwesome name={ this.props.winner } /> wins
        </div>
      )
    }
    return (<div className='winner'>It's a draw :(</div>)
  }
}

export default GameRestart;