import Square from "./components/Square";

function sameArrayCheck(arr) {
  let s = new Set(arr);
  return s.size == 1;
}


export function calculateWinnerDynamic(size, boxes) {

console.log('==>',size,boxes)
  let count = 0;
  let twoDimensionalArray = [];

  // horizontal array

  let horizontalArray = [];

  for (let i = 0; i < size; i++) {
    var horizontalData = [];
    var horizontalBoxEle = [];

    for (let j = 0; j < size; j++) {
      horizontalData.push(count);
      horizontalBoxEle.push(boxes[count]);
      count++;
    }

    if (!horizontalBoxEle.includes(null)) {
      var horizontalWinner = sameArrayCheck(horizontalBoxEle);
      if (horizontalWinner) {
        // console.log('winner' + horizontalBoxEle[0])
        return horizontalBoxEle[0];
      }
    }
    twoDimensionalArray.push(horizontalData);
    horizontalArray.push(horizontalData);
  }

  // vertical array

  for (let j = 0; j < size; j++) {
    var verticalData = [];
    var verticalBoxEle = [];

    for (let i = 0; i < count; i++) {
      if (i % size == j) {
        verticalData.push(i);
        verticalBoxEle.push(boxes[i]);
      }
    }

    if (!verticalBoxEle.includes(null)) {
      var verticalWinner = sameArrayCheck(verticalBoxEle);
      if (verticalWinner) {
        // console.log('winner' + verticalBoxEle[0])
        return verticalBoxEle[0];
      }
    }
    twoDimensionalArray.push(verticalData);
  }

  // diagonal array

  let diagonalOne = [];
  let diagonalTwo = [];

  let diagonalOneEle = []
  let diagonalTwoEle = []

  for (let i = 0; i < horizontalArray.length; i++) {
    diagonalOne.push(horizontalArray[i][i])
    diagonalOneEle.push(boxes[horizontalArray[i][i]])

    diagonalTwo.push(horizontalArray[i][horizontalArray.length - i - 1])
    diagonalTwoEle.push(boxes[horizontalArray[i][horizontalArray.length - i - 1]])
  }

  if (!diagonalOne.includes(null)) {
    var diagonalOneWinner = sameArrayCheck(diagonalOneEle);
    if (diagonalOneWinner) {
      // console.log('winner' + diagonalOneEle[0])
      return  diagonalOneEle[0];
    }
  }

  if (!diagonalTwo.includes(null)) {
    var diagonalTwoWinner = sameArrayCheck(diagonalTwoEle);
    if (diagonalTwoWinner) {
      // console.log('winner' + diagonalTwoEle[0])
      return diagonalTwoEle[0];
    }
  }
  
  twoDimensionalArray.push(diagonalOne);
  twoDimensionalArray.push(diagonalTwo);

  // if(!horizontalWinner && !verticalWinner && !diagonalOneWinner && !diagonalTwoWinner ){
  //   return 'draw'
  // }
  if(!boxes.includes(null)) {
    return 'draw'
  }
  return null;
}
