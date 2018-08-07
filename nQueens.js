var nQueens = function(n) {
    this.table = new Table(n);
    this.table.createQueens(n);
    var firstQueen = this.table.queens[0];
    this.attemptToPlaceQueen(firstQueen);
}

nQueens.prototype.attemptToPlaceQueen = function(queen) {
    this.table.traverseEachSquare(function (square) {
        if (this.table.canPlaceQueenAt(square)) {
            this.table.placeQueen(square);
        }
    });
}

var algorithm = new nQueens(4);