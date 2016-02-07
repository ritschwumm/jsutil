/** filter with an inverted predicate */
Array.prototype.filterNot	= function(predicate, thisVal) {
	var len	= this.length;
	var out	= [];
	for (var i=0; i<len; i++) {
		var it	= this[i];
		if (!predicate.call(thisVal, it, i, this)) {
			out.push(it);
		}
	}
	return out;
};

/** zip with another array */
Array.prototype.zip	= function(that) {
	var thisLen	= this.length;
	var thatLen	= that.length;
	var out	= [];
	for (var i=0; i<thisLen && i<thatLen; i++) {
		out.push([ this[i], that[i] ]);
	}
	return out;
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
Array.prototype.mapBy = function(keyFunc) {
	var	out	= {};
	for (var i=0; i<this.length; i++) {
		var	item	= this[i];
		out[keyFunc(item)]	= item;
	}
	return out;
};

/** new array with one item removed */
Array.prototype.without	= function(item) {
	var	index	= this.indexOf(item);
	if (index === -1)	return this;
	
	var out	= this.slice();
	out.splice(index, 1);
	return out;
};

/** (unstable) sort returning a new array */
Array.prototype.sorted	= function(compare) {
	var out	= this.slice();
	out.sort(compare);
	return out;
};

/** stable sort returning a new array */
Array.prototype.sortedStable	= function(compare) {
	var tmp	= this.map(function(it, idx) {
		return { idx: idx, it: it };
	});
	tmp.sort(function(a, b) {
		var cmp	= compare(a.it, b.it);
		return cmp === 0 ? a.idx - b.idx : cmp;
	});
	return tmp.map(function(o) {
		return o.it;
	});
};
