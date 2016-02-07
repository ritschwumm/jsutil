var Predicate = {
	always:	Function.constant(true),
	never:	Function.constant(false),
	
	not: function(a) {
		return function(v) {
			return !a(v);
		};
	},
	
	and: function(a,b) {
		return function(v) {
			return a(v) && b(v);
		};
	},
	
	or: function(a,b) {
		return function(v) {
			return a(v) ||b(v);
		};
	}//,
};
