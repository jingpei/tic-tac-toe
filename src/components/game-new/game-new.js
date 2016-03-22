import React from 'react'

class GameNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: 3
    }
  }

  render() {
    return (
      <div className='start-game'>
        <h1>Tic Tac Toe</h1>
        <p>What size board do you want to play on?</p>
        <input placeholder={this.state.inpuValue} type="text" step="1" onChange={ this.updateValue.bind(this) } />
        <button onClick={ this.onClick.bind(this) }>New Game</button>
      </div>
    );
  }

  updateValue(e) {
    if(Number.isInteger(parseInt(e.target.value))) {
      this.setState({inputValue: e.target.value})
    }
  }

  onClick() {
    this.props.onClick.call(this, this.state.inputValue)
  }

}

export default GameNew;