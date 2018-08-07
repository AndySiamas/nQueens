// -----------------------------------------------------------------
// SQUARE
// -----------------------------------------------------------------

var Square = function(rank, file) {
    this.rank = rank;
    this.file = file;
    this.value = "EMPTY";
    this.attackedBy = null;
}

Square.prototype.clear = function() {
	this.value = "EMPTY";
	this.wasAttackedBy = null;
}

Square.prototype.isEmpty = function() {
	return this.value === "EMPTY";
}

Square.prototype.isAttacked = function() {
	return this.value === "ATTACKED";
}

Square.prototype.wasAttackedBy = function(queen) {
	return this.attackedBy === queen;
}

Square.prototype.containsQueen = function() {
	return (this.value !== "EMPTY" && this.value !== "ATTACKED");
}