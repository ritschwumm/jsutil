var jsutil	= jsutil || {};

/** can be used to copy a function's arguments into a real Array */
jsutil.Function	= {
	identity:	function(x) { return x; },
	constant:	function(c) { return function(v) { return c; } }
};
