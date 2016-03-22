require('normalize.css');
require('styles/App.css');

import React from 'react'
import GameGrid from './game-grid/game-grid'
import GameNew from './game-new/game-new'

class AppComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = { games: [] }
  }

  render() {
    return (
      <div>
        <GameNew onClick={ this.startGame.bind(this) } />
        <div className='games'>
          { this.state.games }
        </div>
      </div>
    );
  }

  startGame(size) {
    let game = this.createGrid(size)
    this.state.games.push(game)
    this.setState({ games: this.state.games })
  }

  createGrid(n) {
    return (
      <GameGrid size={n} key={ this.state.games.length }/>
    )
  }
}

export default AppComponent;
