// -----------------------------------------------------------------
// QUEEN CLASS
// -----------------------------------------------------------------

var Queen = function(x, y, table, number, parent) {
    this.xPos = x;
    this.yPos = y;
    this.table = table;
    this.grid = table.grid;
    this.number = number;
    this.isPlaced = false;
    this.parent = parent || null;
    this.child = null;
};

Queen.prototype.canBePlacedAtCurrentSquare = function() {
    var isQueenInAttackLine = false;
    var checkSquare = function(square) {
        if (square.containsQueen() || square.isAttacked()) {
            isQueenInAttackLine = true;
        }
    }
    this.querySpaces(this.xPos, this.yPos, checkSquare);
    return !(isQueenInAttackLine);
}

Queen.prototype.modifyLines = function(attackOrClear) {
    var shouldAttack = (attackOrClear === "attack") ? true : false;
    var shouldClear = !(shouldAttack);

    var modifySquare = function(square) {
        if (shouldAttack) {
            if (square.isEmpty()) {
                this.attack(square);
            };
        }
        else if (shouldClear) {
            if (square.isAttacked() && square.wasAttackedBy(this)) {
                square.clear();
            }
        }
    }

    this.querySpaces(this.xPos, this.yPos, modifySquare.bind(this));
}

Queen.prototype.querySpaces = function(originX, originY, callBack) {
    this.getLine(originX, originY, -1, 0, callBack);  // Attack all spaces west
    this.getLine(originX, originY, 1, 0, callBack);  // Attack all spaces east
    this.getLine(originX, originY, 0, 1, callBack);  // Attack all spaces north
    this.getLine(originX, originY, 0, -1, callBack);  // Attack all spaces south
    
    this.getLine(originX, originY, 1, 1, callBack);  // Attack all spaces southeast
    this.getLine(originX, originY, 1, -1, callBack); // Attack all spaces northeast
    this.getLine(originX, originY, -1, 1, callBack); // Attack all spaces northwest
    this.getLine(originX, originY, -1, -1, callBack); // Attack all spaces southhwest
}

Queen.prototype.getLine = function(originX, originY, directionX, directionY, callBack) {
    var spot = {x: originX, y: originY};

    while (this.table.isInGrid(spot.x, spot.y)) {
        spot.x += directionX;
        spot.y += directionY;

        if (this.table.isInGrid(spot.x, spot.y)) {
            var currentSquare = this.grid[spot.y][spot.x];
            callBack(currentSquare);
        }
    }
}

Queen.prototype.attack = function(square) {
    square.value = "ATTACKED";
    square.attackedBy = this;
}

Queen.prototype.remove = function() {
    var currentSquare = this.table.getSquareAt(this.xPos, this.yPos);
    currentSquare.clear();
    this.isPlaced = false;
    this.modifyLines('clear');
    this.table.forEachQueen(function(queen) {
        if (queen.isPlaced) {
            queen.modifyLines('attack');
        }
    });
}

Queen.prototype.hasAParent = function() {
    return this.parent !== null;
}

Queen.prototype.hasAChild = function() {
    return this.child !== null;
}