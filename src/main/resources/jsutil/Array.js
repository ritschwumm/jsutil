var jsutil	= jsutil || {};

/** can be used to copy a function's arguments into a real Array */
jsutil.Array	= {
	make: function(args) {
		return Array.prototype.slice.apply(args);
	}
};
