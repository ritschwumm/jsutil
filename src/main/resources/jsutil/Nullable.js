var jsutil	= jsutil || {};

jsutil.Nullable	= {
	maybe: function(cond, item) {
		return cond ? item : null;
	},
	
	// Nullable[T] => Boolean
	isNull: function(it) {
		return it === null;
	},
	
	// Nullable[T] => Boolean
	notNull: function(it) {
		return it !== null;
	},
	
	// (S => T) => (Nullable[S] => Nullable[T])
	map: function(func) {
		return function(it) {
			return it !== null ? func(it) : null;
		};
	},
	
	// Nullable[S => T] => (Nullable[S] => Nullable[T])
	ap: function(func) {
		return function(it) {
			return func !== null && it !== null ? func(it) : null;
		};
	},
	
	// (S => Nullable[T]) => (Nullable[S] => Nullable[T])
	flatMap: function(func) {
		return function(it) {
			return it !== null ? func(it) : null;
		};
	},
	
	// ((A,B) => T) => ((Nullable[A], Nullable[B]) => Nullable[T])
	combine: function(func) {
		return function(a, b) {
			return a !== null && b !== null ? func(a, b) : null;
		};
	},
	
	// (T => Boolean) => (Nullable[T] => Nullable[T])
	filter: function(pred) {
		return function(it) {
			return it !== null && pred(it) ? it : null;
		};
	},
	
	// (T => Boolean) => (Nullable[T] => Nullable[T])
	filterNot: function(pred) {
		return function(it) {
			return it !== null && !pred(it) ? it : null;
		};
	},
	
	// (T => Boolean) => Nullable[T] => Boolean
	every: function(pred) {
		return function(it) {
			return it === null || pred(it);
		};
	},
	
	// (T => Boolean) => Nullable[T] => Boolean
	some: function(pred) {
		return function(it) {
			return it !== null && pred(it);
		};
	},
	
	// (R => Nullable[S]) => (S => Nullable[T]) => (R => Nullable[T])
	chain: function(func1) {
		return function(func2) {
			return function(it) {
				var tmp	= func(it);
				return tmp !== null ? funct(tmp) : null;
			};
		};
	}//,
};
