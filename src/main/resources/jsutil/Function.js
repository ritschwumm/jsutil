var jsutil	= jsutil || {};

jsutil.Function	= {
	identity:	function(x)		{ return x; },
	constant:	function(x)		{ return function(_) { return x; }; },
	compose:	function(a, b)	{ return function(x) { return a(b(x));	}; },
	andThen:	function(a, b)	{ return function(x) { return b(a(x));	}; },
	
	/** like bind but taking an array of arguments instead of varargs */
	bindApply:	function(func, thisObject, argArray) {
		return func.bind.apply(func, [ thisObject ].concat(argArray));
	},
	
	/** like bind but for constructors (and without a thisObject argument) */
	bindConstruct: function(func) {
		function argSlice(args, start) {
			return Array.prototype.slice.call(arguments, start);
		}
		var boundArgs	= argSlice(arguments, 1);
		function SubType() {
			var allArgs	= boundArgs.concat(argSlice(arguments));
			func.apply(this, allArgs);
		}
		SubType.prototype	= func.prototype;
		SubType.prototype.constructor	= SubType;
		return SubType;
	}//,
};
