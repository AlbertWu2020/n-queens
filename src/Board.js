// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // How do we get the board?
      // the object calling this method should be the board object and the board object has attributes

      // Get the values from the attributes to create the board

      // Check the array at the board[rowIndex]

      // get the array count of 1

      // if result returns less than 1: return false

      // else return true

      //---------------------------------
      // Alberts method:
      // get the value that attributes from the board
      // get all the values in the specific row
      //    add them together
      //    compare with the add value
      //    if the result is greater than 1: return true, else false

      if (!this.attributes) {
        return;
      }
      var currentRow = this.attributes[rowIndex];

      var result = currentRow.reduce((total, cur) => {
        return total + cur;
      }, 0);

      if (result > 1) {
        return true;
      }

      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // get the board
      //    the board is an object under this.attributes
      //    use Object.values to get an array of values(the row)
      // if not board return undefined
      // iterate through the board
      //   for each row, call hasRowConflictAt
      //    if result is true: return true
      // return false if there are no conflicts in any of the rows

      //---------------------------------
      // Alberts method;
      // iterate over the size of the board
      //  call hasRowConflictAt with the current index
      //  if (result is true): return true
      // else return false
      if (!this.attributes) {
        return;
      }

      var boardSize = this.attributes[0].length;

      // this board has a count entry at the end, so subtract 1 from i to avoid it
      for (let i = 0; i < boardSize; i += 1) {
        var result = this.hasRowConflictAt(i);
        if (result) {
          return true;
        }
      }

      return false;
    },

// COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // This function will check the column of the board and see if there are any conflicts
      // To do that, go through every row and check the column and keep a count of how many pieces are on the column
      // if there are more than 1, return true else false
      // Check if this.attributes exists
      // get the board from this.attributes
      // create count
      // iterate through the rows
      //    if row[colIndex] is 1
      //      increment count
      // if count > 1: return true, else false

      // -------------------------------------------
      //create a count variable
       // iterate over the entire board
       // for each row check the colIndex
        //  if element equal one
        // increment count by one
        if(!this.attributes){
          return;
        }

        let count = 0;
        let currentRowSize = this.attributes[0].length;

        for(let i =0; i < currentRowSize;i++){

          if(this.attributes[i][colIndex] === 1){
            count++;
          }
        }
        if(count > 1){
          return true;
        }else{
          return false;
        }


    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // this function will check the entire board for any conflicts on a column
      var currentSize = this.attributes[0].length;
      // Process: iterate through a range of the length of the board
      for(let i=0;i < currentSize;i++){
        //    call hasColConflictAt with each range
        var resultRange = this.hasColConflictAt(i);
      //    if any returns true: return true, else false
        if(resultRange){
          return true;
        }

      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // Major diagonal travels from top left to bottom right
      // from the column index, to check the next row and column, increment row and column by 1
      // if row or column is > the board size stop
      // if count > 1: return true, else false
      // Process:
      // check if this object has attributes
      // if not: return undefined;
      // get the board
      // iterate through the rows of the board
      //   if columnIndex > the size of the board:
      //      return true if count > 1 else false;
      //   check the columnIndex
      //    increment count if === 1
      //   increment columnIndex
      //
      // * If starting position was 0, it will go through the entire row, so check if there is any conflict. *
      // if columnIndex > the size of the board:
      //    return true if count > 1 else false;

      //---------------------------------
      // Albert's method
      // iterate over the range of the size of the board
      //    check the element if it is the last element
      //      if true: break
      //    create a count variable
      //    count = 0
      //    [1, 0, 0, 0]
      //    [0, 1, 0, 0]
      //    check if element at row/colIndex === 1
      //      increment count
      //      increament colIndex
      //
      //  if count > 1: return true, else false

      // New problem:
      // This algorithm only checks the top half of the board
      // We should check the bottom half
      //

      if(!this.attributes) {
        return;
      }

      var board = this.attributes;
      var currentSize = board.n;

      var count = 0;

      for (let i = 0; i < currentSize ; i += 1) {
        if (i === currentSize) {
          break;
        }

        if (board[i][majorDiagonalColumnIndexAtFirstRow] === 1) {
          count += 1;
        }
        majorDiagonalColumnIndexAtFirstRow += 1;
      }
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // Check all major diagonals for any conflict
      // Use the hasMajorDiagonalConflictAt on each index of the first row
      // return true if any are true: else false

      // Process:
      //  Check if this has attributes
      //  Get the board from this.attributes
      //  iterate through the range of the board with some
      //    call hasMajorDiagonalConflictAt on the index
      //    return true if true
      //  return the result of some


      // Example board
      //    [1, 0, 0, 0]
      //    [0, 1, 0, 0]
      //    [1, 0, 0, 0]
      //    [0, 1, 0, 0]
      // ------------------------------------
      // Albert's Method
      //  Check if there are any conflicts from diagonal top left bottom right
      //
      //  Iterate over the size of the board
      //    call hasMajorDiagonalConflictAt(colIndex)
      //    if result is true: return true, else false
      //
      if (!this.attributes) {
        return;
      }

      let boardSize = this.attributes[0].length;

      for (let i = 0; i < boardSize ; i += 1) {
        var result = this.hasMajorDiagonalConflictAt(i);
        if (result) {
          return true;
        }
      }

      return false;
    },

    // TODO: We hit a block where we are only checking the top half of the matrix and the bottom half is left alone
    //  Figure out how to check the bottom half



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // This function is similar to the Major, but checks from top right to bottom left
      // Instead of incrementing the column index, we need to decrement
      // if columnIndex is less than 0 stop
      //    return true if count > 0 else false
      // Process:
      //  get the board form this.attributes if it exists
      if(!this.attributes){
        return;
      }
      var currentBoardSize = this.attributes.n;
      var counts = 0;
      //  iterate through the rows
      for(let i=0;i < currentSize;i++){
        //    if columnIndex is < 0:
        if(minorDiagonalColumnIndexAtFirstRow < 0){
          //      break;
          break;
        }
        var result = this.attributes[i][minorDiagonalColumnIndexAtFirstRow - i];
        //    if row at columnIndex === 1:
        if(result === 1){
          //      increment count
          count++;
        }
        //  return true if count > 0, else false

      }
      if(count > 1){
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // This function is similar to the Major, but checks form top right to bottom left
      // We need to check all the diagonals from the top left and move left until the end
      // if there are any conflicts using hasMinorDiagonalConflictAt, then return true else false
      // Process:
      //  Get the board
      //  iterate through the range based on the board size
      //    if any call to hasMinorDiagonalConflictAt return true
      //      return true
      //  return false at the end of the loop if there were no conflicts

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());