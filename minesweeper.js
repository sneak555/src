let generatePlayerBoard = (numOfRows,numOfCols) =>
{
  let board = [];
  for(i=0;i<numOfRows;i++)
  {
    let row = [];
    for(j=0;j<numOfRows;j++)
    {
      row.push(' ');
      row.push(' | ');
    }
    board.push(row);
  }
  return board;

}
let generateBombBoard = (numOfRows,numOfCols,numOfBombs) =>
{
  let board = [];
  for(i=0;i<numOfRows;i++)
  {
    let row = [];
    for(j=0;j<numOfRows;j++)
    {
      row.push(' ');
      row.push(' | ');
    }
    board.push(row);
  }
  let numOfBombsPlaced = 0;
  //can currently place bombs on top of bombs
  while(numOfBombsPlaced<numOfBombs)
  {
    let randomRowIndex = Math.floor(Math.random() * numOfRows);
    let randomColIndex = Math.floor(Math.random() * numOfCols);
    if(!(board[randomRowIndex][randomColIndex] === 'B'))
    {
      board[randomRowIndex][randomColIndex] = 'B'
      numOfBombsPlaced++
    }
  }
  return board;
}
const getNumOfBombs = (bombBoard, rowIndex,colIndex) =>
{
  const numOfRows = bombBoard.length;
  const numOfCols = bombBoard[0].length
  let numOfBombs = 0;
  const neighborOffsets = [
    [1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1],
  ];
  neighborOffsets.forEach(offset => {
  const neighborRowIndex = rowIndex+offset[0]
  const neighborColIndex = colIndex+offset[0]
  if(neighborRowIndex >=0 && neighborRowIndex <=numOfRows&& neighborColIndex >= 0 && neighborColIndex <= numOfCols){
    if (bombBoard[neighborRowIndex][neighborColIndex] === 'B')
    {
      numOfBombs++
    }
  }
  });
  return numOfBombs;
}
const flipTile = (playerBoard,bombBoard,rowIndex,colIndex) => {
  if(!(playerBoard[rowIndex][colIndex] === ' '))
  {
    console.log('this tile is already flipped')
    return;
  } else if (bombBoard[rowIndex][colIndex] === 'B') {
    playerBoard[rowIndex][colIndex] = 'B';
  } else {
    playerBoard[rowIndex][colIndex] = getNumOfBombs(bombBoard,rowIndex,colIndex);
  }
}
let printBoard = (board) =>
{
  console.log(board.map(row => row.join(' | ')));
}
const l = 3;
const h = 4;
let playerBoard = generatePlayerBoard(l,h);
let bombBoard = generateBombBoard(l,h,Math.floor(l*h/2));
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard,bombBoard,1,1);
console.log('updated player board');
printBoard(playerBoard);
