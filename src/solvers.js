/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findSolution = function(row, n, board, validator, callback){
  // if all rows exhausted
  if(row === n){
    //increment solutionCount
    // solutionCount++;

    // stop
    return callback();;
  }

  // iterate over possible decision
  for(var i = 0;i < n;i++){
    // place a piece
    board.togglePiece(row, i);
    // recurse into remaining problem
    if(!board[validator]()){

      findSolution(row + 1, n, board, validator, callback);
    }
      // unplace a piece
      board.togglePiece(row, i);

  }
}

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
  // var boardSize = new Board()
  // creat colIndex = 0
  var colIndex = 0;
  // Iterate over row
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
  var solutionCount = 0;
  var board = new Board({n:n});

  findSolution(0, n, board, 'hasAnyRooksConflicts', function(){
    solutionCount++;
  });
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var solution = board.rows(); //fixme


  findSolution(0, n, board, 'hasAnyQueensConflicts', function(){
    solution = _.map(board.rows(), function(row){
      return row.slice();
    });

  });
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  findSolution(0, n, board, 'hasAnyQueensConflicts', function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
