class Game {
  constructor(rowNum,colNum,bombNum){
    this._board = new Board(rowNum,colNum,bombNum);
  }
  playMove(rowIn,colIn) {
    this._board.flipTile(rowIn,colIn);
    if(this._board.playerBoard[rowIn][colIn] === 'B') {
      console.log('BOMB!: game over.');
      this._board.print();
    } else if (this._board.hasSafeTiles()){
      console.log('that was the last tile!: YOU WIN! :)');
      this._board.print();
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}

class Board {
  constructor(numbOfRows,numbOfCols,numbOfBombs){
    this._numbOfBombs = numbOfBombs;
    this._numOfTiles = numbOfCols*numbOfRows;
    this._playerBoard = Board.generatePlayerBoard(numbOfRows,numbOfCols);
    this._bombBoard = Board.generateBombBoard(numbOfRows,numbOfCols,numbOfBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }
  flipTile(rowIndex,colIndex)  {
    if(!(this._playerBoard[rowIndex][colIndex] === ' ')){
      console.log('this tile is already flipped')
      return;
    } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
      this._playerBoard[rowIndex][colIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][colIndex] = this.getNumOfBombs(rowIndex,colIndex);
    }
    this._numOfTiles++
  }
  getNumOfBombs (rowIndex,colIndex) {
//    const numOfRows = bombBoard.length;
//    const numOfCols = bombBoard[0].length
    let numOfBombs = 0;
    const neighborOffsets = [
      [1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1],
    ];
    neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex+offset[0]
    const neighborColIndex = colIndex+offset[0]
    if(neighborRowIndex >= 0 && neighborRowIndex < this._numbOfRows &&
       neighborColIndex >= 0 && neighborColIndex < this._numbOfCols){
      if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B'){
        numOfBombs++
      }
    }
    });
    return numOfBombs;
  }
  hasSafeTiles() {
    return(this._numOfTiles !== this._numbOfBombs)
  }
  print (board) {
//  console.log(board.map(row => row.join(' | ')).join('\n'));
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }
  static generatePlayerBoard (numOfRows,numOfCols){
    let board = [];
    for(let i=0;i<numOfRows;i++){
      let row = [];
      for(let j=0;j<numOfCols;j++){
        row.push(' ');
  //     row.push('|');
      }
    board.push(row);
    }
  return board;
  }
  static generateBombBoard (numOfRows,numOfCols,numOfBombs){
    let board = [];
    for(let i=0;i<numOfRows;i++){
      let row = [];
      for(let j=0;j<numOfCols;j++){
        row.push(' ');
  //      row.push('| ');
      }
      board.push(row);
    }
    let numOfBombsPlaced = 0;
    //can currently place bombs on top of bombs
    while(numOfBombsPlaced<numOfBombs){
  //    console.log(numOfCols);
      let randomRowIndex = Math.floor(Math.random() * numOfRows);
      let randomColIndex = Math.floor(Math.random() * numOfCols);
      if(!(board[randomRowIndex][randomColIndex] === 'B')){
        board[randomRowIndex][randomColIndex] = 'B'
        numOfBombsPlaced++
      }
    }
    return board;
  }
}



/*const l = 5;
const h = 5;
let playerBoard = generatePlayerBoard(l,h);
let bombBoard = generateBombBoard(l,h,Math.floor(l*h/2));
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard,bombBoard,1,1);
console.log(bombBoard)
flipTile(playerBoard,bombBoard,4,4);
console.log('updated player board');
printBoard(playerBoard);
*/
const g = new Game(3,3,3);
g.playMove(1,1);
g.playMove(1,2);
