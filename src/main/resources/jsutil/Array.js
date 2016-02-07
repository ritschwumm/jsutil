var jsutil	= jsutil || {};

/** Array helper functions */
jsutil.Array = {
	single: function(item) {
		return [ item ];
	},
	
	fromNullable: function(item) {
		return item !== null ? [ item ] : [];
	},
	
	//------------------------------------------------------------------------------
	
	firstOrNull: function(array) {
		return array.length !== 0 ? array[0] : null;
	},
	
	lastOrNull: function(array) {
		return array.length !== 0 ? array[array.length-1] : null;
	},
	
	count: function(array, pred) {
		var out	= 0;
		for (var i=0; i<array.length; i++) {
			out	+= pred(array[i]) ? 1 : 0;
		}
		return out;
	},
	
	countNot: function(array, pred) {
		var out	= 0;
		for (var i=0; i<array.length; i++) {
			out	+= pred(array[i]) ? 0 : 1;
		}
		return out;
	},
	
	//------------------------------------------------------------------------------
	
	// just here for symmetry
	map: function(array, func) {
		return array.map(func);
	},
	
	/** map every element to an Array and concat the resulting Arrays */
	flatMap: function(array, func) {
		var out	= [];
		for (var i=0; i<array.length; i++) {
			out	= out.concat(func(array[i]));
		}
		return out;
	},
	
	/** flatten an Array of Arrays into a simple Array */
	flatten: function(array) {
		var out	= [];
		for (var i=0; i<array.length; i++) {
			out	= out.concat(array[i]);
		}
		return out;
	},

	//------------------------------------------------------------------------------
	
	/** new array with one item removed */
	without: function(array, item) {
		var	index	= array.indexOf(item);
		if (index === -1)	return array;
		
		var out	= array.slice();
		out.splice(index, 1);
		return out;
	},

	/** two partitions in a 2-element Array, first the partition where the predicate returned true */
	partition: function(array, pred) {
		var	yes	= [];
		var no	= [];
		for (var i=0; i<array.length; i++) {
			var	item	= array[i];
			(pred(item) ? yes : no).push(item);
		}
		return [ yes, no ];
	},
	
	/** optionally insert an element between every two elements and boundaries */
	inject: function(array, func) {
		var out	= [];
		for (var i=0; i<=array.length; i++) {
			var	a	= i > 0				? array[i-1]	: null;
			var b	= i < array.length	? array[i]		: null;
			var	tmp		= func(a, b);
			if (tmp !== null)		out.push(tmp);
			if (i < array.length)	out.push(array[i]);
		}
		return out;
	},

	/** (unstable) sort returning a new array */
	sorted: function(array, compareFunc) {
		var out	= array.slice();
		out.sort(compareFunc);
		return out;
	},
	
	/** stable sort returning a new array */
	sortedStable: function(array, compareFunc) {
		var tmp	= array.map(function(it, idx) {
			return { idx: idx, it: it };
		});
		tmp.sort(function(a, b) {
			var cmp	= compareFunc(a.it, b.it);
			return cmp === 0 ? a.idx - b.idx : cmp;
		});
		return tmp.map(function(o) {
			return o.it;
		});
	},
	
	/** use a function to extract keys and build an Object */
	objectBy: function(array, keyFunc) {
		var	out	= {};
		for (var i=0; i<array.length; i++) {
			var	item	= array[i];
			out[keyFunc(item)]	= item;
		}
		return out;
	},
	
	//------------------------------------------------------------------------------
	//## math for number-arrays
	
	sum: function(array) {
		return array.reduce(
			function(accu, item) {
				return accu + item;
			},
			0
		);
	},
	
	product: function(array) {
		return array.reduce(
			function(accu, item) {
				return accu * item;
			},
			1
		);
	},
	
	mean: function(array) {
		return array.length === 0 ? 0 :
				this.sum(array) / array.length;
	}//,
};
