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



window.findNRooksSolution = function(n) {
  //Crete an empty board
  var aSolution = new Board(createMatrix(n));
  //Loop through all rows and cols
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      //get the current row
      var aRow = aSolution.get(row);
      //Change the next value
      aRow[col] = 1;
      //change the current row
      aSolution.set(row, aRow);
      //Check for conflicts
      if (aSolution.hasAnyRowConflicts() || aSolution.hasAnyColConflicts()) {
        //If so reset
        aRow[col] = 0;
        aSolution.set(row, aRow);
      }
    }
  }
  //Need to return a matrix
  var output = [];
  for (var i = 0; i < n; i++) {
    output.push(aSolution.attributes[i]);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(output));
  return output;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.createMatrix = function(n) {
  let outer = [];
  for (let i = 0; i < n; i++) {
    var inner = [];
    for (let i = 0; i < n; i++) {
      inner.push(0);
    }
    outer.push(inner);
  }
  return outer;
};