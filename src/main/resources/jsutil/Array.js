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
