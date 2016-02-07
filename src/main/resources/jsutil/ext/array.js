// NOTE: these _do_ break for each (foo in someArray)

/** removes an element */
Array.prototype.remove = function(element) {
	var	index	= this.indexOf(element);
	if (index === -1)	return false;
	this.splice(index, 1);
	return true;
};

/** whether this array contains an element */
Array.prototype.contains = function(element) {
	return this.indexOf(element) !== -1;
};

/** two partitions in a 2-element Array, first the partition where the predicate returned true */ 
Array.prototype.partition = function(predicate) {
	var	yes	= [];
	var no	= [];
	for (var i=0; i<this.length; i++) {
		var	item	= this[i];
		(predicate(item) ? yes : no).push(item);
	}
	return [ yes, no ];
};

/** flatten an Array of Arrays into a simple Array */
Array.prototype.flatten = function() {
	var out	= [];
	for (var i=0; i<this.length; i++) {
		out	= out.concat(this[i]);
	}
	return out;
};

/** map every element to an Array and concat the resulting Arrays */
Array.prototype.flatMap = function(func, thisVal) {
	var out	= [];
	for (var i=0; i<this.length; i++) {
		out	= out.concat(func.call(thisVal, this[i], i, this));
	}
	return out;
};

/** returns a reverse copy of this Array */
Array.prototype.reverseClone = function() {
	var	out	= [].concat(this);
	out.reverse();
	return out;
};

/** return a new Array with a separator inserted between every element of the Array */
Array.prototype.intersperse	= function(separator) {
	var	out	= [];
	for (var i=0; i<this.length; i++) {
		out.push(this[i]);
		out.push(separator);
	}
	out.pop();
	return out;
};

/** optionally insert an element between every two elements and boundaries */
Array.prototype.inject = function(func, thisVal) {
	var out	= [];
	for (var i=0; i<=this.length; i++) {
		var	a	= i > 0				? this[i-1]	: null;
		var b	= i < this.length	? this[i]	: null;
		var	tmp		= func.call(thisVal, a, b);
		if (tmp !== null)	out.push(tmp);
		if (i < this.length)	out.push(this[i]);
	}
	return out;
};
		
/** use a function to extract keys and build an Object */
Array.prototype.indexWith = function(keyFunc) {
	var	out	= {};
	for (var i=0; i<this.length; i++) {
		var	item	= this[i];
		out[keyFunc(item)]	= item;
	}
	return out;
};
