/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window.findSolution = function(rowIndex, rowSize, board, validator, cb){
  //  check if index is equal to rowSize
  if(rowIndex === rowSize){
    //    then increment solutionCount by 1
    cb();
    //    return;
    return;
  }
  //  get the row at board[index]
  //  iterating thorugh the the row
  var row = board.get(rowIndex)
  for(let i = 0; i < row.length; i++){

    //   toggle the piece
    board.togglePiece(rowIndex, i);
    //   if board is valid
    if(!board[validator]()){
      //      recurse with findSolution(index + 1, rowSize)
      findSolution(rowIndex + 1, rowSize, board, validator, cb);
    }
    //   untoggle piece
    board.togglePiece(rowIndex, i);
  }
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  // input:
  //    n - the number rooks
  //  output:
  //    solution - returns a valid matrix with the the rooks in place
  // solution = [
  //   [1, 0],
  //   [0, 1]
  // ]

  // var solution = new Board([
  //   [1, 0, 0],
  //   [0, 1, 0],
  //   [0, 0, 1],
  // ]);
  //var testBoard = new Board({'n':n});

  /*
  create our matrix while placing out rooks
  [
    [1, 0]
    [0, 1]
  ]

  create the matrix and fill it with 0's
  [
    [0, 0]
    [0, 0]
  ]
  */
  // Helper function:
  //  createEmptyBoard(n) - creates a nxn matrix filled with 0
// [[0,0],
//   [0,0]
// ]
  //    {
  //      create an empty array, var matrix
  //      loop through n
  //        create an inner array
  //        push that into matrix
  //        we want to put n 0's in the the inner array
  //    }
  var createEmptyBoard = function (n) {
    var matrix = [];

    for (let i = 0; i < n; i += 1) {
      var row = [];
      matrix.push(row);
      for (let j = 0; j < n; j += 1) {
        row.push(0);
      }
    }
    return matrix;
  }

  var testBoard = createEmptyBoard(n);
  var colIndex = 0;
  for (let rowIndex = 0; rowIndex < testBoard[0].length ;rowIndex++) {
    // put one in there
    testBoard[rowIndex][colIndex] = 1;
    // increment col index by one
    colIndex += 1;
   }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(testBoard));
  return testBoard;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = new Board([
  //   [1, 0, 0],
  //   [0, 0, 0],
  //   [0, 0, 0],
  // ]); //fixme
  //
  // create a solutionCount variable // 1
  //  forEach row
  //    check the 0,0 is 0
  //    add one to the column 0
  //    add 1 to the column 0
  //    increment columnIndex
  //

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
  /*---------------------------*/
  // solution
  // var solutionCount = 0;
  // var board = new Board({n:n});

  // findSolution(0, n, board, 'hasAnyRooksConflicts', function(){
  //   solutionCount++;
  // });
// [0, 0, 0]
// [0, 0, 0]
// [0, 0, 0]

// ---------------------------------------------------------
//var board = new Board({n:n});
// create solution count => 1

  var solutionCount = 0;
  // get the number of rows => 3
  var board = new Board({'n': n})
  // findSolution(index, rowNum)
  //  check if index is equal to rowSize
  //    then increment solutionCount by 1
  //    return;
  //  get the row at board[index]
  //  iterating thorugh the the row
  //   toggle the piece
  //   if board is valid
  //      recurse with findSolution(index + 1, rowSize)
  //   untoggle piece

  // call findSolution(0, rowSize)

  findSolution(0, n, board, 'hasAnyRooksConflicts',() => {
    // if solution found: increment count
    solutionCount += 1;
  });
  // return solution count
  return solutionCount;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  //return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
//

  /*---------------------------*/
  // Queen solution
  var board = new Board({n:n});
  var solution = board.rows();

  findSolution(0, n, board, 'hasAnyQueensConflicts', () => {
    // return the solution
    // copy the board
    //  map on the board
    //    for each return the row
    // map = [[0]] <- new copy. different from the board row
    // iterate through the rows of the board
    // for each row
    //   call the callback function on the row
    //   push the results
    // return map

    solution = board.rows().map((row) => {
      return row.slice();
    });
  })
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  /*---------------------------*/
  // Queen solution
  var solutionCount = 0;
  var board = new Board({n:n});

  findSolution(0, n, board, 'hasAnyQueensConflicts',() => {
    // if solution found: increment count
    solutionCount += 1;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
