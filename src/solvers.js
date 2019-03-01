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
  for (var i = 0; i < n; i++) {
    valsToN[i] = i;
  }
  var permutations = findAllPermutations(valsToN);

  //Go through all possiblities
  permutations.forEach(function(permute, permutationsIndex) {
    var customMatrix = []; //a custom made matrix
    permute.forEach(function(permi, permuteIndex) {
      //Reorder preStuffed based of permutation into customMatrix
      var indexForPreStuffed = permute[permuteIndex];
      customMatrix[permuteIndex] = preStuffed[indexForPreStuffed];

      //If customMatrix full check for conflicts
      if (customMatrix.length === n) {
        var customBoard = new Board(customMatrix);
        if (!customBoard.hasAnyRooksConflicts()) {
          var stringyCustom = JSON.stringify(customMatrix);
          solutions.push(stringyCustom);
        }
      }
    });
  });
  var solutionCount = solutions.length; 
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];

  var preStuffed = createMatrix(n);
  for (let i = 0; i < preStuffed.length; i++) {
    preStuffed[i][i] = 1;
  }

  var valsToN = new Array(n);
  for (var i = 0; i < n; i++) {
    valsToN[i] = i;
  }
  var permutations = findAllPermutations(valsToN);

  permutations.forEach(function(permute, permutationsIndex) {
    var customMatrix = []; //a custom made matrix
    permute.forEach(function(permi, permuteIndex) {
      var indexForPreStuffed = permute[permuteIndex];
      customMatrix[permuteIndex] = preStuffed[indexForPreStuffed];

      if (customMatrix.length === n) {
        var customBoard = new Board(customMatrix);
        if (!customBoard.hasAnyQueensConflicts()) {
          var stringyCustom = JSON.stringify(customMatrix);
          solutions.push(stringyCustom);
        }
      }
    });
  });
  
  var output = solutions.length > 0 ? JSON.parse(solutions[0]) : createMatrix(n);



  console.log('Number of solutions for ' + n + ' queens:', output);
  return output;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //Variable of all passed solutions
  var solutions = [];

  //Create prefilled matrix;
  var preStuffed = createMatrix(n);
  for (let i = 0; i < preStuffed.length; i++) {
    preStuffed[i][i] = 1;
  }

  //Create array of all possible combinations of 0 - n
  var valsToN = new Array(n);
  for (var i = 0; i < n; i++) {
    valsToN[i] = i;
  }
  var permutations = findAllPermutations(valsToN);

  //Go through all possiblities
  permutations.forEach(function(permute, permutationsIndex) {
    var customMatrix = []; //a custom made matrix
    permute.forEach(function(permi, permuteIndex) {
      //Reorder preStuffed based of permutation into customMatrix
      var indexForPreStuffed = permute[permuteIndex];
      customMatrix[permuteIndex] = preStuffed[indexForPreStuffed];

      //If customMatrix full check for conflicts
      if (customMatrix.length === n) {
        var customBoard = new Board(customMatrix);
        if (!customBoard.hasAnyQueensConflicts()) {
          var stringyCustom = JSON.stringify(customMatrix);
          solutions.push(stringyCustom);
        }
      }
    });
  });
  var solutionCount = n === 0 ? 1 : solutions.length;

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
  
  var results = [];

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
  
  
  // For testing:
  var print = function(input) {
    results.push(input.slice());
  };
  
  heapsPermute(anArr, print);
  return results;
};