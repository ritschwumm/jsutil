var jsutil	= jsutil || {};

jsutil.Predicate = {
	always:	function(a) { return true;	},
	never:	function(a) { return false;	},
	
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
			return a(v) || b(v);
		};
	}//,
};
