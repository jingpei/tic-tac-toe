import React from 'react';
import GameSquare from '../game-square/game-square'
import GameRestart from '../game-restart/game-restart'
import { forEach, unzip, every } from 'lodash'

const nameMap = {
  0: 'times',
  1: 'circle-o'
}

class GameGrid extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameTurn: 0,
      gameOver: false,
      gameBoard: this.createBoard(),
      isWinner: false
    };
  }

  createBoard() {
    let board = []
    for(var i = 0; i < this.props.size; i++){
      let row = []
      for(var j = 0; j < this.props.size; j++){
        row.push('')
      }
      board.push(row)
    }
    return board
  }

  render() {
    return (
      <div className="grid">
        { this.renderGameOver.call(this) }
        <table>
          <tbody>
            { this.renderBoard.call(this) }
          </tbody>
        </table>
      </div>
    );
  }

  renderGameOver() {
    var winner = (this.state.gameTurn-1)%2
    if(this.state.gameOver) {
      return (
        <GameRestart onClick={ this.restartGame.bind(this) } winner={ nameMap[winner] } isWinner={ this.state.isWinner }/>
      )
    }
  }

  renderBoard() {
    return this.state.gameBoard.map((row, index) => {
        return (
          <tr>{ this.renderCols(row, index) }</tr>
        )
      }
    )
  }

  renderCols(row, rowIdx) {
    return row.map((col, colIdx) => {
      return (
        <GameSquare row={rowIdx} col={colIdx} val={col} onClick={ this.markPiece.bind(this) }/>
      )
    })
  }

  markPiece(row, col) {
    if(this.state.gameBoard[row][col] === '' && !this.state.gameOver){
      this.state.gameBoard[row][col] = nameMap[this.state.gameTurn%2]
      this.state.gameTurn++
    }
    this.setState({gameBoard: this.state.gameBoard, gameTurn: this.state.gameTurn })
    this.updateGameStatus()
  }

  updateGameStatus() {
    if(this.isGameOver(this.state.gameBoard) || this.isGameOver(unzip(this.state.gameBoard)) || this.isGameOver(this.unzipDiagonals()) || this.state.gameTurn === Math.pow(this.props.size, 2)){
      this.setState({gameOver: true})
    }
  }

  isGameOver(board) {
    let gameOver = false
    forEach(board, (row) => {
      let value = row[0]
      // Check if every col in a row contains a value and matches
      if(every(row, (col) => { return col === value && value != '' })) {
        gameOver = true
        this.setState({isWinner: true})
        return false
      }
    })
    return gameOver
  }

  unzipDiagonals() {
    let leftRightDiag = []
    let rightLeftDiag = []
    for(let i = 0; i < this.props.size ; i++){
      leftRightDiag.push(this.state.gameBoard[i][i])
      rightLeftDiag.push(this.state.gameBoard[i][this.state.gameBoard.length - 1 - i])
    }
    return [leftRightDiag, rightLeftDiag]
  }

  restartGame() {
    this.setState({
      gameTurn: 0,
      gameOver: false,
      gameBoard: this.createBoard(),
      isWinner: false
    })
  }
}

GameGrid.defaultProps = {
  size: 3
};

export default GameGrid;