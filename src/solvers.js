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
  //Variable of all passed solutions
  var solutions = [];

  //Create prefilled matrix;
  var preStuffed = createMatrix(n);
  for (let i = 0; i < preStuffed.length; i++) {
    preStuffed[i][i] = 1;
  }

  //Create array of all possible combinations of 0 - n
  var valsToN = new Array(n);
  valsToN.forEach(function(element, index) {
    element = index;
  });
  var permutations = findAllPermutations(valsToN);

  //Fill board with match from prefilled and 
  for (var permute = 0; permute < permutations.length; permute++) {
    //create a custom matrix of prestuffed sorted in the order of permutations permute
    var customMatrix = [];
    for (var permi = 0; permi < permute.length; permi++) {
      customMatrix[0] = preStuffed[permutations[permute[permi]]];
    }

    //Create new board
    var customBoard = new Board(customMatrix);

    if (!customBoard.hasAnyColConflicts() &&
        !customBoard.hasAnyRowConflicts() &&
        !customBoard.hasAnyMajorDiagonalConflicts() &&
        !customBoard.hasAnyMinorDiagonalConflicts() ) {
      var stringyCustom = JSON.stringify(customMatrix);
      solutions.push(stringyCustom);
    }

  }




  var solutionCount = solutions.length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board(createMatrix(n)); //fixme
  for (let row = 0; row < n; row++ ) {
    for (let col = 0; col < n; col++) {
      var aRow = solution.get(row);
      aRow[col] = 1;
      solution.set(row, aRow);
      if (solution.hasAnyColConflicts() || 
          solution.hasAnyRowConflicts() || 
          solution.hasAnyMajorDiagonalConflicts() || 
          solution.hasAnyMinorDiagonalConflicts()) {
        aRow[col] = 0;
        solution.set(row, aRow);
      }
    }
  }
  var output = [];
  for (var i = 0; i < n; i++) {
    output.push(solution.attributes[i]);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(output));
  return output;
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

window.findAllPermutations = function(anArr = []) {
  var swap = function (array, pos1, pos2) {
    var temp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = temp;
  };
  
  var heapsPermute = function (array, output, n) {
    n = n || array.length; // set n default to array.length
    if (n === 1) {
      output(array);
    } else {
      for (var i = 1; i <= n; i += 1) {
        heapsPermute(array, output, n - 1);
        if (n % 2) {
          var j = 1;
        } else {
          var j = i;
        }
        swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
      }
    }
  };
  
  var output = [];
  
  // For testing:
  var print = function(input) {
    output.push(input);
  };
  
  heapsPermute(anArr, print);
  return output;
};