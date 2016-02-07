var jsutil	= jsutil || {};

jsutil.Function	= {
	identity:	function(x) { return x; },
	constant:	function(c) { return function(v) { return c; }; }
};
