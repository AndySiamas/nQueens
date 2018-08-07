// -----------------------------------------------------------------
// TABLE CLASS
// -----------------------------------------------------------------

var Table = function(n) {
    this.width = n;
    this.height = n;
    this.grid = {};
    this.queens = [];

    for (var rank = 0; rank < n; rank++) {
        var rowOfSquares = [];

        for (var file = 0; file < n; file++) {
            var square = new Square(rank, file);
            rowOfSquares.push(square);
        }
        this.grid[rank] = rowOfSquares;
    }
}

Table.prototype.createQueens = function(amount) {
    for (var i = 0; i < amount; i++) {
        var previousQueen = this.queens[i-1];
        var newQueen = new Queen(0, 0, this, i+1, previousQueen);
        if (previousQueen) { previousQueen.child = newQueen };
        this.queens.push(newQueen);
    }
}

Table.prototype.canPlaceQueenAt = function(square) {
    if (square && square.isEmpty()) {
        return true;
    } else {
        return false;
    }
}

Table.prototype.placeQueen = function(square, queenToPlace) {
    square.value = queenToPlace;
    queenToPlace.xPos = square.rank;
    queenToPlace.yPos = square.file;
    queenToPlace.isPlaced = true;
}

Table.prototype.removeQueen = function(queenToRemove) {
    var currentSquare = this.getSquareAt(queenToRemove.xPos, queenToRemove.yPos);
    currentSquare.clear();
    queenToRemove.isPlaced = false;
    queenToRemove.modifyLines('clear');
    this.forEachQueen(function (queen) {
        if (queen.isPlaced) {
            queen.modifyLines('attack');
        }
    });
}

Table.prototype.getSquareAt = function(x, y) {
    return this.grid[x][y];
}

Table.prototype.isInGrid = function(x, y) {
    return (this.grid[x] && this.grid[x][y]);
}

Table.prototype.traverseEachSquare = function(callback) {
    for (var rank in this.grid) {
        var currentRow = this.grid[rank];
        currentRow.forEach(function (square) {
            callback(square);
        });
    }
}

Table.prototype.hasAvailableSquares = function() {
    var squaresAreAvailable = false;
    this.traverseEachSquare(function (square) {
        if (square.isEmpty()) { squaresAreAvailable = true; }
    })
    return squaresAreAvailable;
}

Table.prototype.getEmptySquares = function() {
    var emptySquares = [];
    this.traverseEachSquare(function (square) {
        if (square.isEmpty()) { emptySquares.push(square); }
    })
    return emptySquares;
}

Table.prototype.forEachQueen = function(callback) {
    this.queens.forEach(function (queen) {
        callback(queen);
    });
}

Table.prototype.visualize = function() {
    var visualTable = "";
    for (var rank in this.grid) {
        var row = this.grid[rank];
        var visualRow = "["
        row.forEach(function (square) {
             if (square.value === "EMPTY") {
                 visualRow += "E ";
             }
             else if (square.value === "ATTACKED") {
                 visualRow += "A ";
             }
             else {
                 visualRow += "Q ";
             }
        });
        visualRow += "]";
        visualTable += visualRow + "\n";
    }
    console.log(visualTable);
    return visualTable;
}