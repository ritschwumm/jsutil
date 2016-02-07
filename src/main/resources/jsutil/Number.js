var jsutil	= jsutil || {};

/** can be used to copy a function's arguments into a real Array */
jsutil.Number	= {
	range:	function(from, to) {
		var	out	= [];
		for (var i=from; i<to; i++)	out.push(i);
		return out;
	}
};
