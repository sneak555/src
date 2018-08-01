class Game {
  constructor(rowNum,colNum,bombNum){
    this._board = new Board(rowNum,colNum,bombNum);
    this._board.print(this._board._bombBoard);
    console.log('test');
  }
  playMove(rowIn,colIn) {
    this._board.flipTile(rowIn,colIn);
    if(this._board.playerBoard[rowIn][colIn] === 'B') {
      this._board.print(this._board._bombBoard);
      console.log('BOMB!: game over.');
    } else if (this._board.hasSafeTiles()){
      this._board.print(this._board._bombBoard);
      console.log('that was the last tile!: YOU WIN! :)');
    } else {
      this._board.print(this._board._playerBoard);
      console.log('Current Board:');
    }
  }
  get numOfBombs() {
    return this._board.numOfBombs;
  }
}

class Board {
  constructor(numbOfRows,numbOfCols,numbOfBombs){
    this._numbOfBombs = numbOfBombs;
    this._numbOfTiles = numbOfCols*numbOfRows;
    this._playerBoard = Board.generatePlayerBoard(numbOfRows,numbOfCols);
    this._bombBoard = Board.generateBombBoard(numbOfRows,numbOfCols,numbOfBombs);
    this._numOfFlips = 0;
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
      this._bombBoard[rowIndex][colIndex] = this.getNumOfBombs(rowIndex,colIndex);
      this._numOfFlips++;
    }
    this._numOfTiles++;
  }
  getNumOfBombs (rowIndex,colIndex) {
    const numOfRows = this._bombBoard.length;
    const numOfCols = this._bombBoard[0].length;
    let numOfBombs = 0;
    const neighborOffsets = [
      [1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1],
    ];
    neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex+offset[0]
    const neighborColIndex = colIndex+offset[0]
    if(neighborRowIndex >= 0 && neighborRowIndex < numOfRows &&
       neighborColIndex >= 0 && neighborColIndex < numOfCols){
      if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B'){
        numOfBombs++
      }
    }
    });
    return numOfBombs;
  }
  hasSafeTiles() {
    return((this._numOfTiles - this._numbOfBombs) === this._numOfFlips)
    console.log(this._numOfTiles+'-'+ this._numbOfBombs+ '==='+ this._numOfFlips);
  }
  print (board) {
  console.log(board.map(row => row.join(' | ')).join('\n'));
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
g._board.print
