var jsutil	= jsutil || {};

jsutil.Function	= {
	// like bind but taking an array of arguments instead of varargs
	bindApply:	function(func, thisObject, argArray) {
		return func.bind.apply(func, [ thisObject ].concat(argArray));
	},
	
	identity:	function(x)		{ return x; },
	constant:	function(x)		{ return function(_) { return x; }; },
	compose:	function(a, b)	{ return function(x) { return a(b(x));	}; },
	andThen:	function(a, b)	{ return function(x) { return b(a(x));	}; }//,
};
