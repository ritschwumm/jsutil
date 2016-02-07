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
