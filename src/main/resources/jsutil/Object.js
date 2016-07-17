var jsutil	= jsutil || {};

/** Object helper functions */
jsutil.Object = {
	empty: function() {
		return {};
	},
	
	single: function(key, value) {
		var out	= {};
		out[key]	= value;
		return out;
	},
	
	/** copies an Object's properties into an new Object */
	clone: function(obj) {
		var	out	= {};
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out[key] = obj[key];
			}
		}
		return out;
	},
	
	/** copy own properties from multiple objects into one. properties defined later win */
	merge: function(/* object... */) {
		var	out	= {};
		for (var i=0; i<arguments.length; i++) {
			var a	= arguments[i];
			for (var key in a) {
				if (a.hasOwnProperty(key))	out[key]	= a[key];
			}
		}
		return out;
	},
	
	/** curried field access */
	pluck: function(key) {
		return function(obj) {
			return obj[key];
		};
	},
	
	/** return a type-indicating string */
	type: function(obj) {
		return	obj === null	? "null"		:
				obj == null		? "undefined"	:
				Object.prototype.toString.call(obj).match(/(\w+)\]/)[1];
	},
	
	/** returns the value behind every key */
	values: function(obj) {
		var	out	= [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out.push(obj[key]);
			}
		}
		return out;
	},
	
	/** make an array by transforming each key/value pair with a function */
	arrayKv: function(obj, func) {
		var out	= [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out.push(func(key, obj[key]));
			}
		}
		return out;
	},
	
	/** returns an object's slots as an Array of Pairs */
	toPairs: function(obj) {
		var	out	= [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out.push([key, obj[key]]);
			}
		}
		return out;
	},
	
	/** creates an Object from an Array of key/value pairs, the last Pair for a key wins */
	fromPairs: function(pairs) {
		var	out	= {};
		for (var i=0; i<pairs.length; i++) {
			var	pair		= pairs[i];
			out[pair[0]]	= pair[1];
		}
		return out;
	},
	
	/** call a function with key and value for each item */
	forEach: function(obj, func) {
		for (var k in obj) {
			if (!obj.hasOwnProperty(k))	continue;
			func(k, obj[k]);
		}
	},
	
	mapValues: function(obj, func) {
		var	out	= {};
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out[key]	= func(obj[key]);
			}
		}
		return out;
	}//,
};
